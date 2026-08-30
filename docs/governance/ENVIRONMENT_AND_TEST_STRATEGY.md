# Environment and Test Strategy

| Environment | Dữ liệu | Auth/provider | Mục đích |
|---|---|---|---|
| Local | synthetic | development actor + mock adapter | developer feedback |
| CI | deterministic synthetic | development/test only | frozen install, migration, test, build |
| Integration | synthetic/anonymized approved | enterprise IdP test tenant, sandbox adapters | contract/integration/security |
| Staging/UAT | synthetic hoặc de-identified được duyệt | production-like, không dev actor | E2E, UAT, recovery, performance |
| Production | approved real data | enterprise IdP + approved providers | operation sau Go/No-Go |

## Test pyramid và gates

- Unit: pure domain/rule/state/redaction/output validator.
- Integration: PostgreSQL constraint/migration/transaction/audit/outbox/scope.
- Contract: DTO/error/idempotency/webhook/adapter.
- E2E: SOP critical happy, exception/rework và direct API negative.
- Security/privacy: cross-scope, permission, SoD, mass assignment, upload/export,
  prompt injection/data leakage khi có AI.
- Accessibility và recovery là gate, không phải kiểm tra tùy chọn cuối dự án.

CI dùng frozen lockfile và synthetic seed. Staging/production phải fail startup nếu
còn `AUTH_MODE=development`, fake actor hoặc wildcard permission. Thời hạn lưu test
evidence và performance/RPO/RTO target phụ thuộc Decision Register.

