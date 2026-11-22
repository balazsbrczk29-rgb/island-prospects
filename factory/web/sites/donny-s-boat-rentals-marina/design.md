# Donny's Boat Rentals & Marina: design.md (2026-11-22, generation 2, job-spec build)

## 1. The idea in one paragraph
The first screen is Donny's own aerial of the dock at the end of Black Sound, and beside it the trip sheet you would fill in at the dock office: pick one of the four boats, set your days, and the total from Donny's published rates ticks into place, ready to send to Taylor on WhatsApp. A second tab on the same sheet answers the cruiser's question, "does my boat fit?", from LOA and draft. Everything below supports that one decision: the four boats side by side in one honest comparison table, a route card that draws the day out of Black Sound to the pigs at No Name Cay and the turtles at Manjack Cay, the rules in plain words (cash, 3-day minimum, back by 5), the marina rates, and a close that puts Taylor's number in your thumb. Sunny, practical, family run: a place where the numbers are clear and someone answers.

## 2. Inspirations
- **Hertz / Sixt booking widget, done by Aesop's art director:** the booking sheet sits on screen 1 next to the product, not under it. I take the tool-first hero and the single total with a live breakdown.
- **Riva Yacht "models" comparison:** specs as quiet typography in aligned rows, the photo carrying the emotion. I take the column comparison with one row per spec.
- **Navionics / a chart-plotter screen:** a graticule, waypoints and route legs drawn in one colour. I take the route card language (dashed legs, waypoint rings, a north arrow), clearly labelled schematic.
- From the marina playbook: honest depth information up front, VHF and position as data in mono, no luxury clichés.

