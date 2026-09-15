# Step 03 — Discount threshold + 1-cấp approval (BR-ADM-003)

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** BR-ADM-003 (`docs/ERP_PreSchoolSOP (1).md` dòng 332,
  SOP-ADM-003) quy định chiết khấu vượt ngưỡng niêm yết phải được phê duyệt trước khi
  Offer được gửi. Đây là rủi ro tài chính + SoD mức **Cao** theo
  `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-admission-contract-enrollment.md`
  mục B.
- **Giới hạn có chủ đích (đã quyết định ở Domain 01, không phải việc của step này):**
  SOP mô tả 3 cấp duyệt theo % (§14 Approval Matrix), nhưng approval engine đa cấp có
  delegation/escalation là phạm vi P1-E06 (Phase 1, chưa được phép xây — xem
  `docs/backlog/PHASE_1_2_BACKLOG.md`). Step này chỉ làm **một ngưỡng cấu hình, vượt
  ngưỡng thì cần đúng 1 approval**, không phân biệt vượt bao nhiêu %. Không tự ý mở
  rộng thành nhiều cấp.
- **Ai dùng kết quả step này:** Step 05 (UI) hiển thị panel duyệt discount. Step 06
  (seed/test) cần persona có `offer:approve-discount` nhưng không có
  `application:transition`, để test SoD có ý nghĩa thật.

## 2. Mục tiêu kỹ thuật

- **Input:** bảng `rule_configs`, `approval_requests` đã có từ Step 01 (chưa có dữ liệu
  nào, chưa có code nào đọc/ghi — Step 02 không đụng tới 2 bảng này).
- **Output mong đợi:**
  1. `createOffer` nhận thêm field tùy chọn `terms.discountPercent` (0-100). Nếu vượt
     ngưỡng cấu hình → tạo kèm một `approval_requests` PENDING.
  2. `transitionOffer` sang `APPROVED` bị chặn (409) nếu offer còn `approval_requests`
     PENDING liên kết.
  3. Endpoint mới quyết định approval (approve/reject), permission riêng
     `offer:approve-discount`, chặn tự duyệt.
  4. Thiếu cấu hình ngưỡng mà `discountPercent > 0` → fail-closed, không cho tạo Offer
     (AGENTS.md §4: "thiếu quyết định thì đánh dấu blocker, không bịa default").
- **Ràng buộc kiến trúc:**
  - `rule_configs` và `approval_requests` là bảng **platform-level dùng chung giữa
    domain** (giống `audit_events`/`outbox_events`), KHÔNG phải bảng riêng của module
    Admission hay Medical. Vì vậy viết 2 file helper hàm thuần (không phải NestJS
    service/module có DI) trong `apps/api/src/platform/`, cùng phong cách với
    `mutation-log.ts` (`recordMutation` là hàm async thuần, không phải class):
    - `apps/api/src/platform/rule-config.ts` — `getActiveRuleConfigValue(client, params: { organizationId: string; campusId: string | null; configKey: string }): Promise<unknown | null>`. Đọc theo đúng độ ưu tiên: config có `campus_id` khớp trước, nếu không có thì fallback config `campus_id IS NULL` (áp dụng toàn org). Chỉ đọc `valid_to IS NULL`.
    - `apps/api/src/platform/approval-requests.ts` — `createApprovalRequest(client, actor, params: { entityType: string; entityId: string; thresholdSnapshot: Record<string, unknown> }): Promise<{ id: string }>`, `getPendingApprovalRequest(client, entityType: string, entityId: string): Promise<{ id: string; requestedBy: string } | null>`, `decideApprovalRequest(client, actor, id: string, decision: 'APPROVED' | 'REJECTED', reason?: string): Promise<...>` (ném lỗi nếu `approver_id` trùng `requested_by` — dù DB đã có CHECK, vẫn chặn sớm ở service để trả đúng mã lỗi 409 thay vì lỗi SQL thô).
  - `application.service.ts` gọi 2 helper trên bằng `client` (cùng transaction với
    insert offer / update offer), KHÔNG mở transaction riêng — đây là một phần của cùng
    một business transaction theo AGENTS.md §6.
  - Không thêm state mới vào `offerTransitions`/`ApplicationStatus`. Approval pending
    là điều kiện chặn transition, không phải state riêng của Offer.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `apps/api/src/platform/rule-config.ts` (mới)
- `apps/api/src/platform/rule-config.test.ts` (mới)
- `apps/api/src/platform/approval-requests.ts` (mới)
- `apps/api/src/platform/approval-requests.test.ts` (mới)
- `apps/api/src/modules/admission/application.service.ts` — sửa `createOffer` (đọc
  `terms.discountPercent`, đọc ngưỡng, tạo `approval_requests` khi vượt ngưỡng, fail-closed
  khi thiếu config), sửa `transitionOffer` (chặn `APPROVED` khi còn approval PENDING),
  thêm method `decideOfferDiscountApproval(actor, offerId, command)`
