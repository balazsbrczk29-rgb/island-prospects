import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { business, layers } from './data'
import type { Anchor } from './RoofScene'

const RoofScene = lazy(() => import('./RoofScene'))

function canWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false }
}

export default function Hero() {
  const [gl, setGl] = useState(false)
  const [ready, setReady] = useState(false)
  const [wide, setWide] = useState(true)
  const [lift, setLift] = useState([0, 0, 0, 0, 0])
  const [apart, setApart] = useState(false)
  const still = useRef(false)
  const rows = useRef<(HTMLLIElement | null)[]>([])
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    still.current = matchMedia('(prefers-reduced-motion: reduce)').matches
    const mq = matchMedia('(min-width: 1024px)'); const on = () => setWide(mq.matches); on(); mq.addEventListener('change', on)
    setGl(canWebGL())
    return () => mq.removeEventListener('change', on)
  }, [])

  // entrance: the roof comes apart from the top down, one layer at a time
  useEffect(() => {
    if (!ready) return
    if (still.current) { setLift([1, 1, 1, 1, 1]); setApart(true); return }
    const timers = [4, 3, 2, 1, 0].map((layer, k) => setTimeout(() => setLift(l => l.map((v, i) => i === layer ? 1 : v)), 650 + k * 190))
    timers.push(setTimeout(() => setApart(true), 650 + 5 * 190 + 500))
    return () => timers.forEach(clearTimeout)
  }, [ready])

  const onAnchors = useCallback((pts: Anchor[]) => {
    const w = stage.current?.clientWidth ?? 0
    pts.forEach((p, i) => {
      const el = rows.current[i]; if (!el) return
      el.style.transform = `translate3d(0, ${p.y.toFixed(1)}px, 0)`
      el.style.setProperty('--lead', `${Math.max(0, w - p.x).toFixed(1)}px`)
    })
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <header className="bar">
        <a className="bar__name" href="./" aria-label={`${business.name}, home`}>Thermoset Roofing <span>Bahamas Ltd.</span></a>
        <nav className="bar__nav" aria-label="Sections">
          <a href="#systems">Roof systems</a><a href="#radar">Maintenance</a><a href="#clients">Clients</a>
        </nav>
        <div className="bar__act">
          <a className="bar__tel" href={business.office.href}>{business.office.label}</a>
          <a className="btn btn--small" href="#estimate">Free estimate</a>
        </div>
      </header>

      <h1 id="hero-title" className="hero__title">The roof,<br />layer<br className="wide-only" /> by layer.</h1>

      <div ref={stage} className={`hero__stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
        {gl && <Suspense fallback={null}><RoofScene className="hero__canvas" lift={lift} wide={wide} instant={still.current} onAnchors={wide ? onAnchors : undefined} onReady={() => setReady(true)} /></Suspense>}
      </div>

      <ol className={`callouts${apart ? ' is-on' : ''}`} reversed aria-label="The layers of a single-ply roof, top to bottom">
        {[...layers].reverse().map((l, k) => {
          const i = layers.length - 1 - k
          return (
            <li key={l.n} ref={el => { rows.current[i] = el }} style={{ transitionDelay: `${k * 70}ms` }}>
              <span className="callouts__n">{l.n}</span>
              <span className="callouts__name">{l.name}</span>
              {l.note && <span className="callouts__note">{l.note}</span>}
            </li>
          )
        })}
      </ol>

      <div className="hero__copy">
        <p>Thermoset installs, repairs and maintains roofs and waterproofing across New Providence and the surrounding islands. <span className="wide-only">Licensed, insured and factory certified on Carlisle, Elevate, Englert, Sika, Siplast and Tremco systems. </span>Bahamian owned, since 2002.</p>
        <div className="hero__act">
          <a className="btn" href="#estimate">{business.cta}</a>
          <a className="hero__tel" href={business.office.href}>or call {business.office.label}</a>
        </div>
      </div>

      <p className="hero__cue">Scroll to build it back, one layer at a time</p>
    </section>
  )
}
