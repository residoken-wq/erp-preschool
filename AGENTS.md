# ERP Preschool — Project Instructions

## 1. Mục tiêu và phạm vi

Dự án xây dựng một Preschool ERP đa cơ sở, bắt đầu từ SOP Operating System và
Lead-to-Enrollment, sau đó mở rộng sang SIS, safeguarding, y tế, học vụ, billing,
bếp, nhân sự, logistics, tài sản và governance. Hệ thống dự kiến dùng AI để hỗ
trợ vận hành, nhưng AI không thay thế kiểm soát nghiệp vụ hoặc người có thẩm quyền.

Mọi thay đổi phải ưu tiên, theo thứ tự:

1. An toàn của trẻ.
2. Bảo mật và quyền riêng tư của trẻ, phụ huynh và nhân sự.
3. Tính toàn vẹn tài chính, phê duyệt và audit.
4. Khả năng truy vết từ SOP đến rule, requirement, test và release.
5. Khả năng mở rộng đa cơ sở và bảo trì dài hạn.

## 2. Hiện trạng repository

- Application root là source canonical kể từ Phase 0 ngày 30/08/2026.
- Bản release candidate nguồn tại
  `docs/SOP_ERP_PRESCHOOL/SOP_OS_ALL_ANALYSIS_AND_SOURCE_FILES/SOP_OS_COMPLETE_PACKAGE/02_Release_Candidate_Source`
  là snapshot lịch sử chỉ đọc sau khi promotion.
- Các file ZIP trong `03_Release_History` là artifact lịch sử, không sửa và không
  dùng làm source phát triển.
- Không sửa application source trong snapshot hoặc release ZIP. Mọi thay đổi code
  mới chỉ thực hiện tại root. Bằng chứng promotion nằm tại
  `docs/governance/SOURCE_PROMOTION_MANIFEST.md`.

## 3. Thứ tự ưu tiên của tài liệu

Khi tài liệu mâu thuẫn, không tự chọn một giá trị nghiệp vụ. Dùng thứ tự sau:

1. Quyết định/ADR đã được người có thẩm quyền phê duyệt.
2. `docs/IMPLEMENTATION_ROADMAP.md` cho delivery sequence và gate. Chỉ Phase 0 đã
   được phê duyệt thực thi; phase sau vẫn phải qua gate tương ứng.
3. `docs/SOP_OS_MASTER_BUILD_PLAN_CONSOLIDATED.md` cho canonical SOP ID và roadmap cấp cao.
4. Bộ 25 SOP trong `docs/ERP_PreSchoolSOP (1).md` cho business intent cấp enterprise.
5. `01_Analysis_Documents` cho baseline MVP, data model, UX và architecture.
6. Migration, API contract và code hiện hành cho hành vi release candidate thực tế.

Code hiện hành không biến một rule nghiệp vụ chưa duyệt thành rule chính thức.
Nếu source và spec lệch nhau, ghi nhận gap; không âm thầm sửa spec hoặc code để
trông có vẻ khớp.

Các tuyên bố như “Ready for Baseline”, “100%”, “tuân thủ pháp luật” hoặc “triệt
tiêu hoàn toàn rủi ro” trong tài liệu không phải bằng chứng phê duyệt, kiểm thử
hay tư vấn pháp lý.

## 4. Zero-assumption và configuration-first

- Không hardcode ngưỡng chiết khấu, giờ chốt, SLA, thời hạn giữ chỗ, nhiệt độ,
  tỷ lệ giáo viên/trẻ, retention, hạn mức tài chính hoặc cấp phê duyệt nếu chưa có
  quyết định được duyệt.
- Đưa rule có thể thay đổi vào master/config có version, `valid_from/valid_to`,
  scope organization/campus và audit before/after.
- Rule ảnh hưởng pháp lý phải có `policy_reference`, trạng thái xác minh và owner.
- Giá trị ví dụ trong SOP không được dùng làm default production.
- Timezone nghiệp vụ lấy theo campus/organization; lưu timestamp dạng UTC.
- Tiền dùng decimal/numeric và ISO currency; không dùng floating point.

