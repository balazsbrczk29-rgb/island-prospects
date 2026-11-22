# Nassau Glass Co Ltd: design.md (2026-11-22, generation 2 job-spec build)

## 1. The idea in one paragraph
The visitor lands at the cutting table. On the left, one sheet of glass, lit like a sample on the counter, takes the exact proportions, thickness and tint they are choosing: type 30 by 48 inches and the sheet stretches to that shape; pick 3/4 in and the green edge thickens; pick bronze and it darkens; pick laminated and it parts into two plies with the interlayer between, which is how laminated safety glass is explained. On the right, the quote builder from their real stock list: what it is for, thickness, tint, width, height, pieces, fitting. Under it, the square footage and a summary to read to the counter, with "Call (242) 603-5521", "Copy summary" and whether the shop on Mackey Street is open right now. The job (a quote started) is done on screen 1. Everything below helps decide: the stock table, the enclosures they make, the walk-in departments, 1959, and the visit.

## 2. Inspirations
- **Apple "Buy iPad" configurator:** the product image on the left changes with every choice on the right; the running summary sits under the options. We take the two-column configurator and the live object.
- **Linear.app changelog/specs:** precise tabular data in a calm table with hairline rules. We take the stock table.
- **Vitsoe.com:** an established maker shown plainly, with dimensions as the hero of the product. We take dimension lines and measured type.
Also the trades/industrial playbook references (3D only where it explains the product: here the sheet itself).

