# Release Candidate Source — Engineering Instructions

File này bổ sung `AGENTS.md` ở repository root cho source Next.js/NestJS/PostgreSQL
hiện tại. Quy tắc gần source này được ưu tiên khi có khác biệt về cách chạy tool.

## Stack và package boundaries

- Runtime: Node.js 22+, pnpm 10, TypeScript strict.
- Web: Next.js trong `apps/web`.
- API: NestJS trong `apps/api`.
- Async: worker/outbox trong `apps/worker`.
- Pure domain: `packages/domain`; không import NestJS, `pg`, HTTP hoặc process env.
- Shared wire contracts: `packages/contracts`.
- Environment parsing: `packages/config`.
- PostgreSQL migrations: `database/migrations`.

Không đặt domain rule trong controller hoặc React component. Controller parse DTO,
gọi application service và map response. Transaction, state guard, authorization
theo object scope, audit và outbox nằm trong application/domain flow.

## Lệnh chuẩn

Chạy từ thư mục chứa file này:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

Khi có thay đổi database/API:

```bash
pnpm db:migrate
pnpm db:seed
pnpm smoke
```

`pnpm db:reset:dev` phá hủy schema development; chỉ chạy khi user yêu cầu rõ hoặc
đã xác nhận đúng database disposable. Không chạy với URL chưa được kiểm tra.

## TypeScript và contracts

- Không dùng `any`; thu hẹp `unknown` tại boundary.
- Thay `Record<string, unknown>` bằng DTO/schema và response type có tên khi chạm
  vào endpoint hiện hữu.
- Dùng exact union/state constants từ domain/contracts; không lặp string rải rác.
- Không dùng non-null assertion để né kiểm tra state/data.
- Function domain ưu tiên pure, deterministic và test table-driven.
- Import giữ ESM convention hiện tại (`.js` trong source import khi TypeScript config yêu cầu).
- Dependency mới phải có lý do, license/security check và exact version policy.

## NestJS/API

- Mọi route không-public phải có permission cụ thể; route public phải được đánh dấu
  rõ thay vì dựa vào metadata rỗng.
- Bật global validation cho DTO/schema: whitelist, reject unknown và transform có
  kiểm soát. Có giới hạn body/upload.
- Không tin `x-actor-*`, `x-campus-*`, permission hoặc role từ client ngoài development.
- Query theo object phải lọc `organization_id` và campus scope trong SQL/repository.
- Dashboard/report cũng phải áp dụng campus scope; aggregate cấp organization cần
  permission enterprise riêng.
- Mutation dùng transaction helper để không quên rollback/release, audit và outbox.
- Transition phải đi qua explicit state machine; không `UPDATE status` trực tiếp.
- SoD kiểm tra actor so với creator/requester/approver, không chỉ permission string.
- Tạo idempotency record cho issue/accept/payment/webhook và lệnh có retry.

## PostgreSQL

- Không sửa migration `0001`–`0005`; tạo migration tiếp theo.
- Không giả định migration đã apply chỉ vì SQL chạy: migration record và schema
  change phải có transaction/recovery semantics rõ.
- Mọi reference giữa entity tenant-scoped phải chống cross-organization FK.
- Thêm index theo query plan thực, không theo phỏng đoán; verify bằng representative data.
- Numeric tiền phải thống nhất precision đã được ADR chốt; không đổi ngầm từ
  `numeric(18,2)` sang giá trị khác.
- `jsonb` authoring/config cần schema version và validation ở write/read boundary.
- Không cascade-delete child/HRI records chỉ vì user/guardian bị disable.

## Frontend

- Component không tự quyết permission; API là enforcement point. UI chỉ ẩn/disable
  để cải thiện trải nghiệm.
- Không render HRI rồi che bằng CSS. Chỉ nhận projection đã mask/omit từ API.
- Tách data access, view state và presentational component khi mở rộng file lớn
  `sop-os-app.tsx`; không tiếp tục gom toàn bộ application vào một component.
- Mọi mutation hiển thị loading, success, safe error và conflict 409 recovery.
- Workflow critical không dùng optimistic success trước server confirmation.
- Giữ keyboard/focus/label/error summary và responsive flow cho approval/read-only.

## Worker và integrations

- Không đánh dấu outbox `PROCESSED` nếu adapter chưa thực sự giao/ghi nhận kết quả.
- Consumer/provider call phải async, timeout, idempotent và phân loại retryable vs
  permanent error; dead-letter có reconciliation/alert.
- Không log event payload. Chỉ log ID/type/correlation và safe provider status.
- Scheduled job dùng campus timezone/config version; xử lý DST/timezone và missed run.
- Payment, e-sign, notification, OIDC, storage và AI đều qua typed adapter.

## Tests bắt buộc khi chạm code liên quan

- State/rule: unit test mọi transition hợp lệ và transition bị chặn.
- Query: integration test cross-organization và cross-campus denial.
- Mutation: test optimistic lock/idempotency, audit và outbox trong cùng transaction.
- Permission: direct API negative test, wildcard chỉ ở development fixture.
- File/webhook: signature/replay/type/size/quarantine test.
- UI P0: Playwright happy path, exception path và accessibility smoke.
- AI: mock provider ở unit/integration; live-model test không nằm trong deterministic CI.

Trước handoff chạy `pnpm check`. Khi schema/API thay đổi, chạy thêm migration + seed
trên PostgreSQL sạch và `pnpm smoke`; nêu rõ bất kỳ gate nào chưa chạy.
