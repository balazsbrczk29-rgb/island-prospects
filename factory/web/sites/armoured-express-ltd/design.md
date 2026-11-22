# Armoured Express (Bahamas) Ltd.: design.md

## 1. The idea in one paragraph
**The site is a custody manifest.** A treasury or risk manager lands on a ruled stone page that reads like the paperwork of a bank-grade supplier: on the left, the plain line "The Bahamas' armoured courier, since 1961." with the technical drawing of their truck rolling in along a road rule; on the right, the largest thing on screen, a service request sheet. They tick what they need (ATM replenishment, 6 ATMs, Grand Bahama, daily) and the custody line beside the inputs redraws for that exact run: each hand-off (your site, locked transit bag, armoured vehicle, ATM, signed back) drops into place and is stamped "Signed", with the stated safeguard that covers that step written beside it. The request summary writes itself under the line and hands off to "Call 242-323-4430". Before they ever pick up the phone they have seen the process they would be buying, and they hold a summary to read to the office. Sober, exact, accountable: a bank's supplier, not an action film.

## 2. Inspirations
- **Stripe Press / stripe.com docs:** ruled, quiet paper, tabular numerals, one dark ink; we take the "document as interface" restraint and the hairline rules.
- **Linear's changelog timeline:** a single vertical line with nodes that animate in order on change; we take the line + node + stagger for the custody line.
- **Swiss railway (SBB) timetables and airline waybills:** the stamp, the step code, the run header ("Run: ATM replenishment · 6 ATMs · Grand Bahama · Daily"); we take the manifest grammar and the fixed columns.
- Playbook industrial-b2b: "show the process the buyer is buying"; enquiry recipe (summary + call handoff).

## 3. Tokens
**Type.**
- Display and UI: **Libre Franklin** variable (self-hosted). A Franklin Gothic heir, the grotesque of American banknotes, ledgers and bank signage: heavy (800) in sentence case for display, 500/600 for UI and labels. Kept from the previous version (spec Keep).
- Running text: **Source Serif 4** variable (opsz), 400, for paragraphs, the history and the safeguard notes: the voice of an annual report. Pairing not used elsewhere in the repo.
- Scale (px), leading, tracking:
  - t1 caption 14 / 1.45 / 0
  - t2 body 17 / 1.6 / 0 (serif body 18 / 1.6)
  - t3 lead 21 / 1.45 / -0.005em
  - t4 h3 30 / 1.12 / -0.02em
  - t5 h2 48 / 1.02 / -0.03em
  - t6 hero 76 / 0.96 / -0.035em (phone 40 / 1.02)
- Tabular figures (`tnum`) on all phone numbers, step codes, counts, hours and years.

**Colour (OKLCH).**
- ground (stone) `oklch(0.955 0.006 95)`
- surface (manifest sheet) `oklch(0.985 0.004 95)`
- field (stone 2, one section) `oklch(0.915 0.009 95)`
- ink `oklch(0.21 0.012 260)`
- muted ink `oklch(0.46 0.012 260)` (6.1:1 on ground)
- line `oklch(0.86 0.008 95)`
- steel (dark field, sister-company section only) `oklch(0.29 0.02 245)`, text on it `oklch(0.95 0.005 95)`, muted on it `oklch(0.78 0.01 245)`
- **accent brass `oklch(0.5 0.085 78)`**: reserved for the primary action (Call / Request) and the active service. Brass on dark: `oklch(0.78 0.08 82)`.
- stamp: ink-steel `oklch(0.36 0.04 250)` at a 2px border, rotated -4deg (not the accent).
- No red, no black-and-yellow hazard look.

**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 desktop / 72 phone. Container 1280 max with 48 px side padding (24 tablet, 20 phone); 12 columns, gutter 24. Text measure 62ch max.

**Shape.** Square corners throughout (radius 0; ledgers and plates), except the stamp (radius 2). Borders 1px line; the manifest sheet has a 1px ink/12% border and the only shadow on the site: `0 1px 0 line, 0 30px 60px -40px oklch(0.21 0.012 260 / .35)`.

