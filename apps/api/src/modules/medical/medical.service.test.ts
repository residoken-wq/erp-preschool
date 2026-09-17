import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { afterAll, describe, expect, it } from 'vitest';
import type { ActorContext } from '@sop-os/contracts';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants.js';
import { RequestMethod } from '@nestjs/common';
import { canActivateRequest, PERMISSIONS_KEY } from '../../platform/permissions.js';
import { createTestPool, withRollback } from '../../platform/test-db.js';
import { MedicalController } from './medical.controller.js';
import { MedicalService, parseClearanceCommand } from './medical.service.js';

const actor: ActorContext = { actorId: randomUUID(), organizationId: randomUUID(), campusIds: [randomUUID()], permissions: ['medical:edit'], correlationId: randomUUID() };

describe('medical HTTP contract and permission policy', () => {
  it('registers GET and PUT with separate permissions and rejects missing medical:edit (Nest guard 403)', () => {
    expect(Reflect.getMetadata(PATH_METADATA, MedicalController)).toBe('medical/clearances');
    for (const [name, method, permission] of [
      ['getClearance', RequestMethod.GET, 'medical:read'],
      ['setClearance', RequestMethod.PUT, 'medical:edit']
    ] as const) {
      const handler: unknown = Reflect.get(MedicalController.prototype, name);
      if (typeof handler !== 'function') throw new Error('Route handler missing');
      expect(Reflect.getMetadata(PATH_METADATA, handler)).toBe(':applicationId');
      expect(Reflect.getMetadata(METHOD_METADATA, handler)).toBe(method);
      expect(Reflect.getMetadata(PERMISSIONS_KEY, handler)).toEqual([permission]);
      expect(canActivateRequest({ ...actor, permissions: [permission] }, [permission], false, 'oidc')).toBe(true);
      expect(canActivateRequest({ ...actor, permissions: ['application:read'] }, [permission], false, 'oidc')).toBe(false);
    }
    expect(canActivateRequest({ ...actor, permissions: ['medical:read'] }, ['medical:edit'], false, 'oidc')).toBe(false);
    expect(canActivateRequest(undefined, ['medical:edit'], false, 'oidc')).toBe(false);
  });

  it.each([null, [], {}, { cleared: 'true' }, { cleared: true, campusId: randomUUID() }, { cleared: true, allergyFlags: [1] }, { cleared: true, allergyFlags: [''] }, { cleared: true, allergyFlags: Array<string>(101).fill('Synthetic-flag') }, { cleared: true, allergyFlags: ['x'.repeat(201)] }, { cleared: true, specialHealthNeeds: null }, { cleared: true, specialHealthNeeds: 'x'.repeat(4001) }])('rejects invalid or oversized bodies without echoing health data', (body) => {
    expect(() => parseClearanceCommand(body)).toThrow();
  });
  it('accepts strict typed fields and optional omissions', () => {
    expect(parseClearanceCommand({ cleared: false })).toEqual({ cleared: false });
    expect(parseClearanceCommand({ cleared: true, allergyFlags: ['Synthetic-flag'], specialHealthNeeds: 'Synthetic-needs' })).toEqual({ cleared: true, allergyFlags: ['Synthetic-flag'], specialHealthNeeds: 'Synthetic-needs' });
  });
});

