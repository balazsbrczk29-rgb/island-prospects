import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Plane } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, BOOK, WA_LINK } from "./site"
import { EnquirySection, Faq } from "./parts"

const ROUTES = {
  fll: { label: "Fort Lauderdale", from: "FXE", via: "Makers Air", steps: ["Fly from Fort Lauderdale Executive Airport (FXE) with Makers Air, the resort's preferred airline.", "Land at New Bight Airport (MYCB), Cat Island.", "Five minutes by road to the village."], perk: "Resort guests get 10% off Makers Air.", link: ["Makers Air flights to Cat Island", "https://makersair.com/bahamas-flights/flights-to-cat-island/"] },
  nas: { label: "Nassau", from: "NAS", via: "Western Air", steps: ["Connect in Nassau to Western Air, which flies to Cat Island three times a week on a 50-seat jet.", "About thirty minutes in the air, with views.", "Land at New Bight Airport (MYCB), five minutes from the village."], perk: "A quick hop for travellers already in Nassau.", link: ["Western Air", "https://www.westernairbahamas.com/"] },
  own: { label: "My own plane", from: "You", via: "Private", steps: ["Land at New Bight: 5,000 ft, paved, operating at all times under visual flight rules.", "Customs is available 9:00am to 5:00pm.", "Five minutes by road to the village."], perk: "Private and commercial airline pilots get 15% off with promo code PILOT.", link: ["Ask the front desk about flying in", WA_LINK] },
} as const
type RouteKey = keyof typeof ROUTES

function Chooser() {
  const [k, setK] = useState<RouteKey>("fll")
  const r = ROUTES[k]
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="label text-muted">I am flying from</p>
        <div className="mt-4 flex flex-col gap-2" role="radiogroup" aria-label="Departure">
          {(Object.keys(ROUTES) as RouteKey[]).map(key => (
            <button key={key} role="radio" aria-checked={k === key} onClick={() => setK(key)} className={`flex min-h-14 items-center justify-between rounded-[4px] border px-5 text-left font-display text-[1.4rem] transition hover:-translate-y-px ${k === key ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink"}`}>
              {ROUTES[key].label}<span className="label opacity-70">{ROUTES[key].from}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <AnimatePresence mode="wait">
          <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
            <div className="flex items-center gap-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-light">
              <span>{r.from}</span>
              <span className="relative h-px flex-1 bg-line"><motion.span className="absolute inset-y-0 left-0 bg-casuarina" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.1, ease: reveal }} /><Plane className="absolute -top-3 right-0 size-6 text-casuarina" aria-hidden /></span>
              <span>MYCB</span>
            </div>
            <p className="label mt-2 text-muted">{r.via} · New Bight, Cat Island</p>
            <ol className="mt-8 space-y-0 border-l border-casuarina/40">
              {r.steps.map((s, i) => (
                <li key={s} className="relative pb-6 pl-7 last:pb-0">
                  <span className="absolute -left-[6px] top-1.5 size-3 rounded-full border-2 border-casuarina bg-paper" aria-hidden />
                  <span className="label text-casuarina">Step {i + 1}</span>
                  <p className="mt-1 text-[17px]">{s}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-[4px] bg-shallows/45 px-5 py-4 text-[16px]">{r.perk}</p>
            <a href={r.link[1]} className="btn btn-quiet mt-6">{r.link[0]} <ArrowUpRight className="size-4" aria-hidden /></a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const FAQ: [string, string][] = [
  ["What is the nearest airport?", "New Bight Airport (MYCB) on Cat Island, about five minutes from the resort."],
  ["Is there a discount on flights?", "Yes, resort guests get 10% off Makers Air from Fort Lauderdale Executive (FXE)."],
  ["When is customs open at New Bight?", "9:00am to 5:00pm. The airport operates under visual flight rules."],
  ["Are there other ways to get here?", "The resort lists further transport options and the front desk can help plan the trip. Send a WhatsApp message with your dates."],
]

mount(
  <Page current="Getting here">
    <section className="px-3 pt-3 md:px-5 md:pt-5" aria-labelledby="g-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-2 pt-8 pb-16 md:px-5 md:pt-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-casuarina">Getting to Cat Island</motion.p>
          <h1 id="g-title" className="mt-6 font-display text-[clamp(3rem,7.6vw,7rem)] font-light leading-[0.92] tracking-[-0.03em]">
            {["Worth the journey.", "Five minutes from the runway."].map((l, i) => (
              <span key={l} className={`block overflow-hidden pb-[0.08em] ${i ? "text-[0.5em]" : ""}`}><motion.span className={`block ${i ? "italic text-casuarina" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> Getting to Fernandez Bay Village, Cat Island</span>
          </h1>
        </div>
        <motion.p className="text-[17px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>A short flight from Fort Lauderdale or Nassau, or your own plane onto a paved 5,000 ft runway. The resort sits in the hollow of Fernandez Bay, five minutes from New Bight Airport.</motion.p>
      </div>
      <Photo priority src={IMG.tour} alt="Touring Cat Island from Fernandez Bay Village" className="h-[52svh] min-h-[320px] rounded-[6px]" />
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="route-title">
      <Reveal className="mb-12">
        <Label n="01" className="text-casuarina">Your route</Label>
        <h2 id="route-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">Choose where you start.</h2>
      </Reveal>
      <Chooser />
    </section>
    <section id="pilots" className="scroll-mt-20 bg-casuarina text-paper" aria-labelledby="pilot-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="02" className="text-shallows">Pilots</Label>
          <h2 id="pilot-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">15% off for pilots. <em>Code PILOT.</em></h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/75">For all private and commercial airline pilots, applied in the booking engine with the promo code PILOT.</p>
          <a href={BOOK} className="btn btn-light mt-8">Check availability</a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <dl className="divide-y divide-paper/15 border-y border-paper/15">
            {[["Airport", "New Bight (MYCB), Cat Island"], ["Runway", "5,000 ft, paved"], ["Rules", "Visual flight rules, at all times"], ["Customs", "9:00am to 5:00pm"], ["To the resort", "About five minutes"]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4"><dt className="text-paper/65">{k}</dt><dd className="text-right font-display text-[1.35rem]">{v}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="gfaq">
      <div className="lg:col-span-5"><Label n="03" className="text-casuarina">Travel questions</Label><h2 id="gfaq" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[0.98]">The short answers.</h2></div>
      <div className="lg:col-span-6 lg:col-start-7"><Faq items={FAQ} /></div>
    </section>
    <EnquirySection n="04" />
  </Page>
)
