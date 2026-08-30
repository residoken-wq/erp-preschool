#!/usr/bin/env bash

set -euo pipefail

repository="${GITHUB_REPOSITORY:-residoken-wq/erp-preschool}"
branch="${GITHUB_PROTECTED_BRANCH:-main}"
command="${1:-verify}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command gh

protection_endpoint="repos/${repository}/branches/${branch}/protection"

require_github_auth() {
  if ! gh api user --jq '.login' >/dev/null 2>&1; then
    echo "GitHub CLI authentication is required. Run: gh auth login -h github.com" >&2
    exit 1
  fi
}

require_repository_admin() {
  local is_admin
  is_admin="$(gh api "repos/${repository}" --jq '.permissions.admin')"
  if [[ "${is_admin}" != "true" ]]; then
    echo "The authenticated account must have admin permission on ${repository}." >&2
    exit 1
  fi
}

verify_protection() {
  require_github_auth
  gh api \
    --header "Accept: application/vnd.github+json" \
    --header "X-GitHub-Api-Version: 2022-11-28" \
    "${protection_endpoint}" \
    --jq '{required_status_checks, enforce_admins, required_pull_request_reviews, required_linear_history, allow_force_pushes, allow_deletions, required_conversation_resolution}'
}

case "${command}" in
  verify)
    verify_protection
    ;;
  apply-bootstrap)
    require_github_auth
    require_repository_admin
    cat <<'JSON' | gh api \
      --method PUT \
      --header "Accept: application/vnd.github+json" \
      --header "X-GitHub-Api-Version: 2022-11-28" \
      "${protection_endpoint}" \
      --input - >/dev/null
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["quality", "compose-config"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
JSON
    echo "Bootstrap protection applied to ${repository}:${branch}."
    echo "CODEOWNERS approval remains disabled until a distinct reviewer is assigned."
    verify_protection
    ;;
  help|-h|--help)
    cat <<'EOF'
Usage: ./scripts/github-protection.sh <command>

Commands:
  verify           Read and print the current branch protection configuration
  apply-bootstrap  Require PR flow and CI without requiring self-approval
  help             Show this help

Environment:
  GITHUB_REPOSITORY         owner/repository (default: residoken-wq/erp-preschool)
  GITHUB_PROTECTED_BRANCH   branch name (default: main)

The bootstrap mode deliberately does not enable required CODEOWNERS approval.
Add a distinct, verified reviewer before enabling that G0 requirement.
EOF
    ;;
  *)
    echo "Unknown command: ${command}" >&2
    echo "Run ./scripts/github-protection.sh help for usage." >&2
    exit 2
    ;;
esac