**Motion.** Easing `cubic-bezier(.22,1,.36,1)` (out) and `cubic-bezier(.65,0,.35,1)` (in-out for the line). Feedback 160 ms, reveals 500 ms, truck arrival 1.4 s, custody line redraw 600 ms with nodes staggered 90 ms and stamps 140 ms after each node. Reduced motion: truck parked, line drawn, stamps present, no stagger.

## 4. Screens
### Screen 1: the manifest (hero + core tool)
- **Purpose:** say who, what, since when; let the visitor build their run and call.
- **Desktop (1440 x 900):** a quiet top row (not sticky): wordmark left ("Armoured Express" 800 + "(Bahamas) Ltd., est. 1961" in 14 muted), nav centre-right (Services, Custody, Security Services, Since 1961, Contact), phone 242-323-4430 as text right with "Office open now" / "Office closed, 24-hour support for clients" dot (live, Nassau time).
  - Columns 1-5: one plain line "Stapledon Gardens, Nassau · Nassau and Grand Bahama" (14 muted), h1 76 px "The Bahamas' armoured courier, since 1961." (3 lines), a serif lead (21): "Cash in transit with armoured vehicles and armed, uniformed guards; ATM replenishment and first-line maintenance; air courier to the Family Islands. 100% Bahamian owned and operated." Below, the truck elevation drawing (about 520 x 160) rolling in along a road rule from the left to a stopped position; under it a single tabular line: "Public liability cover up to $2,000,000 · 24-hour support".
  - Columns 6-12: **the manifest sheet** (surface, about 780 x 700). Header row: "Service request" (t4) + run code "AE-REQ" + date today (tabular). Two inner columns:
    - left (inputs, 46%): Services (6 toggle rows, checkbox squares, multi-select), Island (3-way segmented), Sites or ATMs (stepper − n +), Frequency (Daily / Set days / On call; Set days reveals 7 day toggles), Sector (select).
    - right (custody line, 54%): run header in t1 tabular, then the vertical line with 4 to 6 nodes, each node: code 01..06 (tnum), step title (17/600), place line (14 muted, personalised: "Your 6 ATMs, Grand Bahama"), safeguard (serif 15 muted), stamp "Signed".
    - footer bar across the sheet: the summary sentence (serif 17), then **Call 242-323-4430** (brass, primary), "Copy summary" and "Print" (text buttons).
- **Phone (390 x 844):** top row: wordmark + call icon + menu. h1 40 px (4 lines), serif lead (17), truck drawing full width (about 350 x 108), primary "Plan your request" (brass) and "Call 242-323-4430" (outline) side by side, all inside 844. The sheet follows full-bleed: inputs first, then the custody line, then summary + call. A fixed bottom bar (Request / Call) appears only after the sheet scrolls past and hides over the contact section.

### Screen 2: services in depth
- **Purpose:** compare the four Armoured Express services.
- **Desktop:** h2 left cols 1-6 "Four services from one armoured fleet." Then a ledger: four rows full width, each row in 12 cols: code + name (cols 1-3, t4), what it is (cols 4-7, serif 18, from their listing), "Have ready when you call" (cols 8-10, 3 short lines, 15), "Plan this run" text button (cols 11-12) that sets the planner to that service and scrolls up. Hairline rules between rows; hover shifts the name 4 px and inks the rule.
- **Phone:** rows stack: name, description, have-ready list, button.

### Screen 3: how a consignment is protected
- **Purpose:** show the insurer and risk manager every stated safeguard.
- **Desktop:** h2 "Every hand-off, accounted for." cols 1-5 with a serif paragraph. Below, the truck drawn large (full container width, about 1180 x 360) as a technical elevation, with six leader-line callouts that draw in as the section scrolls into view (function transform, once): Armoured vehicle (secure armoured vehicles), Surveillance (surveillance-enabled cash in transit), Transit bags (secure locked transit bags), Crew (highly trained, uniformed, armed guards), Countermeasures (security countermeasures best practice), Cover (public liability up to two million dollars). Under it a two-column definition list repeating the six safeguards in their words plus "Armoured Services Officers cross-trained in physical security as part of a business continuity plan" and "A seasoned management team of armoured security experts".
- **Phone:** the drawing scales to full width with numbered markers 1 to 6 only; the list below carries the numbered text.

