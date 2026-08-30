# PRODUCT CHARTER — SOP OPERATING SYSTEM CHO TRƯỜNG MẦM NON

| Thuộc tính | Giá trị |
|---|---|
| Mã dự án | SOP-OS-2026 |
| Tên sản phẩm | Preschool SOP Operating System |
| Phiên bản Charter | 0.1 — Proposed |
| Ngày lập | 29/08/2026 |
| Product Sponsor | TBD |
| Product Owner | TBD |
| Business Owner | TBD |
| Pilot Process | Lead-to-Enrollment |
| Pilot Scope | Một cơ sở đại diện; sẵn sàng mở rộng multi-campus |
| Ngôn ngữ MVP | Tiếng Việt; thuật ngữ ERP giữ tiếng Anh |

## 1. Tuyên bố sản phẩm

Xây dựng một Web app quản trị SOP tập trung, giúp nhà trường thiết kế kiến trúc quy trình, biên soạn, review, phê duyệt, ban hành, tìm kiếm, kiểm soát phiên bản và truy vết SOP sang Business Rule, Functional Requirement và Test Case.

Sản phẩm được định vị là **SOP Operating System**, không phải kho lưu file. Hệ thống phải làm rõ: quy trình nào đang áp dụng, ai chịu trách nhiệm, phiên bản nào có hiệu lực, kiểm soát nào bắt buộc và yêu cầu ERP nào được sinh ra từ SOP.

## 2. Bối cảnh và vấn đề cần giải quyết

Các quy trình vận hành trường mầm non thường được lưu rời rạc trong Word, PDF, Excel, email hoặc kinh nghiệm cá nhân. Những vấn đề chính:

- Không có Process Architecture L0–L3 thống nhất.
- Khó xác định SOP nào đang có hiệu lực.
- Nội dung, vai trò, trạng thái và biểu mẫu dễ trùng hoặc mâu thuẫn.
- Review/approval thiếu SLA và audit trail.
- Nhân viên khó tìm đúng hướng dẫn theo vai trò và tình huống.
- SOP không liên kết trực tiếp với backlog phát triển ERP.
- Dữ liệu trẻ em, phụ huynh, y tế và tài chính chưa được phân loại xuyên suốt.
- Khó mở rộng cùng một chuẩn vận hành cho nhiều cơ sở.

## 3. Mục tiêu kinh doanh

### OBJ-01 — Chuẩn hóa kiến trúc vận hành

Xây dựng một hệ phân cấp thống nhất từ Value Chain đến Process và SOP, có mã, owner và quan hệ upstream/downstream rõ ràng.

### OBJ-02 — Kiểm soát vòng đời SOP

Mọi SOP phải đi qua Draft, Review, Approval, Publish, Effective, Superseded và Archive có kiểm soát.

### OBJ-03 — Tạo khả năng truy vết sang ERP

Mỗi SOP pilot phải truy vết được từ bước nghiệp vụ đến Business Rule, Functional Requirement, Acceptance Criteria và Test Case.

### OBJ-04 — Giảm phụ thuộc vào tài liệu rời rạc

Người dùng có thể tìm, xem và xác định đúng SOP đang có hiệu lực từ một nguồn duy nhất.

### OBJ-05 — Sẵn sàng multi-campus

Kiến trúc dữ liệu và quyền phải hỗ trợ SOP áp dụng toàn hệ thống hoặc riêng từng cơ sở mà không sao chép mất kiểm soát.

## 4. Kết quả thành công của MVP

MVP được xem là thành công khi:

1. Hoàn thiện Process Architecture cho pilot Lead-to-Enrollment.
2. Quản lý đủ 10 SOP ADM-001 đến ADM-010 trên hệ thống.
3. Thực hiện được end-to-end: tạo → review → yêu cầu sửa → approve → publish → effective.
4. Không tồn tại hai version Effective của cùng SOP trong cùng phạm vi và thời điểm.
5. Người dùng tìm được SOP theo mã, từ khóa, domain, role, status và campus.
6. Mọi thay đổi nội dung, quyền và approval quan trọng đều có audit trail.
7. Mỗi SOP pilot có liên kết tối thiểu đến Business Rule, Functional Requirement và Test Case.
8. Process Owner hoàn thành UAT và ký xác nhận pilot.

