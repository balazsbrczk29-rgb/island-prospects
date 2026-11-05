import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Head, ease, reveal, W, DOCKWA, PHONE_LOCAL, TEL_LOCAL } from "./site"

const SPECS: [string, string][] = [["Slips", "40, each with its own finger pier"], ["Channel", "Dredged, 7 ft at MLW, from the Sea of Abaco into White Sound"], ["Shore power", "50 and 100 amp"], ["On the dock", "Fresh water, ice, free high-speed Wi-Fi"], ["Ashore", "New showers and laundry, pool, gift shop, private beach and beach bar"], ["Arrival", "Dockmaster meets and greets and helps you dock"], ["Getting about", "Ferry pick-up at the dock; golf cart rental help at the front desk"], ["Season", "Closed for maintenance from early September to late October"]]
const SEASONS = [
  { k: "Winter and late fall", when: "Early Jan to Feb, late Oct to mid Dec", d: 2.0, w: 1.75 },
  { k: "Spring, late summer, holidays", when: "Mar to May, Aug 7 to Sep 2, Dec 20 to Jan 4", d: 2.5, w: 2.25 },
  { k: "Summer", when: "June 1 to August 6", d: 3.5, w: null },
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:px-10 md:pt-20 lg:grid-cols-12 lg:items-end" aria-labelledby="m-title">
      <div className="lg:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-abaco">The marina · White Sound</motion.p>
        <h1 id="m-title" className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em]">
          {["Seven feet in,", "forty slips inside."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic text-abaco" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 lg:col-span-4 lg:col-start-9">
        <a href={DOCKWA} className="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-abaco px-6 text-paper transition hover:-translate-y-px hover:bg-abaco-deep">Reserve a slip on Dockwa <ArrowUpRight className="size-4" aria-hidden /></a>
        <a href={TEL_LOCAL} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden />{PHONE_LOCAL}</a>
      </div>
      <div className="overflow-hidden rounded-[6px] bg-[#9fc0c9] lg:col-span-12"><img src={W("cd07c1191ea14bd8bee1baad32ba7ed7")} alt="The Bluff House marina from the dock" width={1900} height={660} fetchPriority="high" className="aspect-[16/7] w-full object-cover md:aspect-[16/5]" /></div>
    </section>
  )
}

function Specs() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-32" aria-labelledby="s-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="01" label="Dock specs" id="s-title" title={<>What's on the dock.</>} /></div>
        <dl className="divide-y divide-line border-y border-line lg:col-span-8">{SPECS.map(([k, v]) => <div key={k} className="grid gap-1 py-5 md:grid-cols-[1fr_2fr]"><dt className="label pt-1 text-muted">{k}</dt><dd className="font-display text-[1.5rem] leading-snug">{v}</dd></div>)}</dl>
      </div>
    </section>
  )
}

function Estimator() {
  const [loa, setLoa] = useState(42)
  const [nights, setNights] = useState(4)
  const [s, setS] = useState(0)
  const season = SEASONS[s]
  const billed = Math.max(30, loa)
  const weekly = nights >= 7 && season.w !== null
  const rate = weekly ? (season.w as number) : season.d
  const sub = billed * rate * nights
  const total = sub * 1.1
  return (
    <section className="bg-paper-2" aria-labelledby="e-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="02" label="Slip estimate" id="e-title" title={<>Roughly what dockage costs.</>}><p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Based on the last published rates (2025 seasons): per foot per day, 30 ft minimum, plus 10% VAT. Electricity and water are metered and extra. Confirm current rates when you reserve.</p></Head>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Season">{SEASONS.map((x, i) => <button key={x.k} role="tab" aria-selected={s === i} type="button" onClick={() => setS(i)} className={`min-h-11 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${s === i ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink/40"}`}>{x.k}</button>)}</div>
          <p className="mt-3 text-[14px] text-muted">{season.when}</p>
        </div>
        <Reveal delay={0.1} className="rounded-[6px] bg-paper p-6 md:p-9 lg:col-span-6 lg:col-start-7">
          <label htmlFor="loa" className="flex items-baseline justify-between"><span className="label text-muted">Boat length</span><span className="font-display text-4xl tabular-nums">{loa} ft</span></label>
          <input id="loa" type="range" min={20} max={120} value={loa} onChange={e => setLoa(+e.target.value)} className="mt-3 w-full accent-[#24507a]" />
          <label htmlFor="n" className="mt-8 flex items-baseline justify-between"><span className="label text-muted">Nights</span><span className="font-display text-4xl tabular-nums">{nights}</span></label>
          <input id="n" type="range" min={1} max={28} value={nights} onChange={e => setNights(+e.target.value)} className="mt-3 w-full accent-[#24507a]" />
          <ul className="mt-8 space-y-1.5 border-t border-line pt-5 text-[15px] text-muted">
            <li className="flex justify-between"><span>Billed length{loa < 30 ? " (30 ft minimum)" : ""}</span><span className="tabular-nums">{billed} ft</span></li>
            <li className="flex justify-between"><span>{weekly ? "Weekly rate" : "Daily rate"}</span><span className="tabular-nums">${rate.toFixed(2)}/ft/day</span></li>
            <li className="flex justify-between"><span>Dockage</span><span className="tabular-nums">${sub.toFixed(2)}</span></li>
            <li className="flex justify-between"><span>VAT 10%</span><span className="tabular-nums">${(sub * 0.1).toFixed(2)}</span></li>
          </ul>
          <motion.p key={total} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }} aria-live="polite" className="mt-4 flex items-baseline justify-between border-t border-ink pt-4"><span className="label">Estimate</span><span className="font-display text-[2.4rem] tabular-nums">${Math.round(total).toLocaleString()}</span></motion.p>
          {season.w === null && nights >= 7 && <p className="mt-2 text-[13px] text-muted">No weekly or monthly rates in summer.</p>}
          <a href={DOCKWA} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-ink text-paper transition hover:-translate-y-px">Check availability on Dockwa <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Marina"><Hero /><Specs /><Estimator /></Page>)
