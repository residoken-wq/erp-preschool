import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { parseTaskId, parseUpdateTaskCommand } from './task.service.js';

describe('task update command', () => {
  it('accepts a bounded status and positive row version', () => {
    expect(parseUpdateTaskCommand({ status: 'IN_PROGRESS', rowVersion: 2 })).toEqual({
      status: 'IN_PROGRESS',
      rowVersion: 2
    });
  });

  it('rejects unknown fields to prevent mass assignment', () => {
    expect(() => parseUpdateTaskCommand({ status: 'DONE', rowVersion: 1, assigneeUserId: 'another-user' }))
      .toThrow(BadRequestException);
  });

  it('rejects invalid status and row version values', () => {
    expect(() => parseUpdateTaskCommand({ status: 'APPROVED', rowVersion: 1 })).toThrow(BadRequestException);
    expect(() => parseUpdateTaskCommand({ status: 'DONE', rowVersion: 0 })).toThrow(BadRequestException);
  });

  it('rejects a malformed task id before querying PostgreSQL', () => {
    expect(() => parseTaskId('not-a-uuid')).toThrow(BadRequestException);
    expect(parseTaskId('40000000-0000-7000-8000-000000000001')).toBe('40000000-0000-7000-8000-000000000001');
  });
});
