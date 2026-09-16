# PLAN — Nguồn sự thật về tiến độ (Plan → Build → Audit)

**Có hiệu lực từ:** 15/09/2026. Đây là nguồn sự thật duy nhất về step đang làm và
trạng thái của nó. Đọc file này trước khi bắt đầu bất kỳ phiên làm việc nào (Claude
hay Codex).

## 0. Giao thức

- **Claude** (BA Manager + Planning Manager + Audit Manager): đọc SOP + tài liệu nền,
  viết `tasks/step-XX.md` (spec), và sau khi Codex code xong, đọc diff/commit + viết
  `reports/step-XX-audit.md` (PASS/FAIL). **Claude không sửa code ứng dụng trực tiếp
  trong vòng lặp này** — chỉ sửa file trong `tasks/`, `reports/`, `docs/PLAN.md`,
  `CHANGELOG.md`. Lý do: giữ vai trò khách quan khi audit, tránh vừa đá bóng vừa thổi
  còi.
- **Codex** (thợ code, chạy trong VS Code hoặc Codex CLI, do người dùng vận hành hoặc
  Claude gọi qua `codex exec` nếu có sẵn CLI): chỉ code đúng phạm vi trong
  `tasks/step-XX.md` đang active. Ý tưởng phát sinh ngoài scope ghi vào mục "Đề xuất
  phát sinh" cuối task file, không tự implement.
- Mỗi step một commit riêng, message `feat(step-XX): ...` hoặc `fix(step-XX): ...`.
- PASS → Claude cập nhật bảng dưới đây + viết step kế tiếp. FAIL → Claude viết
  `tasks/step-XX-revise.md` với lỗi cụ thể, không viết lại toàn bộ spec.
- Không đổi vai trò giữa chừng: nếu một việc cần Claude code trực tiếp (ví dụ sửa gấp
  một bug chặn), ghi rõ đó là ngoại lệ ngoài vòng lặp Step, không đánh số step.
- **Báo cáo usage sau mỗi step (yêu cầu 15/09/2026, để tránh hết quota giữa chừng):**
  sau khi audit một step xong (PASS hoặc FAIL), Claude báo lại:
  - **Claude:** số `total_tokens` còn lại của phiên hiện tại (lấy từ system-reminder gần
    nhất) — đây là ngân sách context của MỘT phiên hội thoại, không phải hạn mức tài
    khoản/subscription tổng thể; Claude không có cách xem hạn mức tài khoản rộng hơn.
  - **Codex CLI:** không có lệnh CLI nào cho biết số lượt/usage còn lại trước khi dùng
    hết (đã xác nhận 15/09/2026: bản `0.154.0` không có subcommand `usage`, `codex doctor`
    không hiện thông tin này). Cách duy nhất Claude biết được là **khi đã chạm giới hạn**
    — lệnh `codex exec` trả lỗi `"You've hit your usage limit... try again at HH:MM"`.
    Khi gặp lỗi này, Claude dừng ngay, báo giờ reset, không thử lại liên tục. Muốn xem số
    liệu chính xác hơn (số credit/lượt còn lại), phải xem thủ công tại
    `chatgpt.com/codex/settings/usage` trên trình duyệt — Claude không truy cập được
    trang này thay người dùng.
  - Nếu Codex đang bị giới hạn, Claude **không** viết `tasks/step-XX.md` kế tiếp cho đến
    khi người dùng xác nhận đã qua giờ reset hoặc muốn chuyển sang API key riêng (khác
    pool billing với gói ChatGPT, cần người dùng quyết định trước khi đổi
    `~/.codex/config.toml`/auth).
