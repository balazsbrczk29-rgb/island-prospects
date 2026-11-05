import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Label, ease, reveal, GROUPS } from "./site"

mount(
  <Page current="Practice groups">
    <section className="mx-auto max-w-[1400px] px-5 pt-20 pb-16 md:px-10 md:pt-28" aria-labelledby="hero-title">
      <Label>Practice groups</Label>
      <h1 id="hero-title" className="mt-8 max-w-[16ch] font-display text-[clamp(3rem,7vw,7.4rem)] leading-[0.95] font-light tracking-[-0.025em]">
        {["Twelve groups.", "One firm."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className={`block ${i ? "text-green italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Founded principally as a corporate and commercial firm, McKinney, Bancroft &amp; Hughes today practises general law across twelve groups.</p>
    </section>
    <section className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10" aria-label="All practice groups">
      <ol className="border-t border-ink/20">
        {GROUPS.map(([g, d], i) => (
          <motion.li key={g} id={g.replace(/\W+/g, "-").toLowerCase()} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.05, duration: 0.8, ease }} className="group scroll-mt-28 border-b border-ink/15">
            <a href="index.html#consult" className="grid gap-2 py-8 md:grid-cols-[4rem_1.6fr_1fr_auto] md:items-baseline">
              <span className="font-display text-brass italic">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-light transition group-hover:translate-x-1 group-hover:text-green">{g}</h2>
              <p className="text-[15px] text-muted">{d}</p>
              <ArrowUpRight className="hidden size-5 opacity-30 transition group-hover:opacity-100 md:block" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ol>
    </section>
  </Page>
)
