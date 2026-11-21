# Bahamas Choice Real Estate (id 55, batch 03, Tier A, Track A)

Record said "no own site (search)". Research found a working site, bahamaschoicerealestate.com (WordPress/AgentImage template, IDX feed). Track A.

## Facts
- Bahamas Choice Real Estate Ltd. established 2013; "a small company with one big goal": professional, efficient, friendly service, "converting Customers into Clients for life". https://bahamaschoicerealestate.com/about/
- Serves first-time buyers, commercial clients, Bahamian and international investors; buying, selling, leasing; homes, rentals, commercial, investment property. https://bahamaschoicerealestate.com/ , /about/
- On request: help with banking and legal information, government requirements, moving and relocation, recommendations of appraisers, surveyors, inspectors, contractors, landscaping and home decor firms. /about/
- "Our trademarks are listening and end-to-end service": discovering listings, viewings, closing and beyond. /meet-the-team/
- Office: Yamacraw Hill Road, Nassau, New Providence. https://www.findyello.com/new-providence/bahamas-choice-real-estate-ltd/profile/ , contact page snippet
- Phone 242-677-3868, sales@bahamaschoicerealestate.com. Homepage header.
- Team (own site): Lana Munnings-Basalyga (242-357-7698, lana@bahamaschoice.com), Greg Munnings, Estate Agent (242-556-5102), Sherry Morris (242-424-1861), Erica Pinder (242-457-0248). /meet-the-team/
- Lana Munnings-Basalyga: Principal Broker, BREA licence #480. https://www.breabahamas.com/realtor.php?cmd=view&id=96
- Islands they present (own nav): Andros, Abaco, Grand Bahama and Freeport, Long Island, Eleuthera, Acklins and Crooked Island, Cat Island and Cat Cay, Exuma, New Providence and Paradise Island, Bimini, Inagua, San Salvador, Rum Cay, Berry Islands, Ragged Island, Mayaguana; settlements per island as listed on homepage "Featured Areas".
- Developments they present: Aqualina, Bayroc, Charlottesville and Turnberry, Goldwynn, Ocean Club Residences and Marina, Palm Cay, Treasure Cove, Windsor Lakes, The Residences at Montage Cay, The Ocean Club Four Seasons Residences, Venetian West.
- Client words published on their own homepage (Jennifer Brice, Yasmine, T. Johnson). Quoted verbatim, attributed, no stars.
- Socials: facebook.com/BahamaChoiceRealEstate, instagram bahamaschoice.realestate, LinkedIn, YouTube.

## Photos (own site)
- wp-content/uploads/2024/05/Home-Page-Imgae-Harbour-Island.jpeg (hero, Harbour Island)
- wp-content/uploads/2024/05/Sunset.jpg, 2023/09/IMG_0143.jpg (slider)
- 2026/06/welcome-photo.jpg (Lana), team portraits (2023/09 Lana, Sherry, Erica; 2026/03 Greg)
- Development photos 2023/11/{Windsor-Lakes,Goldwynn,Palm-Cay,Treasure-Cove,Charlottesville-and-Turnberry,Bayroc,Ocean-Club-Residences-and-Marina}.jpg

## Current site audit (for the owner)
1. About, Meet the Team and Contact pages carry a conflicting "noindex" robots tag, so Google is told not to list the pages that introduce you and your team.
2. Every settlement in "Featured Areas" (Cargill Creek, Hope Town, Lyford Cay...) links to "#", a dead end.
3. The contact page has a form but no address, phone or map; Google and visitors cannot see where the office is.
4. The About page title claims "#1 Real Estate Agents in the Bahamas", an unsupported claim that can cost trust with careful foreign buyers.
5. Team emails use bahamaschoice.com while the site and BREA listing use bahamaschoicerealestate.com: two domains for one firm.
6. No guided path for the overseas buyer or the family selling an inherited property, the two clients your own testimonials describe.

## Audience / buyer portrait
Two buyers. (a) Overseas buyers and investors (US, Canada, UK, Bahamian diaspora), affluent, researching for months on a phone and laptop, comparing with Sotheby's, Coldwell Banker, HG Christie and portals; they fear paperwork, distance and being sold to. (b) Bahamian families and owners abroad selling a family property, or first-time local buyers; they fear slow sales and being out of the loop. Both feel they chose well when one named person keeps them informed end to end.

