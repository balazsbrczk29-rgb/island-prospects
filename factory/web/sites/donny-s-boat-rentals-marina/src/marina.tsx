import { lazy, Suspense } from "react"
import { motion } from "motion/react"
import { Page, mount, Reveal, Label, Photo, ease } from "./site"
import { IMG, EMAIL, PHONE, TEL } from "./data"
const SlipCheck = lazy(() => import("./SlipCheck"))

const SPECS: [string, string][] = [
  ["Dockage", "Fixed price, up to 50 ft LOA and 7 ft draft"],
  ["Moorings", "Plenty of swing room"],
  ["Entering Black Sound", "6 ft draft at 2 ft above low water. Stay close to the last red marker, then aim for the middle of the sound."],
  ["On the dock", "Shower and bathroom, trash cans, dinghy dock, electric, water, ice"],
  ["Nearby", "Fuel dock and boat yard close by. Customs, restaurants and groceries in New Plymouth, 10 minutes' walk"],
  ["Radio", "VHF 16, working channel 10"],
  ["Position", "N 26° 45.460′ · W 077° 19.301′"],
  ["Rates", "Fixed price: ask Donny"],
]

function Intro() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:px-10 md:pt-20 lg:grid-cols-12 lg:items-end" aria-labelledby="m-title">
      <div className="lg:col-span-7">
        <Label>Dockage and moorings · Black Sound</Label>
        <h1 id="m-title" className="mt-5 font-display text-[clamp(2.8rem,6.4vw,5.8rem)] leading-[0.98]">
          {["A cruiser-friendly dock,", "and Donny on site."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-turtle" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
        </h1>
      </div>
      <Photo src={IMG.mooring.src} alt={IMG.mooring.alt} eager className="aspect-[4/3] rounded-[2rem] lg:col-span-5" />
    </section>
  )
}

function Specs() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10" aria-label="Dock details">
      <dl className="border-t border-ink">
        {SPECS.map(([k, v], i) => (
          <motion.div key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.6, ease }} className="grid gap-1 border-b border-line py-5 md:grid-cols-[1fr_2fr] md:gap-8">
            <dt className="text-[13px] font-bold tracking-[0.14em] text-muted uppercase">{k}</dt>
            <dd className={`font-display text-[1.35rem] leading-snug ${k === "Rates" ? "text-turtle" : ""}`}>{v}</dd>
          </motion.div>
        ))}
      </dl>
      <p className="mt-6 text-[15px] text-muted">Ask ahead: <a className="underline decoration-turtle underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a> or <a className="underline decoration-turtle underline-offset-4" href={TEL}>{PHONE}</a>.</p>
    </section>
  )
}

function Check() {
  return (
    <section className="bg-sand/50" aria-labelledby="c-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-28">
        <Reveal><Label>Slip checker</Label><h2 id="c-title" className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">Enter your length and draft.</h2></Reveal>
        <div className="mt-12"><Suspense fallback={<div className="h-80 rounded-3xl bg-flats/30" />}><SlipCheck /></Suspense></div>
      </div>
    </section>
  )
}

mount(<Page current="Dockage"><Intro /><Specs /><Check /></Page>)
