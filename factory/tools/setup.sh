#!/usr/bin/env bash
# Run once at the start of every session. Skills are vendored in .claude/skills (frontend-design,
# webapp-testing from anthropics/skills; ui-ux-pro-max from nextlevelbuilder; site-factory is ours).
cd "$(git rev-parse --show-toplevel)"
node -e "require('playwright')" 2>/dev/null && echo "playwright OK" || echo "WARN: playwright not resolvable from repo; try: NODE_PATH=\$(npm root -g) node factory/tools/qa.mjs <slug>. Do NOT run playwright install."
ls .claude/skills
node factory/tools/used.mjs | head -3
