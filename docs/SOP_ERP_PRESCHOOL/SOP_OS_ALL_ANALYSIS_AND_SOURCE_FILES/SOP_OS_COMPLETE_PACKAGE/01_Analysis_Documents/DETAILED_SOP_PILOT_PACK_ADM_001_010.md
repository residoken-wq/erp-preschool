# DETAILED SOP PILOT PACK — LEAD-TO-ENROLLMENT

| Thuộc tính | Giá trị |
|---|---|
| Mã bộ tài liệu | SOP-PACK-ADM-001 |
| Phiên bản | 0.1 — Proposed |
| Phạm vi | ADM-001 đến ADM-010 |
| Process | Lead-to-Enrollment |
| Pilot | Một cơ sở đại diện, multi-campus ready |
| Ngôn ngữ | Tiếng Việt; thuật ngữ ERP giữ tiếng Anh |

> Đây là bộ Best Practice dùng cho thiết kế MVP và UAT. Process Owner, SLA target, approval threshold, retention và yêu cầu pháp lý phải được xác nhận trước khi chuyển trạng thái `Approved/Effective`.

## 1. Quy ước chung

### 1.1 Document lifecycle

`Draft → In Review → Revision Required → Approved → Scheduled → Effective → Superseded → Archived`

### 1.2 Common actors

- Parent/Guardian.
- Admission Officer.
- Admission Manager.
- Academic Assessor/Manager.
- Finance Officer/Manager.
- Principal/Business Owner.
- System Administrator.
- Auditor.

### 1.3 Common controls

- Least Privilege và campus/domain scope.
- Segregation of Duties cho approval/exception.
- Status transition qua command, không sửa status trực tiếp.
- Reason bắt buộc cho reject, override, cancel, merge và privileged export.
- Audit gồm actor, action, time, before/after, reason và correlation ID.
- Dữ liệu trẻ em/assessment/contract là `Highly Restricted` theo phạm vi phù hợp.
- Record đã finalized/active không chỉnh trực tiếp; tạo revision/version.

### 1.4 Common test types

Happy Path, Validation, Boundary, Exception, Permission, Approval, Audit, Integration, Concurrency và Recovery.

---

# SOP-ADM-001 — TIẾP NHẬN VÀ PHÂN LOẠI LEAD

## 1. Thông tin tài liệu

| Field | Value |
|---|---|
| SOP ID | ADM-001 |
| Module | CRM / Admission |
| Process Owner | Admission Manager — Proposed |
| Type/Priority | Operational / P0 |
| Upstream | Marketing, Referral, Walk-in, Hotline |
| Downstream | ADM-002 Consultation |

## 2. Mục đích và phạm vi

Tạo Lead hợp lệ, không trùng, có source, campus/program interest, owner và next action. Áp dụng với mọi nguồn Lead được nhà trường cho phép; không áp dụng cho hồ sơ Application đã tồn tại và được nhập trực tiếp theo policy riêng.

## 3. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Tạo Lead | Admission Officer/System | Admission Manager | Marketing | — |
| Xử lý duplicate | Admission Officer | Admission Manager | Data Owner | Auditor |
| Assign Lead | Admission Manager/System Rule | Admission Manager | — | Officer |
| Qualify/Disqualify | Admission Officer | Admission Manager | Academic nếu cần | Marketing |

## 4. Input, trigger và output

- **Trigger:** form website, referral, hotline, walk-in, campaign hoặc import đã kiểm soát.
- **Input:** contact, source, consent, nhu cầu ban đầu.
- **Output:** Lead ID, status, owner, priority, next action hoặc Duplicate/Disqualified reason.

## 5. Quy trình TO-BE

