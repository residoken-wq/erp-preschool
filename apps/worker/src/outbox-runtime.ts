export const MAX_DELIVERY_ATTEMPTS = 10;

export type OutboxEvent = {
  id: string;
  organizationId: string;
  eventType: string;
  aggregateType: string;
  aggregateId: string;
  payload: unknown;
  attempts: number;
  claimedAt: Date;
};

export type DeliveryReceipt = {
  provider: string;
  receiptId: string;
};

export type DeliveryFailure = {
  provider: string;
  code: string;
  retryable: boolean;
};

export type FailureState = {
  status: 'PENDING' | 'DEAD_LETTER';
  delaySeconds: number;
};

export interface OutboxAdapter {
  readonly name: string;
  deliver(event: OutboxEvent): Promise<DeliveryReceipt>;
}

export interface OutboxStore {
  claimOne(): Promise<OutboxEvent | null>;
  complete(event: OutboxEvent, receipt: DeliveryReceipt): Promise<void>;
  fail(event: OutboxEvent, failure: DeliveryFailure): Promise<void>;
}

export class ProviderDeliveryError extends Error {
  constructor(
    readonly code: string,
    readonly retryable: boolean
  ) {
    super(code);
    this.name = 'ProviderDeliveryError';
  }
}

export function classifyDeliveryFailure(error: unknown, provider: string): DeliveryFailure {
  if (error instanceof ProviderDeliveryError) {
    const stableCode = /^[A-Z][A-Z0-9_]{2,79}$/.test(error.code) ? error.code : 'PROVIDER_CLASSIFIED_ERROR';
    return { provider, code: stableCode, retryable: error.retryable };
  }
  return { provider, code: 'PROVIDER_UNEXPECTED_ERROR', retryable: true };
}

export function failureState(attempts: number, failure: DeliveryFailure): FailureState {
  const deadLetter = !failure.retryable || attempts >= MAX_DELIVERY_ATTEMPTS;
  return {
    status: deadLetter ? 'DEAD_LETTER' : 'PENDING',
    delaySeconds: deadLetter ? 0 : Math.min(3_600, 2 ** Math.min(attempts, 10))
  };
}
