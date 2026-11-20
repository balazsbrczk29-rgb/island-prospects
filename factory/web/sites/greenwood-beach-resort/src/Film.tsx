import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react"
import { BOOK, WA, WHATSAPP, IMG, Photo, ease, type Img } from "./site"

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/* ---------- the opening shot: a letterboxed frame, type on the limestone bars ---------- */
export function Hero({ img, alt, title, children, actions }: { img: Img; alt: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, (v) => `${v * 6}%`)
  return (
    <section ref={ref} className="frame" aria-labelledby="hero-title">
      <div aria-hidden />
      <div className="relative min-h-[30svh] overflow-hidden md:min-h-[40svh]">
        <motion.div className="absolute inset-0" style={{ y: reduce ? 0 : y }}>
          <motion.div className="absolute inset-[-4%_0]" initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease }}>
            <Photo img={img} alt={alt} eager className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>
      <div className="grid gap-6 px-[var(--gutter)] pt-6 pb-[calc(80px+env(safe-area-inset-bottom))] md:grid-cols-12 md:gap-8 md:pt-9 md:pb-[76px]">
        <h1 id="hero-title" className="display text-[clamp(40px,5.4vw,84px)] md:col-span-7">
          <span className="-mb-[0.14em] block overflow-hidden pb-[0.2em]">
            <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 1.1, ease }}>{title}</motion.span>
          </span>
        </h1>
        <motion.div className="grid content-end gap-5 md:col-span-5 md:col-start-8" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.9, ease }}>
          {children}
          {actions}
        </motion.div>
      </div>
    </section>
  )
}

export function HomeHeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
      <a href={BOOK} className="btn">Check dates and book</a>
      <a href={WA} className="link num self-start text-[length:var(--t-sm)] sm:self-auto">WhatsApp {WHATSAPP}</a>
    </div>
  )
}

/* ---------- the film: pinned letterbox, scroll-scrubbed crossfade (A03 / M1) ---------- */
type Chapter = { word: string; img: Img; alt: string; lines: [string, string] }
export const CHAPTERS: Chapter[] = [
  { word: "Wind", img: IMG.kiteRide, alt: "A kitesurfer riding the surf off Cat Island under an orange kite", lines: ["Kitesurfing on Cat Island's steady wind and turquoise water.", "Diving and kitesurfing here are supervised by professionals."] },
  { word: "Deep blue", img: IMG.whitetipSurface, alt: "An oceanic whitetip shark just below the surface off Cat Island", lines: ["From March to June, oceanic whitetip sharks visit these waters.", "Guided boat dives, small groups, and respect for the animal."] },
  { word: "The reef", img: IMG.snorkel, alt: "Yellow grunts over a small coral reef in clear water", lines: ["A snorkel over a small reef, then a secluded beach.", "The island's only sea-accessible bat cave is reached by boat."] },
  { word: "Table", img: IMG.terrace, alt: "Greenwood's terrace restaurant with the beach and sea beyond the palms", lines: ["Breakfast eight to ten. Lunch noon to two. Dinner six to eight.", "Dinner is booked a day ahead, on the terrace by the beach."] },
  { word: "Night", img: IMG.roomFamily, alt: "The Executive Family Room at Greenwood, a king bed and louvred windows", lines: ["Two room types in the gardens, a few steps from the sand.", "Ceiling fans, cool tiled floors and garden light."] },
]

function Shot({ p, i, n, ch }: { p: MotionValue<number>; i: number; n: number; ch: Chapter }) {
  const reduce = useReducedMotion()
  const seg = 1 / n, f = 0.07, start = i * seg
  const opacity = useTransform(p, (v) => (i === 0 ? 1 : clamp((v - (start - f / 2)) / f)))
  const scale = useTransform(p, (v) => (reduce ? 1 : 1.09 - 0.09 * clamp((v - start + f) / (seg + f))))
  return (
    <motion.div className="absolute inset-0 will-change-[opacity]" style={{ opacity, zIndex: i }}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale }}>
        <Photo img={ch.img} alt={ch.alt} className="h-full w-full" />
      </motion.div>
    </motion.div>
  )
}

function Caption({ p, i, n, ch }: { p: MotionValue<number>; i: number; n: number; ch: Chapter }) {
  const seg = 1 / n, f = 0.045, start = i * seg, end = start + seg
  const opacity = useTransform(p, (v) => Math.min(i === 0 ? 1 : clamp((v - start) / f), i === n - 1 ? 1 : clamp((end - v) / f)))
  const y = useTransform(opacity, (o) => (1 - o) * 10)
  return (
    <motion.div className="absolute inset-0 grid content-start gap-3 px-[var(--gutter)] pt-6 md:grid-cols-12 md:items-start md:gap-8 md:pt-8" style={{ opacity, y }}>
      <p className="display text-[clamp(52px,8.4vw,124px)] leading-[0.9] md:col-span-6">{ch.word}</p>
      <p className="max-w-[34ch] text-[length:var(--t-base)] md:col-span-5 md:col-start-8 md:pt-3 md:text-[length:var(--t-lg)] md:leading-[1.45]">
        {ch.lines[0]} <span className="text-muted">{ch.lines[1]}</span>
      </p>
    </motion.div>
  )
}

export function FilmStage() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const n = CHAPTERS.length
  const bar = useTransform(scrollYProgress, (v) => v)
  return (
    <section ref={ref} id="film" data-stage aria-label="A day at Greenwood, in five scenes" className="relative" style={{ height: `${n * 90 + 20}svh` }}>
      <div className="frame sticky top-0 overflow-hidden">
        <div aria-hidden />
        <div className="relative overflow-hidden">
          {CHAPTERS.map((c, i) => <Shot key={c.word} p={scrollYProgress} i={i} n={n} ch={c} />)}
        </div>
        <div className="relative h-[36svh] md:h-[clamp(200px,27svh,260px)]">
          <motion.div aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-ink" style={{ scaleX: bar }} />
          {CHAPTERS.map((c, i) => <Caption key={c.word} p={scrollYProgress} i={i} n={n} ch={c} />)}
        </div>
      </div>
    </section>
  )
}