| Step | Actor | Action/ERP Function | Input → Output | Rule/Status | SLA |
|---:|---|---|---|---|---|
| 01 | Officer/System | Normalize contact và tạo draft | Raw contact → normalized candidate | New | TBD |
| 02 | System | Duplicate check | Email/phone/person match → candidates | BR-ADM-001 | Real-time |
| 03 | Officer | Xác nhận tạo/merge/not duplicate | Candidates → decision | Reason nếu override | TBD |
| 04 | Manager/System | Assign owner | Valid Lead → Assigned | BR-ADM-002 | TBD |
| 05 | Officer | First contact và ghi outcome | Lead → Contacted | Interaction required | TBD |
| 06 | Officer | Qualify/disqualify/nurture | Needs profile → Qualified/Nurturing/Disqualified | Reason code | TBD |

## 6. Business Rules và exceptions

- **BR-ADM-001:** kiểm tra trùng trước khi tạo Lead.
- **BR-ADM-002:** Lead active sau Assigned phải có owner và next action.
- **BR-ADM-016:** email/phone phải normalize trước matching.
- **BR-ADM-017:** merge Lead yêu cầu quyền riêng, preview kết quả và audit.

Exceptions: thiếu contact, consent không hợp lệ, spam, duplicate, ngoài service area, không liên hệ được, import row lỗi.

## 7. Status và approval

`New → Assigned → Contacted → Qualified → Converted`; nhánh `Nurturing/Disqualified/Lost/Duplicate/Archived`.

Merge/override duplicate cần Admission Manager; bulk import có thể cần approval theo cấu hình.

## 8. Data, forms và functional requirements

- Entities: Lead, Person, PersonContact, ProspectStudent, Consent, Interaction, Task.
- Forms: FRM-ADM-001 Lead Form; FRM-ADM-002 Qualification Form.
- FR-ADM-001 MUST tạo Lead ID duy nhất.
- FR-ADM-002 MUST kiểm tra duplicate theo configurable rule.
- FR-ADM-003 MUST assign theo campus/team rule.
- FR-ADM-004 SHOULD hỗ trợ campaign/referral attribution.

## 9. Automation, notification và permission

- AUTO normalize contact; RULE duplicate/assignment; NOTIFICATION owner assignment/SLA.
- Officer: create/edit scoped Lead; Manager: assign/merge/close; Auditor: read-only audit.
- System Admin không mặc định xem contact plaintext.

## 10. Audit, controls, KPI và report

- Audit create, match candidates, duplicate decision, merge, assign, status, consent và export.
- Controls: duplicate detection, mandatory source, owner, next action, merge preview.
- KPI: first response time, duplicate rate, qualification rate, missing-owner rate. Target `TBD`.
- Dashboard: New unassigned, overdue first contact, source distribution, duplicate queue.

## 11. Acceptance và test

- Given normalized contact trùng active Lead, when tạo mới, then hệ thống cảnh báo/chặn theo rule.
- Given user khác campus, when gọi Lead API, then 403/404 an toàn.
- Given merge thành công, then source record được đánh dấu Duplicate, links chuyển có kiểm soát và audit đầy đủ.
- Test: happy create; missing contact; duplicate; concurrent merge; unauthorized export; import partial failure.

---

# SOP-ADM-002 — TƯ VẤN VÀ GHI NHẬN NHU CẦU

## 1. Thông tin

| Field | Value |
|---|---|
| SOP ID | ADM-002 |
| Owner | Admission Manager — Proposed |
| Trigger | Lead Assigned/Contacted |
| Output | Needs Profile, fit assessment, next action |

## 2. Mục đích/phạm vi

Chuẩn hóa interaction, xác định campus/program/intake phù hợp và next step. Không thay Assessment học thuật.

## 3. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Tư vấn | Admission Officer | Admission Manager | Academic/CS | Parent |
| Ghi nhu cầu | Admission Officer | Admission Manager | Parent | — |
| Xác định next step | Admission Officer | Admission Manager | Academic | Parent |

## 4. TO-BE

| Step | Action | Output | Rule/Exception |
|---:|---|---|---|
| 01 | Chuẩn bị thông tin Lead và chương trình | Consultation context | Chỉ xem dữ liệu cần thiết |
| 02 | Liên hệ qua channel được phép | Interaction record | Consent/channel preference |
| 03 | Ghi nhu cầu, độ tuổi, start date, campus | Needs Profile | Required fields theo stage |
| 04 | Đánh giá fit sơ bộ | Qualified/Nurturing/No-fit | Không thay academic decision |
| 05 | Tạo next action: Tour/Application/follow-up | Task/Schedule | Owner + due date |

