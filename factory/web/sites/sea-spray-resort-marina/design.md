# Sea Spray Resort & Marina: design.md

## 1. The idea in one paragraph
"The dock console." Screen 1 is their own photograph of sportfishers lying still in White Sound, full width, and along its foot a white console like the dash of a sportfisher: the name of the place on the left, a length slider with three small inputs in the middle, and on the right the answer, live: she fits (20 to 130 ft, 7 ft draft), the season from the month, the tier from the nights, and the dock cost in big tabular figures. One button sends it all to the dockmaster on WhatsApp with the country code; Call and VHF 16 sit beside it, and two quiet links book a stay (Guesty) or order food (Revel). Below, the marina in numbers with the full rate table (the column for your season lit), this week at the bar, a day in their photographs, the villas, the residences with every published figure, and the Albury story.

## 2. Inspirations
- **Aman:** the booking bar sits on the photograph's edge, not in a modal. We take the console docked to the bottom of the hero photo.
- **Garmin helm display:** a single large readout per value, units small. We take the slider readout and the cost as the largest numbers.
- **Stripe pricing:** the formula is written under the total ("3 nights x 58 ft x $5.65"). We take the honest formula line.
- Marina playbook (site-playbooks): arrival first, the slip question before anything else.

## 3. Tokens
**Type (kept from our previous version).** Fraunces (display, 400 to 500, soft) + Source Serif 4 (text, optical sizes), self-hosted. Numbers in Source Serif 4 tabular lining.
| step | desktop / phone | leading | tracking | use |
|---|---|---|---|---|
| 14 | 14 / 14 | 1.45 | 0.01em | labels, formula, captions |
| 18 | 18 / 17 | 1.55 | 0 | body |
| 22 | 22 / 20 | 1.35 | 0 | ledes, verdict |
| 32 | 32 / 26 | 1.1 | -0.015em | h3, readouts |
| 56 | 56 / 38 | 1.02 | -0.025em | h2, the cost |
| 72 | 72 / 42 | 0.98 | -0.03em | h1 |

**Colour (OKLCH, shipped as hex).**
- ground white sand `oklch(0.975 0.008 95)` #faf8f2; surface #ffffff
- ink sound navy `oklch(0.27 0.045 220)` #0f2d3a; muted `oklch(0.47 0.03 210)` #4a6168 (6:1); line `oklch(0.89 0.015 95)` #e3ded1
- accent harbour teal `oklch(0.47 0.07 200)` #1e6b72 (kept), hover #155358: Request buttons, slider fill, active season only
- field shallow water `oklch(0.87 0.05 180)` #bfe3dc for the marina numbers and the weekly schedule; ink on it #0f2d3a
- over-limit state: muted brick is avoided; the verdict turns ink with a hairline warning rule, no red/orange.

**Space.** 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128; sections 128 / 72; 12 columns, gutter 24, margin clamp(20px, 4vw, 64px), max 1440; measure 62ch.

**Shape.** Console radius 0 (it is a band); inner fields radius 8; buttons radius 999 (kept pill buttons as their old version); photos radius 6. One shadow: none; the console is separated from the photo by its solid white.

**Motion.** Ease cubic-bezier(.22,1,.36,1). Slider: readout follows the thumb instantly; the cost crossfades on season/tier change (180 ms); photo has a 22 s Ken Burns 1.06 to 1 (kept), off for reduced motion. Day strip: native scroll-snap. Sections reveal with no fades (content is static).

## 4. Screens
### Screen 1: the console (hero)
- Desktop 1440x900: header 64 on ground (Sea Spray Elbow Cay left; links Marina, This week, Stay, Residences, Story; phone and WhatsApp right). Photo `sound` (8029x5355) full width from 64 to 900, cover, focus 50% 60%. Console: solid surface band anchored at the bottom of the hero, height ~300, 12 cols. Cols 1 to 4: h1 "White Sound, Elbow Cay." (72), lede "62 slips for boats from 20 to 130 ft, drafts to 7 ft, at the head of the sound." Cols 5 to 8: length slider with readout (32) and ticks 20 to 130; row of three inputs (Draft ft, Arriving month, Nights). Cols 9 to 12: verdict line (22), cost (56, tabular), formula (14), Request this slip on WhatsApp (accent pill), Call +1 242 577 4696 and VHF 16, then "Book your stay" and "Order food" as quiet text links.
- Phone 390x844: header 56; photo 390x240; h1 42 and lede; slider; inputs in a 3-column row; verdict and cost; Request (full width); Call, VHF 16; stay and food links. Sticky bottom bar (Request a slip) after the console leaves.

### Screen 2: the marina in numbers (field)
- Shallow-water field. Four big figures in a row: 62 slips, 20 to 130 ft, 7 ft draft, gas and diesel. Spec list (power 30/50/100 amp with daily minimums, water $0.40 a gallon, bait, ice, ashore, VHF 16). Rate table: two columns High season (1 March to 31 August) and Low season (1 September to 28 February), rows nightly / 30 days / 90 days / annual per ft per night; the column of the season chosen in the tool carries an accent top rule and "Your season". Boaters' Choice 2025 badge (their own image) small.
- Phone: figures 2x2, table stays two columns.

