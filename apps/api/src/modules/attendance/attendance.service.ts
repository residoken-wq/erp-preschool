import { BadRequestException, Inject, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import type { ActorContext, PageResult } from '@sop-os/contracts';
import type { Pool } from 'pg';
import { PG_POOL } from '../../platform/database.module.js';
import { recordMutation } from '../../platform/mutation-log.js';
import { hasRequiredPermissions } from '../../platform/permissions.js';
import { parsePagination } from '../../platform/pagination.js';

const verificationMethods = ['QR', 'FACE_ID', 'OTP', 'MANUAL_OVERRIDE', 'SYSTEM'] as const;
type VerificationMethod = typeof verificationMethods[number];
type Metadata = { mealBreakfast?: boolean; healthNote?: string };
export type CheckInCommand = { verificationMethod: VerificationMethod; clientEventId?: string } & Metadata;
export type AttendanceEvent = {
  id: string; enrollmentId: string; eventType: string; occurredAt: Date;
  actorUserId: string | null; guardianId: string | null;
  verificationMethod: VerificationMethod | null; clientEventId: string | null; metadata: Metadata;
};

export function parseCheckInCommand(value: unknown, classCheckIn = false): CheckInCommand {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BadRequestException('Check-in body must be an object');
  const body = value as Record<string, unknown>;
  const allowed = ['verificationMethod', 'clientEventId', ...(classCheckIn ? ['mealBreakfast', 'healthNote'] : [])];
  if (Object.keys(body).some((key) => !allowed.includes(key))) throw new BadRequestException('Check-in contains unknown fields');
  const verificationMethod = verificationMethods.find((method) => method === body.verificationMethod);
  if (!verificationMethod) throw new BadRequestException('Invalid verificationMethod');
  if (body.clientEventId !== undefined && (typeof body.clientEventId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.clientEventId))) throw new BadRequestException('clientEventId must be a UUID');
  if (body.mealBreakfast !== undefined && typeof body.mealBreakfast !== 'boolean') throw new BadRequestException('mealBreakfast must be a boolean');
  if (body.healthNote !== undefined && (typeof body.healthNote !== 'string' || body.healthNote.length > 1000)) throw new BadRequestException('healthNote must be a string of at most 1000 characters');
  return { verificationMethod,
    ...(body.clientEventId === undefined ? {} : { clientEventId: body.clientEventId }),
    ...(body.mealBreakfast === undefined ? {} : { mealBreakfast: body.mealBreakfast }),
    ...(body.healthNote === undefined ? {} : { healthNote: body.healthNote }) };
}

const projection = `a.id, a.enrollment_id AS "enrollmentId", a.event_type AS "eventType",
  a.occurred_at AS "occurredAt", a.actor_user_id AS "actorUserId", a.guardian_id AS "guardianId",
  a.verification_method AS "verificationMethod", a.client_event_id AS "clientEventId", a.metadata_json AS metadata`;
const scopedEvents = `FROM attendance_events a JOIN enrollments e ON e.id = a.enrollment_id AND e.organization_id = a.organization_id
  WHERE e.id = $1 AND e.organization_id = $2 AND e.campus_id = ANY($3::uuid[])`;

@Injectable()
export class AttendanceService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  gateCheckIn(actor: ActorContext, enrollmentId: string, body: CheckInCommand): Promise<AttendanceEvent> {
    return this.recordCheckIn(actor, enrollmentId, body, false);
  }

  classCheckIn(actor: ActorContext, enrollmentId: string, body: CheckInCommand): Promise<AttendanceEvent> {
    return this.recordCheckIn(actor, enrollmentId, body, true);
  }

  async listEvents(actor: ActorContext, enrollmentId: string, page?: string, pageSize?: string): Promise<PageResult<AttendanceEvent>> {
    if (!hasRequiredPermissions(actor.permissions, ['attendance:read'])) throw new ForbiddenException('Attendance read permission required');
    const pagination = parsePagination(page, pageSize);
    const params = [enrollmentId, actor.organizationId, actor.campusIds];
    const enrollment = await this.pool.query(`SELECT id FROM enrollments WHERE id = $1 AND organization_id = $2 AND campus_id = ANY($3::uuid[])`, params);
    if (!enrollment.rows[0]) throw new NotFoundException('Enrollment not found');
    const result = await this.pool.query<AttendanceEvent & { total_count: string }>(
      `SELECT ${projection}, count(*) OVER() AS total_count ${scopedEvents}
       ORDER BY a.occurred_at DESC, a.id DESC LIMIT $4 OFFSET $5`, [...params, pagination.pageSize, pagination.offset]);
    let total = Number(result.rows[0]?.total_count ?? 0);
    if (!result.rows.length && pagination.offset > 0) {
      const count = await this.pool.query<{ total: string }>(`SELECT count(*) AS total ${scopedEvents}`, params);
      total = Number(count.rows[0]?.total ?? 0);
    }
    return { data: result.rows.map(({ total_count, ...event }) => { void total_count; return event; }),
      meta: { page: pagination.page, pageSize: pagination.pageSize, total } };
  }

  private async recordCheckIn(actor: ActorContext, enrollmentId: string, body: CheckInCommand, classCheckIn: boolean): Promise<AttendanceEvent> {
    if (!hasRequiredPermissions(actor.permissions, ['attendance:record'])) throw new ForbiddenException('Attendance record permission required');
    const command = parseCheckInCommand(body, classCheckIn);
    const eventType = classCheckIn ? 'CLASS_CHECK_IN' : 'GATE_CHECK_IN';
    const metadata: Metadata = { ...(command.mealBreakfast === undefined ? {} : { mealBreakfast: command.mealBreakfast }),
      ...(command.healthNote === undefined ? {} : { healthNote: command.healthNote }) };
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const enrollment = await client.query(`SELECT id FROM enrollments WHERE id = $1 AND organization_id = $2 AND campus_id = ANY($3::uuid[]) FOR SHARE`, [enrollmentId, actor.organizationId, actor.campusIds]);
      if (!enrollment.rows[0]) throw new NotFoundException('Enrollment not found');
      const inserted = await client.query<AttendanceEvent>(
        `INSERT INTO attendance_events AS a (organization_id, enrollment_id, event_type, actor_user_id, guardian_id, verification_method, client_event_id, metadata_json)
         VALUES ($1, $2, $3, $4, NULL, $5, $6, $7::jsonb)
         ON CONFLICT (enrollment_id, event_type, client_event_id) DO NOTHING RETURNING ${projection}`,
        [actor.organizationId, enrollmentId, eventType, actor.actorId, command.verificationMethod, command.clientEventId ?? null, JSON.stringify(metadata)]);
      let event = inserted.rows[0];
      if (event) {
        await recordMutation(client, actor, { action: classCheckIn ? 'attendance.class_check_in' : 'attendance.gate_check_in',
          objectType: 'AttendanceEvent', objectId: event.id,
          eventType: classCheckIn ? 'AttendanceClassCheckIn' : 'AttendanceGateCheckIn', payload: { enrollmentId } });
      } else {
        const existing = await client.query<AttendanceEvent>(`SELECT ${projection} ${scopedEvents} AND a.event_type = $4 AND a.client_event_id = $5`,
          [enrollmentId, actor.organizationId, actor.campusIds, eventType, command.clientEventId]);
        event = existing.rows[0];
      }
      if (!event) throw new NotFoundException('Attendance event not found');
      await client.query('COMMIT');
      return event;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }
}
