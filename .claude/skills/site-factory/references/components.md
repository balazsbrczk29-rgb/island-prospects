# Mandatory shared components

> **The art-director skill is the design authority.** This file only covers its own topic. Where it mentions layouts, signature visuals or "the reference site", treat them as examples: visuals are photographs (never drawn scenes or toy 3D), and references are award-level sites you look at with `look.mjs`, never another site in this repo.

Shared files live in `/assets/` (repo root). Reference them relatively from a site folder: `../assets/...`. Do not copy or edit them per site.

## 1. Concept ribbon (first element inside `<body>`, every page)
```html
<link rel="stylesheet" href="../assets/concept.css">   <!-- in <head>, before styles.css -->
...
<body>
<!-- Place directly after <body>. assets/concept.css renders it as a small floating tag bottom-left, NOT a bar: never restyle it into a banner, never cover it. If your site has a fixed bottom bar, set :root { --concept-offset: <bar height> } so the tag sits above it. -->
<div id="concept-ribbon" class="concept-ribbon" role="note">
  <span>Concept preview prepared for {Business name}. This is not the official website.</span>
  <button type="button" class="concept-ribbon__btn" data-concept-open>What we would change</button>
</div>
```
Keep its wording. Put it directly after `<body>`. The shared CSS turns it into a small floating tag in the bottom-left corner, so your own first screen is what the owner sees first. Never restyle it into a full-width bar. If your site has a fixed bottom bar, set `:root { --concept-offset: <bar height> }` so the tag floats above it.

## 2. Concept notes (the sales panel, every page, just before `</body>`)
```html
<script type="application/json" id="concept-notes">
{
  "business": "{Business name}",
  "current_site": "{domain or null}",
  "findings": ["{owner-facing problem 1}", "{problem 2}", "{problem 3}"],
  "improvements": ["{what this concept does about it 1}", "{2}", "{3}"],
  "agency": "{agency_name from factory/config.json}",
  "contact": "{agency_contact from factory/config.json}"
}
</script>
<script src="../assets/concept.js" defer></script>
```
`findings` and `improvements` are 3-6 items each, plain words, true, specific. This panel is what Balazs opens in front of the owner.

## 3. Enquiry form (primary conversion; works without a backend)
```html
<form class="enquiry" data-enquiry
      data-business="{Business name}"
      data-whatsapp="{digits only, e.g. 12423675555, or empty}"
      data-email="{sourced email or empty}"
      action="mailto:{sourced email}" method="post" enctype="text/plain">
  <label>Your name <input name="Name" required autocomplete="name"></label>
  <!-- niche fields: Arrival / Departure / Guests / Boat LOA / Draft / Service needed ... -->
  <label>Message <textarea name="Message" rows="4"></textarea></label>
  <button type="submit">{Primary CTA label}</button>
  <p class="enquiry__note">Opens WhatsApp (or your email app) with your details filled in.</p>
</form>
<script src="../assets/enquiry.js" defer></script>
```
`enquiry.js` builds the message from every named field and opens `wa.me/<number>?text=` when `data-whatsapp` is set, otherwise a `mailto:`. Only put a number in `data-whatsapp` if research shows the business uses WhatsApp on that number. If you have neither a WhatsApp number nor an email, do not render the form: render a large "Call {phone}" block instead.
Style the form yourself in `styles.css` to match the site.

## 4. `site-data.json` (platform-ready business record, one per site)
```json
{
  "schema": "island-previews/site-data@1",
  "slug": "...",
  "name": "...",
  "niche": "...",
  "contact": {"phone": "+1-242-...", "whatsapp": null, "email": null, "address": "...", "settlement": "...", "island": "..."},
  "hours": null,
  "socials": [],
  "offer": [{"name": "...", "kind": "room|slip|tour|service|product", "summary": "...", "price": null, "source": "https://..."}],
  "platform": {"candidate": false, "orderable": false, "categories": []},
  "sources": ["https://..."]
}
```
This is how every site becomes a future node on the agency's delivery/booking platform. `platform.candidate` is true for food, retail, catering, bakeries, rum cake, hardware, paper and similar merchants.

## 5. Mobile primary action
The primary action (call, WhatsApp if sourced, or the enquiry) must be thumb-reachable on phones, in the form your archetype gives it: a magazine tear-off strip, a floating dock, a legend bottom sheet, a toolbar button, a reply-card tab, a single "Enquire" word. Design it; never paste the generation-1 two-cell bar with `aria-label="Quick actions"` (distinct.mjs blocks it). Use `padding-bottom: env(safe-area-inset-bottom)` for anything fixed to the bottom and leave room so the footer is not covered.
