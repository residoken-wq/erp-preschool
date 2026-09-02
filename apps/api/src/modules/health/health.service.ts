import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { HealthResponse, ReadinessResponse } from '@sop-os/contracts';
import type { Pool, QueryConfig } from 'pg';
import { PG_POOL } from '../../platform/database.module.js';

export const HEALTH_DATABASE_TIMEOUT_MS = 2_000;

type BoundedQueryConfig = QueryConfig & { query_timeout: number };

@Injectable()
export class HealthService {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  liveness(): HealthResponse {
    return this.response();
  }

  async readiness(): Promise<ReadinessResponse> {
    const query: BoundedQueryConfig = {
      text: 'SELECT 1',
      query_timeout: HEALTH_DATABASE_TIMEOUT_MS
    };

    try {
      await this.pool.query(query);
    } catch {
      throw new ServiceUnavailableException('Service is not ready');
    }

    return { ...this.response(), database: 'ok' };
  }

  private response(): HealthResponse {
    return {
      status: 'ok',
      service: 'sop-os-api',
      version: process.env.APP_VERSION ?? '0.1.0',
      timestamp: new Date().toISOString()
    };
  }
}
