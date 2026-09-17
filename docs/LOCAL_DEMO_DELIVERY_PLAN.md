# ERP Preschool — Local Demo Delivery Plan

| Thuộc tính | Giá trị |
|---|---|
| Trạng thái | D0–D4 local demo đã triển khai và kiểm chứng; không phải production approval |
| Ngày rà soát | 05/09/2026 |
| Phạm vi | SOP OS + Lead-to-Enrollment trên một máy local |
| Dữ liệu | Chỉ synthetic theo DEC-020 |
| Kế thừa | `IMPLEMENTATION_ROADMAP.md`, `PHASE_1_2_BACKLOG.md`, `AGENTS.md` |

## 1. Kết luận điều hành

Local demo vertical slice đã được triển khai trên stack Docker Web/API/Worker/
PostgreSQL. Người trình bày có thể thao tác chuỗi Lead -> Application -> Offer ->
Enrollment -> Finance Setup -> Handover và workspace SOP trên UI, đổi persona/campus,
xem audit evidence, dùng dark mode/mobile và reset về canonical synthetic seed.

Phạm vi vẫn cố ý dừng tại demo local. Không mở thêm SIS, billing, medical, kitchen,
HR, provider thật hoặc AI trước khi có phản hồi demo và kích hoạt productization gate.

Local demo track không tuyên bố Gate G0/G1/G2 đã đạt và không thay thế roadmap
production. Governance được chia thành hai nhóm:

1. Guardrail tối thiểu luôn áp dụng trong lúc làm demo local.
2. Productization gate chỉ kích hoạt khi chuẩn bị đưa ứng dụng ra môi trường dùng
   chung, mở truy cập qua mạng/tunnel, pilot với người dùng thật hoặc nhập dữ liệu thật.

## 2. Baseline khi rà soát và trạng thái xử lý

### 2.1 Điểm có thể tái sử dụng ngay

- Monorepo TypeScript modular monolith với Next.js, NestJS, PostgreSQL và worker.
- Development actor, permission guard, organization/campus scope và production guard.
- Domain state machine cho Lead, Application và SOP.
- Mutation quan trọng có transaction, audit và outbox; task update có row version.
- API command đã có cho Lead-to-Handover và SOP Draft-to-Effective.
- Dashboard, Lead list/create, Application list, SOP list và task board responsive.
- Synthetic seed/data guard, migration checksum, health/readiness và local lifecycle script.

### 2.2 Gap ảnh hưởng trực tiếp đến buổi demo

| Mức ban đầu | Gap | Trạng thái 05/09/2026 |
|---|---|---|
| Blocker | Application, Offer, Enrollment, Handover và SOP chưa có UI thao tác | Đã xử lý bằng journey panel và SOP workspace |
| Blocker | Không có one-command reset cố định | Đã xử lý bằng guarded `local:demo:reset` và readiness invariant |
| High | Live Web silently dùng fallback khi API lỗi | Đã tách `live`/`static`; live hiển thị connection error |
| High | Actor/campus hardcode, chưa có persona switch | Đã dùng `/context`, persona và campus switch dev-only |
| High | Danh sách thiếu drill-down/next action | Đã có deep link, detail workspace và next command |
| High | Chưa có test journey khách hàng | Đã có API golden journey smoke và Web state tests |
| Medium | Dark/mobile/filter/timezone chưa đồng nhất | Đã triển khai và browser-check ở desktop/mobile/dark |
| Low | Thiếu favicon | Đã thêm app icon SVG |

### 2.3 Những gì chưa được xem là product-ready

- Gate G0 vẫn `NOT READY FOR PASS`; threat/privacy review và identity/hybrid decision còn mở.
- OIDC/MFA/account lifecycle chưa được tích hợp; client header chỉ hợp lệ cho local dev.
- Tenant-safe composite constraints/RLS, approval engine và versioned rule configuration
  chưa đạt backlog Phase 1.
- Upload quarantine/malware scan/signed download chưa được bật.
- Payment, e-sign, messaging và finance policy chưa có quyết định được duyệt.
- Integration/contract/E2E/security coverage chưa đủ cho HRI hoặc rollout thực tế.

## 3. Demo outcome mục tiêu

Trong 12–15 phút, người trình bày phải đi được một flow nhất quán:

1. Chọn campus và persona `Admission Officer`.
2. Xem dashboard và work queue theo đúng campus.
3. Tạo một Lead synthetic, ghi nhận tương tác và chuyển trạng thái đến Qualified.
4. Khởi tạo Application, xem checklist/tài liệu synthetic và hoàn tất assessment.
5. Chuyển sang `Admission Manager`, duyệt/issue Offer để thể hiện SoD.
6. Ghi nhận Offer accepted, tạo Enrollment, Contract/Fee Plan ở trạng thái Draft.
7. Hoàn tất Handover checklist và thấy task/dashboard cập nhật.
8. Mở SOP Effective liên quan đến bước đang xử lý và xem audit timeline.

