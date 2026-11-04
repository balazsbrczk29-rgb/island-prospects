# Local SEO for Bahamas businesses

We write production-grade SEO even though the preview is `noindex`. When the owner signs, flipping `noindex` off and pointing the domain is all that remains.

## Head template (every page)
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow"><!-- PREVIEW ONLY: remove at launch -->
<title>{Primary keyword phrase} | {Business name}, {Island}</title>          <!-- 45-62 chars -->
<meta name="description" content="{What + where + proof + action}">     <!-- 120-158 chars -->
<link rel="canonical" href="https://{their real domain or proposed domain}/{page}">
<meta property="og:type" content="website">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="{their real hero photo URL if sourced}">
<meta name="theme-color" content="{--paper}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
```
Proposed domain when they have none: `{shortname}bahamas.com` style; write it in status notes as "proposed, unverified availability".

## Keyword patterns (pick the primary from the business's real offer)
- Stay: `{type} in {settlement}, {island}` e.g. "beachfront hotel in Hope Town, Abaco", "fishing lodge Andros Bahamas", "boutique hotel Harbour Island".
- Marina: "marina {island} Bahamas", "{island} marina slip rates", "fuel dock {settlement}", "port of entry {island}" (only if true).
- Tours: "{activity} {island}" e.g. "shark dive Nassau", "boat rental Marsh Harbour", "Nassau taxi tours cruise port".
- B2B/trade: "{service} Nassau" / "{service} Freeport Grand Bahama" e.g. "roofing contractor Nassau", "glass and glazing Nassau", "security company Freeport".
- Professional: "{practice area} lawyer Bahamas", "insurance broker Nassau", "trust company Bahamas".
Islands and settlements must be spelled exactly: New Providence, Nassau, Grand Bahama, Freeport, Lucaya, Abaco, Marsh Harbour, Hope Town, Elbow Cay, Man-O-War Cay, Green Turtle Cay, Eleuthera, Harbour Island, Exuma, George Town, Long Island, Stella Maris, Cat Island, New Bight, Andros, Bimini, Alice Town, Inagua, Matthew Town.

## On-page
- `<h1>` contains the business name or primary phrase naturally. One per page.
- First 100 words mention the business name, settlement and island.
- Descriptive internal link text. Image `alt` describes the photo (not keyword stuffing).
- NAP identical on every page and in JSON-LD.
- An FAQ block (3-5 Q&As) on index for stay/marina/tours, using only facts; mark up as `FAQPage`.

## JSON-LD (in `<head>`, one `<script type="application/ld+json">` with an `@graph`)
```json
{
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": ["Hotel"],
   "@id": "https://{domain}/#business",
   "name": "...",
   "url": "https://{domain}/",
   "telephone": "+1-242-...",
   "email": "...",
   "image": ["{sourced photo url}"],
   "address": {"@type": "PostalAddress", "streetAddress": "...", "addressLocality": "...", "addressRegion": "{Island}", "addressCountry": "BS"},
   "geo": {"@type": "GeoCoordinates", "latitude": 0, "longitude": 0},
   "sameAs": ["{facebook}", "{instagram}"],
   "openingHoursSpecification": []
  },
  {"@type": "WebSite", "@id": "https://{domain}/#website", "url": "https://{domain}/", "name": "..."},
  {"@type": "FAQPage", "mainEntity": []}
 ]
}
```
Rules: omit any property you could not source (no `geo` guesses unless you found coordinates or the address is precise enough that you can state the settlement only; prefer omitting `geo` over inventing). Never add `aggregateRating` or `review` (we do not fabricate and Google penalises self-serving reviews). Phone format `+1-242-XXX-XXXX`.

## What to tell the owner (goes into `current_site_findings` / concept notes)
Concrete, verifiable, non-technical: "Your site footer still says 2021", "There is no way to request a room from a phone", "Your domain now shows a gambling site, customers searching for you land there", "Google can't tell what island you're on: no address in the page".
