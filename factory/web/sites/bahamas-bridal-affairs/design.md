# Bahamas Bridal Affairs: design.md (2026-11-22, generation 2 job-spec build)

## 1. The idea in one paragraph
The couple lands on a sheet of warm, heavy paper and an invitation that is not printed yet. As they type their two names, pick a date, a venue from her published record and a guest count, the card sets itself line by line in engraved type: the names in copperplate script, the date spelled out the way stationers write it ("Saturday, the twenty-first of May, two thousand twenty-seven"), the venue, the guests. Underneath, the same facts read back as one plain sentence to say on the call, and two call buttons (Nassau, and the Florida number for the US and Canada) sit right under it. Screen 1 is the product (a Nassau and Paradise Island wedding planned by its owner, Dr. Bernadette Burrows, 26+ years, preferred planner with the Ocean Club and Atlantis) and the tool that starts it. Everything below proves the record: the places, the two magazine features, how planning runs, who she is, and the call.

## 2. Inspirations
- **Mr Boddington's / letterpress stationers (Smythson, Crane):** the card itself: deckled paper, centred engraved lines, script for names only, small caps for the venue line, generous leading. We take the hierarchy of a real invitation, line for line.
- **Aman.com:** the action lives inside the composition, not in a form below it; quiet type, wide margins, a single photograph doing the place.
- **Apple product pages:** one clear sentence per screen and a live readout that answers instantly (the card and sentence update on every keystroke, no submit step).

## 3. Tokens
**Type.** Display and card: Fraunces variable (opsz 9 to 144, wght 300 to 500), set at high optical size and weight 340 so it reads like an engraved Didone-adjacent roman, softer than Anna's Bodoni. Names on the card only: Pinyon Script 400 (copperplate, the stationer's script for names). Text: Manrope variable 400/500/600. Why: the business sells formal, luxury weddings to North American couples; Fraunces at high opsz has invitation-grade contrast, Manrope is a calm modern sans for the practical parts (phones, form labels).
Scale (px, desktop / phone):
- cap 13 / 13, Manrope 500, tracking 0.02em, leading 1.4
- body 17 / 16, Manrope 400, leading 1.6
- lead 21 / 18, Fraunces 340 opsz 24, leading 1.45
- h3 28 / 23, Fraunces 360 opsz 36, leading 1.2, tracking -0.01em
- h2 48 / 34, Fraunces 330 opsz 96, leading 1.08, tracking -0.025em
- hero 76 / 42, Fraunces 320 opsz 144, leading 1.02, tracking -0.035em
- card script names 64 / 44 Pinyon Script.

**Colour (OKLCH).**
- --ground oklch(97.6% 0.009 84) warm ivory paper
- --surface oklch(99.2% 0.004 84) the card stock
- --ink oklch(23% 0.018 62)
- --muted oklch(46% 0.02 62) (7.1:1 on ground)
- --line oklch(88% 0.014 75)
- --accent oklch(37% 0.085 258) letterpress ink blue, ONLY for primary call buttons, the active chip and focus ring
- --accent-ink oklch(98% 0.01 258) text on accent
- --field oklch(94.5% 0.022 38) blush tissue, used for the planner section and the planning steps strip
- --deep oklch(27% 0.035 255) the closing call section ground (one dark section, rest light)
- --gilt oklch(68% 0.07 78), only as the 1 px deckle rule on the card (decoration-free otherwise)

**Space.** 4/8 scale: 4 8 12 16 24 32 48 64 96 128. Section padding 128 desktop / 72 phone. 12-column grid, max 1280 content, 32 px gutter desktop, 20 px side gutter phone. Text measure max 62ch.
**Shape.** Card radius 2 (paper is square); buttons radius 6, chips radius 6, inner elements radius 4 (6 minus 2 px padding of focus ring). Borders 1 px --line. Shadows: one, the card: 0 1px 2px oklch(23% 0.02 62 / .06), 0 24px 60px -24px oklch(23% 0.02 62 / .22). Nowhere else.
**Motion.** Ease out cubic-bezier(.22,1,.36,1); ease in-out cubic-bezier(.65,0,.35,1). Feedback 180 ms; card line re-set 420 ms (opacity 0 to 1 and translateY 6 px to 0, per changed line only); reveals 600 ms with 70 ms stagger on the published rows; venue photo crossfade 700 ms. Reduced motion: no translate, crossfades become instant swaps.