Kept from our previous version (the spec's Keep list): the cost planner logic and copy, the WhatsApp message builder, the terms in plain words, the marina rates and slip check, the type pairing and palette family (Balazs: "keep this beautiful design composition and individuality"). Dropped: the horizontal fleet track (replaced by a comparison that answers "which boat fits our group" faster) and the scroll film (replaced by the route card the spec asks for).

## 3. Tokens
**Type.** Display: Bricolage Grotesque (variable, opsz), self-hosted from the existing woff2. A warm, slightly quirky grotesk with ink traps: friendly and family-run, unlike the serif luxury marinas in the repo; kept because Balazs approved this site's individuality. Text: Figtree (variable). Data (coordinates, VHF, positions only): JetBrains Mono is NOT added; coordinates use Figtree with tabular numbers (A4: mono only where needed, not needed here).
Scale (rem/px, leading, tracking):
- caption 0.875 / 14, 1.4, 0
- small 0.9375 / 15, 1.45, 0
- body 1.0625 / 17 (phone) 1.125 / 18 (desktop), 1.55, 0
- lead 1.375 / 22, 1.35, -0.01em
- h2 2.5 / 40 phone, 3.5 / 56 desktop, 1.0, -0.04em
- h1 2.5 / 40 phone, clamp(3rem, 3.9vw, 4.25rem) desktop, 0.98, -0.045em
- figure (the total) 3.5 / 56 phone, 4.5 / 72 desktop, 1, -0.04em, Figtree 700 tabular

**Colour (OKLCH).**
- ground `oklch(97.4% 0.006 165)` (salt white, #f2f6f3)
- surface `oklch(100% 0 0)` (the trip sheet)
- sand `oklch(95.6% 0.014 85)` (#f4efe4, terms band)
- flats `oklch(88.6% 0.045 180)` (#bfe3dc, the field colour: marina section and selected states)
- ink `oklch(27.5% 0.035 205)` (#0d2b2e)
- muted `oklch(44.5% 0.03 190)` (#47605f), 6.3:1 on ground, 5.7:1 on flats
- line `oklch(88.5% 0.015 165)` (#cfdcd6)
- accent `oklch(47.5% 0.075 205)` (#1e6b72, channel teal), hover `oklch(39.5% 0.065 205)`. Reserved for the primary action, the selected state and the route line.
**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 desktop / 72 phone. Page gutter 4vw desktop (min 24), 20 phone. 12-column grid, gutter 24. Text measure 42 to 62ch.
**Shape.** Radii 8 (inputs, chips), 14 (option tiles), 24 (the sheet, photo frames). Option tile inside the sheet: 24 - 10 padding = 14. One soft shadow only, on the trip sheet: `0 1px 2px oklch(27% .03 205 / .06), 0 18px 48px -16px oklch(27% .03 205 / .22)`.
**Motion.** Ease `cubic-bezier(.16,1,.3,1)`. Feedback 180 ms (tiles, buttons, press scale .97). Total roll 280 ms (old value slides up and out, new slides in from below; interruptible through AnimatePresence popLayout). Tab switch 240 ms crossfade + 8 px slide, the tab indicator glides with layoutId. Route legs draw 1.4 s each, staggered 0.35 s, when the card is 40% in view; waypoint rings pop 300 ms after their leg. Hero photo: LivingPhoto (subtle depth on pointer, shimmer on the water), loads after first paint. Reduced motion: no drawing (routes shown complete), no shimmer, values swap instantly.

## 4. Screens

### Screen 1: the dock and the trip sheet (index)
- Purpose: show the product (the marina, the boats) and do the job.
- Desktop 1440x900: header 76 px (wordmark "Donny's" + "Boat Rentals & Marina, Green Turtle Cay"; nav Fleet, Marina, phone). Below, a 12-col grid at calc(100svh - 76px), min 760: columns 1-7 the marina aerial in a 24 px rounded frame (inset 12 px from the left and bottom edge), object-position 50% 55%, rendered ~800x810 from a 2000x1499 native. A small caption chip bottom-left on the photo: "Donny's dock and moorings, end of Black Sound". Columns 8-12: H1 "Your own boat on the Sea of Abaco." then the lead "Four 4-stroke boats from 17 to 23 ft, from $125 a day. Collect at 8, back by 5." then the trip sheet.
- Trip sheet: tabs "Rent a boat" / "Does my boat fit?". Rent tab: 2x2 boat tiles (thumbnail 44 px, name, "$140 a day, 4 adults"), a row with days stepper (3 to 14) and first-day date, the total (72 px) with breakdown line, primary "Send to Taylor on WhatsApp", secondary text link "or email Donny", one muted line "Cash only, $100 deposit, 3-day minimum. Nothing is booked here."
- Phone 390x844: header 64; photo 40svh full bleed (no frame); H1 at 40 px, lead; the sheet full width beneath, edge-to-edge surface with 20 px padding. The WhatsApp button is reachable by the end of the first scroll; on phones the floating WhatsApp button appears after the sheet leaves view.

### Screen 2: the four boats compared (index #fleet)
- Purpose: "which boat fits our group, what does it cost".
- Desktop: H2 "Four boats, one dock. Which one is yours?" left (cols 1-5) with a short line; below, a comparison table spanning cols 1-12: a label column (180 px) then 4 boat columns. Row 1: the boat photo (4:3, ~260 wide), row 2 name in display 28 px, then rows: Seats, Engine, A day, 7 days, Experience, then kit rows (Fixed VHF or VHF, Chart-plotter, Stereo, Trim tabs, Ladder, Anchor and rode, Cooler, Buoyancy aids). A dot for listed kit, a dash for "not listed". The final row: "Plan this boat" buttons (ghost) that set the sheet's boat and scroll up. Hovering a column tints it (flats at 40%).
- Phone: the table becomes four stacked boat blocks, each with photo (16:10), name, a 2-column dl of the key rows and the kit as an inline list; "Plan this boat" full width.
- Footnote: "A dash means not listed on Donny's fleet page. Block ice for sale at the dock."

### Screen 3: where to go (index #day)
- Purpose: show what the days are for, inside the Sea of Abaco.
- Desktop: cols 1-7 the route card on the surface colour with a faint graticule; Black Sound / Donny's at the centre, a leg drawn north-west to Manjack Cay ("turtles"), a leg south-east to No Name Cay ("the pigs"), New Plymouth marked as a ten-minute walk from the dock. A north arrow and the line "Schematic, not to scale. Your boat's chart-plotter has the real chart." Cols 8-12: H2 "Pigs at No Name Cay, turtles at Manjack, back by 5." and two stops, each with their own photo (pigs, turtle; 3:2, ~460 wide) and one line. Hovering or focusing a stop thickens its leg.
- Phone: H2, card full width (4:3), stops stacked.

### Screen 4: the rules (index #terms), sand band
- H2 "No ATM on the island: the terms before you go" (cols 1-5), the seven terms as a two-column definition list (cols 6-12), display 22 px terms, muted 17 px detail. Link to the full terms on fleet.html. Phone: one column.

### Screen 5: the marina for cruisers (index #marina), flats field
- Desktop: cols 1-6 their dock aerial in a 24 px frame (~640 wide); cols 7-12: H2 "Coming in on your own boat? Dockage to 50 ft, 7 ft draft." then the rate table (rows: Mooring, Dock 45 ft and under, Dock 46 to 50 ft; columns: a day, a week, a month; tabular), the 30 amp line, extras (shower, washer, dryer, water), the Black Sound entry note, and the action "Check if your boat fits" (primary, opens the sheet's second tab) plus "All marina details" link to marina.html.
- Phone: photo then everything stacked; table stays 4 columns at 15 px.

### Screen 6: contact (index #contact)
- H2 "Ask Taylor on WhatsApp, or find Donny at the dock." WhatsApp number large with the glyph, then a dl: phone at the marina, US number, email, VHF 16 working 10, open 8 am to 8 pm, position N 26° 45.460′ W 077° 19.301′. Right: Donny's boat photo (4:5 frame, ~520 wide, native 4032x3024).
- Footer as before (ink ground, the one dark strip).

### Inner pages (kept from the previous version, restyled by the shared tokens)
- fleet.html: each boat with its photos, full kit, prices and the full terms.
- marina.html: rates, slip check, the way in, amenities.

## 5. The core tool: interaction spec
**Rent tab.** Inputs: boat (default 19 ft Whaler, the mid-price family boat), days (default 7, min 3, max 14), first day (empty), people (default 2, max by boat: 17 ft 3, 19 ft 4, others 6; in the "add details" row on phones, inline on desktop under the date), where staying (optional text, inside the details disclosure).
Formula, from the published rates: total = floor(days / 7) x week + (days mod 7) x day. Checked: for every boat, 6 days at the day rate is below the 7-day rate, so this is always the cheapest reading. Breakdown line: "1 week at $880 + 2 days at $140".
States: filled by default (a real number on load, never empty); stepper buttons disable at 3 and 14 with the note "Longer? Ask Taylor."; the total rolls on change. Experience note appears for Angler and Century ("This boat needs boating experience").
Hand-off: WhatsApp to 12428159323 with the message: "Hello Taylor, I'd like to rent the {boat} from Donny's. Days: {n}, starting {date}. People: {p}. Staying at: {where}, Green Turtle Cay. My estimate from your published rates: {total} ({breakdown}). Is the boat free?" Email alternative to donnysboatrentals@gmail.com with the same body.
Deep links: `?boat=angler` and the `donny:boat` event (from the comparison table) select a boat and scroll to the sheet; `#fit` opens the second tab.

**Does my boat fit? tab.** Inputs: LOA in ft (default 38, 10 to 80), draft in ft (default 5, 1 to 12, step 0.5), stay: nights stepper (default 3, 1 to 31), berth: dock or mooring (default dock), 30 amp (off).
Logic: LOA > 50 or draft > 7 on dock: "Over the published limits (50 ft LOA, 7 ft draft). Call or radio Donny before you come." No price. Otherwise rate row: mooring, or dock 45 ft and under, or dock 46 to 50 ft. Estimate = cheapest of (weeks x week + days x day) and (ceil(nights/7) x week), and from 28 nights also ceil(nights/30) x month. Plus 30 amp at the same day/week/month split. Draft 6 ft or more shows the published entry note: "A 6 ft draft can enter at a tide 2 ft above low water. Stay close to the last red marker, then aim for the middle of the sound."
Result block: the verdict line ("Fits: dock, 45 ft and under"), the estimate figure, the breakdown, and the action "Ask Donny for a slip" (email with LOA, draft, nights, berth, and a VHF 16 line below).

**Keyboard and touch.** Tabs are a real tablist (arrow keys move, Enter activates). Boat tiles are a radio group (arrows move). Steppers are 44 px buttons with aria labels; the number is an `output` with aria-live. All targets 44 px or more.

## 6. Signature details
1. The total rolls like a mechanical counter in tabular Figtree when the boat or days change.
2. Choosing "Plan this boat" in the table glides the page up and the chosen tile in the sheet flashes its ring once.
3. The route legs draw out of Black Sound like a plotter track, then the waypoint rings pop at the pigs and the turtles.
4. The sheet's tab indicator slides between "Rent a boat" and "Does my boat fit?" with a shared layout animation.
5. The slip verdict line changes colour state (accent when it fits, ink with a warning glyph when over limits) and the entry note slides open only when your draft needs it.

## 7. Photography plan (their own Wix photos, one natural grade: no filters)
Native sizes are known only where the Wix file name carries them; elsewhere the page requests a Wix rendition and shows it at or below that rendition's width (Wix serves the original when it is smaller, so every display is kept at 1000 px or less for those).
- Hero: `1c154a_788222cd...~mv2_d_2000_1499_s_2.jpg`, native 2000x1499, srcset 1000/1600/2000, shown ~800x810 desktop (cover, focus 50% 55%), 390x340 phone. Alt: "Donny's marina from the air: boats at the dock and on moorings in clear blue water at the end of Black Sound, Green Turtle Cay".
- Boats (comparison): covers from the fleet page, rendition 640 wide, shown ~260 wide desktop, 350 phone. Alts name each boat.
- Stops: pigs `1c154a_67aed8ea...`, turtle `1c154a_e47d269e...`, rendition 1000, shown ~460 wide.
- Marina: dock aerial `1c154a_c9f3faae...`, rendition 1400, shown ~640 desktop.
- Contact: `1c154a_6049786b...~mv2_d_4032_3024_s_4_2.jpeg`, native 4032x3024, shown ~520 wide.
All images sit in tinted `.ph` boxes with fixed aspect ratios (no layout shift) and carry width/height attributes.

## 8. Self-review before coding
- **Screen 1 sells the product and does the job without scrolling?** Desktop yes: the aerial, the four boats as tiles, the total and the WhatsApp button are all above 900 px. Phone: the photo and headline fill the first view and the sheet starts within it; the send button is one thumb scroll down, and the floating WhatsApp covers the rest of the page.
- A1 no filler badges: none planned. A2 no redundant labels: contact dl uses meaningful labels ("Phone at the marina", "US number") because they distinguish numbers; no "Phone:". A3 no italics. A4 no mono. A5 tokens above, in styles.css. A6 the real boats and the real marina, their own photos. A7 the sheet is the largest UI on screen 1, the total the largest number. A8 grouping by space, the table uses rules only between rows (a table needs them). A9 headlines are specific to Donny's (No ATM, 50 ft, pigs and turtles). A10 one primary per screen: S1 WhatsApp, S2 Plan this boat (ghost, many, the only action), S5 Check if your boat fits, S6 the WhatsApp number. A11 accent only on primary, selected and route. A12 lucide at 1.75 stroke. A13 no gradients or glows; one shadow on the sheet. A14 radii 24/14 concentric. A15 muted 6.3:1, white on accent 6.1:1, the photo caption chip has its own solid ground. A16 balance and pretty set globally. A17 the stepper numbers are centred optically with tabular figures. A18 tnum on every price, phone and coordinate. A19 tinted placeholders, the LivingPhoto keeps the real img under the canvas. A20 motion explains: total roll, tab slide, route draw, slip note open.
- **Needs care:** the hero must fit at 1440x900 (tight vertical budget: the sheet ~500 px, so H1 limited to two lines); the comparison table must not become a SaaS card grid (it is a real table with rows, no cards); the route card must read as a schematic diagram (no fake coastline, labelled not to scale) to respect the truth rule.
- **Unmistakably Donny's?** Yes: their aerial, the cash-only rules, Taylor on WhatsApp, Black Sound's entry note and the pigs and turtles. Different from the repo's marinas: no serif luxury, no dark hero, no pinned 3D; a dock-office trip sheet in a warm grotesk on salt white and flats aqua.
