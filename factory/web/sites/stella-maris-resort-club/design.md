# Stella Maris Resort Club: design.md
Spec: factory/jobspecs/stella-maris-resort-club.md (approved 2026-11-22). Brochure + priced stay enquiry (email to Reservations@, no booking engine).

## 1. The idea in one paragraph
"The club's front desk, with the sums already done." Screen 1 pairs their photograph of the Atlantic shore with a stay planner: dates and party on the left, and under the photograph a filmstrip of the ten places to stay, which reorders itself to fit the party as you change it (a family of six sees the three and four bedroom houses slide to the front). Pick one and the left column adds it up line by line, exactly as their rate page says (season rate for the occupancy, extra adults, VAT, resort levy, maid service, energy surcharge, optional meal plan), with the deposit due. Send this stay to reservations writes the email; Add flights from Nassau adds the air service. The two shorelines, every place to stay with both photographs and its price for your party, the diving and fishing, the way here and the policies in plain words follow.

## 2. Inspirations
- **Airbnb price breakdown:** itemised lines and a total that change with dates and guests. I take the honest line-by-line sum.
- **Apple Store configurator:** the product (a row of photographs) reorders and re-prices as you change one input. I take the live reorder with layout animation.
- **Belmond / Six Senses:** a split hero with an italic serif, experiences as an editorial index. I take the italic Goudy voice and the index of experiences.
- Playbook resort.md: rooms and rates are the product; their own photographs sell the place.

## 3. Tokens
**Type.** Sorts Mill Goudy 400 and italic (display: a warm, slightly old-fashioned book face for a family club since the 1960s) with Mulish 400/600 (text and every figure, tabular). Kept from the previous version, now self-hosted.
Scale (px desktop/phone): cap 12/12; small 14/14; body 17/16 (1.6); lede 21/19 (1.45); h2 50/34 (1.04, -0.015em); h1 60/40 (1.0, -0.02em).
**Colour (OKLCH, shipped as hex for the QA tool).** paper `oklch(0.968 0.007 140)` #f3f6f1; paper-2 `oklch(0.94 0.01 140)` #e8eee6; ink `oklch(0.27 0.04 245)` #13283a; muted `oklch(0.47 0.03 245)` #52606e (6.2:1); line `oklch(0.89 0.01 140)` #d9dfd8; accent lagoon `oklch(0.5 0.08 195)` #13777a (send button, selected place, total; white on it 5.3:1); atlantic field `oklch(0.33 0.07 255)` #1b3a63 (the Atlantic band and the water section, text paper on it); shallows `oklch(0.84 0.06 185)` #9fd8d2 (the calm-side band and accents on atlantic); sand `oklch(0.92 0.025 85)` #ece2cf (policies band).
**Space.** 4/8 scale 4 8 12 16 24 32 48 64 96 128; section padding 128/72; 12 columns, 24 gutter, margins clamp(20px,4.5vw,64px), max 1312. Measure 62ch.
**Shape.** Photos square cornered; controls radius 4 px; one shadow on the phone bar.
**Motion.** Ease cubic-bezier(.22,1,.36,1). Feedback 160 ms; filmstrip reorder: Motion layout 450 ms; selected photo ring 200 ms; total digits roll 280 ms; total lines enter with height+opacity 220 ms. Reduced motion: no reorder animation, instant swap.

