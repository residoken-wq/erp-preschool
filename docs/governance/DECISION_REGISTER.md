# Decision Register

`OPEN` là blocker cần người có thẩm quyền chốt; không phải permission dùng giá trị
ví dụ. Mỗi quyết định được chấp nhận phải tạo/cập nhật ADR và ghi approver/evidence.

| ID | Quyết định cần chốt | Owner role | Hạn gate | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| DEC-000 | Root là application source canonical | Product/Architecture | G0 | APPROVED 30/08/2026 | Evidence: Source Promotion Manifest |
| DEC-001 | Chỉ định program/domain/security/privacy owners | Sponsor | G0 | OPEN | Không suy đoán cá nhân |
| DEC-002 | Pilot campus và phạm vi organization | Product/Sponsor | G0 | OPEN | Cần cho scope/UAT |
| DEC-003 | Hosting model | Architecture/Security/Privacy | G1 | APPROVED 30/08/2026 | Hybrid; chi tiết topology ở DEC-021 |
| DEC-004 | Enterprise IdP/OIDC, MFA và account lifecycle | Security/IT | G1 | OPEN | Development actor bị cấm ngoài local/test |
| DEC-005 | PostgreSQL topology, HA, backup, RPO/RTO | Architecture/SRE | G1 | OPEN | Không tự gán RPO/RTO |
| DEC-006 | Object storage, malware scanner và signed access | Security/SRE | G1 | OPEN | HRI document path |
| DEC-007 | Secret manager, KMS/key rotation và audit access | Security/SRE | G1 | OPEN | Không lưu secret trong repo |
| DEC-008 | Observability/SIEM, redaction và evidence retention | Security/SRE/Privacy | G1 | OPEN | HRI không vào telemetry |
| DEC-009 | RLS rollout và DB tenant defense-in-depth | Architecture/Security | G1 | OPEN | Service scope vẫn bắt buộc |
| DEC-010 | SOP owner, approver matrix và Effective lifecycle | SOP Governance | G1 | OPEN | Cần trước import chính thức |
| DEC-011 | Rule/config approval lifecycle và policy reference | Product/Domain/Security | G1 | OPEN | Version/scope/validity bắt buộc |
| DEC-012 | Currency, amount precision, rounding và tax policy | Finance | G2 | OPEN | Decimal + ISO currency |
| DEC-013 | Payment provider/webhook/reconciliation | Finance/Architecture/Security | G2 | OPEN | Không tin payload client |
| DEC-014 | E-sign provider và legal evidence | Legal/Product/Security | G2 | OPEN | Không tuyên bố compliance khi chưa review |
| DEC-015 | Messaging providers, consent và delivery policy | Product/Privacy | G2 | OPEN | Adapter + outbox |
| DEC-016 | Retention, deletion, anonymization và legal hold | Privacy/Legal/Data Owners | G2 | OPEN | Theo data class/domain |
| DEC-017 | AI provider/region/retention/training/redaction policy | AI Gov/Privacy/Security | trước AI-0 | OPEN | Cấm gửi HRI khi chưa approved |
| DEC-018 | AI use-case risk taxonomy, eval threshold và kill switch | AI Gov/Product/Security | trước AI-0 | OPEN | Recommendation/shadow mode đầu tiên |
| DEC-019 | Internet exposure của portal/API | Architecture/Security | G1 | APPROVED 30/08/2026 | Parent/mobile API và admin portal đều Internet-facing |
| DEC-020 | Dữ liệu được phép trước G1 | Product/Privacy/Security | G1 | APPROVED 30/08/2026 | Chỉ synthetic/de-identified; cấm HRI thật |
| DEC-021 | Phân bố component/data giữa cloud/on-prem, region, TLS/mTLS và network segmentation | Architecture/Security/Privacy | G1 | OPEN | Bắt buộc trước Internet deployment |

## Mẫu bằng chứng khi đóng quyết định

Ghi decision ID, option được chọn, rationale, scope, security/privacy/financial
impact, approver và role, ngày hiệu lực, ADR/policy link, review date và rollback.
