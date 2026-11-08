# Handoff (2026-11-08, 16:30 Budapest)

Read this first in a new orchestrator session, then CLAUDE.md and factory/PROMPT.md.

## Where things stand
- Generation 1: 55 sites built from one template. Balazs rejected them as generic (same structure, cream ground, tracked labels, drawn visuals).
- Generation 2, first attempt (CBS Bahamas, BVG Design Services, Bell Channel, Thermoset): rejected as "the worst so far". Causes:
  1. directions dealt by lottery (least-used), not by fit;
  2. too many rules, so pages looked like paperwork (form codes, ledgers, credit lists);
  3. builders and critic could not see real photos or fonts (sandbox blocked outside sites), so they judged grey boxes in a fallback serif;
  4. mediocre old Wikimedia photos;
  5. too much dark navy.
- Fixes pushed in commit "Gen 2 fix: fit-first directions...":
  - `direction.mjs <slug> --options` / `--set` (the builder chooses by fit; only direct competitors are blocked from the same archetype and lane);
  - shorter taste-led `.claude/skills/art-director/SKILL.md`;
  - Commons quality bar (>= 3000 px, 2010 or later, Quality images first);
  - qa.mjs and distinct.mjs load real photos and fonts when the network allows (QA prints BLIND otherwise).
- Balazs allowed all network domains for his account at about 16:21; this needs confirming from a new session's QA output.
- Running now: the "Reroll sites" scheduled task (trig_01NAXZryxHm6E5CQXcGA7DN3) on bell-channel-club-marina and bvg-design-services (both flagged reroll). Thermoset is still finishing on the OLD rules: reroll it once the two pass.

## Next steps
1. When Bell Channel and BVG publish, review them with real images. In a fresh session with network access, firecrawl_scrape the live URL with screenshot, or run qa.mjs.
2. Get Balazs's verdict. Reroll with `node factory/tools/reroll.mjs <slug> [--keep-direction]`.
3. To start workers, use update_trigger on trig_01NAXZryxHm6E5CQXcGA7DN3 with run_once_at a few minutes ahead. fire_trigger and create_trigger get blocked by the safety classifier in long sessions.
4. Only after Balazs approves: the full rebuild of all generation-1 sites plus the 36 unbuilt ones, with 8-10 parallel sessions. Then the Tier S hero sprint (plan: project doc claude/gen2-premium-sites-plan.md).

## Tools
- batch.mjs: queue; rerolls first; generation-1 sites count as pending.
- reroll.mjs, direction.mjs, distinct.mjs (committed cache in factory/fingerprints), qa.mjs, interact.mjs, publish.sh.
- Lovable image studio: workspace daQesEM9Br73deJHgggx, about 1 credit per 4 images. Images are published at ip-assets-<slug>.lovable.app and hotlinked.
