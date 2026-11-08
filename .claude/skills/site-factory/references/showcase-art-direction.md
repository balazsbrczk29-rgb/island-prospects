# Showcase art direction (Awwwards / FWA / Site of the Day level)

This file defines what "showcase level" means in concrete, buildable terms. The art-director skill (dealt direction, imagery, distinctness) overrides it where they differ. Every site must pass the scorecard at the end before it is published.

## 0. Study the masters first (2 tool calls per business)
Before designing, `firecrawl_scrape` TWO award-level reference sites from the list for your niche (formats: markdown + links + images, plus `screenshot` if available). Write in the brief, for each: hero composition, type system, section rhythm, the one interaction that impressed you. Then design something that would sit comfortably next to them. Never copy their text, images or brand.

| Niche | Reference sites (study 2) |
|---|---|
| Marina / yacht club | feadship.nl, riva-yacht.com, sunseeker.com, wallyyachts.com, yachtclubdemonaco.com, oneandonlyresorts.com |
| Boutique hotel / resort / inn | aman.com, belmond.com, rosewoodhotels.com, sixsenses.com, theislandsofthebahamas (official tourism), lebarthotel / edition-hotels.com |
| Fishing lodge | androsisland (lodges), deneki.com, flyfishingtravel brands, patagonia.com/stories |
| Tours / dive / boats | stuartcove.com (local benchmark), axios-style tourism microsites, bluebottle-style storytelling |
| Real estate | sothebysrealty.com, knightfrank.com, savills.com, theagencyre.com |
| Law / trust / insurance / finance | lombardodier.com, pictet.com, julius baer (juliusbaer.com), slaughterandmay.com |
| Industrial / construction / B2B | arup.com, foster + partners (fosterandpartners.com), maersk.com, bechtel.com |
| Trade / retail | aesop.com, hay.dk, braun-audio, muji.com |
| Food / events / weddings | noma.dk, lepetitchef-style microsites, ottolenghi.co.uk, laduree.com |
| Institution | gov.uk (clarity), visitfinland.com, nycgo.com |

## 1. Vocabulary (use these words in your design spec, then build exactly that)
- **Full-bleed hero**: the hero visual spans the full viewport width and height (100svh), edge to edge. Default for hospitality, marina, tours, real estate, food.
- **Art-directed crop**: the image is cropped with intent (horizon on the lower third, subject off-centre), with separate crops for mobile (portrait) and desktop (landscape).
- **Type scale contrast**: display headline 7 to 12 vw (clamp to about 96-200 px desktop, 48-64 px mobile), letter-spacing -0.02 to -0.04em, line-height 0.9 to 1.0; paired with micro-labels 11-13 px, uppercase, tracking +0.14 to +0.2em. Body 17-19 px, line-height 1.6, measure 60-68ch.
- **Editorial grid**: 12-column grid with deliberate asymmetry (content on columns 2-7, image on 8-12, a caption hanging in column 1). Break the grid once per page (an image bleeding off the edge, an overlapping caption).
- **Section rhythm**: alternate densities: an immersive full-bleed moment, then a quiet text section with lots of negative space, then a dense information section. Never three similar sections in a row. Vary section heights.
- **Tonal shift**: move between light and dark sections on purpose (e.g. sand-white, then deep sea navy, then off-white). Max 1-2 dark sections; never a fully dark site.
- **Negative space**: section padding 120-200 px desktop. Empty space is the luxury signal.
- **Hairline rules and indexing**: 1 px lines, small numbers (01, 02), coordinates, dates, captions: the "editorial detailing" that signals craft.
- **Mask reveal**: images appear through an expanding clip-path (inset or circle), 1.0-1.4 s, ease [0.77,0,0.175,1].
- **Line-split headline reveal**: headlines animate in line by line (or word by word) from y:100% inside an overflow-hidden line wrapper, stagger 0.06-0.1 s.
- **Scroll-linked storytelling / sticky scrollytelling**: a pinned (position: sticky) visual that changes state as text scrolls past (e.g. the 3D camera flies from the beach to the canal as you read about each).
- **Parallax depth**: foreground and background move at different speeds (max 10-15% offset); use Motion `useScroll` + `useTransform`.
- **Horizontal scroll gallery**: a pinned section where vertical scroll moves a row of rooms/boats/projects sideways.
- **Magnetic buttons, custom cursor**: primary CTA gently follows the pointer within 8-12 px; optional custom cursor that grows over images (desktop only, never on touch).
- **Marquee band**: slow (40-60 s) infinite text band of real facts (islands served, services), used once.
- **Grain / film texture**: subtle noise overlay (3-6% opacity) for warmth on flat colour.
- **Glass panel**: frosted surface (backdrop-blur 12-20 px, 70-85% opacity paper) over a live visual, for floating info cards.
- **Cinematic 3D**: when there are no photos, build a realistic scene, not a toy: drei `<Sky>` (procedural sun/sky, golden hour: sun elevation 2-6 degrees), a reflective ocean shader with fresnel and specular highlights, fog matching the sky colour, ACES filmic tone mapping, soft shadows, a slow camera dolly. Silhouettes and scale (a yacht against the sunset) read as luxury; bright low-poly colours read as a game. Low-poly is only acceptable for maps and diagrams.
- **Page loader / intro**: a 0.8-1.5 s branded intro (monogram drawing in, then the hero revealing) only for hospitality and marina sites.

