// Deals each business a design direction so no two sites share a composition.
//   node factory/tools/direction.mjs <slug>            print the dealt direction (deals it if missing)
//   node factory/tools/direction.mjs <slug> --redeal [--prefer A06]   deal again (optionally ask for one archetype that fits the trade better; write why in the brief)
//   node factory/tools/direction.mjs --deal-all        deal every business that has none yet (orchestrator only)
//   node factory/tools/direction.mjs --sheet           table of every dealt direction
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const all = JSON.parse(fs.readFileSync(path.join(root, 'factory/data/prospects.json'), 'utf8'));
const dir = path.join(root, 'factory/directions');
fs.mkdirSync(dir, { recursive: true });

const H = 'hospitality-stay', M = 'marina', T = 'tours-experiences', R = 'real-estate', P = 'professional-services',
  I = 'industrial-b2b', S = 'trade-retail', F = 'food-events', G = 'institution';
const ARCH = {
  A01: { name: 'Magazine feature', fits: [H, M, P, F, G], nav: ['N1', 'N3'], motion: ['M1', 'M3', 'M7'] },
  A02: { name: 'Catalogue index', fits: [S, I, F], nav: ['N2'], motion: ['M8', 'M10'] },
  A03: { name: 'Cinematic chapters', fits: [M, H, T, R], nav: ['N3'], motion: ['M1', 'M7'] },
  A04: { name: 'Swiss information grid', fits: [P, G, I], nav: ['N1', 'N5'], motion: ['M9', 'M7'] },
  A05: { name: 'Chart and map', fits: [T, M, R, H, G], nav: ['N6'], motion: ['M5', 'M9'] },
  A06: { name: 'Object study', fits: [I, S, P], nav: ['N5', 'N4'], motion: ['M4', 'M9'] },
  A07: { name: 'Letter and stationery', fits: [F, H, P], nav: ['N8'], motion: ['M6', 'M3'] },
  A08: { name: 'Fixed split', fits: [R, H, P, M], nav: ['N7'], motion: ['M1', 'M3'] },
  A09: { name: 'Colour poster', fits: [F, T, S, H], nav: ['N4'], motion: ['M6', 'M3'] },
  A10: { name: 'Spec sheet', fits: [I, G, P], nav: ['N5'], motion: ['M9', 'M8'] },
  A11: { name: 'Horizontal journey', fits: [H, T, S, M], nav: ['N9'], motion: ['M2'] },
  A12: { name: 'Service desk', fits: [G, I, P], nav: ['N10'], motion: ['M7', 'M10'] },
  A13: { name: 'Scrapbook history', fits: [F, H, S, M], nav: ['N8', 'N4'], motion: ['M6'] },
  A14: { name: 'Quiet luxury', fits: [M, H, R, P], nav: ['N3'], motion: ['M7', 'M1'] },
};
const LANE = {
  P01: { name: 'Limestone', fits: [H, M, T, R, P, I, S, F, G], cap: 10 },
  P02: { name: 'Shallow flats', fits: [T, H, M], cap: 9 },
  P03: { name: 'Conch pink', fits: [F, H, S], cap: 8 },
  P04: { name: 'Mangrove', fits: [H, T, G, R], cap: 8 },
  P05: { name: 'Night harbour', fits: [T, M, P, F], cap: 8 },
  P06: { name: 'Junkanoo', fits: [F, T, S, G], cap: 7 },
  P07: { name: 'Abaco pine', fits: [H, I, T, G, R], cap: 8 },
  P08: { name: 'Bay Street pastel', fits: [S, P, H, F, G], cap: 8 },
  P09: { name: 'Shipyard steel', fits: [I, P, S], cap: 9 },
  P10: { name: 'Ink and paper', fits: [P, G, I, R], cap: 12 },
  P11: { name: 'Straw market', fits: [S, F, H, I], cap: 7 },
  P12: { name: 'Inagua salt', fits: [G, R, H, P, I], cap: 8 },
  P13: { name: 'Hull and brass', fits: [M, T, R, P], cap: 8 },
  P14: { name: 'Blue hole', fits: [T, I, G, M], cap: 7 },
};
const TYPE = {
  T01: { name: 'Monumental serif', fits: [H, M, R, F, P] },
  T02: { name: 'Text-led editorial', fits: [H, P, G, F, M] },
  T03: { name: 'Swiss grotesk', fits: [I, P, G, S, R] },
  T04: { name: 'Technical mono', fits: [I, G, P, M, T] },
  T05: { name: 'Script and sans', fits: [F, H] },
  T06: { name: 'Wide grotesk', fits: [T, S, I, F, G] },
  T07: { name: 'Slab poster', fits: [F, S, T, I] },
  T08: { name: 'Warm humanist', fits: [H, F, S, T, G] },
  T09: { name: 'Didone fashion', fits: [F, H, R, M] },
  T10: { name: 'Old-style book', fits: [P, H, G, R] },
  T11: { name: 'Neo-grotesk display', fits: [I, S, T, P, G, R] },
  T12: { name: 'Hand and type', fits: [F, H, T, S] },
};
const TYPE_CAP = 9;

