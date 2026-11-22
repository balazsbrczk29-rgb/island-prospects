# The Conch Inn & Marina: design.md

## 1. The idea in one paragraph
A boater lands on a page that already knows what their office will ask. Screen 1 is a working slip desk: type her length, beam and draft, pick the dates, and on the right a top-down harbour plan draws YOUR boat to scale, nosing into a Conch Inn slip between two neighbours, with dimension lines that tick as you type. Under the plan the bill appears in large tabular figures from the published rates (the right tier picked by nights), the 30 ft beam check answers itself, and one button sends the dock office the exact email they ask for. Switch to Mooring and the boat swings on a ball; switch to Room and the plan gives way to the six rooms and the RezExpert booking engine. Practical, sunny and calm: chart paper, sea-blue water, navy hairlines, one harbour-teal action colour.

## 2. Inspirations
- **A nautical chart (NOAA / Imray):** pale shoal-blue water, hairline navy lines, small italic serif labels, dimension ticks. The plan is drawn in that language, not as an illustration of a scene (it is a technical plan, like a dock diagram).
- **Teenage Engineering / Porsche configurators:** the object redraws to your input instantly, with dimension lines and the figure in large type beside it. Change one value, see exactly what changed.
- **Aesop / Aman:** one quiet serif with one clean sans, generous margins, a single action colour, prices written plainly.
- Marina playbook references: the "will my boat fit" answer must be on screen 1, rates in plain figures, VHF and phone always one tap away.

## 3. Tokens
**Type.** Display: Newsreader variable (opsz 6-72), kept from our previous version because its sharp, chart-label italic suits a harbour plan and the brand has history with it. Text and UI: Hanken Grotesk variable (wght 100-900), a clean, open grotesk with true tabular figures for the bill. Both self-hosted.
Scale (px, desktop / phone):
- cap 13/13, Hanken 500, tracking 0.02em, leading 1.3 (chart labels, captions)
- s 15/15, Hanken 400, leading 1.5
- m 17/16, Hanken 400, leading 1.55 (body, inputs)
- l 22/20, Newsreader 400 opsz 24, leading 1.3
- xl 40/30, Newsreader 380 opsz 60, tracking -0.02em, leading 1.06 (h2)
- hero 64/38, Newsreader 360 opsz 72, tracking -0.03em, leading 1.0 (h1)
- figure 56/44, Hanken 300, tabular, tracking -0.03em (the bill total)

**Colour (OKLCH).**
- ground (sand paper) oklch(97.2% 0.012 85)
- surface oklch(99.3% 0.005 85)
- ink oklch(25% 0.045 250)
- muted ink oklch(45% 0.03 250) (6.9:1 on ground)
- line oklch(87% 0.015 85)
- accent, primary actions only: harbour teal oklch(46% 0.095 205) (white text 6.4:1)
- field: chart water oklch(91.5% 0.035 220) for the plan; navy field oklch(25% 0.045 250) for the rates screen (one dark section), text oklch(96% 0.012 85), muted oklch(80% 0.02 240)
- warn (beam check only) oklch(50% 0.12 60) deep ochre, text only
**Space.** 4/8 scale: 4 8 12 16 24 32 48 64 96 128. Section padding 128/72. Grid 12 columns, gutter 24, side margin clamp(20px, 4.4vw, 72px), max width 1440. Text measure 62ch.
**Shape.** Radius 10 outer (tool panel, plan frame), 6 inner (inputs, buttons inside a 4 px padded segmented control: 10 - 4 = 6). Hairline 1 px line colour. One soft shadow only on the phone action bar.
**Motion.** Ease cubic-bezier(.22,1,.36,1). Feedback 180 ms, value ticks 240 ms, boat redraw 450 ms spring-like ease, reveals 600 ms, route line 1.4 s. Hero entrance: h1, tool, plan stagger 80 ms. Reduced motion: no translation, instant redraw, static route.

