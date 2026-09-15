import process from 'node:process';

const origin = process.env.API_ORIGIN ?? 'http://localhost:3001/api/v1';
const baseHeaders = {
  'content-type': 'application/json',
  'x-organization-id': '00000000-0000-7000-8000-000000000001',
  'x-campus-ids': '00000000-0000-7000-8000-000000000101'
};
const officerHeaders = { ...baseHeaders, 'x-actor-id': '00000000-0000-7000-8000-000000001002' };
const managerHeaders = { ...baseHeaders, 'x-actor-id': '00000000-0000-7000-8000-000000001001' };

async function request(path, headers, init = {}) {
  const response = await fetch(`${origin}${path}`, { ...init, headers: { ...headers, ...init.headers } });
  if (!response.ok) throw new Error(`${init.method ?? 'GET'} ${path} returned ${response.status}: ${await response.text()}`);
  return response.json();
}

async function command(path, headers, body) {
  return request(path, headers, { method: 'POST', body: JSON.stringify(body) });
}

async function expectStatus(path, headers, body, expected) {
  const response = await fetch(`${origin}${path}`, { method: 'POST', headers, body: JSON.stringify(body) });
  if (response.status !== expected) throw new Error(`${path}: expected ${expected}, received ${response.status}`);
}

const leads = await request('/leads?q=LEAD-2026-0101', officerHeaders);
const lead = leads.data.find((item) => item.code === 'LEAD-2026-0101');
if (!lead || lead.status !== 'NEW') throw new Error('Golden journey requires a clean canonical seed');

await command(`/leads/${lead.id}/transitions`, officerHeaders, {
  to: 'ASSIGNED',
  ownerUserId: officerHeaders['x-actor-id'],
  nextActionAt: new Date(Date.now() + 86_400_000).toISOString()
});
await command(`/leads/${lead.id}/transitions`, officerHeaders, { to: 'CONTACTED' });
await command(`/leads/${lead.id}/transitions`, officerHeaders, { to: 'QUALIFIED' });
const application = await command(`/leads/${lead.id}/applications`, officerHeaders, {
  code: 'APP-DEMO-GOLDEN', programCode: 'PRESCHOOL-DEMO', intakeCode: 'DEMO-2026'
});

for (const status of ['SUBMITTED', 'DOCUMENT_REVIEW', 'VERIFIED', 'ASSESSMENT_PENDING', 'ASSESSED', 'DECISION_PENDING']) {
  await command(`/applications/${application.id}/transitions`, officerHeaders, { to: status });
}

const offer = await command(`/applications/${application.id}/offers`, officerHeaders, {
  code: 'OFF-DEMO-GOLDEN',
  validUntil: new Date(Date.now() + 7 * 86_400_000).toISOString(),
  terms: { mode: 'SIMULATED_LOCAL_DEMO' }
});
await command(`/applications/offers/${offer.id}/transitions`, officerHeaders, { to: 'PENDING_APPROVAL' });
await expectStatus(`/applications/offers/${offer.id}/transitions`, officerHeaders, { to: 'APPROVED' }, 409);
await command(`/applications/offers/${offer.id}/transitions`, managerHeaders, { to: 'APPROVED' });
await command(`/applications/offers/${offer.id}/transitions`, managerHeaders, { to: 'ISSUED' });
await command(`/applications/offers/${offer.id}/transitions`, managerHeaders, { to: 'ACCEPTED' });

const enrollment = await command(`/applications/offers/${offer.id}/enrollment`, managerHeaders, { code: 'ENR-DEMO-GOLDEN' });
await command(`/applications/enrollments/${enrollment.id}/finance-setup`, managerHeaders, {
  contractCode: 'CTR-DEMO-GOLDEN', feePlanCode: 'FEE-DEMO-GOLDEN', totalAmount: 0, currency: 'VND'
});
const checklist = [
  { key: 'identity', label: 'Hồ sơ synthetic', complete: true },
  { key: 'consent', label: 'Consent simulated', complete: true },
  { key: 'health', label: 'Health metadata synthetic', complete: true }
];
await command(`/applications/enrollments/${enrollment.id}/handover/transitions`, managerHeaders, { to: 'READY', checklist });
await command(`/applications/enrollments/${enrollment.id}/handover/transitions`, managerHeaders, { to: 'SUBMITTED' });
await command(`/applications/enrollments/${enrollment.id}/handover/transitions`, managerHeaders, { to: 'ACCEPTED' });

const enrollments = await request('/applications/enrollments/list', managerHeaders);
const completed = enrollments.find((item) => item.id === enrollment.id);
if (!completed || completed.status !== 'HANDED_OVER' || completed.handover_status !== 'ACCEPTED') {
  throw new Error('Golden journey did not reach HANDED_OVER/ACCEPTED');
}

const sops = await request('/sops', officerHeaders);
const sop = sops.find((item) => item.code === 'ADM-010');
if (!sop || sop.version_status !== 'DRAFT') throw new Error('SOP golden journey requires ADM-010 in DRAFT');
const sopDetail = await request(`/sops/${sop.id}`, officerHeaders);
const sopVersion = sopDetail.versions?.[0];
if (!sopVersion?.id) throw new Error('SOP golden journey requires a seeded version');
await command(`/sops/versions/${sopVersion.id}/transitions`, officerHeaders, { to: 'IN_REVIEW' });
await command(`/sops/versions/${sopVersion.id}/comments`, managerHeaders, { body: 'Synthetic local demo review passed.' });
await expectStatus(`/sops/versions/${sopVersion.id}/transitions`, officerHeaders, { to: 'APPROVED' }, 409);
await command(`/sops/versions/${sopVersion.id}/transitions`, managerHeaders, { to: 'APPROVED' });
await command(`/sops/versions/${sopVersion.id}/transitions`, managerHeaders, { to: 'EFFECTIVE' });
const effectiveSop = await request(`/sops/${sop.id}`, managerHeaders);
if (effectiveSop.versions?.[0]?.status !== 'EFFECTIVE') throw new Error('SOP golden journey did not reach EFFECTIVE');
const sopAudit = await request(`/audit-events?objectType=SOPVersion&objectId=${sopVersion.id}`, managerHeaders);
if (sopAudit.length < 3) throw new Error('SOP golden journey is missing audit evidence');

const audit = await request('/audit-integrity', managerHeaders);
if (!audit.valid) throw new Error('Audit integrity failed after golden journey');

console.log('Local demo golden journeys passed: Lead -> Handover and SOP Draft -> Effective');
