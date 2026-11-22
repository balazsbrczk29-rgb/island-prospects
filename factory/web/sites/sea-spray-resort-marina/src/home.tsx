import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CONTACT, HOMES, LIMITS, P, RATES, SPECS } from './data';
import './styles.css';

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
type Trip = { loa: number; draft: number; month: number; nights: number };

function quote(t: Trip) {
  const high = t.month >= 2 && t.month <= 7;
  const r = high ? RATES.high : RATES.low;
  const rate = t.nights >= 90 ? (r.d90 ?? r.d30) : t.nights >= 30 ? r.d30 : r.nightly;
  const tier = t.nights >= 90 ? (r.d90 ? '90-day rate' : '30-day rate, ask about 90+ days') : t.nights >= 30 ? '30-day rate' : 'nightly rate';
  const fits = t.loa >= LIMITS.minLoa && t.loa <= LIMITS.maxLoa && t.draft <= LIMITS.maxDraft;
  return { high, rate, tier, fits, total: rate * t.loa * t.nights };
}
const waText = (t: Trip) => {
  const q = quote(t);
  return `Hello Sea Spray, slip request: ${t.loa} ft, ${t.draft} ft draft, arriving in ${MONTHS[t.month]}, ${t.nights} night${t.nights > 1 ? 's' : ''}. Website estimate ${usd(q.total)} ($${q.rate.toFixed(2)}/ft, ${q.high ? 'high' : 'low'} season, ${q.tier}). Boat name: `;
};
const wa = (text: string) => `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`;

