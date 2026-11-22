# Bahamas Choice Real Estate: design.md (job spec approved 2026-11-22)

## 1. The idea in one paragraph
The page is a window and a desk. The left half (desktop) is a sticky window that never scrolls away; the right half is the family office's desk. On screen 1 the window holds a real chart of The Bahamas (Natural Earth outlines, every island group they serve), and the desk holds the finder: Buy or Rent, type, price band, and the live matches as photo cards, each with "Ask for a viewing" going to a named person by call, WhatsApp or email with the listing number written in. Tap Long Island on the chart and the cards re-deal to the lot at Stella Maris; hover a card and the window becomes that listing's photograph. An island with nothing listed today is not a dead end: the empty state turns the search itself into a brief. Further down, the window keeps doing what worked in the previous version: it walks the buyer room by room through 5 Bayview Drive, then shows the islands, the end-to-end promise, the team and their words.

## 2. Inspirations
- **The Agency (theagencyre.com):** the region selector is the entry point, not a filter buried in a sidebar. We take: the island chart IS the search.
- **Knight Frank:** the human relationship framed as the product; calm lanes for services. We take: every result card names the person who answers, and "end to end" becomes a numbered walk from viewing to keys.
- **Aesop store locator:** a quiet monochrome map with one accent state and the list beside it, both driven by the same selection. We take: ink outlines on a pale field, one teal state, counts set as small numerals.
- Previous version (ours): the fixed split, the room-by-room walk-through, the typographic rows, the brief builder. Kept and elevated.

## 3. Tokens
**Type:** Newsreader variable (opsz 6 to 72, wght, italic), self-hosted (already in src/fonts). One family, a refined bookish serif that suits a family brokerage that sells by listening; numerals set tabular lining. The "clear sans" in the spec is served by Newsreader's small-opsz text cut at 16 px for UI labels and controls (no second family: T02 text-led, kept from the approved previous build that Balazs asked to keep). Scale (rem at 16):
| step | size | leading | tracking | use |
|---|---|---|---|---|
| xs | 13 | 1.4 | 0.01em | map labels, legal |
| s | 16 | 1.45 | 0 | controls, captions, card facts |
| m | 19 | 1.5 | 0 | body |
| l | 24 | 1.3 | -0.01em | card titles, lede, prices |
| xl | 34 | 1.15 | -0.015em | quotes, chapter lines, phone h2 |
| 2xl | 48 | 1.06 | -0.02em | h2 |
| 3xl | clamp(40, 4vw, 62) | 1.02 | -0.028em | h1 |

**Colour (OKLCH):**
- ground `oklch(93.5% 0.014 85)` (limestone), surface `oklch(96.5% 0.01 85)` (cards, inputs), ground-2 `oklch(90% 0.02 85)` (image placeholders)
- ink `oklch(21% 0.006 85)`; muted `oklch(44% 0.017 85)` (6.9:1 on ground); line `oklch(84% 0.025 85)`
- accent `oklch(49% 0.07 200)` (deep shallows teal), accent-deep `oklch(43% 0.065 200)`, accent-ink `oklch(98% 0.005 85)`. Reserved for: primary buttons, the selected island, the live count.
- field `oklch(91.5% 0.017 215)` (pale shallows): the chart's sea and the end-to-end section only.
- sand `oklch(70% 0.07 80)`: underlines only.

**Space:** 4/8 scale 4, 8, 16, 24, 32, 48, 72, 112. Column padding clamp(24px, 5.5vw, 88px). Section padding 112 desktop, 72 phone. Text measure 34em body, h2 16ch. Desktop grid: 50/50 split; column content max ~556 px at 1440.
**Shape:** radius 2 px everywhere (buttons, cards, inputs, chips are 999 pill only for filter chips); cards: 1 px line border, no shadow; framed photos in the window get the single soft shadow (0 30 60 -30 ink/35%).
**Motion:** ease `cubic-bezier(.22,.61,.36,1)`, in-out `cubic-bezier(.65,0,.35,1)`. Feedback 180 ms; reveals 420 ms; window crossfade 1.1 s, Ken-Burns settle 2.4 s. Result cards on change: exit opacity 0 + y 8 in 150 ms, enter opacity 0 to 1 + y 12 to 0 in 320 ms, stagger 50 ms (Motion AnimatePresence popLayout, layout animations on transform only). Island fill transition 220 ms. Count ticks with tabular nums (no layout shift). Reduced motion: no transforms, opacity swaps only, no Ken Burns, Lenis off.

