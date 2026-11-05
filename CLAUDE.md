# Island Previews: website concept factory

This repo produces **concept preview websites** for 100 Bahamian businesses (list in `factory/data/prospects.json`).
Each site is a sales asset: Balazs shows it to the owner to win a $500-$1,000+ rebuild contract.
GitHub Pages serves the repo root, so `/<slug>/index.html` becomes `https://<owner>.github.io/<repo>/<slug>/`.

## Your job in a session
You are given a BATCH number (for example `07`). Build every prospect in `prospects.json` whose `batch` matches, one after another, fully finishing and pushing each before starting the next. **Immediately before starting each business, run `node factory/tools/batch.mjs claim <slug>`. If it prints SKIP, another session has it: move on to the next one.** In resume mode (`batch.mjs pending N`) the same claim rule applies.
**Always load the `site-factory` skill first** (`.claude/skills/site-factory/SKILL.md`) and follow its pipeline exactly. It tells you when to load `frontend-design` and `ui-ux-pro-max`.

## The bar
Every site is portfolio work a client would pay $1,000+ for: built for that business's real buyer (a marina sells to yacht owners, so it must feel quietly luxurious), with visuals that depict the business's actual setting and trade (never random effects), at least two real interactions, and a design unlike any other site in this repo. Read `.claude/skills/site-factory/references/portfolio-standard.md` for every business.

## Priority and saving
Batches are ordered by priority: businesses with no working website first, then outdated sites, then the rest, then large enterprises. Every finished business is pushed immediately, so if credits run out, everything completed so far is already live and saved.

## Hard rules (never break)
1. **Truth only.** Every fact on a site (name, address, phone, email, hours, services, rooms, prices, awards, years, staff names) must come from research done in this session (WebFetch/WebSearch) or from `prospects.json`. Never invent reviews, testimonials, star ratings, awards, prices, statistics, client logos, or staff. If a fact is unknown, design around it or use a clearly marked neutral line such as "Rates on request". For businesses with no website (Track B in the skill), category-standard service lines inferred from a confirmed business category are allowed, phrased as categories only (no numbers, brands, years, certifications, guarantees), and every one is listed as an assumption to confirm with the owner.
2. **Concept label.** Every page carries the shared concept ribbon (see skill). It states the site is an unsolicited concept by the agency, not the business's official website. Never remove it.
3. **No indexing.** Every page has `<meta name="robots" content="noindex, nofollow">`. Root `robots.txt` disallows all. These previews must never compete with the real business in Google. The production-ready SEO (titles, descriptions, JSON-LD, canonical to the real domain) is still written in full, because that is what we are selling.
4. **Stack: React + Vite + Tailwind v4 + shadcn/ui + Motion + three.js (React Three Fiber) + Lenis**, shared toolchain in `factory/web/`. Each site's source lives in `factory/web/sites/<slug>/` and is built to static `/<slug>/` with `node factory/tools/build-site.mjs <slug>` (it also prerenders every page so the shipped HTML contains all text for SEO). Vendored component libraries: `factory/web/src/components/ui` (shadcn), `/magicui` (Magic UI), `/reactbits` (React Bits backgrounds, gradients, text animations). See `.claude/skills/site-factory/references/components-catalog.md`. Never edit files in `factory/web/src/`, only import them. Google Fonts via `<link>` is allowed.
5. **The reference standard is `factory/web/sites/bell-channel-club-marina/`.** Read its `src/` before your first build in a session. Every site must be at least this polished, but must look nothing like it (different layout, type, palette, signature).
6. **The sandbox shell cannot reach the internet** (except GitHub and package registries). Research with the WebFetch / WebSearch tools, not curl. Do not try workarounds (mirrors, caches, proxies) for sites the tools refuse.
7. **Images:** hotlink only image URLs you saw verbatim in the business's own website or official social pages during research. Never hotlink Google Maps, TripAdvisor, Booking or news-site photos. With no usable photos, art-direct with typography, color fields, CSS/SVG illustration, maps and texture. Never generic stock, never placeholder.com, never Unsplash guesses.
8. **Budget discipline.** Per business: at most ~12 research fetches/searches (businesses without a website need the extra analysis), one build, one QA run, at most two fix passes. Tier C businesses get a single-page concept and at most 5 research calls.
9. **Only touch your own folders:** `factory/web/sites/<slug>/`, the built `/<slug>/`, `factory/briefs/<slug>.md` and `factory/status/<slug>.json` for each business in your batch. Never edit another business's folder. Never edit `prospects.json`.
10. **Push after every business**, not at the end (`factory/tools/publish.sh <slug>`). If credits run out mid-batch, finished work must already be live.
11. No em dashes (the "—" character) anywhere in site copy. Use commas, colons, or full stops.

## Anti-patterns banned on every site
Dark overlays on hero images. Orange/red as the accent color (unless it is the business's real brand color). Card-grid menus or card-grid "services" that look like a SaaS template. Bold condensed uppercase display fonts. Full-dark backgrounds for the whole site. "Book a Table" CTA copy. Star-rating testimonial sections. Generic placeholder or stock images. Purple/blue AI gradients. Inter/Roboto/Arial/system as the display face. Three-icon "feature" rows with emoji. "Welcome to our website". Lorem ipsum. Fake counters ("500+ happy clients") without a sourced number.
