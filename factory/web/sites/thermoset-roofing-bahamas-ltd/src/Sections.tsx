import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { business, clientIndex, KINDS, photos, services, radar, makers, type Kind } from './data'

/* ---------- clients: the index, filtered to buildings like yours ---------- */
export function Clients() {
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [q, setQ] = useState('')
  useEffect(() => { const on = (e: Event) => setKind((e as CustomEvent<Kind>).detail); addEventListener('tr:type', on); return () => removeEventListener('tr:type', on) }, [])
  const shown = clientIndex.filter(c => (kind === 'all' || c.kind === kind) && c.name.toLowerCase().includes(q.trim().toLowerCase()))
  const opts: [Kind | 'all', string][] = [['all', 'All'], ...KINDS.map(([k, , plural]) => [k, plural] as [Kind, string])]
  return (
    <section id="clients" className="clients" aria-labelledby="clients-title">
      <div className="clients__head">
        <h2 id="clients-title">The roof over the brands you know.</h2>
        <p>Resorts, churches, an airport, an embassy, shops and plants: the clients Thermoset names on its own portfolio, from two decades of new roofs and re-roofs.</p>
      </div>
      <div className="clients__tools">
        <div className="clients__filters" role="radiogroup" aria-label="Type of building">
          {opts.map(([k, l]) => <button key={k} type="button" role="radio" aria-checked={kind === k} className={`chip chip--light${kind === k ? ' is-on' : ''}`} onClick={() => setKind(k)}>{l}</button>)}
        </div>
        <label className="clients__search"><span className="sr-only">Search the client list</span>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search a name" autoComplete="off" /></label>
        <p className="clients__count" aria-live="polite"><b>{shown.length}</b> of {clientIndex.length}</p>
      </div>
      <motion.ul className="clients__list" layout>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(c => <motion.li key={c.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{c.name}</motion.li>)}
        </AnimatePresence>
      </motion.ul>
      {shown.length === 0 && <p className="clients__none">No name matches. Thermoset&rsquo;s full list is longer than its website shows: ask Croix.</p>}
      <p className="clients__note">Names from Thermoset&rsquo;s portfolio page. The grouping by type of building is ours.</p>
    </section>
  )
}

