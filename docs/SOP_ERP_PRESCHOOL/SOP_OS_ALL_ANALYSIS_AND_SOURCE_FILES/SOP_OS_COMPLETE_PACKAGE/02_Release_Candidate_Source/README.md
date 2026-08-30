# SOP OS MVP

MVP candidate cho hệ thống quản trị SOP và quy trình Lead-to-Enrollment.

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
docker compose up -d --build
```

- Web: http://localhost:3000
- API health: http://localhost:3001/api/v1/health
- MinIO console: http://localhost:9001

## Chạy development

```bash
cp .env.example .env
pnpm install --frozen-lockfile=false
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

## Security notes

- `AUTH_MODE=development` chỉ dùng local/dev.
- Production phải dùng OIDC, secret manager, TLS và provider credentials riêng.
- Demo seed là dữ liệu tổng hợp; không copy production PII vào Dev/Test.
- System Admin không tự động có quyền xem HRI.

## Seed từ Bước 9

`scripts/seed.mjs` nhận đường dẫn JSON tùy chọn:

```bash
node scripts/seed.mjs ../SOP_OS_MVP_SEED_TEST_DATA.json
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
