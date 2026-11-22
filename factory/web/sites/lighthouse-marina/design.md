# Lighthouse Marina: design.md

## 1. The idea in one paragraph
"The harbour office counter." Screen 1 is their own photograph of a boat tied up at the fuel dock under the red and white lighthouse, and beside it a navy instrument panel that a captain can work with a thumb: length, draft, hull, months on the hard. The panel answers twice at once: will she fit a slip (two gauges against the 60 ft and 6 ft limits, a plain verdict), and what will the yard cost (haul, blocking, storage, launch, 10% VAT and a total, straight from the November 2024 rate sheet, ticking in tabular figures). One brass button sends the office an email with the boat and the estimate already written; Call and VHF 16 sit beside it. Below: fuel and the dock, the boatyard with the full rate sheet, the harbour panorama from the lighthouse gallery, the ship's store, and the calling card.

## 2. Inspirations
- **Garmin / Raymarine chartplotter UI:** big tabular readouts over small labels, a limit marker on a bar. We take the gauge with a limit tick and the readout-first hierarchy.
- **Stripe pricing calculator:** inputs left, an itemised receipt right that updates live, total last. We take the itemised receipt with the total as the largest number.
- **Linear / Swiss print (Müller-Brockmann):** one grotesk, strict grid, numbers as the visual. We take the single-family type system with very large display figures.
- Playbook marina references (site-playbooks marina): the arrival is the product, so the place screen (panorama from the gallery) is full width.

## 3. Tokens
**Type.** Schibsted Grotesk variable only (kept from our previous version; Swiss, sturdy, good tabular figures), self-hosted. Weights 400 text, 600 display and figures.
| step | desktop / phone | leading | tracking | use |
|---|---|---|---|---|
| 14 | 14 / 14 | 1.45 | 0 | labels, captions, receipt lines |
| 18 | 18 / 17 | 1.5 | 0 | body |
| 22 | 22 / 20 | 1.3 | -0.01em | ledes, verdict line |
| 32 | 32 / 26 | 1.1 | -0.02em | h3, readouts |
| 56 | 56 / 38 | 1.0 | -0.03em | h2, the total |
| 88 | 88 / 44 | 0.96 | -0.04em | h1 only |
Tabular figures on every rate, readout, total and phone number.

**Colour (OKLCH, shipped as hex for the contrast checker).**
- ground hull paper `oklch(0.94 0.02 85)` #f1eadb; surface `oklch(0.97 0.012 85)` #f8f4ea
- ink navy `oklch(0.27 0.06 255)` #13263f; muted `oklch(0.45 0.03 250)` #4a5869 (5.9:1 on ground); line `oklch(0.83 0.03 85)` #cfc5b0
- accent brass `oklch(0.73 0.1 80)` #c9a15b, primary actions only, with navy text; hover #b88f49
- field navy `oklch(0.27 0.06 255)` #13263f (the instrument panel, the contact card), on it text #f1eadb, muted #b9c2cc, line #2c4262
- warn teak #8a5a3b only for a "too long / too deep" gauge fill (state, not decoration)

**Space.** 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Section padding 128 desktop, 72 phone. 12 columns, gutter 24, margin clamp(20px, 4.4vw, 64px), max 1440. Measure 62ch.

**Shape.** Panel radius 16; inner fields radius 8 (16 - 8 padding); buttons radius 8 (squared, a working harbour, not pills). Hairlines 1 px. One shadow only: none (the navy panel carries itself).

**Motion.** Ease `cubic-bezier(.22,1,.36,1)`. 160 ms feedback (segments, steppers), 300 ms gauge fill (transform scaleX), 400 ms total tick. Receipt lines that appear/disappear: height-free fade (opacity) 200 ms. Reduced motion: values jump, no fills animate.

