import { useEffect, useState } from 'react'
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
              className={cur.xray ? 'xr__img' : undefined} width={1600} height={1067}
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
  const steps = ['The POS hardware', 'The POS software', 'Cabling, terminated and certified', 'Training for your staff', 'Support after installation']
  return (
    <section className="night" id="support" aria-labelledby="support-h">
      <img className="night__img" src={IMG + 'after-close.jpg'} alt="A cafe-bar after closing at night, chairs up, one point-of-sale screen glowing on the counter (illustrative photograph)" width={1920} height={1080} loading="lazy" data-source="generated" />
      <div className="night__body">
        <p className="k">After hours</p>
        <h2 id="support-h">Chairs up. Someone still owns the system.</h2>
        <p>Razor POS from Digitech comes as one package: the hardware, the software, the training and the support after installation. The team that cabled your counter is the one you call.</p>
        <ol className="steps steps--night">
          {steps.map((s, i) => <li key={s}><span className="num">0{i + 1}</span><span>{s}</span></li>)}
        </ol>
      </div>
    </section>
  )
}

export function Clients() {
  return (
    <section className="sec wrap clients-sec" aria-labelledby="cl-h">
      <h2 id="cl-h" className="sr-only">Clients</h2>
      <p className="clients">At counters including Hana, Naughty Johnny&rsquo;s, Blu Sail, Beauty Shack <span>and</span> Little&nbsp;Caesars.</p>
      <p className="clients-note">Names from the client logos on digitechbahamas.com.</p>
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
          <div><dt>Ask for</dt><dd><a href="#compose">A quote for your setup</a></dd></div>
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
    const stage = document.querySelector('.kit__go') as HTMLElement | null
    const wo = document.getElementById('compose')
    const contact = document.getElementById('contact')
    let pastStage = !stage, inWo = false, inContact = false
    const upd = () => setShow(pastStage && !inWo && !inContact)
    const obs: IntersectionObserver[] = []
    if (stage) { const o = new IntersectionObserver(([e]) => { pastStage = !e.isIntersecting && e.boundingClientRect.top < 0; upd() }); o.observe(stage); obs.push(o) }
    
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
      <a className="dock__cta" href="./#compose">Build your quote</a>
    </nav>
  )
}
