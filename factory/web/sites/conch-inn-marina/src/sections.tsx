import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BIZ, PHOTO, ROOMS, LEDGER, ALSO, RULES, wix } from './data'

export function Harbour() {
  return (
    <section className="harbour" aria-labelledby="harbour-h">
      <figure className="harbour-photo">
        <img src={wix(PHOTO.balcony.id, 1600, 1067)} alt={PHOTO.balcony.alt} width={1600} height={1067} loading="lazy" />
      </figure>
      <div className="wrap harbour-text">
        <h2 id="harbour-h" className="h2">On Bay Street since 1972. Rebuilt after Dorian, open again since March 2021.</h2>
        <p className="lede muted">Seventy-three slips and mooring balls in the middle of Marsh Harbour, catamarans up to 30 feet wide, and three miles from the airport. Family-run.</p>
      </div>
    </section>
  )
}

export function Rates() {
  return (
    <section id="rates" className="rates" aria-labelledby="rates-h">
      <div className="wrap rates-grid">
        <div className="rates-head">
          <h2 id="rates-h" className="h2">The whole bill, before you cross.</h2>
          <p className="lede">Every rate the office publishes, in one place. Power and water at the slip, free WiFi and showers, fuel and ice on the dock.</p>
          <p className="also">{ALSO.join(' · ')}</p>
          <p className="small rates-note">Prefer not to pay? The free Union Jack public dock is a third of a mile west along the shore.</p>
        </div>
        <div className="ledger num">
          {LEDGER.map(g => (
            <table key={g.group}>
              <caption>{g.group}</caption>
              <tbody>{g.rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
            </table>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Ashore() {
  return (
    <section id="ashore" className="ashore" aria-labelledby="ashore-h">
      <figure className="ashore-photo">
        <img src={wix(PHOTO.snappas.id, 1600, 1600)} alt={PHOTO.snappas.alt} width={1600} height={1600} loading="lazy" />
      </figure>
      <div className="ashore-card">
        <h2 id="ashore-h" className="h2">Tie up, walk to town.</h2>
        <ol className="walk">
          <li><span>Snappas Bar &amp; Grill</span><span>on the dock, live music, harbour view</span></li>
          <li><span>Restaurants, groceries, liquor, shops</span><span>a walk from your slip</span></li>
          <li><span>Renu Day Spa, Trade Winds</span><span>at the inn</span></li>
          <li><span>Navigare, Dream Yacht Charters</span><span>based on site</span></li>
          <li><span>Leonard M. Thompson International</span><span className="num">3 miles</span></li>
        </ol>
      </div>
    </section>
  )
}

export function RoomsPicker() {
  const [i, setI] = useState(2)
  const r = ROOMS[i]
  return (
    <section id="rooms" className="rooms" aria-labelledby="rooms-h">
      <div className="rooms-photo">
        <AnimatePresence initial={false}>
          <motion.img key={r.id} src={wix(r.photo.id, 840, 1050)} alt={r.alt} width={840} height={1050} loading="lazy"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.22, 0.61, 0.24, 1] }} />
        </AnimatePresence>
      </div>
      <div className="rooms-side">
        <h2 id="rooms-h" className="h2">Or sleep ashore, over the marina.</h2>
        <div className="room-list" role="tablist" aria-label="Room types">
          {ROOMS.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
              <span>{x.name}</span><span className="v">{x.view}</span>
            </button>
          ))}
        </div>
        <p className="feat" role="tabpanel">{r.features.join(', ')}.</p>
        <div className="rooms-acts">
          <a className="btn" href={BIZ.bookRooms}>Book online</a>
          <a className="textlink" href="rooms.html">See all six rooms</a>
        </div>
      </div>
    </section>
  )
}

export function Office() {
  return (
    <section id="office" className="office" aria-labelledby="office-h">
      <div className="wrap office-col">
        <div className="ps">
          <p className="ps-k">P.S.</p>
          <p className="lede">The house rules a captain asks about:</p>
          <ol>{RULES.map(x => <li key={x}>{x}</li>)}</ol>
        </div>
        <div className="card">
          <h2 id="office-h" className="h2">The dock office</h2>
          <p className="lede">{BIZ.hours}. Call ahead to come in early and we will give you a slip and a time.</p>
          <dl className="num">
            <div><dt>Office</dt><dd><a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></dd></div>
            <div><dt>If busy</dt><dd><a href={`tel:${BIZ.tel2}`}>{BIZ.phone2}</a></dd></div>
            <div><dt>Radio</dt><dd>{BIZ.vhf}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></dd></div>
            <div><dt>Address</dt><dd>{BIZ.street}</dd></div>
          </dl>
          <div className="card-acts">
            <a className="btn" href="#h1">Write the slip letter</a>
            <a className="textlink" href={BIZ.bookRooms}>Book a room online</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot wrap">
      <p>The Conch Inn &amp; Marina, Bay Street, Marsh Harbour, Abaco</p>
      <nav aria-label="Footer"><a href="./">Home</a><a href="rooms.html">Rooms</a><a href={BIZ.instagram}>Instagram</a><a href={BIZ.snappas}>Snappas</a></nav>
      <p className="small muted">Photographs: The Conch Inn &amp; Marina.</p>
    </footer>
  )
}

export function Dock() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const quiet = [document.querySelector('.hero'), document.getElementById('office')].filter(Boolean) as Element[]
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); setOn(vis.size === 0) })
    quiet.forEach(q => io.observe(q))
    return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 900px)').matches ? '72px' : '0px') }, [on])
  return (
    <div className={`dock ${on ? 'on' : ''}`}>
      <a className="dock-call num" href={`tel:${BIZ.tel}`} tabIndex={on ? 0 : -1}>Call</a>
      <a className="btn" href="#h1" tabIndex={on ? 0 : -1}>Request a slip</a>
    </div>
  )
}
