# Master prompt: Bahamas website concept factory, generation 2

## FIRST: factory/GUIDE.md is the authority (Nov 21)
Build only businesses whose job spec (`factory/jobspecs/<slug>.md`) says `Status: approved`; `batch.mjs pending` lists only those.
Follow GUIDE.md sections 2 to 4 instead of the plan gate below:
- Build to the spec: the core tool is the hero, and everything under "Keep" is kept and elevated.
- Screenshot the previous version before you change anything, then run the side-by-side critic (gate 1 purpose, gate 2 craft).
- Publish only if gate 1 passes. On publish, set `"jobspec_built": true` in the status.
- factory/PAUSE stops all claims.
- **When no approved spec is pending:** draft job specs (`Status: draft`, using `factory/jobspecs/_template.md`) for the next 5 businesses in priority order (small and easy first; skip huge webshops and enterprises).
  - Use their audit, brief and current site (at most ~3 research calls each).
  - Push the drafts, notify Balazs to review them, then end the run.
  - Never build a draft.

## Parallel workers (the scheduled "Site worker 1/2/3/4" tasks run THIS section)
Each scheduled worker is its own chat. It builds one business at a time, start to finish, and goes straight to the next with no gap, until the queue is empty or the account usage limit stops it. Four workers fire on staggered schedules. A worker that finds 4 or more live claims exits immediately, so at most four build at once and a crashed or limited worker is replaced at the next firing.
1. Run `bash factory/tools/setup.sh` and `git pull --rebase origin main`. If `node factory/tools/batch.mjs active` prints 4 or more, end the run at once with no notification.
2. **Loop:**
   - **Waiting sites first:** if `batch.mjs review` lists a slug, set `review_claimed_at` in its status, push it, then do the final check. Capture screenshots of its build with photo crops routed in, run ONE fresh critic subagent with `factory/CRITIC.md` mode 2, apply at most one fix pass, set "built" if every line scores 4 or higher, and push.
   - **Otherwise build:** take the first slug from `batch.mjs pending 3` and claim it. If it prints SKIP, take the next one. Follow `factory/BUILDER.md` yourself, in this session, in your working directory.
     - At the phase-1 point, spawn ONE fresh critic subagent with `factory/CRITIC.md` mode 1 (the plan gate), giving it the brief path and the two first-screen PNGs. Apply its verdict (one revision at most), then do phase 2 and publish to main as "built".
     - Pull before each claim and push after each site, so the live link is replaced immediately.
   - Repeat at once with the next business. Never stop between sites.
3. Keep context lean so the loop can run many sites in one chat: don't re-read the skills for every site (read them once), keep tool outputs short, and look only at the screenshots you need.
4. **Nothing is ever lost (checkpoints).** Work in progress is pushed to a branch named `wip/<slug>`, never to main, so the live site is untouched until the site is finished. Push it at each of these points:
   - right after the design plan is written;
   - right after the plan gate verdict;
   - after the first screen is built;
   - every ~15 minutes of building.

   Each checkpoint commits only this business's paths, then runs `git push -f origin HEAD:wip/<slug>`. Doing it at least every 15 minutes means a usage limit costs at most 15 minutes of work.

   **Before claiming,** check `git ls-remote origin "refs/heads/wip/*"`. If a WIP branch exists for a business whose claim is stale (or about to be yours), claim it and resume from it: `git fetch origin wip/<slug>` and `git checkout origin/wip/<slug> -- factory/web/sites/<slug> factory/briefs/<slug>.md factory/status/<slug>.json factory/directions/<slug>.json factory/audit/<slug>.json`. Read the brief and the plan-gate verdict in the status notes, then continue from the last finished step instead of starting over. Resuming WIP comes before any new business.

   After publishing to main, delete the branch with `git push origin --delete wip/<slug>`.
5. If you hit a usage limit (HTTP 429), stop cleanly. Push a WIP checkpoint first if you can. Everything published is saved, your WIP is on its branch, and your claim expires and returns to the queue with its WIP.

## Continuous orchestrator (the scheduled "Site factory worker" runs THIS section)
Goal: a mass remodel of nearly every site in the repo to the generation-2 standard. Building is constant with no gaps. Easy businesses come first, and every site stays the same kind of site the business already has. Quality is **guaranteed up front by a plan gate, not repaired at the end.**
Every run is an orchestrator session: builders do the work, and critics judge it.
1. Run `bash factory/tools/setup.sh` and `git pull --rebase origin main`. Note the start time (`date +%s`).
2. **Waiting sites first.** For each slug from `node factory/tools/batch.mjs review`:
   - Set `review_claimed_at` in its status.
   - Capture desktop and phone screenshots of its build (hero plus stitched page, with photo crops routed in).
   - Run ONE critic in `factory/CRITIC.md` mode 2.
   - All lines 4 or higher: set state to "built". Otherwise apply one fix pass, either yourself or through a builder subagent, then re-score once. Still below 4: leave "needs-review" with the reason.
   - Push to main.
