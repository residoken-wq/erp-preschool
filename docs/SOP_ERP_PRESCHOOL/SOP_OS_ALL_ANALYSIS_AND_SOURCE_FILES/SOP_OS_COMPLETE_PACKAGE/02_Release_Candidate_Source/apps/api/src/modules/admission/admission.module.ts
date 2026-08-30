import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller.js';
import { LeadService } from './lead.service.js';
import { ApplicationController } from './application.controller.js';
import { ApplicationService } from './application.service.js';

@Module({ controllers: [LeadController, ApplicationController], providers: [LeadService, ApplicationService] })
export class AdmissionModule {}
