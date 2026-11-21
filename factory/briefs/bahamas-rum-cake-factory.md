# Bahamas Rum Cake Factory: brief (Track A, food-events)

## Facts (sources)
- Shopify store thebahamasrumcakefactory.com: "The Official Rum Cake of The Bahamas", free shipping on orders over $55 (US store), Six Pack, Custom six pack, Rum cakes, Apparel, Hair & Skin Care; flavours Original, Pineapple, Pina Colada, Chocolate, Coconut, Caramel Caribbean, Original with Pecans, Banana, Amaretto, Kentucky Bourbon, Key Lime, Irish Cream, Strawberry (sold out), Pumpkin Spice; 4 oz and 20 oz singles, six packs, bundles; master baker Simon Smith (video with Ainsley Harriott). https://thebahamasrumcakefactory.com/
- Story: downtown Nassau, 2000, George Bates (from the UK) founded the Original recipe, same location since, 2014 recognised as Official Rum Cake of The Bahamas, marinated in Ole Nassau Bahamian Rum. https://thebahamasrumcakefactory.com/pages/about (snippet) and https://www.tripadvisor.com/Attraction_Review-g147416-d11094462 (their own description)
- 602 E Bay St, (242) 328-3750; opens 7:30 am Mon-Sat, 8:00 am Sun. https://m.yelp.com/biz/bahamas-rum-cake-factory-nassau (third party)
- Record: McPherson St, Nassau; listed site bacardirumcake.com (fetch-blocked). prospects.json

## Photos (their Shopify CDN)
20oz_bundt_*.png product shots, 6pack_4oz_Pineapple_Beach_SoGood.png, 6pack_4oz_Pineapple_2girls_SoGood.png, IMG_5312.jpg. Files named AdobeStock_* deliberately not used.

## Current site audit
1. Old listings point to bacardirumcake.com.
2. Address, hours, phone not prominent on own site; third-party sites disagree (East Bay vs McPherson St).
3. Founding story on inner page.
4. Long repeated product grid on mobile.
5. Stock-named product images.

## Buyer portrait
Cruise passengers (US, 30-70) walking from Prince George Wharf deciding today on a phone, plus repeat buyers in the US ordering gifts online. Compare with Tortuga (Cayman) rum cakes. Fear tourist trap, cake not travelling. Chose well: official status, same shop since 2000, real bakery, easy reorder.

## Strategy
index.html + flavours.html. Primary CTA "Order a rum cake" (their store). Secondary "Build a six pack". SEO "rum cake Nassau"; secondary "Bahamas rum cake", "rum cake shop near Nassau cruise port", "official rum cake of the Bahamas", "order Bahamian rum cake online".

## Positioning
For cruise visitors and gift buyers who want the real taste of Nassau, the Bahamas Rum Cake Factory is the downtown shop whose Original recipe became the Official Rum Cake of The Bahamas.

## Design
References: laduree.com, ottolenghi.co.uk (from knowledge: product as hero, generous serif type, pastel fields). Brand truth: "One recipe, one downtown shop since 2000, now the nation's official rum cake." Feel: warm, glazed, celebratory, crafted, giftable.
Fonts Gloock 400 + Mulish 400/600. Palette cream #faf3e6, cream-2 #f2e6cf, rum #2a1a12, muted #6b5546, line #e6d6b8, gold #8f6214, gold-light #e2b862, conch #f1d3cf.
Hero: product close-up, their real 20 oz Original bundt on a conch-pink disc with rotating ring text, giant serif headline. "This shows the Original bundt because the brief says the Original recipe started the shop."
Interactions: six pack planner (fill 6 slots, hand off to store); flavour menu with hover preview; inactive "Order online, coming soon" platform hook; FAQ.

## Scorecard
All lines 4.

## Assumptions to confirm
- Street: East Bay Street (Yelp) vs McPherson St (record).
- Phone (242) 328-3750 and opening times from Yelp; closing time unknown.
- Which flavours come in which sizes.

## Unknowns
Email, WhatsApp, closing hours, current owner title (a fan post calls Simon the owner).

---
# Generation 2 design plan (2026-11-21)
Audit (Nov 21, products.json, 2 calls): Shopify webshop, 80 products: 14 rum cake flavours at 4 oz $6.99 / 20 oz $21.99 (Strawberry sold out; Pumpkin Spice 20 oz sold out), single-flavour 4 oz six packs $37.75, mix-and-match Six Pack $37.75, 20 oz 2-packs $39.58, apparel $15 / $20, hair and skin care and air fresheners $10 to $31.50. Priority C. Concept = the same webshop, better: catalogue, six-pack builder, cart drawer, checkout preview that hands off to their real Shopify cart (cart permalink with their variant IDs).

**Photos (all their own, Shopify CDN):** 14 studio shots "20oz_bundt_<flavour>.png" 2718x2048, each the cake on its own colour ground (orange, pineapple yellow, coconut white, lime green, chocolate brown...); Six_Pack_*.png 2500x2500 packshots; shop photos IMG_5409 / IMG_5561 / IMG_5548 1024x683 (tasting at the counter, the storefront sign) and Carnival_3_smiling__customers_six_packs.jpg 5472x3648 (storefront, customers with six packs). AdobeStock-named files not used.

**Big idea:** the shop's own studio photographs already give every flavour its own colour, so the page is a colour poster that changes with the flavour you pick: choose Key Lime and the whole first screen turns lime green with the Key Lime cake on it, price and Add to bag beside it.

**Direction:** A09 Colour poster + P11 Straw market + T11 Neo-grotesk display (N4 floating dock, M3). Why: rum cake is a gift bought on impulse by cruise visitors; flavour colour is the product truth and the most appetising thing they own; straw, rum brown and palm green from the lane carry the sections between the flavour grounds.

**Fonts:** Bricolage Grotesque (display, opsz, tight -0.04em, sentence case) + Figtree (text).

**Storyboard (desktop):**
1. Hero: full-bleed 20 oz photo of the chosen flavour (cover, anchored top), H1 "The Official Rum Cake of The Bahamas." centred above the cake; flavour row of 14 chips along the bottom ground; right of the cake a price card (20 oz $21.99 / 4 oz $6.99, Add to bag; sold-out states real). Changing flavour crossfades the photo (the colour wipe).
2. Six-pack builder on straw ground: six slots, tap flavours to fill, $37.75, Add six pack (mix-and-match product, flavours in the order note) beside the real Six Pack packshot.
3. Story on rum-brown ground: downtown Nassau, 2000, George Bates, same shop since, 2014 Official Rum Cake of The Bahamas, marinated in Ole Nassau Bahamian Rum; IMG_5409 (tasting at the counter) at <= 680 px.
4. Visit the shop: Carnival_3 storefront photo full-bleed (5472 source), 602 East Bay Street, (242) 328-3750, opens 7:30 am Mon to Sat, 8 am Sun (Yelp, to confirm).
5. More from the shop: 2-packs, six packs by flavour, apparel, hair and skin care as a row with link to the full shop page.
6. Footer: free shipping on US orders over $55, store link.
Shop page: full catalogue with category filter and search, cart drawer, checkout preview.
Dock (N4): Flavours, Six pack, Visit, Bag (count).

**Phone:** 1) H1 on the flavour ground, the 4:3 photo full width, chips scroll sideways, price buttons; 2) six-pack slots 3x2; 3) story.

**Conversion:** Add to bag -> cart drawer -> "Checkout on thebahamasrumcakefactory.com" (real cart permalink); visit the shop for cruise passengers.

**Tier:** standard. Distinct: only colour-poster food site; their own studio grounds drive the colour.