## Primary conversion
"Send your brief" (buy / sell / rent / invest) composed into an email to sales@. Secondary: call the office 242-677-3868, or call an agent directly.

## Content inventory (keep / fix / add)
Keep: est. 2013, team with direct lines, island and development lists, own testimonials, buyer/seller services, referral network. Outdated: 2023 generic blog posts, repeating featured carousel. Missing: address, process for overseas buyers, clear seller path, official-source links.

## Positioning
For buyers, sellers and investors at home and abroad, Bahamas Choice is the Nassau family brokerage that listens first and handles a property move end to end, on whichever island it leads.

## Strategy
Sitemap: index.html + buying.html ("Buying from abroad", step tracker, official links). CTA: "Send your brief". Journey: arrive from Google/Instagram, see the islands and a named broker, send a brief or call.
Primary query: "real estate agent Nassau Bahamas". Secondary: "buy property in the Bahamas from abroad", "sell my house Nassau", "Bahamas real estate broker Yamacraw", "homes for rent Nassau".

## Reference study
- knightfrank.com: charcoal/white, editorial serif heads, photo-led hero with one line of positioning, services as calm lanes, the tone of "personal, long-term guidance". Best idea: the human relationship framed as the product.
- theagencyre.com: monochrome, full-bleed media hero, regions as a selector, very large sparse type, listings as editorial tiles. Best idea: the region selector as the entry point.

## Design spec
- Brand truth: a small Nassau family firm that guides people to and from property on any island, start to finish.
- Feel: warm, archipelagic, assured, personal, unhurried.
- Type: Gilda Display 400 (display, 7-11 vw hero, -0.02em) + Albert Sans 400/500/600 (body 17-18px, labels 12px tracked +0.18em).
- Palette: --paper #f3f2ee (salt), --paper-2 #e7e5de, --ink #17212b (night channel), --muted #5b6570, --accent #44663f (sea-grape), --conch #e6c3b4 (fills only), --line #d6d3ca, dark band --deep #1d3330.
- Hero: framed-image passe-partout (their real Harbour Island photo inside a paper margin, art-directed crop, mask reveal), headline in a paper panel overlapping the frame's bottom-left edge, glass key card bottom-right. Not used in repo.
- Signature visual + interaction 1: an archipelago chart in SVG (all 16 island groups they serve, "Illustration, not to scale"), tap an island to see the settlements and developments they list there. This shows the islands they sell on because the brief lists those exact islands and settlements.
- Interaction 2: brief builder with shadcn Tabs (Buy / Sell / Rent / Invest), fields, live summary that becomes the email.
- Interaction 3 (buying.html): step tracker for buying from abroad.
- Motion: line-split hero, mask reveal on images, islands draw in, hover lifts and underline draws, scroll progress line.

## Assumptions to confirm with the owner
- Process step wording (listen, search and view, offer to closing, beyond) paraphrases their "discovering listings to viewings, closing and beyond".
- Which agents handle which islands (not published; not shown).
- Office hours (not published; omitted).

## Unknowns
Office hours, street number, years-in-business figures beyond 2013, sales volumes. Designed around.

## Generation 2 design plan (2026-11-21)
Research this session: own homepage, /active/ (4 listings), listing #68204 detail, /sold/ (1). Listings verified Nov 21 2026 (IDX "data last updated November 21, 2026"):
- #68204 5 Bayview Dr., Paradise Island Estates #5, New Providence (MLS area Paradise Island). Condo, $690,000, 2 bed, 2 bath, 1,226 sq ft, fully furnished, enclosed private patio, small garden, pool, fully walled, split A/C, HOA $417 (management, caretaker, recreation facility, maintenance, landscaping, garbage). 16 photos.
- #66392 Bayview Drive Unit #5, New Providence. Rental, $3,800/mo, 2 bed, 2 bath, 1,226 sq ft.
- #68126 Lot 30 Davis Street and Hawthorn, Block 1, New Providence. Land, $602,000, 0.909 acres. 7 photos.
- #67126 Lot 6 Block 2 Stella Maris, Long Island. Land, $130,000, 0.689 acres. 8 photos.
- Sold: #51845 76 Lumumba Road, New Providence. House, listed $315,000, 3 bed, 2 bath.

**Big idea.** A fixed window: the left half of the screen is one photograph that never scrolls away; as the right column walks through a real Bahamas Choice listing (gate, patio, living room, kitchen, bath at 5 Bayview Drive), the window changes room by room, so an overseas buyer stands inside the property for a minute before asking for a viewing.

