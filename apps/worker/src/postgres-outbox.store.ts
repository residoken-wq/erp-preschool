import type { Pool, PoolClient } from 'pg';
import {
  failureState,
  type DeliveryFailure,
  type DeliveryReceipt,
  type OutboxEvent,
  type OutboxStore
} from './outbox-runtime.js';

type OutboxRow = {
  id: string;
  organization_id: string;
  event_type: string;
  aggregate_type: string;
  aggregate_id: string;
  payload_json: unknown;
  attempts: number;
  locked_at: Date;
};

export class PostgresOutboxStore implements OutboxStore {
  constructor(private readonly pool: Pool) {}

  async claimOne(): Promise<OutboxEvent | null> {
    const result = await this.pool.query<OutboxRow>(
      `WITH candidate AS (
         SELECT id
         FROM outbox_events
         WHERE next_attempt_at <= now()
           AND (status = 'PENDING' OR (status = 'PROCESSING' AND locked_at < now() - interval '5 minutes'))
         ORDER BY occurred_at
         FOR UPDATE SKIP LOCKED
         LIMIT 1
       )
       UPDATE outbox_events AS event
       SET status = 'PROCESSING', attempts = event.attempts + 1, locked_at = now()
       FROM candidate
       WHERE event.id = candidate.id
       RETURNING event.id, event.organization_id, event.event_type, event.aggregate_type,
                 event.aggregate_id, event.payload_json, event.attempts, event.locked_at`
    );
    const row = result.rows[0];
    if (!row) return null;
    return {
      id: row.id,
      organizationId: row.organization_id,
      eventType: row.event_type,
      aggregateType: row.aggregate_type,
      aggregateId: row.aggregate_id,
      payload: row.payload_json,
      attempts: row.attempts,
      claimedAt: row.locked_at
    };
  }

  async complete(event: OutboxEvent, receipt: DeliveryReceipt): Promise<void> {
    await this.transaction(async (client) => {
      await client.query(
        `INSERT INTO outbox_delivery_attempts(
           organization_id, outbox_event_id, attempt_no, provider, outcome,
           provider_receipt_id, started_at, finished_at
         ) VALUES ($1, $2, $3, $4, 'SUCCEEDED', $5, $6, now())`,
        [event.organizationId, event.id, event.attempts, receipt.provider, receipt.receiptId, event.claimedAt]
      );
      const result = await client.query(
        `UPDATE outbox_events
         SET status = 'PROCESSED', processed_at = now(), locked_at = NULL, last_error = NULL
         WHERE id = $1 AND organization_id = $2 AND status = 'PROCESSING' AND attempts = $3`,
        [event.id, event.organizationId, event.attempts]
      );
      if (result.rowCount !== 1) throw new Error('Outbox completion concurrency conflict');
    });
  }

  async fail(event: OutboxEvent, failure: DeliveryFailure): Promise<void> {
    const state = failureState(event.attempts, failure);
    await this.transaction(async (client) => {
      await client.query(
        `INSERT INTO outbox_delivery_attempts(
           organization_id, outbox_event_id, attempt_no, provider, outcome,
           error_code, started_at, finished_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, now())`,
        [
          event.organizationId,
          event.id,
          event.attempts,
          failure.provider,
          failure.retryable ? 'RETRYABLE_FAILURE' : 'PERMANENT_FAILURE',
          failure.code,
          event.claimedAt
        ]
      );
      const result = await client.query(
        `UPDATE outbox_events
         SET status = $4,
             next_attempt_at = now() + ($5 * interval '1 second'),
             locked_at = NULL,
             last_error = $6
         WHERE id = $1 AND organization_id = $2 AND status = 'PROCESSING' AND attempts = $3`,
        [event.id, event.organizationId, event.attempts, state.status, state.delaySeconds, failure.code]
      );
      if (result.rowCount !== 1) throw new Error('Outbox failure concurrency conflict');
    });
  }

  private async transaction(operation: (client: PoolClient) => Promise<void>): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await operation(client);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
