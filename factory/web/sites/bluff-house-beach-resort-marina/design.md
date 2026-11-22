# Bluff House Beach Resort & Marina: design.md (2026-11-22, built from the approved job spec)

## 1. The idea in one paragraph
"The register." Since the early 1950s Bluff House has been a house on a bluff that writes visitors in: first the boaters the Coadys took in, now guests who arrive by plane and ferry or by their own boat. Screen 1 is a two-page spread. On the left, the property's own photograph, large. On the right, the planner set as one sentence in a literary serif that the visitor fills in like a line in the guest register: "We arrive on [14 March] for [5] nights, by [air | sea]." By air, the sentence continues "and stay in [an upper suite | a lower suite | a cottage]" and the night-by-night total at the published season rates appears under it with Book on Cloudbeds. By sea, it continues "Our boat is [42] ft and draws [5.5] ft" and the fit against White Sound's 7 ft MLW channel and the per-foot dockage estimate appear, with Reserve on Dockwa. Choosing sea makes the photograph wipe from a balcony over the Sea of Abaco to the docks in White Sound. One sentence, one answer, one button.

## 2. Inspirations
- **Aman (aman.com):** the booking question sits inside the editorial spread, not in a widget bar; generous paper margins.
- **Monocle (monocle.com) and The Gentlewoman print layouts:** a thin masthead rule, a dateline, numbered sections, captions in an italic text face under every photograph.
- **Airbnb search on mobile:** the answer updates as each field changes, with no submit step; numbers tick.
- **Stripe Press (press.stripe.com):** a sentence as the interface, underlined fields in the body type.
From `site-playbooks/playbooks/resort.md`: "Wake up here" (the view from the room as the hero) and "the journey is part of it" (plane or boat).

## 3. Tokens
- **Type.** Display: Libre Caslon Display 400 (high-contrast Caslon, the book face of 18th-century registers and almanacs: storied, literary, unhurried). Caption voice: Libre Caslon Text 400 italic. Text and UI: Rethink Sans variable 400 to 600 (calm, open, large x-height, legible small on phones). All self-hosted in `src/fonts`.
  Scale (rem at 16 px): caption 0.875 / lh 1.45 / +0.005em; body 1.0625 / lh 1.6; lead 1.25 / lh 1.5; h3 1.75 / lh 1.15 / -0.01em; h2 clamp(2.25, 4vw, 3.5) / lh 1.04 / -0.02em; hero clamp(2.6, 4.6vw, 4.5) / lh 1.0 / -0.025em. The planner sentence uses h3 to h2 sizes in Caslon Display.
