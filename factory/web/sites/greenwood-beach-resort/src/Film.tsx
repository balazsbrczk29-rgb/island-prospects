import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react"
import { WA, WHATSAPP, IMG, Photo, ease, type Img } from "./site"

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/* ---------- inner-page opening shot: a letterboxed frame, type on the lower limestone bar ---------- */
export function Hero({ img, alt, title, children }: { img: Img; alt: string; title: ReactNode; children?: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <section className="frame" aria-labelledby="hero-title">
      <div aria-hidden />
      <div className="relative min-h-[30svh] overflow-hidden md:min-h-[40svh]">
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease }}>
          <Photo img={img} alt={alt} eager className="h-full w-full" />
        </motion.div>
      </div>
      <div className="grid gap-6 px-[var(--gutter)] pt-6 pb-[calc(124px+env(safe-area-inset-bottom))] md:grid-cols-12 md:gap-8 md:pt-9 md:pb-[76px]">
        <h1 id="hero-title" className="display text-[clamp(40px,5.4vw,84px)] md:col-span-7">
          <span className="-mb-[0.14em] block overflow-hidden pb-[0.2em]">
            <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 1.1, ease }}>{title}</motion.span>
          </span>
        </h1>
        <motion.div className="grid content-end gap-5 md:col-span-5 md:col-start-8" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.9, ease }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- home: ONE opening screen. Their beach and their hosts in the frame, "Port Howe" set in the lower bar ---------- */
export function HomeHero() {
  const reduce = useReducedMotion()
  return (
    <section className="frame" aria-labelledby="hero-title">
      <div aria-hidden />
      <div className="relative overflow-hidden">
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.8, ease }}>
          <Photo img={IMG.hosts} eager alt="Pauline and Antoine on Greenwood's white beach at Port Howe, the sea to the left and the old wooden shade above them" className="h-full w-full" />
        </motion.div>
      </div>
      <div className="grid gap-5 px-[var(--gutter)] pt-5 pb-[calc(132px+env(safe-area-inset-bottom))] md:h-[clamp(230px,30svh,290px)] md:grid-cols-12 md:gap-8 md:pt-7 md:pb-7">
        <h1 id="hero-title" className="leading-none text-[19vw] md:text-[clamp(96px,10.4vw,168px)] order-1 md:order-2 md:col-span-7 md:col-start-6 md:self-end md:text-right">
          <span className="block text-[length:var(--t-sm)] leading-[1.4] italic text-muted md:mb-1">Greenwood Beach Resort, Cat Island</span>
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <motion.span className="mono-word block whitespace-nowrap !text-[19vw] md:!text-[clamp(96px,10.4vw,168px)]" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease }}>Port Howe</motion.span>
          </span>
        </h1>
        <motion.div className="order-2 grid content-start gap-5 md:order-1 md:col-span-5" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.9, ease }}>
          <p className="max-w-[40ch] text-muted">Pauline and Antoine's small beachfront resort at the south end of Cat Island: two rooms in the garden, a kitchen by the sand, and the water for diving and kitesurfing.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <a href="#dates" className="btn">Check dates and book</a>
            <a href={WA} className="link num hidden self-start text-[length:var(--t-sm)] sm:inline sm:self-auto">WhatsApp {WHATSAPP}</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- the film: fixed limestone bars, the photo scales and pans with scroll (A03 / M1) ---------- */
type Chapter = { word: string; img: Img; alt: string; lines: [string, string]; pan: [number, number, number, number] }
export const CHAPTERS: Chapter[] = [
  { word: "Wind", img: IMG.kiteRide, alt: "A kitesurfer riding the open water off Cat Island under an orange kite", lines: ["Kitesurfing on Cat Island's steady wind and open turquoise water.", "Diving and kitesurfing here are supervised by professionals."], pan: [-3, 0, 3, -2] },
  { word: "Deep blue", img: IMG.whitetipSurface, alt: "An oceanic whitetip shark just below the surface off Cat Island", lines: ["From March to June, oceanic whitetip sharks visit these waters.", "Guided boat dives, small groups, and respect for the animal."], pan: [4, 2, -2, -2] },
  { word: "The reef", img: IMG.snorkel, alt: "Yellow grunts over a small coral reef in clear water", lines: ["A snorkel over a small reef, then a secluded beach.", "The island's only sea-accessible bat cave is reached by boat."], pan: [0, 3, 0, -3] },
  { word: "Table", img: IMG.terrace, alt: "Greenwood's terrace restaurant with the beach and sea beyond the palms", lines: ["Breakfast eight to ten. Lunch noon to two. Dinner six to eight.", "Dinner is booked a day ahead, on the terrace by the beach."], pan: [-3, -1, 3, 1] },
  { word: "Night", img: IMG.roomFamily, alt: "The Executive Family Room at Greenwood, a king bed and louvred windows", lines: ["Two room types in the gardens, a few steps from the sand.", "Ceiling fans, cool tiled floors and garden light."], pan: [2, -2, -2, 2] },
]

