import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { IMG, EMAIL, AIR, PHONES, FB, RATES, UNITS, WINTER_START, WINTER_END, ACTIVITIES, INCLUDED, DIVES, money, money0, type Pic, type Unit } from './data'

const ease = [0.22, 1, 0.36, 1] as const

export function Photo({ pic, eager, className = '' }: { pic: Pic; eager?: boolean; className?: string }) {
  return <span className={'ph ' + className}><img src={pic.src} width={pic.w} height={pic.h} alt={pic.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined} /></span>
}

/* ---------- plan ---------- */
const iso = (d: Date) => d.toISOString().slice(0, 10)
const addDays = (s: string, n: number) => { const d = new Date(s + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d) }
const nice = (s: string) => new Date(s + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })
export type Plan = ReturnType<typeof usePlan>
export function usePlan() {
  const [arrival, setArrival] = useState(() => addDays(iso(new Date()), 30))
  const [nights, setNights] = useState(7)
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [unitId, setUnitId] = useState<string | null>(null)
  const [meals, setMeals] = useState(false)
  const [acts, setActs] = useState<string[]>([])
  return { arrival, setArrival, nights, setNights, adults, setAdults, kids, setKids, unitId, setUnitId, meals, setMeals, acts, setActs }
}

export const isOver = (x: Unit, adults: number) => x.cat !== 'house' && x.cat !== 'housepool' && adults > RATES[x.cat].max
export function fitOrder(adults: number, kids: number) {
  const guests = adults + kids, need = Math.max(1, Math.ceil(guests / 2))
  const score = (x: Unit) => {
    const over = isOver(x, adults) ? 1 : 0
    const short = x.bedrooms < need ? 1 : 0
    const gap = Math.abs(x.bedrooms - need)
    return over * 100 + short * 50 + gap * 10 - (x.pool ? 2 : 0) - (x.beach ? 3 : 0)
  }
  return [...UNITS].sort((a, b) => score(a) - score(b) || UNITS.indexOf(a) - UNITS.indexOf(b))
}

export function quote(x: Unit, p: { arrival: string; nights: number; adults: number; kids: number; meals: boolean }) {
  const R = RATES[x.cat], guests = p.adults + p.kids
  const occ = Math.min(p.adults, R.max), extraAdults = Math.max(0, p.adults - R.max)
  let rooms = 0, sN = 0, wN = 0, unpublished = 0
  for (let i = 0; i < p.nights; i++) {
    const d = addDays(p.arrival, i)
    const winter = d >= WINTER_START
    if (d >= WINTER_END) unpublished++
    if (winter) wN++; else sN++
    rooms += (winter ? R.w : R.s)[Math.max(1, occ)] + extraAdults * 40
  }
  const vat = rooms * 0.1, levy = rooms * 0.066
  const maid = 6 * guests * p.nights
  const energy = R.energy * guests * p.nights * 1.1
  const mealPlan = p.meals ? 83 * guests * p.nights * 1.25 : 0
  const total = rooms + vat + levy + maid + energy + mealPlan
  const depN = p.nights <= 2 ? 1 : p.nights <= 4 ? 2 : p.nights <= 7 ? 3 : p.nights <= 9 ? 0 : 5
  return { rooms, vat, levy, maid, energy, mealPlan, total, sN, wN, unpublished, extraAdults, depN, deposit: depN ? (total / p.nights) * depN : 0, energyRate: R.energy }
}
const seasonLine = (q: ReturnType<typeof quote>) =>
  q.sN && q.wN ? `${q.sN} summer and ${q.wN} winter nights` : q.wN ? 'Winter 2026-27 rates' : 'Summer 2026 rates'

