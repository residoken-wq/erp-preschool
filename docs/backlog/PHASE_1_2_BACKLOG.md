# Delivery Backlog — Phase 1 và Phase 2

## Definition of Ready

Một story chỉ vào sprint khi có canonical SOP/use case và owner role; BR/FR/AC/Test
IDs; data class và tenant/campus scope; permission/SoD; state transition; audit/
outbox/idempotency; failure/rollback; config/decision dependency; UX/accessibility;
estimate và test approach. `OPEN` critical decision làm story blocked, không được
thay bằng giả định.

## Phase 1 — Secure Platform Foundation

| Epic | Vertical deliverable | Acceptance chính | Dependency | Sprint |
|---|---|---|---|---:|
| P1-E01 Identity | OIDC adapter, claim mapping, disabled-user check, production startup guard | forged/dev actor bị từ chối ngoài local/test; token invalid/expired/disabled có stable error | DEC-004 | S3 |
| P1-E02 Authorization | policy action+org+campus+domain+class, deny default, SoD primitive | API negative tests chặn cross-org/campus/missing permission; object ngoài scope không leak | DEC-001/002 | S3 |
| P1-E03 Tenant DB | tenant composite FK/unique, scoped repository, RLS decision/spike | DB ngăn cross-org reference; service scope vẫn test khi có/không RLS | DEC-009 | S4 |
| P1-E04 API boundary | DTO/schema, unknown-field reject, pagination, stable errors, correlation, ETag | 400/401/403/404/409/422 contract; không lộ HRI/stack; list có upper bound | — | S4 |
| P1-E05 Command runtime | idempotency, optimistic concurrency, atomic mutation+audit+outbox | retry trả cùng outcome; conflict 409; rollback không để orphan audit/outbox | — | S4 |
| P1-E06 Approval | versioned definition/instance/action, delegation, escalation, SoD | author không tự approve khi policy cấm; decision audit append-only | DEC-011 | S5 |
| P1-E07 Rule config | scoped/versioned/effective rule, snapshot, approval | missing/conflicting sensitive rule fail closed; before/after audit | DEC-011 | S5 |
| P1-E08 Traceability | BR/FR/AC/Test entities và versioned TraceLink | truy từ SOP step đến release evidence; link không mất khi supersede | DEC-010 | S5 |
| P1-E09 Secure docs | quarantine, scan adapter, random key, signed access, export permission | file pending/infected/outside scope không tải được; upload bounds/scan/audit | DEC-006 | S6 |
| P1-E10 Async integration | delivery attempt, retry class, DLQ, reconciliation, provider adapter | provider lỗi không rollback business commit; không processed trước thành công | DEC-015 | S6 |
| P1-E11 Observability/recovery | redaction, health/readiness, security event, restore rehearsal | không PII/HRI/token trong telemetry; restore evidence đáp ứng policy đã duyệt | DEC-005/008 | S7 |
| P1-E12 Test platform | integration/contract/E2E/accessibility/security suites | deterministic synthetic data; platform critical suites chạy trong CI | DEC-003 | S7 |

### Security mitigation backlog từ threat model

| Threat | Priority | Epic xử lý chính | Gate evidence bắt buộc |
|---|---|---|---|
| TM-001 Dev-auth exposure | critical | P1-E01, P1-E12 | Internet-like negative test; production image không chứa dev actor path; startup fail-safe |
| TM-004 Workflow/SoD/checklist bypass | critical | P1-E06, P2-E07–E10 | server-owned mandatory checklist; self-approval/direct API negative E2E |
| TM-002 Tenant/authorization | high | P1-E02, P1-E03 | API + DB cross-org/campus/domain/class negative suite |
| TM-003 HRI overexposure | high | P1-E02, P1-E09 | role/use-case DTO, masking/export permission và HRI access audit tests |
| TM-005 Input/DoS | high | P1-E04, P1-E12 | unknown/oversized/deep/high-rate request rejection; load budget |
| TM-006 Hybrid boundary | high | P1-E01, P1-E09, P1-E11 | DEC-021, TLS/mTLS/network/secret evidence và public-port scan |
| TM-008 Financial integrity | high | P1-E05–E07, P2-E08/09 | decimal/currency ADR, idempotency, approval/SoD và reconciliation tests |
| TM-009 Supply chain | high | P1-E11/12 | pinned digest strategy, SCA/SBOM/secret/container scan và signed artifact decision |
| TM-007 Outbox/provider | medium | P1-E10 | schema, provider receipt, retry/DLQ/reconciliation tests |
| TM-010 Secure upload | medium pre-enable | P1-E09 | quarantine/scan/hash/signed ACL and malicious-file suite before endpoint enable |
| TM-011 AI/RAG/tool | medium pre-AI | AI-0 backlog | gateway, ACL-before-retrieval, eval/kill switch before any AI use case |

TM-001 và TM-004 là release blocker. Mọi threat `high` phải được mitigated hoặc có
risk acceptance đúng thẩm quyền trước G1/G2; không chỉ đóng ticket bằng tài liệu.

