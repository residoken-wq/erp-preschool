# Step 06 — Seed persona Domain 01 + test permission âm + hoàn thiện demo journey

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 0. Quyết định đã chốt trước khi viết spec này (không tự suy diễn lại)

Đọc `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-admission-contract-enrollment.md` mục
C.4/C.6, `reports/step-02-audit.md` mục 6, `reports/step-03-audit.md` mục 5, và
`reports/step-05-audit.md` mục 5 (backlog "medical:edit luôn kèm medical:read"). Quyết định
cụ thể cho những chỗ SOP/audit chỉ nêu ý định, chưa nêu giá trị/tên chính xác:

1. **Cơ chế permission hiện tại hoàn toàn dựa vào header `x-permissions`, không dựa
   `role_permissions` trong DB** (`role_permissions` có schema từ migration `0001` nhưng
   chưa từng được ghi dữ liệu; `resolveDevelopmentActor` chỉ đọc thẳng header). Vì vậy
   "thêm persona có quyền hạn chế" nghĩa là: (a) thêm user thật trong `user_accounts` (bắt
   buộc do FK từ `medical_clearances.cleared_by`/`approval_requests.*`), và (b) làm cho
   phía FE (`apps/web`) gửi đúng header `x-permissions` hẹp cho 2 persona mới — 2 persona
   cũ (Admission Manager/Officer) **giữ nguyên hành vi hiện tại** (không gửi
   `x-permissions`, mặc định `development:*`) để không hồi quy bất kỳ tính năng nào đã
   PASS ở Step 01-05 ngoài phạm vi Domain 01 (task board, SOP workspace, lead...).
2. **2 persona mới, đúng tên SOP §C.4:**
   - **"Cán bộ Y tế"** (role code `MEDICAL_OFFICER`) — permissions:
     `['medical:read', 'medical:edit', 'application:read']`. **Quyết định:** hai quyền
     medical luôn đi cùng nhau (khớp backlog Step 05 "medical:edit luôn kèm medical:read").
     **Cập nhật 16/09/2026 (phát hiện ở audit sau vòng code đầu):** ban đầu spec định
     KHÔNG cho `application:read` (đúng nghĩa đen SOP "Medical Only"), nhưng test thật qua
     API xác nhận điều đó khiến `GET /applications` trả 403 cho persona này — nghĩa là
     trên UI, chọn persona "Cán bộ Y tế" rồi vào tab Applications sẽ thấy lỗi kết nối, KHÔNG
     BAO GIỜ chọn được Application nào để mở `MedicalClearancePanel` (UI bắt buộc chọn 1
     dòng từ danh sách trước khi render panel chi tiết). Vô hiệu hoá đúng mục đích thêm
     persona này. Áp dụng cùng lý do đã dùng cho Hiệu trưởng (mục dưới): `application:read`
     chỉ là quyền xem, không phải `application:transition`, không phá SoD. Thêm quyền này
     cho Cán bộ Y tế để persona thực sự dùng được qua UI.
   - **"Hiệu trưởng"** (role code `PRINCIPAL`) — permissions:
     `['application:read', 'offer:approve-discount']`. **Quyết định:** thêm
     `application:read` dù SOP nói "Medical Only"/không nói rõ Hiệu trưởng có gì khác
     ngoài `offer:approve-discount` — lý do: `GET /applications` (endpoint duy nhất UI
     dùng để hiển thị danh sách Offer, gồm cả badge PENDING mới từ Step 05) yêu cầu
     `application:read` ở class-level (`ApplicationController`); không có quyền này thì
     Hiệu trưởng không thể *nhìn thấy* offer nào để duyệt qua UI dù server vẫn cho phép
     gọi thẳng API duyệt. Đây không phải lỗ hổng SoD vì `application:read` chỉ là quyền
     xem, không phải `application:transition`/`offer:create`/`offer:transition` — Hiệu
     trưởng vẫn không tự tạo/chuyển trạng thái Offer hay Application được, đúng tinh thần
     SoD của SOP §10 Bước 03 và test bắt buộc ở §C.6.
   - Cả hai **không** có `offer:create`, `offer:transition`, `application:transition` —
     đây là điều kiện bắt buộc cho test permission âm ở mục 4.
   - Campus scope: cả hai chỉ `CENTRAL` (dữ liệu demo hiện tại chỉ nằm ở campus này, xem
     `scripts/seed.mjs` hard-code `seed.campuses[0]`).
