# Release Runbook — Baseline

1. Build image một lần từ commit đã duyệt.
2. Deploy staging và chạy migration.
3. Chạy smoke, E2E, permission, audit và accessibility tests.
4. Tạo backup/checkpoint production.
5. Apply migration rồi deploy app/worker/web.
6. Kiểm tra health, outbox backlog, error rate và critical workflows.
7. Roll-forward hoặc rollback theo migration compatibility.

