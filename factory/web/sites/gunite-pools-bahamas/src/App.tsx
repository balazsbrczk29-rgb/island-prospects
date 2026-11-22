import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import { QuoteTool } from './QuoteTool'
import { Anatomy } from './Anatomy'
import { openTool, useStore } from './store'
import { ADDRESS, MAPS, PHONE, SITE, STORE, TEL, hero, ledger, people, promises, reads, work } from './data'

function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv')]
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

function Header() {
  return (
    <header className="top">
      <div className="top-in" style={{ paddingLeft: 'var(--margin)', paddingRight: 'var(--margin)' }}>
        <a className="mark" href="#top" aria-label="Gunite Pools of Nassau, home"><b>Gunite Pools of Nassau</b><span className="cap">Since 1972</span></a>
        <nav className="nav" aria-label="Main">
          <a href="#work">Work</a><a href="#build">How it is built</a><a href="#service">Service</a><a href="#repairs">Repairs</a><a href="#family">Family</a>
          <a className="tel num" href={TEL}>{PHONE}</a>
        </nav>
        <a className="mtel num" href={TEL}><Phone size={16} strokeWidth={1.75} aria-hidden="true" />Call</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="h1">
      <figure className="hero-photo">
        <img src={hero.src} width={hero.w} height={hero.h} alt={hero.alt} fetchPriority="high" className="ph" />
        <figcaption className="cap">A Gunite Pools of Nassau project</figcaption>
      </figure>
      <div className="hero-left">
        <h1 id="h1">Tell us about the pool you have in mind.</h1>
        <p className="lead">Built and serviced by the Whitehead family since 1972.</p>
        <QuoteTool />
      </div>
    </section>
  )
}

