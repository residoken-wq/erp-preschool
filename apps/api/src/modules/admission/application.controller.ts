import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import type { ActorContext, ApplicationStatus, PageResult } from '@sop-os/contracts';
import { CurrentActor } from '../../platform/actor-context.js';
import { ApplicationService } from './application.service.js';
import { RequirePermissions } from '../../platform/permissions.js';
import { parsePagination } from '../../platform/pagination.js';

@Controller('applications')
@RequirePermissions('application:read')
export class ApplicationController {
  constructor(private readonly applications: ApplicationService) {}

  @Get()
  list(
    @CurrentActor() actor: ActorContext,
    @Query('status') status?: ApplicationStatus,
    @Query('q') query?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string
  ): Promise<PageResult<Record<string, unknown>>> {
    const pagination = parsePagination(page, pageSize);
    return this.applications.list(actor, { status, query, pagination });
  }

  @Post(':id/transitions')
  @RequirePermissions('application:transition')
  transition(
    @CurrentActor() actor: ActorContext,
    @Param('id') id: string,
    @Body() command: { to: ApplicationStatus; reason?: string }
  ): Promise<Record<string, unknown>> {
    return this.applications.transition(actor, id, command);
  }

  @Post(':id/offers')
  @RequirePermissions('offer:create')
  createOffer(
    @CurrentActor() actor: ActorContext,
    @Param('id') id: string,
    @Body() command: { code: string; validUntil: string; terms: Record<string, unknown> }
  ): Promise<Record<string, unknown>> {
    return this.applications.createOffer(actor, id, command);
  }

  @Post('offers/:offerId/transitions')
  @RequirePermissions('offer:transition')
  transitionOffer(
    @CurrentActor() actor: ActorContext,
    @Param('offerId') offerId: string,
    @Body() command: { to: string; reason?: string }
  ): Promise<Record<string, unknown>> {
    return this.applications.transitionOffer(actor, offerId, command);
  }

  @Post('offers/:offerId/enrollment')
  @RequirePermissions('enrollment:confirm')
  createEnrollment(
    @CurrentActor() actor: ActorContext,
    @Param('offerId') offerId: string,
    @Body() command: { code: string }
  ): Promise<Record<string, unknown>> {
    return this.applications.createEnrollment(actor, offerId, command);
  }

  @Get('enrollments/list')
  @RequirePermissions('enrollment:read')
  listEnrollments(@CurrentActor() actor: ActorContext): Promise<Record<string, unknown>[]> {
    return this.applications.listEnrollments(actor);
  }

  @Post('enrollments/:enrollmentId/finance-setup')
  @RequirePermissions('finance:setup')
  financeSetup(
    @CurrentActor() actor: ActorContext,
    @Param('enrollmentId') enrollmentId: string,
    @Body() command: { contractCode: string; feePlanCode: string; totalAmount: number; currency?: string }
  ): Promise<Record<string, unknown>> {
    return this.applications.createFinanceSetup(actor, enrollmentId, command);
  }

  @Post('enrollments/:enrollmentId/handover/transitions')
  @RequirePermissions('handover:transition')
  transitionHandover(
    @CurrentActor() actor: ActorContext,
    @Param('enrollmentId') enrollmentId: string,
    @Body() command: { to: 'READY' | 'SUBMITTED' | 'RETURNED' | 'ACCEPTED'; reason?: string; checklist?: Array<{ key: string; label: string; complete: boolean }> }
  ): Promise<Record<string, unknown>> {
    return this.applications.transitionHandover(actor, enrollmentId, command);
  }
}
