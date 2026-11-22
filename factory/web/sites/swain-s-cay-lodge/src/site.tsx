import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { IMG, BOOK, EMAIL, PHONES, LICENCE, FB, WATERS, ROOMS, INCLUDED, EXCLUDED, REVIEWS, OFFERS, GALLERY, FAQ, money, type Pic } from './data'
import map from './map.json'

const ease = [0.22, 1, 0.36, 1] as const
type Pt = [number, number]
const P = map.p as Record<string, Pt>

export function Photo({ pic, eager, className = '' }: { pic: Pic; eager?: boolean; className?: string }) {
  return <span className={'ph ' + className}><img src={pic.src} width={pic.w} height={pic.h} alt={pic.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined} /></span>
}

/* ---------- plan state ---------- */
export type Plan = ReturnType<typeof usePlan>
export function usePlan() {
  const [anglers, setAnglers] = useState(2)
  const [others, setOthers] = useState(0)
  const [nights, setNightsRaw] = useState(6)
  const [days, setDays] = useState(5)
  const [waters, setWaters] = useState<string[]>(['home', 'middle'])
  const [arrival, setArrival] = useState('')
  const setNights = (n: number) => { setNightsRaw(n); setDays(d => Math.min(d, n)) }
  const [focus, setFocus] = useState<string | null>(null)
  const toggle = (k: string) => {
    const has = waters.includes(k), next = has ? waters.filter(x => x !== k) : [...waters, k]
    setWaters(next)
    setFocus(has ? (focus === k ? next[next.length - 1] ?? null : focus) : k)
  }
  return { arrival, setArrival, anglers, setAnglers, others, setOthers, nights, setNights, days, setDays, waters, toggle, focus }
}
export function week(p: Plan) {
  const boats = p.anglers ? Math.ceil(p.anglers / 2) : 0, guests = p.anglers + p.others
  const guideDays = p.anglers ? boats * p.days : 0
  const tipGuides = 125 * guideDays, tipStaff = 35 * guests * p.nights
  return { boats, guests, guideDays, tipGuides, tipStaff, tips: tipGuides + tipStaff, dayTrips: 975 * guideDays }
}
function mail(p: Plan) {
  const w = week(p)
  const body = [
    'Hello,', '',
    `We would like to plan a fishing week at Swain's Cay Lodge.`,
    `Anglers: ${p.anglers}. Non-anglers: ${p.others}.`,
    p.anglers ? `Nights: ${p.nights}. Guided days: ${p.days} (${w.boats} boat${w.boats > 1 ? 's' : ''}, ${w.guideDays} guide days).` : `Nights: ${p.nights}. No guided fishing, a beach week.`,
    `Waters we would like: ${p.waters.map(k => WATERS.find(x => x.k === k)!.name).join(', ') || 'your advice'}.`,
    `Arrival: ${p.arrival ? new Date(p.arrival + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : 'flexible, please advise on tides'}`,
    `We have budgeted the recommended gratuities: ${money(w.tipGuides)} for guides and ${money(w.tipStaff)} for the lodge staff.`,
    '', 'Please send the package price from your 2026-2027 season sheet.', '', 'Thank you.',
  ].join('\n')
  return `mailto:${EMAIL}?subject=${encodeURIComponent(p.anglers ? `Fishing week: ${p.anglers} angler${p.anglers > 1 ? 's' : ''}, ${p.nights} nights` : `Stay: ${w.guests} guest${w.guests === 1 ? '' : 's'}, ${p.nights} nights`)}&body=${encodeURIComponent(body)}`
}