- **Giới hạn phạm vi tự-verify của Codex trong mỗi task (chốt 15/09/2026, sau khi điều
  tra nguyên nhân hết quota ở Step 01-04— xem mục 4):** tài khoản Codex CLI hiện là
  **ChatGPT Plus** (`chatgpt_plan_type: "plus"`, không phải Pro), dùng cửa sổ usage
  chính **5 giờ rolling** (`primary`, `window_minutes: 300`) — cửa sổ tuần (`secondary`,
  10080 phút) hầu như còn nguyên. Step 01-04 đã ăn từ 0% lên 99% cửa sổ 5 giờ trong hơn
  1 tiếng, phần lớn vì mỗi task yêu cầu Codex **tự dựng Docker Postgres + tự khởi động
  cả API và worker thật + chạy `pnpm smoke`/`pnpm outbox:smoke`** trước khi commit —
  đúng nhưng **trùng lặp** với việc Claude luôn tự làm lại y hệt ở bước audit (không tốn
  quota Codex vì đó là Claude tự chạy bash, không qua `codex exec`).
  - **Từ Step 05 trở đi, `tasks/step-XX.md` mục "Định nghĩa Done" KHÔNG được yêu cầu
    Codex tự khởi động `apps/api`/`apps/worker` thật hay chạy `pnpm smoke` /
    `pnpm outbox:smoke` / `pnpm demo:journey:smoke`.** Việc dựng full stack + smoke thật
    là trách nhiệm của Claude ở bước audit — Claude vẫn phải làm đầy đủ việc này (không
    được bỏ qua để "tiết kiệm", vì Claude không tốn quota Codex khi tự chạy).
  - Codex **vẫn phải** tự chạy: `pnpm data:guard`, `pnpm lint`, `pnpm typecheck`,
    `pnpm test` (kể cả test tích hợp mới cần Postgres thật do chính step đó tạo ra —
    đây là bằng chứng bắt buộc cho deliverable, không phải verification thừa), `pnpm build`,
    `docker compose config --quiet`. Chỉ bỏ phần "dựng server thật + smoke script" khỏi
    yêu cầu của Codex, không bỏ test tự động.
  - Nếu một step có lý do chính đáng cần Codex tự smoke-test thật (ví dụ thay đổi ảnh
    hưởng trực tiếp tới cách server khởi động, như Step 04 thêm poll loop), Claude ghi rõ
    lý do trong task file thay vì áp dụng mặc định.

## 1. Tài liệu nền (đọc trước khi viết step-XX.md)

| Tài liệu | Vai trò |
|---|---|
| `AGENTS.md` | Quy tắc bắt buộc toàn dự án — luôn áp dụng, không step nào được vi phạm |
| `docs/ERP_PreSchoolSOP (1).md` | SOP gốc, 30 mục/SOP — nguồn BR/FR/AC cho mọi domain |
| `docs/governance/CANONICAL_SOP_REGISTER.md` | Danh sách 28 canonical SOP ID |
| `docs/CODEX_EXECUTION_PLAN.md` | Track A — hardening code Admission/SOP OS hiện có |
| `docs/CODEX_FULL_DEMO_PLAN.md` | Track B — mở rộng toàn bộ 28 SOP thành demo, nới lỏng có kiểm soát |
| `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-*.md` | BA deep-dive cho domain đang làm (một file/domain, chi tiết hơn task-template vì gộp cả review+audit+instruction ở cấp domain; `tasks/step-XX.md` cắt nhỏ từ đây thành từng step code được) |

## 2. Domain đang làm: Domain 01 — SOP-ADM-003 (Track A)

Nguồn: `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-admission-contract-enrollment.md`.
Đóng 3 business rule đang thiếu trong code Admission hiện có: medical clearance gate
(BR-ADM-002), discount threshold + approval (BR-ADM-003), holding-seat auto-expiry
(BR-ADM-004).

