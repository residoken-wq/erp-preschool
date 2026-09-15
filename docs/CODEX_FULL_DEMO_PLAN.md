# Full-Product Demo Build Plan (Demo Track)

**Ngày lập:** 15/09/2026. **Yêu cầu bởi:** Repository Owner, trong phiên làm việc với
coding agent, sau khi xem `docs/CODEX_EXECUTION_PLAN.md`. **Phạm vi:** toàn bộ 28
canonical SOP / 75 domain trong `docs/SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md` và
`docs/IMPLEMENTATION_ROADMAP.md` Phase 2–7, xây thành một bản demo chạy được, đầy đủ
UI/UX, không chỉ API.

## 0. Đây là quyết định phạm vi, không phải hành vi ngầm định

Theo `docs/backlog/PHASE_1_2_BACKLOG.md` mục "Cảnh báo sequencing" (15/09/2026), việc mở
rộng nghiệp vụ Admission thêm trước khi Phase 1 platform hardening xong bị coi là rủi ro
cần risk acceptance có thẩm quyền. Tài liệu này LÀ risk acceptance đó, giới hạn đúng
phạm vi: **một Demo Track** tách biệt, mục đích trình diễn toàn bộ sản phẩm, không phải
mở rộng phạm vi production hay thay đổi Gate G0.

- Không làm thay đổi `docs/governance/PHASE_0_GATE_G0.md` (vẫn `NOT READY FOR PASS`).
- Không waive AGENTS.md; chỉ nới lỏng đúng các mục liệt kê ở §1 dưới đây, có lý do.
- Khuyến nghị: nếu muốn quyết định này có hiệu lực governance lâu dài, ghi thành một
  mục có mã trong `docs/governance/DECISION_REGISTER.md` với owner/deadline thật — tài
  liệu này không tự tạo mã quyết định vì không có evidence phê duyệt độc lập.
- Mọi code thuộc Demo Track phải gắn nhãn rõ trong code/UI (`DEMO`/`MOCK`), để không ai
  nhầm là production-ready khi đọc lại sau này — đúng tinh thần AGENTS.md §3 về việc
  không để tuyên bố "hoàn tất" bị hiểu sai.

## 1. Nới lỏng gì, giữ nguyên gì

### Được nới lỏng (chỉ trong Demo Track, phải gắn nhãn DEMO/MOCK)

| Hạng mục | Production yêu cầu (giữ nguyên hướng) | Demo Track làm gì thay thế |
|---|---|---|
| Identity | OIDC thật (P1-E01) | Tiếp tục dùng persona/campus switcher dev-actor đã có (`apps/web` context switcher, `resolveDevelopmentActor`); mở rộng danh sách persona cho mọi module mới |
| Payment/e-Sign/SMS-Zalo | Vendor thật đã ký hợp đồng (DEC chưa chốt) | Mock adapter theo đúng pattern `apps/worker/src/outbox-adapter.ts` — tự động thành công/thất bại có thể bật tắt, log rõ "MOCK", fail-closed nếu `NODE_ENV=production` |
| Malware scan | Vendor/engine thật (P1-E09) | Mock luôn trả "clean" cho file synthetic, nhưng giữ nguyên allowlist/size/quarantine-state thật |
| Tenant RLS | Postgres RLS + composite FK (P1-E03) | Chỉ dùng service-layer org/campus scope đã có sẵn trong mọi service hiện tại — không viết RLS cho demo |
| Approval/rule engine versioned (P1-E06/E07) | Full versioned definition/instance/delegation/escalation | Bảng `rule_configs` (key/value/scope/valid_from-to) và `approval_requests` (1 cấp, chặn tự duyệt) đơn giản — đủ để demo config-driven threshold + SoD |
| Hardware GPS/biometric/QR/kitchen sensor | Tích hợp phần cứng thật | Adapter mock nhận sự kiện qua REST + script simulator đẩy dữ liệu theo interval |

### KHÔNG được nới lỏng (áp dụng cho mọi domain kể cả Demo Track)

