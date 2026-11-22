import { StrictMode, useEffect, useRef, useState } from "react"
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

/** The fixed index column: the ten rooms as a register (with a filter), then the sections, then the footer line. */
const FILTERS = [["all", "All ten"], ["ocean", "Ocean view"], ["balcony", "Balcony"], ["king", "King bed"]] as const
type F = typeof FILTERS[number][0]
const fits = (r: Room, f: F) => f === "all" || (f === "balcony" ? r.balcony : f === "king" ? r.king : r.view.startsWith("Ocean"))
const countLine = (f: F) => { const n = ROOMS.filter(r => fits(r, f)).length; return f === "all" ? "Ten rooms, all with a fridge and microwave" : f === "ocean" ? `${n} rooms look straight at the ocean` : f === "balcony" ? `${n} rooms with a balcony` : `${n} rooms with a king bed` }
const ask = (r: Room) => `mailto:${EMAIL}?subject=${encodeURIComponent(`${r.name} room`)}&body=${encodeURIComponent(`Hello Ocean West,\n\nI would like to stay in ${r.name}. My dates are:\nGuests:\n\nThank you.`)}`
const FACTS = "$215 to $600 a night · 5 minutes from the airport"
type Tool = { sel: number; setSel: (i: number) => void; f: F; setF: (f: F) => void }
const chooseFilter = (t: Tool, k: F) => { t.setF(k); if (t.sel >= 0 && !fits(ROOMS[t.sel], k)) t.setSel(ROOMS.findIndex(r => fits(r, k))) }
function Filters({ t, className = "" }: { t: Tool; className?: string }) {
  return (
    <div className={className}>
      <div className="flex gap-x-4 overflow-x-auto [scrollbar-width:none]" role="group" aria-label="Filter rooms">
        {FILTERS.map(([k, l]) => <button key={k} type="button" aria-pressed={t.f === k} onClick={() => chooseFilter(t, k)} className={`min-h-11 min-w-11 shrink-0 text-left text-cap transition-colors ${t.f === k ? "text-ink underline decoration-rose underline-offset-4" : "text-muted-2 hover:text-ink"}`}>{l}</button>)}
      </div>
      <p className="tnum text-cap text-muted-2" aria-live="polite">{countLine(t.f)}</p>
    </div>
  )
}

