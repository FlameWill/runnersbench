#!/usr/bin/env bash
set -euo pipefail

# The hosted agent image doesn't promise Python, unlike GitHub's runner images.
if ! command -v python3 >/dev/null; then
  sudo=$([ "$(id -u)" -eq 0 ] || echo sudo)
  $sudo apt-get update -qq
  $sudo env DEBIAN_FRONTEND=noninteractive apt-get install -y -qq python3
fi

python3 bench/run.py --output result.json --workdir "$PWD/.bench-work"
