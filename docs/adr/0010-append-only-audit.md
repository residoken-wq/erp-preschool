# ADR-010: Append-only Business Audit

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Mutation quan trọng ghi business change audit append-only trong cùng transaction
với state và outbox. Audit lưu actor/scope/action/reason/correlation và before/after
đã minimization/redaction.

## Consequences

Không UPDATE/DELETE audit qua application role. Hash chain hiện có không được mô tả
là chữ ký số hoặc WORM nếu chưa có key/restricted writer/independent verification.