## 5. Rules/exceptions/status

- Active Lead phải có next action hoặc close reason.
- Mọi interaction nghiệp vụ phải có occurred_at, channel, outcome và actor.
- Không ghi dữ liệu sức khỏe nhạy cảm vào free-text CRM nếu chưa có context/permission phù hợp.
- Exceptions: unreachable, wrong contact, language support, not ready, no-fit, complaint.
- Status: Contacted → Qualified/Nurturing/Disqualified/Lost.

## 6. ERP/Data/Control

- Entities: Lead, Interaction, NeedProfile projection, Task, Notification.
- FR: record interaction; next action; outcome codes; reminders; communication preferences.
- Automation: task/reminder; overdue escalation; template message.
- Audit: interaction create/edit, status, close reason, sensitive note access.
- KPI: contact attempts to reach, consultation-to-tour/application rate, overdue follow-up.
- Reports: officer queue, nurture aging, no-fit reasons.

## 7. Acceptance/test

- Given Lead Contacted, when save interaction without outcome, then validation error.
- Given active Lead without next action, when complete consultation, then system requires due task or close state.
- Test: call/email/walk-in, unreachable, nurture, cross-campus transfer, permission on notes.

---

# SOP-ADM-003 — SCHOOL TOUR MANAGEMENT

## 1. Mục tiêu và vai trò

Quản lý yêu cầu, lịch, host, attendee, reminder và outcome School Tour. Tour có thể optional theo configuration.

| Activity | R | A | C | I |
|---|---|---|---|---|
| Đặt lịch | Admission Officer | Admission Manager | Campus Operations | Parent/Host |
| Thực hiện Tour | Host/Officer | Admission Manager | Academic | Parent |
| Reschedule/Cancel | Officer | Admission Manager | Host | Parent |

## 2. TO-BE

| Step | Actor | Action | Status | Output |
|---:|---|---|---|---|
| 01 | Officer | Chọn campus/slot/host | Requested | Tour request |
| 02 | System/Host | Kiểm tra conflict và confirm | Confirmed | Calendar booking |
| 03 | System | Gửi confirmation/reminder | Confirmed | Delivery status |
| 04 | Host | Check-in/thực hiện Tour | In progress | Attendee record |
| 05 | Officer | Complete/no-show/cancel | Completed/No-show | Outcome + follow-up |

## 3. Rules và exceptions

- End time > start time; host/campus required trước Confirmed.
- Không double-book host/slot nếu policy cấm.
- Completed bắt buộc outcome và next action.
- Reschedule giữ lineage; không xóa lịch sử.
- Exceptions: no-show, late arrival, safety restriction, campus closed, duplicate booking.

## 4. Requirements và controls

- Entities: SchoolTour, CalendarSlot, Attendee, Lead, Task, Notification.
- FR: schedule/reschedule/cancel/complete; conflict check; reminder; attendance/outcome.
- Permission: Officer manage own/scoped tour; Host update outcome; Manager override.
- Audit: schedule, host change, time change, cancel/no-show/outcome.
- KPI: confirmation-to-show rate, cancellation/no-show, tour-to-application conversion.
- Integration: calendar/email/SMS optional adapter.

## 5. Acceptance/test

- Given occupied host slot, when schedule overlapping Tour, then block/warn theo policy.
- Given Tour Completed, when no outcome, then 422 validation.
- Test timezone, reschedule chain, reminder failure, no-show và direct API authorization.

---

# SOP-ADM-004 — TIẾP NHẬN APPLICATION

## 1. Mục đích

