// Usage: node factory/tools/qa.mjs <slug>
// Serves the repo locally, blocks outside network, screenshots mobile + desktop, runs checks.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const slug = process.argv[2];
if (!slug || !fs.existsSync(path.join(root, slug, 'index.html'))) { console.error('Usage: qa.mjs <slug> (folder with index.html)'); process.exit(2); }
const outDir = path.join(root, 'factory/qa', slug); fs.mkdirSync(outDir, { recursive: true });
const prospect = JSON.parse(fs.readFileSync(path.join(root, 'factory/data/prospects.json'), 'utf8')).find(p => p.slug === slug) || {};

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const placeholder = (label) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#cfcac0"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="#6b675e" text-anchor="middle">${label}</text></svg>`;

const blockers = [], warnings = [], info = [];
const pages = fs.readdirSync(path.join(root, slug)).filter(f => f.endsWith('.html'));
const browser = await chromium.launch();
const shots = [];
for (const page of pages) {
  for (const vp of [{ name: 'mobile', width: 390, height: 844 }, { name: 'desktop', width: 1440, height: 900 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    const errors = [];
    pg.on('pageerror', e => errors.push(String(e.message || e)));
    pg.on('console', m => { if (m.type() === 'error' && !/net::ERR|Failed to load resource/.test(m.text())) errors.push(m.text()); });
    await pg.route('**/*', route => {
      const u = route.request().url();
      if (u.startsWith(base)) return route.continue();
      const t = route.request().resourceType();
      if (['image', 'font', 'stylesheet', 'media'].includes(t)) return route.fetch({ timeout: 12000 }).then(r => route.fulfill({ response: r })).catch(() => t === 'image' ? (globalThis.__blocked = (globalThis.__blocked || 0) + 1, route.fulfill({ status: 200, contentType: 'image/svg+xml', body: placeholder('external image (blocked in sandbox)') })) : route.abort());
      return route.abort();
    });
    await pg.goto(`${base}/${slug}/${page}`, { waitUntil: 'load', timeout: 30000 }).catch(e => blockers.push(`${page}: failed to load (${e.message})`));
    await pg.waitForTimeout(900);
    // scroll through to trigger reveals
    await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await pg.waitForTimeout(700);
    const r = await pg.evaluate(() => {
      const q = (s) => [...document.querySelectorAll(s)];
      const text = document.body.innerText || '';
      let ld = [], ldErr = 0; q('script[type="application/ld+json"]').forEach(s => { try { ld.push(JSON.parse(s.textContent)); } catch { ldErr++; } });
      const hidden = q('main *').filter(el => { const cs = getComputedStyle(el); return el.children.length === 0 && (el.innerText || '').trim().length > 20 && parseFloat(cs.opacity) < 0.05; }).length;
      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: q('h1').length, title: document.title, desc: (document.querySelector('meta[name="description"]') || {}).content || '',
        robots: (document.querySelector('meta[name="robots"]') || {}).content || '', canonical: !!document.querySelector('link[rel="canonical"]'),
        ribbon: !!document.getElementById('concept-ribbon'), notes: !!document.getElementById('concept-notes'),
        imgNoAlt: q('img').filter(i => !i.hasAttribute('alt')).length, deadLinks: q('a').filter(a => { const h = a.getAttribute('href'); return !h || h === '#'; }).length,
        emDash: (text.match(/—/g) || []).length, lorem: /lorem ipsum/i.test(text), brackets: (text.match(/\[[^\]]{2,40}\]/g) || []).slice(0, 5),
        banned: ['Book a Table', 'Welcome to our website', 'Learn More', 'Click here', 'Lorem'].filter(b => text.toLowerCase().includes(b.toLowerCase())),
        ld: ld.length, ldErr, ldTypes: ld.flatMap(x => (x['@graph'] || [x]).map(n => n['@type'])).flat(),
        hiddenText: hidden, localLinks: q('a[href]').map(a => a.getAttribute('href')).filter(h => /^[\w-]+\.html(#.*)?$/.test(h)),
        smallTargets: q('a.btn, button, .action-bar a').filter(el => { const b = el.getBoundingClientRect(); return b.width > 0 && b.height < 40; }).length,
        fonts: [...new Set(q('h1,h2,p').slice(0, 20).map(el => getComputedStyle(el).fontFamily.split(',')[0]))]
      };
    });
    const tag = `${page}@${vp.name}`;
    if (r.overflow > 1) blockers.push(`${tag}: horizontal overflow ${r.overflow}px`);
    if (errors.length) blockers.push(`${tag}: JS errors: ${errors.slice(0, 3).join(' | ')}`);
    if (r.hiddenText > 0) blockers.push(`${tag}: ${r.hiddenText} text blocks still invisible after scroll (animation hides content)`);
    if (vp.name === 'desktop') {
      if (r.h1 !== 1) blockers.push(`${page}: has ${r.h1} <h1> (need exactly 1)`);
      if (!/noindex/.test(r.robots)) blockers.push(`${page}: missing robots noindex`);
      if (!r.ribbon || !r.notes) blockers.push(`${page}: missing concept ribbon or concept-notes JSON`);
      if (!r.canonical) warnings.push(`${page}: no canonical`);
      if (r.title.length < 30 || r.title.length > 65) warnings.push(`${page}: title length ${r.title.length} ("${r.title}")`);
      if (r.desc.length < 110 || r.desc.length > 165) warnings.push(`${page}: meta description length ${r.desc.length}`);
      if (page === 'index.html' && (r.ld === 0 || r.ldErr)) blockers.push(`index.html: JSON-LD missing or invalid`);
      if (r.imgNoAlt) blockers.push(`${page}: ${r.imgNoAlt} images without alt`);
      if (r.deadLinks) warnings.push(`${page}: ${r.deadLinks} links with empty or # href`);
      if (r.emDash) blockers.push(`${page}: ${r.emDash} em dashes in copy`);
      if (r.lorem) blockers.push(`${page}: lorem ipsum present`);
      if (r.brackets.length) warnings.push(`${page}: bracket placeholders ${JSON.stringify(r.brackets)}`);
      if (r.banned.length) blockers.push(`${page}: banned phrases ${JSON.stringify(r.banned)}`);
      for (const l of r.localLinks) { const f = l.split('#')[0]; if (!fs.existsSync(path.join(root, slug, f))) blockers.push(`${page}: link to missing page ${f}`); }
      info.push(`${page}: title="${r.title}" ld=${JSON.stringify(r.ldTypes)} fonts=${JSON.stringify(r.fonts)}`);
    } else if (r.smallTargets) warnings.push(`${tag}: ${r.smallTargets} tap targets under 40px tall`);
    if (page === 'index.html' && vp.name === 'desktop') {
      const m = await pg.evaluate(() => {
        const vw = innerWidth, vh = innerHeight; window.scrollTo(0, 0);
        const vis = e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        let hero = 0;
        for (const e of document.querySelectorAll('img, picture, video, canvas, [style*="background-image"]')) { if (!vis(e)) continue; const r = e.getBoundingClientRect(); const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)), h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)); hero = Math.max(hero, w * h / (vw * vh)); }
        const texts = [...document.querySelectorAll('h1,h2,h3,p,li,a,button,span,label')].filter(e => vis(e) && e.textContent.trim().length > 2 && !e.closest('#concept-ribbon'));
        const fams = new Set(texts.map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase()));
        const ps = [...document.querySelectorAll('main p')].filter(e => vis(e) && e.textContent.trim().length > 80);
        const sizes = ps.map(e => parseFloat(getComputedStyle(e).fontSize)).sort((x, y) => x - y);
        const body = sizes.length ? sizes[Math.floor(sizes.length / 2)] : 16;
        const measure = Math.max(0, ...ps.map(e => e.getBoundingClientRect().width / (parseFloat(getComputedStyle(e).fontSize) * 0.5)));
        const h1 = document.querySelector('h1'); const h1s = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
        const imgs = [...document.querySelectorAll('main img')].filter(e => e.getBoundingClientRect().width >= 200).length;
        const btnStyles = new Set([...document.querySelectorAll('main a, main button')].filter(e => { const cs = getComputedStyle(e); return vis(e) && parseFloat(cs.paddingLeft) >= 12 && cs.backgroundColor !== 'rgba(0, 0, 0, 0)'; }).map(e => { const cs = getComputedStyle(e); return cs.backgroundColor + cs.borderRadius; }));
        return { hero: Math.round(hero * 100), fams: [...fams], body, measure: Math.round(measure), ratio: h1s && body ? +(h1s / body).toFixed(1) : 0, imgs, btnStyles: btnStyles.size };
      });
      const dir = (() => { try { return JSON.parse(fs.readFileSync(path.join(root, 'factory/directions', slug + '.json'), 'utf8')); } catch { return {}; } })();
      const typeLed = ['A04', 'A12'].includes(dir.archetype);
      info.push(`craft: hero media ${m.hero}% of first screen, fonts ${m.fams.length} (${m.fams.join(', ')}), body ${m.body}px, measure ${m.measure}ch, h1/body ${m.ratio}x, home photos ${m.imgs}, button styles ${m.btnStyles}`);
      if (!typeLed && m.hero < 35) blockers.push(`craft: the first screen's largest photograph covers only ${m.hero}% of it (need 35%+ unless the direction is type-led A04/A12)`);
      if (m.fams.length > 3) blockers.push(`craft: ${m.fams.length} font families in use (${m.fams.join(', ')}); a premium page uses 2, at most 3 with a mono`);
      if (m.body < 16 || m.body > 22) warnings.push(`craft: body text ${m.body}px (premium range 17-20px)`);
      if (m.measure > 90) warnings.push(`craft: paragraphs run ${m.measure} characters wide (keep under 75)`);
      if (m.ratio && m.ratio < 2.5) warnings.push(`craft: h1 is only ${m.ratio}x the body size; premium pages have real scale contrast (3x+)`);
      if (prospect.tier !== 'C' && m.imgs < 4) blockers.push(`craft: only ${m.imgs} photographs on the home page (need 8-15; 4 is the floor)`);
      else if (prospect.tier !== 'C' && m.imgs < 8) warnings.push(`craft: ${m.imgs} photographs on the home page (aim for 8-15)`);
      if (m.btnStyles > 3) warnings.push(`craft: ${m.btnStyles} different filled button styles; use one primary and one secondary`);
    }
    const file = path.join(outDir, `${page.replace('.html', '')}-${vp.name}.png`);
    await pg.screenshot({ path: file, fullPage: true, clip: undefined }).catch(() => {});
    // cap very tall screenshots for readability: also save viewport-top shot
    await pg.screenshot({ path: file.replace('.png', '-top.png') });
    shots.push(path.relative(root, file));
    await ctx.close();
  }
}
await browser.close(); server.close();
// size budget
const adir = path.join(root, slug, 'assets');
// initial payload = assets referenced directly by index.html (script src, link href, modulepreload); lazy chunks (3D scenes) excluded
const ihtml = fs.readFileSync(path.join(root, slug, 'index.html'), 'utf8');
const refs = [...ihtml.matchAll(/(?:src|href)="\.?\/?assets\/([^"]+\.(?:js|css))"/g)].map(m => m[1]);
const own = refs.filter(f => fs.existsSync(path.join(adir, f))).reduce((a, f) => a + fs.statSync(path.join(adir, f)).size, 0);
if (own > 650000) warnings.push(`initial JS+CSS is ${Math.round(own / 1024)} KB (budget 650 KB; lazy-load three.js scenes)`);
if (!fs.existsSync(path.join(root, 'factory/web/sites', slug))) blockers.push('site source missing in factory/web/sites/<slug>/ (build with factory/tools/build-site.mjs)');
for (const req of ['site-data.json', 'favicon.svg']) if (!fs.existsSync(path.join(root, slug, req))) blockers.push(`missing ${req}`);
if (prospect.tier === 'C' && pages.length > 1) warnings.push('Tier C should be a single page');
// copy main screenshots to simple names
for (const n of ['mobile', 'desktop']) { const s = path.join(outDir, `index-${n}.png`); if (fs.existsSync(s)) fs.copyFileSync(s, path.join(outDir, `${n}.png`)); }
const result = { slug, pages, blockers, warnings, info, screenshots: shots };
fs.writeFileSync(path.join(outDir, 'qa.json'), JSON.stringify(result, null, 1));
// dead space: a vertical strip (e.g. an empty side column) or long empty bands in the desktop home page
try {
  const { execFileSync } = await import('node:child_process');
  const f = path.join(outDir, 'index-desktop.png');
  if (fs.existsSync(f)) {
    const res = JSON.parse(execFileSync('python3', ['-c', `
import sys,json
from PIL import Image,ImageStat
im=Image.open(sys.argv[1]).convert('L'); W,H=im.size; out={'strips':[],'bands':0}
def flat(box): return ImageStat.Stat(im.crop(box)).stddev[0] < 2.5
if H>1800:
  for x0 in range(0,W,240):
    blocks=[flat((x0,y,min(x0+240,W),y+120)) for y in range(900,H-120,120)]
    if blocks and sum(blocks)/len(blocks)>0.8: out['strips'].append(x0)
  rows=[flat((0,y,W,y+150)) for y in range(0,H-150,150)]
  run=best=0
  for r in rows: run=run+1 if r else 0; best=max(best,run)
  out['bands']=best*150
print(json.dumps(out))`, f]).toString());
    const centre = res.strips.filter(x => x > 0 && x < 1200);
    if (res.strips.length && res.strips.length < 6) blockers.push(`dead space: a ${res.strips.length * 240}px wide vertical strip at x=${res.strips.join(',')} is empty for most of the page (a side column that ends, or an unused gutter)${centre.length ? '' : ''}`);
    if (res.bands > 1100) warnings.push(`dead space: ${res.bands}px of empty page in one stretch`);
  }
} catch {}
if (globalThis.__blocked) console.log(`BLIND: ${globalThis.__blocked} outside images could not be loaded in this sandbox, so the screenshots show grey boxes instead of photos. You cannot judge the design from them; note this in status and keep layouts photo-agnostic.`);
console.log(`QA ${slug}: ${blockers.length} BLOCKERS, ${warnings.length} warnings`);
blockers.forEach(b => console.log('  BLOCKER  ' + b));
warnings.forEach(w => console.log('  warning  ' + w));
info.forEach(i => console.log('  info     ' + i));
console.log(`Screenshots: factory/qa/${slug}/mobile.png, desktop.png (+ per page, -top variants)`);
process.exit(blockers.length ? 1 : 0);
