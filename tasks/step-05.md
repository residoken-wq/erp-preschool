# Step 05 — UI: panel xác nhận y tế + panel duyệt chiết khấu

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 0. Quyết định đã chốt trước khi viết spec này (không tự suy diễn lại)

`reports/step-02-audit.md` mục 5-6 nêu: PUT `/medical/clearances` chưa có idempotency
key/expected-`rowVersion`, cần Planning Manager quyết định trước khi UI cho phép nhiều
người sửa. **Quyết định:** KHÔNG thêm optimistic concurrency ở step này. Lý do: demo
hiện chỉ có một actor Y tế thao tác tại một thời điểm (không có multi-editor thật), rủi
ro ghi đè thấp; UI sẽ luôn tự động tải lại dữ liệu mới nhất sau mỗi hành động thành công
(refetch), theo đúng pattern `refresh()` đã có trong `sop-os-app.tsx`. Nếu sau này có
nhiều người dùng thật cùng sửa, đó là quyết định làm lại contract PUT, không phải sửa UI.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** Step 02/03 đã có API đầy đủ cho medical clearance
  (`GET/PUT /medical/clearances/:applicationId`) và discount approval
  (`POST /applications/offers/:offerId/discount-approval`), nhưng chưa có màn hình nào
  gọi tới — Cán bộ Y tế và Hiệu trưởng/Admission Manager không có cách thao tác qua UI,
  chỉ có thể gọi API trực tiếp.
- **Phục vụ luồng nào:** hoàn thiện trải nghiệm SOP-ADM-003 §10 Bước 02 (khảo sát y tế)
  và Bước 03 (duyệt chiết khấu) trên UI, để demo journey (Step 06) có thể chạy end-to-end
  qua giao diện thay vì chỉ qua script.
- **Ai dùng kết quả:** Step 06 (seed + cập nhật `demo-journey-smoke.mjs`) sẽ dùng đúng
  các nút/hành động UI này (hoặc gọi thẳng API tương ứng) để hoàn thiện golden path.

## 2. Mục tiêu kỹ thuật

- **Input:** API đã có từ Step 02/03 (`GET/PUT /medical/clearances/:id`,
  `POST .../offers/:id/discount-approval`), pattern UI đã có (`task-board.tsx` là khuôn
  chuẩn: component thuần nhận props, cha sở hữu fetch/state qua hàm `api<T>()` có sẵn
  trong `sop-os-app.tsx`).
- **Output mong đợi:**
  1. `MedicalClearancePanel` — hiển thị khi xem một Application, cho actor có quyền
     `medical:edit` (ẩn hoàn toàn nếu actor không có persona liên quan; nếu actor có
     `medical:read` nhưng không có `medical:edit`, hiển thị read-only + badge, không hiện
     form sửa — server vẫn là chốt chặn cuối, UI chỉ là trải nghiệm, không phải security
     control theo AGENTS.md §5 "UI masking không phải security control").
  2. `DiscountApprovalPanel` — hiển thị trong danh sách Offer khi có
     `approval_requests` PENDING liên kết, cho actor có `offer:approve-discount`; nút
     Approve/Reject có bước xác nhận rõ ràng (không phải 1 click vô tình — dùng
     `window.confirm` hoặc modal xác nhận, theo mức đơn giản nhất phù hợp pattern hiện
     có, không cần thư viện modal mới).
  3. Badge cảnh báo dị ứng đỏ khi `allergyFlags` không rỗng (đúng SOP §10 Bước 02 "gắn
     nhãn cảnh báo đỏ"), badge "Chờ duyệt chiết khấu" trên Offer có approval PENDING,
     hiển thị đếm ngược/hạn `valid_until` trên Offer `ISSUED` (giá trị demo cao, chi phí
     thấp, không phụ thuộc code nào khác ngoài dữ liệu đã có).
- **Ràng buộc kiến trúc/UI (AGENTS.md §15, bắt buộc):** Tailwind, rounded-xl/2xl,
  dark-mode variant cho mọi màu nền/chữ mới (theo đúng khuôn `task-board.tsx`:
  `dark:bg-slate-900 dark:text-slate-100`...), responsive (thu gọn thành card trên mobile
  nếu panel có bảng), component nguyên tử tách file riêng (không nhồi thêm 200 dòng vào
  `sop-os-app.tsx`), không code trùng lặp — tái dùng `api<T>()` đã có, không viết lại
  fetch helper mới.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `apps/web/src/app/medical-clearance-panel.tsx` (mới) — component thuần theo khuôn
  `task-board.tsx` (props in, callback ra, không tự fetch bên trong component).
- `apps/web/src/app/discount-approval-panel.tsx` (mới) — tương tự.
- `apps/web/src/app/sop-os-app.tsx` — thêm state/fetch cho 2 API mới (theo đúng pattern
  `updateTask`/`runJourneyAction` đã có: gọi `api<T>()`, xử lý lỗi, gọi lại `refresh()`
  hoặc refetch phần liên quan sau khi thành công), render 2 panel mới ở đúng chỗ hiển
  thị chi tiết Application/Offer (cạnh `DemoJourney` hiện có).
- `apps/web/src/app/demo-journey-state.ts` / `demo-journey.tsx` — **chỉ nếu cần** thêm
  action type mới cho luồng xác nhận y tế/duyệt discount vào danh sách hành động sẵn có
  của `DemoJourney` (đọc file trước khi sửa để quyết định có cần hay không; nếu 2 panel
  mới đứng độc lập không cần tích hợp vào `DemoJourney`, không sửa 2 file này).

**KHÔNG được đụng vào:**
- `apps/api/**`, `apps/worker/**` — không có API mới ở step này, chỉ dùng API đã có từ
  Step 02/03.
- `database/seed/demo-seed.json` — persona Cán bộ Y tế/approver là việc Step 06, **không
  thêm ở đây**. Step 05 chỉ cần làm UI hoạt động đúng với actor hiện có (kể cả khi actor
  đó không có quyền, UI phải ẩn đúng/hiện đúng theo response API thật, không giả lập).
- `apps/web/src/app/sop-os-app.tsx` phần persona list (`demoPersonas` array) — không
  thêm/sửa persona ở đây, đó là Step 06.
- Không thêm thư viện UI mới (modal, date-picker...) — dùng HTML/Tailwind thuần hoặc
  `window.confirm`, đúng mức độ đơn giản đã dùng trong `task-board.tsx`.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] Actor có `medical:edit`: thấy form set `cleared`/`allergyFlags`/`specialHealthNeeds`
      cho Application đang xem; submit gọi đúng `PUT /medical/clearances/:id`; thành công
      thì UI cập nhật lại đúng dữ liệu mới (refetch, không tự suy đoán state).
