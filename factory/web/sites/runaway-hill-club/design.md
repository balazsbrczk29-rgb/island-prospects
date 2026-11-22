# Runaway Hill Inn: design.md
Spec: factory/jobspecs/runaway-hill-club.md (approved 2026-11-22). Booking site: direct-book.com engine plus a dated email enquiry.

## 1. The idea in one paragraph
"A house where every room has a name, and the register is on the hall table." Screen 1 is a guest register laid beside a framed photograph of the house on the hill: on the right the dates (arrival, nights, guests), then the twelve rooms by name in one list grouped by building, each with its bed and published nightly rate; on the left the photograph. Pick a room and the photograph eases from the house to that room, the caption names where it sits, and an itemised total for your nights (rate, 10% gratuity, 10% VAT, 10% resort levy, any cot or extra person) ticks into place in tabular figures. Book this room opens their direct-book engine; Ask about this room writes the email for you. The descent from the hill to Pink Sands Beach, the dining room, the events and the way here follow in their own photographs, framed at the size they hold.

## 2. Inspirations
- **A country-house hotel register / Aesop store lists:** a quiet ruled list, numbers in the margin, names in a literary serif, prices right-aligned in tabular figures. I take the ruled register and the margin numbers.
- **Aman (Amanyara):** patience, one photograph per screen, a booking bar that belongs to the picture. I take the photo-plus-booking pairing on screen 1.
- **Airbnb price breakdown:** the total is itemised and updates as dates change. I take the itemised total with an honest "to confirm" line.
- Playbook resort.md: rooms and rates are the product; the place is sold by its own photographs.

## 3. Tokens
**Type.** Castoro 400 and italic (display: an English old-style face for a 1946 manor; room names set in it like ink on a register) with Be Vietnam Pro 300/400/500 (text, numbers in tabular figures). Kept from our previous version, now self-hosted.
Scale (px desktop / phone): cap 12/12 (+0.08em, building labels only); small 14/14; body 17/16 (1.6); lede 21/19 (1.45, weight 300); h2 50/34 (1.04, -0.02em); h1 64/40 (1.0, -0.025em). Room name in the register 21/19 Castoro.
CSS: --t-cap .75rem; --t-sm .875rem; --t-body 1.0625rem; --t-lede clamp(1.1875rem,1rem+.4vw,1.3125rem); --t-h2 clamp(2.125rem,1.3rem+2.3vw,3.125rem); --t-h1 clamp(2.5rem,1.4rem+2.6vw,4rem).

**Colour (OKLCH, shipped as hex because the QA tool reads sRGB).**
- ground, limewash `oklch(0.972 0.007 150)` #f4f6f1; surface `oklch(0.99 0.004 150)` #fbfcf9;
- ink `oklch(0.25 0.03 200)` #102a2f; muted `oklch(0.46 0.025 200)` #4a5e62 (6.6:1 on ground); line `oklch(0.88 0.012 150)` #d6dcd3;
- accent, deep sea green `oklch(0.42 0.07 172)` #0f5a4b: Book this room, the selected row rule, the total. Nothing else. White on accent 7.6:1.
- field, faded pink sand `oklch(0.92 0.03 40)` #f2ddd3: the dining and events band and the selected room's row tint.
**Space.** 4/8 scale: 4 8 12 16 24 32 48 64 96 128. Section padding 128/72. 12-column grid, 24 px gutter, margins clamp(20px, 4.5vw, 64px), max 1312 px. Measure 60ch.
**Shape.** Photos square-cornered inside a 10 px limewash passe-partout with a 1 px line (a framed print). Controls radius 3 px. One shadow, on the phone booking bar only.
**Motion.** Ease cubic-bezier(.22,1,.36,1). Feedback 160 ms; photo crossfade 520 ms with a 1.03 to 1 settle; total digits roll 280 ms (per-digit translateY); list filter 220 ms layout; reveals none beyond the first screen (the content is the motion). Reduced motion: crossfade 120 ms, no settle, numbers swap.