- Không hardcode ngưỡng nghiệp vụ (% chiết khấu, SLA giờ, ratio giáo viên/trẻ...) — dùng
  `rule_configs`, đúng tinh thần AGENTS.md §4.
- Không rút gọn bước xác nhận con người cho hành động an toàn trẻ/y tế/tài chính
  (AGENTS.md §7.2): pickup, cho uống thuốc, xác nhận thanh toán/hoàn tiền, kỷ luật nhân
  sự, crisis statement, publish SOP, xóa/anonymize HRI vẫn phải qua deterministic
  rule + người có thẩm quyền — AI (nếu demo AI-0) chỉ ở recommendation/shadow mode.
- Audit + outbox vẫn ghi cho mọi mutation quan trọng, cùng transaction — pattern đã có
  (`recordMutation`), không tốn thêm nhiều effort, giữ nguyên vì đây chính là phần giúp
  demo "kể chuyện" về governance.
- Data classification/guard synthetic-only (DEC-020) vẫn bắt buộc — không có dữ liệu
  trẻ/phụ huynh/nhân sự thật trong Demo Track dưới bất kỳ hình thức nào.
- Mock provider không được có khả năng gọi ra ngoài thật (không SMS thật, không email
  thật, không webhook thật ra ngoài mạng demo) — fail-closed theo cấu hình, không phải
  theo quy ước lập trình viên.
- Tổ chức/campus scope trong mọi query vẫn bắt buộc (đã có, giữ nguyên).
- Quy ước UI/UX ở AGENTS.md §15 (Tailwind, rounded-xl/2xl, dark mode, responsive, atomic
  component) áp dụng cho mọi màn hình mới — demo có giá trị trình diễn thấp nếu UI không
  nhất quán với phần đã có.

## 2. "Demo Kit" — hạ tầng dùng chung, làm một lần, dùng lại cho ~20 domain

Không xây riêng lẻ 20 lần cùng một loại mock/approval/threshold. Làm trước 7 khối sau,
theo đúng pattern typed-adapter đã chứng minh ở outbox runtime:

1. **Mock Provider Adapter Kit** (đặt cạnh `apps/worker/src/outbox-adapter.ts` hoặc
   `apps/api/src/platform/providers/`):
   - `PaymentAdapter` — mock thành công/thất bại có thể cấu hình per-request (để demo
     luôn reconciliation UI), tự sinh webhook callback nội bộ.
   - `ESignAdapter` — mock auto-sign sau N giây, sinh placeholder "đã ký".
   - `MessagingAdapter` (SMS/Zalo OA) — ghi vào bảng `demo_notifications`, hiển thị ở
     màn hình "Notifications/Outbox" để demo show được "đây là SMS phụ huynh sẽ nhận".
   - `MalwareScanAdapter` — luôn trả clean cho file synthetic, giữ allowlist/size thật.
   - `TelematicsAdapter` — nhận sự kiện GPS/bus/kitchen-sample qua REST; kèm script
     simulator (`scripts/*-simulator.mjs`) đẩy sự kiện theo interval, cùng pattern với
     `scripts/demo-journey-smoke.mjs`.
   Mỗi adapter: interface trong `packages/contracts`, implementation mock riêng, guard
   fail-closed khi `NODE_ENV=production` (giống `outbox-adapter.ts:18-27`).

2. **`rule_configs`** — migration mới: `scope` (organization/campus), `key`, `value`
   (jsonb), `valid_from`/`valid_to`, `updated_by`, có audit. Dùng cho: ngưỡng chiết khấu,
   holding-fee TTL, ratio cảnh báo, SLA giờ, ngưỡng approval — mọi thứ lẽ ra bị hardcode.

3. **`approval_requests`** — generic: `entity_type`, `entity_id`, `requested_by`,
   `approver_id`, `threshold_snapshot` (jsonb), `status`, `decided_at`; service-layer
   chặn `requested_by === approver_id`. Dùng cho discount, PR/PO, budget — không dùng
   cho kỷ luật nhân sự/crisis (những việc đó vẫn cần rule engine thật + người theo
   AGENTS.md §7.2, không thay bằng generic approval demo).

