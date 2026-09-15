# Step 02 — Medical clearance gate (BR-ADM-002) + dọn numbering collision

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** BR-ADM-002 (`docs/ERP_PreSchoolSOP (1).md` dòng 330, SOP-ADM-003)
  quy định: không được tạo Offer cho một Applicant chưa được Cán bộ Y tế xác nhận
  `Medical Cleared = YES`. Đây là rủi ro mức **Cao** theo
  `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-admission-contract-enrollment.md`
  mục B — an toàn trẻ là ưu tiên #1 theo `AGENTS.md` §1.
- **Nó phục vụ luồng nào:** chặn ngay tại `createOffer` (`apps/api/src/modules/admission/application.service.ts`)
  — điểm duy nhất hiện tại tạo ra cam kết tài chính/chỗ học cho một trẻ.
- **Ai dùng kết quả step này:** Step 05 (UI) sẽ hiển thị panel xác nhận y tế gọi thẳng
  endpoint tạo ở step này. Step 06 (test tích hợp/seed) sẽ dùng lại test-db helper tạo ở
  step này cho Step 03/04.

## 2. Mục tiêu kỹ thuật

- **Input:** bảng `medical_clearances` đã có từ Step 01 (migration `0008`, đã PASS —
  xem `reports/step-01-audit.md`).
- **Output mong đợi:**
  1. Module `apps/api/src/modules/medical/` mới: set/đọc medical clearance cho một
     Application, permission `medical:read`/`medical:edit` riêng biệt.
  2. `ApplicationService.createOffer` chặn (409) khi chưa có clearance `cleared = true`.
  3. Một helper test tối thiểu để viết integration test chạm Postgres thật (chưa có
     tiền lệ trong `apps/api` — mọi test hiện tại đều là pure-function; đây là lần đầu
     cần Postgres thật trong vitest, không phải chỉ trong script CI).
  4. Dọn numbering collision đã phát hiện ở `reports/step-01-audit.md` mục 4.
- **Ràng buộc kiến trúc (AGENTS.md §8 — module ownership):**
  - `medical_clearances` do module Medical sở hữu. **`ApplicationService` KHÔNG được
    tự viết SQL đọc bảng `medical_clearances` trực tiếp** ("không query chéo tùy tiện") —
    phải gọi một method typed trên `MedicalService` (ví dụ `getClearance(actor, applicationId)`),
    inject qua NestJS module (xem mục 3).
  - Guard thuần `assertMedicalCleared(clearance: { cleared: boolean } | null): void` đặt
    trong `application.service.ts`, cạnh `assertOfferApprovalSeparation` (dòng 40-44),
    cùng phong cách: ném `ConflictException('Medical clearance required before offer can be created')`
    nếu `!clearance?.cleared`. Đây là guard cross-cutting, KHÔNG phải state machine mới —
    không đổi `applicationStateMachine`/`application-state-machine.ts`.
  - `MedicalService.setClearance` viết trong transaction riêng (`BEGIN`/`COMMIT`), dùng
    `recordMutation` (action `medical.clearance.set`, objectType `MedicalClearance`,
    eventType `MedicalClearanceSet`) — đúng pattern audit+outbox cùng transaction.
  - `MedicalService.getClearance` là read đơn giản (`this.pool.query`, không cần
    transaction) — đây là precondition check, không phải ghi dữ liệu.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `apps/api/src/modules/medical/medical.module.ts` (mới)
- `apps/api/src/modules/medical/medical.controller.ts` (mới) — 2 endpoint:
  - `GET /medical/clearances/:applicationId` — quyền `medical:read`
  - `PUT /medical/clearances/:applicationId` — quyền `medical:edit`, body
    `{ cleared: boolean; allergyFlags?: string[]; specialHealthNeeds?: string }`
- `apps/api/src/modules/medical/medical.service.ts` (mới) — `getClearance`,
  `setClearance`, export để `AdmissionModule` inject được
- `apps/api/src/modules/medical/medical.service.test.ts` (mới)
- `apps/api/src/modules/admission/application.service.ts` — thêm `assertMedicalCleared`,
  gọi trong `createOffer`, inject `MedicalService` vào constructor
- `apps/api/src/modules/admission/admission.module.ts` — import `MedicalModule`
- `apps/api/src/app.module.ts` — đăng ký `MedicalModule` (theo đúng khuôn các module
  khác đã có trong `imports`)
- `apps/api/src/platform/test-db.ts` (mới) — helper tối thiểu: mở `Pool` từ
  `process.env.DATABASE_URL`, một hàm `withRollback(fn)` chạy `fn` trong
  `BEGIN`/... /`ROLLBACK` để test không để lại dữ liệu. Không thêm framework/dependency
  mới (AGENTS.md §12 "Không tạo dependency/vendor mới nếu chưa được chấp nhận") — chỉ
  dùng `pg` đã có sẵn trong `apps/api/package.json`.
