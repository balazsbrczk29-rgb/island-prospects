# Hope Town Inn & Marina: design.md (job spec approved 2026-11-22, builds on the gen-2 "Two ways in" split)

## 1. The idea in one paragraph
Guests and boats arrive at the same dock on Hope Town Harbour, so the page stays split for good: their own aerial of the harbour and the Elbow Reef Lighthouse holds the left half while the right half asks one question, "Two ways in.", and answers it in place. A two-way switch, By ferry or By boat, sits under the headline. By ferry: tap how many of you are coming (1 to 8) and the nine stays light up or dim, each with its own photo, guests and size; pick one and "Check rates for Areca Palm Villa" opens their Vertical Booking engine. By boat: type your length overall and the verdict reads at once (slip to 125 ft, mooring to 45 ft), with power and services, and "Book a slip on Dockwa". The left photograph follows the switch: the harbour for the ferry, the docks for the boat.

## 2. Inspirations
- **Aman Resorts property pages:** one full-height photograph held still while the text column scrolls. We take: the fixed half, no overlays, no text on the photo.
- **Airbnb guest picker:** the result set reacts instantly to a guest count. We take: the 1 to 8 segmented count and tiles that dim (not vanish) so the grid never jumps.
- **Dockwa marina listing:** LOA first, then the answer and the specs. We take: one LOA field, a plain-words verdict, specs as large tabular numbers.
- Playbook (marina): arrival is the product; slip limits and power in the first screen for boaters.

## 3. Tokens
**Type.** Fraunces variable (display, opsz 144, SOFT 50, -0.04em; harbourside, soft, monumental for one or two words) + Newsreader variable (text, optical sizes; a newspaper serif that suits an old harbour town). Self-hosted woff2.
Scale: 14 small / 19 body / clamp(22, 30) lead and tile names / clamp(38, 64) h2 / clamp(60, 132) "By ferry." / hero h1 clamp(56, 104) on screen 1 (smaller than section heads so the tool fits).
**Colour (OKLCH, written as sRGB hex in CSS).**
- ground paper `oklch(96% 0.01 85)` #f4f1ea; ground-2 `oklch(92.5% 0.012 85)` #e9e5dc
- ink deep harbour `oklch(27% 0.045 245)` #16293a; muted `oklch(47% 0.03 240)` #4f5f6d (6.1:1); line `oklch(87% 0.012 85)` #d8d3c8
- accent harbour blue `oklch(42% 0.09 245)` #1f4e73: primary buttons, selected tile ring, selected count; hover `oklch(36% 0.085 245)` #173f5e
- lighthouse red rule `oklch(55% 0.15 25)` #b8483f: the 2 px rule above the switch only (decorative, never text)
- field: the marina section on `oklch(92% 0.02 230)` #dfe6ea
**Space.** 8 px scale (8, 16, 24, 32, 48, 64, 96, 144); column pad clamp(20, 4.5vw, 80); split 50/50.
**Shape.** Radius 3 px; 1 px lines; no shadows.
**Motion.** ease cubic-bezier(.22,1,.36,1). Left photo crossfade 900 ms; tile dim 250 ms; switch underline slides 300 ms (layoutId); verdict text swaps 200 ms. Reduced motion: instant.

## 4. Screens
### 1. Two ways in (core tool)
- Desktop 1440x900: left 720x900 fixed photo (a.jpg 1921x1082, cover). Right column, pad 64: brand line and nav (one row), h1 "Two ways in." (104 px), one sentence (15-acre estate beside the Elbow Reef Lighthouse, west side of Hope Town Harbour), the switch (By ferry · rooms and villas | By boat · slips to 125 ft) with the red rule above, then the panel:
  - Ferry: "How many of you?" 1 to 8 segmented (default 2), count line, a 3 x 3 grid of the nine stays (photo 395x300 native shown at about 180x137, name, "Up to N · 900 ft²"), "Check rates for {stay}" primary + "Live rates on the inn's reservation system".
  - Boat: LOA field, verdict, the four specs (dockage to 125 ft, 50 slips, moorings to 45 ft, 30/50/100 A), Book a slip on Dockwa.
- Phone 390x844: harbour photo 5:4 on top (390x312), brand, h1 at 3.4rem, sentence, switch, panel (grid 3 x 3 at about 110 px tiles), sticky strip with the current mode's button.
### 2. The stays compared: the existing "By ferry." section becomes the full list (all nine rows with photo thumb, guests, ft² and m²), left photo the pink cottage (j.jpg).
### 3. The marina (field colour): "By boat." with the slip check repeated, specs and services; left the docks crop.
### 4. Bridget's Rum Bar and the restaurant: left bar (g.jpg 2250x3000), cocktails inline 640 max.
### 5. Johnny's Cay: left dock (i.jpg), ask the office.
### 6. Getting here: Marsh Harbour flight, GNL Ferry and The Ferry Limited, Treasure Cay plus boat, private boats via Dockwa.
### 7. Contact: email, US +1 850 588 4855, Bahamas 242 803 4401 (the out-of-service line is never shown), Elbow Reef Classic, Marinalife 2024 Readers' Choice, Dockwa Elite Fleet 2024.

