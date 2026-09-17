# Local Demo Runbook

Runbook này chỉ áp dụng cho demo bằng dữ liệu synthetic trên cùng một máy. Không mở
port qua LAN/tunnel và không nhập dữ liệu người thật.

## Chuẩn bị lần đầu hoặc sau khi source thay đổi

```bash
cp .env.example .env
./scripts/local-services.sh rebuild
```

Web/API/PostgreSQL/MinIO được bind vào `127.0.0.1` theo mặc định.

## Reset về canonical scenario

Reset sẽ thay toàn bộ schema PostgreSQL local. Lệnh cố ý yêu cầu confirmation để
không vô tình xóa dữ liệu phát triển:

```bash
LOCAL_DEMO_RESET_CONFIRM=RESET_SYNTHETIC_DEMO \
  ./scripts/local-services.sh demo-reset
```

Kết quả chuẩn sau reset:

- migration mới nhất: `0007_offer_author_separation.sql`;
- 4 Lead, 2 Application, 3 Task và 3 SOP;
- outbox không có pending/dead-letter event;
- Web và API đều ready.

## Preflight trước buổi demo

```bash
./scripts/local-services.sh demo-ready
```

Không chạy `smoke` sau bước reset vì smoke test cố ý tạo Lead và thay đổi trạng thái
Task. Nếu cần kiểm tra smoke, chạy trước rồi reset lại canonical scenario.

Checklist:

- Trình duyệt chỉ mở `http://localhost:3000`.
- Header có badge `LOCAL DEMO` và không có lỗi kết nối màu đỏ.
- Dashboard có đúng KPI từ canonical seed.
- Không dùng public tunnel, screen recording chứa dữ liệu ngoài synthetic hoặc tài
  khoản/provider thật.
- Tắt notification và đóng tab không liên quan trước khi screen-share.

## Rehearsal hai golden paths

Lệnh này chủ động mutate canonical seed để kiểm tra Admission và SOP lifecycle, bao
gồm negative check tác giả không tự approve. Luôn reset lại sau rehearsal:

```bash
pnpm demo:journey:smoke
LOCAL_DEMO_RESET_CONFIRM=RESET_SYNTHETIC_DEMO \
  ./scripts/local-services.sh demo-reset
```

Trên UI, bắt đầu ở `#/leads` với `Admission Officer`; chuyển sang `Admission Manager`
khi duyệt Offer. Từ Application detail, dùng liên kết `Mở SOP ADM-010 liên quan` để
tiếp tục câu chuyện SOP-to-Execution.

## Live mode và static preview

Docker build mặc định dùng live mode:

```dotenv
NEXT_PUBLIC_DEMO_MODE=live
NEXT_PUBLIC_API_ORIGIN=http://localhost:3001
```

Live mode hiển thị lỗi rõ ràng nếu API unavailable; không thay bằng KPI giả. Chỉ dùng
static preview khi cần xem layout mà không chạy API:

```bash
NEXT_PUBLIC_DEMO_MODE=static ./scripts/local-services.sh rebuild
```

Static preview luôn có cảnh báo trên UI và không cho mutation.

## Xử lý nhanh khi có lỗi

```bash
./scripts/local-services.sh status
./scripts/local-services.sh logs api web worker migrate
./scripts/local-services.sh restart
./scripts/local-services.sh demo-ready
```

Nếu dataset không còn clean, reset lại. Không sửa trực tiếp PostgreSQL để làm KPI
trông đúng vì sẽ mất tính lặp lại và audit evidence.