function Index({ t }: { t: Tool }) {
  const { sel, setSel, f } = t
  const pick = (i: number) => { setSel(i); const s = document.getElementById("stage"); if (s && s.getBoundingClientRect().top < -40) s.scrollIntoView({ behavior: "smooth" }) }
  return (
    <aside className="sticky top-0 hidden h-svh flex-col border-r border-line px-[var(--pad)] pt-7 pb-[84px] lg:flex" aria-label="Ocean West">
      <a href="index.html" className="inline-flex min-h-11 items-center self-start no-underline">
        <span className="font-display text-[1.5rem] leading-none">Ocean West</span>
      </a>
      <p className="label text-muted">Ten rooms on West Bay Street, Nassau</p>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease }} className="mt-[min(3vh,26px)] max-w-[12ch] text-[clamp(2.3rem,3.45vw,3.3rem)] leading-[1.02]">Seventy feet above the sea.</motion.h1>
      <p className="tnum mt-2 text-small">{FACTS}</p>
      <Filters t={t} className="mt-[min(2.2vh,20px)]" />
      <nav aria-label="The rooms" className="mt-1">
        <ol className="border-t border-line">
          {ROOMS.map((r, i) => {
            const on = fits(r, f)
            return (
              <li key={r.key} className="relative">
                <span className={`absolute top-1/2 -left-[calc(var(--pad)-6px)] h-px w-[calc(var(--pad)-14px)] bg-rose transition-transform duration-300 origin-left ${sel === i ? "scale-x-100" : "scale-x-0"}`} aria-hidden />
                <button type="button" onMouseEnter={() => on && setSel(i)} onFocus={() => setSel(i)} onClick={() => pick(i)} aria-pressed={sel === i} tabIndex={on ? 0 : -1}
                  className={`group flex h-[clamp(30px,3.6vh,38px)] w-full items-center justify-between gap-4 border-b border-line text-left transition-opacity duration-300 ${on ? "opacity-100" : "opacity-30"}`}>
                  <span className={`font-display text-[clamp(1.35rem,1.95vw,1.85rem)] leading-none transition-colors duration-300 ${sel === i ? "text-rose" : "group-hover:text-rose"}`}>{r.name}</span>
                  <span className="tnum shrink-0 text-cap text-muted">{short(r)}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
      <nav aria-label="Sections" className="mt-auto flex flex-wrap gap-x-4 pt-3">
        {SECTIONS.map(([id, l]) => <a key={id} href={`#${id}`} className="tlink text-small">{l}</a>)}
      </nav>
      <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-4">
        <a href={TEL} className="tnum text-small no-underline hover:text-rose">{PHONE}</a>
        <a href={BOOK} target="_blank" rel="noopener" className="book">Check dates</a>
      </div>
    </aside>
  )
}

/** The stage: the chosen room, or the terrace before anything is chosen. */
function Stage({ t }: { t: Tool }) {
  const { sel, setSel, f } = t
  const r = sel >= 0 ? ROOMS[sel] : null
  const pic = r ? r.pic : PIC.terrace
  const rail = useRef<HTMLDivElement>(null)
  useEffect(() => { if (sel >= 0) (rail.current?.children[sel + 1] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }) }, [sel])
  return (
    <section id="stage" aria-label="The rooms, one at a time" className="relative bg-conch lg:min-h-svh lg:px-[var(--pad)] lg:pt-[clamp(110px,15vh,150px)] lg:pb-14">
      {/* phone header + title (the index column is hidden on phones) */}
      <div className="px-5 pt-5 lg:hidden">
        <div className="flex items-center justify-between">
          <a href="index.html" className="inline-flex min-h-11 items-center font-display text-[1.45rem] no-underline">Ocean West</a>
          <a href={BOOK} target="_blank" rel="noopener" className="book min-h-11 px-4">Check dates</a>
        </div>
        <p className="label mt-5 text-muted-2">Ten rooms on West Bay Street, Nassau</p>
        <p className="mt-3 font-display text-[2.6rem] leading-[1.04]">Seventy feet above the sea.</p>
        <p className="tnum mt-2 text-small">{FACTS}</p>
        <Filters t={t} className="mt-3" />
      </div>
      {/* phone: the register collapses into a chip row */}
      <div ref={rail} className="mt-2 flex snap-x scroll-px-5 gap-5 overflow-x-auto border-y border-line px-5 py-1 [scrollbar-width:none] lg:hidden" role="group" aria-label="Choose a room">
        <button type="button" aria-pressed={sel === -1} onClick={() => setSel(-1)} className={`min-h-12 shrink-0 snap-start border-b-2 font-display text-[1.6rem] leading-none transition-colors ${sel === -1 ? "border-rose text-rose" : "border-transparent"}`}>Terrace</button>
        {ROOMS.map((x, i) => (
          <button key={x.key} type="button" aria-pressed={sel === i} onClick={() => setSel(i)} className={`min-h-12 shrink-0 snap-start border-b-2 font-display text-[1.6rem] leading-none transition-[color,opacity] ${sel === i ? "border-rose text-rose" : "border-transparent"} ${fits(x, f) ? "" : "opacity-30"}`}>{x.name}</button>
        ))}
      </div>
      <div className="w-full px-5 pt-4 lg:px-0 lg:pt-0">
        <div className="relative mx-auto w-full lg:w-[min(704px,calc((100svh-clamp(110px,15vh,150px)-150px)*1.333))]" style={{ aspectRatio: "4 / 3" }}>
          <AnimatePresence initial={false}>
            <motion.img key={pic.src} src={pic.src} alt={pic.alt} width={pic.w} height={pic.h}
              initial={{ opacity: 0, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}
              className="absolute inset-0 h-full w-full bg-conch-2 object-cover" />
          </AnimatePresence>
        </div>
        <div className="mx-auto mt-5 flex min-h-[88px] w-full flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:w-[min(704px,calc((100svh-clamp(110px,15vh,150px)-150px)*1.333))]" aria-live="polite">
          <div>
            <p className="font-display text-[clamp(1.9rem,2.8vw,2.6rem)] leading-none">{r ? r.name : "The terrace"}</p>
            <p className="tnum mt-2 text-small text-muted-2">{r ? [r.bed, floorName(r.floor), r.view, r.note].filter(Boolean).join(" · ") : "Ten rooms, a pool on the terrace, the sea beyond the balustrade. Choose a room."}</p>
          </div>
          {r && <div className="flex flex-wrap items-center gap-x-6">
            <a href={BOOK} target="_blank" rel="noopener" className="book">Check dates for {r.name}</a>
            <a href={ask(r)} className="tlink text-small text-shutter">Ask about {r.name}</a>
          </div>}
        </div>
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

function Compare({ t }: { t: Tool }) {
  const pick = (i: number) => { t.setSel(i); document.getElementById("stage")?.scrollIntoView({ behavior: "smooth" }) }
  return (
    <section id="rooms" aria-labelledby="rooms-h" className="border-t border-line px-[var(--pad)] py-[clamp(72px,10vw,140px)]">
      <p className="label text-muted">All ten, side by side</p>
      <h2 id="rooms-h" className="mt-4 max-w-[18ch] text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">Three with a balcony. Seven straight at the sea.</h2>
      <p className="mt-5 max-w-[40rem] text-body text-muted">Every room has a fridge, a microwave, cable TV, a hair dryer and free Wi-Fi. Single or double occupancy, children under 12 free.</p>
      <table className="mt-10 w-full max-w-[1000px] border-collapse text-left">
        <thead className="max-md:sr-only"><tr className="border-b border-line text-cap text-muted">{["Room", "Bed", "Floor", "View", "Outside", ""].map((h, i) => <th key={i} scope="col" className="py-3 pr-4 font-normal">{h}</th>)}</tr></thead>
        <tbody>
          {ROOMS.map((r, i) => (
            <tr key={r.key} className={`border-b border-line transition-colors max-md:grid max-md:grid-cols-[1fr_auto] max-md:py-3 ${t.sel === i ? "bg-conch-2" : ""}`}>
              <th scope="row" className="py-3 pr-4 font-normal max-md:py-0"><button type="button" onClick={() => pick(i)} className="min-h-11 font-display text-[1.6rem] leading-none hover:text-rose" aria-label={`Show ${r.name} above`}>{r.name}</button></th>
              <td className="tnum py-3 pr-4 text-small max-md:order-3 max-md:col-span-2 max-md:py-0">{r.bed}<span className="md:hidden"> · {floorName(r.floor)} · {r.view}{r.balcony ? " · balcony" : ""}</span></td>
              <td className="tnum py-3 pr-4 text-small max-md:hidden">{floorName(r.floor)}</td>
              <td className="py-3 pr-4 text-small max-md:hidden">{r.view}</td>
              <td className="py-3 pr-4 text-small max-md:hidden">{r.balcony ? "Balcony" : "None"}</td>
              <td className="py-3 text-right max-md:py-0"><a href={BOOK} target="_blank" rel="noopener" className="tlink text-small text-rose">Check dates<span className="sr-only"> for {r.name}</span></a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="rooms.html" className="tlink mt-6 text-small text-shutter">All ten rooms, photographed<ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
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
      <p className="label text-shell-2">Five minutes from the airport</p>
      <h2 id="arrive-h" className="mt-4 max-w-[18ch] text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05]">Windsor Field Road, Blake Road, right on West Bay Street.</h2>
      <ol className="mt-10 max-w-[920px] border-t border-shell/20">
        {["Leave Lynden Pindling International on Windsor Field Road.", "Turn onto Blake Road.", "Turn right onto West Bay Street.", "Ocean West is on your right."].map((s, i) => (
          <li key={s} className="grid grid-cols-[3rem_minmax(0,1fr)] border-b border-shell/20 py-4"><span className="tnum font-display text-[1.4rem] text-conch">{i + 1}</span><span className="text-body">{s}</span></li>
        ))}
      </ol>
      <div className="mt-14 grid max-w-[920px] gap-10 md:grid-cols-2">
        <div>
          <p className="font-display text-[2rem] leading-none">Ocean West</p>
          <p className="mt-3 text-small text-shell-2">Boutique Hotel and Vacation Rental<br />West Bay Street, western New Providence<br />Nassau, The Bahamas</p>
        </div>
        <div className="text-small">
          <a href={TEL} className="tnum flex min-h-11 items-center gap-2 no-underline hover:text-conch"><Phone className="size-4" strokeWidth={1.5} aria-hidden />{PHONE}</a>
          <a href={TEL2} className="tnum flex min-h-11 items-center pl-6 no-underline hover:text-conch">{PHONE2}</a>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Room enquiry")}`} className="flex min-h-11 items-center pl-6 no-underline hover:text-conch">{EMAIL}</a>
          <a href={BOOK} target="_blank" rel="noopener" className="book mt-4">Check dates</a>
        </div>
      </div>
      <p className="mt-16 text-cap text-shell-2">Photographs from oceanwestbahamas.com. Travellers' Choice 2023 on Tripadvisor; Clean and Pristine certified by the Bahamas Ministry of Tourism.</p>
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
  const [f, setF] = useState<F>("all")
  const t: Tool = { sel, setSel, f, setF }
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <main id="main" className="lg:grid lg:grid-cols-[var(--idx)_minmax(0,1fr)]">
        <Index t={t} />
        <div>
          <Stage t={t} />
          <Ridge />
          <Compare t={t} />
          <Days />
          <Rates />
          <Arrive />
        </div>
      </main>
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
