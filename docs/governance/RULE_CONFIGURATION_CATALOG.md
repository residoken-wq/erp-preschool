# Rule and Configuration Catalog

## Canonical schema

Mỗi rule cần tối thiểu: `rule_key`, `domain`, `purpose`, `data_type`, `value`,
`unit/currency`, `organization_id`, `campus_id` nullable, `valid_from`, `valid_to`,
`version`, `status`, `policy_reference`, `verification_status`, `owner_role`,
`approved_by`, `approved_at`, `created_reason` và audit before/after.

Lifecycle: `PROPOSED -> VERIFIED -> APPROVED -> EFFECTIVE -> RETIRED`. Không có
production default khi thiếu approval. Rule pháp lý cần policy reference và owner.

| Catalog ID | Nhóm rule cần quản lý | Kiểu | Scope | Data class | Owner | Trạng thái |
|---|---|---|---|---|---|---|
| CFG-001 | timezone nghiệp vụ | IANA timezone | org/campus | INT | Operations | OPEN |
| CFG-002 | SLA phản hồi/xử lý | duration | org/campus/domain | INT | Domain owner | OPEN |
| CFG-003 | giờ chốt/hold/expiry | local time/duration | org/campus | CON | Operations | OPEN |
| CFG-004 | phí/học phí/đặt cọc | decimal + currency | org/campus/program | CON/HRI | Finance | OPEN |
| CFG-005 | discount và approval tier | decimal/rule matrix | org/campus | CON | Finance | OPEN |
| CFG-006 | financial approval limit | decimal + currency | org/role | CON | Finance | OPEN |
| CFG-007 | tỷ lệ giáo viên/trẻ | ratio | campus/age group | HRI | Academic/Legal | OPEN |
| CFG-008 | nhiệt độ và medical escalation | quantity + unit | org/campus | HRI | Medical/Legal | OPEN |
| CFG-009 | attendance/check-in cutoff | time/rule | campus | HRI | Campus Ops | OPEN |
| CFG-010 | retention/deletion/legal hold | duration/policy | domain/data class/jurisdiction | HRI/CON | Privacy/Legal | OPEN |
| CFG-011 | upload type/size/access TTL | allowlist/size/duration | domain/data class | HRI/CON | Security | OPEN |
| CFG-012 | webhook replay/idempotency window | duration | provider/event | CON | Security/Finance | OPEN |
| CFG-013 | notification consent/channel | rule matrix | org/campus/purpose | HRI/CON | Privacy/Product | OPEN |
| CFG-014 | AI confidence/escalation/cost budget | decimal/rule/budget | use case | HRI/CON | AI Governance | OPEN |

## Runtime rules

- Resolve bằng server-side actor scope và business timestamp; client không được
  chọn organization/campus rule ngoài scope.
- Fail closed với security, safeguarding, medical và financial rules bị thiếu,
  hết hiệu lực hoặc conflict; trả stable error và correlation ID.
- Cache phải chứa version/scope, có invalidation và không bypass approval.
- Seed/test chỉ dùng giá trị synthetic được gắn rõ `NON_PRODUCTION`.

