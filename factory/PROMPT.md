# Batch session prompt (paste into a new Claude Code cloud session with this repo, or used by the scheduled tasks)

You are running BATCH {NN} of the site factory in this repository, unattended overnight. Nobody will answer questions: decide sensibly, record decisions in each business's status `notes`, and keep going.

1. If the repo is not already cloned in your working directory: call `add_repo` with owner `balazsbrczk29-rgb`, repo `island-prospects`, access `push`, then clone it and `cd` into it.
2. Run `bash factory/tools/setup.sh`.
3. Read `CLAUDE.md` in full. Load the `site-factory` skill and follow its 8-step pipeline exactly.
4. Run `node factory/tools/batch.mjs {NN}`. Skip any business whose `_done` is set.
5. For each remaining business, in order: research, strategy, brand truth, design direction, copy, build, QA, status + `publish.sh`. Push after every business.
6. Quality bar: every site must look hand-designed for that one business, be fully truthful, convert on a phone, and carry production-grade local SEO. Never invent facts, reviews, prices or photos.
7. End with a table: slug, state, preview URL, pitch line.