## 5. Core tool interaction spec
- Mode: ferry (default) | boat; tablist with arrow keys; the left photo follows (harbour | docks).
- Ferry: n = 1..8, default 2. fits = guests >= n. Tiles that fit at full opacity, others 35 % and "Sleeps N" in muted; count "6 of 9 stays sleep 4". Selected stay: default the smallest stay that fits (by guests, then size); clicking a fitting tile selects it (accent ring); clicking a dimmed tile raises n? No: dimmed tiles are not buttons (aria-disabled), they still show their data. If the selected stay stops fitting when n changes, select the smallest that fits. CTA label "Check rates for {name}", href Vertical Booking (no room parameter: assumption, the engine opens on the property).
- Boat: LOA numeric (decimal), verdicts: <= 45 "fits the slips, or a mooring"; <= 125 "fits: dockage to 125 ft"; > 125 "over the published 125 ft, ask the office". Empty: prompt. CTA Book a slip on Dockwa.
- The sticky strip shows the button of the current mode.

## 6. Signature details
1. The left photograph changes with the switch: harbour for ferry, the docks for boats.
2. A 2 px lighthouse-red rule above the switch, the one red on the page, after the Elbow Reef Lighthouse.
3. Tiles dim instead of disappearing, so the grid of nine never jumps.
4. The verdict is written as a sentence with the number in tabular figures.
5. "Check rates for Areca Palm Villa" names your stay.

## 7. Photography (their own: Lovable asset copies of hopetownmarina.com, and Wix thumbnails seen verbatim on /abacos-bahamas-resort)
| image | native | where | shown max |
|---|---|---|---|
| a.jpg harbour aerial with lighthouse | 1921x1082 | fixed half, phone hero | 720x900 cover (height 900 < 1082) |
| j.jpg pink cottage | 1920x1080 | fixed half for stays | 720x900 |
| g.jpg bar | 2250x3000 | fixed half for Bridget's | 720x900 |
| i.jpg Johnny's Cay dock | 1920x1080 | fixed half | 720x900 |
| b.jpg porch | 1920x1080 | getting here, contact | 720x900 |
| f.jpg cocktails | 1920x1080 | inline | 640x480 |
| nine stay thumbnails (static.wixstatic.com ... w_395,h_300) | 395x300 | tool grid, stays list | 395 (grid about 180) |

## 8. Self-review
- Screen 1 does the job for both visitors without scrolling on desktop: yes (switch, count, nine tiles, Check rates; or LOA, verdict, Book a slip). Phone: switch and count above the fold, grid partly, strip carries the button.
- A1 one idea (two ways in) yes; A2 Fraunces + Newsreader; A3 scale set; A4 display tracking -0.04em; A5 measure 36rem; A6 tabular for counts, sizes, LOA, phones; A7 contrast muted 6.1:1, check dimmed tile text stays >= 4.5 by dimming the photo only (care); A8 one accent harbour blue; red only as a rule; A9 8 px scale; A10 left edge of the column aligned; A11 thumbnails at or below 395; A12 no overlays; A13 photo credit in footer; A14 44 px targets (segments 48); A15 focus ring; A16 reduced motion; A17 grid fixed size, verdict min-height; A18 phone: no fixed half, native scroll; A19 facts from the brief and the resort page; no em dashes; A20 contact with working numbers only.
- Distinct: the only site in the repo that splits its booking tool by how you arrive.

## 9. Changes after the critic (round 1)
- The selected stay appears as a paper card (its own 395x300 photo at native size, name, guests, ft², m²) on the fixed half, above the concept label; on phone inline above the Check rates button.
- Tiles use short names (King Room, Double Room, Garden, 2-bed, Hummingbird...) with "Villa · up to 6" so nothing wraps to three lines.
- Section 2 is a static comparison of all nine (thumb, guests, ft², m²); the ferry sentence restored; "three room types and six villas".
- The boat panel renders once per page id (hero/boat/m prefixes); both tab panels stay in the DOM with hidden.
- Harbour and docks share a.jpg: the photo now pans and zooms to the docks instead of crossfading to itself.
- Phone: 4:3 harbour photo, a scrolling nav row, tab descriptions dropped under 400 px.
- Marina section on the field colour; Getting here uses the aerial; honest helper line under Check rates; Elbow Reef Classic wording from the brief; stay and marina pages show only their own strip button.
