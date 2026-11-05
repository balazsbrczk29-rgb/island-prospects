import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Mail, Plane } from "lucide-react"
import { Page, mount, Reveal, Title, Img, ease, reveal, IMG, EMAIL, AIR, PHONE, TEL } from "./site"

const DAYS = {
  dive: { t: "Dive", items: ["Dean's Blue Hole", "Conception Wall", "Shark Reef", "The Wreck"], d: "Stella Maris Water Sports takes you to some of the Bahamas' best dive sites.", img: IMG.g1 },
  fish: { t: "Fish", items: ["Bonefishing in Adderley's Bay", "Bonefishing in Glenton's Bay", "Big game fishing off two shorelines"], d: "The bonefish bays are a stone's throw from the resort.", img: IMG.g2 },
  explore: { t: "Explore", items: ["Snorkel", "Bike", "Sail, kayak, paddle board", "Caves and bird life", "Local island life", "Boat or air excursions to nearby islands"], d: "Many activities are free of charge. You will likely leave the only footprints on the beach.", img: IMG.g0 },
} as const

function Top() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-16 md:grid-cols-12 md:px-10 md:pt-24" aria-labelledby="i-title">
      <div className="md:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="kicker">Dive, fish, explore</motion.p>
        <h1 id="i-title" className="mt-5 font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.03em]">
          {["Days on", "Long Island."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "italic text-lagoon" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
      </div>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="text-[18px] leading-relaxed text-muted md:col-span-4 md:col-start-9 md:self-end">Snorkel, dive, fish, bike, sail, kayak, explore caves, watch the birds, dance at the Rum Punch Party. Then find a bay of your own.</motion.p>
    </section>
  )
}

function Days() {
  const [k, setK] = useState<keyof typeof DAYS>("dive")
  const d = DAYS[k]
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-32" aria-label="Activities">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an activity">
        {(Object.keys(DAYS) as (keyof typeof DAYS)[]).map(x => <button key={x} type="button" aria-pressed={k === x} onClick={() => setK(x)} className={`min-h-12 rounded-full border px-6 font-display text-xl transition hover:-translate-y-px ${k === x ? "border-lagoon bg-lagoon text-white" : "border-ink/20"}`}>{DAYS[x].t}</button>)}
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] bg-paper-2 md:col-span-7">
          <AnimatePresence mode="popLayout"><motion.img key={k} src={d.img} alt="From the Stella Maris Resort gallery" width={1170} height={780} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: reveal }} className="absolute inset-0 size-full object-cover" /></AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="md:col-span-4 md:col-start-9">
            <p className="text-[17px] leading-relaxed text-muted">{d.d}</p>
            <ul className="mt-6 border-t border-line">{d.items.map(t => <li key={t} className="border-b border-line py-4 font-display text-2xl">{t}</li>)}</ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Weddings() {
  return (
    <section id="weddings" className="bg-paper-2" aria-labelledby="w-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Img src={IMG.stay} alt="Stella Maris Resort Club grounds by the ocean" className="aspect-[4/3] rounded-[24px] md:col-span-6" />
        <div className="md:col-span-5 md:col-start-8">
          <Title n="02" k="Weddings and anniversaries" id="w-title" intro="A romantic island wedding, barefoot or elegant, or an anniversary to celebrate. The resort promises to pamper you.">Barefoot<br /><em className="text-lagoon">or elegant.</em></Title>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Wedding enquiry")}`} className="pill pill-solid mt-8"><Mail className="size-4" aria-hidden /> Ask about your date</a>
        </div>
      </div>
    </section>
  )
}

function GettingHere() {
  const steps = [["Fly to the Bahamas", "Arrive at your international Bahamas airport hub, such as Nassau."], ["Hop to Long Island", "Flights run from Nassau to Stella Maris Airport (SML), or the resort's own air service can fly you in."], ["Arrive at the club", "Ocean View Drive, Stella Maris."]]
  return (
    <section id="getting-here" className="bg-atlantic text-paper" aria-labelledby="g-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Title light n="03" k="Getting here" id="g-title" intro="Long Island is far from the crowds, not far from you.">We can<br /><em className="text-shallows">fly you here.</em></Title>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-3">
          <motion.span aria-hidden className="absolute top-[13px] left-0 hidden h-px w-full origin-left bg-shallows md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} />
          {steps.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.25, duration: 0.8, ease }} className="relative">
              <span className="relative z-10 grid size-7 place-items-center rounded-full bg-shallows text-[13px] font-semibold text-ink">{i + 1}</span>
              <h3 className="mt-5 font-display text-3xl">{t}</h3><p className="mt-2 text-paper/75">{d}</p>
            </motion.li>
          ))}
        </ol>
        <Reveal className="mt-14 flex flex-wrap gap-3">
          <a href={`mailto:${AIR}?subject=${encodeURIComponent("Flight enquiry to Stella Maris")}`} className="pill bg-paper text-ink"><Plane className="size-4" aria-hidden /> Ask the air service</a>
          <a href={TEL} className="pill border border-paper/40">{PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Dive, fish, explore"><Top /><Days /><Weddings /><GettingHere /></Page>)
