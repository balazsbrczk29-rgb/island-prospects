import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Index, PHONE, TEL } from "./site"
import { CAPS, U } from "./data"

const MORE: Record<string, string[]> = {
  roads: ["New road construction", "Milling of existing surfaces", "Road surfacing and rehabilitation resurfacing", "Maintenance and traffic management", "Owned fleet of heavy equipment, serviced by in-house mechanics"],
  airports: ["Airside and landside runways and support facilities", "Work in live airport environments, to operator safety and security rules", "Lynden Pindling International, Grand Bahama International and Marsh Harbour International", "Family Island runways including Bimini, Hog Cay and Norman's Cay"],
  asphalt: ["Hot mix asphalt to international specifications", "Three asphalt plants, two fully mobile", "Mobile plant erected and calibrated within six days of arrival", "Bitumen modified to Performance Grades with reactive polymers, latex or wax"],
  concrete: ["Ready mix concrete production", "Concrete mixing plant in Grand Bahama, run by BHM (GB) Co. Ltd."],
  ports: ["Port infrastructure", "Coastal defences"],
  water: ["Reverse osmosis and drinking water", "Sanitation infrastructure"],
  site: ["Site development", "Utility infrastructure", "Drilling", "Buildings"],
}
const ISO = [
  ["ISO 9001:2015", "Three quality management systems: concrete, asphalt, and civil engineering and infrastructure. Certified by Bureau Veritas."],
  ["ISO 14001:2015", "Environmental management system. Certified by Bureau Veritas."],
  ["ISO 45001:2018", "Occupational health and safety management system. Certified by Bureau Veritas."],
  ["ISO 17025:2017", "Independent testing laboratories, accredited by IAS, for soils, aggregates, concrete and asphalt to AASHTO, ASTM and BS standards."],
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:px-10 md:pt-20 lg:grid-cols-12" aria-labelledby="cap-title">
      <div className="lg:col-span-7">
        <p className="font-mono text-[12px] text-muted">Capabilities / BHM Co. Ltd. / Nassau, Grand Bahama, Abaco</p>
        <h1 id="cap-title" className="mt-6 font-display text-[clamp(2.8rem,6.4vw,6.6rem)] leading-[0.92] font-bold tracking-[-0.025em] [font-stretch:115%]">Infrastructure and the materials it is made of.</h1>
      </div>
      <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="overflow-hidden bg-paper-2 lg:col-span-5">
        <img src={U + "2024/02/025-BHM-Hog-Cay-Sept-DJI_3011-1024x768.jpg"} alt="Hog Cay, construction of a new runway and apron by BHM" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
      </motion.div>
    </section>
  )
}

function List() {
  return (
    <section className="border-t border-line" aria-label="Capabilities in detail">
      {CAPS.map((c, i) => (
        <article key={c.id} id={c.id} className={`scroll-mt-20 border-b border-line ${i % 2 ? "bg-paper-2" : ""}`}>
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-5"><p className="font-mono text-[13px] text-amber-deep">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95] font-bold [font-stretch:115%]">{c.t}</h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">{c.d}</p></Reveal>
            <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7"><ul className="border-t border-ink/20">
              {MORE[c.id].map(m => <li key={m} className="group flex gap-4 border-b border-ink/20 py-4 text-[17px]"><span className="mt-2 size-2 shrink-0 bg-amber transition group-hover:bg-ink" aria-hidden /><span className="transition group-hover:translate-x-1">{m}</span></li>)}
            </ul></Reveal>
          </div>
        </article>
      ))}
    </section>
  )
}

function Iso() {
  return (
    <section id="iso" className="scroll-mt-20 bg-asphalt text-paper" aria-labelledby="iso-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Index n="ISO" light>Certification</Index>
          <h2 id="iso-title" className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-bold [font-stretch:115%]">Certified quality, safety and environment.</h2></Reveal>
        <div className="mt-14 grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-4">
          {ISO.map(([t, d]) => <div key={t} className="bg-asphalt p-7"><p className="font-display text-2xl font-bold text-amber [font-stretch:110%]">{t}</p><p className="mt-3 text-[15px] leading-relaxed text-paper/75">{d}</p></div>)}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <a href="index.html#quote" className="group inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-amber px-6 font-medium text-ink transition hover:-translate-y-0.5">Request a quote <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          <a href={TEL} className="inline-flex min-h-12 items-center rounded-[2px] border border-paper/25 px-6 transition hover:-translate-y-0.5 hover:border-paper">{PHONE}</a>
        </div>
      </div>
    </section>
  )
}

mount(<Page><Hero /><List /><Iso /></Page>)
