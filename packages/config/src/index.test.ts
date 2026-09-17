import { describe, expect, it } from 'vitest';
import { loadEnvironment } from './index.js';

const base = { DATABASE_URL: 'postgresql://localhost/test', APP_ORIGIN: 'https://sop.example.test' };

describe('environment security policy', () => {
  it('defaults the offer expiry poll interval and accepts configured integer milliseconds', () => {
    expect(loadEnvironment(base).OFFER_EXPIRY_POLL_INTERVAL_MS).toBe(2000);
    for (const value of ['250', '60000', '2147483647']) {
      expect(loadEnvironment({ ...base, OFFER_EXPIRY_POLL_INTERVAL_MS: value }).OFFER_EXPIRY_POLL_INTERVAL_MS).toBe(Number(value));
    }
  });

  it.each(['', '0', '-1', '249', '250.5', 'invalid', 'Infinity', '2147483648'])(
    'rejects unsafe offer expiry interval %s', (value) => {
      expect(() => loadEnvironment({ ...base, OFFER_EXPIRY_POLL_INTERVAL_MS: value })).toThrow('OFFER_EXPIRY_POLL_INTERVAL_MS');
    }
  );

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
