#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd -- "${script_dir}/.." && pwd)"
cd "${project_root}"

compose=(docker compose)
api_origin="${LOCAL_API_ORIGIN:-http://localhost:3001/api/v1}"
api_origin="${api_origin%/}"
api_health_url="${LOCAL_API_HEALTH_URL:-${api_origin}/health/ready}"
web_url="${LOCAL_WEB_URL:-http://localhost:3000}"
wait_attempts="${LOCAL_START_WAIT_ATTEMPTS:-60}"
wait_interval_seconds="${LOCAL_START_WAIT_INTERVAL_SECONDS:-2}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_positive_integer() {
  local name="$1"
  local value="$2"

  if [[ ! "${value}" =~ ^[1-9][0-9]*$ ]]; then
    echo "${name} must be a positive integer; received: ${value}" >&2
    exit 2
  fi
}

run_pnpm() {
  if command -v pnpm >/dev/null 2>&1; then
    pnpm "$@"
    return
  fi

  if command -v corepack >/dev/null 2>&1; then
    corepack pnpm "$@"
    return
  fi

  echo "Missing required command: pnpm or corepack" >&2
  exit 1
}

wait_for_url() {
  local label="$1"
  local url="$2"
  local attempt

  for ((attempt = 1; attempt <= wait_attempts; attempt += 1)); do
    if curl --fail --silent --connect-timeout 1 --max-time 2 --output /dev/null "${url}"; then
      echo "${label}: ready (${url})"
      return 0
    fi
    sleep "${wait_interval_seconds}"
  done

  echo "${label}: not ready after $((wait_attempts * wait_interval_seconds)) seconds" >&2
  "${compose[@]}" ps --all >&2 || true
  "${compose[@]}" logs --no-color --tail 100 migrate api web >&2 || true
  return 1
}

show_urls() {
  cat <<EOF

Local product URLs:
  Web:           ${web_url}
  API readiness: ${api_health_url}
  MinIO console: http://localhost:9001

Only synthetic/de-identified data is allowed before Gate G1.
EOF
}

start_services() {
  local force_build="${1:-false}"

  require_command docker
  require_command curl
  require_positive_integer "LOCAL_START_WAIT_ATTEMPTS" "${wait_attempts}"
  require_positive_integer "LOCAL_START_WAIT_INTERVAL_SECONDS" "${wait_interval_seconds}"
  "${compose[@]}" version >/dev/null

  if [[ ! -f .env ]]; then
    echo "No .env file found; using the development defaults from docker-compose.yml."
  fi

  if [[ "${force_build}" == "true" ]]; then
    "${compose[@]}" up -d --build
  else
    "${compose[@]}" up -d
  fi
  wait_for_url "API" "${api_health_url}"
  wait_for_url "Web" "${web_url}"
  "${compose[@]}" ps --all
  show_urls
}

run_smoke() {
  require_command curl
  require_positive_integer "LOCAL_START_WAIT_ATTEMPTS" "${wait_attempts}"
  require_positive_integer "LOCAL_START_WAIT_INTERVAL_SECONDS" "${wait_interval_seconds}"
  wait_for_url "API" "${api_health_url}"
  wait_for_url "Web" "${web_url}"

  (
    export API_ORIGIN="${api_origin}"
    run_pnpm smoke
  )
}

command="${1:-start}"
if (($# > 0)); then
  shift
fi

case "${command}" in
  start)
    start_services
    ;;
  rebuild)
    start_services true
    ;;
  restart)
    require_command docker
    "${compose[@]}" stop
    start_services
    ;;
  status)
    require_command docker
    "${compose[@]}" ps --all
    ;;
  logs)
    require_command docker
    if (($# == 0)); then
      set -- api web worker migrate
    fi
    "${compose[@]}" logs --follow --tail "${LOCAL_LOG_TAIL:-200}" "$@"
    ;;
  smoke)
    run_smoke
    ;;
  stop)
    require_command docker
    "${compose[@]}" stop
    echo "Local services stopped. PostgreSQL and MinIO volumes were preserved."
    ;;
  help|-h|--help)
    cat <<'EOF'
Usage: ./scripts/local-services.sh <command>

Commands:
  start              Start existing images (builds only when images are missing)
  rebuild            Force image rebuild, start, and wait for readiness
  restart            Stop and start the local product stack
  status             Show all local service states
  logs [services...] Follow logs (defaults: api web worker migrate)
  smoke              Wait for API/Web and run the synthetic API/security smoke suite
  stop               Stop services without deleting persistent volumes
  help               Show this help

Optional environment variables:
  LOCAL_START_WAIT_ATTEMPTS
  LOCAL_START_WAIT_INTERVAL_SECONDS
  LOCAL_API_HEALTH_URL
  LOCAL_API_ORIGIN
  LOCAL_WEB_URL
  LOCAL_LOG_TAIL
EOF
    ;;
  *)
    echo "Unknown command: ${command}" >&2
    echo "Run ./scripts/local-services.sh help for usage." >&2
    exit 2
    ;;
esac
