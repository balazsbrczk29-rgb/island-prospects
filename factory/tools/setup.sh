#!/usr/bin/env bash
# Run once at the start of every session.
cd "$(git rev-parse --show-toplevel)"
node -e "require('playwright')" 2>/dev/null && echo "playwright OK" || echo "WARN: playwright not resolvable. Do NOT run playwright install."
( cd factory/web && npm ci --no-audit --no-fund --loglevel=error ) && echo "web toolchain installed (React, Vite, Tailwind, shadcn deps, Motion, three, R3F, Lenis)"
ls .claude/skills
node factory/tools/used.mjs | head -3
