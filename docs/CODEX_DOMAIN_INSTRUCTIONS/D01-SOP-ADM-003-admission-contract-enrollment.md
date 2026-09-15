# Domain 01 — SOP-ADM-003: Tiếp nhận hồ sơ, Ký hợp đồng, Xác nhận nhập học

**Vai trò biên soạn:** BA Manager + Planning Manager + Audit Manager (phối hợp, một
người viết ba góc nhìn). **Ngày:** 15/09/2026. **Nguồn chuẩn:**
`docs/ERP_PreSchoolSOP (1).md` dòng 152–539 (SOP-ADM-003, 30 mục đầy đủ). Đây là SOP
gốc của toàn bộ code Admission hiện có (`applications`, `offers`, `enrollments`,
`contracts`, `fee_plans`, `handover_packages`) — không phải domain mới, mà là **đưa code
đã có về đúng chuẩn SOP đang thiếu**. Vì vậy domain này thuộc **Track A** (hardening),
không phải Track B (demo mở rộng); áp dụng gate production đầy đủ theo `AGENTS.md`.

Prerequisite liên quan (đọc kèm, không lặp lại ở đây): SOP-ADM-002/CRM-001 Assessment
(mục 6 điều kiện đầu vào của SOP-ADM-003 yêu cầu Assessment Record = Passed trước khi
được tạo Offer) — đã có khung `assessments` table nhưng chưa có service, xem
`docs/CODEX_EXECUTION_PLAN.md` mục T4. Domain 01 này giả định T4 sẽ đóng gap Assessment
riêng; ở đây chỉ cần Assessment `status = FINALIZED` làm điều kiện, không cần build lại
Assessment.

---

## A. BA Manager — Review chức năng hiện có so với SOP-ADM-003

| SOP section | Yêu cầu | Code hiện tại | Trạng thái |
|---|---|---|---|
| §10 Bước 01 Duplicate check | Quét trùng theo SĐT/email/DOB trước khi tạo Applicant | `lead.service.ts` có duplicate check ở tầng Lead; **Application không có duplicate check riêng** (Application luôn tạo từ Lead qua `startApplication`, không có entry point tạo Application độc lập nên rủi ro thấp hơn nhưng chưa xác nhận) | Đạt một phần |
| §10 Bước 02 / BR-ADM-002 Medical clearance | Bắt buộc `Medical Cleared = YES` trước khi Enrolled | **Không có bảng, không có service, không có gate nào** | Thiếu hoàn toàn |
| §10 Bước 03 / BR-ADM-003 Discount threshold + approval | Discount vượt ngưỡng niêm yết phải qua Admission Manager/Hiệu trưởng/Board trước khi gửi Offer | `application.service.ts:32-44` chỉ có `assertOfferApprovalSeparation` (chặn tự duyệt), **không có khái niệm ngưỡng, không đọc discount % từ đâu, không có bảng approval** | Thiếu hoàn toàn |
| §10 Bước 04 / BR-ADM-004 Holding seat 5 ngày | Offer tự động `Expired` sau hạn nếu chưa thanh toán | `offers.valid_until` có cột (migration `0004`), **không có job/cơ chế nào đọc và tự chuyển trạng thái** | Thiếu hoàn toàn |
| §10 Bước 05 Payment webhook + gạch nợ | Real-time webhook, Unallocated Cash Pool khi sai lệch | `createFinanceSetup` chỉ tạo `contracts`/`fee_plans` ở trạng thái DRAFT, không có `payment_records`, không có webhook nhận, không có manual matching | Thiếu — **ngoài phạm vi Domain 01** (cần PaymentAdapter mock theo `docs/CODEX_FULL_DEMO_PLAN.md` §2.1, để riêng thành Domain 02) |
| §10 Bước 06 e-Sign + auto Student ID/SIS sync | Ký điện tử, tự sinh Student ID, đồng bộ Bếp/Y tế | `createEnrollment` tạo `handover_packages` nhưng không có Student ID riêng biệt (dùng `enrollments.id`), không có e-Sign, không có sync Bếp/Y tế (các phân hệ đó chưa tồn tại) | Một phần — e-Sign/SIS sync **ngoài phạm vi Domain 01** |
| §14 Approval Matrix | 3 cấp theo % chiết khấu (Manager / Hiệu trưởng / Board) | Không có | Thiếu — Domain 01 làm **1 cấp đơn giản hóa**, xem §C.3 lý do |
| §21 Permission Matrix | Cán bộ Y tế: Medical Only/Full; Kế toán: Financial Only/Full; tách biệt rõ theo domain dữ liệu | `permissions.ts` chỉ có string permission phẳng (`resource:action`), chưa có "Medical Only" nhưng pattern đủ để thêm `medical:read`/`medical:edit` riêng | Hạ tầng đã đủ, cần thêm permission mới |
| §22 Audit Trail | Log không sửa xóa cho: sửa nhân thân, mọi thao tác discount, lịch sử approval, truy cập y tế | `recordMutation` pattern đã có, dùng được ngay cho các entity mới | Đạt (hạ tầng), cần áp dụng cho entity mới |
| §23 Internal Controls SoD | Tuyển sinh không tự xác nhận thu tiền; Kế toán không tự sửa chính sách ưu đãi | Đã đúng hướng: `finance:setup` permission riêng khỏi `offer:transition`; nhưng chưa có permission `offer:approve-discount` tách khỏi `offer:transition` nên Admission Officer có `offer:transition` vẫn có thể tự "approve" nếu được cấp nhầm quyền | Cần permission mới + test âm |

