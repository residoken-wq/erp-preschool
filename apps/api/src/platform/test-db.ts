import { Pool, type PoolClient } from 'pg';

export function createTestPool(): Pool {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required for integration tests');
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

export async function withRollback<T>(pool: Pool, fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    return await fn(client);
  } finally {
    try { await client.query('ROLLBACK'); } finally { client.release(); }
  }
}
