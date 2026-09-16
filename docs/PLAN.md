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
| 06 | Seed demo cập nhật persona + test tích hợp/permission âm đầy đủ + **cập nhật `scripts/demo-journey-smoke.mjs`** để gọi PUT medical clearance trước khi tạo Offer (phát sinh từ step 02) + **thêm seed `rule_configs` cho `admission.discount_threshold_percent`** (phát sinh từ step 03, xem `reports/step-03-audit.md` mục 5, nếu không demo sẽ 409 khi có discount) | IN PROGRESS — Codex đang code (16/09/2026) | `tasks/step-06.md` | — |

**Domain 01 core logic (BR-ADM-002/003/004) hoàn tất qua Step 01-04. UI (05) đã PASS.**
Còn seed/test hoàn thiện (06) trước khi coi Domain 01 xong toàn bộ.

`reports/step-05-audit.md` = PASS → đã mở khoá viết `tasks/step-06.md`.

## 3. Hàng đợi domain kế tiếp (sau khi Domain 01 xong)

Theo thứ tự wave trong `docs/CODEX_FULL_DEMO_PLAN.md` §3-4 — chỉ liệt kê, chưa viết
step nào:

1. Domain 02 — SOP-ADM-001/002/004 (Application document verification + Assessment)
2. Domain 03 — SOP-SIS-001 (điểm danh/đón trả)
3. Domain 04 — SOP-SIS-002 (nhật ký chăm sóc)
4. Domain 05 — SOP-MED-001 (y tế/dị ứng/thuốc — lưu ý dùng lại `medical_clearances`
   pattern từ Domain 01, không tạo khái niệm y tế thứ hai)
5. ... (xem đầy đủ ở `docs/CODEX_FULL_DEMO_PLAN.md` §4)

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
