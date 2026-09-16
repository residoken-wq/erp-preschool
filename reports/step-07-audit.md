# Audit Report — Step 07

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với
> `tasks/step-07.md` và SOP nguồn liên quan.

## 1. Thông tin step

- Task spec: `tasks/step-07.md`
- Commit được audit: `242c320` (`feat(step-07): add row_version/updated_at and
  application_id indexes to application_documents/assessments`), branch
  `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, sandbox `workspace-write`), 1 lượt. Claude commit
  hộ (sandbox `.git` read-only, như mọi step trước).
- Ngày audit: 16/09/2026
- Phương pháp verify: đọc toàn bộ diff (2 file), tự chạy lại độc lập
  `pnpm lint/typecheck/test/build` (toàn repo) + `pnpm data:guard` + `docker compose
  config --quiet`, dựng Postgres tạm thật (`docker compose up -d postgres`), chạy
  `pnpm db:migrate` từ DB trống, kiểm tra schema bằng `\d application_documents` +
  `pg_indexes`, chạy lại `pnpm db:migrate` lần 2 (idempotent), rồi chạy `pnpm db:seed`
  (seed Step 06 đầy đủ) trên schema mới để xác nhận không hồi quy.

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | Migration đúng nội dung mục 2 | ✅ Đạt | SQL khớp nguyên văn spec — 2 cột mới (`updated_at`, `row_version`) trên `application_documents`, 2 index `application_id`, không tạo bảng, không đổi bảng khác. |
| 2 | `data:guard && db:migrate` từ DB trống | ✅ Đạt | Tự chạy thật: `Applying 0009_admission_document_assessment_hardening.sql` → `Migrations complete`. |
| 3 | Migrate lần 2 idempotent | ✅ Đạt | Chạy lại `pnpm db:migrate` trên cùng DB, không lỗi, không áp lại (checksum runner nhận diện đã apply). |
| 4 | Không mất dữ liệu cũ khi ALTER | ✅ Đạt | Chạy `pnpm db:seed` (đầy đủ seed Step 06: 4 user, 2 role mới, 1 rule_config) trên schema đã ALTER — thành công, không lỗi FK/constraint nào. |
| 5 | `docker compose config --quiet` | ✅ Đạt | |
| 6 | `pnpm lint/typecheck/test/build` xanh | ✅ Đạt | Chạy toàn repo (không chỉ 1 app) — 17/17 test migration runner pass, không tác dụng phụ ẩn. |
| 7 | `MIGRATION_PLAN.md` dòng `0009` đúng nội dung thật | ✅ Đạt | Không còn placeholder "platform_scope_hardening". |
| 8 | Không có file ngoài scope | ✅ Đạt | Đúng 2 file: migration mới + 1 dòng `MIGRATION_PLAN.md`. |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ 2 file đúng mục 3 của spec.
- [x] Không đụng `packages/domain`, `apps/api/src`, `apps/web/src`, seed, không cài
      package mới.
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] Migration additive, cột mới có DEFAULT an toàn cho dữ liệu cũ (AGENTS.md §9).
- [x] Không tạo endpoint upload file thật, không đụng object storage — đúng quyết định
      mục 0.2 của spec (DEC-006 vẫn `OPEN`).
- [x] Không sửa state machine/service — đúng quyết định mục 0.3 (gate enforcement là việc
      của step sau, sau khi có service đọc dữ liệu thật).
- [x] Nhãn domain đã sửa đúng ở `docs/PLAN.md` (SOP-ADM-001/002, không phải 004) trước khi
      viết spec này — không lặp lại nhầm lẫn nhãn cũ.

## 5. Rủi ro & nợ kỹ thuật phát sinh

- Không có nợ kỹ thuật mới. Migration thuần túy nền tảng, đúng tinh thần Step 01 của
  Domain 01.
- Domain 02 vẫn còn thiếu toàn bộ service/UI cho document verification (SOP-ADM-001) và
  assessment (SOP-ADM-002) — đây là Step 08/09 nếu domain này được tiếp tục.

## 6. KẾT LUẬN

**Trạng thái: [x] PASS**

Toàn bộ Acceptance Criteria đạt, xác nhận bằng Postgres thật (không chỉ đọc code).

---
## Ghi vào CHANGELOG.md
```
[2026-09-16] Step 07 - Migration nền tảng application_documents/assessments (Domain 02, SOP-ADM-001/002) - PASS - Thêm row_version/updated_at cho application_documents + index application_id cho cả 2 bảng, không code service (đúng tinh thần Step 01 của Domain 01). Sửa nhãn domain sai ("SOP-ADM-001/002/004" -> chỉ 001/002, 004 = Handover đã có từ Domain 01) trước khi viết spec. Verify migrate 2 lần + seed Step 06 trên schema mới, không mất dữ liệu.
```

---
**Theo yêu cầu Repository Owner: tạm dừng triển khai Domain 02 sau step này.** Không viết
`tasks/step-08.md` cho đến khi có xác nhận tiếp tục — xem `docs/PLAN.md` mục 2.1.