## 5. Phạm vi MVP

### 5.1 Trong phạm vi

- Organization, Campus, Department, User, Role và Permission.
- Process hierarchy L0–L3.
- SOP Master Register và quy tắc đánh mã.
- SOP Studio dựa trên template chuẩn.
- Section, Step, Actor, Input, Output, Business Rule và Exception.
- Review, comment, approval và rework.
- Version control, effective date, supersede và archive.
- Search, filter, saved view và export cơ bản.
- Notification trong hệ thống và email nếu hạ tầng cho phép.
- Dashboard tác vụ và tình trạng SOP.
- Audit trail.
- Catalog cho Role, Domain, Process, Status, Tag và Document Type.
- Liên kết Business Rule, Functional Requirement, Acceptance Criteria và Test Case ở mức pilot.
- Responsive view cho tác vụ xem và phê duyệt.

### 5.2 Ngoài phạm vi MVP

- Vận hành đầy đủ 75 domain ERP.
- Workflow builder BPMN kéo-thả hoàn chỉnh.
- Checklist thực thi theo từng hồ sơ học sinh thật.
- Payroll, accounting, payment gateway và e-invoice production.
- Mobile app native.
- AI tự phê duyệt hoặc tự ban hành SOP.
- OCR hàng loạt kho tài liệu lịch sử.
- Dashboard BI nâng cao.
- Chữ ký số và chứng thư số, trừ khi được bổ sung qua change control.

### 5.3 Giả định

- Pilot triển khai trên một cơ sở đại diện nhưng data model hỗ trợ nhiều cơ sở.
- Giai đoạn đầu sử dụng dữ liệu mẫu hoặc dữ liệu đã ẩn danh.
- Process Owner và Approver được nhà trường chỉ định trước UAT.
- Tiếng Việt là ngôn ngữ chính; kiến trúc không khóa khả năng song ngữ.
- Các target KPI chưa có baseline sẽ ghi `TBD`, không tự đặt số.
- Yêu cầu pháp lý cần được đối chiếu quy định hiện hành trước khi ban hành chính thức.

## 6. Pilot business process

### Lead-to-Enrollment

`Lead → Qualification → Consultation → School Tour → Application → Document Check → Assessment → Offer → Enrollment → Contract/Fee Plan → Handover`

### Danh sách SOP pilot

| SOP ID | Tên SOP | Process Owner dự kiến | Ưu tiên |
|---|---|---|---|
| ADM-001 | Tiếp nhận và phân loại Lead | Admission Manager | P0 |
| ADM-002 | Tư vấn và ghi nhận nhu cầu | Admission Manager | P0 |
| ADM-003 | Đặt lịch và thực hiện School Tour | Admission Manager | P0 |
| ADM-004 | Tiếp nhận Application | Admission Manager | P0 |
| ADM-005 | Kiểm tra hồ sơ nhập học | Admission Manager | P0 |
| ADM-006 | Tổ chức Assessment | Academic Manager | P0 |
| ADM-007 | Phát hành và quản lý Offer | Admission Manager | P0 |
| ADM-008 | Xác nhận Enrollment | Admission Manager | P0 |
| ADM-009 | Tạo Contract và Fee Plan | Finance/Admission Manager | P0 |
| ADM-010 | Bàn giao học sinh sang vận hành lớp | Academic Manager | P0 |

Process Owner trong bảng là đề xuất và phải được xác nhận trong workshop.

## 7. Stakeholder và trách nhiệm

