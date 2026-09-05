import process from 'node:process';
import pg from 'pg';

const apiOrigin = (process.env.API_ORIGIN ?? 'http://localhost:3001/api/v1').replace(/\/$/, '');
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');
if (process.env.NODE_ENV === 'production') throw new Error('Local demo readiness cannot run in production');

const organizationId = '00000000-0000-7000-8000-000000000001';
const actorHeaders = {
  'x-actor-id': '00000000-0000-7000-8000-000000001001',
  'x-organization-id': organizationId,
  'x-campus-ids': '00000000-0000-7000-8000-000000000101'
};

async function getJson(path) {
  const response = await fetch(`${apiOrigin}${path}`, { headers: actorHeaders });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return response.json();
}

const readiness = await getJson('/health/ready');
if (readiness.status !== 'ok' || readiness.database !== 'ok') {
  throw new Error('API readiness check failed');
}

const context = await getJson('/context');
if (!context.user || !Array.isArray(context.campuses) || context.campuses.length !== 1) {
  throw new Error('Canonical demo actor/campus context is unavailable');
}

const { Client } = pg;
const client = new Client({ connectionString: databaseUrl, connectionTimeoutMillis: 2_000 });
await client.connect();

try {
  const result = await client.query(
    `SELECT
       (SELECT count(*)::integer FROM leads WHERE organization_id = $1) AS leads,
       (SELECT count(*)::integer FROM applications WHERE organization_id = $1) AS applications,
       (SELECT count(*)::integer FROM work_items WHERE organization_id = $1) AS tasks,
       (SELECT count(*)::integer FROM sops WHERE organization_id = $1) AS sops,
       (SELECT count(*)::integer FROM outbox_events WHERE organization_id = $1 AND status IN ('PENDING', 'PROCESSING', 'DEAD_LETTER')) AS outbox_backlog,
       (SELECT max(version) FROM schema_migrations) AS latest_migration`,
    [organizationId]
  );
  const counts = result.rows[0];
  const expected = { leads: 4, applications: 2, tasks: 3, sops: 3 };
  for (const [name, value] of Object.entries(expected)) {
    if (counts[name] !== value) {
      throw new Error(`Demo dataset is not clean: expected ${value} ${name}, received ${counts[name]}`);
    }
  }
  if (counts.outbox_backlog !== 0) throw new Error(`Demo outbox backlog is ${counts.outbox_backlog}`);
  if (counts.latest_migration !== '0007_offer_author_separation.sql') {
    throw new Error(`Expected migration 0007_offer_author_separation.sql, received ${counts.latest_migration ?? 'none'}`);
  }

  console.log(`Local demo ready: migration ${counts.latest_migration}; 4 leads, 2 applications, 3 tasks, 3 SOPs; outbox clear`);
} finally {
  await client.end();
}
