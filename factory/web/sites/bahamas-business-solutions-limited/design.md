# Bahamas Business Solutions Limited (BBSL): design.md
Written Nov 22 from the approved job spec. Generation 2 rebuild of the Nov 5 concept: keep its print-proof language, 3D document stack, product index, coverage chooser, quote router, office switcher and Document Centre ticket; move the router to the hero.

## 1. The idea in one paragraph
The whole site is a service counter printed on a proof sheet. On screen 1 the visitor sees, beside a short heritage line ("The Bahamas' Xerox company since 1966"), one large job ticket with three doors: **My machine is down**, **I need equipment or a print contract**, **I have a print job**. One tap and the ticket becomes the right short form in place, already addressed to the right BBSL desk, with that desk's phone number for the visitor's island as a button. Pick "My machine is down" and the ticket header types itself out ("SERVICE TICKET · NASSAU"), a live status lamp says whether the helpdesk is open right now (Mon to Fri 8:30 am to 5:00 pm, Nassau time), and "Call the helpdesk (242) 605-6006" sits one tap away. Nobody has to find the Service page again.

## 2. Inspirations
- **Stripe Docs / Stripe support "contact" flow:** a question first, then the form changes in place; no separate pages, the summary of what will be sent is always visible. Taken: the in-place router and the live "what we will send" summary.
- **Teenage Engineering product pages:** technical labels set small in mono beside large calm type, instrument-like status lamps. Taken: the helpdesk status lamp and mono only for data (hours, numbers, ticket fields).
- **Pentagram's print-production case studies (crop marks, colour bars, slug lines):** taken from our previous version and kept: the proof frame with crop marks, CMYK-style colour bar and a slug line on screen 1.
- Professional-services playbook reference: one serif paired with one clean sans; one accent reserved for the primary action.

## 3. Tokens
**Type**
- Display: Instrument Serif 400 and italic (self-hosted @fontsource). A book face with a printer's ink trap feel; it reads as "documents" and heritage, not tech.
- Text: Geist Variable 400/500/600. Data: Geist Mono Variable (ticket fields, hours, phone numbers in lists, the slug line). Tabular figures on all numbers.
- Scale (px): caption 13 / body 16 / lead 19 / h3 26 / h2 clamp(40, 4.4vw, 60) / hero clamp(48, 6.2vw, 92).
- Leading: 1.45 / 1.6 / 1.5 / 1.15 / 1.0 / 0.92. Tracking: display -0.025em, h2 -0.02em, body 0, mono captions +0.04em (never wide tracked uppercase eyebrows; type system has none).

**Colour (OKLCH)**
- ground paper `oklch(95.3% 0.008 90)`; field paper-2 `oklch(91.5% 0.013 88)`; surface sheet `oklch(98.6% 0.005 90)`.
- ink `oklch(18.5% 0.006 255)`; graphite `oklch(26.5% 0.01 250)` (one dark field: the Service screen); muted `oklch(47% 0.008 250)` (6.1:1 on paper); line `oklch(85% 0.015 85)`.
- accent process cyan `oklch(48% 0.09 225)`, hover `oklch(40% 0.08 225)`: ONLY primary actions, the active door, the open-now lamp ring and the selected plan.
- toner yellow `oklch(80% 0.16 88)`: small labels on the dark Service field, the "closed" lamp. Never on paper as text.
- Status green for "open now" lamp dot `oklch(62% 0.15 150)`, paired with text, never colour alone.

**Space**: 4/8 scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Section padding 128 desktop / 72 phone. Container 1320 px, side padding 56 desktop / 20 phone. 12 columns, 24 px gutter. Text measure max 62ch.

**Shape**: square corners everywhere (paper and machines; radius 0), 1 px hairlines in line colour, one soft shadow only, on the hero ticket and the stack detail sheet: `0 1px 0 line, 0 30px 60px -32px oklch(18% 0.01 250 / .28)`.

**Motion**: ease-out `cubic-bezier(.22,1,.36,1)`, ease-in-out `cubic-bezier(.77,0,.175,1)` for masks. Feedback 180 ms, door open 420 ms (height and content crossfade, origin at the tapped door), reveals 600 ms clip-path wipes from the top edge (a sheet coming out of the printer), stack scene moves 1.2 s damped. Ticket header types at 28 ms per character. Staggers 60 ms on list rows. Reduced motion: no typing (header appears complete), no stack drift, wipes become instant.

## 4. Screens
**Header (not sticky):** wordmark left (boxed italic B + "Bahamas Business Solutions", "Since 1966 · Nassau · Freeport" in mono 12); nav Equipment, Service, Document Centre, Offices; right: Nassau and Freeport numbers in mono as text links. Phone: wordmark + menu button (sheet with nav and all five numbers).

