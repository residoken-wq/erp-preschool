# ADR-007: OIDC Identity Adapter

- Status: Proposed — IdP TBD (`DEC-004`)
- Date: 2026-08-29

## Context

Production cần trusted identity, MFA/account lifecycle và claim mapping nhưng IdP
chưa được chọn.

## Proposed decision

Đặt IdP sau typed OIDC adapter. Domain nhận actor context chuẩn hóa, không phụ thuộc
provider claim trực tiếp. Production/staging fail startup nếu dùng development actor.

