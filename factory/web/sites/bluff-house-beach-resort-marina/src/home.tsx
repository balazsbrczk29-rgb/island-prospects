import { StrictMode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import './styles.css';

// Facts from bluffhouse.com (home, /room-type-and-rates, /private-cottages, /marina-rates, /a-little-history), checked 2026-11-05, 2026-11-21 and 2026-11-22.
const W = 'https://static.wixstatic.com/media/';
type Pic = { src: string; w: number; h: number; alt: string };
const wix = (id: string, w: number, h: number, alt: string, al = 'c'): Pic => ({ src: `${W}${id}/v1/fill/w_${w},h_${h},al_${al},q_80,enc_avif,quality_auto/${id}`, w, h, alt });
const raw = (id: string, w: number, h: number, alt: string): Pic => ({ src: W + id, w, h, alt });

const HERO = {
  // Cropped by Wix to the frame's own proportion (about 1:1 on desktop), so the browser never crops them again.
  upper: wix('5c5976_17ae16c3cdb94ff08128144740eb6b00f000.jpg', 1080, 1080, 'Bluff House suites stepping down the bluff to the Sea of Abaco, palms below', 'r'),
  lower: wix('5c5976_77c8eb03fd5a483e8052b2b833d2edff~mv2.jpg', 1200, 1200, 'A lower suite porch opening onto the water through sea grape'),
  cottage: wix('5c5976_a09cf38a6dc3489080c5591cccda567c~mv2.jpg', 1200, 1200, 'A Bluff House villa among the palms above White Sound'),
  sea: wix('5c5976_cd07c1191ea14bd8bee1baad32ba7ed7~mv2.jpg', 1200, 1200, 'The Bluff House docks in White Sound'),
};
const CAPTION = {
  upper: 'The suites step down the bluff to the Sea of Abaco.',
  lower: 'A lower suite porch, the water a few steps from the door.',
  cottage: 'One of nine private villas and cottages in the grounds over White Sound.',
  sea: 'The docks in White Sound, through the dredged 7 ft channel.',
};
const PH = {
  upperBalcony: wix('5c5976_4d430b71b1694947902404f615c7b9f8~mv2.jpg', 960, 640, 'An upper suite balcony with two Adirondack chairs over the Sea of Abaco'),
  lowerPorch: wix('5c5976_77c8eb03fd5a483e8052b2b833d2edff~mv2.jpg', 960, 640, 'A lower suite porch opening onto the water through sea grape'),
  upperRoom: wix('5c5976_6b9dd005f8f243c8af937a9b727d5914~mv2.jpg', 960, 640, 'An upper king suite with a vaulted ceiling and French doors to the balcony'),
  lowerRoom: wix('5c5976_ebd836a292384a7193593c0c11727400~mv2.jpg', 960, 640, 'A lower queen suite with a white bed and a sitting area'),
  boathouse: wix('5c5976_0a65c2bd573346e78cf9d2b617f7ba83~mv2.jpg', 1600, 1131, 'The Boathouse Bar and Restaurant, a yellow building with a harbourside deck'),
  beachbar: raw('5c5976_8fdda870133a479eb566d3b5331ea44f~mv2.png', 1024, 777, 'The Tranquil Turtle Beach Bar deck with blue umbrellas and a signpost'),
  marina: raw('5c5976_89c8828c6a3443d9a742a1cd5670bab8~mv2.jpg', 1024, 576, 'Boats at the Bluff House marina docks in White Sound'),
};
const BOOK = 'https://us2.cloudbeds.com/reservation/McFW6d';
const DOCKWA = 'https://dockwa.com/explore/destination/wgcegn-bluff-house-resort-and-marina';
const WA = 'https://wa.me/12428249550';
const MAIL = 'frontdesk@bluffhouse.com';
const TOURS = { upper: [['Upper king', 'Amf488kFa2y'], ['Upper two queens', 'WkKaQ8ARQGa']], lower: [['Lower queen', 'UA8BiUn1Y3d'], ['Lower two queens', 'PQ7XoL7eokU']] } as const;
const COTTAGES: { name: string; beds: string; id: string; page: string; note?: string }[] = [
  { name: 'Summerset', beds: 'Studio, 1 bath', id: '5c5976_8dc53b4761ba46459056624f7db1a5f8~mv2.jpg', page: 'summerset' },
  { name: 'La Conchita', beds: '1 bedroom, 1 bath', id: '5c5976_e0a8b34d7db7428e946ddb2881bd3343~mv2.jpg', page: 'la-conchita' },
  { name: 'Turtle Bluff Villa', beds: '2 bedrooms, 2.5 baths', id: '5c5976_5ea59c39cdb94a04927674201bd1b25f~mv2.jpg', page: 'turtle-bluff-villa' },
  { name: 'Pineapple House', beds: '2 bedrooms, 2.5 baths', id: '5c5976_a09cf38a6dc3489080c5591cccda567c~mv2.jpg', page: 'pineapplehousevilla' },
  { name: 'Sweet Guava Villa', beds: '3 bedrooms, 3 baths', id: '5c5976_f06f9c739a14454bbf9c170fd9b0fccf~mv2.jpg', page: 'sweet-guava-villa' },
  { name: 'Blue Bay Cottage', beds: '3 bedrooms, 3.5 baths', id: '5c5976_473c5552483248c9bb5088c48797c72d~mv2.jpg', page: 'blue-bay-cottage' },
  { name: 'Dove Cottage', beds: '3 bedrooms, 3.5 baths', id: '5c5976_b5f37014ae8741dd9cce07c575ce5a1c~mv2.jpg', page: 'dove-cottage' },
  { name: 'Coral Haven', beds: '3 bedrooms, 3.5 baths', id: 'a02d4c_388a4b0aa746403cbbbdb3d7121e901e~mv2.jpg', page: 'coral-haven' },
  { name: 'Sunset Cottage 4', beds: '4 bedrooms, 5 baths', id: '5c5976_15514a4eb83a4ab0b0825a5db4844db1~mv2.jpg', page: 'sunset-cottage-4', note: '$600 to $1,000 a night' },
];

// ---------- dates and published rates ----------
const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const parse = (s: string) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null; };
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 864e5);
const mdOf = (d: Date) => (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
const fmtDay = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const money = (n: number, cents = false) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });

type RoomSeason = { name: string; upper: number; lower: number; from: boolean };
// bluffhouse.com/room-type-and-rates, nightly, upper / lower. Closed 3 September to 31 October.
function roomSeason(d: Date): RoomSeason | null {
  const md = mdOf(d);
  if (md >= 1218 || md <= 107) return { name: 'Christmas season', upper: 370, lower: 320, from: false };
  if (md <= 229) return { name: 'Winter season', upper: 290, lower: 240, from: true };
  if (md <= 531) return { name: 'Spring season', upper: 370, lower: 320, from: false };
  if (md <= 807) return { name: 'Summer season', upper: 390, lower: 350, from: false };
  if (md <= 902) return { name: 'End of season', upper: 290, lower: 240, from: true };
  if (md <= 1031) return null;
  return { name: 'Fall season', upper: 290, lower: 240, from: true };
}
type DockSeason = { name: string; daily: number; weekly: number | null };
// bluffhouse.com/marina-rates, last published for the 2024 to 2025 seasons, per foot per night, 30 ft minimum, plus 10% VAT.
function dockSeason(d: Date): DockSeason | null {
  const md = mdOf(d);
  if (md >= 1220 || md <= 103) return { name: 'Holiday season', daily: 2.5, weekly: 2.25 };
  if (md <= 229) return { name: 'Winter season', daily: 2, weekly: 1.75 };
  if (md <= 531) return { name: 'Spring season', daily: 2.5, weekly: 2.25 };
  if (md <= 806) return { name: 'Summer season', daily: 3.5, weekly: null };
  if (md <= 901) return { name: 'Late summer', daily: 2.5, weekly: 2.25 };
  if (md <= 1026) return null;
  return { name: 'Fall season', daily: 2, weekly: 1.75 };
}

type Level = 'upper' | 'lower';
function stayQuote(arrive: Date, nights: number, level: Level) {
  let total = 0, from = false; const names = new Set<string>(); let rate = 0;
  for (let i = 0; i < nights; i++) { const s = roomSeason(addDays(arrive, i)); if (!s) return null; total += s[level]; rate = s[level]; from ||= s.from; names.add(s.name); }
  return { total, from, seasons: [...names], rate };
}
function dockQuote(arrive: Date, nights: number, loa: number) {
  const feet = Math.max(30, Math.ceil(loa)); let dockage = 0; const names = new Set<string>(); const byRate = new Map<number, number>(); let weekly = false;
  for (let i = 0; i < nights; i++) {
    const s = dockSeason(addDays(arrive, i)); if (!s) return null;
    const useWeekly = nights >= 7 && s.weekly !== null; const rate = useWeekly ? s.weekly! : s.daily; weekly ||= useWeekly;
    dockage += feet * rate; names.add(s.name); byRate.set(rate, (byRate.get(rate) ?? 0) + 1);
  }
  dockage = Math.round(dockage * 100) / 100; const vat = Math.round(dockage * 10) / 100;
  return { feet, dockage, vat, total: dockage + vat, weekly, seasons: [...names], byRate: [...byRate.entries()] };
}
const openForStay = (arrive: Date, nights: number) => { for (let i = 0; i < nights; i++) if (!roomSeason(addDays(arrive, i))) return false; return true; };
function defaultArrival() {
  const t = new Date(); let d = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 2, 15));
  if (!roomSeason(d)) d = new Date(Date.UTC(d.getUTCFullYear(), 10, 1));
  return iso(d);
}
const bookUrl = (a: Date, n: number) => `${BOOK}#checkin=${iso(a)}&checkout=${iso(addDays(a, n))}`;

