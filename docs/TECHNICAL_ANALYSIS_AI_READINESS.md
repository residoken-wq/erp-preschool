# Phân tích kỹ thuật và lộ trình AI-readiness — ERP Preschool

Ngày phân tích: 30/08/2026
Phạm vi: toàn bộ `docs/`, gồm master SOP, gói phân tích MVP, release-candidate
source, migrations, ADR/runbook và release history.

Kế hoạch delivery chi tiết theo sprint và gate được duy trì tại
`docs/IMPLEMENTATION_ROADMAP.md`.

## 1. Kết luận điều hành

Dự án có nền tảng phân tích tốt: chuỗi truy vết `Business -> Process -> People ->
Data -> Control -> ERP -> Automation -> KPI -> Audit`, mô hình modular monolith,
explicit state machine, transactional outbox, multi-campus scope và phân loại dữ
liệu bốn cấp. Release candidate chứng minh được vertical slice SOP Governance và
Lead-to-Enrollment.

Tuy nhiên, chưa nên xem source hiện tại là Full ERP hoặc production-ready. Việc
cần làm trước module mới là chuẩn hóa repository, khóa canonical decisions, hoàn
thiện identity/scope/security platform và dựng test harness. AI nên được thiết kế
ngay ở cấp architecture/audit nhưng chỉ đưa vào vận hành sau khi data governance,
eval và human-control đã sẵn sàng.

## 2. Inventory và source of truth

### 2.1 Thành phần tài liệu

- `ERP_PreSchoolSOP (1).md`: 25 SOP enterprise/75 domain, khoảng 15.000 dòng.
- `SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md`: mapping 28 canonical SOP và roadmap 3 phase.
- `01_Analysis_Documents`: charter, process architecture, canonical data model,
  UX/screen spec, backlog, technical architecture, design system, 10 SOP pilot và seed.
- `02_Release_Candidate_Source`: monorepo Next.js + NestJS + worker + PostgreSQL.
- `03_Release_History`: ba ZIP lịch sử; chỉ dùng đối chiếu, không phát triển.

### 2.2 Canonical scope

Master plan hợp nhất tạo 28 canonical SOP:

- 7 SOP CRM/Admission chi tiết ở document layer.
- 21 SOP còn lại của 75 domain.
- Data/API vẫn giữ aggregate nhỏ như Lead, Application, Offer, Enrollment,
  Contract/Fee và Handover. Không ép một SOP lớn thành một bảng hoặc service lớn.

Thẻ 9 và 10 lặp `SOP-CRM-001`; import một bản. Các “Thẻ 3/4/7” dùng Markdown đã
escape nên parser heading thông thường có thể bỏ sót `SOP-SIS-001`, `SOP-FIN-001`
và `SOP-BUS-001`; import pipeline phải normalize format trước khi parse.

## 3. Kiến trúc hiện tại

### 3.1 Điểm phù hợp để giữ

- Modular monolith phù hợp giai đoạn đầu và giảm distributed transaction.
- TypeScript end-to-end, contracts và pure domain package là hướng đúng.
- PostgreSQL phù hợp transaction, constraint, JSONB có kiểm soát và FTS MVP.
- Explicit state machine phù hợp workflow an toàn/phê duyệt.
- Audit + outbox trong transaction là baseline đúng.
- Worker có `FOR UPDATE SKIP LOCKED`, retry/backoff/dead-letter skeleton.
- UUID, `organization_id`, campus scope và `row_version` đã xuất hiện trong schema.
- CI đã có lint, strict typecheck, unit test, build, migration, seed và smoke.

### 3.2 Khoảng cách giữa spec và source

| Khu vực | Spec yêu cầu | Source hiện tại | Kết luận |
|---|---|---|---|
| Identity | OIDC/SSO, role scope | Development actor từ header; OIDC config chưa có auth middleware | Blocker production số 1 |
| Tenant/campus | Scope ở mọi query + test/RLS spike | Một số list có filter; dashboard/list khác chỉ lọc organization | Có nguy cơ lộ cross-campus |
| RBAC | action + campus + domain + classification, deny-by-default | Permission string đơn giản; wildcard dev; chưa có field policy | Chưa đủ cho HRI |
| Data model | Standard creator/updater/archive/retention, nhiều entity canonical | Schema mới là subset, nhiều cột/entity còn thiếu | Cần migration theo module, không “0006 khổng lồ” |
| Approval | Definition/instance/action, SoD, threshold config | SOP transition và checks cục bộ | Chưa có approval engine dùng chung |
| Traceability | BR -> FR -> AC -> Test | Chưa có table/API đầy đủ | Bắt buộc trước mở rộng lớn |
| File | quarantine, malware scan, signed access | Mới có metadata/scan status | Chưa có secure upload flow |
| Integrations | Payment/e-sign/Zalo/SMS/storage | Chưa chọn vendor/adapter | Quyết định business + architecture còn mở |
| Worker | Delivery thật, idempotent consumer | `dispatch` chỉ log rồi đánh dấu processed | Skeleton, không phải integration |
| AI | Draft/classify/anomaly/forecast có governance | Chỉ có enum/ý tưởng trong SOP | Chưa có AI platform/eval/audit |
| Test | Unit/integration/contract/E2E/security/recovery | 11 unit + smoke baseline | Chưa đủ cho safety-critical ERP |

