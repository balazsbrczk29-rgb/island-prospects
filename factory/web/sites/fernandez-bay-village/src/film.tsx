import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from 'motion/react'
import { BIZ, FILM, sq } from './data'

const N = FILM.length

function FrameImg({ i, p, reduce }: { i: number; p: MotionValue<number>; reduce: boolean | null }) {
  const f = FILM[i]
  // frames stack in order; each later frame fades in over the half-step before its stop and covers the one below
  const opacity = useTransform(p, v => i === 0 ? 1 : Math.min(1, Math.max(0, (v * (N - 1) - (i - 0.6)) / 0.5)))
  const scale = useTransform(p, v => reduce ? 1 : 1.02 + 0.07 * Math.min(1, Math.max(0, (v * (N - 1) - i + 0.6) / 1.6)))
  return (
    <motion.img className="frame-img" style={{ opacity, scale, objectPosition: f.pos }}
      src={sq(f.img, 2500)} srcSet={`${sq(f.img, 1000)} 1000w, ${sq(f.img, 1500)} 1500w, ${sq(f.img, 2500)} 2500w`} sizes="100vw"
      alt={f.alt} width={2500} height={1667} loading={i < 2 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} />
  )
}

export function Film() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [k, setK] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => { const n = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))); if (n !== k) setK(n) })
  const bar = useTransform(scrollYProgress, v => v)
  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    window.scrollTo({ top: top + (i / (N - 1)) * (el.offsetHeight - innerHeight) + 1, behavior: reduce ? 'auto' : 'smooth' })
  }
  useEffect(() => {
    const el = ref.current; if (!el) return
    const root = document.documentElement
    const io = new IntersectionObserver(([e]) => { root.style.setProperty('--concept-offset', e.isIntersecting ? 'calc(var(--bar-bottom) + 4px)' : '0px') }, { rootMargin: '0px 0px -40% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const f = FILM[k]
  return (
    <section ref={ref} className="film" data-stage aria-label="A day at Fernandez Bay Village" style={{ height: `${N * 72}svh` }}>
      <div className="film-pin">
        <header className="bar-top">
          <a className="name" href="./">Fernandez Bay Village</a>
          <nav className="chapters" aria-label="Chapters of the day">
            {FILM.slice(1).map((x, i) => (
              <button key={x.id} type="button" className={k === i + 1 ? 'on' : ''} onClick={() => go(i + 1)}>{x.chapter}</button>
            ))}
          </nav>
          <a className="top-book" href="stay.html">Cottages &amp; villas</a>
        </header>
        <div className="frame">
          {FILM.map((_, i) => <FrameImg key={i} i={i} p={scrollYProgress} reduce={reduce} />)}
          <motion.span className="frame-progress" style={{ scaleX: bar }} aria-hidden="true" />
        </div>
        <div className="bar-bottom">
          <div className="sub" aria-live="polite">
            {k === 0 && <h1 className="sub-h1">A beach view from every room<span className="sr-only">: Fernandez Bay Village, Cat Island, Bahamas</span></h1>}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={f.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: [0.22, 0.61, 0.24, 1] }}>
                {k > 0 && <p className="sub-k"><span className="num">{k}</span> {f.chapter}</p>}
                <p className="sub-line">{k === 0 ? 'On a mile of white sand in Fernandez Bay, Cat Island. Five minutes from New Bight airport.' : f.line}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="bar-acts">
            <a className="btn" href={BIZ.booking}>Check availability</a>
            <a className="wa" href={`https://wa.me/${BIZ.wa}`}>WhatsApp<span className="wa-us"> us</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
