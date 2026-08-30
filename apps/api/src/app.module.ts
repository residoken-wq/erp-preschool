import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './platform/database.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ProcessModule } from './modules/process/process.module.js';
import { SopModule } from './modules/sop/sop.module.js';
import { AdmissionModule } from './modules/admission/admission.module.js';
import { OperationsModule } from './modules/operations/operations.module.js';
import { PermissionGuard } from './platform/permissions.js';

@Module({
  imports: [DatabaseModule, HealthModule, ProcessModule, SopModule, AdmissionModule, OperationsModule],
  providers: [{ provide: APP_GUARD, useClass: PermissionGuard }]
})
export class AppModule {}
