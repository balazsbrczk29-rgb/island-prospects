# Gunite Pools of Nassau: design.md

Spec: `factory/jobspecs/gunite-pools-bahamas.md` (approved Nov 22). First build, no previous version.
Research this run: homepage and /newpool read live (Nov 22). Facts added: store and office at 23 Montrose Avenue, Nassau; Tel. (242) 397 1050; online store at store.gunitepoolsbahamas.com; Instagram, Facebook, LinkedIn, Pinterest; PHTA member logo on their site; the newpool lists (pools, spas, water features, infinity edges, tension edges, play areas; plumbing, mechanical, full pool engineering, pool value engineering) and "from a residential pool to an Olympic size pool". No email and no WhatsApp were found, so the request hands off by phone plus a copyable request (see 5).

## 1. The idea in one paragraph
The site is a pool builder's drawing table. On screen 1 the visitor sees one of Gunite's own finished pools at full height, and beside it a plan sheet on white plaster paper. They choose a door: "Build or renovate" or "Service my pool". In the build door, they pick a shape and drag the length; the outline is drawn on the plan in ink, the dimension lines tick to the new size in feet, and the shape fills with moving water. If they add a photo of their yard, the plan is drawn over their own yard. The request they send already says what, where, how big and how far along they are, so Gunite's first call is a real conversation. Further down, the pool is built layer by layer in real 3D (dig, steel, gunite shell, tile, coping, water), so the visitor understands what "gunite" means and why a family that has done it since 1972 is the safe choice.

## 2. Inspirations
- **Aesop (aesop.com) product pages:** a calm warm-white ground, generous margins, serif reading text against precise sans labels. I take the ground, the quiet and the type pairing.
- **Apple "AirPods Pro" anatomy pages:** an object assembled in sequence on scroll with one sentence per stage. I take the pinned 3D stage and one-sentence chapters.
- **Linear (linear.app) and Stripe Atlas forms:** step controls that feel like instruments, with live-ticking numbers. I take the segmented door switch, tabular live numbers, and a result card that rises when inputs change.
- Playbook trades: "The anatomy of the work" (pool shell, tile, coping) and "See it on your house" (here: your yard).

## 3. Tokens
**Type**
- Display and UI: **Instrument Sans** variable (wght 400 to 700, wdth 100), self-hosted. A precise, slightly technical grotesk that reads like an architect's lettering, in sentence case. Never condensed uppercase.
- Reading text: **Newsreader** variable (opsz), self-hosted, roman and italic. A readable, warm text serif for the family story and long paragraphs; italic only for captions and the one-line pull quote of their own words.
- Scale (px, desktop / phone):
  - cap 13 / 13: Instrument Sans 500, leading 1.35, tracking 0.01em (labels, captions, plan dimensions);
  - small 15 / 15: Instrument Sans 450, leading 1.45 (UI, controls);
  - body 18 / 17: Newsreader 400 opsz auto, leading 1.55;
  - lead 23 / 20: Newsreader 400, leading 1.4;
  - h2 44 / 32: Instrument Sans 520, leading 1.06, tracking -0.025em;
  - hero 72 / 42: Instrument Sans 540, leading 1.0, tracking -0.035em.
- Numbers: `font-variant-numeric: tabular-nums` on every dimension, gallon figure, phone number and the sample report.

**Colour (OKLCH)**
- ground (limestone): `oklch(0.962 0.005 115)` (rgb 242 243 239), a cooler limestone than the generation-1 cream
- surface (white plaster): `oklch(0.993 0.003 85)`
- ink (deep shell grey): `oklch(0.25 0.012 235)`
- muted ink: `oklch(0.47 0.012 235)` (about 7:1 on ground)
- line: `oklch(0.87 0.01 85)`
- accent (pool water, for the primary action, active door, live numbers only): `oklch(0.52 0.095 192)`; white text on it about 5:1. Hover `oklch(0.46 0.09 194)`.
- water tint (fills inside the plan only): `oklch(0.86 0.06 195)` to `oklch(0.70 0.09 200)`
- field (deep water, ONE section: the service programme): `oklch(0.29 0.045 222)`, text on it `oklch(0.96 0.01 200)`, muted `oklch(0.80 0.03 210)`.