Một flow phụ trình diễn SOP Governance:

1. SOP Author chỉnh Draft và gửi review.
2. Reviewer comment/request revision.
3. Approver khác tác giả approve/effective.
4. Phiên bản Effective trở thành read-only và phiên bản cũ được supersede.

## 4. Thứ tự build đề xuất

### D0 — Demo reliability trước tính năng mới

Mục tiêu: mỗi lần demo bắt đầu từ cùng một trạng thái và lỗi kết nối không bị che.

- Thêm lệnh explicit `local:demo:reset` có confirmation/guard, reset database local
  rồi migrate + seed đúng một scenario.
- Tách `LIVE_LOCAL_DEMO` và `STATIC_PREVIEW`; live mode fail visibly khi API lỗi,
  không silently thay KPI bằng fallback.
- Bind service local vào loopback theo mặc định; không mở PostgreSQL/MinIO/API ra LAN.
- Thêm demo readiness check: service health, seed version, actor/campus, outbox backlog.
- Tạo demo runbook và checklist 5 phút trước buổi trình bày.

**Exit:** reset hai lần cho cùng KPI/record; live mode xác nhận API connected; không có
smoke artifact; demo script chạy lại được từ đầu.

### D1 — Application shell và context thật

Mục tiêu: tạo cảm giác đây là một hệ thống vận hành, không phải các bảng rời.

- Chuẩn hóa shell/UI thành component dùng lại với Tailwind, dark mode và mobile.
- Dev-only persona switch lấy actor/campus từ `/context`; hiển thị banner `LOCAL DEMO`.
- Campus switch thực sự đổi server scope và refresh toàn bộ dashboard/list.
- Thêm router/deep link, loading/error/empty state và breadcrumb đúng entity.
- Hoàn thiện search/filter hiện có; format ngày theo timezone campus.

**Exit:** refresh/deep link không mất màn hình; persona/campus đổi dữ liệu thật từ API;
keyboard navigation và mobile viewport không chặn thao tác chính.

### D2 — Lead-to-Enrollment golden path

Mục tiêu: hoàn thành vertical slice bán hàng chính trước mọi module ERP khác.

1. Lead detail: profile synthetic tối thiểu, interaction timeline, task/tour và các
   transition hợp lệ.
2. Start Application từ Lead Qualified; Application detail có checklist, document
   metadata synthetic và blocker rõ ràng.
3. Assessment form tối thiểu với finalize/revision; quyết định luôn do persona có quyền.
4. Offer detail/version/approve/issue/accept; chứng minh author không tự approve.
5. Enrollment confirm, Contract/Fee Plan Draft và Handover checklist/rework.
6. Mỗi command refresh work queue, dashboard và audit timeline ngay trên UI.

Không tích hợp upload file, payment, e-sign hoặc messaging thật trong D2. Dùng adapter
stub/local receipt và nhãn rõ `SIMULATED` nếu cần minh họa kết quả.

**Exit:** một record đi từ Lead mới đến Handover bằng UI; invalid transition và
self-approval bị chặn; refresh không mất state; audit/outbox evidence tồn tại.

### D3 — SOP-to-Execution story

Mục tiêu: thể hiện khác biệt của SOP OS thay vì chỉ là CRM tuyển sinh.

- SOP detail có version, section, structured step, RACI và Effective badge.
- Draft editor, review comment và lifecycle actions theo persona.
- Link từ Application/Handover step đến SOP Effective đúng scope.
- Audit viewer theo entity/correlation; không hiển thị payload HRI.
- Dashboard thêm trạng thái SOP review và operational exception có thể drill down.

**Exit:** demo được Draft -> Review -> Approve -> Effective bằng hai persona; Effective
read-only; workflow record trỏ được về SOP/version ổn định.

### D4 — Demo hardening và rehearsal

Mục tiêu: đóng những lỗi làm hỏng buổi trình bày, không mở rộng domain.

- E2E cho hai golden paths, gồm happy path, rework, permission denial và reconnect.
- Frontend component tests cho form/validation/state; accessibility smoke.
- Test desktop + mobile + dark mode; hoàn thiện vi-VN copy, favicon và branding.
- Seed nhiều trạng thái đủ đẹp cho dashboard nhưng vẫn deterministic.
- Rehearsal từ clean/reset, đo thời gian, ghi known limitations và fallback procedure.

**Exit:** hai lần rehearsal liên tiếp pass; không Sev-1/Sev-2 demo defect; `data:guard`,
lint, typecheck, unit, E2E, build, compose config và local smoke đều pass.

## 5. Backlog sau demo — chưa build ngay

Chỉ kéo các hạng mục sau vào kế hoạch khi golden path D0–D4 đã đạt:

- SIS/student profile, attendance, authorized pickup và safeguarding.
- Medical/allergy/medication, billing/payment/refund và accounting integration.
- Academic, kitchen, bus/logistics, HR, procurement, asset/facility.
- Production document upload, messaging, e-sign và payment provider.
- AI assistant, RAG, OCR hoặc prediction.

