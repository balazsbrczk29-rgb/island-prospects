# Bahamas Rum Cake Factory: design.md
Written Nov 22 from the approved job spec. Builds on the Nov 21 generation 2 site (kept: colour-poster hero, price card, six-pack builder, 2000 story, cart drawer with Shopify hand-off, Bricolage Grotesque + Figtree). Adds the missing second job (the cruise visitor walking to the shop), the free-shipping meter, the travel facts and the FAQ.

## 1. The idea in one paragraph
A colour poster you can buy from. Screen 1 is one cake, 20 oz, on its own studio colour, and the whole screen turns that flavour's colour when you pick another of the fourteen chips. The price card beside it adds to the bag in one tap and offers "Make it a six pack". A switch at the top of the card, "Shop cakes / In Nassau today", turns the same screen into the shop: their turquoise shopfront photo, whether the bakery is open right now (Nassau time), the ten-minute walk from Prince George Wharf as a one-tap walking route, the airport counters, and the line every cruise passenger wants: no refrigeration, cakes go in your carry-on.

## 2. Inspirations
- **Glossier product pages:** the product on its own colour, the add button always beside it, nothing between desire and bag. Taken: the poster ground that is the product's colour.
- **Apple Store "Pick up today" toggle:** one switch changes the page from buying online to visiting in person, same layout. Taken: the "In Nassau today" mode on the hero card.
- **Aesop store pages:** store hours with a calm open/closed line and a walking route, no clutter. Taken: the visit card.
- Food and events playbook: the real product photographed, impulse-buy joy.

## 3. Tokens
- **Type:** Bricolage Grotesque (opsz, 700/800, sentence case, -0.045em) for display; Figtree 400/500/600 for text. Scale: 14 / 17 / clamp(21, 27) / clamp(37, 70) / clamp(48, 106). Leading .95 display, 1.55 text. Tabular figures on prices, meter, hours.
- **Colour:** paper `oklch(95.8% 0.025 85)` #f7f0e0; straw `oklch(85.6% 0.06 85)` #e2cfa3 (six-pack field); ink `oklch(23.9% 0.02 60)` #2b2118 (primary buttons: the one action colour); rum `oklch(49% 0.09 60)` #8c5a2b (story field); palm `oklch(39.8% 0.05 185)` #1f4f4a (travel field, phone links, open-now dot); muted #5e5040 (6.9:1 on paper); line ink at 16%. Flavour grounds are sampled from each studio photo.
- **Space:** 8, 16, 24, 32, 48, 64, 96; side padding clamp(20px, 4vw, 72px); section padding 96 desktop / 64 phone; text measure 28 to 60ch.
- **Shape:** pills for buttons and chips (999px); cards 18px with inner rows 18 - padding; 28px big panels. No shadows except the drawer.
- **Motion:** ease `cubic-bezier(.22,1,.36,1)`; ground colour crossfade 600 ms; photo crossfade 600 ms; card text 220 ms; mode switch 450 ms (photo and card content crossfade, card height animates); cakes drop into six-pack slots on a spring (420/24); bag count pops on add. Reduced motion: instant swaps.

