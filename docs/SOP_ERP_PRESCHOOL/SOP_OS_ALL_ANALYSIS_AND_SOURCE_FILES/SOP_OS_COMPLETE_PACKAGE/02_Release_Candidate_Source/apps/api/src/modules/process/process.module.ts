import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller.js';

@Module({ controllers: [ProcessController] })
export class ProcessModule {}

