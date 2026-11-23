# Kreston Bahamas: design.md

## 1. The idea
Kreston means "trust". Screen 1 is a calm, exact desk: you say what you need and the firm answers it in one move. The service finder is the hero; choosing a need turns the page into your service, your checklist and your enquiry. Nothing decorative, everything earns its place.

## 2. Inspirations
- Linear changelog pages: tight type, tabular numerals, quiet motion on state change.
- Stripe Press: warm paper ground, serif display, a single accent used once.
- Aman booking bar: the primary tool sits inside the first screen, not below it.

## 3. Tokens
- Type: display Newsreader (variable, self-hosted), text Instrument Sans. Scale 14 / 17 / 20 / 30 / 48 / 76; leading 1.5 body, 1.05 display; display tracking -0.03em.
- Colour (OKLCH): ground oklch(97% 0.012 85); surface oklch(99% 0.006 85); ink oklch(22% 0.02 255); muted oklch(46% 0.02 255) (>= 4.5:1); line oklch(88% 0.012 85); accent oklch(40% 0.11 255) (deep blue, enquiry action only); field oklch(24% 0.03 255) for the close section.
- Space: 4/8 scale, sections 120 desktop / 72 phone, 12 columns, gutter 24, measure 62ch.
- Shape: radii 14 outer, 10 inner; 1px lines; one soft shadow on the finder card.
- Motion: cubic-bezier(.22,1,.36,1); 180 ms feedback, 520 ms reveals; list stagger 40 ms; reduced motion = no movement, opacity only.

## 4. Screens
1. Hero (desktop two columns 7/5, phone stacked): h1 "Accounting, advisory and audit in The Bahamas." Lede: member of Kreston Global; "Kreston is ancient Greek for trust". Right: the finder card with five needs. Primary action: Send enquiry (accent). Phone: finder first, lede above, enquiry bar after scroll.
2. Services: five rows, number, name, one plain sentence; same order as the finder; selecting a row in the finder highlights its row.
3. Partners: two real photos (Pretino P. Albury, Sean I. Rolle, Partners) at <= 160 px display; Kreston Global network sentence and link.
4. Insights: their real articles as a text list with dates unknown omitted.
5. Close (field colour): enquiry form with their fields; address and phone only if confirmed.

## 5. Core tool: service finder
- Inputs: need chips (Annual audit, Tax and VAT, Books and payroll, Advice on a decision, Outsource finance). Default: none selected, shows a prompt.
- Result: service name, one plain line, "What we will ask you for" (generic checklist per service, no numbers or dates), and a prefilled enquiry message.
- Animation: result panel crossfades 180 ms, checklist lines stagger 40 ms, origin-aware, interruptible; radiogroup keyboard (arrows), 44 px targets.
- Hand-off: mailto or their form URL with prefilled text; address/email confirmed before build.
- Error: empty email shows inline field message.

## 6. Signature details
- Checklist types itself in with tabular numerals for step numbers.
- The accent colour appears only on the Send enquiry button and focus ring.
- A thin line draws under the selected service in the list.
- "Kreston = trust" set as a small marginal note beside the h1.

## 7. Photography plan
- Partner photos from krestonbs.com (own site): Pretino_P_Albury.jpg, Sean_I_Rolle.jpg, display <= 160 px, natural crop. No stock photography; the rest is type and space.

## 8. Self-review
- Screen 1 shows the product (five services) and the working tool: yes, no scroll to start the job.
- A1 to A20: type scale, tabular numerals, balanced headings, one accent, 44 px targets, contrast, reduced motion satisfied by design; photos only at small display sizes; check overflow and line length with inspect.mjs.
- Distinct from other repo sites: paper-and-ink professional register with a needs-first tool.
