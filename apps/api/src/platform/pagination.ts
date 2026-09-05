import { BadRequestException } from '@nestjs/common';

export type Pagination = {
  page: number;
  pageSize: number;
  offset: number;
};

export function parsePagination(page?: string, pageSize?: string): Pagination {
  const parsedPage = parsePositiveInteger(page, 'page');
  const parsedPageSize = parsePositiveInteger(pageSize, 'pageSize');
  const resolvedPage = parsedPage ?? 1;
  const resolvedPageSize = Math.min(parsedPageSize ?? 20, 100);
  const offset = (resolvedPage - 1) * resolvedPageSize;
  if (!Number.isSafeInteger(offset)) throw new BadRequestException('page is too large');
  return { page: resolvedPage, pageSize: resolvedPageSize, offset };
}

function parsePositiveInteger(value: string | undefined, field: string): number | undefined {
  if (value === undefined || value === '') return undefined;
  if (!/^\d+$/.test(value)) throw new BadRequestException(`${field} must be a positive integer`);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new BadRequestException(`${field} must be a positive integer`);
  }
  return parsed;
}