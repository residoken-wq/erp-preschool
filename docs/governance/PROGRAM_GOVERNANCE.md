# Program Governance — Phase 0 Baseline

## Vai trò cần chỉ định

| Vai trò | Trách nhiệm quyết định | Người/nhóm | Trạng thái |
|---|---|---|---|
| Executive Sponsor | ngân sách, risk acceptance, Go/No-Go | TBD | OPEN |
| Product Owner | scope, priority, acceptance | TBD | OPEN |
| Program/Delivery Lead | plan, dependency, evidence gate | TBD | OPEN |
| SOP Governance Owner | canonical ID, lifecycle, publish | TBD | OPEN |
| Security Owner | security control, exception/waiver | TBD | OPEN |
| Privacy/DPO role | HRI purpose, transfer, retention | TBD | OPEN |
| Solution Architect | ADR, boundary, NFR | TBD | OPEN |
| Data Owner theo domain | classification, access, quality | TBD | OPEN |
| Campus Pilot Owner | UAT, training, readiness | TBD | OPEN |
| AI Governance Owner | AI use-case/risk/eval/kill switch | TBD | OPEN trước AI-0 |

Không có tên cá nhân nào được suy đoán. Product Sponsor phải chỉ định role owner
trước khi Gate G0 được ký đạt.

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