3. **Giá trị demo `admission.discount_threshold_percent` = 10 (%), scope toàn tổ chức
   (`campus_id = NULL`).** Đây là **giá trị demo, KHÔNG phải quyết định chính sách được
   phê duyệt** (AGENTS.md §4 "giá trị ví dụ không được dùng làm default production") — ghi
   rõ trong seed/migration comment. Khi có quyết định thật, đây là việc thay đổi seed/config
   runtime, không phải sửa code.
4. **Không thêm cột/bảng/migration mới** — `rule_configs`/`medical_clearances`/
   `approval_requests` đã đủ từ migration `0008` (Step 01). Step 06 chỉ thêm dữ liệu seed +
   test + script, không đổi schema.
5. **Không tiền-tạo `medical_clearances` trong seed** — việc tạo clearance phải qua hành
   động thật (UI hoặc `demo-journey-smoke.mjs` gọi PUT), đúng tinh thần "golden path chạy
   qua giao diện" đã nêu ở `tasks/step-05.md` mục 1. Chỉ `rule_configs` được seed sẵn (đây
   là config, không phải hành động nghiệp vụ của một actor).

**Cập nhật 16/09/2026 (sau vòng code đầu, sửa lỗi trong chính spec này):** Codex đã đúng
khi phát hiện `ApplicationService.transition()` — method service thuần cho
`POST /applications/:id/transitions` — **không tự kiểm tra permission bên trong**; enforcement
`application:transition` chỉ nằm ở tầng `PermissionGuard`/`@RequirePermissions` gắn trên
`ApplicationController.transition` (khác với `MedicalService.setClearance`/
`ApplicationService.decideOfferDiscountApproval`, hai method này CÓ gọi
`hasRequiredPermissions(...)` ngay trong service vì cần enforce SoD động dựa trên dữ liệu,
không chỉ permission tĩnh). Gọi thẳng `applications.transition(actor, ...)` ở tầng service
trong test — như mục 3 bản đầu của spec này yêu cầu — sẽ KHÔNG BAO GIỜ ném
`ForbiddenException`, vì service không có nhánh đó. Đây là lỗi trong chính spec (giả định
sai kiến trúc), không phải lỗi Codex. **Sửa: đổi sang test ở đúng tầng Guard/metadata**,
tái dùng chính xác pattern đã có trong `apps/api/src/modules/medical/medical.service.test.ts`
mục "registers GET and PUT..." (dùng `Reflect.getMetadata(PERMISSIONS_KEY,
ApplicationController.prototype.transition)` + `canActivateRequest(...)`) — **không cần
Postgres**, không cần fixture schema riêng cho case này. Mục 3 dưới đây đã cập nhật theo
đúng hướng sửa này.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** Domain 01 (SOP-ADM-003, BR-ADM-002/003/004) đã xong logic
  (Step 01-04) và UI (Step 05), nhưng demo hiện tại không có actor nào thực sự bị giới hạn
  quyền — mọi persona đều `development:*` (toàn quyền), nên không chứng minh được SoD/
  permission âm hoạt động đúng qua actor thật, và `demo-journey-smoke.mjs` chưa từng thao
  tác qua 2 API mới của Step 02/03 (medical clearance, discount approval) — golden path
  script sẽ 409 nếu ai thử discount vì thiếu `rule_configs`.
