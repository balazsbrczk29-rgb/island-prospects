# Digitech Bahamas: design.md (2026-11-22, from the approved job spec)

## 1. The idea in one paragraph
"Your counter, assembled." Screen 1 is a studio product shot that the visitor builds. Three answers (what you run, how many tills or desks, and whether you want Wi-Fi for staff and guests and cloud backup) assemble the real kit on a limestone plinth, lit like an Apple product page: Razor POS terminals drop in one by one, a receipt printer or cash drawer appears for each till, a ceiling access point and a firewall router join for the network, a backup appliance with a sync light for the cloud. Beside it, the same setup is written as a plain-words list of what Digitech supplies, installs, trains and supports. One button sends that list to sales@digitechbahamas.com; calling is the second choice. The owner understands in ten seconds what they would get and that one local team does all of it.

## 2. Inspirations
- **Apple "Compare" and AirPods configurator:** studio-lit white hardware on a soft floor, objects arriving with spring, nothing else on the stage.
- **Square hardware kit builder (squareup.com/shop/hardware):** pick your business type, the kit list builds with plain names.
- **Linear.app:** a precise grotesk, quiet grey lines, mono only for specs.
From `site-playbooks/playbooks/tech-security.md` and the recipes: ModelStage (studio environment, Lightformers, ContactShadows).

## 3. Tokens (kept from the previous version, P01 Limestone, adjusted)
- **Type:** display Sora variable 600 (clean geometric grotesk, technical but warm), text IBM Plex Sans 400/500, IBM Plex Mono 400/500 only for spec lines in the kit list and phone numbers. Scale: 13 / 15 / 18 / 22-28 / 32-56 / 40-84 px; leading 1.5 body, 1.08 h2, 1.0 hero; display tracking -0.035em.
- **Colour (OKLCH, written as hex in CSS):** ground limestone oklch(0.935 0.017 85) #efeae0; ground-2 #e6dfd1; paper #f8f5ef; ink oklch(0.21 0.008 85) #1b1a17; muted #5d5a52 (6.2:1 on ground); line #d3cbbb; accent sea glass oklch(0.49 0.06 195) #2f6f73 (primary actions, active toggles, the item count); field night #121a1c for the support band only (one dark section; the rest is light).
- **Space:** 8-based 8/16/24/32/48/64/96/128. Section padding 128 desktop, 72 phone. 12 columns, 24 gutter; composer 7 (stage) + 5 (controls). Measure 62ch.
- **Shape:** radii 6 / 12 / 20; stage frame 20, controls inner 8 (20 minus 12 padding). One shadow: the dock.
- **Motion:** ease cubic-bezier(.22,1,.36,1). Toggle feedback 160 ms, list rows 320 ms with 40 ms stagger, 3D objects spring in (drop 0.35 units, damped approach factor 0.12 per frame, about 600 ms). Reduced motion: objects appear in place, no drops.

## 4. Screens
**Top bar:** wordmark left, phone (Plex Mono) and "Get a quote" right; not sticky; the dock takes over after screen 1.

