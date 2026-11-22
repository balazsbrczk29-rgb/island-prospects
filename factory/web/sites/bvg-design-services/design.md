# BVG Design Services: design.md
Spec: factory/jobspecs/bvg-design-services.md (approved 2026-11-22). Previous version: gen 2 round 2 (Instrument Sans only, era browser in the hero, request builder at the bottom).

## 1. The idea in one paragraph
A Bahamian studio that has been getting businesses found since 1996 should let you start your website on the first screen. Screen 1 is a confident serif statement, "Built and found since 1996.", beside a working brief builder: tap what you need, slide the page count (the published discount tiers light up over 10 and in the hundreds), pick your business and island, and the answer panel tells you, in BVG's own published terms, what happens next. One tap writes the email to info@bvgdesign.com. Scroll on and BVG's own first site, the 1996 Bahamas Vacation Guide, rebuilds itself into a 2026 phone layout, then hands you back to your request. Proof first through the tool, then proof through history.

## 2. Inspirations
- **Linear (linear.app) pricing/contact flow:** the form is the product demo; the summary updates live beside the inputs. I take the live answer panel that rewrites itself as you choose.
- **Stripe Press:** a warm serif headline over a quiet sans, generous margins, one accent. I take the serif/sans voice and the restraint.
- **Apple "scroll to transform" product pages:** a sticky stage where scroll drives discrete states. I take the pinned then-and-now stage driven by scroll progress, with discrete era steps, not scrubbed pixels.
- Playbook (professional): plain service lines, offices and a clear request path; no card grids.

## 3. Tokens
**Type.** Newsreader (variable, opsz + wght, self-hosted woff2) for display: a newspaper serif fits a firm that began by publishing a guide, and it reads warm and plainspoken, not luxury. Instrument Sans (kept from the previous version) for text and UI. One serif, one sans.
| step | size desk / phone | leading | tracking | face |
|---|---|---|---|---|
| cap | 14 / 14 | 1.45 | 0 | sans 400 |
| body | 17 / 17 | 1.55 | 0 | sans 400 |
| lead | 20 / 18 | 1.45 | -0.005em | sans 400 |
| h3 | 28 / 24 | 1.15 | -0.015em | serif 500 opsz 36 |
| h2 | 48 / 34 | 1.04 | -0.025em | serif 450 opsz 72 |
| hero | 88 / 46 | 0.98 | -0.035em | serif 450 opsz 72 |
Numbers in UI: tabular-nums.

**Colour (OKLCH).**
- ground `oklch(0.955 0.018 85)` sand
- surface `oklch(0.985 0.008 85)` (the builder card, the browser window)
- ink `oklch(0.29 0.06 248)` Freeport harbour blue
- muted `oklch(0.46 0.04 248)` (about 6:1 on ground)
- line `oklch(0.29 0.06 248 / 0.14)`, strong line `/ 0.3`
- accent `oklch(0.80 0.135 80)` sun ochre, with ink text: ONLY the primary action ("Send my request"), the active page tier and the active era year marker.
- field `oklch(0.29 0.06 248)` (ink as a ground) for the contact close, text `oklch(0.95 0.018 85)`; secondary field `oklch(0.93 0.025 215)` pale harbour water for the then-and-now stage.

**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 desktop, 72 phone. 12-column grid, gutter clamp(16px, 3.6vw, 56px), column gap clamp(16px, 2vw, 32px), max width 1440. Text measure 62ch max.

**Shape.** Radius 14 on the builder card and window, inner pieces 8 (card padding 6 via inset areas), chips and buttons 999 (pill is NOT the gen-1 header pill: buttons are 52 px tall, ochre). Hairline borders. One shadow only: the builder card `0 40px 80px -48px oklch(0.29 0.06 248 / .35)`; the era window reuses it.

**Motion.** Ease `cubic-bezier(.22,1,.36,1)`; in-out `cubic-bezier(.65,0,.35,1)` for the era morph. 160 ms feedback (chip press, tier light), 280 ms answer lines (height + opacity, layout), 900 ms era morph. Hero entrance: headline, lede, builder stagger 80 ms, 700 ms rise of 12 px. Reduced motion: no entrance, era stage unpinned showing 2026 with the rail clickable, answer lines swap without height animation.

