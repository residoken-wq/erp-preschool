import { Controller, Get, Inject } from '@nestjs/common';
import type { Pool } from 'pg';
import type { ActorContext } from '@sop-os/contracts';
import { CurrentActor } from '../../platform/actor-context.js';
import { PG_POOL } from '../../platform/database.module.js';
import { RequirePermissions } from '../../platform/permissions.js';

type ProcessRow = {
  id: string;
  parent_id: string | null;
  level: 'L0' | 'L1' | 'L2' | 'L3';
  code: string;
  name: string;
  status: 'PROPOSED' | 'APPROVED' | 'RETIRED';
  priority: 'P0' | 'P1' | 'P2';
};

@Controller('processes')
@RequirePermissions('process:read')
export class ProcessController {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  @Get()
  async list(@CurrentActor() actor: ActorContext): Promise<ProcessRow[]> {
    const result = await this.pool.query<ProcessRow>(
      `SELECT id, parent_id, level, code, name, status, priority
       FROM process_nodes WHERE organization_id = $1 ORDER BY sort_order, code`,
      [actor.organizationId]
    );
    return result.rows;
  }
}
