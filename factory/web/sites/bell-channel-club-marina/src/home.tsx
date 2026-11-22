import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { IMG, CREDITS } from './images'
import { InletMap, MAP_CREDIT } from './map'
import './styles.css'

const PHONE = '(242) 373-2673'
const TEL = 'tel:+12423732673'
const FAX = '(242) 373-3802'
const COORD = '26°30.9′ N, 78°38.2′ W'
const DIR = 'https://www.google.com/maps/dir/?api=1&destination=26.5147,-78.6368'

type Who = 'owner' | 'buyer' | 'boat'
const WHO: { id: Who; label: string; call: string; facts: string[] }[] = [
  { id: 'owner', label: 'Owner or guest', call: 'Call the club office', facts: [
    'Heated pool, tennis courts and the owners’ library.',
    'Reverse-osmosis water to every unit. The beach is kept by the owners’ association.',
    'For gate access, garages and guest arrangements, call the club office.'] },
  { id: 'buyer', label: 'Buying or renting', call: 'Call about units', facts: [
    'Condominiums and townhouses on both the canal and the beach, overlooking the inlet.',
    'Pool, tennis, a limited number of storage garages, and a private marina for owners.',
    'Units are sold and let privately by owners. The office can tell you who to talk to.'] },
  { id: 'boat', label: 'Visiting by boat', call: 'Call about a slip', facts: [
    'The marina is private, for owners. Slips go to owners first.',
    'Call the office about availability before you come in through the cut.',
    'Slip count, depths and rates: ask the office.'] },
]

function Chooser() {
  const [who, setWho] = useState<Who>('owner')
  const reduce = useReducedMotion()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const cur = WHO.find(w => w.id === who)!
  const key = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault(); const n = (i + d + WHO.length) % WHO.length; setWho(WHO[n].id); refs.current[n]?.focus()
  }
  return (
    <div className="who">
      <p className="who__q" id="who-q">Who’s asking?</p>
      <div className="who__seg" role="radiogroup" aria-labelledby="who-q">
        {WHO.map((w, i) => (
          <button key={w.id} ref={el => { refs.current[i] = el }} type="button" role="radio" aria-checked={who === w.id} tabIndex={who === w.id ? 0 : -1}
            onClick={() => setWho(w.id)} onKeyDown={e => key(e, i)}>{w.label}</button>
        ))}
      </div>
      <div className="who__ans" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={who} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
            {cur.facts.map(f => <li key={f}>{f}</li>)}
          </motion.ul>
        </AnimatePresence>
      </div>
      <a className="btn btn--call" href={TEL}><span>{cur.call}</span><span className="num">{PHONE}</span></a>
      <a className="tlink" href={DIR}>Directions to the gate</a>
    </div>
  )
}

function Header() {
  return (
    <header className="hdr">
      <a className="hdr__name" href="./">Bell Channel Club &amp; Marina</a>
      <nav aria-label="Main" className="hdr__nav"><a href="#club">The club</a><a href="#marina">The marina</a><a href="#office">Finding the gate</a></nav>
      <a className="hdr__tel num" href={TEL}>{PHONE}</a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <InletMap zoom={16} at={[0.68, 0.52]} className="hero__map" />
      <div className="card" id="card">
        <p className="coord num">{COORD}</p>
        <h1 id="hero-h" className="h1">Bell Channel Club &amp; Marina</h1>
        <p className="lede muted">A private condominium club between the canal and the beach, on the inlet into Port Lucaya, Grand Bahama.</p>
        <Chooser />
      </div>
    </section>
  )
}

