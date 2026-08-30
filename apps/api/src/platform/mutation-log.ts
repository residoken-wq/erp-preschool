import type { PoolClient } from 'pg';
import type { ActorContext } from '@sop-os/contracts';

type Mutation = {
  action: string;
  objectType: string;
  objectId: string;
  before?: unknown;
  after?: unknown;
  reason?: string | undefined;
  eventType: string;
  payload: Record<string, unknown>;
};

export async function recordMutation(client: PoolClient, actor: ActorContext, mutation: Mutation): Promise<void> {
  await client.query(
    `INSERT INTO audit_events(
       organization_id, actor_type, actor_id, action, object_type, object_id,
       before_json, after_json, reason, correlation_id
     ) VALUES ($1, 'USER', $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, $9)`,
    [
      actor.organizationId,
      actor.actorId,
      mutation.action,
      mutation.objectType,
      mutation.objectId,
      mutation.before === undefined ? null : JSON.stringify(mutation.before),
      mutation.after === undefined ? null : JSON.stringify(mutation.after),
      mutation.reason ?? null,
      actor.correlationId
    ]
  );
  await client.query(
    `INSERT INTO outbox_events(
       organization_id, event_type, aggregate_type, aggregate_id, payload_json, correlation_id
     ) VALUES ($1, $2, $3, $4, $5::jsonb, $6)`,
    [actor.organizationId, mutation.eventType, mutation.objectType, mutation.objectId, JSON.stringify(mutation.payload), actor.correlationId]
  );
}