3. **Build loop with a plan gate.** Keep THREE builder subagents running at all times (`Agent`, `isolation: "worktree"`, `run_in_background: true`).
   - Brief each builder: "Read factory/BUILDER.md and follow it exactly. Business: <slug>. Playbook: <type>. Direction note: <one paragraph: what kind of site they have now (audit), the buyer, the tier (standard unless 3D truly explains the product), and which sites in this repo it must not resemble>."
   - Take businesses from `node factory/tools/batch.mjs pending 6`.
   - When a builder reports its **plan** (phase 1): run a fresh critic in CRITIC.md mode 1 on the plan and the first-screen screenshots. Send the verdict back to the same builder with SendMessage: "approved" plus the predicted scores, or "revise: ..." (one revision, then approve or skip).
   - When a builder reports **done** (phase 2): it has already published as "built". Start the next builder immediately.
   - A full-site critic runs only if QA reported problems.
   - Never leave a slot idle while the queue has work.
4. **Time box.** Start no new builder after 40 minutes. Finish the plan gates and builds already running, then end with a short table (slug, state, scores, URL). The hourly schedule starts the next run.
5. **Usage limit.** On an account usage limit (HTTP 429), stop cleanly. Published work is saved. Unfinished claims expire after 2.5 h and return to the queue.
6. **Skip.** Huge webshops (audit priority C with large catalogues), enterprises and government (D), and businesses whose audit shows a strong modern site come last, or are skipped with a reason. Businesses with no site, a lost domain or a weak site come first.


Paste everything below the line into a Claude Code cloud session on **balazsbrczk29-rgb/island-prospects**,
or use it as a scheduled task prompt. Several sessions can run in parallel: they share one queue.

---

You are running the website concept factory in this repository, unattended. Nobody will answer
questions; take the most reasonable reading, record decisions in the business's status `notes`, and keep going.

## Mission
For Bahamian businesses in `factory/data/prospects.json`, build concept preview websites that Balazs
(ESTATIQ AI Solutions) shows the owner to win a $500 to $1,000+ rebuild. Each one must be:
- work a top studio would put in its portfolio, for this business's real buyer;
- the same kind of site as the business really needs (a shop stays a shop, a booking site keeps booking), far better than what they have;
- built around ONE big idea about the business's real world, executed so the owner has never seen anything like it
  (often immersive: a photoreal scene, a living photograph, film, a real object in 3D; sometimes pure typography);
- unlike any competitor's site in this repo (owners on a small island compare);
- 100% truthful, converting on a phone, SEO-ready.

## Read once, in this order (nothing else up front)
1. `CLAUDE.md`: the hard rules.
2. `.claude/skills/site-factory/SKILL.md`: the order of work.
3. `.claude/skills/site-playbooks/SKILL.md`: what we make and why, the recipes, and which playbook is yours. Then your one playbook.
4. `.claude/skills/art-director/SKILL.md`: design judgment and verification. Its references only for your chosen entries.
5. `factory/AUDIT.md`: what your site-audit row means.
Run `bash factory/tools/setup.sh` once.

## The queue
```
node factory/tools/batch.mjs pending 6       # next businesses: rerolls first, then audit priority A, B, C, D
node factory/tools/batch.mjs claim <slug>    # right before starting; SKIP means move on
```
Publish after every business: `bash factory/tools/publish.sh <slug>`, confirm `PUBLISHED`.

## Per business (detail in the two skills)
1. Claim. Read the site-audit row and the brief. Audit first if the row is empty.
2. Research only what is missing (rebuild about 6 calls, new about 12) plus imagery.
3. Buyer portrait and brand truth. Sitemap from `concept_type`. Your playbook, then the big idea in one sentence.
4. LOOK: `node factory/tools/look.mjs` on their current site and two reference sites; read the screenshots.
5. Choose the direction: `direction.mjs <slug> --options`, then `--set`.
6. Assets for the idea (the recipes in site-playbooks/recipes; photographs as the idea needs): own, excellent Commons, and a Lovable asset project (workspace daQesEM9Br73deJHgggx, start early with wait false; skip Lovable if a tool is missing or it asks for input).
7. Copy, then build the first screen and pass the hero gate before building the rest.
8. qa.mjs (note any BLIND line), interact.mjs, distinct.mjs, critic subagent; every score 4 or more; at most two fix passes.
9. Status JSON, publish.

Never use the WebFetch tool. Never open another business's site source. No em dashes in copy.

## Finish
When the queue is empty or budget ends: a table of slug, concept type, direction, critic scores,
preview URL `https://balazsbrczk29-rgb.github.io/island-prospects/<slug>/`, pitch line, assumptions to confirm,
and any pipeline problem you hit.
