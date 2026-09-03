import process from 'node:process';
import pg from 'pg';
import { createOutboxAdapter } from './outbox-adapter.js';
import { processOneOutboxEvent } from './outbox-processor.js';
import { PostgresOutboxStore } from './postgres-outbox.store.js';

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const pollInterval = Number(process.env.OUTBOX_POLL_INTERVAL_MS ?? 2_000);
if (!Number.isInteger(pollInterval) || pollInterval < 250) {
  throw new Error('OUTBOX_POLL_INTERVAL_MS must be an integer of at least 250 milliseconds');
}

const pool = new Pool({ connectionString: databaseUrl, max: 4, connectionTimeoutMillis: 2_000 });
pool.on('error', () => console.error(JSON.stringify({ code: 'OUTBOX_DATABASE_POOL_ERROR' })));

const adapter = createOutboxAdapter(process.env.NODE_ENV, process.env.OUTBOX_PROVIDER);
const store = new PostgresOutboxStore(pool);
let stopping = false;

async function run(): Promise<void> {
  console.info(JSON.stringify({ message: 'SOP OS worker started', pollInterval, provider: adapter.name }));
  while (!stopping) {
    try {
      await processOneOutboxEvent(store, adapter);
    } catch {
      console.error(JSON.stringify({ code: 'OUTBOX_TICK_FAILED' }));
    }
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }
  await pool.end();
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    stopping = true;
  });
}

await run();
