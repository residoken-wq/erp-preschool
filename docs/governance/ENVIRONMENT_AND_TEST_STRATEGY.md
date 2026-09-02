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

## DEC-020 executable controls trước G1

- `pnpm data:guard` quét mọi JSON dưới `database/seed` trước migration/seed trong
  CI; dataset phải khai báo policy schema v1, unique ID, provenance, purpose,
  owner role, `contains_real_hri=false` và reference `DEC-020`.
- `scripts/seed.mjs` dùng cùng validator và chỉ đọc regular JSON file bên dưới
  `database/seed`; không cho path traversal hoặc symlink.
- Synthetic contact chỉ dùng IANA example domain và non-routable `+000`. Dataset
  de-identified cần approval evidence ID, phương pháp de-identification và source
  fingerprint SHA-256; các giá trị `TBD` bị từ chối.
- Current HRI ingestion surface `POST /leads` yêu cầu provenance synthetic, prefix
  tên `Synthetic-` và reserved contact. Negative unit/smoke tests chứng minh HTTP
  `422` xảy ra trước transaction.

Guard giúp chặn ingestion nhầm ở các surface hiện có, không khẳng định có thể tự
nhận diện mọi dữ liệu người thật trong free text. Quy trình data minimization và
review vẫn bắt buộc; khi thêm import/upload/AI surface phải tích hợp guard tương
đương trước khi enable.

## Local service lifecycle

Từ application root, dùng `./scripts/local-services.sh start` sau khi máy hoặc
Docker daemon restart. Lệnh chạy migration/seed idempotent, chờ API/Web ready và
không xóa PostgreSQL/MinIO volumes. Dùng `rebuild` sau khi source hoặc dependency
thay đổi; `status`, `logs`, `restart`, `smoke` và `stop` phục vụ vận hành local.
`smoke` chờ API/Web rồi chạy suite synthetic API/security với `API_ORIGIN` lấy từ
`LOCAL_API_ORIGIN`. Trước G1, mọi lần chạy chỉ được dùng synthetic/de-identified data.