Thứ tự product sau demo vẫn ưu tiên child safety, privacy, financial integrity và
traceability theo `IMPLEMENTATION_ROADMAP.md`; phản hồi khách hàng chỉ dùng để refine
backlog, không tự biến một rule ví dụ thành production policy.

## 6. Governance tách theo thời điểm

### 6.1 Guardrail không được defer trong local demo

- Chỉ dùng synthetic seed/contacts reserved; không nhập dữ liệu trẻ/phụ huynh thật.
- Chỉ chạy trên loopback hoặc screen-share; không public tunnel/LAN sharing.
- Development auth phải có banner rõ và production startup guard vẫn bắt buộc.
- Giữ organization/campus scope, permission, SoD, validation, audit và outbox.
- Không bật side effect thật: email/SMS/payment/e-sign/upload/AI/provider.
- Không mô tả demo là production-ready, legally compliant hoặc đã đạt G0/G1/G2.
- Mọi mutation demo có reset/recovery; không dùng smoke test trên dataset sắp trình bày.

### 6.2 Trigger chuyển sang productization

Bắt đầu productization ngay khi có một trong các quyết định sau:

- deploy lên server/staging/shared environment;
- cho khách hàng truy cập trực tiếp qua LAN, VPN, tunnel hoặc Internet;
- pilot với user account thật;
- nhập dữ liệu thật hoặc tài liệu có HRI;
- kết nối provider có side effect hoặc credential thật.

### 6.3 Productization gates bắt buộc

| Gate | Việc phải hoàn tất trước khi qua gate |
|---|---|
| P-G0 Governance activation | Re-enable independent review/CODEOWNERS; NS-005 threat/privacy sign-off; NS-006 identity/hybrid decision; owner/decision register và roadmap re-baseline |
| P-G1 Secure platform | OIDC/MFA/session/account lifecycle; deny-default authorization; tenant-safe DB/RLS decision; idempotency/concurrency; approval/rule config; secrets/TLS/observability |
| P-G2 HRI & provider enablement | Data/retention/legal-hold decisions; secure upload + malware scan; vendor/privacy/legal approvals; payment/e-sign/messaging reconciliation; no real HRI before evidence |
| P-G3 Staging & UAT | Production-like staging; migration rehearsal; contract/E2E/negative security/accessibility/load/backup-restore scans; business, Security và Privacy sign-off |
| P-G4 Controlled rollout | Pilot scope/users/support/monitoring; rollback and incident drill; reconciliation; no Sev-1/2 or unwaived Critical/High; signed Go/No-Go |

Các gate trên là điều kiện triển khai product, không phải công việc trang trí cuối dự án.
Khi trigger productization xuất hiện, dừng mở rộng feature và đưa gate tương ứng lên
critical path.

## 7. Quy tắc ưu tiên backlog

Mỗi story mới được xếp theo thứ tự:

1. Có cần để hoàn tất golden demo path không?
2. Có tái sử dụng command/data model hiện có không?
3. Có làm rõ SOP -> task -> decision -> audit không?
4. Có thể chạy hoàn toàn local bằng synthetic data và không có side effect thật không?
5. Có acceptance/test rõ không?

Nếu câu trả lời (1) là không, story vào `After Demo`. Nếu story cần HRI/provider thật,
nó chuyển sang productization backlog dù hấp dẫn về mặt trình diễn.

## 8. Trạng thái thực thi

| Track | Kết quả |
|---|---|
| D0 | Hoàn tất: guarded reset, deterministic readiness, live/static mode, loopback bind và runbook |
| D1 | Hoàn tất: hash deep link, persona/campus context thật, filter/timezone, responsive và dark mode |
| D2 | Hoàn tất vertical slice local: UI/API Lead-to-Handover, Offer author separation và audit/outbox |
| D3 | Hoàn tất phạm vi demo: SOP detail/version/step/comment/lifecycle và audit viewer |
| D4 | Hoàn tất local gate: state tests, golden journey smoke, negative scope/SoD/validation, browser desktop/mobile/dark và production Web build |

Evidence và lệnh vận hành nằm tại `docs/runbooks/local-demo.md`. Dataset bàn giao phải
được reset về đúng 4 Lead, 2 Application, 3 Task, 3 SOP và outbox không backlog.

## 9. Việc tiếp theo sau buổi demo

1. Thu phản hồi khách hàng theo journey, không mở domain mới ngay trong buổi demo.
2. Ưu tiên sửa defect làm gián đoạn flow hoặc copy/UX khiến người xem hiểu sai.
3. Nếu xuất hiện bất kỳ trigger ở mục 6.2, dừng local-demo track và đưa P-G0 lên
   critical path trước khi deploy, chia sẻ truy cập hoặc dùng dữ liệu thật.
4. Merge/release chỉ thực hiện theo review và governance hiện hành; tài liệu này
   không tự cấp production approval.