function Club() {
  const A: [string, string][] = [
    ['Heated pool', ''],
    ['Tennis courts', ''],
    ['Owners’ library', ''],
    ['Storage garages', 'A limited number. Ask the office.'],
    ['Reverse-osmosis water', 'For every unit.'],
    ['The beach', 'Kept by the owners’ association.'],
  ]
  return (
    <section id="club" className="sec wrap" aria-labelledby="club-h">
      <div className="club">
        <div className="club__text">
          <h2 id="club-h" className="h2">Between the canal and the beach.</h2>
          <p className="lede muted">Gated condominiums and townhouses on both the canal and the beach, overlooking the inlet into Port Lucaya Marketplace.</p>
          <dl className="amen">{A.map(([a, b]) => <div key={a}><dt>{a}</dt>{b && <dd className="muted">{b}</dd>}</div>)}</dl>
        </div>
        <figure className="club__a"><img src={IMG.pool.src} alt={IMG.pool.alt} width={IMG.pool.w} height={IMG.pool.h} loading="lazy" /><figcaption className="cap muted">Illustrative photograph of a heated pool at night.</figcaption></figure>
        <figure className="club__b"><img src={IMG.beach.src} alt={IMG.beach.alt} width={IMG.beach.w} height={IMG.beach.h} loading="lazy" /><figcaption className="cap muted">Illustrative photograph of the beach side.</figcaption></figure>
      </div>
    </section>
  )
}

function Marina() {
  return (
    <section id="marina" className="sec marina" aria-labelledby="marina-h">
      <figure className="marina__photo">
        <img src={IMG.bay.src} alt={IMG.bay.alt} width={IMG.bay.w} height={IMG.bay.h} loading="lazy" />
        <figcaption className="wrap cap muted">Port Lucaya Marina, at the head of the inlet the club overlooks. Photograph: qwesy qwesy, CC BY 3.0, Wikimedia Commons.</figcaption>
      </figure>
      <div className="wrap marina__grid">
        <h2 id="marina-h" className="h2">A private marina, for owners.</h2>
        <div className="marina__ask">
          <p className="lede">Before you come in through the cut, call the office and ask:</p>
          <ol className="asks">
            <li>Is a slip free for your dates?</li>
            <li>Will your length and draft suit it?</li>
            <li>Where to tie up when you arrive.</li>
            <li>How to reach the office and the gate from the dock.</li>
          </ol>
          <a className="btn btn--call" href={TEL}><span>Call about a slip</span><span className="num">{PHONE}</span></a>
        </div>
      </div>
    </section>
  )
}

function Office() {
  return (
    <section id="office" className="office field" aria-labelledby="office-h">
      <div className="wrap office__grid">
        <div className="office__text">
          <h2 id="office-h" className="h2">Call the club office.</h2>
          <a className="office__tel num" href={TEL}>{PHONE}</a>
          <dl className="office__dl">
            <div><dt>Fax</dt><dd className="num">{FAX}</dd></div>
            <div><dt>Post</dt><dd>P.O. Box F-44053, Freeport, Grand Bahama</dd></div>
            <div><dt>Position</dt><dd className="num">{COORD}</dd></div>
          </dl>
          <a className="tlink tlink--f" href={DIR}>Directions to the gate</a>
        </div>
        <InletMap zoom={14} className="office__map" initial={[600, 440]} />
      </div>
    </section>
  )
}

function CallBar() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const els = [document.getElementById('card'), document.getElementById('office')].filter(Boolean) as Element[]
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); setOn(vis.size === 0) })
    els.forEach(e => io.observe(e)); return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 900px)').matches ? '76px' : '0px') }, [on])
  return <div className={`cbar ${on ? 'on' : ''}`} aria-hidden={!on}><a className="btn btn--call" href={TEL} tabIndex={on ? 0 : -1}><span>Call the club office</span><span className="num">{PHONE}</span></a></div>
}

function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Hero /><Club /><Marina /><Office /></main>
      <footer className="foot field"><div className="wrap foot__row"><p>Bell Channel Club &amp; Marina, Lucaya, Grand Bahama, The Bahamas.</p><p>{MAP_CREDIT}. {CREDITS}</p></div></footer>
      <CallBar />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>)
