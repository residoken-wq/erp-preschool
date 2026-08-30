import { Body, Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import type { ActorContext, DashboardSummary } from '@sop-os/contracts';
import type { Pool } from 'pg';
import { CurrentActor } from '../../platform/actor-context.js';
import { PG_POOL } from '../../platform/database.module.js';
import { RequirePermissions } from '../../platform/permissions.js';

@Controller()
export class OperationsController {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  @Get('context')
  @RequirePermissions('identity:read')
  async context(@CurrentActor() actor: ActorContext): Promise<Record<string, unknown>> {
    const user = await this.pool.query<Record<string, unknown>>(
      `SELECT id, display_name, email_normalized, status FROM user_accounts
       WHERE id = $1 AND organization_id = $2`, [actor.actorId, actor.organizationId]
    );
    const campuses = await this.pool.query<Record<string, unknown>>(
      `SELECT id, code, name FROM campuses WHERE organization_id = $1 AND id = ANY($2::uuid[]) AND status = 'ACTIVE' ORDER BY name`,
      [actor.organizationId, actor.campusIds]
    );
    const roles = await this.pool.query<Record<string, unknown>>(
      `SELECT DISTINCT r.code, r.name FROM user_role_scopes urs JOIN roles r ON r.id = urs.role_id
       WHERE urs.organization_id = $1 AND urs.user_id = $2 AND urs.valid_from <= now() AND (urs.valid_to IS NULL OR urs.valid_to > now())`,
      [actor.organizationId, actor.actorId]
    );
    return { user: user.rows[0] ?? null, campuses: campuses.rows, roles: roles.rows, permissions: actor.permissions };
  }

  @Get('dashboard/summary')
  @RequirePermissions('dashboard:read')
  async summary(@CurrentActor() actor: ActorContext): Promise<DashboardSummary> {
    const result = await this.pool.query<{
      leads_total: string; leads_new: string; leads_qualified: string; leads_converted: string;
      apps_total: string; apps_review: string; apps_incomplete: string; apps_offered: string;
      tasks_today: string; tasks_overdue: string; sops_total: string; sops_draft: string; sops_review: string; sops_effective: string;
    }>(
      `SELECT
        (SELECT count(*) FROM leads WHERE organization_id = $1) AS leads_total,
        (SELECT count(*) FROM leads WHERE organization_id = $1 AND status = 'NEW') AS leads_new,
        (SELECT count(*) FROM leads WHERE organization_id = $1 AND status = 'QUALIFIED') AS leads_qualified,
        (SELECT count(*) FROM leads WHERE organization_id = $1 AND status = 'CONVERTED') AS leads_converted,
        (SELECT count(*) FROM applications WHERE organization_id = $1) AS apps_total,
        (SELECT count(*) FROM applications WHERE organization_id = $1 AND status IN ('SUBMITTED','DOCUMENT_REVIEW')) AS apps_review,
        (SELECT count(*) FROM applications WHERE organization_id = $1 AND status = 'INCOMPLETE') AS apps_incomplete,
        (SELECT count(*) FROM applications WHERE organization_id = $1 AND status = 'OFFERED') AS apps_offered,
        (SELECT count(*) FROM work_items WHERE organization_id = $1 AND assignee_user_id = $2 AND status IN ('OPEN','IN_PROGRESS') AND due_at::date = CURRENT_DATE) AS tasks_today,
        (SELECT count(*) FROM work_items WHERE organization_id = $1 AND assignee_user_id = $2 AND status IN ('OPEN','IN_PROGRESS') AND due_at < now()) AS tasks_overdue,
        (SELECT count(*) FROM sops WHERE organization_id = $1 AND lifecycle_status = 'ACTIVE') AS sops_total,
        (SELECT count(*) FROM sop_versions WHERE organization_id = $1 AND status IN ('DRAFT','REVISION_REQUIRED')) AS sops_draft,
        (SELECT count(*) FROM sop_versions WHERE organization_id = $1 AND status = 'IN_REVIEW') AS sops_review,
        (SELECT count(*) FROM sop_versions WHERE organization_id = $1 AND status = 'EFFECTIVE') AS sops_effective`,
      [actor.organizationId, actor.actorId]
    );
    const row = result.rows[0]!;
    return {
      leads: { total: Number(row.leads_total), new: Number(row.leads_new), qualified: Number(row.leads_qualified), converted: Number(row.leads_converted) },
      applications: { total: Number(row.apps_total), inReview: Number(row.apps_review), incomplete: Number(row.apps_incomplete), offered: Number(row.apps_offered) },
      tasks: { dueToday: Number(row.tasks_today), overdue: Number(row.tasks_overdue) },
      sops: { total: Number(row.sops_total), draft: Number(row.sops_draft), inReview: Number(row.sops_review), effective: Number(row.sops_effective) }
    };
  }

  @Get('tasks')
  @RequirePermissions('task:read')
  async tasks(@CurrentActor() actor: ActorContext, @Query('status') status?: string): Promise<Record<string, unknown>[]> {
    const result = await this.pool.query<Record<string, unknown>>(
      `SELECT id, title, description, priority, status, due_at, related_object_type, related_object_id, row_version,
              CASE WHEN due_at < now() AND status IN ('OPEN','IN_PROGRESS') THEN true ELSE false END AS overdue
       FROM work_items WHERE organization_id = $1 AND assignee_user_id = $2
         AND ($3::text IS NULL OR status = $3) ORDER BY due_at NULLS LAST LIMIT 100`,
      [actor.organizationId, actor.actorId, status ?? null]
    );
    return result.rows;
  }

  @Patch('tasks/:id')
  @RequirePermissions('task:update')
  async updateTask(
    @CurrentActor() actor: ActorContext,
    @Param('id') id: string,
    @Body() command: { status: 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'; rowVersion: number }
  ): Promise<Record<string, unknown>> {
    const result = await this.pool.query<Record<string, unknown>>(
      `UPDATE work_items SET status = $4,
         completed_at = CASE WHEN $4 = 'DONE' THEN now() ELSE NULL END,
         updated_at = now(), row_version = row_version + 1
       WHERE id = $1 AND organization_id = $2 AND assignee_user_id = $3 AND row_version = $5
       RETURNING id, title, status, completed_at, row_version`,
      [id, actor.organizationId, actor.actorId, command.status, command.rowVersion]
    );
    if (!result.rows[0]) throw new Error('Task not found or changed by another user');
    return result.rows[0];
  }

  @Get('audit-events')
  @RequirePermissions('audit:read')
  async audit(@CurrentActor() actor: ActorContext, @Query('objectType') objectType?: string): Promise<Record<string, unknown>[]> {
    const result = await this.pool.query<Record<string, unknown>>(
      `SELECT id, occurred_at, actor_type, actor_id, action, object_type, object_id, reason, correlation_id
       FROM audit_events WHERE organization_id = $1 AND ($2::text IS NULL OR object_type = $2)
       ORDER BY occurred_at DESC LIMIT 100`, [actor.organizationId, objectType ?? null]
    );
    return result.rows;
  }

  @Get('audit-integrity')
  @RequirePermissions('audit:verify')
  async auditIntegrity(@CurrentActor() actor: ActorContext): Promise<{ valid: boolean; hashedEvents: number }> {
    const result = await this.pool.query<{ valid: boolean; hashed_events: string }>(
      `WITH ordered AS (
         SELECT ae.*, lag(event_hash) OVER (ORDER BY chain_no) AS prior_hash
         FROM audit_events ae
         WHERE organization_id = $1 AND event_hash IS NOT NULL
       ), checked AS (
         SELECT prev_hash IS NOT DISTINCT FROM prior_hash AS link_valid,
                event_hash = encode(digest(concat_ws('|',
                  coalesce(prev_hash, ''), id::text, organization_id::text,
                  extract(epoch FROM occurred_at)::text, action, object_type, object_id::text,
                  coalesce(before_json::text, ''), coalesce(after_json::text, ''),
                  coalesce(reason, '')
                ), 'sha256'), 'hex') AS hash_valid
         FROM ordered
       )
       SELECT coalesce(bool_and(link_valid AND hash_valid), true) AS valid,
              count(*)::text AS hashed_events
       FROM checked`, [actor.organizationId]
    );
    return { valid: result.rows[0]?.valid ?? false, hashedEvents: Number(result.rows[0]?.hashed_events ?? 0) };
  }
}
