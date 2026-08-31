import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { ActorContext, LeadStatus, PageResult } from '@sop-os/contracts';
import { assertPreG1SyntheticLead, leadStateMachine, PreG1DataPolicyError } from '@sop-os/domain';
import type { Pool, PoolClient } from 'pg';
import { randomUUID } from 'node:crypto';
import { PG_POOL } from '../../platform/database.module.js';
import { recordMutation } from '../../platform/mutation-log.js';

export type CreateLeadCommand = {
  dataProvenance: 'synthetic';
  code: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  sourceType: string;
  campusId?: string;
};

type LeadRow = {
  id: string;
  code: string;
  status: LeadStatus;
  campus_id: string | null;
  owner_user_id: string | null;
  next_action_at: string | null;
  row_version: string;
};

@Injectable()
export class LeadService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async list(
    actor: ActorContext,
    filter: { query?: string | undefined; status?: LeadStatus | undefined; page?: number | undefined; pageSize?: number | undefined }
  ): Promise<PageResult<Record<string, unknown>>> {
    const page = Number.isFinite(filter.page) && Number(filter.page) > 0 ? Number(filter.page) : 1;
    const pageSize = Math.min(Number.isFinite(filter.pageSize) && Number(filter.pageSize) > 0 ? Number(filter.pageSize) : 20, 100);
    const query = filter.query?.trim() ?? '';
    const result = await this.pool.query<Record<string, unknown> & { total_count: string }>(
      `SELECT l.id, l.code, l.status, l.priority, l.source_type, l.campus_id, l.owner_user_id,
              l.next_action_at, l.created_at, p.first_name, p.last_name,
              p.email_normalized AS email, p.phone_normalized AS phone,
              count(*) OVER() AS total_count
       FROM leads l JOIN persons p ON p.id = l.primary_contact_person_id
       WHERE l.organization_id = $1
         AND ($2 = '' OR l.code ILIKE '%' || $2 || '%' OR p.first_name || ' ' || p.last_name ILIKE '%' || $2 || '%')
         AND ($3::text IS NULL OR l.status = $3)
         AND (l.campus_id IS NULL OR l.campus_id = ANY($4::uuid[]))
       ORDER BY l.created_at DESC LIMIT $5 OFFSET $6`,
      [actor.organizationId, query, filter.status ?? null, actor.campusIds, pageSize, (page - 1) * pageSize]
    );
    const total = Number(result.rows[0]?.total_count ?? 0);
    return { data: result.rows.map((row) => {
      const copy: Record<string, unknown> = { ...row };
      delete copy.total_count;
      return copy;
    }), meta: { page, pageSize, total } };
  }

  async create(actor: ActorContext, command: CreateLeadCommand): Promise<{ id: string; code: string; status: 'NEW' }> {
    const email = command.email?.trim().toLowerCase() || null;
    const phone = command.phone?.replace(/[^+\d]/g, '') || null;
    if (!command.code?.trim() || !command.firstName?.trim() || !command.lastName?.trim() || !command.sourceType?.trim()) {
      throw new BadRequestException('code, firstName, lastName and sourceType are required');
    }
    if (!email && !phone) throw new BadRequestException('email or phone is required');
    if (command.campusId && !actor.campusIds.includes(command.campusId)) throw new BadRequestException('Campus is outside the actor scope');
    try {
      assertPreG1SyntheticLead({ ...command, email, phone });
    } catch (error) {
      if (error instanceof PreG1DataPolicyError) throw new UnprocessableEntityException(error.message);
      throw error;
    }

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const duplicate = await client.query<{ id: string; code: string }>(
        `SELECT l.id, l.code FROM leads l JOIN persons p ON p.id = l.primary_contact_person_id
         WHERE l.organization_id = $1 AND l.status NOT IN ('ARCHIVED', 'LOST')
           AND (($2::text IS NOT NULL AND p.email_normalized = $2) OR ($3::text IS NOT NULL AND p.phone_normalized = $3))
         LIMIT 1 FOR UPDATE OF l`,
        [actor.organizationId, email, phone]
      );
      if (duplicate.rowCount) throw new ConflictException(`Potential duplicate lead: ${duplicate.rows[0]!.code}`);

      const personId = randomUUID();
      const leadId = randomUUID();
      await this.insertPerson(client, actor, personId, command, email, phone);
      await client.query(
        `INSERT INTO leads(id, organization_id, code, primary_contact_person_id, campus_id, source_type, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'NEW')`,
        [leadId, actor.organizationId, command.code.trim(), personId, command.campusId ?? null, command.sourceType.trim()]
      );
      await recordMutation(client, actor, {
        action: 'lead.create', objectType: 'Lead', objectId: leadId,
        after: { code: command.code, status: 'NEW' }, eventType: 'LeadCreated', payload: { leadId, code: command.code }
      });
      await client.query('COMMIT');
      return { id: leadId, code: command.code, status: 'NEW' };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async transition(
    actor: ActorContext,
    id: string,
    command: { to: LeadStatus; reason?: string; ownerUserId?: string; nextActionAt?: string }
  ): Promise<Record<string, unknown>> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<LeadRow>(
        `SELECT id, code, status, campus_id, owner_user_id, next_action_at, row_version
         FROM leads WHERE id = $1 AND organization_id = $2 FOR UPDATE`,
        [id, actor.organizationId]
      );
      const lead = current.rows[0];
      if (!lead) throw new NotFoundException('Lead not found');
      if (lead.campus_id && !actor.campusIds.includes(lead.campus_id)) throw new NotFoundException('Lead not found');
      try { leadStateMachine.transition(lead.status, command.to); } catch { throw new ConflictException(`Transition ${lead.status} -> ${command.to} is not allowed`); }
      const ownerUserId = command.ownerUserId ?? lead.owner_user_id;
      const nextActionAt = command.nextActionAt ?? lead.next_action_at;
      if (command.to === 'ASSIGNED' && (!ownerUserId || !nextActionAt)) throw new BadRequestException('Assigned lead requires ownerUserId and nextActionAt');
      if (['DISQUALIFIED', 'LOST', 'DUPLICATE', 'ARCHIVED'].includes(command.to) && !command.reason?.trim()) {
        throw new BadRequestException('reason is required for close or exception transitions');
      }
      const updated = await client.query<Record<string, unknown>>(
        `UPDATE leads SET status = $3, owner_user_id = $4, next_action_at = $5, updated_at = now(), row_version = row_version + 1
         WHERE id = $1 AND organization_id = $2 RETURNING id, code, status, owner_user_id, next_action_at, row_version`,
        [id, actor.organizationId, command.to, ownerUserId, nextActionAt]
      );
      await recordMutation(client, actor, {
        action: 'lead.transition', objectType: 'Lead', objectId: id,
        before: lead, after: updated.rows[0], reason: command.reason,
        eventType: `Lead${command.to.charAt(0)}${command.to.slice(1).toLowerCase()}`,
        payload: { leadId: id, from: lead.status, to: command.to }
      });
      await client.query('COMMIT');
      return updated.rows[0]!;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async startApplication(
    actor: ActorContext,
    leadId: string,
    command: { code: string; programCode: string; intakeCode: string }
  ): Promise<Record<string, unknown>> {
    if (!command.code || !command.programCode || !command.intakeCode) throw new BadRequestException('code, programCode and intakeCode are required');
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<LeadRow>(
        `SELECT id, code, status, campus_id, owner_user_id, next_action_at, row_version
         FROM leads WHERE id = $1 AND organization_id = $2 FOR UPDATE`, [leadId, actor.organizationId]
      );
      const lead = current.rows[0];
      if (!lead) throw new NotFoundException('Lead not found');
      if (lead.status !== 'QUALIFIED') throw new ConflictException('Only QUALIFIED lead can start an application');
      if (!lead.campus_id || !actor.campusIds.includes(lead.campus_id)) throw new BadRequestException('Lead must belong to an accessible campus');
      const applicationId = randomUUID();
      const result = await client.query<Record<string, unknown>>(
        `INSERT INTO applications(id, organization_id, code, lead_id, campus_id, program_code, intake_code, status, assigned_user_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'DRAFT', $8)
         RETURNING id, code, status, campus_id, program_code, intake_code`,
        [applicationId, actor.organizationId, command.code, leadId, lead.campus_id, command.programCode, command.intakeCode, lead.owner_user_id]
      );
      await client.query(`UPDATE leads SET status = 'CONVERTED', updated_at = now(), row_version = row_version + 1 WHERE id = $1`, [leadId]);
      await recordMutation(client, actor, {
        action: 'application.create', objectType: 'Application', objectId: applicationId,
        after: result.rows[0], eventType: 'ApplicationStarted', payload: { applicationId, leadId }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  private async insertPerson(
    client: PoolClient,
    actor: ActorContext,
    id: string,
    command: CreateLeadCommand,
    email: string | null,
    phone: string | null
  ): Promise<void> {
    await client.query(
      `INSERT INTO persons(id, organization_id, first_name, last_name, email_normalized, phone_normalized, data_classification)
       VALUES ($1, $2, $3, $4, $5, $6, 'HRI')`,
      [id, actor.organizationId, command.firstName.trim(), command.lastName.trim(), email, phone]
    );
  }
}
