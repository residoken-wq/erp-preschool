import { CanActivate, type ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ActorContext } from '@sop-os/contracts';
import type { Request } from 'express';

export const PERMISSIONS_KEY = 'requiredPermissions';
export const RequirePermissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);

export function hasRequiredPermissions(granted: readonly string[], required: readonly string[]): boolean {
  if (required.length === 0 || granted.includes('development:*') || granted.includes('*')) return true;
  return required.every((permission) => {
    const [resource] = permission.split(':');
    return granted.includes(permission) || granted.includes(`${resource}:*`);
  });
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]) ?? [];
    const request = context.switchToHttp().getRequest<Request & { actor?: ActorContext }>();
    const actor = request.actor;
    return actor ? hasRequiredPermissions(actor.permissions, required) : process.env.AUTH_MODE === 'development';
  }
}
