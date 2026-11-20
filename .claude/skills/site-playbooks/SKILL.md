---
name: site-playbooks
description: The creative brief for each type of Bahamian business site (marina, resort, tours, trades, industrial, shop, food and events, professional, tech and security, real estate, institutions), plus tested code recipes for immersive techniques (photoreal ocean, scroll stages, 3D objects, photo depth, scroll film, horizontal tracks, enquiry and shop flows). Read the SKILL, then your one playbook, before designing any site.
---

# Site playbooks

## What we are making, and why it must stun
Each site is a concept Balazs shows the owner, unasked, to win a rebuild. The owner gives it about five seconds.
In those seconds they must think: *"I have never seen my business look like this. Nobody in the Bahamas has a site
like this."* Then the next thirty seconds must prove we understand their business better than their current
site does: their real offer, their real customers, how people actually contact or buy from them.

So every site has two jobs, in this order:
1. **The wow**: one big idea, about this business's real world, executed beautifully. Often immersive: a 3D
   scene, a photograph that comes alive, film that moves with the scroll, an object you can turn. Sometimes it
   is pure typography and space, if that is what the business deserves (a law firm, a trust company).
2. **The proof**: the same kind of site the business really needs (shop, booking, listings, enquiry), with their
   real facts, made clearer and easier than anything they have now.

A template does neither. Generic AI sites fail because they decorate instead of having an idea.

## How to work (read in this order)
1. Your audit row (`factory/audit/<slug>.json`) and brief: what the business really is and sells, what it has online now.
2. **Your playbook** (`playbooks/<type>.md`, chosen with the table below). Read it fully. It is the brief a top
   studio's creative director would give you: the buyer, the big ideas, the page, the imagery, the voice, references.
3. Choose ONE big idea from the playbook, or invent a better one that is truer to this business. Write it as one
   sentence that names the business's real subject: "Scrolling flies you from the Lucaya channel to Bell Channel's
   own dock at dusk." If the sentence would fit a competitor, it is not specific enough.
4. Look at two references from the playbook with `node factory/tools/look.mjs` and the business's current site.
5. Storyboard screen by screen (art-director skill section 3b), then build the first screen to finished quality
   before anything else (the hero gate). Use the recipes below as building blocks and art-direct them.
6. Verify like a creative director (art-director section 7).

| Business type (audit niche or concept) | Playbook |
|---|---|
| marina, yacht club, marina hotel | `playbooks/marina.md` |
| hotel, resort, inn, lodge, beach club, guesthouse | `playbooks/resort.md` |
| tours, dive, boat rental, taxi, attractions, gardens | `playbooks/experiences.md` |
| roofing, glass, pools, upholstery, covers, contractors, paving | `playbooks/trades.md` |
| ports, shipyards, fuel and energy, brewing, distribution, heavy industry | `playbooks/industrial.md` |
| real online shops, home centres, building supply, office supply, retail | `playbooks/shop.md` |
| bakeries, rum cake, catering, restaurants, weddings, events | `playbooks/food-events.md` |
| law, trust, banking, securities, insurance, accounting | `playbooks/professional.md` |
| IT, POS, web, alarm and security, armoured transport, patrol | `playbooks/tech-security.md` |
| real estate brokerages and developments | `playbooks/real-estate.md` |
| tourism boards, chambers, associations, government bodies | `playbooks/institutions.md` |

## The recipes (tested building blocks, `recipes/`)
Copy what you need into your site's `src/`, then art-direct it: colours, timing, camera, typography around it.
Recipes are techniques, not layouts; two sites using the same recipe must still look nothing alike.

