# NS-004 — Governance Owner Nomination and Pilot Scope

**Status:** AWAITING SPONSOR NOMINATION  
**Decision links:** DEC-001, DEC-002  
**Gate:** G0

Tài liệu này là form thu thập bằng chứng, không tự tạo authority. Một vai trò chỉ
chuyển `ACCEPTED` khi có approval reference của Sponsor/người có thẩm quyền, ngày
hiệu lực, scope và xác nhận nhận trách nhiệm.

Repository hiện public. Chỉ ghi team alias hoặc GitHub handle đã được phép công
khai; không ghi email, điện thoại, chữ ký, HR record hoặc thông tin cá nhân nội bộ.
Biên bản bổ nhiệm riêng tư phải lưu trong hệ thống được phê duyệt và chỉ đưa
evidence ID không nhạy cảm vào repository.

## 1. Owner nomination

| Role | Public team/handle | Scope | Private approval evidence ID | Effective date | Acceptance evidence ID | Status |
|---|---|---|---|---|---|---|
| Executive Sponsor | TBD | program, risk acceptance, Go/No-Go | TBD | TBD | TBD | OPEN |
| Product Owner | TBD | scope, priority, acceptance | TBD | TBD | TBD | OPEN |
| Program/Delivery Lead | TBD | plan, dependency, gate evidence | TBD | TBD | TBD | OPEN |
| SOP Governance Owner | TBD | canonical ID, lifecycle, publish | TBD | TBD | TBD | OPEN |
| Security Owner | TBD | controls, exception/waiver | TBD | TBD | TBD | OPEN |
| Privacy/DPO role | TBD | HRI purpose, transfer, retention | TBD | TBD | TBD | OPEN |
| Solution Architect | TBD | ADR, boundary, NFR | TBD | TBD | TBD | OPEN |
| Data Owner — Admission | TBD | classification, access, quality | TBD | TBD | TBD | OPEN |
| Campus Pilot Owner | TBD | UAT, training, readiness | TBD | TBD | TBD | OPEN |
| AI Governance Owner | TBD | use case, risk, eval, kill switch | TBD | trước AI-0 | TBD | OPEN |

Một team/handle có thể giữ nhiều vai trò trong giai đoạn đầu nếu Sponsor phê duyệt,
nhưng Security/Privacy approval, financial approval và các quyết định yêu cầu SoD
phải có reviewer độc lập theo policy.

## 2. Pilot campus and organization scope

| Field | Approved value | Approval evidence ID | Status |
|---|---|---|---|
| Organization public code | TBD | TBD | OPEN |
| Pilot campus public code | TBD | TBD | OPEN |
| Business timezone (IANA) | TBD | TBD | OPEN |
| Hosting boundary reference | Hybrid — chi tiết chờ DEC-021 | DEC-003 | PARTIAL |
| Internet exposure | Parent/mobile và admin đều Internet-facing | DEC-019 | APPROVED |
| Data allowed before G1 | Synthetic/de-identified only; no real HRI | DEC-020 | APPROVED |
| Pilot capability scope | SOP OS + Lead-to-Enrollment | roadmap baseline; Sponsor approval TBD | PROPOSED |
| Explicitly excluded domains | TBD | TBD | OPEN |
| UAT user cohorts (roles, no names) | TBD | TBD | OPEN |
| Pilot start window | TBD | TBD | OPEN |
| Pilot exit/rollback authority | TBD | TBD | OPEN |

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
bản bổ nhiệm hoặc quyết định Sponsor.
