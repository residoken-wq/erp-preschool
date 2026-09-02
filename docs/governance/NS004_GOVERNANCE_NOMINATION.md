# NS-004 — Governance Owner Nomination and Pilot Scope

**Status:** COMPLETE — PILOT BASELINE AND REVIEWER ROLE ACCEPTED

**Decision links:** DEC-001, DEC-002

**Gate:** G0

**Decision request:** [GitHub Issue #16](https://github.com/residoken-wq/erp-preschool/issues/16)

**Authority evidence:** [Solo-founder declaration](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5473520431),
`GOV-FOUNDER-2026-001`, effective `2026-09-01`

**Pilot decision:** [Baseline approval](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5473620736),
`DOC-PILOT-SCOPE-2026-V1`, effective `2026-09-01`

**Reviewer acceptance:** [Verified-account response](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5503933802),
`GH-ISSUE-16-INDEP-REVIEWER-ACK-V1`, effective `2026-09-02`

Tài liệu này là form thu thập bằng chứng, không tự tạo authority. Một vai trò chỉ
chuyển `ACCEPTED` khi có approval reference của Sponsor/người có thẩm quyền, ngày
hiệu lực, scope và xác nhận nhận trách nhiệm.

Repository hiện public. Chỉ ghi team alias hoặc GitHub handle đã được phép công
khai; không ghi email, điện thoại, chữ ký, HR record hoặc thông tin cá nhân nội bộ.
Biên bản bổ nhiệm riêng tư phải lưu trong hệ thống được phê duyệt và chỉ đưa
evidence ID không nhạy cảm vào repository.

## 1. Owner nomination

| Role | Public handle | Scope | Approval evidence ID | Effective date | Acceptance evidence ID | Status |
|---|---|---|---|---|---|---|
| Executive Sponsor | `@residoken-wq` | program, risk acceptance, Go/No-Go | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — EFFECTIVE 2026-09-01 |
| Product Owner | `@residoken-wq` | scope, priority, acceptance | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — EFFECTIVE 2026-09-01 |
| Program/Delivery Lead | `@residoken-wq` | plan, dependency, gate evidence | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — EFFECTIVE 2026-09-01 |
| SOP Governance Owner | `@residoken-wq` | canonical ID, lifecycle, publish | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — EFFECTIVE 2026-09-01 |
| Security Owner | `@residoken-wq` | accountable control owner; no self-sign-off/waiver | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | INTERIM — INDEPENDENT SIGN-OFF REQUIRED |
| Privacy/DPO role | `@residoken-wq` | accountable HRI owner; no self-sign-off | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | INTERIM — INDEPENDENT SIGN-OFF REQUIRED |
| Solution Architect | `@residoken-wq` | ADR, boundary, NFR | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — EFFECTIVE 2026-09-01 |
| IT / IdP Tenant Owner | `@residoken-wq` | IdP tenant, OIDC registration, lifecycle coordination, fallback | Issue #20 assignment | 2026-09-02 | GH-ISSUE-20-IT-OWNER-ASSIGN-V1 | ACCEPTED — DEC-004 VALUES OPEN |
| Data Owner — Admission | `@residoken-wq` | classification, access, quality, minimization | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — EFFECTIVE 2026-09-01 |
| Campus Pilot Owner | `@residoken-wq` | synthetic pilot preparation, UAT plan, rollback | GOV-FOUNDER-2026-001 | 2026-09-01 | GH-ISSUE-16-FOUNDER-ACK-V1 | ACCEPTED — SYNTHETIC PILOT ONLY |
| Independent Security/Privacy Reviewer | `@phamhanghula-ui` | independent G0 threat/privacy review; no risk-waiver authority | Issue #16 nomination | 2026-09-02 | GH-ISSUE-16-INDEP-REVIEWER-ACK-V1 | ACCEPTED — REVIEW NOT YET SIGNED OFF |
| AI Governance Owner | TBD | use case, risk, eval, kill switch | TBD | trước AI-0 | TBD | OPEN |

Một team/handle có thể giữ nhiều vai trò trong giai đoạn đầu nếu Sponsor phê duyệt,
nhưng Security/Privacy approval, financial approval và các quyết định yêu cầu SoD
phải có reviewer độc lập theo policy.

## 2. Pilot campus and organization scope

| Field | Approved value | Approval evidence ID | Status |
|---|---|---|---|
| Organization public code | `KIDS-EDU-GROUP` | DOC-PILOT-SCOPE-2026-V1 | APPROVED — BASELINE PLANNING |
| Pilot campus public code | `CAMPUS-01-HCM` | DOC-PILOT-SCOPE-2026-V1 | APPROVED — SYNTHETIC BASELINE PILOT |
| Business timezone (IANA) | `Asia/Ho_Chi_Minh` | DOC-PILOT-SCOPE-2026-V1 | APPROVED |
| Hosting boundary reference | Hybrid — chi tiết chờ DEC-021 | DEC-003 | PARTIAL |
| Internet exposure | Parent/mobile và admin đều Internet-facing | DEC-019 | APPROVED |
| Data allowed before G1 | Synthetic/de-identified only; no real HRI | DEC-020 | APPROVED |
| Pilot capability scope | SOP OS + Lead-to-Enrollment | DOC-PILOT-SCOPE-2026-V1 + Issue #16 baseline decision | APPROVED — BASELINE |
| Explicitly excluded domains | All domains not explicitly included are excluded | Issue #16 baseline decision | APPROVED |
| UAT user cohorts (roles, no names) | Must be derived from baseline scope; no real users before applicable gates | TBD readiness evidence | PLANNING REQUIRED |
| Pilot start window | 2026-10-01 through 2026-12-31 | DOC-PILOT-SCOPE-2026-V1 | SUBMITTED — NOT A GO-LIVE APPROVAL |
| Pilot exit/rollback authority | Founder holds both submitted aliases | DOC-PILOT-SCOPE-2026-V1 | SOD/RISK REVIEW REQUIRED |

Không ghi địa chỉ campus, danh sách nhân sự, trẻ hoặc phụ huynh vào form public này.
Nếu campus identity được phân loại nội bộ, chỉ dùng code đã được phép công khai.

## 3. Minimum acceptance evidence

NS-004 chỉ được đóng khi:

1. Tối thiểu Product, Security, Privacy/Data, SOP và Campus Pilot Owner có status
   `ACCEPTED`, scope và evidence ID.
2. Executive Sponsor hoặc delegate hợp lệ phê duyệt DEC-001 và DEC-002.
3. Pilot organization/campus code, timezone, capability scope và exclusions được
   chốt; không dùng tên/địa chỉ nhạy cảm trong public repository.
4. CODEOWNERS được map path-specific tới các team/handle đã phê duyệt; technical
   collaborator không mặc nhiên trở thành governance owner.
5. `PROGRAM_GOVERNANCE.md`, `DECISION_REGISTER.md`, checklist và Gate G0 được cập
   nhật trong cùng PR, có required independent review.

## 4. Sponsor submission

Sponsor/người được ủy quyền cung cấp các giá trị đã duyệt qua kênh phù hợp. Người
cập nhật repository phải đối chiếu evidence ID, loại bỏ dữ liệu cá nhân không cần
thiết và mở PR. Approval trên PR là review kỹ thuật/evidence; không thay thế biên
bản bổ nhiệm hoặc quyết định Sponsor. Issue #16 là intake tracker public-safe;
comment trên issue cũng không tự trở thành approval nếu thiếu authority/evidence.

## 5. Solo-founder limitations after role acceptance

1. Security and Privacy accountability is assigned on an interim basis, but the
   founder cannot independently sign off their own threat disposition, privacy
   decision or risk waiver. The accepted independent reviewer must still perform
   and evidence the NS-005 review.
2. The roadmap baseline is approved. Previously submitted expanded capabilities
   are later-wave candidates only and require their applicable owners and gates.
3. `@phamhanghula-ui` accepted only the independent G0 Security/Privacy reviewer
   role; this does not assign Product, Security Owner, Privacy/DPO, Data Owner,
   Architecture or risk-waiver authority. Required GitHub approval remains
   deferred by DEC-022.
4. No real HRI or real-parent pilot is allowed before G1 and the applicable
   Go/No-Go decision.

Reviewer nomination is recorded at
[Issue #16](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5473623519),
and `@phamhanghula-ui` accepted from the verified account in
[the follow-up response](https://github.com/residoken-wq/erp-preschool/issues/16#issuecomment-5503933802).
This closes role acceptance only and makes NS-005 ready for review; it does not
make Gate G0 pass.
