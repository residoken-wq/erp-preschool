# Step 05 — REVISE (sau audit FAIL lần 1)

> File này do Claude (Planning/BA Manager) soạn sau khi `reports/step-05-audit.md` = FAIL.
> Đây KHÔNG phải spec mới — chỉ 2 việc cụ thể cần sửa trên nền code đã có ở commit
> `25faab5`. Không tự ý sửa gì khác ngoài 2 mục dưới đây. Không viết lại toàn bộ
> `medical-clearance-panel.tsx`/`discount-approval-panel.tsx`/`sop-os-app.tsx` — chỉ vá
> đúng chỗ lỗi.

## 0. Bối cảnh (đọc `reports/step-05-audit.md` trước, đây chỉ là tóm tắt)

Audit dựng full-stack thật (`docker compose up postgres migrate api web`) và gọi API thật
bằng `curl`/`node fetch`, phát hiện 2 vấn đề — không phải suy đoán, đã tái hiện được:

- **(A) Bug thật, chặn golden path AC1:** `GET /medical/clearances/:id` khi application
  **chưa có clearance nào** trả **200 với body rỗng 0 byte** (không phải JSON `"null"`) —
  NestJS serialize giá trị trả về `null` từ `MedicalController.getClearance` thành
  "không có nội dung" thay vì `res.json(null)`. `api<T>()` (`sop-os-app.tsx:79-86`) gọi
  `response.json()` không có xử lý cho trường hợp body rỗng ở path 200 → ném
  `SyntaxError: Unexpected end of JSON input`, rơi vào `.catch()` của
  `ApplicationPanels`, hiển thị lỗi kỹ thuật thay vì "Chưa có xác nhận y tế." + form trống.
  Đã xác nhận: sau khi PUT một lần (clearance đã tồn tại), GET sau đó trả JSON thật bình
  thường — bug chỉ xảy ra đúng lần đầu tiên, nhưng đó lại là trường hợp phổ biến nhất
  (mọi application mới).
- **(B) Blocker đã biết trước (Codex tự báo, Claude xác nhận độc lập):**
  `GET /applications` (endpoint duy nhất trả dữ liệu offer cho UI, trong
  `application.service.ts:71-112`) chỉ SELECT `offer_id, offer_code, offer_status` — không
  có cột nào phản ánh `approval_requests.status` hay `offers.valid_until`. Không có `GET`
  nào khác (kể cả gián tiếp qua `/audit-events`) trả 2 giá trị này. `DiscountApprovalPanel`
  vì vậy luôn nhận `pendingApproval: null, validUntil: null` — không hoạt động được thật.

## 1. Việc A — Sửa an toàn khi response 200 có body rỗng

**Phạm vi:** `apps/web/src/app/sop-os-app.tsx` — chỉ hàm `api<T>()` (dòng ~79-86), HOẶC
nếu sửa ở đây ảnh hưởng khó lường tới các lời gọi khác đang hoạt động đúng (task/journey/sop),
có thể thay bằng cách xử lý cục bộ chỉ tại 2 chỗ gọi `GET /medical/clearances/:id` trong
`ApplicationPanels` — Codex tự quyết định cách nào an toàn hơn, miễn thoả:

- Response 200 với body rỗng phải được coi là giá trị hợp lệ tương đương `null`/`undefined`,
  KHÔNG ném exception, KHÔNG hiển thị lỗi.
- Response 200 có JSON body thật (mọi endpoint khác hiện tại) phải parse và trả về y hệt
  hành vi cũ — không được thay đổi hành vi của bất kỳ lời gọi `api<T>()` nào khác đang chạy
  đúng (tasks, demo journey, sop workspace, discount-approval...).
- Không đổi contract phía `apps/api` cho việc này — đây thuần là vấn đề phía client parse
  response, không sửa `apps/api/**`.

**Cách gợi ý (Codex có thể chọn cách khác miễn thoả ràng buộc trên):** đọc
`await response.text()` trước, nếu chuỗi rỗng trả `null as T`, ngược lại `JSON.parse(text)`.

## 2. Việc B — Mở rộng tối thiểu read contract cho Offer

**Phạm vi được phép sửa/tạo (ngoại lệ có kiểm soát, chỉ cho việc B):**
- `apps/api/src/modules/admission/application.service.ts` — **CHỈ** sửa method `list()`
  (dòng ~71-112). Thêm đúng 2 field đọc, KHÔNG đổi bất kỳ state machine/business rule/
  permission nào khác trong file này.
- `apps/web/src/app/sop-os-app.tsx` — chỗ dựng prop `offer` cho `ApplicationPanels` (hiện
  đang hard-code `pendingApproval: null, validUntil: null`), đổi sang đọc field thật từ
  response `list()`.
- `apps/web/src/app/discount-approval-panel.tsx` — **không cần sửa** nếu type `ApprovalOffer`
  đã đúng shape (`pendingApproval: boolean | null`, `validUntil: string | null`) — chỉ đổi
  nơi gọi nó trong `sop-os-app.tsx`.

