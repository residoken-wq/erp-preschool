# Step 09 — Service: ghi nhận điểm danh (gate check-in + class check-in)

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 0. Quyết định đã chốt trước khi viết spec này (không tự suy diễn lại)

Đọc `tasks/step-08.md` mục 0 (đã có tóm tắt SOP-SIS-001 đầy đủ, không lặp lại ở đây) trước
khi code. Quyết định thêm cho step này:

1. **Phạm vi Step 09 = CHỈ "nửa buổi sáng"** (Bước 01-02 của SOP: gate check-in + class
   check-in). **KHÔNG** làm ở step này: ad-hoc pickup request, gate pickup verification,
   teacher confirm handover (Bước 04-06 — dual-verification phức tạp hơn, để Step 10-11
   tách riêng vì cần audit riêng theo đúng yêu cầu SoD của SOP), auto-lock 09:00/red-alert
   09:15 (BR-SIS-003/004 — cần worker theo lịch, giống Step 04 của Domain 01, để step
   riêng), sửa điểm danh sau giờ chốt (`attendance:amend`, cần approval flow, để step
   riêng cùng lúc với auto-lock).
2. **Không kiểm tra thứ tự sự kiện** (ví dụ không bắt buộc phải có `GATE_CHECK_IN` trước
   mới cho `CLASS_CHECK_IN`) — SOP không nói rõ ràng đây là ràng buộc cứng bắt buộc ở tầng
   dữ liệu (có exception offline/nhập bù), và đây là quyết định nghiệp vụ cần chốt riêng
   nếu muốn thêm — không tự suy diễn.
3. **Idempotency:** dùng đúng unique constraint đã có
   `(enrollment_id, event_type, client_event_id)` từ migration `0010`. Client (offline
   sync) có thể gửi `clientEventId` (UUID); nếu trùng, service phải trả về **event đã có**
   (không lỗi, không tạo dòng mới, không ghi audit/outbox lần 2 — vì đó không phải mutation
   mới). Nếu không gửi `clientEventId`, luôn tạo dòng mới (không dedupe — đúng ngữ nghĩa
   NULL của unique constraint, đã ghi rõ ở `tasks/step-08.md` mục 6).
4. **Permission dùng đúng 2 tên đã chốt ở `tasks/step-08.md` mục 0.6:** `attendance:record`
   (cả 2 endpoint POST), `attendance:read` (GET). Không dùng `attendance:amend` ở step này
   (chưa có endpoint sửa).
5. **Tenant/campus scope:** enrollment phải thuộc đúng `organization_id` của actor và
   `campus_id` nằm trong `actor.campusIds` — đúng pattern `medical.service.ts`
   (`apps/api/src/modules/medical/medical.service.ts:38-42`), không tin bất kỳ ID nào
   client gửi mà không verify qua bảng `enrollments`.
6. **Không tính toán "trạng thái hiện tại" (derived status) ở step này** — GET chỉ trả
   danh sách sự kiện thô (đã lọc/sort/phân trang), không tự suy ra
   `Present`/`Unexcused_Absent`/... Việc hiển thị trạng thái tổng hợp là việc của UI (Step
   sau) hoặc 1 service method riêng nếu cần, không tự thêm ở đây.
7. **Không đụng `parent_guardians`** — bảng đó chưa có service (Step 10). `guardian_id`
   trên `attendance_events` để `NULL` ở mọi INSERT của step này (chỉ dùng cho sự kiện
   pickup ở step sau).

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** Domain 03 đã có schema (Step 08) nhưng chưa ai ghi/đọc được
  điểm danh qua API. Đây là phần đầu tiên "dùng thật" của Domain 03 — giáo viên/bảo vệ có
  thể ghi nhận trẻ đến trường và vào lớp.
- **Nó phục vụ luồng nghiệp vụ nào:** SOP-SIS-001 Bước 01 (Gate/Bus check-in) và Bước 02
  (Class attendance).
- **Ai dùng kết quả của step này:** Step 10 (guardian management), Step 11 (pickup/
  handover dual-verification) dùng chung module `attendance` này; Step sau (UI) gọi trực
  tiếp 2 endpoint POST + 1 GET.

## 2. Mục tiêu kỹ thuật

