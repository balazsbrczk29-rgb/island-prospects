import { useMemo, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ISLANDS, LISTINGS, OFFICE, TEAM, short, type Listing } from './data';
import { MAP_GROUPS, MAP_VIEWBOX } from './map-data';
import { mailto } from './site';

export type Mode = 'Buy' | 'Rent';
export type Kind = 'any' | 'home' | 'land' | 'commercial';
export type Search = { mode: Mode; kind: Kind; band: number; island: string };
export const START: Search = { mode: 'Buy', kind: 'any', band: 0, island: 'any' };

const KINDS: Record<Mode, [Kind, string][]> = {
  Buy: [['any', 'Any type'], ['home', 'Home or condo'], ['land', 'Land'], ['commercial', 'Commercial']],
  Rent: [['any', 'Any type'], ['home', 'Home or condo'], ['commercial', 'Commercial']],
};
const BANDS: Record<Mode, [string, number, number][]> = {
  Buy: [['Any price', 0, Infinity], ['Under $250,000', 0, 250000], ['$250,000 to $750,000', 250000, 750000], ['Over $750,000', 750000, Infinity]],
  Rent: [['Any rent', 0, Infinity], ['Under $3,000 a month', 0, 3000], ['$3,000 to $6,000 a month', 3000, 6000], ['Over $6,000 a month', 6000, Infinity]],
};
export const bandLabel = (s: Search) => (s.band ? BANDS[s.mode][s.band][0] : '');
export const kindLabel = (s: Search) => (s.kind === 'any' ? '' : KINDS[s.mode].find(k => k[0] === s.kind)![1]);

const LIVE = LISTINGS.filter(l => l.status !== 'Sold');
function fits(l: Listing, s: Search, ignoreIsland = false) {
  const [, lo, hi] = BANDS[s.mode][s.band];
  return (s.mode === 'Buy' ? l.status === 'For sale' : l.status === 'To rent')
    && (s.kind === 'any' || l.type === s.kind)
    && l.value >= lo && l.value < hi
    && (ignoreIsland || s.island === 'any' || l.island === s.island);
}
export const countsFor = (s: Search) => {
  const c: Record<string, number> = {};
  for (const l of LIVE) if (fits(l, s, true)) c[l.island] = (c[l.island] || 0) + 1;
  return c;
};

/* Label placement in map units (viewBox ~633 x 614). */
const LABEL: Record<string, [number, number, 'start' | 'middle' | 'end']> = {
  'Grand Bahama and Freeport': [100, 60, 'middle'], 'Great Abaco and Little Abaco': [238, 98, 'start'], Bimini: [14, 208, 'start'],
  'Berry Islands': [178, 176, 'start'], Andros: [104, 300, 'end'], 'New Providence and Paradise Island': [196, 224, 'middle'],
  Eleuthera: [334, 226, 'start'], 'Great Exuma and Little Exuma': [312, 402, 'end'], 'Cat Island and Cat Cay': [392, 300, 'start'],
  'San Salvador': [482, 342, 'start'], 'Rum Cay': [448, 382, 'start'], 'Long Island': [430, 432, 'start'],
  'Acklins and Crooked Island': [548, 556, 'middle'], Mayaguana: [604, 534, 'middle'], Inagua: [530, 642, 'end'], 'Ragged Island': [366, 530, 'start'],
};

