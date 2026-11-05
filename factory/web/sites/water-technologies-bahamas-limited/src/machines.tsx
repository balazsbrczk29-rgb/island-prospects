import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Page, mount, Reveal, Label, ease, reveal } from "./site"
import { Machine, Flow, Demo } from "./parts"

const TYPES = [
  { t: "Stand-up machines", d: "The traditional floor-standing Air2Water unit, for a kitchen, break room or reception.", tag: "Homes and offices" },
  { t: "Countertop units", d: "Portable machines that sit on a counter and make drinking water where you are.", tag: "Kitchens and small offices" },
  { t: "Mobile and larger machines", d: "Ask about mobile units and industrial water machines for sites and bigger demand.", tag: "Ask the team" },
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 pt-16 pb-16 md:px-10 md:pt-24 lg:grid-cols-12" aria-labelledby="m-title">
      <div className="lg:col-span-8">
        <p className="label text-deep">Machines · Air2Water by Water Technologies Bahamas</p>
        <h1 id="m-title" className="display mt-8 text-[clamp(3rem,8vw,8.4rem)]">
          {[["A machine for", ""], ["every water cooler.", "text-deep"]].map(([l, c], i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <p className="mt-8 max-w-xl text-[19px] leading-relaxed text-ink/80">Pure drinking water produced in your own home or office, through stand-up machines and portable countertop units.</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease }} className="mx-auto w-[min(56vw,280px)] lg:col-span-3 lg:col-start-10"><Machine className="h-auto w-full" /></motion.div>
    </section>
  )
}

function Types() {
  return (
    <section className="border-t border-line bg-white" aria-labelledby="t-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-28">
        <Reveal><Label n="00">The range</Label><h2 id="t-title" className="display mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)]">Three ways to make it.</h2></Reveal>
        <ol className="mt-14 border-t border-ink">
          {TYPES.map((x, i) => (
            <motion.li key={x.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="group grid gap-3 border-b border-line py-8 md:grid-cols-[4rem_1.2fr_1.4fr_auto] md:items-baseline">
              <span className="font-display text-sm text-deep tabular-nums">0{i + 1}</span>
              <h3 className="display text-[clamp(1.7rem,2.6vw,2.4rem)] transition group-hover:translate-x-1">{x.t}</h3>
              <p className="text-muted">{x.d}</p>
              <a href="#demo" className="inline-flex items-center gap-2 text-[15px] text-deep">{x.tag}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

mount(<Page current="Machines"><Hero /><Types /><Flow n="01" /><Demo n="02" /></Page>)
