import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { IMG, SERVICES } from "./data"
import { Page, mount, Reveal, Label, Photo, ease } from "./site"

const SPECS = [
  ["East End floating dock", [["Length", "approx. 357 m"], ["Beam", "approx. 70 m"], ["Lift", "vessels up to 93,500 tons"], ["Cranes", "4, with modern control systems"], ["Built by", "CSSC Qingdao Beihai Shipbuilding"], ["In service", "First docking January 2026"]]],
  ["Deep-water berth", [["Length", "1 km"], ["Water depth", "14 m"], ["Shoreside cranes", "64 t at the quayside"], ["Reach", "32 t at 12.5 m from the quayside"], ["Height", "up to 82 m above MLW"], ["Use", "Afloat repairs, underwater propulsion exchanges"]]],
  ["Coming next", [["Lucayan floating dock", "Expected late 2026"], ["Result", "A three-dock operation"], ["Programme", "$600 million redevelopment"]]],
] as const

const WORKSHOPS = ["Steel and aluminium fabrication", "Pipe fabrication", "Mechanical, for machining and equipment overhauls", "Electrical, with rewind capability and baking ovens", "LNG clean room for pump and valve overhaul", "Clean room for thruster overhaul", "A dedicated area for lifeboat and tender repairs"]

const MORE = [
  ["Project planning and scheduling", "Every project has a designated project manager; every client receives a detailed schedule for planning and execution."],
  ["Naval architects and engineers", "Certified naval architects and engineers on staff prepare workshop and fabrication drawings."],
  ["Mechanical services", "Certified mechanics and machining; engines, pumps and valves overhauled on site."],
  ["Tank cleaning", "Ballast, fuel, fresh water, slops and void spaces, among others."],
  ["Logistics", "Full logistics support for each project."],
  ["Material handling and customs brokerage", "The yard's own customs clearing and brokerage department handles equipment and materials delivered straight to the yard."],
]

const TEAM = [["Chris Earl", "Chief Executive Officer"], ["Linda Turnquest", "Chief Financial Officer"], ["Marvin Basden", "VP Environment, Quality, Facility Maintenance and Infrastructure Development"], ["Ash Sinha", "VP Commercial"], ["Adrian Baboi", "VP Cruise and Technical Support"], ["Paul Blake", "VP Operations"], ["Gary Bentinck", "VP Human Resources"]]

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 md:px-10 md:pt-24" aria-labelledby="cap-h1">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Capabilities · Grand Bahama Shipyard, Freeport</motion.p>
      <h1 id="cap-h1" className="mt-6 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,7.6rem)] leading-[0.9] tracking-[-0.035em]" style={{ fontStretch: "122%" }}>
        {["Docks, berth,", "workshops, people."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
        ))}
      </h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="text-[18px] leading-relaxed text-steel lg:col-span-5">Grand Bahama Shipyard can accommodate all types of sea-going vessels. These are the figures and services the yard publishes, set out the way a technical superintendent reads them.</motion.p>
        <div className="lg:col-span-7"><Photo src={`${IMG}2020/11/facilities-body-drydocks1.jpg`} alt="Vessel in a floating dry dock at Grand Bahama Shipyard" ratio="aspect-[16/9]" /></div>
      </div>
    </section>
  )
}

function Specs() {
  return (
    <section className="border-t border-line bg-paper-2" aria-labelledby="spec-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label n="01">Specifications</Label><h2 id="spec-title" className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>The numbers planners need.</h2></Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {SPECS.map(([title, rows], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <h3 className="border-b-2 border-ink pb-3 font-display text-2xl" style={{ fontStretch: "114%" }}>{title}</h3>
              <dl>
                {rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-line py-3.5 text-[15px] transition hover:bg-paper/70">
                    <dt className="font-mono text-[11px] tracking-[0.12em] text-steel uppercase">{k}</dt><dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-[14px] text-steel">Dock figures from the yard's February 2026 announcement; berth and crane figures from its facilities page. Confirm current figures with the planning team before fixing a window.</p>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="svc-title">
      <Reveal><Label n="02">Trades</Label><h2 id="svc-title" className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>Every service, in order of the job.</h2></Reveal>
      <ol className="mt-14 border-t border-ink/15">
        {[...SERVICES.map(([t, d, src]) => [t, d, src]), ...MORE.map(([t, d]) => [t, d, ""])].map(([t, d, src], i) => (
          <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 0.7, ease }} className="group grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-ink/15 py-6 md:grid-cols-[4rem_1fr_1.3fr_8rem]">
            <span className="font-mono text-[12px] text-steel">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] leading-tight transition group-hover:translate-x-1" style={{ fontStretch: "112%" }}>{t}</span>
            <span className="col-start-2 text-[15px] leading-relaxed text-steel md:col-start-auto">{d}</span>
            {src ? <span className="hidden aspect-[4/3] overflow-hidden bg-paper-2 md:block"><img src={`${IMG}${src}`} alt={`${t} at Grand Bahama Shipyard`} loading="lazy" width={320} height={240} className="size-full object-cover transition duration-700 group-hover:scale-[1.05]" /></span> : <span className="hidden md:block" />}
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function Workshops() {
  return (
    <section className="bg-harbour text-paper" aria-labelledby="ws-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="03" light>On-site workshops</Label>
          <h2 id="ws-title" className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>Right the first time.</h2>
          <p className="mt-6 max-w-md text-paper/75">A dedicated workshop complex beside the docks, so overhauls happen on site rather than on a freight schedule.</p>
        </Reveal>
        <ul className="lg:col-span-6 lg:col-start-7">
          {WORKSHOPS.map((w, i) => (
            <motion.li key={w} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.7, ease }} className="flex items-baseline gap-4 border-b border-paper/15 py-4 text-[17px]">
              <span className="font-mono text-[12px] text-lime">{String(i + 1).padStart(2, "0")}</span>{w}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="team-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="04">Executive team</Label>
          <h2 id="team-title" className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>Who runs the yard.</h2>
          <p className="mt-6 max-w-sm text-steel">Vision: to be the customers' yard of choice on the US Eastern Seaboard and Caribbean.</p>
        </Reveal>
        <dl className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-8">
          {TEAM.map(([n, r]) => (
            <div key={n} className="group bg-paper p-6 transition hover:bg-paper-2"><dt className="font-display text-xl transition group-hover:translate-x-1" style={{ fontStretch: "112%" }}>{n}</dt><dd className="mt-2 text-[14px] text-steel">{r}</dd></div>
          ))}
        </dl>
      </div>
      <a href="index.html#enquire" className="group mt-16 inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour">Request a docking slot <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
    </section>
  )
}

mount(<Page current="Capabilities"><Intro /><Specs /><Services /><Workshops /><Team /></Page>)
