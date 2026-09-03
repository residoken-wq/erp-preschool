import { ServiceUnavailableException } from '@nestjs/common';
import type { Pool } from 'pg';
import { describe, expect, it, vi } from 'vitest';
import { HEALTH_DATABASE_TIMEOUT_MS, HealthService } from './health.service.js';

function createService(query: ReturnType<typeof vi.fn>): HealthService {
  return new HealthService({ query } as unknown as Pool);
}

describe('health service', () => {
  it('reports liveness without querying PostgreSQL', () => {
    const query = vi.fn();
    const health = createService(query).liveness();

    expect(health).toMatchObject({ status: 'ok', service: 'sop-os-api' });
    expect(health.timestamp).toBeTruthy();
    expect(query).not.toHaveBeenCalled();
  });

  it('reports readiness only after a bounded PostgreSQL query succeeds', async () => {
    const query = vi.fn().mockResolvedValue({ rows: [{ '?column?': 1 }] });

    await expect(createService(query).readiness()).resolves.toMatchObject({
      status: 'ok',
      service: 'sop-os-api',
      database: 'ok'
    });
    expect(query).toHaveBeenCalledWith({ text: 'SELECT 1', query_timeout: HEALTH_DATABASE_TIMEOUT_MS });
  });

  it('returns a sanitized service-unavailable error when PostgreSQL is unavailable', async () => {
    const query = vi.fn().mockRejectedValue(new Error('password authentication failed for secret-user'));
    const readiness = createService(query).readiness();

    await expect(readiness).rejects.toBeInstanceOf(ServiceUnavailableException);
    await expect(readiness).rejects.toMatchObject({ message: 'Service is not ready' });
  });
});
