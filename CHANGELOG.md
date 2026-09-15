# Changelog — Plan → Build → Audit

Nhật ký từng step trong vòng lặp `docs/PLAN.md`. Mỗi dòng tương ứng một
`reports/step-XX-audit.md`. Không ghi lại toàn bộ git history ở đây, chỉ ghi kết quả
audit theo step.

Format: `[YYYY-MM-DD] Step XX - <tên step> - PASS/FAIL - <1 dòng tóm tắt>`

<!-- Thêm dòng mới bên dưới, mới nhất trên cùng -->
[2026-09-15] Step 02 - Medical clearance gate (BR-ADM-002) - PASS - Module Medical mới, guard trong createOffer, test tích hợp Postgres thật (35 test); xác nhận CI (smoke/outbox:smoke) không bị ảnh hưởng; 2 đề xuất của Codex chấp nhận cho Step 05/06.
[2026-09-15] Step 01 - Migration medical_clearances/rule_configs/approval_requests - PASS - 3 bảng đúng schema, migrate idempotent từ DB trống, mọi gate xanh; phát hiện nhỏ numbering collision trong MIGRATION_PLAN.md chuyển sang Step 02.
