# Firefly Sunset Resort: design.md
Job spec: `factory/jobspecs/firefly-sunset-resort.md` (approved Nov 22). Previous version: gen 2 (live sunset card over the plunge pool, villa check lower down on conch pink).

## 1. The idea in one paragraph
"Your week, priced, under tonight's sunset." Screen 1 is split like a hotel's own evening letter: on the left their plunge-pool-at-sunset photograph bleeds off the edge; on the right, on conch paper, a single line tells you when the sun sets over the Sea of Abaco tonight (computed live for Hope Town), and directly under it sits the villa and price check. Pick one of six villas, an arrival date and nights, and the real total with 10% VAT counts into place in big tabular figures, with the season and minimum explained in plain words. One shutter-green button sends you to that villa's own Request to book page with your dates. Everything after screen 1 is quiet: one large photograph, one sentence, and the facts a guest needs (the six villas compared, the resort, the Bar & Grill hours, the ferry route, concierge and whole-resort groups, contact).

## 2. Inspirations (named, from memory)
- **Aman (aman.com resort pages):** the booking control sits inside the first screen, typographic and calm, no chrome; one photograph does the selling. Taken: the tool as a quiet column beside the photograph, not a floating widget.
- **Airbnb (total price display):** the number a guest actually pays, taxes in, as the biggest figure. Taken: the VAT-in total is the largest number on the page and ticks between values.
- **Soho House / Kinfolk index pages:** villas as an editorial index (name large, facts small, prices in a tabular column) beside one tall sticky photograph instead of a card grid. Taken for screen 2.
- Playbook `hospitality-stay` references: the "rates in plain words" and "arrival as a route" moves.

## 3. Tokens (all in `src/styles.css` `:root`)
**Type.** Display: Gloock 400 (@fontsource/gloock, self-hosted woff2): a warm, high-contrast serif with soft brackets, like the painted signboards of Hope Town; used for headlines, villa names and the total. Text: Nunito Sans variable (@fontsource-variable/nunito-sans): humanist, rounded terminals, friendly at small sizes, true tabular figures for rates. Fallbacks: Georgia (size-adjust 105%) and Arial (102%).
Scale (px, desktop / phone): `--t-1` 15 caption (lh 1.45) · `--t-2` 17 body (lh 1.6) · `--t-3` 20 lead and villa names in lists (lh 1.4) · `--t-4` 28 h3 (lh 1.2, -0.01em) · `--t-5` clamp(34, 44) h2 (lh 1.08, -0.02em) · `--t-6` clamp(40, 64) hero line and the total (lh 1.02, -0.025em).
**Colour (OKLCH).**
- ground `--shell` oklch(96.5% 0.012 40) (shell paper)
- surface `--shell-2` oklch(92.6% 0.022 40) (photo placeholders, inputs at rest)
- ink `--ink` oklch(27% 0.045 18) (deep rum brown)
- muted `--muted` oklch(45% 0.04 20), 7.0:1 on ground, 5.2:1 on conch
- line `--line` oklch(87% 0.025 35)
- accent `--shutter` oklch(43% 0.06 185) (shutter green): ONLY the primary action buttons, the selected villa marker and focus ring. Hover oklch(38% 0.06 185). Text on it `--shutter-ink` oklch(96% 0.01 90), 7.3:1.
- field `--conch` oklch(86.5% 0.05 30) (the sunset on their deck): screen 1 tool column on desktop is shell; the conch field is used for screen 6 (concierge and groups) and the phone tool block.
- night `--night` oklch(22% 0.03 290) for the contact photo's letterbox only.
**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144. Section padding 144 desktop / 72 phone. Grid: 12 columns, gutter clamp(20px, 4vw, 56px), page max 1560. Text measure 34 to 62ch.
**Shape.** Radius 6 on photos and panels, inputs 6, buttons full pill (999). Concentric: the tool's segment control 10 outer, 4 padding, 6 inner. Borders 1px `--line`. One soft shadow only (the calling card on the night photo): 0 24px 60px -30px oklch(27% 0.045 18 / 0.45).
**Motion.** Easing `--ease-out` cubic-bezier(.22,1,.36,1); `--ease-io` cubic-bezier(.65,0,.35,1). Feedback 180 ms (buttons, segment, steppers). Reveal 600 ms opacity plus 12px rise, once, on section titles only (no blur, not the gen-1 Reveal). Hero photograph settles 1.6 s (scale 1.03 to 1, opacity). Total number: digits roll (each digit column translates Y) 450 ms ease-out, interruptible, origin from the old value. Route line draws (stroke-dashoffset) 1.2 s when in view. Reduced motion: all of it becomes instant swaps; the sunset line and total still update.

