# Codex Execution Plan — trạng thái code đã verify và backlog kế tiếp

**Cập nhật:** 15/09/2026. **Cơ sở đánh giá:** branch `merge/task-workflow-ui-into-main`
(local, chưa push) = `main` (`a7077e4`) merge với `origin/feat/task-workflow-ui`
(`b5714d4`) không conflict, cộng một commit fix build order. Mọi câu trong tài liệu
này được xác nhận bằng cách đọc code hoặc chạy gate thật, không suy từ tài liệu khác.

Tài liệu này KHÔNG thay thế `AGENTS.md` (quy tắc bắt buộc, luôn áp dụng) hay
`docs/IMPLEMENTATION_ROADMAP.md` (kế hoạch chương trình dài hạn, đã duyệt Phase 0).
Đây là lớp "hiện trạng + việc kế tiếp" nằm giữa hai tài liệu đó, dùng cho coding agent
(Codex/Claude Code) chọn task mà không phải đọc lại toàn bộ 20+ file governance.

**Hai track song song kể từ 15/09/2026:**

- **Track A (tài liệu này):** hardening code Admission/SOP OS hiện có — đúng phạm vi đã
  merge, không mở rộng nghiệp vụ. Áp dụng gate production đầy đủ theo AGENTS.md.
- **Track B — `docs/CODEX_FULL_DEMO_PLAN.md`:** mở rộng toàn bộ 28 canonical SOP / 75
  domain thành một bản demo đầy đủ UI/UX, theo yêu cầu Repository Owner, trên một
  **Demo Track** có nới lỏng rõ ràng (mock provider, không OIDC/RLS thật) và không đổi
  Gate G0 hay định hướng production. Đọc kỹ mục 0-1 của file đó trước khi bắt đầu Wave
  nào — ranh giới nới lỏng/không nới lỏng được ghi rõ ở đó.

Khuyến nghị hoàn thành T2-T3 dưới đây trước khi mở Wave 1 của Track B, vì Track B tái sử
dụng đúng pattern (`recordMutation`, `StateMachine`, `row_version`) cho ~20 domain khác —
sửa nền tảng trước sẽ rẻ hơn nhân bản lỗi ra nhiều domain.

## 0. Việc không phải của Codex — cần người có thẩm quyền

- **Push `merge/task-workflow-ui-into-main` lên `origin` và mở PR.** Phiên review
  này không có `gh` CLI hay git credential; branch đang nằm local. Repository Owner
  cần push và chạy CI thật trên GitHub trước khi coi merge là xong.
- **NS-005/NS-006/NS-007** (`docs/governance/NEXT_STEPS_CHECKLIST.md`): security/privacy
  sign-off threat model, quyết định identity/hybrid boundary, và review Gate G0. Đây là
  quyết định của Security Owner/Architecture, không phải việc sửa code.
- **Bắt đầu epic Phase 1** (P1-E01 OIDC, P1-E03 tenant RLS, P1-E06/E07 approval/rule
  engine, P1-E09 secure docs — xem `docs/backlog/PHASE_1_2_BACKLOG.md`) chỉ nên bắt đầu
  sau khi Gate G0 `PASS` hoặc có risk acceptance đúng thẩm quyền, theo đúng
  `docs/IMPLEMENTATION_ROADMAP.md` mục 21 "Checklist Ready to Code Phase 1". Có thể
  spike/adapter interface trước nếu owner yêu cầu, nhưng không coi là done.

Task từ mục 2 trở xuống là việc hardening/test-hoá code **đã tồn tại**, không mở thêm
phạm vi nghiệp vụ, nên được phép làm ngay bất kể Gate G0.

## 1. Trạng thái code đã verify (không phải suy từ docs)

### 1.1 Đã chạy thật và pass trên checkout sạch của branch merge