**Space:** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 desktop / 72 phone. 12-column grid, 24 px gutter, page margin clamp(20px, 4vw, 64px), max width 1360. Reading measure 62ch.

**Shape:** radii 4 (inputs, chips), 10 (plan sheet, cards), 999 only for the door switch thumb. Inner = outer minus padding (switch 10 outer, 4 padding, 6 thumb). Borders 1 px line. One shadow only: the plan sheet `0 1px 0 line, 0 24px 48px -24px oklch(0.25 0.02 235 / .18)`.

**Motion:** ease `cubic-bezier(.22,1,.36,1)`; feedback 180 ms; reveals 560 ms; outline draw 900 ms; water rise 700 ms; 3D layer moves 1.1 s (spring-damped in the render loop). Staggers: result rows 40 ms. Reveals are a 12 px rise plus opacity, no blur. Reduced motion: no draw or rise animation (final states shown), 3D shows the finished section as a still with all layer labels, caustics stop.

## 4. Screens

### Screen 1: the plan sheet beside the water (core tool)
- Purpose: show the product (their finished pool) and put the quote builder in hand.
- Desktop 1440x900: 12 columns. Columns 1 to 5: on the limestone ground, top: wordmark "Gunite Pools of Nassau" with "Since 1972" in muted cap; right of it nothing (the nav lives at top right over the ground, not over the photo: Work, How we build, Service, Repairs and store, About, and the phone (242) 397 1050). Below: h1 hero size, then the tool. Columns 6 to 12: their finished pool photograph, full height 100svh, bleeding to the right edge and top, no overlay, crop centred. A small caption bottom-left on the photo's own surface strip (plaster chip): "A Gunite Pools of Nassau project".
- h1: "Tell us about the pool you have in mind."
- Lead (Newsreader 20): "Three generations of the Whitehead family have built and serviced pools in the Bahamas since 1972. Start here, and your first call is a real conversation."
- Tool (column 1 to 5, about 560 px wide): door switch, then the active door. The plan sheet sits in the build door at 560 x 300.
- Primary action: "Send my request" (accent, filled).
- Phone 390: the photo first at 38svh, cropped to the pool's waterline; then the wordmark row overlaid on the ground above it (not over the photo); h1 42; lead hidden behind nothing (one sentence, shortened); the door switch visible on the first screen at about y 600; the plan sheet full width 350 x 210; controls stack.

### Screen 2: the work
- Purpose: prove they can build what the visitor imagines.
- Desktop: h2 left (cols 1 to 6) "Geometric or free-form. Clean simple lines or meandering curves." (their words) with a Newsreader lead: "From a residential pool to an Olympic size pool, for homeowners, architects, structural engineers, designers and main contractors." Right (cols 8 to 12): links "Residential portfolio" and "Commercial showpieces" to their pages.
- Below: a horizontal track of their own photographs, each shown at its native size or smaller, height 560, gaps 24, snap; arrows and a 01 / 07 counter in tabular cap. Drag and wheel-shift scroll on desktop, native swipe on phone (height 320).
- Phone: heading stacks, track full bleed.

