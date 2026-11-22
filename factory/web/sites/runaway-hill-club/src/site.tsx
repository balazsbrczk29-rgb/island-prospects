import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { IMG, ROOMS, HOUSES, EMAIL, BOOK, MAP_PDF, TRIP, INSTA, LOCAL, LOCAL_TEL, US, US_TEL, ADDRESS, TERMS, QUOTES, DESCENT, ROUTE, money, money0, type Pic, type Room } from './data'

const ease = [0.22, 1, 0.36, 1] as const

export function Photo({ pic, eager, className = '', ratio }: { pic: Pic; eager?: boolean; className?: string; ratio?: string }) {
  return (
    <span className={'frame ' + className} style={{ maxWidth: pic.w + 22, aspectRatio: ratio }}>
      <img src={pic.src} width={pic.w} height={pic.h} alt={pic.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined} />
    </span>
  )
}

/* ---------- plan state ---------- */
export type Plan = ReturnType<typeof usePlan>
export function usePlan() {
  const [room, setRoom] = useState(0)
  const [arrival, setArrival] = useState('')
  const [nights, setNights] = useState(3)
  const [guests, setGuests] = useState(2)
  const [extra, setExtra] = useState(0)
  return { room, setRoom, arrival, setArrival, nights, setNights, guests, setGuests, extra, setExtra }
}
const fmtDate = (iso: string, add = 0) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + add); return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }
export function totals(r: Room, nights: number, extra: number) {
  const sub = r.rate * nights, ten = Math.round(sub * 10) / 100
  return { sub, ten, extras: extra * 150, total: sub + ten * 3 + extra * 150 }
}
function mailto(plan: Plan) {
  const r = ROOMS[plan.room], t = totals(r, plan.nights, plan.extra)
  const when = plan.arrival ? `${fmtDate(plan.arrival)} to ${fmtDate(plan.arrival, plan.nights)}` : 'dates to confirm'
  const subject = `Room ${r.n}, ${r.name}, ${when}`
  const body = `Hello,\n\nI would like to ask about ${r.n === 'IH' ? 'the Infinity House' : `Room ${r.n}, ${r.name} (${r.house})`}.\nArrival: ${plan.arrival ? fmtDate(plan.arrival) : 'to confirm'}\nNights: ${plan.nights}\nGuests: ${plan.guests}${plan.extra ? `\nCots or extra persons over 10: ${plan.extra}` : ''}\nMy estimate from your published rates: ${money(t.total)} with tax and gratuity.\n\nThank you.`
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/* ---------- header ---------- */
export function Header({ current }: { current?: string }) {
  const nav: [string, string][] = [['Rooms', 'rooms.html'], ['The house', 'island.html#house'], ['Dining and events', 'island.html#dining'], ['Getting here', 'island.html#getting-here']]
  return (
    <header className="hd">
      <a className="hd__mark" href="./">Runaway Hill Inn</a>
      <nav className="hd__nav" aria-label="Site">
        {nav.map(([l, h]) => <a key={l} href={h} aria-current={current === l ? 'page' : undefined}>{l}</a>)}
      </nav>
      <a className="hd__tel tnum" href={LOCAL_TEL}>{LOCAL}</a>
      <a className="btn btn--line btn--sm" href={BOOK}>Book</a>
    </header>
  )
}

/* ---------- rolling total ---------- */
function Roll({ v }: { v: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="roll tnum" aria-label={v}>
      {v.split('').map((c, i) => (
        <span key={i} className="roll__c" aria-hidden="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={c} initial={reduce ? { opacity: 0 } : { y: '0.6em', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { y: '-0.6em', opacity: 0 }} transition={{ duration: 0.28, ease, delay: i * 0.012 }}>{c}</motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}

function Stepper({ label, v, set, min, max, id }: { label: string; v: number; set: (n: number) => void; min: number; max: number; id: string }) {
  return (
    <div className="step" role="group" aria-labelledby={id}>
      <span className="step__l" id={id}>{label}</span>
      <div className="step__c">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={v <= min} onClick={() => set(Math.max(min, v - 1))}>−</button>
        <span className="tnum" aria-live="polite">{v}</span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={v >= max} onClick={() => set(Math.min(max, v + 1))}>+</button>
      </div>
    </div>
  )
}

const FILTERS: [string, (r: Room) => boolean][] = [['All rooms', () => true], ['King', r => r.king], ['Queen', r => /^queen/i.test(r.bed)], ['Room for three or more', r => r.three], ['Whole house', r => r.n === 'IH']]

/* ---------- screen 1: the register ---------- */
export function Register({ plan, h1 = 'Twelve rooms, each with a name.', level = 1 }: { plan: Plan; h1?: string; level?: 1 | 2 }) {
  const [f, setF] = useState(0)
  const r = ROOMS[plan.room]
  const t = totals(r, plan.nights, plan.extra)
  const list = ROOMS.map((x, i) => ({ x, i })).filter(({ x }) => FILTERS[f][1](x))
  const hidden = !FILTERS[f][1](r)
  const listRef = useRef<HTMLDivElement>(null)
  const optRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const onKey = (e: React.KeyboardEvent) => {
    const pos = list.findIndex(o => o.i === plan.room)
    const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const nx = list[Math.min(list.length - 1, Math.max(0, pos + d))]
    if (nx) plan.setRoom(nx.i)
  }
  useEffect(() => {
    const box = listRef.current, el = optRefs.current[plan.room]
    if (!box || !el || box.scrollHeight <= box.clientHeight + 1) return
    const top = el.offsetTop - box.offsetTop, bottom = top + el.offsetHeight
    if (top < box.scrollTop + 32) box.scrollTo({ top: top - 32, behavior: 'smooth' })
    else if (bottom > box.scrollTop + box.clientHeight) box.scrollTo({ top: bottom - box.clientHeight, behavior: 'smooth' })
  }, [plan.room])
  const H = level === 1 ? 'h1' : 'h2'
  return (
    <section className="reg" id="book" aria-labelledby="reg-h">
      <figure className="reg__pic">
        <div className="reg__frame">
          <AnimatePresence initial={false}>
            <motion.img key={r.n} src={r.pic.src} width={r.pic.w} height={r.pic.h} alt={r.pic.alt} fetchPriority="high"
              initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.52, ease }} />
          </AnimatePresence>
        </div>
        <figcaption><em>{r.n === 'IH' ? 'The Infinity House' : `Room ${r.n}, ${r.name}`}.</em> {r.house === 'Infinity House' ? 'Five bedrooms on the ocean.' : `${r.house}. ${r.bed}.`}</figcaption>
      </figure>
      <div className="reg__tool">
        <p className="kicker">Harbour Island, The Bahamas</p>
        <H id="reg-h">{h1}</H>
        <p className="reg__lede">A 1946 English manor on the hill above Pink Sands Beach.</p>
        <div className="dates">
          <label className="date">
            <span className="step__l">Arrival</span>
            <input type="date" value={plan.arrival} min={new Date().toISOString().slice(0, 10)} onChange={e => plan.setArrival(e.target.value)} aria-describedby="dep" />
          </label>
          <Stepper label="Nights" id="st-n" v={plan.nights} set={plan.setNights} min={3} max={28} />
          <Stepper label="Guests" id="st-g" v={plan.guests} set={plan.setGuests} min={1} max={10} />
          <Stepper label="Cot or extra, $150" id="st-x" v={plan.extra} set={plan.setExtra} min={0} max={3} />
        </div>
        <p className="dates__note" id="dep">{plan.arrival ? <>Leaving {fmtDate(plan.arrival, plan.nights)}. </> : null}Three-night minimum.</p>
        <div className="filters" role="group" aria-label="Filter rooms">
          {FILTERS.map(([l], i) => <button key={l} type="button" className="fchip" aria-pressed={f === i} onClick={() => setF(i)}>{l}</button>)}
        </div>
        <div className="ledger" ref={listRef} role="listbox" aria-label="Rooms" aria-activedescendant={'room-' + r.n} tabIndex={0} onKeyDown={onKey}>
          {HOUSES.map(({ h }) => {
            const rows = list.filter(o => o.x.house === h)
            if (!rows.length) return null
            return (
              <div key={h} className="ledger__g" role="group" aria-label={h}>
                <p className="ledger__h">{h}</p>
                {rows.map(({ x, i }) => (
                  <div key={x.n} id={'room-' + x.n} ref={el => { optRefs.current[i] = el }} role="option" aria-selected={i === plan.room} className="lrow" onClick={() => plan.setRoom(i)}>
                    {i === plan.room && <motion.span layoutId={'sel-' + level} className="lrow__sel" transition={{ duration: 0.22, ease }} />}
                    <span className="lrow__n tnum">{x.n}</span>
                    <span className="lrow__name">{x.name}<span className="lrow__bed">{x.bed}</span></span>
                    <span className="lrow__rate tnum">{money0(x.rate)}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        {hidden && <p className="dates__note">Your room is hidden by this filter. <button type="button" className="link" onClick={() => setF(0)}>Show all rooms</button></p>}
        <div className="total" aria-live="polite">
          <div className="total__sum">
            <p className="total__lines tnum">{plan.nights} nights at {money0(r.rate)}, {money(t.sub)}<br />Room gratuity, VAT and resort levy, 10% each, {money(t.ten * 3)}{plan.extra ? <><br />{plan.extra} {plan.extra > 1 ? 'cots or extra persons' : 'cot or extra person'} over 10, {money(t.extras)}</> : null}</p>
            <p className="total__big"><span>Your stay</span><Roll v={money(t.total)} /></p>
          </div>
          {r.check && <p className="total__check">{r.check}</p>}
          <div className="total__acts">
            <a className="btn" href={BOOK}>Book this room</a>
            <a className="link" href={mailto(plan)}>Ask about this room</a>
            <a className="link tnum" href={US_TEL}>{US}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- phone booking bar ---------- */
export function PhoneBar({ plan }: { plan: Plan }) {
  const r = ROOMS[plan.room], t = totals(r, plan.nights, plan.extra)
  return (
    <div className="pbar" aria-label="Your room">
      <a href="#book" className="pbar__room"><span className="pbar__name">{r.n === 'IH' ? 'Infinity House' : `${r.n}. ${r.name}`}</span><span className="tnum">{plan.nights} nights, {money(t.total)}</span></a>
      <a className="btn" href={BOOK}>Book</a>
    </div>
  )
}

/* ---------- screen 2: the descent ---------- */
export function Descent() {
  const [on, setOn] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setOn(+(e.target as HTMLElement).dataset.i!) }), { rootMargin: '-45% 0px -45% 0px' })
    refs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <section className="descent" id="house" aria-labelledby="desc-h">
      <div className="descent__text">
        <h2 id="desc-h">From the house to the&nbsp;sand.</h2>
        <ol className="descent__steps">
          {DESCENT.map((s, i) => (
            <li key={s.t} className={i === on ? 'is-on' : ''}><b>{s.t}</b><span>{s.d}</span></li>
          ))}
        </ol>
      </div>
      <div className="descent__pics">
        {DESCENT.map((s, i) => (
          <figure key={s.t} data-i={i} ref={el => { refs.current[i] = el }}>
            <p className="descent__mob"><b>{s.t}.</b> {s.d}</p>
            <Photo pic={s.pic} />
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- screen 3: the full register ---------- */
export function Ledger({ plan }: { plan: Plan }) {
  const choose = (i: number) => { plan.setRoom(i); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const ih = ROOMS.length - 1, IH = ROOMS[ih]
  return (
    <section className="ledgerfull" id="rooms" aria-labelledby="lf-h">
      <div className="lf__head">
        <h2 id="lf-h">The register.</h2>
        <p className="lede">Every room, where it sits, its bed and its published nightly rate, before and after tax and gratuity.</p>
      </div>
      {HOUSES.slice(0, 3).map(({ h, d }) => (
        <div key={h} className="lf__group">
          <div className="lf__gh"><h3>{h}</h3><p>{d}</p></div>
          <ol className="lf__rows">
            {ROOMS.map((x, i) => x.house !== h ? null : (
              <li key={x.n} className="lf__row">
                <Photo pic={x.pic} className="lf__thumb" ratio="1 / 1" />
                <span className="lf__n tnum">{x.n}</span>
                <span className="lf__name"><b>{x.name}</b><span>{x.bed}. {x.note}</span></span>
                <span className="lf__rate tnum"><b>{money0(x.rate)}</b><span>{money(x.withTax)} with tax</span></span>
                <button type="button" className="link" onClick={() => choose(i)}>Choose<span className="sr"> {x.name}</span></button>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <div className="ih">
        <Photo pic={IH.pic} className="ih__pic" />
        <div className="ih__text">
          <h3>The Infinity House.</h3>
          <p>{HOUSES[3].d}</p>
          <dl className="ih__dl">
            <div><dt>Bedrooms</dt><dd>Three kings, and two rooms of two twins</dd></div>
            <div><dt>Inside</dt><dd>2½ baths, kitchen, living room, washer and dryer</dd></div>
            <div><dt>Outside</dt><dd>Outdoor shower, barbecue, a large courtyard and an oceanfront deck</dd></div>
            <div><dt>By the week</dt><dd className="tnum">$21,750, or $28,275 with tax and gratuity</dd></div>
            <div><dt>By the day</dt><dd className="tnum">$3,107.14, or $4,039.28 with tax and gratuity</dd></div>
          </dl>
          <button type="button" className="btn btn--line" onClick={() => choose(ih)}>Choose the Infinity House</button>
        </div>
      </div>
      <p className="terms">{TERMS} <a className="link" href={MAP_PDF}>See the property map (PDF)</a></p>
    </section>
  )
}

/* ---------- screen 4: dinner, events ---------- */
export function Dining() {
  return (
    <section className="dine" id="dining" aria-labelledby="dine-h">
      <div className="dine__top">
        <Photo pic={IMG.restaurant} className="dine__big" />
        <div className="dine__text">
          <h2 id="dine-h">Dinner on the&nbsp;hill.</h2>
          <p>The restaurant and bar sit in the Main House with views over the ocean. Room service in your room, and a full concierge for everything else.</p>
        </div>
      </div>
      <div className="dine__pair">
        <figure><Photo pic={IMG.lounge} /><figcaption>The oceanfront lounge.</figcaption></figure>
        <figure><Photo pic={IMG.patio} /><figcaption>Drinks on the patio.</figcaption></figure>
      </div>
      <div className="dine__events">
        <figure><Photo pic={IMG.wedding} /></figure>
        <div>
          <h3>Weddings and celebrations.</h3>
          <p>The inn hosts weddings and special events, and its events team sees to every detail. With the Infinity House next door, the whole party can stay together.</p>
          <a className="link" href={`mailto:${EMAIL}?subject=${encodeURIComponent('An event at Runaway Hill Inn')}`}>Write to the events team</a>
        </div>
        <figure><Photo pic={IMG.yoga} /></figure>
        <div>
          <h3>Days on the island.</h3>
          <p>Unwind on one of the world’s most beautiful beaches, below the house. Water sports, boutique shops, and a massage, yoga or fitness class when you book one.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- screen 5: getting here ---------- */
export function GettingHere() {
  return (
    <section className="route" id="getting-here" aria-labelledby="route-h">
      <h2 id="route-h">Plane, taxi, boat,&nbsp;hill.</h2>
      <ol className="route__steps">
        {ROUTE.map(([k, d], i) => <li key={k}><span className="route__n tnum">{i + 1}</span><b>{k}</b><span>{d}</span></li>)}
      </ol>
      <p className="small">The concierge will help you plan the journey: write to <a className="link" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Getting to Runaway Hill Inn')}`}>{EMAIL}</a>.</p>
    </section>
  )
}

/* ---------- screen 6: contact ---------- */
export function Contact({ plan }: { plan: Plan }) {
  const r = ROOMS[plan.room]
  return (
    <footer className="contact" id="contact" aria-labelledby="ct-h">
      <div className="contact__quotes">
        {QUOTES.map(q => (
          <blockquote key={q.by}><p>“{q.q}”</p><footer>{q.by}</footer></blockquote>
        ))}
        <p className="small">As published on runawayhill.com. <a className="link" href={TRIP}>Read more on TripAdvisor</a></p>
      </div>
      <div className="contact__main">
        <h2 id="ct-h">Write to the&nbsp;house.</h2>
        <ul className="contact__list">
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><a className="tnum" href={LOCAL_TEL}>{LOCAL}</a><span>on the island</span></li>
          <li><a className="tnum" href={US_TEL}>{US}</a><span>from the US and Canada</span></li>
          <li><span className="addr">{ADDRESS}</span></li>
        </ul>
        <p className="contact__links"><a className="link" href={MAP_PDF}>Property map (PDF)</a><a className="link" href={INSTA}>Instagram</a></p>
        <div className="contact__acts">
          <a className="btn" href={BOOK}>Book {r.n === 'IH' ? 'the Infinity House' : r.name}</a>
          <a className="link" href={mailto(plan)}>Ask about this room</a>
        </div>
        <p className="credit">Photography: Runaway Hill Inn. Runaway Hill Inn is listed on some sites as Runaway Hill Club.</p>
      </div>
    </footer>
  )
}