## 4. Screens
1. **Poster + shop tool.** Desktop: full-viewport flavour ground; top bar (wordmark, nav, bag); H1 "The Official Rum Cake of The Bahamas." centred top; the 20 oz bundt photo centred, masked softly into the ground (native 2718 x 2048, shown at most ~1000 px wide); the price card at right (segmented switch "Shop cakes | In Nassau today", flavour name, 20 oz and 4 oz rows with price and Add to bag or Sold out, "Make it a six pack" link, "Shelf stable, carry-on approved" fine line); fourteen chips along the bottom. In Nassau mode: ground turns shopfront turquoise, the shopfront photo replaces the cake, card shows open now/closed, today's hours, 602 East Bay Street, "About 10 minutes' walk from the cruise dock", Walking route button (Google Maps directions), call link, airport counters line. Phone: H1, photo, chips scroller, card below; switch sits at the top of the card.
2. **Six pack.** Straw field. Left: H2 "Fill a six pack.", $37.75, flavour pills; right: six slots, counter, Add six pack. Below the box: the 20 oz two-pack line with price and a link. Phone: stacked.
3. **Travels well (palm field).** H2 "It travels better than you do." Four plain facts in a 2 x 2: no refrigeration, shelf stable; cruise ship and airport approved, carry-on allowed; ships across the US by USPS, UPS or FedEx, free ground shipping over $55; at the airport (US departures: 700 Wines store and kiosk; international: Bahama Pearl). Gift line: Ground, Priority or Express is chosen at checkout. Non-US: order on Etsy.
4. **Story (rum field).** Kept: 2000, George Bates, same place since, Official Rum Cake 2014, Ole Nassau rum, the counter photo (680 x 453 native).
5. **Visit the bakery.** Shopfront photo (2400 x 1600) with the visit card: open now, hours Mon to Sat 7:30 to 4, Sun 8 to 2, closed Christmas Day, Boxing Day, New Year's Day; free samples at the bakery; phone and email; 50+ cakes need 48 hours' notice; walking-route embed (Google Maps directions from Prince George Wharf) with a placeholder.
6. **More from the shop + FAQ.** Kept product row; then the FAQ (allergens, dietary, travel, ships, samples, large orders, shipping) as an accordion.
Dock (phone and desktop, after the hero): Flavours, Six pack, Visit, Bag.

## 5. Core tool spec
- Inputs: flavour (default Original), mode (shop | nassau, default shop). Size rows 20 oz and 4 oz; Add to bag adds one (repeat adds increment).
- States: available, sold out (Strawberry, Pumpkin Spice 20 oz as in catalogue), added (bag pops, drawer opens).
- Drawer: lines, subtotal, **free-shipping meter**: bar fills to $55; text "$11.02 to free ground shipping" (55 - subtotal, tabular) or "Free ground shipping unlocked (US)". Checkout builds `https://thebahamasrumcakefactory.com/cart/<variant>:<qty>,...?note=` with mixed six-pack flavours in the note. Etsy link for non-US buyers.
- "Make it a six pack": dispatches the flavour into slot 1 of the builder and scrolls to it.
- Nassau mode open-now: America/Nassau; Mon to Sat 7:30 to 16:00, Sun 8:00 to 14:00; holiday closures Dec 25, Dec 26, Jan 1. Walking route: `https://www.google.com/maps/dir/?api=1&origin=Prince+George+Wharf,+Nassau&destination=602+East+Bay+Street,+Nassau&travelmode=walking`.
- Keyboard: chips are a radiogroup; switch is a two-option radiogroup; Escape closes the drawer.

## 6. Signature details
1. The whole screen takes the flavour's colour.
2. The mode switch turns the cake into the shopfront and the price card into an open-now card.
3. The free-shipping meter in the bag, ticking with tabular numbers.
4. Cakes dropping into the six-pack slots on a spring.
5. The open-now dot in palm green with the closing time.

## 7. Photography plan
All their own, from their Shopify CDN (seen on their store): 14 bundts `20oz_bundt_*.png` 2718 x 2048 (hero, shown ≤ native via ?width=2400); `Six_Pack_Mixed.png` (builder, 300 px); `IMG_5409.jpg` 680 x 453 (story); `Carnival_3_smiling__customers_six_packs.jpg` 2400 x 1600 (Nassau mode and visit). Product row from catalogue images at 600. No AdobeStock-named files. One grade: their own studio light.

## 8. Self-review
- Screen 1 sells the cake and completes the job (add to bag, checkout) without scrolling; the second job (visit) is one switch away on the same screen.
- A1 no badges. A2 no "Phone:" labels. A3 no random italics. A4 no mono. A5 tokens in :root. A6 the real cake, the real shop. A7 the cake and card dominate. A8 grouping by spacing. A9 specific headlines. A10 one ink primary per screen. A11 palm only for phone/open state. A12 lucide only. A13 no gradients except the photo mask. A14 card radii concentric. A15 contrast checked on flavour grounds (ink on all grounds, paper on Chocolate). A16 balance/pretty. A17 ok. A18 tnum on prices/meter/hours. A19 photo grounds tinted to the flavour colour before load. A20 motion explains (colour = flavour, slot drop = added).
- Care: chips row length on desktop; the hero on phone must show the card's Add button in the first screen or right below it.
- Unmistakably this bakery; unlike any other site in the repo (a colour poster shop).
