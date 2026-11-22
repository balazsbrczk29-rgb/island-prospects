# Thermoset Roofing Bahamas Ltd.: design.md (2026-11-22, job-spec build)

## 1. The idea in one paragraph
A facility manager arrives after a storm with one question: can these people handle a building like mine? Screen 1 answers it with a work order, not a brochure. On the left the request: what the building is, what is wrong, the roof type and the island. On the right their own crew laying membrane on a flat commercial roof, and under it the answer: the Thermoset service or R.A.D.A.R. plan that fits, the buildings like yours they have already roofed (from their own client list), and the request ready to send to the General Manager, with direct lines to him and to the owner. Below, the client index filters to the same type, the 3D roof build-up explains the work, R.A.D.A.R. sells the maintenance plan, six manufacturer certifications stand as the credentials, and the close puts two named people and three numbers in reach.

## 2. Inspirations
- **Arup project finder:** a dense, typographic index that filters live by sector. I take the client index with type filters and a count ("14 of 58").
- **Linear's changelog/forms:** chips that read like a spec sheet, one decisive result block. I take the chip form and the single result card that rewrites itself.
- **Teenage Engineering OP-1 page:** the object large on a flat field, specifications as a quiet table. Kept from our previous version: the 3D roof build-up, now the services explainer below the request.

## 3. Tokens (kept from the approved previous version, Balazs: "keep this design composition and individuality")
- **Type:** Hanken Grotesk only (variable, self-hosted), a Swiss grotesk: precise, engineered, unlike the serif hospitality sites. Scale: 14 / 16 / 18 / 22 / 56 (h2) / clamp(48px, 4.6vw, 72px) h1. Display tracking -0.035em, leading 1.0 to 0.95. Body 18/1.5. Labels 14 600 sentence case.
- **Colour (OKLCH, hex in CSS):** ground limestone `oklch(93.6% 0.014 85)` #efeae0; paper `oklch(97.2% 0.009 85)` #f8f5ee; ink `oklch(21.6% 0.006 85)` #1b1a17; muted `oklch(50.3% 0.016 80)` #6a655b (5.0:1 on ground); line ink at 16-30%; accent sea glass (their logo teal) `oklch(48.6% 0.06 195)` #2c6c70, reserved for the primary action and the selected state; field colour: the sea-glass section (clients) and the ink close.
- **Space:** 4/8 scale; page pad clamp(20px, 3.6vw, 56px); section padding 128 desktop / 72 phone; 12-column grid, 24 gutter; measure 60ch.
- **Shape:** radius 3 px on buttons and chips (engineered, not pill), 6 px on the result card and photos. No shadows except none. Rules 1px ink 16%.
- **Motion:** ease cubic-bezier(.22,1,.36,1). Chips 160 ms. Result card: content crossfades and slides 8 px (220 ms) on every change; the "buildings like yours" names stagger in 40 ms each. Client index: layout animation of filtered names 300 ms. Reduced motion: instant swaps; 3D build-up falls back to the still posters.

## 4. Screens
### Screen 1: the work order (index)
- Desktop 1440x900: top bar 64 px (name left; Clients, Services, R.A.D.A.R., Contact; office number). Grid 12 cols. Cols 1-6: H1 "The roof over the brands you know, and over yours." Lead: "Roofing and waterproofing across New Providence and the islands since 2002. Every estimate is free." Then the form: Building (5 chips), Problem (5 chips), Roof type (Flat / Pitched / Not sure segmented) and Island (select). Cols 7-12: their photo IMG_4711 (crew installing membrane on a flat commercial roof), frame ~690x400, then the result card on paper: "We'd recommend" + service name + one line from their services page; "Thermoset has roofed" + 4 names for the chosen type; primary "Send the request to Croix Culmer, GM" (email), secondary call GM, call Stuart Culmer (owner), office.
- Phone: bar 56; H1 40 px; lead; photo 16:10 full width; form; result card; buttons full width.

### Screen 2: the roof over the brands you know (#clients, sea-glass field)
- H2 "The roof over the brands you know." with count; filter chips (All, Resorts and hotels, Churches and institutions, Commercial, Industrial, Homes) + search field. Names in 4 columns (2 on phone) at 22 px; matching names stay, others collapse with layout animation. Footnote: grouping by type is ours, names are from Thermoset's portfolio page.