```
pnpm install --frozen-lockfile
pnpm data:guard   # PASS
pnpm lint         # PASS, 6 workspace project
pnpm typecheck    # PASS, 6 workspace project
pnpm test         # PASS sau khi thêm "pretest": "pnpm -r build" vào package.json —
                  #   trước đó FAIL vì apps/api/src/modules/admission/application.service.test.ts
                  #   import "@sop-os/domain", package này export trỏ dist/index.js
                  #   (packages/domain/package.json) nên cần build trước khi test chạy trên
                  #   checkout sạch; CI (.github/workflows/ci.yml) chạy test trước build nên có
                  #   cùng rủi ro — đã sửa bằng pretest hook, chưa sửa lại thứ tự step trong CI.
pnpm build        # PASS: web/api/worker/packages
docker compose config --quiet   # PASS
```

Chưa re-run trong phiên này: `pnpm smoke`, `pnpm outbox:smoke`, `pnpm demo:journey:smoke`
(cần Postgres/API/worker chạy thật; không dựng stack Docker đầy đủ trong lần review này).

### 1.2 Module thật, có logic, không phải stub

| Module | File chính | Ghi chú |
|---|---|---|
| SOP Registry/Studio/Lifecycle | `apps/api/src/modules/sop/sop.service.ts` | draft→review→approve→effective→supersede, completeness gate, chặn self-approval, một Effective/SOP qua partial unique index, optimistic concurrency theo `row_version` ở section. Module trưởng thành nhất. |
| Lead intake | `apps/api/src/modules/admission/lead.service.ts` | duplicate detection, campus scope, guard synthetic-only trước G1 (`packages/domain/src/pre-g1-data-policy.ts`). |
| Application → Offer → Enrollment → Finance → Handover | `apps/api/src/modules/admission/application.service.ts` (322 dòng) | Toàn bộ transactional, audit+outbox cùng transaction (`recordMutation`), row-lock `FOR UPDATE`. `assertOfferApprovalSeparation` (dòng 40-44) chặn tác giả offer tự approve. Transition table Offer ở dòng 32-38, Handover ở dòng 284-286 — viết tay tại chỗ, không dùng `StateMachine` chung như Lead/Application/SOP. |
| Outbox delivery runtime | `apps/worker/src/outbox-runtime.ts`, `postgres-outbox.store.ts`, `outbox-processor.ts` | `SKIP LOCKED` claim, stale-lock reclaim 5 phút, backoff mũ tối đa 3600s, dead-letter sau `MAX_DELIVERY_ATTEMPTS=10`. Chỉ có `DevelopmentConsoleAdapter` (`apps/worker/src/outbox-adapter.ts:18-27`) — fail-closed nếu `OUTBOX_PROVIDER` khác `development-console` hoặc `NODE_ENV=production`. **Chưa có provider thật (email/SMS/webhook) nào.** |
| Task board | `apps/api/src/modules/operations/task.service.ts`, `apps/web/src/app/task-board.tsx` | optimistic concurrency `row_version`, chặn mass-assignment, audit+outbox mỗi lần đổi status. |
| Demo journey UI | `apps/web/src/app/demo-journey.tsx`, `sop-os-app.tsx`, `sop-workspace.tsx` | Chạy thật qua API (không mock), lái đúng chuỗi Lead→Application→Offer→Enrollment→Finance→Handover. |
| Audit hash chain | migration `0005` + `chain_audit_event()` trigger, endpoint `/audit-integrity` (`operations.controller.ts`) | verify được nhưng AGENTS.md §6 lưu ý: chưa có key management/restricted writer/verification độc lập nên không được gọi là chữ ký số/WORM. |
| Migration runner | `scripts/migrate.mjs` | advisory lock, checksum SHA-256 mỗi file, fail closed nếu file đã apply bị sửa nội dung. |
| Health | `apps/api/src/modules/health/health.service.ts` | liveness không phụ thuộc gì; readiness probe DB có timeout 2s → 503. |

### 1.3 Tồn tại nhưng KHÔNG có logic phía sau (đừng coi là done)

