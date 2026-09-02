# NS-006 — Identity and Hybrid Boundary Decision Intake

**Status:** DECISION INTAKE READY — APPROVAL BLOCKED

**Decision links:** DEC-004, DEC-021

**Gate:** G0 decision disposition; implementation evidence required again at G1

**Decision request:** [GitHub Issue #20](https://github.com/residoken-wq/erp-preschool/issues/20)

**IT / IdP Tenant Owner:** `@residoken-wq`, assigned effective `2026-09-02` under
[evidence `GH-ISSUE-20-IT-OWNER-ASSIGN-V1`](https://github.com/residoken-wq/erp-preschool/issues/20#issuecomment-5504506583)

Tài liệu này chuẩn bị dữ liệu để người có thẩm quyền chốt kiến trúc. Nó không chọn
nhà cung cấp, không cấp quyền triển khai Internet/HRI và không thay thế Security /
Privacy review. Cho đến khi có quyết định được duyệt, `AUTH_MODE=development` chỉ
được dùng local/test và DEC-020 tiếp tục cấm dữ liệu HRI thật.

## 1. Baseline đã được duyệt

- Deployment target: hybrid (`DEC-003`).
- Parent/mobile API và admin portal đều Internet-facing (`DEC-019`).
- Trước G1 chỉ dùng synthetic/de-identified data (`DEC-020`).
- Pilot baseline: `KIDS-EDU-GROUP` / `CAMPUS-01-HCM`,
  `Asia/Ho_Chi_Minh`, SOP OS + Lead-to-Enrollment (`DEC-002`).
- Domain nhận actor context chuẩn hóa qua typed OIDC adapter; không phụ thuộc trực
  tiếp provider claim (`ADR-007`, đang Proposed).

Các giá trị issuer, audience, client ID, tenant/domain hoặc endpoint chỉ được ghi
vào repository nếu owner xác nhận chúng public-safe. Không ghi client secret,
private key, token, cấu hình firewall nội bộ hoặc private evidence vào issue/PR.

## 2. DEC-004 — Enterprise IdP/OIDC

### 2.1 Input bắt buộc từ Security/IT

| Field | Giá trị cần quyết định | Trạng thái |
|---|---|---|
| IdP/provider và tenant owner | Tenant owner `@residoken-wq` assigned; provider vẫn phải qua vendor/privacy review | PARTIAL — OWNER ASSIGNED; PROVIDER OPEN |
| User populations | Staff/admin, parent/guardian và service identity; xác nhận tách hay dùng chung tenant | OPEN |
| OIDC flow | Flow cho browser/mobile/API; callback/logout pattern; PKCE requirement | OPEN |
| Token trust | Issuer, audience(s), JWKS discovery/cache, algorithm allowlist và key-rotation behavior | OPEN |
| Identity key | Cặp `issuer + subject` làm external identity key; quy trình link/unlink account | OPEN |
| Claim mapping | Claim tối thiểu để tìm account; organization/campus/domain permission phải resolve server-side | OPEN |
| MFA/step-up | Nhóm bắt buộc MFA, phương thức được phép, recovery và action cần step-up | OPEN |
| Session policy | Access/session/idle/max lifetime, refresh/revocation và clock-skew policy | OPEN |
| Lifecycle | Provision, disable/terminate, role-change source of truth, SLA và reconciliation | OPEN |
| Break-glass | Owner, custody, monitoring, expiry/review và post-use audit | OPEN |
| Non-production | Test tenant/accounts synthetic; cấm dùng production identity/HRI ngoài gate | OPEN |

### 2.2 Control không được hạ thấp

1. Staging/production fail startup nếu còn development actor hoặc wildcard
   permission; client-supplied actor/org/campus không phải trusted identity.
2. API xác minh signature, issuer, audience, expiry/not-before và key rotation;
   token lỗi hoặc account disabled phải fail closed với stable error.
3. IdP group/role không tự trở thành quyền nghiệp vụ. API resolve action +
   organization + campus + domain + data class từ dữ liệu được quản trị server-side.
4. Parent và staff phải có mapping/policy rõ ràng; System Admin không mặc nhiên đọc
   HRI. Link account cần chống account takeover và luôn audit.
5. Log/telemetry không chứa token, secret hoặc claim HRI/PII không cần thiết.

### 2.3 Evidence để đóng DEC-004

- Provider/tenant decision và approval reference public-safe.
- MFA, session và account-lifecycle policy đã duyệt.
- Claim-mapping contract và owner của directory/application role mapping.
- Privacy/Security review; test tenant readiness; rollback/fallback procedure.
- ADR-007 chuyển `Accepted` với approver role, effective date và review date.

## 3. DEC-021 — Hybrid component/data boundary

### 3.1 Disposition cần chọn

| Pattern | Mô tả | Trade-off cần review |
|---|---|---|
| A — Cloud core + campus edge | Web/API/worker/data services ở approved cloud region; campus chỉ có managed access/edge khi cần | Vận hành đơn giản hơn; cần duyệt residency, provider, Internet dependency và campus outage mode |
| B — Cloud application + on-prem data | Internet ingress/application ở cloud; database/object storage trong controlled on-prem boundary | Tăng latency/availability và network complexity; cần private connectivity, mTLS và recovery evidence |
| C — On-prem core + cloud edge | Core application/data on-prem; cloud chỉ làm protected ingress/edge | Tăng yêu cầu HA, patching, DDoS/WAF, capacity và vận hành tại chỗ |

Không pattern nào được coi là mặc định. Architecture đề xuất một pattern kèm data
residency, threat và cost evidence; Security/Privacy phải review trước approval.

### 3.2 Placement matrix phải hoàn tất

| Component/data | Cloud / on-prem / campus edge | Region/location class | Network exposure | Data class | Owner | Status |
|---|---|---|---|---|---|---|
| WAF/load balancer/ingress | TBD | TBD | Internet-facing | INT/CON metadata | TBD | OPEN |
| Web | TBD | TBD | Internet-facing through ingress | PUB/INT; no trusted auth state | TBD | OPEN |
| API | TBD | TBD | Through ingress only | CON/HRI processing | TBD | OPEN |
| Worker/integration egress | TBD | TBD | Allowlisted outbound | CON/HRI by use case | TBD | OPEN |
| PostgreSQL | TBD | TBD | Private only | CON/HRI | TBD | OPEN |
| Object storage/quarantine | TBD | TBD | Private; signed access via authorized flow | HRI | TBD | OPEN |
| IdP connection | External/TBD | TBD | OIDC endpoints only | CON identity metadata | TBD | OPEN |
| Secret manager/KMS | TBD | TBD | Workload identity/private endpoint | HRI/CON control plane | TBD | OPEN |
| Logs/SIEM | TBD | TBD | Private/controlled export | INT/CON, redacted | TBD | OPEN |
| Backup/recovery copy | TBD | TBD | Private | Same class as source | TBD | OPEN |
| Campus edge/offline store | None/TBD | Campus scope TBD | No unsolicited inbound | HRI only if separately approved | TBD | OPEN |

### 3.3 Network, crypto và failure decisions

- Approved cloud/on-prem region and data-residency/legal reference.
- Public DNS, CDN/WAF/DDoS boundary, TLS termination and certificate owner.
- Private subnets/routes, firewall allowlist, administrative access and egress
  control; database/object/KMS không public.
- Nơi bắt buộc mTLS hoặc workload identity; secret rotation và key separation.
- Campus/WAN outage behavior, recovery objectives theo DEC-005, backup isolation và
  restore authority. Không tự gán RPO/RTO.
- Provider failure/retry/dead-letter/reconciliation; notification failure không
  rollback business transaction đã commit.
- Redacted observability flow và security-event routing theo DEC-008.

### 3.4 Evidence để đóng DEC-021

- Approved placement matrix và reviewed data-flow/trust-boundary diagram.
- Network/TLS/mTLS/secret/KMS responsibility matrix; provider/region references.
- Threat disposition cho TM-006 và mọi threat `high` bị topology tác động.
- Failure/rollback/recovery plan và owner; no-public-DB/object/KMS verification plan.
- ADR mới hoặc ADR-011 bổ sung production topology, với approver role/effective date.

## 4. Approval response template

Người có thẩm quyền phản hồi qua evidence channel phù hợp; issue public chỉ chứa
giá trị public-safe:

```text
Decision: DEC-004 and/or DEC-021
Selected option / approved values:
Rationale and scope:
Security/Privacy impact:
Exceptions or unresolved blockers:
Approver public handle and role:
Approval evidence ID:
Effective date:
Review date:
Rollback owner/reference:
```

Nếu thiếu reviewer acceptance hoặc required input, decision giữ `OPEN`; không dùng
giá trị ví dụ để bắt đầu NS-101, staging Internet deployment hoặc xử lý HRI thật.
