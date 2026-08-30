import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ActorContext, SopVersionStatus } from '@sop-os/contracts';
import { sopStateMachine } from '@sop-os/domain';
import type { Pool, PoolClient } from 'pg';
import { randomUUID } from 'node:crypto';
import { PG_POOL } from '../../platform/database.module.js';
import { recordMutation } from '../../platform/mutation-log.js';

type VersionRow = {
  id: string;
  sop_id: string;
  status: SopVersionStatus;
  created_by: string | null;
  row_version: string;
};

@Injectable()
export class SopService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async list(actor: ActorContext, search?: string): Promise<Record<string, unknown>[]> {
    const q = search?.trim() ?? '';
    const result = await this.pool.query<Record<string, unknown>>(
      `SELECT s.id, s.code, s.title, s.sop_type, s.priority, s.lifecycle_status,
              pn.code AS process_code, pn.name AS process_name,
              v.id AS version_id, v.version_label, v.status AS version_status, v.review_due_at
       FROM sops s JOIN process_nodes pn ON pn.id = s.process_node_id
       LEFT JOIN LATERAL (
         SELECT id, version_label, status, review_due_at FROM sop_versions sv
         WHERE sv.sop_id = s.id
         ORDER BY CASE status WHEN 'EFFECTIVE' THEN 0 WHEN 'IN_REVIEW' THEN 1 ELSE 2 END, version_number DESC LIMIT 1
       ) v ON true
       WHERE s.organization_id = $1 AND ($2 = '' OR s.code ILIKE '%' || $2 || '%' OR s.title ILIKE '%' || $2 || '%')
       ORDER BY s.priority, s.code LIMIT 100`, [actor.organizationId, q]
    );
    return result.rows;
  }

  async detail(actor: ActorContext, id: string): Promise<Record<string, unknown>> {
    const header = await this.pool.query<Record<string, unknown>>(
      `SELECT s.id, s.code, s.title, s.sop_type, s.priority, s.lifecycle_status,
              pn.code AS process_code, pn.name AS process_name
       FROM sops s JOIN process_nodes pn ON pn.id = s.process_node_id
       WHERE s.id = $1 AND s.organization_id = $2`, [id, actor.organizationId]
    );
    if (!header.rows[0]) throw new NotFoundException('SOP not found');
    const versions = await this.pool.query<Record<string, unknown>>(
      `SELECT id, version_number, version_label, status, change_summary, effective_from, review_due_at, row_version
       FROM sop_versions WHERE sop_id = $1 AND organization_id = $2 ORDER BY version_number DESC`, [id, actor.organizationId]
    );
    const currentId = versions.rows[0]?.id;
    const sections = currentId ? await this.pool.query<Record<string, unknown>>(
      `SELECT id, section_key, title, content_json, sort_order, completeness_state, row_version
       FROM sop_sections WHERE sop_version_id = $1 ORDER BY sort_order`, [currentId]
    ) : { rows: [] };
    const steps = currentId ? await this.pool.query<Record<string, unknown>>(
      `SELECT st.id, st.step_no, st.name, st.action_text, st.status_before, st.status_after, st.automation_type,
              r.code AS actor_role_code, st.row_version
       FROM sop_steps st JOIN roles r ON r.id = st.actor_role_id
       WHERE st.sop_version_id = $1 ORDER BY st.step_no`, [currentId]
    ) : { rows: [] };
    return { ...header.rows[0], versions: versions.rows, sections: sections.rows, steps: steps.rows };
  }

  async create(
    actor: ActorContext,
    command: { processNodeId: string; code: string; title: string; sopType: string; ownerRoleId?: string; priority?: string }
  ): Promise<Record<string, unknown>> {
    if (!command.processNodeId || !command.code || !command.title || !command.sopType) throw new BadRequestException('processNodeId, code, title and sopType are required');
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const process = await client.query<{ id: string; level: string }>(`SELECT id, level FROM process_nodes WHERE id = $1 AND organization_id = $2`, [command.processNodeId, actor.organizationId]);
      if (!process.rows[0] || process.rows[0].level !== 'L3') throw new BadRequestException('SOP must belong to an L3 process');
      const sopId = randomUUID();
      const versionId = randomUUID();
      const result = await client.query<Record<string, unknown>>(
        `INSERT INTO sops(id, organization_id, process_node_id, code, title, sop_type, owner_role_id, priority)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, code, title, sop_type, priority, lifecycle_status`,
        [sopId, actor.organizationId, command.processNodeId, command.code.trim(), command.title.trim(), command.sopType, command.ownerRoleId ?? null, command.priority ?? 'P0']
      );
      await client.query(
        `INSERT INTO sop_versions(id, organization_id, sop_id, version_number, version_label, status, created_by)
         VALUES ($1, $2, $3, 1, 'v1.0', 'DRAFT', $4)`, [versionId, actor.organizationId, sopId, actor.actorId]
      );
      await recordMutation(client, actor, {
        action: 'sop.create', objectType: 'SOP', objectId: sopId, after: result.rows[0],
        eventType: 'SOPCreated', payload: { sopId, versionId, code: command.code }
      });
      await client.query('COMMIT');
      return { ...result.rows[0]!, versionId, versionStatus: 'DRAFT' };
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async saveSection(
    actor: ActorContext,
    versionId: string,
    sectionKey: string,
    command: { title: string; content: Record<string, unknown>; sortOrder: number; rowVersion?: number }
  ): Promise<Record<string, unknown>> {
    if (!command.title || !Number.isInteger(command.sortOrder)) throw new BadRequestException('title and integer sortOrder are required');
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const version = await this.lockEditableVersion(client, actor, versionId);
      const existing = await client.query<{ id: string; row_version: string }>(
        `SELECT id, row_version FROM sop_sections WHERE sop_version_id = $1 AND section_key = $2 FOR UPDATE`, [versionId, sectionKey]
      );
      if (existing.rows[0] && command.rowVersion !== undefined && Number(existing.rows[0].row_version) !== command.rowVersion) {
        throw new ConflictException('Section was changed by another user');
      }
      const completeness = Object.keys(command.content ?? {}).length ? 'VALID' : 'EMPTY';
      const result = await client.query<Record<string, unknown>>(
        `INSERT INTO sop_sections(organization_id, sop_version_id, section_key, title, content_json, sort_order, completeness_state)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7)
         ON CONFLICT (sop_version_id, section_key) DO UPDATE SET title = EXCLUDED.title, content_json = EXCLUDED.content_json,
           sort_order = EXCLUDED.sort_order, completeness_state = EXCLUDED.completeness_state, row_version = sop_sections.row_version + 1
         RETURNING id, section_key, title, content_json, sort_order, completeness_state, row_version`,
        [actor.organizationId, versionId, sectionKey, command.title, JSON.stringify(command.content ?? {}), command.sortOrder, completeness]
      );
      await recordMutation(client, actor, {
        action: 'sop.section.save', objectType: 'SOPVersion', objectId: version.id, after: result.rows[0],
        eventType: 'SOPDraftChanged', payload: { versionId, sectionKey }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async saveStep(
    actor: ActorContext,
    versionId: string,
    command: { stepNo: number; name: string; actorRoleId: string; actionText: string; statusBefore?: string; statusAfter?: string; automationType?: string }
  ): Promise<Record<string, unknown>> {
    if (!Number.isInteger(command.stepNo) || command.stepNo < 1 || !command.name || !command.actorRoleId || !command.actionText) {
      throw new BadRequestException('stepNo, name, actorRoleId and actionText are required');
    }
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await this.lockEditableVersion(client, actor, versionId);
      const result = await client.query<Record<string, unknown>>(
        `INSERT INTO sop_steps(organization_id, sop_version_id, step_no, name, actor_role_id, action_text, status_before, status_after, automation_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (sop_version_id, step_no) DO UPDATE SET name = EXCLUDED.name, actor_role_id = EXCLUDED.actor_role_id,
           action_text = EXCLUDED.action_text, status_before = EXCLUDED.status_before, status_after = EXCLUDED.status_after,
           automation_type = EXCLUDED.automation_type, row_version = sop_steps.row_version + 1
         RETURNING id, step_no, name, action_text, status_before, status_after, automation_type, row_version`,
        [actor.organizationId, versionId, command.stepNo, command.name, command.actorRoleId, command.actionText,
          command.statusBefore ?? null, command.statusAfter ?? null, command.automationType ?? 'MANUAL']
      );
      await recordMutation(client, actor, {
        action: 'sop.step.save', objectType: 'SOPVersion', objectId: versionId, after: result.rows[0],
        eventType: 'SOPDraftChanged', payload: { versionId, stepNo: command.stepNo }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async transition(
    actor: ActorContext,
    versionId: string,
    command: { to: SopVersionStatus; reason?: string; effectiveFrom?: string }
  ): Promise<Record<string, unknown>> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<VersionRow>(
        `SELECT id, sop_id, status, created_by, row_version FROM sop_versions
         WHERE id = $1 AND organization_id = $2 FOR UPDATE`, [versionId, actor.organizationId]
      );
      const version = current.rows[0];
      if (!version) throw new NotFoundException('SOP version not found');
      try { sopStateMachine.transition(version.status, command.to); } catch { throw new ConflictException(`Transition ${version.status} -> ${command.to} is not allowed`); }
      if (['REVISION_REQUIRED', 'ARCHIVED'].includes(command.to) && !command.reason?.trim()) throw new BadRequestException('reason is required');
      if (command.to === 'IN_REVIEW') {
        const validation = await client.query<{ sections: string; steps: string }>(
          `SELECT (SELECT count(*) FROM sop_sections WHERE sop_version_id = $1 AND completeness_state = 'VALID') AS sections,
                  (SELECT count(*) FROM sop_steps WHERE sop_version_id = $1) AS steps`, [versionId]
        );
        if (Number(validation.rows[0]!.sections) < 1 || Number(validation.rows[0]!.steps) < 1) throw new BadRequestException('At least one valid section and one structured step are required');
      }
      if (command.to === 'APPROVED' && version.created_by === actor.actorId) throw new ConflictException('Author cannot approve their own SOP version');
      if (command.to === 'EFFECTIVE') {
        await client.query(
          `UPDATE sop_versions SET status = 'SUPERSEDED', effective_to = now(), updated_at = now(), row_version = row_version + 1
           WHERE sop_id = $1 AND status = 'EFFECTIVE' AND id <> $2`, [version.sop_id, versionId]
        );
      }
      const result = await client.query<Record<string, unknown>>(
        `UPDATE sop_versions SET status = $3,
           approved_by = CASE WHEN $3 = 'APPROVED' THEN $4 ELSE approved_by END,
           approved_at = CASE WHEN $3 = 'APPROVED' THEN now() ELSE approved_at END,
           effective_from = CASE WHEN $3 = 'EFFECTIVE' THEN COALESCE($5::timestamptz, now()) ELSE effective_from END,
           locked_at = CASE WHEN $3 IN ('IN_REVIEW','APPROVED','SCHEDULED','EFFECTIVE') THEN now() ELSE NULL END,
           updated_at = now(), row_version = row_version + 1
         WHERE id = $1 AND organization_id = $2 RETURNING id, sop_id, version_label, status, effective_from, row_version`,
        [versionId, actor.organizationId, command.to, actor.actorId, command.effectiveFrom ?? null]
      );
      await recordMutation(client, actor, {
        action: 'sop.version.transition', objectType: 'SOPVersion', objectId: versionId,
        before: version, after: result.rows[0], reason: command.reason,
        eventType: `SOPVersion${command.to.charAt(0)}${command.to.slice(1).toLowerCase()}`,
        payload: { versionId, sopId: version.sop_id, from: version.status, to: command.to }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async comment(actor: ActorContext, versionId: string, command: { body: string; sectionId?: string; stepId?: string }): Promise<Record<string, unknown>> {
    if (!command.body?.trim()) throw new BadRequestException('body is required');
    const result = await this.pool.query<Record<string, unknown>>(
      `INSERT INTO sop_review_comments(organization_id, sop_version_id, section_id, step_id, author_user_id, body)
       SELECT $1, sv.id, $3, $4, $5, $6 FROM sop_versions sv WHERE sv.id = $2 AND sv.organization_id = $1
       RETURNING id, sop_version_id, section_id, step_id, body, status, created_at`,
      [actor.organizationId, versionId, command.sectionId ?? null, command.stepId ?? null, actor.actorId, command.body.trim()]
    );
    if (!result.rows[0]) throw new NotFoundException('SOP version not found');
    return result.rows[0];
  }

  private async lockEditableVersion(client: PoolClient, actor: ActorContext, versionId: string): Promise<VersionRow> {
    const result = await client.query<VersionRow>(
      `SELECT id, sop_id, status, created_by, row_version FROM sop_versions
       WHERE id = $1 AND organization_id = $2 FOR UPDATE`, [versionId, actor.organizationId]
    );
    const version = result.rows[0];
    if (!version) throw new NotFoundException('SOP version not found');
    if (!['DRAFT', 'REVISION_REQUIRED'].includes(version.status)) throw new ConflictException(`Version ${version.status} is immutable`);
    return version;
  }
}
