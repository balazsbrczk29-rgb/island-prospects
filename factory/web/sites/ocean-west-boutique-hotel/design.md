# Ocean West Boutique Hotel: design.md (job spec approved 2026-11-22, builds on the gen-2 room register)

## 1. The idea in one paragraph
Ten rooms named for stones sit in a fixed register on the left like a jeweller's tray. On screen 1 the visitor filters the tray (ocean view, balcony, king bed), touches a stone's name, and that room's own photograph opens on the conch-pink stage beside it with its bed, floor and view, plus "Check dates for Emerald" (their innRoad engine) and "Ask about Emerald" (a prefilled email). The price range and "five minutes from the airport" sit under the headline, so the three things a visitor must decide (which room, what it costs, how close the airport is) are answered before any scroll.

## 2. Inspirations
- **Cartier / Van Cleef & Arpels collection pages:** a column of engraved names, the piece appearing on a soft field when a name is touched. We take: the register as an index, Didone names, the photo on a single tinted field.
- **Aesop store locator:** a quiet typographic list with filters that dim rather than hide. We take: filters that fade non-matching stones to 30 % and keep the order stable.
- **Hotel Le Sirenuse room pages:** each room a name, a photo and three facts. We take: the comparison list of ten rows with bed, floor, view, balcony and one link each.
- Playbook (hospitality-stay): booking engine one tap away everywhere, policies in plain words.

