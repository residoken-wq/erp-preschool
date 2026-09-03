import process from 'node:process';

const origin = process.env.API_ORIGIN;
if (!origin) throw new Error('API_ORIGIN is required, for example https://staging.example.com/api/v1');
if (!origin.startsWith('https://') && process.env.ALLOW_INSECURE_PILOT_GATE !== 'true') {
  throw new Error('Pilot gate requires HTTPS; use ALLOW_INSECURE_PILOT_GATE=true only for local testing');
}

const headers = {};
if (process.env.PILOT_ACCESS_TOKEN) headers.authorization = `Bearer ${process.env.PILOT_ACCESS_TOKEN}`;

async function check(path) {
  const response = await fetch(`${origin}${path}`, { headers, redirect: 'error' });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return { response, body: await response.json() };
}

const liveness = await check('/health');
if (liveness.body.status !== 'ok' || 'database' in liveness.body) throw new Error('Liveness gate failed');
const readiness = await check('/health/ready');
if (readiness.body.status !== 'ok' || readiness.body.database !== 'ok') throw new Error('Readiness gate failed');
for (const name of ['x-content-type-options', 'x-frame-options', 'content-security-policy', 'cache-control']) {
  if (!liveness.response.headers.get(name)) throw new Error(`Security header missing: ${name}`);
}

await check('/context');
await check('/dashboard/summary');
const audit = await check('/audit-integrity');
if (!audit.body.valid) throw new Error('Audit integrity gate failed');

console.log(JSON.stringify({
  checkedAt: new Date().toISOString(),
  origin,
  liveness: 'PASS',
  readiness: 'PASS',
  securityHeaders: 'PASS',
  authenticatedContext: 'PASS',
  dashboard: 'PASS',
  auditIntegrity: 'PASS',
  hashedAuditEvents: audit.body.hashedEvents
}, null, 2));
