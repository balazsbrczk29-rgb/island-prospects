# Island Previews: website concept factory

This repo produces **concept preview websites** for 100 Bahamian businesses (list in `factory/data/prospects.json`).
Each site is a sales asset: Balazs shows it to the owner to win a $500-$1,000+ rebuild contract.
GitHub Pages serves the repo root, so `/<slug>/index.html` becomes `https://<owner>.github.io/<repo>/<slug>/`.

## Your job in a session
You are given a BATCH number (for example `07`). Build every prospect in `prospects.json` whose `batch` matches, one after another, fully finishing and pushing each before starting the next.
**Always load the `site-factory` skill first** (`.claude/skills/site-factory/SKILL.md`) and follow its pipeline exactly. It tells you when to load `frontend-design` and `ui-ux-pro-max`.

## Priority and saving
Batches are ordered by priority: businesses with no working website first, then outdated sites, then the rest, then large enterprises. Every finished business is pushed immediately, so if credits run out, everything completed so far is already live and saved.

## Hard rules (never break)
1. **Truth only.** Every fact on a site (name, address, phone, email, hours, services, rooms, prices, awards, years, staff names) must come from research done in this session (WebFetch/WebSearch) or from `prospects.json`. Never invent reviews, testimonials, star ratings, awards, prices, statistics, client logos, or staff. If a fact is unknown, design around it or use a clearly marked neutral line such as "Rates on request". For businesses with no website (Track B in the skill), category-standard service lines inferred from a confirmed business category are allowed, phrased as categories only (no numbers, brands, years, certifications, guarantees), and every one is listed as an assumption to confirm with the owner.
2. **Concept label.** Every page carries the shared concept ribbon (see skill). It states the site is an unsolicited concept by the agency, not the business's official website. Never remove it.
3. **No indexing.** Every page has `<meta name="robots" content="noindex, nofollow">`. Root `robots.txt` disallows all. These previews must never compete with the real business in Google. The production-ready SEO (titles, descriptions, JSON-LD, canonical to the real domain) is still written in full, because that is what we are selling.
4. **Static only.** Plain HTML + CSS + vanilla JS. No build step, no npm in site folders, no frameworks. Shared libraries live in `/assets/vendor/` (gsap, ScrollTrigger, lenis) and are referenced relatively (`../assets/vendor/gsap.min.js`). Google Fonts via `<link>` is allowed.
5. **Content must be visible without JS.** Animations are progressive enhancement only. Never ship CSS that hides content (`opacity:0`) unless a JS class added at runtime (`html.js-anim`) scopes it.
6. **The sandbox shell cannot reach the internet** (except GitHub and package registries). Research with the WebFetch / WebSearch tools, not curl. Do not try workarounds (mirrors, caches, proxies) for sites the tools refuse.
7. **Images:** hotlink only image URLs you saw verbatim in the business's own website or official social pages during research. Never hotlink Google Maps, TripAdvisor, Booking or news-site photos. With no usable photos, art-direct with typography, color fields, CSS/SVG illustration, maps and texture. Never generic stock, never placeholder.com, never Unsplash guesses.
8. **Budget discipline.** Per business: at most ~12 research fetches/searches (businesses without a website need the extra analysis), one build, one QA run, at most two fix passes. Tier C businesses get a single-page concept and at most 5 research calls.
9. **Only touch your own folders:** `/<slug>/` for each business in your batch and `factory/status/<slug>.json`. Never edit another business's folder. Never edit `prospects.json`.
10. **Push after every business**, not at the end (`factory/tools/publish.sh <slug>`). If credits run out mid-batch, finished work must already be live.
11. No em dashes (the "—" character) anywhere in site copy. Use commas, colons, or full stops.

## Anti-patterns banned on every site
Dark overlays on hero images. Orange/red as the accent color (unless it is the business's real brand color). Card-grid menus or card-grid "services" that look like a SaaS template. Bold condensed uppercase display fonts. Full-dark backgrounds for the whole site. "Book a Table" CTA copy. Star-rating testimonial sections. Generic placeholder or stock images. Purple/blue AI gradients. Inter/Roboto/Arial/system as the display face. Three-icon "feature" rows with emoji. "Welcome to our website". Lorem ipsum. Fake counters ("500+ happy clients") without a sourced number.
