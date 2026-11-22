# Slim Upholstery: design.md

## 1. The idea in one paragraph
"The chair rebuilds while you ask." Screen 1 is Slim's bench: on the left, "From worn to wow, one stitch at a time." (their words) and a four-part quote starter (the piece, how many, same look or something new, a note); on the right, one dining chair photographed on the cream workshop wall. Every answer you give rebuilds the chair one layer: worn, bare frame, webbing and springs, foam, new navy cloth. When the quote is ready, the chair is finished, and one navy button sends the written WhatsApp message to 814-5451 with a reminder to attach 2 to 3 photos. Call and "Book an appointment" sit beside it. Below, the specialities say what to photograph, the full layer study explains the craft, four steps explain the process, and Claridge Road closes.

## 2. Inspirations
- Apple product pages: one object in perfect light, explained in steps. Taken: the chair as the hero object that changes state.
- Aesop: warm serif, material restraint, plain text lists. Taken: the speciality list as large serif words, no cards.
- Typeform / Airbnb setup flows: one question at a time with visible progress. Taken: the five-dot rail under the chair that fills as the quote fills.
- `site-playbooks/playbooks/trades.md`: enquiry first, proof by craft, address as a sales point.

## 3. Tokens (CSS keeps the existing hex @theme values; OKLCH here is the authored source)
**Type.** Gloock 400 display (a high-contrast warm serif with the feel of a hand-finished label) + Mulish 400 to 800 text (round, friendly, very legible on phones). Scale: caption 13; small 15; body 17; lead 20 (1.5); h3 clamp(25 to 33); h2 clamp(37 to 66, -0.022em, 1.02); hero clamp(44 to 76, -0.022em, 1.0).
**Colour.**
- ground cream `oklch(0.955 0.025 88)` #F7F0E0; surface cream-2 `oklch(0.925 0.035 85)` #EFE5CF; field straw `oklch(0.85 0.06 85)` #E2CFA3 (How it works only)
- ink `oklch(0.25 0.025 65)` #2B2118; muted `oklch(0.45 0.035 70)` #66553F (about 6.5:1 on cream); line `oklch(0.82 0.06 85)` #D6C39B
- accent navy `oklch(0.32 0.07 258)` #1E3557: the WhatsApp action, the selected state, the rail; field 2 navy for Visit (cream text).
- thread saddle `oklch(0.5 0.09 60)` #8C5A2B: step numbers and the running stitch only.
**Space.** 4/8 scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 144). Sections 144 / 96 desktop and phone. Max 1320, inset 20 / 48. 12 columns, gutter 32.
**Shape.** Radii: chips and buttons pill; panels 26 with inner 18 (26 minus 8 padding); photos 22. One shadow: the bottom dock.
**Motion.** Ease cubic-bezier(.22,1,.36,1). Feedback 180 ms; layer wipe 760 ms (translated mask plus counter-translated photo, a running stitch riding the wipe edge); reveals 900 ms; stagger 120 ms on the H1 lines. Reduced motion: layers swap instantly, no parallax.

## 4. Screens
### Screen 1: the quote starter (hero)
Desktop 1440x900: grid 7/5. Left (cols 1 to 7): wordmark row (Slim Upholstery, phone 814-5451 right on the photo side), H1 two lines, one line "Home, auto, marine, aircraft and church upholstery at #21 Claridge Road, Nassau. Free quotes." Then the starter in a cream-2 panel: 1 The piece (chips: Sofa, Dining chairs, Car seats, Boat cushions, Aircraft seats, Church pews, Something else); 2 How many (stepper); 3 The look (two segmented choices: Same look, Something new); 4 A note (one-line input). Then the message bubble (live), "Attach 2 or 3 photos when WhatsApp opens", navy "Send on WhatsApp", text links "Call 814-5451" and "Book an appointment".
Right (cols 8 to 12): the chair photo, 4:5, full panel height (about 620 tall, 500 wide, from the 900 or 1600 web copy of a 3712x4608 original), radius 22, with a five-dot rail and the current layer name below ("Before", "Frame", "Webbing and springs", "Foam", "Cloth") and "Illustrative photographs".
Phone: wordmark + phone; H1; one line; the chair at 4:5 cropped to 1:1 (object-position 50% 62%) with the rail; the starter; message; Send full width; call and appointment links. The bottom dock carries "Free quote" after the hero.