## Phase 2 — SOP OS & Admission Pilot

| Epic | Vertical deliverable | Acceptance chính | Dependency | Sprint |
|---|---|---|---|---:|
| P2-E01 SOP Registry | import 28 Proposed SOP, lineage, dedupe/reconciliation | 28 canonical ID duy nhất; source hash/version; không tự Effective | DEC-010 | S8 |
| P2-E02 SOP Studio | structured section/step/RACI, draft, autosave, preview | schema validation, row-version conflict, accessible editing, no lost update | P1-E04 | S8 |
| P2-E03 SOP Lifecycle | review/comment/rework/approve/schedule/effective/supersede | author/approver SoD; Effective immutable; audit+outbox; correct time scope | P1-E06/07 | S9 |
| P2-E04 SOP Retrieval | scoped search/export/citation | chỉ Effective đúng scope; ACL trước snippet; bounded export và audit | P1-E02/09 | S9 |
| P2-E05 Lead/Tour | intake, duplicate review, interaction, assignment, tour/tasks | consent/purpose fields; deterministic dedupe recommendation; campus scope | SOP-CRM-001 | S10 |
| P2-E06 Application | guardian/child application, consent, checklist, documents | minimization, HRI scope/export, secure document state, concurrency | SOP-ADM-001 | S11 |
| P2-E07 Assessment | schedule/result/finalize/revise và decision | finalized revision trace; AI không tự decide; direct API negative tests | SOP-ADM-002 | S11 |
| P2-E08 Offer | version/approval/expiry/response | approved config snapshot; expiry by campus timezone; SoD/idempotency | SOP-ADM-003 | S12 |
| P2-E09 Enrollment/Handover | blocker check, confirm, contract/fee draft, handover/rework | no confirmation when blocker; finance mutation remains draft; full audit/outbox | SOP-ADM-004 | S12 |
| P2-E10 Pilot readiness | UAT, training, support, recovery/rollback, KPI baseline | P0 UAT pass; no Sev-1/2; named support and Go/No-Go signatures | DEC-001/002 | S12 |

## Cảnh báo sequencing — cập nhật 15/09/2026

Đánh giá code hiện tại (`docs/CODEX_EXECUTION_PLAN.md`) cho thấy phần lớn
P2-E05 đến P2-E09 (Lead, Application, Offer, Enrollment, Finance setup,
Handover) đã có code chạy được — bao gồm state transition, audit/outbox,
author/approver separation — trước khi bất kỳ epic Phase 1 nào (P1-E01 OIDC,
P1-E02 authorization ngoài permission cơ bản, P1-E03 tenant/RLS, P1-E06/E07
approval/rule engine, P1-E09 secure docs) được xây. Đây là vi phạm nguyên tắc
tổ chức delivery #3 trong `docs/IMPLEMENTATION_ROADMAP.md` ("Platform security
đi trước HRI và tài chính").

Hệ quả và ràng buộc bắt buộc cho đến khi P1 epic liên quan hoàn tất:

- Code Admission hiện tại chỉ được chạy với `AUTH_MODE=development` và dữ liệu
  synthetic (guard DEC-020); không bật cho staging/production hoặc dữ liệu
  thật.
- `application_documents` và `assessments` là bảng chưa có code đọc/ghi; các
  state `DOCUMENT_REVIEW`/`INCOMPLETE`/`ASSESSMENT_PENDING`/`ASSESSED` trong
  `packages/domain/src/application-state-machine.ts` chỉ là label chuyển
  trạng thái, chưa có business logic — không coi P2-E06/P2-E07 là hoàn thành.
- Không mở rộng thêm phạm vi nghiệp vụ Admission (SOP-ADM-005/006/007 trở đi)
  cho đến khi P1-E01/E02/E03 hoặc risk acceptance đúng thẩm quyền được ghi
  nhận.
- Việc hardening/test hoá code Admission hiện có (thêm test, tách state
  machine dùng chung, wire CI) vẫn được phép và khuyến khích ngay — xem
  `docs/CODEX_EXECUTION_PLAN.md`.
- **Ngoại lệ có ghi nhận (15/09/2026):** Repository Owner đã yêu cầu và xác nhận một
  **Demo Track** riêng (`docs/CODEX_FULL_DEMO_PLAN.md`) được phép mở rộng phạm vi
  nghiệp vụ ra toàn bộ 28 canonical SOP cho mục đích trình diễn sản phẩm, với các nới
  lỏng liệt kê rõ trong file đó (mock provider, không OIDC/RLS thật, approval/rule-config
  đơn giản hóa). Ngoại lệ này KHÔNG làm thay đổi Gate G0, KHÔNG cho phép dữ liệu thật,
  và code Demo Track phải gắn nhãn DEMO/MOCK để không bị hiểu nhầm là production-ready.

## Definition of Done bổ sung

Ngoài `AGENTS.md`, mỗi epic phải cập nhật contract, migration, seed synthetic,
traceability, runbook và evidence. P0 workflow cần E2E happy/rework/negative; HRI/
financial mutation cần scope, SoD, audit/outbox và recovery tests.
