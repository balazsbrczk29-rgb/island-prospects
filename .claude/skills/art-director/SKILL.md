---
name: art-director
description: The design brain of the site factory. Deals each business a unique direction (page archetype, palette lane, type system, navigation, motion, imagery plan), sources photographic imagery (own photos, Wikimedia Commons, Lovable photoreal generation), and gates publishing on distinctness from every other site. Load for EVERY business, at step 4, before designing.
---

# Art director

Generation 1 of this repo produced 55 sites that were one website wearing 55 sets of fonts: the same
header, the same "Key information" band under the hero, the same section order, the same cream
background, the same tracked micro-label above every headline, the same fade-up-blur on every block,
and drawn SVG scenes instead of photographs. This skill exists so that never happens again.

## Why it happened (read once, never repeat)
1. **A prescribed page rhythm.** One fixed section order for every business produces one page. The order is now dealt per site.
2. **A reference site everyone copied.** Workers read one site's `site.tsx` and reproduced its header, footer, action bar and `Reveal`. You may not open another site's source. Ever.
3. **Stacked "premium" advice that all says the same thing.** taste-skill, premium-landing-designer, ui-ux-pro-max and portfolio guides each recommend off-white paper, one accent, generous whitespace, asymmetric split, serif display, tracked labels. Stacking them converges on the average. They are toolboxes, not the design. The design is dealt.
4. **Fonts changed, systems did not.** Swapping Fraunces for Young Serif inside identical sizes, labels and spacing changes nothing a client sees. You now get a whole type *system* (scale, label style, numbering, case, weight behaviour), not a pair.
5. **Imagery was drawn.** With no photo source, every site fell back to SVG and toy 3D. Photographs now come first, from three real sources (section 5).
6. **Self-grading.** The builder scored its own work and always passed. A machine gate and a fresh-eyes critic now judge it against every other site.

## 1. Get your direction (mandatory, before any design)
```
node factory/tools/direction.mjs <slug>          # deals and saves factory/directions/<slug>.json, prints the spec
node factory/tools/direction.mjs --sheet         # every site's dealt direction, to see what is taken
```
The dealer picks, for this business, the least-used option that fits its niche, among:
archetype (references/archetypes.md), palette lane (references/palettes.md), type system
(references/type-systems.md), navigation pattern and motion signature (references/archetypes.md, end).
It never deals the same archetype + lane to two sites and spreads every option across the repo.

You build **exactly that direction**. You may re-deal once (`--redeal`) if the dealt archetype truly
cannot carry this business's content (write why in the brief). You may not drift back to the old look.

## 2. Turn the direction into a design spec (write it in the brief)
- **Archetype**: restate its composition rules in your words, mapped to this business's real content: what is the hero, what replaces each section of its grammar, where the phone number and primary action live (the archetype says how, never as a generic "key information" strip).
- **Palette**: start from the lane, then pull the actual values from the business's real photos, logo or the specific place (the cay, the street, the harbour). 5-7 hex with roles. Contrast 4.5:1 for body text.
- **Type system**: the lane's families or a better fit inside the same system; exact sizes for display, deck, body, label; how labels look (case, tracking, colour); whether numbering exists.
- **Signature moment**: one thing a visitor would remember and describe ("the roof builds itself over the house", "the chart scrolls from Nassau to the cay"). It must use the business's real subject.
- **Imagery plan**: every image slot on the page, its source (own / commons / generated), its crop for desktop and mobile.
- **What I will NOT do on this site**: three things from generation 1 you are deliberately avoiding.

