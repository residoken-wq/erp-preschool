# SOP OS / Preschool ERP — Consolidated Master Build Plan
**Hợp nhất: gói phân tích cũ (SOP_OS_COMPLETE_PACKAGE) + Master Spec mới (25 SOP / 75 Domain)**
Ngày lập: 30/08/2026 · Phạm vi đã chọn: **Full 25 SOP / 75 domain, triển khai nhiều tháng theo pha**

---

## 0. Mục đích tài liệu

Tài liệu này giải quyết 2 việc trước khi code tiếp:

1. **Xung đột đánh mã SOP** giữa gói cũ (`ADM-001..010`, phạm vi hẹp Lead-to-Enrollment) và file mới (`SOP-XXX-00N`, phạm vi toàn bộ 75 domain) → đưa ra **Canonical ID** duy nhất.
2. **Kế hoạch build theo pha** cho toàn bộ 25 SOP, map vào kiến trúc code đã tồn tại (Next.js + NestJS + Postgres monorepo), chỉ rõ cái gì giữ nguyên, cái gì phải viết lại, cái gì hoàn toàn mới.

---

## 1. Canonical SOP ID Mapping (đã giải quyết xung đột)

**Nguyên tắc giải quyết:** File mới (25 SOP) là tài liệu có phạm vi rộng hơn và mới hơn → giữ nguyên mã của file mới làm chuẩn (`SOP-CRM-001`, `SOP-ADM-003/005/006/007`...). Các SOP hẹp trong gói cũ bị trùng số nhưng khác nội dung sẽ được **gộp hoặc dồn mã** vào phần còn trống.

| Canonical ID | Tên chuẩn hóa | Nguồn gốc | Ghi chú gộp |
|---|---|---|---|
| **SOP-CRM-001** | Lead-to-Enrollment Funnel, School Tour, Assessment hòa nhập | File mới (giữ nguyên) | Gộp nội dung: ADM-001 (Tiếp nhận Lead), ADM-002 (Tư vấn), ADM-003-cũ (School Tour), ADM-006-cũ (Assessment) của gói cũ |
| **SOP-ADM-001** *(canonical mới)* | Tiếp nhận Application & Kiểm tra Hồ sơ | Đổi mã từ gói cũ | Gộp ADM-004-cũ (Tiếp nhận Application) + ADM-005-cũ (Kiểm tra hồ sơ) — 2 bước liền kề, không cần tách SOP riêng |
| **SOP-ADM-002** *(canonical mới)* | Student Assessment (Đánh giá phát triển) | Từ ADM-006-cũ | Giữ riêng vì actor khác (Academic Assessor) và SLA riêng, dù nội dung liên quan CRM-001 |
| **SOP-ADM-003** | Tiếp nhận Hồ sơ, Ký Hợp đồng, Xác nhận Nhập học | File mới (giữ nguyên, đã đủ 30 mục) | Gộp ADM-007-cũ (Offer) + ADM-008-cũ (Enrollment Confirm) + ADM-009-cũ (Contract/Fee Plan) — file mới đã bao phủ toàn bộ 3 bước này trong 1 SOP |
| **SOP-ADM-004** *(canonical mới)* | Operational Handover (Bàn giao SIS/Bếp/Y tế) | Từ ADM-010-cũ | **File mới không có mã riêng cho bước này** — được tự động hoá ẩn trong bước 6 của SOP-ADM-003, nhưng nên giữ SOP riêng vì có checklist/RACI khác (Giáo vụ, Bếp trưởng, Y tế) |
| **SOP-ADM-005** | Student Withdrawal, Hoàn phí, Bảo lưu | File mới (giữ nguyên) | Không có trong gói cũ — **hoàn toàn mới** |
| **SOP-ADM-006** | Graduation & K-12 Transition | File mới (giữ nguyên) | Hoàn toàn mới |
| **SOP-ADM-007** | Inter-Campus Transfer | File mới (giữ nguyên) | Hoàn toàn mới |

> **Lưu ý kỹ thuật quan trọng:** DB migration hiện tại (`0003_admission.sql`, `0004_mvp_workflows.sql`) dùng bảng `applications`, `offers`, `enrollments`, `contracts`, `fee_plans` tách rời — đúng tinh thần canonical ADM-001→004 ở trên (tách theo bước), **không theo** cách gộp 1-SOP-nhiều-bước của file mới. → Khi viết lại SOP Registry content, **giữ granularity của DB/API hiện tại** (4-5 bảng/step) nhưng khi hiển thị cho người dùng nghiệp vụ thì gom theo SOP-ADM-003 cho dễ đọc. Đây là 2 lớp khác nhau (data layer vs document layer), không cần ép chúng khớp 1-1.

