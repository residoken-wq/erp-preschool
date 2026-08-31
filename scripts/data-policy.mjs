import { lstat, readFile, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const POLICY_DECISION = 'DEC-020';
const MAX_DATASET_BYTES = 1024 * 1024;
const MAX_STRUCTURE_DEPTH = 24;
const ALLOWED_PROVENANCE = new Set(['synthetic', 'de-identified']);
const RESERVED_EMAIL_DOMAINS = new Set(['example.test', 'example.invalid', 'example.com', 'example.net', 'example.org']);
const METADATA_FIELDS = new Set([
  'schema_version',
  'dataset_id',
  'provenance',
  'contains_real_hri',
  'decision',
  'purpose',
  'owner_role',
  'approval_evidence_id',
  'deidentification_method',
  'source_fingerprint_sha256'
]);

function fail(message) {
  throw new Error(`DEC-020 data policy violation: ${message}`);
}

function assertNonEmptyString(value, field) {
  if (typeof value !== 'string' || value.trim() === '' || value.trim().toUpperCase() === 'TBD') {
    fail(`${field} must be a non-empty, approved value`);
  }
}

function assertStructureAndReservedContacts(value, location = '$', depth = 0) {
  if (depth > MAX_STRUCTURE_DEPTH) fail(`${location} exceeds maximum structure depth ${MAX_STRUCTURE_DEPTH}`);
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      assertStructureAndReservedContacts(value[index], `${location}[${index}]`, depth + 1);
    }
    return;
  }
  if (value === null || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value)) {
    const childLocation = `${location}.${key}`;
    if (/email/i.test(key) && typeof child === 'string') {
      const domain = child.split('@').at(-1)?.toLowerCase();
      if (!domain || !RESERVED_EMAIL_DOMAINS.has(domain)) {
        fail(`${childLocation} must use an IANA-reserved example domain`);
      }
    }
    if (/phone|mobile/i.test(key) && typeof child === 'string' && !/^\+000\d{6,15}$/.test(child)) {
      fail(`${childLocation} must use the non-routable synthetic +000 range`);
    }
    assertStructureAndReservedContacts(child, childLocation, depth + 1);
  }
}

export function validateDataset(dataset, sourceLabel = 'dataset') {
  if (dataset === null || Array.isArray(dataset) || typeof dataset !== 'object') {
    fail(`${sourceLabel} must be a JSON object`);
  }

  const metadata = dataset._data_policy;
  if (metadata === null || Array.isArray(metadata) || typeof metadata !== 'object') {
    fail(`${sourceLabel} is missing _data_policy metadata`);
  }
  for (const field of Object.keys(metadata)) {
    if (!METADATA_FIELDS.has(field)) fail(`${sourceLabel} has unknown metadata field ${field}`);
  }
  if (metadata.schema_version !== 1) fail(`${sourceLabel} requires _data_policy.schema_version = 1`);
  assertNonEmptyString(metadata.dataset_id, `${sourceLabel} dataset_id`);
  assertNonEmptyString(metadata.purpose, `${sourceLabel} purpose`);
  assertNonEmptyString(metadata.owner_role, `${sourceLabel} owner_role`);
  if (!ALLOWED_PROVENANCE.has(metadata.provenance)) {
    fail(`${sourceLabel} provenance must be synthetic or de-identified`);
  }
  if (metadata.contains_real_hri !== false) {
    fail(`${sourceLabel} must explicitly declare contains_real_hri = false`);
  }
  if (metadata.decision !== POLICY_DECISION) fail(`${sourceLabel} must reference ${POLICY_DECISION}`);

  if (metadata.provenance === 'de-identified') {
    assertNonEmptyString(metadata.approval_evidence_id, `${sourceLabel} approval_evidence_id`);
    assertNonEmptyString(metadata.deidentification_method, `${sourceLabel} deidentification_method`);
    if (!/^[a-f0-9]{64}$/i.test(metadata.source_fingerprint_sha256 ?? '')) {
      fail(`${sourceLabel} de-identified data requires a SHA-256 source fingerprint`);
    }
  } else if (
    metadata.approval_evidence_id !== undefined ||
    metadata.deidentification_method !== undefined ||
    metadata.source_fingerprint_sha256 !== undefined
  ) {
    fail(`${sourceLabel} synthetic data must not carry de-identification evidence fields`);
  }

  assertStructureAndReservedContacts(dataset);
  return metadata;
}

