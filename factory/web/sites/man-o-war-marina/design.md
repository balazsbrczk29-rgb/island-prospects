# Man-O-War Marina: design.md
Job spec: `factory/jobspecs/man-o-war-marina.md` (approved Nov 22). Previous version: harbour broadsheet (masthead nameplate, live dateline over a sunset band, "Will she fit?" on screen 3, slip-request letter on screen 4, hours timeline).

## 1. The idea in one paragraph
"The dockmaster's answer, before you cast off." The broadsheet stays: a Newsreader nameplate and a live dateline in Bahamas time. But screen 1 is now the harbour office window: their sunset dock photograph on the left, and on the right the dateline ("Saturday, 2:14 pm on Man-O-War Cay. The fuel dock is open until four."), a three-line board of what else is open, and the check a captain came for: length, beam, draft and nights. One sentence answers ("She fits, with 2 ft to spare at low tide."), three thin gauges show it against 120 / 20 / 7, and the dockage from their own rate sheet appears in tabular figures. One button carries the boat into the slip-request letter; Call and "VHF 16 on arrival" sit beside it.

## 2. Inspirations
- **The Financial Times weekend masthead and datelines:** a serif nameplate, a dated line that is genuinely live. Taken: the dateline as the hero's first sentence.
- **Navionics / Garmin chart readouts:** numbers first, unit small, limit marks on a bar. Taken: the gauges with a hairline limit tick, tabular readouts.
- **Stripe Checkout:** the summary recalculates as you type and the action restates what you get. Taken: the estimate line and "Request a slip for a 52 ft boat".
- Playbook `marina` references: arrival and fit as the product; the numbers a captain checks.

## 3. Tokens
**Type.** One family: Newsreader variable with optical sizes (self-hosted @fontsource-variable/newsreader, roman + italic). Display at opsz 72, text at opsz 16 (auto). Like a harbour notice printed by a good local press: calm, precise, trustworthy. Tabular lining figures on every number. Fallback Georgia (size-adjust 96%).
Scale: 14 caption / 16 small / 19 body / 24 lead / 36 h3 and readouts / clamp(34, 60) h2 and dateline / clamp(40, 60) nameplate. Display tracking -0.03em, leading 1.04 to 1.1.
**Colour (OKLCH; written as hex in CSS because inspect.mjs parses rgb).**
- ground `--ground` oklch(95.8% 0.016 85) #f5f0e5 (sand)
- paper `--paper` oklch(98.3% 0.008 85) #fbf9f3
- ink `--ink` oklch(26% 0.04 205) #0d2b2e (harbour ink)
- muted `--muted` oklch(45% 0.025 200) #4f5f60, 6.2:1 on sand
- line `--line` oklch(87% 0.02 85) #ddd5c5
- accent `--channel` oklch(47% 0.08 200) #1e6b72 (channel marker teal): primary buttons, open dots, gauge fill, focus. Hover #14525a.
- field `--field` oklch(87% 0.055 180) #bfe3dc (Sea of Abaco shallows): the docks screen and the fit result panel only.
**Space.** 4, 8, 16, 24, 32, 48, 64, 96, 144. Section padding 96/144 desktop, 64 phone. 12-col grid inside max 1320, gutter clamp(20, 4.4vw, 64). Measure 30 to 52ch.
**Shape.** Radius 2 on photos and panels (newsprint), pill buttons, round stepper buttons 48. Concentric not needed (no nested radii). No shadows except the letter's 1px rule.
**Motion.** Ease cubic-bezier(.22,.61,.36,1), io (.65,0,.35,1). 180 ms feedback, 420 ms gauge fills and verdict crossfade, 1.4 s photo fade-in. Gauges scaleX from left, interruptible CSS transitions. Dot pulse 2.4 s only on open places. Reduced motion: no pulse, no scale, instant.

