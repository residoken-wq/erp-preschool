# KẾ HOẠCH XÂY DỰNG SOP VÀ WEB APP QUẢN TRỊ TRƯỜNG MẦM NON

## 1. Kết luận phân tích tài liệu nguồn

Tài liệu nguồn đã xác định đúng tư duy cốt lõi: **Business → Process → People → Data → Control → ERP → Automation → KPI → Audit**; phân cấp quy trình L0–L5; mẫu SOP 30 phần; danh sách actor; 75 domain ERP; Business Rules, Functional Requirements, RBAC, Audit Trail và Acceptance Criteria.

Tuy nhiên, tài liệu hiện là **khung chỉ dẫn để tạo SOP**, chưa phải đặc tả Web app. Trước khi phát triển cần chuẩn hóa thêm:

1. Một taxonomy và bộ mã dùng chung cho Domain, Process, SOP, Role, Form, Rule, Requirement, Risk, KPI và Test Case.
2. Một data model trung tâm để tránh mỗi SOP tự tạo status, actor và dữ liệu riêng.
3. Vòng đời biên soạn–review–phê duyệt–ban hành–đào tạo–đánh giá SOP.
4. Cơ chế liên kết hai chiều giữa SOP và yêu cầu phần mềm.
5. Phạm vi MVP; không triển khai đồng thời toàn bộ 75 domain.
6. Mô hình UX theo vai trò; không dùng một giao diện quản trị duy nhất cho mọi người.

## 2. Mục tiêu sản phẩm

Web app phải là **SOP Operating System**, không chỉ là kho lưu tài liệu. Hệ thống cần giúp:

- Ban điều hành nhìn thấy kiến trúc vận hành và mức độ hoàn thiện.
- Process Owner thiết kế, kiểm soát, phát hành và cải tiến SOP.
- Nhân viên tìm đúng quy trình và thực hiện theo từng bước.
- BA/Product chuyển SOP thành Business Rule, Functional Requirement và backlog.
- QA truy vết Requirement → Acceptance Criteria → Test Case.
- Auditor xem phiên bản, phê duyệt, thay đổi, bằng chứng và audit trail.
- Quản trị hệ thống kiểm soát cơ sở, vai trò, quyền và danh mục dùng chung.

## 3. Nguyên tắc thiết kế

1. **Single Source of Truth:** mỗi đối tượng chỉ có một bản ghi chuẩn.
2. **Traceability:** từ L0 đến SOP, Rule, Requirement, Test Case và Release.
3. **Workflow-driven:** trạng thái và phê duyệt được cấu hình, không ghi tự do.
4. **Role-based UX:** dashboard và thao tác theo vai trò.
5. **Progressive disclosure:** màn hình tổng quan đơn giản, chi tiết mở theo nhu cầu.
6. **Configuration over customization:** domain, trạng thái, approval, SLA có thể cấu hình.
7. **Version-first:** nội dung đã ban hành không bị sửa trực tiếp.
8. **Mobile-friendly execution, desktop-first authoring.**
9. **Multi-campus ready:** dữ liệu chung và dữ liệu riêng từng cơ sở.
10. **Security by design:** dữ liệu trẻ em, y tế và tài chính được phân loại, giới hạn và ghi log.

## 4. Kiến trúc nghiệp vụ L0 đề xuất

| Mã | Value Chain L0 | Phạm vi chính |
|---|---|---|
| L0-01 | Strategy & Governance | Chiến lược, chính sách, compliance, risk, audit, BI |
| L0-02 | Market-to-Lead | Marketing, campaign, CRM, lead |
| L0-03 | Lead-to-Enrollment | Tư vấn, tham quan, hồ sơ, đánh giá, offer, enrollment |
| L0-04 | Student-to-Progression | Lớp học, attendance, curriculum, assessment, promotion |
| L0-05 | Child Care & Safeguarding | Check-in/out, y tế, thuốc, incident, bảo vệ trẻ |
| L0-06 | Plan-to-Meal | Dinh dưỡng, thực đơn, bếp, ATTP, lưu mẫu |
| L0-07 | Bill-to-Cash | Học phí, invoice, payment, discount, debt, refund |
| L0-08 | Procure-to-Pay | Yêu cầu mua, RFQ, PO, nhận hàng, invoice, payment |
| L0-09 | Hire-to-Retire | Tuyển dụng, onboarding, lịch làm, năng lực, đánh giá |
| L0-10 | Asset-to-Retire | Tài sản, bảo trì, facility, phòng học |
| L0-11 | Route-to-School | Xe đưa đón, tuyến, điểm đón, bus attendance |
| L0-12 | Request-to-Resolution | Parent service, complaint, helpdesk, communication |

## 5. Bộ hồ sơ quản trị bắt buộc

