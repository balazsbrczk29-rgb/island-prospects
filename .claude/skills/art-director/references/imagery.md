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
- Keep files with width >= 2000, licence CC0, CC BY, CC BY-SA or Public domain, and a description that says what you need. Skip maps, logos, paintings, old scans, photos with readable other-business signage as the subject, and photos centred on identifiable people.
- Use `thumburl` (2000px) for `src`. Credit each one: a small caption "Photo: <Artist>, <Licence>" on the image, or a "Photography credits" line in the footer listing them. Strip HTML from Artist.
- These show the place, never the business's own rooms or boats. Caption them as the place ("Hope Town harbour, Elbow Cay").
- Record every Commons file (URL, artist, licence) in status `images`.

## 3. Lovable photoreal generation (the trade and its subject)
One Lovable project per business, used only as an image studio, about 1 Lovable credit per 4 images.
1. `mcp__Lovable__create_project` with `workspace_id` "daQesEM9Br73deJHgggx", `wait` false (keep working while it renders; poll with `get_message` later), and this message (fill the list):
   "This project is only an image asset studio, not a website. Generate these photorealistic images with your image generation tool and save them in public/assets/ as JPG, at least 1600px wide. Then make the home route a page that shows all images as a grid of equal thumbnails, 3 columns, all visible in one 1440x900 screen, with file names under them. No other UI. Style for all: <photographic style line>. No text, no logos, no watermarks, no recognisable faces, not CGI-looking.
   1. <name>.jpg (<ratio>): <precise scene>
   2. ..."
2. `mcp__Lovable__deploy_project` with name `ip-assets-<slug>` (shorten to 40 chars). Images are then live at `https://ip-assets-<slug>.lovable.app/assets/<name>.jpg`.
3. `mcp__Lovable__get_project` returns a screenshot of the grid: look at it. Regenerate (`send_message`, same project) any image that looks fake, has text, extra limbs, wrong architecture or a non-Bahamian setting. One regeneration round at most.
4. If any Lovable call returns `awaiting_input` or a credit limit, stop using Lovable for this site and continue with sources 1, 2 and 4. Never wait on it.

Writing the scene (this is where quality comes from):
- Photographic style line: "editorial architecture / documentary photography, full-frame camera, 35mm or 50mm lens, natural <time of day> Caribbean light, true colours, subtle film grain".
- Name the Bahamian specifics: concrete block houses painted white or pastel with hip roofs or flat parapet roofs, louvred hurricane shutters, casuarina and coconut palms, limestone rubble walls, turquoise shallows, Out Island docks of weathered timber, Nassau Bay Street colonial facades.
- Show the trade honestly: a roofer's subject is a roof on a real-looking house (overall, detail of layers, the crew's gloved hands at a seam, after rain); a glazier's is glass being fitted; a paving firm's is fresh asphalt being rolled with the sea behind; a security firm's is an officer's back and radio at a gate at dusk; a water company's is condensation on a unit on a roof.
- Never generate: the business's own building, rooms, boats, staff, customers, food menu items they sell, awards, signage or anything with their name. Never generate anything that would be read as "this is our property".
- On the site, generated images carry `data-source="generated"`; list them in status `images` and in concept notes as "Illustrative photography. Replace with your own project photos."

## 4. Real objects in 3D: img2threejs
When the archetype is A06 Object study and there is no photo sequence, rebuild the object as a
procedural three.js model from a reference photograph (own photo, Commons or a Lovable image) using
`.claude/skills/img2threejs/SKILL.md`. Materials must be physically based (MeshPhysicalMaterial,
environment lighting via drei Environment preset "city" or "sunset"), soft contact shadows, ACES tone mapping.

## 5. What never appears
SVG drawings of buildings, vehicles, people, landscapes or boats. Low-poly toys. Emoji. Icon rows as
illustration. Grey placeholder boxes in the shipped site. Unsplash or stock libraries. Google Maps,
TripAdvisor, Booking or news photos.