- `apps/api/src/modules/admission/application.controller.ts` — thêm
  `POST /applications/offers/:offerId/discount-approval`, permission `offer:approve-discount`
- `apps/api/src/modules/admission/application.service.test.ts` — test mới cho toàn bộ
  luồng (xem mục 4)
- `docs/API_CONTRACT_MVP.md` — thêm route mới + mô tả contract, đúng phong cách mục
  "Medical clearance (Step 02)" đã có

**KHÔNG được đụng vào:**
- `apps/api/src/modules/medical/**` — không liên quan step này.
- `database/migrations/*` — bảng đã có từ Step 01.
- `apps/worker/**`, `apps/web/**`, `database/seed/demo-seed.json` — như các step trước.
- Không tạo NestJS module/service mới có DI cho `rule_configs`/`approval_requests` —
  dùng hàm thuần trong `platform/` như mục 2 đã chỉ định. Nếu thấy cần thiết kế khác,
  ghi vào "Đề xuất phát sinh", không tự đổi.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] `createOffer` với `terms.discountPercent` để trống hoặc `0`: hành vi y hệt trước
      Step 03 (không tạo `approval_requests`, không cần config).
- [ ] `createOffer` với `discountPercent` ≤ ngưỡng cấu hình: tạo offer bình thường,
      không tạo `approval_requests`.
- [ ] `createOffer` với `discountPercent` > ngưỡng: tạo offer (status `DRAFT` như cũ)
      **và** đúng 1 `approval_requests` PENDING (`entity_type='Offer'`, `entity_id`=offer
      id, `requested_by`=actor tạo offer); response có thêm field `requiresApproval: true`.
- [ ] `createOffer` với `discountPercent > 0` mà **không có** `rule_configs` cho
      `admission.discount_threshold_percent` (theo scope org/campus của actor): 409,
      không tạo offer, không tạo approval_requests.
- [ ] `transitionOffer` sang `APPROVED` khi còn `approval_requests` PENDING liên kết:
      409, offer giữ nguyên status.
- [ ] `POST .../discount-approval` với `decision: 'APPROVED'` bởi actor khác người tạo
      offer: approval_requests chuyển `APPROVED`; sau đó `transitionOffer` sang
      `APPROVED` mới được phép (theo đúng thứ tự BR-ADM-003: duyệt discount trước, duyệt
      offer sau — có thể là 2 người khác nhau hoặc cùng người, spec không bắt buộc tách,
      chỉ bắt buộc không tự duyệt discount của chính mình).
- [ ] `POST .../discount-approval` bởi chính `requested_by`: 409 (tự duyệt bị chặn ở
      tầng service, không chỉ dựa vào DB CHECK).
- [ ] `decision: 'REJECTED'`: approval_requests chuyển `REJECTED`; `transitionOffer`
      sang `APPROVED` vẫn bị chặn vĩnh viễn cho tới khi có instance approval khác (Step
      này không cần hỗ trợ "resubmit" — nếu bị reject, luồng dừng ở đây, ghi nhận là giới
      hạn đã biết, không tự thêm resubmit).
- [ ] Permission âm: gọi `discount-approval` thiếu `offer:approve-discount` → 403.
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm data:guard && pnpm lint && pnpm typecheck && pnpm test && pnpm build` xanh.
- [ ] `docker compose config --quiet` vẫn pass.
- [ ] Integration test dùng `test-db.ts`/`withRollback` đã có từ Step 02 — không viết
      lại helper test DB mới.
- [ ] Chạy thử `pnpm smoke` và `pnpm outbox:smoke` với API/worker thật (dựng Postgres
      tạm nếu cổng `5432` bận, như Step 02 đã làm) để xác nhận không phá 2 script CI —
      ghi rõ kết quả trong báo cáo, đây là bài học rút ra từ audit Step 02.
- [ ] Đã commit theo format: `feat(step-03): add discount threshold and approval gate for offers`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là lần đầu `application.service.ts` đọc bảng platform-level bằng hàm thuần thay
  vì gọi NestJS service khác (khác với Step 02 dùng `MedicalService` qua DI) — lý do đã
  giải thích ở mục 2 (bảng này giống audit/outbox hơn là "module riêng"). Nếu thấy bất
  nhất quá khó chịu so với Step 02, ghi vào "Đề xuất phát sinh", đừng tự đổi kiến trúc
  Step 02 để "cho giống".
- `getActiveRuleConfigValue` sẽ được domain sau tái sử dụng (Kitchen/Procurement/Bus
  theo `docs/CODEX_FULL_DEMO_PLAN.md` §2.2) — giữ interface đơn giản, không gắn cứng vào
  ngữ cảnh Admission/discount.
- Không set giá trị mặc định cho `admission.discount_threshold_percent` ở bất kỳ đâu
  trong code hoặc seed (đó là quyết định nghiệp vụ, không phải kỹ thuật). Nếu Step 06
  cần seed dữ liệu demo có threshold để test/demo chạy được, đó là việc của Step 06 ghi
  seed, không phải việc của Step 03 tự hardcode default.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
