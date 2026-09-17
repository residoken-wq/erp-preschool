# Audit Report — Step 03

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với `tasks/step-03.md` và SOP nguồn liên quan. Không đọc lại toàn bộ codebase — chỉ audit phần thay đổi trong step này.

## 1. Thông tin step

- Task spec: `tasks/step-03.md`
- Commit được audit: `7cb715cc6426c44816da50973f1fd94863a95030`
  (`feat(step-03): add discount threshold and approval gate for offers`), branch
  `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, sandbox `workspace-write`)
- Ngày audit: 15/09/2026
- Phương pháp verify: đọc toàn bộ diff (8 file, 346 dòng thêm), tự chạy lại độc lập toàn
  bộ gate trên Postgres 16 container tạm cách ly, bao gồm dựng lại API+worker thật và
  chạy `pnpm smoke`/`pnpm outbox:smoke` (bài học từ Step 02) — không tin báo cáo tự chạy
  của Codex.

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | `discountPercent` trống/`0`: hành vi y hệt trước Step 03 | ✅ Đạt | Test xác nhận `approval_requests` = 0 |
| 2 | `discountPercent` ≤ ngưỡng: tạo offer bình thường | ✅ Đạt | Test biên đúng tại giá trị = ngưỡng (10 = 10) vẫn không cần duyệt |
| 3 | Vượt ngưỡng: DRAFT + đúng 1 PENDING + `requiresApproval` | ✅ Đạt | Verify cả `threshold_snapshot` lưu đúng `{discountPercent, thresholdPercent}` |
| 4 | Thiếu config mà `discountPercent > 0`: 409, không ghi gì | ✅ Đạt | Test cả trường hợp config sai kiểu (`'"10"'` — JSON string thay vì number) cũng bị fail-closed đúng |
| 5 | PENDING chặn `APPROVED` | ✅ Đạt | |
| 6 | Approve discount (người khác) → offer mới approve được | ✅ Đạt | |
| 7 | Requester tự duyệt: 409 | ✅ Đạt | Chặn ở cả `approval-requests.ts` lẫn implicit qua `decideOfferDiscountApproval` |
| 8 | REJECTED chặn vĩnh viễn, không resubmit | ✅ Đạt | Đúng như giới hạn đã ghi trong spec |
| 9 | Thiếu `offer:approve-discount`: 403 | ✅ Đạt | |
| 10 | Đúng phạm vi file | ✅ Đạt | 8 file, khớp chính xác mục 3 của task |

**Vượt yêu cầu tối thiểu (không có trong AC nhưng test kiểm tra thêm):** concurrency —
2 request duyệt đồng thời cùng một approval, xác nhận đúng 1 thành công + 1 bị lỗi
(`Promise.allSettled`); rollback atomicity cho cả `createOffer` (outbox lỗi → offer +
approval_requests đều biến mất) và `decideOfferDiscountApproval` (outbox lỗi → approval
giữ nguyên `PENDING`, không có audit rác).

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ sửa đúng file được phép trong mục 3 của task spec (8/8 khớp)
- [x] Không đụng `apps/api/src/modules/medical/**`, `database/migrations/*`,
      `apps/worker/**`, `apps/web/**`, `database/seed/demo-seed.json`
- [x] Không tạo NestJS module/service DI mới cho `rule_configs`/`approval_requests` —
      đúng yêu cầu dùng hàm thuần trong `platform/`, cùng phong cách `mutation-log.ts`
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] Fail-closed đúng tinh thần AGENTS.md §4: thiếu `rule_configs` mà có discount → 409,
      không bịa ngưỡng mặc định. Test còn phủ cả trường hợp giá trị cấu hình tồn tại
      nhưng sai kiểu dữ liệu (JSON string thay vì number) — cũng bị chặn, không âm thầm
      coerce.
- [x] Locking/serialization đúng: `decideOfferDiscountApproval` khóa `offers` row
      (`FOR UPDATE OF o`) trước khi khóa `approval_requests` row (trong
      `decideApprovalRequest`); `transitionOffer` cũng khóa `offers` trước khi đọc
      (không khóa) `approval_requests`. Thứ tự khóa nhất quán (`offers` luôn trước) nên
      không có nguy cơ deadlock giữa 2 luồng.
- [x] SoD (AGENTS.md §6): `decideApprovalRequest` chặn `requestedBy === actor.actorId`
      ở tầng service (không chỉ dựa CHECK constraint DB) — đúng yêu cầu "test trực tiếp
      API", có test cả 2 lớp.
- [x] Audit/outbox cùng transaction cho cả `createApprovalRequest` và
      `decideApprovalRequest` — verify bằng test rollback khi outbox bị chặn giả lập.
- [x] Data minimization: `reason` (có thể chứa lý do nhạy cảm) không bị copy vào
      audit trước/sau — có test riêng xác nhận `"Synthetic reason"` không xuất hiện
      trong `audit_events`.
- [x] Input validation tại boundary: `parseDiscountApprovalCommand` reject unknown
      field, sai enum decision, reason quá dài — đúng AGENTS.md §10.
- **Quan sát nhỏ, không chặn PASS:** `decideOfferDiscountApproval` tự validate UUID
  bằng regex thủ công thay vì dùng `ParseUUIDPipe` như `medical.controller.ts` đã làm ở
  Step 02 — khác phong cách nhưng không sai (đây là validate trong service layer, không
  phải controller, nên `ParseUUIDPipe` — vốn là NestJS pipe cho tầng controller — không
  áp dụng trực tiếp được ở đây; chấp nhận).

## 5. Rủi ro & nợ kỹ thuật phát sinh

- **Tôi tự phát hiện lỗi thao tác của chính mình khi verify (không phải lỗi của Codex):**
  hai lần liên tiếp tôi dùng `pnpm ... start & echo $!` rồi `kill $!` để dọn API/worker
  sau khi tự chạy `pnpm smoke`/`pnpm outbox:smoke` — `$!` chỉ là PID của tiến trình
  `pnpm`/`setsid` wrapper, không phải PID thật của `node dist/main.js` mà nó spawn, nên
  lệnh `kill` không dọn hết, để lại server orphan chiếm cổng `3001` và khiến lần verify
  đầu bị lỗi `EADDRINUSE`/503 giả. Đã dọn sạch bằng `pkill -f`/kill theo PID thật; xác
  nhận lại sau cùng: không còn tiến trình/container nào sót. Ghi lại để lần sau (Step 04
  trở đi) dùng `pkill -f "dist/main.js"` ngay từ đầu thay vì tin `$!` khi lệnh chạy qua
  `pnpm`/`setsid`.
- Không có rủi ro mới phát sinh từ chính code Step 03. `admission.discount_threshold_percent`
  chưa có giá trị nào trong seed demo — đúng như spec yêu cầu (không tự đặt default),
  nghĩa là **demo hiện tại sẽ 409 nếu ai đó thử discount > 0** cho tới khi Step 06 thêm
  cấu hình mẫu. Đây là hành vi đúng (fail-closed), không phải bug, nhưng cần nhớ khi làm
  Step 06.

## 6. Đề xuất phát sinh từ Codex

Codex không điền gì (task file giữ nguyên phần này) — không có đề xuất mới.

## 7. KẾT LUẬN

**Trạng thái: [x] PASS  [ ] FAIL — cần sửa**

Toàn bộ acceptance criteria đạt, đúng scope, chất lượng test vượt yêu cầu (concurrency,
rollback 2 luồng, boundary values, config sai kiểu). Tự verify độc lập toàn bộ gate kể cả
2 script CI thật với server thật — PASS, không regression.

- `docs/PLAN.md`: Step 03 → DONE, mở khóa Step 04. Ghi chú Step 06 cần thêm seed
  `admission.discount_threshold_percent` để demo journey không bị 409 khi có discount.
- `CHANGELOG.md`: ghi nhận PASS.

---
## Ghi vào CHANGELOG.md
```
[2026-09-15] Step 03 - Discount threshold + approval gate (BR-ADM-003) - PASS - rule_configs/approval_requests dùng hàm thuần platform-level, fail-closed khi thiếu/sai config, SoD + rollback + concurrency đều có test Postgres thật; xác nhận lại CI (smoke/outbox:smoke) không bị ảnh hưởng.
```
