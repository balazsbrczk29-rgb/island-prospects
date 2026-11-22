# Hideaways at Palm Bay: design.md (job spec approved 2026-11-22, builds on the gen-2 "sand or hill" version)

## 1. The idea in one paragraph
Hideaways is two places on one bay: cottages and villas on the sand of Jolly Hall Bay, and the Island Time villas on the hill above it. Screen 1 asks the only question a guest really has, in two giant lowercase words over two real photographs: **sand or hill?** The answer is given on the same screen. Tapping a half (or the Sand/Hill switch) fills the planner beside it: the room types on that side that have beds for your party, each with a thumbnail and its beds, baths and kitchen in one line; pick one and that half's photograph eases into the room itself. Add your dates and where you are from, and the planner shows the one offer code that is open for those dates (checked against minimum nights, travel window and blackouts) with a copy button, and Check availability opens their Cloudbeds engine with the dates filled in. Choice, room, code and booking button: one screen.

## 2. Inspirations
- **Aman (aman.com):** the booking controls live inside the opening composition, quiet and typographic, never a floating widget. We take: the planner as a calm paper panel that is part of the hero grid, not a bar over a photo.
- **Kinfolk / Cereal magazine spreads:** huge lowercase serif words set against modest, framed photographs with generous margins. We take: "sand" and "hill" at monumental size, photos framed at their true size, captions in small text serif.
- **Airbnb search results:** results update in place as filters change, the chosen card lifts. We take: the room rows re-flow with a short stagger when side or party changes, the selected row gets an ink rule and the photo swaps.
- **Apple product compare:** one row per attribute, aligned. We take: the inline comparison table toggle on the rooms screen.
- Playbook references: hospitality-stay (resort): booking strip on screen 1, rooms compared, policies in plain words.

## 3. Tokens
**Type.** Fraunces variable (display, opsz 144, SOFT 50, weight 350; soft monumental serif that reads easygoing, not luxury-stiff) + Source Serif 4 variable (text and UI, optical sizing on; a readable text serif keeps the whole site in one warm voice). Both self-hosted woff2 (from @fontsource-variable, already in src/fonts). Monospace only for promo codes (ui-monospace).
Scale (px, desktop / phone):
| step | size | leading | tracking | use |
|---|---|---|---|---|
| caption | 13 / 13 | 1.35 | 0 | photo captions, fine print |
| small | 15 / 15 | 1.45 | 0 | specs, labels, nav |
| body | 18 / 17 | 1.5 | 0 | paragraphs, inputs |
| h3 | 24 to 32 / 22 | 1.15 | -0.01em | room names, offer titles |
| h2 | 44 to 88 / 44 | 0.98 | -0.03em | section heads |
| hero | 168 (min(11.6vw, 19vh)) / 19vw | 0.8 | -0.035em | "sand", "hill" |

**Colour (OKLCH).**
- ground `oklch(96.6% 0.012 92)` pale sand paper
- surface `oklch(98.6% 0.006 95)` planner panel, inputs, offer cards
- ground-2 `oklch(93% 0.018 90)` contact band, image placeholders
- ink `oklch(26.8% 0.036 204)` harbour-deep ink
- muted `oklch(44.8% 0.025 200)` (7.1:1 on ground)
- line `oklch(86% 0.025 83)`
- accent `oklch(48.6% 0.073 204)` harbour teal, ONLY primary buttons, the selected-room rule and "Copy code"; hover `oklch(42.4% 0.063 204)`
- field 1, aqua `oklch(88.8% 0.039 182)` Exuma shallows, the offers section only
- field 2, evening `oklch(26.8% 0.036 204)` Splash section only, text `oklch(96.2% 0.007 165)`, muted `oklch(79.7% 0.029 185)`

**Space.** 4/8 scale: 4, 8, 16, 24, 32, 48, 64, 96, 144. Section padding 144 desktop / 88 phone. Gutter clamp(20px, 4.4vw, 64px). Desktop hero grid: 12 columns, 24 px gap; content max 1680. Text measure max 34em (about 64ch).