// ---------- shared planner state ----------
type Mode = 'air' | 'sea';
type Stay = 'upper' | 'lower' | 'cottage';
type Plan = { date: string; setDate: (s: string) => void; nights: number; setNights: (n: number) => void; mode: Mode; setMode: (m: Mode) => void; stay: Stay; setStay: (s: Stay) => void; loa: string; setLoa: (s: string) => void; draft: string; setDraft: (s: string) => void };
const Ctx = createContext<Plan | null>(null);
const usePlan = () => useContext(Ctx)!;
function PlanProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState(defaultArrival);
  const [nights, setN] = useState(5);
  const [mode, setMode] = useState<Mode>('air');
  const [stay, setStay] = useState<Stay>('upper');
  const [loa, setLoa] = useState('42');
  const [draft, setDraft] = useState('5.5');
  const setNights = (n: number) => setN(Math.min(21, Math.max(1, n)));
  return <Ctx.Provider value={{ date, setDate, nights, setNights, mode, setMode, stay, setStay, loa, setLoa, draft, setDraft }}>{children}</Ctx.Provider>;
}

function Ticker({ value, cents = false }: { value: number; cents?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null); const prev = useRef(value); const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduce) { el.textContent = money(value, cents); prev.current = value; return; }
    const c = animate(prev.current, value, { duration: 0.42, ease: [0.22, 1, 0.36, 1], onUpdate: v => { el.textContent = money(cents ? v : Math.round(v), cents); } });
    prev.current = value; return () => c.stop();
  }, [value, cents, reduce]);
  return <span ref={ref} className="num">{money(value, cents)}</span>;
}

