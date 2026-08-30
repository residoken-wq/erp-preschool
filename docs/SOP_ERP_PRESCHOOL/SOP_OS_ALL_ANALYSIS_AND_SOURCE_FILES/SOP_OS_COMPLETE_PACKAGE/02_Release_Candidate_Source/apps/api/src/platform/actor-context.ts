import { randomUUID } from 'node:crypto';
import { BadRequestException, createParamDecorator, type ExecutionContext, ForbiddenException } from '@nestjs/common';
import type { Request } from 'express';
import type { ActorContext } from '@sop-os/contracts';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type ActorRequest = Request & { actor?: ActorContext };

function requireUuid(value: string, field: string): string {
  if (!uuidPattern.test(value)) throw new BadRequestException(`${field} must be a valid UUID`);
  return value;
}

export function resolveDevelopmentActor(request: Request): ActorContext {
  const actorId = requireUuid(request.header('x-actor-id') ?? '00000000-0000-7000-8000-000000001001', 'x-actor-id');
  const organizationId = requireUuid(request.header('x-organization-id') ?? '00000000-0000-7000-8000-000000000001', 'x-organization-id');
  const campusHeader = request.header('x-campus-ids') ?? '00000000-0000-7000-8000-000000000101';
  const campusIds = campusHeader.split(',').map((value) => requireUuid(value.trim(), 'x-campus-ids'));
  const permissions = (request.header('x-permissions') ?? 'development:*').split(',').map((value) => value.trim()).filter(Boolean);
  const correlationId = requireUuid(request.header('x-correlation-id') ?? randomUUID(), 'x-correlation-id');

  return { actorId, organizationId, campusIds, permissions, correlationId };
}

export const CurrentActor = createParamDecorator((_data: unknown, context: ExecutionContext): ActorContext => {
  const request = context.switchToHttp().getRequest<ActorRequest>();
  if (request.actor) return request.actor;
  throw new ForbiddenException('Authenticated actor context is required');
});