Tạo Application có ID duy nhất, liên kết đúng Lead/Prospect/Guardian, program/campus/intake và checklist version.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Start Application | Admission Officer | Admission Manager | Parent | — |
| Cập nhật student/guardian | Officer/Parent theo scope | Admission Manager | Admin | — |
| Submit | Authorized Parent/Officer | Admission Manager | — | Parent |

## 3. Input và TO-BE

- Input: Qualified Lead hoặc direct application theo policy; student/guardian identity; program/campus/intake; consent.

| Step | Action | Rule | Status |
|---:|---|---|---|
| 01 | Start Application từ Lead/direct | Duplicate active Application check | Draft |
| 02 | Tạo/link Person và ProspectStudent | Person matching | Draft |
| 03 | Khai báo GuardianRelationship/authority | Không suy quyền từ relationship type | Draft |
| 04 | Chọn campus/program/intake | Master ID hợp lệ | Draft |
| 05 | Generate checklist snapshot | BR-ADM-004 | Draft |
| 06 | Validate và Submit | BR-ADM-003 | Submitted |

## 4. Rules/exceptions

- **BR-ADM-003:** chỉ Submit khi đủ field bắt buộc theo configuration.
- **BR-ADM-004:** document requirement phụ thuộc program, age, campus, intake.
- Không có hai Application active cùng prospect + campus + program + intake nếu policy cấm.
- Exceptions: direct application, duplicate person, guardian authority TBD, wrong intake, draft expiry, campus transfer.

## 5. Data/FR/automation

- Entities: Application, ProspectStudent, Person, GuardianRelationship, Consent, ApplicationDocument.
- Forms: Application Form, Guardian Declaration, Consent Form.
- FR: start/save draft/submit; guardian relationship; checklist version; duplicate check; configurable mandatory fields.
- Automation: Application ID, checklist, incomplete task, confirmation notification.

## 6. Permission/audit/control/KPI

- Parent scope chỉ hồ sơ liên quan; Officer scoped campus; Manager reopen/correct privileged.
- Audit: identity relation, consent, submit/reopen, campus/program/intake changes.
- Controls: identity matching, authority flags, required field, master reference, versioned checklist.
- KPI: started-to-submitted, draft aging, completion rate, duplicate Application.

## 7. Acceptance/test

- Given missing mandatory field, when Submit, then 422 + field references.
- Given guardian may_submit_application=false, when direct submit, then denied.
- Given checklist master thay đổi sau Submit, then Application giữ checklist version snapshot.
- Test draft autosave/conflict, duplicate, campus transfer, consent withdrawal, unauthorized parent.

---

# SOP-ADM-005 — KIỂM TRA HỒ SƠ NHẬP HỌC

## 1. Mục tiêu

Kiểm tra tính đầy đủ, hợp lệ, phiên bản và thời hạn tài liệu; đưa Application sang `Verified` hoặc `Incomplete` có lý do rõ.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Upload/bổ sung | Parent/Officer | Admission Manager | — | Reviewer |
| Verify/reject | Admission Officer/Reviewer | Admission Manager | Academic/Admin | Parent |
| Override thiếu hồ sơ | Admission Manager | Principal theo policy | Compliance | Auditor |

## 3. TO-BE

| Step | Action | Output | Control |
|---:|---|---|---|
| 01 | Upload vào quarantine | Pending asset | MIME/size/scan |
| 02 | Malware scan | Clean/Quarantined | Không mở trước Clean |
| 03 | Reviewer kiểm từng checklist item | Verified/Rejected/Expired | Reason khi reject |
| 04 | System tính completeness | Complete/Incomplete | Required/conditional logic |
| 05 | Mark Application | Verified/Incomplete | Override approval nếu có |
| 06 | Notify/request missing documents | Task/notification | Data minimization |

## 4. Rules/exceptions

- Clean scan trước khi document available.
- Rejected/Expired cần reason; replacement giữ history.
- Không dùng filename làm document identity.
- Four-eyes review cho document type cấu hình nhạy cảm.
- Exceptions: unreadable, wrong person, expired, suspected tampering, scan failure, legal exception.

## 5. Requirements/permission/audit

