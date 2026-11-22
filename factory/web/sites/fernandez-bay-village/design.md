# Fernandez Bay Village: design.md

## 1. The idea in one paragraph
"The village answers." Screen 1 is their own photograph of the bay through the sea grape, on the right, and a paper sheet on the left that asks one question: who's coming? Tap "A family" and the cottages that fit (the two adjoining pairs, joined by a small stitched bracket, and the Beach House) slide up onto the sand at the bottom of the photograph, each with its own photo and a "Check dates" link to innRoad. Under the question the sheet has already worked out the rest: breakfast and dinner for your party and nights at their published prices, ticking in tabular numbers, and the one-line route from where you fly. The visitor never has to email to learn which cottages adjoin or what dinner costs. The film of one day in the bay comes after, as the "why".

## 2. Inspirations
- **Aman (Amanyara):** the booking question lives beside the photograph, never in a modal; location block with airport code and transfer time. We take the airport line ("MYCB, five minutes") into the sheet.
- **Airbnb search results:** results change in place when the query changes, cards rise with a short stagger, the count updates. We take the in-place rise and the live count ("5 cottages fit").
- **Apple product pages:** one sentence per film frame, the frame pinned while the sentence changes. We take that for "A day in the bay".
- Playbook resort references (site-playbooks hospitality): editorial rows for rooms rather than card grids, so the stays comparison is a table of rows.

## 3. Tokens
**Type.** Petrona variable (display, 300 to 500, with italic): a warm, slightly bookish serif with soft terminals, like a guest book in a family-run clubhouse. Commissioner variable (text, 400 to 600): a humanist sans, calm and legible at 14 px for prices and tables. Self-hosted woff2 from @fontsource-variable. New pairing in the repo.
| step | size desktop / phone | leading | tracking | use |
|---|---|---|---|---|
| cap | 14 / 14 | 1.45 | 0.01em | meta, card lines, captions |
| body | 17 / 17 | 1.6 | 0 | paragraphs, table cells |
| lead | 20 / 19 | 1.5 | 0 | ledes, tool result lines |
| h3 | 28 / 24 | 1.2 | -0.015em | stay names, route names (Petrona 400) |
| h2 | 44 / 34 | 1.08 | -0.025em | section heads (Petrona 350) |
| hero | 72 / 40 | 1.02 | -0.03em | the h1 only (Petrona 330) |
Numbers: `tabular-nums lining-nums` on every price, total, phone and stepper.

**Colour (OKLCH).**
- ground `oklch(0.962 0.014 118)` pale sea-grape paper
- surface `oklch(0.985 0.008 110)` the sheet and cards
- ink `oklch(0.25 0.03 155)`
- muted `oklch(0.46 0.025 150)` (about 6.5:1 on ground)
- line `oklch(0.87 0.018 118)`
- accent `oklch(0.42 0.075 152)` casuarina pine, primary actions and the active segment only; hover `oklch(0.36 0.07 152)`
- field `oklch(0.28 0.04 158)` deep casuarina, for the film and the close; on it text `oklch(0.95 0.015 110)`, muted `oklch(0.80 0.02 130)`; primary on field is a paper-filled button with pine text.

**Space.** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Section padding 128 desktop, 72 phone. 12 columns, 24 gutter, page margin clamp(20px, 4vw, 56px), content max 1360. Text measure max 62ch.

**Shape.** Card radius 14, card image radius 10 inside 4 px inset (14 - 4). Buttons and segments fully round (999). Hairlines 1 px line. One soft shadow, on the match cards only (they sit on the photograph): `0 10px 30px -12px oklch(0.25 0.03 155 / 0.35)`.

**Motion.** Ease `cubic-bezier(.22,1,.36,1)`. Feedback 180 ms (segments, steppers, hover). Reveals 500 ms. Match cards rise 16 px and fade, stagger 45 ms, exit 160 ms fade only, interruptible (AnimatePresence popLayout). Totals tick over 400 ms. Film: pinned crossfade driven by scroll motion value, 1.04 to 1.0 settle. Reduced motion: no transforms, crossfades become instant swaps, totals jump.

## 4. Screens
### Screen 1: the question (hero)
- Purpose: show the product (the bay, the cottages) and answer "which cottage fits us" at once.
- Desktop 1440x900: top bar 64 (name in Petrona 22 left; links Stays, The day, Getting here, Dining, Weddings; "Check dates" accent button right). Below, a 12-col grid at full height (836). Cols 1 to 5: the sheet (surface, padded 48/56): h1 "A beach view from every room." (hero 72, 2 lines); lede "Fernandez Bay, Cat Island. A family-run village of eight cottages and two villas, five minutes from New Bight airport (MYCB)."; then the tool: "Who's coming?" label (cap, muted), three-segment control (Two of us / A family / Friends together), two steppers in a row (Guests, Nights), then the result lines: Meals (breakfast choice toggle hot / continental / none, dinner on / off, total), Flying from (three small segments Fort Lauderdale / Nassau / Own plane and the one-line route), then actions: "Check dates" accent + "Ask on WhatsApp" text link with prefilled message. Cols 6 to 12 bleeding right: photo 5T1A8323 (2500x1667), cover, focus 50% 55%. On its bottom edge, the match strip: N cards (150 wide, image 3:2 at 142x95 inside 4 px inset, name h3-small 17, meta cap, "Check dates" cap link), stagger rise, a count line above them on a paper chip ("5 cottages fit two of you").
- Primary action: Check dates (innRoad).
- Phone 390x844: bar 56 (name, Check dates small). h1 40 + lede; segments full width; steppers; photo 390x300 crop 50% 60% with the match strip as a horizontal scroll row overlapping its bottom 96 px; then meals and route lines; actions. A sticky bottom dock (Check dates + WhatsApp) appears after the hero.

