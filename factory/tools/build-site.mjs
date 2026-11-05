// Usage: node factory/tools/build-site.mjs <slug>
// Builds factory/web/sites/<slug>/ (React + Tailwind + shadcn + motion + three) into /<slug>/ (static, GitHub Pages),
// then prerenders every page with Playwright so the shipped HTML contains all text (SEO) and copies site-data.json / favicon.
import { execSync } from 'node:child_process';
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http';
import { createRequire } from 'node:module';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const web = path.join(root, 'factory/web');
const slug = process.argv[2];
if (!slug || !fs.existsSync(path.join(web, 'sites', slug))) { console.error('Usage: build-site.mjs <slug> (factory/web/sites/<slug>/ must exist)'); process.exit(2); }
if (!fs.existsSync(path.join(web, 'node_modules/vite'))) { console.log('installing web deps (once per session)...'); execSync('npm ci --no-audit --no-fund --loglevel=error', { cwd: web, stdio: 'inherit' }); }
execSync('npx vite build --logLevel warn', { cwd: web, stdio: 'inherit', env: { ...process.env, SITE_SLUG: slug } });
const out = path.join(root, slug);
for (const f of ['site-data.json', 'favicon.svg']) { const s = path.join(web, 'sites', slug, f); if (fs.existsSync(s)) fs.copyFileSync(s, path.join(out, f)); }
// prerender
const { chromium } = createRequire(path.join(root, 'factory/tools/'))('playwright');
const server = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); } const t = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.svg': 'image/svg+xml', '.json': 'application/json' }[path.extname(f)] || 'application/octet-stream'; res.writeHead(200, { 'content-type': t }); fs.createReadStream(f).pipe(res); });
await new Promise(r => server.listen(0, r)); const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
for (const page of fs.readdirSync(out).filter(f => f.endsWith('.html'))) {
  const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort());
  await pg.goto(`${base}/${slug}/${page}`, { waitUntil: 'load' }); await pg.waitForTimeout(800);
  const rootHtml = await pg.evaluate(() => { const el = document.getElementById('root'); return el ? el.innerHTML : null; });
  await pg.close();
  if (rootHtml) {
    const file = path.join(out, page); let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${rootHtml}</div>`);
    fs.writeFileSync(file, html);
    console.log(`prerendered ${page} (${Math.round(rootHtml.length / 1024)} KB of markup)`);
  } else console.log(`WARN: ${page} has no #root, not prerendered`);
}
await browser.close(); server.close();
const kb = (d) => fs.readdirSync(d, { recursive: true }).map(f => path.join(d, f)).filter(f => fs.statSync(f).isFile()).reduce((a, f) => a + fs.statSync(f).size, 0) / 1024;
console.log(`BUILT ${slug} -> /${slug}/ (${Math.round(kb(out))} KB total)`);