- FR upload/replace/verify/reject; document preview; validity; checklist progress; reminder.
- Parent upload/view own; Reviewer verify; Manager override; Admin không mặc định xem bytes.
- Audit upload hash/size/type, scan, download HRI, verify/reject/replace/override/export.

## 6. KPI/risks

- First-pass verification rate, review turnaround, missing document aging, rejection reasons.
- Risks: malware, wrong-file disclosure, override abuse, expired document. Controls: quarantine, signed access, reason/approval/audit.

## 7. Acceptance/test

- File Quarantined không thể preview/download.
- Verified item thay file tạo version/history, không silent replace.
- Application chỉ Verified khi mọi required item đạt hoặc exception Approved.
- Test MIME mismatch, oversized file, infected file, expired, concurrent review, permission/export.

---

# SOP-ADM-006 — STUDENT ASSESSMENT

## 1. Mục tiêu và phạm vi

Lập lịch, thực hiện, ghi kết quả và recommendation theo template/version, bảo đảm assessor đủ quyền và kết quả Finalized bất biến.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Schedule | Admission Officer | Academic Manager | Parent/Assessor | Admission Manager |
| Conduct/record | Academic Assessor | Academic Manager | Parent nếu cần | Admission |
| Finalize/revise | Assessor | Academic Manager | Principal nếu exception | Auditor |

## 3. TO-BE

| Step | Action | Status | Rule |
|---:|---|---|---|
| 01 | Kiểm eligibility | Pending | Documents Verified; type rule |
| 02 | Chọn template/version và assessor | Scheduled | Qualified assessor |
| 03 | Gửi lịch/reminder | Scheduled | Approved channel |
| 04 | Record structured scores/notes | In Progress | Restricted fields |
| 05 | Validate và Finalize | Completed | BR-ADM-005 |
| 06 | Tạo recommendation/decision input | Completed | Không auto-reject bằng AI |

## 4. Rules/exceptions

- **BR-ADM-005:** Finalized result không sửa; correction tạo revision lineage.
- Template version snapshot; assessor permission/qualification required.
- AI nếu dùng chỉ hỗ trợ draft, không tự Finalize/Decision.
- Exceptions: no-show, reschedule, inconclusive, accommodation, special support, conflict of interest.

## 5. Data/FR/control

- Entities: Assessment, TemplateVersion, Score, Recommendation, Revision.
- FR schedule, template, structured score, finalize, revision, restricted view.
- Audit schedule/assessor change, result edit, finalize, revision, sensitive view/export.
- Controls: need-to-know, immutable result, template version, SoD/conflict check.
- KPI: scheduling time, turnaround, no-show, revision rate, inconclusive rate.

## 6. Acceptance/test

- Unauthorized Admission user không xem assessment narrative/score.
- Finalized Assessment PATCH bị chặn; CreateRevision tạo record mới linked original.
- Inconclusive result không cho tạo Offer nếu rule yêu cầu final decision.
- Test no-show, accommodation, revision, template retirement, concurrent finalize, export audit.

---

# SOP-ADM-007 — OFFER MANAGEMENT

## 1. Mục tiêu

Tạo, phê duyệt, phát hành, theo dõi và xử lý Offer có version, terms, expiry và authorized response.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Draft Offer | Admission Officer | Admission Manager | Academic/Finance | Parent |
| Approve exception | Manager | Principal/Business Owner | Finance | Auditor |
| Issue | Admission Officer | Admission Manager | — | Parent |
| Accept/Decline | Authorized Guardian | Guardian | Admission | Finance |

## 3. TO-BE

| Step | Action | Status | Control |
|---:|---|---|---|
| 01 | Tạo Offer từ Finalized Decision | Draft | Program/campus/capacity |
| 02 | Snapshot terms/template/expiry | Draft | BR-ADM-006 |
| 03 | Submit và approve | Pending Approval → Approved | Approval matrix/SoD |
| 04 | Render và Issue | Issued | Version/evidence |
| 05 | Track Viewed/reminder/expiry | Viewed/Expired | Scheduler/idempotency |
| 06 | Record authorized response | Accepted/Declined | BR-ADM-007 |

