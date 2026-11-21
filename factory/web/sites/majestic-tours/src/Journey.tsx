import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { PIC, PHONE, TEL, TOURS, tourUrl, type Place } from "./data"
import { Img, NAV, Wordmark, EnquiryForm, STOPS_FOR_FORM } from "./ui"

type Stop = { place: Place; tab: string; name: string; kicker: string; form: string; ask: string }
export const STOPS: Stop[] = [
  { place: "harbour", tab: "Harbour", name: "Nassau Harbour", kicker: "First, the harbour", form: STOPS_FOR_FORM[0], ask: "Ask about an evening sail" },
  { place: "lagoon", tab: "Blue Lagoon", name: "Blue Lagoon Island", kicker: "A short boat ride out", form: STOPS_FOR_FORM[1], ask: "Ask about Blue Lagoon" },
  { place: "rose", tab: "Rose Island", name: "Rose Island", kicker: "Uninhabited, off Paradise Island", form: STOPS_FOR_FORM[2], ask: "Ask about Rose Island" },
  { place: "reefs", tab: "Reefs", name: "The southwest reefs", kicker: "Below the surface", form: STOPS_FOR_FORM[3], ask: "Ask about a dive" },
  { place: "exuma", tab: "Exuma Cays", name: "The Exuma Cays", kicker: "Thirty-eight nautical miles out", form: STOPS_FOR_FORM[4], ask: "Ask about the Exumas" },
  { place: "harbourisland", tab: "Harbour Island", name: "Harbour Island", kicker: "As far as the day goes", form: STOPS_FOR_FORM[5], ask: "Ask about Harbour Island" },
]

const trips = (p: Place) => TOURS.filter(t => t.place === p)

