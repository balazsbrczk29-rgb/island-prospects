# The guide (Nov 21): purpose first, then design

This is the one document that decides how a site is built. Where any skill, playbook, archetype or checklist
disagrees with it, this guide wins. The other documents are toolboxes you open when you need them.

## 1. Why the last rounds disappointed Balazs
Sites were designed around a style and a clever metaphor, then the business's service was fitted in:
- Orange Creek as a letter.
- Cheryl's as a name card.
- Pigeon Cay as a bar tab.

Rebuilds also threw away what the previous version did well, such as Abaco's delivery chart and cost builder and Anna's composition.
The critic graded looks, not whether the site does its job better. **Never again: the job comes first, and the style serves it.**

## 2. The job spec (written before anything else, approved by Balazs before building)
Every business has `factory/jobspecs/<slug>.md`, using the template in `factory/jobspecs/_template.md`.
It answers, from real research:
1. **The one job.** The single action that makes the business money. Examples: "book a cottage for your dates", "plan and book a boat for your week", "request your wedding date and package".
2. **The visitor.** Who arrives, from where, on what device, and what they need to decide.
3. **The product.** What exactly must be seen and compared: the eight cottages and their tiers, the boat and its rates, the packages and prices, the tours, the place.
4. **The core tool.** The interactive heart of the site that does the job. It is the site's hero, not a section near the bottom. Examples: the booking strip with tier comparison, the map planner showing how far your days and money go, the package finder. Use real-time 3D, maps or anything immersive whenever it serves this tool. Nothing that serves the job is "premium only".
5. **Keep.** Everything that works on their current site (booking engine, prices, policies) and everything that worked in our previous version. You may open THIS business's own previous source in `factory/web/sites/<slug>/` and its git history. Improve these things; never silently drop them.
6. **Fix.** What fails today, for the pitch.
7. **Screens.** The page, screen by screen. Screen 1 shows the product and the core tool. Every later screen helps the visitor decide or act.
8. **Look and feel.** Only now: the mood that suits this business's real customers, type, palette, photography plan, the wow moment. The wow must make the product or the place unforgettable, not decorate it.

**Balazs approves job specs in batches.** A spec's first line reads `Status: approved` (or `Status: draft`). Workers build only approved specs. `batch.mjs pending` lists only those.

## 3. Building to the spec
**The benchmark (Balazs, Nov 22):** the first five job-spec sites set the bar: Pigeon Cay, Cheryl's, Orange Creek, Anna's and Abaco. What they share:
- The product and a working core tool on screen 1.
- The business's own photos, framed at their native size.
- One serif paired with one clean sans.
- Generous space.
- A single accent colour reserved for the primary action.
- Prices and policies written in plain words.
- A strong close that converts.

Match that level, but every site gets its own individual design: its own type, palette, imagery and core tool. Do not open or screenshot those sites; this description is enough.

- Build screen 1 first: the product and the core tool, working and beautiful. Then the rest, exactly as the spec says.
- Start from the previous version when the spec says to keep it. Refactor and elevate it; don't rewrite for the sake of rewriting.
- Craft polish follows `art-director/references/craft-checklist.md` (A and B): spacing, type, contrast, tabular numbers, phone smoothness.
- Hard rules stay: CLAUDE.md (truth only, concept label, noindex, no em dashes, the stack).

## 3b. Quality by construction (Nov 22). The site is generated to 10/10 standard, not repaired into it.
Overrides every other document.
1. **design.md before code.** After reading the spec, write `factory/web/sites/<slug>/design.md` from `factory/DESIGN-TEMPLATE.md`, completely and exactly. Include:
   - the idea and named inspirations;
   - tokens in OKLCH with the type scale, spacing and motion;
   - every screen on desktop and phone;
   - the core tool's interaction spec with its states and formulas;
   - 3 to 6 signature details;
   - the photography plan with native sizes;
   - a written self-review against craft checklist A1 to A20.

   Fix every weak answer in the self-review before writing any code. Push it as a WIP checkpoint.
2. **Generate from it.** Tokens first, as CSS variables in styles.css. Then the core tool as a real, working component. Then each screen exactly as design.md says.
   - Use the skills as toolboxes, grep-ing only the exact section you need: art-director craft-checklist, the site-playbooks recipes (map, 3D, scroll stage, enquiry), emil-design-eng, animate, apple-design, and React Bits only through the craft-checklist E rules.
   - Write each component in one go.
3. **See the page as text, not pictures.** Run `node factory/tools/inspect.mjs <slug> [page]`. It prints:
   - a screen-by-screen layout outline for desktop and phone (positions, type sizes, fonts, colours, images against their native size, CTAs, controls);
   - automatic craft checks (contrast, upscaled photos, tap targets, tabular numbers, balanced headings, line length, em dashes, overflow, label and noindex).

   Iterate until it reports 0 FAIL and every WARN is fixed or justified. Compare the outline against design.md screen by screen. Read your own source when something is unclear.
4. **Then at most 2 images.** One desktop and one phone first-screen JPEG (device scale 1, quality 60), only to judge the overall impression.
5. **No new research** unless the spec lacks a needed fact (at most 2 calls). Use the photo URLs from the spec or brief. Don't browse galleries. Pipe tool output through `tail`.
6. **Independent critic, cheap.** Spawn ONE fresh critic subagent. Give it:
   - the paths to the job spec, design.md and the source folder;
   - the inspect.mjs output (saved to /tmp/shots/<slug>/inspect.txt);
   - the 2 JPEGs.

   It judges the page from the code and the outline as much as from the pictures, and may read any source file. It answers GUIDE section 4: gate 1 purpose, then gate 2 scores, with concrete fixes. Apply them, re-run inspect.mjs, and give it one re-score. Publish only when gate 1 passes and every gate 2 score is 4 or higher. Aim for 5.

## 4. The check (the critic sees old and new side by side)
The critic (3b.6) gets the job spec, design.md, the source, the inspect.mjs outline and craft report, the 2 JPEGs, and the previous version's source and Keep list.
Gate 1 must pass before style is even scored. Answer each with yes or no:
1. Does screen 1 show the product and put the core tool in reach?
2. Is the one job easier than on their current site and on our previous version?
3. Is everything in "Keep" present and better?

Gate 2 scores 1-5: wow, photography, typography, composition, conversion clarity, phone. Every score must be 4 or higher.
If gate 1 fails, the site is not published. Fix it, or keep the previous version live.
