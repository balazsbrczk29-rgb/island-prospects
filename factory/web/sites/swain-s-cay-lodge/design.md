# Swain's Cay Lodge: design.md
Spec: factory/jobspecs/swain-s-cay-lodge.md (approved 2026-11-22). Fishing-week enquiry to fish@ + their room booking engine.

## 1. The idea
"The tide chart on the lodge table." Screen 1 is a fishing week being planned on a real chart of Mangrove Cay: on the right the coastline of Andros with the Middle Bight and the South Bight on either side of the cay, the lodge and its home flat on the east shore, the barrier reef line and the drop-off beyond; on the left, who is coming (anglers, non-anglers), nights and guided days, and the waters you want. Tap a water on the chart or in the list and it lights up with its method and species; the week assembles beside it: boats (two anglers a boat), guide days, the gratuities the lodge recommends, what is included and what to bring. Send my week composes the email to fish@. Book a room opens their engine.

## 2. Inspirations
- **NOAA / Imray nautical charts:** pale water, hairline coast, soundings-style small labels, a dashed reef line. I take the chart voice in the lodge's colours.
- **Patagonia / Yellow Dog trip pages:** what's included / not included in two plain columns, gear lists. I take the plain-terms table.
- **Airbnb itemised price, Apple configurator:** the week assembles as inputs change. I take the live summary.
- Playbook resort.md: one product (the fishing week), one action.

## 3. Tokens
**Type.** Alegreya 400/500 and italic (display: a calligraphic old-style face with a field-journal feel) + Alegreya Sans 400/500 (text, tabular figures). Kept from the previous version, now self-hosted.
Scale (desktop/phone): cap 12/12, small 14/14, body 17/16 (1.6), lede 21/19, h2 48/34 (1.05), h1 56/40 (1.0, -0.02em).
**Colour (OKLCH, shipped as hex).** ground flat-sand `oklch(0.965 0.016 85)` #f7f1e4; surface #fcf9f2; ink mangrove `oklch(0.27 0.035 160)` #13291f; muted `oklch(0.47 0.03 160)` #4a5f54 (6.3:1); line #ddd6c6; accent tannin `oklch(0.47 0.09 55)` #8a4b1c (Send, active water, totals; white on it 7:1); bight blue `oklch(0.3 0.06 240)` #142f4f (one dark section: the season); chart water `oklch(0.9 0.04 200)` #c8e6ea; chart land `oklch(0.95 0.03 95)` #f3eed6.
**Space.** 4/8 scale; section 128/72; 12 cols, 24 gutter, margins clamp(20px,4.5vw,64px), max 1312.
**Shape.** Photos square; controls 4 px radius; one shadow on the phone bar.
**Motion.** Ease cubic-bezier(.22,1,.36,1); feedback 160 ms; water highlight 300 ms fade + reef dash flow; summary lines 220 ms; numbers roll 280 ms. Reduced motion: fades only.

## 4. Screens
1. **Plan your week (index).** Desktop: header (wordmark, nav Fishing, The lodge, Getting here, Reviews; phones; Book a room outline). Left 5 cols: kicker "Mangrove Cay, Andros. Orvis Endorsed fly fishing lodge."; H1 "Bonefish off the beach, a bight on either side."; controls (anglers, non-anglers, nights, guided days); waters list (5 toggles with species); the week: boats, guide days, gratuities (guides $125 per boat per day, staff $35 per guest per night), included / not included in short, package price "from the lodge's 2026-2027 season sheet", Send my week (accent), Book a room (link), call. Right 7 cols: the chart (1000x900) with the dawn photograph inset bottom-left (their header, framed), the selected waters highlighted. Phone: H1, chart full bleed, controls, waters, the week, sticky bar (boats and guide days + Send).
2. **Where you'll fish.** Five rows: home flat, Middle Bight, South Bight, the barrier reef, outside the reef; each with method, species and one of their fishing gallery photos (1024 wide).
3. **The season (bight blue band).** Day trip $975 per boat, half day a la carte, non-angler $450; package includes / not included as two columns; deposit 50% within 21 days, balance 90 days before; gratuities; licences link; 12 units, up to 26 guests.
4. **The lodge.** Four room types with their photos (1024x540), Reefside Restaurant & Bar, Book a room.
5. **For the non-angler.** Kayaks along the bights, snorkelling, bike rides, the beach; free bikes, kayaks and snorkel gear.
6. **What guests say.** Five reviews from the feed on their site, named and dated, complete texts only.
7. **Getting here and offers.** Fly to Nassau, then on to Mangrove Cay by air or Bahamas Ferries; transfers included in packages. Offers each once with book-by, travel and blackout dates.
8. **Contact.** Phones, fish@, Mangrove Cay Settlement, Facebook; photo credits.
fishing.html: 1, 2, 3. lodge.html: 4, 5, 7. All end with 6 and 8.

## 5. Core tool spec
- Inputs: anglers 2 (1 to 12), non-anglers 0 (0 to 8), nights 6 (2 to 14), guided days 5 (0 to nights), waters: home flat + Middle Bight preselected.
- Boats = ceil(anglers / 2). Guide days = boats x guided days. Guide gratuity = 125 x boats x guided days. Staff gratuity = 35 x (anglers + non-anglers) x nights. Day-trip reference = 975 x boats x guided days (shown as "if booked as day trips without the lodge"). Non-angler rate $450 shown as published. No package total invented: "Package price per person from the season sheet; the lodge confirms."
- States: always filled; guided days clamp to nights; zero anglers disables guide lines and shows "a beach week".
- Chart: water zones are SVG shapes on the baked coastline; tapping a zone toggles it, same as the list; selected zones fill with accent at 22% and their label turns accent; the reef line dash flows when selected.
- Hand-off: mailto fish@swainscaylodge.com with party, nights, guided days, waters, boats and the gratuity sums; Book a room = https://www.swainscaylodge.com/#booking; tel +12424225018.

## 6. Signature details
The chart's hairline coast and dashed reef; species in italic like a field journal; the boats count drawn as small hull glyphs? No: as plain numerals with "2 anglers a boat". The week updates line by line. The dawn photo pinned on the chart's open water.

## 7. Photography (their site, /wp-content/uploads/2026/09/)
swainscaylodge-header.jpg (set 1920x1080, inset ~300 px); welcome-landscape.jpg (set 1600x900); live-duplex/ovr/ovs/bfs-1024x540.jpg; dinig1.jpg (set 1600x1067); fishing-gallery1-1024x597, 2/3 1024x590, 4/5 1024x700. Credits: Lauren Brown Photography and Ian Davis at Yellow Dog Fly Fishing.

## 8. Self-review
Screen 1 shows the water and the working planner with Send above the fold. A1-A20: no badges (Orvis as words, it is a fact), no labels, italic for species, no mono, tokens only, real product (the waters), planner largest, spacing groups, specific H1, one filled button per screen, accent on Send and active waters, no icons, no ornaments, 4 px radii, contrast 6.3:1 muted, balanced headings, tabular figures, sized photo boxes, motion only for selection and sums. Unmistakably this lodge: the two bights and the home flat.
Assumptions: the lodge pin is approximate on a 1:10m coastline; whether the non-angler rate is per night or per package is unclear (shown as published); room photo native heights from filenames.