function TripList({ place, max = 4 }: { place: Place; max?: number }) {
  const all = trips(place)
  return (
    <div>
      <ul className="border-t border-line">
        {all.slice(0, max).map(t => (
          <li key={t.id} className="border-b border-line">
            <a href={tourUrl(t.id)} target="_blank" rel="noopener" className="group flex min-h-12 items-center justify-between gap-4 py-2.5 no-underline">
              <span className="text-small leading-snug">{t.name}</span>
              <ArrowRight className="size-4 shrink-0 text-green transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      {all.length > max && <a href={`excursions.html?place=${place}`} className="link mt-1 text-cap text-muted">{all.length - max} more from here on the excursions page</a>}
    </div>
  )
}

/** The body of each stop: photograph(s), the place, the sourced fact and the real trips. */
function StopBody({ s, i, onAsk, phone = false }: { s: Stop; i: number; onAsk: (s: Stop) => void; phone?: boolean }) {
  const head = (
    <>
      <p className="text-small text-muted italic">{s.kicker}</p>
      <h2 className={`display mt-2 ${phone ? "text-[2.75rem]" : "text-[clamp(3.2rem,5.6vw,5.6rem)]"}`}>{s.name}</h2>
    </>
  )
  const ask = <button type="button" onClick={() => onAsk(s)} className="link mt-5 text-small text-green">{s.ask}<ArrowRight className="size-4" strokeWidth={1.5} aria-hidden /></button>
  const facts: Record<Place, ReactNode> = {
    harbour: <p>The Flying Cloud evening dinner sail picks up at <span className="tnum">5:00</span> PM on Cable Beach, <span className="tnum">5:15</span> downtown and <span className="tnum">5:30</span> on Paradise Island, then sails the harbour at dusk with a Bahamian barbecue buffet. <span className="tnum">$137.50</span> adult, <span className="tnum">$68.75</span> child under 11, taxes included.</p>,
    lagoon: <p>Dolphins, sea lions and a quiet beach day on Blue Lagoon Island, away from busy Nassau.</p>,
    rose: <p>The original swimming pigs at Sandy Toes, a private beach club, reef snorkelling and turtle watching. Half days if you do not want eight hours.</p>,
    reefs: <p>Walls, wrecks, film locations and the shark dive, with Stuart Cove's off the southwest of New Providence. Snorkellers and first-time divers welcome.</p>,
    exuma: <p><span className="tnum">55</span> minutes by offshore powerboat to Allan's Cay's iguanas and the pigs of Ship Channel Cay, with lunch, an open bar and the hotel transfer included. From <span className="tnum">$328.90</span> adult, <span className="tnum">$209.00</span> child under 12.</p>,
    harbourisland: <p>A full powerboat day to Harbour Island, Eleuthera: the Pink Sands Beach, swimming pigs and turtles.</p>,
    land: <p />,
  }
  const fact = <div className="mt-5 max-w-[34rem] text-body leading-relaxed">{facts[s.place]}</div>

  if (phone) {
    const pic = { harbour: PIC.seahorse, lagoon: PIC.lagoon, rose: PIC.rosePano, reefs: PIC.wall, exuma: PIC.powerboat, harbourisland: PIC.pinkSand, land: PIC.culture }[s.place]
    return (
      <article className="flex h-full flex-col">
        <Img pic={pic} className="w-full" style={pic.w < 400 ? { width: Math.min(pic.w, 300) } : undefined} />
        <div className="mt-5">{head}{fact}<div className="mt-5"><TripList place={s.place} max={3} /></div>{ask}</div>
      </article>
    )
  }

  const H = (pic: { h: number }, cap = 9999) => ({ height: `min(var(--fh), ${Math.min(pic.h, cap)}px)`, width: "auto" })
  switch (s.place) {
    case "harbour":
      return (
        <article className="grid h-full grid-cols-[auto_minmax(0,1fr)] items-center gap-[4vw]">
          <Img pic={PIC.seahorse} style={H(PIC.seahorse, 540)} />
          <div>{head}{fact}<div className="mt-6 max-w-[34rem]"><TripList place="harbour" /></div>{ask}</div>
        </article>
      )
    case "lagoon":
      return (
        <article className="grid h-full grid-cols-[minmax(0,24rem)_auto] items-center gap-[3.5vw]">
          <div><p className="text-small text-muted italic">{s.kicker}</p><h2 className="display mt-2 text-[clamp(3rem,4.6vw,4.6rem)]">{s.name}</h2>{fact}<div className="mt-6"><TripList place="lagoon" /></div>{ask}</div>
          <div className="relative">
            <Img pic={PIC.lagoon} style={H(PIC.lagoon)} />
            <figure className="absolute bottom-8 -left-[5.5rem] w-[min(16vw,240px)] border-[6px] border-trim">
              <Img pic={PIC.dolphin} className="w-full" />
            </figure>
          </div>
        </article>
      )
    case "rose":
      return (
        <article className="flex h-full flex-col justify-center">
          <Img pic={PIC.rosePano} className="w-full" />
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[4vw]">
            <div>{head}{fact}{ask}</div>
            <div className="pt-2"><TripList place="rose" /></div>
          </div>
        </article>
      )
    case "reefs":
      return (
        <article className="flex h-full flex-col justify-center">
          <p className="text-small text-muted italic">{s.kicker}</p>
          <h2 className="display mt-2 text-[clamp(4.5rem,8.4vw,8.6rem)] leading-[0.86]">The southwest<br />reefs</h2>
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-start gap-[3.5vw]">
            <div>{fact}{ask}</div>
            <TripList place="reefs" max={4} />
            <figure>
              <Img pic={PIC.wall} className="w-[min(350px,22vw)]" />
              <figcaption className="mt-3 max-w-[min(350px,22vw)] text-cap text-muted italic">A wall dive with Stuart Cove's, booked through Majestic.</figcaption>
            </figure>
          </div>
        </article>
      )
    case "exuma":
      return (
        <article className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-[4vw]">
          <div>
            <p className="display tnum text-[clamp(7rem,13vw,12.5rem)] leading-[0.8] text-green" aria-hidden>38<span className="text-[0.32em] tracking-[-0.01em]"> nm</span></p>
            <h2 className="display mt-5 text-[clamp(3rem,4.6vw,4.6rem)]">{s.name}</h2>
            {fact}{ask}
          </div>
          <div className="grid grid-cols-[auto_auto] items-end gap-5">
            <div className="flex flex-col"><Img pic={PIC.powerboat} style={H(PIC.powerboat, 400)} /><div className="mt-5 w-0 min-w-full"><TripList place="exuma" max={3} /></div></div>
            <Img pic={PIC.pig} style={{ height: "min(calc(var(--fh) * 0.62), 440px)", width: "auto" }} className="mb-[3.2rem]" />
          </div>
        </article>
      )
    case "harbourisland":
      return (
        <article className="grid h-full grid-cols-[auto_minmax(0,1fr)] items-center gap-[5vw]">
          <Img pic={PIC.pinkSand} className="w-[min(285px,18vw)]" />
          <div><p className="text-small text-muted italic">{s.kicker}</p><h2 className="display mt-2 text-[clamp(5rem,10.5vw,10.5rem)] leading-[0.84]">Harbour<br />Island</h2>{fact}<div className="mt-6 max-w-[34rem]"><TripList place="harbourisland" /></div>{ask}</div>
        </article>
      )
    default:
      return null
  }
}

/** The passage line at the top of each stop: how the boat gets there, sourced or plainly true. */
const PASSAGE: Partial<Record<Place, string>> = {
  harbour: "Pickups from 5:00 PM on Cable Beach, 5:15 downtown, 5:30 on Paradise Island",
  lagoon: "Out past Paradise Island, to the cay with the dolphins",
  rose: "Off the shores of Nassau and Paradise Island, uninhabited",
  reefs: "Southwest New Providence, with Stuart Cove's",
  exuma: "38 nautical miles, 55 minutes by offshore powerboat",
  harbourisland: "A full powerboat day, across to Eleuthera",
}
function Passage({ place }: { place: Place }) {
  const strong = place === "exuma"
  return (
    <div className="flex items-center gap-4" aria-hidden={false}>
      <span className={`h-px w-16 ${strong ? "bg-green" : "bg-ink/40"}`} />
      <p className={`tnum text-small italic ${strong ? "text-green" : "text-muted"}`}>{PASSAGE[place]}</p>
      <span className="h-px flex-1 border-t border-dashed border-ink/25" />
    </div>
  )
}

/** The title frame: the first screen of the journey. */
function Title({ onPlan }: { onPlan: () => void }) {
  return (
    <div className="relative flex h-full flex-col bg-field">
      <header className="flex items-center justify-between gap-6 px-[var(--pad)] pt-7">
        <Wordmark />
        <nav aria-label="Main" className="flex items-center gap-8">
          {NAV.map(n => <a key={n.href} href={n.href} className="py-3 text-small no-underline hover:text-green">{n.label}</a>)}
        </nav>
        <a href={TEL} className="tnum text-small no-underline hover:text-green">{PHONE}</a>
      </header>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_auto] items-end gap-[4vw] px-[var(--pad)] pb-[min(7vh,60px)]">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="display text-[clamp(5rem,14vw,15rem)] leading-[0.88]">
            Out of<br />Nassau.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.9 }}>
            <p className="mt-10 max-w-[32ch] text-lead leading-snug">Sails, islands, reefs and airport transfers, from the Bahamian family company that has met Nassau's guests since 1959.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
              <button type="button" onClick={onPlan} className="btn">Plan my excursion</button>
              <a href={TEL} className="link tnum text-small"><Phone className="size-4" strokeWidth={1.5} aria-hidden />Call {PHONE}</a>
            </div>
          </motion.div>
        </div>
        <motion.figure initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.2, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="w-[min(41vw,600px,calc((100svh-var(--tl)-260px)*1.43))]">
          <Img pic={PIC.flyingCloud} className="w-full" eager />
          <figcaption className="mt-3 text-cap text-muted italic">The Flying Cloud leaving Nassau Harbour at sunset, Atlantis on the horizon.</figcaption>
          <p className="mt-6 flex items-center gap-2 text-small italic">Scroll, and the boat leaves the harbour <ArrowRight className="size-4 text-green" strokeWidth={1.5} aria-hidden /></p>
        </motion.figure>
      </div>
    </div>
  )
}

