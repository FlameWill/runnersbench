#!/usr/bin/env bash
# Download combined results from past benchmark runs into history/<run id>/
# and print a report across all of them. Set LIMIT to look further back.
set -euo pipefail
cd "$(dirname "$0")/.."

dest=history
mkdir -p "$dest"

gh run list --workflow benchmark.yml --limit "${LIMIT:-50}" --json databaseId,status \
  --jq '.[] | select(.status == "completed") | .databaseId' |
  while read -r id; do
    [ -d "$dest/$id" ] && continue
    if ! gh run download "$id" --name combined-results --dir "$dest/$id" >/dev/null 2>&1; then
      rm -rf "${dest:?}/$id"
      echo "Skipping run $id: no combined-results artifact" >&2
    fi
  done

python analyze/analyze.py "$dest" "$@"
