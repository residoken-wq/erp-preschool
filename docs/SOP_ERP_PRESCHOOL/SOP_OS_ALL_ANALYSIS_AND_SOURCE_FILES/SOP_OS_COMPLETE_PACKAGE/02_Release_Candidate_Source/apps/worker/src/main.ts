import process from 'node:process';
import pg from 'pg';

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const pool = new Pool({ connectionString: databaseUrl, max: 4 });
const pollInterval = Number(process.env.OUTBOX_POLL_INTERVAL_MS ?? 2000);
let stopping = false;

type OutboxEvent = {
  id: string;
  event_type: string;
  aggregate_type: string;
  aggregate_id: string;
  payload_json: unknown;
  attempts: number;
};

async function claimOne(): Promise<OutboxEvent | null> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query<OutboxEvent>(
      `SELECT id, event_type, aggregate_type, aggregate_id, payload_json, attempts
       FROM outbox_events
       WHERE next_attempt_at <= now()
         AND (status = 'PENDING' OR (status = 'PROCESSING' AND locked_at < now() - interval '5 minutes'))
       ORDER BY occurred_at
       FOR UPDATE SKIP LOCKED
       LIMIT 1`
    );
    const event = result.rows[0];
    if (!event) {
      await client.query('COMMIT');
      return null;
    }
    await client.query(
      `UPDATE outbox_events SET status = 'PROCESSING', attempts = attempts + 1, locked_at = now() WHERE id = $1`,
      [event.id]
    );
    await client.query('COMMIT');
    return event;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

function dispatch(event: OutboxEvent): void {
  // Replace with typed provider adapters. Never log HRI payloads.
  console.info(JSON.stringify({ message: 'Dispatching outbox event', eventId: event.id, eventType: event.event_type }));
}

async function complete(eventId: string): Promise<void> {
  await pool.query(
    `UPDATE outbox_events SET status = 'PROCESSED', processed_at = now(), locked_at = NULL, last_error = NULL WHERE id = $1`,
    [eventId]
  );
}

async function fail(event: OutboxEvent, error: unknown): Promise<void> {
  const attempts = event.attempts + 1;
  const deadLetter = attempts >= 10;
  const delaySeconds = Math.min(3600, 2 ** Math.min(attempts, 10));
  await pool.query(
    `UPDATE outbox_events
     SET status = $2,
         next_attempt_at = now() + ($3 || ' seconds')::interval,
         locked_at = NULL,
         last_error = $4
     WHERE id = $1`,
    [event.id, deadLetter ? 'DEAD_LETTER' : 'PENDING', delaySeconds, error instanceof Error ? error.message : 'Unknown worker error']
  );
}

async function tick(): Promise<void> {
  const event = await claimOne();
  if (!event) return;
  try {
    dispatch(event);
    await complete(event.id);
  } catch (error) {
    await fail(event, error);
  }
}

async function run(): Promise<void> {
  console.info(JSON.stringify({ message: 'SOP OS worker started', pollInterval }));
  while (!stopping) {
    await tick();
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