export async function loadApprovedDataset(inputPath, repositoryRoot = process.cwd()) {
  const seedRoot = path.resolve(repositoryRoot, 'database/seed');
  const resolvedPath = path.resolve(repositoryRoot, inputPath);
  const relativeToSeedRoot = path.relative(seedRoot, resolvedPath);
  if (
    relativeToSeedRoot === '' ||
    relativeToSeedRoot.startsWith(`..${path.sep}`) ||
    relativeToSeedRoot === '..' ||
    path.isAbsolute(relativeToSeedRoot)
  ) {
    fail('dataset path must resolve to a file below database/seed');
  }
  if (path.extname(resolvedPath).toLowerCase() !== '.json') fail('only JSON datasets are allowed');

  const seedRootStats = await lstat(seedRoot);
  if (seedRootStats.isSymbolicLink() || !seedRootStats.isDirectory()) {
    fail('database/seed must be a regular directory, not a symlink');
  }
  const stats = await lstat(resolvedPath);
  if (stats.isSymbolicLink()) fail('dataset symlinks are not allowed');
  if (!stats.isFile()) fail('dataset path must reference a regular file');
  if (stats.size > MAX_DATASET_BYTES) fail(`dataset exceeds ${MAX_DATASET_BYTES} bytes`);
  const physicalSeedRoot = await realpath(seedRoot);
  const physicalDatasetPath = await realpath(resolvedPath);
  const physicalRelativePath = path.relative(physicalSeedRoot, physicalDatasetPath);
  if (
    physicalRelativePath.startsWith(`..${path.sep}`) ||
    physicalRelativePath === '..' ||
    path.isAbsolute(physicalRelativePath)
  ) {
    fail('dataset must not escape database/seed through a parent symlink');
  }

  let dataset;
  try {
    dataset = JSON.parse(await readFile(resolvedPath, 'utf8'));
  } catch (error) {
    fail(`cannot parse ${path.relative(repositoryRoot, resolvedPath)} as JSON: ${error.message}`);
  }
  const relativePath = path.relative(repositoryRoot, resolvedPath);
  const metadata = validateDataset(dataset, relativePath);
  return { dataset, metadata, relativePath };
}

async function collectDatasetPaths(directory, repositoryRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) fail(`${path.relative(repositoryRoot, entryPath)} is a symlink`);
    if (entry.isDirectory()) {
      paths.push(...(await collectDatasetPaths(entryPath, repositoryRoot)));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.json') {
      paths.push(entryPath);
    } else if (entry.isFile() && entry.name !== 'README.md') {
      fail(`${path.relative(repositoryRoot, entryPath)} is not an allowed dataset file`);
    }
  }
  return paths;
}

export async function guardSeedDirectory(repositoryRoot = process.cwd()) {
  const seedRoot = path.resolve(repositoryRoot, 'database/seed');
  const datasetPaths = await collectDatasetPaths(seedRoot, repositoryRoot);
  if (datasetPaths.length === 0) fail('database/seed contains no registered JSON dataset');

  const seenDatasetIds = new Set();
  const approved = [];
  for (const datasetPath of datasetPaths.sort()) {
    const result = await loadApprovedDataset(datasetPath, repositoryRoot);
    if (seenDatasetIds.has(result.metadata.dataset_id)) {
      fail(`duplicate dataset_id ${result.metadata.dataset_id}`);
    }
    seenDatasetIds.add(result.metadata.dataset_id);
    approved.push(result);
  }
  return approved;
}