4. **Guardian/relationship model** — `parent_guardians` hoặc bảng quan hệ tách khỏi
   `persons`: loại quan hệ, quyền đón trẻ, thông tin liên hệ. Cần cho SIS pickup,
   Admission, Medical.

5. **Secure document mock** — object storage (MinIO đã có trong `docker-compose.yml`) +
   `MalwareScanAdapter` mock + signed short-lived URL. Dùng cho Admission documents, HR
   bằng cấp, Facility/PCCC evidence, QA audit evidence.

6. **Mở rộng persona/campus kit** — `sop-os-app.tsx` context switcher đã có; thêm
   persona cho từng domain mới (Bếp trưởng, Vận hành xe bus, Nhân viên mua hàng, Quản lý
   nhân sự, Marketing, CSKH, QA Auditor, Governance/Crisis Lead) để demo "nhập vai" theo
   role.

7. **Campus thứ hai + seed synthetic riêng** — để demo multi-campus scoping (rẻ, giá trị
   trình diễn cao): thêm một campus, seed dữ liệu riêng, đảm bảo switcher đổi campus lọc
   đúng dữ liệu.

## 3. Thứ tự các wave (theo giá trị trình diễn + phụ thuộc kỹ thuật, không theo gate)

Đây là thứ tự demo-first, khác với gate sequencing production (Phase 1 trước Phase 2...).
Wave dưới đây giả định Demo Kit (mục 2) làm trước hoặc song song Wave 1.

- **Wave 1 — Hoàn thiện Admission + vận hành ngày đầu (an toàn & doanh thu):**
  đóng gap Application document/assessment còn thiếu, SIS pickup/attendance, nhật ký
  chăm sóc hàng ngày, y tế/dị ứng/thuốc, billing/hóa đơn, curriculum/timetable, RBAC/audit
  viewer.
- **Wave 2 — Vận hành hỗ trợ & tài sản:** bếp, procure-to-pay, tồn kho, cơ sở vật
  chất/PCCC, xe bus, nhân sự core, marketing.
- **Wave 3 — Quản trị doanh nghiệp & vòng đời:** đào tạo/hiệu suất nhân sự, thu chi tiền
  mặt, ngân sách/dự báo, rút học/hoàn phí, tốt nghiệp/chuyển cấp, chuyển cơ sở, khiếu
  nại/CSKH, QA/CAPA, quản trị đa cơ sở/BI, rủi ro/khủng hoảng.
- **Wave 4 — AI-0 shadow demo (tùy chọn, chỉ recommendation/shadow mode):** gợi ý SOP
  draft/summary, gợi ý trùng lặp Lead (đã có duplicate detection, chỉ cần UI gợi ý), gợi
  ý phân loại khiếu nại — không tự động quyết định.
- **Wave 5 — Đa cơ sở & hoàn thiện:** campus thứ hai, dashboard liên module (attendance
  → billing, medical alert), rà soát accessibility/dark-mode/responsive trên toàn bộ màn
  hình mới.

## 4. Domain backlog theo canonical SOP

Mỗi domain: đọc đúng 30 mục chuẩn trong `docs/ERP_PreSchoolSOP (1).md` tại vị trí nêu ở
cột "Nguồn" để lấy BR/FR/AC/Exception/Permission Matrix chi tiết trước khi code — bảng
dưới đây chỉ nêu khung demo deliverable, không thay thế việc đọc SOP gốc.

### Wave 1

