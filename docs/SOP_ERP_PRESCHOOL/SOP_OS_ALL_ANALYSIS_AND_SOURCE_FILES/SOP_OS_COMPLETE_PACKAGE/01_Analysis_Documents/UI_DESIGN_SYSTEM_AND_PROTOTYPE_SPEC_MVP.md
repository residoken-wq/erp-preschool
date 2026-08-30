# UI DESIGN SYSTEM & INTERACTIVE PROTOTYPE SPEC — SOP WEB APP MVP

| Thuộc tính | Giá trị |
|---|---|
| Mã tài liệu | UI-DS-MVP-001 |
| Phiên bản | 0.1 — Proposed |
| Product name dùng trong prototype | SOP OS |
| Baseline | Desktop-first, responsive, WCAG 2.2 AA target |
| Theme | Light-first, dark-ready |

## 1. Design direction

SOP OS sử dụng ngôn ngữ thiết kế **calm enterprise**: rõ ràng, đáng tin cậy, hiện đại và đủ thân thiện cho môi trường giáo dục. Giao diện tránh hai thái cực: ERP quá dày đặc hoặc ứng dụng giáo dục quá nhiều màu sắc.

### Brand attributes

- Clear.
- Trustworthy.
- Structured.
- Calm.
- Actionable.
- Inclusive.

### Visual principles

1. Neutral surfaces chiếm phần lớn giao diện.
2. Blue dùng cho action/selection; không dùng trang trí tràn lan.
3. Green, amber, red chỉ mang ý nghĩa trạng thái.
4. Status luôn có text/icon, không chỉ dựa màu.
5. Card chỉ dùng cho summary hoặc bounded interaction; không lồng card.
6. Table và workspace ưu tiên mật độ vừa, không giảm font để nhồi dữ liệu.

## 2. Foundation tokens

### 2.1 Color roles — Light

| Token | Proposed value | Usage |
|---|---|---|
| `bg-canvas` | `#F5F7FA` | App canvas |
| `bg-surface` | `#FFFFFF` | Navigation, workspace, dialog |
| `bg-subtle` | `#EEF2F7` | Selected/subtle grouping |
| `text-primary` | `#172033` | Main text |
| `text-secondary` | `#667085` | Metadata/helper |
| `border-default` | `#DCE2EA` | Divider/input border |
| `action-primary` | `#2563EB` | Primary action/selection |
| `action-primary-hover` | `#1D4ED8` | Hover |
| `focus-ring` | `#3B82F6` | Keyboard focus |
| `success` | `#16815A` | Completed/Effective |
| `warning` | `#B76E00` | Due/Incomplete/Warning |
| `danger` | `#C43D3D` | Reject/Error/Destructive |
| `info` | `#3569B8` | Informational state |

### 2.2 Dark-ready roles

| Role | Proposed value |
|---|---|
| Canvas | `#0F172A` |
| Surface | `#172033` |
| Subtle | `#25324A` |
| Text primary | `#EDF2F7` |
| Text secondary | `#A9B4C5` |
| Border | `#334155` |
| Primary action | `#7AA2FF` |

Dark theme không thuộc MVP MUST nhưng component không được hard-code giả định nền trắng.

### 2.3 Typography

| Role | Size/weight | Usage |
|---|---|---|
| Display | 28/500 | Page title đặc biệt, hạn chế |
| Heading 1 | 24/500 | Page title |
| Heading 2 | 20/500 | Section title |
| Heading 3 | 16/500 | Panel/subsection |
| Body | 14/400 | Default UI text |
| Body emphasis | 14/500 | Label/action |
| Small | 12/400 | Metadata, không dùng cho nội dung thiết yếu |

Font proposed: `Inter`, fallback system sans. Cần kiểm thử đầy đủ dấu tiếng Việt, số tabular và rendering trên Ubuntu/Windows.

### 2.4 Spacing

