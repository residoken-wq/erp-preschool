import { randomUUID } from 'node:crypto';
import process from 'node:process';
import pg from 'pg';

const { Client } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const organizationId = process.env.SMOKE_ORGANIZATION_ID ?? '00000000-0000-7000-8000-000000000001';
const eventId = randomUUID();
const aggregateId = randomUUID();
const client = new Client({ connectionString: databaseUrl, connectionTimeoutMillis: 2_000 });
await client.connect();

try {
  await client.query(
    `INSERT INTO outbox_events(
       id, organization_id, event_type, aggregate_type, aggregate_id, payload_json, correlation_id
     ) VALUES ($1, $2, 'SyntheticOutboxSmokeRequested', 'SyntheticOutboxSmoke', $3, $4::jsonb, $5)`,
    [eventId, organizationId, aggregateId, JSON.stringify({ dataProvenance: 'synthetic' }), randomUUID()]
  );

  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const result = await client.query(
      `SELECT event.status, event.attempts, attempt.provider, attempt.outcome,
              attempt.provider_receipt_id, attempt.error_code
       FROM outbox_events AS event
       LEFT JOIN outbox_delivery_attempts AS attempt
         ON attempt.organization_id = event.organization_id
        AND attempt.outbox_event_id = event.id
       WHERE event.id = $1 AND event.organization_id = $2
       ORDER BY attempt.attempt_no DESC
       LIMIT 1`,
      [eventId, organizationId]
    );
    const delivery = result.rows[0];
    if (delivery?.status === 'PROCESSED') {
      if (
        delivery.attempts !== 1
        || delivery.provider !== 'development-console'
        || delivery.outcome !== 'SUCCEEDED'
        || !delivery.provider_receipt_id
        || delivery.error_code
      ) {
        throw new Error('Outbox delivery receipt invariant failed');
      }
      console.log('Outbox delivery smoke test passed');
      process.exitCode = 0;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (process.exitCode !== 0) throw new Error('Outbox delivery smoke test timed out');
} finally {
  await client.end();
}
