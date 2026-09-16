# Changelog — Plan → Build → Audit

Nhật ký từng step trong vòng lặp `docs/PLAN.md`. Mỗi dòng tương ứng một
`reports/step-XX-audit.md`. Không ghi lại toàn bộ git history ở đây, chỉ ghi kết quả
audit theo step.

Format: `[YYYY-MM-DD] Step XX - <tên step> - PASS/FAIL - <1 dòng tóm tắt>`

<!-- Thêm dòng mới bên dưới, mới nhất trên cùng -->
[2026-09-16] Step 05 - UI medical clearance + discount approval - FAIL - AC1 có bug thật (GET clearance rỗng ném lỗi JSON parse khi chưa có dữ liệu, chặn golden path); AC5-7 chặn do GET /applications thiếu approval status/valid_until (Codex tự báo, Claude xác nhận độc lập qua code + full-stack curl test thật trên docker compose). Soạn tasks/step-05-revise.md.
[2026-09-15] Step 04 - Offer holding-seat auto-expiry (BR-ADM-004) - PASS - poll loop mới trong apps/worker, SYSTEM audit/outbox cùng transaction, rollback qua Postgres trigger, cải tiến graceful shutdown cho cả 2 loop; Codex tự báo nợ kỹ thuật apps/worker chưa dùng @sop-os/config, chuyển sang backlog Track A. Domain 01 (BR-ADM-002/003/004) hoàn tất phần logic lõi.
[2026-09-15] Step 03 - Discount threshold + approval gate (BR-ADM-003) - PASS - rule_configs/approval_requests dùng hàm thuần platform-level, fail-closed khi thiếu/sai config, SoD + rollback + concurrency đều có test Postgres thật; xác nhận lại CI (smoke/outbox:smoke) không bị ảnh hưởng.
[2026-09-15] Step 02 - Medical clearance gate (BR-ADM-002) - PASS - Module Medical mới, guard trong createOffer, test tích hợp Postgres thật (35 test); xác nhận CI (smoke/outbox:smoke) không bị ảnh hưởng; 2 đề xuất của Codex chấp nhận cho Step 05/06.
[2026-09-15] Step 01 - Migration medical_clearances/rule_configs/approval_requests - PASS - 3 bảng đúng schema, migrate idempotent từ DB trống, mọi gate xanh; phát hiện nhỏ numbering collision trong MIGRATION_PLAN.md chuyển sang Step 02.