**Shape.** Radii: photos 2 px, controls 4 px, planner panel 6 px (inner controls 4 = 6 minus 2), pills 999 px. Borders 1 px line. Shadows: once only, the phone dock and desktop corner button `0 10px 30px -12px oklch(26.8% 0.036 204 / .45)`.

**Motion.** Easing `cubic-bezier(.22,.61,.24,1)` (out), `cubic-bezier(.65,0,.35,1)` for the photo crossfade. Feedback 180 ms (buttons, pills, stepper), reveals 420 to 700 ms, hero entrance 1.1 s (words rise 28 px, frames unmask bottom to top, stagger 140 ms). Room rows: layout animation 320 ms, enter stagger 40 ms, y 8 px. Photo swap: crossfade 600 ms with 1.04 to 1 scale settle. Track: scroll-linked. Reduced motion: no rise, no scale, instant swaps, track becomes the native swipe list.

## 4. Screens
### Screen 1: Sand or hill (the core tool)
- **Purpose:** choose your half, see the rooms that fit, get your code, check availability.
- **Desktop 1440x900:** header row 64 px (wordmark left; Rooms, Offers, Splash, Getting here, phone, Check availability right). Below, 12-column grid:
  - cols 1 to 8: H1 "sand *or* hill" across the 8 columns (sand left aligned, small italic "or" centred, hill right aligned) at 168 px. Under it two photo halves, cols 1 to 4 (sand, gallery3 1200x900) and 5 to 8 (hill, og image 1024x768), each about 446 x 400, frame height clamp(260px, 44vh, 420px). Caption under each: side name left, count right. Under both: one line, "Jolly Hall Bay, Elizabeth Harbour, George Town, Exuma. Fifteen minutes from the airport."
  - cols 9 to 12: the planner panel (surface colour, 6 px radius, 28 px padding), top aligned with the words' cap height, bottom with the captions. Content in order: "Plan your stay" (h3); Sand / Hill segmented switch (mirrors the photos); Guests stepper (1 to 6); Arrive and Leave dates side by side; "I'm from" select; the result list; the code chip; the Check availability button (full width, accent).
- **Headline:** "sand or hill" (sr-only completion: Hideaways at Palm Bay, beach cottages and hillside villas on Elizabeth Harbour, George Town, Exuma).
- **Primary action:** Check availability (Cloudbeds, dates when set). Secondary: Call +1 242-336-2787 in the header.
- **Phone 390x844:** header 56 (wordmark, Book). Words "sand or hill" on one line at 19vw. Two photos side by side, square crops (175 x 175), captions under. Then the planner, full width, no panel chrome (ground colour, a top rule): Guests stepper + I'm from on one row, dates row, rooms list, code, Check availability. The planner starts at about y 430, so the choice, guests and dates are visible on screen 1; rooms list just below; the dock carries Check availability once the hero leaves.

### Screen 2: The rooms compared
- **Purpose:** browse all eight in full and compare.
- **Desktop:** pinned sideways track (kept): intro frame "Five on the ocean side. Three on the hill.", eight room frames (photo 540 x 410 at native 580x440, then number, name, five spec lines View / Beds / Baths / Kitchen / Outside, "Check dates for this room"), final frame the booking form. Timeline at the top with Ocean Side 5 | progress | Hillside 3 (buttons). New: a "Side by side" toggle in the intro frame that swaps the track for the full comparison table inline (non-pinned), and back.
- **Phone:** intro, Ocean Side / Hillside pills, native swipe cards at 84vw, "Compare side by side" link to stay.html, booking form.

### Screen 3: The harbour
- Panorama (getting-here-bg 1920x674) full-bleed at max 1440 x 505, slow horizontal drift (3%). Two-column text: "A private beach on Elizabeth Harbour." and the paragraph (white sand, Stocking Island across, free water toys, pool all year, sunset from your patio; housekeeping, groceries, shuttle, massage). Phone: crop 62vw tall, one column.

### Screen 4: Which offer is yours (aqua field)
- Kept finder: pills for U.S. or Canada / The Bahamas / I fly my own plane / Europe / Latin America; only offers open for booking today; each with code copy button, stay, book by, travel, blackouts. Shares state with the hero "I'm from" (choosing in one sets the other). U.S. or Canada honestly shows none open today, with the email line. Phone: one column.

