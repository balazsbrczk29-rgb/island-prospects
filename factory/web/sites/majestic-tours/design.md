# Majestic Tours: design.md

## 1. The idea in one paragraph
A guest in a hotel lobby says "animals, half day, no swimming" and the page answers at once: a real map of the Nassau waters, drawn from OpenStreetMap coastline, lights the places where the matching boats go, and a row of their own tour photographs slides in with the trip name, length, pickup and price where Majestic publishes one. One tap on "Ask about this trip" opens a short note already addressed to the working Majestic email with the trip filled in; the date, guests and hotel take ten seconds. Above it all, in a monumental serif on Bay Street yellow, "Out of Nassau." and the quiet proof: a Bahamian family company since June 1959. A second tab does the same for airport transfers.

## 2. Inspirations
- **Airbnb Experiences search:** filters as large chips, results update in place with a count, cards rise as the set changes.
- **Apple Maps place cards / Google Travel:** a small, calm map with lit pins, beside a list that it stays in sync with (hover a card, its pin rings).
- **Aesop and Monocle travel guides:** monumental serif headline, generous paper, small framed photographs at their true size, captions in a quiet italic.
- Kept from our previous version: the "Out of Nassau" stop-by-stop horizontal journey (now the browse view below the finder), the Bay Street pastel palette, excursions and transfers pages, the prefilled enquiry.

## 3. Tokens
**Type.** Display: Playfair Display variable (kept), a high-contrast colonial serif that reads as old Nassau signage. Text, finder and prices: Figtree variable (new), a clear, friendly grotesk with tabular figures. Newsreader is retired so there is one serif and one sans.
Scale (desktop / phone): cap 14/13 Figtree 500 (lh 1.35); small 16/15 (lh 1.5); body 18/17 (lh 1.55); lead 22/20 (lh 1.35); h3 30/26 Playfair (lh 1.1); h2 56/40 Playfair (lh 1, -0.03em); hero 112/64 Playfair 500 (lh 0.9, -0.035em).
**Colour (sRGB hex, OKLCH noted).**
- ground #fbf7ec (oklch 97.6% 0.018 92), surface #ffffff, field Bay Street yellow #f6e3a6 (oklch 91.9% 0.083 91) for the hero and booking frame
- ink #2a2420 (oklch 26% 0.012 50), muted #625a51 (oklch 46% 0.017 70, 6.6:1 on ground, 5.4:1 on field), line #e3d8bf
- accent shutter green #2f6b55 (oklch 47% 0.07 165), primary actions, lit pins, active chips; white text 6.3:1
- map water #d9ecea (oklch 92.5% 0.022 190), map land #fbf7ec with #c9bda0 hairline
- salmon #e9a7a0 only for the 38 nm route line to Exuma on the map
**Space.** 4/8: 4 8 12 16 24 32 48 64 96 128. Section padding 128/72. Side pad clamp(20px, 4vw, 64px). Grid 12 cols, gutter 32. Measure 62ch.
**Shape.** Radius 4 outer cards and map, 999 chips, 2 inner photo inside card (4 - 2 padding). One soft shadow on the enquiry sheet only.
**Motion.** Ease cubic-bezier(.16,1,.3,1). Feedback 180 ms (chip, pin ring), result cards 350 ms with layout animation and 30 ms stagger capped at 6, sheet 450 ms from the right (from the bottom on phone), journey track as before. Reduced motion: no translation, instant swaps.

## 4. Screens
**1. Finder (hero, field yellow).** Desktop 1440x900: header row (wordmark, Excursions, Airport transfers, Since 1959, Hotel desks, (242) 677-2600). Grid 12: cols 1-5 the headline and controls, cols 6-12 the map (top, 4:3 box) with the results rail directly under it.
- Left: cap "Nassau and Paradise Island · a Bahamian family company since June 1959"; h1 "Out of Nassau." (hero size); tabs Excursions | Airport transfer; then the filters: "What" chips (All, Sails and evenings, Islands and animals, Dive and snorkel, Fishing, On the island), "How long" chips (Any, Half day, Full day, Evening), and a "No swimming needed" switch. Count line: "11 trips fit. Tap one to ask." Call line beneath: "Or call (242) 677-2600".
- Right: map (land paper, water pale aqua, place labels in Playfair italic, lit pins in green with a count, dimmed pins grey, a salmon dashed line Nassau to Exuma labelled "38 nautical miles, 55 minutes"). Under it the results rail: cards 232 px wide, tour photo 232x150 (their own; most sources 480 or more wide), name, a facts line (length, pickup, price only where published), "Ask about this trip" (green text button) and "Tour page" link.
- Phone: header, h1 64px, tabs, chips scroll horizontally in one row per group, the map at 4:3 full width, then the rail swipes. "Ask" sticky bar after the hero.
**2. The journey (kept, browse view).** The pinned horizontal track on desktop, the swipe on phone: Nassau Harbour, Blue Lagoon, Rose Island, the reefs, Exuma, Harbour Island, each with its real trips; the first frame becomes a quieter intro "Stop by stop, out of Nassau." with the Flying Cloud photo; the last frame is the booking form.
**3. Airport transfers.** Kept section: the arrival in four lines, shared, private, accessible, fleet photo, link to transfers page.
**4. Since June 1959.** Kept story on shutter green: Bill and Iris Saunders, "Service is our Profession", the five awards, languages, memberships.
**5. Hotel desks.** Kept: one list.
**6. Questions and contact.** Kept FAQ and footer with phones and the working email.

