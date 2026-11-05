import { motion } from "motion/react"
import { Page, mount, Label, ease, C } from "./site"
import { Picker } from "./picker"
mount(
  <Page current="Experiences">
    <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-24 md:px-10 md:pt-20" aria-labelledby="hero-title">
      <Label>Experiences at Sanctuary Bay</Label>
      <h1 id="hero-title" className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
        {["Dolphins, reefs,", "and diving on its way back."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "text-lagoon" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease }} className="mt-6 max-w-2xl text-[18px] text-muted">Every experience UNEXSO and Sanctuary Bay publish today, with prices and instant booking where it is open. Questions: {C.phone} or {C.email}.</motion.p>
      <div className="mt-12"><Picker /></div>
    </section>
  </Page>
)
