import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import type { ActorContext, SopVersionStatus } from '@sop-os/contracts';
import { CurrentActor } from '../../platform/actor-context.js';
import { SopService } from './sop.service.js';
import { RequirePermissions } from '../../platform/permissions.js';

@Controller('sops')
@RequirePermissions('sop:read')
export class SopController {
  constructor(private readonly sops: SopService) {}

  @Get()
  list(@CurrentActor() actor: ActorContext, @Query('q') query?: string): Promise<Record<string, unknown>[]> {
    return this.sops.list(actor, query);
  }

  @Get(':id')
  detail(@CurrentActor() actor: ActorContext, @Param('id') id: string): Promise<Record<string, unknown>> {
    return this.sops.detail(actor, id);
  }

  @Post()
  @RequirePermissions('sop:create')
  create(
    @CurrentActor() actor: ActorContext,
    @Body() command: { processNodeId: string; code: string; title: string; sopType: string; ownerRoleId?: string; priority?: string }
  ): Promise<Record<string, unknown>> {
    return this.sops.create(actor, command);
  }

  @Put('versions/:versionId/sections/:sectionKey')
  @RequirePermissions('sop:edit')
  saveSection(
    @CurrentActor() actor: ActorContext,
    @Param('versionId') versionId: string,
    @Param('sectionKey') sectionKey: string,
    @Body() command: { title: string; content: Record<string, unknown>; sortOrder: number; rowVersion?: number }
  ): Promise<Record<string, unknown>> {
    return this.sops.saveSection(actor, versionId, sectionKey, command);
  }

  @Post('versions/:versionId/steps')
  @RequirePermissions('sop:edit')
  saveStep(
    @CurrentActor() actor: ActorContext,
    @Param('versionId') versionId: string,
    @Body() command: { stepNo: number; name: string; actorRoleId: string; actionText: string; statusBefore?: string; statusAfter?: string; automationType?: string }
  ): Promise<Record<string, unknown>> {
    return this.sops.saveStep(actor, versionId, command);
  }

  @Post('versions/:versionId/transitions')
  @RequirePermissions('sop:transition')
  transition(
    @CurrentActor() actor: ActorContext,
    @Param('versionId') versionId: string,
    @Body() command: { to: SopVersionStatus; reason?: string; effectiveFrom?: string }
  ): Promise<Record<string, unknown>> {
    return this.sops.transition(actor, versionId, command);
  }

  @Post('versions/:versionId/comments')
  @RequirePermissions('sop:review')
  comment(
    @CurrentActor() actor: ActorContext,
    @Param('versionId') versionId: string,
    @Body() command: { body: string; sectionId?: string; stepId?: string }
  ): Promise<Record<string, unknown>> {
    return this.sops.comment(actor, versionId, command);
  }
}
