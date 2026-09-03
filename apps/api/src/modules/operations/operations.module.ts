import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller.js';
import { TaskService } from './task.service.js';

@Module({ controllers: [OperationsController], providers: [TaskService] })
export class OperationsModule {}