### Screen 2: What we upholster
h2 "Home, auto, marine, aircraft and church upholstery." The list is the selector (large Gloock words), the photo on the right swaps; under each active name: what it covers and "What to send": the photo checklist (for example "The whole sofa, one close-up of the worn part, the width"). Phone: stacked rows each with its photo and checklist. Link to the inner page "More on each kind of job".

### Screen 3: One stitch at a time (the layer study, kept)
The pinned scroll stage from the previous version, unchanged in mechanics: the chair wipes up layer by layer as you scroll, with the title and one sentence per layer and a numbered rail.

### Screen 4: How it works (straw field)
Photo of hands stapling (left half) and four steps: Send photos; Free quote; Book an appointment; Collect your piece. Step 4 wording is category-standard and listed as an assumption.

### Screen 5: Visit Claridge Road (navy field)
"#21 Claridge Road, Nassau." Directions, both numbers (814-5451 call or WhatsApp, 341-2149 shop line), hours Monday to Friday 9:00am to 5:30pm, Saturday "shorter hours, call to confirm", Sunday closed, socials.

## 5. The core tool: interaction spec
- Inputs/defaults: piece "Dining chairs"; count 4 (1 to 60); look "Same look"; note "".
- Progress (drives the chair): layer = number of inputs the visitor has touched (piece, count, look, note), plus one more when the message is complete (any 3 touched) capped at 4. 0 worn, 1 frame, 2 webbing, 3 foam, 4 cloth. Going back is not needed: progress only moves forward in a session; reduced motion swaps without the wipe.
- Message: `Hi Slim Upholstery, I would like a free quote for {count} {piece lc, singular if 1}. {Same look: "Same look, just new." | Something new: "I would like a new look."}{note ? " " + note : ""} I am attaching photos.` Book an appointment: same text plus " Can I book an appointment to bring it in?"
- States: always valid; the bubble updates live (aria-live polite). Send opens wa.me/12428145451?text=...
- Animation: on layer change the new photo wipes up over the last (760 ms) with a cream running stitch on the edge; the rail dot fills (180 ms). Chips fill 180 ms.
- Keyboard: chips and look are radio groups (arrow keys), stepper buttons labelled, input labelled. Touch targets 44.

## 6. Signature details
1. The chair that rebuilds with each answer (the wow).
2. The running stitch rule (dashed saddle thread) as the only divider.
3. The WhatsApp bubble with its tail corner (18/18/18/6 radii), the visitor's own words.
4. Tabular stepper and phone numbers.
5. "Attach 2 or 3 photos" with a tiny tape-measure hint ("a tape measure in the shot helps").

## 7. Photography plan
No own photos are retrievable (Facebook/Instagram). Illustrative photographs generated in the Lovable asset project ip-assets-slim-s-upholstery, labelled on the page and in the footer:
- chair-{worn,frame,webbing,foam,fabric}-900/-1600 (native originals 3712x4608): hero stage (shown about 500x620, using 900w/1600w srcset) and the layer study.
- sofa-living, marine-cushions, auto-seat, aircraft-seat, church-pew: specialities (shown at most 640 wide, 4:3.4 frame).
- hands-staple: How it works half-screen.
- hero-stitch is retired from screen 1 (the chair replaces it).
Logo from BahamasLocal (their own) in the footer at 88 px.

## 8. Self-review
- Screen 1: the chair (the product: re-covered seating) and the whole quote fit at 1440x900; Send sits above y 840. Phone: H1, chair and the first question in view, dock with Free quote.
- A1 no badges. A2 no labels like "Phone:". A3 no italics. A4 no mono. A5 tokens. A6 the chair shows the craft. A7 starter + chair dominate. A8 grouping by spacing. A9 their tagline as H1, specific. A10 one navy action per screen. A11 navy only for action/selected/rail. A12 lucide only, 1.9 stroke. A13 no ornaments except the stitch rule (meaningful). A14 26/18 radii nested. A15 muted 6.5:1. A16 balance. A17 optical. A18 tabular. A19 cream-2 placeholders, sized boxes. A20 the wipe explains progress.
- Care: illustrative photos must be labelled near the hero; no invented prices or times.
