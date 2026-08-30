# SOP Import and Normalization Specification

## Phạm vi Phase 0

Chỉ xác lập canonical register và quy tắc import. Phase 0 không ghi 28 SOP vào DB
và không tự chuyển lifecycle sang Approved/Effective.

## Pipeline dự kiến Phase 2

1. Inventory source file, source section, byte/content hash và encoding.
2. Parse Markdown mà vẫn giữ raw source reference; normalize line ending, heading,
   escaped Markdown và whitespace bằng transform có version.
3. Map source ID/title sang 28 canonical ID theo Master Build Plan.
4. Phát hiện duplicate/collision; CRM-001 phải tạo review record thay vì tự merge.
5. Validate required sections/steps/RACI/schema; lỗi không bị bỏ qua.
6. Import `PROPOSED`/`DRAFT` idempotently với source lineage và import batch ID.
7. Reconcile source count, canonical count, rejected/duplicate/missing và content hash.
8. Human SOP owner review/approve; Effective lifecycle là command riêng có SoD.

## Invariant

- Cùng source hash + transform version không tạo version mới khi retry.
- Canonical ID unique theo organization, nhưng global template và tenant copy phải có
  lineage rõ; không suy đoán scope.
- Normalize presentation không sửa business meaning, con số, owner hoặc legal text.
- Search/RAG chỉ sử dụng version Effective đúng ACL/scope/time.
- Báo cáo reconciliation phải nêu rõ lỗi heading nguồn: “21 còn lại” nhưng danh
  sách thực 20, tổng canonical vẫn là 28.

