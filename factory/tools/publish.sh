#!/usr/bin/env bash
# Usage: bash factory/tools/publish.sh <slug>
# Commits only this business's files and pushes with rebase retries (parallel sessions are safe:
# each session touches different files, and the dashboard is built client-side, so rebases never conflict).
set -u
slug="$1"
cd "$(git rev-parse --show-toplevel)"
git config user.name >/dev/null || git config user.name "Site Factory"
git config user.email >/dev/null || git config user.email "factory@users.noreply.github.com"
[ -f "factory/status/$slug.json" ] || { echo "ERROR: write factory/status/$slug.json first"; exit 1; }
for p in "$slug" "factory/status/$slug.json" "factory/briefs/$slug.md"; do [ -e "$p" ] && git add -- "$p"; done
state=$(node -e "console.log(require('./factory/status/$slug.json').state)")
git commit -q -m "site: $slug ($state)" || echo "nothing new to commit"
branch=$(git rev-parse --abbrev-ref HEAD)
for i in 1 2 3 4 5 6; do
  if git pull -q --rebase --autostash origin "$branch" && git push -q origin "HEAD:$branch"; then
    base=$(node -e "console.log(require('./factory/config.json').pages_base)")
    echo "PUBLISHED $slug -> ${base}${slug}/"
    exit 0
  fi
  echo "push attempt $i failed, retrying in $((i*7))s"; sleep $((i*7))
done
echo "ERROR: could not push $slug after 6 attempts. Work is committed locally; retry publish.sh later."
exit 1
