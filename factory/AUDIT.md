# Site audit: redo the analysis of every business's current website

Why: the first analysis treated every business as "needs a brochure site". Some already run full webshops,
listings sites or booking engines; a brochure concept for them is a downgrade and loses the pitch. A third
of the "no site" businesses actually have one. The concept must be the SAME kind of site as their real setup,
done far better, and SMEs come before webshops and enterprises.

Data: `factory/audit/<slug>.json`, one file per business (each session writes only its own; `url` found from prospects.json or the brief;
`audit` is null until done; 8 done on Nov 8).

## Step 1. Audit each business (about 2 Firecrawl calls each)
For every row with a `url` and `audit: null`:
1. `firecrawl_scrape` the homepage with formats ["markdown", "links"] (onlyMainContent false) and read it yourself.
   Count products and listings from the links, look for cart, checkout, account, booking or date pickers, the
   platform (generator meta, wp-content, cdn.shopify, wix), the latest year, and the mobile layout.
2. Open the most important inner page if needed (shop, rooms, listings).
3. Fill in `audit`:
```json
{ "site_kind": "none | social-only | brochure | booking-site | webshop | catalogue-no-cart | listings-site | association-directory | portal-enterprise | news-media | placeholder",
  "cart": false, "online_payments": false, "booking_engine": "", "products_or_listings": 0, "pages": 0,
  "platform": "", "latest_year": 2024, "modernity": 3,
  "concept_type": "the same kind of site we must build, e.g. 'webshop: catalogue + cart + delivery islands', 'booking: room picker with dates', 'listings: search + filters + property pages', 'brochure: services + quote'",
  "must_keep": ["features the concept must have so it is not a downgrade"],
  "weaknesses": ["what is genuinely bad today, for the pitch"],
  "priority": "A | B | C | D",
  "note": "one line" }
```
For rows without a `url`: one `firecrawl_search` "<name> Bahamas" to confirm there is no site
(set site_kind none or social-only, or record the URL found and audit it).

## Step 2. Priority (what to build first)
- A: SME (Small or Medium) with no site, social only, a lost domain, or a weak brochure (modernity <= 3 or latest year <= 2021). Highest value, easiest win.
- B: SME with a decent brochure or booking site. The concept must keep their booking flow and be clearly better.
- C: SME with a real webshop, listings site or large catalogue. The concept must be the same setup (catalogue, cart, search) and better. Build after A and B.
- D: large enterprises, government, news media, associations with member portals. Last; one-page concepts.
`batch.mjs pending` sorts by this priority automatically once a row has `audit.priority`.

## Step 3. Use it in every build
The builder reads its row: `concept_type` and `must_keep` decide the sitemap and the interactions
(a webshop concept has product pages, filters, a cart drawer and a checkout preview; a booking concept has the
real date and room flow; a listings concept has search and property pages). Never build a brochure for a
business whose real site is a shop.