- **Phục vụ luồng nào:** hoàn thiện Domain 01 end-to-end — closing item cuối cùng trước khi
  coi SOP-ADM-003 xong hoàn toàn theo `docs/PLAN.md`.
- **Ai dùng kết quả:** Repository Owner dùng để demo qua UI thật (chọn persona "Cán bộ Y
  tế"/"Hiệu trưởng"); `demo-journey-smoke.mjs` dùng làm CI/regression evidence; audit sau
  này dùng 2 test permission âm mới làm bằng chứng SoD thật (không chỉ suy luận permission
  string).

## 2. Mục tiêu kỹ thuật

- **Input:** API/permission model đã có đủ từ Step 01-05 (`medical:read/edit`,
  `offer:approve-discount`, `application:read/transition`), pattern seed đã có
  (`scripts/seed.mjs`), pattern test Postgres thật đã có (`apps/api/src/modules/medical/
  medical.service.test.ts`, `apps/api/src/modules/admission/application.service.test.ts`
  — fixture tạo schema riêng + chạy migration thật, xem các file này làm khuôn).
- **Output mong đợi:**
  1. 2 role + 2 user demo mới trong `database/seed/demo-seed.json`, seed đúng qua
     `scripts/seed.mjs` (đã có `seedRoles()`/`seedUsers()`, không cần đổi 2 hàm này).
  2. 1 cấu hình `rule_configs` demo cho `admission.discount_threshold_percent`, cần **thêm
     hàm seed mới** (`scripts/seed.mjs` chưa có hàm nào ghi bảng này).
  3. `apps/web`: `DemoPersona` có thêm field quyền, `actorHeaders()` gửi đúng header, 2
     persona mới trong dropdown.
  4. `scripts/demo-journey-smoke.mjs` gọi PUT medical clearance (persona Cán bộ Y tế) trước
     khi tạo Offer, và Offer giờ có `discountPercent` vượt ngưỡng để golden path thật sự đi
     qua nhánh discount-approval (dùng persona Hiệu trưởng để duyệt) — trước đây script chỉ
     test SoD tự-duyệt (`assertOfferApprovalSeparation`), chưa từng test nhánh
     `approval_requests`/`offer:approve-discount` thật.
  5. Test permission âm mới (unit không cần DB + integration Postgres thật) xác nhận đúng
     2 persona mới bị chặn đúng ngoài phạm vi của họ.
- **Ràng buộc kiến trúc:** không đổi cơ chế permission hiện có (vẫn header-based, không
  chuyển sang đọc `role_permissions` — đó là thay đổi kiến trúc lớn ngoài phạm vi step
  này, ghi vào "Đề xuất phát sinh" nếu Codex thấy cần). Test mới tái dùng đúng fixture/
  helper Postgres đã có (`apps/api/src/platform/test-db.ts`), không viết helper test mới
  trùng lặp.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `database/seed/demo-seed.json` — thêm:
  - 2 phần tử vào mảng `roles`: `{"code": "MEDICAL_OFFICER", "name": "Cán bộ Y tế"}`,
    `{"code": "PRINCIPAL", "name": "Hiệu trưởng"}`.
  - 2 phần tử vào mảng `demo_users` (email domain phải `@example.test` theo
    `scripts/data-policy.mjs`, KHÔNG dùng domain khác):
    - `id: "00000000-0000-7000-8000-000000001003"`, role `["MEDICAL_OFFICER"]`, campus
      `["CENTRAL"]`, email/display_name tự đặt hợp lý (vd. `medical.officer@example.test`).
    - `id: "00000000-0000-7000-8000-000000001004"`, role `["PRINCIPAL"]`, campus
      `["CENTRAL"]`, email/display_name tự đặt hợp lý (vd. `principal@example.test`).
  - 1 mảng mới `demo_rule_configs` (tên tự đặt nếu thấy tên khác rõ hơn, miễn nhất quán với
    hàm seed mới ở mục dưới): 1 phần tử cho
    `admission.discount_threshold_percent`, giá trị `10`, `campus: null` (org-wide) — ghi
    comment/field mô tả rõ đây là giá trị demo, không phải chính sách đã duyệt (theo mục 0.3).
- `scripts/seed.mjs` — thêm đúng 1 hàm mới (ví dụ `seedRuleConfigs()`) đọc từ mảng seed mới
  ở trên, `INSERT INTO rule_configs(...)`. **Bắt buộc dùng đúng conflict target khớp unique
  index đã có** (`rule_configs_active_scope_key_idx` — partial unique index trên
  `(organization_id, COALESCE(campus_id, '00000000-0000-0000-0000-000000000000'::uuid),
  config_key) WHERE valid_to IS NULL`) để `ON CONFLICT` không lỗi và seed idempotent khi
  chạy lại nhiều lần. Gọi hàm mới này trong khối `try {}` chính, đặt sau `await
  seedUsers();` (không phụ thuộc thứ tự với phần còn lại).
- `apps/web/src/app/sop-os-app.tsx` — CHỈ 3 chỗ:
  1. Type `DemoPersona` (dòng ~19): thêm field optional `permissions?: string[]`.
  2. Hàm `actorHeaders()` (dòng ~70-77): nếu `persona.permissions` tồn tại, thêm header
     `'x-permissions': persona.permissions.join(',')` — nếu không tồn tại (2 persona cũ),
     **không** thêm header này (giữ nguyên hành vi mặc định `development:*` hiện tại).
  3. Mảng `demoPersonas` (dòng ~32-35): thêm đúng 2 phần tử mới, `actorId` khớp UUID ở
     seed, `permissions` khớp đúng mục 0.2, `campusIds` là mảng chứa
     `centralCampusId` (hằng số đã có trong file, không hard-code lại UUID).
  - **KHÔNG sửa gì khác trong file này** (không đụng `ApplicationPanels`, không đụng logic
    Step 05 đã PASS).
- `apps/api/src/platform/permissions.test.ts` — **cập nhật 16/09/2026:** vì Cán bộ Y tế
  giờ có thêm `application:read` (mục 0.2), sửa lại fixture `permissions` của case Cán bộ Y
  tế đã có (nếu đã tồn tại từ vòng code trước) thành `['medical:read','medical:edit',
  'application:read']`, thêm khẳng định `hasRequiredPermissions(permissions,
  ['application:read'])` → `true`; các khẳng định phủ định giữ nguyên
  (`application:transition`, `offer:approve-discount`, `offer:create`, `offer:transition`
  vẫn phải `false`). Case Hiệu trưởng không đổi.
- `apps/api/src/modules/admission/application.service.test.ts` — thêm đúng 1 test case
  mới, **KHÔNG cần Postgres** (xem "Cập nhật 16/09/2026" cuối mục 0 để biết lý do). Không
  sửa test case cũ.
- `scripts/demo-journey-smoke.mjs` — sửa đúng các chỗ:
  1. Thêm `medicalHeaders`/`principalHeaders` (actor id khớp seed mới, `x-permissions`
     khớp đúng mục 0.2 — script này KHÔNG đọc từ `demoPersonas` của `apps/web`, phải khai
     báo lại header ở đây, độc lập, đúng cấu trúc `officerHeaders`/`managerHeaders` hiện
     có).
  2. Chèn 1 lời gọi `PUT /medical/clearances/${application.id}` bằng `medicalHeaders`,
     body `{ cleared: true }`, đặt ngay sau vòng lặp transition Application (dòng 42-44
     hiện tại) và trước khi tạo Offer (dòng 46 hiện tại).
  3. Sửa `terms` khi tạo Offer: thêm `discountPercent: 15` (giữ nguyên `mode:
     'SIMULATED_LOCAL_DEMO'` đã có) — 15 > ngưỡng seed 10% nên `requiresApproval = true`.
  4. Sau bước 409 tự-duyệt đã có (dòng 52 hiện tại, **giữ nguyên, không xoá** — đây là SoD
     check khác, không liên quan approval_requests), chèn 1 lời gọi
     `POST /applications/offers/${offer.id}/discount-approval` bằng `principalHeaders`,
     body `{ decision: 'APPROVED' }`, **trước** dòng chuyển Offer sang `APPROVED` bằng
     `managerHeaders` (dòng 53 hiện tại) — vì giờ transition đó sẽ 409 nếu approval còn
     PENDING.
  - Không sửa phần SOP journey (dòng 76-93) hay bất kỳ đoạn nào khác của script.

**KHÔNG được đụng vào:**
- Bất kỳ file `apps/api/src/modules/**/*.ts` không phải file test đã liệt kê — không đổi
  business logic, controller, service, permission engine.
- `database/migrations/*.sql` — không thêm migration mới, schema đã đủ từ Step 01.
- `apps/web/src/app/medical-clearance-panel.tsx`, `discount-approval-panel.tsx`,
  `demo-journey-state.ts`, `demo-journey.tsx` — không sửa, Step 05 đã PASS, không có lý do
  đổi.
- `scripts/local-services.sh`, `docker-compose.yml`, các script `pnpm smoke`/
  `pnpm outbox:smoke` — không sửa, không liên quan.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] `pnpm data:guard` pass với seed đã thêm 2 role/2 user/1 rule_config mới (vẫn
      `provenance: synthetic`, email domain `example.test`).
