import process from 'node:process';

const origin = process.env.API_ORIGIN ?? 'http://localhost:3001/api/v1';
const headers = {
  'content-type': 'application/json',
  'x-actor-id': '00000000-0000-7000-8000-000000001001',
  'x-organization-id': '00000000-0000-7000-8000-000000000001',
  'x-campus-ids': '00000000-0000-7000-8000-000000000101'
};

async function request(path, init = {}) {
  const response = await fetch(`${origin}${path}`, { ...init, headers: { ...headers, ...init.headers } });
  if (!response.ok) throw new Error(`${init.method ?? 'GET'} ${path} failed with HTTP ${response.status}: ${await response.text()}`);
  return response.json();
}

async function expectStatus(path, status, init = {}) {
  const response = await fetch(`${origin}${path}`, { ...init, headers: { ...headers, ...init.headers } });
  if (response.status !== status) throw new Error(`${init.method ?? 'GET'} ${path}: expected ${status}, received ${response.status}`);
}

async function waitForHealth() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try { return await request('/health/ready'); } catch (error) {
      if (attempt === 30) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const suffix = Date.now();
const readiness = await waitForHealth();
if (readiness.status !== 'ok' || readiness.database !== 'ok') throw new Error('API readiness invariant failed');
const hardened = await fetch(`${origin}/health`, { headers });
if (!hardened.ok) throw new Error(`API liveness failed with HTTP ${hardened.status}`);
const liveness = await hardened.json();
if (liveness.status !== 'ok' || 'database' in liveness) throw new Error('API liveness must not depend on database status');
for (const header of ['x-content-type-options', 'x-frame-options', 'content-security-policy', 'cache-control']) {
  if (!hardened.headers.get(header)) throw new Error(`Missing security header: ${header}`);
}
await request('/context');
await request('/dashboard/summary');
await request('/processes');
await request('/sops');
await request('/applications');
const lead = await request('/leads', {
  method: 'POST',
  body: JSON.stringify({
    dataProvenance: 'synthetic',
    code: `LEAD-SMOKE-${suffix}`,
    firstName: 'Synthetic-Smoke',
    lastName: 'Synthetic-Test',
    email: `smoke.${suffix}@example.test`,
    sourceType: 'CI',
    campusId: '00000000-0000-7000-8000-000000000101'
  })
});
if (lead.status !== 'NEW') throw new Error('Lead smoke invariant failed');
await expectStatus('/leads', 403, {
  method: 'POST',
  headers: { 'x-permissions': 'lead:read' },
  body: JSON.stringify({ dataProvenance: 'synthetic', code: `LEAD-DENIED-${suffix}`, firstName: 'Synthetic-Denied', lastName: 'Synthetic-Test', email: `denied.${suffix}@example.test`, sourceType: 'CI', campusId: '00000000-0000-7000-8000-000000000101' })
});
await expectStatus('/leads', 422, {
  method: 'POST',
  body: JSON.stringify({ dataProvenance: 'synthetic', code: `LEAD-REAL-${suffix}`, firstName: 'Real', lastName: 'Person', email: 'person@school.vn', sourceType: 'CI', campusId: '00000000-0000-7000-8000-000000000101' })
});
await expectStatus('/leads', 409, {
  method: 'POST',
  body: JSON.stringify({ dataProvenance: 'synthetic', code: `LEAD-DUP-${suffix}`, firstName: 'Synthetic-Smoke', lastName: 'Synthetic-Duplicate', email: `smoke.${suffix}@example.test`, sourceType: 'CI', campusId: '00000000-0000-7000-8000-000000000101' })
});
await expectStatus(`/leads/${lead.id}/transitions`, 409, { method: 'POST', body: JSON.stringify({ to: 'CONVERTED' }) });
const integrity = await request('/audit-integrity');
if (!integrity.valid) throw new Error('Audit hash-chain integrity failed');
console.log('API smoke test passed');
