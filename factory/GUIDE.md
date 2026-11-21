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
- Build screen 1 first: the product and the core tool, working and beautiful. Then the rest, exactly as the spec says.
- Start from the previous version when the spec says to keep it. Refactor and elevate it; don't rewrite for the sake of rewriting.
- Craft polish follows `art-director/references/craft-checklist.md` (A and B): spacing, type, contrast, tabular numbers, phone smoothness.
- Hard rules stay: CLAUDE.md (truth only, concept label, noindex, no em dashes, the stack).

## 4. The check (the critic sees old and new side by side)
The critic gets: the job spec, screenshots of the PREVIOUS version, screenshots of the NEW version, and a note on how the core tool behaves (what happens when you use it).
Gate 1 must pass before style is even scored. Answer each with yes or no:
1. Does screen 1 show the product and put the core tool in reach?
2. Is the one job easier than on their current site and on our previous version?
3. Is everything in "Keep" present and better?

Gate 2 scores 1-5: wow, photography, typography, composition, conversion clarity, phone. Every score must be 4 or higher.
If gate 1 fails, the site is not published. Fix it, or keep the previous version live.