- [ ] Actor chỉ có `medical:read` (không có `medical:edit`): thấy dữ liệu read-only,
      không thấy form sửa, không có nút submit nào gọi được PUT.
- [ ] Actor không có cả hai quyền: không thấy panel (ẩn hoàn toàn, không phải disabled).
- [ ] `allergyFlags` không rỗng: hiển thị badge đỏ rõ ràng, đọc được cả ở dark mode.
- [ ] Offer có `approval_requests` PENDING: hiển thị badge "Chờ duyệt chiết khấu"; actor
      có `offer:approve-discount` thấy nút Approve/Reject có bước xác nhận; actor không
      có quyền không thấy nút.
- [ ] Click Approve/Reject gọi đúng `POST .../discount-approval` với `decision` tương
      ứng; lỗi 409 (tự duyệt, đã quyết định rồi...) hiển thị thông báo lỗi rõ ràng
      (`aria-live`, theo khuôn `error` prop của `task-board.tsx`), không crash UI.
- [ ] Offer `ISSUED` hiển thị hạn `valid_until` dễ đọc (dùng `Intl.DateTimeFormat`, theo
      khuôn `formatDueDate` đã có trong `task-board.tsx`).
- [ ] Toàn bộ UI mới đọc được ở cả light/dark mode, không vỡ layout ở khổ ~400px
      (kiểm bằng mắt qua `pnpm dev`, ghi lại đã kiểm tra trong báo cáo — test tự động
      không xác nhận được UI/UX).
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm lint && pnpm typecheck && pnpm build` xanh (đặc biệt `apps/web` build vì
      đây là thay đổi React/Next.js). Đây là bằng chứng bắt buộc Codex phải tự chạy.
- [ ] **Cập nhật theo `docs/PLAN.md` §0 (chốt 15/09/2026, sau Step 04):** Codex **không**
      cần tự chạy `pnpm dev`/dựng full-stack để kiểm tra bằng mắt — việc này chuyển hoàn
      toàn sang bước audit của Claude (dựng `apps/web` + `apps/api` thật, thao tác qua
      trình duyệt) để tiết kiệm cửa sổ usage 5 giờ của Codex. Thay vào đó, Codex tự review
      tĩnh logic hiển thị/ẩn theo quyền trong diff (đọc lại đúng điều kiện render của từng
      panel so với Acceptance Criteria mục 4) và ghi rõ trong commit message/báo cáo đã
      tự soát lại các điều kiện đó bằng cách đọc code, không phải chạy UI thật.
- [ ] Không có `pnpm test` mới bắt buộc ở step này (UI thuần, không có unit test framework
      cho React trong repo hiện tại — nếu muốn thêm, ghi vào "Đề xuất phát sinh", không
      tự ý cài `@testing-library/react` mới).
- [ ] Đã commit theo format: `feat(step-05): add medical clearance and discount approval UI panels`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là step đầu tiên của Domain 01 không có test tự động làm bằng chứng chính —
  AGENTS.md §11 chấp nhận "ghi chính xác gate chưa chạy và lý do" khi không thể test tự
  động; ở đây lý do là UI/UX cần mắt người, không phải né tránh viết test.
- Không tự tạo persona demo mới trong `demoPersonas` để "test cho dễ" — nếu thấy cần một
  actor có `medical:edit`/`offer:approve-discount` để tự kiểm tra bằng `pnpm dev`, dùng
  tạm header actor giả lập qua devtools/curl để xác nhận API, không sửa file scope Step 06.
- Nếu phát hiện props/contract của `api<T>()` không đủ để xử lý lỗi 409 khác 403/404 một
  cách rõ ràng (ví dụ cần phân biệt "tự duyệt" và "đã quyết định rồi" để hiện thông báo
  khác nhau), đó là quyết định UX nhỏ Codex có thể tự chọn cách hiển thị message lỗi từ
  response, không cần hỏi lại — chỉ hỏi nếu cần đổi contract API.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
