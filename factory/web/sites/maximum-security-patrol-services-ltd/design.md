# Maximum Security & Patrol Services: design.md

## 1. The idea in one paragraph
"The site plan on the desk at Carib Road." Screen 1 is a security survey sheet. A procurement or facilities manager picks the kind of premises (tabs across the top of the sheet, like drawing sheets), then switches services on in the drawing's legend: officers appear as posts at the doors and gate, a patrol route draws itself round the perimeter with a dot walking it, alarm sensors light at the openings with a line back to Carib Road control, a survey frame for consultancy, a case marker for investigations. On the left, hours and number of posts complete the brief, and the plan reads it back as one paragraph to say on the call, to copy, or to email to a colleague. One olive button calls 242-394-5425. Calm, exact, institutional: the firm that has put trained officers on posts since 1993 shows it thinks in plans.

## 2. Inspirations
- Arup project pages: off-white ground, precise line drawings as the hero, large grotesk, technical captions. Taken: the plan as the hero object, captions in small caps-free text.
- Maersk: one strong brand colour, a plain headline that names the service, services as lanes with one action each. Taken: lanes with "Add to my proposal".
- Linear's changelog/feature diagrams: thin strokes that draw in when a feature turns on. Taken: the coverage layers drawing in, origin-aware.
- `site-playbooks/playbooks/tech-security.md`: the enquiry is the product, trust from tenure and clarity, never fake stats.

## 3. Tokens
**Type.** Red Hat Display (variable 500 to 800) for display: a large, clear grotesk with institutional calm, not used elsewhere in the repo. Red Hat Text (variable 400 to 600) for text and plan labels: designed for small sizes, which the drawing needs.
Scale (desktop / phone): caption 13 / 13 (line 1.35, +0.01em); body 17 / 16 (1.55); lead 20 / 18 (1.45); h3 26 / 22 (1.15, -0.01em, Display 650); h2 52 / 34 (1.0, -0.03em, Display 700); hero 60 / 38 (0.98, -0.035em, Display 750).
**Colour (OKLCH, written as sRGB in CSS).**
- ground `oklch(0.955 0.006 140)` concrete white; surface `oklch(0.985 0.003 140)` drawing paper (the sheet); ink `oklch(0.21 0.02 240)` night; muted `oklch(0.46 0.02 240)` (about 7:1); line `oklch(0.21 0.02 240 / 0.14)`; plan grid `oklch(0.21 0.02 240 / 0.06)`.
- accent `oklch(0.43 0.09 125)` uniform olive: the Call button, the active tab marker, coverage fills at 14 to 22 percent alpha (the coverage IS the product being bought), focus ring. White on olive about 7:1.
- field `oklch(0.21 0.02 240)` night: one band (sectors served) with ground-coloured text.
**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 / 64. 12 columns, gutter 32 / 16, inset clamp(20px, 4vw, 64px), max 1360. Measure 62ch.
**Shape.** Radius 3 px on buttons, chips, the sheet; plan strokes 1.5 px (building), 1 px (grid). No shadows except the sheet: `0 1px 0 line, 0 24px 48px -32px ink/25%` (once).
**Motion.** Ease `cubic-bezier(.22,1,.36,1)`. Feedback 160 ms; layer draw 700 ms (stroke-dashoffset on a mask, transform scale for posts); plan swap 360 ms crossfade; patrol dot walks the route in 14 s linear loop (SMIL animateMotion, omitted under reduced motion). Posts stagger 40 ms each. Reduced motion: layers appear instantly, no walking dot.

## 4. Screens
### Screen 1: the proposal builder (hero)
Desktop 1440x900. Bar 64: name "Maximum Security & Patrol Services" (Display 650 18) left; right: "Since 1993, #15 Carib Road" caption, then both phones in tabular figures.
Grid: cols 1 to 5 (ask), cols 6 to 12 (sheet).
- Ask: H1 "Security officers, patrols and alarm monitoring for Nassau." (hero); lede "Build your request on the plan, then call the office on Carib Road. Founded 1993." Then Hours (chips), Officers on post at once (stepper with tabular number), Where (input). Then the read-back panel: the paragraph in Text 17 on surface, actions: olive "Call 242-394-5425", text links "or 242-393-7206", "Copy", "Email to a colleague".
- Sheet: paper surface with faint 24 px grid; top edge = premises tabs (Bank or office, Retail store, Government building, Residence, Yard or warehouse), active tab has an olive 3 px top marker. The plan SVG fills (viewBox 640x420). Bottom edge = legend that is the service selector: five toggles each with its symbol (post dot, dashed route, sensor ring, survey corner, case marker). A small caption: "Diagram for illustration. A site visit sets the real posts and routes."
Phone 390: bar 56 (name short "Maximum Security" + "Call"). H1 38, lede. Premises tabs as a scroll row, the sheet full width (plan aspect 640:420), legend toggles wrap in two columns. Hours chips, posts, where, read-back, Call full width. A fixed bottom call dock after the hero Call scrolls away (lifts the concept label via --concept-offset).