## 4. Rules/exceptions

- **BR-ADM-006:** Offer có version, validity period, approved terms.
- **BR-ADM-007:** Expired Offer không Accept nếu chưa extend/reissue hợp lệ.
- Issued Offer không sửa; thay đổi tạo version mới/supersede.
- Response cần authorized guardian, time, channel/evidence.
- Exceptions: waitlist, conditional offer, capacity change, expiry, withdrawal, wrong recipient.

## 5. FR/automation/notification

- Draft/submit/approve/issue/respond/expire/reissue/withdraw.
- AUTO render, expiry scheduler; NOTIFICATION issued, viewed optional, near expiry, response.
- Integration: email/portal/e-signature optional.

## 6. Permission/audit/KPI

- Officer draft/issue approved; Approver decision; Guardian scoped response; Finance view terms cần thiết.
- Audit terms before/after, approvals, issue delivery, view/response, expiry, reissue/withdraw.
- KPI: decision-to-offer, offer acceptance, expiry, reissue rate, response time.

## 7. Acceptance/test

- Issue bị chặn nếu Offer chưa Approved hoặc thiếu expiry.
- Double-click Issue/Accept không tạo hai event/enrollment.
- Expired Offer Accept trả conflict/validation.
- Test conditional terms, provider delivery failure, wrong guardian, reissue lineage, approval SoD.

---

# SOP-ADM-008 — ENROLLMENT CONFIRMATION

## 1. Mục tiêu

Xác nhận Enrollment duy nhất khi Offer đã Accepted và blocker bắt buộc được xử lý; giữ capacity và phát event cho Contract/Fee/Handover.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Readiness check | Admission Officer/System | Admission Manager | Finance/Academic | Parent |
| Confirm Enrollment | Admission Manager/System rule | Admission Manager | Finance/SIS | Principal |
| Hold/Cancel | Authorized Officer | Admission Manager | Finance/Academic | Parent/Auditor |

## 3. TO-BE

| Step | Action | Output/Status | Rule |
|---:|---|---|---|
| 01 | Tạo pending Enrollment từ Accepted Offer | Pending Confirmation | Idempotent |
| 02 | Tính readiness blockers | Blocker list | BR-ADM-008 |
| 03 | Kiểm duplicate/capacity | Ready/Blocked | BR-ADM-009 |
| 04 | Confirm Enrollment | Confirmed | Authority + audit |
| 05 | Reserve capacity/phát event | Pending Contract/Financial | Integration/outbox |
| 06 | Hold/Cancel nếu exception | On Hold/Cancelled | Reason + impact |

## 4. Rules/exceptions

- **BR-ADM-008:** Confirm khi Offer Accepted và blocker required resolved.
- **BR-ADM-009:** không có enrollment trùng thời gian/program/campus nếu policy cấm.
- Blocker hiển thị source, owner và action.
- Exceptions: deposit pending, capacity race, conditional acceptance, duplicate student, start-date change, cancellation.

## 5. Data/FR/audit

- Entities: Enrollment, ReadinessCondition, CapacityReservation, Offer, ProspectStudent.
- FR readiness, confirm, hold/cancel, duplicate, capacity adapter, event.
- Audit blocker override, confirmation, capacity, start date, hold/cancel/reason.
- KPI: offer-to-confirm, blocker aging, cancellation, capacity conflict.

## 6. Acceptance/test

- Confirm command idempotent; không tạo hai Enrollment.
- Capacity conflict đồng thời chỉ một transaction thành công.
- Hold/Cancel yêu cầu permission, reason và downstream impact handling.
- Test accepted/expired offer, duplicate, conditional blocker, provider capacity failure, cross-campus access.

---

# SOP-ADM-009 — CONTRACT & FEE PLAN SETUP

## 1. Mục tiêu

