import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { ROOMS, ALL_ROOMS_HAVE, bookingUrl, BIZ, type Room } from './data'
import { scrollToY } from './smooth'

const OCEAN = ROOMS.filter(r => r.side === 'ocean'), HILL = ROOMS.filter(r => r.side === 'hill')
const FRAMES = 1 + ROOMS.length + 1 // intro, rooms, booking

/** Scroll the room journey to the first room of one side (used by the hero choice and the timeline). */
export function goToSide(side: 'ocean' | 'hill') {
  const idx = side === 'ocean' ? 1 : 1 + OCEAN.length
  const desk = document.getElementById('rooms-track')
  if (desk && desk.offsetParent !== null) {
    const top = desk.getBoundingClientRect().top + scrollY
    const span = desk.offsetHeight - innerHeight
    const max = Number(desk.dataset.max || 0), step = Number(desk.dataset.step || 0)
    const p = max ? Math.min(1, (idx * step) / max) : idx / (FRAMES - 1)
    scrollToY(top + p * span + 2)
    return
  }
  const list = document.getElementById('rooms-swipe')
  if (list) {
    list.closest('section')?.scrollIntoView({ behavior: 'smooth' })
    const card = list.querySelector<HTMLElement>(`[data-side="${side}"]`)
    if (card) list.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' })
  }
}

function Specs({ r }: { r: Room }) {
  return (
    <dl className="specs">
      <div><dt>View</dt><dd>{r.view}</dd></div>
      <div><dt>Beds</dt><dd>{r.beds}</dd></div>
      <div><dt>Baths</dt><dd>{r.baths}</dd></div>
      <div><dt>Kitchen</dt><dd>{r.kitchen}</dd></div>
      <div><dt>Outside</dt><dd>{r.patio}</dd></div>
    </dl>
  )
}

function RoomFrame({ r, i }: { r: Room; i: number }) {
  return (
    <article className="room" data-side={r.side}>
      <div className="room-photo"><img src={r.photo} alt={r.alt} width={580} height={440} loading="lazy" /></div>
      <div className="room-body">
        <p className="room-no num">{String(i + 1).padStart(2, '0')} <span>/ {String(ROOMS.length).padStart(2, '0')}</span></p>
        <h3 className="h3">{r.name}</h3>
        <Specs r={r} />
        <a className="room-go" href={BIZ.booking}>Check dates for this room</a>
      </div>
    </article>
  )
}

function Intro({ onTable, phone = false }: { onTable?: () => void; phone?: boolean }) {
  return (
    <div className="track-intro">
      <h2 className="h2">Five on the ocean side. Three on the hill.</h2>
      <p className="lede muted">Eight ways to stay, each with its own kitchen and patio. {phone ? 'Swipe through all of them' : 'Scroll sideways through all of them'}, then check your dates.</p>
      <p className="note muted">{ALL_ROOMS_HAVE}</p>
      {onTable ? <button type="button" className="link view-toggle" onClick={onTable}>See all eight side by side</button>
        : <a className="link view-toggle" href="stay.html">Compare all eight side by side</a>}
    </div>
  )
}