- `application_documents`, `assessments` (migration `0004_mvp_workflows.sql`): có bảng,
  **không có** controller/service nào đọc/ghi (đã grep toàn repo để xác nhận). Các state
  `DOCUMENT_REVIEW`, `INCOMPLETE`, `ASSESSMENT_PENDING`, `ASSESSED` trong
  `packages/domain/src/application-state-machine.ts` chỉ là nhãn chuyển trạng thái hợp lệ
  trong state machine, chưa có workflow nghiệp vụ (upload, verify, schedule, finalize).
- OIDC: `packages/config/src/index.ts` chỉ validate sự tồn tại của
  `OIDC_ISSUER`/`OIDC_CLIENT_ID`/`OIDC_CLIENT_SECRET` bằng Zod, không có client/strategy
  nào dùng chúng. `apps/api/src/main.ts` chỉ có nhánh `AUTH_MODE=development` gọi
  `resolveDevelopmentActor`. Nếu set `AUTH_MODE=oidc` hôm nay, không có actor nào được
  resolve — mọi route ngoài public sẽ 403.
- Tenant RLS / composite tenant FK: chưa có, đúng như
  `docs/governance/MODULE_AND_DATA_BASELINE.md` mục gap register đã ghi.
- Approval/rule-config engine (P1-E06/E07): chưa có bảng hay service.
- `OfferStatus`/`EnrollmentStatus`/`HandoverStatus`/`ContractStatus`/`FeePlanStatus`:
  không tồn tại trong `packages/contracts/src/index.ts` (chỉ có `LeadStatus`,
  `ApplicationStatus`, `SopVersionStatus`). Các giá trị status Offer/Enrollment/Handover
  chỉ là chuỗi rời rạc trong `application.service.ts` và CHECK constraint ở DB.

### 1.4 CI coverage thật sự (đọc `.github/workflows/ci.yml`)

CI chạy: `data:guard` → `db:migrate` → `db:seed` → `lint` → `typecheck` → `test` →
`build` → boot API+worker thật với Postgres service container → `pnpm smoke` +
`pnpm outbox:smoke`. `smoke.mjs` kiểm health, context, dashboard, tạo lead, permission
403, duplicate 409, invalid transition 409 — đây là integration coverage thật, không
phải chỉ unit test.

**Golden path Offer→Enrollment→Finance→Handover KHÔNG nằm trong CI** — chỉ có script
`scripts/demo-journey-smoke.mjs` chạy thủ công theo `docs/runbooks/local-demo.md`.
Không có test nào (kể cả unit) gọi trực tiếp `createOffer`/`transitionOffer`/
`createEnrollment`/`createFinanceSetup`/`transitionHandover`; file
`application.service.test.ts` hiện chỉ test hàm thuần `assertOfferApprovalSeparation`
(14 dòng).

## 2. Task queue — thứ tự ưu tiên, mỗi task nhỏ, tự đóng gói được

Mỗi task áp dụng đầy đủ `AGENTS.md` (đặc biệt §9-§13): migration mới nếu cần, test
tương xứng, audit/outbox giữ nguyên, không hạ permission/validation để CI xanh.

### T1 — Đưa golden path Admission vào CI (ưu tiên cao nhất, rủi ro thấp)

**Vì sao:** đây là vertical slice có giá trị nghiệp vụ lớn nhất hiện có nhưng không có
regression net; một thay đổi ở `application.service.ts` có thể phá golden path mà
`pnpm test`/`pnpm smoke` không phát hiện được.

**Việc làm:**
- Thêm bước `pnpm demo:journey:smoke` (hoặc rewrite thành test tích hợp vitest chạy
  trong CI job `quality`, sau bước smoke hiện có) vào `.github/workflows/ci.yml`.
