# Niche playbooks

Each record in `prospects.json` has a `niche`. Read only your niche's section. Trust signals listed here are **types to look for in research**, never things to invent.

---

## hospitality-stay (hotels, resorts, inns, lodges, beach clubs)
**Who buys:** US/Canadian couples and families planning 2-6 months ahead, on a phone, comparing against Booking/Expedia. Repeat guests. Wedding/group planners. Anglers (fishing lodges).
**The job of the site:** make them want *this place* and give them a direct-booking path that beats the OTA (direct contact, perks, flexibility).
**Primary CTA:** "Check dates" / "Ask about availability" / "Plan your stay" → enquiry form (dates, guests, room interest) that opens WhatsApp or email prefilled. If they have a real booking engine URL, link it instead.
**Sitemap:** `index.html` (story, rooms teaser, experience, getting here, enquiry), `rooms.html` (each room type: real name, bed, view, sleeps, features from research), `island.html` or `experiences.html` (what to do: diving, fishing, beaches, dining on property), plus `#getting-here` section (airport, flight/ferry, transfer) because Out Island guests always ask.
**Sections that convert:** a hero that shows place + name + island in one glance; "Getting here" with the nearest airport code; room comparison as a refined list or table (not cards); dining/bar block; FAQ (check-in times, transfers, kids, pets, only if facts known); enquiry with dates.
**Trust signals to look for:** real awards (e.g. Conde Nast), years in operation, family ownership, press quotes from their own site, TripAdvisor certificates they display.
**Schema:** `Hotel` or `Resort` or `LodgingBusiness` (+ `BedAndBreakfast` for inns), `amenityFeature`, `checkinTime`, `geo`, `containsPlace` for Restaurant.
**Signature ideas:** a room selector that slides between room types like louvred shutters; a "day here" timeline from sunrise to dock-bar sunset; the island drawn as a chart with the property marked.
**Pitfalls:** fake "from $" prices; hiding the island name; no transfer info; lightbox galleries that trap mobile users.