Không nên bắt đầu bằng việc viết hàng trăm SOP. Trước tiên cần tạo 10 catalog chuẩn:

| Catalog | Nội dung |
|---|---|
| Process Architecture | L0, L1, L2, L3 và quan hệ cha–con |
| SOP Master Register | Mã, tên, owner, version, status, priority, campus |
| Role & RACI Catalog | Chức danh, trách nhiệm, phạm vi cơ sở |
| Business Object Catalog | Entity, owner, key fields, classification, retention |
| Business Rule Catalog | Rule ID, logic, source SOP, priority, effective date |
| Functional Requirement Catalog | FR ID, MUST/SHOULD/COULD, module, status |
| Form & Document Register | Biểu mẫu, phiên bản, nguồn tạo, nơi lưu |
| Risk & Control Register | Risk, control, owner, evidence, test frequency |
| KPI & SLA Catalog | Công thức, nguồn dữ liệu, owner, target/TBD |
| Test & Traceability Matrix | SOP step → BR → FR → AC → Test Case → Release |

## 6. Kiến trúc module của Web app

### 6.1 MVP — quản trị SOP

1. **Home & Role Dashboard**
   - Việc cần làm, SOP sắp hết hạn, approval quá SLA, thay đổi gần đây.
   - Chỉ số theo vai trò và cơ sở.

2. **Process Architecture**
   - Cây L0–L3, process map, upstream/downstream.
   - Heatmap mức độ hoàn thiện, rủi ro và ưu tiên.

3. **SOP Library**
   - Danh sách, bộ lọc, tìm kiếm toàn văn, tag và saved view.
   - Chế độ xem nhanh và trang chi tiết có mục lục cố định.

4. **SOP Studio**
   - Soạn thảo theo template 30 phần nhưng chia thành tab/step.
   - Autosave draft, validation checklist, reusable blocks.
   - Mermaid/BPMN hoặc workflow builder ở giai đoạn sau.

5. **Review & Approval**
   - Submit, review, request change, approve, publish, supersede, archive.
   - Comment theo section; approval matrix; SLA và escalation.

6. **Version & Change Control**
   - Compare version, change summary, effective date, rollback có kiểm soát.
   - Bản đã ban hành là immutable.

7. **Master Catalogs**
   - Role, campus, domain, process, status, tag, document type.

8. **RBAC & Audit**
   - Quyền theo role, action, campus, domain và mức nhạy cảm.
   - Log trước/sau, ai, lúc nào, lý do và nguồn thao tác.

### 6.2 Phase 2 — chuyển SOP thành đặc tả ERP

- Business Rule Manager.
- Functional Requirement Manager.
- Acceptance Criteria và Test Case.
- Traceability Matrix.
- Risk, Control, KPI/SLA.
- Form/Document Registry.
- Export bộ hồ sơ cho Product, Dev và QA.

### 6.3 Phase 3 — đưa SOP vào vận hành

- Work Instruction theo role.
- Checklist thực thi và bằng chứng.
- Read & Acknowledge.
- Training/quiz/competency record.
- Incident, deviation, CAPA và change request.
- KPI thực tế, compliance dashboard và audit sampling.

### 6.4 Phase 4 — AI và tích hợp

- AI hỗ trợ tạo draft từ template và dữ liệu đã duyệt.
- Phát hiện trùng SOP, xung đột rule, thiếu actor/control/test.
- OCR/import Word, PDF, Excel.
- Tích hợp SSO, Microsoft 365/Google Workspace, email và BI.
- Không cho AI tự ban hành SOP hoặc thay đổi policy đã duyệt.

## 7. Mô hình dữ liệu lõi

Các entity tối thiểu:

- Organization, Campus, Department, User, Role, Permission.
- ValueChain, Domain, Process, ProcessRelationship.
- SOP, SOPVersion, SOPSection, SOPStep, Decision, Exception.
- Actor, RACIEntry, ApprovalWorkflow, ApprovalAction.
- BusinessObject, DataField, DataRelationship, DataClassification.
- BusinessRule, FunctionalRequirement, AcceptanceCriterion, TestCase.
- FormDocument, Risk, Control, KPI, SLA, NotificationRule.
- Comment, Attachment, ChangeRequest, AuditEvent.

Quan hệ truy vết quan trọng:

`Process → SOP → SOP Version → SOP Step → Business Rule → Functional Requirement → Acceptance Criterion → Test Case → Release`

## 8. Vòng đời SOP chuẩn

`Idea → Draft → In Review → Revision Required → Approved → Scheduled → Effective → Superseded → Archived`

Quy tắc chính:

