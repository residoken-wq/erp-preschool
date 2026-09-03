import {
  classifyDeliveryFailure,
  ProviderDeliveryError,
  type DeliveryReceipt,
  type OutboxAdapter,
  type OutboxStore
} from './outbox-runtime.js';

function validateReceipt(receipt: DeliveryReceipt, adapter: OutboxAdapter): void {
  if (
    receipt.provider !== adapter.name
    || !/^[a-z][a-z0-9-]{0,79}$/.test(receipt.provider)
    || receipt.receiptId.trim().length === 0
    || receipt.receiptId.length > 255
  ) {
    throw new ProviderDeliveryError('PROVIDER_RECEIPT_INVALID', false);
  }
}

export async function processOneOutboxEvent(store: OutboxStore, adapter: OutboxAdapter): Promise<boolean> {
  const event = await store.claimOne();
  if (!event) return false;

  let receipt;
  try {
    receipt = await adapter.deliver(event);
    validateReceipt(receipt, adapter);
  } catch (error) {
    await store.fail(event, classifyDeliveryFailure(error, adapter.name));
    return true;
  }
  await store.complete(event, receipt);
  return true;
}
