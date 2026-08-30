# ADR-005: Explicit State Machine

- Status: Accepted for scaffold
- Date: 2026-08-29

## Decision

Business transition dùng command và guard rõ; không dùng generic PATCH status hoặc BPMN engine trong MVP.

## Evidence

`packages/domain` chứa Lead và SOP state-machine PoC cùng unit tests.