## 4. Screens
**1. The slip desk (hero).** Desktop 1440x900: header row (wordmark left; Rates, Rooms, Snappa's, Town, Office; "Book a room" text link; phone in tabular). Grid: cols 1-5 the desk, cols 6-12 the plan frame (height to the fold).
- Desk: cap line "Marsh Harbour, Abaco · 73 slips and mooring balls"; h1 "Hold a slip on Bay Street." Then a segmented control Slip | Mooring | Room. Inputs in a 2x3 grid: Length overall (ft), Beam (ft), Draft (ft), Boat type (select), Arrive, Leave (dates); boat name single row. Defaults: 42 ft, 24 ft beam, 4 ft draft, catamaran, arrive in 14 days, 3 nights.
- Plan frame (cols 6-12): top 66% the chart (water field, the main dock, three slips, YOUR boat in ink outline with teal fill tint, dimension lines, label "your boat, to scale"); bottom 34% the bill: total in figure size, tier line ("3 nights x 42 ft x $3.25 a foot"), metered line ("Power $0.75 a kWh, 30 and 50 amp. Water $0.10 a gallon."), beam check, and the action row: primary "Email the dock office" (accent), secondary "Call 242-367-4000", "VHF 16".
- Phone 390x844: header (wordmark, Call), h1 38px, the chart at 16:11, total line directly under the chart, then the segmented control and inputs, then the primary button full width. The compact chart sits directly above the inputs, so the first three inputs and the boat are visible together while editing.
**2. What your night includes (navy field).** Left cols 1-5: h2 "Everything at the slip, in plain figures." with the included list (WiFi, showers and restrooms, 24-hour security, dinghy dock, pool; gasoline, diesel and ice on the dock; token washers and dryers). Right cols 7-12: the ledger (dockage tiers, short stop, moorings, power, water) in tabular Hanken. Under it, two columns of the rules a captain asks about. Phone: stacked, ledger full width.
**3. Rooms.** Grid: cols 1-7 room photo (crossfade on select, native 1579 to 8256 wide, shown max 820x547); cols 8-12 h2 "Or sleep ashore, over the marina.", six room rows (name + view), features of the selected one, "Check dates and book" (accent, RezExpert) + "All six rooms" link. Phone: photo 3:2, rows below.
**4. Snappa's and the pool.** Snappa's deck photo (2134 square, shown 640x640) cols 1-6; cols 7-12 h2 "Dinner is on the dock." Body: Snappa's Bar & Grill, live music with a harbour view; heated plunge pool; Renu Day Spa and the gift shop; Navigare and Dream Yacht Charters on site. Phone: photo first, square.
**5. Marsh Harbour around you.** A route line across the page (draws on scroll, horizontal desktop, vertical phone): Union Jack public dock, a third of a mile west · The Conch Inn · restaurants, groceries, liquor and shops, a walk away · Leonard M. Thompson International Airport, 3 miles. h2 "Tie up and walk to town."
**6. Since 1972.** Balcony photo full-bleed 1440x(auto) from 1600x1067 native. Under it, h2 "Here since 1972. Rebuilt after Dorian." and a short paragraph: closed after Hurricane Dorian in 2019, reopened March 2021 with rooms, suites and apartments renovated; family-run.
**7. The dock office.** Two columns: left h2 "The dock office, every day 8:00 to 5:30." with phones (367-4000, 577-7000 if busy), VHF 16, email, address; right a closing card: "Request a slip" (accent, scrolls to the desk), "Book a room online". Footer with photo credit.
**Phone action bar:** after the hero, Call + "Request a slip".

## 5. The core tool: interaction spec
- Inputs: mode (slip default), loa 42, beam 24, draft 4, type catamaran, name empty, arrive today+14, leave arrive+3. Numeric inputs with inputMode decimal, steppers of 1 ft (buttons 44 px).
- States: filled by default (a real figure from first paint). Empty LOA: total shows "Enter her length". Leave before or equal arrive: nights 0 means short stop (up to 3 hours, $1.00 a foot). Error: LOA outside 10 to 200 is clamped in the drawing and noted "the office confirms slips for this size".
- Formulas (published rates): slip nights n: n = 0 short stop L x 1.00; n = 1 L x 3.75; 2 to 29 L x 3.25 x n; 30+ L x 2.25 x n ("monthly rate, the office confirms"). Mooring: n < 30 $30 x n; 30+ $500 a month, 500 x floor(n/30) + min(30 x (n mod 30), 500); always "plus VAT, first come first served". Power and water metered, shown as rates, never added.
- Beam: > 30 ft shows the warn line "Wider than the 30 ft catamaran slips: call the office first." else "Fits: catamarans up to 30 ft wide."
- Animation: boat path animates its d (same command structure per hull type) 450 ms; type change crossfades the hull; dimension numbers tick (key change, 240 ms y 6 px); total ticks; mode change crossfades plan to mooring scene or room photo (origin-aware: slides from the side of the chosen tab).
- Keyboard: segmented control is a radiogroup with arrows; inputs native; Enter in any field submits. Touch: steppers 44 px.
- Hand-off: mailto info@conchinn.com, subject "Slip request: <name>, <loa> ft <type>, <arrive> to <leave>", body lists boat type, boat name, LOA, beam, draft, arrival, departure, slip or mooring, and the estimate. Room mode: RezExpert https://online.rezexpert.com/book?business_code=303844. Call tel:+12423674000.

## 6. Signature details
1. Your boat drawn to scale in a slip, with chart-style dimension ticks whose tabular figures tick as you type.
2. The bill names its tier in words ("3 nights at the two-night-plus rate"), so the price logic is transparent.
3. The neighbours in the plan are ghosted boats at fixed sizes (a 38 ft monohull, a 46 ft cat), so scale reads instantly.
4. Mooring mode: the boat swings slowly on its pennant around the ball (2 deg, 6 s, paused under reduced motion).
5. The route line in town draws as you reach it, with the walk times written as the owners do: "a walk", "3 miles".

## 7. Photography plan (their own, static.wixstatic.com, measured originals)
- docks sunset 21c3e0_89587c3d 1566x1535: screen 2, a 4:5 crop at 560x700 beside the included list (request 1228x1535, the full native height, shown at 560x700). Alt: the docks at sunset, masts against an orange sky.
- balcony over marina 21c3e0_9d42be5d 1600x1067: screen 6 full-bleed, max 1600 wide. Alt: view from a balcony over the marina.
- Snappa's deck 21c3e0_b0563f09 2134x2134: screen 4 at 640x640 (request 1280 for 2x).
- Six room photos (1579 to 8256 wide): screen 3, requested at 1200x800, shown at max 820 wide; rooms page 960x640.
- Grade: none added; Wix serves originals; no overlays.

## 8. Self-review
- Screen 1 sells the product (a slip, your boat in it, the bill) and the job is completed without scrolling on desktop; on phone the button is within the second screen, with the action bar arriving after.
- A1 no badges. A2 inputs labelled by their measure only. A3 italic only for chart labels and the ampersand. A4 no mono. A5 tokens above, components use variables. A6 the product is the slip and the boat. A7 the desk + plan is the largest element. A8 grouped by spacing, one hairline under the header. A9 headlines specific (Bay Street, 1972, Dorian). A10 one accent button per screen. A11 teal only on primary actions and your boat. A12 no icons. A13 no ornaments. A14 radii 10/6 with 4 px padding. A15 muted 6.9:1, white on teal 6.4:1, navy field text 13:1. A16 balance/pretty. A17 figures right-aligned in the ledger. A18 tabular everywhere numbers update. A19 sized images with tinted ground. A20 motion only for redraws and ticks.
- Unmistakably this business: their slips, rates, beam limit, office email format, Bay Street, Snappa's. No other site in the repo opens with a to-scale slip plan.
