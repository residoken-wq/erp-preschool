import assert from 'node:assert/strict';
import { chmod, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const projectRoot = path.resolve(import.meta.dirname, '..');
const scriptPath = path.join(projectRoot, 'scripts/local-services.sh');

function runLocalServices(command, env = {}) {
  return spawnSync('bash', [scriptPath, command], {
    cwd: projectRoot,
    encoding: 'utf8',
    env: { ...process.env, ...env }
  });
}

async function writeExecutable(filePath, content) {
  await writeFile(filePath, content, 'utf8');
  await chmod(filePath, 0o755);
}

test('help documents smoke and guarded demo lifecycle commands', () => {
  const result = runLocalServices('help');

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /smoke\s+Wait for API\/Web/);
  assert.match(result.stdout, /demo-ready\s+Verify services/);
  assert.match(result.stdout, /demo-reset\s+Replace local DB/);
  assert.match(result.stdout, /RESET_SYNTHETIC_DEMO/);
  assert.match(result.stdout, /LOCAL_API_ORIGIN/);
});

test('demo-reset refuses to replace local data without explicit confirmation', async () => {
  const binDir = await mkdtemp(path.join(os.tmpdir(), 'sop-local-demo-reset-guard-'));

  try {
    await writeExecutable(path.join(binDir, 'docker'), '#!/usr/bin/env bash\nexit 99\n');
    await writeExecutable(path.join(binDir, 'curl'), '#!/usr/bin/env bash\nexit 99\n');
    const result = runLocalServices('demo-reset', { PATH: `${binDir}:/usr/bin:/bin` });

    assert.equal(result.status, 2);
    assert.match(result.stderr, /replaces the local PostgreSQL schema/);
    assert.match(result.stderr, /LOCAL_DEMO_RESET_CONFIRM=RESET_SYNTHETIC_DEMO/);
  } finally {
    await rm(binDir, { recursive: true, force: true });
  }
});

test('confirmed demo-reset rebuilds the canonical scenario and runs readiness', async () => {
  const binDir = await mkdtemp(path.join(os.tmpdir(), 'sop-local-demo-reset-'));
  const dockerLog = path.join(binDir, 'docker.log');
  const pnpmLog = path.join(binDir, 'pnpm.log');

  try {
    await writeExecutable(path.join(binDir, 'docker'), '#!/usr/bin/env bash\nprintf "%s\\n" "$*" >> "${LOCAL_DOCKER_LOG}"\n');
    await writeExecutable(path.join(binDir, 'curl'), '#!/usr/bin/env bash\nexit 0\n');
    await writeExecutable(path.join(binDir, 'pnpm'), '#!/usr/bin/env bash\nprintf "%s\\n" "$*" >> "${LOCAL_PNPM_LOG}"\n');
    const result = runLocalServices('demo-reset', {
      PATH: `${binDir}:/usr/bin:/bin`,
      LOCAL_DEMO_RESET_CONFIRM: 'RESET_SYNTHETIC_DEMO',
      LOCAL_DOCKER_LOG: dockerLog,
      LOCAL_PNPM_LOG: pnpmLog
    });

    assert.equal(result.status, 0, result.stderr);
    const dockerCalls = await readFile(dockerLog, 'utf8');
    assert.match(dockerCalls, /compose stop api worker/);
    assert.match(dockerCalls, /compose run --rm -e NODE_ENV=development -e ALLOW_DEV_RESET=true migrate/);
    assert.match(dockerCalls, /compose up -d api worker web/);
    assert.equal(await readFile(pnpmLog, 'utf8'), 'demo:ready\n');
    assert.match(result.stdout, /Local demo reset complete/);
  } finally {
    await rm(binDir, { recursive: true, force: true });
  }
});

test('smoke waits for readiness and forwards normalized API origin to pnpm', async () => {
  const binDir = await mkdtemp(path.join(os.tmpdir(), 'sop-local-smoke-pnpm-'));
  const logPath = path.join(binDir, 'pnpm.log');

  try {
    await writeExecutable(path.join(binDir, 'curl'), '#!/usr/bin/env bash\nexit 0\n');
    await writeExecutable(
      path.join(binDir, 'pnpm'),
      '#!/usr/bin/env bash\nprintf "%s|%s\\n" "${API_ORIGIN}" "$*" > "${LOCAL_TEST_LOG}"\n'
    );

    const result = runLocalServices('smoke', {
      PATH: `${binDir}:/usr/bin:/bin`,
      LOCAL_API_ORIGIN: 'http://127.0.0.1:3999/api/v1/',
      LOCAL_TEST_LOG: logPath
    });

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /API: ready \(http:\/\/127\.0\.0\.1:3999\/api\/v1\/health\/ready\)/);
    assert.match(result.stdout, /Web: ready/);
    assert.equal(await readFile(logPath, 'utf8'), 'http://127.0.0.1:3999/api/v1|smoke\n');
  } finally {
    await rm(binDir, { recursive: true, force: true });
  }
});

test('smoke falls back to corepack when pnpm is unavailable', async () => {
  const binDir = await mkdtemp(path.join(os.tmpdir(), 'sop-local-smoke-corepack-'));
  const logPath = path.join(binDir, 'corepack.log');

  try {
    await writeExecutable(path.join(binDir, 'curl'), '#!/usr/bin/env bash\nexit 0\n');
    await writeExecutable(
      path.join(binDir, 'corepack'),
      '#!/usr/bin/env bash\nprintf "%s|%s\\n" "${API_ORIGIN}" "$*" > "${LOCAL_TEST_LOG}"\n'
    );

    const result = runLocalServices('smoke', {
      PATH: `${binDir}:/usr/bin:/bin`,
      LOCAL_API_ORIGIN: 'http://localhost:4555/api/v1',
      LOCAL_TEST_LOG: logPath
    });

    assert.equal(result.status, 0, result.stderr);
    assert.equal(await readFile(logPath, 'utf8'), 'http://localhost:4555/api/v1|pnpm smoke\n');
  } finally {
    await rm(binDir, { recursive: true, force: true });
  }
});

test('smoke rejects invalid wait configuration before making requests', async () => {
  const binDir = await mkdtemp(path.join(os.tmpdir(), 'sop-local-smoke-invalid-'));

  try {
    await writeExecutable(path.join(binDir, 'curl'), '#!/usr/bin/env bash\nexit 99\n');
    const result = runLocalServices('smoke', {
      PATH: `${binDir}:/usr/bin:/bin`,
      LOCAL_START_WAIT_ATTEMPTS: '0'
    });

    assert.equal(result.status, 2);
    assert.match(result.stderr, /LOCAL_START_WAIT_ATTEMPTS must be a positive integer/);
  } finally {
    await rm(binDir, { recursive: true, force: true });
  }
});
