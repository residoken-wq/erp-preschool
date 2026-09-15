import { randomUUID } from 'node:crypto';
import type { Pool } from 'pg';

type ExpiredOfferRow = {
  id: string;
  organization_id: string;
  row_version: string;
};

// SOP-ADM-003 / BR-ADM-004: expire only the persisted holding-seat deadline.
// SYSTEM job spans tenants; every event retains the updated row's organization.
// No HRI terms/contact data is read or copied into audit, outbox, or logs.
// Single worker instance assumed; no advisory lock. The status predicate is
// rechecked after row-lock waits, but real multi-instance operation is not tested.
export async function expireDueOffers(pool: Pool): Promise<number> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query<ExpiredOfferRow>(
      `UPDATE offers
       SET status = 'EXPIRED', updated_at = now(), row_version = row_version + 1
       WHERE status = 'ISSUED' AND valid_until < now()
       RETURNING id, organization_id, row_version`
    );
    for (const offer of result.rows) {
      const correlationId = randomUUID();
      await client.query(
        `INSERT INTO audit_events(
           organization_id, actor_type, actor_id, action, object_type, object_id,
           before_json, after_json, reason, correlation_id
         ) VALUES ($1, 'SYSTEM', NULL, 'offer.transition', 'Offer', $2,
                   $3::jsonb, $4::jsonb, 'Holding-seat deadline elapsed', $5)`,
        [offer.organization_id, offer.id,
          JSON.stringify({ status: 'ISSUED', rowVersion: (BigInt(offer.row_version) - 1n).toString() }),
          JSON.stringify({ status: 'EXPIRED', rowVersion: offer.row_version }), correlationId]
      );
      await client.query(
        `INSERT INTO outbox_events(
           organization_id, event_type, aggregate_type, aggregate_id, payload_json, correlation_id
         ) VALUES ($1, 'OfferExpired', 'Offer', $2, $3::jsonb, $4)`,
        [offer.organization_id, offer.id,
          JSON.stringify({ offerId: offer.id, status: 'EXPIRED' }), correlationId]
      );
    }
    await client.query('COMMIT');
    return result.rows.length;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