**Screen 1. The counter (router hero).** Purpose: route every visitor to the right desk. Desktop: proof frame with crop marks inset 24 px, colour bar top-right, slug line bottom-left ("BBSL · Proof 01 · Global Technology. Delivered Locally."). Left cols 1 to 5: H1 "Tell us what you need. The right BBSL desk answers." Lead: "The Bahamas' Xerox company since 1966. Copiers, printers, ATMs and point of sale, sold and serviced by our own engineers in Nassau and Freeport." Under it the authorised marks as a set text list (Exclusive Xerox distributor · Authorised NCR dealer and service centre · OnBase by Hyland representative) and the two office numbers. Cols 6 to 12: the job ticket (sheet, 640 px wide) with three doors as large rows (serif 30, number in mono, one-line description, arrow). Tap opens that door's form inside the ticket. Primary action inside each form: cyan "Send to service@bbsl.com" (etc.). Phone: H1 (3 lines at 44 px), the three doors immediately (each 76 px tall), lead and marks after the ticket.

**Screen 2. What BBSL handles (the stack).** Purpose: show the six product lines. Desktop: left 7 cols the R3F fanned stack of six sheets (each a document a line produces: colour proof = Xerox, receipt = NCR, indexed record = OnBase, network port map = Lenovo and HP, address-window letter = Neopost, access log = security); right 5 cols the product-line index (six serif rows) and the detail sheet for the active line. Picking a sheet selects the line and the reverse. H2 "World brands, sold and serviced from two islands." Phone: canvas 300 px tall above the index; detail sheet opens under the selected row. Canvas lazy, paused off screen, poster = paper colour with the sheet edges.

**Screen 3. Service that comes to you (graphite field).** Purpose: will an engineer come, which plan covers what. Left 5 cols: H2 "We service everything we sell." engineers line (factory-trained, industry-certified, some with 25+ years), helpdesk hours with live lamp, carry-in service centre, call button. Right 7 cols: comparison table, three plan columns (Time and materials, Full-service maintenance, Managed print) by rows Labour, Parts, Toner and supplies, Paper; tap a column to select it, CTA "Ask about managed print" opens the hero router on the equipment door with that plan preselected. Below: the eight service options as a two-column list. Phone: plan chooser (three segmented buttons) and one column at a time.

**Screen 4. The Document Centre.** Purpose: print customers. Left: H2 "Send the file. Collect the job." services list (ten items, two columns), remote submission line, (242) 605-6027 and copyservice@bbsl.com. Right: a stacked nested-format diagram is dropped (decorative); instead a small job ticket preview linking to `document-centre.html` and a button "Start a print job" opening the hero router's print door. Phone: list then buttons.

**Screen 5. Since 1966.** Purpose: trust. H2 "Sixty years of keeping island offices printing." Horizontal row of five dated sheets (1966, 1968, 1987, 2002, Today). Figure line: "3,000+ customers across The Bahamas and the Turks and Caicos Islands · 80+ full-time employees · 100% Bahamian owned" (sourced). Sector line (government, commercial and private banks, utilities, healthcare, hotels and hospitality) set as a quiet sentence, not a marquee. Phone: snap scroller of the five sheets.

**Screen 6. Questions** (kept accordion, 5 questions answered only from sourced facts).

**Screen 7. Two offices.** Switcher Freeport / Nassau, number, address, P.O. box, hours line, map embed (with a paper placeholder that shows the address if the map cannot load). H2 "Two islands, one team." Close line: "Or start at the counter" back to the router.

**Footer (ink):** wordmark, both offices, four inboxes, concept credit.

**Phone primary action:** a floating "Call a desk" button bottom-right (appears after the hero, hides near the offices section) that opens a bottom sheet listing Service (242) 605-6006, Sales Nassau (242) 605-6000, Freeport (242) 688-8100, Document Centre (242) 605-6027. `--concept-offset` not needed (button sits right, tag sits left).

**document-centre.html** keeps the previous page (hero, tick-what-you-need ticket, contact) restyled to the new tokens and container.

