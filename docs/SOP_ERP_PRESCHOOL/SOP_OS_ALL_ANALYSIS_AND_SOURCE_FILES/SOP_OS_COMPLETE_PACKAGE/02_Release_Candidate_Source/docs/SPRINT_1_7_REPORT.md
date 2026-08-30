# Step 11 — MVP Development Sprint 1–7

## Delivery summary

This increment implements a runnable P0 vertical slice for SOP Governance and
the Lead-to-Enrollment pilot. It builds on the Sprint 0 modular monolith and
keeps policy enforcement in the API.

| Sprint | Implemented outcome |
|---|---|
| Sprint 1 | Actor context, organization/campus scope, user-role context, audit |
| Sprint 2 | Process tree, SOP Registry search and detail |
| Sprint 3 | Structured sections and steps, validation, optimistic concurrency |
| Sprint 4 | Review comments, lifecycle commands, SoD, Effective-version invariant |
| Sprint 5 | Lead intake, duplicate control, assignment/qualification and Application |
| Sprint 6 | Application lifecycle, Offer approval/response and Enrollment confirmation |
| Sprint 7 | Contract/Fee Plan setup, Handover checklist, tasks, dashboard and CI smoke test |

## User-facing scope

- Responsive operations dashboard with funnel, KPI cards, work queue, and
  campus context.
- Lead, Application, SOP, and Task workspaces with search and status badges.
- Lead creation form connected to the API with demo-data fallback when the API
  is unavailable.
- Seed baseline for three pilot SOPs, four leads, two applications, and three
  operational tasks.

## Quality gates

- ESLint and strict TypeScript checks.
- Domain state-machine unit tests.
- Production builds for web, API, worker, and shared packages.
- CI-managed PostgreSQL migration and seed execution.
- API smoke test covering health, context, dashboard, process, SOP,
  Application, and Lead creation.

## Exit-condition status

The P0 implementation is feature-complete as a local/staging candidate. The
formal Step 11 exit condition requires deployment to the selected staging
platform. Hosting, production IdP, secret manager, and object-storage providers
remain organization decisions; therefore deployment evidence must be recorded
before Step 12 UAT sign-off.

## Step 12 inputs

1. UAT scenarios by Admission Officer, Admission Manager, SOP Author,
   Reviewer, Approver, Finance, Academic, and Auditor.
2. Permission and campus-scope negative tests.
3. File upload malware-scan integration with the selected object store.
4. OIDC integration and session security tests.
5. Load, backup/restore, audit integrity, and vulnerability checks.
