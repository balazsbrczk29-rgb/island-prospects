import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { BIZ, PHOTOS, ROOMS, SPECIALS, WHO, bookingUrl, openToday, offerProblem, nightsOf, type Side, type Who } from './data'
import { usePlan, setPlan } from './store'

export function Top({ base = '' }: { base?: string }) {
  return (
    <header className="top">
      <a className="wordmark" href="./">Hideaways at Palm Bay</a>
      <nav aria-label="Main">
        <a className="navlink" href={base + '#rooms'}>Rooms</a>
        <a className="navlink" href={base + '#offers'}>Offers</a>
        <a className="navlink" href={base + '#splash'}>Splash</a>
        <a className="navlink" href={base + '#here'}>Getting here</a>
        <a className="navlink num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>
        <a className="btn btn-primary book" href={BIZ.booking}><span className="long">Check availability</span><span className="short">Book</span></a>
      </nav>
    </header>
  )
}

const ease = [0.22, 0.61, 0.24, 1] as const
const SIDES: Record<Side, { word: string; label: string; count: string; photo: string; alt: string; w: number; h: number }> = {
  ocean: { word: 'sand', label: 'Ocean Side cottages and villas', count: '5 room types', photo: PHOTOS.sand, alt: 'Clear shallow water over white sand, a swing standing in the sea', w: 1200, h: 900 },
  hill: { word: 'hill', label: 'Island Time Villas, on the hillside', count: '3 room types', photo: PHOTOS.hill, alt: 'Two-storey turquoise Island Time villas with balconies on the hill', w: 1024, h: 768 },
}

function Half({ side, i }: { side: Side; i: number }) {
  const p = usePlan(), reduce = useReducedMotion()
  const s = SIDES[side]
  const room = p.side === side && p.room ? ROOMS.find(r => r.id === p.room) : undefined
  const src = room ? room.photo : s.photo
  const dim = p.side !== null && p.side !== side
  const frame = reduce ? {} : { initial: { clipPath: 'inset(100% 0 0 0)' }, animate: { clipPath: 'inset(0% 0 0 0)' }, transition: { duration: 1.25, ease, delay: 0.3 + i * 0.16 } }
  return (
    <button type="button" className={`half ${side === 'ocean' ? 'sand' : 'hill'} ${dim ? 'dim' : ''} ${p.side === side ? 'on' : ''}`} aria-pressed={p.side === side}
      onClick={() => setPlan({ side, room: firstFit(side, p.guests) })}>
      <motion.div className="frame" {...frame}>
        <AnimatePresence initial={false}>
          <motion.img key={src} src={src} alt={room ? room.alt : s.alt} width={room ? 580 : s.w} height={room ? 440 : s.h}
            className={room ? 'is-room' : 'is-side'} fetchPriority={room ? undefined : 'high'}
            initial={reduce ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }} />
        </AnimatePresence>
      </motion.div>
      <span className="cap"><span>{room ? room.name : s.label}</span><span className="num">{room ? `Beds for ${room.cap}` : s.count}</span></span>
    </button>
  )
}

const fits = (side: Side, g: number) => ROOMS.filter(r => r.side === side && r.cap >= g)
const firstFit = (side: Side, g: number) => fits(side, g)[0]?.id ?? null

function Stepper() {
  const p = usePlan()
  const set = (g: number) => { const n = Math.max(1, Math.min(6, g)); setPlan({ guests: n, room: p.side ? (fits(p.side, n).some(r => r.id === p.room) ? p.room : firstFit(p.side, n)) : null }) }
  return (
    <div className="field">
      <span className="lab" id="g-lab">Guests</span>
      <div className="stepper" role="group" aria-labelledby="g-lab">
        <button type="button" onClick={() => set(p.guests - 1)} disabled={p.guests <= 1} aria-label="One guest fewer">−</button>
        <output className="num" aria-live="polite">{p.guests}</output>
        <button type="button" onClick={() => set(p.guests + 1)} disabled={p.guests >= 6} aria-label="One guest more">+</button>
      </div>
    </div>
  )
}

function Results() {
  const p = usePlan(), reduce = useReducedMotion()
  if (!p.side) return (
    <div className="pick" role="group" aria-label="Choose a side">
      <button type="button" onClick={() => setPlan({ side: 'ocean', room: firstFit('ocean', p.guests) })}><span className="pw">Sand</span><span>5 cottages and villas on the beach</span></button>
      <button type="button" onClick={() => setPlan({ side: 'hill', room: firstFit('hill', p.guests) })}><span className="pw">Hill</span><span>3 Island Time villas above the bay</span></button>
    </div>
  )
  const all = ROOMS.filter(r => r.side === p.side), list = fits(p.side, p.guests)
  return (
    <div className="results">
      <p className="rhead small"><span className="num">{list.length} of {all.length}</span> {p.side === 'ocean' ? 'on the sand' : 'on the hill'} sleep {p.guests} in the listed beds</p>
      {list.length === 0 ? (
        <p className="none small">No single room sleeps {p.guests} in its listed beds. Two rooms side by side work: <a href={`mailto:${BIZ.email}?subject=Two%20rooms%20for%20${p.guests}%20guests`}>ask us</a> or choose two when you book.</p>
      ) : (
        <div className="rows" role="radiogroup" aria-label="Rooms that fit">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((r, i) => (
              <motion.label key={r.id} className={`row ${p.room === r.id ? 'on' : ''}`} layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.32 } }} exit={{ opacity: 0, x: -8, transition: { duration: 0.16 } }}>
                <input type="radio" name="room" value={r.id} checked={p.room === r.id} onChange={() => setPlan({ room: r.id })} />
                {p.room === r.id && <motion.span className="rule" layoutId="rule" />}
                <img src={r.photo} alt="" width={580} height={440} loading="lazy" />
                <span className="rt"><span className="rn">{r.name}</span><span className="rs num">Beds for {r.cap} · {r.baths.toLowerCase()} · {r.kitchen.split(',')[0].toLowerCase()}</span></span>
              </motion.label>
            ))}
          </AnimatePresence>
        </div>
      )}
      {p.side === 'hill' && p.guests > 2 && list.length > 0 && <p className="small muted hint">The studio and the one-bedroom villa sleep 2.</p>}
    </div>
  )
}