### 21 SOP còn lại của file mới (giữ nguyên mã, không xung đột vì gói cũ chưa từng đề cập)

`SOP-MKT-001, SOP-SIS-001, SOP-SIS-002, SOP-ACA-001, SOP-FIN-001, SOP-FIN-002, SOP-FIN-003, SOP-KIT-001, SOP-HR-001, SOP-HR-002, SOP-BUS-001, SOP-MED-001, SOP-PUR-001, SOP-INV-001, SOP-FAC-001, SOP-SEC-001, SOP-GOV-001, SOP-GOV-004, SOP-QA-001, SOP-CS-001` — dùng thẳng, không cần xử lý gì thêm.

**Lỗi cần sửa khi import vào SOP Registry:** Thẻ 9 và Thẻ 10 trong file mới chứa **bản sao trùng lặp y hệt** của `SOP-CRM-001` — chỉ import 1 bản, bỏ bản trùng.

**Tổng số SOP canonical sau hợp nhất: 28** (7 nhóm Admission/CRM đã tách chi tiết theo data layer + 21 SOP domain khác).

---

## 2. Phased Build Roadmap (toàn bộ 75 domain, theo canonical SOP)

File mới có bảng "5 nhóm phân hệ" nhưng **chỉ gán phase rõ ràng cho ~40/75 domain** — 35 domain còn lại (Curriculum 13-17, Facility 38-41, Finance planning 57-61, CS/QA/Risk 62-69) bị bỏ trống phase. Tôi bổ sung phase cho toàn bộ, có giải trình phụ thuộc:

### Phase 1 — Core vận hành hàng ngày (nền tảng bắt buộc, làm trước)
*Lý do: đây là nhóm sinh doanh thu (CRM/Admission/Billing) + an toàn trẻ em (Safeguarding/Medical) + phải có ngày đầu vận hành (Curriculum/Timetable — bổ sung so với file gốc vì giáo viên cần TKB ngay).*

| Canonical SOP | Domain | Trạng thái code hiện tại |
|---|---|---|
| SOP-CRM-001 | 01,02,03 | ✅ Có `leads`, `applications` — thiếu Assessment UI đầy đủ |
| SOP-ADM-001→004 | 03,06,07 | ✅ Có schema (`offers`,`enrollments`,`contracts`,`fee_plans`) — thiếu payment/e-sign/notification |
| SOP-SIS-001 | 04,18-20,26 | ❌ Chưa có (điểm danh, pickup, biometric/QR) |
| SOP-SIS-002 | 21,22,62 | ❌ Chưa có (sổ liên lạc điện tử) |
| SOP-MED-001 | 23-26 | ❌ Chưa có (hồ sơ y tế, dị ứng — **rủi ro an toàn cao nhất, nên ưu tiên sớm**) |
| SOP-FIN-001 | 08,09,10,11,55 | ❌ Chưa có (billing tự động, gạch nợ) |
| SOP-ACA-001 *(đề xuất nâng lên Phase 1)* | 13-17,41 | ❌ Chưa có (curriculum/TKB — cần từ ngày vận hành đầu tiên) |
| SOP-SEC-001 *(bắt buộc song song, không chờ)* | 26,67,71-73,75 | ⚠️ Có khung permission cơ bản (`permissions.ts`) — chưa đủ RBAC chi tiết theo file mới |

### Phase 2 — Vận hành hỗ trợ & tài sản
| Canonical SOP | Domain |
|---|---|
| SOP-KIT-001 | 27-32 |
| SOP-PUR-001 | 32-38,55,57 |
| SOP-INV-001 | 32,38,41,55,69 |
| SOP-FAC-001 | 38-41,64,68 |
| SOP-BUS-001 | 42-44,26 |
| SOP-HR-001 | 45,47-52 |
| SOP-MKT-001 | 01,02,57,58,70 |

### Phase 3 — Quản trị doanh nghiệp & mở rộng
| Canonical SOP | Domain |
|---|---|
| SOP-HR-002 | 45,47,48,53,54,67,75 |
| SOP-FIN-002, SOP-FIN-003 | 55-59 |
| SOP-ADM-005, SOP-ADM-006, SOP-ADM-007 | Vòng đời sau nhập học |
| SOP-CS-001 | 62-66 |
| SOP-QA-001 | 66-70 |
| SOP-GOV-001, SOP-GOV-004 | 67,70-75 |

---

## 3. Gap Analysis kỹ thuật (so với source code release-candidate hiện có)

Đã build & test thật (`pnpm install/lint/typecheck/test/build` — tất cả Pass) trên monorepo hiện tại. Đây là điểm khởi đầu tốt, KHÔNG cần viết lại từ đầu. Việc cần làm là **mở rộng**, theo thứ tự Phase 1:

