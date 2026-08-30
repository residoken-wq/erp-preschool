# Thẻ 2

Hệ thống ERP Mầm non Doanh nghiệp (Enterprise Preschool ERP) được kiến trúc dựa trên trục giá trị xuyên suốt từ thu hút học sinh, quản lý vận hành giảng dạy – y tế – an toàn bếp ăn, đến đối soát tài chính và quản trị đa cơ sở.

## **Chuỗi Giá trị Doanh nghiệp (L0 Enterprise Value Chain)**

\[Marketing & Campaign\]   
       │  
       ▼  
\[Lead / CRM Management\] ──► \[Admission & Assessment\] ──► \[Enrollment & Student Contract\]  
                                                                  │  
┌─────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────┐  
│                                                   STUDENT LIFECYCLE OPERATIONS                                                    │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬───────────────────────────────┤  
│ SIS & Class Management         │ Safety, Health & Daily Care    │ Kitchen & Nutrition            │ Fee & Billing Management      │  
│ • Sắp lớp & Thời khóa biểu     │ • Điểm danh / Check-in Check-out│ • Lên thực đơn & Định mức ăn   │ • Biểu phí & Chính sách giảm  │  
│ • Sổ liên lạc & Đánh giá trẻ   │ • Ủy quyền đón trẻ (Pickup)    │ • Mua hàng & Kiểm nghiệm bếp   │ • Đợt thu & Tính tiền ăn bù   │  
│ • Quản lý giáo viên & ca dạy   │ • Hồ sơ y tế, dị ứng & Đơn thuốc│ • Lưu mẫu thực phẩm 24h       │ • Gạch nợ & Khấu trừ tự động  │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴───────────────────────────────┘  
       │  
       ▼  
\[Multi-campus Governance, Finance Ledger Integration, BI & Compliance Audit\]

## **Phân bổ Lộ trình Triển khai Module (Module Architecture Roadmap)**

Để đảm bảo phương pháp luận **Business → Process → People → Data → Control → ERP → Automation → KPI → Audit**, toàn bộ 75 domain vận hành được nhóm thành 5 phân hệ chiến lược:

| Nhóm Phân hệ | Domain Bao phủ | Trọng tâm Chuẩn hóa Nghiệp vụ | Ưu tiên |
| :---- | :---- | :---- | :---- |
| **1\. CRM & Enrollment Engine** | 01 – 07, 10 | Chuyển đổi Lead → Enrollment; Quản lý hợp đồng đào tạo, giữ chỗ, ưu đãi và chính sách đặt cọc. | **Phase 1 (Core)** |
| **2\. SIS, Safeguarding & Daily Care** | 04, 05, 12, 18 – 26 | Đón/trả trẻ an toàn đa nhân tố (Biometric/QR); Nhật ký hoạt động; Quản lý y tế, dị ứng và sơ cấp cứu. | **Phase 1 (Core)** |
| **3\. Billing, Revenue & Debt Automation** | 08, 09, 10, 11, 55, 56 | Engine tính học phí tự động; Tự động hoàn/khấu trừ tiền ăn theo dữ liệu điểm danh real-time; Đẩy hóa đơn điện tử. | **Phase 1 (Core)** |
| **4\. Kitchen, Food Safety & Procurement** | 27 – 37 | Tính định mức calo mầm non; Quản lý quy trình lưu mẫu 24h; Procure-to-Pay cho thực phẩm tươi sống hàng ngày. | **Phase 2** |
| **5\. Logistics, HR & Enterprise Governance** | 42 – 54, 70 – 75 | Quản lý xe bus (GPS/Bus Monitor); Bằng cấp giáo viên; Phân quyền RBAC đa cơ sở và Audit Trail chống gian lận. | **Phase 2/3** |

## **Ma trận Phân loại Dữ liệu & An toàn Bảo mật (Data Classification Framework)**

Mọi thực thể dữ liệu trong ERP mầm non phải tuân thủ cấp độ bảo mật nghiêm ngặt nhằm tuân thủ quy định bảo vệ dữ liệu cá nhân trẻ em:

* **Highly Restricted (Cực kỳ bảo mật):** Hồ sơ y tế trẻ, tiền sử dị ứng, thông tin di truyền, dữ liệu sinh trắc học đón trẻ, hồ sơ bảo vệ trẻ em (Child Safeguarding).  
*   
* **Confidential (Bảo mật):** Thông tin tài chính phụ huynh, hợp đồng nhập học, chi tiết giảm giá/học bổng, bảng lương nhân sự, log điểm danh.  
*   
* **Internal (Nội bộ):** Thực đơn tuần, kế hoạch giảng dạy, thời khóa biểu, danh sách lớp, quy trình SOP.  
*   
* **Public (Công khai):** Biểu phí niêm yết, chương trình học khung, hình ảnh truyền thông công cộng (đã có consent của phụ huynh).  
* 

Vui lòng chọn hướng phân tích chi tiết để bắt đầu khởi tạo tài liệu thiết kế hệ thống.

# Thẻ 1

## **PHẦN 1: KHUNG QUY TẮC PHÂN TÍCH & NGUYÊN TẮC QUẢN TRỊ**

### **1\. Nguyên tắc Không Tự Suy Diễn & Trích Xuất Pháp Lý**

Để đảm bảo tính chuẩn xác cho hệ thống ERP Mầm non Doanh nghiệp, mọi phân tích phải tuân thủ nghiêm ngặt 3 quy tắc kiểm soát nguồn thông tin:

* **Quy tắc 01 (Zero-Assumption):** Tất cả các thông tin chưa có dữ liệu thực tế từ doanh nghiệp sẽ được thiết kế theo chuẩn Best Practice ngành mầm non tư thục/quốc tế và được gán nhãn \[Mô hình Đề xuất \- Best Practice\].  
*   
* **Quy tắc 02 (Xác minh Quy định Pháp lý):** Đối với các quy định liên quan đến Bộ Giáo dục & Đào tạo, An toàn thực phẩm, Thuế \- Kế toán, Y tế và Pháp luật Việt Nam về Bảo vệ dữ liệu cá nhân trẻ em, nếu chưa đối chiếu văn bản quy phạm pháp luật hiện hành sẽ ghi rõ nhãn bắt buộc:  
* 

* *Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức.*  
*   
* **Quy tắc 03 (Kiểm soát Bảo vệ Trẻ em & Dữ liệu):** Áp dụng nguyên tắc Data Minimization và RBAC chặt chẽ cho dữ liệu Highly Restricted (dữ liệu y tế, hình ảnh, thông tin sinh trắc học và người được ủy quyền đón trẻ).  
* 

### **2\. Chuỗi Chuẩn hóa Nghiệp vụ (Traceability Architecture)**

Mọi quy trình được thiết kế xuyên suốt theo ma trận 9 bước:

Business → Process → People → Data → Control → ERP → Automation → KPI → Audit

## **PHẦN 2: TỔNG QUAN PHÂN HỆ GIAI ĐOẠN 1 — ADMISSION & ENROLLMENT ENGINE**

### **1\. Module Overview**

Phân hệ **Admission (03)** và **Student Enrollment (06)** đóng vai trò là "Cửa ngõ Doanh thu" của hệ thống ERP Mầm non. Phân hệ quản lý toàn bộ vòng đời chuyển đổi từ khi phát sinh quan tâm (Inquiry), tham quan trường (School Tour), đánh giá năng lực/sự phát triển của trẻ (Assessment), phát hành Thư mời nhập học (Offer Letter), ký Hợp đồng Đào tạo, thu tiền cọc/học phí đến khi cấp Student ID và chuyển giao hồ sơ sang hệ thống SIS (Student Information System).

### **2\. Actors Liên quan**

* **Chủ đầu tư / Board:** Phê duyệt chính sách ưu đãi/chiết khấu đặc thù.  
*   
* **Admission Manager:** Quản lý chỉ tiêu tuyển sinh, duyệt thư mời nhập học, duyệt miễn giảm/học bổng trong hạn mức.  
*   
* **Admission Officer:** Tiếp nhận hồ sơ, tư vấn, đặt lịch School Tour/Assessment, tạo hợp đồng nhập học.  
*   
* **Academic Assessor (Giáo viên / Chuyên gia Đánh giá):** Thực hiện khảo sát/đánh giá tâm lý vận động của trẻ.  
*   
* **Kế toán / Thu ngân:** Đối soát và xác nhận tiền cọc/tiền học phí nhập học.  
*   
* **Y tế học đường:** Kiểm tra tiền sử bệnh lý, dị ứng và hồ sơ tiêm chủng của học sinh.  
*   
* **Phụ huynh / Người giám hộ:** Cung cấp thông tin, ký hợp đồng đào tạo, nộp lệ phí.  
* 

### **3\. Business Objects (Thực thể Dữ liệu Chính)**

* Lead: Cơ hội tuyển sinh thu thập từ các kênh Marketing.  
*   
* Applicant: Hồ sơ ứng tuyển của trẻ mầm non.  
*   
* AssessmentRecord: Kết quả khảo sát sự phát triển ban đầu của trẻ.  
*   
* OfferLetter: Thư mời nhập học đính kèm chính sách phí.  
*   
* StudentContract: Hợp đồng dịch vụ giáo dục giữa Nhà trường và Phụ huynh.  
*   
* EnrollmentDeposit: Chứng từ thu tiền đặt cọc/giữ chỗ.  
*   
* StudentProfile: Hồ sơ học sinh chính thức được khởi tạo trên SIS.  
* 

### **4\. Process Hierarchy (L1 \- L3)**

* **L0: Student Lifecycle Management**  
* 

  * **L1: Admission & Enrollment Management**  
  * 

    * **L2.1: Inquiry & School Tour Operations**  
    * 

      * SOP-ADM-001: Tiếp nhận Yêu cầu Tư vấn & Đặt lịch Tham quan Trường  
      *   
      * SOP-ADM-002: Tổ chức School Tour & Khảo sát Khả năng Hòa nhập của Trẻ  
      *   
    * **L2.2: Offer & Student Enrollment Settlement**  
    * 

      * SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo và Xác nhận Nhập học  
      *   
    * **L2.3: Student Placement & Onboarding**  
    * 

      * SOP-ADM-004: Khai báo Master Data Học sinh, Xếp lớp & Chuyển giao SIS  
      * 

### **5\. Dependency & Priority**

* **Upstream:** Domain 01 (CRM & Lead Management), Domain 08 (Tuition & Fee Management).  
*   
* **Downstream:** Domain 04 (SIS), Domain 05 (Parent Management), Domain 12 (Class Management), Domain 23 (Health Records).  
*   
* **Priority:** Phase 1 — Bắt buộc triển khai đầu tiên (Core Engine).  
* 

## **PHẦN 3: BIÊN SOẠN TÀI LIỆU SOP QUẨN THỦ 30 MỤC CHUẨN MẪU**

# **SOP-ADM-003 — QUY TRÌNH TIẾP NHẬN HỒ SƠ, KÝ HỢP ĐỒNG ĐÀO TẠO VÀ XÁC NHẬN NHẬP HỌC**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-ADM-003  
*   
* **Tên SOP:** Quy trình Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo và Xác nhận Nhập học  
*   
* **Module ERP:** Admission Management (03) & Student Enrollment (06)  
*   
* **Process Owner:** Admission Manager  
*   
* **Department:** Phòng Tuyển sinh & Dịch vụ Khách hàng  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** ERP Senior Business Analyst  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Vận hành / Board  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ các bước từ khi nhận Đơn đăng ký nhập học, kiểm tra điều kiện y tế/độ tuổi, tính toán biểu phí, phê duyệt chính sách ưu đãi, phát hành Thư mời nhập học (Offer Letter), ký Hợp đồng Đào tạo đến khi thu tiền giữ chỗ/học phí và tự động khởi tạo hồ sơ Học sinh (Student Profile) trên ERP mà không cần nhập lại dữ liệu.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Áp dụng cho tất cả các cơ sở thuộc chuỗi trường mầm non.  
*   
* **Phòng ban:** Tuyển sinh, Kế toán, Y tế học đường, Ban Giám hiệu, Chăm sóc phụ huynh.  
*   
* **Đối tượng:** Tất cả học sinh mới đăng ký nhập học (Applicant) và Phụ huynh/Người giám hộ.  
*   
* **Trường hợp không áp dụng:** Học sinh tái nhập học sau thời gian bảo lưu trên 12 tháng (áp dụng SOP-ADM-008).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Applicant:** Hồ sơ thông tin trẻ đang trong giai đoạn ứng tuyển.  
*   
* **Offer Letter (Thư mời nhập học):** Văn bản chính thức của Nhà trường chấp nhận học sinh vào học, có quy định chi tiết về thời hạn đóng phí và cơ sở học.  
*   
* **Student Contract (Hợp đồng Đào tạo):** Hợp đồng pháp lý giữa nhà trường và phụ huynh quy định quyền hạn, trách nhiệm, nghĩa vụ tài chính và cam kết bảo vệ trẻ.  
*   
* **Holding Fee / Deposit:** Phí giữ chỗ để xác nhận chỉ tiêu lớp cho học sinh.  
*   
* **Student ID:** Mã định danh duy nhất của học sinh trên toàn bộ hệ thống ERP (Single Source of Truth).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tiếp nhận Đơn nhập học & Giấy tờ bổ sung | Admission Officer | Admission Manager | Phụ huynh | Kế toán |
| Khảo sát Y tế, Dị ứng & Tiền sử sức khỏe | Y tế học đường | Admission Manager | Phụ huynh | Bếp trưởng |
| Phê duyệt Thư mời & Mức Miễn giảm/Ưu đãi | Admission Manager | Hiệu trưởng / Board | Kế toán | Admission Officer |
| Thu tiền Cọc / Học phí & Xuất chứng từ | Thu ngân / Kế toán | Chief Accountant | Bank Gateway | Admission Officer |
| Ký Hợp đồng Đào tạo & Khai báo Student ID | Admission Officer | Admission Manager | Legal Adviser | Giáo viên chủ nhiệm |

*Ghi chú: Việc áp dụng quy định bảo mật dữ liệu y tế và cam kết pháp lý trong hợp đồng đào tạo cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Năm học/Kỳ học, Danh mục Biểu phí (Tuition Fee Scheme), Danh mục Chính sách Giảm giá (Discount Policy Master), Chỉ tiêu Sĩ số Lớp theo độ tuổi (Class Capacity Master).  
*   
* **Hồ sơ bắt buộc:**  
* 

  1. Đơn đăng ký nhập học (FRM-ADM-001) đã điền đầy đủ.  
  2.   
  3. Bản sao Giấy khai sinh hoặc Hộ chiếu của trẻ.  
  4.   
  5. Phiếu khai báo y tế & tiền sử dị ứng (FRM-MED-001).  
  6.   
  7. Bản cam kết xử lý dữ liệu cá nhân theo quy định pháp luật.  
  8.   
* **Approval prerequisite:** Kết quả Đánh giá đầu vào (Assessment Record) đạt trạng thái Passed hoặc Conditional Accepted.  
* 

## **7\. Trigger**

Phụ huynh nộp Đơn đăng ký nhập học kèm kết quả Đánh giá đầu vào đạt yêu cầu được ghi nhận trên hệ thống ERP.

## **8\. Quy trình AS-IS**

* Phụ huynh điền đơn đăng ký bằng giấy.  
*   
* Admission Officer nhập lại dữ liệu vào file Excel quản lý riêng.  
*   
* Gửi email thủ công cho Hiệu trưởng duyệt mức ưu đãi/giảm giá.  
*   
* Phụ huynh đóng tiền mặt hoặc chuyển khoản cá nhân, Kế toán viết phiếu thu tay.  
*   
* Gửi thông tin học sinh qua nhóm Zalo để giáo viên nhận lớp.  
*   
* **Hệ quả:** Dữ liệu trùng lặp, sai lệch thông tin dị ứng nguy hiểm, thất thoát quản lý phí giữ chỗ, thiếu sự liên kết giữa kế toán và tuyển sinh.  
* 

## **9\. Pain Points / Risk**

* **Bottleneck:** Phê duyệt Offer Letter và mức giảm giá tốn từ 2-4 ngày do làm việc qua email/ký giấy.  
*   
* **Duplicate Data:** Nhập lại thông tin học sinh 4 lần (Tuyển sinh \-\> Kế toán \-\> Y tế \-\> Giáo viên).  
*   
* **Fraud Risk:** Kế toán/Tuyển sinh tự ý áp dụng mức chiết khấu sai chính sách hoặc thu tiền cọc không qua cổng thanh toán/tài khoản công ty.  
*   
* **Compliance Risk:** Thất lạc Hồ sơ Y tế/Dị ứng của trẻ dẫn đến rủi ro an toàn thực phẩm tại bếp ăn. Chưa có cam kết Bảo vệ dữ liệu cá nhân trẻ em.  
* 

## **10\. Quy trình TO-BE**

**1.Bước 01: Tiếp nhận Đơn & Thẩm định Hồ sơ:**Thời gian thực hiện: Max 2 giờ | Actor: Admission Officer.  
Admission Officer tiếp nhận Đơn nhập học trên ERP (hoặc qua Portal/App Phụ huynh). Hệ thống tự động quét trùng lặp (Duplicate Check) theo Số định danh/Số điện thoại Phụ huynh hoặc Mã khai sinh của trẻ. Nếu phát hiện hồ sơ trùng, ERP thông báo cảnh báo và yêu cầu gộp hồ sơ.

**2.Bước 02: Khảo sát Y tế & Cảnh báo Dị ứng:**Thời gian thực hiện: Max 4 giờ | Actor: Y tế học đường.  
Cán bộ Y tế học đường truy cập ERP kiểm tra Phiếu khai báo y tế. Nếu trẻ có tiền sử dị ứng thực phẩm, bệnh mãn tính hoặc nhu cầu chăm sóc đặc biệt, Cán bộ Y tế cập nhật danh mục Special Health Need và xác nhận Medical Cleared \= YES. Thông tin này lập tức gắn nhãn cảnh báo đỏ trên ERP.

**3.Bước 03: Thiết lập Biểu phí & Tính toán Ưu đãi Tự động:**Thời gian thực hiện: Max 1 giờ | Actor: ERP System / Admission Officer.  
Admission Officer chọn Biểu phí áp dụng cho năm học. Hệ thống Rule Engine của ERP tự động tính toán Học phí, Phí tiền ăn, Phí cơ sở vật chất, Phí xe đưa đón và tự động áp dụng các chính sách Discount hợp lệ (như Học bổng, Sibling Discount, Early Bird). Nếu chiết khấu vượt thẩm quyền chuẩn, ERP tự động gửi yêu cầu Approval Workflow lên Admission Manager/Board.

**4.Bước 04: Phát hành Thư mời Nhập học (Offer Letter):**Thời gian thực hiện: Max 2 giờ | Actor: Admission Manager.  
Sau khi Workflow phê duyệt hoàn tất, ERP tự động khởi tạo Thư mời nhập học (Offer Letter) kèm mã QR Thanh toán duy nhất (Dynamic QR) chứa chính xác số tiền cọc/học phí cần nộp và hạn chót giữ chỗ (Holding Expiration Date). Thư mời được gửi tự động qua Mobile App Phụ huynh, Email và Zalo OA.

**5.Bước 05: Thu tiền Cọc / Học phí & Gạch nợ Tự động:**Thời gian thực hiện: Max 15 phút (Real-time) | Actor: Kế toán / Payment Gateway.  
Phụ huynh thực hiện thanh toán qua Cổng thanh toán/Ngân hàng tích hợp. Hệ thống ERP nhận tín hiệu Webhook từ Ngân hàng, thực hiện gạch nợ tự động (Auto-Reconciliation), chuyển trạng thái Offer từ Issued sang Paid/Deposited và phát hành Phiếu thu điện tử gửi cho Phụ huynh.

**6.Bước 06: Ký Hợp đồng Đào tạo & Chuyển giao Hồ sơ SIS:**Thời gian thực hiện: Max 24 giờ | Actor: Admission Officer & ERP System.  
Admission Officer hướng dẫn Phụ huynh ký Hợp đồng Đào tạo (Ký điện tử e-Sign hoặc Ký trực tiếp scan lên ERP). Ngay khi Hợp đồng ở trạng thái Completed, ERP kích hoạt Tự động hóa: Cấp mã Student ID định danh vĩnh viễn, tạo Student Profile trên phân hệ SIS, tự động đẩy dữ liệu dị ứng sang Phân hệ Bếp ăn/Y tế và đưa học sinh vào danh sách chờ xếp lớp (Unassigned Placement Pool).

## **11\. Workflow**

START (Nộp Đơn Đăng Ký)  
  │  
  ▼  
\[ERP: Quét Trùng Lặp Hồ Sơ (Duplicate Check)\]  
  │  
  ├─► (Phát hiện trùng) ──► \[Gộp Hồ Sơ / Xử lý Trùng\]  
  │  
  ▼  
\[Y tế Học Đường: Kiểm Tra Tiền Sử Y Tế / Dị Ứng\]  
  │  
  ▼  
\[ERP Rule Engine: Tính Học Phí & Tự Động Áp Ưu Đãi\]  
  │  
  ◇ Cần Phê Duyệt Chiết Khấu Ngoại Lệ?  
  ├─ YES ──► \[Approval Workflow: Admission Mgr / Board\] ──► (Approved)  
  └─ NO ───┐  
           │  
           ▼  
\[ERP: Tự Động Phát Hành Offer Letter \+ Dynamic QR Code\]  
  │  
  ▼  
\[Phụ Huynh Thanh Toán Tiền Cọc / Học Phí\]  
  │  
  ▼  
\[ERP: Real-time Webhook Gạch Nợ & Xuất Phiếu Thu\]  
  │  
  ▼  
\[Ký Hợp Đồng Đào Tạo (Student Contract)\]  
  │  
  ▼  
\[ERP AUTO: Cấp Student ID ──► Tạo Student Profile ──► Sync Y Tế/Bếp ──► Waiting List Xếp Lớp\]  
  │  
  ▼  
END

## **12\. Business Rules**

* **BR-ADM-001:** Mã Student ID là duy nhất trên toàn hệ thống chuỗi, được sinh tự động theo cấu trúc \[Mã\_Cơ\_Sở\]-\[Năm\_Nhập\_Học\]-\[Sequence\_5\_chữ\_số\]. Không cho phép tạo mã thủ công.  
*   
* **BR-ADM-002:** Một Applicant không thể chuyển trạng thái sang Enrolled nếu trường Medical Cleared chưa được xác nhận bởi Cán bộ Y tế và chưa có chữ kýCam kết Bảo vệ dữ liệu cá nhân của Phụ huynh.  
*   
* **BR-ADM-003:** Chính sách chiết khấu (Discount) vượt mức quy định niêm yết (ví dụ: trên 15%) phải được phê duyệt bởi Giám đốc Điều hành/Board trên ERP trước khi Thư mời nhập học được gửi đi.  
*   
* **BR-ADM-004:** Giữ chỗ (Holding Seat) chỉ có hiệu lực tối đa 05 ngày làm việc kể từ ngày phát hành Offer Letter. Sau 23:59:59 của ngày hết hạn, nếu chưa nhận được thanh toán, ERP tự động chuyển trạng thái Offer sang Expired và giải phóng chỉ tiêu cho học sinh khác.  
* 

## **13\. Exception Cases**

* **Trẻ có tiền sử dị ứng đặc biệt nghiêm trọng:** Hệ thống khoá không cho duyệt Offer tự động; bắt buộc có cuộc họp xác nhận khả năng đáp ứng của Nhà bếp và BGH trước khi ban hành Offer.  
*   
* **Giao dịch chuyển khoản thiếu/sai nội dung:** ERP ghi nhận vào Unallocated Cash Pool. Kế toán nhận cảnh báo trên ERP để thực hiện gạch nợ thủ công bằng công cụ Manual Matching.  
*   
* **Hủy nhập học và xin hoàn cọc:** Áp dụng SOP-FIN-005: Quy trình Hoàn phí & Rút hồ sơ. ERP kiểm tra điều kiện hợp đồng, nếu đủ điều kiện mới tạo chứng từ Payment Voucher chi hoàn.  
* 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Nhập học chuẩn (Đúng biểu phí) | System Auto Check | Admission Officer | N/A |
| Chiết khấu/Học bổng theo Chính sách | Admission Manager | N/A | N/A |
| Chiết khấu Ngoại lệ (Vượt khung \<= 20%) | Admission Manager | Hiệu trưởng Cơ sở | N/A |
| Chiết khấu Ngoại lệ (\> 20% hoặc Đặc xá) | Admission Manager | Hiệu trưởng Cơ sở | Chủ đầu tư / Board |

## **15\. Status Lifecycle**

Draft ──► Submitted ──► Under Medical Review ──► Offer Pending Approval ──► Offer Issued ──► Paid/Deposited ──► Contract Signed ──► Enrolled (Active SIS)  
  │                                                                            │  
  └───────────────────────────────► Lost / Expired ◄───────────────────────────┘

## **16\. Data Model**

* **Primary Entity:** StudentProfile  
* 

  * StudentID (PK, String, Unique)  
  *   
  * ApplicantID (FK, String)  
  *   
  * FullName, DOB, Gender, Nationality  
  *   
  * MedicalAlertFlags (JSON: Allergies, Chronic Diseases)  
  *   
  * CampusID (FK), Status (Enum)  
  *   
* **Related Entities:**  
* 

  * ParentGuardian: ParentID (PK), Relationship, Phone, Email, NationalID.  
  *   
  * StudentContract: ContractID (PK), StudentID (FK), SignDate, EffectiveDate, ContractStatus.  
  *   
  * EnrollmentPayment: PaymentID (PK), OfferID (FK), AmountPaid, PaymentGatewayRef, ReconciledStatus.  
  * 

## **17\. Forms / Documents**

* FRM-ADM-001: Đơn đăng ký nhập học (Application Form).  
*   
* FRM-MED-001: Phiếu thông tin sức khỏe & Tiền sử dị ứng.  
*   
* FRM-ADM-002: Thư mời nhập học mẫu (Offer Letter Template).  
*   
* FRM-ADM-003: Hợp đồng Dịch vụ Giáo dục Mầm non (Student Contract).  
*   
* FRM-FIN-001: Phiếu thu tiền / Bảng kê chi tiết khoản phí nhập học.  
* 

## **18\. ERP Functional Requirements**

* **FR-ADM-001 (MUST):** Hệ thống phải cung cấp công cụ Duplicate Detection Rule dựa trên số điện thoại phụ huynh, email và ngày sinh học sinh trước khi tạo Applicant mới.  
*   
* **FR-ADM-002 (MUST):** Hệ thống phải tích hợp Fee Engine tự động tính tổng tiền nhập học dựa trên độ tuổi, tuyến xe, phí ăn và các mã giảm giá được áp dụng.  
*   
* **FR-ADM-003 (MUST):** Hệ thống phải tự động chuyển giao toàn bộ dữ liệu từ Applicant sang StudentProfile khi hợp đồng được ký và tiền được gạch nợ thành công, không cho phép nhập tay lại dữ liệu.  
*   
* **FR-ADM-004 (SHOULD):** Hệ thống tích hợp chữ ký điện tử (e-Signature) cho phép phụ huynh ký Hợp đồng Đào tạo ngay trên Mobile App.  
* 

## **19\. Automation Opportunities**

* **AUTO-ADM-001 (RULE ENGINE):** Tự động tính toán các khoản phí và áp dụng chính sách ưu đãi theo Ma trận Biểu phí.  
*   
* **AUTO-ADM-002 (INTEGRATION):** Tự động tạo Dynamic QR code thanh toán tương ứng với từng Offer Letter và lắng nghe Webhook ngân hàng để gạch nợ tự động trong 3 giây.  
*   
* **AUTO-ADM-003 (WORKFLOW):** Tự động sinh Student ID, kích hoạt tài khoản App Phụ huynh và đồng bộ thông tin dị ứng sang Hệ thống Bếp ăn ngay khi nhập học hoàn tất.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Yêu cầu Duyệt Discount Ngoại lệ | Admission Manager / Board | ERP App Push \+ Email | Immediate khi gửi yêu cầu |
| Thư mời Nhập học được phát hành | Phụ huynh | App Push \+ Zalo OA \+ Email | Immediate sau khi Approve |
| Xác nhận Thanh toán Cọc/Học phí thành công | Phụ huynh & Kế toán | App Push \+ SMS \+ ERP Alert | Real-time (Webhook) |
| Nhắc hạn chót đóng tiền Giữ chỗ | Phụ huynh & Admission Officer | SMS \+ App Push | Trước khi hết hạn 24h & 6h |
| Hồ sơ Học sinh Mới sẵn sàng xếp lớp | Chăm sóc khách hàng / Giáo vụ | ERP Notification | Immediate khi Enrolled |

## **21\. Permission Matrix (RBAC)**

| Role | View Applicant | Create/Edit | Approve Discount | Generate Offer | View Medical Data | Confirm Payment |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Admission Officer | Full | Full | No | Yes | Read Only | Read Only |
| Admission Manager | Full | Full | Yes (In limit) | Yes | Read Only | Read Only |
| Cán bộ Y tế | Medical Only | Medical Edit | No | No | Full | No |
| Kế toán / Thu ngân | Financial Only | No | No | No | No | Full |
| Hiệu trưởng / Board | Full | Edit | Full | Yes | Read Only | Read Only |
| Giáo viên Chủ nhiệm | Assigned Only | No | No | No | Read Only (Alerts) | No |

## **22\. Audit Trail**

Hệ thống bắt buộc ghi lại chi tiết Log (Audit Log) không thể sửa xóa các hành vi sau:

* Người tạo, người chỉnh sửa thông tin nhân thân trẻ/phụ huynh (Who, When, IP, Original Value, New Value).  
*   
* Mọi thao tác áp dụng, điều chỉnh mức Discount hoặc thay đổi Biểu phí trên Offer Letter.  
*   
* Lịch sử chuyển trạng thái Workflow phê duyệt (Approved/Rejected, Lý do rejection).  
*   
* Nhật ký xem/truy cập thông tin y tế nhạy cảm của học sinh.  
* 

## **23\. Internal Controls**

* **Segregation of Duties (Tách biệt nhiệm vụ):** Nhân viên Tuyển sinh không được quyền tự xác nhận chứng từ thu tiền hoặc gạch nợ ngân hàng. Kế toán không được quyền tự điều chỉnh chính sách ưu đãi trên Offer Letter.  
*   
* **Approval Threshold Control:** Mọi khoản chiết khấu vượt quy định niêm yết bắt buộc phải có ít nhất 2 cấp phê duyệt trên hệ thống.  
*   
* **Data Validation:** Hệ thống tự động khóa các trường bắt buộc (Ngày sinh, Giấy khai sinh, Dị ứng y tế, Số điện thoại phụ huynh) không cho phép để trống khi chuyển trạng thái Enrolled.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Xử lý & Phê duyệt Offer** | Thời gian từ lúc nhận đủ thông tin đến khi phát hành Offer | \<= 8 giờ làm việc | Admission Manager |
| **Tỷ lệ Chuyển đổi Offer \-\> Paid** | (Số Offer đóng phí thành công / Tổng số Offer phát hành) \* 100 | Target: TBD | Admission Manager |
| **Tỷ lệ Gạch nợ Tự động (Auto-Reconciled)** | (Số giao dịch gạch nợ qua Webhook / Tổng số giao dịch) \* 100 | \>= 95% | Chief Accountant |
| **SLA Khai báo & Chuyển giao SIS** | Thời gian từ khi thanh toán đến khi tạo xong Student ID | Real-time (\<= 5 phút) | ERP System Admin |

## **25\. Dashboard / Report**

* **Operational Dashboard (Tuyển sinh):** Danh sách Applicant theo trạng thái, Cảnh báo Offer sắp hết hạn giữ chỗ, Bảng theo dõi lịch hẹn khám y tế.  
*   
* **Management Dashboard (Admission Manager):** Tỷ lệ chuyển đổi Funnel (Lead \-\> Tour \-\> Application \-\> Offer \-\> Enrolled), Báo cáo doanh thu cọc theo cơ sở, Báo cáo tổng hợp miễn giảm/học bổng.  
*   
* **Executive Dashboard (Board/Chủ đầu tư):** Báo cáo lấp đầy sĩ số (Occupancy Rate) real-time theo từng cơ sở/khối lớp, Báo cáo dự báo doanh thu nhập học mới (Revenue Projection).  
* 

## **26\. Integration**

* **Cổng thanh toán & Ngân hàng (Payment Gateway / Bank Virtual Account):** Tích hợp phát hành QR Code động và nhận phản hồi Webhook tức thì.  
*   
* **Zalo Official Account & SMS Brandname:** Tự động gửi thông báo Thư mời, Mã QR và Xác nhận thu tiền.  
*   
* **Cổng chữ ký số / e-Sign Service:** Cho phép ký Hợp đồng Đào tạo từ xa có giá trị pháp lý.  
*   
* **Core Finance Module:** Tự động định khoản kế toán các khoản tiền cọc/học phí thu trước vào tài khoản công nợ tương ứng (Unearned Revenue / Advance Placement).  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Thất thoát/Sai lệch nguồn tiền cọc** | High | Low | Tự động hóa gạch nợ qua QR ngân hàng chính chủ của Trường. Banned tài khoản cá nhân. | Chief Accountant |
| **Bỏ sót thông tin dị ứng nguy hiểm của trẻ** | High | Medium | Bắt buộc Cán bộ Y tế confirm Medical Cleared trên ERP mới được phép tạo Student Profile. | Y tế học đường |
| **Tuyển sinh tự ý hứa hẹn mức chiết khấu sai** | Medium | Medium | Khóa cứng chính sách phí trên ERP. Mức phí khác chuẩn bắt buộc chạy Workflow duyệt. | Admission Manager |
| **Vi phạm Bảo vệ dữ liệu cá nhân trẻ em** | High | Low | Mã hóa dữ liệu Highly Restricted, áp dụng RBAC và ghi nhận Audit Log mọi lượt truy cập. | Enterprise Architect |

## **28\. Acceptance Criteria**

* **Given:** Applicant đã hoàn thành khảo sát Y tế (Medical Cleared \= YES) và kết quả Đánh giá đầu vào đạt.  
*   
* **When:** Admission Officer thực hiện chọn biểu phí và gửi yêu cầu Phát hành Thư mời nhập học.  
*   
* **Then:** ERP kiểm tra mức Discount: Nếu đúng khung chuẩn, ERP tự động sinh Offer Letter kèm Dynamic QR trong vòng 3 giây; nếu vượt khung, ERP khởi tạo Workflow phê duyệt gửi tới đúng cấp thẩm quyền.  
*   
* **Given:** Phụ huynh thực hiện quét mã QR thanh toán tiền cọc thành công.  
*   
* **When:** Ngân hàng trả phản hồi Webhook về hệ thống ERP.  
*   
* **Then:** ERP tự động gạch nợ, chuyển trạng thái Offer sang Paid, xuất Phiếu thu điện tử và tự động khởi tạo mã Student ID vĩnh viễn trên SIS.  
* 

## **29\. Test Scenarios**

1. **Happy Path Test:** Nhập học hồ sơ chuẩn, áp dụng Discount tự động, thanh toán QR thành công \-\> ERP tự động tạo Student Profile trên SIS.  
2.   
3. **Validation Test:** Cố tình bỏ trống thông tin Dị ứng y tế hoặc Giấy khai sinh \-\> Kiểm tra ERP có chặn không cho chuyển trạng thái Enrolled.  
4.   
5. **Boundary Test:** Nộp tiền cọc đúng vào giây 23:59:59 của ngày hết hạn Holding Seat \-\> Kiểm tra ERP ghi nhận hợp lệ hay cho Expired.  
6.   
7. **Exception Test:** Chuyển khoản thiếu 100,000 VNĐ so với số tiền trên Offer \-\> Kiểm tra ERP chuyển hồ sơ vào trạng thái Partial Paid và cảnh báo cho Kế toán.  
8.   
9. **Permission Test:** Dùng tài khoản Admission Officer cố tình sửa số tiền trên Offer Letter mà không qua duyệt \-\> Kiểm tra hệ thống có khóa quyền Edit.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận Biểu phí (Tuition Matrix) chi tiết theo độ tuổi, năm học và chính sách hoàn/trả cọc.  
*   
* **Master Data:** Import danh mục trường học, danh mục quốc tịch, danh mục mã dị ứng chuẩn y tế mầm non.  
*   
* **Integration:** Tích hợp API Cổng thanh toán Ngân hàng (VietQR/Virtual Account) và Dịch vụ gửi Zalo OA/SMS.  
*   
* **Training:** Đào tạo phòng Tuyển sinh quy tắc quản lý Lead/Applicant và Đào tạo Kế toán quy trình xử lý giao dịch Manual Matching khi lỗi chuyển khoản.  
* 

## **PHẦN 4: THÔNG BÁO BÁO CÁO KẾT QUẢ & LỘ TRÌNH GIAI ĐOẠN TÍẾP THEO**

Hoàn thành thiết kế khung quản trị chuyên sâu và xây dựng **SOP-ADM-003** đạt chuẩn 30 mục cho phân hệ tuyển sinh & nhập học mầm non.

# Thẻ 3

\# SOP-SIS-001 — QUY TRÌNH ĐÓN TRẢ TRẺ AN TOÀN VÀ ĐIỂM DANH HÀNG NGÀY (PARENT AUTHORIZED PICKUP & CHECK-IN/CHECK-OUT)

\#\# 1\. Thông tin tài liệu

\* \*\*SOP ID:\*\* SOP-SIS-001  
\* \*\*Tên SOP:\*\* Quy trình Đón Trả trẻ An toàn và Điểm danh Hàng ngày  
\* \*\*Module ERP:\*\* SIS (04), Attendance (18), Student Check-in/Check-out (19), Parent Authorized Pickup (20), Child Safeguarding (26)  
\* \*\*Process Owner:\*\* Hiệu trưởng / Trưởng Bộ phận An ninh & Dịch vụ Học đường  
\* \*\*Department:\*\* Khối Vận hành Học đường, Ban Giáo vụ, Bộ phận Bảo vệ  
\* \*\*Phiên bản:\*\* v1.0  
\* \*\*Trạng thái:\*\* Ready for Baseline  
\* \*\*Ngày hiệu lực:\*\* 01/09/2026  
\* \*\*Người soạn:\*\* ERP Senior Business Analyst  
\* \*\*Người kiểm tra:\*\* Enterprise Architect & Senior BA  
\* \*\*Người phê duyệt:\*\* Giám đốc Vận hành / Board  
\* \*\*Chu kỳ review:\*\* 06 tháng/lần

\#\# 2\. Mục đích

Chuẩn hóa toàn bộ thao tác check-in, điểm danh sáng, quản lý danh sách người ủy quyền đón trẻ, kiểm soát check-out giờ về và tự động đồng bộ dữ liệu điểm danh sang hệ thống tính phí suất ăn và sổ liên lạc điện tử; đảm bảo an toàn tuyệt đối cho học sinh mầm non, loại bỏ rủi ro giao nhầm trẻ hoặc rò rỉ thông tin cá nhân.

\#\# 3\. Phạm vi áp dụng

\* \*\*Cơ sở:\*\* Áp dụng bắt buộc trên toàn bộ các cơ sở thuộc hệ thống trường mầm non.  
\* \*\*Phòng ban:\*\* Bộ phận Bảo vệ/An ninh, Giáo viên chủ nhiệm, Giáo viên trợ giảng, Y tế học đường, Bếp ăn, Kế toán, Quản lý Xe bus.  
\* \*\*Đối tượng:\*\* Toàn bộ học sinh mầm non, Phụ huynh, Người được ủy quyền đón trẻ.  
\* \*\*Trường hợp không áp dụng:\*\* Các hoạt động dã ngoại ngoài nhà trường (áp dụng \`SOP-OPS-005: Quản lý Hoạt động Dã ngoại & Sự kiện\`).

\#\# 4\. Thuật ngữ và định nghĩa

\* \*\*Authorized Pickup Person (Người được ủy quyền đón):\*\* Cá nhân đủ năng lực hành vi dân sự được Phụ huynh/Người giám hộ hợp pháp đăng ký và phê duyệt trên ERP để đón trẻ.  
\* \*\*Ad-hoc Pickup (Ủy quyền đột xuất):\*\* Thao tác đăng ký người đón tạm thời cho 1 buổi cụ thể thông qua Mobile App Phụ huynh kèm mã OTP/QR xác thực.  
\* \*\*Dynamic QR / Biometric Check:\*\* Mã QR biến đổi theo thời gian thực trên Mobile App Phụ huynh hoặc dữ liệu khuôn mặt (FaceID) dùng để xác thực tại Kiosk cổng trường.  
\* \*\*Attendance Lock Time:\*\* Thời điểm hệ thống tự động chốt sổ điểm danh ngày (09:00 AM) để chốt khẩu phần ăn và gửi dữ liệu sang Phân hệ Kế toán/Bếp ăn.  
\* \*\*Child Safeguarding Alert:\*\* Cảnh báo đỏ kích hoạt tự động khi trẻ vắng mặt không lý do hoặc có đối tượng không hợp lệ cố tình đón trẻ.

\#\# 5\. Vai trò và trách nhiệm (RACI)

| Activity | Responsible | Accountable | Consulted | Informed |  
| \--- | \--- | \--- | \--- | \--- |  
| Khai báo & Cập nhật Danh sách Người ủy quyền | Phụ huynh / Người giám hộ | Admission / Admin | Y tế học đường | Giáo viên chủ nhiệm |  
| Check-in Cổng trường / Nhận trẻ buổi sáng | Bảo vệ / Giáo viên đón | Trưởng BP Bảo vệ | Y tế học đường | Phụ huynh |  
| Điểm danh Lớp học & Xác nhận Suất ăn | Giáo viên chủ nhiệm | Hiệu trưởng Cơ sở | Y tế / Bếp ăn | Kế toán / Phụ huynh |  
| Xác minh Người đón & Check-out buổi chiều | Bảo vệ / Giáo viên trả | Trưởng BP Bảo vệ | Phụ huynh | Ban Giám hiệu |  
| Xử lý Bất thường / Cảnh báo An toàn (Alert) | Trưởng BP Bảo vệ / BGH | Hiệu trưởng Cơ sở | Legal Adviser | Toàn bộ Actor liên quan |

\> \*Ghi chú: Việc thu thập, lưu trữ dữ liệu hình ảnh, sinh trắc học và thông tin người ủy quyền đón trẻ cần kiểm tra/đối chiếu quy định hiện hành về bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP) trước khi áp dụng chính thức.\*

\#\# 6\. Điều kiện đầu vào

\* \*\*Master Data:\*\* Hồ sơ Học sinh (\`StudentProfile\`), Danh sách Lớp (\`ClassMaster\`), Danh mục Người ủy quyền (\`AuthorizedPickupMaster\`), Danh sách Xe bus (\`BusRouteMaster\`).  
\* \*\*Thiết bị & Hệ thống:\*\* Kiosk Check-in/Tablet bảo vệ hoạt động bình thường, kết nối mạng ổn định, Mobile App Phụ huynh/Giáo viên đã được kích hoạt.  
\* \*\*Approval prerequisite:\*\* Học sinh ở trạng thái \`Active/Enrolled\`; Hồ sơ y tế/dị ứng đã được cập nhật.

\#\# 7\. Trigger

\* \*\*Buổi sáng (06:45 – 08:30):\*\* Phụ huynh đưa trẻ đến cổng trường hoặc giao cho Nhân viên đi kèm xe bus (Bus Monitor).  
\* \*\*Buổi chiều (16:00 – 17:30):\*\* Phụ huynh/Người được ủy quyền đến cổng trường thực hiện quy trình đón trẻ.

\#\# 8\. Quy trình AS-IS

\* Phụ huynh đưa trẻ đến cổng trường, bảo vệ hoặc giáo viên nhìn mặt quen rồi cho vào.  
\* Giáo viên tích điểm danh vào sổ giấy tại lớp. Đến 09:30, giáo viên nhắn tin số lượng suất ăn qua nhóm Zalo cho Bếp trưởng.  
\* Buổi chiều, người đón đọc tên bé tại cổng. Bảo vệ gọi loa hoặc đàm thoại nội bộ lên lớp cho giáo viên đưa bé xuống.  
\* \*\*Hệ quả:\*\* Rủi ro giao nhầm trẻ cho người lạ/người đang có tranh chấp quyền nuôi dưỡng; tắc nghẽn giao thông cổng trường giờ cao điểm; dữ liệu suất ăn sai lệch dẫn đến lãng phí hoặc thiếu hụt thực phẩm; Kế toán mất nhiều thời gian đối soát tiền ăn cuối tháng.

\#\# 9\. Pain Points / Risk

\* \*\*Bottleneck:\*\* Tắc nghẽn cổng trường do xác minh người đón bằng điện thoại hoặc gọi loa thủ công.  
\* \*\*Human Error:\*\* Giáo viên quên điểm danh hoặc điểm danh nhầm học sinh vắng mặt thành có mặt.  
\* \*\*Fraud / Child Safety Risk:\*\* Người không có thẩm quyền (người thân đang tranh chấp dân sự, người quen chưa được xác minh) đón trẻ.  
\* \*\*Data Leakage / Compliance:\*\* Lộ diện hình ảnh trẻ em hoặc thông tin liên lạc của Phụ huynh trên các bảng thông báo công cộng.  
\* \*\*Missing Audit Trail:\*\* Không có bằng chứng hình ảnh/thời gian ghi nhận chính xác thời điểm bàn giao trẻ cho ai.

\#\# 10\. Quy trình TO-BE

\#\#\# Buổi Sáng: Check-in & Điểm danh Lớp học

\* \*\*Step 01:\*\*  
\* \*\*Actor:\*\* Bảo vệ cổng trường / Bus Monitor.  
\* \*\*Action:\*\* Trẻ đến cổng trường (hoặc lên xe bus), Phụ huynh quét Dynamic QR trên App hoặc Kiosk FaceID nhận diện trẻ.  
\* \*\*ERP Function:\*\* \`Student Check-in (Gate/Bus)\`.  
\* \*\*Input:\*\* Biometric/QR Data.  
\* \*\*Output:\*\* Ghi nhận trạng thái \`Campus Checked-in\` \+ Timestamp \+ Photo Capture.  
\* \*\*Business Rule:\*\* Nếu phát hiện trẻ có cảnh báo Y tế (Sốt, Dị ứng nặng), ERP hiển thị Pop-up màu đỏ yêu cầu Nhân viên Y tế tại cổng kiểm tra ngay.  
\* \*\*Status Before:\*\* \`Absent\`.  
\* \*\*Status After:\*\* \`Campus Checked-in\`.  
\* \*\*SLA:\*\* \<= 5 giây/học sinh.  
\* \*\*Notification:\*\* Tự động gửi App Push cho Phụ huynh: \*"Bé \[Tên\] đã đến trường lúc \[Thời gian\]"\*.  
\* \*\*Exception:\*\* Quên mã/Hệ thống lỗi \-\> Bảo vệ tìm kiếm bằng Tên/Mã Student ID trên Kiosk và chụp ảnh xác minh thủ công.

\* \*\*Step 02:\*\*  
\* \*\*Actor:\*\* Giáo viên chủ nhiệm.  
\* \*\*Action:\*\* Giáo viên nhận trẻ tại lớp, mở App Giáo viên xác nhận điểm danh lớp (\`Class Attendance Check\`) và tích chọn trạng thái ăn sáng/sức khỏe ban đầu.  
\* \*\*ERP Function:\*\* \`Classroom Attendance & Daily Meal Confirmation\`.  
\* \*\*Input:\*\* Trạng thái có mặt, Đăng ký ăn sáng (Yes/No), Biểu hiện sức khỏe.  
\* \*\*Output:\*\* Bảng điểm danh lớp hoàn tất.  
\* \*\*Business Rule:\*\* \`BR-SIS-004\`: Đúng 09:00 AM, ERP tự động khóa tính năng chỉnh sửa điểm danh sáng. Toàn bộ số liệu chốt tự động đẩy sang Phân hệ Bếp ăn (\`Kitchen Engine\`) để tính định mức thực phẩm.  
\* \*\*Status Before:\*\* \`Campus Checked-in\`.  
\* \*\*Status After:\*\* \`Class Checked-in\`.  
\* \*\*SLA:\*\* Khóa sổ lúc 09:00 AM.  
\* \*\*Notification:\*\* Bếp trưởng nhận alert tổng hợp suất ăn theo từng khối/lớp.

\* \*\*Step 03:\*\*  
\* \*\*Actor:\*\* ERP System.  
\* \*\*Action:\*\* Hệ thống tự động quét danh sách học sinh vắng mặt không có đơn xin nghỉ phép trên App.  
\* \*\*ERP Function:\*\* \`Unexcused Absence Safeguarding Engine\`.  
\* \*\*Input:\*\* Dữ liệu điểm danh lúc 09:00 AM \+ Dữ liệu Đơn xin nghỉ phép (\`Leave Application\`).  
\* \*\*Output:\*\* Danh sách học sinh vắng mặt bất thường.  
\* \*\*Business Rule:\*\* \`BR-SIS-003\`: Trẻ vắng mặt không lý do quá 09:00 AM sẽ tự động kích hoạt Safeguarding Workflow.  
\* \*\*Status Before:\*\* \`Absent\`.  
\* \*\*Status After:\*\* \`Unexcused Absent Alert\`.  
\* \*\*SLA:\*\* Real-time tại mốc 09:01 AM.  
\* \*\*Notification:\*\* Tự động gửi Push Notification khẩn cấp \+ Gọi SMS tự động tới Phụ huynh và báo cảnh báo đỏ trên App Giáo viên/BGH.

\#\#\# Buổi Chiều: Quản lý Ủy quyền & Check-out Giờ Về

\* \*\*Step 04:\*\*  
\* \*\*Actor:\*\* Phụ huynh / Người giám hộ.  
\* \*\*Action:\*\* (Nếu nhờ người khác đón) Phụ huynh mở Mobile App, tạo đơn "Ủy quyền đón đột xuất" (\`Ad-hoc Pickup Request\`), tải ảnh CCCD/Chân dung người đón và xác thực mã OTP.  
\* \*\*ERP Function:\*\* \`Ad-hoc Authorized Pickup Creation\`.  
\* \*\*Input:\*\* Thông tin người đón, Ảnh, Thời gian đón, Mã OTP Phụ huynh.  
\* \*\*Output:\*\* Mã OTP/QR đón trẻ ngắn hạn (có hiệu lực trong ngày) gửi đến Người được ủy quyền.  
\* \*\*Business Rule:\*\* \`BR-SIS-002\`: Đơn ủy quyền đột xuất phải tạo trước giờ trả trẻ ít nhất 30 phút và không nằm trong danh sách "Blacklist/Chống đón" do tranh chấp pháp lý.  
\* \*\*Status Before:\*\* \`N/A\`.  
\* \*\*Status After:\*\* \`Ad-hoc Pickup Approved\`.  
\* \*\*SLA:\*\* Xử lý tức thì trên App.  
\* \*\*Notification:\*\* Giáo viên chủ nhiệm nhận thông báo có Đơn ủy quyền mới trên App Teacher.

\* \*\*Step 05:\*\*  
\* \*\*Actor:\*\* Bảo vệ cổng trường / Kiosk Cổng.  
\* \*\*Action:\*\* Người đón đến cổng quét QR/FaceID hoặc nhập OTP tại Kiosk Cổng trường.  
\* \*\*ERP Function:\*\* \`Gate Pickup Verification\`.  
\* \*\*Input:\*\* QR Code / FaceID / OTP \+ Hình ảnh thực tế từ Camera Kiosk.  
\* \*\*Output:\*\* Màn hình Kiosk hiển thị khớp/không khớp: Ảnh người đón, Tên người đón, Tên học sinh, Lớp, Ảnh học sinh và Cảnh báo an toàn (nếu có).  
\* \*\*Business Rule:\*\* \`BR-SIS-001\`: Nếu xác thực THẤT BẠI hoặc người đón có cảnh báo vi phạm, Kiosk khoá cổng, báo động âm thanh nhẹ và gửi cảnh báo tới Trưởng BP Bảo vệ.  
\* \*\*Status Before:\*\* \`Class Checked-in\`.  
\* \*\*Status After:\*\* \`Pickup Requested\`.  
\* \*\*SLA:\*\* \<= 10 giây/lượt quét.  
\* \*\*Notification:\*\* Tự động gửi tín hiệu "Bé \[Tên\] có người đón" đến Tablet tại Lớp học của Giáo viên.

\* \*\*Step 06:\*\*  
\* \*\*Actor:\*\* Giáo viên trả trẻ & Bảo vệ cổng.  
\* \*\*Action:\*\* Giáo viên kiểm tra thông tin khớp trên Tablet, bàn giao trẻ cho người đón tại điểm giao nhận, bấm xác nhận "Đã giao trẻ" (\`Confirm Handover\`) trên App. Bảo vệ xác nhận lượt ra tại cổng.  
\* \*\*ERP Function:\*\* \`Final Student Check-out & Handover\`.  
\* \*\*Input:\*\* Chữ ký điện tử/Xác nhận của Giáo viên \+ Camera Cổng trường ghi hình.  
\* \*\*Output:\*\* Nhật ký Check-out hoàn tất (Ghi nhận Người đón, Người giao, Thời gian, Hình ảnh lưu trữ).  
\* \*\*Business Rule:\*\* Học sinh chỉ được chuyển trạng thái \`Checked-out\` khi Giáo viên chủ nhiệm/trợ giảng trực tiếp bấm xác nhận bàn giao trên hệ thống.  
\* \*\*Status Before:\*\* \`Pickup Requested\`.  
\* \*\*Status After:\*\* \`Checked-out (Completed)\`.  
\* \*\*SLA:\*\* \<= 2 phút từ khi quét QR tại cổng đến khi giao trẻ.  
\* \*\*Notification:\*\* Push Notification tới Phụ huynh: \*"Bé \[Tên\] đã được \[Tên người đón\] đón lúc \[Thời gian\]. Cảm ơn Phụ huynh\!"\*.

\#\# 11\. Workflow

\`\`\`  
\[BẮT ĐẦU: Buổi sáng Đón Trẻ\]  
       │  
       ▼  
\[Kiosk Cổng / Bus Monitor Check-in\] ──► (Kiểm tra Y tế / Sốt)  
       │                                     │  
       │                                     ├─► Có sốt ──► \[Cách ly / Báo Y tế\]  
       ▼                                     └─► Bình thường  
\[Giáo viên Điểm danh Lớp trên App (trước 09:00)\]  
       │  
       ├─► Vắng không lý do ──► \[Trigger: Safeguarding Alert (Gọi/SMS tự động)\]  
       │  
       ▼ (Đúng 09:00 AM)  
\[ERP Auto-Lock Attendance ──► Đồng bộ Suất ăn sang Bếp & Kế toán\]  
       │  
       ▼  
\[BẮT ĐẦU: Buổi chiều Trả Trẻ\]  
       │  
       ◇ Phụ huynh trực tiếp đón hay Ủy quyền?  
       ├─ Ủy quyền Đột xuất ──► \[Phụ huynh tạo Ad-hoc Request trên App \+ OTP\]  
       └─ Người đón Cố định ──┐  
                              │  
                              ▼  
               \[Quét QR / FaceID / OTP tại Kiosk Cổng\]  
                              │  
                              ◇ Khớp dữ liệu Authorized Master?  
                              ├─ NO  ──► \[Khóa Cổng \+ Cảnh báo An ninh (Security Alert)\]  
                              └─ YES ──┐  
                                       │  
                                       ▼  
               \[Gửi Tín hiệu Đón Trẻ lên Tablet tại Lớp Học\]  
                                       │  
                                       ▼  
               \[Giáo viên Bàn Giao Trẻ & Bấm "Confirm Handover"\]  
                                       │  
                                       ▼  
               \[ERP Auto Push Notification \+ Lưu Audit Log Hình Ảnh\]  
                                       │  
                                       ▼  
                                 \[KẾT THÚC\]

\`\`\`

\#\# 12\. Business Rules

\* \*\*BR-SIS-001:\*\* Tuyệt đối không giao trẻ cho người không có tên/mặt trong danh sách \`AuthorizedPickupMaster\` hoặc không có mã OTP/QR xác thực Ad-hoc hợp lệ được khởi tạo từ chính tài khoản Phụ huynh chính thức.  
\* \*\*BR-SIS-002:\*\* Đơn ủy quyền đột xuất (\`Ad-hoc Pickup Request\`) chỉ có hiệu lực tối đa trong 12 giờ của ngày tạo, phải đính kèm mặt trước CCCD và ảnh chân dung rõ mặt của người đón.  
\* \*\*BR-SIS-003:\*\* Hệ thống tự động khóa tính năng điểm danh và chốt số liệu suất ăn (\`Attendance Freeze\`) vào đúng \*\*09:00 AM\*\* hàng ngày. Mọi thay đổi điểm danh sau 09:00 AM bắt buộc phải có lý do và được duyệt bởi Hiệu trưởng Cơ sở.  
\* \*\*BR-SIS-004:\*\* Cảnh báo đỏ An toàn (\`Safeguarding Red Alert\`) sẽ tự động bắn về điện thoại Hiệu trưởng và Trưởng BP Bảo vệ nếu học sinh đã check-in tại Cổng/Bus nhưng sau 09:15 AM chưa có mặt tại Lớp học (Phòng ngừa rủi ro bỏ quên trẻ trên xe/trong khuôn viên).  
\* \*\*BR-SIS-005:\*\* Trong trường hợp có quyết định của Tòa án hoặc văn bản pháp lý về việc hạn chế quyền tiếp xúc trẻ của Bố/Mẹ/Người thân, Admin hệ thống phải bật cờ \`Access Blocked Flag\` trên hồ sơ học sinh. Hệ thống sẽ ngay lập tức chặn và báo động nếu tài khoản này cố tình quét mã/check-in.

\#\# 13\. Exception Cases

\* \*\*ERP Mất kết nối Mạng (Offline Mode):\*\* Kiosk Cổng trường và Tablet Giáo viên chuyển sang chế độ \`Local Cache Offline\`. Dữ liệu check-in được lưu tại bộ nhớ cục bộ thiết bị và tự động đồng bộ (Auto-sync) về Cloud ERP ngay khi có mạng trở lại.  
\* \*\*Điện thoại Phụ huynh hết pin / Không có App tại Cổng:\*\* Bảo vệ sử dụng máy quét chuyên dụng quét Thẻ từ Phụ huynh (Physical RFID Card) hoặc nhập Mã số Định danh Phụ huynh \+ Kiểm tra CMND/CCCD bản chính tại chỗ.  
\* \*\*Người đón có dấu hiệu say rượu, mất hành vi dân sự hoặc gây nổ:\*\* Bảo vệ lập tức kích hoạt nút bấm an ninh ẩn (\`Panic Button\`), từ chối giao trẻ, đưa trẻ về phòng Chờ an toàn và mời Ban Giám hiệu cùng Phụ huynh chính thức đến làm việc.  
\* \*\*Học sinh bị sốt/ốm đột xuất trong giờ học:\*\* Giáo viên chuyển trẻ xuống Phòng Y tế. Cán bộ Y tế cập nhật trạng thái \`Medical Room Isolation\` trên ERP, kích hoạt thông báo Phụ huynh đến đón sớm (\`Early Checkout Request\`).

\#\# 14\. Approval Matrix

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |  
| \--- | \--- | \--- | \--- |  
| Đăng ký Người ủy quyền Cố định (Permanent Authorized Person) | App Phụ huynh (OTP) | Ban Giáo vụ / Admin | N/A |  
| Tạo Đơn ủy quyền Đột xuất (Ad-hoc Pickup) trong ngày | App Phụ huynh (OTP) | System Auto Verification | N/A |  
| Điều chỉnh dữ liệu Điểm danh sau giờ chốt (After 09:00 AM) | Giáo viên chủ nhiệm | Hiệu trưởng Cơ sở | N/A |  
| Yêu cầu Chặn quyền đón trẻ (Legal Blockage / Court Order) | Ban Giám hiệu | Legal Officer | System Administrator (Khóa cờ) |

\#\# 15\. Status Lifecycle

\`\`\`  
Absent (Chưa đến)   
  │  
  ├──► Campus/Bus Checked-in (Đã qua cổng/lên xe) ──► Class Checked-in (Đã vào lớp)  
  │                                                           │  
  │                                                           ▼  
  │                                                  Ready for Pickup (Có người gọi đón)  
  │                                                           │  
  │                                                           ▼  
  └──────────────────────────────────────────────────► Checked-out (Đã về \- Completed)

\`\`\`

\#\# 16\. Data Model

\* \*\*Primary Entity:\*\* \`DailyAttendance\`  
\* \`AttendanceID\` (PK, String)  
\* \`StudentID\` (FK, String)  
\* \`ClassID\` (FK, String)  
\* \`Date\` (Date)  
\* \`MorningCheckInTime\` (DateTime), \`MorningGateGateKeeperID\` (FK)  
\* \`ClassCheckInTime\` (DateTime), \`TeacherID\` (FK)  
\* \`MealBreakfast\` (Boolean), \`MealLunch\` (Boolean), \`MealSnack\` (Boolean)  
\* \`CheckOutTime\` (DateTime), \`PickupPersonID\` (FK), \`GateKeeperID\` (FK)  
\* \`AttendanceStatus\` (Enum: Present, Excused\_Absent, Unexcused\_Absent, Early\_Leave)

\* \*\*Related Entities:\*\*  
\* \`AuthorizedPickupPerson\`: \`PickupPersonID\` (PK), \`StudentID\` (FK), \`FullName\`, \`Relationship\`, \`IDCardNumber\`, \`PhotoURL\`, \`IsPermanent\` (Boolean), \`IsActive\` (Boolean), \`BlockFlag\` (Boolean).  
\* \`PickupLog\`: \`LogID\` (PK), \`StudentID\` (FK), \`Timestamp\`, \`CapturedPhotoURL\`, \`VerificationMethod\` (Enum: QR, FaceID, OTP, Manual\_Override), \`Status\` (Enum: Success, Denied).

\#\# 17\. Forms / Documents

\* \`FRM-SIS-010\`: Giấy Đăng ký Ủy quyền Đón trẻ Cố định (Dành cho Phụ huynh đăng ký trực tiếp).  
\* \`FRM-SIS-011\`: Phiếu xác nhận Giao nhận Trẻ Về sớm / Đón khẩn cấp.  
\* \`FRM-SIS-012\`: Biên bản Ghi nhận Sự cố An toàn Đón trả Trẻ (Incident Safeguarding Log).

\#\# 18\. ERP Functional Requirements

\* \*\*FR-SIS-010 (MUST):\*\* Hệ thống phải cung cấp Phân hệ Quản lý Người ủy quyền (\`Authorized Pickup Management\`), cho phép lưu trữ tối đa 05 người đón cố định/học sinh bao gồm hình ảnh chân dung nét cao, số CMND/CCCD và quan hệ nhân thân.  
\* \*\*FR-SIS-011 (MUST):\*\* App Giáo viên phải hiển thị tức thì danh sách ảnh mặt học sinh kèm thông tin dị ứng/y tế và danh sách người được phép đón khi có tín hiệu quét mã tại cổng.  
\* \*\*FR-SIS-012 (MUST):\*\* Tích hợp Thuật toán \`Safeguarding Cross-Check\`: Tự động so sánh dữ liệu Check-in Cổng/Bus với Điểm danh Lớp lúc 09:15 AM. Nếu phát hiện sai lệch (Check-in cổng nhưng không Check-in lớp), hệ thống phải phát còi cảnh báo trên thiết bị BGH.  
\* \*\*FR-SIS-013 (SHOULD):\*\* Tích hợp công nghệ AI FaceID tại Kiosk cổng trường với thời gian nhận diện \< 1 giây và độ chính xác \> 99%.

\#\# 19\. Automation Opportunities

\* \*\*AUTO-SIS-010 (INTEGRATION):\*\* Ngay khi Kiosk cổng trường xác thực đúng Người đón, ERP tự động đẩy thông điệp âm thanh/màn hình lên Tablet lớp học: \*"Bé \[Tên Bé\] \- Lớp \[Tên Lớp\] có \[Quan hệ\] \[Tên Người Đón\] đang đón tại Cổng \[Số Cổng\]"\*.  
\* \*\*AUTO-SIS-011 (RULE ENGINE):\*\* Tự động tính toán tổng số buổi ăn thực tế trong tháng của từng học sinh dựa trên dữ liệu điểm danh đã chốt lúc 09:00 AM, tự động chuyển số liệu sang \`Billing Engine\` để khấu trừ tiền ăn vào kỳ hóa đơn tháng kế tiếp.  
\* \*\*AUTO-SIS-012 (WORKFLOW):\*\* Tự động khởi tạo cuộc gọi IVR (Interactive Voice Response) khẩn cấp tới điện thoại Phụ huynh nếu trẻ vắng mặt không lý do sau 09:15 AM.

\#\# 20\. Notification Matrix

| Event | Recipient | Channel | Timing |  
| \--- | \--- | \--- | \--- |  
| Xác nhận Trẻ đã đến trường (Morning Check-in) | Phụ huynh | App Push | Immediate (Real-time) |  
| Cảnh báo Trẻ Vắng mặt Không lý do (Unexcused Absence) | Phụ huynh & BGH | App Push \+ Calls/SMS | 09:01 AM hàng ngày |  
| Cảnh báo Sai lệch Cổng \- Lớp (Safeguarding Alert) | BGH & Bảo vệ | Loud Sound \+ App Pop-up | 09:15 AM (nếu phát hiện) |  
| Thông báo Có Người quét mã Đón trẻ tại Cổng | Giáo viên chủ nhiệm | App Push (Tablet Lớp) | Immediate khi quét QR/FaceID |  
| Xác nhận Trẻ đã Check-out thành công (Giờ về) | Phụ huynh | App Push \+ Zalo OA | Immediate sau khi Confirm Handover |

\#\# 21\. Permission Matrix (RBAC)

| Role | View Attendance | Mark Attendance | Edit Past Attendance | Manage Authorized Person | Verify Gate Pickup | Approve Ad-hoc Pickup |  
| \--- | \--- | \--- | \--- | \--- | \--- | \--- |  
| Phụ huynh | Own Child | No | No | Full (Own Child) | No | Yes |  
| Giáo viên Chủ nhiệm | Assigned Class | Yes | Read Only | View Only | View Only | View Only |  
| Nhân viên Bảo vệ | All Campus | No | No | View Only | Full | No |  
| Cán bộ Y tế | All Campus | Medical Status | No | View Only | View Only | No |  
| Hiệu trưởng Cơ sở | Full Campus | Yes | Yes (With Reason) | Full | Full | Yes |  
| System Administrator | System-wide | No | Full (Audit Logged) | Full | Full | Override |

\#\# 22\. Audit Trail

Hệ thống bắt buộc ghi lại không thể xóa sửa (Immutable Log) các sự kiện:

\* Nhật ký quét FaceID/QR Code tại cổng: Lưu Timestamp, Tọa độ GPS/ID Kiosk, Ảnh chụp từ Camera Kiosk tại thời điểm quét.  
\* Toàn bộ lịch sử thêm, xóa, sửa thông tin Người ủy quyền đón trẻ (Ai thực hiện, thời gian, IP, thông tin cũ, thông tin mới).  
\* Lịch sử thao tác bấm "Xác nhận Bàn giao Trẻ" của Giáo viên (Teacher ID, Timestamp).  
\* Lịch sử chỉnh sửa điểm danh sau mốc 09:00 AM (Lý do chỉnh sửa, Người phê duyệt).

\#\# 23\. Internal Controls

\* \*\*Dual Verification (Xác minh kép):\*\* Để hoàn tất quy trình trả trẻ, bắt buộc phải có 2 điểm chạm độc lập: Quét xác thực Người đón tại Cổng (Bảo vệ/Kiosk) \+ Bấm xác nhận bàn giao trẻ tại Lớp (Giáo viên).  
\* \*\*Automatic Image Logging:\*\* Mọi lượt Check-in/Check-out đều tự động chụp và lưu vết 1 hình ảnh khoảnh khắc bàn giao thực tế vào cơ sở dữ liệu bảo mật trong 90 ngày.  
\* \*\*Restriction Enforcement:\*\* Hệ thống tự động khóa tính năng cho phép đón nếu tài khoản Người đón bị gắn cờ \`Blocked\` do yêu cầu pháp lý hoặc tranh chấp gia đình.

\#\# 24\. KPI / SLA

| KPI / SLA Description | Formula / Measurement | Target | Owner |  
| \--- | \--- | \--- | \--- |  
| \*\*SLA Xử lý Check-in Cổng trường\*\* | Thời gian từ khi quét FaceID/QR đến khi hiện kết quả | \<= 3 giây/lượt | IT & Bộ phận Bảo vệ |  
| \*\*SLA Trả Trẻ Giờ Về (Check-out)\*\* | Thời gian từ khi Phụ huynh quét mã tại cổng đến khi nhận trẻ | \<= 3 phút/trẻ | Trưởng BP Bảo vệ & GVMN |  
| \*\*Tỷ lệ Điểm danh Đúng Giờ (Chốt 09:00 AM)\*\* | (Số lớp chốt điểm danh đúng 09:00 / Tổng số lớp) \* 100 | 100% | Giáo viên Chủ nhiệm |  
| \*\*Tỷ lệ Sự cố Đón Sai / Nhầm Trẻ\*\* | Số vụ đón nhầm hoặc sai người ủy quyền | \*\*0% (Zero Tolerance)\*\* | Hiệu trưởng Cơ sở |

\#\# 25\. Dashboard / Report

\* \*\*Gate Operations Dashboard (Bảo vệ/BGH):\*\* Số lượng trẻ đã đến trường, Số trẻ đã vào lớp, Số trẻ vắng mặt, Số lượt đang chờ trả tại cổng giờ cao điểm (Real-time Queue Monitor).  
\* \*\*Kitchen & Nutrition Report (Nhà bếp):\*\* Bảng tổng hợp suất ăn sáng, ăn trưa, ăn chiều tự động tính toán từ dữ liệu điểm danh chốt lúc 09:00 AM.  
\* \*\*Safeguarding & Compliance Dashboard (BGH/Board):\*\* Báo cáo nhật ký các trường hợp vắng mặt không lý do, Báo cáo các lượt quét xác thực thất bại tại cổng, Báo cáo lịch sử đổi người ủy quyền.

\#\# 26\. Integration

\* \*\*Phần cứng Kiosk / FaceID Camera / Access Control Gate:\*\* Tích hợp nhận diện sinh trắc học và điều khiển barie/cổng xoay.  
\* \*\*Mobile App (Parent App / Teacher App / Guard App):\*\* Đồng bộ dữ liệu 2 chiều real-time qua WebSocket/Push Notification Service.  
\* \*\*Billing & Fee Management Engine (Module 08/09):\*\* Tự động tính bù trừ/khấu trừ phí ăn dựa trên nhật ký điểm danh thực tế.  
\* \*\*Zalo Official Account / SMS Gateway:\*\* Gửi tin nhắn tự động cảnh báo vắng mặt khẩn cấp và xác nhận check-out.

\#\# 27\. Risks & Controls

| Risk Description | Impact | Probability | Control Activity | Owner |  
| \--- | \--- | \--- | \--- | \--- |  
| \*\*Giao trẻ cho người không hợp pháp (Tranh chấp gia đình)\*\* | Critical | Low | Khóa cờ \`Block Flag\` trên ERP; Bắt buộc xác thực QR/FaceID 2 lớp tại Cổng và Lớp. | Hiệu trưởng & Bảo vệ |  
| \*\*Bỏ quên trẻ trên xe bus hoặc khu vực chung\*\* | Critical | Low | Safeguarding Cross-Check: Cảnh báo đỏ tự động lúc 09:15 AM nếu sai lệch giữa Gate Check-in và Class Check-in. | Trưởng BP Bảo vệ & BGH |  
| \*\*Ủy quyền giả mạo qua điện thoại/tin nhắn rác\*\* | High | Medium | Không chấp nhận ủy quyền qua lời nói/nhắn tin Zalo cá nhân. Bắt buộc tạo Đơn Ad-hoc trên App có OTP Phụ huynh. | Giáo viên & Bảo vệ |  
| \*\*Hệ thống ERP / Wifi Cổng trường bị sập\*\* | Medium | Medium | Chạy chế độ \`Local Offline Cache\` trên Kiosk/Tablet, tự động sync lại khi khôi phục mạng. | IT System Admin |

\#\# 28\. Acceptance Criteria

\* \*\*Given:\*\* Phụ huynh đã tạo thành công Đơn ủy quyền đột xuất cho Ông/Bà đón trẻ trên Mobile App kèm mã OTP.  
\* \*\*When:\*\* Ông/Bà đến cổng trường nhập mã OTP / quét QR tại Kiosk Cổng.  
\* \*\*Then:\*\* ERP kiểm tra mã hợp lệ, hiển thị hình ảnh Ông/Bà lên Kiosk Cổng đồng thời phát tín hiệu "Có người đón" lên Tablet của Giáo viên tại lớp.  
\* \*\*Given:\*\* Học sinh được bảo vệ check-in tại cổng trường lúc 07:30 AM.  
\* \*\*When:\*\* Đến 09:15 AM, Giáo viên chủ nhiệm chưa tích điểm danh cho học sinh này tại lớp (và không có đơn xin nghỉ).  
\* \*\*Then:\*\* ERP kích hoạt còi báo động đỏ trên App của Hiệu trưởng và Trưởng BP Bảo vệ, yêu cầu đi kiểm tra trực tiếp vị trí học sinh.

\#\# 29\. Test Scenarios

1\. \*\*Happy Path Test:\*\* Phụ huynh quét FaceID tại cổng \-\> Tablet lớp nhận thông báo \-\> Giáo viên bấm Confirm Handover \-\> Phụ huynh nhận Push Notification thành công trong vòng 1 phút.  
2\. \*\*Ad-hoc Authorized Pickup Test:\*\* Phụ huynh tạo đơn ủy quyền người lạ có OTP \-\> Người lạ dùng OTP quét tại cổng \-\> Kiểm tra xem Kiosk có hiện chính xác ảnh CCCD người lạ đã tải lên không.  
3\. \*\*Safeguarding Alert Test:\*\* Giả lập trường hợp Check-in Cổng thành công nhưng cố tình KHÔNG điểm danh tại Lớp \-\> Kiểm tra xem lúc 09:15 AM ERP có bắn cảnh báo khẩn cấp không.  
4\. \*\*Blacklist Block Test:\*\* Bật cờ \`Block Flag\` cho một tài khoản Phụ huynh cố tình đón trẻ \-\> Kiểm tra xem Kiosk cổng có báo động đỏ và khóa barie không.  
5\. \*\*Offline Resiliency Test:\*\* Tắt kết nối Internet của Tablet Bảo vệ \-\> Thực hiện điểm danh thủ công \-\> Bật lại Internet \-\> Kiểm tra xem dữ liệu có tự động sync về ERP mà không mất mát không.

\#\# 30\. ERP Implementation Notes

\* \*\*Master Data Migration:\*\* Import danh sách người ủy quyền cố định từ file hồ sơ nhập học cũ; chụp ảnh avatar chuẩn cho toàn bộ học sinh và phụ huynh.  
\* \*\*Hardware Integration:\*\* Cấu hình SDK/API kết nối giữa Kiosk nhận diện khuôn mặt cổng trường với ERP Backend via Secure WebSockets.  
\* \*\*Training & Change Management:\*\* Tập huấn nghiêm ngặt cho Bộ phận Bảo vệ quy trình từ chối giao trẻ nếu không có xác thực ERP; hướng dẫn Phụ huynh thao tác tạo Đơn ủy quyền trên Mobile App trong tuần đầu tự động hóa.

\---

\#\# BÁO CÁO KẾT QUẢ VÀ LỘ TRÌNH ĐỀ XUẤT TIẾP THEO

Đã hoàn thành xuất sắc việc biên soạn \*\*SOP-SIS-001: Quy trình Đón Trả trẻ An toàn và Điểm danh Hàng ngày\*\* tuân thủ đầy đủ 30 mục chuẩn mực cao nhất dành cho hệ thống ERP Mầm non Doanh nghiệp.

# Thẻ 4

\#\# CHỦẨN HÓA NGUYÊN TẮC BỔ BUNG: QUY TẮC QUẢN LÝ VÀ ĐỊNH DẠNG FILE MARKDOWN (.MD)

Để đảm bảo tính nhất quán, khả năng tái sử dụng và đồng bộ hóa trực tiếp vào các kho tri thức quản trị (như Git, Notion, Wiki doanh nghiệp hoặc tài liệu kiến trúc ERP), toàn bộ các SOP và tài liệu phân tích hệ thống từ bước này sẽ tuân thủ \*\*Quy tắc Quản lý File \`.md\*\*\`:

\* \*\*Rule MD-01 (Chuẩn cấu trúc File):\*\* Mọi văn bản SOP ban hành đều phải được trình bày hoàn chỉnh bằng chuẩn Markdown thuần (.md), bao gồm đầy đủ 30 mục chuẩn hóa, bảng ma trận (Tables), biểu đồ Mermaid/Workflow, khối mã logic (Code/Formula blocks) và thẻ trạng thái.  
\* \*\*Rule MD-02 (Tên file chuẩn hóa):\*\* Tên file Markdown được đặt theo định dạng chuẩn: \`SOP-\[DOMAIN\]-\[NUMBER\]\_\[TEN\_QUY\_TRINH\_KHONG\_DAU\].md\` (Ví dụ: \`SOP-FIN-001\_Tu\_Dong\_Hoa\_Lap\_Hoa\_Don\_Hoc\_Phi\_Va\_Khau\_Tru\_Tien\_An.md\`).  
\* \*\*Rule MD-03 (Khả năng Xuất & Upload):\*\* File Markdown được tạo ra sẵn sàng để lưu trữ cục bộ hoặc upload lên Google Drive / Hệ thống lưu trữ tài liệu của doanh nghiệp.

\---

\# SOP-FIN-001 — QUY TRÌNH TỰ ĐỘNG HÓA LẬP HÓA ĐƠN HỌC PHÍ, ĐỐI SOÁT CÔNG NỢ VÀ KHẤU TRỪ PHÍ ĂN/DỊCH VỤ THEO ĐIỂM DANH

\#\# 1\. Thông tin tài liệu

\* \*\*SOP ID:\*\* SOP-FIN-001  
\* \*\*Tên SOP:\*\* Quy trình Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ và Khấu trừ Phí ăn/Dịch vụ theo Điểm danh  
\* \*\*Module ERP:\*\* Tuition & Fee Management (08), Billing/Invoice/Collection (09), Scholarship/Discount (10), Debt & AR (11), Finance Integration (55)  
\* \*\*Process Owner:\*\* Kế toán trưởng (Chief Accountant)  
\* \*\*Department:\*\* Phòng Kế toán \- Tài chính  
\* \*\*Phiên bản:\*\* v1.0  
\* \*\*Trạng thái:\*\* Ready for Baseline  
\* \*\*Ngày hiệu lực:\*\* 01/09/2026  
\* \*\*Người soạn:\*\* ERP Senior Business Analyst & Financial Architect  
\* \*\*Người kiểm tra:\*\* Enterprise Architect & CTO  
\* \*\*Người phê duyệt:\*\* Giám đốc Tài chính (CFO) / Board  
\* \*\*Chu kỳ review:\*\* 06 tháng/lần

\#\# 2\. Mục đích

Chuẩn hóa và tự động hóa toàn bộ chu trình tính học phí định kỳ, tự động đối soát dữ liệu điểm danh thực tế từ \`SOP-SIS-001\` để tính khoản tiền ăn/dịch vụ hoàn bù (Meal Fee & Service Credit Deduction), áp dụng chính sách ưu đãi/học bổng, phát hành Thông báo Phí (Fee Notice) kèm VietQR động, gạch nợ tự động qua Ngân hàng, xuất hóa đơn điện tử và ghi nhận sổ cái kế toán; loại bỏ hoàn toàn các thao tác tính toán thủ công bằng Excel và rủi ro thất thoát doanh thu.

\#\# 3\. Phạm vi áp dụng

\* \*\*Cơ sở:\*\* Áp dụng trên toàn bộ các cơ sở thuộc hệ thống trường mầm non.  
\* \*\*Phòng ban:\*\* Phòng Kế toán, Bộ phận Thu ngân, Phòng Tuyển sinh, Ban Giáo vụ, Ban Giám hiệu.  
\* \*\*Đối tượng:\*\* Toàn bộ học sinh mầm non đang theo học (\`Active/Enrolled\`), Phụ huynh/Người giám hộ.  
\* \*\*Trường hợp không áp dụng:\*\* Các khoản thu sự kiện/hoạt động dã ngoại ngoài khung biểu phí niêm yết (áp dụng \`SOP-FIN-004: Thu phí Hoạt động Ngoại khóa & Dã ngoại\`).

\#\# 4\. Thuật ngữ và định nghĩa

\* \*\*Billing Audit Batch (Đợt tính phí):\*\* Tập hợp toàn bộ dữ liệu tính toán công nợ học phí và các khoản dịch vụ của tất cả học sinh trong một kỳ thu phí (tháng/kỳ/năm).  
\* \*\*Meal Credit Deduction (Khấu trừ bù tiền ăn):\*\* Khoản tiền ăn được hoàn trả hoặc trừ lùi vào kỳ hóa đơn tiếp theo dựa trên số buổi nghỉ học có phép hợp lệ của trẻ trong tháng trước.  
\* \*\*Dynamic VietQR / Webhook:\*\* Mã QR thanh toán ngân hàng chứa chính xác số tiền và mã định danh hóa đơn, tự động kích hoạt phản hồi tín hiệu gạch nợ tức thì về ERP khi Phụ huynh chuyển khoản thành công.  
\* \*\*Auto-Reconciliation (Gạch nợ tự động):\*\* Khả năng ERP tự động khớp đúng giao dịch ngân hàng với hóa đơn công nợ của học sinh mà không cần kế toán thao tác thủ công.  
\* \*\*Unearned Revenue (Doanh thu chưa thực hiện):\*\* Khoản tiền học phí/dịch vụ phụ huynh đóng trước cho cả kỳ/năm được treo trên tài khoản kế toán 3387 và phân bổ dần vào doanh thu theo từng tháng.

\#\# 5\. Vai trò và trách nhiệm (RACI)

| Activity | Responsible | Accountable | Consulted | Informed |  
| \--- | \--- | \--- | \--- | \--- |  
| Cấu hình Biểu phí & Chính sách Khấu trừ/Discount | Kế toán Phí | Kế toán trưởng | Admission / BGH | System Admin |  
| Chốt Dữ liệu Điểm danh & Đơn Xin Nghỉ Phép | Giáo viên chủ nhiệm | Ban Giáo vụ / BGH | Y tế học đường | Kế toán Phí |  
| Chạy Engine Tính Phí & Kiểm tra Billing Batch | Kế toán Phí | Kế toán trưởng | ERP System | Admission Officer |  
| Phê duyệt Đợt Phí & Phát hành Thông báo Phí | Kế toán trưởng | CFO / Hiệu trưởng | Legal / IT | Phụ huynh |  
| Đối soát Gạch nợ & Xuất Hóa đơn Điện tử | Kế toán Phí / Thu ngân | Kế toán trưởng | Ngân hàng / E-Invoice | Phụ huynh / BGH |

\> \*Ghi chú: Việc phát hành hóa đơn điện tử, quản lý doanh thu và hạch toán kế toán cần kiểm tra/đối chiếu quy định hiện hành (Nghị định 123/2020/NĐ-CP, Thông tư 78/2021/TT-BTC) trước khi áp dụng chính thức.\*

\#\# 6\. Điều kiện đầu vào

\* \*\*Master Data:\*\* Khung Biểu phí (\`FeeStructureMaster\`), Danh mục Chính sách Giảm giá (\`DiscountPolicy\`), Danh mục Tiền ăn (\`MealFeeMaster\`), Tài khoản Ngân hàng doanh nghiệp (\`VirtualAccountMaster\`).  
\* \*\*Dữ liệu Điểm danh:\*\* Nhật ký điểm danh tháng trước đã được chốt và khóa sổ theo \`SOP-SIS-001\`.  
\* \*\*Hồ sơ Đã duyệt:\*\* Đơn xin nghỉ phép hợp lệ (\`LeaveApplication\`), Quyết định Miễn giảm/Học bổng (\`DiscountApproval\`) còn hiệu lực.

\#\# 7\. Trigger

\* \*\*Lịch định kỳ:\*\* Đúng 00:00 AM ngày \*\*25 hàng tháng\*\* (hoặc ngày cấu hình chốt phí kỳ tiếp theo), hệ thống ERP tự động kích hoạt tiến trình \`Monthly Billing Generation Job\`.

\#\# 8\. Quy trình AS-IS

\* Cuối tháng, kế toán xuất file Excel điểm danh từ app riêng hoặc nhận sổ tay từ giáo viên.  
\* Kế toán dùng công cụ Excel đếm số buổi nghỉ học có phép của từng học sinh, nhân với đơn giá tiền ăn để tính số tiền hoàn trả.  
\* Kế toán lập file Excel danh sách học phí tháng mới, cộng trừ tiền hoàn ăn, áp dụng mã giảm giá bằng tay.  
\* Tạo file PDF thông báo phí riêng lẻ và gửi qua Email hoặc tin nhắn Zalo cá nhân cho từng phụ huynh.  
\* Phụ huynh chuyển khoản ngân hàng tự do (nhiều người ghi sai tên bé, sai lớp hoặc không ghi nội dung).  
\* Kế toán tải file sao kê ngân hàng (Bank Statement) hàng ngày, ngồi dò từng dòng tiền vào để gạch nợ thủ công trên sổ sách.  
\* \*\*Hệ quả:\*\* Mất từ 5–7 ngày làm việc/tháng của phòng Kế toán; sai lệch tiền hoàn ăn gây khiếu nại gay gắt từ phụ huynh; đọng công nợ kéo dài do thiếu công cụ nhắc nợ tự động; rủi ro gian lận chiết khấu.

\#\# 9\. Pain Points / Risk

\* \*\*Human Error:\*\* Nhập sai số ngày nghỉ có phép, áp sai đơn giá ăn hoặc áp nhầm chính sách chiết khấu dẫn đến thất thoát hoặc tính sai tiền.  
\* \*\*Bottleneck:\*\* Tắc nghẽn đối soát ngân hàng giờ cao điểm (từ ngày 01 đến ngày 05 hàng tháng) do phải dò thủ công hàng ngàn giao dịch chuyển khoản.  
\* \*\*Fraud Risk:\*\* Kế toán hoặc nhân viên thu ngân tự ý sửa số tiền trên thông báo phí để thu tiền mặt hoặc nhận chuyển khoản cá nhân.  
\* \*\*Missing Audit Trail:\*\* Không vết lưu lịch sử vì sao học sinh A được giảm 10% hay vì sao học sinh B được hoàn 5 ngày tiền ăn.  
\* \*\*Compliance Risk:\*\* Chậm trễ xuất hóa đơn điện tử theo quy định tài chính do thiếu tích hợp tự động với nhà cung cấp E-Invoice.

\#\# 10\. Quy trình TO-BE

\#\#\# Giai đoạn 1: Khấu trừ Bù Tiền ăn & Tính Phí Tự động (Billing Calculation)

\* \*\*Step 01:\*\*  
\* \*\*Actor:\*\* ERP System (\`Automation Job\`).  
\* \*\*Action:\*\* Hệ thống tự động quét và tổng hợp toàn bộ nhật ký điểm danh từ \`SOP-SIS-001\` và các Đơn xin nghỉ phép hợp lệ trong kỳ (từ ngày 21 tháng trước đến ngày 20 tháng này).  
\* \*\*ERP Function:\*\* \`Attendance & Meal Credit Consolidator\`.  
\* \*\*Input:\*\* Dữ liệu \`DailyAttendance\`, \`LeaveApplication\` đã approved.  
\* \*\*Output:\*\* Bảng tổng hợp số buổi ăn thực tế và số buổi ăn được hoàn (\`Eligible Meal Credit Days\`).  
\* \*\*Business Rule:\*\* \`BR-FIN-001\`: Chỉ các ngày nghỉ học có Đơn xin nghỉ phép hợp lệ được duyệt trên hệ thống trước 08:00 AM của ngày nghỉ mới được tính hoàn tiền ăn.  
\* \*\*Status Before:\*\* \`Pending Billing\`.  
\* \*\*Status After:\*\* \`Meal Credit Calculated\`.  
\* \*\*SLA:\*\* Tự động hoàn tất trong 15 phút.  
\* \*\*Notification:\*\* Kế toán Phí nhận thông báo \`Meal Credit Job Completed\` trên Dashboard.

\* \*\*Step 02:\*\*  
\* \*\*Actor:\*\* ERP System (\`Billing Engine\`).  
\* \*\*Action:\*\* Hệ thống tự động chạy công thức tính toán tài chính cho từng học sinh: \`Tổng Phí Kỳ Mới \= (Học phí niêm yết \+ Phí Dịch vụ \+ Phí Xe Bus) \- (Giảm giá/Học bổng được duyệt) \- (Số buổi ăn hoàn \* Đơn giá ăn) \+ (Nợ cũ chưa trả / Lãi chậm nộp nếu có)\`.  
\* \*\*ERP Function:\*\* \`Fee Calculation & Discount Engine\`.  
\* \*\*Input:\*\* Biểu phí Master, Khấu trừ tiền ăn (Step 01), Cờ ưu đãi \`DiscountMaster\`, Dư nợ cũ \`StudentLedger\`.  
\* \*\*Output:\*\* Dự thảo Đợt Phí (\`Draft Billing Audit Batch\`).  
\* \*\*Business Rule:\*\* \`BR-FIN-003\`: Chiết khấu tự động xếp chồng theo thứ tự ưu tiên cấu hình (Sibling Discount \-\> Early Bird \-\> Staff Discount). Không vượt quá trần chiết khấu tối đa cho phép.  
\* \*\*Status Before:\*\* \`Meal Credit Calculated\`.  
\* \*\*Status After:\*\* \`Draft Billing Batch Created\`.  
\* \*\*SLA:\*\* \<= 30 phút cho 5,000 học sinh.  
\* \*\*Notification:\*\* N/A.

\#\#\# Giai đoạn 2: Thẩm định, Phê duyệt & Phát hành Thông báo Phí (Approval & Issuance)

\* \*\*Step 03:\*\*  
\* \*\*Actor:\*\* Kế toán Phí.  
\* \*\*Action:\*\* Kế toán Phí mở màn hình \`Billing Audit Batch\`, chạy công cụ kiểm tra bất thường tự động (\`Anomaly Detector\`: cảnh báo số tiền âm, chiết khấu \> 50%, tiền ăn hoàn bất thường) và nhấn "Gửi Phê duyệt".  
\* \*\*ERP Function:\*\* \`Billing Audit & Exception Checker\`.  
\* \*\*Input:\*\* Draft Billing Batch.  
\* \*\*Output:\*\* Batch trình duyệt (\`Submitted Billing Batch\`).  
\* \*\*Business Rule:\*\* Nếu phát hiện khoản thu bị âm hoặc chiết khấu ngoại lệ chưa có phép, ERP chặn không cho Submit.  
\* \*\*Status Before:\*\* \`Draft Billing Batch Created\`.  
\* \*\*Status After:\*\* \`Submitted for Approval\`.  
\* \*\*SLA:\*\* Max 4 giờ làm việc.  
\* \*\*Notification:\*\* Alert gửi tới Kế toán trưởng qua Mobile App/ERP Desktop.

\* \*\*Step 04:\*\*  
\* \*\*Actor:\*\* Kế toán trưởng / CFO.  
\* \*\*Action:\*\* Kế toán trưởng kiểm tra tổng quan Báo cáo Đợt Phí (Tổng doanh thu dự kiến, Tổng tiền hoàn ăn, Tổng tiền chiết khấu), duyệt Đợt Phí trên ERP.  
\* \*\*ERP Function:\*\* \`Billing Batch Approval Workflow\`.  
\* \*\*Input:\*\* Submitted Billing Batch.  
\* \*\*Output:\*\* Approved Billing Batch.  
\* \*\*Business Rule:\*\* Đợt Phí sau khi Approved sẽ bị khóa cứng (Frozen), không ai có quyền chỉnh sửa công thức hoặc số tiền trừ khi có yêu cầu Hủy đợt thu từ CFO.  
\* \*\*Status Before:\*\* \`Submitted for Approval\`.  
\* \*\*Status After:\*\* \`Approved & Ready to Issue\`.  
\* \*\*SLA:\*\* Max 2 giờ làm việc.  
\* \*\*Notification:\*\* Kế toán Phí nhận thông báo Đợt phí đã được phê duyệt.

\* \*\*Step 05:\*\*  
\* \*\*Actor:\*\* ERP System (\`Publishing Engine\`).  
\* \*\*Action:\*\* ERP tự động khởi tạo Thông báo Phí điện tử (\`Electronic Fee Notice\`) cho từng học sinh, tích hợp Mã VietQR Động (chứa chính xác ID Hóa đơn và Số tiền cần trả) và gửi đa kênh tới Phụ huynh.  
\* \*\*ERP Function:\*\* \`Fee Notice Dispatcher & Dynamic QR Generator\`.  
\* \*\*Input:\*\* Approved Billing Batch \+ Payment Gateway API.  
\* \*\*Output:\*\* Thông báo phí xuất bản trên Mobile App Phụ huynh, Zalo OA và Email.  
\* \*\*Business Rule:\*\* \`BR-FIN-002\`: Mã QR tạo ra bắt buộc là Dynamic VietQR chuẩn NAPAS247 có gắn \`InvoiceRefID\` độc nhất.  
\* \*\*Status Before:\*\* \`Approved & Ready to Issue\`.  
\* \*\*Status After:\*\* \`Issued / Pending Payment\`.  
\* \*\*SLA:\*\* Tự động gửi hoàn tất trong 1 giờ.  
\* \*\*Notification:\*\* Mobile App Push \+ Zalo OA gửi trực tiếp tới Phụ huynh: \*"Thông báo học phí tháng \[T\] của bé \[Tên\] đã sẵn sàng. Hạn thanh toán: \[Ngày\]"\*.

\#\#\# Giai đoạn 3: Thanh toán, Gạch nợ Tự động & Xuất Hóa đơn (Collection & Reconciliation)

\* \*\*Step 06:\*\*  
\* \*\*Actor:\*\* Phụ huynh & Ngân hàng / Cổng thanh toán.  
\* \*\*Action:\*\* Phụ huynh mở App Ngân hàng quét mã VietQR trên Thông báo Phí và xác nhận chuyển khoản.  
\* \*\*ERP Function:\*\* \`Real-time Bank Webhook Listener\`.  
\* \*\*Input:\*\* Tín hiệu Webhook biến động dư nợ từ Ngân hàng / Payment Gateway.  
\* \*\*Output:\*\* Chứng từ Gạch nợ Tự động (\`Auto-Reconciled Receipt Voucher\`).  
\* \*\*Business Rule:\*\* \`BR-FIN-004\`: Ngay khi nhận Webhook khớp mã \`InvoiceRefID\`, ERP tự động gạch nợ công nợ học sinh trong vòng 3 giây và chuyển trạng thái Hóa đơn sang \`Paid\`.  
\* \*\*Status Before:\*\* \`Issued / Pending Payment\`.  
\* \*\*Status After:\*\* \`Paid / Fully Reconciled\`.  
\* \*\*SLA:\*\* Real-time (\<= 3 giây).  
\* \*\*Notification:\*\* App Push lập tức cho Phụ huynh: \*"Trường \[Tên Trường\] đã nhận thành công số tiền \[Số tiền\]. Cảm ơn Phụ huynh\!"\*.

\* \*\*Step 07:\*\*  
\* \*\*Actor:\*\* ERP System (\`E-Invoice & GL Integration\`).  
\* \*\*Action:\*\* Hệ thống tự động truyền dữ liệu giao dịch đã thanh toán sang Phần mềm Hóa đơn Điện tử (MInvoice/VNPT/Viettel) để xuất Hóa đơn Điện tử chính thức và tự động hạch toán Nợ/Có vào Sổ cái Kế toán (\`General Ledger\`).  
\* \*\*ERP Function:\*\* \`E-Invoice Auto-Issuer & Ledger Posting\`.  
\* \*\*Input:\*\* Paid Fee Notice Data.  
\* \*\*Output:\*\* Hóa đơn Điện tử có mã Cơ quan Thuế \+ Bút toán Kế toán (Nợ TK 112 / Có TK 131, 3387, 511).  
\* \*\*Business Rule:\*\* Tự động phân bổ Doanh thu chưa thực hiện (TK 3387\) sang Doanh thu thực hiện (TK 511\) theo từng tháng học thực tế.  
\* \*\*Status Before:\*\* \`Paid / Fully Reconciled\`.  
\* \*\*Status After:\*\* \`Invoiced & GL Posted\`.  
\* \*\*SLA:\*\* Hoàn tất trong ngày.  
\* \*\*Notification:\*\* Link Hóa đơn điện tử gửi tự động qua Email Phụ huynh.

\#\# 11\. Workflow

\`\`\`  
\[BẮT ĐẦU: 00:00 AM Ngày 25 Hàng Tháng\]  
       │  
       ▼  
\[ERP Auto Job: Quét Nhật ký Điểm danh & Đơn Nghỉ phép (SOP-SIS-001)\]  
       │  
       ▼  
\[ERP Rule Engine: Tính Tiền Ăn Bù \+ Áp Dụng Discount \+ Khai Báo Nợ Cũ\]  
       │  
       ▼  
\[Tạo Dự Thảo Đợt Phí (Draft Billing Audit Batch)\]  
       │  
       ▼  
\[Kế Toán Phí: Kiểm Tra Cảnh Báo Anomaly Detector ──► Bấm Trình Duyệt\]  
       │  
       ▼  
\[Kế Toán Trưởng / CFO: Phê Duyệt Đợt Phí (Approval Workflow)\]  
       │  
       ├─► (Từ chối / Rejected) ──► \[Kế Toán Phí Chỉnh Sửa / Giải Trình\]  
       │  
       ▼ (Phê duyệt / Approved)  
\[ERP Auto: Khóa Đợt Phí ──► Sinh Dynamic VietQR ──► Phát Hành Phí Đa Kênh\]  
       │  
       ▼  
\[Phụ Huynh Quét Mã VietQR Thanh Toán Qua Bank App\]  
       │  
       ▼  
\[Bank Webhook Trả Phản Hồi Real-time\]  
       │  
       ◇ Khớp InvoiceRefID?  
       ├─ YES ──► \[ERP Auto-Reconcile ──► Đổi Trạng Thái "PAID" ──► Push App Success\]  
       └─ NO  ──► \[Chuyển Vào Unallocated Cash Pool ──► Kế Toán Dò Manual Matching\]  
       │  
       ▼  
\[ERP Auto: Xuất Hóa Đơn Điện Tử (E-Invoice) ──► Hạch Toán Sổ Cái Kế Toán (GL)\]  
       │  
       ▼  
  \[KẾT THÚC\]

\`\`\`

\#\# 12\. Business Rules

\* \*\*BR-FIN-001:\*\* Khoản tiền ăn chỉ được tính hoàn bù (\`Meal Credit Deduction\`) cho các ngày trẻ nghỉ học có Đơn xin nghỉ phép hợp lệ được gửi và phê duyệt trên ERP trước \*\*08:00 AM\*\* của ngày nghỉ đó. Nghỉ học không phép hoặc báo sau 08:00 AM sẽ không được hoàn bù tiền ăn của ngày đó.  
\* \*\*BR-FIN-002:\*\* Mọi Thông báo Phí phát hành bắt buộc phải gắn mã \*\*Dynamic VietQR\*\*. Tuyệt đối không sử dụng mã QR Tĩnh (Static QR) của tài khoản cá nhân hoặc tài khoản chung không có mã định danh giao dịch.  
\* \*\*BR-FIN-003:\*\* Ma trận Thứ tự Áp dụng Ưu đãi (\`Discount Stacking Order\`):  
1\. Chiết khấu Thanh toán sớm (Early Bird) hoặc Chiết khấu Thanh toán dài hạn (Theo Kỳ/Năm).  
2\. Chiết khấu Anh Chị Em ruột (Sibling Discount).  
3\. Học bổng Khuyến học / Ưu đãi Đặc biệt từ Board.  
\*Tổng mức chiết khấu gộp không vượt quá trần cấu hình tối đa (Ví dụ: Max 30% tổng học phí), trừ khi có Quyết định Đặc xá do Chủ tịch Board phê duyệt.\*

\* \*\*BR-FIN-004:\*\* Thứ tự Ưu tiên Gạch Nợ (\`Payment Allocation Priority\`): Khi Phụ huynh thanh toán, tiền sẽ tự động được ưu tiên gạch nợ theo thứ tự:  
1\. Công nợ tồn cũ chưa trả (Arrears / Past Due Debt).  
2\. Phí Bắt buộc (Phí Cơ sở vật chất, Phí Đồng phục, Sách vở).  
3\. Phí Dịch vụ (Phí Xe đưa đón, Phí Trông muộn).  
4\. Phí Tiền ăn.  
5\. Học phí kỳ mới.

\* \*\*BR-FIN-005:\*\* Cảnh báo & Tính Lãi Chậm Nộp (\`Late Payment Rule\`): Nếu sau ngày Hạn chót Thanh toán (\`Due Date\`, mặc định là ngày 05 hàng tháng) mà Phụ huynh chưa thanh toán, ERP tự động gửi tin nhắn nhắc nợ ngày D+1, D+3, D+5 và tự động áp dụng Phí phạt chậm nộp (nếu được cấu hình trong Hợp đồng).

\#\# 13\. Exception Cases

\* \*\*Phụ huynh chuyển khoản thừa hoặc thiếu tiền:\*\*  
\* \*Thừa tiền:\* ERP tự động gạch đủ nợ của hóa đơn hiện tại, số tiền thừa được hạch toán vào tài khoản \`Parent Advance Deposit\` (Tiền Phụ huynh gửi dư) và tự động trừ lùi vào hóa đơn tháng tiếp theo.  
\* \*Thiếu tiền:\* ERP gạch nợ một phần theo thứ tự ưu tiên \`BR-FIN-004\`, chuyển trạng thái hóa đơn sang \`Partial Paid\`, hiển thị số dư nợ còn lại trên App Phụ huynh và gửi thông báo nhắc đóng phần tiền thiếu.

\* \*\*Chuyển khoản sai nội dung (Không khớp InvoiceRefID):\*\* Dòng tiền vẫn về tài khoản ngân hàng trường nhưng ERP không thể gạch nợ tự động. Hệ thống đưa giao dịch này vào danh sách \`Unallocated Cash Pool\`. Kế toán nhận Alert và dùng màn hình \`Manual Matching\` để khớp thủ công bằng chứng từ sao kê.  
\* \*\*Học sinh Rút học / Chuyển trường giữa kỳ (Withdrawal Settlement):\*\* Kế toán kích hoạt \`SOP-FIN-005: Quy trình Quyết toán & Hoàn phí khi Rút học\`. ERP tự động tính toán số ngày thực tế đã học, thu hồi tiền ăn chưa dùng, tính phí phạt hủy hợp đồng (nếu có) và khởi tạo \`Payment Voucher\` hoàn tiền.  
\* \*\*Cổng Ngân hàng / Ngân hàng bảo trì Webhook:\*\* ERP lưu nhật ký các giao dịch chờ xử lý trong queue. Ngay khi Webhook hoạt động trở lại, hệ thống chạy tiến trình \`Queue Reconciliation\` để gạch nợ bù, không làm mất giao dịch.

\#\# 14\. Approval Matrix

| Điều kiện Phê duyệt (Scenario) | Level 1 Approval | Level 2 Approval | Level 3 Approval |  
| \--- | \--- | \--- | \--- |  
| Phát hành Đợt Phí Hàng Tháng Chuẩn (Standard Billing Batch) | Kế toán Phí (Check) | Kế toán trưởng | N/A |  
| Điều chỉnh/Miễn giảm Phí Ngoại lệ cho 1 Học sinh (\<= 2.000.000 VNĐ) | Kế toán trưởng | Hiệu trưởng Cơ sở | N/A |  
| Miễn giảm Phí Ngoại lệ / Học bổng Đặc biệt (\> 2.000.000 VNĐ) | Kế toán trưởng | CFO | Chủ đầu tư / Board |  
| Hủy toàn bộ Đợt Phí đã phát hành (Cancel Issued Billing Batch) | Kế toán trưởng | CFO | Giám đốc Điều hành (CEO) |

\#\# 15\. Status Lifecycle

\`\`\`  
Draft Batch ──► Submitted ──► Approved ──► Issued (Pending Payment) ──► Partial Paid ──► Paid (Fully Reconciled) ──► Invoiced (E-Invoice Issued)  
  │                                           │  
  └─────────────► Cancelled                   └─────────────► Overdue (Chậm nộp) ──► Bad Debt (Nợ xấu)

\`\`\`

\#\# 16\. Data Model

\* \*\*Primary Entity:\*\* \`FeeInvoice\`  
\* \`InvoiceID\` (PK, String, Unique)  
\* \`StudentID\` (FK, String), \`CampusID\` (FK, String)  
\* \`BillingPeriod\` (String, e.g., "2026-09")  
\* \`TuitionAmount\` (Decimal), \`MealFeeAmount\` (Decimal), \`ServiceFeeAmount\` (Decimal)  
\* \`MealCreditDeduction\` (Decimal), \`TotalDiscountAmount\` (Decimal)  
\* \`TotalPayable\` (Decimal), \`PaidAmount\` (Decimal), \`BalanceDue\` (Decimal)  
\* \`DueDate\` (Date), \`InvoiceStatus\` (Enum: Draft, Issued, Partial\_Paid, Paid, Overdue, Cancelled)  
\* \`DynamicQRCodeURL\` (String), \`PaymentRefCode\` (String, Unique)

\* \*\*Related Entities:\*\*  
\* \`InvoiceDetail\`: \`DetailID\` (PK), \`InvoiceID\` (FK), \`FeeItemCode\` (FK), \`Description\`, \`UnitPrice\`, \`Quantity\`, \`LineTotal\`.  
\* \`PaymentTransaction\`: \`TransactionID\` (PK), \`InvoiceID\` (FK), \`BankTransID\` (String), \`Amount\`, \`PaymentDate\` (DateTime), \`PaymentMethod\` (Enum: VietQR, CreditCard, Cash, BankTransfer), \`ReconciliationStatus\` (Enum: Auto, Manual, Unallocated).  
\* \`MealCreditLog\`: \`CreditLogID\` (PK), \`StudentID\` (FK), \`BillingPeriod\` (String), \`AbsenceDaysCount\` (Integer), \`DailyMealRate\` (Decimal), \`TotalCreditAmount\` (Decimal).

\#\# 17\. Forms / Documents

\* \`FRM-FIN-001\`: Thông báo Phí Điện tử (Electronic Fee Notice / Tuition Statement).  
\* \`FRM-FIN-002\`: Bảng tổng hợp Đợt Phí & Khấu trừ Tiền ăn (Billing Audit Summary Report).  
\* \`FRM-FIN-003\`: Phiếu thu Tiền mặt / Biên nhận Thanh toán Điện tử (Payment Receipt).  
\* \`FRM-FIN-004\`: Hóa đơn Giá trị Gia tăng Điện tử (E-VAT Invoice \- Tích hợp MInvoice/VNPT).

\#\# 18\. ERP Functional Requirements

\* \*\*FR-FIN-001 (MUST):\*\* Hệ thống phải tích hợp \`Attendance-to-Billing Engine\` tự động truy xuất dữ liệu điểm danh chốt từ Module 18 & 19 để tính toán chính xác số tiền hoàn ăn theo công thức cấu hình mà không cần export/import Excel.  
\* \*\*FR-FIN-002 (MUST):\*\* Tích hợp giải pháp \*\*Dynamic VietQR / Virtual Account API\*\* cho phép sinh mã QR thanh toán thông minh cho từng hóa đơn và nhận tín hiệu Webhook gạch nợ tức thì.  
\* \*\*FR-FIN-003 (MUST):\*\* Hệ thống phải cung cấp công cụ \`Anomaly Detection\` tự động phát hiện và cảnh báo các hóa đơn có số tiền bất thường (Số tiền âm, giảm giá vượt trần, hoàn tiền ăn \> 15 ngày) trước khi gửi duyệt đợt phí.  
\* \*\*FR-FIN-004 (SHOULD):\*\* Hệ thống tích hợp trực tiếp API với Phần mềm Hóa đơn Điện tử để tự động xuất hóa đơn có mã Thuế ngay sau khi thanh toán thành công.  
\* \*\*FR-FIN-005 (COULD):\*\* Cung cấp tính năng \`Auto-Debit / Periodic Charge\` cho phép phụ huynh đăng ký liên kết ví/thẻ ngân hàng để tự động trích nợ tiền học phí hàng tháng.

\#\# 19\. Automation Opportunities

\* \*\*AUTO-FIN-001 (RULE ENGINE):\*\* Tự động tính toán công nợ, trừ lùi tiền ăn nghỉ phép, áp dụng ma trận học bổng/giảm giá và phát hành Thông báo phí vào mốc thời gian cố định hàng tháng.  
\* \*\*AUTO-FIN-002 (INTEGRATION):\*\* Tự động nhận Webhook ngân hàng, gạch nợ hóa đơn, chuyển trạng thái \`Paid\` và gửi Push Notification xác nhận cho phụ huynh trong vòng 3 giây.  
\* \*\*AUTO-FIN-003 (WORKFLOW):\*\* Tự động kích hoạt chuỗi kịch bản nhắc nợ đa kênh (Push App \-\> Zalo OA \-\> Call Bot / SMS) khi hóa đơn chuyển sang trạng thái Quá hạn (\`Overdue\`).  
\* \*\*AUTO-FIN-004 (FINANCE POSTING):\*\* Tự động khởi tạo bút toán hạch toán kế toán Sổ cái (General Ledger) và phân bổ Doanh thu chưa thực hiện (TK 3387 \-\> TK 511\) theo ngày/tháng học thực tế.

\#\# 20\. Notification Matrix

| Event | Recipient | Channel | Timing |  
| \--- | \--- | \--- | \--- |  
| Thông báo Phí Mới được phát hành | Phụ huynh | App Push \+ Zalo OA \+ Email | Immediate sau khi Issue |  
| Xác nhận Thanh toán Học phí Thành công | Phụ huynh & Kế toán | App Push \+ Zalo OA \+ ERP Alert | Real-time (3 giây sau Webhook) |  
| Nhắc nợ Trước Hạn (3 ngày trước Due Date) | Phụ huynh | App Push \+ Zalo OA | 08:30 AM ngày D-3 |  
| Nhắc nợ Quá Hạn (Overdue Notice) | Phụ huynh & Chăm sóc KH | App Push \+ SMS \+ Task ERP | 09:00 AM ngày D+1, D+3, D+5 |  
| Cảnh báo Giao dịch Sai nội dung (Unallocated) | Kế toán Phí | ERP High Alert \+ Email | Immediate khi nhận Webhook |

\#\# 21\. Permission Matrix (RBAC)

| Role | View Invoice | Create/Calculate Billing | Approve Billing Batch | Edit Discount/Fee | Manual Reconcile | Export Financial Report |  
| \--- | \--- | \--- | \--- | \--- | \--- | \--- |  
| Kế toán Phí | Full | Full | No | Full (In Rule) | Yes | Full |  
| Kế toán trưởng | Full | Full | Yes | Full | Yes | Full |  
| Thu ngân (Cashier) | Read Only | No | No | No | Yes (Cash Only) | Read Only |  
| CFO / Board | Full | No | Yes | Override | No | Full Enterprise |  
| Admission Officer | Read Only | No | No | Read Only | No | No |  
| Phụ huynh | Own Child | No | No | No | No | Read Only |

\#\# 22\. Audit Trail

Hệ thống bắt buộc ghi lại nhật ký (Audit Log) vĩnh viễn không thể điều chỉnh các hành vi:

\* Người chạy tiến trình tính phí, thời gian chạy, số lượng hóa đơn tạo ra và tổng giá trị đợt phí.  
\* Mọi thao tác thay đổi số tiền, bổ sung discount thủ công, chỉnh sửa số buổi ăn được hoàn (Who, When, Before Value, After Value, Justification Reason).  
\* Lịch sử nhận tín hiệu Webhook từ Ngân hàng (Raw Webhook Payload, IP Ngân hàng, Timestamp, Result Code).  
\* Thao tác gạch nợ thủ công (\`Manual Matching\`) của kế toán đối với các khoản tiền trong \`Unallocated Cash Pool\`.

\#\# 23\. Internal Controls

\* \*\*Segregation of Duties (Tách biệt nhiệm vụ):\*\* Nhân viên lập đợt phí (Kế toán Phí) không được tự phê duyệt đợt phí. Nhân viên thu ngân chỉ ghi nhận phiếu thu mặt, không có quyền chỉnh sửa biểu phí trên hóa đơn.  
\* \*\*System Frozen Control:\*\* Đợt Phí sau khi Kế toán trưởng bấm \`Approved\` sẽ bị khóa dữ liệu tuyệt đối. Mọi điều chỉnh phát sinh sau đó bắt buộc phải thực hiện thông qua Chứng từ ĐIỀU CHỈNH/GIẢM TRỪ (Adjustment Credit/Debit Note) có phê duyệt cấp cao.  
\* \*\*Dual-Key Reconciliation:\*\* Các giao dịch gạch nợ thủ công (\`Manual Matching\`) trên 10.000.000 VNĐ bắt buộc phải có xác nhận kép (Dual Control) bởi Kế toán trưởng.

\#\# 24\. KPI / SLA

| KPI / SLA Description | Formula / Measurement | Target | Owner |  
| \--- | \--- | \--- | \--- |  
| \*\*SLA Phát hành Thông báo Phí\*\* | Thời gian từ khi chốt điểm danh đến khi gửi Thông báo Phí | \<= 24 giờ làm việc | Kế toán trưởng |  
| \*\*Tỷ lệ Gạch nợ Tự động (Auto-Reconciliation Rate)\*\* | (Số hóa đơn gạch nợ thành công qua Webhook / Tổng hóa đơn) \* 100 | \*\*\>= 98%\*\* | Kế toán Phí & IT |  
| \*\*Tỷ lệ Thu hồi Nợ Đúng Hạn (On-time Collection Rate)\*\* | (Số tiền thu được đúng Due Date / Tổng tiền phải thu) \* 100 | \*\*\>= 92%\*\* | CFO & Phòng Kế toán |  
| \*\*SLA Xuất Hóa đơn Điện tử\*\* | Thời gian từ khi gạch nợ thành công đến khi xuất E-Invoice | \<= 12 giờ | Kế toán Phí |

\#\# 25\. Dashboard / Report

\* \*\*Operational Billing Dashboard (Kế toán):\*\* Bảng theo dõi tiến độ gạch nợ real-time, Danh sách hóa đơn chờ xử lý, Danh sách giao dịch \`Unallocated Cash Pool\` cần đối soát.  
\* \*\*Collection & AR Management Report (Kế toán trưởng):\*\* Báo cáo Tuổi nợ công nợ (\`Aging AR Report\`: 1-7 ngày, 8-15 ngày, \> 30 ngày), Báo cáo tổng hợp tiền hoàn ăn và giảm giá theo cơ sở.  
\* \*\*Executive Financial Dashboard (CFO/Board):\*\* Báo cáo Doanh thu học phí thực hiện (Recognized Revenue) vs Doanh thu chưa thực hiện (Deferred Revenue), Báo cáo Dòng tiền thu thực tế (Cash Inflow Projection), Báo cáo Tỷ lệ Lấp đầy & AR Turnover.

\#\# 26\. Integration

\* \*\*Hệ thống Ngân hàng & Cổng thanh toán (VietQR / Virtual Account / NAPAS / Momo / ZaloPay):\*\* Kết nối API 2 chiều để phát hành QR động và nhận Webhook gạch nợ tức thì.  
\* \*\*Phần mềm Hóa đơn Điện tử (E-Invoice Providers: MInvoice, VNPT, Viettel, MISA):\*\* Kết nối tự động xuất và truyền hóa đơn lên Cục Thuế.  
\* \*\*Core Accounting & General Ledger (Module 55/56):\*\* Tự động đồng bộ các bút toán Nợ/Có, Doanh thu phân bổ, Thuế VAT và Công nợ vào sổ cái tổng hợp.  
\* \*\*Mobile App Phụ huynh & Zalo Official Account:\*\* Tích hợp nhận thông báo phí, xem chi tiết bảng kê tiền ăn nghỉ phép và bấm thanh toán trực tiếp.

\#\# 27\. Risks & Controls

| Risk Description | Impact | Probability | Control Activity | Owner |  
| \--- | \--- | \--- | \--- | \--- |  
| \*\*Phụ huynh chuyển khoản sai, không gạch nợ được\*\* | Medium | High | Bắt buộc sử dụng Dynamic VietQR / Virtual Account; Tự động hóa gạch nợ theo mã hóa đơn. | Kế toán Phí & Bank |  
| \*\*Tính sai số tiền hoàn ăn gây khiếu nại\*\* | Medium | Medium | Khóa chốt điểm danh tự động từ \`SOP-SIS-001\`; Cài đặt \`Anomaly Detector\` lọc lỗi trước khi duyệt. | Ban Giáo vụ & Kế toán |  
| \*\*Gian lận tự ý cấp chiết khấu / giảm phí\*\* | High | Low | Khóa quyền sửa phí trên UI; Áp dụng Ma trận duyệt Approval Matrix 3 cấp theo hạn mức. | Kế toán trưởng & CFO |  
| \*\*Chậm trễ / Vi phạm quy định Hóa đơn điện tử\*\* | High | Low | Tự động hóa xuất E-Invoice qua API ngay sau khi nhận tín hiệu gạch nợ \`Paid\`. | Kế toán Phí |

\#\# 28\. Acceptance Criteria

\* \*\*Given:\*\* Điểm danh tháng 08 đã được khóa sổ và Đơn xin nghỉ phép hợp lệ của Học sinh A đã được duyệt (nghỉ 03 ngày).  
\* \*\*When:\*\* Kế toán chạy tiến trình \`Monthly Billing Generation Job\` cho tháng 09\.  
\* \*\*Then:\*\* ERP phải tự động tính chính sở tiền ăn hoàn bù cho 03 ngày nghỉ vào hóa đơn tháng 09, áp dụng chính sách giảm giá Sibling Discount 5%, tạo mã VietQR động chứa chính xác số tiền sau trừ và chuyển trạng thái đợt phí sang \`Draft\` thành công.  
\* \*\*Given:\*\* Phụ huynh thực hiện quét mã VietQR trên App Phụ huynh để thanh toán hóa đơn học phí 10.000.000 VNĐ.  
\* \*\*When:\*\* Ngân hàng trả tín hiệu Webhook khớp \`InvoiceRefID\` về ERP.  
\* \*\*Then:\*\* ERP tự động gạch nợ hóa đơn sang trạng thái \`Paid\` trong vòng 3 giây, gửi Push Notification cảm ơn tới điện thoại phụ huynh và đẩy dữ liệu xuất Hóa đơn điện tử tự động.

\#\# 29\. Test Scenarios

1\. \*\*Happy Path Test (Chuẩn 100%):\*\* Tự động tính phí \-\> Khấu trừ tiền ăn 2 ngày nghỉ phép \-\> Duyệt đợt phí \-\> Phụ huynh quét VietQR \-\> Webhook gạch nợ thành công \-\> Xuất E-Invoice.  
2\. \*\*Meal Credit Boundary Test:\*\* Tạo 1 đơn xin nghỉ phép gửi lúc 08:05 AM (sau giờ chốt 08:00 AM) \-\> Kiểm tra ERP có CHẶN KHÔNG HOÀN TÌỀN ĂN cho ngày đó không.  
3\. \*\*Partial & Excess Payment Test:\*\* Phụ huynh cố tình chuyển khoản thiếu 500.000 VNĐ \-\> Kiểm tra ERP chuyển trạng thái \`Partial Paid\` và tính công nợ còn thiếu chính xác hay không.  
4\. \*\*Unallocated Cash Matching Test:\*\* Chuyển khoản cố tình xóa nội dung giao dịch \-\> Kiểm tra ERP có đưa dòng tiền vào \`Unallocated Cash Pool\` và gửi cảnh báo cho Kế toán gạch nợ thủ công không.  
5\. \*\*Security & Permission Test:\*\* Dùng tài khoản Kế toán Phí cố tình chỉnh sửa giá trị Đợt Phí đã ở trạng thái \`Approved\` \-\> Kiểm tra ERP có khóa cứng giao diện không cho sửa.

\#\# 30\. ERP Implementation Notes

\* \*\*Configuration:\*\* Cấu hình chính xác đơn giá ăn theo bữa, công thức hoàn tiền ăn, thứ tự gạch nợ ưu tiên, ma trận chiết khấu gộp và mã Cửa khẩu Ngân hàng (Bank Terminal ID).  
\* \*\*Master Data Migration:\*\* Import số dư công nợ đầu kỳ (\`Opening AR Balance\`), tiền gửi dư của phụ huynh (\`Parent Advance Balance\`) từ hệ thống kế toán cũ.  
\* \*\*Integration Testing:\*\* Test kết nối Webhook mạng diện rộng với Ngân hàng/Cổng thanh toán dưới tải giả lập 1.000 giao dịch/phút; Test API kết nối Phần mềm Hóa đơn Điện tử.  
\* \*\*Training & Change Management:\*\* Đào tạo Kế toán quy trình xử lý ngoại lệ \`Unallocated Cash Pool\`; Hướng dẫn Phụ huynh quy trình thanh toán 1-Click qua VietQR trên Mobile App.

\---

\#\# TÀI LIỆU CHUẨN DẠNG MARKDOWN (.MD) VÀ XÁC NHẬN BƯỚC TIẾP THEO

Toàn bộ quy trình \*\*SOP-FIN-001\*\* trên đây đã được biên soạn tuân thủ chính xác 100% chuẩn cấu trúc 30 mục Enterprise ERP, tích hợp đầy đủ các quy tắc Quản lý File \`.md\` và sẵn sàng để trích xuất thành file độc lập: \`SOP-FIN-001\_Tu\_Dong\_Hoa\_Lap\_Hoa\_Don\_Hoc\_Phi\_Va\_Khau\_Tru\_Tien\_An.md\`.

\*Theo quy định tạo và quản lý file không thuộc Workspace (Non-Workspace File Generation):\*

1\. \*\*Trạng thái:\*\* Đã hoàn thành biên soạn nội dung file \`.md\` chi tiết trong phản hồi này.  
2\. \*\*Yêu cầu xác nhận Upload:\*\* Bạn có muốn tôi tiến hành thực thi thao tác tải (upload) file \`.md\` này trực tiếp lên Google Drive của bạn không?

# Thẻ 5

# **SOP-KIT-001 — QUY TRÌNH QUẢN LÝ THỰC ĐƠN, ĐỊNH MỨC DINH DƯỠNG, MUA HÀNG THỰC PHẨM TƯƠI SỐNG VÀ LƯU MẪU THỰC PHẨM AN TOÀN 24H**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-KIT-001  
*   
* **Tên SOP:** Quy trình Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm Tươi sống và Lưu mẫu Thực phẩm An toàn 24h  
*   
* **Module ERP:** Meal Planning (27), Nutrition Management (28), Kitchen Operations (29), Food Ingredient Procurement (30), Food Safety & Sample Retention (31), Inventory / Warehouse (32)  
*   
* **Process Owner:** Bếp trưởng / Chuyên gia Dinh dưỡng Học đường  
*   
* **Department:** Khối Vận hành Bếp ăn & An toàn Thực phẩm  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Functional Architect  
*   
* **Người kiểm tra:** Enterprise Architect & Senior QA Manager  
*   
* **Người phê duyệt:** Hiệu trưởng Cơ sở / CFO  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ chu trình quản lý bếp ăn mầm non từ khâu xây dựng thực đơn cân bằng dinh dưỡng/calo theo độ tuổi, tự động quy đổi số học sinh điểm danh real-time (SOP-SIS-001) thành định mức nguyên vật liệu (Recipe BOM), tự động lập và gửi Đơn mua hàng thực phẩm tươi sống (PO) cho Nhà cung cấp, kiểm nghiệm thực phẩm 3 bước khi giao nhận, kiểm soát dị ứng thực phẩm của trẻ và thực hiện lưu mẫu thức ăn 24 giờ tuân thủ nghiêm ngặt quy định An toàn Thực phẩm của Bộ Y tế.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non thuộc hệ thống có tổ chức bếp ăn bán trú.  
*   
* **Phòng ban:** Bộ phận Bếp ăn, Bộ phận Mua hàng (Procurement), Cán bộ Y tế học đường, Bộ phận Kho, Phòng Kế toán, Giáo viên chủ nhiệm.  
*   
* **Đối tượng:** Toàn bộ bữa ăn của học sinh (Sáng, Trưa, Xế, Phụ) và bữa ăn của Cán bộ Giáo viên Nhân viên (CBGVNV).  
*   
* **Trường hợp không áp dụng:** Suất ăn do Phụ huynh tự chuẩn bị mang từ nhà cho trẻ có chế độ ăn đặc trị y khoa đặc biệt (áp dụng SOP-MED-004: Quản lý Chế độ Ăn Y tế Đặc biệt).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Recipe BOM (Bill of Materials \- Định mức Món ăn):** Bảng định mức chi tiết lượng nguyên liệu thô (tính bằng gram/kg) và giá trị dinh dưỡng (Kcal, Protein, Lipit, Glucid) trên 01 suất ăn chuẩn theo từng nhóm tuổi (Nhà trẻ: 6–36 tháng, Mẫu giáo: 3–6 tuổi).  
*   
* **Kiểm thực 3 bước (3-Step Food Inspection):** Quy trình kiểm tra an toàn thực phẩm bắt buộc gồm:  
* 

  1. Kiểm tra trước khi chế biến (nhập nguyên liệu).  
  2.   
  3. Kiểm tra trong khi chế biến (khoảng thời gian nấu).  
  4.   
  5. Kiểm tra trước khi ăn (thành phẩm bài trí trước khi chia suất).  
  6.   
* **Lưu mẫu Thực phẩm 24h (Sample Retention):** Quy trình trích xuất và niêm phong mẫu thức ăn đã chế biến (tối thiểu 100g/mẫu thực phẩm khô, 150ml/mẫu thực phẩm lỏng) giữ trong tủ lạnh chuyên dụng từ 2–8°C trong thời gian 24 giờ dưới sự giám sát của Cán bộ Y tế.  
*   
* **Allergy Alert Engine:** Bộ lọc tự động trên ERP đối chiếu thành phần nguyên liệu món ăn với danh mục học sinh bị dị ứng trong lớp để phát cảnh báo.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Thiết lập Thực đơn & Khai báo BOM Món ăn | Chuyên gia Dinh dưỡng / Bếp trưởng | Hiệu trưởng Cơ sở | Y tế học đường | Kế toán / Supplier |
| Chốt Suất ăn & Tự động Lập Đơn Mua Hàng (PO) | ERP System / Bếp trưởng | Procurement Mgr | Kế toán Phí | Supplier |
| Kiểm thực Bước 1 & Nhận Hàng Buổi Sáng | Bếp trưởng & Thủ kho | Cán bộ Y tế | Supplier | Procurement |
| Kiểm thực Bước 2, Bước 3 & Lưu mẫu 24h | Bếp trưởng & Cán bộ Y tế | Hiệu trưởng Cơ sở | BGH | Phụ huynh (nếu cần) |
| Quyết toán Chi phí Bếp & Báo cáo Dinh dưỡng | Kế toán Phí / Bếp trưởng | CFO | Kế toán trưởng | Hiệu trưởng |

*Ghi chú: Việc thực hiện Kiểm thực 3 bước, Lưu mẫu thực phẩm 24h và Đảm bảo Định mức Dinh dưỡng mầm non cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo và Bộ Y tế (Thông tư 30/2012/TT-BYT, Quyết định 1245/QĐ-BYT) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Món ăn & BOM (MealRecipeMaster), Danh mục Thực phẩm & Năng lượng (IngredientMaster), Danh mục Nhà cung cấp đạt chuẩn (ApprovedSupplierMaster), Danh mục Học sinh Dị ứng (StudentAllergyMaster).  
*   
* **Dữ liệu Điểm danh:** Số lượng học sinh có mặt thực tế và số học sinh báo nghỉ hợp lệ chốt lúc 09:00 AM từ SOP-SIS-001.  
*   
* **Hợp đồng NCC:** Hợp đồng khung mua hàng thực phẩm tươi sống còn hiệu lực kèm Bảng giá thỏa thuận (Price Agreement).  
* 

## **7\. Trigger**

* **Chu kỳ Tuần:** 15:00 Thứ Bảy hàng tuần (Hệ thống tự động duyệt Thực đơn tuần tiếp theo T+1).  
*   
* **Chu kỳ Ngày (16:00 hàng ngày):** Tự động phát hành Đơn mua hàng thực phẩm tươi sống (Fresh Food PO) cho ngày hôm sau dựa trên sĩ số dự kiến.  
*   
* **Chu kỳ Sáng (06:00 \- 07:00 hàng ngày):** Nhà cung cấp giao hàng tươi sống tại kho bếp.  
* 

## **8\. Quy trình AS-IS**

* Bếp trưởng ước lượng lượng thịt, rau bằng kinh nghiệm hoặc file Excel thủ công.  
*   
* Gọi điện hoặc nhắn tin Zalo cho các mối lái/nhà cung cấp lẻ ngoài chợ để đặt hàng buổi chiều.  
*   
* Buổi sáng nhận hàng, cân bằng cân bàn thủ công, ghi chép sổ kiểm thực 3 bước bằng tay vào sổ giấy.  
*   
* Lưu mẫu thức ăn vào hộp nhựa, dán băng dính ghi tên món, không có khóa niêm phong niêm mật.  
*   
* **Hệ quả:** Thất thoát nguyên vật liệu do lệch định mức; rủi ro thực phẩm không rõ nguồn gốc; nguy cơ bùng phát dịch ngộ độc do không kiểm soát dị ứng; hồ sơ lưu mẫu thiếu tính pháp lý khi cơ quan an toàn thực phẩm kiểm tra.  
* 

## **9\. Pain Points / Risk**

* **Human Error:** Tính sai khối lượng nguyên liệu khi tăng/giảm đột biến số lượng học sinh.  
*   
* **Compliance Risk:** Vi phạm quy định kiểm thực 3 bước và lưu mẫu của Bộ Y tế, dẫn đến nguy cơ bị đình chỉ hoạt động bếp ăn khi có thanh tra.  
*   
* **Health & Safety Risk:** Bỏ sót học sinh bị dị ứng hải sản/trứng/sữa, dẫn đến sốc phản vệ tại trường.  
*   
* **Fraud Risk:** Thông đồng giữa Bếp trưởng, Thủ kho và Nhà cung cấp về số lượng/chất lượng thực phẩm giao nhận buổi sáng.  
*   
* **Data Isolation:** Chi phí tiền ăn thực tế không đồng bộ với phân hệ Kế toán và Công nợ Học phí (SOP-FIN-001).  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Lập Thực đơn, Cân đối Dinh dưỡng & Kiểm tra Dị ứng (Menu & Allergy Control)**

* **Step 01:**  
* 

  * **Actor:** Chuyên gia Dinh dưỡng / Bếp trưởng.  
  *   
  * **Action:** Bếp trưởng lập Thực đơn tuần cho các khối lớp trên ERP. Hệ thống tự động tính toán tổng năng lượng Kcal, Protein, Lipit, Glucid theo công thức BOM và so sánh với Chuẩn Dinh dưỡng Mầm non do Bộ GD&ĐT quy định.  
  *   
  * **ERP Function:** Nutritional Balance Calculator.  
  *   
  * **Input:** Danh sách món ăn được chọn trong tuần.  
  *   
  * **Output:** Bảng Phân tích Dinh dưỡng Thực đơn Tuần.  
  *   
  * **Business Rule:** BR-KIT-001: Tổng năng lượng Kcal/ngày/trẻ phải nằm trong khoảng chuẩn cho phép (Ví dụ: Mẫu giáo 615–726 Kcal/ngày/trẻ tại trường).  
  *   
  * **Status Before:** Draft Menu.  
  *   
  * **Status After:** Nutrition Approved.  
  *   
  * **SLA:** Hoàn thành trước 15:00 Thứ Bảy hàng tuần.  
  *   
  * **Notification:** Báo cáo gửi Hiệu trưởng duyệt.  
  *   
* **Step 02:**  
* 

  * **Actor:** ERP System (Allergy Engine).  
  *   
  * **Action:** ERP tự động quét nguyên liệu của các món ăn trong thực đơn đã duyệt và đối chiếu với trường StudentAllergyFlags của toàn bộ học sinh trong cơ sở.  
  *   
  * **ERP Function:** Automated Allergen Cross-Checking.  
  *   
  * **Input:** Thực đơn tuần \+ Database Dị ứng Học sinh từ SOP-ADM-003.  
  *   
  * **Output:** Cảnh báo Dị ứng (Allergy Red Flag List) ghi rõ Lớp, Tên học sinh và Món ăn vi phạm.  
  *   
  * **Business Rule:** BR-KIT-002: Nếu phát hiện món ăn chứa chất gây dị ứng cho học sinh trong lớp, ERP bắt buộc yêu cầu Bếp trưởng khai báo Món ăn Thay thế (Substitute Meal Recipe) cho học sinh đó trước khi xuất bản thực đơn.  
  *   
  * **Status Before:** Nutrition Approved.  
  *   
  * **Status After:** Allergy Checked & Published.  
  *   
  * **SLA:** Real-time (\<= 10 giây).  
  *   
  * **Notification:** Push Notification gửi cho Giáo viên chủ nhiệm lớp có trẻ dị ứng để ghi nhận.  
  * 

### **Giai đoạn 2: Tự động Lập Đơn Mua Hàng & Phát hành cho Nhà Cung Cấp (Procurement Auto-Dispatch)**

* **Step 03:**  
* 

  * **Actor:** ERP System (MRP & PO Engine).  
  *   
  * **Action:** Đúng 16:00 ngày T-1, ERP lấy sĩ số dự kiến ngày T+1 (sĩ số hiện tại \- đơn nghỉ phép đã báo) nhân với Recipe BOM của thực đơn ngày T+1, trừ đi tồn kho khả dụng tại bếp, tự động sinh Đơn mua hàng thực phẩm tươi sống (Fresh Food PO).  
  *   
  * **ERP Function:** Auto Material Requirement Planning (MRP).  
  *   
  * **Input:** Sĩ số dự kiến, Recipe BOM, Tồn kho thực tế.  
  *   
  * **Output:** Đơn mua hàng tự động (Generated PO).  
  *   
  * **Business Rule:** Tự động chia đơn mua hàng cho đúng NCC đã trúng thầu theo danh mục mặt hàng (Ví dụ: Thịt cá \-\> NCC A, Rau củ \-\> NCC B).  
  *   
  * **Status Before:** Demand Calculated.  
  *   
  * **Status After:** PO Generated.  
  *   
  * **SLA:** Tự động hoàn tất trong 5 phút.  
  *   
  * **Notification:** Bếp trưởng và Chuyên viên Mua hàng nhận Alert kiểm tra.  
  *   
* **Step 04:**  
* 

  * **Actor:** Bếp trưởng / Chuyên viên Mua hàng & ERP System.  
  *   
  * **Action:** Bếp trưởng kiểm tra nhanh PO và bấm "Xác nhận Phát hành". ERP tự động gửi PO qua Portal Nhà cung cấp, Zalo OA và Email của NCC.  
  *   
  * **ERP Function:** Supplier PO Dispatcher.  
  *   
  * **Input:** Generated PO.  
  *   
  * **Output:** PO ở trạng thái Dispatched to Supplier.  
  *   
  * **Business Rule:** BR-KIT-003: PO tươi sống bắt buộc gửi NCC trước 16:30 hàng ngày. Sau 16:30, hệ thống tự động khóa không cho sửa số lượng.  
  *   
  * **Status Before:** PO Generated.  
  *   
  * **Status After:** PO Dispatched.  
  *   
  * **SLA:** Max 30 phút.  
  *   
  * **Notification:** Tín hiệu xác nhận "NCC đã nhận đơn" trả về ERP.  
  * 

### **Giai đoạn 3: Nhận Hàng, Kiểm Thực 3 Bước & Chế Biến (Goods Receipt & Food Safety)**

* **Step 05 (Kiểm thực Bước 1):**  
* 

  * **Actor:** Bếp trưởng, Cán bộ Y tế & Thủ kho.  
  *   
  * **Action:** Lúc 06:00 AM ngày T, NCC giao hàng. Hội đồng giao nhận (Bếp trưởng, Y tế, Thủ kho) tiến hành cân khối lượng, kiểm tra cảm quan độ tươi sống, đo nhiệt độ bảo quản và kiểm tra tem truy xuất nguồn gốc. Kết quả được nhập vào Mobile App Bếp ăn kèm chụp ảnh thực tế.  
  *   
  * **ERP Function:** Mobile Goods Receipt & Inspection Step 1.  
  *   
  * **Input:** PO \+ Khối lượng thực giao \+ Nhiệt độ \+ Ảnh chụp thực phẩm.  
  *   
  * **Output:** Phiếu Nhập Kho Thực Phẩm (Goods Receipt Note) & Sổ Kiểm Thực Bước 1 Điện Tử.  
  *   
  * **Business Rule:** BR-KIT-004: Nếu thực phẩm không đạt cảm quan hoặc sai lệch khối lượng \> 5%, ERP tự động kích hoạt tính năng Partial Reject / Full Reject, phát tín hiệu yêu cầu NCC giao bù khẩn cấp trước 08:00 AM.  
  *   
  * **Status Before:** PO Dispatched.  
  *   
  * **Status After:** Goods Received & Step 1 Passed.  
  *   
  * **SLA:** \<= 45 phút kể từ khi NCC giao hàng.  
  *   
  * **Notification:** Cảnh báo tới Procurement nếu hàng bị Reject.  
  *   
* **Step 06 (Kiểm thực Bước 2 & Điều chỉnh Sĩ số Real-time):**  
* 

  * **Actor:** Bếp trưởng & ERP System.  
  *   
  * **Action:** Lúc 09:00 AM (sau khi SOP-SIS-001 chốt điểm danh), ERP tự động tính toán lại số suất ăn chính xác. Bếp trưởng thực hiện Kiểm thực Bước 2 (trong quá trình sơ chế, chế biến) và ghi nhận vào App.  
  *   
  * **ERP Function:** Step 2 Inspection & Real-time Re-balancing.  
  *   
  * **Input:** Dữ liệu điểm danh chốt lúc 09:00 AM \+ Nhật ký sơ chế.  
  *   
  * **Output:** Sổ Kiểm thực Bước 2 \+ Bảng điều chỉnh chia suất ăn.  
  *   
  * **Business Rule:** Số lượng suất ăn chốt lúc 09:00 AM là căn cứ duy nhất để ghi nhận chi phí bữa ăn trong ngày.  
  *   
  * **Status Before:** Goods Received.  
  *   
  * **Status After:** Cooking & Step 2 Passed.  
  *   
  * **SLA:** Complete trước 10:00 AM.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 07 (Kiểm thực Bước 3 & Lưu Mẫu Thực Phẩm 24h):**  
* 

  * **Actor:** Bếp trưởng & Cán bộ Y tế.  
  *   
  * **Action:** Trước khi chia suất ăn 15 phút, Cán bộ Y tế và Bếp trưởng nếm thử cảm quan, kiểm tra chín kỹ (Kiểm thực Bước 3). Đồng thời trích xuất mẫu từng món ăn (tối thiểu 100g khô/150ml lỏng) cho vào dụng cụ lưu mẫu vô trùng, dán tem mã QR do ERP sinh ra, bấm niêm phong khóa và đưa vào tủ lưu mẫu 2-8°C.  
  *   
  * **ERP Function:** Step 3 Inspection & Sample Retention Logging.  
  *   
  * **Input:** Mã QR Mẫu lưu, Nhiệt độ tủ lưu mẫu, Tên người lưu, Thời gian lưu.  
  *   
  * **Output:** Sổ Lưu Mẫu Thực Phẩm Điện Tử (Digital Sample Retention Log).  
  *   
  * **Business Rule:** BR-KIT-005: Mã QR lưu mẫu chứa thông tin Ngày, Bữa ăn, Tên món, Người lưu, Hạn hủy mẫu (đúng 24 giờ sau). Tủ lưu mẫu bắt buộc phải có ổ khóa niêm phong và ghi nhận nhật ký mở tủ.  
  *   
  * **Status Before:** Cooking.  
  *   
  * **Status After:** Meals Served & Sample Retained.  
  *   
  * **SLA:** Hoàn tất trước 10:45 AM (bữa trưa) và 14:00 PM (bữa xế).  
  *   
  * **Notification:** Alert xác nhận "Đã hoàn tất lưu mẫu" gửi Hiệu trưởng Cơ sở.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: 15:00 Thứ Bảy Tuần T-1\]  
       │  
       ▼  
\[Bếp Trưởng Khai Báo Thực Đơn Tuần Trên ERP\]  
       │  
       ▼  
\[ERP: Auto-Calculate Dinh Dưỡng Kcal/Protein/Lipit/Glucid\]  
       │  
       ▼  
\[ERP Allergy Engine: Quét Dị Ứng Học Sinh Cross-Check (SOP-ADM-003)\]  
       │  
       ◇ Phát hiện trẻ dị ứng với nguyên liệu?  
       ├─ YES ──► \[Khai báo Món ăn Thay thế (Alternative Meal)\]  
       └─ NO  ──┐  
                │  
                ▼  
  \[16:00 Hàng Ngày (T-1): ERP Running Auto-MRP\]  
                │  
                ▼  
  \[ERP Auto Generator Fresh Food PO ──► Bếp Trưởng Confirm ──► Dispatch cho NCC\]  
                │  
                ▼  
  \[06:00 AM (Ngày T): NCC Giao Hàng Tại Bếp\]  
                │  
                ▼  
  \[Hội Đồng Bếp/Y Tế/Kho: Cân, Đo Nhiệt Độ, Kiểm Thực Bước 1 trên Mobile App\]  
                │  
                ◇ Hàng đạt tiêu chuẩn?  
                ├─ NO  ──► \[ERP Partial/Full Reject ──► Yêu cầu NCC Giao Bù Khẩn\]  
                └─ YES ──┐  
                         │  
                         ▼  
  \[09:00 AM: Sync Dữ Liệu Điểm Danh Real-time (SOP-SIS-001) ──► Chốt Suất Ăn\]  
                         │  
                         ▼  
  \[Bếp Chế Biến ──► Kiểm Thực Bước 2\]  
                         │  
                         ▼  
  \[10:30 AM: Kiểm Thực Bước 3 ──► Trích Mẫu ──► Dán Tem QR Code ──► Niêm Phong Tủ Lưu 24h\]  
                         │  
                         ▼  
  \[Bàn Giao Suất Ăn Cho Các Lớp ──► Tự Động Quyết Toán Chi Phí Sang SOP-FIN-001\]  
                         │  
                         ▼  
  \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-KIT-001:** Thực đơn tuần phải đảm bảo cân đối tỷ lệ năng lượng giữa các chất (P-L-G) nằm trong khung tiêu chuẩn mầm non của Bộ GD&ĐT. Hệ thống ERP sẽ chặn không cho Submit thực đơn nếu năng lượng Kcal lệch \> 10% so với chuẩn.  
*   
* **BR-KIT-002:** Khi một món ăn có chứa thành phần dị ứng trùng với dữ liệu y tế của bất kỳ học sinh nào trong cơ sở, ERP bắt buộc gắn nhãn cảnh báo đỏ (Allergy Red Flag) và yêu cầu bổ sung món thay thế trước khi cho phép xuất bản thực đơn.  
*   
* **BR-KIT-003:** Đơn mua hàng thực phẩm tươi sống (Fresh Food PO) gửi NCC tự động khóa chỉnh sửa sau **16:30** hàng ngày. Mọi phát sinh tăng/giảm sau 16:30 phải chạy quy trình Emergency PO Adjustment có duyệt của Hiệu trưởng.  
*   
* **BR-KIT-004:** Mọi lô thực phẩm tươi sống nhập kho buổi sáng không có tem truy xuất nguồn gốc, không đạt cảm quan hoặc sai lệch nhiệt độ bảo quản (Thịt tươi \> 10°C, Thực phẩm đông lạnh \> \-12°C) bắt buộc phải bị lập Biên bản Từ chối (Reject Note) trên ERP.  
*   
* **BR-KIT-005:** Mẫu thức ăn lưu 24h phải được niêm phong bằng mã QR do ERP sinh ra, duy trì trong tủ lạnh chuyên dụng từ **2°C – 8°C** trong đúng **24 giờ**. Sau 24 giờ, ERP tự động phát thông báo "Đã đủ thời gian hủy mẫu" cho Cán bộ Y tế thực hiện hủy và ghi nhật ký.  
* 

## **13\. Exception Cases**

* **NCC giao thiếu hoặc giao thực phẩm không đạt chất lượng buổi sáng:** Bếp trưởng bấm Reject trên App. ERP tự động phát cảnh báo SMS/Zalo khẩn cho NCC yêu cầu giao bù mặt hàng thay thế trong vòng 60 phút. Nếu NCC không đáp ứng, ERP tự động chuyển PO sang Nhà cung cấp dự phòng (Backup Supplier).  
*   
* **Phát sinh sự cố nghi ngờ Ngộ độc Thực phẩm tại trường:** Cán bộ Y tế bấm nút Food Poisoning Incident Alert trên ERP. Hệ thống lập tức:  
* 

  1. Niêm phong khẩn cấp Tủ lưu mẫu 24h.  
  2.   
  3. Xuất bản báo cáo Kiểm thực 3 bước và danh sách học sinh ăn bữa ăn tương ứng.  
  4.   
  5. Gửi thông báo khẩn tới Hiệu trưởng, Trưởng ban Y tế và Ban Điều hành Chuỗi.  
  6.   
* **Mất điện khu vực làm gián đoạn Tủ lưu mẫu thực phẩm:** Tủ lưu mẫu tự động kích hoạt nguồn điện dự phòng (UPS). ERP nhận cảnh báo nhiệt độ từ Cảm biến IoT. Nếu nhiệt độ tủ vượt 8°C, hệ thống phát chuông cảnh báo tới điện thoại Bảo vệ và Bếp trưởng.  
* 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Duyệt Thực đơn Tuần & Định mức Dinh dưỡng | Bếp trưởng / Dinh dưỡng | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Đơn Mua Hàng Thực Phẩm (Standard PO) | System Auto Check | Bếp trưởng | Procurement Manager |
| Phê duyệt Đơn Mua Hàng Khẩn cấp (Emergency PO) | Bếp trưởng | Hiệu trưởng Cơ sở | CFO |
| Phê duyệt Hủy Mẫu Lưu Thực Phẩm (Sau 24h) | Cán bộ Y tế | Bếp trưởng | N/A |

## **15\. Status Lifecycle**

* **Menu Status:** Draft \-\> Nutrition Approved \-\> Allergy Checked \-\> Published \-\> Completed.  
*   
* **Fresh Food PO Status:** Draft \-\> Auto Generated \-\> Dispatched \-\> Supplier Confirmed \-\> Partially Received \-\> Fully Received \-\> Closed.  
*   
* **Food Sample Status:** Extracted \-\> QR Sealed \-\> In Retention (0-24h) \-\> Retention Completed \-\> Disposed.  
* 

## **16\. Data Model**

* **Primary Entity:** MealPlan  
* 

  * MealPlanID (PK, String)  
  *   
  * CampusID (FK, String), Date (Date), AgeGroup (Enum: Toddler, Kindergarten)  
  *   
  * MealType (Enum: Breakfast, MorningSnack, Lunch, AfternoonSnack)  
  *   
  * RecipeID (FK, String), TotalCalories (Decimal), ProteinGrams (Decimal)  
  *   
* **Related Entities:**  
* 

  * RecipeBOM: RecipeID (PK), RecipeName, IngredientID (FK), QuantityPerPortion (Decimal, Grams), IsAllergen (Boolean), AllergenType (Enum).  
  *   
  * KitchenPO: POID (PK), CampusID (FK), SupplierID (FK), PODate (Date), TotalAmount (Decimal), POStatus (Enum).  
  *   
  * FoodSafetyInspectionLog: LogID (PK), Date (Date), MealType (Enum), Step1Status (Pass/Fail), Step2Status (Pass/Fail), Step3Status (Pass/Fail), InspectorID (FK).  
  *   
  * FoodSampleLog: SampleID (PK), MealPlanID (FK), QRCodeTag (String, Unique), RetentionStartTime (DateTime), RetentionEndTime (DateTime), StorageTemp (Decimal), DisposalStatus (Boolean).  
  * 

## **17\. Forms / Documents**

* FRM-KIT-001: Sổ Kiểm thực 3 bước Điện tử (Theo mẫu Bộ Y tế).  
*   
* FRM-KIT-002: Sổ Theo dõi Lưu mẫu & Hủy mẫu Thực phẩm 24h.  
*   
* FRM-KIT-003: Phiếu Giao nhận & Kiểm nghiệm Thực phẩm Tươi sống Buổi sáng.  
*   
* FRM-KIT-004: Báo cáo Quyết toán Phí suất ăn Real-time Hàng ngày.  
* 

## **18\. ERP Functional Requirements**

* **FR-KIT-001 (MUST):** Hệ thống phải cung cấp công cụ Recipe BOM Engine cho phép tự động nhân số lượng học sinh điểm danh với định mức gram nguyên liệu của từng món ăn để xuất ra tổng nhu cầu thực phẩm thô.  
*   
* **FR-KIT-002 (MUST):** Tích hợp Allergy Cross-Checking Algorithm: Tự động quét thực đơn với database y tế học sinh và phát cảnh báo đỏ nếu phát hiện nguyên liệu gây dị ứng.  
*   
* **FR-KIT-003 (MUST):** Hỗ trợ Mobile App Bếp ăn cho phép chụp ảnh thực phẩm nhập kho, quét mã QR tem lưu mẫu và nhập thông số kiểm thực 3 bước trực tiếp tại bếp ăn.  
*   
* **FR-KIT-004 (SHOULD):** Tích hợp Cảm biến Nhiệt độ IoT gắn trong Tủ lưu mẫu thực phẩm để tự động ghi nhận nhật ký nhiệt độ liên tục 24h vào ERP.  
* 

## **19\. Automation Opportunities**

* **AUTO-KIT-001 (RULE ENGINE):** Tự động tính toán nhu cầu nguyên liệu và tạo Đơn mua hàng (PO) gửi NCC lúc 16:00 hàng ngày dựa trên sĩ số dự kiến.  
*   
* **AUTO-KIT-002 (INTEGRATION):** Tự động trừ lùi tồn kho nguyên liệu khô và tự động quyết toán chi phí tiền ăn thực tế chuyển sang Phân hệ Kế toán (Module 55) ngay sau giờ ăn.  
*   
* **AUTO-KIT-003 (NOTIFICATION):** Tự động phát cảnh báo nhắc giờ trích mẫu thức ăn và nhắc giờ hủy mẫu sau đúng 24 giờ lưu trữ.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thực đơn Tuần Mới được xuất bản | Phụ huynh & GVCN | Mobile App Push | 17:00 Thứ Bảy hàng tuần |
| Cảnh báo Món ăn chứa Chất gây Dị ứng | Bếp trưởng & GVCN | ERP Alert \+ App Pop-up | Immediate khi tạo thực đơn |
| Đơn Mua Hàng PO gửi tới Nhà Cung Cấp | Nhà cung cấp & Procurement | Zalo OA \+ Email \+ Portal | 16:30 Hàng ngày |
| Cảnh báo Thực phẩm Nhập kho bị Reject | Procurement & BGH | ERP High Alert \+ SMS | Immediate khi bấm Reject |
| Nhắc nhở Trích & Lưu Mẫu Thực phẩm 24h | Cán bộ Y tế & Bếp trưởng | Mobile App Push | Prior to meals (10:30 & 13:45) |

## **21\. Permission Matrix (RBAC)**

| Role | View Menu | Create/Edit Menu | Approve PO | Perform Inspection | Verify Sample Retention | Access Cost Report |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Bếp trưởng | Full | Full | View Only | Full | Full | Read Only |
| Cán bộ Y tế | Read Only | Read Only (Nutrition) | No | Full | Full (Sign) | No |
| Thủ kho Bếp | Read Only | No | No | Step 1 Only | No | Read Only |
| Procurement | Read Only | No | Full | View Only | No | Full |
| Hiệu trưởng Cơ sở | Full | Full | Full | Full | Full | Full |
| Phụ huynh / GVCN | View Assigned | No | No | No | No | No |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể tẩy xóa đối với:

* Mọi thao tác chỉnh sửa thành phần BOM món ăn hoặc thay đổi định mức gam nguyên liệu/suất.  
*   
* Nhật ký phê duyệt thực đơn, nhật ký từ chối hàng giao buổi sáng (Reject Note) đính kèm hình ảnh thực tế.  
*   
* Lịch sử quét mã QR lưu mẫu thực phẩm: Thời gian trích mẫu, Người thực hiện, Nhiệt độ tủ lưu, Thời gian hủy mẫu.  
*   
* Lịch sử điều chỉnh số lượng suất ăn sau mốc 09:00 AM.  
* 

## **23\. Internal Controls**

* **Three-Party Joint Inspection (Kiểm tra 3 bên):** Quy trình nhận hàng buổi sáng bắt buộc phải có đủ chữ ký điện tử trên App của 3 người: Bếp trưởng, Cán bộ Y tế và Thủ kho.  
*   
* **QR Sealed Retention:** Mẫu thực phẩm lưu 24h bắt buộc phải niêm phong bằng tem QR Code sinh ra từ ERP. Nếu tem bị rách hoặc quét sai mã, hệ thống cảnh báo vi phạm quy trình an toàn.  
*   
* **Price Lock Control:** Đơn giá nguyên liệu trong PO tự động khóa theo Bảng giá Hợp đồng đã ký (Price Agreement Master), Bếp trưởng không có quyền tự thay đổi đơn giá mua.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Lập & Phê duyệt Thực đơn Tuần** | Thời gian hoàn tất thực đơn trước tuần mới | Before 15:00 Saturday | Bếp trưởng & Dinh dưỡng |
| **Tỷ lệ Tuân thủ Dinh dưỡng (Nutritional Accuracy)** | (Số bữa ăn đạt chuẩn Kcal P-L-G / Tổng số bữa) \* 100 | **\>= 98%** | Bếp trưởng |
| **Tỷ lệ Tuân thủ Lưu mẫu 24h (Sample Retention Rate)** | (Số mẫu được lưu & niêm phong QR đúng chuẩn / Tổng số mẫu) \* 100 | **100% (Zero Error)** | Cán bộ Y tế & Bếp trưởng |
| **Tỷ lệ Sự cố Dị ứng Thực phẩm** | Số ca học sinh bị dị ứng do bỏ sót cảnh báo | **0% (Zero Tolerance)** | Bếp trưởng & Y tế |

## **25\. Dashboard / Report**

* **Kitchen Operational Dashboard (Bếp ăn):** Bảng theo dõi số lượng suất ăn real-time theo lớp, Danh sách cảnh báo dị ứng trong ngày, Trạng thái đơn hàng tươi sống PO, Đếm ngược thời gian lưu mẫu 24h.  
*   
* **Food Safety & Compliance Report (Y tế & BGH):** Sổ kiểm thực 3 bước điện tử, Nhật ký lưu và hủy mẫu thực phẩm, Báo cáo sự cố vệ sinh an toàn thực phẩm.  
*   
* **Kitchen Cost & Waste Executive Report (CFO & Board):** Báo cáo chi phí tiền ăn thực tế vs Chi phí định mức, Báo cáo tỷ lệ hao hụt nguyên liệu, Báo cáo đánh giá chất lượng Nhà cung cấp (Supplier Rating).  
* 

## **26\. Integration**

* **Student Information System (SOP-SIS-001):** Nhận dữ liệu điểm danh chốt real-time lúc 09:00 AM để tính chính xác số suất ăn.  
*   
* **Admission & Student Health (SOP-ADM-003):** Nhận dữ liệu dị ứng và chế độ ăn đặc biệt của học sinh.  
*   
* **Finance & General Ledger (SOP-FIN-001 & Module 55):** Tự động hạch toán chi phí nguyên liệu thực tế vào sổ cái và đối soát công nợ tiền ăn với Phụ huynh.  
*   
* **Supplier Portal / Zalo OA API:** Tự động gửi PO và nhận phản hồi xác nhận từ Nhà cung cấp.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Ngộ độc thực phẩm do nguyên liệu bẩn/ôi thiu** | Critical | Low | Kiểm thực Bước 1 nghiêm ngặt; Bắt buộc kiểm tra tem truy xuất nguồn gốc; Reject lập tức nếu không đạt. | Bếp trưởng & Y tế |
| **Sốc phản vệ do học sinh ăn trúng chất gây dị ứng** | Critical | Low | Allergy Engine tự động quét thực đơn cross-check với hồ sơ y tế; Yêu cầu món thay thế bắt buộc. | Bếp trưởng & ERP System |
| **Thất lạc / Không lưu mẫu thực phẩm khi có thanh tra** | High | Low | In tem mã QR niêm phong tủ lưu mẫu; ERP phát chuông nhắc nhở và đếm ngược 24 giờ. | Cán bộ Y tế |
| **Gian lận kê khống khối lượng thực phẩm tươi sống** | High | Medium | Kiểm tra 3 bên độc lập (Bếp, Y tế, Kho); Cân điện tử kết nối bluetooth đẩy số liệu thẳng vào App. | Thủ kho & Kế toán |

## **28\. Acceptance Criteria**

* **Given:** Thực đơn tuần có món "Chả cá thì là" chứa thành phần cá biển.  
*   
* **When:** Bếp trưởng bấm "Submit Thực đơn" trên ERP.  
*   
* **Then:** ERP tự động phát hiện Học sinh B (Lớp Mẫu giáo A1) có tiền sử dị ứng cá biển, khóa không cho xuất bản thực đơn và yêu cầu Bếp trưởng nhập món thay thế (Ví dụ: "Chả thịt lợn") cho Học sinh B.  
*   
* **Given:** Đúng 10:30 AM, Bếp trưởng hoàn tất chế biến các món ăn bữa trưa.  
*   
* **When:** Cán bộ Y tế thực hiện trích mẫu thức ăn và quét mã QR trên Mobile App Bếp ăn.  
*   
* **Then:** ERP ghi nhận nhật ký Sample Retained, in tem QR niêm phong, kích hoạt đồng hồ đếm ngược 24 giờ và gửi thông báo xác nhận đã lưu mẫu thành công về Dashboard của Hiệu trưởng.  
* 

## **29\. Test Scenarios**

1. **Happy Path Test:** Lập thực đơn chuẩn \-\> Quét dị ứng Pass \-\> Tự động sinh PO lúc 16:00 \-\> Kiểm thực Bước 1 Pass \-\> Chốt điểm danh 09:00 AM \-\> Lưu mẫu QR thành công \-\> Hủy mẫu sau 24h.  
2.   
3. **Allergy Block Test:** Cố tình đưa nguyên liệu Dậu nành vào thực đơn của lớp có trẻ dị ứng Đậu nành \-\> Kiểm tra xem ERP có chặn không cho xuất bản thực đơn không.  
4.   
5. **Goods Reject Test:** Nhập nhiệt độ thịt tươi 15°C (\> 10°C) tại Bước 1 \-\> Kiểm tra xem App có tự động chuyển trạng thái Reject và gửi SMS cảnh báo cho NCC giao bù không.  
6.   
7. **Real-time Attendance Rescaling Test:** Sĩ số dự kiến là 100 học sinh, nhưng lúc 09:00 AM điểm danh thực tế chỉ có 90 học sinh \-\> Kiểm tra ERP có tự động điều chỉnh định mức chia suất và quyết toán tiền ăn đúng 90 suất không.  
8.   
9. **IoT Temperature Sensor Failure Test:** Giả lập nhiệt độ Tủ lưu mẫu tăng lên 12°C \-\> Kiểm tra hệ thống cảnh báo chuông báo động và SMS có gửi đến Bếp trưởng/Bảo vệ ngay lập tức không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình chuẩn dinh dưỡng Kcal/P-L-G cho các khối tuổi; Cấu hình thời gian chạy tự động MRP (16:00 hàng ngày); Cấu hình khung nhiệt độ kiểm thực.  
*   
* **Master Data Migration:** Import danh mục món ăn chuẩn (Recipe Master), danh mục nguyên liệu và bảng giá Hợp đồng NCC; Chuẩn hóa danh mục dị ứng thực phẩm theo chuẩn y tế.  
*   
* **Hardware & Integration:** Trang bị Tablet/Mobile chuyên dụng chống nước cho khu vực Bếp ăn; Lắp đặt Cân điện tử Bluetooth và Cảm biến nhiệt độ IoT kết nối Tủ lưu mẫu thực phẩm.  
*   
* **Training:** Đào tạo Bếp trưởng thao tác Mobile App Bếp ăn; Đào tạo Cán bộ Y tế quy trình dán tem QR niêm phong mẫu lưu và kiểm thực 3 bước trên tablet.  
* 

## **TÀI LIỆU MARKDOWN (.MD) VÀ LỘ TRÌNH TRIỂN KHAI BƯỚC TIẾP THEO**

Tài liệu **SOP-KIT-001** đã được hoàn thiện đúng cấu trúc chuẩn 30 mục Enterprise ERP, tuân thủ nghiêm ngặt các quy định về an toàn thực phẩm, dinh dưỡng mầm non và tích hợp tự động hóa quy trình.

Mã file chuẩn: SOP-KIT-001\_Quan\_Ly\_Thuc\_Don\_Dinh\_Muc\_Dinh\_Duong\_Va\_Luu\_Mau\_24h.md.

*Theo quy định tạo và quản lý file không thuộc Workspace (Non-Workspace File Generation):*

1. **Trạng thái:** Đã hoàn thành biên soạn nội dung file .md chi tiết trong phản hồi này.  
2.   
3. **Yêu cầu xác nhận Upload:** Bạn có muốn tôi tiến hành thực thi thao tác tải (upload) file .md này trực tiếp lên Google Drive của bạn không?

# Thẻ 6

# **SOP-HR-001 — QUY TRÌNH QUẢN LÝ HỒ SƠ NHÂN SỰ, BẰNG CẤP GIÁO VIÊN MẦM NON, PHÂN CÔNG GIẢNG DẠY, CHẤM CÔNG VÀ TÍCH HỢP BẢNG LƯƠNG**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-HR-001  
*   
* **Tên SOP:** Quy trình Quản lý Hồ sơ Nhân sự, Bằng cấp Giáo viên Mầm non, Phân công Giảng dạy, Chấm công và Tích hợp Bảng lương  
*   
* **Module ERP:** Human Resources (45), Employee Onboarding (47), Teacher Qualification Management (48), Staff Scheduling (49), Leave Management (50), Time Attendance (51), Payroll Integration (52)  
*   
* **Process Owner:** Trưởng phòng Nhân sự (HR Manager) / Giám đốc Chuyên môn (Academic Director)  
*   
* **Department:** Phòng Nhân sự, Ban BGH / Khối Chuyên môn mầm non, Phòng Kế toán  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Điều hành (CEO) / Board  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ công tác quản lý vòng đời nhân sự mầm non: từ tiếp nhận cán bộ giáo viên nhân viên (CBGVNV) mới, thẩm định hồ sơ pháp lý/chứng chỉ sư phạm & lý lịch tư pháp (Child Safeguarding Clearance), quản lý định mức định biên Tỷ lệ Giáo viên/Học sinh (Teacher-to-Student Ratio), xếp lịch phân công giảng dạy/trông muộn, xử lý giáo viên nghỉ đột xuất (Substitute Teacher Dispatch), chấm công sinh trắc học đến tự động tổng hợp công phụ cấp và chuyển dữ liệu sang phân hệ Bảng lương (Payroll Engine).

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Áp dụng cho toàn bộ các cơ sở mầm non thuộc hệ thống trường mầm non tư thục / quốc tế / chuỗi trường.  
*   
* **Phòng ban:** Phòng Nhân sự, Ban Giám hiệu Cơ sở, Khối Giáo viên (Chủ nhiệm, Bộ môn, Trợ giảng), Khối Khối Văn phòng, Bộ phận Bảo vệ, Bếp ăn, Y tế.  
*   
* **Đối tượng:** Toàn bộ Cán bộ, Giáo viên, Nhân viên (toàn thời gian, bán thời gian, thỉnh giảng, thử việc).  
*   
* **Trường hợp không áp dụng:** Chuyên gia nước ngoài thỉnh giảng theo dự án ngắn hạn dưới 14 ngày (áp dụng SOP-HR-005: Quản lý Chuyên gia & Hợp đồng Dịch vụ Ngắn hạn).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Safeguarding Clearance (Xác minh An toàn Trẻ em):** Quy trình thẩm định bắt buộc bao gồm Phiếu Lý lịch Tư pháp (Số 2), Giấy khám sức khỏe tâm thần/thể chất và xác minh chiếu thâm niên làm việc trước khi giao nhân sự làm việc trực tiếp với trẻ em.  
*   
* **Teacher-to-Student Ratio (Tỷ lệ Giáo viên/Học sinh):** Số lượng học sinh tối đa trên 01 giáo viên/trợ giảng được quy định theo độ tuổi (Ví dụ: Trẻ 06–12 tháng: 1 GV / 3 trẻ; Mẫu giáo 3–6 tuổi: 1 GV / 10–12 trẻ) nhằm tuân thủ quy định của Bộ Giáo dục & Đào tạo.  
*   
* **Substitute Teacher Allocation (Phân công Giáo viên Dạy thay):** Quy trình tự động quét và điều động giáo viên dự phòng hoặc trợ giảng thay thế khi giáo viên chính nghỉ đột xuất.  
*   
* **Shift Overtime / Late Stay Duty (Công Trông muộn):** Khoảng thời gian giáo viên trực trông trẻ ngoài giờ (sau 17:30) được ghi nhận tự động dựa trên thời gian Check-out thực tế của học sinh (SOP-SIS-001).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tiếp nhận Hồ sơ & Thẩm định Chứng chỉ Sư phạm | Chuyên viên HR | Trưởng phòng HR | Ban Giám hiệu | CBGVNV mới |
| Khai báo Master Data & Gán Định mức Ratio Lớp | Chuyên viên HR / Academic BA | Academic Director | Hiệu trưởng Cơ sở | Giáo viên |
| Phân công Giảng dạy & Xếp Lịch Trực Tuần | Hiệu trưởng Cơ sở / Academic Mgr | Academic Director | HR Manager | Toàn thể GV |
| Điều động Giáo viên Dạy thay Khẩn cấp | Hiệu trưởng Cơ sở | Academic Director | HR Manager | GV Dạy thay |
| Chấm công Sinh trắc học & Phê duyệt Nghỉ phép | Toàn thể CBGVNV / BGH | Trưởng phòng HR | Kế toán Lương | BGH |
| Chốt Bảng Chấm công & Tích hợp Tính Lương | Chuyên viên C\&B | Trưởng phòng HR | CFO / Kế toán trưởng | Toàn thể CBGVNV |

*Ghi chú: Việc quản lý chứng chỉ hành nghề, bằng cấp sư phạm mầm non, định mức nhóm/lớp, hợp đồng lao động và tính lương/bảo hiểm xã hội cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo và Luật Lao động Việt Nam trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Khối/Lớp (ClassMaster), Khung Chương trình Đào tạo (CurriculumMaster), Ma trận Kỹ năng & Bằng cấp (TeacherQualificationMaster), Danh mục Ca làm việc (WorkShiftMaster).  
*   
* **Hồ sơ Bắt buộc:**  
* 

  1. Bằng cử nhân/cao đẳng Sư phạm Mầm non (hoặc Chứng chỉ Bồi dưỡng Nghiệp vụ Mầm non hợp lệ).  
  2.   
  3. Phiếu Lý lịch Tư pháp (hoặc Giấy xác nhận không tiền án tiền sự do cơ quan công an cấp).  
  4.   
  5. Giấy khám sức khỏe định kỳ (bao gồm xét nghiệm bệnh truyền nhiễm).  
  6.   
  7. Hợp đồng Lao động đã ký kết.  
  8.   
* **Approval prerequisite:** Hồ sơ Onboarding đạt trạng thái Safeguarding Verified \= YES trên ERP.  
* 

## **7\. Trigger**

* **Định kỳ Hàng tháng:** Ngày 21 hàng tháng (Chốt chu kỳ chấm công tính lương).  
*   
* **Định kỳ Hàng tuần:** 15:00 Thứ Sáu hàng tuần (Phát hành Lịch Phân công Giảng dạy tuần tiếp theo T+1).  
*   
* **Sự kiện Khẩn cấp:** Giáo viên nộp đơn xin nghỉ đột xuất trước 06:30 AM ngày làm việc.  
* 

## **8\. Quy trình AS-IS**

* Phòng HR lưu bằng cấp, chứng chỉ sư phạm của giáo viên dạng file cứng lưu tủ hoặc file Scan rải rác trên Google Drive.  
*   
* Hiệu trưởng cơ sở xếp lịch phân công giáo viên bằng bảng tính Excel riêng. Khi có giáo viên nghỉ đột xuất, Hiệu trưởng gọi điện hoặc nhắn tin Zalo tìm giáo viên dạy thay.  
*   
* Chấm công bằng máy vân tay độc lập không kết nối real-time với ERP.  
*   
* Chuyên viên C\&B cuối tháng tải dữ liệu máy chấm công ra file Excel, ngồi đối soát thủ công từng đơn xin nghỉ phép, cộng công trông muộn bằng tay.  
*   
* **Hệ quả:** Rủi ro vi phạm pháp lý do sử dụng giáo viên chưa đủ bằng cấp chuẩn; không kiểm soát được Tỷ lệ Giáo viên/Học sinh gây nguy cơ mất an toàn cho trẻ; sai lệch công phạt/phụ cấp trông muộn dẫn đến khiếu nại lương; tốn 4–6 ngày/tháng để chốt bảng lương.  
* 

## **9\. Pain Points / Risk**

* **Compliance & Child Safety Risk:** Giáo viên chưa qua thẩm định lý lịch tư pháp hoặc thiếu bằng cấp sư phạm bị xếp lịch đứng lớp, gây rủi ro pháp lý nặng nề khi có kiểm tra của Sở/Phòng GD&ĐT.  
*   
* **Operational Bottleneck:** Tắc nghẽn khi xếp lịch dạy thay khẩn cấp buổi sáng, dẫn đến lớp học thiếu giáo viên quản lý, vi phạm Tỷ lệ Ratio an toàn.  
*   
* **Fraud / Human Error:** Chấm công hộ, gian lận giờ trông muộn hoặc tính sai phụ cấp đứng lớp chuyên trách.  
*   
* **Data Fragmentation:** Dữ liệu bằng cấp, lịch phân công và chấm công nằm ở các file rác, không có Audit Trail theo dõi ai đã sửa ca làm việc.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận Onboarding, Thẩm định Bằng cấp & Thẩm định An toàn (Onboarding & Safeguarding)**

* **Step 01:**  
* 

  * **Actor:** Chuyên viên HR.  
  *   
  * **Action:** Tạo hồ sơ nhân sự mới (EmployeeProfile) trên ERP. Tải lên toàn bộ file Scan Bằng cấp Sư phạm, Phiếu Lý lịch tư pháp và Giấy khám sức khỏe.  
  *   
  * **ERP Function:** Employee Onboarding & Document Management.  
  *   
  * **Input:** Thông tin cá nhân, File Scan Bằng cấp, Chứng chỉ, Lý lịch tư pháp.  
  *   
  * **Output:** Hồ sơ nhân sự dạng Draft \+ Mã định danh EmployeeID duy nhất.  
  *   
  * **Business Rule:** BR-HR-001: Trường QualificationLevel (Cử nhân/Cao đẳng Sư phạm Mầm non) và SafeguardingStatus là bắt buộc.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Draft / Pending Verification.  
  *   
  * **SLA:** Complete trong 24 giờ kể từ khi nhận hồ sơ.  
  *   
  * **Notification:** Báo cáo gửi Trưởng phòng HR thẩm định.  
  *   
* **Step 02:**  
* 

  * **Actor:** Trưởng phòng HR & Academic Director.  
  *   
  * **Action:** Thẩm định tính hợp lệ của Bằng cấp và kết quả Lý lịch tư pháp. Bấm xác nhận Approve Safeguarding Clearance trên ERP.  
  *   
  * **ERP Function:** Teacher Qualification Verification Workflow.  
  *   
  * **Input:** Draft Employee Profile.  
  *   
  * **Output:** Hồ sơ Nhân sự xác minh thành công (Safeguarding Verified \= YES).  
  *   
  * **Business Rule:** BR-HR-002: Nhân sự chưa đạt Safeguarding Verified \= YES sẽ bị ERP **KHÓA CỨNG**, không cho phép gán vào bất kỳ Lịch Phân công Giảng dạy (Teaching Schedule) nào.  
  *   
  * **Status Before:** Draft / Pending Verification.  
  *   
  * **Status After:** Verified & Active.  
  *   
  * **SLA:** Max 4 giờ làm việc.  
  *   
  * **Notification:** Push Notification thông báo cho Hiệu trưởng Cơ sở nhân sự đã sẵn sàng nhận phân công.  
  * 

### **Giai đoạn 2: Phân công Giảng dạy & Cảnh báo Tỷ lệ Ratio (Scheduling & Ratio Control)**

* **Step 03:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở / Academic Manager.  
  *   
  * **Action:** Mở phân hệ Staff Scheduling, thực hiện phân công Giáo viên Chủ nhiệm, Giáo viên Phụ và Trợ giảng cho từng lớp học theo tuần/kỳ.  
  *   
  * **ERP Function:** Auto-Scheduling & Teacher-Student Ratio Checker.  
  *   
  * **Input:** Danh sách Lớp, Sĩ số Học sinh (SOP-ADM-003), Danh sách Giáo viên khả dụng.  
  *   
  * **Output:** Bảng Phân công Giảng dạy Tuần (Draft Schedule).  
  *   
  * **Business Rule:** BR-HR-003: ERP tự động tính toán Tỷ lệ Giáo viên/Học sinh (Current Ratio \= Sĩ số lớp / Số GV phân công). Nếu Ratio vượt ngưỡng quy định Bộ GD&ĐT (Ví dụ: Lớp Trẻ 12-24 tháng vượt 1 GV / 5 trẻ), ERP phát cảnh báo đỏ và khóa không cho xuất bản lịch.  
  *   
  * **Status Before:** Unassigned.  
  *   
  * **Status After:** Schedule Draft / Ratio Validated.  
  *   
  * **SLA:** Hoàn thành trước 15:00 Thứ Bảy hàng tuần.  
  *   
  * **Notification:** Pop-up cảnh báo trên màn hình nếu vi phạm Ratio.  
  *   
* **Step 04:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Bấm "Xuất bản Lịch Phân công" (Publish Schedule). Lịch tự động đồng bộ lên Mobile App của toàn bộ Giáo viên.  
  *   
  * **ERP Function:** Schedule Publishing Engine.  
  *   
  * **Input:** Draft Schedule.  
  *   
  * **Output:** Lịch làm việc chính thức (Published Schedule).  
  *   
  * **Status Before:** Schedule Draft.  
  *   
  * **Status After:** Schedule Published.  
  *   
  * **SLA:** 17:00 Thứ Bảy hàng tuần.  
  *   
  * **Notification:** Push Notification tới App Giáo viên: *"Lịch giảng dạy tuần \[Số Tuần\] đã được xuất bản"*.  
  * 

### **Giai đoạn 3: Điều động Giáo viên Dạy thay Khẩn cấp (Substitute Teacher Dispatch)**

* **Step 05:**  
* 

  * **Actor:** Giáo viên vắng mặt & ERP System.  
  *   
  * **Action:** Giáo viên bị ốm/đột xuất nộp Đơn xin nghỉ khẩn cấp (Emergency Leave Request) trên Mobile App trước 06:30 AM ngày làm việc.  
  *   
  * **ERP Function:** Emergency Leave & Auto Substitute Trigger.  
  *   
  * **Input:** Lý do nghỉ, Bằng chứng kèm theo (Giấy khám bệnh/Ảnh chụp).  
  *   
  * **Output:** Yêu cầu Tìm Giáo viên Dạy thay (Substitute Request).  
  *   
  * **Business Rule:** BR-HR-004: Ngay khi Đơn nghỉ khẩn cấp được nộp, ERP tự động hủy ca dạy của GV đó và quét danh sách Giáo viên dự phòng/Trợ giảng đang rảnh ca cùng cơ sở có cùng định chuẩn bằng cấp.  
  *   
  * **Status Before:** Assigned.  
  *   
  * **Status After:** Substitute Pending.  
  *   
  * **SLA:** Real-time (\<= 1 phút).  
  *   
  * **Notification:** High Priority Alert gửi Hiệu trưởng Cơ sở và gợi ý danh sách 03 Giáo viên thay thế tối ưu nhất.  
  *   
* **Step 06:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Chọn Giáo viên dạy thay trên ERP và bấm "Xác nhận Điều động".  
  *   
  * **ERP Function:** Substitute Allocation & Re-assignment.  
  *   
  * **Input:** Lựa chọn GV dạy thay.  
  *   
  * **Output:** Lịch dạy thay chính thức (Substitute Assigned).  
  *   
  * **Business Rule:** Công dạy thay (Substitute Allowance) tự động được cộng vào hồ sơ tính lương của Giáo viên dạy thay.  
  *   
  * **Status Before:** Substitute Pending.  
  *   
  * **Status After:** Substitute Assigned.  
  *   
  * **SLA:** Complete trước 07:15 AM.  
  *   
  * **Notification:** Notification khẩn gửi App Giáo viên dạy thay: *"Bạn được điều động dạy thay Lớp \[Tên Lớp\] hôm nay từ \[Giờ\] đến \[Giờ\]"*.  
  * 

### **Giai đoạn 4: Chấm công Sinh trắc học, Tự động Tính Công Trông muộn & Tích hợp Bảng lương (Attendance & Payroll)**

* **Step 07:**  
* 

  * **Actor:** Toàn thể CBGVNV & ERP System.  
  *   
  * **Action:** CBGVNV thực hiện Check-in/Check-out hàng ngày tại máy FaceID cổng trường hoặc App di động (kết nối GPS Geofencing cơ sở).  
  *   
  * **ERP Function:** Biometric Time Attendance Sync.  
  *   
  * **Input:** Dữ liệu khuôn mặt / Tọa độ GPS \+ Timestamp.  
  *   
  * **Output:** Nhật ký Chấm công Real-time (AttendanceLog).  
  *   
  * **Business Rule:** BR-HR-005: Tự động tính công trông muộn (Late Stay Allowance): Nếu học sinh trong lớp Check-out sau 17:30 (SOP-SIS-001), ERP tự động đối soát với thời gian Check-out của Giáo viên trả trẻ để ghi nhận chính xác phút trông muộn thực tế.  
  *   
  * **Status Before:** Pending Check-in.  
  *   
  * **Status After:** Attendance Recorded.  
  *   
  * **SLA:** Real-time sync qua Webhook.  
  *   
  * **Notification:** Push App cảnh báo nếu Check-in muộn quá 15 phút.  
  *   
* **Step 08:**  
* 

  * **Actor:** Chuyên viên C\&B (Phòng HR) & ERP System.  
  *   
  * **Action:** Ngày 21 hàng tháng, ERP chạy tiến trình Monthly Attendance Consolidation Job, tự động tổng hợp: Số ngày công chuẩn, Số giờ làm thêm, Số lượt dạy thay, Số phút trông muộn, Số ngày nghỉ phép được hưởng lương/không hưởng lương. Chuyên viên C\&B kiểm tra và bấm "Chốt Bảng Chấm Công".  
  *   
  * **ERP Function:** Auto Attendance Consolidation & Payroll Push.  
  *   
  * **Input:** Nhật ký chấm công, Đơn nghỉ phép đã duyệt, Lịch dạy thay.  
  *   
  * **Output:** Bảng Tổng hợp Chấm công (Approved Timecard) \-\> Đồng bộ dữ liệu sang Phân hệ Lương (Payroll Engine).  
  *   
  * **Business Rule:** Dữ liệu chấm công sau khi Chốt sẽ bị khóa cứng, tự động tính toán các khoản Phụ cấp Trông muộn, Phụ cấp Dạy thay, Phụ cấp Đứng lớp chuyên trách và đẩy thẳng sang Bảng lương.  
  *   
  * **Status Before:** Open Attendance Period.  
  *   
  * **Status After:** Attendance Closed & Payroll Synced.  
  *   
  * **SLA:** Hoàn tất trước 12:00 PM ngày 22 hàng tháng.  
  *   
  * **Notification:** Alert xác nhận gửi Kế toán trưởng & HR Manager.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Tiếp Nhận Nhân Sự Mới\]  
       │  
       ▼  
\[Tạo Hồ Sơ EmployeeProfile ──► Tải Bằng Cấp & Lý Lịch Tư Pháp\]  
       │  
       ▼  
\[HR Manager / Academic Dir: Thẩm Định Safeguarding Clearance\]  
       │  
       ◇ Đạt Chuẩn Bằng Cấp & Safeguarding?  
       ├─ NO  ──► \[Khóa Hồ Sơ / Chặn Không Cho Phân Công Giảng Dạy\]  
       └─ YES ──┐  
                │  
                ▼  
  \[Xếp Lịch Phân Công Giảng Dạy Tuần (Staff Scheduling)\]  
                │  
                ▼  
  \[ERP Auto-Check: Tỷ Lệ Giáo Viên/Học Sinh (Ratio Control)\]  
                │  
                ◇ Ratio Đạt Quy Định Bộ GD&ĐT?  
                ├─ NO  ──► \[Cảnh Báo Đỏ / Yêu Cầu Bổ Sung GV/Trợ Giảng\]  
                └─ YES ──┐  
                         │  
                         ▼  
          \[Xuất Bản Lịch Giảng Dạy Lên Mobile App Giáo Viên\]  
                         │  
                         ├─────────────────────────────────────────┐  
                         ▼ (Diễn biến hàng ngày)                  ▼ (Trường hợp nghỉ khẩn cấp)  
          \[Chấm Công FaceID / Geofencing\]          \[GV Nộp Đơn Nghỉ Khẩn Cấp trên App (trước 06:30 AM)\]  
                         │                                         │  
                         │                                         ▼  
                         │                         \[ERP Auto Scan GV Dự Phòng Khả Dụng\]  
                         │                                         │  
                         │                                         ▼  
                         │                         \[BGH Confirm Điều Động Substitute Teacher\]  
                         │                                         │  
                         ├─────────────────────────────────────────┘  
                         ▼  
          \[ERP Cross-Check Giờ Check-out Trẻ (SOP-SIS-001) ──► Tự Động Tính Phụ Cấp Trông Muộn\]  
                         │  
                         ▼ (Ngày 21 Hàng Tháng)  
          \[ERP Auto Consolidation Job ──► Chốt Bảng Chấm Công ──► Đồng Bộ Sang Payroll Engine\]  
                         │  
                         ▼  
                      \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-HR-001:** Mọi nhân sự đảm nhiệm vị trí Giáo viên Chủ nhiệm hoặc Giáo viên Bộ môn bắt buộc phải có Bằng tốt nghiệp Trung cấp/Cao đẳng/Đại học ngành Sư phạm Mầm non (hoặc Bằng chuyên ngành tương ứng kèm Chứng chỉ Bồi dưỡng Nghiệp vụ Sư phạm).  
*   
* **BR-HR-002:** Bắt buộc hoàn tất xác minh Lý lịch Tư pháp và Giấy khám sức khỏe (Safeguarding Status \= Cleared) trước khi phân công nhân sự đứng lớp. Nhân sự chưa Cleared tuyệt đối không được ở một mình với học sinh mà không có sự giám sát của nhân sự chính thức.  
*   
* **BR-HR-003:** Định mức Tỷ lệ Giáo viên/Học sinh (Teacher-Student Ratio Threshold) được cấu hình cứng theo quy định Bộ GD&ĐT:  
* 

  * *Nhà trẻ (06 \- 36 tháng):* Tối đa 3 đến 8 trẻ / 1 giáo viên (tùy độ tuổi chi tiết).  
  *   
  * *Mẫu giáo (3 \- 6 tuổi):* Tối đa 10 đến 15 trẻ / 1 giáo viên.  
  *   
  * Nếu tỷ lệ thực tế tại lớp vượt quá ngưỡng này, ERP tự động báo cờ đỏ Ratio Violation Alert và gửi cảnh báo tới Hiệu trưởng.  
  *   
* **BR-HR-004:** Đơn xin nghỉ phép đột xuất ngày làm việc phải được gửi trước **06:30 AM**. Đơn gửi sau 06:30 AM được tính là Nghỉ không phép (Unexcused Absence), trừ trường hợp bất khả kháng có xác nhận của BGH.  
*   
* **BR-HR-005:** Phụ cấp Trông muộn (Late Stay Allowance) chỉ được tính khi có đủ 2 điều kiện match đồng thời: (1) Học sinh thuộc lớp trách nhiệm có Timestamp Check-out trên ERP \> 17:30 và (2) Giáo viên trả trẻ có Timestamp Check-out thực tế trên máy chấm công \>= Timestamp Check-out của học sinh.  
* 

## **13\. Exception Cases**

* **Không tìm được Giáo viên Dạy thay cùng cơ sở buổi sáng:** ERP phát cảnh báo khẩn cấp tới Academic Manager điều động Giáo viên thuộc Đội ngũ Bay (Floating Teacher Pool) của Chuỗi từ cơ sở lân cận hoặc chỉ định Phó Hiệu trưởng Chuyên môn trực tiếp đứng lớp thay thế để đảm bảo Ratio.  
*   
* **Máy chấm công FaceID mất kết nối Internet:** Thiết bị FaceID lưu dữ liệu vào bộ nhớ Offline. Ngay khi có mạng trở lại, thiết bị tự động Sync dữ liệu về ERP. Nhân viên không bị mất công.  
*   
* **Giáo viên quên chấm công (Check-in/Check-out Missing):** Giáo viên tạo "Đơn Giải trình Chấm công" (Attendance Adjustment Request) trên App, kèm hình ảnh minh chứng/xác nhận của BGH. Đơn phải được BGH phê duyệt trước ngày chốt công (ngày 21\) mới được tính công.  
*   
* **Giáo viên bị đình chỉ công tác khẩn cấp (Child Protection Alert):** Khi có sự cố bảo vệ trẻ em, Admin bật cờ Suspended Flag trên ERP. Hệ thống ngay lập tức thu hồi toàn bộ quyền truy cập App, vô hiệu hóa thẻ từ/mã FaceID và xóa tên khỏi lịch phân công.  
* 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Hồ sơ Onboarding & Safeguarding Clearance | Chuyên viên HR | Trưởng phòng HR | Academic Director |
| Xuất bản Lịch Phân công Giảng dạy Tuần | Academic Manager | Hiệu trưởng Cơ sở | N/A |
| Duyệt Đơn xin Nghỉ phép Thông thường (\<= 2 ngày) | Hiệu trưởng Cơ sở | N/A | N/A |
| Duyệt Đơn xin Nghỉ phép Dài ngày (\> 2 ngày) | Hiệu trưởng Cơ sở | Trưởng phòng HR | N/A |
| Phê duyệt Điều động Giáo viên Dạy thay Khẩn cấp | System Auto Scan | Hiệu trưởng Cơ sở | N/A |
| Chốt Bảng Chấm công & Khóa Chu kỳ Lương | Chuyên viên C\&B | Trưởng phòng HR | CFO |

## **15\. Status Lifecycle**

* **Employee Status:** Draft \-\> Pending Safeguarding \-\> Verified & Active \-\> On Leave \-\> Suspended \-\> Terminated.  
*   
* **Teaching Schedule Status:** Draft \-\> Ratio Checked \-\> Published \-\> Substitute Modified \-\> Completed.  
*   
* **Attendance Status:** Pending \-\> Checked-In \-\> Checked-Out \-\> Regularized (Giải trình) \-\> Approved for Payroll.  
* 

## **16\. Data Model**

* **Primary Entity:** EmployeeProfile  
* 

  * EmployeeID (PK, String, Unique)  
  *   
  * FullName, DOB, Gender, NationalID, Phone, Email  
  *   
  * CampusID (FK, String), DepartmentID (FK), Position (Enum)  
  *   
  * QualificationLevel (Enum: Master, Bachelor, College, Certificate)  
  *   
  * SafeguardingStatus (Enum: Pending, Cleared, Rejected, Expired)  
  *   
  * EmploymentStatus (Enum: Probation, Official, Suspended, Resigned)  
  *   
* **Related Entities:**  
* 

  * TeacherQualification: QualificationID (PK), EmployeeID (FK), CertificateType, IssuingBody, IssueDate, ExpiryDate, VerificationDocumentURL.  
  *   
  * TeachingSchedule: ScheduleID (PK), CampusID (FK), ClassID (FK), EmployeeID (FK), Date (Date), ShiftType (Enum), Role (Enum: LeadTeacher, AssistantTeacher, Substitute), IsSubstitute (Boolean).  
  *   
  * TimeAttendanceLog: LogID (PK), EmployeeID (FK), Date (Date), CheckInTime (DateTime), CheckOutTime (DateTime), AuthMethod (Enum: FaceID, GPSApp, RFID), LateStayMinutes (Integer).  
  * 

## **17\. Forms / Documents**

* FRM-HR-001: Phiếu Tiếp nhận & Thẩm định Hồ sơ Nhân sự Mầm non (Onboarding & Safeguarding Checklist).  
*   
* FRM-HR-002: Bảng Phân công Giảng dạy & Trực Lớp Tuần (Class Teaching Schedule).  
*   
* FRM-HR-003: Đơn Xin Nghỉ phép & Đề xuất Dạy thay Khẩn cấp (Emergency Leave & Substitute Form).  
*   
* FRM-HR-004: Bảng Tổng hợp Chấm công & Phụ cấp Trông muộn Hàng tháng (Monthly Timecard & Allowance Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-HR-001 (MUST):** Hệ thống phải cung cấp Phân hệ Quản lý Bằng cấp (Teacher Qualification Module), cho phép lưu trữ, cảnh báo hạn hiệu lực của Giấy chứng nhận/Bằng cấp và bắt buộc hoàn tất xác minh Safeguarding Verified mới cho phép gán lịch giảng dạy.  
*   
* **FR-HR-002 (MUST):** Tích hợp Thuật toán Teacher-to-Student Ratio Engine: Tự động so sánh sĩ số học sinh thực tế của lớp với số lượng giáo viên được phân công để phát cảnh báo vi phạm quy định Bộ GD&ĐT.  
*   
* **FR-HR-003 (MUST):** Cung cấp tính năng Auto-Substitute Teacher Finder: Tự động tìm kiếm và đề xuất danh sách giáo viên dự phòng cùng cơ sở khi có đơn xin nghỉ phép khẩn cấp trước 06:30 AM.  
*   
* **FR-HR-004 (SHOULD):** Tích hợp tính năng Late Stay Cross-Matching: Tự động đối soát dữ liệu Check-out của học sinh (SOP-SIS-001) với giờ làm việc thực tế của giáo viên để tính phụ cấp trông muộn tự động.  
*   
* **FR-HR-005 (COULD):** Tích hợp chấm công di động qua GPS Geofencing tích hợp nhận diện khuôn mặt AI trên App Nhân viên.  
* 

## **19\. Automation Opportunities**

* **AUTO-HR-001 (RULE ENGINE):** Tự động khóa tính năng phân công giảng dạy đối với các nhân sự chưa đạt trạng thái Thẩm định An toàn (Safeguarding Cleared \= NO).  
*   
* **AUTO-HR-002 (WORKFLOW):** Tự động kích hoạt luồng tìm kiếm Giáo viên dạy thay và gửi Alert điều động khẩn cấp cho BGH khi giáo viên nộp đơn xin nghỉ đột xuất.  
*   
* **AUTO-HR-003 (INTEGRATION):** Tự động tổng hợp dữ liệu chấm công FaceID, công dạy thay, phút trông muộn và số ngày nghỉ phép để đồng bộ thẳng sang Payroll Engine vào mốc 12:00 PM ngày 22 hàng tháng.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc nhở Cập nhật Lý lịch tư pháp / Bằng cấp sắp hết hạn | Nhân viên & Phòng HR | Mobile App Push \+ Email | 30 ngày trước khi hết hạn |
| Phát hành Lịch Phân công Giảng dạy Tuần mới | Giáo viên | Mobile App Push | 17:00 Thứ Bảy hàng tuần |
| Cảnh báo Vi phạm Tỷ lệ Ratio Giáo viên/Học sinh | Hiệu trưởng & Academic Mgr | ERP High Alert \+ App Push | Immediate khi xếp lịch |
| Thông báo Điều động Dạy thay Khẩn cấp | Giáo viên dạy thay | Mobile App Push \+ SMS | Immediate khi BGH confirm |
| Cảnh báo Cần Giải trình Chấm công (Missing Punch) | Nhân viên | Mobile App Push | 08:00 AM ngày D+1 |

## **21\. Permission Matrix (RBAC)**

| Role | View Profile | Create/Edit Profile | Verify Safeguarding | Assign Schedule | Approve Leave | Access Payroll Data |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Chuyên viên HR | Full | Full | View Only | View Only | View Only | Read Only |
| Trưởng phòng HR | Full | Full | Full | View Only | Full | Full |
| Hiệu trưởng Cơ sở | Campus Only | Read Only | View Only | Full (Campus) | Full (Campus) | No |
| Academic Director | Full Enterprise | Read Only | Full | Full | Full | Read Only |
| Giáo viên / CBGVNV | Own Profile | Edit Personal | No | Own Schedule | Create Own | Own Paystub Only |

## **22\. Audit Trail**

Hệ thống bắt buộc ghi lại nhật ký Audit Log vĩnh viễn không thể xóa/sửa đối với:

* Người thực hiện bấm xác nhận Safeguarding Verified cho nhân sự (User ID, Timestamp, File bằng chứng đính kèm).  
*   
* Lịch sử thay đổi Bảng phân công giảng dạy (Ai thay đổi, Lý do thay đổi, Thời gian điều chỉnh).  
*   
* Nhật ký điều động Giáo viên dạy thay khẩn cấp (Thời gian nộp đơn nghỉ, Thời gian BGH xác nhận, Nhân sự dạy thay được chọn).  
*   
* Mọi thao tác chỉnh sửa/bổ sung dữ liệu chấm công thủ công (Manual Attendance Adjustment) bao gồm lý do và người phê duyệt.  
* 

## **23\. Internal Controls**

* **System Enforcement Control:** ERP chặn cứng tính năng cho phép xếp lịch giảng dạy đối với bất kỳ nhân sự nào thiếu bằng cấp sư phạm hoặc chưa có kết quả Thẩm định An toàn Trẻ em.  
*   
* **Dual Verification for Attendance Adjustment:** Đơn giải trình chấm công bổ sung bắt buộc phải có chữ ký điện tử xác nhận của Hiệu trưởng Cơ sở trước khi HR C\&B chốt công.  
*   
* **Cross-System Reconciliation:** Hệ thống tự động đối soát giờ trông muộn của Giáo viên với giờ Check-out thực tế của Học sinh trên Phân hệ SIS nhằm triệt tiêu hoàn toàn gian lận khai khống giờ trông muộn.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Thẩm định Safeguarding & Onboarding** | Thời gian từ khi nhận đủ hồ sơ đến khi Verify trên ERP | \<= 24 giờ | Trưởng phòng HR |
| **Tỷ lệ Tuân thủ Ratio Giáo viên/Học sinh** | (Số ca học đạt chuẩn Ratio / Tổng số ca học) \* 100 | **100% (Zero Tolerance)** | Hiệu trưởng Cơ sở |
| **SLA Xử lý Giáo viên Dạy thay Khẩn cấp** | Thời gian từ khi nhận đơn nghỉ đến khi chốt GV dạy thay | \<= 45 phút (trước 07:15 AM) | Hiệu trưởng Cơ sở |
| **Tỷ lệ Chốt Công Đúng Hạn (Timecard Accuracy)** | (Số bảng công chốt đúng hạn ngày 22 / Tổng cơ sở) \* 100 | **100%** | HR C\&B |

## **25\. Dashboard / Report**

* **HR Operational Dashboard (Phòng HR):** Bảng theo dõi tiến độ Onboarding nhân sự mới, Danh sách bằng cấp/lý lịch tư pháp sắp hết hạn, Báo cáo tỷ lệ nghỉ phép theo cơ sở.  
*   
* **Academic & Scheduling Dashboard (Hiệu trưởng / Academic Dir):** Bảng phân công giảng dạy real-time, Cảnh báo vi phạm Tỷ lệ Ratio Giáo viên/Học sinh, Báo cáo nhật ký dạy thay khẩn cấp.  
*   
* **C\&B & Executive Dashboard (CFO / Board):** Báo cáo tổng hợp quỹ lương/phụ cấp trông muộn, Báo cáo tỷ lệ biến động nhân sự (Turnover Rate), Báo cáo hiệu suất sử dụng định biên giáo viên.  
* 

## **26\. Integration**

* **Student Information System (SOP-SIS-001):** Tích hợp dữ liệu sĩ số lớp real-time để kiểm tra Tỷ lệ Ratio và đối soát giờ Check-out học sinh để tính phụ cấp trông muộn.  
*   
* **Biometric Access Control & Máy chấm công FaceID:** Kết nối API Webhook nhận dữ liệu chấm công thời gian thực.  
*   
* **Core Payroll & Finance Engine (Module 52 & 55):** Tự động đồng bộ số ngày công, phụ cấp, tiền phạt muộn sang bảng tính lương và hạch toán kế toán chi phí nhân sự.  
*   
* **Mobile App Nhân viên (Teacher/Staff App):** Cho phép xem lịch dạy, nộp đơn xin nghỉ, nhận thông báo điều động dạy thay và xem phiếu lương điện tử.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Phân công giáo viên chưa đủ bằng cấp/thẩm định lý lịch** | Critical | Low | ERP khóa cứng tính năng xếp lịch nếu Safeguarding Verified \= NO. | HR Manager & Academic Dir |
| **Thiếu giáo viên đứng lớp do nghỉ đột xuất, vi phạm Ratio** | High | Medium | Khớp lệnh Auto-Substitute Finder; Phát cảnh báo khẩn cấp cho BGH trước 07:15 AM. | Hiệu trưởng Cơ sở |
| **Gian lận khai khống giờ trông muộn để lấy phụ cấp** | Medium | Medium | ERP Cross-Matching giờ trông muộn của GV với giờ Check-out thực tế của trẻ từ SIS. | HR C\&B & IT System |
| **Sai sót dữ liệu chấm công khi chuyển sang Bảng lương** | Medium | Low | Tự động hóa 100% dòng dữ liệu chấm công FaceID \-\> Attendance Consolidation \-\> Payroll. | HR C\&B |

## **28\. Acceptance Criteria**

* **Given:** Chuyên viên HR khởi tạo hồ sơ cho Giáo viên A nhưng chưa tải lên Phiếu Lý lịch Tư pháp (Safeguarding Status \= Pending).  
*   
* **When:** Hiệu trưởng Cơ sở chọn Giáo viên A vào Lịch Phân công Giảng dạy Lớp Mẫu giáo B1.  
*   
* **Then:** ERP hiển thị cảnh báo lỗi: *"Nhân sự chưa hoàn tất Thẩm định An toàn Trẻ em (Safeguarding Clearance). Không thể phân công giảng dạy"*, đồng thời khóa không cho lưu lịch.  
*   
* **Given:** Giáo viên B nộp Đơn xin nghỉ khẩn cấp lúc 06:15 AM trên Mobile App.  
*   
* **When:** Hệ thống ERP tiếp nhận đơn xin nghỉ.  
*   
* **Then:** ERP tự động hủy ca làm việc của Giáo viên B, quét danh sách trợ giảng/giáo viên dự phòng khả dụng tại cơ sở và gửi Push Alert ưu tiên cao tới Hiệu trưởng đề xuất 03 nhân sự thay thế phù hợp trước 06:30 AM.  
* 

## **29\. Test Scenarios**

1. **Happy Path Test:** Tiếp nhận GV đủ bằng cấp \-\> Thẩm định Safeguarding Pass \-\> Xếp lịch dạy tuân thủ Ratio \-\> Chấm công FaceID chuẩn \-\> Tự động chốt công và đồng bộ sang Payroll.  
2.   
3. **Safeguarding Block Test:** Cố tình gán nhân sự có Safeguarding Status \= Pending hoặc Expired vào Lịch giảng dạy \-\> Kiểm tra xem ERP có chặn tuyệt đối không.  
4.   
5. **Ratio Violation Boundary Test:** Lớp Nhà trẻ có 16 học sinh (Chuẩn 1 GV / 5 trẻ \-\> Cần 3.2 \-\> 4 GV). Cố tình chỉ phân công 2 Giáo viên \-\> Kiểm tra ERP có bật cờ đỏ cảnh báo vi phạm Ratio không.  
6.   
7. **Emergency Substitute Dispatch Test:** Nộp đơn xin nghỉ phép khẩn cấp lúc 06:20 AM \-\> Kiểm tra xem ERP có chạy thuật toán quét GV dự phòng và gửi Alert cho BGH không.  
8.   
9. **Late Stay Cross-Matching Test:** Giáo viên Check-out lúc 18:00, nhưng học sinh cuối cùng của lớp Check-out lúc 17:15 \-\> Kiểm tra xem ERP có CHẶN KHÔNG TÍNH PHỤ CẤP TRÔNG MUỘN cho giáo viên đó không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận Tỷ lệ Ratio Giáo viên/Học sinh theo từng khối độ tuổi tuân thủ Bộ GD&ĐT; Cấu hình khung giờ trông muộn (sau 17:30); Cấu hình luồng duyệt đơn nghỉ phép.  
*   
* **Master Data Migration:** Import danh sách toàn bộ CBGVNV hiện hữu, chuẩn hóa mã định danh EmployeeID, quét và đính kèm lại toàn bộ Bằng cấp, Chứng chỉ Sư phạm và Phiếu Lý lịch tư pháp lên ERP.  
*   
* **Integration & Testing:** Tích hợp API Webhook với hệ thống Máy chấm công FaceID; Test thử nghiệm tính năng Auto-Substitute Finder dưới kịch bản giả lập 50 giáo viên nghỉ đột xuất cùng lúc toàn chuỗi.  
*   
* **Training & Change Management:** Tập huấn BGH quy trình thẩm định bằng cấp và duyệt dạy thay trên ERP; Hướng dẫn toàn thể Giáo viên thao tác nộp đơn xin nghỉ khẩn cấp và xem lịch giảng dạy trên Mobile App.  
* 

## **TÀI LIỆU MARKDOWN (.MD) VÀ LỘ TRÌNH TRIỂN KHAI BƯỚC TIẾP THEO**

Tài liệu **SOP-HR-001** đã được biên soạn hoàn chỉnh tuân thủ chính xác 100% cấu trúc 30 mục chuẩn mực Enterprise ERP, tích hợp đầy đủ các quy định về an toàn trẻ em (Safeguarding Clearance), tỷ lệ định biên giáo viên/học sinh của Bộ GD&ĐT và tự động hóa quy trình chấm công \- tính phụ cấp.

Mã file chuẩn: SOP-HR-001\_Quan\_Ly\_Ho\_So\_Bang\_Cap\_Giang\_Day\_Cham\_Cong\_Va\_Bang\_Luong.md.

# Thẻ 7

\# SOP-BUS-001 — QUY TRÌNH QUẢN LÝ LỘ TRÌNH XE BUS, ĐIỂM DANH HỌC SINH LÊN/XUỐNG XE (BUS ATTENDANCE) VÀ BẢO ĐẢM AN TOÀN TRÁNH BỎ QUÊN TRẺ

\#\# 1\. Thông tin tài liệu

\* \*\*SOP ID:\*\* SOP-BUS-001  
\* \*\*Tên SOP:\*\* Quy trình Quản lý Lộ trình Xe Bus, Điểm danh Học sinh Lên/Xuống Xe và Bảo đảm An toàn Tránh Bỏ quên Trẻ  
\* \*\*Module ERP:\*\* Transportation / School Bus (42), Route Management (43), Student Bus Attendance (44), Child Safeguarding (26), Parent Communication (62)  
\* \*\*Process Owner:\*\* Trưởng Bộ phận Vận chuyển / Trưởng BP An ninh & Dịch vụ Học đường  
\* \*\*Department:\*\* Khối Vận hành Học đường, Bộ phận Quản lý Xe Bus, Ban BGH  
\* \*\*Phiên bản:\*\* v1.0  
\* \*\*Trạng thái:\*\* Ready for Baseline  
\* \*\*Ngày hiệu lực:\*\* 01/09/2026  
\* \*\*Người soạn:\*\* Senior Business Analyst & ERP Functional Architect  
\* \*\*Người kiểm tra:\*\* Enterprise Architect & CTO  
\* \*\*Người phê duyệt:\*\* Giám đốc Vận hành (COO) / Board  
\* \*\*Chu kỳ review:\*\* 06 tháng/lần

\---

\#\# 2\. Mục đích

Chuẩn hóa toàn bộ hoạt động đưa đón học sinh mầm non bằng xe bus: từ lập kế hoạch lộ trình, tối ưu tuyến đường đón/trả, điểm danh real-time hai chiều (sáng \- chiều) khi trẻ bước lên và xuống xe, định vị vị trí xe bus theo thời gian thực cho phụ huynh, đến cơ chế kiểm tra an toàn 3 lớp (Bus Monitor Scan \+ Physical Rear Seat Check \+ ERP Safeguarding Cross-Match) nhằm \*\*triệt tiêu 100% rủi ro bỏ quên học sinh trên xe bus\*\*.

\---

\#\# 3\. Phạm vi áp dụng

\* \*\*Cơ sở:\*\* Tất cả các cơ sở mầm non thuộc hệ thống có cung cấp dịch vụ xe bus đưa đón (Đưa đón tận nhà \- Door-to-Door hoặc Đưa đón tại điểm cố định \- Point-to-Point).  
\* \*\*Phòng ban:\*\* Bộ phận Vận chuyển, Nhân viên Quản lý Xe bus (Bus Monitor), Lái xe (Driver), Bộ phận An ninh/Bảo vệ cổng, Giáo viên chủ nhiệm, Bộ phận Chăm sóc khách hàng, Ban Giám hiệu.  
\* \*\*Đối tượng:\*\* Tất cả học sinh mầm non đăng ký dịch vụ xe bus, Lái xe, Bus Monitor, Phụ huynh/Người giám hộ.  
\* \*\*Trường hợp không áp dụng:\*\* Chuyến xe di chuyển trong các hoạt động dã ngoại/ngoại khóa (áp dụng \`SOP-OPS-005: Quản lý Xe Bus Dã ngoại & Sự kiện\`).

\---

\#\# 4\. Thuật ngữ và định nghĩa

\* \*\*Bus Monitor (Nhân viên Quản lý Xe Bus):\*\* Cán bộ thuộc nhà trường đi cùng trên xe bus, chịu trách nhiệm trực tiếp chăm sóc, điểm danh, giao nhận trẻ với phụ huynh và bảo đảm an toàn cho trẻ trong suốt chuyến đi.  
\* \*\*End-of-Trip Physical Check (Kiểm tra Hàng ghế Cuối xe Bắt buộc):\*\* Quy trình kiểm tra vật lý bắt buộc sau khi toàn bộ học sinh đã xuống xe. Lái xe và Bus Monitor phải trực tiếp đi xuống tận hàng ghế cuối cùng của xe, kiểm tra từng gầm ghế/hàng ghế, sau đó quét mã QR Code cố định dán ở hàng ghế cuối cùng để xác nhận không còn trẻ trên xe trước khi hệ thống cho phép đóng chuyến (\`Close Trip\`).  
\* \*\*Geofencing Alert (Cảnh báo Vùng địa lý):\*\* Tính năng tự động phát tín hiệu Push Notification tới Mobile App của Phụ huynh khi xe bus di chuyển vào bán kính 500m quanh điểm đón/trả.  
\* \*\*Bus Safeguarding Cross-Check:\*\* Thuật toán tự động đối soát dữ liệu điểm danh xe bus với dữ liệu điểm danh cổng trường và điểm danh lớp học lúc 09:15 AM nhằm phát hiện ngay lập tức trường hợp sai lệch sĩ số.

\---

\#\# 5\. Vai trò và trách nhiệm (RACI)

| Activity | Responsible | Accountable | Consulted | Informed |  
| \--- | \--- | \--- | \--- | \--- |  
| Quy hoạch Lộ trình & Phân công Lái xe/Monitor | Giám sát Vận chuyển | Trưởng BP Vận chuyển | Hiệu trưởng Cơ sở | Phụ huynh |  
| Đón Trẻ & Điểm danh Lên Xe (Buổi sáng) | Bus Monitor | Trưởng BP Vận chuyển | Phụ huynh | GVCN / Bảo vệ |  
| Bàn giao Trẻ tại Trường & Check-out Xe | Bus Monitor & Bảo vệ Cổng | Trưởng BP Vận chuyển | Y tế học đường | GVCN / BGH |  
| Kiểm tra Hàng ghế Cuối xe (End-of-Trip Check) | Driver & Bus Monitor | Trưởng BP Vận chuyển | Safety Officer | Hiệu trưởng |  
| Giám sát GPS Real-time & Xử lý Sự cố | Giám sát Vận chuyển / IT | Trưởng BP Vận chuyển | BGH | Phụ huynh |

\> \*Ghi chú: Việc vận hành xe đưa đón học sinh mầm non, tiêu chuẩn an toàn kỹ thuật phương tiện, thiết bị giám sát hành trình (GPS) và trách nhiệm của lái xe/nhân viên đưa đón cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giao thông Vận tải và Bộ Giáo dục & Đào tạo (Luật Trật tự, an toàn giao thông đường bộ và các thông tư hướng dẫn) trước khi áp dụng chính thức.\*

\---

\#\# 6\. Điều kiện đầu vào

\* \*\*Master Data:\*\* Danh mục Lộ trình (\`BusRouteMaster\`), Danh mục Điểm đón/trả (\`BusStopMaster\`), Danh sách Xe bus (\`BusVehicleMaster\`), Danh sách Lái xe & Bus Monitor (\`BusStaffMaster\`), Danh sách Học sinh đi xe (\`StudentBusRoster\`).  
\* \*\*Thiết bị & Hạ tầng:\*\*  
1\. Thiết bị GPS Tracker lắp cố định trên xe bus kết nối API real-time với ERP.  
2\. Mã QR Code niêm phong kiểm tra an toàn dán tại hàng ghế cuối cùng trên xe.  
3\. Mobile App Bus Monitor (được trang bị Tablet/Smartphone kết nối 4G/5G).

\* \*\*Approval Prerequisite:\*\* Học sinh đã hoàn tất đăng ký dịch vụ bus, được xác nhận đóng phí trên ERP (\`SOP-FIN-001\`) và Phụ huynh đã ký Cam kết An toàn Xe bus.

\---

\#\# 7\. Trigger

\* \*\*Buổi sáng (06:15 AM):\*\* Kích hoạt Chuyến xe Đưa học sinh đến Trường (\`Morning Pickup Trip\`).  
\* \*\*Buổi chiều (16:15 PM):\*\* Kích hoạt Chuyến xe Đưa học sinh về Nhà (\`Afternoon Drop-off Trip\`).

\---

\#\# 8\. Quy trình AS-IS

\* Bus Monitor cầm danh sách in giấy, dùng bút mực tích v theo tên học sinh khi trẻ bước lên xe.  
\* Lái xe di chuyển theo kinh nghiệm, khi gặp tắc đường hoặc đến muộn thì gọi điện/nhắn tin riêng cho từng phụ huynh.  
\* Khi xe đến cổng trường, Bus Monitor hô các bé tự bước xuống xe, dẫn bé vào sân trường rồi bàn giao chung cho giáo viên trực cổng.  
\* Lái xe lái phương tiện về bãi đỗ, tắt máy, khóa cửa rời đi mà không bước xuống cuối xe kiểm tra lại.  
\* \*\*Hệ quả:\*\* Rủi ro chí mạng bỏ quên trẻ ngủ quên trên xe bus; Phụ huynh hoảng loạn do không biết vị trí chính xác của xe; thiếu nhật ký đối soát pháp lý khi phát sinh sự cố sai lệch sĩ số; thất thoát chi phí do chạy sai lộ trình.

\---

\#\# 9\. Pain Points / Risk

\* \*\*Critical Safeguarding Risk (Mối nguy An toàn Chí mạng):\*\* Trẻ ngủ quên ở hàng ghế sau hoặc chui xuống gầm ghế bị bỏ quên khi xe đóng cửa đỗ ngoài trời nắng gắt.  
\* \*\*Lack of Real-time Visibility:\*\* Phụ huynh và Ban Giám hiệu hoàn toàn "mù" thông tin lộ trình xe bus trong suốt 1–2 tiếng di chuyển.  
\* \*\*Human Error in Attendance:\*\* Bus Monitor điểm danh sót, tích nhầm tên học sinh hoặc điểm danh "khống" từ xa.  
\* \*\*Communication Breakdown:\*\* Phụ huynh đưa con ra điểm đón muộn gây trễ toàn bộ lộ trình của các học sinh còn lại trên tuyến.  
\* \*\*No Cross-System Sync:\*\* Dữ liệu học sinh lên xe không đồng bộ với Dữ liệu điểm danh tại lớp học (\`SOP-SIS-001\`).

\---

\#\# 10\. Quy trình TO-BE

\#\#\# Giai đoạn 1: Chuẩn bị Chuyến xe & Khởi động Hệ thống (Trip Initialization & Pre-Check)

\* \*\*Step 01:\*\*  
\* \*\*Actor:\*\* Driver & Bus Monitor.  
\* \*\*Action:\*\* Trước giờ khởi hành 15 phút, Driver thực hiện kiểm tra an toàn kỹ thuật xe (Phanh, lốp, điều hòa, camera, thiết bị GPS). Bus Monitor mở Mobile App Bus Monitor, chọn Chuyến xe tương ứng và bấm "Khởi động Chuyến xe" (\`Start Trip\`).  
\* \*\*ERP Function:\*\* \`Trip Initialization & Vehicle Safety Pre-Check\`.  
\* \*\*Input:\*\* Xe ID, Driver ID, Monitor ID, Tọa độ GPS bắt đầu.  
\* \*\*Output:\*\* Chuyến xe chuyển trạng thái \`In Progress\`. GPS Tracker kích hoạt phát dữ liệu định vị 5 giây/lần.  
\* \*\*Business Rule:\*\* \`BR-BUS-001\`: Xe bus chỉ được phép di chuyển khi thiết bị GPS hoạt động bình thường và Bus Monitor đã bấm "Start Trip" trên App.  
\* \*\*Status Before:\*\* \`Scheduled\`.  
\* \*\*Status After:\*\* \`Trip In Progress\`.  
\* \*\*SLA:\*\* Complete trước giờ khởi hành 10 phút.  
\* \*\*Notification:\*\* Tín hiệu GPS kích hoạt màn hình Tracking trên Dashboard Bộ phận Vận chuyển.

\#\#\# Giai đoạn 2: Đón Trẻ, Điểm danh Lên Xe & Cảnh báo Geofencing (Pickup & Bus Attendance)

\* \*\*Step 02:\*\*  
\* \*\*Actor:\*\* ERP System (\`Geofencing Engine\`).  
\* \*\*Action:\*\* Khi xe bus di chuyển vào bán kính 500m tính từ Điểm đón/trả của học sinh, ERP tự động gửi thông báo Push Notification tới điện thoại Phụ huynh.  
\* \*\*ERP Function:\*\* \`Automated Geofencing Alert\`.  
\* \*\*Input:\*\* Tọa độ GPS xe bus real-time \+ Tọa độ Bus Stop.  
\* \*\*Output:\*\* Thông báo Geofencing phát đi.  
\* \*\*Business Rule:\*\* Tự động tính toán thời gian dự kiến xe đến (\`ETA \- Estimated Time of Arrival\`) cập nhật liên tục trên App Phụ huynh.  
\* \*\*Status Before:\*\* \`Transit\`.  
\* \*\*Status After:\*\* \`Approaching Stop\`.  
\* \*\*SLA:\*\* Real-time (Trễ \<= 3 giây).  
\* \*\*Notification:\*\* Push App Phụ huynh: \*"Xe bus \[Biển số\] còn cách điểm đón khoảng 500m (Dự kiến đến sau 3 phút). Xin Phụ huynh chuẩn bị\!"\*.

\* \*\*Step 03:\*\*  
\* \*\*Actor:\*\* Bus Monitor & Phụ huynh.  
\* \*\*Action:\*\* Xe dừng tại điểm đón. Bus Monitor đón trẻ, thực hiện quét Thẻ từ RFID / Mã QR trên Balo học sinh hoặc chọn Xác thực Khuôn mặt (FaceID) / Chụp ảnh chân dung học sinh bước lên xe trên App.  
\* \*\*ERP Function:\*\* \`Student On-Board Check-in\`.  
\* \*\*Input:\*\* Mã định danh Học sinh, Ảnh chụp khoảnh khắc lên xe, Tọa độ GPS.  
\* \*\*Output:\*\* Trạng thái học sinh đổi sang \`On Board\` \+ Timestamp.  
\* \*\*Business Rule:\*\* \`BR-BUS-002\`: Nếu học sinh vắng mặt tại điểm đón quá \*\*03 phút\*\* mà Phụ huynh không báo nghỉ trên App trước đó, Bus Monitor bấm "Nghỉ Không Báo" (\`Unannounced Absence\`). App tự động gọi điện khẩn cấp (IVR Auto-Call) tới Phụ huynh và thông báo cho xe tiếp tục di chuyển.  
\* \*\*Status Before:\*\* \`Scheduled Pickup\`.  
\* \*\*Status After:\*\* \`On Board\` (hoặc \`Absent\`).  
\* \*\*SLA:\*\* \<= 15 giây / học sinh.  
\* \*\*Notification:\*\* Push App Phụ huynh: \*"Bé \[Tên\] đã lên xe bus lúc \[Giờ\]. Lộ trình đang tiếp tục an toàn."\*.

\#\#\# Giai đoạn 3: Trả Trẻ tại Trường, Bàn giao Cổng & Kiểm tra Hàng ghế Cuối xe Bắt buộc (Arrival & Safety Verification)

\* \*\*Step 04:\*\*  
\* \*\*Actor:\*\* Bus Monitor, Driver & Bảo vệ Cổng trường.  
\* \*\*Action:\*\* Xe bus cập bến trường. Bus Monitor dẫn học sinh xuống xe. Tại cửa xe/cổng trường, Bus Monitor quét mã Check-out xe bus cho từng trẻ. Bảo vệ cổng trường quét mã xác nhận tiếp nhận học sinh vào khuôn viên trường.  
\* \*\*ERP Function:\*\* \`Bus Check-out & Campus Gate Handover\`.  
\* \*\*Input:\*\* QR Code / RFID Học sinh.  
\* \*\*Output:\*\* Trạng thái học sinh chuyển sang \`Campus Checked-in\`.  
\* \*\*Business Rule:\*\* \`BR-BUS-003\`: Sĩ số học sinh Check-out khỏi xe bus phải \*\*KHỚP 100%\*\* với sĩ số học sinh đã Check-in lên xe buổi sáng.  
\* \*\*Status Before:\*\* \`On Board\`.  
\* \*\*Status After:\*\* \`Campus Checked-in\`.  
\* \*\*SLA:\*\* Complete trong 5 phút từ khi xe dừng.  
\* \*\*Notification:\*\* Push App Phụ huynh: \*"Bé \[Tên\] đã đến trường và bước vào cổng an toàn lúc \[Giờ\]"\*.

\* \*\*Step 05 (CRITICAL):\*\*  
\* \*\*Actor:\*\* Driver & Bus Monitor.  
\* \*\*Action:\*\* Sau khi học sinh cuối cùng đã xuống xe, Lái xe và Bus Monitor \*\*BẮT BUỘC\*\* phải đi xuống tận hàng ghế cuối cùng trên xe, kiểm tra từng gầm ghế, khe ghế và hộc chứa đồ. Sau đó, Bus Monitor dùng App \*\*QUÉT MÃ QR CODE CỐ ĐỊNH DÁN TẠI HÀNG GHẾ CUỐI CÙNG\*\* của xe bus.  
\* \*\*ERP Function:\*\* \`End-of-Trip Physical QR Verification Engine\`.  
\* \*\*Input:\*\* Mã QR Hàng ghế Cuối xe \+ Ảnh chụp toàn cảnh khoang xe từ hàng ghế cuối \+ Tọa độ GPS đỗ xe.  
\* \*\*Output:\*\* Xác nhận Kiểm tra An toàn Hoàn tất (\`Physical Safety Check Passed\`).  
\* \*\*Business Rule:\*\* \`BR-BUS-CRITICAL\`: Hệ thống ERP \*\*TUYỆT ĐỐI KHÔNG CHO PHÉP ĐÓNG CHUYẾN XE (\`Close Trip\`)\*\* nếu chưa nhận được mã quét QR Hàng ghế Cuối xe. Trong vòng 10 phút sau khi trẻ cuối cùng Check-out, nếu chưa quét QR cuối xe, ERP tự động \*\*BẬT CÒI BÁO ĐỘNG ĐỎ (LOUD ALARM)\*\* trên điện thoại Trưởng BP Vận chuyển, Hiệu trưởng và Bảo vệ trường.  
\* \*\*Status Before:\*\* \`Handover Completed\`.  
\* \*\*Status After:\*\* \`Safety Verified & Trip Closed\`.  
\* \*\*SLA:\*\* Trong vòng 5 phút sau khi trả hết học sinh.  
\* \*\*Notification:\*\* Alert xác nhận "Chuyến xe \[Mã Xe\] đã kiểm tra an toàn 100% không còn trẻ" gửi Trưởng BP Vận chuyển.

\#\#\# Giai đoạn 4: ERP Cross-Match Safeguarding (Đồng bộ & Báo động Sai lệch Sĩ số)

\* \*\*Step 06:\*\*  
\* \*\*Actor:\*\* ERP System (\`Safeguarding Cross-Match Engine\`).  
\* \*\*Action:\*\* Đúng 09:15 AM (sau khi \`SOP-SIS-001\` hoàn tất điểm danh lớp học), ERP chạy thuật toán tự động so sánh 3 nguồn dữ liệu: (1) Danh sách học sinh Check-in Bus \-\> (2) Danh sách Check-in Cổng \-\> (3) Danh sách Điểm danh tại Lớp.  
\* \*\*ERP Function:\*\* \`3-Way Attendance Reconciliation\`.  
\* \*\*Input:\*\* Log \`BusAttendance\`, Log \`GateAttendance\`, Log \`ClassAttendance\`.  
\* \*\*Output:\*\* Báo cáo Khớp sĩ số hoặc Cảnh báo Bất thường (\`Missing Child Alert\`).  
\* \*\*Business Rule:\*\* \`BR-BUS-004\`: Nếu có bất kỳ học sinh nào có trạng thái \`Bus On Board \= YES\` nhưng \`Class Checked-in \= NO\`, ERP tự động kích hoạt Cảnh báo Báo động Khẩn cấp cấp độ 1 (Level 1 Emergency Alert) tới Toàn bộ Ban Giám hiệu và Bảo vệ trường.  
\* \*\*Status Before:\*\* \`Reconciling\`.  
\* \*\*Status After:\*\* \`Reconciled / Alert Triggered\`.  
\* \*\*SLA:\*\* Real-time tại mốc 09:15 AM.  
\* \*\*Notification:\*\* Báo động âm thanh khẩn \+ Pop-up đỏ trên tất cả thiết bị BGH/Bảo vệ.

\---

\#\# 11\. Workflow

\`\`\`  
\[BẮT ĐẦU: 06:15 AM \- Khởi Động Chuyến Xe\]  
       │  
       ▼  
\[Driver & Monitor Kiểm Tra Xe ──► Bấm "Start Trip" trên App ──► GPS Bật Real-time\]  
       │  
       ▼  
\[Xe Di Chuyển Đến Điểm Đón ──► ERP Phát Geofencing Push (Cách 500m)\]  
       │  
       ▼  
\[Đón Trẻ Tại Điểm: Bus Monitor Quét QR/RFID/FaceID ──► Status: "On Board"\]  
       │  
       ◇ Phụ huynh không đưa trẻ ra điểm đón (\> 3 phút)?  
       ├─ YES ──► \[Bấm "Unannounced Absence" ──► Auto-Call Phụ Huynh ──► Xe Đi Tiếp\]  
       └─ NO  ──┐  
                │  
                ▼  
  \[Xe Đến Trường: Trả Trẻ Tại Cổng ──► Quét Check-out Bus ──► Security Quét Nhập Cổng\]  
                │  
                ▼  
  \[BƯỚC CHÍ MẠNG (CRITICAL STEP): Kiểm Tra Hàng Ghế Cuối Xe\]  
  \[Driver & Monitor Đi Xuống Cuối Xe ──► Kiểm Tra Từng Hàng Ghế ──► Quét Mã QR Cuối Xe\]  
                │  
                ◇ Đã Quét Mã QR Hàng Ghế Cuối Xe?  
                ├─ NO (Quá 10 phút) ──► \[ERP BẬT CÒI BÁO ĐỘNG ĐỎ VỀ BGH & TRƯỞNG VẬN CHUYỂN\]  
                └─ YES ───────────────┐  
                                      │  
                                      ▼  
                        \[ERP Cho Phép "Close Trip"\]  
                                      │  
                                      ▼  
  \[09:15 AM: ERP Cross-Match Engine So Sánh Bus Attendance vs Class Attendance\]  
                                      │  
                                      ◇ Có Sai Lệch Sĩ Số (Bus \= YES, Class \= NO)?  
                                      ├─ YES ──► \[KÍCH HOẠT BÁO ĐỘNG KHẨN CẤP CẤP ĐỘ 1\]  
                                      └─ NO  ──► \[Chuyến Xe Hoàn Tất 100% An Toàn\]  
                                               │  
                                               ▼  
                                           \[KẾT THÚC\]

\`\`\`

\---

\#\# 12\. Business Rules

\* \*\*BR-BUS-001:\*\* Xe bus tuyệt đối không được xuất bến nếu chưa kích hoạt thiết bị GPS định vị và Bus Monitor chưa bấm "Start Trip" trên App. Bàn làm việc Vận chuyển sẽ nhận Alert nếu xe di chuyển vượt quá 10km/h mà không có Chuyến xe ở trạng thái \`In Progress\`.  
\* \*\*BR-BUS-002:\*\* Điểm danh học sinh bước lên/xuống xe phải thực hiện bằng thiết bị điện tử (Quét RFID / QR / FaceID / Chụp ảnh chân dung). Tuyệt đối không điểm danh bằng sổ giấy hoặc đánh dấu thủ công không có vết định vị GPS.  
\* \*\*BR-BUS-CRITICAL (BR-BUS-003):\*\* Mã QR Code kiểm tra hàng ghế cuối xe là mã tĩnh duy nhất được dán cố định tại vị trí hàng ghế cuối cùng của từng xe. Hệ thống ERP chặn cứng tính năng \`Close Trip\` nếu thiếu dữ liệu quét mã QR này kèm tọa độ GPS trùng khớp với bãi đỗ xe của trường.  
\* \*\*BR-BUS-004:\*\* Tốc độ tối đa quy định đối với xe đưa đón học sinh mầm non là \*\*50 km/h\*\* trong đô thị. Nếu lái xe chạy vượt quá tốc độ quy định hoặc phanh gấp đột ngột, thiết bị GPS tự động phát cảnh báo còi trên xe và gửi Báo cáo Vi phạm An toàn về Trưởng BP Vận chuyển.  
\* \*\*BR-BUS-005:\*\* Phụ huynh có quyền đăng ký Nghỉ đi Xe bus trong buổi (\`Cancel Bus Trip\`) trực tiếp trên Mobile App trước giờ xe đến điểm đón ít nhất \*\*30 phút\*\*. Hệ thống sẽ tự động bỏ qua điểm đón đó trong lộ trình của Chuyến xe.

\---

\#\# 13\. Exception Cases

\* \*\*Học sinh ngủ quên trên xe bus:\*\*  
\* \*Xử lý:\* Quy trình quét mã QR Hàng ghế Cuối xe bắt buộc Lái xe/Monitor phải đi xuống tận nơi, phát hiện trẻ ngủ quên, đánh thức trẻ dậy và đưa vào Trường an toàn trước khi đóng chuyến.

\* \*\*Xe bus bị hỏng hóc / Tai nạn giữa đường:\*\*  
\* \*Xử lý:\* Lái xe bấm nút "Emergency Alert" trên App. ERP lập tức điều động Xe dự phòng (\`Backup Bus\`) từ điểm lân cận, đồng thời tự động gửi thông báo xin lỗi kèm lộ trình mới và vị trí GPS của xe dự phòng tới toàn bộ Phụ huynh trên tuyến.

\* \*\*Phụ huynh không có mặt tại điểm trả trẻ (Buổi chiều):\*\*  
\* \*Xử lý:\* Sau 05 phút chờ đợi tại điểm trả, Bus Monitor bấm "Parent Not Present". Xe tiếp tục di chuyển trả các trẻ tiếp theo. Học sinh này sẽ được đưa trở lại Trường, bàn giao cho Bộ phận Trông muộn (\`SOP-SIS-001\`) và ERP tự động ghi nhận khoản Phí trông muộn do Phụ huynh đón chậm.

\* \*\*Thiết bị 4G / Tablet của Bus Monitor mất mạng:\*\*  
\* \*Xử lý:\* App Bus Monitor tự động chuyển sang \`Offline Caching Mode\`. Toàn bộ thao tác quét QR/chụp ảnh vẫn được lưu vào bộ nhớ cục bộ đính kèm Timestamp hệ thống. Ngay khi có mạng trở lại, App tự động đồng bộ bù (Auto-Sync) về Cloud ERP.

\---

\#\# 14\. Approval Matrix

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |  
| \--- | \--- | \--- | \--- |  
| Đăng ký / Hủy Dịch vụ Xe Bus Cố định | App Phụ huynh | Giám sát Vận chuyển | Kế toán Phí |  
| Điều chỉnh Lộ trình / Điểm đón Cố định | Giám sát Vận chuyển | Trưởng BP Vận chuyển | N/A |  
| Điều động Xe Dự phòng / Thay đổi Lái xe Khẩn cấp | Giám sát Vận chuyển | Trưởng BP Vận chuyển | Hiệu trưởng Cơ sở |  
| Xử lý Báo động Bỏ quên Trẻ (Safeguarding Alert) | Trưởng BP Vận chuyển | Hiệu trưởng Cơ sở | Giám đốc Điều hành (CEO) |

\---

\#\# 15\. Status Lifecycle

\* \*\*Bus Trip Status:\*\* \`Scheduled\` \-\> \`In Progress\` \-\> \`Arrived at Campus\` \-\> \`Safety Verified (QR Passed)\` \-\> \`Completed\`.  
\* \*\*Student Bus Attendance Status:\*\* \`Scheduled\` \-\> \`On Board\` \-\> \`Dropped at Campus\` \-\> \`Dropped at Home\` \-\> \`Absent (Excused)\` \-\> \`Absent (Unannounced)\`.

\---

\#\# 16\. Data Model

\* \*\*Primary Entity:\*\* \`BusTrip\`  
\* \`TripID\` (PK, String, Unique)  
\* \`RouteID\` (FK, String), \`VehicleID\` (FK, String)  
\* \`DriverID\` (FK), \`MonitorID\` (FK)  
\* \`TripDate\` (Date), \`TripType\` (Enum: Morning\_Pickup, Afternoon\_Dropoff)  
\* \`StartTime\` (DateTime), \`EndTime\` (DateTime)  
\* \`RearQRVerificationTime\` (DateTime), \`RearQRVerifiedBy\` (FK)  
\* \`TripStatus\` (Enum: Scheduled, In\_Progress, Arrived, Safety\_Verified, Completed)

\* \*\*Related Entities:\*\*  
\* \`StudentBusAttendance\`: \`AttendanceID\` (PK), \`TripID\` (FK), \`StudentID\` (FK), \`BusStopID\` (FK), \`CheckInTime\` (DateTime), \`CheckInGPS\` (String), \`CheckOutTime\` (DateTime), \`CheckOutGPS\` (String), \`BoardingStatus\` (Enum).  
\* \`BusGPSLog\`: \`LogID\` (PK), \`TripID\` (FK), \`Timestamp\` (DateTime), \`Latitude\` (Decimal), \`Longitude\` (Decimal), \`Speed\` (Decimal).  
\* \`BusSafetyCheckLog\`: \`CheckID\` (PK), \`TripID\` (FK), \`RearQRCodeScanned\` (Boolean), \`CapturedPhotoURL\` (String), \`InspectorID\` (FK), \`Timestamp\` (DateTime).

\---

\#\# 17\. Forms / Documents

\* \`FRM-BUS-001\`: Đơn Đăng ký Dịch vụ Xe Bus Đưa đón Học sinh.  
\* \`FRM-BUS-002\`: Phiếu Kiểm tra An toàn Kỹ thuật Xe Bus Hàng ngày (Pre-Trip Inspection Checklist).  
\* \`FRM-BUS-003\`: Sổ Nhật ký Vận hành & Bàn giao Trẻ Xe Bus Điện tử (Digital Bus Roster Log).  
\* \`FRM-BUS-004\`: Biên bản Ghi nhận Sự cố Vận tải & An toàn Xe Bus (Bus Incident Log).

\---

\#\# 18\. ERP Functional Requirements

\* \*\*FR-BUS-001 (MUST):\*\* App Bus Monitor phải cho phép điểm danh bằng Mã QR/RFID hoặc Khuôn mặt (FaceID), hỗ trợ chụp ảnh chân dung xác thực khoảnh khắc trẻ lên/xuống xe và lưu tọa độ GPS thực tế.  
\* \*\*FR-BUS-002 (MUST):\*\* Tích hợp SDK/API thiết bị GPS Tracking để hiển thị luồng di chuyển xe bus real-time trên bản đồ của App Phụ huynh và Dashboard Quản lý Vận chuyển.  
\* \*\*FR-BUS-003 (MUST \- CRITICAL):\*\* Khóa logic hệ thống: Chặn tuyệt đối nút "Close Trip" trên App nếu thiết bị chưa quét thành công mã QR Code hàng ghế cuối xe bus.  
\* \*\*FR-BUS-004 (MUST):\*\* Kích hoạt Thuật toán \`3-Way Attendance Cross-Check\` lúc 09:15 AM tự động đối soát sĩ số xe bus với điểm danh cổng trường và điểm danh lớp học.  
\* \*\*FR-BUS-005 (SHOULD):\*\* Tính năng tự động gọi điện thông báo qua tổng đài IVR tới Phụ huynh khi trẻ không có mặt tại điểm đón quá 03 phút.

\---

\#\# 19\. Automation Opportunities

\* \*\*AUTO-BUS-001 (INTEGRATION):\*\* Tự động phát thông báo Geofencing Push Notification cho Phụ huynh khi xe bus di chuyển vào bán kính 500m quanh điểm đón/trả.  
\* \*\*AUTO-BUS-002 (RULE ENGINE):\*\* Tự động kích hoạt Báo động Còi Báo động Đỏ vĩnh viễn trên điện thoại BGH nếu sau 10 phút trả hết trẻ mà chưa có dữ liệu quét mã QR hàng ghế cuối xe.  
\* \*\*AUTO-BUS-003 (WORKFLOW):\*\* Tự động chuyển trạng thái học sinh sang \`Campus Checked-in\` trên hệ thống SIS ngay khi Bus Monitor hoàn tất quét Check-out trả trẻ tại cổng trường.

\---

\#\# 20\. Notification Matrix

| Event | Recipient | Channel | Timing |  
| \--- | \--- | \--- | \--- |  
| Xe bus sắp đến điểm đón (Bán kính 500m) | Phụ huynh | Mobile App Push | Immediate (Geofencing) |  
| Xác nhận Trẻ đã lên xe bus an toàn | Phụ huynh | Mobile App Push | Real-time (Ngay khi quét QR) |  
| Cảnh báo Trẻ không có mặt tại điểm đón | Phụ huynh | IVR Call \+ Push App | Sau 03 phút chờ tại điểm |  
| CẢNH BÁO CHƯA QUÉT QR HÀNG GHẾ CUỐI XE | Trưởng Vận chuyển & BGH | Loud Alarm \+ SMS \+ Push | 10 phút sau khi trả trẻ |  
| CẢNH BÁO SAI LỆCH SĨ SỐ BUS \- LỚP HỌC | Toàn bộ BGH & Security | High Alert Pop-up \+ Sound | 09:15 AM hàng ngày |

\---

\#\# 21\. Permission Matrix (RBAC)

| Role | View Bus Route | Perform Attendance | Verify Rear QR | Access GPS Tracking | Manage Route/Bus | Receive Red Alert |  
| \--- | \--- | \--- | \--- | \--- | \--- | \--- |  
| Bus Monitor | Assigned Route | Full | Full | Own Bus | No | No |  
| Driver | Assigned Route | No | Full (Joint) | Own Bus | No | No |  
| Giám sát Vận chuyển | Full Enterprise | Read Only | View Only | Full Fleet | Full | Full |  
| Hiệu trưởng Cơ sở | Campus Fleet | Read Only | View Only | Campus Fleet | Read Only | Full |  
| Security Cổng | Campus Fleet | Gate Only | No | View Only | No | Full |  
| Phụ huynh | Own Child | No | No | Own Child Bus | Request Only | No |

\---

\#\# 22\. Audit Trail

Hệ thống ghi nhận Audit Log vĩnh viễn không thể xóa sửa đối với các sự kiện:

\* Toàn bộ dữ liệu hành trình GPS của xe bus: Tọa độ, vận tốc, lộ trình di chuyển, các điểm dừng đỗ và thời gian dừng đỗ (Lưu trữ 365 ngày).  
\* Nhật ký điểm danh lên/xuống xe của từng học sinh: Timestamp, Mã nhân viên thực hiện, Tọa độ GPS, Hình ảnh chụp thực tế.  
\* Nhật ký quét mã QR Code kiểm tra hàng ghế cuối xe: Timestamp, Tài khoản quét, Hình ảnh khoang xe chụp từ cuối xe, Tọa độ GPS bãi đỗ.  
\* Mọi sự kiện kích hoạt còi báo động khẩn cấp (Red Alert) và nhật ký xử lý sự cố của BGH.

\---

\#\# 23\. Internal Controls

\* \*\*Physical Verification Lock (Khóa Kiểm tra Vật lý):\*\* Yêu cầu bắt buộc phải quét mã QR Code cố định dán ở hàng ghế cuối xe bus mới được phép đóng chuyến. Triệt tiêu hoàn toàn việc điểm danh dối từ ghế lái.  
\* \*\*Dual-Layer Attendance Matching:\*\* So sánh đối chéo độc lập 3 điểm chạm: Bus Monitor quét lên xe \-\> Security quét tại cổng \-\> Giáo viên chủ nhiệm điểm danh tại lớp.  
\* \*\*Speed & Safety Telematics Control:\*\* Hệ thống tự động ghi nhận và chấm điểm hành vi Lái xe (Driver Safety Score) dựa trên dữ liệu phanh gấp, phóng nhanh vượt ẩu, quá tốc độ từ thiết bị GPS.

\---

\#\# 24\. KPI / SLA

| KPI / SLA Description | Formula / Measurement | Target | Owner |  
| \--- | \--- | \--- | \--- |  
| \*\*Tỷ lệ Sự cố Bỏ quên Trẻ trên Xe\*\* | Số vụ việc trẻ bị bỏ quên trên xe bus | \*\*0% (Zero Tolerance)\*\* | Trưởng BP Vận chuyển |  
| \*\*Tỷ lệ Tuân thủ Quét QR Hàng ghế Cuối xe\*\* | (Số chuyến quét QR đúng chuẩn / Tổng số chuyến) \* 100 | \*\*100%\*\* | Bus Monitor & Lái xe |  
| \*\*Tỷ lệ Xe đưa đón Đúng giờ (On-time Rate)\*\* | (Số điểm đón/trả đúng giờ ETA ± 5 phút / Tổng điểm) \* 100 | \*\*\>= 95%\*\* | Giám sát Vận chuyển |  
| \*\*SLA Kích hoạt Báo động khi Sai lệch Sĩ số\*\* | Thời gian từ khi phát hiện sai lệch đến khi phát Alert | Real-time (\<= 10 giây) | ERP System Admin |

\---

\#\# 25\. Dashboard / Report

\* \*\*Real-time Fleet Tracking Dashboard (Phòng Vận chuyển):\*\* Màn hình bản đồ theo dõi vị trí toàn bộ xe bus đang chạy real-time, Trạng thái chuyến xe, Cảnh báo quá tốc độ, Cảnh báo chậm lộ trình.  
\* \*\*Bus Attendance & Safety Monitor (BGH):\*\* Bảng tổng hợp sĩ số học sinh đi xe bus, Trạng thái quét QR hàng ghế cuối xe của từng chuyến, Báo cáo các trường hợp nghỉ không báo.  
\* \*\*Vehicle & Driver Performance Report (COO & Board):\*\* Báo cáo chấm điểm an toàn lái xe, Báo cáo chi phí nhiên liệu/km di chuyển, Báo cáo mức độ hài lòng của Phụ huynh về dịch vụ bus.

\---

\#\# 26\. Integration

\* \*\*Thiết bị GPS Tracker / Telematics Hardware:\*\* Kết nối API 2 chiều truyền dữ liệu tọa độ, vận tốc và trạng thái cửa xe về ERP.  
\* \*\*Student Information System (SOP-SIS-001):\*\* Đồng bộ dữ liệu điểm danh xe bus với dữ liệu cổng trường và điểm danh lớp học.  
\* \*\*Mobile App (Parent App / Bus Monitor App):\*\* Tích hợp bản đồ GPS Tracking, nhận thông báo Push Notification và tính năng quét mã QR/RFID.  
\* \*\*Tổng đài Tự động (IVR Auto-Call Gateway):\*\* Tự động kích hoạt cuộc gọi thoại tới điện thoại Phụ huynh khi trẻ vắng mặt không lý do.

\---

\#\# 27\. Risks & Controls

| Risk Description | Impact | Probability | Control Activity | Owner |  
| \--- | \--- | \--- | \--- | \--- |  
| \*\*Trẻ bị bỏ quên ngủ quên trên xe bus\*\* | Critical | Low | Bắt buộc quét mã QR Hàng ghế Cuối xe mới cho Close Trip; ERP Cross-Match lúc 09:15 AM. | Bus Monitor, Driver & BGH |  
| \*\*Lái xe phóng nhanh vượt ẩu gây tai nạn\*\* | Critical | Low | GPS Giám sát tốc độ real-time; Báo động còi trên xe khi chạy quá 50km/h; Báo cáo phạt Lái xe. | Giám sát Vận chuyển |  
| \*\*Hệ thống 4G / GPS mất tín hiệu giữa đường\*\* | High | Low | App lưu \`Offline Cache Mode\`; Tự động phát cảnh báo "Mất tín hiệu GPS quá 3 phút" về Trung tâm Vận hành. | IT System Admin |  
| \*\*Bus Monitor điểm danh nhầm / dối\*\* | High | Low | Bắt buộc quét thẻ RFID / QR Code hoặc chụp ảnh mặt trẻ; Tự động Cross-check với Bảo vệ Cổng. | Trưởng BP Vận chuyển |

\---

\#\# 28\. Acceptance Criteria

\* \*\*Given:\*\* Xe bus đã đưa toàn bộ học sinh đến trường và học sinh đã bước xuống xe.  
\* \*\*When:\*\* Bus Monitor cố tình bấm nút "Close Trip" trên App khi đang ngồi ở ghế đầu xe (chưa đi xuống cuối xe).  
\* \*\*Then:\*\* ERP hiển thị thông báo lỗi: \*"Chưa quét mã QR kiểm tra hàng ghế cuối xe. Không thể đóng chuyến"\*, đồng thời đồng hồ đếm ngược 10 phút kích hoạt. Bật còi báo động khẩn cấp nếu quá 10 phút không quét mã QR cuối xe.  
\* \*\*Given:\*\* Học sinh A check-in lên xe bus lúc 07:00 AM (\`Bus On Board \= YES\`).  
\* \*\*When:\*\* Đến 09:15 AM, Giáo viên chủ nhiệm không tích điểm danh Học sinh A tại lớp (\`Class Checked-in \= NO\`).  
\* \*\*Then:\*\* ERP lập tức kích hoạt Báo động Đỏ Cấp độ 1, phát tiếng chuông báo động trên điện thoại Hiệu trưởng, Trưởng BP Vận chuyển và Trưởng Bảo vệ để tiến hành truy tìm vị trí học sinh ngay lập tức.

\---

\#\# 29\. Test Scenarios

1\. \*\*Happy Path Test:\*\* Khởi động trip \-\> Phát Geofencing 500m \-\> Đón trẻ quét QR \-\> Trả trẻ tại trường \-\> Đi xuống cuối xe quét QR Hàng ghế Cuối \-\> ERP xác nhận Close Trip thành công 100% an toàn.  
2\. \*\*Missing Rear QR Verification Test:\*\* Cố tình KHÔNG quét QR hàng ghế cuối xe sau khi trả trẻ \-\> Kiểm tra xem sau 10 phút ERP có bật còi báo động đỏ gửi về BGH và Trưởng Vận chuyển không.  
3\. \*\*3-Way Attendance Cross-Match Failure Test:\*\* Giả lập học sinh Check-in lên bus nhưng KHÔNG Check-in tại lớp \-\> Kiểm tra xem đúng 09:15 AM ERP có kích hoạt Level 1 Emergency Alert không.  
4\. \*\*Geofencing Push Notification Test:\*\* Cho xe bus di chuyển vào bán kính 500m quanh Bus Stop \-\> Kiểm tra xem App Phụ huynh có nhận được Push Notification trong vòng 3 giây không.  
5\. \*\*Offline Cache Resiliency Test:\*\* Tắt kết nối 4G trên Tablet Bus Monitor \-\> Thực hiện quét QR đón 5 học sinh \-\> Bật lại 4G \-\> Kiểm tra xem dữ liệu điểm danh và tọa độ GPS có tự động Sync về Cloud ERP chuẩn xác không.

\---

\#\# 30\. ERP Implementation Notes

\* \*\*Configuration:\*\* Cấu hình mã QR Code tĩnh độc nhất cho từng xe bus; Cấu hình bán kính Geofencing (500m); Cấu hình ngưỡng tốc độ cảnh báo (50km/h); Cấu hình thời gian đếm ngược báo động (10 phút).  
\* \*\*Master Data Migration:\*\* Chuẩn hóa danh sách các tuyến đường, tọa độ GPS chính xác của toàn bộ các điểm đón/trả; Gán mã thẻ RFID / Mã QR Balo cho toàn bộ học sinh đi xe.  
\* \*\*Hardware Integration:\*\* Lắp đặt và nghiệm thu thiết bị GPS Tracker trên 100% phương tiện; In và dán tem QR Code chất lượng cao chịu nhiệt tại hàng ghế cuối cùng của tất cả các xe bus.  
\* \*\*Training & Drills:\*\* Tổ chức diễn tập bắt buộc quy trình "Kiểm tra Hàng ghế Cuối xe" và quy trình "Xử lý Báo động Khẩn cấp" cho 100% Lái xe, Bus Monitor, Bảo vệ và Ban Giám hiệu trước khi khai giảng năm học mới.

\---

\#\# BÁO CÁO KẾT QUẢ VÀ LỘ TRÌNH TRIỂN KHAI BƯỚC TIẾP THEO

Đã hoàn thành xuất sắc việc biên soạn tài liệu \*\*SOP-BUS-001: Quy trình Quản lý Lộ trình Xe Bus, Điểm danh Học sinh Lên/Xuống Xe và Bảo đảm An toàn Tránh Bỏ quên Trẻ\*\* tuân thủ chính xác 100% cấu trúc 30 mục chuẩn mực Enterprise ERP.

Mã file chuẩn: \`SOP-BUS-001\_Quan\_Ly\_Xe\_Bus\_Diem\_Danh\_Bus\_Va\_Tranh\_Bo\_Quen\_Tre.md\`.

# Thẻ 8

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (PROGRESS REPORT)**

Hệ thống ERP Mầm non Doanh nghiệp đang được kiến trúc hóa dựa trên **75 Domain Vận hành** được phân bổ thành **5 Phân hệ Chiến lược (Phases)**.

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (6 SOPs):**  
* 

  1. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  2.   
  3. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  4.   
  5. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  6.   
  7. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  8.   
  9. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  10.   
  11. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  12.   
* **Thực hiện trong lượt này (1 SOP):**  
* 7\. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc Theo Dặn Dò & Xử lý Sự cố / Tai nạn (Domain 23, 24, 25, 26).  
*   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **18 SOPs** (Được chia làm 3 Phase tiếp theo bên dưới).  
* 

### **2\. Tổng quan Lộ trình Còn lại (Remaining SOP Roadmap)**

\[ĐÃ HOÀN THÀNH: 6 SOP\] ──► \[ĐANG THỰC HIỆN: SOP-MED-001\] ──► \[CÒN LAỊ: 18 SOP CORE\]  
                                                                     │  
 ┌───────────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────────┐  
 │                                                LỘ TRÌNH 18 SOP CORE CÒN LẠI                                                           │  
 ├───────────────────────────────────┬───────────────────────────────────┬───────────────────────────────────┬───────────────────────────┤  
 │ Phase 1: CRM & Academic (4 SOP)   │ Phase 2: Procurement & Asset (5) │ Phase 3: Finance & Control (5)    │ Phase 4: Governance (4)   │  
 │ • SOP-CRM-001: Lead & Tour        │ • SOP-PUR-001: Mua sắm P2P        │ • SOP-FIN-002: Quản lý Thu Chi    │ • SOP-QA-001: Kiểm định   │  
 │ • SOP-SIS-002: Sổ liên lạc & Daily│ • SOP-INV-001: Quản lý Kho VTYT   │ • SOP-FIN-003: Quản lý Tạm ứng    │ • SOP-GOV-001: Đa cơ sở   │  
 │ • SOP-ACA-001: Giáo án & Thời KĐT │ • SOP-ASM-001: Quản lý Tài sản    │ • SOP-FIN-004: Ngân sách Budget   │ • SOP-SEC-001: Phân quyền │  
 │ • SOP-ACA-002: Đánh giá Trẻ       │ • SOP-FAC-001: Bảo trì Thiết bị   │ • SOP-AUD-001: Kiểm toán Nội bộ   │ • SOP-SYS-001: Master Data│  
 └───────────────────────────────────┴───────────────────────────────────┴───────────────────────────────────┴───────────────────────────┘

TIẾN HÀNH BIÊN SOẠN SOP TIẾP THEO: SOP-MED-001

# **SOP-MED-001 — QUY TRÌNH QUẢN LÝ SỨC KHỎE HỌC SINH, Y TẾ HỌC ĐƯỜNG, CHO TRẺ UỐNG THUỐC THEO DẶN DÒ VÀ XỬ LÝ SỰ CỐ / TAI NẠN**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-MED-001  
*   
* **Tên SOP:** Quy trình Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc Theo Dặn Dò và Xử lý Sự cố / Tai nạn  
*   
* **Module ERP:** Health Records (23), Medication Management (24), Accident / Incident Management (25), Child Safeguarding (26), Parent Communication (62)  
*   
* **Process Owner:** Cán bộ Y tế Học đường (School Nurse)  
*   
* **Department:** Khối Y tế & An toàn Học đường, Ban BGH, Khối Giáo viên Mầm non  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Functional Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Hiệu trưởng Cơ sở / COO  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ công tác chăm sóc sức khỏe học sinh mầm non: từ lập hồ sơ tiền sử y tế/dị ứng/tiêm chủng khi nhập học, tiếp nhận và xác thực đơn dặn thuốc từ Phụ huynh qua Mobile App, đối soát 3 điểm (Trẻ \- Thuốc \- Liều lượng) khi cho trẻ uống thuốc, theo dõi chỉ số phát triển thể chất định kỳ (Biểu đồ tăng trưởng WHO), đến quy trình xử lý khẩn cấp và lập biên bản sự cố/tai nạn học đường đảm bảo an toàn tuyệt đối cho trẻ.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non thuộc hệ thống trường mầm non.  
*   
* **Phòng ban:** Bộ phận Y tế học đường, Giáo viên chủ nhiệm, Trợ giảng, Bộ phận Bếp ăn, Bộ phận Bảo vệ, Ban Giám hiệu.  
*   
* **Đối tượng:** Toàn bộ học sinh mầm non đang theo học tại trường, Phụ huynh / Người giám hộ.  
*   
* **Trường hợp không áp dụng:** Trường hợp trẻ mắc bệnh truyền nhiễm nhóm A thuộc diện phải cách ly y tế theo chỉ định của Bộ Y tế (áp dụng SOP-MED-005: Xử lý Bệnh Truyền nhiễm & Khống chế Dịch bệnh Học đường).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Medication Request (Đơn dặn gửi thuốc):** Yêu cầu do Phụ huynh khởi tạo trên Mobile App nhờ nhà trường cho con uống thuốc trong ngày, bao gồm tên thuốc, liều lượng, thời gian uống, ảnh chụp đơn thuốc bác sĩ và vỏ thuốc.  
*   
* **3-Point Medication Verification (Đối soát 3 điểm y tế):** Thao tác bắt buộc của Cán bộ Y tế/Giáo viên trước khi cho trẻ uống thuốc: Đối soát đúng Học sinh \- Đúng Tên/Liều Thuốc \- Đúng Giờ uống theo thông tin đã phê duyệt trên ERP.  
*   
* **Incident Severity Level (Cấp độ Sự cố Y tế):** Phân loại tai nạn/sự cố theo 3 mức độ:  
* 

  * *Mức 1 (Nhẹ):* Trầy xước nhẹ, va chạm nhỏ xử lý tại chỗ bằng gạc y tế.  
  *   
  * *Mức 2 (Trung bình):* Chấn thương cần theo dõi, sốt cao \> 38.5°C, dị ứng nhẹ, chảy máu cam.  
  *   
  * *Mức 3 (Nghiêm trọng):* Dị ứng sốc phản vệ, gãy xương, bất tỉnh, chấn thương đầu \-\> Cần chuyển viện khẩn cấp.  
  *   
* **WHO Growth Standard (Chuẩn Tăng trưởng WHO):** Biểu đồ theo dõi chỉ số Chiều cao, Cân nặng, BMI của trẻ mầm non do Tổ chức Y tế Thế giới ban hành.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tiếp nhận Hồ sơ Y tế Đầu vào & Cập nhật Tiêm chủng | Cán bộ Y tế | Cán bộ Y tế | Phụ huynh | GVCN / Bếp trưởng |
| Khởi tạo & Duyệt Đơn dặn gửi thuốc | Phụ huynh (Tạo) | Cán bộ Y tế (Duyệt) | Bác sĩ chỉ định | GVCN |
| Cho Trẻ Uống Thuốc & Lưu Bằng chứng trên App | Cán bộ Y tế / GVCN | Cán bộ Y tế | Phụ huynh | Ban Giám hiệu |
| Đo Chỉ số Phát triển Thể chất Định kỳ (Chiều cao/Cân nặng) | Cán bộ Y tế | Cán bộ Y tế | GVCN | Phụ huynh |
| Sơ Cứu Khẩn Cấp & Lập Biên Bản Sự Cố / Tai Nạn | Cán bộ Y tế & GVCN | Hiệu trưởng Cơ sở | Bệnh viện / Y tế quận | Phụ huynh / Board |

*Ghi chú: Việc quản lý tủ thuốc trường học, sử dụng thuốc kê đơn/không kê đơn, sơ cấp cứu và lưu trữ hồ sơ y tế trẻ em cần kiểm tra/đối chiếu quy định hiện hành của Bộ Y tế và Bộ Giáo dục & Đào tạo (Thông tư liên tịch 13/2016/TTLT-BYT-BGDĐT) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Bệnh lý & Dị ứng (AllergyMaster), Danh mục Thuốc Y tế Trường học (MedicalSupplyMaster), Danh mục Bệnh viện Cấp cứu Liên kết (EmergencyHospitalMaster).  
*   
* **Hồ sơ Y tế Học sinh:** Hồ sơ y tế ban đầu (StudentMedicalProfile) được đồng bộ từ SOP-ADM-003, bao gồm nhóm máu, tiền sử dị ứng, bệnh mãn tính.  
*   
* **Đơn dặn gửi thuốc:** Phụ huynh gửi Đơn dặn thuốc hợp lệ trên Mobile App trước **08:30 AM** của ngày cho uống.  
* 

## **7\. Trigger**

* **Hàng ngày (Trước 08:30 AM):** Phụ huynh nộp Đơn dặn gửi thuốc cho trẻ trên Mobile App.  
*   
* **Định kỳ (Mỗi quý / 3 tháng):** Lịch đo chiều cao, cân nặng và khám sức khỏe định kỳ cho toàn trường.  
*   
* **Bất ngờ / Khẩn cấp:** Trẻ bị sốt, chấn thương hoặc gặp sự cố sức khỏe tại trường.  
* 

## **8\. Quy trình AS-IS**

* Phụ huynh viết tay tờ giấy dặn thuốc kẹp vào balo của con hoặc nhắn tin riêng qua Zalo cho giáo viên chủ nhiệm.  
*   
* Giáo viên để thuốc trên bàn học hoặc trong cặp trẻ, đến giờ tự lấy thuốc cho trẻ uống theo trí nhớ.  
*   
* Cân đo chiều cao/cân nặng ghi vào sổ tay, giáo viên ngồi tính thủ công chỉ số BMI rồi chép vào sổ liên lạc giấy gửi phụ huynh.  
*   
* Khi trẻ bị tai nạn trầy xước/ngã, giáo viên tự xử lý, không lập biên bản sự cố, chỉ dặn miệng phụ huynh lúc chiều đón.  
*   
* **Hệ quả:** Rủi ro chí mạng cho trẻ uống nhầm thuốc, sai liều lượng hoặc quá hạn; mất bằng chứng pháp lý khi phụ huynh khiếu nại về vết thương của con; không đồng bộ thông tin dị ứng sang Nhà bếp (SOP-KIT-001).  
* 

## **9\. Pain Points / Risk**

* **Critical Medical Risk (Mối nguy Y tế Chí mạng):** Trẻ uống nhầm thuốc của bạn khác, uống quá liều hoặc uống thuốc không có chỉ định bác sĩ gây ngộ độc/sốc phản vệ.  
*   
* **Missing Audit Trail / Legal Risk:** Không có bằng chứng hình ảnh/chữ ký ghi nhận thời điểm trẻ uống thuốc hoặc thời điểm phát sinh vết thương trên người trẻ.  
*   
* **Data Isolation:** Dữ liệu dị ứng y tế không tự động cảnh báo sang Phân hệ Bếp ăn và Phân hệ Đón trả trẻ.  
*   
* **Lack of Incident Governance:** Các sự cố va chạm/tai nạn bị che giấu hoặc báo cáo chậm trễ lên Ban Giám hiệu.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận Đơn dặn thuốc & Kiểm duyệt Y tế (Medication Request & Approval)**

* **Step 01:**  
* 

  * **Actor:** Phụ huynh / Người giám hộ.  
  *   
  * **Action:** Phụ huynh mở Mobile App, chọn "Gửi Thuốc Cho Bé", điền thông tin: Tên thuốc, Liều dùng (ml/viên), Giờ uống (mấy giờ), Tải ảnh Đơn thuốc của Bác sĩ \+ Ảnh vỏ thuốc rõ hạn sử dụng và bấm "Gửi Đơn".  
  *   
  * **ERP Function:** Medication Request Creation.  
  *   
  * **Input:** Tên thuốc, Liều lượng, Giờ uống, Ảnh đơn thuốc, Ảnh vỏ thuốc.  
  *   
  * **Output:** Đơn dặn thuốc dạng Dự thảo (Submitted Medication Request).  
  *   
  * **Business Rule:** BR-MED-001: Đơn dặn thuốc bắt buộc phải gửi trước **08:30 AM**. Thuốc gửi bắt buộc phải là thuốc còn hạn sử dụng và có Đơn chỉ định của Bác sĩ (đối với thuốc kê đơn/kháng sinh).  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Submitted / Pending Nurse Review.  
  *   
  * **SLA:** Complete trước 08:30 AM.  
  *   
  * **Notification:** Alert gửi Cán bộ Y tế trên Tablet Y tế.  
  *   
* **Step 02:**  
* 

  * **Actor:** Cán bộ Y tế Học đường.  
  *   
  * **Action:** Cán bộ Y tế mở màn hình Medication Management, kiểm tra ảnh đơn thuốc, liều lượng và đối chiếu với hồ sơ dị ứng của trẻ. Nếu hợp lệ, bấm "Phê duyệt" (Approve Request).  
  *   
  * **ERP Function:** Medication Request Verification.  
  *   
  * **Input:** Submitted Medication Request \+ Hồ sơ y tế trẻ.  
  *   
  * **Output:** Đơn dặn thuốc được duyệt (Approved Medication Request).  
  *   
  * **Business Rule:** BR-MED-002: Cán bộ Y tế có quyền Từ chối (Reject) nếu thuốc không rõ nguồn gốc, hết hạn hoặc liều lượng vượt quá khuyến cáo độ tuổi.  
  *   
  * **Status Before:** Submitted / Pending Nurse Review.  
  *   
  * **Status After:** Approved & Scheduled.  
  *   
  * **SLA:** Max 30 phút (Hoàn tất trước 09:00 AM).  
  *   
  * **Notification:** App Push cho Phụ huynh & Tablet Lớp học của Giáo viên chủ nhiệm: *"Đơn dặn thuốc cho bé \[Tên\] đã được Y tế phê duyệt"*.  
  * 

### **Giai đoạn 2: Tiếp nhận Thuốc & Thực hiện Cho trẻ Uống thuốc (Medication Administration)**

* **Step 03:**  
* 

  * **Actor:** Giáo viên chủ nhiệm & Cán bộ Y tế.  
  *   
  * **Action:** Buổi sáng khi trẻ check-in (SOP-SIS-001), GVCN nhận vỉ/chai thuốc thực tế từ Phụ huynh, kiểm tra khớp với thông tin trên App và bàn giao cho Cán bộ Y tế lưu tại Tủ thuốc Y tế.  
  *   
  * **ERP Function:** Physical Medicine Handover.  
  *   
  * **Input:** Thuốc thực tế \+ Mã Đơn dặn thuốc trên App.  
  *   
  * **Output:** Trạng thái thuốc Medicine Received at Clinic.  
  *   
  * **Status Before:** Approved & Scheduled.  
  *   
  * **Status After:** Medicine In Custody.  
  *   
  * **SLA:** Trong giờ đón trẻ (07:30 \- 08:30 AM).  
  *   
  * **Notification:** N/A.  
  *   
* **Step 04 (CRITICAL):**  
* 

  * **Actor:** Cán bộ Y tế (hoặc GVCN dưới sự giám sát của Y tế).  
  *   
  * **Action:** Đến giờ dặn uống thuốc (ERP phát chuông nhắc nhở), Cán bộ Y tế mở App Y tế, thực hiện **Thao tác Đối soát 3 Điểm**: (1) Quét mã QR Balo/Thẻ trẻ \-\> (2) Kiểm tra Tên/Liều Thuốc trên App \-\> (3) Cho trẻ uống thuốc, Bấm "Xác nhận Đã uống" (Mark Administered) và CHỤP 01 ẢNH KHOẢNH KHẮC TRẺ UỐNG THUỐC.  
  *   
  * **ERP Function:** 3-Point Verification & Administered Logging.  
  *   
  * **Input:** Mã QR Trẻ, Khoảnh khắc uống thuốc (Camera), Timestamp.  
  *   
  * **Output:** Nhật ký Uống thuốc Hoàn tất (Administered Log).  
  *   
  * **Business Rule:** BR-MED-003: Bắt buộc phải có ảnh chụp khoảnh khắc trẻ thực tế uống thuốc tải lên ERP. Dữ liệu Timestamp được khóa cứng theo đồng hồ nguyên tử của Server.  
  *   
  * **Status Before:** Medicine In Custody.  
  *   
  * **Status After:** Administered & Logged.  
  *   
  * **SLA:** Đúng mốc giờ dặn ± 15 phút.  
  *   
  * **Notification:** Real-time App Push cho Phụ huynh: *"Bé \[Tên\] đã được Cán bộ Y tế cho uống thuốc \[Tên Thuốc\] đúng liều lượng lúc \[Giờ\]. \[Xem Ảnh Trẻ Uống Thuốc\]"*.  
  * 

### **Giai đoạn 3: Theo dõi Thể chất Định kỳ & Khám Sức khỏe (Growth & Health Tracking)**

* **Step 05:**  
* 

  * **Actor:** Cán bộ Y tế & Giáo viên chủ nhiệm.  
  *   
  * **Action:** Định kỳ hàng quý, Cán bộ Y tế đo Chiều cao (cm), Cân nặng (kg) của học sinh. Nhập số liệu trực tiếp vào App Y tế.  
  *   
  * **ERP Function:** WHO Growth Chart Auto-Calculator.  
  *   
  * **Input:** Chiều cao, Cân nặng, Ngày sinh, Giới tính.  
  *   
  * **Output:** Chỉ số BMI, Trạng thái Dinh dưỡng (Bình thường, Suy dinh dưỡng Cấp/Mạn, Béo phì) \+ Biểu đồ Chuẩn WHO.  
  *   
  * **Business Rule:** Tự động so sánh với Bảng Chuẩn Tăng trưởng WHO. Nếu trẻ thuộc diện Béo phì hoặc Suy dinh dưỡng, ERP tự động gắn nhãn Special Nutrition Need và gửi cảnh báo tới Phân hệ Bếp ăn (SOP-KIT-001).  
  *   
  * **Status Before:** Pending Measurement.  
  *   
  * **Status After:** Growth Recorded & Charted.  
  *   
  * **SLA:** Hoàn tất trong tuần khám sức khỏe.  
  *   
  * **Notification:** Báo cáo Thể chất Quý gửi qua Mobile App Phụ huynh.  
  * 

### **Giai đoạn 4: Quản lý & Xử lý Sự cố / Tai nạn Học đường (Incident & Accident Governance)**

* **Step 06:**  
* 

  * **Actor:** Cán bộ Y tế, GVCN & Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Khi phát sinh tai nạn/sự cố (Trẻ ngã, trầy xước, sốt cao, dị ứng), GVCN đưa trẻ xuống Phòng Y tế. Cán bộ Y tế sơ cứu tại chỗ, mở App Y tế chọn "Tạo Biên bản Sự cố" (Create Incident Report), phân loại Cấp độ (Level 1, 2, 3), chụp ảnh vết thương/biểu hiện và ghi nhận cách xử lý.  
  *   
  * **ERP Function:** Incident & Accident Reporting Engine.  
  *   
  * **Input:** Loại sự cố, Mô tả nguyên nhân, Cấp độ Severity (1/2/3), Ảnh vết thương, Biện pháp sơ cứu.  
  *   
  * **Output:** Biên bản Sự cố Y tế Điện tử (Digital Incident Report).  
  *   
  * **Business Rule:** BR-MED-004: Sự cố Cấp độ 2 & 3 bắt buộc phải tự động kích hoạt **WORKFLOW THÔNG BÁO KHẨN CẤP**: Gửi Notification cho Hiệu trưởng trong 5 phút và kích hoạt Cuộc gọi Tự động (IVR Auto-Call) tới Phụ huynh.  
  *   
  * **Status Before:** Normal.  
  *   
  * **Status After:** Incident Reported / Under Medical Care.  
  *   
  * **SLA:** Lập biên bản trên ERP trong vòng 15 phút từ khi phát sinh sự cố.  
  *   
  * **Notification:** Push App \+ IVR Call tới Phụ huynh; Alert High Priority cho Hiệu trưởng.  
  *   
* **Step 07:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở & Phụ huynh.  
  *   
  * **Action:** Phụ huynh xem Biên bản Sự cố trên App và bấm "Xác nhận Đã nhận Thông tin". Hiệu trưởng review nhật ký xử lý của Y tế và đóng case (Close Incident Case).  
  *   
  * **ERP Function:** Incident Closure & Audit Signing.  
  *   
  * **Input:** Chữ ký điện tử Phụ huynh \+ Xác nhận Hiệu trưởng.  
  *   
  * **Output:** Biên bản Sự cố hoàn tất (Closed Incident Case).  
  *   
  * **Status Before:** Incident Reported.  
  *   
  * **Status After:** Incident Closed.  
  *   
  * **SLA:** Close case trong 24 giờ.  
  *   
  * **Notification:** Báo cáo tổng hợp sự cố chuyển về Dashboard Trưởng ban Y tế Chuỗi.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: 07:00 \- 08:30 AM\]  
       │  
       ▼  
\[Phụ Huynh Tạo Đơn Dặn Thuốc Trên App (Tên Thuốc \+ Liều \+ Ảnh Đơn/Vỏ)\]  
       │  
       ▼  
\[Cán Bộ Y Tế Review & Duyệt Đơn Thuốc trên ERP\]  
       │  
       ◇ Đơn Thuốc Hợp Lệ & Còn Hạn?  
       ├─ NO  ──► \[Cán bộ Y tế Reject \+ Gửi Lý Do Cho Phụ Huynh\]  
       └─ YES ──┐  
                │  
                ▼  
 \[GVCN Nhận Thuốc Thực Tế Tại Cổng ──► Bàn Giao Phòng Y Tế Lưu Tủ Thuốc\]  
                │  
                ▼  
 \[ĐẾN GIỜ DẶN UỐNG THUỐC: ERP Phát Chuông Nhắc Nhở\]  
                │  
                ▼  
 \[CÁN BỘ Y TẾ THỰC HIỆN ĐỐI SOÁT 3 ĐIỂM\]  
 \[Quét QR Trẻ ──► Đối Soát Tên/Liều Thuốc ──► Cho Uống ──► Chụp Ảnh Bằng Chứng\]  
                │  
                ▼  
 \[ERP Auto Push Notification \+ Ảnh Trẻ Uống Thuốc Trực Tiếp Cho Phụ Huynh\]  
                │  
                ▼  
 \[TRƯỜNG HỢP PHÁT SINH SỰ CỐ / TAI NẠN HỌC ĐƯỜNG\]  
                │  
                ▼  
 \[Cán Bộ Y Tế Sơ Cứu ──► Khởi Tạo "Digital Incident Report" Trên ERP\]  
                │  
                ◇ Cấp Độ Severity (Level 1, 2 hay 3)?  
                ├─ Level 1 (Nhẹ) ─────► \[Lưu Biên Bản ──► Phụ Huynh Xác Nhận Trên App\]  
                └─ Level 2/3 (Nặng) ──► \[TRIGGER: IVR Auto-Call Phụ Huynh \+ Alert BGH Khẩn Cấp\]  
                                            │  
                                            ▼  
                                  \[Chuyển Viện Cấp Cứu (Nếu L3) ──► Close Case\]  
                                            │  
                                            ▼  
                                       \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-MED-001:** Nhà trường chỉ tiếp nhận và cho trẻ uống thuốc khi có Đơn dặn gửi thuốc hợp lệ được Phụ huynh tạo trên Mobile App. Tuyệt đối không nhận dặn thuốc qua lời nói, tin nhắn SMS/Zalo cá nhân hoặc mảnh giấy viết tay.  
*   
* **BR-MED-002:** Đối với các loại Thuốc Kê Đơn (Đặc biệt là Kháng sinh, Thuốc đặc trị), đơn dặn thuốc trên App bắt buộc phải đính kèm ảnh chụp Đơn thuốc do Bác sĩ có chứng chỉ hành nghề kê đơn. Cán bộ Y tế có quyền từ chối cho uống nếu thiếu Đơn bác sĩ.  
*   
* **BR-MED-003:** Bắt buộc chụp 01 ảnh bằng chứng thực tế khoảnh khắc trẻ uống thuốc khi bấm "Xác nhận Đã uống" trên App. Ảnh phải rõ mặt trẻ và vỏ/cốc thuốc.  
*   
* **BR-MED-004:** Mọi trường hợp trẻ bị sốt từ **38.5°C** trở lên tại trường, Cán bộ Y tế không được tự ý cho trẻ uống thuốc hạ sốt nếu chưa có sự đồng ý xác nhận qua App/Điện thoại của Phụ huynh. Trẻ sốt \> 38.5°C bắt buộc phải đưa vào Phòng Y tế cách ly theo dõi và mời Phụ huynh đón sớm.  
*   
* **BR-MED-005 (DATA PRIVACY):** Dữ liệu sức khỏe, tiền sử bệnh lý và dị ứng của học sinh thuộc cấp độ dữ liệu **Highly Restricted Data**. Chỉ Cán bộ Y tế, BGH và Giáo viên trực tiếp phụ trách lớp mới được phân quyền xem theo nguyên tắc Need-to-Know.  
* 

## **13\. Exception Cases**

* **Phụ huynh quên gửi đơn dặn thuốc trên App nhưng mang thuốc đến cổng:**  
* 

  * *Xử lý:* Giáo viên/Bảo vệ hướng dẫn Phụ huynh mở App tạo đơn tại chỗ. Nếu Phụ huynh không có smartphone, Giáo viên hỗ trợ tạo đơn hộ (Create Request on Behalf) và yêu cầu Phụ huynh ký xác nhận trên màn hình Tablet.  
  *   
* **Trẻ chống đối, nôn trớ toàn bộ thuốc ra ngoài sau khi uống:**  
* 

  * *Xử lý:* Cán bộ Y tế cập nhật trạng thái Vomited / Admin Failed trên App, ghi rõ lý do, chụp ảnh và gửi thông báo cho Phụ huynh. Tuyệt đối không tự ý cho trẻ uống lại liều thứ 2 nếu chưa có chỉ định của Bác sĩ/Phụ huynh.  
  *   
* **Trẻ bị sốc phản vệ / Sự cố y tế nghiêm trọng (Level 3):**  
* 

  * *Xử lý:* Kích hoạt Nút Báo Động Khẩn Cấp (Emergency Medical Button) trên ERP. Hệ thống tự động:  
  * 

    1. Gọi điện cấp báo cho Ban Giám hiệu và Xe cấp cứu/Bệnh viện liên kết gần nhất.  
    2.   
    3. Tự động xuất bản Báo cáo Tóm tắt Y tế của trẻ (Nhóm máu, Tiền sử dị ứng, Các thuốc đã uống trong ngày) để cung cấp cho đội ngũ Bác sĩ cấp cứu.  
    4. 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Duyệt Đơn Dặn Thuốc Thông Thường (Không kê đơn) | App Phụ huynh (Tạo) | Cán bộ Y tế (Duyệt) | N/A |
| Duyệt Đơn Dặn Thuốc Kháng sinh / Kê đơn Bác sĩ | App Phụ huynh (Tạo) | Cán bộ Y tế (Thẩm định đơn) | N/A |
| Duyệt Cho Uống Thuốc Hạ Sốt Khẩn Cấp tại Trường | Cán bộ Y tế | Phụ huynh (Confirm App/Call) | N/A |
| Phê duyệt Biên bản Sự cố / Tai nạn (Level 2 & 3\) | Cán bộ Y tế (Lập) | Hiệu trưởng Cơ sở (Duyệt) | Phụ huynh (Ký nhận) |

## **15\. Status Lifecycle**

* **Medication Request Status:** Draft \-\> Submitted \-\> Approved \-\> Medicine In Custody \-\> Administered \-\> Completed (hoặc Rejected / Admin Failed).  
*   
* **Incident Case Status:** Open \-\> Under First Aid \-\> Reported to Parent \-\> Transferred to Hospital \-\> Closed.  
* 

## **16\. Data Model**

* **Primary Entity:** StudentMedicalProfile  
* 

  * StudentID (PK, String, Unique)  
  *   
  * BloodType (Enum), Allergies (JSON List), ChronicDiseases (JSON List)  
  *   
  * VaccinationHistory (JSON List)  
  *   
  * EmergencyContactName, EmergencyContactPhone  
  *   
* **Related Entities:**  
* 

  * MedicationRequest: RequestID (PK), StudentID (FK), RequestDate (Date), MedicineName (String), Dosage (String), AdministerTime (Time), DoctorPrescriptionURL (String), MedicinePhotoURL (String), Status (Enum).  
  *   
  * MedicationAdminLog: LogID (PK), RequestID (FK), AdministerTimestamp (DateTime), AdministeredBy (FK, UserID), ProofPhotoURL (String), Status (Enum: Success, Vomited, Refused).  
  *   
  * IncidentReport: IncidentID (PK), StudentID (FK), Timestamp (DateTime), SeverityLevel (Enum: Level1, Level2, Level3), Description (Text), FirstAidGiven (Text), InjuryPhotoURL (String), ReportedBy (FK), ParentAckStatus (Boolean), Status (Enum).  
  * 

## **17\. Forms / Documents**

* FRM-MED-001: Đơn Dặn Gửi Thuốc Điện Tử (Digital Medication Request Form).  
*   
* FRM-MED-002: Sổ Theo Dõi Cho Trẻ Uống Thuốc Điện Tử (Digital Medication Administration Log).  
*   
* FRM-MED-003: Phiếu Khám Sức Khỏe & Biểu Đồ Tăng Trưởng Thể Chất WHO.  
*   
* FRM-MED-004: Biên Bản Sự Cố / Tai Nạn Học Đường Điện Tử (Digital School Incident Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-MED-001 (MUST):** App Phụ huynh phải cung cấp tính năng gửi đơn dặn thuốc cho phép chụp/tải ảnh Đơn thuốc Bác sĩ và vỏ thuốc, chọn giờ dặn uống cụ thể.  
*   
* **FR-MED-002 (MUST):** App Y tế phải hỗ trợ quy trình **3-Point Verification**: Quét mã QR trẻ, hiển thị ảnh vỏ thuốc/liều lượng để đối soát và bắt buộc chụp ảnh khoảnh khắc cho trẻ uống thuốc trước khi lưu log.  
*   
* **FR-MED-003 (MUST):** Hệ thống phải tích hợp Thuật toán WHO Growth Chart Engine: Tự động tính chỉ số BMI và vẽ biểu đồ tăng trưởng chiều cao/cân nặng theo chuẩn WHO khi nhập số liệu.  
*   
* **FR-MED-004 (MUST):** Tích hợp Phân hệ Incident Governance: Cho phép lập biên bản sự cố, đính kèm ảnh vết thương, phân loại cấp độ và tự động gửi thông báo khẩn cấp cho Hiệu trưởng và Phụ huynh.  
*   
* **FR-MED-005 (SHOULD):** Tự động đồng bộ cờ cảnh báo Dị ứng (Allergy Flag) từ Hồ sơ Y tế sang Phân hệ Bếp ăn (SOP-KIT-001) và App Điểm danh Giáo viên.  
* 

## **19\. Automation Opportunities**

* **AUTO-MED-001 (NOTIFICATION):** Tự động phát chuông cảnh báo nhắc giờ uống thuốc trên Tablet của Cán bộ Y tế trước 15 phút so với giờ dặn trong đơn.  
*   
* **AUTO-MED-002 (INTEGRATION):** Tự động gửi Push Notification kèm hình ảnh bằng chứng thực tế cho Phụ huynh ngay khi Cán bộ Y tế bấm "Xác nhận Đã uống".  
*   
* **AUTO-MED-003 (WORKFLOW):** Tự động kích hoạt cuộc gọi thoại khẩn cấp (IVR Auto-Call) tới Phụ huynh và gửi High Priority Alert cho Hiệu trưởng khi khởi tạo Biên bản Sự cố Cấp độ 2 & 3\.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Cán bộ Y tế Duyệt Đơn Dặn Thuốc Mới | Cán bộ Y tế | ERP Alert / App Push | 08:30 AM hàng ngày |
| Xác nhận Đơn Dặn Thuốc Được Duyệt / Từ Chối | Phụ huynh & GVCN | Mobile App Push | Immediate sau khi Duyệt |
| Nhắc Giờ Cho Trẻ Uống Thuốc | Cán bộ Y tế | Loud Sound / App Pop-up | 15 phút trước giờ dặn |
| Xác nhận Trẻ Đã Uống Thuốc (Kèm Ảnh) | Phụ huynh | Mobile App Push | Immediate sau khi Log |
| CẢNH BÁO SỰ CỐ / TAI NẠN HỌC ĐƯỜNG KHẨN CẤP | Phụ huynh & Hiệu trưởng | App Push \+ IVR Call | Immediate khi lập biên bản |

## **21\. Permission Matrix (RBAC)**

| Role | View Medical Profile | Edit Medical Profile | Approve Med Request | Log Administer | Create Incident Report | Access Highly Restricted Data |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Cán bộ Y tế | Full | Full | Full | Full | Full | Full |
| Giáo viên Chủ nhiệm | Assigned Class | No | View Only | Assisted Only | Full (Incident) | Read Only (Need-to-Know) |
| Hiệu trưởng Cơ sở | Full Campus | Read Only | View Only | View Only | Full (Approve) | Full |
| Bếp trưởng | Allergies Only | No | No | No | No | Allergies Only |
| Phụ huynh | Own Child | Request Edit | Create Own | View Proof | Ack Incident | Own Child Only |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể xóa/sửa đối với:

* Mọi thao tác Tạo, Duyệt, Từ chối Đơn dặn thuốc (User ID, Timestamp, Lý do từ chối).  
*   
* Nhật ký Cho trẻ uống thuốc: Timestamp nguyên tử của Server, Tài khoản Cán bộ Y tế thực hiện, Mã QR trẻ được quét, File ảnh bằng chứng thực tế.  
*   
* Lịch sử chỉnh sửa Biên bản Sự cố / Tai nạn (Ai chỉnh sửa, Nội dung cũ, Nội dung mới, Lý do).  
*   
* Nhật ký truy cập dữ liệu tiền sử bệnh lý/dị ứng nhạy cảm của học sinh.  
* 

## **23\. Internal Controls**

* **Dual Verification & Proof Mandate:** Bắt buộc phải có đủ 2 yếu tố để hoàn tất log cho uống thuốc: Quét mã QR xác thực đúng trẻ \+ Chụp ảnh thực tế khoảnh khắc uống thuốc.  
*   
* **Time-Locking Log:** Nhật ký uống thuốc tự động khóa Timestamp theo giờ hệ thống server, Cán bộ Y tế không có quyền tự điền lùi giờ hoặc sửa giờ đã uống.  
*   
* **System Allergy Synchronization:** Dữ liệu dị ứng thuốc/thực phẩm được đồng bộ tự động real-time toàn hệ thống, không phụ thuộc vào việc nhập liệu thủ công giữa các phòng ban.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Duyệt Đơn Dặn Thuốc Đầu Ngày** | Thời gian từ khi nhận đơn đến khi duyệt/từ chối | \<= 30 phút (trước 09:00 AM) | Cán bộ Y tế |
| **Tỷ lệ Cho Uống Thuốc Đúng Giờ & Đúng Liều** | (Số lượt cho uống đúng giờ ±15p có ảnh / Tổng lượt) \* 100 | **100% (Zero Error)** | Cán bộ Y tế |
| **SLA Lập Biên bản Sự cố / Tai nạn** | Thời gian từ khi phát sinh sự cố đến khi tạo report | \<= 15 phút | Cán bộ Y tế & GVCN |
| **Tỷ lệ Sai sót Y tế / Cho Uống Nhầm Thuốc** | Số ca cho uống sai thuốc hoặc sai liều lượng | **0% (Zero Tolerance)** | Cán bộ Y tế |

## **25\. Dashboard / Report**

* **Clinic Daily Dashboard (Cán bộ Y tế):** Màn hình đếm ngược các ca cho uống thuốc trong ngày, Bảng danh sách học sinh đang theo dõi y tế tại phòng Y tế, Danh sách đơn thuốc chờ duyệt.  
*   
* **Student Health & Growth Governance Report (BGH & Y tế):** Báo cáo tổng hợp thể chất định kỳ (Tỷ lệ béo phì, suy dinh dưỡng), Báo cáo nhật ký sự cố tai nạn học đường theo tháng/cơ sở.  
*   
* **Executive Safeguarding & Health Dashboard (Board / COO):** Báo cáo tổng hợp chỉ số an toàn y tế toàn chuỗi, Báo cáo đánh giá rủi ro tai nạn học đường theo khu vực/lớp học.  
* 

## **26\. Integration**

* **Student Information System (SOP-ADM-003 & SOP-SIS-001):** Nhận dữ liệu y tế ban đầu khi nhập học và đồng bộ cờ cảnh báo dị ứng lên màn hình điểm danh của Giáo viên.  
*   
* **Kitchen & Nutrition Engine (SOP-KIT-001):** Tự động đồng bộ danh sách học sinh dị ứng thực phẩm sang Phân hệ Bếp ăn để kiểm tra thực đơn cross-check.  
*   
* **Mobile App (Parent App / Teacher App):** Cho phép Phụ huynh tạo đơn dặn thuốc, nhận thông báo uống thuốc kèm ảnh và xác nhận biên bản sự cố.  
*   
* **Tổng đài Cuộc gọi Tự động (IVR Auto-Call Gateway):** Kích hoạt cuộc gọi khẩn cấp tới Phụ huynh khi phát sinh sự cố Cấp độ 2 & 3\.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Cho trẻ uống nhầm thuốc / sai liều lượng** | Critical | Low | Bắt buộc 3-Point Verification (Quét QR \+ Ảnh bằng chứng \+ Duyệt đơn Bác sĩ). | Cán bộ Y tế |
| **Sốc phản vệ do bỏ sót tiền sử dị ứng** | Critical | Low | Auto-Sync dữ liệu dị ứng từ CRM/ADM sang Y tế, Bếp ăn và App Giáo viên. | Cán bộ Y tế & ERP System |
| **Che giấu sự cố / Tai nạn xảy ra tại trường** | High | Low | Yêu cầu bắt buộc lập Digital Incident Report; Tự động gửi Alert cho Hiệu trưởng. | GVCN & Hiệu trưởng |
| **Rò rỉ thông tin y tế nhạy cảm của trẻ** | High | Low | Phân quyền RBAC chặt chẽ; Mã hóa dữ liệu Highly Restricted Data. | IT System Admin |

## **28\. Acceptance Criteria**

* **Given:** Phụ huynh gửi Đơn dặn thuốc cho Học sinh A lúc 07:30 AM kèm ảnh đơn bác sĩ.  
*   
* **When:** Cán bộ Y tế duyệt đơn và đến mốc giờ dặn uống thuốc (11:30 AM).  
*   
* **Then:** ERP phát chuông nhắc nhở trên App Y tế. Cán bộ Y tế quét mã QR trên Balo Học sinh A, màn hình hiển thị chính xác ảnh chai thuốc và liều dùng 5ml. Cán bộ Y tế chụp ảnh Học sinh A đang uống thuốc và bấm "Confirm Administered". ERP tự động gửi Push Notification kèm ảnh về điện thoại Phụ huynh trong 3 giây.  
*   
* **Given:** Học sinh B bị ngã trầy xước gối tại sân chơi (Sự cố Level 1).  
*   
* **When:** Giáo viên đưa Học sinh B xuống phòng Y tế và Cán bộ Y tế khởi tạo Digital Incident Report trên App.  
*   
* **Then:** ERP tự động lưu biên bản, gửi thông báo kèm ảnh vết thương tới App Phụ huynh yêu cầu bấm "Đã nhận thông tin", đồng thời ghi nhận vào báo cáo sự cố tháng của Cơ sở.  
* 

## **29\. Test Scenarios**

1. **Happy Path Test:** Tạo đơn dặn thuốc trên App \-\> Y tế Approve \-\> Nhận thuốc thực tế \-\> Đến giờ quét QR đối soát 3 điểm \-\> Chụp ảnh uống thuốc \-\> ERP Push xác nhận cho Phụ huynh thành công.  
2.   
3. **Unapproved Medication Block Test:** Cố tình không duyệt đơn dặn thuốc trên ERP \-\> Kiểm tra xem hệ thống có phát chuông nhắc giờ và có cho phép Cán bộ Y tế log "Đã uống" không.  
4.   
5. **Allergy Cross-Sync Test:** Khai báo học sinh dị ứng Đậu nành trên Hồ sơ Y tế \-\> Kiểm tra xem Phân hệ Bếp ăn (SOP-KIT-001) và App Giáo viên có lập tức hiện Cờ Cảnh báo Dị ứng đỏ không.  
6.   
7. **Level 3 Emergency Incident Test:** Tạo Biên bản Sự cố Cấp độ 3 (Cấp cứu) \-\> Kiểm tra xem ERP có lập tức kích hoạt IVR Auto-Call tới Phụ huynh và phát High Priority Alert cho Hiệu trưởng không.  
8.   
9. **Data Security & RBAC Test:** Dùng tài khoản Giáo viên môn Năng khiếu cố tình truy cập Hồ sơ Y tế chi tiết của học sinh lớp khác \-\> Kiểm tra xem ERP có chặn quyền truy cập không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình khung thời gian duyệt đơn dặn thuốc (trước 09:00 AM); Cấu hình ma trận phân loại cấp độ sự cố (Level 1, 2, 3); Cấu hình bảng chuẩn tăng trưởng WHO.  
*   
* **Master Data Migration:** Import toàn bộ tiền sử dị ứng, nhóm máu, lịch sử tiêm chủng của học sinh hiện hữu từ file hồ sơ y tế cũ lên ERP.  
*   
* **Hardware & Integration:** Trang bị Tablet chuyên dụng màn hình lớn cho Phòng Y tế Học đường; Tích hợp hệ thống tổng đài IVR Auto-Call phát cuộc gọi khẩn cấp.  
*   
* **Training & Change Management:** Đào tạo Cán bộ Y tế thao tác duyệt đơn và log uống thuốc có ảnh; Đào tạo Giáo viên quy trình lập Biên bản Sự cố Điện tử khi có tai nạn phát sinh.  
* 

## **TÀI LIỆU MARKDOWN (.MD) VÀ LỘ TRÌNH TRIỂN KHAI BƯỚC TIẾP THEO**

Tài liệu **SOP-MED-001** đã được hoàn thiện chuẩn mực 100% cấu trúc 30 mục Enterprise ERP, tích hợp các quy tắc an toàn y tế học đường, bảo mật dữ liệu trẻ em và tự động hóa quy trình cho trẻ uống thuốc.

Mã file chuẩn: SOP-MED-001\_Quan\_Ly\_Y\_Te\_Hoc\_Duong\_Cho\_Tre\_Uong\_Thuoc\_Va\_Xu\_Ly\_Su\_Co.md.

# Thẻ 9

# **SOP-CRM-001 — QUY TRÌNH QUẢN LÝ PHỄU TUYỂN SINH (LEAD-TO-ENROLLMENT), TỔ CHỨC SCHOOL TOUR, ĐÁNH GIÁ HÒA NHẬP VÀ TỐI ƯU TỶ LỆ CHUYỂN ĐỔI CRM**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-CRM-001  
*   
* **Tên SOP:** Quy trình Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), Tổ chức School Tour, Đánh giá Khả năng Hòa nhập của Trẻ và Tối ưu Tỷ lệ Chuyển đổi CRM  
*   
* **Module ERP:** CRM & Lead Management (01), Marketing & Campaign (02), Admission / Tuyển sinh (03), Parent / Guardian Management (05)  
*   
* **Process Owner:** Admission Manager (Trưởng phòng Tuyển sinh)  
*   
* **Department:** Phòng Tuyển sinh & Dịch vụ Khách hàng, Phòng Marketing  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Điều hành (CEO) / Board  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ vòng đời chuyển đổi cơ hội tuyển sinh mầm non từ lúc tiếp nhận thông tin quan tâm (Inquiry/Lead) qua các kênh Marketing đa điểm (Omnichannel), tự động phân bổ Lead cho Tư vấn viên (Admission Officer), đặt lịch và tổ chức Tham quan trường (School Tour), thực hiện Khảo sát đánh giá tâm lý vận động/hòa nhập của trẻ (Assessment), đến khi phát hành Thư mời Nhập học (Offer Letter) và chuyển giao hồ sơ sang SOP-ADM-003; tối đa hóa Tỷ lệ Chuyển đổi (Conversion Rate), rút ngắn thời gian xử lý Lead và triệt tiêu hoàn toàn rủi ro bỏ sót/lộ rò rỉ dữ liệu Phụ huynh.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Áp dụng bắt buộc trên toàn bộ các cơ sở mầm non thuộc hệ thống trường tư thục / quốc tế / chuỗi nhiều cơ sở.  
*   
* **Phòng ban:** Phòng Tuyển sinh, Phòng Marketing, Chuyên gia/Giáo viên Đánh giá (Academic Assessor), Bộ phận Chăm sóc khách hàng, Ban Giám hiệu Cơ sở, Bộ phận Lễ tân/Bảo vệ Cổng.  
*   
* **Đối tượng:** Toàn bộ Phụ huynh có nhu cầu tìm hiểu trường (Lead/Inquiry), Học sinh tiềm năng (Applicant).  
*   
* **Trường hợp không áp dụng:** Học sinh đang học xin chuyển tiếp giữa các cơ sở trong cùng hệ thống (áp dụng SOP-ADM-007: Quy trình Chuyển Cơ sở Học sinh Inter-Campus Transfer).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Lead / Inquiry:** Cơ hội kinh doanh tuyển sinh thể hiện sự quan tâm của Phụ huynh đối với nhà trường qua các kênh (Website, Facebook, Zalo, Hotline, Event, Referral).  
*   
* **Lead Scoring (Chấm điểm Cơ hội):** Thuật toán tự động trên ERP gán điểm số cho Lead dựa trên mức độ hoàn thiện thông tin, độ tuổi của trẻ, khả năng tài chính và mức độ tương tác (Mở email, nhắn tin, đặt lịch School Tour).  
*   
* **School Tour:** Buổi tham quan cơ sở vật chất và trải nghiệm môi trường học tập trực tiếp tại cơ sở mầm non do Admission Officer dẫn dắt.  
*   
* **Assessment (Khảo sát Hòa nhập):** Buổi đánh giá ngắn (30-45 phút) do Giáo viên Mầm non/Chuyên gia Tâm lý thực hiện nhằm nhận biết mức độ phát triển vận động, ngôn ngữ, cảm xúc \- xã hội và xác định trẻ có nhu cầu chăm sóc đặc biệt (SEN) hay không.  
*   
* **Auto-Assignment Rule:** Quy tắc tự động phân bổ Lead trên ERP dựa trên địa bàn địa lý, cơ sở mong muốn, dung lượng chứa của tư vấn viên (Workload) hoặc xoay vòng (Round-Robin).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Thu hút Lead & Tích hợp Kênh Marketing | Marketing Executive | Marketing Manager | Admission Mgr | ERP System Admin |
| Tiếp nhận, Quét trùng & Phân bổ Lead | ERP System / Lễ tân | Admission Manager | Admission Officer | Marketing Team |
| Tư vấn, Chăm sóc & Đặt lịch School Tour | Admission Officer | Admission Manager | Phụ huynh | Lễ tân / BGH |
| Tổ chức School Tour & Trải nghiệm | Admission Officer | Hiệu trưởng Cơ sở | Lễ tân / Bảo vệ | Phụ huynh |
| Thực hiện Assessment Khảo sát Hòa nhập | Academic Assessor | Academic Manager | Y tế học đường | Admission Officer |
| Duyệt Kết quả Assessment & Đề xuất Offer | Admission Manager | Hiệu trưởng Cơ sở | Academic Assessor | Kế toán / Phụ huynh |

*Ghi chú: Việc thu thập thông tin cá nhân của Phụ huynh và trẻ em trong quá trình tư vấn tuyển sinh cần kiểm tra/đối chiếu quy định hiện hành về bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Kênh Marketing (MarketingChannelMaster), Danh mục Cơ sở & Khối Lớp (CampusClassMaster), Chỉ tiêu Tuyển sinh & Sĩ số Lấp đầy (EnrollmentQuotaMaster), Khung Đánh giá Hòa nhập (AssessmentCriteriaMaster).  
*   
* **Dữ liệu Đầu vào:** Thông tin Lead phát sinh từ Website Form, Landing Page, Zalo Mini App, Tổng đài Call Center, hoặc Phụ huynh đến trực tiếp Lễ tân (Walk-in).  
*   
* **System Prerequisite:** Các kênh Marketing Digital đã được kết nối Webhook API với hệ thống ERP CRM; Phân quyền RBAC tư vấn viên sẵn sàng.  
* 

## **7\. Trigger**

* **Online Lead:** Phụ huynh điền Form đăng ký / Nhắn tin Zalo / Gọi Hotline trường.  
*   
* **Offline / Walk-in Lead:** Phụ huynh đến trực tiếp Cổng trường/Lễ tân yêu cầu tư vấn.  
*   
* **System Schedule:** Lịch nhắc tự động (Follow-up Schedule) trên ERP đếm ngược thời gian cần liên hệ lại cho Lead.  
* 

## **8\. Quy trình AS-IS**

* Marketing thu thập thông tin Phụ huynh từ Facebook Ads rồi xuất file Excel gửi qua Email cho Trưởng phòng Tuyển sinh vào cuối ngày.  
*   
* Trưởng phòng Tuyển sinh chia Lead thủ công bằng tay vào file Google Sheet chung cho các tư vấn viên.  
*   
* Tư vấn viên dùng điện thoại cá nhân gọi điện, nhắn tin Zalo cá nhân cho Phụ huynh, không lưu vết nhật ký cuộc gọi.  
*   
* Lịch School Tour được ghi chép vào sổ tay hoặc lịch Google Calendar riêng. Khi Phụ huynh đến trường, Lễ tân không biết thông tin phải gọi điện tìm tư vấn viên.  
*   
* Kết quả đánh giá trẻ (Assessment) do giáo viên viết vào giấy A4 gửi lại phòng tuyển sinh, dễ thất lạc.  
*   
* **Hệ quả:** Thời gian phản hồi Lead chậm (từ 12–24 giờ); rò rỉ dữ liệu Phụ huynh khi nhân viên tuyển sinh nghỉ việc; trùng lặp chăm sóc giữa các tư vấn viên; không đo lường được Tỷ lệ Chuyển đổi thực tế của từng kênh Marketing.  
* 

## **9\. Pain Points / Risk**

* **High Lead Leakage & Delayed SLA:** Lead nóng không được xử lý trong 15 phút đầu, dẫn đến Phụ huynh đăng ký sang trường đối thủ.  
*   
* **Data Theft / Leakage Risk:** Tư vấn viên dùng Zalo/Sổ cá nhân lưu trữ SĐT Phụ huynh, dẫn đến rủi ro mang dữ liệu sang trường khác khi nghỉ việc.  
*   
* **Duplicate Contacting:** 2 tư vấn viên thuộc 2 cơ sở khác nhau cùng gọi điện tư vấn cho 1 Phụ huynh do hệ thống không quét trùng trùng số điện thoại.  
*   
* **No ROI Transparency:** Không thể đo lường chính xác chi phí trên một học sinh nhập học thực tế (Cost-per-Enrolled-Student) cho từng chiến dịch Marketing.  
*   
* **Inconsistent Assessment:** Đánh giá trẻ mầm non mang tính cảm quan, thiếu bộ tiêu chí chuẩn hóa dẫn đến phản ứng tiêu cực từ Phụ huynh khi trẻ bị từ chối nhập học.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận Lead Đa kênh, Quét trùng & Phân bổ Tự động (Omnichannel Lead Ingestion & Auto-Assignment)**

* **Step 01:**  
* 

  * **Actor:** ERP System (Omnichannel Integration Engine).  
  *   
  * **Action:** Lead phát sinh từ Facebook Ads, Website, Zalo OA, Call Center hoặc QR Event được tự động đẩy về ERP qua Webhook API. Đối với khách Walk-in, Lễ tân nhập trực tiếp trên màn hình Quick Lead Capture.  
  *   
  * **ERP Function:** Omnichannel Lead Ingestion & Deduplication.  
  *   
  * **Input:** Họ tên Phụ huynh, SĐT, Email, Tên bé, Ngày sinh bé, Cơ sở quan tâm, Kênh Nguồn.  
  *   
  * **Output:** Hồ sơ Lead Mới (New Lead Record).  
  *   
  * **Business Rule:** BR-CRM-001: Hệ thống tự động kích hoạt Deduplication Algorithm theo Số điện thoại / Email. Nếu SĐT đã tồn tại trên ERP, hệ thống chặn tạo mới, tự động gắn Activity mới vào Lead cũ và báo thông báo cho Tư vấn viên đang phụ trách.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** New Lead / Deduplicated.  
  *   
  * **SLA:** Real-time (\<= 3 giây).  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** ERP System (Lead Assignment Engine).  
  *   
  * **Action:** ERP tự động chấm điểm Lead (Lead Scoring) dựa trên độ tuổi học sinh và mức độ hoàn thiện thông tin, sau đó phân bổ Lead cho Admission Officer theo quy tắc Round-Robin (Xoay vòng) hoặc theo Cơ sở quan tâm.  
  *   
  * **ERP Function:** Auto Lead Assignment & Scoring.  
  *   
  * **Input:** New Lead Record \+ Ma trận Phân bổ AssignmentRuleMaster.  
  *   
  * **Output:** Lead được gán cho Tư vấn viên (Assigned Lead).  
  *   
  * **Business Rule:** BR-CRM-002: Tư vấn viên phải thực hiện cuộc gọi đầu tiên cho Lead trong vòng **15 phút làm việc** kể từ khi nhận phân bổ. Quá 15 phút không tác động, ERP tự động thu hồi Lead và chuyển sang tư vấn viên khác.  
  *   
  * **Status Before:** New Lead.  
  *   
  * **Status After:** Assigned to Officer.  
  *   
  * **SLA:** \<= 1 phút cho phân bổ tự động.  
  *   
  * **Notification:** High Priority Alert trên Mobile App/Desktop của Admission Officer: *"Bạn nhận được 1 Lead Mới \[Tên Phụ huynh\] \- SĐT \[SĐT\]. SLA xử lý còn 15 phút"*.  
  * 

### **Giai đoạn 2: Tư vấn, Nurturing & Đặt lịch School Tour (Lead Nurturing & Tour Scheduling)**

* **Step 03:**  
* 

  * **Actor:** Admission Officer.  
  *   
  * **Action:** Admission Officer thực hiện cuộc gọi tư vấn trực tiếp từ ERP (Tích hợp Tổng đài CTI Cloud Call Center). Ghi nhận nhu cầu, cập nhật thông tin bé và chốt lịch School Tour trên màn hình Lịch Tuyển sinh.  
  *   
  * **ERP Function:** CTI Call Integration & School Tour Booking.  
  *   
  * **Input:** Nhật ký cuộc gọi (Auto-recorded), Ngày giờ hẹn School Tour.  
  *   
  * **Output:** Lịch hẹn School Tour chính thức (Tour Scheduled).  
  *   
  * **Business Rule:** BR-CRM-003: Lịch School Tour không được đặt vượt quá giới hạn khung giờ cho phép (Max 3 gia đình / khung giờ 45 phút) để đảm bảo chất lượng trải nghiệm.  
  *   
  * **Status Before:** In Contact.  
  *   
  * **Status After:** School Tour Scheduled.  
  *   
  * **SLA:** Cuộc gọi đầu tiên thực hiện trong \<= 15 phút.  
  *   
  * **Notification:** Tự động gửi SMS Brandname \+ Zalo OA xác nhận Lịch hẹn kèm Sơ đồ chỉ đường cho Phụ huynh; Đồng bộ lịch hiển thị tại Lễ tân Cổng.  
  * 

### **Giai đoạn 3: Tổ chức School Tour & Khảo sát Hòa nhập (School Tour & Student Assessment)**

* **Step 04:**  
* 

  * **Actor:** Lễ tân Cổng, Admission Officer & Phụ huynh.  
  *   
  * **Action:** Phụ huynh đến trường. Lễ tân quét mã QR Check-in trên tin nhắn Zalo của Phụ huynh (hoặc tìm theo SĐT trên Kiosk Lễ tân). ERP phát tín hiệu "Khách đã đến" tới Tablet của Admission Officer. Admission Officer đón tiếp và dẫn đi tham quan trường theo kịch bản chuẩn.  
  *   
  * **ERP Function:** Visitor Check-in & School Tour Execution.  
  *   
  * **Input:** QR Code Lịch hẹn / SĐT Phụ huynh.  
  *   
  * **Output:** Nhật ký School Tour (Tour Checked-in & Completed).  
  *   
  * **Status Before:** School Tour Scheduled.  
  *   
  * **Status After:** Tour Completed.  
  *   
  * **SLA:** Lễ tân đón tiếp trong \<= 2 phút.  
  *   
  * **Notification:** Notification gửi Hiệu trưởng Cơ sở ghi nhận có khách School Tour.  
  *   
* **Step 05:**  
* 

  * **Actor:** Academic Assessor (Giáo viên / Chuyên gia Đánh giá).  
  *   
  * **Action:** Trẻ được đưa vào Phòng Khảo sát Trải nghiệm. Academic Assessor sử dụng Tablet mở Phân hệ Assessment Tool, thực hiện đánh giá trẻ theo Bảng Tiêu chí Chuẩn hóa mầm non (Vận động thô, Vận động tinh, Ngôn ngữ, Cảm xúc \- Xã hội), đính kèm video/hình ảnh thực tế và bấm "Hoàn tất Đánh giá".  
  *   
  * **ERP Function:** Student Development Assessment Tool.  
  *   
  * **Input:** Tương tác của trẻ, Bảng tiêu chí đánh giá theo độ tuổi.  
  *   
  * **Output:** Báo cáo Khảo sát Hòa nhập (Assessment Report) đính kèm trạng thái Passed / Conditional Accepted / SEN (Special Needs) Warning.  
  *   
  * **Business Rule:** BR-CRM-004: Trẻ có dấu hiệu Cần chăm sóc đặc biệt (SEN) bắt buộc phải có ý kiến phê duyệt chuyên môn của Academic Manager và Hiệu trưởng trước khi chuyển sang bước phát hành Offer.  
  *   
  * **Status Before:** Assessment Pending.  
  *   
  * **Status After:** Assessment Completed.  
  *   
  * **SLA:** \<= 45 phút / lượt đánh giá.  
  *   
  * **Notification:** Kết quả đồng bộ real-time sang màn hình của Admission Officer.  
  * 

### **Giai đoạn 4: Chuyển đổi Sang Application & Phát hành Offer Nhập học (Offer Generation & Handoff)**

* **Step 06:**  
* 

  * **Actor:** Admission Officer & Admission Manager.  
  *   
  * **Action:** Kết quả Assessment đạt. Admission Officer nhấn "Chuyển thành Application", chọn Biểu phí & Chính sách ưu đãi hợp lệ trên ERP và trình duyệt Thư mời Nhập học (Offer Letter).  
  *   
  * **ERP Function:** Application Creation & Offer Approval Workflow.  
  *   
  * **Input:** Assessment Report \+ Fee Structure.  
  *   
  * **Output:** Thư mời Nhập học (Offer Letter) được duyệt.  
  *   
  * **Business Rule:** Chuyển giao toàn bộ dữ liệu Lead/Applicant đã xác minh sang SOP-ADM-003 để thực hiện ký Hợp đồng Đào tạo và Thu tiền cọc/học phí.  
  *   
  * **Status Before:** Assessment Completed.  
  *   
  * **Status After:** Offer Letter Issued.  
  *   
  * **SLA:** Phát hành Offer trong vòng 24 giờ sau School Tour.  
  *   
  * **Notification:** Thư mời nhập học đính kèm VietQR gửi tự động qua App Phụ huynh, Zalo OA và Email.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Lead Phát Sinh (Website / FB / Zalo / Call Center / Walk-in)\]  
       │  
       ▼  
\[ERP Omnichannel Engine: Automatic Deduplication Check (Theo SĐT/Email)\]  
       │  
       ◇ Phát hiện Lead Trùng?  
       ├─ YES ──► \[Gộp Activity Vào Hồ Sơ Cũ ──► Alert Tư Vấn Viên Đang Phụ Trách\]  
       └─ NO  ──┐  
                │  
                ▼  
\[ERP Auto-Scoring & Lead Assignment Engine (Xoay vòng / Theo Cơ sở)\]  
                │  
                ▼  
\[Admission Officer Gọi Điện Tư Vấn CTI Call Center (SLA \<= 15 phút)\]  
                │  
                ▼  
\[Đặt Lịch School Tour Trên ERP ──► Auto SMS/Zalo Xác Nhận \+ Mã QR Check-in\]  
                │  
                ▼  
\[Phụ Huynh Đến Trường: Check-in Tại Kiosk Lễ Tân ──► Thực Hiện School Tour\]  
                │  
                ▼  
\[Academic Assessor: Khảo Sát Hòa Nhập Cho Trẻ Trên Tablet (Assessment Tool)\]  
                │  
                ◇ Trẻ có Cảnh báo Nhu cầu Đặc biệt (SEN)?  
                ├─ YES ──► \[Review Chuyên Môn: Academic Manager & Hiệu Trưởng\]  
                └─ NO  ──┐  
                         │  
                         ▼  
\[Admission Officer: Khởi Tạo Application ──► Trình Duyệt Offer Letter\]  
                         │  
                         ▼  
\[ERP Auto Publish Offer Letter \+ VietQR Dynamic ──► Handoff Sang SOP-ADM-003\]  
                         │  
                         ▼  
                    \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-CRM-001 (Deduplication Rule):** Hệ thống tự động kiểm tra trùng lặp theo Số điện thoại và Email Phụ huynh trên toàn bộ dữ liệu chuỗi đa cơ sở. Nếu có sự trùng lặp, ERP khóa không cho tạo Lead mới và chuyển quyền xử lý cho Tư vấn viên đang sở hữu Lead cũ.  
*   
* **BR-CRM-002 (SLA Rule):** Tư vấn viên phải gọi cuộc gọi đầu tiên trong vòng **15 phút làm việc** kể từ khi nhận Lead. Quá 15 phút không có tương tác ghi nhận từ CTI Call Center, ERP tự động thu hồi Lead (Auto-Recycle) và chuyển cho Tư vấn viên tiếp theo.  
*   
* **BR-CRM-003 (Capacity Control):** Số lượng lịch hẹn School Tour mỗi khung giờ tự động giới hạn không quá **03 gia đình/khung giờ/cơ sở** để đảm bảo trải nghiệm khách hàng xuất sắc.  
*   
* **BR-CRM-004 (Special Needs Control):** Trẻ được đánh giá có nhu cầu chăm sóc đặc biệt (SEN \- Special Educational Needs) hoặc có tiền sử dị ứng nguy hiểm bắt buộc phải qua luồng Duyệt Đặc biệt (Special Review Workflow) của Hiệu trưởng trước khi ban hành Thư mời Nhập học.  
*   
* **BR-CRM-005 (Data Protection):** Toàn bộ số điện thoại Phụ huynh trên màn hình ERP mặc định bị mã hóa ẩn 3 số giữa (Ví dụ: 090\*\*\*\*123). Tư vấn viên thực hiện cuộc gọi trực tiếp qua nút bấm CTI Call trên phần mềm, không hiển thị số đầy đủ để tránh sao chép dữ liệu.  
* 

## **13\. Exception Cases**

* **Phụ huynh đến trường trực tiếp không đặt lịch trước (Walk-in Lead):** Lễ tân mở màn hình Quick Walk-in Capture, nhập thông tin Phụ huynh. ERP tự động kiểm tra trùng và phân bổ ngay cho Tư vấn viên trực ca tại cơ sở (On-duty Officer) tiếp đón trong vòng 3 phút.  
*   
* **Phụ huynh hủy hoặc đổi lịch School Tour sát giờ:** Phụ huynh bấm đổi lịch trên Zalo OA / App hoặc gọi điện. ERP cập nhật trạng thái Tour Rescheduled, giải phóng khung giờ cũ cho khách khác và gửi thông báo cập nhật cho Lễ tân.  
*   
* **Trẻ không hợp tác trong buổi Assessment (Quấy khóc, không chịu tương tác):** Assessor ghi nhận trạng thái Incomplete \- Needs Re-assessment. ERP lên lịch hẹn buổi khảo sát lại lần 2 sau 3–5 ngày.  
*   
* **Tư vấn viên nghỉ việc (Employee Offboarding):** Admin thực hiện tính năng Mass Lead Re-assignment. ERP tự động chuyển giao toàn bộ Lead đang theo dõi của nhân viên cũ sang cho nhân viên mới đính kèm đầy đủ Lịch sử tương tác và File ghi âm cuộc gọi.  
* 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Thu hồi & Chuyển giao Lead do Quá SLA | System Auto-Recycle | Admission Manager | N/A |
| Phê duyệt Đơn Đăng ký School Tour Ngoại lệ | Admission Officer | Admission Manager | N/A |
| Phê duyệt Báo cáo Assessment Trẻ SEN / Dị ứng Nặng | Academic Assessor | Academic Manager | Hiệu trưởng Cơ sở |
| Phê duyệt Mức Ưu đãi / Discount Ngoại lệ trên Offer | Admission Manager | Hiệu trưởng Cơ sở | CFO / Board |

## **15\. Status Lifecycle**

* **Lead Status:** New \-\> Assigned \-\> In Contact \-\> Tour Scheduled \-\> Tour Completed \-\> Assessment Pending \-\> Assessment Completed \-\> Converted to Application (hoặc Lost / Disqualified).  
*   
* **Assessment Status:** Scheduled \-\> In Progress \-\> Passed \-\> Conditional Accepted \-\> SEN Warning \-\> Re-assessment Required.  
* 

## **16\. Data Model**

* **Primary Entity:** Lead  
* 

  * LeadID (PK, String, Unique)  
  *   
  * ParentName, PhoneMasked (String), Email, Address  
  *   
  * ChildName, ChildDOB (Date), ChildGender  
  *   
  * PreferredCampusID (FK), MarketingChannelID (FK), CampaignID (FK)  
  *   
  * AssignedOfficerID (FK), LeadScore (Integer)  
  *   
  * LeadStatus (Enum), LostReason (Enum)  
  *   
* **Related Entities:**  
* 

  * LeadActivityLog: ActivityID (PK), LeadID (FK), ActivityType (Enum: Call, Email, Zalo, Meeting), Note (Text), CallRecordingURL (String), Timestamp (DateTime), CreatedBy (FK).  
  *   
  * SchoolTourBooking: TourID (PK), LeadID (FK), CampusID (FK), ScheduledDateTime (DateTime), CheckInTime (DateTime), TourStatus (Enum).  
  *   
  * StudentAssessment: AssessmentID (PK), LeadID (FK), AssessorID (FK), MotorSkillsScore (Integer), LanguageScore (Integer), SocialScore (Integer), SENFlag (Boolean), AssessmentResult (Enum), AssessmentReportURL (String).  
  * 

## **17\. Forms / Documents**

* FRM-CRM-001: Phiếu Tiếp nhận Thông tin Tư vấn Tuyển sinh (Inquiry / Lead Capture Form).  
*   
* FRM-CRM-002: Thư Xác nhận Lịch hẹn Tham quan Trường (School Tour Confirmation & QR Ticket).  
*   
* FRM-CRM-003: Phiếu Khảo sát Đánh giá Mức độ Phát triển & Hòa nhập của Trẻ Mầm non.  
*   
* FRM-CRM-004: Báo cáo Phân tích Nguyên nhân Thất thoát Lead (Lead Lost Reason Analysis Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-CRM-001 (MUST):** Tích hợp Omnichannel Webhook Engine nhận diện Lead tức thì từ Facebook Ads, Zalo OA, Website Form và Call Center.  
*   
* **FR-CRM-002 (MUST):** Cung cấp công cụ Deduplication Check tự động quét trùng lặp số điện thoại và mã hóa ẩn số điện thoại (Phone Masking) bảo vệ dữ liệu.  
*   
* **FR-CRM-003 (MUST):** Tích hợp Tổng đài CTI Cloud Call Center cho phép bấm gọi trực tiếp trên ERP, tự động ghi âm cuộc gọi và lưu file ghi âm vào hồ sơ Lead.  
*   
* **FR-CRM-004 (MUST):** Cung cấp App Tablet Assessment Tool cho Giáo viên thực hiện khảo sát sự phát triển của trẻ trực quan, chấm điểm theo tiêu chí mầm non chuẩn hóa.  
*   
* **FR-CRM-005 (SHOULD):** Thuật toán Auto Lead Recycling: Tự động thu hồi Lead nếu Tư vấn viên không liên hệ trong vòng 15 phút làm việc.  
* 

## **19\. Automation Opportunities**

* **AUTO-CRM-001 (INTEGRATION):** Tự động nhận dữ liệu Lead đa kênh qua API, quét trùng và phân bổ cho Tư vấn viên theo quy tắc Round-Robin trong 1 phút.  
*   
* **AUTO-CRM-002 (WORKFLOW):** Tự động gửi SMS Brandname / Zalo OA xác nhận Lịch hẹn School Tour kèm mã QR Check-in và vị trí Google Maps cho Phụ huynh ngay khi chốt lịch.  
*   
* **AUTO-CRM-003 (RULE ENGINE):** Tự động thu hồi Lead quá SLA 15 phút không chăm sóc và tự động cảnh báo cho Admission Manager.  
*   
* **AUTO-CRM-004 (INTEGRATION):** Tự động chuyển giao toàn bộ thông tin Lead, kết quả Assessment sang Phân hệ Student Enrollment (SOP-ADM-003) để tạo Thư mời Nhập học mà không cần nhập lại dữ liệu.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Phân bổ Lead Mới cho Tư vấn viên | Admission Officer | Mobile App Push \+ ERP Pop-up | Immediate (\<= 1 phút) |
| Cảnh báo Quá SLA 15 phút chưa gọi Lead | Admission Officer & Manager | ERP High Alert \+ Sound | At 15-minute mark |
| SMS / Zalo OA Xác nhận Lịch School Tour | Phụ huynh | Zalo OA \+ SMS Brandname | Immediate khi book tour |
| Nhắc nhở Phụ huynh Trước Giờ School Tour | Phụ huynh | Zalo OA / App Push | Prior to tour 2 hours |
| Khách School Tour Check-in Tại Cổng | Admission Officer & BGH | ERP Pop-up \+ App Push | Real-time (Lễ tân quét QR) |

## **21\. Permission Matrix (RBAC)**

| Role | View Lead | Create/Edit Lead | Make CTI Call | Access Phone Unmasked | Approve Offer | Export Lead Data |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Admission Officer | Assigned Only | Full | Full | No | No | No |
| Admission Manager | Campus Full | Full | Full | Full (Audit Logged) | Full (In Limit) | Full |
| Marketing Staff | Aggregate Only | Edit Campaign | No | No | No | Read Only |
| Academic Assessor | Assigned Tour | Assessment Only | No | No | No | No |
| Lễ tân / Guard | Tour List Only | Quick Capture | No | No | No | No |
| Hiệu trưởng / Board | Full Enterprise | Read Only | View Only | Full | Full Enterprise | Full |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người xem/mở khóa hiển thị số điện thoại đầy đủ của Phụ huynh (Unmask Phone Action) kèm Timestamp và lý do.  
*   
* Nhật ký cuộc gọi từ CTI Call Center: Timestamp gọi, Thời lượng cuộc gọi, Link file ghi âm cuộc gọi.  
*   
* Lịch sử chuyển trạng thái Lead (Ai chuyển, Thời gian, Trạng thái cũ, Trạng thái mới).  
*   
* Nhật ký thu hồi Lead tự động do Quá SLA 15 phút (Auto-Recycle Event).  
*   
* Lịch sử chỉnh sửa kết quả Assessment hoặc thay đổi mức Discount trên Offer.  
* 

## **23\. Internal Controls**

* **Data Masking Enforcement:** Mặc định ẩn số điện thoại Phụ huynh trên toàn bộ giao diện làm việc của Tư vấn viên để triệt tiêu rủi ro sao chép/mất cắp dữ liệu khách hàng.  
*   
* **CTI Call Mandate:** Bắt buộc thực hiện cuộc gọi qua Tổng đài CTI tích hợp trên ERP để ghi âm 100% tương tác tư vấn, phục vụ kiểm soát chất lượng (QA).  
*   
* **Dual-Control for Special Needs Enrollment:** Bắt buộc có ý kiến phê duyệt của Academic Manager và Hiệu trưởng đối với các trường hợp trẻ có cờ cảnh báo SEN trước khi ban hành Offer.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Xử lý Lead Mới (Speed-to-Call)** | Thời gian từ khi Lead vào ERP đến cuộc gọi đầu tiên | **\<= 15 phút** | Admission Officer |
| **Tỷ lệ Chuyển đổi Lead \-\> School Tour** | (Số Lead hoàn tất Tour / Tổng số Lead nhận) \* 100 | Target: TBD | Admission Manager |
| **Tỷ lệ Chuyển đổi School Tour \-\> Offer** | (Số Offer phát hành / Số Lead hoàn tất Tour) \* 100 | Target: TBD | Admission Manager |
| **Chi phí trên Một Học sinh Nhập học (CAC)** | Tổng chi phí Marketing & Sales / Số học sinh Enrolled | Target: TBD | Marketing & Admission Mgr |

## **25\. Dashboard / Report**

* **Lead Funnel Real-time Dashboard (Tuyển sinh):** Biểu đồ phễu chuyển đổi real-time (Lead \-\> Contacted \-\> Tour \-\> Assessment \-\> Offer \-\> Enrolled), Báo cáo SLA tốc độ gọi Lead của từng tư vấn viên.  
*   
* **Marketing Performance & ROI Report (Marketing):** Báo cáo số lượng Lead, Tỷ lệ chuyển đổi và Chi phí CAC chi tiết theo từng kênh (Facebook, Google, Zalo, Referral, Event).  
*   
* **Executive Admission & Occupancy Projection (Board/CEO):** Báo cáo dự báo sĩ số lấp đầy (Occupancy Rate) các cơ sở trong 3-6 tháng tới dựa trên tốc độ chuyển đổi phễu tuyển sinh hiện tại.  
* 

## **26\. Integration**

* **Omnichannel Marketing APIs (Facebook Lead Ads, Google Ads, Zalo OA, Website Webhook):** Tự động đẩy Lead về ERP tức thì.  
*   
* **Tổng đài CTI Cloud Call Center (CRM Call Integration):** Bấm gọi trực tiếp trên Web/App, hiển thị Pop-up thông tin khách khi có cuộc gọi đến (Inbound Popup), tự động lưu file ghi âm.  
*   
* **Student Enrollment Engine (SOP-ADM-003):** Tự động chuyển giao toàn bộ dữ liệu Lead/Applicant sang phân hệ Hợp đồng & Thu phí.  
*   
* **Zalo Notification Service (ZNS) & SMS Brandname:** Tự động gửi tin nhắn xác nhận lịch hẹn, mã QR Check-in và Thư mời nhập học.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Mất cắp/Mộc dữ liệu SĐT Phụ huynh sang đối thủ** | Critical | Low | Mã hóa ẩn SĐT (Phone Masking); Bắt buộc gọi qua CTI; Chặn quyền Export Excel. | IT System & Admission Mgr |
| **Chậm trễ gọi Lead khiến Phụ huynh chọn trường khác** | High | Medium | Auto-Recycle Engine tự động thu hồi Lead quá 15 phút; Báo động đỏ cho Manager. | Admission Manager |
| **Đánh giá sai lệch năng lực trẻ gây bức xúc cho Phụ huynh** | High | Low | Chuẩn hóa Bảng tiêu chí Assessment trên Tablet; Duyệt 2 cấp đối với trẻ SEN. | Academic Manager & Assessor |
| **Sai lệch chi phí chiết khấu/ưu đãi tuyển sinh** | Medium | Medium | Khóa cứng chính sách phí trên ERP; Áp dụng Approval Matrix 3 cấp cho Discount ngoại lệ. | CFO & Admission Mgr |

## **28\. Acceptance Criteria**

* **Given:** Một Phụ huynh điền Form đăng ký tư vấn trên Facebook Ads.  
*   
* **When:** Hệ thống ERP nhận dữ liệu qua Webhook API.  
*   
* **Then:** ERP tự động quét trùng SĐT trong 3 giây. Nếu là SĐT mới, ERP tính điểm Lead, phân bổ cho Tư vấn viên A theo quy tắc Round-Robin, kích hoạt đồng hồ đếm ngược SLA 15 phút và phát Push Notification tới điện thoại của Tư vấn viên A.  
*   
* **Given:** Tư vấn viên A không thực hiện cuộc gọi qua tổng đài CTI cho Lead trong vòng 15 phút làm việc.  
*   
* **When:** Đồng hồ SLA chạm mốc 15 phút 00 giây.  
*   
* **Then:** ERP tự động chuyển trạng thái Lead sang Recycled, thu hồi quyền truy cập của Tư vấn viên A, phân bổ Lead cho Tư vấn viên B và gửi cảnh báo vi phạm SLA tới Dashboard của Admission Manager.  
* 

## **29\. Test Scenarios**

1. **Happy Path Test:** Lead vào từ Webhook \-\> Quét trùng Pass \-\> Phân bổ TVV A \-\> Gọi CTI trong 5 phút \-\> Đặt lịch Tour \-\> Phụ huynh Check-in QR \-\> Assessment Pass \-\> Auto Handoff sang SOP-ADM-003.  
2.   
3. **Deduplication Test:** Cố tình nhập 1 Lead mới có SĐT đã tồn tại trên ERP \-\> Kiểm tra xem ERP có chặn tạo Lead mới và gộp lịch sử vào Lead cũ không.  
4.   
5. **15-Minute SLA Auto-Recycle Test:** Phân bổ Lead mới nhưng cố tình KHÔNG bấm gọi CTI trong 15 phút \-\> Kiểm tra xem ERP có tự động thu hồi và chuyển cho TVV khác không.  
6.   
7. **Phone Masking & Permission Test:** Đăng nhập tài khoản Admission Officer cố tình xem số điện thoại Phụ huynh \-\> Kiểm tra xem SĐT có bị ẩn dạng 090\*\*\*\*123 và không có nút Copy không.  
8.   
9. **SEN Assessment Review Test:** Assessor đánh giá trẻ có dấu hiệu SEN (SEN Flag \= YES) \-\> Kiểm tra xem ERP có khóa nút phát hành Offer và yêu cầu Workflow duyệt của Academic Manager/Hiệu trưởng không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận quy tắc phân bổ Lead (Round-Robin/Campus); Cấu hình khung thời gian SLA (15 phút); Cấu hình kịch bản tin nhắn Zalo OA/SMS xác nhận lịch hẹn; Cấu hình bảng tiêu chí Assessment.  
*   
* **Master Data Migration:** Import danh sách Lead cũ từ file Excel/CRM cũ, chạy công cụ Deduplication làm sạch dữ liệu trước khi đưa vào ERP chính thức.  
*   
* **Integration & Testing:** Tích hợp API CTI Cloud Call Center với các nhà mạng (Viettel, VNPT, Mobifone); Test kết nối Webhook tải cao từ Facebook Lead Ads dưới kịch bản 500 Lead/giờ.  
*   
* **Training & Change Management:** Đào tạo Phòng Tuyển sinh quy trình gọi điện qua CTI và quản lý phễu trên ERP; Đào tạo Lễ tân quy trình quét QR Check-in School Tour; Đào tạo Giáo viên thao tác Assessment trên Tablet.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (8 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), Tổ chức School Tour & Khảo sát Hòa nhập (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  8.   
  9. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  10.   
  11. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  12.   
  13. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  14.   
  15. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  16.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **17 SOPs**.

### **2\. Sơ đồ Chuỗi Giá trị End-to-End đã Phủ sóng (Value Chain Coverage)**

\[SOP-CRM-001: Lead & Tour\] ──► \[SOP-ADM-003: Enrollment & Contract\] ──► \[SOP-FIN-001: Billing & Tuition\]  
                                                                                │  
┌───────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────┐  
│                                                      DAILY OPERATIONS & SAFEGUARDING                                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬────────────────────────────────────────────┤  
│ SOP-SIS-001: Pickup & Checkin  │ SOP-BUS-001: School Bus Safety │ SOP-KIT-001: Kitchen & Nutrition│ SOP-MED-001: Health & Medication           │  
│ • Attendance & Dynamic QR      │ • End-of-Trip Rear Seat Check  │ • Recipe BOM & 24h Retention   │ • 3-Point Medication Check                 │  
│ • Safeguarding Alert 09:15 AM  │ • 3-Way Attendance Cross-Check │ • Real-time Attendance Scaling │ • Incident Governance                      │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴────────────────────────────────────────────┘  
                                                                                │  
                                                      \[SOP-HR-001: Staff, Teaching & Payroll\]

# Thẻ 10

# **SOP-CRM-001 — QUY TRÌNH QUẢN LÝ PHỄU TUYỂN SINH (LEAD-TO-ENROLLMENT), TỔ CHỨC SCHOOL TOUR, ĐÁNH GIÁ HÒA NHẬP VÀ TỐI ƯU TỶ LỆ CHUYỂN ĐỔI CRM**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-CRM-001  
*   
* **Tên SOP:** Quy trình Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), Tổ chức School Tour, Đánh giá Khả năng Hòa nhập của Trẻ và Tối ưu Tỷ lệ Chuyển đổi CRM  
*   
* **Module ERP:** CRM & Lead Management (01), Marketing & Campaign (02), Admission / Tuyển sinh (03), Parent / Guardian Management (05)  
*   
* **Process Owner:** Admission Manager (Trưởng phòng Tuyển sinh)  
*   
* **Department:** Phòng Tuyển sinh & Dịch vụ Khách hàng, Phòng Marketing  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Điều hành (CEO) / Board  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ vòng đời chuyển đổi cơ hội tuyển sinh mầm non từ lúc tiếp nhận thông tin quan tâm (Inquiry/Lead) qua các kênh Marketing đa điểm (Omnichannel), tự động phân bổ Lead cho Tư vấn viên (Admission Officer), đặt lịch và tổ chức Tham quan trường (School Tour), thực hiện Khảo sát đánh giá tâm lý vận động/hòa nhập của trẻ (Assessment), đến khi phát hành Thư mời Nhập học (Offer Letter) và chuyển giao hồ sơ sang SOP-ADM-003; tối đa hóa Tỷ lệ Chuyển đổi (Conversion Rate), rút ngắn thời gian xử lý Lead và triệt tiêu hoàn toàn rủi ro bỏ sót/lộ rò rỉ dữ liệu Phụ huynh.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Áp dụng bắt buộc trên toàn bộ các cơ sở mầm non thuộc hệ thống trường tư thục / quốc tế / chuỗi nhiều cơ sở.  
*   
* **Phòng ban:** Phòng Tuyển sinh, Phòng Marketing, Chuyên gia/Giáo viên Đánh giá (Academic Assessor), Bộ phận Chăm sóc khách hàng, Ban Giám hiệu Cơ sở, Bộ phận Lễ tân/Bảo vệ Cổng.  
*   
* **Đối tượng:** Toàn bộ Phụ huynh có nhu cầu tìm hiểu trường (Lead/Inquiry), Học sinh tiềm năng (Applicant).  
*   
* **Trường hợp không áp dụng:** Học sinh đang học xin chuyển tiếp giữa các cơ sở trong cùng hệ thống (áp dụng SOP-ADM-007: Quy trình Chuyển Cơ sở Học sinh Inter-Campus Transfer).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Lead / Inquiry:** Cơ hội kinh doanh tuyển sinh thể hiện sự quan tâm của Phụ huynh đối với nhà trường qua các kênh (Website, Facebook, Zalo, Hotline, Event, Referral).  
*   
* **Lead Scoring (Chấm điểm Cơ hội):** Thuật toán tự động trên ERP gán điểm số cho Lead dựa trên mức độ hoàn thiện thông tin, độ tuổi của trẻ, khả năng tài chính và mức độ tương tác (Mở email, nhắn tin, đặt lịch School Tour).  
*   
* **School Tour:** Buổi tham quan cơ sở vật chất và trải nghiệm môi trường học tập trực tiếp tại cơ sở mầm non do Admission Officer dẫn dắt.  
*   
* **Assessment (Khảo sát Hòa nhập):** Buổi đánh giá ngắn (30-45 phút) do Giáo viên Mầm non/Chuyên gia Tâm lý thực hiện nhằm nhận biết mức độ phát triển vận động, ngôn ngữ, cảm xúc \- xã hội và xác định trẻ có nhu cầu chăm sóc đặc biệt (SEN) hay không.  
*   
* **Auto-Assignment Rule:** Quy tắc tự động phân bổ Lead trên ERP dựa trên địa bàn địa lý, cơ sở mong muốn, dung lượng chứa của tư vấn viên (Workload) hoặc xoay vòng (Round-Robin).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Thu hút Lead & Tích hợp Kênh Marketing | Marketing Executive | Marketing Manager | Admission Mgr | ERP System Admin |
| Tiếp nhận, Quét trùng & Phân bổ Lead | ERP System / Lễ tân | Admission Manager | Admission Officer | Marketing Team |
| Tư vấn, Chăm sóc & Đặt lịch School Tour | Admission Officer | Admission Manager | Phụ huynh | Lễ tân / BGH |
| Tổ chức School Tour & Trải nghiệm | Admission Officer | Hiệu trưởng Cơ sở | Lễ tân / Bảo vệ | Phụ huynh |
| Thực hiện Assessment Khảo sát Hòa nhập | Academic Assessor | Academic Manager | Y tế học đường | Admission Officer |
| Duyệt Kết quả Assessment & Đề xuất Offer | Admission Manager | Hiệu trưởng Cơ sở | Academic Assessor | Kế toán / Phụ huynh |

*Ghi chú: Việc thu thập thông tin cá nhân của Phụ huynh và trẻ em trong quá trình tư vấn tuyển sinh cần kiểm tra/đối chiếu quy định hiện hành về bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Kênh Marketing (MarketingChannelMaster), Danh mục Cơ sở & Khối Lớp (CampusClassMaster), Chỉ tiêu Tuyển sinh & Sĩ số Lấp đầy (EnrollmentQuotaMaster), Khung Đánh giá Hòa nhập (AssessmentCriteriaMaster).  
*   
* **Dữ liệu Đầu vào:** Thông tin Lead phát sinh từ Website Form, Landing Page, Zalo Mini App, Tổng đài Call Center, hoặc Phụ huynh đến trực tiếp Lễ tân (Walk-in).  
*   
* **System Prerequisite:** Các kênh Marketing Digital đã được kết nối Webhook API với hệ thống ERP CRM; Phân quyền RBAC tư vấn viên sẵn sàng.  
* 

## **7\. Trigger**

* **Online Lead:** Phụ huynh điền Form đăng ký / Nhắn tin Zalo / Gọi Hotline trường.  
*   
* **Offline / Walk-in Lead:** Phụ huynh đến trực tiếp Cổng trường/Lễ tân yêu cầu tư vấn.  
*   
* **System Schedule:** Lịch nhắc tự động (Follow-up Schedule) trên ERP đếm ngược thời gian cần liên hệ lại cho Lead.  
* 

## **8\. Quy trình AS-IS**

* Marketing thu thập thông tin Phụ huynh từ Facebook Ads rồi xuất file Excel gửi qua Email cho Trưởng phòng Tuyển sinh vào cuối ngày.  
*   
* Trưởng phòng Tuyển sinh chia Lead thủ công bằng tay vào file Google Sheet chung cho các tư vấn viên.  
*   
* Tư vấn viên dùng điện thoại cá nhân gọi điện, nhắn tin Zalo cá nhân cho Phụ huynh, không lưu vết nhật ký cuộc gọi.  
*   
* Lịch School Tour được ghi chép vào sổ tay hoặc lịch Google Calendar riêng. Khi Phụ huynh đến trường, Lễ tân không biết thông tin phải gọi điện tìm tư vấn viên.  
*   
* Kết quả đánh giá trẻ (Assessment) do giáo viên viết vào giấy A4 gửi lại phòng tuyển sinh, dễ thất lạc.  
*   
* **Hệ quả:** Thời gian phản hồi Lead chậm (từ 12–24 giờ); rò rỉ dữ liệu Phụ huynh khi nhân viên tuyển sinh nghỉ việc; trùng lặp chăm sóc giữa các tư vấn viên; không đo lường được Tỷ lệ Chuyển đổi thực tế của từng kênh Marketing.  
* 

## **9\. Pain Points / Risk**

* **High Lead Leakage & Delayed SLA:** Lead nóng không được xử lý trong 15 phút đầu, dẫn đến Phụ huynh đăng ký sang trường đối thủ.  
*   
* **Data Theft / Leakage Risk:** Tư vấn viên dùng Zalo/Sổ cá nhân lưu trữ SĐT Phụ huynh, dẫn đến rủi ro mang dữ liệu sang trường khác khi nghỉ việc.  
*   
* **Duplicate Contacting:** 2 tư vấn viên thuộc 2 cơ sở khác nhau cùng gọi điện tư vấn cho 1 Phụ huynh do hệ thống không quét trùng trùng số điện thoại.  
*   
* **No ROI Transparency:** Không thể đo lường chính xác chi phí trên một học sinh nhập học thực tế (Cost-per-Enrolled-Student) cho từng chiến dịch Marketing.  
*   
* **Inconsistent Assessment:** Đánh giá trẻ mầm non mang tính cảm quan, thiếu bộ tiêu chí chuẩn hóa dẫn đến phản ứng tiêu cực từ Phụ huynh khi trẻ bị từ chối nhập học.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận Lead Đa kênh, Quét trùng & Phân bổ Tự động (Omnichannel Lead Ingestion & Auto-Assignment)**

* **Step 01:**  
* 

  * **Actor:** ERP System (Omnichannel Integration Engine).  
  *   
  * **Action:** Lead phát sinh từ Facebook Ads, Website, Zalo OA, Call Center hoặc QR Event được tự động đẩy về ERP qua Webhook API. Đối với khách Walk-in, Lễ tân nhập trực tiếp trên màn hình Quick Lead Capture.  
  *   
  * **ERP Function:** Omnichannel Lead Ingestion & Deduplication.  
  *   
  * **Input:** Họ tên Phụ huynh, SĐT, Email, Tên bé, Ngày sinh bé, Cơ sở quan tâm, Kênh Nguồn.  
  *   
  * **Output:** Hồ sơ Lead Mới (New Lead Record).  
  *   
  * **Business Rule:** BR-CRM-001: Hệ thống tự động kích hoạt Deduplication Algorithm theo Số điện thoại / Email. Nếu SĐT đã tồn tại trên ERP, hệ thống chặn tạo mới, tự động gắn Activity mới vào Lead cũ và báo thông báo cho Tư vấn viên đang phụ trách.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** New Lead / Deduplicated.  
  *   
  * **SLA:** Real-time (\<= 3 giây).  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** ERP System (Lead Assignment Engine).  
  *   
  * **Action:** ERP tự động chấm điểm Lead (Lead Scoring) dựa trên độ tuổi học sinh và mức độ hoàn thiện thông tin, sau đó phân bổ Lead cho Admission Officer theo quy tắc Round-Robin (Xoay vòng) hoặc theo Cơ sở quan tâm.  
  *   
  * **ERP Function:** Auto Lead Assignment & Scoring.  
  *   
  * **Input:** New Lead Record \+ Ma trận Phân bổ AssignmentRuleMaster.  
  *   
  * **Output:** Lead được gán cho Tư vấn viên (Assigned Lead).  
  *   
  * **Business Rule:** BR-CRM-002: Tư vấn viên phải thực hiện cuộc gọi đầu tiên cho Lead trong vòng **15 phút làm việc** kể từ khi nhận phân bổ. Quá 15 phút không tác động, ERP tự động thu hồi Lead và chuyển sang tư vấn viên khác.  
  *   
  * **Status Before:** New Lead.  
  *   
  * **Status After:** Assigned to Officer.  
  *   
  * **SLA:** \<= 1 phút cho phân bổ tự động.  
  *   
  * **Notification:** High Priority Alert trên Mobile App/Desktop của Admission Officer: *"Bạn nhận được 1 Lead Mới \[Tên Phụ huynh\] \- SĐT \[SĐT\]. SLA xử lý còn 15 phút"*.  
  * 

### **Giai đoạn 2: Tư vấn, Nurturing & Đặt lịch School Tour (Lead Nurturing & Tour Scheduling)**

* **Step 03:**  
* 

  * **Actor:** Admission Officer.  
  *   
  * **Action:** Admission Officer thực hiện cuộc gọi tư vấn trực tiếp từ ERP (Tích hợp Tổng đài CTI Cloud Call Center). Ghi nhận nhu cầu, cập nhật thông tin bé và chốt lịch School Tour trên màn hình Lịch Tuyển sinh.  
  *   
  * **ERP Function:** CTI Call Integration & School Tour Booking.  
  *   
  * **Input:** Nhật ký cuộc gọi (Auto-recorded), Ngày giờ hẹn School Tour.  
  *   
  * **Output:** Lịch hẹn School Tour chính thức (Tour Scheduled).  
  *   
  * **Business Rule:** BR-CRM-003: Lịch School Tour không được đặt vượt quá giới hạn khung giờ cho phép (Max 3 gia đình / khung giờ 45 phút) để đảm bảo chất lượng trải nghiệm.  
  *   
  * **Status Before:** In Contact.  
  *   
  * **Status After:** School Tour Scheduled.  
  *   
  * **SLA:** Cuộc gọi đầu tiên thực hiện trong \<= 15 phút.  
  *   
  * **Notification:** Tự động gửi SMS Brandname \+ Zalo OA xác nhận Lịch hẹn kèm Sơ đồ chỉ đường cho Phụ huynh; Đồng bộ lịch hiển thị tại Lễ tân Cổng.  
  * 

### **Giai đoạn 3: Tổ chức School Tour & Khảo sát Hòa nhập (School Tour & Student Assessment)**

* **Step 04:**  
* 

  * **Actor:** Lễ tân Cổng, Admission Officer & Phụ huynh.  
  *   
  * **Action:** Phụ huynh đến trường. Lễ tân quét mã QR Check-in trên tin nhắn Zalo của Phụ huynh (hoặc tìm theo SĐT trên Kiosk Lễ tân). ERP phát tín hiệu "Khách đã đến" tới Tablet của Admission Officer. Admission Officer đón tiếp và dẫn đi tham quan trường theo kịch bản chuẩn.  
  *   
  * **ERP Function:** Visitor Check-in & School Tour Execution.  
  *   
  * **Input:** QR Code Lịch hẹn / SĐT Phụ huynh.  
  *   
  * **Output:** Nhật ký School Tour (Tour Checked-in & Completed).  
  *   
  * **Status Before:** School Tour Scheduled.  
  *   
  * **Status After:** Tour Completed.  
  *   
  * **SLA:** Lễ tân đón tiếp trong \<= 2 phút.  
  *   
  * **Notification:** Notification gửi Hiệu trưởng Cơ sở ghi nhận có khách School Tour.  
  *   
* **Step 05:**  
* 

  * **Actor:** Academic Assessor (Giáo viên / Chuyên gia Đánh giá).  
  *   
  * **Action:** Trẻ được đưa vào Phòng Khảo sát Trải nghiệm. Academic Assessor sử dụng Tablet mở Phân hệ Assessment Tool, thực hiện đánh giá trẻ theo Bảng Tiêu chí Chuẩn hóa mầm non (Vận động thô, Vận động tinh, Ngôn ngữ, Cảm xúc \- Xã hội), đính kèm video/hình ảnh thực tế và bấm "Hoàn tất Đánh giá".  
  *   
  * **ERP Function:** Student Development Assessment Tool.  
  *   
  * **Input:** Tương tác của trẻ, Bảng tiêu chí đánh giá theo độ tuổi.  
  *   
  * **Output:** Báo cáo Khảo sát Hòa nhập (Assessment Report) đính kèm trạng thái Passed / Conditional Accepted / SEN (Special Needs) Warning.  
  *   
  * **Business Rule:** BR-CRM-004: Trẻ có dấu hiệu Cần chăm sóc đặc biệt (SEN) bắt buộc phải có ý kiến phê duyệt chuyên môn của Academic Manager và Hiệu trưởng trước khi chuyển sang bước phát hành Offer.  
  *   
  * **Status Before:** Assessment Pending.  
  *   
  * **Status After:** Assessment Completed.  
  *   
  * **SLA:** \<= 45 phút / lượt đánh giá.  
  *   
  * **Notification:** Kết quả đồng bộ real-time sang màn hình của Admission Officer.  
  * 

### **Giai đoạn 4: Chuyển đổi Sang Application & Phát hành Offer Nhập học (Offer Generation & Handoff)**

* **Step 06:**  
* 

  * **Actor:** Admission Officer & Admission Manager.  
  *   
  * **Action:** Kết quả Assessment đạt. Admission Officer nhấn "Chuyển thành Application", chọn Biểu phí & Chính sách ưu đãi hợp lệ trên ERP và trình duyệt Thư mời Nhập học (Offer Letter).  
  *   
  * **ERP Function:** Application Creation & Offer Approval Workflow.  
  *   
  * **Input:** Assessment Report \+ Fee Structure.  
  *   
  * **Output:** Thư mời Nhập học (Offer Letter) được duyệt.  
  *   
  * **Business Rule:** Chuyển giao toàn bộ dữ liệu Lead/Applicant đã xác minh sang SOP-ADM-003 để thực hiện ký Hợp đồng Đào tạo và Thu tiền cọc/học phí.  
  *   
  * **Status Before:** Assessment Completed.  
  *   
  * **Status After:** Offer Letter Issued.  
  *   
  * **SLA:** Phát hành Offer trong vòng 24 giờ sau School Tour.  
  *   
  * **Notification:** Thư mời nhập học đính kèm VietQR gửi tự động qua App Phụ huynh, Zalo OA và Email.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Lead Phát Sinh (Website / FB / Zalo / Call Center / Walk-in)\]  
       │  
       ▼  
\[ERP Omnichannel Engine: Automatic Deduplication Check (Theo SĐT/Email)\]  
       │  
       ◇ Phát hiện Lead Trùng?  
       ├─ YES ──► \[Gộp Activity Vào Hồ Sơ Cũ ──► Alert Tư Vấn Viên Đang Phụ Trách\]  
       └─ NO  ──┐  
                │  
                ▼  
\[ERP Auto-Scoring & Lead Assignment Engine (Xoay vòng / Theo Cơ sở)\]  
                │  
                ▼  
\[Admission Officer Gọi Điện Tư Vấn CTI Call Center (SLA \<= 15 phút)\]  
                │  
                ▼  
\[Đặt Lịch School Tour Trên ERP ──► Auto SMS/Zalo Xác Nhận \+ Mã QR Check-in\]  
                │  
                ▼  
\[Phụ Huynh Đến Trường: Check-in Tại Kiosk Lễ Tân ──► Thực Hiện School Tour\]  
                │  
                ▼  
\[Academic Assessor: Khảo Sát Hòa Nhập Cho Trẻ Trên Tablet (Assessment Tool)\]  
                │  
                ◇ Trẻ có Cảnh báo Nhu cầu Đặc biệt (SEN)?  
                ├─ YES ──► \[Review Chuyên Môn: Academic Manager & Hiệu Trưởng\]  
                └─ NO  ──┐  
                         │  
                         ▼  
\[Admission Officer: Khởi Tạo Application ──► Trình Duyệt Offer Letter\]  
                         │  
                         ▼  
\[ERP Auto Publish Offer Letter \+ VietQR Dynamic ──► Handoff Sang SOP-ADM-003\]  
                         │  
                         ▼  
                    \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-CRM-001 (Deduplication Rule):** Hệ thống tự động kiểm tra trùng lặp theo Số điện thoại và Email Phụ huynh trên toàn bộ dữ liệu chuỗi đa cơ sở. Nếu có sự trùng lặp, ERP khóa không cho tạo Lead mới và chuyển quyền xử lý cho Tư vấn viên đang sở hữu Lead cũ.  
*   
* **BR-CRM-002 (SLA Rule):** Tư vấn viên phải gọi cuộc gọi đầu tiên trong vòng **15 phút làm việc** kể từ khi nhận Lead. Quá 15 phút không có tương tác ghi nhận từ CTI Call Center, ERP tự động thu hồi Lead (Auto-Recycle) và chuyển cho Tư vấn viên tiếp theo.  
*   
* **BR-CRM-003 (Capacity Control):** Số lượng lịch hẹn School Tour mỗi khung giờ tự động giới hạn không quá **03 gia đình/khung giờ/cơ sở** để đảm bảo trải nghiệm khách hàng xuất sắc.  
*   
* **BR-CRM-004 (Special Needs Control):** Trẻ được đánh giá có nhu cầu chăm sóc đặc biệt (SEN \- Special Educational Needs) hoặc có tiền sử dị ứng nguy hiểm bắt buộc phải qua luồng Duyệt Đặc biệt (Special Review Workflow) của Hiệu trưởng trước khi ban hành Thư mời Nhập học.  
*   
* **BR-CRM-005 (Data Protection):** Toàn bộ số điện thoại Phụ huynh trên màn hình ERP mặc định bị mã hóa ẩn 3 số giữa (Ví dụ: 090\*\*\*\*123). Tư vấn viên thực hiện cuộc gọi trực tiếp qua nút bấm CTI Call trên phần mềm, không hiển thị số đầy đủ để tránh sao chép dữ liệu.  
* 

## **13\. Exception Cases**

* **Phụ huynh đến trường trực tiếp không đặt lịch trước (Walk-in Lead):** Lễ tân mở màn hình Quick Walk-in Capture, nhập thông tin Phụ huynh. ERP tự động kiểm tra trùng và phân bổ ngay cho Tư vấn viên trực ca tại cơ sở (On-duty Officer) tiếp đón trong vòng 3 phút.  
*   
* **Phụ huynh hủy hoặc đổi lịch School Tour sát giờ:** Phụ huynh bấm đổi lịch trên Zalo OA / App hoặc gọi điện. ERP cập nhật trạng thái Tour Rescheduled, giải phóng khung giờ cũ cho khách khác và gửi thông báo cập nhật cho Lễ tân.  
*   
* **Trẻ không hợp tác trong buổi Assessment (Quấy khóc, không chịu tương tác):** Assessor ghi nhận trạng thái Incomplete \- Needs Re-assessment. ERP lên lịch hẹn buổi khảo sát lại lần 2 sau 3–5 ngày.  
*   
* **Tư vấn viên nghỉ việc (Employee Offboarding):** Admin thực hiện tính năng Mass Lead Re-assignment. ERP tự động chuyển giao toàn bộ Lead đang theo dõi của nhân viên cũ sang cho nhân viên mới đính kèm đầy đủ Lịch sử tương tác và File ghi âm cuộc gọi.  
* 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Thu hồi & Chuyển giao Lead do Quá SLA | System Auto-Recycle | Admission Manager | N/A |
| Phê duyệt Đơn Đăng ký School Tour Ngoại lệ | Admission Officer | Admission Manager | N/A |
| Phê duyệt Báo cáo Assessment Trẻ SEN / Dị ứng Nặng | Academic Assessor | Academic Manager | Hiệu trưởng Cơ sở |
| Phê duyệt Mức Ưu đãi / Discount Ngoại lệ trên Offer | Admission Manager | Hiệu trưởng Cơ sở | CFO / Board |

## **15\. Status Lifecycle**

* **Lead Status:** New \-\> Assigned \-\> In Contact \-\> Tour Scheduled \-\> Tour Completed \-\> Assessment Pending \-\> Assessment Completed \-\> Converted to Application (hoặc Lost / Disqualified).  
*   
* **Assessment Status:** Scheduled \-\> In Progress \-\> Passed \-\> Conditional Accepted \-\> SEN Warning \-\> Re-assessment Required.  
* 

## **16\. Data Model**

* **Primary Entity:** Lead  
* 

  * LeadID (PK, String, Unique)  
  *   
  * ParentName, PhoneMasked (String), Email, Address  
  *   
  * ChildName, ChildDOB (Date), ChildGender  
  *   
  * PreferredCampusID (FK), MarketingChannelID (FK), CampaignID (FK)  
  *   
  * AssignedOfficerID (FK), LeadScore (Integer)  
  *   
  * LeadStatus (Enum), LostReason (Enum)  
  *   
* **Related Entities:**  
* 

  * LeadActivityLog: ActivityID (PK), LeadID (FK), ActivityType (Enum: Call, Email, Zalo, Meeting), Note (Text), CallRecordingURL (String), Timestamp (DateTime), CreatedBy (FK).  
  *   
  * SchoolTourBooking: TourID (PK), LeadID (FK), CampusID (FK), ScheduledDateTime (DateTime), CheckInTime (DateTime), TourStatus (Enum).  
  *   
  * StudentAssessment: AssessmentID (PK), LeadID (FK), AssessorID (FK), MotorSkillsScore (Integer), LanguageScore (Integer), SocialScore (Integer), SENFlag (Boolean), AssessmentResult (Enum), AssessmentReportURL (String).  
  * 

## **17\. Forms / Documents**

* FRM-CRM-001: Phiếu Tiếp nhận Thông tin Tư vấn Tuyển sinh (Inquiry / Lead Capture Form).  
*   
* FRM-CRM-002: Thư Xác nhận Lịch hẹn Tham quan Trường (School Tour Confirmation & QR Ticket).  
*   
* FRM-CRM-003: Phiếu Khảo sát Đánh giá Mức độ Phát triển & Hòa nhập của Trẻ Mầm non.  
*   
* FRM-CRM-004: Báo cáo Phân tích Nguyên nhân Thất thoát Lead (Lead Lost Reason Analysis Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-CRM-001 (MUST):** Tích hợp Omnichannel Webhook Engine nhận diện Lead tức thì từ Facebook Ads, Zalo OA, Website Form và Call Center.  
*   
* **FR-CRM-002 (MUST):** Cung cấp công cụ Deduplication Check tự động quét trùng lặp số điện thoại và mã hóa ẩn số điện thoại (Phone Masking) bảo vệ dữ liệu.  
*   
* **FR-CRM-003 (MUST):** Tích hợp Tổng đài CTI Cloud Call Center cho phép bấm gọi trực tiếp trên ERP, tự động ghi âm cuộc gọi và lưu file ghi âm vào hồ sơ Lead.  
*   
* **FR-CRM-004 (MUST):** Cung cấp App Tablet Assessment Tool cho Giáo viên thực hiện khảo sát sự phát triển của trẻ trực quan, chấm điểm theo tiêu chí mầm non chuẩn hóa.  
*   
* **FR-CRM-005 (SHOULD):** Thuật toán Auto Lead Recycling: Tự động thu hồi Lead nếu Tư vấn viên không liên hệ trong vòng 15 phút làm việc.  
* 

## **19\. Automation Opportunities**

* **AUTO-CRM-001 (INTEGRATION):** Tự động nhận dữ liệu Lead đa kênh qua API, quét trùng và phân bổ cho Tư vấn viên theo quy tắc Round-Robin trong 1 phút.  
*   
* **AUTO-CRM-002 (WORKFLOW):** Tự động gửi SMS Brandname / Zalo OA xác nhận Lịch hẹn School Tour kèm mã QR Check-in và vị trí Google Maps cho Phụ huynh ngay khi chốt lịch.  
*   
* **AUTO-CRM-003 (RULE ENGINE):** Tự động thu hồi Lead quá SLA 15 phút không chăm sóc và tự động cảnh báo cho Admission Manager.  
*   
* **AUTO-CRM-004 (INTEGRATION):** Tự động chuyển giao toàn bộ thông tin Lead, kết quả Assessment sang Phân hệ Student Enrollment (SOP-ADM-003) để tạo Thư mời Nhập học mà không cần nhập lại dữ liệu.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Phân bổ Lead Mới cho Tư vấn viên | Admission Officer | Mobile App Push \+ ERP Pop-up | Immediate (\<= 1 phút) |
| Cảnh báo Quá SLA 15 phút chưa gọi Lead | Admission Officer & Manager | ERP High Alert \+ Sound | At 15-minute mark |
| SMS / Zalo OA Xác nhận Lịch School Tour | Phụ huynh | Zalo OA \+ SMS Brandname | Immediate khi book tour |
| Nhắc nhở Phụ huynh Trước Giờ School Tour | Phụ huynh | Zalo OA / App Push | Prior to tour 2 hours |
| Khách School Tour Check-in Tại Cổng | Admission Officer & BGH | ERP Pop-up \+ App Push | Real-time (Lễ tân quét QR) |

## **21\. Permission Matrix (RBAC)**

| Role | View Lead | Create/Edit Lead | Make CTI Call | Access Phone Unmasked | Approve Offer | Export Lead Data |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Admission Officer | Assigned Only | Full | Full | No | No | No |
| Admission Manager | Campus Full | Full | Full | Full (Audit Logged) | Full (In Limit) | Full |
| Marketing Staff | Aggregate Only | Edit Campaign | No | No | No | Read Only |
| Academic Assessor | Assigned Tour | Assessment Only | No | No | No | No |
| Lễ tân / Guard | Tour List Only | Quick Capture | No | No | No | No |
| Hiệu trưởng / Board | Full Enterprise | Read Only | View Only | Full | Full Enterprise | Full |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người xem/mở khóa hiển thị số điện thoại đầy đủ của Phụ huynh (Unmask Phone Action) kèm Timestamp và lý do.  
*   
* Nhật ký cuộc gọi từ CTI Call Center: Timestamp gọi, Thời lượng cuộc gọi, Link file ghi âm cuộc gọi.  
*   
* Lịch sử chuyển trạng thái Lead (Ai chuyển, Thời gian, Trạng thái cũ, Trạng thái mới).  
*   
* Nhật ký thu hồi Lead tự động do Quá SLA 15 phút (Auto-Recycle Event).  
*   
* Lịch sử chỉnh sửa kết quả Assessment hoặc thay đổi mức Discount trên Offer.  
* 

## **23\. Internal Controls**

* **Data Masking Enforcement:** Mặc định ẩn số điện thoại Phụ huynh trên toàn bộ giao diện làm việc của Tư vấn viên để triệt tiêu rủi ro sao chép/mất cắp dữ liệu khách hàng.  
*   
* **CTI Call Mandate:** Bắt buộc thực hiện cuộc gọi qua Tổng đài CTI tích hợp trên ERP để ghi âm 100% tương tác tư vấn, phục vụ kiểm soát chất lượng (QA).  
*   
* **Dual-Control for Special Needs Enrollment:** Bắt buộc có ý kiến phê duyệt của Academic Manager và Hiệu trưởng đối với các trường hợp trẻ có cờ cảnh báo SEN trước khi ban hành Offer.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Xử lý Lead Mới (Speed-to-Call)** | Thời gian từ khi Lead vào ERP đến cuộc gọi đầu tiên | **\<= 15 phút** | Admission Officer |
| **Tỷ lệ Chuyển đổi Lead \-\> School Tour** | (Số Lead hoàn tất Tour / Tổng số Lead nhận) \* 100 | Target: TBD | Admission Manager |
| **Tỷ lệ Chuyển đổi School Tour \-\> Offer** | (Số Offer phát hành / Số Lead hoàn tất Tour) \* 100 | Target: TBD | Admission Manager |
| **Chi phí trên Một Học sinh Nhập học (CAC)** | Tổng chi phí Marketing & Sales / Số học sinh Enrolled | Target: TBD | Marketing & Admission Mgr |

## **25\. Dashboard / Report**

* **Lead Funnel Real-time Dashboard (Tuyển sinh):** Biểu đồ phễu chuyển đổi real-time (Lead \-\> Contacted \-\> Tour \-\> Assessment \-\> Offer \-\> Enrolled), Báo cáo SLA tốc độ gọi Lead của từng tư vấn viên.  
*   
* **Marketing Performance & ROI Report (Marketing):** Báo cáo số lượng Lead, Tỷ lệ chuyển đổi và Chi phí CAC chi tiết theo từng kênh (Facebook, Google, Zalo, Referral, Event).  
*   
* **Executive Admission & Occupancy Projection (Board/CEO):** Báo cáo dự báo sĩ số lấp đầy (Occupancy Rate) các cơ sở trong 3-6 tháng tới dựa trên tốc độ chuyển đổi phễu tuyển sinh hiện tại.  
* 

## **26\. Integration**

* **Omnichannel Marketing APIs (Facebook Lead Ads, Google Ads, Zalo OA, Website Webhook):** Tự động đẩy Lead về ERP tức thì.  
*   
* **Tổng đài CTI Cloud Call Center (CRM Call Integration):** Bấm gọi trực tiếp trên Web/App, hiển thị Pop-up thông tin khách khi có cuộc gọi đến (Inbound Popup), tự động lưu file ghi âm.  
*   
* **Student Enrollment Engine (SOP-ADM-003):** Tự động chuyển giao toàn bộ dữ liệu Lead/Applicant sang phân hệ Hợp đồng & Thu phí.  
*   
* **Zalo Notification Service (ZNS) & SMS Brandname:** Tự động gửi tin nhắn xác nhận lịch hẹn, mã QR Check-in và Thư mời nhập học.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Mất cắp/Mộc dữ liệu SĐT Phụ huynh sang đối thủ** | Critical | Low | Mã hóa ẩn SĐT (Phone Masking); Bắt buộc gọi qua CTI; Chặn quyền Export Excel. | IT System & Admission Mgr |
| **Chậm trễ gọi Lead khiến Phụ huynh chọn trường khác** | High | Medium | Auto-Recycle Engine tự động thu hồi Lead quá 15 phút; Báo động đỏ cho Manager. | Admission Manager |
| **Đánh giá sai lệch năng lực trẻ gây bức xúc cho Phụ huynh** | High | Low | Chuẩn hóa Bảng tiêu chí Assessment trên Tablet; Duyệt 2 cấp đối với trẻ SEN. | Academic Manager & Assessor |
| **Sai lệch chi phí chiết khấu/ưu đãi tuyển sinh** | Medium | Medium | Khóa cứng chính sách phí trên ERP; Áp dụng Approval Matrix 3 cấp cho Discount ngoại lệ. | CFO & Admission Mgr |

## **28\. Acceptance Criteria**

* **Given:** Một Phụ huynh điền Form đăng ký tư vấn trên Facebook Ads.  
*   
* **When:** Hệ thống ERP nhận dữ liệu qua Webhook API.  
*   
* **Then:** ERP tự động quét trùng SĐT trong 3 giây. Nếu là SĐT mới, ERP tính điểm Lead, phân bổ cho Tư vấn viên A theo quy tắc Round-Robin, kích hoạt đồng hồ đếm ngược SLA 15 phút và phát Push Notification tới điện thoại của Tư vấn viên A.  
*   
* **Given:** Tư vấn viên A không thực hiện cuộc gọi qua tổng đài CTI cho Lead trong vòng 15 phút làm việc.  
*   
* **When:** Đồng hồ SLA chạm mốc 15 phút 00 giây.  
*   
* **Then:** ERP tự động chuyển trạng thái Lead sang Recycled, thu hồi quyền truy cập của Tư vấn viên A, phân bổ Lead cho Tư vấn viên B và gửi cảnh báo vi phạm SLA tới Dashboard của Admission Manager.  
* 

## **29\. Test Scenarios**

1. **Happy Path Test:** Lead vào từ Webhook \-\> Quét trùng Pass \-\> Phân bổ TVV A \-\> Gọi CTI trong 5 phút \-\> Đặt lịch Tour \-\> Phụ huynh Check-in QR \-\> Assessment Pass \-\> Auto Handoff sang SOP-ADM-003.  
2.   
3. **Deduplication Test:** Cố tình nhập 1 Lead mới có SĐT đã tồn tại trên ERP \-\> Kiểm tra xem ERP có chặn tạo Lead mới và gộp lịch sử vào Lead cũ không.  
4.   
5. **15-Minute SLA Auto-Recycle Test:** Phân bổ Lead mới nhưng cố tình KHÔNG bấm gọi CTI trong 15 phút \-\> Kiểm tra xem ERP có tự động thu hồi và chuyển cho TVV khác không.  
6.   
7. **Phone Masking & Permission Test:** Đăng nhập tài khoản Admission Officer cố tình xem số điện thoại Phụ huynh \-\> Kiểm tra xem SĐT có bị ẩn dạng 090\*\*\*\*123 và không có nút Copy không.  
8.   
9. **SEN Assessment Review Test:** Assessor đánh giá trẻ có dấu hiệu SEN (SEN Flag \= YES) \-\> Kiểm tra xem ERP có khóa nút phát hành Offer và yêu cầu Workflow duyệt của Academic Manager/Hiệu trưởng không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận quy tắc phân bổ Lead (Round-Robin/Campus); Cấu hình khung thời gian SLA (15 phút); Cấu hình kịch bản tin nhắn Zalo OA/SMS xác nhận lịch hẹn; Cấu hình bảng tiêu chí Assessment.  
*   
* **Master Data Migration:** Import danh sách Lead cũ từ file Excel/CRM cũ, chạy công cụ Deduplication làm sạch dữ liệu trước khi đưa vào ERP chính thức.  
*   
* **Integration & Testing:** Tích hợp API CTI Cloud Call Center với các nhà mạng (Viettel, VNPT, Mobifone); Test kết nối Webhook tải cao từ Facebook Lead Ads dưới kịch bản 500 Lead/giờ.  
*   
* **Training & Change Management:** Đào tạo Phòng Tuyển sinh quy trình gọi điện qua CTI và quản lý phễu trên ERP; Đào tạo Lễ tân quy trình quét QR Check-in School Tour; Đào tạo Giáo viên thao tác Assessment trên Tablet.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (8 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), Tổ chức School Tour & Khảo sát Hòa nhập (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  8.   
  9. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  10.   
  11. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  12.   
  13. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  14.   
  15. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  16.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **17 SOPs**.

### **2\. Sơ đồ Chuỗi Giá trị End-to-End đã Phủ sóng (Value Chain Coverage)**

\[SOP-CRM-001: Lead & Tour\] ──► \[SOP-ADM-003: Enrollment & Contract\] ──► \[SOP-FIN-001: Billing & Tuition\]  
                                                                                │  
┌───────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────┐  
│                                                      DAILY OPERATIONS & SAFEGUARDING                                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬────────────────────────────────────────────┤  
│ SOP-SIS-001: Pickup & Checkin  │ SOP-BUS-001: School Bus Safety │ SOP-KIT-001: Kitchen & Nutrition│ SOP-MED-001: Health & Medication           │  
│ • Attendance & Dynamic QR      │ • End-of-Trip Rear Seat Check  │ • Recipe BOM & 24h Retention   │ • 3-Point Medication Check                 │  
│ • Safeguarding Alert 09:15 AM  │ • 3-Way Attendance Cross-Check │ • Real-time Attendance Scaling │ • Incident Governance                      │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴────────────────────────────────────────────┘  
                                                                                │  
                                                      \[SOP-HR-001: Staff, Teaching & Payroll\]

# Thẻ 11

# **SOP-SIS-002 — QUY TRÌNH QUẢN LÝ SỔ LIÊN LẠC ĐIỆN TỬ HÀNG NGÀY (STUDENT DAILY ACTIVITIES), NHẬT KÝ CHĂM SÓC VÀ BÁO CÁO ĐÁNH GIÁ TÌNH HÌNH PHÁT TRIỂN CỦA TRẺ THEO ĐỘ TUỔI**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-SIS-002  
*   
* **Tên SOP:** Quy trình Quản lý Sổ liên lạc Điện tử Hàng ngày (Student Daily Activities), Nhật ký Chăm sóc và Báo cáo Đánh giá Tình hình Phát triển của Trẻ theo Độ tuổi  
*   
* **Module ERP:** Student Daily Activities (21), Student Development Assessment (22), Parent Communication (62), Student Information System \- SIS (04), Curriculum Management (14)  
*   
* **Process Owner:** Academic Manager / Hiệu trưởng Cơ sở  
*   
* **Department:** Ban Giáo vụ, Khối Giáo viên Mầm non, Bộ phận Chăm sóc Khách hàng  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Chuyên môn (Academic Director) / Board  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ công tác truyền thông học đường hai chiều giữa Nhà trường và Phụ huynh: từ việc ghi nhận nhật ký sinh hoạt hàng ngày của trẻ mầm non (Ăn, Ngủ, Vệ sinh, Tâm trạng, Hoạt động học/chơi kèm hình ảnh), phát hành Nhật ký Chăm sóc (Daily Care Log) trên Mobile App Phụ huynh, đến quy trình đánh giá sự phát triển toàn diện của trẻ định kỳ theo 05 lĩnh vực chuẩn mầm non (Thể chất, Nhận thức, Ngôn ngữ, Tình cảm \- Kỹ năng xã hội, Thẩm mỹ); đảm bảo minh bạch thông tin, nâng cao sự hài lòng của Phụ huynh và bảo vệ quyền riêng tư/hình ảnh trẻ em.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non thuộc hệ thống trường mầm non tư thục / quốc tế / chuỗi nhiều cơ sở.  
*   
* **Phòng ban:** Khối Giáo viên Mầm non (Chủ nhiệm, Trợ giảng, Bộ môn), Ban Giám hiệu, Bộ phận Chăm sóc Khách hàng, Cán bộ Y tế học đường.  
*   
* **Đối tượng:** Toàn bộ học sinh mầm non đang theo học (Active/Enrolled), Phụ huynh / Người giám hộ.  
*   
* **Trường hợp không áp dụng:** Học sinh đang trong thời gian bảo lưu/nghỉ học tạm thời trên 30 ngày (áp dụng SOP-SIS-005: Quản lý Bảo lưu & Tái nhập học).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Student Daily Log (Sổ liên lạc điện tử hàng ngày):** Bảng ghi nhận thông số sinh hoạt trong ngày của trẻ (Lượng ăn bữa sáng/trưa/xế, Thời gian giấc ngủ trưa, Số lần đi vệ sinh, Biểu hiện tâm trạng và Khoảnh khắc hoạt động nổi bật).  
*   
* **Child Development Portfolio (Hồ sơ Phát triển của Trẻ):** Tập hợp các đánh giá định kỳ, sản phẩm học tập (tranh vẽ, video bài nói, sản phẩm thủ công) và nhận xét của giáo viên về tiến bộ của trẻ theo từng giai đoạn tuổi.  
*   
* **5 Domains of Child Development (05 Lĩnh vực Phát triển Mầm non):** Khung tiêu chí đánh giá phát triển chuẩn do Bộ GD&ĐT ban hành bao gồm: (1) Phát triển Thể chất, (2) Phát triển Nhận thức, (3) Phát triển Ngôn ngữ, (4) Phát triển Tình cảm & Kỹ năng xã hội, (5) Phát triển Thẩm mỹ.  
*   
* **Bulk Log Entry:** Feature trên App Giáo viên cho phép tích chọn ghi nhận nhanh trạng thái sinh hoạt cho cả nhóm/lớp (Ví dụ: 15 trẻ cùng ăn hết suất) giúp tiết kiệm 80% thời gian thao tác.  
*   
* **Photo Privacy Consent (Cam kết Sử dụng Hình ảnh):** Thiết lập quyền riêng tư trên ERP cho phép hoặc giới hạn việc đăng tải ảnh/video của trẻ trên App Phụ huynh hoặc Truyền thông công cộng.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Cấu hình Khung Đánh giá & Mẫu Sổ liên lạc | Academic BA | Academic Director | BGH / Chuyên gia | GVCN / Admin |
| Ghi nhận Nhật ký Sinh hoạt Hàng ngày (Daily Activities) | Giáo viên chủ nhiệm & Trợ giảng | Hiệu trưởng Cơ sở | Cán bộ Y tế | Phụ huynh |
| Phê duyệt & Xuất bản Nhật ký Hàng ngày | Hiệu trưởng Cơ sở / Khối trưởng | Hiệu trưởng Cơ sở | GVCN | Phụ huynh |
| Đánh giá Phát triển Định kỳ (Tháng/Kỳ) | GVCN & Giáo viên Bộ môn | Academic Manager | Chuyên gia Tâm lý | Phụ huynh / BGH |
| Duyệt Báo cáo Đánh giá Thể chất & Tâm lý | Academic Manager | Academic Director | Hiệu trưởng | Phụ huynh |

*Ghi chú: Việc áp dụng Khung Tiêu chí Đánh giá Sự Phát triển của Trẻ mầm non và Quy định Bảo vệ Quyền Quyền riêng tư/Hình ảnh Trẻ em cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo (Thông tư 28/2016/TT-BGDĐT, Thông tư 51/2020/TT-BGDĐT) và Luật Trẻ em trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Tiêu chí Đánh giá theo Độ tuổi (AssessmentCriteriaMaster), Danh mục Món ăn trong ngày (SOP-KIT-001), Danh sách Học sinh có mặt thực tế (SOP-SIS-001), Thiết lập Quyền Quyền riêng tư Hình ảnh (PhotoConsentMaster).  
*   
* **Dữ liệu Điểm danh:** Học sinh ở trạng thái Class Checked-in trên Phân hệ SIS.  
*   
* **Thiết bị:** Tablet/Mobile chuyên dụng dành cho Giáo viên tại lớp học đã cài đặt App Teacher và kết nối Wifi bảo mật.  
* 

## **7\. Trigger**

* **Chu kỳ Hàng ngày (Real-time / Cuối buổi):** Cập nhật các mốc Ăn (11:30 & 14:30), Ngủ (12:00 \- 14:00), Hoạt động học (15:00) và Phát hành Sổ liên lạc trước **16:30 PM**.  
*   
* **Chu kỳ Định kỳ (Tháng / Học kỳ):** Ngày 25 hàng tháng (Đánh giá tháng) và Ngày cuối cùng của Học kỳ (Báo cáo Tổng kết Phát triển).  
* 

## **8\. Quy trình AS-IS**

* Giáo viên ghi chép tay thông tin ăn, ngủ, đi vệ sinh của từng trẻ vào sổ giấy liên lạc đặt ở bàn học.  
*   
* Chụp ảnh hoạt động của trẻ bằng điện thoại cá nhân, gửi hàng loạt 50–100 ảnh không phân loại vào nhóm Zalo chung của Lớp.  
*   
* Cuối học kỳ, giáo viên ngồi viết tay nhận xét phát triển của từng học sinh vào sổ theo dõi trẻ bằng giấy, gửi Hiệu trưởng ký duyệt bằng tay.  
*   
* **Hệ quả:** Mất 1.5 \- 2 giờ làm việc/ngày của giáo viên cho việc viết sổ sách giấy; trôi mất tin nhắn quan trọng trong nhóm Zalo chung; rò rỉ hình ảnh riêng tư của trẻ ra ngoài; phụ huynh khó theo dõi tiến trình phát triển dài hạn của con.  
* 

## **9\. Pain Points / Risk**

* **Teacher Burnout & Productivity Loss:** Giáo viên tốn quá nhiều thời gian ghi chép thủ công thay vì tập trung chăm sóc và tương tác trực tiếp với trẻ.  
*   
* **Child Privacy & Safeguarding Violation:** Đăng tải ảnh trẻ em lên nhóm Zalo công khai hoặc mạng xã hội vi phạm nghiêm trọng Luật Trẻ em và quy định Bảo vệ Dữ liệu Cá nhân.  
*   
* **Communication Noise:** Thông tin cá nhân của trẻ (như lượng ăn, giấc ngủ, đi vệ sinh) bị công khai với toàn bộ phụ huynh khác trong lớp gây tâm lý so sánh tiêu cực.  
*   
* **Subjective & Inconsistent Assessment:** Đánh giá phát triển mang tính cảm quan cá nhân của giáo viên, thiếu số liệu minh chứng và không bám sát Khung Tiêu chí Chuẩn của Bộ GD&ĐT.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Ghi nhận Nhật ký Sinh hoạt Hàng ngày (Daily Activity Logging)**

* **Step 01:**  
* 

  * **Actor:** Giáo viên chủ nhiệm & Trợ giảng.  
  *   
  * **Action:** Sau mỗi mốc sinh hoạt (Bữa ăn trưa, Giấc ngủ, Bữa xế), Giáo viên mở App Teacher, chọn màn hình Daily Log. Dùng tính năng Bulk Log Entry chọn nhanh trạng thái cho nhóm trẻ (Ví dụ: "Ăn hết suất", "Ngủ ngon giấc 120 phút"). Đối với trẻ có biểu hiện bất thường (Ăn ít, Quấy khóc, Sốt nhẹ), Giáo viên tích chọn ghi chú riêng cho từng trẻ.  
  *   
  * **ERP Function:** Quick Activity Batch Logger.  
  *   
  * **Input:** Trạng thái Bữa ăn (Hết/Nửa/Ít), Thời gian Ngủ (Phút), Vệ sinh (Lần/Trạng thái), Tâm trạng (Vui/Bình thường/Quấy).  
  *   
  * **Output:** Nhật ký sinh hoạt dạng Dự thảo (Draft Daily Log).  
  *   
  * **Business Rule:** BR-SIS-020: Lượng ăn bữa trưa phải được nhập xong trước 12:30 PM; Thông số giấc ngủ nhập xong trước 14:30 PM.  
  *   
  * **Status Before:** Pending Log.  
  *   
  * **Status After:** Draft Activity Recorded.  
  *   
  * **SLA:** \<= 3 phút/hoạt động cho toàn lớp.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** Giáo viên chủ nhiệm.  
  *   
  * **Action:** Trong giờ hoạt động góc/ngoại khóa, Giáo viên dùng App Teacher chụp từ 1–3 hình ảnh khoảnh khắc học tập/vui chơi của trẻ. ERP tự động gắn Tag Học sinh (Auto-Tagging Face Recognition hoặc chọn tay) và kiểm tra cờ Quyền riêng tư (Photo Consent Flag).  
  *   
  * **ERP Function:** Media Capture & Photo Consent Checker.  
  *   
  * **Input:** Hình ảnh/Video ngắn \+ Mã Học sinh.  
  *   
  * **Output:** Bộ sưu tập khoảnh khắc ngày (Daily Photo Album).  
  *   
  * **Business Rule:** BR-SIS-021: Nếu học sinh bị Phụ huynh bật cờ Opt-Out Media Consent (Chống đăng ảnh), ERP tự động làm mờ mặt (Blur) hoặc chặn không cho lưu ảnh học sinh đó vào Album gửi Phụ huynh.  
  *   
  * **Status Before:** Draft Activity Recorded.  
  *   
  * **Status After:** Photos Tagged & Filtered.  
  *   
  * **SLA:** \<= 5 phút / album lớp.  
  *   
  * **Notification:** Pop-up cảnh báo nếu vi phạm Consent.  
  * 

### **Giai đoạn 2: Trình duyệt & Xuất bản Sổ liên lạc Điện tử (Review & Publishing)**

* **Step 03:**  
* 

  * **Actor:** Giáo viên chủ nhiệm.  
  *   
  * **Action:** Đúng 16:00 PM, Giáo viên kiểm tra lại toàn bộ thông tin Nhật ký sinh hoạt \+ Album ảnh trong ngày, viết nhận xét chung ngắn gọn và bấm "Gửi Xuất bản" (Submit Daily Log).  
  *   
  * **ERP Function:** Daily Log Consolidation & Submission.  
  *   
  * **Input:** Draft Daily Log \+ Album ảnh \+ Lời nhắn của Cô.  
  *   
  * **Output:** Nhật ký chờ phát hành (Pending Release Log).  
  *   
  * **Business Rule:** BR-SIS-022: Nhận xét của Giáo viên không được chứa các từ ngữ nhạy cảm, tiêu cực hoặc vi phạm Quy tắc Ứng xử Học đường (ERP tự động quét từ khóa cấm Profanity Filter).  
  *   
  * **Status Before:** Draft Activity Recorded.  
  *   
  * **Status After:** Submitted for Review.  
  *   
  * **SLA:** 16:00 PM hàng ngày.  
  *   
  * **Notification:** Alert gửi Khối trưởng / Hiệu trưởng Cơ sở.  
  *   
* **Step 04:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở / Khối trưởng Giáo vụ & ERP System.  
  *   
  * **Action:** Khối trưởng duyệt nhanh danh sách Sổ liên lạc của các lớp. Đúng **16:30 PM**, ERP tự động kích hoạt tiến trình Auto-Publish Job, phát hành Sổ liên lạc riêng biệt tới Mobile App của chính Phụ huynh học sinh đó (Private 1-on-1 Feed).  
  *   
  * **ERP Function:** Automated Private Parent Dispatcher.  
  *   
  * **Input:** Pending Release Log.  
  *   
  * **Output:** Sổ liên lạc ngày được phát hành (Published Daily Log).  
  *   
  * **Business Rule:** Thông tin Sổ liên lạc là **HOÀN TOÀN RIÊNG TƯ (1-on-1)**. Phụ huynh bé A tuyệt đối không xem được nhật ký ăn ngủ hay hình ảnh riêng của bé B.  
  *   
  * **Status Before:** Submitted for Review.  
  *   
  * **Status After:** Published to Parent App.  
  *   
  * **SLA:** Real-time tại mốc 16:30 PM.  
  *   
  * **Notification:** Mobile App Push Notification cho Phụ huynh: *"Sổ liên lạc ngày \[Ngày\] của bé \[Tên\] đã sẵn sàng. Bấm để xem chi tiết\!"*.  
  * 

### **Giai đoạn 3: Đánh giá Sự Phát triển của Trẻ Định kỳ theo Độ tuổi (Child Development Portfolio)**

* **Step 05:**  
* 

  * **Actor:** Giáo viên chủ nhiệm & Giáo viên Bộ môn (Tiếng Anh, Năng khiếu).  
  *   
  * **Action:** Đến kỳ đánh giá (Cuối tháng/Cuối kỳ), Giáo viên mở Phân hệ Child Development Assessment, chọn Khung Tiêu chí theo nhóm tuổi (Nhà trẻ: 3-12m, 12-24m, 24-36m; Mẫu giáo: 3-4y, 4-5y, 5-6y). Tích chọn mức độ đạt (Đạt / Chưa Đạt / Cần Cố Gắng) cho từng chỉ số thuộc 05 Lĩnh vực Phát triển, tải lên 02 sản phẩm minh chứng (Ảnh tranh vẽ, video nói) và nhập nhận xét chuyên môn.  
  *   
  * **ERP Function:** Development Matrix & Portfolio Builder.  
  *   
  * **Input:** Bảng chỉ số tiêu chí Bộ GD&ĐT, Quan sát thực tế, Minh chứng sản phẩm.  
  *   
  * **Output:** Báo cáo Đánh giá Phát triển Dự thảo (Draft Development Report).  
  *   
  * **Business Rule:** BR-SIS-023: Đánh giá phải dựa trên bằng chứng minh chứng lưu trữ trong Hồ sơ Sản phẩm (Portfolio). Nếu chọn mức "Chưa Đạt", Giáo viên bắt buộc phải đính kèm kế hoạch hỗ trợ cá nhân hóa cho trẻ.  
  *   
  * **Status Before:** Pending Assessment.  
  *   
  * **Status After:** Draft Report Created.  
  *   
  * **SLA:** Hoàn thành trong 05 ngày làm việc của đợt đánh giá.  
  *   
  * **Notification:** Alert gửi Academic Manager thẩm định.  
  *   
* **Step 06:**  
* 

  * **Actor:** Academic Manager / Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Academic Manager review chất lượng Báo cáo Đánh giá, đảm bảo tính chuẩn xác chuyên môn và bấm "Phê duyệt & Xuất bản". ERP tự động tổng hợp thành Báo cáo Phát triển Điện tử (PDF đính kèm Biểu đồ Nhện 5 Lĩnh vực) gửi tới App Phụ huynh.  
  *   
  * **ERP Function:** Development Report Approval & Radar Chart Generator.  
  *   
  * **Input:** Draft Development Report.  
  *   
  * **Output:** Báo cáo Phát triển Chính thức (Published Development Portfolio).  
  *   
  * **Business Rule:** Báo cáo sau khi xuất bản được lưu vĩnh viễn vào Student Academic History trên ERP làm cơ sở chuyển cấp/chuyển lớp.  
  *   
  * **Status Before:** Draft Report Created.  
  *   
  * **Status After:** Portfolio Published.  
  *   
  * **SLA:** Max 48 giờ sau khi GVCN submit.  
  *   
  * **Notification:** Mobile App Push \+ Email gửi Phụ huynh Báo cáo Phát triển Học kỳ của con.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Diễn Biến Hàng Ngày Tại Lớp Học\]  
       │  
       ▼  
\[Giáo Viên Tích Chọn Nhanh (Bulk Log): Lượng Ăn, Giấc Ngủ, Vệ Sinh, Tâm Trạng\]  
       │  
       ▼  
\[Chụp Ảnh Khoảnh Khắc ──► ERP Auto-Check Photo Consent Flag (Lọc Ảnh Chống Lộ)\]  
       │  
       ▼  
\[16:00 PM: GVCN Kiểm Tra & Nhập Lời Nhắn ──► ERP Run Profanity Filter ──► Submit\]  
       │  
       ▼  
\[16:30 PM: ERP Auto-Publish Job ──► Gửi Sổ Liên Lạc 1-on-1 Tới Mobile App Phụ Huynh\]  
       │  
       ▼  
\[ĐỊNH KỲ THÁNG / HỌC KỲ: BÁO CÁO ĐÁNH GIÁ PHÁT TRIỂN (PORTFOLIO)\]  
       │  
       ▼  
\[GVCN & GV Bộ Môn: Chấm Điểm 05 Lĩnh Vực Phát Triển (Thể Chất, Ngôn Ngữ, Nhận Thức...)\]  
       │  
       ◇ Có chỉ số "Chưa Đạt"?  
       ├─ YES ──► \[Bắt Buộc Nhập Kế Hoạch Hỗ Trợ Cá Nhân Hóa (Individual Support Plan)\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Academic Manager: Duyệt Chuyên Môn ──► ERP Auto-Generate Biểu Đồ Radar 5 Lĩnh Vực\]  
                │  
                ▼  
\[Xuất Bản Báo Cáo Phát Triển Điện Tử Lên Mobile App Phụ Huynh & Lưu Hồ Sơ Vĩnh Viễn\]  
                │  
                ▼  
           \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-SIS-020 (Log Completeness):** Sổ liên lạc hàng ngày bắt buộc phải chứa đầy đủ 04 nhóm thông tin chính: Bữa ăn (Sáng/Trưa/Xế), Giấc ngủ trưa, Vệ sinh và Khoảnh khắc hoạt động. ERP chặn không cho Submit nếu thiếu thông tin bữa ăn hoặc giấc ngủ mà không có lý do nghỉ học.  
*   
* **BR-SIS-021 (Safeguarding & Photo Consent):** Tuyệt đối tuân thủ Cờ Quyền riêng tư Hình ảnh (Photo Consent Flag). Nếu Phụ huynh chọn "Không đồng ý chia sẻ hình ảnh", ERP sẽ tự động ẩn/chặn tải lên toàn bộ ảnh có mặt học sinh đó. Ảnh chụp trẻ không được chứa hình ảnh thiếu trang phục hoặc tư thế nhạy cảm.  
*   
* **BR-SIS-022 (Content Moderation):** Hệ thống tích hợp Bộ lọc Từ ngữ (Profanity Filter Engine). Mọi nhận xét của Giáo viên có chứa từ ngữ tiêu cực, xúc phạm hoặc sai quy chuẩn sư phạm sẽ bị ERP giữ lại và báo cờ đỏ cho Hiệu trưởng duyệt tay.  
*   
* **BR-SIS-023 (Evidence-Based Assessment):** Đánh giá sự phát triển của trẻ phải bám sát Khung Chuẩn Giáo dục Mầm non của Bộ GD&ĐT. Các chỉ số chọn "Chưa Đạt" bắt buộc phải đính kèm bằng chứng quan sát và Kế hoạch hỗ trợ cá nhân hóa (Individual Support Plan \- ISP).  
*   
* **BR-SIS-024 (Privacy & Isolation):** Thông tin Sổ liên lạc hàng ngày và Báo cáo phát triển là dữ liệu Bảo mật (Confidential Data). Phụ huynh chỉ được quyền truy cập đúng dữ liệu của con mình, không xem được dữ liệu của bất kỳ học sinh nào khác.  
* 

## **13\. Exception Cases**

* **Trẻ có biểu hiện sức khỏe bất thường trong ngày (Sốt, Nôn trớ, Trầy xước):** Giáo viên KHÔNG đợi đến 16:30 PM mới gửi Sổ liên lạc. Bắt buộc kích hoạt ngay quy trình Emergency Incident Alert trên ERP để gửi thông báo tức thì cho Phụ huynh và Cán bộ Y tế theo SOP-MED-001.  
*   
* **Phụ huynh phản hồi/khiếu nại về nội dung Sổ liên lạc trên App:** Phụ huynh bấm nút "Gửi Phản hồi" trên App. ERP khởi tạo một Task Chăm sóc Khách hàng (Service Request) tự động gán cho Giáo viên chủ nhiệm và Hiệu trưởng. SLA xử lý phản hồi là \<= 2 giờ làm việc.  
*   
* **Giáo viên đột xuất nghỉ làm không kịp nhập Sổ liên lạc:** Hiệu trưởng Cơ sở điều động Giáo viên dạy thay (Substitute Teacher theo SOP-HR-001). ERP tự động cấp quyền truy cập tạm thời màn hình Daily Log của lớp đó cho Giáo viên dạy thay.  
* 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Xuất bản Sổ liên lạc Hàng ngày Chuẩn (Daily Log) | GVCN (Submit) | ERP Auto-Publish (16:30) | N/A |
| Xuất bản Sổ liên lạc bị Báo cờ Cảnh báo Từ ngữ | GVCN | Hiệu trưởng Cơ sở | N/A |
| Duyệt Báo cáo Đánh giá Phát triển Tháng / Học kỳ | GVCN (Chấm điểm) | Academic Manager | Hiệu trưởng Cơ sở |
| Thay đổi Khung Tiêu chí Đánh giá Phát triển Mầm non | Academic Manager | Academic Director | Chủ tịch Hội đồng Chuyên môn |

## **15\. Status Lifecycle**

* **Daily Activity Status:** Pending Log \-\> Draft Recorded \-\> Submitted for Review \-\> Published to Parent \-\> Acknowledged (Parent Read).  
*   
* **Development Portfolio Status:** Pending Assessment \-\> Draft Assessment \-\> Under Academic Review \-\> Approved \-\> Published \-\> Archived.  
* 

## **16\. Data Model**

* **Primary Entity:** StudentDailyLog  
* 

  * DailyLogID (PK, String, Unique)  
  *   
  * StudentID (FK, String), ClassID (FK, String), LogDate (Date)  
  *   
  * MealBreakfastStatus (Enum), MealLunchStatus (Enum), MealSnackStatus (Enum)  
  *   
  * NapDurationMinutes (Integer), ToiletCount (Integer), MoodStatus (Enum)  
  *   
  * TeacherNote (Text), PhotoURLs (JSON List)  
  *   
  * LogStatus (Enum: Draft, Submitted, Published), PublishedAt (DateTime)  
  *   
* **Related Entities:**  
* 

  * StudentDevelopmentAssessment: AssessmentID (PK), StudentID (FK), TermID (FK), AgeGroup (Enum), PhysicalScore (Enum), CognitiveScore (Enum), LanguageScore (Enum), SocialEmotionalScore (Enum), AestheticScore (Enum), EvidenceURLs (JSON List), IndividualSupportPlan (Text), Status (Enum).  
  *   
  * PhotoConsentSetting: ConsentID (PK), StudentID (FK), AllowAppSharing (Boolean), AllowPublicMedia (Boolean), UpdatedAt (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-SIS-020: Bảng Nhật ký Sinh hoạt Hàng ngày Mầm non (Digital Daily Care Sheet).  
*   
* FRM-SIS-021: Báo cáo Đánh giá Sự Phát triển của Trẻ mầm non (Theo 05 Lĩnh vực Bộ GD&ĐT).  
*   
* FRM-SIS-022: Cam kết Cho phép Sử dụng Hình ảnh Trẻ em (Media & Photo Consent Form).  
*   
* FRM-SIS-023: Kế hoạch Hỗ trợ Phát triển Cá nhân hóa (Individual Support Plan \- ISP).  
* 

## **18\. ERP Functional Requirements**

* **FR-SIS-020 (MUST):** App Teacher phải cung cấp giao diện Bulk Log Entry cho phép Giáo viên tích chọn trạng thái sinh hoạt (ăn, ngủ, vệ sinh) cho nhiều học sinh cùng lúc trong 1 thao tác.  
*   
* **FR-SIS-021 (MUST):** Tích hợp Thuật toán Photo Consent Filter: Tự động kiểm tra cờ Quyền riêng tư của học sinh trước khi cho phép lưu/đăng ảnh vào Album Sổ liên lạc.  
*   
* **FR-SIS-022 (MUST):** Cung cấp Phân hệ Child Development Portfolio Builder tích hợp Khung Tiêu chí Chuẩn Bộ GD&ĐT, tự động vẽ Biểu đồ Radar (Biểu đồ Nhện) 5 Lĩnh vực phát triển khi xuất bản báo cáo.  
*   
* **FR-SIS-023 (MUST):** Tích hợp Bộ lọc Từ ngữ (Profanity Filter) tự động cảnh báo và giữ lại các nhận xét có chứa từ ngữ chưa chuẩn sư phạm.  
*   
* **FR-SIS-024 (SHOULD):** Tính năng "Read Receipts" cho phép Giáo viên và Nhà trường biết Phụ huynh đã mở xem Sổ liên lạc ngày hay chưa.  
* 

## **19\. Automation Opportunities**

* **AUTO-SIS-020 (RULE ENGINE):** Tự động tổng hợp dữ liệu thực đơn từ SOP-KIT-001 hiển thị lên màn hình đánh giá bữa ăn của App Teacher.  
*   
* **AUTO-SIS-021 (INTEGRATION):** Tự động phát hành Sổ liên lạc hàng ngày tới Mobile App Phụ huynh theo lịch cài đặt cố định (16:30 PM hàng ngày).  
*   
* **AUTO-SIS-022 (GRAPHICS ENGINE):** Tự động chuyển đổi các chỉ số chấm điểm phát triển thành Biểu đồ Radar trực quan và xuất file Báo cáo PDF đính kèm sản phẩm học tập của trẻ.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Giáo viên Nhập Sổ liên lạc ngày | Giáo viên chủ nhiệm | Mobile App Push | 15:30 PM hàng ngày |
| Cảnh báo Nhận xét Chứa Từ ngữ Chưa Chuẩn | Hiệu trưởng Cơ sở | ERP High Alert | Immediate khi GV submit |
| Thông báo Sổ liên lạc Hàng ngày Mới | Phụ huynh | Mobile App Push | 16:30 PM hàng ngày |
| Thông báo Báo cáo Đánh giá Phát triển Học kỳ | Phụ huynh | App Push \+ Email | Immediate khi publish |
| Cảnh báo Phụ huynh Phản hồi / Khiếu nại | GVCN & Hiệu trưởng | ERP Pop-up \+ App Push | Immediate khi Phụ huynh gửi |

## **21\. Permission Matrix (RBAC)**

| Role | View Daily Log | Create/Edit Log | Approve Daily Log | Edit Assessment Criteria | View Portfolio | Access Photo Consent |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Giáo viên Chủ nhiệm | Assigned Class | Full | Submit Only | Read Only | Full (Class) | Read Only |
| Khối trưởng / Hiệu trưởng | Campus Full | Full | Full | Read Only | Full Campus | Full |
| Academic Director | Full Enterprise | Read Only | Read Only | Full Enterprise | Full Enterprise | Full |
| Cán bộ Y tế | Campus Health | Health Notes | No | No | Read Only | Read Only |
| Phụ huynh | Own Child | Feedback Only | No | No | Own Child | Manage Own |

## **22\. Audit Trail**

Hệ thống bắt buộc ghi lại nhật ký Audit Log vĩnh viễn không thể xóa sửa đối với:

* Mọi thao tác Tạo, Chỉnh sửa nội dung Sổ liên lạc hàng ngày (Người sửa, Thời gian sửa, Nội dung trước và sau khi sửa).  
*   
* Nhật ký xuất bản Sổ liên lạc: Timestamp tự động của Server, Danh sách tài khoản Phụ huynh nhận được.  
*   
* Lịch sử thay đổi cờ Quyền riêng tư Hình ảnh (Photo Consent Flag) do Phụ huynh cập nhật.  
*   
* Lịch sử đánh giá sự phát triển của trẻ và phê duyệt báo cáo của Academic Manager.  
* 

## **23\. Internal Controls**

* **1-on-1 Data Isolation Control:** Phân quyền dữ liệu nghiêm ngặt bảo đảm Phụ huynh chỉ xem được đúng thông tin và hình ảnh của con mình, triệt tiêu rủi ro lộ rò rỉ dữ liệu cá nhân.  
*   
* **Automated Content Moderation:** Bắt buộc chạy qua Bộ lọc Từ ngữ tự động trước khi cho phép gửi nội dung nhận xét tới Phụ huynh.  
*   
* **Mandatory Evidence for Assessment:** Không cho phép chọn chỉ số "Chưa Đạt" trong Báo cáo phát triển nếu không đính kèm file minh chứng và Kế hoạch hỗ trợ cá nhân hóa (ISP).  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Xuất bản Sổ liên lạc Hàng ngày** | Thời gian phát hành sổ liên lạc hoàn tất mỗi ngày | **Đúng 16:30 PM** | GVCN & Hiệu trưởng |
| **Tỷ lệ Phụ huynh Đọc Sổ liên lạc (Read Rate)** | (Số Phụ huynh mở xem app / Tổng số Phụ huynh) \* 100 | **\>= 90%** | BGH & Chăm sóc KH |
| **Tỷ lệ Tuân thủ Quyền riêng tư Hình ảnh** | Số trường hợp vi phạm đăng ảnh khi chưa có Consent | **0% (Zero Tolerance)** | GVCN & IT System |
| **SLA Trả lời Phản hồi của Phụ huynh trên App** | Thời gian phản hồi khi Phụ huynh gửi comment/khiếu nại | \<= 2 giờ làm việc | GVCN & Hiệu trưởng |

## **25\. Dashboard / Report**

* **Daily Parent Communication Dashboard (BGH & Giáo vụ):** Bảng theo dõi tiến độ hoàn thành Sổ liên lạc của các lớp, Tỷ lệ Phụ huynh đã đọc bài, Danh sách phản hồi/khiếu nại cần xử lý trong ngày.  
*   
* **Student Growth & Assessment Analytics (Academic Manager):** Bảng tổng hợp kết quả phát triển của học sinh toàn trường theo 5 Lĩnh vực, Báo cáo danh sách trẻ cần hỗ trợ cá nhân hóa (ISP).  
*   
* **Parent Engagement Executive Report (Board & CEO):** Báo cáo chỉ số hài lòng Phụ huynh (Parent Satisfaction Score \- CSAT), Tỷ lệ tương tác trên Mobile App theo cơ sở.  
* 

## **26\. Integration**

* **Kitchen & Nutrition Engine (SOP-KIT-001):** Tự động lấy danh mục thực đơn trong ngày hiển thị lên màn hình đánh giá bữa ăn của Giáo viên.  
*   
* **Student Information System (SOP-SIS-001):** Lấy danh sách học sinh có mặt thực tế để khởi tạo danh sách nhập Sổ liên lạc.  
*   
* **Mobile App Phụ huynh (Parent App):** Tích hợp hiển thị Nhật ký sinh hoạt, Album ảnh chất lượng cao, Báo cáo phát triển PDF và tính năng gửi phản hồi 2 chiều.  
*   
* **Profanity Filter API / Text Moderation Service:** Tự động quét từ ngữ chưa chuẩn sư phạm trong lời nhắn của Giáo viên.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Lộ rò rỉ ảnh/thông tin riêng tư của trẻ ra ngoài** | Critical | Low | 1-on-1 Data Isolation; Lọc cờ Photo Consent tự động; Cấm tải ảnh riêng tư. | IT System & GVCN |
| **Giáo viên dùng từ ngữ chưa chuẩn sư phạm gây scandal** | High | Low | Tích hợp Profanity Filter API; Khối trưởng duyệt tay các case bị báo cờ đỏ. | Academic Mgr & BGH |
| **Giáo viên quá tải thời gian do viết sổ sách** | Medium | High | Cung cấp tính năng Bulk Log Entry trên App Teacher giúp nhập liệu trong 3 phút. | Product Owner & BA |
| **Đánh giá phát triển cảm quan, thiếu chính xác** | Medium | Medium | Khung Tiêu chí Chuẩn hóa 5 Lĩnh vực Bộ GD&ĐT; Bắt buộc đính kèm minh chứng. | Academic Director |

## **28\. Acceptance Criteria**

* **Given:** Học sinh A có cờ Quyền riêng tư Hình ảnh Opt-Out Media Consent \= TRUE (Phụ huynh không cho đăng ảnh).  
*   
* **When:** Giáo viên chủ nhiệm chụp ảnh hoạt động lớp và chọn đăng vào Sổ liên lạc.  
*   
* **Then:** ERP tự động quét cờ Consent, hiển thị cảnh báo *"Học sinh A không cho phép đăng ảnh"* và tự động làm mờ mặt Học sinh A hoặc chặn lưu ảnh đó vào Album của Học sinh A.  
*   
* **Given:** Giáo viên nhập lời nhắn cho Phụ huynh có chứa từ ngữ chưa chuẩn sư phạm.  
*   
* **When:** Giáo viên bấm "Submit Daily Log".  
*   
* **Then:** ERP kích hoạt Bộ lọc Từ ngữ (Profanity Filter), giữ lại Sổ liên lạc ở trạng thái Flagged, phát cảnh báo cờ đỏ yêu cầu Hiệu trưởng Cơ sở duyệt tay và nhắc nhở Giáo viên chỉnh sửa.  
* 

## **29\. Test Scenarios**

1. **Happy Path Daily Log Test:** Giáo viên Bulk Log bữa ăn/giấc ngủ \-\> Chụp ảnh khoảnh khắc \-\> Nhập lời nhắn \-\> Submit 16:00 \-\> ERP Auto-Publish 16:30 \-\> Phụ huynh nhận Push Notification và mở xem 1-on-1 thành công.  
2.   
3. **Photo Consent Block Test:** Cố tình chọn đăng ảnh của học sinh có Opt-Out Media Consent \= TRUE \-\> Kiểm tra xem ERP có chặn hoặc auto-blur khuôn mặt trẻ không.  
4.   
5. **Profanity Moderation Test:** Nhập lời nhắn có chứa từ khóa cấm trong danh mục \-\> Kiểm tra xem ERP có chuyển trạng thái Flagged và gửi alert cho Hiệu trưởng không.  
6.   
7. **Radar Chart Assessment Test:** Chấm điểm 5 Lĩnh vực phát triển cho trẻ mẫu giáo 5 tuổi \-\> Kiểm tra xem ERP có tự động vẽ Biểu đồ Nhện (Radar Chart) và xuất file PDF Báo cáo chuẩn xác không.  
8.   
9. **Data Isolation Test:** Đăng nhập tài khoản Phụ huynh bé A cố tình gọi API lấy dữ liệu Sổ liên lạc của bé B \-\> Kiểm tra xem hệ thống có trả về lỗi 403 Forbidden không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình khung giờ tự động xuất bản Sổ liên lạc (16:30 PM); Cấu hình từ khóa cấm cho Bộ lọc Profanity Filter; Cấu hình Bộ Tiêu chí Đánh giá 5 Lĩnh vực phát triển theo từng nhóm độ tuổi mầm non.  
*   
* **Master Data Migration:** Import danh mục tiêu chí đánh giá chuẩn của Bộ GD&ĐT; Import cài đặt Photo Consent ban đầu từ Hồ sơ Nhập học của học sinh (SOP-ADM-003).  
*   
* **Hardware & Integration:** Trang bị Tablet màn hình lớn chịu lực kèm bao da bảo vệ cho 100% các lớp học mầm non; Test tải hệ thống Auto-Publish gửi Push Notification cho 10.000 Phụ huynh cùng lúc vào 16:30 PM.  
*   
* **Training & Change Management:** Đào tạo Giáo viên thao tác Bulk Log trong 3 phút trên Tablet; Hướng dẫn Ban Giám hiệu quy trình kiểm duyệt nội dung bị báo cờ đỏ và phê duyệt Báo cáo Phát triển định kỳ.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (9 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), Tổ chức School Tour & Khảo sát Hòa nhập (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  10.   
  11. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  12.   
  13. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  14.   
  15. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  16.   
  17. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  18.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **16 SOPs**.

# Thẻ 12

# **SOP-PUR-001 — QUY TRÌNH MUA SẮM TẬP TRUNG (PROCURE-TO-PAY \- P2P), QUẢN LÝ YÊU CẦU MUA HÀNG (PR), ĐƠN MUA HÀNG (PO), NHẬP KHO VẬT TƯ VÀ QUẢN LÝ TÀI SẢN / TRANG THIẾT BỊ TRƯỜNG HỌC**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-PUR-001  
*   
* **Tên SOP:** Quy trình Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý Yêu cầu Mua hàng (PR), Đơn Mua hàng (PO), Nhập kho Vật tư và Quản lý Tài sản / Trang thiết bị Trường học  
*   
* **Module ERP:** Procurement (33), Supplier Management (34), Purchase Request (35), Purchase Order (36), Goods Receipt (37), Inventory / Warehouse (32), Asset Management (38), Finance & Accounting Integration (55), Budget Management (57)  
*   
* **Process Owner:** Trưởng phòng Mua sắm & Tối ưu Chi phí (Procurement Manager) / Kế toán trưởng  
*   
* **Department:** Phòng Mua sắm, Bộ phận Kho & Quản lý Tài sản, Ban Giám hiệu Cơ sở, Phòng Kế toán \- Tài chính  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày đầu hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Tài chính (CFO) / Giám đốc Điều hành (CEO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ chu trình Procure-to-Pay (P2P) dành cho khối trường mầm non tư thục/quốc tế và chuỗi nhiều cơ sở: từ khai báo nhu cầu mua sắm vật tư giáo dục, văn phòng phẩm, trang thiết bị lớp học, đồng phục, hóa chất vệ sinh; kiểm soát hạn mức ngân sách (Budget Control); phê duyệt Yêu cầu Mua hàng (PR); chọn lọc và so sánh 3 báo giá từ Nhà cung cấp (3-Quote Comparison); tự động phát hành Đơn mua hàng (PO); kiểm nghiệm nhập kho (Goods Receipt Note \- GRN); dán mã QR quản lý tài sản cố định (Asset Tagging); đến đối soát 3 bên (3-Way Matching: PO \- GRN \- Supplier Invoice) để tự động hạch toán thanh toán kế toán.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, trung tâm giáo dục, văn phòng điều hành chuỗi thuộc hệ thống.  
*   
* **Phòng ban:** Toàn bộ các Phòng/Ban/Lớp học có phát sinh nhu cầu mua sắm và sử dụng tài sản/vật tư.  
*   
* **Đối tượng:** Mua sắm vật tư tiêu hao (Văn phòng phẩm, đồ dùng học tập, hóa chất vệ sinh, đồ dùng bán trú), Tài sản cố định / Công cụ dụng cụ (Bàn ghế, máy chiếu, camera, đồ chơi vận động ngoài trời, thiết bị CNTT).  
*   
* **Trường hợp không áp dụng:** Thực phẩm tươi sống cho Bếp ăn bán trú hàng ngày (áp dụng quy trình riêng SOP-KIT-001: Mua hàng Thực phẩm Tươi sống & An toàn Bếp ăn).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **P2P (Procure-to-Pay):** Quy trình khép kín từ khi phát sinh Yêu cầu mua sắm (PR) đến khi hoàn tất Thanh toán cho Nhà cung cấp (Invoice Payment).  
*   
* **PR (Purchase Request):** Chứng từ Đề nghị Mua hàng do các Bộ phận/Cơ sở khởi tạo trên ERP để xin phê duyệt chủ trương và ngân sách mua sắm.  
*   
* **PO (Purchase Order):** Đơn Mua hàng chính thức có giá trị pháp lý do Phòng Mua sắm phát hành gửi cho Nhà cung cấp sau khi PR được phê duyệt.  
*   
* **GRN (Goods Receipt Note):** Phiếu Nhập kho ghi nhận số lượng, chủng loại và chất lượng vật tư/tài sản thực tế đã giao nhận tại trường.  
*   
* **3-Way Matching (Đối soát 3 bên):** Thao tác kiểm tra tự động của ERP đảm bảo Khớp 100% giữa 03 chứng từ: Đơn Mua Hàng (PO) \= Phiếu Nhập Kho (GRN) \= Hóa đơn Giá trị Gia tăng của NCC (Supplier Invoice).  
*   
* **Asset Tagging (Dán mã Tài sản):** Việc sinh mã QR Code/Barcode định danh duy nhất cho từng tài sản/công cụ dụng cụ ngay khi nhập kho để theo dõi vị trí, người chịu trách nhiệm và lịch sử bảo trì (SOP-FAC-001).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Khởi tạo Yêu cầu Mua hàng (PR) & Kiểm tra Ngân sách | Người yêu cầu (GV / Admin) | Hiệu trưởng Cơ sở | Kế toán Ngân sách | Phòng Mua sắm |
| Phê duyệt Yêu cầu Mua hàng (PR Workflow) | Hiệu trưởng / Trưởng phòng | CFO / CEO | Kế toán trưởng | Người yêu cầu |
| Tìm kiếm, Đánh giá NCC & Lập Bảng So sánh Giá | Chuyên viên Mua sắm | Procurement Mgr | Người yêu cầu | Kế toán Phí |
| Phát hành Đơn Mua Hàng (PO) gửi NCC | Chuyên viên Mua sắm | Procurement Mgr | Legal Adviser | Thủ kho / Admin |
| Kiểm nghiệm Giao nhận & Nhập kho (GRN) | Thủ kho & Người yêu cầu | Hiệu trưởng Cơ sở | Cán bộ Y tế / IT | Procurement |
| Dán mã QR Tài sản (Asset Tagging) & Bàn giao | Thủ kho / Facility Staff | Admin Manager | Người sử dụng | Kế toán Tài sản |
| Đối soát 3 bên (3-Way Matching) & Thanh toán | Kế toán Phí / Thanh toán | Kế toán trưởng | Procurement Mgr | Nhà cung cấp |

*Ghi chú: Việc quản lý chứng từ hóa đơn GTGT điện tử, trích khấu hao tài sản cố định và tiêu chuẩn kế toán công cụ dụng cụ cần kiểm tra/đối chiếu quy định hiện hành của Bộ Tài chính (Luật Kế toán, Thông tư 200/2014/TT-BTC, Thông tư 45/2013/TT-BTC) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Vật tư & Tài sản (ItemMaster), Danh mục Nhà cung cấp Đạt chuẩn (ApprovedSupplierMaster), Danh mục Ngân sách Hoạt động (BudgetMaster), Ma trận Hạn mức Duyệt (ApprovalMatrixMaster).  
*   
* **Hạn mức Ngân sách:** Hạn mức ngân sách khả dụng (Available Budget) của cơ sở/phòng ban còn đủ để chi trả cho PR.  
*   
* **Hợp đồng Khung:** Các Hợp đồng khung mua sắm tập trung còn hiệu lực (nếu có).  
* 

## **7\. Trigger**

* **Tự động (Auto Reorder Point):** Số lượng vật tư tồn kho khả dụng tại kho trường chạm ngưỡng Tồn kho Tối thiểu (Safety Stock Level).  
*   
* **Định kỳ (Seasonal / Academic Year):** Kế hoạch mua sắm đồng phục, sách vở, quà tặng đầu năm học mới hoặc trang trí sự kiện lễ hội.  
*   
* **Đột xuất (Ad-hoc PR):** Hỏng hóc thiết bị lớp học, phát sinh nhu cầu mua sắm tài sản mới vượt ngoài dự toán ban đầu.  
* 

## **8\. Quy trình AS-IS**

* Giáo viên hoặc Admin cơ sở viết phiếu đề xuất mua sắm bằng tay hoặc gõ file Word/Excel gửi Hiệu trưởng ký giấy.  
*   
* Hiệu trưởng gom các phiếu đề xuất, gửi scan qua Email hoặc nhóm Zalo cho Phòng Mua sắm tập trung ở Trụ sở chính.  
*   
* Chuyên viên Mua sắm gọi điện lấy báo giá từ các mối quen, tự làm file Excel so sánh giá rồi trình Sếp duyệt qua Email.  
*   
* Khi hàng về cơ sở, Admin cơ sở nhận hàng, ký vào biên bản giao hàng của nhà xe/shipper mà không có biên bản kiểm nghiệm chất lượng chuẩn.  
*   
* Cuối tháng, Kế toán gom hóa đơn giấy, ngồi dò từng chứng từ viết tay để làm thủ tục chi tiền.  
*   
* **Hệ quả:** Mua sắm vượt ngân sách không kiểm soát; mua phải hàng kém chất lượng/không đúng quy chuẩn an toàn mầm non; thiếu tính minh bạch trong chọn nhà cung cấp; mất 7–14 ngày cho một chu kỳ duyệt mua sắm; không theo dõi được vị trí và giá trị còn lại của tài sản sau khi mua.  
* 

## **9\. Pain Points / Risk**

* **Budget Overrun Risk:** Mua sắm tự do tại các cơ sở làm vỡ kế hoạch ngân sách năm của tập đoàn do không có công cụ chặn cứng trên ERP.  
*   
* **Fraud & Kickback Risk:** Nhân viên mua sắm chỉ định nhà cung cấp quen thuộc, nâng giá hoặc thông đồng mua hàng nhái/hàng kém chất lượng gây nguy hiểm cho học sinh (Ví dụ: Đồ chơi có độc tố, sơn bàn ghế độc hại).  
*   
* **Operational Bottleneck:** Tắc nghẽn phê duyệt qua giấy tờ/Email kéo dài làm chậm tiến độ khai giảng hoặc gián đoạn hoạt động giảng dạy.  
*   
* **Asset Loss & Wastage:** Mua mới tài sản trong khi kho cơ sở khác vẫn còn thừa tài sản chưa dùng (Thiếu tính năng Inter-Campus Inventory Visibility).  
*   
* **Payment Discrepancy:** Thanh toán sai số tiền hoặc thanh toán trùng hóa đơn cho NCC do đối soát chứng từ thủ công bằng tay.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Khởi tạo Yêu cầu Mua hàng (PR) & Kiểm soát Ngân sách Tự động (PR Creation & Budget Check)**

* **Step 01:**  
* 

  * **Actor:** Người yêu cầu (Giáo viên / Admin Cơ sở / Nhân viên Facility).  
  *   
  * **Action:** Mở màn hình Purchase Request trên ERP, chọn cơ sở, mã trung tâm chi phí (Cost Center), danh mục vật tư/tài sản cần mua, số lượng, ngày cần hàng và lý do mua.  
  *   
  * **ERP Function:** PR Creation & Real-time Budget Validation Engine.  
  *   
  * **Input:** Mã Vật tư/Tài sản, Số lượng, Đơn giá dự kiến, Ngày cần hàng.  
  *   
  * **Output:** Yêu cầu Mua hàng dạng Dự thảo (Draft PR).  
  *   
  * **Business Rule:** BR-PUR-001: ERP tự động kiểm tra Số dư Ngân sách khả dụng (Available Budget \= Budget Allocated \- Spent \- Encumbered). Nếu giá trị PR vượt quá Ngân sách khả dụng, ERP tự động chặn không cho Submit, hoặc bắt buộc chuyển sang luồng Over-Budget Approval Workflow trình CFO.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Draft PR / Budget Validated.  
  *   
  * **SLA:** \<= 10 phút khởi tạo.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở / Trưởng phòng & CFO.  
  *   
  * **Action:** Mở App Mobile / Desktop ERP, xem chi tiết PR, kiểm tra tính cần thiết và bấm "Phê duyệt" (Approve PR).  
  *   
  * **ERP Function:** Automated Multi-Level PR Approval Workflow.  
  *   
  * **Input:** Draft PR.  
  *   
  * **Output:** PR được phê duyệt chính thức (Approved PR).  
  *   
  * **Business Rule:** PR có giá trị \<= 5.000.000 VNĐ trong ngân sách do Hiệu trưởng Cơ sở duyệt 1 cấp. PR \> 5.000.000 VNĐ hoặc vượt ngân sách tự động leo cấp (Escalate) lên CFO/CEO duyệt.  
  *   
  * **Status Before:** Draft PR.  
  *   
  * **Status After:** PR Approved / Pending Sourcing.  
  *   
  * **SLA:** Max 4 giờ làm việc.  
  *   
  * **Notification:** Alert gửi Phòng Mua sắm (Procurement Team) tiếp nhận xử lý.  
  * 

### **Giai đoạn 2: Lựa chọn Nhà Cung Cấp, So sánh Báo giá & Phát hành PO (Sourcing & PO Issuance)**

* **Step 03:**  
* 

  * **Actor:** Chuyên viên Mua sắm.  
  *   
  * **Action:** Nhận Approved PR trên ERP. Nếu mặt hàng đã có Hợp đồng Khung/Đơn giá cố định (Price Agreement Master), ERP tự động chọn NCC. Nếu là mặt hàng mới/tài sản lớn, Chuyên viên Mua sắm tạo Yêu cầu Báo giá (Request for Quotation \- RFQ) gửi tối thiểu 03 NCC thuộc Danh mục Approved Supplier và nhập báo giá vào Bảng So sánh Giá (Quotation Comparison Matrix).  
  *   
  * **ERP Function:** RFQ Management & 3-Quote Comparison Matrix.  
  *   
  * **Input:** Approved PR \+ Báo giá từ các NCC (File PDF/Excel đính kèm).  
  *   
  * **Output:** Bảng So sánh Báo giá được chọn (Selected Vendor Matrix).  
  *   
  * **Business Rule:** BR-PUR-002: Mọi gói mua sắm tài sản/trang thiết bị có giá trị từ 20.000.000 VNĐ trở lên bắt buộc phải có ít nhất **03 Báo giá độc lập** tải lên ERP. NCC được chọn phải đạt chuẩn An toàn Vật liệu Mầm non.  
  *   
  * **Status Before:** Pending Sourcing.  
  *   
  * **Status After:** Vendor Selected.  
  *   
  * **SLA:** \<= 24 giờ làm việc.  
  *   
  * **Notification:** Alert gửi Trưởng phòng Mua sắm duyệt Bảng so sánh giá.  
  *   
* **Step 04:**  
* 

  * **Actor:** Trưởng phòng Mua sắm & ERP System.  
  *   
  * **Action:** Trưởng phòng Mua sắm duyệt Bảng so sánh giá. ERP tự động chuyển đổi Approved PR & Selected Vendor thành Đơn Mua Hàng chính thức (Purchase Order \- PO). ERP tự động gửi PO điện tử (đính kèm chữ ký số / mã QR xác thực) tới Email và Supplier Portal của NCC.  
  *   
  * **ERP Function:** Auto PO Generation & Supplier Dispatcher.  
  *   
  * **Input:** Selected Vendor Matrix.  
  *   
  * **Output:** Đơn mua hàng PO phát hành (Dispatched PO).  
  *   
  * **Business Rule:** BR-PUR-003: PO sau khi phát hành sẽ tự động hạch toán khoản tiền cam kết chi (Encumbered Budget), khóa phần ngân sách tương ứng không cho phòng ban khác sử dụng.  
  *   
  * **Status Before:** Vendor Selected.  
  *   
  * **Status After:** PO Dispatched to Supplier.  
  *   
  * **SLA:** \<= 2 giờ làm việc.  
  *   
  * **Notification:** Tín hiệu xác nhận "NCC đã nhận PO" phản hồi về ERP; Đồng bộ lịch giao hàng dự kiến sang App của Thủ kho cơ sở.  
  * 

### **Giai đoạn 3: Kiểm nghiệm Giao nhận, Nhập kho & Dán mã QR Tài sản (Goods Receipt & Asset Tagging)**

* **Step 05:**  
* 

  * **Actor:** Thủ kho Cơ sở, Người yêu cầu & Cán bộ Chuyên môn (IT/Facility/Y tế).  
  *   
  * **Action:** NCC giao hàng đến cơ sở. Hội đồng giao nhận tiến hành kiểm đếm số lượng, kiểm tra tình trạng quy cách, độ an toàn và vận hành thử. Thủ kho mở Mobile App Kho, chọn PO tương ứng, nhập số lượng thực giao, chụp ảnh sản phẩm/biên bản kiểm nghiệm và bấm "Tạo Phiếu Nhập Kho" (Create GRN).  
  *   
  * **ERP Function:** Mobile Goods Receipt & Quality Inspection.  
  *   
  * **Input:** PO \+ Thực tế giao \+ Ảnh chụp hàng hóa \+ Biên bản kiểm nghiệm.  
  *   
  * **Output:** Phiếu Nhập Kho chính thức (Goods Receipt Note \- GRN).  
  *   
  * **Business Rule:** BR-PUR-004: Nếu hàng hóa không đúng quy cách, hư hỏng hoặc thiếu hụt, Thủ kho chọn tính năng Partial Receipt hoặc Reject All, ghi rõ lý do. ERP tự động tạo biên bản từ chối (Return Note) và phát alert cho Phòng Mua sắm khiếu nại NCC.  
  *   
  * **Status Before:** PO Dispatched.  
  *   
  * **Status After:** Goods Received (GRN Created).  
  *   
  * **SLA:** Complete trong 2 giờ kể từ khi NCC giao hàng.  
  *   
  * **Notification:** Push App gửi Người yêu cầu: *"Hàng hóa theo PR \[Số PR\] đã nhập kho thành công. Xin mời nhận hàng"*.  
  *   
* **Step 06:**  
* 

  * **Actor:** Thủ kho & Cán bộ Quản lý Cơ sở vật chất (Facility Staff).  
  *   
  * **Action:** Đối với hàng hóa thuộc danh mục Tài sản cố định / Công cụ dụng cụ (Bàn ghế, máy tính, thiết bị điện tử, đồ chơi vận động), ERP tự động sinh mã QR Code tài sản duy nhất. Thủ kho dùng máy in tem di động in và dán tem QR Code lên tài sản, sau đó quét mã QR phân bổ tài sản về đúng Phòng/Lớp học phụ trách.  
  *   
  * **ERP Function:** Auto Asset Tagging & Location Allocation.  
  *   
  * **Input:** GRN (chứa Item thuộc loại Fixed Asset/Tool).  
  *   
  * **Output:** Hồ sơ Tài sản Mới (Asset Master Record) \+ Mã QR Code dán trên thực địa.  
  *   
  * **Business Rule:** BR-PUR-005: Tài sản chỉ được phép xuất khỏi kho bàn giao cho Lớp học/Phòng ban khi đã được dán mã QR Code tài sản hợp lệ và quét xác nhận nhận bàn giao trên App.  
  *   
  * **Status Before:** Goods Received.  
  *   
  * **Status After:** Asset Tagged & Allocated.  
  *   
  * **SLA:** Complete trong 4 giờ sau khi nhập kho.  
  *   
  * **Notification:** Bàn giao tài sản hiển thị trên Dashboard Quản lý Tài sản Cơ sở.  
  * 

### **Giai đoạn 4: Đối soát 3 Bên Tự động & Hạch toán Thanh toán (3-Way Matching & Payment Settlement)**

* **Step 07:**  
* 

  * **Actor:** ERP System (Auto 3-Way Matching Engine) & Kế toán Phí/Thanh toán.  
  *   
  * **Action:** Khi NCC gửi Hóa đơn Điện tử (E-Invoice), Kế toán tải hóa đơn lên ERP (hoặc nhận qua API). ERP kích hoạt thuật toán 3-Way Matching Engine tự động so sánh dữ liệu giữa 03 chứng từ: **Đơn Mua Hàng (PO) — Phiếu Nhập Kho (GRN) — Hóa Đơn NCC (Invoice)**.  
  *   
  * **ERP Function:** Automated 3-Way Matching & Voucher Posting.  
  *   
  * **Input:** PO \+ GRN \+ Supplier E-Invoice XML.  
  *   
  * **Output:** Chứng từ Ghi nhận Công nợ Phải trả (Accounts Payable Voucher \- AP Voucher).  
  *   
  * **Business Rule:** BR-PUR-006: Nếu 03 chứng từ KHỚP 100% (Số lượng, Đơn giá, Thành tiền, Thuế VAT), ERP tự động phê duyệt AP Voucher và xếp lịch thanh toán theo điều khoản nợ (Payment Terms). Nếu có sai lệch (Tolerance \> 0%), ERP chặn thanh toán và đẩy vào luồng Payment Exception Review.  
  *   
  * **Status Before:** Goods Received.  
  *   
  * **Status After:** AP Voucher Posted / Scheduled for Payment.  
  *   
  * **SLA:** Real-time matching (\<= 10 giây).  
  *   
  * **Notification:** Tín hiệu lịch thanh toán đồng bộ sang Phân hệ Kế toán (SOP-FIN-002).  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Phát Sinh Nhu Cầu Mua Sắm / Kho Chạm Ngưỡng Safety Stock\]  
       │  
       ▼  
\[Người Yêu Cầu Tạo Purchase Request (PR) Trên ERP\]  
       │  
       ▼  
\[ERP Auto Budget Check Engine: Kiểm Tra Ngân Sách Khả Dụng\]  
       │  
       ◇ Ngân sách còn đủ (In-Budget)?  
       ├─ NO  ──► \[Chuyển Luồng Over-Budget Approval Workflow (CFO/CEO Duyệt)\]  
       └─ YES ──┐  
                │  
                ▼  
\[Multi-Level PR Approval Workflow (Hiệu Trưởng / Admin Mgr Duyệt)\]  
                │  
                ▼  
\[Phòng Mua Sắm Tiếp Nhận PR Approved\]  
       │  
       ◇ Đã có Hợp đồng Khung / Đơn giá Cố định?  
       ├─ YES ──► \[Chọn Trực Tiếp NCC Trong Master Data\]  
       └─ NO  ──► \[Gửi RFQ ──► Nhập 3 Báo Giá Khách Quan ──► Bảng So Sánh Giá\]  
                │  
                ▼  
\[Phê Duyệt Vendor ──► ERP Auto Generate Purchase Order (PO)\]  
                │  
                ▼  
\[Phát Hành PO Điện Tử Gửi NCC (Auto Encumber Budget)\]  
                │  
                ▼  
\[NCC Giao Hàng Tại Trường: Thủ Kho & Cán Bộ Chuyên Môn Kiểm Nghiệm GRN\]  
       │  
       ◇ Hàng Đạt Chất Lượng & Đúng Quy Cách?  
       ├─ NO  ──► \[Lập Biên Bản Reject / Partial Receipt ──► Alert Mua Sắm Khiếu Nại\]  
       └─ YES ──┐  
                │  
                ▼  
\[Hàng hóa là Tài sản / CCDC? ──► ERP Auto Sinh Mã QR Code ──► Dán Tem QR & Bàn Giao\]  
                │  
                ▼  
\[Kế Toán Nhận Hóa Đơn NCC ──► ERP Running Auto 3-Way Matching Engine (PO \= GRN \= Invoice)\]  
       │  
       ◇ Khớp 100% 3 Chứng Từ?  
       ├─ NO  ──► \[Chặn Thanh Toán ──► Đẩy Luồng Review Lỗi Lệch Chứng Từ\]  
       └─ YES ──┐  
                │  
                ▼  
\[Phê Duyệt AP Voucher ──► Lập Lịch Thanh Toán Ngân Hàng (SOP-FIN-002)\]  
                │  
                ▼  
           \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-PUR-001 (Budget Enforcement):** Mọi Yêu cầu Mua hàng (PR) bắt buộc phải gắn với một Mã Ngân sách (Budget Line Item) còn hiệu lực. Nếu số tiền PR vượt quá Ngân sách khả dụng, hệ thống khóa không cho gửi PR trừ khi có phê duyệt ngoại lệ của CFO.  
*   
* **BR-PUR-002 (3-Quote Requirement):** Các gói mua sắm tài sản, công cụ dụng cụ hoặc dịch vụ sửa chữa có giá trị từ **20.000.000 VNĐ** trở lên bắt buộc phải có ít nhất **03 Báo giá độc lập** tải lên ERP đính kèm Bảng so sánh giá. Các trường hợp chỉ định thầu phải có văn bản giải trình được CEO phê duyệt.  
*   
* **BR-PUR-003 (Approved Supplier Rule):** Chỉ được phép phát hành PO cho các Nhà cung cấp đã hoàn tất thẩm định pháp lý và nằm trong Danh mục ApprovedSupplierMaster. Thêm NCC mới bắt buộc phải chạy luồng Supplier Onboarding Workflow.  
*   
* **BR-PUR-004 (Child Safety Material Standard):** Tất cả các sản phẩm mua sắm tiếp xúc trực tiếp với học sinh (Đồ chơi, bàn ghế, thiết bị học tập, hóa chất lau sàn) bắt buộc phải có Chứng nhận An toàn Vật liệu (Non-toxic Material Certificate / ISO / TCVN). Thủ kho có quyền từ chối nhập kho nếu thiếu chứng nhận an toàn.  
*   
* **BR-PUR-005 (Mandatory Asset Tagging):** 100% tài sản cố định và công cụ dụng cụ có giá trị từ **1.000.000 VNĐ/đơn vị** trở lên bắt buộc phải được ERP sinh mã QR Code định danh và dán tem tài sản trước khi xuất kho bàn giao sử dụng.  
*   
* **BR-PUR-006 (Strict 3-Way Matching):** Kế toán tuyệt đối không được duyệt chi/thanh toán cho NCC nếu chứng từ chưa vượt qua kiểm tra 3-Way Matching trên ERP. Mọi khoản chênh lệch giá trị \> 0% hoặc lệch số lượng giữa PO, GRN và Invoice bắt buộc phải có Biên bản Giải trình lệch được Kế toán trưởng ký duyệt.  
* 

## **13\. Exception Cases**

* **Mua sắm khẩn cấp xử lý sự cố cơ sở vật chất (Emergency Purchase):**  
* 

  * *Xử lý:* Trường hợp ống nước vỡ, hỏng điều hòa phòng học giữa mùa nóng, mất điện toàn trường..., Hiệu trưởng Cơ sở được quyền bật cờ Emergency PR Flag (Hạn mức \<= 10.000.000 VNĐ). ERP bỏ qua bước chờ 3 báo giá, cho phép chỉ định mua hàng ngay lập tức. Thủ tục bổ sung chứng từ PR/PO hoàn tất trong 24 giờ sau.  
  *   
* **Nhà cung cấp giao thiếu hàng hoặc hàng bị lỗi/hỏng (Partial Delivery / Damaged Goods):**  
* 

  * *Xử lý:* Thủ kho ghi nhận đúng số lượng thực nhận đạt chuẩn trên App, bấm Partial GRN và nhập cờ Discrepancy Log. ERP tự động cập nhật PO sang trạng thái Partially Delivered, tự động tính toán lại số tiền công nợ theo đúng số lượng thực nhận và phát thông báo yêu cầu NCC giao bù phần thiếu.  
  *   
* **Giá trên Hóa đơn NCC cao hơn Đơn giá trên PO (Price Variance):**  
* 

  * *Xử lý:* ERP 3-Way Matching phát hiện lỗi Price Mismatch Failure, chặn không cho tạo AP Voucher. Chuyên viên Mua sắm phải làm việc với NCC để phát hành Hóa đơn điều chỉnh giảm. Trường hợp tăng giá do biến động thị trường hợp lệ, bắt buộc phải tạo PO Amendment Request có duyệt của Procurement Manager.  
  *   
* **ERP Offline / Mất mạng tại kho cơ sở khi hàng về:**  
* 

  * *Xử lý:* Thủ kho thực hiện kiểm đếm và lập Biên bản Bàn giao Giấy tạm thời. Ngay khi có mạng trở lại, Thủ kho bắt buộc phải chụp ảnh biên bản giấy và nhập dữ liệu tạo GRN chính thức trên ERP trong cùng ngày.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt PR Trong Ngân Sách (\<= 5.000.000 VNĐ) | Hiệu trưởng Cơ sở | N/A | N/A |
| Phê duyệt PR Trong Ngân Sách (5.000.000 \- 50.000.000 VNĐ) | Hiệu trưởng Cơ sở | Trưởng phòng Mua sắm | Kế toán trưởng |
| Phê duyệt PR Trong Ngân Sách (\> 50.000.000 VNĐ) hoặc Vượt Ngân Sách | Hiệu trưởng Cơ sở | CFO | Giám đốc Điều hành (CEO) |
| Phê duyệt PR Khẩn Cấp (Emergency PR \<= 10.000.000 VNĐ) | Hiệu trưởng Cơ sở | System Auto-Bypass | N/A |
| Phê duyệt Bảng So Sánh Giá & Chỉ Định NCC | Chuyên viên Mua sắm | Procurement Manager | CFO (Nếu gói \> 100M) |
| Phê duyệt Thanh toán Ngoại Lệ (3-Way Match Mismatch) | Kế toán Thanh toán | Kế toán trưởng | CFO |

## **15\. Status Lifecycle**

* **Purchase Request (PR) Status:** Draft \-\> Submitted \-\> Under Budget Review \-\> Approved \-\> Processing (Sourcing) \-\> PO Created \-\> Closed (hoặc Rejected / Cancelled).  
*   
* **Purchase Order (PO) Status:** Draft \-\> Dispatched to Vendor \-\> Vendor Confirmed \-\> Partially Received \-\> Fully Received \-\> Billed \-\> Closed.  
*   
* **Goods Receipt (GRN) Status:** Draft \-\> Inspected \-\> Approved / Posted \-\> Asset Tagged \-\> Matched.  
*   
* **Asset Status:** In Stock \-\> Allocated / In Use \-\> Under Maintenance \-\> Transferred \-\> Disposed.  
* 

## **16\. Data Model**

* **Primary Entity:** PurchaseRequest  
* 

  * PRID (PK, String, Unique)  
  *   
  * CampusID (FK, String), DepartmentID (FK), RequesterID (FK)  
  *   
  * BudgetLineID (FK, String), PRDate (Date), RequiredDate (Date)  
  *   
  * TotalEstimatedAmount (Decimal), EmergencyFlag (Boolean)  
  *   
  * PRStatus (Enum: Draft, Submitted, Approved, Rejected, Closed)  
  *   
* **Related Entities:**  
* 

  * PRDetail: PRDetailID (PK), PRID (FK), ItemID (FK), Quantity (Decimal), EstimatedUnitPrice (Decimal), LineTotal (Decimal).  
  *   
  * PurchaseOrder: POID (PK), PRID (FK), SupplierID (FK), PODate (Date), DeliveryDate (Date), TotalAmount (Decimal), TaxAmount (Decimal), EncumberedAmount (Decimal), POStatus (Enum).  
  *   
  * GoodsReceiptNote: GRNID (PK), POID (FK), CampusID (FK), ReceiptDate (Date), ReceivedBy (FK), InspectorID (FK), GRNStatus (Enum).  
  *   
  * FixedAssetMaster: AssetID (PK), AssetQRCode (String, Unique), GRNID (FK), AssetName (String), Category (Enum), OriginalValue (Decimal), CurrentLocationID (FK), CustodianID (FK), AssetStatus (Enum).  
  *   
  * APVoucher: VoucherID (PK), POID (FK), GRNID (FK), SupplierInvoiceNo (String), InvoiceDate (Date), MatchedStatus (Boolean), PaymentDueDate (Date), AmountToPay (Decimal).  
  * 

## **17\. Forms / Documents**

* FRM-PUR-001: Phiếu Yêu cầu Mua hàng Điện tử (Digital Purchase Request \- PR Form).  
*   
* FRM-PUR-002: Bảng So sánh Báo giá & Lựa chọn Nhà Cung cấp (3-Quote Vendor Comparison Matrix).  
*   
* FRM-PUR-003: Đơn Mua Hàng Điện tử (Digital Purchase Order \- PO Form).  
*   
* FRM-PUR-004: Phiếu Nhập Kho & Biên bản Kiểm nghiệm Chất lượng (Goods Receipt & Quality Inspection Note).  
*   
* FRM-PUR-005: Bàn giao & Tem QR Code Định danh Tài sản (Asset Tagging & Transfer Form).  
* 

## **18\. ERP Functional Requirements**

* **FR-PUR-001 (MUST):** Tích hợp Real-time Budget Validation Engine: Tự động kiểm tra hạn mức ngân sách khả dụng ngay khi tạo PR và khóa không cho Submit nếu thiếu ngân sách.  
*   
* **FR-PUR-002 (MUST):** Tích hợp Encumbrance Accounting Logic: Tự động hạch toán cam kết chi (Encumbered Budget) ngay khi PO được phát hành để giữ tiền ngân sách.  
*   
* **FR-PUR-003 (MUST):** Hỗ trợ App Mobile Kho cho phép quét mã vạch/QR Code kiểm đếm hàng giao, chụp ảnh thực tế hàng hóa và lập GRN ngay tại bãi giao nhận.  
*   
* **FR-PUR-004 (MUST):** Tự động sinh mã QR Code tài sản duy nhất (Auto Asset Tagging) khi nhập kho các mặt hàng thuộc danh mục Tài sản/CCDC và tích hợp máy in tem di động.  
*   
* **FR-PUR-005 (MUST):** Tích hợp thuật toán Auto 3-Way Matching Engine: Tự động so sánh PO \- GRN \- Supplier Invoice XML và cảnh báo lệch sai số tự động.  
* 

## **19\. Automation Opportunities**

* **AUTO-PUR-001 (RULE ENGINE):** Tự động khởi tạo PR đề xuất mua sắm khi số lượng tồn kho khả dụng chạm ngưỡng Tồn kho Tối thiểu (Safety Stock Auto-Reorder).  
*   
* **AUTO-PUR-002 (WORKFLOW):** Tự động định tuyến luồng duyệt PR theo giá trị tiền và cờ ngân sách (Routing PR Workflow by Amount & Budget Flag).  
*   
* **AUTO-PUR-003 (INTEGRATION):** Tự động gửi PO qua Email/Supplier Portal và tự động cập nhật lịch giao hàng dự kiến sang App của Thủ kho.  
*   
* **AUTO-PUR-004 (OCR / RPA):** Tự động đọc dữ liệu file XML Hóa đơn Điện tử của NCC (OCR E-Invoice) và thực hiện 3-Way Matching tự động trong 5 giây.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo PR Mới chờ Phê duyệt | Hiệu trưởng / Manager | App Push \+ ERP Alert | Immediate khi PR submitted |
| Cảnh báo PR Vượt Ngân sách (Over-Budget Alert) | CFO & Kế toán Ngân sách | ERP High Alert \+ Email | Immediate khi Budget Check fail |
| Cảnh báo PR Mua sắm Khẩn cấp (Emergency PR) | Hiệu trưởng & Procurement | App Push \+ SMS | Immediate khi Emergency flag \= True |
| Thông báo PO đã được Phát hành tới NCC | Người yêu cầu & Thủ kho | ERP Notification | Immediate khi PO dispatched |
| Nhắc Lịch Giao Hàng của NCC (Delivery Due) | Thủ kho Cơ sở | Mobile App Push | 1 ngày trước ngày giao hàng |
| Cảnh báo Lỗi Lệch Chứng từ 3-Way Matching | Kế toán Phí & Procurement | ERP Pop-up Alert | Immediate khi Matching failed |

## **21\. Permission Matrix (RBAC)**

| Role | View PR / PO | Create PR | Approve PR | Create PO | Perform GRN | Asset Tagging | Perform 3-Way Match |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Người dùng / Giáo viên | Own PR Only | Full | No | No | No | No | No |
| Hiệu trưởng Cơ sở | Campus Full | Full | Full (In limit) | No | View Only | View Only | No |
| Chuyên viên Mua sắm | Full Enterprise | View Only | No | Full | View Only | View Only | View Only |
| Procurement Manager | Full Enterprise | View Only | Full (Sourcing) | Full (Approve) | View Only | View Only | Read Only |
| Thủ kho Cơ sở | Campus GRN | No | No | Read Only | Full | Full | No |
| Kế toán Phí / AP | Full Enterprise | No | No | Read Only | Read Only | View Only | Full |
| CFO / CEO | Full Enterprise | Full | Full (Override) | Full | Read Only | Read Only | Full |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người khởi tạo, người duyệt PR, lịch sử luồng duyệt và các ý kiến từ chối (Reject Reason).  
*   
* Lịch sử Bảng So sánh Báo giá (3-Quote Matrix): Thời gian tải lên báo giá NCC, người chọn NCC trúng thầu.  
*   
* Mọi thay đổi trên PO sau khi phát hành (PO Amendment History: Điều chỉnh số lượng, đơn giá, ngày giao).  
*   
* Nhật ký nhập kho GRN: Người nhận, thời gian, hình ảnh chụp hàng hóa, biên bản hàng lỗi.  
*   
* Nhật ký quét sinh mã QR Code tài sản và lịch sử điều chuyển vị trí tài sản giữa các phòng/cơ sở.  
*   
* Nhật ký xử lý ngoại lệ 3-Way Matching: Lý do bỏ qua lỗi lệch chứng từ và người phê duyệt chi.  
* 

## **23\. Internal Controls**

* **Segregation of Duties (Tách biệt nhiệm vụ):** Người tạo PR không được tự duyệt PR của mình. Chuyên viên Mua sắm tạo PO không được quyền thực hiện Nhập kho (GRN) hoặc Thanh toán (AP Payment).  
*   
* **System Budget Blocking:** Hệ thống tự động khóa không cho phép phát hành PO nếu khoản chi chưa được giữ tiền ngân sách (Encumbered Budget Check).  
*   
* **Dual Inspection for High-Value Assets:** Nhập kho tài sản/trang thiết bị có giá trị \> 20.000.000 VNĐ bắt buộc phải có đủ 2 chữ ký điện tử xác nhận trên App: Thủ kho \+ Cán bộ Chuyên môn (IT/Facility/BGH).  
*   
* **Mandatory 3-Way Matching Gate:** Chặn cứng luồng thanh toán kế toán nếu chưa có GRN hợp lệ hoặc chứng từ chưa vượt qua kiểm tra 3-Way Matching tự động.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Phê duyệt PR Trong Ngân sách** | Thời gian từ khi submit PR đến khi hoàn tất duyệt | **\<= 4 giờ làm việc** | Hiệu trưởng & Managers |
| **SLA Phát hành PO (Procurement Cycle Time)** | Thời gian từ khi PR Approved đến khi gửi PO cho NCC | **\<= 24 giờ làm việc** | Phòng Mua sắm |
| **Tỷ lệ Tuân thủ 3 Báo giá (3-Quote Compliance)** | (Số gói mua sắm \>20M có đủ 3 báo giá / Tổng số gói) \* 100 | **100%** | Procurement Manager |
| **Tỷ lệ Khớp 3 Bên Tự động (3-Way Match Rate)** | (Số chứng từ khớp 100% tự động / Tổng chứng từ) \* 100 | **\>= 95%** | Kế toán trưởng & IT |
| **Tỷ lệ Mua sắm Tiết kiệm Chi phí (Cost Savings %)** | (Giá dự toán PR \- Giá thực tế mua trên PO) / Giá PR | **\>= 5%** | Phòng Mua sắm |

## **25\. Dashboard / Report**

* **Procurement Operational Dashboard (Phòng Mua sắm):** Màn hình theo dõi tiến độ xử lý PR, Danh sách PO chờ giao hàng, Báo cáo SLA cấp PO, Bảng theo dõi đánh giá hiệu xuất NCC (Supplier Rating).  
*   
* **Inventory & Asset Governance Dashboard (Kho & Admin):** Báo cáo giá trị tồn kho theo cơ sở, Cảnh báo vật tư dưới ngưỡng Safety Stock, Bảng đồ vị trí và giá trị tài sản cố định toàn chuỗi.  
*   
* **P2P Executive Financial Dashboard (CFO & Board):** Báo cáo Phân tích Chi phí Mua sắm theo Ngân sách (Budget vs Actual Procurement), Báo cáo Dòng tiền Phải trả NCC (AP Aging & Cash Outflow Forecast), Báo cáo Tiết kiệm chi phí mua sắm tập trung.  
* 

## **26\. Integration**

* **Core Finance & General Ledger (SOP-FIN-001 & Module 55/57):** Đồng bộ dữ liệu kiểm soát Ngân sách, hạch toán cam kết chi (Encumbrance), tự động tạo AP Voucher và Sổ cái Kế toán.  
*   
* **Supplier Portal / E-Invoice Integration:** Cho phép Nhà cung cấp nhận PO trực tiếp, cập nhật tiến độ giao hàng và tự động truyền file XML Hóa đơn điện tử vào ERP.  
*   
* **Facility & Asset Maintenance Engine (SOP-FAC-001):** Đồng bộ dữ liệu Tài sản mới tạo (Asset Tagging) sang Phân hệ Bảo trì và Lịch bảo dưỡng định kỳ thiết bị trường học.  
*   
* **Mobile App Kho & Admin:** Cho phép duyệt PR/PO trên điện thoại, quét mã QR Code kiểm nghiệm nhập kho và dán tem tài sản di động.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Vỡ kế hoạch ngân sách do mua sắm tự do** | High | Low | ERP Auto Budget Check khóa PR/PO nếu hết ngân sách khả dụng. | CFO & Kế toán Ngân sách |
| **Mua phải đồ chơi/trang thiết bị chứa độc tố nguy hiểm** | Critical | Low | Bắt buộc kiểm tra Chứng nhận An toàn Vật liệu Mầm non tại Bước 3 & Bước 5\. | Procurement & Thủ kho |
| **Thông đồng chỉ định NCC quen thuộc nâng giá** | High | Medium | Bắt buộc 3 Báo giá độc lập trên ERP cho gói \> 20M; Luồng duyệt Vendor Matrix. | Procurement Mgr & Internal Audit |
| **Thanh toán trùng hoặc thanh toán sai giá cho NCC** | High | Low | Khóa thanh toán tự động qua 3-Way Matching Engine (PO \= GRN \= Invoice). | Kế toán trưởng |
| **Mất mát / Thất thoát tài sản sau khi mua** | High | Medium | Bắt buộc dán mã QR Code Asset Tagging 100% trước khi xuất kho bàn giao. | Admin Mgr & Thủ kho |

## **28\. Acceptance Criteria**

* **Given:** Admin Cơ sở A tạo một Purchase Request (PR) mua sắm 10 bộ máy tính cho phòng Lab với tổng giá trị 120.000.000 VNĐ.  
*   
* **When:** Admin Cơ sở A bấm "Submit PR".  
*   
* **Then:** ERP kiểm tra Ngân sách khả dụng của Cơ sở A. Nếu đủ ngân sách, ERP chuyển PR sang luồng duyệt 3 cấp (Hiệu trưởng \-\> CFO \-\> CEO). Sau khi CEO bấm "Approved", ERP tự động phát alert chuyển PR cho Phòng Mua sắm và yêu cầu Chuyên viên Mua sắm phải tải lên ít nhất 03 Báo giá độc lập trước khi cho phép chọn NCC và phát hành PO.  
*   
* **Given:** Nhà cung cấp giao 50 chiếc Bàn mầm non đến cơ sở.  
*   
* **When:** Thủ kho thực hiện kiểm đếm và phát hiện 05 chiếc bàn bị nứt chân.  
*   
* **Then:** Thủ kho mở App Kho, nhập số lượng nhận đạt 45, nhập số lượng lỗi 5 và chọn lý do Damaged. ERP tự động sinh Phiếu Nhập Kho GRN cho 45 chiếc, tự động tạo Biên bản Từ chối cho 05 chiếc, đồng thời gửi cảnh báo tới Chuyên viên Mua sắm yêu cầu NCC đổi trả hàng trong vòng 48 giờ.  
* 

## **29\. Test Scenarios**

1. **Happy Path P2P Test:** Tạo PR trong ngân sách \-\> Duyệt PR \-\> Tải 3 Báo giá chọn NCC \-\> Phát hành PO \-\> Nhập kho GRN đạt 100% \-\> Tự động sinh mã QR Asset Tagging \-\> Hóa đơn về Auto 3-Way Matching Pass \-\> Tự động tạo AP Voucher lịch thanh toán.  
2.   
3. **Budget Overrun Blocking Test:** Cố tình tạo PR có giá trị vượt quá Ngân sách khả dụng còn lại của Bộ phận \-\> Kiểm tra xem ERP có chặn không cho Submit và yêu cầu luồng Over-Budget Approval không.  
4.   
5. **3-Quote Requirement Enforcement Test:** Tạo PO cho gói tài sản 30.000.000 VNĐ nhưng chỉ tải lên 02 Báo giá \-\> Kiểm tra xem ERP có khóa nút "Generate PO" và hiển thị thông báo yêu cầu bổ sung báo giá thứ 3 không.  
6.   
7. **Damaged Goods Partial GRN Test:** Nhập kho giao thiếu và hỏng 10% hàng hóa \-\> Kiểm tra xem ERP có tính toán công nợ theo đúng 90% hàng đạt chuẩn và gửi alert khiếu nại NCC không.  
8.   
9. **3-Way Matching Price Variance Test:** Hóa đơn NCC gửi sang có đơn giá cao hơn 5% so với đơn giá trên PO \-\> Kiểm tra xem ERP 3-Way Matching Engine có phát cờ lỗi Matching Failed và khóa không cho hạch toán thanh toán không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận hạn mức duyệt PR/PO; Cấu hình khung giá trị bắt buộc 3 Báo giá (\>= 20M); Cấu hình quy tắc sinh mã QR Code định danh tài sản; Cấu hình sai số chấp nhận 3-Way Matching (Tolerance Rate \= 0%).  
*   
* **Master Data Migration:** Import Danh mục Vật tư/Tài sản chuẩn (Item Master); Import Danh mục Nhà cung cấp đạt chuẩn (Approved Supplier Master); Import hạn mức ngân sách năm của từng cơ sở (Budget Master).  
*   
* **Hardware & Integration:** Trang bị Máy in tem nhãn QR Code di động và Tablet cầm tay cho Thủ kho các cơ sở; Tích hợp API đọc file XML Hóa đơn Điện tử với các nhà cung cấp E-Invoice.  
*   
* **Training & Change Management:** Đào tạo toàn bộ Cán bộ/Giáo viên quy trình tạo PR trên ERP; Đào tạo Phòng Mua sắm thao tác Bảng so sánh 3 báo giá; Đào tạo Thủ kho quy trình dán tem QR Code tài sản và nhập kho GRN trên Mobile App.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (10 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  10.   
  11. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  12.   
  13. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  14.   
  15. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  16.   
  17. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  18.   
  19. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  20.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **15 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ STUDENT CARE & SAFEGUARDING    │ KITCHEN, LOGISTICS & ASSET     │ FINANCE & HUMAN CAPITAL     │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │ • SOP-PUR-001: P2P & Assets    │                             │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 13

# **SOP-ACA-001 — QUY TRÌNH QUẢN LÝ CHƯƠNG TRÌNH KHUNG, SOẠN GIÁO ÁN, PHÂN CÔNG GIẢNG DẠY VÀ XÂY DỰNG THỜI KHÓA BIỂU HỌC ĐƯỜNG**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-ACA-001  
*   
* **Tên SOP:** Quy trình Quản lý Chương trình Khung, Soạn Giáo án, Phân công Giảng dạy Năng khiếu và Xây dựng Thời khóa biểu Học đường  
*   
* **Module ERP:** Academic Year / Term Management (13), Curriculum Management (14), Lesson Planning (15), Teacher Assignment (16), Timetable / Scheduling (17), Classroom Management (41)  
*   
* **Process Owner:** Academic Manager (Trưởng phòng Chuyên môn) / Giám đốc Chương trình  
*   
* **Department:** Phòng Chuyên môn & Đào tạo, Ban Giám hiệu Cơ sở, Khối Giáo viên Mầm non  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Chuyên môn (Academic Director) / Board  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ công tác quản trị chuyên môn giáo dục mầm non: từ việc thiết lập ma trận Chương trình khung (Chương trình Chuẩn Bộ GD&ĐT, Chương trình Quốc tế/Song ngữ, STEAM, Montessori, Năng khiếu), phân bổ thời lượng tiết học, tự động xếp Thời khóa biểu (Timetable) không bị trùng lắp giáo viên/phòng chức năng (Music, Art, Gym, STEM Lab), quản lý luồng soạn và phê duyệt Giáo án điện tử (E-Lesson Plan), đến việc đồng bộ lịch học real-time lên Mobile App Phụ huynh và App Giáo viên.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non thuộc hệ thống trường tư thục / quốc tế / song ngữ / chuỗi nhiều cơ sở.  
*   
* **Phòng ban:** Phòng Chuyên môn, Ban Giám hiệu Cơ sở, Khối Giáo viên Chủ nhiệm, Khối Giáo viên Bộ môn/Năng khiếu (Tiếng Anh, Âm nhạc, Mỹ thuật, Thể chất/Gym, Coding/STEM), Trợ giảng.  
*   
* **Đối tượng:** Toàn bộ học sinh mầm non từ 06 tháng đến 06 tuổi.  
*   
* **Trường hợp không áp dụng:** Các câu lạc bộ ngoài giờ tự nguyện tổ chức sau 17:30 (áp dụng SOP-ACA-003: Quản lý Câu lạc bộ Ngoại khóa & Năng khiếu Sau giờ học).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Curriculum Master (Chương trình Khung):** Cấu trúc phân bổ tổng thể các chủ đề học tập, mục tiêu phát triển và số lượng tiết học bắt buộc trong năm/kỳ theo từng khối độ tuổi.  
*   
* **Lesson Plan (Giáo án tuần/ngày):** Kế hoạch chi tiết của giáo viên cho từng hoạt động học, bao gồm mục tiêu, chuẩn bị dụng cụ, tiến trình tổ chức và phương pháp đánh giá trẻ.  
*   
* **Specialist / Special Subject Teacher (Giáo viên Bộ môn/Năng khiếu):** Giáo viên chuyên trách giảng dạy các môn bổ trợ (Tiếng Anh, Âm nhạc, Mỹ thuật, Gym, Võ thuật) di chuyển giữa các lớp theo Thời khóa biểu.  
*   
* **Specialist Room Booking (Đặt phòng Chức năng):** Cơ chế ERP tự động giữ chỗ các phòng học chuyên biệt (Phòng Lab, Phòng Gym, Phòng Sáng tạo) theo Thời khóa biểu để tránh xung đột lịch sử dụng.  
*   
* **Auto-Timetabling Engine:** Thuật toán ERP tự động tính toán, sắp xếp các tiết học vào khung giờ tối ưu dựa trên ma trận ràng buộc (Constraint Matrix: Sĩ số, Giáo viên, Phòng học, Nhịp sinh học của trẻ mầm non).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Khai báo Master Data Chương trình Khung & Định mức Tiết | Chuyên viên Chuyên môn | Academic Manager | BGH / Chuyên gia | GVCN / GV Bộ môn |
| Chạy Engine Xếp Thời khóa biểu & Kiểm tra Trùng lặp | Academic BA / ERP | Academic Manager | Hiệu trưởng Cơ sở | Toàn thể Giáo viên |
| Soạn Giáo án Điện tử (E-Lesson Plan) trên App | GVCN & GV Bộ môn | Khối trưởng Giáo vụ | Academic Manager | Trợ giảng |
| Kiểm duyệt & Phê duyệt Giáo án Tuần | Khối trưởng / Hiệu trưởng | Academic Manager | Chuyên gia Chuyên môn | Giáo viên |
| Điều chỉnh Lịch học / Đổi tiết / Phụ trách Dạy thay | Hiệu trưởng Cơ sở | Academic Manager | GVCN / GV Bộ môn | Phụ huynh |

*Ghi chú: Việc thiết lập khung thời lượng tiết học, thời gian sinh hoạt ngoài trời và cấu trúc chương trình giáo dục mầm non cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo (Chương trình Giáo dục Mầm non ban hành kèm Thông tư 28/2016/TT-BGDĐT và Thông tư 51/2020/TT-BGDĐT) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Khối/Lớp (ClassMaster), Danh mục Phòng chức năng (SpecialRoomMaster), Danh mục Môn học/Hoạt động (SubjectMaster), Danh mục Giáo viên & Bằng cấp chuyên môn (SOP-HR-001).  
*   
* **Phân công Nhân sự:** Danh sách Giáo viên Chủ nhiệm và Giáo viên Bộ môn đã được phê duyệt phân công trên Phân hệ HR.  
*   
* **Hạn chót Soạn Giáo án:** Đúng **17:00 Thứ Tư hàng tuần** (Duyệt giáo án cho tuần T+1).  
* 

## **7\. Trigger**

* **Lịch Định kỳ Năm học/Học kỳ:** Bắt đầu cấu hình Thời khóa biểu trước khai giảng năm học/kỳ học 15 ngày.  
*   
* **Lịch Định kỳ Tuần:** 17:00 Thứ Tư hàng tuần (Mở luồng Soạn & Duyệt giáo án tuần tiếp theo).  
*   
* **Đột xuất:** Phát sinh thay đổi nhân sự giáo viên, hỏng hóc phòng chức năng hoặc sự cố thời tiết.  
* 

## **8\. Quy trình AS-IS**

* Phòng Chuyên môn gửi file Word/Excel Khung chương trình học qua Email cho Ban Giám hiệu các cơ sở.  
*   
* Hiệu trưởng tự dùng Excel xếp Thời khóa biểu cho từng lớp. Khi có nhiều lớp cùng học môn Năng khiếu, giáo viên phải tự nhắn tin trao đổi để tránh dùng chung phòng Gym/Music.  
*   
* Giáo viên soạn giáo án trên file Word, in ra bản giấy kẹp vào bìa còng trình Hiệu trưởng ký duyệt bằng tay vào chiều Thứ Sáu.  
*   
* Thời khóa biểu dán ở bảng tin trước cửa lớp. Khi có thay đổi tiết học hoặc dạy thay, giáo viên ghi bằng bút xóa hoặc dán giấy đè lên.  
*   
* **Hệ quả:** Tốn 3–5 ngày/kỳ để xếp TKB bằng tay; thường xuyên xảy ra sự cố 2 lớp cùng kéo xuống phòng Music/Gym; giáo án in ấn lãng phí giấy; Phụ huynh không biết chính xác hôm nay con học môn gì, bài gì để tương tác tại nhà.  
* 

## **9\. Pain Points / Risk**

* **Resource Collision Risk:** Trùng lặp giáo viên bộ môn hoặc trùng phòng chức năng giờ cao điểm, làm gián đoạn buổi học và gây bức xúc cho giáo viên.  
*   
* **Copyright & IP Leakage Risk:** Giáo án/Bản quyền chương trình học độc quyền của trường bị giáo viên tự ý tải về lưu cá nhân và mang sang trường khác.  
*   
* **Compliance Violation:** Thời khóa biểu bố trí không hợp lý về mặt sinh lý lứa tuổi mầm non (Ví dụ: Xếp tiết học tư duy nặng ngay sau giờ ăn trưa hoặc giờ vận động mạnh).  
*   
* **Lack of Academic Audit:** Không có công cụ kiểm soát xem giáo viên có dạy đúng theo giáo án đã duyệt hay không, thiếu tính minh chứng chuyên môn.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Thiết lập Chương trình Khung & Chạy Engine Xếp Thời khóa biểu (Curriculum Setup & Timetabling)**

* **Step 01:**  
* 

  * **Actor:** Chuyên viên Chuyên môn & Academic Manager.  
  *   
  * **Action:** Khai báo Chương trình khung (Curriculum Master) cho từng khối độ tuổi trên ERP: Tên chủ đề học tập theo tuần, số tiết/tuần cho từng môn (Tiếng Anh, STEAM, Âm nhạc, Thể chất, Khám phá khoa học), mục tiêu phát triển cần đạt.  
  *   
  * **ERP Function:** Curriculum Framework Configuration.  
  *   
  * **Input:** Cấu trúc môn học, Số tiết định mức/tuần, Khung thời gian tiết (25-30 phút/tiết).  
  *   
  * **Output:** Khung Chương trình Chuẩn (Approved Curriculum Master).  
  *   
  * **Business Rule:** BR-ACA-001: Định mức số tiết và thời lượng tiết học bắt buộc phải tuân thủ Khung Giáo dục Mầm non của Bộ GD&ĐT theo từng độ tuổi. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Curriculum Configured.  
  *   
  * **SLA:** Complete trước kỳ học 15 ngày.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** ERP System (Auto-Timetabling Engine) & Academic Manager.  
  *   
  * **Action:** Academic Manager chọn cơ sở, chọn học kỳ và bấm "Chạy Xếp Thời khóa biểu Tự động". ERP tính toán toán học gán tiết học vào khung giờ, tự động giữ chỗ Phòng chức năng và Giáo viên bộ môn.  
  *   
  * **ERP Function:** Constraint-based Auto-Timetabling & Conflict Resolution.  
  *   
  * **Input:** Curriculum Master, Danh sách Lớp, Danh sách Phòng chức năng, Lịch khả dụng của GV Bộ môn (SOP-HR-001).  
  *   
  * **Output:** Dự thảo Thời khóa biểu Toàn trường (Draft Campus Timetable).  
  *   
  * **Business Rule:** BR-ACA-002: Chặn tuyệt đối trùng lặp 3 chiều: (1) Một GV không dạy 2 lớp cùng lúc; (2) Một Phòng chức năng không chứa 2 lớp cùng lúc; (3) Tiết vận động thể chất không xếp liền kề sau bữa ăn chính.  
  *   
  * **Status Before:** Curriculum Configured.  
  *   
  * **Status After:** Draft Timetable Generated.  
  *   
  * **SLA:** Tự động hoàn tất trong 5 phút.  
  *   
  * **Notification:** Pop-up báo cáo số lượng xung đột lịch (nếu có).  
  * 

### **Giai đoạn 2: Soạn Giáo án Điện tử & Luồng Duyệt Chuyên môn (E-Lesson Plan Authoring & Approval)**

* **Step 03:**  
* 

  * **Actor:** Giáo viên Chủ nhiệm & Giáo viên Bộ môn.  
  *   
  * **Action:** Đúng 17:00 Thứ Tư hàng tuần, Giáo viên mở Phân hệ Lesson Plan Builder trên Tablet/Laptop. Hệ thống tự động điền sẵn Tên bài học và Mục tiêu từ Curriculum Master. Giáo viên chỉ cần chọn Tiến trình hoạt động, chuẩn bị đồ dùng học tập, tải lên slide/video minh họa và bấm "Trình Duyệt Giáo Án" (Submit Lesson Plan).  
  *   
  * **ERP Function:** Structured Lesson Plan Authoring Tool.  
  *   
  * **Input:** Tiến trình dạy học, Đồ dùng chuẩn bị, File bài giảng/Audio/Video đính kèm.  
  *   
  * **Output:** Giáo án dự thảo tuần T+1 (Submitted Lesson Plan).  
  *   
  * **Business Rule:** BR-ACA-003: Giáo án tuần T+1 bắt buộc nộp trước **17:00 Thứ Tư**. Quá hạn chưa nộp, ERP tự động gửi Alert nhắc nhở và báo cờ đỏ Late Submission lên Dashboard Hiệu trưởng.  
  *   
  * **Status Before:** Draft.  
  *   
  * **Status After:** Submitted for Approval.  
  *   
  * **SLA:** 17:00 Thứ Tư hàng tuần.  
  *   
  * **Notification:** Alert gửi Khối trưởng Giáo vụ / Hiệu trưởng Cơ sở.  
  *   
* **Step 04:**  
* 

  * **Actor:** Khối trưởng Giáo vụ / Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Người duyệt mở màn hình Lesson Plan Review, đọc nội dung, xem file đính kèm, nhập góp ý/chỉnh sửa (nếu có) và bấm "Phê duyệt" (Approve Lesson Plan).  
  *   
  * **ERP Function:** E-Lesson Plan Review & Digital Approval Workflow.  
  *   
  * **Input:** Submitted Lesson Plan.  
  *   
  * **Output:** Giáo án chính thức được duyệt (Approved Lesson Plan).  
  *   
  * **Business Rule:** Giáo án bị Từ chối (Rejected) phải được Giáo viên chỉnh sửa và nộp lại trong vòng **24 giờ**. Bắt buộc 100% giáo án phải ở trạng thái Approved trước 12:00 PM Thứ Sáu.  
  *   
  * **Status Before:** Submitted for Approval.  
  *   
  * **Status After:** Approved / Ready for Class.  
  *   
  * **SLA:** Max 24 giờ (Xử lý xong trước 12:00 PM Thứ Sáu).  
  *   
  * **Notification:** Push Notification gửi Giáo viên: *"Giáo án Tuần \[Số Tuần\] của bạn đã được phê duyệt"*.  
  * 

### **Giai đoạn 3: Xuất bản Thời khóa biểu & Đồng bộ Đa kênh (Publishing & Live Sync)**

* **Step 05:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở & ERP System.  
  *   
  * **Action:** Đúng 17:00 Thứ Sáu, Hiệu trưởng bấm "Xuất bản Thời khóa biểu Tuần Mới". ERP tự động đồng bộ Thời khóa biểu kèm Tên bài học, Dụng cụ Phụ huynh cần chuẩn bị lên Mobile App Phụ huynh và App Giáo viên.  
  *   
  * **ERP Function:** Multi-Channel Timetable Sync Engine.  
  *   
  * **Input:** Approved Timetable \+ Approved Lesson Plans.  
  *   
  * **Output:** Thời khóa biểu hiển thị trên Mobile App Phụ huynh & App Teacher.  
  *   
  * **Business Rule:** Phụ huynh tự động nhận được danh sách đồ dùng/trang phục cần chuẩn bị cho con (Ví dụ: *"Thứ Bảy học Bơi: Xin Phụ huynh chuẩn bị đồ bơi"*).  
  *   
  * **Status Before:** Approved.  
  *   
  * **Status After:** Published to Parent & Teacher App.  
  *   
  * **SLA:** 17:00 Thứ Sáu hàng tuần.  
  *   
  * **Notification:** Mobile App Push Notification gửi Phụ huynh.  
  * 

### **Giai đoạn 4: Quản lý Đổi tiết, Dạy thay & Audit Tuân thủ Chương trình (Schedule Swap & Academic Audit)**

* **Step 06:**  
* 

  * **Actor:** Giáo viên & Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Khi có nhu cầu đổi tiết học hoặc giáo viên nghỉ đột xuất (SOP-HR-001), Giáo viên tạo "Yêu cầu Đổi tiết" (Schedule Swap Request) trên App. Sau khi Giáo viên dạy thay bấm Đồng ý, Hiệu trưởng bấm Phê duyệt. ERP tự động cập nhật lại Thời khóa biểu real-time.  
  *   
  * **ERP Function:** Real-time Schedule Swap & Replacement Handler.  
  *   
  * **Input:** Tiết học cần đổi, Giáo viên thay thế, Lý do.  
  *   
  * **Output:** Thời khóa biểu được cập nhật (Schedule Updated).  
  *   
  * **Business Rule:** BR-ACA-004: Mọi thao tác đổi tiết/dạy thay phải hoàn tất phê duyệt trước giờ học ít nhất 30 phút. ERP tự động tính công dạy thay cho Giáo viên nhận tiết.  
  *   
  * **Status Before:** Published.  
  *   
  * **Status After:** Swap Approved & Rescheduled.  
  *   
  * **SLA:** \<= 15 phút xử lý.  
  *   
  * **Notification:** Alert thông báo cho Giáo viên liên quan và cập nhật lịch trên App Phụ huynh.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Cấu Hình Đầu Kỳ / Năm Học\]  
       │  
       ▼  
\[Khai Báo Curriculum Master (Môn Học, Chủ Đề, Định Mức Tiết) Trên ERP\]  
       │  
       ▼  
\[ERP Auto-Timetabling Engine: Sắp Xếp TKB ──► Auto-Check Conflict 3 Chiều\]  
       │  
       ◇ Có xung đột Lịch / Phòng / Giáo Viên?  
       ├─ YES ──► \[Cảnh Báo Xung Đột ──► Chuyên Viên Chuyên Môn Điều Chỉnh Constraint\]  
       └─ NO  ──┐  
                │  
                ▼  
  \[17:00 Thứ Tư Hàng Tuần: Giáo Viên Soạn & Submit E-Lesson Plan Trên Tablet\]  
                │  
                ◇ Giáo viên nộp đúng hạn (Trước 17:00 Thứ Tư)?  
                ├─ NO  ──► \[ERP Báo Cờ Đỏ "Late Submission" ──► Push Alert BGH\]  
                └─ YES ──┐  
                         │  
                         ▼  
  \[Khối Trưởng / BGH Review & Phê Duyệt Giáo Án 電子 (Hoàn Tất Trước 12:00 Thứ Sáu)\]  
       │  
       ◇ Giáo án Đạt Chuẩn?  
       ├─ NO  ──► \[Reject ──► Yêu Cầu Giáo Viên Chỉnh Sửa Trong 24h\]  
       └─ YES ──┐  
                │  
                ▼  
  \[17:00 Thứ Sáu: BGH Bấm Xuất Bản TKB Tuần Mới\]  
                │  
                ▼  
  \[ERP Auto-Sync: Đồng Bộ TKB \+ Tên Bài Học \+ Dụng Cụ Cần Chuẩn Bị Lên Parent App\]  
                │  
                ▼  
  \[DIỄN BIẾN TRONG TUẦN: Quản Lý Đổi Tiết / Dạy Thay Khẩn Cấp Trên App\]  
                │  
                ▼  
           \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-ACA-001 (MOET & Curriculum Compliance):** Khung thời lượng các tiết học mầm non được cấu hình cứng theo độ tuổi: Nhà trẻ (15–20 phút/tiết), Mẫu giáo 3–4 tuổi (20–25 phút/tiết), Mẫu giáo 4–6 tuổi (25–30 phút/tiết). Tự động chặn cấu hình tiết học kéo dài quá thời gian quy định gây mệt mỏi cho trẻ. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
*   
* **BR-ACA-002 (3-Way Conflict Prevention):** Thuật toán xếp TKB tự động khóa cứng, tuyệt đối không cho phép tạo lịch nếu vi phạm 1 trong 3 điều kiện: (1) Giáo viên bộ môn bị trùng ca; (2) Phòng học chức năng bị trùng lớp; (3) Môn vận động thể chất xếp ngay sau bữa ăn chính (trong vòng 45 phút sau ăn).  
*   
* **BR-ACA-003 (Lesson Plan Submission Deadline):** Giáo án tuần T+1 bắt buộc phải được Submit trên ERP trước **17:00 Thứ Tư** tuần T. Hệ thống tự động khóa tính năng chỉnh sửa sau khi Submit trừ khi Người duyệt bấm Mở khóa (Unlock Request).  
*   
* **BR-ACA-004 (IP & Copyright Protection):** Toàn bộ file bài giảng, video, giáo án lưu trữ trên ERP属于 Tài sản Trí tuệ của Nhà trường (Confidential Data). ERP chặn tính năng Download/Export file gốc đối với tài khoản Giáo viên cá nhân, chỉ cho phép trình chiếu trực tiếp trên App/Web.  
*   
* **BR-ACA-005 (Real-time Substitution Sync):** Khi có Yêu cầu Dạy thay/Đổi tiết được phê duyệt, ERP tự động cập nhật tên Giáo viên giảng dạy thực tế trên Sổ ghi bài/Nhật ký lớp học và tự động chuyển dữ liệu tính Phụ cấp Dạy thay sang SOP-HR-001.  
* 

## **13\. Exception Cases**

* **Giáo viên bộ môn nghỉ đột xuất buổi sáng:**  
* 

  * *Xử lý:* Hiệu trưởng bấm "Kích hoạt Tiết Thay thế" (Emergency Class Activity). ERP chuyển tiết Năng khiếu thành tiết Hoạt động Góc/Trải nghiệm tại lớp, tự động thông báo cho Giáo viên chủ nhiệm quản lý và cập nhật thông báo xin lỗi/điều chỉnh lịch nhẹ nhàng trên App Phụ huynh.  
  *   
* **Thời tiết xấu (Mưa bão/Nắng gắt) không thể học Thể chất ngoài trời:**  
* 

  * *Xử lý:* Giáo viên chủ nhiệm bấm "Chuyển Học Trong Nhà" (Indoor Activity Mode). ERP tự động kiểm tra tình trạng trống của Phòng Gym/Phòng Đa năng để giữ chỗ khẩn cấp cho lớp.  
  *   
* **Lớp học phải nghỉ đột xuất do Dịch bệnh / Thiên tai:**  
* 

  * *Xử lý:* Admin kích hoạt cờ School Closure. ERP tự động tạm dừng Thời khóa biểu trực tiếp, tự động kích hoạt Khung Thời khóa biểu Trực tuyến (Online/Home Activity Video) gửi về App Phụ huynh.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Khung Chương trình Master (Curriculum) | Academic Manager | Academic Director | Hội đồng Chuyên môn |
| Phê duyệt Thời khóa biểu Học kỳ (Campus Timetable) | Academic Manager | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Giáo án Điện tử Tuần (Lesson Plan) | Khối trưởng Giáo vụ | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Đổi tiết / Dạy thay giữa 2 Giáo viên | Giáo viên nhận tiết | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Mở khóa Chỉnh sửa Giáo án đã duyệt | Khối trưởng Giáo vụ | Academic Manager | N/A |

## **15\. Status Lifecycle**

* **Curriculum Framework Status:** Draft \-\> Under Academic Review \-\> Approved \-\> Active \-\> Archived.  
*   
* **Lesson Plan Status:** Draft \-\> Submitted \-\> Under Review \-\> Approved \-\> Rejected (Needs Revision) \-\> Completed (Taught).  
*   
* **Timetable Slot Status:** Scheduled \-\> In Progress \-\> Completed \-\> Swapped \-\> Cancelled.  
* 

## **16\. Data Model**

* **Primary Entity:** CurriculumMaster  
* 

  * CurriculumID (PK, String, Unique)  
  *   
  * AcademicYearID (FK, String), AgeGroup (Enum: Toddler, Nursery, Kindergarten)  
  *   
  * CurriculumName (String), ProgramType (Enum: MOET, International, Bilingual, STEAM)  
  *   
  * Status (Enum: Draft, Approved, Active)  
  *   
* **Related Entities:**  
* 

  * CurriculumSubject: SubjectID (PK), CurriculumID (FK), SubjectName (String), PeriodsPerWeek (Integer), DurationMinutes (Integer), RequiresSpecialRoom (Boolean), SpecialRoomType (Enum).  
  *   
  * LessonPlan: PlanID (PK), SubjectID (FK), ClassID (FK), TeacherID (FK), WeekNumber (Integer), TopicTitle (String), LearningObjectives (Text), PreparationNotes (Text), AttachmentURLs (JSON List), Status (Enum).  
  *   
  * TimetableSlot: SlotID (PK), CampusID (FK), ClassID (FK), SubjectID (FK), TeacherID (FK), RoomID (FK), DayOfWeek (Enum), StartTime (Time), EndTime (Time), SlotStatus (Enum).  
  *   
  * ScheduleSwapLog: SwapID (PK), OriginalSlotID (FK), RequestedByTeacherID (FK), SubstituteTeacherID (FK), ApprovalStatus (Enum), Reason (Text).  
  * 

## **17\. Forms / Documents**

* FRM-ACA-001: Khung Chương trình & Phân bổ Môn học Mầm non (Curriculum Framework Matrix).  
*   
* FRM-ACA-002: Mẫu Giáo án Điện tử Mầm non Chuẩn hóa (Digital Lesson Plan Template).  
*   
* FRM-ACA-003: Thời khóa biểu Lớp học & Lịch Sử dụng Phòng Chức năng (Class & Room Timetable).  
*   
* FRM-ACA-004: Phiếu Đề nghị Đổi tiết / Dạy thay Khẩn cấp (Schedule Swap Request Form).  
* 

## **18\. ERP Functional Requirements**

* **FR-ACA-001 (MUST):** Tích hợp Constraint-based Auto-Timetabling Engine: Tự động xếp thời khóa biểu và kiểm tra chặn trùng lặp 3 chiều (Giáo viên \- Phòng chức năng \- Nhịp sinh học sau ăn).  
*   
* **FR-ACA-002 (MUST):** Cung cấp công cụ Lesson Plan Builder trên Web/Tablet cho phép giáo viên soạn giáo án cấu trúc hóa, chọn sẵn bài học từ Curriculum Master và đính kèm video/audio bài giảng.  
*   
* **FR-ACA-003 (MUST):** Phân hệ Digital Approval Workflow hỗ trợ duyệt giáo án hàng loạt, nhận xét trực tiếp trên dòng (In-line Comment) và tự động khóa sổ sau hạn nộp.  
*   
* **FR-ACA-004 (MUST):** Tự động đồng bộ Lịch học, Tên bài học và Dụng cụ Phụ huynh cần chuẩn bị lên Mobile App Phụ huynh ngay khi Thời khóa biểu được xuất bản.  
*   
* **FR-ACA-005 (SHOULD):** Tính năng IP Protection Watermark: Tự động chèn Watermark chứa tên/mã giáo viên và cờ chống Copy/Download file giáo án bản quyền của nhà trường.  
* 

## **19\. Automation Opportunities**

* **AUTO-ACA-001 (RULE ENGINE):** Tự động điền sẵn (Auto-populate) Tên chủ đề bài học và Mục tiêu phát triển từ Curriculum Master vào mẫu Giáo án của Giáo viên hàng tuần.  
*   
* **AUTO-ACA-002 (NOTIFICATION):** Tự động phát thông báo nhắc nhở nộp giáo án lúc 12:00 PM Thứ Tư và báo cờ đỏ Late Submission cho Hiệu trưởng lúc 17:01 Thứ Tư.  
*   
* **AUTO-ACA-003 (INTEGRATION):** Tự động chuyển thông tin Giáo viên dạy thay từ Yêu cầu đổi tiết được duyệt sang Phân hệ Chấm công \- Tính Bảng lương (SOP-HR-001).  
*   
* **AUTO-ACA-004 (APP SYNC):** Tự động đẩy danh sách Đồ dùng học tập cần chuẩn bị vào Sổ liên lạc điện tử (SOP-SIS-002) vào 17:00 Thứ Sáu.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc nộp Giáo án Tuần mới (T+1) | GVCN & GV Bộ môn | Mobile App Push | 12:00 PM Thứ Tư hàng tuần |
| Cảnh báo Giáo án Nộp Trễ (Late Submission) | BGH & Giáo viên | ERP High Alert \+ App Push | 17:01 Thứ Tư hàng tuần |
| Thông báo Giáo án Cần Kiểm duyệt | Khối trưởng & BGH | ERP Notification | Immediate khi GV submit |
| Thông báo Giáo án Được Duyệt / Từ Chối | Giáo viên | Mobile App Push | Immediate khi BGH Approve/Reject |
| Phát hành Thời khóa biểu Tuần Mới | Phụ huynh | Mobile App Push | 17:00 Thứ Sáu hàng tuần |
| Thông báo Yêu cầu Đổi tiết / Dạy thay | GV dạy thay & BGH | Mobile App Push | Immediate khi có Yêu cầu |

## **21\. Permission Matrix (RBAC)**

| Role | View Curriculum | Edit Curriculum | Soạn Giáo án | Duyệt Giáo án | Xếp TKB | Export / Download File |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Giáo viên Chủ nhiệm | Assigned Class | No | Own Class | No | View Only | View Only (Watermarked) |
| Giáo viên Bộ môn | Assigned Subject | No | Own Subject | No | View Only | View Only (Watermarked) |
| Khối trưởng Giáo vụ | Campus Full | No | Full Campus | Full Block | View Only | Read Only |
| Hiệu trưởng Cơ sở | Campus Full | Read Only | Full Campus | Full Campus | Full Campus | Read Only |
| Academic Director | Full Enterprise | Full Enterprise | Full Enterprise | Full Enterprise | Full Enterprise | Full |
| Phụ huynh | Own Child | No | No | No | View Schedule | No |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi thao tác chỉnh sửa Khung Chương trình Master (Người sửa, Nội dung cũ, Nội dung mới, Timestamp).  
*   
* Lịch sử nộp giáo án: Timestamp nộp thực tế, số lần nộp lại, cờ nộp trễ (Late Flag).  
*   
* Lịch sử duyệt giáo án: Người duyệt, Nội dung góp ý, Thời gian bấm Approve/Reject.  
*   
* Nhật ký can thiệp đè lịch Thời khóa biểu (Manual Schedule Override) và người phê duyệt.  
*   
* Lịch sử đổi tiết, dạy thay giữa các giáo viên (Ai đề nghị, Ai nhận, BGH nào phê duyệt).  
* 

## **23\. Internal Controls**

* **Conflict Prevention Gate:** Chặn cứng thuật toán xếp TKB không cho phép lưu nếu có xung đột phòng chức năng hoặc xung đột ca dạy của giáo viên bộ môn.  
*   
* **Lesson Plan Lock Mechanism:** Khóa cứng giáo án tuần sau mốc 17:00 Thứ Tư. Mọi yêu cầu chỉnh sửa sau mốc này bắt buộc phải qua luồng Unlock Request được Hiệu trưởng phê duyệt.  
*   
* **IP Protection Control:** Bật cờ mã hóa chống sao chép/download toàn bộ tài nguyên giáo án bản quyền thuộc sở hữu trí tuệ của nhà trường.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **Tỷ lệ Nộp Giáo án Đúng Hạn (On-time Submission)** | (Số giáo án nộp trước 17h Thứ 4 / Tổng số giáo án) \* 100 | **\>= 98%** | GVCN & Khối trưởng |
| **SLA Duyệt Giáo án của BGH (Review SLA)** | Thời gian từ khi GV submit đến khi BGH duyệt xong | **\<= 24 giờ (Xong trước 12h T6)** | Khối trưởng & Hiệu trưởng |
| **Tỷ lệ Trùng lặp Lịch/Phòng Chức năng (Conflict Rate)** | Số sự cố trùng phòng/giáo viên phát sinh trong học kỳ | **0% (Zero Error)** | Academic Manager & ERP |
| **Tỷ lệ Tuân thủ Chương trình Khung (Curriculum Match)** | (Số tiết đã dạy đúng giáo án / Tổng tiết quy định) \* 100 | **\>= 95%** | Academic Director |

## **25\. Dashboard / Report**

* **Academic Operations Dashboard (BGH & Khối trưởng):** Bảng đếm ngược tiến độ nộp/duyệt giáo án tuần real-time, Cảnh báo giáo án nộp trễ, Lịch sử đổi tiết/dạy thay trong tuần.  
*   
* **Specialist Room Utilization Report (BGH & Admin):** Báo cáo tỷ lệ lấp đầy và hiệu suất sử dụng các phòng chức năng (Gym, Music, Art, STEM Lab) theo cơ sở.  
*   
* **Curriculum Progress & Compliance Analytics (Academic Director):** Báo cáo tiến độ hoàn thành chương trình khung toàn chuỗi, Báo cáo đánh giá chất lượng giáo án theo cơ sở.  
* 

## **26\. Integration**

* **HR & Staff Scheduling (SOP-HR-001):** Nhận dữ liệu danh sách giáo viên, bằng cấp chuyên môn và đồng bộ công dạy thay sang Phân hệ Tính Lương.  
*   
* **Student Daily Activities (SOP-SIS-002):** Tự động đẩy tên bài học và chuẩn bị đồ dùng vào Sổ liên lạc điện tử hàng ngày.  
*   
* **Facility & Asset Management (SOP-FAC-001):** Nhận dữ liệu danh sách phòng chức năng và tình trạng khả dụng của thiết bị lớp học.  
*   
* **Mobile App Phụ huynh & Mobile App Teacher:** Đồng bộ Thời khóa biểu, Giáo án và Lịch nhắc chuẩn bị đồ dùng học tập.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Xảy ra xung đột trùng phòng Gym/Music giờ cao điểm** | High | Low | ERP Auto-Timetabling Engine khóa cứng chặn trùng 3 chiều khi xếp TKB. | Academic Mgr & ERP |
| **Giáo viên không nộp giáo án, đi dạy không chuẩn bị** | High | Medium | Tự động báo cờ đỏ Late Submission; Khóa sổ 17:00 Thứ 4; Dashboard BGH. | Khối trưởng & BGH |
| **Mất cắp bản quyền chương trình học/giáo án độc quyền** | Critical | Low | IP Protection Watermark; Chặn Download/Export file gốc đối với GV. | IT System & Academic Dir |
| **Phụ huynh không nắm được lịch học để chuẩn bị đồ dùng** | Medium | Medium | Auto-Push TKB \+ Danh sách đồ dùng học tập lên App Phụ huynh 17:00 Thứ 6\. | BGH & Communication |

## **28\. Acceptance Criteria**

* **Given:** Academic Manager chạy tiến trình xếp Thời khóa biểu tự động cho Cơ sở A.  
*   
* **When:** Thuật toán phát hiện Lớp Mẫu giáo B1 và Lớp Mẫu giáo B2 cùng được xếp học môn Âm nhạc tại Phòng Music vào lúc 09:00 AM Thứ Ba.  
*   
* **Then:** ERP lập tức chặn không cho lưu TKB, hiển thị thông báo lỗi: *"Xung đột Phòng Chức năng: Phòng Music đã được giữ chỗ bởi Lớp B1"*, đồng thời đề xuất khung giờ trống tiếp theo.  
*   
* **Given:** Giáo viên C không bấm Submit Giáo án tuần T+1 trước mốc 17:00 Thứ Tư.  
*   
* **When:** Đồng hồ hệ thống chuyển sang 17:01 PM Thứ Tư.  
*   
* **Then:** ERP tự động chuyển trạng thái giáo án của Giáo viên C sang Late Submission, đánh cờ đỏ trên Dashboard của Hiệu trưởng, đồng thời gửi Push Notification nhắc nhở khẩn cấp tới điện thoại của Giáo viên C.  
* 

## **29\. Test Scenarios**

1. **Happy Path Academic Cycle Test:** Khai báo Curriculum Master \-\> Auto-Timetabling Pass \-\> GV nộp Giáo án trước 17h T4 \-\> BGH Approve trước 12h T6 \-\> ERP Auto-Publish TKB lên Parent App 17h T6 thành công.  
2.   
3. **3-Way Timetable Conflict Test:** Cố tình xếp 1 Giáo viên Thể chất dạy 2 lớp cùng giờ \-\> Kiểm tra xem Auto-Timetabling Engine có phát cờ chặn xung đột không.  
4.   
5. **Lesson Plan Late Submission Lock Test:** Cố tình KHÔNG submit giáo án trước 17:00 Thứ Tư \-\> Kiểm tra xem ERP có đánh cờ Late Submission và gửi Alert khẩn cho BGH không.  
6.   
7. **IP Protection & Watermark Test:** Đăng nhập tài khoản Giáo viên mở xem file Giáo án \-\> Kiểm tra xem màn hình có hiển thị Watermark tên Giáo viên/Mã nhân viên và cờ chống Download có hoạt động không.  
8.   
9. **Emergency Schedule Swap Test:** Tạo yêu cầu đổi tiết giữa GV A và GV B \-\> GV B confirm \-\> BGH Approve \-\> Kiểm tra xem TKB trên App Phụ huynh và App Teacher có tự động cập nhật real-time không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình chuẩn định mức thời lượng tiết học theo độ tuổi Bộ GD&ĐT; Cấu hình hạn chót nộp giáo án (17:00 Thứ Tư) và hạn chót duyệt (12:00 Thứ Sáu); Cấu hình quy tắc chặn xung đột TKB.  
*   
* **Master Data Migration:** Import danh mục môn học, danh mục phòng chức năng; Import cấu trúc Chương trình khung (Curriculum Master) cho tất cả các khối lớp.  
*   
* **Integration & Testing:** Tích hợp Phân hệ HR (Dữ liệu Giáo viên); Test thuật toán Auto-Timetabling dưới tải giả lập 200 lớp học và 50 phòng chức năng cùng lúc.  
*   
* **Training & Change Management:** Đào tạo Phòng Chuyên môn quy trình thiết lập Curriculum Master; Đào tạo Ban Giám hiệu quy trình duyệt giáo án điện tử hàng loạt; Đào tạo Giáo viên thao tác soạn giáo án cấu trúc hóa trên Tablet.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (11 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  10.   
  11. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  12.   
  13. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  14.   
  15. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  16.   
  17. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  18.   
  19. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  20.   
  21. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  22.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **14 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & ASSET     │ FINANCE & HUMAN CAPITAL     │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │                             │  
│                                │ • SOP-MED-001: Health & Med    │                                │                             │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 14

# **SOP-FIN-002 — QUY TRÌNH QUẢN LÝ THU CHI QUỸ TIỀN MẶT, NGÂN HÀNG, TẠM ỨNG VÀ THANH TOÁN CHI PHÍ VẬN HÀNH CƠ SỞ**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-FIN-002  
*   
* **Tên SOP:** Quy trình Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng và Thanh toán Chi phí Vận hành Cơ sở  
*   
* **Module ERP:** Cash / Bank (56), Expense Management (58), Budget Management (57), Approval Workflow (59), Finance & Accounting Integration (55), Document Management (60)  
*   
* **Process Owner:** Kế toán trưởng (Chief Accountant) / Trưởng phòng Tài chính  
*   
* **Department:** Phòng Kế toán \- Tài chính, Bộ phận Thu quỹ Cơ sở, Ban Giám hiệu  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Tài chính (CFO) / Giám đốc Điều hành (CEO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ quy trình quản lý dòng tiền vận hành (Cash Flow Operations) tại các cơ sở mầm non: từ lập đề nghị thanh toán/tạm ứng chi phí vận hành (Điện, nước, internet, sửa chữa nhỏ, mua vật tư tiêu hao khẩn cấp, sự kiện), kiểm soát hạn mức Quỹ tiền mặt (Petty Cash Limit), thẩm định tính hợp pháp của hóa đơn chứng từ thuế, thanh toán qua ngân hàng (Bank Transfer) hoặc xuất quỹ tiền mặt, thực hiện quy trình hoàn ứng/quyết toán tạm ứng (Advance Settlement/Liquidation), đến tự động định khoản vào Sổ cái Kế toán (General Ledger) và đối soát tài khoản ngân hàng (Bank Reconciliation); triệt tiêu 100% rủi ro thất thoát dòng tiền, chi vượt ngân sách hoặc gian lận chứng từ.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, trung tâm trải nghiệm, văn phòng điều hành thuộc hệ thống trường mầm non tư thục / quốc tế / chuỗi nhiều cơ sở.  
*   
* **Phòng ban:** Toàn bộ các Phòng/Ban/Lớp học có phát sinh nhu cầu tạm ứng, chi tiêu vận hành, thanh toán nhà cung cấp dịch vụ.  
*   
* **Đối tượng:** Chi phí vận hành định kỳ (Điện, nước, viễn thông, thuê mặt bằng, vệ sinh, bảo vệ), Chi phí mua sắm vật tư nhỏ lẻ dưới hạn mức, Chi phí sự kiện/hoạt động học đường, Khoản tạm ứng công tác/mua sắm của Cán bộ Giáo viên Nhân viên (CBGVNV).  
*   
* **Trường hợp không áp dụng:**  
* 

  * Thanh toán Hóa đơn Mua hàng tập trung có Đơn Mua Hàng PO (áp dụng SOP-PUR-001: Procure-to-Pay P2P).  
  *   
  * Chi trả Bảng lương & Phụ cấp nhân sự hàng tháng (áp dụng SOP-HR-001: Quản lý Chấm công & Bảng lương).  
  * 

## **4\. Thuật ngữ và định nghĩa**

* **Petty Cash Fund (Quỹ tiền mặt cơ sở):** Khoản tiền mặt cố định được duy trì tại Thủ quỹ cơ sở để chi trả các khoản chi phí vận hành nhỏ, khẩn cấp dưới hạn mức quy định.  
*   
* **Advance Request (Đề nghị Tạm ứng):** Yêu cầu ứng trước một khoản tiền cho cá nhân (CBGVNV) để thực hiện nhiệm vụ/mua sắm đã được phê duyệt trong một khoảng thời gian nhất định.  
*   
* **Advance Liquidation / Settlement (Hoàn ứng / Quyết toán tạm ứng):** Quy trình đối soát giữa số tiền đã tạm ứng với chi phí thực tế phát sinh (kèm hóa đơn chứng từ hợp lệ) để thu hồi tiền thừa hoặc chi bổ sung tiền thiếu.  
*   
* **Payment Voucher (Phiếu chi):** Chứng từ kế toán ghi nhận việc xuất tiền mặt hoặc chuyển khoản ngân hàng để chi trả cho một khoản chi phí/công nợ.  
*   
* **Receipt Voucher (Phiếu thu):** Chứng từ kế toán ghi nhận dòng tiền mặt nhập quỹ hoặc chuyển khoản vào tài khoản ngân hàng của trường.  
*   
* **Bank Reconciliation (Đối soát Ngân hàng):** Thao tác kiểm tra tự động/bán tự động giữa Sổ sổ quỹ ngân hàng trên ERP (Bank Book) với Sao kê thực tế của Ngân hàng (Bank Statement).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Khởi tạo Đề nghị Thanh toán / Tạm ứng (Payment/Advance Request) | Người đề nghị (GV/Admin) | Hiệu trưởng Cơ sở | Kế toán Ngân sách | Phòng Kế toán |
| Kiểm tra Chứng từ, Hóa đơn & Kiểm soát Ngân sách | Kế toán Thanh toán | Kế toán trưởng | Tax Specialist | Người đề nghị |
| Phê duyệt Luồng Chi tiền (Approval Workflow) | Hiệu trưởng / Kế toán trưởng | CFO / CEO | Board (Nếu vượt trần) | Thủ quỹ / Kế toán |
| Thực hiện Chi Tiền mặt / Chuyển khoản Ngân hàng | Thủ quỹ / Kế toán Bank | Kế toán trưởng | Ngân hàng | Người nhận tiền |
| Nộp Chứng từ Quyết toán & Hoàn ứng (Liquidation) | Người tạm ứng | Kế toán Thanh toán | Kế toán Thuế | Hiệu trưởng Cơ sở |
| Tự động Định khoản GL & Đối soát Ngân hàng (Bank Reconcile) | Kế toán Ngân hàng / ERP | Kế toán trưởng | Auditor | CFO |

*Ghi chú: Việc quản lý Quỹ tiền mặt, quy định thanh toán không dùng tiền mặt (giao dịch \> 20.000.000 VNĐ), hóa đơn chứng từ tài chính và hạch toán sổ cái kế toán cần kiểm tra/đối chiếu quy định hiện hành của Bộ Tài chính (Luật Kế toán, Luật Thuế GTGT, Thông tư 200/2014/TT-BTC, Nghị định 123/2020/NĐ-CP) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Tài khoản Ngân hàng (BankAccountMaster), Danh mục Quỹ Tiền mặt (PettyCashMaster), Ma trận Hạn mức Ngân sách (BudgetLineMaster), Danh mục Mã chi phí (ExpenseCategoryMaster), Ma trận Duyệt ApprovalMatrixMaster.  
*   
* **Hồ sơ Bắt buộc:**  
* 

  1. Đơn đề nghị Thanh toán / Tạm ứng đính kèm Dự toán chi tiết.  
  2.   
  3. Hóa đơn Giá trị Gia tăng Điện tử (File XML/PDF tra cứu được trên Cục Thuế) đối với khoản chi \> 200.000 VNĐ.  
  4.   
  5. Biên bản giao nhận / Bảng kê bán lẻ / Hợp đồng dịch vụ (nếu có).  
  6.   
* **Approval Prerequisite:** Khoản chi nằm trong Ngân sách khả dụng (Available Budget \> 0) hoặc có Văn bản Phê duyệt Chi ngoài Ngân sách của CFO/CEO.  
* 

## **7\. Trigger**

* **Định kỳ:** Hạn thanh toán chi phí cố định (Tiền thuê nhà, tiền điện, nước, internet, phí bảo vệ, vệ sinh) hàng tháng.  
*   
* **Phát sinh Đột xuất:** Phát sinh sự cố hỏng hóc nhỏ cần sửa chữa gấp, mua sắm vật tư tiêu hao khẩn cấp, tổ chức sự kiện học đường.  
*   
* **Hạn Hoàn ứng:** Đến thời hạn quy định quyết toán tạm ứng (mặc định trong vòng **07 ngày làm việc** sau khi hoàn thành công việc/sự kiện).  
* 

## **8\. Quy trình AS-IS**

* Giáo viên hoặc Admin cơ sở viết Giấy đề nghị thanh toán/tạm ứng bằng tay, dán hóa đơn lẻ vào giấy A4 rồi trình Hiệu trưởng ký giấy.  
*   
* Thủ quỹ cơ sở xuất tiền mặt từ két sắt cho tạm ứng nhưng chỉ ghi sổ tay, không có hệ thống cảnh báo hạn hoàn ứng.  
*   
* Khi hoàn ứng, người tạm ứng nộp một tập hóa đơn chứng từ lộn xộn. Kế toán cơ sở ngồi tính toán bằng tay, nhập số liệu vào file Excel rồi gửi về Trụ sở chính.  
*   
* Kế toán công ty tải file sao kê ngân hàng từng ngày, dò tay từng dòng chuyển khoản chi phí để hạch toán vào phần mềm kế toán độc lập.  
*   
* **Hệ quả:** Tạm ứng treo nợ kéo dài nhiều tháng không thu hồi được; mất chứng từ/hóa đơn gốc gây rủi ro bị cơ quan Thuế loại chi phí hợp lý; chi vượt ngân sách cơ sở mà Ban Giám điều hành không hay biết; rủi ro thất thoát/thụt két tại quỹ tiền mặt cơ sở.  
* 

## **9\. Pain Points / Risk**

* **Uncontrolled Cash Outflow Risk:** Xuất quỹ tiền mặt tự do tại các cơ sở khi chưa có phê duyệt của Kế toán trưởng/CFO.  
*   
* **Tax Non-Compliance Risk:** Chi tiền cho các hóa đơn không hợp pháp, hóa đơn bất hợp pháp (doanh nghiệp bỏ trốn) hoặc giao dịch \> 20.000.000 VNĐ chi bằng tiền mặt, dẫn đến bị truy thu Thuế TNDN và phạt vi phạm hành chính.  
*   
* **Long-Standing Unsettled Advances:** Tạm ứng tồn đọng kéo dài, nhân viên nghỉ việc chưa hoàn ứng gây mất vốn của nhà trường.  
*   
* **Duplicate Payment Risk:** Thanh toán trùng 2 lần cho cùng một hóa đơn dịch vụ do không có công cụ tự động kiểm tra trùng mã hóa đơn (Invoice Deduplication Engine).  
*   
* **Manual Reconcile Delay:** Tốn 3–5 ngày/tháng để đối soát sổ quỹ ngân hàng với sao kê thực tế, làm chậm báo cáo tài chính tháng.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Khởi tạo Đề nghị Thanh toán / Tạm ứng & Kiểm soát Ngân sách (Expense / Advance Request & Budget Check)**

* **Step 01:**  
* 

  * **Actor:** Người đề nghị (CBGVNV / Admin Cơ sở).  
  *   
  * **Action:** Mở màn hình Expense Request hoặc Advance Request trên App Mobile/Desktop ERP, chọn Cơ sở, Mã Ngân sách (Cost Center), Số tiền, Hình thức thanh toán (Tiền mặt / Chuyển khoản), Tải lên Ảnh/File Hóa đơn/Bảng kê/Dự toán và bấm "Gửi Đề nghị".  
  *   
  * **ERP Function:** Expense Request & Invoice OCR & Budget Check Engine.  
  *   
  * **Input:** Mã Chi phí, Số tiền, Hình thức nhận, File Hóa đơn (PDF/XML/JPG).  
  *   
  * **Output:** Chứng từ Yêu cầu Chi dạng Dự thảo (Draft Request).  
  *   
  * **Business Rule:** BR-FIN-010: Mọi khoản chi có giá trị từ **20.000.000 VNĐ trở lên** bắt buộc hình thức Chuyển khoản Ngân hàng (Bank Transfer) từ tài khoản Công ty. ERP tự động khóa không cho chọn hình thức "Tiền mặt".  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Draft Request / Budget Validated.  
  *   
  * **SLA:** Complete trong 5 phút.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** ERP System (Tax Invoice OCR & Deduplication Checker).  
  *   
  * **Action:** ERP tự động quét dữ liệu Hóa đơn Điện tử (File XML/Ảnh): Tự động trích xuất Mã số Thuế, Số Hóa đơn, Ngày hóa đơn, Tổng tiền trước thuế, Thuế VAT. Đồng thời quét kiểm tra xem Mã Hóa đơn này đã từng được thanh toán trên ERP chưa.  
  *   
  * **ERP Function:** OCR Invoice Processing & Duplicate Invoice Detection.  
  *   
  * **Input:** File Hóa đơn đính kèm.  
  *   
  * **Output:** Kết quả Xác thực Hóa đơn (Valid & Non-Duplicate).  
  *   
  * **Business Rule:** BR-FIN-011: Nếu phát hiện Số Hóa đơn đã tồn tại trên ERP (dù ở cơ sở khác), hệ thống lập tức **KHÓA CHẶN (BLOCK)** và báo cờ đỏ Duplicate Invoice Detected.  
  *   
  * **Status Before:** Draft Request.  
  *   
  * **Status After:** Invoice Verified.  
  *   
  * **SLA:** Real-time (\<= 5 giây).  
  *   
  * **Notification:** Cảnh báo tới Kế toán Thanh toán nếu phát hiện trùng hóa đơn.  
  * 

### **Giai đoạn 2: Luồng Phê duyệt Đa cấp & Thẩm định Kế toán (Approval Workflow & Accounting Review)**

* **Step 03:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở, Kế toán Thanh toán & CFO.  
  *   
  * **Action:** Người duyệt nhận Alert trên App, mở kiểm tra tính hợp lý của khoản chi, đối chiếu số dư ngân sách khả dụng. Kế toán Thanh toán thẩm định tính hợp pháp của chứng từ Thuế, sau đó duyệt chuyển luồng.  
  *   
  * **ERP Function:** Multi-Level Approval Workflow Engine.  
  *   
  * **Input:** Verified Request \+ Hồ sơ đính kèm.  
  *   
  * **Output:** Yêu cầu Chi được Phê duyệt (Approved Expense Request).  
  *   
  * **Business Rule:** BR-FIN-012: Phân cấp duyệt chi:  
  * 

    * *Khoản chi \<= 5.000.000 VNĐ (In-Budget):* Hiệu trưởng Cơ sở duyệt 1 cấp.  
    *   
    * *Khoản chi \> 5.000.000 đến 50.000.000 VNĐ:* Hiệu trưởng \-\> Kế toán trưởng duyệt.  
    *   
    * *Khoản chi \> 50.000.000 VNĐ hoặc Vượt Ngân sách:* Bắt buộc CFO / CEO phê duyệt.  
    *   
  * **Status Before:** Invoice Verified.  
  *   
  * **Status After:** Approved / Pending Payment.  
  *   
  * **SLA:** Max 4 giờ làm việc.  
  *   
  * **Notification:** Alert gửi Thủ quỹ (nếu chi Tiền mặt) hoặc Kế toán Ngân hàng (nếu Chuyển khoản).  
  * 

### **Giai đoạn 3: Thực thi Chi tiền & Hạch toán Sổ quỹ (Payment Execution & Cash/Bank Booking)**

* **Step 04 (Hình thức Chuyển khoản Ngân hàng):**  
* 

  * **Actor:** Kế toán Ngân hàng & ERP System.  
  *   
  * **Action:** Kế toán Ngân hàng chọn các Yêu cầu Chi đã Approved, bấm "Khởi tạo Lệnh Chuyển tiền" (Generate Bank Payment). ERP tự động kết nối API Cổng Ngân hàng Doanh nghiệp (Corporate Online Banking / Host-to-Host API) gửi lệnh chuyển tiền trực tiếp.  
  *   
  * **ERP Function:** Host-to-Host Bank Payment Integration.  
  *   
  * **Input:** Approved Request \+ Số tài khoản NCC/Người nhận.  
  *   
  * **Output:** Lệnh chuyển tiền thành công (Bank Payment Executed) \-\> ERP Auto-Generate Phiếu Chi Ngân hàng (Bank Payment Voucher).  
  *   
  * **Business Rule:** Tự động khóa khoản tiền ngân sách khả dụng tương ứng và tự động hạch toán bút toán Nợ TK Chi phí / Có TK 112\.  
  *   
  * **Status Before:** Approved / Pending Payment.  
  *   
  * **Status After:** Paid via Bank / GL Posted.  
  *   
  * **SLA:** Real-time (\<= 1 phút qua API Ngân hàng).  
  *   
  * **Notification:** Real-time Push App cho Phụ huynh/NCC/Người đề nghị: *"Khoản thanh toán \[Số tiền\] đã được chuyển thành công"*.  
  *   
* **Step 05 (Hình thức Chi Quỹ Tiền mặt Cơ sở):**  
* 

  * **Actor:** Thủ quỹ Cơ sở & Người nhận tiền.  
  *   
  * **Action:** Người nhận tiền đến Phòng Thủ quỹ. Thủ quỹ mở App ERP, chọn Yêu cầu Chi đã Approved, kiểm tra CMND/CCCD người nhận, xuất tiền mặt từ két. Người nhận ký chữ ký điện tử (hoặc ký Phiếu chi in ra). Thủ quỹ bấm "Xác nhận Đã Xuất Quỹ" (Confirm Cash Disbursement).  
  *   
  * **ERP Function:** Petty Cash Disbursement & Electronic Voucher Signing.  
  *   
  * **Input:** Approved Request \+ Chữ ký người nhận.  
  *   
  * **Output:** Phiếu Chi Tiền Mặt (Cash Payment Voucher) ở trạng thái Posted.  
  *   
  * **Business Rule:** BR-FIN-013: Thủ quỹ tuyệt đối không được xuất quỹ tiền mặt nếu Yêu cầu Chi chưa có trạng thái Approved trên ERP. Số dư Quỹ tiền mặt thực tế tại két không được vượt quá Định mức Quỹ (Petty Cash Ceiling \- Mặc định \<= 20.000.000 VNĐ/cơ sở).  
  *   
  * **Status Before:** Approved / Pending Payment.  
  *   
  * **Status After:** Paid via Cash / GL Posted.  
  *   
  * **SLA:** \<= 15 phút tại cơ sở.  
  *   
  * **Notification:** Alert số dư quỹ tiền mặt cập nhật real-time về Kế toán trưởng.  
  * 

### **Giai đoạn 4: Quản lý Hoàn ứng, Quyết toán Tạm ứng & Báo cáo Sổ quỹ (Advance Liquidation & Bank Reconciliation)**

* **Step 06 (Đối với Khoản Tạm ứng):**  
* 

  * **Actor:** Người tạm ứng & Kế toán Thanh toán.  
  *   
  * **Action:** Sau khi hoàn thành sự kiện/công việc, Người tạm ứng mở màn hình Advance Liquidation, chọn Đơn Tạm ứng cũ, tải lên Hóa đơn/Chứng từ chi thực tế.  
  * 

    * *Nếu Chi \> Tạm ứng:* ERP đề xuất chi bổ sung phần thiếu (Reimbursement).  
    *   
    * *Nếu Chi \< Tạm ứng:* ERP yêu cầu Người tạm ứng nộp lại tiền thừa vào Quỹ/Chuyển khoản trả trường (Refund).  
    *   
  * **ERP Function:** Advance Settlement & Balance Clearing Engine.  
  *   
  * **Input:** Mã Đơn Tạm ứng \+ Tập hợp Hóa đơn thực tế.  
  *   
  * **Output:** Tờ khai Quyết toán Tạm ứng (Settlement Voucher) \-\> Khai trừ công nợ tạm ứng (TK 141).  
  *   
  * **Business Rule:** BR-FIN-014: Thời hạn hoàn ứng tối đa là **07 ngày làm việc** kể từ ngày kết thúc công việc. Quá 07 ngày chưa hoàn ứng, ERP tự động khóa tính năng cho Tạm ứng mới và tự động gửi thông báo trừ lương kỳ tiếp theo.  
  *   
  * **Status Before:** Advanced / Pending Settlement.  
  *   
  * **Status After:** Advance Cleared & Closed.  
  *   
  * **SLA:** Complete trong 24 giờ sau khi nộp đủ chứng từ.  
  *   
  * **Notification:** Báo cáo công nợ tạm ứng treo (Aging Advance Report) gửi Kế toán trưởng.  
  *   
* **Step 07 (Đối soát Ngân hàng Tự động):**  
* 

  * **Actor:** ERP System (Auto Bank Reconciliation Engine) & Kế toán Ngân hàng.  
  *   
  * **Action:** Cuối ngày, ERP tự động tải file Sao kê Điện tử (Bank Statement API) từ Ngân hàng, chạy thuật toán so sánh với Sổ quỹ Ngân hàng (Bank Book).  
  *   
  * **ERP Function:** Automated Bank Reconciliation.  
  *   
  * **Input:** Bank Statement API Data vs GL Bank Book.  
  *   
  * **Output:** Biên bản Đối soát Ngân hàng (Bank Reconciled Report).  
  *   
  * **Business Rule:** Tự động gạch khớp các dòng tiền có mã giao dịch trùng 100%. Các dòng chênh lệch được đưa vào danh sách Unreconciled Bank Items cho Kế toán xử lý.  
  *   
  * **Status Before:** Unreconciled.  
  *   
  * **Status After:** Fully Reconciled.  
  *   
  * **SLA:** Tự động hoàn tất lúc 23:30 PM hàng ngày.  
  *   
  * **Notification:** Dashboard báo cáo tài khoản ngân hàng sẵn sàng.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Khởi Tạo Đề Nghị Thanh Toán / Tạm ứng Chi Phí Vận Hành\]  
       │  
       ▼  
\[ERP Auto Budget Check: Kiểm Tra Ngân Sách Khả Dụng (Cost Center)\]  
       │  
       ◇ Vượt Ngân Sách Khả Dụng?  
       ├─ YES ──► \[Chuyển Luồng Duyệt Ngoại Lệ Over-Budget (CFO/CEO Duyệt)\]  
       └─ NO  ──┐  
                │  
                ▼  
\[ERP OCR Engine: Scan Hóa Đơn ──► Auto Check Trùng Mã Hóa Đơn (Deduplication)\]  
       │  
       ◇ Phát hiện Hóa đơn Trùng lặp?  
       ├─ YES ──► \[KHÓA CHẶN (BLOCK) ──► Phát Cảnh Báo Cờ Đỏ Cố Tình Chi Trùng\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Multi-Level Approval Workflow (Hiệu Trưởng ──► Kế Toán Trưởng ──► CFO)\]  
                │  
                ▼  
\[Đã Phê Duyệt (Approved / Pending Payment)\]  
       │  
       ◇ Hình Thức Thanh Toán?  
       ├─ Tiền Mặt (Petty Cash \<= 20M) ──► \[Thủ Quỹ Xuất Két ──► Ký Phiếu Chi ──► Auto GL 111\]  
       └─ Chuyển Khoản Ngân Hàng ───────► \[Host-to-Host API Bank ──► Auto Chuyển ──► Auto GL 112\]  
                                               │  
                                               ▼  
                         \[Trường hợp là Khoản Tạm Ứng (Advance)\]  
                                               │  
                                               ▼  
                         \[Trong vòng 07 ngày: Người Tạm ứng Nộp Chứng Từ Hoàn Ứng\]  
                                               │  
                                               ◇ Chi Thực Tế vs Tiền Tạm Ứng?  
                                               ├─ Chi \> Tạm Ứng ──► \[Chi Bổ Sung Phần Thiếu\]  
                                               ├─ Chi \< Tạm Ứng ──► \[Nộp Trả Tiền Thừa Vào Quỹ\]  
                                               └─ Chi \= Tạm Ứng ──┐  
                                                                  │  
                                                                  ▼  
                         \[Kế Toán Duyệt Quyết Toán ──► ERP Auto Clear Công Nợ TK 141\]  
                                                                  │  
                                                                  ▼  
                         \[23:30 PM: ERP Auto Bank Reconciliation Engine Running\]  
                                                                  │  
                                                                  ▼  
                                                             \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-FIN-010 (Cash Payment Ceiling):** Khoản chi phí vận hành có giá trị từ **20.000.000 VNĐ trở lên** bắt buộc phải thanh toán bằng hình thức Chuyển khoản Ngân hàng từ tài khoản đứng tên Công ty. ERP chặn cứng không cho chọn hình thức Chi tiền mặt cho giao dịch \>= 20 triệu VNĐ để tuân thủ quy định Thuế TNDN. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
*   
* **BR-FIN-011 (Invoice Deduplication Control):** Mọi hóa đơn tài chính (File XML/Số Hóa đơn) khi đính kèm vào Yêu cầu Chi sẽ được ERP quét kiểm tra duy nhất trên toàn hệ thống đa cơ sở. Nếu Mã số Thuế NCC \+ Số Hóa đơn trùng với chứng từ đã chi trước đó, hệ thống lập tức khóa chặn không cho Submit.  
*   
* **BR-FIN-012 (Petty Cash Ceiling & Replenishment):** Hạn mức Quỹ tiền mặt tối đa (Petty Cash Ceiling) tại mỗi cơ sở được quy định cứng (Mặc định \<= **20.000.000 VNĐ**). Chỉ dùng chi trả cho các khoản chi phí nhỏ lẻ dưới **2.000.000 VNĐ/giao dịch**. Khi số dư Quỹ tiền mặt xuống dưới 20% (4.000.000 VNĐ), Thủ quỹ mới được lập "Đề nghị Bổ sung Quỹ" (Petty Cash Replenishment Request).  
*   
* **BR-FIN-013 (Advance Settlement Deadline):** Thời hạn quyết toán hoàn ứng tối đa là **07 ngày làm việc** kể từ ngày kết thúc công việc/sự kiện. Nhân viên đang có công nợ tạm ứng quá hạn (Overdue Advance) chưa quyết toán sẽ bị ERP **KHÓA TỰ ĐỘNG** tính năng Đề nghị Tạm ứng mới và tự động gửi thông báo cấn trừ vào Bảng lương tháng tiếp theo.  
*   
* **BR-FIN-014 (Over-Budget Approval Gate):** Các khoản chi phát sinh ngoài Kế hoạch Ngân sách tháng/năm đã duyệt bắt buộc phải chạy qua luồng Duyệt Ngoại lệ (Over-Budget Approval Workflow) có chữ ký điện tử phê duyệt của CFO và CEO.  
* 

## **13\. Exception Cases**

* **Nhân viên làm mất Hóa đơn Tài chính gốc khi Hoàn ứng:**  
* 

  * *Xử lý:* Người tạm ứng phải làm Biên bản Mất hóa đơn/Chứng từ chi, giải trình chi tiết lý do, đính kèm xác nhận của Đơn vị Bán hàng và Hiệu trưởng Cơ sở. Khoản chi này bắt buộc trình CFO phê duyệt. Nếu không được chấp thuận, nhân viên phải tự bỏ tiền túi bồi hoàn khoản tạm ứng đó.  
  *   
* **Chi phí phát sinh khẩn cấp ngoài giờ hành chính / Ngày nghỉ (Đứt dây điện, hỏng máy bơm nước):**  
* 

  * *Xử lý:* Hiệu trưởng Cơ sở được quyền sử dụng Quỹ tiền mặt khẩn cấp (Emergency Petty Cash) để xử lý sự cố (Hạn mức \<= 3.000.000 VNĐ). Thủ quỹ xuất tiền mặt trước. Thủ tục hoàn thiện Đề nghị Chi trên ERP được thực hiện bổ sung trong vòng 12 giờ làm việc tiếp theo.  
  *   
* **Giao dịch Chuyển khoản Ngân hàng bị lỗi / Nhầm Số tài khoản NCC:**  
* 

  * *Xử lý:* Ngân hàng trả phản hồi Webhook lỗi Transfer Failed. ERP tự động hoàn trả số tiền về trạng thái Pending, tự động mở lại Yêu cầu Chi và gửi Alert cho Kế toán Ngân hàng kiểm tra chỉnh sửa Số tài khoản/Tên Ngân hàng đúng.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Chi phí Trong Ngân sách (\<= 5.000.000 VNĐ) | Hiệu trưởng Cơ sở | N/A | N/A |
| Chi phí Trong Ngân sách (5.000.000 \- 50.000.000 VNĐ) | Hiệu trưởng Cơ sở | Kế toán trưởng | N/A |
| Chi phí Trong Ngân sách (\> 50.000.000 VNĐ) | Hiệu trưởng Cơ sở | Kế toán trưởng | Giám đốc Tài chính (CFO) |
| Mọi khoản Chi Vượt Ngân sách (Over-Budget) | Kế toán trưởng | CFO | Giám đốc Điều hành (CEO) |
| Đề nghị Tạm ứng Nhân sự (\<= 10.000.000 VNĐ) | Hiệu trưởng Cơ sở | Kế toán trưởng | N/A |
| Báo cáo Quyết toán Hoàn ứng (Advance Liquidation) | Kế toán Thanh toán | Kế toán trưởng | N/A |

## **15\. Status Lifecycle**

* **Expense / Advance Request Status:** Draft \-\> Submitted \-\> Under Review \-\> Approved \-\> Paid / Disbursed \-\> Settled (Hoàn ứng xong) \-\> Closed (hoặc Rejected / Cancelled).  
*   
* **Cash / Bank Voucher Status:** Draft \-\> Approved \-\> Posted (Đã hạch toán Sổ cái) \-\> Reconciled (Đã đối soát Ngân hàng).  
* 

## **16\. Data Model**

* **Primary Entity:** ExpenseRequest  
* 

  * RequestID (PK, String, Unique)  
  *   
  * CampusID (FK, String), DepartmentID (FK), RequesterID (FK)  
  *   
  * CostCenterID (FK, String), ExpenseCategoryID (FK)  
  *   
  * Amount (Decimal), PaymentMethod (Enum: Cash, BankTransfer)  
  *   
  * IsAdvance (Boolean), DueDate (Date)  
  *   
  * RequestStatus (Enum: Draft, Submitted, Approved, Paid, Settled, Rejected)  
  *   
* **Related Entities:**  
* 

  * TaxInvoiceDetail: InvoiceID (PK), RequestID (FK), InvoiceNo (String, Unique Index), TaxCode (String), VendorName (String), PreTaxAmount (Decimal), VATAmount (Decimal), TotalAmount (Decimal), XMLFileUrl (String), DeduplicationCheck (Boolean).  
  *   
  * PaymentVoucher: VoucherID (PK), RequestID (FK), CampusID (FK), VoucherType (Enum: CashPayment, BankPayment), Amount (Decimal), DisbursedBy (FK), PaymentDate (DateTime), GLPosted (Boolean).  
  *   
  * AdvanceSettlement: SettlementID (PK), AdvanceRequestID (FK), AdvanceAmount (Decimal), ActualExpenseAmount (Decimal), BalanceAmount (Decimal), SettlementType (Enum: Refund, Reimbursement, Exact), SettlementStatus (Enum).  
  * 

## **17\. Forms / Documents**

* FRM-FIN-010: Đơn Đề nghị Thanh toán Chi phí Vận hành Điện tử (Digital Expense Payment Request).  
*   
* FRM-FIN-011: Đơn Đề nghị Tạm ứng Nhân sự Điện tử (Digital Advance Request Form).  
*   
* FRM-FIN-012: Bảng Kê Quyết toán Hoàn ứng Tạm ứng (Advance Liquidation & Settlement Form).  
*   
* FRM-FIN-013: Phiếu Chi Tiền mặt / Báo Nợ Ngân hàng (Cash / Bank Payment Voucher).  
*   
* FRM-FIN-014: Biên bản Kiểm kê Quỹ Tiền mặt Cơ sở Định kỳ (Petty Cash Audit Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-FIN-010 (MUST):** Tích hợp công nghệ **OCR Scan Hóa đơn Điện tử**: Tự động đọc file XML/PDF hóa đơn GTGT, trích xuất dữ liệu thuế và tự động kiểm tra trùng lặp Số Hóa đơn trên toàn hệ thống.  
*   
* **FR-FIN-011 (MUST):** Tích hợp Real-time Budget Enforcement Gate: Tự động khóa Yêu cầu Chi nếu Mã Ngân sách (Cost Center) của Cơ sở không còn đủ Hạn mức Khả dụng.  
*   
* **FR-FIN-012 (MUST):** Tích hợp API Cổng Ngân hàng Doanh nghiệp (Host-to-Host Banking API): Cho phép phê duyệt lệnh chi và tự động chuyển khoản qua Ngân hàng ngay trên phần mềm ERP.  
*   
* **FR-FIN-013 (MUST):** Tự động hạch toán bút toán Sổ cái (GL Auto-Posting) ngay khi Phiếu Chi tiền mặt/ngân hàng chuyển trạng thái Paid.  
*   
* **FR-FIN-014 (MUST):** Tích hợp Thuật toán Auto Bank Reconciliation: Tự động tải sao kê ngân hàng và đối soát 100% khớp các dòng tiền giao dịch trong ngày.  
*   
* **FR-FIN-015 (SHOULD):** Tính năng Auto Salary Deduction Warning: Tự động cảnh báo và chuyển khoản công nợ tạm ứng quá hạn 07 ngày vào danh sách cấn trừ lương kỳ tiếp theo.  
* 

## **19\. Automation Opportunities**

* **AUTO-FIN-010 (OCR / RPA):** Tự động đọc dữ liệu Hóa đơn Điện tử XML Cục Thuế và điền tự động 100% các trường thông tin thuế vào Yêu cầu Chi trong 3 giây.  
*   
* **AUTO-FIN-011 (RULE ENGINE):** Tự động phân loại luồng duyệt chi (Workflow Routing) dựa trên Số tiền, Cờ Ngân sách và Loại hình chi phí.  
*   
* **AUTO-FIN-012 (INTEGRATION):** Tự động kết nối API Ngân hàng chuyển khoản tiền cho NCC/Người nhận và tự động nhận Webhook xác nhận gạch nợ.  
*   
* **AUTO-FIN-013 (WORKFLOW):** Tự động đếm ngược 07 ngày hạn hoàn ứng, tự động gửi Push Notification nhắc nhở hàng ngày từ ngày D-2 và tự động khóa tính năng tạm ứng mới nếu quá hạn.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Phê duyệt Yêu cầu Chi / Tạm ứng Mới | Hiệu trưởng / Kế toán trưởng | Mobile App Push \+ ERP Alert | Immediate khi submit |
| Cảnh báo Phát hiện Hóa đơn Trùng lặp (Duplicate) | Kế toán Thanh toán | ERP High Alert Pop-up | Immediate khi OCR scan |
| Cảnh báo Yêu cầu Chi Vượt Ngân sách (Over-Budget) | CFO & Kế toán Ngân sách | ERP High Alert \+ Email | Immediate khi Budget Check fail |
| Thông báo Chi tiền Thành công (Chuyển khoản / Tiền mặt) | Người đề nghị & NCC | Mobile App Push \+ SMS | Real-time khi xuất quỹ / API Bank |
| Nhắc Hoàn ứng Tạm ứng (Sắp hết hạn D-2) | Người tạm ứng | Mobile App Push | 08:30 AM ngày D-2 |
| CẢNH BÁO TẠM ỨNG QUÁ HẠN (Overdue Advance Alert) | Kế toán trưởng & HR C\&B | ERP High Alert \+ Push | 08:30 AM ngày D+1 quá hạn |

## **21\. Permission Matrix (RBAC)**

| Role | View Expense | Create Request | Approve Request | Disburse Cash | Execute Bank API | Clear Advance | View Bank Book |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| CBGVNV / Admin | Own Only | Full | No | No | No | Own Only | No |
| Hiệu trưởng Cơ sở | Campus Full | Full | Full (In limit) | View Only | No | View Only | No |
| Thủ quỹ Cơ sở | Campus Cash | No | No | Full (Cash) | No | View Only | No |
| Kế toán Thanh toán | Full Enterprise | View Only | Full (Review) | Read Only | No | Full | Read Only |
| Kế toán Ngân hàng | Full Enterprise | No | No | No | Full (Bank API) | Read Only | Full |
| Kế toán trưởng / CFO | Full Enterprise | Full | Full (Override) | Full | Full | Full | Full |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể xóa sửa đối với:

* Mọi thao tác Tạo, Sửa, Duyệt, Từ chối Yêu cầu Chi / Tạm ứng (User ID, Timestamp, Lý do từ chối).  
*   
* Lịch sử quét OCR Hóa đơn Điện tử: Mức độ khớp dữ liệu, Cờ cảnh báo trùng hóa đơn, Link file XML/PDF gốc.  
*   
* Nhật ký xuất quỹ tiền mặt của Thủ quỹ (Timestamp, Chữ ký điện tử người nhận, Số tiền).  
*   
* Nhật ký giao dịch chuyển khoản qua API Ngân hàng (Bank Transaction Ref, Status Code, Raw Bank Payload).  
*   
* Lịch sử phê duyệt Ngoại lệ Chi Vượt Ngân sách (Over-Budget Approval) do CFO/CEO bấm duyệt.  
*   
* Nhật ký cấn trừ công nợ tạm ứng quá hạn vào Bảng lương nhân sự.  
* 

## **23\. Internal Controls**

* **Segregation of Duties (Tách biệt nhiệm vụ):** Người đề nghị chi không được tự duyệt chi. Kế toán Thanh toán duyệt hồ sơ không được kiêm nhiệm Thủ quỹ xuất tiền mặt hoặc Kế toán Ngân hàng giữ Token chuyển khoản.  
*   
* **Cash Disbursement Gate:** Chặn cứng Thủ quỹ không được xuất tiền mặt nếu chứng từ Yêu cầu Chi chưa có trạng thái Approved đa cấp trên ERP.  
*   
* **Mandatory OCR & Deduplication Check:** Bắt buộc 100% hóa đơn tài chính phải qua công cụ OCR kiểm tra trùng lặp tự động trước khi trình duyệt chi.  
*   
* **Advance Ceiling & Lock Control:** Tự động khóa tính năng tạm ứng mới đối với cá nhân đang có công nợ tạm ứng quá 07 ngày chưa hoàn ứng.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Phê duyệt Yêu cầu Chi Trong Ngân sách** | Thời gian từ khi submit đến khi duyệt xong | **\<= 4 giờ làm việc** | Hiệu trưởng & Kế toán trưởng |
| **SLA Thực thi Chi tiền (Cash/Bank Execution)** | Thời gian từ khi Approved đến khi chi tiền thành công | **\<= 1 giờ làm việc** | Thủ quỹ & Kế toán Bank |
| **Tỷ lệ Quyết toán Tạm ứng Đúng Hạn (07 ngày)** | (Số đơn tạm ứng hoàn ứng đúng hạn / Tổng đơn) \* 100 | **\>= 98%** | Kế toán Thanh toán |
| **Tỷ lệ Khớp Ngân hàng Tự động (Auto Bank Reconcile)** | (Số dòng tiền khớp tự động qua API / Tổng dòng tiền) \* 100 | **\>= 98%** | Kế toán Ngân hàng & IT |
| **Tỷ lệ Sai sót / Chi Trùng Hóa đơn Thuế** | Số vụ chi trùng hóa đơn hoặc chi vi phạm Luật Thuế | **0% (Zero Tolerance)** | Kế toán trưởng |

## **25\. Dashboard / Report**

* **Cash & Expense Operational Dashboard (Kế toán & Thủ quỹ):** Màn hình theo dõi Yêu cầu Chi chờ duyệt real-time, Số dư Quỹ tiền mặt các cơ sở, Bảng đếm ngược hạn hoàn ứng tạm ứng, Cảnh báo hóa đơn trùng.  
*   
* **Bank Balance & Cash Flow Monitor (Kế toán trưởng & CFO):** Màn hình theo dõi số dư thực tế tất cả tài khoản Ngân hàng real-time, Dòng tiền thu/chi trong ngày, Báo cáo tình hình thực hiện Ngân sách vận hành (Budget vs Actual Expense).  
*   
* **Executive Financial Control Report (CFO & Board):** Báo cáo phân tích chi phí vận hành theo cơ sở/chuỗi, Báo cáo công nợ tạm ứng treo (Aging Advance Report), Báo cáo hiệu quả sử dụng Quỹ tiền mặt.  
* 

## **26\. Integration**

* **Core Accounting & General Ledger (Module 55/57):** Tự động đồng bộ các bút toán Nợ/Có, Quản lý Ngân sách (Cost Center) và hạch toán sổ cái kế toán.  
*   
* **Corporate Online Banking APIs (Vietcombank, Techcombank, MBBank, VietinBank Host-to-Host):** Kết nối API 2 chiều để phát lệnh chuyển khoản tự động và lấy dữ liệu Sao kê Ngân hàng real-time.  
*   
* **Cục Thuế E-Invoice Portal / OCR Engine:** Kết nối API đọc và xác thực hóa đơn điện tử XML chính thống từ Tổng cục Thuế.  
*   
* **HR & Payroll Engine (SOP-HR-001):** Đồng bộ dữ liệu công nợ tạm ứng quá hạn để tự động cấn trừ vào Bảng lương nhân sự.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Chi vượt ngân sách vận hành cơ sở** | High | Low | ERP Auto Budget Check khóa Yêu cầu Chi nếu hết ngân sách khả dụng. | CFO & Kế toán Ngân sách |
| **Chi trùng hóa đơn hoặc chi hóa đơn bất hợp pháp** | Critical | Low | Bắt buộc OCR Scan XML Hóa đơn Thuế; Deduplication Engine quét trùng tự động. | Kế toán Thanh toán & IT |
| **Lạm dụng / Tạm ứng tiền treo nợ kéo dài không hoàn** | Medium | Medium | Khóa tự động tính năng tạm ứng mới nếu quá 7 ngày; Cấn trừ tự động vào Bảng lương. | Kế toán Thanh toán & HR |
| **Gian lận / Thụt két Quỹ tiền mặt tại cơ sở** | High | Low | Khóa cứng hạn mức Petty Cash Ceiling \<= 20M; Kiểm kê quỹ đột xuất; Chi qua Bank cho khoản \> 2 triệu. | Thủ quỹ & Kế toán trưởng |

## **28\. Acceptance Criteria**

* **Given:** Giáo viên A tạo Yêu cầu Tạm ứng 5.000.000 VNĐ để mua đạo cụ sự kiện Trung thu.  
*   
* **When:** Giáo viên A bấm "Submit Request".  
*   
* **Then:** ERP kiểm tra công nợ tạm ứng của Giáo viên A. Nếu Giáo viên A KHÔNG có đơn tạm ứng nào quá hạn 07 ngày và Mã Ngân sách Sự kiện còn đủ tiền, ERP chuyển đơn sang luồng duyệt Hiệu trưởng Cơ sở. Ngay khi Hiệu trưởng duyệt, ERP gửi Alert cho Thủ quỹ xuất tiền mặt và tự động đếm ngược 07 ngày hạn hoàn ứng.  
*   
* **Given:** Kế toán Thanh toán nhận một Hóa đơn điện tử PDF/XML từ NCC dịch vụ internet.  
*   
* **When:** Kế toán tải file XML lên Yêu cầu Thanh toán trên ERP.  
*   
* **Then:** ERP OCR Engine đọc số Hóa đơn 0012345. Hệ thống phát hiện Số Hóa đơn này đã được chi thanh toán tại Cơ sở B vào tháng trước. ERP lập tức khóa màn hình, hiển thị cảnh báo đỏ *"Hóa đơn trùng lặp đã được thanh toán trên Voucher \#PV-2026-08-089"*, đồng thời gửi alert cảnh báo cho Kế toán trưởng.  
* 

## **29\. Test Scenarios**

1. **Happy Path Expense Payment Test:** Tạo Đề nghị Chi trong ngân sách \-\> Scan OCR Hóa đơn Valid \-\> Hiệu trưởng Approve \-\> Kế toán Bank bấm chuyển khoản API \-\> Bank trả về Success \-\> Auto GL Posting & Reconcile thành công.  
2.   
3. **Cash Ceiling Enforcement Test (20 Million Rule):** Cố tình tạo Đề nghị Chi Tiền mặt cho khoản chi 25.000.000 VNĐ \-\> Kiểm tra xem ERP có chặn không cho chọn hình thức "Tiền mặt" và bắt buộc đổi sang "Chuyển khoản Ngân hàng" không.  
4.   
5. **Duplicate Invoice OCR Test:** Tải lên cùng 1 file XML Hóa đơn Điện tử cho 2 Yêu cầu Chi khác nhau \-\> Kiểm tra xem ERP Deduplication Engine có phát cờ đỏ khóa trận giao dịch thứ 2 không.  
6.   
7. **Overdue Advance Salary Deduction Test:** Giả lập 1 đơn tạm ứng quá hạn 07 ngày chưa hoàn ứng \-\> Kiểm tra xem ERP có khóa tính năng tạo đơn tạm ứng mới của nhân viên đó và có đẩy số nợ sang Phân hệ Lương (SOP-HR-001) cấn trừ không.  
8.   
9. **Over-Budget Approval Workflow Test:** Tạo Đề nghị Chi vượt quá Ngân sách khả dụng còn lại của Cơ sở \-\> Kiểm tra xem ERP có tự động chuyển luồng duyệt sang CFO và CEO không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình hạn mức Quỹ tiền mặt cơ sở (Petty Cash Ceiling \<= 20M); Cấu hình hạn mức chi chuyển khoản ngân hàng bắt buộc (\>= 20M); Cấu hình thời hạn hoàn ứng (07 ngày); Cấu hình quy tắc kiểm tra trùng hóa đơn Thuế.  
*   
* **Master Data Migration:** Import danh mục Tài khoản Ngân hàng doanh nghiệp, Sơ đồ Tài khoản Kế toán (Chart of Accounts \- COA); Import danh mục Mã Chi phí (Expense Categories) và Hạn mức Ngân sách năm của từng cơ sở.  
*   
* **Hardware & Integration:** Tích hợp API Host-to-Host với các Ngân hàng Doanh nghiệp lớn (Vietcombank, Techcombank, MBBank); Tích hợp Dịch vụ OCR Scan Hóa đơn Điện tử XML Cục Thuế.  
*   
* **Training & Change Management:** Đào tạo toàn thể CBGVNV quy trình đính kèm hóa đơn và nộp hoàn ứng trên Mobile App; Đào tạo Kế toán quy trình phê duyệt lệnh chi ngân hàng Host-to-Host và xử lý đối soát sao kê tự động.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (12 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  10.   
  11. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  12.   
  13. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  14.   
  15. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  16.   
  17. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  18.   
  19. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  20.   
  21. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  22.   
  23. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  24.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **13 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & ASSET     │ FINANCE & HUMAN CAPITAL     │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│                                │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │                                │                             │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 15

# **SOP-FAC-001 — QUY TRÌNH QUẢN LÝ BẢO TRÌ TRANG THIẾT BỊ LỚP HỌC, KIỂM TRA AN TOÀN PCCC, CƠ SỞ VẬT CHẤT VÀ XỬ LÝ YÊU CẦU SỬA CHỮA (HELPDESK)**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-FAC-001  
*   
* **Tên SOP:** Quy trình Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC, Cơ sở Vật chất và Xử lý Yêu cầu Sửa chữa (Helpdesk / Work Order)  
*   
* **Module ERP:** Asset Management (38), Maintenance (39), Facility Management (40), Classroom Management (41), Helpdesk / Service Request (64), Risk Management (68)  
*   
* **Process Owner:** Trưởng bộ phận Cơ sở vật chất (Facility Manager) / Admin Manager  
*   
* **Department:** Khối Vận hành Cơ sở vật chất & An toàn Học đường, Ban Giám hiệu Cơ sở, Bộ phận Kỹ thuật / Bảo trì  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Vận hành (COO) / CFO  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ công tác quản trị cơ sở vật chất, hạ tầng không gian mầm non và trang thiết bị lớp học: từ việc tiếp nhận và xử lý sự cố hỏng hóc qua kênh Helpdesk Ticket, tự động phân công Lệnh làm việc (Work Order) cho Nhân viên Kỹ thuật/Nhà thầu phụ, lập lịch và thực hiện Bảo trì ngăn ngừa (Preventative Maintenance) định kỳ đối với hệ thống Điều hòa, Máy lọc không khí, Máy lọc nước, Thiết bị PCCC, Đồ chơi vận động ngoài trời, đến quy trình Kiểm tra An toàn An ninh & PCCC hàng tuần/hàng tháng; bảo đảm 100% môi trường học tập an toàn, không có độc tố hay nguy cơ chấn thương cho trẻ mầm non.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trung tâm trải nghiệm thuộc hệ thống.  
*   
* **Phòng ban:** Bộ phận Cơ sở vật chất/Facility, Bộ phận Kỹ thuật/Bảo trì, Ban Giám hiệu Cơ sở, Khối Giáo viên Mầm non, Bộ phận Bảo vệ, Bếp ăn, Xe bus.  
*   
* **Đối tượng:** Toàn bộ công trình xây dựng, Phòng học, Phòng chức năng, Sân chơi ngoài trời/trong nhà, Trang thiết bị điện/điện lạnh, Hệ thống PCCC, Hệ thống Cấp thoát nước/Gas bếp ăn, Thiết bị CNTT/CCTV/Access Control.  
*   
* **Trường hợp không áp dụng:** Sửa chữa lớn mang tính cải tạo kiến trúc/kết cấu hạ tầng có giá trị \> 100.000.000 VNĐ (áp dụng SOP-FAC-005: Quản lý Dự án Đầu tư & Cải tạo Hạ tầng Trường học).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Helpdesk Ticket (Yêu cầu Sửa chữa/Dịch vụ):** Yêu cầu do Giáo viên/Nhân viên tạo trên Mobile App khi phát sinh hỏng hóc hoặc sự cố thiết bị tại lớp học/khu vực chung.  
*   
* **Work Order (Lệnh Làm việc / Sửa chữa):** Chứng từ kỹ thuật do Facility Manager phát hành trên ERP chỉ định Nhân viên Kỹ thuật hoặc Nhà thầu phụ thực hiện sửa chữa, bảo trì đính kèm danh mục vật tư thay thế.  
*   
* **PPM (Preventative Maintenance \- Bảo trì Ngăn ngừa):** Lịch bảo trì được ERP tự động lên kế hoạch định kỳ (Hàng tuần/tháng/quý) nhằm bảo dưỡng thiết bị trước khi xảy ra sự cố hỏng hóc.  
*   
* **Asset Lockout / Tagout (Biển Cảnh báo & Phong tỏa Thiết bị):** Thao tác gắn biển cảnh báo nguy hiểm và phong tỏa khu vực/thiết bị bị hỏng (như đồ chơi vận động nứt gãy, ổ điện hở) để tránh trẻ em tiếp cận.  
*   
* **PCCC (Phòng cháy & Chữa cháy):** Quy trình kiểm tra định kỳ bình chữa cháy, hệ thống báo cháy tự động, bơm chữa cháy, lối thoát hiểm theo quy định pháp luật PCCC mầm non.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tạo Ticket Báo Hỏng Thiết bị Lớp học / Cơ sở | Người phát hiện (GV/Staff) | Hiệu trưởng Cơ sở | Lễ tân / Admin | Facility Team |
| Tiếp nhận Ticket, Phân loại Severity & Phát hành Work Order | Facility Manager | Facility Manager | Kỹ thuật viên | Người gửi Ticket |
| Thực hiện Sửa chữa / Bảo trì & Thay thế Vật tư | Kỹ thuật viên / Contractor | Facility Manager | Thủ kho (Lấy CCDC) | GVCN / BGH |
| Kiểm tra An toàn PCCC & Thiết bị Vận động Định kỳ | Kán bộ An toàn / Kỹ thuật | Hiệu trưởng Cơ sở | PCCC Local Agency | COO / Board |
| Nghiệm thu Sửa chữa, Nghiệm thu Bàn giao & Đóng Ticket | Người gửi Ticket / Admin | Hiệu trưởng Cơ sở | Facility Manager | Kế toán Phí |

*Ghi chú: Việc kiểm tra an toàn PCCC, an toàn hệ thống điện, máy lọc nước uống trực tiếp và tiêu chuẩn an toàn công trình mầm non cần kiểm tra/đối chiếu quy định hiện hành của Bộ Công an (Cục PCCC), Bộ Y tế và Bộ Giáo dục & Đào tạo (TCVN 3907:2011 \- Trường mầm non \- Yêu cầu thiết kế) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Tài sản/Thiết bị (AssetMaster từ SOP-PUR-001), Danh mục Vị trí/Phòng học (LocationMaster), Danh mục Loại sự cố (IncidentCategoryMaster), Ma trận SLA Sửa chữa (FacilitySLAMaster), Lịch Bảo trì Ngăn ngừa (PPMPlanMaster).  
*   
* **Thiết bị \&Tem QR Code:** 100% trang thiết bị, phòng học đã được dán tem QR Code định danh (Asset Tagging).  
*   
* **Dữ liệu Ticket:** Yêu cầu sửa chữa được gửi qua App Mobile hoặc Cổng Helpdesk ERP.  
* 

## **7\. Trigger**

* **Sự cố Đột xuất:** Giáo viên/Nhân viên phát hiện thiết bị hỏng hóc, hở điện, rò rỉ nước, đồ chơi gãy vỡ.  
*   
* **Sự cố Khẩn cấp (Emergency):** Rò rỉ khí gas bếp ăn, Mất điện toàn trường, Chập cháy điện, Báo cháy giả/thật, Rò rỉ hóa chất.  
*   
* **Lịch Định kỳ (Automated Scheduler):** Đến mốc thời gian Bảo trì Ngăn ngừa (PPM) hoặc Lịch Kiểm tra PCCC định kỳ do ERP tự động kích hoạt.  
* 

## **8\. Quy trình AS-IS**

* Giáo viên thấy điều hòa hỏng hoặc cửa sổ bị kẹt liền nhắn tin Zalo cho Bảo vệ hoặc gọi điện cho Admin cơ sở.  
*   
* Admin cơ sở ghi lại vào sổ tay, khi nào nhân viên kỹ thuật rảnh thì sang sửa.  
*   
* Kỹ thuật viên đi sửa nhưng không có biên bản kiểm tra, tự mua linh kiện ngoài chợ rồi đưa hóa đơn lẻ về cho Kế toán thanh toán.  
*   
* Lịch bảo trì máy lọc nước, bình chữa cháy ghi dán bằng tờ giấy decal lên thân máy, dễ bị bong tróc/mờ chữ.  
*   
* **Hệ quả:** Sự cố nguy hiểm (hở điện, bình lọc nước bẩn, đồ chơi gãy sắc nhọn) bị bỏ quên nhiều ngày gây tai nạn cho trẻ; không kiểm soát được chi phí sửa chữa; không có dữ liệu đánh giá tuổi thọ tài sản; vi phạm quy định PCCC khi cơ quan công an kiểm tra.  
* 

## **9\. Pain Points / Risk**

* **Critical Child Safety Risk:** Trẻ mầm non bị điện giật, kẹt tay vào cửa, ngã chấn thương do đồ chơi vận động hư hỏng không được phong tỏa kịp thời.  
*   
* **Lack of SLA & Accountability:** Ticket báo hỏng bị trôi, kỹ thuật viên đổ lỗi cho nhau do không có hệ thống theo dõi trạng thái Work Order.  
*   
* **Compliance & Fire Hazard Risk:** Hệ thống PCCC (bình cứu hỏa hết sạc, lối thoát hiểm bị chất đồ) không được kiểm tra định kỳ, nguy cơ bị xử phạt hành chính hoặc đình chỉ hoạt động.  
*   
* **Uncontrolled Repair Cost:** Kỹ thuật viên khai khống hỏng hóc để thay thế linh kiện mới, không đối soát với lịch sử bảo hành của nhà cung cấp.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận Helpdesk Ticket & Khởi tạo Work Order (Ticket Ingestion & Work Order Creation)**

* **Step 01:**  
* 

  * **Actor:** Người phát hiện (Giáo viên / Admin / Bảo vệ).  
  *   
  * **Action:** Mở Mobile App, quét mã QR Code dán trên thiết bị/phòng học hỏng hóc. App tự động nhận diện Mã Tài sản & Vị trí. Người dùng chọn loại sự cố, mức độ khẩn cấp, chụp 01 ảnh thực tế hỏng hóc và bấm "Gửi Yêu cầu Sửa chữa".  
  *   
  * **ERP Function:** QR Asset Scan & Helpdesk Ticket Creation.  
  *   
  * **Input:** Mã QR Tài sản, Loại sự cố, Ảnh chụp hỏng hóc, Cấp độ Severity (1-Thấp, 2-Trung bình, 3-Khẩn cấp, 4-Cực kỳ nguy hiểm).  
  *   
  * **Output:** Ticket Sửa chữa Mới (New Service Ticket).  
  *   
  * **Business Rule:** BR-FAC-001: Nếu chọn Cấp độ 4 (Nguy hiểm chí mạng: Rò rỉ điện, rò gas, nguy cơ sập/gãy), ERP tự động chuyển trạng thái Emergency Alert, phát chuông báo động trên App của Facility Manager, Hiệu trưởng và Trưởng Bảo vệ trong 60 giây.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Ticket Created / Pending Triage.  
  *   
  * **SLA:** \<= 2 phút khởi tạo.  
  *   
  * **Notification:** Push Notification gửi Facility Team.  
  *   
* **Step 02:**  
* 

  * **Actor:** Facility Manager.  
  *   
  * **Action:** Mở màn hình Helpdesk Management, kiểm tra chi tiết Ticket, xác nhận tình trạng bảo hành của tài sản. Chuyển Ticket thành Lệnh Làm việc (Work Order), phân công Kỹ thuật viên (hoặc Chỉ định Nhà thầu ngoài) đính kèm SLA xử lý.  
  *   
  * **ERP Function:** Ticket Triage & Work Order Auto-Assignment.  
  *   
  * **Input:** New Service Ticket \+ Danh sách Kỹ thuật viên khả dụng.  
  *   
  * **Output:** Lệnh Làm việc được phát hành (Work Order Assigned).  
  *   
  * **Business Rule:** BR-FAC-002: Sự cố Cấp độ 4 phải bắt buộc cử Kỹ thuật viên có mặt tại hiện trường trong vòng **15 phút** và thực hiện thao tác Phong tỏa An toàn (Lockout / Tagout) trước khi sửa chữa.  
  *   
  * **Status Before:** Ticket Created.  
  *   
  * **Status After:** Work Order In Progress.  
  *   
  * **SLA:** Triage Ticket trong \<= 15 phút (khẩn cấp) hoặc \<= 2 giờ (thông thường).  
  *   
  * **Notification:** Alert gửi Kỹ thuật viên được phân công & Thông báo tiến độ cho Người gửi Ticket.  
  * 

### **Giai đoạn 2: Thực hiện Sửa chữa & Quản lý Vật tư Thay thế (Execution & Spare Part Usage)**

* **Step 03:**  
* 

  * **Actor:** Kỹ thuật viên / Contractor.  
  *   
  * **Action:** Kỹ thuật viên đến hiện trường, kiểm tra hỏng hóc. Nếu cần vật tư/linh kiện thay thế (như bóng đèn, van nước, tụ điện điều hòa), Kỹ thuật viên mở App chọn "Yêu cầu Xuất Kho Vật tư" (Spare Part Requisition) gắn theo Mã Work Order.  
  *   
  * **ERP Function:** Work Order Spare Part Issuance & Inventory Sync.  
  *   
  * **Input:** Mã Work Order, Mã Vật tư thay thế, Số lượng.  
  *   
  * **Output:** Phiếu Xuất Kho Vật tư Bảo trì (Maintenance Issue Note) \-\> Đồng bộ giảm tồn kho (SOP-PUR-001).  
  *   
  * **Business Rule:** BR-FAC-003: Vật tư thay thế có giá trị \> 2.000.000 VNĐ bắt buộc phải có xác nhận Phê duyệt của Hiệu trưởng Cơ sở trên ERP trước khi Thủ kho xuất hàng.  
  *   
  * **Status Before:** Work Order In Progress.  
  *   
  * **Status After:** Parts Issued / Under Repair.  
  *   
  * **SLA:** Xuất kho trong 15 phút.  
  *   
  * **Notification:** Alert gửi Thủ kho xuất vật tư.  
  *   
* **Step 04:**  
* 

  * **Actor:** Kỹ thuật viên / Contractor.  
  *   
  * **Action:** Hoàn tất sửa chữa, dọn dẹp vệ sinh khu vực. Kỹ thuật viên dùng Mobile App chụp ảnh thiết bị sau khi sửa (After Repair Photo), quay video vận hành thử và bấm "Hoàn thành Sửa chữa" (Mark Work Order Completed).  
  *   
  * **ERP Function:** Work Order Completion & Proof Capture.  
  *   
  * **Input:** Ảnh sau sửa chữa, Mô tả nguyên nhân hỏng hóc, Số giờ làm việc thực tế.  
  *   
  * **Output:** Work Order hoàn thành (Work Order Pending Verification).  
  *   
  * **Status Before:** Under Repair.  
  *   
  * **Status After:** Pending User Verification.  
  *   
  * **SLA:** Theo SLA của từng loại Ticket (Khẩn cấp: \<= 2 giờ; Thông thường: \<= 24 giờ).  
  *   
  * **Notification:** Alert mời Người gửi Ticket / Admin Cơ sở nghiệm thu.  
  * 

### **Giai đoạn 3: Nghiệm thu, Đánh giá Chất lượng & Đóng Ticket (Verification & Closure)**

* **Step 05:**  
* 

  * **Actor:** Người gửi Ticket (Giáo viên / Admin Cơ sở).  
  *   
  * **Action:** Kiểm tra thiết bị thực tế tại lớp/khu vực. Nếu đạt yêu cầu, mở App bấm "Xác nhận Nghiệm thu", đánh giá chất lượng phục vụ (1-5 Sao) và bấm "Đóng Ticket" (Close Ticket).  
  *   
  * **ERP Function:** Service Verification & CSAT Rating.  
  *   
  * **Input:** Xác nhận nghiệm thu \+ Điểm CSAT Rating (1-5 sao) \+ Nhận xét.  
  *   
  * **Output:** Ticket đóng hoàn tất (Ticket Closed).  
  *   
  * **Business Rule:** BR-FAC-004: Nếu sau 48 giờ kể từ khi Kỹ thuật viên báo xong mà Người gửi Ticket không bấm nghiệm thu hoặc phản hồi, ERP tự động chuyển Ticket sang trạng thái Auto-Closed.  
  *   
  * **Status Before:** Pending User Verification.  
  *   
  * **Status After:** Closed.  
  *   
  * **SLA:** Nghiệm thu trong 24 giờ.  
  *   
  * **Notification:** Báo cáo hoàn thành gửi Facility Manager.  
  * 

### **Giai đoạn 4: Bảo trì Ngăn ngừa (PPM) & Kiểm tra An toàn PCCC / Học đường (PPM & Safety Inspection)**

* **Step 06 (Lịch Bảo trì Ngăn ngừa PPM):**  
* 

  * **Actor:** ERP System (PPM Scheduler Engine) & Kỹ thuật viên.  
  *   
  * **Action:** Định kỳ theo lịch cài đặt (Máy lạnh: 3 tháng/lần; Máy lọc nước: 1 tháng/lần; Đồ chơi ngoài trời: 1 tuần/lần), ERP tự động phát hành Work Order Bảo trì Ngăn ngừa (PPM Work Order). Kỹ thuật viên thực hiện bảo dưỡng theo Checklist chuẩn trên App.  
  *   
  * **ERP Function:** Automated PPM Scheduling & Digital Checklist.  
  *   
  * **Input:** Lịch PPM Master, Checklist kiểm tra theo loại thiết bị.  
  *   
  * **Output:** Nhật ký Bảo trì Ngăn ngừa Điện tử (Digital PPM Log).  
  *   
  * **Business Rule:** BR-FAC-005: Mọi thiết bị Máy lọc nước uống trực tiếp cho trẻ mầm non bắt buộc phải thực hiện xét nghiệm chất lượng nước định kỳ 06 tháng/lần và đính kèm Giấy Kết quả Xét nghiệm Y tế lên ERP.  
  *   
  * **Status Before:** PPM Scheduled.  
  *   
  * **Status After:** PPM Executed & Verified.  
  *   
  * **SLA:** Đúng ngày theo Lịch PPM.  
  *   
  * **Notification:** Notification gửi Facility Manager & BGH.  
  *   
* **Step 07 (Kiểm tra An toàn PCCC & Hạ tầng):**  
* 

  * **Actor:** Cán bộ An toàn / Trưởng Bảo vệ & Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Định kỳ hàng tuần/tháng, Cán bộ An toàn dùng Tablet mở PCCC & Safety Inspection Audit, đi quét mã QR tại các Điểm Kiểm tra PCCC (Bình chữa cháy, Cuộn vòi, Bơm PCCC, Lối thoát hiểm, Tủ điện chính). Thực hiện kiểm tra áp suất, niêm phong, chướng ngại vật và bấm "Submit Báo cáo An toàn".  
  *   
  * **ERP Function:** PCCC & Safety Audit Inspection Tool.  
  *   
  * **Input:** Quét QR Điểm PCCC, Trạng thái áp suất/vận hành, Ảnh chụp thực tế.  
  *   
  * **Output:** Biên bản Kiểm tra PCCC & An toàn Học đường Điện tử (Digital Safety Audit Report).  
  *   
  * **Business Rule:** BR-FAC-006: Mọi vi phạm PCCC (Bình cứu hỏa tụt áp, lối thoát hiểm bị khóa/chèn đồ) phải tự động sinh ra một Emergency Work Order yêu cầu xử lý triệt để trong vòng **02 giờ**. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
  *   
  * **Status Before:** Pending Inspection.  
  *   
  * **Status After:** Inspection Passed / Corrective Action Issued.  
  *   
  * **SLA:** Định kỳ hàng tuần (Thứ Sáu).  
  *   
  * **Notification:** Báo cáo an toàn PCCC tự động gửi Hiệu trưởng, COO và Lưu hồ sơ Pháp lý PCCC.  
  * 

## **11\. Workflow**

\[LUỒNG 1: BÁO HỎNG ĐỘT XUẤT (HELPDESK)\]       \[LUỒNG 2: BẢO TRÌ NGĂN NGỪA (PPM & PCCC)\]  
                 │                                                │  
                 ▼                                                ▼  
\[Người Dùng Quét QR Thiết Bị ──► Tạo Ticket\]    \[ERP Auto Scheduler Engine: Sinh Lịch PPM / PCCC Audit\]  
                 │                                                │  
                 ▼                                                ▼  
\[ERP Triệt Triage & Phân Cấp Severity 1-4\]       \[Cán Bộ An Toàn Đi Quét QR Điểm PCCC / Thiết Bị\]  
                 │                                                │  
                 ◇ Severity Level 4 (Emergency)?                  ◇ Phát hiện Lỗi PCCC / Hỏng Hóc?  
                 ├─ YES ──► \[KÍCH HOẠT BÁO ĐỘNG\]                  ├─ YES ──► \[Tự Động Sinh Emergency Work Order\]  
                 └─ NO  ──┐                                       └─ NO  ──┐  
                          │                                                │  
                          ▼                                                ▼  
         \[Facility Mgr Phát Hành Work Order\]                     \[Lưu Digital PPM Log\]  
                          │                                                │  
                          ▼                                                │  
         \[Kỹ Thuật Viên Nhận Work Order Trên App\]                          │  
                          │                                                │  
                          ◇ Cần Xuất Vật Tư/Linh Kiện?                     │  
                          ├─ YES ──► \[Tạo Spare Part Requisition ──► Kho Xuất\]  
                          └─ NO  ──┐                                       │  
                                   │                                       │  
                                   ▼                                       │  
         \[Kỹ Thuật Viên Sửa Chữa ──► Chụp Ảnh Bằng Chứng ──► Bấm Complete\] │  
                                   │                                       │  
                                   ▼                                       │  
         \[Người Gửi Ticket Kiểm Tra ──► Đánh Giá CSAT 1-5 Sao ──► Close Ticket\]  
                                   │                                       │  
                                   └───────────────────┬───────────────────┘  
                                                       │  
                                                       ▼  
                                                  \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-FAC-001 (Emergency Triage):** Sự cố thuộc danh mục Cực kỳ Nguy hiểm (Rò rỉ điện, rò khí gas, bình lọc nước hỏng, thiết bị PCCC hỏng, đồ chơi vận động gãy sắc nhọn) bắt buộc phải gắn cờ Severity Level 4. Hệ thống ERP tự động phát chuông báo động khẩn cấp tới điện thoại Facility Manager và BGH trong vòng 60 giây.  
*   
* **BR-FAC-002 (Lockout / Tagout Mandate):** Đối với các khu vực hoặc thiết bị hư hỏng có nguy cơ gây tai nạn cho học sinh mầm non, Kỹ thuật viên bắt buộc phải thực hiện thao tác **Phong tỏa & Cảnh báo (Lockout/Tagout)** trong vòng **15 phút** kể từ khi nhận Ticket. Chụp ảnh rào chắn/biển cảnh báo tải lên ERP mới được tính là tuân thủ SLA bước đầu.  
*   
* **BR-FAC-003 (Spare Part Threshold):** Việc xuất kho vật tư/phụ tùng thay thế có giá trị vượt quá **2.000.000 VNĐ/lần** bắt buộc phải có chữ ký phê duyệt điện tử của Hiệu trưởng Cơ sở trên ERP.  
*   
* **BR-FAC-004 (Warranty First Rule):** Khi khởi tạo Work Order cho tài sản còn trong thời hạn bảo hành (Warranty Active \= TRUE), ERP tự động chặn không cho xuất kho phụ tùng mua mới và bắt buộc hiển thị Thông tin Nhà cung cấp bảo hành để Chuyên viên Mua sắm/Kỹ thuật liên hệ bảo hành miễn phí.  
*   
* **BR-FAC-005 (PCCC Compliance Mandate):** Báo cáo kiểm tra PCCC định kỳ bắt buộc phải có đầy đủ dữ liệu quét mã QR Code tại 100% các Điểm Kiểm tra PCCC quy định. Hệ thống không chấp nhận báo cáo nếu thiếu bất kỳ điểm quét QR nào trên thực địa. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
* 

## **13\. Exception Cases**

* **Kỹ thuật viên không sửa được sự cố nội bộ (Cần thuê Nhà thầu ngoài \- Contractor):**  
* 

  * *Xử lý:* Kỹ thuật viên chuyển trạng thái Work Order sang Outsourced Repair Required. ERP tự động khởi tạo Yêu cầu Mua sắm Dịch vụ (PR Sửa chữa Ngoại viện) chuyển sang Phân hệ Mua sắm (SOP-PUR-001) để chọn Nhà thầu sửa chữa.  
  *   
* **Thiết bị hư hỏng quá nặng, chi phí sửa chữa \> 50% Giá trị còn lại (Uneconomical Repair):**  
* 

  * *Xử lý:* Facility Manager bấm "Đề xuất Thanh lý / Thay mới" (Disposal / Replacement Recommendation). ERP tự động khởi tạo luồng Thanh lý Tài sản (Asset Disposal Workflow) trình CFO duyệt và tự động sinh PR mua sắm tài sản mới thay thế.  
  *   
* **Mất kết nối Internet/4G khi Kỹ thuật viên đang đi kiểm tra PCCC tại tầng hầm/kho:**  
* 

  * *Xử lý:* App Mobile Facility chuyển sang chế độ Offline Inspection Mode. Kỹ thuật viên vẫn quét mã QR Code và tích chọn Checklist bình thường. Ngay khi thiết bị kết nối Wifi/4G trở lại, dữ liệu tự động Sync về Cloud ERP đính kèm Timestamp thực của thời điểm quét.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Work Order Sửa chữa Thông thường (\<= 2.000.000 VNĐ) | Facility Manager | N/A | N/A |
| Phê duyệt Xuất Vật tư / Thuê Ngoại viện (2.000.000 \- 10.000.000 VNĐ) | Facility Manager | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Sửa chữa / Thay thế Thiết bị Lớn (\> 10.000.000 VNĐ) | Hiệu trưởng Cơ sở | Trưởng phòng Mua sắm | CFO / COO |
| Phê duyệt Đề xuất Thanh lý & Mua Mới Tài sản Hỏng | Facility Manager | Kế toán trưởng | CFO |

## **15\. Status Lifecycle**

* **Helpdesk Ticket Status:** New \-\> Assigned (Work Order Created) \-\> In Progress \-\> Pending Parts \-\> Resolved \-\> User Verified \-\> Closed (hoặc Auto-Closed).  
*   
* **Work Order Status:** Draft \-\> Dispatched \-\> Accepted by Tech \-\> Under Repair \-\> Completed \-\> Approved.  
*   
* **PPM Plan Status:** Scheduled \-\> Work Order Triggered \-\> Executed \-\> Audited \-\> Closed.  
* 

## **16\. Data Model**

* **Primary Entity:** FacilityTicket  
* 

  * TicketID (PK, String, Unique)  
  *   
  * CampusID (FK, String), LocationID (FK, String), AssetID (FK, String)  
  *   
  * ReporterID (FK), Category (Enum), SeverityLevel (Enum: Level1, Level2, Level3, Level4)  
  *   
  * Description (Text), BeforePhotoURL (String)  
  *   
  * TicketStatus (Enum: New, Assigned, In\_Progress, Resolved, Closed)  
  *   
* **Related Entities:**  
* 

  * WorkOrder: WorkOrderID (PK), TicketID (FK), AssigneeType (Enum: InternalTech, Contractor), AssigneeID (FK), Priority (Enum), EstimatedCost (Decimal), ActualCost (Decimal), AfterPhotoURL (String), WorkOrderStatus (Enum).  
  *   
  * MaintenanceSparePart: PartIssueID (PK), WorkOrderID (FK), ItemID (FK), Quantity (Decimal), UnitPrice (Decimal), IssuedBy (FK).  
  *   
  * PPMPlan: PPMPlanID (PK), AssetID (FK), Frequency (Enum: Weekly, Monthly, Quarterly, Yearly), LastExecutedDate (Date), NextDueDate (Date), ChecklistJSON (JSON).  
  *   
  * PCCCInspectionLog: InspectionID (PK), CampusID (FK), PointQRCode (String), InspectorID (FK), PressureStatus (Boolean), ObstacleStatus (Boolean), PhotoURL (String), Timestamp (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-FAC-001: Phiếu Yêu cầu Sửa chữa & Báo Hỏng Cơ sở Vật chất (Digital Helpdesk Ticket).  
*   
* FRM-FAC-002: Lệnh Làm việc / Sửa chữa Kỹ thuật (Digital Work Order Form).  
*   
* FRM-FAC-003: Sổ Nhật ký Bảo trì Ngăn ngừa PPM (Preventative Maintenance Log).  
*   
* FRM-FAC-004: Biên bản Kiểm tra An toàn PCCC & Hạ tầng Học đường Điện tử (PCCC & Safety Inspection Audit Form).  
*   
* FRM-FAC-005: Phiếu Phong tỏa An toàn Thiết bị Hỏng (Lockout / Tagout Notice).  
* 

## **18\. ERP Functional Requirements**

* **FR-FAC-001 (MUST):** Tích hợp QR Code Asset Scanning trên Mobile App cho phép quét mã QR trên thiết bị/phòng học để tự động nhận diện thông tin và tạo Ticket báo hỏng trong 30 giây.  
*   
* **FR-FAC-002 (MUST):** Tích hợp Emergency Severity Escalation Gate: Tự động phát còi báo động khẩn cấp đối với sự cố Severity Level 4 tới Facility Manager, BGH và Bảo vệ.  
*   
* **FR-FAC-003 (MUST):** Phân hệ Automated PPM Scheduler Engine: Tự động kích hoạt Work Order bảo trì ngăn ngừa định kỳ cho hệ thống máy lạnh, máy lọc nước, hệ thống PCCC theo lịch cấu hình.  
*   
* **FR-FAC-004 (MUST):** Tích hợp Warranty Auto-Check: Tự động cảnh báo và hiển thị thông tin bảo hành nếu tài sản hỏng hóc còn nằm trong hạn bảo hành của Nhà cung cấp.  
*   
* **FR-FAC-005 (SHOULD):** Cung cấp công cụ đánh giá hài lòng CSAT 1-5 sao dành cho Giáo viên/Người gửi Ticket sau khi sự cố được kỹ thuật viên xử lý xong.  
* 

## **19\. Automation Opportunities**

* **AUTO-FAC-001 (RULE ENGINE):** Tự động phân công Work Order cho Kỹ thuật viên trực ca dựa trên khu vực cơ sở và loại chuyên môn kỹ thuật (Điện/Nước/Đồ gỗ/CNTT).  
*   
* **AUTO-FAC-002 (INTEGRATION):** Tự động trừ lùi tồn kho linh kiện thay thế (SOP-PUR-001) ngay khi Kỹ thuật viên xuất vật tư theo Work Order.  
*   
* **AUTO-FAC-003 (WORKFLOW):** Tự động khởi tạo Yêu cầu Mua sắm (PR) nếu cần thuê nhà thầu ngoài hoặc khi vật tư trong kho xuống dưới ngưỡng Tồn kho Tối thiểu.  
*   
* **AUTO-FAC-004 (NOTIFICATION):** Tự động đếm ngược SLA xử lý và tự động phát alert leo cấp (Escalate) cho Hiệu trưởng nếu Work Order bị chậm trễ quá hạn SLA.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo Ticket Báo Hỏng Mới | Facility Team | Mobile App Push | Immediate khi ticket created |
| CẢNH BÁO SỰ CỐ KHẨN CẤP (Level 4 Emergency) | Facility Mgr, BGH, Security | Loud Alarm Sound \+ App Push | Immediate (\<= 60 giây) |
| Thông báo Phân công Work Order Sửa chữa | Kỹ thuật viên / Contractor | Mobile App Push | Immediate khi Work Order assigned |
| Cảnh báo Quá Hạn SLA Sửa chữa (SLA Breach) | Facility Mgr & Hiệu trưởng | ERP High Alert \+ SMS | At SLA Breach Timestamp |
| Nhắc Lịch Kiểm tra PCCC / PPM Định kỳ | Cán bộ An toàn / Kỹ thuật | Mobile App Push | 08:00 AM ngày bắt đầu PPM |
| Mời Nghiệm thu & Đánh giá CSAT Sửa chữa | Người gửi Ticket | Mobile App Push | Immediate khi Tech mark complete |

## **21\. Permission Matrix (RBAC)**

| Role | View Ticket | Create Ticket | Assign Work Order | Execute Work Order | Issue Spare Part | Approve Expense | Conduct PCCC Audit |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Giáo viên / Admin | Own / Class | Full | No | No | No | No | No |
| Kỹ thuật viên / Tech | Assigned | Quick Ticket | No | Full | Request Only | No | Perform PPM |
| Facility Manager | Full Campus | Full | Full | Full | Approve | In Limit | Full Campus |
| Hiệu trưởng Cơ sở | Full Campus | Full | Read Only | View Only | View Only | Full | Full |
| Thủ kho Cơ sở | Campus Inventory | No | No | Read Only | Full (Dispatch) | No | No |
| COO / CFO | Full Enterprise | Read Only | Full (Override) | View Only | Read Only | Full Enterprise | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người khởi tạo Ticket, thời gian tạo, cấp độ Severity chọn ban đầu và hình ảnh hỏng hóc gốc.  
*   
* Lịch sử phân công Work Order: Người phân công, Kỹ thuật viên nhận, SLA cam kết, các lần chuyển giao công việc.  
*   
* Nhật ký xuất vật tư thay thế: Mã Work Order liên kết, danh mục phụ tùng, số lượng, giá trị tiền.  
*   
* Mọi thao tác thay đổi trạng thái Ticket/Work Order (Đặc biệt là thao tác hủy hoặc chuyển sang Auto-Closed).  
*   
* Nhật ký quét mã QR Code kiểm tra PCCC: Timestamp Server, Tọa độ GPS/Vị trí điểm kiểm tra, Ảnh chụp thực tế.  
* 

## **23\. Internal Controls**

* **Mandatory Lockout/Tagout Control:** Bắt buộc đăng tải ảnh chụp rào chắn/biển cảnh báo nguy hiểm trong 15 phút đối với các sự cố Severity Level 4\.  
*   
* **Dual Proof Verification:** Work Order chỉ được công nhận hoàn thành khi có đủ 2 bằng chứng: Ảnh chụp thiết bị sau sửa chữa của Kỹ thuật viên \+ Xác nhận nghiệm thu hài lòng của Giáo viên/Người báo hỏng.  
*   
* **Warranty Pre-Check Control:** Hệ thống tự động chặn xuất kho mua mới phụ tùng nếu thiết bị hỏng vẫn đang trong thời hạn bảo hành chính hãng.  
*   
* **PCCC 100% Scan Requirement:** Khóa không cho submit Báo cáo An toàn PCCC nếu thiếu dữ liệu quét mã QR Code tại bất kỳ điểm PCCC cố định nào.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Xử lý Sự cố Khẩn cấp (Severity Level 4\)** | Thời gian từ khi có Ticket đến khi có mặt phong tỏa | **\<= 15 phút** | Facility Manager |
| **SLA Hoàn thành Sửa chữa Thông thường** | Thời gian từ khi phát PO/WO đến khi sửa chữa xong | **\<= 24 giờ** | Kỹ thuật viên |
| **Tỷ lệ Tuân thủ Lịch Bảo trì Ngăn ngừa (PPM Rate)** | (Số thiết bị bảo trì đúng lịch PPM / Tổng thiết bị) \* 100 | **\>= 98%** | Facility Manager |
| **Tỷ lệ Tuân thủ Kiểm tra PCCC (PCCC Audit Rate)** | (Số điểm PCCC được quét kiểm tra đúng hạn / Tổng điểm) \* 100 | **100% (Zero Error)** | Cán bộ An toàn & BGH |
| **Chỉ số Hài lòng Sửa chữa (CSAT Rating)** | Tổng điểm đánh giá CSAT / Tổng số lượt đánh giá | **\>= 4.5 / 5.0 Sao** | Facility Team |

## **25\. Dashboard / Report**

* **Facility Helpdesk Live Monitor (Facility Manager):** Màn hình bản đồ vị trí sự cố real-time, Số lượng Ticket theo trạng thái, Đồng hồ đếm ngược SLA các Work Order khẩn cấp, Báo cáo CSAT kỹ thuật viên.  
*   
* **Safety & PCCC Governance Dashboard (Hiệu trưởng & COO):** Báo cáo tình trạng an toàn hạ tầng học đường, Nhật ký kiểm tra PCCC toàn cơ sở, Danh sách thiết bị hết hạn bảo trì/kiểm định.  
*   
* **Asset Lifecycle & Repair Cost Analytics (CFO & Board):** Báo cáo tổng chi phí sửa chữa/bảo trì theo nhóm tài sản, Báo cáo phân tích tài sản hỏng hóc lặp lại nhiều lần (Repeat Failure Assets), Đề xuất kế hoạch thay thế tài sản năm mới.  
* 

## **26\. Integration**

* **Asset & Inventory Management (SOP-PUR-001):** Nhận dữ liệu Master Tài sản, trạng thái bảo hành và tự động xuất kho linh kiện thay thế.  
*   
* **HR & Attendance Engine (SOP-HR-001):** Đồng bộ lịch trực ca của Kỹ thuật viên để phân công Work Order tự động.  
*   
* **CCTV & Access Control / IoT Sensors:** Kết nối cảm biến báo khói/báo rò gas IoT để tự động kích hoạt Emergency Ticket trên ERP.  
*   
* **Mobile App (Staff App / Teacher App):** Cho phép quét mã QR Code tạo Ticket, theo dõi tiến độ sửa chữa và đánh giá CSAT nghiệm thu.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Trẻ mầm non bị tai nạn do thiết bị hỏng không rào chắn** | Critical | Low | Bắt buộc Lockout/Tagout trong 15 phút đối với sự cố Severity Level 4\. | Facility Mgr & BGH |
| **Cháy nổ do hệ thống PCCC hỏng không được kiểm tra** | Critical | Low | PPM Scheduler đếm ngược lịch kiểm tra PCCC; Bắt buộc quét mã QR 100% điểm PCCC. | Cán bộ An toàn & COO |
| **Khai khống chi phí sửa chữa / Đổi phụ tùng cũ** | High | Low | Khóa xuất vật tư nếu còn bảo hành; Yêu cầu chụp ảnh trước & sau sửa; Duyệt 2 cấp. | Kế toán trưởng & Facility Mgr |
| **Sự cố kéo dài gây gián đoạn hoạt động dạy học** | Medium | Medium | Cảnh báo quá hạn SLA tự động leo cấp (Escalate) cho Hiệu trưởng Cơ sở. | Facility Manager |

## **28\. Acceptance Criteria**

* **Given:** Giáo viên phát hiện ổ điện tại Lớp Mẫu giáo A2 bị hở phát ra tia lửa điện.  
*   
* **When:** Giáo viên quét mã QR trên ổ điện, chọn loại sự cố Electrical Hazard và chọn Cấp độ Severity Level 4 (Emergency).  
*   
* **Then:** ERP tự động kích hoạt Còi Báo động Khẩn cấp trên điện thoại của Facility Manager và Trưởng Bảo vệ. Kỹ thuật viên nhận Work Order khẩn, có mặt tại Lớp A2 trong vòng 10 phút, thực hiện ngắt cầu dao, dán biển phong tỏa cảnh báo DO NOT USE và chụp ảnh tải lên ERP để xác nhận tuân thủ SLA phong tỏa.  
*   
* **Given:** Đến ngày 01 hàng tháng là lịch Bảo trì Ngăn ngừa (PPM) hệ thống Máy lọc nước uống cho toàn bộ các lớp học.  
*   
* **When:** Đồng hồ hệ thống chuyển sang 08:00 AM ngày 01\.  
*   
* **Then:** ERP PPM Scheduler Engine tự động phát hành 20 Work Order Bảo trì Máy lọc nước cho Kỹ thuật viên phụ trách, đính kèm Checklist kiểm tra (Thay lõi lọc, sát khuẩn vòi, kiểm tra chỉ số TDS) và yêu cầu Kỹ thuật viên phải quét mã QR trên từng máy lọc nước để hoàn tất bảo trì.  
* 

## **29\. Test Scenarios**

1. **Happy Path Helpdesk Flow Test:** Quét QR báo hỏng \-\> Triệt Triage Level 2 \-\> Phát hành Work Order \-\> Kỹ thuật viên sửa & chụp ảnh sau sửa \-\> Giáo viên nghiệm thu bấm 5 Sao \-\> Ticket Closed.  
2.   
3. **Emergency Level 4 Escalation Test:** Tạo Ticket báo hỏng rò rỉ khí gas bếp ăn (Level 4\) \-\> Kiểm tra xem ERP có phát còi báo động khẩn cấp tới App của Facility Mgr, BGH và Bảo vệ trong 60 giây không.  
4.   
5. **Warranty Lockout Test:** Cố tình chọn xuất phụ tùng mua mới cho một điều hòa hỏng đang còn trong thời hạn bảo hành \-\> Kiểm tra xem ERP có chặn không cho xuất kho và hiển thị thông tin NCC bảo hành không.  
6.   
7. **PCCC QR Audit Incomplete Test:** Cán bộ an toàn thực hiện kiểm tra PCCC nhưng cố tình BỎ QUA 02 điểm quét QR tại cầu thang thoát hiểm \-\> Kiểm tra xem ERP có chặn không cho submit Báo cáo An toàn PCCC không.  
8.   
9. **Offline PCCC Audit Sync Test:** Tắt kết nối 4G/Wifi trên Tablet \-\> Thực hiện kiểm tra PCCC quét mã QR tại tầng hầm \-\> Bật lại mạng \-\> Kiểm tra xem dữ liệu audit có tự động Sync về Cloud ERP chuẩn xác không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận SLA sửa chữa theo cấp độ Severity (Level 1-4); Cấu hình lịch bảo trì ngăn ngừa PPM cho từng nhóm tài sản; Cấu hình quy tắc cảnh báo PCCC và phân quyền RBAC.  
*   
* **Master Data Migration:** Import danh mục thiết bị, phòng học kèm mã QR Code định danh (Asset Master); Import danh mục điểm kiểm tra PCCC chuẩn hóa theo sơ đồ PCCC của từng cơ sở.  
*   
* **Hardware & Integration:** In và dán tem QR Code chịu lực/chống nước cho 100% tài sản, máy móc, phòng học và bình PCCC; Trang bị Tablet màn hình lớn cho Đội Kỹ thuật & An toàn Cơ sở.  
*   
* **Training & Change Management:** Đào tạo toàn bộ Giáo viên/Nhân viên thao tác quét QR báo hỏng trong 30 giây; Đào tạo Đội Kỹ thuật quy trình thực hiện Work Order, chụp ảnh bằng chứng và tuân thủ quy định Lockout/Tagout an toàn mầm non.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (13 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  10.   
  11. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  12.   
  13. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  14.   
  15. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  16.   
  17. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  18.   
  19. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  20.   
  21. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  22.   
  23. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  24.   
  25. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  26.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **12 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ FINANCE & HUMAN CAPITAL     │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│                                │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │                             │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 16

# **SOP-SEC-001 — QUY TRÌNH QUẢN LÝ PHÂN QUYỀN NGƯỜI DÙNG (RBAC), BẢO MẬT DỮ LIỆU CÁ NHÂN TRẺ EM (CHILD DATA PROTECTION) VÀ GIÁM SÁT NHẬT KÝ HỆ THỐNG (AUDIT LOG)**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-SEC-001  
*   
* **Tên SOP:** Quy trình Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em (Child Data Protection) và Giám sát Nhật ký Hệ thống (Audit Log)  
*   
* **Module ERP:** User / Role / Permission Management (72), Audit Log (73), System Configuration (75), Child Safeguarding (26), Compliance Management (67), Multi-campus Management (71)  
*   
* **Process Owner:** Trưởng phòng An toàn Thông tin (CISO) / Giám đốc IT (IT Director)  
*   
* **Department:** Khối Công nghệ Thông tin & Security, Phòng Pháp chế & Tuân thủ, Ban BGH  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Điều hành (CEO) / Giám đốc Công nghệ (CTO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ cơ chế kiểm soát an ninh thông tin, cấp phát và thu hồi tài khoản/quyền truy cập hệ thống ERP (Role-Based Access Control \- RBAC) theo nguyên tắc Đặc quyền Tối thiểu (Principle of Least Privilege); thiết lập Khung Bảo vệ Dữ liệu Cá nhân Trẻ em và Phụ huynh theo quy định pháp luật; cơ chế mã hóa và ẩn dữ liệu nhạy cảm (Data Masking/Anonymization); quản lý Cam kết Đồng ý Xử lý Dữ liệu của Phụ huynh (Parental Data Consent); và vận hành hệ thống Ghi nhật ký Giám sát Unalterable Audit Log không thể chỉnh sửa để phát hiện, ngăn chặn rò rỉ dữ liệu hoặc gian lận nội bộ.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trung tâm trải nghiệm, văn phòng điều hành thuộc hệ thống.  
*   
* **Phòng ban:** Toàn bộ Cán bộ Giáo viên Nhân viên (CBGVNV), Nhà thầu ngoài, Phụ huynh, Học sinh, Đối tác tích hợp API thứ ba.  
*   
* **Đối tượng:** Tài khoản người dùng ERP (Internal Users, Mobile App Parent Users, External Vendor Users, API Service Accounts), Dữ liệu Phân loại (Public, Internal, Confidential, Highly Restricted).  
*   
* **Trường hợp không áp dụng:** Truy cập hệ thống mạng LAN vật lý hoặc hạ tầng phần cứng ngoài phạm vi phần mềm ERP (áp dụng SOP-IT-002: Quản lý An ninh Hạ tầng Mạng & Thiết bị Phần cứng).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **RBAC (Role-Based Access Control):** Cơ chế phân quyền dựa trên Vai trò công việc. Quyền truy cập (Read, Create, Edit, Approve, Delete, Export) được gán cho Vai trò (Role), sau đó Vai trò được gán cho Người dùng (User).  
*   
* **Child Data Protection (Bảo vệ Dữ liệu Trẻ em):** Bộ quy tắc mã hóa và kiểm soát đặc biệt áp dụng cho dữ liệu nhạy cảm của trẻ mầm non dưới 16 tuổi (Hồ sơ y tế, dị ứng, hình ảnh/video, dữ liệu sinh trắc học FaceID/Vân tay, lịch sử đưa đón, thông tin tài chính phụ huynh) theo quy định của Nghị định 13/2023/NĐ-CP và Luật Trẻ em.  
*   
* **Data Masking / Anonymization:** Thao tác ẩn bớt các ký tự của dữ liệu nhạy cảm trên màn hình hiển thị (Ví dụ: Số điện thoại 090\*\*\*\*123, Số CCCD 001\*\*\*\*\*\*789) để tránh sao chép hoặc trích xuất dối.  
*   
* **Parental Consent Management:** Quy trình ghi nhận, lưu trữ chữ ký/xác nhận đồng ý hoặc rút lại sự đồng ý của Phụ huynh/Người giám hộ đối với việc thu thập, xử lý và chia sẻ dữ liệu cá nhân của con.  
*   
* **Immutable Audit Log (Nhật ký Hệ thống Không thể Điều chỉnh):** Cơ sở dữ liệu ghi vết sự kiện chỉ cho phép Ghi (Append-Only), được mã hóa băm (Cryptographic Hashing) chặn hoàn toàn thao tác Sửa/Xóa (UPDATE/DELETE), ghi nhận chính xác Ai \- Làm gì \- Lúc nào \- Từ IP nào \- Dữ liệu trước & sau biến động.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Thiết lập Ma trận Phân quyền RBAC & Cấu hình Security | ERP System Admin / IT | CISO / IT Director | Legal & Compliance | Ban Giám hiệu |
| Tiếp nhận Đề nghị Cấp / Sửa / Thu hồi Quyền Truy cập | HR Officer / IT Admin | IT Director / HR Mgr | Hiệu trưởng Cơ sở | Người dùng |
| Thu hồi Tài khoản Khẩn cấp khi Nhân sự Offboarding | HR Officer & IT Security | IT Director / CISO | BGH / Legal | Security Guard |
| Thu thập & Quản lý Cam kết Consent Dữ liệu Trẻ em | Tuyển sinh / Admin | Hiệu trưởng Cơ sở | Legal Officer | Phụ huynh |
| Giám sát Audit Log, Cảnh báo Lỗ hổng & Trích xuất Báo cáo | IT Security Analyst | CISO | Legal / Auditor | Board / CEO |

*Ghi chú: Việc thu thập, lưu trữ, xử lý dữ liệu cá nhân trẻ em, dữ liệu sinh trắc học và truyền phát hình ảnh mầm non cần kiểm tra/đối chiếu quy định hiện hành của Pháp luật Việt Nam (Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân, Luật Trẻ em 2016, Luật An ninh mạng) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Vai trò Hệ thống (RoleMaster), Danh mục Cơ sở (CampusMaster), Ma trận Quyền hạn (PermissionMatrixMaster), Danh mục Loại Dữ liệu (DataClassificationMaster).  
*   
* **Trạng thái Nhân sự / Học sinh:** Nhân sự có Hồ sơ Onboarding chính thức (SOP-HR-001) hoặc Phụ huynh có Hợp đồng Đào tạo đã ký (SOP-ADM-003).  
*   
* **Phê duyệt Bắt buộc:** Yêu cầu cấp/sửa quyền có xác nhận của Hiệu trưởng Cơ sở hoặc Trưởng phòng Ban tương ứng.  
* 

## **7\. Trigger**

* **Nhân sự Mới / Chuyển vị trí / Trợ nghỉ việc (HR Lifecycle):** Kích hoạt luồng Cấp mới, Điều chỉnh hoặc Thu hồi quyền tức thì từ SOP-HR-001.  
*   
* **Sự cố An ninh Thông tin / Rò rỉ Dữ liệu:** Kích hoạt luồng Khóa tài khoản Khẩn cấp (Emergency Account Freeze).  
*   
* **Định kỳ Kiểm toán Security (Hàng Quý):** Tiến trình rà soát và thu hồi các quyền truy cập dư thừa/không sử dụng.  
* 

## **8\. Quy trình AS-IS**

* Mỗi phòng ban tự dùng các phần mềm rời rạc (Excel, Zalo, Drive), tài khoản chung dùng chung mật khẩu (Ví dụ: Tài khoản tuyensinh\_coso1@gmail.com cho 3 nhân viên cùng dùng).  
*   
* Giáo viên, Tuyển sinh, Kế toán có thể xem và tải về toàn bộ danh sách SĐT Phụ huynh, Hồ sơ Y tế và Hình ảnh trẻ em mà không bị giới hạn scope.  
*   
* Khi nhân viên nghỉ việc, HR nhắn tin Zalo nhờ IT đổi mật khẩu. Nhiều trường hợp IT quên đổi mật khẩu, nhân viên cũ vẫn vào Drive/Phần mềm tải danh sách khách hàng sang trường đối thủ.  
*   
* Không có nhật ký ghi vết ai đã sửa điểm danh, ai đã thay đổi mức học phí hay ai đã xuất file danh sách Phụ huynh ra Excel.  
*   
* **Hệ quả:** Rò rỉ dữ liệu Phụ huynh & Trẻ em quy mô lớn; không xác định được trách nhiệm cá nhân khi phát sinh gian lận tài chính; vi phạm nghiêm trọng quy định pháp luật về bảo vệ dữ liệu cá nhân.  
* 

## **9\. Pain Points / Risk**

* **Data Leakage & Data Theft Risk:** Nhân viên tự ý Export file Excel danh sách Phụ huynh, SĐT, Địa chỉ để mang đi bán hoặc chuyển sang trường đối thủ.  
*   
* **Shared Account & Lack of Non-Repudiation:** Dùng chung tài khoản khiến không thể quy trách nhiệm pháp lý khi dữ liệu bị xóa sửa sai lệch.  
*   
* **Violation of Personal Data Protection Law (Decree 13):** Thu thập và chia sẻ hình ảnh, dữ liệu y tế của trẻ mầm non khi chưa có sự Đồng ý (Consent) bằng văn bản/điện tử của Phụ huynh, dẫn đến nguy cơ bị xử phạt hành chính nặng hoặc đình chỉ hoạt động.  
*   
* **Privilege Creep:** Nhân viên chuyển sang vị trí mới nhưng vẫn giữ nguyên toàn bộ quyền hạn của vị trí cũ, tích lũy quá nhiều đặc quyền nguy hiểm.  
*   
* **Unmonitored Administrative Access:** Tài khoản Administrator có toàn quyền sửa xóa dữ liệu mà không chịu sự giám sát của hệ thống Audit Log độc lập.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Quản lý Vòng đời Tài khoản & Phân quyền RBAC (Account Lifecycle & RBAC Provisioning)**

* **Step 01:**  
* 

  * **Actor:** ERP System (HR Onboarding Sync Engine) & IT Admin.  
  *   
  * **Action:** Khi Hồ sơ Nhân sự đạt trạng thái Verified & Active trên SOP-HR-001, ERP tự động sinh Tài khoản Người dùng Mới (User Account) theo cấu trúc Email doanh nghiệp chuẩn, tự động gán Vai trò (Role) tương ứng với Chức danh (Job Title) và Giới hạn Scope Cơ sở (Campus Data Scope).  
  *   
  * **ERP Function:** Automated RBAC Account Provisioning Engine.  
  *   
  * **Input:** Mã Nhân viên EmployeeID, Chức danh, Cơ sở công tác CampusID.  
  *   
  * **Output:** Tài khoản ERP được khởi tạo đính kèm Mật khẩu tạm thời \+ Mã xác thực 2 Yếu tố (2FA Mandatory).  
  *   
  * **Business Rule:** BR-SEC-001: Áp dụng Nguyên tắc Đặc quyền Tối thiểu (Least Privilege). Mặc định tài khoản mới khởi tạo chỉ có quyền Xem trong đúng Scope Cơ sở được phân công, tuyệt đối không có quyền Export Excel hoặc Xem Dữ liệu Nhạy cảm khi chưa có Phê duyệt bổ sung.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Account Provisioned / Pending 2FA Setup.  
  *   
  * **SLA:** Tự động hoàn tất trong 1 phút sau khi HR approve.  
  *   
  * **Notification:** Email chứa thông tin tài khoản và link kích hoạt 2FA gửi tới Nhân viên mới.  
  *   
* **Step 02:**  
* 

  * **Actor:** Người dùng & ERP System.  
  *   
  * **Action:** Người dùng đăng nhập lần đầu, bắt buộc đổi mật khẩu phức tạp (Tối thiểu 12 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt) và kích hoạt ứng dụng Xác thực 2 Yếu tố (TOTP 2FA Authenticator App).  
  *   
  * **ERP Function:** Enforced Password Policy & 2FA Setup.  
  *   
  * **Input:** Mật khẩu cũ, Mật khẩu mới, Mã OTP 2FA.  
  *   
  * **Output:** Tài khoản ở trạng thái Hoạt động an toàn (Active & 2FA Enforced).  
  *   
  * **Business Rule:** BR-SEC-002: Khóa tài khoản tự động trong **30 phút** nếu đăng nhập thất bại quá **05 lần liên tiếp** (Anti Brute-Force Attack).  
  *   
  * **Status Before:** Account Provisioned / Pending 2FA Setup.  
  *   
  * **Status After:** Active & Secured.  
  *   
  * **SLA:** \<= 5 phút thiết lập.  
  *   
  * **Notification:** Alert đăng nhập thành công gửi Email Người dùng.  
  *   
* **Step 03 (Khóa Khẩn cấp khi Offboarding):**  
* 

  * **Actor:** ERP System (HR Offboarding Sync Engine) & IT Security.  
  *   
  * **Action:** Ngay khi HR đổi trạng thái Nhân viên sang Terminated / Suspended trên SOP-HR-001, ERP lập tức kích hoạt luồng Emergency Account Revocation: Vô hiệu hóa tài khoản ERP, hủy toàn bộ Session đang đăng nhập trên Web/App, vô hiệu hóa Thẻ từ/Mã FaceID cổng trường trong vòng **01 giây**.  
  *   
  * **ERP Function:** Instant Multi-System Access Revocation.  
  *   
  * **Input:** Trạng thái Nhân sự Terminated / Suspended.  
  *   
  * **Output:** Tài khoản bị Khóa hoàn toàn (Account Disabled).  
  *   
  * **Business Rule:** BR-SEC-003: Quyền truy cập phải bị vô hiệu hóa **TỨC THÌ (REAL-TIME)** ngay khi có lệnh Offboarding từ HR, không phụ thuộc vào thao tác thủ công của IT.  
  *   
  * **Status Before:** Active & Secured.  
  *   
  * **Status After:** Disabled & Revoked.  
  *   
  * **SLA:** Real-time (\<= 1 giây).  
  *   
  * **Notification:** Push Notification xác nhận thu hồi gửi Trưởng phòng HR & IT Director.  
  * 

### **Giai đoạn 2: Bảo vệ Dữ liệu Trẻ em, Mã hóa & Quản lý Consent (Child Data Protection & Consent Management)**

* **Step 04:**  
* 

  * **Actor:** Tuyển sinh / Admin & Phụ huynh.  
  *   
  * **Action:** Khi ký Hợp đồng Đào tạo (SOP-ADM-003), Phụ huynh thực hiện ký Tờ khai Đồng ý Xử lý Dữ liệu Cá nhân Điện tử (Parental Data Consent Form) trên App Phụ huynh, lựa chọn các tùy chọn Opt-In / Opt-Out: (1) Đồng ý Thu thập Dữ liệu Y tế/Sinh trắc học; (2) Đồng ý Chia sẻ Hình ảnh trên App Nội bộ; (3) Đồng ý Chia sẻ Hình ảnh Truyền thông Công cộng.  
  *   
  * **ERP Function:** Parental Consent Management & Dynamic Privacy Flag.  
  *   
  * **Input:** Lựa chọn Opt-In/Opt-Out của Phụ huynh \+ Chữ ký Điện tử / OTP.  
  *   
  * **Output:** Hồ sơ Consent Điện tử đính kèm Cờ Quyền riêng tư (Photo Consent Flag & Medical Consent Flag).  
  *   
  * **Business Rule:** BR-SEC-004: Mọi thao tác xử lý dữ liệu trẻ em bắt buộc phải kiểm tra Cờ Consent tương ứng. Nếu Phụ huynh chọn Opt-Out tính năng nào, ERP tự động khóa/làm mờ dữ liệu đó trên toàn bộ hệ thống (Ví dụ: Auto-blur khuôn mặt trẻ trong Album ảnh theo SOP-SIS-002).  
  *   
  * **Status Before:** Pending Consent.  
  *   
  * **Status After:** Consent Recorded & Enforced.  
  *   
  * **SLA:** Hoàn tất khi nhập học.  
  *   
  * **Notification:** Bản sao Tờ khai Consent gửi về Email Phụ huynh.  
  *   
* **Step 05:**  
* 

  * **Actor:** ERP System (Dynamic Data Masking Engine).  
  *   
  * **Action:** Hệ thống tự động phân loại dữ liệu theo 4 Cấp độ: Public, Internal, Confidential, Highly Restricted. Dữ liệu thuộc nhóm Confidential & Highly Restricted (SĐT Phụ huynh, Hồ sơ y tế, Lịch sử đưa đón) khi hiển thị trên giao diện của người dùng không có đặc quyền sẽ tự động bị Ẩn ký tự (Dynamic Masking).  
  *   
  * **ERP Function:** Role-Based Dynamic Data Masking.  
  *   
  * **Input:** Cấp độ Bảo mật Dữ liệu \+ Role của Người xem.  
  *   
  * **Output:** Dữ liệu hiển thị dạng Ẩn (Ví dụ: 090\*\*\*\*567, Y tế: \*\*\*Hidden\*\*\*).  
  *   
  * **Business Rule:** BR-SEC-005: Muốn xem số điện thoại đầy đủ hoặc Dữ liệu Y tế, Người dùng phải có Quyền Phê duyệt (Unmask Permission) và khi bấm "Hiện Số Đầy Đủ", ERP bắt buộc yêu cầu nhập Lý do (Justification Reason) và tự động ghi vết Audit Log.  
  *   
  * **Status Before:** Masked.  
  *   
  * **Status After:** Unmasked (Audit Logged).  
  *   
  * **SLA:** Real-time.  
  *   
  * **Notification:** Alert gửi IT Security nếu 1 người dùng unmask quá 20 số/ngày.  
  * 

### **Giai đoạn 3: Giám sát Nhật ký Hệ thống & Cảnh báo An ninh (Unalterable Audit Log & Security Alert)**

* **Step 06:**  
* 

  * **Actor:** ERP System (Immutable Audit Logging Engine).  
  *   
  * **Action:** Hệ thống tự động bắt giữ (Capture) 100% các giao dịch biến động dữ liệu nhạy cảm, thao tác Phê duyệt, thao tác Đăng nhập, thao tác Mở Unmask, thao tác Export Excel, thao tác Thay đổi Quyền hạn. Dữ liệu Log được đóng gói mã hóa băm SHA-256 và lưu vào Kho lưu trữ Log Độc lập (Append-Only Log Store).  
  *   
  * **ERP Function:** Immutable Audit Logging & Cryptographic Hashing.  
  *   
  * **Input:** Thao tác người dùng (User ID, IP, Device, Timestamp, Action, Entity, Field, Old Value, New Value).  
  *   
  * **Output:** Bản ghi Audit Log vĩnh viễn không thể điều chỉnh.  
  *   
  * **Business Rule:** BR-SEC-006: Nhật ký Audit Log bắt buộc lưu trữ tối thiểu **365 ngày**. Tuyệt đối KHÔNG BẤT KỲ TÀI KHOẢN NÀO (kể cả Super Admin / Database Admin) có quyền Sửa (UPDATE) hoặc Xóa (DELETE) dữ liệu Audit Log.  
  *   
  * **Status Before:** Action Occurred.  
  *   
  * **Status After:** Log Immutable Stored.  
  *   
  * **SLA:** Real-time (\<= 100ms).  
  *   
  * **Notification:** N/A.  
  *   
* **Step 07:**  
* 

  * **Actor:** ERP System (SIEM Anomaly Detector) & IT Security Analyst.  
  *   
  * **Action:** Thuật toán AI/Rule Engine liên tục phân tích chuỗi Audit Log real-time. Nếu phát hiện các hành vi bất thường (Ví dụ: Đăng nhập từ IP lạ, Export dữ liệu quá 100 học sinh/lần, Unmask SĐT hàng loạt, Sửa đổi số tiền học phí ngoài giờ hành chính), ERP kích hoạt Cảnh báo Bất thường An ninh (Security Anomaly Alert).  
  *   
  * **ERP Function:** Real-time SIEM Security Anomaly Detection.  
  *   
  * **Input:** Stream Audit Logs.  
  *   
  * **Output:** Alert Cảnh báo An ninh Cấp độ High/Critical.  
  *   
  * **Business Rule:** BR-SEC-007: Khi có sự cố Export Dữ liệu Hàng loạt bất thường (\> 100 bản ghi/lần), ERP tự động tạm khóa tính năng Export của tài khoản đó trong **24 giờ** và phát alert cấp báo CISO.  
  *   
  * **Status Before:** Monitoring.  
  *   
  * **Status After:** Alert Issued / Account Restricted.  
  *   
  * **SLA:** Phát hiện và gửi alert trong \<= 5 giây.  
  *   
  * **Notification:** High Priority Alert gửi CISO, IT Director và Email Giám sát.  
  * 

## **11\. Workflow**

\[LUỒNG 1: QUẢN LÝ VÒNG ĐỜI TÀI KHOẢN RBAC\]     \[LUỒNG 2: BẢO VỆ DỮ LIỆU TRẺ EM & CONSENT\]  
                 │                                                │  
                 ▼                                                ▼  
\[HR Approve Active Nhân Sự (SOP-HR-001)\]        \[Phụ Huynh Ký Parental Data Consent Form (SOP-ADM-003)\]  
                 │                                                │  
                 ▼                                                ▼  
\[ERP Auto-Provision Account theo Role & Scope\]   \[ERP Auto Enforcement Cờ Privay (Opt-In / Opt-Out)\]  
                 │                                                │  
                 ▼                                                ▼  
\[Enforce 2FA & Password Policy 12 Ký Tự\]        \[Dynamic Data Masking: Hide SĐT & Y Tế Nhạy Cảm\]  
                 │                                                │  
                 ◇ Nhân Sự Offboarding / Terminated?               ◇ Người dùng Bấm "Unmask" Xem Số Đầy Đủ?  
                 ├─ YES ──► \[KÍCH HOẠT TỨC THÌ (1s): REVOKE TOÀN BỘ QUYỀN TRUY CẬP\]  
                 └─ NO  ──┐                                       ├─ YES ──► \[Bắt Nhập Lý Do ──► Auto Unmask \+ Log\]  
                          │                                       └─ NO  ──┐  
                          ▼                                                │  
         \[BẮT DỮ LIỆU THAO TÁC (IMMUTABLE AUDIT LOGGING ENGINE)\] ◄────────┘  
                          │  
                          ▼  
         \[Đóng Gói Băm SHA-256 ──► Append-Only Log Store (Cấm Update/Delete)\]  
                          │  
                          ▼  
         \[AI / SIEM Anomaly Detector: Quét Hành Vi Bất Thường Real-time\]  
                          │  
                          ◇ Phát Hiện Export Hàng Loạt / Unmask Hàng Loạt?  
                          ├─ YES ──► \[KÍCH HOẠT TỰ ĐỘNG: TẠM KHÓA PHÂN QUYỀN \+ ALERT CISO\]  
                          └─ NO  ──┐  
                                   │  
                                   ▼  
                              \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-SEC-001 (Principle of Least Privilege & Scope Isolation):** Mọi tài khoản khởi tạo chỉ được gán đúng các quyền tối thiểu cần thiết để thực hiện nhiệm vụ công việc. Phạm vi dữ liệu (Data Scope) được giới hạn cứng theo Cơ sở công tác (CampusID). Nhân viên Cơ sở A tuyệt đối không xem được dữ liệu học sinh/tài chính của Cơ sở B, trừ các Vai trò Quản lý Chuỗi (Enterprise Roles).  
*   
* **BR-SEC-002 (Password & 2FA Enforcement):** Mật khẩu người dùng bắt buộc tối thiểu **12 ký tự** bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt; thời hạn hiệu lực tối đa 90 ngày. Bắt buộc kích hoạt Xác thực 2 Yếu tố (TOTP 2FA) đối với 100% tài khoản Nhân viên và Quản lý.  
*   
* **BR-SEC-003 (Instant Revocation Mandate):** Khi trạng thái nhân sự trên SOP-HR-001 chuyển sang Terminated, Suspended hoặc Resigned, hệ thống ERP bắt buộc tự động thu hồi toàn bộ quyền truy cập (Revoke Tokens, Lock Account) trong vòng **01 giây** trên tất cả các nền tảng Web, Mobile App, Access Control Cổng và CCTV.  
*   
* **BR-SEC-004 (Child Data Protection Compliance):** Tuân thủ nghiêm ngặt Luật Trẻ em và Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân. Dữ liệu trẻ em thuộc nhóm **Highly Restricted Data**. Mọi thao tác thu thập, xử lý, hình ảnh phải dựa trên Tờ khai Consent hợp lệ của Phụ huynh. Hệ thống tự động khóa/làm mờ hình ảnh và dữ liệu đối với các trường hợp Phụ huynh Opt-Out. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
*   
* **BR-SEC-005 (Export & Unmask Restriction):** Quyền Xuất Dữ liệu out Excel (Export Permission) và Quyền Xem Số Đầy Đủ (Unmask Permission) là các đặc quyền cấp cao (High-Risk Privilege). Mặc định bị khóa đối với nhân viên vận hành. Mọi lượt Unmask hoặc Export \> 20 bản ghi/lần bắt buộc phải nhập Lý do nghiệp vụ và bị SIEM Monitor giám sát real-time.  
*   
* **BR-SEC-006 (Unalterable Audit Trail):** Dữ liệu Audit Log là tài sản chứng cứ pháp lý. Bắt buộc cấu hình cơ chế cơ sở dữ liệu Append-Only đính kèm băm SHA-256. Tuyệt đối chặn các câu lệnh SQL UPDATE, DELETE, DROP đối với Bảng Audit Log đối với tất cả người dùng, kể cả tài khoản sa hoặc root.  
* 

## **13\. Exception Cases**

* **Phụ huynh Rút lại Sự Đồng ý Xử lý Dữ liệu (Consent Revocation):**  
* 

  * *Xử lý:* Phụ huynh bấm "Rút lại Consent" trên Mobile App. ERP chuyển trạng thái Consent Revoked, tự động kích hoạt luồng Ẩn/Mã hóa toàn bộ dữ liệu lịch sử và hình ảnh của học sinh đó trên giao diện chung, đồng thời phát alert cho Phòng Pháp chế/BGH kiểm tra yêu cầu xóa dữ liệu theo Luật quy định.  
  *   
* **Tài khoản Quản lý Cấp cao cần Truy cập Khẩn cấp Ngoài Phân quyền (Emergency Break-Glass Access):**  
* 

  * *Xử lý:* Trong tình huống thiên tai, cấp cứu khẩn cấp hoặc điều tra pháp lý, Quản lý được phép kích hoạt tính năng Break-Glass Emergency Access. ERP cấp quyền mở rộng tạm thời trong **02 giờ**, đồng thời gửi thông báo tức thì tới CEO, CISO và ghi nhận Audit Log ưu tiên cao.  
  *   
* **Phát hiện Tài khoản bị Khai thác / Bị Hack (Compromised Account):**  
* 

  * *Xử lý:* SIEM phát hiện tài khoản đăng nhập song song từ 2 quốc gia khác nhau trong 5 phút. ERP tự động khóa tài khoản khẩn cấp (Auto Freeze), hủy toàn bộ Session token active, gửi SMS cảnh báo cho Chủ tài khoản và thông báo Đội Security ứng cứu.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Cấp Tài khoản & Vai trò Chuẩn theo Chức danh (Standard Role) | HR Manager (Trình) | System Auto-Provision | IT Admin (Verify) |
| Cấp bổ sung Quyền Đặc biệt / Vượt Scope Cơ sở | Trưởng phòng Ban / BGH | IT Director | CISO / CTO |
| Phê duyệt Quyền Export Excel Hàng loạt (\> 500 bản ghi) | Trưởng phòng Ban / BGH | CISO | CFO / CEO |
| Cấp quyền Khẩn cấp (Break-Glass Emergency Access) | System Auto-Log | CISO Notification | CEO Notification |
| Phê duyệt Thay đổi Ma trận Phân quyền RBAC Toàn Hệ thống | CISO | CTO | Giám đốc Điều hành (CEO) |

## **15\. Status Lifecycle**

* **User Account Status:** Provisioned \-\> Pending 2FA \-\> Active \-\> Locked (Failed Logins) \-\> Suspended \-\> Disabled (Terminated).  
*   
* **Parent Data Consent Status:** Pending Consent \-\> Consent Granted (Opt-In) \-\> Partially Opted-Out \-\> Consent Revoked.  
*   
* **Security Alert Status:** Detected \-\> Alert Issued \-\> Account Auto-Restricted \-\> Investigating \-\> Mitigated / Resolved.  
* 

## **16\. Data Model**

* **Primary Entity:** UserAccount  
* 

  * UserID (PK, String, Unique)  
  *   
  * EmployeeID (FK, String, Nullable), ParentID (FK, String, Nullable)  
  *   
  * Username (String, Unique), Email (String), PasswordHash (String)  
  *   
  * Is2FAEnabled (Boolean), TOTPSecret (String Encrypted)  
  *   
  * UserStatus (Enum: Provisioned, Active, Locked, Suspended, Disabled)  
  *   
  * FailedLoginAttempts (Integer), LastLoginTimestamp (DateTime)  
  *   
* **Related Entities:**  
* 

  * RoleMaster: RoleID (PK), RoleName (String), Description (Text), IsSystemRole (Boolean).  
  *   
  * UserRoleAssignment: AssignmentID (PK), UserID (FK), RoleID (FK), CampusScopeID (FK, Nullable for All), GrantedBy (FK), GrantedTimestamp (DateTime).  
  *   
  * RolePermission: PermissionID (PK), RoleID (FK), ModuleDomain (String), ActionType (Enum: Read, Create, Edit, Approve, Delete, Export, Unmask), AccessLevel (Enum: Own, Campus, Enterprise).  
  *   
  * ParentDataConsent: ConsentID (PK), StudentID (FK), ParentID (FK), HealthDataConsent (Boolean), InternalPhotoConsent (Boolean), PublicMediaConsent (Boolean), DigitalSignatureURL (String), ConsentTimestamp (DateTime).  
  *   
  * ImmutableAuditLog: LogID (PK, BigInt Sequence), Timestamp (DateTime UTC), UserID (FK), UserIP (String), UserAgent (String), ModuleDomain (String), Action (String), EntityName (String), EntityID (String), OldValueJSON (JSON Encrypted), NewValueJSON (JSON Encrypted), SHA256Hash (String Unique).  
  * 

## **17\. Forms / Documents**

* FRM-SEC-001: Đơn Đề nghị Cấp / Điều chỉnh Quyền Truy cập ERP (Digital Access Request Form).  
*   
* FRM-SEC-002: Tờ khai Đồng ý Xử lý Dữ liệu Cá nhân Trẻ em Điện tử (Parental Data Consent Form).  
*   
* FRM-SEC-003: Biên bản Xử lý Sự cố An ninh Thông tin & Rò rỉ Dữ liệu (Security Incident Investigation Report).  
*   
* FRM-SEC-004: Báo cáo Kiểm toán Phân quyền RBAC & Quyền Xem Dữ liệu Nhạy cảm Định kỳ (Quarterly RBAC Audit Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-SEC-001 (MUST):** Tích hợp Phân hệ RBAC & Multi-Campus Scope Engine: Cho phép quản lý phân quyền theo Vai trò, Hành động và Giới hạn dữ liệu theo từng Cơ sở (Campus Scope).  
*   
* **FR-SEC-002 (MUST):** Tích hợp Dynamic Data Masking Engine: Tự động ẩn số điện thoại Phụ huynh, Số CCCD và Dữ liệu Y tế nhạy cảm trên toàn bộ giao diện làm việc, yêu cầu nhập lý do khi Unmask.  
*   
* **FR-SEC-003 (MUST):** Phân hệ Parental Data Consent Management: Cho phép Phụ huynh thiết lập cờ Opt-In/Opt-Out riêng tư trên Mobile App và tự động đồng bộ cờ chặn xử lý dữ liệu trên toàn ERP.  
*   
* **FR-SEC-004 (MUST):** Tích hợp Immutable Audit Log Engine: Tự động ghi nhận 100% giao dịch biến động dữ liệu nhạy cảm, băm mã hóa SHA-256 và lưu trữ Append-Only chống sửa xóa.  
*   
* **FR-SEC-005 (MUST):** Tích hợp Instant Offboarding Account Revocation: Tự động thu hồi toàn bộ quyền truy cập hệ thống trong 01 giây ngay khi HR đổi trạng thái nghỉ việc.  
*   
* **FR-SEC-006 (SHOULD):** Phân hệ SIEM Security Anomaly Detector: AI/Rule Engine tự động phát hiện hành vi Export hàng loạt, Unmask hàng loạt hoặc đăng nhập bất thường để phát Alert và khóa quyền tự động.  
* 

## **19\. Automation Opportunities**

* **AUTO-SEC-001 (INTEGRATION):** Tự động sinh tài khoản ERP, gán Vai trò RBAC chuẩn theo Chức danh ngay khi HR hoàn tất duyệt Hồ sơ Onboarding trên SOP-HR-001.  
*   
* **AUTO-SEC-002 (WORKFLOW):** Tự động thu hồi tức thì (Instant Revoke) toàn bộ Token đăng nhập, Quyền ERP, Thẻ từ Cổng và Mã FaceID trong 01 giây khi HR bấm Offboarding.  
*   
* **AUTO-SEC-003 (RULE ENGINE):** Tự động áp dụng cờ Ẩn ảnh/Blur khuôn mặt trẻ em trên Album Sổ liên lạc (SOP-SIS-002) dựa trên cờ Privacy Opt-Out của Phụ huynh.  
*   
* **AUTO-SEC-004 (SECURITY RULE):** Tự động tạm khóa tính năng Export Excel 24 giờ và phát alert CISO khi người dùng thực hiện xuất dữ liệu vượt quá 100 bản ghi/lần.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Khởi tạo Tài khoản ERP Mới & Link Setup 2FA | Nhân viên Mới | Email Doanh nghiệp | Immediate khi HR approve |
| Cảnh báo Đăng nhập Từ Thiết bị / IP Lạ | Người dùng | Email \+ SMS Brandname | Immediate khi login |
| CẢNH BÁO TÀI KHOẢN BỊ THU HỒI (Offboarding) | Trưởng phòng HR & CISO | ERP App Push \+ Email | Immediate (\<= 1 giây) |
| CẢNH BÁO AN NINH: Export / Unmask Hàng Loạt | CISO, IT Director, CEO | ERP High Alert \+ SMS | Immediate (\<= 5 giây) |
| Cảnh báo Rút lại Consent Dữ liệu Trẻ em | BGH & Phòng Pháp chế | ERP High Alert \+ Email | Immediate khi Phụ huynh chọn |
| Nhắc nhở Đổi Mật khẩu Định kỳ (Mỗi 90 ngày) | Toàn thể Người dùng | ERP Pop-up \+ Email | 7 ngày trước hạn đổi |

## **21\. Permission Matrix (RBAC)**

| Role | View System Audit Log | Manage Role & Permission | Unmask Phone / Health | Export Excel Data | Access Break-Glass | Manage Parent Consent |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Giáo viên / Staff | No | No | No (Masked) | No | No | Read Only (Class) |
| Admission / Kế toán | No | No | Own Scope (Justified) | In Limit | No | Read Only |
| Hiệu trưởng Cơ sở | Campus Log Only | No | Campus Scope | Campus Limit | No | Full Campus |
| HR Manager | HR Log Only | Request Only | No | In Limit | No | No |
| CISO / IT Security | Full Enterprise Log | Full Enterprise | Full Audit Logged | Full Audit Logged | Override | Full Enterprise |
| System Admin | System Only | Full (Audited) | No (Privacy Enforced) | No (Privilege Restricted) | No | System Only |
| CEO / Board | Full Enterprise Log | Read Only | Full Enterprise | Full Enterprise | Full Enterprise | Read Only |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi thao tác Tạo, Sửa, Xóa, Gán Vai trò, Thay đổi Scope Dữ liệu của Tài khoản Người dùng (Who, When, What Role Added/Removed, IP).  
*   
* Nhật ký Mở Unmask xem Dữ liệu Nhạy cảm (SĐT Phụ huynh, Hồ sơ Y tế, CCCD): Timestamp, User ID, Entity ID, Lý do Unmask đã nhập.  
*   
* Nhật ký Xuất File Excel / CSV: Timestamp, User ID, Tên báo cáo, Số lượng bản ghi đã xuất, Cột dữ liệu đã xuất.  
*   
* Lịch sử Thu hồi Tài khoản Khẩn cấp (Offboarding Event): Timestamp đồng bộ từ HR, kết quả thu hồi token trên các phân hệ.  
*   
* Toàn bộ sự kiện Cảnh báo An ninh SIEM và nhật ký xử lý sự cố của Đội IT Security.  
* 

## **23\. Internal Controls**

* **Segregation of Duties (Tách biệt nhiệm vụ):** System Admin quản trị hệ thống không được kiêm nhiệm vai trò CISO/Auditor kiểm soát Audit Log. Nhân viên IT không có quyền tự ý mở xem Dữ liệu Y tế/SĐT Phụ huynh nếu không có Ticket yêu cầu nghiệp vụ được duyệt.  
*   
* **Dual-Control for Role Matrix Change:** Mọi thay đổi ma trận phân quyền RBAC hoặc tạo Vai trò mới có đặc quyền cao bắt buộc phải có xác nhận kép (Dual Approval): CISO phê duyệt \+ CTO phê duyệt.  
*   
* **Mandatory Data Anonymization:** Mặc định mã hóa và ẩn 100% thông tin nhạy cảm của Phụ huynh và Học sinh trên các môi trường Test/Staging/Development.  
*   
* **Immutable Append-Only Audit Database:** Khóa cứng quyền Sửa/Xóa đối với Cơ sở dữ liệu Audit Log ở cấp độ Cấu hình Database & Băm SHA-256.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Thu hồi Tài khoản khi Offboarding** | Thời gian từ khi HRapprove Resigned đến khi khóa hết quyền | **\<= 1 giây (Real-time)** | IT Security & ERP |
| **Tỷ lệ Tuân thủ Kích hoạt 2FA (2FA Enforced Rate)** | (Số tài khoản nhân viên đã bật 2FA / Tổng tài khoản) \* 100 | **100% (Mandatory)** | IT Director |
| **SLA Phát hiện Cảnh báo An ninh (SIEM Alert SLA)** | Thời gian từ khi phát sinh hành vi bất thường đến khi phát alert | **\<= 5 giây** | IT Security Analyst |
| **Tỷ lệ Bản ghi Audit Log Hợp lệ (Log Integrity)** | (Số bản ghi Audit Log băm SHA-256 nguyên vẹn / Tổng log) \* 100 | **100% (Zero Tampering)** | CISO |
| **Tỷ lệ Vi phạm Bảo mật Dữ liệu Trẻ em** | Số vụ rò rỉ hoặc xử lý dữ liệu trẻ em sai cờ Consent | **0% (Zero Tolerance)** | CISO & Legal Officer |

## **25\. Dashboard / Report**

* **Real-time Security & SIEM Dashboard (CISO & IT Security):** Màn hình giám sát các nỗ lực đăng nhập thất bại, Cảnh báo Unmask/Export hàng loạt real-time, Trạng thái kích hoạt 2FA toàn chuỗi, Báo cáo tài khoản bị tạm khóa.  
*   
* **Child Data Privacy & Consent Compliance Monitor (Legal & BGH):** Báo cáo tỷ lệ Phụ huynh hoàn tất Parental Consent, Danh sách học sinh có cờ Privacy Opt-Out, Nhật ký các lượt truy cập Dữ liệu Y tế nhạy cảm.  
*   
* **Enterprise RBAC & Privilege Audit Report (CTO & Board):** Báo cáo tổng hợp danh sách tài khoản có đặc quyền cao (Admin/Manager), Báo cáo rà soát tài khoản không hoạt động \> 30 ngày, Báo cáo tính nguyên vẹn của Audit Log System.  
* 

## **26\. Integration**

* **Human Resources & Payroll Engine (SOP-HR-001):** Đồng bộ dữ liệu Vòng đời Nhân sự real-time để Cấp mới, Thay đổi Vai trò hoặc Thu hồi tài khoản tức thì trong 1 giây.  
*   
* **Admission & Parent Portal (SOP-ADM-003):** Đồng bộ Tờ khai Parental Data Consent và cấp tài khoản App Phụ huynh.  
*   
* **Access Control Gate & CCTV System:** Tự động vô hiệu hóa Thẻ từ cổng và Mã FaceID khi tài khoản bị khóa.  
*   
* **Corporate Identity & Single Sign-On (Google Workspace / Microsoft 365 SAML SSO):** Tích hợp xác thực đăng nhập tập trung và quản lý 2FA.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Rò rỉ/Mất cắp dữ liệu SĐT Phụ huynh & Học sinh** | Critical | Low | Dynamic Data Masking; Bắt nhập lý do Unmask;SIEM Monitor cảnh báo Export. | CISO & IT Director |
| **Nhân viên nghỉ việc vẫn truy cập được hệ thống** | Critical | Low | Instant Offboarding Revocation trong 01 giây sync tự động từ HR SOP-HR-001. | IT Security & HR Mgr |
| **Vi phạm Nghị định 13 bị phạt hành chính/Đình chỉ** | Critical | Low | Bắt buộc Parental Data Consent; Auto-enforce cờ Opt-Out riêng tư trên toàn ERP. | Legal Officer & CISO |
| **Admin sửa xóa dữ liệu xóa vết gian lận** | Critical | Low | Immutable Append-Only Audit Log; Mã hóa băm SHA-256; Chặn lệnh SQL Delete/Update. | CISO & CTO |

## **28\. Acceptance Criteria**

* **Given:** Trưởng phòng HR bấm phê duyệt trạng thái Terminated cho Nhân viên A trên SOP-HR-001 lúc 10:00:00 AM.  
*   
* **When:** Nhân viên A cố tình dùng Mobile App ERP hoặc Web ERP để truy cập dữ liệu lúc 10:00:01 AM.  
*   
* **Then:** ERP lập tức từ chối truy cập, hiển thị lỗi *"Tài khoản đã bị vô hiệu hóa"*, tự động hủy Session Token active, vô hiệu hóa mã FaceID tại Cổng trường và gửi Alert xác nhận thu hồi tới IT Security trong vòng đúng 1 giây.  
*   
* **Given:** Tư vấn viên B mở danh sách 100 Học sinh trên màn hình CRM.  
*   
* **When:** Tư vấn viên B nhìn vào cột Số Điện Thụ Phụ huynh.  
*   
* **Then:** ERP hiển thị dữ liệu dạng Masked 091\*\*\*\*888. Khi Tư vấn viên B bấm nút "Unmask", ERP bắt buộc hiển thị Pop-up yêu cầu nhập Lý do nghiệp vụ. Ngay khi bấm Confirm, ERP mới hiện số đầy đủ và tự động lưu 1 bản ghi Immutable Audit Log chứa User ID, Timestamp, SĐT đã unmask và Lý do đã nhập.  
* 

## **29\. Test Scenarios**

1. **Happy Path Onboarding & RBAC Provisioning Test:** HR Approve Nhân viên Mới \-\> ERP Auto-Provision tài khoản \-\> Bắt buộc Setup 2FA & Mật khẩu 12 ký tự \-\> Đăng nhập thành công với đúng Scope Cơ sở.  
2.   
3. **Instant Offboarding Revocation Test:** Đổi trạng thái Nhân viên sang Terminated \-\> Kiểm tra xem trong 01 giây tài khoản ERP, Token Web/App, Thẻ từ Cổng và FaceID có bị khóa HOÀN TOÀN không.  
4.   
5. **Dynamic Data Masking & Unmask Audit Test:** Truy cập màn hình Hồ sơ Học sinh \-\> Kiểm tra SĐT bị ẩn 090\*\*\*\*123 \-\> Bấm Unmask nhập lý do \-\> Kiểm tra Bảng Audit Log có ghi nhận chính xác bản ghi băm SHA-256 không.  
6.   
7. **SIEM Anomaly Export Alert Test:** Cố tình bấm Export file Excel danh sách 150 học sinh \-\> Kiểm tra xem ERP SIEM Engine có phát Alert Cảnh báo An ninh High Priority và tự động tạm khóa quyền Export của tài khoản trong 24 giờ không.  
8.   
9. **Audit Log Anti-Tampering Test:** Dùng tài khoản Database Super Admin (sa) cố tình chạy câu lệnh DELETE FROM ImmutableAuditLog \-\> Kiểm tra xem Database Engine có chặn lệnh và trả về lỗi Permission Denied / Append-Only Table không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình chính sách Mật khẩu (12 ký tự, bắt buộc 2FA); Cấu hình ngưỡng cảnh báo SIEM (Export \> 100 bản ghi, Unmask \> 20 số/ngày); Cấu hình ma trận phân quyền RBAC chuẩn theo Chức danh; Cấu hình thời gian khóa Brute-Force (5 lần sai \-\> Khóa 30 phút).  
*   
* **Master Data Migration:** Import và mã hóa băm lại toàn bộ mật khẩu người dùng hiện hữu; Chuẩn hóa gán Vai trò RBAC và Scope Cơ sở cho 100% tài khoản CBGVNV.  
*   
* **Hardware & Integration:** Tích hợp SAML 2.0 / OpenID Connect SSO với Google Workspace / Microsoft 365; Tích hợp hệ thống Tổng đài CTI, Access Control Cổng và CCTV.  
*   
* **Training & Change Management:** Tập huấn toàn thể CBGVNV quy tắc Kích hoạt 2FA và Bảo vệ Mật khẩu; Đào tạo Đội ngũ Tuyển sinh/Admin quy trình thu thập Parental Data Consent Điện tử; Đào tạo Đội IT Security quy trình giám sát SIEM Dashboard và xử lý sự cố rò rỉ dữ liệu.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (14 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  10.   
  11. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  12.   
  13. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  14.   
  15. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  16.   
  17. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  18.   
  19. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  20.   
  21. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  22.   
  23. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  24.   
  25. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  26.   
  27. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  28.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **11 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│                                │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 17

# **SOP-GOV-001 — QUY TRÌNH QUẢN TRỊ CHUỖI ĐA CƠ SỞ (MULTI-CAMPUS GOVERNANCE), CẤU HÌNH THAM SỐ HỆ THỐNG VÀ BÁO CÁO THÔNG MINH BI DASHBOARD**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-GOV-001  
*   
* **Tên SOP:** Quy trình Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Phân cấp Quản lý, Cấu hình Tham số Hệ thống và Báo cáo Thông minh BI Dashboard  
*   
* **Module ERP:** Management Dashboard & BI (70), Multi-campus Management (71), Master Data Management (74), System Configuration (75), Compliance Management (67)  
*   
* **Process Owner:** Giám đốc Vận hành Chuỗi (Group COO) / Giám đốc Công nghệ (CTO)  
*   
* **Department:** Khối Vận hành Chuỗi (HQ), Phòng Công nghệ Thông tin, Phòng Kế hoạch \- Tài chính, Ban Giám hiệu các Cơ sở  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Tổng Giám đốc (CEO) / Board of Directors  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và kiến trúc hóa toàn bộ mô hình quản trị chuỗi trường mầm non đa cơ sở (Multi-Campus Operations): từ việc thiết lập cấu trúc cây tổ chức (HQ \-\> Region \-\> Campus \-\> Block \-\> Class), cơ chế thừa kế và đè tham số (Parameter Inheritance & Local Override) giữa HQ và Cơ sở thành viên, quản lý danh mục dữ liệu dùng chung (Master Data Management \- MDM), phân cấp thẩm quyền phê duyệt theo quy mô cơ sở, đến việc tự động tổng hợp dữ liệu thời gian thực (Real-time Data Aggregation) để xuất bản hệ thống Báo cáo Quản trị Thông minh (Business Intelligence \- BI Dashboards) phục vụ Ban Điều hành ra quyết định chiến lược dựa trên dữ liệu.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường quốc tế/song ngữ thành viên thuộc tập đoàn/chuỗi giáo dục, bao gồm cả các cơ sở mới sáp nhập (M\&A) hoặc mới mở mới (Greenfield).  
*   
* **Phòng ban:** Văn phòng Điều hành Tập đoàn (HQ), Ban Giám hiệu các Cơ sở, Phòng IT/ERP, Phòng Tài chính \- Kế toán Chuỗi, Phòng Tuyển sinh & Marketing Chuỗi, Phòng Nhân sự Chuỗi.  
*   
* **Đối tượng:** Tham số cấu hình hệ thống (System Configurations), Danh mục dữ liệu chuẩn (Master Data), Quy trình phê duyệt phân cấp, Báo cáo BI Dashboard đa chiều.  
*   
* **Trường hợp không áp dụng:** Quy trình pháp lý thành lập mới pháp nhân trường học với Cơ quan Nhà nước (áp dụng SOP-GOV-005: Quy trình Sáp nhập, Mở mới & Cấp phép Pháp lý Cơ sở Mầm non).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **HQ-Campus Hierarchy (Mô hình Cây Quản trị Tập đoàn \- Cơ sở):** Cấu trúc phân cấp dữ liệu trong đó Tập đoàn (HQ) nắm giữ quyền quản trị trung tâm, ban hành tham số chuẩn (Default Global Configurations), còn các Cơ sở thành viên (Campus) hoạt động như các Trung tâm Chi phí/Doanh thu (Cost/Profit Center) độc lập hoặc phụ thuộc.  
*   
* **Parameter Inheritance & Override (Thừa kế & Đè Tham số):** Cơ chế cho phép Cơ sở thành viên tự động thừa kế các cấu hình chuẩn từ HQ (như Quy trình SOP, Khung biểu phí chuẩn, Chuẩn dinh dưỡng Kcal, Tiêu chí HR). Trong trường hợp đặc thù địa phương, Cơ sở có thể đề xuất Đè tham số (Local Override) sau khi được HQ phê duyệt.  
*   
* **MDM (Master Data Management \- Quản trị Dữ liệu Mẫu):** Quy trình đảm bảo tính duy nhất, chính xác và đồng bộ của các thực thể dữ liệu cốt lõi (Danh mục Môn học, Danh mục Loại phí, Danh mục Vật tư, Danh mục Chức danh, Mã Định danh Học sinh/Nhân sự) trên toàn bộ hệ thống chuỗi.  
*   
* **ETL & BI Analytics (Extract, Transform, Load & BI Dashboard):** Tiến trình trích xuất, biến đổi và nạp dữ liệu tự động từ các phân hệ ERP về Kho Dữ liệu Quản trị (Data Warehouse) để hiển thị các chỉ số đo lường hiệu suất (KPIs/OKRs) trên dashboard trực quan.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Thiết lập Cây Tổ chức & Cấu hình Tham số HQ (Global Param) | ERP System Admin | CTO / COO | Khối trưởng HQ | Hiệu trưởng Cơ sở |
| Đề xuất Đè Tham số Cục bộ Cơ sở (Local Override) | Hiệu trưởng Cơ sở | Group COO | Trưởng phòng Ban HQ | IT Admin |
| Quản trị & Làm sạch Danh mục Dữ liệu Mẫu (MDM) | Data Steward / IT | CTO | Kế toán trưởng / HR Mgr | Toàn thể User |
| Xây dựng Khung Báo cáo BI & Chỉ số KPI Chuỗi | BI Analyst / Data Architect | Group CFO / COO | Hiệu trưởng các Cơ sở | CEO / Board |
| Phân quyền Truy cập Dashboard theo Cấp Quản lý | IT Security Admin | CISO / CTO | Legal / HR | User Quản lý |

*Ghi chú: Việc phân cấp quản lý trường mầm non, ủy quyền đại diện pháp luật, chế độ báo cáo thống kê giáo dục và lưu trữ dữ liệu tập trung cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo, Bộ Nội vụ và Luật Doanh nghiệp trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Pháp nhân & Cơ sở (CompanyCampusMaster), Sơ đồ Tổ chức Tập đoàn (OrgStructureMaster), Danh mục Tham số Hệ thống (GlobalParameterMaster), Danh mục Chỉ số BI (KPINomenclatureMaster).  
*   
* **Quyền Hệ thống:** Tài khoản Administrator có đặc quyền cấu hình Enterprise Global Admin.  
*   
* **Yêu cầu Nghiệp vụ:** Văn bản ban hành Chiến lược/Chính sách Vận hành Chuỗi từ Hội đồng Quản trị hoặc Ban Tổng Giám đốc.  
* 

## **7\. Trigger**

* **Tái cấu trúc / Mở rộng Chuỗi:** Mở mới cơ sở (Greenfield), sáp nhập cơ sở (M\&A) hoặc thay đổi sơ đồ tổ chức tập đoàn.  
*   
* **Đầu Năm học / Học kỳ Mới:** Cập nhật tham số năm học, khung học phí chuỗi, chính sách chiết khấu, chỉ tiêu tuyển sinh toàn chuỗi.  
*   
* **Nhu cầu Báo cáo Quản trị:** Ban Điều hành yêu cầu bổ sung góc nhìn báo cáo BI Analytics mới phục vụ ra quyết định.  
* 

## **8\. Quy trình AS-IS**

* Mỗi cơ sở dùng một phần mềm hoặc một file Excel quản lý riêng. Khi HQ cần báo cáo tổng hợp, Hiệu trưởng/Kế toán cơ sở phải xuất file Excel rồi gửi email về HQ.  
*   
* Kế toán tổng hợp tại HQ mất 3–5 ngày ngồi gộp thủ công các file Excel từ 10 cơ sở khác nhau. Dữ liệu thường xuyên lệch do mã học sinh, mã chi phí hoặc tên môn học đặt không thống nhất.  
*   
* Chính sách giảm giá, biểu phí tại các cơ sở do Hiệu trưởng tự thỏa thuận với Phụ huynh, HQ không nắm được kịp thời gây thất thoát doanh thu.  
*   
* CEO/Board không có màn hình theo dõi dòng tiền và sĩ số real-time, chỉ xem được báo cáo quá hạn từ tháng trước.  
*   
* **Hệ quả:** Rủi ro quản trị cực kỳ lớn khi mở rộng quy mô chuỗi (\> 5 cơ sở); không có bức tranh dữ liệu real-time; lãng phí nguồn lực nhân sự làm báo cáo thủ công; dữ liệu sai lệch gây ra các quyết định đầu tư/vận hành sai lầm.  
* 

## **9\. Pain Points / Risk**

* **Data Fragmentation & Inconsistency (Phân mảnh Dữ liệu):** Cùng một môn học hay loại phí nhưng mỗi cơ sở đặt tên một kiểu, dẫn đến ERP không thể tự động tổng hợp báo cáo tài chính/chuyên môn tập trung.  
*   
* **Policy Drift & Unauthorized Overrides:** Cơ sở thành viên tự ý áp dụng chính sách phí, lương hoặc quy trình chăm sóc trẻ khác chuẩn HQ, làm suy giảm uy tín thương hiệu chuỗi.  
*   
* **Delayed Executive Decision Making:** Ban Giám đốc phải chờ 7–10 ngày sau khi kết thúc tháng mới nhận được Báo cáo Doanh thu & Sĩ số, bỏ lỡ thời điểm can thiệp kinh doanh.  
*   
* **Scalability Bottleneck:** Mất nhiều tháng để đưa một cơ sở mới vào vận hành do thiếu quy trình cấu hình tham số nhân bản tự động (Auto-Cloning Campus Template).  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Khai báo Cây Tổ chức, Cấu hình Tham số HQ & Thừa kế Dữ liệu (Hierarchy & Parameter Inheritance)**

* **Step 01:**  
* 

  * **Actor:** ERP System Admin & Group COO.  
  *   
  * **Action:** Khai báo Cấu trúc Cây Tổ chức trên Phân hệ Multi-Campus Management: Tập đoàn (HQ) \-\> Vùng (Region) \-\> Cơ sở (Campus) \-\> Khối (Grade) \-\> Lớp (Class). Thiết lập các Tham số Chuẩn Tập đoàn (Global Parameters): Khung thời gian học, Quy tắc sinh mã Student ID/Employee ID, Ma trận Biểu phí chuẩn, Ma trận Tỷ lệ Ratio Giáo viên/Học sinh (SOP-HR-001), Quy trình kiểm thực 3 bước (SOP-KIT-001).  
  *   
  * **ERP Function:** Enterprise Hierarchy & Global Parameter Engine.  
  *   
  * **Input:** Sơ đồ tổ chức, Danh mục Tham số HQ.  
  *   
  * **Output:** Cây Tổ chức Tập đoàn \+ Bộ Tham số Chuẩn Tập đoàn (Global Configuration Baseline).  
  *   
  * **Business Rule:** BR-GOV-001: Mọi cơ sở thành viên khi được khởi tạo trên ERP mặc định **THỪA KẾ 100% (AUTO-INHERIT)** toàn bộ Tham số Chuẩn từ HQ.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Hierarchy Created / Global Params Baseline Active.  
  *   
  * **SLA:** Complete trong 2 giờ.  
  *   
  * **Notification:** Alert gửi Ban Giám hiệu các Cơ sở.  
  *   
* **Step 02:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở & Group COO.  
  *   
  * **Action:** Nếu Cơ sở có đặc thù địa phương (Ví dụ: Quy định giá thuê đất khác biệt, chính sách ưu đãi tuyển sinh địa phương), Hiệu trưởng tạo "Yêu cầu Đè Tham số" (Local Override Request) trên ERP. Group COO và CFO review và bấm "Phê duyệt Override".  
  *   
  * **ERP Function:** Local Parameter Override Approval Workflow.  
  *   
  * **Input:** Mã Tham số cần Override, Giá trị Cục bộ đề xuất, Lý do giải trình.  
  *   
  * **Output:** Tham số Cục bộ Cơ sở được ghi đè (Approved Local Override).  
  *   
  * **Business Rule:** BR-GOV-002: Các tham số liên quan đến An toàn Trẻ em (Safeguarding, PCCC, Ratio Giáo viên/Học sinh, Kiểm thực 3 bước Bếp ăn) là **THAM SỐ BẤT BIẾN (FROZEN PARAMETERS)**, tuyệt đối KHÔNG CHO PHÉP ĐÈ THAM SỐ ở bất kỳ cơ sở nào.  
  *   
  * **Status Before:** Inherited.  
  *   
  * **Status After:** Override Approved.  
  *   
  * **SLA:** Max 24 giờ làm việc.  
  *   
  * **Notification:** Push Notification thông báo cho IT Admin và Kế toán Cơ sở.  
  * 

### **Giai đoạn 2: Quản trị Dữ liệu Mẫu Chuỗi (Master Data Management \- MDM)**

* **Step 03:**  
* 

  * **Actor:** Data Steward (Phòng IT/ERP Chuỗi) & Các Trưởng Phân hệ HQ.  
  *   
  * **Action:** Quản trị các Danh mục Dữ liệu Mẫu (Master Data): Khai báo Danh mục Loại Phí (Fee Master), Danh mục Món ăn & Recipe BOM (Meal Master), Danh mục Vật tư/Tài sản (Item Master), Danh mục Tài khoản Kế toán (COA Master).  
  *   
  * **ERP Function:** Master Data Management & Harmonization Engine.  
  *   
  * **Input:** Danh mục chuẩn hóa từ HQ.  
  *   
  * **Output:** Bộ Dữ liệu Mẫu Tập trung (Enterprise Master Data Repository).  
  *   
  * **Business Rule:** BR-GOV-003: Cơ sở thành viên KHÔNG CÓ QUYỀN tự tạo mới mã Dữ liệu Mẫu (Mã Loại phí, Mã Vật tư tài sản, Mã Món ăn). Khi phát sinh nhu cầu mới, Cơ sở phải gửi Master Data Creation Request về HQ để Data Steward phê duyệt tạo mã dùng chung toàn chuỗi.  
  *   
  * **Status Before:** Local Data.  
  *   
  * **Status After:** MDM Harmonized.  
  *   
  * **SLA:** Tạo mã MDM mới trong \<= 4 giờ làm việc.  
  *   
  * **Notification:** Sync tự động danh mục mới về 100% Cơ sở.  
  * 

### **Giai đoạn 3: Nhân bản Cơ sở Mới Tự động (Auto-Cloning Greenfield Campus)**

* **Step 04:**  
* 

  * **Actor:** ERP System Admin.  
  *   
  * **Action:** Khi tập đoàn mở thêm Cơ sở Mới (Campus N+1), IT Admin chọn tính năng "Nhân bản Cơ sở" (Clone Campus Template). ERP tự động sao chép toàn bộ Cấu trúc Lớp, Tham số Vận hành, Quy trình SOP, Phân quyền RBAC chuẩn, Danh mục MDM sang Cơ sở Mới trong 1 cú click.  
  *   
  * **ERP Function:** Campus Auto-Cloning & Template Deployment.  
  *   
  * **Input:** Tên Cơ sở Mới, Mã Cơ sở, Địa chỉ, Tên Hiệu trưởng.  
  *   
  * **Output:** Cơ sở Mới sẵn sàng vận hành trên ERP (Campus Live Ready).  
  *   
  * **Business Rule:** Rút ngắn thời gian triển khai ERP cho cơ sở mới từ vài tuần xuống **dưới 60 phút**.  
  *   
  * **Status Before:** Planning.  
  *   
  * **Status After:** Campus Live Ready.  
  *   
  * **SLA:** \<= 60 phút thực thi.  
  *   
  * **Notification:** Email kích hoạt hệ thống gửi Hiệu trưởng Cơ sở Mới.  
  * 

### **Giai đoạn 4: Tổng hợp Dữ liệu Real-time & Báo cáo BI Dashboard (Data Consolidation & BI Analytics)**

* **Step 05:**  
* 

  * **Actor:** ERP System (Real-time Data Aggregator Engine).  
  *   
  * **Action:** Hệ thống tự động thu thập và tổng hợp biến động dữ liệu real-time từ 100% các phân hệ vận hành tại tất cả các cơ sở: Tuyển sinh (SOP-CRM-001), Điểm danh & Trả trẻ (SOP-SIS-001), Thu phí & Công nợ (SOP-FIN-001), Chi phí Vận hành (SOP-FIN-002), Nhân sự & Lương (SOP-HR-001), Bếp ăn (SOP-KIT-001), PCCC (SOP-FAC-001).  
  *   
  * **ERP Function:** Multi-Campus Real-Time Data Aggregation & ETL.  
  *   
  * **Input:** Raw Operational Logs từ tất cả Cơ sở.  
  *   
  * **Output:** Kho Dữ liệu Quản trị Tập trung (Enterprise Data Warehouse \- EDW).  
  *   
  * **Business Rule:** Dữ liệu tài chính và sĩ số học sinh phải được tổng hợp với độ trễ **\<= 5 giây (Near Real-time)**.  
  *   
  * **Status Before:** Raw Local Data.  
  *   
  * **Status After:** Data Consolidated in EDW.  
  *   
  * **SLA:** Real-time (Trễ \<= 5 giây).  
  *   
  * **Notification:** N/A.  
  *   
* **Step 06:**  
* 

  * **Actor:** CEO, COO, CFO, Board & Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Người quản lý mở Mobile App / Web BI Portal, chọn góc nhìn Dashboard theo Vai trò và Phạm vi thẩm quyền (Role & Scope-Based BI):  
  * 

    * *CEO/Board Dashboard:* Xem Chỉ số Tỷ lệ Lấp đầy Toàn Chuỗi (Occupancy Rate), Tổng Doanh thu Real-time, Dòng tiền Thu/Chi thực tế, Chỉ số CAC & CLV Tuyển sinh, Cảnh báo An toàn An ninh Toàn chuỗi.  
    *   
    * *CFO Dashboard:* Báo cáo P\&L theo Cơ sở, Phân tích Tuổi nợ AR, Dự báo Dòng tiền, Chi phí Vận hành vs Ngân sách (Budget vs Actual).  
    *   
    * *COO Dashboard:* Báo cáo Sĩ số Điểm danh Real-time, Chỉ số CSAT Phụ huynh, SLA Xử sự cố PCCC/Facility, Báo cáo Tuân thủ Dinh dưỡng Bếp ăn.  
    *   
    * *Campus Principal Dashboard:* Xem chi tiết các chỉ số vận hành duy nhất của Cơ sở mình phụ trách.  
    *   
  * **ERP Function:** Role-Based Interactive BI Dashboard & Anomaly Drill-Down.  
  *   
  * **Input:** EDW Data \+ Thẩm quyền RBAC (SOP-SEC-001).  
  *   
  * **Output:** Màn hình Dashboard tương tác trực quan (Biểu đồ, Bản đồ nhiệt Occupancy, Cảnh báo Cờ đỏ) cho phép Drill-down chi tiết đến từng lớp/học sinh/chứng từ.  
  *   
  * **Business Rule:** BR-GOV-004: Hiệu trưởng Cơ sở A **TUYỆT ĐỐI KHÔNG XEM ĐƯỢC** Báo cáo BI Fin/Operational của Cơ sở B. CEO/COO/CFO xem được toàn bộ 100% Cơ sở.  
  *   
  * **Status Before:** Consolidated Data.  
  *   
  * **Status After:** BI Dashboard Live Rendered.  
  *   
  * **SLA:** Tốc độ tải Dashboard \<= 2 giây.  
  *   
  * **Notification:** Tự động gửi Email/Push App "Báo cáo Giao ban Sáng" (Executive Morning Digest) lúc 07:30 AM hàng ngày tới CEO/COO/CFO.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Khai Báo Cấu Trúc Cây Tổ Chức Chuỗi (HQ ──► Region ──► Campus)\]  
       │  
       ▼  
\[ERP Auto Deploy Global Parameter Baseline (Thừa Kế 100% Quy Trình & Tham Số Chuẩn)\]  
       │  
       ◇ Cơ sở đề xuất Đè Tham số Cục bộ (Local Override)?  
       ├─ YES ──► \[Kiểm Tra Cờ Frozen Param (An Toàn/PCCC/Ratio/Dinh Dưỡng)\]  
       │               │  
       │               ◇ Là Tham số Frozen?  
       │               ├─ YES ──► \[KHÓA CẤM OVERRIDE (Bắt Buộc Tuân Thủ Chuẩn HQ)\]  
       │               └─ NO  ──► \[CFO / COO Phê Duyệt Override Cục Bộ\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Quản Trị Dữ Liệu Mẫu Tập Trung MDM (HQ Phê Duyệt Tạo Mã Dùng Chung)\]  
       │  
       ▼  
\[Mở Cơ Sở Mới (Greenfield): ERP 1-Click Auto-Cloning Campus Template (\< 60 phút)\]  
       │  
       ▼  
\[DIỄN BIẾN VẬN HÀNH HÀNG NGÀY TẠI TẤT CẢ CÁC CƠ SỞ\]  
 (Tuyển sinh, Học phí, Điểm danh, Bếp ăn, Y tế, HR, PCCC, Chi phí)  
       │  
       ▼  
\[ERP Real-Time Data Aggregator Engine (Dữ liệu tổng hợp về EDW trong \<= 5s)\]  
       │  
       ▼  
\[Dynamic Role-Based BI Analytics Dashboard System\]  
       │  
       ├─► CEO / Board Dashboard (Occupancy, Revenue, Cash Flow, Group Safety)  
       ├─► CFO Dashboard (P\&L by Campus, Budget vs Actual, AR Aging)  
       ├─► COO Dashboard (Attendance, CSAT, PCCC/Facility SLA, Kitchen Rate)  
       └─► Principal Dashboard (Chỉ số Vận hành Cụ thể của Cơ sở Phụ trách)  
       │  
       ▼  
\[07:30 AM Hàng Ngày: ERP Auto Send Executive Morning Digest tới Ban Điều Hành\]  
       │  
       ▼  
  \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-GOV-001 (Default Global Inheritance):** Tất cả các Cơ sở thành viên mới tạo mặc định thừa kế 100% Cấu hình Tham số, Ma trận Biểu phí, Ma trận Phân quyền RBAC và Quy trình SOP chuẩn từ HQ.  
*   
* **BR-GOV-002 (Frozen Parameters \- Non-Overridable):** Mọi tham số liên quan đến An toàn Trẻ em (Ratio Giáo viên/Học sinh theo SOP-HR-001, Quy trình Đón trả trẻ an toàn theo SOP-SIS-001, Quy trình Kiểm thực 3 bước & Lưu mẫu theo SOP-KIT-001, Tiêu chuẩn PCCC theo SOP-FAC-001, Quy định Bảo mật Dữ liệu Trẻ em theo SOP-SEC-001) được đóng đóng băng (Frozen). Tuyệt đối KHÔNG BẤT KỲ CƠ SỞ NÀO ĐƯỢC PHÉP ĐÈ THAM SỐ.  
*   
* **BR-GOV-003 (Strict MDM Control):** Cơ sở thành viên không có đặc quyền tạo mới các danh mục Master Data dùng chung. Mọi Yêu cầu bổ sung Món ăn mới, Loại phí mới, Môn học mới bắt buộc phải nộp MDM Creation Ticket về HQ để Data Steward thẩm định và phát hành mã MDM dùng chung toàn chuỗi.  
*   
* **BR-GOV-004 (Scope-Based BI Isolation):** Hệ thống Báo cáo BI Dashboard tự động áp dụng bộ lọc Campus Scope Filter dựa trên đặc quyền RBAC của tài khoản. Hiệu trưởng Cơ sở chỉ được xem dữ liệu của cơ sở mình. Giám đốc Vùng xem được dữ liệu các cơ sở thuộc Vùng. CEO/COO/CFO/Board xem được dữ liệu Consolidated toàn tập đoàn.  
*   
* **BR-GOV-005 (Near Real-time Aggregation Mandate):** Tiến trình tổng hợp dữ liệu từ các cơ sở về Data Warehouse bắt buộc phải hoạt động theo cơ chế Streaming/Real-time Event-Driven. Độ trễ dữ liệu tài chính và sĩ số học sinh hiển thị trên Executive Dashboard không vượt quá **05 giây**.  
* 

## **13\. Exception Cases**

* **Cơ sở M\&A mới sáp nhập có cấu trúc biểu phí/chương trình học hoàn toàn khác biệt:**  
* 

  * *Xử lý:* IT Admin thiết lập Cơ sở M\&A ở chế độ Transition Campus Mode. Hệ thống cho phép duy trì bộ Tham số Cục bộ cũ trong tối đa **06 tháng**. ERP tự động chạy Thuật toán Ánh xạ Dữ liệu (Data Mapping Engine) để quy đổi dữ liệu cơ sở cũ về chuẩn MDM của Tập đoàn khi lên Báo cáo BI Consolidated.  
  *   
* **Mất kết nối Internet/Cáp quang tại 1 Cơ sở thành viên:**  
* 

  * *Xử lý:* Dữ liệu vận hành tại cơ sở đó tự động lưu vào Local Edge Offline Cache. Ngay khi có mạng trở lại, ERP Edge Server tự động đẩy dữ liệu bù (Auto-Catchup Sync) về Data Warehouse. Màn hình BI Dashboard của HQ sẽ hiển thị nhãn cảnh báo Data Delayed (Campus X Offline) đối với chỉ số của cơ sở đó.  
  *   
* **Cần can thiệp điều chỉnh Báo cáo BI sau khi đã Chốt Sổ Kế toán Tháng:**  
* 

  * *Xử lý:* Dữ liệu BI tài chính bị khóa cứng (Period Locked). Mọi thao tác điều chỉnh sau chốt sổ bắt buộc phải chạy qua luồng Accounting Adjustment Voucher trên SOP-FIN-001 và được CFO phê duyệt. ERP tự động cập nhật lại BI Dashboard đính kèm vết Audit Log điều chỉnh.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Duyệt Yêu cầu Đề xuất Đè Tham số Cục bộ (Local Override) | Group Operations Mgr | Group COO | CFO (Nếu liên quan Phí) |
| Duyệt Khởi tạo / Thay đổi Mã Dữ liệu Mẫu (MDM Creation) | Data Steward | Head of Department HQ | N/A |
| Phê duyệt Khởi tạo & Khai trương Cơ sở Mới (Greenfield) | Group COO | Group CFO | Tổng Giám đốc (CEO) |
| Phê duyệt Quyền Xem Báo cáo BI Consolidated Toàn Chuỗi | CISO | Group COO | CEO / Board |

## **15\. Status Lifecycle**

* **Campus Status:** Planning (Greenfield) \-\> Setup (Cloning Template) \-\> Live Active \-\> Transition (M\&A) \-\> Suspended \-\> Closed.  
*   
* **Master Data (MDM) Status:** Draft \-\> Pending HQ Review \-\> Harmonized & Active \-\> Deprecated.  
*   
* **BI Report Status:** Streaming (Real-time) \-\> Period Soft-Closed \-\> Audited & Frozen.  
* 

## **16\. Data Model**

* **Primary Entity:** CompanyCampus  
* 

  * CampusID (PK, String, Unique)  
  *   
  * RegionID (FK, String), CampusName (String), CampusCode (String, Unique)  
  *   
  * LegalEntityName (String), TaxCode (String), Address (Text), PrincipalID (FK)  
  *   
  * CampusStatus (Enum: Planning, Setup, Live\_Active, Transition, Closed)  
  *   
  * MaxCapacity (Integer, Sĩ số tối đa), CurrentOccupancy (Integer, Sĩ số hiện tại)  
  *   
* **Related Entities:**  
* 

  * CampusParameterOverride: OverrideID (PK), CampusID (FK), ParameterKey (String), GlobalValue (String), OverrideValue (String), IsFrozenParam (Boolean), ApprovedBy (FK), Status (Enum).  
  *   
  * MasterDataCatalog: MDMItemID (PK), Category (Enum: Fee, Meal, Asset, Subject, Position), MDMCode (String, Unique), MDMName (String), IsActive (Boolean), CreatedByHQ (FK).  
  *   
  * EnterpriseDataWarehouse: FactID (PK, BigInt Sequence), CampusID (FK), Timestamp (DateTime UTC), Domain (Enum), MetricKey (String), MetricValue (Decimal), DimensionJSON (JSON).  
  * 

## **17\. Forms / Documents**

* FRM-GOV-001: Đơn Đề nghị Đè Tham số Cục bộ Cơ sở (Local Parameter Override Request).  
*   
* FRM-GOV-002: Phiếu Đề nghị Khởi tạo / Chuẩn hóa Dữ liệu Mẫu Tập trung (Master Data Creation Request).  
*   
* FRM-GOV-003: Báo cáo Kiểm tra Tiến độ Nhân bản & Khởi chạy Cơ sở Mới (Greenfield Campus Launch Checklist).  
*   
* FRM-GOV-004: Bảng Định nghĩa Chỉ số Báo cáo Quản trị BI Chuỗi (BI Metrics Dictionary & KPI Governance).  
* 

## **18\. ERP Functional Requirements**

* **FR-GOV-001 (MUST):** Tích hợp Phân hệ Multi-Campus Hierarchy & Parameter Engine: Hỗ trợ mô hình quản trị hình cây đa cơ sở, tự động thừa kế tham số HQ và quản lý đè tham số cục bộ có luồng duyệt.  
*   
* **FR-GOV-002 (MUST):** Tích hợp Frozen Parameter Lock: Tự động khóa cứng các tham số liên quan đến An toàn Trẻ em, PCCC, Ratio Giáo viên và Dinh dưỡng, ngăn chặn tuyệt đối mọi hành vi đè tham số tại cơ sở.  
*   
* **FR-GOV-003 (MUST):** Phân hệ 1-Click Campus Auto-Cloning: Cho phép nhân bản toàn bộ cấu hình, quy trình SOP, phân quyền RBAC từ Campus Template sang Cơ sở Mới trong dưới 60 phút.  
*   
* **FR-GOV-004 (MUST):** Tích hợp Master Data Harmonization Engine: Quản lý tập trung các danh mục MDM, chặn cơ sở tự tạo mã rác và tự động sync MDM mới về toàn chuỗi.  
*   
* **FR-GOV-005 (MUST):** Phân hệ Role-Based Interactive BI Analytics: Hỗ trợ hiển thị Dashboard trực quan real-time theo Vai trò (CEO, CFO, COO, Principal) kèm khả năng Drill-down dữ liệu đa chiều.  
*   
* **FR-GOV-006 (SHOULD):** Tính năng Executive Morning Digest: Tự động gửi Email/Push App tóm tắt các chỉ số vận hành và tài chính quan trọng nhất cho Ban Điều hành lúc 07:30 AM hàng ngày.  
* 

## **19\. Automation Opportunities**

* **AUTO-GOV-001 (RULE ENGINE):** Tự động thừa kế 100% Tham số Chuẩn từ HQ khi tạo lập Cơ sở Mới trên cây tổ chức.  
*   
* **AUTO-GOV-002 (INTEGRATION):** Tự động trích xuất và biến đổi dữ liệu (Streaming ETL) từ tất cả các cơ sở về Data Warehouse với độ trễ \<= 5 giây.  
*   
* **AUTO-GOV-003 (WORKFLOW):** Tự động gửi báo cáo tóm tắt tình hình vận hành/tài chính (Executive Morning Digest) tới CEO/COO/CFO vào 07:30 AM hàng ngày.  
*   
* **AUTO-GOV-004 (DATA MAPPING):** Tự động quy đổi và ánh xạ dữ liệu của các cơ sở M\&A mới sáp nhập về chuẩn MDM chung khi lên Báo cáo BI Tập đoàn.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo Khai trương / Kích hoạt Cơ sở Mới | Toàn bộ HQ & BGH Chuỗi | Email \+ ERP Push | Immediate khi Live Ready |
| Cảnh báo Yêu cầu Đè Tham số Cục bộ Mới | Group COO & CFO | ERP High Alert \+ Email | Immediate khi request submit |
| CẢNH BÁO VI PHẠM FROZEN PARAMETER | Group COO & CISO | ERP High Alert \+ Sound | Immediate khi có hành vi vi phạm |
| Thông báo Mã Dữ liệu Mẫu (MDM) Mới Đã Sync | Toàn bộ Kế toán / Admin | ERP Notification | Immediate khi MDM created |
| Gửi Báo cáo Giao ban Sáng (Executive Digest) | CEO, COO, CFO, Board | Email \+ Mobile App Push | 07:30 AM hàng ngày |

## **21\. Permission Matrix (RBAC)**

| Role | View Global Params | Override Params | Manage MDM | Auto-Clone Campus | Access Executive BI | Access Campus BI |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Hiệu trưởng Cơ sở | View Inherited | Request Only | Request Only | No | No | Own Campus Only |
| Giám sát Vùng (Region Mgr) | View Region | Approve Region | Request Only | No | Region Scope | Region Scope |
| Data Steward (IT HQ) | Full Enterprise | View Only | Full (Manage) | Full | Read Only | Full Enterprise |
| Group COO / CFO | Full Enterprise | Full (Approve) | Full (Approve) | Full | Full Enterprise | Full Enterprise |
| CEO / Board | Full Enterprise | Read Only | Read Only | Read Only | Full Enterprise | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi thao tác thay đổi Sơ đồ Tổ chức Cây Tập đoàn (Thêm cơ sở, sáp nhập, đóng cửa cơ sở).  
*   
* Lịch sử phê duyệt Yêu cầu Đè Tham số Cục bộ (Local Parameter Override): Người đề nghị, Người duyệt, Giá trị cũ, Giá trị mới, Lý do.  
*   
* Mọi hành vi cố tình vi phạm/chỉnh sửa Tham số Đóng băng (Frozen Parameters).  
*   
* Lịch sử khởi tạo, phê duyệt và ban hành Dữ liệu Mẫu Tập trung (MDM Logs).  
*   
* Nhật ký thực thi tiến trình 1-Click Auto-Cloning Campus Template.  
*   
* Nhật ký xem và trích xuất dữ liệu Báo cáo BI Analytics của Ban Điều hành.  
* 

## **23\. Internal Controls**

* **Frozen Parameter Gate:** Khóa cứng ở cấp độ Kernel hệ thống đối với các tham số An toàn Trẻ em và PCCC, triệt tiêu hoàn toàn nguy cơ cơ sở tự ý hạ thấp tiêu chuẩn vận hành.  
*   
* **MDM Authorization Gate:** Khóa quyền tự tạo mã danh mục tại các cơ sở, bảo đảm 100% dữ liệu đồng nhất phục vụ tổng hợp báo cáo tài chính/vận hành tập trung.  
*   
* **Scope Isolation Enforcement:** Bắt buộc áp dụng bộ lọc Scope tự động trên hệ thống BI, bảo đảm Hiệu trưởng cơ sở A không thể xem dữ liệu kinh doanh/tài chính của cơ sở B.  
*   
* **Near Real-time Data Integrity Verification:** Tự động chạy tiến trình đối soát tổng tiền và sĩ số giữa Data Warehouse và Cơ sở dữ liệu vận hành địa phương vào 24:00 PM hàng ngày để phát hiện sai lệch data.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Triển khai ERP cho Cơ sở Mới (Cloning Time)** | Thời gian từ khi bấm Clone Template đến khi Live Ready | **\<= 60 phút** | ERP System Admin |
| **Độ trễ Dữ liệu Báo cáo BI (Data Latency)** | Thời gian chênh lệch giữa giao dịch thực tế và BI Dashboard | **\<= 5 giây (Near Real-time)** | Data Architect / IT |
| **Tỷ lệ Đồng nhất Dữ liệu Mẫu (MDM Consistency Rate)** | (Số danh mục chuẩn MDM toàn chuỗi / Tổng danh mục) \* 100 | **100% (Zero Local Trash)** | Data Steward |
| **Tỷ lệ Tuân thủ Tham số An toàn Chuỗi (Safety Compliance)** | Số vi phạm tham số Frozen Parameter tại các cơ sở | **0% (Zero Tolerance)** | Group COO |
| **Tốc độ Tải Màn hình BI Dashboard (Load Time)** | Thời gian render đầy đủ các biểu đồ trên Executive BI | **\<= 2 giây** | BI Team & IT |

## **25\. Dashboard / Report**

* **Executive CEO / Board BI Dashboard:** Biểu đồ Tỷ lệ Lấp đầy Sĩ số Toàn Chuỗi (Occupancy Rate Map), Tổng Doanh thu & Dòng tiền Real-time, Chỉ số Lợi nhuận gộp (Gross Margin) theo Cơ sở, Bảng Cảnh báo An toàn & Sự cố Toàn Chuỗi.  
*   
* **CFO Financial BI Dashboard:** Báo cáo P\&L So sánh giữa các Cơ sở, Báo cáo Phân tích Tuổi nợ AR, Bảng Phân tích Chi phí Vận hành thực tế vs Ngân sách (Budget vs Actual Variance), Dự báo Dòng tiền 12 tuần.  
*   
* **COO Operations BI Dashboard:** Báo cáo Tỷ lệ Điểm danh Real-time Toàn Chuỗi, Bảng Chấm điểm Chất lượng Dịch vụ CSAT Phụ huynh, Báo cáo Tuân thủ Dinh dưỡng & Lưu mẫu Bếp ăn, Báo cáo SLA Sửa chữa Facility/PCCC.  
*   
* **Principal Campus BI Dashboard:** Màn hình quản trị 360 độ riêng biệt của Cơ sở (Sĩ số lớp, Thu tiền học phí, Tỷ lệ chuyên cần, CSAT phụ huynh, Chi phí vận hành cơ sở).  
* 

## **26\. Integration**

* **Tất cả 74 Modules ERP Mầm non (SOP-CRM-001 đến SOP-SEC-001):** Thu thập dữ liệu giao dịch biến động thời gian thực từ toàn bộ các phân hệ nghiệp vụ.  
*   
* **Enterprise Data Warehouse (EDW) & BI Engines (PowerBI / Tableau / Metabase Integration):** Kết nối API dữ liệu để trực quan hóa báo cáo quản trị nâng cao.  
*   
* **GIS & Google Maps API:** Hiển thị bản đồ nhiệt (Heatmap) mật độ học sinh, bán kính xe bus và vị trí địa lý các cơ sở mầm non thuộc chuỗi.  
*   
* **Mobile App Ban Điều Hành (Executive Mobile BI App):** Đồng bộ báo cáo BI Dashboard và gửi Executive Morning Digest.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Cơ sở tự ý hạ tiêu chuẩn an toàn/dinh dưỡng gây scandal** | Critical | Low | Khóa cứng Frozen Parameter; Cảnh báo tự động về HQ nếu phát hiện vi phạm. | Group COO & CISO |
| **Rò rỉ dữ liệu kinh doanh/tài chính giữa các Cơ sở** | Critical | Low | Bắt buộc áp dụng Scope Isolation trên BI Dashboard theo phân quyền RBAC. | IT Security & CISO |
| **Sai lệch báo cáo BI do dữ liệu rác từ các cơ sở** | High | Medium | Quản trị tập trung MDM Master Data; Bắt buộc nộp MDM Ticket về HQ. | Data Steward |
| **Hệ thống BI Dashboard bị chậm/treo giờ cao điểm** | High | Medium | Kiến trúc Kho dữ liệu EDW độc lập; Tiến trình Streaming ETL trích xuất riêng. | Data Architect & CTO |

## **28\. Acceptance Criteria**

* **Given:** Tập đoàn chuẩn bị mở thêm Cơ sở Mầm non Mới (Campus Số 12 tại Hà Nội).  
*   
* **When:** IT Admin mở phân hệ Multi-Campus Management, nhập tên Cơ sở 12 và bấm nút "1-Click Clone Campus Template".  
*   
* **Then:** Trong vòng đúng 45 phút, ERP tự động khởi tạo xong cấu trúc cây Cơ sở 12, thừa kế 100% Ma trận Biểu phí, Quy trình SOP, Phân quyền RBAC, Thực đơn mẫu và Danh mục MDM. Hệ thống gửi email sẵn sàng vận hành cho Hiệu trưởng Cơ sở 12\.  
*   
* **Given:** Hiệu trưởng Cơ sở 5 cố tình tạo Yêu cầu Đè Tham số (Local Override Request) giảm Tỷ lệ Ratio Giáo viên/Học sinh lớp Nhà trẻ từ 1GV/5 trẻ xuống 1GV/10 trẻ để tiết kiệm chi phí.  
*   
* **When:** Hiệu trưởng Cơ sở 5 bấm Submit Yêu cầu.  
*   
* **Then:** ERP lập tức khóa chặn, hiển thị thông báo lỗi: *"Tham số Tỷ lệ Ratio Giáo viên/Học sinh là Tham số Đóng băng (Frozen Parameter) thuộc tiêu chuẩn An toàn Trẻ em. Tuyệt đối không cho phép Đè Tham số"*, đồng thời phát alert cảnh báo hành vi vi phạm về Group COO.  
* 

## **29\. Test Scenarios**

1. **Happy Path Greenfield Campus Auto-Cloning Test:** Khai báo Cơ sở Mới \-\> Bấm 1-Click Auto-Clone Template \-\> Kiểm tra trong 60 phút toàn bộ cấu hình, SOP, RBAC, MDM đã sẵn sàng Live Active 100%.  
2.   
3. **Frozen Parameter Overriding Block Test:** Cố tình chọn Đè Tham số đối với Quy trình Kiểm thực Bếp ăn 3 bước hoặc Tiêu chuẩn PCCC \-\> Kiểm tra xem ERP Kernel có khóa chặn tuyệt đối không.  
4.   
5. **Near Real-time BI Data Streaming Test:** Thực hiện thu tiền học phí 15.000.000 VNĐ tại Cơ sở 3 \-\> Kiểm tra xem trong vòng 5 giây chỉ số Doanh thu Real-time trên Executive CEO BI Dashboard có tự động nhảy số tăng tương ứng không.  
6.   
7. **Multi-Campus Scope Isolation Test:** Đăng nhập tài khoản Hiệu trưởng Cơ sở 1 mở Báo cáo BI \-\> Kiểm tra xem hệ thống có chặn không cho xem bất kỳ chỉ số nào của Cơ sở 2 không (Campus Scope Isolation Pass).  
8.   
9. **Executive Morning Digest Automation Test:** Đặt đồng hồ hệ thống 07:30 AM \-\> Kiểm tra xem ERP có tự động gửi Email/Push App Báo cáo Giao ban Sáng chứa đúng các chỉ số Occupancy, Cash Flow và Safety Alerts tới CEO/COO/CFO không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình Cây Tổ chức Tập đoàn; Cấu hình Bộ Tham số Chuẩn Baseline và danh mục Frozen Parameters; Cấu hình quy tắc phân quyền Scope BI Dashboard; Cấu hình lịch gửi Executive Morning Digest (07:30 AM).  
*   
* **Master Data Migration:** Chuẩn hóa và hợp nhất danh mục MDM (Loại phí, Món ăn, Vật tư, Sơ đồ tài khoản Kế toán) từ tất cả các cơ sở hiện hữu về một Repository duy nhất trước khi Go-Live.  
*   
* **Hardware & Integration:** Kiến trúc Kho Dữ liệu Tập trung (Enterprise Data Warehouse \- EDW) trên hạ tầng Cloud phân tán; Kết nối API với các công cụ BI Analytics chuyên sâu (PowerBI/Tableau/Metabase).  
*   
* **Training & Change Management:** Đào tạo Ban Điều hành Tập đoàn (CEO/COO/CFO) kỹ năng sử dụng và tương tác Drill-down trên BI Dashboard; Đào tạo Hiệu trưởng các cơ sở quy trình nộp MDM Ticket và quản trị vận hành theo chỉ số KPI hiển thị trên Dashboard.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (15 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  10.   
  11. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  12.   
  13. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  14.   
  15. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  16.   
  17. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  18.   
  19. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  20.   
  21. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  22.   
  23. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  24.   
  25. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  26.   
  27. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  28.   
  29. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  30.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **10 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│                                │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
│                                │                                │                                │ • SOP-GOV-001: Multi-Campus │  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 18

# **SOP-QA-001 — QUY TRÌNH KIỂM ĐỊNH CHẤT LƯỢNG GIÁO DỤC, ĐÁNH GIÁ TIÊU CHUẨN VẬN HÀNH CƠ SỞ (QUALITY ASSURANCE) VÀ KIỂM TOÁN VẬN HÀNH NỘI BỘ**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-QA-001  
*   
* **Tên SOP:** Quy trình Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (Quality Assurance) và Kiểm toán Vận hành Nội bộ  
*   
* **Module ERP:** Quality Assurance (66), Compliance Management (67), Risk Management (68), Internal Audit (69), Management Dashboard & BI (70), Multi-campus Management (71)  
*   
* **Process Owner:** Trưởng phòng Đảm bảo Chất lượng & Kiểm toán Nội bộ (Group QA & Internal Audit Director)  
*   
* **Department:** Khối Đảm bảo Chất lượng (QA/QC), Phòng Kiểm toán Nội bộ Tập đoàn, Ban Giám hiệu các Cơ sở  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Tổng Giám đốc (CEO) / Board of Directors  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ chu trình đánh giá kiểm định chất lượng giáo dục và kiểm toán vận hành nội bộ (Internal Operational Audit) tại các cơ sở mầm non thuộc hệ thống: từ việc lập bộ Tiêu chí Đánh giá Chất lượng Vận hành 360 độ (Bao gồm 06 trụ cột: An toàn & Y tế, Dinh dưỡng & Bếp ăn, Chất lượng Giảng dạy, Dịch vụ Khách hàng & Tuyển sinh, Quản trị Tài chính & Nhân sự, An toàn PCCC & Cơ sở vật chất), lên lịch và thực hiện đợt Kiểm toán Đột xuất/Định kỳ trên App Mobile, khởi tạo và theo dõi các Khắc phục Khẩn cấp (Corrective and Preventive Action \- CAPA), đến việc chấm điểm xếp hạng Cơ sở (Campus Quality Index) và tổng hợp báo cáo rủi ro vận hành gửi Ban Điều hành Tập đoàn.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thành viên và các đơn vị vận chuyển (School Bus), Bếp ăn bán trú thuộc hệ thống.  
*   
* **Phòng ban:** Khối Đảm bảo Chất lượng (QA), Đội ngũ Auditor Nội bộ, Ban Giám hiệu các Cơ sở, Bộ phận Bếp ăn, Y tế học đường, Xe bus, Facility, Tuyển sinh, Kế toán.  
*   
* **Đối tượng:** Tất cả các hoạt động vận hành thực địa, hồ sơ pháp lý, quy trình chăm sóc/giảng dạy và tính tuân thủ SOP của Cán bộ Giáo viên Nhân viên (CBGVNV).  
*   
* **Trường hợp không áp dụng:** Kiểm toán tài chính độc lập theo chuẩn mực kế toán quốc tế do các Công ty Kiểm toán Bên ngoài thực hiện (áp dụng SOP-FIN-008: Kiểm toán Báo cáo Tài chính Độc lập).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Quality Assurance (QA) Audit:** Đợt kiểm tra, đánh giá mức độ tuân thủ tiêu chuẩn chất lượng vận hành trường mầm non theo bộ chỉ số do Tập đoàn ban hành.  
*   
* **CAPA (Corrective and Preventive Action \- Hành động Khắc phục & Phòng ngừa):** Yêu cầu cải tiến bắt buộc có gán thời hạn (SLA) gửi Hiệu trưởng/Trưởng bộ phận cơ sở để sửa chữa các vi phạm/sơ hở vận hành phát hiện sau đợt kiểm toán.  
*   
* **Campus Quality Index (CQI \- Chỉ số Chất lượng Cơ sở):** Điểm số tổng hợp 360 độ (Thang điểm 100\) xếp hạng chất lượng vận hành của cơ sở mầm non dựa trên kết quả Audit thực địa và chỉ số hài lòng CSAT của Phụ huynh.  
*   
* **Unannounced Spot-Check (Kiểm toán Đột xuất):** Đợt kiểm tra thực địa không báo trước của Đội QA nhằm ghi nhận hiện trạng vận hành thực tế tại cơ sở (Đặc biệt tập trung vào An toàn Bếp ăn, Đón trả trẻ và PCCC).  
*   
* **Red-Flag Violation (Vi phạm Cờ đỏ Chí mạng):** Các hành vi vi phạm nghiêm trọng tiêu chuẩn an toàn mầm non (Bỏ quên trẻ, bạo lực học đường, ngộ độc thực phẩm, vi phạm PCCC nghiêm trọng, gian lận tài chính) dẫn đến việc đình chỉ ngay lập tức hoặc phạt kỷ luật nặng.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Xây dựng Bảng Tiêu chí QA Audit & Cấu hình Checklist trên ERP | Chuyên viên QA Chuỗi | Group QA Director | Academic Dir / COO | Hiệu trưởng các Cơ sở |
| Lập Lịch Audit Định kỳ & Kích hoạt Đợt Kiểm toán Đột xuất | QA Auditor / Auditor | Group QA Director | Group COO | Hiệu trưởng Cơ sở |
| Thực hiện Audit Thực địa trên Mobile App & Ghi nhận Vi phạm | QA Auditor / Auditor | Group QA Director | Nhân viên Cơ sở | BGH Cơ sở |
| Phê duyệt Báo cáo Audit & Khởi tạo Yêu cầu CAPA | QA Auditor / QA Mgr | Group QA Director | CEO / COO | Hiệu trưởng Cơ sở |
| Thực hiện Khắc phục CAPA & Tải Bằng chứng Lên App | Hiệu trưởng Cơ sở / Head | Hiệu trưởng Cơ sở | QA Auditor | Group COO |
| Re-audit Nghiệm thu CAPA & Chốt Điểm CQI Cơ sở | QA Auditor | Group QA Director | COO / CFO | CEO / Board |

*Ghi chú: Việc đánh giá tiêu chuẩn trường mầm non đạt chuẩn quốc gia, kiểm tra an toàn vệ sinh thực phẩm, kiểm tra điều kiện PCCC và xử lý vi phạm kỷ luật lao động cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo, Bộ Y tế, Bộ Công an và Bộ Lao động \- Thương binh & Xã hội trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Bộ Tiêu chí Audit Chất lượng (QACriteriaMaster), Danh mục Cơ sở (CampusMaster), Danh mục Mức độ Vi phạm (SeverityCategoryMaster), Ma trận SLA Khắc phục CAPA (CAPASLAMaster).  
*   
* **Thiết bị Audit:** Mobile App QA/Auditor dành cho Auditor có kết nối 4G/5G, tính năng chụp ảnh/quay video định vị GPS thời gian thực.  
*   
* **Trigger Lịch:** Đợt Audit định kỳ theo Kế hoạch Năm hoặc Đơn phát sinh sự cố khẩn cấp (Critical Incident).  
* 

## **7\. Trigger**

* **Định kỳ:** Kế hoạch QA Audit hàng tháng / hàng quý của Tập đoàn.  
*   
* **Đột xuất (Unannounced):** Do AI/Rule Engine trên ERP phát hiện bất thường (CSAT Phụ huynh giảm đột ngột, có phản ánh khiếu nại Cấp độ 3, hoặc chọn ngẫu nhiên từ hệ thống).  
*   
* **Sự cố Nghiêm trọng:** Kích hoạt ngay đợt Special Audit khi phát sinh Sự cố An toàn Y tế (SOP-MED-001) hoặc Sự cố Bếp ăn (SOP-KIT-001).  
* 

## **8\. Quy trình AS-IS**

* Chuyên viên QA cầm bảng in giấy checklist gồm 50–100 câu hỏi xuống cơ sở, đi quanh trường dùng bút tích chọn và ghi chép tay.  
*   
* Chụp ảnh vi phạm bằng điện thoại cá nhân, về văn phòng ngồi gõ lại vào file Word/Excel báo cáo, gửi email cho Hiệu trưởng cơ sở yêu cầu sửa chữa.  
*   
* Hiệu trưởng nhận file Excel, phân công nhân viên sửa rồi chụp ảnh gửi lại qua nhóm Zalo cho QA.  
*   
* QA ngồi dò từng tin nhắn Zalo để xác nhận xem cơ sở đã sửa xong chưa, tự tính điểm bằng Excel rồi gửi báo cáo cho CEO cuối tháng.  
*   
* **Hệ quả:** Báo cáo chậm từ 5–7 ngày; hình ảnh chứng cứ vi phạm thất lạc; cơ sở sửa chữa đối phó; không có công cụ tự động đếm ngược SLA khắc phục CAPA; Ban Giám đốc không có bức tranh toàn cảnh về chỉ số an toàn thực tế của các cơ sở.  
* 

## **9\. Pain Points / Risk**

* **Compliance & Cover-up Risk (Mối nguy Che giấu Vi phạm):** Cơ sở biết trước lịch kiểm tra nên dọn dẹp đối phó; các vi phạm cờ đỏ (bình chữa cháy hết hạn, thực phẩm bếp ăn thiếu tem, rò điện) bị bỏ qua hoặc sửa chữa hình thức.  
*   
* **Delayed Corrective Action:** Vi phạm an toàn phát hiện nhưng mất nhiều tuần không được khắc phục do thiếu hệ thống cảnh báo SLA CAPA tự động.  
*   
* **Subjective QA Rating:** Chấm điểm mang tính cảm tính của Auditor, thiếu minh chứng hình ảnh/video cố định tọa độ GPS và Timestamp.  
*   
* **Data Fragmentation:** Dữ liệu kiểm toán nằm rải rác ở các file Excel cá nhân, không tích hợp với Báo cáo BI Dashboard Tập đoàn (SOP-GOV-001).  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Thiết lập Bộ Tiêu chí QA, Cấu hình Lịch & Kích hoạt Audit (Criteria Setup & Audit Initiation)**

* **Step 01:**  
* 

  * **Actor:** Chuyên viên QA Chuỗi & Group QA Director.  
  *   
  * **Action:** Khai báo Bộ Tiêu chí Đánh giá QA 360 độ trên ERP, chia thành 06 Trụ cột Vận hành:  
  * 

    1. *An toàn, Y tế & Safeguarding (Trọng số 25% \- Cờ đỏ)*  
    2.   
    3. *An toàn Thực phẩm & Bếp ăn (Trọng số 25% \- Cờ đỏ)*  
    4.   
    5. *An toàn PCCC & Cơ sở Vật chất (Trọng số 20% \- Cờ đỏ)*  
    6.   
    7. *Chất lượng Giảng dạy & Chăm sóc Trẻ (Trọng số 15%)*  
    8.   
    9. *Dịch vụ Khách hàng & Tuyển sinh (Trọng số 10%)*  
    10.   
    11. *Tuân thủ Tài chính & Nhân sự (Trọng số 5%)*  
    12.   
  * **ERP Function:** QA Framework & Weighted Checklist Configuration.  
  *   
  * **Input:** Bộ Tiêu chí, Trọng số điểm, Phân loại Vi phạm (Cờ đỏ, Nặng, Trung bình, Nhẹ).  
  *   
  * **Output:** Khung Tiêu chí Audit chuẩn (Active QA Audit Baseline).  
  *   
  * **Business Rule:** BR-QA-001: Bất kỳ vi phạm nào thuộc nhóm **Vi phạm Cờ đỏ (Red-Flag)** sẽ tự động trừ thẳng 20–50 điểm CQI và kích hoạt ngay Lệnh Khắc phục Khẩn cấp (Emergency CAPA).  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** QA Framework Active.  
  *   
  * **SLA:** Complete trước kỳ audit 05 ngày.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** Group QA Director & ERP System.  
  *   
  * **Action:** Trưởng phòng QA khởi tạo Đợt Audit trên ERP. Đối với Audit Định kỳ, hệ thống báo trước cho cơ sở 24 giờ. Đối với **Audit Đột xuất (Unannounced Spot-Check)**, ERP hoàn toàn giấu lịch, chỉ phát thông báo tới App của Auditor trước giờ đến cơ sở 30 phút.  
  *   
  * **ERP Function:** Audit Scheduling & Unannounced Dispatcher.  
  *   
  * **Input:** Cơ sở được audit, Loại audit (Định kỳ/Đột xuất), Auditor phân công.  
  *   
  * **Output:** Đợt Audit được kích hoạt (Audit Job Initiated).  
  *   
  * **Business Rule:** BR-QA-002: Đợt Audit Đột xuất không được báo trước cho cơ sở dưới bất kỳ hình thức nào. Màn hình Kiosk Lễ tân cơ sở chỉ nhận thông báo khi Auditor có mặt tại cổng và quét mã QR Check-in.  
  *   
  * **Status Before:** Scheduled.  
  *   
  * **Status After:** Audit Initiated / Auditor Dispatched.  
  *   
  * **SLA:** Tự động phát lệnh theo schedule.  
  *   
  * **Notification:** Push Notification gửi Tablet Auditor.  
  * 

### **Giai đoạn 2: Thực hiện Audit Thực địa trên Mobile App & Ghi nhận Vi phạm (Field Audit Execution)**

* **Step 03:**  
* 

  * **Actor:** QA Auditor / Auditor Nội bộ.  
  *   
  * **Action:** Auditor đến cơ sở, quét mã QR Check-in tại cổng trường. Mở App Mobile QA, đi qua các khu vực (Bếp ăn, Lớp học, Phòng Y tế, Sân chơi, Trạm PCCC), tích chọn từng tiêu chí (Đạt / Không Đạt / Không Áp Dụng). Đối với tiêu chí "Không Đạt", App **BẮT BUỘC** yêu cầu chụp 01 ảnh/video minh chứng thực tế và ghi chú mô tả lỗi.  
  *   
  * **ERP Function:** Mobile Field Audit & Evidence Capture.  
  *   
  * **Input:** Đánh giá từng tiêu chí, Ảnh chụp thực tế đính kèm GPS & Timestamp, Ghi chú lỗi.  
  *   
  * **Output:** Bảng dữ liệu Audit thực địa (Field Audit Data Captured).  
  *   
  * **Business Rule:** BR-QA-003: Mọi ảnh chụp bằng chứng vi phạm trên App QA đều được đóng dấu chìm (Watermark) Tọa độ GPS, Thời gian thực (Timestamp) và Mã đợt Audit. Tuyệt đối không cho phép tải ảnh từ Thư viện ảnh điện thoại (Must capture live).  
  *   
  * **Status Before:** Audit Initiated.  
  *   
  * **Status After:** Field Audit Completed.  
  *   
  * **SLA:** \<= 3 giờ làm việc tại cơ sở.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 04:**  
* 

  * **Actor:** QA Auditor & Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Sau khi hoàn tất kiểm tra, Auditor bấm "Tổng hợp Kết quả". ERP tự động tính toán Điểm CQI tạm tính và hiển thị danh sách các lỗi vi phạm. Hiệu trưởng Cơ sở cùng Auditor review biên bản tại chỗ và ký chữ ký điện tử xác nhận trên App.  
  *   
  * **ERP Function:** Audit Score Calculation & On-site Digital Signature.  
  *   
  * **Input:** Field Audit Data \+ Chữ ký điện tử 2 bên.  
  *   
  * **Output:** Biên bản Audit Thực địa có chữ ký (Signed Audit Report).  
  *   
  * **Business Rule:** Nếu Hiệu trưởng Cơ sở không đồng ý với lỗi vi phạm, có quyền bấm "Khai báo Khiếu nại" (Dispute Violation) và nhập lý do. ERP ghi nhận trạng thái Tranh chấp để Group QA Director phân xử.  
  *   
  * **Status Before:** Field Audit Completed.  
  *   
  * **Status After:** Audit Report Signed & Submitted.  
  *   
  * **SLA:** Complete trong 30 phút sau khi kiểm tra xong.  
  *   
  * **Notification:** Biên bản tự động gửi Email tới BGH Cơ sở và Group COO.  
  * 

### **Giai đoạn 3: Khởi tạo, Phê duyệt & Đếm ngược SLA Khắc phục CAPA (CAPA Workflow & SLA Tracking)**

* **Step 05:**  
* 

  * **Actor:** ERP System (Auto CAPA Generator Engine) & QA Manager.  
  *   
  * **Action:** Ngay khi Biên bản Audit được nộp, ERP tự động trích xuất tất cả các lỗi "Không Đạt" và khởi tạo các Yêu cầu Khắc phục CAPA (CAPA Tickets) tương ứng. ERP gán hạn chót xử lý (SLA CAPA) dựa trên Cấp độ Vi phạm:  
  * 

    * *Vi phạm Cờ đỏ (Red-Flag):* SLA khắc phục trong **04 giờ** (Khẩn cấp).  
    *   
    * *Vi phạm Nặng (Major):* SLA khắc phục trong **24 giờ**.  
    *   
    * *Vi phạm Trung bình / Nhẹ (Minor):* SLA khắc phục trong **03 – 07 ngày**.  
    *   
  * **ERP Function:** Automated CAPA Ticket Generation & SLA Countdown.  
  *   
  * **Input:** Signed Audit Report \+ Quy tắc CAPA SLA Master.  
  *   
  * **Output:** Danh sách CAPA Tickets gán cho Hiệu trưởng Cơ sở.  
  *   
  * **Business Rule:** BR-QA-004: Các lỗi vi phạm Cờ đỏ liên quan đến An toàn (Rò điện, PCCC, Bếp ăn bẩn, Rò gas) bắt buộc phải cử người phong tỏa/sửa chữa ngay lập tức. Quá hạn SLA CAPA Cờ đỏ, ERP tự động phát Báo động Bật còi đỏ về điện thoại CEO và COO.  
  *   
  * **Status Before:** Audit Report Signed.  
  *   
  * **Status After:** CAPA Issued / SLA Countdown Active.  
  *   
  * **SLA:** Real-time (\<= 1 phút).  
  *   
  * **Notification:** Push Notification khẩn gửi Hiệu trưởng Cơ sở và Trưởng bộ phận liên quan.  
  *   
* **Step 06:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở / Trưởng bộ phận Cơ sở.  
  *   
  * **Action:** Cơ sở thực hiện sửa chữa vi phạm thực tế. Sau khi hoàn thành, Hiệu trưởng mở App QA, chọn CAPA Ticket tương ứng, chụp ảnh/video minh chứng đã khắc phục xong (Proof of Rectification) và bấm "Nộp Báo cáo Khắc phục".  
  *   
  * **ERP Function:** CAPA Rectification Submission & Proof Upload.  
  *   
  * **Input:** Ảnh/Video chứng minh đã khắc phục \+ Ghi chú xử lý.  
  *   
  * **Output:** CAPA ở trạng thái Chờ nghiệm thu (CAPA Pending Verification).  
  *   
  * **Status Before:** CAPA Issued.  
  *   
  * **Status After:** CAPA Rectified / Pending Verification.  
  *   
  * **SLA:** Tuân thủ đúng SLA đếm ngược của CAPA.  
  *   
  * **Notification:** Alert gửi QA Auditor thụ lý case.  
  * 

### **Giai đoạn 4: Nghiệm thu CAPA, Chốt Điểm CQI & Báo cáo BI Dashboard (Verification, CQI Finalization & BI Sync)**

* **Step 07:**  
* 

  * **Actor:** QA Auditor / Group QA Director.  
  *   
  * **Action:** Auditor kiểm tra minh chứng hình ảnh (hoặc tiến hành Re-audit thực địa nếu là lỗi Cờ đỏ). Nếu đạt, bấm "Xác nhận Đóng CAPA" (Approve & Close CAPA).  
  *   
  * **ERP Function:** CAPA Verification & CQI Score Finalization Engine.  
  *   
  * **Input:** CAPA Proof \+ Đánh giá của Auditor.  
  *   
  * **Output:** CAPA Closed \-\> Điểm CQI chính thức của Cơ sở được chốt (Final Campus Quality Index).  
  *   
  * **Business Rule:** BR-QA-005: Điểm CQI Cơ sở được tính theo công thức: CQI Final \= Điểm Audit Khung \- Điểm Trừ Vi Phạm \+ Điểm Bổ Sung Khắc Phục Đúng Hạn SLA. Nếu điểm CQI \< 70/100, Cơ sở tự động bị xếp loại Quality Warning và bắt buộc trải qua đợt Re-audit toàn diện sau 14 ngày.  
  *   
  * **Status Before:** CAPA Rectified.  
  *   
  * **Status After:** CAPA Closed & CQI Finalized.  
  *   
  * **SLA:** Max 24 giờ sau khi cơ sở nộp bằng chứng.  
  *   
  * **Notification:** Báo cáo CQI chính thức đồng bộ sang SOP-GOV-001 (BI Dashboard) và gửi Email cho CEO/COO.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Cấu Hình Khung Tiêu Chí QA 360° (6 Trụ Cột Vận Hành)\]  
       │  
       ▼  
\[Kích Hoạt Đợt Audit: Định Kỳ (Báo Trước 24h) HOẶC Đột Xuất (Báo Trước 30 phút)\]  
       │  
       ▼  
\[Auditor Đến Cơ Sở: Quét Mã QR Check-in Tại Cổng Trường\]  
       │  
       ▼  
\[Thực Hiện Audit Thực Địa Trên App Mobile ──► Bắt Buộc Chụp Ảnh Live \+ Watermark GPS/Time\]  
       │  
       ▼  
\[Hiệu Trưởng & Auditor Review Điểm Tạm Tính ──► Ký Chữ Ký Điện Tử Báo Cáo\]  
       │  
       ◇ Hiệu trưởng Khiếu nại Vi phạm (Dispute)?  
       ├─ YES ──► \[Ghi Nhận Cờ Tranh Chấp ──► Group QA Director Phân Xử\]  
       └─ NO  ──┐  
                │  
                ▼  
\[ERP Auto CAPA Generator Engine: Tự Động Trích Xuất Lỗi ──► Sinh CAPA Tickets\]  
       │  
       ▼  
\[Đếm Ngược SLA Khắc Phục CAPA (Cờ đỏ: 4h | Nặng: 24h | Thường: 3-7 ngày)\]  
       │  
       ◇ Cơ sở Quá Hạn SLA CAPA Cờ Đỏ?  
       ├─ YES ──► \[ERP BẬT CÒI BÁO ĐỘNG ĐỎ VỀ PHONE CEO & COO\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Cơ Sở Khắc Phục Thực Tế ──► Chụp Ảnh Minh Chứng Lên App ──► Nộp Báo Cáo\]  
                │  
                ▼  
\[QA Auditor Review / Re-audit ──► Bấm "Approve & Close CAPA"\]  
                │  
                ▼  
\[ERP Finalize Điểm CQI ──► Auto Sync Dữ Liệu Lên BI Dashboard (SOP-GOV-001)\]  
                │  
                ▼  
           \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-QA-001 (Red-Flag Zero Tolerance):** Các vi phạm thuộc danh mục Cờ đỏ (Bỏ quên trẻ, bạo lực học đường, ngộ độc thực phẩm, vi phạm PCCC nghiêm trọng, rò rỉ điện, thực phẩm bẩn) sẽ lập tức kích hoạt trạng thái **Cảnh báo Đỏ Tập đoàn (Group Red Alert)**. Cơ sở bị trừ thẳng 30 điểm CQI và Hiệu trưởng phải giải trình trực tiếp trước CEO trong 24 giờ.  
*   
* **BR-QA-002 (Live Evidence Mandate):** 100% hình ảnh/video bằng chứng vi phạm hoặc bằng chứng khắc phục CAPA bắt buộc phải được chụp/quay trực tiếp từ Camera tích hợp trên Mobile App QA. Hệ thống khóa hoàn toàn tính năng tải ảnh từ thư viện thiết bị để chống gian lận.  
*   
* **BR-QA-003 (Strict CAPA SLA):** Hạn chót khắc phục CAPA gán cứng theo cấp độ: Cờ đỏ (4 giờ), Nặng (24 giờ), Trung bình (3 ngày), Nhẹ (7 ngày). Quá hạn SLA mà chưa có bằng chứng khắc phục hợp lệ, ERP tự động trừ thêm điểm phạt Overdue Penalty vào điểm CQI của cơ sở và báo cáo Ban Điều hành.  
*   
* **BR-QA-004 (Auditor Rotation Rule):** Để đảm bảo tính khách quan minh bạch, một QA Auditor không được phép thực hiện Audit định kỳ tại cùng một cơ sở quá **02 lần liên tiếp**. ERP tự động xoay vòng phân công Auditor.  
*   
* **BR-QA-005 (CQI & Management KPI Linkage):** Điểm Chất lượng Cơ sở (CQI) được đồng bộ trực tiếp làm trọng số 30% trong Bảng Đánh giá Hiệu suất (KPI / Performance Review theo SOP-HR-001) hàng quý của Hiệu trưởng Cơ sở và Ban Giám hiệu.  
* 

## **13\. Exception Cases**

* **Hiệu trưởng Cơ sở từ chối ký Biên bản Audit Thực địa:**  
* 

  * *Xử lý:* Auditor chọn trạng thái Principal Refused to Sign, đính kèm ghi chú lý do từ chối. ERP tự động phát alert gửi Group QA Director và Group COO. Đợt Audit vẫn được công nhận hiệu lực và các Yêu cầu CAPA vẫn tự động phát hành đếm ngược SLA.  
  *   
* **Lỗi vi phạm cần chi phí sửa chữa lớn/kéo dài (Ví dụ: Cải tạo lại toàn bộ hệ thống thoát nước bếp ăn):**  
* 

  * *Xử lý:* Hiệu trưởng Cơ sở nộp Đề xuất Gia hạn CAPA (CAPA Extension Request) đính kèm Yêu cầu Mua sắm PR (SOP-PUR-001). Yêu cầu gia hạn phải được Group QA Director và COO phê duyệt trên ERP mới được tạm dừng đồng hồ đếm ngược SLA.  
  *   
* **Nghi ngờ Auditor nhẫn hối lộ / Chấm điểm nương tay / Gian lận kết quả:**  
* 

  * *Xử lý:* CEO hoặc COO kích hoạt Đợt Kiểm toán Độc lập (Blind Re-audit). Một Đội Auditor độc lập thứ 2 được cử xuống kiểm tra lại 100% các tiêu chí trong vòng 48 giờ. Nếu phát hiện sai lệch điểm \> 15%, ERP ghi nhận sự cố vi phạm đạo đức đối với Auditor thứ nhất và khởi tạo quy trình kỷ luật HR.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Khung Tiêu chí QA Audit Chuỗi | QA Manager | Group QA Director | Group COO |
| Phê duyệt Báo cáo Audit & Khởi tạo CAPA | QA Auditor | QA Manager | N/A |
| Duyệt Khiếu nại Vi phạm của Cơ sở (Dispute Review) | QA Manager | Group QA Director | Group COO |
| Phê duyệt Gia hạn SLA Khắc phục CAPA | QA Manager | Group QA Director | Group COO |
| Phê duyệt Chốt Điểm CQI & Xếp loại Cơ sở | QA Manager | Group QA Director | Group CEO / COO |

## **15\. Status Lifecycle**

* **Audit Job Status:** Scheduled \-\> Auditor Dispatched \-\> On-site Auditing \-\> Report Signed \-\> CAPA Pending \-\> Completed / Closed.  
*   
* **CAPA Ticket Status:** Issued \-\> In Progress (Rectifying) \-\> Pending Verification \-\> Re-auditing \-\> Closed (Resolved) \-\> Overdue Escalated.  
*   
* **CQI Rating Status:** Draft Score \-\> Disputed \-\> Adjusted \-\> Finalized & Published.  
* 

## **16\. Data Model**

* **Primary Entity:** QAAuditJob  
* 

  * AuditJobID (PK, String, Unique)  
  *   
  * CampusID (FK, String), AuditorID (FK, String)  
  *   
  * AuditType (Enum: Scheduled, Unannounced, Special\_Incident, Re\_Audit)  
  *   
  * AuditDate (Date), CheckInTimestamp (DateTime), CheckOutTimestamp (DateTime)  
  *   
  * InitialCQIScore (Decimal), FinalCQIScore (Decimal)  
  *   
  * PrincipalSignatureURL (String), AuditStatus (Enum)  
  *   
* **Related Entities:**  
* 

  * QAAuditDetail: DetailID (PK), AuditJobID (FK), CriteriaID (FK), Status (Enum: Pass, Fail, NA), Severity (Enum: RedFlag, Major, Minor), LivePhotoURL (String), GPSLatitude (Decimal), GPSLongitude (Decimal), AuditorNote (Text).  
  *   
  * CAPATicket: CAPAID (PK), AuditJobID (FK), DetailID (FK), CampusID (FK), ResponsiblePersonID (FK), Severity (Enum), DueDate (DateTime), RectificationPhotoURL (String), RectificationNote (Text), CAPAStatus (Enum: Issued, Rectified, Verified, Overdue, Closed).  
  *   
  * CampusCQIHistory: CQIHistoryID (PK), CampusID (FK), AuditJobID (FK), Period (String), FinalScore (Decimal), GradeRank (Enum: Excellent, Good, Average, Warning, Critical), PublishedAt (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-QA-001: Khung Tiêu chí Kiểm định Chất lượng Vận hành Mầm non 360° (Digital QA Checklist).  
*   
* FRM-QA-002: Biên bản Kiểm toán Thực địa & Xác nhận Vi phạm (On-site Audit Report & Digital Sign).  
*   
* FRM-QA-003: Yêu cầu Khắc phục & Phòng ngừa Vi phạm (CAPA Rectification Ticket).  
*   
* FRM-QA-004: Báo cáo Xếp hạng Điểm Chất lượng Cơ sở (Campus Quality Index \- CQI Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-QA-001 (MUST):** Hỗ trợ App Mobile QA cho phép Auditor quét mã QR Check-in cổng trường, thực hiện tích chọn checklist offline/online và bắt buộc chụp ảnh live đính kèm Watermark GPS & Timestamp.  
*   
* **FR-QA-002 (MUST):** Tích hợp Auto CAPA Generation Engine: Tự động trích xuất các lỗi "Fail" thành các CAPA Tickets và gán đồng hồ đếm ngược SLA khắc phục theo mức độ nghiêm trọng.  
*   
* **FR-QA-003 (MUST):** Tích hợp Unannounced Audit Dispatcher: Cho phép bảo mật lịch audit đột xuất, chỉ phát thông báo cho Auditor trước 30 phút.  
*   
* **FR-QA-004 (MUST):** Tự động tính toán Điểm CQI 360 độ theo trọng số 06 trụ cột vận hành và đồng bộ dữ liệu real-time lên SOP-GOV-001 (BI Dashboard).  
*   
* **FR-QA-005 (SHOULD):** Thuật toán Auditor Rotation Logic: Tự động cảnh báo và ngăn chặn phân công 1 Auditor kiểm tra 1 cơ sở quá 2 lần liên tiếp.  
* 

## **19\. Automation Opportunities**

* **AUTO-QA-001 (RULE ENGINE):** Tự động chuyển đổi các lỗi kiểm toán "Fail" thành các CAPA Tickets gán cho Hiệu trưởng Cơ sở ngay khi biên bản audit được ký.  
*   
* **AUTO-QA-002 (NOTIFICATION):** Tự động phát còi báo động đỏ khẩn cấp tới điện thoại CEO/COO khi phát hiện Vi phạm Cờ đỏ hoặc khi CAPA Cờ đỏ bị quá hạn SLA.  
*   
* **AUTO-QA-003 (INTEGRATION):** Tự động đồng bộ Điểm CQI Cơ sở làm trọng số tính KPI đánh giá hiệu suất của Hiệu trưởng trên Phân hệ HR (SOP-HR-001).  
*   
* **AUTO-QA-004 (AI ANALYTICS):** Tự động phân tích xu hướng vi phạm (Trend Analysis) để phát hiện các lỗi hệ thống lặp đi lặp lại tại nhiều cơ sở (Ví dụ: Lỗi bảo quản thực phẩm bếp ăn lặp lại ở 4 cơ sở) để cảnh báo Ban Điều hành.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo Lịch Audit Đột xuất cho Auditor | QA Auditor | Mobile App Push | 30 phút trước giờ Audit |
| Thông báo Khởi tạo Lệnh CAPA Khắc phục Mới | Hiệu trưởng Cơ sở | Mobile App Push \+ ERP Alert | Immediate khi Audit signed |
| CẢNH BÁO VI PHẠM CỜ ĐỎ (Red-Flag Alert) | CEO, COO, Group QA Dir | Loud Sound Alarm \+ SMS | Immediate khi Auditor chọn Fail |
| CẢNH BÁO QUÁ HẠN SLA CAPA (CAPA Overdue) | Hiệu trưởng & Group QA Dir | ERP High Alert \+ App Push | At SLA Expiry Timestamp |
| Thông báo Báo cáo CQI Chính thức Được Xuất bản | CEO, COO, BGH Cơ sở | Email \+ BI Dashboard Sync | Immediate khi CQI finalized |

## **21\. Permission Matrix (RBAC)**

| Role | View QA Criteria | Execute Field Audit | Sign Audit Report | Rectify CAPA | Verify & Close CAPA | View CQI BI Dashboard |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Hiệu trưởng Cơ sở | Campus Read | No | Full (Campus) | Full (Rectify) | No | Own Campus Only |
| QA Auditor | Full Enterprise | Full Assigned | Full Assigned | No | Full Assigned | Full Enterprise |
| Group QA Director | Full Enterprise | Full Enterprise | Full Enterprise | No | Full Enterprise | Full Enterprise |
| Group COO / CEO | Full Enterprise | Read Only | View Only | View Only | Override | Full Enterprise |
| Internal Auditor | Full Enterprise | Read Only | View Only | No | Read Only | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi đợt Audit: Người thực hiện, Thời gian Check-in/Check-out tại cổng trường (GPS Verified), Mã đợt audit.  
*   
* Từng tiêu chí đánh giá: Trạng thái Pass/Fail, Ảnh chụp minh chứng gốc (Lưu URL, Metadata GPS/Time), Ghi chú của Auditor.  
*   
* Nhật ký Khiếu nại Vi phạm của Hiệu trưởng (Dispute Logs): Thời gian khiếu nại, Nội dung khiếu nại, Kết quả phân xử của QA Director.  
*   
* Toàn bộ lịch sử khắc phục CAPA: Ảnh minh chứng sửa chữa của cơ sở, Thời gian nộp, Người nghiệm thu đóng CAPA.  
*   
* Lịch sử điều chỉnh/chấm điểm lại CQI và lý do can thiệp.  
* 

## **23\. Internal Controls**

* **Live App Capture Control:** Khóa hoàn toàn tính năng tải ảnh từ thư viện thiết bị, bắt buộc 100% bằng chứng vi phạm/khắc phục phải chụp trực tiếp từ Camera App QA có gắn Watermark GPS & Time.  
*   
* **Dual-Sign Mandate:** Biên bản Audit thực địa bắt buộc phải có chữ ký điện tử xác nhận của 2 bên: QA Auditor \+ Hiệu trưởng Cơ sở (hoặc Đại diện BGH).  
*   
* **Auditor Rotation Enforcement:** Hệ thống tự động khóa không cho phân công 1 Auditor kiểm tra 1 cơ sở quá 2 lần liên tiếp để chống tiêu cực/thông đồng.  
*   
* **Automatic CQI Score Lock:** Điểm CQI sau khi chốt sẽ bị khóa cứng, mọi thao tác sửa điểm phải có phê duyệt của Group QA Director và CEO.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Khắc phục CAPA Cờ đỏ (Red-Flag SLA)** | Thời gian từ khi phát hành CAPA Cờ đỏ đến khi xử lý xong | **\<= 04 giờ** | Hiệu trưởng Cơ sở |
| **SLA Khắc phục CAPA Thông thường** | Thời gian xử lý xong CAPA theo đúng hạn gán | **\<= 100% Đúng Hạn** | Hiệu trưởng Cơ sở |
| **Tỷ lệ Tuân thủ Audit Đột xuất (Spot-Check Rate)** | (Số đợt Audit đột xuất hoàn tất / Tổng đợt Audit) \* 100 | **\>= 30%** | Group QA Director |
| **Chỉ số Chất lượng Vận hành Chuỗi (Group Average CQI)** | Tổng điểm CQI tất cả các cơ sở / Tổng số cơ sở | **\>= 85 / 100 Điểm** | Group COO & QA Dir |
| **Tỷ lệ Lỗi Vi phạm Lặp lại (Repeat Violation Rate)** | (Số lỗi lặp lại ở đợt audit sau / Tổng số lỗi) \* 100 | **\<= 5%** | Hiệu trưởng Cơ sở |

## **25\. Dashboard / Report**

* **QA Operational & CAPA Live Monitor (Group QA Team):** Màn hình đếm ngược SLA xử lý các CAPA Tickets real-time, Danh sách vi phạm Cờ đỏ chưa đóng, Bản đồ nhiệt các cơ sở có rủi ro vận hành cao.  
*   
* **Campus Quality Index (CQI) Ranking Report (COO & CEO):** Bảng xếp hạng điểm CQI của 100% các cơ sở thành viên, So sánh điểm số theo 06 Trụ cột Vận hành, Báo cáo phân tích xu hướng vi phạm (Violation Trend Analysis).  
*   
* **Executive Safety & Compliance Dashboard (Board & CEO):** Màn hình chỉ báo an toàn 360 độ toàn chuỗi, Tỷ lệ tuân thủ PCCC, An toàn Bếp ăn, Y tế học đường và Bảo vệ dữ liệu trẻ em.  
* 

## **26\. Integration**

* **Tất cả 14 SOPs Vận hành (SOP-CRM-001 đến SOP-GOV-001):** Đối soát tính tuân thủ quy trình SOP thực tế tại cơ sở với dữ liệu ghi nhận trên phần mềm.  
*   
* **Student Health & Kitchen (SOP-MED-001 & SOP-KIT-001):** Kích hoạt Special Audit khi có sự cố An toàn Y tế hoặc Bếp ăn.  
*   
* **HR Performance & KPI Engine (SOP-HR-001):** Đồng bộ Điểm CQI làm trọng số tính thưởng KPI cho Ban Giám hiệu Cơ sở.  
*   
* **Management BI Dashboard (SOP-GOV-001):** Sync dữ liệu Điểm CQI và Cảnh báo Rủi ro Vận hành lên Màn hình Executive BI.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Bỏ sót vi phạm an toàn chí mạng gây tai nạn cho trẻ** | Critical | Low | Bắt buộc kiểm tra 100% Tiêu chí Cờ đỏ; Audit Đột xuất không báo trước. | Group QA Director |
| **Cơ sở sửa chữa đối phó / Tải ảnh giả minh chứng CAPA** | High | Low | Bắt buộc chụp ảnh live qua App đính kèm GPS/Time; Re-audit thực địa lỗi Cờ đỏ. | QA Auditor & Mgr |
| **Auditor thông đồng với Cơ sở để nương tay chấm điểm** | High | Low | Tự động xoay vòng Auditor (BR-QA-004); Kích hoạt Blind Re-audit độc lập. | Group QA Dir & CEO |
| **Tắc nghẽn khắc phục CAPA kéo dài rủi ro vận hành** | High | Medium | Đồng hồ SLA CAPA đếm ngược; Auto Escalation bật còi báo động đỏ về CEO/COO. | Hiệu trưởng & Group QA |

## **28\. Acceptance Criteria**

* **Given:** QA Auditor thực hiện đợt Audit Đột xuất tại Cơ sở 4 và phát hiện Bình chữa cháy tại Lớp Mẫu giáo B2 bị tụt áp (Vi phạm Cờ đỏ PCCC).  
*   
* **When:** Auditor chọn "Fail" cho tiêu chí PCCC, chụp ảnh live vết lỗi và bấm "Submit Audit Report".  
*   
* **Then:** ERP tự động tính điểm CQI tạm tính, kích hoạt Cảnh báo Báo động Đỏ gửi về điện thoại Group QA Director và COO, đồng thời tự động khởi tạo CAPA Ticket Cờ đỏ gán cho Hiệu trưởng Cơ sở 4 với đồng hồ đếm ngược SLA khắc phục trong đúng **04 giờ**.  
*   
* **Given:** Hiệu trưởng Cơ sở 4 cử Kỹ thuật viên thay bình chữa cháy mới và chụp ảnh minh chứng.  
*   
* **When:** Hiệu trưởng mở App chọn tải ảnh lên CAPA Ticket.  
*   
* **Then:** App QA tự động kiểm tra ảnh chụp từ Camera live, đóng dấu Watermark GPS Tọa độ Cơ sở 4 và Timestamp thực. Ngay khi Hiệu trưởng bấm "Nộp Báo cáo Khắc phục", ERP chuyển trạng thái CAPA sang Pending Verification và phát alert cho QA Auditor kiểm tra nghiệm thu.  
* 

## **29\. Test Scenarios**

1. **Happy Path QA Audit & CAPA Cycle Test:** Kích hoạt Audit Đột xuất \-\> Auditor Quét QR Check-in cổng \-\> Chấm checklist chụp ảnh live \-\> Ký biên bản \-\> Auto sinh CAPA \-\> Cơ sở nộp ảnh khắc phục \-\> QA Approve Close CAPA \-\> Sync điểm CQI lên BI Dashboard thành công.  
2.   
3. **Unannounced Audit Concealment Test:** Khởi tạo đợt Audit Đột xuất cho Cơ sở 2 \-\> Kiểm tra xem màn hình BGH Cơ sở 2 có BỊ GIẤU HOÀN TOÀN thông tin đợt audit cho đến khi Auditor quét mã QR Check-in tại cổng không.  
4.   
5. **Red-Flag 4-Hour SLA Escalation Test:** Tạo CAPA Ticket Cờ đỏ hạn 4 giờ nhưng cố tình KHÔNG nộp bằng chứng khắc phục trong 4 giờ \-\> Kiểm tra xem đúng mốc 4h01m ERP có bật còi báo động đỏ gửi về CEO và COO không.  
6.   
7. **Auditor Rotation Enforcement Test:** Phân công Auditor A kiểm tra Cơ sở 1 liên tiếp 2 lần \-\> Đến lần thứ 3 cố tình chọn Auditor A cho Cơ sở 1 \-\> Kiểm tra xem ERP có chặn không cho phân công và hiển thị lỗi Auditor Rotation Rule Violated không.  
8.   
9. **Gallery Photo Upload Blocking Test:** Mở App QA trên thiết bị di động, cố tình chọn tải ảnh từ Thư viện (Gallery) lên báo cáo vi phạm \-\> Kiểm tra xem App có chặn tính năng chọn thư viện và bắt buộc bật Camera live chụp trực tiếp không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình Khung Tiêu chí QA Audit 360 độ (06 Trụ cột); Cấu hình Ma trận Trọng số và Điểm trừ Vi phạm Cờ đỏ; Cấu hình khung thời gian SLA CAPA (4h, 24h, 3d, 7d); Cấu hình Quy tắc Xoay vòng Auditor.  
*   
* **Master Data Migration:** Import danh mục phòng học, vị trí kiểm tra an toàn PCCC/Bếp ăn của tất cả các cơ sở; Import danh sách đội ngũ QA Auditor và phân quyền đặc thù.  
*   
* **Hardware & Integration:** Tích hợp Camera SDK di động với tính năng Auto-Watermarking GPS/Timestamp; Kết nối API với Phân hệ BI Dashboard (SOP-GOV-001) và HR Performance (SOP-HR-001).  
*   
* **Training & Change Management:** Đào tạo Đội ngũ QA Auditor thao tác Audit thực địa trên Mobile App; Đào tạo Ban Giám hiệu các cơ sở quy trình xử lý và nộp minh chứng khắc phục CAPA chuẩn SLA; Đào tạo Ban Điều hành kỹ năng giám sát chỉ số CQI trên Executive BI Dashboard.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (16 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  6.   
  7. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  8.   
  9. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  10.   
  11. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  12.   
  13. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  14.   
  15. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  16.   
  17. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  18.   
  19. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  20.   
  21. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  22.   
  23. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  24.   
  25. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  26.   
  27. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  28.   
  29. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  30.   
  31. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  32.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **09 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│                                │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
│                                │                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 19

# **SOP-ADM-005 — QUY TRÌNH HỌC SINH RÚT HỌC (STUDENT WITHDRAWAL), THỦ TỤC HOÀN PHÍ / CỌC, BẢO LƯU VÀ QUYẾT TOÁN HỢP ĐỒNG ĐÀO TẠO**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-ADM-005  
*   
* **Tên SOP:** Quy trình Học sinh Rút học (Student Withdrawal), Thủ tục Hoàn phí / Cọc, Bảo lưu và Quyết toán Hợp đồng Đào tạo  
*   
* **Module ERP:** Student Enrollment (06), Student Contract Management (07), Tuition & Fee Management (08), Billing / Invoice / Collection (09), Debt & Accounts Receivable (11), Finance & Accounting Integration (55), Student Information System \- SIS (04)  
*   
* **Process Owner:** Admission Manager (Trưởng phòng Tuyển sinh) / Kế toán trưởng  
*   
* **Department:** Phòng Tuyển sinh & Dịch vụ Khách hàng, Phòng Kế toán \- Tài chính, Ban Giám hiệu Cơ sở, Bộ phận Chăm sóc Khách hàng  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Tài chính (CFO) / Giám đốc Điều hành (CEO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ quy trình kết thúc dịch vụ giáo dục mầm non khi học sinh rút học, chuyển trường hoặc xin bảo lưu kết quả: từ tiếp nhận Đơn xin Rút học/Bảo lưu từ Phụ huynh qua Mobile App, khảo sát nguyên nhân (Exit Interview) để thực hiện quy trình Giữ chân Học sinh (Student Retention), chốt ngày học thực tế từ dữ liệu điểm danh SIS (SOP-SIS-001), tính toán quyết toán công nợ/tiền ăn/phí giữ chỗ tự động theo công thức Pro-rata, thu hồi tài sản/thẻ từ đón trẻ, phê duyệt luồng hoàn phí đa cấp, đến xuất chứng từ chi hoàn qua ngân hàng và tự động cập nhật trạng thái học sinh sang Withdrawn / Alumni trên ERP.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non thuộc hệ thống trường tư thục / quốc tế / song ngữ / chuỗi nhiều cơ sở.  
*   
* **Phòng ban:** Phòng Tuyển sinh, Phòng Kế toán, Khối Giáo viên Mầm non, Bộ phận Chăm sóc Khách hàng, Bộ phận Kho & Admin, Ban Giám hiệu.  
*   
* **Đối tượng:** Tất cả học sinh mầm non đang theo học (Active/Enrolled), học sinh đang đặt cọc giữ chỗ (Deposited) xin hủy hợp đồng, Phụ huynh / Người giám hộ hợp pháp.  
*   
* **Trường hợp không áp dụng:** Học sinh hoàn thành chương trình mầm non và tốt nghiệp chuyển lên Tiểu học (áp dụng SOP-ADM-006: Quy trình Tốt nghiệp & Chuyển cấp Học sinh Mầm non Graduation & K-12 Transition).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Student Withdrawal (Học sinh Rút học):** Việc Phụ huynh chấm dứt Hợp đồng Đào tạo trước thời hạn và rút học sinh khỏi trường.  
*   
* **Pro-rata Tuition Calculation (Tính phí Bù trừ theo Ngày thực tế):** Công thức tính toán học phí và tiền ăn dựa trên số ngày học sinh thực tế theo học tính đến Ngày rút học chính thức (Official Withdrawal Date).  
*   
* **Exit Interview & Retention (Phỏng vấn Rút học & Giữ chân):** Tương tác của Bộ phận Chăm sóc Khách hàng / Hiệu trưởng nhằm tìm hiểu lý do rút học và đề xuất giải pháp khắc phục (chuyển lớp, hỗ trợ tâm lý, chính sách đặc biệt) để giữ chân học sinh ở lại trường.  
*   
* **Advance Deposit Forfeiture (Tịch thu Cọc / Phạt Hủy Hợp đồng):** Việc nhà trường giữ lại một phần hoặc toàn bộ tiền đặt cọc/học phí đóng trước theo điều khoản phạt vi phạm thời hạn báo trước quy định trong Hợp đồng Đào tạo.  
*   
* **Settlement Voucher (Chứng từ Quyết toán Hợp đồng):** Bảng tổng hợp số tiền Học phí, Phí Dịch vụ, Tiền ăn thực tế đã dùng vs Số tiền Phụ huynh đã đóng để xác định chính xác số tiền Nhà trường Hoàn trả (Refund) hoặc Phụ huynh phải Nộp thêm (Collect).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tiếp nhận Đơn xin Rút học / Bảo lưu & Khai báo ERP | Admission Officer | Admission Manager | Phụ huynh | GVCN / Kế toán |
| Thực hiện Phỏng vấn Exit Interview & Giữ chân | Customer Service / BGH | Hiệu trưởng Cơ sở | GVCN | Admission Manager |
| Chốt Ngày học Thực tế & Thu hồi Thẻ từ / Tài sản | GVCN & Admin Cơ sở | Hiệu trưởng Cơ sở | Thủ kho / Bảo vệ | Kế toán Phí |
| Chạy Engine Tính Quyết toán Tài chính & Hoàn phí | Kế toán Phí | Kế toán trưởng | Admission Mgr | Phụ huynh |
| Phê duyệt Tờ trình Quyết toán Hợp đồng & Chi hoàn | Kế toán trưởng / CFO | CFO / CEO | Legal Officer | Kế toán Bank |
| Thực hiện Chi hoàn Chuyển khoản & Cập nhật SIS Status | Kế toán Bank / ERP | Chief Accountant | Ngân hàng | Phụ huynh / GVCN |

*Ghi chú: Việc phạt vi phạm hợp đồng, hoàn trả học phí, thời gian báo trước và chấm dứt Hợp đồng Dịch vụ Giáo dục Mầm non cần kiểm tra/đối chiếu quy định hiện hành của Luật Dân sự, Luật Bảo vệ Quyền lợi Người tiêu dùng và Luật Giáo dục trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Khung Điều khoản Hợp đồng (StudentContractMaster), Điều khoản Phạt Báo trước (NoticePeriodPolicyMaster), Công thức Tính Hoàn phí (RefundEngineFormulaMaster).  
*   
* **Hồ sơ Bắt buộc:**  
* 

  1. Đơn xin Rút học / Bảo lưu có chữ ký của Phụ huynh (FRM-ADM-015).  
  2.   
  3. Hợp đồng Đào tạo gốc đã ký (SOP-ADM-003).  
  4.   
  5. Dữ liệu điểm danh chốt từ Phân hệ SIS (SOP-SIS-001).  
  6.   
* **Approval Prerequisite:** Không còn nợ sách vở, tài sản hoặc công nợ tài chính chưa làm rõ.  
* 

## **7\. Trigger**

* **Phụ huynh Nộp Đơn:** Phụ huynh tạo "Đơn xin Rút học / Bảo lưu" trên Mobile App hoặc nộp đơn giấy tại Phòng Tuyển sinh.  
*   
* **Hết Hạn Bảo lưu:** Học sinh hết thời hạn bảo lưu theo quy định nhưng Phụ huynh không làm thủ tục tái nhập học (SOP-SIS-005).  
*   
* **Buộc Thôi học (Disciplinary):** Quyết định buộc thôi học do vi phạm nghiêm trọng quy định nhà trường từ Hội đồng Kỷ luật.  
* 

## **8\. Quy trình AS-IS**

* Phụ huynh lên trường gặp tư vấn viên viết đơn xin rút học bằng tay.  
*   
* Tư vấn viên cầm đơn giấy đi xin chữ ký Hiệu trưởng, rồi chuyển sang phòng Kế toán.  
*   
* Kế toán xuất dữ liệu điểm danh ra file Excel, ngồi đếm thủ công từng ngày học thực tế của bé trong kỳ.  
*   
* Kế toán dùng Excel tự tính số tiền còn dư hay thiếu, tự tính tiền phạt báo trước rồi lập bảng kê giấy trình Kế toán trưởng ký.  
*   
* Phụ huynh phải lên trường nhận tiền mặt hoặc chờ chuyển khoản sau 15–30 ngày.  
*   
* Giáo viên quên thu hồi thẻ từ đón trẻ, dẫn đến thẻ từ vẫn còn tác dụng quét tại cổng sau khi trẻ đã nghỉ học.  
*   
* **Hệ quả:** Mất 7–14 ngày làm việc để quyết toán một hồ sơ rút học; hay xảy ra khiếu nại gay gắt về số tiền phạt báo trước do tư vấn không rõ ràng lúc nhập học; rủi ro an ninh khi thẻ từ đón trẻ không bị vô hiệu hóa kịp thời.  
* 

## **9\. Pain Points / Risk**

* **Loss of Retention Opportunity:** Không có quy trình Exit Interview tự động để phát hiện và xử lý kịp thời các bức xúc của Phụ huynh, dẫn đến mất học sinh đáng tiếc.  
*   
* **Calculation Error & Dispute Risk:** Tính thủ công số ngày học thực tế và phí phạt dẫn đến sai lệch tiền hoàn, gây tranh chấp pháp lý và ảnh hưởng uy tín thương hiệu.  
*   
* **Security & Safeguarding Hazard:** Thẻ từ đón trẻ và tài khoản App Phụ huynh không bị vô hiệu hóa tức thì khi rút học, gây nguy cơ xâm nhập trái phép vào trường.  
*   
* **Delayed Cash Outflow & Discontent:** Thời gian chi hoàn tiền kéo dài quá hạn cam kết gây bức xúc và tạo đánh giá tiêu cực (Bad Review) trên các kênh truyền thông.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận Đơn Rút học, Phỏng vấn Exit Interview & Giữ chân (Notice & Retention Attempt)**

* **Step 01:**  
* 

  * **Actor:** Phụ huynh / Người giám hộ & ERP System.  
  *   
  * **Action:** Phụ huynh mở Mobile App, chọn "Xin Rút học / Bảo lưu", điền Lý do rút học, chọn Ngày dự kiến rút học chính thức (Intended Withdrawal Date), tải lên tài khoản Ngân hàng nhận hoàn phí và bấm "Gửi Đơn".  
  *   
  * **ERP Function:** Online Withdrawal Request Capture & Notice Period Calculator.  
  *   
  * **Input:** Lý do rút học, Ngày gửi đơn, Ngày dự kiến nghỉ, Thông tin Bank Account.  
  *   
  * **Output:** Đơn xin Rút học dạng Dự thảo (Submitted Withdrawal Request).  
  *   
  * **Business Rule:** BR-ADM-010: Hệ thống tự động so sánh Ngày gửi đơn với Ngày dự kiến nghỉ để tính Số ngày Báo trước (Notice Days). Nếu Số ngày Báo trước ít hơn quy định trong Hợp đồng (Ví dụ: \< 30 ngày), ERP tự động hiển thị Cảnh báo Phạt Báo trước (Early Withdrawal Penalty Alert) cho Phụ huynh biết trước.  
  *   
  * **Status Before:** Active.  
  *   
  * **Status After:** Withdrawal Requested / Notice Period Active.  
  *   
  * **SLA:** Complete trong 5 phút.  
  *   
  * **Notification:** Alert High Priority gửi Chăm sóc Khách hàng & Hiệu trưởng Cơ sở.  
  *   
* **Step 02:**  
* 

  * **Actor:** Chăm sóc Khách hàng / Hiệu trưởng Cơ sở.  
  *   
  * **Action:** Trong vòng 24 giờ làm việc, Hiệu trưởng hoặc CS Officer thực hiện cuộc gọi / gặp trực tiếp Phụ huynh (Exit Interview) để tìm hiểu sâu lý do. Nếu lý do xuất phát từ chất lượng dịch vụ/chăm sóc, Hiệu trưởng đề xuất phương án giải quyết (Retention Plan).  
  *   
  * **ERP Function:** Exit Interview & Retention Tracking.  
  *   
  * **Input:** Nhật ký trao đổi Exit Interview, Trạng thái Giữ chân (Retention Successful / Failed).  
  *   
  * **Output:** Báo cáo Exit Interview \+ Cập nhật trạng thái Đơn xin Rút học.  
  *   
  * **Business Rule:**  
  * 

    * *Nếu Giữ chân Thành công:* Bấm "Hủy Đơn Rút học", học sinh trở lại trạng thái Active.  
    *   
    * *Nếu Giữ chân Thất bại:* Bấm "Xác nhận Rút học", ERP chuyển Đơn sang Giai đoạn Quyết toán Tài chính.  
    *   
  * **Status Before:** Withdrawal Requested.  
  *   
  * **Status After:** Retention Failed / Confirmed Withdrawal (hoặc Active).  
  *   
  * **SLA:** Complete trong 48 giờ kể từ khi nộp đơn.  
  *   
  * **Notification:** Alert gửi Kế toán Phí & Giáo viên chủ nhiệm.  
  * 

### **Giai đoạn 2: Thu hồi Tài sản, Vô hiệu hóa Quyền truy cập & Chốt Ngày học Thực tế (Asset Clearance & Attendance Lock)**

* **Step 03:**  
* 

  * **Actor:** Giáo viên chủ nhiệm, Bảo vệ Cổng & Admin Cơ sở.  
  *   
  * **Action:** Đến Ngày rút học chính thức, GVCN bàn giao đồ dùng cá nhân của bé cho Phụ huynh. Bảo vệ Cổng thu hồi lại toàn bộ Thẻ từ Đón trẻ (Physical RFID Cards). Admin Cơ sở xác nhận trên App "Đã Thu hồi Tài sản & Thẻ từ".  
  *   
  * **ERP Function:** Asset Clearance & Access Revocation Engine.  
  *   
  * **Input:** Mã Thẻ từ, Danh mục Tài sản bàn giao.  
  *   
  * **Output:** Trạng thái Hoàn tất Thu hồi (Asset Cleared \= YES).  
  *   
  * **Business Rule:** BR-ADM-011: Ngay khi bấm "Xác nhận Rút học Chính thức", ERP tự động vô hiệu hóa mã Thẻ từ đón trẻ trên Kiosk Cổng và chuyển tài khoản App Phụ huynh sang chế độ Restricted Read-Only (chỉ xem được báo cáo quyết toán, không xem được camera/sổ liên lạc).  
  *   
  * **Status Before:** Confirmed Withdrawal.  
  *   
  * **Status After:** Access Revoked & Asset Cleared.  
  *   
  * **SLA:** Real-time trong Ngày rút học chính thức.  
  *   
  * **Notification:** Alert gửi Kế toán Phí xác nhận đủ điều kiện chốt sổ.  
  *   
* **Step 04:**  
* 

  * **Actor:** ERP System (Attendance & Pro-rata Calculator Engine).  
  *   
  * **Action:** ERP tự động truy xuất dữ liệu điểm danh thực tế từ SOP-SIS-001 tính từ đầu kỳ/tháng đến Ngày rút học chính thức, chốt chính xác: (1) Số ngày thực tế đi học; (2) Số buổi ăn thực tế đã ăn; (3) Số tiền cọc/học phí đã đóng còn tồn dư.  
  *   
  * **ERP Function:** Automatic Pro-rata & Settlement Calculation.  
  *   
  * **Input:** Log DailyAttendance, Hợp đồng Đào tạo, Nhật ký Thu tiền.  
  *   
  * **Output:** Bảng tính Quyết toán Tài chính Tự động (Auto Settlement Sheet).  
  *   
  * **Business Rule:** BR-FIN-015: Công thức Quyết toán Hoàn phí: Số tiền Hoàn trả \= (Tiền Học phí & Dịch vụ Đã đóng \- Học phí Thực tế Tính theo Ngày đi học) \+ (Tiền ăn Chưa dùng) \+ (Tiền cọc Giữ chỗ) \- (Phí Phạt Báo trước theoBR-ADM-010) \- (Nợ cũ chưa trả).  
  *   
  * **Status Before:** Access Revoked.  
  *   
  * **Status After:** Settlement Sheet Calculated.  
  *   
  * **SLA:** Tự động hoàn tất trong 5 phút.  
  *   
  * **Notification:** Alert gửi Kế toán Phí kiểm tra.  
  * 

### **Giai đoạn 3: Trình duyệt Tờ trình Quyết toán & Chi hoàn Tiền (Approval & Refund Disbursement)**

* **Step 05:**  
* 

  * **Actor:** Kế toán Phí & Kế toán trưởng.  
  *   
  * **Action:** Kế toán Phí kiểm tra Bảng tính Quyết toán tự động, đính kèm file Đơn xin rút học & Hợp đồng gốc, bấm "Trình Duyệt Hoàn Phí". Kế toán trưởng thẩm định và bấm "Phê duyệt Tờ trình".  
  *   
  * **ERP Function:** Settlement Approval Workflow.  
  *   
  * **Input:** Auto Settlement Sheet \+ Hồ sơ đính kèm.  
  *   
  * **Output:** Tờ trình Quyết toán Hợp đồng được phê duyệt (Approved Settlement Voucher).  
  *   
  * **Business Rule:** BR-FIN-016: Tờ trình hoàn phí có giá trị \> 20.000.000 VNĐ hoặc có miễn giảm tiền phạt vi phạm hợp đồng bắt buộc phải có chữ ký phê duyệt điện tử của CFO.  
  *   
  * **Status Before:** Settlement Sheet Calculated.  
  *   
  * **Status After:** Settlement Approved / Pending Refund.  
  *   
  * **SLA:** Max 24 giờ làm việc.  
  *   
  * **Notification:** Tờ trình Quyết toán PDF đính kèm VietQR / Bank Info gửi tự động tới App Phụ huynh để xác nhận số tiền.  
  *   
* **Step 06:**  
* 

  * **Actor:** Phụ huynh & Kế toán Ngân hàng.  
  *   
  * **Action:** Phụ huynh bấm "Xác nhận Đồng ý Số tiền Quyết toán" trên App. Kế toán Ngân hàng thực hiện Lệnh Chi hoàn Chuyển khoản qua kết nối API Ngân hàng (Host-to-Host Banking API).  
  *   
  * **ERP Function:** Automated Bank Refund & Contract Closure.  
  *   
  * **Input:** Approved Settlement Voucher \+ Bank Account Phụ huynh \+ Phụ huynh Ack.  
  *   
  * **Output:** Lệnh chi hoàn tiền thành công (Refund Paid) \-\> ERP Auto Close Hợp đồng Đào tạo và chuyển trạng thái Học sinh sang Withdrawn / Alumni.  
  *   
  * **Business Rule:** Thời gian chi hoàn tiền thực tế cho Phụ huynh không quá **07 ngày làm việc** kể từ ngày Phụ huynh nộp đủ hồ sơ.  
  *   
  * **Status Before:** Settlement Approved.  
  *   
  * **Status After:** Withdrawn / Contract Closed / Refund Paid.  
  *   
  * **SLA:** \<= 3 ngày làm việc sau khi Phụ huynh Confirm.  
  *   
  * **Notification:** App Push \+ Zalo OA \+ Email xác nhận: *"Trường \[Tên Trường\] đã hoàn tất chi hoàn \[Số tiền\] vào tài khoản Ngân hàng của Phụ huynh. Hợp đồng Đào tạo của bé \[Tên\] đã được quyết toán hoàn tất"*.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Phụ Huynh Nộp Đơn Xin Rút Học / Bảo Lưu Trên Mobile App\]  
       │  
       ▼  
\[ERP Auto Check: Tính Số Ngày Báo Trước ──► Cảnh Báo Phí Phạt Hủy Hợp Đồng (Nếu \< 30 ngày)\]  
       │  
       ▼  
\[CS Officer & Hiệu Trưởng: Thực Hiện Exit Interview Phỏng Vấn Rút Học\]  
       │  
       ◇ Giữ chân Học sinh Thành công (Retention Success)?  
       ├─ YES ──► \[Hủy Đơn Rút Học ──► Học Sinh Trở Lại Trạng Thái "Active"\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Ngày Rút Học Chính Thức: Bảo Vệ Thu Hồi Thẻ Từ ──► ERP Auto Revoke App Access\]  
       │  
       ▼  
\[ERP Pro-rata Engine: Tự Động Chốt Số Ngày Học / Bữa Ăn Thực Tế (SOP-SIS-001)\]  
       │  
       ▼  
\[ERP Run Auto Settlement Formula: Tính Hoàn Phí \= Phí Đã Đóng \- Phí Đã Học \- Phí Phạt\]  
       │  
       ▼  
\[Kế Toán Phí Trình Duyệt ──► Kế Toán Trưởng / CFO Approve Tờ Trình Quyết Toán\]  
       │  
       ▼  
\[Phụ Huynh Bấm "Xác Nhận Số Tiền Quyết Toán" Trên Mobile App\]  
       │  
       ▼  
\[Kế Toán Bank Chuyển Khoản API ──► ERP Auto Update Status: "Withdrawn / Alumni"\]  
       │  
       ▼  
  \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-ADM-010 (Notice Period Rule):** Thời hạn Báo trước Rút học chuẩn được quy định trong Hợp đồng Đào tạo (Mặc định là **30 ngày làm việc**).  
* 

  1. *Báo trước \>= 30 ngày:* Hoàn trả 100% Tiền cọc giữ chỗ và Tiền học phí/tiền ăn chưa sử dụng.  
  2.   
  3. *Báo trước \< 30 ngày:* Phụ huynh bị phạt vi phạm hợp đồng tương đương số tiền học phí của số ngày thiếu hụt báo trước (hoặc khấu trừ 100% Tiền cọc giữ chỗ theo chính sách hợp đồng).  
  4.   
* **BR-ADM-011 (Instant Access Lock):** Đúng 00:00 AM của Ngày rút học chính thức (Official Withdrawal Date), ERP tự động:  
* 

  1. Vô hiệu hóa Thẻ từ đón trẻ trên Kiosk Cổng.  
  2.   
  3. Khóa quyền truy cập Camera lớp học và Sổ liên lạc hàng ngày trên App Phụ huynh.  
  4.   
  5. Chuyển hồ sơ học sinh từ Class List sang Unassigned Withdrawal Pool.  
  6.   
* **BR-FIN-015 (Pro-rata Refund Formula):** Đơn giá ngày học thực tế để tính quyết toán được xác định bằng: Đơn giá Ngày \= Học phí Niêm yết Tháng / Số ngày Học Quy định trong Tháng. Học sinh nghỉ học có phép hợp lệ trước ngày rút học được tính hoàn tiền ăn theo quy định của SOP-FIN-001.  
*   
* **BR-FIN-016 (Disbursement SLA & Threshold):** Toàn bộ tiền hoàn trả phải được thực hiện bằng hình thức Chuyển khoản Ngân hàng chính chủ Phụ huynh. Mọi khoản miễn giảm tiền phạt vi phạm thời hạn báo trước bắt buộc phải có Phê duyệt Ngoại lệ (Approval Override) của CFO.  
* 

## **13\. Exception Cases**

* **Học sinh xin Rút học khẩn cấp do Lý do Y khoa / Chuyển công tác đột xuất của Bố Mẹ:**  
* 

  * *Xử lý:* Phụ huynh đính kèm Giấy xác nhận của Bệnh viện / Quyết định chuyển công tác. Hiệu trưởng Cơ sở trình Tờ trình Miễn Phạt Báo trước (Waive Penalty Request). CFO bấm Approve trên ERP, hệ thống tự động bỏ qua khoản tiền phạt vi phạm thời hạn báo trước và hoàn trả đủ tiền dư.  
  *   
* **Phụ huynh không đồng ý với Số tiền Quyết toán do ERP tính toán:**  
* 

  * *Xử lý:* Phụ huynh bấm "Gửi Khiếu nại Quyết toán" trên App. ERP khởi tạo Ticket Khiếu nại gán cho Kế toán trưởng. Kế toán trưởng đối soát lại nhật ký điểm danh và các chứng từ thu tiền cũ với Phụ huynh. Nếu có điều chỉnh, Kế toán trưởng lập Chứng từ Điều chỉnh (Settlement Adjustment Note) trình CFO duyệt.  
  *   
* **Học sinh có công nợ cũ chưa trả lớn hơn số tiền được hoàn:**  
* 

  * *Xử lý:* Bảng tính Quyết toán cho ra kết quả Balance Due \> 0 (Phụ huynh phải nộp thêm tiền). ERP chuyển trạng thái sang Pending Collection. Kế toán Phí gửi Thông báo Nợ Quyết toán đính kèm VietQR cho Phụ huynh. Học sinh chỉ được chuyển trạng thái Withdrawn chính thức sau khi Phụ huynh hoàn tất thanh toán phần nợ còn thiếu.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Đơn Rút học Chuẩn (Đúng thời hạn báo trước) | Admission Officer | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Tờ trình Quyết toán & Hoàn phí (\<= 20.000.000 VNĐ) | Kế toán Phí | Kế toán trưởng | N/A |
| Phê duyệt Tờ trình Quyết toán & Hoàn phí (\> 20.000.000 VNĐ) | Kế toán Phí | Kế toán trưởng | CFO |
| Phê duyệt Miễn phạt Báo trước / Miễn phạt Hủy Hợp đồng | Hiệu trưởng Cơ sở | Kế toán trưởng | CFO / CEO |

## **15\. Status Lifecycle**

* **Student Status:** Active \-\> Withdrawal Requested \-\> Confirmed Withdrawal \-\> Withdrawn \-\> Alumni.  
*   
* **Student Contract Status:** Active \-\> Under Settlement \-\> Settled \-\> Terminated / Closed.  
*   
* **Refund Voucher Status:** Draft \-\> Calculated \-\> Approved \-\> Parent Confirmed \-\> Paid via Bank.  
* 

## **16\. Data Model**

* **Primary Entity:** StudentWithdrawalRequest  
* 

  * WithdrawalID (PK, String, Unique)  
  *   
  * StudentID (FK, String), ContractID (FK, String), CampusID (FK, String)  
  *   
  * RequestDate (Date), IntendedWithdrawalDate (Date), OfficialWithdrawalDate (Date)  
  *   
  * WithdrawalReason (Enum: Financial, Relocation, Service\_Dissatisfaction, Health, Other)  
  *   
  * NoticeDays (Integer), IsNoticeSufficient (Boolean)  
  *   
  * RetentionStatus (Enum: Pending, Retained, Failed)  
  *   
  * WithdrawalStatus (Enum: Draft, Requested, Confirmed, Settled, Cancelled)  
  *   
* **Related Entities:**  
* 

  * ContractSettlement: SettlementID (PK), WithdrawalID (FK), StudentID (FK), TotalPaidAmount (Decimal), ActualTuitionUsed (Decimal), ActualMealUsed (Decimal), PenaltyAmount (Decimal), NetRefundAmount (Decimal), RefundBankName (String), RefundBankAccount (String), RefundStatus (Enum).  
  *   
  * ExitInterviewLog: InterviewID (PK), WithdrawalID (FK), InterviewerID (FK), DetailedFeedback (Text), RetentionOfferMade (Text), Outcome (Enum).  
  * 

## **17\. Forms / Documents**

* FRM-ADM-015: Đơn xin Rút học & Quyết toán Hợp đồng Đào tạo Điện tử (Digital Withdrawal Form).  
*   
* FRM-ADM-016: Biên bản Phỏng vấn Rút học & Lịch sử Giữ chân (Exit Interview & Retention Sheet).  
*   
* FRM-FIN-015: Bảng Tờ trình Quyết toán Tài chính & Hoàn trả Học phí (Financial Settlement Voucher).  
*   
* FRM-ADM-017: Giấy Xác nhận Hoàn tất Thủ tục Rút học & Thu hồi Tài sản (Clearance Certificate).  
* 

## **18\. ERP Functional Requirements**

* **FR-ADM-010 (MUST):** Mobile App Phụ huynh phải hỗ trợ tính năng nộp Đơn xin Rút học/Bảo lưu trực tuyến, tự động tính số ngày báo trước và hiển thị ước tính tiền phạt vi phạm hợp đồng (nếu có).  
*   
* **FR-FIN-010 (MUST):** Tích hợp Pro-rata Settlement Engine: Tự động đối soát dữ liệu điểm danh SIS và các khoản phí đã nộp để tính chính xác số tiền hoàn trả hoặc nộp thêm theo công thức cấu hình.  
*   
* **FR-ADM-011 (MUST):** Tự động vô hiệu hóa mã Thẻ từ đón trẻ tại Kiosk Cổng và khóa quyền xem Camera/Sổ liên lạc trên App Phụ huynh vào đúng 00:00 AM của Ngày rút học chính thức.  
*   
* **FR-FIN-011 (MUST):** Tích hợp API Chuyển khoản Ngân hàng (Host-to-Host Banking API) để chi hoàn tiền học phí trực tiếp vào tài khoản Phụ huynh ngay khi Tờ trình được duyệt.  
*   
* **FR-ADM-012 (SHOULD):** Tự động chuyển dữ liệu học sinh đã quyết toán xong sang Phân hệ Alumni Management để phục vụ các chiến dịch chăm sóc lại (Re-engagement Marketing).  
* 

## **19\. Automation Opportunities**

* **AUTO-ADM-010 (RULE ENGINE):** Tự động tính toán số ngày báo trước (Notice Days) và áp dụng mức phạt hủy hợp đồng theo ma trận chính sách khi Phụ huynh chọn ngày rút học trên App.  
*   
* **AUTO-ADM-011 (WORKFLOW):** Tự động khởi tạo Task "Exit Interview & Retention" cho Hiệu trưởng/CS Officer ngay khi đơn xin rút học được nộp.  
*   
* **AUTO-FIN-010 (INTEGRATION):** Tự động tính toán Bảng quyết toán tài chính từ dữ liệu điểm danh SIS và lịch sử phiếu thu tiền mà không cần kế toán tính tay.  
*   
* **AUTO-ADM-012 (SECURITY RULE):** Tự động vô hiệu hóa quyền truy cập cổng và App Phụ huynh đúng Ngày rút học chính thức.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo Nộp Đơn xin Rút học Mới | CS Officer & Hiệu trưởng | Mobile App Push \+ ERP Alert | Immediate khi nộp đơn |
| Nhắc Lịch Phỏng vấn Giữ chân (Exit Interview) | Hiệu trưởng Cơ sở | ERP Task / App Push | 12 giờ sau khi nộp đơn |
| Thông báo Thu hồi Thẻ từ & Tài sản | Bảo vệ Cổng & Admin | Mobile App Push | 1 ngày trước Ngày rút học |
| Gửi Bảng Quyết toán Tài chính Xác nhận | Phụ huynh | Mobile App Push \+ Email | Immediate sau khi Approve |
| Xác nhận Chi hoàn Tiền thành công & Đóng Hợp đồng | Phụ huynh & GVCN | App Push \+ Zalo OA \+ Email | Immediate sau khi Bank transfer |

## **21\. Permission Matrix (RBAC)**

| Role | View Withdrawal | Create Request | Conduct Exit Interview | Calculate Settlement | Approve Settlement | Execute Bank Refund |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Phụ huynh | Own Child | Own Child | No | No | Confirm Only | No |
| Admission Officer | Campus Full | Full | Full | Read Only | No | No |
| Hiệu trưởng Cơ sở | Campus Full | Read Only | Full | Read Only | Recommend | No |
| Kế toán Phí | Campus Full | Read Only | Read Only | Full (Calculate) | Review | No |
| Kế toán trưởng / CFO | Full Enterprise | Read Only | Read Only | Full | Full (Approve) | Full (Bank API) |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người nộp đơn xin rút học, Ngày nộp đơn, Ngày dự kiến nghỉ, Số ngày báo trước được tính toán.  
*   
* Nhật ký cuộc gọi Exit Interview, Lý do rút học chính thức, Trạng thái giữ chân.  
*   
* Mọi thao tác chỉnh sửa công thức tính hoàn phí, bổ sung phí phạt hoặc miễn giảm tiền phạt vi phạm thời hạn báo trước (Who, When, Before Value, After Value, Approval Reason).  
*   
* Lịch sử thu hồi thẻ từ đón trẻ và vô hiệu hóa quyền truy cập Kiosk Cổng/App Phụ huynh.  
*   
* Nhật ký chuyển tiền hoàn phí qua API Ngân hàng (Bank Transaction Ref, Status Code).  
* 

## **23\. Internal Controls**

* **Segregation of Duties (Tách biệt nhiệm vụ):** Nhân viên Tuyển sinh không được tự quyết toán số tiền hoàn phí. Kế toán tính quyết toán không được tự duyệt tờ trình chi hoàn tiền.  
*   
* **System Asset Clearance Gate:** ERP khóa không cho phê duyệt Tờ trình Quyết toán nếu cờ Asset Cleared chưa được Admin/Bảo vệ xác nhận (Chưa thu hồi thẻ từ đón trẻ).  
*   
* **Dual Approval for Penalty Waiver:** Mọi khoản miễn giảm tiền phạt vi phạm thời hạn báo trước bắt buộc phải có xác nhận duyệt kép (Dual Control): Kế toán trưởng \+ CFO.  
*   
* **Bank Account Matching Control:** Tài khoản ngân hàng nhận tiền hoàn trả bắt buộc phải khớp tên với Tên Phụ huynh/Người đứng tên trên Hợp đồng Đào tạo.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Thực hiện Exit Interview** | Thời gian từ khi nộp đơn đến khi hoàn tất phỏng vấn | **\<= 24 giờ làm việc** | CS Officer & Hiệu trưởng |
| **Tỷ lệ Giữ chân Học sinh Thành công (Retention Rate)** | (Số học sinh rút đơn sau phỏng vấn / Tổng đơn) \* 100 | **\>= 15%** | Hiệu trưởng & Tuyển sinh |
| **SLA Quyết toán & Chi hoàn Tiền** | Thời gian từ Ngày rút học đến khi tiền về bank Phụ huynh | **\<= 07 ngày làm việc** | Kế toán trưởng & CFO |
| **Tỷ lệ Thu hồi Thẻ từ Đón trẻ (Access Revocation)** | (Số thẻ từ thu hồi / Tổng số thẻ đã phát hành) \* 100 | **100% (Zero Error)** | Bảo vệ Cổng & Admin |

## **25\. Dashboard / Report**

* **Student Retention & Exit Analytics (Tuyển sinh & BGH):** Báo cáo số lượng học sinh rút học theo tháng/cơ sở, Phân tích nguyên nhân rút học (Top Withdrawal Reasons), Báo cáo hiệu quả chiến dịch giữ chân học sinh.  
*   
* **Settlement & Refund Financial Monitor (Kế toán & CFO):** Báo cáo tổng giá trị tiền hoàn phí/cọc đã chi trả, Báo cáo công nợ quyết toán còn phải thu/phải trả, Bảng đếm ngược SLA chi hoàn tiền Phụ huynh.  
*   
* **Executive Churn & Occupancy Impact Report (CEO & Board):** Báo cáo Tỷ lệ Học sinh Mất đi (Churn Rate), Tác động của rút học đến Tỷ lệ Lấp đầy Sĩ số (Occupancy Rate) và Dự báo Doanh thu thuần.  
* 

## **26\. Integration**

* **Student Information System (SOP-SIS-001):** Lấy dữ liệu điểm danh thực tế chốt số ngày học và tự động vô hiệu hóa mã thẻ từ đón trẻ tại Kiosk Cổng.  
*   
* **Tuition & Fee Engine (SOP-FIN-001):** Trích xuất lịch sử các hóa đơn đã đóng, tiền ăn nghỉ phép còn dư và công nợ cũ chưa trả.  
*   
* **Corporate Online Banking APIs (Host-to-Host Banking):** Thực hiện lệnh chuyển khoản hoàn tiền trực tiếp cho Phụ huynh và nhận Webhook gạch nợ tự động.  
*   
* **Alumni & Re-engagement CRM:** Đồng bộ dữ liệu học sinh đã quyết toán xong sang danh sách Alumni để chăm sóc lại sau 6–12 tháng.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Thẻ từ không bị vô hiệu hóa, người ngoài lọt vào trường** | Critical | Low | ERP Auto Revoke Access đúng 00:00 AM Ngày rút học; Bảo vệ thu thẻ từ. | Bảo vệ Cổng & IT |
| **Tính sai số tiền hoàn phí gây khiếu nại gay gắt** | High | Low | ERP Pro-rata Settlement Engine tự động tính theo log SIS; Duyệt 2 cấp. | Kế toán Phí & Kế toán trưởng |
| **Chậm chi hoàn tiền quá 7 ngày làm ảnh hưởng uy tín** | High | Medium | Đồng hồ đếm ngược SLA Chi hoàn tiền trên Dashboard Kế toán; Push Alert cho CFO. | Kế toán Ngân hàng |
| **Tự ý miễn tiền phạt báo trước gây thất thoát doanh thu** | Medium | Medium | Khóa quyền sửa tiền phạt trên UI; Bắt buộc CFO duyệt Tờ trình Miễn Phạt. | Kế toán trưởng & CFO |

## **28\. Acceptance Criteria**

* **Given:** Phụ huynh gửi Đơn xin Rút học cho Học sinh A trên Mobile App vào ngày 01/10/2026, chọn Ngày nghỉ chính thức là 15/10/2026 (Số ngày báo trước \= 15 ngày, ít hơn quy định 30 ngày).  
*   
* **When:** Phụ huynh bấm "Submit Đơn".  
*   
* **Then:** ERP tự động tính toán số ngày báo trước bị thiếu (15 ngày), hiển thị thông báo Cảnh báo Phí Phạt Báo trước tương ứng với 15 ngày học phí, đồng thời tự động khởi tạo Task "Exit Interview" gán cho Hiệu trưởng Cơ sở xử lý trong 24 giờ.  
*   
* **Given:** Học sinh B có Ngày rút học chính thức là ngày 10/10/2026.  
*   
* **When:** Đồng hồ hệ thống chuyển sang 00:00:01 AM ngày 10/10/2026.  
*   
* **Then:** ERP tự động vô hiệu hóa mã Thẻ từ đón trẻ của Học sinh B trên Kiosk Cổng, chuyển tài khoản App Phụ huynh sang chế độ Restricted Read-Only, và tự động chạy tiến trình Pro-rata Settlement Engine để tạo Bảng quyết toán tài chính.  
* 

## **29\. Test Scenarios**

1. **Happy Path Withdrawal & Settlement Test:** Phụ huynh nộp đơn trước 30 ngày \-\> Exit Interview thất bại \-\> Thu hồi thẻ từ \-\> ERP Auto-Calculate Pro-rata Settlement \-\> BGH & CFO Approve Tờ trình \-\> Kế toán Bank chuyển tiền API thành công \-\> Student Status \= Withdrawn / Alumni.  
2.   
3. **Sufficient vs Insufficient Notice Period Test:** Nộp đơn báo trước 35 ngày (Đủ) vs Nộp đơn báo trước 10 ngày (Thiếu) \-\> Kiểm tra xem ERP có tính tiền phạt vi phạm hợp đồng chính xác cho case thiếu ngày không.  
4.   
5. **Retention Recovery Test:** Phụ huynh nộp đơn rút học \-\> Hiệu trưởng phỏng vấn Exit Interview và đưa ra phương án đổi lớp thành công \-\> Bấm "Hủy Đơn Rút học" \-\> Kiểm tra xem trạng thái học sinh có trở lại Active 100% không.  
6.   
7. **Instant Access Revocation Test:** Đặt ngày rút học chính thức là hôm nay \-\> Kiểm tra xem đúng 00:00 AM thẻ từ đón trẻ tại cổng có bị Kiosk chặn từ chối truy cập không.  
8.   
9. **Penalty Waiver Approval Test:** Khởi tạo Tờ trình Miễn phạt báo trước do lý do y tế \-\> Kiểm tra xem ERP có bắt buộc luồng duyệt của Kế toán trưởng \+ CFO mới cho phép hoàn đủ tiền không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình thời hạn báo trước chuẩn (30 ngày); Cấu hình công thức tính hoàn phí Pro-rata; Cấu hình luồng duyệt tờ trình quyết toán tài chính; Cấu hình quy tắc vô hiệu hóa thẻ từ tự động.  
*   
* **Master Data Migration:** Import danh mục chính sách hoàn phí/tiền cọc từ các mẫu Hợp đồng Đào tạo hiện hành; Chuẩn hóa danh mục lý do rút học.  
*   
* **Hardware & Integration:** Tích hợp Kiosk Cổng trường để cập nhật danh sách thẻ từ bị vô hiệu hóa real-time; Tích hợp API Chuyển khoản Ngân hàng Host-to-Host để chi hoàn tiền tự động.  
*   
* **Training & Change Management:** Đào tạo Bộ phận Tuyển sinh & CS quy trình phỏng vấn Exit Interview và kỹ năng giữ chân học sinh; Đào tạo Kế toán quy trình đối soát quyết toán tự động trên ERP; Hướng dẫn Phụ huynh thao tác theo dõi tiến độ hoàn tiền trên Mobile App.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (17 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  4.   
  5. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  6.   
  7. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  8.   
  9. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  10.   
  11. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  12.   
  13. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  14.   
  15. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  16.   
  17. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  18.   
  19. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  20.   
  21. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  22.   
  23. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  24.   
  25. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  26.   
  27. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  28.   
  29. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  30.   
  31. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  32.   
  33. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  34.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **08 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│                                │ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
│                                │                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 20

# **SOP-MKT-001 — QUY TRÌNH QUẢN LÝ CHIẾN DỊCH MARKETING, TỔ CHỨC SỰ KIỆN TUYỂN SINH, QUẢN LÝ NGÂN SÁCH QUẢNG CÁO VÀ ĐO LƯỜNG HIỆU QUẢ CHI PHÍ CAC / ROI**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-MKT-001  
*   
* **Tên SOP:** Quy trình Quản lý Chiến dịch Marketing, Tổ chức Sự kiện Tuyển sinh, Quản lý Ngân sách Quảng cáo và Đo lường Hiệu quả Chi phí CAC / ROI  
*   
* **Module ERP:** Marketing & Campaign (02), CRM & Lead Management (01), Budget Management (57), Expense Management (58), Management Dashboard & BI (70), Multi-campus Management (71)  
*   
* **Process Owner:** Trưởng phòng Marketing Tập đoàn (Group Marketing Manager) / CMO  
*   
* **Department:** Khối Marketing & Truyền thông Chuỗi, Phòng Tuyển sinh, Phòng Kế toán \- Tài chính  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Tài chính (CFO) / Giám đốc Điều hành (CEO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ công tác Marketing truyền thông & Tuyển sinh cho hệ thống mầm non đa cơ sở: từ khâu lập kế hoạch chiến dịch Marketing đa kênh (Meta Ads, Google Ads, Zalo OA, TikTok, OOH, Event Open Day, Workshop), duyệt và kiểm soát hạn mức Ngân sách Quảng cáo (Budget Control), mã hóa link theo dõi UTM chuẩn hóa, quản lý sự kiện trải nghiệm tuyển sinh (Event Check-in QR), đến việc tự động kết nối dữ liệu phễu tuyển sinh CRM (SOP-CRM-001) để đo lường chính xác các chỉ số hiệu quả kinh doanh: Chi phí trên một Lead (CPL), Chi phí trên một Học sinh Nhập học (CAC \- Customer Acquisition Cost) và Tỷ suất Lợi nhuận Đầu tư (ROI / ROAS) theo thời gian thực.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thuộc tập đoàn/chuỗi.  
*   
* **Phòng ban:** Khối Marketing Tập đoàn, Phòng Tuyển sinh & CSKH các Cơ sở, Phòng Kế toán \- Tài chính, Ban Giám hiệu các Cơ sở, Các Agency / Nhà thầu Quảng cáo ngoài.  
*   
* **Đối tượng:** Chiến dịch Marketing Thương hiệu (Brand Awareness), Chiến dịch Mộ quân / Chiêu sinh đầu năm học mới, Sự kiện Open Day / Workshop trải nghiệm mầm non, Ngân sách Quảng cáo Digital & Offline.  
*   
* **Trường hợp không áp dụng:** Truyền thông khủng hoảng báo chí / sự cố pháp lý cấp tập đoàn (áp dụng SOP-GOV-004: Quản trị Rủi ro & Truyền thông Khủng hoảng).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **CAC (Customer Acquisition Cost \- Chi phí Thu mua Khách hàng):** Tổng chi phí Marketing & Sales thực tế đã chi ra để thu về 01 Học sinh nhập học chính thức đóng phí (CAC \= Tổng Chi phí Campaign / Số Học sinh Enrolled).  
*   
* **CPL (Cost per Lead \- Chi phí trên một Cơ hội):** Chi phí trung bình để thu về 01 Lead quan tâm hợp lệ.  
*   
* **UTM Parameter (Mã Định danh Lượng truy cập):** Đoạn mã đính kèm vào đường link URL (Source, Medium, Campaign, Content, Term) giúp ERP tự động nhận diện chính xác Lead đến từ bài đăng/quảng cáo nào.  
*   
* **Full-Funnel Attribution (Ghi nhận Phễu Chuyển đổi Toàn diện):** Mô hình đối soát trên ERP theo vết hành trình của Phụ huynh từ khi click Quảng cáo \-\> Điền Form \-\> Tham quan School Tour \-\> Đánh giá Assessment \-\> Đóng phí Nhập học.  
*   
* **Event QR Ticket:** Mã QR duy nhất gửi qua Zalo/SMS cho Phụ huynh đăng ký sự kiện Open Day dùng để quét Check-in nhanh tại cổng trường.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Lập Kế hoạch Chiến dịch & Dự toán Ngân sách Marketing | Marketing Executive | Marketing Manager | Admission Mgr / BGH | Kế toán Ngân sách |
| Phê duyệt Kế hoạch Chiến dịch & Hạn mức Ngân sách | Marketing Manager | CFO / CEO | Group COO | Hiệu trưởng Cơ sở |
| Cấu hình Mã UTM, Mã hóa Link & Tích hợp Tracking API | Digital Marketing Exec | Marketing Manager | IT/ERP Admin | Admission Team |
| Thực thi Quảng cáo Digital & Quản lý Sự kiện Open Day | Marketing Team & Agency | Marketing Manager | Admission / Lễ tân | Ban Giám hiệu |
| Đối soát Chi phí Quảng cáo & Hạch toán Kế toán | Kế toán Thanh toán | Kế toán trưởng | Marketing Manager | Agency / Vendor |
| Báo cáo Tổng hợp Chỉ số CAC, CPL, ROI trên BI Dashboard | BI Analyst / ERP | Marketing Manager | CFO / CEO | Board of Directors |

*Ghi chú: Việc thu thập dữ liệu cá nhân Phụ huynh từ các chiến dịch quảng cáo, gửi tin nhắn SMS Brandname / Zalo OA tiếp thị và quy định bản quyền hình ảnh mầm non cần kiểm tra/đối chiếu quy định hiện hành của Pháp luật Việt Nam (Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân, Nghị định 91/2020/NĐ-CP về Chống tin nhắn rác) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Kênh Marketing (MarketingChannelMaster), Danh mục Cơ sở (CampusMaster), Mã Ngân sách Marketing (BudgetLineMaster), Ma trận Chỉ tiêu Tuyển sinh (EnrollmentQuotaMaster).  
*   
* **Hạn mức Ngân sách:** Ngân sách Marketing được duyệt trong Kế hoạch Kinh doanh Năm/Quý của Tập đoàn (SOP-FIN-002).  
*   
* **Tích hợp Kênh:** Các tài khoản Meta Business, Google Ads, Zalo OA, TikTok Ads đã được kết nối Webhook API với hệ thống ERP CRM (SOP-CRM-001).  
* 

## **7\. Trigger**

* **Theo Lịch Mùa vụ Tuyển sinh:** Kích hoạt các Chiến dịch Cao điểm Tuyển sinh (Tháng 3 \- Tháng 8 hàng năm).  
*   
* **Sự kiện Học đường:** Tổ chức Sự kiện Open Day, Ngày hội Trải nghiệm, Ngày hội STEM Mầm non.  
*   
* **Cảnh báo Sĩ số Thấp (Low Occupancy Alert):** ERP tự động kích hoạt Trigger khi Tỷ lệ Lấp đầy Sĩ số (Occupancy Rate) của một cơ sở xuống dưới 70%.  
* 

## **8\. Quy trình AS-IS**

* Marketing lập file Excel kế hoạch chiến dịch và dự toán chi phí gửi Email cho Sếp duyệt.  
*   
* Chạy quảng cáo Facebook/Google bằng thẻ tín dụng cá nhân của nhân viên, cuối tháng chụp ảnh màn hình báo cáo chi phí gửi Kế toán làm thủ tục thanh toán.  
*   
* Khách đăng ký sự kiện Open Day được ghi vào file Google Form riêng. Ngày diễn ra sự kiện, Lễ tân cầm danh sách in giấy để tích tên Phụ huynh đến dự.  
*   
* Cuối tháng, Marketing lấy tổng tiền tiêu trên Facebook chia cho tổng số Lead để tính CPL. Không tính được chỉ số CAC thực tế do không biết Lead nào đã chuyển thành Học sinh đóng phí.  
*   
* **Hệ quả:** Thất thoát ngân sách quảng cáo; không đo lường được hiệu quả thực sự của từng kênh Digital/Offline; rủi ro thuế khi dùng thẻ cá nhân chạy quảng cáo; mất từ 5–7 ngày để tổng hợp báo cáo ROI bằng tay.  
* 

## **9\. Pain Points / Risk**

* **Untracked Marketing Spend & Waste:** Ngân sách quảng cáo bị tiêu lãng phí vào các tệp khách hàng không đúng chân dung mầm non do thiếu công cụ giám sát CPL real-time.  
*   
* **CAC Blindness (Mù Chỉ số CAC):** Không thể xác định được kênh Marketing nào đem lại Học sinh nhập học thực tế (High-Converting Channel) và kênh nào chỉ đem lại Lead rác (Spam Lead).  
*   
* **Ad Budget Overrun Risk:** Quảng cáo chạy vượt ngân sách cho phép do không có công cụ chặn cứng (Auto Budget Capping Gate) trên ERP.  
*   
* **Inaccurate Event Attribution:** Sự kiện Open Day tốn nhiều chi phí tổ chức nhưng không theo dõi được tỷ lệ Phụ huynh tham dự sự kiện chuyển đổi thành Học sinh đóng phí.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Lập Kế hoạch Chiến dịch & Phê duyệt Ngân sách (Campaign Proposal & Budget Allocation)**

* **Step 01:**  
* 

  * **Actor:** Marketing Executive & Marketing Manager.  
  *   
  * **Action:** Mở Phân hệ Marketing & Campaign trên ERP, khởi tạo Chiến dịch Mới (Create Campaign), chọn Cơ sở mục tiêu, Thời gian chạy, Kênh triển khai, Chỉ tiêu Lead/KPIs (Số Lead, Số Tour, Số Enrolled kỳ vọng) và nhập Dự toán Ngân sách chi tiết theo từng Kênh.  
  *   
  * **ERP Function:** Campaign Proposal & Budget Validation Engine.  
  *   
  * **Input:** Tên Chiến dịch, Target Campus, Target KPIs, Ngân sách Dự toán theo Kênh.  
  *   
  * **Output:** Đề xuất Chiến dịch dạng Dự thảo (Draft Campaign Proposal).  
  *   
  * **Business Rule:** BR-MKT-001: ERP tự động kiểm tra Hạn mức Ngân sách Marketing khả dụng (Available Marketing Budget) của Cơ sở/Tập đoàn. Nếu dự toán chiến dịch vượt quá Ngân sách khả dụng, ERP chặn không cho Submit, hoặc bắt buộc chuyển sang luồng Over-Budget Approval Workflow.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Draft Proposal / Budget Checked.  
  *   
  * **SLA:** Complete trong 30 phút.  
  *   
  * **Notification:** N/A.  
  *   
* **Step 02:**  
* 

  * **Actor:** Marketing Manager, CFO & CEO.  
  *   
  * **Action:** Người duyệt nhận Alert trên App, xem Bảng phân tích KPIs kỳ vọng, đối chiếu ngân sách và bấm "Phê duyệt Chiến dịch" (Approve Campaign).  
  *   
  * **ERP Function:** Multi-Level Campaign Approval Workflow.  
  *   
  * **Input:** Draft Campaign Proposal.  
  *   
  * **Output:** Chiến dịch được Phê duyệt (Approved Campaign) \-\> Khóa khoản tiền ngân sách cam kết chi (Encumbered Marketing Budget).  
  *   
  * **Business Rule:** BR-MKT-002: Chiến dịch có ngân sách \<= 20.000.000 VNĐ do Marketing Manager duyệt. Chiến dịch \> 20.000.000 VNĐ bắt buộc CFO và CEO phê duyệt trên ERP.  
  *   
  * **Status Before:** Draft Proposal.  
  *   
  * **Status After:** Approved / Active Tracking.  
  *   
  * **SLA:** Max 4 giờ làm việc.  
  *   
  * **Notification:** Alert gửi Digital Marketing Exec để lấy Mã Tracking & triển khai.  
  * 

### **Giai đoạn 2: Mã hóa Tracking UTM, Tích hợp Ads API & Chạy Quảng cáo (UTM Encoding & Ads Execution)**

* **Step 03:**  
* 

  * **Actor:** Digital Marketing Exec & ERP System.  
  *   
  * **Action:** Digital Exec chọn Chiến dịch đã Approved trên ERP, bấm "Sinh Mã Tracking URL" (Generate Tracking Link). ERP tự động cấu hình bộ mã UTM tiêu chuẩn (utm\_source, utm\_medium, utm\_campaign, utm\_content) đính kèm Mã ID Chiến dịch độc nhất. Digital Exec dùng đường link này cài đặt vào các bài quảng cáo trên Meta Ads, Google Ads, TikTok Ads, Zalo.  
  *   
  * **ERP Function:** Auto UTM Link Generator & Ads API Integration.  
  *   
  * **Input:** Approved Campaign ID, Kênh Quảng cáo, Tên Quảng cáo (Ad Set/Ad Creative).  
  *   
  * **Output:** Đường link URL đã mã hóa UTM chuẩn (Tracking Encoded URL).  
  *   
  * **Business Rule:** BR-MKT-003: 100% đường link quảng cáo Digital bắt buộc phải chạy qua công cụ Sinh Mã Tracking URL của ERP. Lead đổ về không có mã UTM sẽ tự động bị hệ thống xếp vào nhóm Organic / Unattributed Lead.  
  *   
  * **Status Before:** Approved.  
  *   
  * **Status After:** Tracking Active / Live Ad Running.  
  *   
  * **SLA:** \<= 5 phút sinh link.  
  *   
  * **Notification:** N/A.  
  * 

### **Giai đoạn 3: Tự động Thu hút Lead, Đăng ký Sự kiện & Quét QR Check-in (Lead Ingestion & Event Check-in)**

* **Step 04:**  
* 

  * **Actor:** Phụ huynh & ERP System (Omnichannel Integration Engine).  
  *   
  * **Action:** Phụ huynh click quảng cáo, điền Form đăng ký tư vấn hoặc Đăng ký tham dự Sự kiện Open Day trên Landing Page/Zalo Mini App. ERP tự động nhận diện Lead qua Webhook API, trích xuất mã UTM, thực hiện Quét trùng (Deduplication Check) và tự động đẩy Lead về Phân hệ CRM (SOP-CRM-001).  
  *   
  * **ERP Function:** Real-time Lead Ingestion & Campaign Attribution Sync.  
  *   
  * **Input:** Webhook Data từ Meta/Google/Zalo, UTM Parameters, Thông tin Phụ huynh.  
  *   
  * **Output:** Lead Mới gắn đúng Mã Chiến dịch (Campaign Attributed Lead).  
  *   
  * **Business Rule:** Đối với khách đăng ký Sự kiện Open Day, ERP tự động sinh một Mã Event QR Ticket duy nhất và tự động gửi qua Zalo OA / SMS Brandname cho Phụ huynh.  
  *   
  * **Status Before:** Ad Clicked.  
  *   
  * **Status After:** Lead Attributed / QR Ticket Sent.  
  *   
  * **SLA:** Real-time (\<= 3 giây).  
  *   
  * **Notification:** SMS/Zalo OA vé QR gửi Phụ huynh; Alert Lead mới gửi Tư vấn viên (SOP-CRM-001).  
  *   
* **Step 05:**  
* 

  * **Actor:** Lễ tân / Staff Sự kiện & Phụ huynh.  
  *   
  * **Action:** Ngày diễn ra Sự kiện Open Day tại trường, Phụ huynh đưa mã QR Ticket trên Zalo/SMS cho Lễ tân. Lễ tân dùng Tablet quét mã QR Check-in. ERP tự động ghi nhận trạng thái Event Attended cho Lead đó.  
  *   
  * **ERP Function:** Mobile QR Event Check-in & Attendance Verification.  
  *   
  * **Input:** Mã QR Ticket Phụ huynh.  
  *   
  * **Output:** Trạng thái Lead chuyển sang Event Attended đính kèm Timestamp Check-in thực tế.  
  *   
  * **Business Rule:** BR-MKT-004: Chỉ các Lead có dữ liệu quét mã QR Check-in thực tế tại sự kiện mới được ERP ghi nhận vào tỷ lệ Event Attendance Rate để tính toán hiệu quả chi phí sự kiện.  
  *   
  * **Status Before:** QR Ticket Sent.  
  *   
  * **Status After:** Event Attended.  
  *   
  * **SLA:** \<= 2 giây/lượt quét.  
  *   
  * **Notification:** Tín hiệu Check-in đồng bộ lên Dashboard Ban Tổ chức Sự kiện.  
  * 

### **Giai đoạn 4: Đối soát Chi phí Quảng cáo, Tính CAC/ROI & Báo cáo BI Analytics (Cost Matching & CAC/ROI Analytics)**

* **Step 06:**  
* 

  * **Actor:** Kế toán Thanh toán & Digital Exec.  
  *   
  * **Action:** Cuối chiến dịch (hoặc hàng tuần), Kế toán tải Hóa đơn chi phí Quảng cáo (từ Meta/Google/Agency) lên Yêu cầu Thanh toán (SOP-FIN-002). ERP tự động đối soát chi phí thực tế trên Hóa đơn với dữ liệu Chi phí tiêu tiền (Ad Spend API Data) truyền về từ Meta/Google API.  
  *   
  * **ERP Function:** Ad Spend API Sync & Invoice Cost Matching Engine.  
  *   
  * **Input:** File Hóa đơn Quảng cáo \+ API Spend Data từ Meta/Google.  
  *   
  * **Output:** Chi phí Marketing Thực tế được Hạch toán (Actual Campaign Expense Posted).  
  *   
  * **Business Rule:** BR-MKT-005: Nếu chi phí thực tế tiêu vượt quá **105% Ngân sách Chiến dịch** đã duyệt, ERP tự động tạm dừng tài khoản quảng cáo liên kết (Auto-Pause Campaign) và chặn thanh toán phần chi phí vượt quá cho đến khi có Phê duyệt Ngoại lệ của CFO.  
  *   
  * **Status Before:** Live Ad Running.  
  *   
  * **Status After:** Expense Reconciled & Posted.  
  *   
  * **SLA:** Hoàn tất đối soát trong 24 giờ.  
  *   
  * **Notification:** Alert gửi Marketing Manager.  
  *   
* **Step 07:**  
* 

  * **Actor:** ERP System (Full-Funnel CAC/ROI Calculation Engine) & Executive Management.  
  *   
  * **Action:** ERP tự động tính toán chuỗi chỉ số đo lường hiệu quả Marketing theo thời gian thực dựa trên kết quả chuyển đổi phễu CRM (SOP-CRM-001) và Hợp đồng đóng phí (SOP-ADM-003):  
  * 

    * CPL \= Tổng Chi phí Campaign / Số Lead Thu được  
    *   
    * Cost per Tour \= Tổng Chi phí Campaign / Số Lead Đến School Tour  
    *   
    * CAC (Cost per Enrolled) \= Tổng Chi phí Campaign / Số Học sinh Nhập học Đóng phí  
    *   
    * ROI / ROAS \= Total Revenue Generated (từ SOP-FIN-001) / Total Campaign Cost  
    *   
  * **ERP Function:** Real-time Full-Funnel Attribution & CAC/ROI BI Analytics.  
  *   
  * **Input:** Actual Campaign Expense \+ CRM Funnel Conversion Data \+ Revenue Data.  
  *   
  * **Output:** Báo cáo Hiệu quả Marketing & CAC BI Dashboard.  
  *   
  * **Business Rule:** Báo cáo BI tự động phân tích xếp hạng Kênh Marketing có hiệu quả CAC tốt nhất (Top Converting Channels) và Kênh kém hiệu quả cần cắt giảm.  
  *   
  * **Status Before:** Expense Reconciled.  
  *   
  * **Status After:** CAC/ROI Live Dashboard Rendered.  
  *   
  * **SLA:** Real-time calculation.  
  *   
  * **Notification:** Báo cáo BI Marketing Digest gửi Email cho CMO, CFO và CEO hàng tuần.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Lập Đề Xuất Chiến Dịch Marketing & Dự Toán Ngân Sách\]  
       │  
       ▼  
\[ERP Auto Budget Check Engine: Kiểm Tra Ngân Sách Marketing Khả Dụng\]  
       │  
       ◇ Ngân sách còn đủ (In-Budget)?  
       ├─ NO  ──► \[Chuyển Luồng Over-Budget Approval (CFO/CEO Duyệt)\]  
       └─ YES ──┐  
                │  
                ▼  
\[Multi-Level Campaign Approval Workflow (Marketing Mgr ──► CFO ──► CEO)\]  
                │  
                ▼  
\[ERP Auto UTM Link Generator: Sinh Đường Link Tracking Mã Hóa Chuẩn\]  
                │  
                ▼  
\[Triển Khai Quảng Cáo Digital (Meta/Google/TikTok/Zalo) & Đăng Ký Event\]  
                │  
                ▼  
\[Phụ Huynh Click Ads / Điền Form ──► ERP Webhook Integration Sync Lead Về CRM (SOP-CRM-001)\]  
       │  
       ◇ Khách Đăng Ký Sự Kiện Open Day?  
       ├─ YES ──► \[ERP Auto Sinh Mã QR Ticket ──► Gửi Zalo OA/SMS Cho Phụ Huynh\]  
       │               │  
       │               ▼  
       │          \[Ngày Event: Lễ Tân Quét QR Check-in Tại Cổng ──► Status: Event Attended\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Hành Trình Chuyển Đổi CRM (School Tour ──► Assessment ──► Enrolled SOP-ADM-003)\]  
                │  
                ▼  
\[Cuối Kỳ: ERP Sync Chi Phí Quảng Cáo API \+ Hóa Đơn ──► Reconcile Expense\]  
       │  
       ◇ Chi Phí Tiêu Vượt \> 105% Ngân Sách Approved?  
       ├─ YES ──► \[ERP AUTO-PAUSE CAMPAIGN ──► Chặn Thanh Toán ──► Alert CFO\]  
       └─ NO  ──┐  
                │  
                ▼  
\[ERP Auto Full-Funnel CAC/ROI Engine Running\]  
 (CPL \= Cost/Lead | CAC \= Cost/Enrolled | ROI \= Revenue/Cost)  
                │  
                ▼  
\[BI Dashboard Live Rendering: Hiển Thị Báo Cáo CAC / ROI Cho CMO, CFO & CEO\]  
                │  
                ▼  
           \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-MKT-001 (Marketing Budget Enforcement):** Mọi chiến dịch Marketing bắt buộc phải gắn với một Mã Ngân sách Marketing (Marketing Cost Center) khả dụng. ERP tự động khóa không cho khởi tạo chiến dịch nếu ngân sách đã cạn.  
*   
* **BR-MKT-002 (Mandatory Tracking UTM):** 100% đường link quảng cáo Digital (Bài đăng, Bánh banner, Nút đăng ký) bắt buộc phải sử dụng URL được sinh ra từ Công cụ UTM Generator của ERP. Mọi Lead phát sinh không có mã UTM hợp lệ sẽ bị gắn cờ Unattributed Lead và không được tính thưởng KPI cho nhóm Digital.  
*   
* **BR-MKT-003 (Auto Budget Capping Gate):** Hệ thống tích hợp tính năng tự động tạm dừng chiến dịch (Auto-Pause Ad Campaign via API) khi chi phí ghi nhận từ Meta/Google API chạm mốc **100% Ngân sách Chiến dịch được duyệt**.  
*   
* **BR-MKT-004 (Full-Funnel CAC Attribution):** Chỉ số CAC (Chi phí Thu mua Khách hàng) chỉ được ghi nhận khi Học sinh chuyển sang trạng thái Enrolled chính thức và đã phát sinh Phiếu thu học phí/tiền cọc thành công trên SOP-FIN-001. Lead hủy hoặc chưa đóng tiền không được tính vào mẫu số của CAC.  
*   
* **BR-MKT-005 (Data Privacy in Marketing):** Danh sách dữ liệu Phụ huynh thu thập từ các chiến dịch Marketing thuộc nhóm **Confidential Data**. Tuyệt đối cấm xuất file Excel thô danh sách SĐT/Email Phụ huynh cho các bên Agency thứ ba không có Hợp đồng Bảo mật Dữ liệu (NDA) ký kết với tập đoàn.  
* 

## **13\. Exception Cases**

* **Tài khoản Quảng cáo (Meta/Google Ads Account) bị tiêu vượt tiền do lỗi kỹ thuật Agency:**  
* 

  * *Xử lý:* ERP phát hiện Ad Spend API vượt mốc 105% ngân sách, lập tức kích hoạt API tạm dừng chiến dịch (Force Pause Campaign), phát Cảnh báo Đỏ cho CMO và Kế toán Thanh toán. Kế toán tạm giữ thanh toán hóa đơn Agency cho đến khi có biên bản giải trình sự cố.  
  *   
* **Sự kiện Open Day bị hủy đột xuất do Thiên tai / Mưa bão / Dịch bệnh:**  
* 

  * *Xử lý:* Trưởng phòng Marketing bấm "Hủy Sự kiện" (Cancel Event) trên ERP. Hệ thống tự động kích hoạt luồng gửi SMS Brandname / Zalo OA xin lỗi Phụ huynh, đồng thời tự động chuyển toàn bộ Lead đã đăng ký sự kiện sang luồng Online Consultation gán cho Tư vấn viên CRM (SOP-CRM-001).  
  *   
* **Phụ huynh điền sai Số điện thoại / Email khi đăng ký Form (Fake Lead):**  
* 

  * *Xử lý:* Tư vấn viên CRM bấm báo cờ Invalid / Fake Lead trên CRM. ERP tự động trừ bản ghi này khỏi tổng số Lead hợp lệ của Chiến dịch, tự động cập nhật lại chỉ số CPL Thực tế (Adjusted CPL).  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Chiến dịch Trong Ngân sách (\<= 20.000.000 VNĐ) | Digital Lead (Trình) | Marketing Manager | N/A |
| Phê duyệt Chiến dịch Trong Ngân sách (20.000.000 \- 100.000.000 VNĐ) | Marketing Manager | CFO / COO | CEO |
| Phê duyệt Chiến dịch Vượt Ngân sách hoặc \> 100.000.000 VNĐ | Marketing Manager | CFO | CEO / Board |
| Phê duyệt Báo cáo Quyết toán Chi phí Quảng cáo & Chênh lệch | Digital Lead | Marketing Manager | Kế toán trưởng |

## **15\. Status Lifecycle**

* **Campaign Status:** Draft \-\> Submitted \-\> Approved \-\> Live / Active \-\> Budget Capped (Paused) \-\> Completed \-\> Reconciled & Audited.  
*   
* **Event QR Ticket Status:** Generated \-\> Sent to Parent \-\> Checked-in (Attended) \-\> Expired (No Show).  
* 

## **16\. Data Model**

* **Primary Entity:** MarketingCampaign  
* 

  * CampaignID (PK, String, Unique)  
  *   
  * CampusID (FK, String, Nullable for Group), CampaignName (String)  
  *   
  * StartDate (Date), EndDate (Date), ApprovedBudget (Decimal)  
  *   
  * TargetLeads (Integer), TargetEnrolled (Integer), TargetCAC (Decimal)  
  *   
  * CampaignStatus (Enum: Draft, Submitted, Approved, Active, Paused, Completed)  
  *   
* **Related Entities:**  
* 

  * CampaignChannelBudget: ChannelBudgetID (PK), CampaignID (FK), MarketingChannel (Enum: Meta, Google, Zalo, TikTok, Event, OOH), AllocatedAmount (Decimal), ActualSpent (Decimal).  
  *   
  * UtmTrackingLink: UtmID (PK), CampaignID (FK), MarketingChannel (Enum), UtmSource (String), UtmMedium (String), UtmCampaign (String), FullTrackingURL (Text), ClicksCount (Integer).  
  *   
  * EventCheckInLog: EventLogID (PK), CampaignID (FK), LeadID (FK), QRTicketCode (String, Unique), CheckInTimestamp (DateTime), CheckInBy (FK, UserID).  
  *   
  * CampaignPerformanceMetric: MetricID (PK), CampaignID (FK), TotalSpent (Decimal), TotalLeads (Integer), TotalTours (Integer), TotalEnrolled (Integer), CalculatedCPL (Decimal), CalculatedCAC (Decimal), CalculatedROAS (Decimal), LastSyncedAt (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-MKT-001: Đề xuất Chiến dịch Marketing & Dự toán Ngân sách Điện tử (Digital Campaign Proposal).  
*   
* FRM-MKT-002: Vé Mời QR Code Tham dự Sự kiện Open Day (Event QR Ticket & Confirmation).  
*   
* FRM-MKT-003: Bảng Đối soát Chi phí Quảng cáo & Hóa đơn Agency (Ad Spend & Invoice Reconciliation Sheet).  
*   
* FRM-MKT-004: Báo cáo BI Phân tích Chỉ số CAC, CPL & ROI Chiến dịch (Marketing Performance & CAC Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-MKT-001 (MUST):** Tích hợp Auto UTM Link Generator: Cho phép tự động sinh và quản lý các đường link tracking mã hóa UTM chuẩn cho mọi bài đăng quảng cáo.  
*   
* **FR-MKT-002 (MUST):** Tích hợp Meta / Google / TikTok / Zalo Ads API: Cho phép ERP tự động đồng bộ số tiền chi tiêu quảng cáo (Ad Spend) thời gian thực từ các nền tảng về hệ thống.  
*   
* **FR-MKT-003 (MUST):** Tích hợp Auto Ad Budget Capping Gate: Tự động gọi API tạm dừng quảng cáo khi chi phí tiêu đạt 100% ngân sách được duyệt.  
*   
* **FR-MKT-004 (MUST):** Phân hệ Event QR Check-in App: Cho phép Lễ tân dùng Tablet quét mã QR Ticket check-in nhanh cho Phụ huynh tham dự Open Day.  
*   
* **FR-MKT-005 (MUST):** Phân hệ Full-Funnel CAC & ROI BI Analytics: Tự động tính toán các chỉ số CPL, Cost-per-Tour, CAC, ROAS và trực quan hóa trên BI Dashboard.  
* 

## **19\. Automation Opportunities**

* **AUTO-MKT-001 (INTEGRATION):** Tự động đẩy Lead từ Facebook Lead Ads / Zalo Mini App / Web Form về CRM (SOP-CRM-001) trong 3 giây đính kèm mã UTM tracking.  
*   
* **AUTO-MKT-002 (WORKFLOW):** Tự động sinh vé QR Ticket và gửi tin nhắn Zalo OA / SMS Brandname xác nhận cho Phụ huynh đăng ký tham dự sự kiện.  
*   
* **AUTO-MKT-003 (RULE ENGINE):** Tự động tạm dừng quảng cáo via API khi Ad Spend chạm mốc mốc ngân sách tối đa được duyệt.  
*   
* **AUTO-MKT-004 (BI ANALYTICS):** Tự động tính toán chỉ số CAC thực tế bằng cách đối soát dữ liệu chi phí Marketing với dữ liệu Hợp đồng đóng phí từ Phân hệ Tài chính.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Phê duyệt Đề xuất Chiến dịch Mới | Marketing Mgr / CFO | Mobile App Push \+ ERP Alert | Immediate khi submit |
| Cảnh báo Ad Spend Đạt 80% Ngân sách | Digital Exec & Marketing Mgr | ERP High Alert \+ Push | Immediate khi reached 80% |
| CẢNH BÁO TẠM DỪNG QUẢNG CÁO (100% Budget) | Marketing Mgr & CFO | Loud Sound \+ Push \+ Email | Immediate khi reached 100% |
| Xác nhận Vé Mời QR Sự kiện Open Day | Phụ huynh | Zalo OA \+ SMS Brandname | Immediate khi đăng ký Form |
| Báo cáo BI CAC / ROI Chiến dịch Tuần | CMO, CFO, CEO | Email \+ BI Dashboard Sync | 08:00 AM Thứ Hai hàng tuần |

## **21\. Permission Matrix (RBAC)**

| Role | View Campaign | Create Proposal | Approve Budget | Generate UTM Link | Scan Event QR | View Full CAC Report |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Digital / Mkt Exec | Own / Assigned | Full | No | Full | No | Read Only |
| Event Staff / Lễ tân | Event List Only | No | No | No | Full (Scan QR) | No |
| Marketing Manager | Full Enterprise | Full | Full (In limit) | Full | Full | Full Enterprise |
| Kế toán Phí / AP | Financial Only | No | Review Only | No | No | Cost Only |
| CMO / CFO / CEO | Full Enterprise | Read Only | Full (Override) | Read Only | View Only | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi thao tác Tạo, Sửa, Duyệt, Thay đổi Ngân sách Chiến dịch (User ID, Timestamp, Ngân sách cũ, Ngân sách mới).  
*   
* Nhật ký sinh đường link UTM Tracking và thông số UTM đính kèm.  
*   
* Nhật ký đồng bộ dữ liệu Ad Spend từ Meta/Google API (Timestamp, Số tiền tiêu ghi nhận, Response code).  
*   
* Lịch sử quét mã QR Check-in Sự kiện Open Day (Timestamp, Lễ tân thực hiện, Mã QR Ticket).  
*   
* Lịch sử điều chỉnh chi phí quảng cáo thực tế khi làm thủ tục quyết toán kế toán.  
* 

## **23\. Internal Controls**

* **Mandatory UTM Tracking Gate:** Khóa không cho tính thưởng KPI hoặc ghi nhận hiệu quả nếu bài đăng quảng cáo không gắn mã UTM do ERP sinh ra.  
*   
* **Ad Spend API vs Invoice Cross-Match:** Bắt buộc đối soát 100% giữa số tiền tiêu trên API nền tảng với Hóa đơn GTGT của Agency/Nhà mạng trước khi thanh toán.  
*   
* **Strict Ad Budget Capping Control:** Hệ thống tự động kích hoạt lệnh tạm dừng quảng cáo via API khi chạm mốc 100% ngân sách được duyệt, triệt tiêu rủi ro tiêu tiền quá tay.  
*   
* **Deduplicated CAC Calculation:** Bắt buộc mã hóa định danh duy nhất cho từng học sinh để đảm bảo 1 học sinh chỉ tính 1 lần vào mẫu số của chỉ số CAC.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Phê duyệt Chiến dịch & Ngân sách** | Thời gian từ khi submit đề xuất đến khi duyệt xong | **\<= 4 giờ làm việc** | Marketing Mgr & CFO |
| **Tỷ lệ Lead Có Mã Tracking UTM (UTM Rate)** | (Số Lead có mã UTM tracking / Tổng số Lead nhận) \* 100 | **\>= 98%** | Digital Marketing Exec |
| **Tỷ lệ Tham dự Sự kiện Open Day (Attendance Rate)** | (Số Lead quét QR Check-in / Số Lead đăng ký) \* 100 | **\>= 60%** | Event Team & Admission |
| **Tỷ lệ Tuân thủ Ngân sách Quảng cáo (Budget Accuracy)** | (Số tiền tiêu thực tế \- Ngân sách Approved) / Ngân sách | **\<= 0% (Không tiêu vượt)** | Marketing Manager |
| **Chỉ số CAC Mục tiêu (Target CAC)** | Tổng Chi phí Campaign / Số Học sinh Enrolled | **\<= Mức Trần CAC Quy Định** | CMO & Marketing Mgr |

## **25\. Dashboard / Report**

* **Omnichannel Ad Performance Live Monitor (Marketing Team):** Màn hình theo dõi số tiền tiêu real-time theo kênh (Meta, Google, Zalo, TikTok), Chỉ số CPL real-time, Số lượng Lead thu được trong ngày.  
*   
* **Event Open Day Operations Monitor (Event & BGH):** Bảng theo dõi số lượng đăng ký sự kiện, Tỷ lệ Phụ huynh đã quét mã QR Check-in tại cổng trường, Bảng theo dõi phân bổ tư vấn viên tại sự kiện.  
*   
* **Executive Full-Funnel CAC & ROI BI Dashboard (CMO, CFO, CEO):** Biểu đồ phễu chuyển đổi toàn diện (Cost \-\> CPL \-\> Cost/Tour \-\> CAC \-\> ROAS), So sánh hiệu quả CAC giữa các cơ sở mầm non, Xếp hạng Kênh Marketing có ROI cao nhất.  
* 

## **26\. Integration**

* **Ads Platforms APIs (Meta Business, Google Ads, Zalo Ads, TikTok Ads):** Kết nối API 2 chiều để lấy dữ liệu Ad Spend real-time và gửi lệnh Auto-Pause Campaign.  
*   
* **CRM & Lead Management (SOP-CRM-001):** Tự động đồng bộ Lead đa kênh và nhận dữ liệu chuyển đổi phễu.  
*   
* **Student Enrollment & Billing (SOP-ADM-003 & SOP-FIN-001):** Nhận dữ liệu Học sinh nhập học chính thức và Doanh thu thực tế để tính chỉ số CAC & ROI.  
*   
* **Zalo Notification Service (ZNS) & SMS Brandname Gateway:** Tự động gửi vé QR Ticket sự kiện và thông báo xác nhận.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Quảng cáo chạy tiêu tiền quá tay vượt ngân sách** | High | Low | ERP Auto Ad Budget Capping Gate tự động tạm dừng chiến dịch via API tại mốc 100%. | Marketing Mgr & IT |
| **Mù chỉ số CAC do dữ liệu Marketing rải rác** | High | Medium | Tích hợp Full-Funnel Attribution Engine tự động tính CAC từ CRM & Finance. | CMO & ERP Architect |
| **Gian lận chi phí quảng cáo từ Agency ngoài** | High | Low | Bắt buộc đối soát 3 chiều giữa API Spend Data, Báo cáo Campaign và Hóa đơn Thuế. | Kế toán trưởng |
| **Vi phạm Luật Bảo vệ Dữ liệu Cá nhân khi spam Mkt** | Critical | Low | Tuân thủ Parental Consent (SOP-SEC-001); Tự động loại trừ SĐT Opt-Out khỏi danh sách chạy Ads. | Legal Officer & Mkt Mgr |

## **28\. Acceptance Criteria**

* **Given:** Digital Exec khởi tạo Chiến dịch Tuyển sinh Mùa hè cho Cơ sở 1 với Ngân sách 50.000.000 VNĐ.  
*   
* **When:** Chiến dịch chạy quảng cáo trên Meta Ads và số tiền tiêu ghi nhận từ Meta API đạt mốc 50.000.000 VNĐ (100% Ngân sách).  
*   
* **Then:** ERP Auto Ad Budget Capping Gate lập tức gọi API sang Meta Ads tạm dừng chiến dịch (Pause Ad Set), phát còi báo động trên App của Marketing Manager và CFO, đồng thời khóa không cho Kế toán thanh toán các chi phí phát sinh vượt mốc 50 triệu VNĐ.  
*   
* **Given:** Phụ huynh điền Form đăng ký tham dự Open Day từ một bài đăng quảng cáo trên Facebook.  
*   
* **When:** Phụ huynh bấm "Đăng ký".  
*   
* **Then:** ERP tự động tiếp nhận Lead trong 3 giây, trích xuất chính xác mã utm\_source=facebook\&utm\_campaign=openday\_summer, tự động sinh mã Event QR Ticket gửi về Zalo OA của Phụ huynh, đồng thời đồng bộ Lead về CRM (SOP-CRM-001).  
* 

## **29\. Test Scenarios**

1. **Happy Path Full-Funnel Mkt Cycle Test:** Khởi tạo Campaign \-\> Approved Ngân sách \-\> Sinh URL UTM \-\> Chạy Ads thu Lead \-\> Phụ huynh nhận QR Ticket \-\> Quét QR Check-in Open Day \-\> Học sinh Enrolled đóng phí \-\> ERP Auto Calculation CPL, CAC & ROI trên BI Dashboard thành công.  
2.   
3. **Auto Ad Budget Capping Test:** Giả lập dữ liệu Ad Spend API chạm mốc 100% ngân sách \-\> Kiểm tra xem ERP có gọi API tạm dừng chiến dịch và phát alert cho CMO/CFO không.  
4.   
5. **Untracked Link Blocking Test:** Cố tình nhập Lead thủ công không có mã UTM \-\> Kiểm tra xem ERP có tự động xếp vào nhóm Unattributed Lead và cảnh báo cho Digital Exec không.  
6.   
7. **Real-Time CAC Calculation Accuracy Test:** Có 10 Lead nhập học từ Campaign A (Tổng chi phí 20.000.000 VNĐ) \-\> Kiểm tra xem BI Dashboard có hiển thị chính xác chỉ số CAC \= 2.000.000 VNĐ/Enrolled Student không.  
8.   
9. **Event QR Check-in Speed Test:** Thực hiện quét mã QR Ticket tại cổng trường bằng App Mobile Lễ tân \-\> Kiểm tra xem thời gian xử lý Check-in và đồng bộ trạng thái Event Attended có dưới 2 giây không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận hạn mức duyệt ngân sách Marketing; Cấu hình công thức tính CPL, CAC, ROAS; Cấu hình bộ mã UTM chuẩn toàn tập đoàn; Cấu hình mốc cảnh báo ngân sách (80%, 100%, 105%).  
*   
* **Master Data Migration:** Import danh mục các Kênh Marketing, danh mục Cơ sở và mã Ngân sách Marketing năm; Đồng bộ lịch sử các chiến dịch cũ để làm Baseline so sánh.  
*   
* **Hardware & Integration:** Tích hợp API 2 chiều với Meta Business, Google Ads API, TikTok Ads API, Zalo OA API; Tích hợp Cổng gửi SMS Brandname; Trang bị Tablet quét QR Code cho Lễ tân các cơ sở.  
*   
* **Training & Change Management:** Đào tạo Đội ngũ Marketing quy trình sinh link UTM và quản lý ngân sách chiến dịch trên ERP; Đào tạo Lễ tân/Staff sự kiện quy trình quét mã QR Ticket Check-in; Đào tạo Ban Điều hành (CMO/CFO/CEO) kỹ năng phân tích chỉ số CAC & ROI trên BI Dashboard.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (18 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  10.   
  11. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  12.   
  13. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  14.   
  15. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  16.   
  17. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  18.   
  19. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  20.   
  21. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  22.   
  23. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  24.   
  25. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  26.   
  27. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  28.   
  29. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  30.   
  31. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  32.   
  33. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  34.   
  35. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  36.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **07 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
│                                │                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 21

# **SOP-CS-001 — QUY TRÌNH TIẾP NHẬN & XỬ LÝ KHIẾU NẠI PHỤ HUYNH (COMPLAINT MANAGEMENT), GIẢI QUYẾT YÊU CẦU DỊCH VỤ (SERVICE REQUEST) VÀ ĐO LƯỜNG CHỈ SỐ HÀI LÒNG CSAT / NPS**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-CS-001  
*   
* **Tên SOP:** Quy trình Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Giải quyết Yêu cầu Dịch vụ (Service Request) và Đo lường Chỉ số Hài lòng CSAT / NPS  
*   
* **Module ERP:** Parent Communication (62), Notification Management (63), Helpdesk / Service Request (64), Complaint Management (65), Quality Assurance (66), Risk Management (68), Management Dashboard & BI (70)  
*   
* **Process Owner:** Trưởng phòng Dịch vụ Khách hàng & Trải nghiệm Phụ huynh (Head of Customer Service & Parent Experience)  
*   
* **Department:** Bộ phận Chăm sóc Khách hàng (CSKH), Ban Giám hiệu các Cơ sở, Khối Giáo viên Mầm non, Bộ phận Y tế, Bộ phận Bếp ăn, Bộ phận Xe bus  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Điều hành (CEO) / Giám đốc Vận hành (COO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ chu trình quản trị trải nghiệm và giải quyết phản hồi/khiếu nại của Phụ huynh mầm non: từ việc tiếp nhận Yêu cầu Dịch vụ (Service Request) và Khiếu nại (Complaint Ticket) qua kênh duy nhất Mobile App Phụ huynh / Hotline / Kiosk Cổng trường, phân loại Mức độ Nghiêm trọng (Severity Level 1-4), định tuyến tự động (Auto-Routing) tới đúng Bộ phận xử lý, theo dõi đồng hồ đếm ngược SLA khắc phục, quy trình Leo cấp (Escalation Workflow) gửi Ban Giám hiệu và Ban Điều hành Tập đoàn khi có nguy cơ rủi ro truyền thông/pháp lý, đến việc khảo sát tự động đánh giá mức độ hài lòng (CSAT \- Customer Satisfaction Score & NPS \- Net Promoter Score) để liên tục cải tiến chất lượng vận hành trường học.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thành viên và các bộ phận vận chuyển (School Bus), Bếp ăn, Y tế thuộc hệ thống.  
*   
* **Phòng ban:** Bộ phận Chăm sóc Khách hàng (CSKH), Ban Giám hiệu Cơ sở, Khối Giáo viên (Chủ nhiệm, Trợ giảng, Bộ môn), Bộ phận Y tế, Bếp ăn, Xe bus, Facility, Kế toán, Bảo vệ.  
*   
* **Đối tượng:** Toàn bộ Phụ huynh / Người giám hộ học sinh đang theo học (Active/Enrolled), học sinh đã rút học (Alumni) hoặc Phụ huynh tiềm năng quan tâm trường.  
*   
* **Trường hợp không áp dụng:** Khủng hoảng truyền thông báo chí hoặc khiếu kiện pháp lý chính thức tại Tòa án / Cơ quan Quản lý Nhà nước (áp dụng SOP-GOV-004: Quản trị Rủi ro & Truyền thông Khủng hoảng).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Service Request (Yêu cầu Dịch vụ / Hỏi đáp):** Các thắc mắc, đề nghị hỗ trợ thông thường của Phụ huynh (như đăng ký xe bus, đăng ký ăn sáng, xin cấp lại thẻ từ, hỏi thông tin biểu phí, xin nghỉ phép) không mang tính chất bất 満 hay khiếu nại.  
*   
* **Parent Complaint Ticket (Ticket Khiếu nại Phụ huynh):** Phản ánh chính thức của Phụ huynh thể hiện sự không hài lòng về chất lượng chăm sóc, giảng dạy, an toàn y tế, an toàn bếp ăn, thái độ ứng xử của nhân sự hoặc sai lệch tài chính.  
*   
* **CSAT (Customer Satisfaction Score):** Chỉ số đo lường mức độ hài lòng tức thì của Phụ huynh sau mỗi lượt xử lý Ticket hoặc sự kiện (Thang điểm 1–5 Sao).  
*   
* **NPS (Net Promoter Score):** Chỉ số đo lường mức độ sẵn sàng giới thiệu trường cho người thân/bạn bè của Phụ huynh (Thang điểm 0–10, phân loại thành Promoters, Passives, Detractors) được khảo sát định kỳ 06 tháng/lần.  
*   
* **First Contact Resolution (FCR \- Tỷ lệ Xử lý Ngay Lần đầu):** Tỷ lệ các Yêu cầu Dịch vụ được giải quyết dứt điểm ngay trong cuộc gọi/tương tác đầu tiên mà không cần chuyển tiếp phòng ban.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tiếp nhận, Quét trùng & Triệt phân loại Ticket (Severity 1-4) | CSKH Lead / Call Center | Head of CSKH | Phụ huynh | BGH Cơ sở |
| Định tuyến Ticket & Theo dõi SLA Xử lý | ERP System / CSKH | Head of CSKH | Bộ phận xử lý | Hiệu trưởng |
| Trực tiếp Xử lý, Khắc phục Sự cố & Cập nhật Tiến độ | Bộ phận liên quan (GV/Bếp/Y tế/Bus/Tài chính) | Hiệu trưởng Cơ sở | CSKH Officer | Phụ huynh |
| Phê duyệt Phương án Bồi thường / Giải quyết Ngoại lệ | Hiệu trưởng Cơ sở / CSKH Head | Group COO / CFO | Legal / QA | Phụ huynh |
| Đóng Ticket, Đo lường CSAT & Phân tích Nguyên nhân Root-Cause | CSKH Officer | Head of CSKH | QA Manager | CEO / Board |

*Ghi chú: Việc tiếp nhận thông tin phản ánh của Phụ huynh, cam kết bảo mật thông tin gia đình học sinh và xử lý bồi thường thiệt hại cần kiểm tra/đối chiếu quy định hiện hành của Pháp luật Việt Nam (Luật Trẻ em 2016, Luật Bảo vệ Quyền lợi Người tiêu dùng 2023, Nghị định 13/2023/NĐ-CP) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Loại Khiếu nại (ComplaintCategoryMaster), Ma trận SLA Xử lý (ServiceSLAMaster), Danh mục Bộ phận Chuyên trách (DepartmentRoutingMaster), Ma trận Hạn mức Bồi thường (CompensationMatrixMaster).  
*   
* **Kênh Tiếp nhận:** Tích hợp 100% qua Mobile App Phụ huynh, Tổng đài CTI Call Center, Kiosk Lễ tân Cổng trường hoặc Form Website.  
*   
* **Hồ sơ Học sinh:** Thông tin Phụ huynh & Học sinh liên kết trực tiếp trên Phân hệ SIS (SOP-ADM-003).  
* 

## **7\. Trigger**

* **Phụ huynh Khởi tạo:** Phụ huynh gửi Yêu cầu Dịch vụ hoặc Đơn Khiếu nại trên Mobile App.  
*   
* **Tổng đài / Lễ tân Ghi nhận:** Khách gọi Hotline hoặc gặp trực tiếp Lễ tân phản ánh bất 満.  
*   
* **Hệ thống Tự động (Auto-Trigger):** ERP tự động sinh Complaint Ticket khi Phụ huynh đánh giá Sổ liên lạc hàng ngày (SOP-SIS-002) dưới 3 Sao hoặc khi có sự cố Y tế Cấp độ 2-3 (SOP-MED-001).  
* 

## **8\. Quy trình AS-IS**

* Phụ huynh bức xúc nhắn tin vào nhóm Zalo chung của Lớp hoặc gọi điện trực tiếp cho Giáo viên chủ nhiệm.  
*   
* Giáo viên sợ bị trừ thi đua nên giấu thông tin, tự hứa hẹn giải quyết với Phụ huynh mà không báo cáo Ban Giám hiệu.  
*   
* Trường hợp bức xúc không được giải quyết triệt để, Phụ huynh đăng bài bóc phốt lên các Hội nhóm Mạng xã hội (Facebook Groups), gây khủng hoảng truyền thông nghiêm trọng cho toàn trường.  
*   
* Không có công cụ đo lường xem mỗi tháng có bao nhiêu khiếu nại, khiếu nại tập trung vào vấn đề gì (Bếp ăn, Xe bus, Giáo viên hay Học phí), không đo lường được chỉ số CSAT/NPS.  
*   
* **Hệ quả:** Mất học sinh do trải nghiệm kém; suy giảm uy tín thương hiệu nghiêm trọng; không có dữ liệu để cải tiến chất lượng vận hành; Ban Điều hành luôn ở thế bị động khi có sự cố.  
* 

## **9\. Pain Points / Risk**

* **Unmonitored Informal Channels:** Tương tác qua Zalo/Điện thoại cá nhân của giáo viên gây trôi thông tin, không có bằng chứng đối soát khi xảy ra tranh chấp.  
*   
* **Lack of SLA & Ownership:** Khiếu nại đùn đẩy giữa các phòng ban (Giáo viên đổ lỗi cho Bếp ăn, Bếp ăn đổ lỗi cho Mua sắm), kéo dài thời gian xử lý làm Phụ huynh càng giận dữ.  
*   
* **Social Media Risk (Mối nguy Khủng hoảng Truyền thông):** Phụ huynh không có kênh khiếu nại chính thức minh bạch sẽ tìm đến Mạng xã hội để xả bức xúc.  
*   
* **No Root-Cause Analytics:** Xử lý sự cố mang tính chữa cháy tạm thời, không phân tích nguyên nhân gốc rễ (Root Cause) để ngăn ngừa lỗi lặp lại.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tiếp nhận, Quét trùng & Phân loại Severity Ticket (Ticket Capture & Triage)**

* **Step 01:**  
* 

  * **Actor:** Phụ huynh / ERP System / CSKH Call Center.  
  *   
  * **Action:** Phụ huynh mở Mobile App, chọn "Gửi Yêu cầu / Phản hồi", chọn Chủ đề (Ăn uống, Y tế, Xe bus, Học phí, Thái độ nhân sự...), nhập nội dung, đính kèm ảnh/video/file âm thanh và bấm "Gửi". Trường hợp gọi Hotline, CSKH nghe máy và tạo Ticket hộ trên màn hình Call Center CTI Screen.  
  *   
  * **ERP Function:** Omnichannel Ticket Capture & Auto-Deduplication Engine.  
  *   
  * **Input:** Thông tin Phụ huynh, Chủ đề, Nội dung phản ánh, File đính kèm.  
  *   
  * **Output:** Ticket mới khởi tạo (New CS Ticket).  
  *   
  * **Business Rule:** BR-CS-001: Hệ thống tự động kiểm tra xem trong vòng **24 giờ** qua Phụ huynh này đã tạo Ticket cùng chủ đề chưa. Nếu trùng, ERP tự động gộp nội dung vào Ticket cũ (Merge Ticket) và báo cờ Duplicate Mention.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** New Ticket / Deduplicated.  
  *   
  * **SLA:** Real-time (\<= 3 giây).  
  *   
  * **Notification:** SMS/App Push xác nhận cho Phụ huynh: *"Trường \[Tên\] đã nhận Yêu cầu số \[\#TicketID\]. Bộ phận CSKH sẽ phản hồi trong vòng \[SLA\] phút"*.  
  *   
* **Step 02:**  
* 

  * **Actor:** ERP System (AI Triage & Severity Classifier) & CSKH Lead.  
  *   
  * **Action:** ERP tự động quét từ khóa (Text Mining) và phân loại Mức độ Nghiêm trọng (Severity Level 1 \- 4):  
  * 

    * *Severity 1 (Thấp):* Yêu cầu dịch vụ thông thường (Hỏi học phí, xin đăng ký bus, đổi thông tin).  
    *   
    * *Severity 2 (Trung bình):* Phản ánh chất lượng dịch vụ nhẹ (Bữa ăn nguội, xe bus trễ 10p, quên gửi đồ).  
    *   
    * *Severity 3 (Nặng):* Phản ánh vết trầy xước trên người trẻ, thái độ giáo viên gắt gao, nhầm lẫn tiền học phí lớn.  
    *   
    * *Severity 4 (Cực kỳ Nghiêm trọng):* Bạo lực học đường, ngộ độc thực phẩm, bỏ quên trẻ, sự cố y tế nặng, đe dọa đăng bài lên Mạng xã hội.  
    *   
  * **ERP Function:** Auto Severity Classification & Emergency Route.  
  *   
  * **Input:** Nội dung Ticket, Từ khóa nhận diện rủi ro (Crisis Keywords).  
  *   
  * **Output:** Ticket được phân loại Severity chính thức.  
  *   
  * **Business Rule:** BR-CS-002: Ticket Severity 4 bắt buộc kích hoạt cờ Red-Flag Crisis Alert, tự động gửi Pop-up báo động đỏ tới điện thoại Hiệu trưởng Cơ sở, Head of CSKH, COO và Trưởng phòng Truyền thông trong vòng 60 giây.  
  *   
  * **Status Before:** New Ticket.  
  *   
  * **Status After:** Triaged / Severity Assigned.  
  *   
  * **SLA:** \<= 5 phút triệt phân loại.  
  *   
  * **Notification:** High Priority Alert gửi Ban Giám hiệu và Ban Điều hành nếu Severity 4\.  
  * 

### **Giai đoạn 2: Định tuyến Tự động, Đếm ngược SLA & Xử lý Khắc phục (Auto-Routing & Resolution)**

* **Step 03:**  
* 

  * **Actor:** ERP System (Auto-Routing Engine) & Bộ phận Chuyên trách.  
  *   
  * **Action:** ERP tự động chuyển Ticket đến đúng Bộ phận chuyên trách tại Cơ sở (Bếp ăn \-\> Bếp trưởng; Y tế \-\> Cán bộ Y tế; Giảng dạy \-\> Hiệu trưởng; Học phí \-\> Kế toán) đính kèm Đồng hồ đếm ngược SLA Xử lý:  
  * 

    * *Severity 1:* SLA phản hồi \<= 2 giờ làm việc.  
    *   
    * *Severity 2:* SLA phản hồi \<= 4 giờ làm việc.  
    *   
    * *Severity 3:* SLA phản hồi \<= 12 giờ làm việc.  
    *   
    * *Severity 4:* SLA có mặt / phản hồi trực tiếp \<= **30 phút**.  
    *   
  * **ERP Function:** Department Auto-Routing & SLA Countdown Engine.  
  *   
  * **Input:** Severity Level, Category, CampusID.  
  *   
  * **Output:** Ticket gán cho Chuyên viên xử lý (Assigned Ticket).  
  *   
  * **Business Rule:** BR-CS-003: Nếu Ticket quá 50% thời gian SLA mà Bộ phận chưa bấm "Bắt đầu Xử lý", ERP tự động phát alert nhắc nhở. Nếu quá 100% SLA chưa xong, ERP tự động leo cấp (Escalate) lên Hiệu trưởng Cơ sở.  
  *   
  * **Status Before:** Triaged.  
  *   
  * **Status After:** Assigned / In Progress.  
  *   
  * **SLA:** Khởi chạy đồng hồ SLA ngay khi gán.  
  *   
  * **Notification:** Alert Push tới App của Chuyên viên xử lý.  
  *   
* **Step 04:**  
* 

  * **Actor:** Bộ phận Xử lý (GVCN / Bếp / Y tế / Kế toán) & CSKH Officer.  
  *   
  * **Action:** Chuyên viên kiểm tra sự việc thực tế (Xem lại Camera CCTV, kiểm tra nhật ký điểm danh, phỏng vấn nhân sự), thực hiện biện pháp khắc phục, nhập nội dung phương án giải quyết vào Ticket và bấm "Trình Duyệt Phương Án".  
  *   
  * **ERP Function:** Resolution Action Logging & Internal Collaboration.  
  *   
  * **Input:** Nhật ký kiểm tra, Nguyên nhân gốc rễ (Root Cause), Phương án khắc phục, Đề xuất bồi thường (nếu có).  
  *   
  * **Output:** Phương án giải quyết Ticket (Proposed Resolution).  
  *   
  * **Business Rule:** BR-CS-004: Mọi đề xuất Bồi thường/Giảm trừ Học phí phải tuân thủ Ma trận Hạn mức Bồi thường (Compensation Matrix): Hiệu trưởng cơ sở duyệt \<= 2.000.000 VNĐ; Head of CSKH/CFO duyệt \> 2.000.000 VNĐ.  
  *   
  * **Status Before:** In Progress.  
  *   
  * **Status After:** Resolution Proposed.  
  *   
  * **SLA:** Tuân thủ SLA của Severity Level.  
  *   
  * **Notification:** Alert gửi Hiệu trưởng / CSKH Head duyệt.  
  * 

### **Giai đoạn 3: Phản hồi Phụ huynh, Nghiệm thu & Đo lường CSAT / NPS (Parent Response & CSAT/NPS Rating)**

* **Step 05:**  
* 

  * **Actor:** CSKH Officer / Hiệu trưởng Cơ sở & Phụ huynh.  
  *   
  * **Action:** Sau khi Phương án giải quyết được duyệt, CSKH Officer (hoặc Hiệu trưởng nếu Severity 3-4) gọi điện / gặp trực tiếp Phụ huynh để trao đổi kết quả xử lý. Sau đó bấm "Gửi Phản hồi Chính thức" trên App cho Phụ huynh.  
  *   
  * **ERP Function:** Official Parent Response & Ticket Resolution.  
  *   
  * **Input:** Báo cáo giải trình chính thức, Lời xin lỗi / Cam kết cải tiến.  
  *   
  * **Output:** Ticket chuyển trạng thái Đã Giải quyết (Resolved Ticket).  
  *   
  * **Status Before:** Resolution Proposed.  
  *   
  * **Status After:** Resolved / Pending CSAT.  
  *   
  * **SLA:** \<= 1 giờ sau khi duyệt phương án.  
  *   
  * **Notification:** App Push \+ Zalo OA thông báo cho Phụ huynh: *"Khiếu nại \[\#TicketID\] của Phụ huynh đã được Hiệu trưởng xử lý xong. Bấm để xem chi tiết và đánh giá"*.  
  *   
* **Step 06:**  
* 

  * **Actor:** Phụ huynh & ERP System (CSAT / NPS Engine).  
  *   
  * **Action:** Phụ huynh mở App, xem nội dung giải trình. ERP tự động hiển thị Màn hình Đánh giá CSAT:  
  * 

    * *Đánh giá 4–5 Sao:* Ticket tự động chuyển trạng thái Closed.  
    *   
    * *Đánh giá 1–3 Sao (Không hài lòng):* ERP tự động Mở lại Ticket (Re-open Ticket), chuyển thẳng lên Head of CSKH & Group COO xử lý vòng 2\.  
    *   
  * **ERP Function:** Automated CSAT / NPS Survey & Auto Re-open Engine.  
  *   
  * **Input:** Đánh giá 1-5 Sao của Phụ huynh \+ Nhận xét bổ sung.  
  *   
  * **Output:** Điểm CSAT được ghi nhận \-\> Ticket Closed hoặc Re-opened.  
  *   
  * **Business Rule:** BR-CS-005: Ticket bị Re-open do CSAT thấp (1-3 sao) bắt buộc phải có cuộc gọi làm việc trực tiếp của Trưởng phòng CSKH Chuỗi trong vòng **12 giờ**.  
  *   
  * **Status Before:** Resolved / Pending CSAT.  
  *   
  * **Status After:** Closed (Satisfaction Achieved) hoặc Re-opened (Escalated).  
  *   
  * **SLA:** Phụ huynh đánh giá trong vòng 48 giờ (Sau 48h tự động Closed).  
  *   
  * **Notification:** Alert gửi Head of CSKH nếu CSAT 1-3 Sao.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Phụ Huynh Gửi Yêu Cầu / Khiếu Nại Trên App HOẶC Gọi Call Center\]  
       │  
       ▼  
\[ERP Omnichannel Engine: Check Trùng 24h ──► Auto Merge Nếu Trùng\]  
       │  
       ▼  
\[ERP AI Triage: Phân Loại Severity Level 1 \- 4 (Từ Khóa Rủi Ro Crisis)\]  
       │  
       ◇ Severity Level 4 (Khủng Hoảng / Cực Kỳ Nghiêm Trọng)?  
       ├─ YES ──► \[ERP BẬT CÒI BÁO ĐỘNG ĐỎ VỀ PHONE CEO, COO, BGH & TRUYỀN THÔNG\]  
       └─ NO  ──┐  
                │  
                ▼  
\[ERP Auto-Routing Engine: Định Tuyến Về Đúng Bộ Phận (Bếp/Y Tế/Bus/GV/FIN)\]  
       │  
       ▼  
\[Đếm Ngược SLA Xử Lý (Sev 1: 2h | Sev 2: 4h | Sev 3: 12h | Sev 4: 30p)\]  
       │  
       ◇ Quá 100% Thời Gian SLA Chưa Xử Lý?  
       ├─ YES ──► \[ERP AUTO ESCALATE LÊN HIỆU TRƯỞNG CƠ SỞ & HEAD OF CSKH\]  
       └─ NO  ──┐  
                │  
                ▼  
\[Bộ Phận Chuyên Trách Kiểm Tra Thực Tế (CCTV, Log) ──► Đề Xuất Phương Án Giải Quyết\]  
       │  
       ◇ Có Đề Xuất Bồi Thường / Giảm Học Phí?  
       ├─ YES ──► \[Kiểm Tra Compensation Matrix ──► Hiệu Trưởng / CFO Duyệt\]  
       └─ NO  ──┐  
                │  
                ▼  
\[CSKH Officer / Hiệu Trưởng Gọi Điện Trao Đổi ──► Bấm "Gửi Phản Hồi App"\]  
       │  
       ▼  
\[Phụ Huynh Đánh Giá CSAT Trên App (Thang Điểm 1 \- 5 Sao)\]  
       │  
       ◇ CSAT Rating (1 \- 3 Sao: Không Hài Lòng)?  
       ├─ YES ──► \[ERP AUTO RE-OPEN TICKET ──► Chuyển Thẳng Trưởng Phòng CSKH Chuỗi\]  
       └─ NO (4-5 Sao) ──┐  
                         │  
                         ▼  
             \[ERP Close Ticket Hoàn Tất\]  
                         │  
                         ▼  
\[ERP Auto Sync Dữ Liệu CSAT / NPS & Root-Cause Analytics Lên BI Dashboard (SOP-GOV-001)\]  
                         │  
                         ▼  
                    \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-CS-001 (Single Channel & Merge Policy):** Toàn bộ khiếu nại của Phụ huynh bắt buộc phải được khởi tạo thành Ticket chính thức trên hệ thống ERP (qua App Phụ huynh hoặc Call Center CTI). Tuyệt đối cấm xử lý khiếu nại qua tin nhắn Zalo/Điện thoại cá nhân của Giáo viên mà không lập Ticket.  
*   
* **BR-CS-002 (Red-Flag Crisis Escalation):** Khiếu nại Cấp độ 4 (Severity Level 4: Bạo lực học đường, ngộ độc thực phẩm, sự cố y tế nặng, bỏ quên trẻ, đe dọa bóc phốt truyền thông) là **RỦI RO CHÍ MẠNG (CRITICAL RISK)**. Hệ thống ERP tự động phát chuông báo động đỏ trên điện thoại của CEO, COO, BGH và Trưởng phòng Truyền thông trong vòng **60 giây**.  
*   
* **BR-CS-003 (Strict SLA & Auto Escalation):** SLA xử lý Ticket gán cứng theo Severity:  
* 

  * *Severity 1:* SLA 2 giờ làm việc.  
  *   
  * *Severity 2:* SLA 4 giờ làm việc.  
  *   
  * *Severity 3:* SLA 12 giờ làm việc.  
  *   
  * *Severity 4:* SLA 30 phút có mặt/phản hồi khẩn cấp.  
  *   
  * Quá 100% SLA chưa hoàn thành, ERP tự động chuyển giao Ticket cho Hiệu trưởng Cơ sở và trừ điểm KPI tuân thủ của Bộ phận chuyên trách.  
  *   
* **BR-CS-004 (Compensation Limit Control):** Mọi khoản đền bù tài chính hoặc voucher giảm trừ học phí phải tuân thủ Ma trận Hạn mức Bồi thường (Compensation Matrix Master): Hiệu trưởng Cơ sở duyệt \<= 2.000.000 VNĐ; Head of CSKH và CFO duyệt \> 2.000.000 VNĐ.  
*   
* **BR-CS-005 (Auto Re-open on Low CSAT):** Khi Phụ huynh đánh giá CSAT 1–3 Sao, ERP tự động Mở lại Ticket (Re-open Ticket) và tước quyền xử lý của cấp cơ sở, chuyển thẳng lên Trưởng phòng CSKH Chuỗi trực tiếp thụ lý.  
* 

## **13\. Exception Cases**

* **Phụ huynh đe dọa đưa thông tin sự cố lên Mạng xã hội / Báo chí:**  
* 

  * *Xử lý:* CSKH Officer bật cờ Media Crisis Risk Flag trên Ticket. ERP lập tức thông báo cho Phòng Truyền thông Tập đoàn (Pr & Crisis Team). Trưởng phòng Truyền thông phối hợp với Hiệu trưởng Cơ sở đến gặp trực tiếp Phụ huynh trong vòng 02 giờ, đồng thời kích hoạt Kịch bản Truyền thông Khủng hoảng (SOP-GOV-004).  
  *   
* **Phụ huynh cố tình vu khống / Khiếu nại sai sự thật (đã đối soát qua CCTV/Log):**  
* 

  * *Xử lý:* Hiệu trưởng Cơ sở trích xuất video CCTV/Nhật ký điểm danh làm bằng chứng minh bạch, mời Phụ huynh đến làm việc trực tiếp tại trường. Báo cáo giải trình đính kèm video CCTV được tải lên Ticket và trình Head of CSKH duyệt đóng Ticket với lý do Disproved / Unfounded Complaint.  
  *   
* **Sự cố liên quan đến hành vi Ngược đãi / Bạo lực Học đường của Giáo viên:**  
* 

  * *Xử lý:* Kích hoạt ngay Severity Level 4. Admin kích hoạt cờ Suspended Flag trên ERP (SOP-HR-001) tạm đình chỉ công tác giáo viên bị phản ánh trong 24 giờ để phục vụ điều tra. Tự động trích xuất toàn bộ video CCTV liên quan gửi Ban Giám hiệu và Trưởng ban Chuyên môn kiểm tra.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Phương án Xử lý Khiếu nại Thường (Severity 1-2) | CSKH Officer (Đề xuất) | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Phương án Xử lý Khiếu nại Nặng (Severity 3\) | Hiệu trưởng Cơ sở | Head of CSKH | N/A |
| Phê duyệt Phương án Xử lý Khiếu nại Khủng hoảng (Severity 4\) | Head of CSKH | Group COO | CEO / Board |
| Phê duyệt Bồi thường Tài chính / Giảm Học phí (\<= 2M) | CSKH Officer | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Bồi thường Tài chính / Giảm Học phí (\> 2M) | Hiệu trưởng Cơ sở | Head of CSKH | CFO |

## **15\. Status Lifecycle**

* **Complaint Ticket Status:** New \-\> Triaged \-\> Assigned / In Progress \-\> Resolution Proposed \-\> Resolved \-\> Pending CSAT \-\> Closed (Satisfied) (hoặc Re-opened).  
*   
* **CSAT Rating Status:** Pending Survey \-\> Rated (4-5 Stars) \-\> Rated Low (1-3 Stars) \- Re-opened \-\> Expired (Auto Closed).  
* 

## **16\. Data Model**

* **Primary Entity:** ParentComplaintTicket  
* 

  * TicketID (PK, String, Unique)  
  *   
  * StudentID (FK, String), ParentID (FK, String), CampusID (FK, String)  
  *   
  * Category (Enum: Nutrition, Health, Transport, Academics, Staff\_Attitude, Billing, Safety)  
  *   
  * SeverityLevel (Enum: Level1, Level2, Level3, Level4)  
  *   
  * Description (Text), AttachmentURLs (JSON List)  
  *   
  * AssignedDeptID (FK), AssignedOfficerID (FK)  
  *   
  * SLADueTimestamp (DateTime), CrisisFlag (Boolean)  
  *   
  * TicketStatus (Enum: New, Triaged, In\_Progress, Resolved, Closed, Reopened)  
  *   
* **Related Entities:**  
* 

  * TicketResolution: ResolutionID (PK), TicketID (FK), RootCauseCategory (Enum), CorrectiveAction (Text), CompensationAmount (Decimal), ApprovedBy (FK), ResolvedTimestamp (DateTime).  
  *   
  * ParentCSATSurvey: SurveyID (PK), TicketID (FK), CSATStars (Integer, 1-5), NPSScore (Integer, 0-10), ParentFeedback (Text), RatedTimestamp (DateTime).  
  *   
  * TicketEscalationLog: EscalationID (PK), TicketID (FK), EscalatedFromRole (String), EscalatedToRole (String), Reason (Text: Overdue SLA / Low CSAT), Timestamp (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-CS-001: Phiếu Tiếp nhận Yêu cầu & Khiếu nại Phụ huynh Điện tử (Digital Parent Ticket Form).  
*   
* FRM-CS-002: Biên bản Điều tra Nguyên nhân Gốc rễ & Phương án Khắc phục Khiếu nại (Root-Cause Analysis & Resolution Sheet).  
*   
* FRM-CS-003: Tờ trình Phê duyệt Bồi thường / Giảm trừ Học phí Khắc phục Sự cố (Compensation Proposal Form).  
*   
* FRM-CS-004: Khảo sát Hài lòng CSAT & Đo lường Chỉ số Giới thiệu NPS Điện tử (CSAT & NPS Survey Form).  
* 

## **18\. ERP Functional Requirements**

* **FR-CS-001 (MUST):** Mobile App Phụ huynh phải hỗ trợ tính năng gửi Ticket Khiếu nại 24/7, đính kèm ảnh/video/audio và theo dõi tiến độ xử lý real-time.  
*   
* **FR-CS-002 (MUST):** Tích hợp Thuật toán AI Severity & Crisis Keyword Classifier: Tự động nhận diện từ khóa khủng hoảng và phân loại Severity Level 1-4 trong 3 giây.  
*   
* **FR-CS-003 (MUST):** Phân hệ Auto-Routing & SLA Countdown Engine: Tự động chuyển Ticket về đúng Bộ phận chuyên trách cơ sở và đếm ngược SLA xử lý.  
*   
* **FR-CS-004 (MUST):** Tích hợp Auto Re-open Logic: Tự động mở lại Ticket và chuyển leo cấp lên Trưởng phòng CSKH Chuỗi nếu Phụ huynh đánh giá CSAT 1-3 Sao.  
*   
* **FR-CS-005 (SHOULD):** Tích hợp CTI Call Center cho phép CSKH bấm gọi trực tiếp cho Phụ huynh từ màn hình Ticket và tự động lưu file ghi âm cuộc gọi.  
* 

## **19\. Automation Opportunities**

* **AUTO-CS-001 (INTEGRATION):** Tự động khởi tạo Ticket Khiếu nại khi Phụ huynh đánh giá Sổ liên lạc ngày (SOP-SIS-002) dưới 3 Sao hoặc khi phát sinh sự cố y tế (SOP-MED-001).  
*   
* **AUTO-CS-002 (RULE ENGINE):** Tự động phát còi báo động khẩn cấp tới điện thoại CEO, COO, BGH khi Ticket chuyển trạng thái Severity Level 4.  
*   
* **AUTO-CS-003 (WORKFLOW):** Tự động đếm ngược SLA và tự động chuyển giao Ticket cho Hiệu trưởng Cơ sở nếu bộ phận chuyên trách quá 100% thời gian SLA chưa xử lý.  
*   
* **AUTO-CS-004 (BI ANALYTICS):** Tự động tính toán điểm CSAT, NPS và phân tích biểu đồ nguyên nhân gốc rễ (Root Cause Analytics) theo từng cơ sở trên BI Dashboard (SOP-GOV-001).  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo Tiếp nhận Ticket Mới | Phụ huynh | App Push \+ SMS Brandname | Immediate khi submit |
| CẢNH BÁO KHIẾU NẠI KHỦNG HOẢNG (Severity 4 Alert) | CEO, COO, BGH, PR Head | Loud Sound Alarm \+ Push | Immediate (\<= 60 giây) |
| Thông báo Gán Ticket Xử lý Mới | Chuyên viên / Bếp / Y tế | Mobile App Push | Immediate khi routed |
| Cảnh báo Quá Hạn SLA Xử lý (SLA Breach) | Hiệu trưởng & CSKH Head | ERP High Alert \+ Push | At SLA Breach Timestamp |
| Thông báo Kết quả Xử lý & Mời Đánh giá CSAT | Phụ huynh | App Push \+ Zalo OA | Immediate khi resolved |
| Cảnh báo CSAT Thấp (1-3 Sao) \- Ticket Re-opened | Head of CSKH & Group COO | ERP High Alert \+ SMS | Immediate khi Phụ huynh rate |

## **21\. Permission Matrix (RBAC)**

| Role | View Ticket | Create Ticket | Classify Severity | Approve Resolution | Approve Compensation | View CSAT/NPS BI |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Phụ huynh | Own Child | Own Child | No | No | No | Own Survey Only |
| GVCN / Staff | Assigned Class | On Behalf | No | Propose Only | No | Read Only |
| CSKH Officer | Campus Full | Full | Full | Propose Only | No | Read Only |
| Hiệu trưởng Cơ sở | Campus Full | Full | Full | Full (Campus) | \<= 2.000.000 VNĐ | Campus Scope |
| Head of CSKH / COO | Full Enterprise | Full | Full | Full Enterprise | \> 2.000.000 VNĐ | Full Enterprise |
| CEO / Board | Full Enterprise | Read Only | View Only | Override | Full Enterprise | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi thao tác Khởi tạo, Phân loại Severity, Gán Bộ phận xử lý Ticket (User ID, Timestamp, Cấp độ Severity).  
*   
* Lịch sử chuyển giao Ticket giữa các phòng ban và nhật ký tự động leo cấp (Auto-Escalation Logs).  
*   
* Nhật ký cuộc gọi từ CTI Call Center: Link file ghi âm cuộc gọi trao đổi với Phụ huynh.  
*   
* Lịch sử phê duyệt Mức Bồi thường / Giảm trừ Học phí (Người duyệt, Số tiền, Lý do).  
*   
* Điểm đánh giá CSAT/NPS gốc từ Phụ huynh và nhật ký Re-open Ticket do CSAT thấp.  
* 

## **23\. Internal Controls**

* **Mandatory Official Channel Control:** Bắt buộc 100% phản ánh của Phụ huynh phải được ghi nhận thành Ticket trên ERP, triệt tiêu việc xử lý ngầm qua Zalo cá nhân.  
*   
* **Dual Approval for Financial Compensation:** Đề xuất bồi thường tài chính bắt buộc qua duyệt 2 cấp: Hiệu trưởng Cơ sở \+ Head of CSKH/CFO.  
*   
* **Auto Re-open Gate:** Tước quyền đóng Ticket của cấp cơ sở nếu Phụ huynh chưa hài lòng (CSAT 1-3 sao), bảo đảm khiếu nại được giám sát bởi Trưởng phòng CSKH Chuỗi.  
*   
* **Independent Root-Cause Auditing:** Bộ phận QA/Kiểm toán nội bộ (SOP-QA-001) định kỳ hằng tháng rút ngẫu nhiên 10% các Ticket đã đóng để kiểm tra tính trung thực của phương án giải quyết.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Phản hồi Khẩn cấp (Severity 4 SLA)** | Thời gian từ khi có Ticket đến khi liên hệ trực tiếp Phụ huynh | **\<= 30 phút** | Head of CSKH & BGH |
| **Tỷ lệ Tuân thủ SLA Xử lý Ticket (SLA Compliance)** | (Số Ticket xử lý đúng SLA / Tổng số Ticket) \* 100 | **\>= 95%** | Head of CSKH |
| **Chỉ số Hài lòng Xử lý Khiếu nại (CSAT Score)** | Tổng điểm CSAT 1-5 sao / Tổng số lượt đánh giá | **\>= 4.2 / 5.0 Sao** | Head of CSKH & BGH |
| **Chỉ số Giới thiệu Thương hiệu (NPS Score)** | % Promoters (9-10) \- % Detractors (0-6) | **\>= \+50 Points** | Group CMO & CSKH Head |
| **Tỷ lệ Mở lại Ticket do CSAT Thấp (Re-open Rate)** | (Số Ticket bị Re-open / Tổng số Ticket) \* 100 | **\<= 5%** | CSKH Team |

## **25\. Dashboard / Report**

* **CSKH Live Ticket Operational Monitor (Trưởng phòng CSKH & BGH):** Màn hình đếm ngược SLA các Ticket đang xử lý real-time, Danh sách Ticket Severity 3-4, Cảnh báo Ticket bị Re-open do CSAT thấp.  
*   
* **Parent Complaint Root-Cause Analytics (BGH & QA):** Báo cáo phân tích nguyên nhân gốc rễ khiếu nại (Biểu đồ Pareto Top khiếu nại: Bếp ăn, Xe bus, Lớp học, Học phí), So sánh số lượng khiếu nại giữa các cơ sở.  
*   
* **Executive CSAT & NPS BI Dashboard (CEO, COO & Board):** Báo cáo chỉ số CSAT & NPS toàn chuỗi real-time, Xu hướng hài lòng Phụ huynh theo thời gian, Bảng xếp hạng chất lượng dịch vụ khách hàng giữa các cơ sở.  
* 

## **26\. Integration**

* **Student Information System & CRM (SOP-ADM-003 & SOP-CRM-001):** Nhận thông tin Phụ huynh/Học sinh và lịch sử tương tác.  
*   
* **Student Daily Activities & Health (SOP-SIS-002 & SOP-MED-001):** Tự động sinh Ticket khi có đánh giá Sổ liên lạc thấp hoặc sự cố Y tế.  
*   
* **Finance & Billing Engine (SOP-FIN-001):** Đồng bộ các khoản đền bù/giảm trừ học phí đã duyệt vào hóa đơn kỳ tiếp theo.  
*   
* **CTI Cloud Call Center & Zalo OA API:** Tích hợp bấm gọi trực tiếp từ Ticket, tự động lưu file ghi âm và gửi tin nhắn ZNS thông báo tiến độ.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Giáo viên giấu thông tin khiếu nại làm bùng phát khủng hoảng** | Critical | Low | Bắt buộc tiếp nhận qua App/Hotline tập trung; Phạt kỷ luật nếu giấu Ticket. | BGH & Head of CSKH |
| **Khiếu nại Severity 4 bị trôi gây scandal truyền thông** | Critical | Low | ERP Auto-Alert báo động đỏ trong 60 giây tới CEO/COO/PR Head. | Head of CSKH & IT |
| **Phụ huynh bức xúc vì time xử lý kéo dài quá SLA** | High | Medium | Đồng hồ đếm ngược SLA; Auto-Escalation lên Hiệu trưởng khi quá 100% SLA. | Head of CSKH |
| **Lạm dụng chính sách đền bù tài chính gây thất thoát** | Medium | Medium | Áp dụng Compensation Matrix; Duyệt 2 cấp đối với khoản đền bù \> 2M. | Kế toán trưởng & CFO |

## **28\. Acceptance Criteria**

* **Given:** Phụ huynh gửi một Khiếu nại trên App phản ánh học sinh bị vết bầm ở tay sau khi đi học về (Khiếu nại Severity 3).  
*   
* **When:** Phụ huynh bấm "Gửi Yêu cầu".  
*   
* **Then:** ERP tự động nhận diện từ khóa vết bầm, gán cấp độ Severity Level 3, phát alert cho Hiệu trưởng Cơ sở và Chăm sóc Khách hàng, đồng thời khởi chạy đồng hồ đếm ngược SLA xử lý trong vòng 12 giờ làm việc.  
*   
* **Given:** Hiệu trưởng Cơ sở xử lý xong khiếu nại và bấm "Gửi Phản hồi". Phụ huynh mở App xem và đánh giá CSAT 2 Sao (Không hài lòng).  
*   
* **When:** Phụ huynh bấm Submit đánh giá 2 Sao.  
*   
* **Then:** ERP tự động Mở lại Ticket (Re-open Ticket), chuyển thẳng quyền xử lý lên Trưởng phòng CSKH Chuỗi, đồng thời phát alert cờ đỏ cảnh báo Low CSAT Re-open về điện thoại của Group COO trong vòng 3 giây.  
* 

## **29\. Test Scenarios**

1. **Happy Path Complaint Resolution Test:** Phụ huynh gửi Ticket \-\> ERP AI Triage Severity 2 \-\> Route về Bếp trưởng \-\> Bếp trưởng đề xuất phương án \-\> Hiệu trưởng Approve \-\> CSKH phản hồi Phụ huynh \-\> Phụ huynh đánh giá CSAT 5 Sao \-\> Ticket Closed thành công.  
2.   
3. **Red-Flag Crisis Escalation Test:** Tạo Ticket có từ khóa "bạo lực học đường, báo chí" (Severity 4\) \-\> Kiểm tra xem ERP có phát chuông báo động đỏ trên điện thoại CEO, COO, BGH và PR Head trong 60 giây không.  
4.   
5. **Low CSAT Auto Re-open Test:** Phụ huynh đánh giá CSAT 1 Sao sau khi xử lý \-\> Kiểm tra xem ERP có tự động Re-open Ticket và leo cấp lên Trưởng phòng CSKH Chuỗi không.  
6.   
7. **SLA Breach Escalation Test:** Tạo Ticket Severity 2 (SLA 4h) nhưng cố tình KHÔNG xử lý trong 4 giờ \-\> Kiểm tra xem ERP có tự động chuyển giao Ticket cho Hiệu trưởng và đánh cờ vi phạm SLA không.  
8.   
9. **Compensation Limit Approval Test:** Đề xuất đền bù 3.000.000 VNĐ cho Phụ huynh \-\> Kiểm tra xem ERP có bắt buộc luồng duyệt 2 cấp (Hiệu trưởng \+ Head of CSKH/CFO) mới cho phép hoàn tất không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận phân loại Severity 1-4 và danh mục từ khóa Crisis; Cấu hình SLA xử lý theo Severity; Cấu hình Ma trận Hạn mức Bồi thường (Compensation Matrix); Cấu hình quy tắc Auto Re-open khi CSAT \< 4 Sao.  
*   
* **Master Data Migration:** Import danh mục Loại Khiếu nại chuẩn; Import sơ đồ phân công CSKH và BGH các cơ sở.  
*   
* **Hardware & Integration:** Tích hợp Tổng đài CTI Cloud Call Center với tính năng Inbound Popup và Click-to-Call; Tích hợp Zalo Official Account API gửi ZNS thông báo tiến độ.  
*   
* **Training & Change Management:** Đào tạo toàn thể Giáo viên/Nhân viên quy tắc chuyển giao phản ảnh Phụ huynh lên hệ thống Ticket chính thức; Đào tạo Đội ngũ CSKH kỹ năng triệt phân loại Severity và phân tích nguyên nhân gốc rễ (Root Cause); Đào tạo Ban Giám hiệu kỹ năng xử lý khiếu nại Severity 3-4 và quản trị CSAT/NPS trên BI Dashboard.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (19 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  10.   
  11. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  12.   
  13. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  14.   
  15. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  16.   
  17. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  18.   
  19. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  20.   
  21. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  22.   
  23. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  24.   
  25. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  26.   
  27. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  28.   
  29. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  30.   
  31. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  32.   
  33. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  34.   
  35. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  36.   
  37. SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Service Request & CSAT/NPS (Domain 62, 63, 64, 65, 66, 68, 70).  
  38.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **06 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
│ • SOP-CS-001: Complaints & CSAT│                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 22

# **SOP-INV-001 — QUY TRÌNH QUẢN LÝ TỒN KHO VẬT TƯ HỌC TẬP, SÁCH VỞ, ĐỒNG PHỤC, XUẤT KHO LỚP HỌC VÀ KIỂM KÊ KHO ĐỊNH KỲ**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-INV-001  
*   
* **Tên SOP:** Quy trình Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục Học sinh, Xuất kho Lớp học và Kiểm kê Kho Định kỳ  
*   
* **Module ERP:** Inventory / Warehouse (32), Asset Management (38), Classroom Management (41), Finance & Accounting Integration (55), Internal Audit (69)  
*   
* **Process Owner:** Trưởng Bộ phận Kho & Vật tư Tập trung (Group Head of Inventory) / Admin Manager  
*   
* **Department:** Bộ phận Kho & Vật tư, Ban Giám hiệu các Cơ sở, Khối Giáo viên Mầm non, Phòng Kế toán \- Tài chính  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Tài chính (CFO) / Giám đốc Vận hành (COO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa toàn bộ chu trình quản trị hàng tồn kho và vật tư tiêu hao trong hệ thống trường mầm non tư thục / quốc tế / chuỗi nhiều cơ sở: từ khâu tự động ghi nhận nhập kho vật tư học tập, sách vở, đồng phục, giáo cụ từ quy trình Procure-to-Pay (SOP-PUR-001), tự động giữ hàng và cấp phát đồng phục/sách vở cho học sinh mới khi hoàn tất nhập học (SOP-ADM-003), xuất kho vật tư tiêu hao định kỳ theo định mức lớp học, điều chuyển vật tư giữa các cơ sở (Inter-Campus Inventory Transfer), đến công tác kiểm kê kho thực địa bằng công nghệ quét mã Barcode/QR Code và xử lý quyết toán chênh lệch tồn kho (Inventory Variance Settlement); triệt tiêu thất thoát, đọng vốn và bảo đảm không đứt gãy nguồn cung vật tư học tập.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các kho vật tư trung tâm (Central Warehouse) và kho cơ sở thành viên (Campus Warehouses) thuộc hệ thống trường mầm non.  
*   
* **Phòng ban:** Bộ phận Kho & Vật tư, Ban Giám hiệu Cơ sở, Khối Giáo viên Mầm non, Phòng Tuyển sinh, Phòng Kế toán, Bộ phận Bảo vệ.  
*   
* **Đối tượng:**  
* 

  * *Đồng phục học sinh:* Áo, quần, váy, balo, mũ, trang phục thể thao.  
  *   
  * *Sách vở & Vật tư học tập:* Sách giáo khoa/truyện mầm non, vở vẽ, màu vẽ, đất nặn, giấy thủ công, giáo cụ Montessori/STEAM.  
  *   
  * *Vật tư tiêu hao vận hành:* Văn phòng phẩm, hóa chất vệ sinh, khăn lau, khẩu trang, y tế tiêu hao.  
  *   
* **Trường hợp không áp dụng:** Thực phẩm tươi sống bán trú hàng ngày (áp dụng SOP-KIT-001: Mua hàng Thực phẩm & Lưu mẫu Bếp ăn).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Safety Stock Level (Mức Tồn kho An toàn Tối thiểu):** Số lượng tồn kho tối thiểu bắt buộc phải duy trì cho từng mã vật tư để tránh rủi ro hết hàng gây gián đoạn hoạt động giảng dạy.  
*   
* **Reorder Point (Điểm Đặt hàng Tự động):** Ngưỡng tồn kho khả dụng mà khi chạm mốc, ERP tự động khởi tạo Yêu cầu Mua hàng (PR \- SOP-PUR-001).  
*   
* **FIFO (First-In, First-Out):** Nguyên tắc xuất kho hàng nhập trước xuất trước (đặc biệt áp dụng cho sơn vẽ, đất nặn, hóa chất vệ sinh có hạn sử dụng).  
*   
* **Inter-Campus Inventory Transfer (Điều chuyển Kho Đa cơ sở):** Quy trình chuyển giao vật tư/đồng phục thừa từ Cơ sở A sang Cơ sở B đang thiếu mà không phải mua mới.  
*   
* **Inventory Variance (Chênh lệch Kiểm kê):** Khoảng sai lệch giữa Số lượng Tồn kho trên Phần mềm ERP (System On-Hand Quantity) và Số lượng Tồn kho Thực tế Kiểm đếm (Physical Counted Quantity).  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Cấu hình Mã Vật tư, Định mức Lớp & Min-Max Stock | Kế toán Kho / IT Admin | Head of Inventory | Academic Mgr / BGH | Thủ kho Cơ sở |
| Nhập Kho Vật tư Mới từ PO/GRN | Thủ kho Cơ sở | Head of Inventory | Procurement | Kế toán Phí |
| Tự động Cấp phát Đồng phục / Sách vở cho Bé mới | ERP System / Thủ kho | Admin Manager | Tuyển sinh / Phụ huynh | GVCN |
| Duyệt & Xuất Kho Vật tư Lớp học theo Định mức | Thủ kho & Admin Cơ sở | Hiệu trưởng Cơ sở | GVCN | Kế toán Kho |
| Khởi tạo & Phê duyệt Lệnh Điều chuyển Đa cơ sở | Thủ kho / Admin | Head of Inventory | Hiệu trưởng 2 Cơ sở | Kế toán Kho |
| Quét Barcode Kiểm kê Kho & Xử lý Chênh lệch | Thủ kho & Kế toán Kho | Kế toán trưởng | Auditor Nội bộ | Group CFO |

*Ghi chú: Việc kiểm kê tài sản/vật tư nhà nước/doanh nghiệp, hạch toán hao hụt đứt gãy và xử lý trách nhiệm bồi thường thất thoát cần kiểm tra/đối chiếu quy định hiện hành của Bộ Tài chính (Luật Kế toán, Thông tư 200/2014/TT-BTC) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Vật tư Tồn kho (ItemMaster), Danh mục Kho (WarehouseMaster), Ma trận Định mức Vật tư Lớp học (ClassroomQuotaMaster), Ngưỡng Tồn kho Safety Stock (SafetyStockMaster).  
*   
* **Chứng từ Nhập kho:** Phiếu Nhập Kho GRN đã được kiểm nghiệm đạt chuẩn từ SOP-PUR-001.  
*   
* **Thiết bị:** Máy quét mã vạch Barcode/QR Code di động (Wireless Handheld Scanner) kết nối App Mobile Kho.  
* 

## **7\. Trigger**

* **Tự động (System Trigger):**  
* 

  1. Học sinh hoàn tất đóng phí nhập học trên SOP-ADM-003 \-\> ERP kích hoạt lệnh Giữ hàng (Reserve Stock) và Xuất gói Đồng phục/Sách vở.  
  2.   
  3. Tồn kho khả dụng chạm mốc Reorder Point \-\> ERP tự động phát hành PR Mua sắm (SOP-PUR-001).  
  4.   
* **Định kỳ (Periodic Schedule):**  
* 

  1. Đầu mỗi Tháng/Học kỳ: Xuất vật tư học tập tiêu hao cho các Lớp học.  
  2.   
  3. Cuối mỗi Tháng/Quý: Lịch Kiểm kê Kho Thực địa (Physical Inventory Audit).  
  4. 

## **8\. Quy trình AS-IS**

* Thủ kho ghi chép nhập xuất vật tư vào sổ tay hoặc file Excel cá nhân.  
*   
* Khi có học sinh mới nhập học, tư vấn viên nhắn tin Zalo cho thủ kho lấy đồng phục. Thủ kho đưa đồng phục nhưng không có phiếu xuất kho chính thức.  
*   
* Giáo viên hết giấy vẽ, đất nặn tự lên kho lấy rồi ký vào tờ giấy nháp dán trên tường kho.  
*   
* Cuối quý, thủ kho cùng kế toán mất 2–3 ngày đi đếm từng cái áo, từng quyển sách rồi ngồi dò lại file Excel để tìm số chênh lệch.  
*   
* **Hệ quả:** Thất thoát đồng phục và sách vở không rõ nguyên nhân; học sinh mới nhập học không có đúng size đồng phục do đọng size cũ; lệch sổ sách kế toán nghiêm trọng; vật tư hỏng hóc đọng trong kho nhiều năm không thanh lý.  
* 

## **9\. Pain Points / Risk**

* **Stockout Risk on New Enrollment:** Rủi ro thiếu đồng phục/sách vở đúng size khi học sinh mới nhập học, làm giảm trải nghiệm của Phụ huynh trong ngày đầu đến trường.  
*   
* **Uncontrolled Shrinkage & Theft (Mối nguy Thất thoát):** Vật tư học tập và đồng phục bị thất thoát do xuất kho tự do không qua kiểm duyệt định mức.  
*   
* **Dead Stock & Capital Lock-up:** Đọng vốn vào các mặt hàng không sử dụng (Sách mẫu cũ, đồng phục size quá cỡ) do thiếu cảnh báo tồn kho lâu ngày.  
*   
* **Manual Inventory Audit Friction:** Kiểm kê kho thủ công bằng tay tốn nhiều nhân lực, dễ nhầm lẫn và không có vết Audit Log đối soát.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Tự động Cấp phát Đồng phục & Sách vở cho Học sinh Mới (Enrollment Kit Allocation)**

* **Step 01:**  
* 

  * **Actor:** ERP System (Auto Stock Reservation Engine).  
  *   
  * **Action:** Ngay khi Hồ sơ Học sinh Mới chuyển trạng thái Enrolled / Paid trên SOP-ADM-003, ERP tự động kiểm tra size đồng phục trong Hồ sơ Đăng ký, kích hoạt Lệnh Giữ Hàng (Reserve Inventory) đối với Gói Đồng phục & Sách vở tương ứng tại Kho Cơ sở.  
  *   
  * **ERP Function:** Auto Stock Reservation on Enrollment.  
  *   
  * **Input:** StudentID, Size Đồng phục, Khối lớp, Mã Cơ sở.  
  *   
  * **Output:** Lệnh Giữ Hàng Đồng phục (Reserved Stock Record).  
  *   
  * **Business Rule:** BR-INV-001: Ngay khi Giữ hàng thành công, ERP trừ Tồn kho Khả dụng (Available Stock \= On-Hand \- Reserved) để tránh việc xuất trùng size đó cho học sinh khác.  
  *   
  * **Status Before:** Unassigned.  
  *   
  * **Status After:** Stock Reserved for Student.  
  *   
  * **SLA:** Real-time (\<= 3 giây).  
  *   
  * **Notification:** Alert gửi App Thủ kho Cơ sở: *"Cần chuẩn bị Gói Đồng phục Size \[Size\] cho Học sinh \[Tên Bé\] \- Lớp \[Tên Lớp\]"*.  
  *   
* **Step 02:**  
* 

  * **Actor:** Thủ kho Cơ sở & Phụ huynh / GVCN.  
  *   
  * **Action:** Thủ kho soạn gói đồng phục/sách vở. Phụ huynh/GVCN nhận đồ, Thủ kho dùng Máy quét Barcode quét mã trên gói đồ và bấm "Xác nhận Xuất Kho Đã Giao" (Confirm Package Issued).  
  *   
  * **ERP Function:** Barcode Package Issuance & Student Inventory Link.  
  *   
  * **Input:** Mã Barcode Gói Đồ, Mã Học sinh StudentID.  
  *   
  * **Output:** Phiếu Xuất Kho Đồng phục Điện tử (Student Issue Note) \-\> Ghi nhận Tồn kho Giảm thực tế.  
  *   
  * **Business Rule:** BR-INV-002: Trường hợp Phụ huynh thử đồng phục không vừa size, Thủ kho dùng tính năng Size Exchange Request trên App. ERP tự động hoàn trả size cũ về kho và xuất size mới nếu kho còn hàng khả dụng.  
  *   
  * **Status Before:** Stock Reserved.  
  *   
  * **Status After:** Issued to Student.  
  *   
  * **SLA:** \<= 5 phút giao đồ.  
  *   
  * **Notification:** Notification gửi App Phụ huynh xác nhận đã nhận đủ đồng phục/sách vở.  
  * 

### **Giai đoạn 2: Xuất Kho Vật tư Tiêu hao Lớp học theo Định mức (Classroom Material Requisition)**

* **Step 03:**  
* 

  * **Actor:** Giáo viên Chủ nhiệm & Admin Cơ sở.  
  *   
  * **Action:** Đầu mỗi tháng (hoặc trước chủ đề học mới theo SOP-ACA-001), GVCN mở App Teacher chọn "Đề nghị Xuất Vật tư Lớp học", hệ thống tự động điền sẵn danh mục vật tư tiêu hao (Giấy vẽ, đất nặn, màu nước, keo dán) theo Định mức Lớp (Classroom Quota Master). GVCN kiểm tra và bấm "Trình Duyệt".  
  *   
  * **ERP Function:** Quota-Based Classroom Requisition.  
  *   
  * **Input:** ClassID, Khối lớp, Sĩ số học sinh thực tế.  
  *   
  * **Output:** Đề nghị Xuất Kho Lớp học (Classroom Material Request).  
  *   
  * **Business Rule:** BR-INV-003: Số lượng vật tư đề xuất vượt quá 120% Định mức Khối/Lớp bắt buộc phải có Lý do giải trình và được Hiệu trưởng Cơ sở duyệt ngoại lệ (Over-Quota Approval).  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Submitted for Approval.  
  *   
  * **SLA:** Complete trước ngày 25 hàng tháng.  
  *   
  * **Notification:** Alert gửi Hiệu trưởng Cơ sở duyệt.  
  *   
* **Step 04:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở & Thủ kho.  
  *   
  * **Action:** Hiệu trưởng bấm Approve trên App. Thủ kho nhận Lệnh Xuất Kho, soạn vật tư, dùng máy quét Barcode quét kiểm đếm từng món và bàn giao cho GVCN. GVCN ký xác nhận điện tử trên App Thủ kho.  
  *   
  * **ERP Function:** Material Issuance & Digital Receipt Sign.  
  *   
  * **Input:** Approved Request, Barcode Scan Data, Chữ ký điện tử GVCN.  
  *   
  * **Output:** Phiếu Xuất Kho Lớp học (Classroom Issue Voucher) \-\> ERP Tự động hạch toán Chi phí Vật tư Lớp học vào Sổ cái Kế toán (TK 642 / TK 627).  
  *   
  * **Status Before:** Submitted for Approval.  
  *   
  * **Status After:** Issued & Expense Posted.  
  *   
  * **SLA:** Xuất hàng trong 24 giờ sau khi duyệt.  
  *   
  * **Notification:** Alert xác nhận giao hàng thành công.  
  * 

### **Giai đoạn 3: Điều chuyển Tồn kho Đa cơ sở (Inter-Campus Inventory Transfer)**

* **Step 05:**  
* 

  * **Actor:** Thủ kho Cơ sở A, Thủ kho Cơ sở B & Group Head of Inventory.  
  *   
  * **Action:** Khi Cơ sở B thiếu đồng phục Size S nhưng Cơ sở A đang dư tồn kho, Thủ kho Cơ sở B tạo "Yêu cầu Điều chuyển Kho" (Inter-Campus Transfer Request). Trưởng Bộ phận Kho Chuỗi phê duyệt trên ERP.  
  *   
  * **ERP Function:** Inter-Campus Stock Transfer Workflow.  
  *   
  * **Input:** Kho Xuất (Cơ sở A), Kho Nhận (Cơ sở B), Mã Vật tư, Số lượng.  
  *   
  * **Output:** Lệnh Điều chuyển Kho (Transfer Order \- TO).  
  *   
  * **Business Rule:** BR-INV-004: Hàng hóa trong quá trình di chuyển được ghi nhận vào Tài khoản Hàng đang đi đường (In-Transit Inventory \- TK 151). Chỉ khi Thủ kho Cơ sở B quét mã Barcode Nhập kho thành công, trạng thái chuyển kho mới hoàn tất.  
  *   
  * **Status Before:** In Stock (Campus A).  
  *   
  * **Status After:** In-Transit.  
  *   
  * **SLA:** Max 24 giờ vận chuyển.  
  *   
  * **Notification:** Alert gửi Đơn vị Vận chuyển / Driver và Thủ kho Cơ sở B.  
  * 

### **Giai đoạn 4: Kiểm kê Kho Thực địa & Xử lý Chênh lệch (Physical Count & Variance Reconciliation)**

* **Step 06:**  
* 

  * **Actor:** Kế toán Kho & Thủ kho Cơ sở.  
  *   
  * **Action:** Định kỳ ngày cuối tháng, ERP tự động khóa sổ kho tạm thời (Freeze Inventory for Audit). Kế toán Kho và Thủ kho cầm Thiết bị quét Barcode đi quét kiểm đếm 100% các kệ hàng trong kho.  
  *   
  * **ERP Function:** Barcode Mobile Stock Count & Freeze Control.  
  *   
  * **Input:** Dữ liệu quét Barcode thực tế tại kệ kho.  
  *   
  * **Output:** Bảng Kết quả Kiểm kê Thực địa (Physical Count Sheet).  
  *   
  * **Business Rule:** BR-INV-005: Hệ thống tự động so sánh Dữ liệu Quét Thực tế với Dữ liệu Tồn Sổ sách ERP, tự động lập Bảng Chênh lệch Kiểm kê (Inventory Variance Report).  
  *   
  * **Status Before:** Active Inventory.  
  *   
  * **Status After:** Physical Count Completed / Variance Calculated.  
  *   
  * **SLA:** Complete trong 4 giờ kiểm kê.  
  *   
  * **Notification:** Bảng chênh lệch tự động gửi Kế toán trưởng & Auditor.  
  *   
* **Step 07:**  
* 

  * **Actor:** Kế toán trưởng, Head of Inventory & CFO.  
  *   
  * **Action:** Kế toán Kho nhập lý do chênh lệch (Hao hụt tự nhiên, rách hỏng, nhầm lẫn mã). Nếu giá trị chênh lệch nằm trong Tỷ lệ Lệch Cho phép (Tolerance \<= 0.5%), Kế toán trưởng duyệt Tự động Điều chỉnh. Nếu chênh lệch \> 0.5% hoặc mất mát tài sản lớn, CFO phê duyệt Tờ trình Xử lý Bồi thường/Thanh lý (Inventory Adjustment Voucher).  
  *   
  * **ERP Function:** Inventory Variance Settlement & Adjustment Posting.  
  *   
  * **Input:** Variance Report \+ Giải trình nguyên nhân \+ Tờ trình bồi thường.  
  *   
  * **Output:** Phiếu Điều chỉnh Tồn kho (Inventory Adjustment Journal) \-\> Cập nhật Tồn kho Sổ sách về đúng Tồn kho Thực tế.  
  *   
  * **Business Rule:** BR-INV-006: Mọi khoản mất mát vật tư/đồng phục do lỗi cá nhân của Thủ kho bắt buộc phải lập Bút toán Bồi thường khấu trừ lương (SOP-HR-001).  
  *   
  * **Status Before:** Variance Calculated.  
  *   
  * **Status After:** Reconciled & Ledger Posted.  
  *   
  * **SLA:** Hoàn tất xử lý lệch kho trong 48 giờ.  
  *   
  * **Notification:** Báo cáo kiểm kê kho chính thức gửi Board & COO.  
  * 

## **11\. Workflow**

\[LUỒNG 1: CẤP PHÁT ĐỒNG PHỤC HỌC SINH MỚI\]      \[LUỒNG 2: XUẤT VẬT TƯ LỚP HỌC THEO ĐỊNH MỨC\]  
                 │                                                │  
                 ▼                                                ▼  
\[Student Enrolled / Paid (SOP-ADM-003)\]         \[GVCN Tạo Request Trên App (Theo Classroom Quota)\]  
                 │                                                │  
                 ▼                                                ▼  
\[ERP Auto Reserve Stock (Khóa Size Đồng Phục)\]  \[Hiệu Trưởng Approve (Auto Alert Nếu Over-Quota)\]  
                 │                                                │  
                 ▼                                                ▼  
\[Thủ Kho Quét Barcode Gói Đồ ──► Giao Phụ Huynh\]  \[Thủ Kho Quét Barcode Xuất Hàng ──► GVCN Ký Điện Tử\]  
                 │                                                │  
                 └───────────────────────┬────────────────────────┘  
                                         │  
                                         ▼  
                 \[LUỒNG 3: KIỂM KÊ KHO ĐỊNH KỲ & XỬ LÝ CHÊNH LỆCH\]  
                                         │  
                                         ▼  
                 \[Cuối Tháng: ERP Auto Freeze Inventory ──► Tạo Audit Job\]  
                                         │  
                                         ▼  
                 \[Kế Toán & Thủ Kho Quét Barcode 100% Kệ Hàng Trên Mobile App\]  
                                         │  
                                         ▼  
                 \[ERP Auto Compare: Tồn Sổ Sách vs Tồn Thực Tế ──► Variance Report\]  
                                         │  
                                         ◇ Tỷ Lệ Chênh Lệch (Tolerance)?  
                                         ├─ \<= 0.5% (Hao Hụt Chuẩn) ──► \[Kế Toán Trưởng Duyệt Auto Adjust\]  
                                         └─ \> 0.5% (Nặng / Mất Mát) ──► \[Tờ Trình CFO ──► Bồi Thường / Clear\]  
                                                                            │  
                                                                            ▼  
                                                                 \[ERP Auto Post GL 152/632\]  
                                                                            │  
                                                                            ▼  
                                                                       \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-INV-001 (Auto Reservation Rule):** Ngay khi Học sinh mới đóng phí nhập học thành công trên SOP-ADM-003, ERP tự động giữ hàng (Reserve Stock) gói đồng phục/sách vở tương ứng. Số lượng giữ hàng bị trừ khỏi Tồn kho Khả dụng (Available Stock \= On-Hand \- Reserved \- Damaged), chặn tuyệt đối việc bán/xuất trùng size cho học sinh khác.  
*   
* **BR-INV-002 (Size Exchange Policy):** Phụ huynh được quyền đổi size đồng phục trong vòng **07 ngày** kể từ ngày nhận đồ, với điều kiện đồng phục còn nguyên tem nhãn. ERP tự động nhập trả size cũ về Kho và xuất size mới bằng chứng từ Size Exchange Voucher.  
*   
* **BR-INV-003 (Classroom Quota Enforcement):** Mọi Yêu cầu Xuất kho Vật tư Lớp học được kiểm soát cứng theo Ma trận Định mức (Classroom Quota Master). Yêu cầu vượt quá 120% định mức chuẩn bắt buộc phải có Văn bản Giải trình và Phê duyệt Ngoại lệ của Hiệu trưởng Cơ sở.  
*   
* **BR-INV-004 (Inter-Campus Transit Control):** Vật tư điều chuyển giữa các cơ sở phải qua tài khoản trung gian Hàng đang đi đường (TK 151). Trách nhiệm quản lý thuộc về Đơn vị Vận chuyển/Driver cho đến khi Thủ kho cơ sở nhận quét mã Barcode xác nhận Goods Received.  
*   
* **BR-INV-005 (FIFO Enforcement):** Đối với các vật tư có hạn sử dụng hoặc dễ biến chất (Đất nặn, màu nước, sơn vẽ, hóa chất vệ sinh), ERP bắt buộc hiển thị vị trí Kệ hàng theo nguyên tắc **FIFO (First-In, First-Out)** hoặc **FEFO (First-Expired, First-Out)** khi Thủ kho thực hiện thao tác xuất hàng.  
*   
* **BR-INV-006 (Variance Threshold & Liability):** Tỷ lệ chênh lệch kiểm kê kho cho phép do hao hụt tự nhiên/nhầm lẫn đóng gói tối đa là **0.5% tổng giá trị kho**. Mọi khoản chênh lệch mất mát \> 0.5% không chứng minh được lý do bất khả kháng sẽ do Thủ kho chịu trách nhiệm bồi thường 100% giá trị theo giá vốn.  
* 

## **13\. Exception Cases**

* **Hết size đồng phục khả dụng khi Học sinh mới nhập học (Out of Stock Size):**  
* 

  * *Xử lý:* ERP phát alert khẩn Stockout Alert cho Phòng Mua sắm (SOP-PUR-001). Hệ thống tự động quét kho các cơ sở lân cận. Nếu cơ sở khác có tồn dư, ERP khởi tạo Emergency Inter-Campus Transfer. Nếu toàn chuỗi hết hàng, ERP tự động phát hành PO mua sắm khẩn cấp và hẹn Phụ huynh ngày giao đồ bù.  
  *   
* **Vật tư/Đồng phục bị ẩm mốc, rách hỏng trong kho do thiên tai/sự cố (Damaged Inventory):**  
* 

  * *Xử lý:* Thủ kho lập Biên bản Kiểm nghiệm Hàng lỗi (Damage Report), chụp ảnh đính kèm và gửi Yêu cầu Chuyển trạng thái sang Damaged / Non-Issuable Stock. Kế toán trưởng duyệt chuyển kho cách ly. CFO duyệt Tờ trình Thanh lý / Hủy tài sản (Inventory Write-Off).  
  *   
* **Học sinh Rút học trả lại Đồng phục chưa qua sử dụng:**  
* 

  * *Xử lý:* Thực hiện theo SOP-ADM-005. Thủ kho kiểm tra đồng phục nguyên tem nhãn, quét Barcode nhập lại kho (Return to Stock). ERP tự động hoàn lại giá trị đồng phục vào Bảng tính Quyết toán Hoàn phí cho Phụ huynh.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Xuất Vật tư Lớp học Trong Định mức (In-Quota) | Admin Cơ sở | System Auto Approve | N/A |
| Phê duyệt Xuất Vật tư Lớp học Vượt Định mức (\> 120% Quota) | Admin Cơ sở | Hiệu trưởng Cơ sở | N/A |
| Phê duyệt Lệnh Điều chuyển Kho Đa cơ sở (Inter-Campus) | Thủ kho Xuất / Nhận | Head of Inventory | N/A |
| Phê duyệt Quyết toán Chênh lệch Kiểm kê (Tolerance \<= 0.5%) | Kế toán Kho | Kế toán trưởng | N/A |
| Phê duyệt Xử lý Mất mát / Hủy Hàng Tồn kho Hỏng (Write-Off) | Kế toán trưởng | Head of Inventory | CFO |

## **15\. Status Lifecycle**

* **Inventory Item Status:** Available \-\> Reserved (For Student) \-\> Issued \-\> In-Transit (Transfer) \-\> Damaged / Quarantined \-\> Written Off.  
*   
* **Stock Requisition Status:** Draft \-\> Submitted \-\> Approved \-\> Partially Issued \-\> Fully Issued \-\> Closed.  
*   
* **Physical Count Status:** Scheduled \-\> Inventory Frozen \-\> Counting \-\> Variance Calculated \-\> Reconciled & Adjusted.  
* 

## **16\. Data Model**

* **Primary Entity:** InventoryBalance  
* 

  * BalanceID (PK, String, Unique)  
  *   
  * WarehouseID (FK, String), ItemID (FK, String)  
  *   
  * OnHandQuantity (Decimal), ReservedQuantity (Decimal), AvailableQuantity (Decimal)  
  *   
  * SafetyStockLevel (Decimal), ReorderPoint (Decimal)  
  *   
  * AverageUnitPrice (Decimal), LastCountDate (Date)  
  *   
* **Related Entities:**  
* 

  * InventoryStockLog: LogID (PK), WarehouseID (FK), ItemID (FK), TransactionType (Enum: GRN\_Receipt, Student\_Issue, Classroom\_Issue, Transfer\_Out, Transfer\_In, Adjustment), ReferenceDocID (String), Quantity (Decimal), UnitPrice (Decimal), Timestamp (DateTime), OperatorID (FK).  
  *   
  * StudentPackageIssue: IssueID (PK), StudentID (FK), ItemID (FK), Size (String), IssuedQuantity (Integer), BarcodeScanned (String), IssuedDate (DateTime), Status (Enum: Reserved, Issued, Exchanged, Returned).  
  *   
  * InventoryCountAudit: AuditID (PK), WarehouseID (FK), AuditDate (Date), FrozenTimestamp (DateTime), TotalSystemQty (Decimal), TotalCountedQty (Decimal), VarianceQty (Decimal), VarianceValue (Decimal), Status (Enum: In\_Progress, Reconciled, Approved).  
  * 

## **17\. Forms / Documents**

* FRM-INV-001: Phiếu Xuất Kho Đồng phục & Sách vở Học sinh (Student Uniform & Book Issue Slip).  
*   
* FRM-INV-002: Phiếu Đề nghị Xuất Vật tư Lớp học theo Định mức (Classroom Material Requisition).  
*   
* FRM-INV-003: Lệnh Điều chuyển Tồn kho Đa cơ sở (Inter-Campus Stock Transfer Order).  
*   
* FRM-INV-004: Biên bản Kiểm kê Kho Thực địa & Báo cáo Chênh lệch (Physical Inventory Count & Variance Sheet).  
*   
* FRM-INV-005: Tờ trình Xử lý Hao hụt / Bồi thường / Thanh lý Hàng hỏng (Inventory Write-off & Adjustment Form).  
* 

## **18\. ERP Functional Requirements**

* **FR-INV-001 (MUST):** Tích hợp Auto Stock Reservation Engine: Tự động giữ hàng đồng phục/sách vở đúng size cho học sinh ngay khi hoàn tất đóng phí nhập học trên SOP-ADM-003.  
*   
* **FR-INV-002 (MUST):** Hỗ trợ App Mobile Kho quét mã vạch Barcode/QR Code cho các thao tác Xuất kho đồng phục, Nhập kho GRN, Điều chuyển kho và Kiểm kê kho thực địa.  
*   
* **FR-INV-003 (MUST):** Tích hợp Phân hệ Classroom Quota Management: Tự động kiểm soát định mức vật tư tiêu hao xuất cho từng lớp học và cảnh báo vượt định mức.  
*   
* **FR-INV-004 (MUST):** Tự động hạch toán Giá vốn Hàng xuất bán/xuất dùng (Auto COGS / Expense Posting) và đồng bộ Sổ cái Kế toán ngay khi Phiếu xuất kho được bấm xác nhận.  
*   
* **FR-INV-005 (SHOULD):** Thuật toán Auto Reorder Point Trigger: Tự động khởi tạo Yêu cầu Mua hàng (PR) gửi Phân hệ Mua sắm (SOP-PUR-001) khi tồn kho khả dụng chạm ngưỡng Reorder Point.  
* 

## **19\. Automation Opportunities**

* **AUTO-INV-001 (INTEGRATION):** Tự động giữ hàng gói đồng phục và sách vở đúng size cho Học sinh mới ngay khi nhận dữ liệu thanh toán thành công từ SOP-ADM-003.  
*   
* **AUTO-INV-002 (RULE ENGINE):** Tự động tính toán nhu cầu vật tư tiêu hao hàng tháng cho các lớp dựa trên sĩ số học sinh thực tế và Ma trận Định mức Khối (Classroom Quota Master).  
*   
* **AUTO-INV-003 (WORKFLOW):** Tự động khóa sổ kho (Inventory Freeze) và sinh Bảng chênh lệch kiểm kê khi Kế toán kho bấm "Bắt đầu Kiểm kê Kho Định kỳ".  
*   
* **AUTO-INV-004 (INTEGRATION):** Tự động trích xuất dữ liệu tồn kho lâu ngày không biến động (Dead Stock \> 90 days) gửi Báo cáo Cảnh báo cho Head of Inventory và CFO.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Chuẩn bị Đồ cho Học sinh Mới | Thủ kho Cơ sở | Mobile App Push | Immediate khi Enrolled |
| Cảnh báo Hết Size / Hết Hàng Tồn Kho (Stockout) | Thủ kho & Procurement | ERP High Alert \+ Push | Immediate khi Reserve failed |
| Cảnh báo Tồn kho Chạm Ngưỡng Safety Stock | Thủ kho & Head of Inv | ERP Notification | Daily 08:00 AM |
| Thông báo Lệnh Điều chuyển Kho Đa cơ sở | Thủ kho 2 Cơ sở & Driver | Mobile App Push | Immediate khi TO approved |
| Nhắc Lịch Kiểm kê Kho Định kỳ Cuối tháng | Thủ kho & Kế toán Kho | ERP Pop-up \+ Email | 3 ngày trước ngày cuối tháng |
| Cảnh báo Chênh lệch Kiểm kê Vượt Ngưỡng (\> 0.5%) | Kế toán trưởng & CFO | ERP High Alert \+ Email | Immediate khi Count finished |

## **21\. Permission Matrix (RBAC)**

| Role | View Stock Balance | Create Requisition | Approve Requisition | Issue Stock | Perform Count | Approve Adjustment |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Giáo viên Mầm non | Assigned Class | Own Class Only | No | No | No | No |
| Admin / Lễ tân | Campus View | Full Campus | Review Only | No | No | No |
| Hiệu trưởng Cơ sở | Campus View | Full Campus | Full (In Quota) | No | View Count | No |
| Thủ kho Cơ sở | Campus View | Request Transfer | No | Full Campus | Full Count | No |
| Kế toán Kho | Full Enterprise | View Only | View Only | Read Only | Full Count | \<= 0.5% Tolerance |
| Head of Inv / CFO | Full Enterprise | Full | Full Enterprise | Read Only | Audit Only | Full (\> 0.5% / Write-off) |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Toàn bộ lịch sử Nhập \- Xuất \- Tồn của từng mã vật tư: Mã chứng từ liên kết, Số lượng biến động, Số dư trước & sau biến động, Tài khoản thực hiện, Timestamp.  
*   
* Nhật ký quét mã Barcode xuất gói đồng phục cho từng Mã Học sinh StudentID.  
*   
* Nhật ký Giữ hàng tự động (Stock Reservation Logs) khi có học sinh mới nhập học.  
*   
* Lịch sử điều chuyển kho đa cơ sở: Mã TO, Thời gian xuất kho A, Thời gian nhập kho B, Người vận chuyển.  
*   
* Toàn bộ dữ liệu kiểm kê kho thực địa: Số lượng đếm thực tế, Mã máy quét Barcode sử dụng, Tỷ lệ chênh lệch, Lý do giải trình và Tờ trình điều chỉnh kế toán.  
* 

## **23\. Internal Controls**

* **Barcode Scan Mandatory Control:** Bắt buộc 100% thao tác Nhập kho, Xuất kho đồng phục và Kiểm kê kho phải thực hiện bằng máy quét mã Barcode/QR Code để chống nhập nhầm mã/size.  
*   
* **Dual Sign for Material Issue:** Xuất vật tư lớp học bắt buộc phải có xác nhận 2 bên: Thủ kho giao \+ Giáo viên nhận ký điện tử trên Mobile App.  
*   
* **System Freeze During Audit:** Tự động khóa tính năng Nhập/Xuất kho trên phần mềm trong thời gian diễn ra đợt Kiểm kê Kho Thực địa để bảo đảm tính chính xác của dữ liệu.  
*   
* **Segregation of Inventory Duties:** Thủ kho chịu trách nhiệm giữ hàng vật lý không được kiêm nhiệm vai trò Kế toán Kho nhập bút toán điều chỉnh chênh lệch tồn kho.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **Tỷ lệ Độ chính xác Tồn kho (Inventory Accuracy)** | (Số mã vật tư khớp 100% thực tế / Tổng số mã) \* 100 | **\>= 98%** | Thủ kho & Kế toán Kho |
| **SLA Cấp phát Đồng phục cho Bé Mới** | Thời gian từ khi Phụ huynh đến nhận đồ đến khi xuất xong | **\<= 5 phút** | Thủ kho Cơ sở |
| **SLA Hoàn thành Kiểm kê Kho Định kỳ** | Thời gian đóng sổ và xuất Bảng Chênh lệch Kiểm kê | **\<= 4 giờ** | Kế toán Kho & Thủ kho |
| **Tỷ lệ Đứt gãy Nguồn cung Đồng phục (Stockout Rate)** | (Số ca nhập học bị thiếu size đồng phục / Tổng Enrolled) \* 100 | **\<= 1%** | Head of Inventory |
| **Tỷ lệ Tồn kho Chết / Lâu ngày (\> 90 days)** | (Giá trị tồn kho \> 90 ngày / Tổng giá trị tồn kho) \* 100 | **\<= 3%** | Head of Inventory |

## **25\. Dashboard / Report**

* **Inventory Operational Dashboard (Thủ kho & Admin):** Màn hình đếm ngược các gói đồng phục cần giao cho học sinh mới, Danh sách vật tư dưới ngưỡng Safety Stock, Trạng thái các Lệnh điều chuyển kho đang đi đường (In-Transit).  
*   
* **Stock Requisition & Consumption Report (Hiệu trưởng & BGH):** Báo cáo tiêu hao vật tư học tập theo lớp/khối, So sánh định mức tiêu hao thực tế vs Định mức chuẩn Quota, Cảnh báo lớp học sử dụng vượt định mức.  
*   
* **Executive Inventory & Working Capital BI Dashboard (CFO & Board):** Báo cáo tổng giá trị tồn kho toàn chuỗi, Báo cáo vòng quay hàng tồn kho (Inventory Turnover), Báo cáo phân tích tuổi hàng tồn kho (Inventory Aging & Dead Stock Analysis), Báo cáo chênh lệch kiểm kê kho theo cơ sở.  
* 

## **26\. Integration**

* **Student Enrollment Engine (SOP-ADM-003):** Nhận dữ liệu học sinh mới đóng phí để tự động giữ hàng đồng phục/sách vở.  
*   
* **Procure-to-Pay Engine (SOP-PUR-001):** Tự động tạo Yêu cầu Mua hàng (PR) khi tồn kho chạm Reorder Point và tự động tăng tồn kho khi nhập GRN.  
*   
* **Classroom & Academic Management (SOP-ACA-001 & SOP-SIS-002):** Lấy dữ liệu sĩ số lớp và kế hoạch giảng dạy để tính định mức vật tư học tập.  
*   
* **Core Finance & General Ledger (SOP-FIN-001 & SOP-FIN-002):** Tự động hạch toán giá vốn, chi phí vật tư và bút toán điều chỉnh chênh lệch tồn kho vào Sổ cái.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Mất mát / Thất thoát đồng phục & sách vở kho** | High | Medium | Bắt buộc quét mã Barcode 100% giao nhận; Kiểm kê kho định kỳ hàng tháng. | Thủ kho & Kế toán Kho |
| **Hết size đồng phục cho học sinh mới nhập học** | High | Low | Auto Stock Reservation Engine giữ hàng ngay khi Paid; Auto Reorder Point. | Head of Inv & Procurement |
| **Lãng phí vật tư tiêu hao do lớp học rút quá định mức** | Medium | Medium | Quota Management System khóa không cho xuất vượt 120% nếu thiếu duyệt Hiệu trưởng. | Admin Mgr & Hiệu trưởng |
| **Đọng vốn do tồn kho vật tư/sách mẫu cũ không dùng** | Medium | Medium | Cảnh báo Dead Stock \> 90 days tự động trên BI Dashboard; Tờ trình thanh lý. | CFO & Head of Inventory |

## **28\. Acceptance Criteria**

* **Given:** Học sinh A hoàn tất đóng phí nhập học trên SOP-ADM-003 với đăng ký Đồng phục Size S.  
*   
* **When:** Kế toán xác nhận Phiếu thu tiền thành công.  
*   
* **Then:** ERP Auto Stock Reservation Engine lập tức giữ 01 bộ Đồng phục Size S tại Kho Cơ sở A, trừ 01 sản phẩm khỏi Tồn kho Khả dụng (Available Stock), đồng thời phát Push Notification cho Thủ kho Cơ sở A soạn sẵn đồ cho Học sinh A.  
*   
* **Given:** Kế toán Kho và Thủ kho hoàn tất quét Barcode kiểm kê 100% kệ hàng tại Kho Cơ sở B.  
*   
* **When:** Kế toán Kho bấm "Hoàn tất Kiểm kê Kho".  
*   
* **Then:** ERP tự động so sánh dữ liệu quét thực tế với Tồn sổ sách, lập Bảng Chênh lệch Kiểm kê (Variance Report). Nếu giá trị chênh lệch là \-200.000 VNĐ (nhỏ hơn ngưỡng Tolerance 0.5%), ERP tự động cho phép Kế toán trưởng duyệt bút toán điều chỉnh giảm tồn kho và hạch toán chi phí hao hụt tự động.  
* 

## **29\. Test Scenarios**

1. **Happy Path Uniform Allocation Test:** Student Paid \-\> ERP Auto Reserve Stock \-\> Thủ kho quét Barcode giao đồ \-\> Phụ huynh xác nhận trên App \-\> Tồn kho giảm thực tế & GL posted.  
2.   
3. **Stockout Auto-Reorder Trigger Test:** Xuất hàng làm Tồn kho Khả dụng xuống dưới mốc Reorder Point \-\> Kiểm tra xem ERP có tự động tạo Yêu cầu Mua hàng PR gửi Phân hệ Mua sắm (SOP-PUR-001) không.  
4.   
5. **Classroom Over-Quota Requisition Test:** GVCN tạo đơn xin xuất vật tư học tập vượt 130% Định mức Lớp \-\> Kiểm tra xem ERP có khóa nút Auto-Approve và yêu cầu Luồng duyệt của Hiệu trưởng Cơ sở không.  
6.   
7. **Inter-Campus In-Transit Transfer Test:** Tạo Lệnh Điều chuyển 20 bộ đồng phục từ Kho A sang Kho B \-\> Kiểm tra xem số tiền 20 bộ đồng phục có được hạch toán vào TK 151 (Hàng đi đường) và chỉ chuyển sang Kho B khi Thủ kho B quét Barcode nhập kho không.  
8.   
9. **Physical Count Variance Settlement Test:** Giả lập kiểm kê phát hiện thiếu 05 quyển sách tiếng Anh (Giá trị 1.500.000 VNĐ, vượt ngưỡng 0.5%) \-\> Kiểm tra xem ERP có bắt buộc lập Tờ trình Trách nhiệm Bồi thường trình CFO duyệt mới cho phép cập nhật Sổ cái không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận Ngưỡng Tồn kho An toàn (Safety Stock) và Reorder Point cho từng mã SKU vật tư; Cấu hình Định mức Vật tư Lớp học (Classroom Quota Matrix); Cấu hình Tỷ lệ Chênh lệch Kiểm kê Cho phép (Tolerance Rate \= 0.5%).  
*   
* **Master Data Migration:** Import Danh mục Vật tư/Đồng phục chuẩn kèm mã Barcode/QR Code; Import Sơ đồ Kho (Warehouse/Bin Location); Import Số dư Tồn kho Đầu kỳ (Opening Inventory Balance).  
*   
* **Hardware & Integration:** Trang bị Máy quét mã vạch không dây cầm tay (Handheld Barcode Scanner) kết nối App Mobile Kho; Tích hợp máy in tem Barcode nhiệt tại các kho cơ sở.  
*   
* **Training & Change Management:** Đào tạo Thủ kho quy trình quét mã Barcode xuất nhận hàng và kiểm kê kho thực địa; Đào tạo Giáo viên thao tác nộp Đề nghị Xuất vật tư lớp học trên Tablet; Đào tạo Kế toán Kho quy trình xử lý chênh lệch kiểm kê và đối soát sổ cái.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (20 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  10.   
  11. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  12.   
  13. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  14.   
  15. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  16.   
  17. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  18.   
  19. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  20.   
  21. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  22.   
  23. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  24.   
  25. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  26.   
  27. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  28.   
  29. SOP-INV-001: Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục, Xuất kho Lớp học & Kiểm kê Kho Định kỳ (Domain 32, 38, 41, 55, 69).  
  30.   
  31. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  32.   
  33. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  34.   
  35. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  36.   
  37. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  38.   
  39. SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Service Request & CSAT/NPS (Domain 62, 63, 64, 65, 66, 68, 70).  
  40.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **05 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-INV-001: Inventory & Stock│ • SOP-SEC-001: RBAC & Security│  
│ • SOP-CS-001: Complaints & CSAT│                                │ • SOP-FAC-001: Facility & PCCC │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 23

# **SOP-ADM-007 — QUY TRÌNH QUẢN LÝ HỌC SINH CHUYỂN LỚP, CHUYỂN CƠ SỞ HỌC TẬP (INTER-CAMPUS TRANSFER), ĐỒNG BỘ CÔNG NỢ VÀ HỒ SƠ HỌC SINH**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-ADM-007  
*   
* **Tên SOP:** Quy trình Quản lý Học sinh Chuyển Lớp, Chuyển Cơ sở Học tập (Inter-Campus Transfer), Đồng bộ Công nợ và Hồ sơ Học sinh  
*   
* **Module ERP:** Student Information System \- SIS (04), Student Enrollment (06), Debt & Accounts Receivable (11), Class Management (12), Multi-campus Management (71), Finance & Accounting Integration (55)  
*   
* **Process Owner:** Admission Manager (Trưởng phòng Tuyển sinh Chuỗi) / Kế toán trưởng  
*   
* **Department:** Phòng Tuyển sinh & Dịch vụ Khách hàng, Phòng Kế toán \- Tài chính, Ban Giám hiệu Cơ sở Chuyển & Cơ sở Nhận, Bộ phận Chăm sóc Khách hàng  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Vận hành Chuỗi (Group COO) / CFO  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ quy trình điều chuyển học sinh mầm non giữa các lớp trong cùng cơ sở (Intra-Campus Class Transfer) hoặc giữa các cơ sở thành viên thuộc hệ thống chuỗi (Inter-Campus School Transfer): từ việc tiếp nhận đơn đề nghị chuyển lớp/cơ sở từ Phụ huynh qua Mobile App, kiểm tra chỉ tiêu sĩ số lấp đầy (Class Capacity Check), tự động xử lý chênh lệch biểu phí học phí/tiền ăn/phí xe bus (Fee Differential Settlement), điều chuyển công nợ và tiền gửi dư giữa các sổ cái cơ sở, đến việc tự động đồng bộ 100% hồ sơ học sinh (Tiền sử y tế/dị ứng, danh sách người ủy quyền đón, nhật ký học tập, lịch sử tiêm chủng) sang cơ sở mới với duy nhất một mã định danh Student ID không đổi (Single Source of Truth).

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thành viên thuộc tập đoàn/chuỗi.  
*   
* **Phòng ban:** Phòng Tuyển sinh, Phòng Kế toán, Khối Giáo viên Mầm non (Cơ sở đi & Cơ sở đến), Bộ phận Chăm sóc Khách hàng, Bộ phận Xe bus, Bộ phận Y tế, Bếp ăn.  
*   
* **Đối tượng:** Tất cả học sinh mầm non đang theo học chính thức (Active/Enrolled), Phụ huynh / Người giám hộ hợp pháp.  
*   
* **Trường hợp không áp dụng:** Học sinh xin rút học rời khỏi hệ thống nhà trường (áp dụng SOP-ADM-005: Quản lý Học sinh Rút học, Hoàn phí & Quyết toán Hợp đồng).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Inter-Campus Transfer (Chuyển Cơ sở Học tập):** Việc học sinh điều chuyển từ Cơ sở A (Origin Campus) sang Cơ sở B (Destination Campus) trong cùng hệ thống chuỗi do thay đổi nơi ở của gia đình hoặc nhu cầu chuyển đổi chương trình học.  
*   
* **Intra-Campus Class Transfer (Chuyển Lớp cùng Cơ sở):** Việc học sinh chuyển từ Lớp X sang Lớp Y trong cùng một Cơ sở do điều chỉnh độ tuổi, thời khóa biểu hoặc yêu cầu môi trường học tập.  
*   
* **Single Student ID (Mã Học sinh Duy nhất):** Mã định danh duy nhất của học sinh trên toàn hệ thống ERP. Khi học sinh chuyển cơ sở, mã Student ID giữ nguyên không đổi để bảo toàn toàn bộ lịch sử học tập.  
*   
* **Inter-Company AR Transfer (Điều chuyển Công nợ / Dư nợ Đa cơ sở):** Bút toán kế toán tự động chuyển số dư công nợ phải thu hoặc tiền đóng trước của Phụ huynh từ Sổ cái Kế toán Cơ sở A sang Sổ cái Kế toán Cơ sở B.  
*   
* **Transfer Effective Date (Ngày Hiệu lực Chuyển trường):** Ngày chính thức học sinh bắt đầu đi học tại Lớp/Cơ sở mới, là mốc căn cứ để chốt công nợ và phân bổ doanh thu.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Tiếp nhận Đơn xin Chuyển Lớp / Cơ sở & Kiểm tra Sĩ số Lớp mới | Admission Officer (Nơi đến) | Admission Manager | Phụ huynh | BGH 2 Cơ sở |
| Kiểm tra & Chốt Công nợ / Tiền ăn tại Cơ sở Đi (Origin) | Kế toán Phí (Cơ sở đi) | Kế toán trưởng | Admission Officer | Phụ huynh |
| Tính toán Chênh lệch Biểu phí & Điều chuyển Sổ cái (AR Transfer) | Kế toán Phí (Cơ sở đến) | Kế toán trưởng | CFO | Admission Mgr |
| Phê duyệt Tờ trình Chuyển Cơ sở & Đồng bộ Dữ liệu ERP | Hiệu trưởng 2 Cơ sở | Group COO | Academic Manager | Toàn bộ Actor |
| Bàn giao Thực địa Học sinh, Đổi Tuyến Bus & Chăm sóc Hòa nhập | GVCN 2 Lớp & Bus Monitor | Hiệu trưởng (Cơ sở đến) | Cán bộ Y tế | Phụ huynh |

*Ghi chú: Việc chuyển trường cho học sinh mầm non, đồng bộ hồ sơ sức khỏe/tiêm chủng và điều chuyển chứng từ kế toán giữa các pháp nhân trường học cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo và Luật Kế toán trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Lớp học & Dung lượng Khả dụng (ClassCapacityMaster), Ma trận Biểu phí các Cơ sở (FeeStructureMaster), Sơ đồ Cây Cơ sở Chuỗi (CampusHierarchyMaster).  
*   
* **Hồ sơ Bắt buộc:**  
* 

  1. Đơn xin Chuyển Lớp / Chuyển Cơ sở Điện tử có chữ ký Phụ huynh (FRM-ADM-020).  
  2.   
  3. Xác nhận Lớp mới còn chỉ tiêu tiếp nhận (Available Seat \> 0).  
  4.   
* **Approval Prerequisite:** Không có công nợ học phí quá hạn chưa giải quyết tại Cơ sở đi (hoặc có cam kết chuyển nợ sang Cơ sở đến).  
* 

## **7\. Trigger**

* **Phụ huynh Yêu cầu:** Phụ huynh gửi "Đơn xin Chuyển Lớp / Chuyển Cơ sở" trên Mobile App do thay đổi địa chỉ nhà hoặc nhu cầu học tập.  
*   
* **Định kỳ Đầu Năm học / Học kỳ Mới:** Ban Giám hiệu thực hiện phân bổ chuyển lớp hàng loạt theo độ tuổi (Age Group Transition).  
*   
* **Khuyến nghị Chuyên môn:** Đề xuất chuyển lớp từ Giáo viên / Chuyên gia Tâm lý sau buổi Đánh giá Phát triển (SOP-SIS-002).  
* 

## **8\. Quy trình AS-IS**

* Phụ huynh đến gặp tư vấn viên cơ sở cũ viết đơn xin chuyển trường bằng tay.  
*   
* Tư vấn viên cơ sở cũ gọi điện hoặc nhắn tin Zalo hỏi tư vấn viên cơ sở mới xem còn chỗ không.  
*   
* Kế toán cơ sở cũ chốt số tiền đã đóng trên file Excel, in phiếu xác nhận gửi Phụ huynh cầm sang cơ sở mới.  
*   
* Phụ huynh mang giấy tờ sang cơ sở mới, tư vấn viên cơ sở mới nhập lại toàn bộ thông tin học sinh vào file Excel mới và cấp một mã học sinh mới.  
*   
* Giáo viên cơ sở mới không nắm được tiền sử dị ứng y tế, thói quen ăn ngủ và danh sách người được phép đón trẻ của bé.  
*   
* **Hệ quả:** Mất từ 5–10 ngày để hoàn tất thủ tục chuyển cơ sở; trùng lặp dữ liệu và tạo 2 mã học sinh khác nhau cho 1 trẻ; rủi ro y tế lớn do thất lạc hồ sơ dị ứng; rủi ro sai lệch sổ sách kế toán giữa 2 pháp nhân trường học.  
* 

## **9\. Pain Points / Risk**

* **Duplicate Student Profile Risk:** Việc tạo mới mã Student ID tại cơ sở mới làm đứt gãy lịch sử học tập, phát triển thể chất và dữ liệu tiêm chủng của trẻ trên hệ thống.  
*   
* **Capacity Overbooking:** Nhận học sinh chuyển đến khi lớp mới đã vượt quá Tỷ lệ Ratio Giáo viên/Học sinh quy định (BR-HR-003).  
*   
* **Accounting Discrepancy & Revenue Leakage:** Sai lệch trong việc kết chuyển học phí đóng trước, tiền ăn dư và tiền phạt vi phạm giữa 2 cơ sở.  
*   
* **Medical & Safeguarding Hazard:** Bỏ sót thông tin trẻ bị dị ứng thực phẩm nặng hoặc thông tin người bị cấm đón trẻ (Blacklist Pickup) khi chuyển sang môi trường mới.  
* 

## **10\. Quy trình TO-BE**

**1.Bước 01: Tiếp nhận Đơn Chuyển Lớp / Cơ sở & Kiểm tra Chỉ tiêu Sĩ số:**Thời gian: Max 1 giờ làm việc | Actor: Phụ huynh & ERP System.  
Phụ huynh mở Mobile App, chọn "Xin Chuyển Lớp / Chuyển Cơ sở", chọn Cơ sở đến, Khối/Lớp mong muốn và Ngày bắt đầu chuyển (Transfer Effective Date). ERP tự động chạy thuật toán Class Capacity Check: Kiểm tra sĩ số thực tế và dung lượng tối đa của Lớp mới. Nếu Lớp mới đã hết chỗ (Available Seat \= 0), ERP báo cờ đỏ và gợi ý các Lớp/Cơ sở lân cận còn chỗ.

**2.Bước 02: Khảo sát & Phê duyệt Chủ trương Chuyển Cơ sở:**Thời gian: Max 24 giờ làm việc | Actor: Admission Officer & BGH 2 Cơ sở.  
Tư vấn viên Cơ sở đến kiểm tra hồ sơ. ERP tự động khởi tạo Luồng duyệt Inter-Campus Transfer Approval Workflow: Gửi thông báo đến Hiệu trưởng Cơ sở đi và Hiệu trưởng Cơ sở đến. Cả 2 Hiệu trưởng xem xét và bấm "Phê duyệt Chủ trương Chuyển trường" trên ERP.

**3.Bước 03: Chốt Công nợ & Tính toán Chênh lệch Biểu phí (Fee Differential):**Thời gian: Max 4 giờ làm việc | Actor: Kế toán Phí 2 Cơ sở & ERP Engine.  
ERP Pro-rata Fee Engine tự động tính toán tài chính tại mốc Ngày hiệu lực chuyển:

* *Tại Cơ sở đi:* Tính số ngày đã học thực tế, hoàn trả tiền ăn chưa dùng, chốt số dư tiền học phí đóng trước.  
* 

* *Tại Cơ sở đến:* Áp dụng Biểu phí niêm yết của Cơ sở mới, tính số tiền học phí/dịch vụ còn phải nộp thêm hoặc được khấu trừ bù.  
* Kế toán Phí 2 Cơ sở kiểm tra và bấm "Xác nhận Bảng Quyết toán Chuyển trường".  
* 

**4.Bước 04: Kết chuyển Sổ cái Kế toán Đa cơ sở (Inter-Company AR Transfer):**Thời gian: Real-time (\<= 10 giây) | Actor: ERP Finance Integration Engine.  
Ngay khi Bảng Quyết toán được Kế toán trưởng phê duyệt, ERP tự động khởi tạo các Bút toán Kế toán Kết chuyển (Inter-Company Journal Vouchers):

* Khấu trừ công nợ / Doanh thu chưa thực hiện (TK 3387\) tại Cơ sở đi.  
* 

* Ghi nhận Công nợ / Doanh thu chưa thực hiện (TK 3387\) tương ứng tại Cơ sở đến.  
* Phụ huynh nhận được Thông báo Phí điều chỉnh (Fee Adjustment Notice) kèm mã VietQR động trên Mobile App để thanh toán phần chênh lệch (nếu có).  
* 

**5.Bước 05: Tự động Đồng bộ Hồ sơ SIS, Y tế & Danh sách Đón trẻ:**Thời gian: Real-time (\<= 1 giây) | Actor: ERP SIS Data Migration Engine.  
Đúng **00:00 AM của Ngày hiệu lực chuyển**, ERP kích hoạt tiến trình Live Profile Sync:

* Giữ nguyên mã Student ID vĩnh viễn.  
* 

* Chuyển danh sách học sinh từ Lớp cũ sang Lớp mới trên Phân hệ SIS.  
* 

* Đồng bộ 100% Hồ sơ Y tế/Dị ứng (SOP-MED-001), Danh sách Người ủy quyền đón (SOP-SIS-001), Lịch sử điểm danh và Báo cáo phát triển (SOP-SIS-002) sang Tablet của Giáo viên chủ nhiệm Lớp mới.  
* 

* Cập nhật tuyến Xe bus mới trên Phân hệ Bus (SOP-BUS-001).  
* 

**6.Bước 06: Bàn giao Thực địa & Khảo sát Hòa nhập Môi trường Mới:**Thời gian: Ngày đầu học sinh đến lớp mới | Actor: GVCN Lớp Mới & CSKH Officer.  
Học sinh đến Lớp mới. GVCN Lớp mới nhận tín hiệu cảnh báo Y tế/Dị ứng trên App Teacher, đón trẻ và hướng dẫn hòa nhập. Bộ phận CSKH lên lịch hẹn khảo sát trải nghiệm Phụ huynh sau **07 ngày** học tập tại cơ sở mới để đo lường chỉ số hài lòng CSAT (SOP-CS-001).

## **11\. Workflow**

\[BẮT ĐẦU: Phụ Huynh Nộp Đơn Xin Chuyển Lớp / Cơ Sở Trên Mobile App\]  
       │  
       ▼  
\[ERP Class Capacity Check Engine: Kiểm Tra Sĩ Số Lớp Mới\]  
       │  
       ◇ Lớp mới còn chỉ tiêu tiếp nhận (Available Seat \> 0)?  
       ├─ NO  ──► \[ERP Báo Cờ Đỏ "Full Capacity" ──► Gợi Ý Lớp / Cơ Sở Lân Cận\]  
       └─ YES ──┐  
                │  
                ▼  
\[Inter-Campus Approval Workflow: Hiệu Trưởng Cơ Sở Đi & Đến Phê Duyệt\]  
                │  
                ▼  
\[ERP Pro-rata Fee Engine: Tính Chênh Lệch Biểu Phí & Công Nợ Mốc Ngày Hiệu Lực\]  
                │  
                ▼  
\[Kế Toán Trưởng Duyệt ──► ERP Auto Post Inter-Company AR Journal Vouchers (TK 3387)\]  
                │  
                ▼  
\[Phụ Huynh Thanh Toán Chênh Lệch Phí Qua VietQR Động Trên App (Nếu có)\]  
                │  
                ▼  
\[00:00 AM Ngày Hiệu Lực Chuyển: ERP Live Profile Sync Engine Running\]  
  • Giữ nguyên mã Student ID duy nhất.  
  • Chuyển Class Assignment trên SIS.  
  • Sync 100% Hồ sơ Y tế / Dị ứng / Người đón / Lịch sử học tập sang GVCN Lớp Mới.  
  • Re-route Tuyến xe Bus mới (SOP-BUS-001).  
                │  
                ▼  
\[Học Sinh Đến Lớp Mới ──► GVCN Nhận Alert Y Tế ──► CSKH Survey CSAT Sau 07 Ngày\]  
                │  
                ▼  
           \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-ADM-020 (Class Capacity Constraint):** Tuyệt đối không cho phép phê duyệt chuyển học sinh vào Lớp mới nếu Tỷ lệ Giáo viên/Học sinh (Teacher-Student Ratio theo SOP-HR-001) của Lớp mới vượt quá quy định của Bộ GD&ĐT.  
*   
* **BR-ADM-021 (Single Student ID Policy):** Mã Student ID là duy nhất và cố định trong toàn bộ vòng đời học tập của trẻ tại hệ thống chuỗi. Tuyệt đối KHÔNG tạo mã Student ID mới khi học sinh chuyển cơ sở thành viên.  
*   
* **BR-ADM-022 (Full Profile Continuity):** Toàn bộ dữ liệu lịch sử của học sinh (Nhật ký y tế/dị ứng, lịch sử cho uống thuốc, lịch sử tiêm chủng, nhật ký đón trả trẻ, báo cáo đánh giá phát triển 5 lĩnh vực, lịch sử học phí) bắt buộc phải được kế thừa 100% sang Cơ sở mới, không được làm đứt đoạn dữ liệu.  
*   
* **BR-FIN-020 (Fee Differential Settlement):** Khi chuyển cơ sở có biểu phí khác nhau:  
* 

  * *Nếu Học phí Cơ sở B \> Cơ sở A:* Phụ huynh phải nộp bổ sung phần tiền chênh lệch tính theo số ngày thực tế còn lại của kỳ.  
  *   
  * *Nếu Học phí Cơ sở B \< Cơ sở A:* Số tiền đóng thừa được ERP chuyển thành Khoản tiền gửi dư (Parent Deposit) tại Cơ sở B và tự động trừ lùi vào hóa đơn kỳ tiếp theo.  
  *   
* **BR-FIN-021 (Inter-Company Accounting Reconciliation):** Việc chuyển tiền/công nợ giữa 2 pháp nhân cơ sở khác nhau phải được hạch toán qua Tài khoản Phải thu/Phải trả Nội bộ (TK 136 / TK 336\) và tự động bù trừ đối soát cuối tháng.  
* 

## **13\. Exception Cases**

* **Chuyển cơ sở giữa kỳ học nhưng học sinh đang đi Xe bus cố định:**  
* 

  * *Xử lý:* ERP Phân hệ Bus (SOP-BUS-001) tự động hủy điểm đón cũ tại Cơ sở A, quét tìm lộ trình xe bus khả dụng tại Cơ sở B. Nếu tuyến bus Cơ sở B hết chỗ, ERP báo cờ Bus Capacity Full để Phụ huynh lựa chọn đổi điểm đón hoặc hủy dịch vụ bus trước khi chốt chuyển trường.  
  *   
* **Học sinh có công nợ học phí quá hạn tại Cơ sở A chưa thanh toán:**  
* 

  * *Xử lý:* ERP báo cờ Overdue Debt Alert. Phụ huynh phải thanh toán hết nợ cũ tại Cơ sở A, hoặc ký "Cam kết Chuyển Nợ" (Debt Transfer Agreement). Khi đó, Kế toán trưởng duyệt chuyển toàn bộ khoản nợ cũ sang Sổ cái Cơ sở B để tiếp tục theo dõi đôn đốc thu nợ (SOP-FIN-001).  
  *   
* **Phụ huynh đổi ý hủy yêu cầu chuyển cơ sở sát Ngày hiệu lực:**  
* 

  * *Xử lý:* Phụ huynh bấm "Hủy Yêu cầu Chuyển trường" trên App trước 24 giờ. ERP tự động hủy Lệnh chuyển, khôi phục trạng thái danh sách lớp tại Cơ sở A và hoàn trả chỉ tiêu giữ chỗ tại Cơ sở B.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Chuyển Lớp cùng Cơ sở (Intra-Campus Transfer) | GVCN 2 Lớp (Xác nhận) | Hiệu trưởng Cơ sở | N/A |
| Chuyển Cơ sở cùng Pháp nhân (Inter-Campus) | Admission Officer | Hiệu trưởng Cơ sở đi & đến | N/A |
| Chuyển Cơ sở khác Pháp nhân / Khác Biểu phí | Hiệu trưởng 2 Cơ sở | Kế toán trưởng | CFO |
| Phê duyệt Chuyển Công nợ Nợ xấu / Miễn phí Chuyển trường | Kế toán trưởng | CFO | Group COO / CEO |

## **15\. Status Lifecycle**

* **Transfer Request Status:** Draft \-\> Capacity Verified \-\> Under Approval \-\> Approved \-\> Financial Settled \-\> Transferred (Completed) (hoặc Cancelled).  
*   
* **Student Campus Status:** Active at Campus A \-\> Transfer Pending \-\> Active at Campus B.  
* 

## **16\. Data Model**

* **Primary Entity:** StudentTransferRequest  
* 

  * TransferID (PK, String, Unique)  
  *   
  * StudentID (FK, String, Fixed), ContractID (FK, String)  
  *   
  * OriginCampusID (FK, String), OriginClassID (FK, String)  
  *   
  * DestinationCampusID (FK, String), DestinationClassID (FK, String)  
  *   
  * RequestDate (Date), TransferEffectiveDate (Date)  
  *   
  * ReasonCategory (Enum: Relocation, Program\_Change, Facility\_Preference, Conflict)  
  *   
  * TransferStatus (Enum: Draft, Approved, Settled, Completed, Cancelled)  
  *   
* **Related Entities:**  
* 

  * TransferFeeSettlement: SettlementID (PK), TransferID (FK), OriginUnearnedRevenue (Decimal), DestinationTuitionRequired (Decimal), DifferentialAmount (Decimal), PaymentStatus (Enum: Refund\_Pending, Collect\_Pending, Balanced).  
  *   
  * InterCompanyJournalLog: JournalID (PK), TransferID (FK), OriginCompanyTaxCode (String), DestinationCompanyTaxCode (String), TransferredAmount (Decimal), GLPosted (Boolean).  
  * 

## **17\. Forms / Documents**

* FRM-ADM-020: Đơn xin Chuyển Lớp / Chuyển Cơ sở Học tập Điện tử (Digital Transfer Request Form).  
*   
* FRM-ADM-021: Biên bản Quyết toán Chênh lệch Biểu phí & Chuyển Công nợ Đa cơ sở (Inter-Campus Fee Settlement Sheet).  
*   
* FRM-ADM-022: Giấy Xác nhận Tiếp nhận Học sinh & Bàn giao Hồ sơ SIS (Student Transfer Clearance Certificate).  
* 

## **18\. ERP Functional Requirements**

* **FR-ADM-020 (MUST):** Tích hợp Class Capacity Check Algorithm: Tự động kiểm tra sĩ số lớp mới và Tỷ lệ Ratio Giáo viên/Học sinh trước khi cho phép gửi đơn chuyển lớp/cơ sở.  
*   
* **FR-ADM-021 (MUST):** Tích hợp Pro-rata Fee Differential Calculator: Tự động tính toán số tiền chênh lệch học phí/tiền ăn tính theo số ngày thực tế còn lại của kỳ học khi chuyển cơ sở có biểu phí khác nhau.  
*   
* **FR-ADM-022 (MUST):** Tích hợp Live Profile Sync Engine: Bảo đảm giữ nguyên mã Student ID duy nhất và tự động đồng bộ 100% hồ sơ y tế/dị ứng, người đón, lịch sử học tập sang GVCN Lớp mới đúng 00:00 AM Ngày hiệu lực.  
*   
* **FR-FIN-020 (MUST):** Tự động khởi tạo Bút toán Kết chuyển Công nợ / Doanh thu chưa thực hiện (Inter-Company AR Transfer) giữa sổ cái kế toán của 2 cơ sở.  
*   
* **FR-ADM-023 (SHOULD):** Tính năng tự động lên lịch khảo sát CSAT Phụ huynh sau 07 ngày học sinh nhập học tại cơ sở mới trên SOP-CS-001.  
* 

## **19\. Automation Opportunities**

* **AUTO-ADM-020 (RULE ENGINE):** Tự động kiểm tra chỉ số capacity lớp mới và tự động gợi ý các lớp/cơ sở lân cận còn chỗ trống trên giao diện Mobile App Phụ huynh.  
*   
* **AUTO-FIN-020 (INTEGRATION):** Tự động hạch toán bút toán chuyển công nợ nội bộ giữa 2 cơ sở và sinh mã VietQR động để Phụ huynh thanh toán phần phí chênh lệch trên App.  
*   
* **AUTO-ADM-021 (DATA MIGRATION):** Tự động chuyển giao toàn bộ dữ liệu phân quyền xem hồ sơ học sinh từ GVCN lớp cũ sang GVCN lớp mới đúng mốc Ngày hiệu lực.  
*   
* **AUTO-CS-020 (WORKFLOW):** Tự động khởi tạo Task "Khảo sát Hòa nhập Cơ sở Mới" cho Chăm sóc Khách hàng sau 07 ngày chuyển trường.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Thông báo Nộp Đơn Chuyển Cơ sở Mới | Hiệu trưởng 2 Cơ sở & Tuyển sinh | App Push \+ ERP Alert | Immediate khi submit |
| Thông báo Phê duyệt Chuyển trường & Bảng Phí | Phụ huynh | Mobile App Push \+ Zalo OA | Immediate khi approved |
| Cảnh báo Học sinh Mới Chuyển đến Lớp (Kèm Cờ Y tế) | GVCN Lớp Mới & Cán bộ Y tế | App Push \+ Tablet Alert | 1 ngày trước Ngày hiệu lực |
| Cảnh báo Thay đổi Tuyến Xe Bus do Chuyển Cơ sở | Bus Monitor & Driver Mới | Mobile App Push | 1 ngày trước Ngày hiệu lực |
| Khảo sát CSAT Trải nghiệm Cơ sở Mới (Sau 7 ngày) | Phụ huynh | Mobile App Push | 08:30 AM sau 7 ngày học |

## **21\. Permission Matrix (RBAC)**

| Role | View Transfer | Create Request | Approve Transfer | Calculate Fee Diff | Post Inter-Company GL | View Full Student History |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Phụ huynh | Own Child | Own Child | No | View Only | No | Own Child Only |
| GVCN (Lớp đi/đến) | Assigned Class | No | Confirm Only | No | No | Full (After Effective Date) |
| Admission Officer | Campus Full | Full | Review Only | Read Only | No | Read Only |
| Hiệu trưởng Cơ sở | Campus Full | Read Only | Full (Campus) | Read Only | No | Full Campus Scope |
| Kế toán Phí / AR | Full Enterprise | Read Only | Review Only | Full | Full | Read Only |
| Group COO / CFO | Full Enterprise | Read Only | Full Enterprise | Read Only | Full Enterprise | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người nộp đơn xin chuyển lớp/cơ sở, Thời gian nộp, Cơ sở đi, Cơ sở đến, Ngày hiệu lực.  
*   
* Lịch sử phê duyệt của Hiệu trưởng Cơ sở đi và Hiệu trưởng Cơ sở đến (Timestamp, User ID).  
*   
* Chi tiết Bảng tính chênh lệch biểu phí, công thức Pro-rata đã áp dụng và lý do điều chỉnh (nếu có).  
*   
* Nhật ký thực thi tiến trình Live Profile Sync: Thời gian đồng bộ hồ sơ y tế/dị ứng/người đón sang lớp mới.  
*   
* Bút toán kế toán kết chuyển nội bộ giữa 2 cơ sở (Inter-Company GL Vouchers).  
* 

## **23\. Internal Controls**

* **Class Capacity Hard Gate:** Chặn cứng hệ thống không cho phép duyệt chuyển học sinh nếu sĩ số lớp mới đã đạt ngưỡng tối đa theo Tỷ lệ Ratio quy định.  
*   
* **Medical Alert Mandatory Sync:** Bắt buộc hệ thống phải hiển thị Cờ Cảnh báo Y tế/Dị ứng đỏ trên Tablet của GVCN Lớp mới ngay khi mở danh sách lớp vào ngày đầu tiên học sinh chuyển đến.  
*   
* **Inter-Company GL Balance Verification:** Bút toán kết chuyển công nợ giữa Cơ sở A và Cơ sở B phải bảo đảm cân bằng 100% (Debit A \= Credit B), chặn lệch sổ cái tài chính tập đoàn.  
*   
* **Single ID Enforcement:** Khóa tính năng tạo mới mã Student ID nếu thông tin Số điện thoại Phụ huynh \+ Ngày sinh học sinh đã tồn tại trên cơ sở dữ liệu chuỗi.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Xử lý & Phê duyệt Chuyển Cơ sở** | Thời gian từ khi nộp đơn đến khi duyệt xong Tờ trình | **\<= 48 giờ làm việc** | Tuyển sinh & BGH 2 Cơ sở |
| **Tỷ lệ Tuân thủ Sĩ số Lớp Mới (Capacity Accuracy)** | (Số ca chuyển lớp không vượt Ratio / Tổng số ca) \* 100 | **100% (Zero Error)** | Admission Manager |
| **Tỷ lệ Bảo toàn Mã Student ID (Single ID Rate)** | (Số học sinh giữ nguyên ID khi chuyển / Tổng số ca) \* 100 | **100% (Zero Duplicate)** | ERP System Admin |
| **Tỷ lệ Đồng bộ Hồ sơ Y tế / Dị ứng Sang Lớp Mới** | (Số hồ sơ y tế sync thành công / Tổng số ca chuyển) \* 100 | **100% (Zero Loss)** | Cán bộ Y tế & IT |
| **Chỉ số Hài lòng Trải nghiệm Cơ sở Mới (CSAT 7-Day)** | Tổng điểm CSAT khảo sát sau 7 ngày chuyển / Lượt | **\>= 4.5 / 5.0 Sao** | CSKH Team |

## **25\. Dashboard / Report**

* **Inter-Campus Transfer Live Monitor (Tuyển sinh & BGH):** Bảng theo dõi danh sách học sinh đang làm thủ tục chuyển cơ sở real-time, Dự báo sĩ số biến động của từng cơ sở (Inflow vs Outflow).  
*   
* **Inter-Company AR Transfer Report (Kế toán trưởng & CFO):** Báo cáo tổng hợp số dư công nợ và doanh thu chưa thực hiện được kết chuyển giữa các cơ sở, Bảng đối soát bù trừ công nợ nội bộ.  
*   
* **Student Mobility & Retention Analytics (Group COO & Board):** Báo cáo phân tích luồng di chuyển học sinh giữa các cơ sở (Mobility Heatmap), Phân tích lý do chuyển trường (Khoảng cách, Chất lượng, Học phí).  
* 

## **26\. Integration**

* **Student Information System & Class Management (SOP-SIS-001 & Module 12):** Đồng bộ danh sách lớp, nhật ký điểm danh và vô hiệu hóa/kích hoạt quyền điểm danh của GVCN.  
*   
* **Health & Medication Management (SOP-MED-001):** Đồng bộ 100% hồ sơ y tế, dị ứng và lịch uống thuốc sang Cán bộ Y tế cơ sở mới.  
*   
* **Core Finance & Multi-Campus Ledger (SOP-FIN-001 & Module 55/71):** Tự động hạch toán bút toán kết chuyển công nợ nội bộ giữa các pháp nhân cơ sở.  
*   
* **School Bus & Route Engine (SOP-BUS-001):** Hủy tuyến bus cũ và tự động xếp tuyến bus mới tại cơ sở mới.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Lớp mới bị quá tải sĩ số vượt Ratio quy định** | High | Low | ERP Class Capacity Check Engine khóa cứng nút Approve nếu hết chỗ. | Admission Mgr & BGH |
| **Bỏ sót thông tin dị ứng nguy hiểm khi sang lớp mới** | Critical | Low | Live Profile Sync tự động đẩy Cờ Y tế đỏ lên Tablet GVCN lớp mới ngày đầu. | Cán bộ Y tế & IT |
| **Tạo trùng 2 mã Student ID gây đứt đoạn lịch sử học** | High | Low | Single Student ID Policy; Khóa tạo ID mới nếu trùng SĐT Phụ huynh \+ Ngày sinh. | ERP System Admin |
| **Sai lệch công nợ / Doanh thu giữa 2 pháp nhân cơ sở** | High | Low | Inter-Company AR Transfer Engine tự động hạch toán cân bằng TK 3387/136/336. | Kế toán trưởng |

## **28\. Acceptance Criteria**

* **Given:** Phụ huynh gửi Đơn xin Chuyển Cơ sở cho Học sinh A từ Cơ sở 1 sang Cơ sở 2 trên Mobile App.  
*   
* **When:** Phụ huynh chọn Lớp Mẫu giáo B2 tại Cơ sở 2\.  
*   
* **Then:** ERP tự động kiểm tra sĩ số Lớp B2 Cơ sở 2\. Nếu Lớp B2 còn 2 chỗ trống, ERP chấp nhận đơn và khởi tạo Luồng duyệt gửi Hiệu trưởng Cơ sở 1 và Hiệu trưởng Cơ sở 2\.  
*   
* **Given:** Đơn chuyển cơ sở cho Học sinh A đã được Hiệu trưởng 2 cơ sở và Kế toán trưởng phê duyệt, Ngày hiệu lực chuyển là 15/10/2026.  
*   
* **When:** Đồng hồ hệ thống chuyển sang 00:00:01 AM ngày 15/10/2026.  
*   
* **Then:** ERP giữ nguyên mã Student ID của Học sinh A, tự động chuyển danh sách học sinh từ Cơ sở 1 sang Lớp B2 Cơ sở 2, đồng bộ 100% Hồ sơ Dị ứng hải sản của Học sinh A sang Tablet của GVCN Lớp B2 Cơ sở 2, đồng thời tự động khởi tạo Bút toán Kết chuyển Công nợ giữa 2 cơ sở.  
* 

## **29\. Test Scenarios**

1. **Happy Path Inter-Campus Transfer Test:** Nộp đơn chuyển cơ sở trên App \-\> Capacity Check Pass \-\> Hiệu trưởng 2 cơ sở Approve \-\> Pro-rata Fee Engine tính chênh lệch phí \-\> Kế toán Approve \-\> Auto Post Inter-Company GL \-\> 00:00 AM Live Profile Sync thành công (Giữ nguyên Student ID & Hồ sơ Y tế).  
2.   
3. **Full Capacity Blocking Test:** Chọn chuyển sang một lớp học đã đạt 100% sĩ số tối đa \-\> Kiểm tra xem ERP có chặn không cho gửi đơn và hiển thị cảnh báo Class Capacity Full không.  
4.   
5. **Medical Allergy Continuity Sync Test:** Chuyển học sinh có tiền sử dị ứng Đậu nành sang cơ sở mới \-\> Kiểm tra xem đúng 00:00 AM Ngày hiệu lực, Cờ Cảnh báo Dị ứng đỏ có hiển thị trên Tablet GVCN lớp mới và Phân hệ Bếp ăn cơ sở mới (SOP-KIT-001) không.  
6.   
7. **Inter-Company Financial Balancing Test:** Chuyển học sinh giữa 2 cơ sở khác pháp nhân thuế \-\> Kiểm tra xem bút toán kết chuyển TK 3387 / TK 136 / TK 336 giữa 2 sổ cái có cân bằng 100% không.  
8.   
9. **Single Student ID Enforcement Test:** Kiểm tra mã Student ID của học sinh trước và sau khi chuyển cơ sở \-\> Xác nhận mã ID hoàn toàn trùng khớp 100%.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình quy tắc kiểm tra sĩ số lớp (Class Capacity Matrix); Cấu hình công thức tính chênh lệch biểu phí Pro-rata; Cấu hình sơ đồ tài khoản kết chuyển công nợ nội bộ (Inter-Company GL Mapping); Cấu hình luồng duyệt chuyển trường.  
*   
* **Master Data Migration:** Chuẩn hóa mã Cây Cơ sở (Campus Hierarchy); Đồng bộ danh mục biểu phí các cơ sở lên ERP.  
*   
* **Hardware & Integration:** Tích hợp Kiosk Cổng trường hai cơ sở để cập nhật quyền đón trẻ; Tích hợp API Cổng thanh toán VietQR động để thu phí chênh lệch.  
*   
* **Training & Change Management:** Đào tạo Bộ phận Tuyển sinh quy trình xử lý đơn chuyển trường trên ERP; Đào tạo Kế toán Phí quy trình đối soát công nợ kết chuyển đa cơ sở; Hướng dẫn Giáo viên mầm non cách xem thông báo tiếp nhận học sinh mới chuyển đến trên App Teacher.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (21 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-ADM-007: Quản lý Học sinh Chuyển Lớp, Chuyển Cơ sở (Inter-Campus Transfer) & Đồng bộ Hồ sơ (Domain 04, 06, 11, 12, 55, 71).  
  10.   
  11. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  12.   
  13. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  14.   
  15. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  16.   
  17. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  18.   
  19. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  20.   
  21. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  22.   
  23. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  24.   
  25. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  26.   
  27. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  28.   
  29. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  30.   
  31. SOP-INV-001: Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục, Xuất kho Lớp học & Kiểm kê Kho Định kỳ (Domain 32, 38, 41, 55, 69).  
  32.   
  33. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  34.   
  35. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  36.   
  37. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  38.   
  39. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  40.   
  41. SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Service Request & CSAT/NPS (Domain 62, 63, 64, 65, 66, 68, 70).  
  42.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **04 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-INV-001: Inventory & Stock│ • SOP-SEC-001: RBAC & Security│  
│ • SOP-ADM-007: Transfer & Sync │                                │ • SOP-FAC-001: Facility & PCCC │ • SOP-GOV-001: Multi-Campus │  
│ • SOP-CS-001: Complaints & CSAT│                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 24

# **SOP-HR-002 — QUY TRÌNH QUẢN LÝ ĐÀO TẠO NHÂN SỰ MẦM NON (TRAINING MANAGEMENT), ĐÁNH GIÁ HIỆU SUẤT KPI / OKR VÀ KHEN THƯỞNG / KỶ LUẬT**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-HR-002  
*   
* **Tên SOP:** Quy trình Quản lý Đào tạo Nhân sự Mầm non (Training Management), Đánh giá Hiệu suất KPI / OKR và Quy trình Khen thưởng / Kỷ luật  
*   
* **Module ERP:** Performance Management (53), Training Management (54), Human Resources (45), Employee Onboarding (47), Teacher Qualification Management (48), Compliance Management (67), System Configuration (75)  
*   
* **Process Owner:** Trưởng phòng Nhân sự Tập đoàn (Group HR Manager) / Giám đốc Chuyên môn (Academic Director)  
*   
* **Department:** Phòng Nhân sự & Đào tạo, Ban BGH các Cơ sở, Khối Chuyên môn Mầm non, Hội đồng Khen thưởng & Kỷ luật Tập đoàn  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Điều hành (CEO) / Giám đốc Tài chính (CFO)  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ công tác phát triển nguồn nhân lực mầm non: từ việc lập kế hoạch và tổ chức đào tạo định kỳ/bắt buộc (Lý lịch tư pháp, An toàn PCCC, Sơ cấp cứu y tế, Nghiệp vụ sư phạm, Quy trình Safeguarding), đo lường kết quả đào tạo qua bài kiểm tra điện tử (E-Testing), thiết lập khung đánh giá hiệu suất công việc (KPI/OKR Matrix) tự động tích hợp dữ liệu vận hành thực tế (Điểm CSAT Phụ huynh từ SOP-CS-001, Điểm CQI từ SOP-QA-001, Tỷ lệ chuyên cần từ SOP-HR-001), đến quy trình xét duyệt Khen thưởng hàng tháng/năm và Xử lý Kỷ luật lao động minh bạch, tuân thủ Bộ luật Lao động Việt Nam.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thành viên và Văn phòng Điều hành Tập đoàn.  
*   
* **Phòng ban:** Toàn bộ Cán bộ Giáo viên Nhân viên (CBGVNV) ký hợp đồng lao động chính thức hoặc thử việc (Giáo viên chủ nhiệm, Giáo viên bộ môn, Trợ giảng, Y tế, Bếp ăn, Xe bus, Facility, Tuyển sinh, Kế toán, Bảo vệ).  
*   
* **Đối tượng:** Khóa đào tạo nội bộ/bên ngoài, Bài đánh giá KPI/OKR định kỳ (Tháng/Quý/Năm), Quyết định Khen thưởng (Thưởng hiệu suất, Ngôi sao dịch vụ), Quyết định Kỷ luật lao động.  
*   
* **Trường hợp không áp dụng:** Đánh giá thử việc nhân sự mới trong 60 ngày đầu (áp dụng SOP-HR-001: Quản lý Hồ sơ Onboarding & Đánh giá Thử việc).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Mandatory Safeguarding Training (Đào tạo An toàn Trẻ em Bắt buộc):** Khóa đào tạo bắt buộc 100% nhân sự mầm non phải hoàn thành và đạt chứng chỉ nội bộ trước khi được phép làm việc trực tiếp với trẻ em.  
*   
* **Objective Key Results (OKR) & Key Performance Indicators (KPI):** Hệ thống chỉ số đo lường hiệu suất công việc kết hợp giữa Mục tiêu định hướng chiến lược (OKR Tập đoàn) và Chỉ số đo lường kết quả vận hành cụ thể (KPI Cơ sở).  
*   
* **Operational Data-Driven KPI:** Công thức tính điểm KPI trong đó 60% dữ liệu được tự động trích xuất từ các phân hệ ERP khác (Ví dụ: CSAT Phụ huynh, Tỷ lệ nộp giáo án đúng hạn, Điểm kiểm tra bếp ăn, Số lượt vi phạm PCCC).  
*   
* **Disciplinary Council (Hội đồng Kỷ luật):** Hội đồng gồm Đại diện Ban Điều hành, Trưởng phòng HR, Chủ tịch Công đoàn và Trưởng bộ phận liên quan họp xét duyệt các vi phạm kỷ luật lao động Mức độ Nặng/Nghiêm trọng.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Lập Khung Chương trình Đào tạo & Ngân sách Năm | Chuyên viên Training | Group HR Manager | Academic Dir / CFO | Hiệu trưởng các Cơ sở |
| Tổ chức Khóa Học, Điểm danh & Chấm Bài E-Testing | Chuyên viên Training | Group HR Manager | BGH / Chuyên gia | Toàn thể CBGVNV |
| Cấu hình Bảng Tiêu chí KPI/OKR & Trích xuất Dữ liệu ERP | HR C\&B / IT Admin | Group HR Manager | Academic Dir / COO | Toàn thể CBGVNV |
| Đánh giá Hiệu suất KPI Tháng/Quý & Phê duyệt Điểm | Hiệu trưởng / Head | Group HR Manager | Chuyên viên C\&B | Nhân viên được đánh giá |
| Xét duyệt Quyết định Khen thưởng & Tính Thưởng Lương | HR C\&B / Kế toán | CFO / CEO | BGH các Cơ sở | Toàn thể CBGVNV |
| Tổ chức Họp Hội đồng Kỷ luật & Ban hành Quyết định | HR Manager & Legal | CEO | Chủ tịch Công đoàn | Nhân viên vi phạm |

*Ghi chú: Việc tổ chức đào tạo bồi dưỡng chuyên môn cho giáo viên mầm non, quy trình đánh giá xếp loại chuẩn nghề nghiệp giáo viên, thủ tục họp Hội đồng kỷ luật lao động và sa thải nhân sự cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo và Bộ luật Lao động Việt Nam trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Khóa đào tạo (CourseMaster), Danh mục Chỉ số KPI (KPICatalogMaster), Ma trận Thưởng/Phạt (RewardPolicyMaster), Sơ đồ Chức danh Nhân sự (SOP-HR-001).  
*   
* **Dữ liệu Tích hợp ERP:**  
* 

  1. Điểm CSAT Phụ huynh từ SOP-CS-001.  
  2.   
  3. Điểm CQI Audit Vận hành từ SOP-QA-001.  
  4.   
  5. Tỷ lệ Nộp Giáo án Đúng hạn từ SOP-ACA-001.  
  6.   
  7. Nhật ký Chấm công & Điểm danh từ SOP-HR-001.  
  8.   
* **Approval Prerequisite:** Ngân sách Đào tạo và Quỹ Khen thưởng Năm đã được CFO/CEO phê duyệt.  
* 

## **7\. Trigger**

* **Định kỳ Đào tạo (Hàng tháng/Quý):** Khởi tạo khóa học theo Kế hoạch Đào tạo Năm hoặc khi có Nhân sự Mới Onboarding.  
*   
* **Định kỳ Đánh giá KPI (Ngày 21–25 Hàng tháng):** ERP tự động khóa sổ dữ liệu vận hành và khởi tạo Bảng đánh giá KPI tháng cho toàn bộ nhân sự.  
*   
* **Sự cố Vi phạm Kỷ luật (Ad-hoc Event):** Khởi tạo khi có Biên bản Vi phạm Kỷ luật / Sự cố Cờ đỏ từ SOP-QA-001 hoặc SOP-MED-001.  
* 

## **8\. Quy trình AS-IS**

* Phòng HR theo dõi lịch đào tạo bằng file Excel. Giáo viên đi học điểm danh trên giấy, bài thu hoạch chấm tay hoặc viết cảm nhận gửi email.  
*   
* Cuối tháng, Hiệu trưởng cơ sở ngồi tự cho điểm KPI cho từng giáo viên bằng file Excel theo cảm nhận cá nhân, không có số liệu chứng minh.  
*   
* Giáo viên bị trừ điểm KPI hay được thưởng không biết rõ lý do, dẫn đến tâm lý khiếu nại, so sánh mất đoàn kết nội bộ.  
*   
* Khi nhân viên vi phạm kỷ luật (như đi muộn nhiều lần, cãi phụ huynh), Hiệu trưởng tự phạt tiền hoặc đuổi việc bằng miệng mà không lập hội đồng kỷ luật theo đúng Luật Lao động.  
*   
* **Hệ quả:** Đào tạo mang tính hình thức, không đo lường được hiệu quả sau học; đánh giá KPI cảm tính, thiếu minh bạch; rủi ro tranh chấp lao động và bị kiện tụng tại Tòa án do sa thải nhân sự trái pháp luật.  
* 

## **9\. Pain Points / Risk**

* **Subjective Performance Evaluation:** Đánh giá KPI phụ thuộc hoàn toàn vào cảm quan yêu/ghét của Hiệu trưởng, làm giảm động lực làm việc của nhân sự giỏi.  
*   
* **Uncertified Personnel in Class (Mối nguy Pháp lý & An toàn):** Giáo viên chưa hoàn thành Khóa đào tạo An toàn Trẻ em (Safeguarding) hoặc Sơ cấp cứu y tế vẫn được xếp lịch đứng lớp.  
*   
* **Labor Law Violation Risk (Rủi ro Vi phạm Luật Lao động):** Xử lý kỷ luật không đúng trình tự (thiếu biên bản vi phạm, thiếu thành phần họp, không có công đoàn) dẫn đến bị bồi thường nợ lương và phạt vi phạm hành chính.  
*   
* **Training Return on Investment (ROI) Unmeasured:** Không theo dõi được mối tương quan giữa số giờ đào tạo với mức độ cải thiện điểm CSAT/CQI của cơ sở.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Quản lý & Tổ chức Đào tạo Nhân sự Mầm non (Training Management)**

* **Step 01:**  
* 

  * **Actor:** Chuyên viên Training & ERP System.  
  *   
  * **Action:** Mở Phân hệ Training Management, tạo Khóa đào tạo mới (Create Course), chọn Loại khóa (Safeguarding Bắt buộc / Nghiệp vụ Sư phạm / An toàn PCCC / Khai trương Cơ sở Mới), đính kèm Tài liệu E-Learning (Video/Slide/PDF), tạo Ngân hàng Câu hỏi Kiểm tra E-Testing và gán Danh sách Nhân sự bắt buộc tham gia.  
  *   
  * **ERP Function:** Course Creation & E-Learning Content Management.  
  *   
  * **Input:** Tên khóa học, Nội dung E-Learning, Ngân hàng câu hỏi, Danh sách Nhân sự Target.  
  *   
  * **Output:** Khóa học được phát hành (Published Course).  
  *   
  * **Business Rule:** BR-HR-010: Khóa đào tạo Safeguarding An toàn Trẻ em là **KHÓA HỌC BẮT BUỘC (MANDATORY)**. Nhân sự chưa đạt bài test (Pass \>= 80/100) sẽ bị ERP **KHÓA CỨNG**, không cho phép gán lịch giảng dạy trên SOP-ACA-001.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Course Published / Enrolled.  
  *   
  * **SLA:** Complete trước ngày khai giảng khóa 3 ngày.  
  *   
  * **Notification:** Mobile App Push thông báo lịch học tới App Nhân viên.  
  *   
* **Step 02:**  
* 

  * **Actor:** Cán bộ Giáo viên Nhân viên (Học viên) & ERP System.  
  *   
  * **Action:** Nhân viên mở Mobile App, xem video bài giảng E-Learning, tham gia điểm danh lớp học trực tiếp qua quét QR Code tại phòng học, thực hiện Bài kiểm tra E-Testing trên App. ERP tự động chấm điểm và cấp Chứng chỉ Nội bộ (Digital Certificate) nếu điểm đạt \>= 80%.  
  *   
  * **ERP Function:** Mobile E-Testing, QR Check-in & Auto Certification Engine.  
  *   
  * **Input:** Mã QR Điểm danh, Đáp án bài test E-Testing.  
  *   
  * **Output:** Điểm số E-Testing \+ Chứng chỉ Nội bộ đính kèm Hồ sơ Nhân sự (SOP-HR-001).  
  *   
  * **Business Rule:** Bài test không đạt cho phép làm lại tối đa 2 lần. Quá 3 lần không đạt, ERP tự động gửi Alert cho HR Manager yêu cầu xếp lịch học lại trực tiếp.  
  *   
  * **Status Before:** Enrolled.  
  *   
  * **Status After:** Completed & Certified (hoặc Failed).  
  *   
  * **SLA:** Làm bài test trong 48 giờ sau khóa học.  
  *   
  * **Notification:** Tự động đồng bộ Chứng chỉ vào Hồ sơ Bằng cấp Nhân sự (SOP-HR-001).  
  * 

### **Giai đoạn 2: Tự động Tích hợp Dữ liệu & Đánh giá Hiệu suất KPI / OKR (Data-Driven Performance Review)**

* **Step 03:**  
* 

  * **Actor:** ERP System (Data-Driven KPI Aggregator Engine).  
  *   
  * **Action:** Đúng **23:59 PM ngày 20 hàng tháng**, ERP tự động quét và trích xuất 60% dữ liệu KPI vận hành thực tế của từng nhân sự từ các phân hệ khác:  
  * 

    * *Chỉ số 1 (CSAT):* Điểm hài lòng Phụ huynh trung bình từ SOP-CS-001.  
    *   
    * *Chỉ số 2 (CQI):* Điểm tuân thủ quy trình vận hành/an toàn từ SOP-QA-001.  
    *   
    * *Chỉ số 3 (Lesson Plan):* Tỷ lệ nộp giáo án đúng hạn từ SOP-ACA-001.  
    *   
    * *Chỉ số 4 (Timecard):* Số lần đi muộn/về sớm và số ngày công từ SOP-HR-001.  
    *   
    * *Chỉ số 5 (Training):* Số giờ đào tạo hoàn tất và điểm E-Testing trong tháng.  
    *   
  * **ERP Function:** Automated KPI Operational Metric Pulling Engine.  
  *   
  * **Input:** System Logs từ các Phân hệ CS, QA, ACA, HR, Training.  
  *   
  * **Output:** Bảng KPI Tự động điền 60% số liệu (Auto-Populated KPI Sheet).  
  *   
  * **Business Rule:** BR-HR-011: Dữ liệu trích xuất tự động từ hệ thống là **DỮ LIỆU BẤT BIẾN (READ-ONLY)**, Hiệu trưởng hay Quản lý không có quyền tự ý sửa đổi số liệu hệ thống này.  
  *   
  * **Status Before:** Open Period.  
  *   
  * **Status After:** System Metrics Pulled.  
  *   
  * **SLA:** Real-time tại mốc 23:59 PM ngày 20\.  
  *   
  * **Notification:** Alert gửi Hiệu trưởng Cơ sở / Quản lý đánh giá 40% điểm định tính còn lại.  
  *   
* **Step 04:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở / Head of Department.  
  *   
  * **Action:** Mở Bảng KPI của Nhân viên trên App/Web, đánh giá 40% điểm định tính còn lại (Thái độ hợp tác, Sáng tạo, Đóng góp xây dựng môi trường), nhập nhận xét phản hồi và bấm "Gửi Đánh giá KPI".  
  *   
  * **ERP Function:** Performance Review & Score Finalization.  
  *   
  * **Input:** Điểm định tính 40% \+ Nhận xét của Quản lý.  
  *   
  * **Output:** Điểm KPI Tháng Chính thức (Final KPI Score) \-\> Xếp loại (A \- Xuất sắc, B \- Tốt, C \- Đạt, D \- Cần Cải thiện, F \- Không đạt).  
  *   
  * **Business Rule:** BR-HR-012: Nhân sự bị dính Biên bản Vi phạm Cờ đỏ (Red-Flag Incident từ SOP-QA-001 hoặc SOP-MED-001) trong tháng tự động bị hạ 1 bậc xếp loại KPI và không được xếp loại A.  
  *   
  * **Status Before:** System Metrics Pulled.  
  *   
  * **Status After:** KPI Finalized & Published.  
  *   
  * **SLA:** Complete trước ngày 23 hàng tháng.  
  *   
  * **Notification:** Phiếu Đánh giá KPI gửi tới App Nhân viên. Nhân viên có 24 giờ để bấm "Xác nhận" hoặc "Gửi Khiếu nại KPI".  
  * 

### **Giai đoạn 3: Quy trình Xét duyệt Khen thưởng (Reward Allocation Workflow)**

* **Step 05:**  
* 

  * **Actor:** ERP System (Reward Rules Engine) & HR C\&B.  
  *   
  * **Action:** Sau khi chốt KPI tháng, ERP tự động lập Danh sách Nhân sự Đạt điều kiện Khen thưởng (Nhân viên đạt Xếp loại A 3 tháng liên tục, Nhân viên nhận được điểm CSAT 5 Sao kèm lời khen xuất sắc từ Phụ huynh). HR C\&B lập Tờ trình Thưởng Hiệu suất gửi CFO duyệt.  
  *   
  * **ERP Function:** Auto Reward Candidate Qualification & Payroll Sync.  
  *   
  * **Input:** Bảng xếp loại KPI, Dữ liệu CSAT Phụ huynh, Ma trận Thưởng RewardPolicyMaster.  
  *   
  * **Output:** Tờ trình Thưởng được phê duyệt (Approved Reward Voucher).  
  *   
  * **Business Rule:** Số tiền thưởng tự động đồng bộ thẳng vào Bảng lương Tháng (SOP-HR-001) và vinh danh trên Trang tin Bảng tin Nội bộ (Internal Communication \- Module 61).  
  *   
  * **Status Before:** KPI Finalized.  
  *   
  * **Status After:** Reward Approved & Payroll Synced.  
  *   
  * **SLA:** Hoàn tất trước ngày 25 hàng tháng.  
  *   
  * **Notification:** Notification vinh danh gửi toàn hệ thống và Push App gửi Cá nhân được thưởng.  
  * 

### **Giai đoạn 4: Quy trình Xử lý Kỷ luật Lao động chuẩn Pháp lý (Disciplinary Action Workflow)**

* **Step 06:**  
* 

  * **Actor:** HR Officer, BGH Cơ sở & Legal Officer.  
  *   
  * **Action:** Khi phát sinh hành vi vi phạm Kỷ luật Lao động (Ghi nhận từ Biên bản Vi phạm SOP-QA-001 hoặc Biên bản Sự cố SOP-MED-001), HR Officer tạo "Hồ sơ Xử lý Kỷ luật" (Disciplinary Case) trên ERP, chọn Hành vi vi phạm theo Nội quy Lao động. ERP tự động kiểm tra mức độ và xuất Thông báo Mời họp Hội đồng Kỷ luật (Digital Hearing Notice).  
  *   
  * **ERP Function:** Disciplinary Case Management & Legal Hearing Scheduling.  
  *   
  * **Input:** Biên bản vi phạm, Điều khoản Nội quy Lao động vi phạm, Danh sách Mời họp (Nhân viên vi phạm, HR, BGH, Đại diện Công đoàn).  
  *   
  * **Output:** Hồ sơ Kỷ luật \+ Giấy Mời họp Kỷ luật có Chữ ký Điện tử gửi Nhân viên trước 05 ngày làm việc.  
  *   
  * **Business Rule:** BR-HR-013: Trình tự xử lý kỷ luật bắt buộc phải tuân thủ nghiêm ngặt Bộ luật Lao động Việt Nam:  
  * 

    1. Bắt buộc có Biên bản Vi phạm Mẫu.  
    2.   
    3. Thông báo mời họp gửi trước ít nhất **05 ngày làm việc**.  
    4.   
    5. Bắt buộc có sự tham gia của Đại diện Ban Chấp hành Công đoàn Cơ sở.  
    6.   
    7. Cuộc họp phải lập Biên bản Họp Hội đồng Kỷ luật có đủ chữ ký các bên.  
    8. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
    9.   
  * **Status Before:** Incident Logged.  
  *   
  * **Status After:** Hearing Scheduled.  
  *   
  * **SLA:** Phát thông báo trước cuộc họp 05 ngày.  
  *   
  * **Notification:** Giấy mời họp gửi Email \+ App Push \+ Thư đảm bảo tới Nhân viên vi phạm.  
  *   
* **Step 07:**  
* 

  * **Actor:** Hội đồng Kỷ luật Tập đoàn & CEO.  
  *   
  * **Action:** Họp Hội đồng Kỷ luật. Kết luận cuộc họp được nhập lên ERP đính kèm File Biên bản Họp có chữ ký. CEO bấm phê duyệt "Quyết định Kỷ luật Lao động" (Khiển trách / Keo dài thời gian nâng lương / Sa thải).  
  *   
  * **ERP Function:** Disciplinary Decision Approval & Access Revocation.  
  *   
  * **Input:** Biên bản Họp Hội đồng Kỷ luật \+ Mức kỷ luật đề xuất.  
  *   
  * **Output:** Quyết định Kỷ luật Lao động Chính thức (Official Disciplinary Decision).  
  *   
  * **Business Rule:** Nếu Mức kỷ luật là Sa thải (Termination), ERP tự động kích hoạt Luồng Thu hồi Quyền truy cập Khẩn cấp (Instant Revocation Engine theo SOP-SEC-001) trong đúng 01 giây ngay khi Quyết định có hiệu lực.  
  *   
  * **Status Before:** Hearing Scheduled.  
  *   
  * **Status After:** Decision Approved & Executed.  
  *   
  * **SLA:** Ban hành quyết định trong 03 ngày sau cuộc họp.  
  *   
  * **Notification:** Quyết định gửi Cá nhân, BGH Cơ sở, HR C\&B và Lưu Hồ sơ Pháp lý Nhân sự.  
  * 

## **11\. Workflow**

\[LUỒNG 1: QUẢN LÝ ĐÀO TẠO (TRAINING)\]          \[LUỒNG 2: ĐÁNH GIÁ KPI & KHEN THƯỞNG / KỶ LUẬT\]  
                 │                                                │  
                 ▼                                                ▼  
\[Tạo Khóa Học E-Learning / Safeguarding Bắt Buộc\]   \[23:59 PM Ngày 20: ERP Auto-Pull 60% Dữ Liệu Vận Hành\]  
                 │                                   (CSAT CS-001, QA CQI-001, Lesson Plan ACA-001...)  
                 ▼                                                │  
\[Nhân Viên Học & Điểm Danh QR ──► Làm E-Testing\]                  ▼  
                 │                                  \[Hiệu Trưởng Đánh Giá 40% Điểm Định Tính Trên App\]  
                 ◇ Đạt điểm E-Testing \>= 80%?                     │  
                 ├─ NO  ──► \[Học & Test Lại (Max 3 lần)\]          ▼  
                 └─ YES ──┐                         \[Chốt Điểm KPI Tháng ──► Xếp Loại A / B / C / D / F\]  
                          │                                       │  
                          ▼                                       ├─────────────────────────────────────────┐  
             \[Auto Cấp Digital Certificate\]                       ▼ (Đạt Xếp Loại A / CSAT 5\* Xuất Sắc)   ▼ (Phát Sinh Vi Phạm Kỷ Luật)  
                          │                         \[ERP Auto Generate Candidate List Khen Thưởng\]   \[Tạo Disciplinary Case Trên ERP\]  
                          ▼                                       │                                         │  
             \[Đồng Bộ Hồ Sơ SOP-HR-001\]                           ▼                                         ▼  
                          │                         \[CFO Approve Thưởng ──► Auto Sync Bảng Lương\]    \[Gửi Giấy Mời Họp Kỷ Luật (Trước 5d)\]  
                          │                                       │                                         │  
                          │                                       │                                         ▼  
                          │                                       │                         \[Họp Hội Đồng Kỷ Luật (Có Công Đoàn)\]  
                          │                                       │                                         │  
                          │                                       │                                         ▼  
                          │                                       │                         \[CEO Approve Quyết Định Kỷ Luật / Sa Thải\]  
                          │                                       │                                         │  
                          └───────────────────────────────────────┼─────────────────────────────────────────┘  
                                                                  │  
                                                                  ▼  
                                                             \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-HR-010 (Mandatory Safeguarding Training Lock):** Khóa đào tạo An toàn Trẻ em (Child Safeguarding) là điều kiện kiên quyết. Nếu Nhân sự không đạt Chứng chỉ Khóa học này trong vòng 14 ngày kể từ khi Onboarding, ERP tự động khóa không cho phép phân công đứng lớp trên SOP-ACA-001.  
*   
* **BR-HR-011 (Operational Data-Driven KPI Rule):** Bắt buộc 60% điểm số KPI hàng tháng của Giáo viên và Nhân viên vận hành phải được tính toán tự động dựa trên dữ liệu thật từ hệ thống ERP (CSAT Phụ huynh, Điểm kiểm toán QA, Điểm chuyên cần, Tỷ lệ nộp giáo án). Người quản lý tuyệt đối không được sửa đổi số liệu tự động này.  
*   
* **BR-HR-012 (Red-Flag Demotion Rule):** Nhân sự bị ghi nhận 01 Biên bản Vi phạm Cờ đỏ (Red-Flag Violation) trong tháng (như để trẻ bị trầy xước không báo cáo, vi phạm an toàn thực phẩm, vi phạm PCCC) tự động bị hạ 1 mức xếp loại KPI và bị gạch tên khỏi toàn bộ danh sách Khen thưởng tháng/quý đó.  
*   
* **BR-HR-013 (Labor Law Disciplinary Compliance):** Trình tự xử lý kỷ luật lao động bắt buộc tuân thủ Bộ luật Lao động Việt Nam. Mọi Quyết định Sa thải không qua Họp Hội đồng Kỷ luật hoặc không có Biên bản họp hợp lệ sẽ bị ERP khóa chặn không cho thực thi để tránh rủi ro kiện tụng. *"Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức."*  
*   
* **BR-HR-014 (Training Hours Threshold):** Mỗi Giáo viên Mầm non bắt buộc phải hoàn thành tối thiểu **24 giờ đào tạo chuyên môn/năm**. ERP tự động phát cảnh báo cho HR Manager nếu Giáo viên chưa đạt 50% số giờ đào tạo vào giữa năm học.  
* 

## **13\. Exception Cases**

* **Nhân viên cố tình chống đối không tham dự Cuộc họp Hội đồng Kỷ luật:**  
* 

  * *Xử lý:* HR Officer đính kèm Bằng chứng đã gửi Giấy mời họp hợp lệ 03 lần liên tiếp (qua App, Email, Thư bảo đảm). Theo Luật Lao động, Hội đồng Kỷ luật vẫn tiến hành họp vắng mặt, lập Biên bản và CEO phê duyệt Quyết định Kỷ luật theo đúng quy định.  
  *   
* **Nhân viên khiếu nại Điểm KPI do hệ thống tính toán sai (Lỗi dữ liệu):**  
* 

  * *Xử lý:* Nhân viên bấm "Gửi Khiếu nại KPI" trên App trong vòng 24 giờ sau khi công bố điểm. HR C\&B phối hợp với IT đối soát Log hệ thống. Nếu có lỗi dữ liệu, HR C\&B lập Chứng từ Điều chỉnh KPI (KPI Adjustment Note) trình HR Manager duyệt để tính lại điểm.  
  *   
* **Cơ sở Mầm non Mới khai trương (Greenfield Campus) chưa có Dữ liệu CSAT/CQI cũ:**  
* 

  * *Xử lý:* ERP tự động chuyển Bảng KPI của cơ sở mới sang chế độ Greenfield Mode trong 03 tháng đầu: 100% điểm KPI được tính dựa trên Điểm Đào tạo, Điểm Chuyên cần và Tỷ lệ Hoàn tất Chuẩn bị Cơ sở Vật chất.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Kế hoạch & Ngân sách Đào tạo Năm | HR Manager | Academic Director | CFO / CEO |
| Phê duyệt Bảng Đánh giá KPI Hàng tháng | Hiệu trưởng / Head | Group HR Manager | N/A |
| Phê duyệt Tờ trình Thưởng Hiệu suất / Thưởng CSAT | HR C\&B (Trình) | Group HR Manager | CFO |
| Phê duyệt Quyết định Kỷ luật Lao động (Khiển trách/Nâng lương) | HR Manager | Legal Officer | Group COO |
| Phê duyệt Quyết định Kỷ luật Sa thải (Termination) | Hội đồng Kỷ luật | Legal Officer | Tổng Giám đốc (CEO) |

## **15\. Status Lifecycle**

* **Course Status:** Draft \-\> Published \-\> In Progress \-\> Completed \-\> Archived.  
*   
* **KPI Review Status:** Open Period \-\> System Metrics Pulled \-\> Manager Reviewed \-\> Finalized \-\> Published (hoặc Disputed).  
*   
* **Disciplinary Case Status:** Incident Logged \-\> Investigation \-\> Hearing Scheduled \-\> Council Deliberated \-\> Decision Approved \-\> Executed / Closed.  
* 

## **16\. Data Model**

* **Primary Entity:** EmployeeTrainingLog  
* 

  * TrainingLogID (PK, String, Unique)  
  *   
  * EmployeeID (FK, String), CourseID (FK, String)  
  *   
  * EnrollmentDate (Date), CompletionDate (Date)  
  *   
  * ETestingScore (Decimal), PassStatus (Boolean)  
  *   
  * CertificateCode (String, Unique), ExpiryDate (Date)  
  *   
* **Related Entities:**  
* 

  * EmployeeKPIPeriod: KPIPeriodID (PK), EmployeeID (FK), Period (String: e.g., "2026-09"), CSATScore (Decimal), CQIScore (Decimal), AttendanceScore (Decimal), QualitativeScore (Decimal), FinalScore (Decimal), RatingGrade (Enum: A, B, C, D, F), DisputedFlag (Boolean).  
  *   
  * RewardRecord: RewardID (PK), EmployeeID (FK), KPIPeriodID (FK), RewardType (Enum: Performance, CSAT\_Star, Innovation), RewardAmount (Decimal), ApprovalStatus (Enum), SyncedToPayroll (Boolean).  
  *   
  * DisciplinaryCase: CaseID (PK), EmployeeID (FK), IncidentID (FK, Nullable), ViolationCategory (Enum), HearingDate (Date), CouncilMinutesURL (String), DecisionType (Enum: Reprimand, WageDelay, Termination), ApprovedByCEO (Boolean), ExecutedStatus (Boolean).  
  * 

## **17\. Forms / Documents**

* FRM-HR-010: Kế hoạch Đào tạo & Bảng Điểm E-Testing Nhân sự Điện tử (Training & E-Testing Record).  
*   
* FRM-HR-011: Bảng Đánh giá Hiệu suất KPI / OKR Hàng tháng (Data-Driven KPI Review Sheet).  
*   
* FRM-HR-012: Tờ trình Khen thưởng Nhân sự & Vinh danh Ngôi sao Dịch vụ (Reward Proposal Form).  
*   
* FRM-HR-013: Biên bản Vi phạm Kỷ luật & Giấy Mời họp Hội đồng Kỷ luật (Disciplinary Notice).  
*   
* FRM-HR-014: Biên bản Họp Hội đồng Kỷ luật & Quyết định Kỷ luật Lao động (Disciplinary Council Minutes & Decision).  
* 

## **18\. ERP Functional Requirements**

* **FR-HR-010 (MUST):** Phân hệ Mobile E-Learning & E-Testing App: Cho phép nhân viên học trực tuyến, quét mã QR điểm danh lớp đào tạo và làm bài kiểm tra trắc nghiệm tự động chấm điểm.  
*   
* **FR-HR-011 (MUST):** Tích hợp Data-Driven KPI Pulling Engine: Tự động trích xuất 60% dữ liệu KPI vận hành từ các Phân hệ CS (SOP-CS-001), QA (SOP-QA-001), ACA (SOP-ACA-001) và Timecard (SOP-HR-001) vào ngày 20 hàng tháng.  
*   
* **FR-HR-012 (MUST):** Tự động khóa cứng (Read-Only) đối với các chỉ số KPI trích xuất từ hệ thống, không cho phép cấp Quản lý tự chỉnh sửa số liệu hệ thống.  
*   
* **FR-HR-013 (MUST):** Tự động đồng bộ số tiền Khen thưởng/Phạt hiệu suất hợp lệ sang Bảng lương Tháng (SOP-HR-001) trước ngày chốt lương.  
*   
* **FR-HR-014 (MUST):** Phân hệ Disciplinary Legal Compliance Workflow: Đảm bảo quy trình xử lý kỷ luật tuân thủ đầy đủ các bước pháp lý (Mời họp trước 5 ngày, Biên bản họp có Công đoàn, Quyết định sa thải do CEO duyệt) và tự động kích hoạt khóa tài khoản tức thì khi sa thải (SOP-SEC-001).  
* 

## **19\. Automation Opportunities**

* **AUTO-HR-010 (INTEGRATION):** Tự động cấp Chứng chỉ Nội bộ (Digital Certificate) và đồng bộ vào Hồ sơ Bằng cấp Nhân sự (SOP-HR-001) ngay khi nhân viên hoàn tất bài test E-Testing \>= 80%.  
*   
* **AUTO-HR-011 (RULE ENGINE):** Tự động khóa tính năng xếp lịch giảng dạy đối với giáo viên chưa đạt chứng chỉ Safeguarding bắt buộc trong 14 ngày kể từ khi Onboarding.  
*   
* **AUTO-HR-012 (DATA PULL):** Tự động quét và điền 60% số liệu KPI vận hành vào lúc 23:59 PM ngày 20 hàng tháng.  
*   
* **AUTO-HR-013 (SECURITY LINK):** Tự động kích hoạt Luồng Thu hồi Quyền truy cập Khẩn cấp (Instant Revocation Engine) trên SOP-SEC-001 trong 01 giây ngay khi CEO bấm phê duyệt Quyết định Sa thải.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Lịch Học / Làm Bài Test E-Learning | CBGVNV | Mobile App Push | 1 ngày trước hạn test |
| Cảnh báo Chưa Đạt Chứng chỉ Safeguarding Bắt buộc | HR Manager & BGH | ERP High Alert \+ Email | 7 ngày sau Onboarding |
| Thông báo Bảng Đánh giá KPI Tháng Sẵn sàng | Hiệu trưởng / Manager | Mobile App Push \+ ERP Pop-up | 23:59 PM ngày 20 |
| Gửi Kết quả KPI & Phiếu Vinh danh Khen thưởng | CBGVNV được thưởng | Mobile App Push \+ Email | Immediate khi KPI finalized |
| Gửi Giấy Mời họp Hội đồng Kỷ luật | Nhân viên vi phạm & BGH | App Push \+ Email \+ Letter | 5 ngày trước cuộc họp |

## **21\. Permission Matrix (RBAC)**

| Role | View Training | Take E-Testing | Edit KPI Matrix | Rate Qualitative KPI | Approve Reward | Manage Disciplinary |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| CBGVNV | Assigned | Own Only | No | No | No | No |
| Hiệu trưởng Cơ sở | Campus Full | Full | View Only | Campus Scope | Recommend | Initiate Case |
| HR Training Specialist | Full Enterprise | View Only | No | No | No | No |
| HR C\&B / HR Manager | Full Enterprise | Read Only | Full Enterprise | Read Only | Full Review | Full Process |
| Legal Officer | Read Only | No | No | No | Read Only | Legal Review |
| CEO / CFO | Full Enterprise | Read Only | Full Enterprise | Read Only | Full Approval | Full Approval |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Nhật ký E-Testing: Timestamp bắt đầu/kết thúc làm bài, Địa chỉ IP, Điểm số từng câu hỏi, Lịch sử cấp Chứng chỉ Nội bộ.  
*   
* Bảng Dữ liệu KPI Gốc do hệ thống trích xuất từ các Phân hệ CS, QA, ACA, HR (Dữ liệu Read-Only).  
*   
* Lịch sử đánh giá 40% điểm định tính của Quản lý: Người chấm, Điểm chấm, Nhận xét, Timestamp.  
*   
* Lịch sử Khiếu nại KPI của Nhân viên và kết quả điều chỉnh của HR C\&B.  
*   
* Toàn bộ Hồ sơ Kỷ luật: Biên bản vi phạm, Giấy mời họp (Timestamp gửi), Biên bản Họp Hội đồng Kỷ luật, Quyết định do CEO phê duyệt.  
* 

## **23\. Internal Controls**

* **Immutable Operational KPI Data:** Khóa cứng số liệu KPI tự động trích xuất từ phần mềm, triệt tiêu nguy cơ Quản lý cơ sở nâng/hạ điểm cảm tính cho nhân viên.  
*   
* **Safeguarding Compliance Gate:** Tự động chặn phân công giảng dạy đối với bất kỳ giáo viên nào chưa đạt chứng chỉ Safeguarding bắt buộc.  
*   
* **Legal Disciplinary Verification:** Bắt buộc phải tải lên Biên bản Họp Hội đồng Kỷ luật có đủ chữ ký Đại diện Công đoàn mới cho phép phê duyệt Quyết định Sa thải.  
*   
* **Reward Budget Limit:** Tự động kiểm tra Tổng Quỹ Khen thưởng tháng không vượt quá Hạn mức Ngân sách Khen thưởng (Reward Budget Ceiling) được CFO duyệt.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **Tỷ lệ Hoàn thành Đào tạo Safeguarding** | (Số nhân sự đạt chứng chỉ Safeguarding / Tổng nhân sự) \* 100 | **100% (Zero Error)** | HR Training & BGH |
| **SLA Chốt Đánh giá KPI Hàng tháng** | Thời gian hoàn tất đánh giá và công bố điểm KPI tháng | **Trước ngày 23 hàng tháng** | HR C\&B & BGH |
| **Tỷ lệ KPI Tự động hóa Dữ liệu (Automation Rate)** | (Số chỉ số KPI tự động trích xuất / Tổng chỉ số) \* 100 | **\>= 60%** | HR C\&B & IT |
| **Tỷ lệ Tuân thủ Trình tự Kỷ luật Lao động** | Số vụ kỷ luật thực hiện đúng 100% trình tự Luật Lao động | **100% (Zero Lawsuit)** | HR Manager & Legal |
| **Số Giờ Đào tạo Trung bình / Giáo viên / Năm** | Tổng số giờ đào tạo hoàn tất / Tổng số giáo viên | **\>= 24 Giờ / Năm** | HR Training Specialist |

## **25\. Dashboard / Report**

* **Training & Capability Dashboard (Trưởng phòng Đào tạo & BGH):** Báo cáo tỷ lệ hoàn thành các khóa học bắt buộc, Bảng theo dõi số giờ đào tạo trung bình/nhân viên, Kết quả E-Testing theo cơ sở.  
*   
* **Performance & KPI Analytics Dashboard (HR Manager & COO):** Bảng xếp hạng hiệu suất KPI của các cơ sở, Tỷ lệ nhân sự đạt Xếp loại A/B/C/D/F, Báo cáo tương quan giữa Số giờ đào tạo và Điểm KPI/CSAT.  
*   
* **Executive HR Risk & Compliance Dashboard (CEO, CFO & Legal):** Báo cáo tình hình vi phạm kỷ luật toàn chuỗi, Báo cáo quỹ thưởng hiệu suất thực tế vs Ngân sách, Cảnh báo rủi ro pháp lý tranh chấp lao động.  
* 

## **26\. Integration**

* **Core HR & Onboarding (SOP-HR-001):** Nhận dữ liệu nhân sự mới để gán khóa đào tạo bắt buộc và tự động đồng bộ kết quả Khen thưởng/Phạt vào Bảng lương.  
*   
* **Parent CSAT & Complaints (SOP-CS-001):** Trích xuất điểm CSAT Phụ huynh tự động làm chỉ số KPI.  
*   
* **Quality Assurance & Audits (SOP-QA-001):** Trích xuất điểm CQI Audit Vận hành và các Biên bản Vi phạm Cờ đỏ làm chỉ số KPI.  
*   
* **Academic & Lesson Planning (SOP-ACA-001):** Trích xuất tỷ lệ nộp giáo án đúng hạn làm chỉ số KPI và khóa xếp lịch dạy nếu chưa có Chứng chỉ Safeguarding.  
*   
* **Security & User Access (SOP-SEC-001):** Kích hoạt thu hồi quyền truy cập hệ thống tức thì khi có Quyết định Sa thải.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Trẻ gặp sự cố do Giáo viên chưa qua đào tạo Safeguarding** | Critical | Low | ERP Auto Lock chặn xếp lịch dạy nếu chưa có Digital Certificate Safeguarding. | HR Training & Academic Mgr |
| **Bị Nhân viên khởi kiện do Sa thải trái Pháp luật** | Critical | Low | Bắt buộc tuân thủ 100% trình tự họp Hội đồng Kỷ luật có Công đoàn (BR-HR-013). | Legal Officer & HR Mgr |
| **Đánh giá KPI cảm tính gây mất đoàn kết nội bộ** | High | Medium | Cố định 60% dữ liệu KPI trích xuất tự động từ hệ thống (Read-Only). | HR C\&B |
| **Thất thoát Quỹ Khen thưởng do tính toán sai** | Medium | Low | ERP Auto Reward Rules Engine tính thưởng theo công thức và kiểm soát Ceiling. | Kế toán trưởng & CFO |

## **28\. Acceptance Criteria**

* **Given:** Nhân sự mới A vừa hoàn tất Onboarding trên SOP-HR-001.  
*   
* **When:** Trưởng phòng Chuyên môn xếp Lịch giảng dạy cho Nhân sự A trên SOP-ACA-001.  
*   
* **Then:** ERP kiểm tra Hồ sơ Đào tạo của Nhân sự A: Vì Nhân sự A CHƯA ĐẠT Chứng chỉ Khóa học Child Safeguarding, ERP khóa không cho lưu lịch, hiển thị thông báo lỗi *"Nhân sự chưa có Chứng chỉ An toàn Trẻ em Bắt buộc. Không thể phân công giảng dạy"*.  
*   
* **Given:** Đúng mốc 23:59 PM ngày 20 hàng tháng.  
*   
* **When:** Tiến trình Automated KPI Operational Metric Pulling Engine chạy tự động.  
*   
* **Then:** ERP tự động quét hệ thống, trích xuất chính xác Điểm CSAT 4.8/5.0 từ SOP-CS-001, Điểm CQI 92/100 từ SOP-QA-001, Tỷ lệ nộp giáo án 100% từ SOP-ACA-001 và Số ngày công 22 ngày từ SOP-HR-001 điền vào Bảng KPI Tháng của Giáo viên B dưới dạng dữ liệu Khóa (Read-Only).  
* 

## **29\. Test Scenarios**

1. **Happy Path Training & Certification Test:** Tạo Khóa học \-\> Nhân viên học & quét QR \-\> Làm E-Testing đạt 85% \-\> ERP Auto-Generate Digital Certificate \-\> Đồng bộ Hồ sơ SOP-HR-001 \-\> Mở khóa Xếp lịch dạy SOP-ACA-001.  
2.   
3. **Safeguarding Training Lock Test:** Cố tình không cho nhân viên làm bài test Safeguarding \-\> Vào SOP-ACA-001 xếp lịch dạy cho nhân viên này \-\> Kiểm tra xem ERP có chặn cứng và bật cờ lỗi không.  
4.   
5. **Data-Driven KPI Pulling Test:** Đặt đồng hồ hệ thống 23:59 PM ngày 20 \-\> Kiểm tra xem 60% dữ liệu từ CS-001, QA-001, ACA-001, HR-001 có tự động điền vào Bảng KPI và có bị khóa Read-Only không.  
6.   
7. **Red-Flag Demotion Test:** Giả lập Nhân viên C bị 01 Biên bản Vi phạm Cờ đỏ PCCC trong tháng \-\> Chốt điểm KPI \-\> Kiểm tra xem ERP có tự động hạ 1 bậc xếp loại KPI và loại khỏi danh sách Thưởng tháng không.  
8.   
9. **Legal Disciplinary Termination & Auto Revoke Test:** Khởi tạo Hồ sơ Kỷ luật \-\> Lập Giấy mời họp trước 5 ngày \-\> Tải Biên bản họp có Công đoàn \-\> CEO Approve Sa thải \-\> Kiểm tra xem trong 01 giây tài khoản ERP và Thẻ từ Cổng của nhân viên có bị Vô hiệu hóa Tức thì (SOP-SEC-001) không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình ma trận Khóa học Bắt buộc (Safeguarding Lock); Cấu hình công thức tính 60% Dữ liệu KPI Tự động; Cấu hình Ma trận Thưởng/Phạt và Xếp loại A/B/C/D/F; Cấu hình mẫu Giấy mời họp Kỷ luật và Biên bản họp chuẩn Luật Lao động.  
*   
* **Master Data Migration:** Import danh mục Ngân hàng câu hỏi E-Testing; Import lịch sử bằng cấp/chứng chỉ đào tạo hiện hữu của toàn bộ CBGVNV.  
*   
* **Hardware & Integration:** Tích hợp tính năng Quét mã QR Code trên App Mobile Nhân viên; Tích hợp Phân hệ Bảng lương (SOP-HR-001), Chuyên môn (SOP-ACA-001) và An ninh (SOP-SEC-001).  
*   
* **Training & Change Management:** Đào tạo Toàn thể Nhân viên kỹ năng học E-Learning và làm bài E-Testing trên App; Đào tạo Ban Giám hiệu kỹ năng đánh giá 40% điểm định tính KPI và quy trình xử lý kỷ luật lao động chuẩn pháp lý; Đào tạo Đội ngũ HR C\&B quy trình vận hành Bảng KPI tự động hóa dữ liệu.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (22 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-ADM-007: Quản lý Học sinh Chuyển Lớp, Chuyển Cơ sở (Inter-Campus Transfer) & Đồng bộ Hồ sơ (Domain 04, 06, 11, 12, 55, 71).  
  10.   
  11. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  12.   
  13. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  14.   
  15. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  16.   
  17. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  18.   
  19. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  20.   
  21. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  22.   
  23. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  24.   
  25. SOP-HR-002: Đào tạo Nhân sự (Training Management), Đánh giá KPI/OKR & Khen thưởng / Kỷ luật (Domain 45, 47, 48, 53, 54, 67, 75).  
  26.   
  27. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  28.   
  29. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  30.   
  31. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  32.   
  33. SOP-INV-001: Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục, Xuất kho Lớp học & Kiểm kê Kho Định kỳ (Domain 32, 38, 41, 55, 69).  
  34.   
  35. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  36.   
  37. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  38.   
  39. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  40.   
  41. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  42.   
  43. SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Service Request & CSAT/NPS (Domain 62, 63, 64, 65, 66, 68, 70).  
  44.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **03 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-INV-001: Inventory & Stock│ • SOP-HR-002: Training & KPI│  
│ • SOP-ADM-007: Transfer & Sync │                                │ • SOP-FAC-001: Facility & PCCC │ • SOP-SEC-001: RBAC & Security│  
│ • SOP-CS-001: Complaints & CSAT│                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 25

# **SOP-FIN-003 — QUY TRÌNH LẬP KẾ HOẠCH NGÂN SÁCH VẬN HÀNH (OPERATIONAL BUDGETING), KIỂM SOÁT CHI TIÊU VÀ DỰ BÁO DÒNG TIỀN (CASH FLOW FORECASTING)**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-FIN-003  
*   
* **Tên SOP:** Quy trình Lập Kế hoạch Ngân sách Vận hành (Operational Budgeting), Kiểm soát Chi tiêu và Dự báo Dòng tiền (Cash Flow Forecasting)  
*   
* **Module ERP:** Budget Management (57), Expense Management (58), Management Dashboard & BI (70), Multi-campus Management (71), Finance & Accounting Integration (55), Cash / Bank (56)  
*   
* **Process Owner:** Giám đốc Tài chính (CFO) / Kế toán trưởng Tập đoàn  
*   
* **Department:** Phòng Tài chính \- Kế hoạch, Phòng Kế toán Tập đoàn, Ban Giám hiệu các Cơ sở  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Tổng Giám đốc (CEO) / Board of Directors  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ chu trình quản trị tài chính \- ngân sách dành cho hệ thống mầm non đa cơ sở: từ xây dựng mô hình ngân sách vận hành hàng năm (Annual Operating Budget \- OPEX/CAPEX) theo từng Trung tâm Chi phí (Cost Center/Campus), thiết lập cơ chế kiểm soát chi tiêu thời gian thực (Budget Encumbrance & Hard/Soft Stop), quản lý luồng điều chỉnh ngân sách (Budget Reallocation/Adjustment), đến việc trích xuất tự động dòng tiền thu (từ học phí SOP-FIN-001) và dòng tiền chi (từ mua sắm SOP-PUR-001, lương SOP-HR-001, chi phí vận hành SOP-FIN-002) để xây dựng Mô hình Dự báo Dòng tiền Trọng yếu (12-Week Rolling Cash Flow Forecast), bảo đảm thanh khoản tài chính vững chắc cho toàn bộ chuỗi trường.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thành viên và Văn phòng Điều hành Tập đoàn.  
*   
* **Phòng ban:** Toàn bộ các Phòng/Ban/Cơ sở có phân bổ hạn mức chi tiêu ngân sách.  
*   
* **Đối tượng:** Ngân sách Chi phí Vận hành (OPEX: Lương, Thuê nhà, Điện nước, Marketing, Vật tư, Sửa chữa), Ngân sách Đầu tư Tài sản (CAPEX: Mua sắm thiết bị, Cải tạo hạ tầng), Dự báo Dòng tiền Thu/Chi (Cash Inflow/Outflow).  
*   
* **Trường hợp không áp dụng:** Các quỹ từ thiện, tài trợ ngoài ngân sách doanh nghiệp (áp dụng SOP-FIN-009: Quản lý Quỹ Tài trợ & Hoạt động Xã hội).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **OPEX (Operating Expenditure):** Ngân sách chi phí vận hành thường xuyên phục vụ hoạt động hàng ngày của trường mầm non.  
*   
* **CAPEX (Capital Expenditure):** Ngân sách đầu tư tài sản cố định, trang thiết bị lớp học và cải tạo hạ tầng có giá trị lớn.  
*   
* **Cost Center (Trung tâm Chi phí):** Mã định danh đơn vị quản lý ngân sách (Ví dụ: Cơ sở A \- Khối Bếp, Cơ sở B \- Khối Chuyên môn, HQ \- Khối Marketing).  
*   
* **Encumbered Budget (Ngân sách Cam kết Chi):** Số tiền ngân sách đã được giữ giữ chỗ cho các Yêu cầu Mua hàng (PR) hoặc Đơn Mua hàng (PO) đã được duyệt nhưng chưa thực chi.  
*   
* **Available Budget (Ngân sách Khả dụng):** Số tiền ngân sách thực sự còn lại có thể sử dụng:  
* 

* $$\\text{Available Budget} \= \\text{Budget Allocated} \- \\text{Actual Spent} \- \\text{Encumbered Budget}$$  
* **Rolling Cash Flow Forecast (Dự báo Dòng tiền Cuộn 12 Tuần):** Mô hình dự báo dòng tiền vào/ra liên tục trong 12 tuần tiếp theo, cập nhật tự động theo biến động sĩ số và tiến độ thanh toán thực tế.  
*   
* **Budget Variance (Chênh lệch Ngân sách):** Khoảng sai lệch giữa Ngân sách Dự toán và Chi phí Thực tế Phát sinh.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Lập Khung Hướng dẫn & Giới hạn Ngân sách Năm | Kế toán Ngân sách | CFO / Kế toán trưởng | Group COO | Hiệu trưởng các Cơ sở |
| Xây dựng Dự toán Ngân sách Chi tiết từng Cơ sở | Hiệu trưởng & Admin | Hiệu trưởng Cơ sở | Kế toán Cơ sở | Phòng Tài chính HQ |
| Thẩm định & Tổng hợp Ngân sách Toàn Chuỗi | Kế toán Ngân sách | CFO | Kế toán trưởng | Board of Directors |
| Phê duyệt Ngân sách Năm (Annual Budget Approval) | CFO | CEO / Board | COO / HR / Mkt | Toàn thể Managers |
| Kiểm soát Chi tiêu Real-time (Hard/Soft Stop Gate) | ERP System | Kế toán trưởng | Kế toán Phí | Người yêu cầu chi |
| Dự báo Dòng tiền 12 Tuần & Báo cáo BI Variance | Kế toán Ngân sách | CFO | CEO | Board / Directors |

*Ghi chú: Việc lập kế hoạch tài chính, quản lý thuế, trích lập quỹ dự phòng và báo cáo tài chính hợp nhất tập đoàn cần kiểm tra/đối chiếu quy định hiện hành của Bộ Tài chính (Luật Kế toán, Luật Thuế TNDN, Thông tư 200/2014/TT-BTC) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Sơ đồ Trung tâm Chi phí (CostCenterMaster), Danh mục Mã Ngân sách (BudgetLineMaster), Chỉ tiêu Sĩ số & Học phí (SOP-ADM-003), Định biên Nhân sự (SOP-HR-001).  
*   
* **Giới hạn Tài chính:** Định hướng Tỷ lệ Chi phí trên Doanh thu (Cost-to-Revenue Ratio Targets) do Board/CEO ban hành cho năm tài chính mới.  
*   
* **Dữ liệu Lịch sử:** Số liệu chi tiêu thực tế và báo cáo chênh lệch ngân sách của 2 năm gần nhất trích xuất từ ERP.  
* 

## **7\. Trigger**

* **Định kỳ Hàng năm (Tháng 10 \- 11):** Khởi tạo Chu trình Lập Ngân sách Vận hành cho Năm Tài chính Mới (T+1).  
*   
* **Định kỳ Hàng tháng/Tuần:** Chạy mô hình Dự báo Dòng tiền Cuộn 12 Tuần (Rolling Cash Flow) vào ngày Thứ Hai hàng tuần.  
*   
* **Sự kiện Bất thường:** Phát sinh biến động sĩ số \> 15% hoặc mở mới cơ sở (Greenfield) yêu cầu điều chỉnh ngân sách giữa năm (Mid-Year Budget Revision).  
* 

## **8\. Quy trình AS-IS**

* Đầu năm, Hiệu trưởng các cơ sở lập file Excel ngân sách riêng, tự điền các dòng chi phí theo cảm tính rồi gửi email về HQ.  
*   
* Kế toán tổng hợp tại HQ phải mở từng file Excel, cắt dán thủ công để gộp thành file Ngân sách Tập đoàn.  
*   
* Trong năm, khi có yêu cầu chi tiêu, Kế toán cơ sở mở file Excel ngân sách ra dò bằng mắt để xem còn tiền không. Nhiều trường hợp quên cập nhật file Excel dẫn đến chi vượt ngân sách hàng trăm triệu đồng.  
*   
* Không có công cụ dự báo dòng tiền tự động; CFO phải tự tính tay dòng tiền thu từ học phí và dòng tiền chi trả nợ NCC trên Excel, dễ dẫn đến mất cân đối thanh khoản đột xuất.  
*   
* **Hệ quả:** Vỡ kế hoạch tài chính; chi tiêu tự do vượt hạn mức; lãng phí nguồn lực làm báo cáo tài chính thủ công; không có dữ liệu cảnh báo dòng tiền âm.  
* 

## **9\. Pain Points / Risk**

* **Budget Overrun & Blind Spending:** Chi tiêu vượt ngân sách tại các cơ sở do không có công cụ tự động khóa chặn (Hard Stop Gate) khi ngân sách khả dụng cạn kiệt.  
*   
* **Lack of Encumbrance Control:** Chỉ kiểm soát tiền đã chi (Actual Spent), không kiểm soát tiền cam kết chi (PO/PR đã duyệt), dẫn đến vỡ ngân sách khi các hóa đơn hàng loạt về cùng lúc.  
*   
* **Inaccurate Cash Flow Forecasting:** Dự báo dòng tiền không chính xác do không kết nối dữ liệu điểm danh thực tế, tỷ lệ học sinh rút học (SOP-ADM-005) và tiến độ thanh toán của Phụ huynh.  
*   
* **Unapproved Budget Slippage:** Cơ sở tự ý chuyển tiền từ Ngân sách Đào tạo/An toàn sang Chi phí Sự kiện/Tiếp khách mà không qua phê duyệt của CFO.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Xây dựng & Phê duyệt Ngân sách Vận hành Năm (Annual Budgeting)**

* **Step 01:**  
* 

  * **Actor:** Kế toán Ngân sách HQ & CFO.  
  *   
  * **Action:** Mở Phân hệ Budget Management, thiết lập Khung Hướng dẫn Ngân sách Năm mới (Target Ratios: % Chi phí Nhân sự/Doanh thu, % Chi phí Thuê nhà, % Chi phí Mua sắm Bếp/Lớp) và kích hoạt đợt Lập Ngân sách Năm (Initiate Annual Budget Cycle).  
  *   
  * **ERP Function:** Budget Cycle Initiation & Target Distribution Engine.  
  *   
  * **Input:** Chỉ tiêu Doanh thu, Tỷ lệ Chi phí Target, Năm Tài chính.  
  *   
  * **Output:** Khung Mẫu Ngân sách gửi các Cơ sở (Budget Input Templates).  
  *   
  * **Business Rule:** BR-FIN-030: Hệ thống tự động tính toán Ngân sách Nhân sự Trần (Salary Budget Ceiling) dựa trên Định biên Giáo viên/Lớp và Tỷ lệ Ratio quy định tại SOP-HR-001.  
  *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Budget Cycle Open.  
  *   
  * **SLA:** Kích hoạt trước năm tài chính mới 60 ngày.  
  *   
  * **Notification:** Alert gửi Hiệu trưởng và Admin các Cơ sở.  
  *   
* **Step 02:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở, Admin Cơ sở & Kế toán Cơ sở.  
  *   
  * **Action:** Mở App/Web ERP, nhập dự toán chi phí chi tiết theo từng Mã Ngân sách (OPEX: Điện nước, VTYT, Sửa chữa; CAPEX: Mua sắm thiết bị). ERP tự động đối soát dự toán với Chỉ tiêu Doanh thu dự kiến từ Sĩ số (SOP-ADM-003).  
  *   
  * **ERP Function:** Bottom-up Budget Input & Revenue-Linked Validation.  
  *   
  * **Input:** Số lượng, Đơn giá dự kiến, Mã Trung tâm Chi phí (Cost Center).  
  *   
  * **Output:** Dự thảo Ngân sách Cơ sở (Draft Campus Budget).  
  *   
  * **Business Rule:** ERP phát cảnh báo đỏ nếu Tổng chi phí dự toán của Cơ sở vượt quá **80% Doanh thu Dự kiến** của cơ sở đó.  
  *   
  * **Status Before:** Budget Cycle Open.  
  *   
  * **Status After:** Draft Budget Submitted.  
  *   
  * **SLA:** Max 15 ngày làm việc.  
  *   
  * **Notification:** Alert gửi Kế toán Ngân sách HQ thẩm định.  
  *   
* **Step 03:**  
* 

  * **Actor:** Kế toán Ngân sách HQ, CFO & CEO.  
  *   
  * **Action:** Kế toán Ngân sách thẩm định, chạy công cụ Phân tích Chênh lệch (Variance Analysis). CFO review, tổ chức bảo vệ ngân sách và trình CEO/Board bấm "Phê duyệt Ngân sách Năm". ERP tự động khóa sổ Ngân sách Năm (Lock Annual Budget baseline).  
  *   
  * **ERP Function:** Consolidated Budget Review & Baseline Locking.  
  *   
  * **Input:** Draft Campus Budgets.  
  *   
  * **Output:** Ngân sách Năm Phê duyệt Chính thức (Approved Annual Budget Baseline).  
  *   
  * **Business Rule:** BR-FIN-031: Ngân sách sau khi Approved sẽ trở thành Baseline cố định. Mọi điều chỉnh ngân sách giữa năm phải trải qua Quy trình Mid-Year Budget Revision.  
  *   
  * **Status Before:** Draft Budget Submitted.  
  *   
  * **Status After:** Budget Baseline Locked & Active.  
  *   
  * **SLA:** Hoàn thành trước ngày 15/12 hàng năm.  
  *   
  * **Notification:** Thông báo phân bổ ngân sách chính thức gửi toàn bộ Cơ sở.  
  * 

### **Giai đoạn 2: Kiểm soát Chi tiêu Real-time & Giữ tiền Ngân sách (Encumbrance & Real-time Control)**

* **Step 04:**  
* 

  * **Actor:** ERP System (Real-time Budget Enforcement Gate).  
  *   
  * **Action:** Khi có Yêu cầu Mua hàng PR (SOP-PUR-001), Yêu cầu Chi SOP-FIN-002 hoặc Tuyển dụng Mới SOP-HR-001, ERP tự động chạy Thuật toán Kiểm tra Ngân sách Khả dụng:  
  * 

  * $$\\text{Available Budget} \= \\text{Allocated Budget} \- \\text{Actual Spent} \- \\text{Encumbered Amount}$$  
  * **ERP Function:** Automated Encumbrance & Hard/Soft Stop Control.  
  *   
  * **Input:** Mã Cost Center, Mã Ngân sách, Số tiền đề xuất.  
  *   
  * **Output:** Kết quả Kiểm tra Ngân sách (Pass / Soft Warning / Hard Stop).  
  *   
  * **Business Rule:** BR-FIN-032:  
  * 

    * *Hard Stop Gate:* Nếu khoản chi vượt 100% Ngân sách Khả dụng, ERP **TỰ ĐỘNG KHÓA CHẶN (BLOCK)**, không cho phép Submit PR/Chi phí.  
    *   
    * *Soft Warning Gate:* Nếu khoản chi đạt mốc 85% \- 99% Ngân sách Khả dụng, ERP phát cảnh báo cờ vàng cho Người đề nghị và Hiệu trưởng.  
    *   
  * **Status Before:** Pending Budget Check.  
  *   
  * **Status After:** Budget Encumbered / Blocked.  
  *   
  * **SLA:** Real-time (\<= 1 giây).  
  *   
  * **Notification:** Alert hiển thị trên giao diện tạo yêu cầu.  
  *   
* **Step 05 (Điều chuyển Ngân sách \- Budget Reallocation):**  
* 

  * **Actor:** Hiệu trưởng Cơ sở & CFO.  
  *   
  * **Action:** Khi Cơ sở muốn chuyển tiền từ Mã Ngân sách A (đang dư) sang Mã Ngân sách B (đang thiếu), Hiệu trưởng tạo "Đề nghị Điều chuyển Ngân sách" (Budget Reallocation Request). CFO bấm Approve trên ERP.  
  *   
  * **ERP Function:** Budget Reallocation & Fund Transfer Engine.  
  *   
  * **Input:** Mã Ngân sách Nguồn, Mã Ngân sách Đích, Số tiền điều chuyển.  
  *   
  * **Output:** Hạn mức Ngân sách được cập nhật (Budget Reallocated).  
  *   
  * **Business Rule:** BR-FIN-033: Tuyệt đối KHÔNG ĐƯỢC điều chuyển ngân sách từ Nhóm Chi phí Bắt buộc (An toàn, PCCC, Y tế, Dinh dưỡng) sang Nhóm Chi phí Tiếp khách/Sự kiện/Marketing.  
  *   
  * **Status Before:** Active Budget.  
  *   
  * **Status After:** Budget Reallocated.  
  *   
  * **SLA:** Max 24 giờ làm việc.  
  *   
  * **Notification:** Alert gửi Kế toán Cơ sở.  
  * 

### **Giai đoạn 3: Tự động Dự báo Dòng tiền Cuộn 12 Tuần (12-Week Rolling Cash Flow Forecast)**

* **Step 06:**  
* 

  * **Actor:** ERP System (Rolling Cash Flow Forecasting Engine).  
  *   
  * **Action:** Đúng 01:00 AM Thứ Hai hàng tuần, ERP tự động trích xuất và tính toán Dự báo Dòng tiền 12 Tuần tiếp theo:  
  * 

    * *Dòng tiền Thu (Cash Inflows):* Tự động tính từ Lịch thu học phí kỳ tới (SOP-FIN-001), Công nợ AR phải thu, Dự báo doanh thu học sinh mới (SOP-CRM-001).  
    *   
    * *Dòng tiền Chi (Cash Outflows):* Tự động tổng hợp từ Lịch trả lương nhân sự (SOP-HR-001), Công nợ AP trả NCC SOP-PUR-001, Hóa đơn điện nước/thuê nhà định kỳ SOP-FIN-002, Hạn hoàn phí rút học SOP-ADM-005.  
    *   
  * **ERP Function:** Automated 12-Week Rolling Cash Flow Engine.  
  *   
  * **Input:** Financial Sub-ledger Data (AR, AP, Payroll, Recurring Expenses).  
  *   
  * **Output:** Báo cáo Dự báo Dòng tiền Cuộn 12 Tuần (12-Week Cash Flow Forecast).  
  *   
  * **Business Rule:** BR-FIN-034: Nếu Dự báo Dòng tiền ròng (Net Cash Position) của bất kỳ tuần nào trong 12 tuần tới bị **ÂM (Negative Cash Alert)**, ERP tự động phát Báo động Đỏ cho CFO và CEO để thực hiện biện pháp cân đối vốn.  
  *   
  * **Status Before:** Raw Financial Data.  
  *   
  * **Status After:** Cash Forecast Generated.  
  *   
  * **SLA:** Real-time tự động mỗi sáng Thứ Hai.  
  *   
  * **Notification:** Báo cáo Dòng tiền gửi Email & Mobile App cho CFO và CEO.  
  * 

### **Giai đoạn 4: Phân tích Chênh lệch Ngân sách & Báo cáo BI Analytics (Variance Analysis & BI Sync)**

* **Step 07:**  
* 

  * **Actor:** Kế toán Ngân sách HQ, CFO & Board.  
  *   
  * **Action:** Cuối tháng, sau khi đóng sổ kế toán, ERP tự động so sánh Chi phí Thực tế vs Ngân sách Dự toán (Budget vs Actual Variance Analysis), xuất bản Báo cáo BI Analytics trên Executive Dashboard (SOP-GOV-001).  
  *   
  * **ERP Function:** Budget Variance Analytics & BI Dashboard Integration.  
  *   
  * **Input:** Actual Financial Ledger Data \+ Approved Budget Baseline.  
  *   
  * **Output:** Báo cáo BI Chênh lệch Ngân sách (Biểu đồ Waterfall, Heatmap Chi vượt).  
  *   
  * **Business Rule:** BR-FIN-035: Cơ sở có Tỷ lệ Chi vượt Ngân sách \> 5% trong 2 tháng liên tiếp bắt buộc phải nộp Báo cáo Giải trình & Kế hoạch Khắc phục (Budget Action Plan) cho CFO.  
  *   
  * **Status Before:** Monthly Ledger Closed.  
  *   
  * **Status After:** Budget BI Analytics Live.  
  *   
  * **SLA:** Tự động hoàn tất vào ngày 05 hàng tháng.  
  *   
  * **Notification:** Báo cáo BI Ngân sách gửi CFO, COO và CEO.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Lập Kế Hoạch Ngân Sách Vận Hành Năm (Tài Chính T+1)\]  
       │  
       ▼  
\[Kế Toán HQ Thiết Lập Khung Target Ratios ──► Phát Hành Budget Input Templates\]  
       │  
       ▼  
\[Cơ Sở Lập Dự Toán Bottom-Up (Liên kết Sĩ số Học phí SOP-ADM-003 & Lương SOP-HR-001)\]  
       │  
       ▼  
\[Kế Toán HQ Chạy Variance Analysis ──► CFO & CEO Duyệt ──► Lock Budget Baseline\]  
       │  
       ▼  
\[DIỄN BIẾN TRONG NĂM: KIỂM SOÁT CHI TIÊU REAL-TIME (ENCUMBRANCE CONTROL)\]  
       │  
       ▼  
\[Nộp PR / Yêu Cầu Chi ──► ERP Auto Check Ngân Sách Khả Dụng (Available Budget)\]  
       │  
       ◇ Kết quả Check Ngân sách?  
       ├─ Vượt \> 100% ──► \[HARD STOP: ERP KHÓA CHẶN ──► Yêu cầu Over-Budget Workflow\]  
       ├─ Đạt 85-99%  ──► \[SOFT WARNING: Bật Cờ Vàng Cảnh Báo Sắp Hết Ngân Sách\]  
       └─ Trong Ngân sách ──┐  
                            │  
                            ▼  
\[Duyệt PR / PO ──► ERP Auto Encumber Budget (Giữ Tiền Cam Kết Chi)\]  
                            │  
                            ▼  
\[01:00 AM THỨ HAI HÀNG TUẦN: ERP RUNNING ROLLING CASH FLOW ENGINE (12 TUẦN)\]  
 (Thu: Học phí SOP-FIN-001 | Chi: Lương HR-001, AP PUR-001, Thuê Nhà FIN-002)  
                            │  
                            ◇ Dự báo Dòng tiền 12 Tuần bị Âm (Negative Net Cash)?  
                            ├─ YES ──► \[KÍCH HOẠT BÁO ĐỘNG ĐỎ VỀ PHONE CFO & CEO\]  
                            └─ NO  ──┐  
                                     │  
                                     ▼  
\[Cuối Tháng: ERP Auto Sync Báo Cáo BI Analytics (Budget vs Actual) Lên SOP-GOV-001\]  
                                     │  
                                     ▼  
                                \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-FIN-030 (Revenue-Linked Budgeting):** Ngân sách Chi phí Vận hành (OPEX) của mỗi cơ sở được khống chế theo tỷ lệ phần trăm tối đa so với Doanh thu Dự kiến (Ví dụ: Tổng Chi phí Vận hành \<= 75% Doanh thu Học phí). ERP tự động chặn không cho Submit dự toán nếu vượt tỷ lệ trần.  
*   
* **BR-FIN-031 (Baseline Lock & Revision Policy):** Ngân sách sau khi được CEO/Board phê duyệt sẽ trở thành **Baseline Cố định**. Mọi điều chỉnh tăng tổng ngân sách giữa năm (Mid-Year Budget Expansion) bắt buộc phải có Tờ trình Giải trình và phê duyệt của Board/CEO.  
*   
* **BR-FIN-032 (Encumbrance Accounting Gate):** Hệ thống kiểm soát ngân sách theo cơ chế 3 lớp:  
* 

  * *Spent:* Tiền đã chi thực tế (Hóa đơn/Phiếu chi đã hạch toán).  
  *   
  * *Encumbered:* Tiền đã cam kết chi (PR/PO đã approved nhưng chưa trả tiền).  
  *   
  * *Available:* Ngân sách còn lại thực sự được phép tiêu.  
  *   
  * *Rule:* Nếu Proposed Amount \> Available Budget, ERP áp dụng cơ chế Hard Stop khóa chặt giao dịch.  
  *   
* **BR-FIN-033 (Non-Transferable Budget Lines):** Tuyệt đối KHÔNG ĐƯỢC phép điều chuyển ngân sách từ các Hạng mục Bắt buộc (An toàn PCCC, Y tế học đường, Vệ sinh an toàn thực phẩm, Đào tạo nhân sự) sang các Hạng mục Chi phí Tiếp khách, Sự kiện, Marketing.  
*   
* **BR-FIN-034 (12-Week Cash Flow Alarm):** Khi mô hình dự báo phát hiện Dòng tiền ròng (Net Cash Position) của bất kỳ tuần nào trong 12 tuần tới xuống dưới Ngưỡng An toàn Thanh khoản (Safety Liquidity Threshold \= 1 tháng Chi phí Lương Toàn Chuỗi), ERP tự động bật Cảnh báo Đỏ Cấp độ 1 cho CFO và CEO.  
*   
* **BR-FIN-035 (Variance Explanation Threshold):** Mọi sự vượt ngân sách theo từng Mã Ngân sách (Cost Line) lớn hơn **10% hoặc 10.000.000 VNĐ** trong tháng bắt buộc phải có Báo cáo Giải trình Nguyên nhân (Variance Justification) của Hiệu trưởng Cơ sở.  
* 

## **13\. Exception Cases**

* **Phát sinh Khoản Chi Khẩn cấp Vượt Ngân sách (Emergency Over-Budget Expense):**  
* 

  * *Xử lý:* Đối với sự cố PCCC, vỡ ống nước, thiên tai, đứt dây điện..., Hiệu trưởng Cơ sở bật cờ Emergency Over-Budget trên Đề nghị Chi (SOP-FIN-002). ERP chuyển thẳng luồng duyệt khẩn cấp tới CFO và CEO. Khi CEO bấm Approve, ERP tự động nới hạn mức ngân sách tạm thời (Temporary Budget Expansion).  
  *   
* **Doanh thu Học phí Thực tế Giảm mạnh so với Dự toán (Revenue Shortfall):**  
* 

  * *Xử lý:* Khi sĩ số giảm \> 15%, ERP kích hoạt Budget Downscaling Workflow. Hệ thống tự động tính toán lại và giảm tỷ lệ tương ứng (Pro-rata Reduction) hạn mức Ngân sách Khả dụng của các hạng mục chi phí không bắt buộc (Sự kiện, Marketing, Mua sắm thêm) của cơ sở đó.  
  *   
* **Biến động Tỷ giá / Đột biến Giá Nguyên vật liệu Bếp ăn:**  
* 

  * *Xử lý:* Trưởng phòng Mua sắm nộp Tờ trình Điều chỉnh Đơn giá Định mức (Price Matrix Adjustment). Kế toán Ngân sáchHQ kiểm tra và trình CFO duyệt cập nhật lại Hạn mức Ngân sách Bếp ăn trên ERP mà không làm thay đổi tổng ngân sách chung.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Ngân sách Vận hành Năm (Annual Budget Baseline) | Kế toán trưởng | CFO | Tổng Giám đốc (CEO) / Board |
| Phê duyệt Điều chuyển Ngân sách Nội bộ (Budget Reallocation) | Kế toán Ngân sách | Kế toán trưởng | CFO |
| Phê duyệt Chi vượt Ngân sách Ngoại lệ (Over-Budget Approval) | Kế toán trưởng | CFO | Tổng Giám đốc (CEO) |
| Phê duyệt Điều chỉnh Ngân sách Giữa năm (Mid-Year Budget Revision) | CFO | CEO | Board of Directors |

## **15\. Status Lifecycle**

* **Annual Budget Status:** Draft \-\> Under HQ Review \-\> Approved Baseline \-\> Locked & Active \-\> Revised (Mid-Year).  
*   
* **Budget Line Item Status:** Active \-\> Warning (85-99%) \-\> Exhausted (100%) \-\> Blocked (Hard Stop) \-\> Reallocated.  
*   
* **Cash Flow Forecast Status:** Draft Model \-\> Generated \-\> Liquidity Healthy \-\> Negative Cash Warning (Alert Active).  
* 

## **16\. Data Model**

* **Primary Entity:** BudgetBaseline  
* 

  * BudgetBaselineID (PK, String, Unique)  
  *   
  * FiscalYear (Integer), CampusID (FK, String), CostCenterID (FK, String)  
  *   
  * TotalAllocatedOPEX (Decimal), TotalAllocatedCAPEX (Decimal)  
  *   
  * BaselineStatus (Enum: Draft, Approved, Locked, Revised)  
  *   
  * ApprovedBy (FK), ApprovedTimestamp (DateTime)  
  *   
* **Related Entities:**  
* 

  * BudgetLineItem: BudgetLineID (PK), BudgetBaselineID (FK), ExpenseCategoryID (FK), PeriodMonth (String: e.g., "2026-09"), AllocatedAmount (Decimal), ActualSpent (Decimal), EncumberedAmount (Decimal), AvailableAmount (Decimal), IsFrozenLine (Boolean).  
  *   
  * BudgetReallocationLog: ReallocationID (PK), FromBudgetLineID (FK), ToBudgetLineID (FK), Amount (Decimal), Reason (Text), ApprovedByCFO (Boolean), Timestamp (DateTime).  
  *   
  * CashFlowForecast12W: ForecastID (PK), ForecastDate (Date), WeekNumber (Integer, 1-12), ProjectedInflow (Decimal), ProjectedOutflow (Decimal), NetCashPosition (Decimal), IsNegativeAlert (Boolean), GeneratedAt (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-FIN-030: Tờ trình Đề xuất Ngân sách Vận hành Năm (Annual Operating Budget Proposal).  
*   
* FRM-FIN-031: Phiếu Đề nghị Điều chuyển Ngân sách Nội bộ (Budget Reallocation Request).  
*   
* FRM-FIN-032: Tờ trình Xin Phê duyệt Chi Vượt Ngân sách Ngoại lệ (Over-Budget Expense Approval Form).  
*   
* FRM-FIN-033: Báo cáo Dự báo Dòng tiền Cuộn 12 Tuần (12-Week Rolling Cash Flow Forecast Report).  
*   
* FRM-FIN-034: Báo cáo Phân tích Chênh lệch Ngân sách Thực tế vs Dự toán (Budget vs Actual Variance Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-FIN-030 (MUST):** Tích hợp Real-time Budget Encumbrance & Hard Stop Engine: Tự động khóa chặt giao dịch PR/PO/Expense nếu vượt quá Ngân sách Khả dụng (Available Budget).  
*   
* **FR-FIN-031 (MUST):** Tích hợp Revenue-Linked Budget Validation: Tự động đối soát dự toán ngân sách cơ sở với dự báo doanh thu học phí trích xuất từ Phân hệ SIS (SOP-ADM-003).  
*   
* **FR-FIN-032 (MUST):** Phân hệ Automated 12-Week Rolling Cash Flow Engine: Tự động trích xuất dữ liệu AR (Phải thu), AP (Phải trả), Lương (Payroll) và Chi phí định kỳ để dự báo dòng tiền 12 tuần vào 01:00 AM mỗi Thứ Hai.  
*   
* **FR-FIN-033 (MUST):** Tích hợp Negative Cash Alarm System: Tự động phát Báo động Đỏ cho CFO và CEO khi dự báo dòng tiền ròng của bất kỳ tuần nào bị âm.  
*   
* **FR-FIN-034 (SHOULD):** Tính năng Budget Reallocation Restriction Rule: Tự động chặn điều chuyển ngân sách từ các Hạng mục An toàn/Y tế/Dinh dưỡng sang Hạng mục Tiếp khách/Sự kiện.  
* 

## **19\. Automation Opportunities**

* **AUTO-FIN-030 (RULE ENGINE):** Tự động tính toán Ngân sách Lương trần (Salary Budget Ceiling) dựa trên định biên nhân sự và sĩ số lớp học.  
*   
* **AUTO-FIN-031 (INTEGRATION):** Tự động hạch toán khoản tiền cam kết chi (Encumbered Budget) ngay khi PR hoặc PO được duyệt trên SOP-PUR-001.  
*   
* **AUTO-FIN-032 (DATA PULL):** Tự động thu thập dữ liệu thu/chi từ tất cả các phân hệ tài chính/vận hành để chạy mô hình dự báo dòng tiền cuộn 12 tuần tự động.  
*   
* **AUTO-FIN-033 (BI ANALYTICS):** Tự động xuất bản Báo cáo BI Chênh lệch Ngân sách (Budget vs Actual Variance) đính kèm Biểu đồ Waterfall trực quan ngay khi chốt sổ kế toán tháng.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Lập Ngân sách Năm Mới | Hiệu trưởng & Managers | ERP Pop-up \+ Email | 01/10 hàng năm |
| Cảnh báo Ngân sách Khả dụng Đạt 85% (Soft Warning) | Người yêu cầu & Hiệu trưởng | Mobile App Push | Immediate khi reached 85% |
| CẢNH BÁO HARD STOP: Ngân sách Khả dụng Cạn Kiệt | Người yêu cầu & Kế toán | ERP High Alert Pop-up | Immediate khi reached 100% |
| CẢNH BÁO ÂM DÒNG TIỀN (Negative Cash Forecast) | CFO & CEO | Loud Sound \+ App Push \+ Email | 01:30 AM Thứ Hai hàng tuần |
| Báo cáo BI Chênh lệch Ngân sách Tháng (Variance Report) | CFO, COO, BGH | Email \+ BI Dashboard Sync | Ngày 05 hàng tháng |

## **21\. Permission Matrix (RBAC)**

| Role | View Budget | Input Budget Proposal | Approve Annual Budget | Approve Over-Budget | Reallocate Budget | View Cash Forecast |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Hiệu trưởng Cơ sở | Own Campus | Full Campus | No | Request Only | Request Only | No |
| Kế toán Ngân sách HQ | Full Enterprise | Full Enterprise | Review Only | Review Only | Full Process | Full Enterprise |
| Kế toán trưởng | Full Enterprise | Full Enterprise | Review Only | Review Only | Full Review | Full Enterprise |
| Group CFO | Full Enterprise | Read Only | Full Approval | Full Approval | Full Approval | Full Enterprise |
| CEO / Board | Full Enterprise | Read Only | Full Approval | Full Approval | Read Only | Full Enterprise |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Mọi thao tác Tạo, Sửa, Khóa Ngân sách Năm Baseline (User ID, Timestamp, Giá trị cũ, Giá trị mới).  
*   
* Lịch sử điều chuyển ngân sách giữa các hạng mục (Budget Reallocation Logs): Hạng mục nguồn, Hạng mục đích, Số tiền, Người duyệt.  
*   
* Lịch sử phê duyệt Ngoại lệ Chi Vượt Ngân sách (Over-Budget Approvals): Lý do chi vượt, Người bấm Approve (CFO/CEO).  
*   
* Nhật ký thực thi mô hình Dự báo Dòng tiền 12 Tuần: Timestamp chạy, Các giả định đầu vào, Kết quả dự báo.  
*   
* Nhật ký can thiệp đè hạn mức ngân sách thủ công (Manual Budget Override).  
* 

## **23\. Internal Controls**

* **Automated Budget Encumbrance Control:** Tự động giữ tiền cam kết chi (Encumbered) ngay khi PO/PR được duyệt, triệt tiêu rủi ro vỡ ngân sách do dồn hóa đơn cuối kỳ.  
*   
* **Hard Stop Enforcement:** Khóa cứng hệ thống không cho xuất chi nếu không có hạn mức Ngân sách Khả dụng hoặc chưa có phê duyệt chi vượt của CFO/CEO.  
*   
* **Frozen Safety Budget Lines:** Đóng băng các mã ngân sách liên quan đến An toàn Trẻ em, PCCC, Y tế và Dinh dưỡng; cấm tuyệt đối việc chuyển tiền từ các mã này sang mục đích khác.  
*   
* **Dual Sign for Over-Budget Approval:** Yêu cầu phê duyệt xác nhận kép (Dual Approval) từ CFO \+ CEO đối với mọi khoản chi vượt ngân sách \> 50.000.000 VNĐ.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Lập & Phê duyệt Ngân sách Năm** | Thời gian hoàn tất phê duyệt Ngân sách Baseline | **Trước 15/12 hàng năm** | CFO & Kế toán Ngân sách |
| **Tỷ lệ Tuân thủ Ngân sách Vận hành (Budget Adherence)** | (Tổng Chi phí Thực tế / Tổng Ngân sách Approved) \* 100 | **\<= 100% (Zero Overrun)** | Hiệu trưởng các Cơ sở |
| **Độ chính xác Dự báo Dòng tiền (Cash Forecast Accuracy)** | (Dòng tiền Thực tế / Dòng tiền Dự báo 12 Tuần) \* 100 | **\>= 92%** | Kế toán Ngân sách & CFO |
| **SLA Xử lý Yêu cầu Điều chuyển Ngân sách** | Thời gian từ khi submit đến khi CFO duyệt xong | **\<= 24 giờ làm việc** | Kế toán Ngân sách & CFO |
| **Tỷ lệ Cảnh báo Âm Dòng tiền Sớm (Cash Alert SLA)** | Phát hiện dòng tiền âm trước khi xảy ra | **Trước ít nhất 4 Tuần** | ERP Cash Flow Engine |

## **25\. Dashboard / Report**

* **Executive Cash Flow BI Dashboard (CFO & CEO):** Màn hình biểu đồ Dự báo Dòng tiền Cuộn 12 Tuần, Dòng tiền ròng tích lũy (Net Cumulative Cash), Cảnh báo tuần có nguy cơ âm tiền, Bảng phân tích nguồn thu/chi lớn nhất.  
*   
* **Campus Budget vs Actual BI Monitor (COO & BGH):** Màn hình biểu đồ Waterfall so sánh Ngân sách Dự toán vs Chi phí Thực tế theo cơ sở, Bản đồ nhiệt các cơ sở chi tiêu sắp chạm trần ngân sách (Heatmap Budget Utilization).  
*   
* **Encumbrance & Procurement Commitment Report (Kế toán trưởng & Mua sắm):** Báo cáo chi tiết các khoản tiền đã cam kết chi (Encumbered Budget) theo PR/PO đang thực hiện, Dự báo dòng tiền chi trả nợ NCC theo hợp đồng.  
* 

## **26\. Integration**

* **Student Enrollment & Billing (SOP-ADM-003 & SOP-FIN-001):** Trích xuất dự báo Doanh thu Học phí và Lịch thu tiền kỳ tới để làm đầu vào Dự báo Dòng tiền Thu.  
*   
* **Procurement & P2P Engine (SOP-PUR-001):** Nhận dữ liệu PR/PO để hạch toán Ngân sách Cam kết Chi (Encumbered) và Lịch trả nợ AP làm đầu vào Dòng tiền Chi.  
*   
* **HR & Payroll Integration (SOP-HR-001):** Trích xuất Bảng lương và Phụ cấp nhân sự dự kiến làm đầu vào Dòng tiền Chi định kỳ.  
*   
* **Cash, Bank & Expense Management (SOP-FIN-002):** Trích xuất số dư tài khoản ngân hàng real-time và các khoản chi vận hành thực tế.  
*   
* **Management BI Dashboard (SOP-GOV-001):** Hiển thị các chỉ số BI Budget Variance và Cash Flow Forecast cho Ban Điều hành.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Mất thanh khoản tài chính do vỡ dòng tiền chi** | Critical | Low | 12-Week Rolling Cash Flow Engine chạy tự động; Báo động đỏ trước 4 tuần. | CFO & CEO |
| **Chi tiêu vượt ngân sách tràn lan tại các cơ sở** | High | Low | ERP Hard Stop Gate tự động khóa giao dịch PR/Expense nếu hết budget. | Kế toán trưởng & IT |
| **Tắt nghẽn vận hành do khóa ngân sách quá cứng nhắc** | Medium | Medium | Quy trình Emergency Over-Budget Workflow cho phép CEO/CFO duyệt khẩn trong 2h. | CFO & Hiệu trưởng |
| **Cắt giảm ngân sách An toàn/Y tế để dồn tiền mục khác** | Critical | Low | Khóa cứng các mã Frozen Budget Lines, cấm tuyệt đối việc điều chuyển khỏi các mục này. | CFO & Group COO |

## **28\. Acceptance Criteria**

* **Given:** Cơ sở A có Ngân sách Văn phòng phẩm tháng 09/2026 là 10.000.000 VNĐ. Đã chi thực tế 7.000.000 VNĐ, đang có 1 PO cam kết chi 2.000.000 VNĐ (Encumbered \= 2M).  
*   
* **When:** Admin Cơ sở A nộp Yêu cầu Mua hàng PR mới trị giá 2.000.000 VNĐ cho mục Văn phòng phẩm.  
*   
* **Then:** ERP tự động tính Ngân sách Khả dụng:  
* 

* $$\\text{Available Budget} \= 10\\text{M} \- 7\\text{M} \- 2\\text{M} \= 1\\text{M VNĐ}$$  
* Vì PR mới (2 triệu) \> Ngân sách Khả dụng (1 triệu), ERP Hard Stop Gate lập tức khóa chặn giao dịch, hiển thị thông báo lỗi *"Chi vượt Ngân sách Khả dụng 1.000.000 VNĐ. Yêu cầu làm Đề nghị Điều chuyển Ngân sách hoặc xin Phê duyệt Chi vượt"*.  
*   
* **Given:** Tiến trình 12-Week Rolling Cash Flow Engine chạy tự động vào 01:00 AM sáng Thứ Hai.  
*   
* **When:** Hệ thống tính toán dự báo tuần thứ 6 có Dòng tiền ròng Âm 300.000.000 VNĐ do trùng lịch trả nợ nhà thầu xây dựng và tiền thuê nhà.  
*   
* **Then:** ERP tự động kích hoạt Cảnh báo Đỏ Negative Cash Alert, gửi SMS, Email và App Push khẩn cấp trực tiếp tới điện thoại di động của CFO và CEO vào lúc 01:30 AM Thứ Hai.  
* 

## **29\. Test Scenarios**

1. **Happy Path Budget Encumbrance & Expense Test:** Tạo PR trong ngân sách \-\> ERP Auto Encumber Budget \-\> Duyệt PO \-\> Nhập hàng GRN \-\> Hạch toán Chi phí \-\> ERP chuyển từ Encumbered sang Actual Spent \-\> Ngân sách Khả dụng cập nhật chính xác 100%.  
2.   
3. **Hard Stop Over-Budget Blocking Test:** Cố tình nộp Yêu cầu Chi vượt Ngân sách Khả dụng \-\> Kiểm tra xem ERP Hard Stop Gate có khóa chặn không cho Submit không.  
4.   
5. **Forbidden Budget Line Reallocation Test:** Cố tình tạo Yêu cầu Điều chuyển Ngân sách từ Mục "An toàn PCCC" sang Mục "Chi phí Tiếp khách" \-\> Kiểm tra xem ERP Rule Engine có báo lỗi cấm điều chuyển không (BR-FIN-033).  
6.   
7. **Automated 12-Week Cash Flow Forecast Test:** Đặt đồng hồ hệ thống 01:00 AM Thứ Hai \-\> Kiểm tra xem ERP có tự động trích xuất dữ liệu từ SIS, HR, PUR, FIN để tạo Báo cáo Dòng tiền 12 Tuần chuẩn xác không.  
8.   
9. **Negative Cash Alarm Escalation Test:** Giả lập dữ liệu tuần 4 bị âm tiền \-\> Kiểm tra xem ERP có gửi SMS và Pop-up Báo động Đỏ tới điện thoại CFO và CEO không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình Cây Trung tâm Chi phí (Cost Center Hierarchy); Cấu hình công thức tính Ngân sách Khả dụng; Cấu hình Ngưỡng Soft Warning (85%) và Hard Stop (100%); Cấu hình Tham số Mô hình Dự báo Dòng tiền 12 Tuần; Cấu hình Mã Ngân sách Đóng băng (Frozen Lines).  
*   
* **Master Data Migration:** Import Bảng Ngân sách Vận hành Baseline năm tài chính hiện tại; Import số dư tài khoản tiền mặt/ngân hàng mở đầu; Import lịch công nợ AP/AR hiện hữu.  
*   
* **Hardware & Integration:** Kết nối API với các Phân hệ SIS, HR, PUR, FIN để lấy dữ liệu thu/chi real-time; Tích hợp công cụ BI Analytics (PowerBI/Tableau/Metabase) cho Executive Dashboard.  
*   
* **Training & Change Management:** Đào tạo Ban Giám hiệu và Admin các cơ sở quy trình theo dõi Ngân sách Khả dụng và lập Yêu cầu Điều chuyển Ngân sách; Đào tạo Phòng Kế toán HQ quy trình quản trị Encumbrance Control; Đào tạo CFO & CEO kỹ năng phân tích và xử lý Báo động Dòng tiền trên Mobile BI App.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (23 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-ADM-007: Quản lý Học sinh Chuyển Lớp, Chuyển Cơ sở (Inter-Campus Transfer) & Đồng bộ Hồ sơ (Domain 04, 06, 11, 12, 55, 71).  
  10.   
  11. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  12.   
  13. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  14.   
  15. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  16.   
  17. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  18.   
  19. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  20.   
  21. SOP-FIN-003: Lập Kế hoạch Ngân sách Vận hành (Budgeting), Kiểm soát Chi tiêu & Dự báo Dòng tiền 12 Tuần (Domain 55, 56, 57, 58, 70, 71).  
  22.   
  23. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  24.   
  25. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  26.   
  27. SOP-HR-002: Đào tạo Nhân sự (Training Management), Đánh giá KPI/OKR & Khen thưởng / Kỷ luật (Domain 45, 47, 48, 53, 54, 67, 75).  
  28.   
  29. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  30.   
  31. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  32.   
  33. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  34.   
  35. SOP-INV-001: Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục, Xuất kho Lớp học & Kiểm kê Kho Định kỳ (Domain 32, 38, 41, 55, 69).  
  36.   
  37. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  38.   
  39. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  40.   
  41. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  42.   
  43. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  44.   
  45. SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Service Request & CSAT/NPS (Domain 62, 63, 64, 65, 66, 68, 70).  
  46.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **02 SOPs**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-FIN-003: Budget & Cash│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-INV-001: Inventory & Stock│ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-007: Transfer & Sync │                                │ • SOP-FAC-001: Facility & PCCC │ • SOP-HR-002: Training & KPI│  
│ • SOP-CS-001: Complaints & CSAT│                                │                                │ • SOP-SEC-001: RBAC & Security│  
│                                │                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 26

# **SOP-ADM-006 — QUY TRÌNH HỌC SINH TỐT NGHIỆP MẦM NON, HOÀN THIỆN HỒ SƠ HỌC BẠ VÀ CHUYỂN CẤP LÊN TIỂU HỌC (GRADUATION & K-12 TRANSITION)**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-ADM-006  
*   
* **Tên SOP:** Quy trình Học sinh Tốt nghiệp Mầm non, Hoàn thiện Hồ sơ Học bạ và Chuyển cấp Lên Tiểu học (Graduation & K-12 Transition)  
*   
* **Module ERP:** Student Information System \- SIS (04), Student Enrollment (06), Academic Year / Term Management (13), Student Development Assessment (22), Finance & Accounting Integration (55), Document Management (60), Multi-campus Management (71)  
*   
* **Process Owner:** Academic Manager (Trưởng phòng Chuyên môn Mầm non) / Admission Manager  
*   
* **Department:** Ban Giáo vụ, Khối Giáo viên Mầm non (Khối 5–6 tuổi / Khối Lá / K2), Phòng Tuyển sinh & CSKH, Phòng Kế toán \- Tài chính  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Giám đốc Chuyên môn (Academic Director) / Group COO  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ quy trình hoàn thành chương trình giáo dục mầm non cho học sinh 5–6 tuổi (Khối Lá / Kindergarten 2): từ việc đánh giá đủ điều kiện công nhận tốt nghiệp theo Chuẩn Phát triển Trẻ em 5 tuổi của Bộ GD&ĐT, tự động đóng gói Hồ sơ Học bạ & Phát triển Thể chất/Tâm lý (Student Development Portfolio), tổ chức Lễ Tốt nghiệp (Graduation Open Day), quyết toán công nợ/tiền cọc hoàn trả Phụ huynh, cấp Giấy Chứng nhận Hoàn thành Chương trình Mầm non điện tử (Digital Certificate of Completion), đến việc tự động kết nối dữ liệu chuyển cấp (K-12 Transition Pipeline) sang Phân hệ Tiểu học trong cùng hệ thống liên cấp hoặc xuất file Dữ liệu Học bạ Điện tử gửi Phụ huynh nộp trường Tiểu học bên ngoài.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, trường mầm non song ngữ/quốc tế và trường liên cấp Mầm non \- Tiểu học (K-12) thuộc hệ thống.  
*   
* **Phòng ban:** Ban Giáo vụ, Khối Giáo viên Mầm non (Lớp 5–6 tuổi), Phòng Tuyển sinh K-12, Phòng Kế toán, Bộ phận Y tế học đường, Bộ phận CSKH, Ban Giám hiệu.  
*   
* **Đối tượng:** Tất cả học sinh mầm non thuộc khối lớp cuối cấp (5–6 tuổi) sắp hoàn thành chương trình mầm non vào cuối năm học, Phụ huynh / Người giám hộ hợp pháp.  
*   
* **Trường hợp không áp dụng:** Học sinh các khối lớp nhỏ (Nhà trẻ, 3–4 tuổi, 4–5 tuổi) lên lớp trong cùng cấp mầm non (áp dụng SOP-ACA-002: Quy trình Phân lớp & Lên Lớp Hàng năm \- Grade Promotion).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Graduation Audit (Kiểm tra Điều kiện Tốt nghiệp):** Tiến trình rà soát tự động trên ERP xác nhận học sinh đạt đủ các tiêu chí: Hoàn thành Khung chương trình mầm non 5–6 tuổi (SOP-ACA-001), hoàn thành Đánh giá Phát triển 5 Lĩnh vực (SOP-SIS-002), hoàn thành Hồ sơ Sức khỏe/Tiêm chủng (SOP-MED-001) và không còn nợ tài chính (SOP-FIN-001).  
*   
* **5-Year-Old Child Development Standard (Chuẩn Phát triển Trẻ 5 Tuổi):** Bộ bộ tiêu chí đánh giá mức độ sẵn sàng vào Lớp 1 do Bộ GD&ĐT ban hành bao gồm 28 chỉ số phát triển thể chất, tình cảm, nhận thức, ngôn ngữ và giao tiếp xã hội.  
*   
* **K-12 Transition Pipeline (Tuyến Chuyển cấp Mầm non \- Tiểu học):** Tiến trình đồng bộ dữ liệu tự động cho phép chuyển thẳng hồ sơ học sinh mầm non tốt nghiệp sang Phân hệ Tuyển sinh Lớp 1 Tiểu học trong cùng tập đoàn mà Phụ huynh không phải nộp lại hồ sơ từ đầu.  
*   
* **Digital Portfolio & Health Record (Học bạ & Hồ sơ Y tế Điện tử):** Tập hợp file PDF có chữ ký số xác thực của Hiệu trưởng bao gồm: Báo cáo Đánh giá Phát triển 5 Lĩnh vực, Biểu đồ Tăng trưởng WHO, Lịch sử Tiêm chủng/Dị ứng và Giấy Chứng nhận Hoàn thành Chương trình Mầm non.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Đánh giá Hoàn thành Chuẩn Phát triển Trẻ 5 Tuổi | GVCN Lớp Lá (5-6y) | Academic Manager | Chuyên gia Tâm lý | Phụ huynh |
| Hoàn thiện Hồ sơ Y tế & Biểu đồ Tăng trưởng WHO | Cán bộ Y tế | Cán bộ Y tế | GVCN / Bếp ăn | Phụ huynh |
| Rà soát Quyết toán Công nợ Học phí / Tiền cọc | Kế toán Phí | Kế toán trưởng | Tuyển sinh K-12 | Phụ huynh |
| Chạy Engine Kiểm tra Điều kiện Tốt nghiệp (Graduation Audit) | ERP System / Giáo vụ | Academic Manager | Hiệu trưởng Cơ sở | Toàn bộ Actor |
| Phát hành Giấy Chứng nhận Điện tử & Học bạ Digital | Academic BA / Admin | Hiệu trưởng Cơ sở | Academic Director | Phụ huynh / K-12 |
| Chuyển Hồ sơ sang Tuyến K-12 Transition (Nếu học tiếp) | Admission Officer K-12 | Admission Manager | Phụ huynh | BGH Tiểu học |

*Ghi chú: Việc đánh giá trẻ mầm non 5 tuổi theo Bộ tiêu chí Chuẩn phát triển trẻ 5 tuổi, cấp Giấy chứng nhận hoàn thành chương trình mầm non và chuyển giao hồ sơ học bạ mầm non lên Lớp 1 Tiểu học cần kiểm tra/đối chiếu quy định hiện hành của Bộ Giáo dục & Đào tạo (Thông tư 23/2010/TT-BGDĐT và Thông tư 28/2020/TT-BGDĐT \- Điều lệ Trường Tiểu học) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Bộ Tiêu chuẩn Trẻ 5 tuổi (ChildDevelopment5YMaster), Danh mục Cấp học K-12 (SchoolLevelMaster), Mẫu Báo cáo Học bạ Digital (PortfolioTemplateMaster).  
*   
* **Hồ sơ Hoàn tất:**  
* 

  1. Kết quả Đánh giá Phát triển Học kỳ 2 Khối 5–6 tuổi (SOP-SIS-002).  
  2.   
  3. Báo cáo Y tế & Tiêm chủng cuối năm học (SOP-MED-001).  
  4.   
  5. Xác nhận Kế toán không còn nợ tiền học phí/dịch vụ (SOP-FIN-001).  
  6.   
* **Approval Prerequisite:** Lớp học ở trạng thái Hoàn thành Năm học (Term Ending).  
* 

## **7\. Trigger**

* **Theo Lịch Năm học:** Ngày 15/05 hàng năm (Kích hoạt Chu trình Kiểm tra Tốt nghiệp Mầm non cho Khối 5–6 tuổi).  
*   
* **Lễ Tốt nghiệp (Graduation Day):** Sự kiện trao Giấy Chứng nhận Hoàn thành Chương trình Mầm non vào cuối tháng 05\.  
* 

## **8\. Quy trình AS-IS**

* Giáo viên chủ nhiệm viết tay nhận xét vào Sổ Theo dõi Phát triển Trẻ 5 tuổi bằng sổ giấy A4.  
*   
* Cán bộ Y tế chép số đo chiều cao, cân nặng cuối năm từ sổ tay vào sổ y tế học sinh.  
*   
* Kế toán ngồi xuất file Excel kiểm tra từng học sinh xem đã đóng đủ học phí và tiền cọc chưa, lập danh sách chuyển cho Tuyển sinh.  
*   
* Văn thư trường in Giấy Chứng nhận Hoàn thành Chương trình Mầm non bằng giấy cứng, trình Hiệu trưởng ký tay từng tờ và dán dấu nổi.  
*   
* Nếu Phụ huynh cho con học tiếp Lớp 1 hệ thống liên cấp, Phụ huynh phải mang toàn bộ xấp hồ sơ giấy sang Phòng Tuyển sinh Tiểu học để đăng ký lại từ đầu.  
*   
* **Hệ quả:** Mất 2–3 tuần của Giáo viên và Kế toán để chuẩn bị hồ sơ tốt nghiệp; lãng phí giấy in; Phụ huynh phiền hà khi phải nộp lại hồ sơ trùng lặp cho cấp Tiểu học cùng hệ thống; rủi ro thất lạc hồ sơ y tế/dị ứng của trẻ.  
* 

## **9\. Pain Points / Risk**

* **Manual Audit Bottleneck:** Kiểm tra thủ công bằng tay điều kiện tốt nghiệp của hàng ngàn học sinh gây chậm trễ tiến độ phát hành Học bạ.  
*   
* **Loss of K-12 Cross-Sell Lead:** Không tận dụng được dữ liệu học sinh mầm non tốt nghiệp để chuyển đổi sang Lớp 1 hệ thống liên cấp (K-12 Transition), dẫn đến chảy máu học sinh sang các trường Tiểu học bên ngoài.  
*   
* **Data Continuity Disruption:** Thất lạc lịch sử y tế, dị ứng và quá trình phát triển tâm lý mầm non khi trẻ bước vào Môi trường Tiểu học mới, gây khó khăn cho Giáo viên Lớp 1\.  
*   
* **Certificate Forgery Risk:** Giấy chứng nhận tốt nghiệp bản giấy dễ bị rách hỏng, làm giả hoặc thất lạc khi Phụ huynh đi nộp hồ sơ nhập học Lớp 1\.  
* 

## **10\. Quy trình TO-BE**

**1.Bước 01: Kích hoạt Chu trình Tốt nghiệp & Chạy Engine Graduation Audit:**Thời gian: 15/05 Hàng năm | Actor: ERP System & Giáo vụ.  
Đúng ngày 15/05, ERP tự động kích hoạt Graduation Audit Engine cho toàn bộ học sinh Khối 5–6 tuổi. Hệ thống tự động quét và đối soát 4 điều kiện:

1. Hoàn thành 100% Khung chương trình mầm non (SOP-ACA-001).  
2. 

3. Đã có Kết quả Đánh giá Chuẩn Phát triển Trẻ 5 tuổi (SOP-SIS-002).  
4. 

5. Đã có Báo cáo Y tế & Tiêm chủng đầy đủ (SOP-MED-001).  
6. 

7. Không nợ công nợ học phí (SOP-FIN-001).  
8. 

**2.Bước 02: Bổ sung Thông tin & Xử lý Các Điểm Cảnh báo (Audit Warning):**Thời gian: Max 48 giờ | Actor: GVCN, Y tế & Kế toán.  
ERP hiển thị Bảng Cảnh báo Tốt nghiệp (Graduation Audit Audit Matrix). Các trường hợp bị báo cờ đỏ (như thiếu đánh giá, chưa quyết toán tiền ăn, thiếu sổ tiêm chủng) được gán Task xử lý khẩn cấp cho GVCN, Y tế hoặc Kế toán hoàn thiện bổ sung.

**3.Bước 03: Phê duyệt Danh sách Tốt nghiệp & Khởi tạo Digital Portfolio:**Thời gian: Max 24 giờ | Actor: Academic Manager & Hiệu trưởng Cơ sở.  
Sau khi 100% học sinh đạt trạng thái Audit Cleared, Academic Manager trình "Danh sách Công nhận Hoàn thành Chương trình Mầm non". Hiệu trưởng Cơ sở ký duyệt bằng Chữ ký Số (Digital Signature). ERP tự động đóng gói toàn bộ dữ liệu thành Bộ Hồ sơ Học bạ Digital PDF đính kèm Mã QR Code Xác thực (Graduation Portfolio).

**4.Bước 04: Phát hành Giấy Chứng nhận Điện tử & Tổ chức Lễ Tốt nghiệp:**Thời gian: Sự kiện Cuối tháng 05 | Actor: BGH, GVCN & Phụ huynh.  
Tại Lễ Tốt nghiệp (Graduation Day), BGH trao Giấy Chứng nhận Tốt nghiệp bản danh dự. Đồng thời, ERP tự động gửi Giấy Chứng nhận Điện tử (Digital Certificate of Completion) kèm Link tải Bộ Học bạ Digital tới Mobile App Phụ huynh và Email chính thức.

**5.Bước 05: Kích hoạt Tuyến Chuyển cấp K-12 Transition (Nếu học tiếp Lớp 1):**Thời gian: Tự động | Actor: ERP K-12 Pipeline Engine & Admission K-12.  
Đối với học sinh đăng ký học tiếp Lớp 1 tại Trường Liên cấp cùng Tập đoàn, ERP tự động chạy tiến trình K-12 Transition Pipeline: Chuyển thẳng toàn bộ Hồ sơ Học sinh, Hồ sơ Y tế, Mã Student ID duy nhất và Trạng thái Học bạ sang Phân hệ Tuyển sinh Lớp 1 Tiểu học (Primary Admission Module). Phụ huynh chỉ cần bấm "Xác nhận Nhập học Lớp 1" trên App mà không phải nộp lại bất kỳ giấy tờ nào.

**6.Bước 06: Chuyển Trạng thái Hồ sơ sang Alumni & Quyết toán Tài khoản:**Thời gian: Tự động | Actor: ERP System.  
Đối với học sinh tốt nghiệp ra trường học Tiểu học bên ngoài, ERP chuyển trạng thái học sinh từ Active sang Graduated / Alumni, chuyển tài khoản App Phụ huynh sang chế độ Alumni Read-Only và thực hiện quyết toán hoàn trả Tiền cọc/Tài khoản gửi dư (SOP-ADM-005).

## **11\. Workflow**

\[BẮT ĐẦU: 15/05 Hàng Năm \- Kích Hoạt Chu Trình Tốt Nghiệp Khối 5-6 Tuổi\]  
       │  
       ▼  
\[ERP Graduation Audit Engine: Tự Động Quét 04 Điều Kiện\]  
 (1. Khung Chương Trình | 2\. Đánh Giá 5 Tuổi | 3\. Hồ Sơ Y Tế | 4\. Công Nợ Học Phí)  
       │  
       ◇ Tất cả Học sinh đạt Audit Cleared 100%?  
       ├─ NO  ──► \[ERP Bật Cờ Cảnh Báo ──► Gán Task Cho GVCN/Y Tế/Kế Toán Bổ Sung\]  
       └─ YES ──┐  
                │  
                ▼  
\[Academic Manager Trình Danh Sách ──► Hiệu Trưởng Ký Chữ Ký Số (Digital Sign)\]  
                │  
                ▼  
\[ERP Auto Package: Đóng Gói Bộ Hồ Sơ Học Bạ Digital PDF \+ Mã QR Code Xác Thực\]  
                │  
                ▼  
\[Ngày Lễ Tốt Nghiệp: Phát Hành Digital Certificate Of Completion Lên App Phụ Huynh\]  
                │  
                ◇ Học sinh Học tiếp Lớp 1 Cùng Hệ Thống Liên Cấp (K-12)?  
                ├─ YES ──► \[ERP Run "K-12 Transition Pipeline": Chuyển Hồ Sơ 1-Click\]  
                │               │  
                │               ▼  
                │          \[Phụ Huynh Bấm "Xác Nhận Nhập Học Lớp 1" Trên App\]  
                └─ NO  ──┐  
                         │  
                         ▼  
\[ERP Auto Shift Status: "Graduated / Alumni" ──► Quyết Toán Tiền Cọc (SOP-ADM-005)\]  
                         │  
                         ▼  
                    \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-ADM-030 (Graduation Audit Criteria):** Học sinh chỉ được công nhận Hoàn thành Chương trình Mầm non và cấp Giấy Chứng nhận khi đạt đủ 04 điều kiện:  
* 

  1. Tham gia tối thiểu 80% thời lượng Chương trình khung (SOP-ACA-001).  
  2.   
  3. Đã hoàn thành Báo cáo Đánh giá Chuẩn phát triển trẻ 5 tuổi (SOP-SIS-002).  
  4.   
  5. Có Hồ sơ Y tế & Lịch sử Tiêm chủng xác nhận bởi Cán bộ Y tế (SOP-MED-001).  
  6.   
  7. Đã hoàn tất 100% nghĩa vụ tài chính/học phí (SOP-FIN-001).  
  8.   
* **BR-ADM-031 (Digital Certificate Integrity):** Giấy Chứng nhận Hoàn thành Chương trình Mầm non Điện tử phải được ký bằng Chữ ký số PKI của Hiệu trưởng Cơ sở và chứa mã **Dynamic QR Code** dẫn đến trang xác thực tính hợp pháp của Nhà trường.  
*   
* **BR-ADM-032 (Single ID K-12 Continuity):** Học sinh mầm non tốt nghiệp chuyển sang Lớp 1 Tiểu học cùng hệ thống liên cấp bắt buộc phải giữ nguyên mã Student ID vĩnh viễn, bảo đảm chuỗi dữ liệu phát triển liên tục từ Mầm non đến hết K-12.  
*   
* **BR-ADM-033 (K-12 Priority Fast-Track):** Học sinh mầm non tốt nghiệp nội bộ được ưu tiên giữ chỗ (Priority Seat) và miễn 100% Lệ phí Đánh giá Đầu vào Lớp 1 Tiểu học khi đăng ký chuyển cấp trước ngày 30/04.  
*   
* **BR-FIN-030 (Deposit Settlement on Graduation):** Tiền đặt cọc giữ chỗ (Enrollment Deposit) của học sinh tốt nghiệp ra trường bên ngoài tự động được Kế toán chuyển thành Khoản tiền hoàn trả (Refund Voucher) và chi trả cho Phụ huynh theo SOP-ADM-005 trong vòng 07 ngày làm việc sau Lễ Tốt nghiệp.  
* 

## **13\. Exception Cases**

* **Học sinh chưa đạt Chuẩn Phát triển Trẻ 5 tuổi do nhu cầu chăm sóc đặc biệt (SEN):**  
* 

  * *Xử lý:* GVCN và Chuyên gia Tâm lý lập "Báo cáo Đánh giá Phát triển Cá nhân hóa" (SEN Portfolio). ERP ghi nhận trạng thái Graduated with Individual Progress Report. Học bạ Digital xuất bản bao gồm Kế hoạch Hỗ trợ Nhập học Lớp 1 để gửi cho Trường Tiểu học tiếp nhận.  
  *   
* **Phụ huynh còn nợ tiền học phí/tiền ăn chưa quyết toán đến Ngày Lễ Tốt nghiệp:**  
* 

  * *Xử lý:* ERP chuyển hồ sơ sang trạng thái Graduation Audit Blocked (Financial Hold). Học sinh vẫn được tham dự Lễ Tốt nghiệp nhận Giấy chứng nhận danh dự, nhưng ERP khóa không cho phát hành Học bạ Digital và Giấy Chứng nhận Điện tử chính thức trên App cho đến khi Kế toán xác nhận hoàn tất nợ (SOP-FIN-001).  
  *   
* **Học sinh chuyển trường Tiểu học ra nước ngoài / Trường Quốc tế bên ngoài:**  
* 

  * *Xử lý:* Phụ huynh chọn tính năng "Yêu cầu Xuất Học bạ Quốc tế" (International Portfolio Export). ERP tự động chuyển đổi toàn bộ Học bạ và Báo cáo Y tế sang định dạng Song ngữ (Việt \- Anh) có đóng dấu xác thực điện tử của Tập đoàn.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Báo cáo Đánh giá Chuẩn Phát triển Trẻ 5 Tuổi | GVCN (Chấm điểm) | Academic Manager | Hiệu trưởng Cơ sở |
| Phê duyệt Danh sách Học sinh Tốt nghiệp Mầm non | Academic Manager | Hiệu trưởng Cơ sở (Ký Số) | Academic Director |
| Phê duyệt Chuyển thẳng Hồ sơ Lớp 1 K-12 Fast-Track | Admission Officer K-12 | Admission Manager | Hiệu trưởng Tiểu học |
| Phê duyệt Quyết toán Cọc & Chi hoàn Tiền Tốt nghiệp | Kế toán Phí | Kế toán trưởng | CFO |

## **15\. Status Lifecycle**

* **Graduation Status:** Eligible \-\> Audit Pending \-\> Audit Cleared \-\> Graduated \-\> K-12 Transferred (hoặc Alumni).  
*   
* **Portfolio Status:** Draft \-\> Compiled \-\> Digitally Signed \-\> Published to App \-\> Exported.  
* 

## **16\. Data Model**

* **Primary Entity:** StudentGraduationRecord  
* 

  * GraduationID (PK, String, Unique)  
  *   
  * StudentID (FK, String, Fixed), CampusID (FK, String)  
  *   
  * AcademicYearID (FK, String), GraduationDate (Date)  
  *   
  * 5YDevelopmentScore (Enum: Exceeded, Met, SubstantiallyMet)  
  *   
  * AuditStatus (Enum: Pending, Cleared, FinancialHold)  
  *   
  * DigitalCertificateURL (String), CertificateQRCode (String, Unique)  
  *   
  * TransitionStatus (Enum: K12\_Internal, External\_Primary, Alumni)  
  *   
* **Related Entities:**  
* 

  * K12TransitionPipeline: TransitionID (PK), StudentID (FK), SourceCampusID (FK), TargetPrimarySchoolID (FK), TargetGrade (String: "Grade 1"), FastTrackApplied (Boolean), Status (Enum: Applied, Confirmed, Enrolled).  
  *   
  * DigitalPortfolioPackage: PackageID (PK), StudentID (FK), AcademicRecordPDF (String), HealthRecordPDF (String), DigitalSignatureHash (String), GeneratedAt (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-ADM-018: Báo cáo Đánh giá Chuẩn Phát triển Trẻ 5 Tuổi Điện tử (5-Year-Old Child Development Report).  
*   
* FRM-ADM-019: Giấy Chứng nhận Hoàn thành Chương trình Mầm non Điện tử (Digital Certificate of Completion).  
*   
* FRM-ADM-023: Phiếu Đăng ký Chuyển cấp Lớp 1 K-12 Fast-Track (K-12 Primary School Transition Form).  
*   
* FRM-ADM-024: Bảng Kiểm tra Điều kiện Tốt nghiệp Mầm non (Graduation Audit Checklist).  
* 

## **18\. ERP Functional Requirements**

* **FR-ADM-018 (MUST):** Tích hợp Graduation Audit Engine: Tự động quét và đối soát 04 điều kiện tốt nghiệp (Chương trình, Đánh giá 5 tuổi, Y tế, Tài chính) cho toàn bộ học sinh Khối 5–6 tuổi vào ngày 15/05.  
*   
* **FR-ADM-019 (MUST):** Tích hợp Digital Signature & Dynamic QR Generator: Cho phép Hiệu trưởng ký số hàng loạt trên Giấy Chứng nhận Tốt nghiệp và tự động sinh mã QR xác thực học bạ.  
*   
* **FR-ADM-020 (MUST):** Phân hệ K-12 Transition Pipeline: Tự động đồng bộ 100% dữ liệu Học sinh, Hồ sơ Y tế, Mã Student ID sang Phân hệ Tuyển sinh Lớp 1 Tiểu học cùng hệ thống.  
*   
* **FR-ADM-021 (MUST):** Hỗ trợ xuất file Bộ Học bạ Digital (Digital Portfolio Package) định dạng Song ngữ PDF đạt chuẩn nộp trường Tiểu học quốc tế/ngoài công lập.  
*   
* **FR-FIN-018 (MUST):** Tự động chuyển đổi Tiền đặt cọc/Tài khoản gửi dư của học sinh tốt nghiệp ra trường ngoài thành Phiếu chi hoàn tiền (Refund Voucher) theo SOP-ADM-005.  
* 

## **19\. Automation Opportunities**

* **AUTO-ADM-018 (RULE ENGINE):** Tự động quét và kích hoạt đợt Graduation Audit vào 00:00 AM ngày 15/05 hàng năm.  
*   
* **AUTO-ADM-019 (INTEGRATION):** Tự động đóng gói Học bạ Digital PDF đính kèm biểu đồ tăng trưởng WHO và kết quả đánh giá 5 tuổi ngay khi Hiệu trưởng bấm Ký số.  
*   
* **AUTO-ADM-020 (K-12 PIPELINE):** Tự động gửi thông báo Mời Nhập học Lớp 1 K-12 Fast-Track kèm ưu đãi giữ chỗ cho Phụ huynh mầm non tốt nghiệp nội bộ.  
*   
* **AUTO-ADM-021 (STATUS SHIFT):** Tự động chuyển trạng thái học sinh sang Alumni và chuyển tài khoản App Phụ huynh sang chế độ Read-Only sau Lễ Tốt nghiệp.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| Nhắc Hoàn thiện Đánh giá Trẻ 5 Tuổi & Sổ Y tế | GVCN & Y tế | Mobile App Push \+ ERP Alert | 01/05 hàng năm |
| Cảnh báo Học sinh Bị Khóa Tốt nghiệp do Nợ Phí | Kế toán & Phụ huynh | ERP High Alert \+ App Push | 15/05 hàng năm |
| Mời Đăng ký Chuyển cấp Lớp 1 K-12 Fast-Track | Phụ huynh Khối 5-6y | Zalo OA \+ Mobile App Push | 01/03 hàng năm |
| Phát hành Giấy Chứng nhận Tốt nghiệp Điện tử | Phụ huynh | Mobile App Push \+ Email | Ngay Lễ Tốt nghiệp |
| Xác nhận Chuyển Hồ sơ Lớp 1 K-12 Thành công | Phụ huynh & BGH Tiểu học | App Push \+ Email | Immediate khi confirm |

## **21\. Permission Matrix (RBAC)**

| Role | View Graduation Audit | Perform 5Y Evaluation | Sign Digital Certificate | Initiate K-12 Transition | Export Digital Portfolio |
| :---- | :---- | :---- | :---- | :---- | :---- |
| GVCN Khối 5-6y | Assigned Class | Full Class | No | View Only | Read Only |
| Cán bộ Y tế | Campus Health | Health Only | No | No | Read Only |
| Hiệu trưởng Cơ sở | Campus Full | Read Only | Full (Digital Sign) | Full Campus | Full Campus |
| Admission K-12 | Full Enterprise | Read Only | No | Full Pipeline | Full Enterprise |
| Kế toán Phí | Financial Audit | No | No | Financial Check | No |
| Phụ huynh | Own Child | No | No | Confirm Fast-Track | Download Own PDF |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Kết quả chạy tự động của Graduation Audit Engine: Danh sách học sinh Pass/Fail và lý do cụ thể.  
*   
* Mọi thao tác bổ sung/chỉnh sửa Đánh giá Chuẩn phát triển trẻ 5 tuổi của Giáo viên.  
*   
* Lịch sử Ký số PKI của Hiệu trưởng Cơ sở trên Giấy Chứng nhận Tốt nghiệp Điện tử (Timestamp, Digital Certificate Hash).  
*   
* Nhật ký kích hoạt K-12 Transition Pipeline: Thời gian chuyển hồ sơ mầm non sang Phân hệ Lớp 1 Tiểu học.  
*   
* Lịch sử xuất file Báo cáo Học bạ Digital PDF của Phụ huynh.  
* 

## **23\. Internal Controls**

* **Four-Pillar Graduation Audit Gate:** Chặn cứng hệ thống không cho phép phát hành Giấy chứng nhận tốt nghiệp chính thức nếu chưa đạt đủ 04 cờ: Chương trình, Đánh giá 5 tuổi, Y tế, Tài chính.  
*   
* **PKI Digital Signature Enforcement:** Giấy chứng nhận tốt nghiệp điện tử bắt buộc phải có chữ ký số PKI hợp pháp của Hiệu trưởng Cơ sở để chống làm giả giấy tờ.  
*   
* **Single ID Continuity Verification:** Tự động đối soát khóa cứng mã Student ID khi chuyển hồ sơ mầm non sang cấp Tiểu học K-12.  
*   
* **Data Protection on Alumni Shift:** Chuyển tài khoản App Phụ huynh sang chế độ Alumni Read-Only sau khi tốt nghiệp để bảo vệ dữ liệu nội bộ trường học.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Hoàn tất Graduation Audit** | Thời gian từ khi kích hoạt đợt audit đến khi chốt danh sách | **\<= 48 giờ (Xong trước 17/05)** | Academic Manager & ERP |
| **Tỷ lệ Chuyển cấp Nội bộ K-12 (K-12 Retention Rate)** | (Số học sinh mầm non học tiếp Lớp 1 / Tổng tốt nghiệp) \* 100 | **\>= 65%** | Admission Mgr K-12 |
| **Tỷ lệ Phát hành Học bạ Digital Đúng Hạn** | (Số học bạ digital phát hành đúng Lễ tốt nghiệp / Tổng số) \* 100 | **100%** | Hiệu trưởng & IT Admin |
| **Tỷ lệ Bảo toàn Hồ sơ Y tế & Học bạ K-12** | (Số hồ sơ sync đầy đủ sang Lớp 1 / Tổng học sinh K-12) \* 100 | **100% (Zero Loss)** | Cán bộ Y tế & IT |

## **25\. Dashboard / Report**

* **Graduation Audit & Readiness Live Monitor (BGH & Giáo vụ):** Màn hình đếm ngược tiến độ hoàn thiện hồ sơ tốt nghiệp khối 5–6 tuổi, Bảng cảnh báo học sinh chưa đạt audit (Thiếu y tế, nợ phí, thiếu đánh giá).  
*   
* **K-12 Transition Pipeline Analytics (CFO & Tuyển sinh K-12):** Báo cáo tỷ lệ học sinh mầm non tốt nghiệp chuyển sang Lớp 1 Tiểu học hệ thống liên cấp, Phân tích lý do không học tiếp Lớp 1 nội bộ.  
*   
* **Executive Alumni & Heritage Report (CEO & Board):** Báo cáo tổng hợp số lượng học sinh tốt nghiệp ra trường theo năm/cơ sở, Thống kê danh sách Alumni phục vụ các sự kiện kỷ niệm thành lập trường.  
* 

## **26\. Integration**

* **Student Information System & Attendance (SOP-SIS-001 & SOP-SIS-002):** Lấy dữ liệu điểm danh chuyên cần, báo cáo phát triển 5 tuổi làm đầu vào Audit.  
*   
* **Student Health & Immunization (SOP-MED-001):** Trích xuất hồ sơ sức khỏe và lịch sử tiêm chủng đóng gói vào Học bạ Digital.  
*   
* **Tuition & Finance (SOP-FIN-001 & SOP-ADM-005):** Kiểm tra công nợ học phí và tự động kích hoạt quyết toán cọc/hoàn tiền.  
*   
* **Primary School Admission Module (K-12 Transition):** Đồng bộ 1-Click toàn bộ dữ liệu học sinh mầm non sang Phân hệ Tuyển sinh Lớp 1 Tiểu học.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Chảy máu học sinh mầm non tốt nghiệp sang trường Tiểu học ngoài** | High | Medium | K-12 Transition Fast-Track; Giữ chỗ ưu đãi & Miễn phí test Lớp 1\. | Admission Mgr K-12 |
| **Phát hành Giấy chứng nhận tốt nghiệp cho học sinh đang nợ phí lớn** | High | Low | ERP Financial Hold Gate khóa phát hành Certificate nếu chưa thanh toán nợ. | Kế toán trưởng |
| **Làm giả hoặc rò rỉ Báo cáo Học bạ Digital** | High | Low | Đóng gói PDF mã hóa Chữ ký số PKI Hiệu trưởng & Mã QR Code xác thực. | IT Admin & CISO |
| **Thất lạc hồ sơ dị ứng y tế khi trẻ bước vào Lớp 1** | Critical | Low | Auto K-12 Profile Sync giữ nguyên Mã Student ID & Đồng bộ 100% Y tế. | Cán bộ Y tế & IT |

## **28\. Acceptance Criteria**

* **Given:** Đúng 00:00 AM ngày 15/05/2026.  
*   
* **When:** Tiến trình Graduation Audit Engine chạy tự động cho Khối 5–6 tuổi.  
*   
* **Then:** ERP tự động quét 100 học sinh Khối Lá. Kết quả: 92 học sinh đạt 100% 04 cờ audit (Audit Cleared), 08 học sinh bị cờ đỏ (05 học sinh nợ tiền ăn, 03 học sinh thiếu sổ tiêm chủng). ERP tự động phát Task xử lý khẩn cấp cho Kế toán và Y tế trong 24 giờ.  
*   
* **Given:** Học sinh B đạt Audit Cleared và Phụ huynh đăng ký học tiếp Lớp 1 tại Trường Liên cấp cùng Tập đoàn.  
*   
* **When:** Phụ huynh bấm "Xác nhận Nhập học Lớp 1 Fast-Track" trên Mobile App.  
*   
* **Then:** ERP tự động chuyển 100% Hồ sơ Học sinh, Hồ sơ Y tế và Mã Student ID của Học sinh B sang Phân hệ Tuyển sinh Lớp 1 Tiểu học, tự động miễn lệ phí test đầu vào và phát hành Thông báo Phí Lớp 1 trên App Phụ huynh mà không cần nộp lại bất kỳ giấy tờ nào.  
* 

## **29\. Test Scenarios**

1. **Happy Path Graduation & K-12 Transition Test:** Kích hoạt Graduation Audit \-\> 100% Pass \-\> Hiệu trưởng Ký số Digital Certificate \-\> Phụ huynh nhận Digital Portfolio trên App \-\> Bấm Confirm K-12 Fast-Track \-\> ERP Auto Sync Hồ sơ sang Lớp 1 Tiểu học thành công.  
2.   
3. **Financial Hold Blocking Test:** Học sinh nợ 2.000.000 VNĐ tiền ăn \-\> Chạy Graduation Audit \-\> Kiểm tra xem ERP có đặt trạng thái Financial Hold và khóa không cho phát hành Digital Certificate không.  
4.   
5. **Digital Signature Verification Test:** Xuất file PDF Giấy Chứng nhận Tốt nghiệp \-\> Quét mã QR Code trên giấy \-\> Kiểm tra xem đường link có dẫn về Trang Xác thực Chính thức của Tập đoàn hiển thị đúng Chữ ký số PKI Hiệu trưởng không.  
6.   
7. **External Primary School Portfolio Export Test:** Phụ huynh học sinh chuyển sang trường quốc tế bên ngoài chọn "Export International Portfolio" \-\> Kiểm tra xem ERP có xuất file PDF Học bạ Song ngữ (Việt \- Anh) chuẩn đính kèm Biểu đồ WHO không.  
8.   
9. **Alumni Account Shift Test:** Sau Lễ Tốt nghiệp \-\> Kiểm tra xem trạng thái học sinh có đổi sang Graduated / Alumni và tài khoản App Phụ huynh có chuyển sang chế độ Read-Only không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình Khung tiêu chí Đánh giá Trẻ 5 tuổi theo Bộ GD&ĐT; Cấu hình quy tắc Graduation Audit 4 cờ; Cấu hình Chữ ký số PKI Hiệu trưởng; Cấu hình luồng K-12 Transition Fast-Track.  
*   
* **Master Data Migration:** Import danh mục các Trường Tiểu học trong hệ thống liên cấp; Import mẫu Giấy chứng nhận và Báo cáo học bạ digital chuẩn.  
*   
* **Hardware & Integration:** Tích hợp Dịch vụ Chữ ký số PKI (VNPT/Viettel/MISA CA); Kết nối Phân hệ Tuyển sinh Lớp 1 Tiểu học (Primary School Module).  
*   
* **Training & Change Management:** Đào tạo Giáo viên Khối 5–6 tuổi quy trình đánh giá chuẩn trẻ 5 tuổi trên Tablet; Đào tạo Ban Giám hiệu quy trình ký số hàng loạt Học bạ Digital; Đào tạo Đội ngũ Tuyển sinh K-12 quy trình tư vấn và tiếp nhận học sinh mầm non chuyển cấp.  
* 

## **BÁO CÁO TIẾN ĐỘ THIẾT KẾ KIẾN TRÚC ERP MẦM NON (UPDATED PROGRESS REPORT)**

### **1\. Trạng thái Triển khai SOP Core (Core SOP Implementation Status)**

* **Tổng số SOP Core cần chuẩn hóa:** **25 SOP Nền tảng** (Bao phủ đầy đủ 75 Domain L1–L3).  
*   
* **Đã hoàn thành chuẩn hóa (24 SOPs):**  
* 

  1. SOP-CRM-001: Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment (Domain 01, 02, 03).  
  2.   
  3. SOP-MKT-001: Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI (Domain 01, 02, 57, 58, 70).  
  4.   
  5. SOP-ADM-003: Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học (Domain 03, 06, 07).  
  6.   
  7. SOP-ADM-005: Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng (Domain 06, 07, 08, 09, 11, 55).  
  8.   
  9. SOP-ADM-006: Học sinh Tốt nghiệp Mầm non, Học bạ Digital & Chuyển cấp Lên Tiểu học K-12 (Domain 04, 06, 13, 22, 55, 60).  
  10.   
  11. SOP-ADM-007: Quản lý Học sinh Chuyển Lớp, Chuyển Cơ sở (Inter-Campus Transfer) & Đồng bộ Hồ sơ (Domain 04, 06, 11, 12, 55, 71).  
  12.   
  13. SOP-SIS-001: Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày (Domain 04, 18, 19, 20, 26).  
  14.   
  15. SOP-SIS-002: Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ (Domain 21, 22, 62).  
  16.   
  17. SOP-ACA-001: Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & Thời khóa biểu (Domain 13, 14, 15, 16, 17, 41).  
  18.   
  19. SOP-FIN-001: Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn (Domain 08, 09, 10, 11, 55).  
  20.   
  21. SOP-FIN-002: Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành (Domain 55, 56, 57, 58, 59, 60).  
  22.   
  23. SOP-FIN-003: Lập Kế hoạch Ngân sách Vận hành (Budgeting), Kiểm soát Chi tiêu & Dự báo Dòng tiền 12 Tuần (Domain 55, 56, 57, 58, 70, 71).  
  24.   
  25. SOP-KIT-001: Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h (Domain 27, 28, 29, 30, 31).  
  26.   
  27. SOP-HR-001: Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương (Domain 45, 47, 48, 49, 51, 52).  
  28.   
  29. SOP-HR-002: Đào tạo Nhân sự (Training Management), Đánh giá KPI/OKR & Khen thưởng / Kỷ luật (Domain 45, 47, 48, 53, 54, 67, 75).  
  30.   
  31. SOP-BUS-001: Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe (Domain 42, 43, 44, 26).  
  32.   
  33. SOP-MED-001: Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố (Domain 23, 24, 25, 26).  
  34.   
  35. SOP-PUR-001: Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging (Domain 32, 33, 34, 35, 36, 37, 38, 55, 57).  
  36.   
  37. SOP-INV-001: Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục, Xuất kho Lớp học & Kiểm kê Kho Định kỳ (Domain 32, 38, 41, 55, 69).  
  38.   
  39. SOP-FAC-001: Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk (Domain 38, 39, 40, 41, 64, 68).  
  40.   
  41. SOP-SEC-001: Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log (Domain 26, 67, 71, 72, 73, 75).  
  42.   
  43. SOP-GOV-001: Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số Hệ thống & BI Dashboard (Domain 67, 70, 71, 74, 75).  
  44.   
  45. SOP-QA-001: Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở (QA Audit) & Kiểm toán Nội bộ (Domain 66, 67, 68, 69, 70, 71).  
  46.   
  47. SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management), Service Request & CSAT/NPS (Domain 62, 63, 64, 65, 66, 68, 70).  
  48.   
* **Số SOP Core còn lại cần tiếp tục thực hiện:** **01 SOP cuối cùng**.

### **2\. Ma trận Phủ sóng Vận hành Enterprise (Value Chain Matrix)**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                                   ENTERPRISE VALUE CHAIN ERP MẦM NON                                           │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ CUSTOMER ACQUISITION & ADM     │ ACADEMIC & DAILY CARE          │ KITCHEN, LOGISTICS & FACILITY  │ GOVERNANCE, FIN & SECURITY  │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-FIN-003: Budget & Cash│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-INV-001: Inventory & Stock│ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-006: Graduation & K12│                                │ • SOP-FAC-001: Facility & PCCC │ • SOP-HR-002: Training & KPI│  
│ • SOP-ADM-007: Transfer & Sync │                                │                                │ • SOP-SEC-001: RBAC & Security│  
│ • SOP-CS-001: Complaints & CSAT│                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

# Thẻ 27

# **SOP-GOV-004 — QUY TRÌNH QUẢN TRỊ RỦI RO VẬN HÀNH, XỬ LÝ KHỦNG HOẢNG TRUYỀN THÔNG VÀ BẢO VỆ UY TÍN THƯƠNG HIỆU**

## **1\. Thông tin tài liệu**

* **SOP ID:** SOP-GOV-004  
*   
* **Tên SOP:** Quy trình Quản trị Rủi ro Vận hành, Xử lý Khủng hoảng Truyền thông và Bảo vệ Uy tín Thương hiệu  
*   
* **Module ERP:** Risk Management (68), Compliance Management (67), Parent Communication (62), Notification Management (63), Management Dashboard & BI (70), Multi-campus Management (71), Audit Log (73)  
*   
* **Process Owner:** Giám đốc Truyền thông & Quản trị Rủi ro (Group PR & Risk Director) / Giám đốc Vận hành (COO)  
*   
* **Department:** Khối Truyền thông & Đối ngoại, Phòng Pháp chế & Tuân thủ, Ban Giám hiệu các Cơ sở, Ban Điều hành Tập đoàn  
*   
* **Phiên bản:** v1.0  
*   
* **Trạng thái:** Ready for Baseline  
*   
* **Ngày hiệu lực:** 01/09/2026  
*   
* **Người soạn:** Senior Business Analyst & ERP Enterprise Architect  
*   
* **Người kiểm tra:** Enterprise Architect & CTO  
*   
* **Người phê duyệt:** Tổng Giám đốc (CEO) / Board of Directors  
*   
* **Chu kỳ review:** 06 tháng/lần  
* 

## **2\. Mục đích**

Chuẩn hóa và tự động hóa toàn bộ khung phát hiện, cảnh báo sớm và xử lý khủng hoảng cho hệ thống mầm non đa cơ sở: từ việc tự động bắt giữ các chỉ báo rủi ro cờ đỏ từ các phân hệ vận hành (SOP-MED-001, SOP-KIT-001, SOP-BUS-001, SOP-CS-001), kích hoạt Kịch bản Phản ứng Khẩn cấp (Crisis Protocol), thành lập Phòng Chỉ huy Khủng hoảng (Crisis War Room) trên ERP, áp dụng Quy tắc 1 Đầu mối Phát ngôn (Single Spokesperson Rule), phong tỏa bảo vệ dữ liệu nhạy cảm trẻ em, đối soát chứng cứ pháp lý (CCTV & Audit Log), đến việc phát hành thông điệp truyền thông chuẩn xác và triển khai Hành động Khắc phục (CAPA) nhằm bảo vệ tối đa an toàn của học sinh và uy tín thương hiệu nhà trường.

## **3\. Phạm vi áp dụng**

* **Cơ sở:** Tất cả các cơ sở mầm non, nhóm trẻ, trường song ngữ/quốc tế thành viên và các đơn vị dịch vụ thuộc tập đoàn.  
*   
* **Phòng ban:** Khối Truyền thông & PR, Phòng Pháp chế, Ban Giám hiệu các Cơ sở, Khối Giáo viên, Bộ phận Y tế, Bếp ăn, Xe bus, An ninh/Bảo vệ, Chăm sóc Khách hàng, Ban Điều hành Tập đoàn.  
*   
* **Đối tượng:** Các sự cố an toàn mầm non nghiêm trọng (Cờ đỏ), các bài đăng bóc phốt/khiếu nại lan truyền trên Mạng xã hội (Viral Social Crisis), các yêu cầu làm việc từ Báo chí / Truyền hình / Công an / Sở-Phòng GD&ĐT.  
*   
* **Trường hợp không áp dụng:** Các khiếu nại dịch vụ nhỏ lẻ chưa phát tán ra truyền thông ngoài công lập (áp dụng SOP-CS-001: Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh).  
* 

## **4\. Thuật ngữ và định nghĩa**

* **Crisis Protocol (Kịch bản Ứng phó Khủng hoảng):** Tập hợp các quy tắc, biểu mẫu và luồng phê duyệt khẩn cấp được kích hoạt trên ERP khi sự cố vận hành chạm ngưỡng rủi ro truyền thông.  
*   
* **Crisis War Room (Phòng Chỉ huy Khủng hoảng ERP):** Màn hình tương tác và kênh giao tiếp bảo mật 24/7 trên ERP dành riêng cho Ban Chỉ đạo Khủng hoảng (CEO, COO, CMO/PR Head, Legal Head, Hiệu trưởng) để điều phối xử lý sự cố.  
*   
* **1-Spokesperson Rule (Quy tắc 1 Đầu mối Phát ngôn):** Quy định cấm tuyệt đối mọi Cán bộ Giáo viên Nhân viên (CBGVNV) tự ý phát ngôn, trả lời phỏng vấn hoặc đăng tải bài viết cá nhân liên quan đến sự cố; chỉ có Người phát ngôn được ủy quyền chính thức từ Tập đoàn mới có quyền phát ngôn.  
*   
* **Emergency Media Lock (Phong tỏa Truyền thông Khẩn cấp):** Tính năng tự động tạm khóa quyền trích xuất dữ liệu, tạm khóa đăng ảnh công khai và đặt cờ bảo mật cao đối với toàn bộ hồ sơ liên quan đến sự cố trên ERP.  
* 

## **5\. Vai trò và trách nhiệm (RACI)**

| Activity | Responsible | Accountable | Consulted | Informed |
| :---- | :---- | :---- | :---- | :---- |
| Bật Cờ Cảnh báo Rủi ro & Báo cáo Sự cố Cờ đỏ | Người phát hiện / BGH | Hiệu trưởng Cơ sở | CSKH / Y tế / Bus | PR & Risk Director |
| Thẩm định Cấp độ Khủng hoảng & Kích hoạt War Room | PR & Risk Director | Group COO | Legal Manager | CEO / Board |
| Trích xuất Chứng cứ Pháp lý (CCTV, Log, Hồ sơ) | IT Security / Legal | Group CISO / Legal | BGH Cơ sở | PR War Room |
| Soạn thảo Thông cáo Báo chí & Thông điệp Phụ huynh | PR Manager | CMO / PR Director | Legal Manager | CEO / Board |
| Phê duyệt Phát ngôn & Trả lời Báo chí / Cơ quan Chức năng | Spokesperson / CEO | Tổng Giám đốc (CEO) | Legal / PR Director | Toàn thể CBGVNV |
| Triển khai Khắc phục Vận hành (CAPA) & Khôi phục Thương hiệu | Group QA / BGH | Group COO | PR Director | Phụ huynh / Board |

*Ghi chú: Việc xử lý khủng hoảng truyền thông, phát ngôn báo chí, làm việc với cơ quan điều tra/quản lý nhà nước và bảo vệ hình ảnh trẻ em cần kiểm tra/đối chiếu quy định hiện hành của Pháp luật Việt Nam (Luật Báo chí 2016, Luật Trẻ em 2016, Luật An ninh mạng 2018, Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân) trước khi áp dụng chính thức.*

## **6\. Điều kiện đầu vào**

* **Master Data:** Danh mục Kịch bản Rủi ro (CrisisScenarioMaster), Ma trận Phân cấp Người phát ngôn (SpokespersonMatrixMaster), Danh mục Cơ quan Báo chí & Quản lý (MediaContactMaster).  
*   
* **Sự cố Trigger từ SOP khác:**  
* 

  1. Sự cố Y tế / Tai nạn Cấp độ 3 từ SOP-MED-001.  
  2.   
  3. Sự cố Bếp ăn / Ngộ độc Thực phẩm từ SOP-KIT-001.  
  4.   
  5. Sự cố Xe bus / Bỏ quên Trẻ từ SOP-BUS-001.  
  6.   
  7. Khiếu nại Phụ huynh Severity Level 4 từ SOP-CS-001.  
  8.   
  9. Cảnh báo Lỗi An toàn / PCCC từ SOP-FAC-001 hoặc SOP-QA-001.  
  10. 

## **7\. Trigger**

* **Tự động từ ERP:** Hệ thống phát hiện sự cố Cờ đỏ (Red-Flag / Severity Level 4\) từ bất kỳ phân hệ nào.  
*   
* **Phát hiện từ Mạng xã hội (Social Listening):** Bài đăng bóc phốt/khiếu nại về trường đạt ngưỡng lan truyền (\> 100 lượt chia sẻ hoặc xuất hiện trên các Fanpage/Hội nhóm lớn).  
*   
* **Phát sinh Thực địa:** Phóng viên Báo chí, Truyền hình hoặc Cơ quan Công an/Thanh tra đến trực tiếp cơ sở yêu cầu làm việc.  
* 

## **8\. Quy trình AS-IS**

* Khi xảy ra sự cố tại trường (như trẻ bị vết bầm, ngộ độc thực phẩm nhẹ), giáo viên hoặc Hiệu trưởng cơ sở cố gắng giấu thông tin, tự ý nhắn tin giải thích không đồng nhất với Phụ huynh.  
*   
* Phụ huynh bức xúc đăng bài bóc phốt lên Facebook kèm hình ảnh/video. Bài viết nhanh chóng đạt hàng ngàn lượt share.  
*   
* Ban Điều hành ở HQ không hay biết tin tức cho đến khi báo chí gọi điện hỏi.  
*   
* Nhiều nhân viên trong trường tự ý nhảy vào bài đăng Facebook comment tranh cãi với Phụ huynh, làm khủng hoảng bùng phát nghiêm trọng hơn.  
*   
* Trường lúng túng ra thông cáo báo chí vội vàng, thông tin mâu thuẫn với sự thật làm uy tín thương hiệu bị hủy hoại.  
*   
* **Hệ quả:** Hàng loạt Phụ huynh xin rút học (Mass Churn); cơ quan quản lý đình chỉ hoạt động cơ sở; thương hiệu chịu tổn thất tài chính và uy tín kéo dài nhiều năm.  
* 

## **9\. Pain Points / Risk**

* **Delayed HQ Awareness:** Thông tin sự cố bị che giấu ở cấp cơ sở, HQ hoàn toàn thụ động khi khủng hoảng bùng phát trên truyền thông.  
*   
* **Uncontrolled Employee Statements:** Nhân viên tự ý phát ngôn/tranh cãi trên Mạng xã hội gây bất lợi về mặt pháp lý và hình ảnh.  
*   
* **Inconsistent & Contradictory Statements:** Thông điệp đưa ra cho Phụ huynh và Báo chí mâu thuẫn với dữ liệu chứng cứ thực tế (CCTV, Log y tế, Điểm danh).  
*   
* **Child Data Privacy Violation:** Việc rò rỉ video CCTV hoặc hình ảnh sự cố của trẻ trong quá trình tranh cãi vi phạm nghiêm trọng Luật Trẻ em và Nghị định 13/2023/NĐ-CP.  
* 

## **10\. Quy trình TO-BE**

### **Giai đoạn 1: Phát hiện Rủi ro, Phân loại Cấp độ & Kích hoạt War Room (Risk Detection & War Room Activation)**

* **Step 01:**  
* 

  * **Actor:** ERP System & người phát hiện (BGH / CSKH / PR Exec).  
  *   
  * **Action:** Ngay khi phát sinh sự cố Cờ đỏ hoặc phát hiện bài đăng bóc phốt trên MXH, người phát hiện bấm nút "Báo cáo Khủng hoảng" (Report Crisis Event) trên App. Nếu trigger từ các SOP khác (SOP-MED-001, SOP-KIT-001, SOP-BUS-001, SOP-CS-001), ERP tự động khởi tạo Hồ sơ Khủng hoảng (Crisis Case).  
  *   
  * **ERP Function:** Automated Crisis Event Ingestion & Red-Flag Escalation.  
  *   
  * **Input:** Loại sự cố, Cơ sở phát sinh, Ảnh/Link minh chứng, Mức độ lan truyền.  
  *   
  * **Output:** Hồ sơ Khủng hoảng Mới (New Crisis Case).  
  *   
  * **Business Rule:** BR-GOV-040: Tự động phân loại Cấp độ Khủng hoảng (Crisis Level):  
  * 

    * *Level 1 (Thấp \- Nội bộ):* Sự cố được kiểm soát tại cơ sở, chưa phát tán MXH.  
    *   
    * *Level 2 (Trung bình \- Cảnh báo):* Có bài đăng MXH nhưng lượng tương tác thấp (\< 50 share).  
    *   
    * *Level 3 (Nghiêm trọng \- Khủng hoảng):* Bài đăng MXH viral (\> 50 share), hoặc có thương vong/ngộ độc đông người, hoặc Báo chí/Công an liên hệ.  
    *   
  * **Status Before:** N/A.  
  *   
  * **Status After:** Crisis Case Created / Level Assigned.  
  *   
  * **SLA:** Real-time (\<= 60 giây).  
  *   
  * **Notification:** Bật còi báo động khẩn cấp tới điện thoại CEO, COO, CMO, Legal Head và Hiệu trưởng.  
  *   
* **Step 02:**  
* 

  * **Actor:** Group PR & Risk Director & Group COO.  
  *   
  * **Action:** Mở màn hình ERP, xác nhận cấp độ rủi ro và bấm "Kích hoạt Phòng Chỉ huy Khủng hoảng" (Activate Crisis War Room). ERP tự động tạo không gian làm việc bảo mật (Secure War Room Channel) và thêm các thành viên Ban Chỉ đạo (CEO, COO, PR Director, Legal Manager, Hiệu trưởng Cơ sở).  
  *   
  * **ERP Function:** Crisis War Room Activation & Stakeholder Notification.  
  *   
  * **Input:** Confirmed Crisis Level.  
  *   
  * **Output:** Crisis War Room Active 24/7 trên ERP.  
  *   
  * **Business Rule:** BR-GOV-041: Phòng Chỉ huy Khủng hoảng phải được kích hoạt trong vòng **15 phút** kể từ khi phát hiện sự cố Level 3\.  
  *   
  * **Status Before:** Case Created.  
  *   
  * **Status After:** War Room Active.  
  *   
  * **SLA:** \<= 15 phút.  
  *   
  * **Notification:** SMS \+ Call \+ App Push khẩn cấp cho tất cả thành viên War Room.  
  * 

### **Giai đoạn 2: Phong tỏa Thông tin, Khóa Bảo vệ Dữ liệu & Trích xuất Chứng cứ (Media Lock & Fact-Checking)**

* **Step 03:**  
* 

  * **Actor:** ERP System (Emergency Data & Media Lock Engine) & IT Security.  
  *   
  * **Action:** Ngay khi War Room được kích hoạt, ERP tự động thực thi chế độ Emergency Media Lock:  
  * 

    * Tạm khóa tính năng Export dữ liệu học sinh thuộc cơ sở bị sự cố.  
    *   
    * Đặt cờ bảo mật cao (Highly Restricted) đối với toàn bộ video CCTV, Hồ sơ Y tế, Nhật ký Xe bus liên quan.  
    *   
    * Tự động phát thông báo Quy tắc 1 Đầu mối Phát ngôn (Single Spokesperson Rule Mandate) tới App Mobile của 100% CBGVNV toàn chuỗi.  
    *   
  * **ERP Function:** Automated Data Lock & Employee Notification Enforcement.  
  *   
  * **Input:** Crisis Case ID, Campus ID.  
  *   
  * **Output:** Dữ liệu sự cố được phong tỏa bảo mật; 100% Nhân viên nhận thông báo cấm phát ngôn cá nhân.  
  *   
  * **Business Rule:** BR-GOV-042: Cấm tuyệt đối mọi nhân viên tự ý trả lời phỏng vấn, bình luận hoặc đăng tải thông tin sự cố trên MXH. Vi phạm quy tắc này xử lý kỷ luật sa thải theo SOP-HR-002.  
  *   
  * **Status Before:** War Room Active.  
  *   
  * **Status After:** Data Locked / Employee Notification Sent.  
  *   
  * **SLA:** Real-time (\<= 1 phút).  
  *   
  * **Notification:** Push Notification khẩn gửi 100% Nhân viên Tập đoàn.  
  *   
* **Step 04:**  
* 

  * **Actor:** CISO, Legal Manager & Cán bộ Kiểm toán Nội bộ (SOP-QA-001).  
  *   
  * **Action:** Đội ngũ chuyên trách trích xuất bằng chứng thực tế từ ERP: Video CCTV gốc (có băm SHA-256 xác thực không bị can thiệp), Nhật ký điểm danh gate/bus (SOP-SIS-001/SOP-BUS-001), Nhật ký cho uống thuốc/y tế (SOP-MED-001), Nhật ký lưu mẫu bếp ăn (SOP-KIT-001), và Audit Log hệ thống. Đưa toàn bộ chứng cứ vào Thư mục Bằng chứng Sự cố (Crisis Evidence Locker).  
  *   
  * **ERP Function:** Forensic Audit Log & Evidence Collection Locker.  
  *   
  * **Input:** Mốc thời gian sự cố, Mã Học sinh, Mã Cơ sở.  
  *   
  * **Output:** Bộ Hồ sơ Chứng cứ Thực tế (Verified Fact Sheet & Evidence Package).  
  *   
  * **Business Rule:** Dữ liệu chứng cứ trích xuất bắt buộc phải có chữ ký số PKI của CISO và Legal Manager để bảo đảm tính pháp lý trước Cơ quan Công an / Tòa án.  
  *   
  * **Status Before:** Data Locked.  
  *   
  * **Status After:** Evidence Verified.  
  *   
  * **SLA:** Complete trong \<= 2 giờ.  
  *   
  * **Notification:** Bảng Sự thật (Fact Sheet) cập nhật trực tiếp lên War Room.  
  * 

### **Giai đoạn 3: Soạn thảo Thông điệp, Phê duyệt Phát ngôn & Làm việc Đối ngoại (Statement Approval & Media Response)**

* **Step 05:**  
* 

  * **Actor:** PR Manager & Legal Manager.  
  *   
  * **Action:** Dựa trên Bảng Sự thật đã xác minh, PR Manager soạn thảo: (1) Thông điệp gửi Phụ huynh Toàn trường; (2) Thông cáo Báo chí (Press Release); (3) Kịch bản Trả lời Phỏng vấn (Q\&A Framework). Legal Manager thẩm định yếu tố pháp lý và bảo vệ quyền riêng tư trẻ em.  
  *   
  * **ERP Function:** Crisis Statement Drafting & Multi-Level Approval.  
  *   
  * **Input:** Verified Fact Sheet \+ Mẫu Thông cáo Báo chí.  
  *   
  * **Output:** Dự thảo Thông điệp Truyền thông (Draft Crisis Statement).  
  *   
  * **Business Rule:** BR-GOV-043: Mọi thông điệp truyền thông ra bên ngoài bắt buộc phải trải qua Luồng duyệt 3 Cấp: PR Director \-\> Legal Manager \-\> Tổng Giám đốc (CEO).  
  *   
  * **Status Before:** Evidence Verified.  
  *   
  * **Status After:** Statement Approved.  
  *   
  * **SLA:** Max 2 giờ soạn thảo & phê duyệt (Phát hành thông điệp đầu tiên trong vòng \<= 4 giờ từ khi bùng phát).  
  *   
  * **Notification:** Alert gửi CEO bấm Approve.  
  *   
* **Step 06:**  
* 

  * **Actor:** CEO / Người phát ngôn Chính thức (Spokesperson) & BGH Cơ sở.  
  *   
  * **Action:**  
  * 

    * *Đối với Phụ huynh:* Gửi Thông điệp Chính thức qua Mobile App Phụ huynh và Zalo OA chính thức của Trường.  
    *   
    * *Đối với Báo chí / Cơ quan Chức năng:* Người phát ngôn gửi Thông cáo Báo chí hoặc chủ trì Buổi làm việc/Họp báo chính thức.  
    *   
    * *Đối với Báo chí đến Trường trực tiếp:* Bảo vệ/Lễ tân tiếp đón lịch sự, trao Giấy Hướng dẫn Liên hệ Truyền thông và chuyển thông tin cho Người phát ngôn.  
    *   
  * **ERP Function:** Official Statement Dispatcher & Media Contact Log.  
  *   
  * **Input:** Approved Statement, Danh sách Báo chí / Phụ huynh.  
  *   
  * **Output:** Thông điệp được phát hành chính thức; Nhật ký tiếp xúc báo chí được lưu vết (Media Interaction Log).  
  *   
  * **Business Rule:** Tuyệt đối không xô xát, né tránh hoặc có thái độ cộc lốc với Phóng viên báo chí. Mọi lượt tiếp xúc báo chí tại cổng trường phải được Lễ tân/Bảo vệ ghi nhận vào App ERP.  
  *   
  * **Status Before:** Statement Approved.  
  *   
  * **Status After:** Statement Released / Media Engaged.  
  *   
  * **SLA:** Tự động gửi thông điệp tới Phụ huynh trong 5 phút sau khi CEO approve.  
  *   
  * **Notification:** Push Notification tới Mobile App Phụ huynh toàn trường (hoặc cơ sở bị ảnh hưởng).  
  * 

### **Giai đoạn 4: Giải quyết Hậu quả, Đóng Case & Khắc phục Quy trình (Post-Crisis Remediation & CAPA)**

* **Step 07:**  
* 

  * **Actor:** Hiệu trưởng Cơ sở, CSKH Head & Group COO.  
  *   
  * **Action:** Trực tiếp gặp gỡ làm việc với Phụ huynh có con gặp sự cố, thực hiện các cam kết hỗ trợ y tế/chăm sóc đặc biệt hoặc bồi thường thỏa đáng theo SOP-CS-001. Đồng thời, Đội QA (SOP-QA-001) tiến hành đợt Kiểm toán Đặc biệt (Special Audit) để xác định nguyên nhân vận hành và khởi tạo Lệnh Khắc phục CAPA.  
  *   
  * **ERP Function:** Crisis Remediation Tracking & Post-Crisis CAPA Linkage.  
  *   
  * **Input:** Thỏa thuận với Phụ huynh \+ Kết quả Special Audit.  
  *   
  * **Output:** Biên bản Giải quyết Sự cố \+ Yêu cầu Khắc phục Vận hành CAPA.  
  *   
  * **Business Rule:** BR-GOV-044: Sự cố Khủng hoảng chỉ được phép Đóng Case (Close Crisis Case) khi: (1) Đã giải quyết xong thỏa đáng với Phụ huynh sự cố; (2) Dư luận truyền thông đã hạ nhiệt; (3) Tất cả các Yêu cầu CAPA vận hành đã được thực thi và nghiệm thu.  
  *   
  * **Status Before:** Statement Released.  
  *   
  * **Status After:** Remediated & Closed.  
  *   
  * **SLA:** Khắc phục CAPA theo SLA quy định của SOP-QA-001.  
  *   
  * **Notification:** Báo cáo Tổng kết Khủng hoảng (Post-Crisis Debrief Report) gửi Board of Directors.  
  * 

## **11\. Workflow**

\[BẮT ĐẦU: Sự Cố Cờ Đỏ Phát Sinh (Y Tế / Bếp / Bus / CSKH) HOẶC Bóc Phốt MXH / Báo Chí\]  
       │  
       ▼  
\[ERP Auto Ingestion: Khởi Tạo Crisis Case & AI Phân Loại Crisis Level 1 \- 3\]  
       │  
       ◇ Crisis Level 3 (Khủng Hoảng Nghiêm Trọng / Bài Viral / Báo Chí Đến)?  
       ├─ NO (Level 1-2) ──► \[Chuyển BGH Cơ Sở & CSKH Xử Lý Theo SOP-CS-001\]  
       └─ YES ─────────────┐  
                           │  
                           ▼  
     \[KÍCH HOẠT PHÒNG CHỈ HUY KHỦNG HOẢNG (CRISIS WAR ROOM 24/7 TRÊN ERP)\]  
                           │  
                           ▼  
     \[ERP AUTO EMERGENCY MEDIA LOCK (1 PHÚT)\]:  
      • Tạm khóa Export dữ liệu & Đặt cờ Highly Restricted cho CCTV/Y tế.  
      • Auto Push Thông báo Quy tắc 1 Đầu mối Phát ngôn (BR-GOV-042) tới 100% Nhân viên.  
                           │  
                           ▼  
     \[CISO & Legal: Trích Xuất CCTV / Audit Log ──► Đóng Gói Verified Fact Sheet\]  
                           │  
                           ▼  
     \[PR & Legal Soạn Thông Cáo / Thông Điệp ──► CEO Bấm Approve (Luồng Duyệt 3 Cấp)\]  
                           │  
                           ▼  
     \[Phát Hành Thông Điệp Chính Thức\]:  
      • Gửi Push Notification / Zalo OA tới Phụ huynh.  
      • Người phát ngôn làm việc / Gửi Thông cáo Báo chí cho Cơ quan Báo chí.  
                           │  
                           ▼  
     \[Gặp Trực Tiếp Phụ Huynh Sự Cố ──► Giải Quyết Thỏa Đáng ──► Kích Hoạt CAPA (SOP-QA-001)\]  
                           │  
                           ▼  
     \[Dư Luận Hạ Nhiệt \+ CAPA Nghiệm Thu ──► CEO Bấm "Close Crisis Case"\]  
                           │  
                           ▼  
                      \[KẾT THÚC\]

## **12\. Business Rules**

* **BR-GOV-040 (Single Spokesperson Mandate):** Duy nhất Tổng Giám đốc (CEO) hoặc Người phát ngôn được CEO ủy quyền bằng văn bản/chữ ký số trên ERP mới có quyền phát ngôn, trả lời phỏng vấn báo chí hoặc ký thông cáo báo chí. Mọi CBGVNV tự ý trả lời phỏng vấn, cung cấp tài liệu nội bộ hoặc bình luận trên MXH về sự cố sẽ bị xử lý kỷ luật Sa thải tức thì theo SOP-HR-002.  
*   
* **BR-GOV-041 (War Room Activation SLA):** Khi sự cố được xác định thuộc Cấp độ 3 (Crisis Level 3), Phòng Chỉ huy Khủng hoảng (Crisis War Room) trên ERP phải được kích hoạt trong vòng **15 phút**. Toàn bộ thành viên Ban Chỉ đạo bắt buộc phải xác nhận có mặt trực tuyến/trực tiếp.  
*   
* **BR-GOV-042 (Instant Data Protection & Lock):** Ngay khi kích hoạt War Room, ERP tự động thực thi khóa bảo vệ dữ liệu khẩn cấp. Mọi thao tác truy cập, tải xuống video CCTV hoặc Hồ sơ Y tế trẻ liên quan đến sự cố bắt buộc phải có Phê duyệt Khẩn cấp (Break-Glass Approval) của CISO và Legal Manager.  
*   
* **BR-GOV-043 (3-Level Statement Approval):** Thông cáo báo chí hoặc Thông điệp chính thức gửi Phụ huynh bắt buộc phải qua luồng duyệt 3 Cấp trên ERP: PR Director (Soạn thảo) \-\> Legal Manager (Thẩm định pháp lý) \-\> CEO (Phê duyệt xuất bản). Thông điệp đầu tiên phải được gửi tới Phụ huynh trong vòng **04 giờ** kể từ khi bùng phát khủng hoảng.  
*   
* **BR-GOV-044 (Forensic Evidence Integrity):** Video CCTV và dữ liệu Audit Log trích xuất làm chứng cứ phục vụ điều tra khủng hoảng phải giữ nguyên bản mã hóa băm SHA-256 từ hệ thống, có xác nhận chữ ký số PKI của CISO để bảo đảm giá trị chứng cứ pháp lý trước Cơ quan Công an và Tòa án.  
* 

## **13\. Exception Cases**

* **Tin đồn thất thiệt / Cắt ghép clip bôi nhọ thương hiệu trên Mạng xã hội (Fake News / Slander):**  
* 

  * *Xử lý:* Đội IT Security & Pháp chế trích xuất video CCTV đầy đủ góc quay từ ERP chứng minh tin đồn sai sự thật. PR Manager lập Hồ sơ Chứng cứ, Legal Manager gửi Văn bản Cảnh báo Pháp lý (Legal Notice) yêu cầu chủ tài khoản gỡ bài trong 02 giờ, đồng thời gửi Đơn trình báo Cơ quan Cảnh sát Điều tra (A05/PA05) xử lý hành vi Vu khống theo quy định Luật An ninh mạng.  
  *   
* **Phóng viên Báo chí / Truyền hình đến tập trung đông tại Cổng trường:**  
* 

  * *Xử lý:* Lễ tân/Bảo vệ mời Phóng viên vào Phòng Tiếp khách Đối ngoại (không cho đi lại tự do trong khu vực lớp học để bảo vệ an toàn cho trẻ). Lễ tân gửi Giấy Hướng dẫn Đăng ký Nội dung Phỏng vấn và báo ngay cho PR Manager. Người phát ngôn trực tiếp đến làm việc hoặc hẹn lịch họp báo chính thức.  
  *   
* **Phụ huynh kéo đông người đến Trường gây rối / Cản trở hoạt động dạy học:**  
* 

  * *Xử lý:* Hiệu trưởng kích hoạt nút báo động an ninh khẩn cấp (Panic Button). Bảo vệ cổng phong tỏa các lối vào khu vực lớp học để bảo vệ học sinh. BGH và Trưởng phòng Legal mời đại diện Phụ huynh vào phòng làm việc có ghi âm/ghi hình, đồng thời thông báo Công an Phường địa phương đến hỗ trợ giữ gìn trật tự.  
  * 

## **14\. Approval Matrix**

| Scenario | Level 1 Approval | Level 2 Approval | Level 3 Approval |
| :---- | :---- | :---- | :---- |
| Phê duyệt Phân loại Cấp độ Khủng hoảng (Crisis Level 1-3) | PR Manager | PR & Risk Director | Group COO |
| Phê duyệt Kích hoạt Phòng Chỉ huy Khủng hoảng (War Room) | PR & Risk Director | Group COO | Tổng Giám đốc (CEO) |
| Phê duyệt Thông cáo Báo chí & Thông điệp Phụ huynh | PR Director (Soạn) | Legal Manager (Approve) | Tổng Giám đốc (CEO) |
| Phê duyệt Ngân sách Xử lý Khủng hoảng & Bồi thường Khẩn cấp | CFO | Group COO | Tổng Giám đốc (CEO) |
| Phê duyệt Đóng Hồ sơ Khủng hoảng (Close Crisis Case) | PR Director | Group COO | Tổng Giám đốc (CEO) / Board |

## **15\. Status Lifecycle**

* **Crisis Case Status:** Risk Detected \-\> War Room Active \-\> Evidence Locked \-\> Statement Approved \-\> Statement Released \-\> Remediation In Progress \-\> Closed & Post-Audited.  
*   
* **Media Interaction Status:** Contact Registered \-\> Inquiry Received \-\> Response Provided \-\> Published / Monitored.  
* 

## **16\. Data Model**

* **Primary Entity:** CrisisCase  
* 

  * CaseID (PK, String, Unique)  
  *   
  * CampusID (FK, String), CrisisCategory (Enum: Health\_Safety, Food\_Poisoning, Bus\_Safety, Child\_Abuse, Financial\_Fraud, Media\_Slander)  
  *   
  * CrisisLevel (Enum: Level1\_Low, Level2\_Medium, Level3\_Critical)  
  *   
  * WarRoomActive (Boolean), WarRoomActivatedAt (DateTime)  
  *   
  * IncidentSummary (Text), CrisisStatus (Enum: Detected, WarRoom\_Active, Statement\_Released, Closed)  
  *   
  * ClosedAt (DateTime), ClosedByCEO (Boolean)  
  *   
* **Related Entities:**  
* 

  * CrisisEvidenceLocker: EvidenceID (PK), CaseID (FK), FileType (Enum: CCTV\_Video, Audit\_Log, Photo, Document), FileUrl (String), SHA256Hash (String Unique), PKISignature (String), RestrictedAccessFlag (Boolean).  
  *   
  * CrisisStatement: StatementID (PK), CaseID (FK), TargetAudience (Enum: Parents, Press, Public, Authorities), StatementText (Text), PRApproved (Boolean), LegalApproved (Boolean), CEOApproved (Boolean), ReleasedAt (DateTime).  
  *   
  * MediaInteractionLog: LogID (PK), CaseID (FK), MediaOutletName (String), ReporterName (String), InquiryContent (Text), ResponseProvided (Text), HandledBySpokesperson (FK), Timestamp (DateTime).  
  * 

## **17\. Forms / Documents**

* FRM-GOV-010: Báo cáo Cảnh báo Rủi ro & Khởi tạo Hồ sơ Khủng hoảng Điện tử (Crisis Alert Form).  
*   
* FRM-GOV-011: Lệnh Kích hoạt Phòng Chỉ huy Khủng hoảng & Chỉ định Ban Chỉ đạo (Crisis War Room Activation Order).  
*   
* FRM-GOV-012: Thông cáo Báo chí & Thông điệp Truyền thông Khủng hoảng Chuẩn hóa (Official Press Release Template).  
*   
* FRM-GOV-013: Phiếu Tiếp nhận & Nhật ký Làm việc với Báo chí / Cơ quan Chức năng (Media Interaction Sheet).  
*   
* FRM-GOV-014: Báo cáo Đánh giá Hậu Khủng hoảng & Kế hoạch Phục hồi Thương hiệu (Post-Crisis Debrief & Brand Recovery Report).  
* 

## **18\. ERP Functional Requirements**

* **FR-GOV-040 (MUST):** Tích hợp Phân hệ Automated Crisis Event Ingestion: Tự động nhận diện tín hiệu sự cố Cờ đỏ từ các SOP vận hành (SOP-MED-001, SOP-KIT-001, SOP-BUS-001, SOP-CS-001) và kích hoạt luồng Escalate cấp báo động.  
*   
* **FR-GOV-041 (MUST):** Cung cấp giao diện Secure Crisis War Room Dashboard 24/7 trên ERP cho phép Ban Chỉ đạo họp trực tuyến, chia sẻ tài liệu bảo mật và phê duyệt thông điệp khẩn cấp.  
*   
* **FR-GOV-042 (MUST):** Tích hợp Emergency Data & Media Lock Engine: Tự động tạm khóa Export dữ liệu, đặt cờ Highly Restricted cho CCTV/Y tế và tự động phát Push Notification Quy tắc 1 Đầu mối Phát ngôn tới 100% Nhân viên khi kích hoạt War Room.  
*   
* **FR-GOV-043 (MUST):** Phân hệ Forensic Evidence Locker: Cho phép đóng gói video CCTV và Audit Log có băm mã hóa SHA-256 và Chữ ký số PKI để làm chứng cứ pháp lý.  
*   
* **FR-GOV-044 (MUST):** Tích hợp 3-Level Statement Approval Workflow: Định tuyến luồng duyệt thông cáo báo chí khẩn cấp qua PR Director \-\> Legal \-\> CEO trên Mobile App.  
*   
* **FR-GOV-045 (SHOULD):** Kết nối API với các công cụ Social Listening để đo lường sắc thái dư luận (Sentiment Analysis) và tự động phát cảnh báo khi bài viết khủng hoảng đạt ngưỡng lan truyền.  
* 

## **19\. Automation Opportunities**

* **AUTO-GOV-040 (RULE ENGINE):** Tự động phát chuông báo động đỏ khẩn cấp tới điện thoại CEO, COO, CMO, Legal Head khi phát hiện sự cố Cờ đỏ Level 3\.  
*   
* **AUTO-GOV-041 (SECURITY RULE):** Tự động khóa quyền trích xuất dữ liệu học sinh và đặt cờ bảo mật cao cho toàn bộ CCTV/Hồ sơ sự cố ngay khi War Room được kích hoạt.  
*   
* **AUTO-GOV-042 (NOTIFICATION):** Tự động gửi Push Notification nhắc nhở Quy tắc 1 Đầu mối Phát ngôn tới 100% Mobile App của Nhân viên Tập đoàn.  
*   
* **AUTO-GOV-043 (INTEGRATION):** Tự động phát hành Thông điệp Chính thức tới Mobile App Phụ huynh toàn trường trong vòng 5 phút sau khi CEO bấm Approve.  
* 

## **20\. Notification Matrix**

| Event | Recipient | Channel | Timing |
| :---- | :---- | :---- | :---- |
| CẢNH BÁO RỦI RO CỜ ĐỎ / KHỦNG HOẢNG (Level 3\) | CEO, COO, CMO, Legal, BGH | Loud Sound Alarm \+ SMS \+ App | Immediate (\<= 60 giây) |
| Thông báo Kích hoạt Phòng Chỉ huy Khủng hoảng | Thành viên War Room | SMS \+ Call \+ High Priority App | Immediate khi activated |
| Thông báo Quy tắc 1 Đầu mối Phát ngôn (Banned Post) | 100% CBGVNV Tập đoàn | Mobile App Push \+ Email | Immediate khi War Room active |
| Trình Duyệt Thông cáo Báo chí Khẩn cấp | Legal Head & CEO | ERP High Alert Pop-up | Immediate khi PR submitted |
| Phát hành Thông điệp Chính thức Xử lý Sự cố | Phụ huynh Toàn trường | Mobile App Push \+ Zalo OA | 5 phút sau khi CEO approve |

## **21\. Permission Matrix (RBAC)**

| Role | View Crisis Case | Report Risk Event | Access War Room | Approve Statement | Access Evidence Locker | Official Spokesperson |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| CBGVNV / Giáo viên | No | Full (Report) | No | No | No | No (Banned) |
| Hiệu trưởng Cơ sở | Campus Full | Full | Assigned Case | Review Only | Campus Scope | Local Assigned Only |
| PR / Risk Manager | Full Enterprise | Full | Full War Room | Propose Only | Full Read | Designated Only |
| Legal Manager | Full Enterprise | Full | Full War Room | Legal Review | Full Read | Designated Only |
| Group COO / CISO | Full Enterprise | Full | Full War Room | Review Only | Full Override | Designated Only |
| Tổng Giám đốc (CEO) | Full Enterprise | Full | Full War Room | Full Approval | Full Enterprise | Chief Spokesperson |

## **22\. Audit Trail**

Hệ thống ghi nhận Audit Log vĩnh viễn không thể điều chỉnh đối với các hành vi:

* Người khởi tạo Báo cáo Rủi ro, Thời gian báo cáo, Cấp độ Khủng hoảng ban đầu.  
*   
* Lịch sử kích hoạt Phòng Chỉ huy Khủng hoảng (War Room): Timestamp, Thành viên tham gia, Nhật ký trao đổi trong War Room.  
*   
* Lịch sử thực thi Lệnh Phong tỏa Dữ liệu Khẩn cấp (Emergency Media Lock): Thời gian khóa, Danh sách tài liệu/CCTV bị phong tỏa.  
*   
* Nhật ký trích xuất bằng chứng (CCTV, Audit Log): User ID thực hiện, Mã băm SHA-256, Chữ ký số PKI đính kèm.  
*   
* Toàn bộ lịch sử sửa đổi, trình duyệt và phê duyệt Thông cáo Báo chí / Thông điệp Phụ huynh (Version control, User ID, Timestamp, Chữ ký số CEO).  
*   
* Nhật ký tiếp xúc phóng viên báo chí tại các cơ sở.  
* 

## **23\. Internal Controls**

* **Single Spokesperson Strict Control:** Tự động gửi Push Notification nhắc nhở nghĩa vụ bảo mật thông tin tới 100% nhân viên; xử lý kỷ luật sa thải nghiêm minh đối với các trường hợp tự ý phát ngôn.  
*   
* **Dual-Lock Evidence Security:** File video CCTV và bằng chứng sự cố trích xuất từ ERP bắt buộc phải có xác nhận chữ ký số kép (Dual-Sign PKI): CISO \+ Legal Manager để ngăn chặn việc chỉnh sửa cắt ghép video.  
*   
* **3-Level Approval Gate for Statements:** Khóa cứng tính năng phát hành thông cáo báo chí ra bên ngoài nếu chưa đủ 3 chữ ký duyệt điện tử: PR Manager \-\> Legal Manager \-\> CEO.  
*   
* **Post-Crisis Operational Audit Mandate:** Bắt buộc phải thực hiện đợt Kiểm toán Đặc biệt (Special Audit theo SOP-QA-001) trong vòng 07 ngày sau khủng hoảng để khắc phục triệt để lỗ hổng vận hành.  
* 

## **24\. KPI / SLA**

| KPI / SLA Description | Formula / Measurement | Target | Owner |
| :---- | :---- | :---- | :---- |
| **SLA Kích hoạt War Room (War Room SLA)** | Thời gian từ khi có sự cố Level 3 đến khi War Room active | **\<= 15 phút** | PR & Risk Director |
| **SLA Phong tỏa Dữ liệu Khẩn cấp (Data Lock SLA)** | Thời gian khóa dữ liệu & gửi Push 1-Spokesperson Rule | **\<= 1 phút (Real-time)** | IT Security & ERP |
| **SLA Phát hành Thông điệp Đầu tiên (First Statement)** | Thời gian từ khi bùng phát khủng hoảng đến khi gửi Phụ huynh | **\<= 04 giờ** | CMO, Legal & CEO |
| **Tỷ lệ Tuân thủ Quy tắc Phát ngôn Nhân viên** | (Số nhân viên không vi phạm phát ngôn / Tổng nhân viên) \* 100 | **100% (Zero Leak)** | Group HR & PR Head |
| **Tỷ lệ Khôi phục Sĩ số Hậu Khủng hoảng (Retention Rate)** | (Số học sinh tiếp tục học sau khủng hoảng / Tổng sĩ số) \* 100 | **\>= 95%** | Group COO & BGH |

## **25\. Dashboard / Report**

* **Executive Crisis War Room Monitor (CEO, COO, CMO, Legal):** Màn hình chỉ huy khủng hoảng real-time, Dòng thời gian sự việc (Crisis Timeline), Trạng thái các luồng công việc (Trích xuất chứng cứ, Soạn thông cáo, Gặp Phụ huynh, Làm việc Báo chí), Biểu đồ đo lường sắc thái dư luận MXH (Social Sentiment Analysis).  
*   
* **Media & Incident Historical Registry (PR & Risk Dept):** Báo cáo nhật ký các sự cố rủi ro vận hành toàn chuỗi, Thống kê danh sách các cơ quan báo chí đã tiếp xúc, Bảng tổng hợp chi phí xử lý khủng hoảng.  
*   
* **Post-Crisis Brand Health & Recovery Dashboard (Board & CEO):** Báo cáo đo lường chỉ số sức khỏe thương hiệu hậu khủng hoảng, Báo cáo tiến độ thực thi các Yêu cầu Khắc phục CAPA vận hành.  
* 

## **26\. Integration**

* **Tất cả Phân hệ Vận hành Mầm non (**SOP-MED-001**,** SOP-KIT-001**,** SOP-BUS-001**,** SOP-CS-001**,** SOP-FAC-001**):** Tiếp nhận tín hiệu sự cố Cờ đỏ real-time.  
*   
* **Human Resources (**SOP-HR-001 **&** SOP-HR-002**):** Gửi thông báo quy tắc phát ngôn và thực thi kỷ luật nhân sự vi phạm bảo mật.  
*   
* **Security & Audit Log (**SOP-SEC-001 **&** SOP-QA-001**):** Thực thi Lệnh Phong tỏa Dữ liệu Khẩn cấp và trích xuất bằng chứng băm SHA-256.  
*   
* **Social Listening APIs & Media Monitoring Services:** Kết nối API theo dõi bài đăng bóc phốt và phân tích sắc thái dư luận trên Facebook, TikTok, Google.  
*   
* **Zalo Official Account & SMS Brandname Gateway:** Phát hành thông điệp khẩn cấp tới Phụ huynh toàn trường.  
* 

## **27\. Risks & Controls**

| Risk Description | Impact | Probability | Control Activity | Owner |
| :---- | :---- | :---- | :---- | :---- |
| **Nhân viên tự ý phát ngôn/tranh cãi gây khủng hoảng bùng phát** | Critical | Medium | ERP Auto Push Cảnh báo 1-Spokesperson Rule; Sa thải kỷ luật nghiêm. | Group HR & PR Head |
| **Lộ rò rỉ video CCTV / Hồ sơ Y tế trẻ ra Mạng xã hội** | Critical | Low | ERP Emergency Media Lock tự động khóa Export và đặt Highly Restricted. | CISO & IT Security |
| **Thông tin phát ngôn mâu thuẫn với chứng cứ thực tế** | Critical | Low | Bắt buộc đóng gói Verified Fact Sheet từ CCTV/Audit Log băm SHA-256 trước khi soạn PR. | Legal Head & CISO |
| **Chậm trễ phát hành thông điệp khiến dư luận hoảng loạn** | High | Medium | Khung mẫu thông cáo sẵn có; Luồng duyệt 3 Cấp khẩn cấp trên App (SLA \<= 4h). | CMO & CEO |

## **28\. Acceptance Criteria**

* **Given:** Tại Cơ sở 3 phát sinh sự cố ngộ độc thực phẩm khiến 5 học sinh phải nhập viện (Sự cố Cờ đỏ Level 3).  
*   
* **When:** Cán bộ Y tế lập Biên bản Sự cố trên SOP-MED-001.  
*   
* **Then:** ERP tự động nhận diện Sự cố Level 3, bật còi báo động đỏ trên điện thoại CEO, COO, CMO, Legal Head, tự động khởi tạo Crisis War Room trong 15 phút, đồng thời tự động phong tỏa dữ liệu CCTV bếp ăn và gửi Push Notification cảnh báo Quy tắc 1 Đầu mối Phát ngôn tới 100% Mobile App của Nhân viên Tập đoàn trong vòng 60 giây.  
*   
* **Given:** PR Manager hoàn tất dự thảo Thông cáo Báo chí và trình duyệt trên ERP.  
*   
* **When:** Thông cáo qua Luồng duyệt 3 Cấp (PR Director \-\> Legal Manager \-\> CEO).  
*   
* **Then:** Ngay khi CEO bấm "Approve" trên Mobile App, ERP tự động gửi Push Notification Thông điệp Chính thức tới Mobile App của Phụ huynh toàn Cơ sở 3 trong vòng 5 phút, đồng thời ghi nhận bản ghi Audit Log có chữ ký số PKI của CEO.  
* 

## **29\. Test Scenarios**

1. **Happy Path Crisis Management Test:** Sự cố Cờ đỏ trigger từ MED-001 \-\> ERP Auto War Room Active \-\> Emergency Data Lock trong 1 phút \-\> Trích xuất CCTV băm SHA-256 \-\> Soạn & Duyệt 3 Cấp Thông cáo Báo chí \-\> CEO Approve \-\> Push App Phụ huynh \-\> Gặp trực tiếp xử lý \-\> Close Crisis Case thành công.  
2.   
3. **Emergency Media Lock Test:** Kích hoạt War Room cho Sự cố Level 3 \-\> Đăng nhập tài khoản Giáo viên/Tuyển sinh cố tình Export file danh sách học sinh hoặc tải video CCTV \-\> Kiểm tra xem ERP có chặn quyền Access Denied và bật cờ cảnh báo an ninh không.  
4.   
5. **Single Spokesperson Employee Push Test:** Kích hoạt War Room \-\> Kiểm tra xem 100% tài khoản Mobile App Nhân viên có nhận được Push Notification cảnh báo Quy tắc 1 Đầu mối Phát ngôn trong vòng 60 giây không.  
6.   
7. **Forensic Evidence SHA-256 Hashing Test:** Trích xuất file video CCTV sự cố từ Forensic Evidence Locker \-\> Kiểm tra xem file video có đính kèm Chữ ký số PKI của CISO và mã băm SHA-256 nguyên vẹn không.  
8.   
9. **3-Level Approval Speed Test:** Trình duyệt Thông cáo Báo chí khẩn cấp \-\> Kiểm tra xem luồng duyệt 3 Cấp (PR \-\> Legal \-\> CEO) trên Mobile App có hoàn tất và cho phép phát hành trong vòng dưới 2 giờ không.  
10. 

## **30\. ERP Implementation Notes**

* **Configuration:** Cấu hình danh mục Từ khóa Khủng hoảng (Crisis Keywords) cho AI Triage; Cấu hình luồng duyệt 3 Cấp khẩn cấp; Cấu hình danh sách thành phần Ban Chỉ đạo War Room; Cấu hình quy tắc khóa dữ liệu khẩn cấp (Emergency Media Lock Rules).  
*   
* **Master Data Migration:** Import ma trận phân cấp Người phát ngôn chính thức; Import danh sách thông tin liên lạc các cơ quan báo chí và cơ quan quản lý nhà nước; Import các kịch bản phản ứng khủng hoảng mẫu.  
*   
* **Hardware & Integration:** Kết nối API với Dịch vụ Social Listening theo dõi sắc thái dư luận MXH; Kết nối Cổng gửi tin nhắn khẩn SMS Brandname / Zalo OA; Tích hợp Chữ ký số PKI cho Ban Điều hành.  
*   
* **Training & Drills:** Tổ chức diễn tập ứng phó khủng hoảng truyền thông (Crisis Drill) định kỳ 06 tháng/lần cho 100% Ban Giám hiệu, Đội ngũ PR, Legal và Bảo vệ các cơ sở; Đào tạo toàn thể CBGVNV quy tắc bảo mật thông tin và ứng xử chuẩn mực trên Mạng xã hội.  
* 

# **BÁO CÁO TỔNG KẾT HOÀN THÀNH BỘ KIẾN TRÚC 25 SOP CORE ERP MẦM NON (ENTERPRISE MASTER REPORT)**

Kính gửi Ban Điều hành, Đội ngũ Kiến trúc sư Hệ thống, Product Owners, Business Analysts và Đội ngũ Phát triển Phần mềm,

Chúng ta đã chính thức hoàn thành xuất sắc việc phân tích, chuẩn hóa và biên soạn toàn bộ **Bộ 25 Tài liệu SOP Core Chuẩn mực Enterprise** dành cho Hệ thống ERP Mầm non Doanh nghiệp (Enterprise Preschool ERP System).

### **1\. Bảng Tổng hợp 25 SOP Core Đã Biên Soạn (Master SOP Index)**

| STT | Mã SOP | Tên Quy Trình Chuẩn Hóa | Phân Hệ Domain Bao Phủ |
| :---- | :---- | :---- | :---- |
| **01** | SOP-CRM-001 | Quản lý Phễu Tuyển sinh (Lead-to-Enrollment), School Tour & Assessment | Domain 01, 02, 03 |
| **02** | SOP-MKT-001 | Chiến dịch Marketing, Sự kiện Open Day, Ngân sách Quảng cáo & Đo lường CAC/ROI | Domain 01, 02, 57, 58, 70 |
| **03** | SOP-ADM-003 | Tiếp nhận Hồ sơ, Ký Hợp đồng Đào tạo & Xác nhận Nhập học | Domain 03, 06, 07 |
| **04** | SOP-ADM-005 | Quản lý Học sinh Rút học (Student Withdrawal), Hoàn phí Học tập & Quyết toán Hợp đồng | Domain 06, 07, 08, 09, 11, 55 |
| **05** | SOP-ADM-006 | Học sinh Tốt nghiệp Mầm non, Học bạ Digital & Chuyển cấp Lên Tiểu học K-12 | Domain 04, 06, 13, 22, 55, 60 |
| **06** | SOP-ADM-007 | Quản lý Học sinh Chuyển Lớp, Chuyển Cơ sở (Inter-Campus Transfer) & Đồng bộ Hồ sơ | Domain 04, 06, 11, 12, 55, 71 |
| **07** | SOP-SIS-001 | Đón Trả trẻ An toàn, Khai báo Người ủy quyền & Điểm danh Hàng ngày | Domain 04, 18, 19, 20, 26 |
| **08** | SOP-SIS-002 | Sổ liên lạc Điện tử Hàng ngày (Daily Activities) & Đánh giá Phát triển Trẻ | Domain 21, 22, 62 |
| **09** | SOP-ACA-001 | Quản lý Chương trình Khung (Curriculum), Soạn Giáo án, Phân công Năng khiếu & TKB | Domain 13, 14, 15, 16, 17, 41 |
| **10** | SOP-FIN-001 | Tự động hóa Lập hóa đơn Học phí, Đối soát Công nợ & Khấu trừ Tiền ăn | Domain 08, 09, 10, 11, 55 |
| **11** | SOP-FIN-002 | Quản lý Thu Chi Quỹ Tiền mặt, Ngân hàng, Tạm ứng & Thanh toán Chi phí Vận hành | Domain 55, 56, 57, 58, 59, 60 |
| **12** | SOP-FIN-003 | Lập Kế hoạch Ngân sách Vận hành (Budgeting), Kiểm soát Chi tiêu & Dự báo Dòng tiền 12 Tuần | Domain 55, 56, 57, 58, 70, 71 |
| **13** | SOP-KIT-001 | Quản lý Thực đơn, Định mức Dinh dưỡng, Mua hàng Thực phẩm & Lưu mẫu 24h | Domain 27, 28, 29, 30, 31 |
| **14** | SOP-HR-001 | Hồ sơ Nhân sự, Bằng cấp Giáo viên, Phân công Giảng dạy & Chấm công / Bảng lương | Domain 45, 47, 48, 49, 51, 52 |
| **15** | SOP-HR-002 | Đào tạo Nhân sự (Training Management), Đánh giá KPI/OKR & Khen thưởng / Kỷ luật | Domain 45, 47, 48, 53, 54, 67, 75 |
| **16** | SOP-BUS-001 | Lộ trình Xe Bus, Điểm danh Xe Bus & Kiểm tra Hàng ghế Cuối xe Tránh Bỏ quên Trẻ | Domain 42, 43, 44, 26 |
| **17** | SOP-MED-001 | Quản lý Hồ sơ Sức khỏe Học sinh, Y tế Học đường, Cho Trẻ Uống Thuốc & Xử lý Sự cố | Domain 23, 24, 25, 26 |
| **18** | SOP-PUR-001 | Mua sắm Tập trung (Procure-to-Pay \- P2P), Quản lý PR/PO, Nhập kho GRN & Asset Tagging | Domain 32, 33, 34, 35, 36, 37, 38, 55, 57 |
| **19** | SOP-INV-001 | Quản lý Tồn kho Vật tư Học tập, Sách vở, Đồng phục, Xuất kho Lớp học & Kiểm kê Kho | Domain 32, 38, 41, 55, 69 |
| **20** | SOP-FAC-001 | Quản lý Bảo trì Trang thiết bị Lớp học, Kiểm tra An toàn PCCC & Service Helpdesk | Domain 38, 39, 40, 41, 64, 68 |
| **21** | SOP-SEC-001 | Quản lý Phân quyền Người dùng (RBAC), Bảo mật Dữ liệu Cá nhân Trẻ em & Audit Log | Domain 26, 67, 71, 72, 73, 75 |
| **22** | SOP-GOV-001 | Quản trị Chuỗi Đa cơ sở (Multi-Campus Governance), Cấu hình Tham số & BI Dashboard | Domain 67, 70, 71, 74, 75 |
| **23** | SOP-GOV-004 | Quản trị Rủi ro Vận hành, Quy trình Xử lý Khủng hoảng Truyền thông & Bảo vệ Thương hiệu | Domain 62, 63, 67, 68, 70, 71, 73 |
| **24** | SOP-QA-001 | Kiểm định Chất lượng Giáo dục Mầm non, Đánh giá Tiêu chuẩn Vận hành Cơ sở & Audit | Domain 66, 67, 68, 69, 70, 71 |
| **25** | SOP-CS-001 | Quản lý Tiếp nhận & Xử lý Khiếu nại Phụ huynh (Complaint Management) & CSAT/NPS | Domain 62, 63, 64, 65, 66, 68, 70 |

### **2\. Ma trận Phủ sóng Toàn diện 75 Domain Vận hành Enterprise**

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│                                           ENTERPRISE VALUE CHAIN ERP MẦM NON (FULL COVERAGE)                                   │  
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┬─────────────────────────────┤  
│ 1\. CUSTOMER ACQUISITION & ADM  │ 2\. ACADEMIC & DAILY CARE       │ 3\. KITCHEN, LOGISTICS & ASSET  │ 4\. GOVERNANCE, FIN & SEC    │  
│ • SOP-MKT-001: Mkt & CAC/ROI   │ • SOP-SIS-001: Pickup & Gate   │ • SOP-KIT-001: Meal & Nutrition│ • SOP-FIN-001: Billing & AR │  
│ • SOP-CRM-001: Lead & Tour     │ • SOP-SIS-002: Daily Log & Eval│ • SOP-BUS-001: Bus Safety      │ • SOP-FIN-002: Cash & Expense│  
│ • SOP-ADM-003: Contract & Fee  │ • SOP-ACA-001: Curriculum & TKB│ • SOP-PUR-001: P2P & Assets    │ • SOP-FIN-003: Budget & Cash│  
│ • SOP-ADM-005: Withdrawal & Ref│ • SOP-MED-001: Health & Med    │ • SOP-INV-001: Inventory & Stock│ • SOP-HR-001: Staff & Payroll│  
│ • SOP-ADM-006: Graduation & K12│                                │ • SOP-FAC-001: Facility & PCCC │ • SOP-HR-002: Training & KPI│  
│ • SOP-ADM-007: Transfer & Sync │                                │                                │ • SOP-SEC-001: RBAC & Security│  
│ • SOP-CS-001: Complaints & CSAT│                                │                                │ • SOP-GOV-001: Multi-Campus │  
│                                │                                │                                │ • SOP-QA-001: Quality & Audit│  
│                                │                                │                                │ • SOP-GOV-004: Crisis & Risk│  
└────────────────────────────────┴────────────────────────────────┴────────────────────────────────┴─────────────────────────────┘

### **3\. Giá trị Cốt lõi của Bộ Kiến trúc SOP ERP Mầm non Doanh nghiệp**

1. **Chuẩn hóa 360° Vận hành:** Đã xây dựng trọn vẹn Khung Quản trị Vận hành từ Tuyển sinh, Học tập, Y tế, Dinh dưỡng, Xe bus, An toàn Trẻ em, Tài chính, Nhân sự, Bảo trì PCCC, Bảo mật Dữ liệu đến Quản trị Rủi ro Khủng hoảng Truyền thông.  
2.   
3. **Thiết kế Sẵn sàng cho Developer & BA:** Mỗi SOP đều cung cấp đầy đủ 30 mục chi tiết: Workflow, Business Rules, Data Model (Primary/Related Entities), ERP Functional Requirements (MUST/SHOULD/COULD), Automation Opportunities, Permission RBAC Matrix, Immutable Audit Trail, Internal Controls, KPI/SLA, Acceptance Criteria (Given/When/Then) và Test Scenarios.  
4.   
5. **Tuân thủ Pháp luật Việt Nam:** Tích hợp các quy tắc kiểm soát tuân thủ Luật Trẻ em, Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân, Bộ luật Lao động, Luật Kế toán, Luật Báo chí và Quy định PCCC/An toàn Thực phẩm mầm non.  
6.   
7. **Tự động hóa & Chống Gian lận:** Tích hợp các cơ chế kiểm soát cứng (Hard Stop Gates, Encumbrance Control, Dynamic VietQR, 3-Way Matching, Biometric Gate/Bus Check-in, 3-Point Medication Check, 1-Click Campus Auto-Cloning) triệt tiêu hoàn toàn gian lận và sai sót do con người.  
8. 

Bộ tài liệu này đã hoàn toàn sẵn sàng làm **Master Specification** để Đội ngũ Sản phẩm (Product Team) và Đội ngũ Kỹ thuật (Development Team) tiến hành thiết kế UI/UX, khởi tạo Cơ sở Dữ liệu (Database Schema) và lập trình các Module chức năng cho Hệ thống ERP Mầm non Doanh nghiệp\!  
