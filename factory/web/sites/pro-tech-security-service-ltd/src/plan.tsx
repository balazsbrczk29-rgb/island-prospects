import { motion } from "motion/react"
import { Page, mount, Label, ease } from "./site"
import { Planner } from "./planner"

mount(
  <Page current="Plan your system">
    <section className="mx-auto max-w-[1360px] px-5 pt-16 pb-24 md:px-10 md:pt-20" aria-labelledby="hero-title">
      <Label>Plan your system</Label>
      <h1 id="hero-title" className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[1] font-semibold tracking-[-0.035em]">
        {["Sketch your alarm system", "in one minute."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "text-signal" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease }} className="mt-6 max-w-2xl text-[18px] text-muted">Pick your property, tap the points you want covered, then call with the list in front of you.</motion.p>
      <div className="mt-12"><Planner /></div>
    </section>
  </Page>
)