- **Input:** bảng `attendance_events`/`parent_guardians` từ migration `0010` (Step 08),
  pattern `apps/api/src/modules/medical/medical.service.ts` làm khuôn (permission check
  trong service, transaction, `recordMutation`), `apps/api/src/platform/pagination.ts`
  (`parsePagination`) cho GET, `apps/api/src/modules/admission/application.controller.ts`
  làm khuôn đăng ký route + `AttendanceModule` vào `apps/api/src/app.module.ts` (theo đúng
  cách `MedicalModule` đã đăng ký).
- **Output mong đợi:** module `apps/api/src/modules/attendance/` mới, gồm:
  - `attendance.module.ts`
  - `attendance.controller.ts`
  - `attendance.service.ts`
  - `attendance.service.test.ts`
  và đăng ký `AttendanceModule` vào `apps/api/src/app.module.ts`.

### Hợp đồng API chính xác bắt buộc

- `POST /attendance/enrollments/:enrollmentId/gate-check-in`
  - Permission: `attendance:record`.
  - Body: `{ verificationMethod: 'QR'|'FACE_ID'|'OTP'|'MANUAL_OVERRIDE'|'SYSTEM'; clientEventId?: string (UUID) }`.
  - Ghi 1 dòng `attendance_events` với `event_type = 'GATE_CHECK_IN'`, `actor_user_id =
    actor.actorId`, `guardian_id = NULL`, `metadata_json = '{}'`.
- `POST /attendance/enrollments/:enrollmentId/class-check-in`
  - Permission: `attendance:record`.
  - Body: `{ verificationMethod: 'QR'|'FACE_ID'|'OTP'|'MANUAL_OVERRIDE'|'SYSTEM'; clientEventId?: string; mealBreakfast?: boolean; healthNote?: string (tối đa 1000 ký tự) }`.
  - Ghi 1 dòng `event_type = 'CLASS_CHECK_IN'`, `metadata_json = { mealBreakfast, healthNote }`
    (chỉ set field nào thật sự có trong body, không bịa default false/rỗng nếu client
    không gửi — dùng `undefined`/omit key, không ép kiểu).
- `GET /attendance/enrollments/:enrollmentId?page=&pageSize=`
  - Permission: `attendance:read`.
  - Trả `PageResult` (dùng lại type `PageResult` từ `@sop-os/contracts` nếu đã có, giống
    `ApplicationService.list()` — xem `apps/api/src/modules/admission/application.service.ts:71-112`
    làm khuôn `count(*) OVER()` + `parsePagination`), sort `occurred_at DESC`.
  - Field trả về mỗi event: `id, enrollmentId, eventType, occurredAt, actorUserId,
    guardianId, verificationMethod, clientEventId, metadata`.

**Cả 2 POST đều:**
- 404 `NotFoundException` nếu `enrollmentId` không tồn tại hoặc không thuộc
  `actor.organizationId`/`actor.campusIds` (verify qua JOIN `enrollments`, giống
  `medical.service.ts:38-42`).
- Nếu `clientEventId` được gửi và đã tồn tại đúng `(enrollmentId, eventType,
  clientEventId)` → trả về **event đã có** (200, không phải lỗi), không ghi thêm
  audit/outbox.
- Nếu ghi thành công (dòng mới) → `recordMutation` cùng transaction: `action:
  'attendance.gate_check_in'`/`'attendance.class_check_in'`, `objectType:
  'AttendanceEvent'`, `objectId: <event id>`, `eventType: 'AttendanceGateCheckIn'`/
  `'AttendanceClassCheckIn'`, `payload: { enrollmentId }`.

**Validate body** bằng hàm parse thuần (giống `parseClearanceCommand`,
`apps/api/src/modules/medical/medical.service.ts:20-33`): reject unknown field, reject
`verificationMethod` ngoài enum, reject `clientEventId` không phải UUID hợp lệ,
`healthNote` quá 1000 ký tự, `mealBreakfast` không phải boolean.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `apps/api/src/modules/attendance/attendance.module.ts` (mới)
- `apps/api/src/modules/attendance/attendance.controller.ts` (mới)
- `apps/api/src/modules/attendance/attendance.service.ts` (mới)
- `apps/api/src/modules/attendance/attendance.service.test.ts` (mới)
- `apps/api/src/app.module.ts` — chỉ thêm import + đăng ký `AttendanceModule` vào mảng
  `imports`, không sửa gì khác trong file.

