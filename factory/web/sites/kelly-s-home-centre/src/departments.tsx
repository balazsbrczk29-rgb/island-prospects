import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, ShoppingBag } from "lucide-react"
import { DEPTS, SHOP } from "./data"
import { Page, mount, Reveal, ease } from "./site"

const GROUPS = [["all", "Everything"], ["home", "For the home"], ["build", "Build, fix and paint"], ["life", "Living, play and pets"]] as const
const TINTS = ["#efe1e7", "#dfece7", "#f0e6d2", "#e4e3ee", "#e9ddd3"]

function Index() {
  const [g, setG] = useState<(typeof GROUPS)[number][0]>("all")
  const list = DEPTS.filter(d => g === "all" || d.group === g)
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-10 md:pt-24" aria-labelledby="d-h1">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] tracking-[0.14em] text-muted uppercase">Kelly's House &amp; Home · Departments</motion.p>
      <h1 id="d-h1" className="mt-6 max-w-[16ch] font-display text-[clamp(2.8rem,6.4vw,6.4rem)] leading-[0.98] tracking-[-0.03em]">
        {["Every aisle at", "the Mall at Marathon."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-bloom" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter departments">
          {GROUPS.map(([k, l]) => <button key={k} role="tab" aria-selected={g === k} onClick={() => setG(k)} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${g === k ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{l}</button>)}
        </div>
        <a href={SHOP} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-bloom px-5 text-[15px] text-white transition hover:-translate-y-px hover:bg-bloom-deep"><ShoppingBag className="size-4" aria-hidden /> Shop everything online</a>
      </div>
      <motion.ul layout className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((d, i) => (
            <motion.li key={d.name} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease }}>
              <a href={d.href} className="group block">
                <span className="block aspect-square overflow-hidden rounded-[22px]" style={{ background: TINTS[i % TINTS.length] }}><img src={d.img} alt={`${d.name} at Kelly's House & Home`} loading="lazy" width={500} height={500} className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" /></span>
                <span className="mt-3 flex items-start justify-between gap-2"><span className="font-display text-[clamp(1.05rem,1.4vw,1.3rem)] leading-tight">{d.name}</span><ArrowUpRight className="mt-0.5 size-4 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <Reveal className="mt-20 rounded-[26px] bg-paper-2 p-8 md:p-12"><p className="max-w-3xl font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-snug">And don't forget the toys: Kelly's says it has the best selection in Nassau.</p></Reveal>
    </section>
  )
}

mount(<Page current="Departments"><Index /></Page>)
