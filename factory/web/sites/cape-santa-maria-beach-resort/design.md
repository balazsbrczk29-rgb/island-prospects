# Cape Santa Maria Beach Resort: design.md
Spec: factory/jobspecs/cape-santa-maria-beach-resort.md (approved 2026-11-22). Kind of site: booking (bookonthenet.net engine).

## 1. The idea in one paragraph
"The route is the first page of the holiday." Screen 1 is a travel-magazine opening laid over a real chart of the Bahamas: on the left a Didone headline and the question "Where do you start?" with five gateways; on the right a sunlit chart (sand land, flats-aqua water, a faint 1-degree graticule like a pilot's chart) where your route draws itself from your gateway, across the islands, to the white sand at the north tip of Long Island. Pinned over the empty Atlantic to the north-east of that tip is their own aerial of the bungalows on the beach, a postcard tied to the destination pin by a hairline. Under the chart one sentence states the trip in plain words (carrier, days, last leg), then three room chips and Check availability. In one glance the guest learns that getting here is easy, sees the beach and the room, and can book. The magazine voice of our previous version (the live "how you arrive" sentence) becomes the caption of a real map.

## 2. Inspirations
- **Monocle travel features:** a Didone headline, a quiet sans standfirst, captions in italic, numbers set in small mono like a data box. I take the standfirst-as-answer and the italic caption voice.
- **Jeppesen / FAA VFR sectional charts:** graticule ticks with degree labels, airport codes in a small mono, a magenta-free but exact line. I take the graticule, the codes and the hairline precision, rendered in the resort's sand and aqua instead of chart colours.
- **Aman (booking bar inside the picture) and Airbnb (results respond the instant the input changes):** the route, the sentence and the CTA respond to one tap, with no "search" button in between.
- Playbook resort.md: one product (the rooms) and one action (availability); the place sold by its own photographs.

## 3. Tokens
**Type.** Bodoni Moda (display, @fontsource variable, optical size axis; italic for captions and the wordmark) with Jost (text, variable 300 to 600). A glossy travel-magazine Didone for a far-away barefoot beach, a geometric sans that recalls aviation lettering. No mono family: numbers use Jost tabular figures, airport codes are Jost 500 caps at +0.08em.
Scale (px, desktop / phone):
- cap 13 / 13, leading 1.4, tracking +0.06em (codes, chart labels);
- small 15 / 15, leading 1.5;
- body 18 / 17, leading 1.6;
- lede 24 / 20, leading 1.35, Jost 300;
- h2 52 / 36, leading 1.02, tracking -0.02em, Bodoni 500;
- h1 84 / 44, leading 0.98, tracking -0.03em, Bodoni 500.
CSS: --t-cap .8125rem; --t-sm .9375rem; --t-body 1.125rem; --t-lede clamp(1.25rem,1rem+.7vw,1.5rem); --t-h2 clamp(2.25rem,1.4rem+2.4vw,3.25rem); --t-h1 clamp(2.75rem,1.2rem+4.2vw,5.25rem).

**Colour (OKLCH).**
- ground (sand) `oklch(0.968 0.014 86)`; surface (paler sand for the table) `oklch(0.985 0.008 86)`;
- ink (deep channel) `oklch(0.26 0.045 225)`; muted ink `oklch(0.45 0.035 225)` (7.4:1 on ground); line `oklch(0.86 0.02 86)`;
- field (flats aqua, the chart's water and the Beach House band) `oklch(0.9 0.045 192)`; field-deep (water at the chart edge) `oklch(0.84 0.06 200)`;
- land on the chart `oklch(0.95 0.03 88)` with coast stroke ink at 35%;
- accent (Long Island deep water) `oklch(0.47 0.1 222)`: Check availability, the drawn route, the active chip. Nothing else.
White on accent 7.0:1.

**Space.** 4/8 scale: 4 8 12 16 24 32 48 64 96 144. Section padding 144/96 desktop, 72/56 phone. 12-column grid, 24 px gutter, page margin clamp(20px, 4.5vw, 72px), max content 1320 px. Text measure 62ch.
**Shape.** Radius 0 on photos (magazine), 2 px on chips and buttons, 999 on nothing. Borders 1 px line. One shadow only: the postcard on the chart `0 18px 40px -18px oklch(0.26 0.045 225 / .35)`.
**Motion.** Ease `cubic-bezier(.22,1,.36,1)`; feedback 180 ms; sentence crossfade 260 ms; route draw 1.1 s (pathLength 0 to 1); pins scale 0.6 to 1 in 300 ms after the line; room photo crossfade 500 ms. Stagger 60 ms on the leg list. Entrance: headline lines rise 12 px and fade in 600 ms, chart land fades in 800 ms, first route draws after 400 ms. Reduced motion: the route appears whole, no rise, crossfades at 120 ms.

## 4. Screens
### Screen 1: the opening and the route finder (home)
Purpose: show the place and the room, answer "how do I get there" from the visitor's own gateway, hand off to the booking engine.
Desktop (1440 x 900):
- Header row (64 px): wordmark "Cape Santa Maria" Bodoni italic 30 px left; nav (Rooms, Beach House, Days here, Getting here, Contact) Jost 15; "Check availability" accent button right. Hairline under it. Not sticky blurred: a plain header that scrolls away; a slim bottom booking strip appears on phone only.
- Left, columns 1 to 5: dateline cap "Seymour's, Long Island, The Bahamas"; H1 "The beach at the end of the&nbsp;line." (3 lines). Then "Where do you start?" (small, muted) and five gateway rows as a radio group: each row = place name (Jost 18) + mode in muted small ("Makers Air, nonstop", "Bahamasair or Stella Maris Air", "Island Wings or the ferry", "Your own plane", "Seaplane Safaris"). Active row: accent rule on the left and accent text.
- Right, columns 6 to 12: the chart, 1000:760 viewBox scaled to ~770 x 585, flush to the right margin. Postcard (aerial, 340 x 191 shown, native 1920 x 1080) pinned top-right over open ocean with a hairline to the Cape pin. Under the chart: the route sentence (lede, 2 lines), then a row: room chips (3) + Check availability (accent) + "Email us this plan" text link.
Phone (390 x 844): header 56 px (wordmark + Book); dateline; H1 44 px (3 lines); gateway chips as a horizontally scrollable row of 5 (44 px tall); chart full bleed (390 x 296) with the postcard at 46% width top-right; the sentence (20 px); room chips wrap; sticky bottom strip with Check availability and Call (lifts the concept tag with --concept-offset 72px).

### Screen 2: the three rooms compared
Purpose: pick a room type with facts side by side.
Desktop: photo 7 columns left (aspect 4:3, crossfades between bungalow bedroom and villa living room as the column is chosen); right 5 columns: H2 "Three ways to sleep on the beach." then a comparison table: rows Size, Bedrooms, Beds, Kitchen, Outside, and one column per room; the chosen column is tinted surface with an accent top rule; each column header is a button; under the table, the shared amenities line and Check availability. The room chosen on screen 1 is the chosen column here (shared state).
Phone: H2, three room tabs (segmented), photo 4:3 full width, a definition list of the chosen room, Check availability.

### Screen 3: the beach and the Beach House
Desktop: the beach photo (native 1413 wide) at 10 columns, aspect 21:9, caption in italic under it: "The beach at Cape Santa Maria, with the bungalows behind the palms." Then a flats-aqua band: left the Beach House bar photo 6 columns (4:5 crop), right H2 "The Beach House." and two short paragraphs (named restaurant and bar on the sand, between the bungalows; menu and dinner times by email when you book), small salad photo 4 columns offset down.
Phone: beach photo full bleed 4:3, caption; band: H2, text, bar photo 4:5, salad photo.

### Screen 4: Days here
H2 "Days here are as busy as you make them." Lede listing the real activities: scuba diving, snorkelling and a nature cruise, fishing, kayaking, paddleboarding, and weddings on the beach. Desktop: an asymmetric three-photo spread (paddle 7 columns 3:2, fishing 5 columns 4:5, scuba 5 columns 4:3 under it, shown at most 560 px wide; native 1062), each with an italic caption. Phone: stacked, full width, captions.

### Screen 5: Getting here, in detail
H2 "Every way to Long Island." A timetable-style table (not cards): columns From, Carrier, Days, Lands at, Then. Rows: Fort Lauderdale Executive (FXE) / Makers Air nonstop / Sun, Tue, Thu / Stella Maris (SML) / taxi arranged by the resort. Nassau (NAS) / Bahamasair, or Stella Maris Air Service (242) 338-2050 / scheduled or charter / SML / taxi. George Town, Exuma (GGT) / Island Wings charter (242) 472-8888 / on request / SML / taxi. George Town / Sheep Runner ferry / Mon, Wed, Fri / Long Island Harbour Club / taxi. Nassau / Seaplane Safaris / on request / the resort's beach / step ashore. Your own plane / SML has fuel and customs / any day / SML / 15% off accommodation for private pilots, by phone, blackouts apply. Each row is clickable and redraws the chart above (reuses the screen-1 chart on getting-here.html). Below: the coast photo (native 1413) 6 columns and the pilots paragraph (fly-ins: South Eastern Bonanza Society, Caribbean Flying Adventures). Phone: each row becomes a stacked block with the From line in Bodoni 24.
On the home page this screen is the table plus a link to getting-here.html; getting-here.html opens with the chart and the same table.

### Screen 6: Contact (the close)
Ground sand, big H2 "Your plan, in one line." followed by the visitor's own plan restated from screen 1 in the lede: "From Fort Lauderdale, Makers Air to Stella Maris, a Beachfront Bungalow." Then Check availability (accent, 56 px), Email this plan (prefilled mailto), toll free +1 800-926-9704, on the island +1 242-338-5273, resort@capesantamaria.com, PO Box address, socials (Facebook, Instagram, YouTube as words). Credit line: photography by the resort; map data Natural Earth.
Phone: stacked; strip stays.

## 5. The core tool: interaction spec
- Inputs: gateway (5 options, default Fort Lauderdale: the only nonstop from the US, the commonest question); room (3 options, default Beachfront Bungalow).
- States: there is no empty state (a default is always chosen, so the chart is never blank); "drawing" (line animating, 1.1 s); result (line drawn, pins in, sentence shown). No loading or error: data is local. Booking hand-off is a plain link; if JS fails the prerendered HTML still shows the Fort Lauderdale route and the link.
- Geometry: points projected from real coordinates (FXE 26.197N 80.171W; NAS 25.039N 77.466W; GGT 23.563N 75.878W; SML 23.582N 75.269W; Cape Santa Maria 23.656N 75.329W) into the 1000 x 760 chart. Each flight leg is a quadratic curve whose control point is offset perpendicular to the chord by 12% of its length (a gentle great-circle feel). Taxi leg SML to Cape is a short dotted line. Ferry leg is dashed (sea). Own plane starts from the chart's north-west edge with an arrow-free open end labelled "from your field".
- Animation: on change, the old route fades out in 180 ms while the new one draws with `pathLength` 0 to 1 over 1.1 s (motion, interruptible: changing again mid-draw restarts from the current choice); origin pin and code label pop at 0 s, destination pin at 1.0 s; the sentence crossfades (AnimatePresence mode wait). Room chip change: chip fill slides (layoutId) 180 ms; the photo on screen 2 crossfades.
- Keyboard/touch: gateways are a radiogroup (arrow keys move, Enter not needed); chips are buttons with aria-pressed; all targets 44 px. Phone gateway row scrolls horizontally with scroll-snap; the active chip scrolls into view.
- Hand-off: Check availability opens the bookonthenet URL (the engine exposes no documented room or date parameters, so none are invented). "Email us this plan" = mailto:resort@capesantamaria.com?subject=Planning a stay&body="I would travel from <gateway> (<carrier>) and would like a <room>. My dates are: ".
- Numbers: none invented; days and phone numbers from the brief.

## 6. Signature details
1. The graticule: 1-degree lines at 6% ink with tiny degree labels on the chart edge (27N, 26N, 25N, 24N, 23N; 80W to 75W), like a pilot's chart.
2. Airport codes in tracked caps next to each pin (FXE, NAS, GGT, SML), so a pilot reads the map as a chart.
3. The postcard of the bungalows tied to the Cape pin by a hairline: the destination is a photograph, not a dot.
4. The close restates the visitor's own plan in words, so the last screen is personal.
5. Italic captions in the magazine voice under every photo, written from what the photo shows (fixing their machine-written descriptions).
6. The route line's end flares into a small sand-coloured ring at the beach, the only place the accent and the sand meet.

## 7. Photography plan (all from the resort's own site, symphony.cdn.tambourine.com/_fusion/cape-santa-maria-resort/media/)
Native widths from the asset viewer notes in the brief; heights where unknown are taken as 3:2 of the width and every image sits in an aspect-ratio box with object-fit cover, so nothing shifts.
- aerial `capesantamariaresort-homepage-gallery-4-6682c3d969dbe.jpg` 1920 x 1080: postcard on the chart (340 px), focus centre.
- beach `...whatguestslovemost-awardwinningbeach-6675955b77bd6.jpg` 1413 x 942: screen 3, max 1413 px wide, focus 50% 60%.
- bar `...homepage-gallery-1-6675a03c664d7.jpg` 1920 x 1280: Beach House, 4:5 crop.
- salad `...homepage-gallery-2-6675a03e155ad.jpg` 1920 x 1280: Beach House small.
- paddle `...homepage-gallery-3-6675a03f6b304.jpg` 1920 x 1280: Days, 3:2.
- fishing `capesantamariabeachresortbahamas-homepage-gallery-02-669182d99e69c.jpg` 1920 x 1280: Days, 4:5.
- villa `...-gallery-03-669182dac3ca5.jpg` 1920 x 1280: rooms (villa).
- bungalow `...-gallery-04-669182dc0bc3b.jpg` 1920 x 1280: rooms (both bungalows, captioned as a Beachfront Bungalow bedroom).
- scuba `capesantamariaresort-activities-scubadiving-05-66e896659e06e.jpg` 1062 x 708: Days, at most 560 px.
- coast `...nonstopflightsfromfortlauderdale-667595ee6a6b3.jpg` 1413 x 942: getting here.
One grade: none applied (their own warm daylight photos are consistent); placeholders tinted field colour.

## 8. Self-review
- Screen 1 sells the place (aerial postcard, the chart to the beach) and the job can be done without scrolling: pick a gateway, read the route, pick a room, Check availability. Yes on desktop; on phone the CTA lives in the sticky strip from the first frame.
- A1 no badges. A2 no "Phone:" labels (the table headers are real column heads). A3 italic only for captions and the wordmark. A4 caps codes only for airport codes and days. A5 tokens above, used only. A6 the real rooms and beach. A7 the chart is the largest element on screen 1. A8 grouping by space; lines only in the tables. A9 headlines specific to the place and the route. A10 one accent button per screen. A11 accent on CTA, route, active state only. A12 no icons. A13 no embellishment beyond the graticule (functional). A14 radii 2 px only, no nesting. A15 muted 7.4:1, text never on photos. A16 balance/pretty, check H1 at 390. A17 pins optically centred on coordinates. A18 tabular numbers for phones and days. A19 tinted aspect boxes for every photo; chart is inline SVG in the HTML. A20 motion only explains the route change and the room change.
- Unmistakably this business: no other resort in the repo is at the end of a route from Fort Lauderdale; the chart and its codes are its own world. Different from the marinas in the repo (no 3D ocean, no arrival film).