function Work() {
  const track = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = track.current!
    const on = () => { const figs = [...t.children] as HTMLElement[]; const x = t.scrollLeft; let best = 0; figs.forEach((f, k) => { if (Math.abs(f.offsetLeft - t.offsetLeft - x) < Math.abs(figs[best].offsetLeft - t.offsetLeft - x)) best = k }); setI(p => (p === best ? p : best)) }
    t.addEventListener('scroll', on, { passive: true }); return () => t.removeEventListener('scroll', on)
  }, [])
  const go = (d: number) => { const t = track.current!; const f = t.children[Math.max(0, Math.min(work.length - 1, i + d))] as HTMLElement; t.scrollTo({ left: f.offsetLeft - t.offsetLeft - parseFloat(getComputedStyle(t).paddingLeft), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) }
  return (
    <section className="sec" id="work" aria-labelledby="work-h">
      <div className="wrap grid sec-head rv">
        <h2 id="work-h" className="h2">Geometric or free-form. Clean simple lines or meandering curves.</h2>
        <div className="side">
          <a className="link" href={`${SITE}/residential`}>Residential portfolio</a>
          <a className="link" href={`${SITE}/commercial`}>Commercial showpieces</a>
        </div>
        <p className="lead">From a residential pool to an Olympic size pool, for homeowners, architects, structural engineers, designers and main contractors.</p>
      </div>
      <div className="track" ref={track} tabIndex={0} aria-label="Pools built by Gunite Pools of Nassau">
        {work.map((p, k) => (
          <figure key={p.src}>
            <img src={p.src} width={p.w} height={p.h} alt={p.alt} loading="lazy" decoding="async" style={{ aspectRatio: `${p.w} / ${p.h}` }} />
          </figure>
        ))}
      </div>
      <div className="wrap track-bar">
        <p className="cap muted num" aria-live="polite">{String(i + 1).padStart(2, '0')} / {String(work.length).padStart(2, '0')}</p>
        <div className="arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous pool"><ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next pool"><ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  )
}

function Service() {
  const { serviceIsland } = useStore()
  return (
    <section className="sec field" id="service" aria-labelledby="service-h">
      <div className="wrap grid" style={{ rowGap: 48 }}>
        <div style={{ gridColumn: '1 / span 6' }} className="svc-l rv">
          <p className="cap muted">Pool service and maintenance</p>
          <h2 id="service-h" className="h2" style={{ marginTop: 16 }}>Your pool, looked after when you are not there.</h2>
          <ol className="promises">
            {promises.map((p, k) => <li key={p}><span className="n num">{k + 1}</span><span>{p}</span></li>)}
          </ol>
          <p className="small muted" style={{ marginTop: 8 }}>In New Providence, and now in Great Exuma.</p>
          <button type="button" className="btn btn-light" style={{ marginTop: 32 }} onClick={() => openTool('service')}>Put my pool on the programme</button>
        </div>
        <div style={{ gridColumn: '8 / span 5', alignSelf: 'center' }} className="svc-r rv">
          <div className="report" aria-label="Sample monthly report layout">
            <div className="report-head">
              <div><p className="cap muted">Monthly pool report</p><p style={{ font: '560 20px/1.25 var(--sans)', marginTop: 4 }}>Your pool, {serviceIsland}</p></div>
              <span className="tag">Sample layout</span>
            </div>
            <div className="report-row"><span>Visit logged by GPS</span><span className="v num">arrived, left, time on site</span></div>
            <div className="report-row"><span>Equipment</span><span className="v">checked and reported</span></div>
            <div className="report-row"><span>Water chemistry</span><span className="v">tested and reported</span></div>
            <div className="report-row"><span>Pool health</span><span className="v">the field manager's notes</span></div>
            <div className="report-row"><span>Next visit</span><span className="v">booked</span></div>
          </div>
          <p className="cap muted" style={{ marginTop: 12 }}>An illustration of what the report covers, not a real client report.</p>
        </div>
      </div>
    </section>
  )
}

function Repairs() {
  const [on, setOn] = useState(0)
  return (
    <section className="sec" id="repairs" aria-labelledby="repairs-h">
      <div className="wrap grid sec-head rv">
        <h2 id="repairs-h" className="h2">Repairs, renovation, tanks and the store.</h2>
      </div>
      <div className="wrap grid">
        <div className="ledger-wrap">
          <ul className="ledger">
            {ledger.map((r, k) => (
              <li key={r.id} className="ledger-row grid" onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                <figure className="inline" style={{ margin: 0 }}><img src={r.img.src} width={r.img.w} height={r.img.h} alt={r.img.alt} loading="lazy" decoding="async" /></figure>
                <span className="n cap num">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="h3">{r.name}</h3>
                <p>{r.text}</p>
                <div className="act">
                  {r.door ? <button type="button" className="link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', minHeight: 32 }} onClick={() => openTool('build', r.door!)}>{r.cta}</button>
                    : <a className="link" href={r.id === 'store' ? STORE : TEL}>{r.cta}</a>}
                  <a className="cap muted" href={r.page} style={{ textDecoration: 'none', minHeight: 32, display: 'inline-flex', alignItems: 'center' }}>More on their site</a>
                </div>
              </li>
            ))}
          </ul>
          <div className="reads">
            <span className="cap muted">Read</span>
            {reads.map(r => <a key={r.href} className="link" href={r.href}>{r.t}</a>)}
          </div>
        </div>
        <figure className="ledger-photo" aria-hidden="true">
          <img key={ledger[on].id} src={ledger[on].img.src} width={ledger[on].img.w} height={ledger[on].img.h} alt="" loading="lazy" decoding="async" />
          <figcaption className="cap">{ledger[on].name}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Family() {
  return (
    <section className="sec" id="family" aria-labelledby="family-h" style={{ paddingTop: 32 }}>
      <div className="wrap grid">
        <div className="family-body rv">
          <h2 id="family-h" className="h2">A family firm since 1972.</h2>
          <p className="lead">Peter and John Whitehead founded Gunite Pools of Nassau in 1972. Thomas joined in 1973 and Phillip in 2008, and the company is now entering its third generation of family ownership.</p>
          <p>It started in the residential market and has grown into one of the largest pool construction companies in the Caribbean, taking on some of the largest and most complex commercial projects in the region, and the go-to company for high-end residential pools in the Bahamas. It is wholly Bahamian owned.</p>
          <p className="cap muted">Member of the Pool and Hot Tub Alliance (PHTA).</p>
        </div>
        <ul className="people rv">
          {people.map(p => <li key={p.n}><b>{p.n}</b><span className="cap muted">{p.r}</span></li>)}
        </ul>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="close" id="contact" aria-labelledby="close-h">
      <div className="wrap rv">
        <h2 id="close-h" className="h2">Start with the pool you have in mind.</h2>
        <div className="close-actions">
          <button type="button" className="btn btn-primary" onClick={() => openTool('build')}>Start my request</button>
          <a className="btn btn-quiet num" href={TEL}><Phone size={18} strokeWidth={1.75} aria-hidden="true" />Call {PHONE}</a>
        </div>
        <div className="close-info small">
          <span>Store and office: <a className="link" href={MAPS}>{ADDRESS}</a>. Hours on request.</span>
          <a className="link" href={STORE}>Shop online</a>
          <a className="link" href="https://www.instagram.com/gunitepoolsofnassau/">Instagram</a>
          <a className="link" href="https://www.facebook.com/gunitepoolsofnassau/">Facebook</a>
        </div>
      </div>
    </section>
  )
}

function Dock() {
  useEffect(() => {
    const dock = document.querySelector('.dock')!
    let heroOut = false, closeIn = false
    const set = () => { const on = heroOut && !closeIn; dock.classList.toggle('on', on); document.documentElement.classList.toggle('dock-on', on && innerWidth <= 900) }
    const a = new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; set() }), b = new IntersectionObserver(([e]) => { closeIn = e.isIntersecting; set() })
    a.observe(document.getElementById('quote')!); b.observe(document.getElementById('contact')!)
    return () => { a.disconnect(); b.disconnect() }
  }, [])
  return (
    <div className="dock">
      <button type="button" className="btn btn-primary" onClick={() => openTool('build')}>Request a quote</button>
      <a className="btn call" href={TEL} aria-label={`Call ${PHONE}`}><Phone size={20} strokeWidth={1.75} aria-hidden="true" /></a>
    </div>
  )
}

export function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Anatomy />
        <div className="wrap anat-also small muted rv" style={{ paddingBottom: 32 }}>
          <p>Swimming pools, spas, water features, infinity edges, tension edges and play areas. We also offer plumbing systems, mechanical systems, full pool engineering and pool value engineering.</p>
        </div>
        <Service />
        <Repairs />
        <Family />
        <Close />
      </main>
      <footer className="foot wrap cap">
        <p>Gunite Pools of Nassau · {ADDRESS} · <span className="num">{PHONE}</span> · Photography: Gunite Pools of Nassau.</p>
      </footer>
      <Dock />
    </>
  )
}
