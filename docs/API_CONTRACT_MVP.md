# API Contract — SOP OS MVP

Base path: `/api/v1`. All mutation commands use organization, campus, actor,
and correlation context resolved by the authentication adapter. The development
adapter accepts the `x-actor-id`, `x-organization-id`, and `x-campus-ids`
headers; it must not be enabled in production.

## Platform and operations

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Public process liveness; does not query dependencies |
| GET | `/health/ready` | Public readiness; returns 200 only when PostgreSQL is reachable, otherwise 503 |
| GET | `/context` | Current user, roles, scopes, and campuses |
| GET | `/dashboard/summary` | Operational KPI summary |
| GET | `/tasks` | Current actor's work queue; optional validated `status` filter |
| PATCH | `/tasks/{id}` | Change task status with strict body, actor scope and row-version guard |
| GET | `/audit-events` | Controlled audit search; optional `objectType` and UUID `objectId` filters |

## Process and SOP governance

| Method | Route | Purpose |
|---|---|---|
| GET | `/processes` | Process tree L0–L3 |
| GET | `/sops` | Search SOP Registry |
| POST | `/sops` | Create SOP identity and Draft v1 |
| GET | `/sops/{id}` | SOP, versions, sections, and structured steps |
| PUT | `/sops/versions/{versionId}/sections/{key}` | Upsert Draft section with concurrency guard |
| POST | `/sops/versions/{versionId}/steps` | Upsert structured SOP step |
| POST | `/sops/versions/{versionId}/comments` | Add immutable review comment |
| POST | `/sops/versions/{versionId}/transitions` | Submit, request changes, approve, schedule, or activate |

The version command enforces the lifecycle state machine, minimum completeness,
segregation of duties, and the one-Effective-version invariant. Effective,
Superseded, and Archived content cannot be edited.

## Lead-to-Enrollment

| Method | Route | Purpose |
|---|---|---|
| GET/POST | `/leads` | Search or create Lead with duplicate control |
| POST | `/leads/{id}/transitions` | Execute a Lead state command |
| POST | `/leads/{id}/applications` | Convert Qualified Lead into Application |
| GET | `/applications` | Operational Application queue; optional `status`, `q`, `page` (default 1), and `pageSize` (default 20, max 100) |
| POST | `/applications/{id}/transitions` | Execute Application state command |
| POST | `/applications/{id}/offers` | Create versioned Offer draft; 409 unless medical clearance is true |
| GET | `/medical/clearances/{applicationId}` | Read scoped medical clearance (HRI); requires `medical:read` |
| PUT | `/medical/clearances/{applicationId}` | Set scoped medical clearance; requires `medical:edit`; atomic audit/outbox |
| POST | `/applications/offers/{id}/transitions` | Approve, issue, accept, decline, or expire Offer |
| POST | `/applications/offers/{offerId}/discount-approval` | Decide discount request; requires `offer:approve-discount`; SoD enforced |
| POST | `/applications/offers/{id}/enrollment` | Confirm Enrollment from Accepted Offer |
| GET | `/applications/enrollments/list` | Enrollment readiness list |
| POST | `/applications/enrollments/{id}/finance-setup` | Create Contract and Fee Plan drafts |
| POST | `/applications/enrollments/{id}/handover/transitions` | Ready, submit, return, or accept Handover |

Offer draft lưu author actor. Khi chuyển sang `APPROVED`, API chặn chính author tự
approve và yêu cầu một actor khác thực hiện để giữ segregation of duties.

### Offer holding-seat expiry (Step 04)

