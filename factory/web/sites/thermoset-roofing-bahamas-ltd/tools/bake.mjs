// usage: node bake.mjs <wide|tall> <finish> <p0> <p1> <n> [startIndex]
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [mode, finish, p0, p1, n] = process.argv.slice(2); const N = +n
const root = '/home/claude/island-prospects', out = `/tmp/claude-0/-home-claude-island-prospects/c8dd0224-8328-5e20-a86d-abd7015a5517/scratchpad/bake/${mode}-${finish}`
fs.mkdirSync(out, { recursive: true })
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); const f = path.join(root, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end() } r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r) })
await new Promise(r => srv.listen(0, r))
const vp = mode === 'wide' ? { width: 1920, height: 1200 } : { width: 800, height: 1600 }
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const pg = await b.newPage({ viewport: vp, deviceScaleFactor: 1 })
pg.on('pageerror', e => console.log('ERR', e.message))
await pg.goto(`http://127.0.0.1:${srv.address().port}/thermoset-roofing-bahamas-ltd/bake.html`)
await pg.waitForFunction(() => window.__ready && window.__bake, null, { timeout: 120000 })
await pg.waitForTimeout(3000)
const anchors = fs.existsSync(`${out}/anchors.json`) ? JSON.parse(fs.readFileSync(`${out}/anchors.json`)) : {}
for (let i = 0; i < N; i++) {
  const file = `${out}/${String(i).padStart(3, '0')}.png`; if (fs.existsSync(file)) continue
  const p = N === 1 ? +p0 : +p0 + (+p1 - +p0) * i / (N - 1), t = Date.now()
  const f0 = await pg.evaluate(() => window.__frames || 0)
  await pg.evaluate(([p, f]) => window.__bake(p, f), [p, +finish])
  await pg.waitForFunction(f0 => (window.__frames || 0) > f0, f0, { timeout: 60000, polling: 50 }).catch(() => {})
  await pg.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
  if (i === 0) await pg.waitForTimeout(1500)
  await pg.screenshot({ path: file })
  anchors[i] = await pg.evaluate(() => window.__anchors.map(a => [+(a.x / innerWidth).toFixed(4), +(a.y / innerHeight).toFixed(4)]))
  fs.writeFileSync(`${out}/anchors.json`, JSON.stringify(anchors))
  console.log(mode, finish, i, p.toFixed(3), Date.now() - t, 'ms')
}
await b.close(); srv.close()