### Screen 3: this week at Sea Spray
- Photo junkanoo (8021x5350) cols 1 to 6; schedule cols 8 to 12 as a list, each event once: Thursday night entertainment (live music, a DJ or Junkanoo); Happy Hour; Game Night; Karaoke (nights for this week from the bar). Then private events and fishing tournaments ("ask us"). Order food online (Revel) link.

### Screen 4: a day at Sea Spray
- Horizontal scroll-snap strip of their photos at 520 px tall: fleet running out, the docks, lunch by the marina, the bar at golden hour, the beach, dusk underway. Each with one caption line (no invented facts).

### Screen 5: stay
- beach photo cols 1 to 7; text cols 9 to 12: h2 "Stay ashore as well as afloat." "Rooms and villas at Sea Spray are booked online." Book your stay (accent).

### Screen 6: residences
- Three rows (not cards), each: name, beds, baths, sq ft, price from (and oceanfront from). Download the 2026 Sales Package; Ask about the residences on WhatsApp.

### Screen 7: story and contact
- Story paragraph: Monty and Ruth Albury built Sea Spray boats here in the 1980s; Dorian; four Charleston friends and their families rebuilding since February 2022. Contact block: phone (tel with the correct +1 242 number), WhatsApp with country code, VHF 16, White Sound map link, Instagram, Facebook.

## 5. The core tool: interaction spec
- Inputs and defaults: length 58 ft (range 20 to 140, step 1; ticks at 20, 40, 60, 80, 100, 120, 130), draft 5 ft (number, 1 to 15, step 0.5), arriving month = current month (select), nights 3 (number 1 to 365).
- Fit: fits if 20 <= length <= 130 and draft <= 7. Otherwise: "Over our 130 ft limit", "Under 20 ft: ask the dockmaster", "Deeper than the 7 ft we take", each "Call before you plan the run."
- Season: high if month March to August, else low. Tier: nights >= 90: 90-day rate (high $3.75; low has none published, so the 30-day $2.75 with the note "ask about 90+ days"); nights >= 30: 30-day rate (high $4.45, low $2.75); else nightly (high $5.65, low $3.65). Cost = rate x length x nights. Default (Nov, low): 3 x 58 x 3.65 = $635.10, shown rounded to the dollar: $635.
- Extras line: "Power (daily minimums) and water ($0.40 a gallon) extra."
- States: always a result; no loading.
- Animation: cost crossfade 180 ms when season or tier changes; slider fill updates with the thumb.
- Keyboard: native range and number inputs, labelled; arrow keys on the slider.
- Hand-off: wa.me/12425774696?text= "Hello Sea Spray, slip request: {L} ft, {D} ft draft, arriving in {Month}, {N} nights. Website estimate {$} ({rate}/ft, {season} season, {tier}). Boat name:". Secondary: their Book a slip page link; tel:+12425774696; VHF 16. Quiet links: Guesty and Revel.

## 6. Signature details
1. The slider readout rides above the thumb with ticks at the published limits (130 ft tick marked "limit").
2. The formula under the cost, in tabular figures.
3. "Your season" lights the matching column of the rate table.
4. The console band sits on the photograph like a helm dash.
5. Weekly schedule with Thursday given its own line, each event once (fixing their repeated rows).

## 7. Photography plan (their Webflow originals, cdn.prod.website-files.com)
| key | native | where | crop |
|---|---|---|---|
| sound | 8029x5355 | hero, full width 1440 | 50% 60% |
| junkanoo | 8021x5350 | this week, ~660 | center |
| fleet, docks (3447x5171), lunch, bar, beach, dusk (4754x7128) | as data.ts | day strip at 520 tall, beach also on stay | center |
| award | 600x453 | marina numbers, 120 wide | none |
All shown far below native; width/height attributes set to native. Originals are large files: production should swap in Webflow's sized variants.

## 8. Self-review
- Screen 1 sells the product (the sound full of sportfishers) and the whole job without scrolling on desktop; on phone the slider and verdict are on screen 1 and the request bar follows.
- A1 the award badge is a real third-party award shown on their site, kept small. A2 no labels before numbers. A3 italics only for the quiet label voice (kept). A4 no mono. A5 tokens. A6 real marina. A7 the tool is the largest interactive element. A8 grouping by spacing. A9 specific headlines. A10 one accent action per screen. A11 accent on actions, slider fill, active season. A12 no icons. A13 none. A14 radii consistent. A15 no text on the photo; console solid. A16 balance. A17 readout centred on thumb. A18 tabular. A19 image boxes sized with tint. A20 motion only for value changes and the slow photo settle.
- Care: console height on 1280x720 (console grows, photo shrinks; min photo 300); phone input row width.
- Unmistakably Sea Spray: White Sound, their rates, their events, the Albury boats.
