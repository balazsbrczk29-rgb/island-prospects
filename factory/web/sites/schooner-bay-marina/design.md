# Schooner Bay Marina: design.md (job spec approved 2026-11-22)

## 1. The idea
A harbour master's desk on one screen. Their own marina panorama runs across the top like the view from the office window; underneath sits the instrument panel a captain needs before committing to a passage: "Can I come in?" Length and draft dial in against the published 80 ft and 8 ft at MLW, nights turn into a dockage estimate at $3.00 a foot, fuel and power tick on, and beside it a chart of the south-east Abaco coast shows the harbour mouth, Hole in the Wall just to the south and the run from the Abaco Cays to Nassau. One button sends the whole request to the Harbour Master; VHF 16 and 77 and his direct line sit next to it. Everything after screen 1 answers the captain's remaining questions (why stop here, the numbers, ashore) and then the buyer's (Discovery Stay).

## 2. Inspirations
- **Feadship:** specs as quiet hairline tables, huge numerals, white space. We take: the numbers page set as a ruled table with tabular figures.
- **Garmin / Navionics trip planner:** the route drawn on a chart with waypoints labelled in small caps. We take: the run Abaco Cays to the harbour to Nassau drawn as a dashed brass line that draws itself, Hole in the Wall as a named waypoint.
- **Aman booking bar:** the reservation lives in the photograph's world, not on a separate page. We take: the request panel sits directly under the panorama on screen 1.
- Previous version (ours): Ibarra Real Nova + Geist, the fit checker with plan-view hull and depth gauge, Slip / Fuel / Discovery Stay tabs, By sea / By air. Kept and elevated; the banned "key information" band and blurred sticky header are dropped.

## 3. Tokens
**Type:** Ibarra Real Nova 400/600 + italic (display; a book face cut for a harbour named for schooners) and Geist variable 400/500 (UI and body, tabular figures). Self-hosted from @fontsource woff2 in src/fonts. Scale: 13 / 15 / 17 / 22 / 32 / 48 / clamp(52, 5.6vw, 84). Leading 1.45 body, 1.1 at 32, 0.95 at display. Display tracking -0.025em. Labels: Geist 12/500 tracking 0.08em small caps style (the type system uses them as instrument labels, consistently).
**Colour (OKLCH, written as hex in CSS for the inspector):**
- paper `oklch(95.2% 0.006 165)` #eef1ef (ground), paper-2 `oklch(92% 0.009 170)` #e2e8e5, surface #f7f9f8
- ink `oklch(25% 0.035 230)` #0f2530; muted `oklch(47% 0.025 220)` #51636a (5.6:1 on paper); line #cfd5d3
- accent harbour `oklch(41% 0.07 240)` #1d4e6e: primary buttons, the verdict tick, focus
- brass `oklch(60% 0.1 75)` #a8792f: chart route and waypoints only (graphics, never text below 18px)
- field bank `oklch(90% 0.03 175)` #cfe3e0 (chart sea and the depth gauge water); chart land `#e9e2cf` (buff)
**Space:** 4/8: 4, 8, 12, 16, 24, 32, 48, 72, 112. Container 1312 max, 12 columns, gutter 24, side padding 32 desktop / 20 phone. Measure 62ch.
**Shape:** radius 4 on controls, 6 on panels, 0 on photographs. One shadow only (none on panels; borders instead).
**Motion:** ease cubic-bezier(.16,1,.3,1); feedback 180ms, value tweens 450ms, panorama unclip 1.3s, chart route draw 1.6s on first view. Numbers tween with tabular figures. Reduced motion: no unclip, route shown drawn, no tweens.

## 4. Screens
**1. Can I come in? (desktop 1440x900).** Bar (64): wordmark "Schooner Bay" + "Marina, Great Abaco" left; "VHF 16 / 77" and "Harbour Master (242) 366-2044" right, plain links; not sticky. Panorama full-bleed 1440x300 (native 1600x480, cover, shown at 0.9x scale, crop centre). Under it a 12-col panel (paper, 32px top): cols 1-4: H1 "Can I come in?" (display 84), line "A protected harbour on Great Abaco's south-east shore, the closest marina to Hole in the Wall. Tell the Harbour Master your boat and dates.", then hours line "Open daily 7:30am to 4:30pm". Cols 5-9: the tool: LOA and Draft side by side (value 48px tabular, slider), verdict line with tick or cross, nights stepper + arrival date, fuel and 30/50 amp chips, the estimate ($ 48px) and primary "Request a slip" + secondary "Call". Cols 10-12: chart crop (south Abaco, 300x412 of the 600x824 chart, the harbour centred, Hole in the Wall labelled, route segment). Phone 390x844: bar 56 (wordmark, call icon-less text "Call"), panorama 390x150, H1 48, one line, LOA/Draft sliders, verdict, nights, estimate and "Request a slip" (full width) at ~800; chart moves to screen 2.
**2. Why stop here.** Left 7 cols: the full chart 600x824 (route draws in brass from Marsh Harbour down the coast to the harbour mouth and on past Hole in the Wall to Nassau; waypoints: Marsh Harbour, Schooner Bay, Hole in the Wall, Sandy Point MYAS, Nassau; "Simplified from Natural Earth. Not for navigation."). Right 5: h2 "The closest marina to Hole in the Wall." Three ruled facts (closest marina to Hole in the Wall fishing grounds; protected harbour basin on the route from the Abaco Cays to Nassau; published position N 26 09.529', W 077 10.633'), then By sea / By air switch (By air: Sandy Point airstrip MYAS about 20 minutes, Marsh Harbour about 30 minutes by road). Phone: chart full width then text.
**3. The numbers.** h2 "The harbour, in numbers." A two-column ruled table: Length to 80 ft; Draft 8 ft at MLW; Dockage $3.00 per ft per day, varies with stay; Weekly and monthly on request; Fuel diesel and gas, market rate, call ahead; Power 30 and 50 amp; Wi-Fi, restrooms, showers; Radio VHF 16, working 77; Hours daily 7:30am to 4:30pm; Harbour Master Albert Russel. Footnote: the Abaco page lists 70 ft; we use the marina page's 80 ft (assumption to confirm). Link to the 2017 handout PDF. Phone: one column rows label/value.
**4. Ashore.** Harbour amenities photo (1600x1067) 7 cols at 760x507 + village photo (1200x800) 5 cols offset down; list: General Store (ice, marine supplies, snacks), laundry delivery, pet friendly, help with local transport, golf carts, bait and tackle, Blackfly Lodge in the village, the beach. Phone: photos stacked.
**5. Live here.** Field bank ground. Villa photo (1200x800) 6 cols; h2 "Come for a Discovery Stay." 3 nights / 4 days hosted for prospective buyers; the three steps (kept); CTA "Book a Discovery Stay" (switches the request tabs to Discovery Stay) + "Sales, June Russell (242) 577-5577".
**6. Contact and request.** Tabs Slip / Fuel / Discovery Stay (kept) with the form prefilled from screen 1; to the right the contact sheet: Harbour Master direct (242) 366-2044, email, VHF; Village main line (242) 699-3470; Sales; position; hours. The two numbers are labelled by role so the difference is explained. Footer: ink band minimal, concept credit, not for navigation.
marina.html and village.html stay as the deep pages (header/footer updated).

