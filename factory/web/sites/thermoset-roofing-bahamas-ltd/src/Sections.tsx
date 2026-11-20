import { useEffect, useMemo, useRef, useState } from 'react'
import { business, clients, photos, services, radar, makers } from './data'

/* ---------- clients: the proof, as type on a sea-glass field ---------- */
export function Clients() {
  const [all, setAll] = useState(false)
  return (
    <section id="clients" className="clients">
      <div className="clients__head">
        <h2>Resorts, churches, an airport, an embassy.</h2>
        <p>A sample of the roofing and waterproofing clients Thermoset names on its own portfolio, from two decades of new roofs and re-roofs.</p>
      </div>
      <ul className="clients__lead">{clients.lead.map(c => <li key={c}>{c}</li>)}</ul>
      <div className="clients__more" id="clients-more" hidden={!all}>
        <ul>{clients.more.map(c => <li key={c}>{c}</li>)}</ul>
      </div>
      <button type="button" className="clients__toggle" aria-expanded={all} aria-controls="clients-more" onClick={() => setAll(v => !v)}>
        {all ? 'Show fewer' : `And ${clients.more.length} more`}
      </button>
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
                <img src={`${p.src}?format=1500w`} alt={p.alt} loading="lazy" decoding="async" />
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
        <a className="btn btn--sea" href="#estimate" data-job="R.A.D.A.R. maintenance">Book a free roof health assessment</a>
        <figure className="radar__plan"><img src="./still-plan.jpg" alt="The concept model's finished roof seen from directly above: membrane laps, hatch, vents, drain and two AC units" loading="lazy" /><figcaption>What an inspection walks: laps, edges, curbs, hatch, vents and the drain.</figcaption></figure>
      </div>
      <ol className="radar__list">
        {radar.items.map(([name, text], i) => <li key={name}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{name}</h3><p>{text}</p></div></li>)}
      </ol>
      <p className="radar__plans">Plans are scaled for {radar.plans.slice(0, -1).join(', ').toLowerCase()} and {radar.plans[radar.plans.length - 1].toLowerCase()}, from a semi-annual inspection to full-service oversight.</p>
    </section>
  )
}

/* ---------- the estimate: choices become a ready-to-send email ---------- */
const PROPERTY = ['Home', 'Commercial building', 'Resort or hotel', 'Church or public building', 'Industrial facility']
const JOB = ['New roof or re-roof', 'Leak or repair', 'Waterproofing', 'R.A.D.A.R. maintenance', 'Fabrication', 'General construction']
const ISLAND = ['New Providence', 'Grand Bahama', 'Another island']

export function Estimate() {
  const [v, setV] = useState<Record<string, string>>({})
  const set = (k: string, val: string) => setV(s => ({ ...s, [k]: val }))
  useEffect(() => {                                      // links elsewhere on the page can preselect the job
    const on = (e: Event) => { const a = (e.target as HTMLElement).closest?.('[data-job]') as HTMLElement | null; if (a) set('Job', a.dataset.job!) }
    addEventListener('click', on); return () => removeEventListener('click', on)
  }, [])
  const lines = useMemo(() => ['Property', 'Job', 'Island', 'Name', 'Phone', 'Details'].filter(k => v[k]).map(k => `${k}: ${v[k]}`), [v])
  const ready = !!(v.Job && v.Name)
  const href = `mailto:${business.email}?subject=${encodeURIComponent(`Free estimate request${v.Job ? ': ' + v.Job : ''}`)}&body=${encodeURIComponent(`Hello Thermoset,\n\nI would like a free estimate.\n\n${lines.join('\n')}\n`)}`
  const choice = (key: string, label: string, opts: string[]) => (
    <fieldset>
      <legend>{label}</legend>
      <div className="estimate__opts">{opts.map(o => <label key={o} className={v[key] === o ? 'is-on' : ''}><input type="radio" name={key} value={o} checked={v[key] === o} onChange={() => set(key, o)} />{o}</label>)}</div>
    </fieldset>
  )
  return (
    <section id="estimate" className="estimate">
      <div className="estimate__head">
        <h2>All estimates are free.</h2>
        <p>Tell Thermoset what the building is and what it needs. Your answers become an email to the General Manager, ready to send.</p>
      </div>
      <form className="estimate__form" onSubmit={e => e.preventDefault()} aria-label="Free estimate request">
        {choice('Property', 'The building', PROPERTY)}
        {choice('Job', 'The job', JOB)}
        {choice('Island', 'The island', ISLAND)}
        <div className="estimate__fields">
          <label>Your name<input name="Name" autoComplete="name" value={v.Name || ''} onChange={e => set('Name', e.target.value)} /></label>
          <label>Phone<input name="Phone" type="tel" autoComplete="tel" value={v.Phone || ''} onChange={e => set('Phone', e.target.value)} /></label>
          <label className="estimate__wide">Anything we should know<textarea name="Details" rows={3} value={v.Details || ''} onChange={e => set('Details', e.target.value)} /></label>
        </div>
        <div className="estimate__send">
          <button type="button" className="btn btn--light" aria-disabled={!ready} onClick={() => { if (ready) location.href = href }}>Send the request by email</button>
          <p>{ready ? 'Opens your email app with everything filled in.' : 'Choose the job and add your name to send.'}</p>
        </div>
      </form>
      <div className="estimate__people">
        <div><h3>Office</h3><a href={business.office.href}>{business.office.label}</a><address>{business.address.map(l => <span key={l}>{l}</span>)}</address></div>
        {business.people.map(p => <div key={p.name}><h3>{p.name}</h3><p>{p.role}</p><a href={p.href}>{p.tel}</a><a href={`mailto:${p.email}`}>{p.email}</a></div>)}
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
      <p className="foot__small">Job photographs: Thermoset Roofing Bahamas Ltd. The building at the top of the page is a 3D model made for this concept, not a Thermoset project.</p>
    </footer>
  )
}

/* ---------- the floating dock: sections and the one action, always in reach ---------- */
export function Dock() {
  const [on, setOn] = useState(false)
  useEffect(() => { const f = () => { const e = document.getElementById('estimate'); setOn(scrollY > innerHeight * 0.55 && !(e && innerWidth >= 1024 && e.getBoundingClientRect().top < innerHeight * 0.7)) }; f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <nav className={`dock${on ? ' is-on' : ''}`} aria-label="Quick navigation">
      <a className="dock__link" href="#clients">Clients</a><a className="dock__link" href="#work">Work</a><a className="dock__link" href="#services">Services</a><a className="dock__link" href="#radar">R.A.D.A.R.</a>
      <a className="dock__call" href={business.office.href}>Call<span> {business.office.label}</span></a>
      <a className="dock__cta" href="#estimate">Free estimate</a>
    </nav>
  )
}
