import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react"
import { SCENES, type Scene } from "./content"
import { TopLine } from "./shell"

const N = SCENES.length - 1 // scroll units: one per scene after the title card
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t: number) => t * t * (3 - 2 * t)

/** One frame of the film: crossfades in as its scene arrives and drifts slowly while it is on screen. */
function Frame({ scene, i, p, phone }: { scene: Scene; i: number; p: MotionValue<number>; phone: boolean }) {
  const opacity = useTransform(p, v => (i === 0 ? 1 : ease(clamp((v * N - (i - 0.42)) / 0.42))))
  const scale = useTransform(p, v => 1.02 + 0.07 * clamp((v * N - (i - 0.42)) / 1.5))
  return (
    <motion.img
      className={i === 0 ? "first" : undefined}
      src={scene.img} alt={scene.alt}
      data-source={scene.generated ? "generated" : "commons"}
      style={{ opacity, scale, objectPosition: phone ? scene.posPhone : scene.pos, filter: scene.generated ? undefined : "saturate(.82) sepia(.14) brightness(1.04)" }}
      fetchPriority={i === 0 ? "high" : "auto"} decoding="async"
    />
  )
}

export default function Film() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [on, setOn] = useState(0)
  const [phone] = useState(() => typeof matchMedia !== "undefined" && matchMedia("(max-width: 760px)").matches)
  // discrete state only: the scene index changes six times over the whole film
  useMotionValueEvent(scrollYProgress, "change", v => { const k = clamp(Math.floor(v * N + 0.22), 0, N); if (k !== on) setOn(k) })
  const bar = useTransform(scrollYProgress, v => clamp(v))
  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (i / N) * (el.offsetHeight - innerHeight) + 2, behavior: "smooth" })
  }
  return (
    <section className="film" id="the-day" ref={ref} data-stage aria-label="One wedding day, scene by scene">
      <div className="film__stage">
        <TopLine home />
        <div className="film__title">
          <div className="film__titles">
            <h1 data-on={on === 0}>One wedding day on Paradise Island, <br className="br-wide" />played scene by scene.</h1>
            {SCENES.slice(1).map((s, k) => (
              <h2 key={s.roman} data-on={on === k + 1} aria-hidden={on !== k + 1}><span className="roman">{s.roman}.</span>{s.title}</h2>
            ))}
          </div>
          <a className="cta" href="#your-date">Ask about your date</a>
        </div>
        <div className="film__frame">
          {SCENES.map((s, i) => <Frame key={s.img} scene={s} i={i} p={scrollYProgress} phone={phone} />)}
          <span className="film__tag">{SCENES[on]?.generated ? "Illustrative photography, not the couple's own" : "Photograph: Wikimedia Commons"}</span>
        </div>
        <div className="film__foot">
          <motion.span className="film__progress" style={{ scaleX: bar }} aria-hidden />
          <div className="film__captions">
            {SCENES.map((s, i) => (
              <p key={s.img} data-on={on === i} aria-hidden={on !== i}>
                {s.caption}
              </p>
            ))}
          </div>
          <nav className="film__ticks" aria-label="Scenes">
            <span className="film__hint">{on === 0 ? "Scroll to play the day" : `Scene ${on} of ${N}`}</span>
            {SCENES.slice(1).map((s, k) => (
              <button key={s.roman} type="button" aria-label={`Scene ${s.roman}: ${s.title}`} aria-current={on === k + 1} onClick={() => go(k + 1)}>{s.roman}</button>
            ))}
          </nav>
          <a className="cta film__cta-phone" href="#your-date">Ask about your date</a>
        </div>
      </div>
    </section>
  )
}
