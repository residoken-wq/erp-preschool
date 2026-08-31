# Next Steps Checklist — G0 Closure to Phase 1

**Cập nhật:** 30/08/2026  
**Nguyên tắc:** Không bắt đầu code Phase 1 hoặc nhập HRI thật trước khi Gate G0 được
ký PASS. Mỗi checkbox chỉ được đóng khi có evidence; `TBD` không phải approval.

## A. Đóng Gate G0

- [x] **NS-001 — Tạo Git baseline canonical** (`COMPLETE`)
  - Owner role: Engineering Lead.
  - Việc làm: kiểm tra remote history, ignore, artifact, secret, inventory; tạo
    initial commit từ canonical root.
  - Evidence:
    - root commit `b533f750ab9538d5ff48ed7c979947cbeebe128f`;
    - tree `15138b5f619bce2347461a4e28c9f51562e6c1e6`;
    - 230 file, 2,543,926 byte, 41,454 dòng baseline;
    - remote `origin/main` đã được tạo ở NS-002; working tree sạch sau commit;
    - không phát hiện private key/token pattern độ tin cậy cao;
    - `.env`, `node_modules`, `.next`, `dist`, coverage và `tsbuildinfo` bị ignore.
  - Whitespace note: baseline giữ nguyên whitespace của master SOP và archived
    snapshot để không sửa artifact trong cùng promotion/history change.
  - Không push trong bước này; push là external change riêng tại NS-002.