function Book({ where, setWhere }: { where: string; setWhere: (v: string) => void }) {
  return (
    <div id="book-desktop" className="grid h-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[5vw] bg-field px-[var(--pad)]">
      <div>
        <p className="text-small text-muted italic">The last stop is the one you choose</p>
        <h2 className="display mt-2 text-[clamp(4rem,7.4vw,7.4rem)]">Where to?</h2>
        <p className="mt-6 max-w-[30ch] text-lead leading-snug">Tell us the day and where you are staying. A Majestic agent writes back with times and the pickup.</p>
        <a href={TEL} className="tnum mt-8 block font-display text-[2.6rem] leading-none tracking-[-0.02em] no-underline hover:text-green">{PHONE}</a>
        <p className="mt-2 text-cap text-muted italic">The tour line, or the Majestic desk in your hotel lobby.</p>
      </div>
      <div className="max-w-[40rem] border border-ink/15 bg-ground p-8">
        <EnquiryForm where={where} onWhere={setWhere} idp="d" />
      </div>
    </div>
  )
}

/** Desktop: pinned, vertical scroll moves the row sideways. Widths in vw. */
const W = [100, 96, 108, 92, 96, 104, 80, 100]

function Timeline({ p, marks, active, go }: { p: MotionValue<number>; marks: number[]; active: number; go: (i: number) => void }) {
  const labels = ["Depart", ...STOPS.map(s => s.tab), "Book"]
  return (
    <nav aria-label="The journey" className="absolute inset-x-0 bottom-0 z-10 h-[var(--tl)] border-t border-line bg-ground px-[var(--pad)]">
      <div className="relative mx-auto h-full">
        <div className="absolute inset-x-0 top-[22px] h-px bg-line" />
        <motion.div className="absolute inset-x-0 top-[22px] h-[2px] origin-left bg-green" style={{ scaleX: p }} />
        {marks.map((m, i) => (
          <button key={i} type="button" onClick={() => go(i)} aria-current={active === i ? "step" : undefined}
            className="group absolute top-0 flex h-full flex-col items-center gap-2 px-2 pt-[17px]" style={{ left: `${m * 100}%`, transform: `translateX(${i === 0 ? "0" : i === marks.length - 1 ? "-100%" : "-50%"})` }}>
            <span className={`block size-3 rounded-full border-2 transition-colors duration-300 ${active >= i ? "border-green bg-green" : "border-line bg-ground group-hover:border-green"}`} />
            <span className={`text-cap whitespace-nowrap transition-colors duration-300 ${i === 5 ? "tnum" : ""} ${active === i ? "text-ink" : "text-muted group-hover:text-ink"}`}>{labels[i]}{i === 5 ? ", 38 nm" : ""}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export function JourneyDesktop({ where, setWhere }: { where: string; setWhere: (v: string) => void }) {
  const ref = useRef<HTMLElement>(null)
  const total = W.reduce((a, b) => a + b, 0)
  const travel = total - 100
  const starts = useMemo(() => W.map((_, i) => W.slice(0, i).reduce((a, b) => a + b, 0)), [])
  const marks = starts.map(s => Math.min(1, s / travel))
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(p, v => `${-v * travel}vw`)
  const [active, setActive] = useState(0)
  useMotionValueEvent(p, "change", v => {
    let a = 0
    marks.forEach((m, i) => { if (v >= m - 0.035) a = i })
    if (a !== active) setActive(a)
  })
  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + marks[i] * (el.offsetHeight - window.innerHeight)
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis
    if (lenis) lenis.scrollTo(y, { duration: 1.6 }); else window.scrollTo({ top: y, behavior: "smooth" })
  }
  const ask = (s: Stop) => { setWhere(s.form); go(W.length - 1) }
  useEffect(() => {
    const h = () => { if (location.hash === "#book") go(W.length - 1) }
    h(); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section ref={ref} data-stage aria-label="Where the day goes, from Nassau Harbour to Harbour Island" className="relative hidden md:block" style={{ height: `calc(100svh + ${travel}vw)` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="flex h-[calc(100svh-var(--tl))] will-change-transform" style={{ x, width: `${total}vw` }}>
          <div style={{ width: "100vw" }} className="h-full shrink-0"><Title onPlan={() => go(W.length - 1)} /></div>
          {STOPS.map((s, i) => (
            <div key={s.place} style={{ width: `${W[i + 1]}vw` }} className="flex h-full shrink-0 flex-col pt-[min(5vh,44px)] pb-[min(4.5vh,40px)] pl-[var(--pad)]">
              <Passage place={s.place} />
              <div className="min-h-0 flex-1 pt-[min(4vh,36px)] pr-[5vw]"><StopBody s={s} i={i} onAsk={ask} /></div>
            </div>
          ))}
          <div style={{ width: "100vw" }} className="h-full shrink-0"><Book where={where} setWhere={setWhere} /></div>
        </motion.div>
        <Timeline p={p} marks={marks} active={active} go={go} />
      </div>
    </section>
  )
}

/** Phone: the title, then a native swipe through the stops with a synced stop rail, then the booking card. */
export function JourneyPhone({ where, setWhere }: { where: string; setWhere: (v: string) => void }) {
  const track = useRef<HTMLUListElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)
  const onScroll = () => {
    const el = track.current; if (!el) return
    const i = Math.round(el.scrollLeft / (el.firstElementChild as HTMLElement).offsetWidth)
    if (i !== cur) { setCur(i); (rail.current?.children[i] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }) }
  }
  const goTo = (i: number) => { const el = track.current; if (el) el.scrollTo({ left: i * (el.firstElementChild as HTMLElement).offsetWidth, behavior: "smooth" }) }
  const ask = (s: Stop) => { setWhere(s.form); document.getElementById("book-phone")?.scrollIntoView({ behavior: "smooth" }) }
  useEffect(() => { const h = (e: Event) => goTo((e as CustomEvent<number>).detail); window.addEventListener("mt-stop", h); return () => window.removeEventListener("mt-stop", h) })
  return (
    <div className="md:hidden">
      <section className="bg-field pb-10">
        <header className="flex items-center justify-between px-5 pt-5">
          <Wordmark />
          <a href={TEL} className="grid size-11 place-items-center" aria-label={`Call ${PHONE}`}><Phone className="size-5" strokeWidth={1.5} aria-hidden /></a>
        </header>
        <div className="px-5 pt-8">
          <h1 className="display text-[clamp(4.2rem,21vw,5.6rem)] leading-[0.9]">Out of<br />Nassau.</h1>
          <p className="mt-6 text-[1.2rem] leading-snug">Sails, islands, reefs and airport transfers, from the Bahamian family company that has met Nassau's guests since 1959.</p>
          <div className="mt-6 flex flex-col items-start gap-1">
            <a href="#book-phone" className="btn w-full">Plan my excursion</a>
            <a href={TEL} className="link tnum text-small"><Phone className="size-4" strokeWidth={1.5} aria-hidden />Call {PHONE}</a>
          </div>
        </div>
        <nav aria-label="Where the day goes" className="mt-5 border-t border-ink/15 pt-4">
          <p className="px-5 text-cap text-muted italic">Where the boat goes</p>
          <ol className="mt-1 flex gap-1 overflow-x-auto px-3 [scrollbar-width:none]">
            {STOPS.map((s, i) => (
              <li key={s.place} className="flex shrink-0 items-center">
                <a href="#stops" onClick={() => setTimeout(() => window.dispatchEvent(new CustomEvent("mt-stop", { detail: i })), 0)} className="flex min-h-11 items-center px-2 text-small whitespace-nowrap no-underline">{s.tab}{s.place === "exuma" ? <span className="tnum ml-1 text-green">38 nm</span> : null}</a>
                {i < STOPS.length - 1 && <span className="h-px w-4 bg-ink/30" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        <figure className="mt-5 px-5">
          <Img pic={PIC.flyingCloud} className="w-full" eager />
          <figcaption className="mt-2 text-cap text-muted italic">The Flying Cloud leaving Nassau Harbour at sunset.</figcaption>
        </figure>
      </section>
      <section id="stops" aria-label="Where the day goes" className="scroll-mt-4 pt-10 pb-6">
        <p className="px-5 text-small text-muted italic">Swipe, and the boat leaves the harbour</p>
        <div ref={rail} className="mt-3 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none]" role="tablist" aria-label="Stops">
          {STOPS.map((s, i) => (
            <button key={s.place} role="tab" aria-selected={cur === i} type="button" onClick={() => goTo(i)} className={`min-h-11 shrink-0 border-b-2 px-3 text-small whitespace-nowrap transition-colors ${cur === i ? "border-green text-ink" : "border-transparent text-muted"}`}>{s.tab}</button>
          ))}
        </div>
        <ul ref={track} onScroll={onScroll} className="mt-5 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]">
          {STOPS.map((s, i) => (
            <li key={s.place} className="w-screen shrink-0 snap-start px-5"><StopBody s={s} i={i} onAsk={ask} phone /></li>
          ))}
        </ul>
      </section>
      <section id="book-phone" className="bg-field px-5 pt-12 pb-14"><span id="book" className="block" />
        <h2 className="display text-[3.4rem]">Where to?</h2>
        <p className="mt-4 text-body leading-snug">Tell us the day and where you are staying. A Majestic agent writes back with times and the pickup.</p>
        <div className="mt-7"><EnquiryForm where={where} onWhere={setWhere} compact idp="m" /></div>
      </section>
    </div>
  )
}
