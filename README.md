# Island Previews: concept website factory

100 Bahamian businesses → 100 truthful, conversion-focused, SEO-ready concept sites, each live on GitHub Pages at `https://<owner>.github.io/<repo>/<slug>/`. The root page is a sales dashboard (filter, open site, open "what we would change" notes).

## How it runs
- `factory/data/prospects.json`: the 100 businesses, website check results (2026-11-04), tier, niche, batch (19 batches, highest-value first).
- `CLAUDE.md`: standing rules for every session (truth only, concept ribbon, noindex, static, banned anti-patterns).
- `.claude/skills/site-factory/`: the 8-step pipeline + niche playbooks, design system, local SEO, shared components.
- Vendored skills: `frontend-design`, `webapp-testing` (anthropics/skills), `ui-ux-pro-max` (nextlevelbuilder).
- `factory/tools/`: `batch.mjs` (batch list), `used.mjs` (keeps fonts/palettes/heroes distinct), `qa.mjs` (Playwright QA + screenshots), `publish.sh` (safe parallel push), `export_xlsx.py` (spreadsheet with preview links).
- One cloud session per batch, using `factory/PROMPT.md`.

## Before showing a site to an owner
Open it with `?notes=1` to show the audit panel. Every site carries a concept ribbon and is `noindex`; when a client signs, remove the robots meta, point their domain, and confirm every fact with them.

## Morning
`python3 factory/tools/export_xlsx.py` → `factory/out/Bahamas_Website_Prospects_with_previews.xlsx`.