- [ ] Chạy `pnpm db:migrate && pnpm db:seed` **hai lần liên tiếp** trên Postgres trống →
      không lỗi cả hai lần (idempotent) — xác nhận bằng SQL: đúng 1 dòng `rule_configs`
      active cho `admission.discount_threshold_percent` (không nhân đôi ở lần seed thứ 2),
      2 user mới tồn tại đúng role trong `user_role_scopes`. **Nếu sandbox Codex không có
      quyền Docker/Postgres cục bộ** (đã xảy ra ở vòng code đầu — `Docker socket permission
      denied`, không có binary Postgres), ghi rõ lý do trong báo cáo và **không** coi đây là
      lý do dừng cả step — Claude sẽ tự chạy đúng bước này ở audit (tương tự cách Claude tự
      dựng full-stack cho `demo-journey-smoke.mjs`), miễn Codex đã chứng minh phần seed
      script/JSON đúng cú pháp và logic qua đọc code + `pnpm data:guard`.
- [ ] `hasRequiredPermissions` unit test mới (mục 3) đều đúng như mô tả — cả 4 trường hợp
      phủ định lẫn 2+ trường hợp khẳng định.
- [ ] 1 test mới ở tầng Guard/metadata (mục 3, **không cần Postgres**) — xác nhận
      `Reflect.getMetadata(PERMISSIONS_KEY, ApplicationController.prototype.transition)`
      vẫn là `['application:transition']`, và `canActivateRequest(...)` trả `false` cho cả
      permissions của Cán bộ Y tế lẫn Hiệu trưởng khi required là `['application:transition']`
      — đúng pattern đã có trong `medical.service.test.ts`.