### Screen 2: the stays compared
- Purpose: compare all ten stays side by side; adjoining pairs visible.
- Desktop: h2 "Eight cottages, two villas, one beach." left (cols 1 to 5) with lede "Every room has a beach view. Rates and live availability are in the booking system." A table across 12 columns: thumbnail 120x80 (3:2, native 2500), Stay (h3 22), Beds, Setting, What's special, Adjoins, Check dates. Rows that match the current party carry a pine 3 px left rule and "Fits your party" in accent cap. Cottages first, then a "Villas" sub-head row.
- Phone: each row becomes a stacked block: thumb 112x75 left, name + beds + adjoins right, special below; matches marked the same way.

### Screen 3: a day in the bay (field)
- Purpose: the "why": what a day is like and what it costs.
- Desktop: field ground, pinned frame 100svh, photo inset by 56 px margins (letterbox look on the deep pine), caption bottom-left in field text: chapter (cap, muted) + one sentence with one real fact (lead 20). Six frames: Breakfast (complete breakfast, "Hot breakfast $20, continental $10, on the patio over the bay."), The water (8209), The island (8430 Hermitage), The Tiki Bar (8406), Dinner (mahi, "$48 a person: appetizers, a meat and a seafood, sides, dessert, coffee."), The bonfire / sunset (7819-2). Chapter ticks on the right as a vertical list (current in field text, others muted). 6 x 65svh scroll.
- Phone: same, frame full width with 16 px margins, caption below the photo inside the pin.

### Screen 4: getting here
- Purpose: remove "is it hard to get to".
- Desktop: h2 "Five minutes from New Bight airport." cols 1 to 5; three route columns across cols 1 to 12 below, each: route name h3, carrier, one line, the discount in accent ink where one exists (Makers Air 10% for guests; PILOT 15%). The route chosen in the tool is marked "Your route". Below: "Customs at New Bight 9:00 am to 5:00 pm. 5,000 ft paved runway, VFR."
- Phone: routes stack.

### Screen 5: the Clubhouse and meals
- Purpose: answer "is dinner handled" and repeat the meal counter.
- Desktop: photo Tiki Bar 8406 cols 1 to 6 (aspect 3:2, 680 wide), right cols 8 to 12: h2 "Dinner is handled.", price list (Breakfast hot $20 / continental $10; Lunch $8 to $18; Dinner $48 with the bonfire), Clubhouse facts line (Tiki Bar brings drinks to the sand, dining room and patio, boutique, free WiFi and coffee), then the same meal counter (shared state) with its total.
- Phone: photo first, then text and counter.

### Screen 6: weddings and groups
- Purpose: villas and groups go to WhatsApp.
- Desktop: two villa photos side by side (Manor House 7736, Beach House 7792, 3:2, 660 wide each) with names and facts; below, h2 "A whole villa, or the whole village." and the enquiry form (dates, guests, interested in, name, message) sending to WhatsApp via enquiry.js, prefilled with the party from the tool.
- Phone: photos stack, then form.

### Screen 7: contact (field)
- Purpose: a strong close.
- Field ground. h2 "Your cottage is waiting on Fernandez Bay." Check dates (paper-filled), WhatsApp 1 (242) 808-5711, front desk +1 (954) 302-7422, reservations@fernandezbayvillage.com, socials; footer line with the concept credit.

### stay.html
All ten stays as editorial rows: photo 3:2 at 720 wide left, name, beds, adjoins, all notes, Check dates. Villas last. Same bar and dock.

