# ADR-009: Structured SOP Editor

- Status: Proposed — editor spike TBD
- Date: 2026-08-29

## Proposed decision

SOP content dùng schema có version cho section/step/RACI, được validate server-side;
không lưu arbitrary editor payload như contract lâu dài.

Editor library chỉ được chọn sau spike về accessibility, concurrency, migration,
security và khả năng export/diff.

