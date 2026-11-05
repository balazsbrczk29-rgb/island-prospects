import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Anchor, ArrowRight, ArrowUpRight, Plane, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, BOOK, SLIP, A, MARINA_EMAIL } from "./site"

const MODES = {
  sea: {
    tab: "By sea", Icon: Anchor, line1: "Clear customs", line2: "at the dock.",
    text: "Romora Bay Marina is an official port of entry on Harbour Island, with slips for yachts up to 190 feet, shore power, fresh water and a crew that handles the rest.",
    facts: [["Port of entry", "Customs on site"], ["Yachts to", "190 ft"], ["Slips", "40+"]],
    cta: ["Reserve a slip", SLIP], second: ["The marina", "marina.html"], img: A + "marina-aerial-BLMR27zt.jpg", alt: "Aerial view of Romora Bay Marina on Harbour Island",
  },
  air: {
    tab: "By air", Icon: Plane, line1: "Seventeen rooms", line2: "on the harbour.",
    text: "A small resort on Harbour Island: waterview rooms with private patios, suites under vaulted wood ceilings, a standalone house, and lunch at Sip Sip on the water.",
    facts: [["Rooms", "17"], ["Restaurants", "2"], ["Pink sand", "Steps away"]],
    cta: ["Reserve a stay", BOOK], second: ["Rooms & The House", "stay.html"], img: A + "hero-drone-CEdSqdKD.jpg", alt: "Aerial view of Romora Bay Resort & Marina, Harbour Island",
  },
} as const
type M = keyof typeof MODES