/* ---------- header ---------- */
export function Header({ current }: { current?: string }) {
  const nav: [string, string][] = [['Fishing', 'fishing.html'], ['The lodge', 'lodge.html'], ['Getting here', 'lodge.html#getting-here'], ['Reviews', './#reviews']]
  return (
    <header className="hd">
      <a className="hd__mark" href="./">Swain's Cay Lodge</a>
      <nav className="hd__nav" aria-label="Site">{nav.map(([l, h]) => <a key={l} href={h} aria-current={current === l ? 'page' : undefined}>{l}</a>)}</nav>
      <details className="hd__menu"><summary>Menu</summary><nav aria-label="Site, phone">{nav.map(([l, h]) => <a key={l} href={h}>{l}</a>)}<a className="tnum" href={PHONES[0][1]}>{PHONES[0][0]}</a></nav></details>
      <a className="hd__tel tnum" href={PHONES[0][1]}>{PHONES[0][0]}</a>
      <a className="btn btn--line btn--sm" href={BOOK}>Book a room</a>
    </header>
  )
}

function Num({ v }: { v: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="num tnum">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={v} initial={reduce ? { opacity: 0 } : { y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { y: -8, opacity: 0 }} transition={{ duration: 0.28, ease }}>{v}</motion.span>
      </AnimatePresence>
    </span>
  )
}
function Stepper({ label, v, set, min, max, id }: { label: string; v: number; set: (n: number) => void; min: number; max: number; id: string }) {
  return (
    <div className="step" role="group" aria-labelledby={id}>
      <span className="lbl" id={id}>{label}</span>
      <div className="step__c">
        <button type="button" aria-label={`Fewer: ${label}`} disabled={v <= min} onClick={() => set(Math.max(min, v - 1))}>−</button>
        <span className="tnum" aria-live="polite">{v}</span>
        <button type="button" aria-label={`More: ${label}`} disabled={v >= max} onClick={() => set(Math.min(max, v + 1))}>+</button>
      </div>
    </div>
  )
}

/* ---------- the chart ---------- */
const reefD = 'M' + (map.reef as Pt[]).map(p => p.join(' ')).join(' L')
const deepD = 'M' + (map.reef as Pt[]).map(([x, y]) => `${x + 70} ${y}`).join(' L') + ' L1000 900 L1000 0 Z'
export function Chart({ plan, photo = true }: { plan: Plan; photo?: boolean }) {
  const on = (k: string) => plan.waters.includes(k)
  const zone = (k: string, el: React.ReactNode, label: string) => (
    <g className={'z' + (on(k) ? ' is-on' : '')} role="checkbox" aria-checked={on(k)} aria-label={label} tabIndex={0}
      onClick={() => plan.toggle(k)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); plan.toggle(k) } }}>{el}</g>
  )
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${map.w} ${map.h}`}>
        <title>Chart of Mangrove Cay, Andros, with the Middle Bight, the South Bight, the barrier reef and the deep water beyond. Tap a water to add it to your week.</title>
        <rect width={map.w} height={map.h} className="chart__sea" />
        <g className="chart__grat">
          {map.gx.map(([lo, x]) => <line key={'x' + lo} x1={x} x2={x} y1={0} y2={map.h} />)}
          {map.gy.map(([la, y]) => <line key={'y' + la} y1={y} y2={y} x1={0} x2={map.w} />)}
        </g>
        <defs>
          <radialGradient id="zg"><stop offset="0" stopColor="#2f6c8f" stopOpacity=".6" /><stop offset=".55" stopColor="#2f6c8f" stopOpacity=".34" /><stop offset="1" stopColor="#2f6c8f" stopOpacity="0" /></radialGradient>
          <clipPath id="sea"><path clipRule="evenodd" d={`M0 0H${map.w}V${map.h}H0Z ` + map.land} /></clipPath>
        </defs>
        {zone('deep', <path d={deepD} className="z__fill z__fill--deep" />, 'Outside the reef')}
        <g clipPath="url(#sea)">
          {zone('middle', <ellipse cx={455} cy={338} rx={200} ry={70} transform="rotate(-8 455 338)" className="z__fill" />, 'The Middle Bight')}
          {zone('south', <ellipse cx={575} cy={772} rx={180} ry={62} transform="rotate(-14 575 772)" className="z__fill" />, 'The South Bight')}
          {zone('home', <ellipse cx={696} cy={424} rx={30} ry={70} className="z__fill" />, 'The home flat')}
        </g>
        <path d={map.land} className="chart__land" />
        {zone('reef', <><path d={reefD} className="z__hit" /><path d={reefD} className="chart__reef" /></>, 'The Andros Barrier Reef')}
        <g className="chart__deg">
          {map.gy.filter(([, y]) => y > 40).map(([la, y]) => <text key={la} x={10} y={y - 8}>{la.toFixed(1)}°N</text>)}
        </g>
        <g className="chart__lbl">
          <text x={P.big[0]} y={P.big[1]}>Andros</text>
          <text x={P.mangrove[0]} y={P.mangrove[1]}>Mangrove Cay</text>
          <text x={P.southAndros[0] + 60} y={P.southAndros[1] + 20}>South Andros</text>
          <text className={'w' + (on('middle') ? ' is-on' : '')} x={330} y={300}>Middle Bight</text>
          <text className={'w' + (on('south') ? ' is-on' : '')} x={420} y={830}>South Bight</text>
          <text className={'w' + (on('reef') ? ' is-on' : '')} x={700} y={330} transform="rotate(-68 700 330)">Barrier reef</text>
          <text className={'w' + (on('deep') ? ' is-on' : '')} x={850} y={620}>6,000 ft</text>
          <text className={'sp' + (on('middle') ? ' is-on' : '')} x={330} y={326}>bonefish, guided skiff</text>
          <text className={'sp' + (on('south') ? ' is-on' : '')} x={420} y={856}>bonefish, guided skiff</text>
          <text className={'sp' + (on('deep') ? ' is-on' : '')} x={850} y={646}>wahoo, tuna, billfish</text>
        </g>
        <g className="chart__lodge">
          <circle cx={P.lodge[0]} cy={P.lodge[1]} r={7} />
          <text x={P.lodge[0] - 16} y={P.lodge[1] - 30} textAnchor="end" className={'w' + (on('home') ? ' is-on' : '')}>The lodge</text>
          <text x={P.lodge[0] - 16} y={P.lodge[1] - 8} textAnchor="end" className="small">{on('home') ? 'home flat: wade for bonefish' : 'and its home flat'}</text>
        </g>
      </svg>
      <figcaption className="chart__hint">Tap a water to add it to your week.</figcaption>
      {photo && <FieldCard k={plan.focus} />}
    </figure>
  )
}

/* the photograph pinned on the chart's open water: the lodge at first, then the water you last added */
function FieldCard({ k }: { k: string | null }) {
  const w = k ? WATERS.find(x => x.k === k)! : null
  const pic = w ? w.pic : IMG.hero
  return (
    <div className="chart__photo" aria-live="polite">
      <div className="ph cp__pic">
        <AnimatePresence initial={false}>
          <motion.img key={pic.src} src={pic.src} width={pic.w} height={pic.h} alt={pic.alt} loading="eager" decoding="async" fetchPriority="high"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} />
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={k ?? 'lodge'} className="cp__t" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease }}>
          {w ? <><b>{w.name}</b><span>{w.method}.</span><i>{w.species}</i></> : <><b>The lodge beach, Mangrove Cay</b><span>A wadeable bonefish flat right off the beach.</span></>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ---------- screen 1 ---------- */
export function Planner({ plan, h1 = true }: { plan: Plan; h1?: boolean }) {
  const w = week(plan)
  const H = h1 ? 'h1' : 'h2'
  return (
    <section className="plan" id="plan" aria-labelledby="plan-h">
      <div className="plan__tool">
        <p className="kicker">Mangrove Cay, Andros, The Bahamas</p>
        <p className="orvis">Orvis Endorsed Fly Fishing Lodge</p>
        <H id="plan-h">Bonefish off the beach, a bight on either&nbsp;side.</H>
        <div className="ctl">
          <Stepper label="Anglers" id="s-a" v={plan.anglers} set={plan.setAnglers} min={0} max={12} />
          <Stepper label="Non-anglers" id="s-o" v={plan.others} set={plan.setOthers} min={0} max={8} />
          <Stepper label="Nights" id="s-n" v={plan.nights} set={plan.setNights} min={2} max={14} />
          <Stepper label="Guided days" id="s-d" v={plan.days} set={plan.setDays} min={0} max={plan.nights} />
          <label className={'ctl__date' + (plan.arrival ? '' : ' is-empty')}><span className="lbl">Arrival</span><span className="ctl__in"><input type="date" value={plan.arrival} min={new Date().toISOString().slice(0, 10)} onChange={e => plan.setArrival(e.target.value)} /><span className="ctl__flex" aria-hidden="true">Flexible</span></span></label>
        </div>
        <div className="waters" role="group" aria-label="Waters for your week">
          {WATERS.map(x => (
            <button key={x.k} type="button" className="wbtn" aria-pressed={plan.waters.includes(x.k)} onClick={() => plan.toggle(x.k)}>
              <b>{x.name}</b><i>{x.species}</i>
            </button>
          ))}
        </div>
        <div className="wk" aria-live="polite">
          <ul className="wk__lines tnum">
            {plan.anglers ? <li><span>{w.boats} boat{w.boats > 1 ? 's' : ''}, two anglers a boat, for {plan.days} guided day{plan.days === 1 ? '' : 's'}</span><Num v={`${w.guideDays} guide days`} /></li> : <li><span>No anglers: a beach week with bikes, kayaks and snorkel gear</span><span /></li>}
            <li><span>Guide gratuity, $125 a boat a day, recommended</span><Num v={money(w.tipGuides)} /></li>
            <li><span>Lodge staff, $35 a guest a night, recommended</span><Num v={money(w.tipStaff)} /></li>
          </ul>
          <p className="wk__sum"><span>Gratuities to budget</span><Num v={money(w.tips)} /></p>
          <p className="wk__note">Package price per person from the season sheet. As day trips, no room: {money(w.dayTrips)}.</p>
          <div className="wk__acts">
            <a className="btn" href={mail(plan)}>Send my week to the lodge</a>
            <a className="link" href={BOOK}>Book a room</a>
            <a className="link tnum" href={PHONES[0][1]}>{PHONES[0][0]}</a>
          </div>
        </div>
      </div>
      <div className="plan__map"><Chart plan={plan} /></div>
    </section>
  )
}

export function PhoneBar({ plan }: { plan: Plan }) {
  const w = week(plan)
  return (
    <div className="pbar">
      <a href="#plan" className="pbar__t"><span className="pbar__n">{plan.anglers ? `${plan.anglers} angler${plan.anglers > 1 ? 's' : ''}` : `${w.guests} guest${w.guests === 1 ? '' : 's'}`}, {plan.nights} nights</span><span className="tnum">{w.boats ? `${w.boats} boat${w.boats > 1 ? 's' : ''}` : 'A beach week'}, gratuities {money(w.tips)}</span></a>
      <a className="btn" href={mail(plan)}>Send</a>
    </div>
  )
}

/* ---------- screen 2 ---------- */
export function Waters({ plan }: { plan: Plan }) {
  return (
    <section className="wl" id="waters" aria-labelledby="wl-h">
      <h2 id="wl-h">Where you'll&nbsp;fish.</h2>
      <ol>
        {WATERS.map((x, i) => (
          <li key={x.k} className={'wl__row' + (i === 0 ? ' is-lead' : '')}>
            <Photo pic={x.pic} className="wl__pic" />
            <div className="wl__text">
              <h3>{x.name}</h3>
              <p className="wl__m">{x.method}</p>
              <p className="wl__s"><i>{x.species}</i></p>
              <p>{x.note}</p>
              <button type="button" className="link" aria-pressed={plan.waters.includes(x.k)} onClick={() => plan.toggle(x.k)}>{plan.waters.includes(x.k) ? 'In your week' : 'Add to your week'}</button>
            </div>
          </li>
        ))}
      </ol>
      <p className="credit">Photographs courtesy of Lauren Brown Photography and Ian Davis at Yellow Dog Fly Fishing.</p>
    </section>
  )
}

/* ---------- fishing page: spearfishing, the gallery, questions ---------- */
export function Spear() {
  return (
    <section className="spear" aria-labelledby="sp-h">
      <Photo pic={IMG.spear} className="spear__pic" />
      <div className="spear__t">
        <h2 id="sp-h">Spearfishing, for your&nbsp;dinner.</h2>
        <p>If you want the primal feeling of hunting for your dinner, the team arranges guided spearfishing tours and lessons on the reef, beginners included.</p>
        <a className="link" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Spearfishing at Swain\'s Cay Lodge')}`}>Ask about a spearfishing day</a>
      </div>
    </section>
  )
}
export function Gallery() {
  return (
    <section className="gal" aria-labelledby="ga-h">
      <div className="gal__head"><h2 id="ga-h">More from the lodge's&nbsp;gallery.</h2><p className="small">With the five above, the full fishing gallery from swainscaylodge.com.</p></div>
      <ul className="gal__grid">{GALLERY.map((g, i) => <li key={g.src} className={'g' + i}><Photo pic={g} /></li>)}</ul>
      <p className="credit">Photography courtesy of Lauren Brown Photography and Ian Davis at Yellow Dog Fly Fishing.</p>
    </section>
  )
}
export function Faq() {
  return (
    <section className="faq" aria-labelledby="fq-h">
      <h2 id="fq-h">Questions anglers&nbsp;ask.</h2>
      <dl>{FAQ.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}</dl>
    </section>
  )
}

