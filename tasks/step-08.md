# Step 08 — Migration: nền tảng attendance_events/parent_guardians (Domain 03, SOP-SIS-001)

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 0. Quyết định đã chốt trước khi viết spec này (không tự suy diễn lại)

Domain 03 **chưa có** file BA deep-dive riêng (`docs/CODEX_DOMAIN_INSTRUCTIONS/D03-*.md`).
Mục này thay thế vai trò đó — đọc toàn văn SOP-SIS-001 ở
`docs/ERP_PreSchoolSOP (1).md` dòng 545-913 trước khi code nếu cần thêm chi tiết, các
quyết định dưới đây đã chốt, không suy diễn lại.

1. **Tóm tắt SOP-SIS-001 (Quy trình Đón Trả trẻ An toàn và Điểm danh Hàng ngày):**
   - Vòng đời: `Absent → Campus/Bus Checked-in → Class Checked-in → Ready for Pickup →
     Checked-out (Completed)`.
   - **BR-SIS-001**: không giao trẻ cho người không có tên trong danh sách người đón
     được ủy quyền hoặc không có OTP/QR ad-hoc hợp lệ.
   - **BR-SIS-002**: ad-hoc pickup request hiệu lực tối đa 12 giờ, phải kèm CCCD + ảnh
     chân dung (**ảnh — đụng object storage, xem quyết định 3 dưới**).
   - **BR-SIS-003**: auto-lock điểm danh + chốt suất ăn lúc 09:00; sửa sau giờ này bắt
     buộc lý do + Hiệu trưởng Cơ sở duyệt.
   - **BR-SIS-004**: cảnh báo an toàn tự động nếu check-in cổng/bus nhưng 09:15 chưa
     check-in lớp (rơi/bỏ quên trẻ).
   - **BR-SIS-005**: có quyết định pháp lý hạn chế quyền tiếp xúc → bật `Access Blocked
     Flag` trên hồ sơ người đón; hệ thống chặn + báo động nếu người đó cố quét mã.
   - **Dual verification bắt buộc** (§23): 2 role độc lập — Bảo vệ/Kiosk xác thực tại
     cổng (`pickup:verify`), Giáo viên bấm "Confirm Handover" (`pickup:confirm`) — đây là
     2 điểm chạm tách biệt, không được gộp thành 1 hành động/1 role.
   - Toàn bộ mốc giờ (09:00, 09:15, 30 phút, 12 giờ) là **threshold**, không hardcode
     (AGENTS.md §4) — đưa vào `rule_configs` **ở step service sau**, không seed ở đây.
   - AGENTS.md §7.2 cấm AI tự "cho phép/từ chối đón hoặc bàn giao trẻ" và "xác nhận
     check-in/check-out" — mọi transition attendance/pickup phải do actor người thật gọi
     qua permission, không có đường tắt tự động.
2. **Không tạo bảng `classes`/`class_assignments` ở step này.** `enrollments.campus_id`
   đã có sẵn, đủ để scope campus cho attendance. Điểm danh gắn trực tiếp vào
   `enrollment_id` (đại diện 1 trẻ đang theo học) thay vì StudentID/ClassID riêng như SOP
   gốc mô tả — mô hình lớp học thật (nếu cần UI điểm danh theo lớp) là quyết định của step
   sau, không tự bịa ở đây.
3. **Không có cột lưu ảnh (`PhotoURL`/`CapturedPhotoURL`) ở step này.** Cùng lý do đã áp
   dụng cho Domain 02 (`tasks/step-07.md` mục 0.2): `DEC-006` (object storage/malware
   scanner) vẫn `OPEN`. `id_card_number` (text, không phải file) được phép lưu vì không
   đụng object storage — chỉ là chuỗi định danh, đã có tiền lệ HRI text field
   (`medical_clearances.special_health_needs`). Không thêm cột ảnh nào cho tới khi có
   quyết định khác.
4. **`attendance_events` là bảng append-only (nhiều dòng/enrollment/ngày), KHÔNG phải 1
   dòng/trẻ/ngày như `DailyAttendance` trong SOP gốc.** Lý do: mỗi touchpoint (gate
   check-in, class check-in, pickup request, handover confirm, gate check-out) có actor
   và timestamp độc lập — model 1-dòng-nhiều-cột sẽ phải UPDATE liên tục, mất lịch sử ai
   sửa gì. Dùng đúng pattern `audit_events` (`database/migrations/0001_platform.sql:108-116`):
   trigger DB-level chặn UPDATE/DELETE (`RAISE EXCEPTION`), không phải chỉ dựa vào code
   service để "hứa" không sửa.
5. **`parent_guardians` là bảng mutable bình thường** (có `updated_at`/`row_version`,
   giống `medical_clearances`) — vì cờ `blocked` (map BR-SIS-005) cần sửa được theo thời
   gian, khác `attendance_events`.