function mailStay(p: Plan, x: Unit, q: ReturnType<typeof quote>) {
  const lines = [
    `Place: ${x.name} (${x.kind})`,
    `Arrival: ${nice(p.arrival)}, ${p.nights} nights, leaving ${nice(addDays(p.arrival, p.nights))}`,
    `Party: ${p.adults} adult${p.adults > 1 ? 's' : ''}${p.kids ? `, ${p.kids} child${p.kids > 1 ? 'ren' : ''} 12 and under` : ''}`,
    `Meal plan: ${p.meals ? 'yes, please' : 'no'}`,
    p.acts.length ? `Interested in: ${p.acts.join(', ')}` : '',
    `My estimate from your published rates:`,
    `  Rooms ${money(q.rooms)}, VAT ${money(q.vat)}, resort levy and VAT ${money(q.levy)}`,
    `  Maid service ${money(q.maid)}, energy surcharge and VAT ${money(q.energy)}${p.meals ? `, meal plan ${money(q.mealPlan)}` : ''}`,
    `  Total ${money(q.total)}${q.depN ? `, deposit ${q.depN} nights` : ''}`,
  ].filter(Boolean)
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`Stay request: ${x.name}, ${nice(p.arrival)}, ${p.nights} nights`)}&body=${encodeURIComponent(`Hello,\n\n${lines.join('\n')}\n\nThank you.`)}`
}
function mailAir(p: Plan) {
  return `mailto:${AIR}?cc=${EMAIL}&subject=${encodeURIComponent(`Flights to Stella Maris, ${nice(p.arrival)}`)}&body=${encodeURIComponent(`Hello,\n\nWe would like to fly from Nassau to Stella Maris Airport (SML) on ${nice(p.arrival)} and back on ${nice(addDays(p.arrival, p.nights))}.\nParty: ${p.adults} adults${p.kids ? `, ${p.kids} children` : ''}.\nOur international flight arrives in Nassau at: \n\nThank you.`)}`
}

/* ---------- header ---------- */
export function Header({ current }: { current?: string }) {
  const nav: [string, string][] = [['Places to stay', 'stay.html'], ['The island', 'island.html'], ['Getting here', 'island.html#getting-here'], ['Weddings', 'island.html#weddings']]
  return (
    <header className="hd">
      <a className="hd__mark" href="./">Stella Maris<span>Resort Club</span></a>
      <nav className="hd__nav" aria-label="Site">
        {nav.map(([l, h]) => <a key={l} href={h} aria-current={current === l ? 'page' : undefined}>{l}</a>)}
      </nav>
      <a className="hd__tel tnum" href={PHONES[0][1]}>{PHONES[0][0]}</a>
      <a className="hd__plan" href="./#plan">Plan your stay</a>
    </header>
  )
}

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
      <span className="lbl" id={id}>{label}</span>
      <div className="step__c">
        <button type="button" aria-label={`Fewer: ${label}`} disabled={v <= min} onClick={() => set(Math.max(min, v - 1))}>−</button>
        <span className="tnum" aria-live="polite">{v}</span>
        <button type="button" aria-label={`More: ${label}`} disabled={v >= max} onClick={() => set(Math.min(max, v + 1))}>+</button>
      </div>
    </div>
  )
}

/* ---------- screen 1: the planner ---------- */
export function Planner({ plan, h1 = true }: { plan: Plan; h1?: boolean }) {
  const order = useMemo(() => fitOrder(plan.adults, plan.kids), [plan.adults, plan.kids])
  const unit = UNITS.find(x => x.id === plan.unitId) ?? order[0]
  const q = quote(unit, plan)
  const reduce = useReducedMotion()
  const stripRef = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  useEffect(() => {
    const box = stripRef.current, el = refs.current[unit.id]
    if (!box || !el) return
    const l = el.offsetLeft - box.offsetLeft
    if (l < box.scrollLeft || l + el.offsetWidth > box.scrollLeft + box.clientWidth) box.scrollTo({ left: l - 16, behavior: reduce ? 'auto' : 'smooth' })
  }, [unit.id, order, reduce])
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const i = order.findIndex(x => x.id === unit.id), n = order[Math.min(order.length - 1, Math.max(0, i + d))]
    plan.setUnitId(n.id); refs.current[n.id]?.focus()
  }
  const H = h1 ? 'h1' : 'h2'
  const lines: [string, number, string?][] = [
    [`${plan.nights} nights, ${seasonLine(q)}${q.extraAdults ? `, ${q.extraAdults} extra adult${q.extraAdults > 1 ? 's' : ''} at $40` : ''}`, q.rooms],
    ['VAT, 10%', q.vat],
    ['Resort levy, 6%, and its VAT', q.levy],
    [`Maid service, $6 a guest a night`, q.maid],
    [`Energy surcharge, $${q.energyRate} a guest a night, and its VAT`, q.energy],
  ]
  if (plan.meals) lines.push(['Meal plan, $83 a guest a night, gratuity and VAT', q.mealPlan])
  return (
    <section className="plan" id="plan" aria-labelledby="plan-h">
      <div className="plan__tool">
        <p className="kicker">Stella Maris, Long Island, The Bahamas</p>
        <H id="plan-h">Ten places to stay. Your week, added&nbsp;up.</H>
        <div className="ctl">
          <label className="ctl__date"><span className="lbl">Arrival</span>
            <input type="date" value={plan.arrival} min={iso(new Date())} onChange={e => e.target.value && plan.setArrival(e.target.value)} />
          </label>
          <Stepper label="Nights" id="s-n" v={plan.nights} set={plan.setNights} min={1} max={28} />
          <Stepper label="Adults" id="s-a" v={plan.adults} set={plan.setAdults} min={1} max={10} />
          <Stepper label="Children" id="s-k" v={plan.kids} set={plan.setKids} min={0} max={6} />
        </div>
        <div className="sum" aria-live="polite">
          <p className="sum__place"><b>{unit.name}</b> <span>{nice(plan.arrival)} to {nice(addDays(plan.arrival, plan.nights))}</span></p>
          <ul className="sum__lines tnum">
            {lines.map(([l, v]) => <li key={l.split(',')[0]}><span>{l}</span><span>{money(v)}</span></li>)}
          </ul>
          <label className="sum__meal"><input type="checkbox" checked={plan.meals} onChange={e => plan.setMeals(e.target.checked)} /> <span>Add the meal plan (MAP), drinks not included</span></label>
          <p className="sum__total"><span>Estimate, confirmed by reservations</span><Roll v={money(q.total)} /></p>
          {isOver(unit, plan.adults) && <p className="sum__warn">{unit.name} has a published rate for up to {RATES[unit.cat].max} adults. For {plan.adults}, ask reservations or choose a house.</p>}
          {plan.nights === 5 && plan.adults <= 2 && addDays(plan.arrival, 5) <= '2026-12-19' && <p className="sum__pkg">Or the Sun &amp; Sea all-inclusive for these five nights: {plan.adults === 1 ? '$1,867 single' : '$2,945 double'}, valid to 19 December 2026.</p>}
          <p className="sum__dep tnum">{q.depN ? `Deposit: ${q.depN} night${q.depN > 1 ? 's' : ''}, about ${money0(q.deposit)}.` : 'Deposit for 8 or 9 nights: ask reservations.'} Children 12 and under stay free.{q.unpublished ? ' Nights from 18 April 2027 are priced at winter rates until new rates are published.' : ''}</p>
          <div className="sum__acts">
            <a className="btn" href={mailStay(plan, unit, q)}>Send this stay to reservations</a>
            <a className="link" href={mailAir(plan)}>Add flights from Nassau</a>
            <a className="link tnum" href={PHONES[0][1]}>{PHONES[0][0]}</a>
          </div>
        </div>
      </div>
      <div className="plan__view">
        <Photo pic={IMG.hero} eager className="plan__hero" />
        <div className="strip" ref={stripRef} role="radiogroup" aria-label="Places to stay, best fit for your party first" onKeyDown={onKey}>
          {order.map(x => {
            const R = RATES[x.cat], over = isOver(x, plan.adults)
            const nightly = quote(x, { ...plan, nights: 1, meals: false }).rooms
            return (
              <motion.button layout={!reduce} transition={{ duration: 0.45, ease }} key={x.id} ref={el => { refs.current[x.id] = el }} type="button" role="radio" aria-checked={x.id === unit.id} tabIndex={x.id === unit.id ? 0 : -1} className={'film' + (over ? ' is-over' : '')} onClick={() => plan.setUnitId(x.id)}>
                <Photo pic={x.a} />
                <span className="film__name">{x.name}</span>
                <span className="film__meta tnum">{over ? `Rate published for up to ${R.max} adults` : `${x.kind}, ${money0(nightly)} a night`}</span>
              </motion.button>
            )
          })}
        </div>
        <div className="strip__foot">
        <p className="strip__note">Best fit for {plan.adults} adult{plan.adults > 1 ? 's' : ''}{plan.kids ? ` and ${plan.kids} child${plan.kids > 1 ? 'ren' : ''}` : ''} first. Prices before tax and surcharges.</p>
          <div className="strip__nav">
            <button type="button" aria-label="Earlier places" onClick={() => stripRef.current?.scrollBy({ left: -380, behavior: 'smooth' })}>‹</button>
            <button type="button" aria-label="More places" onClick={() => stripRef.current?.scrollBy({ left: 380, behavior: 'smooth' })}>›</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PhoneBar({ plan }: { plan: Plan }) {
  const order = fitOrder(plan.adults, plan.kids)
  const unit = UNITS.find(x => x.id === plan.unitId) ?? order[0], q = quote(unit, plan)
  return (
    <div className="pbar">
      <a href="#plan" className="pbar__t"><span className="pbar__n">{unit.name}</span><span className="tnum">{plan.nights} nights, {money0(q.total)}</span></a>
      <a className="btn" href={mailStay(plan, unit, q)}>Send</a>
    </div>
  )
}

/* ---------- screen 2: two shorelines ---------- */
export function Shores() {
  return (
    <section className="shores" aria-labelledby="sh-h">
      <p className="shores__mark" aria-hidden="true">Stella Maris</p>
      <h2 id="sh-h" className="shores__h">“The turquoise or ink-blue of the two near&nbsp;shorelines.”</h2>
      <div className="shores__grid">
        <div className="shore shore--ink">
          <p className="shore__k">The Atlantic side</p>
          <p>Porches and pools over the Atlantic at Sand Dollar, Sea La Vie, Carolyn's Favourite, Rainbow Villa and Flamingo House, with Gecko House right on the beach. Big game fishing off the shore.</p>
        </div>
        <Photo pic={IMG.resort} className="shores__pic" />
        <div className="shore shore--calm">
          <p className="shore__k">The calm side</p>
          <p>Bonefishing in Adderley's and Glenton's bays, the Moonshine beach bar and grill on the shore, kayaks and paddle boards, and the weekday morning trips to Cape Santa Maria Beach and Columbus Harbour.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- screen 3: the places ---------- */
export function Places({ plan }: { plan: Plan }) {
  const choose = (id: string) => { plan.setUnitId(id); document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <section className="places" id="places" aria-labelledby="pl-h">
      <div className="places__head">
        <h2 id="pl-h">Every place, priced for your&nbsp;party.</h2>
        <p className="lede">For {plan.adults} adult{plan.adults > 1 ? 's' : ''}{plan.kids ? ` and ${plan.kids} child${plan.kids > 1 ? 'ren' : ''}` : ''}, a night, before tax and surcharges. Change the party above and every price follows.</p>
      </div>
      <ol className="places__list">
        {UNITS.map(x => {
          const R = RATES[x.cat], occ = Math.max(1, Math.min(plan.adults, R.max)), extra = Math.max(0, plan.adults - R.max) * 40
          const feats = [x.pool && 'Pool', x.beach && 'On the beach', x.kitchen && 'Kitchen', x.atlantic && 'Atlantic view'].filter(Boolean).join(', ')
          return (
            <li key={x.id} className="place">
              <div className="place__pics"><Photo pic={x.a} /><Photo pic={x.b} /></div>
              <div className="place__text">
                <h3>{x.name}</h3>
                <p className="place__kind">{x.kind}{feats ? `. ${feats}.` : '.'}</p>
                <p>{x.desc}</p>
              </div>
              <dl className="place__rates tnum">
                <div><dt>Summer 2026</dt><dd>{money0(R.s[occ] + extra)}</dd></div>
                <div><dt>Winter 2026-27</dt><dd>{money0(R.w[occ] + extra)}</dd></div>
                <button type="button" className="link" onClick={() => choose(x.id)}>Plan this one<span className="sr"> : {x.name}</span></button>
              </dl>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ---------- screen 4: included and the water ---------- */
export function Water({ plan }: { plan: Plan }) {
  const toggle = (a: string) => plan.setActs(plan.acts.includes(a) ? plan.acts.filter(x => x !== a) : [...plan.acts, a])
  return (
    <>
      <section className="incl" aria-labelledby="in-h">
        <h2 id="in-h">Included with your&nbsp;room.</h2>
        <ul>{INCLUDED.map(i => <li key={i}>{i}</li>)}</ul>
      </section>
      <section className="water" id="water" aria-labelledby="wa-h">
        <div className="water__text">
          <h2 id="wa-h">Dean's Blue Hole, and the bonefish&nbsp;bays.</h2>
          <p>Stella Maris Water Sports runs the diving: {DIVES.slice(0, 3).join(', ')} and {DIVES[3]}. Bonefishing is close by in Adderley's and Glenton's bays, and big game fishing waits off both shorelines.</p>
          <p className="water__k">Tick what you would like to do, and it goes into your stay request.</p>
          <div className="acts">{ACTIVITIES.map(a => <button key={a} type="button" className="act" aria-pressed={plan.acts.includes(a)} onClick={() => toggle(a)}>{a}</button>)}</div>
        </div>
        <div className="water__pics"><Photo pic={IMG.g1} /><Photo pic={IMG.g2} /></div>
      </section>
      <section className="offers" aria-labelledby="of-h">
        <h2 id="of-h">Packages and specials.</h2>
        <div className="offers__grid">
          <p><b>Sun &amp; Sea all-inclusive.</b> Five nights from $1,867 single or $2,945 double, valid to 19 December 2026. Seven-night packages on request.</p>
          <p><b>$250 air credit</b> on air-inclusive packages from the US, as listed on their specials page; blackout 3 to 6 July 2026.</p>
          <p><b>Meal plan (MAP).</b> $83 a person a night plus 15% gratuity and 10% VAT; drinks not included.</p>
        </div>
      </section>
    </>
  )
}

/* ---------- screen 5: getting here ---------- */
export function Getting({ plan }: { plan: Plan }) {
  const steps = [['Fly to Nassau', 'Your international flight lands at Nassau.'], ['On to Stella Maris', "The resort's own air service, or a scheduled flight to Stella Maris Airport (SML)."], ['To the club', 'From the airport to the club on Ocean View Drive. Ask reservations to arrange it.'], ['You are here', 'Between the two shorelines of Long Island.']]
  return (
    <section className="route" id="getting-here" aria-labelledby="gh-h">
      <h2 id="gh-h">We can even fly you&nbsp;here.</h2>
      <ol className="route__steps">{steps.map(([t, d], i) => <li key={t}><span className="tnum">{i + 1}</span><b>{t}</b><span>{d}</span></li>)}</ol>
      <p className="route__marina"><b>Coming by boat?</b> The club's name carries a marina; ask reservations about it and its services before you sail.</p>
      <a className="btn btn--line" href={mailAir(plan)}>Ask the air service for your dates</a>
    </section>
  )
}

/* ---------- screen 6: weddings, policies, contact ---------- */
export function Close({ plan }: { plan: Plan }) {
  const order = fitOrder(plan.adults, plan.kids)
  const unit = UNITS.find(x => x.id === plan.unitId) ?? order[0], q = quote(unit, plan)
  return (
    <>
      <section className="wed" id="weddings" aria-labelledby="we-h">
        <h2 id="we-h">Weddings, barefoot or&nbsp;elegant.</h2>
        <p>Weddings and anniversaries on Long Island, with the club's houses for the whole party. Write with your date and the number of guests.</p>
        <a className="link" href={`mailto:${EMAIL}?subject=${encodeURIComponent('A wedding at Stella Maris')}`}>Write about a wedding</a>
      </section>
      <section className="policy" aria-labelledby="po-h">
        <h2 id="po-h">The small print, in plain&nbsp;words.</h2>
        <dl>
          <div><dt>Deposits</dt><dd>1 to 3 nights: one night. 3 to 5 nights: two. 5 to 7 nights: three. 10 nights or more: five. Packages: $750.</dd></div>
          <div><dt>Cancelling</dt><dd>$75 plus VAT. Inside 14 days of arrival the deposit is kept (21 days at Christmas and New Year).</dd></div>
          <div><dt>Paying</dt><dd>Credit card only: Visa, Mastercard or American Express.</dd></div>
          <div><dt>Children</dt><dd>12 and under stay free. Each additional adult is $40 a night, plus surcharges.</dd></div>
        </dl>
      </section>
      <footer className="contact" id="contact">
        <div>
          <h2>Write or call the&nbsp;club.</h2>
          <div className="contact__acts">
            <a className="btn" href={mailStay(plan, unit, q)}>Send this stay to reservations</a>
          </div>
        </div>
        <ul className="contact__list">
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>Reservations</span></li>
          <li className="tnum">{PHONES.map(([l, t]) => <a key={l} href={t}>{l}</a>)}<span>Fax 242-338-2052</span></li>
          <li><a href={`mailto:${AIR}`}>{AIR}</a><span>The air service</span></li>
          <li><a href="mailto:Jill@stellamarisresort.com">Jill@stellamarisresort.com</a><a href="mailto:info@stellamarisresort.com">info@stellamarisresort.com</a></li>
          <li><span className="addr">Ocean View Drive, P.O. Box LI 30-105, Stella Maris, Long Island, Bahamas</span><a className="link" href="https://www.openstreetmap.org/search?query=Stella%20Maris%20Long%20Island%20Bahamas">Map</a><a className="link" href={FB}>Facebook</a></li>
        </ul>
        <p className="credit">Photography: Stella Maris Resort Club. Rates as published on stellamarisresort.com, updated 19 November 2026.</p>
      </footer>
    </>
  )
}

/* ---------- the published rate tables (stay.html) ---------- */
export function RateTable() {
  const rows: [string, string, string][] = [
    ['Hotel room or apartment', 'Single $190, double $230, triple $270', 'Single $210, double $250, triple $290'],
    ['One-bedroom cottage', 'Single $240, double $280, triple $320', 'Single $260, double $290, triple $330'],
    ['Sand Dollar or Sea La Vie Cottage', 'Double $360, triple $400, quad $440', 'Double $420, triple $460, quad $500'],
    ["Gecko House, Carolyn's Favourite or Flamingo House", 'Six $660', 'Six $700'],
    ['Rainbow Villa or Dolphin House, with pool', 'Six $770', 'Six $800'],
  ]
  return (
    <section className="rates" id="rates" aria-labelledby="rt-h">
      <h2 id="rt-h">The published rates.</h2>
      <p className="lede">Per night, as on their rate page (updated 19 November 2026). Summer 2026: 20 April to 19 December 2026. Winter 2026-27: 19 December 2026 to 18 April 2027.</p>
      <table className="rates__t tnum">
        <thead><tr><th scope="col">Place</th><th scope="col">Summer 2026</th><th scope="col">Winter 2026-27</th></tr></thead>
        <tbody>{rows.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
      </table>
      <ul className="rates__s">
        <li>VAT 10%.</li>
        <li>Resort levy 6%, plus 10% VAT.</li>
        <li>Maid service $6 per person per night.</li>
        <li>Energy surcharge $4 per person per night in hotel rooms, $7 in cottages and villas, plus 10% VAT.</li>
        <li>Additional adult $40 per night, subject to surcharges. Children 12 and under free.</li>
      </ul>
      <p className="small">The planner uses the double rate for one guest in the two-bedroom cottages, counts every guest for maid service and the energy surcharge, and reads the deposit table as 1 to 2 nights: one night, 3 to 4: two, 5 to 7: three, 10 or more: five. All to confirm with reservations.</p>
    </section>
  )
}
