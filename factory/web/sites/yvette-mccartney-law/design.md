# Yvette McCartney Law: design.md

## 1. The idea
A calm, serious chambers. You say what has happened, and the page turns it into a one-page brief: the practice area, what to bring, and a call. The six small photographs are treated like framed prints on a wall at their true size; the large visuals are type, space and the brief itself.

## 2. Inspirations
- Aesop's stores online: quiet serif, generous space, small precise imagery.
- Monocle: editorial hierarchy, restrained colour.
- Stripe Atlas: form that feels like a document you are filling in.

## 3. Tokens
- Type: display Libre Caslon Text (self-hosted), text Figtree. Scale 14 / 17 / 20 / 30 / 52 / 84; leading 1.5 / 1.05; display tracking -0.025em.
- Colour (OKLCH): ground oklch(96.5% 0.015 80); surface oklch(99% 0.008 80); ink oklch(20% 0.015 60); muted oklch(44% 0.02 60); line oklch(86% 0.015 80); accent oklch(36% 0.09 20) (deep oxblood, call action only); field oklch(23% 0.02 60) for the close.
- Space: 4/8, sections 128 desktop / 72 phone, 12 cols, gutter 24, measure 60ch.
- Shape: radii 4 on frames, 12 on the finder card; 1px lines; photo frames with 12px mat and one soft shadow.
- Motion: cubic-bezier(.22,1,.36,1); 180 ms feedback, 560 ms reveals, 50 ms stagger; reduced motion = opacity only.

## 4. Screens
1. Hero (desktop 7/5, phone stacked): h1 "Yvette McCartney Law", lede "A full-service law firm in Nassau." Finder card. Call button "Call chambers 242 328-6725". Photos: chambers-a at 200 px beside address on desktop.
2. Practice areas: six in plain words (litigation, corporate and commercial, real estate, mortgage enforcement, family law, personal injury litigation), same order as the finder.
3. The chambers: two building photos at native size side by side as framed prints, address 7 Terrace W., Bldg. 10, Nassau, P.O. Box N-10095, map link, both phone numbers, fax.
4. How an enquiry works: three steps, no promises about outcomes or time.
5. Close (field colour): call, "Send a message" form, with the portrait photos only if captions are confirmed; gavel and books as small framed accents.

## 5. Core tool: matter finder
- Inputs: six matter chips (Property, Dispute or claim, Company matter, Mortgage default, Family, Injury). Default none selected.
- Result: practice area, one plain line, "What to bring" (generic checklist: ID, any letters or notices you have received, documents you have signed), and a prefilled message plus Call button.
- Animation: card crossfade 180 ms, checklist stagger 50 ms, a printable one-page brief view.
- Keyboard radiogroup, 44 px targets, aria-live result. Hand-off: tel link and mailto/form once the email is confirmed.
- No legal advice, outcomes or fees stated; footer line "This page does not give legal advice."

## 6. Signature details
- Photos mounted as framed prints that settle with a 4px rise.
- The brief view prints cleanly (print stylesheet).
- Tabular phone numbers; call button the only oxblood element.
- Matter chip selection draws a thin rule under the chosen practice area in the list.

## 7. Photography plan (their own gallery, native 200 x 150, never upscaled)
- portrait-a.png, portrait-b.png: displayed 200 x 150, names unconfirmed so captions neutral.
- chambers-a.png, chambers-b.png: the yellow chambers building, 200 x 150 each.
- gavel.png, books.png: small accents at 200 x 150 or smaller.
- All with width/height attributes 200 x 150; consistent warm mat; no hero photo.

## 8. Self-review
- Screen 1 shows the practice (areas) and tool in reach; the job (start an enquiry) is one tap away.
- A1 to A20: contrast, scale, tap targets, tabular numerals, reduced motion, no upscaling satisfied; verify with inspect.mjs.
- Distinct from the other sites: legal register, framed-print photography, brief-as-output tool.
