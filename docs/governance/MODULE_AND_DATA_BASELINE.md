# Module Context, Table Ownership và Data Gap Baseline

Đánh giá source canonical ngày 30/08/2026; đây là gap register, không phải phê duyệt
âm thầm để sửa schema hoặc business rule.

## Context ownership mục tiêu

| Context/module | Code hiện có | Table sở hữu | Không được làm |
|---|---|---|---|
| Platform Identity/Policy | `apps/api/src/platform`, Phase 1 | organizations, campuses, user_accounts, roles, permissions, role scopes | domain tự parse dev header/IdP claim |
| Governance/SOP | `modules/process`, `modules/sop` | process_nodes/dependencies, sops/versions/sections/steps/comments | Admission query table SOP trực tiếp |
| Admission | `modules/admission`, `packages/domain` | persons, leads/interactions, applications, assessments, offers, enrollments, contracts, fee_plans, handover | generic status PATCH; confirm payment |
| Work Management | `modules/operations` | work_items | dùng work item thay domain state |
| Audit/Outbox | platform + worker | audit_events, outbox_events, security_events | sửa/xóa audit; domain gửi provider trực tiếp |
| Documents | Phase 1 adapter | application_documents metadata; object binary ngoài DB | tải pending/infected; public object key |
| Traceability/Rules/Approval | Phase 1 mới | migration `0007`/`0008` dự kiến | JSON không schema/owner để né model |

Module chỉ trao đổi qua typed application contract/command/event. Cross-module read
cho reporting cần projection/query service có owner và vẫn enforce tenant/ACL.

## Data/schema gaps ưu tiên

| Gap | Evidence hiện tại | Risk | Xử lý dự kiến |
|---|---|---|---|
| Tenant FK không composite | nhiều FK chỉ reference UUID, dù row có `organization_id` | cross-org reference | `0006`, composite candidate key/FK + negative test |
| Authorization chưa có domain/data class | permission chỉ resource+action; wildcard dev logic | over-privilege/HRI exposure | P1-E01/02; prod guard, richer policy |
| Root entity timezone có default production-like | organization default `Asia/Ho_Chi_Minh` | hardcoded assumption | migrate sang required approved config; reconcile existing row |
| Fee currency/default/precision chưa approved | `VND`, `numeric(18,2)` trong `fee_plans` | financial integrity | DEC-012 + ADR/migration forward-fix |
| SOP lifecycle scope chưa đủ | one Effective per SOP, chưa campus/scope validity rule | sai version theo scope/time | DEC-010 + SOP lifecycle migration |
| Trace BR/FR/AC/Test chưa có schema | chỉ tài liệu baseline | mất lineage | `0007_governance_traceability.sql` |
| Approval/rule config chưa có | approved_by fields rời rạc | SoD/policy inconsistency | P1-E06/07, `0007`/`0008` |
| JSONB contract chưa đầy đủ schema | result/terms/schedule/checklist JSONB | weak validation/reporting | versioned schema hoặc normalize theo use case |
| Secure file path chưa hoàn chỉnh | metadata có storage key/scan status, chưa adapter/access grant | HRI malware/leak | P1-E09, `0009` |
| Admission relationship/consent/checklist còn thiếu | person/application baseline tối giản | legal/privacy/flow blocker | refine SOP-ADM-001; `0010` |
| Worker dispatch là stub đồng bộ | `dispatch()` chỉ log rồi mark processed | false delivery | P1-E10 typed adapter/result/DLQ/reconcile |
| Audit hash scope hạn chế | DB hash chain, app writer chưa least privilege/verify độc lập | false tamper-proof claim | ADR-010 controls + verification job decision |
| Retention/legal hold không có | chưa có policy/schema | premature delete/over-retention | DEC-016; domain data inventory/migration |
| RLS chưa có | migration chưa enable policy | defense gap | DEC-009 spike; service scope remains mandatory |

## Data classification baseline

- `persons`, child/guardian/application/assessment/enrollment/contract/document và
  handover content: `HRI`.
- fee/approval/audit/security/provider metadata: tối thiểu `CON`, có thể `HRI` khi
  liên kết hồ sơ trẻ.
- internal SOP draft, role/config/operations: `INT` hoặc `CON` theo nội dung.
- Không có table nào mặc nhiên `PUB`; publication là use-case và projection riêng.

Mỗi migration mới phải bổ sung data inventory đến field-level cho HRI/financial
fields, retention owner và purpose; catalog này chỉ là baseline cấp entity.

