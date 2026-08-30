# Source Promotion Manifest — Phase 0

## Quyết định

Ngày 30/08/2026, người dùng phê duyệt thực thi Phase 0. Release candidate được
promote thành application source canonical tại repository root. Snapshot nguồn
và release history trong `docs` được giữ nguyên, chỉ đọc, để truy vết.

## Nguồn và đích

| Thuộc tính | Giá trị |
|---|---|
| Source snapshot | `docs/SOP_ERP_PRESCHOOL/SOP_OS_ALL_ANALYSIS_AND_SOURCE_FILES/SOP_OS_COMPLETE_PACKAGE/02_Release_Candidate_Source` |
| Canonical target | repository root |
| File loại trừ | `AGENTS.md` của snapshot; root dùng project instructions cấp repository |
| Số file nguồn được promote | 90 |
| Tổng kích thước | 318,038 byte |
| Tree digest SHA-256 | `2115652db9e7d4d17ce37bb0a3088f75802cad33ad861d810a3a165676a42e15` |

Tree digest được tính trong source directory từ output `sha256sum` của danh sách
đường dẫn tương đối có prefix `./`, sắp xếp bytewise, rồi SHA-256 toàn bộ manifest;
không bao gồm `./AGENTS.md` tại snapshot root.

## Bằng chứng xác minh

- Preflight dry-run không phát hiện application file xung đột tại root.
- Đối chiếu SHA-256 sau copy: **90 file kiểm tra, 0 mismatch**.
- `rsync` checksum dry-run sau promotion không phát hiện khác biệt nội dung.
- Không sửa application logic trong thao tác promotion.
- Các file ZIP tại `03_Release_History` không bị sửa và không là source phát triển.

## Quy tắc sau promotion

1. Mọi code, migration, test và config mới chỉ thay đổi tại root.
2. Không backport thay đổi vào snapshot hoặc ZIP.
3. Nếu cần chứng minh lineage, so sánh với digest và inventory ở tài liệu này.
4. Thay đổi canonical source trong tương lai phải có ADR, inventory và migration
   plan riêng; không tạo source of truth thứ hai.
