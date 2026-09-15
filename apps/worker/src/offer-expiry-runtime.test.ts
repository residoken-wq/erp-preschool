import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { Pool } from 'pg';
import { describe, expect, it } from 'vitest';
import { expireDueOffers } from './offer-expiry-runtime.js';

// Independent worker helper: real migrations in an isolated synthetic schema.
async function withDatabase(run: (db: Pool) => Promise<void>): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is required for integration tests');
  const schema = `expiry_test_${randomUUID().replaceAll('-', '')}`;
  const admin = new Pool({ connectionString });
  const db = new Pool({ connectionString, options: `-c search_path=${schema},public` });
  try {
    await admin.query(`CREATE SCHEMA ${schema}`);
    const migrations = new URL('../../../database/migrations/', import.meta.url);
    for (const file of (await readdir(migrations)).filter((name) => name.endsWith('.sql')).sort()) {
      await db.query(await readFile(new URL(file, migrations), 'utf8'));
    }
    await run(db);
  } finally {
    await db.end();
    try { await admin.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); }
    finally { await admin.end(); }
  }
}

async function createApplication(db: Pool): Promise<{ organizationId: string; applicationId: string }> {
  const organizationId = randomUUID();
  const campusId = randomUUID();
  const applicationId = randomUUID();
  await db.query(`INSERT INTO organizations(id, code, name, status) VALUES ($1, $2, 'Synthetic-test', 'ACTIVE')`, [organizationId, organizationId.slice(0, 30)]);
  await db.query(`INSERT INTO campuses(id, organization_id, code, name, status) VALUES ($1, $2, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [campusId, organizationId]);
  await db.query(`INSERT INTO applications(id, organization_id, campus_id, code, program_code, intake_code, status) VALUES ($1, $2, $3, 'SYNTHETIC', 'SYNTHETIC', 'SYNTHETIC', 'OFFERED')`, [applicationId, organizationId, campusId]);
  return { organizationId, applicationId };
}

async function createOffer(db: Pool, application: { organizationId: string; applicationId: string }, status = 'ISSUED', deadline: string | null = '2000-01-01T00:00:00Z'): Promise<string> {
  const id = randomUUID();
  await db.query(`INSERT INTO offers(id, organization_id, application_id, code, status, valid_until, updated_at)
    VALUES ($1::uuid, $2, $3, $1::text, $4, $5, '1999-01-01T00:00:00Z')`, [id, application.organizationId, application.applicationId, status, deadline]);
  return id;
}

// SOP-ADM-003 -> BR-ADM-004 -> automatic expiry -> step-04 AC1–AC5.
describe.skipIf(!process.env.DATABASE_URL)('holding-seat expiry with PostgreSQL', () => {
  it('expires all due offers once, preserves tenant attribution and minimal SYSTEM audit/outbox', async () => {
    await withDatabase(async (db) => {
      const first = await createApplication(db);
      const second = await createApplication(db);
      const offers = [
        { id: await createOffer(db, first), organizationId: first.organizationId },
        { id: await createOffer(db, first), organizationId: first.organizationId },
        { id: await createOffer(db, second), organizationId: second.organizationId }
      ];
      const started = Date.now();
      expect(await expireDueOffers(db)).toBe(3);
      for (const offer of offers) {
        const row = (await db.query<{ status: string; row_version: string; updated_at: Date }>('SELECT status, row_version, updated_at FROM offers WHERE id = $1', [offer.id])).rows[0];
        expect(row).toMatchObject({ status: 'EXPIRED', row_version: '2' });
        expect(row?.updated_at.getTime()).toBeGreaterThanOrEqual(started);
        const audit = (await db.query<Record<string, unknown>>('SELECT organization_id, actor_type, actor_id, action, object_type, before_json, after_json, correlation_id FROM audit_events WHERE object_id = $1', [offer.id])).rows;
        expect(audit).toHaveLength(1);
        expect(audit[0]).toMatchObject({ organization_id: offer.organizationId, actor_type: 'SYSTEM', actor_id: null, action: 'offer.transition', object_type: 'Offer', before_json: { status: 'ISSUED', rowVersion: '1' }, after_json: { status: 'EXPIRED', rowVersion: '2' } });
        expect(typeof audit[0]?.correlation_id).toBe('string');
        const outbox = (await db.query<Record<string, unknown>>('SELECT organization_id, event_type, aggregate_type, payload_json, correlation_id FROM outbox_events WHERE aggregate_id = $1', [offer.id])).rows;
        expect(outbox).toEqual([{ organization_id: offer.organizationId, event_type: 'OfferExpired', aggregate_type: 'Offer', payload_json: { offerId: offer.id, status: 'EXPIRED' }, correlation_id: audit[0]?.correlation_id }]);
      }
      const before = (await db.query<Record<string, unknown>>('SELECT id, status, updated_at, row_version FROM offers ORDER BY id')).rows;
      expect(await expireDueOffers(db)).toBe(0);
      expect((await db.query<Record<string, unknown>>('SELECT id, status, updated_at, row_version FROM offers ORDER BY id')).rows).toEqual(before);
      for (const table of ['audit_events', 'outbox_events']) {
        expect((await db.query<{ count: string }>(`SELECT count(*) FROM ${table}`)).rows[0]?.count).toBe('3');
      }
    });
  });

  it('leaves future/null deadlines and every non-ISSUED status untouched with no events', async () => {
    await withDatabase(async (db) => {
      const application = await createApplication(db);
      await createOffer(db, application, 'ISSUED', '2099-01-01T00:00:00Z');
      await createOffer(db, application, 'ISSUED', null);
      for (const status of ['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'WITHDRAWN']) {
        await createOffer(db, application, status);
      }
      const before = (await db.query<Record<string, unknown>>('SELECT id, status, updated_at, row_version FROM offers ORDER BY id')).rows;
      expect(await expireDueOffers(db)).toBe(0);
      expect((await db.query<Record<string, unknown>>('SELECT id, status, updated_at, row_version FROM offers ORDER BY id')).rows).toEqual(before);
      expect((await db.query<Record<string, unknown>>('SELECT id FROM audit_events')).rows).toEqual([]);
      expect((await db.query<Record<string, unknown>>('SELECT id FROM outbox_events')).rows).toEqual([]);
    });
  });

  it('rolls back all offer and audit writes when outbox insertion fails, then retries once', async () => {
    await withDatabase(async (db) => {
      const application = await createApplication(db);
      await createOffer(db, application);
      await createOffer(db, application);
      await db.query(`CREATE FUNCTION reject_expiry_outbox() RETURNS trigger AS $$
        BEGIN RAISE EXCEPTION 'SYNTHETIC_OUTBOX_FAILURE'; END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER reject_expiry_outbox BEFORE INSERT ON outbox_events
        FOR EACH ROW EXECUTE FUNCTION reject_expiry_outbox()`);
      const before = (await db.query<Record<string, unknown>>('SELECT id, status, updated_at, row_version FROM offers ORDER BY id')).rows;
      await expect(expireDueOffers(db)).rejects.toThrow('SYNTHETIC_OUTBOX_FAILURE');
      expect((await db.query<Record<string, unknown>>('SELECT id, status, updated_at, row_version FROM offers ORDER BY id')).rows).toEqual(before);
      expect((await db.query<Record<string, unknown>>('SELECT id FROM audit_events')).rows).toEqual([]);
      expect((await db.query<Record<string, unknown>>('SELECT id FROM outbox_events')).rows).toEqual([]);
      await db.query('DROP TRIGGER reject_expiry_outbox ON outbox_events');
      expect(await expireDueOffers(db)).toBe(2);
      expect(await expireDueOffers(db)).toBe(0);
      for (const table of ['audit_events', 'outbox_events']) {
        expect((await db.query<{ count: string }>(`SELECT count(*) FROM ${table}`)).rows[0]?.count).toBe('2');
      }
    });
  });
});
