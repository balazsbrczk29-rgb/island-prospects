# Bell Channel Club & Marina: design.md

## 1. The idea in one paragraph
"The pin on the inlet." The club has no photographs of its own and its old domain now serves a gambling site, so the truest proof that it is real is where it sits. Screen 1 is a live satellite map of the Bell Channel inlet at street scale (Esri World Imagery tiles, real place, credited), with a single sun-faded pin at 26.5147, -78.6368 where the canal meets the sea. Over the water on the left lies a chart-paper card: the club's name, one line on where it is, and "Who's asking?" with three answers (Owner or guest, Buying or renting, Visiting by boat). Each answer swaps in the two or three facts that visitor needs and one large Call (242) 373-2673 button, plus a link for directions to the gate. Nobody calls blind any more.

## 2. Inspirations
- **Apple Maps place card:** a card floating over a real map, the place pinned, the primary action as a big filled button. We take the card over the map and the single primary action.
- **Admiralty charts:** faded paper, hairline borders, coordinates in degrees and minutes, a scale bar. We take the paper card, the coordinate line, the scale bar and the north mark.
- **Aesop store pages:** quiet serif headline, short sentences, the address treated as the hero. We take the restraint and the address-first close.

## 3. Tokens
**Type.** Fraunces (display, 400, soft optical style, kept from our previous version; a quiet private-club serif) + Instrument Sans variable (text, 400 to 600; clean, a touch nautical in its narrow forms). Self-hosted.
| step | desktop / phone | leading | tracking | use |
|---|---|---|---|---|
| 13 | 13 / 13 | 1.4 | 0.02em | map credit, coordinates, captions |
| 16 | 16 / 16 | 1.55 | 0 | body, facts |
| 20 | 20 / 18 | 1.45 | 0 | ledes |
| 28 | 28 / 24 | 1.15 | -0.015em | h3, card answers |
| 48 | 48 / 34 | 1.05 | -0.025em | h2 |
| 64 | 64 / 38 | 1.0 | -0.03em | h1 |
Tabular figures on the phone, fax, coordinates.

**Colour (OKLCH, shipped as hex).**
- ground chart paper `oklch(0.95 0.018 90)` #f3eee2; surface `oklch(0.975 0.01 90)` #faf7ef
- ink sea ink `oklch(0.3 0.04 230)` #1f3441; muted `oklch(0.48 0.025 220)` #566871 (5.4:1 on ground); line `oklch(0.86 0.02 90)` #d8d1c1
- accent buoy green `oklch(0.47 0.07 165)` #2e6b57, Call buttons and the active answer only; hover #245746
- field sea ink #1f3441 for the contact close; text #f3eee2, muted #b7c3c8
- pin: paper ring with ink core (not accent).

**Space.** 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128; sections 128 desktop, 72 phone; 12 columns, gutter 24, margin clamp(20px, 4vw, 56px), max 1320; measure 60ch.

**Shape.** Card radius 4 (chart paper, nearly square), buttons radius 4, hairline 1 px borders, one shadow on the map card only `0 18px 40px -20px rgb(31 52 65 / .45)`.

**Motion.** Ease cubic-bezier(.22,1,.36,1). 180 ms for the answer tabs; the facts swap with a 240 ms crossfade + 6 px rise; the pin drops in once (400 ms) on load; map tiles fade in 300 ms as they load. Reduced motion: no rise, no drop.

## 4. Screens
### Screen 1: the inlet (hero)
- Desktop 1440x900: header 64 on paper (name left, links The club, The marina, Finding the gate; phone number right). Below, the map fills the full width, 836 tall, zoom 16 tiles, pin placed at 68% across and 52% down. Card cols 1 to 5 (480 wide) sitting 48 px from the top-left of the map, paper surface: coordinates line (13, tabular) "26°30.9′ N, 78°38.2′ W", h1 "Bell Channel Club & Marina" (64), lede "A private condominium club between the canal and the beach, on the inlet into Port Lucaya, Grand Bahama." Then "Who's asking?" segmented (3), the answer block (2 to 3 facts as a short list), Call (242) 373-2673 (filled accent, full width), "Directions to the gate" text link. Map credit bottom-right of the map, scale bar bottom-left over the map on a paper chip.
- Phone 390x844: header 56; card first on paper (no overlap) with coordinates, h1 38, lede, chooser, answer, Call; then the map 390x360 with the pin centred. The Call button stays in a sticky bottom bar after the card.

