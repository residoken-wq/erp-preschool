# ADR-013: Repository Root là Canonical Source

- Status: Accepted for Phase 0
- Date: 2026-08-30

## Decision

Promote release candidate từ snapshot trong `docs` ra repository root. Root là nơi
duy nhất nhận application change; snapshot và release ZIP chỉ đọc.

## Evidence

`docs/governance/SOURCE_PROMOTION_MANIFEST.md` ghi nguồn, digest và đối chiếu 90/90
file không mismatch.