**Direction.** A08 Fixed split + P01 Limestone + T02 Text-led editorial, nav N7 (vertical list inside the scrolling column), motion M3 (clip mask reveal on images) plus the split's synchronised crossfade. Why: the playbook's "fixed split" and "live there for a minute" ideas fuse into one, and their listing photos are portrait 800x1066, which fill a half-screen window at native size. A text-led serif suits a small family brokerage that sells by listening, not by spectacle; limestone/whitewash is the colour of the houses in their photos.

**Fonts.** Newsreader variable (opsz, wght, italic) self-hosted, display 56-72 px (T02: nothing above 72), text 19 px, labels in small caps of the same face. One family.

**Photos (all own, verbatim or the IDX pattern of their own listing, seen in the Lovable gallery ip-assets-bahamas-choice-real-estate):**
| use | source | size | shown at most |
|---|---|---|---|
| hero window | 2023/09/IMG_0143.jpg (pool courtyard villa, homepage slider) | 2048x1324 | 720x900 cover (0.68x) |
| film | pix.idxre 68204_0..9, _15 (gate, patio, generator, courtyard, living, dining, kitchen, bath) | 800x1066 | 720x900 cover (0.9x) |
| land rows | 68126_0, _1 (800x1066); 67126_0, _1 (800x533) | | 67126 framed at 800 wide max |
| rental row | 66392_0 | 800x1066 | |
| islands | 2024/05/Sunset.jpg | 1600x1200 | 720x900 cover |
| selling story | Home-Page-Imgae-Harbour-Island.jpeg | 960x720 | framed 600x450 inside the window, not cover |
| team | 2026/06/welcome-photo.jpg (Lana + team) | 960x541 | framed 640x360 |
Development photos are 380 px: not used.

**Storyboard, desktop 1440x900 (left window | right column):**
1. IMG_0143 villa courtyard | wordmark, vertical nav list, H1 "Sixteen island groups. One family office on Yamacraw Hill Road.", one line (buying, selling, leasing since 2013, Principal Broker Lana Munnings-Basalyga), primary "Send your brief", phone 242 677 3868, a one-line search (Buy, Rent or Land, island) showing "4 listings today".
2-4. The film, 5 Bayview Drive: the window crossfades gate, patio, courtyard, living room, dining, kitchen, bath as five short chapters scroll by on the right (each one fact from the listing); a sticky price/facts line and "Ask for a viewing".
5. Every listing: the four active listings and the recent sale as typographic rows with a filter (All, For sale, To rent, Land); hovering a row swaps the window to its photo; each opens its own property page.
6. Islands: Sunset in the window; the 16 island groups they serve as a two-column index, tap one to see its settlements and start a brief for that island.
7. Selling from abroad: Harbour Island framed in the window; the Jennifer Brice letter (sold her mother's property in four months, mother abroad, during the pandemic) set large, plus how they keep sellers informed (their own testimonial's words), CTA "Value my property".
8. The team: welcome photo framed; Lana (Principal Broker, BREA #480), Greg Munnings (Estate Agent), Sherry Morris, Erica Pinder, each a tel: line.
9. The brief: Buy, Sell, Rent, Invest tabs; island, budget band, timing, name, contact; live summary; opens an email to sales@. Window shows the villa again (a different crop).
10. Footer column: address, phone, email, socials, BREA line, concept credit.

**Phone 390x844:** 1) window photo 44vh at top, H1, line, "Send your brief" and tap-to-call within 844. 2) the film becomes a swipeable strip of the eight 4:5 photos with the chapter line under each, price and "Ask for a viewing" below. 3) listing rows with thumbnails and the filter chips.

**Conversion.** Primary: "Send your brief" (email to sales@ with a composed summary). Per listing: "Ask for a viewing" (prefilled email with listing number). Secondary: call the office or an agent directly.

**Tier.** Standard (photography, layout, scroll-synchronised crossfade). No 3D: the product is the listing photos.

**Distinct from competitors in this repo.** No other site uses the fixed split; no dark ground, no full-bleed hero with overlay, no island map, no card grid. Serif-only text-led typography on limestone.

**Property pages:** property-68204.html, property-66392.html, property-68126.html, property-67126.html: the window holds the listing's photos (click through), the column holds facts, description, viewing request.

## Scorecard (after QA)
See status notes.