## 4. Screens
### Screen 1: the house and the register (index)
Desktop 1440x900. Header 64 px: wordmark "Runaway Hill Inn" (Castoro 24) left; nav Rooms, The house, Dining and events, Getting here; the local phone (242) 333-2150 as text; "Book" outline button.
- Cols 1 to 6: the framed photo, aspect 4:5, ~620 px tall: the house on the hill (their hero) by default, crossfading to the chosen room's own photo (native 529 to 705 px wide, shown at most 600 px wide). Caption under the frame in italic: "Room 1, Jacqueline Jean. Main House, by reception." Small line: "The inn, 1946, on the hill above Pink Sands Beach."
- Cols 7 to 12: H1 "Twelve rooms, each with a name." Lede one line: "A 1946 English manor above Pink Sands Beach, Harbour Island." Dates bar (arrival date, nights stepper min 3, guests stepper). Filter chips: All, King, Queen, Room for three or more, Whole house. The register: rows grouped under Main House, Courtyard, Villas, Infinity House (cap labels); each row = margin number, name (Castoro), bed (small muted), nightly rate right-aligned tabular; list scrolls inside a 300 px window with a soft fade at the bottom edge. Under it the total panel: "3 nights at $595" ... itemised lines collapsible to one line "With 30% tax and gratuity: $2,320.50"; buttons Book this room (accent), Ask about this room (link), US and Canada (843) 278-1724.
Phone 390x844: header 56 (wordmark, Book); H1 (2 lines); photo 4:3 full bleed with caption; dates bar; chips scroll row; the register (all rows, no inner scroll); a sticky bottom bar: chosen room name + total + Book this room (the concept tag lifts above it, --concept-offset 76px).

### Screen 2: the descent
H2 "From the house to the sand." Left cols 1-4 sticky list of four steps (The Main House: lobby, bar and restaurant with views over the ocean. The pool and sun deck step down from the house. The staircase runs on down to the beach, with loungers, umbrellas, kayaks and paddleboards. Pink Sands Beach, 175 feet of beachfront.) The active step is ink with an accent rule; the others muted. Right cols 6-12: four framed photos in a column (house2 582x705, pool 570x705, chairs 705x543, beach 705x470) at native width or less, each one activating its step via IntersectionObserver. Phone: each step's text above its photo.

### Screen 3: the full register
H2 "The register." Four building groups, each a row of: group name and one sentence (Main House: five rooms in the 1946 manor; Courtyard: three rooms that can connect; Villas: three rooms set apart, including Lyon Holland; Infinity House: the five-bedroom oceanfront home). Under each, ruled rows: thumbnail framed at 160 px, number, name, bed, note, nightly rate and "with tax" rate (both tabular), a Choose link that sets screen 1's room and scrolls up. Infinity House as its own spread: photo 705x570 left, facts right (three kings and two rooms of two twins, 2.5 baths, kitchen, living room, outdoor shower, barbecue, washer and dryer, courtyard and oceanfront deck), weekly $21,750 ($28,275 with tax), daily $3,107.14 ($4,039.28). Terms line: 10% room gratuity, 10% VAT, 10% resort levy; 3-night minimum; $150 for a cot or an extra person over age 10. Link: the property map (their PDF).

### Screen 4: dinner and the bar, weddings and events
Pink-sand field band. Restaurant photo (2560 wide) 7 columns 3:2; H2 "Dinner on the hill." with copy: restaurant and bar with ocean views, room service, full concierge. Then lounge (705x455) and patio (705x697) as a pair at native size. Then events: wedding photo (705x470) + H3 "Weddings and celebrations." with the events team line and the Infinity House for the whole party; yoga (705x470) as the days line: beach, water sports, boutique shops, massage, yoga, fitness class.

### Screen 5: getting here
H2 "Plane, taxi, boat, hill." Four steps in a row (phone: stacked): Fly to North Eleuthera International Airport; a short taxi to the dock; a short water taxi across to Harbour Island; up to Love Lane and Colebrooke Streets, above Pink Sands Beach. Note: the concierge helps plan the journey, email link.

### Screen 6: contact, guests' words, the map
H2 "Write to the house." Left: the three published guest quotes (Caroline C., Kathy S., Ty) in Castoro italic, attributed, "as published on runawayhill.com", with their TripAdvisor link. Right: Reservations@runawayhill.com, (242) 333-2150 local, (843) 278-1724 US and Canada, PO Box 27031, Love Lane and Colebrooke Streets, Harbour Island; the property map PDF; Instagram. Final Book this room for the current selection.