### Screen 3: how a Gunite pool is built (3D anatomy)
- Purpose: explain the product and the craft; reassure that it is engineered.
- Desktop: a pinned stage, 5 screens tall. Left cols 1 to 4: chapter number and one sentence per stage. Right cols 5 to 12: the 3D section of a pool corner, studio-lit on the limestone ground: soil, compacted base, steel, gunite shell, plaster, waterline tile, coping, water. Each chapter brings its layer in.
  1. Design: "We design it with you, or with your architect, engineer, designer or main contractor." (soil block and string-line outline shown)
  2. Dig and steel: "The ground is excavated and a cage of steel is tied to the exact shape." (cut and rebar)
  3. Gunite: "Gunite, concrete sprayed at high pressure, is shot over the steel to form one seamless shell." (shell)
  4. Tile and finish: "Waterline tile, coping and the interior finish go on." (plaster, tile band, coping)
  5. Water: "Then the plumbing and mechanical systems are tested and the pool is filled." (water rises)
  Under the stage, one line: "We also offer plumbing systems, mechanical systems, full pool engineering and pool value engineering." and the list "Swimming pools, spas, water features, infinity edges, tension edges, play areas".
- Phone: the stage is 4 screens tall; the 3D sits in the top 58% (dpr 1), the chapter sentence below it.
- Fallback (no WebGL or reduced motion): the finished section still, with the five stages as a numbered list.

### Screen 4: the service programme (field colour)
- Purpose: sell monthly service to owners who are often away.
- Desktop: deep-water field. Left cols 1 to 6: h2 "Your pool, looked after when you are not there." Then the three promises as large numbered lines (not cards): 1 "A field manager visits monthly and reports on your equipment, chemicals and pool health." 2 "Technicians are tracked by GPS, so you can see when our staff were on site." 3 "Technicians are trained and reviewed every quarter." Then "New Providence and now Great Exuma." Button "Put my pool on the programme" (switches screen 1 to the service door and scrolls up).
- Right cols 8 to 12: a "monthly report" sheet on plaster, labelled "Sample layout, not a real client report": header with the visitor's island (live from door 2), rows: Visit logged by GPS (arrived, left, on site), Equipment, Water chemistry, Pool health notes, Next visit. Values are shown as example values in muted ink with an "Example" tag.
- Phone: report under the promises, full width.

### Screen 5: repairs, renovation, fiberglass tanks and the store
- Purpose: keep every other service, each with its own Request quote.
- Desktop: a ledger of four rows, each row 12 columns: cols 1 to 2 number, cols 3 to 6 name in h3 (28), cols 7 to 10 one Newsreader sentence, cols 11 to 12 action. A photo for the active (hovered or focused) row shows at the right, fixed in place, 420 x 520 (their own photo of that service). Rows: Repair and renovation, Fiberglass tanks, The store (23 Montrose Avenue, and shop online), New pool construction (link to screen 1). Then the two blog articles as text links: "Mesh vs. solid safety covers", "Backyard renovation ideas".
- Phone: rows stack; each row shows its photo inline at 350 x 240 above the text.

### Screen 6: since 1972, and contact
- Purpose: trust, then the close.
- Desktop: cols 1 to 6: h2 "A family firm since 1972." Newsreader body: founded in 1972 by Peter and John Whitehead; Thomas joined in 1973; Phillip in 2008; now entering its third generation of family ownership; wholly Bahamian owned; grown from residential pools to some of the largest and most complex commercial projects in the region. Cols 8 to 12: the people as a typographic list (name in Instrument Sans 23, role in cap muted): Phillip Whitehead, President; Peter Whitehead, Vice President; Thomas Whitehead, Vice President; José Viana, Director of Construction. "Member of the Pool and Hot Tub Alliance (PHTA)".
- The close (full width, surface band): h2 "Start with the pool you have in mind." with two buttons: "Start my request" (accent, back to the tool) and "Call (242) 397 1050". Under it: 23 Montrose Avenue, Nassau (Open in Maps link), Instagram, Facebook. Footer: production SEO note-free, concept label floats.
- Phone: stacked; buttons full width.

Mobile action: after screen 1 leaves view, a small dock bottom-right: "Request" (accent) and a call icon button; hidden again when the close is in view. `--concept-offset` set to 72 px while it shows.