## 4. Screens
### Screen 1: compose your date (desktop 1440x900)
- Top line (64 px): "Bahamas Bridal Affairs" in Fraunces 20 left; right: "Nassau 242-326-4029" and "US and Canada 1-954-892-6969" as quiet tabular links, plus "The weddings" link to weddings.html.
- Grid: columns 1 to 5 the copy and inputs; columns 6 to 12 the card on the paper.
- Left: hero h1 "Check your wedding date with Dr. Bernadette Burrows." Lead under it: "Weddings in Nassau and Paradise Island for more than 26 years, with the owner herself at your side. A preferred planner with the One&Only Ocean Club and Atlantis for many years."
- Inputs (stacked, underlined fields, 48 px tall): Your names (two fields side by side with "and" between), Date (native date input), Guests (number with minus/plus steppers, step 10, default 80, range 2 to 400), Venue idea (four choices as a segmented row: Ocean Club, Atlantis, Lyford Cay, Not sure yet). Help chips sit under the inputs as "We would like help with" toggles.
- Right: the invitation card 560 x 700 on --surface, centred lines, with a 1 px gilt rule inset 14 px. Below the card: the read-back sentence (lead size, muted label "Say this when you call") and the two call buttons: primary filled accent "Call Nassau 242-326-4029", secondary outline "From the US and Canada 1-954-892-6969", and a text button "Copy the sentence".
- Primary action: Call Nassau.
- Phone (390x844): top line collapses to name + "Call" link; h1 at 42 px over 3 lines; lead 2 lines; then the card at full width (aspect 4:5, script 44 px) so the card is visible on screen 1; then the inputs, then chips, sentence and call buttons, which stick as a bottom bar ("Call Nassau" + "US") once the card scrolls off.

### Screen 2: where she plans (desktop)
- Purpose: show the venues of her published record, with what happened there.
- Layout: columns 1 to 4: h2 "The Ocean Club, Atlantis and Lyford Cay, in her own weddings." and a list of three venue rows (venue name h3, one line from the magazine). Columns 5 to 12: one photograph 3:2 that crossfades when a venue row is hovered or tapped. Ocean Club = French Cloisters (Commons, real); Atlantis = the white tent (illustrative, labelled); Lyford Cay = the aisle (illustrative, labelled). Caption under the photo states source or "Illustrative photography, not her weddings".
- Choosing a venue here also sets the venue on the card (shared state) with a quiet "Set on your card" confirmation.
- Phone: h2, then the photo, then the three rows as tappable buttons.

