import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, animate, useReducedMotion } from 'motion/react'
import { BIZ, HERO, MEALS, PARTIES, ROUTES, STAYS, sq, type FromId, type PartyId, type Stay } from './data'

export const byId = (id: string) => STAYS.find(s => s.id === id)!
const EASE = [0.22, 1, 0.36, 1] as const

type Bf = 'hot' | 'continental' | 'none'
type Plan = {
  party: PartyId; guests: number; nights: number; bf: Bf; dinner: boolean; from: FromId
  setParty: (p: PartyId) => void; setGuests: (n: number) => void; setNights: (n: number) => void
  setBf: (b: Bf) => void; setDinner: (d: boolean) => void; setFrom: (f: FromId) => void
}
const Ctx = createContext<Plan | null>(null)
export const usePlan = () => useContext(Ctx)!

export function PlanProvider({ children }: { children: ReactNode }) {
  const [party, setP] = useState<PartyId>('two')
  const [guests, setGuests] = useState(2)
  const [nights, setNights] = useState(5)
  const [bf, setBf] = useState<Bf>('hot')
  const [dinner, setDinner] = useState(true)
  const [from, setFrom] = useState<FromId>('fll')
  const setParty = (p: PartyId) => { setP(p); setGuests(PARTIES.find(x => x.id === p)!.guests) }
  return <Ctx.Provider value={{ party, guests, nights, bf, dinner, from, setParty, setGuests, setNights, setBf, setDinner, setFrom }}>{children}</Ctx.Provider>
}

export const matchIds = (p: PartyId) => PARTIES.find(x => x.id === p)!.groups.flat()
export const mealTotal = (p: Plan) => p.guests * p.nights * ((p.bf === 'none' ? 0 : MEALS[p.bf]) + (p.dinner ? MEALS.dinner : 0))
export const usd = (n: number) => '$' + n.toLocaleString('en-US')

export function waText(p: Plan) {
  const party = PARTIES.find(x => x.id === p.party)!
  const route = ROUTES.find(r => r.id === p.from)!
  const names = matchIds(p.party).map(id => byId(id).name).join(', ')
  return `Hello Fernandez Bay Village, we are ${party.wa} (${p.guests} guests) looking at ${p.nights} nights, flying ${route.wa}. We like ${names}. Which dates are free?`
}
export const waHref = (p: Plan) => `https://wa.me/${BIZ.wa}?text=${encodeURIComponent(waText(p))}`

/** Total that ticks to its new value; tabular numbers keep it from jittering. */
export function Ticker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (reduce) { el.textContent = usd(value); prev.current = value; return }
    const c = animate(prev.current, value, { duration: 0.4, ease: EASE, onUpdate: v => { el.textContent = usd(Math.round(v)) } })
    prev.current = value
    return () => c.stop()
  }, [value, reduce])
  return <span ref={ref} className="num">{usd(value)}</span>
}

function Segments<T extends string>({ label, value, options, onChange, small }: { label: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void; small?: boolean }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const key = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (i + d + options.length) % options.length
    onChange(options[n].id); refs.current[n]?.focus()
  }
  return (
    <div className={`seg ${small ? 'seg-s' : ''}`} role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button key={o.id} ref={el => { refs.current[i] = el }} type="button" role="radio" aria-checked={value === o.id} tabIndex={value === o.id ? 0 : -1}
          className={value === o.id ? 'on' : ''} onClick={() => onChange(o.id)} onKeyDown={e => key(e, i)}>{o.label}</button>
      ))}
    </div>
  )
}

function Stepper({ label, value, min, max, onChange, unit }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; unit: [string, string] }) {
  return (
    <div className="step">
      <span className="cap muted">{label}</span>
      <div className="step-row">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>{'−'}</button>
        <output className="num" aria-live="polite">{value} <span className="muted">{value === 1 ? unit[0] : unit[1]}</span></output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
      </div>
    </div>
  )
}

