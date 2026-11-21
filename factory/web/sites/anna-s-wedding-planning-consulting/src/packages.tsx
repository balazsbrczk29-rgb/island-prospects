import { useState } from "react"
import { motion } from "motion/react"
import { Check, Phone } from "lucide-react"
import { Page, mount, Reveal, Mark, ease, usd, PHONE, TEL } from "./site"
import { PACKAGES, OTHER } from "./data"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 md:px-10 md:pt-24" aria-labelledby="pk-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] text-muted">Packages, Anna's Wedding Planning, Nassau</motion.p>
      <h1 id="pk-title" className="mt-6 max-w-[15ch] font-display text-[clamp(3rem,7vw,7.2rem)] leading-[0.92] tracking-[-0.02em]">
        {["Seven ways to say", "yes on the beach."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
        ))}
      </h1>
      <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">Published prices in US dollars. Every package can be adjusted to your number of guests and customised to your wishes.</p>
    </section>
  )
}

function Group({ group, title, n }: { group: "beach" | "cruise"; title: string; n: string }) {
  const list = PACKAGES.filter(p => p.group === group).sort((a, b) => a.price - b.price)
  const [sel, setSel] = useState(list[0].id)
  const p = list.find(x => x.id === sel)!
  return (
    <section className={`${group === "cruise" ? "bg-blush" : ""}`} aria-labelledby={`g-${group}`}>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Mark n={n}>{group === "beach" ? "Staying on island" : "Arriving by cruise ship"}</Mark>
          <h2 id={`g-${group}`} className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98]">{title}</h2>
          <ul className="mt-8 border-t border-ink/15" role="tablist">
            {list.map(x => (
              <li key={x.id} id={x.id} className="scroll-mt-28 border-b border-ink/15">
                <button type="button" role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)} className="group flex min-h-14 w-full items-baseline justify-between gap-4 py-4 text-left">
                  <span className={`font-display text-2xl transition group-hover:translate-x-1 ${sel === x.id ? "text-rose" : ""}`}>{x.name}</span>
                  <span className="text-[15px] text-muted tabular-nums">{usd(x.price)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <motion.article key={p.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="grid overflow-hidden rounded-[28px] bg-white lg:col-span-7 lg:col-start-6 md:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-[280px] bg-blush"><img src={p.img} alt={`${p.name} package, a wedding by Anna's Wedding Planning`} width={600} height={700} loading="lazy" className="absolute inset-0 size-full object-cover" /></div>
          <div className="p-7 md:p-9">
            <p className="font-display text-5xl">{usd(p.price)}</p>
            <p className="mt-1 text-[15px] text-muted">{p.name} package{p.id === "basic" ? "" : `, set up for up to ${p.guests}`}</p>
            <ul className="mt-6 space-y-2.5 text-[15px]">{p.items.map(it => <li key={it} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-rose" aria-hidden />{it}</li>)}</ul>
            <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-6 text-white transition hover:-translate-y-0.5 hover:bg-ink"><Phone className="size-4" aria-hidden /> Ask Anna about {p.name}</a>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

function More() {
  return (
    <section id="more" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10" aria-labelledby="more-title">
      <Reveal><Mark n="iii.">Also from Anna</Mark><h2 id="more-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98]">For blended families, grand days and anniversaries.</h2></Reveal>
      <ul className="mt-12 border-t border-line">
        {OTHER.map(o => (
          <li key={o.name} className="group flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-7">
            <span className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] transition group-hover:translate-x-1">{o.name}</span>
            <span className="text-muted">{o.note}</span>
          </li>
        ))}
      </ul>
      <a href={TEL} className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-rose"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
    </section>
  )
}

mount(<Page current="Packages"><Hero /><Group group="beach" n="i." title="Beach packages" /><Group group="cruise" n="ii." title="Cruise packages" /><More /></Page>)
