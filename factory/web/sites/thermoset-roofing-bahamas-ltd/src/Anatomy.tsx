// The first screen and the scroll stage are one pinned scene: the hero shows the roof hanging apart over the
// building, then six chapters lower it into place, and the last screen lets the visitor change the roof system.
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { business, layers, systems, pitched } from './data'
import { CH } from './stage'
import type { Anchor, SceneApi } from './RoofScene'

const RoofScene = lazy(() => import('./RoofScene'))
const clamp = (x: number) => Math.max(0, Math.min(1, x))
const ss = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t) }

function canWebGL() { try { const c = document.createElement('canvas'); return !!c.getContext('webgl2') } catch { return false } }

export default function Anatomy() {
  const section = useRef<HTMLElement>(null), hero = useRef<HTMLDivElement>(null), stage = useRef<HTMLDivElement>(null)
  const progress = useRef(0), api = useRef<SceneApi | null>(null)
  const rows = useRef<(HTMLLIElement | null)[]>([])
  const [gl, setGl] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)
  const [wide, setWide] = useState(true)
  const [still, setStill] = useState(false)
  const [labels, setLabels] = useState(false)
  const [chapter, setChapter] = useState(-1)       // -1 hero, 0..5 the layers, 6 the system picker
  const [finish, setFinish] = useState(0)

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    setStill(matchMedia('(prefers-reduced-motion: reduce)').matches || q.has('still'))
    const mq = matchMedia('(min-width: 1024px)'); const on = () => setWide(mq.matches); on(); mq.addEventListener('change', on)
    setGl(canWebGL())
    const scroll = () => {
      const el = section.current; if (!el) return
      const r = el.getBoundingClientRect(), p = q.has('p') ? +q.get('p')! : clamp(-r.top / Math.max(1, r.height - innerHeight))
      progress.current = p; api.current?.invalidate()
      if (hero.current) { const o = 1 - ss(0.02, 0.075, p); hero.current.style.opacity = String(o); hero.current.style.visibility = o < 0.01 ? 'hidden' : 'visible' }
      let c = -1; for (let i = 0; i < CH.length; i++) if (p >= CH[i] - 0.012) c = i
      setChapter(c)
    }
    scroll(); addEventListener('scroll', scroll, { passive: true }); addEventListener('resize', scroll)
    return () => { mq.removeEventListener('change', on); removeEventListener('scroll', scroll); removeEventListener('resize', scroll) }
  }, [])
  useEffect(() => { if (!ready) return; const t = setTimeout(() => setLabels(true), still ? 0 : 1900); return () => clearTimeout(t) }, [ready, still])

  const onAnchors = useCallback((pts: Anchor[]) => {
    const w = stage.current?.clientWidth ?? 0
    pts.forEach((p, i) => { const el = rows.current[i]; if (!el) return; el.style.transform = `translate3d(0, ${p.y.toFixed(1)}px, 0)`; el.style.setProperty('--lead', `${Math.max(0, w - p.x).toFixed(1)}px`) })
  }, [])
  const go = (i: number) => {
    const el = section.current; if (!el) return
    const p = i >= 6 ? 0.93 : CH[i] + 0.085
    scrollTo({ top: el.offsetTop + p * (el.offsetHeight - innerHeight), behavior: still ? 'auto' : 'smooth' })
  }

  return (
    <section ref={section} id="build-up" className="anatomy" aria-label="How a Thermoset roof is built">
      <div className="anatomy__pin">
        <div ref={stage} className={`anatomy__stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
          <picture className="anatomy__poster">
            <source media="(max-width: 1023px)" srcSet="./poster-tall.jpg" />
            <img src="./poster-wide.jpg" alt="" />
          </picture>
          {gl && <Suspense fallback={null}><RoofScene className="anatomy__canvas" progress={progress} finish={finish} still={still} api={api} onAnchors={wide ? onAnchors : undefined} onReady={() => setReady(true)} /></Suspense>}
        </div>

        {/* ---------- first screen ---------- */}
        <div ref={hero} className="hero">
          <ol className={`callouts${labels && chapter < 0 ? ' is-on' : ''}`} reversed aria-label="The layers of a single-ply roof, top to bottom">
            {[...layers].reverse().map((l, k) => {
              const i = layers.length - 1 - k
              return (
                <li key={l.n} ref={el => { rows.current[i] = el }} style={{ transitionDelay: `${k * 70}ms` }}>
                  <span className="callouts__n">{l.n}</span><span className="callouts__name">{l.name}</span>
                  {l.note && <span className="callouts__note">{l.note}</span>}
                </li>
              )
            })}
          </ol>
          <div className="hero__text">
          <h2 className="hero__title">How a Thermoset <br className="wide-only" />flat roof <br className="wide-only" />goes on.</h2>
          <div className="hero__copy">
            <p>A single-ply roof, from the deck up: what each layer is for, and which part of the work Thermoset does. The building is a 3D model made for this page.</p>
            <div className="hero__act">
              <a className="btn" href="#request">{business.cta}</a>
              <a className="hero__tel" href={business.office.href}>or call {business.office.label}</a>
            </div>
          </div>
          </div>
          <p className="hero__cue">Scroll, and the roof goes on one layer at a time</p>
        </div>

        {/* ---------- the six layers ---------- */}
        <ol className="chapters" aria-label="A single-ply roof, from the deck up">
          {layers.map((l, i) => (
            <li key={l.n} className={chapter === i ? 'is-on' : ''}>
              <span className="chapters__n">{l.n}</span>
              <h2>{l.name}</h2>
              <p>{l.body}</p>
            </li>
          ))}
        </ol>
        <nav className={`rail${chapter >= 0 && chapter < 6 ? ' is-on' : ''}`} aria-label="Roof layers">
          {layers.map((l, i) => <button key={l.n} type="button" className={chapter === i ? 'is-on' : chapter > i ? 'is-done' : ''} onClick={() => go(i)}><span>{l.n}</span>{l.name}</button>)}
          <button type="button" className={chapter === 6 ? 'is-on' : ''} onClick={() => go(6)}><span>+</span>Change the system</button>
        </nav>

        {/* ---------- the system picker ---------- */}
        <div className={`picker${chapter === 6 ? ' is-on' : ''}`}>
          <h2>The same roof, four ways to finish it.</h2>
          <div className="picker__opts" role="radiogroup" aria-label="Roof system">
            {systems.map((s, i) => (
              <button key={s.name} type="button" role="radio" aria-checked={finish === i} className={finish === i ? 'is-on' : ''} onClick={() => setFinish(i)} tabIndex={chapter === 6 ? 0 : -1}>
                <strong>{s.name}</strong><span>{s.kind}</span>
              </button>
            ))}
          </div>
          <p className="picker__line" aria-live="polite">{systems[finish].line}</p>
          <p className="picker__note">{pitched}</p>
        </div>
      </div>
    </section>
  )
}
