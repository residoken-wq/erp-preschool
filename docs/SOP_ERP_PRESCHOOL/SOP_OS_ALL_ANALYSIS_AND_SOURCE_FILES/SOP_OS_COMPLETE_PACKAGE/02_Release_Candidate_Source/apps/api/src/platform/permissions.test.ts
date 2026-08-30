import { describe, expect, it } from 'vitest';
import { hasRequiredPermissions } from './permissions.js';

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
});