- Draft được chỉnh sửa; Approved/Effective không chỉnh trực tiếp.
- Sửa SOP đã ban hành phải tạo version mới.
- Một SOP chỉ có một version Effective tại một thời điểm trong cùng phạm vi áp dụng.
- Approval phải kiểm tra Segregation of Duties.
- Mọi lần reject, override, cancel hoặc đổi effective date phải ghi lý do.
- SOP sắp đến review date phải tạo task và thông báo.

## 9. UX/UI định hướng

### Information architecture

Thanh điều hướng chính chỉ nên gồm:

`Dashboard · Process Map · SOP Library · Tasks · Catalogs · Reports · Administration`

### Màn hình SOP Detail

- Header: mã, tên, version, status, owner, effective date.
- Cột trái: mục lục 30 phần.
- Nội dung giữa: section hiện tại.
- Cột phải: comment, validation, linked objects và activity.
- Thanh hành động cố định: Save, Submit, Compare, Export, More.

### Nguyên tắc trải nghiệm

- Không hiển thị 30 section cùng lúc khi tạo mới.
- Có template theo loại SOP: Operational, Control, Management, Compliance.
- Auto-complete từ catalog thay vì nhập text tự do.
- Trạng thái dùng màu và nhãn; không phụ thuộc màu duy nhất.
- Bảng hỗ trợ filter, sort, column chooser, saved view và bulk action có kiểm soát.
- Responsive cho phê duyệt/checklist; editor chuyên sâu ưu tiên desktop.

## 10. Phạm vi MVP đề xuất

MVP không viết toàn bộ SOP ngành mầm non. Chọn một end-to-end process để kiểm chứng kiến trúc, ưu tiên **Lead-to-Enrollment** vì liên kết CRM, Parent, Student, Contract và Tuition.

### 10 SOP mẫu của pilot

1. ADM-001 Tiếp nhận và phân loại Lead.
2. ADM-002 Tư vấn và ghi nhận nhu cầu.
3. ADM-003 Đặt lịch School Tour.
4. ADM-004 Tiếp nhận Application.
5. ADM-005 Kiểm tra hồ sơ.
6. ADM-006 Đánh giá/Assessment.
7. ADM-007 Phát hành Offer.
8. ADM-008 Xác nhận Enrollment.
9. ADM-009 Tạo Contract và Fee Plan.
10. ADM-010 Bàn giao học sinh sang vận hành lớp học.

MVP đạt yêu cầu khi có thể chứng minh toàn bộ chuỗi: tạo kiến trúc → soạn SOP → review → approve → publish → tìm kiếm → truy vết requirement → audit.

## 11. Roadmap thực hiện

| Giai đoạn | Thời lượng tham chiếu | Kết quả |
|---|---:|---|
| 0. Discovery & Governance | 1–2 tuần | Scope, stakeholder, success metrics, governance |
| 1. Process Architecture | 2–3 tuần | L0–L3, coding standard, owner, dependency map |
| 2. SOP & Data Standards | 2–3 tuần | Template, lifecycle, catalogs, data dictionary |
| 3. UX/Product Definition | 2–3 tuần | Sitemap, user flows, wireframe, design system |
| 4. MVP Build | 6–10 tuần | 8 module MVP và pilot ADM |
| 5. UAT & Pilot | 2–4 tuần | UAT, migration, training, issue resolution |
| 6. Rollout | Theo wave | Mở rộng domain và campus theo ưu tiên |

Thời lượng chỉ là baseline; cần chốt lại theo nguồn lực, chất lượng tài liệu AS-IS và phạm vi tích hợp.

## 12. Backlog ưu tiên

### P0 — bắt buộc

- Authentication/SSO, RBAC, campus scope.
- Process tree và SOP register.
- SOP editor có template và validation.
- Review/approval/version/publish.
- Search/filter/export.
- Audit log và notification.
- Master catalogs và basic dashboard.

### P1 — quan trọng

- Business Rules, Requirements, AC/Test Case.
- Traceability, risk/control, KPI/SLA.
- Comments, change request, compare version.
- Read & acknowledge và review reminder.

### P2 — nâng cao

- Visual workflow builder/BPMN.
- Checklist execution, evidence, CAPA.
- AI assistant, OCR/import, integrations và advanced BI.

## 13. Sprint plan đề xuất cho MVP

| Sprint | Trọng tâm |
|---|---|
| Sprint 0 | Product charter, domain model, architecture, design tokens, CI/CD |
| Sprint 1 | Auth, organization/campus, user/role/permission |
| Sprint 2 | Process hierarchy, SOP register, coding rules |
| Sprint 3 | SOP Studio, section template, autosave, validation |
| Sprint 4 | Review, approval, comments, notifications |
| Sprint 5 | Versioning, compare, publish, audit trail |
| Sprint 6 | Search, dashboard, export, responsive approval |
| Sprint 7 | Pilot ADM data, UAT fixes, security and performance hardening |

