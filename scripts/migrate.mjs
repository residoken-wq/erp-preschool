import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';
import { prepareMigration } from './migration-utils.mjs';

const { Client } = pg;
const migrationLockSql = "hashtext(current_database() || ':schema_migrations')";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const migrationsDir = path.resolve('database/migrations');
const client = new Client({ connectionString: databaseUrl });
await client.connect();
let migrationLockAcquired = false;

try {
  await client.query(`SELECT pg_advisory_lock(${migrationLockSql})`);
  migrationLockAcquired = true;
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version text PRIMARY KEY,
      checksum varchar(64),
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  await client.query('ALTER TABLE schema_migrations ADD COLUMN IF NOT EXISTS checksum varchar(64)');

  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort();
  const migrations = new Map();
  for (const file of files) {
    const sql = await readFile(path.join(migrationsDir, file), 'utf8');
    migrations.set(file, prepareMigration(file, sql));
  }

  const appliedResult = await client.query('SELECT version, checksum FROM schema_migrations ORDER BY version');
  const applied = new Set();
  for (const row of appliedResult.rows) {
    const migration = migrations.get(row.version);
    if (!migration) {
      throw new Error(`Applied migration is missing from source: ${row.version}`);
    }
    if (row.checksum && row.checksum !== migration.checksum) {
      throw new Error(`Applied migration checksum mismatch: ${row.version}`);
    }
    if (!row.checksum) {
      await client.query(
        'UPDATE schema_migrations SET checksum = $2 WHERE version = $1 AND checksum IS NULL',
        [row.version, migration.checksum]
      );
      console.log(`Recorded checksum for existing migration ${row.version}`);
    }
    applied.add(row.version);
  }

  for (const file of files) {
    if (applied.has(file)) continue;
    const migration = migrations.get(file);
    if (!migration) throw new Error(`Migration was not prepared: ${file}`);
    console.log(`Applying ${file}`);
    await client.query('BEGIN');
    try {
      await client.query(migration.body);
      await client.query(
        'INSERT INTO schema_migrations(version, checksum) VALUES ($1, $2)',
        [migration.version, migration.checksum]
      );
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }
  console.log('Migrations complete');
} finally {
  if (migrationLockAcquired) {
    await client.query(`SELECT pg_advisory_unlock(${migrationLockSql})`).catch(() => undefined);
  }
  await client.end();
}