**1. The composer (#compose).** Desktop: left 7 columns the stage (aspect 4:3, radius 20, limestone gradient floor, 3D canvas), chip row under it naming the parts on stage. Right 5 columns: H1 "Build the counter you need. We install it and look after it."; three controls: business type segmented (Restaurant or bar / Retail shop / Office), tills or desks stepper 1 to 8, two toggles (Wi-Fi for staff and guests, Cloud backup); then "What Digitech sets up" list (numbered, Plex, mono counts), primary "Send this setup for a quote", secondary call (242) 676-2033. Phone: H1 first (2.1rem), stage 4:3 full width, controls, list, button; the dock appears after the button leaves view.

**2. Point of sale (#pos).** Kept from the previous version as the four-jobs selector (Parts): rows on the left, illustrative photograph right; POS first. H2 "Four jobs, one local team that answers the phone."

**3. Network, Wi-Fi and backup:** covered by the same selector's rows (network design, managed IT, cloud backup) with their sourced descriptions and points.

**4. Support after install (#support):** the night band kept, copy limited to sourced facts: hardware, software, training, post-installation support.

**5. Clients:** one typeset line, "At counters including Hana, Naughty Johnny's, Blu Sail, Beauty Shack and Little Caesars." (names from logos on their homepage, to confirm permission).

**6. Contact:** the previous footer: call, write, visit, and "Build your setup" linking back to #compose.

## 5. Core tool: interaction spec
- **Inputs:** kind = 'fnb' | 'retail' | 'office' (default fnb); count 1 to 8 (default 2); wifi boolean (default true); backup boolean (default true).
- **Kit (formulas):** fnb: count Razor POS terminals, count receipt printers, 1 kitchen printer; retail: count Razor POS terminals, count cash drawers, count receipt printers; office: count workstations (no POS). Network always: 1 router with firewall and VPN, cabling to every station (count runs, plus 1 per access point). Wi-Fi: access points = ceil(count / 4); two networks: staff/tills on one VLAN, guests on another. Backup: 1 backup appliance syncing to the cloud. Every kit adds "Training for your staff" (POS kinds) and "Support after installation".
- **States:** always filled (defaults). Loading: the canvas has a poster (static render of the default kit) shown until WebGL is ready; on no WebGL the poster stays. Error: none (no network calls).
- **Animation:** each object springs from 0.35 units above to its slot; removal sinks and fades (scale to 0.001 at 0.12 per frame). List rows enter with height + opacity 320 ms, stagger 40 ms. The camera eases its distance to fit the count (8 terminals widen the framing).
- **Keyboard/touch:** all native buttons with aria-pressed; stepper buttons 44 px; the canvas is aria-hidden; the list is the accessible equivalent (aria-live polite).
- **Hand-off:** mailto sales@digitechbahamas.com, subject "Quote request: <kind>, <count> tills", body = the list + optional name and area fields (two inputs under the list, optional). Secondary tel:+12426762033.

## 6. Signature details
1. The terminals drop in one at a time with a soft spring and a contact shadow that tightens as they land.
2. The router's status LED and the backup appliance's sync light pulse slowly (emissive, 2 s period).
3. Item counts in the list in Plex Mono with tabular figures, the count number in sea glass.
4. The terminal screens show a simple lit POS grid (emissive canvas texture), not a logo.
5. The chip row under the stage names what is on it, so the picture has captions.

## 7. Photography plan
- 3D stage: procedural, PBR (RoundedBox bodies, clearcoat white plastic, brushed aluminium stands, dark glass screens), studio Environment with Lightformers, ContactShadows. Poster: a build-time render of the default kit (factory/web/sites/digitech-bahamas/public/kit-poster.jpg, 1200x900).
- Section 2 and 4 photographs: Lovable asset project ip-assets-digitech-bahamas (illustrative, labelled, replace with own install photos): hands-till, ceiling-ap, rack, counter-hero, after-close; widths/heights set to their native size; never wider than native.

## 8. Self-review
- Screen 1 sells the product and the job can be done without scrolling on desktop (button at about 780 px); on phone after one scroll, with the dock carrying "Get a quote".
- A1 no badges; A2 no "Phone:" labels; A3 no italics; A4 mono only for counts, specs and phone numbers; A5 tokens kept; A6 the actual kit; A7 the stage is the largest element; A8 spacing groups; A9 specific headline; A10 one primary per screen; A11 accent only on actions, active states, counts; A12 lucide only (phone, plus) at 1.5 stroke; A13 no ornaments; A14 stage 20 / controls 8 concentric; A15 contrast checked by inspect; A16 balance and pretty; A17 stepper glyphs centred; A18 tabular counts; A19 poster prevents empty canvas; A20 motion only on change. Care: phone performance (dpr 1 to 1.25, frameloop demand-ish via invalidate when settled, pause offscreen).
- Different from the other tech and security sites in the repo: no dark hero, no globe, no network diagram, a light product configurator of physical counter hardware.