| Stakeholder | Trách nhiệm trong dự án |
|---|---|
| Product Sponsor | Cấp ngân sách, xử lý escalation, phê duyệt phạm vi |
| Steering Committee | Quyết định ưu tiên, policy và thay đổi lớn |
| Product Owner | Quản lý backlog, acceptance và release |
| Enterprise Architect | Kiểm soát Process Architecture và domain boundary |
| Lead BA | Chuẩn hóa SOP, rule, requirement và traceability |
| UX/UI Lead | User research, information architecture, design system |
| Tech Lead | Kiến trúc ứng dụng, security, integration và delivery |
| QA Lead | Test strategy, traceability và quality gate |
| Process Owner | Chịu trách nhiệm nội dung và hiệu quả quy trình |
| SOP Author | Soạn và cập nhật SOP theo template |
| Reviewer | Kiểm tra nghiệp vụ, control và tính khả thi |
| Approver | Phê duyệt ban hành theo thẩm quyền |
| IT/System Admin | Identity, role, configuration, backup và support |
| Auditor/Compliance | Kiểm tra version, approval, control và audit trail |
| End User | Tìm, đọc, xác nhận và phản hồi SOP |

## 8. Personas và nhu cầu chính

### Ban điều hành

Cần dashboard tổng quan, SOP thiếu/quá hạn, rủi ro, bottleneck và mức độ hoàn thiện.

### Process Owner

Cần quản lý danh mục SOP, owner, reviewer, effective date, KPI, exception và change request.

### SOP Author/BA

Cần editor có template, autosave, reusable catalog, validation và liên kết requirement.

### Reviewer/Approver

Cần xem thay đổi, comment theo section, approve/reject nhanh và kiểm tra impact.

### Nhân viên vận hành

Cần tìm đúng SOP theo role/tình huống, đọc đơn giản trên desktop/mobile và biết phiên bản đang áp dụng.

### Auditor

Cần xem lịch sử phiên bản, approval, before/after, quyền truy cập, control và evidence.

## 9. Product principles và UX guardrails

1. Không hiển thị toàn bộ 30 phần SOP cùng lúc khi soạn mới.
2. Template được chia theo nhóm: Overview, Process, Control, System và Assurance.
3. Dùng catalog/autocomplete cho role, status, process và business object.
4. Mọi màn hình phải thể hiện rõ ID, version, status, owner và scope.
5. Dashboard chỉ hiển thị thông tin có thể hành động.
6. Tác vụ phổ biến không quá ba cấp điều hướng.
7. Mobile ưu tiên đọc, xác nhận và approval; desktop ưu tiên authoring.
8. Không dùng màu làm tín hiệu duy nhất.
9. Action nguy hiểm phải có xác nhận và reason.
10. Người dùng không được sửa trực tiếp nội dung Effective.

## 10. Governance model

### 10.1 Cấp quyết định

| Loại quyết định | Owner | Cấp phê duyệt |
|---|---|---|
| Product scope | Product Owner | Sponsor/Steering Committee |
| Process Architecture | Enterprise Architect | Business Owner |
| Nội dung SOP | Process Owner | Approver theo domain |
| Data model/API | Tech Lead | Architecture Review |
| UX pattern/design system | UX Lead | Product Owner |
| Security/RBAC | Security/IT Lead | Business Owner |
| Release production | Product Owner + QA Lead | Sponsor hoặc delegate |

### 10.2 Nhịp quản trị

- Product/BA working session: 2 lần/tuần.
- Sprint planning/review: theo sprint 2 tuần.
- Architecture review: ít nhất 1 lần/sprint trong giai đoạn nền tảng.
- Steering review: mỗi 2–4 tuần hoặc khi có quyết định vượt thẩm quyền.
- Risk review: hằng tuần trong pilot.

### 10.3 Change control

Change Request bắt buộc khi thay đổi:

- Phạm vi MVP hoặc pilot process.
- SOP lifecycle và approval authority.
- Canonical status hoặc business object.
- Phân loại dữ liệu và quyền truy cập.
- Integration hoặc non-functional requirement quan trọng.
- Timeline/budget vượt tolerance được duyệt.

