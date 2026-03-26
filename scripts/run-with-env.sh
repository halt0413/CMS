#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"
ENC_FILE="${ROOT_DIR}/.env.enc"

if [[ $# -eq 0 ]]; then
  echo "command is required" >&2
  exit 1
fi

set -a

if [[ -f "${ENV_FILE}" ]]; then
  source "${ENV_FILE}"
elif [[ -f "${ENC_FILE}" ]]; then
  if [[ -z "${ENV_ENC_KEY:-}" ]]; then
    echo "ENV_ENC_KEY is required when .env is missing" >&2
    exit 1
  fi

  source /dev/stdin <<<"$(openssl enc -d -aes-256-cbc -salt -pbkdf2 -in "${ENC_FILE}" -pass "pass:${ENV_ENC_KEY}")"
else
  echo ".env or .env.enc not found" >&2
  exit 1
fi

set +a

exec "$@"