export function Band() {
  return <figure className="band"><Photo pic={IMG.h1} /><figcaption>Mangrove Cay, between the Middle and South Bights of Andros.</figcaption></figure>
}

/* ---------- screen 3 ---------- */
export function Season() {
  return (
    <section className="season" id="season" aria-labelledby="se-h">
      <div className="season__in">
        <h2 id="se-h">The 2026-2027 season, in plain&nbsp;words.</h2>
        <p className="season__sub">March 2026 to April 2027. Twelve units, up to 26 guests.</p>
        <div className="season__rates tnum">
          <p><b>$975</b><span>a day trip, per boat, one or two anglers, lunch and transport, lodging not included</span></p>
          <p><b>Half day</b><span>a la carte</span></p>
          <p><b>$450</b><span>the non-angler rate</span></p>
        </div>
        <div className="season__cols">
          <div><h3>In the package</h3><ul>{INCLUDED.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div><h3>Not included</h3><ul>{EXCLUDED.map(i => <li key={i}>{i}</li>)}</ul></div>
        </div>
        <dl className="season__terms">
          <div><dt>Deposit</dt><dd>50% within 21 days of booking; the balance 90 days before you arrive.</dd></div>
          <div><dt>Gratuities</dt><dd>Recommended: $125 a day per boat per guide, and $35 a night per guest for the lodge staff.</dd></div>
          <div><dt>Licences</dt><dd>Buy your Bahamas fishing licence online at <a href={LICENCE}>license.gooutdoorsbahamas.com</a>.</dd></div>
          <div><dt>Arrival</dt><dd>Check-in after 2 pm, flexible check-out.</dd></div>
        </dl>
      </div>
    </section>
  )
}

export function PageHead({ h1, lede, pic }: { h1: string; lede: string; pic: Pic }) {
  return (
    <section className="phead" aria-labelledby="ph-h">
      <div className="phead__t"><p className="kicker">Mangrove Cay, Andros. An Orvis Endorsed fly fishing lodge.</p><h1 id="ph-h">{h1}</h1><p className="lede">{lede}</p></div>
      <Photo pic={pic} eager className="phead__pic" />
    </section>
  )
}

/* ---------- screen 4 + 5 ---------- */
function RoomPicker() {
  const [i, setI] = useState(0)
  const r = ROOMS[i]
  return (
    <div className="rp">
      <ul className="rp__list" role="tablist" aria-label="Rooms">
        {ROOMS.map((x, k) => (
          <li key={x.name}><button type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}><b>{x.name}</b><span>{x.d}</span></button></li>
        ))}
      </ul>
      <div className="rp__pic" role="tabpanel" aria-label={r.name}>
        <AnimatePresence initial={false}>
          <motion.img key={r.name} src={r.pic.src} width={r.pic.w} height={r.pic.h} alt={r.pic.alt} loading="lazy" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} />
        </AnimatePresence>
      </div>
    </div>
  )
}
export function Lodge() {
  return (
    <section className="lodge" id="lodge" aria-labelledby="lo-h">
      <div className="lodge__head">
        <h2 id="lo-h">Four ways to sleep by the&nbsp;flat.</h2>
        <a className="btn btn--line" href={BOOK}>Book a room</a>
      </div>
      <RoomPicker />
      <div className="reefside">
        <Photo pic={IMG.dining} className="reefside__pic" />
        <div>
          <h3>Reefside Restaurant &amp; Bar.</h3>
          <p>Right on the beach: authentic Bahamian cuisine, fresh and home-cooked, for breakfast and dinner.</p>
        </div>
      </div>
    </section>
  )
}
export function NonAngler() {
  const list = [['Kayak', 'along the bights, and spot the creatures of the air and sea.'], ['Snorkel', 'the tropical underwater landscape.'], ['Ride', 'a bike around Mangrove Cay for its flora and fauna.'], ['Do nothing', 'on a beach lounger while a warm breeze blows.']]
  return (
    <section className="non" aria-labelledby="no-h">
      <Photo pic={IMG.welcome} className="non__pic" />
      <div className="non__text">
        <h2 id="no-h">For the one who isn't&nbsp;fishing.</h2>
        <p>Bicycles, kayaks and snorkelling gear are free for guests.</p>
        <ul>{list.map(([a, b]) => <li key={a}><b>{a}</b> {b}</li>)}</ul>
      </div>
    </section>
  )
}