## marina (marinas, yacht clubs, marina + hotel combos)
**Who buys:** boaters already underway or planning a crossing (Florida → Abaco/Grand Bahama/Bimini), checking on a phone with bad signal. Also captains of larger yachts and their agents.
**The job:** answer the four questions boaters ask before calling: Can my boat fit (max LOA, beam, draft at MLW)? What's the rate and what's included (power 30/50/100A, water, wifi, pump-out)? Is there fuel (diesel/gas, hours)? Can I clear customs here (port of entry or not)? Then: VHF channel and phone.
**Primary CTA:** "Request a slip" → form with boat name, LOA, beam, draft, arrival/departure dates, power needs → WhatsApp/email prefilled.
**Sitemap:** `index.html` (approach, facilities, slip request), `marina.html` (specs table, fuel, rules, approach waypoints only if published by them), plus a stay/dining page if they have rooms or a restaurant.
**Sections that convert:** a "Dock specs" table high on the page; VHF channel + phone in the header on mobile; approach and depth notes (only sourced); amenities as an honest checklist; "Ashore" (groceries, dining, golf carts) block; weather/tide links to official sources.
**Schema:** `Marina` (it's a schema.org type, subtype of CivicStructure; pair with `LocalBusiness` via `@type: ["Marina","LocalBusiness"]`), `geo` required.
**Signature ideas:** a depth sounding scale that fills as you scroll to the specs; a slip map drawn in SVG; a nautical chart grid behind the hero.
**Pitfalls:** pretty hero with no specs; publishing waypoints you did not source (safety issue: never invent coordinates or depths).

## tours-experiences (dive, boat rentals, tours, taxis, attractions)
**Who buys:** cruise passengers with 6-8 hours ashore, resort guests, families; deciding fast on a phone, often the same day.
**The job:** show each tour/rental clearly (duration, what's included, pickup, who it suits) and make same-day contact effortless.
**Primary CTA:** "Reserve on WhatsApp" if a WhatsApp number is sourced, else "Request this tour" / "Check boat availability".
**Sitemap:** `index.html`, `tours.html` (or `boats.html` / `fleet.html`: each item with real details), `plan.html` (pickup points, what to bring, safety, policies if known) or a contact page.
**Sections that convert:** tour list as a scannable timeline or a filterable list (by duration / family-friendly / private); cruise-port timing note if relevant; safety and licensing facts; meeting point map.
**Schema:** `TouristAttraction` + `LocalBusiness`, each tour as `Product` or `TouristTrip` with `offers` only if real price is published.
**Signature ideas:** a depth gauge for dives; a boat-size comparator; a "your day" builder that sums durations.

## real-estate (brokerages, agents, developments)
**Who buys:** foreign buyers (US, Canada, UK, Europe) researching for months; locals renting; investors asking about residency and duty.
**The job:** establish the brokerage as the expert guide and capture a lead (buyer brief) rather than compete with portals on listings volume.
**Primary CTA:** "Tell us what you're looking for" (buyer brief form: island, budget band, timeframe, buy/rent) or "Request a valuation" for sellers.
**Sitemap:** `index.html` (positioning, islands served, featured areas, brief form), `buying.html` (process for foreign buyers in plain steps; only facts you can source, link to official sources for duty/stamp-tax and permanent residency rules rather than stating numbers you did not verify).
**Schema:** `RealEstateAgent`, `areaServed`.
**Signature:** an island selector map; a "buying from abroad" step tracker.
**Pitfalls:** fake listings, invented prices, stating legal/tax rates without a source.

## professional-services (law, trust, insurance, securities, consulting, design, IT, office equipment)
**Who buys:** businesses and individuals who need reassurance; often referred, checking credibility before calling.
**The job:** look established, precise and calm; make practice areas legible; make contact easy and private.
**Primary CTA:** "Arrange a consultation" / "Request a quote" / "Speak to a broker".
**Sitemap:** `index.html` (positioning, practice areas/services, why us from real facts, contact), `services.html` or `practice-areas.html`.
**Tone:** restrained, editorial, generous white space, serif or refined grotesk display. No stock handshakes.
**Schema:** `LegalService`, `InsuranceAgency`, `FinancialService`, `ProfessionalService` as fits. Regulated firms: show licence/regulator only if sourced (e.g. Securities Commission of The Bahamas registration).
**Pitfalls:** inventing partner names or bios; claiming "No.1"; regulatory claims without source.

## industrial-b2b (oil, shipping, shipyard, engineering, construction, roofing, electrical, water treatment, security, materials, salt, pharma)
**Who buys:** procurement managers, project managers, developers, insurers, government tenders, foreign partners checking capability.
**The job:** capability statement online: what they do, at what scale, certifications, safety, projects, how to request a quote or tender.
**Primary CTA:** "Request a quote" / "Discuss a project" / "Contact operations".
**Sitemap:** `index.html` (capabilities, sectors served, safety/standards, projects only if sourced, contact), `capabilities.html` or `services.html`.
**Sections:** capabilities as a precise spec-style list; "Hurricane season" or "After the storm" block for roofing/construction/glass (real and locally relevant); safety and certifications only if sourced; service area map.
**Schema:** `LocalBusiness` subtypes: `RoofingContractor`, `Electrician`, `GeneralContractor`, `HomeAndConstructionBusiness`, `ProfessionalService`, or `Organization` for large corporates.
**Design:** industrial does not mean grey and dull: precise grids, technical drawings in SVG, confident type, one strong brand color.

## trade-retail (hardware, building supplies, vehicle dealers, pools, glass, paper, upholstery)
**Who buys:** homeowners, contractors, businesses; locals in Nassau/Freeport, often checking "do they have it / are they open / where exactly".
**The job:** opening hours, location, departments/product categories, and quick contact. For services (pools, upholstery): before/after style project storytelling (only with real photos) and quote requests.
**Primary CTA:** "Call the store" / "Ask about stock" (WhatsApp) / "Request a quote".
**Sitemap:** `index.html` + `departments.html` or `services.html`.
**Schema:** `HardwareStore`, `HomeGoodsStore`, `AutoDealer`, `Store`, or service subtype; `openingHoursSpecification` only if sourced.
**Platform note:** retail is a future delivery-platform merchant. In `site-data.json` set `platform.candidate: true` and list product categories.

## food-events (catering, bakeries, rum cake, wedding planners, food distribution, brewery, restaurant franchise)
**Who buys:** couples planning destination weddings (US-based, months ahead), event organisers, cruise visitors buying gifts, businesses ordering catering.
**The job:** show the craft and taste; make enquiry or order simple. For wedding planners: packages and process, real galleries only, enquiry with date and guest count.
**Primary CTA:** "Check your wedding date" / "Order a rum cake" / "Request a catering menu". Never "Book a Table".
**Sitemap:** `index.html` + `menu.html` / `packages.html` / `order.html`.
**Menus:** an elegant typographic list grouped by course or category. Never a card grid.
**Schema:** `FoodEstablishment` / `Bakery` / `CateringService`-style `LocalBusiness`, `EventPlanner` for weddings.
**Platform note:** set `platform.candidate: true`; structure items in `site-data.json` catalog with name, description, price only if published. Include a visually present but inactive "Order online, coming soon" hook in the menu/order page (`data-platform="order"`), matching the agency's future delivery platform.

## institution (government agencies, associations, chambers, promotion boards, media, hospitals, development banks)
**Who buys:** members, citizens, investors, visitors, journalists. Often many audiences.
**The job:** clear wayfinding by audience ("I want to..."), search-friendly services, membership or service applications online instead of PDFs, accessibility.
**Primary CTA:** audience-specific: "Become a member", "Find a member", "Apply for a loan", "Plan your trip".
**Sitemap:** `index.html` (audience router, top tasks, news/updates only with real items) + one inner page for the most important task (membership, directory, services).
**Schema:** `GovernmentOrganization`, `NGO`, `Organization`, `NewsMediaOrganization`, `Hospital`, `BankOrCreditUnion` as fits.
**Note:** many of these are Tier C or tender-driven. Build the concept as a "what good looks like" demonstration: one strong homepage that shows the top-task router and a modern member/service flow.
