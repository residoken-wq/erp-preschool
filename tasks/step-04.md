# Step 04 — Offer holding-seat auto-expiry (BR-ADM-004)

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** BR-ADM-004 (`docs/ERP_PreSchoolSOP (1).md` dòng 334,
  SOP-ADM-003) quy định: giữ chỗ (Offer đã `ISSUED`) chỉ hiệu lực đến `valid_until`; quá
  hạn mà chưa `ACCEPTED` thì ERP phải tự chuyển `Offer` sang `EXPIRED`, giải phóng chỉ
  tiêu. Hiện `offers.valid_until` tồn tại từ migration `0004` nhưng vô nghĩa — không có
  code nào đọc nó (xem `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-*.md` mục A, rủi ro **Trung
  bình**, ảnh hưởng vận hành chứ không phải an toàn/tài chính trực tiếp như Step 02/03).
- **Khác biệt quan trọng với Step 02/03:** đây là thay đổi đầu tiên của Domain 01 nằm ở
  `apps/worker`, không phải `apps/api`. Actor thực hiện mutation là **hệ thống**, không
  phải người dùng — dùng `actor_type = 'SYSTEM'`, `actor_id = NULL` (cột này đã cho phép
  NULL khi `actor_type = 'SYSTEM'`, xem `database/migrations/0001_platform.sql` dòng 92-93).
- **Ai dùng kết quả step này:** không có step nào phụ thuộc trực tiếp; đây là điểm đóng
  cuối cùng của 3 business rule Domain 01 (BR-ADM-002/003/004). Step 05 (UI) có thể hiển
  thị `valid_until` đếm ngược nhưng không phụ thuộc chức năng của step này.

## 2. Mục tiêu kỹ thuật

- **Input:** cột `offers.valid_until`, `offers.status` (đã có từ trước Domain 01).
- **Output mong đợi:** một poll loop trong `apps/worker` tự tìm offer `status = 'ISSUED'`
  và `valid_until < now()`, chuyển sang `EXPIRED`, ghi audit + outbox cùng transaction.
