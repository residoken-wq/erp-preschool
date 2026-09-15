# Step [XX] — [Tên step ngắn gọn]

> File này do Claude (Planning/BA Manager) soạn. Codex chỉ được code đúng trong phạm vi mô tả dưới đây. Không tự ý mở rộng scope — mọi ý tưởng phát sinh ghi vào mục "Đề xuất phát sinh" ở cuối, KHÔNG tự implement.

## 1. Bối cảnh nghiệp vụ (BA)
- Vì sao cần step này: ...
- Nó phục vụ tính năng/luồng nghiệp vụ nào: ...
- Ai/cái gì sẽ dùng kết quả của step này (step sau, module khác, user...): ...

## 2. Mục tiêu kỹ thuật
- Input: ...
- Output mong đợi: ...
- Ràng buộc kiến trúc (pattern, layer, convention phải theo theo SOP): ...

## 3. Phạm vi thay đổi (SCOPE)
**Được phép sửa/tạo:**
- `path/to/file1.ts`
- `path/to/file2.ts`

**KHÔNG được đụng vào:**
- `path/to/critical-file.ts` (lý do: ...)
- Bất kỳ file config/migration nào ngoài danh sách trên

## 4. Acceptance Criteria (đo được, dùng để audit)
- [ ] Tiêu chí 1: ví dụ "API trả về đúng schema X khi input Y"
- [ ] Tiêu chí 2: ví dụ "Unit test cho case Z pass"
- [ ] Tiêu chí 3: ví dụ "Không có console.log/debug code còn sót"
- [ ] Tuân thủ convention đặt tên/style theo SOP mục [...]

## 5. Định nghĩa Done
- [ ] Build/compile không lỗi
- [ ] Test liên quan pass (liệt kê lệnh chạy test cụ thể nếu có)
- [ ] Đã commit theo format: `feat(step-XX): <mô tả ngắn>`
- [ ] Không có thay đổi ngoài phạm vi mục 3

## 6. Ghi chú / rủi ro cần lưu ý cho Codex
- ...

---
## Đề xuất phát sinh (Codex điền nếu có, KHÔNG tự code)
- Ý tưởng/refactor phát sinh ngoài scope: ...
- Vấn đề gặp phải cần Planning Manager quyết định: ...