### Screen 2: between two waters (the club)
- h2 "Between the canal and the beach." Lede: gated condominiums and townhouses, on both waters, overlooking the inlet. Amenities as a two-column editorial list with hairlines (not cards): Heated pool; Tennis courts; Owners' library; Storage garages (a limited number); Reverse-osmosis water for every unit; The beach, kept by the owners' association. Two illustrative photographs (pool at night 1600x2000 portrait, beach morning 1920x1080), each captioned "Illustrative photograph".
- Phone: list, then photos stacked.

### Screen 3: the marina
- Commons photo of Port Lucaya Marina (3840x1920) full width at 1320 x 540 crop, caption "Port Lucaya Marina, at the head of the inlet the club overlooks" + credit. Then h2 "A private marina, for owners." and "Before you come in, call the office and ask:" four lines (is a slip available for your dates, your length and draft, where to tie up on arrival, gate access). Call button.

### Screen 4: finding the gate and the office (field)
- Sea-ink field. Left: h2 "Call the club office." Phone (48, tabular), fax, P.O. Box F-44053, Freeport, Grand Bahama; coordinates; Directions link (opens maps at the coordinates). Right: a second map at zoom 14 (wider: Lucaya and the inlet), 600x420 with the pin, credit below.
- Footer: concept credit line, image credits.

## 5. The core tool: interaction spec
- Input: "Who's asking?" radiogroup; default "Owner or guest" (the majority who look the club up). Arrow keys move, Space/Enter select. Each button 48 px tall.
- Answers (all from the spec):
  - Owner or guest: "Heated pool, tennis courts and the owners' library." / "Reverse-osmosis water to every unit; the beach is kept by the owners' association." / "For gate access, garages and guest arrangements, call the club office."
  - Buying or renting: "Condominiums and townhouses on both the canal and the beach, overlooking the inlet." / "Pool, tennis, a limited number of storage garages, and a private marina for owners." / "Units are sold and let privately by owners; the office can tell you who to talk to."
  - Visiting by boat: "The marina is private, for owners, and slips go to owners first." / "Call the office about availability before you come in through the cut." / "Slip count, depths and rates: ask the office."
- States: always a result; no loading. The answer block keeps a fixed min-height so the Call button never jumps.
- Animation: answer list crossfade + 6 px rise, 240 ms, interruptible (AnimatePresence mode wait with short exit 120 ms).
- Hand-off: Call tel:+12423732673; Directions https://www.google.com/maps/dir/?api=1&destination=26.5147,-78.6368 (a link, no embedded Google imagery).

## 6. Signature details
1. The pin drops once onto the real inlet, with a paper ring and a hairline leader to a tiny label "Bell Channel Club".
2. Coordinates in degrees and minutes, tabular, like a chart title.
3. A scale bar computed from the zoom and latitude (2.14 m per pixel at zoom 16), honest to the map.
4. The Call button's label changes with the answer ("Call the office about a slip", "Call about units", "Call the club office") while the number stays.
5. Chart hairlines and a faint compass north mark on the card.

## 7. Photography plan
| image | native | where | alt |
|---|---|---|---|
| Esri World Imagery tiles, z16 and z14, 256 px each | tiles at 1:1 | hero map, close map | (map region with aria-label) |
| Commons Port_Lucaya_Marina_-_panoramio.jpg (3840 thumb), qwesy qwesy, CC BY 3.0 | 3840x1920 | marina screen, shown 1320 wide | Yachts at Port Lucaya Marina |
| Lovable asset pool-night.jpg (illustrative) | 1600x2000 | club screen, 420 wide | A lit pool at night |
| Lovable asset beach-morning.jpg (illustrative) | 1920x1080 | club screen, 640 wide | An empty pale beach in the morning |
Tiles never scaled. Photos never shown wider than native.

## 8. Self-review
- Screen 1 sells the product (the real place, where it sits) and completes the job (choose who you are, call) without scrolling on desktop and phone.
- A1 none. A2 no "Phone:" labels (fax is labelled because it is a different kind of number). A3 no italics. A4 no mono; tabular figures. A5 tokens. A6 the real place via the map and Commons; illustrative photos labelled. A7 the card and map own screen 1. A8 grouping by spacing. A9 headlines specific. A10 one Call per screen. A11 accent only on Call and active answer. A12 no icons. A13 no gradients. A14 radius 4 everywhere. A15 card text on solid paper, map credit on a paper chip. A16 balance/pretty. A17 pin optically centred on its coordinate. A18 tabular numbers. A19 map has a paper ground while tiles load, photos sized. A20 motion only for the answer swap and pin drop.
- Care: tiles cannot load in the sandbox (verify geometry in code); the pin must sit on the exact coordinate at every size; the phone map must not cause overflow.
- Unmistakably this club: its coordinate, its inlet, its numbers. No other site in the repo opens on a satellite map.
