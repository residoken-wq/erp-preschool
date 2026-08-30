import process from 'node:process';
import pg from 'pg';

if (process.env.NODE_ENV === 'production') throw new Error('Refusing to reset a production environment');
if (process.env.ALLOW_DEV_RESET !== 'true') throw new Error('Set ALLOW_DEV_RESET=true to reset the development database');

const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  console.log('Development database reset complete');
} finally {
  await client.end();
}