/* ---------- screen 6 ---------- */
export function Reviews() {
  return (
    <section className="rev" id="reviews" aria-labelledby="rv-h">
      <h2 id="rv-h">What guests&nbsp;say.</h2>
      <div className="rev__list">
        {REVIEWS.map(r => <blockquote key={r.by}><p>“{r.q}”</p><footer>{r.by}, <span className="tnum">{r.date}</span></footer></blockquote>)}
      </div>
      <p className="small">From the Google and TripAdvisor review feed on swainscaylodge.com, quoted in full.</p>
    </section>
  )
}

/* ---------- screen 7 ---------- */
export function GettingHere() {
  return (
    <section className="gh" id="getting-here" aria-labelledby="gh-h">
      <h2 id="gh-h">Through Nassau to Mangrove&nbsp;Cay.</h2>
      <ol className="gh__steps">
        <li><b>Fly to Nassau.</b> Airfare to and from Nassau is yours to book.</li>
        <li><b>On to Mangrove Cay</b> by air or with Bahamas Ferries.</li>
        <li><b>Met and driven.</b> Airport and dock transfers are part of every fishing package.</li>
      </ol>
      <h3 className="gh__oh">Offers, as published</h3>
      <ul className="offers">
        {OFFERS.map(o => <li key={o.t}><b>{o.t}.</b> {o.d} <span>{o.when}</span></li>)}
      </ul>
    </section>
  )
}

/* ---------- screen 8 ---------- */
export function Contact({ plan }: { plan: Plan }) {
  return (
    <footer className="contact" id="contact">
      <div>
        <h2>Tell the lodge about your&nbsp;week.</h2>
        <div className="contact__acts"><a className="btn" href={mail(plan)}>Send my week to the lodge</a><a className="link" href={BOOK}>Book a room</a></div>
      </div>
      <ul className="contact__list">
        <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
        {PHONES.map(([l, t]) => <li key={l}><a className="tnum" href={t}>{l}</a></li>)}
        <li><span>Mangrove Cay Settlement, Mangrove Cay, Andros, The Bahamas</span><a className="link" href={FB}>Facebook</a></li>
      </ul>
      <p className="credit">Photography: Swain's Cay Lodge, Lauren Brown Photography and Ian Davis at Yellow Dog Fly Fishing. Chart: Natural Earth coastline, public domain; positions approximate.</p>
    </footer>
  )
}
