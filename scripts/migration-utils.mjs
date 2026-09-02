import { createHash } from 'node:crypto';

const migrationFilePattern = /^\d{4}_[a-z0-9_]+\.sql$/;
const transactionWrapperPattern = /^\s*BEGIN\s*;([\s\S]*?)COMMIT\s*;\s*$/i;
const nestedTransactionControlPattern = /(?:^|\n)\s*(?:BEGIN|COMMIT|ROLLBACK|START\s+TRANSACTION)\s*;/i;

export function isMigrationFile(fileName) {
  return migrationFilePattern.test(fileName);
}

export function migrationChecksum(sql) {
  return createHash('sha256').update(sql, 'utf8').digest('hex');
}

export function unwrapMigrationSql(fileName, sql) {
  const match = transactionWrapperPattern.exec(sql);
  if (!match) {
    throw new Error(`${fileName} must have exactly one outer BEGIN/COMMIT wrapper managed by the migration runner`);
  }

  const body = match[1].trim();
  if (!body) {
    throw new Error(`${fileName} contains no migration statements`);
  }
  if (nestedTransactionControlPattern.test(body)) {
    throw new Error(`${fileName} contains nested transaction control; only the outer BEGIN/COMMIT wrapper is allowed`);
  }
  return body;
}

export function prepareMigration(fileName, sql) {
  if (!isMigrationFile(fileName)) {
    throw new Error(`Invalid migration file name: ${fileName}`);
  }
  return {
    body: unwrapMigrationSql(fileName, sql),
    checksum: migrationChecksum(sql),
    version: fileName
  };
}