- **Ràng buộc kiến trúc:**
  - Theo đúng khuôn `apps/worker/src/outbox-runtime.ts`/`main.ts` đã có: một hàm
    "one-tick" thuần (`expireDueOffers`), một poll loop riêng trong `main.ts` chạy song
    song với loop outbox hiện có, dùng chung `stopping` flag và graceful shutdown
    (`SIGINT`/`SIGTERM`).
  - **`apps/worker` KHÔNG được import từ `apps/api`** (hai app riêng biệt trong
    monorepo, không phải cùng package — import xuyên app vi phạm AGENTS.md §14 "không
    import bằng đường dẫn xuyên module"). `recordMutation` trong
    `apps/api/src/platform/mutation-log.ts` **không dùng lại được trực tiếp**. Viết một
    bản ghi audit+outbox tối giản bằng SQL thuần ngay trong
    `apps/worker/src/offer-expiry-runtime.ts` (2 câu `INSERT` giống hệt logic của
    `recordMutation`, chấp nhận trùng lặp nhỏ giữa 2 app — KHÔNG tạo package
    `packages/*` mới chỉ để dùng chung 2 câu SQL này, việc đó là over-engineering cho
    quy mô hiện tại; nếu Codex thấy cần thiết kế khác, ghi vào "Đề xuất phát sinh").
  - Env var mới `OFFER_EXPIRY_POLL_INTERVAL_MS` thêm vào `packages/config/src/index.ts`
    (Zod schema, cùng convention với `OUTBOX_POLL_INTERVAL_MS` đã có — số nguyên, có
    default hợp lý, KHÔNG hardcode ý nghĩa nghiệp vụ "5 ngày" ở đâu cả; con số 5 ngày
    trong SOP là do người tạo offer nhập vào `validUntil` lúc `createOffer`, không phải
    hằng số hệ thống).
  - **Giới hạn đã biết, chấp nhận cho step này (ghi rõ trong code comment và báo cáo,
    không tự ý mở rộng để "sửa luôn"):** không dùng advisory lock — giả định chỉ một
    worker instance chạy tại một thời điểm. Nếu chạy nhiều instance, có thể có 2 tiến
    trình cùng UPDATE cùng offer trong cùng một khoảnh khắc; do dùng
    `UPDATE ... WHERE status = 'ISSUED' ...` (điều kiện WHERE trên trạng thái hiện tại),
    Postgres tự đảm bảo chỉ một transaction thắng row lock, transaction thua sẽ thấy 0
    row match sau khi transaction thắng commit — nên không có double-processing thật sự
    xảy ra, nhưng vẫn ghi nhận là giới hạn kiến trúc chưa test với multi-instance thật.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `apps/worker/src/offer-expiry-runtime.ts` (mới) — export
  `expireDueOffers(pool: Pool): Promise<number>` (trả về số offer vừa expire, dùng cho
  log/test), tự mở transaction, `UPDATE ... RETURNING`, ghi audit+outbox cho từng row
  trong cùng transaction, `COMMIT`.
- `apps/worker/src/offer-expiry-runtime.test.ts` (mới) — đây là **lần đầu tiên
  `apps/worker` có test chạm Postgres thật** (tương tự Step 02 là lần đầu của
  `apps/api`) — mọi test hiện tại của worker chỉ mock `OutboxStore`/`OutboxAdapter`, xem
  `apps/worker/src/outbox-processor.test.ts`. Viết một helper test tối thiểu ngay trong
  file test này hoặc một file `apps/worker/src/test-db.ts` mới (Pool từ
  `process.env.DATABASE_URL`) — **không import** `apps/api/src/platform/test-db.ts`.
- `apps/worker/src/main.ts` — thêm poll loop thứ hai gọi `expireDueOffers`, dùng
  `OFFER_EXPIRY_POLL_INTERVAL_MS`, log lỗi theo đúng khuôn `OUTBOX_TICK_FAILED` hiện có
  (ví dụ `OFFER_EXPIRY_TICK_FAILED`).
- `packages/config/src/index.ts` — thêm `OFFER_EXPIRY_POLL_INTERVAL_MS` vào Zod schema.
- `packages/config/src/index.test.ts` — test cho biến env mới, theo khuôn test hiện có
  cho `OUTBOX_POLL_INTERVAL_MS` (nếu có) hoặc theo pattern test khác trong file này.
- `docs/API_CONTRACT_MVP.md` — không có route HTTP mới ở step này (đây là worker), nhưng
  thêm một đoạn ngắn ghi lại hành vi `EXPIRED` tự động (để người đọc contract biết offer
  có thể tự chuyển trạng thái không qua endpoint), đặt cạnh phần "Offer draft lưu author
  actor..." đã có.
- `.env.example` — thêm dòng `OFFER_EXPIRY_POLL_INTERVAL_MS=...` nếu file này liệt kê
  từng biến env (kiểm tra trước khi sửa; nếu file không theo cấu trúc liệt kê từng biến,
  bỏ qua, không tự đổi cấu trúc file).

**KHÔNG được đụng vào:**
- `apps/api/**` — không route API mới, không sửa `application.service.ts` (offer status
  `EXPIRED` đã tồn tại sẵn trong `offerTransitions`/CHECK constraint từ trước Domain 01,
  không cần đổi).
- `apps/web/**`, `database/seed/demo-seed.json` — như các step trước.
- `database/migrations/*` — không cần schema mới, `valid_until`/`status` đã có.
- `apps/worker/src/outbox-runtime.ts`, `outbox-processor.ts`, `postgres-outbox.store.ts`
  — không sửa logic outbox hiện có, chỉ THÊM loop mới song song trong `main.ts`.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] Offer `status = 'ISSUED'` với `valid_until` trong quá khứ: sau khi gọi
      `expireDueOffers`, status chuyển `EXPIRED`, `updated_at` cập nhật,
      `row_version` tăng 1.
