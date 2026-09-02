import { Global, Logger, Module } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_POOL = Symbol('PG_POOL');

@Global()
@Module({
  providers: [
    {
      provide: PG_POOL,
      useFactory: (): Pool => {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) throw new Error('DATABASE_URL is required');
        const pool = new Pool({
          connectionString,
          max: 10,
          idleTimeoutMillis: 30_000,
          connectionTimeoutMillis: 2_000
        });
        const logger = new Logger('DatabasePool');
        pool.on('error', () => logger.error('Unexpected idle PostgreSQL client error'));
        return pool;
      }
    }
  ],
  exports: [PG_POOL]
})
export class DatabaseModule {}
