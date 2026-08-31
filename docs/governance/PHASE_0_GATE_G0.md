# Phase 0 — Gate G0 Evidence

**Gate status: NOT READY FOR PASS**  
**Ngày đánh giá:** 30/08/2026

| Exit criterion | Evidence | Status |
|---|---|---|
| Một canonical source | Source Promotion Manifest: 90/90 checksum match | PASS |
| CI từ clean checkout | local baseline commit `b533f75`; remote `main` commit `21e5f42`; GitHub Actions run `33293376641` | PASS |
| Named Product/Security/Data/Pilot owners | Program Governance | BLOCKED — DEC-001/002 |
| 28 SOP mapped/deduplicated | Canonical SOP Register; source count discrepancy recorded | PASS baseline; approval pending |
| Decision Register có owner/deadline | role owner và gate recorded | PASS baseline; named owners pending |
| Backlog Phase 1–2 đạt DoR | Backlog + Traceability baseline | REVIEW REQUIRED |
| Threat/data-flow baseline reviewed | `erp-preschool-threat-model.md`; assumptions validated | REVIEW REQUIRED — Security/Privacy owner sign-off |
| Test/environment strategy | Environment and Test Strategy | REVIEW REQUIRED |

## Điều kiện còn thiếu để ký PASS

1. Sponsor chỉ định tối thiểu Product, Security, Data/SOP và Pilot Process Owner.
2. Security/Privacy owner review threat model và đưa TM-001/TM-004 cùng các high
   threats vào Phase 1 backlog/gate.
3. Chỉ định Security/Privacy/domain owners và gán CODEOWNERS path-specific cho
   HRI/auth/finance/AI; technical review gate đã được áp dụng.
4. Product/Architecture/Security/Privacy review backlog, traceability và open decisions.

## Execution evidence ngày 30/08/2026

| Check | Kết quả |
|---|---|
| Node/package manager | Node `22.23.2`; pnpm `10.15.1` đúng pin |
| Frozen install | PASS; lockfile unchanged, 326 packages |
| Lint | PASS, 6 workspace projects |
| Strict typecheck | PASS, 6 workspace projects |
| Unit | PASS: domain 4 + API permission 4 + config 3 = 11 tests |
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
| DEC-020 data ingestion guard | PASS local 31/08/2026: CI + seed validator, registered provenance, path/symlink/contact fail-closed, Lead API `422` negative policy test; remote CI evidence pending PR |

Smoke bao gồm health/security headers, context/dashboard/list, create lead, missing
permission `403`, prohibited pre-G1 ingestion `422`, duplicate `409`, invalid
transition `409` và audit-chain integrity.

## Lỗi baseline đã sửa trong Phase 0

1. Seed PostgreSQL dùng một parameter bị suy luận `text`/`varchar` không nhất quán;
   thêm cast SQL tường minh và kiểm chứng idempotent.
2. Workspace package export trỏ vào TypeScript `src`, làm Node production không
   khởi động; compiler tiếp tục dùng source types, runtime chuyển sang `dist`.
3. Dockerfiles dùng frozen install nhưng thiếu `pnpm-lock.yaml`; đã bổ sung lockfile
   và build bốn image thành công.
