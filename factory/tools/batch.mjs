// Usage: node factory/tools/batch.mjs 07   -> prints the batch records and which are already done
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const b = (process.argv[2] || '').padStart(2, '0');
const all = JSON.parse(fs.readFileSync(path.join(root, 'factory/data/prospects.json'), 'utf8'));
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'factory/config.json'), 'utf8'));
const rows = all.filter(r => r.batch === b);
if (!rows.length) { console.error('No records for batch', b); process.exit(1); }
for (const r of rows) {
  const st = path.join(root, 'factory/status', r.slug + '.json');
  r._done = fs.existsSync(st) ? JSON.parse(fs.readFileSync(st, 'utf8')).state : null;
}
console.log(`BATCH ${b}: ${rows.length} businesses. Pages base: ${cfg.pages_base}`);
console.log(`Skip any with _done set (already built by an earlier run).\n`);
console.log(JSON.stringify(rows, null, 1));
