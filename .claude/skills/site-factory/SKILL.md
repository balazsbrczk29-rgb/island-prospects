---
name: site-factory
description: The production pipeline for building one concept preview website per Bahamian business in this repo. Load at the start of every session, then follow the art-director skill for every design decision.
---

# Site factory pipeline

One business at a time, steps 1-8, published before the next. Design authority is
`.claude/skills/art-director/SKILL.md`; this file is only the order of work and the mechanics.

References (read when the step says so): `references/niche-playbooks.md` (per-niche goals and CTAs),
`references/seo-local.md` (titles, meta, JSON-LD), `references/components.md` (concept label, notes panel,
enquiry wiring, site-data.json), `references/components-catalog.md` (vendored components).
Optional toolboxes, open only when needed: `taste-skill/references/copy-tells.md` (remove AI tells from copy),
`emil-design-eng` / `animate` / `choreograph` (motion craft), `img2threejs` (3D object from a photo, object-study
pages only), `awesome-design-skills/<style>` (component details), `ui-ux-pro-max` (look up UX and accessibility).
Never read whole skill folders, and never open another business's site source.

## 1. Claim
`node factory/tools/batch.mjs claim <slug>` (SKIP means another session has it: move on).

## 2. Audit and research (about 6 calls for a rebuild with a brief, 12 for a new business, plus imagery)
- Your row in `factory/audit/<slug>.json`. If `audit` is null, audit it (`factory/AUDIT.md`) and write it back.
- Rebuilds: reuse the verified facts in `factory/briefs/<slug>.md`; research only photos and gaps.
- New: Track A (they have a site): extract everything with `firecrawl_scrape` (markdown, links, images): offer, prices, contact, hours, history, every photo URL. Track B (no site): name and record, every public trace (Facebook, Instagram, directories), the business model, 2 comparables. Verified facts carry a source URL; category-standard lines are assumptions to confirm.
- Closed or unconfirmable: status `skipped` with the reason, publish, move on.

## 3. Strategy
Buyer portrait and brand truth (art-director section 1). Sitemap from `concept_type` (a shop has catalogue
and product pages; a booking site has its booking flow; others: home plus 1-2 inner pages; Tier C one page).
One primary CTA with a specific label. Primary and 3-5 secondary local search queries.

## 4. Look, choose, source (art-director sections 2-4)
`look.mjs` on their current site and two reference sites; `direction.mjs --options` then `--set`; start the
Lovable asset project; collect own photos and Commons photos.

## 5. Copy
All copy before code, in the voice the direction implies. Their real facts in clearer, warmer, confident
words. Every section answers a buyer question. No "Welcome to", "Nestled", "Paradise", "Elevate", no em dashes.
Unknown prices: "Rates on request". Unknown hours: omit. Run `taste-skill/references/copy-tells.md` over it.

## 6. Build (hero first)
Source in `factory/web/sites/<slug>/`; for a rebuild `rm -rf factory/web/sites/<slug>/src` first and write
everything new. One HTML shell per page (SEO head, JSON-LD, concept label right after `<body>`,
`<div id="root">`, concept-notes JSON, `../assets/concept.js`, module entry), `src/` files named for what
they are, `src/styles.css` with `@import "tailwindcss" source(none);` plus one `@source` per vendored component
used, `site-data.json`, `favicon.svg`.
Build the first screen, pass the hero gate (art-director section 5), then the rest.
`node factory/tools/build-site.mjs <slug>` builds to `/<slug>/` and prerenders every page.
Mandatory: noindex meta, the concept label and notes panel (`components.md`), one `<h1>`, landmarks,
skip link, alt text, labelled fields, focus styles, 44 px tap targets, mobile designed at 390 px.
SEO per `seo-local.md`; never `aggregateRating` or `review`.

## 7. Verify (art-director section 7)
`qa.mjs`, `interact.mjs`, `distinct.mjs`, the critic subagent; every critic score 4+; at most two fix passes.

## 8. Status and publish
`factory/status/<slug>.json`:
```json
{ "slug": "", "id": 0, "name": "", "batch": "", "tier": "", "state": "built", "generation": 2,
  "pages": ["index.html"], "primary_cta": "", "brand_truth": "", "buyer": "",
  "direction": {"archetype": "", "lane": "", "type": "", "why": ""},
  "concept_type": "", "images": [{"src": "", "source": "own | commons | generated", "credit": ""}],
  "critic": {"photography": 0, "typography": 0, "composition": 0, "colour": 0, "fit": 0, "distinct": 0, "references": 0},
  "current_site_findings": [], "pitch_line": "", "assumptions": [], "sources": [], "notes": "", "built_at": "" }
```
Then `bash factory/tools/publish.sh <slug>` and confirm `PUBLISHED`.