### 3.3 Chênh lệch data/technical cần giải quyết

- Data dictionary yêu cầu `created_by`, `updated_by`, `archived_at` cho entity nghiệp
  vụ; nhiều bảng migration chưa có.
- Data dictionary đề xuất tiền `numeric(19,4)`; schema dùng `numeric(18,2)`. Phải có
  ADR, không sửa rải rác.
- Canonical enum có `VIEWED`, `PENDING_CONTRACT`, `PENDING_FINANCIAL_CONDITION`;
  schema dùng tập trạng thái khác.
- Unique index Effective hiện là một version cho toàn SOP, chưa biểu diễn phạm vi
  campus/time range như spec.
- Tenant-scoped foreign key hiện phần lớn chỉ reference `id`, chưa chặn ở DB việc
  tham chiếu object của organization khác.
- `organization_id` có nhưng chưa có RLS; service-layer scope chưa đồng đều.
- Contact của `persons` được đưa trực tiếp vào bảng trong migration 0004, khác mô
  hình `PersonContact`/Guardian/ProspectStudent canonical.
- Hash-chain audit chưa bao gồm toàn bộ security context và không tương đương digital
  signature hoặc WORM storage. Cần restricted DB role, verification độc lập và
  evidence export nếu dùng cho pháp lý.
- Migration runner baseline từng apply SQL rồi mới ghi `schema_migrations`. Runner
  hiện quản lý transaction bao trùm DDL + registry, dùng advisory lock chống chạy
  song song và checksum fail-closed khi migration đã apply bị sửa hoặc biến mất.
- OIDC mode có validation env nhưng chưa tạo actor; bật mode này làm API không dùng
  được thay vì thực hiện login/token validation.
- Config schema chưa quản lý hết object-storage variables có trong `.env.example`.

## 4. Mâu thuẫn và rủi ro trong master SOP

Master SOP có nhiều giá trị cụ thể như 09:00, 15%, 5 ngày, 500 m, 50 km/h, nhiệt
độ, retention 365 ngày, tỷ lệ giáo viên/trẻ và SLA vài giây. Nhiều giá trị được mô
tả là “cấu hình cứng”, trong khi nguyên tắc tổng thể yêu cầu không hardcode và cần
đối chiếu quy định hiện hành.

Cách xử lý kỹ thuật:

1. Mỗi rule có stable ID, version, source, status `PROPOSED/VERIFIED/APPROVED/RETIRED`.
2. Parameter tách khỏi code, có scope organization/campus/program/age group,
   `valid_from/valid_to`, timezone và approval history.
3. UI hiển thị nguồn, phiên bản và cảnh báo “chưa xác minh” cho rule pháp lý.
4. Rule engine lấy snapshot parameter khi tạo transaction để lịch sử không thay đổi
   khi config tương lai đổi.
5. Test sinh từ BR/AC dùng fixture theo config; không đóng đinh con số ví dụ.

Các tuyên bố “100%”, “zero risk” hoặc “triệt tiêu hoàn toàn gian lận” phải đổi thành
control objective và metric đo được. Không có control kỹ thuật nào loại bỏ tuyệt đối
rủi ro con người, thiết bị, offline hoặc insider.

## 5. Target architecture đề xuất

```text
Web / role-specific apps / future mobile
              |
       API + OIDC + policy enforcement
              |
  -------------------------------------------------
  | SOP | CRM/ADM | SIS/Safety | MED | FIN | ...  |
  -------------------------------------------------
       | domain commands + state machines |
       | audit + outbox in one transaction|
       ------------------------------------
              | PostgreSQL + object storage
              |
         Worker / scheduler / integration adapters
              |
 payment | e-sign | messaging | storage scan | AI gateway
```

Giữ một deployable modular monolith ban đầu, nhưng boundary phải đủ rõ để tách worker,
AI workloads hoặc high-volume telemetry sau này. GPS/IoT/biometric stream không nên
nhét thẳng vào transaction tables; dùng ingestion boundary và projection riêng khi
khối lượng thực tế chứng minh nhu cầu.

## 6. Nền tảng AI cho vận hành

