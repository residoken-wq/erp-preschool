import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { NestFactory } from '@nestjs/core';
import { loadEnvironment } from '@sop-os/config';
import type { NextFunction, Response } from 'express';
import { AppModule } from './app.module.js';
import { HttpErrorFilter } from './platform/http-error.filter.js';
import { resolveDevelopmentActor, type ActorRequest } from './platform/actor-context.js';

async function bootstrap(): Promise<void> {
  const environment = loadEnvironment();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/v1');
  const allowedOrigins = environment.APP_ORIGIN.split(',').map((origin) => origin.trim());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true
  });
  app.use((request: ActorRequest, response: Response, next: NextFunction) => {
    response.removeHeader('x-powered-by');
    const suppliedCorrelationId = request.header('x-correlation-id');
    const correlationId = suppliedCorrelationId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(suppliedCorrelationId)
      ? suppliedCorrelationId : randomUUID();
    response.setHeader('x-correlation-id', correlationId);
    response.setHeader('x-content-type-options', 'nosniff');
    response.setHeader('x-frame-options', 'DENY');
    response.setHeader('referrer-policy', 'no-referrer');
    response.setHeader('permissions-policy', 'camera=(), microphone=(), geolocation=()');
    response.setHeader('content-security-policy', "default-src 'none'; frame-ancestors 'none'");
    response.setHeader('cache-control', 'no-store');
    request.headers['x-correlation-id'] = correlationId;
    if (environment.AUTH_MODE === 'development') request.actor = resolveDevelopmentActor(request);
    next();
  });
  app.useGlobalFilters(new HttpErrorFilter());
  app.enableShutdownHooks();

  const port = environment.API_PORT;
  await app.listen(port, '0.0.0.0');
}

await bootstrap();
