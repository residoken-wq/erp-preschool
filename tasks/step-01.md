# Step 01 — Migration: medical_clearances, rule_configs, approval_requests

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi
> mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất
> phát sinh" ở cuối, KHÔNG tự implement.

## 1. Bối cảnh nghiệp vụ (BA)

- **Vì sao cần step này:** SOP-ADM-003 (`docs/ERP_PreSchoolSOP (1).md` dòng 152-539,
  đây là SOP gốc chi phối code Admission hiện có — `applications`/`offers`/
  `enrollments`/`contracts`/`fee_plans`) có 3 business rule bắt buộc mà code hiện tại
  hoàn toàn chưa có: BR-ADM-002 (không cho enroll khi chưa xác nhận y tế), BR-ADM-003
  (chiết khấu vượt ngưỡng phải qua duyệt), BR-ADM-004 (giữ chỗ tự hết hạn). Chi tiết
  đầy đủ phân tích BA/Audit ở
  `docs/CODEX_DOMAIN_INSTRUCTIONS/D01-SOP-ADM-003-admission-contract-enrollment.md`
  mục A/B — đọc file đó để hiểu rủi ro, không lặp lại ở đây.
- **Nó phục vụ luồng nghiệp vụ nào:** Admission → Offer → Enrollment (đã có code),
  bổ sung đúng 3 rule trên trước khi luồng này được coi là an toàn để demo/dùng tiếp.
- **Ai dùng kết quả của step này:** Step 02 (Medical clearance service) và Step 03
  (Discount threshold + approval) sẽ dùng trực tiếp 3 bảng tạo ở step này. Step này
  **chỉ tạo schema**, không có code TypeScript nào phụ thuộc vào nó ngay, nên có thể
  audit độc lập trước khi làm service ở trên.

## 2. Mục tiêu kỹ thuật

- **Input:** không có input runtime — đây là migration schema thuần túy.
- **Output mong đợi:** một file migration mới `database/migrations/0008_admission_medical_discount_holding.sql`
  tạo đúng 3 bảng: `medical_clearances`, `rule_configs`, `approval_requests`, migrate
  được từ DB trống và từ DB đã ở version `0007` (idempotent theo `scripts/migrate.mjs`).