**KHÔNG được đụng vào:**
- `database/migrations/*` — schema đã đủ từ Step 08, không thêm migration.
- `apps/web/src/**` — không có UI ở step này.
- `parent_guardians` — không viết code đọc/ghi bảng này (Step 10).
- `packages/domain`, `packages/contracts` — nếu cần thêm type `PageResult`/`ActorContext`
  mới, xác nhận trước đã có sẵn trong `@sop-os/contracts` (đã dùng ở
  `application.service.ts`); nếu thật sự thiếu type cần thiết, ghi vào "Đề xuất phát
  sinh", không tự sửa `packages/contracts`.
- Không thêm bất kỳ endpoint nào khác ngoài 3 endpoint ở mục 2 (không làm pickup, không
  làm amend, không làm derived-status).

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] `POST gate-check-in` với actor có `attendance:record`: tạo đúng 1 dòng
      `attendance_events` (`GATE_CHECK_IN`), đúng 1 dòng `audit_events`, đúng 1 dòng
      `outbox_events`, cùng transaction (test rollback khi outbox insert lỗi phải rollback
      cả 2).
- [ ] `POST class-check-in` tương tự, với `metadata_json` đúng field đã gửi (không bịa
      field không gửi).
- [ ] Gửi lại đúng `clientEventId` đã dùng trước đó (cùng `enrollmentId`/`eventType`) →
      trả về event cũ, KHÔNG tạo dòng `attendance_events`/`audit_events`/`outbox_events`
      mới (test đếm count trước/sau bằng nhau).
- [ ] Actor thiếu `attendance:record` → POST trả 403, không có dòng nào được ghi (test
      Postgres thật, đếm 0 dòng ở cả 3 bảng).
- [ ] Actor thiếu `attendance:read` → GET trả 403.
- [ ] `enrollmentId` thuộc tổ chức/campus khác actor → 404 ở cả 3 endpoint (không lộ
      thông tin tồn tại/không tồn tại — đúng pattern 404 chung của AGENTS.md §10).
- [ ] GET trả đúng thứ tự `occurred_at DESC`, có `page`/`pageSize`, có `total` trong meta.
- [ ] `verificationMethod` sai enum, `clientEventId` không phải UUID, `healthNote` quá
      1000 ký tự, field lạ trong body → 400, không ghi dòng nào.
- [ ] Unit test route metadata: `@RequirePermissions('attendance:record')` trên 2 handler
      POST, `@RequirePermissions('attendance:read')` trên handler GET — verify bằng
      `Reflect.getMetadata` giống `medical.service.test.ts`.
- [ ] `AttendanceModule` đăng ký đúng trong `app.module.ts`, không sửa gì khác trong file
      đó.
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm lint && pnpm typecheck && pnpm build` xanh cho `apps/api` (và toàn repo để
      chắc không ảnh hưởng gì khác).
- [ ] `pnpm --filter @sop-os/api test` xanh, gồm toàn bộ test tích hợp Postgres thật mới
      (dùng pattern fixture schema-per-test đã có trong `medical.service.test.ts`, migrate
      thật vào schema đó, không mock DB).
- [ ] **KHÔNG cần** tự dựng `apps/web`/`apps/api` như server thật, KHÔNG cần chạy
      `pnpm smoke`/`outbox:smoke`/`demo:journey:smoke` (rule đã chốt từ Step 05) —
      **NHƯNG vẫn phải tự dựng 1 Postgres tạm để chạy test tích hợp thật** (đây là bằng
      chứng bắt buộc cho service mới, không phải "dựng server" bị cấm).
- [ ] Đã commit theo format:
      `feat(step-09): add attendance service for gate and class check-in`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là service đầu tiên của Domain 03 — pattern đặt ở đây (transaction, idempotency,
  permission double-check, `recordMutation`) sẽ được Step 10/11 tái dùng. Nếu thấy vấn đề
  kiến trúc, ghi vào "Đề xuất phát sinh", không tự đổi vì ảnh hưởng nhiều step sau.
- `attendance_events` là append-only (trigger DB-level đã verify PASS ở Step 08) — service
  **chỉ được INSERT**, không bao giờ UPDATE/DELETE bảng này (kể cả trong logic idempotent
  replay — đó là SELECT, không phải UPDATE).
- Nếu phát hiện cần thêm cột/trường mà migration `0010` chưa có (ví dụ muốn lưu thêm field
  gì trong `metadata_json` mà thấy cần chuẩn hoá thành cột riêng), đó là quyết định
  migration mới — ghi vào "Đề xuất phát sinh", không tự ALTER bảng.
- Không tự tạo endpoint "sửa" hay "xoá" attendance event dù có thể thấy tiện — bảng này cố
  ý không cho phép, đúng quyết định mục 0 và Step 08.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