## 3. Tokens
**Type.** Display: Newsreader variable (opsz 6 to 72, wght 400 to 500): a sharp, measured text serif with a long history feel, right for a 1959 maker. Text and data: Instrument Sans (already the shop's previous concept text face, tabular figures). Scale (desktop / phone):
- small 14 / 14, Instrument Sans 500, leading 1.4
- body 17 / 16, leading 1.55
- lead 21 / 18, Newsreader 400 opsz 24, leading 1.4
- h3 24 / 21, Newsreader 450, leading 1.2, tracking -0.01em
- h2 46 / 32, Newsreader 420 opsz 72, leading 1.06, tracking -0.025em
- hero 52 / 34, Newsreader 400 opsz 72, leading 1.02, tracking -0.03em
- data numerals (sq ft) 40 / 32 Instrument Sans 500 tabular.
**Colour (OKLCH, written to CSS as hex).**
- ground oklch(97.4% 0.006 120) #f6f7f3 (cool paper, like light through clear glass)
- surface oklch(99.3% 0.003 120) #fdfdfb
- ink oklch(21% 0.012 160) #161b19
- muted oklch(47% 0.015 160) #58615d (6.3:1)
- line oklch(88% 0.01 150) #d7dcd8
- accent oklch(40% 0.07 170) #1f5a4f: their green building, ONLY on primary actions, active options and focus
- accent-ink #f3f7f5
- field oklch(30% 0.045 175) #143c38 deep glass green, for the "since 1959" section only (the one dark section).
- glass edge #58b89d (the sheet edge and the dimension lines)
**Space.** 4/8: 4 8 12 16 24 32 48 64 96 120. Sections 120 desktop / 72 phone. 12 columns, max 1280, gutter 32 / 20, side 48 / 20. Measure 62ch.
**Shape.** Radius 4 on buttons and options, 2 on inner tags (4 minus 2 px inset), 0 on table and photos. Borders 1 px line. Shadow: none except the floating phone call bar (0 -8px 24px -12px ink 20%).
**Motion.** Ease cubic-bezier(.22,1,.36,1). Feedback 160 ms (options), summary row update 240 ms (opacity + 4 px), sheet transitions are damped in the render loop (time constant 0.2 s), reveals 600 ms with 60 ms stagger on table rows. Reduced motion: no sway, instant sheet changes, no reveals.

## 4. Screens
### Screen 1: quote builder with the sheet (desktop 1440x900)
- Toolbar 64 px: wordmark "Nassau Glass" (Newsreader 22) left; nav: Glass in stock, Shower enclosures, Departments, Visit; right "(242) 603-5521" tabular link.
- Grid: cols 1 to 6 the stage: the 3D sheet on the ground (no box), with an HTML dimension readout under it: "30 in x 48 in, 1/4 in clear glass" and the note "A rendered sample. The real sheet is at the counter." Cols 7 to 12 the builder: h1 "Glass and mirror cut to your size, on Mackey Street since 1959." Then rows: What it is for (Window glass, Mirror, Table top, Shower enclosure, Laminated or impact); Thickness (from stock) or, for showers, Frame and Door; Tint; Size (width, height in inches, pieces); Fitting (Pick up at the counter / Measure and fit). Then the ticket: square footage at data size, summary line, primary "Call (242) 603-5521", "Copy summary" link, and Open now line.
- Phone (390x844): toolbar with wordmark + Call; h1 34 px (3 lines); the sheet canvas 260 px tall with the readout; then the builder rows; the ticket; a call bar (Call + Copy) docks at the bottom once the ticket is off screen.

### Screen 2: the stock list as a table
- h2 "Everything on the rack, in one table." Table columns: Sheet, Thickness, Tints (with small swatches), Used for, action (Quote it fills the builder and scrolls up / Call). Six rows: Glass, Mirror, Laminated safety glass, Pattern glass, Acrylic Plexiglas, Polycarbonate. Phone: each row becomes a block with label/value pairs.

### Screen 3: shower enclosures, made here
- h2 "Shower enclosures are made here, not shipped in." Lead with the four facts (frameless or semi-frameless, swing or sliding, finishes, glass). A horizontal strip of their six own photos (750x1000 native, shown 300x400). "Quote an enclosure" sets the builder to shower and scrolls up.

### Screen 4: the walk-in departments
- h2 "Bulbs, Hunter fans, framing and lamps, at the same counter." Four rows in a two-column list (name, since year if sourced, one line), plus Architectural Metals and the Service Department as "made and fitted". Link to departments.html (all nine). No cards: a list with hairline rules.

### Screen 5: since 1959 (field green, the one dark section)
- h2 "The Bahamas' first glass fabricator, at the top of Mackey Street since 1959." The five dated additions (1959, 1966, 1982, 1994, 2002) as a horizontal timeline with year numerals; the sister company line with the link to Bahamas Aluminum.

### Screen 6: visit and call
- h2 "The green building at the top of the hill." Address with directions (half a mile south of the Paradise Island Bridge), map link (Google Maps search URL), the open-now line, hours table, both phones, international line, fax; the building photo (400x234 native, shown at 400). Phone: stacked.

### departments.html (kept and restyled to the new tokens)

## 5. The core tool: interaction spec
- Inputs/defaults: use "Window glass"; thickness 1/4; tint Clear; width "" height "" (sheet shows a 24 x 36 default proportion, readout "Enter your size"); pieces 1; fitting "Pick up".
- Use to stock: Window glass and Table top use the Glass list (1/16, 1/8, 1/4, 3/8, 1/2, 3/4; Clear, Gray, Bronze); Mirror uses 1/8, 1/4 and Clear, Bronze, Gray, Flesh tone, Blue; Laminated or impact uses the laminated list (thickness "a large selection", tints Clear, Bronze, Gray, Green); Shower enclosure shows Frame (Frameless, Semi-frameless) and Door (Swing, Sliding) instead of thickness and tint.
- Formula: area = width x height / 144 x pieces, shown to 1 decimal "sq ft"; perimeter not shown. Inputs accept decimals and fractions like "24 1/2" (parsed). Invalid or zero: area shows "Enter your size".
- States: empty (Enter your size), filled (area and summary), invalid (hint under the field: "Inches, for example 24 1/2"), copied (link reads "Copied" for 1.8 s).
- Animation: the sheet lerps to new aspect, thickness, tint and ply separation (damped). The area number updates with tabular figures; summary row changes fade 240 ms.
- Keyboard: option groups are radiogroups with arrow keys; inputs native. Touch: options 44 px tall.
- Hand-off: tel:+12426035521 (primary), second line (242) 393-8165 in the visit section; copy summary to clipboard. Summary text: "Quote request for Nassau Glass: 2 pieces of 1/4 in clear glass for a window, 30 x 48 in each (20.0 sq ft), measure and fit please." Prices are never shown (none published).
- Open now: Mon to Fri 9:00 to 4:30, Sat 9:00 to 1:00, closed Sunday, computed in America/Nassau.

## 6. Signature details
1. The sheet takes the visitor's real proportions, and the thickness shows at its edge.
2. Laminated parts into two plies and an interlayer, explaining safety glass without a paragraph.
3. Dimension readout in the style of a cutting ticket: "30 in x 48 in" with the glass-green hairline.
4. Square footage ticks with tabular figures.
5. "Quote it" in the stock table and "Quote an enclosure" prefill the builder and return to it.
6. Open now, live in Nassau time.

## 7. Photography plan
- Six shower enclosures from nassauglass.com: https://www.nassauglass.com/wp-content/uploads/2021/04/ng-shower-01.jpg to -06.jpg, native 750x1000, shown 300x400 (desktop) and 240x320 (phone), alts from the previous version.
- The building: https://www.nassauglass.com/wp-content/uploads/2020/05/ng_gallery.jpg, native 400x234, shown at 400 max.
- The sheet: real-time 3D (three.js via R3F), studio-lit, a poster PNG (pane.png) until the canvas is ready. Labelled "A rendered sample".
- No stock photos. One grade: as photographed.

## 8. Self-review
- Screen 1 sells the product (their stock, made to size, 1959, Mackey Street) and the visitor can choose, size and call without scrolling on desktop; on phone the sheet and the first option row are on screen 1, the call bar follows.
- A1 no badges. A2 no "Phone:" labels. A3 no italics; the rendered-sample note is roman, muted. A4 no mono; tabular sans. A5 tokens only. A6 the product is the sheet itself and their own shower photos. A7 the builder and sheet fill screen 1. A8 spacing groups, hairlines only in the table and lists. A9 headlines specific. A10 one primary per screen (Call). A11 accent only on primary, active options, focus. A12 no icons. A13 no ornaments. A14 radius 4 / 2. A15 muted 6.3:1, accent buttons 8:1. A16 balance/pretty. A17 dimension readout optically centred under the sheet. A18 tabular everywhere numbers live. A19 poster under the canvas, sized image boxes, copy feedback instant. A20 sheet and area animate as explanation.
- Care: the canvas must not shift layout (fixed aspect box); 3D lazy-loaded and paused offscreen; phone dpr 1.25.
- Distinct: the only configurator-with-live-object hero in the repo; green-building accent; Newsreader + Instrument Sans pairing not used elsewhere.
