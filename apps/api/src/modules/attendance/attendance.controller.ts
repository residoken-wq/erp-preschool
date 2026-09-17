import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import type { ActorContext, PageResult } from '@sop-os/contracts';
import { CurrentActor } from '../../platform/actor-context.js';
import { RequirePermissions } from '../../platform/permissions.js';
import { AttendanceService, parseCheckInCommand, type AttendanceEvent } from './attendance.service.js';

@Controller('attendance/enrollments')
export class AttendanceController {
  constructor(private readonly attendance: AttendanceService) {}

  @Post(':enrollmentId/gate-check-in')
  @HttpCode(200)
  @RequirePermissions('attendance:record')
  gateCheckIn(@CurrentActor() actor: ActorContext, @Param('enrollmentId', new ParseUUIDPipe()) enrollmentId: string, @Body() body: unknown): Promise<AttendanceEvent> {
    return this.attendance.gateCheckIn(actor, enrollmentId, parseCheckInCommand(body));
  }

  @Post(':enrollmentId/class-check-in')
  @HttpCode(200)
  @RequirePermissions('attendance:record')
  classCheckIn(@CurrentActor() actor: ActorContext, @Param('enrollmentId', new ParseUUIDPipe()) enrollmentId: string, @Body() body: unknown): Promise<AttendanceEvent> {
    return this.attendance.classCheckIn(actor, enrollmentId, parseCheckInCommand(body, true));
  }

  @Get(':enrollmentId')
  @RequirePermissions('attendance:read')
  listEvents(@CurrentActor() actor: ActorContext, @Param('enrollmentId', new ParseUUIDPipe()) enrollmentId: string, @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<PageResult<AttendanceEvent>> {
    return this.attendance.listEvents(actor, enrollmentId, page, pageSize);
  }
}