## 5. The core tool: interaction spec
- Inputs: door (none | down | equip | print). Common: island (Nassau / Freeport, default Nassau; picks the office line). 
- **Down:** machine type (Xerox copier or printer, NCR ATM, NCR point of sale, PC or network, other), make and model (text), what is happening (symptom chips: Will not power on, Paper jam, Error code on screen, Print quality, Not connecting, Other + free text), business name, contact name, phone. Shows: status lamp (open / closed with next opening, computed in America/Nassau), "Call the helpdesk (242) 605-6006" (tel), carry-in note, primary "Email the ticket to service@bbsl.com".
- **Equipment:** product line (Xerox, NCR ATMs, NCR point of sale, OnBase, Lenovo and HP, Neopost, Security, Not sure), size (pages per month: under 5,000 / 5,000 to 20,000 / over 20,000 / not sure; or number of sites for NCR), plan preference (Time and materials / Full service / Managed print / Advise me) with a three-line coverage note, organisation, name, phone. Hands off to sales@bbsl.com; subject "Xerox quote request" when Xerox is chosen (keeps their separate Xerox quote route), otherwise "Equipment quote request". Shows the Nassau (242) 605-6000 or Freeport (242) 688-8100 line by island.
- **Print:** job type (ten Document Centre services), size (Letter, Legal, Tabloid, Plan, Wide format, Other), quantity, needed by (date), files (I will email them / I will bring them in), collect in (Nassau / Freeport). Hands off to copyservice@bbsl.com, shows (242) 605-6027.
- States: closed (three doors), open (form), sending (button label "Opening your email app" 600 ms), sent (ticket stamped "Ready to send" with the summary and a "Start another" link). Error: none blocking; empty fields are simply left out of the email, required only: contact name or phone (inline message "Add a name or phone so the desk can reply").
- Animation: the chosen door slides to the ticket header (layout animation, 420 ms), the other two collapse; header text types out; form rows stagger in 40 ms. Back button "All desks" reverses. Interruptible (motion layout).
- Keyboard: doors are buttons; Escape returns to all desks; focus moves to the first field on open. Touch: 48 px targets, chips 44 px.
- Formula: mailto with subject and body lines `Field: value` for every filled field, plus "Sent from the BBSL website counter". No prices anywhere.
- Open-now: weekday 1 to 5 and minutes between 510 and 1020 in America/Nassau via Intl.DateTimeFormat; otherwise "Closed, opens Monday 8:30 am" / "opens 8:30 am".

## 6. Signature details
1. The ticket header that types out per door ("SERVICE TICKET · NASSAU"), and re-types the island when the island changes.
2. The helpdesk status lamp: a small dot with a ring that breathes once when the helpdesk is open, text "Helpdesk open now, until 5:00 pm".
3. A live summary strip at the foot of the ticket in mono: "To service@bbsl.com · 4 lines" that ticks as fields fill (tabular numbers).
4. Crop marks and colour bar framing screen 1, and each later section starting with a hairline and a mono slug ("Proof 02 · Equipment") at the right edge instead of an eyebrow.
5. Sheets in the 3D stack lift toward the viewer when their line is picked in the index.
6. The "sent" stamp: a cyan square stamp rotates -4 degrees into place on the ticket.

## 7. Photography plan
BBSL publishes no usable photographs (vendor logos and one banner only; re-checked in the Nov 5 brief). No stock, no generated photos of "their" engineers. The visual is the procedural 3D paper stack (canvas-drawn document faces, studio lit) and print-production typography. Assumption for the owner: send showroom, Document Centre and engineer photos to replace the stack poster and add a Service screen photo. No `<img>` photos on the page, so no native size issues.

## 8. Self-review before coding
- Screen 1 sells the product and the job: yes, the three doors are the largest element and each completes without scrolling (forms fit in the ticket, scroll within page on phone only for the longer equipment form).
- A1 badges: none. A2 labels: no "Phone:" prefixes; desk names only where they disambiguate. A3 italic: only the last H1 line? No: italic only for the boxed B and quoted tagline. A4 mono: only hours, numbers, ticket fields, slug line. A5 tokens: all in styles.css @theme. A6 product: the doors are the product (desks); stack shows the lines. A7 enlarge: ticket is 7 of 12 columns. A8 spacing groups: yes. A9 specific headlines: "We service everything we sell", "Two islands, one team" (fine), H1 names BBSL. A10 one primary per screen: cyan button. A11 accent sparse: checked. A12 lucide only, 16/20 px. A13 no glow, no gradient: remove the backdrop blur from the previous header. A14 square corners, n/a. A15 contrast: muted 6.1:1, paper-on-graphite 12:1, toner on graphite 8:1. A16 balance/pretty on all headings and paragraphs. A17 arrows nudged. A18 tabular-nums on body. A19 canvas poster and placeholder for the map. A20 motion explains (door opening, typing, stamp).
- Needs care: phone first screen height (keep H1 at 3 lines), the 3D canvas cost (dpr cap 1.25 on coarse pointer, frameloop paused off screen), eyebrow regex (no wide tracked uppercase labels).
- Unmistakably BBSL: the proof sheet, the Xerox heritage, the three BBSL desks and five real numbers. Different from other professional and B2B sites in the repo: no photography hero, no dark hero, a working service ticket as the hero.
