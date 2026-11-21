import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, type MotionValue } from 'motion/react'
import { IMG, biz, chapters } from './data'

const N = chapters.length
const clamp = (v: number) => Math.max(0, Math.min(1, v))

function Frame({ i, p }: { i: number; p: MotionValue<number> }) {
  const c = chapters[i]
  // hold each photograph, crossfade into the next; slow push-in while it holds
  const o = useTransform(p, v => (i === 0 || v * (N - 1) >= i ? 1 : clamp(1.6 - (i - v * (N - 1)) * 2.2)))
  const s = useTransform(p, v => 1.07 - 0.07 * clamp((v * (N - 1) - (i - 0.6)) / 1.6))
  return (
    <motion.div className="film__img" style={{ opacity: o, scale: s, zIndex: i }}>
      <img src={IMG + c.img} alt={c.alt} data-source="generated" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} width={1920} height={1080} />
    </motion.div>
  )
}

export default function Film() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [ch, setCh] = useState(0)
  useMotionValueEvent(p, 'change', v => { const c = Math.min(N - 1, Math.round(v * (N - 1))); setCh(o => (o === c ? o : c)) })
  const c = chapters[ch]
  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (i / (N - 1)) * (el.offsetHeight - window.innerHeight) + 2, behavior: 'smooth' })
  }
  return (
    <section ref={ref} className="film" data-stage aria-label="A day of protection, hour by hour">
      <div className="film__pin">
        <div className="film__frame">
          {chapters.map((_, i) => <Frame key={i} i={i} p={p} />)}
        </div>
        <div className="band">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={c.t} className="clock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {c.t.slice(0, 2)}<span className="c">:</span>{c.t.slice(3)}<small>{c.when}</small>
            </motion.div>
          </AnimatePresence>
          <div className="sub" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={c.t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                {ch === 0 ? <h1>{c.h}</h1> : <h2>{c.h}</h2>}
                <p>{c.p}</p>
              </motion.div>
            </AnimatePresence>
            <div className="acts">
              <a className="btn btn-brass" href={`tel:${biz.phones[0].tel}`}>Call {biz.phones[0].label}</a>
              <a className="link" href="#proposal">Request a security proposal</a>
            </div>
          </div>
          <ol className="ticks" aria-label="Hours">
            {chapters.map((x, i) => <li key={x.t}><button type="button" aria-current={i === ch} onClick={() => go(i)}>{x.t}</button></li>)}
          </ol>
        </div>
      </div>
    </section>
  )
}
