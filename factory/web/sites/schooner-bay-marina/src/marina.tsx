import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, FileText, Phone } from "lucide-react"
import { Page, mount, Reveal, Head, ease, reveal, IMG, HM, HM_TEL, EMAIL, HANDOUT } from "./site"

const SPECS: [string, string, string?][] = [
  ["Maximum length", "80 ft", "The Abaco page of the current site says 70 ft; confirm."],
  ["Draft", "8 ft at MLW"],
  ["Basin", "Protected harbour"],
  ["Shore power", "30 and 50 amp"],
  ["Fuel", "Diesel and gas, market rates"],
  ["Dockage", "Daily, weekly and monthly"],
  ["Daily rate", "$3.00 per ft, varies with stay"],
  ["Office", "7:30 am to 4:30 pm daily"],
  ["VHF", "16, working 77"],
  ["Harbour Master", "Albert Russel"],
  ["Ashore", "Showers, restrooms, Wi-Fi, General Store"],
  ["Beam limit, slip count", "Ask the Harbour Master"],
]

function Top() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-24" aria-labelledby="m-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cap">The marina</motion.p>
      <h1 id="m-title" className="mt-5 max-w-5xl font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.035em]">
        {["Specs, fuel and", "the Harbour Master."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.04em]"><motion.span className={`block ${i ? "italic text-harbour" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
        ))}
      </h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Everything Schooner Bay Marina publishes about its harbour, in one table you can read on a phone at the helm. Anything we could not confirm is marked, so you know what to ask.</motion.p>
      <motion.img initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.3, ease: reveal }} src={IMG.amenities} alt="Harbour amenities at Schooner Bay" width={1600} height={1067} className="mt-12 aspect-[16/7] w-full object-cover" />
    </section>
  )
}

function Specs() {
  return (
    <section id="fuel" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="spec-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4"><Head n="01" k="Dock specs" id="spec-title" title="The numbers." /></div>
        <Reveal delay={0.1} className="md:col-span-8">
          <dl className="border-t border-ink/25">
            {SPECS.map(([k, v, note]) => (
              <div key={k} className="group grid gap-1 border-b border-ink/15 py-5 md:grid-cols-[1fr_1.5fr]">
                <dt className="cap">{k}</dt>
                <dd><span className={`font-display text-2xl md:text-3xl ${v.startsWith("Ask") ? "text-harbour italic" : ""}`}>{v}</span>{note && <span className="mt-1 block text-[13px] text-muted">{note}</span>}</dd>
              </div>
            ))}
          </dl>
          <a href={HANDOUT} className="ulink mt-8 inline-flex items-center gap-2 text-harbour"><FileText className="size-4" aria-hidden /> Marina handout and nautical chart (PDF)</a>
        </Reveal>
      </div>
    </section>
  )
}

const ARRIVE = {
  sea: { t: "By sea", lines: [["Position, as published", "N 26° 09.529′, W 077° 10.633′"], ["On the radio", "VHF 16, working 77"], ["Before you come", "Call ahead for fuel and a slip"], ["The route", "Between the Abaco Cays and Nassau, closest marina to Hole in the Wall"]] },
  air: { t: "By air", lines: [["Marsh Harbour International (MHH)", "About 30 minutes by road. Daily flights from Florida and Nassau"], ["Sandy Point Airstrip (MYAS)", "About 20 minutes. Private planes and light jets"], ["Marsh Harbour FBO", "Customs and Immigration service"], ["Then", "The marina helps with local transport"]] },
} as const

function Arrive() {
  const [m, setM] = useState<keyof typeof ARRIVE>("sea")
  return (
    <section id="arrive" className="bg-ink text-paper" aria-labelledby="arr-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <Head dark n="02" k="Arriving" id="arr-title" title={<>Two ways<br /><em className="text-foam">in.</em></>} />
          <div className="mt-10 inline-flex rounded-md bg-white/8 p-1" role="group" aria-label="Arrival mode">
            {(Object.keys(ARRIVE) as (keyof typeof ARRIVE)[]).map(k => (
              <button key={k} type="button" aria-pressed={m === k} onClick={() => setM(k)} className={`min-h-11 rounded px-6 text-[15px] transition ${m === k ? "bg-paper text-ink" : "text-paper/75 hover:text-paper"}`}>{ARRIVE[k].t}</button>
            ))}
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <AnimatePresence mode="wait">
            <motion.dl key={m} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }} className="border-t border-paper/20">
              {ARRIVE[m].lines.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-paper/15 py-5 md:grid-cols-[1fr_1.3fr]"><dt className="text-paper/60">{k}</dt><dd className="font-display text-2xl">{v}</dd></div>
              ))}
            </motion.dl>
          </AnimatePresence>
          <p className="mt-6 text-[13px] text-paper/55">Positions and routes are shown as the marina publishes them. Not for navigation: use current charts and confirm with the Harbour Master.</p>
        </div>
      </div>
    </section>
  )
}

function Call() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-label="Contact the Harbour Master">
      <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
        <p className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1] md:col-span-7">Raise us on 16, or call ahead.</p>
        <div className="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
          <a href={HM_TEL} className="btn btn-ink"><Phone className="size-4" aria-hidden /> {HM}</a>
          <a href="index.html#request" className="btn btn-line">Request a slip <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <p className="text-[14px] text-muted md:col-span-12">{EMAIL}</p>
      </Reveal>
    </section>
  )
}

mount(<Page current="Marina"><Top /><Specs /><Arrive /><Call /></Page>)