| Canonical ID | Nguồn (dòng) | Code hiện tại | Demo deliverable | Mock/Kit dùng |
|---|---|---|---|---|
| SOP-ADM-001/002/004 | Gộp trong SOP-ADM-003 (dòng 152) và canonical mapping mục 1 của `SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md`; không có Thẻ riêng | Bảng `application_documents`/`assessments` có, chưa có service/UI (xem `docs/CODEX_EXECUTION_PLAN.md` mục T4) | Upload/verify document (checklist trạng thái pending/verified/rejected), lên lịch + ghi kết quả + finalize assessment, gắn vào Application timeline UI | Secure document mock (mục 2.5) |
| SOP-SIS-001 | Thẻ 3, dòng 545 | Chưa có | `attendance_events` (check-in/out, method, actor), pickup-authorization theo `parent_guardians`, màn hình điểm danh lớp + xác nhận đón trẻ 2 bước (chọn người đón → xác nhận), exception khi người đón không trong danh sách | Guardian model (2.4), Telematics mock cho QR/biometric giả lập (2.1) |
| SOP-SIS-002 | Thẻ 11, dòng 4692 | Chưa có | `daily_activity_logs`, `development_observations`; màn hình giáo viên ghi nhật ký theo lớp, màn hình phụ huynh xem (trong demo dùng cùng SPA, đổi persona) | — |
| SOP-MED-001 | Thẻ 8, dòng 2983 | Chưa có (rủi ro an toàn cao nhất — ưu tiên đúng quy trình xác nhận, không rút gọn) | `medical_records`, `allergy_flags`, `medication_administrations`, `health_incidents`; màn hình y tá ghi nhận + xác nhận 2 bước khi cho uống thuốc, cảnh báo dị ứng hiển thị đúng role/campus | Không mock bước xác nhận người; chỉ mock thiết bị đo (nếu có) |
| SOP-FIN-001 | Thẻ 4 (sau Thẻ đổi tên), dòng ~918 | Chưa có; `fee_plans`/`contracts` đã có ở Admission | `invoices`, `payment_records`, khấu trừ phí ăn theo attendance; màn hình AR, đối soát thanh toán | PaymentAdapter mock (2.1) |
| SOP-ACA-001 | Thẻ 13, dòng 5876 | Chưa có | `curriculum_programs`, `lesson_plans`, `timetables`, `teacher_assignments`; màn hình xây TKB, cảnh báo ratio giáo viên/trẻ theo `rule_configs` | Rule config (2.2) |
| SOP-SEC-001 | Thẻ 16, dòng 7723 | Có khung `permissions.ts` cơ bản | Mở rộng RBAC theo domain/data-class, màn hình xem audit log/security event đầy đủ hơn `/audit-integrity` hiện có | — |

### Wave 2

| Canonical ID | Nguồn (dòng) | Demo deliverable | Mock/Kit dùng |
|---|---|---|---|
| SOP-KIT-001 | Thẻ 5, dòng 1327 | Menu/định mức dinh dưỡng, cảnh báo dị ứng chéo với `allergy_flags`, đếm suất ăn theo attendance, lưu mẫu thực phẩm 24h (evidence log) | Secure document mock cho ảnh lưu mẫu |
| SOP-PUR-001 | Thẻ 12, dòng 5229 | PR → approval → PO → nhận hàng → 3-way match; dùng `approval_requests` cho PR/PO | Approval kit (2.3) |
| SOP-INV-001 | Thẻ 22, dòng 11496 | Stock ledger, xuất kho lớp học, kiểm kê định kỳ, biến động | — |
| SOP-FAC-001 | Thẻ 15, dòng 7114 | Yêu cầu bảo trì/helpdesk, checklist an toàn PCCC có evidence ảnh | Secure document mock |
| SOP-BUS-001 | Thẻ 7, dòng 2500 | Route/trip, điểm danh lên/xuống xe, xác nhận ghế sau (rear-seat check bắt buộc, không rút gọn), GPS mock | Telematics mock (2.1) |
| SOP-HR-001 | Thẻ 6, dòng 1902 | Hồ sơ nhân sự, bằng cấp/safeguarding check, phân công giảng dạy, chấm công, export payroll | Secure document mock cho bằng cấp |
| SOP-MKT-001 | Thẻ 20, dòng 10205 | Campaign/event, gắn attribution vào Lead source đã có, ngân sách + CAC/ROI dashboard | — |

### Wave 3