## 4. Screens
**1. Find (desktop 1440x900).** Left window 720x900: the chart on the field colour, islands in surface fill with ink 0.8 px stroke, every group label in xs italic; groups with matches show a teal numeral; selected group fills accent with label in ink; tapping the sea or "Any island" clears. Caption bottom-left: "Tap an island. Outlines: Natural Earth." Right column: mast (wordmark "Bahamas Choice", phone 242 677 3868, nav list in small caps right), H1 "Find your place on any island. One family office answers." (2 lines), then the finder block: segmented Buy | Rent (44 px), row of two selects Type and Price, Island select (synced with the chart, keyboard path), live line "3 listings on New Providence" (count in accent), then the result track: cards 232 wide (photo 4:5 at 232x290 from 800x1066 native), price l, facts s, place s muted, then "Ask for a viewing" (text button opening a 3-way contact: Call, WhatsApp, Email). Primary action: "Ask for a viewing" on each card; header secondary "Send your brief". **Phone 390x844:** mast, H1 at 34 px, Buy|Rent, the chart inline (358 wide, height 300, contain), Type/Price selects in one row, count line, the card track (78% width cards, snap) starts at ~800 px: the first card's photo top is visible above the fold.
**2. All listings.** Purpose: compare everything. Window: hovered row photo, else the villa courtyard (IMG_0143). Column: h2 "Four listings today, and the latest sale." Filter chips All / For sale / To rent / Land (shared with the finder's Buy/Rent), view toggle Grid | List. Grid: 2 columns of cards (photo 4:5), List: the kept typographic rows (88x110 thumbs, price right). Every item opens its property page. Phone: grid 1 column, list rows 72x90.
**2b. Walk-through (kept).** 5 Bayview Drive room by room: window crossfades gate, patio, living room, kitchen, bath; sticky head with price and "Ask for a viewing". Phone: snap strip of 4:5 photos with lines.
**3. Islands and developments.** Window: Sunset.jpg cover. Column: h2 "Sixteen island groups, and the developments we present." Two-column accordion of island groups (settlements they list, plus "Show listings here" which sets the finder and scrolls to top, and "Start a brief for this island"); below, the developments index (11 names) as a typographic list, each "Ask about <name>" prefilling the brief. Phone: one column.
**4. End to end.** Field-colour ground for this section in the column. Window: Harbour Island photo framed at 600x450 (native 960x720). h2 "From the first viewing to the keys, and after." Four numbered steps on a hairline that draws as it enters: Listen, Find and view, Offer to closing, Beyond the keys. Then "On request" list: banking and legal information, government requirements, moving and relocation, recommended appraisers, surveyors, inspectors, contractors, landscapers and home decor firms. CTA "Send your brief".
**5. The team.** Window: welcome-photo framed 640x360 (native 960x541). h2 "Call the person, not a switchboard." Rows: name, role, direct line (tel), Lana's email. Phone: rows stack name above number.
**6. Client words, then contact.** Window: villa courtyard, crop 30% 50%. Jennifer Brice quote large (xl), the family quote (m). Then h2 "Send your brief." and the kept brief builder (Buy, Sell, Rent, Invest tabs; live summary; email to sales@). Prefilled from the finder when the visitor came from an empty search. Then footer (address, phone, email, socials, BREA licence 480, MLS disclaimer, concept credit). Phone: same order.
The facts strip (ink bar, phone + "Send your brief") stays fixed across the column after screen 1, hidden over the brief.

## 5. The core tool: interaction spec
- **Inputs and defaults:** mode Buy (Buy | Rent); type Any (Buy: Any, Home or condo, Land, Commercial; Rent: Any, Home or condo, Commercial); price Any (Buy: Under $250,000 / $250,000 to $750,000 / Over $750,000; Rent: Under $3,000 / $3,000 to $6,000 / Over $6,000 a month); island Any (16 groups). Listing data: the 4 active MLS listings (verified 2026-11-22 on /active/).
- **Match:** status (Buy = For sale, Rent = To rent) AND type AND numeric price in band AND island. Island counts on the chart use every filter except island.
- **States:** filled (cards); empty: "Nothing on {island} matches today." plus "Send this search" (primary) which writes the search into the brief and scrolls to it, and "Clear filters"; never a loading state (static data, instant).
- **Animation:** cards AnimatePresence popLayout, stagger 50 ms, transform/opacity only; chart fill 220 ms; count numeral swaps with a 150 ms y-slide. Hover/focus a card on desktop sets the window to that photo (cover), leaving restores the chart.
- **Contact sheet:** "Ask for a viewing" toggles an inline row under the card's facts (not a modal): Call Lana (tel:+12423577698), WhatsApp (wa.me/12423577698 with text "Hello Lana, I would like to view {title}, {area} (MLS #{id}, {price})."), Email (mailto sales@ cc lana@bahamaschoice.com, subject "Viewing request: {title} (#{id})"). Escape or second tap closes. Line above the buttons: "Lana Munnings-Basalyga, Principal Broker, answers viewings."
- **Keyboard/touch:** all controls native buttons/selects; chart is pointer-only (aria-hidden) with the Island select as its keyboard twin; chart click resolves to the nearest group centroid within 44 px (so Rum Cay and Ragged Island are tappable on a phone); card track scrolls with touch and with shift-wheel, snap start.

## 6. Signature details
1. The chart is real geography (Natural Earth 10 m), inked like a pilot chart, with the count of live matches set beside each island in teal tabular numerals.
2. Hovering a card turns the whole left window into that listing's photograph; leaving brings the chart back with a 1.1 s crossfade.
3. The empty island is a conversation: "Nothing on Exuma matches today" becomes a brief already written ("Buy land on Great Exuma and Little Exuma, under $250,000").
4. Every card names the person who answers, and WhatsApp opens with the MLS number typed.
5. The walk-through of 5 Bayview Drive, kept: the window changes room by room as the chapters scroll.
6. The end-to-end steps hang on a hairline that draws down as the section enters.

## 7. Photography plan (all their own, verbatim URLs; one warm limestone grade: none applied, their photos are already daylight-white)
| image | native | where | crop | alt |
|---|---|---|---|---|
| pix.idxre.com/pix/BSBREA/main/0/68204_0.jpg (+ _1, _6, _9, _15) | 800x1066 | cards 232x290, window cover 720x900 (0.9x), walk-through | centre | gate, patio, living room, kitchen, bath at 5 Bayview Drive |
| .../66392_0.jpg | 800x1066 | rental card, window | centre | white picket gate, Bayview Drive Unit 5 |
| .../68126_0.jpg, _1 | 800x1066 | land card, window | centre | level green land with mature trees |
| .../67126_0.jpg, _1 | 800x533 | land card (cover in 4:5 at 232 wide: needs 435 px tall source width 653, have 800x533 so 290 tall shows 0.54x: fine), window FRAMED at 600x400 | centre | coppice and palm with sea beyond, Stella Maris |
| wp-content/uploads/2023/09/IMG_0143.jpg | 2048x1324 | window for screens 2 and 6 | 58% 50% | white villa around a long pool courtyard |
| 2024/05/Sunset.jpg | 1600x1200 | window, islands | centre | small cay at sunset |
| 2024/05/Home-Page-Imgae-Harbour-Island.jpeg | 960x720 | window framed 600x450, end to end | n/a | terrace and pool over turquoise water, Harbour Island |
| 2026/06/welcome-photo.jpg | 960x541 | window framed 640x360, team | n/a | Lana and the team at the office |
Never wider than native: the window cover for 67126 is framed instead; all img tags carry native width/height; tinted ground-2 placeholders.

## 8. Self-review (before coding)
- **Screen 1 sells the product and the job can be done without scrolling (desktop):** yes: chart, filters and four photo cards with "Ask for a viewing" are all in 900 px. Phone: chart and filters in view, first card begins at the fold; acceptable because the count line already states the result and the track is one thumb-flick away. Weak point fixed: phone chart capped at 300 px tall.
- A1 no badges (no "#1"); A2 no "Phone:" labels; A3 italic only for captions, map labels and quote attributions; A4 no mono; A5 tokens above, components use them; A6 the product = their listing photos on screen 1; A7 the finder (chart + cards) is the largest thing on screen 1; A8 grouping by space, hairlines only between rows; A9 headlines specific (islands, Yamacraw Hill office, 5 Bayview Drive); A10 one primary per screen (Ask for a viewing / Send your brief); A11 accent only on primary, selection, count; A12 no icons; A13 no ornaments, one shadow; A14 radii 2 px flat, no nesting issue; A15 muted 6.9:1, captions on photos avoided (window captions sit on ground for framed layers; cover layers get no text); A16 balance/pretty, check H1 at 390; A17 count numeral baseline-aligned with the line; A18 tabular on prices, phones, counts; A19 ground-2 placeholders, sized images; A20 motion explains: cards re-deal on filter, window shows what you hover, steps line draws once.
- **Unmistakably this business:** their listings, their islands list, their four people with direct lines, their clients' words, Yamacraw Hill Road. No other site in the repo uses the fixed split with a geographic chart as the search.
- **Assumptions to confirm (also in status):** Lana answers viewing requests for every listing (agents per listing not published); Lana's 242 357 7698 is on WhatsApp; step wording paraphrases "discovering listings to viewings, closing and beyond"; developments are not tied to islands on the page because their site does not say which island each sits on.
