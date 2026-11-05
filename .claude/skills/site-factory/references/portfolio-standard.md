# The portfolio standard ($1,000+ per site)

Read this before step 3 for every business. It overrides any instinct toward safe, generic choices.

## 1. Know the client and the buyer before designing anything
Write a **buyer portrait** in the brief: who actually pays this business, their income band, where they live, what they compare this business with, what they fear, what makes them feel they chose well. Then let it drive every decision:

| Niche | Real buyer | What the site must feel like |
|---|---|---|
| Marina / yacht club | Yacht and sportfish owners (often US East Coast, high net worth), their captains, brokers, buyers of waterfront property | Quietly luxurious, nautical precision, confidence. Think yacht builder sites, not a bait shop. Specs and service, discretion, white hulls, teak, stainless, deep water. |
| Boutique hotel / resort | Couples and families with money and little time; repeat guests | Escapist and specific: the exact beach, the exact light, the room you will wake up in. |
| Fishing lodge | Serious anglers, small groups of friends, fly-fishing travelers | Water, flats, tides, guides, early mornings. Expertise over luxury. |
| Tours / dive / rentals | Cruise passengers and resort guests deciding today, on a phone | Energy, clarity, instant "how do I book". |
| Real estate | Foreign buyers and investors | Trust, place, lifestyle, process. |
| Law / trust / insurance / finance | Corporates, families with assets, international clients | Calm authority, precision, discretion. Never playful. |
| Industrial / construction / B2B | Procurement, developers, government, insurers | Capability, scale, safety, reliability. Engineering-drawing precision. |
| Trade / retail | Locals and contractors | Practical, warm, fast: what they stock, where, when open. |
| Food / events / weddings | Couples planning abroad, event organisers, gift buyers | Sensory, celebratory, crafted. |
| Institution | Members, citizens, investors | Clear, accessible, task-first, dignified. |

## 2. Visuals must depict the business's real context. Never random.
Every visual element must be traceable to a fact in the brief. Before you build a visual, write one line in the brief: "This shows ___ because the brief says ___."
- A marina gets **its own setting**: the basin, docks, the kind of yachts it serves, the channel and markers, fuel dock, the island around it. Not abstract waves.
- A beach resort gets **its beach**: the actual orientation (sunset over the water if it faces west), the cottages, the palms, the boat that brings guests.
- A roofing contractor gets **roofs**: an exploded 3D roof system (deck, membrane, insulation) that assembles on scroll, hurricane wind lines, the Nassau skyline of rooftops.
- A dive shop gets **the reef and the drop-off**: a depth gauge, the wall, the wreck they are known for.
- A glass company gets **glass**: refraction, light through a pane, a storefront being glazed.
- A law firm gets **restraint**: typography and a single architectural detail of Bay Street or the courthouse, not 3D gimmicks.
- An industrial port gets **cranes, containers and ship berths** as a precise 3D or technical-line scene.
Abstract shader blobs, generic particles, random gradients, floating spheres and "tech" grids are banned unless the business is a technology company.

## 3. How to build context-true visuals here
- **Their real photos first** (hotlinked from their own site or official social pages, per CLAUDE.md).
- **Procedural 3D (React Three Fiber)** for the signature scene: compose the place from simple geometry, shaders and good lighting, the way the reference site builds the beach, canal, townhouses, palms, yachts and channel buoys. Low-poly, warm light, soft fog, gentle motion, tasteful. Label it "Illustration, not to scale" where a viewer could mistake it for a map.
- **SVG illustration and technical drawings** for crafts and industries (roof sections, glazing details, engine cutaways, floor plans).
- **AI image generation**: only if the Higgsfield connector is available AND `balance` shows credits > 0. Generate at most 2 atmospheric images per site (`gpt_image_2_5`), never an image that pretends to show the client's actual property, staff or products. Use the returned image URL directly and note in status `notes` that imagery is AI-generated and must be replaced with real photography at launch. If no credits, skip silently and use the methods above.
- Never stock photos, never placeholder services, never images of other businesses.

## 4. Interactivity: every site needs at least two real interactions
Chosen from the content, for example:
- Explorable 3D scene with hotspots that reveal real facts (reference site).
- Room / cottage / boat selector that swaps details and visuals.
- Slip-size checker: enter LOA and draft, see whether the marina's published limits fit (only with sourced limits).
- Tour or day planner that sums real durations.
- Before/after slider for trades (with their real photos).
- Quote builder that composes a WhatsApp/email message from selected services.
- Interactive island map showing where they are relative to the airport/ferry/town.
- Menu or product explorer with filters.
Plus hover micro-interactions on every link, button and row.

## 5. Uniqueness check before you publish
Answer in the brief, honestly:
1. Could this layout belong to any other business in this repo? If yes, change the hero and the signature.
2. Does the hero show who, where and what in 3 seconds?
3. Is every visual element tied to a fact?
4. Would a luxury-brand agency put this in its portfolio? If not, fix the two weakest sections.
5. Would the owner see their own business in it, and feel proud?

## 6. Effort allocation
Spend the time where the owner will look: the first screen, the signature interaction, the main conversion path on a phone. A strong one-screen hero and two excellent sections beat eight mediocre sections.