| Step | Nội dung | Trạng thái | Task file | Audit file |
|---|---|---|---|---|
| 01 | Migration `0008`: `medical_clearances`, `rule_configs`, `approval_requests` | **DONE (PASS)** | `tasks/step-01.md` | `reports/step-01-audit.md` |
| 02 | Medical clearance service/controller/permission + dọn numbering collision `MIGRATION_PLAN.md` | **DONE (PASS)** | `tasks/step-02.md` | `reports/step-02-audit.md` |
| 03 | Discount threshold + approval logic trong `application.service.ts` (dùng `rule_configs`/`approval_requests`) | **DONE (PASS)** | `tasks/step-03.md` | `reports/step-03-audit.md` |
| 04 | Offer holding-seat auto-expiry worker | **DONE (PASS)** | `tasks/step-04.md` | `reports/step-04-audit.md` |
| 05 | UI: panel xác nhận y tế + panel duyệt discount. Quyết định idempotency đã chốt trong `tasks/step-05.md` §0 (không thêm optimistic concurrency, UI refetch sau mỗi hành động) | **DONE (PASS sau 1 lần FAIL/revise)** | `tasks/step-05.md` + `tasks/step-05-revise.md` | `reports/step-05-audit.md` |
| 06 | Seed demo cập nhật persona + test tích hợp/permission âm đầy đủ + **cập nhật `scripts/demo-journey-smoke.mjs`** để gọi PUT medical clearance trước khi tạo Offer (phát sinh từ step 02) + **thêm seed `rule_configs` cho `admission.discount_threshold_percent`** (phát sinh từ step 03, xem `reports/step-03-audit.md` mục 5, nếu không demo sẽ 409 khi có discount) | **DONE (PASS)** | `tasks/step-06.md` | `reports/step-06-audit.md` |

**Domain 01 (SOP-ADM-003, BR-ADM-002/003/004) đã HOÀN TẤT — Step 01-06 đều PASS.**

## 2.1 Domain 02 — SOP-ADM-001/002 (Track B, đang làm)

**Sửa nhãn 16/09/2026:** mục 3 (cũ) ghi "Domain 02 — SOP-ADM-001/002/004" — nhãn này
**sai**. Theo `docs/SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md` (canonical SOP ID, thắng
theo AGENTS.md §3 mục 3), SOP-ADM-004 (canonical) = Operational Handover, **đã có code
một phần từ Domain 01** (`handover_packages`, `handover:transition`). Domain 02 chỉ gồm
**SOP-ADM-001 (Application document verification) + SOP-ADM-002 (Student Assessment)**.
Chi tiết đầy đủ quyết định (nguồn SOP, gap DB/code, blocker DEC-006 cho upload file thật)
ở `tasks/step-07.md` mục 0 — Domain 02 **chưa có** file
`docs/CODEX_DOMAIN_INSTRUCTIONS/D02-*.md` riêng, `tasks/step-07.md` mục 0 tạm thời đóng
vai trò đó cho tới khi domain này cần phân tích sâu hơn.

Nguồn: `tasks/step-07.md` mục 0 (quyết định), `docs/CODEX_EXECUTION_PLAN.md` mục T4 (gap
đã cảnh báo từ trước), bảng `application_documents`/`assessments` có sẵn từ migration
`0004` nhưng chưa có service/UI nào.

| Step | Nội dung | Trạng thái | Task file | Audit file |
|---|---|---|---|---|
| 07 | Migration `0009`: thêm `row_version`/`updated_at` + index `application_id` cho `application_documents`/`assessments` (nền tảng, không code service) | **DONE (PASS)** | `tasks/step-07.md` | `reports/step-07-audit.md` |

