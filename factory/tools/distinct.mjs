// Distinctness gate: is this site too close to any other site in the repo?
//   node factory/tools/distinct.mjs <slug>
// Captures 3 views (top, 40%, 70% of the page) at 1440x900, a perceptual hash of each, and a style
// fingerprint; compares with every other built site (cached in factory/qa/_fp/); greps the source for
// generation-1 clone patterns; checks the ground colour against the dealt palette lane.
// Writes factory/qa/_contact.png (other sites' heroes) for the fresh-eyes critic.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const slug = process.argv[2];
if (!slug || !fs.existsSync(path.join(root, slug, 'index.html'))) { console.error('Usage: distinct.mjs <slug> (built site)'); process.exit(2); }
const fpDir = path.join(root, 'factory/qa/_fp'); fs.mkdirSync(fpDir, { recursive: true });
const fpStore = path.join(root, 'factory/fingerprints'); fs.mkdirSync(fpStore, { recursive: true });   // committed cache: one json + hero jpg per site
import crypto from 'node:crypto';
const pageHash = s => crypto.createHash('sha1').update(fs.readFileSync(path.join(root, s, 'index.html'))).digest('hex');
const blockers = [], warnings = [];

// 1. source clone patterns
const srcDir = path.join(root, 'factory/web/sites', slug, 'src');
const code = fs.existsSync(srcDir) ? fs.readdirSync(srcDir, { recursive: true }).filter(f => /\.(tsx?|css)$/.test(f)).map(f => fs.readFileSync(path.join(srcDir, f), 'utf8')).join('\n') : '';
const dirn = (() => { try { return JSON.parse(fs.readFileSync(path.join(root, 'factory/directions', slug + '.json'), 'utf8')); } catch { return {}; } })();
const clone = [
  [/Key information/i, 'a "Key information" band (generation-1 template)'],
  [/function Reveal\b|<Reveal\b/, 'the shared Reveal fade-up wrapper'],
  [/filter:\s*["']blur\(6px\)/, 'the fade-up-blur entrance'],
  [/max-w-\[1440px\][^"']*md:px-10|md:px-10[^"']*max-w-\[1440px\]/, 'the 1440px + 40px container'],
  [/aria-label=["']Quick actions["']/, 'the copied mobile ActionBar'],
];
for (const [re, what] of clone) if (re.test(code)) blockers.push(`source contains ${what}`);
const eyebrows = (code.match(/uppercase[^"'`]*tracking-\[0\.(1[4-9]|2)\d*em\]|tracking-\[0\.(1[4-9]|2)\d*em\][^"'`]*uppercase/g) || []).length;
if (eyebrows > 2 && !['T04', 'T05', 'T09'].includes(dirn.type)) blockers.push(`${eyebrows} tracked uppercase eyebrow labels; type system ${dirn.type || '?'} does not use them`);
if (/["'>](0[1-9]) ·/.test(code) && !['T03', 'T04', 'T10'].includes(dirn.type)) warnings.push('section numbering "01 ·" used but the type system has no numbering');

// 2. render and fingerprint
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const server = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise(r => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
const tint = u => { let h = 0; for (const c of u) h = (h * 31 + c.charCodeAt(0)) >>> 0; const g = 90 + (h % 120); return `rgb(${g},${(g + (h >> 8) % 40) % 255},${(g + (h >> 16) % 60) % 255})`; };

async function fingerprint(s) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage();
  await pg.route('**/*', route => { const u = route.request().url(); if (u.startsWith(base)) return route.continue(); if (route.request().resourceType() === 'image') return route.fulfill({ status: 200, contentType: 'image/svg+xml', body: `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><rect width="100%" height="100%" fill="${tint(u)}"/></svg>` }); return route.abort(); });
  await pg.goto(`${base}/${s}/`, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  await pg.waitForTimeout(1800);
  const style = await pg.evaluate(() => {
    const cs = e => e ? getComputedStyle(e) : null;
    const h1 = document.querySelector('h1'), hdr = document.querySelector('header');
    const secs = [...document.querySelectorAll('main section, main > div > section')].filter(x => x.offsetHeight > 200);
    const solid = c => c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c);
    const bgOf = [document.querySelector('main'), document.body, document.documentElement].map(e => e && cs(e).backgroundColor).find(solid) || 'rgb(255, 255, 255)';
    return { bg: bgOf, bgMain: cs(document.querySelector('main') || document.body).backgroundColor, display: h1 ? cs(h1).fontFamily.split(',')[0].replace(/["']/g, '') : '', h1size: h1 ? parseFloat(cs(h1).fontSize) : 0, header: hdr ? `${cs(hdr).position}|${cs(hdr).backdropFilter !== 'none'}` : 'none', sections: secs.length, h: document.body.scrollHeight };
  });
  const files = [];
  for (const [i, frac] of [[0, 0], [1, 0.4], [2, 0.7]]) {
    await pg.evaluate(f => window.scrollTo(0, (document.body.scrollHeight - innerHeight) * f), frac);
    await pg.waitForTimeout(700);
    const f = path.join(fpDir, `${s}-${i}.png`); try { await pg.screenshot({ path: f, timeout: 15000 }); files.push(f); } catch { try { await pg.screenshot({ path: f, timeout: 15000, animations: 'disabled' }); files.push(f); } catch {} }
  }
  await ctx.close();
  if (!files.length) return { slug: s, style, hashes: [], at: '' };
  const hashes = JSON.parse(execFileSync('python3', ['-c', `
import sys,json
from PIL import Image
out=[]
for f in sys.argv[1:]:
  im=Image.open(f).convert('L').resize((17,16))
  px=list(im.tobytes());bits=''
  for y in range(16):
    for x in range(16): bits+='1' if px[y*17+x]>px[y*17+x+1] else '0'
  out.append(bits)
print(json.dumps(out))`, ...files]).toString());
  const fp = { slug: s, style, hashes, page: pageHash(s), at: new Date().toISOString() };
  fs.writeFileSync(path.join(fpStore, s + '.json'), JSON.stringify(fp));
  try { execFileSync('python3', ['-c', "import sys\nfrom PIL import Image\nImage.open(sys.argv[1]).convert('RGB').resize((480,300)).save(sys.argv[2],quality=70)", files[0], path.join(fpStore, s + '.jpg')]); } catch {}
  return fp;
}
const ham = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; };
const rgb = s => (s.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);
const dist = (a, b) => Math.hypot(...rgb(a).map((v, i) => v - rgb(b)[i]));

const me = await fingerprint(slug);
const others = fs.readdirSync(path.join(root, 'factory/status')).filter(f => f.endsWith('.json')).map(f => { try { return JSON.parse(fs.readFileSync(path.join(root, 'factory/status', f), 'utf8')); } catch { return {}; } }).filter(s => s.state === 'built' && s.slug !== slug && fs.existsSync(path.join(root, s.slug, 'index.html')));
const fps = [];
for (const o of others) {
  const c = path.join(fpStore, o.slug + '.json');
  let cached = null; try { cached = JSON.parse(fs.readFileSync(c, 'utf8')); } catch {}
  fps.push(cached && cached.page === pageHash(o.slug) ? cached : await fingerprint(o.slug));
}
await browser.close(); server.close();

const near = [];
for (const o of fps) {
  if (!o.hashes || !o.hashes.length) continue;
  const hd = me.hashes.map((h, i) => ham(h, o.hashes[i] || h));
  const avg = hd.reduce((a, b) => a + b, 0) / hd.length;
  const sameGround = dist(me.style.bg, o.style.bg) < 18;
  const sameFont = me.style.display && me.style.display === o.style.display;
  const sameHeader = me.style.header === o.style.header && me.style.header.includes('sticky|true');
  let score = (256 - avg) / 256 * 60 + (sameGround ? 15 : 0) + (sameFont ? 15 : 0) + (sameHeader ? 10 : 0);
  near.push({ slug: o.slug, score: Math.round(score), avg: Math.round(avg), hero: hd[0], sameGround, sameFont, sameHeader });
}
near.sort((a, b) => b.score - a.score);
for (const n of near.slice(0, 5)) {
  if (n.hero < 40 || n.score >= 85) blockers.push(`too close to ${n.slug} (similarity ${n.score}/100, hero hash distance ${n.hero}/256${n.sameGround ? ', same ground colour' : ''}${n.sameFont ? ', same display font' : ''}${n.sameHeader ? ', same sticky blurred header' : ''})`);
  else if (n.score >= 75) warnings.push(`resembles ${n.slug} (similarity ${n.score}/100)`);
}
if (me.style.header.includes('sticky|true')) warnings.push('sticky blurred header: generation-1 look; the dealt nav pattern should replace it');
// ground vs lane
const [r, g, b] = rgb(me.style.bg); const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
if (!['P01', 'P10', 'P12'].includes(dirn.lane) && mx > 232 && mx - mn < 16) blockers.push(`page ground ${me.style.bg} is near-white but the dealt lane is ${dirn.lane || '?'} ${dirn.lane_name || ''}; use the lane's ground`);

// contact sheet for the critic
try {
  const pick = near.slice(0, 12).map(n => path.join(fpStore, n.slug + '.jpg')).filter(f => fs.existsSync(f));
  execFileSync('python3', ['-c', `
import sys
from PIL import Image,ImageDraw
fs=sys.argv[2:];W,H=480,300;c=4;r=(len(fs)+c-1)//c or 1
s=Image.new('RGB',(c*W,r*(H+20)),'white');d=ImageDraw.Draw(s)
for i,f in enumerate(fs):
  x=(i%c)*W;y=(i//c)*(H+20);s.paste(Image.open(f).convert('RGB').resize((W,H)),(x,y+20));d.text((x+4,y+4),f.split('/')[-1][:-4],fill='black')
s.save(sys.argv[1])`, path.join(root, 'factory/qa/_contact.png'), ...pick]);
} catch {}

console.log(`DISTINCT ${slug}: ground ${me.style.bg}, display "${me.style.display}", header ${me.style.header}, ${me.style.sections} sections`);
console.log('Closest sites:', near.slice(0, 3).map(n => `${n.slug} ${n.score}`).join(', '));
for (const b of blockers) console.log('BLOCKER  ' + b);
for (const w of warnings) console.log('warning  ' + w);
console.log(blockers.length ? `RESULT: ${blockers.length} blocker(s). Fix them, rebuild, run again.` : 'RESULT: distinct. Contact sheet for the critic: factory/qa/_contact.png');
process.exit(blockers.length ? 1 : 0);
