import { ConflictException, NotFoundException } from '@nestjs/common';
import type { ActorContext } from '@sop-os/contracts';
import type { PoolClient } from 'pg';
import { recordMutation } from './mutation-log.js';

export async function createApprovalRequest(client: PoolClient, actor: ActorContext, params: { entityType: string; entityId: string; thresholdSnapshot: Record<string, unknown> }): Promise<{ id: string }> {
  const result = await client.query<{ id: string }>(
    `INSERT INTO approval_requests (organization_id, entity_type, entity_id, requested_by, threshold_snapshot)
     VALUES ($1, $2, $3, $4, $5::jsonb) RETURNING id`,
    [actor.organizationId, params.entityType, params.entityId, actor.actorId, JSON.stringify(params.thresholdSnapshot)]
  );
  const request = result.rows[0];
  if (!request) throw new ConflictException('Approval request could not be created');
  await recordMutation(client, actor, {
    action: 'approval.request', objectType: 'ApprovalRequest', objectId: request.id,
    after: { status: 'PENDING', rowVersion: '1' }, eventType: 'ApprovalRequested',
    payload: { entityType: params.entityType, entityId: params.entityId, approvalRequestId: request.id }
  });
  return request;
}

// The caller checks the entity's campus scope and holds its lock in this transaction.
// Organization is explicit because this platform table has no implicit tenant filter.
export async function getPendingApprovalRequest(client: PoolClient, entityType: string, entityId: string, organizationId: string): Promise<{ id: string; requestedBy: string } | null> {
  const result = await client.query<{ id: string; requestedBy: string }>(
    `SELECT id, requested_by AS "requestedBy" FROM approval_requests
     WHERE entity_type = $1 AND entity_id = $2 AND organization_id = $3 AND status = 'PENDING'
     ORDER BY created_at DESC, id LIMIT 1`, [entityType, entityId, organizationId]
  );
  return result.rows[0] ?? null;
}

export async function decideApprovalRequest(client: PoolClient, actor: ActorContext, id: string, decision: 'APPROVED' | 'REJECTED', reason?: string): Promise<{ id: string; status: string; rowVersion: string }> {
  const current = await client.query<{ requestedBy: string; status: string; rowVersion: string }>(
    `SELECT requested_by AS "requestedBy", status, row_version AS "rowVersion" FROM approval_requests
     WHERE id = $1 AND organization_id = $2 FOR UPDATE`, [id, actor.organizationId]
  );
  const request = current.rows[0];
  if (!request) throw new NotFoundException('Approval request not found');
  if (request.status !== 'PENDING') throw new ConflictException('Approval request is already decided');
  if (request.requestedBy === actor.actorId) throw new ConflictException('Requester cannot decide their own approval request');
  if (!['APPROVED', 'REJECTED'].includes(decision)) throw new ConflictException('Invalid approval decision');
  const result = await client.query<{ id: string; status: string; rowVersion: string }>(
    `UPDATE approval_requests SET status = $3, approver_id = $4, reason = $5, decided_at = now(), row_version = row_version + 1
     WHERE id = $1 AND organization_id = $2 RETURNING id, status, row_version AS "rowVersion"`,
    [id, actor.organizationId, decision, actor.actorId, reason ?? null]
  );
  const updated = result.rows[0];
  if (!updated) throw new ConflictException('Approval request scope conflict');
  await recordMutation(client, actor, {
    action: 'approval.decide', objectType: 'ApprovalRequest', objectId: id,
    before: { status: request.status, rowVersion: request.rowVersion }, after: updated,
    eventType: 'ApprovalDecided', payload: { approvalRequestId: id, decision }
  });
  return updated;
}