- [ ] `apps/web`: build/typecheck xanh; 2 persona mới xuất hiện trong `demoPersonas`; 2
      persona cũ không có field `permissions` (giữ nguyên hành vi).
- [ ] `scripts/demo-journey-smoke.mjs`: cấu trúc đúng như mô tả mục 3 — **Claude sẽ tự
      chạy script này trên full-stack thật ở bước audit** (theo rule tiết kiệm quota
      `docs/PLAN.md` §0), Codex không cần tự dựng server để chạy nó, chỉ cần đảm bảo code
      cú pháp đúng (`pnpm lint`/`node --check scripts/demo-journey-smoke.mjs` hoặc tương
      đương để bắt lỗi cú pháp JS).
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm lint && pnpm typecheck && pnpm build` xanh cho cả `apps/web` và `apps/api`.
- [ ] `pnpm test` xanh cho `apps/api` (gồm test Guard/metadata mới — không cần
      `DATABASE_URL`; các test Postgres cũ vẫn skip bình thường nếu không có
      `DATABASE_URL`, không phải lỗi mới).
- [ ] `pnpm data:guard` xanh.
- [ ] **Cố gắng** tự chạy `pnpm db:migrate && pnpm db:seed` hai lần trên Postgres tạm để tự
      xác nhận idempotent. Nếu sandbox không cho phép (Docker/Postgres không truy cập
      được), ghi rõ nguyên văn lỗi gặp phải trong báo cáo bàn giao — Claude sẽ tự chạy lại
      bước này ở audit, đây không phải điều kiện chặn hoàn thành step.
- [ ] **KHÔNG cần** tự chạy `apps/web`/`apps/api` như server thật, không cần tự chạy
      `pnpm smoke`/`pnpm outbox:smoke`/`demo:journey:smoke` — theo đúng rule đã chốt từ
      Step 05, Claude làm việc này ở audit.
- [ ] Đã commit theo format:
      `feat(step-06): seed medical/principal personas, discount threshold config, negative permission tests`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Cột `value_json` trong `rule_configs` là `jsonb` — chèn số nguyên demo dạng
  `'10'::jsonb` (JSON number literal), không phải chuỗi `'"10"'` hay object.
- `seedUsers()` hiện tại dùng `ON CONFLICT (organization_id, email_normalized)` — email 2
  user mới phải khác toàn bộ email đã có, không trùng.
- `demo_applications`/`demo_leads` trong `seedMvpDemo()` hard-code
  `seed.demo_users[0].id` (Admission Manager) làm `owner_user_id`/`assigned_user_id` —
  **không đổi hành vi này**, không liên quan tới việc thêm 2 user mới (họ không cần là
  owner của lead/application nào trong seed tĩnh, chỉ cần tồn tại để thao tác qua API/UI).
- `scripts/demo-journey-smoke.mjs` hiện có 1 check 409 tự-duyệt ở dòng 52 (SoD giữa actor
  tạo Offer và actor duyệt chuyển trạng thái) — đây là kiểm tra khác, độc lập với
  `approval_requests`/`offer:approve-discount` — **giữ nguyên**, không gộp/thay thế bằng
  bước duyệt discount mới.
- Nếu phát hiện `getActiveRuleConfigValue` (Step 03) đọc `campus_id` theo cách không khớp
  giả định `campus: null` = "toàn tổ chức" của spec này (ví dụ cần campus cụ thể thay vì
  NULL), đó là điều cần dừng lại hỏi Planning Manager, không tự đổi giả định.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: không triển khai thêm.
- Blocker AC4 (Codex, 16/09/2026): `ApplicationService.transition()` hiện chỉ kiểm tra
  organization/campus và state machine, không kiểm tra `application:transition` trong
  service. Hai test mới gọi thật service với transition hợp lệ DRAFT -> SUBMITTED và
  yêu cầu 403; đọc code cho thấy chưa có nhánh từ chối quyền tương ứng. Cần Planning
  Manager mở scope sửa service để enforce permission (hoặc ra spec revise); Codex
  không sửa service vì mục 3 cấm. Chưa có bằng chứng chạy Postgres để xác nhận runtime.
- Blocker môi trường verification: Docker socket trả `permission denied`; không tìm
  thấy binary Postgres cục bộ để dựng instance tạm. Chưa chạy được hai test tích hợp mới
  và hai vòng migrate+seed/SQL kiểm tra idempotency. Không coi các gate này là PASS.
- Chưa commit: điều kiện người dùng yêu cầu là toàn bộ gate xanh chưa đạt; môi trường
  cũng khai báo `.git` chỉ đọc. Không thay đổi permission hoặc lách sandbox.