## 4. Screens
### Screen 1: the counter (hero)
- Desktop 1440x900: header 72 (wordmark "Lighthouse Marina / Hope Town, Elbow Cay"; links Fuel, Slips, Boatyard, Store, Contact; phone 242 366 0154 and VHF 16; no second button). Grid: cols 1 to 7 hold h1 "The only marine fuel on Elbow Cay." (88, two lines), lede (22, muted) "Six slips, a boatyard and a ship's store at the foot of the Hope Town lighthouse, since 1980.", then the instrument panel (navy, radius 16, padding 32): left half inputs, right half the receipt. Cols 8 to 12 bleed right: photo dock (2869x3869 native) cover, full height of the hero below the header, focus 50% 40%.
- Phone 390x844: header 56 (wordmark + Call); h1 44; lede; panel full-bleed with 20 px margins: inputs stacked (steppers instead of sliders for precision with a thumb), verdict, receipt, actions; then the photo at 4:5. A sticky bottom bar with Request and Call appears after the hero.

### Screen 2: fuel and the dock
- Photo wide fuel dock (2048x1533) cols 1 to 7 at 3:2-ish crop (shown ~780 wide), text cols 8 to 12: h2 "Two gas pumps, one diesel." Facts as a spec list with figures large: 3 stations (2 gas, 1 diesel); rebuilt docks and fuel station; bait (ballyhoo, squid, shrimp, minnows), ice, snacks; laundry tokens sold on the fuel dock. Then the slips spec row: 6 slips · 60 ft LOA · 6 ft draft at low water · 30 / 50 amp · 60 kW generator · hot showers and laundry (every day 8 to 6). "Dockage rates on request."
- Phone: photo, then text.

### Screen 3: the boatyard
- h2 "Haul-out and dry storage to 10 tons." with forklift photo (3621x2716, 4:3, cols 7 to 12) and services (factory-trained technicians, engines, bottom paint, fiberglass, brite work, detailing, Mercury Outboard sales and service; yard Mon to Fri 8 to 4). Below, the rate sheet in four columns (Hauling and launching, Dry storage per month, Yard work, Engines and equipment), tabular, with "Rates from November 2024, plus 10% VAT" and a link to boatyard.html.
- Phone: one column, sheet stacked.

### Screen 4: the harbour from the lighthouse
- Full-width band 560 px tall (phone 360) showing the Commons panorama (3840x880 thumb, shown at 560 tall = 2444 wide, under native), horizontally scrollable (native overflow, drag on desktop, momentum on phone), starting at the harbour mouth. Caption below: "Hope Town Harbour from the gallery of the Elbow Reef Lighthouse. The fuel dock is at its foot." and the credit "Roman Tokman, CC BY-SA 4.0, Wikimedia Commons".

### Screen 5: the ship's store
- cols 1 to 5: store building photo (3024x4032, 3:4); cols 6 to 7: crate photo (3024x3024, square, offset down); cols 9 to 12: h2 "The largest selection of rods and tackle on the island." List: tackle and rods, bait, ice, souvenirs and clothing, snacks and soft drinks. Hours Monday to Saturday 8:00 to 4:00. "Lighthouse Marina Liquors: reopening soon."
- Phone: text first, then the two photos side by side.

