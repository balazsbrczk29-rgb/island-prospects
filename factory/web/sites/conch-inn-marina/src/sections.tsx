import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import { BIZ, PHOTO, ROOMS, LEDGER, RULES, wix } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

export function Includes() {
  return (
    <section id="rates" className="inc" aria-labelledby="inc-h">
      <div className="wrap inc-grid">
        <figure className="inc-photo">
          <img src={wix(PHOTO.docks.id, 1228, 1535)} alt={PHOTO.docks.alt} width={1228} height={1535} loading="lazy" />
          <figcaption>The docks at sunset, from the inn.</figcaption>
        </figure>
        <div className="inc-text">
          <h2 id="inc-h" className="h2">Everything at the slip, in plain figures.</h2>
          <ul className="inc-list">
            <li>High-speed WiFi, showers and restrooms, free</li>
            <li>24-hour security and a free dinghy dock</li>
            <li>Gasoline, diesel and ice on the dock</li>
            <li>Token washers and dryers, and the pool</li>
          </ul>
          <div className="ledger num">
            {LEDGER.map(g => (
              <table key={g.group}>
                <caption>{g.group}</caption>
                <tbody>{g.rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
            ))}
          </div>
          <h3 className="h3 rules-h">What the office asks of every captain</h3>
          <ul className="rules">{RULES.map(x => <li key={x}>{x}</li>)}</ul>
          <p className="inc-free">Only stopping briefly? The free Union Jack public dock is a third of a mile west.</p>
        </div>
      </div>
    </section>
  )
}

export function RoomsPicker() {
  const [i, setI] = useState(2)
  const reduce = useReducedMotion()
  const r = ROOMS[i]
  return (
    <section id="rooms" className="rooms wrap" aria-labelledby="rooms-h">
      <div className="rooms-photo">
        <AnimatePresence initial={false}>
          <motion.img key={r.id} src={wix(r.photo.id, 1200, 800)} alt={r.alt} width={1200} height={800} loading="lazy"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} />
        </AnimatePresence>
      </div>
      <div className="rooms-side">
        <h2 id="rooms-h" className="h2">Or sleep ashore, over the marina.</h2>
        <div className="roomlist" role="tablist" aria-label="Room types">
          {ROOMS.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
              <span>{x.name}</span><span className="v">{x.view}</span>
            </button>
          ))}
        </div>
        <p className="feat" role="tabpanel">{r.features.join(', ')}.</p>
        <div className="acts">
          <a className="btn" href={BIZ.bookRooms}>Check dates and book</a>
          <a className="textlink" href="rooms.html">All six rooms</a>
        </div>
      </div>
    </section>
  )
}

export function Snappas() {
  return (
    <section id="snappas" className="snap wrap" aria-labelledby="snap-h">
      <figure className="snap-photo">
        <img src={wix(PHOTO.snappas.id, 1280, 1280)} alt={PHOTO.snappas.alt} width={1280} height={1280} loading="lazy" />
      </figure>
      <div className="snap-text">
        <h2 id="snap-h" className="h2">Dinner is on the dock.</h2>
        <p className="lede">Snappa's Bar &amp; Grill is the inn's dockside place for food and drinks, with live music and a view over the harbour. Step off the boat and you are there.</p>
        <dl className="snap-dl">
          <div><dt>At the inn</dt><dd>Heated plunge pool, Renu Day Spa, the gift shop</dd></div>
          <div><dt>On the dock</dt><dd>Navigare Yachting and Dream Yacht Charters bases</dd></div>
        </dl>
        <a className="textlink" href={BIZ.snappas}>Snappa's menu and music</a>
      </div>
    </section>
  )
}