### 6.1 Thứ tự use case

| Wave | Use case | Risk | Cách vận hành ban đầu |
|---|---|---:|---|
| AI-0 | Draft/tóm tắt SOP, tìm SOP Effective có citation | Thấp-vừa | Assistive, không publish |
| AI-0 | OCR/extract hồ sơ vào staging | Vừa | Human verify từng field |
| AI-0 | Phát hiện SOP/rule trùng hoặc thiếu actor/control/test | Thấp | Recommendation |
| AI-1 | Phân loại ticket/khiếu nại, gợi ý route/severity | Vừa-cao | Shadow mode, CSKH xác nhận |
| AI-1 | Lead dedupe/next-best-action | Vừa | Gợi ý, không tự merge/close |
| AI-1 | Tóm tắt incident/audit cho reviewer | Cao | HRI-redacted, reviewer kiểm tra source |
| AI-2 | Anomaly detection export/unmask/payment changes | Cao | Alert; deterministic rule vẫn là hard control |
| AI-2 | Forecast enrollment/cash/kitchen/procurement | Cao | Scenario planning; owner phê duyệt action |
| Không cho phép | Pickup, medication, diagnosis, payment confirmation, discipline, crisis statement, SOP publish | Critical | Deterministic control + authorized human |

### 6.2 AI bounded context

Tạo module/gateway riêng với các object tối thiểu:

- `ai_use_cases`: owner, purpose, risk tier, allowed data, reviewer, kill switch.
- `ai_model_registry`: provider/model alias, region, approved capability, lifecycle.
- `ai_prompt_versions`: immutable template/tool schema/retrieval policy hash.
- `ai_runs`: correlation, source IDs, versions, status, confidence, cost/latency,
  output hash và reviewer outcome.
- `ai_feedback`: accept/edit/reject reason, không lưu HRI thừa.
- `ai_eval_sets`, `ai_eval_cases`, `ai_eval_runs`: golden/adversarial/regression.
- `ai_redaction_policies`: field-level allow/deny/tokenization.

Domain module gửi typed task tới AI gateway. AI trả structured recommendation;
domain re-validates và người dùng quyết định. Model không được ghi trực tiếp vào
domain tables.

### 6.3 RAG và knowledge governance

- Chỉ index SOP/version Approved hoặc Effective; Draft cần index riêng cho author.
- Chunk mang `organization_id`, campus/domain scope, classification, document/version
  và effective time.
- Authorization chạy trước retrieval và trước trả citation/snippet.
- HRI không vào general vector store. Nếu use case thật sự cần, dùng collection tách,
  encryption/key boundary và need-to-know policy.
- Output phải cite stable SOP/rule version. Không có nguồn thì trả “không đủ dữ liệu”.
- Tài liệu retrieved là dữ liệu không đáng tin, không phải instruction; strip/neutralize
  prompt injection và không cho nó cấp thêm tool permission.

### 6.4 Evals và release gate

Mỗi use case phải có:

1. Dataset synthetic/de-identified và edge cases tiếng Việt.
2. Metric phù hợp: grounding/citation, extraction accuracy, precision/recall, false
   negative, calibration, human acceptance, latency và cost.
3. Adversarial tests: prompt injection, data exfiltration, cross-campus retrieval,
   ambiguous child names, OCR lỗi, stale SOP và malicious attachment.
4. Baseline không-AI để chứng minh AI tạo giá trị.
5. Shadow run và review mẫu trước rollout.
6. Canary, monitoring, threshold rollback và kill switch.
7. Re-eval bắt buộc khi đổi model, prompt, tool, retrieval hoặc source corpus.

## 7. Lộ trình kỹ thuật theo gate

### Gate 0 — Repository và governance foundation

1. **Đã thực hiện Phase 0 ngày 30/08/2026:** promote
   `02_Release_Candidate_Source` ra application root bằng change riêng; inventory/
   checksum 90/90 file khớp và giữ archive/docs read-only. Xem
   `governance/SOURCE_PROMOTION_MANIFEST.md`.
2. Khởi tạo git history/branch protection/owners; CI dùng frozen lockfile.
3. Chốt Product Owner, Security/Data Owner, pilot campus và canonical 28 SOP.
4. Lập Decision Register cho IdP, hosting, DB, storage/scan, payment, e-sign,
   messaging, observability, RPO/RTO, RLS và precision tiền.
5. Import SOP qua parser có normalization/dedup, trạng thái Draft/Proposed; không
   import thẳng Effective.

Exit: source canonical duy nhất, CI chạy được, ADR/owner/blocker có danh tính.

### Gate 1 — Platform security và engineering baseline