- [x] **NS-002 — Push baseline và chạy remote CI clean checkout** (`COMPLETE`)
  - Owner role: Repository Owner/Engineering Lead.
  - Dependency: NS-001 và quyền push GitHub.
  - Evidence:
    - `origin/main` trỏ tới commit
      `21e5f42ae74d35c45393b8f63eae96a9a7a665ab`;
    - [GitHub Actions run 33293376641](https://github.com/residoken-wq/erp-preschool/actions/runs/33293376641)
      hoàn tất `success` ngày 30/08/2026;
    - job `quality` PASS: frozen install, migration `0001`–`0005`, synthetic seed,
      lint, typecheck, 11 unit tests, build và API smoke;
    - job `compose-config` PASS: `docker compose config --quiet`.

- [ ] **NS-003 — Cấu hình branch protection/CODEOWNERS thật** (`TECHNICAL PASS — DOMAIN OWNERS PENDING`)
  - Owner role: Repository Owner.
  - Dependency: tên GitHub team/user và NS-002.
  - Applied evidence ngày 30/08/2026:
    - `.github/CODEOWNERS` có verified fallback `@residoken-wq` và independent
      technical reviewer `@phamhanghula-ui`;
    - GitHub API xác nhận `main` yêu cầu strict checks `quality` và
      `compose-config`, PR flow, linear history, conversation resolution và áp
      dụng administrator; force-push/delete đều tắt;
    - [CI run 33294895595](https://github.com/residoken-wq/erp-preschool/actions/runs/33294895595)
      cho commit `57bd3d5b7c9c50550c90838d0427d33fe37f2ae2` PASS;
    - [PR #10](https://github.com/residoken-wq/erp-preschool/pull/10) đưa independent
      reviewer vào CODEOWNERS qua required CI; merge commit `89dbedc`;
    - GitHub API sau merge xác nhận required approval `1`, required CODEOWNERS
      review, dismiss stale review và require last-push approval đều bật;
    - `scripts/github-protection.sh` cung cấp bootstrap/review-gate/verify command.
  - Governance note: `@phamhanghula-ui` đã được GitHub API xác minh là direct
    collaborator quyền `write`, nhưng chưa được gán vai trò Product/Security/
    Privacy/Data/Architecture.
  - Required: PR-only `main`, required CI, required review, no force-push/delete,
    Security/Privacy review cho HRI/auth/finance/AI.
  - Evidence còn thiếu để COMPLETE: approved Security/Privacy/domain owner handles
    và path-specific CODEOWNERS mapping cho HRI/auth/finance/AI.

- [ ] **NS-004 — Chỉ định governance owners và pilot campus** (`NEXT — NOMINATION REQUIRED`)
  - Owner role: Executive Sponsor.
  - Required: Product Owner, Security Owner, Privacy/Data Owner, SOP Owner, Pilot
    Process Owner và campus pilot.
  - Evidence: cập nhật `PROGRAM_GOVERNANCE.md`, approved public team/handle,
    non-sensitive approval evidence ID và effective date.
  - Input form: `NS004_GOVERNANCE_NOMINATION.md`; chỉ dùng public team/handle và
    non-sensitive approval evidence ID vì repository public.

- [ ] **NS-005 — Security/Privacy sign-off threat model** (`BLOCKED`)
  - Owner role: Security Owner + Privacy/Data Owner.
  - Review: `erp-preschool-threat-model.md`; xác nhận TM-001/TM-004 là release
    blocker và disposition cho toàn bộ threat `high`.
  - Evidence: reviewer, date, decision, accepted mitigation/waiver owner/deadline.

- [ ] **NS-006 — Chốt kiến trúc identity và hybrid boundary** (`BLOCKED`)
  - Owner role: Architecture + Security + Privacy/IT.
  - Decisions: DEC-004 enterprise IdP/MFA/session/claim mapping và DEC-021 phân bố
    component/data, region, ingress/WAF, TLS/mTLS, firewall, secret/KMS.
  - Evidence: ADR accepted và reviewed data-flow diagram.

- [ ] **NS-007 — Gate G0 review** (`PENDING`)
  - Owner role: Product + Architecture + Security/Privacy.
  - Dependency: NS-001–NS-006 hoặc risk acceptance đúng thẩm quyền.
  - Evidence: `PHASE_0_GATE_G0.md` chuyển `PASS`, approver/date và không còn blocker
    critical thiếu disposition.

## B. Phase 1 kickoff — chỉ sau NS-007

- [ ] **NS-101 — S3 Identity/OIDC vertical slice**
  - JWT/JWKS issuer/audience/expiry validation, disabled-user lookup, trusted actor
    mapping, parent/staff separation và production image không có dev actor path.
  - Tests: missing/invalid/expired/wrong audience/disabled/forged dev headers.

- [ ] **NS-102 — S3 scoped authorization skeleton**
  - Policy action + organization + campus + domain + data class; deny default;
    server-side role-scope resolution và SoD primitives.
  - Tests: cross-org/campus/domain/class, wildcard rejection và object-not-in-scope.

- [ ] **NS-103 — S4 API boundary hardening**
  - Runtime schema, reject unknown, body/depth/string/array bounds, rate/timeout,
    stable error, pagination và correlation.

- [ ] **NS-104 — S4 tenant database hardening**
  - Migration `0006`: composite tenant constraints, negative DB tests, least DB
    roles và RLS spike/decision; migration empty + previous-version evidence.

- [ ] **NS-105 — S5 approval/rule/traceability services**
  - SoD approval engine, versioned effective configuration, BR/FR/AC/Test links và
    audit/outbox/idempotency integration tests.

## C. Data and AI guardrails xuyên suốt

- [x] Trước G1 chỉ dùng synthetic/de-identified data; cấm HRI thật (DEC-020).
- [ ] Tạo CI/data-ingestion guard chứng minh DEC-020, không chỉ dựa vào quy trình.
- [ ] Không bật upload/provider/AI endpoint trước control và test của TM-010/TM-011.
- [ ] AI-0 phải có use-case owner, risk tier, provider/privacy approval, Effective-only
  retrieval, ACL-before-context, eval, reviewer và kill switch.

## Definition of Ready cho bước kế tiếp

Một bước chỉ chuyển `IN PROGRESS` khi dependency đã đạt, owner có tên, acceptance
và evidence path rõ. Không giảm auth, scope, test, audit hoặc validation để vượt gate.
