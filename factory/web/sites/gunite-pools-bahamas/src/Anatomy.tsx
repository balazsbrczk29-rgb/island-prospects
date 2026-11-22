import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useScroll } from 'motion/react'

const AnatomyScene = lazy(() => import('./AnatomyScene'))

const STEPS = [
  { t: 'Design', d: 'We design it with you, or with your architect, structural engineer, designer or main contractor.' },
  { t: 'Dig and steel', d: 'The ground is excavated and a cage of steel is tied to the exact shape of the pool.' },
  { t: 'Gunite', d: 'Gunite, concrete sprayed at high pressure, is shot over the steel to form one seamless shell.' },
  { t: 'Tile, coping and finish', d: 'Waterline tile, coping and the interior finish go on.' },
  { t: 'Water', d: 'The plumbing and mechanical systems are tested, and the pool is filled.' },
]

const hasGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }

export function Anatomy() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  const [near, setNear] = useState(false)
  const [inView, setInView] = useState(false)
  const [gl, setGl] = useState(true)
  const [still, setStill] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', v => { const s = Math.min(4, Math.floor(v * 5)); setStep(p => (p === s ? p : s)) })
  useEffect(() => {
    setGl(hasGL()); setStill(matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = ref.current!
    const pre = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNear(true) }, { rootMargin: '800px 0px' })
    const vis = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    pre.observe(el); vis.observe(el)
    return () => { pre.disconnect(); vis.disconnect() }
  }, [])
  // reduced motion: show the finished section and every step
  const one = useMotionValue(1)

  return (
    <section ref={ref} id="build" className="anat" style={{ height: still ? 'auto' : '500svh' }} aria-labelledby="build-h">
      <div className="anat-stage wrap" style={still ? { position: 'relative', height: 'auto', padding: '96px var(--margin)' } : undefined}>
        <div className="anat-copy">
          <p className="cap muted">How a Gunite pool is built</p>
          <h2 id="build-h" className="h2">One seamless shell, built in five steps.</h2>
          <ol className="anat-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} data-on={still || i === step}>
                <span className="n cap num">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="t">{s.t}</span><span className="d">{s.d}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <div className="anat-canvas" aria-hidden="true">
          {gl && near && <Suspense fallback={null}><AnatomyScene progress={still ? one : scrollYProgress} active={inView} still={still} /></Suspense>}
        </div>
      </div>
    </section>
  )
}
