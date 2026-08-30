# ADR-008: Object Storage và Malware Scan

- Status: Proposed — provider TBD (`DEC-006`)
- Date: 2026-08-29

## Proposed decision

Binary nằm trong object storage sau adapter; metadata/state nằm PostgreSQL. Upload
vào quarantine với allowlist/type/size, random key và malware scan; download dùng
authorization lại và signed URL ngắn hạn.

Provider, region, retention và scanner phải được duyệt trước implementation thật.

