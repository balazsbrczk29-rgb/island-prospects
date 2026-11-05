import { motion } from "motion/react"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { DEPTS, EXTRA, SHOP } from "./data"
import { Page, mount, Reveal, Kicker, ease } from "./site"

const BRANDS = ["Dart", "Solo", "Marcal", "Rubbermaid"]

function Intro() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-12 md:px-10 md:pt-24" aria-labelledby="d-h1">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] text-muted">Nassau Paper Company · Departments</motion.p>
      <h1 id="d-h1" className="mt-6 max-w-[13ch] font-display text-[clamp(2.8rem,7vw,7rem)] leading-[0.94] tracking-[-0.05em]">
        {["What's on", "the shelves."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-pen" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a href={SHOP} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-pen px-6 text-[15px] text-white transition hover:-translate-y-px hover:bg-pen-deep"><ShoppingBag className="size-4" aria-hidden /> Browse the online store</a>
        <a href="index.html#quote" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-[15px] transition hover:-translate-y-px hover:border-ink">Request a supply quote <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
      </div>
    </section>
  )
}

function Grid() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10" aria-label="Departments">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {DEPTS.map((d, i) => (
          <Reveal key={d.id} delay={(i % 3) * 0.06} className={i === 1 ? "lg:row-span-2" : ""}>
            <article className={`group flex h-full flex-col justify-between gap-10 rounded-[24px] p-7 transition hover:-translate-y-0.5 ${i === 1 ? "bg-ink text-paper" : "bg-paper-2"}`}>
              <div>
                <p className={`font-display text-[15px] ${i === 1 ? "text-kraft-light" : "text-pen"}`}>{String(i + 1).padStart(2, "0")}</p>
                <h2 className={`mt-3 font-display tracking-[-0.03em] ${i === 1 ? "text-[clamp(2rem,3vw,2.8rem)] leading-[1]" : "text-[1.6rem] leading-tight"}`}>{d.name}</h2>
                <p className={`mt-3 text-[16px] leading-relaxed ${i === 1 ? "text-paper/75" : "text-ink/75"}`}>{d.line}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">{d.includes.map(t => <li key={t} className={`rounded-full px-3 py-1.5 text-[13px] ${i === 1 ? "bg-white/10" : "bg-paper"}`}>{t}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function More() {
  return (
    <section className="border-t border-line" aria-labelledby="more-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Kicker n="+">Also at the counter</Kicker><h2 id="more-title" className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-[1] tracking-[-0.04em]">More than just paper.</h2></Reveal>
        <div className="lg:col-span-8">
          <ul>
            {EXTRA.map(([t, d]) => <li key={t} className="group grid gap-2 border-t border-line py-6 last:border-b md:grid-cols-[1fr_1.2fr]"><span className="font-display text-2xl tracking-[-0.03em] transition group-hover:translate-x-1">{t}</span><span className="text-[16px] text-ink/75">{d}</span></li>)}
          </ul>
          <p className="mt-12 text-[13px] text-muted">Brands named in the store's own listings</p>
          <ul className="mt-4 flex flex-wrap gap-3">{BRANDS.map(b => <li key={b} className="rounded-full border border-ink/15 px-5 py-2.5 font-display text-lg tracking-[-0.02em]">{b}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="Departments"><Intro /><Grid /><More /></Page>)
