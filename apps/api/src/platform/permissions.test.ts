import { describe, expect, it } from 'vitest';
import type { ActorContext } from '@sop-os/contracts';
import { canActivateRequest, hasRequiredPermissions } from './permissions.js';

const actor: ActorContext = {
  actorId: '00000000-0000-7000-8000-000000001001',
  organizationId: '00000000-0000-7000-8000-000000000001',
  campusIds: [],
  permissions: ['lead:read'],
  correlationId: '00000000-0000-7000-8000-000000000099'
};

describe('permission policy', () => {
  it('accepts an exact permission', () => {
    expect(hasRequiredPermissions(['lead:read'], ['lead:read'])).toBe(true);
  });

  it('accepts a resource wildcard', () => {
    expect(hasRequiredPermissions(['sop:*'], ['sop:approve', 'sop:read'])).toBe(true);
  });

  it('rejects a missing permission', () => {
    expect(hasRequiredPermissions(['lead:read'], ['lead:update'])).toBe(false);
  });

  it('allows the development adapter only through its explicit wildcard', () => {
    expect(hasRequiredPermissions(['development:*'], ['audit:read'])).toBe(true);
  });

  it('allows an unauthenticated public probe outside development', () => {
    expect(canActivateRequest(undefined, [], true, 'oidc')).toBe(true);
  });

  it('keeps non-public routes deny-by-default outside development', () => {
    expect(canActivateRequest(undefined, [], false, 'oidc')).toBe(false);
    expect(canActivateRequest(actor, ['lead:update'], false, 'oidc')).toBe(false);
  });
});