## 5. Core tool spec
Inputs: LOA 20 to 110 ft (default 48, step 1), draft 2 to 12 ft (default 5, step 0.5), nights 1 to 30 (default 3, stepper), arrival date (default empty), fuel (none / diesel / gas), power (none / 30 amp / 50 amp). States: inside (tick, accent), close to the limit (LOA > 74 or draft > 7: "Inside the limits, close to the edge. Call ahead."), outside (no estimate, "Longer than 80 ft" / "Deeper than 8 ft at MLW", primary becomes "Call the Harbour Master"). Estimate = LOA x $3.00 x nights, shown for nights < 7; at 7+ nights the line reads "Weekly and monthly rates are quoted by the marina" with the daily-rate figure as "at the daily rate". Always "before power and fuel". Tide caveat under draft: "8 ft is at mean low water; plan with the tide." Animation: numbers tween 450ms; verdict crossfades; the chart's harbour pin pulses once on verdict change. Keyboard: native range inputs (arrow keys), stepper buttons 44px. Hand-off: "Request a slip" scrolls to #request with the Slip tab filled (LOA, draft, nights, date, fuel, power); the form submits a mailto to harbourmaster@schoonerbaybahamas.com with subject "Slip request: {boat} {LOA} ft, {date}". "Call" = tel:+12423662044.

## 6. Signature details
1. The verdict reads like a harbour master talking ("Inside the published limits. 48 ft, 5 ft draft, 3 nights: $432 before power and fuel.").
2. The route draws itself in brass, Marsh Harbour to the harbour mouth to Nassau, with Hole in the Wall as the waypoint that sells the stop.
3. The published position set in the panorama corner like a chart annotation, tabular.
4. The depth gauge from the previous version kept as a slim bar beside the draft slider: water to 8 ft MLW, the hull's draft as a bar.
5. Each phone number labelled by who answers it.

## 7. Photography
| image | native | use | shown |
|---|---|---|---|
| 2017/10/the-marina-header-slider-01-1600x480.jpg | 1600x480 | screen 1 panorama | 1440x300 cover (0.9x) / 390x150 |
| 2018/06/Harbor-Amenities-elev.jpg | 1600x1067 | ashore | 760x507 |
| 2023/08/schoonerbay-community-harbour-village-080223-min.jpg | 1200x800 | ashore | 520x347 |
| 2018/06/...Schooner-Bay_Villa.jpg | 1200x800 | live here | 620x413 |
All verbatim from schoonerbaybahamas.com; width/height = native; paper-2 placeholders; no grade.

## 8. Self-review
- Screen 1 sells the product (their harbour) and the job (request a slip) is completable without scrolling on desktop; on phone the sliders, verdict, estimate and button fit in 844 with the panorama at 150.
- A1 no badges; A2 numbers unlabelled where self-evident; A3 italic only in the "Bay" wordmark and captions; A4 no mono; A5 tokens above; A6 their harbour photo and their real limits; A7 the tool is the largest block; A8 spacing groups; A9 headlines specific ("Can I come in?", "The last protected basin before Hole in the Wall"); A10 one primary per screen; A11 accent on primary/verdict only; A12 no icons except none (removed lucide); A13 no ornaments; A14 radii 4/6 nested correctly; A15 muted 5.6:1; A16 balance; A17 tick aligned to cap height; A18 tabular everywhere numbers live; A19 placeholders sized; A20 motion only on value change and route draw.
- Distinct: chart + instrument panel, Ibarra/Geist, salt paper and harbour blue; no other site in the repo uses a nautical route chart.
- Assumptions: 80 ft over 70 ft; the Harbour Master line vs main line roles; bait and tackle, golf carts still offered (Abaco page); route drawn is illustrative.
