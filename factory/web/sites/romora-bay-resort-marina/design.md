# Romora Bay Resort & Marina: design.md
Spec: factory/jobspecs/romora-bay-resort-marina.md (approved 2026-11-22). Previous version: gen 2, three pages (home with By sea / By air switch, marina page with a length and power checker, stay page with a room selector). This build folds all three into one page, because the spec's six screens are one journey and both jobs start on screen 1.

## 1. The idea in one paragraph
You land on the real drone photograph of the harbour and are asked one question: "I'm arriving by boat" or "I'm staying with you". The answer changes the photograph (the marina aerial comes forward for boats, the resort drone shot for rooms) and the panel beside it becomes the right tool. Captains enter their length and power and see, live, "Within the 190 ft the marina welcomes" with the Dockmaster's name beside the request button. Couples pick dates and one of the three room types and go straight to the booking engine, warned if their dates fall in the seasonal closure. Below, the page proves both promises in numbers, rooms and days on the island.

## 2. Inspirations
- **Aman (aman.com):** the reservation bar sits inside the photograph, on paper, with quiet serif headings. I take the paper panel set into the full-bleed photo.
- **Edition Hotels / Rosewood booking widgets:** dates and room type in one compact strip with the room thumbnail updating. I take the three-room strip inside the By air tool.
- **Marinalife and North Sails spec pages:** specs set as a clean two-column table with tabular numbers. I take the marina-in-numbers table, set like a yacht spec sheet but in the resort's voice.
- Playbooks: marina (arrival is the product) and resort (rooms side by side).

## 3. Tokens
**Type.** Bodoni Moda (variable, opsz, self-hosted) for display, kept from the previous version: high-contrast Didone reads yacht-club polish and Harbour Island fashion. Outfit (variable) for text and UI: round, clean, barefoot. Numbers: Outfit tabular-nums everywhere a spec or date appears.
| step | desktop / phone | leading | tracking | face |
|---|---|---|---|---|
| cap | 13 / 13 | 1.4 | 0.01em | Outfit 500 |
| body | 17 / 16 | 1.55 | 0 | Outfit 350 |
| lead | 20 / 18 | 1.45 | 0 | Outfit 350 |
| h3 | 30 / 26 | 1.1 | -0.01em | Bodoni Moda 500 opsz 28 |
| h2 | 56 / 38 | 1.0 | -0.02em | Bodoni Moda 450 opsz 96 |
| hero | 72 / 44 | 0.98 | -0.025em | Bodoni Moda 450 opsz 96 |
Italic Bodoni only for the second line of section headings ("a caption voice"), used consistently.

**Colour (OKLCH, written as sRGB in CSS for tooling).**
- ground paper `oklch(0.975 0.01 60)`; surface `oklch(0.99 0.005 60)`
- ink `oklch(0.25 0.03 265)`; muted `oklch(0.47 0.025 265)` (≥ 5:1 on paper)
- line `oklch(0.25 0.03 265 / 0.12)`
- accent harbour blue `oklch(0.43 0.07 205)`: ONLY primary actions ("Request this slip", "Check availability"), the active switch side and the live fit result.
- field pink sand `oklch(0.90 0.035 35)`: the room section ground, and the fit bar track. Never orange or red.
- deep harbour `oklch(0.30 0.05 210)` for the one dark section (Getting here), with paper text.

**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 136. Section padding 136 desktop, 80 phone. 12-column grid, gutter clamp(20px, 4vw, 64px), gap clamp(16px, 2vw, 32px), max 1440. Measure 60ch.

**Shape.** Panel radius 20, inner fields 10 (panel padding 10 on the switch), photos radius 0 when full-bleed, 12 when inset. Buttons 999 pill, 52 px. One shadow: the hero panel `0 30px 80px -40px rgb(30 35 49 / .45)`.

**Motion.** Ease `cubic-bezier(.16,1,.3,1)`. 160 ms feedback, 300 ms panel content swap (opacity + 8 px), 900 ms photo crossfade with 1.04 to 1 scale, fit bar width by transform scaleX 400 ms. Hero entrance: panel rises 16 px 700 ms after a 200 ms photo fade. Reduced motion: instant swaps, no scale.

## 4. Screens
**1. Arrival (hero).** Desktop: nav 72 px (logo svg + wordmark left, links Marina / Rooms / A day here / Getting here, phone 833.717.6499 right; not sticky). Full-bleed photo, height calc(100svh - 72px), min 720. Paper panel 540 px wide, left 64 px, bottom 48 px, top-aligned within. Panel: tiny line "Harbour Island, Eleuthera"; h1 "One dock for the yacht and the room."; the two-way switch (segmented, 2 options); the active tool. Photo: By sea = marina-aerial (slips), By air = hero-drone. Phone: photo 52svh on top, panel follows full width with -32 px overlap, rounded top.
**2. The marina in numbers.** Desktop: cols 1-5 h2 "Forty-plus slips, a port of entry, and a dockmaster who answers." + people block (Rodney Diegue, Dockmaster; Beriska Moss, Marina Manager; marina@romorabay.com; 242.470.1520) + Marina Map PDF link + badges line. Cols 7-12 the spec table (12 rows). Above it, marina-dock-sailboat photo full width 1440 x 560. Phone: photo, h2, table, people.
**3. The rooms.** Pink sand field. h2 "Seventeen rooms, three ways to stay." Three columns side by side: photo (3:2, thumbnails to switch among 4), name, 4 features, "Check availability". Seasonal closure line under. Phone: horizontal snap carousel, 86% width each.
**4. A day here.** Desktop: Sip Sip deck photo cols 1-7 with text cols 9-12 (lunch hours); then Upstairs patio + kayaking pair with text; pickleball line, no dated event. Phone stacks.
**5. Getting here.** Deep harbour field, two columns: By sea (port of entry, clear customs and immigration at the dock, call or email the marina, Marina Map), By air (North Eleuthera airport, short taxi to the North Eleuthera dock, about ten minutes by water taxi, as on their Getting Here page). Harbour view photo between.
**6. Contact.** Paper. Reservations 833.717.6499 large, marina email, marina phone, Harbour Island, Eleuthera; two buttons (Check availability, Request a slip). Footer with credits.

