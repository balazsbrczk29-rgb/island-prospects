# Harding-Lee & Company: design.md (Nov 22 rebuild to the approved job spec)

## 1. The idea in one paragraph
A senior practice that answers before you have to ask twice. Screen 1 is a quiet desk in old Nassau: on the left the firm asks "What are you dealing with?" and lists six matters as large book-type rows; on the right a real chart of the central Bahamas, New Providence and Long Island inked, everything else in faint pencil. Choosing a matter draws one fine green line from the question, through the named attorney whose published practice covers it (portrait, name, why her), to the office pin on the chart. The letter is already written: one button opens a prepared email to that attorney, a second line calls the office you chose. Balazs asked to keep the previous composition and individuality, so this is an elevation of that version, not a rewrite: same router, same office switcher, same pastel record band, now with the chart, a serif and sans pairing and the consultation screen.

## 2. Inspirations
- **Slaughter and May:** a restrained paper palette, one serif with italic used only for quiet secondary lines, lists of real work instead of marketing.
- **Pictet:** generous whitespace, numbers set as part of the typography (tabular, small), a single green accent.
- **Apple Maps place cards / Linear's connectors:** a hairline path that draws itself between two anchored things, origin-aware, interruptible; the destination pin pulses once on arrival.
- Playbook `professional` references: the named senior person and a direct line are the conversion, not a form.

## 3. Tokens
**Type**
- Display and reading face: **Newsreader** variable (opsz 6 to 72, wght 200 to 800), self-hosted woff2 (normal + italic). A newspaper-book serif with optical sizes: authority without stiffness, right for chambers on Dowdeswell Street.
- UI face: **Instrument Sans** variable (wght 400 to 700), self-hosted from @fontsource-variable/instrument-sans. Labels, nav, buttons, form, captions, coordinates, phone numbers. Clean, slightly literary, not Inter.
- Pairing unused elsewhere in the repo (used.mjs checked).
- Scale (rem at 16 px): caption 0.8125 (13, sans, 1.4, +0.01em) / ui 0.9375 (15, sans, 1.45) / body 1.1875 (19, serif, 1.55) / lead 1.5 (24, serif, 1.3, -0.01em) / h2 2.5 (40, serif opsz 48, 1.08, -0.02em) / h1 3.75 (60, serif opsz 72, 1.02, -0.025em). Phone: h1 2.25 (36), h2 1.875 (30), matter rows 1.3125 (21).
- Small-caps labels in Instrument Sans 600, 12.5 px, +0.08em, used only for map labels and the record years margin (part of the type system, not above every heading).