## 11. Product KPIs

| KPI | Cách đo | Target MVP |
|---|---|---|
| SOP pilot hoàn thiện | SOP đạt quality checklist / tổng SOP pilot | 100% |
| SOP có owner | SOP có Process Owner / tổng SOP | 100% |
| Traceability coverage | SOP có BR-FR-AC-Test link / tổng SOP pilot | 100% |
| Approval audit coverage | Approval có đầy đủ actor/time/action/reason | 100% |
| Duplicate effective version | Số xung đột version Effective | 0 |
| Search success rate | Phiên tìm kiếm dẫn đến mở đúng SOP | Baseline trong pilot |
| Approval cycle time | Từ Submit đến Approved/Rejected | Target: TBD |
| UAT pass rate | Test case đạt / test case thực hiện | Theo quality gate được duyệt |
| User adoption | Người dùng pilot hoạt động / người dùng được cấp quyền | Target: TBD |

## 12. High-level functional epics

| Epic | Nội dung | Priority |
|---|---|---|
| EPIC-01 Identity & Access | Auth, role, permission, campus scope | P0 |
| EPIC-02 Process Architecture | L0–L3 tree và dependency | P0 |
| EPIC-03 SOP Registry | Danh mục, mã, owner, scope, status | P0 |
| EPIC-04 SOP Studio | Template, editor, step, rule, validation | P0 |
| EPIC-05 Review & Approval | Comment, approval, rework, SLA | P0 |
| EPIC-06 Version & Publication | Compare, effective, supersede, archive | P0 |
| EPIC-07 Search & Discovery | Search, filter, saved view | P0 |
| EPIC-08 Audit & Notification | Audit event, inbox, email | P0 |
| EPIC-09 Traceability | BR, FR, AC, Test Case links | P1 trong platform; bắt buộc cho pilot |
| EPIC-10 Reporting | Task, status, completeness dashboard | P1 |

## 13. Non-functional requirements baseline

### Security

- Least Privilege và deny-by-default.
- Phân quyền theo action, campus, domain và data classification.
- Encryption in transit và at rest.
- Audit các thao tác content, approval, permission và export.
- Không lưu secret trong source code.

### Privacy

- Pilot ưu tiên dữ liệu mẫu/ẩn danh.
- Phân loại Public, Internal, Confidential và Highly Restricted.
- Dữ liệu trẻ em, y tế và authorized pickup thuộc nhóm kiểm soát cao.
- Có retention và masking theo policy được duyệt.

### Reliability

- Backup định kỳ và kiểm thử restore.
- Health check, structured logging và error monitoring.
- Version conflict phải được phát hiện, không silent overwrite.

### Usability và accessibility

- Giao diện tiếng Việt rõ ràng.
- Keyboard navigation, focus state, label và contrast phù hợp.
- Responsive cho đọc và approval.

### Maintainability

- Khuyến nghị modular monolith cho MVP.
- API contract và database migration có version.
- Automated test cho workflow, permission, version và audit.

## 14. Kiến trúc kỹ thuật định hướng, chưa khóa

Khuyến nghị ban đầu:

- Frontend: React/Next.js + TypeScript.
- Backend: NestJS hoặc service layer tương đương.
- Database: PostgreSQL.
- Object storage: tài liệu đính kèm và bản export.
- Search MVP: PostgreSQL Full Text Search; nâng cấp search engine khi có dữ liệu thực tế.
- Authentication: adapter hỗ trợ local/SSO; lựa chọn cuối xác định trong architecture workshop.
- Deployment: Docker, tách dev/staging/production.
- Observability: application log, audit log, metrics và health endpoints.

Đây là định hướng để lập backlog, chưa phải Architecture Decision Record chính thức.

## 15. Delivery plan và quality gates

### Gate G0 — Charter Approved

- Sponsor, Product Owner, Business Owner và phạm vi pilot được xác nhận.
- Các assumption quan trọng được chấp nhận hoặc thay thế.

