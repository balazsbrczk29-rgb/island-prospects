import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease } from "./site"
import { WEDDINGS, PHONE, TEL } from "./data"

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-10 md:px-10 md:pt-24" aria-labelledby="w-title">
      <Label>Published weddings · Bahamas Bridal Affairs</Label>
      <h1 id="w-title" className="mt-6 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] font-medium tracking-[-0.02em]">
        {["From the Ocean Club", "to the page."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Two weddings planned by Bahamas Bridal Affairs and featured by bridal magazines in Canada and the United States, with the credits as published.</motion.p>
    </section>
  )
}

function Features() {
  const [tag, setTag] = useState<"All" | "Paradise Island" | "Nassau">("All")
  const list = WEDDINGS.filter(w => tag === "All" || w.tag === tag)
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36" aria-label="Featured weddings">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by place">
        {(["All", "Paradise Island", "Nassau"] as const).map(t => (
          <button key={t} role="tab" aria-selected={tag === t} type="button" onClick={() => setTag(t)} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${tag === t ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-12 grid gap-8">
        <AnimatePresence initial={false}>
          {list.map((w, i) => (
            <motion.article key={w.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} className={`grid gap-10 rounded-[2rem] p-8 md:grid-cols-12 md:p-12 ${i % 2 ? "bg-glass/50" : "bg-blush/60"}`}>
              <div className="md:col-span-6">
                <p className="text-[12px] tracking-[0.24em] text-sea uppercase">{w.mag} · {w.year} · {w.where}</p>
                <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02]">{w.title}</h2>
                <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted">{w.note}</p>
                <a href={w.url} className="group mt-7 inline-flex min-h-11 items-center gap-2 text-[15px]">Read it in {w.mag} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              </div>
              <dl className="divide-y divide-ink/10 border-y border-ink/15 md:col-span-5 md:col-start-8 md:self-center">
                {w.credits.map(([k, v]) => <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-3.5"><dt className="text-[12px] tracking-[0.18em] text-muted uppercase">{k}</dt><dd className="font-display text-[1.1rem]">{v}</dd></div>)}
              </dl>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="c-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7"><h2 id="c-title" className="font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[1] font-medium">Yours could be next.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:justify-self-end">
          <a href="index.html#date" className="inline-flex min-h-14 items-center rounded-full bg-paper px-7 text-lg text-ink transition hover:-translate-y-px hover:bg-glass">Check your wedding date</a>
          <a href={TEL} className="mt-4 flex items-center gap-2 text-[15px] text-paper/70 hover:text-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Published weddings"><Intro /><Features /><Close /></Page>)