- **Ràng buộc kiến trúc (theo AGENTS.md và pattern hiện có):**
  - Theo đúng khuôn `database/migrations/0007_offer_author_separation.sql` (một
    `BEGIN;`/`COMMIT;`, snake_case, `uuid PRIMARY KEY DEFAULT gen_random_uuid()`).
  - `medical_clearances` là bảng riêng (không phải cột trên `applications`) vì đây là
    dữ liệu `HRI` cần permission/audit riêng (AGENTS.md §5) — bắt buộc cột
    `data_classification varchar(3) NOT NULL DEFAULT 'HRI' CHECK (data_classification = 'HRI')`.
  - `rule_configs` phải enforce **một bản ghi hiệu lực duy nhất** cho mỗi
    `(organization_id, campus_id hoặc NULL = toàn org, config_key)` tại một thời điểm —
    dùng partial unique index loại trừ `valid_to IS NULL` trùng nhau, giống pattern
    một-Effective-version đã có ở SOP (`migration 0002`). Đây là bảng dùng lại được cho
    domain sau (Kitchen/Procurement/Bus...), không phải bảng riêng cho Admission — đặt
    tên/thiết kế đủ tổng quát.
  - `approval_requests` phải có CHECK DB-level chặn `approver_id = requested_by` (defense
    in depth, không chỉ dựa vào code) — đây cũng là bảng dùng lại được cho domain sau.
  - Không thêm cột/bảng nào ngoài 3 bảng này trong step này (kể cả khi thấy "tiện làm
    luôn" — để step nhỏ, dễ audit).

**Schema chính xác bắt buộc** (không tự đổi tên cột/kiểu dữ liệu; có thể sửa nếu phát
hiện lỗi cú pháp SQL, nhưng phải giữ đúng ý định và báo lại nếu có sửa):

```sql
BEGIN;

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

COMMIT;
```

Thêm comment SQL ngắn (`-- ...`) trên mỗi bảng giải thích *why* (không phải *what*) theo
đúng phong cách không-viết-comment-thừa của repo — ví dụ lý do tách bảng riêng, lý do
partial unique index — không copy nguyên văn đoạn giải thích dài ở trên vào comment SQL.

## 3. Phạm vi thay đổi (SCOPE)

**Được phép sửa/tạo:**
- `database/migrations/0008_admission_medical_discount_holding.sql` (file mới)
- `docs/governance/MIGRATION_PLAN.md` (chỉ thêm một dòng mô tả migration `0008`, đúng
  format các dòng mô tả `0006`/`0007` đã có — không viết lại file)

**KHÔNG được đụng vào:**
- Bất kỳ file `.ts` nào (service, controller, worker, UI) — đó là Step 02-05.
- `database/seed/demo-seed.json` — đó là Step 06.
- Bất kỳ migration đã tồn tại (`0001`-`0007`) — migration đã apply là immutable
  (AGENTS.md §9).
- `packages/contracts`, `packages/domain` — không có type/state machine nào cần đổi ở
  step này.

## 4. Acceptance Criteria (đo được, dùng để audit)

- [ ] File `database/migrations/0008_admission_medical_discount_holding.sql` tồn tại,
      đúng 3 bảng + 1 partial unique index + 1 index thường như spec mục 2.
- [ ] `pnpm data:guard && pnpm db:migrate` chạy thành công từ một database trống
      (container Postgres mới, chưa có schema nào).
- [ ] Chạy lại `pnpm db:migrate` lần thứ hai trên cùng database không lỗi, không tạo
      lại bảng (idempotent theo `schema_migrations` checksum — đúng hành vi
      `scripts/migrate.mjs` đã có).
- [ ] `docker compose config --quiet` vẫn pass (không đổi compose).
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` vẫn xanh y hệt trước
      step này (không có gì trong step này ảnh hưởng TypeScript, nhưng vẫn phải chạy
      để xác nhận không có tác dụng phụ ẩn — ví dụ script test nào đó scan
      `database/migrations/*`).
- [ ] `docs/governance/MIGRATION_PLAN.md` có dòng mô tả migration `0008`.
- [ ] Không có file nào ngoài mục 3 "Được phép sửa/tạo" bị thay đổi.

## 5. Định nghĩa Done

- [ ] Build/compile không lỗi (không có gì để build, nhưng `pnpm build` vẫn phải chạy
      xanh để xác nhận).
- [ ] `pnpm data:guard`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`,
      `docker compose config --quiet` đều PASS.
- [ ] Migration verify theo đúng cách ở Acceptance Criteria (DB trống + chạy lại lần 2).
- [ ] Đã commit theo format: `feat(step-01): add medical_clearances, rule_configs, approval_requests tables`
- [ ] Không có thay đổi ngoài phạm vi mục 3.

## 6. Ghi chú / rủi ro cần lưu ý cho Codex

- Đây là migration đầu tiên tạo bảng generic (`rule_configs`, `approval_requests`) mà
  domain sau sẽ dùng lại — nếu thấy tên cột/kiểu dữ liệu ở đây có vấn đề, **báo lại ở
  mục "Đề xuất phát sinh" bên dưới thay vì tự đổi tên**, vì đổi ở đây ảnh hưởng nhiều
  step sau.
- Không cần viết code đọc/ghi 3 bảng này ở step 01 — bảng chưa được dùng ở đâu cả, đó
  là việc của Step 02/03. Đừng "tiện tay" viết luôn service vì đó là ngoài scope.
- Nếu `pnpm db:migrate` yêu cầu Postgres đang chạy mà môi trường chưa có, dùng
  `docker compose up -d postgres` trước (xem `README.md` mục "Chạy development").

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
