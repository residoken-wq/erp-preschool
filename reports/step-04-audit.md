# Audit Report — Step 04

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với `tasks/step-04.md` và SOP nguồn liên quan. Không đọc lại toàn bộ codebase — chỉ audit phần thay đổi trong step này.

## 1. Thông tin step

- Task spec: `tasks/step-04.md`
- Commit được audit: `b9528ad716d99c2a38ae5bc8d05448a48d2e01a4`
  (`feat(step-04): add offer holding-seat auto-expiry worker`), branch
  `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, sandbox `workspace-write`)
- Ngày audit: 15/09/2026
- Phương pháp verify: đọc toàn bộ diff (8 file, 258 dòng thêm), tự chạy lại độc lập toàn
  bộ gate trên Postgres tạm, dựng lại API+worker thật (2 poll loop) và chạy 2 script CI
  — lần này chạy `node dist/main.js` trực tiếp (không qua `pnpm`/`setsid`) để tránh đúng
  lỗi PID đã gặp ở Step 02/03.

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | `ISSUED` quá hạn → `EXPIRED`, cập nhật timestamp/version | ✅ Đạt | |
| 2 | `ISSUED` hạn tương lai: không đụng | ✅ Đạt | Test riêng cho `valid_until = NULL` cũng không đụng (không có trong AC gốc nhưng hợp lý, chấp nhận) |
| 3 | Status khác `ISSUED` dù quá hạn: không đụng | ✅ Đạt | Test phủ toàn bộ 7 status còn lại (`DRAFT`...`WITHDRAWN`) |
| 4 | Đúng 1 audit (SYSTEM) + 1 outbox/offer, cùng transaction, rollback đúng | ✅ Đạt | Rollback test dùng Postgres trigger (kỹ thuật khác Step 02/03 vì đây là bulk multi-row, không dùng CHECK constraint đơn được) — xác nhận cả audit lẫn offer đều rollback |
| 5 | Nhiều offer quá hạn trong 1 lần poll | ✅ Đạt | Test 3 offer, 2 tổ chức khác nhau, đúng 3 audit/outbox riêng |
| 6 | 2 loop độc lập, dừng đúng SIGINT/SIGTERM | ✅ Đạt | Cải tiến vượt yêu cầu: thêm cơ chế "wakeup" để loop thoát ngay khi nhận signal thay vì đợi hết interval — xem mục 4 |
| 7 | `OFFER_EXPIRY_POLL_INTERVAL_MS` qua `packages/config`, có test | ✅ Đạt | Có test biên trên (`2147483647`/`2147483648`) — khớp giới hạn `setTimeout` 32-bit thật của Node.js, không phải số tuỳ tiện |
| 8 | Đúng phạm vi file | ✅ Đạt | 8 file khớp mục 3; `tasks/step-04.md` chỉ có phần "Đề xuất phát sinh" |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ sửa đúng file được phép; không đụng `apps/api/**`, `apps/web/**`,
      `database/migrations/*`, `outbox-runtime.ts`/`outbox-processor.ts`/
      `postgres-outbox.store.ts` (chỉ thêm loop mới trong `main.ts`, không sửa 3 file lõi
      outbox).
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] `actor_type = 'SYSTEM'`, `actor_id = NULL` đúng như migration `0001` đã thiết kế
      sẵn cho trường hợp này.
- [x] Audit+outbox cùng transaction với UPDATE, đúng AGENTS.md §6 — verify bằng trigger
      Postgres ép lỗi outbox insert, xác nhận offer/audit đều rollback.
- [x] Không sao chép HRI/terms vào audit/outbox — code comment ghi rõ ý định này.
- [x] Không hardcode "5 ngày" hay bất kỳ ý nghĩa nghiệp vụ nào — chỉ đọc `valid_until`
      đã có sẵn từ lúc tạo offer.
- **Phát hiện đáng chú ý (do chính Codex tự báo, không phải tôi tìm ra):** `apps/worker`
  chưa từng phụ thuộc `@sop-os/config` — kể cả biến `OUTBOX_POLL_INTERVAL_MS` có sẵn
  trước Domain 01 cũng tự parse bằng `Number(process.env...)` thủ công trong `main.ts`,
  không qua Zod schema validation của `packages/config`, khác với `apps/api` (đã dùng
  `loadEnvironment` từ `@sop-os/config`). Tôi xác nhận độc lập bằng cách đọc
  `apps/worker/package.json` (không có `@sop-os/config` trong dependencies) và grep toàn
  repo — đúng là gap có từ trước, không phải do Step 04 gây ra. Codex làm đúng: tiếp tục
  theo đúng convention hiện có của `apps/worker` (ad-hoc parse, nhất quán với
  `OUTBOX_POLL_INTERVAL_MS`) thay vì tự ý thêm dependency mới để "sửa luôn" — đúng tinh
  thần AGENTS.md §12 "không refactor ngoài phạm vi khi chưa có lý do" và §14 "không tạo
  dependency/vendor mới nếu chưa được chấp nhận". Đây là vi phạm kỹ thuật với AGENTS.md
  §14 ("mọi biến môi trường phải qua package config có schema validation") nhưng là nợ
  **có từ trước**, không phải nợ mới của step này.
- **Cải tiến vượt yêu cầu:** cơ chế "wakeup" (`Set<() => void>`) giúp cả 2 loop thoát
  ngay khi nhận `SIGINT`/`SIGTERM` thay vì đợi hết `pollInterval` hiện tại — cải thiện cả
  hành vi outbox loop vốn có (trước đây phải đợi hết interval mới kiểm tra `stopping`).
  Đây là sửa trong `main.ts` (được phép), không đụng logic lõi của `outbox-runtime.ts`.

## 5. Rủi ro & nợ kỹ thuật phát sinh

- **Quyết định của Planning Manager (tôi) cho đề xuất của Codex:** không mở rộng Step 04
  hay Domain 01 để đưa `apps/worker` sang dùng `@sop-os/config` — đây là nợ kỹ thuật nền
  tảng ảnh hưởng cả `OUTBOX_POLL_INTERVAL_MS` lẫn `OFFER_EXPIRY_POLL_INTERVAL_MS`, không
  phải việc riêng của SOP-ADM-003. Ghi thành mục backlog riêng trong
  `docs/CODEX_EXECUTION_PLAN.md` (Track A — hardening), không chặn Domain 01.
- Chưa test hành vi multi-instance worker thật (đã ghi nhận là giới hạn chấp nhận từ lúc
  viết spec, không phải thiếu sót phát sinh).
- `admission.discount_threshold_percent` (từ Step 03) và giờ hành vi expiry đều **chưa
  có dữ liệu demo mẫu** — nhắc lại việc Step 06 cần seed đầy đủ để demo journey không bị
  chặn bởi 2 gate mới.

## 6. Đề xuất phát sinh từ Codex

*"Worker chưa trực tiếp dùng loader của package config — đây là gap với AGENTS.md §14.
Planning Manager cần cho phép sửa `apps/worker/package.json` và cập nhật lockfile."*

**Quyết định:** Ghi nhận là nợ kỹ thuật có thật, **không xử lý trong Domain 01**. Thêm
vào backlog Track A (`docs/CODEX_EXECUTION_PLAN.md`) làm một task riêng sau khi Domain 01
đóng, vì phạm vi sửa (thêm dependency, cập nhật lockfile, đổi cách cả 2 biến
`OUTBOX_POLL_INTERVAL_MS` và `OFFER_EXPIRY_POLL_INTERVAL_MS` được đọc) lớn hơn một step
sửa trong domain nghiệp vụ cụ thể.

## 7. KẾT LUẬN

**Trạng thái: [x] PASS  [ ] FAIL — cần sửa**

Acceptance criteria đạt đầy đủ, đúng scope. Codex tự phát hiện và báo đúng một nợ kỹ
thuật nền tảng thay vì tự ý mở rộng sửa — đúng tinh thần giao thức. Tự verify độc lập
toàn bộ gate (kể cả dựng full stack thật, lần này quản lý PID đúng cách ngay từ đầu, xác
nhận sạch tiến trình/container sau khi xong).

**3 business rule của Domain 01 (BR-ADM-002/003/004) đã đóng đủ qua Step 01-04.**

- `docs/PLAN.md`: Step 04 → DONE. Domain 01 core logic hoàn tất; còn Step 05 (UI) và
  Step 06 (seed + test tích hợp/permission âm đầy đủ + cập nhật demo-journey-smoke).
- `docs/CODEX_EXECUTION_PLAN.md`: thêm backlog "worker chưa dùng @sop-os/config".
- `CHANGELOG.md`: ghi nhận PASS.

---
## Ghi vào CHANGELOG.md
```
[2026-09-15] Step 04 - Offer holding-seat auto-expiry (BR-ADM-004) - PASS - poll loop mới trong apps/worker, SYSTEM audit/outbox cùng transaction, rollback qua Postgres trigger, cải tiến graceful shutdown cho cả 2 loop; Codex tự báo nợ kỹ thuật apps/worker chưa dùng @sop-os/config, chuyển sang backlog Track A. Domain 01 (BR-ADM-002/003/004) hoàn tất phần logic lõi.
```
