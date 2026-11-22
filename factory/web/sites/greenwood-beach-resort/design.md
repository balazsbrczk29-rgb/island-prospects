# Greenwood Beach Resort: design.md

## 1. The idea in one paragraph
A diver planning a spring trip opens the page and sees Greenwood's own photograph of an oceanic whitetip at the surface, framed letterbox, and under it "Port Howe" set huge on limestone. Beside the name sits the booking strip: tap King or Family (their photo swaps in, with sleeps and beds), choose arrival, nights and adults, and "Check dates" opens Greenwood's own direct-book engine with those dates filled. Under the strip a twelve-month calendar line marks March to June in deep sea blue: pick a date in that band and it says your stay falls in whitetip season and offers the dive package; pick December and it says the whitetips return in March. The calendar turns into a reason to book.

## 2. Inspirations
- **Aman:** the booking bar lives right under the photograph, with one quiet action.
- **Patagonia "Worn Wear" and dive-operator season charts:** a single horizontal month strip with a band for the season, the chosen month marked.
- **Criterion Collection:** letterboxed stills, limestone bars, type set like a film programme (kept from our previous version).

## 3. Tokens
**Type.** Display: Noto Serif Display variable (kept), light 300, monumental. Text and UI: Albert Sans variable (new), a clean, slightly warm grotesk with tabular figures; Source Serif 4 is retired so there is one serif and one sans.
Scale: xs 14, sm 16, base 18 (phone 17), lg 22, xl clamp(30, 3.4vw, 44), 2xl clamp(40, 5.2vw, 76), mono-word clamp(84, 20vw, 300). Display tracking -0.035em, leading 0.95.
**Colour (hex; OKLCH in brackets).** ground limestone #efeae0 (oklch 93.8% 0.014 85), ground-2 #e6dfd2, ink #1b1a17 (oklch 21% 0.007 85), muted #5b564d (6.2:1 on ground), line #cdbf9f, sand #b89b6a (hairlines only), accent sea glass #2f6f73 (oklch 49% 0.06 200) for primary actions, deep sea field #123a4a (oklch 32% 0.05 225) for the whitetip band and whitetip section, on-glass #eef1ea.
**Space.** 8-based: 8 16 24 32 48 64 96 128; gutter clamp(16px, 4vw, 56px); 12 columns, 32 gutter; measure 64ch.
**Shape.** Square photo frames (film), radius 999 on steppers, 2 on buttons. No shadows except the phone action bar.
**Motion.** Ease cubic-bezier(.22,1,.36,1). Feedback 180 ms, room photo swap 520 ms crossfade with 1.04 scale settle, season marker slides 450 ms along the month strip, film chapters as before. Reduced motion: no scale, instant marker.

## 4. Screens
**1. Hero.** Desktop 1440x900: limestone bar 64 (wordmark, "Check dates", Menu). Photo band: whitetip at the surface (1024x683 native) shown at 1024x clamp(300, 38svh, 380), centred, letterbox. Lower bar grid: cols 1-5 cap "Greenwood Beach Resort, south Cat Island" + h1 "Port Howe" (mono-word, clamp 96-150) + one line about Pauline and Antoine and the water; cols 6-12 the booking strip: room toggle (two tiles: 88x58 thumbnail, name, "Sleeps 2, one king" / "Sleeps 3, king and single"), arrival, nights, adults, primary "Check dates"; below it the season line (12 months, Mar-Jun band, marker) and its sentence. Phone: bar 56, photo 4:3, h1 19vw, the strip stacked (room tiles side by side, then arrival full width, nights and adults side by side, button full width), season line.
**2. Two rooms, compared.** Two columns, each: photo (1024 native, shown at max 640 wide, 3:2), name, sleeps and beds as a small spec list, who it suits (marked as our wording), "Book this room" (deep link with roomTypeId). Phone: stacked.
**3. The water and the table (kept film).** Wind, Deep blue (March to June), the reef, Table (breakfast 8 to 10, lunch 12 to 2, dinner 6 to 8, book dinner a day ahead by WhatsApp), Night.
**4. Whitetip season and the package builder (kept).** Deep sea field, "March to June", the package enquiry with nights, divers, non-divers, board, whitetip dive days.
**5. Pauline and Antoine (kept, without the review quote).**
**6. Getting here (kept end credits).** USA via MakersAir, Nassau via Western Air, then taxi or car.
**7. Contact and book (footer).** WhatsApp +1 242 808 1846, +1 242 342 3053, info@, 1 Ocean Drive, Port Howe; "Check dates".

## 5. The core tool: interaction spec
- Inputs: room (king), arrival (today + 30 days), nights (4, 1 to 28), adults (2, max 2 King / 3 Family; clamps when switching room).
- Output: href = direct-book with checkInDate, checkOutDate, adults, roomTypeId and rateId exactly as their rooms page uses (kept function bookingUrl). Button label "Check dates for <Mon d> to <Mon d>".
- Season line: month m of arrival; in season if m in 3..6. In: "Your dates fall in whitetip season, March to June. Add the dive package." (link to #whitetips). Out: "Oceanic whitetips visit from March to June. In <Month>, ask Pauline and Antoine about kite lessons and reef trips." No kite months are claimed (Greenwood does not publish them).
- States: no arrival (shows "Choose a date", button "Check dates and book" to the engine root); filled; switching room crossfades the thumbnail and the hero tile.
- Keyboard: room tiles are a radiogroup; steppers are buttons with aria labels; the date is a native input.

## 6. Signature details
1. The month strip with the deep-sea Mar-Jun band and a marker that slides to your arrival month.
2. Room tiles with their own photo thumbnails; switching room re-limits the adult count visibly.
3. "Port Howe" set monumental, finally naming the place.
4. Letterbox frame carried from the hero through the film chapters.
5. The button repeats your dates, so the hand-off is unmistakable.

## 7. Photography plan (greenwoodbeachresort.com uploads, 2026/08)
- Surface-1024x683 (whitetip at the surface): hero, 1024 wide max, crop centre 45%.
- King-size-AC-room 1024x623 and Cat-Island-Greenwood-room 1024x683: hero tiles at 88x58 and compare screen at max 640x427.
- Film and whitetip section photos as before (1024 or 768 wide, never wider). Hosts 1024x682 at max 720.
- Kite lesson photo moves into the film's Wind chapter.

## 8. Self-review
- Screen 1 desktop: photo, Port Howe, both rooms, dates, button and season line all above 900. Phone: photo, name and room tiles on screen 1, dates and button on screen 2 with the action bar.
- A1 no badges. A2 labels short (Arrival, Nights, Adults). A3 italic only for captions. A4 no mono font. A5 tokens. A6 real rooms and water. A7 the strip is the largest control. A8 grouping by space and hairlines. A9 "Port Howe". A10 one primary per screen. A11 sea glass only on actions; deep sea only for the season. A12 no icons. A13 no ornaments. A14 square frames. A15 muted 6.2:1. A16 balance/pretty. A17 optical alignment of the strip numbers. A18 tabular in strip, months, hours. A19 tinted photo placeholders. A20 motion explains swaps and the season.
- Different from other Cat Island and resort sites in the repo: limestone letterbox film, the season calendar as the hero detail.
