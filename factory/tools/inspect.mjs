// Usage: node factory/tools/inspect.mjs <slug> [page.html]
// "See" a built page as compact TEXT instead of screenshots: a screen-by-screen layout outline (desktop 1440x900 and
// phone 390x844) plus automatic craft checks. Builders and critics read this instead of looking at many images.
// Works offline: outside images do not load in the sandbox, so photo upscaling is judged from the width/height
// attributes (set them to the photo's NATIVE pixel size, as the guide requires).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const [slug, page = 'index.html'] = process.argv.slice(2);
if (!slug || !fs.existsSync(path.join(root, slug, page))) { console.error('Usage: inspect.mjs <slug> [page.html]'); process.exit(2); }
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
await new Promise(r => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const fails = [], warns = [];

for (const [name, vp] of [['DESKTOP 1440x900', { width: 1440, height: 900 }], ['PHONE 390x844', { width: 390, height: 844 }]]) {
  const pg = await browser.newPage({ viewport: vp });
  await pg.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort());
  await pg.goto(`${base}/${slug}/${page}`, { waitUntil: 'load' }); await pg.waitForTimeout(1200);
  const r = await pg.evaluate(() => {
    const vh = innerHeight, vw = innerWidth;
    const css = el => getComputedStyle(el);
    const rgb = s => (s.match(/[\d.]+/g) || []).map(Number);
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
    const bgOf = el => { for (let e = el; e; e = e.parentElement) { const c = rgb(css(e).backgroundColor); if (c.length >= 3 && (c[3] === undefined || c[3] > .5)) return c; if (css(e).backgroundImage !== 'none') return null; } return [255, 255, 255]; };
    const vis = el => { const b = el.getBoundingClientRect(), s = css(el); return b.width > 2 && b.height > 2 && s.visibility !== 'hidden' && +s.opacity > .05; };
    const txt = el => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
    const y = el => window.scrollY + el.getBoundingClientRect().top;
    const out = [], fails = [], warns = [];
    const fams = new Set();
    // screens: top-level blocks
    const blocks = [...document.querySelectorAll('body > #root > *, #root > * > section, #root section, header, footer')].filter((e, i, a) => a.indexOf(e) === i && vis(e) && !a.some(o => o !== e && o.contains(e) && o.tagName === 'SECTION'));
    blocks.sort((a, b) => y(a) - y(b));
    for (const b of blocks.slice(0, 24)) {
      const bb = b.getBoundingClientRect(); const bg = bgOf(b);
      const head = [...b.querySelectorAll('h1,h2,h3')].filter(vis).slice(0, 2).map(h => { const s = css(h); fams.add(s.fontFamily.split(',')[0]); return `${h.tagName} "${txt(h).slice(0, 70)}" ${Math.round(parseFloat(s.fontSize))}px ${s.fontFamily.split(',')[0].replace(/"/g, '')} w${s.fontWeight}`; });
      const ps = [...b.querySelectorAll('p')].filter(vis); const p0 = ps[0] && css(ps[0]);
      if (p0) fams.add(p0.fontFamily.split(',')[0]);
      const imgs = [...b.querySelectorAll('img')].filter(vis).map(i => { const r = i.getBoundingClientRect(); const nw = +i.getAttribute('width') || i.naturalWidth; return `${Math.round(r.width)}x${Math.round(r.height)}${nw ? ` (native ${nw})` : ''}`; });
      const ctas = [...b.querySelectorAll('a,button')].filter(vis).filter(e => { const s = css(e); return rgb(s.backgroundColor)[3] !== 0 && s.backgroundColor !== 'rgba(0, 0, 0, 0)'; }).slice(0, 3).map(e => `[${txt(e).slice(0, 30)}]`);
      const inputs = b.querySelectorAll('input,select,textarea,[role=slider],[role=radio]').length;
      const canv = b.querySelectorAll('canvas').length;
      out.push(`- y${Math.round(y(b))} h${Math.round(bb.height)} <${b.tagName.toLowerCase()}${b.id ? '#' + b.id : ''}> bg ${bg ? 'rgb(' + bg.slice(0, 3).join(',') + ')' : 'image'} | ${head.join(' / ') || 'no heading'}${p0 ? ` | ${ps.length}p ${Math.round(parseFloat(p0.fontSize))}px` : ''}${imgs.length ? ` | img ${imgs.slice(0, 3).join(', ')}${imgs.length > 3 ? ' +' + (imgs.length - 3) : ''}` : ''}${ctas.length ? ' | cta ' + ctas.join(' ') : ''}${inputs ? ` | ${inputs} controls` : ''}${canv ? ` | ${canv} canvas` : ''}`);
    }
    // first screen summary
    const above = [...document.querySelectorAll('h1,h2,a,button,input,select,img,canvas')].filter(e => vis(e) && e.getBoundingClientRect().top < vh && e.getBoundingClientRect().bottom > 0);
    const h1 = document.querySelector('h1');
    const first = `FIRST SCREEN: h1 "${h1 ? txt(h1).slice(0, 80) : 'MISSING'}" | ${above.filter(e => /A|BUTTON/.test(e.tagName)).length} links/buttons | ${above.filter(e => /INPUT|SELECT/.test(e.tagName)).length} inputs | ${above.filter(e => e.tagName === 'IMG' || e.tagName === 'CANVAS').length} images/canvas`;
    // craft checks
    if (!h1) fails.push('no <h1>');
    if (document.querySelectorAll('h1').length > 1) warns.push('more than one <h1>');
    if (document.body.innerText.includes('—')) fails.push('em dash in copy');
    if (!document.getElementById('concept-ribbon')) fails.push('concept label missing');
    if (!document.querySelector('meta[name=robots][content*=noindex]')) fails.push('noindex meta missing');
    if (document.documentElement.scrollWidth > vw + 1) fails.push(`horizontal overflow (${document.documentElement.scrollWidth}px > ${vw}px)`);
    for (const i of [...document.querySelectorAll('img')].filter(vis)) { const nw = +i.getAttribute('width') || i.naturalWidth; const w = i.getBoundingClientRect().width; if (!i.getAttribute('width') && !i.naturalWidth) warns.push(`img without width/height attributes: ${(i.getAttribute('src') || '').slice(-50)}`); else if (nw && w > nw * 1.05) fails.push(`photo upscaled: shown ${Math.round(w)}px, native ${nw}px (${(i.getAttribute('src') || '').slice(-45)})`); if (!i.getAttribute('alt') && i.getAttribute('alt') !== '') fails.push('img without alt'); }
    for (const e of [...document.querySelectorAll('p,li,a,button,span,label,h1,h2,h3,h4,dd,dt,td')].filter(vis)) {
      if (!e.childNodes.length || ![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const s = css(e), bg = bgOf(e); if (!bg) continue;
      const c = rgb(s.color); const a = c[3] === undefined ? 1 : c[3];
      const fg = c.slice(0, 3).map((v, k) => v * a + bg[k] * (1 - a));
      const L1 = lum(fg), L2 = lum(bg), cr = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
      const big = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6 && +s.fontWeight >= 700);
      if (cr < (big ? 3 : 4.5)) { fails.push(`low contrast ${cr.toFixed(1)}:1 "${txt(e).slice(0, 40)}"`); if (fails.length > 40) break; }
    }
    for (const e of [...document.querySelectorAll('a,button,input,select,[role=button]')].filter(vis)) { const r = e.getBoundingClientRect(); if (vw < 500 && (r.height < 40 || r.width < 40) && !e.closest('#concept-ribbon') && !e.closest('p,li')) warns.push(`small tap target ${Math.round(r.width)}x${Math.round(r.height)} "${txt(e).slice(0, 25)}"`); }
    for (const e of [...document.querySelectorAll('body *')].filter(vis)) { if (e.children.length) continue; const t = (e.textContent || '').trim(); if (/^[$£€]?\s?\d[\d,.:]*\s?(am|pm|%|ft|nights?)?$/i.test(t) && t.length > 2 && css(e).fontVariantNumeric.indexOf('tabular') < 0) { warns.push(`number without tabular-nums: "${t}"`); } }
    for (const h of [...document.querySelectorAll('h1,h2,h3')].filter(vis)) { const s = css(h); if (s.textWrap !== 'balance' && s.textWrapStyle !== 'balance') { warns.push(`heading not text-wrap: balance "${txt(h).slice(0, 40)}"`); } }
    const ps = [...document.querySelectorAll('p')].filter(vis); for (const p of ps) { const s = css(p); const ch = p.getBoundingClientRect().width / (parseFloat(s.fontSize) * .5); if (ch > 85 && txt(p).length > 160) { warns.push(`line length ~${Math.round(ch)} characters "${txt(p).slice(0, 30)}"`); break; } }
    if (fams.size > 3) fails.push(`${fams.size} font families: ${[...fams].join(', ')}`);
    return { out, first, fails: [...new Set(fails)], warns: [...new Set(warns)].slice(0, 12), fams: [...fams] };
  });
  console.log(`\n== ${name} (${page})\n${r.first}\nfonts: ${r.fams.join(', ')}\n${r.out.join('\n')}`);
  r.fails.forEach(f => fails.push(`${name.split(' ')[0]}: ${f}`)); r.warns.forEach(w => warns.push(`${name.split(' ')[0]}: ${w}`));
  await pg.close();
}
await browser.close(); server.close();
console.log(`\n== CRAFT CHECKS: ${fails.length} FAIL, ${warns.length} WARN`);
[...new Set(fails)].slice(0, 30).forEach(f => console.log('FAIL ' + f));
[...new Set(warns)].slice(0, 20).forEach(w => console.log('WARN ' + w));
process.exit(fails.length ? 1 : 0);
