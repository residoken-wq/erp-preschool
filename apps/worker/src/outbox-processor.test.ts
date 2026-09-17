import { describe, expect, it, vi } from 'vitest';
import { createOutboxAdapter } from './outbox-adapter.js';
import { processOneOutboxEvent } from './outbox-processor.js';
import {
  classifyDeliveryFailure,
  failureState,
  ProviderDeliveryError,
  type OutboxAdapter,
  type OutboxEvent,
  type OutboxStore
} from './outbox-runtime.js';

const event: OutboxEvent = {
  id: '00000000-0000-7000-8000-000000000201',
  organizationId: '00000000-0000-7000-8000-000000000001',
  eventType: 'lead.created',
  aggregateType: 'Lead',
  aggregateId: '00000000-0000-7000-8000-000000000101',
  payload: { secret: 'must-not-be-logged' },
  attempts: 1,
  claimedAt: new Date('2026-09-02T00:00:00.000Z')
};

function createStore(): {
  store: OutboxStore;
  complete: ReturnType<typeof vi.fn>;
  fail: ReturnType<typeof vi.fn>;
} {
  const complete = vi.fn().mockResolvedValue(undefined);
  const fail = vi.fn().mockResolvedValue(undefined);
  return {
    store: { claimOne: vi.fn().mockResolvedValue(event), complete, fail },
    complete,
    fail
  };
}

describe('outbox delivery runtime', () => {
  it('does not mark an event processed before the provider resolves', async () => {
    let resolveDelivery: ((value: { provider: string; receiptId: string }) => void) | undefined;
    const delivery = new Promise<{ provider: string; receiptId: string }>((resolve) => {
      resolveDelivery = resolve;
    });
    const deliver = vi.fn(() => delivery);
    const adapter: OutboxAdapter = { name: 'test', deliver };
    const { store, complete, fail } = createStore();

    const processing = processOneOutboxEvent(store, adapter);
    await vi.waitFor(() => expect(deliver).toHaveBeenCalledOnce());
    expect(complete).not.toHaveBeenCalled();

    resolveDelivery?.({ provider: 'test', receiptId: 'receipt-1' });
    await expect(processing).resolves.toBe(true);
    expect(complete).toHaveBeenCalledWith(event, { provider: 'test', receiptId: 'receipt-1' });
    expect(fail).not.toHaveBeenCalled();
  });

  it('records only a stable code when an adapter throws an unexpected error', async () => {
    const adapter: OutboxAdapter = {
      name: 'test',
      deliver: vi.fn().mockRejectedValue(new Error('token=secret-value child@example.test'))
    };
    const { store, fail } = createStore();

    await expect(processOneOutboxEvent(store, adapter)).resolves.toBe(true);
    expect(fail).toHaveBeenCalledWith(event, { provider: 'test', code: 'PROVIDER_UNEXPECTED_ERROR', retryable: true });
  });

  it('rejects an invalid or mismatched provider receipt before completion', async () => {
    const adapter: OutboxAdapter = {
      name: 'test',
      deliver: vi.fn().mockResolvedValue({ provider: 'different-provider', receiptId: '' })
    };
    const { store, complete, fail } = createStore();

    await expect(processOneOutboxEvent(store, adapter)).resolves.toBe(true);
    expect(complete).not.toHaveBeenCalled();
    expect(fail).toHaveBeenCalledWith(event, { provider: 'test', code: 'PROVIDER_RECEIPT_INVALID', retryable: false });
  });

  it('dead-letters permanent failures immediately and retryable failures at the attempt limit', () => {
    expect(failureState(1, { provider: 'test', code: 'INVALID_REQUEST', retryable: false })).toEqual({ status: 'DEAD_LETTER', delaySeconds: 0 });
    expect(failureState(9, { provider: 'test', code: 'TIMEOUT', retryable: true })).toEqual({ status: 'PENDING', delaySeconds: 512 });
    expect(failureState(10, { provider: 'test', code: 'TIMEOUT', retryable: true })).toEqual({ status: 'DEAD_LETTER', delaySeconds: 0 });
  });

  it('preserves explicit adapter classification without exposing its message', () => {
    const failure = classifyDeliveryFailure(new ProviderDeliveryError('PROVIDER_RATE_LIMITED', true), 'test');
    expect(failure).toEqual({ provider: 'test', code: 'PROVIDER_RATE_LIMITED', retryable: true });
  });

  it('allows the console sink only outside production and excludes payloads from logs', async () => {
    expect(() => createOutboxAdapter('production', 'development-console')).toThrow('DEVELOPMENT_OUTBOX_PROVIDER_FORBIDDEN');
    const log = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const receipt = await createOutboxAdapter('development', 'development-console').deliver(event);

    expect(receipt).toEqual({ provider: 'development-console', receiptId: `dev:${event.id}:1` });
    expect(log).toHaveBeenCalledOnce();
    expect(String(log.mock.calls[0]?.[0])).not.toContain('must-not-be-logged');
    log.mockRestore();
  });
});
