import { Module } from '@nestjs/common';
import { SopController } from './sop.controller.js';
import { SopService } from './sop.service.js';

@Module({ controllers: [SopController], providers: [SopService] })
export class SopModule {}