/** The chart: Natural Earth outlines, every island group they serve. Pointer-only; the Island select is its keyboard twin. */
export function Chart({ search, onIsland, compact = false }: { search: Search; onIsland: (n: string) => void; compact?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const counts = useMemo(() => countsFor(search), [search]);
  const sig = Object.entries(counts).map(e => e.join(':')).join('|') + search.mode + search.kind + search.band;
  const pick = (e: MouseEvent<SVGSVGElement>) => {
    const hit = (e.target as Element).closest('[data-g]');
    if (hit) return onIsland(hit.getAttribute('data-g')!);
    const svg = ref.current!; const m = svg.getScreenCTM(); if (!m) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const reach = 44 / m.a;
    let best = '', bd = Infinity;
    for (const g of MAP_GROUPS) { const d = Math.hypot(g.cx - pt.x, g.cy - pt.y); if (d < bd) { bd = d; best = g.name; } }
    if (bd <= reach) onIsland(best);
  };
  return (
    <svg ref={ref} className={`chart ${compact ? 'compact' : ''}`} viewBox={MAP_VIEWBOX} preserveAspectRatio="xMidYMid meet" onClick={pick} aria-hidden="true">
      {MAP_GROUPS.map(g => (
        <path key={g.name} data-g={g.name} d={g.d} className={`isle ${search.island === g.name ? 'on' : ''} ${counts[g.name] ? 'has' : ''}`} />
      ))}
      <g key={sig} className="glow" aria-hidden="true">
        {MAP_GROUPS.filter(g => counts[g.name]).map(g => <path key={g.name} d={g.d} />)}
      </g>
      {MAP_GROUPS.map(g => {
        const [x, y, a] = LABEL[g.name]; const n = counts[g.name] || 0; const on = search.island === g.name;
        return (
          <text key={g.name} x={x} y={y} textAnchor={a} className={`lab ${on ? 'on' : ''} ${n ? 'has' : ''}`}>
            {short(g.name)}{n > 0 && <tspan className="n" dx="5">{n}</tspan>}
          </text>
        );
      })}
    </svg>
  );
}

const LANA = TEAM[0];
function viewingLinks(l: Listing) {
  const line = `${l.title}, ${l.area}, ${short(l.island)} (MLS #${l.id}, ${l.price}${l.priceNote ? ' ' + l.priceNote : ''})`;
  return {
    tel: `tel:${LANA.tel}`,
    wa: `https://wa.me/${LANA.tel.replace('+', '')}?text=${encodeURIComponent(`Hello Lana, I would like to view ${line}.`)}`,
    mail: mailto(`Viewing request: ${l.title} (#${l.id})`, `Hello Bahamas Choice,\n\nI would like to view ${line}.\n\nName:\nPhone or WhatsApp:\nWhen suits me:\n`) + `&cc=${encodeURIComponent(LANA.email!)}`,
  };
}

export function ListingCard({ l, onHover, wide = false }: { l: Listing; onHover?: (k: string | null) => void; wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const p = l.photos[0]; const links = viewingLinks(l);
  const facts = l.beds ? `${l.beds} bed, ${l.baths} bath, ${l.size}` : l.size;
  return (
    <article className={`card ${wide ? 'wide' : ''}`} onMouseEnter={() => onHover?.(`l${l.id}`)} onMouseLeave={() => onHover?.(null)} onFocus={() => onHover?.(`l${l.id}`)}>
      <a href={l.page} className="card-photo" aria-label={`${l.title}, ${l.price}${l.priceNote ? ' ' + l.priceNote : ''}`}>
        <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
      </a>
      <p className="card-price num">{l.price}{l.priceNote && <span> {l.priceNote}</span>}</p>
      <h3 className="card-title">{l.title}</h3>
      <p className="card-facts num">{facts}</p>
      <p className="card-place">{l.area}, {short(l.island)}</p>
      <p className="card-who">Lana answers, <span className="num">{LANA.phone}</span></p>
      <button type="button" className="card-ask" aria-expanded={open} onClick={() => setOpen(o => !o)} onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
        Ask for a viewing
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="card-sheet" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}>
            <p>Lana Munnings-Basalyga, Principal Broker. Your message carries the MLS number.</p>
            <div className="sheet-links">
              <a href={links.tel} className="num">Call</a>
              <a href={links.wa} rel="noopener">WhatsApp</a>
              <a href={links.mail}>Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/** The core tool: Buy or Rent, type, price, island (chart + select), and the live matches. */
export function Finder({ search, setSearch, onHover, onSendSearch }: {
  search: Search; setSearch: (s: Search) => void; onHover: (k: string | null) => void; onSendSearch: () => void;
}) {
  const reduce = useReducedMotion();
  const shown = LIVE.filter(l => fits(l, search));
  const where = search.island === 'any' ? 'across the islands' : `on ${short(search.island)}`;
  const set = (p: Partial<Search>) => setSearch({ ...search, ...p });
  return (
    <div className="finder" role="search" aria-label="Find a property">
      <div className="finder-top">
      <div className="seg" role="group" aria-label="Buy or rent">
          {(['Buy', 'Rent'] as Mode[]).map(m => (
            <button key={m} type="button" aria-pressed={search.mode === m} onClick={() => set({ mode: m, kind: 'any', band: 0 })}>{m}</button>
          ))}
        </div>
        <p className="count" aria-live="polite">
          <span className="num n">{shown.length}</span> {shown.length === 1 ? 'listing' : 'listings'} {where}
          {(search.island !== 'any' || search.kind !== 'any' || search.band > 0 || search.mode !== 'Buy') ? <button type="button" className="clear" onClick={() => setSearch(START)}>Clear</button> : null}
        </p>
      </div>
      <div className="selects">
        <label><span className="sr-only">Island</span>
          <select value={search.island} onChange={e => set({ island: e.target.value })}>
            <option value="any">Any island</option>
            {ISLANDS.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
          </select>
        </label>
        <label><span className="sr-only">Type</span>
          <select value={search.kind} onChange={e => set({ kind: e.target.value as Kind })}>
            {KINDS[search.mode].map(([k, t]) => <option key={k} value={k}>{t}</option>)}
          </select>
        </label>
        <label><span className="sr-only">Price</span>
          <select value={search.band} onChange={e => set({ band: Number(e.target.value) })}>
            {BANDS[search.mode].map(([t], i) => <option key={t} value={i}>{t}</option>)}
          </select>
        </label>
      </div>
      <div className="track" tabIndex={0} aria-label="Matching listings">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((l, i) => (
            <motion.div key={l.id} layout={!reduce} initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.32, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] } }} exit={{ opacity: 0, y: reduce ? 0 : 8, transition: { duration: 0.15 } }}>
              <ListingCard l={l} onHover={onHover} />
            </motion.div>
          ))}
          {shown.length === 0 && (
            <motion.div key="empty" className="empty" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.32 } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <p className="empty-line">Nothing {where} matches today.</p>
              <p className="muted">Send this search to the office. One of the team reads it and replies personally.</p>
              <div className="actions">
                <button type="button" className="btn btn-primary" onClick={onSendSearch}>Send this search</button>
                <button type="button" className="link plain" onClick={() => setSearch(START)}>Clear filters</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="inline-chart"><p className="chart-cap">Or tap an island.</p><Chart search={search} onIsland={n => set({ island: search.island === n ? 'any' : n })} compact /></div>
      <p className="finder-foot">Listings from the Bahamas MLS for {OFFICE.name}, checked 22 November 2026.</p>
    </div>
  );
}
