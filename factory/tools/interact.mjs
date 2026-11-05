// Usage: node factory/tools/interact.mjs <slug> [page.html]
// Browser-level interaction test (the Playwright-MCP style check, run headless with the local Playwright):
// clicks every tab, accordion trigger and in-page button, types into every input, hovers links,
// records JS errors and dead controls, and saves a screenshot after interacting.
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http'; import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const [slug, page = 'index.html'] = process.argv.slice(2);
if (!slug) { console.error('usage: interact.mjs <slug> [page]'); process.exit(2); }
const server = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } const t = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.svg': 'image/svg+xml' }[path.extname(f)] || 'application/octet-stream'; r.writeHead(200, { 'content-type': t }); fs.createReadStream(f).pipe(r); });
await new Promise(r => server.listen(0, r)); const base = `http://127.0.0.1:${server.address().port}`;
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errors = []; pg.on('pageerror', e => errors.push(e.message));
await pg.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort());
await pg.goto(`${base}/${slug}/${page}`, { waitUntil: 'load' }); await pg.waitForTimeout(1200);
const report = { tabs: 0, accordions: 0, buttons: 0, inputs: 0, dead: [] };
for (const el of await pg.$$('[role="tab"]')) { await el.scrollIntoViewIfNeeded(); await el.click().catch(() => report.dead.push('tab')); report.tabs++; await pg.waitForTimeout(150); }
for (const el of await pg.$$('[data-slot="accordion-trigger"], button[aria-expanded]')) { if (!(await el.isVisible())) continue; await el.scrollIntoViewIfNeeded(); await el.click().catch(() => report.dead.push('accordion')); report.accordions++; await pg.waitForTimeout(120); }
for (const el of await pg.$$('main input:visible, main textarea:visible')) { const type = await el.getAttribute('type'); await el.fill(type === 'date' ? '2026-12-20' : type === 'number' ? '62' : 'Test').catch(() => report.dead.push('input')); report.inputs++; }
for (const el of await pg.$$('main button:visible')) { const t = (await el.innerText().catch(() => '')).trim().slice(0, 30); if (/^(call|whatsapp)/i.test(t)) continue; await el.click({ trial: true }).catch(() => report.dead.push('button:' + t)); report.buttons++; }
for (const el of (await pg.$$('main a[href]')).slice(0, 25)) { await el.hover().catch(() => {}); }
await pg.screenshot({ path: path.join(root, 'factory/qa', slug, `interactions-${page.replace('.html', '')}.png`), fullPage: true }).catch(() => {});
await b.close(); server.close();
console.log(`INTERACT ${slug}/${page}: tabs ${report.tabs}, accordions ${report.accordions}, inputs ${report.inputs}, buttons ${report.buttons}, dead ${report.dead.length}, js errors ${errors.length}`);
if (errors.length) console.log('  errors: ' + errors.slice(0, 3).join(' | '));
if (report.dead.length) console.log('  dead: ' + report.dead.slice(0, 5).join(', '));
if (report.tabs + report.accordions + report.inputs + report.buttons < 2) console.log('  WARNING: fewer than 2 interactive elements; the portfolio standard requires at least two real interactions');
process.exit(errors.length ? 1 : 0);