1. OIDC/MFA integration; bỏ development actor khỏi staging/production path.
2. Policy enforcement theo organization/campus/domain/classification; negative tests.
3. Chốt RLS defense-in-depth và DB roles least privilege.
4. DTO/schema validation, body limits, stable error code, idempotency framework.
5. Transaction helper chuẩn audit/outbox; worker delivery semantics thật.
6. Secure file service: quarantine, scan, signed URL, export audit.
7. Traceability catalog BR/FR/AC/Test và approval engine có version/SoD.
8. Observability redaction, SCA/container/secret scan, backup/restore rehearsal.

Exit: không còn auth/scope/file/traceability blocker cho pilot.

### Gate 2 — Phase 1 vertical slices

Không làm migration `0006` chứa mọi domain. Chia theo vertical slice:

1. Admission canonical + guardian/consent/payment/e-sign readiness.
2. Safeguarding/SIS attendance + pickup authorization, offline/reconciliation.
3. Medical/allergy/medication với permission/audit HRI riêng.
4. Billing/AR/payment reconciliation và config fee/discount.
5. Academic curriculum/timetable/teacher assignment.

Mỗi slice giao schema + command/state + policy + audit/outbox + UI + E2E + runbook.
Safeguarding và medical làm sớm vì rủi ro, nhưng chỉ pilot sau hardware/offline and
emergency drill được xác nhận.

### Gate 3 — Phase 2/3 enterprise modules

- Phase 2: Kitchen, procurement, inventory, facility, bus, HR core, marketing.
- Phase 3: HR performance, finance planning, withdrawal/graduation/transfer,
  customer service, QA và governance/crisis.
- Shared master/config, approval, evidence, notification và BI projection phải tái
  sử dụng; không tạo workflow engine riêng cho từng module.

### Gate 4 — AI foundation và AI-0

1. Chốt AI provider/data-processing/region/retention decision và threat model.
2. Xây AI gateway, redaction, prompt/model registry, run audit và eval harness.
3. Triển khai SOP assistant + governed RAG và document extraction staging.
4. Chạy shadow/canary; human approval bắt buộc.

Exit: eval đạt threshold được owner duyệt, không cross-tenant/HRI leak, có kill switch.

### Gate 5 — AI-1/AI-2 vận hành

Chỉ mở complaint triage, anomaly detection và forecasting sau khi có dữ liệu sạch,
label feedback, baseline và quy trình xử lý alert. AI tạo recommendation/scenario;
mọi side effect vẫn đi qua command, permission, deterministic guard và approval.

## 8. Quality gate bắt buộc

```text
lint -> typecheck -> unit -> integration -> migration -> contract
     -> permission/security -> Playwright E2E -> build -> smoke
     -> backup/restore (release gate)
     -> AI eval/adversarial/canary (khi có AI)
```

CI hiện tại là baseline nhưng cần thêm integration DB, cross-campus negative suite,
Playwright, accessibility, SCA/container/secret scan và migration-from-previous test.
CI và Docker build dùng `pnpm install --frozen-lockfile` sau source promotion;
lockfile phải được xác minh bằng clean install trong Gate G0.

## 9. Skills đã cài và khuyến nghị dùng

Đã cài từ curated OpenAI skills:

- `security-best-practices`: review implementation có dữ liệu nhạy cảm.
- `security-threat-model`: threat model theo module/integration/AI use case.
- `playwright`: E2E và browser verification cho workflow critical.

System skills đã có, không cài lại:

- `openai-docs`: khi chọn/triển khai OpenAI API, model, agent, eval hoặc data control.
- `skill-creator`: khi quy trình dự án đã ổn định và cần đóng gói thành project skill.

Chưa nên cài Sentry/deploy/Figma skills cho đến khi chốt observability, hosting và
design workflow. Skill không thay thế dependency/runtime hoặc quyết định vendor.

## 10. Quyết định cần Ban điều hành chốt

1. Pilot campus, Product Owner, Process Owner, Security Owner và Data Protection owner.
2. Source promotion và repository strategy.
3. Identity provider và MFA/session policy.
4. Hosting/region, PostgreSQL, object storage, malware scan, secret/KMS.
5. Payment/VietQR/virtual account, e-sign và messaging provider.
6. RPO/RTO, retention, biometric/consent và legal review scope.
7. Rule parameters thực tế: fee/discount/time/SLA/ratio/temperature/approval.
8. AI provider, allowed data classes, training/retention terms và use-case risk owner.
9. Mobile/offline/hardware scope cho gate, bus, kitchen và medical.
10. Rollout order: SOP OS pilot trước hay Full ERP Phase 1 song song.

Không có các quyết định trên, engineering vẫn có thể dựng interface, test harness và
synthetic prototype, nhưng không nên giả lập chúng thành production policy.
