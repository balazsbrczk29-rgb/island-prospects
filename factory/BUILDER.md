You are building ONE concept website in the repo balazsbrczk29-rgb/island-prospects (your working directory is a git worktree of it). Business: the business. Balazs (the owner of the project) is live and waiting for results. Work autonomously and record decisions in the business's status notes.

## Direction for this site
The orchestrator's note. Then:
Real-time 3D is the premium tier. Use it only if it truly explains this business's product (see craft-checklist D); otherwise wow with photography, type, layout, PhotoDepth, scroll film and motion. Every site must be an absolute jaw-dropper for the owner and perfectly smooth on a phone (no lag, no layout shift).

## Read first (in this order, nothing else up front)
1. `CLAUDE.md`: the hard rules. Truth only, concept label, noindex, the stack, no em dashes. Never open another business's site source (this business's own old source is fine). Never use WebFetch.
2. The guides:
   - `.claude/skills/site-factory/SKILL.md`
   - `.claude/skills/site-playbooks/SKILL.md` and your playbook (`playbooks/<type>.md`)
   - `.claude/skills/art-director/SKILL.md`
   - **`.claude/skills/art-director/references/craft-checklist.md`**: apply ALL of it (polish pass, performance, vocabulary, 3D tier, React Bits rules).
3. This business's `factory/briefs/<slug>.md`, `factory/audit/<slug>.json` and `factory/status/<slug>.json`. The audit is null: audit it first (`factory/AUDIT.md`, about 2 Firecrawl calls).

## Environment facts (learned the hard way, save yourself time)
- Run `bash factory/tools/setup.sh` first.
- **Blocked network.** The sandbox blocks most outside hosts: `look.mjs`, Google Fonts, Wikimedia and lovable.app images don't load here (npm and GitHub do). Write "BLIND" in the status notes.
- **Fonts.** Self-host: `npm pack @fontsource-variable/<family>` (or `@fontsource/<family>`) in a scratch dir, then copy the latin woff2 files into `factory/web/sites/<slug>/src/fonts/`. Never use a Google Fonts `<link>`.
- **Research.** Use `mcp__Firecrawl__firecrawl_scrape` (formats ["markdown","links","images"]) and `firecrawl_search`. Their own photo URLs are the best imagery: hotlink them.
- **Seeing photos.** Lovable workspace daQesEM9Br73deJHgggx. Check `mcp__Lovable__list_projects` for an existing `ip-assets-<slug>` gallery first. `mcp__Lovable__get_project` returns a screenshot image of a gallery project even while the network is blocked. Use a gallery project to view their own photos or generated ones (one project, at most two rounds). Then crop the thumbnails and serve the crops to Playwright via `page.route`, so your QA screenshots show real photos.
- **Screenshots.** Playwright is preinstalled (`createRequire('<repo>/factory/tools/')('playwright')`). For WebGL, launch with args ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']. Abort non-local requests unless you fulfil them from crops.
- **Motion.** Use function transforms (`useTransform(p, v => ...)`), never the range form, and never setState per scroll frame.
- **Fingerprints.** distinct.mjs rewrites other sites' fingerprint files; revert those before committing.
- **Critic.** You cannot spawn subagents. Do an honest self-critique against art-director section 7 and the checklist instead. An independent critic is run by the orchestrator after you report.

## What the critic rejected in the last wave (avoid these from the start; it saves a whole fix pass)
- The big idea must be ON the first screen, delivered for real (if you promise a film, a journey or an object study, build it with motion; a still plus a numbered list is not it). One hero, not two.
- No alternating photo-left/photo-right rows, no card grids, no three equal columns, no empty column or quadrant, no side column that ends.
- Never show a photo larger than its source resolution (soft upscaled photos cost a full point). Small sources go in smaller, intentional frames. One consistent grade across the set. Lead with the photo where faces or the product read.
- Never ship empty image boxes: a real photo you have seen, or no image.
- One primary CTA style per screen; the main feature (finder, planner, booking strip) is the largest thing on its screen, its result visible without scrolling.
- Phones: headline + primary CTA inside the first 844 px; nothing under the concept label or a fixed bar (hide your bar on the first screen and over the contact block; lift things with --concept-offset or padding).
- Specific headlines built from sourced facts; one business name spelling everywhere (the one on their logo); no widows; tabular figures for prices, times and phones; no decorative mono; no tracked uppercase eyebrows.
- Stitched full-page screenshots: use real scroll positions and crop the clamped last viewport, so nothing appears twice.
- Speed: run distinct.mjs once at the end with a 10 minute timeout; do not chain shell commands (the worktree guard refuses them; use script files).
- Same kind of site as they have now (webshop stays a shop, informative stays informative, a landing page stays one page). Conversion first: the route to enquire, book or buy is obvious on every screen.

## Steps (two phases: the design is approved BEFORE the full build)
**Phase 1: plan and hero (then stop and report)**
1. `node factory/tools/batch.mjs claim <slug>`. If it prints SKIP, stop and report.
2. Audit, then research gaps and photos (at most about 8 calls). See every photo you will use (Lovable gallery screenshot).
3. In `factory/briefs/<slug>.md`, write the **design plan**:
   - the big idea in one sentence;
   - the direction (`direction.mjs --options`, then `--set`) and why;
   - fonts;
   - the photo set, with source sizes, so no photo is shown larger than its source;
   - the storyboard: one line per screen, plus the first 3 phone screens;
   - the conversion path;
   - the tier;
   - how it differs from competitors in this repo.
4. Build ONLY the header and first screen to finished quality. Screenshot it at desktop 1440x900 and phone 390x844 with real photo crops, under /tmp/shots/<slug>/plan-*.png.
5. **Report the plan.** Send the brief path, the two screenshot paths and a 150-word summary. Then wait for the orchestrator's verdict. It replies "approved" or "revise: ...". Revise once if asked.

**Phase 2: build to the approved plan (only after "approved")**
6. Build the rest exactly as the approved storyboard. No new ideas mid-build.
7. Verify:
   - `qa.mjs` and `interact.mjs`, then `distinct.mjs` once with a 10 minute timeout;
   - the craft checklist A and B, item by item.
   Fix every blocker. Then take a stitched desktop and phone capture and look at every screen yourself against the storyboard.
8. Write the status JSON (site-factory step 8, plus `"tier_visual"` and `"plan_gate": {scores}` from the verdict). Use state "built". Then publish to main: commit only this business's paths, `git pull --rebase origin main && git push origin HEAD:main`, retrying on conflicts. The site's URL then serves the new version.

## Report back (under 250 words)
- Big idea, direction and fonts.
- The tier, and why.
- Photo sources.
- Your self-scores.
- Guideline friction.
- ABSOLUTE paths of these screenshots, all with photos routed in: desktop hero, phone hero, full desktop page (stitched viewport captures), full phone page, and any inner page.
You may then be asked to do up to two fix passes from the critic.