## 2. Imagery
See `.claude/skills/art-director/references/imagery.md`: own photos, Wikimedia Commons photos of the real place, Lovable photoreal generation of the trade, img2threejs objects. 8 to 15 photographs per home page. Never drawn scenes or toy 3D.

## 3. Hero
The hero comes from your dealt archetype (`art-director/references/archetypes.md`). The vocabulary in section 1 is a toolbox for executing it, not a list to apply everywhere.

## 4. Motion system (choreography, not decoration)
- Load sequence: label (0 s) → headline lines (0.15 s, stagger 0.08) → body (0.5 s) → CTA (0.65 s) → visual mask reveal (0.2-1.4 s).
- Scroll: each section has ONE entrance idea (mask reveal, line split, or parallax), not all three.
- Micro-interactions on everything clickable: 150-250 ms, transform/opacity only.
- Durations 0.6-1.4 s, ease [0.16,1,0.3,1] for UI, [0.77,0,0.175,1] for reveals.
- Respect prefers-reduced-motion (disable transforms, keep opacity fades).

## 5. Copy tone for premium
Short, confident, specific, sensory. Headlines of 2-6 words. Sentence case, no exclamation marks. Captions read like a magazine ("Hope Town harbour, late afternoon"). Let one strong line breathe instead of three weak ones.

## 5b. Whole page and conversion
- **The dealt direction holds for the whole page.** Same lane, type system, navigation and motion in every section; no section drops back to a plainer template look.
- **Crucial information is visible from the first screen**, placed the way the archetype says (facts box, legend panel, toolbar, calling card, ticket stub, letterhead). Never a generic "Key information" strip.
- **Enquiry or booking wherever the business takes them**, designed in the archetype's language (a reply card, a work order, a chart plot, a ticket), with labelled fields and a summary that becomes the WhatsApp or email message (sourced number or email only), or a large call action when only a phone is known.
- Numbering and tracked micro-labels only when the type system allows them.
- Test interactions with `node factory/tools/interact.mjs <slug>` and fix any JS error.

## 6. Showcase scorecard (score 1-5 each in the brief; publish only when every line is 4+)
1. First screen stops the scroll: a full-viewport, art-directed visual or typographic moment.
2. Typography has dramatic scale contrast and a refined pairing.
3. Layout is editorial and asymmetric; it does not look like a template.
4. Every visual depicts this business's real context.
5. Motion is choreographed (load sequence + one scroll idea per section + micro-interactions).
6. There is depth: layering, glass, parallax, tonal shifts.
7. The detailing shows craft: hairlines, indexes, captions, coordinates, perfect alignment.
8. Mobile is designed, not squeezed: portrait crops, thumb-reachable CTA, no cramped text.
9. It would not look out of place next to the two reference sites studied.
10. The owner would be proud to show it.
11. The whole page keeps the dealt direction; crucial information is visible from the first screen; booking/enquiry is one tap away everywhere.
12. Distinct: `distinct.mjs` passes and the fresh-eyes critic names no site in this repo as a close match.
13. Photographic: the page is led by photographs of the real place and trade; nothing looks drawn.
If any line scores below 4, fix it before publishing (this replaces the "two worst issues" rule).
