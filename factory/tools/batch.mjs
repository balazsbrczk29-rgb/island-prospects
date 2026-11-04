// Usage:
//   node factory/tools/batch.mjs 07          -> records for batch 07 (skip those with _done)
//   node factory/tools/batch.mjs pending 6   -> the 6 highest-priority businesses not yet built or claimed
//   node factory/tools/batch.mjs claim <slug> -> mark a business as being built (push it right away) so parallel resume sessions don't collide
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const all = JSON.parse(fs.readFileSync(path.join(root, 'factory/data/prospects.json'), 'utf8'));
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'factory/config.json'), 'utf8'));
const stFile = s => path.join(root, 'factory/status', s + '.json');
const status = s => fs.existsSync(stFile(s)) ? JSON.parse(fs.readFileSync(stFile(s), 'utf8')) : null;
const mode = process.argv[2] || '';
if (mode === 'claim') {
  const slug = process.argv[3]; const r = all.find(x => x.slug === slug); if (!r) { console.error('unknown slug'); process.exit(1); }
  try { execSync('git pull -q --rebase --autostash origin main', { cwd: root, stdio: 'inherit' }); } catch {}
  const cur = status(slug);
  if (cur && !(cur.state === 'building' && Date.now() - new Date(cur.claimed_at).getTime() > 2.5 * 3600 * 1000)) { console.log(`SKIP ${slug}: already ${cur.state} by another session. Move to the next business.`); process.exit(3); }
  fs.writeFileSync(stFile(slug), JSON.stringify({ slug, id: r.id, name: r.name, batch: r.batch, tier: r.tier, state: 'building', claimed_at: new Date().toISOString() }, null, 1));
  execSync(`git add factory/status/${slug}.json && git commit -q -m "claim: ${slug}" && (git pull -q --rebase --autostash origin main && git push -q origin HEAD:main)`, { cwd: root, stdio: 'inherit', shell: '/bin/bash' });
  console.log('CLAIMED', slug); process.exit(0);
}
let rows;
if (mode === 'pending') {
  const n = parseInt(process.argv[3] || '5', 10);
  const stale = ms => Date.now() - new Date(ms).getTime() > 2.5 * 3600 * 1000;   // a "building" claim older than 2.5h = crashed session
  rows = all.filter(r => { const s = status(r.slug); return !s || (s.state === 'building' && stale(s.claimed_at)); }).slice(0, n); // prospects.json is already in priority order
  console.log(`PENDING (top ${n} by priority). For EACH: run "node factory/tools/batch.mjs claim <slug>" immediately before you start it, then build and publish it.`);
} else {
  const b = mode.padStart(2, '0');
  rows = all.filter(r => r.batch === b);
  if (!rows.length) { console.error('No records for batch', b); process.exit(1); }
  console.log(`BATCH ${b}: ${rows.length} businesses. Skip any with _done set (already built or being built).`);
}
for (const r of rows) { const s = status(r.slug); r._done = s ? s.state : null; }
console.log(`Pages base: ${cfg.pages_base}\n`);
console.log(JSON.stringify(rows, null, 1));
