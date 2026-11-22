import { useEffect, useMemo, useState, type ReactNode, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IMG, RATES, DOCKWA, contact, stays, marina, pics, type Pic, type Stay } from './data'

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

export function Fixed({ pic, card }: { pic: string; card?: Stay | null }) {
  const p: Pic = pics[pic]
  return (
    <div className="fixed" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.figure key={p.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.9, delay: 0.25 } }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <motion.img src={IMG + p.src} alt="" width={1920} height={1080} initial={false} animate={{ objectPosition: p.pos || '50% 50%', scale: pic === 'docks' ? 1.12 : 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: p.pos || '50% 50%' }} fetchPriority={pic === 'harbour' ? 'high' : undefined} />
        </motion.figure>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {card && (
          <motion.figure key={card.name} className="stay-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6, transition: { duration: 0.18 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <img src={card.thumb} alt="" width={395} height={300} />
            <figcaption><b>{card.name}</b><span className="tnum">Up to {card.guests} guests · {card.ft.toLocaleString('en-US')} ft² · {card.m} m²</span></figcaption>
          </motion.figure>
        )}
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

export function StaysList() {
  return (
    <ul className="stays">
      {stays.map(st => (
        <li key={st.name}>
          <img src={st.thumb} alt={`${st.name} at Hope Town Inn & Marina`} width={395} height={300} loading="lazy" />
          <b>{st.name}</b>
          <span>Up to {st.guests}</span>
          <span>{st.ft.toLocaleString('en-US')} ft&sup2; &middot; {st.m} m&sup2;</span>
        </li>
      ))}
    </ul>
  )
}

export function SlipCheck({ idp = 'boat' }: { idp?: string }) {
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
      <label htmlFor={idp + '-loa'}>Your boat's length overall</label>
      <div className="loa"><input id={idp + '-loa'} inputMode="decimal" value={loa} onChange={e => setLoa(e.target.value.replace(/[^\d.]/g, ''))} placeholder="62" aria-describedby={idp + '-verdict'} /><span>ft</span></div>
      <p className="verdict" id={idp + '-verdict'} aria-live="polite">{verdict}</p>
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

export function Strip({ mode = 'both', quiet = false }: { mode?: 'both' | 'room' | 'slip'; quiet?: boolean }) {
  return (
    <div className={`strip ${quiet ? 'strip--quiet' : ''}`}>
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

/** Screen 1: the switch by ferry or by boat, each ending in its own booking engine. */
export const smallestFit = (n: number) => [...stays].filter(s => s.guests >= n).sort((a, b) => a.guests - b.guests || a.ft - b.ft)[0]?.name ?? stays[0].name
export function Arrive({ mode, setMode, n, setN, sel, setSel }: { mode: 'ferry' | 'boat'; setMode: (m: 'ferry' | 'boat') => void; n: number; setN: (n: number) => void; sel: string; setSel: (s: string) => void }) {
  const fitN = stays.filter(s => s.guests >= n).length
  const setCount = (i: number) => { setN(i); const cur = stays.find(s => s.name === sel); if (!cur || cur.guests < i) setSel(smallestFit(i)) }
  const tabs: ['ferry' | 'boat', string, string][] = [['ferry', 'By ferry', 'Rooms and villas, 1 to 8 guests'], ['boat', 'By boat', 'Slips to 125 ft, moorings to 45 ft']]
  const key = (e: KeyboardEvent) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const m = mode === 'ferry' ? 'boat' : 'ferry'; setMode(m); document.getElementById('tab-' + m)?.focus() } }
  return (
    <div className="arrive">
      <div className="tabs" role="tablist" aria-label="How you arrive" onKeyDown={key}>
        {tabs.map(([k, l, d]) => (
          <button key={k} id={'tab-' + k} type="button" role="tab" aria-selected={mode === k} aria-controls={'panel-' + k} tabIndex={mode === k ? 0 : -1} onClick={() => setMode(k)} className="tab">
            <b>{l}</b><span>{d}</span>
            {mode === k && <motion.i className="tab__rule" layoutId="tabrule" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />}
          </button>
        ))}
      </div>
      <div id="panel-ferry" role="tabpanel" aria-labelledby="tab-ferry" className="panel" hidden={mode !== 'ferry'}>
          <div className="party">
            <p className="small" id="party-h">How many of you are coming?</p>
            <div className="seg seg--tight" role="group" aria-labelledby="party-h">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <button key={i} type="button" aria-pressed={i === n} onClick={() => setCount(i)}>{i}</button>)}
            </div>
            <p className="count tnum" aria-live="polite">{fitN} of 9 stays sleep {n}</p>
          </div>
          <ul className="tiles" aria-label="The nine stays">
            {stays.map(s => {
              const ok = s.guests >= n, on = sel === s.name
              return (
                <li key={s.name}>
                  <button type="button" className={`tile ${ok ? '' : 'tile--no'} ${on ? 'tile--on' : ''}`} aria-pressed={on} aria-disabled={!ok} onClick={() => ok && setSel(s.name)}>
                    <span className="tile__pic"><img src={s.thumb} alt="" width={395} height={300} loading="lazy" /></span>
                    <b>{s.short}</b>
                    <span className="tnum">{s.kind} · up to {s.guests}<br />{s.ft.toLocaleString('en-US')} ft²</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <figure className="stay-inline">{(() => { const c = stays.find(x => x.name === sel)!; return <><img src={c.thumb} alt={`${c.name} at Hope Town Inn & Marina`} width={395} height={300} /><figcaption className="tnum">{c.name} · up to {c.guests} guests · {c.ft.toLocaleString('en-US')} ft²</figcaption></> })()}</figure>
          <div className="acts acts--tool"><a className="btn btn-ink" href={RATES}>Check rates for {sel}</a><span className="small">Opens the inn's reservation system: choose {sel} there.</span></div>
        </div>
      <div id="panel-boat" role="tabpanel" aria-labelledby="tab-boat" className="panel" hidden={mode !== 'boat'}>
        <SlipCheck idp="hero" />
        <Specs />
      </div>
    </div>
  )
}
