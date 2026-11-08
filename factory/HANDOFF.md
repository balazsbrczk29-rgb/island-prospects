# Handoff (2026-11-08, evening)

For a new orchestrator session: read this, then CLAUDE.md, factory/PROMPT.md, the site-factory and
art-director skills, and factory/AUDIT.md. Everything else is reference.

## History in one paragraph
Generation 1 built 55 sites from one copied template. They were generic: same structure, cream ground,
tracked labels, drawn visuals. The first generation-2 attempt was rejected as worse:
- directions were dealt by lottery;
- pages looked like paperwork;
- builder and critic were blind (no photos or fonts in the sandbox);
- Wikimedia photos were mediocre;
- dark navy was overused;
- businesses with real shops, listings or booking engines got brochures.
The pipeline was then consolidated (Nov 8 evening). The art-director skill's "What went wrong" section is the authority on what never to repeat.

## The pipeline now (single sources of truth)
- `CLAUDE.md`: hard rules.
- `factory/PROMPT.md`: the run brief.
- `.claude/skills/site-factory/SKILL.md`: the order of work.
- `.claude/skills/art-director/SKILL.md`: every design decision. Its references: archetypes, palettes, type-systems, imagery.
- `design-system.md`, `showcase-art-direction.md` and `portfolio-standard.md` were deleted: they contradicted the new rules (they asked for low-poly 3D and SVG scenes).
- `factory/AUDIT.md` + `factory/audit/<slug>.json` (one file per business): what kind of site each business really has, the concept type, what to keep, priority A-D. Only 8 of 77 audited so far.
- Tools:
  - `look.mjs` (screenshot any live page; needs network); `factory/references.md` (reference library, add Balazs picks; capture the screenshots into factory/references/ once);
  - `direction.mjs --options / --set` (fit-first; only direct competitors are blocked);
  - `qa.mjs` and `distinct.mjs` (load real photos and fonts when the network allows; QA prints BLIND otherwise);
  - `batch.mjs` (queue: rerolls, then audit priority);
  - `reroll.mjs`, `publish.sh`, `build-site.mjs`, `interact.mjs`.
- Concept label: now a small floating tag (`assets/concept.css`), not a black bar across every site.

## Open items, in order
0. **Network check.** Balazs allowed all domains around 16:21. In the new session, run `node factory/tools/look.mjs https://www.aesop.com test` and read the PNG. If it fails, ask Balazs to check Settings > Capabilities, because nothing good can be judged blind.
1. **Site audit** for the 69 remaining sites with a URL and the 23 without one (factory/AUDIT.md). Check each classification by looking: automatic extraction called a listings site a webshop. Show Balazs the A list.
2. **Reference taste.** Ask Balazs for 3-5 sites he loves per niche. Save the links in `factory/references.md` and use them as ref1/ref2 in look.mjs.
3. **Pilot with Balazs watching: Bell Channel** (flagged reroll), then BVG. Hero options first, his pick, then the full page. Write down what made it work.
4. **Only after he approves:** scale. Use update_trigger on trig_01NAXZryxHm6E5CQXcGA7DN3 (Reroll sites) or a new worker task with run_once_at a few minutes ahead. fire_trigger and create_trigger were blocked by the safety check in the long session.
5. Thermoset was built on the rejected rules: reroll it. CBS is a real webshop (audit priority C): rebuild it only as a full shop concept, after the A and B businesses. Its failure analysis is in the art-director "What went wrong" and taste rules.

Lovable image studio: workspace daQesEM9Br73deJHgggx, about 1 credit per 4 images. Images are published at ip-assets-<slug>.lovable.app and hotlinked.