## 4. Screens
**Screen 1, Start here (hero).** Desktop: nav 64 px (name left, Services / Since 1996 / Offices right, phone far right, no blur, no pill). Grid: cols 1 to 6 statement, cols 7 to 12 the builder card. Statement: hero "Built and found since 1996." ; lead "Bahamian-owned web design, hosting, search and advertising from Freeport, Grand Bahama, for businesses on every island. We started with our own site, the Bahamas Vacation Guide."; a quiet line "Offices in Freeport, Nassau and Abaco"; text link "See the 1996 guide rebuilt". Builder card (largest element, about 600 x 700): What do you need (5 chips, multi), How many pages (4-step segmented: 1 page, 2 to 10, 11 to 99, 100 or more; shown for website needs), Business and Island (two selects), answer panel "What BVG does for this" (3 to 6 lines), action row: ochre "Send my request" + "Call Freeport (242) 602-0658", US line below in caption. Phone: statement first (hero 46 px), builder card full width below; the dock appears once the hero leaves.

**Screen 2, Then and now.** Pale water field. Desktop: section 300vh, sticky 100vh stage. Cols 1 to 4: h2 "Our first site, rebuilt for every era since." , short paragraph, a vertical rail of four years (1996 tables and blue links, 2006 side menu, 2016 big photo, 2026 phone first) with the active year marked in ochre; cols 5 to 12: the browser window morphing into a phone frame at 2026. At 2026 a line appears: "Your site is next." with link "Back to your request". Phone: stage 100svh sticky, h2 then window then a horizontal 4-year rail; section 260vh.

**Screen 3, What we do.** Ground. Desktop: cols 1 to 4 sticky h2 "Everything a Bahamian business needs online, from one Freeport studio."; cols 6 to 12 six plain rows divided by hairlines: name (h3 serif), one line, what it includes (caption list, inline with middots), and a small "Add to my request" toggle that adds the need to the builder. Rows: Websites, Complex sites, Redesign or takeover, Getting found, Hosting and domains, Advertising. Phone: one column, h2 not sticky.

**Screen 4, How a project goes.** Five steps in five columns, joined by a hairline: Request, Consultation, Design, Live, Found; serif numerals. Below: the 24-hour line stands out at lead size, payment line in muted. Phone: vertical list with the line on the left.

**Screen 5, The story and the offices.** Desktop: cols 1 to 5 big serif "1996" at hero size, cols 6 to 12 the story in three short paragraphs, link to the guide. Then a strip of four guide photos (900 x 398 each, shown at about 330 px). Then the Lucayan Harbour photo full width (native 2400 x 1600, shown at 1440 x 600 crop, focus centre) with credit; under it three office columns: Freeport HQ, Nassau and Abaco, From the United States. Phone: everything stacks, strip scrolls horizontally with snap.

**Screen 6, Contact.** Ink field. Large serif phone number "(242) 602-0658" as a tel link, email under it, ochre "Send my request" (same mailto as the builder state) and "Edit my request" back to top. US line and P.O. box small. Footer below with credits. Phone: number at 40 px, buttons full width.