- `apps/api/src/modules/admission/application.service.test.ts` — thêm test dùng
  `test-db.ts` cho `createOffer` bị chặn khi chưa clearance (xem mục 4)
- `docs/governance/MIGRATION_PLAN.md` — đổi số dòng kế hoạch `0008_platform_scope_hardening.sql`
  → `0009_platform_scope_hardening.sql`, và dịch các dòng kế hoạch phía sau
  (`0009_governance_traceability` → `0010`, `0010_rule_configuration` → `0011`,
  `0011_secure_documents` → `0012`, `0012_admission_extensions` → `0013`). Đây là bảng
  kế hoạch (chưa có migration thật nào trong số này), chỉ đổi số để không trùng migration
  thật `0008` vừa tạo ở Step 01 — không đổi nội dung/ý nghĩa từng dòng.
- `docs/API_CONTRACT_MVP.md` — thêm 2 route mới vào bảng route hiện có, đúng format các
  route Admission đã ghi.

**KHÔNG được đụng vào:**
- `database/migrations/*` — không tạo migration mới ở step này, bảng đã có từ Step 01.
- `rule_configs`, `approval_requests` — chưa dùng ở step này (đó là Step 03).
- `apps/worker/**` — không liên quan step này (đó là Step 04).
- `apps/web/**` — UI làm ở Step 05, không làm trước.
- `database/seed/demo-seed.json` — persona Cán bộ Y tế làm ở Step 06, không tự thêm ở
  đây (nếu thiếu persona demo, dùng actor giả lập trực tiếp trong test, không sửa seed).

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] `GET/PUT /medical/clearances/:applicationId` tồn tại, guard đúng permission
      (`medical:read`/`medical:edit`), campus scope enforce theo actor (không tin
      campus do client gửi — đúng AGENTS.md §5).
- [ ] `PUT` thành công tạo/cập nhật đúng 1 dòng `medical_clearances` + đúng 1
      `audit_events` + đúng 1 `outbox_events` (action `medical.clearance.set`,
      eventType `MedicalClearanceSet`).
- [ ] `assertMedicalCleared` có unit test độc lập (không cần DB) giống khuôn
      `assertOfferApprovalSeparation` — case `cleared: true` không throw, `cleared: false`
      throw, `null`/`undefined` throw.
- [ ] Integration test (dùng `test-db.ts`, Postgres thật): `createOffer` trả 409 khi
      application chưa có `medical_clearances` hoặc `cleared = false`; `createOffer`
      thành công khi `cleared = true`.
- [ ] Permission âm: gọi `PUT /medical/clearances/:id` với actor không có `medical:edit`
      → 403 (test bằng `hasRequiredPermissions`/`canActivateRequest` thuần, theo khuôn
      `permissions.test.ts`, không cần dựng cả server).
- [ ] Không có `any`, không có non-null assertion không lý do (AGENTS.md §14).
- [ ] `docs/governance/MIGRATION_PLAN.md` không còn dòng nào trùng số `0008` giữa
      thật và kế hoạch.
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` xanh.
- [ ] Test tích hợp mới chạy được với Postgres thật (ghi rõ trong báo cáo cách bạn chạy
      nó — ví dụ cần `DATABASE_URL` trỏ tới DB đã `db:migrate` tới `0008`; nếu môi
      trường chạy `pnpm test` không có Postgres sẵn, dùng `it.skipIf(!process.env.DATABASE_URL)`
      hoặc tương đương, KHÔNG xoá test, KHÔNG giả vờ pass).
- [ ] `docker compose config --quiet` vẫn pass.
- [ ] Đã commit theo format: `feat(step-02): add medical clearance gate before offer creation`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- `test-db.ts` là hạ tầng test đầu tiên chạm Postgres thật trong `vitest` (khác với
  `scripts/smoke.mjs` là node script riêng) — Step 03/04 sẽ dùng lại file này. Giữ nó
  đơn giản (không thêm ORM/test framework mới), và nếu thấy cần thiết kế khác đi, ghi ở
  mục "Đề xuất phát sinh" thay vì tự quyết vì ảnh hưởng nhiều step sau.
- Nếu CI (`.github/workflows/ci.yml`) chạy `pnpm test` ở bước đã có Postgres sẵn (đúng
  vậy — xem job `quality`, `DATABASE_URL` đã set trong `env` của job), test tích hợp
  mới sẽ tự chạy được trong CI mà không cần sửa gì thêm ở workflow. Xác nhận lại điều
  này trong báo cáo cuối, đừng giả định.
- Không thêm state mới vào `ApplicationStatus` enum hay `applicationStateMachine` —
  guard này độc lập với state machine, giống `assertOfferApprovalSeparation`.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