### Screen 5: Splash! Bar & Grill (evening field)
- Kept: bar photo 846x476 at max 760 left, text right: lede, hours table (tabular), drinks in display italic, reservation numbers 242-524-6304 / 242-465-0239. Phone: stacked.

### Screen 6: Around the harbour and getting here
- Kept: distances as a typographic list (Jolly Hall 0.29 mi to Mystery Cave 2.03 mi), Stocking Island photo (1280x853 at max 640, captioned as Stocking Island), tour desk line. Then "Fifteen minutes from Exuma International." with gateways in display type and airlines, taxi, rental, pilots link.

### Screen 7: Contact
- Kept: "Ask about your dates.", address, phone in display size, email, socials; enquiry form (dates, guests, sand or hill, name, message) prefilled from the hero planner's state. Footer: wordmark, Compare all rooms, Offers, Splash, Contact, photo credit.

## 5. The core tool: interaction spec
- **Inputs and defaults:** side = none; guests = 2 (stepper 1 to 6, buttons 44 px, value tabular); arrive = empty, leave = empty (min today; leave min arrive + 1); who = none ("Where do you live?").
- **Capacity (derived from the listed beds; king, queen and queen sofa sleeper = 2, single = 1; an assumption to confirm):** cottage 1br ocean 4, cottage 1br garden 4, cottage 2br garden 4, villa 1br partial 4, villa 2br ocean 4, hill studio 2, hill 1br 2, hill 2br 4. Rows show "Beds for N".
- **States:**
  - Empty (no side): the list area shows two large buttons, "Sand: 5 cottages and villas on the beach" and "Hill: 3 Island Time villas", each choosing the side.
  - Side chosen: rows of rooms on that side with capacity >= guests (thumb 64x48, name, "Beds for N · baths · kitchen"). The first row is selected by default and the half's photo swaps to it. Header line "3 of 5 fit 4 guests".
  - Too many guests (5 or 6): "No single room sleeps N in its listed beds. Two rooms side by side work: tell us when you book." plus the email link; Check availability still works.
  - Hill with 3 to 4 guests: only the two-bedroom villa; line "The studio and one-bedroom villa sleep 2."
  - Offer: who chosen and no dates: shows codes open for booking today for that group, "add dates to check". Dates chosen: for each open code, check nights >= minimum, arrive and leave inside travel window, and no night inside a blackout range (where the offer has blackouts). Show the first one that passes as a code chip (copy, "Copied" for 1.6 s), plus "1 more in Offers" if more pass. If none pass, the reason: "FEEFREE needs 4 nights, you have 3." or "Your dates touch the Dec 19 to Jan 1 blackout." U.S. or Canada: "No air credit is open for U.S. and Canadian residents today. Booking direct gets the best available rate."
  - Dates invalid (leave <= arrive): leave clears.
- **Animation:** side change: rows exit to the left 8 px and fade 160 ms, new rows enter staggered 40 ms. Selecting a row: accent 2 px left rule slides (layoutId) to the row, the half's photo crossfades 600 ms to the room photo and its caption changes to the room name; the other half dims to 55 % opacity. Picking the other half reverses. Code chip: scale .98 press, text swap. Nights count ticks (tabular).
- **Keyboard and touch:** halves are buttons with aria-pressed; Sand/Hill switch is a radiogroup; rows are radio inputs styled as rows (arrow keys move); stepper buttons have aria-labels; results region aria-live polite. Touch targets 44 px minimum.
- **Hand-off:** Check availability opens `https://hotels.cloudbeds.com/reservation/QVagP2#checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=N` (hash parameters an assumption to confirm), new tab. Room "Check dates" links go to the same engine. Code copied to clipboard to paste in Cloudbeds' promo field. Enquiry form prefilled.
- **Formulas:** nights = (leave - arrive) / 86400000. Blackout overlap: any night d with arrive <= d < leave inside [from, to] inclusive.