rooms.html: H1 "Twelve rooms, each with a name." + the register (screen 1 tool) + screen 3 + terms. island.html: screen 2, 4, 5. Both end with screen 6.

## 5. The core tool: interaction spec
- Inputs and defaults: arrival (empty, native date input, min today); nights 3 (stepper, min 3, max 28; Infinity House shows weekly equivalence when nights >= 7); guests 2 (1 to 10); extra cot or person over 10: 0 (0 to 3); room: 1 Jacqueline Jean; filter All.
- States: empty arrival shows "Choose your arrival" and still totals by nights; filled shows "Fri 12 Mar to Mon 15 Mar"; a filter that hides the chosen room keeps the choice and shows a "Your room is hidden by the filter" line with Show all; no loading or error states (local data).
- Formula: subtotal = rate x nights; gratuity = VAT = levy = 10% of subtotal each; extras = 150 x count (published "$150 for cot and extra persons over age 10", marked "per their rate card, to confirm per night or per stay"); total = subtotal x 1.3 + extras. Room 7: computed at 30% with the note "Their table shows $550.00 after tax, to confirm."
- Animation: row selection, the accent rule slides (layoutId) 220 ms; photo crossfades 520 ms; total digits roll; filter hides rows with height and opacity in 220 ms (layout animation inside the list).
- Keyboard/touch: the register is a listbox (arrow keys move, Enter or Space selects); steppers are buttons with aria-labels; date is a native input; all targets at least 44 px.
- Hand-off: Book this room = https://direct-book.com/properties/RunawayHillInnDirect (no room parameter invented). Ask about this room = mailto:Reservations@runawayhill.com, subject "Room n, Name, arrival", body with room, arrival, nights, guests, extras and the estimate. Phones as tel: links.

## 6. Signature details
1. Margin numbers in the register like a hotel ledger (1 to 11, then IH), with building labels in small caps.
2. The total rolls digit by digit in tabular figures and itemises the three 10% lines.
3. The photograph eases from the house to the room, framed like a print in a passe-partout, and the caption names where it sits.
4. The Room 7 honesty note.
5. The phone booking bar carries the room's name, so the decision travels with you down the page.

## 7. Photography plan (their own site, runawayhill.com/wp-content/uploads/)
- hero 2021/04/runawayhillinn_hotel_harbourislandbahamas14-1.jpg, width/height set 1600x1000 (original upload; shown at most 640 px wide): screen 1 default, 4:5 crop centred.
- restaurant 2026/02/Restaurant-Section-1-scaled.jpg 2560x1707: screen 4, 7 columns.
- house2 2025/01/IMG_0133-582x705.jpg, pool 2025/01/IMG_0148-570x705.jpg, chairs 2018/02/IMG_2336-705x543.jpg, beach 2018/02/IMG_2284-705x470.jpg: the descent, shown at native width or less.
- lounge 705x455, patio 705x697, wedding 705x470, yoga 705x470 (webp): screen 4 at native width or less.
- twelve room thumbnails (sizes from their filenames, 529 to 705 wide): screen 1 frame (at most 600 px) and register thumbnails (160 px).
- Not used: their stock "Barbuda" image. No grade applied.

## 8. Self-review
- Screen 1: the house photo, the twelve named rooms with rates and the itemised total with Book this room, all above the fold on desktop; on phone the H1, photo and dates show first and the booking bar is always visible. The job can be done without scrolling on desktop.
- A1 no badges. A2 no "Phone:" labels (numbers carry their place: "local", "US and Canada"). A3 italic only for captions and quotes. A4 no mono. A5 tokens only. A6 their real rooms. A7 the register is the largest control. A8 grouping by space and rules. A9 specific headlines ("Twelve rooms, each with a name."). A10 one filled button per screen. A11 accent only on Book, selected rule, total. A12 no icons. A13 no ornaments, no SVG drawings. A14 3 px controls, frames square. A15 muted 6.6:1. A16 balance and pretty. A17 margin numbers optically aligned to name baseline. A18 tabular everywhere a number lives. A19 sized frames with field tint. A20 motion explains selection and totals only.
- Unmistakably this inn: the named-room register and the hill. Different from Cape Santa Maria (chart) and the marinas.
