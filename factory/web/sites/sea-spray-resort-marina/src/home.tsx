import { StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Lenis from 'lenis';
import { CONTACT, LIMITS, P, RATES, SPECS, type Photo } from './data';
import './styles.css';

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

type Ch = { photo: Photo; title: string; text: React.ReactNode; pos?: string };
const CHAPTERS: Ch[] = [
  { photo: P.fleet, title: 'Out', text: <>From here the Sea of Abaco opens wide. Marsh Harbour is twenty minutes by boat, Tahiti Beach is closer still, and the offshore banks and the Marls are within easy reach.</> },
  { photo: P.docks, title: 'Back', pos: '50% 40%', text: <>Fuel at the dock, gas and diesel. Ice, and bait: ballyhoo, chum, squid and shrimp. Showers are ready when you get in.</> },
  { photo: P.bar, title: 'The bar', text: <>Just up from the docks, where most afternoons naturally lead. <a className="tlink" style={{ whiteSpace: "nowrap" }} href={CONTACT.order} rel="noopener">Order food online</a>.</> },
  { photo: P.junkanoo, title: 'Thursday', text: <>Live music, a DJ or Junkanoo on Thursday nights. Happy Hour, Game Night and Karaoke through the week.</> },
  { photo: P.beach, title: 'Ashore', text: <>Stay on land as well as on the water. <a className="tlink" style={{ whiteSpace: "nowrap" }} href={CONTACT.stay} rel="noopener">Book a room or villa</a>.</> },
];

type Trip = { loa: number; draft: number; month: number; nights: number };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function quote(t: Trip) {
  const high = t.month >= 2 && t.month <= 7;
  const r = high ? RATES.high : RATES.low;
  const rate = t.nights >= 90 ? (r.d90 ?? r.d30) : t.nights >= 30 ? r.d30 : r.nightly;
  const note = t.nights >= 90 ? (r.d90 ? '90+ day rate' : '30+ day rate; ask about 90+ days') : t.nights >= 30 ? '30+ day rate' : 'nightly rate';
  const fits = t.loa >= LIMITS.minLoa && t.loa <= LIMITS.maxLoa && t.draft <= LIMITS.maxDraft;
  return { high, rate, note, fits, total: rate * t.loa * t.nights };
}

function Calculator({ t, set }: { t: Trip; set: (t: Trip) => void }) {
  const q = quote(t);
  const pct = (t.loa - 20) / 120;
  return (
    <section className="calc" id="slip" aria-labelledby="calc-h">
      <div className="calc-head">
        <h2 id="calc-h">Will she fit, and what will it&nbsp;cost?</h2>
        <p className="muted">Slide to your length overall. {LIMITS.slips} slips take boats from {LIMITS.minLoa} to {LIMITS.maxLoa} feet and drafts up to {LIMITS.maxDraft}&nbsp;feet; the estimate uses the published rates.</p>
      </div>
      <div className="rule">
        <label htmlFor="loa" className="sr-only">Length overall in feet</label>
        <output className="loa-out num" style={{ left: `${pct * 100}%` }} htmlFor="loa">{t.loa}<span> ft</span></output>
        <input id="loa" type="range" min={LIMITS.minLoa} max={140} step={1} value={t.loa} onChange={e => set({ ...t, loa: +e.target.value })} style={{ ['--p' as string]: `${(t.loa - 20) / 120 * 100}%` }} />
        <div className="ticks num" aria-hidden="true">{[20, 40, 60, 80, 100, 120, 130].map(v => <span key={v} style={{ left: `${(v - 20) / 120 * 100}%` }}>{v}</span>)}</div>
      </div>
      <div className="calc-row">
        <div className="mini">
          <label htmlFor="draft">Draft</label>
          <div className="box"><input id="draft" type="number" min={1} max={15} step={0.5} value={t.draft} onChange={e => set({ ...t, draft: +e.target.value || 0 })} className="num" /><span className="unit">ft</span></div>
          <div className="depth" aria-hidden="true"><i style={{ transform: `scaleX(${Math.min(1, t.draft / 10)})` }} /><b style={{ left: '70%' }} /></div>
        </div>
        <div className="mini">
          <label htmlFor="month">Arriving in</label>
          <div className="box"><select id="month" value={t.month} onChange={e => set({ ...t, month: +e.target.value })}>{MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select></div>
        </div>
        <div className="mini">
          <label htmlFor="nights">Nights</label>
          <div className="box"><input id="nights" type="number" min={1} max={365} value={t.nights} onChange={e => set({ ...t, nights: Math.max(1, +e.target.value || 1) })} className="num" /></div>
        </div>
        <div className="verdict" aria-live="polite">
          {q.fits ? (
            <>
              <p className="fit">She fits{q.high ? ', high season' : ', low season'}.</p>
              <p className="cost num">{usd(q.total)}</p>
              <p className="how num">{t.nights} night{t.nights > 1 ? 's' : ''} &times; {t.loa} ft &times; ${q.rate.toFixed(2)} ({q.note}). Power and water extra; daily minimums apply.</p>
            </>
          ) : (
            <p className="fit no">{t.loa > LIMITS.maxLoa ? `Over our ${LIMITS.maxLoa} ft limit.` : t.loa < LIMITS.minLoa ? `Under ${LIMITS.minLoa} ft: ask the dockmaster.` : `Deeper than the ${LIMITS.maxDraft} ft we take.`} Call before you plan the run.</p>
          )}
          <div className="act">
            <a className="btn" href="#request">Request this slip</a>
            <a className="tlink num" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
            <span className="muted">or hail {CONTACT.vhf}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame({ i, n, p, ch }: { i: number; n: number; p: MotionValue<number>; ch: Ch }) {
  const a = i / n, b = (i + 1) / n, f = 0.35 / n;
  const op = useTransform(p, v => (i === 0 ? 1 : v <= a - f ? 0 : v >= a ? 1 : (v - (a - f)) / f));
  const capOp = useTransform(p, v => {
    const inA = i === 0 ? -1 : a, inB = i === 0 ? 0 : a + f * 0.6;
    const outA = i === n - 1 ? 2 : b - f, outB = i === n - 1 ? 3 : b - f * 0.4;
    if (v < inA || v > outB) return 0;
    if (v < inB) return (v - inA) / (inB - inA);
    if (v > outA) return 1 - (v - outA) / (outB - outA);
    return 1;
  });
  const scale = useTransform(p, v => 1.08 - Math.min(1, Math.max(0, (v - a) / (b - a))) * 0.08);
  return (
    <motion.div className="frame" style={{ opacity: op }}>
      <motion.img src={ch.photo.src} alt={ch.photo.alt} width={ch.photo.w} height={ch.photo.h} loading="lazy" decoding="async" style={{ scale, objectPosition: ch.pos || '50% 50%' }} />
      <motion.div className="cap" style={{ opacity: capOp }}><h3>{ch.title}</h3><p>{ch.text}</p></motion.div>
    </motion.div>
  );
}

function Film() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section className="film" ref={ref} data-stage aria-label="A day at Sea Spray">
      <div className="stage">{CHAPTERS.map((c, i) => <Frame key={c.title} i={i} n={CHAPTERS.length} p={scrollYProgress} ch={c} />)}</div>
      <div className="track" style={{ marginTop: '-100svh' }} />
    </section>
  );
}

function Menu({ onClose }: { onClose: () => void }) {
  const items: [string, string][] = [['#slip', 'Will she fit'], ['#day', 'A day here'], ['#story', 'The story'], ['#marina', 'Specs and rates'], ['#request', 'Request a slip']];
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Menu">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="name">Sea Spray</span>
        <button className="menu-btn" onClick={onClose} autoFocus>Close</button>
      </div>
      <ol>{items.map(([h, l], i) => <li key={h}><a href={h} onClick={onClose}><span className="num">{i + 1}</span>{l}</a></li>)}</ol>
      <p style={{ marginTop: 48 }} className="num"><a className="tlink" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a> <span className="muted">&middot; {CONTACT.vhf}</span></p>
    </div>
  );
}

function Request({ t }: { t: Trip }) {
  const q = quote(t);
  const [v, setV] = useState({ boat: '', arrive: '', power: '50 amp', name: '', note: '' });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const text = `Slip request for Sea Spray\nBoat: ${v.boat}\nLOA: ${t.loa} ft, draft: ${t.draft} ft\nArriving: ${v.arrive || MONTHS[t.month]}, ${t.nights} night(s)\nPower: ${v.power}\nName: ${v.name}\n${v.note}`;
  return (
    <section className="request" id="request" aria-labelledby="rq-h">
      <div>
        <h2 id="rq-h">Request a slip.</h2>
        <dl className="carry num">
          <div><dt>Length overall</dt><dd>{t.loa} ft</dd></div>
          <div><dt>Draft</dt><dd>{t.draft} ft</dd></div>
          <div><dt>Arriving</dt><dd>{MONTHS[t.month]}, {t.nights} night{t.nights > 1 ? 's' : ''}</dd></div>
          <div><dt>Estimate</dt><dd>{q.fits ? usd(q.total) : 'Call the dockmaster'}</dd></div>
        </dl>
        <p className="muted" style={{ marginTop: 16, fontSize: 'var(--t-s)' }}>Carried over from the slip check above; change it there. On the water, hail {CONTACT.vhf} before you round the point.</p>
      </div>
      <form className="form" onSubmit={e => { e.preventDefault(); window.open(`https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); }}>
        <div><label htmlFor="r-boat">Boat name and make</label><input id="r-boat" value={v.boat} onChange={set('boat')} required /></div>
        <div><label htmlFor="r-name">Your name</label><input id="r-name" autoComplete="name" value={v.name} onChange={set('name')} required /></div>
        <div><label htmlFor="r-arrive">Arrival date</label><input id="r-arrive" type="date" value={v.arrive} onChange={set('arrive')} /></div>
        <div><label htmlFor="r-power">Shore power</label><select id="r-power" value={v.power} onChange={set('power')}><option>30 amp</option><option>50 amp</option><option>100 amp</option><option>None</option></select></div>
        <div className="full"><label htmlFor="r-note">Anything else</label><textarea id="r-note" value={v.note} onChange={set('note')} /></div>
        <div className="full" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn" type="submit">Send on WhatsApp</button>
          <a className="tlink num" href={`tel:${CONTACT.tel}`}>Call {CONTACT.phone}</a>
          <a className="tlink" href={CONTACT.slip} rel="noopener">or the booking form</a>
        </div>
      </form>
    </section>
  );
}

function Home() {
  const [menu, setMenu] = useState(false);
  const [trip, setTrip] = useState<Trip>({ loa: 58, draft: 5, month: new Date().getMonth(), nights: 3 });
  const [enq, setEnq] = useState(false);
  useEffect(() => {
    let lenis: Lenis | null = null, raf = 0;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !matchMedia('(pointer: coarse)').matches) {
      lenis = new Lenis({ lerp: 0.11 });
      const loop = (t: number) => { lenis!.raf(t); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop);
    }
    let past = false, over = false;
    const upd = () => setEnq(past && !over);
    const onS = () => { const p = scrollY > innerHeight * 1.2; if (p !== past) { past = p; upd(); } };
    const io = new IntersectionObserver(es => { over = es.some(e => e.isIntersecting); upd(); }, { threshold: 0.05 });
    ['#slip', '#request'].forEach(s => { const el = document.querySelector(s); if (el) io.observe(el); });
    addEventListener('scroll', onS, { passive: true });
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); removeEventListener('scroll', onS); io.disconnect(); };
  }, []);
  const years = useMemo(() => new Date().getFullYear(), []);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hero">
        <img className="kb" src={P.sound.src} alt={P.sound.alt} width={P.sound.w} height={P.sound.h} fetchPriority="high" />
        <div className="corner">
          <a className="name" href="index.html">Sea Spray <span style={{ fontStyle: 'italic', fontFamily: 'Source Serif 4, serif', fontSize: 'var(--t-m)' }}>Elbow Cay</span></a>
          <button className="menu-btn" onClick={() => setMenu(true)} aria-haspopup="dialog">Menu</button>
        </div>
        <p className="subtitle">Round the point into White Sound, and the water settles. Sea Spray sits at the head of the&nbsp;sound.</p>
      </header>

      <main id="main">
        <section className="title-card" aria-labelledby="t-h">
          <div className="tc-row">
            <h1 id="t-h" className="display mega">White Sound<span style={{ color: 'var(--accent)' }}>.</span></h1>
            <div className="tc-side">
              <p className="label">Sea Spray Resort &amp; Marina, Elbow Cay, in the middle of the Abacos</p>
              <div className="facts num">
                <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
                <span>{CONTACT.vhf}</span>
                <span>{LIMITS.slips} slips to {LIMITS.maxLoa} ft</span>
              </div>
              <a className="btn" href="#slip" style={{ marginTop: 24 }}>Check your slip</a>
            </div>
          </div>
        </section>
        <Calculator t={trip} set={setTrip} />

        <div id="day">
          <Film />
          <div className="chapters-m">
            {CHAPTERS.map(c => (
              <figure key={c.title}>
                <img src={c.photo.src} alt={c.photo.alt} width={800} height={1000} loading="lazy" decoding="async" style={{ objectPosition: c.pos || '50% 50%' }} />
                <figcaption><h3>{c.title}</h3><p>{c.text}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>

        <section className="card" id="story" aria-label="The story">
          <p className="big">Monty and Ruth Albury built Sea Spray boats here in the 1980s. After Hurricane Dorian, four boyhood friends from Charleston and their families began bringing it back.</p>
          <p className="src">Rebuilt in phases since February 2022</p>
        </section>

        <section className="credits" id="marina" aria-labelledby="cr-h">
          <h2 id="cr-h">The marina, for the captain.</h2>
          <ul className="roll">{SPECS.map(([k, v]) => <li key={k}><span>{k}</span><span className="num">{v}</span></li>)}</ul>
          <div className="rates">
            <div>
              <h3>High season</h3><p className="when">1 March to 31 August</p>
              <dl className="num">
                <div><dt>Nightly</dt><dd>${RATES.high.nightly.toFixed(2)} / ft</dd></div>
                <div><dt>30 days or more</dt><dd>${RATES.high.d30.toFixed(2)} / ft</dd></div>
                <div><dt>90 days or more</dt><dd>${RATES.high.d90!.toFixed(2)} / ft</dd></div>
                <div><dt>Annual</dt><dd>${RATES.high.annual.toFixed(2)} / ft</dd></div>
              </dl>
            </div>
            <div>
              <h3>Low season</h3><p className="when">1 September to 28 February</p>
              <dl className="num">
                <div><dt>Nightly</dt><dd>${RATES.low.nightly.toFixed(2)} / ft</dd></div>
                <div><dt>30 days or more</dt><dd>${RATES.low.d30.toFixed(2)} / ft</dd></div>
                <div><dt>Annual</dt><dd>${RATES.low.annual.toFixed(2)} / ft</dd></div>
              </dl>
            </div>
            <div className="award">
              <img src={P.award.src} alt={P.award.alt} width={P.award.w} height={P.award.h} loading="lazy" />
              <p className="label">Boaters&rsquo; Choice 2025, chosen by the boaters themselves.</p>
            </div>
          </div>
        </section>

        <Request t={trip} />

        <section className="credits" style={{ paddingTop: 0 }} aria-label="Residences">
          <p className="label">Residences</p>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 'var(--t-xl)', lineHeight: 1.15, maxWidth: '26ch', margin: '16px auto 0' }}>Oceanfront homes and Marina View cottages are for sale at Sea&nbsp;Spray.</p>
          <p style={{ marginTop: 24 }}><a className="tlink" href={CONTACT.sales} rel="noopener">Download the 2026 sales package</a> <span className="muted">&middot;</span> <a className="tlink" href={CONTACT.residences} rel="noopener">See the residences</a></p>
        </section>
      </main>

      <footer className="foot">
        <p>Sea Spray Resort &amp; Marina &middot; <a href={CONTACT.map} rel="noopener">{CONTACT.place}</a><br /><span className="num">{CONTACT.phone}</span> &middot; {CONTACT.vhf}</p>
        <p><a href="https://www.instagram.com/seasprayabaco/" rel="noopener">Instagram</a> &middot; <a href="https://www.facebook.com/SeaSprayResortAbaco/" rel="noopener">Facebook</a><br />Concept preview by ESTATIQ AI Solutions, {years}. Photographs from seasprayresort.com.</p>
      </footer>

      <a className={`enquire ${enq ? 'show' : ''}`} href="#request" tabIndex={enq ? 0 : -1}>Request a slip</a>
      {menu && <Menu onClose={() => setMenu(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
