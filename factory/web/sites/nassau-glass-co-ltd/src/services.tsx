import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease } from "./site"
import { DEPTS, PHONE, TEL } from "./data"

const GROUPS = ["All", "Glass and metal", "Light and air", "Art and home"] as const

function Index() {
  const [g, setG] = useState<(typeof GROUPS)[number]>("All")
  const list = DEPTS.filter(d => g === "All" || d.group === g)
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32" aria-labelledby="s-title">
      <Label>Departments · Nassau Glass, Mackey Street</Label>
      <h1 id="s-title" className="mt-6 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em]">
        {["Ten departments,", "one showroom."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-steel" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter departments">
        {GROUPS.map(x => <button key={x} role="tab" aria-selected={g === x} type="button" onClick={() => setG(x)} className={`min-h-11 border px-5 transition hover:-translate-y-px ${g === x ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{x}</button>)}
      </div>
      <ol className="mt-10 border-t border-ink">
        <AnimatePresence initial={false}>
          {list.map((d, i) => (
            <motion.li id={d.id} key={d.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="grid scroll-mt-28 gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-6">
              <span className="font-display text-steel tnum md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-tight md:col-span-5">{d.name}</h2>
              <p className="text-[16px] text-muted md:col-span-4">{d.line}</p>
              <span className="text-[12px] font-bold tracking-[0.16em] text-muted uppercase md:col-span-2 md:text-right">{d.group}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  )
}

function Close() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="c-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7"><h2 id="c-title" className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1]">Bring the measurements, or call first.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:justify-self-end"><a href={TEL} className="inline-flex min-h-14 items-center gap-3 bg-paper px-7 text-lg text-ink tnum transition hover:-translate-y-px hover:bg-edge"><Phone className="size-5" aria-hidden /> {PHONE}</a></Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Departments"><Index /><Close /></Page>)