### Screen 3: services with the system build-up (#services)
- The kept 3D anatomy, now introduced by H2 "How a Thermoset flat roof goes on, layer by layer." with its six layers, then their job photos (kept Work strip) and the full services list by group (kept).

### Screen 4: R.A.D.A.R. (#radar)
- Kept: the name spelled out, six benefits, three plans; primary "Book a free roof health assessment" presets the request (Problem: maintenance plan) and scrolls to it.

### Screen 5: certified for these manufacturers (#certified)
- One line: "Licensed, insured and factory certified installers of" then the six names as a large typographic row (Carlisle, Elevate, Englert, Sika, Siplast, Tremco), 48 px desktop, wrapping on phone. Second line: "Serving The Bahamas since 2002. 100% Bahamian owned."

### Screen 6: contact (#contact, ink close)
- H2 "Two Culmers, one office." Office number + address; Stuart Culmer, Owner and President; Croix Culmer, General Manager; phones and emails as large tabular text. Primary "Start a request" back to screen 1. No tax ID.

## 5. The core tool
Inputs (defaults): building = Commercial; problem = Leak now; roof = Not sure; island = New Providence.
Recommendation rules (all service names from their services page):
- Leak now: "Leak detection and emergency repairs" (+ for non-home: "R.A.D.A.R. members get priority emergency service").
- New roof: flat -> "TPO and PVC single-ply membrane systems" (or "Modified bitumen and torch-applied systems"); pitched -> "Standing seam and metal roofing" or "Shingle roofing"; not sure -> "A free estimate on site".
- Re-roof: "Roof replacement and re-roofing", plus the flat/pitched system line.
- Waterproofing: "Terrace and balcony waterproofing" with the planter, curb and overburden lines.
- Maintenance plan: R.A.D.A.R. plan by building: commercial -> commercial complexes; industrial -> industrial facilities; home -> luxury residential estates; resort and institution -> "R.A.D.A.R., scaled to your property".
Buildings like yours: the first four names of the chosen type from the client index (homes: Villa Lyla, Caves Heights).
Hand-off: mailto croix.culmer@... cc stuart.culmer@..., subject "Free estimate request: {problem}, {building}", body lists every choice. Calls: GM (242) 525-7326, owner (242) 422-4923, office (242) 328-7017.
Events: choosing the building dispatches `tr:type` so the client index filters to the same type; `[data-job]` links preset the problem and scroll to the tool.
Keyboard: chips are radio groups (native radios, visually chips); select is native.

## 6. Signature details
1. The result card rewrites itself with a short slide while the photo stays still: the decision feels instant.
2. "Thermoset has roofed" names stagger in, and the client index below quietly filters to the same type.
3. The count in the index ticks ("14 of 58") as you filter or search.
4. The kept 3D roof builds layer by layer with leader lines named from their services list.
5. The manufacturer row sets the six certifications as type, not logos, so it reads like a spec.

## 7. Photography
Their own Squarespace job photos via `?format=` renditions (native sizes unknown, so shown at or below the requested rendition): hero IMG_4711 at format=1500w (attrs 1500x1125, shown ~690 wide). The Work strip keeps its photos at 1000w. Third-party resort photos are never used. 3D posters are our own renders (labelled in the footer).

## 8. Self-review
- Screen 1 sells and does the job without scrolling on desktop (form, recommendation, names and the send button inside 900 px). Phone: one thumb scroll to the result.
- A1 no badges. A2 no "Phone:" labels; names and roles label the numbers. A3 no italics. A4 no mono. A5 tokens in styles.css. A6 their real crew photo, real client names. A7 the tool is the largest element on screen 1. A8 grouping by space. A9 specific headlines (brands you know, two Culmers). A10 one primary per screen. A11 sea glass only for primary and selected. A12 no icons except none. A13 no gradients. A14 radii 6 outer / 3 inner. A15 muted 5.0:1. A16 balance/pretty. A17 chip text optically centred. A18 tabular phones and counts. A19 tinted placeholders. A20 motion explains the change.
- Care: the client typing is our grouping of their names (stated on page); the hero must not repeat the old "object study" hero; the 3D section is now below the fold so it must not block first paint.