const STOPS: { k: string; v: string; me?: boolean }[] = [
  { k: 'Union Jack public dock', v: 'a third of a mile west, free' },
  { k: 'The Conch Inn & Marina', v: '700 Bay Street', me: true },
  { k: 'Restaurants, groceries, liquor, shops', v: 'a walk from your slip' },
  { k: 'Leonard M. Thompson International Airport', v: '3 miles' },
]
export function Town() {
  const ref = useRef<HTMLOListElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const reduce = useReducedMotion()
  return (
    <section id="town" className="town wrap" aria-labelledby="town-h">
      <h2 id="town-h" className="h2">Tie up and walk to town.</h2>
      <p className="lede muted">The inn is on the Marsh Harbour waterfront, a walk from restaurants, groceries, liquor and shops.</p>
      <ol ref={ref} className="route">
        <motion.span className="route-line" aria-hidden="true" initial={false} animate={{ scaleX: seen || reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.4, ease: EASE }} />
        {STOPS.map((s, i) => (
          <motion.li key={s.k} className={s.me ? 'me' : ''} initial={false} animate={{ opacity: seen || reduce ? 1 : 0.001, y: seen || reduce ? 0 : 8 }} transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.25 + i * 0.28, ease: EASE }}>
            <span className="dot" aria-hidden="true" />
            <span className="route-k">{s.k}</span>
            <span className="route-v num">{s.v}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

export function History() {
  return (
    <section className="hist" aria-labelledby="hist-h">
      <figure className="hist-photo">
        <img src={wix(PHOTO.balcony.id, 1600, 1067)} alt={PHOTO.balcony.alt} width={1600} height={1067} loading="lazy" />
      </figure>
      <div className="wrap hist-text">
        <h2 id="hist-h" className="h2">Here since 1972. Rebuilt after Dorian.</h2>
        <p className="lede">The Conch Inn first opened in 1972. Hurricane Dorian closed it in 2019, and the family reopened it in March 2021 with every room, suite and apartment renovated. It is still family-run, and still the dock you walk into town from.</p>
      </div>
    </section>
  )
}

export function Office() {
  return (
    <section id="office" className="office wrap" aria-labelledby="office-h">
      <div className="office-a">
        <h2 id="office-h" className="h2">The dock office, every day 8:00 to 5:30.</h2>
        <dl className="office-dl num">
          <div><dt>Office</dt><dd><a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></dd></div>
          <div><dt>If the line is busy</dt><dd><a href={`tel:${BIZ.tel2}`}>{BIZ.phone2}</a></dd></div>
          <div><dt>Radio</dt><dd>{BIZ.vhf}</dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></dd></div>
          <div><dt>Address</dt><dd>{BIZ.street}</dd></div>
          <div><dt>Check-in, check-out</dt><dd>12 noon</dd></div>
        </dl>
      </div>
      <div className="office-b">
        <p className="office-q">Crossing soon? Send your boat's details now and the office will reply about a slip.</p>
        <div className="acts">
          <a className="btn" href="#desk">Request a slip</a>
          <a className="textlink" href={BIZ.bookRooms}>Book a room online</a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot wrap">
      <p>The Conch Inn &amp; Marina, Bay Street, Marsh Harbour, Abaco</p>
      <nav aria-label="Footer"><a href="./">Home</a><a href="rooms.html">Rooms</a><a href={BIZ.instagram}>Instagram</a><a href={BIZ.snappas}>Snappa's</a></nav>
      <p className="muted">Photographs: The Conch Inn &amp; Marina.</p>
    </footer>
  )
}

export function Dock() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const quiet = [document.querySelector('.desk-bill'), document.querySelector('.desk-head'), document.getElementById('office')].filter(Boolean) as Element[]
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => { es.forEach(e => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target))); setOn(vis.size === 0) })
    quiet.forEach(q => io.observe(q))
    return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 900px)').matches ? '76px' : '0px') }, [on])
  return (
    <div className={`dockbar ${on ? 'on' : ''}`} aria-hidden={!on} {...(on ? {} : { inert: '' as any })}>
      <a className="btn-2 num" href={`tel:${BIZ.tel}`} tabIndex={on ? 0 : -1}>Call</a>
      <a className="btn" href="#desk" tabIndex={on ? 0 : -1}>Request a slip</a>
    </div>
  )
}
