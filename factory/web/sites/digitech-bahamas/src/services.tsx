import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Lines, ease, PHONE, TEL } from "./site"
import { SERVICES } from "./data"

function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-24" aria-labelledby="s-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] text-muted">Services, Digitech Bahamas Ltd., Nassau</motion.p>
      <h1 id="s-title" className="mt-7 font-display text-[clamp(2.8rem,6.6vw,7rem)] leading-[0.95] font-semibold tracking-[-0.045em]"><Lines lines={["Technology handled,", "from cable to cloud."]} /></h1>
      <motion.nav initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} aria-label="Services on this page" className="mt-12 flex flex-wrap gap-2">
        {SERVICES.map(s => <a key={s.id} href={`#${s.id}`} className="rounded-full border border-ink/15 px-4 py-2.5 text-[15px] transition hover:-translate-y-0.5 hover:border-ink hover:bg-white">{s.t}</a>)}
      </motion.nav>
    </section>
  )
}

function List() {
  return (
    <section className="border-t border-line" aria-label="Services in detail">
      {SERVICES.map((s, i) => (
        <article key={s.id} id={s.id} className={`scroll-mt-24 border-b border-line ${i % 2 ? "bg-paper-2" : ""}`}>
          <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-5"><p className="font-display text-[15px] font-semibold text-signal-deep">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">{s.t}</h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{s.d}</p></Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7"><ul className="border-t border-ink/15">
              {s.more.map(m => <li key={m} className="group flex items-baseline gap-4 border-b border-ink/15 py-4 text-[17px]"><span className="size-2 shrink-0 translate-y-[-2px] rounded-full bg-signal" aria-hidden /><span className="transition group-hover:translate-x-1">{m}</span></li>)}
            </ul></Reveal>
          </div>
        </article>
      ))}
      <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-5 py-20 md:px-10">
        <a href="index.html#start" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-signal-deep">Get a quote <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
        <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 transition hover:-translate-y-0.5 hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
      </div>
    </section>
  )
}

mount(<Page current="Services"><Hero /><List /></Page>)