function Hero() {
  const [m, setM] = useState<M>("sea")
  const c = MODES[m]
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative mx-auto max-w-[1440px] md:px-10 md:pt-8">
        <div className="relative overflow-hidden md:rounded-[28px]">
          <AnimatePresence mode="wait">
            <motion.div key={c.img} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease }} className="aspect-[5/4] sm:aspect-[16/10] md:aspect-[16/8]">
              <Photo priority src={c.img} alt={c.alt} className="size-full" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 left-4 flex gap-1 rounded-full bg-paper p-1 shadow-sm md:top-6 md:left-6" role="tablist" aria-label="How are you arriving?">
            {(Object.keys(MODES) as M[]).map(k => {
              const I = MODES[k].Icon
              return <button key={k} role="tab" type="button" aria-selected={m === k} onClick={() => setM(k)} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] transition ${m === k ? "bg-ink text-paper" : "hover:bg-sand"}`}><I className="size-4" aria-hidden /> {MODES[k].tab}</button>
            })}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.1, ease }} className="relative z-10 mx-5 -mt-12 rounded-[22px] bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(30,35,49,.45)] md:absolute md:right-16 md:bottom-10 md:mx-0 md:mt-0 md:w-[520px] md:p-10">
          <p className="text-[11px] tracking-[0.3em] text-harbour uppercase">Harbour Island · Eleuthera · The Bahamas</p>
          <h1 id="hero-title" className="mt-4 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.01em]">
            <span className="sr-only">Romora Bay Resort & Marina, Harbour Island: </span>
            <AnimatePresence mode="wait">
              <motion.span key={m} className="block" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }}>
                {c.line1}<br /><em className="text-harbour">{c.line2}</em>
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">{c.text}</p>
          <dl className="mt-6 grid grid-cols-3 border-y border-line">
            {c.facts.map(([k, v]) => <div key={k} className="border-r border-line py-3 pr-2 last:border-r-0 [&:not(:first-child)]:pl-3"><dt className="text-[10px] tracking-[0.2em] text-muted uppercase">{k}</dt><dd className="font-display text-xl">{v}</dd></div>)}
          </dl>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a href={c.cta[1]} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-harbour px-6 text-paper transition hover:-translate-y-px hover:bg-harbour-deep">{c.cta[0]} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={c.second[1]} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-6 transition hover:-translate-y-px hover:border-ink">{c.second[0]} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Reservations", PHONE, TEL],
    ["Marina team", MARINA_EMAIL, `mailto:${MARINA_EMAIL}`],
    ["Sip Sip", "Lunch 11:30am to 4pm, closed Tuesdays", "#dining"],
    ["Season", "Closed Aug 17 to Nov 12", "stay.html"],
  ]
  return (
    <section className="mt-12 md:mt-16" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] border-y border-line sm:grid-cols-2 lg:grid-cols-4 md:px-10">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="border-line border-b last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-l lg:odd:border-r-0 lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-sand/60 md:px-8">
              <span className="text-[10.5px] tracking-[0.24em] text-harbour uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight break-words ${i === 0 ? "text-[2rem]" : "text-[1.25rem]"}`}>{v}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Two() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="two-title">
      <Reveal className="max-w-3xl">
        <Label n="01">One dock, two arrivals</Label>
        <h2 id="two-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1]">The yacht and the room <em className="text-harbour">share one address.</em></h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <a href="marina.html" className="group block">
            <Photo src={A + "marina-dock-sailboat-DrtEkZ-S.jpg"} alt="A sailboat at the dock at Romora Bay Marina" className="aspect-[4/3] rounded-[22px]" />
            <div className="mt-5 flex items-baseline justify-between gap-4"><p className="font-display text-3xl">The marina</p><span className="inline-flex items-center gap-1 text-[14px] text-harbour">Specs and power <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span></div>
            <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-muted">Customs and immigration on site, 24/7 yacht assistance, provisioning and round-the-clock security.</p>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:mt-28">
          <a href="stay.html" className="group block">
            <Photo src={A + "room1-5-GeiL2ZYS.jpg"} alt="A waterview room at Romora Bay" className="aspect-[4/5] rounded-[22px]" />
            <div className="mt-5 flex items-baseline justify-between gap-4"><p className="font-display text-3xl">The rooms</p><span className="inline-flex items-center gap-1 text-[14px] text-harbour">Rooms & The House <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span></div>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">Waterview kings with private patios, garden suites and a standalone house with a full kitchen.</p>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Dining() {
  return (
    <section id="dining" className="bg-harbour-deep text-paper" aria-labelledby="dine-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-5">
          <Label n="02" light>Dining</Label>
          <h2 id="dine-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1]">Lunch at Sip Sip. <em className="text-conch">Dinner upstairs.</em></h2>
          <div className="mt-10 space-y-0">
            {[["Sip Sip", "The waterfront restaurant: fresh-caught seafood, local ingredients, sunset cocktails.", "Lunch 11:30am to 4pm · closed Tuesdays"], ["Upstairs @ Romora", "Breakfast and dinner with panoramic harbour views and a serious wine list.", "Breakfast · Dinner · Special events"], ["Catering & events", "From intimate beach dinners to grand celebrations.", "On request"]].map(([t, d, h]) => (
              <div key={t} className="group border-t border-paper/15 py-6">
                <p className="font-display text-2xl transition group-hover:translate-x-1">{t}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-paper/70">{d}</p>
                <p className="mt-2 text-[12px] tracking-[0.16em] text-conch uppercase">{h}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7">
          <Reveal className="col-span-2"><Photo src={A + "sipsip-deck-dining-DYk9esoQ.jpg"} alt="The deck at Sip Sip on the water" className="aspect-[16/10] rounded-[22px]" /></Reveal>
          <Reveal delay={0.1}><Photo src={A + "upstairs-patio-3-DUfXOeak.jpg"} alt="The patio at Upstairs @ Romora" className="aspect-square rounded-[22px]" /></Reveal>
          <Reveal delay={0.15}><Photo src={A + "kayaking-Dza3TEe0.webp"} alt="Kayaking off Harbour Island" className="aspect-square rounded-[22px]" /></Reveal>
        </div>
      </div>
    </section>
  )
}

function Play() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:items-center md:px-10 md:py-32" aria-labelledby="play-title">
      <Reveal className="md:col-span-6"><Photo src={A + "pickleball-action-CJFBzUTN.jpg"} alt="Pickleball on the Romora Bay courts" className="aspect-[4/3] rounded-[22px]" /></Reveal>
      <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
        <Label n="03">Days here</Label>
        <h2 id="play-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1]">Courts, kayaks and the pink sand.</h2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">Snorkelling, kayaking and fishing from the resort, the beach a short walk away, and the island’s pickleball club on site with clinics and social play.</p>
        <p className="mt-6 border-l-2 border-conch pl-4 text-[15px] leading-relaxed">Pickleball Bootcamp, November 20 and 21, 2026: $350 members, $500 non-members. Call <a href="tel:+12425530092" className="underline underline-offset-4">242-553-0092</a>.</p>
      </Reveal>
    </section>
  )
}

const FAQ: [string, string][] = [
  ["Can I clear customs at Romora Bay Marina?", "Yes. The marina is an official port of entry, and boats can clear customs and immigration directly at the marina."],
  ["How big a yacht can Romora Bay take?", "Vessels up to 190 feet are welcome in the marina's slips."],
  ["When is the resort closed?", "The resort closes seasonally from August 17 to November 12."],
  ["When is Sip Sip open?", "Sip Sip serves lunch from 11:30am to 4pm and is closed on Tuesdays."],
  ["How do I reserve?", "Book rooms online or call 833.717.6499. Reserve slips through the marina reservations page or email marina@romorabay.com."],
]

function Faq() {
  return (
    <section className="bg-sand" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4"><Label n="04">Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">Good to know.</h2>
          <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px"><Phone className="size-4" aria-hidden /> {PHONE}</a></Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible className="border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left text-[18px] font-normal hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Map() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24" aria-label="Map">
      <iframe title="Map of Romora Bay Resort & Marina, Harbour Island" loading="lazy" className="aspect-[4/3] w-full rounded-[22px] border border-line md:aspect-[21/8]" src="https://www.google.com/maps?q=Romora+Bay+Resort+%26+Marina+Harbour+Island+Bahamas&output=embed" />
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyInfo /><Two /><Dining /><Play /><Faq /><Map /></Page>)