SOP-ADM-003 / BR-ADM-004 → expire elapsed holding-seat deadlines → step-04
AC1–AC7 → `apps/worker/src/offer-expiry-runtime.test.ts` and config tests.
Business owner: Admission. Worker automatically transitions `ISSUED` offers with
`valid_until < now()` to `EXPIRED`, updates `updated_at`, and increments
`row_version` once. Future/null deadlines and all other statuses stay unchanged.
No HTTP request or user approval is involved: each expiry records SYSTEM audit
(`actor_id = NULL`, `offer.transition`) and `OfferExpired` outbox in the same
transaction. Metadata contains only identifiers/status/version, never offer terms
or child/contact data. Failed writes roll back the entire tick; the next poll retries.
`OFFER_EXPIRY_POLL_INTERVAL_MS` controls scheduling (default 2000 ms, minimum 250 ms);
the creator's persisted deadline controls the holding period, with no default days.
The job runs across organizations/campuses and preserves each offer's organization
on its events. Deployment assumes one worker instance; no advisory lock or real
multi-instance verification is included. No schema migration is needed; stopping
the worker stops future expiry, without undoing already committed transitions.

### Offer discount approval (Step 03)

SOP-ADM-003 / BR-ADM-003 → configured discount threshold and prior approval →
step-03 AC1–AC9 → `rule-config.test.ts`, `approval-requests.test.ts` and
`application.service.test.ts`. Business owner: Admission and the authorized discount
approver (permission `offer:approve-discount`). This is deliberately one approval
level; the SOP's three-level routing remains in P1-E06.

- Create Offer accepts `terms.discountPercent?: number`, finite and in [0, 100].
  Invalid types/ranges return 400. Omitted/zero discounts preserve the existing
  response and do not read configuration or create an approval request.
- Positive discounts require `admission.discount_threshold_percent` with a JSON
  number in [0, 100]. Missing or malformed configuration returns 409 without Offer
  or approval writes. No business default is supplied. Read only `valid_to IS NULL`,
  preferring the application's authorized campus, then the organization-wide row,
  as required by step-03 (no additional valid_from scheduling in this step).
- At or below threshold: normal DRAFT. Above threshold: DRAFT plus exactly one
  PENDING request and response fields `requiresApproval: true, approvalRequestId`.
  The request retains `{ discountPercent, thresholdPercent }` as decision evidence.
  Subsequent configuration changes do not rewrite this snapshot.
- POST `/applications/offers/{offerId}/discount-approval` body:
  `{ decision: 'APPROVED' | 'REJECTED'; reason?: string }`.
  Invalid UUID/body, unknown fields and non-string or oversized reason (>4000
  characters, a transport limit) return 400. Reason is optional for both decisions;
  it is retained only in the approval record, not copied to audit/outbox.
- Response: `{ id, status, rowVersion }` for the approval request; rowVersion is a
  bigint string. Missing permission returns 403 at the API and service. Missing or
  foreign organization/campus Offer returns 404. Requester self-decision, no pending
  request and repeated/competing decisions return 409. A discount approver does not
  need `application:transition`, `offer:transition` or `application:read` here.
- Discount approval does not transition the Offer. Its normal transition path and
  author/approver separation remain in force. PENDING or REJECTED discount requests
  block APPROVED (409); rejection is terminal and no resubmit is implemented.
- The service locks the scoped Offer before deciding, serializing decisions with
  Offer transitions. Platform lookup explicitly takes organizationId in addition
  to entityType/entityId: this extends the task's helper signature to enforce
  AGENTS.md §5 tenant scope. Campus authorization remains with the entity owner.
- Offer creation, approval creation (`approval.request` / `ApprovalRequested`) and
  Offer audit/outbox commit together. Decision update and `approval.decide` /
  `ApprovalDecided` also commit together. Audit stores state/version/IDs; outbox
  stores IDs and decision, without terms, discount values or free-text reason.
  HRI Offer terms and CON financial approval evidence remain scoped server-side;
  no new read/export/delete endpoint or retention policy is introduced.
- No migration or seed changes. Recovery rolls back the service change while
  retaining approval evidence; doing so removes the gate. Client idempotency keys
  and expected-row-version are not added: a decided request cannot be decided
  again, while repeated Offer creation retains the existing creation contract.
