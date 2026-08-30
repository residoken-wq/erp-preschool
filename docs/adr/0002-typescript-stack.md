# ADR-002: Next.js + NestJS + TypeScript

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Dùng TypeScript strict xuyên Web/API/Worker, Next.js cho Web và NestJS cho API.
Domain package không phụ thuộc framework.

## Consequences

Contract có thể chia sẻ có kiểm soát; framework DTO không được trở thành domain
model. Production support/versioning vẫn phải theo dependency governance.

