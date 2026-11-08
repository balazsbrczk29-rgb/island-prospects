# Palette lanes (Bahamian sources)

A lane is a colour world taken from a real Bahamian place or material. The hex values are starting
points: refine them from the business's own photos, logo or the exact place. "Ground" is the main
page background: it defines the site's first impression, so lanes deliberately differ in ground.
Only lane P01 has a near-white ground. Generation 1 used near-white on 52 of 52 sites; that is over.

| Lane | Source | Ground | Ink | Accents | Fits |
|---|---|---|---|---|---|
| P01 Limestone | cut coral stone, whitewash, noon glare | #EFEAE0 | #1B1A17 | #2F6F73 sea glass, #B89B6A sand | any, max 10% of sites |
| P02 Shallow flats | Exuma sandbars, bonefish flats | #BFE3DC (aqua ground) | #0D2B2E | #F4EFE4 sand, #1E6B72 channel | tours, hospitality, marina |
| P03 Conch pink | conch shell interior, Harbour Island houses | #F2C9C0 | #3A1E1F | #FDF3EE shell white, #C46A77 deep pink, #2E5E5A shutter green | food-events, hospitality, weddings |
| P04 Mangrove | Andros mangrove, tannin water, sea grape | #1F3B2E (deep ground) | #EFE8D8 | #B88A4A tannin, #7FA37A leaf | lodges, eco tours, fishing, dive |
| P05 Night harbour | harbour lights after dusk | #0E1B2B (dark ground) | #E9E4D8 | #D8B46A brass light, #5FA3B5 | dive, bars, security, marina evenings. Max 8% of sites |
| P06 Junkanoo | Boxing Day rush costumes, crepe paper | #FFD23F (yellow ground) | #141414 | #12A4A0 aqua, #E83F8C magenta, #1B3FA0 | food-events, tours, retail, festivals |
| P07 Abaco pine | Caribbean pine forest, pine needles on sand | #DCE3CF | #15261C | #2F5B3A pine, #C9A46A needle, #6E8F9C | outdoors, construction, hospitality Grand Bahama |
| P08 Bay Street pastel | Nassau colonial buildings, louvred shutters | #F6E3A6 (pastel yellow) | #2A2420 | #E9A7A0 salmon, #3E7A63 shutter, #FFFFFF trim | heritage retail, law, hotels in Nassau |
| P09 Shipyard steel | galvanised steel, safety yellow, dock concrete | #C9CCCD (steel ground) | #111417 | #F2C230 safety yellow, #2D4A63 | industrial, construction, security, fuel |
| P10 Ink and paper | contracts, ledgers, banknotes | #F4F1EA | #141A26 | one jewel: #1F4E5F or #4A2E4F or #2E4A2B | law, trust, finance, government. Max 12% |
| P11 Straw market | plaited palm straw, sisal, raffia | #E2CFA3 (straw ground) | #2B2118 | #8C5A2B, #1F4F4A, #F7F0E0 | crafts, retail, food, small inns |
| P12 Inagua salt | salt pans, flamingo flocks, grey skies | #EDEDEB | #2F3135 | #F0A1A8 flamingo, #8B9AA6 slate | eco, institution, real estate, calm hotels |
| P13 Hull and brass | navy hulls, varnished teak, brass fittings | #13263F (navy ground) | #F1EADB | #C9A15B brass, #8A5A3B teak | marinas, yacht services, boat rental |
| P14 Blue hole | the deep blue of Dean's and Andros blue holes | #0B4F6C (deep blue ground) | #F3F7F6 | #9ED8DB, #F2D16B | dive, tours, water tech |

Rules
- Ground must match the lane: QA reads the computed body background and blocks a site whose lane is not P01, P10 or P12 but whose ground is near-white (lightness > 90 and chroma < 6).
- Use the ground for whole sections; tonal shifts happen between the lane's own colours, not back to white.
- Orange and red stay banned as accents unless they are the business's real brand colour. Coral pink and salmon are allowed.
- No purple-to-blue gradients. Gradients only between two colours of the same lane.
- A dark-ground lane (P04, P05, P13, P14) may be the whole site's ground; it must still have one light section (a photograph-led or paper section) for rhythm.