- [ ] Offer `ISSUED` với `valid_until` trong tương lai: không bị đụng tới.
- [ ] Offer ở status khác `ISSUED` (kể cả đã `EXPIRED`/`ACCEPTED`/`DECLINED`) dù
      `valid_until` đã qua: không bị đụng tới (không update lại offer đã expired, không
      tạo audit trùng).
- [ ] Mỗi offer bị expire có đúng 1 `audit_events` (`actor_type = 'SYSTEM'`,
      `actor_id IS NULL`, `action = 'offer.transition'`, `object_type = 'Offer'`) và
      đúng 1 `outbox_events` (`event_type = 'OfferExpired'`) trong CÙNG transaction với
      UPDATE — test rollback khi outbox insert lỗi phải xác nhận offer KHÔNG bị đổi
      status (giống bài test rollback ở Step 02/03).
- [ ] Nhiều offer cùng quá hạn trong một lần poll: tất cả đều được xử lý trong một lần
      gọi `expireDueOffers`, mỗi offer có audit/outbox riêng.
- [ ] `main.ts` chạy 2 loop độc lập (outbox + offer-expiry) không chặn lẫn nhau, cả 2 đều
      dừng đúng khi nhận `SIGINT`/`SIGTERM`.
- [ ] `OFFER_EXPIRY_POLL_INTERVAL_MS` validate qua `packages/config`, có test.
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm data:guard && pnpm lint && pnpm typecheck && pnpm test && pnpm build` xanh.
- [ ] `docker compose config --quiet` vẫn pass.
- [ ] Test tích hợp mới của worker chạy được với Postgres thật (theo khuôn
      `describe.skipIf(!process.env.DATABASE_URL)` như apps/api đã dùng).
- [ ] Dựng full stack thật (Postgres tạm nếu cổng `5432` bận, API + **worker mới build**)
      và chạy `pnpm smoke` + `pnpm outbox:smoke` để xác nhận worker khởi động được với 2
      loop và không phá 2 script CI — **dọn sạch tiến trình đúng cách sau khi xong**
      (dùng `pkill -f "dist/main.js"` hoặc kill theo PID thật của `node`, KHÔNG chỉ kill
      PID của `pnpm`/`setsid` wrapper — bài học từ audit Step 03, PID `$!` của lệnh chạy
      qua `pnpm start`/`setsid` không phải PID của tiến trình `node` thật sự chạy).
- [ ] Đã commit theo format: `feat(step-04): add offer holding-seat auto-expiry worker`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là lần đầu worker ghi trực tiếp vào `audit_events`/`outbox_events` bằng SQL thuần
  thay vì qua `recordMutation` (chỉ tồn tại ở apps/api) — chấp nhận trùng lặp nhỏ, xem
  mục 2. Nếu muốn trích xuất logic dùng chung sau này, đó là quyết định kiến trúc lớn
  hơn phạm vi step này, ghi vào "Đề xuất phát sinh".
- Không cần bulk-update tối ưu đặc biệt (số lượng offer quá hạn trong một khoảng poll
  interval ngắn thường nhỏ) — một câu `UPDATE ... RETURNING` xử lý nhiều row cùng lúc là
  đủ, không cần batch/limit trong step này.
- Không tự thêm khái niệm "giải phóng sĩ số lớp" — hệ thống hiện tại không đếm sĩ số lớp
  ở đâu cả; BR-ADM-004 chỉ yêu cầu offer chuyển `EXPIRED`, việc đó tự nhiên "giải phóng"
  theo nghĩa nghiệp vụ vì offer không còn giữ chỗ, không cần code thêm.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: dùng chung loader env từ
  `@sop-os/config` cho worker thay cho validation tại entrypoint hiện có.
- Vấn đề gặp phải cần Planning Manager quyết định: worker chưa khai báo dependency
  `@sop-os/config`; thêm dependency cần sửa `apps/worker/package.json` và cập nhật
  `pnpm-lock.yaml` bằng pnpm, ngoài mục 3. Step này giữ khuôn entrypoint hiện có,
  đồng thời thêm schema Zod và test trong config; chưa thực hiện refactor dependency.
  Đây là gap với AGENTS.md §14 (env qua package config), cần mở rộng scope riêng.
