# Imagery: exact procedures

Aim for 8-15 real photographs per home page. A page full of photographs of the actual place and trade
beats any drawing or shader. The sandbox cannot load outside images, so QA shows them as grey boxes:
that is expected. The fresh-eyes critic gets the Lovable gallery screenshot to judge them.

## 1. The business's own photos
From research: every `<img>` URL on their site and official socials (firecrawl formats images).
Hotlink only those exact URLs. Prefer the largest variant (strip WordPress `-300x200` suffixes only if
you saw the full-size URL in the listing). Use them big; never as thumbnails in cards.

## 2. Wikimedia Commons: the real place (1 firecrawl call per search)
```
firecrawl_scrape  url = https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=<PLACE WORDS> filetype:bitmap&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|extmetadata&iiextmetadatafilter=Artist|LicenseShortName|ImageDescription|DateTimeOriginal&iiurlwidth=2000&format=json
                  formats = ["rawHtml"]
```
- Search the specific place: "Hope Town harbour", "Elbow Cay lighthouse", "Bay Street Nassau", "Port Lucaya", "Fernandez Bay Cat Island", "Andros mangroves", "Exuma cays aerial". Add the island name.
- Keep only excellent files: width >= 3000, taken 2010 or later (DateTimeOriginal), licence CC0, CC BY, CC BY-SA or Public domain, a description that says what you need, and a subject that will look like editorial photography (good light, sharp, level horizon). Add `incategory:Quality_images` to the search first; drop it only if nothing comes back. Better no Commons photo than a mediocre one. Skip maps, logos, paintings, old scans, photos with readable other-business signage as the subject, and photos centred on identifiable people.
- Use `thumburl` (2000px) for `src`. Credit them in ONE small footer line ("Photography: <Artist> (CC BY-SA 4.0), ...") and in the concept notes. No credit captions on the images, no credit lists in sections. Strip HTML from Artist.
- These show the place, never the business's own rooms or boats. Caption them as the place ("Hope Town harbour, Elbow Cay").
- Record every Commons file (URL, artist, licence) in status `images`.

## 3. Lovable photoreal generation (the trade and its subject)
One Lovable project per business, used only as an image studio, about 1 Lovable credit per 4 images.
1. `mcp__Lovable__create_project` with `workspace_id` "daQesEM9Br73deJHgggx", `wait` false (keep working while it renders; poll with `get_message` later), and this message (fill the list):
   "This project is only an image asset studio, not a website. Generate these photorealistic images with your image generation tool and save them in public/assets/ as JPG, at least 1600px wide. Then make the home route a page that shows all images as a grid of equal thumbnails, 3 columns, all visible in one 1440x900 screen, with file names under them. No other UI. Style for all: <photographic style line>. No text, no logos, no watermarks, no recognisable faces, not CGI-looking.
   1. <name>.jpg (<ratio>): <precise scene>
   2. ..."
2. `mcp__Lovable__deploy_project` with name `ip-assets-<slug>` (shorten to 40 chars). Images are then live at `https://ip-assets-<slug>.lovable.app/assets/<name>.jpg`.
3. Look at the images: `node factory/tools/look.mjs https://ip-assets-<slug>.lovable.app lovable-<slug>` and read the PNG (or the screenshot `mcp__Lovable__get_project` returns). Regenerate (`send_message`, same project) any image that looks fake, has text, extra limbs, wrong architecture or a non-Bahamian setting. One regeneration round at most.
4. If any Lovable call returns `awaiting_input` or a credit limit, stop using Lovable for this site and continue with sources 1, 2 and 4. Never wait on it.

### Art-directing the generated set (this is where quality comes from)
Write the brief for the set like a photo director, not like a caption. Every image prompt has these seven parts:

`[SHOT TYPE] of [SUBJECT doing/being something specific], [BAHAMIAN SETTING with 2-3 named specifics], [COMPOSITION for the web slot], [LIGHT], [CAMERA], [STYLE LOCK], [EXCLUSIONS]`

- **STYLE LOCK**: one sentence written once per site and pasted unchanged into every prompt, so the set looks like one shoot. Derive it from the palette lane and the brand truth. For example:
  - "Shot on Kodak Portra 400, soft late-afternoon Caribbean light, warm highlights, gentle film grain, true-to-life colour, editorial travel photography" (resorts);
  - "Overcast-bright documentary light, neutral true colour, crisp detail, editorial architecture photography" (trades and industry).
