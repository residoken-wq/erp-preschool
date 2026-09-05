import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ActorContext, ApplicationStatus, PageResult } from '@sop-os/contracts';
import { applicationStateMachine } from '@sop-os/domain';
import type { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
import { PG_POOL } from '../../platform/database.module.js';
import { recordMutation } from '../../platform/mutation-log.js';

type ApplicationRow = {
  id: string;
  code: string;
  status: ApplicationStatus;
  campus_id: string;
  program_code: string;
  intake_code: string;
  row_version: string;
};

type OfferRow = {
  id: string;
  application_id: string;
  status: string;
  code: string;
  campus_id: string;
  program_code: string;
  intake_code: string;
  row_version: string;
  created_by: string | null;
};

const offerTransitions: Readonly<Record<string, readonly string[]>> = {
  DRAFT: ['PENDING_APPROVAL', 'WITHDRAWN'],
  PENDING_APPROVAL: ['APPROVED', 'DRAFT', 'WITHDRAWN'],
  APPROVED: ['ISSUED', 'WITHDRAWN'],
  ISSUED: ['ACCEPTED', 'DECLINED', 'EXPIRED', 'WITHDRAWN'],
  ACCEPTED: [], DECLINED: [], EXPIRED: [], WITHDRAWN: []
};

export function assertOfferApprovalSeparation(createdBy: string | null, actorId: string, targetStatus: string): void {
  if (targetStatus === 'APPROVED' && createdBy === actorId) {
    throw new ConflictException('Offer author cannot approve their own offer');
  }
}

@Injectable()
export class ApplicationService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async list(actor: ActorContext, filter: { status?: ApplicationStatus | undefined; query?: string | undefined }): Promise<PageResult<Record<string, unknown>>> {
    const result = await this.pool.query<Record<string, unknown>>(
      `SELECT a.id, a.code, a.status, a.campus_id, a.program_code, a.intake_code, a.assigned_user_id,
              a.submitted_at, a.created_at, l.code AS lead_code,
              p.first_name, p.last_name,
              latest_offer.id AS offer_id, latest_offer.code AS offer_code, latest_offer.status AS offer_status,
              latest_enrollment.id AS enrollment_id, latest_enrollment.code AS enrollment_code,
              latest_enrollment.status AS enrollment_status, latest_enrollment.handover_status,
              latest_enrollment.contract_status, latest_enrollment.fee_plan_status,
              count(*) OVER() AS total_count
       FROM applications a
       LEFT JOIN leads l ON l.id = a.lead_id
       LEFT JOIN persons p ON p.id = l.primary_contact_person_id
       LEFT JOIN LATERAL (
         SELECT o.id, o.code, o.status FROM offers o
         WHERE o.application_id = a.id AND o.organization_id = a.organization_id
         ORDER BY o.version_number DESC, o.created_at DESC LIMIT 1
       ) latest_offer ON true
       LEFT JOIN LATERAL (
         SELECT e.id, e.code, e.status, h.status AS handover_status,
                c.status AS contract_status, fp.status AS fee_plan_status
         FROM enrollments e
         LEFT JOIN handover_packages h ON h.enrollment_id = e.id
         LEFT JOIN LATERAL (SELECT status FROM contracts WHERE enrollment_id = e.id ORDER BY version_number DESC LIMIT 1) c ON true
         LEFT JOIN LATERAL (SELECT status FROM fee_plans WHERE enrollment_id = e.id ORDER BY created_at DESC LIMIT 1) fp ON true
         WHERE e.application_id = a.id AND e.organization_id = a.organization_id
         ORDER BY e.created_at DESC LIMIT 1
       ) latest_enrollment ON true
       WHERE a.organization_id = $1 AND a.campus_id = ANY($2::uuid[])
         AND ($3::text IS NULL OR a.status = $3)
         AND ($4 = '' OR a.code ILIKE '%' || $4 || '%' OR p.first_name || ' ' || p.last_name ILIKE '%' || $4 || '%')
       ORDER BY a.created_at DESC LIMIT 100`,
      [actor.organizationId, actor.campusIds, filter.status ?? null, filter.query?.trim() ?? '']
    );
    const total = Number(result.rows[0]?.total_count ?? 0);
    return { data: result.rows, meta: { page: 1, pageSize: 100, total } };
  }

  async transition(actor: ActorContext, id: string, command: { to: ApplicationStatus; reason?: string }): Promise<Record<string, unknown>> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<ApplicationRow>(
        `SELECT id, code, status, campus_id, program_code, intake_code, row_version
         FROM applications WHERE id = $1 AND organization_id = $2 FOR UPDATE`, [id, actor.organizationId]
      );
      const application = current.rows[0];
      if (!application || !actor.campusIds.includes(application.campus_id)) throw new NotFoundException('Application not found');
      try { applicationStateMachine.transition(application.status, command.to); } catch { throw new ConflictException(`Transition ${application.status} -> ${command.to} is not allowed`); }
      if (['INCOMPLETE', 'WAITLISTED', 'REJECTED'].includes(command.to) && !command.reason?.trim()) throw new BadRequestException('reason is required');
      const result = await client.query<Record<string, unknown>>(
        `UPDATE applications SET status = $3::varchar,
           submitted_at = CASE WHEN $3::varchar = 'SUBMITTED' THEN now() ELSE submitted_at END,
           verified_at = CASE WHEN $3::varchar = 'VERIFIED' THEN now() ELSE verified_at END,
           updated_at = now(), row_version = row_version + 1
         WHERE id = $1 AND organization_id = $2 RETURNING id, code, status, row_version`,
        [id, actor.organizationId, command.to]
      );
      await recordMutation(client, actor, {
        action: 'application.transition', objectType: 'Application', objectId: id,
        before: application, after: result.rows[0], reason: command.reason,
        eventType: `Application${command.to.charAt(0)}${command.to.slice(1).toLowerCase()}`,
        payload: { applicationId: id, from: application.status, to: command.to }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally { client.release(); }
  }

  async createOffer(
    actor: ActorContext,
    applicationId: string,
    command: { code: string; validUntil: string; terms: Record<string, unknown> }
  ): Promise<Record<string, unknown>> {
    if (!command.code || !command.validUntil) throw new BadRequestException('code and validUntil are required');
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<ApplicationRow>(
        `SELECT id, code, status, campus_id, program_code, intake_code, row_version
         FROM applications WHERE id = $1 AND organization_id = $2 FOR UPDATE`, [applicationId, actor.organizationId]
      );
      const application = current.rows[0];
      if (!application || !actor.campusIds.includes(application.campus_id)) throw new NotFoundException('Application not found');
      if (application.status !== 'DECISION_PENDING') throw new ConflictException('Offer requires application in DECISION_PENDING');
      const id = randomUUID();
      const result = await client.query<Record<string, unknown>>(
        `INSERT INTO offers(id, organization_id, application_id, code, terms_json, valid_until, created_by)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7) RETURNING id, code, status, version_number, valid_until, created_by`,
        [id, actor.organizationId, applicationId, command.code, JSON.stringify(command.terms ?? {}), command.validUntil, actor.actorId]
      );
      await recordMutation(client, actor, {
        action: 'offer.create', objectType: 'Offer', objectId: id, after: result.rows[0],
        eventType: 'OfferDrafted', payload: { offerId: id, applicationId }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async transitionOffer(actor: ActorContext, offerId: string, command: { to: string; reason?: string }): Promise<Record<string, unknown>> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<OfferRow>(
        `SELECT o.id, o.application_id, o.status, o.code, a.campus_id, a.program_code, a.intake_code, o.row_version, o.created_by
         FROM offers o JOIN applications a ON a.id = o.application_id
         WHERE o.id = $1 AND o.organization_id = $2 FOR UPDATE OF o`, [offerId, actor.organizationId]
      );
      const offer = current.rows[0];
      if (!offer || !actor.campusIds.includes(offer.campus_id)) throw new NotFoundException('Offer not found');
      if (!(offerTransitions[offer.status] ?? []).includes(command.to)) throw new ConflictException(`Transition ${offer.status} -> ${command.to} is not allowed`);
      assertOfferApprovalSeparation(offer.created_by, actor.actorId, command.to);
      if (['DRAFT', 'DECLINED', 'WITHDRAWN'].includes(command.to) && !command.reason?.trim()) throw new BadRequestException('reason is required');
      const result = await client.query<Record<string, unknown>>(
        `UPDATE offers SET status = $3::varchar,
           approved_by = CASE WHEN $3::varchar = 'APPROVED' THEN $4 ELSE approved_by END,
           approved_at = CASE WHEN $3::varchar = 'APPROVED' THEN now() ELSE approved_at END,
           issued_at = CASE WHEN $3::varchar = 'ISSUED' THEN now() ELSE issued_at END,
           responded_at = CASE WHEN $3::varchar IN ('ACCEPTED','DECLINED') THEN now() ELSE responded_at END,
           updated_at = now(), row_version = row_version + 1
         WHERE id = $1 AND organization_id = $2 RETURNING id, code, status, version_number, valid_until`,
        [offerId, actor.organizationId, command.to, actor.actorId]
      );
      if (command.to === 'ACCEPTED') await client.query(`UPDATE applications SET status = 'OFFERED', updated_at = now(), row_version = row_version + 1 WHERE id = $1`, [offer.application_id]);
      await recordMutation(client, actor, {
        action: 'offer.transition', objectType: 'Offer', objectId: offerId, before: offer, after: result.rows[0], reason: command.reason,
        eventType: `Offer${command.to.charAt(0)}${command.to.slice(1).toLowerCase()}`, payload: { offerId, applicationId: offer.application_id, from: offer.status, to: command.to }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async createEnrollment(actor: ActorContext, offerId: string, command: { code: string }): Promise<Record<string, unknown>> {
    if (!command.code) throw new BadRequestException('code is required');
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query<OfferRow>(
        `SELECT o.id, o.application_id, o.status, o.code, a.campus_id, a.program_code, a.intake_code, o.row_version, o.created_by
         FROM offers o JOIN applications a ON a.id = o.application_id
         WHERE o.id = $1 AND o.organization_id = $2 FOR UPDATE OF o`, [offerId, actor.organizationId]
      );
      const offer = current.rows[0];
      if (!offer || !actor.campusIds.includes(offer.campus_id)) throw new NotFoundException('Offer not found');
      if (offer.status !== 'ACCEPTED') throw new ConflictException('Enrollment requires ACCEPTED offer');
      const id = randomUUID();
      const result = await client.query<Record<string, unknown>>(
        `INSERT INTO enrollments(id, organization_id, application_id, offer_id, code, campus_id, program_code, intake_code, status, confirmed_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'CONFIRMED', now()) RETURNING id, code, status, campus_id, program_code, intake_code`,
        [id, actor.organizationId, offer.application_id, offerId, command.code, offer.campus_id, offer.program_code, offer.intake_code]
      );
      await client.query(
        `INSERT INTO handover_packages(organization_id, enrollment_id, checklist_json)
         VALUES ($1, $2, '[{"key":"identity","label":"Hồ sơ định danh","complete":false},{"key":"consent","label":"Consent","complete":false},{"key":"health","label":"Thông tin sức khỏe","complete":false}]')`,
        [actor.organizationId, id]
      );
      await recordMutation(client, actor, {
        action: 'enrollment.confirm', objectType: 'Enrollment', objectId: id, after: result.rows[0],
        eventType: 'EnrollmentConfirmed', payload: { enrollmentId: id, offerId }
      });
      await client.query('COMMIT');
      return result.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async listEnrollments(actor: ActorContext): Promise<Record<string, unknown>[]> {
    const result = await this.pool.query<Record<string, unknown>>(
      `SELECT e.id, e.code, e.status, e.campus_id, e.program_code, e.intake_code, e.confirmed_at,
              h.status AS handover_status, c.status AS contract_status, fp.status AS fee_plan_status
       FROM enrollments e
       LEFT JOIN handover_packages h ON h.enrollment_id = e.id
       LEFT JOIN LATERAL (SELECT status FROM contracts WHERE enrollment_id = e.id ORDER BY version_number DESC LIMIT 1) c ON true
       LEFT JOIN LATERAL (SELECT status FROM fee_plans WHERE enrollment_id = e.id ORDER BY created_at DESC LIMIT 1) fp ON true
       WHERE e.organization_id = $1 AND e.campus_id = ANY($2::uuid[]) ORDER BY e.created_at DESC`,
      [actor.organizationId, actor.campusIds]
    );
    return result.rows;
  }

  async createFinanceSetup(
    actor: ActorContext,
    enrollmentId: string,
    command: { contractCode: string; feePlanCode: string; totalAmount: number; currency?: string }
  ): Promise<Record<string, unknown>> {
    if (!command.contractCode || !command.feePlanCode || !Number.isFinite(command.totalAmount) || command.totalAmount < 0) {
      throw new BadRequestException('contractCode, feePlanCode and non-negative totalAmount are required');
    }
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const enrollment = await client.query<{ id: string; campus_id: string; status: string }>(
        `SELECT id, campus_id, status FROM enrollments WHERE id = $1 AND organization_id = $2 FOR UPDATE`,
        [enrollmentId, actor.organizationId]
      );
      const current = enrollment.rows[0];
      if (!current || !actor.campusIds.includes(current.campus_id)) throw new NotFoundException('Enrollment not found');
      if (!['CONFIRMED', 'PENDING_CONDITION'].includes(current.status)) throw new ConflictException('Finance setup requires confirmed enrollment');
      const contractId = randomUUID();
      const feePlanId = randomUUID();
      await client.query(
        `INSERT INTO contracts(id, organization_id, enrollment_id, code) VALUES ($1, $2, $3, $4)`,
        [contractId, actor.organizationId, enrollmentId, command.contractCode]
      );
      await client.query(
        `INSERT INTO fee_plans(id, organization_id, enrollment_id, code, total_amount, currency)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [feePlanId, actor.organizationId, enrollmentId, command.feePlanCode, command.totalAmount, command.currency ?? 'VND']
      );
      await client.query(`UPDATE enrollments SET status = 'PENDING_CONDITION', updated_at = now(), row_version = row_version + 1 WHERE id = $1`, [enrollmentId]);
      await recordMutation(client, actor, {
        action: 'enrollment.finance.setup', objectType: 'Enrollment', objectId: enrollmentId,
        after: { contractId, feePlanId, status: 'PENDING_CONDITION' }, eventType: 'EnrollmentFinanceSetupCreated',
        payload: { enrollmentId, contractId, feePlanId }
      });
      await client.query('COMMIT');
      return { enrollmentId, contractId, contractStatus: 'DRAFT', feePlanId, feePlanStatus: 'DRAFT' };
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }

  async transitionHandover(
    actor: ActorContext,
    enrollmentId: string,
    command: { to: 'READY' | 'SUBMITTED' | 'RETURNED' | 'ACCEPTED'; reason?: string; checklist?: Array<{ key: string; label: string; complete: boolean }> }
  ): Promise<Record<string, unknown>> {
    const transitions: Readonly<Record<string, readonly string[]>> = {
      NOT_READY: ['READY'], READY: ['SUBMITTED', 'NOT_READY'], SUBMITTED: ['RETURNED', 'ACCEPTED'], RETURNED: ['READY'], ACCEPTED: []
    };
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query<{ id: string; status: string; checklist_json: Array<{ complete: boolean }>; campus_id: string }>(
        `SELECT h.id, h.status, h.checklist_json, e.campus_id FROM handover_packages h
         JOIN enrollments e ON e.id = h.enrollment_id
         WHERE h.enrollment_id = $1 AND h.organization_id = $2 FOR UPDATE OF h`, [enrollmentId, actor.organizationId]
      );
      const handover = result.rows[0];
      if (!handover || !actor.campusIds.includes(handover.campus_id)) throw new NotFoundException('Handover not found');
      if (!(transitions[handover.status] ?? []).includes(command.to)) throw new ConflictException(`Transition ${handover.status} -> ${command.to} is not allowed`);
      const checklist = command.checklist ?? handover.checklist_json;
      if (command.to === 'READY' && checklist.some((item) => !item.complete)) throw new BadRequestException('All mandatory checklist items must be complete');
      if (command.to === 'RETURNED' && !command.reason?.trim()) throw new BadRequestException('reason is required when returning a handover');
      const updated = await client.query<Record<string, unknown>>(
        `UPDATE handover_packages SET status = $3::varchar, checklist_json = $4::jsonb, exception_reason = $5,
           submitted_at = CASE WHEN $3::varchar = 'SUBMITTED' THEN now() ELSE submitted_at END,
           accepted_at = CASE WHEN $3::varchar = 'ACCEPTED' THEN now() ELSE accepted_at END,
           accepted_by = CASE WHEN $3::varchar = 'ACCEPTED' THEN $6 ELSE accepted_by END,
           updated_at = now(), row_version = row_version + 1
         WHERE enrollment_id = $1 AND organization_id = $2 RETURNING id, enrollment_id, status, checklist_json, row_version`,
        [enrollmentId, actor.organizationId, command.to, JSON.stringify(checklist), command.reason ?? null, actor.actorId]
      );
      if (command.to === 'ACCEPTED') await client.query(`UPDATE enrollments SET status = 'HANDED_OVER', updated_at = now(), row_version = row_version + 1 WHERE id = $1`, [enrollmentId]);
      await recordMutation(client, actor, {
        action: 'handover.transition', objectType: 'HandoverPackage', objectId: handover.id,
        before: handover, after: updated.rows[0], reason: command.reason,
        eventType: `Handover${command.to.charAt(0)}${command.to.slice(1).toLowerCase()}`,
        payload: { handoverId: handover.id, enrollmentId, from: handover.status, to: command.to }
      });
      await client.query('COMMIT');
      return updated.rows[0]!;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }
}
