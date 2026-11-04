// Prints design choices already used by finished sites so new sites stay distinct.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const dir = path.join(root, 'factory/status');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : [];
const items = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))).filter(s => s.state === 'built' && s.design)
  .sort((a, b) => String(a.built_at).localeCompare(String(b.built_at)));
const count = (k) => { const m = {}; for (const s of items) { const v = k(s); if (v) m[v] = (m[v] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1]); };
console.log(`${items.length} finished sites.\n`);
console.log('PAIRINGS (display + body) used, max 2 each:');
for (const [k, v] of count(s => `${s.design.display_font} + ${s.design.body_font}`)) console.log(`  ${v}x  ${k}${v >= 2 ? '   <- FULL, do not use' : ''}`);
console.log('\nDISPLAY FONTS used:');
for (const [k, v] of count(s => s.design.display_font)) console.log(`  ${v}x  ${k}`);
console.log('\nHERO PATTERNS, last 6 (do not repeat the last 3):');
for (const s of items.slice(-6)) console.log(`  ${s.design.hero_pattern}  (${s.slug})`);
console.log('\nACCENT COLORS used (first palette entry after paper/ink is not tracked, eyeball for near-duplicates):');
console.log('  ' + items.map(s => (s.design.palette || []).slice(0, 4).join(' ')).slice(-12).join('\n  '));