**Colour (OKLCH)**
- ground `oklch(97.6% 0.015 90.2)` (#fbf7ec), surface `oklch(99.4% 0.008 91.5)` (#fffdf7)
- ink `oklch(26.6% 0.012 55.8)` (#2a2420), muted `oklch(45.9% 0.019 67.3)` (#5f564d, 6.7:1 on ground, 5.6:1 on field)
- line `oklch(88.2% 0.034 86.3)`, line-strong `oklch(79.6% 0.045 86.6)`
- accent shutter green `oklch(47.6% 0.072 160.9)` (#33694f): primary button, active tick, the route line, the destination pin. Nothing else.
- field Bay Street yellow `oklch(91.7% 0.081 92.8)` (#f6e3a6): the record band only.
- chart: sea `oklch(94.2% 0.011 158.8)`, land faint `oklch(92.7% 0.028 86.6)`, inked islands = ink at 85%.

**Space:** 8-based: 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Section padding 128 desktop, 72 phone. 12-column grid, gutter clamp(20px, 4.2vw, 64px), max 1320 px. Text measure 62ch.
**Shape:** radius 2 px everywhere (paper, not app). Hairline borders 1 px line. One soft shadow only: the answer card on the chart (0 1px 0 line, 0 18px 40px -24px ink/25%).
**Motion:** ease `cubic-bezier(.22,1,.36,1)`. Feedback 180 ms (rows, buttons, tabs). Answer swap 240 ms opacity + 6 px y from the side of the newly chosen row. Route draw 900 ms (pathLength 0 to 1), pin ring 600 ms after draw. Hero entrance: rows stagger 40 ms, chart fades 700 ms. Reduced motion: no draw, line shown complete, no stagger.

## 4. Screens
**S1 Router (desktop 1440x900).** Header 76 px: wordmark "Harding-Lee & Company" (serif, green ampersand) left; Practice, Attorneys, Offices (sans 15) and the Nassau number as text right. Grid: cols 1 to 6 = H1 "What are you dealing with? We will tell you who handles it." (60 px, 2 to 3 lines), lede (sans? no: serif 19, muted) "Attorneys at law in Nassau and Salt Pond, Long Island, since 1996, led by a senior partner called to The Bahamas Bar in 1982.", then six matter rows (serif 24, 54 px tall, hairlines, green tick when chosen). Cols 7 to 12 = the chart panel (surface, hairline frame, aspect 1000:889 cropped to ~ 560x500): real Natural Earth 1:10m coastlines, New Providence and Long Island inked, labels "Nassau" and "Salt Pond" in small caps with coordinates; the answer card sits directly under the chart: portrait 88x104, name (serif 24), role line, why her (serif 17), office toggle (Nassau chambers / Salt Pond), primary "Write to Mrs. Harding-Lee", text link "Call (242) 326-4065" (number follows the chosen office). An SVG overlay across the hero draws the green route: from the chosen row's tick to the card's portrait edge, and from the card to the chosen office pin. Primary action: Write to <attorney>.
**S1 phone (390x844).** Header 64. H1 36 px, lede 2 lines, six rows (48 px, serif 21). The answer opens inline under the chosen row (portrait 64, name, why, office toggle, full-width Write button, call link). The chart follows below, full width, with the card-to-pin line only (no cross-column line). Headline, rows and the default answer reach the Write button by ~900 px; the rows themselves are the tool and are on screen 1.
**Order as built (spec order, with the record introducing the attorneys):** S1 router, S5 practice, S2 record, S3 attorneys, S4 offices, S6 consultation, S7 write.
**S2 The record (field yellow).** Desktop: facade photo cols 1 to 5 (4:5, shown 460 wide, native 1600x2000), cols 7 to 12 H2 "A senior lawyer's attention, the same one for thirty years." and a dated list with years in a hanging sans small-caps margin: 1982, 14 years, 1996, 2005, Today. Phone: photo 4:3 crop on top, list below, years above each line.
**S3 The two attorneys.** H2 "Two attorneys. You speak to one of them." Two letterhead rows, Donna first: portrait 150 (Donna) / 120 (Nadia) in hairline frames, name 40 / 32, role, areas sentence, direct email as a link, record as a three-line run in the right column. Phone: portrait left 96 beside name, text below.
**S4 Two offices.** H2 "Nassau chambers, and an office on Long Island." Dock photograph full content width (native 1920x1088, shown max 1320). Under it the office switcher tabs; the panel shows address, every phone as tap to call, fax, directions link, and the same small chart crop of the chosen island. Hours not published: not shown.
**S5 Practice in plain words.** Two-column typeset index of the six matters, each with lead initials, a plain sentence, link to practice.html#id; closing line "The firm appears in all courts of the Commonwealth of The Bahamas."
**S6 A first consultation.** Desk photograph cols 1 to 5 (native 1920x1088, shown 600 wide, 4:3 crop on the deed). Cols 7 to 12: H2 "What happens after you write." Four numbered steps in plain categories (write with the kind of matter; the attorney replies to arrange a meeting in Nassau or Salt Pond; bring the papers you have; terms confirmed before work begins). Listed as assumptions in status. Link to write.
**S7 Write to us.** H2 "Write to us. The first letter is simple." Form left (matter prefilled from the router, attorney, name, how to reply, a line, hint about confidential details) composing a mailto to the right attorney with cc. Right: calling card with both offices and both emails. Footer: firm line, photo credits.
**Phone bar:** Call Nassau / Write to us, hidden over S1 and S7.
**practice.html:** keep: title, six matters with lead attorney and "Write about this", FAQ accordion; add the chart in the title area instead of a repeat of the desk photo.

## 5. Core tool: interaction spec
- Inputs: matter (6 rows, default "Property, land or resort development"), office (Nassau default; Salt Pond). Attorney follows matter: lead = who[0], "with" line for who[1].
- States: always filled (a default is chosen so screen 1 is never empty); change = answer swap + route redraw; no loading; error: none (mailto). If the mail app does not open, the email address is visible in S3 and S7.
- Animation: answer cross-fades 240 ms with 6 px rise; route path redraws from the row (pathLength 0 to 1, 900 ms), interruptible: a new choice restarts from the new row. The office pin gets one ring pulse. Office toggle moves the second leg only.
- Route geometry: measured with getBoundingClientRect relative to the hero on choice, resize and font load (ResizeObserver); path = row tick centre, horizontal to the gutter, cubic curve to the portrait's left edge; second leg = card top edge to pin, cubic curve. Desktop only (>= 960 px); phone shows the card-to-pin leg inside the chart.
- Keyboard: rows are buttons with aria-pressed; arrow up/down moves between rows; office toggle is a two-button radiogroup. Answer region aria-live polite. Touch: 48 px minimum rows.
- Hand-off: `mailto:<lead>?cc=<other>&subject=Enquiry: <matter>&body=Dear <short>, ... office: <chosen>`; call `tel:` of the chosen office's first number.

## 6. Signature details
1. The route line draws from the question to the attorney to the island, in shutter green, and the pin rings once.
2. Real coastlines (Natural Earth 1:10m), not a drawing; New Providence and Long Island inked, the rest pencil; coordinates in tabular small caps.
3. Years in a hanging margin on the yellow record band, like a law report's margin notes.
4. The ampersand of the wordmark in shutter green, the only decorative use of the accent and also its brand mark.
5. The prepared letter says which office you prefer, so the attorney knows where to meet.

## 7. Photography plan
| image | source | native | where | crop | alt |
|---|---|---|---|---|---|
| donna1.jpg | i0.wp.com hardinglee.com (own) | 962x1142 | S1 card 88 w, S3 150 w | face | Donna M. Harding-Lee |
| nadia1.jpg | own | 962x1142 | S1 card, S3 120 w | face | Nadia Hope Johnson |
| dowdeswell-facade.jpg | Lovable generated, illustrative | 1600x2000 | S2, 460 w | centre | pale yellow building with green louvres, downtown Nassau (illustrative) |
| salt-pond-dock.jpg | Lovable generated, illustrative | 1920x1088 | S4, max 1320 w | centre | timber dock over turquoise shallows (illustrative) |
| louvre-desk.jpg | Lovable generated, illustrative | 1920x1088 | S6, 600 w, 4:3 | right 70% | louvre light on a desk and ribboned deed (illustrative) |
All shown below native width; width/height attributes set to native; tinted placeholders. One warm morning grade (all three generated in one style). Captions mark illustrative images.

## 8. Self-review
- Screen 1 sells the product (two senior attorneys, two islands, six matters) and a visitor can choose a matter and press Write without scrolling on desktop; on phone the rows and the inline answer are on screen 1 and the button within a short scroll.
- A1 no badges. A2 no "Phone:" labels (phones are links in lists). A3 italic only in the record's quiet captions. A4 no mono; coordinates in tabular sans. A5 tokens on :root, both faces. A6 the product is the attorneys and the offices: portraits and real chart. A7 the router is the largest element. A8 spacing groups. A9 headlines specific. A10 one green primary per screen. A11 accent only on action, active, route. A12 no icons. A13 no ornaments except the hairline frame. A14 radius 2 everywhere. A15 muted 6.7:1. A16 balance/pretty, check 390. A17 tick optically centred. A18 tabular on phones, years, coordinates. A19 tinted photo placeholders, chart is inline SVG (no load). A20 route line explains the routing. Needs care: route measurement on resize and on font swap; phone first screen height.
- Unmistakably this firm: the two islands it practises from, its own two attorneys, its own record. No other site in the repo routes a matter to a named person on a chart.
