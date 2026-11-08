# Master prompt: Bahamas website concept factory, generation 2

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
- led by photographs of the real place and trade, never drawings;
- unlike any competitor's site in this repo (owners on a small island compare);
- 100% truthful, converting on a phone, SEO-ready.

## Read once, in this order (nothing else up front)
1. `CLAUDE.md`: the hard rules.
2. `.claude/skills/site-factory/SKILL.md`: the order of work.
3. `.claude/skills/art-director/SKILL.md`: every design decision. Its references only for your chosen entries.
4. `factory/AUDIT.md`: what your site-audit row means.
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
3. Buyer portrait and brand truth. Sitemap from `concept_type`.
4. LOOK: `node factory/tools/look.mjs` on their current site and two reference sites; read the screenshots.
5. Choose the direction: `direction.mjs <slug> --options`, then `--set`.
6. Photographs: own, excellent Commons, and a Lovable asset project (workspace daQesEM9Br73deJHgggx, start early with wait false; skip Lovable if a tool is missing or it asks for input).
7. Copy, then build the first screen and pass the hero gate before building the rest.
8. qa.mjs (note any BLIND line), interact.mjs, distinct.mjs, critic subagent; every score 4 or more; at most two fix passes.
9. Status JSON, publish.

Never use the WebFetch tool. Never open another business's site source. No em dashes in copy.

## Finish
When the queue is empty or budget ends: a table of slug, concept type, direction, critic scores,
preview URL `https://balazsbrczk29-rgb.github.io/island-prospects/<slug>/`, pitch line, assumptions to confirm,
and any pipeline problem you hit.
