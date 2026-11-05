import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { Page, mount, Reveal, Label, MaskImg, reveal, ease, C, IMG } from "./site"
import { SlipCheck } from "./parts"

const SPECS = [["Dockage", "Vessels up to 125 ft"], ["Slips", "50, surge free, first-class pedestals"], ["Moorings", "Boats up to 45 ft"], ["Shore power", "30 / 50 / 100 amp"], ["Fresh water", "By reverse osmosis"], ["Ashore", "Laundry, freezers, showers, ice, wifi, pool, restaurants"]]

function Hero() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-16 pb-20 md:px-10 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Label light>The marina · Hope Town Harbour</Label>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,6.4vw,6.8rem)] leading-[0.92] font-medium tracking-[-0.02em]">
            {["Tie up beside", "the lighthouse."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
          <p className="mt-6 max-w-md text-[17px] text-paper/70">Park your boat for the night, the week, or just for a bite to eat.</p>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-10 border-t border-paper/15">
            {SPECS.map(([k, v]) => <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-paper/15 py-3.5 text-[15px]"><dt className="text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">{k}</dt><dd>{v}</dd></div>)}
          </motion.dl>
        </div>
        <div className="lg:pt-16"><SlipCheck /></div>
      </div>
    </section>
  )
}

function Photos() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-6 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-label="Marina photographs">
      <MaskImg src={IMG.marinaWide} alt="The marina on Hope Town Harbour" className="aspect-[16/10] md:col-span-8" w={1905} h={1000} />
      <div className="grid gap-6 md:col-span-4">
        <MaskImg src={IMG.aerial} alt="Aerial view of the marina" delay={0.1} className="aspect-[4/3]" w={387} h={280} />
        <MaskImg src={IMG.sportfish} alt="A sportfishing boat in the marina" delay={0.2} className="aspect-[4/3]" w={387} h={280} />
      </div>
    </section>
  )
}

function Book() {
  return (
    <section className="bg-paper-2" aria-labelledby="book-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-10">
        <Reveal><Label n="01">Reserve</Label><h2 id="book-title" className="mt-5 max-w-2xl font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1] font-medium">Book your slip on Dockwa, <em>or write to the office.</em></h2>
          <p className="mt-4 text-[15px] text-muted">Rates on request. Dockwa Elite Fleet 2024 · Marinalife 2024 Readers' Choice Awards winner.</p></Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3">
          <a href={C.dockwa} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-sea-deep">Book a slip <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          <a href={`mailto:${C.email}?subject=Slip%20enquiry`} className="inline-flex min-h-12 items-center rounded-full border border-ink px-6 transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper">{C.email}</a>
        </Reveal>
      </div>
    </section>
  )
}

void ease
mount(<Page current="Marina"><Hero /><Photos /><Book /></Page>)
