import { useEffect, useState } from "react"
import { ArrowRight, Phone, Plus } from "lucide-react"
import { motion } from "motion/react"
import { PIC, PHONE, TEL, OFFICE, OFFICE_TEL } from "./data"
import { Img } from "./ui"

const ease = [0.16, 1, 0.3, 1] as const
const rise = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-12% 0px" }, transition: { duration: 0.9, ease } }

const AWARDS: [string, string, string][] = [
  ["1991", "Award of Distinction", "Air Canada"],
  ["2003", "Transfer Company of the Year", "Expedia"],
  ["2003 to 2011", "Outstanding Customer Service", "Thomas Cook Worldwide"],
  ["2005", "Tour Operator of the Year", "Cacique Awards"],
  ["2013", "Quality Assurance Award", "MLT Vacations"],
]

export function Story() {
  return (
    <section id="story" aria-labelledby="story-h" className="scroll-mt-0 bg-green-deep px-[var(--pad)] py-[clamp(80px,12vw,160px)] text-ground">
      <div className="grid gap-x-[6vw] gap-y-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <motion.div {...rise}>
          <p className="text-small text-ground/70 italic">Since June 1959</p>
          <h2 id="story-h" className="display mt-4 text-[clamp(3rem,5.6vw,5.8rem)] leading-[0.92]">Founded by Bill and Iris Saunders, in June 1959.</h2>
          <p className="mt-10 max-w-[36rem] text-lead leading-snug text-ground/90">The motto has not changed: Service is our Profession. Majestic still meets guests off the plane and puts them on the right boat. Representatives speak Spanish, French, German, Italian, Portuguese and Swiss German, and the family's sister companies plan Out Island holidays and travel across the islands.</p>
        </motion.div>
        <motion.div {...rise} transition={{ ...rise.transition, delay: 0.12 }} className="md:pt-24">
          <p className="text-small text-ground/70 italic">What the travel industry has said</p>
          <ul className="mt-4 border-t border-ground/25">
            {AWARDS.map(([y, a, by]) => (
              <li key={a} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-ground/25 py-4">
                <span className="tnum text-small text-ground/70">{y}</span>
                <span><span className="block font-display text-[1.45rem] leading-tight">{a}</span><span className="text-small text-ground/70 italic">{by}</span></span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-cap text-ground/70">Member of ASTA, CHA and IATA.</p>
        </motion.div>
      </div>
    </section>
  )
}

export function Arrival() {
  const lines: [string, string][] = [
    ["Shared bus", "A shuttle that stops at three or four hotels on the way, on arrival and departure."],
    ["Private car", "Town cars, limousines and SUVs, with your name on the sign outside Customs."],
    ["Accessible van", "The only private transport for disabled guests on the island. Arrange it 48 hours ahead."],
    ["Going home", "US Immigration is precleared in Nassau, and your pickup time allows for it."],
  ]
  return (
    <section aria-labelledby="arr-h" className="px-[var(--pad)] py-[clamp(80px,11vw,150px)]">
      <div className="grid items-end gap-x-[5vw] gap-y-10 md:grid-cols-[auto_minmax(0,1fr)]">
        <motion.figure {...rise} className="w-full md:w-[min(560px,40vw)]">
          <Img pic={PIC.fleet} className="w-full" />
          <figcaption className="mt-3 text-cap text-muted italic">Part of the Majestic fleet: vans, buses, town cars and SUVs.</figcaption>
        </motion.figure>
        <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
          <p className="text-small text-muted italic">Before the boats, the airport</p>
          <h2 id="arr-h" className="display mt-3 text-[clamp(2.8rem,5.4vw,5.4rem)]">Look for the Majestic sign after Customs.</h2>
          <p className="mt-6 max-w-[34rem] text-body">Book transfers at least five days ahead. A representative waits at Ground Transportation at Lynden Pindling International.</p>
        </motion.div>
      </div>
      <dl className="mt-16 grid gap-x-[4vw] border-t border-line md:grid-cols-2">
        {lines.map(([t, d]) => (
          <div key={t} className="grid grid-cols-[10rem_minmax(0,1fr)] gap-4 border-b border-line py-5 max-sm:grid-cols-1 max-sm:gap-1">
            <dt className="font-display text-[1.45rem] leading-tight">{t}</dt>
            <dd className="m-0 text-small text-muted">{d}</dd>
          </div>
        ))}
      </dl>
      <a href="transfers.html" className="link mt-8 text-small text-green">How each transfer works, step by step<ArrowRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
    </section>
  )
}

const DESKS = ["Atlantis, Coral Tower", "Atlantis, Beach Tower", "RIU Paradise Island", "Warwick Paradise Island", "Comfort Suites Paradise Island", "Margaritaville Beach Resort", "Courtyard by Marriott", "Melia Nassau Beach"]

export function Desks() {
  return (
    <section id="desks" aria-labelledby="desk-h" className="scroll-mt-0 bg-field px-[var(--pad)] py-[clamp(80px,11vw,150px)]">
      <p className="text-small text-muted italic">Downstairs, in the lobby</p>
      <h2 id="desk-h" className="display mt-3 max-w-[16ch] text-[clamp(2.8rem,5.4vw,5.4rem)]">There is a Majestic desk where you are staying.</h2>
      <ul className="mt-12 flex flex-wrap items-baseline max-sm:flex-col gap-x-5 gap-y-2 font-display text-[clamp(1.6rem,2.7vw,2.6rem)] leading-tight tracking-[-0.015em]">
        {DESKS.map((d, i) => <li key={d} className="flex items-baseline gap-5">{d}{i < DESKS.length - 1 && <span className="text-green max-sm:hidden" aria-hidden>·</span>}</li>)}
      </ul>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a href={TEL} className="link tnum text-small"><Phone className="size-4" strokeWidth={1.5} aria-hidden />Tours {PHONE}</a>
        <a href={OFFICE_TEL} className="link tnum text-small">Head office {OFFICE}</a>
        <p className="text-cap text-muted italic">Call the head office to confirm the desk at your hotel.</p>
      </div>
    </section>
  )
}

const FAQ: [string, string][] = [
  ["How do I book a Majestic tour?", "Send your plan with the form above, call the tour line on (242) 677-2600, or visit the Majestic desk in your hotel lobby."],
  ["Does the tour include a hotel pickup?", "It depends on the tour. The Fantastic Exuma Day Trip includes the hotel transfer; the Flying Cloud evening dinner sail lists pickups from Cable Beach, downtown and Paradise Island. Each tour page says which."],
  ["How far ahead should I book an airport transfer?", "Majestic asks that transportation bookings are finalised at least 5 days ahead, and accessible transport at least 48 hours ahead."],
  ["Do I clear US Immigration in Nassau?", "Yes. Flights to the United States clear US Immigration and Customs in Nassau, and departure pickup times allow for it."],
  ["Which languages do your representatives speak?", "Besides English: Spanish, French, German, Italian, Portuguese and Swiss German."],
]

export function Faq() {
  return (
    <section aria-labelledby="faq-h" className="grid gap-x-[6vw] gap-y-10 px-[var(--pad)] py-[clamp(80px,10vw,140px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <h2 id="faq-h" className="display text-[clamp(2.6rem,4.4vw,4.4rem)]">Before you go</h2>
      <div className="border-t border-line">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group border-b border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[1.4rem] leading-snug [&::-webkit-details-marker]:hidden">
              {q}<Plus className="size-5 shrink-0 text-green transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} aria-hidden />
            </summary>
            <p className="max-w-[40rem] pb-6 text-body text-muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** Desktop: a small corner action once the title frame has gone. Phone: a call + plan bar, hidden on the first screen and over the forms. */
export function FloatingActions({ planHref = "#book" }: { planHref?: string }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hide = new Set<Element>()
    const targets = ["book-desktop", "book-phone", "site-footer", "page-form"].map(id => document.getElementById(id)).filter(Boolean) as Element[]
    let past = false
    const update = () => setShow(past && hide.size === 0)
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? hide.add(e.target) : hide.delete(e.target)); update() }, { threshold: 0.15 })
    targets.forEach(t => io.observe(t))
    const onScroll = () => { const p = window.scrollY > window.innerHeight * 0.85; if (p !== past) { past = p; update() } }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll) }
  }, [])
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    document.documentElement.style.setProperty("--concept-offset", mq.matches ? (show ? "72px" : "0px") : "76px")
  }, [show])
  return (
    <>
      <a href={planHref} className={`btn fixed top-5 right-5 z-40 hidden transition-[opacity,transform] duration-300 md:inline-flex ${show ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} tabIndex={show ? 0 : -1}>Plan my excursion</a>
      <div className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-line bg-ground px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!show}>
        <a href={TEL} tabIndex={show ? 0 : -1} className="grid size-12 place-items-center border border-ink/20" aria-label={`Call ${PHONE}`}><Phone className="size-5" strokeWidth={1.5} aria-hidden /></a>
        <a href={planHref.replace("#book", "#book-phone")} tabIndex={show ? 0 : -1} className="btn">Plan my excursion</a>
      </div>
    </>
  )
}
