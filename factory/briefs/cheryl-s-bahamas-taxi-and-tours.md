# Cheryl's Bahamas Taxi and Tours (Nassau) : Track A (cherylbahamastaxiandtours.com)

## Facts (home + /bahamas-tours.html)
- Taxi and private tour operator covering Nassau and Paradise Island; "for over 25 years"; Registered Taxi Service #1080.
- Airport transfers: a representative waits in Nassau arrivals holding a card with your name; drivers and reps wear a navy blue and yellow uniform with the company logo; air-conditioned vehicles; trained drivers; service across New Providence; lunch, dinner, downtown drop-offs; car and booster seats free; baby-sitting and wheelchair rentals added.
- Private tours, all in English or Spanish, Spanish translators available; drinks included (Bahama Mama, beers, sodas, water); historic-site entry usually $3-$5; tours customisable; complimentary gift for special occasions.
- Example tours: Full day out with picnic lunch (min 8 hours; picnic for min 6 people; can include the 66 Steps, snorkelling at Jaws Beach); Sightseeing and shopping (3 hours; e.g. Paradise Island incl. Atlantis, 66 Steps, Jaws Beach, help negotiating fair prices).
- Stops offered: The Forts (Fort Charlotte, Fort Fincastle and the 66 Steps, Fort Montague; re-enactment Wed and Fri 11:30am, cannon at noon, small entrance fee); Conch demonstration (conch salad $10 a bowl, shares 4); Love Beach time (snorkel $20); Fish Fry; Junkanoo World Museum; Bahama hand craft; Rum distillery; Rum Cake Factory; Bahamian candy store; Clifton Heritage Park (45-min immersion, ATV option); Ardastra Gardens Zoo (flamingo show 10:30am, entry $18pp, under 4 free); Blue Lagoon beach day; Dolphin swim; snorkel cruise to Rose Island; fishing and snorkeling; swimming with pigs (Exuma day trips; Pieces of 8 Charters $400 adult, $365 child 5-11); parasailing and jet ski; glass bottom boat; the Cloisters; the Bat Cave.
- Contact: office 9am-6pm 7 days 1 (242) 423 4982, 1 (242) 393 9899; out of hours 1-242-423-4982, 1-242-525-5729; also 1-242-393-3667; cherylfoxferguson@live.com; all major credit cards; online booking page /book-online/.
- Recognition shown on site: TripAdvisor Travellers' Choice 2022 badge; Certificate of Excellence; Mastercard newsroom article (2014).
- Photos: /Resources/cheryl-taxi.jpeg, fleet.jpeg, desertedbeaches.jpeg, the-forts.png, conch.png, fish-fry.png, junkanoo.png, ardastra-gardens-zoo.png, snorkeling.png, time-at-the-beach.png, rum-cake-factory.png, clifton-heritage-park.png.

## Audit
1. A "Covid 19 Update" banner still sits at the top of the homepage.
2. Footer says 2022; tour page heading "Conch Demonstration" repeats above the ATV tour.
3. Five different phone numbers across the site and a live.com email.
4. Claims like "#1 Taxi & Tour Company" without proof can put off careful travellers.
5. The page zooms out on phones (old viewport setting) and the tour list is one long scroll with no way to plan.

## Buyer
Cruise passengers and resort guests (US), families, Spanish-speaking visitors; on phones; compare with ship excursions and other taxis; fear: being left at the airport, overpaying, unsafe drivers. Reassured by the name card, uniforms, registration number and a clear plan.

## Primary conversion
"Plan my tour" -> email/call; secondary "Book my airport pickup".

## Design spec
- Brand truth: Cheryl's driver is the one in navy and yellow holding your name at arrivals.
- Feel: warm, punctual, local, cheerful, reliable.
- Type: Familjen Grotesk 500-700 + Atkinson Hyperlegible 400/700.
- Palette (their uniform): --navy #1b2b52, --yellow #f5c84c, --paper #f4f4f0, --ink #141a2b, --muted #545b69, --line #d9dbd6.
- Hero: arrivals name card: type your name, the card updates (signature interaction 1). Interaction 2: tour builder from their real stops -> email/call summary.

## Gen-2 rebuild (2026-11-20)
New facts (book-online JotForm + tours page, scraped today): transfer form asks one-way or round trip; VAN (private) or SUV (private luxury); arrival and departure flight, airline and number; "the name you would like to appear on arrival sign"; passengers; kids' ages and car or booster seats, strollers; grocery pre-arrival shopping (service fee applies); first-time or returning; hotel or tower; checked and carry-on bags (each person over 3: one carry-on and one checked bag; extra $3.30 suitcase, $5.50 duffle). Snorkel cruise: about 6 hours, Rose Island 8 miles east of downtown, BBQ lunch, hotel transfers from most hotels. Pieces of 8: 38 ft Fountain powerboats, 5 cays, $400 adult, $365 kids 5-11, cancellation 72h+ full refund. ATV: one rider per ATV, valid driver's licence, helmets and gloves provided. Fish Fry: 15-20 restaurants. Ardastra: 4+ acres, flamingo show 10:30am, $18pp, under 4 free.

**Big idea:** The first thing a Cheryl's guest sees in Nassau is their own name on a card held up by someone in navy and yellow; the page is that card, a poster you put your name on, and everything after it (the ride, the booking ticket, the day you build from 16 real stops) carries your name.

**Direction:** A09 Colour poster + P14 Blue hole + T06 Wide grotesk (Syne variable 600-800 lowercase display, Atkinson Hyperlegible 400/700 body: an airport-signage face for a company whose product is a sign with your name). Why: P14's deep blue and #F2D16B yellow are Cheryl's own uniform colours; the poster archetype matches a cheerful, signage-led taxi brand and its ticket booking block is exactly the transfer form; nav N4 floating dock = thumb-reachable Pickup / Tours / Call for cruise guests on phones. Motion M6: the name card springs up like it is being held, tour tickets spring into your day.

**Storyboard (desktop 1440x900):**
1. Hero, deep blue field: left, huge lowercase Syne "look for your name." with one line under it (25+ years, Nassau and Paradise Island) and Book my airport pickup (yellow) + Plan a tour; right, the white arrivals card, slightly tilted, showing what you type ("Your name") in Atkinson bold, with the real team photo (two drivers in navy and yellow beside the white van) as a print clipped under it. Dock at the bottom centre.
2. Paper ground: "From the gate to your hotel" three beats in huge numerals beside the fleet photo (real fleet with uniformed drivers): you land, you see navy and yellow and your name, air-conditioned ride with free car and booster seats.
3. Aqua field: the pickup ticket. A boarding-pass shaped form built from their real JotForm fields; the name typed in the hero is already on it; sends a prefilled email.
4. Paper: "Build your day" teaser: two sourced templates (3-hour sightseeing and shopping, full day with picnic 8h) as big posters with real photos, linking to the tours page builder.
5. Yellow field: what every private tour includes (drinks, entry fees $3-5, free car seats, a gift for special occasions, English or Spanish) in big type.
6. Deep blue: one number, day or night (423 4982 is both office and out-of-hours), other numbers, email, hours, reg #1080, TripAdvisor Travellers' Choice 2022, credit cards. Footer.
**Phone (390x844):** 1) headline + card with input + yellow CTA; dock at bottom. 2) the team photo then steps. 3) ticket form single column.
**Tours page:** poster header "pick your stops", filter chips (history, food and rum, beach and water, culture), photo tickets with sourced times and prices, tap to add; your day ticket (sticky right desktop / bottom sheet phone) with tour length, language, people, date, send.
