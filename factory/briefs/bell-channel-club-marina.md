# Bell Channel Club & Marina — brief

## Facts
- Name: Bell Channel Club & Marina, Freeport, Grand Bahama. https://marinas.com/view/marina/eyc5ld_Bell_Channel_Club_and_Marina_Freeport_GB_Bahamas
- Phone (242) 373-2673 (double-sourced). https://marinas.com/view/marina/eyc5ld_Bell_Channel_Club_and_Marina_Freeport_GB_Bahamas , https://www.thebahamasinvestor.com/?p=7170
- Fax 242-373-3802. https://www.thebahamasinvestor.com/?p=7170
- Mailing: P.O. Box F-44053, Freeport. marinas.com listing
- Coordinates 26.5147, -78.6368 (marinas.com map pin). marinas.com listing
- Condominium / townhouse complex on both the canal and the beach; units overlook the ocean inlet into Port Lucaya Marketplace. https://sarlesrealty.com/?p=261634 , https://www.bettermcrbahamas.com/sales/detail/585-l-587-62229/bell-channel-club-bell-channel-bay-bell-channel-gb
- Private marina for owners, "if available". both listings above
- Heated pool, tennis courts, owners' library, limited number of storage garages, reverse osmosis water for all units, HOA maintains the beach. both listings
- Gated community, pets allowed, quiet area (single listing tags). bettermcr listing
- Old domain bellchannelclub.com now serves gambling content. prospects.json

## Photos
None from the business's own pages (its domain is lost; caribpro.com/bellchannel failed). Realtor photos not allowed. Art-direct with an SVG chart of the inlet.

## Current site audit
1. bellchannelclub.com now shows a gambling site: owners, buyers and boaters searching for you land there.
2. The only live listing (marinas.com) is unclaimed, with no description, no dock details and no photos of your own.
3. Nothing online explains that the marina is for owners, so boaters call blind or give up.
4. Buyers and renters learn about the pool, tennis and private dock only from scattered realtor listings.
5. There is no email or modern contact path, only a phone and fax number from an old directory.

## Audience
Current owners and their guests (US/Canada, Freeport locals), prospective buyers/renters researching Bell Channel, boaters asking about dockage. Mostly phones.

## Primary conversion
Call the club office (no email or WhatsApp sourced, so no form; large call block).

## Unknowns designed around
Slip count, LOA, depths, power, fuel, rates, hours, email, management names, number of units, year built. Shown as "ask the office".

## Strategy
Sitemap: index.html, marina.html, club.html. Primary CTA "Call the club office"; secondary "Ask about dock availability" (tel). Journey: Google search for the club name → sees it is the real club, where it is, what it is → taps call.
SEO primary: "Bell Channel Club Freeport Grand Bahama". Secondary: "Bell Channel marina Lucaya", "condo with dock Bell Channel Grand Bahama", "private marina Freeport Bahamas", "Bell Channel townhouses Lucaya".

## Brand truth
A quiet gated club that sits between the canal and the beach, right where the inlet opens into Port Lucaya.
Feel: between-waters, quiet, private, sun-faded, nautical.

## Design
Fonts: DM Serif Display 400 + IBM Plex Sans 400/500. Palette: --paper #eef2ee, --ink #14303a, --accent #1f7a78, --accent-2 #c9b88f, --muted #4d6066, --line #c8d3cf, --sea #d6e6e3.
Hero: map-led — a stylized chart (not for navigation) of the inlet with canal on one side, beach on the other, club marked between. Signature: the channel line draws in as the page loads and the "between two waters" labels appear; on scroll the chart's latitude grid shifts softly.
Motion: line-draw (1.6s ease-out-quart), rise-in on hero text, parallax-soft on chart grid. Reduced motion: static.

## Generation 2 design spec (2026-11-08)
- Direction: A01 Magazine feature, P05 Night harbour, T09 Didone fashion, N1 masthead row, M1 scroll-scrubbed crossfade.
- Studied: kinfolk.com (issue masthead, spreads, title + one-line standfirst under portrait images), monocle.com (department kicker, long declarative headline, standfirst, read meta). cerealmag.com did not resolve.
- Archetype mapping: masthead row (Contents overlay button, wordmark, dateline + office phone); full-bleed Commons photo of Port Lucaya Marina; cover-scale roman headline and standfirst below it; paper article with running header, italic sub-deck, hanging drop cap in 2 columns and "The particulars" facts panel with the call block; one-sentence interlude; photo strip with vertical captions; colophon with phone, fax, P.O. box, map and credits. Mobile: tear-off call strip.
- Palette: ground #0E1B2B, raised #142638, ink #E9E4D8, muted #B9B4A8, brass #D8B46A, harbour #5FA3B5, paper #ECE6D9 / paper ink #152233 (the light section).
- Type: Libre Bodoni 400 + italic (display, 56-196px cover, 34-72px section), Jost 300/400 (body 17-18px), labels in spaced all-small-caps.
- Signature: "A day at the club", pinned photographs crossfading with scroll from courts at first light to the channel marker at night (text does not animate).
- Interactions: (1) canal side / beach side drag comparison; (2) "Who is asking?" on the marina page gives the honest answer for owners, guests, visiting boats, buyers; (3) amenity index swaps the photograph on the club page.
- Not doing: Key-information band, sticky blurred pill header, fade-up reveals / SVG chart drawings.


## Pilot rebuild (2026-11-20): the arrival
Big idea: scrolling carries you across open water off Lucaya at dusk, the sun setting and the shore lights coming on, toward the low line of Grand Bahama and the breakwater lights of Bell Channel, with real waypoints as film subtitles, ending on Port Lucaya Marina inside the cut.
Direction: A14 Quiet luxury + P02 Shallow flats (ground #eef4f1, field #bfe3dc) + T01 Monumental serif (Fraunces + Newsreader, self-hosted woff2 from @fontsource). Why: a quiet private club for owners; the scene does the talking, type stays sparse.
New facts this session: VRBO lists 7+ owner rentals at Bell Channel Club (https://www.vrbo.com/vacation-rentals/caribbean/bahamas/grand-bahama/freeport/bell-channel-club); mapcarta places the marina on Jolly Roger Drive (https://mapcarta.com/N4115456554, not used on the page).
Storyboard (desktop 1440x900):
1. Arrival 0: dusk ocean, "Bell Channel" at 14.5vw, "Club & Marina, Lucaya, Grand Bahama"; subtitle with the coordinates; office number bottom right.
2. Arrival 0.2-0.4: island rises, lights come on. "Ahead, the island..."
3. Arrival 0.43-0.6: breakwater lights, "Bell Channel. The cut from the open sea into Bell Channel Bay."
4. Arrival 0.63-0.79: "On its shore, between the canal and the beach, the club."
5. Arrival end: crossfade to Port Lucaya Marina (Commons).
6. Two waters: one full-bleed image, beach/canal toggle swaps it, headline on the sky.
7. What the club keeps: 58vw image bleeding left, amenity list swaps the image.
8. The marina (aqua field): "A private marina, for owners." + Who is asking? (4 honest answers) + call.
9. Where the inlet opens: blue-hour still of the 3D channel, three subtitles.
10. Calling card on the channel-light photo.
Phone: first screen = title + subtitle + "Menu"; call bar appears after the first screen, hides over the card.
Marina page: 3D channel still hero, captain spec (sourced lines + one "Confirmed when you call" line), slip note composer (read out on the phone), calling card on the night still.
