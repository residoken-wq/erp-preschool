import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';

const { Client } = pg;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const migrationsDir = path.resolve('database/migrations');
const client = new Client({ connectionString: databaseUrl });
await client.connect();

try {
  await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
  const appliedResult = await client.query('SELECT version FROM schema_migrations');
  const applied = new Set(appliedResult.rows.map((row) => row.version));
  const files = (await readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(path.join(migrationsDir, file), 'utf8');
    console.log(`Applying ${file}`);
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations(version) VALUES ($1)', [file]);
  }
  console.log('Migrations complete');
} finally {
  await client.end();
}