### Screen 6: the calling card (field)
- Navy. Left: h2 "Call ahead, or call us on 16." Phones large (32), VHF 16, email; hours list (store, boatyard, mechanic, laundry); rental cottages note ("Westview Cottage and Lighthouse Point are on long-term rental"). Right: the enquiry form on paper with a type select (Slip, Fuel and bait on arrival, Haul-out and dry storage, Mechanic or Mercury service, Ship's store), boat length, draft, arriving, stay, name, message; prefilled from the tool.

### boatyard.html
Header, h1 "Boatyard rates.", the same instrument panel (estimate mode default), the full rate sheet, the calling card.

## 5. The core tool: interaction spec
- Inputs and defaults: LOA 28 ft (10 to 80, step 1); draft 3.0 ft (1 to 10, step 0.5); hull single / twin (single); months on the hard 3 (0 to 12); add-ons: haul on, blocking on, launch on, pressure clean off.
- Slip verdict: fits if LOA <= 60 and draft <= 6. States: "She fits a slip." / "Too long for our slips (60 ft max). Call the dockmaster." / "Too deep at low water (6 ft max). Call the dockmaster." Gauges: LOA bar 0 to 80 with tick at 60; draft bar 0 to 10 with tick at 6; fill navy-on-panel (paper) when inside, teak when over.
- Estimate (Nov 2024 sheet, + 10% VAT): single haul 5.50/ft, launch 5.50/ft, blocking 50, pressure 6/ft; twin haul 7/ft, launch 7/ft, blocking 60, pressure 8/ft. Storage per month: twin 9/ft; single <= 25 ft $200 flat; 25 < ft <= 30 8.50/ft; > 30 9/ft. Total = (sum of chosen lines) x 1.10. Default 28 ft single, 3 months: 154 + 50 + 714 + 154 = 1,072.00 + VAT 107.20 = $1,179.20.
- Yard capacity note always visible: "The yard lifts boats to 10 tons."
- States: always a result (no empty state); invalid input impossible (steppers clamp, buttons disable at bounds).
- Animation: gauge fills scaleX 300 ms; total ticks 400 ms; verdict line crossfades 160 ms.
- Keyboard and touch: steppers are buttons (44 px) with aria-labels; readouts are output elements with aria-live polite; hull segment is a radiogroup with arrow keys.
- Hand-off: primary "Request this slip" (if it fits) or "Request a haul-out" (if months > 0 and the boat is too big for a slip): mailto lighthousemarinaht@gmail.com with subject "Slip / haul-out request: 28 ft single hull" and body listing LOA, draft, hull, months and the itemised estimate. Secondary: "Call 242 366 0154" (tel:) and "VHF 16" as a label. A text link "Fill in the full form" scrolls to the contact form and pre-fills it.

## 6. Signature details
1. Gauges with a brass limit tick at 60 ft and 6 ft, the fill turning teak when over.
2. The receipt prints like a yard ticket: dotted leaders between line and amount, tabular figures, VAT on its own line, total in 56 px.
3. The email the button writes already contains the itemised estimate.
4. The panorama band you can drag across, starting at the harbour mouth.
5. "Rates from November 2024" printed under every price block, so trust is explicit.

## 7. Photography plan
| image | native | where | crop | alt |
|---|---|---|---|---|
| own: 4f78a7_7a9d9a27... dock (Wix) | 2869x3869 | hero right (~600x828 desktop, 390x488 phone) | 50% 40% | Centre console at the fuel dock, lighthouse behind |
| own: fb296f_2c714a7d... fuel dock wide | 2048x1533 | screen 2 (~780 wide) | center | Lighthouse Marina from the harbour |
| own: fb296f_93657863... forklift | 3621x2716 | screen 3 (~640 wide) | center | Forklift carrying a boat, lighthouse beyond |
| own: 4f78a7_fae42706... store | 3024x4032 | screen 5 (~460 wide) | center | The ship's store building |
| own: 4f78a7_29dfe727... crate | 3024x3024 | screen 5 (~220 wide) | center | Gifts in a crate |
| Commons Hope_Town_Panorama-Roman_Tokman.jpg (3840 thumb) | 3840x880 | screen 4 band, 560 tall | left start | Panorama from the lighthouse gallery |
Wix served via fit/w_ sizing at or below native; width/height attributes set to native. One grade: saturation 0.92 via a static CSS filter on their photos.

## 8. Self-review
- Screen 1 sells the product (the dock under the lighthouse, fuel claim in the h1) and the whole job (fit, cost, request) is completable without scrolling on desktop; on phone the inputs and verdict are in the first screen and the request bar follows.
- A1 no badges. A2 no "Phone:" labels. A3 no italics. A4 no mono (tabular figures instead). A5 tokens on :root. A6 real dock, yard, store. A7 the panel is the largest element on screen 1 with the photo. A8 inputs grouped, receipt grouped. A9 headlines specific (fuel, 10 tons, rods and tackle). A10 one brass button per screen. A11 brass only on primary actions and limit ticks (state markers). A12 no icons. A13 no gradients. A14 panel 16 / fields 8 / padding 8. A15 panel text on solid navy; no text on photos except the credit below. A16 balance/pretty. A17 stepper glyphs centred. A18 tabular everywhere. A19 sized image boxes with tinted ground. A20 motion only for gauges, totals, verdict.
- Care: phone panel length (stack compactly, receipt collapses add-ons into one row of toggles); panorama scroll must not cause page overflow (contained band).
- Unmistakably this business: the lighthouse, the only-fuel claim, their own rate sheet. No other marina in the repo opens with a fit gauge plus yard receipt.