### Screen 4: the sister company (steel field)
- **Purpose:** Security Services (Bah.) Ltd., static guards and aviation security.
- **Desktop:** steel field. Left cols 1-6: "Two companies, one family, one mission." (t5, their line). Right cols 8-12: two ledger rows (Static guards; Aviation security) with a short serif line each and a "Plan this" text button; note that Armoured Services Officers are cross-trained in physical security.
- **Phone:** stacked.

### Screen 5: since 1961
- **Purpose:** heritage as proof.
- **Desktop:** field ground (stone 2). A horizontal rule timeline across 12 cols with three stops: 1961 (founded as Burns Security International; pioneered the armoured security industry in The Bahamas), First (the first to cater to the demand for ATM services), Today (100% Bahamian owned and operated, Nassau and Grand Bahama, over 60 years). Years in t6 Franklin 800 tabular. h2 above: "Pioneers of armoured security in The Bahamas."
- **Phone:** vertical rule, same three stops.

### Screen 6: contact and close
- **Purpose:** call with the summary in hand.
- **Desktop:** cols 1-6: h2 "Read your request to the office." the summary again (shared state, serif 21) with Call 242-323-4430 (brass, large tabular) and Copy; the second line 242-328-6841; hours Mon to Fri 9:00 to 5:00 with the live open/closed status; 24-hour support for clients; address Stapledon Gardens, P.O. Box N-4499, Nassau. Cols 7-12: map iframe (Stapledon Gardens) at 4:3 with a stone placeholder.
- Footer: ink strip, wordmark, both companies, the two numbers, "Concept by ESTATIQ AI Solutions. Details from the company's public listing, to be confirmed."
- **Phone:** stacked, the map below at 4:3.

