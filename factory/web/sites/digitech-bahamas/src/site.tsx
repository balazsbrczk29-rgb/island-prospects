import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, Phone } from 'lucide-react'
import { IMG, biz, services } from './data'

const ease = [0.22, 1, 0.36, 1] as const

export function Parts() {
  const [on, setOn] = useState(0)
  const cur = services[on]
  return (
    <section className="sec wrap" id="systems" aria-labelledby="systems-h">
      <div className="sec-head">
        <h2 id="systems-h">Four jobs, one local team that answers the phone.</h2>
        <p>Most Nassau businesses buy the till from one company, the Wi-Fi from another and back up nothing. Digitech does all four, so there is one number to call.</p>
      </div>
      <div className="parts">
        <ul className="parts__list">
          {services.map((s, i) => (
            <li key={s.id} className="part" data-on={i === on}>
              <button type="button" aria-expanded={i === on} aria-controls={`part-${s.id}`} onClick={() => setOn(i)}>
                <span className="part__n num">0{i + 1}</span>
                <span className="part__t">{s.name}</span>
                <Plus className="part__ico" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {i === on && (
                  <motion.div id={`part-${s.id}`} className="part__d" key="d"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease }}>
                    <div style={{ paddingBottom: '1.5rem' }}>
                      <img className={'part__mobimg' + (s.xray ? ' xr__img' : '')} src={IMG + s.img} alt={s.alt} loading="lazy" data-source="generated" width={800} height={533} />
                      <p>{s.body}</p>
                      <p style={{ marginTop: '.9rem' }}><a className="btn-text btn" href={`services.html#${s.id}`}>More on {s.name.toLowerCase()}</a></p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        <div className="parts__media">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img key={cur.id} src={IMG + cur.img} alt={cur.alt} data-source="generated" loading="lazy"
              className={cur.xray ? 'xr__img' : undefined}
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }} />
          </AnimatePresence>
          {cur.xray && <div className="xr__tint" aria-hidden="true" />}
          <span className="parts__cap tag tag--light">{cur.short}</span>
        </div>
      </div>
    </section>
  )
}

export function Night() {
  const steps = ['We come and see how you trade', 'Design and a written quote', 'Install, cable and certify', 'Train your staff on the system', 'Support after installation']
  return (
    <section className="night" id="support" aria-labelledby="support-h">
      <img className="night__img" src={IMG + 'after-close.jpg'} alt="A cafe-bar after closing at night, chairs up, one point-of-sale screen glowing on the counter (illustrative photograph)" loading="lazy" data-source="generated" />
      <div className="night__body">
        <p className="k">After hours</p>
        <h2 id="support-h">Chairs up. Someone still owns the system.</h2>
        <p>Digitech delivers the whole job as a turn-key project, then stays on for the support after installation. The same team that cabled your counter is the one you call.</p>
        <ol className="steps steps--night">
          {steps.map((s, i) => <li key={s}><span className="num">0{i + 1}</span><span>{s}</span></li>)}
        </ol>
      </div>
    </section>
  )
}

const KINDS = ['Restaurant or bar', 'Retail shop', 'Office', 'Hotel or guest house', 'Something else']
const NEEDS = ['Razor POS', 'Network and cabling', 'Wi-Fi', 'Cloud backup', 'Managed IT']

export function WorkOrder() {
  const [kind, setKind] = useState('Restaurant or bar')
  const [needs, setNeeds] = useState<string[]>(['Razor POS'])
  const [tills, setTills] = useState(2)
  const [area, setArea] = useState('')
  const [name, setName] = useState('')
  const [reach, setReach] = useState('')
  const [note, setNote] = useState('')
  const toggle = (n: string) => setNeeds(a => (a.includes(n) ? a.filter(x => x !== n) : [...a, n]))
  const summary = useMemo(() => [
    `Business: ${kind}`,
    `Needs: ${needs.length ? needs.join(', ') : 'not sure yet'}`,
    `Tills or workstations: ${tills}`,
    area && `Location: ${area}`,
    name && `Name: ${name}`,
    reach && `Reach me at: ${reach}`,
    note && `Note: ${note}`,
  ].filter(Boolean).join('\n'), [kind, needs, tills, area, name, reach, note])
  const href = `mailto:${biz.email}?subject=${encodeURIComponent('Site visit request: ' + kind)}&body=${encodeURIComponent('Hello Digitech,\n\nI would like a site visit.\n\n' + summary + '\n')}`

  return (
    <section className="sec wrap" id="work-order" aria-labelledby="wo-h">
      <div className="wo">
        <form onSubmit={e => { e.preventDefault(); window.location.href = href }} aria-describedby="wo-intro">
          <h2 id="wo-h">Request a site visit.</h2>
          <p className="wo__intro" id="wo-intro">Tell us what you run and what you need. It takes a minute, and it goes straight to the sales desk as an email you can check before sending.</p>
          <fieldset>
            <legend>Your business</legend>
            <div className="chips">
              {KINDS.map(k => <label className="chip" key={k}><input type="radio" name="kind" checked={kind === k} onChange={() => setKind(k)} /><span>{k}</span></label>)}
            </div>
          </fieldset>
          <fieldset>
            <legend>What you need</legend>
            <div className="chips">
              {NEEDS.map(n => <label className="chip" key={n}><input type="checkbox" checked={needs.includes(n)} onChange={() => toggle(n)} /><span>{n}</span></label>)}
            </div>
          </fieldset>
          <fieldset>
            <legend>Tills or workstations</legend>
            <div className="stepper">
              <button type="button" aria-label="Fewer" onClick={() => setTills(t => Math.max(1, t - 1))}>&minus;</button>
              <output aria-live="polite">{tills}</output>
              <button type="button" aria-label="More" onClick={() => setTills(t => Math.min(40, t + 1))}>+</button>
            </div>
          </fieldset>
          <div className="field-row">
            <label><span className="lbl">Where you are</span><input type="text" value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. Bay Street, Nassau" /></label>
            <label><span className="lbl">Your name</span><input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></label>
          </div>
          <div className="field-row" style={{ marginTop: '1.5rem' }}>
            <label><span className="lbl">Phone or email</span><input type="text" autoComplete="tel" value={reach} onChange={e => setReach(e.target.value)} /></label>
            <label><span className="lbl">Anything else</span><input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Wi-Fi drops on busy nights" /></label>
          </div>
        </form>
        <aside className="wo__sum" aria-label="Your request">
          <h3>Your request</h3>
          <pre>{summary}</pre>
          <a className="btn btn-primary" href={href}>Send to Digitech</a>
          <small>Opens your email app addressed to {biz.email}. Prefer to talk? Call <a href={`tel:${biz.phones[0].tel}`} className="num">{biz.phones[0].label}</a>.</small>
        </aside>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <footer className="wrap" id="contact">
      <div className="contact">
        <h2>Centreville, Nassau. Two lines, one sales desk.</h2>
        <dl>
          <div><dt>Call</dt><dd>{biz.phones.map(p => <a key={p.tel} className="num" href={`tel:${p.tel}`} style={{ display: 'block' }}>{p.label}</a>)}</dd></div>
          <div><dt>Write</dt><dd><a href={`mailto:${biz.email}`}>{biz.email}</a></dd></div>
          <div><dt>Visit</dt><dd>{biz.address}<br />{biz.town}</dd></div>
          <div><dt>Ask for</dt><dd><a href="#work-order">A site visit</a></dd></div>
        </dl>
      </div>
      <div className="foot">
        <span>&copy; {biz.legal}</span>
        <span>Photography: illustrative images generated for this concept, to be replaced with Digitech's own install photos.</span>
        <a href="services.html">Services</a>
      </div>
    </footer>
  )
}

export function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const stage = document.querySelector('[data-stage]') as HTMLElement | null
    const wo = document.getElementById('work-order')
    const contact = document.getElementById('contact')
    let pastStage = !stage, inWo = false, inContact = false
    const upd = () => setShow(pastStage && !inWo && !inContact)
    const obs: IntersectionObserver[] = []
    if (stage) { const o = new IntersectionObserver(([e]) => { pastStage = !e.isIntersecting && e.boundingClientRect.top < 0; upd() }); o.observe(stage); obs.push(o) }
    if (wo) { const o = new IntersectionObserver(([e]) => { inWo = e.isIntersecting; upd() }, { threshold: 0.25 }); o.observe(wo); obs.push(o) }
    if (contact) { const o = new IntersectionObserver(([e]) => { inContact = e.isIntersecting; upd() }); o.observe(contact); obs.push(o) }
    upd()
    return () => obs.forEach(o => o.disconnect())
  }, [])
  return (
    <nav className="dock" data-hidden={!show} aria-label="Site">
      <a className="wordmark hide-sm" href="./"><i aria-hidden="true" />Digitech</a>
      <a className="hide-sm" href="./#systems">Services</a>
      <a className="hide-sm" href="./#support">Support</a>
      <a href={`tel:${biz.phones[0].tel}`} aria-label={`Call ${biz.phones[0].label}`}><Phone size={18} strokeWidth={1.5} aria-hidden="true" /><span className="hide-sm num">{biz.phones[0].label}</span></a>
      <a className="dock__cta" href="./#work-order">Request a site visit</a>
    </nav>
  )
}
