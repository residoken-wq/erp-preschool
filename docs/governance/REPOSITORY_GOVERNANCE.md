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

## Branch protection bootstrap

`@residoken-wq` là fallback CODEOWNER đã xác minh từ repository path. Đây không
phải là quyết định gán các vai trò Product/Security/Privacy/Data/Architecture.
Không bật required CODEOWNERS approval khi đây là owner duy nhất, vì tác giả không
thể approve pull request của chính mình.

Sau khi `gh auth login -h github.com` thành công, repository owner có thể chạy:

```bash
./scripts/github-protection.sh apply-bootstrap
./scripts/github-protection.sh verify
```

Bootstrap yêu cầu nhánh cập nhật với hai CI context `quality` và `compose-config`,
PR flow, linear history, conversation resolution; cấm force-push/delete và áp dụng
cho administrator. Approval count/code-owner review chỉ được nâng lên sau khi có
ít nhất một reviewer khác biệt, có handle được xác minh và role được phê duyệt.

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