export function CompareTable() {
  return (
    <div className="cmp-scroll" tabIndex={0} role="region" aria-label="Room comparison table">
      <table className="cmp">
        <thead><tr><th scope="col">Room</th><th scope="col">Where</th><th scope="col">Beds for</th><th scope="col">View</th><th scope="col">Beds</th><th scope="col">Baths</th><th scope="col">Kitchen</th><th scope="col">Outside</th></tr></thead>
        <tbody>
          {ROOMS.map(r => (
            <tr key={r.id}>
              <th scope="row"><img src={r.photo} alt="" width={580} height={440} loading="lazy" /><span>{r.name}</span></th>
              <td>{r.side === 'ocean' ? 'Ocean Side' : 'Hillside'}</td><td className="num">{r.cap}</td><td>{r.view}</td><td>{r.beds}</td><td>{r.baths}</td><td>{r.kitchen}</td><td>{r.patio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BookFrame({ compact = false }: { compact?: boolean }) {
  const [a, setA] = useState(''), [d, setD] = useState(''), [g, setG] = useState(2)
  const today = new Date().toISOString().slice(0, 10)
  const ok = a && d && d > a
  return (
    <form className={`book ${compact ? 'compact' : ''}`} onSubmit={e => { e.preventDefault(); window.open(bookingUrl(ok ? a : undefined, ok ? d : undefined, g), '_blank', 'noopener') }}>
      <h3 className="h2">Pick your dates.</h3>
      <p className="muted">Live availability and rates come from the resort's own booking system.</p>
      <div className="book-row">
        <label>Arrive<input type="date" min={today} value={a} onChange={e => { setA(e.target.value); if (d && e.target.value >= d) setD('') }} required /></label>
        <label>Leave<input type="date" min={a || today} value={d} onChange={e => setD(e.target.value)} required /></label>
        <label>Adults
          <select value={g} onChange={e => setG(Number(e.target.value))}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}</select>
        </label>
      </div>
      <button className="btn btn-primary" type="submit">Check availability</button>
      <p className="muted small">Or call <a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></p>
    </form>
  )
}

export function Rooms() {
  const [table, setTable] = useState(false)
  const ref = useRef<HTMLDivElement>(null), row = useRef<HTMLUListElement>(null)
  const max = useRef(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, v => -v * max.current)
  const fill = useTransform(scrollYProgress, v => v)
  const [hillActive, setHill] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', v => { const h = v * max.current >= (OCEAN.length + 0.5) * stepPx(); if (h !== hillActive) setHill(h) })
  const stepPx = () => Number(ref.current?.dataset.step || 1)
  useEffect(() => {
    const measure = () => {
      const ul = row.current, sec = ref.current; if (!ul || !sec) return
      max.current = Math.max(0, ul.scrollWidth - innerWidth)
      const li = ul.children[1] as HTMLElement
      sec.dataset.max = String(max.current); sec.dataset.step = String(li ? li.offsetLeft - (ul.children[0] as HTMLElement).offsetLeft : 1)
    }
    measure(); addEventListener('resize', measure); const t = setTimeout(measure, 600)
    return () => { removeEventListener('resize', measure); clearTimeout(t) }
  }, [])
  return (
    <>
      {table && (
        <section id="rooms" className="rooms-table wrap" aria-label="The eight room types, side by side">
          <div className="rt-head">
            <h2 className="h2">All eight, side by side.</h2>
            <button type="button" className="link view-toggle" onClick={() => setTable(false)}>Back to the room journey</button>
          </div>
          <CompareTable />
          <p className="small muted cmp-note">Beds for: how many sleep in the listed beds. Rates live in the booking system for your dates. {ALL_ROOMS_HAVE}</p>
          <a className="btn btn-primary" href={BIZ.booking}>Check availability</a>
        </section>
      )}
      <section id={table ? undefined : 'rooms'} className="rooms-desk" hidden={table} aria-label="The eight room types">
        <div ref={ref as any} id="rooms-track" data-stage style={{ height: `${FRAMES * 62}svh` }}>
          <div className="track-pin">
            <motion.ul ref={row} className="track" style={{ x }}>
              <li className="f-intro"><Intro onTable={() => { setTable(true); requestAnimationFrame(() => document.getElementById('rooms')?.scrollIntoView()) }} /></li>
              {ROOMS.map((r, i) => <li key={r.id}><RoomFrame r={r} i={i} /></li>)}
              <li className="f-book"><BookFrame /></li>
            </motion.ul>
            <div className="timeline" aria-label="Room journey">
              <button type="button" className={!hillActive ? 'on' : ''} onClick={() => goToSide('ocean')}>Ocean Side <span className="num">5</span></button>
              <div className="bar"><motion.span style={{ scaleX: fill }} /></div>
              <button type="button" className={hillActive ? 'on' : ''} onClick={() => goToSide('hill')}>Hillside <span className="num">3</span></button>
            </div>
          </div>
        </div>
      </section>
      <section id={undefined} className="rooms-phone" aria-label="The eight room types">
        <div className="wrap"><Intro phone /></div>
        <div className="side-switch" role="group" aria-label="Jump to">
          <button type="button" onClick={() => goToSide('ocean')}>Ocean Side · 5</button>
          <button type="button" onClick={() => goToSide('hill')}>Hillside · 3</button>
        </div>
        <ul id="rooms-swipe" className="swipe">
          {ROOMS.map((r, i) => <li key={r.id}><RoomFrame r={r} i={i} /></li>)}
        </ul>
        <div className="wrap"><BookFrame compact /></div>
      </section>
    </>
  )
}