**TẠM DỪNG 16/09/2026 → ĐỔI ƯU TIÊN 16/09/2026 (cùng ngày):** sau khi Step 07 PASS,
Repository Owner yêu cầu dừng đào sâu Domain 02 để đánh giá chiến lược sản phẩm (so sánh
với LittleLives/SanAnKids — tóm tắt ở nhật ký mục 4 dưới, phân tích đầy đủ trong hội thoại
phiên này, không có file riêng). Kết luận: pain-point tần suất cao nhất của trường/phụ
huynh (điểm danh, học phí, giao tiếp phụ huynh, y tế) nằm ở Phase 3
(`docs/IMPLEMENTATION_ROADMAP.md`), chưa domain nào trong số đó được code. Repository Owner
quyết định: **chuyển ưu tiên sang Domain 03 (SIS-001 điểm danh) và các domain "dùng thật"
kế tiếp** (SIS-002, MED-001, FIN-001 — xem thứ tự đã sắp lại ở mục 3), **Domain 02
(document/assessment) tạm gác lại**, không phải vì sai mà vì ưu tiên thấp hơn theo đúng
đánh giá pain-point. Không quay lại viết `tasks/step-08.md` cho Domain 02 trừ khi Repository
Owner yêu cầu lại.

## 2.2 Domain 03 — SOP-SIS-001 (Track B, đang làm)

Nguồn: `docs/ERP_PreSchoolSOP (1).md` dòng 545 ("Thẻ 3", SOP-SIS-001 — Quy trình Đón Trả
trẻ An toàn và Điểm danh Hàng ngày). Domain **chưa có** file
`docs/CODEX_DOMAIN_INSTRUCTIONS/D03-*.md` riêng — `tasks/step-08.md` mục 0 đóng vai trò
đó, giống cách `tasks/step-07.md` đã làm cho Domain 02.

| Step | Nội dung | Trạng thái | Task file | Audit file |
|---|---|---|---|---|
| 08 | (đang nghiên cứu SOP + schema trước khi viết spec) | ĐANG VIẾT SPEC | — | — |

## 3. Hàng đợi domain kế tiếp

Đổi thứ tự 16/09/2026 theo yêu cầu Repository Owner: ưu tiên domain giải quyết pain-point
tần suất cao của trường/phụ huynh (điểm danh, học phí, giao tiếp, y tế — đúng thứ tự
Phase 3 trong `docs/IMPLEMENTATION_ROADMAP.md` mục 10.2) trước, domain hành chính/nội bộ
(document verification, academic scheduling...) gác sau. **Lưu ý nhãn:** dòng SIS-002 dưới
đây giữ nguyên nhãn gốc `CODEX_FULL_DEMO_PLAN.md`, chưa xác minh lại như đã làm với Domain
02 — xác minh lại nhãn/canonical ID trước khi viết spec cho từng domain, không giả định.

1. **Domain 03 — SOP-SIS-001 (điểm danh/đón trả)** — đang làm, xem mục 2.2.
2. Domain 04 — SOP-SIS-002 (nhật ký chăm sóc + giao tiếp phụ huynh hàng ngày) — pain-point
   "app phụ huynh" mà cả 2 đối thủ tham chiếu đều lấy làm trọng tâm.
3. Domain 05 — SOP-MED-001 (y tế/dị ứng/thuốc — lưu ý dùng lại `medical_clearances`
   pattern từ Domain 01, không tạo khái niệm y tế thứ hai; rủi ro an toàn cao nhất theo
   `docs/CODEX_FULL_DEMO_PLAN.md`, không rút gọn quy trình xác nhận).
4. Domain 06 — SOP-FIN-001 (học phí/hoá đơn/thanh toán) — pain-point "học phí" mà cả 2 đối
   thủ tham chiếu đều lấy làm trọng tâm.
5. Domain 02 (tạm gác) — SOP-ADM-001/002 (document verification/assessment) — quay lại
   sau khi 4 domain trên xong, hoặc khi Repository Owner yêu cầu.
6. Các domain còn lại — xem đầy đủ ở `docs/CODEX_FULL_DEMO_PLAN.md` §4 (ACA-001, SEC-001,
   Wave 2/3/4...), chưa xếp thứ tự lại, xử lý khi tới lượt.

## 4. Nhật ký thay đổi trạng thái