## 5. The core tool: interaction spec
- Inputs: tab (excursions default), what (All), length (Any), dry (off). Hover or focus a card rings its pin; click a pin filters to that place (pin toggles, chip "Place: Rose Island x" shows).
- Data truth: lengths only where the tour name or Majestic's own line states it (Half Day, Full Day, Day Trip, all-day, Evening, Sunset, Night, Morning or Afternoon dives count as half day). Trips with no stated length show under Any only, labelled "Length on the tour page". "No swimming needed" = on-land trips, evening and sunset sails, the pirate ship and fishing charters; it never claims anything about age limits.
- States: results (default 37); filtered; empty ("No trip fits all three. Clear one filter" + clear button); loading not needed (static).
- Result animation: Motion layout + AnimatePresence popLayout, cards fade and rise 12 px, 30 ms stagger. Pins: lit pins scale from 0.6 to 1 and fill green; count text ticks.
- Ask: opens a sheet (dialog, focus trapped, Esc closes) with trip prefilled (read-only line + change link), date, guests (adults, children), hotel or ship, name; "Send to Majestic" composes mailto transport@majesticholidays.com (the address on their contact page; tour pages carry a misspelled one), subject "Excursion enquiry: <trip>, <date>". Call (242) 677-2600 beside it.
- Transfer tab: arrival flight, date, party size, hotel, type (Shared, Private, Accessible: "arrange at least 48 hours ahead"), composes the same email with subject "Airport transfer: ...". The map dims and shows the meet point line: "Meet and greet at Ground Transportation, after Customs."
- Keyboard: chips are toggle buttons (aria-pressed); rail is a list, arrow keys scroll; sheet traps focus.

## 6. Signature details
1. The map lights only where the filtered boats go, with a count in each lit pin.
2. The salmon 38 nm dashed line out to the Exuma Cays, captioned with Majestic's own "55 minutes".
3. Hover a card and its pin rings, so the place and the trip are one thing.
4. The enquiry sheet opens with the trip already written in, addressed to the email that works.
5. Prices appear only where Majestic publishes them, set in tabular figures: "$137.50 adult, $68.75 child" for the Flying Cloud, "from $328.90 adult" for Exuma.

## 7. Photography plan
- Tour photos from majestictoursbahamas.com/data/tours/images/ (their own), rail cards at 232x150 (sources 350 to 1903 wide; the 350-wide wall photo is used at 232). Never larger than source.
- Flying Cloud sunset 965x675: journey intro frame, max 600 wide.
- Journey frames as before (sizes in data.ts PIC). Fleet 640x321 at max 560.
- Map: coastline © OpenStreetMap contributors (geo-maps earth-lands-100m, ODbL), projected Mercator, credited under the map.

## 8. Self-review
- Screen 1: headline, filters, the lit map and the first four results with their Ask buttons are all above the fold on desktop; on phone the filters and map are on screen 1 and the rail on screen 2, with a sticky Ask/Call bar.
- A1 no badges. A2 chip groups labelled once. A3 italic only for map labels and captions. A4 no mono. A5 tokens above. A6 their own tour photos in every card. A7 the finder and map are the largest elements. A8 grouped by space. A9 headline is their own phrase and place. A10 one primary per screen (Ask / Send). A11 green only for actions, lit pins, active chips. A12 lucide only (phone, arrow, x). A13 no ornaments. A14 radii 4/2. A15 muted 6.6:1 on ground. A16 balance/pretty. A17 pins optically centred. A18 tabular on prices, counts, times. A19 photo frames sized with tinted ground. A20 motion explains filtering.
- Unmistakably Majestic: 1959, their 37 trips and photos, their pickups and prices, the real Nassau waters. Different from the marina and resort sites in the repo: Bay Street yellow, monumental serif, a filtering map of day trips.
