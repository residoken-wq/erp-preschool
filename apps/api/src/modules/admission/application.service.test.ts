import { describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import type { ActorContext } from '@sop-os/contracts';
import { createTestPool, withRollback } from '../../platform/test-db.js';
import { MedicalService } from '../medical/medical.service.js';
import { ApplicationService, assertMedicalCleared, assertOfferApprovalSeparation } from './application.service.js';

describe('offer approval separation', () => {
  it('blocks the offer author from approving their own offer', () => {
    expect(() => assertOfferApprovalSeparation('actor-a', 'actor-a', 'APPROVED'))
      .toThrow('Offer author cannot approve their own offer');
  });

  it('allows a different actor to approve and the author to perform non-approval transitions', () => {
    expect(() => assertOfferApprovalSeparation('actor-a', 'actor-b', 'APPROVED')).not.toThrow();
    expect(() => assertOfferApprovalSeparation('actor-a', 'actor-a', 'PENDING_APPROVAL')).not.toThrow();
  });
});

// SOP-ADM-003 -> BR-ADM-002 -> step-02 AC3/AC4.
describe('medical clearance precondition', () => {
  it('allows only an explicitly cleared application', () => {
    expect(() => assertMedicalCleared({ cleared: true })).not.toThrow();
    for (const clearance of [{ cleared: false }, null, undefined]) {
      expect(() => assertMedicalCleared(clearance)).toThrow('Medical clearance required before offer can be created');
      try { assertMedicalCleared(clearance); } catch (error) { expect(error).toMatchObject({ status: 409 }); }
    }
  });
});

describe.skipIf(!process.env.DATABASE_URL)('createOffer medical gate with PostgreSQL', () => {
  it('rejects missing/false clearance with 409 and no offer writes, then creates a draft when cleared', async () => {
    const pool = createTestPool();
    const schema = `offer_test_${randomUUID().replaceAll('-', '')}`;
    const db = createTestPool();
    db.on('connect', (client) => { void client.query(`SET search_path TO ${schema}, public`); });
    try {
      await pool.query(`CREATE SCHEMA ${schema}`);
      const migrations = new URL('../../../../../database/migrations/', import.meta.url);
      for (const file of (await readdir(migrations)).filter((name) => name.endsWith('.sql')).sort()) {
        await db.query(await readFile(new URL(file, migrations), 'utf8'));
      }
      const campusId = randomUUID();
      const actor: ActorContext = { actorId: randomUUID(), organizationId: randomUUID(), campusIds: [campusId], permissions: ['offer:create', 'medical:edit'], correlationId: randomUUID() };
      const applicationId = randomUUID();
      await db.query(`INSERT INTO organizations(id, code, name, status) VALUES ($1, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [actor.organizationId]);
      await db.query(`INSERT INTO campuses(id, organization_id, code, name, status) VALUES ($1, $2, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [campusId, actor.organizationId]);
      await db.query(`INSERT INTO user_accounts(id, organization_id, email_normalized, display_name, status) VALUES ($1, $2, 'synthetic@example.com', 'Synthetic-test', 'ACTIVE')`, [actor.actorId, actor.organizationId]);
      await db.query(`INSERT INTO applications(id, organization_id, campus_id, code, program_code, intake_code, status) VALUES ($1, $2, $3, 'SYNTHETIC', 'SYNTHETIC', 'SYNTHETIC', 'DECISION_PENDING')`, [applicationId, actor.organizationId, campusId]);
      const medical = new MedicalService(db);
      const service = new ApplicationService(db, medical);
      const command = { code: 'SYNTHETIC-OFFER', validUntil: '2099-01-01T00:00:00Z', terms: {} };
      await expect(service.createOffer(actor, applicationId, command)).rejects.toMatchObject({ status: 409 });
      await medical.setClearance(actor, applicationId, { cleared: false });
      await expect(service.createOffer(actor, applicationId, command)).rejects.toMatchObject({ status: 409 });
      await withRollback(db, async (client) => {
        expect((await client.query<{ count: string }>('SELECT count(*) FROM offers')).rows[0]?.count).toBe('0');
        expect((await client.query<{ count: string }>("SELECT count(*) FROM audit_events WHERE action = 'offer.create'")).rows[0]?.count).toBe('0');
        expect((await client.query<{ count: string }>("SELECT count(*) FROM outbox_events WHERE event_type = 'OfferDrafted'")).rows[0]?.count).toBe('0');
      });
      await medical.setClearance(actor, applicationId, { cleared: true });
      for (const outsider of [{ ...actor, organizationId: randomUUID() }, { ...actor, campusIds: [] }]) await expect(service.createOffer(outsider, applicationId, command)).rejects.toMatchObject({ status: 404 });
      // Admission actors need no permission to read the underlying health details.
      const offer = await service.createOffer({ ...actor, permissions: ['offer:create'] }, applicationId, command);
      expect(offer).toMatchObject({ code: command.code, status: 'DRAFT' });
      for (const sql of ['SELECT count(*) FROM offers', "SELECT count(*) FROM audit_events WHERE action = 'offer.create'", "SELECT count(*) FROM outbox_events WHERE event_type = 'OfferDrafted'"]) expect((await db.query<{ count: string }>(sql)).rows[0]?.count).toBe('1');
    } finally {
      await db.end();
      await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
      await pool.end();
    }
  });
});