- 15/09/2026: khởi tạo giao thức Plan→Build→Audit theo yêu cầu Repository Owner. Xoá
  một file migration nháp do một Claude subagent tạo trước đó (chưa commit, chưa audit)
  để giữ audit trail sạch — nội dung SQL của nó được tái sử dụng làm spec chính xác
  trong `tasks/step-01.md`.
- 15/09/2026 ~15:48: thử `codex exec` cho Step 05, nhận lỗi "You've hit your usage
  limit... try again at 7:03 PM" ngay cả với một prompt test rỗng ("Say OK"). Step 05
  chuyển `BLOCKED`. Thêm mục "Báo cáo usage sau mỗi step" vào giao thức §0 theo yêu cầu
  Repository Owner.
- 15/09/2026 ~16:00: điều tra nguyên nhân hết quota theo yêu cầu Repository Owner. Đọc
  `~/.codex/auth.json` (giải mã JWT cục bộ, không lộ token/định danh) và log
  `rate_limits` trong `~/.codex/sessions/2026/09/15/*.jsonl` của chính 4 lần `codex exec`
  đã chạy. Kết quả: tài khoản là `chatgpt_plan_type: "plus"` (không phải Pro như kỳ vọng
  — cần Repository Owner tự xác nhận lại tại `chatgpt.com/settings` bằng đúng tài khoản
  đang login ở CLI này). Cửa sổ `primary` (5 giờ, `window_minutes: 300`) đi từ 0% (đầu
  Step 01, ~14:03) lên 99% (cuối Step 04, ~15:28), `resets_at` khớp chính xác 19:03:44 —
  đúng giờ trong thông báo lỗi. Cửa sổ `secondary` (7 ngày) mới ở 25%, còn nhiều — không
  phải hết quota tuần, chỉ hết đúng cửa sổ 5 giờ. Nguyên nhân ăn nhanh: mỗi task yêu cầu
  Codex tự dựng Docker Postgres + tự chạy API/worker thật + `pnpm smoke`/`outbox:smoke`
  trước khi commit, trùng lặp với việc Claude luôn tự làm lại y hệt ở bước audit. Đã thêm
  rule giới hạn phạm vi tự-verify của Codex vào giao thức §0 để giảm tiêu thụ quota từ
  Step 05 trở đi.
- 16/09/2026: reset time 19:03 15/09/2026 đã qua, `codex --version` xác nhận CLI vẫn sẵn
  sàng. Trước khi gọi lại Codex cho Step 05, cập nhật `tasks/step-05.md` mục 5 (Định
  nghĩa Done) để khớp rule mới ở §0: bỏ yêu cầu Codex tự chạy `pnpm dev`/kiểm tra bằng
  mắt, chuyển việc dựng full-stack + xác nhận UI qua trình duyệt hoàn toàn sang bước audit
  của Claude. Step 05 chuyển `IN PROGRESS`, gọi `codex exec` với sandbox `workspace-write`.
- 16/09/2026: Codex hoàn thành phần UI trong scope nhưng không tự commit được (sandbox
  `.git` read-only) — Claude commit hộ (`25faab5`). Audit dựng full-stack thật
  (`docker compose up postgres migrate api web`, bỏ qua `minio` không kéo được image) và
  gọi API thật bằng `curl`/`node fetch`, phát hiện 2 vấn đề: (A) bug thật — `GET
  /medical/clearances/:id` trả 200 body rỗng khi chưa có clearance, `api<T>()` không xử lý
  nên ném lỗi JSON parse, chặn đúng golden path lần đầu; (B) blocker đã biết trước (Codex
  tự báo) — `GET /applications` thiếu field đọc `approval_requests` PENDING/`valid_until`
  của offer, nên `DiscountApprovalPanel` không hoạt động thật được. `reports/step-05-audit.md`
  = FAIL. Soạn `tasks/step-05-revise.md` (việc A sửa frontend, việc B mở rộng tối thiểu,
  chỉ đọc, `apps/api` — ngoại lệ có kiểm soát so với scope Step 05 gốc).
