import process from 'node:process';
import pg from 'pg';
import { createOutboxAdapter } from './outbox-adapter.js';
import { processOneOutboxEvent } from './outbox-processor.js';
import { PostgresOutboxStore } from './postgres-outbox.store.js';
import { expireDueOffers } from './offer-expiry-runtime.js';

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const pollInterval = Number(process.env.OUTBOX_POLL_INTERVAL_MS ?? 2_000);
if (!Number.isInteger(pollInterval) || pollInterval < 250) {
  throw new Error('OUTBOX_POLL_INTERVAL_MS must be an integer of at least 250 milliseconds');
}

// Match packages/config's schema using the existing worker entrypoint convention.
// Sharing its loader requires a workspace dependency outside step-04's file scope.
const offerExpiryPollInterval = Number(process.env.OFFER_EXPIRY_POLL_INTERVAL_MS ?? 2_000);
if (!Number.isInteger(offerExpiryPollInterval) || offerExpiryPollInterval < 250 || offerExpiryPollInterval > 2_147_483_647) {
  throw new Error('OFFER_EXPIRY_POLL_INTERVAL_MS must be an integer between 250 and 2147483647 milliseconds');
}

const pool = new Pool({ connectionString: databaseUrl, max: 4, connectionTimeoutMillis: 2_000 });
pool.on('error', () => console.error(JSON.stringify({ code: 'OUTBOX_DATABASE_POOL_ERROR' })));

const adapter = createOutboxAdapter(process.env.NODE_ENV, process.env.OUTBOX_PROVIDER);
const store = new PostgresOutboxStore(pool);
let stopping = false;
const wakeups = new Set<() => void>();

function waitForNextTick(interval: number): Promise<void> {
  if (stopping) return Promise.resolve();
  return new Promise((resolve) => {
    const wake = (): void => {
      clearTimeout(timer);
      wakeups.delete(wake);
      resolve();
    };
    const timer = setTimeout(wake, interval);
    wakeups.add(wake);
  });
}

async function runOutbox(): Promise<void> {
  while (!stopping) {
    try {
      await processOneOutboxEvent(store, adapter);
    } catch {
      console.error(JSON.stringify({ code: 'OUTBOX_TICK_FAILED' }));
    }
    await waitForNextTick(pollInterval);
  }
}

async function runOfferExpiry(interval: number): Promise<void> {
  while (!stopping) {
    try {
      const expiredCount = await expireDueOffers(pool);
      if (expiredCount > 0) console.info(JSON.stringify({ message: 'Offer expiry tick completed', expiredCount }));
    } catch {
      console.error(JSON.stringify({ code: 'OFFER_EXPIRY_TICK_FAILED' }));
    }
    await waitForNextTick(interval);
  }
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    stopping = true;
    for (const wake of wakeups) wake();
  });
}

// Wait for both in-flight ticks before closing their shared pool.
async function run(offerExpiryPollInterval: number): Promise<void> {
  console.info(JSON.stringify({ message: 'SOP OS worker started', pollInterval, offerExpiryPollInterval, provider: adapter.name }));
  try {
    await Promise.all([runOutbox(), runOfferExpiry(offerExpiryPollInterval)]);
  } finally {
    await pool.end();
  }
}

await run(offerExpiryPollInterval);