function Console({ t, set }: { t: Trip; set: (t: Trip) => void }) {
  const q = quote(t);
  const reduce = useReducedMotion();
  const pct = ((Math.min(140, t.loa) - 20) / 120) * 100;
  return (
    <div className="console" id="slip">
      <div className="wrap console__grid">
        <div className="console__title">
          <h1 id="t-h" className="h1">White Sound, Elbow&nbsp;Cay.</h1>
          <p className="lede muted">{LIMITS.slips} slips for boats from {LIMITS.minLoa} to {LIMITS.maxLoa}&nbsp;ft, drafts to {LIMITS.maxDraft}&nbsp;ft.</p>
        </div>
        <div className="console__in">
          <p className="q">Will she fit, and what will it cost?</p>
          <div className="rule">
            <label htmlFor="loa" className="sr-only">Length overall in feet</label>
            <output className="loa-out num" style={{ left: `${pct}%` }} htmlFor="loa">{t.loa}<span> ft</span></output>
            <input id="loa" type="range" min={20} max={140} step={1} value={t.loa} onChange={e => set({ ...t, loa: +e.target.value })} style={{ ['--p' as string]: `${pct}%` }} />
            <div className="ticks num" aria-hidden="true">{[20, 40, 60, 80, 100, 130].map(v => <span key={v} style={{ left: `${((v - 20) / 120) * 100}%` }}>{v === 130 ? '130 limit' : v}</span>)}</div>
          </div>
          <div className="minis">
            <label className="mini">Draft, ft<input type="number" className="num" min={1} max={15} step={0.5} value={t.draft} onChange={e => set({ ...t, draft: +e.target.value || 0 })} /></label>
            <label className="mini">Arriving in<select value={t.month} onChange={e => set({ ...t, month: +e.target.value })}>{MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select></label>
            <label className="mini">Nights<input type="number" className="num" min={1} max={365} value={t.nights} onChange={e => set({ ...t, nights: Math.max(1, Math.min(365, +e.target.value || 1)) })} /></label>
          </div>
        </div>
        <div className="console__out" aria-live="polite">
          {q.fits ? (
            <>
              <p className="verdict">She fits. {q.high ? 'High' : 'Low'} season.</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={`${q.rate}`} className="cost num" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>{usd(q.total)}</motion.p>
              </AnimatePresence>
              <p className="cap muted num">{t.nights} night{t.nights > 1 ? 's' : ''} &times; {t.loa} ft &times; ${q.rate.toFixed(2)}, {q.tier}. Power (daily minimums) and water ($0.40 a gallon) extra.</p>
            </>
          ) : (
            <p className="verdict verdict--no">{t.loa > LIMITS.maxLoa ? `Over our ${LIMITS.maxLoa} ft limit.` : t.loa < LIMITS.minLoa ? `Under ${LIMITS.minLoa} ft: ask the dockmaster.` : `Deeper than the ${LIMITS.maxDraft} ft we take.`} Call before you plan the run.</p>
          )}
          <a id="req" className="btn" href={wa(waText(t))}>Request this slip on WhatsApp</a>
          <p className="acts2"><a className="tlink num" href={`tel:${CONTACT.tel}`}>Call {CONTACT.phone}</a><span>{CONTACT.vhf}</span></p>
          <p className="acts3 cap"><a href={CONTACT.stay}>Book your stay</a><a href={CONTACT.order}>Order food</a><a href={CONTACT.slip}>Slip booking form</a></p>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="hdr">
      <a className="hdr__name" href="index.html">Sea Spray <span>Elbow Cay</span></a>
      <nav className="hdr__nav" aria-label="Main"><a href="#marina">Marina</a><a href="#week">This week</a><a href="#stay">Stay</a><a href="#homes">Residences</a><a href="#story">Story</a></nav>
      <a className="hdr__tel num" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
    </header>
  );
}

function Marina({ t }: { t: Trip }) {
  const high = quote(t).high;
  const col = (key: 'high' | 'low', name: string, when: string) => {
    const r = RATES[key];
    const on = (key === 'high') === high;
    return (
      <div className={`season ${on ? 'on' : ''}`}>
        <p className="season__k cap">{on ? 'Your season' : ' '}</p>
        <h3 className="h3">{name}</h3>
        <p className="cap muted">{when}</p>
        <dl className="num">
          <div><dt>Nightly</dt><dd>${r.nightly.toFixed(2)}</dd></div>
          <div><dt>30 days or more</dt><dd>${r.d30.toFixed(2)}</dd></div>
          <div><dt>90 days or more</dt><dd>{r.d90 ? `$${r.d90.toFixed(2)}` : 'Ask'}</dd></div>
          <div><dt>Annual</dt><dd>${r.annual.toFixed(2)}</dd></div>
        </dl>
      </div>
    );
  };
  return (
    <section className="sec field" id="marina" aria-labelledby="m-h">
      <div className="wrap">
        <h2 id="m-h" className="h2">The marina, for the captain.</h2>
        <dl className="figs">
          <div><dt>Slips</dt><dd className="num">62</dd></div>
          <div><dt>Length</dt><dd className="num">20 to 130 ft</dd></div>
          <div><dt>Draft</dt><dd className="num">7 ft</dd></div>
          <div><dt>Fuel</dt><dd>Gas, diesel</dd></div>
        </dl>
        <div className="marina__grid">
          <ul className="specs">{SPECS.slice(4).map(([k, v]) => <li key={k}><span className="muted">{k}</span><span className="num">{v}</span></li>)}</ul>
          <div className="rates">
            <p className="cap muted rates__note">Per foot, per night.</p>
            {col('high', 'High season', '1 March to 31 August')}
            {col('low', 'Low season', '1 September to 28 February')}
          </div>
        </div>
        <div className="award"><img src={P.award.src} alt={P.award.alt} width={P.award.w} height={P.award.h} loading="lazy" /><p className="cap">Boaters’ Choice 2025 on marinas.com.</p></div>
      </div>
    </section>
  );
}

function Week() {
  return (
    <section className="sec wrap week" id="week" aria-labelledby="w-h">
      <figure className="week__photo"><img src={P.junkanoo.src} alt={P.junkanoo.alt} width={P.junkanoo.w} height={P.junkanoo.h} loading="lazy" /></figure>
      <div className="week__text">
        <h2 id="w-h" className="h2">This week at the bar.</h2>
        <ul className="sched">
          <li><b>Thursday night</b><span>Live music, a DJ or Junkanoo</span></li>
          <li><b>Through the week</b><span>Happy Hour, Game Night and Karaoke: ask the bar for this week’s nights</span></li>
        </ul>
        <p className="muted">Private events and fishing tournaments: tell us your dates on WhatsApp.</p>
        <p className="row"><a className="btn btn--line" href={CONTACT.order}>Order food online</a><a className="tlink" href={wa('Hello Sea Spray, I would like to ask about a private event or tournament on these dates: ')}>Ask about an event</a></p>
      </div>
    </section>
  );
}

function Day() {
  const shots = [
    { p: P.fleet, c: 'Out for the day.' },
    { p: P.docks, c: 'Back to the docks: fuel, ice and bait.' },
    { p: P.lunch, c: 'Lunch by the marina.' },
    { p: P.bar, c: 'The bar at golden hour.' },
    { p: P.beach, c: 'The beach side of the cay.' },
    { p: P.dusk, c: 'Running home at dusk.' },
  ];
  return (
    <section className="sec day" aria-labelledby="d-h">
      <div className="wrap"><h2 id="d-h" className="h2">A day at Sea Spray.</h2></div>
      <div className="strip" tabIndex={0} role="region" aria-label="Photographs of a day at Sea Spray, scroll sideways">
        {shots.map(s => (
          <figure key={s.c} style={{ aspectRatio: `${s.p.w} / ${s.p.h}` }}>
            <img src={s.p.src} alt={s.p.alt} width={s.p.w} height={s.p.h} loading="lazy" decoding="async" />
            <figcaption className="cap">{s.c}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Stay() {
  return (
    <section className="sec wrap stay" id="stay" aria-labelledby="s-h">
      <figure className="stay__photo"><img src={P.beach.src} alt={P.beach.alt} width={P.beach.w} height={P.beach.h} loading="lazy" /></figure>
      <div className="stay__text">
        <h2 id="s-h" className="h2">Stay ashore as well as afloat.</h2>
        <p className="lede muted">Rooms and villas at Sea Spray are booked online, with live dates and rates.</p>
        <a className="btn" href={CONTACT.stay}>Book your stay</a>
      </div>
    </section>
  );
}

function Homes() {
  return (
    <section className="sec homes" id="homes" aria-labelledby="h-h">
      <div className="wrap">
        <h2 id="h-h" className="h2">Residences at Sea Spray.</h2>
        <table className="homes__t">
          <caption className="sr-only">Residences for sale, published prices</caption>
          <thead><tr><th scope="col">Home</th><th scope="col">Size</th><th scope="col">From</th><th scope="col">Oceanfront from</th></tr></thead>
          <tbody>{HOMES.map(h => <tr key={h.name}><th scope="row">{h.name}</th><td>{h.spec}</td><td className="num">{h.from}</td><td className="num">{h.ocean ?? ''}</td></tr>)}</tbody>
        </table>
        <p className="row"><a className="btn btn--line" href={CONTACT.sales}>Download the 2026 sales package</a><a className="tlink" href={wa('Hello Sea Spray, I would like to ask about the residences: ')}>Ask about the residences</a></p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="sec story field2" id="story" aria-labelledby="st-h">
      <div className="wrap story__grid">
        <div>
          <h2 id="st-h" className="h2">Built by boat builders, brought back by boaters.</h2>
          <p className="lede">Monty and Ruth Albury built Sea Spray boats here in the 1980s. Hurricane Dorian destroyed the resort. Since February 2022, four boyhood friends from Charleston and their families have been bringing it back.</p>
        </div>
        <div className="contact">
          <a className="contact__tel num" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
          <p><a className="tlink" href={wa('Hello Sea Spray, ')}>WhatsApp the marina</a></p>
          <p>{CONTACT.vhf}</p>
          <p><a className="tlink" href={CONTACT.map}>{CONTACT.place}</a></p>
          <p className="cap"><a href="https://www.instagram.com/seasprayabaco/">Instagram</a> · <a href="https://www.facebook.com/SeaSprayResortAbaco/">Facebook</a></p>
        </div>
      </div>
    </section>
  );
}

function Bar({ t }: { t: Trip }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const els = [document.getElementById('req'), document.getElementById('story')].filter(Boolean) as Element[];
    const vis = new Set<Element>();
    const io = new IntersectionObserver(es => { es.forEach(e => (e.target.id === 'req' ? e.intersectionRatio >= 0.99 : e.isIntersecting) ? vis.add(e.target) : vis.delete(e.target)); setOn(vis.size === 0); }, { threshold: [0, 1] });
    els.forEach(e => io.observe(e)); return () => io.disconnect();
  }, []);
  useEffect(() => { document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 900px)').matches ? '76px' : '0px'); }, [on]);
  return <div className={`pbar ${on ? 'on' : ''}`} aria-hidden={!on}><a className="btn" href={wa(waText(t))} tabIndex={on ? 0 : -1}>Request a slip</a><a className="tlink num" href={`tel:${CONTACT.tel}`} tabIndex={on ? 0 : -1}>Call</a></div>;
}

function Home() {
  const [trip, setTrip] = useState<Trip>({ loa: 58, draft: 5, month: 10, nights: 3 });
  useEffect(() => { setTrip(x => ({ ...x, month: new Date().getMonth() })); }, []);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="t-h">
          <div className="hero__photo"><img src={P.sound.src} alt={P.sound.alt} width={P.sound.w} height={P.sound.h} fetchPriority="high" /></div>
          <Console t={trip} set={setTrip} />
        </section>
        <Marina t={trip} />
        <Week />
        <Day />
        <Stay />
        <Homes />
        <Story />
      </main>
      <footer className="foot"><div className="wrap"><p className="cap muted">Sea Spray Resort &amp; Marina, White Sound, Elbow Cay, Abaco, The Bahamas. Photographs from seasprayresort.com.</p></div></footer>
      <Bar t={trip} />
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