- 16/09/2026 (tiếp): Codex sửa xong theo `tasks/step-05-revise.md` (commit `d27187a`,
  Claude commit hộ). Audit lần 2: tự chạy lại lint/typecheck/build cho cả `apps/web`/
  `apps/api` (xanh), dựng lại full-stack thật, tự tạo dữ liệu tối thiểu qua SQL (application
  → `DECISION_PENDING`, clearance `cleared=true`, 1 `rule_configs` ngưỡng discount 10%) rồi
  gọi thật `POST .../offers` với discount 20% → tạo offer + `approval_requests` PENDING qua
  đúng code path, xác nhận `GET /applications` trả đúng `offer_discount_pending`/
  `offer_valid_until`; duyệt (`APPROVED`) rồi gọi lại xác nhận cờ về `false`. Xác nhận bug
  empty-body (Việc A) đã hết bằng `node fetch` mô phỏng đúng `api<T>()` mới. Không hồi quy
  AC cũ. AC8 (dark/mobile bằng mắt) vẫn không xác nhận được — phiên Claude không có công cụ
  trình duyệt/screenshot, ghi backlog, không chặn PASS. `reports/step-05-audit.md` = PASS.
  Đã `docker compose down -v` dọn dữ liệu test tạm. Step 05 chuyển DONE, mở khoá Step 06.
- 16/09/2026 (tiếp): Viết `tasks/step-06.md`. Quyết định chính (ghi trong task file mục
  0): cơ chế permission hoàn toàn header-based (không dùng `role_permissions` DB dù có
  schema) — 2 persona mới ("Cán bộ Y tế" `medical:read+medical:edit`, "Hiệu trưởng"
  `application:read+offer:approve-discount`) phải tự gửi `x-permissions` hẹp qua FE; 2
  persona cũ giữ nguyên wildcard mặc định để không hồi quy. `admission.discount_threshold_
  percent` seed = 10% (giá trị demo, chưa phải chính sách duyệt). Gọi `codex exec` để code.
- 16/09/2026 (tiếp, Step 06): gọi Codex 3 lượt. Lượt 1 Codex tự phát hiện lỗi kiến trúc
  trong chính spec Claude (test permission âm gọi sai tầng — service thay vì Guard/
  `@RequirePermissions`, vì `ApplicationService.transition()` không tự kiểm tra permission
  như `MedicalService.setClearance`/`decideOfferDiscountApproval`) — sửa spec sang đúng
  pattern Guard/metadata đã có trong `medical.service.test.ts`, không phải lỗi Codex. Sau
  lượt 2 (gate xanh), Claude audit bằng full-stack thật + `curl` API thật phát hiện persona
  "Cán bộ Y tế" thiếu `application:read` nên không dùng được qua UI (403 khi list
  Application, chặn đúng mục đích thêm persona) — sửa spec thêm quyền (cùng lý do đã dùng
  cho Hiệu trưởng), gọi Codex lượt 3. Audit cuối: migrate+seed 2 lần trên cùng Postgres,
  SQL xác nhận idempotent (không nhân đôi role/user/rule_config); `demo-journey-smoke.mjs`
  chạy trọn golden path mới (medical clearance → offer discount 15% > ngưỡng 10% →
  `approval_requests` PENDING → Hiệu trưởng duyệt → APPROVED/ISSUED/ACCEPTED); `smoke`/
  `outbox:smoke` không hồi quy (1 lần fail do backlog outbox tự tạo trong lúc audit, không
  phải regression, xác nhận lại pass sau khi backlog xử lý hết). `reports/step-06-audit.md`
  = PASS. **Domain 01 (SOP-ADM-003) hoàn tất toàn bộ, Step 01-06 đều PASS.**
