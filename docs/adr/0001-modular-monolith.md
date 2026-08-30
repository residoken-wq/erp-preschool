# ADR-001: Modular Monolith cho MVP

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Một Web, một API và một Worker, với module boundaries rõ. Không tách microservices trong MVP.

## Consequences

Giao dịch, audit và deployment đơn giản hơn. Code review phải ngăn module truy cập table/repository của module khác.

