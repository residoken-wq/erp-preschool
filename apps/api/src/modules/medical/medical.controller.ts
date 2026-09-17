import { Body, Controller, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import type { ActorContext } from '@sop-os/contracts';
import { CurrentActor } from '../../platform/actor-context.js';
import { RequirePermissions } from '../../platform/permissions.js';
import { MedicalService, parseClearanceCommand, type MedicalClearance } from './medical.service.js';

@Controller('medical/clearances')
export class MedicalController {
  constructor(private readonly medical: MedicalService) {}

  @Get(':applicationId')
  @RequirePermissions('medical:read')
  getClearance(@CurrentActor() actor: ActorContext, @Param('applicationId', new ParseUUIDPipe()) applicationId: string): Promise<MedicalClearance | null> {
    return this.medical.getClearance(actor, applicationId);
  }

  @Put(':applicationId')
  @RequirePermissions('medical:edit')
  setClearance(@CurrentActor() actor: ActorContext, @Param('applicationId', new ParseUUIDPipe()) applicationId: string, @Body() body: unknown): Promise<MedicalClearance> {
    return this.medical.setClearance(actor, applicationId, parseClearanceCommand(body));
  }
}
