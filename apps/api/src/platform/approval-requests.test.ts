import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createTestPool, withRollback } from './test-db.js';
import { createApprovalRequest, decideApprovalRequest, getPendingApprovalRequest } from './approval-requests.js';

describe.skipIf(!process.env.DATABASE_URL)('approval helper PostgreSQL evidence and scope', () => {
  it('enforces tenant, SoD, terminal decisions and atomic evidence on the caller transaction', async () => {
    const pool = createTestPool();
    try {
      await withRollback(pool, async (client) => {
        const actor = { organizationId: randomUUID(), actorId: randomUUID(), campusIds: [], permissions: [], correlationId: randomUUID() };
        const approver = { ...actor, actorId: randomUUID() };
        await client.query(`INSERT INTO organizations(id, code, name, status) VALUES ($1::uuid, left($1::text, 30), 'Synthetic-test', 'ACTIVE')`, [actor.organizationId]);
        for (const user of [actor, approver]) await client.query(`INSERT INTO user_accounts(id, organization_id, email_normalized, display_name, status) VALUES ($1, $2, $3, 'Synthetic-test', 'ACTIVE')`, [user.actorId, actor.organizationId, `${user.actorId}@example.test`]);
        const entityId = randomUUID();
        const request = await createApprovalRequest(client, actor, { entityType: 'Offer', entityId, thresholdSnapshot: { discountPercent: 20, thresholdPercent: 10 } });
        expect(await getPendingApprovalRequest(client, 'Offer', entityId, actor.organizationId)).toEqual({ id: request.id, requestedBy: actor.actorId });
        expect(await getPendingApprovalRequest(client, 'Offer', entityId, randomUUID())).toBeNull();
        await expect(decideApprovalRequest(client, { ...approver, organizationId: randomUUID() }, request.id, 'APPROVED')).rejects.toMatchObject({ status: 404 });
        await expect(decideApprovalRequest(client, actor, request.id, 'REJECTED')).rejects.toMatchObject({ status: 409 });
        expect(await decideApprovalRequest(client, approver, request.id, 'APPROVED', 'Synthetic reason')).toMatchObject({ status: 'APPROVED', rowVersion: '2' });
        await expect(decideApprovalRequest(client, approver, request.id, 'REJECTED')).rejects.toMatchObject({ status: 409 });
        expect(await getPendingApprovalRequest(client, 'Offer', entityId, actor.organizationId)).toBeNull();
        for (const table of ['audit_events', 'outbox_events']) expect((await client.query(`SELECT * FROM ${table} WHERE organization_id = $1`, [actor.organizationId])).rows).toHaveLength(2);
        const evidence = await client.query('SELECT before_json, after_json, reason FROM audit_events WHERE organization_id = $1', [actor.organizationId]);
        expect(JSON.stringify(evidence.rows)).not.toContain('Synthetic reason');
      });
    } finally { await pool.end(); }
  });
});
