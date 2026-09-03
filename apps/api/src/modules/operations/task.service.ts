import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ActorContext, TaskItem, TaskStatus } from '@sop-os/contracts';
import type { Pool, PoolClient } from 'pg';
import { PG_POOL } from '../../platform/database.module.js';
import { recordMutation } from '../../platform/mutation-log.js';

type WorkItemRow = {
  id: string;
  title: string;
  description: string | null;
  priority: TaskItem['priority'];
  status: TaskStatus;
  due_at: Date | null;
  related_object_type: string | null;
  related_object_id: string | null;
  row_version: string;
  overdue: boolean;
};

type UpdateTaskCommand = { status: TaskStatus; rowVersion: number };
const allowedTaskStatuses: readonly TaskStatus[] = ['OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED'];

function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && allowedTaskStatuses.some((status) => status === value);
}

export function parseUpdateTaskCommand(value: unknown): UpdateTaskCommand {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new BadRequestException('Task update body must be an object');
  }
  const command = value as Record<string, unknown>;
  const fields = Object.keys(command);
  if (fields.some((field) => field !== 'status' && field !== 'rowVersion')) {
    throw new BadRequestException('Task update contains unknown fields');
  }
  if (!isTaskStatus(command.status) || !Number.isInteger(command.rowVersion) || Number(command.rowVersion) < 1) {
    throw new BadRequestException('status and positive integer rowVersion are required');
  }
  return { status: command.status, rowVersion: Number(command.rowVersion) };
}

export function parseTaskId(value: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new BadRequestException('Task id must be a UUID');
  }
  return value;
}

function toTaskItem(row: WorkItemRow): TaskItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    status: row.status,
    dueAt: row.due_at?.toISOString() ?? null,
    relatedObjectType: row.related_object_type,
    relatedObjectId: row.related_object_id,
    rowVersion: Number(row.row_version),
    overdue: row.overdue
  };
}

@Injectable()
export class TaskService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async list(actor: ActorContext, status?: string): Promise<TaskItem[]> {
    if (status !== undefined && !isTaskStatus(status)) throw new BadRequestException('Invalid task status');
    const result = await this.pool.query<WorkItemRow>(
      `SELECT id, title, description, priority, status, due_at, related_object_type, related_object_id, row_version,
              CASE WHEN due_at < now() AND status IN ('OPEN','IN_PROGRESS') THEN true ELSE false END AS overdue
       FROM work_items
       WHERE organization_id = $1 AND assignee_user_id = $2
         AND (campus_id IS NULL OR campus_id = ANY($3::uuid[]))
         AND ($4::text IS NULL OR status = $4)
       ORDER BY CASE priority WHEN 'URGENT' THEN 1 WHEN 'HIGH' THEN 2 WHEN 'NORMAL' THEN 3 ELSE 4 END,
                due_at NULLS LAST
       LIMIT 100`,
      [actor.organizationId, actor.actorId, actor.campusIds, status ?? null]
    );
    return result.rows.map(toTaskItem);
  }

  async update(actor: ActorContext, id: string, body: unknown): Promise<TaskItem> {
    parseTaskId(id);
    const command = parseUpdateTaskCommand(body);
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const currentResult = await client.query<WorkItemRow>(
        `SELECT id, title, description, priority, status, due_at, related_object_type, related_object_id,
                row_version, due_at < now() AND status IN ('OPEN','IN_PROGRESS') AS overdue
         FROM work_items
         WHERE id = $1 AND organization_id = $2 AND assignee_user_id = $3
           AND (campus_id IS NULL OR campus_id = ANY($4::uuid[]))
         FOR UPDATE`,
        [id, actor.organizationId, actor.actorId, actor.campusIds]
      );
      const current = currentResult.rows[0];
      if (!current) throw new NotFoundException('Task not found');
      if (Number(current.row_version) !== command.rowVersion) {
        throw new ConflictException('Task was changed by another user');
      }

      const updatedResult = await client.query<WorkItemRow>(
        `UPDATE work_items
         SET status = $4::varchar,
             completed_at = CASE WHEN $4::varchar = 'DONE' THEN now() ELSE NULL END,
             updated_at = now(),
             row_version = row_version + 1
         WHERE id = $1 AND organization_id = $2 AND assignee_user_id = $3
           AND (campus_id IS NULL OR campus_id = ANY($5::uuid[]))
         RETURNING id, title, description, priority, status, due_at, related_object_type,
                   related_object_id, row_version,
                   due_at < now() AND status IN ('OPEN','IN_PROGRESS') AS overdue`,
        [id, actor.organizationId, actor.actorId, command.status, actor.campusIds]
      );
      const updated = updatedResult.rows[0];
      if (!updated) throw new ConflictException('Task update conflict');

      await recordMutation(client, actor, {
        action: 'TASK_STATUS_CHANGED',
        objectType: 'WorkItem',
        objectId: id,
        before: { status: current.status, rowVersion: Number(current.row_version) },
        after: { status: updated.status, rowVersion: Number(updated.row_version) },
        eventType: 'TaskStatusChanged',
        payload: { taskId: id, fromStatus: current.status, toStatus: updated.status }
      });
      await client.query('COMMIT');
      return toTaskItem(updated);
    } catch (error) {
      await this.rollback(client);
      throw error;
    } finally {
      client.release();
    }
  }

  private async rollback(client: PoolClient): Promise<void> {
    await client.query('ROLLBACK').catch(() => undefined);
  }
}