function Code() {
  const p = usePlan()
  const [copied, setCopied] = useState('')
  if (!p.who) return <p className="code-line small muted">Choose where you live to see the offer code open for you.</p>
  const open = SPECIALS.filter(s => s.who.includes(p.who!) && openToday(s))
  if (open.length === 0) return <p className="code-line small">No air credit is open for U.S. and Canadian residents today. Booking direct gets the best available rate.</p>
  const n = nightsOf(p.arrive, p.leave)
  const good = open.filter(s => !offerProblem(s, p.arrive, p.leave))
  if (good.length === 0) return <p className="code-line small">{offerProblem(open[0], p.arrive, p.leave)} <a href="#offers">See every offer</a></p>
  const s = good[0]
  const copy = () => navigator.clipboard?.writeText(s.code).then(() => { setCopied(s.code); setTimeout(() => setCopied(''), 1600) })
  return (
    <div className="code-wrap">
      <button type="button" className="code" onClick={copy} aria-label={`Copy code ${s.code}`}>
        <span className="mono">{s.code}</span><span className="copy" aria-live="polite">{copied === s.code ? 'Copied' : 'Copy code'}</span>
      </button>
      <p className="small muted">{s.title}{n ? '' : `, ${s.nights}`}. {n ? 'Fits your dates.' : 'Add dates to check them.'}{good.length > 1 && <> <a href="#offers">{good.length - 1} more</a></>}</p>
    </div>
  )
}

function Planner() {
  const p = usePlan()
  const today = new Date().toISOString().slice(0, 10)
  const n = nightsOf(p.arrive, p.leave)
  const ok = n > 0
  return (
    <form className="planner" aria-label="Plan your stay" onSubmit={e => { e.preventDefault(); window.open(bookingUrl(ok ? p.arrive : undefined, ok ? p.leave : undefined, p.guests), '_blank', 'noopener') }}>
      <div className="p-head">
        <h2 className="h3">Plan your stay</h2>
        <div className="seg" role="radiogroup" aria-label="Sand or hill">
          {(['ocean', 'hill'] as Side[]).map(s => (
            <label key={s} className={p.side === s ? 'on' : ''}>
              <input type="radio" name="side" checked={p.side === s} onChange={() => setPlan({ side: s, room: firstFit(s, p.guests) })} />{s === 'ocean' ? 'Sand' : 'Hill'}
            </label>
          ))}
        </div>
      </div>
      <div className="p-grid">
        <Stepper />
        <label className="field">
          <span className="lab">I live in</span>
          <select value={p.who ?? ''} onChange={e => setPlan({ who: (e.target.value || null) as Who | null })}>
            <option value="">Choose</option>
            {WHO.map(w => <option key={w.id} value={w.id}>{w.label}</option>)}
          </select>
        </label>
        <label className="field">
          <span className="lab">Arrive</span>
          <input type="date" min={today} value={p.arrive} onChange={e => setPlan({ arrive: e.target.value, leave: p.leave && e.target.value >= p.leave ? '' : p.leave })} />
        </label>
        <label className="field">
          <span className="lab">Leave{ok && <span className="nights num"> · {n} {n === 1 ? 'night' : 'nights'}</span>}</span>
          <input type="date" min={p.arrive || today} value={p.leave} onChange={e => setPlan({ leave: e.target.value })} />
        </label>
      </div>
      <Results />
      <Code />
      <button className="btn btn-primary go" type="submit">Check availability</button>
    </form>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (i: number) => reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease, delay: 0.12 + i * 0.14 } }
  return (
    <section className="hero" aria-labelledby="h1">
      <Top />
      <div className="hero-grid">
        <div className="choice">
          <h1 id="h1" className="words display">
            <motion.span {...rise(0)}>sand</motion.span>
            <motion.i className="w-or" {...rise(1)}>or</motion.i>
            <motion.span {...rise(0.5)}>hill</motion.span>
            <span className="sr-only">: Hideaways at Palm Bay, beach cottages and hillside villas on Elizabeth Harbour, George Town, Exuma</span>
          </h1>
          <Half side="ocean" i={0} />
          <Half side="hill" i={1} />
          <motion.p className="where" {...rise(2)}>Jolly Hall Bay, Elizabeth Harbour, George Town, Exuma. Fifteen minutes from the airport.</motion.p>
        </div>
        <motion.div className="plan-col" {...rise(1.6)}><Planner /></motion.div>
      </div>
    </section>
  )
}
