# Threat Model Context — Validated

Ba giả định deployment đã được người dùng xác nhận ngày 30/08/2026. Threat model
cuối nằm tại repository root: `erp-preschool-threat-model.md`.

## Evidence đã xác minh từ repository

- Next.js Web gọi NestJS API; API/Worker dùng PostgreSQL; MinIO là object-storage
  local baseline; transactional outbox phục vụ async integration.
- API hiện có development actor qua header và wildcard permission cho local/test;
  OIDC/production fail-safe là Phase 1.
- Entity HRI gồm person/application/assessment/document/enrollment/contract/
  handover; tài chính/audit/security metadata tối thiểu là CON.
- Client/API, API/database, worker/provider, upload/object storage, IdP và tương lai
  AI gateway/provider là các candidate trust boundary.
- Source hiện chưa triển khai provider production, upload scan adapter, RLS, secret
  manager, KMS, enterprise IdP hoặc AI gateway.

## Ba xác nhận đã nhận

1. Deployment mục tiêu: **hybrid**.
2. Parent/mobile API và admin portal: **đều Internet-facing**.
3. Trước Gate G1: **chỉ synthetic/de-identified, không nhập HRI thật**.

## Input bổ sung nên cung cấp nếu đã có

Enterprise IdP, pilot campus, user population/roles, payment/e-sign/messaging vendor,
data residency/retention, availability/RPO/RTO, device/mobile model và regulatory
obligation đã được legal/privacy owner xác minh.

Các input vẫn mở gồm IdP/session/claim mapping, topology hybrid chi tiết, scale,
RPO/RTO, data residency và vendor. Chúng được giữ trong Decision Register và không
ngăn baseline threat model, nhưng có thể đổi likelihood/priority khi được chốt.
