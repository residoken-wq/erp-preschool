# Backup & Restore Runbook — Baseline

## Trước pilot

1. Chốt RPO/RTO với Business Owner.
2. Bật backup mã hóa cho PostgreSQL và object storage.
3. Tách quyền backup khỏi application runtime.
4. Thực hiện restore rehearsal trên môi trường cô lập.
5. Ghi thời lượng, checksum, migration version và người xác nhận.

## Development backup example

```bash
docker compose exec -T postgres pg_dump -U sop_os -d sop_os -Fc > sop_os_dev.dump
```

Không dùng ví dụ này như production policy nếu chưa có encryption, access control và retention được duyệt.