const hash = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };
const load = () => Object.fromEntries(fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => [f.slice(0, -5), JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))]));
const count = (ds, key, val, niche) => Object.values(ds).filter(d => d[key] === val && (!niche || d.niche === niche)).length;

function deal(rec, ds, salt = '', prefer = null) {
  const others = Object.fromEntries(Object.entries(ds).filter(([k]) => k !== rec.slug));
  const pick = (table, key, ok, extra = () => 0) => {
    const c = Object.keys(table).filter(k => table[k].fits.includes(rec.niche) && ok(k));
    if (!c.length) throw new Error(`no ${key} fits ${rec.niche}`);
    return c.map(k => [k, count(others, key, k) * 2 + count(others, key, k, rec.niche) * 3 + extra(k) + hash(rec.slug + key + k + salt)]).sort((a, b) => a[1] - b[1])[0][0];
  };
  const archetype = prefer && ARCH[prefer] && count(others, 'archetype', prefer) < 10 ? prefer : pick(ARCH, 'archetype', () => true);
  const pair = (k, key) => Object.values(others).filter(d => d.archetype === archetype && d[key] === k).length * 40;   // same archetype + same lane/type = near-twin, avoid hard
  const lane = pick(LANE, 'lane', k => count(others, 'lane', k) < LANE[k].cap, k => pair(k, 'lane'));
  const type = pick(TYPE, 'type', k => count(others, 'type', k) < TYPE_CAP, k => pair(k, 'type'));
  const navs = ARCH[archetype].nav, motions = ARCH[archetype].motion;
  const least = (arr, key) => arr.map(v => [v, count(others, key, v) + hash(rec.slug + v + salt)]).sort((a, b) => a[1] - b[1])[0][0];
  return { slug: rec.slug, niche: rec.niche, archetype, archetype_name: ARCH[archetype].name, lane, lane_name: LANE[lane].name, type, type_name: TYPE[type].name, nav: least(navs, 'nav'), motion: least(motions, 'motion'), dealt_at: new Date().toISOString() };
}
const save = d => fs.writeFileSync(path.join(dir, d.slug + '.json'), JSON.stringify(d, null, 1));
const show = d => {
  console.log(`DIRECTION for ${d.slug} (${d.niche})
  Archetype : ${d.archetype} ${d.archetype_name}
  Palette   : ${d.lane} ${d.lane_name}
  Type      : ${d.type} ${d.type_name}
  Navigation: ${d.nav}
  Motion    : ${d.motion}
Read .claude/skills/art-director/references/archetypes.md (${d.archetype}, ${d.nav}, ${d.motion}), palettes.md (${d.lane}), type-systems.md (${d.type}). Build exactly this.`);
};

const a = process.argv.slice(2);
if (a[0] === '--deal-all') {
  const ds = load();
  for (const r of all) if (!ds[r.slug]) { ds[r.slug] = deal(r, ds); save(ds[r.slug]); }
  console.log('dealt', Object.keys(ds).length);
} else if (a[0] === '--sheet') {
  const ds = load();
  for (const d of Object.values(ds)) console.log([d.slug.padEnd(42), d.niche.padEnd(22), d.archetype, d.lane, d.type, d.nav, d.motion].join(' '));
  for (const key of ['archetype', 'lane', 'type']) { const m = {}; Object.values(ds).forEach(d => m[d[key]] = (m[d[key]] || 0) + 1); console.log(key, JSON.stringify(m)); }
} else if (a[0]) {
  const r = all.find(x => x.slug === a[0]); if (!r) { console.error('unknown slug'); process.exit(1); }
  const ds = load();
  if (!ds[r.slug] || a.includes('--redeal')) { const pi = a.indexOf('--prefer'); const d = deal(r, ds, a.includes('--redeal') ? 'redeal' + Date.now() : '', pi > 0 ? a[pi + 1] : null); save(d); show(d); } else show(ds[r.slug]);
} else { console.error('usage: direction.mjs <slug> [--redeal] | --deal-all | --sheet'); process.exit(1); }
