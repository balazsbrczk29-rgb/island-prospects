import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Check, Mail, X } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, SLIP, A, MARINA_EMAIL } from "./site"

const POWER = ["30 amp", "50 amp", "110V single phase", "220V 3 phase", "408V 3 phase"]
const SERVICES: [string, string][] = [
  ["On-site customs and immigration", "An official port of entry: clear in at the marina."],
  ["Yacht assistance, 24/7", "A network of local and international providers for any task."],
  ["Provisioning and concierge", "Stock the galley or cater a private party; yacht agency available."],
  ["Security around the clock", "Video surveillance and on-site guards."],
  ["Fresh water", "A reverse osmosis system making up to 17,000 gallons a day."],
  ["Power", "Backed by a 550kW generator."],
  ["Pumpout", "On site, for every vessel at the dock."],
  ["Guest amenities", "Showers, air-conditioned facilities and laundry for marina guests."],
]

function Checker() {
  const [loa, setLoa] = useState(85)
  const [power, setPower] = useState("50 amp")
  const [other, setOther] = useState(false)
  const fits = loa <= 190
  const powerOk = !other
  const body = encodeURIComponent(`Hello Romora Bay Marina,\n\nSlip enquiry:\nLength overall: ${loa} ft\nPower: ${other ? "other / to discuss" : power}\nArrival:\nDeparture:\nBoat name:\n\nThank you`)
  return (
    <div className="grid gap-8 rounded-[26px] border border-line bg-paper p-6 md:grid-cols-2 md:p-10">
      <div>
        <p className="flex items-baseline justify-between"><span className="text-[11px] tracking-[0.24em] text-muted uppercase">Length overall</span><span className="font-display text-5xl tabular-nums">{loa} <span className="text-2xl">ft</span></span></p>
        <input type="range" min={30} max={240} step={1} value={loa} onChange={e => setLoa(Number(e.target.value))} aria-label="Length overall in feet" className="mt-4 w-full accent-[#155e67]" />
        <div className="relative mt-6 h-16" aria-hidden>
          <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
          <div className="absolute top-1/2 h-6 -translate-y-1/2 border-r-2 border-dashed border-harbour" style={{ left: `${((190 - 30) / 210) * 100}%` }}><span className="absolute -top-6 -translate-x-1/2 text-[11px] whitespace-nowrap text-harbour">190 ft limit</span></div>
          <motion.svg viewBox="0 0 120 30" className="absolute top-1/2 h-8 -translate-y-1/2" animate={{ width: `${((loa - 30) / 210) * 100 + 6}%` }} transition={{ duration: 0.5, ease }} preserveAspectRatio="none">
            <path d="M2 18 L100 18 Q 116 18 118 10 L 18 10 Q 6 10 2 18 Z" fill={fits ? "#1e2331" : "#c7a59a"} />
            <rect x="30" y="4" width="40" height="6" fill={fits ? "#1e2331" : "#c7a59a"} />
          </motion.svg>
        </div>
        <p className="mt-6 text-[11px] tracking-[0.24em] text-muted uppercase">Power you need</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Power service">
          {POWER.map(p => <button key={p} type="button" aria-pressed={!other && power === p} onClick={() => { setPower(p); setOther(false) }} className={`min-h-11 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${!other && power === p ? "border-ink bg-ink text-paper" : "border-line"}`}>{p}</button>)}
          <button type="button" aria-pressed={other} onClick={() => setOther(true)} className={`min-h-11 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${other ? "border-ink bg-ink text-paper" : "border-line"}`}>Something else</button>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-[20px] bg-sand p-6 md:p-8" aria-live="polite">
        <ul className="space-y-4">
          <li className="flex gap-3">{fits ? <Check className="mt-1 size-5 text-harbour" aria-hidden /> : <X className="mt-1 size-5 text-muted" aria-hidden />}<span className="text-[17px]">{fits ? `${loa} ft is within the 190 ft the marina welcomes.` : `${loa} ft is over the published 190 ft. Talk to the dockmaster.`}</span></li>
          <li className="flex gap-3">{powerOk ? <Check className="mt-1 size-5 text-harbour" aria-hidden /> : <X className="mt-1 size-5 text-muted" aria-hidden />}<span className="text-[17px]">{powerOk ? `${power} is on the marina’s published power list.` : "Ask the marina about your power requirement."}</span></li>
          <li className="flex gap-3"><Check className="mt-1 size-5 text-harbour" aria-hidden /><span className="text-[17px]">Customs and immigration clearance on site.</span></li>
        </ul>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <a href={SLIP} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-harbour px-6 text-paper transition hover:-translate-y-px hover:bg-harbour-deep">Reserve a slip <ArrowUpRight className="size-4" aria-hidden /></a>
          <a href={`mailto:${MARINA_EMAIL}?subject=${encodeURIComponent(`Slip enquiry, ${loa} ft`)}&body=${body}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 transition hover:-translate-y-px hover:border-ink"><Mail className="size-4" aria-hidden /> Email the marina</a>
        </div>
        <p className="mt-3 text-[12px] text-muted">Draft, beam and approach: ask the dockmaster; they are not published online.</p>
      </div>
    </div>
  )
}

function Marina() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:grid-cols-12 md:items-end md:px-10 md:pt-24" aria-labelledby="m-title">
        <div className="md:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Romora Bay Marina · Harbour Island</Label></motion.div>
          <motion.h1 id="m-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 font-display text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.96]">A port of entry, <em className="text-harbour">with a resort behind it.</em></motion.h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Slips for yachts up to 190 feet, customs on the dock, and every resort amenity for owners, captains and crew.</motion.p>
      </section>
      <motion.div initial={{ clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ delay: 0.3, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="mx-auto max-w-[1440px] md:px-10">
        <Photo priority src={A + "marina-aerial-shot-CxS_9XX1.jpg"} alt="Aerial view of the slips at Romora Bay Marina" className="aspect-[4/3] md:aspect-[21/8] md:rounded-[28px]" />
      </motion.div>
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="fit-title">
        <Reveal className="mb-10 max-w-2xl"><Label n="01">Fit and power</Label><h2 id="fit-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[1]">Check your yacht before you call.</h2></Reveal>
        <Reveal delay={0.1}><Checker /></Reveal>
      </section>
      <section className="bg-harbour-deep text-paper" aria-labelledby="sv-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="md:col-span-4"><Label n="02" light>Services</Label><h2 id="sv-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[1]">What the crew handles.</h2>
            <a href="https://www.romorabay.com/Marina_Map.pdf" className="group mt-8 inline-flex items-center gap-2 underline decoration-paper/30 underline-offset-4 hover:decoration-conch">Marina map (PDF) <ArrowUpRight className="size-4" aria-hidden /></a></Reveal>
          <ol className="grid gap-x-10 sm:grid-cols-2 md:col-span-8">
            {SERVICES.map(([t, d], i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.08, duration: 0.8, ease }} className="border-t border-paper/15 py-6">
                <p className="font-display text-2xl">{t}</p><p className="mt-1 text-[15px] leading-relaxed text-paper/70">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="team-title">
        <Reveal className="md:col-span-5"><Label n="03">The marina team</Label><h2 id="team-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">Named people, one email.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">Member of the Association of Bahamas Marinas (Platinum) and listed with Snag-A-Slip.</p></Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <dl>
            {[["Dockmaster", "Rodney Diegue"], ["Marina Manager", "Beriska Moss"], ["Email", MARINA_EMAIL], ["Marina phone", "242.470.1520"]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 border-b border-line py-5 first:border-t"><dt className="pt-1 text-[11px] tracking-[0.2em] text-muted uppercase">{k}</dt><dd className="font-display text-2xl break-all">{k === "Email" ? <a href={`mailto:${v}`} className="hover:text-harbour">{v}</a> : k === "Marina phone" ? <a href="tel:+12424701520" className="hover:text-harbour">{v}</a> : v}</dd></div>
            ))}
          </dl>
        </Reveal>
      </section>
    </>
  )
}

mount(<Page current="Marina"><Marina /></Page>)