Sinh Contract/Fee Plan từ template/schedule version, kiểm soát discount/exception và kích hoạt bản đã duyệt/ký theo policy.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Generate Contract/Fee | Finance Officer | Finance Manager | Admission | Parent |
| Discount request | Admission/Finance | Finance Manager | Business Owner | Auditor |
| Approve exception | Finance Manager | Authorized Approver | Principal/Legal TBD | Admission |
| Activate | Finance Officer | Finance Manager | Parent | Admission |

## 3. TO-BE

| Step | Action | Output/Status | Control |
|---:|---|---|---|
| 01 | Chọn template/schedule version | Draft Contract/FeePlan | Effective master |
| 02 | Generate terms/lines/totals | Draft | Calculation integrity |
| 03 | Request discount nếu có | Pending Approval | BR-ADM-010 |
| 04 | Review/approve | Approved | Threshold/SoD |
| 05 | Render/sign Contract | Pending Signature | Evidence/provider |
| 06 | Activate Contract/FeePlan | Active | BR-ADM-011 |

## 4. Rules/exceptions

- **BR-ADM-010:** discount vượt threshold configurable cần approval.
- **BR-ADM-011:** Active Contract/FeePlan không sửa; amendment/successor.
- Totals được tính từ lines; không nhập manual total thiếu audit.
- Currency nhất quán; rounding/tax policy configurable.
- Exceptions: scholarship, custom terms, split payer, signature delay, price change, waived fee.

## 5. Data/FR/integration

- Entities: Contract, FeePlan, FeePlanLine, DiscountRequest, ApprovalInstance, DocumentAsset.
- FR generate/version/render/sign/activate; discount request/decision; calculation/reconciliation.
- Integration: e-signature, billing/accounting/e-invoice/payment downstream optional.

## 6. Permission/audit/KPI/risk

- Finance manage; Admission request/view limited; Approver threshold; Auditor read.
- Audit template/version, line calculation, discount, terms diff, signature, activate/void/export.
- KPI: enrollment-to-contract, approval cycle, discount rate/value, signature aging.
- Risks: unauthorized discount, wrong fee version, manual total change, contract leakage.

## 7. Acceptance/test

- Fee total tái tính chính xác từ lines/discount theo rule.
- Discount vượt threshold không thể approve bởi requester nếu SoD cấm.
- Active Contract update bị chặn; amendment linked original.
- Test boundary threshold, rounding, custom terms, provider signature failure, concurrent activation, restricted export.

---

# SOP-ADM-010 — OPERATIONAL HANDOVER

## 1. Mục tiêu

Bàn giao hồ sơ Enrollment sang Academic/Operations với checklist, evidence, exception approval và receiver acceptance rõ ràng.

## 2. RACI

| Activity | R | A | C | I |
|---|---|---|---|---|
| Chuẩn bị package | Admission Officer | Admission Manager | Finance/Health | Academic |
| Review/return/accept | Academic/Operations Receiver | Academic Manager | Admission | Principal |
| Exception | Item Owner | Principal/Authorized Approver | Compliance | Auditor |

## 3. TO-BE

| Step | Action | Status | Control |
|---:|---|---|---|
| 01 | Generate checklist snapshot | Not Ready | Program/campus/context |
| 02 | Link source object/evidence | Not Ready/Ready | Item-level owner |
| 03 | Request/approve exception | Exception Pending/Approved | Approval + expiry |
| 04 | Submit package | Submitted | BR-ADM-012 |
| 05 | Receiver review | Submitted | Need-to-know |
| 06 | Return hoặc Accept | Returned/Accepted | Reason/checklist |

## 4. Rules/exceptions

- **BR-ADM-012:** chỉ Accept khi required items complete hoặc exception Approved.
- Checklist version snapshot; source link không thay bằng free text nếu object tồn tại.
- Return bắt buộc reason/item owner/due date.
- Accepted package không quay ngược bằng command thường.
- Exceptions: missing health record/consent/pickup, contract pending, start date urgent, approved temporary waiver.

## 5. Data/FR/notification