## 6. Signature details
1. Picking a room crossfades its half's photograph into that room, and the caption under it becomes the room's name.
2. The nights count and "3 of 5 fit 4 guests" tick in tabular figures as you change dates and the stepper.
3. The promo code chip in a dashed "ticket" outline, monospace, with a quiet "Copied" swap; the blackout reason is written in plain words.
4. "or" in Fraunces italic with SOFT 100, small, between the two monumental words: the question in one breath.
5. The hero planner and the Offers finder share one "I'm from" state; the contact form arrives prefilled with your dates, guests and side.
6. The sideways room track's timeline doubles as Ocean Side / Hillside navigation.

## 7. Photography plan (all from hideawayspalmbay.com/wp-content/uploads/, one warm daylight grade, no filters)
| image | native | where | shown max | crop focus | alt |
|---|---|---|---|---|---|
| 2020/01/gallery3.jpg | 1200x900 | hero sand half | 446x420 | 50% 62% | Clear shallow water over white sand, a swing standing in the sea |
| 2023/11/hillside-2-bedroom-oceanview-img2.jpg | 1024x768 | hero hill half | 446x420 | 50% 0, scale 1.2 | Two-storey turquoise Island Time villas with balconies on the hill |
| eight room photos (2026/05, 2023/05) | 580x440 | hero swap (446x420 cover, below native), planner thumbs 64x48, track 540x410, table 132x100 | 540 | centre | per room in data.ts |
| 2020/01/getting-here-bg.jpg | 1920x674 | harbour panorama | 1440x505 | centre | Turquoise harbour water with moored boats, seen from above |
| 2020/01/splash-img-1.jpg | 846x476 | Splash | 760x428 | centre | The bar at Splash, blue posts, stools and a pool table |
| 2020/01/gallery5.jpg | 1280x853 | Stocking Island | 640x427 | centre | Dinghies off the beach at Stocking Island |
Every img carries its native width/height. Full-resolution originals to be requested at launch.

## 8. Self-review before coding
- **Screen 1 sells the product and completes the job without scrolling (desktop):** yes, choice, rooms that fit, code and Check availability are all above 900 px. Phone: choice, guests and dates above the fold, rooms and button just below, dock keeps Check availability in reach. Accepted.
- **Craft A1 to A20:**
  - A1 one idea: sand or hill. Satisfied.
  - A2 type pairing: Fraunces + Source Serif 4, no third face except mono codes. Satisfied.
  - A3 scale steps: 6 steps defined. Care: planner labels must use small (15), not invent 14.
  - A4 display tracking: -0.035em. Satisfied.
  - A5 measure: max 34em. Satisfied.
  - A6 tabular numbers: phone, nights, distances, hours, counts. Care: stepper value and counts get .num.
  - A7 contrast: muted 7.1:1, aqua field ink 11:1, evening muted on deep ~6.9:1. Satisfied.
  - A8 single accent: teal only on primary actions, selected rule, copy. Care: the Sand/Hill switch "on" state uses ink, not accent.
  - A9 spacing scale: 4/8 only. Care in the planner (gaps 16 and 24).
  - A10 alignment: planner top aligns with the words, bottom with captions. Care.
  - A11 photos at or below native: all set. Hero room swap at 446 wide from 580 native: fine.
  - A12 no dark overlays: none. Satisfied.
  - A13 captions and credits: footer credit; Stocking Island captioned. Satisfied.
  - A14 tap targets 44 px: stepper, pills, rows. Care.
  - A15 focus states: global focus-visible. Satisfied.
  - A16 motion purposeful and reduced-motion: defined. Satisfied.
  - A17 no layout shift: photo frames and list area have fixed heights (list min-height for 5 rows on desktop). Care.
  - A18 phone smoothness: the pinned track is desktop only; phone uses native swipe; no heavy effects. Satisfied.
  - A19 copy specific and true, no em dashes: all sourced facts. Satisfied.
  - A20 strong close: contact with prefilled enquiry and Check availability. Satisfied.
- **Unmistakably this business:** the two halves of one bay as the opening question, their own photos, their codes and blackouts. No other site in the repo opens with a binary choice that is also the booking tool.
