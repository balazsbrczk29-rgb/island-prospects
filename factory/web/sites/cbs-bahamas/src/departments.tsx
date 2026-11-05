import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease } from "./site"
import { DEPTS, SHOP, TEL, PHONE, type Dept } from "./data"

const GROUPS: Array<"All" | Dept["group"]> = ["All", "Build", "Inside", "Outside"]
const BRANDS = ["PGT", "JELD-WEN", "USG", "Steelcraft", "Choice Flooring", "Milwaukee", "Kamado Joe", "Rubbermaid"]

function Index() {
  const [g, setG] = useState<(typeof GROUPS)[number]>("All")
  const list = DEPTS.filter(d => g === "All" || d.group === g)
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32" aria-labelledby="dept-title">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Label>Departments · CBS Bahamas, Nassau</Label>
          <h1 id="dept-title" className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-bold tracking-[-0.045em]">
            {["Fourteen departments,", "one counter."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "text-pine" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
            ))}
          </h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="text-[17px] leading-relaxed text-muted md:col-span-4">Building supplies, home fittings and the yard, at the Home Center on Carmichael Road and in the CBS online store. Every name below opens that department online.</motion.p>
      </div>
      <div className="mt-14 flex flex-wrap gap-2" role="tablist" aria-label="Filter departments">
        {GROUPS.map(x => (
          <button key={x} type="button" role="tab" aria-selected={g === x} onClick={() => setG(x)} className={`min-h-11 rounded-[4px] border px-5 text-[15px] transition hover:-translate-y-px ${g === x ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"}`}>{x === "All" ? "All departments" : x === "Build" ? "Building the house" : x === "Inside" ? "Inside the house" : "Outside and afloat"}</button>
        ))}
      </div>
      <ol className="mt-10 border-t-2 border-ink">
        <AnimatePresence initial={false}>
          {list.map((d, i) => (
            <motion.li key={d.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="border-b border-line">
              <a href={d.href} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 transition hover:bg-paper-2 md:grid-cols-[4rem_1.1fr_1.4fr_7rem_auto] md:px-3">
                <span className="font-display font-bold text-pine tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[1.6rem] leading-tight font-bold tracking-[-0.02em] transition group-hover:translate-x-1 md:text-[2rem]">{d.name}</span>
                <ArrowUpRight className="size-5 self-center text-pine transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:order-last" aria-hidden />
                <span className="col-start-2 col-end-4 text-[16px] text-muted md:col-start-auto md:col-end-auto">{d.line}</span>
                <span className="hidden text-[12px] tracking-[0.16em] text-muted uppercase md:block">{d.group}</span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  )
}

function Brands() {
  return (
    <section className="bg-paper-2 border-y border-line" aria-labelledby="brands-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-4">
          <Label>On the shelves</Label>
          <h2 id="brands-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] font-bold tracking-[-0.03em]">Names builders ask for.</h2>
          <p className="mt-5 max-w-sm text-[16px] text-muted">A few of the brands in the CBS online catalogue today.</p>
        </Reveal>
        <ul className="grid grid-cols-2 border-t-2 border-ink md:col-span-7 md:col-start-6 md:grid-cols-4">
          {BRANDS.map((b, i) => (
            <motion.li key={b} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6, ease }} className="border-b border-line py-7 pr-4 font-display text-[1.35rem] font-bold tracking-[-0.02em]">{b}</motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="close-title">
      <Reveal className="grid gap-10 md:grid-cols-12 md:items-end">
        <h2 id="close-title" className="font-display text-[clamp(2.4rem,5.4vw,5rem)] leading-[0.95] font-bold tracking-[-0.04em] md:col-span-7">Can't find it? Special order it.</h2>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <a href={SHOP + "shop-special-order"} className="group inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-pine px-6 font-medium text-paper transition hover:-translate-y-px hover:bg-pine-deep">See special orders <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-[4px] border-2 border-ink px-6 text-ink transition hover:-translate-y-px hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </div>
      </Reveal>
    </section>
  )
}

mount(<Page current="Departments"><Index /><Brands /><Close /></Page>)