### Gate G1 — Process Foundation Approved

- L0–L3, coding convention, SOP Master Register và canonical status được duyệt.

### Gate G2 — Product Definition Approved

- Data model, RBAC, sitemap, wireframe và prioritized backlog được duyệt.

### Gate G3 — MVP Feature Complete

- P0 epic hoàn tất; automated test và security checks đạt yêu cầu.

### Gate G4 — UAT Accepted

- 10 SOP pilot được nhập, workflow chạy đủ happy/exception path, lỗi nghiêm trọng được đóng.

### Gate G5 — Pilot Release

- Backup/restore, monitoring, training, support và rollback plan sẵn sàng.

## 16. Rủi ro cấp dự án

| ID | Rủi ro | Mức ảnh hưởng | Response |
|---|---|---:|---|
| R-01 | Scope tăng sang toàn bộ 75 domain | Cao | Giữ pilot ADM; mở rộng qua change control |
| R-02 | Chưa có Process Owner thực tế | Cao | Sponsor chỉ định trước Gate G1 |
| R-03 | Mỗi SOP tự tạo role/status | Cao | Khóa canonical catalogs trước authoring |
| R-04 | Template 30 phần gây UX nặng | Trung bình | Wizard, section group và template theo loại |
| R-05 | Dùng dữ liệu trẻ em thật quá sớm | Cao | Dữ liệu mẫu/ẩn danh trong MVP |
| R-06 | SOP không chuyển thành backlog được | Cao | Traceability là acceptance bắt buộc |
| R-07 | AI tạo nội dung sai | Cao | Human review; AI không có quyền publish |
| R-08 | Chậm quyết định governance | Trung bình | Decision owner, SLA và escalation rõ ràng |

## 17. Decision log cần chốt

| ID | Quyết định | Phương án khuyến nghị | Owner | Trạng thái |
|---|---|---|---|---|
| DEC-01 | Sponsor và Product Owner | Chỉ định một người cho mỗi vai trò | Management | Open |
| DEC-02 | Pilot campus | Một cơ sở đại diện | Business Owner | Open |
| DEC-03 | Identity provider | Microsoft 365 nếu tenant hiện hữu đáp ứng | IT Lead | Open |
| DEC-04 | Song ngữ MVP | Tiếng Việt trước, data model hỗ trợ i18n | Product Owner | Open |
| DEC-05 | Dữ liệu pilot | Dữ liệu mẫu/ẩn danh | Security + Business | Open |
| DEC-06 | Approval authority | Theo domain và threshold | Business Owner | Open |
| DEC-07 | Import tài liệu cũ | Manual/selective import trong MVP | Product Owner | Open |
| DEC-08 | Checklist execution | Đưa sang Phase 3 | Product Owner | Open |

## 18. Definition of Ready cho bước kế tiếp

Có thể bắt đầu **Master Process Architecture L0–L3** khi:

- Phạm vi pilot Lead-to-Enrollment được chấp nhận.
- Có đầu mối Business Owner và Process Owner dự kiến.
- Đồng ý sử dụng bộ mã ADM-001 đến ADM-010 làm working baseline.
- Xác nhận các assumption có thể được dùng cho bản kiến trúc đề xuất.

Nếu chưa có quyết định chính thức, nhóm BA vẫn có thể xây bản `Proposed` nhưng không chuyển trạng thái `Approved`.

## 19. Phê duyệt Charter

| Vai trò | Họ tên | Quyết định | Ngày | Ghi chú |
|---|---|---|---|---|
| Product Sponsor | TBD | Pending | | |
| Business Owner | TBD | Pending | | |
| Product Owner | TBD | Pending | | |
| IT/Architecture Owner | TBD | Pending | | |

---

**Bước kế tiếp sau Charter:** xây dựng `MASTER PROCESS ARCHITECTURE — Lead-to-Enrollment`, gồm L0–L3, process dependency, status lifecycle, actor map, business object map và SOP Master Register chi tiết.