export function MealCounter({ id }: { id: string }) {
  const p = usePlan()
  const per = (p.bf === 'none' ? 0 : MEALS[p.bf]) + (p.dinner ? MEALS.dinner : 0)
  return (
    <div className="meals-tool" aria-labelledby={id}>
      <div className="meals-head">
        <span id={id} className="cap muted">Meals at the Clubhouse</span>
        <span className="meals-total"><Ticker value={mealTotal(p)} /></span>
      </div>
      <div className="meals-opts">
        <Segments small label="Breakfast" value={p.bf} onChange={p.setBf} options={[{ id: 'hot', label: 'Hot $20' }, { id: 'continental', label: 'Continental $10' }, { id: 'none', label: 'No breakfast' }]} />
        <label className="check"><input type="checkbox" checked={p.dinner} onChange={e => p.setDinner(e.target.checked)} /> Dinner $48</label>
      </div>
      <p className="cap muted num">{p.guests} {p.guests === 1 ? 'guest' : 'guests'} {'×'} {p.nights} {p.nights === 1 ? 'night' : 'nights'} {'×'} {usd(per)}. Lunch $8 to $18 as you go.</p>
    </div>
  )
}

export function RoutePick() {
  const p = usePlan()
  const r = ROUTES.find(x => x.id === p.from)!
  return (
    <div className="route-tool">
      <span className="cap muted" id="route-l">Flying from</span>
      <Segments small label="Flying from" value={p.from} onChange={p.setFrom} options={ROUTES.map(x => ({ id: x.id, label: x.label }))} />
      <p className="cap route-line"><strong>{r.carrier}.</strong> {r.how}{r.perk && <> <span className="perk">{r.perk}.</span></>}</p>
    </div>
  )
}

function MatchCard({ s, i }: { s: Stay; i: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.article className="match" layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.16 } }}
      transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : i * 0.045 }}>
      <div className="match-img"><img src={sq(s.img!, 500)} alt={s.alt} width={500} height={333} loading="eager" /></div>
      <h3 className="match-name">{s.name}</h3>
      <p className="cap muted">{s.kind === 'villa' ? s.bed : `${s.bed} bed`}</p>
      <a className="cap match-go" href={BIZ.booking}>Check dates</a>
    </motion.article>
  )
}

export function MatchStrip() {
  const p = usePlan()
  const party = PARTIES.find(x => x.id === p.party)!
  let i = 0
  return (
    <div className="strip-wrap">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={party.id} className="strip-count cap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} aria-live="polite">{party.count(0)}</motion.p>
      </AnimatePresence>
      <div className="strip" role="list" aria-label="Stays that fit your party">
        <AnimatePresence mode="popLayout" initial={false}>
          {party.groups.map(g => (
            <motion.div role="listitem" key={party.id + g.join('-')} className={`grp ${g.length > 1 ? 'pair' : ''}`} layout>
              {g.map((id, k) => (
                <div key={id} className="grp-cell">
                  <MatchCard s={byId(id)} i={i++} />
                  {g.length > 1 && k === 0 && <span className="bracket cap" aria-label="adjoining">adjoining</span>}
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Hero() {
  const p = usePlan()
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="sheet">
        <h1 id="hero-h" className="hero-h">A beach view from every room.</h1>
        <p className="lead hero-lede">Family-run, on Fernandez Bay, Cat Island. Five minutes from New Bight airport.</p>
        <div className="tool" aria-label="Plan your stay">
          <div className="tool-q">
            <span className="cap muted" id="who-l">Who’s coming?</span>
            <Segments label="Who is coming" value={p.party} onChange={p.setParty} options={PARTIES.map(x => ({ id: x.id, label: x.label }))} />
            <div className="steps">
              <Stepper label="Guests" value={p.guests} min={1} max={12} onChange={p.setGuests} unit={['guest', 'guests']} />
              <Stepper label="Nights" value={p.nights} min={1} max={21} onChange={p.setNights} unit={['night', 'nights']} />
            </div>
          </div>
          <div className="acts">
            <a className="btn" href={BIZ.booking}>Check dates</a>
            <a className="textlink" href={waHref(p)}>Ask on WhatsApp</a>
          </div>
          <MealCounter id="meals-hero" />
          <RoutePick />
        </div>
      </div>
      <div className="hero-photo">
        <img src={sq(HERO.img, 2500)} srcSet={`${sq(HERO.img, 1000)} 1000w, ${sq(HERO.img, 1500)} 1500w, ${sq(HERO.img, 2500)} 2500w`} sizes="(max-width: 900px) 100vw, 60vw"
          alt={HERO.alt} width={HERO.w} height={HERO.h} fetchPriority="high" />
        <MatchStrip />
      </div>
    </section>
  )
}
