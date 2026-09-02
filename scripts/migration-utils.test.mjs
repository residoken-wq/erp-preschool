import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isMigrationFile,
  migrationChecksum,
  prepareMigration,
  unwrapMigrationSql
} from './migration-utils.mjs';

test('migration file names are ordered numeric SQL artifacts', () => {
  assert.equal(isMigrationFile('0001_platform.sql'), true);
  assert.equal(isMigrationFile('0010_admission_extensions.sql'), true);
  assert.equal(isMigrationFile('migration.sql'), false);
  assert.equal(isMigrationFile('0001_PLATFORM.sql'), false);
  assert.equal(isMigrationFile('../0001_platform.sql'), false);
});

test('checksum is stable and changes with migration content', () => {
  const sql = 'BEGIN;\nSELECT 1;\nCOMMIT;\n';
  assert.equal(migrationChecksum(sql), migrationChecksum(sql));
  assert.notEqual(migrationChecksum(sql), migrationChecksum(`${sql}\n`));
  assert.match(migrationChecksum(sql), /^[a-f0-9]{64}$/);
});

test('outer transaction wrapper is removed for runner-owned atomic execution', () => {
  const body = unwrapMigrationSql(
    '0001_example.sql',
    '  BEGIN;\nCREATE TABLE example(id uuid);\nDO $$ BEGIN PERFORM 1; END $$;\nCOMMIT;\n'
  );

  assert.equal(body, 'CREATE TABLE example(id uuid);\nDO $$ BEGIN PERFORM 1; END $$;');
});

test('migration preparation rejects missing wrappers and empty migrations', () => {
  assert.throws(
    () => prepareMigration('0001_example.sql', 'CREATE TABLE example(id uuid);'),
    /outer BEGIN\/COMMIT wrapper/
  );
  assert.throws(
    () => prepareMigration('0001_example.sql', 'BEGIN;\nCOMMIT;'),
    /contains no migration statements/
  );
  assert.throws(
    () => prepareMigration('example.sql', 'BEGIN;\nSELECT 1;\nCOMMIT;'),
    /Invalid migration file name/
  );
  assert.throws(
    () => prepareMigration('0001_example.sql', 'BEGIN;\nSELECT 1;\nCOMMIT;\nBEGIN;\nSELECT 2;\nCOMMIT;'),
    /nested transaction control/
  );
});
