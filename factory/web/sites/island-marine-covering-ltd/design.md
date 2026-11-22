# Cover Up (Island Marine Covering Ltd): design.md

## 1. The idea in one paragraph
"The cutting table." Screen 1 is the counter at Raphia Close: on the left you say what needs covering (House or Boat, then the job), on the right their own photograph of that exact job unrolls over the last one like an awning coming down, scalloped valance and all. Under the job list sit the three things Ricky needs to measure (rough size, where, when), each one tap. The sentence that will be sent writes itself as you choose, and one teal button sends it on WhatsApp to (242) 359-0179. A visitor on a phone can ask for a measure in four taps without scrolling past the tool. The rest of the page is the proof: house work, boat work, how a job runs, the family since 1992, and the workshop door.

## 2. Inspirations
- Aesop product pages: one object per screen, a quiet spec list in plain words beside a large honest photograph. Taken for the house and boat ledgers.
- Sunbrella's fabric selector and Apple's "Which iPhone" chooser: a short choice that changes the picture immediately, no form feel. Taken for the selector (choice first, photo answers).
- Feadship "craft" chapters: big serif, generous white, the made-by-hand process in three numbered beats with real workshop photos. Taken for "How a job runs".
- From `site-playbooks/playbooks/trades.md` (industrial/trades): the enquiry is the hero, proof is real job photos, the address is a sales point.

