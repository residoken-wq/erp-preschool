import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller.js';
import { LeadService } from './lead.service.js';
import { ApplicationController } from './application.controller.js';
import { ApplicationService } from './application.service.js';

import { MedicalModule } from '../medical/medical.module.js';

@Module({ imports: [MedicalModule], controllers: [LeadController, ApplicationController], providers: [LeadService, ApplicationService] })
export class AdmissionModule {}