Khi thiếu quyết định, triển khai interface/configuration point hoặc đánh dấu
blocker có owner. Không bịa dữ liệu để hoàn thành happy path.

## 5. Data classification và privacy

Dùng bốn cấp canonical: `PUB`, `INT`, `CON`, `HRI`.

- HRI gồm dữ liệu trẻ, y tế/dị ứng/thuốc, safeguarding, sinh trắc học, giấy tờ
  định danh, authorized pickup, assessment, hợp đồng và bằng chứng sự cố.
- Data minimization là mặc định. API chỉ trả field cần cho use case và role.
- UI masking không phải security control; filter/masking phải thực thi server-side.
- Mọi query nghiệp vụ phải enforce `organization_id`; entity theo cơ sở phải enforce
  campus scope từ actor, không tin campus ID do client gửi.
- Không ghi PII/HRI, token, secret, nội dung hồ sơ hoặc prompt nhạy cảm vào log,
  telemetry, exception, fixture, screenshot hay chat.
- Dev/test chỉ dùng synthetic hoặc anonymized data.
- Export HRI là permission riêng, yêu cầu reason nếu policy quy định và luôn audit.
- Không tạo full-text/vector index rộng cho HRI. Retrieval phải kiểm tra ACL trước
  khi tạo snippet hoặc context.
- Retention/deletion/anonymization phải dựa trên policy đã duyệt, hỗ trợ legal hold
  và tạo audit evidence.

## 6. Security và authorization

- Deny by default; authentication và authorization bắt buộc ở API, không chỉ UI.
- Permission phải kết hợp action + organization + campus + domain + data class.
- System Admin không mặc nhiên được đọc HRI.
- Enforce Segregation of Duties trong domain/application layer và test trực tiếp
  API. Requester/author không tự approve khi policy cấm.
- `AUTH_MODE=development`, header actor giả lập và wildcard permission chỉ được tồn
  tại local development/test. Production/staging phải fail startup nếu còn bật.
- Các mutation quan trọng phải ghi business change + audit + outbox trong cùng
  transaction.
- Audit là append-only, nhưng hash chain không được mô tả như chữ ký số/WORM nếu
  chưa có key management, restricted writer và verification độc lập.
- File upload phải có allowlist type/size, quarantine, malware scan, object key ngẫu
  nhiên, signed short-lived access và authorization tại download.
- Webhook phải kiểm tra signature, timestamp/replay window, idempotency và raw body
  theo yêu cầu provider; không xác nhận thanh toán chỉ từ payload client.
- Secret chỉ qua secret manager/environment được validate; không commit secret thật.

## 7. Quy tắc tích hợp AI

### 7.1 Phạm vi được phép

AI có thể hỗ trợ soạn draft SOP, tóm tắt, tìm kiếm theo SOP Effective, OCR/extract
tài liệu, phát hiện trùng, phân loại ticket, gợi ý route, phân tích xu hướng và tạo
dự báo. Ban đầu phải chạy ở chế độ recommendation hoặc shadow mode.

### 7.2 Quyết định AI không được tự thực hiện

AI không được tự:

- cho phép/từ chối đón hoặc bàn giao trẻ;
- cấp thuốc, chẩn đoán, thay đổi allergy/medical flag;
- xác nhận check-in/check-out hoặc đóng chuyến xe;
- xác nhận thanh toán, hoàn tiền, discount hoặc bút toán;
- tuyển dụng, chấm điểm/kỷ luật nhân sự hoặc ra quyết định bảo vệ trẻ;
- công bố thông cáo, liên hệ cơ quan/báo chí hoặc đóng crisis case;
- approve/publish SOP, policy, legal text hoặc thay đổi quyền;
- xóa/anonymize HRI hoặc gỡ legal hold.

Các quyết định trên phải do deterministic rule + người có thẩm quyền thực hiện.

### 7.3 AI engineering controls

- Mọi use case có owner, risk tier, mục đích, dữ liệu được phép, metric, fallback,
  human reviewer và kill switch trước khi build.