**KHÔNG được đụng vào:**
- Bất kỳ endpoint POST/PUT nào trong `application.service.ts` (`createOffer`,
  `transitionOffer`, `decideOfferDiscountApproval`) — chỉ thêm field vào câu SELECT của
  `list()`.
- `apps/api/src/platform/approval-requests.ts` — không cần sửa, chỉ SELECT thêm ở
  `application.service.ts`.
- Permission/`@RequirePermissions` của `ApplicationController` — giữ nguyên
  `application:read` cho toàn bộ `list()`, không tách permission riêng cho 2 field mới
  (quyết định: `offer_status` hiện đã lộ workflow stage cho bất kỳ ai có `application:read`;
  thêm cờ boolean "đang chờ duyệt" + ngày hết hạn giữ chỗ không tăng thêm mức nhạy cảm dữ
  liệu so với những gì `list()` đã trả — KHÔNG trả `discountPercent`, `thresholdPercent`,
  hay `approval_requests.id`/`reason`, giữ đúng data minimization AGENTS.md §5).

**Hướng dẫn kỹ thuật (không bắt buộc theo đúng câu SQL, miễn đúng kết quả và không đổi
hành vi hiện có của `list()`):** mở rộng LATERAL subquery `latest_offer` hiện có (dòng
85-89) để thêm `o.valid_until` và một cột boolean kiểm tra tồn tại
`approval_requests` với `entity_type = 'Offer'`, `entity_id = o.id`,
`status = 'PENDING'`, cùng `organization_id` — rồi thêm 2 field đó vào SELECT top-level
(dòng 74-81) với tên field mới (ví dụ `offer_valid_until`, `offer_discount_pending`) —
tự đặt tên rõ ràng, nhất quán với convention `offer_*` đã có.

## 3. Acceptance Criteria bổ sung (đo được, dùng để audit lại)

- [ ] Application **chưa có clearance nào**: mở panel không còn lỗi đỏ — hiển thị đúng
      "Chưa có xác nhận y tế." + form trống (đã test lại bằng `curl`/`node fetch` mô phỏng
      đúng `fetch().json()` như audit lần 1, không chỉ đọc code).
- [ ] Toàn bộ AC1-AC4, AC9 cũ ở `tasks/step-05.md` vẫn đạt sau khi sửa (không hồi quy).
- [ ] `GET /applications` trả đúng `offer_discount_pending = true` khi có
      `approval_requests` PENDING cho offer đó, `false` khi không có/đã quyết định xong,
      và `offer_valid_until` đúng giá trị cột `valid_until` của offer mới nhất — verify
      bằng cách tự tạo 1 offer có discount vượt threshold qua API thật (cần
      `rule_configs` tạm — Codex có thể tự INSERT trực tiếp bằng SQL trong test/integration
      test, KHÔNG sửa `database/seed/demo-seed.json`) rồi gọi `list()` xác nhận field mới.
- [ ] `DiscountApprovalPanel` trong `sop-os-app.tsx` nhận đúng `pendingApproval`/
      `validUntil` thật (không còn hard-code `null`); nút Approve/Reject xuất hiện đúng khi
      `offer_discount_pending = true` và actor có `offer:approve-discount`.
- [ ] Không có thay đổi ngoài phạm vi mục 1-2 ở trên.

## 4. Định nghĩa Done

- [ ] `pnpm lint && pnpm typecheck && pnpm build` xanh cho cả `apps/web` và `apps/api`
      (Việc B đụng `apps/api`, khác Step 05 gốc — bắt buộc build/typecheck cả 2 app).
- [ ] `pnpm test` — nếu Codex thêm test tích hợp Postgres thật cho field mới ở `list()`
      (khuyến khích vì đây là thay đổi `apps/api`, có framework test sẵn, khác UI thuần
      của Step 05 gốc), phải pass. Không bắt buộc test React mới (giữ đúng quyết định gốc
      của Step 05: không có framework test React trong repo).
- [ ] Vẫn áp dụng rule tiết kiệm quota `docs/PLAN.md` §0: Codex **không** cần tự dựng
      `apps/web` dev server/full-stack để kiểm tra bằng mắt — Claude làm lại ở audit lần 2,
      lần này sẽ tự tạo offer thật qua API để verify Việc B đầy đủ.
- [ ] Đã commit theo format: `fix(step-05): handle empty medical clearance response and expose offer approval read fields`
- [ ] Không có thay đổi ngoài phạm vi mục 1-2.

## 5. Ghi chú cho Codex

- Việc A và B độc lập nhau, có thể sửa trong 1 commit chung (cùng thuộc "Step 05 revise").
- Nếu phát hiện thêm gap khác trong lúc sửa, ghi vào mục "Đề xuất phát sinh" bên dưới,
  KHÔNG tự implement thêm ngoài 2 việc đã mô tả.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
