// Reroll: send sites back to the queue for a fresh generation-2 build.
//   node factory/tools/reroll.mjs <slug> [<slug>...]          new design direction + rebuild
//   node factory/tools/reroll.mjs <slug> --keep-direction      same direction, rebuild only (better execution)
//   node factory/tools/reroll.mjs <slug> --prefer A06          ask for a specific archetype
// Flagged sites jump to the front of `batch.mjs pending`. The current live page stays up until replaced.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const args = process.argv.slice(2);
const keep = args.includes('--keep-direction');
const pi = args.indexOf('--prefer'); const prefer = pi >= 0 ? args[pi + 1] : null;
const slugs = args.filter((a, i) => !a.startsWith('--') && !(pi >= 0 && i === pi + 1));
if (!slugs.length) { console.error('usage: reroll.mjs <slug>... [--keep-direction] [--prefer A06]'); process.exit(1); }
try { execSync('git pull -q --rebase --autostash origin main', { cwd: root, stdio: 'inherit' }); } catch {}
for (const slug of slugs) {
  const st = path.join(root, 'factory/status', slug + '.json');
  if (!fs.existsSync(st)) { console.log('no status for', slug, '(already pending)'); continue; }
  const s = JSON.parse(fs.readFileSync(st, 'utf8'));
  s.history = [...(s.history || []), { generation: s.generation || 1, direction: s.direction || null, critic: s.critic || null, built_at: s.built_at }].slice(-5);
  s.state = 'built'; s.generation = 1; s.reroll = true; s.reroll_at = new Date().toISOString();
  fs.writeFileSync(st, JSON.stringify(s, null, 1));
  if (!keep) execSync(`node factory/tools/direction.mjs ${slug} --redeal${prefer ? ' --prefer ' + prefer : ''}`, { cwd: root, stdio: 'inherit' });
  console.log('REROLL queued', slug);
}
execSync(`git add factory/status factory/directions && git commit -q -m "reroll: ${slugs.join(' ')}" && git pull -q --rebase --autostash origin main && git push -q origin HEAD:main`, { cwd: root, stdio: 'inherit', shell: '/bin/bash' });
console.log('Pushed. Fire the "Reroll sites" scheduled task (or any worker) to rebuild them.');