## 5. The core tool: interaction spec
**Door switch:** two segments "Build or renovate" and "Service my pool"; the thumb slides (transform) 180 ms. Arrow keys move between doors (role=tablist). Default: build.

**Door 1, build or renovate**
- Shape chips (radio group): Geometric (default), Free-form, Infinity edge, With spa, Renovate my pool.
- Island select: New Providence (default), Paradise Island, Great Exuma, Another island.
- Stage chips: Just dreaming, I have plans, I have an architect (default: Just dreaming).
- Length slider: 16 to 60 ft, step 1, default 32. Width = round(length x 0.5) for geometric, infinity and spa; round(length x 0.55) for free-form. Renovation shows a dashed "existing pool" outline at the chosen size.
- Optional yard photo (file input, image/*): becomes the plan sheet backdrop at 35% under a plaster wash (object-fit cover, local only, never uploaded in the concept).
- Live readout (tabular): "32 x 16 ft · about 512 sq ft · roughly 19,000 US gallons at an average 5 ft depth". Gallons = round(area x 5 x 7.48 / 500) x 500. Free-form area = L x W x 0.82. Spa adds an 8 ft circle (50 sq ft) shown separately. Labelled "rough figure for planning, your quote follows a site visit".
- Plan sheet: SVG 600 x 320 viewBox, 5 ft grid in line colour, scale 8 px per ft, dimension lines with ticks along top and left, scale bar "10 ft", the outline in ink 2 px; the water fill in clip with a moving caustic texture (canvas-generated once, translated by transform).
- States: empty is never shown (defaults give a pool); filled shows shape; result after "Send my request": the request card rises (560 ms) with the composed text, "Copy request" and "Call (242) 397 1050". Error: none possible except clipboard failure, which shows "Select and copy the text above".
- Animations: on shape change the outline redraws (dashoffset 1 to 0, 900 ms) and the water rises from the deep end (scaleY, 700 ms, delay 300 ms). On length drag the shape and dimension figures update live without redrawing; numbers tick.
- Handoff text: "Hello Gunite Pools, I would like a quote. New pool: Free-form, about 36 x 20 ft. Island: New Providence. Stage: I have plans. Name / phone / best time to call." The visitor's name and phone fields (required) sit above the button.

**Door 2, service my pool**
- Island: New Providence (default), Great Exuma (only these two: their service area).
- Pool: Small (under 15,000 gal), Medium (15,000 to 30,000), Large (over 30,000), Not sure (default).
- On island: I live here, Part of the year, Rarely (default: Part of the year).
- Problems (checkboxes, optional): Green or cloudy water, Equipment trouble, Leak or losing water, None, just want reliable service.
- Shows "What the programme includes" as three ticked lines (the promises), and a link "See a sample monthly report" to screen 4, whose header shows the island chosen here.
- Same name/phone fields, same result card: "Service request: New Providence, medium pool, part of the year on island. Issues: green water."
- Keyboard: every chip is a native radio or checkbox; focus rings 2 px accent offset 2.

## 6. Signature details
1. Dimension lines on the plan tick to the new length in tabular figures as you drag, like an architect's drawing.
2. Water fills the outline from the deep end, with a slow caustic shimmer that stops off-screen.
3. Your own yard photo becomes the drawing's backdrop.
4. The 3D section assembles in the real build order; the gunite shell lands with a short settle, and the water rises last.
5. The service report sheet takes the island you chose in door 2.
6. "Since 1972" sits beside the wordmark like a maker's stamp, and the close repeats the phone in tabular figures.

## 7. Photography plan (all their own, hotlinked from their Wix CDN, width/height set to the requested size)
- Hero: `9bfda6_e527856dbc984ae495f3beedf614b251~mv2.jpg` fit w_2880 h_2160 (their homepage lists w_4000), shown about 840 px wide desktop, cover crop centre. Alt: "A finished pool by Gunite Pools of Nassau".
- Work track (shown at height 560, so each is requested at height 1120 or its maximum):
  - `9bfda6_f1f2204f4da5433688973d6dc46af464~mv2.jpg` fit 1920 x 1736 (native 3593 x 3248)
  - `9bfda6_c167d0652a034a8b9438af04fceed5d2~mv2.jpg` fit 1200 x 900 (native 1200 x 900)
  - `9bfda6_901a45dda1b04d489590b8b7fec19a17~mv2.jpg` fill 1905 x 879 (as served on /newpool)
  - `9bfda6_7c930183e5054c3288f6bd84808f2138~mv2.jpg` fill 1905 x 830 (their homepage hero)
  - `9bfda6_d8dbe7a374174a66816250b058d67ee4~mv2.jpg` fill 1200 x 574 (as served on /newpool)
  - `9bfda6_4e1c0cb9f4894a78a8cfeafb7e61221a~mv2.jpg` (KPC_0322A, new pool construction tile) fill 858 x 1005
- Service rows: maintenance `9bfda6_3147dca4edd749e88b24dc4c5b06036c~mv2.jpg` crop of a 3024 x 4032 original, fill 840 x 1040; fiberglass tanks `9bfda6_23760d4236cb48a989560ebbbd3d9ca1~mv2.jpg` (4032 x 3024) fill 840 x 1040; repair `9bfda6_dab0b309b23541cf978c3e1a0ea96a8e~mv2.jpeg` (about 1280 x 720) fill 615 x 720; blog safety covers `9bfda6_7d0d168c6d754855bb497e42fd3c32ee~mv2.jpg` fill 665 x 663.
- Not used: the stock-named files and the "Amarillo ... Portafolio" image (spec), the 116 px Instagram thumbnails.
- Grade: none applied in CSS (their own colour); every image sits on a tinted placeholder of the water tint at the right aspect ratio. Captions never claim a location or client (unknown).

## 8. Self-review
- Screen 1 sells the product (their finished pool at full height) and the visitor can complete the whole request without scrolling on desktop; on a phone the door switch is on screen 1 and the form continues just below.
- Craft A1 to A20:
  - A1 no badges. "Example" tag on the sample report is a truth label, kept.
  - A2 no "Phone:" labels.
  - A3 italics only in captions and the one pull line of their own words.
  - A4 no mono; tabular sans instead.
  - A5 tokens above, used only.
  - A6 the real product: their pools, their 3D layer build.
  - A7 the plan sheet is the largest element in the left column.
  - A8 spacing groups, few lines; the ledger uses one hairline per row (justified: a ledger).
  - A9 headlines are specific and in their words.
  - A10 one accent action per screen.
  - A11 accent only on primary, active door, live numbers.
  - A12 lucide icons only, 1.75 stroke, 18 px, few.
  - A13 no gradients except the water inside the plan.
  - A14 concentric radii noted.
  - A15 no text on photos except the plaster caption chip.
  - A16 balance and pretty everywhere; check 390 px.
  - A17 optical alignment of the switch labels and the counter.
  - A18 tabular on all figures.
  - A19 tinted placeholders with aspect ratio; 3D has a poster still.
  - A20 motion only for the draw, fill, layer build and result.
  - Needing care: A7 on phone (plan sheet must stay big), A15 caption chip contrast, A19 the 3D poster.
- Unmistakably this business: Gunite's own pools, the build order of a gunite shell, the GPS-verified monthly report, the Whitehead family and José Viana, Montrose Avenue. No other site in the repo is a drawing table or a pool anatomy.
- Deviations from the spec, decided: no real yard photo of theirs exists, so the outline is drawn on a plan sheet and over the visitor's own yard photo if they add one. The construction sequence uses a 3D section because their site has no labelled construction photos. No email or WhatsApp was found, so the request is copied and the phone is the hand-off (assumption to confirm: the inbox the live form would post to).