Base 4px:

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48`

- Control gap: 8–12px.
- Form field vertical gap: 16px.
- Section gap: 24–32px.
- Page horizontal padding: 24px desktop, 16px tablet/mobile.

### 2.5 Shape and elevation

- Input/button radius: 8px.
- Surface/dialog radius: 12px.
- Status pill radius: full.
- Border 1px.
- Shadow chỉ dùng dialog/popover/sticky overlay; không dùng trên mọi card.

## 3. Layout system

### Desktop

- App sidebar: 232px expanded; 72px collapsed.
- Topbar: 56–64px.
- Content max width theo screen; workspace/table được phép full width.
- Context rail: 280–320px khi cần.

### Breakpoints — implementation reference

| Range | Behavior |
|---|---|
| `< 640px` | Mobile, single column, drawer navigation |
| `640–767px` | Large mobile |
| `768–1023px` | Tablet, collapsed sidebar |
| `1024–1279px` | Small desktop |
| `≥ 1280px` | Full desktop workspace |

Breakpoints là UX target, không bắt buộc phụ thuộc framework utility cụ thể.

## 4. App shell specification

### Sidebar

- Product mark/name.
- Menu group: Tổng quan, Quy trình, SOP, Công việc, Tuyển sinh, Danh mục, Báo cáo, Quản trị.
- Active item có nền subtle + primary text/icon.
- Menu không có quyền không hiển thị.
- Mobile chuyển thành drawer có close button và focus management.

### Topbar

- Breadcrumb/current page.
- Campus switcher.
- Global search.
- Notification.
- User menu.

Campus switcher thể hiện current scope nhưng không thay API authorization.

## 5. Component inventory

### 5.1 Actions

| Component | Variants | Rules |
|---|---|---|
| Button | Primary, Secondary, Ghost, Danger | Một primary action mỗi group |
| Icon Button | Neutral/Danger | Bắt buộc accessible label/tooltip |
| Split Button | Hạn chế | Chỉ khi action chính + 2–3 lựa chọn liên quan |
| Link | Inline/Navigation | Không giả button nếu là navigation |

Button states: default, hover, focus, pressed, disabled, loading. Loading giữ width và chặn double-submit.

### 5.2 Inputs

- Text, textarea, number, date/time.
- Select, searchable select, multi-select.
- Checkbox, radio, switch.
- File upload.
- Rich structured editor.
- Status transition selector.

Mọi input có visible label; placeholder không thay label. Error gồm message và hướng xử lý.

### 5.3 Navigation

- Sidebar navigation.
- Breadcrumb.
- Tabs.
- Section navigator.
- Pagination.
- Stage tracker.

Tabs chỉ dùng cho peer content; không dùng như wizard nếu có thứ tự bắt buộc.

### 5.4 Data display

- Data table.
- Description list.
- Timeline.
- Status badge.
- Avatar/role indicator.
- KPI summary.
- Progress/completeness.
- Empty/error/no-permission state.

### 5.5 Workflow

- Object Header.
- Blocker Panel.
- Approval Stepper.
- Task/SLA indicator.
- Version Diff.
- Validation Summary.
- Comment Thread.
- Command Confirmation Dialog.

### 5.6 Domain components

- Process Node/Tree.
- SOP Section Navigator.
- Structured SOP Step.
- RACI Matrix.
- Traceability Chain.
- Admission Stage Board.
- Document Checklist.
- Assessment Form.
- Offer/Contract Preview.
- Enrollment Readiness.
- Handover Checklist.

## 6. Status system

### Semantic mapping

| Meaning | Treatment |
|---|---|
| Neutral/Draft | Gray/neutral + label |
| Active/Effective/Completed | Green + check label |
| Pending/In Review/Scheduled | Blue + progress/clock label |
| Warning/Incomplete/Due | Amber + warning label |
| Rejected/Failed/Blocked | Red + reason/action |
| Archived/Superseded | Muted + history label |

Status component gồm label đầy đủ; tooltip chỉ bổ sung giải thích.

## 7. Data table specification

### Required behaviors

- Server pagination/filter/sort.
- Sticky header khi bảng dài.
- Column chooser.
- Saved personal view.
- Row selection chỉ khi có bulk action hợp lệ.
- Responsive column priority.
- Keyboard accessible row action.

### Density

- Comfortable mặc định.
- Compact tùy chọn cho power user.
- Không giảm font dưới baseline.

### Mobile

Table quan trọng chuyển sang stacked record list hoặc giữ horizontal scroll khi quan hệ cột bắt buộc.

## 8. Form and validation system

### Validation timing

- Client schema cho feedback nhanh.
- Server là authoritative.
- Validate on blur/submit; không báo lỗi trước khi user tương tác.
- Business Rule lỗi 422 được map vào field/object/blocker.

### Severity

- Blocking: ngăn submit/transition.
- Warning: cho phép theo policy.
- Info: gợi ý.

### Draft behavior

- Draft có thể thiếu field chưa required ở stage hiện tại.
- Autosave indicator: `Đang lưu`, `Đã lưu`, `Lỗi lưu`.
- Conflict 409 mở compare/reload/copy recovery.

## 9. Dialog and destructive actions

### Confirmation required

- Reject.
- Cancel/withdraw.
- Archive/retire.
- Merge duplicate.
- Override/skip transition.
- Permission change.
- Sensitive export.

Dialog phải hiển thị object, impact, reason field và irreversible warning nếu có. Focus trả lại trigger khi đóng.

## 10. Notification and feedback

- Inline validation cho field.
- Page-level error summary cho submit.
- Toast cho kết quả ngắn không cần hành động.
- Banner cho trạng thái kéo dài như Superseded/Read-only/Integration pending.
- Notification Center cho event cần xem lại.
- Không dùng toast cho mọi lần autosave.

## 11. Accessibility specification

- WCAG 2.2 AA target.
- Contrast ≥ yêu cầu AA.
- Native semantics trước ARIA.
- Visible focus ring.
- Keyboard navigation toàn bộ core flows.
- Heading hierarchy và landmarks.
- Label/error/help liên kết đúng input.
- Status không phụ thuộc màu.
- Screen-reader announcement có chọn lọc.
- Modal focus trap/restore.
- Touch target khoảng 44px trên coarse pointer.
- Reduced-motion support.

## 12. Motion

- 120–200ms cho hover/expand/dialog.
- Không dùng animation lặp.
- State transition có subtle movement/fade, không gây trì hoãn.
- Tôn trọng `prefers-reduced-motion`.
- Không animate số liệu chỉ để trang trí.

## 13. Content style

- Tiếng Việt ngắn, trực tiếp, dùng động từ cho action.
- Giữ thuật ngữ ERP phổ biến: Workflow, Approval, Master Data, Business Rule, Audit Trail.
- Status dùng danh từ/tính từ nhất quán.
- Error nói rõ vấn đề và cách sửa.
- Không dùng “Có lỗi xảy ra” nếu có thể cung cấp error code/correlation ID.

Ví dụ:

- Tốt: `Không thể gửi review vì SOP chưa có Process Owner.`
- Tránh: `Dữ liệu không hợp lệ.`

## 14. Ten P0 prototype screens

| # | Screen | Core interaction trong prototype |
|---:|---|---|
| 1 | Role Dashboard | Xem task/KPI/exception |
| 2 | Process Map | Chọn L0–L3 node |
| 3 | SOP Library | Search/filter/open SOP |
| 4 | SOP Detail | Tabs, metadata, Effective content |
| 5 | SOP Studio | Section navigation, validation, submit |
| 6 | Approval Workspace | Diff/comment/approve/request changes |
| 7 | Admission Pipeline | Chuyển board/list context |
| 8 | Lead Workspace | Timeline và primary action theo status |
| 9 | Application Workspace | Document checklist và blocker |
| 10 | Enrollment & Handover | Readiness và handover checklist |

## 15. Screen-specific design rules

### Dashboard

- Tối đa 4 KPI summaries.
- Task và exception đứng trước report.
- Mỗi widget có action rõ hoặc không xuất hiện.

### Process Map

- Level thể hiện qua hierarchy/indent, không chỉ màu.
- Node detail trong panel, không mở modal cho mỗi click.
- Heat/risk indicators optional và có legend.

### SOP Library

- Search/filter server-side.
- Current Effective version dễ nhận biết.
- Không đặt destructive action trực tiếp cạnh Open.

### SOP Studio

- 3 pane desktop; 2 pane tablet; read-only/review mobile.
- 30 phần gom 5 group.
- Structured fields trước rich text tự do.

### Approval

- Diff và impact nằm trước action.
- Approve/Request changes không đặt sát nhau thiếu phân biệt.
- Reason required theo rule.

### Admission workspace

- Dùng Object Header và Stage Tracker thống nhất.
- Blocker có owner và action.
- Board không hiển thị HRI.

## 16. Component states required before development

Mỗi component P0 có:

- Default.
- Hover/focus/pressed.
- Disabled/loading.
- Empty.
- Error.
- Read-only.
- No-permission nếu phù hợp.
- Mobile behavior.

## 17. Design-to-code mapping

| Design component | Frontend component proposed |
|---|---|
| App shell | `AppShell` |
| Object header | `ObjectHeader` |
| Status | `StatusBadge` |
| Stage tracker | `StageTracker` |
| Data table | `DataTable` |
| Filter bar | `FilterBar` |
| Blocker | `BlockerPanel` |
| Validation | `ValidationSummary` |
| Approval | `ApprovalStepper` |
| Section navigation | `SOPSectionNav` |
| Step editor | `SOPStepEditor` |
| Document checklist | `DocumentChecklist` |
| Readiness | `ReadinessPanel` |
| Audit timeline | `AuditTimeline` |

Component API được khóa trong Sprint 0 sau prototype review; không copy nguyên markup prototype vào production.

## 18. Prototype validation script

### Participants

- Process Owner.
- SOP Author/BA.
- Reviewer/Approver.
- Admission Officer.
- Academic/Finance representative.

### Tasks

1. Tìm SOP Effective `ADM-004`.
2. Mở Draft và xác định phần còn thiếu.
3. Review thay đổi và request changes.
4. Xác định Lead cần follow-up hôm nay.
5. Kiểm tra Application đang thiếu tài liệu gì.
6. Xác định blocker của Enrollment.
7. Kiểm tra điều kiện để Accept Handover.

### Measures

- Task completion.
- Critical error.
- Time-on-task tham chiếu.
- Navigation path.
- User confidence.
- Qualitative friction.

Không dùng target usability giả định trước khi chạy baseline.

## 19. Prototype acceptance criteria

1. Có đủ 10 màn hình P0.
2. Sidebar chuyển được giữa các màn hình.
3. Core status, object header và primary action nhất quán.
4. SOP Studio thể hiện section, editor và validation rail.
5. Approval thể hiện diff, comments và decision actions.
6. Admission screens không hiển thị HRI dư thừa trên dashboard/board.
7. Prototype reflow ở desktop/tablet/mobile.
8. Essential controls dùng keyboard/native semantics.
9. Không có text/control clipping ở 320px.
10. Prototype dùng dữ liệu mẫu, không dùng dữ liệu cá nhân thật.

## 20. Design review checklist

- [ ] Navigation không trùng chức năng.
- [ ] Primary action rõ theo state.
- [ ] Status có label, owner, next action/blocker.
- [ ] Table/filter phù hợp volume.
- [ ] Permission state được thể hiện.
- [ ] Empty/error/conflict states có thiết kế.
- [ ] Responsive variants đủ.
- [ ] Focus/keyboard/contrast đạt baseline.
- [ ] Dữ liệu HRI không xuất hiện ngoài context cần thiết.
- [ ] Component mapping đủ cho frontend backlog.

## 21. Output của Bước 8

- UI Design System Specification — tài liệu này.
- Interactive prototype 10 màn hình P0.
- Component inventory và design-to-code mapping.
- Prototype test script.
- Acceptance criteria và review checklist.

Sau khi stakeholder review prototype, cập nhật thành version `0.2 Reviewed`; chỉ chuyển `Approved` khi Process Owner, Product Owner và Tech Lead cùng xác nhận.

## 22. Bước kế tiếp

**Bước 9 — Detailed SOP Pilot Pack & Seed/Test Data**:

- Viết đầy đủ ADM-001…ADM-010 theo template chuẩn.
- Business Rules, RACI, exception, permission, audit, KPI, acceptance/test.
- Master data seed.
- Demo personas/users.
- Sample Lead/Application/Offer/Enrollment journeys.
- Importable baseline cho Sprint 0 và UAT.
