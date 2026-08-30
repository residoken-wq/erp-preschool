import { describe, expect, it } from 'vitest';
import { loadEnvironment } from './index.js';

const base = { DATABASE_URL: 'postgresql://localhost/test', APP_ORIGIN: 'https://sop.example.test' };

describe('environment security policy', () => {
  it('allows the development adapter locally', () => {
    expect(loadEnvironment({ ...base, NODE_ENV: 'development', AUTH_MODE: 'development' }).AUTH_MODE).toBe('development');
  });

  it('forbids the development adapter in production', () => {
    expect(() => loadEnvironment({ ...base, NODE_ENV: 'production', AUTH_MODE: 'development' })).toThrow('forbidden');
  });

  it('requires OIDC identity settings', () => {
    expect(() => loadEnvironment({ ...base, NODE_ENV: 'production', AUTH_MODE: 'oidc' })).toThrow('OIDC_ISSUER');
  });
});
