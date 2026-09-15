import { ProviderDeliveryError, type DeliveryReceipt, type OutboxAdapter, type OutboxEvent } from './outbox-runtime.js';

class DevelopmentConsoleAdapter implements OutboxAdapter {
  readonly name = 'development-console';

  deliver(event: OutboxEvent): Promise<DeliveryReceipt> {
    console.info(JSON.stringify({
      message: 'Outbox event delivered to development sink',
      provider: this.name,
      eventId: event.id,
      eventType: event.eventType,
      attempt: event.attempts
    }));
    return Promise.resolve({ provider: this.name, receiptId: `dev:${event.id}:${event.attempts}` });
  }
}

export function createOutboxAdapter(nodeEnvironment: string | undefined, provider: string | undefined): OutboxAdapter {
  const selectedProvider = provider ?? (nodeEnvironment === 'production' ? undefined : 'development-console');
  if (selectedProvider === 'development-console' && nodeEnvironment !== 'production') {
    return new DevelopmentConsoleAdapter();
  }
  if (selectedProvider === 'development-console') {
    throw new ProviderDeliveryError('DEVELOPMENT_OUTBOX_PROVIDER_FORBIDDEN', false);
  }
  throw new ProviderDeliveryError('OUTBOX_PROVIDER_NOT_CONFIGURED', false);
}