### Screen 3: in print
- h2 "Two of her weddings, as the magazines told them." Two full-width editorial rows separated by 1 px rules: magazine name at h2 size (Fraunces italic, as a title), date in tabular caps, couple and place (h3), the teaser (body), two text links: "The story and every credit" (weddings.html#id) and "Read it in Weddingbells / Style Me Pretty".
- Phone: rows stack; magazine name at 34 px.

### Screen 4: how planning with her runs (field blush)
- h2 "How planning with her runs." Four columns with a top rule each: 01 First call, 02 The venue, 03 Your vendors, 04 The day. One sentence each, phrased as categories. A single caption under the row: "Described in general terms from her published weddings; the exact steps are to confirm with Dr. Burrows."
- Phone: 2 x 2 then 1 column below 520 px.

### Screen 5: meet Dr. Bernadette Burrows
- Columns 1 to 6: h2 "Dr. Bernadette Burrows plans every wedding herself." Facts list (26+ years; preferred planner Ocean Club and Atlantis; flexible packages; personal attention; author of How to Be Fabulous; credited in both magazine features). Columns 8 to 12: flowers photograph 4:5 (illustrative, labelled).
- Phone: text first, photo after at full width.

### Screen 6: call (deep ground, the one dark section)
- h2 "Call her about your date." If the couple has composed anything, their sentence is repeated here in a quoted block. Two big columns: "From Nassau" 242-326-4029 and "From the US and Canada" 1-954-892-6969 at h2 size, tabular, each a full tel: link; primary filled button under Nassau. Address line: Fire Trail Road West, P.O. Box CB-13320, Nassau, New Providence.
- Footer: photo credits and illustrative note. Phone: columns stack.

### weddings.html (kept and restyled)
- Header as screen 1 top line; h1 "Two weddings in print, with every credit."; tabs Weddingbells / Style Me Pretty; story left (62ch), credit roll right with her credit highlighted in accent ink (text, not fill); end: "Now, about your own date." + primary link to index.html#compose.

## 5. The core tool: interaction spec
- Inputs/defaults: name1 "", name2 "" (card shows placeholders "Your name" and "Your partner" in muted script); date "" (card shows "on a day to be chosen"); guests 80; venue "Ocean Club"; help [].
- Card lines: 1 "Together with their families" (cap); 2 names in script "A & B"; 3 "will be married"; 4 the date in words: weekday, "the" + ordinal day in words + "of" + month, year in words (e.g. "two thousand twenty-seven"); 5 venue in small caps: "the One&Only Ocean Club, Paradise Island" / "Atlantis, Paradise Island" / "Lyford Cay Club, Nassau" / "Nassau or Paradise Island, venue to be chosen"; 6 "with about 80 guests"; 7 foot "Planned with Bahamas Bridal Affairs".
- States: empty (placeholders, muted); filled (ink); past date: inline note under date field "That date has passed, pick a future one" and card line keeps the previous valid date; result: sentence complete.
- Animation: only the changed line re-sets (keyed by its text; opacity and 6 px rise, 420 ms ease-out); names update live with no per-keystroke animation (avoids jitter). Guests number ticks with tabular nums.
- Keyboard: all native inputs, segmented venue is a radiogroup with arrow keys; chips are toggle buttons (aria-pressed). Touch targets at least 44 px.
- Hand-off: tel:+12423264029 and tel:+19548926969; copy to clipboard with fallback text visible. No email or WhatsApp exists (unknown), so the sentence is to read out.
- Sentence formula: "Hello Dr. Burrows, we are {A} and {B}. We hope to marry {venue phrase} on {date short, e.g. Saturday 21 May 2027}, with about {guests} guests. We would like help with {list}." Missing parts are dropped cleanly.

## 6. Signature details
1. The date written out like a stationer, with the weekday computed ("That is a Saturday" also shows under the date field).
2. Names in copperplate script on the card only, everywhere else in roman.
3. The gilt 1 px deckle rule on the card, the only ornament on the site.
4. Choosing a venue in "where she plans" sets it on the card, with "Set on your card" feedback.
5. The guest count ticks with tabular numerals on the stepper.
6. The closing call section repeats the couple's own sentence back to them.

## 7. Photography plan (no own photos exist online; press photos belong to Mango Studios and Karen Hill)
- French Cloisters, Paradise Island (Commons, Art davis, CC BY-SA 4.0): https://upload.wikimedia.org/wikipedia/commons/2/23/Atlantis_French_Cloisters.jpg, 2400 wide (from the previous session's notes; height assumed 1600). Screen 2, Ocean Club row (screen 1 is typographic: the card is the hero object). Shown max 760 px wide. Alt "The stone arches of the French Cloisters on Paradise Island under a blue sky".
- tent.jpg (generated, Lovable asset project, 2048 wide, assumed 2048x1152): screen 2 Atlantis. Labelled illustrative.
- aisle.jpg (generated, 2048x1152 assumed): screen 2 Lyford Cay row. Labelled illustrative.
- flowers.jpg (generated, 1632x2048): screen 5, max 480 px wide.
- One grade: generated images are warm; the Commons photo gets saturate(.85) sepia(.12) to sit with them (static filter, not animated).
- All images with width/height, loading lazy below screen 1, tinted placeholder background --field.

## 8. Self-review
- Screen 1 sells the product (headline names her, her record, Ocean Club and Atlantis) and the job (compose and call) is completable without scrolling on desktop; on phone the card and first inputs are on screen 1 and the call bar follows.
- A1 no badges. A2 no "Phone:" labels; numbers are labelled by place only (Nassau, US and Canada), which carries meaning. A3 italic only for magazine titles and the card's script. A4 no mono. A5 tokens above, used only. A6 the product is a planner's service: the card (the wedding itself) and the real venue photo; illustrative images labelled. A7 the card is the largest element on screen 1. A8 spacing groups, rules only on print rows and steps. A9 headlines specific (her name, venues, magazines). A10 one primary per screen (Call Nassau). A11 accent only on call buttons, active chip, focus. A12 no icons except plus/minus glyphs in the stepper (text glyphs). A13 only ornament: the gilt rule. A14 radius 6 buttons, focus ring 2 px offset, card 2. A15 muted 7:1, accent button text 10:1, deep section text ivory. A16 balance on headings, pretty on paragraphs, check 390 px. A17 card lines centred optically (block nudged 2% up). A18 tabular on phones, guests, dates. A19 image placeholders tinted and sized; clipboard feedback immediate. A20 motion explains: changed card lines re-set, venue photo swap, "Set on your card".
- Care: phone first screen height (h1 3 lines + card must fit: card height ~ 430 px at 350 wide), the sticky call bar must not cover the concept tag; ensure the date words never overflow the card (scale with clamp).
- Distinct: unlike Anna's (Bodoni, split-screen arch) and unlike the previous film version: a typographic composing hero on ivory with letterpress ink blue, script names, no full-bleed hero photo.
