# Design system rules

The goal is 100 sites that do not look like siblings. Uniqueness comes from the brand truth and the place, not from random choice.

## 1. Palette derivation (in this order)
1. **Real brand colors** if visible in their logo/site/signage photos. Keep their primary; you may refine its exact value.
2. **Place and material.** Pick 2-3 materials from where the business physically is, and sample colors from them in your head:
   - Out Island beach: bleached driftwood `#d9cdb8`-ish, wet sand, shallow-flat turquoise, casuarina green.
   - Harbour Island: conch-shell pink, white clapboard, gingerbread trim, bougainvillea (use sparingly, not as red accent).
   - Nassau colonial: Bay Street ochre/salmon stucco, louvred shutter green, cut coral stone.
   - Freeport / Lucaya: pine forest, limestone white, canal teal, sun-faded marina paint.
   - Marina / yacht: hull navy, bottom-paint, varnished teak, stainless, chart paper.
   - Industrial: high-visibility single accent on a precise neutral system, blueprint lines.
   - Professional: ink, paper, one deep jewel tone.
3. Build roles: `--paper` (background, almost never pure white), `--ink` (text, almost never pure black), `--accent`, `--accent-2`, `--muted`, `--line`. Accent used on under 10% of the surface.
4. Contrast: body text at least 4.5:1 on its background, large text 3:1. Check with a quick calculation in your head or a tiny node snippet.
5. **Banned:** orange/red accents (unless real brand), purple-blue AI gradients, full-dark sites, neon, rainbow.

## 2. Type pairings (Google Fonts). Choose one, or a better one, guided by the brand feel
Each pairing may appear at most 2 times across the whole repo (`used.mjs`). Display face never repeats within a batch.

| Feel | Display | Body |
|---|---|---|
| Colonial, heritage hotel | Cormorant Garamond 500/600 | Karla 400/500 |
| Barefoot Out Island | Fraunces 400 (soft, optical size) | Work Sans 400 |
| Nautical, chart-like | DM Serif Display 400 | IBM Plex Sans 400/500 |
| Clean marina / technical | Space Grotesk 500 | Inter Tight 400 |
| Editorial luxury | Playfair Display 500 (italics for accents) | Source Sans 3 |
| Warm family business | Recoleta-like: Young Serif 400 | Nunito Sans 400 |
| Professional, legal, trust | Libre Caslon Text 400/700 | Public Sans 400 |
| Insurance / finance modern | Instrument Serif 400 | Instrument Sans 400/500 |
| Industrial capability | Archivo 600 (normal width, not condensed) | Archivo 400 |
| Construction / roofing | Bricolage Grotesque 600 | Figtree 400 |
| Craft food, bakery | Gloock 400 | Mulish 400 |
| Weddings, events | Bodoni Moda 500 | Jost 300/400 |
| Dive / adventure | Unbounded 500 (sparingly) | Manrope 400 |
| Real estate | Gilda Display 400 | Lato 400 |
| Institution / civic | Literata 500 | Atkinson Hyperlegible 400 |
| Retail, hardware | Sora 600 | Rubik 400 |
| Tours, taxis, friendly | Bricolage Grotesque 500 | Outfit 400 |
| Boutique stay | Marcellus 400 | Raleway 400 |

Banned as display: Inter, Roboto, Arial, Helvetica, system-ui, Poppins, Montserrat, Oswald, Bebas Neue, Anton, any condensed uppercase face.
Type scale: use `clamp()` fluid sizes. Hero display 2.6rem → 5.5rem. Body 1rem-1.125rem, line-height 1.6. Measure 60-72ch.

## 3. Hero patterns (vary them; `used.mjs` shows the last ones used)
`split-image-right`, `split-image-left`, `full-bleed-image-text-below` (text on paper below image, never on a dark overlay), `typographic-only` (huge name + place, small image inset), `framed-image` (image inside a passe-partout margin), `map-led` (chart/island illustration as the hero), `stacked-collage` (2-3 real photos overlapping), `spec-led` (for marinas/B2B: name + a crisp specs strip), `video-free-panorama` (wide crop with a caption bar).
Text never sits on a dark overlay. If text overlaps a photo, use a solid paper-colored panel.

## 4. Layout and rhythm
- 8px spacing base, section padding `clamp(4rem, 10vw, 9rem)` vertical.
- 12-column grid desktop, 4 columns mobile. Break the grid deliberately once per page (an image bleeding to the edge, an offset caption).
- Content max-width 1200-1320px; text blocks 640-720px.
- White space is the luxury signal. When in doubt, remove an element.

## 5. Motion (gsap + ScrollTrigger + lenis, vendored)
Allowed named animations (pick 2-4):
- `rise-in`: y 24px → 0, opacity 0 → 1, 0.8s, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 0.08s.
- `mask-reveal`: clip-path inset(0 0 100% 0) → inset(0), 1.1s, `cubic-bezier(0.77, 0, 0.175, 1)` on images.
- `line-draw`: SVG stroke-dashoffset to 0 scrubbed by scroll.
- `parallax-soft`: image yPercent -6 → 6 scrubbed. Never more.
- `counter-real`: only for sourced numbers (years since founding, slips count).
- `marquee-slow`: 40s+ linear, pauses on hover, for a press/awards strip only if real.
Rules: everything visible without JS; `html.js-anim` scopes initial states; `prefers-reduced-motion: reduce` disables all transforms; no scroll-jacking; Lenis duration 1.1, disabled on touch (`syncTouch: false`).

## 6. Components to get right
- **Header:** logo/wordmark left, 4-6 links, primary CTA as a button. Mobile: name + menu + call icon; full-screen menu with large type.
- **Sticky mobile action bar** (<=768px): 2-3 actions (Call, WhatsApp, Enquire), safe-area padding.
- **Lists over cards:** rooms, services, tours as editorial rows with a thin rule, a number, a title and 1-2 lines, optional image on alternate sides.
- **Buttons:** one primary style, one quiet text-link style with an animated underline. Radius consistent with the brand (0-4px for heritage/professional, 999px for friendly tours).
- **Footer:** NAP, hours (if sourced), socials, small map link, concept credit.

## 7. Wordmarks
If no usable logo URL exists, set the business name as a typographic wordmark in the display face with careful letter-spacing. Never draw a fake logo symbol that could be mistaken for their trademark. A monogram in `favicon.svg` is fine.
