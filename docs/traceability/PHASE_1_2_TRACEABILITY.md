# Traceability Baseline — Phase 1 và Phase 2

Đây là planning baseline, không tự biến business rule thành approved policy.
`PROPOSED` phải được domain owner review trước implementation acceptance.

| Trace ID | SOP/Use case | BR | FR | Acceptance criteria | Planned tests | Status |
|---|---|---|---|---|---|---|
| TR-P1-001 | Platform identity | actor chỉ đến từ trusted identity | verify token/claims/disabled user; prod guard | dev headers/wildcards không hoạt động ngoài local/test | contract auth invalid/expired; startup negative | PROPOSED |
| TR-P1-002 | Tenant scope | actor chỉ truy cập org/campus được cấp | server-side policy + tenant-safe FK | cross-org/campus read/write bị chặn, object ngoài scope không leak | API + DB integration negative | PROPOSED |
| TR-P1-003 | Command integrity | retry không nhân đôi mutation | idempotency + row version + transaction | cùng key/same payload cùng outcome; payload khác conflict | integration concurrency/retry/rollback | PROPOSED |
| TR-P1-004 | Approval/SoD | sensitive action cần đúng approver | versioned approval engine | requester không self-approve khi policy cấm | unit policy + direct API integration | PROPOSED |
| TR-P1-005 | Rule configuration | rule thay đổi phải scoped/versioned/approved | effective resolver + snapshot | không dùng example/default production; conflict fail closed | unit time/scope + audit integration | PROPOSED |
| TR-P1-006 | Secure document | chỉ file clean, authorized mới tải | quarantine/scan/signed URL adapter | wrong type/size, infected, expired/outscope bị chặn | upload/download/security tests | PROPOSED |
| TR-P1-007 | Reliable integration | provider failure không mất business event | transactional outbox + attempt/DLQ/reconcile | commit độc lập delivery; processed chỉ sau success | worker retry/DLQ/recovery tests | PROPOSED |
| TR-P2-001 | SOP Governance | SOP-REG-BR-01 | import Proposed với lineage/dedupe | đúng 28 canonical ID; reconciliation; không auto Effective | import integration + count/hash test | PROPOSED |
| TR-P2-002 | SOP Governance | SOP-LIFE-BR-01 | draft/review/rework/approve/effective/supersede | transition có permission/SoD; Effective immutable | state unit + API/E2E paths | PROPOSED |
| TR-P2-003 | SOP Governance | SOP-RET-BR-01 | scoped search/export/citation | chỉ Effective đúng scope/time; export permission/audit | query scope + export negative + citation | PROPOSED |
| TR-P2-004 | SOP-CRM-001 | CRM-BR-01 | lead intake/dedupe/assign/tour | dedupe chỉ gợi ý có review; campus scope; consent captured | domain + API + E2E lead/tour | PROPOSED |
| TR-P2-005 | SOP-ADM-001 | ADM1-BR-01 | application/guardian/checklist/docs | minimization; HRI protected; checklist prerequisites | domain + doc + cross-campus E2E | PROPOSED |
| TR-P2-006 | SOP-ADM-002 | ADM2-BR-01 | assessment schedule/result/finalize/revise | revision traceable; human authority decides | state + permission + E2E rework | PROPOSED |
| TR-P2-007 | SOP-ADM-003 | ADM3-BR-01 | offer version/approve/expire/respond | approved config snapshot; campus timezone; idempotent response | time boundary + SoD + retry E2E | PROPOSED |
| TR-P2-008 | SOP-ADM-004 | ADM4-BR-01 | blocker/enroll/fee draft/handover | blocker prevents confirm; no unapproved payment; audit/outbox atomic | blocker + finance/SoD + handover E2E | PROPOSED |

## Quy tắc cập nhật

Khi refine story, tách AC/Test ID riêng và liên kết tới test executable, migration,
API contract, PR và release. Thay đổi SOP/rule version không ghi đè link cũ; tạo
version/link mới để giữ evidence lịch sử.

