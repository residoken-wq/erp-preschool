# Step 12 Release Readiness Report

> **Correction (15/09/2026):** the "12/12" line below describes design and
> release-candidate scope drafted at Step 12, not current implementation
> status. `docs/governance/PHASE_0_GATE_G0.md` remains `NOT READY FOR PASS`,
> and per `docs/IMPLEMENTATION_ROADMAP.md` Phase 1 (Secure Platform
> Foundation) has not started: there is no OIDC client/strategy code (only
> env-var schema validation in `packages/config`), no tenant RLS or composite
> tenant FKs, no versioned approval/rule-config engine, and no secure
> upload/malware-scan adapter. These are implementation gaps, not only
> pending vendor/environment selections. See `docs/CODEX_EXECUTION_PLAN.md`
> for the current, code-verified state and next tasks.

## Completed in the release candidate

- Explicit permission policy and action-level route requirements.
- Development actor validation for organization, campus and correlation UUIDs.
- API security headers, credentialed CORS allowlist and no-store responses.
- Append-only audit log extended with a serialized SHA-256 hash chain.
- Audit-integrity verification endpoint.
- Security-event schema for authentication/authorization and incident telemetry.
- Automated negative smoke cases for permission denial, duplicate Lead and
  invalid state transition.
- UAT catalog, security verification checklist, pilot waves, rollback triggers
  and sign-off template.

## Automated verification

| Gate | Expected |
|---|---|
| ESLint | Pass |
| Strict TypeScript | Pass |
| Unit tests | Pass |
| Production build | Pass |
| Migration + seed in CI PostgreSQL | Pass |
| API smoke + negative controls | Pass in CI/staging |
| Docker Compose validation | Pass in CI |

## External gates still required

The release candidate cannot truthfully receive production sign-off until the
organization selects and provides staging hosting, secret management, object
storage/malware scan, approved RPO/RTO, and named business/security approvers.
These are authority and environment dependencies, not code substitutions.

## Implementation gates still required (not environment-only)

- OIDC identity provider integration: no adapter, token validation, or claim
  mapping exists in `apps/api` today; `AUTH_MODE=development` header-based
  actor resolution is the only path (`apps/api/src/main.ts`,
  `apps/api/src/platform/actor-context.ts`).
- Tenant DB hardening: no composite tenant foreign keys or Row-Level Security;
  see `docs/governance/MODULE_AND_DATA_BASELINE.md` gap register.
- Approval/rule-config engine (P1-E06/E07 in
  `docs/backlog/PHASE_1_2_BACKLOG.md`): not built.
- Secure document upload/quarantine/malware-scan adapter (P1-E09): not built;
  `application_documents` and `assessments` tables exist but no service code
  reads or writes them yet.
- CI regression coverage for the Offer → Enrollment → Finance → Handover
  golden path: only exercised by a manual rehearsal script
  (`scripts/demo-journey-smoke.mjs`, see `docs/runbooks/local-demo.md`), not
  wired into `.github/workflows/ci.yml`.

Program progress at Step 12 covered SOP OS and Lead-to-Handover admission
design plus a working local/demo implementation of that vertical slice.
Phase 1 platform-security implementation and operational sign-off in SOP-012
remain outstanding; do not read this report as evidence that either is
complete.