6. **Đặt tên permission cho các step sau (chỉ ghi nhận ở đây, KHÔNG dùng trong migration
   này):** `attendance:record`, `attendance:read`, `attendance:amend`, `pickup:verify`,
   `pickup:confirm`, `pickup:request`, `guardian:manage`, `guardian:block` — theo đúng
   convention `resource:action` đã có (`medical:read/edit`, `handover:transition`). Step
   sau viết service phải dùng đúng 8 tên này, không tự đặt tên khác.
7. **Config key sẽ cần ở `rule_configs` (chỉ ghi nhận tên, KHÔNG seed ở migration này):**
   `attendance.auto_lock_time`, `attendance.red_alert_minutes`,
   `pickup.adhoc_min_advance_minutes`, `pickup.adhoc_validity_hours`.
8. **Không xung đột với Domain 02:** migration `0009` (Domain 02) chỉ ALTER
   `application_documents`/`assessments`, không đụng `persons`/`enrollments`/`campuses`.
   Migration này chỉ tạo bảng mới, FK tới `persons`/`enrollments`/`organizations`/
   `user_accounts` đã ổn định — không cần đụng gì của Domain 01/02.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** Domain 03 (SIS-001 điểm danh/đón trả) là pain-point tần suất
  cao nhất của trường mầm non và phụ huynh (theo đánh giá chiến lược sản phẩm phiên
  16/09/2026 — so sánh LittleLives/SanAnKids), nhưng hiện **chưa có bảng DB nào** cho
  attendance/guardian (đã grep xác nhận). Đây là step nền tảng đầu tiên, giống Step 01 của
  Domain 01.
- **Nó phục vụ luồng nghiệp vụ nào:** SOP-SIS-001 — an toàn trẻ khi đón/trả, chống giao
  nhầm người (KPI SOP: 0% sự cố đón sai — Zero Tolerance).
- **Ai dùng kết quả của step này:** Step 09 (service ghi nhận điểm danh + xác thực người
  đón 2 bước) sẽ dùng trực tiếp 2 bảng này; Step 10 (UI) sau đó.

## 2. Mục tiêu kỹ thuật

- **Input:** không có input runtime — migration schema thuần túy. Tham khảo
  `database/migrations/0001_platform.sql` (pattern append-only + trigger) và
  `database/migrations/0008_admission_medical_discount_holding.sql` (pattern bảng HRI +
  FK tới `applications`/`user_accounts`) làm khuôn.
- **Output mong đợi:** 1 migration mới tạo đúng 2 bảng `parent_guardians`,
  `attendance_events` + 1 function/trigger append-only cho `attendance_events`.
- **Ràng buộc kiến trúc:** theo đúng khuôn `0008` (một `BEGIN;`/`COMMIT;`, snake_case,
  `uuid PRIMARY KEY DEFAULT gen_random_uuid()`, HRI CHECK, comment "why" ngắn).

**Schema chính xác bắt buộc** (có thể sửa nếu phát hiện lỗi cú pháp SQL, phải giữ đúng ý
định và báo lại nếu có sửa):

```sql
BEGIN;

-- Who may pick up a specific enrolled child. HRI per AGENTS.md §5 ("authorized pickup"
-- is listed explicitly); mutable (blocked flag can change), unlike attendance_events.
CREATE TABLE parent_guardians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  person_id uuid NOT NULL REFERENCES persons(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  relationship varchar(50) NOT NULL,
  is_permanent boolean NOT NULL DEFAULT true,
  authorized_for_pickup boolean NOT NULL DEFAULT true,
  blocked boolean NOT NULL DEFAULT false,
  id_card_number varchar(50),
  data_classification varchar(3) NOT NULL DEFAULT 'HRI' CHECK (data_classification = 'HRI'),
  created_by uuid REFERENCES user_accounts(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (enrollment_id, person_id)
);

CREATE INDEX parent_guardians_enrollment_idx ON parent_guardians (enrollment_id);

-- Append-only touchpoint log (gate check-in, class check-in, pickup request, handover
-- confirmation, gate check-out, unexcused-absent alert) - one independently-timestamped,
-- independently-actored row per event, not one mutable row per child per day.
CREATE TABLE attendance_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id),
  event_type varchar(30) NOT NULL CHECK (event_type IN (
    'GATE_CHECK_IN', 'CLASS_CHECK_IN', 'PICKUP_REQUESTED', 'HANDOVER_CONFIRMED',
    'GATE_CHECK_OUT', 'UNEXCUSED_ABSENT_ALERT'
  )),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  actor_user_id uuid REFERENCES user_accounts(id),
  guardian_id uuid REFERENCES parent_guardians(id),
  verification_method varchar(20) CHECK (verification_method IN (
    'QR', 'FACE_ID', 'OTP', 'MANUAL_OVERRIDE', 'SYSTEM'
  )),
  client_event_id uuid,
  metadata_json jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (enrollment_id, event_type, client_event_id)
);

CREATE INDEX attendance_events_enrollment_time_idx ON attendance_events (enrollment_id, occurred_at DESC);

-- Immutable evidence of who was checked in/out and by whom (SOP-SIS-001 §22 audit
-- trail, KPI "0% sai/nhầm trẻ") - same pattern as audit_events, not just a code promise.
CREATE OR REPLACE FUNCTION prevent_attendance_event_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'attendance_events is append-only';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER attendance_events_no_update
  BEFORE UPDATE OR DELETE ON attendance_events
  FOR EACH ROW EXECUTE FUNCTION prevent_attendance_event_mutation();

COMMIT;
```