## 4. Screens
### Screen 1: dateline, board and the fit check (desktop 1440x900)
- Masthead (kept): top rule with "Full-service marina since 1976", phone, VHF 16; nameplate "Man-O-War Marina" (h1 visually as nameplate) and nav. About 130px.
- Below, 12 cols: cols 1 to 5 the dusk photo (native 3024x4032, shown ~520x740, crop 50% 45%), caption "The main dock at sundown". Cols 6 to 12: dateline (t 34 to 44px), board (fuel dock, office, roadside pump, Dock N' Dine, each with open dot and "open until four" / "opens Monday at eight"), then the check panel on paper: three steppers in a row (Length overall, Beam, Draft, ft), a Nights stepper with arrival date; then the verdict sentence (36px), three gauges, the dockage line, actions: "Request a slip for her" (teal pill) + "Call (242) 554-9500" + "VHF 16 on arrival".
- Phone: masthead compact; photo band 220px; dateline 28px; board as a two-column list; steppers stacked full width (compact 56px rows); verdict + estimate; button full width. Verdict visible on first screen; button after one short scroll (the mobile strip appears once the hero leaves).

### Screen 2: the docks (aqua field) (#docks)
Kept and elevated: the captain's numbers set large (23 slips, 120 ft, 20 ft, 7 ft), the specs list (power 30/50 at every slip, water, assisted docking VHF 16, fuel, office), story columns (since 1976, Dorian, rebuilt), sign photo (2048x1536 shown ≤640). New: "Dockage" block with the published rate sheet in plain words: day stop $40 (first hour free), $2.50 per ft per night up to 14 nights, $2.00 for 15 to 30, $1.50 beyond 30, $1.00 beyond 60, free while you dine at Dock N' Dine; power $0.75 per kW, water $0.50 a gallon, laundry $20 a load; link to the PDF.

### Screen 3: fuel (#fuel)
New dedicated screen: H2 "The only fuel on Man-O-War Cay." Two columns: Dockside (gasoline and diesel, Mon to Sat 8 to 12 and 1 to 4) and Roadside pump (Mon to Sat 9 to 12 and 2 to 4), each with a live status line and a thin day bar (6 am to 6 pm) shading the open spans with a "now" tick. Flag photo (3024x4032, finger dock) at 4:5 on the right.

### Screen 4: the slip request letter (#request)
Kept: the letter with inline fields; now prefilled from screen 1 (boat specs, arrival, departure computed from nights) and including the estimate line. Primary "Write the email"; secondary call.

### Screen 5: ashore
Kept: the day timeline with the now line, porch photo, Dock N' Dine (lunch Mon to Sat 11 to 3, phone), boardwalk and shop photos, guest facilities, then the cay paragraph and link to island.html (MOW Life guide).

### Screen 6: colophon (contact)
Kept: "Call ahead, or raise the dock on channel 16 as you come in.", office phone, email, VHF, hours, restaurant phone, place, plus a map pin link (Google Maps search link for "Man-O-War Marina, Man-O-War Cay").

## 5. The core tool: interaction spec
- **Inputs/defaults:** LOA 52 ft (10 to 200), beam 16 (4 to 40), draft 5 (1 to 15), nights 3 (0 to 90, 0 = day stop), arrival date (empty). Steppers: round minus/plus buttons plus a typed numeric input.
- **Verdict:** over any limit: "Talk to the dockmaster first." + which limits are exceeded + call line; else "She fits." + "inside 120 / 20 / 7, with N ft to spare at low tide".
- **Estimate:** nights 0: "Day stop: $40, the first hour free." Else rate = 2.50 (1 to 14 nights), 2.00 (15 to 30), 1.50 (31 to 60), 1.00 (61+); dockage = LOA x rate x nights; line "3 nights x 52 ft x $2.50 = $390 dockage, from the marina's rate sheet. Power and water metered; free dockage while you dine." Only shown when she fits. (The tier reading is our interpretation of the sheet; noted.)
- **States:** fits (teal top rule), over (ink rule, call primary), typing invalid (input ignored, keeps last valid). No async.
- **Animation:** gauge fill scaleX 420 ms; verdict text crossfade 180 ms keyed on fits/over; estimate number tabular so it doesn't jump.
- **Keyboard/touch:** inputs inputMode numeric; arrow up/down on input step by 1; buttons 48px.
- **Handoff:** "Request a slip for her" scrolls to #request with everything carried (lifted state); the letter mailto to mowmv@hotmail.com subject "Slip request: <boat>, <dates>" body with specs, dates, nights, power, estimate. Call tel:+12425549500. VHF 16 text.

## 6. Signature details
1. The live dateline in Bahamas time with the fuel dock's state as the sentence ("The fuel dock reopens at one.").
2. Gauges with a hairline limit tick; over-limit fill turns ink.
3. The fuel day bars with a "now" tick moving through the day.
4. Numbers in Newsreader tabular figures everywhere, units small.
5. The letter writes itself from the check above ("52 ft overall, 16 ft beam, drawing 5 ft").

## 7. Photography plan (Wix originals from manowarmarinavillage.com, requested at the shown size via Wix fill URLs; width/height attributes = requested size, always below native)
| Photo | Native | Where | Crop | Alt |
|---|---|---|---|---|
| dusk 0b3c23_fe4056cc | 3024x4032 | Screen 1 left | 50% 45% | The marina dock running out to the sun setting over the harbour |
| sign 0b3c23_5ee2be2f (png) | 2048x1536 | Screen 2 | center | The Man-O-War Marina sign on its piling among sailboats |
| flag 0b3c23_dfa1ef9b | 3024x4032 | Screen 3 | center | A finger dock reaching into clear harbour water |
| porch 0b3c23_6bc8e1ba | 3024x4032 | Screen 5 | center | The covered porch of Dock N' Dine |
| walk 0b3c23_8644da71 | 3024x4032 | Screen 5 | center | Boardwalk to Dock N' Dine |
| shop 0b3c23_07d680b9 | 3024x4032 | Screen 5 small | center | Inside the office and gift shop |
No overlays, no grade change.

## 8. Self-review
- Screen 1 sells and completes: desktop yes (photo, live state, fit answer, estimate, Request and Call within 900). Phone: answer on screen 1, button one short scroll, sticky strip after.
- A1 none. A2 no "Phone:" labels (specs list uses dt as content labels for a captain's table, acceptable). A3 italics only for captions (consistent caption voice). A4 no mono. A5 tokens above. A6 their photos, their numbers. A7 the check is the largest thing beside the photo. A8 spacing groups. A9 headlines specific ("The only fuel on Man-O-War Cay."). A10 one teal primary per screen. A11 teal only on primary, open dots, gauge fill. A12 no icons. A13 no ornaments. A14 n/a. A15 muted 6.2:1 on sand; photo caption white on photo only with text-shadow (kept small, on the darker lower part). A16 balance/pretty. A17 stepper glyphs centred. A18 tabular everywhere. A19 sand placeholders with aspect ratios. A20 motion only on change.
- This business: the only-fuel fact, VHF 16, 120/20/7, the 1976 harbour broadsheet. Different from the other marinas in the repo: no ocean 3D, no dark hero, a newspaper office window.
- Decisions: website hours used (the rate-sheet PDF lists office and fuel to 5 pm and different restaurant hours; flagged to the owner in concept notes). Boat-type presets skipped (typical dimensions would be invented).