## 5. The core tool: interaction spec
- **Inputs and defaults:** services = {ATM replenishment} (focused), island = Grand Bahama, count = 6, frequency = Daily, days = Mon/Wed/Fri when Set days, sector = Bank or credit union. (Defaults show the spec's wow run immediately, not an empty state.)
- **Services:** Cash pickups; ATM replenishment; ATM first-line maintenance; Family Island air courier; Static guards (Security Services); Aviation security (Security Services). Clicking a row toggles it; the clicked row becomes the focused route. Tabs above the line list the selected services when more than one is ticked.
- **Routes (step, place, safeguard):**
  - Cash pickups: 01 Collected at your premises (guards: highly trained, uniformed and armed) · 02 Sealed in a locked transit bag (secure locked transit bags) · 03 In the armoured vehicle (surveillance-enabled cash in transit; public liability up to $2,000,000) · 04 Delivered where you direct (your bank or branch) · 05 Signed back to you (24-hour support).
  - ATM replenishment: 01 Prepared for your N ATMs · 02 Sealed in a locked transit bag · 03 In the armoured vehicle (surveillance, $2M cover) · 04 At each ATM, replenished (first in The Bahamas to cater to ATM services) · 05 Signed off.
  - ATM first-line maintenance: 01 Crew dispatched (cross-trained Armoured Services Officers) · 02 At each ATM, first-line maintenance · 03 Signed off (24-hour support).
  - Family Island air courier: 01 Collected · 02 Sealed in a locked transit bag · 03 In the armoured vehicle · 04 Flown to the Family Island (air courier solutions for the Family Islands) · 05 Handed over at destination · 06 Signed.
  - Static guards: 01 Security Services (Bah.) Ltd. assigns officers · 02 Stationed at your N sites (static guard services) · 03 Backed by the armoured team (cross-trained in physical security; business continuity).
  - Aviation security: 01 Security Services (Bah.) Ltd. · 02 At your airport or aviation facility (aviation security) · 03 Seasoned management team.
  - Steps described as "Signed" and "Delivered where you direct" are category-standard wording, listed as assumptions.
- **Count label:** "ATMs" when the focused service is ATM, else "sites"; 1 to 99; stepper buttons 44 px; keyboard arrows on the number field.
- **Island rule:** Family Island is only offered for air courier: choosing it with no courier ticked adds air courier and shows the note "Family Island runs go by air courier."
- **States:** filled (default) · nothing ticked (line shows the empty run "Tick a service to see its route", summary hidden, Call still works) · copied ("Summary copied" for 2 s) · print (print stylesheet prints only the sheet).
- **Animation on change:** the line `pathLength` redraws 0 to 1 over 600 ms; nodes enter by y 8 px + opacity with 90 ms stagger; each stamp scales 1.4 to 1 and rotates to -4deg 140 ms after its node. Changing only the count or island re-keys only the place lines (crossfade 160 ms), not the whole line. Interruptible: AnimatePresence `mode="popLayout"` keyed by route id.
- **Summary formula:** "Request for Armoured Express: {service list} for {N} {ATMs|sites} on {island}, {frequency text}. Sector: {sector}." + "Office Mon to Fri, 9:00 to 5:00." Copy uses `navigator.clipboard`, fallback select-text.
- **Handoff:** `tel:+12423234430` (primary), second line tel:+12423286841. No email is published, so no send button. No prices.

## 6. Signature details
1. The run header writes itself in manifest grammar with tabular figures: "Run AE-REQ · ATM replenishment · 6 ATMs · Grand Bahama · Daily".
2. Stamps land one by one with a tiny ink-press scale, rotated -4deg, never brass.
3. Live office status from Nassau time: "Office open now" or "Office closed · 24-hour support for clients".
4. The truck rolls in and its wheels settle (rotation eases out) as the page opens; the same drawing returns at large scale with callouts drawing in.
5. "Plan this run" buttons in the ledger preset the sheet and scroll back to it, with the focused row flashing its brass check.
6. Print stylesheet: the request prints as a clean one-page manifest.

## 7. Photography plan
- No usable photographs: no own site; the Facebook page is empty; directory uploads are not allowed (rule 7). No stock, no generated pictures of their fleet (would read as their property).
- The imagery is the **technical line drawing of the truck**, kept from the previous version as the spec's Keep item (Balazs approved), redrawn as an engineering elevation (plate lines, axles, cab glazing, no invented dimensions) in ink on stone. It is a product drawing, not a scene illustration.
- Ask the owner for crew, vehicle and vault photos (listed in assumptions and concept notes).
- Map: Google Maps embed of Stapledon Gardens (interactive map, not a hotlinked photo), with a stone placeholder.

## 8. Self-review before coding
- **Screen 1 sells the product and does the job without scrolling:** yes on desktop: the sheet, custody line and Call button all sit inside 900 px. On phone the headline and both actions are inside 844 px; the sheet follows immediately.
- **Craft A1 to A20:**
  - A1 no badges: only sourced facts ($2M cover, 1961). OK.
  - A2 no redundant labels: phone numbers shown bare; "Main line"/"Second line" dropped for the second-line plain "Also 242-328-6841". OK.
  - A3 no italics except none. OK. A4 no mono: tabular Franklin instead. OK.
  - A5 tokens on :root, scale above. Care: use only token sizes in Tailwind arbitrary values.
  - A6 product shown: the service run itself and the truck drawing; photos absent by truth. Care: say so in notes.
  - A7 the sheet is the largest element on screen 1. OK.
  - A8 spacing groups the ledger rows; lines only between rows. OK.
  - A9 headlines from facts: "The Bahamas' armoured courier, since 1961", "Four services from one armoured fleet", "Every hand-off, accounted for", their own "Two companies, one family, one mission", "Pioneers of armoured security in The Bahamas". OK.
  - A10 one primary CTA per screen (brass). Care: secondary buttons outline or text.
  - A11 brass only on primary actions and the active state. Care: stamps in steel ink.
  - A12 lucide only, 16/18 px, 1.75 stroke. OK.
  - A13 one shadow on the sheet, no gradients. OK.
  - A14 radius 0 everywhere; stamp only. OK.
  - A15 muted 6.1:1; steel field text checked. OK.
  - A16 balance on headings, pretty on paragraphs; check 390 px for widows. Care.
  - A17 optical alignment of stepper glyphs and stamp. Care.
  - A18 tnum on all figures. Care: apply globally to `.tnum` and inputs.
  - A19 map has a sized placeholder; fonts swap; drawing SVG has a fixed aspect ratio. OK.
  - A20 motion explains: the route redraw is the change. OK.
- **Unmistakably this business:** the manifest, the custody line and the truck are about moving cash; no other site in the repo is built as a request manifest; the banned gen-1 patterns (key info band, sticky blurred header, uppercase eyebrows, Reveal fade, 1440/40 container) are all gone from the previous version.
