# ADR-011: Docker Development Environments

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Dùng Docker Compose cho local baseline và CI-compatible PostgreSQL/services. Artifact
được build từ frozen lockfile; environment config được validate khi startup.

## Consequences

Compose local không phải production topology. Hosting, HA, KMS, network và RPO/RTO
vẫn là open decisions.