## 5. The core tool: interaction spec
- Inputs and defaults: party = "two" (Two of us); guests = 2 (family default 4, friends 6; changing party resets guests to its default, the stepper then free 1 to 12); nights = 5 (1 to 21); breakfast = "hot" (hot / continental / none); dinner = on; from = "fll" (Fort Lauderdale / Nassau / Own plane).
- Matches: two = Shane's Shack, Coconut Palm, Royal Palm, Seabreeze, Traveler's Palm. family = [Coconut Palm + Royal Palm] pair, [Traveler's Palm + Tamarind Suite] pair, The Beach House. friends = The Manor House, The Beach House.
- Formula: meals = guests x nights x (breakfast price + dinner price), breakfast hot 20, continental 10, none 0; dinner 48 or 0. Lunch shown as "$8 to $18 a person when you want it", never totalled. Default: 2 x 5 x 68 = $680.
- Route line: fll "Makers Air from Fort Lauderdale Executive (FXE) to New Bight (MYCB), 10% off for guests." nas "Western Air from Nassau, three times a week, about thirty minutes." own "5,000 ft paved, VFR, customs 9:00 am to 5:00 pm. 15% off with the code PILOT."
- States: there is no empty state (defaults always show a result); result = cards + count; meal total; error not possible (steppers clamp, buttons disable at bounds). Loading: images have tinted sized placeholders.
- Animation: on party change, old cards fade out 160 ms, new cards rise 16 px with 45 ms stagger (popLayout so the strip never jumps); the count text crossfades; the total ticks with a 400 ms count.
- Keyboard: segments are a radiogroup (arrow keys move, Space selects), steppers are buttons with aria-labels and an output with aria-live polite. Touch targets 44 px min.
- Hand-off: Check dates opens https://fernandezbayvillage.client.innroad.com/ (no deep-link parameters known). WhatsApp opens wa.me/12428085711 with text: "Hello Fernandez Bay Village, we are {party} ({guests} guests) looking at {nights} nights, flying {from}. We like {stay names}. Which dates are free?"

## 6. Signature details
1. The stitched bracket: adjoining pairs sit touching, joined by a small pine bracket and the word "adjoining" between them.
2. The meal total ticks in tabular numbers and reads like a clubhouse chit ("2 guests, 5 nights, hot breakfast and dinner: $680").
3. The count chip on the sand ("5 cottages fit two of you") changes its wording with the party.
4. The stays table remembers your party: matching rows carry the pine rule and "Fits your party".
5. The film's chapter list on the field, with the current chapter lit, and the prices in the captions.
6. "Your route" marker on Getting here follows the tool's choice.

## 7. Photography plan (all their own, images.squarespace-cdn.com/content/v1/64f009b8e4a9e046e2b1a2c9/, Squarespace sized variants, never above native)
| image | native | where | crop | alt |
|---|---|---|---|---|
| 4d8b8a60/5T1A8323.jpg | 2500x1667 | hero photo (~880 wide desktop, 390 phone) | 50% 55% | Fernandez Bay seen through sea grape leaves, white sand and calm turquoise water |
| e61c5395/5T1A7817.jpg | 2048x1365 | Shane's Shack card and row | 50% 60% | Adirondack chair on the porch of Shane's Shack facing the bay |
| 5b834ec6/5T1A8392.jpg, 899e33a9/5T1A8089.jpg, d96a708f/5T1A8094.jpg, cecca38d/5T1A8099.jpg, 22bb62bb/5T1A8106.jpg, a2b29524/5T1A8131.jpg, a6a0f15b/5T1A8120.jpg | 2500x1667 | cottage cards, table thumbs, stay rows | center | per cottage (data.ts) |
| ef1997c4/5T1A7736.jpg, 6d49c75d/5T1A7792.jpg | 2500x1667 | villa cards, weddings, rows | center | Manor House sitting room; open-air garden shower |
| 2dfc3374/complete+breakfast.jpg, 018d16b7/mahi.jpg | unknown (dining page, assumed at least 1000) | film frames, requested at 1000w | center | breakfast plate; mahi dinner plate |
| fe6f4fea/5T1A8209.jpg, c20ffc5a/5T1A8430.jpg, dbaf91be/5T1A8406.jpg, 9202e27f/5T1A7819-2.jpg | 2500x1667 | film frames, Tiki Bar photo | per data | per data |
Width/height attributes are set to the native size of the variant requested. One grade: their own shoot, untouched. Credit line: "Photographs: Fernandez Bay Village."

## 8. Self-review
- Screen 1 sells the product: the bay photo, the cottages themselves on the sand, and the booking action; a visitor can choose a party and reach Check dates without scrolling on desktop; on phone the dock makes it one tap.
- A1 no badges (the only marker, "Fits your party", is true state). A2 no "Phone:" labels; contact lines are self-labelling. A3 italic only for the quiet caption voice in the film. A4 no mono. A5 tokens on :root, components use them. A6 real cottages and food shown. A7 the tool is the largest element of screen 1 alongside the photo. A8 spacing groups the tool (16 inside a group, 32 between groups). A9 headlines specific ("Five minutes from New Bight airport.", "Dinner is handled."). A10 one accent button per screen. A11 accent only on actions and active segments. A12 no icons except a small stepper minus/plus drawn as text glyphs. A13 no gradients or blobs. A14 card 14 / image 10 / inset 4. A15 caption text on field, never on photos; count chip is a paper surface. A16 balance/pretty on all text. A17 steppers glyphs optically centred. A18 tabular numbers on all prices and steppers. A19 image boxes have aspect-ratio and tinted ground. A20 motion only for results changing and the film.
- Needs care: the strip of 5 cards must fit the photo width at 1440 and 1280 (cards shrink to 136 at 1280); phone horizontal strip must not cause page overflow; the film must stay smooth on phones (opacity only).
- Unmistakably this business: their own bay photo, their cottage names and adjoining pairs, their meal prices and three air routes. No other site in the repo opens with a party question beside a photograph with cards on the sand.
