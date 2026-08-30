# SOP OS — Complete Analysis & Release Package

> **Archived snapshot:** Application source was promoted to the repository root
> during Phase 0 on 30/08/2026. `02_Release_Candidate_Source` is now read-only;
> the repository root is canonical. See
> `docs/governance/SOURCE_PROMOTION_MANIFEST.md` for inventory and verification.

Gói này tổng hợp toàn bộ hồ sơ đã phân tích và xây dựng trong lộ trình 12 bước
cho SOP Web App quản lý SOP Governance và Lead-to-Enrollment.

## Cấu trúc

### 01_Analysis_Documents

1. `ERP cho trường mầm non/Đã dán markdown (1).md` — tài liệu nguồn ban đầu.
2. `SOP_Web_App_Implementation_Plan.md` — kế hoạch triển khai tổng thể.
3. `PRODUCT_CHARTER_SOP_WEB_APP_MVP.md` — Product Charter và phạm vi MVP.
4. `MASTER_PROCESS_ARCHITECTURE_LEAD_TO_ENROLLMENT.md` — kiến trúc quy trình.
5. `CANONICAL_DATA_MODEL_AND_DICTIONARY_MVP.md` — mô hình dữ liệu và dictionary.
6. `INFORMATION_ARCHITECTURE_USER_FLOWS_SCREEN_SPEC_MVP.md` — IA, user flow và screen specification.
7. `PRODUCT_BACKLOG_FUNCTIONAL_SPECIFICATION_MVP.md` — backlog và functional specification.
8. `TECHNICAL_ARCHITECTURE_AND_ADR_PACK_MVP.md` — kiến trúc kỹ thuật và ADR.
9. `UI_DESIGN_SYSTEM_AND_PROTOTYPE_SPEC_MVP.md` — UI Design System và prototype specification.
10. `DETAILED_SOP_PILOT_PACK_ADM_001_010.md` — SOP chi tiết ADM-001…ADM-010.
11. `SOP_OS_MVP_SEED_TEST_DATA.json` — seed/test data baseline.

### 02_Release_Candidate_Source

Mã nguồn release candidate cuối cùng gồm:

- Next.js Web App.
- NestJS API.
- Background worker.
- PostgreSQL migrations và seed loader.
- SOP Governance, Lead/Application/Offer/Enrollment/Handover workflows.
- Audit/outbox, permission policy và security hardening.
- Docker Compose, CI/CD, smoke test và pilot gate.
- ADR, API contract, runbook, UAT và SOP-012 Pilot Release.

Các thư mục dependency và build output như `node_modules`, `.next`, `dist` được
loại khỏi gói để giảm dung lượng; chạy `pnpm install` và `pnpm build` để tái tạo.

### 03_Release_History

- `SOP_OS_MVP_SPRINT_0_SCAFFOLD.zip`
- `SOP_OS_MVP_STEP_11.zip`
- `SOP_OS_STEP_12_RELEASE_CANDIDATE.zip`

## Trạng thái xác minh cuối

- ESLint: Pass.
- Strict TypeScript: Pass.
- Unit tests: 11/11 Pass.
- Production build: Pass.
- JSON/YAML/script validation: Pass.
- Release candidate ZIP integrity: Pass.

## Lưu ý triển khai

Thiết kế và release-candidate implementation đã hoàn tất 12/12 bước. Trước khi
production pilot vẫn phải hoàn thành staging, OIDC/IdP, vulnerability scan,
backup/restore test, UAT và Go/No-Go sign-off theo `SOP-012`.
