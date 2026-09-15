# Audit Report — Step 02

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với `tasks/step-02.md` và SOP nguồn liên quan. Không đọc lại toàn bộ codebase — chỉ audit phần thay đổi trong step này.

## 1. Thông tin step

- Task spec: `tasks/step-02.md`
- Commit được audit: `068cb38fe8529ea9081fac9fe8d22a72334aeeee`
  (`feat(step-02): add medical clearance gate before offer creation`), branch
  `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, model `gpt-6-astra`, sandbox `workspace-write`)
- Ngày audit: 15/09/2026
- Phương pháp verify: đọc toàn bộ diff (12 file, 380 dòng thêm), tự chạy lại độc lập toàn
  bộ gate trên Postgres 16 container tạm cách ly (không dùng lại kết quả tự báo cáo của
  Codex), bao gồm cả 2 script CI thật (`pnpm smoke`, `pnpm outbox:smoke`) với API/worker
  chạy thật — việc này KHÔNG nằm trong "Định nghĩa Done" của `tasks/step-02.md` (thiếu
  sót của tôi khi viết spec) nhưng tôi tự chạy thêm vì phát hiện rủi ro tiềm ẩn khi đọc
  diff (xem mục 5).

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | `GET/PUT /medical/clearances/:applicationId`, permission + campus scope đúng | ✅ Đạt | Route metadata verify bằng `Reflect.getMetadata`; campus/org scope enforce trong SQL WHERE, trả 404 khi ngoài scope (đúng AGENTS.md §10, không lộ qua 403) |
| 2 | PUT tạo/cập nhật đúng 1 `medical_clearances` + 1 `audit_events` + 1 `outbox_events` | ✅ Đạt | Verify bằng integration test đếm row thật trên Postgres; tôi tự chạy lại (không skip) và xác nhận PASS |
| 3 | `assertMedicalCleared` unit test độc lập | ✅ Đạt | `cleared:true` không throw; `false`/`null`/`undefined` throw đúng message + status 409 |
| 4 | Integration test `createOffer` 409 khi thiếu/false clearance, thành công khi true | ✅ Đạt | Test thật trên Postgres (schema riêng, migration thật `0001`-`0008`), tôi tự chạy lại xác nhận |
| 5 | Permission âm cho `medical:edit` | ✅ Đạt | Cả unit (route metadata + `canActivateRequest`) lẫn integration (`setClearance` với actor chỉ có `medical:read` → 403) |
| 6 | Không `any`/non-null assertion không lý do | ✅ Đạt | Đọc toàn bộ code mới, không thấy `any`; có dùng `!` một chỗ trong `withRollback`/pattern cũ nhưng đó là code Step 01 không đổi |
| 7 | `MIGRATION_PLAN.md` không còn trùng số `0008` | ✅ Đạt | Đã đổi `0008_platform_scope_hardening` → `0009`, dịch chuỗi `0009`-`0012` cũ → `0010`-`0013`, đúng yêu cầu |
| 8 | Không có file ngoài scope | ✅ Đạt | 12 file đúng danh sách mục 3 của task; `tasks/step-02.md` chỉ bị sửa phần "Đề xuất phát sinh" (được phép theo giao thức) |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ sửa đúng file được phép trong mục 3 của task spec
- [x] Không có file ngoài scope bị thay đổi
- [x] Không đụng `database/migrations/*`, `rule_configs`/`approval_requests`,
      `apps/worker/**`, `apps/web/**`, `database/seed/demo-seed.json` — đúng như "KHÔNG
      được đụng vào" của task.
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] Module ownership (AGENTS.md §8): `ApplicationService` không tự SQL vào
      `medical_clearances` — gọi `MedicalService.getClearance` qua DI, đúng yêu cầu.
- [x] **Serialize hóa đúng, đã verify logic:** `setClearance` khóa `applications` row
      bằng `FOR UPDATE` trong transaction riêng, cùng bảng mà `createOffer` cũng khóa
      `FOR UPDATE`. Dù `getClearance` đọc qua connection khác (không cùng transaction
      với `createOffer`), race giữa "đổi clearance" và "tạo offer" trên cùng application
      vẫn bị chặn đúng nhờ lock chung trên `applications` — xác nhận đây là thiết kế có
      chủ đích (comment "Serialize clearance changes with offer creation"), không phải
      tình cờ đúng.
- [x] **Data minimization vượt yêu cầu (AGENTS.md §5):** audit/outbox chỉ lưu
      `rowVersion` trước/sau, không copy `allergyFlags`/`specialHealthNeeds` vào
      `before_json`/`after_json`/`payload_json` — có test riêng khẳng định chuỗi
      "Synthetic-" (đại diện nội dung y tế) không xuất hiện trong audit/outbox. Task
      spec chỉ yêu cầu đúng action/eventType, không yêu cầu chi tiết này — là quyết định
      tốt của Codex, không phải scope creep vì vẫn nằm trong file `medical.service.ts`
      đã cho phép sửa.
- [x] Permission kết hợp action + org + campus (AGENTS.md §6): `setClearance` double-
      check permission ở cả controller guard lẫn bên trong service — defense-in-depth
      hợp lý, không bắt buộc theo spec nhưng không sai.
- [x] Transaction/audit/outbox cùng transaction, rollback đúng khi outbox fail — có test
      riêng ép outbox insert lỗi bằng CHECK constraint tạm, xác nhận `medical_clearances`
      lẫn `audit_events` đều rollback theo — đúng bất biến AGENTS.md §6.
- [x] Input validation tại boundary (AGENTS.md §10): `parseClearanceCommand` reject
      unknown field, sai kiểu, vượt giới hạn kích thước — có 11 case test âm.
- **Quan sát nhỏ, không chặn PASS:** `getClearance` không tự kiểm tra permission bên
  trong service (khác với `setClearance`), chỉ dựa vào `@RequirePermissions('medical:read')`
  ở controller. Khi `ApplicationService.createOffer` gọi `getClearance` trực tiếp (bỏ qua
  controller), actor không cần `medical:read` vẫn "biết gián tiếp" trẻ có được xác nhận y
  tế hay không (qua việc Offer tạo được hay bị 409) — đây là hệ quả tất yếu của việc SOP-ADM-003
  yêu cầu chặn ngay tại bước tạo Offer bất kể ai tạo, không phải lỗ hổng quyền tự phát
  sinh. Chấp nhận, ghi nhận làm rõ chứ không coi là gap.

## 5. Rủi ro & nợ kỹ thuật phát sinh

- **Đã tự kiểm tra và loại trừ rủi ro CI:** đọc diff xong, tôi lo `pnpm smoke`/
  `pnpm outbox:smoke` (2 script thật sự chạy trong `.github/workflows/ci.yml`) có thể
  vỡ nếu chúng tạo Offer. Grep xác nhận chỉ `scripts/demo-journey-smoke.mjs` (không nằm
  trong CI) tạo Offer. Tôi tự dựng lại full stack (Postgres tạm, API, worker thật) và
  chạy cả hai script CI — **cả hai PASS, CI không bị ảnh hưởng.**
- `scripts/demo-journey-smoke.mjs` (rehearsal thủ công, không trong CI) sẽ nhận 409 ở
  bước tạo Offer vì actor demo chưa có clearance — Codex đã tự phát hiện và ghi đúng vào
  mục "Đề xuất phát sinh" của `tasks/step-02.md`, đề xuất xử lý ở Step 06. Chấp nhận đề
  xuất này (xem mục 6).
- PUT `medical/clearances` chưa có idempotency key hay expected-`rowVersion` — mỗi lần
  PUT thành công đều tăng version + ghi audit/outbox mới, kể cả gọi lại y hệt. Rủi ro
  thấp ở bước này (chưa có UI, chưa có concurrent editor) nhưng cần quyết định trước khi
  Step 05 (UI) cho nhiều người cùng sửa một clearance.

## 6. Đề xuất phát sinh từ Codex

Codex ghi 2 đề xuất trong `tasks/step-02.md`:

1. *"Step 06 cần bổ sung PUT clearance bằng actor y tế trước khi tạo Offer trong
   `scripts/demo-journey-smoke.mjs`"* — **Chấp nhận**, đưa vào scope Step 06
   (`docs/PLAN.md` đã cập nhật).
2. *"Planning Manager cần chốt idempotency key/expected rowVersion cho PUT"* —
   **Chấp nhận là vấn đề thật, hoãn quyết định đến Step 05** (khi UI thực sự cho phép
   nhiều actor sửa cùng lúc); ghi lại ở `docs/PLAN.md` để không quên.

## 7. KẾT LUẬN

**Trạng thái: [x] PASS  [ ] FAIL — cần sửa**

Toàn bộ acceptance criteria đạt, đúng scope, vượt yêu cầu tối thiểu ở vài điểm (data
minimization trong audit, test rollback atomicity). Đã tự verify độc lập toàn bộ gate
kể cả 2 script CI thật với server chạy thật — không phát hiện regression. Hai đề xuất
của Codex được chấp nhận và đưa vào kế hoạch step sau.

- `docs/PLAN.md`: Step 02 → DONE, mở khóa Step 03; thêm ghi chú idempotency cho Step 05;
  thêm việc cho Step 06.
- `CHANGELOG.md`: ghi nhận PASS.

---
## Ghi vào CHANGELOG.md
```
[2026-09-15] Step 02 - Medical clearance gate (BR-ADM-002) - PASS - Module Medical mới, guard trong createOffer, test tích hợp Postgres thật (35 test); xác nhận CI (smoke/outbox:smoke) không bị ảnh hưởng; 2 đề xuất của Codex chấp nhận cho Step 05/06.
```