/* ---------- their own job photographs, moving sideways with the scroll ---------- */
export function Work() {
  const ref = useRef<HTMLElement>(null), track = useRef<HTMLUListElement>(null)
  const [at, setAt] = useState(0)
  useEffect(() => {
    const on = () => {
      const el = ref.current, tr = track.current; if (!el || !tr || innerWidth < 1024) { if (tr) tr.style.transform = ''; return }
      const r = el.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - innerHeight)))
      tr.style.transform = `translate3d(${-p * (tr.scrollWidth - innerWidth)}px, 0, 0)`
      setAt(Math.round(p * (photos.length - 1)))
    }
    on(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
  return (
    <section ref={ref} id="work" className="work" style={{ ['--n' as string]: photos.length }} aria-label="Thermoset on the roof: job photographs">
      <div className="work__pin">
        <div className="work__head">
          <h2>On the roof.</h2>
          <p className="work__count" aria-hidden="true">{String(at + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</p>
        </div>
        <ul ref={track} className="work__track">
          {photos.map(p => (
            <li key={p.src}>
              <figure>
                <img src={`${p.src}?format=1500w`} width={1500} height={1125} alt={p.alt} loading="lazy" decoding="async" />
                <figcaption>{p.cap}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- services: a plain, complete list ---------- */
export function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section id="services" className="services">
      <div className="services__top">
        <h2>Everything on, under and around the roof.</h2>
        <figure><img src="./still-corner.jpg" alt="Close view of the concept model: teal edge metal on the parapet, the white membrane turned up behind it, and two AC units on their curbs" loading="lazy" /><figcaption>Edge metal, membrane upturn and AC curbs on the concept model.</figcaption></figure>
      </div>
      <div className="services__body">
        <div className="services__tabs" role="tablist" aria-label="Service groups">
          {services.map((s, i) => <button key={s.group} type="button" role="tab" id={`svc-tab-${i}`} aria-selected={open === i} aria-controls={`svc-${i}`} onClick={() => setOpen(i)}>{s.group}<span>{String(s.items.length).padStart(2, '0')}</span></button>)}
        </div>
        {services.map((s, i) => (
          <dl key={s.group} role="tabpanel" id={`svc-${i}`} aria-labelledby={`svc-tab-${i}`} className={open === i ? 'is-on' : ''}>
            <div className="services__group">{s.group}</div>
            {s.items.map(([name, text]) => <div key={name} className="services__row"><dt>{name}</dt><dd>{text}</dd></div>)}
          </dl>
        ))}
      </div>
      <p className="services__makers">Licensed, insured and factory certified installers of {makers.slice(0, -1).join(', ')} and {makers[makers.length - 1]} roofing products.</p>
    </section>
  )
}

/* ---------- R.A.D.A.R. maintenance ---------- */
export function Radar() {
  return (
    <section id="radar" className="radar">
      <div className="radar__head">
        <h2><abbr title="Roof Assessment, Diagnostics And Response">R.A.D.A.R.</abbr></h2>
        <p className="radar__name">{radar.letters.map(w => <span key={w}><b>{w[0]}</b>{w.slice(1)} </span>)}</p>
        <p>{radar.intro}</p>
        <a className="btn btn--sea" href="#request" data-job="plan">Book a free roof health assessment</a>
        <figure className="radar__plan"><img src="./still-plan.jpg" alt="The concept model's finished roof seen from directly above: membrane laps, hatch, vents, drain and two AC units" loading="lazy" /><figcaption>What an inspection walks: laps, edges, curbs, hatch, vents and the drain.</figcaption></figure>
      </div>
      <ol className="radar__list">
        {radar.items.map(([name, text], i) => <li key={name}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{name}</h3><p>{text}</p></div></li>)}
      </ol>
      <p className="radar__plans">Plans are scaled for {radar.plans.slice(0, -1).join(', ').toLowerCase()} and {radar.plans[radar.plans.length - 1].toLowerCase()}, from a semi-annual inspection to full-service oversight.</p>
    </section>
  )
}

/* ---------- certified installers, set as a spec line ---------- */
export function Certified() {
  return (
    <section id="certified" className="cert" aria-labelledby="cert-title">
      <h2 id="cert-title" className="cert__lead">Licensed, insured and factory certified installers of</h2>
      <ul className="cert__makers">{makers.map(m => <li key={m}>{m}</li>)}</ul>
      <p className="cert__foot">roofing products. Serving The Bahamas since 2002, 100% Bahamian owned.</p>
    </section>
  )
}

/* ---------- contact: two named people and the office ---------- */
export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__head">
        <h2 id="contact-title">Two Culmers, one office.</h2>
        <a className="btn btn--light" href="#request">Start a free estimate</a>
      </div>
      <div className="contact__grid">
        {[...business.people].reverse().map(p => (
          <div key={p.name}><h3>{p.name}</h3><p>{p.role}</p><a className="contact__big" href={p.href}>{p.tel}</a><a href={`mailto:${p.email}`}>{p.email}</a></div>
        ))}
        <div><h3>The office</h3><p>Oakesfield, Nassau</p><a className="contact__big" href={business.office.href}>{business.office.label}</a><address>{business.address.map(l => <span key={l}>{l}</span>)}</address></div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <p className="foot__name">Thermoset Roofing Bahamas Ltd.</p>
      <p>Roofing and waterproofing across New Providence and the surrounding islands. 100% Bahamian owned.</p>
      <ul>{business.socials.map(s => <li key={s.label}><a href={s.href} rel="noopener">{s.label}</a></li>)}</ul>
      <p className="foot__small">Job photographs: Thermoset Roofing Bahamas Ltd. The building in the roof build-up is a 3D model made for this concept, not a Thermoset project.</p>
    </footer>
  )
}

/* ---------- the floating dock: sections and the one action, always in reach ---------- */
export function Dock() {
  const [on, setOn] = useState(false)
  useEffect(() => { const f = () => { const e = document.getElementById('contact'); setOn(scrollY > innerHeight * 0.9 && !(e && e.getBoundingClientRect().top < innerHeight * 0.9)) }; f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <nav className={`dock${on ? ' is-on' : ''}`} aria-label="Quick navigation">
      <a className="dock__link" href="#clients">Clients</a><a className="dock__link" href="#work">Work</a><a className="dock__link" href="#services">Services</a><a className="dock__link" href="#radar">R.A.D.A.R.</a>
      <a className="dock__call" href={business.office.href}>Call<span> {business.office.label}</span></a>
      <a className="dock__cta" href="#wo-card">Free estimate</a>
    </nav>
  )
}
