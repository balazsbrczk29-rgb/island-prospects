import { StrictMode, useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, motion } from "motion/react"
import Lenis from "lenis"
import { ArrowUpRight, Phone } from "lucide-react"
import { BOOK, EMAIL, PHONE, PHONE2, TEL, TEL2, PIC, ROOMS, floorName, type Pic, type Room } from "./data"
import "./styles.css"

const ease = [0.22, 1, 0.36, 1] as const

function Photo({ pic, className = "", eager = false, maxW }: { pic: Pic; className?: string; eager?: boolean; maxW?: number }) {
  return (
    <div className={`pic ${className}`} style={{ aspectRatio: `${pic.w} / ${pic.h}`, maxWidth: Math.min(pic.w, maxW ?? pic.w) }}>
      <img src={pic.src} alt={pic.alt} width={pic.w} height={pic.h} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  )
}

const SECTIONS = [["ridge", "The ridge"], ["rooms", "The rooms"], ["days", "Days here"], ["rates", "Rates"], ["arrive", "Getting here"]] as const
const short = (r: Room) => `${["", "1st", "2nd", "3rd"][r.floor]} · ${r.ocean ? (r.view.startsWith("Lake") ? "Lake and sea" : "Sea") : "Garden"}`

/** The fixed index column: the ten rooms as a register, then the sections, then the footer line. */
function Index({ sel, setSel }: { sel: number; setSel: (i: number) => void }) {
  const pick = (i: number) => { setSel(i); const s = document.getElementById("stage"); if (s && s.getBoundingClientRect().top < -40) s.scrollIntoView({ behavior: "smooth" }) }
  return (
    <aside className="sticky top-0 hidden h-svh flex-col border-r border-line px-[var(--pad)] pt-8 pb-[84px] lg:flex" aria-label="Ocean West">
      <a href="index.html" className="inline-flex min-h-11 items-center gap-3 self-start no-underline">
        <span className="font-display text-[1.55rem] leading-none">Ocean West</span>
      </a>
      <p className="label mt-1 text-muted">Ten rooms on West Bay Street, Nassau</p>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease }} className="mt-[min(4vh,36px)] max-w-[14ch] text-[clamp(1.9rem,2.5vw,2.5rem)] leading-[1.08]">Ten rooms on a ridge, seventy feet above the sea.</motion.h1>
      <nav aria-label="The rooms" className="mt-[min(4vh,36px)]">
        <ol className="border-t border-line">
          {ROOMS.map((r, i) => (
            <li key={r.key}>
              <button type="button" onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={() => pick(i)} aria-pressed={sel === i}
                className="group flex h-[clamp(30px,3.9vh,38px)] w-full items-baseline justify-between gap-4 border-b border-line text-left">
                <span className={`font-display text-[clamp(1.2rem,1.65vw,1.6rem)] leading-none transition-colors duration-300 ${sel === i ? "text-rose" : "group-hover:text-rose"}`}>
                  <span className={`mr-2 inline-block size-1.5 rounded-full bg-rose align-middle transition-opacity duration-300 ${sel === i ? "opacity-100" : "opacity-0"}`} aria-hidden />{r.name}
                </span>
                <span className="tnum shrink-0 text-cap text-muted">{short(r)}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <nav aria-label="Sections" className="mt-auto flex flex-wrap gap-x-4 pt-4">
        {SECTIONS.map(([id, l]) => <a key={id} href={`#${id}`} className="tlink text-small">{l}</a>)}
      </nav>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-5">
        <a href={TEL} className="tnum text-small no-underline hover:text-rose">{PHONE}</a>
        <a href={BOOK} target="_blank" rel="noopener" className="book">Check dates</a>
      </div>
    </aside>
  )
}

/** The stage: the chosen room, or the terrace before anything is chosen. */
function Stage({ sel, setSel }: { sel: number; setSel: (i: number) => void }) {
  const r = sel >= 0 ? ROOMS[sel] : null
  const pic = r ? r.pic : PIC.terrace
  const rail = useRef<HTMLDivElement>(null)
  useEffect(() => { if (sel >= 0) (rail.current?.children[sel] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }) }, [sel])
  return (
    <section id="stage" aria-label="The rooms, one at a time" className="relative bg-conch lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:px-[var(--pad)] lg:py-14">
      {/* phone header + title (the index column is hidden on phones) */}
      <div className="px-5 pt-5 lg:hidden">
        <div className="flex items-center justify-between">
          <a href="index.html" className="inline-flex min-h-11 items-center font-display text-[1.45rem] no-underline">Ocean West</a>
          <a href={BOOK} target="_blank" rel="noopener" className="book min-h-11 px-4">Check dates</a>
        </div>
        <p className="label mt-5 text-muted">Ten rooms on West Bay Street, Nassau</p>
        <p className="mt-3 font-display text-[2.35rem] leading-[1.06]">Ten rooms on a ridge, seventy feet above the sea.</p>
      </div>
      <div className="mx-auto w-full max-w-[920px] px-5 pt-6 lg:px-0 lg:pt-0">
        <div className="relative w-full" style={{ aspectRatio: r ? "4 / 3" : `${PIC.terrace.w} / ${PIC.terrace.h}`, maxWidth: r ? 800 : 920, transition: "max-width .6s cubic-bezier(.22,1,.36,1)" }}>
          <AnimatePresence initial={false}>
            <motion.img key={pic.src} src={pic.src} alt={pic.alt} width={pic.w} height={pic.h}
              initial={{ opacity: 0, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}
              className="absolute inset-0 h-full w-full bg-conch-2 object-cover" />
          </AnimatePresence>
        </div>
        <div className="mt-5 flex min-h-[88px] flex-wrap items-end justify-between gap-x-8 gap-y-3" style={{ maxWidth: r ? 800 : 920 }} aria-live="polite">
          <div>
            <p className="font-display text-[clamp(1.9rem,2.8vw,2.6rem)] leading-none">{r ? r.name : "The terrace"}</p>
            <p className="tnum mt-2 text-small text-muted">{r ? [r.bed, floorName(r.floor), r.view, r.note].filter(Boolean).join(" · ") : "Ten rooms, a pool on the terrace, the sea beyond the balustrade. Choose a room."}</p>
          </div>
          <a href={BOOK} target="_blank" rel="noopener" className="tlink text-small text-rose">{r ? `Check dates for ${r.name}` : "Check dates"}<ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
        </div>
      </div>
      {/* phone: the register collapses into a chip row */}
      <div ref={rail} className="mt-4 flex gap-1 overflow-x-auto px-4 pb-6 [scrollbar-width:none] lg:hidden" role="group" aria-label="Choose a room">
        {ROOMS.map((x, i) => (
          <button key={x.key} type="button" aria-pressed={sel === i} onClick={() => setSel(i)} className={`min-h-11 shrink-0 border px-4 font-display text-[1.1rem] transition-colors ${sel === i ? "border-rose bg-rose text-white" : "border-ink/20"}`}>{x.name}</button>
        ))}
      </div>
    </section>
  )
}

function Ridge() {
  return (
    <section id="ridge" aria-labelledby="ridge-h" className="px-[var(--pad)] py-[clamp(72px,10vw,140px)]">
      <p className="label text-muted">Seventy feet above sea level</p>
      <h2 id="ridge-h" className="mt-4 max-w-[18ch] text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">Lake Killarney to the south. The Atlantic to the north.</h2>
      <Photo pic={PIC.viewDown} className="mt-10 w-full" maxW={920} />
      <div className="mt-8 grid max-w-[920px] gap-x-10 gap-y-4 md:grid-cols-2">
        <p className="text-body">The hotel stands on a ridge in western New Providence, with views of the lake on one side and the ocean on the other. Access is for hotel guests only.</p>
        <p className="text-body">Lynden Pindling International is a five minute drive. The Cable Beach strip, with its restaurants and casino, is a few minutes east.</p>
      </div>
    </section>
  )
}

function Compare({ sel, setSel }: { sel: number; setSel: (i: number) => void }) {
  const [f, setF] = useState<"all" | "balcony" | "king" | "ocean">("all")
  const list = useMemo(() => ROOMS.map((r, i) => ({ r, i })).filter(({ r }) => f === "all" || (f === "balcony" ? r.balcony : f === "king" ? r.king : r.view.startsWith("Ocean"))), [f])
  const show = (i: number) => { setSel(i); document.getElementById("stage")?.scrollIntoView({ behavior: "smooth" }) }
  const FILTERS = [["all", "All ten"], ["ocean", "Ocean view"], ["balcony", "Balcony"], ["king", "King bed"]] as const
  return (
    <section id="rooms" aria-labelledby="rooms-h" className="border-t border-line px-[var(--pad)] py-[clamp(72px,10vw,140px)]">
      <p className="label text-muted">Every room has a fridge and a microwave</p>
      <h2 id="rooms-h" className="mt-4 text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">Ten rooms, compared.</h2>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter rooms">
        {FILTERS.map(([k, l]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)} className={`min-h-11 border px-4 text-small transition-colors duration-200 ${f === k ? "border-ink bg-ink text-shell" : "border-ink/20 hover:border-ink/50"}`}>{l}</button>)}
      </div>
      <motion.ul layout className="mt-8 max-w-[920px] border-t border-line">
        <AnimatePresence initial={false}>
          {list.map(({ r, i }) => (
            <motion.li key={r.key} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="border-b border-line">
              <button type="button" onClick={() => show(i)} className="group grid min-h-16 w-full grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto] items-baseline gap-4 py-4 text-left max-sm:grid-cols-[minmax(0,1fr)_auto]">
                <span className={`font-display text-[1.6rem] leading-none transition-colors ${sel === i ? "text-rose" : "group-hover:text-rose"}`}>{r.name}</span>
                <span className="tnum text-small text-muted max-sm:col-span-2 max-sm:row-start-2">{[r.bed, floorName(r.floor), r.view, r.note].filter(Boolean).join(" · ")}</span>
                <span className="text-cap text-shutter max-sm:col-start-2 max-sm:row-start-1">See it</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <a href="rooms.html" className="tlink mt-6 text-small text-shutter">Every room, photographed<ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
    </section>
  )
}

function Days() {
  const items = ["The outdoor pool on the terrace", "A rooftop gym with an ocean view", "A massage suite on the third floor, by appointment", "Indoor and outdoor bars, and a pool table", "Breakfast a la carte, traditional or Bahamian", "Sapodilla, the fine dining restaurant on the eastern side", "Daily maid service and a 24-hour front desk", "Free Wi-Fi, cable TV and free parking", "Airport and island transport, at a surcharge"]
  return (
    <section id="days" aria-labelledby="days-h" className="bg-conch-2 px-[var(--pad)] py-[clamp(72px,10vw,140px)]">
      <p className="label text-muted">Days here</p>
      <h2 id="days-h" className="mt-4 max-w-[16ch] text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">The pool at sunset, the gym on the roof.</h2>
      <Photo pic={PIC.sunsetPool} className="mt-10 w-full" maxW={920} />
      <ul className="mt-10 grid max-w-[920px] gap-x-10 md:grid-cols-2">
        {items.map(t => <li key={t} className="border-b border-line py-3.5 text-body">{t}</li>)}
      </ul>
    </section>
  )
}

function Rates() {
  const rows: [string, string][] = [["Nightly", "$215 to $600, single or double occupancy"], ["Children", "Under 12 stay free"], ["Check-in", "3:00 PM"], ["Check-out", "11:00 AM; late check-out to 2:00 PM, $30"], ["Extra bed", "Rollaway $100 a night"], ["House rules", "Non-smoking. No pets."], ["Longer stays", "Extended stay rates on request"]]
  return (
    <section id="rates" aria-labelledby="rates-h" className="px-[var(--pad)] py-[clamp(72px,10vw,140px)]">
      <p className="label text-muted">Rates vary by season and holiday</p>
      <h2 id="rates-h" className="tnum mt-4 text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">From $215 a night.</h2>
      <dl className="mt-10 max-w-[920px] border-t border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[10rem_minmax(0,1fr)] gap-4 border-b border-line py-4 max-sm:grid-cols-1 max-sm:gap-1">
            <dt className="text-small text-muted">{k}</dt><dd className="tnum m-0 text-body">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a href={BOOK} target="_blank" rel="noopener" className="book">Check dates</a>
        <p className="max-w-[28rem] text-cap text-muted">Booking online? Bring the card you booked with and a government ID to check-in.</p>
      </div>
    </section>
  )
}

function Arrive() {
  return (
    <section id="arrive" aria-labelledby="arrive-h" className="bg-ink px-[var(--pad)] py-[clamp(72px,10vw,140px)] text-shell">
      <p className="label text-shell/70">Five minutes from the airport</p>
      <h2 id="arrive-h" className="mt-4 max-w-[18ch] text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">Windsor Field Road, Blake Road, right on West Bay Street.</h2>
      <ol className="mt-10 max-w-[920px] border-t border-shell/20">
        {["Leave Lynden Pindling International on Windsor Field Road.", "Turn onto Blake Road.", "Turn right onto West Bay Street.", "Ocean West is on your right."].map((s, i) => (
          <li key={s} className="grid grid-cols-[3rem_minmax(0,1fr)] border-b border-shell/20 py-4"><span className="tnum font-display text-[1.4rem] text-conch">{i + 1}</span><span className="text-body">{s}</span></li>
        ))}
      </ol>
      <div className="mt-14 grid max-w-[920px] gap-10 md:grid-cols-2">
        <div>
          <p className="font-display text-[2rem] leading-none">Ocean West</p>
          <p className="mt-3 text-small text-shell/75">Boutique Hotel and Vacation Rental<br />West Bay Street, western New Providence<br />Nassau, The Bahamas</p>
        </div>
        <div className="text-small">
          <a href={TEL} className="tnum flex min-h-11 items-center gap-2 no-underline hover:text-conch"><Phone className="size-4" strokeWidth={1.5} aria-hidden />{PHONE}</a>
          <a href={TEL2} className="tnum flex min-h-11 items-center pl-6 no-underline hover:text-conch">{PHONE2}</a>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Room enquiry")}`} className="flex min-h-11 items-center pl-6 no-underline hover:text-conch">{EMAIL}</a>
          <a href={BOOK} target="_blank" rel="noopener" className="book mt-4">Check dates</a>
        </div>
      </div>
      <p className="mt-16 text-cap text-shell/55">Photographs from oceanwestbahamas.com. Travellers' Choice 2023 on Tripadvisor; Clean and Pristine certified by the Bahamas Ministry of Tourism.</p>
    </section>
  )
}

function useLenis() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const l = new Lenis({ duration: 1.1 }); let id = 0
    const f = (t: number) => { l.raf(t); id = requestAnimationFrame(f) }; id = requestAnimationFrame(f)
    return () => { cancelAnimationFrame(id); l.destroy() }
  }, [])
}

function Home() {
  useLenis()
  const [sel, setSel] = useState(-1)
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <div className="lg:grid lg:grid-cols-[var(--idx)_minmax(0,1fr)]">
        <Index sel={sel} setSel={setSel} />
        <main id="main">
          <Stage sel={sel} setSel={setSel} />
          <Ridge />
          <Compare sel={sel} setSel={setSel} />
          <Days />
          <Rates />
          <Arrive />
        </main>
      </div>
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
