#!/usr/bin/env bash

set -euo pipefail

repository="${GITHUB_REPOSITORY:-residoken-wq/erp-preschool}"
branch="${GITHUB_PROTECTED_BRANCH:-main}"
reviewer="${GITHUB_REVIEWER:-phamhanghula-ui}"
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

require_independent_reviewer() {
  local repository_owner="${repository%%/*}"
  local permission

  if [[ "${reviewer}" == "${repository_owner}" ]]; then
    echo "GITHUB_REVIEWER must differ from repository owner ${repository_owner}." >&2
    exit 1
  fi

  permission="$(gh api "repos/${repository}/collaborators/${reviewer}/permission" --jq '.permission')"
  case "${permission}" in
    admin|maintain|write)
      ;;
    *)
      echo "Reviewer ${reviewer} must have write, maintain, or admin permission." >&2
      exit 1
      ;;
  esac

  if ! gh api \
    --header "Accept: application/vnd.github.raw+json" \
    "repos/${repository}/contents/.github/CODEOWNERS?ref=${branch}" | grep --fixed-strings --quiet "@${reviewer}"; then
    echo "Reviewer @${reviewer} must exist in CODEOWNERS on ${branch} before enabling the gate." >&2
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
    current_review_gate="$(gh api \
      "${protection_endpoint}/required_pull_request_reviews" \
      --jq '.require_code_owner_reviews' 2>/dev/null || printf 'false')"
    if [[ "${current_review_gate}" == "true" ]]; then
      echo "Refusing to downgrade an active review gate with apply-bootstrap." >&2
      echo "Use defer-review-gate with the explicit confirmation variable." >&2
      exit 2
    fi
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
  defer-review-gate)
    require_github_auth
    require_repository_admin
    if [[ "${GITHUB_DEFER_REVIEW_GATE_CONFIRM:-}" != "defer-until-product" ]]; then
      echo "Set GITHUB_DEFER_REVIEW_GATE_CONFIRM=defer-until-product to confirm." >&2
      exit 2
    fi
    cat <<'JSON' | gh api \
      --method PATCH \
      --header "Accept: application/vnd.github+json" \
      --header "X-GitHub-Api-Version: 2022-11-28" \
      "${protection_endpoint}/required_pull_request_reviews" \
      --input - >/dev/null
{
  "dismiss_stale_reviews": true,
  "require_code_owner_reviews": false,
  "required_approving_review_count": 0,
  "require_last_push_approval": false
}
JSON
    echo "Required approval temporarily deferred on ${repository}:${branch}."
    echo "Strict CI and other branch protections remain enabled."
    echo "Run apply-review-gate before product/production release or real HRI use."
    verify_protection
    ;;
  apply-review-gate)
    require_github_auth
    require_repository_admin
    require_independent_reviewer
    cat <<'JSON' | gh api \
      --method PATCH \
      --header "Accept: application/vnd.github+json" \
      --header "X-GitHub-Api-Version: 2022-11-28" \
      "${protection_endpoint}/required_pull_request_reviews" \
      --input - >/dev/null
{
  "dismiss_stale_reviews": true,
  "require_code_owner_reviews": true,
  "required_approving_review_count": 1,
  "require_last_push_approval": true
}
JSON
    echo "Required approval and CODEOWNERS review enabled on ${repository}:${branch}."
    echo "Independent reviewer: @${reviewer}."
    verify_protection
    ;;
  help|-h|--help)
    cat <<'EOF'
Usage: ./scripts/github-protection.sh <command>

Commands:
  verify           Read and print the current branch protection configuration
  apply-bootstrap  Require PR flow and CI without requiring self-approval
  defer-review-gate Temporarily suspend approval with explicit confirmation
  apply-review-gate Require one independent CODEOWNER approval
  help             Show this help

Environment:
  GITHUB_REPOSITORY         owner/repository (default: residoken-wq/erp-preschool)
  GITHUB_PROTECTED_BRANCH   branch name (default: main)
  GITHUB_REVIEWER           independent reviewer (default: phamhanghula-ui)
  GITHUB_DEFER_REVIEW_GATE_CONFIRM=defer-until-product

Run apply-review-gate only after the independent reviewer is present in CODEOWNERS
on the protected branch. A deferred review gate must be restored before any
product/production release or use of real HRI.
EOF
    ;;
  *)
    echo "Unknown command: ${command}" >&2
    echo "Run ./scripts/github-protection.sh help for usage." >&2
    exit 2
    ;;
esac
