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

Also load the vendored skills **once per session** at step 4: `frontend-design` (aesthetic direction) and, when you need a palette or pairing idea, query `ui-ux-pro-max` rather than reading it whole.

---

## Step 1. Research (max ~10 tool calls; Tier C max 5)
Goal: a fact sheet you could defend in front of the owner.

1. If `current_site` exists and `site_check_2026_11_04` says LOADED: WebFetch the homepage with a prompt asking for: business description in their words, every service/room/product with details, address, phone, WhatsApp, email, hours, social links, awards they claim, year founded, the absolute URLs of their main photos and logo (img src), and visible problems (dated copyright, broken links, no mobile layout, no booking path, missing contact). Then fetch at most 2-3 inner pages that carry real content (rooms, services, about, contact).
2. If DOMAIN LOST / NO OWN SITE / FETCH-BLOCKED / AGE GATE: WebSearch `"<name>" Bahamas` and `"<name>" <island> phone`. Use the business's own Facebook/Instagram page, the source link in the record, directory listings (Yabsta, BHA members directory, Bahamas Index, noonsite, chamber) **for facts only**. Note that facts from directories must be double-sourced or written conservatively.
3. Write `factory/briefs/<slug>.md` with these sections:
   - **Facts** (each line ends with its source URL)
   - **Photos** (verbatim URLs from the business's own pages only, with a note on what each shows)
   - **Current site audit**: 3-6 concrete problems, written for the owner in plain words (this becomes the pitch)
   - **Audience**: who buys, from where (US/Canada visitors, Nassau locals, boaters arriving by sea, B2B procurement, members), on which device
   - **Primary conversion** (one): e.g. WhatsApp enquiry for a room, slip reservation request, quote request, call, membership application
   - **Unknowns** you designed around
   If research finds the business has closed or the record is wrong, write that in the brief, set status `"skipped"` with the reason, publish, and move on. Do not build a site for a closed business.

## Step 2. Strategy (read the matching section of `niche-playbooks.md`)
Decide and add to the brief:
- Sitemap. Default: hospitality-stay, marina, tours-experiences → `index.html` + 2 inner pages. Every other niche → `index.html` + 1 inner page. **Tier C → `index.html` only.**
- The one primary CTA (exact label) and the secondary CTA. CTA labels are specific verbs plus object: "Check slip availability", "Ask about the Garden Suite", "Request a roofing quote". Never "Submit", "Learn more", "Book a Table", "Click here".
- The user journey in 3 lines: arrive (from Google / Instagram / a dock-side QR code) → reassure → act.
- Local SEO target: one primary query and 3-5 secondary queries (patterns in `seo-local.md`).

## Step 3. Brand story
Find the one true thing that makes this business itself: the cay it sits on, the founding family, the 1940s mansion, the reef at the doorstep, 40 years of roofing after hurricanes. Write a single-sentence **brand truth** and a 5-word **feel** (e.g. "unhurried, salt-bleached, family, nautical, honest"). Everything visual follows from these.

## Step 4. Design direction (load `frontend-design` once; read `design-system.md`)
Run `node factory/tools/used.mjs` first. Then specify, in the brief, with zero ambiguity:
- Display + body fonts (exact Google Fonts families and weights). **No pairing may already appear 2+ times in used.mjs output. No display face may repeat within your batch.**
- Palette: 5-7 hex values with roles (`--ink`, `--paper`, `--accent`, `--accent-2`, `--muted`, `--line`), derived from the brand's real colors if visible, otherwise from the physical place and materials (limestone, sea-grape leaf, conch pink, mangrove tannin, hull blue, weathered teak, rust-free stainless). Check text contrast is at least 4.5:1.
- Layout system: grid, max widths, the hero composition (must differ from the last 3 entries in used.mjs).
- **One signature moment**: a single memorable interaction tied to the brand truth (a tide-line that draws as you scroll, a room selector that slides like a shutter, a depth gauge for a dive shop, a chart-style map of slips). One is enough; make it excellent.
- Motion: 2-4 named animations with durations and easing (see design-system.md). Respect `prefers-reduced-motion`.

## Step 5. Copy
Write all copy before coding. Rules:
- Repackage the business's real information into clearer, warmer, more confident language. Keep their facts, improve their words.
- Headline under 9 words, specific to them. No "Welcome to", no "Your one-stop shop", no "Paradise awaits", no "Unforgettable experience", no "Nestled", no "Elevate". No em dashes.
- Every section answers a visitor question (Where exactly? What does it cost or how do I find out? Can I trust them? How do I reach them right now?).
- Microcopy near CTAs removes risk: "Replies on WhatsApp, usually same day" only if true or neutral; otherwise "We reply by email".
- Unknown prices: "Rates on request". Unknown hours: omit the hours block, do not guess.

## Step 6. Build
Folder `/<slug>/`:
```
index.html            # required
<inner>.html          # per sitemap
styles.css            # one stylesheet for the site
main.js               # progressive enhancement only
site-data.json        # structured business data (components.md)
favicon.svg           # simple monogram in the site palette
```
Requirements:
- Include every shared snippet from `components.md`: concept ribbon, noindex meta, concept-notes panel, enquiry form wiring, site-data.json.
- Semantic HTML: one `<h1>` per page, logical h2/h3, `<header> <nav> <main> <footer>`, skip link, `alt` on every image, labelled form fields, focus styles.
- Mobile first. Design at 390px, then 768, then 1280+. Sticky mobile action bar with the primary CTA (call / WhatsApp / enquire). Tap targets at least 44px.
- Performance: no image wider than its slot (`width`/`height` attributes, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero image). Total own CSS+JS under 60 KB.
- Animations: `../assets/vendor/gsap.min.js`, `../assets/vendor/ScrollTrigger.min.js`, `../assets/vendor/lenis.min.js` only when used. Add `document.documentElement.classList.add('js-anim')` at the top of main.js; scope every hidden-initial-state style under `.js-anim`.
- Maps: `<iframe loading="lazy" src="https://www.google.com/maps?q=<url-encoded address or name+island>&output=embed">` with a title attribute.
- Full SEO head and JSON-LD per `seo-local.md`.
- Footer: real NAP (name, address, phone), social links found, "Concept by <agency_name>" from `factory/config.json`.

## Step 7. QA (one run, at most two fix passes)
```
node factory/tools/qa.mjs <slug>
```
It serves the repo locally, blocks outside network (outside images show as grey "external image" boxes, Google Fonts fall back; both are expected in the sandbox), screenshots mobile 390 and desktop 1440 into `factory/qa/<slug>/`, and prints blockers and warnings. Then:
1. Fix every **BLOCKER**.
2. Read `factory/qa/<slug>/mobile.png` and `desktop.png` with the Read tool. Judge as a design director: hierarchy, spacing rhythm, alignment, does the hero say who/where/what in 3 seconds, is the CTA obvious on mobile, does anything look templated. Fix the two worst issues.
3. Re-run QA once. Stop after the second fix pass even if warnings remain; list them in status notes.

## Step 8. Status and publish
Write `factory/status/<slug>.json`:
```json
{
  "slug": "...", "id": 0, "name": "...", "batch": "..", "tier": "A",
  "state": "built",                       // or "skipped"
  "pages": ["index.html", "rooms.html"],
  "primary_cta": "Check slip availability",
  "brand_truth": "...",
  "design": {"display_font": "...", "body_font": "...", "palette": ["#..."], "hero_pattern": "split-image-left", "signature": "..."},
  "current_site_findings": ["...", "..."],   // the owner-facing audit, 3-6 items
  "pitch_line": "One sentence Balazs can say at the door.",
  "sources": ["https://..."],
  "qa": {"blockers": 0, "warnings": 2},
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
