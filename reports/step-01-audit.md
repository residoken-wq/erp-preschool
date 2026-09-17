# Audit Report — Step 01

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với `tasks/step-01.md` và SOP nguồn liên quan. Không đọc lại toàn bộ codebase — chỉ audit phần thay đổi trong step này.

## 1. Thông tin step

- Task spec: `tasks/step-01.md`
- Commit được audit: `6c17c4b7aa01a51b3d6d10b81d27dc9d82e8dd2b` (`feat(step-01): add medical_clearances, rule_configs, approval_requests tables`), branch `merge/task-workflow-ui-into-main`
- Ngày audit: 15/09/2026
- Phương pháp verify: chạy migration trên một Postgres 16 container cách ly hoàn toàn
  (không dùng container/port của `docker-compose.yml` trong repo vì cổng `5432` local
  đang bị một project khác chiếm — dùng container tạm `step01-migration-test` trên cổng
  `15432`, đã xoá sau khi audit xong), cộng `pnpm data:guard/lint/typecheck/test/build`
  và `docker compose config --quiet` trên máy hiện có.

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | File `0008_admission_medical_discount_holding.sql` đúng 3 bảng + partial unique index + index thường | ✅ Đạt | Diff khớp chính xác spec ở mục 2 của task file; đã `\d` cả 3 bảng trên Postgres thật, đúng cột/kiểu/CHECK/FK |
| 2 | `pnpm data:guard && pnpm db:migrate` chạy được từ DB trống | ✅ Đạt | Áp dụng tuần tự `0001`→`0008`, không lỗi |
| 3 | Chạy lại `pnpm db:migrate` lần 2 không lỗi, không apply lại | ✅ Đạt | Output lần 2 chỉ in `Migrations complete`, không có dòng `Applying ...` nào |
| 4 | `docker compose config --quiet` vẫn pass | ✅ Đạt | Không đổi compose, xác nhận lại vẫn pass |
| 5 | `pnpm lint/typecheck/test/build` vẫn xanh | ✅ Đạt | 17/17 test script + toàn bộ workspace lint/typecheck/build pass, không có tác dụng phụ |
| 6 | `docs/governance/MIGRATION_PLAN.md` có dòng mô tả migration `0008` | ✅ Đạt | Dòng mới đúng format các dòng `0006`/`0007`, có trích BR-ADM-002/003 và "Step 01" |
| 7 | Không có file ngoài mục 3 "Được phép sửa/tạo" bị đổi | ✅ Đạt | `git show --stat` chỉ 2 file: migration mới + `MIGRATION_PLAN.md` |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ sửa đúng file được phép trong mục 3 của task spec
- [x] Không có file ngoài scope bị thay đổi
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] Naming convention: snake_case bảng/cột, đúng khuôn `0007_offer_author_separation.sql`.
- [x] Cấu trúc: một `BEGIN;`/`COMMIT;`, đúng pattern migration hiện có.
- [x] Data classification: `medical_clearances.data_classification` có `CHECK (... = 'HRI')` cứng — đúng AGENTS.md §5 (dữ liệu y tế trẻ là HRI bắt buộc, không để mặc định trôi nổi).
- [x] `approval_requests` có `CHECK (approver_id IS NULL OR approver_id <> requested_by)` ở tầng DB — đúng AGENTS.md §6 "Enforce Segregation of Duties... không chỉ dựa vào code review", defense-in-depth thay vì chỉ chặn ở service layer (sẽ làm ở Step 03).
- [x] `rule_configs` dùng partial unique index cho "một bản ghi hiệu lực/scope/key" — đúng pattern one-Effective-version đã có ở SOP versioning (migration `0002`), nhất quán kiến trúc.
- [x] Comment SQL ngắn, giải thích *why* chứ không phải *what* (ví dụ "Isolate health data so medical access and audit can be enforced separately") — đúng quy ước không-viết-comment-thừa của repo.
- [x] Không có debug code/secret hardcode (migration thuần schema, không có giá trị nhạy cảm).
- [ ] **Phát hiện nhỏ, không chặn PASS:** `docs/governance/MIGRATION_PLAN.md` có sẵn một dòng kế hoạch (chưa build) `0008_platform_scope_hardening.sql` — nay trùng số với migration thật vừa tạo. Đây là staleness có từ trước (đặt tên placeholder theo `IMPLEMENTATION_ROADMAP.md` mục 7.4, vốn đã ghi "Tên/số cuối cùng được xác nhận sau source promotion"), không phải lỗi do Codex gây ra — task spec của tôi cũng không yêu cầu Codex xử lý việc này. Cần dọn (đánh số lại các dòng kế hoạch `0008_platform_scope_hardening` → `0009`, và dịch chuỗi `0009`-`0012` phía sau lên 1) trước khi ai đó thực sự code migration mang tên đó, tránh trùng số thật. Đưa vào scope Step 02 (sửa nhanh, không cần step riêng).

## 5. Rủi ro & nợ kỹ thuật phát sinh

- Không có rủi ro mới từ chính migration này — 3 bảng chưa được code TypeScript nào
  đọc/ghi (đúng scope, để dành Step 02/03), nên không có rủi ro runtime.
- Rủi ro đã biết trước (không phải mới): `rule_configs`/`approval_requests` hiện chưa
  có dữ liệu nào — Step 03 phải tự xử lý "fail-closed khi thiếu config" đúng như
  `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-*.md` mục C.3 đã nêu, audit lại kỹ ở step đó.
- Nợ tài liệu: xem mục 4 (numbering collision) — theo dõi ở Step 02.

## 6. Đề xuất phát sinh từ Codex

- Không có mục "Đề xuất phát sinh" nào được điền trong `tasks/step-01.md` (phần cuối
  file vẫn để trống mẫu) — Codex không báo phát sinh gì ngoài scope. Phù hợp với một
  step nhỏ, thuần schema.

## 7. KẾT LUẬN

**Trạng thái: [x] PASS  [ ] FAIL — cần sửa**

Toàn bộ acceptance criteria đạt, đúng scope, đúng quy ước kiến trúc/bảo mật. Một
phát hiện nhỏ (numbering collision trong tài liệu kế hoạch, không phải trong migration
thật) được ghi nhận để xử lý ở Step 02, không chặn Step 01.

- `docs/PLAN.md`: cập nhật Step 01 → DONE, mở khóa viết `tasks/step-02.md`.
- `CHANGELOG.md`: ghi nhận PASS.

---
## Ghi vào CHANGELOG.md
```
[2026-09-15] Step 01 - Migration medical_clearances/rule_configs/approval_requests - PASS - 3 bảng đúng schema, migrate idempotent từ DB trống, mọi gate xanh; phát hiện nhỏ numbering collision trong MIGRATION_PLAN.md chuyển sang Step 02.
```