## 4. Screens
### Screen 1: the planner (index)
Desktop 1440x900. Header 64: wordmark "Stella Maris" (Goudy 26) with "Resort Club" small; nav Places to stay, The island, Getting here, Weddings, Contact; phone 242-338-2050; "Plan your stay" link.
- Cols 1-5: kicker "Long Island, The Bahamas"; H1 "Ten places to stay. Your week, added up." (Goudy 56, 3 lines); controls in one ruled block: Arrival (date), Nights stepper (1 to 28), Adults (1 to 10), Children 12 and under (0 to 6); season line ("Winter rates, 19 Dec to 18 Apr" or a split). Then the itemised sum (tabular, right-aligned figures), total in accent, "Estimate from the published rates, confirmed by reservations", deposit line; Meal plan toggle; buttons Send this stay to reservations (accent), Add flights from Nassau (link), call.
- Cols 6-12: the Atlantic shore photograph (their 7.jpg, set 1920x1280), 16:9 crop, ~ 740x416; under it the filmstrip: ten photographs (each the unit's first photo, 1024x683 native, shown 168x112) with name, bedrooms and "from $x a night for your party" or the dim reason; horizontally scrollable with snap; the chosen one has an accent ring and its name in accent.
Phone: header 56 (wordmark, Call); kicker, H1 (40); photo 16:9 full bleed; controls; filmstrip (scroll); the sum; sticky bar: place name + total + Send.

### Screen 2: two shorelines
A split band: left atlantic field (paper text) "The Atlantic side", right shallows field (ink text) "The calm side", over their words "the turquoise or ink-blue of the two near shorelines". Atlantic: the houses with porches and pools over the Atlantic (Sand Dollar, Sea La Vie, Carolyn's Favourite, Rainbow Villa, Flamingo House) and big game fishing. Calm: bonefishing in Adderley's and Glenton's bays, the Moonshine beach bar and grill on the shore, kayaks and paddle boards, the morning beach trips to Cape Santa Maria Beach and Columbus Harbour. Resort photo (3-1.jpg) between them.

### Screen 3: the places, one by one
H2 "Every place, priced for your party." Ten ruled rows: two photos side by side (each 1024x683, shown 300x200), name (Goudy 28), kind and beds, their description verbatim, features, and a two-column price for the current party: Summer 2026 per night, Winter 2026-27 per night (rate before surcharges), plus "Plan this one" (sets screen 1 and scrolls up).

### Screen 4: included, and what to do
Included (pools and beach towels, weekday morning beach excursions to Cape Santa Maria Beach or Columbus Harbour, bicycles, Wi-Fi around the clubhouse) as a ruled list. In the water (atlantic field): Stella Maris Water Sports dive sites Shark Reef, The Wreck, Conception Wall, Dean's Blue Hole; bonefishing in Adderley's and Glenton's bays; big game fishing. Activity chips (snorkel, dive, fish, bike, sail, kayak, paddle board, caves, bird life, Rum Punch Party, excursions to nearby islands) that add to the enquiry. Packages and specials: Sun & Sea all-inclusive 5 nights $1,867 single / $2,945 double, valid to 19 Dec 2026; $250 air credit on air-inclusive packages from the US (blackout 3 to 6 July 2026).

### Screen 5: getting here
Four steps: fly to Nassau; the resort's own air service, or a scheduled flight to Stella Maris Airport (SML); the short drive to the club on Ocean View Drive; the fly-in enquiry button (mailto the air service, prefilled with dates and party).

### Screen 6: weddings, policies, contact
Weddings line (barefoot or elegant, anniversaries) with a Reservations mailto. Policies in plain words on sand: deposits, cancellation, credit cards (Visa, Mastercard, Amex), meal plan. Contact: 242-338-2050, 242-338-2051, 242-338-2027, fax 242-338-2052, Reservations@, Jill@, info@, the air service email, Ocean View Drive, P.O. Box LI 30-105, Stella Maris, Long Island; Facebook.
stay.html: screen 1 + 3 + policies. island.html: screens 2, 4, 5, weddings. All end with contact.

## 5. The core tool: interaction spec
- Inputs/defaults: arrival = today + 30 days (runtime), nights 7, adults 2, children 0, place = best fit, meal plan off, activities none.
- Season per night: nights before 19 Dec 2026 = Summer 2026; 19 Dec 2026 to 17 Apr 2027 = Winter; nights from 18 Apr 2027 use Winter rates flagged "not yet published, to confirm"; before 20 Apr 2026 not selectable (min date today).
- Rate per night: hotel room and apartment 1/2/3 adults 190/230/270 (S) 210/250/290 (W); one-bedroom cottage 240/280/320 and 260/290/330; Sand Dollar and Sea La Vie 2 (or 1)/3/4 adults 360/400/440 and 420/460/500; Gecko, Carolyn's, Flamingo 660 (S) 700 (W) for up to six; Rainbow and Dolphin 770/800. Adults beyond the top published column: + $40 per adult per night. Children 12 and under free.
- Lines: Rooms (sum of nightly rates incl. extra adults); VAT 10% of rooms; Resort levy 6% of rooms plus 10% VAT on it (6.6%); Maid service $6 x guests x nights; Energy surcharge ($4 hotel room and apartment, $7 cottages and houses) x guests x nights + 10% VAT; Meal plan (optional) $83 x guests x nights + 15% gratuity + 10% VAT. Total. Deposit: 1 to 2 nights: 1 night; 3 to 4: 2 nights; 5 to 7: 3 nights; 8 to 9: ask; 10 and more: 5 nights (their table, ranges as published), shown as nights and an amount at the stay's average night.
- Fit order: places whose published occupancy covers the adults first; among them, fewest bedrooms that give at least one bedroom per two guests; ties by own pool, on the beach. Places that need extra-adult charges stay in the row with "+ $40 per extra adult" and sort after.
- States: default filled; changing any input re-sorts (layout animation) and re-totals (digit roll); a place pushed far down stays selected and scrolled into view.
- Keyboard/touch: filmstrip is a radiogroup (arrow keys), steppers buttons 44 px, date native input.
- Hand-off: Send this stay = mailto Reservations@stellamarisresort.com with place, dates, adults, children, meal plan, activities, the itemised estimate. Add flights = mailto Stellamarisresortairservice@gmail.com cc Reservations@ with dates and party. Phones tel:+12423382050.

## 6. Signature details
1. The filmstrip reorders itself as the party changes.
2. Every surcharge from their rate page appears as its own line, so nothing is a surprise.
3. The season is named and split when a stay crosses 19 December.
4. "Two shorelines" band in their own words, ink-blue and turquoise.
5. The phone bar carries the place's name and total.

## 7. Photography plan (their site, stellamarisresort.com/wp-content/uploads/)
hero 2021/11/7.jpg (width/height set 1920x1280, shown at most 760 px wide); resort 2021/11/3-1.jpg (1920x1280 set, shown 640); gallery 2021/11/Resize1-1170x780.jpg and Resize2-1170x780.jpg (1170x780); per unit two photos at 1024x683 (filenames), shown at most 420. Never their OLYMPUS DIGITAL CAMERA captions; our captions describe the place.

## 8. Self-review
- Screen 1: the shore photo, ten places and a full itemised total with Send, above the fold on desktop; on phone the sticky bar carries total and Send from the first frame.
- A1 none. A2 no labels like "Phone:". A3 italic for the voice lines only. A4 no mono. A5 tokens only. A6 their real places. A7 the planner dominates. A8 grouping by space. A9 specific headline. A10 one filled button per screen. A11 accent on Send, selection, total. A12 no icons. A13 no ornaments. A14 4 px controls. A15 muted 6.2:1. A16 balance. A17 checked. A18 tabular everywhere. A19 sized boxes. A20 motion explains reorder and totals.
- Unmistakably this club: ten named houses, two shorelines, its own air service.
- Assumptions: guests for maid and energy surcharges counted as all guests; houses' sleeping capacity beyond the "Six" column unknown; online deposits not shown; the ten-language switch of their site is not reproduced in the concept (to add with their translation plugin at build).