// ---------- screen 1: the plate and the sentence ----------
function Plate() {
  const { mode, stay } = usePlan(); const reduce = useReducedMotion();
  const key = mode === 'sea' ? 'sea' : stay; const p = HERO[key]; const dir = mode === 'sea' ? 1 : -1;
  return (
    <figure className="plate">
      <div className="frame">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div key={key} className="slide"
            initial={reduce ? { opacity: 0 } : { x: `${dir * 100}%` }} animate={reduce ? { opacity: 1 } : { x: '0%' }} exit={reduce ? { opacity: 0 } : { opacity: 1, transition: { duration: 0.9 } }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ zIndex: 1 }}>
            <motion.img src={p.src} alt={p.alt} width={p.w} height={p.h} fetchPriority="high" decoding="async"
              initial={reduce ? false : { x: `${-dir * 100}%`, scale: 1.06 }} animate={{ x: '0%', scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.figcaption key={key} className="cap" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>{CAPTION[key]}</motion.figcaption>
      </AnimatePresence>
    </figure>
  );
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" className="choice" aria-pressed={on} onClick={onClick}>{children}</button>;
}

function Planner() {
  const P = usePlan();
  const arrive = parse(P.date);
  const loa = parseFloat(P.loa), draft = parseFloat(P.draft);
  const ok = !!arrive && (P.mode === 'air' || (loa >= 10 && loa <= 250 && draft > 0 && draft <= 20));
  const last = useRef<React.ReactNode>(null);
  const clause = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4, transition: { duration: 0.12 } }, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } };

  let result: React.ReactNode = null;
  if (ok && arrive) {
    const leave = addDays(arrive, P.nights);
    if (P.mode === 'air' && P.stay !== 'cottage') {
      const q = stayQuote(arrive, P.nights, P.stay);
      result = q ? (
        <>
          <p className="total">{q.from ? <small style={{ marginLeft: 0, marginRight: 8 }}>from</small> : null}<Ticker value={q.total} /><small>for {P.nights} night{P.nights > 1 ? 's' : ''}, before taxes</small></p>
          <p>{q.seasons.length > 1 ? `Your nights fall across the ${q.seasons.join(' and ')}.` : `${q.seasons[0]}, ${q.from ? 'from ' : ''}${money(q.rate)} a night in ${P.stay === 'upper' ? 'an upper' : 'a lower'} suite.`} {fmtDay(arrive)} to {fmtDay(leave)}.</p>
          <div className="row">
            <a className="btn" href={bookUrl(arrive, P.nights)} target="_blank" rel="noopener">Book on Cloudbeds</a>
            <a className="tlink" href={`https://my.matterport.com/show/?m=${TOURS[P.stay][0][1]}`} target="_blank" rel="noopener">Walk the suite in 3D</a>
          </div>
          <p className="note">Plus the 6% BOIPB levy, 6% service charge and 10% VAT. Rates as published by Bluff House, subject to change.</p>
        </>
      ) : null;
    } else if (P.mode === 'air') {
      const body = `Hello Bluff House, we would like a quote for a cottage or villa, arriving ${fmtDay(arrive)} for ${P.nights} nights.`;
      result = openForStay(arrive, P.nights) ? (
        <>
          <p className="total" style={{ fontSize: 'clamp(2rem, 2.8vw, 2.6rem)' }}>$270 to $650<small>a night, by house</small></p>
          <p>Nine houses from a studio to four bedrooms, each priced for your dates. Sunset Cottage 4 runs $600 to $1,000 a night.</p>
          <div className="row">
            <a className="btn" href={`mailto:${MAIL}?subject=${encodeURIComponent('Cottage quote')}&body=${encodeURIComponent(body)}`}>Ask for a cottage quote</a>
            <a className="tlink" href={bookUrl(arrive, P.nights)} target="_blank" rel="noopener">Or check them on Cloudbeds</a>
          </div>
          <p className="note">Guests in the cottages have the full resort: the private beach, the pool, the Boathouse and the Tranquil Turtle.</p>
        </>
      ) : null;
    } else {
      const q = dockQuote(arrive, P.nights, loa);
      const fit = draft <= 6 ? 'Clears the 7 ft channel at mean low water with a foot or more to spare.' : draft <= 7 ? 'Tight at mean low water. Time your entry on a rising tide and call the dockmaster.' : 'Draws more than the channel at mean low water. Call the dockmaster before you plan.';
      const keel = Math.min(10, Math.max(0, draft)) / 10;
      result = q ? (
        <>
          <div className="fit">
            <div>
              <p className="total"><Ticker value={q.total} cents /><small>dockage, {P.nights} night{P.nights > 1 ? 's' : ''}, with VAT</small></p>
              <p className="num" style={{ marginTop: 12 }}>{q.seasons.join(' and ')}{q.weekly ? ', weekly rate' : ''}. {q.feet} ft{loa < 30 ? ' (30 ft minimum)' : ''} at {q.byRate.map(([r, n]) => q.byRate.length > 1 ? `${money(r, true)} for ${n} night${n > 1 ? 's' : ''}` : `${money(r, true)} a foot a night`).join(', ')}: {money(q.dockage, true)} plus {money(q.vat, true)} VAT.</p>
              <p style={{ marginTop: 12 }}>{fit}</p>
            </div>
            <div className="gauge" aria-hidden="true">
              <span className="surf">0 ft</span>
              <div className="chan"><span>7 ft MLW</span></div>
              <div className="keel" style={{ transform: `translateY(${keel * 120 - 4}px)` }}><span className="num">{draft} ft</span></div>
            </div>
          </div>
          <div className="row">
            <a className="btn" href={DOCKWA} target="_blank" rel="noopener">Reserve on Dockwa</a>
            <a className="tlink" href={`${WA}?text=${encodeURIComponent(`Hello Bluff House marina, a ${Math.round(loa)} ft boat drawing ${draft} ft, arriving ${fmtDay(arrive)} for ${P.nights} nights.`)}`} target="_blank" rel="noopener">Message the dockmaster</a>
          </div>
          <p className="note">Last published dockage for the 2024 to 2025 seasons; confirm on Dockwa. Power $0.85 a kWh and water $0.35 a gallon, metered.</p>
        </>
      ) : null;
    }
    if (result === null) {
      result = (
        <>
          <p className="total" style={{ fontSize: 'clamp(1.8rem, 2.4vw, 2.2rem)', color: 'var(--ink)' }}>Closed for the season on those nights.</p>
          <p>{P.mode === 'sea' ? 'The marina closes for maintenance from 2 September to 26 October.' : 'Bluff House closes from 3 September to 31 October.'} Try an arrival from {P.mode === 'sea' ? '27 October' : '1 November'}.</p>
          <div className="row"><a className="btn" href={`mailto:${MAIL}`}>Ask the front desk</a></div>
        </>
      );
    }
    last.current = result;
  }

  return (
    <div className="desk">
      <p className="no">No. 1 &middot; Stay or dock</p>
      <h1>A balcony over the Sea of Abaco, or a slip in White&nbsp;Sound.</h1>
      <div className="sentence">
        <span className="line">We arrive on <label className="field datef"><span className="sr-only">Arrival date</span><span aria-hidden="true">{arrive ? `${fmtDay(arrive)} ${arrive.getUTCFullYear()}` : 'choose a date'}</span><input type="date" value={P.date} onChange={e => P.setDate(e.target.value)} onClick={e => { try { (e.currentTarget as HTMLInputElement).showPicker(); } catch { /* older browsers open on focus */ } }} /></label></span>
        <span className="line">for <button type="button" className="step" aria-label="One night fewer" onClick={() => P.setNights(P.nights - 1)}>&minus;</button><span className="field num" aria-live="polite"><span style={{ minWidth: '1.2em', textAlign: 'center' }}>{P.nights}</span></span><button type="button" className="step" aria-label="One night more" onClick={() => P.setNights(P.nights + 1)}>+</button> night{P.nights > 1 ? 's' : ''}, <span className="nw">by <Choice on={P.mode === 'air'} onClick={() => P.setMode('air')}>air</Choice> <span className="or">or</span> <Choice on={P.mode === 'sea'} onClick={() => P.setMode('sea')}>sea</Choice>,</span></span>
        <AnimatePresence mode="wait" initial={false}>
          {P.mode === 'air' ? (
            <motion.span key="air" className="line" {...clause}>and stay in <Choice on={P.stay === 'upper'} onClick={() => P.setStay('upper')}>an upper suite</Choice>, <Choice on={P.stay === 'lower'} onClick={() => P.setStay('lower')}>a lower suite</Choice> <span className="or">or</span> <Choice on={P.stay === 'cottage'} onClick={() => P.setStay('cottage')}>a&nbsp;cottage</Choice>.</motion.span>
          ) : (
            <motion.span key="sea" className="line" {...clause}>on a boat of <label className="field"><span className="sr-only">Length overall in feet</span><input type="number" inputMode="decimal" min={10} max={250} value={P.loa} onChange={e => P.setLoa(e.target.value)} /><span className="unit">ft</span></label> that draws <label className="field"><span className="sr-only">Draft in feet</span><input type="number" inputMode="decimal" step={0.5} min={1} max={20} value={P.draft} onChange={e => P.setDraft(e.target.value)} /><span className="unit">ft</span></label>.</motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className={`result ${ok ? '' : 'dim'}`} aria-live="polite">
        {ok ? result : last.current}
        {!ok ? <p className="note" style={{ opacity: 1 }}>Enter a date{P.mode === 'sea' ? ', your length and your draft in feet' : ''} to see your numbers.</p> : null}
      </div>
    </div>
  );
}

// ---------- screen 2: where you sleep ----------
function Rooms() {
  const P = usePlan(); const arrive = parse(P.date);
  const href = arrive ? bookUrl(arrive, P.nights) : BOOK;
  const suites: { level: Level; name: string; view: string; pics: Pic[] }[] = [
    { level: 'upper', name: 'Upper suite', view: 'Perched above the shoreline: the long view of the Sea of Abaco, sunset and moonrise from the balcony.', pics: [PH.upperBalcony, PH.upperRoom] },
    { level: 'lower', name: 'Lower suite', view: 'Up close and waterfront: the Sea of Abaco right from your doorstep.', pics: [PH.lowerPorch, PH.lowerRoom] },
  ];
  return (
    <section className="sec wrap" id="rooms" aria-labelledby="rooms-h">
      <div className="sec-head">
        <div><p className="no">No. 2 &middot; Where you sleep</p><h2 id="rooms-h">Eight suites on the water, nine houses in the&nbsp;garden.</h2></div>
        <p className="muted">Twelve acres of palms and pines from White Sound to the Sea of Abaco, with the only private beach on Green Turtle Cay. Every suite has a balcony or porch on the water, air conditioning, a king or two queens, a mini fridge and a coffee maker. Prices follow the dates you chose above.</p>
      </div>
      <div className="suites">
        {suites.map(su => {
          const q = arrive ? stayQuote(arrive, P.nights, su.level) : null;
          return (
            <article className="suite" key={su.level}>
              <div className="pair">{su.pics.map(p => <img key={p.src} src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />)}</div>
              <div className="suite-txt">
                <h3>{su.name}</h3>
                <p className="muted">{su.view}</p>
                <p className="rate">{q ? <><strong className="num">{q.from ? 'from ' : ''}{money(q.total)}</strong> for your {P.nights} night{P.nights > 1 ? 's' : ''}, before taxes</> : <>Closed on your dates</>}</p>
                <div className="acts"><a className="btn" href={href} target="_blank" rel="noopener">Book this suite</a>{TOURS[su.level].map(([l, id]) => <a key={id} className="tlink" href={`https://my.matterport.com/show/?m=${id}`} target="_blank" rel="noopener">3D: {l.toLowerCase()}</a>)}</div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="rooms-sub"><h3>The cottages and villas</h3><p className="muted num">$270 to $650 a night by house, Sunset Cottage 4 $600 to $1,000. Each one quoted for your dates, with the whole resort a short walk away.</p></div>
      <ul className="cots">
        {COTTAGES.map(c => {
          const p = wix(c.id, 640, 640, `${c.name} at Bluff House`);
          const body = `Hello Bluff House, we would like a quote for ${c.name}${arrive ? `, arriving ${fmtDay(arrive)} for ${P.nights} nights` : ''}.`;
          return (
            <li className="cot" key={c.name}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
              <div>
                <h4>{c.name}</h4><p className="muted">{c.beds}{c.note ? `, ${c.note}` : ''}</p>
                <p className="links"><a className="tlink" href={`mailto:${MAIL}?subject=${encodeURIComponent(c.name)}&body=${encodeURIComponent(body)}`}>Ask for a quote</a><a className="tlink" href={`https://www.bluffhouse.com/${c.page}`} target="_blank" rel="noopener">See inside</a></p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ---------- screen 3: marina ----------
function Marina() {
  const specs: [string, string][] = [
    ['Channel', '7 ft at mean low water, dredged'], ['Slips', '40, each with its own finger pier'], ['Shore power', '50 and 100 amp'], ['At every slip', 'Power, water and free Wi-Fi'],
    ['Decking', 'More than 12,000 sq ft'], ['Ashore', 'Showers, laundry, pool, beach'], ['Arriving', 'The dockmaster meets and assists'], ['Ferry', 'Pick-up and drop-off at the dock'],
  ];
  const rows: [string, string, string, string, string][] = [
    ['Holiday', '20 Dec to 3 Jan', '$2.50', '$2.25', '$3.50'], ['Winter', '4 Jan to 28 Feb', '$2.00', '$1.75', '$2.75'], ['Spring', '1 Mar to 31 May', '$2.50', '$2.25', '$3.50'],
    ['Summer', '1 Jun to 6 Aug', '$3.50', 'none', '$3.75'], ['Late summer', '7 Aug to 1 Sep', '$2.50', '$2.25', '$3.50'], ['Fall', '27 Oct to 19 Dec', '$2.00', '$1.75', '$3.00'],
  ];
  return (
    <section className="sec marina" id="marina" aria-labelledby="ma-h">
      <div className="wrap ma">
        <div className="intro">
          <p className="no">No. 3 &middot; The marina</p>
          <h2 id="ma-h">Forty slips, seven feet at low&nbsp;water.</h2>
          <p>From the Sea of Abaco a dredged channel leads into White Sound. Every boat gets its own dock space and finger pier, the dockmaster meets you, and the Boathouse bar looks over the docks.</p>
          <a className="btn" href={DOCKWA} target="_blank" rel="noopener">Reserve a slip on Dockwa</a>
          <img src={PH.marina.src} alt={PH.marina.alt} width={PH.marina.w} height={PH.marina.h} loading="lazy" decoding="async" />
        </div>
        <div>
          <dl className="specs">{specs.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
          <div className="rates">
            <h3>Last published dockage, 2024 to 2025 seasons</h3>
            <p className="muted" style={{ marginTop: 8, fontSize: 'var(--t-cap)' }}>Per foot per night. 30 ft minimum, plus 10% VAT. T-head $4.00 a foot all year. Closed for maintenance from early September to late October.</p>
            <div className="tablewrap">
              <table>
                <thead><tr><th scope="col">Season</th><th scope="col">Dates</th><th scope="col">Daily</th><th scope="col">Weekly</th><th scope="col">Slips 6 and 19</th></tr></thead>
                <tbody>{rows.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="muted" style={{ marginTop: 16, fontSize: 'var(--t-cap)' }}>Power $0.85 a kWh, metered. Water $0.35 a gallon daily, $0.30 weekly with contract. Key deposit $50. Laundry tokens $5, shower included.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- screen 4: eat and drink ----------
function Eat() {
  return (
    <section className="sec wrap" id="eat" aria-labelledby="eat-h">
      <div className="sec-head"><div><p className="no">No. 4 &middot; Eat and drink</p><h2 id="eat-h">Breakfast on the harbour, the evening on the&nbsp;beach.</h2></div></div>
      <div className="eat">
        <figure className="boat">
          <img src={PH.boathouse.src} alt={PH.boathouse.alt} width={PH.boathouse.w} height={PH.boathouse.h} loading="lazy" decoding="async" />
          <figcaption className="cap"><strong>The Boathouse Bar &amp; Restaurant</strong>Breakfast and dinner six days a week, on the harbourside deck or in the air-conditioned room with water views. Reservations +1 242 821 7267.</figcaption>
        </figure>
        <div>
          <p className="pq">&ldquo;Number six of the Top 25 Beach Bars in the&nbsp;Caribbean.&rdquo;</p>
          <p className="cap"><a className="tlink" href="https://www.caribjournal.com/2024/01/04/best-beach-bars-in-the-caribbean-2024/6/" target="_blank" rel="noopener">Caribbean Journal, 2024</a></p>
          <figure className="turtle">
            <img src={PH.beachbar.src} alt={PH.beachbar.alt} width={PH.beachbar.w} height={PH.beachbar.h} loading="lazy" decoding="async" />
            <figcaption className="cap"><strong>The Tranquil Turtle</strong>The beach bar on the only private beach on Green Turtle Cay: swim, play volleyball, take a kayak out, and eat island food by the sea.</figcaption>
          </figure>
          <div className="wed"><h3>Weddings</h3><p className="muted" style={{ marginTop: 8 }}>Bluff House hosts weddings on its twelve acres over the water. Tell the front desk your date and your numbers and they will come back to you.</p><p><a className="tlink" href={`mailto:${MAIL}?subject=${encodeURIComponent('Wedding at Bluff House')}`}>Ask about a wedding date</a> <span className="muted">&middot;</span> <a className="tlink" href="https://www.bluffhouse.com/wedding" target="_blank" rel="noopener">Weddings on bluffhouse.com</a></p><p className="muted" style={{ marginTop: 12 }}>And the Low Tide Gift Shop, for what you forgot to pack.</p></div>
        </div>
      </div>
    </section>
  );
}

// ---------- screen 5: history ----------
function Story() {
  const tl: [string, string][] = [
    ['Early 1950s', 'The private home of Pearce and Kitty Coady, who took in the boaters who found White Sound'],
    ['1978', 'The Davies family, until 1986'], ['1986', 'Martin Havill, until 1995'], ['1995', 'Roger and Susan Phillips, until 2011'],
    ['2011', 'Investors led by Ian Phillips'], ['December 2025', 'VIP Marinas Group: Austin and Jenny Cameron, Felecia and Dan Ongley'],
  ];
  return (
    <section className="sec wrap" id="story" aria-labelledby="st-h" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="story">
        <div><p className="no">No. 5 &middot; The story</p><h2 id="st-h">Seventy-odd years on the&nbsp;bluff.</h2></div>
        <div className="body">
          <p className="drop">Bluff House began as a house, not a hotel. The Coadys opened their door to the boaters coming into White Sound, and it became the first resort in the Bahamas&rsquo; Out Islands. It is now the oldest.</p>
          <p>Six owners on, the new chapter is VIP Marinas Group&rsquo;s, their first property in The Bahamas. What has not moved: sunset and moonrise from the balcony, the beach a few steps from the door, and a dockmaster who meets your&nbsp;boat.</p>
        </div>
      </div>
      <ol className="tl">{tl.map(([y, w]) => <li key={y}><span className="yr num">{y}</span><span className="who">{w}</span></li>)}</ol>
      <p className="honours">TripAdvisor Certificate of Excellence Hall of Fame, 2018. General manager Molly McIntosh, Caribbean Journal Hotelier of the Year, 2018.</p>
    </section>
  );
}

// ---------- screen 6: close ----------
function Close() {
  const P = usePlan(); const a = parse(P.date);
  return (
    <footer className="sec close" id="contact" aria-labelledby="cl-h">
      <div className="wrap">
        <p className="no">No. 6 &middot; Getting here</p>
        <h2 id="cl-h">Write yourself into the&nbsp;register.</h2>
        <div className="grid">
          <div>
            <h3>Arriving</h3>
            <ul>
              <li>By your own boat: through the dredged 7 ft channel into White Sound, where the dockmaster meets you. <a className="tlink" href={DOCKWA} target="_blank" rel="noopener">Dockwa</a></li>
              <li>By ferry: pick-up and drop-off at the Bluff House dock.</li>
              <li>On the cay: the front desk helps you rent a golf cart.</li>
            </ul>
            <a className="btn paper" href={a ? bookUrl(a, P.nights) : BOOK} target="_blank" rel="noopener">Check dates and book</a>
          </div>
          <div>
            <h3>Ask a person</h3>
            <ul className="num">
              <li><a className="tlink" href="tel:+12428249550">+1 242 824 9550</a> resort, also <a className="tlink" href={WA} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a className="tlink" href="tel:+19542847341">+1 954 284 7341</a> office in the US</li>
              <li><a className="tlink" href="tel:+12428217267">+1 242 821 7267</a> restaurants</li>
              <li><a className="tlink" href={`mailto:${MAIL}`}>{MAIL}</a></li>
            </ul>
          </div>
          <div>
            <h3>Season</h3>
            <p className="muted">Open 1 November to 2 September. Closed 3 September to 31 October.</p>
            <p className="muted" style={{ marginTop: 12 }}>White Sound, Green Turtle Cay, Abaco, The&nbsp;Bahamas</p>
            <p style={{ marginTop: 12 }}><a className="tlink" href="https://www.instagram.com/bluffhousebeachresort/" target="_blank" rel="noopener">Instagram</a> &middot; <a className="tlink" href="https://www.facebook.com/bluffhousebeach" target="_blank" rel="noopener">Facebook</a></p>
          </div>
        </div>
        <p className="small">Concept preview by ESTATIQ AI Solutions. Photographs from bluffhouse.com. Rates as published by Bluff House.</p>
      </div>
    </footer>
  );
}

function Strip() {
  const [show, setShow] = useState(false); const P = usePlan(); const a = parse(P.date);
  useEffect(() => {
    let atTool = false, over = false;
    const upd = () => { const s = !atTool && !over; setShow(s); document.documentElement.style.setProperty('--concept-offset', s && innerWidth <= 900 ? '72px' : '0px'); };
    const io1 = new IntersectionObserver(es => { atTool = es.some(e => e.isIntersecting); upd(); });
    const io2 = new IntersectionObserver(es => { over = es[0].isIntersecting; upd(); });
    const watch = () => { io1.disconnect(); document.querySelectorAll('.result .row').forEach(el => io1.observe(el)); };
    watch(); const mo = new MutationObserver(watch); const r = document.querySelector('.result'); if (r) mo.observe(r, { childList: true, subtree: true });
    const end = document.querySelector('.close'); if (end) io2.observe(end); upd();
    return () => { io1.disconnect(); io2.disconnect(); mo.disconnect(); };
  }, []);
  const arrive = a; let figure = '';
  if (arrive && P.mode === 'sea') { const q = dockQuote(arrive, P.nights, parseFloat(P.loa) || 0); if (q) figure = money(Math.round(q.total)); }
  else if (arrive && P.stay !== 'cottage') { const q = stayQuote(arrive, P.nights, P.stay); if (q) figure = (q.from ? 'from ' : '') + money(q.total); }
  const go = P.mode === 'sea' ? DOCKWA : arrive ? bookUrl(arrive, P.nights) : BOOK;
  return (
    <div className={`strip ${show ? 'show' : ''}`} aria-hidden={!show}>
      <a className="wa" href={WA} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}>WhatsApp</a>
      <a className="go" href={go} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}><span className="num">{figure}</span>{figure ? <span aria-hidden="true">&middot;</span> : null}{P.mode === 'sea' ? 'Reserve' : 'Book'}</a>
    </div>
  );
}

function MastBook() { const P = usePlan(); const a = parse(P.date); return <a className="book" href={P.mode === 'sea' ? DOCKWA : a ? bookUrl(a, P.nights) : BOOK} target="_blank" rel="noopener">{P.mode === 'sea' ? 'Reserve a slip' : 'Book now'}</a>; }

function Home() {
  return (
    <PlanProvider>
      <a className="skip" href="#main">Skip to content</a>
      <header className="wrap">
        <div className="mast">
          <a className="word" href="index.html">Bluff House</a>
          <p className="date">White Sound, Green Turtle Cay, Abaco</p>
          <nav aria-label="Sections"><a className="nsec" href="#rooms">Rooms</a><a className="nsec" href="#marina">Marina</a><a className="nsec" href="#eat">Eat and drink</a><a className="nsec" href="#story">Story</a><MastBook /></nav>
        </div>
      </header>
      <main id="main">
        <section className="spread wrap" aria-label="Plan a stay or a slip">
          <Plate />
          <Planner />
        </section>
        <Rooms />
        <Marina />
        <Eat />
        <Story />
      </main>
      <Close />
      <Strip />
    </PlanProvider>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
