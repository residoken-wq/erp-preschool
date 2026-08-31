# API Contract — SOP OS MVP

Base path: `/api/v1`. All mutation commands use organization, campus, actor,
and correlation context resolved by the authentication adapter. The development
adapter accepts the `x-actor-id`, `x-organization-id`, and `x-campus-ids`
headers; it must not be enabled in production.

## Platform and operations

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Service and database health |
| GET | `/context` | Current user, roles, scopes, and campuses |
| GET | `/dashboard/summary` | Operational KPI summary |
| GET | `/tasks` | Current actor's work queue |
| PATCH | `/tasks/{id}` | Complete or change a task with row-version guard |
| GET | `/audit-events` | Controlled audit search |

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
| GET | `/applications` | Operational Application queue |
| POST | `/applications/{id}/transitions` | Execute Application state command |
| POST | `/applications/{id}/offers` | Create versioned Offer draft |
| POST | `/applications/offers/{id}/transitions` | Approve, issue, accept, decline, or expire Offer |
| POST | `/applications/offers/{id}/enrollment` | Confirm Enrollment from Accepted Offer |
| GET | `/applications/enrollments/list` | Enrollment readiness list |
| POST | `/applications/enrollments/{id}/finance-setup` | Create Contract and Fee Plan drafts |
| POST | `/applications/enrollments/{id}/handover/transitions` | Ready, submit, return, or accept Handover |

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
