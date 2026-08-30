# ADR-012: PostgreSQL Row-level Security

- Status: Proposed — spike TBD (`DEC-009`)
- Date: 2026-08-29

## Proposed decision

Đánh giá RLS làm defense-in-depth cho tenant/campus tables sau spike connection
pool, migration role, background job, policy test và incident operations.

RLS không thay service-layer authorization/scope hay tenant-safe foreign key.

