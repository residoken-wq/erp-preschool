# PLAN — Nguồn sự thật về tiến độ (Plan → Build → Audit)

**Có hiệu lực từ:** 15/09/2026. Đây là nguồn sự thật duy nhất về step đang làm và
trạng thái của nó. Đọc file này trước khi bắt đầu bất kỳ phiên làm việc nào (Claude
hay Codex).

## 0. Giao thức

- **Claude** (BA Manager + Planning Manager + Audit Manager): đọc SOP + tài liệu nền,
  viết `tasks/step-XX.md` (spec), và sau khi Codex code xong, đọc diff/commit + viết
  `reports/step-XX-audit.md` (PASS/FAIL). **Claude không sửa code ứng dụng trực tiếp
  trong vòng lặp này** — chỉ sửa file trong `tasks/`, `reports/`, `docs/PLAN.md`,
  `CHANGELOG.md`. Lý do: giữ vai trò khách quan khi audit, tránh vừa đá bóng vừa thổi
  còi.
- **Codex** (thợ code, chạy trong VS Code hoặc Codex CLI, do người dùng vận hành hoặc
  Claude gọi qua `codex exec` nếu có sẵn CLI): chỉ code đúng phạm vi trong
  `tasks/step-XX.md` đang active. Ý tưởng phát sinh ngoài scope ghi vào mục "Đề xuất
  phát sinh" cuối task file, không tự implement.
- Mỗi step một commit riêng, message `feat(step-XX): ...` hoặc `fix(step-XX): ...`.
- PASS → Claude cập nhật bảng dưới đây + viết step kế tiếp. FAIL → Claude viết
  `tasks/step-XX-revise.md` với lỗi cụ thể, không viết lại toàn bộ spec.
- Không đổi vai trò giữa chừng: nếu một việc cần Claude code trực tiếp (ví dụ sửa gấp
  một bug chặn), ghi rõ đó là ngoại lệ ngoài vòng lặp Step, không đánh số step.

## 1. Tài liệu nền (đọc trước khi viết step-XX.md)

| Tài liệu | Vai trò |
|---|---|
| `AGENTS.md` | Quy tắc bắt buộc toàn dự án — luôn áp dụng, không step nào được vi phạm |
| `docs/ERP_PreSchoolSOP (1).md` | SOP gốc, 30 mục/SOP — nguồn BR/FR/AC cho mọi domain |
| `docs/governance/CANONICAL_SOP_REGISTER.md` | Danh sách 28 canonical SOP ID |
| `docs/CODEX_EXECUTION_PLAN.md` | Track A — hardening code Admission/SOP OS hiện có |
| `docs/CODEX_FULL_DEMO_PLAN.md` | Track B — mở rộng toàn bộ 28 SOP thành demo, nới lỏng có kiểm soát |
| `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-*.md` | BA deep-dive cho domain đang làm (một file/domain, chi tiết hơn task-template vì gộp cả review+audit+instruction ở cấp domain; `tasks/step-XX.md` cắt nhỏ từ đây thành từng step code được) |

## 2. Domain đang làm: Domain 01 — SOP-ADM-003 (Track A)

Nguồn: `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-admission-contract-enrollment.md`.
Đóng 3 business rule đang thiếu trong code Admission hiện có: medical clearance gate
(BR-ADM-002), discount threshold + approval (BR-ADM-003), holding-seat auto-expiry
(BR-ADM-004).

| Step | Nội dung | Trạng thái | Task file | Audit file |
|---|---|---|---|---|
| 01 | Migration `0008`: `medical_clearances`, `rule_configs`, `approval_requests` | **DONE (PASS)** | `tasks/step-01.md` | `reports/step-01-audit.md` |
| 02 | Medical clearance service/controller/permission + dọn numbering collision `MIGRATION_PLAN.md` | **DONE (PASS)** | `tasks/step-02.md` | `reports/step-02-audit.md` |
| 03 | Discount threshold + approval logic trong `application.service.ts` (dùng `rule_configs`/`approval_requests`) | **DONE (PASS)** | `tasks/step-03.md` | `reports/step-03-audit.md` |
| 04 | Offer holding-seat auto-expiry worker | **IN PROGRESS** | `tasks/step-04.md` | — |
| 05 | UI: panel xác nhận y tế + panel duyệt discount. **Cần quyết định trước khi làm:** contract idempotency/expected-`rowVersion` cho `PUT /medical/clearances` (phát sinh từ step 02, xem `reports/step-02-audit.md` mục 5-6) | TODO (chờ step 04 PASS) | — | — |
| 06 | Seed demo cập nhật persona + test tích hợp/permission âm đầy đủ + **cập nhật `scripts/demo-journey-smoke.mjs`** để gọi PUT medical clearance trước khi tạo Offer (phát sinh từ step 02) + **thêm seed `rule_configs` cho `admission.discount_threshold_percent`** (phát sinh từ step 03, xem `reports/step-03-audit.md` mục 5, nếu không demo sẽ 409 khi có discount) | TODO | — | — |

Không viết `tasks/step-05.md` cho đến khi `reports/step-04-audit.md` = PASS.

## 3. Hàng đợi domain kế tiếp (sau khi Domain 01 xong)

Theo thứ tự wave trong `docs/CODEX_FULL_DEMO_PLAN.md` §3-4 — chỉ liệt kê, chưa viết
step nào:

1. Domain 02 — SOP-ADM-001/002/004 (Application document verification + Assessment)
2. Domain 03 — SOP-SIS-001 (điểm danh/đón trả)
3. Domain 04 — SOP-SIS-002 (nhật ký chăm sóc)
4. Domain 05 — SOP-MED-001 (y tế/dị ứng/thuốc — lưu ý dùng lại `medical_clearances`
   pattern từ Domain 01, không tạo khái niệm y tế thứ hai)
5. ... (xem đầy đủ ở `docs/CODEX_FULL_DEMO_PLAN.md` §4)

## 4. Nhật ký thay đổi trạng thái

- 15/09/2026: khởi tạo giao thức Plan→Build→Audit theo yêu cầu Repository Owner. Xoá
  một file migration nháp do một Claude subagent tạo trước đó (chưa commit, chưa audit)
  để giữ audit trail sạch — nội dung SQL của nó được tái sử dụng làm spec chính xác
  trong `tasks/step-01.md`.