## 4. Screens
### Screen 1: the sunset and the price check (desktop 1440x900)
- Purpose: show the place, and price the guest's exact week; hand off to Request to book.
- Layout: 12-col. Photo 189 (native 1920x1280) occupies cols 1 to 7, full height 100svh, flush to the left and top edges (bleed), object-position 50% 60%; rendered about 830px wide, under native. Cols 8 to 12 on shell: top row = name "Firefly Sunset Resort" (display 20) left and quiet links right (Villas, Bar & Grill, Getting here). Then the sunset line in caption muted with a 6px shutter dot that pulses once a minute: "Tonight's sunset over the Sea of Abaco: 5:23 pm, in 2 h 41 min". Then H1 (t-6): "Six villas on the Sea of Abaco. Price your week." Then the tool (section 5): villa segmented list (2 columns x 3 rows of compact rows: name + beds/baths, selected one gets shutter marker), then arrival date + nights stepper + guests stepper in one row, then the result block: total (t-6, tabular), the line under it ("7 nights in season, weekly rate $7,650 + $765 VAT"), then button "Request to book Mint To Be" (shutter pill, 52px) and a text link "or email the resort". Under it a hairline and the "Whole resort" switch.
- Headline copy is sourced (six villas incl. Irvin House, Sea of Abaco, Hope Town).
- Primary action: Request to book (villa's Guesty page).
- Phone (390x844): photo first, 40svh, with the name over a soft shell bar at top (no dark overlay). Below on conch field: sunset line, H1 at 34px, villa chips as a horizontal snap scroller (each chip 148x64: name, from price), date + nights in one row, guests hidden into the email step (guests stepper moves under), total at 40px, button full width. Button bottom sits about 1.25 screens; the total is visible on screen 1 at 844 tall (photo 40svh = 338, sunset+H1 ~ 130, chips 64+24, inputs 76 so total begins ~680).

### Screen 2: the six villas compared (#villas)
- Purpose: compare all six and act on any.
- Layout: cols 1 to 5 sticky photo 114 (native 1920x2553, the resort from the water: you can see the villas above the dock), height 88svh, rendered ~560px wide. Cols 7 to 12: H2 "Every villa faces the sunset." then an index of six rows separated by 1px lines: villa name (t-4 display), "2 bed, 2 bath" caption, the villa's own sentence (from their site), and a rates line with tabular columns "In season $1,125 a night · $7,650 a week / Off season $1,000 · $6,800". Two actions per row: "Price my dates" (text button: selects the villa in the tool and scrolls to it, the panel highlights) and "Request to book" (text link to Guesty). Irvin House row: "Rates on request". Under the list: rules in plain words: "Rates in US dollars before 10% VAT. February to August: three-night minimum. September to January excludes Thanksgiving, Christmas and New Year." Link "All rates in one table" to villas.html.
- Phone: photo becomes a 4:3 crop above the list (not sticky), rows stack; rates wrap to two lines.

### Screen 3: the resort, down the steps
- Purpose: what you get beyond the villa.
- Layout: photo 183 (1920x1440, dock steps into clear water) cols 1 to 8, 4:3; to its right cols 9 to 12 bottom-aligned: H2 "Down the steps, the reef." and one sentence: "A private beach, a snorkel reef off the dock, free kayaks, two pools (the upper pool for villa guests), dock slips for your boat, and a boutique." Then photo 099 (1920x1420, the lower pool and sailboats) cols 5 to 12 offset down 96px with caption "Two pools, the Sea of Abaco beyond." Photo 128 (hammock, 1920 wide) not used (unknown height; avoids a guessed crop).
- Phone: photos full width 4:3, text between.

### Screen 4: Firefly Bar & Grill (#grill)
- Purpose: hours and reserve dinner.
- Layout: photo 123 (1920x1280, dining deck at dusk) cols 1 to 7, full height of section (min 80svh). Cols 8 to 12: H2 "Firefly Bar & Grill", "Open seven days, to guests, locals and visitors." Hours as a definition list with tabular times: Breakfast 8 to 11 am (Bahamian breakfast on Sundays), Lunch 11:30 am to 4 pm, Dinner 5:30 to 9 pm. "Parties of 12 or more: call 1 (242) 366-0145." Button "Reserve dinner" (secondary style: ink outline pill, because the page's primary action is the villa; still 52px) to Tablein, text link "To-go orders in The Boutique until 8 pm".
- Phone: photo 4:3 on top, text below.

### Screen 5: Getting to Elbow Cay (#arrive)
- Purpose: answer "how do I get there" in one glance.
- Layout: H2 "Getting here takes four easy steps." centered-left cols 1 to 6. Below, a horizontal route across cols 1 to 12: four stops on one 1px ink line that draws in: "Fly to Marsh Harbour" / "15 min taxi to the ferry dock" / "20 min ferry to Hope Town" / "Our shuttle from the harbour". Each stop: a 10px ring, the minutes in t-4 tabular above, the label under. Caption: "Abaco is under 180 miles from Florida."
- Phone: the route turns vertical (line on the left, stops stacked).

### Screen 6: concierge, weddings and the whole resort (conch field)
- Purpose: groups and extras; second conversion path.
- Layout: conch field. Cols 1 to 6: H2 "Take the whole resort." The two VAT-inclusive prices large in t-5 tabular: "$21,731 for three days" and "$49,258 for a week", "VAT included." Button "Price the whole resort" (shutter) switches the tool to Whole resort and scrolls up. Cols 8 to 12: "Weddings and events" one sentence ("Weddings, reunions and events on the beach and the decks; ask the resort.") and "Concierge" list in plain lines: golf carts, boats, charters, provisions.
- Phone: stacked.

### Screen 7: contact
- Layout: photo 029 (1920x1427, the resort at night) full width, height min(100svh, 74vw); a shell calling card centred: name, address, email first (largest), "1 (242) 366-0145, Bar & Grill", note "Island lines can drop with the power; email always reaches us.", button "Request a villa" (scrolls to tool). Footer below: credits, nav (Home, Villas and rates), socials.
- Phone: photo 120vw tall, card overlaps bottom.

### Villas page (villas.html)
Kept from previous: full rate table (desktop table, phone stacked rows), whole-resort line, the six villa descriptions; restyled to the new tokens with a top bar and "Price my dates" links back to `./#price?villa=<id>`.

## 5. The core tool: interaction spec
- **Inputs and defaults.** Villa: Mint To Be (the plunge-pool villa in the hero photograph). Arrival: the first Saturday of March of the coming season (2027-03-06 when viewed in Nov 2026), or today + 14 days if that is already in season and later. Nights: 7 (stepper 1 to 28). Guests: 2 (stepper 1 to 12, used for the handoff only). Mode: Villa | Whole resort.
- **Season.** From the arrival date: February to August = in season, else off season. If the stay crosses into the other season: note "Your stay crosses into off season; the resort confirms the final rate."
- **Formula.** weeks = floor(n / 7), rest = n mod 7; base = weeks x weekRate + min(rest x dayRate, weekRate) (the weekly rate when cheaper); VAT = round(base x 0.10); total = base + VAT. Lines show "7 nights, in season: weekly rate $7,650 + $765 VAT".
- **Rules / states.**
  - result: total + explanation (default).
  - in season and n < 3: total hidden, message "Three nights minimum from February to August." Stepper hint; button still offers Request to book.
  - off season and any night falls Wednesday before US Thanksgiving to the Sunday after, or Dec 20 to Jan 2: "Holiday dates are priced separately. Ask the resort." with email as primary.
  - Irvin House: "Rates on request", email primary, Guesty secondary.
  - Whole resort mode: two VAT-included prices shown, the one matching nights highlighted (3 to 6 nights: three-day $21,731; 7: week $49,258; else "Ask for X nights"); primary action = email (no single Guesty page).
  - empty/invalid date (cleared input): "Pick your arrival date." No loading state is needed (pure calculation); no error state beyond these.
- **Animation.** Total digits roll from old to new (each character column translateY, 450 ms ease-out, interruptible: re-keyed on change, starting from current). Villa selection: shutter marker slides between rows with a shared layoutId (Motion `layout`), 300 ms spring (bounce 0). The result line crossfades 180 ms. Reduced motion: instant.
- **Keyboard and touch.** Villa list is a radiogroup with roving tabindex (arrow keys move and select). Steppers are buttons with 44px targets, aria-label "Fewer nights"/"More nights", value in an output with aria-live polite. Date is a native date input (iOS wheel). Phone chips scroll with CSS scroll-snap; the selected chip scrolls into view.
- **Handoff.** Request to book: the villa's own Guesty URL + `?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&minOccupancy=N` (Guesty booking engine parameters; the resort's live calendar confirms availability). Email: `mailto:info@fireflysunsetresort.com` subject "Villa request: Mint To Be, 6 to 13 March 2027", body villa, arrival, departure, nights, guests, the estimate shown, "Sent from the Firefly website" (exactly what their rooms page asks for: villa name, dates and number of guests).
- **Deep link.** `#price?villa=java` selects that villa (used by villas.html and screen 2).

## 6. Signature details
1. The live sunset line: computed for Hope Town (NOAA formula, about a minute accurate), with the minutes counting down; after dark it says "Tomorrow's sunset". A tiny shutter dot breathes once a minute.
2. The total rolls digit by digit in Gloock tabular figures, so changing nights feels like a till counting.
3. The selected-villa marker is a short shutter-green bar that slides between villa names (shared layout), like a shutter closing on the one you chose.
4. The button names the villa: "Request to book Java Rum Plantation".
5. The ferry route draws itself as one thin line with the minutes above each stop.
6. Screen 2 "Price my dates" sends you back up to the tool with that villa already chosen and the panel glowing conch for 600 ms.

## 7. Photography plan (all their own, le-de.cdn-website.com/.../Firefly+Sunset+Resort-NNN-1920w.jpg, 1280w variant via srcset)
| Photo | Native | Where | Crop focus | Alt |
|---|---|---|---|---|
| 189 | 1920x1280 | Screen 1, left 7 cols / phone top 40svh | 50% 60% desktop, 72% 55% phone (plunge pool and horizon) | The plunge pool and deck at Firefly Sunset Resort at sunset, the Sea of Abaco beyond |
| 114 | 1920x2553 | Screen 2 sticky | 50% 50% | Firefly Sunset Resort seen from the water: the villas above the rebuilt dock and dining deck |
| 183 | 1920x1440 | Screen 3 | 50% 60% | Wooden steps from the Firefly dock down into clear water |
| 099 | 1920x1420 | Screen 3 offset | 50% 50% | The lower pool and lawn at Firefly, sailboats on the Sea of Abaco beyond |
| 123 | 1920x1280 | Screen 4 | 40% 50% | The Firefly dining deck at dusk under string lights |
| 029 | 1920x1427 | Screen 7 | 50% 55% | Firefly Sunset Resort at night, lights on the deck and the dock |
No photo is shown wider than 1920; width/height attributes are native. Placeholder: `--shell-2` background on every figure (no shift). One grade: none applied (their photos are already warm); no overlays.

## 8. Self-review before coding
- **Screen 1 sells the product and a visitor can complete the job without scrolling?** Desktop yes: photo, villa choice, dates, total, Request to book all within 900px. Phone: photo, sunset, villa chips, dates and total within 844; the button is just below the fold on a 390x844 (one short scroll). Accepted: the photograph matters for this buyer; the total is on screen 1.
- **A1** no badges. **A2** no "Phone:" labels; hours list labels are meals (content). **A3** no italics. **A4** no mono. **A5** tokens defined above, components use only them. **A6** real product: their photos and their villas and rates. **A7** the tool is the largest element in its column; the total is the biggest number. **A8** grouping by space; lines only in the villa index and hours. **A9** headlines specific: "Six villas on the Sea of Abaco. Price your week.", "Every villa faces the sunset.", "Getting here takes four easy steps." **A10** one primary per screen (shutter pill); Reserve dinner is an outline secondary. **A11** shutter only on primary, marker, focus. **A12** no icons except the stepper minus/plus drawn as text glyphs; consistent. **A13** no gradients or ornaments; one shadow. **A14** segment 10/4/6 concentric. **A15** muted 7:1 on shell, 5.2:1 on conch; no text on photos except the phone name bar on a solid shell strip. **A16** balance/pretty set; check 390 widows. **A17** stepper glyphs optically centred. **A18** tabular on rates, totals, times, phone. **A19** figures have shell-2 placeholders and aspect ratios; fonts swap with metric fallbacks. **A20** motion only explains change (total, marker, route).
- **Care needed:** phone chip row must not overflow the page (contain within its own scroller); the date input on iOS min-height 48; the sticky photo must not leave empty space at the end of screen 2 (photo height 88svh, list longer).
- **Unmistakably this business?** Yes: the live Hope Town sunset, their six villa names and VAT rules, their ferry route, conch and shutter. Different from the repo's other resorts: no card grids, no dark hero, the tool is a calm letter-column, not a booking bar.
- **Decisions (unattended):** their site has no per-villa photographs, so the villa list is typographic and screen 2 uses the resort-from-the-water photo (which shows the villas) rather than guessing which gallery frame is which villa. Guesty date parameters are a best-effort handoff; the resort's own calendar confirms.