- Nếu `demo-journey-smoke.mjs` phụ thuộc state/data cụ thể của demo seed, xác nhận
  script chạy độc lập nhiều lần trên DB mới migrate+seed (giống các bước CI khác) —
  không phụ thuộc thứ tự chạy trước đó.

**Acceptance criteria:**
- CI job `quality` fail nếu bất kỳ bước nào trong Lead→Application→Offer→Enrollment→
  Finance→Handover bị hỏng.
- `docs/STEP_12_RELEASE_READINESS_REPORT.md` và README mục "Golden path... chưa nằm
  trong CI" được cập nhật lại thành đã có, sau khi merge.

### T2 — Test tích hợp trực tiếp cho `ApplicationService` (Offer/Enrollment/Finance/Handover)

**Vì sao:** T1 kiểm tra qua HTTP/UI nhưng không thay thế integration test ở tầng
service — theo AGENTS.md §11, mutation quan trọng cần integration test cho transaction/
audit/outbox/RLS-scope, không chỉ E2E smoke.

**Việc làm:** thêm test (đặt cạnh `application.service.test.ts`, cần Postgres thật —
theo pattern CI hiện có, không mock DB) cho:
- `createOffer` chặn khi application không ở `DECISION_PENDING`.
- `transitionOffer` chặn transition không hợp lệ (409) và tác giả tự approve (đã có
  unit test cho hàm thuần, cần thêm test qua service thật với 2 actor khác nhau).
- `createEnrollment` chặn khi offer chưa `ACCEPTED`; xác nhận `handover_packages` được
  tạo kèm.
- `createFinanceSetup` chặn khi `totalAmount < 0` hoặc enrollment sai status.
- `transitionHandover` chặn `READY` khi checklist chưa complete, bắt buộc `reason` khi
  `RETURNED`.
- Mỗi transition thành công có đúng một dòng `audit_events` + `outbox_events` tương ứng
  (theo pattern `recordMutation`).

**Acceptance criteria:** `pnpm --filter @sop-os/api test` cover cả 5 method trên với ít
nhất 1 happy path + 1 negative path mỗi method; không giảm test hiện có.

### T3 — Tách Offer/Handover thành `StateMachine` dùng chung trong `packages/domain`

**Vì sao:** Lead/Application/SOP đều dùng `StateMachine<TState>` (`packages/domain/src/state-machine.ts`)
với transition table khai báo tường minh, unit-test độc lập. Offer (`application.service.ts:32-38`)
và Handover (dòng 284-286) viết transition table tại chỗ bằng `Record<string, readonly string[]>`
thô, không dùng lớp `StateMachine`, không unit-test độc lập khỏi HTTP layer — không nhất
quán với pattern hiện có và khó tái dùng nếu module khác cần đọc transition hợp lệ.

**Việc làm:**
- Thêm `offer-state-machine.ts` và `handover-state-machine.ts` vào `packages/domain/src`,
  export qua `packages/domain/src/index.ts`, theo đúng khuôn `sop-state-machine.ts`/
  `lead-state-machine.ts`.
- Thêm `OfferStatus`, `EnrollmentStatus`, `HandoverStatus`, `ContractStatus`,
  `FeePlanStatus` vào `packages/contracts/src/index.ts` (union type theo đúng giá trị
  CHECK constraint trong `database/migrations/0004_mvp_workflows.sql`).
- Sửa `application.service.ts` dùng state machine mới thay transition table cục bộ;
  giữ nguyên hành vi (không đổi API contract, không đổi status string).
- Unit test cho hai state machine mới, theo mẫu `packages/domain/src/state-machine.test.ts`.

**Acceptance criteria:** `pnpm typecheck`/`pnpm test`/`pnpm build` vẫn pass; API request/
response không đổi (không phải breaking change); `docs/API_CONTRACT_MVP.md` không cần
sửa vì hành vi HTTP giữ nguyên.

### T4 — Đóng gap `application_documents`/`assessments` bằng quyết định rõ ràng, không để ngầm hiểu nhầm