### 3.1 Bổ sung schema (migration mới `0006_phase1_extensions.sql`)
- `parent_guardians` (tách khỏi `persons` chung — quan hệ, NationalID, quyền pickup)
- `medical_records`, `allergy_flags`, `medication_administrations` (Highly Restricted — mã hoá + RLS riêng)
- `enrollment_payments` (payment gateway ref, webhook reconciliation status, QR code ref)
- `attendance_events` (check-in/out, pickup authorization, biometric/QR ref)
- `daily_activity_logs`, `development_assessments` (sổ liên lạc điện tử)
- `discount_approval_requests` (workflow ngưỡng % — **để config, không hardcode 15%/20%**)
- `curriculum_programs`, `lesson_plans`, `timetables`, `teacher_assignments`

### 3.2 Module API mới (NestJS)
- `modules/safeguarding` — quản lý pickup authorization, medical alert, audit truy cập HRI riêng biệt
- `modules/billing` — Fee Engine, discount rule engine, payment webhook receiver
- `modules/academic` — curriculum/timetable
- Mở rộng `modules/admission` hiện tại: thêm duplicate-detection theo SĐT/email/DOB (FR-ADM-001 trong file mới), thêm approval-workflow khi discount vượt ngưỡng

### 3.3 Tích hợp bên ngoài cần chọn nhà cung cấp TRƯỚC khi code (blocking decisions)
| Hạng mục | Vai trò | Trạng thái |
|---|---|---|
| Payment Gateway / VietQR / Virtual Account | Thu tiền cọc/học phí tự động | Chưa chọn |
| e-Signature service | Ký hợp đồng điện tử | Chưa chọn |
| Zalo OA + SMS Brandname | Notification Matrix | Chưa chọn |
| OIDC Identity Provider | Auth thật (thay `development actor` hiện tại) | Chưa chọn — **đã cảnh báo ở báo cáo trước, vẫn là blocker số 1** |
| Object Storage + malware scan | Upload hồ sơ/hình ảnh trẻ | Chưa chọn |

> Những mục này **không phải việc của developer quyết định** — cần chủ đầu tư/Ban điều hành chọn nhà cung cấp vì ảnh hưởng chi phí vận hành và hợp đồng pháp lý (đặc biệt e-Sign và OIDC).

### 3.4 Nguyên tắc bắt buộc khi code (rút từ Quy tắc 01-03 của file mới)
- **Không hardcode ngưỡng nghiệp vụ** (% discount, số ngày giữ chỗ, SLA giờ) — tất cả đưa vào bảng config/master data, sửa được qua UI Admin, không sửa code.
- **Data Classification bắt buộc ở tầng schema**: mọi bảng chứa dữ liệu y tế/sinh trắc học phải gắn cột phân loại (`HRI`/`CON`/`INT`/`PUB`) — code hiện tại đã có cột `data_classification` trên `persons`, cần áp dụng nhất quán cho các bảng mới.
- **Segregation of Duties** phải là constraint ở tầng permission (vd Admission Officer không tự confirm payment) — không chỉ là quy ước tài liệu.
- Mọi rule liên quan luật VN (Nghị định 13/2023/NĐ-CP, Luật Trẻ em, Luật Lao động...) giữ nhãn "cần kiểm tra pháp lý trước khi ban hành chính thức" **trong UI** (vd banner cảnh báo trên SOP Registry), không tự ý code cứng logic pháp lý chưa xác nhận.

---

## 4. Việc cần làm ngay (Sprint kế tiếp — bắt đầu build)

1. **Import 28 canonical SOP vào SOP Registry** (bảng `sops`/`sop_versions` đã có sẵn trong schema) — dùng mapping ở Mục 1, đánh dấu file gốc để truy vết.
2. **Viết migration `0006_phase1_extensions.sql`** theo danh sách Mục 3.1, review cùng Enterprise Architect/CTO trước khi apply.
3. **Chốt quyết định vendor** (Mục 3.3) — đây là đường găng (critical path), trì hoãn sẽ chặn toàn bộ Billing/Notification/Contract module.
4. **Thiết kế bảng Master Data cấu hình** cho: Discount Policy, Holding-fee TTL, Fee Matrix — trước khi code Fee Engine, tránh hardcode.
5. **Viết OIDC integration** thay `resolveDevelopmentActor()` hiện tại — đây là rủi ro bảo mật lớn nhất đang tồn tại trong release candidate.

---

*Tài liệu này bổ sung, không thay thế, `00_MANIFEST.md` và `STEP_12_RELEASE_READINESS_REPORT.md` của gói cũ. Dùng file này làm nguồn tham chiếu chính khi mở rộng phạm vi từ MVP pilot sang Full ERP.*
