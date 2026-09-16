# Audit Report — Step 06

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với
> `tasks/step-06.md` (và bản sửa `tasks/step-06-revise` inline) và SOP nguồn liên quan.

## 1. Thông tin step

- Task spec: `tasks/step-06.md` (đã tự sửa 2 lần trong chính vòng lặp này — xem mục 5)
- Commit được audit:
  - `a733ca0` (`feat(step-06): seed medical/principal personas, discount threshold
    config, negative permission tests`)
  - `21d3b72` (`fix(step-06): grant application:read to the medical officer persona`)
  - branch `merge/task-workflow-ui-into-main`
- Thực thi bởi: Codex CLI (`codex exec`, sandbox `workspace-write`), 3 lượt. Claude commit
  hộ cả 3 lần (sandbox `.git` read-only, như mọi step trước).
- Ngày audit: 16/09/2026
- Phương pháp verify: đọc toàn bộ diff (7 file qua 3 commit), tự chạy lại độc lập
  lint/typecheck/build/test cho cả `apps/web` và `apps/api`, dựng full-stack thật
  (`docker compose up --build postgres migrate api web worker`), chạy migrate+seed **hai
  lần** trên cùng Postgres + SQL kiểm chứng idempotency, chạy thật
  `demo-journey-smoke.mjs`/`smoke.mjs`/`outbox-smoke.mjs`, và gọi trực tiếp API bằng
  `curl` với header `x-permissions` đúng 2 persona mới để xác nhận hành vi SoD thật (không
  chỉ đọc code/test).

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | `pnpm data:guard` pass với seed mới | ✅ Đạt | Xác nhận lại độc lập: `DEC-020 approved`. |
| 2 | `migrate+seed` 2 lần idempotent trên Postgres trống | ✅ Đạt | Tự chạy `pnpm db:migrate && pnpm db:seed` 2 lần trên cùng DB — SQL xác nhận đúng 2 role, 2 user, đúng 1 `rule_configs` active (`value_json = 10`), đúng 1 dòng `user_role_scopes`/user, không nhân đôi. Codex không tự chạy được (sandbox chặn Docker: `permission denied` rồi `connect EPERM`) — đúng như spec đã chấp nhận, Claude làm thay ở đây. |
| 3 | `hasRequiredPermissions` unit test (Cán bộ Y tế/Hiệu trưởng) | ✅ Đạt | 8 test trong `permissions.test.ts`, bao gồm khẳng định `application:read` = `true` cho Cán bộ Y tế sau bản sửa cuối. |
| 4 | Test Guard/metadata cho `application:transition` | ✅ Đạt | Đúng pattern `medical.service.test.ts` (Reflect metadata + `canActivateRequest`), không cần Postgres, chạy thật (không skip) — đây là bản sửa đúng sau khi phát hiện spec ban đầu sai tầng kiểm tra (xem mục 5). |
| 5 | `apps/web` build/typecheck xanh, 2 persona mới, persona cũ không đổi | ✅ Đạt | Xác nhận diff: `DemoPersona.permissions` optional, `actorHeaders()` chỉ thêm `x-permissions` khi có; 2 persona cũ không có field này. |
| 6 | `demo-journey-smoke.mjs` đúng cấu trúc + chạy được trên full-stack thật | ✅ Đạt | Chạy thật lần đầu trên seed sạch: `Local demo golden journeys passed`. Log worker xác nhận đúng thứ tự event thật: `MedicalClearanceSet` → `ApprovalRequested` (discount 15% > ngưỡng 10%) → `OfferPending_approval` → `ApprovalDecided` (Hiệu trưởng duyệt) → `OfferApproved` → ... → `EnrollmentConfirmed`. Bước 409 tự-duyệt cũ vẫn còn nguyên. |
| 7 | Không có file ngoài scope | ✅ Đạt | 7 file đúng danh sách mục 3 (tính cả 2 bản sửa nhỏ trong vòng lặp này). |

## 3. Kiểm tra phạm vi (SCOPE)

- [x] Chỉ sửa đúng file được phép: `database/seed/demo-seed.json`, `scripts/seed.mjs`,
      `apps/web/src/app/sop-os-app.tsx`, `apps/api/src/platform/permissions.test.ts`,
      `apps/api/src/modules/admission/application.service.test.ts`,
      `scripts/demo-journey-smoke.mjs`, `tasks/step-06.md`.
- [x] Không đụng `apps/api/src/modules/**` (business logic), không thêm migration, không
      sửa 2 panel Step 05.
- Không có vi phạm scope.

## 4. Kiểm tra tuân thủ SOP / AGENTS.md

- [x] `admission.discount_threshold_percent` seed ghi rõ là giá trị demo, không phải chính
      sách đã duyệt (AGENTS.md §4).
- [x] Permission mới không dựa trên `role_permissions` DB (đúng quyết định mục 0.1, vì cơ
      chế thật là header-based) — không tạo ảo tưởng về một cơ chế chưa tồn tại.
- [x] SoD thật được xác nhận qua API thật (không chỉ unit test): Cán bộ Y tế và Hiệu
      trưởng đều nhận 403 khi cố `POST /applications/:id/transitions`; Hiệu trưởng dùng
      đúng `offer:approve-discount` để duyệt, không tự duyệt (offer do Officer tạo).
