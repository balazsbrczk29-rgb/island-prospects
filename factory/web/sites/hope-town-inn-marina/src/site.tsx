import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IMG, RATES, DOCKWA, contact, stays, marina, pics, type Pic } from './data'

// Fixed half: shows the photo of whichever section is in view (or a hovered row's photo).
export function useActivePic(ids: string[], initial: string) {
  const [pic, setPic] = useState(initial)
  const [sec, setSec] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      const vis = es.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (vis) { setPic((vis.target as HTMLElement).dataset.pic || initial); setSec(vis.target.id) }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return [pic, sec] as const
}

export function Fixed({ pic, hover }: { pic: string; hover?: string | null }) {
  const key = hover || pic
  const p: Pic = pics[key]
  return (
    <div className="fixed" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.figure key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.9, delay: 0.25 } }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <img src={IMG + p.src} alt="" style={{ objectPosition: p.pos }} fetchPriority={key === 'harbour' ? 'high' : undefined} />
        </motion.figure>
      </AnimatePresence>
    </div>
  )
}

export function SecPic({ k, eager }: { k: string; eager?: boolean }) {
  const p = pics[k]
  return <img className="sec__pic" src={IMG + p.src} alt={p.alt} style={{ objectPosition: p.pos }} loading={eager ? 'eager' : 'lazy'} width={1200} height={900} />
}

export function Nav({ base = '' }: { base?: string }) {
  return (
    <nav aria-label="Site">
      <ul className="nav">
        <li><a href={base + '#ferry'}>Rooms and villas</a></li>
        <li><a href={base + '#boat'}>Marina</a></li>
        <li><a href={base + '#bar'}>Bridget's Rum Bar</a></li>
        <li><a href={base + '#cay'}>Johnny's Cay</a></li>
        <li><a href={base + '#here'}>Getting here</a></li>
        <li><a href={base + '#contact'}>Contact</a></li>
      </ul>
    </nav>
  )
}

export function StayFinder({ onHover }: { onHover?: (k: string | null) => void }) {
  const [n, setN] = useState(4)
  const fit = useMemo(() => stays.filter(s => s.guests >= n), [n])
  const hov = (s: typeof stays[number]) => onHover?.(s.kind === 'Villa' ? (s.guests >= 8 ? 'porch' : 'living') : 'kitchen')
  return (
    <div>
      <p className="small" id="party-l">How many of you?</p>
      <div className="seg" role="group" aria-labelledby="party-l">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <button key={i} type="button" aria-pressed={i === n} onClick={() => setN(i)}>{i}</button>)}
      </div>
      <p className="count" aria-live="polite">{fit.length} of 9 stays sleep {n} {n === 1 ? 'guest' : 'guests'}.</p>
      <ul className="stays" onMouseLeave={() => onHover?.(null)}>
        <AnimatePresence initial={false}>
          {fit.map(s => (
            <motion.li key={s.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onMouseEnter={() => hov(s)}>
              <b>{s.name}</b>
              <span>Up to {s.guests}</span>
              <span>{s.ft.toLocaleString('en-US')} ft&sup2; &middot; {s.m} m&sup2;</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="acts"><a className="btn btn-ink" href={RATES}>Check room rates</a><span className="small">Live rates and booking on the inn's reservation system.</span></div>
    </div>
  )
}

export function SlipCheck() {
  const [loa, setLoa] = useState('')
  const v = parseFloat(loa)
  let verdict: ReactNode = <>Enter your length overall in feet.</>
  if (!isNaN(v) && v > 0) {
    if (v <= marina.mooringMax) verdict = <>At {v} ft you fit the slips, or a mooring <em>(moorings to {marina.mooringMax} ft)</em>.</>
    else if (v <= marina.maxLoa) verdict = <>At {v} ft you fit: dockage takes boats <em>up to {marina.maxLoa} ft</em>.</>
    else verdict = <>At {v} ft you are over the published {marina.maxLoa} ft. <em>Ask the office</em> before you plan.</>
  }
  return (
    <div className="check">
      <label htmlFor="loa">Your boat's length overall</label>
      <div className="loa"><input id="loa" inputMode="decimal" value={loa} onChange={e => setLoa(e.target.value.replace(/[^\d.]/g, ''))} placeholder="62" aria-describedby="verdict" /><span>ft</span></div>
      <p className="verdict" id="verdict" aria-live="polite">{verdict}</p>
      <div className="acts" style={{ marginTop: 0 }}><a className="btn btn-ink" href={DOCKWA}>Book a slip on Dockwa</a></div>
    </div>
  )
}

export function Specs() {
  return (
    <>
      <dl className="specs">
        <div><dt>Dockage</dt><dd>to {marina.maxLoa} ft</dd></div>
        <div><dt>Slips</dt><dd>{marina.slips}, surge free</dd></div>
        <div><dt>Moorings</dt><dd>to {marina.mooringMax} ft</dd></div>
        <div><dt>Shore power</dt><dd>30 / 50 / 100 A</dd></div>
      </dl>
      <p className="services">{marina.services.join(' · ')}</p>
    </>
  )
}

export function Contact() {
  return (
    <div className="contact">
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
      {contact.phones.map(p => <a key={p.tel} href={`tel:${p.tel}`}>{p.label}</a>)}
    </div>
  )
}

export function Strip({ mode = 'both' }: { mode?: 'both' | 'room' | 'slip' }) {
  return (
    <div className="strip">
      <span className="small">Hope Town, Elbow Cay, Abaco</span>
      <span className="strip__acts">
        {mode !== 'room' && <a className={'btn ' + (mode === 'slip' ? 'btn-ink' : 'btn-line')} href={DOCKWA}>Book a slip</a>}
        {mode !== 'slip' && <a className="btn btn-ink" href={RATES}>Check room rates</a>}
      </span>
    </div>
  )
}

export function Foot() {
  return (
    <footer className="foot">
      <span>&copy; Hope Town Inn &amp; Marina</span>
      <span>Photography: Hope Town Inn &amp; Marina.</span>
      <a href="stay.html">All stays</a><a href="marina.html">Marina</a>
    </footer>
  )
}
