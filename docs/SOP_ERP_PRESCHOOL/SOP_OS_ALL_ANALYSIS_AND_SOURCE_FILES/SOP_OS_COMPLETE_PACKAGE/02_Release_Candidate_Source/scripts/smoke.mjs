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
    try { return await request('/health'); } catch (error) {
      if (attempt === 30) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const suffix = Date.now();
await waitForHealth();
const hardened = await fetch(`${origin}/health`, { headers });
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
    code: `LEAD-SMOKE-${suffix}`,
    firstName: 'Smoke',
    lastName: 'Test',
    email: `smoke.${suffix}@example.test`,
    sourceType: 'CI',
    campusId: '00000000-0000-7000-8000-000000000101'
  })
});
if (lead.status !== 'NEW') throw new Error('Lead smoke invariant failed');
await expectStatus('/leads', 403, {
  method: 'POST',
  headers: { 'x-permissions': 'lead:read' },
  body: JSON.stringify({ code: `LEAD-DENIED-${suffix}`, firstName: 'Denied', lastName: 'Test', email: `denied.${suffix}@example.test`, sourceType: 'CI', campusId: '00000000-0000-7000-8000-000000000101' })
});
await expectStatus('/leads', 409, {
  method: 'POST',
  body: JSON.stringify({ code: `LEAD-DUP-${suffix}`, firstName: 'Smoke', lastName: 'Duplicate', email: `smoke.${suffix}@example.test`, sourceType: 'CI', campusId: '00000000-0000-7000-8000-000000000101' })
});
await expectStatus(`/leads/${lead.id}/transitions`, 409, { method: 'POST', body: JSON.stringify({ to: 'CONVERTED' }) });
const integrity = await request('/audit-integrity');
if (!integrity.valid) throw new Error('Audit hash-chain integrity failed');
console.log('API smoke test passed');
