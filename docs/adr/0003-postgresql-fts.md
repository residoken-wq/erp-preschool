# ADR-003: PostgreSQL và Full-text Search

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Dùng PostgreSQL 16 làm system of record và PostgreSQL FTS cho SOP search baseline.

## Consequences

Tránh search service sớm. FTS chỉ index dữ liệu được phép; HRI không được đưa vào
index rộng và mọi retrieval phải enforce ACL/scope trước khi trả snippet.