- **Colour (OKLCH).**
  - ground `oklch(0.968 0.010 88)` (paper); surface `oklch(0.99 0.004 88)`; ink `oklch(0.23 0.035 252)` (deep Abaco navy); muted `oklch(0.45 0.03 250)` (7:1 on ground); line `oklch(0.87 0.015 88)`.
  - accent `oklch(0.46 0.105 247)` (Abaco blue, about #285a8c), only for primary buttons, active field underline and the total. White text on it is 6.9:1.
  - field `oklch(0.925 0.032 222)` (White Sound shallows) for the marina screen only.
  - status: fit good uses accent; tight uses ink with a dotted underline; no red.
- **Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 72, 112. Section padding 112 desktop, 72 phone. Page gutter clamp(20px, 4.5vw, 64px). Desktop grid 12 columns, 24 px gutter; spread is 7 + 5. Text measure 62ch max.
- **Shape.** Buttons radius 4 px (square-ish, like a printed ticket, not pills). Photos radius 0. Field underline 1.5 px. One shadow only: the phone tear-off strip `0 -8px 24px oklch(0.23 0.035 252 / .12)`.
- **Motion.** Ease `cubic-bezier(.22,1,.36,1)` for entrances and moves, `cubic-bezier(.4,0,1,1)` for exits. Feedback 180 ms, total ticker 420 ms, photo wipe 900 ms. Result lines stagger 40 ms (max 3 lines). Reduced motion: photo crossfade 200 ms opacity only, numbers jump.

## 4. Screens
**Masthead (all widths).** One row: wordmark "Bluff House" in Caslon Display 28 px left, dateline "White Sound, Green Turtle Cay, Abaco" muted 14 px centre (desktop only), "Book now" text link in accent right. Hairline ink rule under it. Not sticky. Phone: wordmark left, "Book" right.

**1. The spread (stay or dock).** Purpose: the product and the core tool.
- Desktop: 12 columns, height min(100svh - masthead, 860px). Columns 1 to 7: the photograph, full height, object-fit cover, caption under it in Caslon Text italic ("Upper suite balcony over the Sea of Abaco" / "The docks in White Sound"). Columns 8 to 12 on paper: section number "No. 1" muted, H1 "A balcony over the Sea of Abaco, or a slip in White Sound." Then the sentence planner, then the result block (rate lines, total, button), then a muted note line with taxes.
- Phone: photograph first, 40svh, caption; then H1 (2.6 rem), the sentence planner, result, button. Total and button reachable within the first 1.6 screens; the Book button is visible above the fold if the visitor does not touch anything, because the default result is shown.
- Primary action: "Book on Cloudbeds" (air) or "Reserve on Dockwa" (sea). Secondary: WhatsApp +1 242 824 9550.

**2. Where you sleep.** Purpose: compare suites and cottages.
- H2 "Eight suites on the water, nine houses in the garden." A ruled list, not cards: each row is photo (240 x 160 desktop, 120 x 80 phone, from 960 x 640 native), name in Caslon, beds and baths, view line, the rate for the visitor's dates (from the planner state: "Your dates: $1,850 for 5 nights" for suites; cottages "From $270 to $650 a night, quote by email"; Sunset Cottage 4 "$600 to $1,000"), and a text action (Book / Ask for a quote / Walk it in 3D for suites).
- Rows: Upper suite (king or two queens, mini fridge, coffee maker; 2 Matterport tours), Lower suite (king or two queens, at the water's edge; 2 tours), then the nine cottages: Summerset studio 1 bath; La Conchita 1 bed 1 bath; Turtle Bluff Villa 2 bed 2.5 bath; Pineapple House 2 bed 2.5 bath; Sweet Guava Villa 3 bed 3 bath; Blue Bay Cottage 3 bed 3.5 bath; Dove Cottage 3 bed 3.5 bath; Coral Haven 3 bed 3.5 bath; Sunset Cottage 4, 4 bed 5 bath.
- Phone: rows become photo left (120) + text right; actions as one text link.

**3. The marina.** Purpose: boaters decide and reserve.
- Field colour ground. Desktop: left 5 columns H2 "Forty slips, seven feet at low water." + paragraph + Dockwa button; right 7 columns the specs ledger (two columns of term / value) and under it the season rate table (season, dates, daily, weekly, slips 6 and 19, T-head) titled "Last published dockage, 2024 to 2025 seasons" with the note "30 ft minimum, plus 10% VAT; power $0.85 per kWh, water $0.35 a gallon, metered". Marina photo 1024 x 576 shown at 512 max.
- Phone: stacked; table scrolls horizontally inside its own container with the first column fixed.

**4. Eat and drink, and weddings.** Two photographs at native-limited sizes: The Boathouse (2875 x 2032 native, shown at about 760) with caption; the Tranquil Turtle (1024 x 777, shown at 512 max) with the Caribbean Journal line as a pull quote in Caslon Display ("Number six of the Top 25 Beach Bars in the Caribbean." Caribbean Journal, 2024). A short weddings line with link to bluffhouse.com/wedding and the Low Tide Gift Shop.

**5. Seventy-odd years on the bluff.** A horizontal ruled timeline on desktop (6 stops), vertical on phone: early 1950s Pearce and Kitty Coady; 1978 to 1986 the Davies family; 1986 to 1995 Martin Havill; 1995 to 2011 Roger and Susan Phillips; 2011 investors led by Ian Phillips; December 2025 VIP Marinas Group (Austin and Jenny Cameron, Felecia and Dan Ongley). A drop-cap paragraph above it from the previous version's voice. Recognition line: TripAdvisor Certificate of Excellence Hall of Fame 2018; GM Molly McIntosh, Caribbean Journal Hotelier of the Year 2018.

**6. Getting here and contact (the close).** Ink ground (the only dark block, small). H2 "Write yourself in." Left: by sea (channel 7 ft MLW, dockmaster meets you, Dockwa), by ferry (pick-up and drop-off at the Bluff House dock), golf carts (front desk helps). Right: phones (+1 242 824 9550 resort and WhatsApp, +1 954 284 7341 US office, +1 242 821 7267 restaurants), frontdesk@bluffhouse.com, season "Closed 3 September to 31 October". Primary: "Check dates and book" (paper button on ink). Then concept credit.

**Phone tear-off strip.** After screen 1 leaves view and hidden over the close: "WhatsApp" + "Book a stay". `--concept-offset: 72px` while visible.

## 5. The core tool: interaction spec
- **Inputs and defaults.** Arrival date: native date input styled as an underlined phrase, default = 15th of the month two months from today, moved to 1 November if it lands in the closed period. Nights: stepper − / + (1 to 21), default 5. Mode: segmented "air | sea", default air. Room (air): "an upper suite | a lower suite | a cottage", default upper. Boat (sea): LOA number 20 to 200 ft, default 42; draft number 2 to 12 ft step 0.5, default 5.5.
- **Room rates (published, bluffhouse.com/room-type-and-rates):** Christmas 18 Dec to 7 Jan: upper 370, lower 320. Winter 8 Jan to 28 Feb: 290 / 240 ("from"). Spring 1 Mar to 31 May: 370 / 320. Summer 1 Jun to 7 Aug: 390 / 350. End of season 8 Aug to 2 Sep: 290 / 240 ("from"). Closed 3 Sep to 31 Oct. Fall 1 Nov to 17 Dec: 290 / 240 ("from"). Plus 6% BOIPB levy, 6% service charge, 10% VAT (shown as a note, not computed, since the order of application is not published).
- **Formula (suites).** total = sum over each night n of rate(season(arrival + n), level). Show "5 nights, Spring season, $370 a night" when one season; "5 nights across two seasons" when mixed. Prefix "from" if any night is a "from" season.
- **Cottages.** No per-night calculation (rates published only as a range): "$270 to $650 a night by house, Sunset Cottage 4 $600 to $1,000. A quote for your dates by email." CTA "Ask for a cottage quote" (mailto frontdesk@ prefilled with dates and nights); secondary "Book on Cloudbeds".
- **Dockage (published 2024 to 2025):** 20 Dec to 3 Jan $2.50 daily / $2.25 weekly; 4 Jan to 28 Feb $2.00 / $1.75; 1 Mar to 31 May $2.50 / $2.25; 1 Jun to 6 Aug $3.50 / no weekly; 7 Aug to 1 Sep $2.50 / $2.25; closed 2 Sep to 26 Oct; 27 Oct to 19 Dec $2.00 / $1.75. Weekly rate applies when nights ≥ 7 and the season has one. billed feet = max(LOA, 30). dockage = sum over nights of billedFeet × rate; VAT = 10%; show dockage, "+ 10% VAT", and total with VAT. Metered power and water noted.
- **Fit.** draft ≤ 6: "Clears the 7 ft channel at mean low water with a foot or more to spare." 6 < draft ≤ 7: "Tight at mean low water. Time your entry on a rising tide and call the dockmaster." draft > 7: "Draws more than the channel at mean low water. Call the dockmaster before you plan." A depth gauge shows the channel bottom at 7 ft and the keel at the draft.
- **States.** Filled (default, always a result). Closed: any night in the closed window replaces the result with "We are closed for the season from 3 September to 31 October. Try a date from 1 November." and the button becomes "Ask the front desk" (mailto). Error: invalid date or empty number shows the last valid result dimmed with a one-line hint. No loading state needed (all local); hand-off links open in a new tab.
- **Animation.** Mode change: photograph wipes (new image's wrapper slides in from the right edge for sea, from the left for air, inner counter-translates, transform only, 900 ms, interruptible via Motion's AnimatePresence with mode popLayout). The sentence's second clause crossfades and slides 8 px. Total ticks to the new value (420 ms, tabular nums). Result lines stagger 40 ms.
- **Keyboard and touch.** All controls are native (button, input type=date, input type=number with inputmode decimal); segmented controls are buttons with aria-pressed; result region aria-live polite. Hit areas ≥ 44 px.
- **Hand-off.** Cloudbeds https://us2.cloudbeds.com/reservation/McFW6d (with checkin/checkout query params), Dockwa https://dockwa.com/explore/destination/wgcegn-bluff-house-resort-and-marina, WhatsApp wa.me/12428249550 with prefilled text, mailto frontdesk@bluffhouse.com.

## 6. Signature details
1. The sentence planner: the fields are underlined in the body of a Caslon sentence, like a filled-in line of a guest register; the active field's underline turns Abaco blue.
2. The total ticks from old to new value with tabular figures.
3. The channel gauge: a thin vertical scale beside the boat result, 0 to 10 ft, with the dredged channel line at 7 ft MLW and the keel mark sliding to the visitor's draft.
4. Italic Caslon Text captions under every photograph that change with the planner.
5. Section numbers "No. 1" to "No. 6" in the masthead manner of the magazine, kept from the previous version's voice.
6. The timeline rule with year stops set in Caslon figures.

## 7. Photography plan (all from bluffhouse.com, Wix media; transforms request exact sizes, which become the native size)
- Hero air, upper: `5c5976_4d430b71b1694947902404f615c7b9f8~mv2.jpg` fill 1600 x 1067, centre; alt "An upper suite balcony with two Adirondack chairs over the Sea of Abaco".
- Hero air, lower: `5c5976_77c8eb03fd5a483e8052b2b833d2edff~mv2.jpg` fill 1600 x 1067; alt "A lower suite porch opening onto the water through sea grape".
- Hero air, cottage: `5c5976_a09cf38a6dc3489080c5591cccda567c~mv2.jpg` (Pineapple House, cottages page lead) fill 1600 x 1067; alt "A Bluff House villa among palms above White Sound".
- Hero sea: `5c5976_cd07c1191ea14bd8bee1baad32ba7ed7~mv2.jpg` (marina page lead, 2500 x 1875 original) fill 1600 x 1200; alt "The Bluff House docks in White Sound".
- Room rows: suites use `upperRoom` 6b9dd005 and `lowerRoom` ebd836a2 at fill 960 x 640; cottages use each cottage's own photo from the cottages page (8dc53b47, e0a8b34d, 5ea59c39, a09cf38a, f06f9c73, 15514a4e, 473c5552, b5f37014, a02d4c_388a4b0a) at fill 640 x 640 crop, shown at 160 max.
- Marina: `5c5976_89c8828c6a3443d9a742a1cd5670bab8~mv2.jpg` 1024 x 576, shown 512 max.
- Boathouse `0a65c2bd` fill 1600 x 1131 (from 2875 x 2032); Tranquil Turtle `8fdda870` png 1024 x 777, 512 max.
- Grade: no filters; all are the resort's own daylight photographs. Every img has width/height = requested size and a field-tinted background placeholder.

## 8. Self-review
- **Screen 1 sells the product?** Yes: the room or the dock is the photograph, the rate and the total are computed on load, and Book is visible without scrolling on desktop; on phone it is within reach after the photo and headline (the planner starts at about 70% of the first screen; the button sits at about 1.4 screens, the strip makes Book permanent after that).
- **A1 to A20.** A1 no badges. A2 no "Phone:" labels, the close lists numbers with their purpose after them. A3 italic only for captions (Caslon Text italic, consistently). A4 no mono; tabular figures instead. A5 tokens on :root, used everywhere. A6 the real rooms, cottages, docks. A7 the planner is the largest element right of the photograph. A8 spacing groups, rules only for the list and timeline. A9 headlines name the product ("Forty slips, seven feet at low water"). A10 one filled button per screen. A11 accent only on buttons, active underline, totals. A12 no icons except the stepper glyphs (− +) as text. A13 no gradients or ornaments. A14 radii 4 px on buttons only, nothing nested. A15 muted 7:1; captions on paper, never on photos. A16 balance and pretty everywhere, nbsp before last words of headlines. A17 stepper glyphs optically centred. A18 tabular nums on all prices, phones, table. A19 photo boxes have aspect ratios and field tint. A20 motion only on change: photo wipe, ticker, clause swap. Needs care: the date input styling on iOS (keep native, style the wrapper), the rate table on phone (own scroll container), phone strip vs concept tag.
- **Unmistakably this business?** Yes: the Out Islands' first resort written as a guest register, plane or own boat, the 7 ft White Sound channel. Different from Romora Bay (drone photo with floating panel and a by-sea/by-air switch): here the photograph is a printed page, the tool is a sentence on paper beside it, no floating panel, no overlay on the photo, and the marina has its own fit gauge. Different from Sea Spray and Hope Town Inn (not cinematic, not a ledger of slips).
