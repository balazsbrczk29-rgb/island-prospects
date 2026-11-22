# Baked roof build-up (AVIF sequences)

The 3D roof scene (`src/RoofScene.tsx`, three.js) is no longer rendered in the visitor's browser. It is rendered
offline, frame by frame, and the page plays the frames on a canvas as you scroll (`src/Sequence.tsx`).

Sets in `public/seq/`:
- `wide-0`: 181 frames, 1920x1200, scroll progress 0 to 1 (desktop and landscape), plus `anchors.json` for the leader lines.
- `tall-0`: 121 frames, 800x1600, progress 0 to 1 (phones and portrait).
- `wide-1..3`, `tall-1..3`: the other three roof finishes for the system picker, progress 0.84 to 1 (17 and 13 frames).

To re-bake after changing the 3D scene:
1. Copy `tools/bake.html` to the site root, then build: `node factory/tools/build-site.mjs thermoset-roofing-bahamas-ltd`.
2. Render PNGs: `node tools/bake.mjs <wide|tall> <finish> <p0> <p1> <frames>` (edit the output folder at the top). About 6 s per wide frame on a 2-core sandbox (SwiftShader).
3. Encode: from `factory/web`, `node sites/thermoset-roofing-bahamas-ltd/tools/encode.cjs <png folder>` (AVIF quality 50, 4:4:4).
4. Remove `bake.html` from the site root and build again, so the bake page never ships.
