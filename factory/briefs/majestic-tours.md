# Majestic Tours: brief (Track A)

## Facts
- Majestic Tours Limited, founded June 1959 by William "Bill" Saunders with his wife Iris. https://majestictoursbahamas.com/about/
- Slogan: "Service is our Profession". https://majestictoursbahamas.com/about/
- Head office: Hillside Manor, Cumberland St, P.O. Box N-1401, Nassau, New Providence. Tel (242) 322-2606, (242) 677-2600; fax (242) 326-5785; email transport@majesticholidays.com. https://majestictoursbahamas.com/contact.php
- Tour bookings: +1 242 677 2600 (tour pages). Tour pages list email info@majestictourbahamas.com (typo, missing "s"). https://www.majestictoursbahamas.com/tours/?id=09
- Tour desks in hotel lobbies: Atlantis (Coral Tower, Beach Tower), Comfort Suites Paradise Island, RIU Paradise Island, Warwick Paradise Island, Margaritaville Beach Resort, Courtyard Marriott, Melia Nassau Beach (two pages disagree on the list/extensions). contact.php, /transportation/
- Fleet: air-conditioned vans, buses, limousines, town cars, SUVs; shared airport transfers (3-4 hotel stops), private transfers, the only accessible private transport on the island (pre-arrange 48 h); transport bookings finalised at least 5 days ahead; meet and greet at Ground Transportation after Customs; US Immigration precleared in Nassau. /transportation/
- Multilingual reps: Spanish, French, German, Italian, Portuguese, Swiss German. homepage
- Awards: 1991 Award of Distinction (Air Canada); 2003-11 Outstanding Customer Service (Thomas Cook Worldwide); 2003 Transfer Company of the Year (Expedia); 2005 Tour Operator of the Year (Cacique); 2013 Quality Assurance Award (MLT Vacations). Member: ASTA, CHA, IATA. /about/
- Sister companies: Majestic Holidays (out island packages), Majestic Travel (IATA agency, opened 1989), Bahama Fantasies (destination management). /about/
- 37 excursions listed on /tours/ (sailing, dinner cruises, Rose Island, Blue Lagoon Island, Exuma Cays, Harbour Island, Stuart Cove's dives, culture, food, pirates, Ardastra, Clifton, Baha Bay, deep sea fishing).
- Flying Cloud Evening Dinner: sail Nassau Harbour at dusk, Bahamian BBQ buffet, bar; pickups Cable Beach 5:00PM, Downtown 5:15PM, Paradise Island 5:30PM; $137.50 adult, $68.75 child under 11, taxes included. /tours/?id=09
- Fantastic Exuma Day Trip: 55 min, 38 nautical miles, Allan's Cay iguanas, Ship Channel Cay, lunch, open bar, hotel transfer included; from $328.90 adult, $209.00 child under 12. /tours/?id=35

## Photos (hotlinked, all from majestictoursbahamas.com tour pages)
powerboat/powerboat.jpg, sandy-toes/veranda-04_480.jpg, transportation/images/fleet.jpg, culture-tour/displaycase.jpg, clifton/cliftonpic2.jpg, food-tour/food_tour_1.jpg, dolphin-encounters/swim-05.jpg, born-free-charters/pink_sand_walk.png, perfect-day/1.jpg, rose-half-day/1.webp, blue-lagoon/BLI12.jpg, flying-cloud/evening/flying-cloud-sunset-picture-1.jpg, flying-cloud/rose.jpg, stuart-coves/wall-01.jpg, stuart-coves/shark-03.jpg, seahorse-sailing/sunset-01.jpg, barefoot-sailing/under-way_480.jpg, pirates/blackbeard.jpg, ardastra-gardens/flamingo_480.jpg, bahamian-waters/days-catch.jpg. Many are 480 px: used at modest sizes, never full-bleed.

## Current site audit
1. Footer still reads (c) 2012-2021; the homepage shows no phone or email.
2. Tour pages send people to info@majestictourbahamas.com (missing "s"): those emails probably bounce.
3. Two pages list different hotel desks and extensions; guests cannot tell which is current.
4. 37 excursions in one alphabetical list with no way to filter by island, evening or family.
5. The 1959 founding, the Saunders family and five industry awards are hidden on the About page.
6. Bookings need a separate itinerary form; nothing tells a guest on a phone what to do next.

## Audience
Resort guests on Paradise Island and Cable Beach, cruise passengers, arriving air travellers with vouchers, travel agents and corporate groups. Mostly on a phone in a hotel lobby, deciding today or tomorrow.

## Primary conversion
Excursion enquiry by email/phone ("Plan my excursion"), secondary call (242) 677-2600.

## Strategy
Sitemap: index (map, dinner cruise, story, transfers teaser, enquiry, FAQ), excursions.html (filterable list of all real tours), transfers.html (shared/private/accessible arrival steps, fleet, quote).
Journey: lobby QR / Google "Nassau excursions" -> sees 1959, awards, where each trip goes -> sends prefilled enquiry or calls.
SEO primary: "Nassau tours and excursions"; secondary: "Nassau airport transfers", "Rose Island swimming pigs tour from Nassau", "Nassau dinner cruise", "Exuma day trip from Nassau".

## Buyer portrait
US/Canadian couples and families at Atlantis, RIU, Warwick, 35-65, mid to high income; compare with Viator and the hotel concierge; fear scams, no-shows at the airport, wasted cruise day. Feel they chose well when the operator is old, local, awarded and shows exactly where the boat goes.

## Brand truth and feel
Brand truth: a Bahamian family company that has met guests at the airport and taken them across the water since 1959. Feel: gracious, assured, sunlit, heritage, organised.

## Positioning
For visitors staying in Nassau and Paradise Island who want the right day out without risk, Majestic Tours is the Bahamian-owned tour and transfer company that has run since 1959 with desks in the hotel lobbies.

## Design spec
Reference study: belmond.com (full-bleed editorial imagery per destination, quiet serif, destinations as an index), stuartcove.com (local benchmark: activity-led, booking up front but templated Elementor). Our take: map-led hero.
- Hero: map-led typographic. Huge Yeseva One headline left on limestone paper; right, an SVG chart of New Providence and the routes Majestic runs (Rose Island, Blue Lagoon Island, Exuma Cays 38 nm, Harbour Island, the southwest reefs) drawing in as dashed lines. "Illustration, not to scale". Glass card with call + plan CTA.
- Fonts: Yeseva One 400 (display), Albert Sans 400/500/600 (body).
- Palette: paper #f3eee4, paper-2 #e9e1d2, ink #1b2724, shutter green #2e6a55 (accent), green deep #1f4c3d, shallows #a9d8cf, sand #d9b98a, muted #5a645f, line #d8cebd.
- Signature: interactive route map ("Where the day goes"): tap a destination, the route lights and the panel lists Majestic's real trips there with a real photo. Second interaction: filterable excursion index (excursions.html) and arrival stepper with Tabs (transfers.html). Enquiry Tabs compose an email.
- Components: BlurText avoided; motion line-split headline, shadcn Tabs, Accordion, Sheet; Magic UI Marquee for the languages band.
- This shows the routes from Nassau because the brief lists trips to Rose Island, Blue Lagoon, Exuma Cays and Harbour Island.

## Assumptions to confirm with the owner
- Which hotel desks are current; current prices for the two listed rates; whether tours can be booked by email to transport@majesticholidays.com.

## Unknowns
Hours, WhatsApp, logo files, high-resolution photography.

## Scorecard (after QA)
See status notes.
