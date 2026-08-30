import { Controller, Get, Inject } from '@nestjs/common';
import type { HealthResponse } from '@sop-os/contracts';
import type { Pool } from 'pg';
import { PG_POOL } from '../../platform/database.module.js';

@Controller('health')
export class HealthController {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  @Get()
  async health(): Promise<HealthResponse & { database: 'ok' }> {
    await this.pool.query('SELECT 1');
    return {
      status: 'ok',
      service: 'sop-os-api',
      version: process.env.APP_VERSION ?? '0.1.0',
      timestamp: new Date().toISOString(),
      database: 'ok'
    };
  }
}

