# Man-O-War Marina: brief (Track A, listed domain lost)

## Facts
- Listed domain manowarmarina.com now shows an unrelated generic "Boating in the Abaco Cays" article page, not the marina. https://manowarmarina.com
- The marina now uses manowarmarinavillage.com (Wix, page titles read "My Site 1"). https://www.manowarmarinavillage.com/
- Man-O-War Marina Village, full service marina since 1976; rebuilt after Hurricane Dorian (2019). homepage
- 23 slips, vessels up to 120 ft LOA, beam up to 20 ft, drafts up to 7 ft at low tide; assisted docking on VHF 16; 30 and 50 amp power and water at each slip. /services, /faq
- Reservations: (242) 554-9500, mowmv@hotmail.com. Office hours Mon-Sat 8am-12pm, 1pm-4pm. Dockage rates PDF on /services.
- Only fuelling station on the island: gasoline and diesel, dockside Mon-Sat 8-12, 1-4; roadside Mon-Sat 9-12, 2-4. /services, /faq
- Dock N' Dine waterfront restaurant (242) 554-9134, lunch Mon-Sat 11am-3pm; Facebook also posts Saturday night 6-8:30pm. /services; facebook.com/p/Man-O-War-Marina-Village-100090702221315/
- Office and gift shop (custom t-shirts, local art, marine grade dive gear); guest-only: showers, restrooms, laundry, grill area, power; pool for guests. Public: restaurant, gift store, fuel; water tank fill on request via office. /faq
- Island: 2 miles long, 0.5 mile wide; grocery, gift shops, Heritage Museum and coffee shop, bakeries, boat-building shops, playground, churches, ferry services, beaches. /mow-life
- Instagram @manowarmarina. Dockwa lists 28 slips (conflict; we use the marina's own 23).

## Photos (verbatim, manowarmarinavillage.com)
hero panorama 0b3c23_fe4056cc...jpg w_1905 h_646; services banner 0b3c23_8644da71... w_1905 h_257; gallery 0b3c23_dfa1ef9b, 0b3c23_07d680b9, 0b3c23_6bc8e1ba (547x729); 0b3c23_5ee2be2f png 638x478; MOW Life: grocery 0b3c23_94dd9444, museum 0b3c23_41987b11, ferry 0b3c23_64f4b9f7, beaches 0b3c23_6e7777c1 (286x335).

## Current site audit
1. Your old address manowarmarina.com now shows someone else's boating article; boaters who saved it never reach you.
2. The new site's browser title says "My Site 1" on every page, so Google shows that instead of your name.
3. The specs boaters need (120 ft, 20 ft beam, 7 ft at low tide, VHF 16) are buried in a paragraph on an inner page.
4. Rates are a PDF download and the only booking path is an email link.
5. Nothing says you are the island's only fuel dock, on the homepage.

## Audience
US East Coast and Florida cruising owners and captains crossing to Abaco, sportfish and trawler owners, return seasonal guests; phone, often on patchy signal.

## Primary conversion
Slip request (email prefilled) + call (242) 554-9500; VHF 16 on arrival.

## Strategy
Sitemap: index, marina.html (specs, fuel, facilities, rules), island.html (MOW Life).
SEO primary "Man-O-War Cay marina Abaco"; secondary: "fuel dock Man-O-War Cay", "Abaco marina slips 120 ft", "Dock N' Dine Man-O-War", "marina Sea of Abaco".

## Buyer portrait
Owners of 35-90 ft sportfish, trawlers and catamarans, 45-70, high income, from Florida to the Carolinas; compare Hope Town and Marsh Harbour marinas; fear grounding, no fuel, unanswered calls. Feel smart when the specs fit and someone answers on 16.

## Brand truth / feel
The only fuel dock on Abaco's small boatbuilding cay, running a full-service marina since 1976 and rebuilt after Dorian. Feel: steady, crafted, sheltered, neighbourly, precise.

## Positioning
For cruising owners in the Sea of Abaco who need a sure slip and fuel, Man-O-War Marina is the full-service harbour marina on Man-O-War Cay, fuelling boats and carts since 1976.

## Design plan (generation 2 rebuild, 2026-11-21)
**Big idea.** The front page is a harbour broadsheet with a live dateline: under their own photograph of the dock running out to the sun (the "NOW OPEN" flag they raised after Dorian), one large sentence reads Bahamas time and tells a captain what is open on Man-O-War Cay right now (fuel dock, office, Dock N' Dine) and when it next opens, computed from the hours they publish.
**Direction.** A01 Magazine feature + P02 Shallow flats + T02 Text-led editorial. Why: a small family marina since 1976 on the boatbuilding cay reads best as a quiet, well-made feature, not a resort brochure; the aqua of the Sea of Abaco becomes one field section (the docks), the page ground is sand paper. Competing marinas in this repo use arrivals over water, drone splits and maps; this one is print.
**Fonts.** Newsreader (variable, opsz) only, self-hosted. Display 56-72 px max, text 19 px, labels in the text face's small caps, tabular lining figures for every number.
**Colour.** ground #F4EFE4 sand, ink #0D2B2E, field #BFE3DC aqua (one section), channel #1E6B72 accent (primary CTA, live dot, key numbers), muted #4A5D5E, line #D9CFBD.
**Photos (own, manowarmarinavillage.com, Wix originals).** A sunset dock 3024x4032 (hero band, crop 3024x~1100, shown 1440x520); F marina sign and sailboats 2048x1536 (shown at most 720 wide); B boardwalk to Dock N' Dine 3024x4032; E restaurant porch, blue table 3024x4032; D gift shop 3024x4032. All shown far below source size. One grade: warm, slightly lifted shadows via the same CSS treatment (none on pixels, natural).
**Storyboard, desktop 1440x900.**
1. Masthead row (nameplate "Man-O-War Marina" set as a magazine title, h1; links The docks, The cay, Request a slip; phone at right). Full-bleed dock band A 1440x520, slow push-in on scroll. Below: live dateline sentence 64 px ("Saturday, 2:14 pm on Man-O-War Cay. The fuel dock is open until four."), standfirst, one filled CTA "Request a slip", text links Call (242) 554-9500 and VHF 16.
2. The docks (aqua field): two-column feature, drop-cap story (since 1976, rebuilt after Dorian) left; magazine facts box right with the captain's numbers set large: 23 slips, 120 ft LOA, 20 ft beam, 7 ft at low tide, 30/50 amp + water at every slip, assisted docking on 16. Photo F inset in the column.
3. Will she fit (largest thing on screen): LOA, beam, draft steppers; answer in one sentence ("She fits: 64 ft of 120, 2 ft under the low-tide limit"); three proportion rules (hull vs limit). Flows straight into the slip request.
4. Slip request: Enquiry styled as a typed letter to the dockmaster (dates, boat name, LOA, beam, draft carried over, power 30/50, note) to prefilled email mowmv@hotmail.com; Call as secondary.
5. A day at the marina: one column timeline of the published hours (8 fuel dock and office, 9 roadside pump, 11 Dock N' Dine, 12-1 break, 3 lunch ends, 4 close, evening for guests: showers, laundry, grill, pool) with a live "now" rule; beside it photo E sticky, full column height.
6. Ashore photo essay: B large left with caption (Dock N' Dine, lunch Mon-Sat 11-3, (242) 554-9134), D smaller right (office and gift shop), staggered, real captions.
7. The cay: text-led feature on Man-O-War Cay (2 miles by half a mile, grocery, Heritage Museum and coffee shop, bakeries, boatbuilding shops, ferry, beaches), link to island.html.
8. Colophon: contact (phone, email, VHF 16, office hours Mon-Sat 8-12, 1-4), dockage rates PDF, Request a slip.
**Phone 390x844.** P1: masthead (name + menu), photo band 390x300, live sentence 34 px, CTA "Request a slip" + call/VHF line, all inside 844. P2: docks numbers as a stacked facts list on aqua. P3: Will she fit with steppers and the answer. Mobile action: tear-off strip "Request a slip / Call" hidden on first screen and over the colophon.
**Conversion.** Primary: Request a slip (prefilled email). Secondary: call (242) 554-9500, VHF 16 on arrival. Phone in masthead and first screen.
**Tier.** standard (photography + live data + type), no WebGL: their own photos carry it and the live sentence is the wow; 3D arrival is already used by other marinas here.
**Distinct from repo competitors.** No ocean scene, no map, no split hero, no drone arrival switch: a print nameplate, a horizontal dock band and a live sentence.
**Inner pages.** marina.html (services, fuel, facilities, FAQ facts, rates PDF), island.html (the cay).

## Assumptions to confirm
Saturday night dinner hours (Facebook), whether pool is current, rate PDF current.

## Unknowns
Prices (PDF only, not transcribed), approach waypoints and depths (never shown), WhatsApp.