## 14. Deliverable trước khi code

1. Product Vision và scope MVP.
2. Stakeholder map và personas.
3. Master Process Architecture L0–L3.
4. SOP Master Register và coding convention.
5. SOP template theo 4 loại.
6. Status lifecycle và approval matrix.
7. Canonical domain/data model và data dictionary.
8. RBAC matrix và data classification.
9. Sitemap, user flow, wireframe và design system.
10. User story, acceptance criteria và prioritized backlog.
11. Non-functional requirements.
12. UAT plan, migration plan và rollout plan.

Không nên bắt đầu code production trước khi các mục 3, 4, 6, 7 và 8 được duyệt.

## 15. Non-functional requirements tối thiểu

- Bảo mật: SSO/MFA khi khả dụng, encryption in transit/at rest, least privilege.
- Audit: append-only đối với sự kiện quan trọng; export có kiểm soát.
- Hiệu năng: trang danh sách và tìm kiếm phổ biến phản hồi nhanh ở quy mô dự kiến.
- Khả dụng: backup, restore test, health check và incident logging.
- Riêng tư: data minimization, masking, retention và quyền truy cập dữ liệu trẻ em/y tế.
- Accessibility: keyboard navigation, contrast, label rõ ràng.
- Localization: tiếng Việt mặc định; sẵn sàng song ngữ.
- Maintainability: modular monolith cho MVP, API contract rõ, migration có version.

## 16. Tiêu chí hoàn thành MVP

- 100% SOP pilot có owner, trigger, input/output, RACI, workflow, rule, permission, audit và acceptance criteria.
- Không có SOP trùng mã hoặc nhiều version Effective cùng phạm vi.
- Người dùng tìm thấy SOP theo mã/từ khóa/domain/role/campus.
- Quy trình phê duyệt chạy đủ happy path và reject/rework/overdue.
- Mọi thay đổi nội dung, quyền và approval quan trọng có audit trail.
- Traceability từ SOP step đến ít nhất Rule, Requirement và Test Case.
- UAT được Process Owner ký xác nhận.
- Backup/restore, phân quyền và security test đạt tiêu chí đã duyệt.

## 17. Rủi ro dự án và cách kiểm soát

| Rủi ro | Kiểm soát |
|---|---|
| Viết quá nhiều SOP trước khi chuẩn hóa | Duyệt architecture và catalog trước |
| Mỗi domain dùng status/role khác nhau | Canonical catalogs và governance board |
| UI quá phức tạp vì mẫu 30 phần | Wizard, tab và template theo loại SOP |
| SOP tách rời phần mềm | Traceability bắt buộc |
| AI tạo nội dung sai | AI chỉ tạo draft; human approval bắt buộc |
| Lộ dữ liệu trẻ em/y tế | Classification, field-level access, audit và retention |
| Scope creep 75 domain | Pilot một E2E process, rollout theo wave |
| Version conflict | Immutable release và optimistic locking |

## 18. Thứ tự hành động tiếp theo

1. Chốt Product Charter và người chịu trách nhiệm phê duyệt.
2. Xây Master Process Architecture L0–L3.
3. Lập SOP Master Register có priority P0/P1/P2.
4. Chuẩn hóa coding, lifecycle, role và data catalogs.
5. Viết 10 SOP pilot Lead-to-Enrollment.
6. Thiết kế data model và traceability model.
7. Thiết kế sitemap, user flow và wireframe.
8. Chuyển SOP pilot thành user story/acceptance criteria.
9. Code MVP theo sprint.
10. UAT tại một cơ sở, đo kết quả rồi mới mở rộng.

## 19. Quyết định cần chốt trong workshop đầu tiên

1. Web app chỉ quản lý tài liệu SOP hay có cả checklist thực thi?
2. Đối tượng pilot: một trường hay chuỗi nhiều cơ sở?
3. Nguồn đăng nhập: tài khoản nội bộ, Microsoft 365 hay Google Workspace?
4. Ai là Process Owner và Approver cho từng domain?
5. Có cần song ngữ Việt–Anh ngay trong MVP không?
6. Có yêu cầu import kho Word/PDF/Excel hiện hữu không?
7. Phạm vi dữ liệu trẻ em thật trong pilot hay chỉ dữ liệu mẫu?
8. Hệ thống ERP vận hành tương lai sẽ tích hợp qua API nào?

---

**Khuyến nghị:** bắt đầu bằng **SOP Governance + Lead-to-Enrollment pilot**, không bắt đầu bằng việc viết toàn bộ 75 domain. Đây là lát cắt đủ rộng để kiểm chứng kiến trúc dữ liệu, workflow, quyền, version, audit và UX trước khi đầu tư mở rộng toàn hệ thống.