Đặt tên file `database/migrations/0010_sis_attendance_pickup_foundation.sql` (thay
placeholder cũ "0010_governance_traceability" trong `docs/governance/MIGRATION_PLAN.md`,
đúng cách `0008`/`0009` đã thay placeholder trước đó — xem `tasks/step-07.md` mục 2 để
hiểu tiền lệ nếu cần).

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `database/migrations/0010_sis_attendance_pickup_foundation.sql` (file mới).
- `docs/governance/MIGRATION_PLAN.md` — chỉ đúng dòng bảng cho `0010`, không viết lại
  phần khác của file.

**KHÔNG được đụng vào:**
- Bất kỳ file `.ts` nào (`packages/domain`, `apps/api`, `apps/web`) — không viết
  service/controller/UI, đó là Step 09/10.
- Migration đã tồn tại (`0001`-`0009`) — immutable (AGENTS.md §9).
- `database/seed/demo-seed.json` — không seed guardian/attendance/rule_configs ở đây.
- Không tạo bảng `classes`/`class_assignments` (xem quyết định mục 0.2).
- Không thêm cột lưu ảnh/file nào (xem quyết định mục 0.3).
- Không cài package mới.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] File migration mới tồn tại, đúng 2 bảng + 1 trigger + index như mục 2.
- [ ] `pnpm data:guard && pnpm db:migrate` chạy thành công từ database trống.
- [ ] Chạy lại `pnpm db:migrate` lần 2 trên cùng database không lỗi (idempotent).
- [ ] Chạy `pnpm db:seed` sau đó (seed Step 06 đầy đủ) để xác nhận không phá vỡ gì.
- [ ] **Verify trigger append-only bằng SQL thật:** insert 1 dòng `attendance_events`
      test (dùng `organization_id`/`enrollment_id` synthetic tạo tạm trong transaction rồi
      rollback, hoặc dùng schema test tạm như các test Postgres khác trong repo), thử
      `UPDATE`/`DELETE` dòng đó → phải nhận lỗi `attendance_events is append-only`.
- [ ] `docker compose config --quiet` vẫn pass.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` xanh.
- [ ] `docs/governance/MIGRATION_PLAN.md` dòng `0010` mô tả đúng nội dung thật.
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm data:guard`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`,
      `docker compose config --quiet` đều PASS.
- [ ] Migration verify theo đúng Acceptance Criteria (DB trống + chạy lại lần 2 + seed
      Step 06 không mất dữ liệu + trigger append-only tự verify bằng SQL thật).
- [ ] Nếu sandbox không cho phép Docker/Postgres cục bộ (đã gặp ở Step 06/07), ghi rõ lỗi,
      không phải điều kiện chặn — Claude tự verify ở audit.
- [ ] Đã commit theo format:
      `feat(step-08): add parent_guardians and append-only attendance_events tables`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là step đầu tiên của Domain 03 — toàn bộ quyết định cần thiết đã chốt ở mục 0. Nếu
  thấy quyết định nào có vấn đề (ví dụ tên cột/enum không đủ), ghi vào "Đề xuất phát
  sinh", không tự đổi — các bảng này sẽ được nhiều step sau dùng lại.
- Không "tiện tay" viết service điểm danh/pickup ở step này dù bảng đã sẵn sàng — đó là
  Step 09 (ghi nhận điểm danh + gate verify) và Step 10 (teacher confirm handover + UI),
  tách riêng theo đúng yêu cầu dual-verification của SOP (2 role độc lập cần audit riêng
  từng bước, không gộp).
- `client_event_id` để trống (NULL) là hợp lệ cho sự kiện tạo trực tiếp từ server (không
  qua offline sync) — `UNIQUE (enrollment_id, event_type, client_event_id)` không chặn
  nhiều dòng NULL trùng nhau (đúng ngữ nghĩa Postgres NULL), chỉ có tác dụng dedupe khi
  client thật sự gửi `client_event_id`. Đây là chủ đích, không phải lỗi cần sửa.
- Nếu phát hiện cần thêm ràng buộc khác (ví dụ CHECK không cho `GATE_CHECK_OUT` xảy ra
  trước `GATE_CHECK_IN` cùng ngày) — đó là business rule cần Planning Manager quyết định,
  ghi vào "Đề xuất phát sinh", không tự thêm (state-machine cho attendance là việc của
  service ở Step 09, không phải DB constraint ở step này).

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: không có.
- Vấn đề gặp phải cần Planning Manager quyết định: schema bắt buộc dùng FK đơn theo ID, chưa có composite FK bảo đảm organization của guardian/event khớp person/enrollment/actor/guardian liên quan (AGENTS.md §9). Giữ nguyên SQL đã chốt; đề nghị Planning Manager xác định step hardening tenant boundary trước khi dùng production, không tự thêm constraint ở Step 08.
