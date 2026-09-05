# Database Migration Plan — Phase 1/2

## Baseline

Migration `0001`–`0007` đã tồn tại và được xem là immutable sau khi apply. `0006`
lưu delivery-attempt metadata cho outbox; `0007` lưu author của Offer để API enforce
segregation of duties khi approve. Cả hai không lưu thêm HRI và không tự xóa evidence
khi retention chưa được duyệt.
Số/tên còn lại là kế hoạch; schema chi tiết chỉ được code theo vertical slice sau
ADR/decision và data classification review.

| Migration dự kiến | Mục tiêu | Invariant/evidence chính | Recovery |
|---|---|---|---|
| `0006_outbox_delivery_attempts.sql` | attempt, provider outcome và receipt metadata | composite org/event FK; unique attempt; success/failure result constraint | additive; forward-fix; giữ evidence khi worker rollback |
| `0007_offer_author_separation.sql` | author actor của Offer | author không tự approve; actor ID nằm trong audit boundary | additive; nullable cho legacy row; forward-fix |
| `0008_platform_scope_hardening.sql` | org/campus scope, composite tenant constraints, row version/idempotency base | ngăn cross-org FK; test empty + upgrade DB | forward-fix; backup trước DDL rủi ro |
| `0009_governance_traceability.sql` | BR/FR/AC/Test/TraceLink và approval primitives | version/link history không bị overwrite | additive trước, backfill có reconciliation |
| `0010_rule_configuration.sql` | scoped/versioned/effective rule + approval/audit | unique effective version theo scope/time strategy | disable version; không delete evidence |
| `0011_secure_documents.sql` | metadata/quarantine/scan/access/audit, không lưu binary DB | state/tenant constraint, random object key | revoke access + reconcile orphan object |
| `0012_admission_extensions.sql` | missing Lead-to-Handover fields/tables theo slices | state prerequisites, tenant FK, money decimal | expand/migrate/contract; reconcile counts |

## Gate cho mỗi migration

1. Table ownership, tenant boundary, campus scope, data class, retention, delete /
   legal hold và audit behavior được ghi rõ.
2. Test trên database trống và database ở version ngay trước; checksum migration
   đã apply không đổi.
3. Backfill có batch/bound, idempotency, metric/count reconciliation và không log HRI.
4. DDL lock/downtime, index build, capacity và rollback/forward recovery được review.
5. Contract/API deploy order dùng expand-contract khi cần zero/minimal downtime.

Runner giữ session advisory lock để chỉ một tiến trình migrate tại một thời điểm,
quản lý outer transaction để DDL và bản ghi `schema_migrations` commit cùng nhau,
và lưu SHA-256 checksum. Các row từ runner cũ được bootstrap checksum một lần; từ
lần chạy sau, file đã apply bị sửa hoặc biến mất sẽ fail closed trước migration mới.

Không gộp mọi domain vào một migration lớn và không sửa `0001`–`0005` để làm test
trông khớp.
