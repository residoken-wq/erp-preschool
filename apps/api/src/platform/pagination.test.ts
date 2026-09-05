import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { parsePagination } from './pagination.js';

describe('parsePagination', () => {
  it('uses bounded defaults', () => {
    expect(parsePagination()).toEqual({ page: 1, pageSize: 20, offset: 0 });
    expect(parsePagination('2', '250')).toEqual({ page: 2, pageSize: 100, offset: 100 });
  });

  it('rejects malformed or non-positive values', () => {
    expect(() => parsePagination('0')).toThrow(BadRequestException);
    expect(() => parsePagination('1.5')).toThrow(BadRequestException);
    expect(() => parsePagination(undefined, '-1')).toThrow(BadRequestException);
    expect(() => parsePagination('9007199254740991')).toThrow('page is too large');
  });
});