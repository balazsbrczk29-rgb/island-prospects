---
name: site-factory
description: The production pipeline for building one concept preview website per Bahamian business in this repo. Load at the start of every batch session, before any research or code.
---

# Site Factory pipeline

You are a senior agency team in one person: researcher, conversion strategist, brand designer, copywriter, front-end engineer and QA. Each site must look like it was designed by hand for that one business. If two sites in this repo could swap logos and still make sense, you failed.

Work through the businesses of your batch **one at a time**, completing steps 1 to 8 and pushing before starting the next one.

```
node factory/tools/batch.mjs <BATCH>      # prints the records for your batch
node factory/tools/used.mjs               # fonts/palettes/hero patterns already used by finished sites
```

Read these references when the step says so (do not preload all of them):
- `references/niche-playbooks.md`  per-niche goals, sitemap, sections, CTA wording, schema
- `references/design-system.md`     design directions, type pairings, palette derivation, motion rules
- `references/seo-local.md`         titles, meta, headings, JSON-LD, Bahamas local keyword patterns
- `references/components.md`        the mandatory shared snippets (concept ribbon, concept notes, enquiry form, site-data.json)

- `references/showcase-art-direction.md` WHAT SHOWCASE LEVEL MEANS: reference sites per niche to study, design vocabulary, hero recipes, motion system, imagery hierarchy, and the scorecard that gates publishing (read for EVERY business)
- `references/portfolio-standard.md` the $1,000+ bar: buyer portrait, context-true visuals, interactivity, uniqueness check (read for EVERY business)
- `references/components-catalog.md` every vendored component (shadcn, Magic UI, React Bits) and which fit each niche