function local(v: number, i: number, n: number, f: number) { const seg = 1 / n; return clamp((v - i * seg + f) / (seg + 2 * f)) }

function Shot({ p, i, n, ch }: { p: MotionValue<number>; i: number; n: number; ch: Chapter }) {
  const reduce = useReducedMotion()
  const seg = 1 / n, f = 0.06, start = i * seg
  const opacity = useTransform(p, (v) => (i === 0 ? 1 : clamp((v - (start - f / 2)) / f)))
  const transform = useTransform(p, (v) => {
    if (reduce) return "none"
    const t = local(v, i, n, f), [x0, y0, x1, y1] = ch.pan
    const s = 1.18 - 0.1 * t
    return `translate3d(${x0 + (x1 - x0) * t}%, ${y0 + (y1 - y0) * t}%, 0) scale(${s})`
  })
  return (
    <motion.div className="absolute inset-0 will-change-[opacity]" style={{ opacity, zIndex: i }}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ transform }}>
        <Photo img={ch.img} alt={ch.alt} className="h-full w-full" />
      </motion.div>
    </motion.div>
  )
}

function useCaptionOpacity(p: MotionValue<number>, i: number, n: number) {
  const seg = 1 / n, f = 0.035, start = i * seg, end = start + seg
  return useTransform(p, (v) => Math.min(i === 0 ? 1 : clamp((v - start) / f), i === n - 1 ? 1 : clamp((end - v) / f)))
}

function Counter({ p, i, n, ch }: { p: MotionValue<number>; i: number; n: number; ch: Chapter }) {
  const opacity = useCaptionOpacity(p, i, n)
  return (
    <motion.p className="num absolute inset-0 flex items-center gap-4 text-[length:var(--t-sm)]" style={{ opacity }}>
      <span>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
      <span className="italic text-muted">{ch.word}</span>
    </motion.p>
  )
}

function Caption({ p, i, n, ch }: { p: MotionValue<number>; i: number; n: number; ch: Chapter }) {
  const opacity = useCaptionOpacity(p, i, n)
  const y = useTransform(opacity, (o) => (1 - o) * 8)
  return (
    <motion.div className="absolute inset-0 grid content-start gap-2 px-[var(--gutter)] pt-4 md:grid-cols-12 md:items-start md:gap-8 md:pt-0" style={{ opacity, y }}>
      <p className="display text-[clamp(44px,6.6vw,104px)] leading-[0.9] md:order-2 md:col-span-6 md:col-start-7 md:self-center md:text-right">{ch.word}</p>
      <p className="max-w-[46ch] text-[length:var(--t-sm)] leading-[1.45] md:order-1 md:col-span-6 md:max-w-[58ch] md:pt-6 md:text-[length:var(--t-base)]">
        {ch.lines[0]} <span className="text-muted">{ch.lines[1]}</span>
      </p>
    </motion.div>
  )
}

export function FilmStage() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const n = CHAPTERS.length
  return (
    <section ref={ref} id="film" data-stage aria-label="A day at Greenwood, in five scenes" className="relative" style={{ height: `${n * 120 + 40}svh` }}>
      <div className="sticky top-0 grid h-[100svh] grid-rows-[max(12svh,calc(var(--bar)+44px))_1fr_34svh] overflow-hidden md:grid-rows-[max(12svh,calc(var(--bar)+48px))_1fr_max(16svh,140px)]">
        <div className="relative">
          <div className="absolute inset-x-[var(--gutter)] bottom-0" style={{ top: "var(--bar)" }}>
            {CHAPTERS.map((c, i) => <Counter key={c.word} p={scrollYProgress} i={i} n={n} ch={c} />)}
          </div>
          <motion.div aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink" style={{ scaleX: scrollYProgress }} />
        </div>
        <div className="relative overflow-hidden">
          {CHAPTERS.map((c, i) => <Shot key={c.word} p={scrollYProgress} i={i} n={n} ch={c} />)}
        </div>
        <div className="relative">
          {CHAPTERS.map((c, i) => <Caption key={c.word} p={scrollYProgress} i={i} n={n} ch={c} />)}
        </div>
      </div>
    </section>
  )
}
