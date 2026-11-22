import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from 'motion/react'
import { FILM, sq } from './data'

const N = FILM.length
const clamp = (v: number) => Math.min(1, Math.max(0, v))

function FrameImg({ i, p, reduce }: { i: number; p: MotionValue<number>; reduce: boolean | null }) {
  const f = FILM[i]
  // each later frame fades in over the half step before its stop and covers the frame below (opacity and scale only)
  const opacity = useTransform(p, v => (i === 0 ? 1 : clamp((v * (N - 1) - (i - 0.55)) / 0.45)))
  const scale = useTransform(p, v => (reduce ? 1 : 1.04 - 0.04 * clamp((v * (N - 1) - i + 0.55) / 1.2)))
  const w = Math.min(f.w, 1500)
  return (
    <motion.img className="day-img" style={{ opacity, scale, objectPosition: f.pos }}
      src={sq(f.img, w)} srcSet={f.w > 1000 ? `${sq(f.img, 1000)} 1000w, ${sq(f.img, w)} ${w}w` : undefined} sizes="(max-width: 900px) 100vw, 75vw"
      alt={f.alt} width={w} height={Math.round((w * f.h) / f.w)} loading="lazy" />
  )
}

export function DayFilm() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [k, setK] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', v => { const n = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))); if (n !== k) setK(n) })
  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    window.scrollTo({ top: top + (i / (N - 1)) * (el.offsetHeight - innerHeight) + 2, behavior: reduce ? 'auto' : 'smooth' })
  }
  const f = FILM[k]
  return (
    <section id="day" ref={ref} className="day field" aria-labelledby="day-h" style={{ height: `${N * 65}svh` }}>
      <div className="day-pin">
        <div className="day-frame">
          {FILM.map((_, i) => <FrameImg key={i} i={i} p={scrollYProgress} reduce={reduce} />)}
        </div>
        <div className="day-side">
          <h2 id="day-h" className="h2">A day in the bay.</h2>
          <ol className="day-list" aria-label="Chapters of the day">
            {FILM.map((x, i) => (
              <li key={x.id}><button type="button" className={k === i ? 'on' : ''} aria-current={k === i ? 'step' : undefined} onClick={() => go(i)}><span className="num">{i + 1}</span>{x.chapter}</button></li>
            ))}
          </ol>
          <div className="day-cap" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={f.id} className="lead" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>{f.line}</motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