- 16/09/2026 (Domain 02 bắt đầu): nghiên cứu SOP-ADM-001/002/004 trước khi viết step-07.
  Phát hiện nhãn "SOP-ADM-001/002/004" ở mục 3 (cũ) sai — 3 hệ đánh số SOP-ADM-00X khác
  nhau tồn tại trong repo, bộ canonical đã hợp nhất
  (`docs/SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md`) xác định SOP-ADM-004 = Operational
  Handover, đã có code một phần từ Domain 01 — không thuộc Domain 02. Domain 02 chỉ gồm
  SOP-ADM-001 (document) + SOP-ADM-002 (assessment). Xác nhận qua `docs/CODEX_EXECUTION_
  PLAN.md` mục T4: bảng `application_documents`/`assessments` có sẵn từ migration `0004`,
  chưa có service/UI nào, và **DEC-006 (object storage/malware scan) vẫn `OPEN`** — chưa
  được phép implement upload file thật ở bất kỳ step nào của Domain 02 cho tới khi đóng.
  Viết `tasks/step-07.md` (migration nền tảng: `row_version`/`updated_at`/index, không
  code service) — thay placeholder cũ "0009_platform_scope_hardening" trong
  `MIGRATION_PLAN.md` (chỉ là kế hoạch nháp chưa từng code, cùng cách `0008` đã thay
  placeholder trước đó). Gọi `codex exec` để code.
- 16/09/2026 (tiếp): Codex code xong (commit `242c320`), Claude audit bằng Postgres thật —
  migrate từ DB trống, migrate lần 2 idempotent, seed Step 06 trên schema mới không mất
  dữ liệu, schema khớp đúng spec (`\d`/`pg_indexes`). `reports/step-07-audit.md` = PASS.
  **Repository Owner yêu cầu tạm dừng triển khai Domain 02 sau step này** để đánh giá
  chiến lược sản phẩm — so sánh phạm vi/độ phức tạp của dự án với 2 app quản lý mầm non
  thương mại (LittleLives, SanAnKids): kết luận chính (đầy đủ trong hội thoại phiên này) —
  dự án hiện theo đúng roadmap đã duyệt (`docs/IMPLEMENTATION_ROADMAP.md` Phase 2 Admission
  trước Phase 3 SIS/Y tế/Học phí là chủ đích, không phải chọn bừa), nhưng mức rigor
  (SoD/audit/HRI/decision governance) trên mỗi tính năng nặng hơn nhiều so với sản phẩm
  SMB đối chiếu, và các pain-point tần suất cao nhất của trường/phụ huynh (điểm danh, học
  phí, app phụ huynh — đúng thứ 2 đối thủ dùng để bán hàng) đều nằm ở Phase 3, chưa được
  chạm tới. Khuyến nghị đã đưa ra: cân nhắc chuyển ưu tiên sang Domain 03 (SIS-001 điểm
  danh) thay vì đào sâu tiếp Domain 02, nếu mục tiêu là có sản phẩm dùng được sớm — quyết
  định cuối thuộc Repository Owner. **Không viết `tasks/step-08.md` cho tới khi có xác
  nhận tiếp tục.**
- 16/09/2026 (cùng ngày, tiếp): Repository Owner xác nhận hướng — chuyển sang Domain 03
  (SIS-001 điểm danh) và các domain "dùng thật" kế tiếp giải quyết pain-point trường/phụ
  huynh, tạm gác Domain 02. Cập nhật mục 2.1/2.2/3 theo thứ tự ưu tiên mới (SIS-001 →
  SIS-002 → MED-001 → FIN-001 → Domain 02 tạm gác → phần còn lại). Đang nghiên cứu toàn
  văn SOP-SIS-001 + schema hiện có (persons/enrollments) trước khi viết `tasks/step-08.md`
  — domain này chưa có bảng attendance/guardian nào, khả năng cần migration lớn hơn Step
  01/07 (không chỉ ALTER, có thể cần bảng mới) vì đây là domain hoàn toàn mới, không như
  Domain 02 tận dụng bảng có sẵn từ Step 01 cũ.