- Dùng AI gateway/provider adapter; domain module không gọi model SDK trực tiếp.
- Version model, prompt, tool schema, retrieval policy và eval dataset.
- Ưu tiên structured output có schema; validate output như untrusted input.
- Tool allowlist tối thiểu; tool có side effect cần authorization lại tại thời điểm
  thực thi và human confirmation ở use case rủi ro cao.
- Chống prompt injection từ tài liệu, email, ticket và web content. Nội dung được
  retrieval không được nâng thành system instruction.
- RAG chỉ dùng SOP version Effective/approved phù hợp scope. Citation phải trỏ về
  stable source/version; nếu thiếu nguồn thì AI nói không đủ bằng chứng.
- Không gửi HRI ra provider nếu chưa có data-processing approval, region/retention
  decision và redaction policy. Không dùng dữ liệu dự án để train theo mặc định.
- Lưu audit metadata tối thiểu: use case, model/prompt version, source IDs, output
  hash, confidence, reviewer decision, latency/cost; tránh lưu plaintext HRI.
- Có golden eval, regression gate, monitoring drift/false negative và rollback cho
  mọi thay đổi model/prompt/retrieval.

## 8. Kiến trúc và boundary

- Giữ modular monolith cho đến khi có bằng chứng cần tách service.
- Module sở hữu table, command, event và policy của mình; không query chéo tùy tiện.
- Domain rule/state machine là pure TypeScript, không phụ thuộc NestJS/HTTP/DB.
- API mutation dùng command endpoint; không expose generic status update hoặc CRUD
  cho stateful aggregate.
- Shared packages chỉ chứa contract/domain/config thật sự dùng chung; không biến
  thành nơi chứa business logic không owner.
- External provider nằm sau typed adapter và có timeout, retry/backoff, circuit
  breaker khi phù hợp, idempotency và dead-letter/reconciliation.
- Sự cố notification/provider không rollback business transaction đã commit.

## 9. Database và migration

- Migration đã commit/applied là immutable; sửa bằng migration mới.
- Mỗi bảng nghiệp vụ phải xác định tenant boundary, campus scope, classification,
  retention, audit behavior và delete policy.
- Foreign key multi-tenant phải ngăn cross-organization reference; không chỉ dựa
  vào code review.
- Dùng DB constraints cho invariant quan trọng: unique effective version theo scope,
  transition prerequisites có thể biểu diễn, idempotency key, và amount validity.
- Cân nhắc RLS như defense-in-depth, nhưng service-layer scope vẫn bắt buộc.
- JSONB chỉ dùng cho payload có schema/version rõ; dữ liệu cần join, constraint,
  permission field-level hoặc reporting ổn định nên chuẩn hóa thành bảng/cột.
- Migration phải được test trên database trống và bản database ở version trước;
  có forward/rollback hoặc recovery plan và reconciliation.

## 10. API, validation và error handling

- Validate request bằng schema/DTO tại boundary; reject unknown/oversized/invalid data.
- Không dùng `Record<string, unknown>` làm contract lâu dài cho command/response.
- Mutation có retry risk dùng idempotency key; concurrency dùng `row_version`/ETag.
- Trả 400 cho syntax/input, 401 chưa auth, 403 thiếu quyền, 404 cho object ngoài
  scope để tránh leak, 409 conflict/idempotency/concurrency, 422 business rule.
- Error payload có stable code và correlation ID, không lộ stack/SQL/HRI.
- List/search/export phải pagination và upper bound; không có unbounded endpoint.
- Contract thay đổi phải cập nhật shared schema/API documentation và contract tests.

## 11. Testing và quality gates

Mọi thay đổi phải có test tương xứng rủi ro:

- Unit: rule, calculation, state machine, redaction và AI output validator.
- Integration: migration, constraint, transaction, audit/outbox, RLS/scope.
- Contract: request/response/error/idempotency/webhook.
- E2E: happy path và exception của SOP critical.
- Negative security: cross-org/campus, missing permission, SoD, mass assignment,
  direct API, export, upload và prompt injection.