## 5. The core tool: interaction spec
- **Inputs and defaults:** needs = [New website]; pages = "2 to 10"; business = "Guesthouse or hotel"; island = "Grand Bahama"; name (optional text field in the card, "Business name, optional").
- **Pages control:** visible only if needs include New website or Redesign; tiers 1 / 2-10 / 11-99 / 100+. Choosing 11-99 or 100+ lights a tier note ("Over 10 pages: discounted" / "Hundreds of pages: a larger discount"), marked with an ochre dot and ink text.
- **Answer lines (sourced from bvgdesign.com, faqs, promo):**
  - New website, 1 page: "A simple page is normally ready within 24 hours of the order."
  - New website, 2 to 10: "A simple or themed multi-page site. Multiple pages take a little longer than a single page."
  - 11 to 99: "Sites over 10 pages are discounted."; 100+: "Sites of hundreds of pages get a larger discount."
  - Redesign: "Small changes are billed by the hour, or BVG takes the site over, redesigns it and keeps it up to date."
  - Found: "A free first consultation: a brief overview of the key phrases you rank for today."
  - Hosting: "Your domain registered and hosted, with a control panel simple enough to use yourself."
  - Advertising: "The advertising department: printed materials, ad layout and video advertising."
  - Island: Grand Bahama "Handled from the Freeport headquarters."; New Providence "BVG has an office in Nassau."; Abaco "BVG has an office in Abaco."; another island "Run from Freeport, by phone and email."; outside "Call the US line, (954) 640-8552."
  - Always last: "Pay by cash, US or B$ cheque, bank deposit, or card through PayPal."
- **States:** empty (no needs chosen): panel says "Choose what you need and this fills in." and the send button stays enabled but writes a general enquiry; filled: lines; there is no loading or server error (mailto). If the mail app does not open, the email address is shown in full under the button to copy.
- **Animation:** answer lines enter with height auto + opacity 280 ms, exit the same, siblings slide via layout; tier highlight slides between segments (shared layoutId). Interruptible (Motion).
- **Keyboard/touch:** chips are toggle buttons (aria-pressed), the segment is a radiogroup with arrow keys, selects are native, all targets 44 px or more.
- **Hand-off:** `mailto:info@bvgdesign.com?subject=Website request: <name or business type>&body=<lines>`; `tel:+12426020658`; `tel:+19546408552`.
- **Shared state:** the service rows' "Add to my request" toggles and the contact close use the same state.

## 6. Signature details
1. The page-count segment: the ochre indicator slides between tiers and the discount note appears, the only place a discount is mentioned, in BVG's words.
2. The email's subject line in the card updates as you type your business name (tabular, live), so you see the request being written.
3. The era window morphs from a desktop browser into a phone at 2026 with the URL losing its "www.".
4. "Add to my request" on every service row; the dock on phone shows the count ("Send my request, 3").
5. The 1996 numerals in the story use Newsreader at hero size with lining figures, set against the guide's own 1996 photos.

## 7. Photography plan
- Guide photos (BVG's own, Bahamas Vacation Guide, re-hosted in the Lovable asset project): hope-town, treasure-cay, nassau-light, deadmans-reef, williams-town, exumas, lochabar; native 900 x 398; used inside the era window (about 700 px) and the story strip (about 330 px). Alts written per photo.
- Lucayan Harbour, Freeport: Wikimedia Commons, Jon Worth, CC BY-SA 2.0, native 2400 x 1600, full width at 1440, object-fit cover 1440 x 600, credited under it.
- No illustrative images this round (the generated desk/server shots added nothing a studio's own live UI does not show better).
- Grade: as delivered; the sand ground and pale water field carry warmth.

## 8. Self-review
- Screen 1 sells the product and the job can be completed without scrolling on desktop (builder + send button in the first 900 px). On phone the builder starts right under the lead and the dock keeps "Send my request" in reach.
- A1 no badges. A2 no "Phone:" labels. A3 no random italics (none used). A4 no mono. A5 tokens on :root only. A6 the product (the service, the request, their own guide) is shown live. A7 builder is the largest element on screen 1. A8 spacing groups. A9 headlines are specific to BVG (1996, Freeport, the guide). A10 one ochre primary per screen. A11 ochre only on primary, active tier, active year. A12 no icons. A13 no ornaments; the old hairline grid background is dropped. A14 radii 14 / 8 concentric. A15 checked by inspect. A16 balance + pretty. A17 optical: numerals in step list aligned to cap height. A18 tabular on phones and tiers. A19 images sized with width/height, tinted bg. A20 motion only explains changes (answer lines, tier, era).
- Care: the sticky era stage on phones (keep it light, discrete state only), the ink close must not read as an all-dark site (it is one section).
- Unmistakably BVG: their own 1996 guide, their own terms. Different from repo competitors: no other site leads with a request builder over a newspaper serif on sand.
