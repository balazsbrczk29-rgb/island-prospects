import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { BIZ, VILLAS, WHOLE } from './data'
import { quote, money, addDays, nice, defaultArrival, iso } from './price'

/** Ask the tool to select a villa (or the whole resort) and bring it into view. */
export function priceVilla(id: string) {
  window.dispatchEvent(new CustomEvent('firefly:price', { detail: id }))
  document.getElementById('price')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
}

const ease = [0.22, 1, 0.36, 1] as const

/** The total, rolling digit by digit from the previous value. */
function Rolling({ text }: { text: string }) {
  const reduce = useReducedMotion()
  return (
    <span className="roll num" aria-hidden="true">
      {text.split('').map((ch, i) => /\d/.test(ch)
        ? <span className="roll-col" key={i}><span className="roll-size">{ch}</span><motion.span className="roll-strip" initial={false} animate={{ y: `-${+ch * 10}%` }} transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}>{'0123456789'.split('').map(d => <span key={d}>{d}</span>)}</motion.span></span>
        : <span key={i + ch}>{ch}</span>)}
    </span>
  )
}

function Stepper({ cls, label, value, set, min, max, unit }: { cls: string; label: string; value: number; set: (n: number) => void; min: number; max: number; unit: (n: number) => string }) {
  return (
    <div className={`field ${cls}`}>
      <span className="field-l" id={`l-${label}`}>{label}</span>
      <div className="stepper" role="group" aria-labelledby={`l-${label}`}>
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => set(Math.max(min, value - 1))}>−</button>
        <output className="num" aria-live="polite">{value}<span className="sr-only"> {unit(value)}</span></output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => set(Math.min(max, value + 1))}>+</button>
      </div>
    </div>
  )
}

export function PriceTool() {
  const [id, setId] = useState('mint')
  const [arrive, setArrive] = useState(() => defaultArrival())
  const [nights, setNights] = useState(7)
  const [guests, setGuests] = useState(2)
  const [flash, setFlash] = useState(0)
  const [glow, setGlow] = useState(false)
  useEffect(() => { if (!flash) return; setGlow(true); const t = setTimeout(() => setGlow(false), 700); return () => clearTimeout(t) }, [flash])
  const listRef = useRef<HTMLDivElement>(null)
  const whole = id === 'whole'
  const v = VILLAS.find(x => x.id === id) ?? VILLAS[0]

  useEffect(() => {
    const pick = (x: string) => { if (x === 'whole' || VILLAS.some(v => v.id === x)) { setId(x); setFlash(f => f + 1) } }
    const on = (e: Event) => pick((e as CustomEvent<string>).detail)
    window.addEventListener('firefly:price', on)
    const m = location.hash.match(/villa=([a-z]+)/); if (m) pick(m[1])
    return () => window.removeEventListener('firefly:price', on)
  }, [])
  useEffect(() => { listRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' }) }, [id])

  const q = useMemo(() => quote(whole ? 'whole' : v, arrive, nights), [whole, v, arrive, nights])
  const leave = arrive ? addDays(arrive, nights) : ''
  const name = whole ? 'the whole resort' : v.name
  const est = q.kind === 'total' ? `Estimate shown: ${money(q.total)} including 10% VAT.` : q.kind === 'whole' && q.pick ? `Published rate: ${money(WHOLE[q.pick])} including VAT.` : ''
  const mail = `mailto:${BIZ.email}?subject=${encodeURIComponent(`Villa request: ${whole ? 'Whole resort' : v.name}${arrive ? `, ${nice(arrive)} to ${nice(leave)}` : ''}`)}&body=${encodeURIComponent(`Hello Firefly,\n\nI would like to request ${name}.\nArrival: ${arrive ? nice(arrive) : ''}\nDeparture: ${leave ? nice(leave) : ''}\nNights: ${nights}\nGuests: ${guests}\n${est}\n\nSent from the Firefly website.`)}`
  const book = `${v.book}?${new URLSearchParams(arrive ? { checkIn: arrive, checkOut: leave, minOccupancy: String(guests) } : { minOccupancy: String(guests) })}`
  const emailFirst = whole || q.kind === 'ask'

  const options = VILLAS.map(x => x.id)
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = options[(Math.max(0, options.indexOf(id)) + d + options.length) % options.length]
    setId(next)
    requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>(`[data-id="${next}"]`)?.focus())
  }

  return (
    <div className={`tool${glow ? ' glow' : ''}`} id="price">
      <div className="villas" role="radiogroup" aria-label="Choose a villa" ref={listRef} onKeyDown={onKey}>
        {VILLAS.map(x => (
          <button key={x.id} data-id={x.id} type="button" role="radio" aria-checked={x.id === id} tabIndex={x.id === id || (whole && x.id === 'mint') ? 0 : -1} className="v-opt" onClick={() => setId(x.id)}>
            {x.id === id && <motion.span layoutId="marker" className="marker" transition={{ type: 'spring', duration: 0.3, bounce: 0 }} />}
            <span className="v-n">{x.name}</span>
            <span className="v-b num">{x.beds}{x.offDay ? `, from ${money(x.offDay)}` : ''}</span>
          </button>
        ))}
      </div>
      <div className="row">
        <label className="field date">
          <span className="field-l">Arrive</span>
          <input type="date" value={arrive} min={iso(new Date())} onChange={e => setArrive(e.target.value)} />
        </label>
        <Stepper cls="nights" label="Nights" value={nights} set={setNights} min={1} max={28} unit={n => (n === 1 ? 'night' : 'nights')} />
        <Stepper cls="guests" label="Guests" value={guests} set={setGuests} min={1} max={12} unit={n => (n === 1 ? 'guest' : 'guests')} />
      </div>

      <div className="result" aria-live="polite">
        {q.kind === 'total' && <p className="total"><span className="sr-only">{money(q.total)} including VAT</span><Rolling text={money(q.total)} /><span className="total-t">with VAT</span></p>}
        {(q.kind === 'ask' || q.kind === 'min') && <p className="total total-word">{q.head}</p>}
        {q.kind === 'whole' && (
          <div className="whole num">
            <p className={q.pick === 'three' ? 'on' : ''}><span>{money(WHOLE.three)}</span> three days</p>
            <p className={q.pick === 'week' ? 'on' : ''}><span>{money(WHOLE.week)}</span> one week</p>
          </div>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={q.line} className="result-l num" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>{q.line}{q.kind === 'total' && q.note ? ` ${q.note}` : ''}</motion.p>
        </AnimatePresence>
      </div>

      <div className="acts">
        {emailFirst
          ? <><a className="btn" href={mail}>Email the resort</a>{!whole && <a className="textlink" href={book}>See {v.name}’s calendar</a>}</>
          : <><a className="btn" href={book}>Request to book {v.name}</a><a className="textlink" href={mail}>or email the resort</a></>}
      </div>
      <div className="whole-switch">
        <button type="button" role="switch" aria-checked={whole} onClick={() => setId(whole ? 'mint' : 'whole')}><span className="sw" aria-hidden="true"><span /></span>Whole resort, for groups and weddings</button>
      </div>
    </div>
  )
}
