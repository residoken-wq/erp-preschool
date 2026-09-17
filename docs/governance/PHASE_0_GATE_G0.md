# Phase 0 — Gate G0 Evidence

**Gate status: NOT READY FOR PASS**  
**Ngày đánh giá:** 02/09/2026

| Exit criterion | Evidence | Status |
|---|---|---|
| Một canonical source | Source Promotion Manifest: 90/90 checksum match | PASS |
| CI từ clean checkout | local baseline commit `b533f75`; remote `main` commit `21e5f42`; GitHub Actions run `33293376641` | PASS |
| Named Product/Security/Data/Pilot owners | GOV-FOUNDER-2026-001; Program Governance; GH-ISSUE-16-INDEP-REVIEWER-ACK-V1 | PASS — founder roles effective 01/09/2026; independent reviewer accepted 02/09/2026; Security/Privacy owners remain interim/no self-sign-off |
| 28 SOP mapped/deduplicated | Canonical SOP Register; source count discrepancy recorded | PASS baseline; approval pending |
| Decision Register có owner/deadline | role owner và gate recorded | PASS baseline; open decisions still require disposition |
| Backlog Phase 1–2 đạt DoR | Backlog + Traceability baseline | REVIEW REQUIRED |
| Threat/data-flow baseline reviewed | `erp-preschool-threat-model.md`; assumptions validated | REVIEW REQUIRED — Security/Privacy owner sign-off |
| Test/environment strategy | Environment and Test Strategy | REVIEW REQUIRED |

## Điều kiện còn thiếu để ký PASS

1. Security/Privacy owner + independent reviewer hoàn tất review tại Issue #22 và
   đưa TM-001/TM-004 cùng các high threats vào Phase 1 backlog/gate.
2. Mở lại required approval theo DEC-022 trước product/production hoặc HRI thật.
3. Product/Architecture/Security/Privacy review backlog, traceability và open decisions,
   gồm DEC-004/DEC-021 tại Issue #20.

## Execution evidence ngày 30/08/2026

| Check | Kết quả |
|---|---|
| Node/package manager | Node `22.23.2`; pnpm `10.15.1` đúng pin |
| Frozen install | PASS; lockfile unchanged, 326 packages |
| Lint | PASS, 6 workspace projects |
| Strict typecheck | PASS, 6 workspace projects |
| Unit | PASS (30/08/2026 snapshot): domain 7 + API permission 4 + config 3 + data-policy script 7 = 21 tests. Stale — see 15/09/2026 note below for current count. |
| Build | PASS: Web/API/Worker/shared packages |
| Compose config | PASS |
| Empty DB migrations | PASS: `0001`–`0005` trên PostgreSQL 16 |
| Synthetic seed | PASS 2 lần liên tiếp sau fix cast parameter |
| API smoke local | PASS |
| Docker image builds | PASS: migrate/API/worker/web với frozen lockfile |
| Full container stack | API/PostgreSQL healthy; Web/Worker/MinIO running; smoke PASS |
| Cleanup | stack stopped; volumes giữ lại, không xóa dữ liệu test |
| Git baseline | PASS local: root commit `b533f750ab9538d5ff48ed7c979947cbeebe128f`, 230 files |
| Remote clean-checkout CI | PASS: `origin/main` commit `21e5f42ae74d35c45393b8f63eae96a9a7a665ab`; [run 33293376641](https://github.com/residoken-wq/erp-preschool/actions/runs/33293376641); jobs `quality` và `compose-config` |
| Local restart lifecycle | PASS: `scripts/local-services.sh` stop/start giữ volumes; migration/seed idempotent; API/Web ready; smoke PASS |
| Repository protection | PARTIAL/DEFERRED (DEC-022): strict `quality`/`compose-config`, PR flow, admin enforcement, linear history, conversation resolution và force-push/delete controls active; required approval/CODEOWNERS review tạm tắt, phải bật lại trước product/production hoặc HRI thật |
| DEC-020 data ingestion guard | PASS 31/08/2026: merge `52cf4d0`; [main CI run 33352332700](https://github.com/residoken-wq/erp-preschool/actions/runs/33352332700); CI + seed validator, registered provenance, path/symlink/contact fail-closed và Lead API `422` negative policy test |

Smoke bao gồm health/security headers, context/dashboard/list, create lead, missing
permission `403`, prohibited pre-G1 ingestion `422`, duplicate `409`, invalid
transition `409` và audit-chain integrity.

## Cập nhật 15/09/2026 — không đổi gate status

Branch `feat/task-workflow-ui` (outbox delivery runtime, task board, demo
journey UI, pagination, Application → Offer → Enrollment → Finance →
Handover backend) đã được merge cục bộ vào `merge/task-workflow-ui-into-main`
và verify lại toàn bộ gate (`data:guard`, `lint`, `typecheck`, `test`,
`build`, `docker compose config`) trên checkout sạch — hiện có 35+ test case
qua 10 file vitest cộng 3 script test, thay cho con số 21 ở snapshot
30/08/2026. Một bug thứ tự script (`test` chạy trước `build`, làm test import
`@sop-os/domain` fail trên checkout sạch) đã được sửa bằng `pretest` hook.
Nội dung này **không** làm Gate G0 chuyển `PASS`: NS-005/NS-006/NS-007 vẫn là
điều kiện bắt buộc, và code admission mới thuộc phạm vi Phase 2 (P2-E05–E09),
được xây trước khi Phase 1 platform hardening (OIDC, RLS, approval/rule
engine, secure upload) tồn tại — xem `docs/backlog/PHASE_1_2_BACKLOG.md` và
`docs/CODEX_EXECUTION_PLAN.md` cho chi tiết và rủi ro sequencing này. Merge
branch chưa được push lên `origin` (chưa có credential trong phiên làm việc
review này); push và mở PR vẫn là việc của Repository Owner.

## Lỗi baseline đã sửa trong Phase 0

1. Seed PostgreSQL dùng một parameter bị suy luận `text`/`varchar` không nhất quán;
   thêm cast SQL tường minh và kiểm chứng idempotent.
2. Workspace package export trỏ vào TypeScript `src`, làm Node production không
   khởi động; compiler tiếp tục dùng source types, runtime chuyển sang `dist`.
3. Dockerfiles dùng frozen install nhưng thiếu `pnpm-lock.yaml`; đã bổ sung lockfile
   và build bốn image thành công.