### Screen 2: Services as lanes
h2 "Five services from one office that answers." Lanes: a 12-col row per service: number (Display 26 tabular, muted) col 1, name h3 cols 2 to 4, their words cols 5 to 9, who it is for (caption) under, action "Add to my proposal" col 10 to 12 (toggles the service and scrolls to the sheet). Hairline between lanes. Three lanes (officers, patrols, alarm monitoring) carry their illustrative photograph (Lovable, 1920x1080) in a 16:9 frame at cols 5 to 9 under the text, max 640 wide, captioned "Illustrative photograph". Phone: stack.

### Screen 3: Sectors served (night band)
Four columns of large Display 34 words: "Business and financial", "Government", "Retail", "Private and public clients". One line above: "Who we protect, in our own words." Phone: two by two.

### Screen 4: Since 1993
Left: "1993" Display 800 at 160 px in olive; right: h2 "Started with not more than a dozen fully trained officers." and the paragraph: Byron C. Rodgers, Chairman and CEO; the aim to change an industry known for turnover and low standards. The URCA register line: "Listed on the URCA public register of licensees." Phone: stacked.

### Screen 5: How a proposal works
Four steps in a single row with numbered rule lines: Call the office, Site visit, Written plan, Officers on post. One sentence each, category-standard (listed as assumptions in concept notes).

### Screen 6: Call Carib Road
h2 "Call Carib Road." Left: two phone rows large (Display 40, tabular), fax, P.O. Box N-9425. Right: address block "#15 Carib Road (Carib House), Nassau, New Providence" + "Open in Maps" link (Google Maps search URL). Footer: name, photography note, concept line.

## 5. The core tool: interaction spec
- Inputs/defaults: premises "Bank or office"; services [Officers on post]; hours "Nights"; posts 2 (1 to 30, stepper and arrow keys); where "" (placeholder "e.g. Bay Street, Nassau").
- States: no empty state (zero services gives "advice on what we need"). Copy shows "Copied" for 1.6 s (aria-live). Clipboard failure falls back to selecting the text.
- Read-back formula: `Good day. I would like a security proposal for a {premises lc} {where ? "on/at " + where : "in New Providence"}: {services list joined "and"}, {hours lc}, {posts} {officer|officers} on post at once. Please arrange a site visit.`
- Plan: each premises has shapes, door/gate post points (up to 6 shown; more shown as "+n" tag), perimeter route path, sensor points, a survey frame rect, a case marker point, and a "to Carib Road control" line anchor. Toggling a layer on draws it in (route: mask path dashoffset 1 to 0, 700 ms; posts scale from 0 with 40 ms stagger, origin at their centre; sensors ring scale; survey corners grow from corners); off fades 160 ms. Premises change crossfades plans 360 ms; layers redraw on the new plan. Posts count follows the stepper live.
- Keyboard: tabs are a tablist (arrow keys), legend toggles are checkbox buttons (aria-pressed), chips radio groups. Touch: 44 px targets.
- Hand-off: tel:+12423945425 primary, tel:+12423937206 secondary, mailto:?subject=Security proposal request&body=summary (to a colleague), clipboard.

## 6. Signature details
1. The legend is the control: toggling a service in the drawing's key draws it on the plan.
2. The patrol dot walking the drawn route (14 s loop).
3. Alarm sensors with a fine line running off the sheet edge to "Carib Road control".
4. Tabular stepper number that rolls (translateY) when posts change, and posts appearing one by one.
5. "1993" set big in olive, and phone numbers set like a directory in tabular figures.

## 7. Photography plan
No own photos exist. Illustrative photographs from the Lovable asset project ip-assets-maximum-security (generated for this concept, officers from behind, no faces, insignia or weapons), each captioned "Illustrative photograph":
| file | native | where | alt |
|---|---|---|---|
| h06-post.jpg | 1920x1080 | lane: Security officers | officer from behind at the glass doors of an office at dawn |
| h18-patrol.jpg | 1920x1080 | lane: Patrols | unmarked patrol truck at dusk, officer walking the wall with a torch |
| h03-watch.jpg | 1920x1080 | lane: Alarm monitoring | alarm monitoring desk lit by screens |
Shown at max 640 px wide (well under native). One grade (as generated). The plan is a diagram, not a scene illustration.

## 8. Self-review
- Screen 1 sells the product (coverage on a plan) and the whole job (premises, services, hours, posts, call) is completed without scrolling on desktop; phone has the call dock.
- A1 no badges. A2 no "Phone:" labels (phones are self-evident; "Fax" is needed to distinguish). A3 no italics. A4 no mono. A5 tokens only. A6 the product is coverage, shown on the plan. A7 the sheet is the largest element. A8 spacing groups. A9 headline names the services and Nassau. A10 one olive Call per screen. A11 olive only for action/active/coverage. A12 symbols are drawn in the plan language, consistent 1.5 px. A13 no ornaments; the grid is functional. A14 3 px radii, sheet 3. A15 contrast checked by inspect. A16 balance/pretty. A17 stepper digits centred optically. A18 tabular phones, posts, 1993. A19 sized frames for photos, plan is inline SVG (no load). A20 layers draw to explain what was added.
- Needs care: plan legibility on phone (labels 11 px minimum in SVG scale; hide minor labels under 500 px), height of screen 1 on 1440x900.
- Unmistakably MSPS: Carib Road control line, 1993, their five services in their words, their two phones. Different from the other security site (not opened): a drawing-sheet builder on concrete white with olive, not a film or dark site.