## 3. Composition rules that apply to every archetype
- No section may be a centred heading + paragraph + grid of equal cards. Ever.
- Vary section heights and densities; at least one section is a single image or a single sentence.
- The header, footer and mobile action bar are designed for this archetype (see its nav pattern). The sticky blurred bar with logo-left, links-right, pill-button is retired.
- Banned clones (QA blocks them): a section labelled "Key information", the `Reveal` fade-up-blur wrapper, `max-w-[1440px]` + `md:px-10` containers, `tracking-[0.2em]` uppercase eyebrow above every h2, "01 ·" numbering (unless the type system allows numbering), "<Name>, <place>, since <year>" headlines, a headline whose last line is switched to italic or accent colour as the trick.
- FAQ accordion only if the business has real recurring questions you sourced; never as filler. Enquiry form only where the business takes enquiries, and styled in the archetype (a letter, a ticket, a work order, a chart plot), not the standard Tabs card.
- Interactions must manipulate the business's real subject (choose a roof colour on the photographed house, plot your route on the chart, compare two boats side by side). No generic calculators.

## 4. Taking the best from the vendored skills (use them as toolboxes only)
- `taste-skill`: its copy rules (copy-tells.md, copy-voice.md), photo discipline (photos.md), performance gate, its checker. Ignore its "one system for every page" layout defaults when they conflict with the dealt archetype.
- `emil-design-eng`, `animate`, `choreograph`, `apple-design`: implement the dealt motion signature well (durations, easing, interruption, reduced motion).
- `frontend-design`: commit fully to the dealt direction, no hedging back to safe.
- `ui-ux-pro-max`: query for accessibility and UX guidelines, not for palettes (palettes come from the lane).
- `awesome-design-skills` (`.claude/skills/awesome-design-skills/<style>/`): per-style token sheets. Read the 1-2 styles your archetype lists as "style seeds" for component details (buttons, inputs, borders). Not for layout.
- `img2threejs`: when the archetype is Object study or the signature needs a real object in 3D (a boat, a house, a water machine), rebuild it procedurally from a reference photo with its staged pipeline. Never low-poly toys.
- `playwright-cli`: drive the real browser to screenshot and click through your page during QA.
- Components: shadcn primitives for accessibility (Dialog, Sheet, Tabs, Accordion), restyled completely. Magic UI and React Bits only when the archetype calls for that effect.

## 5. Imagery: photographs first (references/imagery.md has the exact calls)
Priority for every image slot:
1. **The business's own photos** (their site, Facebook, Instagram): art-directed, full-bleed, cropped with intent.
2. **Wikimedia Commons photos of the real place** (the cay, the harbour, the street, the lighthouse, the island's beaches), licensed CC BY / CC BY-SA / CC0, credited in a small caption or the footer credits line. Found through firecrawl_scrape on the Commons API.
3. **Lovable photoreal generation** of the trade and its subject when 1 and 2 cannot show it: a Bahamian concrete house with a white membrane roof for a roofer, hands heat-welding a seam, a glazier fitting a shower screen, an armoured van at a bank door (no logos). Never presented as the client's own project, staff or property: these are "illustrative photography", listed in status `notes` and concept notes as "replace with your own project photos". Never generate a hotel room, a marina, a restaurant interior or a person and present it as theirs.
4. **Procedural 3D (img2threejs) or typography** only for what photography cannot do.
Never: SVG illustrations of scenes, buildings, vehicles or landscapes; cartoon or toy 3D; grey boxes; stock libraries.

## 6. Distinctness gate (mandatory, after QA, before publish)
```
node factory/tools/distinct.mjs <slug>
```
It screenshots your hero and two mid-page views and compares them, plus a style fingerprint (background colour, display font, header structure, section count and order, container width), against every other built site. Any BLOCKER (too similar to a named site) must be fixed. Then run the **fresh-eyes critic**: spawn a subagent (Agent tool, general-purpose) with only this prompt and the paths:
"You are a creative director. Read <your desktop.png>, <your mobile.png> and the contact sheet factory/qa/_contact.png of other sites in this repo. 1) Name the site it most resembles and why. 2) Score 1-5: distinct composition, photographic quality, typographic character, colour character, would an Awwwards juror stop on it. 3) The three changes that would most raise it. Be harsh."
Apply its three changes if any score is below 4 (one fix pass). Record the scores in status `critic`.