## 3. Tokens
**Type.** Bitter (variable, 400 to 700, plus italic) as display: a slab serif reads like stencilled canvas and workshop signage, sturdy rather than luxurious, and no other site in the repo uses it. Instrument Sans (variable 400 to 600) for text: clean, slightly narrow, good tabular figures for the phone number.
Scale (px, desktop / phone):
- caption 14 / 14, line 1.4, tracking 0.01em (Instrument Sans 500)
- body 17 / 16, line 1.55, tracking 0
- lead 20 / 18, line 1.45
- h3 28 / 24, line 1.12, tracking -0.015em (Bitter 600)
- h2 48 / 34, line 1.02, tracking -0.025em (Bitter 600)
- hero 64 / 40, line 0.98, tracking -0.03em (Bitter 650)
Italic Bitter is used for one voice only: the quoted line of the founder ("one sewing machine and one roll of canvas") and the live message preview (the visitor's own words).

**Colour (OKLCH).**
- ground `oklch(0.968 0.012 88)` sailcloth white
- surface `oklch(0.935 0.022 86)` raw canvas (the tool's answer panel, process strip)
- ink `oklch(0.25 0.035 248)` navy thread
- muted `oklch(0.46 0.03 248)` (about 7:1 on ground)
- line `oklch(0.25 0.035 248 / 0.16)`, stitch line `oklch(0.25 0.035 248 / 0.38)` dashed 6/5
- accent `oklch(0.47 0.085 205)` canopy teal, taken from their Old Fort Bay awning; used only for the primary WhatsApp action, the active selector state marker and the focus ring. White on accent is about 5.6:1.
- field `oklch(0.3 0.05 245)` deep canvas navy for the family section; text on it `oklch(0.97 0.01 88)`.

**Space.** 4/8 scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 128 desktop / 64 phone. 12-column grid, gutter 32 desktop / 16 phone, page inset clamp(20px, 4vw, 64px), max content 1360. Text measure 62ch max.

**Shape.** Radius 2 px on buttons and chips (cut canvas, not pills); photo frames 0. Inner = outer minus padding where nested (answer panel 6, its button 2 with 4 px inset rule not needed). One soft shadow only: the unrolling photo's valance casts `0 10px 18px -12px oklch(0.25 0.035 248 / .35)` during the move.

**Motion.** Ease `cubic-bezier(.22,1,.36,1)`; feedback 160 ms; reveals 560 ms; the awning unroll 720 ms (photo) with the valance strip leading. Stagger: hero title, lede, selector 70 ms apart on load. Section reveals: none beyond a single 560 ms opacity+12 px rise on headings, once. Reduced motion: photos crossfade 0 ms (instant swap), no rise.

## 4. Screens

### Screen 1: "What needs covering?" (the tool)
Purpose: pick the job, see their photo of it, send the measure request.
Desktop 1440x900: thin bar 64 px (Cover Up wordmark in Bitter 600 24 px + "Island Marine Covering Ltd" caption; right: "Raphia Close, Airport Industrial Park" caption and the phone number tabular). Below, a 12-col grid, height = viewport minus bar.
- cols 1 to 5: H1 "Shade and shelter, cut and sewn in Nassau." (hero size, 2 lines), one lede line. Then the House / Boat switch (two large text tabs, underline marker in teal that slides between them). Then the job list for that side as Bitter 22 px rows with a hairline between, the active row marked by a 3 px teal bar at left and full ink. Then "For a measure we ask" three compact rows: Size (chips), Where (text input), When (chips). Then the teal button "Send on WhatsApp" + "or call (242) 359-0179".
- cols 6 to 12: the stage. Their photo for the job, 4:3 frame, width capped at the photo's native width (Old Fort Bay 1280 native, shown about 760). The facts for the job sit under the photo in two columns of caption text. The live message preview sits as an italic line under the facts, on the canvas surface strip.
Jobs without a photo (hurricane shutters, sun shades, Bimini tops, bow rails): the stage shows a canvas-surface plate with the job name large in Bitter, the sourced specs, and "Send us a photo of the opening and we price from it" (honest, no fake image).
Phone 390: bar 56 (wordmark + call icon-less number). H1 40 px, lede. House/Boat switch full width. Job list becomes a horizontal chip row (scroll-snap). Stage photo full bleed 4:3. Questions below as chips. A fixed bottom bar with the teal "Send on WhatsApp" button appears once the H1 scrolls out (always in reach).

### Screen 2: For the house
Purpose: show every house job with their photo at native size so they believe the quality.
Desktop: section head "For the house" h2 at cols 1 to 6, one line at cols 8 to 12. Then a ledger: each job a row on a 12-col grid, name h3 at cols 1 to 4 with its specs as a hairline-ruled list, photo at cols 5 to 12 (max native width), "Ask for a measure for this" link that sets the tool and scrolls up. No cards. Jobs without photos are type-only rows (name + specs + link) with a dashed stitch line above.
Phone: name, specs, photo full width, link.

### Screen 3: For the boat
Same ledger, mirrored (photo cols 1 to 8, name cols 9 to 12) so the two departments read as two sides of the workshop. Isinglass enclosure (Covers.jpg 1632 native), marine upholstery (cushions 1024 native, helm seat 768 portrait), boat covers (Small-Boat-Cover 1278), ferry seating (Ferry-Seats 1632). Bimini tops and bow rails as type rows.

### Screen 4: How a job runs
Purpose: remove the fear of waiting on Florida. Three numbered beats on the canvas surface: 1 Measure (we come to the house, the dock or the boat yard), 2 Cut and sew at Raphia Close (cutting photo 768x1024), 3 Fit (sewing photo / helm seat). Portrait photos in 3:4 frames at max 420 px wide. Under it the storm note: "Hurricane shutters are made to each opening, so ask for your measure well before the season." (category only). Phone: beats stack, photos 3:4 full width up to 390.

### Screen 5: Since 1992
Purpose: trust. Field navy section. Left cols 1 to 6: the workshop photo (1024x768 at native max). Right cols 7 to 12: "1992" in Bitter 700 at 120 px in canvas white, the founder line in Bitter italic h3, then two paragraphs: Henry and Viola Nixon's hotel upholstery (The Montague, The British Colonial, The Royal Victorian), Kirk Nixon in Abaco, seminars in North and South America. Phone: photo first, then text.

### Screen 6: Visit or message
Purpose: the close. Big h2 "Bring a photo to Raphia Close, or send it." Left: address block (Raphia Close, Suite 13/14, Airport Industrial Park, P.O. Box SP 62402, Nassau) with "Open in Maps" link; right: WhatsApp (teal button), call, email rows with tabular number. Then the footer with the concept note on photos.

## 5. The core tool: interaction spec
- Inputs: side (house | boat), default house. Job (per side), default Awnings (house) / Isinglass enclosures (boat). Size chips per job kind: house openings "Under 10 ft", "10 to 20 ft", "Over 20 ft", "Not sure"; boats "Under 25 ft", "25 to 40 ft", "Over 40 ft", "Not sure"; upholstery "1 or 2 pieces", "3 to 6 pieces", "More", "Not sure". Default "Not sure". Where: free text, placeholder "e.g. Lyford Cay, Nassau Harbour, Abaco". When: "As soon as I can", "This month", "No rush" (shutters add "Before storm season"). Default "As soon as I can".
- States: no empty state (defaults always produce a valid message). Filled: message updates live. Error: none possible; WhatsApp link always valid. "Loading": photos have a tinted canvas placeholder with fixed aspect ratio.
- Message formula: `Hello Cover Up, I'd like a measure for {job article+name} for my {house|boat}. Rough size: {size}. Where: {where or "I'll tell you"}. Timing: {when}. I can send photos.`
- Animation on job change: the new photo layer unrolls top to bottom (outer translateY -100% to 0, inner +100% to 0, 720 ms) with a scalloped valance strip in canvas teal riding its lower edge and fading as it lands; interruptible (a new choice restarts from the current layer). Side switch: teal underline slides (transform) 320 ms, job list crossfades 160 ms. Chips: 160 ms fill.
- Keyboard: side switch and job list are radio groups (arrow keys move, Space/Enter select), chips are radio groups, all focus-visible with teal ring. Touch: 44 px min targets, horizontal chip row with scroll-snap on phone.
- Hand-off: `https://wa.me/12423590179?text=...`, `tel:+12423590179`, `mailto:rickynix@gmail.com` with the same text.
- Ledger "Ask for a measure for this" sets side+job then scrolls to the tool (smooth, focus moves to the WhatsApp button).
- Numbers: no prices (none sourced). Sizes are the visitor's rough description only.

## 6. Signature details
1. The awning unroll with a scalloped valance edge (radial-gradient scallops) on every photo change.
2. A dashed stitch line (6/5 dash) as the only divider in the ledgers, like a seam.
3. The live message in Bitter italic, the visitor's own sentence, with a tiny "to (242) 359-0179" in tabular figures.
4. The teal underline sliding between House and Boat.
5. "1992" set large on the navy field like a stencil on the workshop truck.

## 7. Photography plan (all from coverupbahamas.com, their own work)
| Photo | Native | Where | Crop | Alt |
|---|---|---|---|---|
| 2011/05/Old-Fortbay-11.jpg | 1280x960 | tool (awnings), house ledger | centre | teal awning with scalloped valance over a terrace |
| 2011/05/Ferry-Enclosures.jpg | 1632x916 | tool (weather curtains), house ledger | centre | ferry deck closed with clear roll-down curtains |
| 2011/05/Covers.jpg | 1632x916 | tool (enclosures), boat ledger | centre | upper deck closed in with a clear window enclosure |
| 2022/11/PHOTO-2022-11-02-19-30-49-1-1024x768.jpg | 1024x768 | tool (upholstery), boat ledger | centre | new cushions in white and sand vinyl |
| 2022/11/PHOTO-2022-11-02-19-30-50-3-768x1024.jpg | 768x1024 | boat ledger (upholstery second), process | centre | white helm seat |
| 2011/05/Small-Boat-Cover.jpg | 1278x720 | tool (covers), boat ledger | centre | centre-console boat under a fitted navy cover |
| 2011/05/Ferry-Seats.jpg | 1632x916 | tool (ferry seating), boat ledger | centre | navy ferry bench seats |
| 2022/11/PHOTO-2022-11-02-19-49-21-1.jpg | 768x1024 | process beat 2 | centre | patterns cut on the table |
| 2022/11/PHOTO-2022-11-02-19-30-53-1-768x1024.jpg | 768x1024 | process beat 3 | centre | sewing white vinyl |
| 2022/11/PHOTO-2022-11-01-14-05-00-3-1024x768.jpg | 1024x768 | family | centre | the workshop door and truck |
Every img carries width/height = native, frames capped with max-width = native width. One grade: none applied (their photos as shot), framed on the canvas surface.

## 8. Self-review
- Screen 1 sells the product (their awning photo is the largest element) and the whole job (side, job, three answers, send) is completed without scrolling on desktop; on phone the send button is fixed at the bottom.
- A1 no badges. A2 no "Phone:" labels. A3 italic only for the founder's line and the visitor's message. A4 no mono. A5 tokens above, used only. A6 their real jobs shown. A7 the tool+photo is the largest thing on screen 1. A8 grouping by spacing, hairlines only in lists. A9 headlines specific ("cut and sewn in Nassau", "Raphia Close"). A10 one teal button per screen. A11 teal only on the action/active marker. A12 no icons (text only), WhatsApp named in words. A13 no gradients except the scallop shape. A14 radii 2 px throughout. A15 muted 7:1, white on teal 5.6:1, text on navy field > 10:1. A16 balance/pretty on, check 390 widows. A17 tab underline optically under the baseline. A18 tabular on phone numbers and 1992. A19 tinted placeholders with aspect ratios. A20 the unroll explains "this is the new job you picked".
- Needs care: screen 1 height at 1440x900 (keep the job list compact: 22 px rows at 44 px); type-only stage for jobs without photos must look intentional (canvas plate, big type).
- Unmistakably Cover Up: their own canopy teal, their own job photos, the address on the bar, the 1992 stencil. Unlike other repo sites: slab serif, canvas ground, a chooser-led hero rather than a booking strip or a map.
