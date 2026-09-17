import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ActorContext } from '@sop-os/contracts';
import type { Pool } from 'pg';
import { PG_POOL } from '../../platform/database.module.js';
import { recordMutation } from '../../platform/mutation-log.js';
import { hasRequiredPermissions } from '../../platform/permissions.js';

export type SetClearanceCommand = { cleared: boolean; allergyFlags?: string[]; specialHealthNeeds?: string };
export type MedicalClearance = {
  id: string;
  applicationId: string;
  cleared: boolean;
  allergyFlags: string[];
  specialHealthNeeds: string | null;
  clearedBy: string | null;
  clearedAt: Date | null;
  rowVersion: string;
};

export function parseClearanceCommand(value: unknown): SetClearanceCommand {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BadRequestException('Medical clearance body must be an object');
  const body = value as Record<string, unknown>;
  if (Object.keys(body).some((key) => !['cleared', 'allergyFlags', 'specialHealthNeeds'].includes(key))) throw new BadRequestException('Medical clearance contains unknown fields');
  if (typeof body.cleared !== 'boolean') throw new BadRequestException('cleared must be a boolean');
  // Transport bounds, not clinical policy thresholds.
  if (body.allergyFlags !== undefined && (!Array.isArray(body.allergyFlags) || body.allergyFlags.length > 100 || body.allergyFlags.some((flag: unknown) => typeof flag !== 'string' || !flag.trim() || flag.length > 200))) throw new BadRequestException('allergyFlags must contain at most 100 non-empty strings of at most 200 characters');
  if (body.specialHealthNeeds !== undefined && (typeof body.specialHealthNeeds !== 'string' || body.specialHealthNeeds.length > 4000)) throw new BadRequestException('specialHealthNeeds must be a string of at most 4000 characters');
  return {
    cleared: body.cleared,
    ...(body.allergyFlags === undefined ? {} : { allergyFlags: body.allergyFlags as string[] }),
    ...(body.specialHealthNeeds === undefined ? {} : { specialHealthNeeds: body.specialHealthNeeds })
  };
}

const projection = `m.id, m.application_id AS "applicationId", m.cleared,
  m.allergy_flags AS "allergyFlags", m.special_health_needs AS "specialHealthNeeds",
  m.cleared_by AS "clearedBy", m.cleared_at AS "clearedAt", m.row_version AS "rowVersion"`;

@Injectable()
export class MedicalService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async getClearance(actor: ActorContext, applicationId: string): Promise<MedicalClearance | null> {
    const result = await this.pool.query<MedicalClearance>(
      `SELECT ${projection} FROM applications a
       LEFT JOIN medical_clearances m ON m.application_id = a.id AND m.organization_id = a.organization_id
       WHERE a.id = $1 AND a.organization_id = $2 AND a.campus_id = ANY($3::uuid[])`,
      [applicationId, actor.organizationId, actor.campusIds]
    );
    const row = result.rows[0];
    if (!row) throw new NotFoundException('Application not found');
    return row.id ? row : null;
  }

  async setClearance(actor: ActorContext, applicationId: string, body: SetClearanceCommand): Promise<MedicalClearance> {
    if (!hasRequiredPermissions(actor.permissions, ['medical:edit'])) throw new ForbiddenException('Medical edit permission required');
    const command = parseClearanceCommand(body);
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      // Serialize clearance changes with offer creation on the same application.
      const application = await client.query<{ id: string }>(
        `SELECT id FROM applications WHERE id = $1 AND organization_id = $2
         AND campus_id = ANY($3::uuid[]) FOR UPDATE`, [applicationId, actor.organizationId, actor.campusIds]
      );
      if (!application.rows[0]) throw new NotFoundException('Application not found');
      const before = await client.query<{ rowVersion: string }>(
        `SELECT row_version AS "rowVersion" FROM medical_clearances WHERE application_id = $1 AND organization_id = $2`,
        [applicationId, actor.organizationId]
      );
      const result = await client.query<MedicalClearance>(
        `INSERT INTO medical_clearances AS m (organization_id, application_id, cleared, allergy_flags, special_health_needs, cleared_by, cleared_at)
         VALUES ($1, $2, $3, $4::jsonb, $5, CASE WHEN $3 THEN $6::uuid ELSE NULL END, CASE WHEN $3 THEN now() ELSE NULL END)
         ON CONFLICT (application_id) DO UPDATE SET cleared = EXCLUDED.cleared,
           allergy_flags = CASE WHEN $7 THEN EXCLUDED.allergy_flags ELSE m.allergy_flags END,
           special_health_needs = CASE WHEN $8 THEN EXCLUDED.special_health_needs ELSE m.special_health_needs END,
           cleared_by = EXCLUDED.cleared_by, cleared_at = EXCLUDED.cleared_at,
           updated_at = now(), row_version = m.row_version + 1
         WHERE m.organization_id = EXCLUDED.organization_id RETURNING ${projection}`,
        [actor.organizationId, applicationId, command.cleared, JSON.stringify(command.allergyFlags ?? []), command.specialHealthNeeds ?? null, actor.actorId, command.allergyFlags !== undefined, command.specialHealthNeeds !== undefined]
      );
      const clearance = result.rows[0];
      if (!clearance) throw new ConflictException('Medical clearance scope conflict');
      await recordMutation(client, actor, {
        action: 'medical.clearance.set', objectType: 'MedicalClearance', objectId: clearance.id,
        before: before.rows[0], after: { rowVersion: clearance.rowVersion },
        eventType: 'MedicalClearanceSet', payload: { applicationId, clearanceId: clearance.id }
      });
      await client.query('COMMIT');
      return clearance;
    } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  }
}