**Vì sao:** hiện trạng dễ gây hiểu lầm — bảng đã có, state machine cho phép chuyển qua
`DOCUMENT_REVIEW`/`ASSESSMENT_PENDING`, nhưng không ai enforce gì cả. Đây không phải
việc code tự quyết — theo AGENTS.md §12 bước 5 ("Chốt config/decision còn thiếu hoặc
ghi blocker có owner"), cần một trong hai hướng:

**Option A (nếu owner xác nhận scope Phase 2 cần secure document ngay):** implement tối
thiểu — upload metadata + trạng thái review cho `application_documents`, và
schedule/result/finalize cơ bản cho `assessments`, theo đúng P1-E09 (secure docs) yêu
cầu quarantine/scan/signed access trước khi cho phép tải file thật xuống. Việc này phụ
thuộc P1-E09 tồn tại — **không tự ý bật upload endpoint thật nếu chưa có quarantine/scan
adapter** (AGENTS.md §6, §7.3, TM-010 trong threat model).

**Option B (khuyến nghị cho tới khi Gate G0 pass):** không implement, nhưng:
- Thêm comment ngắn ở `application-state-machine.ts` chú thích các state này chưa có
  workflow backing (why, không phải what).
- Ghi rõ trong `docs/governance/MODULE_AND_DATA_BASELINE.md` (đã có gap "Secure file path
  chưa hoàn chỉnh" — bổ sung câu xác nhận `assessments` cũng chưa có code) rằng đây là
  blocker chờ P1-E09/DEC-006, có owner.

**Acceptance criteria:** không còn tài liệu nào ngụ ý document/assessment review đã hoạt
động; nếu chọn Option A, có đủ test theo AGENTS.md §11 (upload allowlist/size, quarantine,
signed access, permission âm tính) trước khi coi là done.

### T5 — Sửa thứ tự `test`/`build` trong CI cho khớp với fix local

**Vì sao:** T0 (đã làm trong phiên review, xem mục 1.1) thêm `pretest` hook ở
`package.json` root nên `pnpm test` tự build trước khi test — đã đủ để CI hiện tại
(`.github/workflows/ci.yml` gọi `pnpm test` rồi `pnpm build`) không còn fail. Task này
chỉ cần xác nhận lại trên GitHub Actions thật sau khi push (không phải chỉ ở máy local)
và cân nhắc bỏ bước `build` riêng trong CI nếu nó trở thành dư thừa hoàn toàn — nhưng
KHÔNG bỏ nếu build có side-effect nào khác lint/typecheck/test không phủ (ví dụ Next.js
type-check nội bộ khi build).

**Acceptance criteria:** GitHub Actions run trên PR merge branch xanh với `pretest`
hook, không cần thay đổi thêm.

## 3. Sau khi T1–T5 xong

Quay lại `docs/backlog/PHASE_1_2_BACKLOG.md` mục "Cảnh báo sequencing" (thêm 15/09/2026)
và `docs/governance/NEXT_STEPS_CHECKLIST.md` phần B (NS-101 trở đi) để lấy task Phase 1
tiếp theo — nhưng chỉ sau khi NS-005/006/007 đóng hoặc có risk acceptance đúng thẩm
quyền. Không tự mở rộng phạm vi nghiệp vụ Admission (SOP-ADM-005 trở đi) trước mốc đó.

## 4. Gate trước khi handoff bất kỳ task nào ở trên

```bash
pnpm data:guard
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose config --quiet
pnpm smoke
pnpm outbox:smoke
pnpm demo:journey:smoke   # bắt buộc sau T1
```

Ghi rõ trong PR description: gate nào chạy được, gate nào chưa (và lý do), migration/
rollback impact nếu có, và cập nhật `docs/CODEX_EXECUTION_PLAN.md` (mục 1) nếu trạng
thái code thay đổi — tài liệu này chỉ có giá trị nếu được giữ khớp với code thật.