Load these vendored skills **once per session**, at step 4, before your first design:
- `taste-skill` (design-taste-frontend): the quality bar (figma.com / x.ai level), its house rules and `references/layout-v4.md`, `sections.md`, `motion.md`, `backgrounds.md`, `copy.md`. Read SKILL.md plus the references it points to for the page you are building. Its rules win over the generic advice in `design-system.md` where they conflict, except our hard rules in CLAUDE.md (truth, concept ribbon, noindex, banned anti-patterns).
- `emil-design-eng` (UI polish and animation judgement) and `choreograph` (staggered hero entrances, list reveals).
- `web-artifacts-builder`: same stack as ours (React, Tailwind, shadcn); apply its design guidelines and shadcn patterns, but build and publish with `factory/tools/build-site.mjs`, not its bundler.
- `frontend-design` for aesthetic direction; query `ui-ux-pro-max` for palettes/pairings rather than reading it whole.
- **Never open another site's source** in this repo (generation 1 copied one reference site and all 55 pages came out the same).
- `art-director` (load for EVERY business at step 4): the dealt direction, imagery procedures, distinctness gate and critic. It overrides `design-system.md`, `showcase-art-direction.md` sections 3 and 5b, and taste-skill layout defaults.
- `img2threejs` (procedural 3D of a real object from a photo), `playwright-cli` (browser QA), `awesome-design-skills` (component details for your archetype's style seeds).

Design inspiration (secondary to the dealt direction): the Dribbble collection Balazs chose (dribbble.com/search/ai-library) cannot be scraped here (images only). Its direction, which you must hit: editorial large-type heroes, generous whitespace, soft tonal gradients inside the brand palette (never purple/blue AI gradients), glassy panels over live visuals, bento-style feature layouts only when content is genuinely varied, refined micro-interactions on every interactive element, and one immersive visual (3D scene or animated background) per site.

---

## Step 1. Research and analysis (max ~12 tool calls; Tier C max 5)
Goal: understand the company as well as its owner would expect a serious agency to, then write a fact sheet you could defend in front of them. Pick the track that matches `site_check_2026_11_04`.

### Track A: the business HAS a working site (LOADED / REDIRECTS)
Extract and analyze the existing site; it is the raw material we repackage.
1. `firecrawl_scrape` the homepage (formats markdown + links + images) and extract: business description in their own words, every service/room/product/tour with its details, address, phone, WhatsApp, email, hours, social links, awards or press they claim, year founded, owners/history, the absolute URLs of their main photos and logo (img src), and the navigation menu (list every page).
2. Scrape the 2-4 inner pages that carry the most real content (rooms, services, about, rates, contact, FAQ). Capture their facts, wording and photos.
3. Build a **content inventory** in the brief: every page, what it contains, what is worth keeping, what is outdated or missing.
4. **Audit** like a consultant (this becomes the pitch): mobile layout, outdated years/copyright, broken or missing booking/contact path, missing address/island (Google can't place them), weak or duplicate page titles, no clear call to action, slow/heavy signals, dead social links, missing trust signals they actually have but hide.
5. Note their **brand assets**: logo colors, typefaces, photography style, tone of voice. Keep what is genuinely theirs; fix the rest.

### Track B: the business has NO working site (NO OWN SITE / Facebook only / DOMAIN LOST / FETCH-BLOCKED / AGE GATE)
These are the priority prospects. With no site to copy, you must understand the company from its name, record and public footprint, then design what its site *should* be.
1. **Read the record closely**: name, sector, size, location, `sheet_evidence`, `sheet_pitch_angle`, `source_link`. Decode the name (e.g. "Island Marine Covering" = marine canvas, boat covers, upholstery; "Thermoset Roofing" = thermoset/membrane roofing systems; "Hot Mix" = asphalt paving).
2. **Find every public trace** (3-6 searches/fetches): `WebSearch` / `firecrawl_search` `"<name>" Bahamas`, `"<name>" <settlement or island>`, `"<name>" facebook`; fetch their Facebook/Instagram page or directory listing (Yabsta, Bahamas Index, BHA members directory, Chamber directory, noonsite, Google-indexed listings) for phone, address, hours, services, photos, years in business, owner names they publish themselves. For DOMAIN LOST: also search for their old site content in search snippets.
3. **Analyze the business model**: what they most likely sell, to whom (locals, contractors, government, cruise visitors, yacht owners, foreign buyers), how customers find them today (word of mouth, Facebook, drive-by), and what a customer needs to see before calling.
4. **Scan 2 comparable businesses** (one in the Bahamas, one strong example in Florida or the Caribbean) with WebSearch to learn what customers in this category expect: typical services list, quote/booking flow, trust signals. Use this only to shape structure, never copy their text or claims.
5. **Separate verified from assumed** in the brief:
   - *Verified facts* (with source URL): only these may be stated as facts on the site.
   - *Category-standard offer* (inferred from the confirmed category and name): may appear on the site only phrased as the service category (e.g. "Roof repairs and replacement" for a confirmed roofing contractor), never with numbers, brands, certifications, years, prices or guarantees. List every such line under **Assumptions to confirm with the owner** in the brief and in status `notes`.
   - If you cannot confirm even the business category or that it still operates, set status `"skipped"` with the reason.
6. Turn the analysis into a **positioning statement**: "For <audience> in <place> who need <job>, <business> is the <category> that <one true differentiator or, if none is known, the clearest promise we can honestly make>."

### Both tracks: write `factory/briefs/<slug>.md` with these sections:
   - **Facts** (each line ends with its source URL)
   - **Photos** (verbatim URLs from the business's own pages only, with a note on what each shows)
   - **Current site audit**: 3-6 concrete problems, written for the owner in plain words (this becomes the pitch)
   - **Audience**: who buys, from where (US/Canada visitors, Nassau locals, boaters arriving by sea, B2B procurement, members), on which device
   - **Primary conversion** (one): e.g. WhatsApp enquiry for a room, slip reservation request, quote request, call, membership application
   - **Content inventory** (Track A) or **Business analysis + comparables** (Track B)
   - **Positioning statement**
   - **Assumptions to confirm with the owner** (Track B mainly; every inferred line on the site)
   - **Unknowns** you designed around
   If research finds the business has closed or the record is wrong, write that in the brief, set status `"skipped"` with the reason, publish, and move on. Do not build a site for a closed business.

## Step 2. Strategy (read the matching section of `niche-playbooks.md`)
Decide and add to the brief:
- Sitemap. Default: hospitality-stay, marina, tours-experiences → `index.html` + 2 inner pages. Every other niche → `index.html` + 1 inner page. **Tier C → `index.html` only.**
- The one primary CTA (exact label) and the secondary CTA. CTA labels are specific verbs plus object: "Check slip availability", "Ask about the Garden Suite", "Request a roofing quote". Never "Submit", "Learn more", "Book a Table", "Click here".
- The user journey in 3 lines: arrive (from Google / Instagram / a dock-side QR code) → reassure → act.
- Local SEO target: one primary query and 3-5 secondary queries (patterns in `seo-local.md`).

## Step 3. Brand story (read `references/portfolio-standard.md` first, every business)
Find the one true thing that makes this business itself: the cay it sits on, the founding family, the 1940s mansion, the reef at the doorstep, 40 years of roofing after hurricanes. Write the **buyer portrait** (portfolio-standard section 1), then a single-sentence **brand truth** and a 5-word **feel** (e.g. "unhurried, salt-bleached, family, nautical, honest"). Everything visual follows from these.

## Step 4. Design direction (load `art-director`; it replaces the old free choice of fonts, palette and hero)
```
node factory/tools/direction.mjs <slug>     # your archetype, palette lane, type system, navigation, motion
```
1. Read the dealt entries in `art-director/references/archetypes.md`, `palettes.md`, `type-systems.md`. One re-deal is allowed (`--redeal --prefer <A..>`) only if the archetype cannot carry the content; write why in the brief.
2. `firecrawl_scrape` one site (two for a brand-new business) from the archetype's "Study" list (formats markdown + screenshot) and note how they solve the archetype's hero, navigation and section grammar.
3. Write the design spec in the brief exactly as art-director section 2 asks: archetype mapped to this business's real content, palette pulled from real photos within the lane (5-7 hex with roles, body contrast 4.5:1), type system with exact families and sizes, signature moment, imagery plan for every slot, two interactions that manipulate the real subject, three generation-1 habits you will not use.
4. Source the imagery now (art-director `imagery.md`): own photos, Commons photos of the place, a Lovable asset project for the trade (one project, at most two rounds), img2threejs only for an object study.
5. Components: shadcn primitives restyled for the archetype; Magic UI or React Bits only if the archetype calls for that effect. Motion: implement the dealt signature with `animate` / `choreograph` / `emil-design-eng` craft; respect `prefers-reduced-motion`.

## Step 5. Copy
Write all copy before coding. Rules:
- Repackage the business's real information into clearer, warmer, more confident language. Keep their facts, improve their words.
- Headline under 9 words, specific to them. No "Welcome to", no "Your one-stop shop", no "Paradise awaits", no "Unforgettable experience", no "Nestled", no "Elevate". No em dashes.
- Every section answers a visitor question (Where exactly? What does it cost or how do I find out? Can I trust them? How do I reach them right now?).
- Microcopy near CTAs removes risk: "Replies on WhatsApp, usually same day" only if true or neutral; otherwise "We reply by email".
- Unknown prices: "Rates on request". Unknown hours: omit the hours block, do not guess.

## Step 6. Build (React + Tailwind + shadcn + Motion + three.js)
Source folder `factory/web/sites/<slug>/`. For a generation-1 rebuild run `rm -rf factory/web/sites/<slug>/src` first and write everything new:
```
index.html  <inner>.html   # one HTML shell per page: full SEO head + JSON-LD, concept ribbon, <div id="root"></div>, concept-notes JSON, ../assets/concept.js, <script type="module" src="./src/<page>.tsx">
src/layout.tsx             # shared layout implementing YOUR dealt navigation pattern, footer, mount(); no shared Reveal wrapper
src/<page>.tsx             # one entry per page
src/Scene.tsx              # optional R3F scene, always lazy-loaded with React.lazy + Suspense
src/styles.css             # @import "tailwindcss" source(none); @source lines; @theme tokens (palette, fonts)
site-data.json  favicon.svg
```
Build: `node factory/tools/build-site.mjs <slug>`, then `node factory/tools/interact.mjs <slug>` (and for each inner page) to click-test every tab, accordion, button and input (installs deps on first run, builds to `/<slug>/`, prerenders HTML). Fix any build error before QA.
Requirements:
- Include every shared snippet from `components.md`: concept ribbon, noindex meta, concept-notes panel, enquiry form wiring, site-data.json.
- Semantic HTML: one `<h1>` per page, logical h2/h3, `<header> <nav> <main> <footer>`, skip link, `alt` on every image, labelled form fields, focus styles.
- Mobile first. Design at 390px, then 768, then 1280+. The primary action is thumb-reachable on mobile in the form the archetype gives it (tear-off strip, dock, legend sheet, toolbar). Tap targets at least 44px.
- Performance: images with `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero image. three.js scenes lazy-loaded. Initial JS+CSS under 650 KB (QA checks). Tailwind `@source` only the components you import.
- Never use `next/*`, `"use client"` is harmless but unnecessary. No server code. Pages are linked with relative hrefs (`marina.html`, `index.html#contact`).
- Maps: `<iframe loading="lazy" src="https://www.google.com/maps?q=<url-encoded address or name+island>&output=embed">` with a title attribute.
- Full SEO head and JSON-LD per `seo-local.md`.
- Footer: real NAP (name, address, phone), social links found, "Concept by <agency_name>" from `factory/config.json`.
- Quality bar: if your desktop screenshot would not stand next to the two award-level sites you studied, it is not done.

## Step 7. QA (one run, at most two fix passes)
```
node factory/tools/qa.mjs <slug>
```
It serves the repo locally, blocks outside network (outside images show as grey "external image" boxes, Google Fonts fall back; both are expected in the sandbox), screenshots mobile 390 and desktop 1440 into `factory/qa/<slug>/`, and prints blockers and warnings. Then:
1. Fix every **BLOCKER**.
2. Read `factory/qa/<slug>/mobile.png` and `desktop.png` with the Read tool. Judge as a design director: hierarchy, spacing rhythm, alignment, does the hero say who/where/what in 3 seconds, is the CTA obvious on mobile, does anything look templated. Score the showcase scorecard (showcase-art-direction.md section 6); fix every line below 4.
3. `node factory/tools/distinct.mjs <slug>`: fix every blocker (too close to a named site, a generation-1 clone, a ground colour outside your lane).
4. Fresh-eyes critic subagent (art-director section 6) with your screenshots, `factory/qa/_contact.png` and your Lovable gallery screenshot. Apply its three changes if any score is below 4.
5. Re-run QA and distinct once. Stop after the second fix pass even if warnings remain; list them in status notes.

## Step 8. Status and publish
Write `factory/status/<slug>.json`:
```json
{
  "slug": "...", "id": 0, "name": "...", "batch": "..", "tier": "A", "generation": 2,
  "direction": {"archetype": "A06", "lane": "P14", "type": "T07", "nav": "N4", "motion": "M4"},
  "images": [{"src": "https://...", "source": "own | commons | generated", "credit": "Artist, CC BY-SA 4.0"}],
  "critic": {"composition": 4, "photography": 4, "typography": 4, "colour": 4, "awwwards": 4, "closest": "slug"},
  "state": "built",                       // or "skipped"
  "pages": ["index.html", "rooms.html"],
  "primary_cta": "Check slip availability",
  "brand_truth": "...",
  "design": {"display_font": "...", "body_font": "...", "palette": ["#..."], "hero_pattern": "split-image-left", "signature": "..."},
  "current_site_findings": ["...", "..."],   // the owner-facing audit, 3-6 items
  "pitch_line": "One sentence Balazs can say at the door.",
  "sources": ["https://..."],
  "qa": {"blockers": 0, "warnings": 2},
  "track": "A or B",
  "assumptions": ["every inferred line on the site that the owner must confirm"],
  "notes": "anything Balazs must know: unverified facts, missing photos, ask owner for X",
  "built_at": "ISO timestamp"
}
```
Then:
```
bash factory/tools/publish.sh <slug>
```
It commits only your files, rebases and pushes with retries. Confirm it printed `PUBLISHED`. Then start the next business.

## At the end of the batch
Print a short table: slug, state, preview URL (`<pages_base><slug>/`), one-line pitch. Nothing else is needed.
