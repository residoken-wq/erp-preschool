# ADR-006: Transactional Outbox

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Business state, AuditEvent và OutboxEvent được ghi trong cùng PostgreSQL transaction. Worker xử lý at-least-once và consumer phải idempotent.