- Entities: HandoverPackage, HandoverItem, Enrollment, Task, Approval, DocumentAsset.
- FR prepare/complete/link/request exception/submit/return/accept.
- Notifications submit, return, overdue correction, exception decision, accepted.

## 6. Permission/audit/KPI

- Admission edit trước submit; Receiver review/return/accept; item owner view/action; Auditor read.
- Audit checklist snapshot, item change, evidence access, exception, submit/return/accept.
- KPI: clean handover rate, return count/reasons, handover turnaround, exception rate.
- Dashboard: Ready not submitted, returned overdue, pending exception, start-date risk.

## 7. Acceptance/test

- Submit bị chặn nếu required item Missing và không có Approved exception.
- Receiver ngoài campus/scope không mở package.
- Return tạo task cho item owner và giữ lịch sử.
- Accept phát HandoverAccepted một lần, tạo downstream onboarding event idempotent.
- Test missing consent, expired exception, multiple returns, concurrent accept, restricted document access.

---

# 12. CROSS-SOP CONTROL MATRIX

| Control | ADM-001/002 | ADM-003 | ADM-004/005 | ADM-006 | ADM-007/008 | ADM-009 | ADM-010 |
|---|---|---|---|---|---|---|---|
| Duplicate/identity | ✓ | — | ✓ | — | ✓ | — | ✓ |
| Status guards | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Approval/SoD | Merge | Override | Override | Revision | Offer/Confirm | Discount/Terms | Exception |
| Immutable/version | Merge lineage | Reschedule history | Document version | Finalized revision | Offer/Enrollment | Contract/Fee | Accepted package |
| HRI field control | Contact | Attendee | Child/document | Result | Terms/student | Finance | Child/health/consent |
| Export audit | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ |

# 13. CROSS-SOP TRACEABILITY BASELINE

| SOP | Primary BR | Primary FR | UAT |
|---|---|---|---|
| ADM-001 | BR-ADM-001/002/016/017 | FR-ADM-001…004 | UAT-006 |
| ADM-002 | Active Lead next action | Interaction/Task | UAT-007 |
| ADM-003 | Schedule/outcome | Tour commands | UAT-007 |
| ADM-004 | BR-ADM-003/004 | Application commands | UAT-008 |
| ADM-005 | Document/scan/verify | File/checklist | UAT-008 |
| ADM-006 | BR-ADM-005 | Assessment/revision | UAT-009 |
| ADM-007 | BR-ADM-006/007 | Offer lifecycle | UAT-010 |
| ADM-008 | BR-ADM-008/009 | Enrollment/readiness | UAT-011 |
| ADM-009 | BR-ADM-010/011 | Contract/Fee/Discount | UAT-012 |
| ADM-010 | BR-ADM-012 | Handover commands | UAT-013 |

# 14. PILOT QUALITY CHECKLIST

Mỗi SOP chỉ chuyển `Approved` khi:

- [ ] Process Owner/Approver xác nhận.
- [ ] Trigger/Input/Output/RACI đủ.
- [ ] Workflow và exception được walkthrough.
- [ ] Business Rules testable.
- [ ] Status transition khớp canonical lifecycle.
- [ ] Permission và audit được Security review.
- [ ] KPI formula có owner; target có baseline hoặc TBD.
- [ ] Acceptance Criteria/Test Case được QA mapping.
- [ ] Legal/privacy/retention được đối chiếu khi liên quan.
- [ ] Seed/UAT scenario chạy qua không có blocker nghiêm trọng.

# 15. OPEN BUSINESS DECISIONS

1. School Tour bắt buộc theo trường hợp nào?
2. Assessment bắt buộc theo age/program nào?
3. Deposit/payment có blocker Enrollment không?
4. Discount threshold và cấp approval?
5. Offer/Contract có e-signature không?
6. Parent Portal có trong MVP không?
7. Handover checklist chính thức?
8. Retention cho Lead/Application không chuyển đổi?
9. Capacity source of truth?
10. Owner phê duyệt admission exception?

`Cần kiểm tra/đối chiếu quy định hiện hành trước khi áp dụng chính thức.`