// Dedicated schema allows real service COMMITs and separate pool reads without
// retaining synthetic fixtures or bypassing append-only audit protections.
describe.skipIf(!process.env.DATABASE_URL)('medical clearance PostgreSQL integration (SOP-ADM-003 / BR-ADM-002)', () => {
  const pool = process.env.DATABASE_URL ? createTestPool() : undefined;
  afterAll(async () => { await pool?.end(); });

  async function fixture(fn: (service: MedicalService, scopedActor: ActorContext, applicationId: string, queryPool: NonNullable<typeof pool>) => Promise<void>): Promise<void> {
    if (!pool) throw new Error('Test pool required');
    const schema = `medical_test_${randomUUID().replaceAll('-', '')}`;
    await pool.query(`CREATE SCHEMA ${schema}`);
    const scopedPool = createTestPool();
    scopedPool.on('connect', (client) => { void client.query(`SET search_path TO ${schema}, public`); });
    try {
      const migrations = new URL('../../../../../database/migrations/', import.meta.url);
      for (const file of (await readdir(migrations)).filter((name) => name.endsWith('.sql')).sort()) {
        await scopedPool.query(await readFile(new URL(file, migrations), 'utf8'));
      }
      const campusId = randomUUID();
      const scopedActor = { ...actor, organizationId: randomUUID(), campusIds: [campusId], actorId: randomUUID() };
      const applicationId = randomUUID();
      await scopedPool.query(`INSERT INTO organizations(id, code, name, status) VALUES ($1, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [scopedActor.organizationId]);
      await scopedPool.query(`INSERT INTO campuses(id, organization_id, code, name, status) VALUES ($1, $2, 'SYNTHETIC', 'Synthetic-test', 'ACTIVE')`, [campusId, scopedActor.organizationId]);
      await scopedPool.query(`INSERT INTO user_accounts(id, organization_id, email_normalized, display_name, status) VALUES ($1, $2, 'synthetic@example.com', 'Synthetic-test', 'ACTIVE')`, [scopedActor.actorId, scopedActor.organizationId]);
      await scopedPool.query(`INSERT INTO applications(id, organization_id, campus_id, code, program_code, intake_code, status) VALUES ($1, $2, $3, 'SYNTHETIC', 'SYNTHETIC', 'SYNTHETIC', 'DECISION_PENDING')`, [applicationId, scopedActor.organizationId, campusId]);
      await fn(new MedicalService(scopedPool), scopedActor, applicationId, scopedPool);
    } finally {
      await scopedPool.end();
      await pool.query(`DROP SCHEMA ${schema} CASCADE`);
    }
  }

  it('creates and updates one clearance, adding exactly one audit and outbox per successful PUT without health content', async () => {
    await fixture(async (service, scopedActor, id, db) => {
      expect(await service.getClearance(scopedActor, id)).toBeNull();
      const first = await service.setClearance(scopedActor, id, { cleared: true, allergyFlags: ['Synthetic-flag'], specialHealthNeeds: 'Synthetic-needs' });
      expect(first).toMatchObject({ cleared: true, clearedBy: scopedActor.actorId, rowVersion: '1' });
      expect(first.clearedAt).toBeInstanceOf(Date);
      for (const table of ['medical_clearances', 'audit_events', 'outbox_events']) expect((await db.query<{ count: string }>(`SELECT count(*) FROM ${table}`)).rows[0]?.count).toBe('1');
      const updated = await service.setClearance(scopedActor, id, { cleared: false });
      expect(updated).toMatchObject({ id: first.id, cleared: false, clearedBy: null, clearedAt: null, rowVersion: '2', allergyFlags: ['Synthetic-flag'], specialHealthNeeds: 'Synthetic-needs' });
      expect(await service.getClearance(scopedActor, id)).toEqual(updated);
      await withRollback(db, async (client) => {
        expect((await client.query<{ count: string }>('SELECT count(*) FROM medical_clearances')).rows[0]?.count).toBe('1');
        const audits = await client.query('SELECT action, object_type, before_json, after_json FROM audit_events');
        expect(audits.rows).toHaveLength(2);
        expect(audits.rows.every((row: { action: string; object_type: string }) => row.action === 'medical.clearance.set' && row.object_type === 'MedicalClearance')).toBe(true);
        const events = await client.query('SELECT event_type, payload_json FROM outbox_events');
        expect(events.rows).toHaveLength(2);
        expect(events.rows.every((row: { event_type: string }) => row.event_type === 'MedicalClearanceSet')).toBe(true);
        expect(JSON.stringify([audits.rows, events.rows])).not.toContain('Synthetic-');
      });
      const cleared = await service.setClearance(scopedActor, id, { cleared: true, allergyFlags: [], specialHealthNeeds: '' });
      expect(cleared).toMatchObject({ allergyFlags: [], specialHealthNeeds: '' });
    });
  });

  it('returns 404 outside organization/campus and 403 without edit permission; writes nothing', async () => {
    await fixture(async (service, scopedActor, id, db) => {
      for (const outsider of [{ ...scopedActor, organizationId: randomUUID() }, { ...scopedActor, campusIds: [randomUUID()] }, { ...scopedActor, campusIds: [] }]) {
        await expect(service.getClearance(outsider, id)).rejects.toMatchObject({ status: 404 });
        await expect(service.setClearance(outsider, id, { cleared: true })).rejects.toMatchObject({ status: 404 });
      }
      await expect(service.setClearance({ ...scopedActor, permissions: ['medical:read'] }, id, { cleared: true })).rejects.toMatchObject({ status: 403 });
      for (const table of ['medical_clearances', 'audit_events', 'outbox_events']) expect((await db.query<{ count: string }>(`SELECT count(*) FROM ${table}`)).rows[0]?.count).toBe('0');
    });
  });

  it('rolls back clearance and audit when the outbox write fails', async () => {
    await fixture(async (service, scopedActor, id, db) => {
      await db.query(`ALTER TABLE outbox_events ADD CONSTRAINT test_reject_event CHECK (event_type <> 'MedicalClearanceSet')`);
      await expect(service.setClearance(scopedActor, id, { cleared: true })).rejects.toThrow();
      for (const table of ['medical_clearances', 'audit_events', 'outbox_events']) expect((await db.query<{ count: string }>(`SELECT count(*) FROM ${table}`)).rows[0]?.count).toBe('0');
    });
  });
});