| Recipe | What it gives you | Typical use |
|---|---|---|
| `Ocean.tsx` (preview: `Ocean.preview.png`) | photoreal sea and physical sky, any hour, camera dolly by progress | marinas, resorts, tours, dive: a hero or a scroll stage |
| `ScrollStage.tsx` | a pinned stage driven by scroll, film-subtitle chapters, a camera path for 3D | the backbone of any scrollytelling moment |
| `ModelStage.tsx` (preview: `ModelStage.preview.png`) | a real object, studio-lit, turning or exploding with scroll | object study: roof build-up, water unit, boat, terminal, cake |
| `PhotoDepth.tsx` | a still photograph that gains 3D depth on pointer and scroll, optional water shimmer | the cheapest true wow for any photo-led page |
| `ScrollVideo.tsx` | film scrubbed by scroll, or a calm looping hero film | a boat leaving, a roof being laid, a dive descending |
| `HorizontalTrack.tsx` | pinned sideways gallery on desktop, native swipe on phones | rooms, boats, fleet, tours, a history timeline |
| `Enquiry.tsx` | choices to summary to a prefilled WhatsApp or email message | every business that takes bookings, quotes or enquiries |
| `Shop.tsx` | catalogue with filters, cart drawer, checkout preview handing off to their store | every business that really sells online |

Lessons from the Bell Channel pilot, built into the recipes:
- **Shader materials**: create them with `new THREE.ShaderMaterial({...})` inside `useMemo` and pass `material={...}` to the mesh. A `uniforms={obj}` prop on `<shaderMaterial>` is copied, so per-frame updates silently do nothing.
- **Rendered stills**: a still rendered from your own 3D scene (Playwright screenshot of the canvas at a chosen progress, saved as JPG in the site's `public/`) is free, true to the idea, and works as the canvas poster, the no-WebGL fallback, an inner-page hero and the social share image.
- **Scroll stages**: give the pinned section `data-stage` so QA does not mistake its pinned height for empty space, or its waiting chapter captions for hidden text.

Combining is where the magic is: a ScrollStage holding the Ocean with chapters is a cinematic arrival; a
ScrollStage holding a ModelStage with callouts is a product film; PhotoDepth inside a HorizontalTrack is a
gallery of living places.

## Assets: making the world real
- **Photographs**: the business's own (crop and present them better than they ever have), excellent Wikimedia
  Commons photos of the real place, and Lovable photoreal generation of the trade (art-director `references/imagery.md`
  has the prompt formula, style lock, shot lists and rejection checklist). Use exactly as many as the idea needs.
- **3D**: procedural with the recipes (ocean, sky, studio-lit objects), or a GLB: Higgsfield `generate_3d` from a
  photoreal render if credits exist, or `img2threejs` for a procedural model from a photo. Real materials, real
  light, slow motion. Never toy shapes, never bright low-poly.
- **Film**: their own reels; Higgsfield image-to-video from the best still if credits exist; otherwise a slow
  scroll-driven zoom on a still is better than nothing.
- **Depth**: PhotoDepth's built-in landscape guess works for horizons; a real depth map is better when you can get one.

## Craft principles (why, not rules)
- **One idea, done perfectly, beats five effects.** Everything around the big idea is calm: generous space, two
  typefaces, few colours, so the idea can breathe.
- **Specific beats impressive.** A modest scene of *their* harbour beats a dazzling generic one. Name real places,
  real products, real people's roles, real years.
- **Real beats decorative.** Photographs, real materials and real light read as premium; icons, blobs, gradients,
  stickers and toy 3D read as AI.
- **Motion is cinematography.** Slow camera moves, long eases, one movement at a time, sound physical behaviour.
  Nothing bounces, nothing spins for attention. Respect prefers-reduced-motion with a beautiful still version.
- **Fast and kind on a phone.** Lazy-load 3D, cap pixel ratio, give every canvas a poster image, keep the
  first screen readable before anything loads. A wow that stutters on an iPhone is a failure.
- **The proof is part of the design.** The shop, booking or enquiry flow gets the same care as the hero.

## Prompting yourself and your helpers
When you brief a subagent, Lovable or any generator, write like a creative director: the goal and why, the
specific subject, the feeling, the constraints, and what done looks like. Show, do not list adjectives:
"the camera skims 2 m above turquoise water toward the Hope Town lighthouse at 7 am, slow, like a drone shot in
a travel film" beats "make an immersive premium hero". Ask helpers for options, then choose.

## Definition of done
The owner would gasp at the first screen; every fact is real; the site is the right kind for the business and
easier to use than theirs; it works and feels smooth on a phone; it looks like nothing else in this repo; the
critic, seeing the real page next to the references, scores every line 4 or 5.