## 3. Tokens
**Type.** Prata 400 (display: gem names, headlines; a Didone that reads like a jeweller's engraving) + Jost variable 300 to 700 (facts, UI; geometric sans, clean against the Didone). Self-hosted woff2. Spaced small caps (Jost 12 px, 0.2em, uppercase) are part of this type system (T09 Didone fashion) and used only for micro-labels.
Scale: label 12 / caption 14 / small 16 / body 18 / lead 22 / h3 30 / h2 clamp(38, 4.4vw, 67) / register names clamp(22, 1.95vw, 30) / h1 clamp(37, 3.45vw, 53). Display leading 1.02 to 1.05, tracking -0.01em.

**Colour (OKLCH; written in CSS as sRGB hex for the inspect tool).**
- ground shell `oklch(97.1% 0.013 49)` #fdf3ee
- field conch `oklch(86.9% 0.048 32)` #f2c9c0 (the stage only); conch-2 `oklch(91.7% 0.030 35)` #f7ddd6 (Days band)
- ink `oklch(27.3% 0.044 18)` #3a1e1f; muted `oklch(48.4% 0.044 23)` #765553 (6.2:1 on shell); line `oklch(88.4% 0.030 44)` #ebd3c9
- accent deep pink `oklch(54% 0.121 9)` #a84d60, hover `oklch(46.5% 0.113 8)`: Check dates buttons, the selected stone, room links only
- secondary shutter green `oklch(44.7% 0.053 188)` #2e5e5a: quiet text links
- one ink band: Getting here (shell text on ink)

**Space.** 4/8 scale; section padding clamp(72, 10vw, 140); pad clamp(20, 3.3vw, 48); index column clamp(360, 34vw, 500); content measure 920 max, text 68ch.
**Shape.** Square corners everywhere (engraved, architectural); 1 px lines; no shadows.
**Motion.** ease cubic-bezier(.22,1,.36,1). Stage photo crossfade 700 ms with 1.015 to 1 settle; selected-stone rule scales in 300 ms; filter dim 300 ms; compare rows highlight 200 ms. Reduced motion: instant swaps.

## 4. Screens
### 1. The register and the stage (core tool)
- Desktop 1440x900: left column (sticky, full height): wordmark, micro-label "Ten rooms on West Bay Street, Nassau", h1 "Seventy feet above the sea.", facts line "$215 to $600 a night · 5 minutes from the airport", filters (All ten, Ocean view, Balcony, King bed) with a count, the ten names (each with floor and view), section links, phone and Check dates. Right: the conch stage, room photo 4:3 at up to 704 x 528 (native 800x600), caption: name (Prata 42), bed · floor · view · outside, and the two actions.
- Phone: wordmark + Check dates; h1; facts line; filters as a scroll row; stage photo full width 4:3 (350 x 263); the ten names as a chip row (non-matching dimmed); caption and actions.
### 2. The ridge: "Lake Killarney to the south. The Atlantic to the north." view-down panorama 1200x535 at max 920; two paragraphs (guests-only access, five minutes to the airport, Cable Beach a few minutes east).
### 3. All ten compared: a typographic table (Room, Bed, Floor, View, Outside, Check dates). Clicking a name selects it on the stage and scrolls there. Phone: each row stacks name / facts / link. Link to rooms.html for all ten photographed.
### 4. Days here (conch-2 band): sunset pool photo 1200x535 at 920, nine amenities as a two-column list.
### 5. Rates and house rules: "From $215 a night.", the rules list, Check dates, card-and-ID note.
### 6. Getting here and contact (ink band): four directions steps, calling card, both phones, email, Check dates, credits and the Travellers' Choice 2023 and Clean and Pristine marks in words.

## 5. Core tool interaction spec
- Inputs: filter (all | ocean | balcony | king), default all; selected room, default none (terrace photo, caption invites a choice).
- Filter: ocean = view starts with "Ocean" (Diamond, Topaz, Emerald, Onyx, Ivory, Pearl, Coral); balcony = Diamond, Topaz, Emerald; king = Diamond, Sapphire, Tanzanite. Non-matching names dim to 30 % and are skipped by keyboard selection; count line "3 rooms with a balcony". If the selected room does not match, the first matching room is selected.
- Hover or focus a name previews it on the stage (desktop); click selects and on phone scrolls nothing (stage is above the chips).
- Result: photo crossfade, caption line, actions: "Check dates for {name}" (innRoad https://oceanwestbahamas.client.innroad.com/, new tab) and "Ask about {name}" (mailto info@oceanwestbahamas.com, subject "{name} room", body asking for dates and guests).
- Keyboard: names are buttons with aria-pressed; filters are a toggle group; stage caption aria-live polite.

## 6. Signature details
1. A hairline deep-pink rule draws in beside the selected stone, like a tray marker.
2. Filters dim stones instead of removing them, so the tray never reshuffles.
3. The stage caption reads like a jeweller's tag: name in Prata, facts in tabular Jost.
4. "Ask about Emerald" writes the room name into the email subject.
5. The comparison table's names select the room on the stage.

## 7. Photography (oceanwestbahamas.com, warm daylight, no grading)
| image | native | where | shown max | alt |
|---|---|---|---|---|
| images/1a.jpg terrace | 1200x535 | stage default (cover 4:3) | 704x528 | terrace, columns, pool and sea |
| gallery/*.jpg ten rooms | 800x600 (Emerald 800x588) | stage, rooms.html | 704x528 / 800 | per room in data.ts |
| images/1.jpg view down | 1200x535 | ridge | 920x410 | view down to pool, roofs and sea |
| images/4.jpg sunset pool | 1200x535 | days | 920x410 | pool terrace at sunset |
Note: the terrace default is cropped from 1200x535 to 4:3 at 704x528, i.e. scaled to 1184 wide source-equivalent: below native height 535 (528). OK.

## 8. Self-review
- Screen 1 answers room, price and airport, and Check dates is one tap: yes, desktop and phone.
- A1 one idea (the jewel tray) yes; A2 two faces yes; A3 scale defined; A4 display tracking -0.01em (Didone needs little); A5 measure 68ch; A6 tabular numbers for rates, floors, phones, steps; A7 contrast: muted 6.2:1 on shell, check muted on conch stage (care); A8 one accent (deep pink) for actions only, shutter green for quiet links; A9 4/8 spacing; A10 left column aligned to pad; A11 photos at or below native; A12 no overlays; A13 credits in footer; A14 44 px targets (filters need min-h 44, care); A15 focus outline; A16 reduced motion; A17 stage has fixed 4:3 box, caption min-height (no shift); A18 phone: no pinning, native scroll; A19 facts sourced, no em dashes; A20 close: rates then calling card with Check dates.
- Unmistakably Ocean West: the gem names are theirs, the pink house is theirs; no other site in the repo uses a catalogue-index register.

## 9. Changes after the critic (round 1)
- Hover previews a stone on the stage without committing it; leaving the tray restores the chosen room; room photos preload when idle.
- Choosing a dimmed stone clears the filter first; any filter selects its first matching room; the phone chip row scrolls to the first match.
- The stage opens on Diamond (the product, not the terrace), the photo sits in a shell-white "jewel case" mat with a "No. 5 of 10" tag, the room name is an h2, the stage top padding is reduced.
- Register rows are 44 px tall with names that clear the rules; section links hide below 820 px of height.
- Phone: a visible h1, tighter header so Check dates for the room is above the fold.
- Facts trimmed to the brief (no "guests-only access", no casino, in-room list limited to fridge and microwave); "Travelers' Choice" spelled as theirs and shown with Clean and Pristine as their own row; a directions link to the hotel's map pin.
- Two h1 elements in the DOM, one per layout (the other is display:none): inspect WARN accepted.