- Accessibility: keyboard, focus, label/error summary, không dùng màu làm tín hiệu duy nhất.
- Recovery: retry/dead-letter, backup/restore và reconciliation.
- AI: golden set, adversarial set, false-positive/false-negative, citation/grounding,
  data leakage, latency và cost budget.

Không giảm test, permission, audit hoặc validation để làm CI xanh. Nếu không chạy
được một gate, báo chính xác gate chưa chạy và lý do.

## 12. Quy trình thay đổi

Trước khi code:

1. Xác định canonical SOP/use case và owner.
2. Trace `SOP step -> BR -> FR -> AC -> Test`.
3. Phân loại dữ liệu và threat-model đường đi dữ liệu.
4. Xác định state transition, permission/SoD, audit/outbox và failure modes.
5. Chốt config/decision còn thiếu hoặc ghi blocker có owner.

Khi code:

- Thay đổi nhỏ, theo module; không refactor ngoài phạm vi khi chưa có lý do.
- Không sửa generated/build output, lockfile thủ công hoặc release ZIP.
- Không tạo dependency/vendor mới nếu adapter/decision chưa được chấp nhận.
- Cập nhật migration, seed synthetic, test, API contract và docs trong cùng change.

Trước khi hoàn tất:

1. Chạy lint, typecheck, unit/integration test và build liên quan.
2. Với workflow/UI P0, chạy E2E hoặc ghi rõ chưa thể chạy.
3. Review tenant/campus/data-classification/SoD/audit/idempotency.
4. Ghi gap còn lại, migration/rollback impact và bằng chứng test.

## 13. Definition of Done tối thiểu

Một thay đổi chỉ hoàn tất khi acceptance criteria được chứng minh, permission và
scope có negative test, mutation quan trọng có audit/outbox, migration được verify,
không có secret/PII trong diff/log, tài liệu traceability được cập nhật, và không
còn Sev-1/Sev-2 hoặc lỗ hổng Critical/High chưa được xử lý/waive đúng thẩm quyền.

## 14. Quy ước kỹ thuật repository

- Runtime baseline: Node.js 22 LTS, pnpm 10, TypeScript strict, Next.js Web,
  NestJS API/worker và PostgreSQL 16.
- Cài dependency bằng `pnpm install --frozen-lockfile`; không sửa lockfile thủ công.
- Dùng alias/package boundary đã khai báo; không import bằng đường dẫn xuyên module.
- Tên file TypeScript dùng kebab-case; type/class PascalCase; biến/hàm camelCase;
  hằng số môi trường UPPER_SNAKE_CASE.
- Không dùng `any`, non-null assertion hoặc disable lint để che lỗi nếu chưa có lý
  do được ghi nhận. Parse dữ liệu ngoài tại boundary và thu hẹp kiểu trước khi dùng.
- Controller chỉ xử lý transport/validation/auth context; application service điều
  phối command; domain giữ invariant thuần; repository/adapter xử lý I/O.
- Không gọi `process.env` rải rác; mọi biến môi trường phải qua package config có
  schema validation và production startup guard.
- Test đặt cạnh module hoặc trong thư mục test theo convention hiện có; tên test
  mô tả behavior, scope và kết quả, không chỉ tên method.
- Trước khi handoff chạy tối thiểu `pnpm lint`, `pnpm typecheck`, `pnpm test`,
  `pnpm build`; thay đổi compose chạy thêm `docker compose config --quiet`.
- Không commit `.env`, dependency/build output, coverage, local database dump,
  screenshot chứa dữ liệu, khóa/token hoặc artifact release tự sinh.

##15. Quy ước UI/UX
- Luôn sử dụng Tailwind CSS cho việc định dạng giao diện.
- Thiết kế theo phong cách tối giản (Minimalism), hiện đại, các góc bo tròn lớn (rounded-xl/rounded-2xl).
- Đảm bảo tính năng Dark mode và hỗ trợ hiển thị tốt trên thiết bị di động (Responsive).
- Mã nguồn phải phân tách rõ ràng: Chia nhỏ thành các component nguyên tử (atomic components), không viết code trùng lặp.
