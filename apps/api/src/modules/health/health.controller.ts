import { Controller, Get } from '@nestjs/common';
import type { HealthResponse, ReadinessResponse } from '@sop-os/contracts';
import { PublicRoute } from '../../platform/permissions.js';
import { HealthService } from './health.service.js';

@Controller('health')
@PublicRoute()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  liveness(): HealthResponse {
    return this.healthService.liveness();
  }

  @Get('ready')
  readiness(): Promise<ReadinessResponse> {
    return this.healthService.readiness();
  }
}
