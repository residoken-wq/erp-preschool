# Repository Governance

## Source of truth

Repository root là application source canonical. `docs` chứa specification,
evidence và snapshot lịch sử. Generated output, dependency, secret và release ZIP
không được dùng làm source.

## Branch và pull request

- `main` là protected release branch; không push trực tiếp sau khi repository từ xa
  được cấu hình.
- Nhánh làm việc dùng prefix `feat/`, `fix/`, `chore/`, `docs/`, `security/`.
- PR phải nhỏ theo module, liên kết backlog/trace ID, mô tả data class, tenant/campus
  scope, permission/SoD, migration, rollback và bằng chứng test.
- Thay đổi HRI, safeguarding, y tế, tài chính, authorization, audit, retention hoặc
  AI cần reviewer đúng domain và Security/Privacy khi áp dụng.
- Không merge khi quality gate bắt buộc lỗi hoặc còn Sev-1/Sev-2, Critical/High chưa
  được xử lý hay waive đúng thẩm quyền.

## Required checks đề xuất

`install-frozen`, `migrate-empty`, `seed-synthetic`, `lint`, `typecheck`, `unit`,
`integration`, `build`, `compose-config` và security scan khi được tích hợp. Branch
protection và tên GitHub team đang chờ repository owner cấu hình; CODEOWNERS không
tự suy đoán handle.

## Version và release

- Release chỉ được cắt từ `main` sau exit gate; tag theo SemVer khi versioning được
  phê duyệt.
- Migration đã phát hành là immutable; recovery/forward-fix đi bằng migration mới.
- Release note phải liệt kê trace ID, migration, config, security/privacy impact,
  known gap, rollback/recovery và test evidence.
- Artifact phải tái tạo được từ lockfile và CI; secret được inject ngoài artifact.

## Bằng chứng và retention

PR, CI logs đã redaction, test report, migration evidence, approval và release note
là evidence. Thời hạn lưu evidence là policy chưa chốt trong Decision Register;
không dùng giá trị ví dụ làm mặc định production.

