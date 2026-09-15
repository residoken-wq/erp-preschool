import 'reflect-metadata';
import { PATH_METADATA } from '@nestjs/common/constants.js';
import { PERMISSIONS_KEY } from '../../platform/permissions.js';
import { ApplicationController } from './application.controller.js';
import { describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import type { ActorContext } from '@sop-os/contracts';
import { createTestPool, withRollback } from '../../platform/test-db.js';
import { MedicalService } from '../medical/medical.service.js';
import { ApplicationService, assertMedicalCleared, assertOfferApprovalSeparation, parseDiscountApprovalCommand } from './application.service.js';

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

// SOP-ADM-003 -> BR-ADM-003 -> discount gate/decision contract -> step-03 AC1–AC9.
describe('discount decision boundary', () => {
  it('registers the separate permission and command route', () => {
    const handler: unknown = Reflect.get(ApplicationController.prototype, 'decideOfferDiscountApproval');
    if (typeof handler !== 'function') throw new Error('Route handler missing');
    expect(Reflect.getMetadata(PATH_METADATA, handler)).toBe('offers/:offerId/discount-approval');
    expect(Reflect.getMetadata(PERMISSIONS_KEY, handler)).toEqual(['offer:approve-discount']);
  });
  it.each([null, [], {}, { decision: 'PENDING' }, { decision: 'APPROVED', actorId: 'x' }, { decision: 'REJECTED', reason: 2 }, { decision: 'APPROVED', reason: 'x'.repeat(4001) }])('rejects malformed decision bodies', (body) => {
    expect(() => parseDiscountApprovalCommand(body)).toThrow();
  });
});

describe.skipIf(!process.env.DATABASE_URL)('discount gate PostgreSQL integration', () => {
  it('covers threshold boundaries, scope, approvals/rejections, concurrency and rollback', async () => {
    const pool = createTestPool();
    const schema = `discount_test_${randomUUID().replaceAll('-', '')}`;
    const db = createTestPool();
    db.on('connect', (client) => { void client.query(`SET search_path TO ${schema}, public`); });
    try {
      await pool.query(`CREATE SCHEMA ${schema}`);
      const migrations = new URL('../../../../../database/migrations/', import.meta.url);
      for (const file of (await readdir(migrations)).filter((name) => name.endsWith('.sql')).sort()) await db.query(await readFile(new URL(file, migrations), 'utf8'));
      const campusId = randomUUID();
      const actor: ActorContext = { actorId: randomUUID(), organizationId: randomUUID(), campusIds: [campusId], permissions: ['offer:create', 'medical:edit', 'offer:approve-discount'], correlationId: randomUUID() };
      const approver = { ...actor, actorId: randomUUID(), permissions: ['offer:approve-discount'] };
      await db.query(`INSERT INTO organizations(id, code, name, status) VALUES ($1, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [actor.organizationId]);
      await db.query(`INSERT INTO campuses(id, organization_id, code, name, status) VALUES ($1, $2, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [campusId, actor.organizationId]);
      for (const user of [actor, approver]) await db.query(`INSERT INTO user_accounts(id, organization_id, email_normalized, display_name, status) VALUES ($1, $2, $3, 'Synthetic-test', 'ACTIVE')`, [user.actorId, actor.organizationId, `${user.actorId}@example.test`]);
      const medical = new MedicalService(db);
      const service = new ApplicationService(db, medical);
      async function draft(discountPercent?: unknown): Promise<Record<string, unknown>> {
        const applicationId = randomUUID();
        await db.query(`INSERT INTO applications(id, organization_id, campus_id, code, program_code, intake_code, status) VALUES ($1::uuid, $2, $3, $1::text, 'SYNTHETIC', 'SYNTHETIC', 'DECISION_PENDING')`, [applicationId, actor.organizationId, campusId]);
        await medical.setClearance(actor, applicationId, { cleared: true });
        return service.createOffer(actor, applicationId, { code: randomUUID(), validUntil: '2099-01-01T00:00:00Z', terms: discountPercent === undefined ? {} : { discountPercent } });
      }
      const count = async (table: string): Promise<number> => Number((await db.query<{ count: string }>(`SELECT count(*) FROM ${table}`)).rows[0]?.count);
      for (const discount of [undefined, 0]) expect(await draft(discount)).toMatchObject({ status: 'DRAFT' });
      expect(await count('approval_requests')).toBe(0);
      for (const invalid of [-1, 101, '10', null, true, NaN, Infinity]) await expect(draft(invalid)).rejects.toMatchObject({ status: 400 });
      await expect(draft(1)).rejects.toMatchObject({ status: 409 });
      expect(await count('offers')).toBe(2);
      await db.query(`INSERT INTO rule_configs(organization_id, config_key, value_json) VALUES ($1, 'admission.discount_threshold_percent', '10')`, [actor.organizationId]);
      for (const discount of [5, 10]) expect(await draft(discount)).not.toHaveProperty('requiresApproval');
      expect(await count('approval_requests')).toBe(0);
      await db.query(`UPDATE rule_configs SET value_json = '"10"' WHERE organization_id = $1`, [actor.organizationId]);
      await expect(draft(1)).rejects.toMatchObject({ status: 409 });
      await db.query(`UPDATE rule_configs SET value_json = '10' WHERE organization_id = $1`, [actor.organizationId]);
      const offer = await draft(20);
      expect(offer).toMatchObject({ status: 'DRAFT', requiresApproval: true });
      const offerId = String(offer.id);
      await withRollback(db, async (client) => {
        const requests = await client.query('SELECT * FROM approval_requests');
        expect(requests.rows).toHaveLength(1);
        expect(requests.rows[0]).toMatchObject({ id: offer.approvalRequestId, entity_type: 'Offer', entity_id: offerId, requested_by: actor.actorId, status: 'PENDING', threshold_snapshot: { discountPercent: 20, thresholdPercent: 10 } });
      });
      await service.transitionOffer(actor, offerId, { to: 'PENDING_APPROVAL' });
      await expect(service.transitionOffer(approver, offerId, { to: 'APPROVED' })).rejects.toMatchObject({ status: 409 });
      await expect(service.decideOfferDiscountApproval(actor, offerId, { decision: 'APPROVED' })).rejects.toMatchObject({ status: 409 });
      await expect(service.decideOfferDiscountApproval({ ...approver, permissions: ['offer:transition'] }, offerId, { decision: 'APPROVED' })).rejects.toMatchObject({ status: 403 });
      for (const outsider of [{ ...approver, organizationId: randomUUID() }, { ...approver, campusIds: [] }]) {
        await expect(service.decideOfferDiscountApproval(outsider, offerId, { decision: 'APPROVED' })).rejects.toMatchObject({ status: 404 });
        await expect(service.transitionOffer(outsider, offerId, { to: 'APPROVED' })).rejects.toMatchObject({ status: 404 });
      }
      const decisions = await Promise.allSettled([service.decideOfferDiscountApproval(approver, offerId, { decision: 'APPROVED' }), service.decideOfferDiscountApproval(approver, offerId, { decision: 'APPROVED' })]);
      expect(decisions.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
      expect(decisions.filter((result) => result.status === 'rejected')).toHaveLength(1);
      expect(await service.transitionOffer(approver, offerId, { to: 'APPROVED' })).toMatchObject({ status: 'APPROVED' });
      const rejected = await draft(100);
      const rejectedId = String(rejected.id);
      expect(await service.decideOfferDiscountApproval(approver, rejectedId, { decision: 'REJECTED' })).toMatchObject({ status: 'REJECTED' });
      await service.transitionOffer(actor, rejectedId, { to: 'PENDING_APPROVAL' });
      await expect(service.transitionOffer(approver, rejectedId, { to: 'APPROVED' })).rejects.toMatchObject({ status: 409 });
      await expect(service.decideOfferDiscountApproval(approver, rejectedId, { decision: 'APPROVED' })).rejects.toMatchObject({ status: 409 });
      expect((await db.query('SELECT status FROM offers WHERE id = $1', [rejectedId])).rows[0]).toMatchObject({ status: 'PENDING_APPROVAL' });
      const before = await count('offers');
      const approvalsBefore = await count('approval_requests');
      await db.query(`ALTER TABLE outbox_events ADD CONSTRAINT synthetic_failure CHECK (event_type <> 'OfferDrafted') NOT VALID`);
      await expect(draft(30)).rejects.toThrow();
      expect(await count('offers')).toBe(before);
      expect(await count('approval_requests')).toBe(approvalsBefore);
      await db.query('ALTER TABLE outbox_events DROP CONSTRAINT synthetic_failure');
      await db.query(`ALTER TABLE outbox_events ADD CONSTRAINT synthetic_failure CHECK (event_type <> 'ApprovalDecided') NOT VALID`);
      const rollbackOffer = await draft(30);
      const auditsBefore = await count('audit_events');
      await expect(service.decideOfferDiscountApproval(approver, String(rollbackOffer.id), { decision: 'APPROVED' })).rejects.toThrow();
      expect((await db.query('SELECT status FROM approval_requests WHERE id = $1', [rollbackOffer.approvalRequestId])).rows[0]).toMatchObject({ status: 'PENDING' });
      expect(await count('audit_events')).toBe(auditsBefore);
    } finally {
      await db.end();
      await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
      await pool.end();
    }
  });
});
