# Step 07 — Migration: nền tảng concurrency/index cho application_documents/assessments

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 0. Quyết định đã chốt trước khi viết spec này (không tự suy diễn lại)

Domain 02 **chưa có** file BA deep-dive riêng kiểu
`docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-...md` (chỉ Domain 01 có). Mục này thay
thế vai trò đó cho step đầu tiên — các step sau của Domain 02 tái dùng quyết định ở đây,
không suy diễn lại.

1. **Sửa nhãn domain — "SOP-ADM-001/002/004" trong `docs/PLAN.md` mục 3 là nhãn sai, chỉ
   scope đúng 001+002.** Repo có 3 hệ đánh số SOP-ADM-00X khác nhau không trùng nhau:
   bộ 30-mục gốc (`ERP_PreSchoolSOP (1).md`), bộ pilot cũ (`DETAILED_SOP_PILOT_PACK_ADM_
   001_010.md`), và bộ **canonical đã hợp nhất xung đột**
   (`docs/SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md` dòng 16-33) — theo đúng thứ tự ưu
   tiên AGENTS.md §3 (mục 3 "SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md cho canonical SOP
   ID" đứng trên mục 4 "bộ 25 SOP"), bộ canonical này thắng. Theo đó:
   - **SOP-ADM-001 (canonical)** = Tiếp nhận Application & Kiểm tra Hồ sơ (document
     verification).
   - **SOP-ADM-002 (canonical)** = Student Assessment.
   - **SOP-ADM-004 (canonical)** = Operational Handover — **đã có code một phần từ
     Domain 01** (`handover_packages`, permission `handover:transition`, dùng trong
     `demo-journey-smoke.mjs`). Không thuộc phạm vi Domain 02.
   - Domain 02 = **chỉ SOP-ADM-001 + SOP-ADM-002 (canonical)**. `docs/PLAN.md` sẽ được
     Claude sửa lại nhãn cho đúng cùng lúc với việc chốt step này (xem file đó).
2. **Chưa có endpoint upload file nhị phân thật ở bất kỳ step nào của Domain 02 cho tới
   khi có quyết định khác.** `DEC-006` (`docs/governance/DECISION_REGISTER.md`) — "Object
   storage, malware scanner và signed access" — vẫn `OPEN`; ADR liên quan
   (`docs/adr/0008-object-storage-security.md`) vẫn `Proposed — provider TBD`. Theo
   `docs/CODEX_EXECUTION_PLAN.md` mục T4 Option A: chỉ được implement "tối thiểu" khi
   chưa có quyết định — nghĩa là `application_documents.storage_key` được xem như
   **metadata do actor cung cấp** (ví dụ đã upload qua kênh khác/placeholder), KHÔNG có
   endpoint `multipart/form-data` thật, không cài `multer`/AWS SDK/Minio client. Việc
   upload file thật + object storage adapter là một track riêng chờ DEC-006 đóng, không
   thuộc Domain 02 cho tới khi có quyết định mới — nếu thấy cần, ghi vào "Đề xuất phát
   sinh", không tự implement.
3. **State machine (`packages/domain/src/application-state-machine.ts`) hiện cho phép
   `VERIFIED` nhảy thẳng `DECISION_PENDING`, bỏ qua Assessment hoàn toàn — không sửa ở
   step này.** Đây là gap thật (không enforce document verified / assessment finalized
   trước khi quyết định), nhưng sửa state machine + gate trong
   `application.service.ts.transition()` là việc của step sau (sau khi có service đọc
   được trạng thái document/assessment thật). Step 07 **chỉ làm migration**, không đụng
   `packages/domain`/`apps/api/src/modules/admission/application.service.ts`.
4. **Bảng `application_documents`/`assessments` đã tồn tại từ migration `0004`, không tạo
   bảng mới.** Chỉ bổ sung cột/index còn thiếu để đủ điều kiện làm service ở step sau —
   xem mục 2.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** `application_documents` thiếu `updated_at`/`row_version` —
  khác convention optimistic-concurrency mà mọi bảng Application-scoped khác đã dùng
  (`assessments`, `medical_clearances`, `offers` đều có `row_version`). Cả 2 bảng đều
  không có index theo `application_id` — mọi read path tương lai (service Step 08 verify
  document, Step 09 assessment) sẽ query theo cột này. Làm nền tảng trước khi viết service
  giúp Step 08/09 không phải kèm migration nhỏ lẻ trong lúc code business logic.
- **Nó phục vụ luồng nghiệp vụ nào:** SOP-ADM-001 (document verification) và SOP-ADM-002
  (assessment) — đóng đúng gap mà `docs/CODEX_EXECUTION_PLAN.md` mục T4 đã cảnh báo từ
  trước ("bảng đã có, state machine cho phép chuyển qua các state này, nhưng không ai
  enforce gì cả").
- **Ai dùng kết quả của step này:** Step 08 (document verification service) và Step 09
  (assessment service) sẽ dùng `row_version` để optimistic-lock khi verify/finalize, và
  index để query nhanh theo `applicationId` — đúng pattern `medical_clearances`/`offers`
  đã dùng.

## 2. Mục tiêu kỹ thuật

- **Input:** schema `application_documents`/`assessments` hiện có từ migration `0004`
  (đọc `database/migrations/0004_mvp_workflows.sql` trước khi code, không đoán lại cột).
- **Output mong đợi:** 1 migration mới, chỉ ALTER + CREATE INDEX, không tạo bảng mới,
  không đổi dữ liệu hiện có (đều là cột mới có DEFAULT, an toàn cho dữ liệu đã có).
- **Ràng buộc kiến trúc:** theo đúng khuôn `database/migrations/0007_offer_author_
  separation.sql` (migration ALTER nhỏ, có comment "why" ngắn, một `BEGIN;`/`COMMIT;`).

**Schema chính xác bắt buộc** (có thể sửa nếu phát hiện lỗi cú pháp SQL, phải giữ đúng ý
định và báo lại nếu có sửa):

```sql
BEGIN;

-- Bring application_documents to the same optimistic-concurrency shape as every other
-- Application-scoped table (assessments, medical_clearances, offers) before a
-- verify/reject service is built on top of it.
ALTER TABLE application_documents
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN row_version bigint NOT NULL DEFAULT 1;

-- Every read path for these two tables filters by application_id; without an index
-- that's a full scan once seed/demo data grows past a handful of rows.
CREATE INDEX application_documents_application_id_idx ON application_documents (application_id);
CREATE INDEX assessments_application_id_idx ON assessments (application_id);

COMMIT;
```

Đặt tên file `database/migrations/0009_admission_document_assessment_hardening.sql`
(xem mục 0 lý do số `0009` — placeholder cũ "platform_scope_hardening" trong
`docs/governance/MIGRATION_PLAN.md` chỉ là kế hoạch nháp, chưa từng code, được thay bằng
nội dung thật của Domain 02 giống cách `0008` đã thay placeholder trước đó cho Step 01).

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `database/migrations/0009_admission_document_assessment_hardening.sql` (file mới).
- `docs/governance/MIGRATION_PLAN.md` — chỉ sửa đúng dòng bảng cho `0009` (đổi tên file +
  mô tả cho khớp nội dung thật, theo đúng cách `0008` đã thay placeholder cũ), không viết
  lại phần còn lại của file.

**KHÔNG được đụng vào:**
- Bất kỳ file `.ts` nào (`packages/domain`, `apps/api`, `apps/web`) — không sửa state
  machine, không viết service đọc/ghi 2 bảng này, đó là Step 08/09.
- Migration đã tồn tại (`0001`-`0008`) — immutable (AGENTS.md §9).
- `database/seed/demo-seed.json` — không seed document/assessment ở đây.
- Không cài package mới (`multer`, AWS SDK, Minio client...) — chưa tới lúc, xem mục 0.2.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] File migration mới tồn tại, đúng nội dung mục 2 (2 cột mới trên
      `application_documents`, 2 index mới, không tạo bảng, không đổi bảng khác).
- [ ] `pnpm data:guard && pnpm db:migrate` chạy thành công từ database trống.
- [ ] Chạy lại `pnpm db:migrate` lần 2 trên cùng database không lỗi (idempotent theo
      checksum `schema_migrations`).
- [ ] Dữ liệu cũ trong `application_documents` (nếu seed có, hiện tại demo-seed.json chưa
      có row nào cho bảng này) không bị mất/lỗi sau ALTER — verify bằng cách chạy migration
      trên DB đã seed đầy đủ từ Step 06, xác nhận `applications`/`offers`/... vẫn nguyên.
- [ ] `docker compose config --quiet` vẫn pass.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` xanh (không ảnh hưởng
      TypeScript, chạy để xác nhận không có tác dụng phụ ẩn).
- [ ] `docs/governance/MIGRATION_PLAN.md` dòng `0009` mô tả đúng nội dung thật, không còn
      placeholder "platform_scope_hardening" cũ.
- [ ] Không có file nào ngoài mục 3 bị thay đổi.

## 5. Định nghĩa Done

- [ ] `pnpm data:guard`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`,
      `docker compose config --quiet` đều PASS.
- [ ] Migration verify theo đúng Acceptance Criteria (DB trống + chạy lại lần 2 + chạy
      trên DB đã seed Step 06 không mất dữ liệu).
- [ ] Đã commit theo format:
      `feat(step-07): add row_version/updated_at and application_id indexes to application_documents/assessments`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là step đầu tiên của Domain 02 — không có D02 instruction file để tham khảo thêm,
  toàn bộ quyết định cần thiết đã chốt ở mục 0. Nếu thấy quyết định nào ở mục 0 có vấn đề
  (ví dụ tên cột/index không hợp lý), ghi vào "Đề xuất phát sinh", không tự đổi.
- Không "tiện tay" viết service Document/Assessment ở step này dù bảng đã sẵn sàng — đó
  là Step 08/09, tách riêng để dễ audit từng phần (document verify khác assessment
  finalize, khác gate enforcement trong state machine).
- Nếu phát hiện `assessments` hoặc `application_documents` cần thêm ràng buộc khác (ví dụ
  unique theo `document_type`, CHECK cho `recommendation` enum...) mà spec này chưa nêu,
  đó là quyết định nghiệp vụ cần Planning Manager chốt trước — ghi vào "Đề xuất phát
  sinh", không tự thêm.

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
