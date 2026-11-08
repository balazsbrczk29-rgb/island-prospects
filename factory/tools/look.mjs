// Look at any live web page the way a designer does: real browser, real photos and fonts.
//   node factory/tools/look.mjs <url> [name]          -> factory/qa/_look/<name>-desktop.png, -mobile.png, -full.png
// Then open the PNGs with the Read tool. Use it for the award-level reference sites you study, the
// business's current website, and your own published page. Needs outbound network (session setting).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const url = process.argv[2];
if (!url) { console.error('usage: look.mjs <url> [name]'); process.exit(1); }
const name = (process.argv[3] || new URL(url.startsWith('http') ? url : 'https://' + url).hostname).replace(/[^a-z0-9.-]/gi, '_');
const out = path.join(root, 'factory/qa/_look'); fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
let failed = 0;
for (const [vp, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  pg.on('requestfailed', () => failed++);
  try {
    await pg.goto(url.startsWith('http') ? url : 'https://' + url, { waitUntil: 'load', timeout: 45000 });
    await pg.waitForTimeout(2500);
    await pg.screenshot({ path: path.join(out, `${name}-${vp}.png`) });
    if (vp === 'desktop') {
      await pg.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 9000); y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); });
      await pg.waitForTimeout(800);
      await pg.screenshot({ path: path.join(out, `${name}-full.png`), fullPage: true, timeout: 30000 }).catch(() => {});
    }
  } catch (e) { console.log(`could not load ${url} (${vp}): ${String(e.message).slice(0, 120)}`); }
  await ctx.close();
}
await b.close();
if (failed > 20) console.log(`NOTE: ${failed} requests failed: the network may be blocked in this session, so photos and fonts may be missing.`);
const got = ['desktop', 'mobile', 'full'].filter(v => fs.existsSync(path.join(out, `${name}-${v}.png`)));
if (!got.length) { console.log(`LOOK FAILED: nothing captured for ${url}. The network is probably blocked in this session: say so in status notes.`); process.exit(1); }
console.log(`Saved: ${got.map(v => `factory/qa/_look/${name}-${v}.png`).join(', ')}. Read them with the Read tool.`);