- **COMPOSITION for the web slot**: say where the empty space is, because a hero needs room for type. For example: "subject in the right third, calm sky in the upper left 40% for a headline", "low horizon, wide negative space above", "tight detail, shallow depth of field".
- **CAMERA**: lens and viewpoint ("35mm at eye level", "24mm from a low angle", "drone view 40 m up at 30 degrees", "100mm macro").
- **EXCLUSIONS** (always): "no text, no logos, no signage, no watermarks, no recognisable faces, no people looking at the camera, not CGI, not illustration, no oversaturation, no HDR halos".
- **Bahamian truth**: islands are flat; casuarina, coconut palm, sea grape and Caribbean pine; concrete-block houses painted white or pastel with hip roofs or flat parapets, louvred shutters; limestone; very clear turquoise shallows over white sand; Out Island docks of grey weathered timber. Never mountains, never European or Floridian high-rise skylines.

Shot list per niche (choose 8-12, at least 3 per site at hero quality, in 16:9 for desktop and a matching 4:5 crop for mobile):
- **Trades, construction, roofing, glass, pools, upholstery**: the finished result on a real-looking Bahamian building; a cross-section or detail of the work; gloved hands at the critical step; the tool and the material close up; the crew from behind in context; the result after rain or at dusk; the workshop or yard.
- **Industrial, port, energy, shipyard**: a wide establishing view from the air; machinery at work at human scale; a safety detail; a process close-up; the operation at blue hour.
- **Retail, home centre, paper, rum cake**: hero still life of the core products on one surface and one backdrop; hands choosing or wrapping; aisle detail with soft depth of field (no brand labels readable); delivery to a dock or mailboat; the product in use at home.
- **Hospitality, resort, inn, lodge**: beach at the property's actual orientation and hour; a room detail (linen, louvres, view through the window, never claiming it is their room); the dock or path; a breakfast or drink still life; dusk across the water.
- **Marina**: yacht sterns at slips at blue hour; dock cleats and lines; fuel dock detail; aerial of a calm harbour; a tender arriving.
- **Tours, dive, boat rental**: the experience at its peak (sandbar, reef under the surface, swimming pigs from a distance); the boat from above in clear water; gear detail; the guide's hands at the helm.
- **Professional, finance, legal, institutions**: architecture and materials, not people (Bay Street colonnades, cut stone, a pen on paper, a quiet office with louvres and sea light); abstract-but-real details that carry calm authority.
- **Food, events, weddings**: the table at golden hour; hands at the craft (icing, plating); the venue setting on the sand; a single plate or cake detail.

Rejection checklist: look at the gallery with look.mjs at full size and regenerate anything that fails:
- plastic or waxy skin and surfaces, melted geometry, extra or wrong limbs or fingers, garbled pseudo-text;
- wrong architecture or vegetation, mountains;
- inconsistent light or grade versus the rest of the set;
- the subject is too small for its slot, or there is no headline space where the hero needs it.

Placing them: the hero image uses `fetchpriority="high"` and both crops via `<picture>`; every image has real alt text describing what is shown; generated images carry `data-source="generated"` and are listed in status `images` and the concept notes as "Illustrative photography. Replace with your own project photos." Never generate the business's own building, rooms, boats, staff, customers, signage or anything with its name, or anything that would be read as "this is our property".

### Paid upgrades (only if credits exist)
If `mcp__Higgsfield__balance` shows credits: one 4-6 second hero loop (palms moving, water shimmer) from the best hero image with Higgsfield image-to-video; muted, autoplay, `playsinline`, poster frame = the still, and off when `prefers-reduced-motion`. Otherwise stills only.

## 4. Real objects in 3D: img2threejs
When the archetype is A06 Object study and there is no photo sequence, rebuild the object as a
procedural three.js model from a reference photograph (own photo, Commons or a Lovable image) using
`.claude/skills/img2threejs/SKILL.md`. Materials must be physically based (MeshPhysicalMaterial,
environment lighting via drei Environment preset "city" or "sunset"), soft contact shadows, ACES tone mapping.

## 5. What never appears
SVG drawings of buildings, vehicles, people, landscapes or boats. Low-poly toys. Emoji. Icon rows as
illustration. Grey placeholder boxes in the shipped site. Unsplash or stock libraries. Google Maps,
TripAdvisor, Booking or news photos.
