import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { rateFor } from "./Planner"
import { Page, mount, Reveal, Head, ease, reveal, BOOK, IMG } from "./site"

const TIERS = [["1 day", 475, 1], ["2 days", 450, 2], ["3 to 6 days", 330, 3], ["7+ days", 303, 7]] as const
const DELIVERY = [["Man-O-War Cay", "Free pickup"], ["Elbow Cay, Marsh Harbour", "Free if you return our team member to Man-O-War"], ["Elbow Cay, Hope Town, Guana Cay, Scotland Cay, Marsh Harbour", "$100 per direction"], ["Treasure Cay, Little Harbour", "$300 per direction"]]
const ADDONS = [["A Night Out", "$50/hr", "A captain runs you to dinner and back. Man-O-War clients only."], ["Get Acquainted", "$100/hr", "A captain shows you the ins and outs of the area. Based on availability."], ["Snorkel set", "from $5/day", "Subject to availability."]]

function Hero() {
  const [d, setD] = useState(7)
  const r = rateFor(d)
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-14 pb-20 md:px-10 md:pt-20 lg:grid-cols-12" aria-labelledby="r-title">
      <div className="lg:col-span-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-sea">Boats and rates</motion.p>
        <h1 id="r-title" className="mt-6 font-display text-[clamp(2.3rem,5vw,5rem)] leading-[1.02] font-medium tracking-[-0.045em]">
          {["The longer you float,", "the more you save."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-sea" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <p className="mt-6 max-w-md text-[17px] text-muted">24 ft Key West, seats 8, 250 hp. Rates are VAT exclusive; rentals run on a 24-hour period.</p>
        <div className="mt-10 rounded-[20px] bg-paper-2 p-6 md:p-8">
          <label htmlFor="d" className="flex items-baseline justify-between"><span className="label text-muted">How many days?</span><span className="font-display text-3xl font-medium tabular-nums">{d}</span></label>
          <input id="d" type="range" min={1} max={14} value={d} onChange={e => setD(+e.target.value)} className="mt-3 w-full accent-[#0f6f7a]" />
          <p className="mt-4 flex items-baseline justify-between border-t border-ink/20 pt-4"><span className="text-[16px]">${r}/day × {d}</span><span className="font-display text-[2rem] font-medium tabular-nums">${(r * d).toLocaleString()}</span></p>
          <a href={BOOK} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-ink font-semibold text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check availability &amp; book <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <ul className="border-t border-line">
          {TIERS.map(([t, p, min]) => {
            const on = rateFor(d) === p
            return <li key={t} className={`flex items-baseline justify-between border-b border-line px-3 py-6 transition ${on ? "bg-aqua/40" : ""}`} aria-current={on ? "true" : undefined}><span className="font-display text-[1.3rem] font-medium">{t}</span><span className="font-display text-[2rem] font-medium tabular-nums">${p}<span className="text-[1rem] text-muted">/day</span></span><span className="sr-only">from {min} days</span></li>
          })}
        </ul>
        <img src={`${IMG}6df890b0-9e6c-471c-b4ab-88b77621febc/Abaco-Boat-Rental-19.jpg`} alt="The rental boat anchored in clear water" width={900} height={600} className="mt-8 aspect-[3/2] w-full rounded-[20px] bg-[#7fb9c2] object-cover" />
      </div>
    </section>
  )
}

function Tables() {
  return (
    <section className="bg-paper-2" aria-labelledby="t-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        <div>
          <Head index="01" label="Delivery" id="t-title" title={<>Getting your boat.</>} />
          <dl className="mt-8 border-t border-line">{DELIVERY.map(([k, v]) => <div key={k} className="grid gap-1 border-b border-line py-4 md:grid-cols-[1.3fr_1fr]"><dt className="text-[16px]">{k}</dt><dd className="font-display font-medium">{v}</dd></div>)}</dl>
          <a href="index.html#delivery" className="mt-6 inline-flex items-center gap-1.5 text-sea"><span className="ulink">Price your delivery on the chart</span><ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
        <div>
          <Head index="02" label="Add-ons" id="a-title" title={<>Make it yours.</>} />
          <ul className="mt-8 border-t border-line">{ADDONS.map(([t, p, d]) => <Reveal key={t}><li className="border-b border-line py-5"><p className="flex justify-between font-display text-[1.2rem] font-medium"><span>{t}</span><span className="text-sea">{p}</span></p><p className="mt-1 text-[16px] text-muted">{d}</p></li></Reveal>)}</ul>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="Rates"><Hero /><Tables /></Page>)
void ease
