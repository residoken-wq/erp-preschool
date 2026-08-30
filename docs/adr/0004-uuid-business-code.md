# ADR-004: UUID và Business Code

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Dùng UUID làm technical identifier và business code riêng cho đối tượng cần mã
nghiệp vụ đọc được.

## Consequences

Business code có unique scope rõ theo organization/campus và không mang PII. Client
không được suy ra authorization từ UUID khó đoán.