| Canonical ID | Nguồn (dòng) | Demo deliverable | Mock/Kit dùng |
|---|---|---|---|
| SOP-HR-002 | Thẻ 24, dòng 12646 | Đào tạo/competency, đánh giá hiệu suất; khen thưởng/kỷ luật **giữ nguyên workflow người phê duyệt thật**, không dùng generic approval demo cho kỷ luật | — |
| SOP-FIN-002 | Thẻ 14, dòng 6459 | Thu chi tiền mặt/ngân hàng, tạm ứng, thanh toán chi phí vận hành, đối soát | PaymentAdapter mock |
| SOP-FIN-003 | Thẻ 25, dòng 13304 | Ngân sách theo version, kiểm soát chi tiêu, dự báo dòng tiền 12 tuần | Rule config cho ngưỡng ngân sách |
| SOP-ADM-005 | Thẻ 19, dòng 9590 | Rút học, hoàn phí/cọc, bảo lưu, quyết toán hợp đồng | PaymentAdapter mock cho hoàn tiền |
| SOP-ADM-006 | Thẻ 26, dòng 13975 | Tốt nghiệp, hoàn thiện học bạ, chuyển cấp | Secure document mock |
| SOP-ADM-007 | Thẻ 23, dòng 12140 | Chuyển lớp/cơ sở, đồng bộ công nợ và hồ sơ giữa campus, không lộ/copy sai HRI | Campus thứ hai (2.7) |
| SOP-CS-001 | Thẻ 21, dòng 10849 | Khiếu nại/service request, SLA, CSAT/NPS | MessagingAdapter mock cho phản hồi |
| SOP-QA-001 | Thẻ 18, dòng 8946 | Audit plan/checklist/evidence/CAPA | Secure document mock |
| SOP-GOV-001 | Thẻ 17, dòng 8341 | Cấu hình đa cơ sở, BI dashboard tổng hợp | Campus thứ hai (2.7) |
| SOP-GOV-004 | Thẻ 27, dòng 14479 | Risk/crisis case, war room, evidence lock; **statement/publish vẫn cần người phê duyệt thật**, không tự động hóa | — |

### Wave 4 (tùy chọn)

AI-0 shadow demo: SOP draft/summary assist trong SOP Studio; gợi ý trùng lặp Lead (dựa
trên `pre-g1-data-policy`/duplicate check đã có, chỉ cần UI hiển thị gợi ý — không tự
merge); gợi ý phân loại mức độ khiếu nại (CS-001) ở dạng shadow, CSKH luôn xác nhận. Tất
cả theo đúng AGENTS.md §7.

## 5. Gate cho Demo Track

Không dùng gate production đầy đủ (OIDC, RLS, threat sign-off) vì đã nới lỏng có chủ
đích ở mục 1. Vẫn bắt buộc trước khi coi một domain demo là "xong":

```bash
pnpm data:guard
pnpm lint
pnpm typecheck
pnpm test        # + integration test mới cho domain đó, theo mẫu Track A/T2
pnpm build
docker compose config --quiet
```

- Mọi mock provider có test xác nhận fail-closed khi `NODE_ENV=production`.
- Mọi mutation quan trọng có audit + outbox test (theo pattern `recordMutation`).
- Mọi ngưỡng nghiệp vụ đọc từ `rule_configs`, không hardcode — có test xác nhận đổi
  config thì hành vi đổi theo.
- UI mới theo AGENTS.md §15 (Tailwind, dark mode, responsive) — kiểm bằng mắt qua
  `pnpm dev`/`pnpm local:start` trước khi coi là xong, vì test tự động không xác nhận
  UI/UX.

## 6. Quan hệ với `docs/CODEX_EXECUTION_PLAN.md`

`docs/CODEX_EXECUTION_PLAN.md` (Track A) vẫn giá trị nguyên vẹn: hardening code Admission
hiện có (T1-T5) là nền tảng để Wave 1 domain SOP-ADM-001/002/004 dùng lại đúng pattern
(`recordMutation`, `StateMachine`, `row_version`). Khuyến nghị làm Track A T2-T3 trước khi
mở rộng Wave 1, vì Demo Kit (mục 2) và domain mới sẽ nhân bản đúng pattern đó nhiều lần —
sửa nền tảng trước sẽ rẻ hơn sửa sau khi đã có 20 domain copy pattern cũ.
