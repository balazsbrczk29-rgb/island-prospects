# BHM (Bahamas Hot Mix): design.md
Job spec: `factory/jobspecs/bahamas-hot-mix-co.md` (approved Nov 22). Previous version: gen 2 "We pave the runways you land on" (scroll approach to the Hog Cay runway as hero, runways, inward works, materials, ISO, project index, quote desk with office routing).

## 1. The idea in one paragraph
"The atlas of what BHM has built." Screen 1 is an engineer's survey sheet: a real map of The Bahamas (Natural Earth 1:10m coastline, not a drawing) with every named project from bhmgroup.com counted on its island, and a quote router beside it. Filter by kind of work and the island counts and the list respond; tap an island and you see its projects with their own photographs, and the quote router sets that island and names the office that handles it (Nassau, Freeport or Marsh Harbour). A procurement manager sees in one look that BHM has worked on their island, in their kind of work, and is one tap from a routed request. The runway approach from the previous version follows as screen 2, the proof.

## 2. Inspirations
- **Swiss topographic sheets (swisstopo) and Bloomberg graphics:** a calm map with monospace data labels and hairline leaders. Taken: island labels with counts in IBM Plex Mono, hairline sea grid.
- **Linear's filtering:** chips change the data instantly with counts. Taken: category chips with live counts, pins scale with count.
- **Arup project explorer:** project list beside a map, photo on select. Taken: selected island panel with project rows and the project photo.

## 3. Tokens (kept from the previous version, in styles.css @theme; OKLCH equivalents)
- **Type:** Space Grotesk (display, 500 to 650, tracking -0.03 to -0.06em) for an engineered, certain voice; IBM Plex Sans for text; IBM Plex Mono for data (counts, phone, PO boxes, coordinates), tabular. Scale: 13 / 15 / 17 / 22 / clamp(28, 40) / clamp(38, 68) / clamp(44, 104).
- **Colour:** salt #EDEDEB oklch(94.2% 0.002 106) ground; white #F8F8F6 oklch(97.8% 0.002 106) surface; ink #2F3135 oklch(30.7% 0.007 265); ink-deep #1D2023 (materials field); muted #5E6268 oklch(49.6% 0.01 260), 5.4:1 on salt; line #CFCFCB; accent petrol #0B5D73 oklch(43% 0.08 220), primary actions, selected chips, pins; sea #7FD3D6 used only as the map's shallow-water tint at low opacity.
- **Space:** 4/8 scale, section padding 96 to 144 desktop, 64 phone; 12 columns, pad clamp(20, 4.2vw, 72).
- **Shape:** radius 2 everywhere (engineering drawings), no shadows.
- **Motion:** ease (.22,1,.36,1). 160 ms chips, 300 ms pin scale and list crossfade (popLayout), 1.1 s first clip reveal of the panel. Reduced motion: instant.

## 4. Screens
1. **Atlas and quote router (desktop 1440x900).** Masthead 64px (BHM wordmark + "Bahamas Hot Mix", nav, phone, Request a quote). Below: cols 1 to 7 the map panel on white (map 1000x860 viewBox scaled to ~720x620, land in ink at 85%, neighbouring Florida and Cuba edges in line colour, sea salt with a faint survey grid), category chips above it (All 64, Roads, Runways, Ports, Coastal, Water (RO), Utilities, Site development, Buildings, Drilling) with counts; islands with projects get a petrol pin sized by count and a mono label "New Providence 34". Cols 8 to 12: H1 "Sixty-four projects across The Bahamas. Which island is yours?", the selected island's panel (project rows, the first project's photo at 400x284 native, link to their project page) and the quote router: "What do you need?" chips, island (synced with the map), the routed office line ("Nassau office, Airport Industrial Park, +1 (242) 601 6350") and the primary "Request a quote" (opens the full desk at #quote with both set, or emails directly).
   Phone: H1 first, chips scroll horizontally, map full width (390x335), island list under it as rows (tap = select), selected panel, router compact, primary button. Map and selection on screen 1; button after a short scroll, then the sticky dock.
2. **The approach (kept):** the Hog Cay aerial with the scroll approach (230vh sticky on desktop), H2 "We pave the runways you land on.".
3. **Runways, inward works (roads, ports, water), materials (three asphalt plants, two mobile, ready mix in Grand Bahama, labs), ISO** (kept from previous, unchanged structure).
4. **Projects:** the filterable index (kept), link to projects.html with all thumbnails.
5. **Quote desk and offices (kept)**, now sharing state with the router on screen 1.

## 5. Core tool: interaction spec
- Inputs: category (default All), island (default none, or set by map tap / list tap / router chip), work type (router).
- States: no island selected: panel shows "Tap an island" with the top three islands by count as buttons; island selected: its rows (filtered by category), count, photo of the first; category with zero projects on that island: "No {category} projects listed on {island}; see all {island} work" button; projects whose island is not stated on bhmgroup.com are counted under "Across the islands" (no pin).
- Pins: radius 6 + 2.2 x sqrt(count); scale animates 300 ms on filter; selected pin gets a ring. Keyboard: pins are buttons in the SVG with aria-label "New Providence, 34 projects"; arrow keys not needed (tab order).
- Routing: Grand Bahama -> Freeport office; Abaco -> Marsh Harbour office; every other island -> Nassau office (as the previous version did).
- Handoff: mailto info@bhmgroup.com with work, island, routed office; tel +12426016350; "Open the full request" scrolls to #quote with state shared.
- Island attribution: only where the project name states the place (or the island is unambiguous from the name: Lynden Pindling = New Providence, Kemps Bay = Andros, Castaway Cay = Abaco, Baker's Bay = Abaco); everything else is "Across the islands". Listed as an assumption in status notes.

## 6. Signature details
1. Real coastline at 1:10m with the survey grid at 0.5 degree steps, mono coordinates on the frame edge (27°N, 79°W).
2. Pin areas proportional to counts, ticking counts in mono when a filter changes.
3. Tapping an island types the office line in the router ("handled by the Freeport office").
4. The project photo eases in at its true 400 px size, never upscaled.

## 7. Photography
- Hero map: no photo (the map is the product). Project thumbnails 400x284 from bhmgroup.com (shown at 400 max). Screen 2 Hog Cay aerial 3960x2970 (rehosted in their Lovable asset gallery). Others as previous (LPIA 5330x3551, GBIA 2560x1707, etc.), all shown below native.

## 8. Self-review
- Screen 1 shows the product (their projects, on their islands) and the tool; the job (routed quote) is reachable on screen 1 desktop.
- A1 no "#1" claim (removed). A2 no redundant labels. A3 no italics. A4 mono only for data (counts, phone, coordinates). A5 tokens. A6 real projects and photos. A7 map is the largest element. A8 spacing. A9 specific H1 with the real count. A10 one petrol primary. A11 petrol on primary, pins, selected chip. A12 no icons. A13 no ornaments. A14 radius 2 throughout. A15 muted 5.4:1. A16 balance. A17 pins centred on islands. A18 tabular mono counts. A19 thumb placeholders with aspect ratio. A20 motion only on filter and select.
- Unmistakably BHM: their 64 named projects on the real map, three offices, ISO, plants. Different from other contractors in the repo: atlas-first, survey-sheet look.
