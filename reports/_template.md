# Audit Report — Step [XX]

> File này do Claude (Audit Manager) soạn, dựa trên diff/commit của Codex đối chiếu với `tasks/step-XX.md` và SOP nguồn liên quan. Không đọc lại toàn bộ codebase — chỉ audit phần thay đổi trong step này.

## 1. Thông tin step
- Task spec: `tasks/step-XX.md`
- Commit/branch được audit: `<hash hoặc tên branch>`
- Ngày audit: ...

## 2. Đối chiếu Acceptance Criteria

| # | Tiêu chí | Kết quả | Ghi chú |
|---|----------|---------|---------|
| 1 | ... | ✅ Đạt / ❌ Không đạt | ... |
| 2 | ... | ✅ Đạt / ❌ Không đạt | ... |
| 3 | ... | ✅ Đạt / ❌ Không đạt | ... |

## 3. Kiểm tra phạm vi (SCOPE)
- [ ] Chỉ sửa đúng file được phép trong mục 3 của task spec
- [ ] Không có file ngoài scope bị thay đổi
- Nếu có vi phạm scope: liệt kê file + lý do cần xem xét: ...

## 4. Kiểm tra tuân thủ SOP / AGENTS.md
- [ ] Naming convention: ...
- [ ] Cấu trúc thư mục/pattern: ...
- [ ] Security/validation rule (nếu áp dụng): ...
- [ ] Không có code debug/comment thừa/secret bị hardcode

## 5. Rủi ro & nợ kỹ thuật phát sinh
- ...

## 6. Đề xuất phát sinh từ Codex (nếu có)
- Ghi lại đề xuất Codex nêu ở cuối task spec
- Quyết định: Chấp nhận đưa vào step sau / Từ chối và lý do

## 7. KẾT LUẬN

**Trạng thái: [ ] PASS  [ ] FAIL — cần sửa**

- Nếu PASS: cập nhật `docs/PLAN.md`, chuyển sang soạn `tasks/step-[XX+1].md`
- Nếu FAIL: soạn `tasks/step-XX-revise.md` với danh sách lỗi cụ thể cần Codex sửa, không viết lại toàn bộ spec

---
## Ghi vào CHANGELOG.md
```
[YYYY-MM-DD] Step XX - <tên step> - PASS/FAIL - <1 dòng tóm tắt>
```