- Integration tests use real PostgreSQL, `test-db.ts`/`withRollback`, isolated
  schemas for service commits, negative scope/SoD tests, competing decisions and
  injected outbox failure to verify transaction rollback.

### Medical clearance (Step 02)

SOP-ADM-003 / BR-ADM-002 → clearance precondition before Offer creation →
step-02 AC1–AC5 → `medical.service.test.ts` and `application.service.test.ts`.
Business owner: Cán bộ Y tế for clearance; Admission consumes the precondition.
This implements the earlier Offer gate requested by step-02; the SOP also names
Enrollment and parental consent, which remain outside this step.

- PUT body: `{ cleared: boolean; allergyFlags?: string[]; specialHealthNeeds?: string }`.
  Unknown fields (including organization/campus/actor IDs) and invalid types return
  400. Application ID must be a UUID. Transport bounds: at most 100 allergy flags,
  each non-empty and at most 200 characters; special needs at most 4000 characters.
  These are input size limits, not medical policy.
- Optional fields omitted on update retain their existing values; `[]` / `""`
  explicitly clear their content. Initial omissions store `[]` / null.
- GET/PUT response: `{ id, applicationId, cleared, allergyFlags, specialHealthNeeds,
  clearedBy, clearedAt, rowVersion }`; timestamps serialize as ISO strings,
  rowVersion is a bigint string. GET returns null when an in-scope application has
  no clearance. Both return 404 for missing or out-of-org/campus applications.
- `clearedBy` and `clearedAt` record the actor/time when true; false resets them
  to null. The endpoint permission represents the authorized medical role.
- Each successful PUT writes one clearance (upsert), one `medical.clearance.set`
  audit (`MedicalClearance`) and one `MedicalClearanceSet` outbox event. Audit stores
  only before/after row versions; outbox carries IDs. Neither copies health details.
  No retention/deletion policy is invented; this endpoint never deletes evidence.
- Medical writes lock the application row, serializing with createOffer's existing
  lock. The Offer guard reads through MedicalService using its pool as specified;
  Admission does not expose health details or require `medical:read` for its check.
- PUT does not add a client idempotency key or expected-row-version contract in
  this step: repeated successful requests each produce audit/outbox evidence.
- No migration change. Recovery is a service rollback; retain the existing 0008
  table and evidence. Rolling back the Offer gate also removes this protection.

Integration tests require `DATABASE_URL` and migrations through 0008. They use
isolated disposable PostgreSQL schemas, real service transactions and separate
pool reads; the existing migration SQL is applied in each disposable schema,
including foreign keys, constraints and audit triggers.
The minimal `withRollback` helper rolls back its callback on the same client;
service COMMIT tests instead drop their dedicated schemas in finally blocks.
CI quality already migrates and seeds its Postgres service before `pnpm test`.

### Temporary pre-G1 Lead ingestion contract

Cho đến khi Gate G1 và data-use decision tương ứng được phê duyệt, `POST /leads`
chỉ nhận dữ liệu synthetic:

- `dataProvenance` bắt buộc bằng `synthetic`;
- `firstName` và `lastName` bắt đầu bằng `Synthetic-`;
- email, nếu có, dùng IANA example domain; phone, nếu có, dùng range `+000`;
- vi phạm policy trả HTTP `422` trước khi mở transaction hoặc ghi dữ liệu.

Không được bỏ guard bằng environment flag. Việc thay contract này phải là thay đổi
gated sau G1, có Privacy/Security approval và negative test cập nhật.

## Mutation guarantees

- The database transaction contains the business write, append-only audit event,
  and transactional outbox event.
- Invalid transitions return conflict responses and do not mutate state.
- Exception/close/reverse actions require a reason.
- Campus scope is enforced by the API, independent of UI visibility.
- Event payloads carry identifiers and state changes, not unnecessary HRI.
- Task status changes write the business update, audit event and outbox event in
  one transaction; stale `rowVersion` returns HTTP `409` and objects outside the
  actor's organization/assignment scope return `404`.
