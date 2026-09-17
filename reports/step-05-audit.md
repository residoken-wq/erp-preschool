# Audit Report — Step 05

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với
> `tasks/step-05.md` và SOP nguồn liên quan. Không đọc lại toàn bộ codebase — chỉ audit
> phần thay đổi trong step này.

## 1. Thông tin step

- Task spec: `tasks/step-05.md`
- Commit được audit: `25faab5` (`feat(step-05): add medical clearance and discount
  approval UI panels`), branch `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, sandbox `workspace-write`). Codex không tự
  commit được được (`.git/index.lock: Read-only file system` trong sandbox) — Claude
  `git add`/`git commit` hộ đúng nội dung diff Codex tạo ra, không sửa nội dung.
- Ngày audit: 16/09/2026
- Phương pháp verify:
  1. Đọc toàn bộ diff (4 file, 212 dòng thêm).
  2. Tự chạy lại độc lập `pnpm --filter @sop-os/web lint/typecheck/build` (không tốn quota
     Codex) — cả 3 xanh.
  3. Dựng full-stack thật: `docker compose up -d --build postgres migrate api web` (bỏ
     qua `minio` vì môi trường audit không kéo được image `minio/minio` — không ảnh hưởng
     vì 2 endpoint của step này không đụng object storage) → cả 4 service `healthy`/`Up`.
  4. Dùng `curl`/`node fetch` gọi trực tiếp `GET/PUT /medical/clearances/:id` với actor
     thật từ `demo-seed.json`, mô phỏng 3 tổ hợp quyền (`medical:edit`+`medical:read` mặc
     định dev-wildcard, chỉ `medical:read` qua header `x-permissions` giả lập, không quyền
     y tế nào) để đối chiếu đúng hành vi mà 2 component mới giả định.
  5. **Giới hạn phải ghi nhận:** phiên Claude hiện tại **không có công cụ trình duyệt/chụp
     màn hình** (đã kiểm tra `ToolSearch`, không có Playwright/Puppeteer/screenshot nào khả
     dụng) — không thể tự "nhìn bằng mắt" dark mode/responsive như AC8 yêu cầu. Đây là gate
     không chạy được trong phiên này, không phải né tránh (AGENTS.md §11). Đã bù bằng việc
     đọc kỹ từng class Tailwind trong diff (mục 4, AC8) thay cho quan sát trực quan.

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | Actor `medical:edit`: form set/PUT/refetch đúng | ❌ **Không đạt** | Đúng khi application **đã có** clearance (xác nhận bằng PUT rồi GET lại qua curl, JSON round-trip đúng field). **Nhưng khi application CHƯA có clearance nào** (trường hợp mặc định cho mọi application mới — toàn bộ 2 application trong `demo-seed.json` đều ở trạng thái này trước khi ai chạm vào) → `GET /medical/clearances/:id` trả **200 với body rỗng 0 byte, không có `Content-Type`** (NestJS coi return value `null` như "no content", không serialize thành JSON `"null"`; xác nhận bằng `curl -D`/`xxd` và mô phỏng đúng `fetch().json()` bằng Node — ném `SyntaxError: Unexpected end of JSON input`). `api<T>()` trong `sop-os-app.tsx:79-86` không bọc `response.json()` trong try/catch cho path 200, nên lỗi này rơi thẳng vào `.catch()` của `useEffect`, hiển thị banner đỏ lỗi kỹ thuật thay vì "Chưa có xác nhận y tế." + form trống. Đây là bug integration mới phát hiện ở bước audit, chặn đúng bước đầu tiên của golden path SOP-ADM-003 §10 Bước 02 (Cán bộ Y tế mở Application mới để nhập lần đầu) — không phải lỗi tưởng tượng, đã tái hiện được 100%. |
| 2 | Actor chỉ `medical:read`: read-only, không form, PUT không gọi được | ✅ Đạt (logic/contract) | Xác nhận qua curl: `GET` 200, `PUT` 403 khi actor chỉ có `medical:read`. Component ẩn `ClearanceForm` đúng khi `canEdit=false`. Gặp cùng bug #1 nếu application chưa có clearance — không tính lỗi kép, đã gộp vào AC1. |
| 3 | Actor không quyền: ẩn hoàn toàn | ✅ Đạt | `MedicalClearancePanel`: `if (!canRead && !canEdit) return null` — đúng, và `useEffect` fetch cũng early-return nên không gọi API thừa. Xác nhận `GET` với permission không liên quan trả 403 đúng như actor sẽ gặp nếu cố tình gọi. |
| 4 | Badge dị ứng đỏ, đọc được dark mode | ✅ Đạt (code review) | `medical-clearance-panel.tsx:64` — `border-red-300 bg-red-50 text-red-800` + `dark:border-red-700 dark:bg-red-950 dark:text-red-200`, tương phản đúng cặp light/dark theo đúng khuôn `task-board.tsx`. |
| 5 | Offer PENDING: badge "Chờ duyệt chiết khấu" + nút cho actor có quyền | ❌ **Không đạt** | Blocker do chính Codex báo, Claude xác nhận độc lập (đọc `application.service.ts:71-112` + agent Explore riêng): `GET /applications` (endpoint duy nhất trả offer cho UI) chỉ SELECT `offer_id, offer_code, offer_status` — không có cột nào phản ánh `approval_requests.status`. Không có bất kỳ `GET` nào khác (trực tiếp hay gián tiếp qua `/audit-events`) trả về trạng thái approval. Component đã code đúng nhánh hiển thị (`pendingApproval === true`/`null`) nhưng cha luôn truyền `pendingApproval: null` vì không có dữ liệu thật — đúng theo AGENTS.md §4 "không bịa dữ liệu để hoàn thành happy path", nhưng nghĩa là tính năng **không hoạt động được trong ứng dụng thật**. |
| 6 | Click Approve/Reject gọi đúng POST, lỗi 409 hiển thị rõ | ⚠️ Không kích hoạt được | Handler `decideDiscount` gọi đúng `POST .../discount-approval` với `decision`, bắt lỗi và set `discountError` với `aria-live` — đúng code, nhưng nút Approve/Reject chỉ render khi `pendingApproval === true`, mà giá trị này luôn `null` (xem AC5) → không thể bấm được trong ứng dụng để kiểm chứng thật. |
| 7 | Offer `ISSUED` hiện hạn `valid_until` | ❌ **Không đạt** | Cùng root cause AC5: `list()` không SELECT `valid_until` (xác nhận migration `0004` có cột, nhưng chỉ xuất hiện trong `RETURNING` của 2 lệnh ghi POST, không có trong SELECT của GET nào). `offer.validUntil` luôn `null` → panel hiển thị "Chưa có thông tin hạn giữ chỗ" thay vì ngày thật. |
| 8 | Light/dark, ~400px không vỡ layout | ⚠️ **Không xác nhận được** | Phiên Claude này không có công cụ trình duyệt/screenshot (đã kiểm tra, không có). Đọc code: cả 2 panel dùng `rounded-2xl`, `flex-wrap`, `min-w-0`, `break-words`, không `width`/`min-width` cố định lớn hơn màn hình nhỏ — về nguyên tắc responsive đúng pattern `task-board.tsx`, nhưng đây là suy luận từ code, **không phải xác nhận bằng mắt** như spec yêu cầu. Ghi nhận là gate chưa chạy được, không phải PASS. |
| 9 | Không có file ngoài mục 3 bị thay đổi | ✅ Đạt | `git show --stat 25faab5`: đúng 4 file (`medical-clearance-panel.tsx` mới, `discount-approval-panel.tsx` mới, `sop-os-app.tsx` sửa, `tasks/step-05.md` chỉ thêm mục "Đề xuất phát sinh"). |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ sửa đúng 4 file được phép trong mục 3 của task spec.
- [x] Không đụng `apps/api/**`, `apps/worker/**`, `database/seed/demo-seed.json`, persona
      list, không thêm thư viện UI mới.
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] Component thuần props-in/callback-out đúng khuôn `task-board.tsx`.
- [x] Tailwind, `rounded-xl`/`rounded-2xl`, `dark:` variant đầy đủ cho mọi màu mới.
- [x] Tái dùng `api<T>()` có sẵn, không viết fetch helper mới.
- [x] Không suy đoán dữ liệu approval từ `offer.status` (AGENTS.md §4 "không bịa dữ liệu") —
      quyết định đúng đắn của Codex, dù khiến AC5-7 không hoạt động.
- [x] Permission check phía UI (`allowed()`) khớp đúng ngữ nghĩa wildcard của
      `hasRequiredPermissions` phía server (`permissions.ts`) — không tự bịa định dạng
      quyền mới, đúng AGENTS.md §5 "UI masking không phải security control" (server vẫn
      403 độc lập, đã xác nhận qua curl).
- [ ] **Không đạt:** bug xử lý response rỗng ở mục 2 AC1 — vi phạm tinh thần "golden path
      hoạt động thật" dù không phải lỗi cố ý.

## 5. Rủi ro & nợ kỹ thuật phát sinh

- **Bug mới (Sev-2, chặn golden path):** `api<T>()` giả định mọi response 200 đều có JSON
  body hợp lệ; endpoint `GET /medical/clearances/:id` là endpoint duy nhất hiện tại hợp lệ
  trả "không có nội dung" (chưa có clearance) nhưng NestJS serialize `null` return value
  thành body rỗng thay vì JSON `"null"` — hai bên không khớp giả định. Cần sửa ở Step 05
  revise (xem `tasks/step-05-revise.md`).
- **Blocker kiến trúc đã biết trước khi audit (do Codex tự báo):** thiếu read contract cho
  trạng thái approval PENDING và `valid_until` của Offer — cần mở rộng có kiểm soát
  `GET /applications` (chỉ thêm field đọc, không đổi state machine/business rule) — xem
  `tasks/step-05-revise.md`.
- **Gap chấp nhận, không phải blocker của step 05:** actor có `medical:edit` nhưng không
  có `medical:read` sẽ bị GET 403 dù đúng ra cần đọc dữ liệu hiện có trước khi sửa. Đây là
  quyết định phân quyền (catalog quyền), không phải lỗi UI — chuyển thành backlog cho Step
  06 (đảm bảo persona cấp `medical:edit` luôn kèm `medical:read`), không sửa ở đây.
- AC8 (dark/mobile bằng mắt) là gate chưa chạy được do giới hạn công cụ của phiên Claude
  hiện tại — không phải PASS, không phải lỗi code. Ghi vào backlog: cần Repository Owner
  hoặc phiên có công cụ trình duyệt tự xác nhận qua `pnpm dev`/`docker compose up`
  cục bộ trước khi coi UI này production-ready về mặt UX.

## 6. Đề xuất phát sinh từ Codex

Đã đọc `tasks/step-05.md` mục "Đề xuất phát sinh" (do Codex ghi):

- Blocker AC5/6/7 (thiếu read contract) — **chấp nhận**, đúng như Claude xác nhận độc lập
  ở mục 2. Đưa vào `tasks/step-05-revise.md`.
- Gap AC1 cho actor chỉ có `medical:edit` (thiếu `medical:read`) — **chấp nhận là backlog
  Step 06** (phân quyền persona), không phải lỗi UI cần sửa ngay.
- Giới hạn "không dựng full-stack, không tự commit (sandbox read-only)" — đã ghi nhận,
  Claude tự dựng full-stack và tự commit hộ ở bước audit này.

## 7. KẾT LUẬN (lần 1)

**Trạng thái: [x] FAIL — cần sửa**

Lý do FAIL: AC1 có bug thật (không phải giả định) chặn golden path khi application chưa
có clearance — tái hiện được 100% qua `curl`/`node fetch` thật trên full-stack đang chạy;
AC5-7 không hoạt động được do thiếu read contract. Cả hai đều cần sửa trước khi Step 05
coi là DONE. AC2/3/4/9 đạt. AC8 chưa xác nhận được (giới hạn công cụ, không tính là FAIL
nhưng cũng không tính là PASS).

→ Soạn `tasks/step-05-revise.md` với 2 việc cụ thể cần Codex sửa (không viết lại toàn bộ
spec): (A) xử lý an toàn response rỗng của `GET /medical/clearances/:id` ở phía frontend,
(B) mở rộng tối thiểu, chỉ đọc, `GET /applications` để trả trạng thái approval PENDING và
`valid_until` của offer, rồi wiring 2 field đó vào `DiscountApprovalPanel` thay vì `null`
cứng.

Đã dừng `docker compose down` sau khi audit xong để giải phóng tài nguyên máy.

---

## 8. Audit lần 2 (sau `tasks/step-05-revise.md`) — 16/09/2026

- Commit được audit: `d27187a` (`fix(step-05): handle empty medical clearance response
  and expose offer approval read fields`), thực thi bởi Codex CLI (`codex exec`), Claude
  commit hộ (vẫn cùng lý do sandbox `.git` read-only).
- Tự chạy lại độc lập `pnpm --filter @sop-os/web` và `pnpm --filter @sop-os/api`
  lint/typecheck/build — cả 4×2 = 8 lệnh đều xanh.
- Dựng lại full-stack thật (`docker compose up -d --build postgres migrate api web`),
  verify bằng dữ liệu thật qua đúng API nghiệp vụ (không chỉ đọc code):
  - **Việc A (bug empty-body):** gọi `GET /medical/clearances/:id` cho một application
    **chưa từng có clearance** (APP-2026-0149, chưa đụng tới trước đó) → xác nhận response
    vẫn 200/0 byte như cũ (hành vi NestJS không đổi), nhưng mô phỏng đúng logic `api<T>()`
    mới (đọc `response.text()`, coi chuỗi rỗng là `null`) → **không còn ném lỗi**, trả về
    `null` sạch. Sau đó `PUT` một clearance thật rồi `GET` lại → JSON đầy đủ vẫn parse đúng
    bình thường (không hồi quy case có dữ liệu thật).
  - **Việc B (read contract):** tạo dữ liệu tối thiểu qua SQL trực tiếp trên Postgres tạm
    (application → `DECISION_PENDING`, `medical_clearances.cleared = true`, 1
    `rule_configs` cho `admission.discount_threshold_percent = 10`) — chỉ để đủ điều kiện
    gọi API thật, không phải seed chính thức. Gọi thật `POST
    /applications/:id/offers` với `discountPercent: 20` (> ngưỡng 10) → tạo offer +
    `approval_requests` PENDING qua đúng code path production. `GET /applications` sau đó
    trả đúng `offer_discount_pending: true`, `offer_valid_until: "2099-01-01T00:00:00.000Z"`.
    Sau đó `POST .../discount-approval` với `decision: APPROVED` → gọi lại `GET
    /applications` → `offer_discount_pending` chuyển đúng về `false`, `offer_valid_until`
    giữ nguyên. Xác nhận trọn vòng đời PENDING → APPROVED phản ánh đúng qua field mới.
- Đối chiếu AC bổ sung (`tasks/step-05-revise.md` mục 3): cả 4 tiêu chí đều đạt bằng dữ
  liệu thật (không chỉ code review) — không hồi quy AC1-4/AC9 gốc.
- AC8 (dark mode/mobile bằng mắt) **vẫn chưa xác nhận được** — phiên Claude này vẫn không
  có công cụ trình duyệt/screenshot. Không phải PASS, không phải FAIL — gate chưa chạy
  được, cần Repository Owner tự xác nhận qua `pnpm dev`/`docker compose up` cục bộ, hoặc
  cấp công cụ trình duyệt cho một phiên sau trước khi coi UI này production-ready về UX.
- Dữ liệu test tự tạo (offer/approval/rule_config/clearance ở trên) chỉ tồn tại trong
  volume Docker tạm của phiên audit này; đã `docker compose down -v` để xoá sạch, không
  ảnh hưởng `database/seed/demo-seed.json` hay môi trường nào khác.

### KẾT LUẬN CUỐI CÙNG

**Trạng thái: [x] PASS** (với 1 gate không chạy được, đã ghi rõ lý do — AGENTS.md §11)

- AC1-7, AC9 (gốc + bổ sung): đạt, xác nhận bằng dữ liệu thật qua toàn bộ vòng đời nghiệp
  vụ (tạo offer → PENDING → APPROVED), không chỉ đọc code.
- AC8: gate chưa chạy được do giới hạn công cụ của phiên Claude — ghi vào backlog, không
  chặn PASS vì đây là giới hạn môi trường audit, không phải lỗi code (đã review tĩnh kỹ
  toàn bộ class Tailwind liên quan ở mục 2 lần 1, không đổi từ đó tới nay).
- Cập nhật `docs/PLAN.md`: Step 05 → DONE (PASS), mở khoá viết `tasks/step-06.md`.

---
## Ghi vào CHANGELOG.md
```
[2026-09-16] Step 05 - UI medical clearance + discount approval - PASS (sau 1 lần FAIL) - Lần 1: AC1 có bug thật (GET clearance rỗng ném lỗi JSON parse), AC5-7 chặn do thiếu read contract (Codex tự báo, Claude xác nhận độc lập). Lần 2: cả 2 sửa xong, verify bằng dữ liệu thật qua full vòng đời offer/approval (tạo offer discount vượt ngưỡng -> PENDING -> APPROVED) trên full-stack Docker thật, không hồi quy AC cũ. AC8 (dark/mobile bằng mắt) không xác nhận được do phiên Claude không có công cụ trình duyệt - ghi backlog, không chặn PASS.
```