- [x] Email 2 user mới dùng domain `example.test` (AGENTS.md §5 / `data-policy.mjs`).
- [x] `rule_configs` ON CONFLICT dùng đúng conflict target khớp partial unique index có
      sẵn — không tạo constraint mới, không phá idempotency của toàn bộ seed script.

## 5. Diễn biến đáng chú ý trong vòng lặp Step 06 (spec tự sửa 2 lần)

Khác các step trước (1 lượt code, 1 lượt audit), Step 06 cần 3 lượt `codex exec` vì audit
lần này phát hiện 2 vấn đề *trong chính spec của Claude*, không phải lỗi Codex:

1. **Lượt 1:** Codex đúng khi từ chối tự "vá" một service để test pass — nó phát hiện
   `ApplicationService.transition()` không tự kiểm tra permission (khác
   `MedicalService.setClearance`/`decideOfferDiscountApproval`, 2 method này CÓ gọi
   `hasRequiredPermissions` trong service vì cần SoD động). Test Postgres tôi yêu cầu ban
   đầu (gọi thẳng service, kỳ vọng `ForbiddenException`) không bao giờ pass được — lỗi
   kiến trúc trong spec, không phải lỗi Codex. Đã sửa spec sang đúng tầng Guard/metadata
   trước khi cho Codex code tiếp (lượt 2).
2. **Sau lượt 2 (code xong, gate xanh):** Audit tự gọi API thật bằng `curl` với header
   `x-permissions` đúng persona Cán bộ Y tế — phát hiện `GET /applications` trả 403 cho
   persona này, nghĩa là UI không thể chọn được Application nào để mở
   `MedicalClearancePanel` — persona tồn tại nhưng không dùng được qua UI như spec mục 1
   ("Ai dùng kết quả") mong muốn. Sửa spec: thêm `application:read` cho Cán bộ Y tế (cùng
   lý do đã áp dụng cho Hiệu trưởng — quyền xem, không phá SoD), gọi Codex sửa 2 dòng
   (lượt 3), verify lại bằng đúng API thật: 200 cho GET list, vẫn 403 cho transition.

Cả 2 phát hiện đều chỉ có được nhờ audit **chạy API/full-stack thật**, không phải chỉ đọc
diff — đúng lý do Claude luôn tự dựng full-stack độc lập ở bước audit thay vì tin tưởng
báo cáo tự-kiểm-tra tĩnh của Codex.

## 6. Rủi ro & nợ kỹ thuật phát sinh

- `scripts/demo-journey-smoke.mjs` không idempotent khi chạy lại nhiều lần trên cùng DB
  (mã `APP-DEMO-GOLDEN`/`OFF-DEMO-GOLDEN`/`ENR-DEMO-GOLDEN` cố định, lần 2 sẽ 500 do trùng
  code) — đây là đặc tính đã có từ trước Step 06 (script thiết kế chạy 1 lần trên seed
  sạch), không phải lỗi mới, không thuộc scope sửa ở đây. Ghi nhận cho backlog nếu sau này
  cần script rerun-safe cho CI lặp lại.
- `docker compose up` gặp lỗi Docker snapshot cache ("parent snapshot ... does not exist")
  ở lần build đầu tiên trong audit này — lỗi hạ tầng Docker cục bộ thoáng qua, build lại
  lần 2 thành công, không liên quan code.

## 7. Đề xuất phát sinh từ Codex

Đã đọc `tasks/step-06.md` mục "Đề xuất phát sinh" — chỉ có 1 mục còn giá trị (blocker AC4
lượt 1), đã giải quyết bằng sửa spec ở mục 5 trên. Không có đề xuất nào khác cần quyết
định thêm.

## 8. KẾT LUẬN

**Trạng thái: [x] PASS**

Toàn bộ Acceptance Criteria đạt, xác nhận bằng dữ liệu/API thật (không chỉ đọc code):
migrate+seed idempotent, permission âm đúng ở cả tầng unit test lẫn API thật, golden
journey (bao gồm nhánh medical clearance + discount approval mới) chạy hết qua full-stack
thật, không hồi quy `smoke`/`outbox:smoke`.

**Domain 01 (SOP-ADM-003, BR-ADM-002/003/004) hoàn tất toàn bộ** — Step 01-06 đều PASS.

---
## Ghi vào CHANGELOG.md
```
[2026-09-16] Step 06 - Seed persona Domain 01 + permission âm + demo journey - PASS (3 lượt Codex, spec tự sửa 2 lần sau audit) - Thêm persona "Cán bộ Y tế"/"Hiệu trưởng" (quyền hạn chế thật qua x-permissions header), seed rule_configs discount threshold demo 10%, test permission âm (unit + guard metadata), demo-journey-smoke.mjs giờ chạy trọn nhánh medical clearance + discount approval. Audit phát hiện 2 gap qua test full-stack/API thật: (1) spec ban đầu yêu cầu test sai tầng kiểm tra permission (service thay vì guard) - Codex tự phát hiện, sửa spec; (2) Cán bộ Y tế thiếu application:read khiến không dùng được UI - phát hiện qua curl API thật, sửa thêm quyền. Domain 01 hoàn tất toàn bộ (Step 01-06 PASS).
```
