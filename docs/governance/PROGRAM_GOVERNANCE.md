# Program Governance — Phase 0 Baseline

## Vai trò cần chỉ định

| Vai trò | Trách nhiệm quyết định | Người/nhóm | Trạng thái |
|---|---|---|---|
| Executive Sponsor | ngân sách, risk acceptance, Go/No-Go | `@residoken-wq` | ACCEPTED — effective 2026-09-01 |
| Product Owner | scope, priority, acceptance | `@residoken-wq` | ACCEPTED — effective 2026-09-01 |
| Program/Delivery Lead | plan, dependency, evidence gate | `@residoken-wq` | ACCEPTED — effective 2026-09-01 |
| SOP Governance Owner | canonical ID, lifecycle, publish | `@residoken-wq` | ACCEPTED — effective 2026-09-01 |
| Security Owner | security control, exception/waiver | `@residoken-wq` | INTERIM — no self-sign-off/waiver |
| Privacy/DPO role | HRI purpose, transfer, retention | `@residoken-wq` | INTERIM — no self-sign-off |
| Solution Architect | ADR, boundary, NFR | `@residoken-wq` | ACCEPTED — effective 2026-09-01 |
| IT / IdP Tenant Owner | IdP tenant, OIDC registration, lifecycle coordination and fallback | `@residoken-wq` | ACCEPTED — effective 2026-09-02 |
| Data Owner — Admission | classification, access, quality | `@residoken-wq` | ACCEPTED — effective 2026-09-01 |
| Campus Pilot Owner | synthetic UAT planning and rollback | `@residoken-wq` | ACCEPTED — synthetic pilot only |
| Independent Security/Privacy Reviewer | G0 threat/privacy review; no risk-waiver authority | `@phamhanghula-ui` | ACCEPTED — effective 2026-09-02 |
| AI Governance Owner | AI use-case/risk/eval/kill switch | TBD | OPEN trước AI-0 |

Không có tên cá nhân nào được suy đoán. Product Sponsor phải chỉ định role owner
trước khi Gate G0 được ký đạt.

Nomination, acceptance, public-repository privacy rules và pilot scope được thu
thập tại `NS004_GOVERNANCE_NOMINATION.md`. GitHub collaborator/CODEOWNER chỉ là
technical reviewer, không tự động trở thành governance owner.

Solo-founder authority is recorded by `GOV-FOUNDER-2026-001` and
[Issue #16 declaration](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5473520431).
Combining accountable roles is permitted for this stage, but does not waive SoD:
independent Security/Privacy sign-off, financial approval and high-risk waiver
remain external/open controls.

Independent reviewer nomination is recorded in
[Issue #16](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5473623519),
and the nominated account posted
[acceptance](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5503933802)
on 2026-09-02 under evidence ID `GH-ISSUE-16-INDEP-REVIEWER-ACK-V1`.
Role acceptance does not constitute threat/privacy sign-off or risk acceptance.

IT / IdP Tenant Owner assignment is recorded in
[Issue #20](https://github.com/residoken-wq/erp-preschool/issues/20#issuecomment-5504506583)
under evidence ID `GH-ISSUE-20-IT-OWNER-ASSIGN-V1`. This assigns accountability
but does not approve an IdP/provider, DEC-004 values or self-sign-off.

## Nhịp quản trị đề xuất

- Weekly delivery: backlog, blocker, decision due, evidence.
- Biweekly sprint review: acceptance và demo bằng synthetic data.
- Monthly architecture/security/privacy review.
- Gate review cuối phase: Product + domain owner + Architecture + Security/Privacy;
  Finance/Safeguarding/Medical/AI tham gia khi scope liên quan.
- Risk/incident critical được escalate ngay, không chờ cadence.

## Nguyên tắc phê duyệt

- Người tạo yêu cầu không tự approve khi SoD yêu cầu tách vai trò.
- “TBD/OPEN” không được hiểu là đồng ý ngầm.
- Approval phải lưu actor, role, timestamp, version, scope và bằng chứng.
- Phase sau không bắt đầu chỉ dựa trên ngày; phải có exit evidence và sign-off.