## 5. Core tool
**Switch:** radiogroup "How are you arriving?" options By boat / By air; default By boat (the rarer and higher-value job leads; air one tap away). Arrow keys move.
**By boat inputs:** LOA number + range 20 to 240 ft, default 80; power chips from the published list: 30 amp, 50 amp, 110V single phase, 220V 3 phase, 408V 3 phase (as published), Not sure; clearing in from abroad: Yes / No, default Yes; arrival and departure dates (optional).
- Results: LOA ≤ 190: "80 ft: within the 190 ft the marina welcomes." (accent tick); > 190: "Over the published 190 ft: ask the Dockmaster." (muted). Power: "50 amp is on the marina's published power list." / Not sure: "The Dockmaster will match your power." Clearing in yes: "Official port of entry: customs and immigration at the dock."
- Fit bar: a track 0 to 240 ft with a mark at 190; the filled part scaleX(LOA/240), accent when fits, muted when over. No boat drawing.
- Hand-off: primary "Request this slip" = mailto:marina@romorabay.com, subject "Slip request, {LOA} ft, {arrival}", body with LOA, power, clearing in, dates, boat name blank. Secondary link "Slip reservations page" (/marina/reservations) and "Marina Map (PDF)". Beside the button: "Answered by Rodney Diegue, Dockmaster".
**By air inputs:** arrival date (default empty), nights stepper 1 to 21 default 4; room strip: 3 options with thumbnail and name, default King with Waterfront View.
- Closure rule: if any night falls between 17 Aug and 12 Nov (inclusive) of that year: warning line "The resort is closed for the season from 17 August to 12 November. Choose dates outside it." and the button reads "See open dates".
- Result line: "{nights} nights from {date}, {room}." Primary "Check availability" opens the officialbookings engine in a new tab. Under it: "From North Eleuthera airport: a short taxi to the dock, then about ten minutes by water taxi."
**States:** empty (no date: result line says "Pick a date to check"), filled, warning; there is no loading state (hand-offs are links).
**Animation:** panel body swaps with AnimatePresence (opacity + y 8, 300 ms, mode popLayout), photo crossfade 900 ms; fit bar transform 400 ms; numbers tabular so nothing jumps.

## 6. Signature details
1. The photograph is the switch: the aerial changes with your answer.
2. The fit bar's 190 ft mark, labelled, with your length sliding to it in tabular numbers.
3. The Dockmaster's name printed beside "Request this slip".
4. Room thumbnails in the By air strip use the real room photos and the chosen one lifts.
5. The closure warning appears inline under the dates, in pink sand, before you ever reach the engine.

## 7. Photography (romorabay.com/assets, their own site)
Native sizes could not be measured in the sandbox (outside images do not load; the scrape gives no sizes). Width/height attributes below are the aspect ratios used and an assumed minimum; to verify against the files.
- hero-drone-CEdSqdKD.jpg: hero By air, full bleed, focus centre. alt "Romora Bay Resort and Marina from the air, Harbour Island".
- marina-aerial-BLMR27zt.jpg: hero By boat. alt "The slips of Romora Bay Marina from above".
- marina-dock-sailboat-DrtEkZ-S.jpg: marina section band. 
- room1-1/3/5/6, room2-1/2/5/6, room3-6/2/3/9: rooms, 3:2.
- sipsip-deck-dining, upstairs-patio-3, kayaking (webp), pickleball-action, harbour-view (png).
- Logo: romora-logo-s-wcG07O.svg in the nav.
Grade: as delivered; the paper ground and pink sand field warm the set.

## 8. Self-review
- Screen 1 sells both products and either job can be finished without scrolling on desktop (panel inside the first 900 px). Phone: switch visible at about 470 px, tool follows.
- A1 no badges (credentials are a text line with source names). A2 no "Phone:" labels. A3 italic only the heading second lines, consistently. A4 no mono. A5 tokens. A6 real photos of the marina and rooms. A7 panel is the largest UI. A8 spacing groups. A9 specific headlines (190 ft, 40+ slips, seventeen rooms). A10 one accent primary per screen. A11 accent reserved. A12 no icon set except a tick drawn in CSS. A13 no ornaments, no dark overlay on the hero. A14 20 / 10 radii. A15 inspect checks. A16 balance/pretty. A17 tick optically aligned. A18 tabular for LOA, dates, phones. A19 photo boxes tinted with aspect-ratio. A20 motion explains the switch.
- Gen-1 clones removed: no key-information band, no sticky blurred header, no Reveal fade-up, no uppercase eyebrows, Google Fonts replaced by self-hosted files.
- Unmistakably Romora: the shared dock is the idea; no other marina in the repo has a two-way arrival switch in the photo.
