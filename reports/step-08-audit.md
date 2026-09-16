# Audit Report — Step 08

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với
> `tasks/step-08.md` và SOP nguồn liên quan.

## 1. Thông tin step

- Task spec: `tasks/step-08.md`
- Commit được audit: `b5e914d` (`feat(step-08): add parent_guardians and append-only
  attendance_events tables`), branch `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, sandbox `workspace-write`), 1 lượt. Claude commit
  hộ (sandbox `.git` read-only, như mọi step trước).
- Ngày audit: 16/09/2026
- Phương pháp verify: đọc toàn bộ diff (3 file), tự chạy lại độc lập
  `pnpm lint/typecheck/test/build` (toàn repo) + `pnpm data:guard`, dựng Postgres tạm
  thật, chạy `pnpm db:migrate` từ DB trống (áp cả `0010`), chạy lại lần 2 (idempotent),
  chạy `pnpm db:seed` (Step 06) trên schema mới, và **verify trigger append-only bằng SQL
  thật**: insert 1 chuỗi offer→enrollment→attendance_event synthetic trong 1 transaction,
  thử `UPDATE`/`DELETE` dòng `attendance_events` đó (dùng `DO $$ ... EXCEPTION$$` để bắt
  lỗi), rồi `ROLLBACK` toàn bộ — xác nhận không còn dữ liệu test sót lại.

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | Migration đúng nội dung mục 2 | ✅ Đạt | SQL khớp nguyên văn spec — 2 bảng, 1 function/trigger, 2 index, không tạo `classes`, không có cột ảnh. |
| 2 | `data:guard && db:migrate` từ DB trống | ✅ Đạt | `Applying 0010_sis_attendance_pickup_foundation.sql` → `Migrations complete`. |
| 3 | Migrate lần 2 idempotent | ✅ Đạt | Không lỗi, không áp lại. |
| 4 | Seed Step 06 không hồi quy | ✅ Đạt | `pnpm db:seed` chạy sạch trên schema mới. |
| 5 | Trigger append-only hoạt động thật | ✅ Đạt | `UPDATE`/`DELETE` đều nhận đúng lỗi `attendance_events is append-only`; dữ liệu test rollback sạch (verify `count(*) = 0` sau đó). |
| 6 | `docker compose config --quiet` | ✅ Đạt | |
| 7 | `pnpm lint/typecheck/test/build` xanh | ✅ Đạt | Toàn repo, 17/17 test migration runner pass. |
| 8 | `MIGRATION_PLAN.md` dòng `0010` đúng nội dung thật | ✅ Đạt | Không còn placeholder "governance_traceability". |
| 9 | Không có file ngoài scope | ✅ Đạt | Đúng 3 file: migration mới, 1 dòng `MIGRATION_PLAN.md`, phần "Đề xuất phát sinh" của chính `tasks/step-08.md` (được phép). |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ file đúng mục 3 của spec.
- [x] Không đụng `packages/domain`, `apps/api/src`, `apps/web/src`, seed, không cài
      package mới, không tạo bảng `classes`, không thêm cột ảnh.
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] `attendance_events` append-only thật ở tầng DB (trigger), không chỉ code hứa —
      đúng SOP-SIS-001 §22 (audit trail immutable) và AGENTS.md §9.
- [x] `parent_guardians` có `data_classification = 'HRI'` CHECK, đúng AGENTS.md §5.
- [x] Không tạo endpoint/logic tự động quyết định pickup/check-in — đúng AGENTS.md §7.2
      (step này thuần schema, chưa có service nào để vi phạm, nhưng thiết kế schema đã
      chừa đúng chỗ cho actor người thật ở step sau — `actor_user_id`, `guardian_id`).
- [x] Không đụng object storage/upload thật — đúng DEC-006 vẫn `OPEN`.

## 5. Đề xuất phát sinh từ Codex

Codex ghi nhận: schema chỉ dùng FK đơn (`person_id`, `enrollment_id`) không có composite
FK đảm bảo `organization_id` khớp nhau giữa `parent_guardians`/`attendance_events` và
`persons`/`enrollments` liên quan (AGENTS.md §9 "ngăn cross-org FK").

**Đánh giá:** đúng là gap thật, nhưng **không phải regression của Step 08** — kiểm tra lại
`medical_clearances` (migration `0008`, Domain 01) có cùng pattern FK đơn, không composite.
Đây là nợ kiến trúc toàn nền tảng có từ trước (tenant scoping hiện dựa vào `WHERE` clause
ở service, không phải DB constraint), không riêng Domain 03. **Quyết định:** không sửa ở
Step 08 (đúng lý do Codex tự đưa ra — sẽ ảnh hưởng nhiều bảng khác nếu làm lẻ tẻ). Ghi vào
backlog: cần 1 migration hardening riêng cho toàn bộ nền tảng nếu/khi ưu tiên (đúng tinh
thần placeholder gốc "platform_scope_hardening" mà `0009` đã thay thế bằng nội dung khác —
gap này vẫn cần một migration thật sự làm đúng việc đó trong tương lai, chưa có số hiệu).

## 6. KẾT LUẬN

**Trạng thái: [x] PASS**

Toàn bộ Acceptance Criteria đạt, xác nhận bằng Postgres thật (không chỉ đọc code), bao gồm
cả việc trực tiếp thử phá trigger append-only để xác nhận DB-level enforcement thật hoạt
động, không phải chỉ đọc SQL và tin lời.

**Domain 03 (SOP-SIS-001) đã có nền tảng.** Bước tiếp theo (Step 09): service ghi nhận
điểm danh (gate/class check-in) + gate pickup verification, dùng đúng 8 permission đã chốt
ở `tasks/step-08.md` mục 0.6.

---
## Ghi vào CHANGELOG.md
```
[2026-09-16] Step 08 - Migration nền tảng attendance_events/parent_guardians (Domain 03, SOP-SIS-001) - PASS - Bảng parent_guardians (HRI, mutable, cờ blocked BR-SIS-005) + attendance_events (append-only, trigger DB-level chặn UPDATE/DELETE, verify thật bằng SQL). Không tạo bảng classes, không cột ảnh (DEC-006 vẫn OPEN). Codex phát hiện gap composite FK cross-org - xác nhận là nợ kiến trúc có từ Domain 01 (medical_clearances cùng pattern), không phải regression, ghi backlog hardening riêng.
```
