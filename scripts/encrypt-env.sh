set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"
ENC_FILE="${ROOT_DIR}/.env.enc"

if [[ -z "${ENV_ENC_KEY:-}" ]]; then
  echo "ENV_ENC_KEY is required" >&2
  exit 1
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  echo ".env not found" >&2
  exit 1
fi

openssl enc -aes-256-cbc -salt -pbkdf2 -in "${ENV_FILE}" -out "${ENC_FILE}" -pass "pass:${ENV_ENC_KEY}"
