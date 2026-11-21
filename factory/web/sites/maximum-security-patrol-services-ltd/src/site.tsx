import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IMG, biz, chapters, services } from './data'

export function Top({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open])
  const base = home ? '' : './'
  return (
    <>
      <header className="top">
        <a className="name" href="./">Maximum Security &amp; Patrol Services</a>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu</button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="menu" className="overlay" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <button ref={closeRef} type="button" className="menu-btn close" onClick={() => setOpen(false)}>Close</button>
            <nav aria-label="Chapters and pages">
              <ol>
                {chapters.map(c => <li key={c.t}><a href={base + '#top'} onClick={() => setOpen(false)}><span>{c.t}</span>{c.h.replace(/\.$/, '')}</a></li>)}
                <li><a href={base + '#since'} onClick={() => setOpen(false)}><span>1993</span>Who we are</a></li>
                <li><a href="services.html" onClick={() => setOpen(false)}><span>Services</span>All five services</a></li>
                <li><a href={base + '#proposal'} onClick={() => setOpen(false)}><span>Proposal</span>Request a security proposal</a></li>
              </ol>
            </nav>
            <aside>
              <p>{biz.address}, {biz.town}</p>
              {biz.phones.map(ph => <a key={ph.tel} className="btn btn-brass" href={`tel:${ph.tel}`}>Call {ph.label}</a>)}
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Origin() {
  return (
    <section className="light" id="since" aria-labelledby="since-h">
      <div className="wrap origin">
        <p className="origin__k" aria-hidden="true">1993</p>
        <h2 id="since-h">Started with not more than a dozen fully trained officers.</h2>
        <div className="origin__body">
          <p>Byron C. Rodgers, Chairman and CEO, founded Maximum Security &amp; Patrol Services in 1993. The aim from the first day: to change an industry known for turnover and low standards.</p>
          <p>Today the company supplies trained officers, patrols, alarm monitoring, investigations and consultancy from one office on Carib Road.</p>
        </div>
        <figure>
          <img src={IMG + 'notes.jpg'} alt="A closed notebook, pen and folder on a desk in striped light from louvred shutters (illustrative photograph)" loading="lazy" width={720} height={480} data-source="generated" />
          <figcaption>Investigations and consultancy start at a desk like this one.</figcaption>
        </figure>
      </div>
      <div className="wrap svcs" id="services">
        <h2>Five services, one office that answers.</h2>
        <ol>
          {services.map(s => (
            <li key={s.id}><span>{s.n}</span><div><h3>{s.name}</h3><p style={{ marginTop: '.35rem', fontSize: 'var(--t-1)' }}>{s.who}</p></div><p>{s.body}</p></li>
          ))}
        </ol>
        <p style={{ marginTop: '2rem' }}><a className="link" href="services.html">The services in detail</a></p>
      </div>
    </section>
  )
}

const SVC = ['Security officers', 'Patrols', 'Alarm monitoring', 'Investigations', 'Consultancy']
const SITE = ['Bank or office', 'Retail store', 'Government building', 'Residence', 'Yard or warehouse']
const HRS = ['Business hours', 'Nights', 'Around the clock', 'Not sure yet']

export function Proposal() {
  const [svc, setSvc] = useState<string[]>(['Security officers'])
  const [site, setSite] = useState('Bank or office')
  const [hrs, setHrs] = useState('Nights')
  const [posts, setPosts] = useState(1)
  const t = (x: string) => setSvc(a => (a.includes(x) ? a.filter(y => y !== x) : [...a, x]))
  const say = useMemo(() => `Good day. I would like a security proposal for a ${site.toLowerCase()} in New Providence: ${svc.length ? svc.join(', ').toLowerCase() : 'advice on what we need'}, ${hrs.toLowerCase()}, ${posts} ${posts === 1 ? 'post' : 'posts'}.`, [svc, site, hrs, posts])
  return (
    <section className="wrap prop" id="proposal" aria-labelledby="prop-h">
      <div>
        <h2 id="prop-h">Request a security proposal.</h2>
        <p className="prop__intro">Choose what you need and we will write the sentence for you. Then call the office on Carib Road and read it out.</p>
        <fieldset><legend>What you need</legend><div className="opts">{SVC.map(x => <label className="opt" key={x}><input type="checkbox" checked={svc.includes(x)} onChange={() => t(x)} /><span>{x}</span></label>)}</div></fieldset>
        <fieldset><legend>The premises</legend><div className="opts">{SITE.map(x => <label className="opt" key={x}><input type="radio" name="site" checked={site === x} onChange={() => setSite(x)} /><span>{x}</span></label>)}</div></fieldset>
        <fieldset><legend>When</legend><div className="opts">{HRS.map(x => <label className="opt" key={x}><input type="radio" name="hrs" checked={hrs === x} onChange={() => setHrs(x)} /><span>{x}</span></label>)}</div></fieldset>
        <fieldset><legend>Officers on post at once</legend>
          <div className="count"><button type="button" aria-label="Fewer posts" onClick={() => setPosts(n => Math.max(1, n - 1))}>&minus;</button><output aria-live="polite">{posts}</output><button type="button" aria-label="More posts" onClick={() => setPosts(n => Math.min(30, n + 1))}>+</button></div>
        </fieldset>
      </div>
      <aside className="say" aria-label="What to say when you call">
        <h3>What to say</h3>
        <p className="lead">Read this out when the office answers.</p>
        <blockquote>{say}</blockquote>
        <div className="calls">
          <a className="btn btn-brass" href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a>
          <a className="btn btn-ghost" href={`tel:${biz.phones[1].tel}`}>Or {biz.phones[1].label}</a>
        </div>
      </aside>
    </section>
  )
}

export function Credits() {
  return (
    <footer className="wrap credits" id="contact">
      <h2>Maximum Security &amp; Patrol Services Ltd.</h2>
      <dl>
        <div><dt>Office</dt><dd>{biz.address}<br />{biz.town}</dd></div>
        <div><dt>Telephone</dt><dd>{biz.phones.map(p => <a key={p.tel} href={`tel:${p.tel}`} style={{ display: 'block' }}>{p.label}</a>)}</dd></div>
        <div><dt>Fax</dt><dd>{biz.fax}</dd></div>
        <div><dt>Mail</dt><dd>{biz.box}, Nassau</dd></div>
        <div><dt>Founded</dt><dd>1993, by Byron C. Rodgers</dd></div>
      </dl>
      <div className="foot">
        <span>Photography: illustrative images generated for this concept, to be replaced with your own.</span>
        <a href="services.html">Services</a>
      </div>
    </footer>
  )
}

export function CallPill() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const film = document.querySelector('[data-stage]'); const prop = document.getElementById('proposal'); const ct = document.getElementById('contact')
    let past = !film, a = false, b = false
    const upd = () => setShow(past && !a && !b)
    const os: IntersectionObserver[] = []
    if (film) { const o = new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; upd() }); o.observe(film); os.push(o) }
    if (prop) { const o = new IntersectionObserver(([e]) => { a = e.isIntersecting; upd() }, { threshold: 0.2 }); o.observe(prop); os.push(o) }
    if (ct) { const o = new IntersectionObserver(([e]) => { b = e.isIntersecting; upd() }); o.observe(ct); os.push(o) }
    upd(); return () => os.forEach(o => o.disconnect())
  }, [])
  return <a className="callpill" data-hidden={!show} href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a>
}
