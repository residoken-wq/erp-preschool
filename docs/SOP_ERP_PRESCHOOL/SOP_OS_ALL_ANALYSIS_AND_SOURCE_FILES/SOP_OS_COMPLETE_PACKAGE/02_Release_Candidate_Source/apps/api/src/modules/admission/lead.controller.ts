import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import type { ActorContext, LeadStatus, PageResult } from '@sop-os/contracts';
import { CurrentActor } from '../../platform/actor-context.js';
import { LeadService, type CreateLeadCommand } from './lead.service.js';
import { RequirePermissions } from '../../platform/permissions.js';

@Controller('leads')
@RequirePermissions('lead:read')
export class LeadController {
  constructor(private readonly leads: LeadService) {}

  @Get()
  list(
    @CurrentActor() actor: ActorContext,
    @Query('q') query?: string,
    @Query('status') status?: LeadStatus,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string
  ): Promise<PageResult<Record<string, unknown>>> {
    return this.leads.list(actor, { query, status, page: Number(page), pageSize: Number(pageSize) });
  }

  @Post()
  @RequirePermissions('lead:create')
  create(@CurrentActor() actor: ActorContext, @Body() command: CreateLeadCommand): Promise<{ id: string; code: string; status: 'NEW' }> {
    return this.leads.create(actor, command);
  }

  @Post(':id/transitions')
  @RequirePermissions('lead:transition')
  transition(
    @CurrentActor() actor: ActorContext,
    @Param('id') id: string,
    @Body() command: { to: LeadStatus; reason?: string; ownerUserId?: string; nextActionAt?: string }
  ): Promise<Record<string, unknown>> {
    return this.leads.transition(actor, id, command);
  }

  @Post(':id/applications')
  @RequirePermissions('application:create')
  startApplication(
    @CurrentActor() actor: ActorContext,
    @Param('id') id: string,
    @Body() command: { code: string; programCode: string; intakeCode: string }
  ): Promise<Record<string, unknown>> {
    return this.leads.startApplication(actor, id, command);
  }
}