**Kết luận BA:** phần khung transactional (state machine, audit/outbox, row-lock) đã
đúng chuẩn kiến trúc, nhưng 3 business rule cốt lõi của chính SOP đang chi phối code này
(Medical Cleared, Discount Approval, Holding Seat Expiry) **chưa tồn tại**. Đây không
phải là thiếu tính năng phụ — đây là thiếu đúng 3 rule mà SOP liệt kê là Business Rules
bắt buộc (BR-ADM-002/003/004). Domain 01 đóng 3 gap này.

## B. Audit Manager — Rủi ro nếu không xử lý

| Rủi ro (theo §27 Risks & Controls của SOP) | Hiện trạng nếu không làm Domain 01 | Mức độ |
|---|---|---|
| Bỏ sót dị ứng/tiền sử y tế nguy hiểm khi enroll | Không có gate nào chặn — enrollment có thể hoàn tất mà không ai xác nhận y tế | **Cao** — đúng loại rủi ro AGENTS.md xếp ưu tiên #1 (an toàn trẻ) |
| Tuyển sinh tự ý hứa hẹn/áp mức chiết khấu sai | Không có ngưỡng, không có approval — discount trong `terms_json` do Admission Officer tự ghi, không ai chặn | **Cao** — rủi ro tài chính + SoD (AGENTS.md ưu tiên #3) |
| Giữ chỗ vô thời hạn, không giải phóng suất học | `valid_until` tồn tại nhưng vô nghĩa vì không có job đọc nó — offer ISSUED có thể treo mãi | **Trung bình** — ảnh hưởng vận hành, không phải an toàn/tài chính trực tiếp |
| SoD bị bỏ ngỏ giữa transition thường và approve-discount | Cùng một permission `offer:transition` cho mọi transition kể cả APPROVED | **Trung bình** — vi phạm AGENTS.md §6 "Permission phải kết hợp action+org+campus+domain+data class" ở mức domain |

**Khuyến nghị Audit Manager:** không cho Demo Track (Track B, Wave 1) build tiếp lên
Admission (SIS pickup, Medical MED-001 module...) trước khi 2 rủi ro Cao ở trên được xử
lý ở chính domain Admission — vì Medical MED-001 (Wave 1 kế tiếp) sẽ phụ thuộc vào việc
đã có khái niệm "Medical Cleared" nhất quán, tránh xây trùng hai nơi.

## C. Planning Manager — Instruction cho coding agent

### C.1 Phạm vi Domain 01 (chỉ làm đúng phạm vi này)

1. Medical clearance gate trước khi tạo Offer (BR-ADM-002).
2. Discount threshold + 1 cấp approval, dùng bảng cấu hình chung (BR-ADM-003).
3. Holding-seat auto-expiry job (BR-ADM-004).
4. Permission mới: `medical:read`, `medical:edit`, `offer:approve-discount`.
5. Test tương ứng mỗi rule (unit + integration, theo mẫu
   `docs/CODEX_EXECUTION_PLAN.md` mục T2).

**Không làm trong Domain 01** (để domain khác, tránh phình phạm vi):
payment webhook thật/mock, e-Sign, Student ID riêng biệt khỏi `enrollments.id`, đồng bộ
Bếp/Y tế (chưa có phân hệ), duplicate-check riêng cho Application, multi-tier approval
đầy đủ 3 cấp (chỉ làm 1 cấp, xem lý do ở C.3).

### C.2 Migration mới — `0008_admission_medical_discount_holding.sql`

```sql
CREATE TABLE medical_clearances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  application_id uuid NOT NULL REFERENCES applications(id),
  cleared boolean NOT NULL DEFAULT false,
  allergy_flags jsonb NOT NULL DEFAULT '[]',
  special_health_needs text,
  data_classification varchar(3) NOT NULL DEFAULT 'HRI' CHECK (data_classification = 'HRI'),
  cleared_by uuid REFERENCES user_accounts(id),
  cleared_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  UNIQUE (application_id)
);

CREATE TABLE rule_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  campus_id uuid REFERENCES campuses(id),
  config_key varchar(100) NOT NULL,
  value_json jsonb NOT NULL,
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_to timestamptz,
  updated_by uuid REFERENCES user_accounts(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- Một scope (org + campus có thể NULL = toàn org) chỉ có một bản ghi hiệu lực tại một
-- thời điểm cho cùng config_key: dùng partial unique index loại trừ khoảng valid_to IS
-- NULL trùng nhau (giống pattern one-Effective-SOP-version đã có ở migration 0002).
CREATE UNIQUE INDEX rule_configs_active_scope_key_idx
  ON rule_configs (organization_id, COALESCE(campus_id, '00000000-0000-0000-0000-000000000000'::uuid), config_key)
  WHERE valid_to IS NULL;

CREATE TABLE approval_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  entity_type varchar(50) NOT NULL,
  entity_id uuid NOT NULL,
  requested_by uuid NOT NULL REFERENCES user_accounts(id),
  approver_id uuid REFERENCES user_accounts(id),
  threshold_snapshot jsonb NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  reason text,
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  row_version bigint NOT NULL DEFAULT 1,
  CHECK (approver_id IS NULL OR approver_id <> requested_by)
);
CREATE INDEX approval_requests_entity_idx ON approval_requests (entity_type, entity_id);
```

Lý do 3 bảng generic thay vì bảng riêng cho từng use case: `rule_configs` và
`approval_requests` sẽ được domain khác dùng lại (Kitchen, Procurement, Bus...) theo
`docs/CODEX_FULL_DEMO_PLAN.md` §2.2-2.3 — làm đúng chuẩn ngay từ Domain 01 để không phải
sửa lại sau. `medical_clearances` tách bảng riêng (không gộp vào `applications`) vì đây
là dữ liệu `HRI` cần permission/audit riêng theo AGENTS.md §5.

### C.3 Logic nghiệp vụ

**Medical clearance (BR-ADM-002):**
- `MedicalService.setClearance(actor, applicationId, { cleared, allergyFlags, specialHealthNeeds })` — chỉ actor có `medical:edit` mới gọi được; ghi `cleared_by = actor.actorId`, `cleared_at = now()` khi `cleared = true`. Dùng `recordMutation` (action `medical.clearance.set`, eventType `MedicalClearanceSet`).
- Thêm guard thuần `assertMedicalCleared(clearance: { cleared: boolean } | undefined): void` trong `application.service.ts` (cùng chỗ với `assertOfferApprovalSeparation`, cùng phong cách) — ném `ConflictException('Medical clearance required before offer can be created')` nếu `!clearance?.cleared`.
- Gọi guard này trong `createOffer`, ngay sau khi xác nhận `application.status === 'DECISION_PENDING'`, trước khi insert offer. Query `medical_clearances` trong cùng transaction (`FOR UPDATE` không bắt buộc vì đây là read-check, nhưng đọc trong cùng `client` của transaction hiện có).
- Không thêm state mới vào `applicationStateMachine` — giữ nguyên state machine, đây là guard cross-cutting giống `assertOfferApprovalSeparation`, không phải state transition.

**Discount threshold + approval (BR-ADM-003, §14 Approval Matrix — đơn giản hóa 1 cấp):**
- Đơn giản hóa có chủ đích: SOP có 3 cấp theo %, nhưng approval engine đa cấp có
  delegation/escalation là phạm vi P1-E06 (Phase 1, chưa được phép xây theo
  `docs/backlog/PHASE_1_2_BACKLOG.md`). Domain 01 chỉ làm: **một ngưỡng cấu hình
  (`admission.discount_threshold_percent`), vượt ngưỡng thì cần đúng 1 approval** (không
  phân biệt 20% hay 50% — ghi rõ giới hạn này trong code comment và trong
  `docs/CODEX_EXECUTION_PLAN.md` mục "biết trước" khi hoàn thành, để không ai hiểu nhầm
  là đã có 3 cấp như SOP).
- `command.terms` khi `createOffer` cần có field `discountPercent?: number` (0-100).
  Validate: nếu có, phải trong khoảng [0, 100].
- Đọc ngưỡng: `SELECT value_json FROM rule_configs WHERE organization_id = $1 AND (campus_id = $2 OR campus_id IS NULL) AND config_key = 'admission.discount_threshold_percent' AND valid_to IS NULL ORDER BY campus_id NULLS LAST LIMIT 1`. Nếu không có config nào, **fail closed**: không cho tạo offer có `discountPercent > 0` (theo đúng tinh thần AGENTS.md §4 "thiếu quyết định thì đánh dấu blocker, không bịa default"). Test phải cover trường hợp thiếu config.
- Nếu `discountPercent > threshold`: `createOffer` vẫn tạo Offer ở status `DRAFT` như cũ, nhưng đồng thời tạo một `approval_requests` row (`entity_type = 'Offer'`, `requested_by = actor.actorId`, `threshold_snapshot = { discountPercent, thresholdPercent }`). Response trả thêm `requiresApproval: true, approvalRequestId`.
- `transitionOffer` sang `PENDING_APPROVAL` hoặc `APPROVED`: nếu offer có một `approval_requests` đang `PENDING` liên kết, **chặn** chuyển sang `APPROVED` cho đến khi approval đó `APPROVED` (409 `Conflict('Offer discount requires approval before it can be approved')`).
- Thêm endpoint mới `POST /applications/offers/:offerId/discount-approval` (permission `offer:approve-discount`, tách khỏi `offer:transition`) — actor duyệt/từ chối `approval_requests` tương ứng; chặn `approver_id === requested_by` bằng CHECK constraint đã có sẵn ở DB (defense-in-depth) + application-level check giống `assertOfferApprovalSeparation`.

**Holding-seat auto-expiry (BR-ADM-004):**
- Thêm `apps/worker/src/offer-expiry-runtime.ts` theo đúng pattern
  `apps/worker/src/outbox-runtime.ts` (poll loop, interval cấu hình qua
  `packages/config` — thêm biến `OFFER_EXPIRY_POLL_INTERVAL_MS`, có default hợp lý
  nhưng **không hardcode ý nghĩa nghiệp vụ "5 ngày"** — con số 5 ngày lấy từ
  `command.validUntil` do người tạo offer nhập, không phải hằng số trong code).
- Mỗi lần poll: `UPDATE offers SET status = 'EXPIRED', updated_at = now(), row_version = row_version + 1 WHERE status = 'ISSUED' AND valid_until < now() AND organization_id = ... RETURNING *` — chạy trong transaction, sau đó gọi `recordMutation` (action `offer.transition`, eventType `OfferExpired`) cho từng offer bị expire, **cùng transaction** với UPDATE (giữ nguyên bất biến audit+outbox+mutation một transaction theo AGENTS.md §6).
- Không dùng `SELECT ... FOR UPDATE SKIP LOCKED` cần thiết ở đây vì đây không phải hàng đợi cạnh tranh nhiều worker — nhưng nếu chạy nhiều instance worker, dùng advisory lock giống `scripts/migrate.mjs` để tránh double-processing. Ghi rõ giả định "single worker instance" nếu không làm advisory lock, để Audit Manager biết đây là giới hạn đã biết.
- Test: offer `ISSUED` với `valid_until` trong quá khứ → sau một vòng poll, status `EXPIRED`, có đúng 1 `audit_events` + 1 `outbox_events` tương ứng.

### C.4 Permission mới (`apps/api/src/modules/admission/*`)

- `medical:read`, `medical:edit` — gắn vào endpoint mới của `MedicalService`.
- `offer:approve-discount` — gắn vào endpoint duyệt discount; **khác** `offer:transition` để một actor chỉ có `offer:transition` (ví dụ Admission Officer) không tự duyệt được discount vượt ngưỡng, đúng §23 Internal Controls.
- Cập nhật seed permission/role demo (`database/seed/demo-seed.json`) để có ít nhất một persona "Cán bộ Y tế" chỉ có `medical:*` (không có `application:*`) và một persona "Hiệu trưởng" có `offer:approve-discount` nhưng không có `application:transition`, để negative test SoD chạy được đúng ý nghĩa (không phải chỉ pass vì actor có wildcard).

### C.5 UI/UX (đúng AGENTS.md §15: Tailwind, rounded-xl/2xl, dark mode, responsive)

- Trong `apps/web/src/app/sop-os-app.tsx`/`sop-workspace.tsx` (hoặc file mới
  `medical-clearance-panel.tsx`, `discount-approval-panel.tsx` theo đúng tinh thần atomic
  component của repo): thêm panel "Xác nhận Y tế" hiển thị khi persona = Cán bộ Y tế,
  cho phép set `cleared` + ghi `allergyFlags`/`specialHealthNeeds`; badge cảnh báo đỏ nếu
  `allergyFlags` không rỗng (đúng "gắn nhãn cảnh báo đỏ" ở §10 Bước 02).
- Panel "Yêu cầu duyệt chiết khấu": hiển thị danh sách `approval_requests` đang
  `PENDING` cho persona có `offer:approve-discount`; nút Approve/Reject có xác nhận rõ
  ràng (không phải một click vô tình).
- Trên danh sách Offer: hiển thị badge "Chờ duyệt chiết khấu" khi có `approval_requests`
  PENDING liên kết; hiển thị đếm ngược/hạn `valid_until` để người dùng thấy giữ chỗ sắp
  hết hạn trước khi worker tự expire (giá trị demo cao, chi phí thấp).

### C.6 Test bắt buộc (không giảm so với AGENTS.md §11)

- Unit: `assertMedicalCleared` (giống `assertOfferApprovalSeparation` — file test cạnh
  nó), tính ngưỡng discount (đọc rule_configs, fail-closed khi thiếu config).
- Integration (Postgres thật, theo mẫu Track A/T2): `createOffer` chặn khi chưa medical
  cleared; `createOffer` tạo `approval_requests` đúng khi vượt ngưỡng; `transitionOffer`
  chặn APPROVED khi còn `approval_requests` PENDING; approve-discount chặn tự duyệt;
  offer-expiry-runtime chuyển đúng offer quá hạn, không đụng offer chưa quá hạn hoặc
  không phải trạng thái ISSUED.
- Permission âm: actor không có `medical:edit` gọi `MedicalService.setClearance` → 403;
  actor không có `offer:approve-discount` gọi endpoint duyệt → 403; actor persona Y tế
  gọi `application:transition` → 403 (xác nhận SoD thật, không phải wildcard).

### C.7 Acceptance Criteria (map lại đúng §28 của SOP, thu hẹp theo phạm vi Domain 01)

- **Given** application ở `DECISION_PENDING` chưa có `medical_clearances.cleared = true`.
  **When** gọi `createOffer`. **Then** 409, không tạo offer, không audit record thành công (audit ghi nhận attempt bị chặn nếu pattern hiện có hỗ trợ, không bắt buộc).
- **Given** `discountPercent` vượt `rule_configs` threshold. **When** `createOffer`
  thành công. **Then** có đúng 1 `approval_requests` PENDING liên kết offer đó, response
  có `requiresApproval: true`.
- **Given** offer có `approval_requests` PENDING. **When** cố `transitionOffer` sang
  `APPROVED`. **Then** 409, offer giữ nguyên status cũ.
- **Given** offer `ISSUED` với `valid_until` đã qua. **When** worker poll chạy.
  **Then** offer chuyển `EXPIRED`, có audit+outbox tương ứng, seat coi như giải phóng
  (không có logic "seat" riêng cần cập nhật thêm vì hệ thống hiện tại không đếm sĩ số lớp
  — nếu cần đếm sĩ số thật, đó là gap khác, ghi nhận riêng không làm trong Domain 01).

---

## D. Gate trước khi báo cáo domain này hoàn thành

```bash
pnpm data:guard
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose config --quiet
```

Không commit nếu bất kỳ gate nào đỏ. Nếu một gate không chạy được (ví dụ cần Postgres
thật cho integration test), ghi rõ trong báo cáo domain gate nào chưa chạy và vì sao,
đúng AGENTS.md §11 "báo chính xác gate chưa chạy".
