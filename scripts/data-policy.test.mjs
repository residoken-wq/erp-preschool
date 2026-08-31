import assert from 'node:assert/strict';
import { mkdtemp, mkdir, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { guardSeedDirectory, loadApprovedDataset, validateDataset } from './data-policy.mjs';

function syntheticDataset(overrides = {}) {
  return {
    _data_policy: {
      schema_version: 1,
      dataset_id: 'test-synthetic-v1',
      provenance: 'synthetic',
      contains_real_hri: false,
      decision: 'DEC-020',
      purpose: 'Automated policy test',
      owner_role: 'Engineering Lead',
      ...overrides
    },
    contact: { email: 'user@example.test', phone: '+000000000001' }
  };
}

test('accepts a declared synthetic dataset with reserved contacts', () => {
  const metadata = validateDataset(syntheticDataset(), 'valid.json');
  assert.equal(metadata.provenance, 'synthetic');
});

test('rejects a dataset without policy metadata', () => {
  assert.throws(() => validateDataset({ records: [] }, 'missing.json'), /missing _data_policy/);
});

test('rejects real HRI and non-reserved contacts', () => {
  assert.throws(
    () => validateDataset(syntheticDataset({ contains_real_hri: true }), 'hri.json'),
    /contains_real_hri = false/
  );
  const dataset = syntheticDataset();
  dataset.contact.email = 'person@school.local';
  assert.throws(() => validateDataset(dataset, 'contact.json'), /IANA-reserved example domain/);
});

test('requires approval evidence for de-identified data', () => {
  assert.throws(
    () => validateDataset(syntheticDataset({ provenance: 'de-identified' }), 'deidentified.json'),
    /approval_evidence_id/
  );
});

test('loader rejects files outside database/seed', async () => {
  const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'sop-data-policy-'));
  await mkdir(path.join(repositoryRoot, 'database/seed'), { recursive: true });
  await writeFile(path.join(repositoryRoot, 'outside.json'), JSON.stringify(syntheticDataset()));
  await assert.rejects(() => loadApprovedDataset('outside.json', repositoryRoot), /below database\/seed/);
});

test('loader rejects an escape through a parent symlink', async () => {
  const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'sop-data-policy-'));
  const seedRoot = path.join(repositoryRoot, 'database/seed');
  const externalRoot = path.join(repositoryRoot, 'external');
  await mkdir(seedRoot, { recursive: true });
  await mkdir(externalRoot);
  await writeFile(path.join(externalRoot, 'valid.json'), JSON.stringify(syntheticDataset()));
  await symlink(externalRoot, path.join(seedRoot, 'linked'), 'dir');
  await assert.rejects(
    () => loadApprovedDataset('database/seed/linked/valid.json', repositoryRoot),
    /parent symlink/
  );
});

test('directory guard validates every registered dataset', async () => {
  const repositoryRoot = await mkdtemp(path.join(os.tmpdir(), 'sop-data-policy-'));
  const seedRoot = path.join(repositoryRoot, 'database/seed');
  await mkdir(seedRoot, { recursive: true });
  await writeFile(path.join(seedRoot, 'valid.json'), JSON.stringify(syntheticDataset()));
  const approved = await guardSeedDirectory(repositoryRoot);
  assert.equal(approved.length, 1);
  assert.equal(approved[0].metadata.dataset_id, 'test-synthetic-v1');
});
