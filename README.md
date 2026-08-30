# ERP Preschool — SOP OS MVP

Root repository là source canonical cho MVP quản trị SOP và quy trình
Lead-to-Enrollment. Roadmap triển khai nằm tại `docs/IMPLEMENTATION_ROADMAP.md`.
Bản source lồng trong `docs/.../02_Release_Candidate_Source` là snapshot lịch sử
chỉ đọc; không phát triển song song ở đó.

## Kiến trúc

- `apps/web`: Next.js Web.
- `apps/api`: NestJS API.
- `apps/worker`: Outbox/scheduler worker.
- `packages/contracts`: API/domain contracts dùng chung có kiểm soát.
- `packages/domain`: State machine và domain rules thuần TypeScript.
- `packages/config`: Environment validation.
- `database/migrations`: PostgreSQL migrations.
- `database/seed`: Seed mẫu không chứa dữ liệu thật.
- `scripts`: Migration và seed commands.

## Yêu cầu

- Node.js 22 LTS trở lên.
- pnpm 10.
- Docker Engine và Docker Compose v2.

## Chạy nhanh bằng Docker

```bash
cp .env.example .env
./scripts/local-services.sh start
```

- Web: http://localhost:3000
- API health: http://localhost:3001/api/v1/health
- MinIO console: http://localhost:9001

Sau khi restart máy, chạy lại từ application root:

```bash
./scripts/local-services.sh start
```

Các lệnh vận hành local không xóa volume dữ liệu:

```bash
./scripts/local-services.sh status
./scripts/local-services.sh logs
./scripts/local-services.sh restart
./scripts/local-services.sh rebuild  # dùng sau khi source/dependency thay đổi
./scripts/local-services.sh stop
```

Có thể dùng alias pnpm tương ứng: `pnpm local:start`, `pnpm local:rebuild`,
`pnpm local:status`, `pnpm local:logs`, `pnpm local:restart` và `pnpm local:stop`.

## Chạy development

```bash
cp .env.example .env
pnpm install --frozen-lockfile
docker compose up -d postgres minio
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Quality gates

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose config
pnpm smoke
```

Quy tắc thay đổi và các register Phase 0 nằm trong `AGENTS.md` và
`docs/governance/`. Mọi phase sau Phase 0 chỉ bắt đầu sau khi exit gate tương ứng
được phê duyệt.

## Security notes

- `AUTH_MODE=development` chỉ dùng local/dev.
- Production phải dùng OIDC, secret manager, TLS và provider credentials riêng.
- Demo seed là dữ liệu tổng hợp; không copy production PII vào Dev/Test.
- System Admin không tự động có quyền xem HRI.

## Seed từ Bước 9

`scripts/seed.mjs` nhận đường dẫn JSON tùy chọn:

```bash
node scripts/seed.mjs docs/SOP_ERP_PRESCHOOL/SOP_OS_ALL_ANALYSIS_AND_SOURCE_FILES/SOP_OS_COMPLETE_PACKAGE/01_Analysis_Documents/SOP_OS_MVP_SEED_TEST_DATA.json
```

Nếu không truyền, script dùng `database/seed/demo-seed.json`.

## Trạng thái Step 11

MVP Sprint 1–7 đã có vertical slice từ SOP Registry/Studio/Approval đến Lead,
Application, Offer, Enrollment, Finance Setup và Handover. Dashboard, work queue,
audit/outbox, dữ liệu demo và CI smoke test đã được tích hợp.

Xem `docs/SPRINT_1_7_REPORT.md` và `docs/API_CONTRACT_MVP.md`. Các lựa chọn IdP,
hosting, object-storage production, RPO/RTO và RLS vẫn cần ADR approval trước pilot.

## Step 12 — Release readiness

Security hardening, UAT catalog, pilot rollout và sign-off template nằm tại:

- `docs/SOP_012_UAT_SECURITY_PILOT_RELEASE.md`
- `docs/UAT_SIGNOFF_TEMPLATE.md`
- `docs/STEP_12_RELEASE_READINESS_REPORT.md`

Release chỉ được xem là production-ready sau khi các gate staging, OIDC,
security scan, restore test và business sign-off đã đạt.
