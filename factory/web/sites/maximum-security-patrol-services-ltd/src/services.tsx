import { motion } from "motion/react"
import { Phone } from "lucide-react"
import Plan from "./Plan"
import { SERVICES } from "./data"
import { Page, mount, Reveal, ease, reveal, PHONE, TEL } from "./site"

const ASK: Record<string, string[]> = {
  officers: ["What kind of premises, and how many entrances?", "Which hours need cover?", "Is it ongoing or a one-off event?"],
  patrol: ["How many sites, and how far apart?", "Which hours are quiet and exposed?", "What should a patrol check at each point?"],
  alarm: ["Do you already have an alarm installed?", "Who should be contacted when it goes off?", "Is the property empty at night or weekends?"],
  investigations: ["What happened, and when?", "Who needs the findings?", "Is there footage, stock records or witnesses?"],
  consultancy: ["What worries you most about the site?", "Has anything changed: a new site, a new risk, an event?", "What protection is in place today?"],
}

function Hero() {
  return (
    <section className="drafting border-b border-line" aria-labelledby="svc-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 md:px-10 md:pt-24 md:pb-20">
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="label text-olive">Service detail</motion.p>
        <h1 id="svc-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.94] font-bold tracking-[-0.045em]">
          {["Security services in Nassau,", "one company behind them."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1, ease: reveal }}>{l}</motion.span></span>
          ))}
        </h1>
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {SERVICES.map((s, i) => <a key={s.k} href={`#${s.k}`} className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-line bg-paper px-4 text-[15px] transition hover:-translate-y-px hover:border-ink"><span className="font-display font-bold text-olive tabular-nums">{String(i + 1).padStart(2, "0")}</span>{s.t}</a>)}
        </nav>
      </div>
    </section>
  )
}

function Detail() {
  return (
    <div>
      {SERVICES.map((s, i) => (
        <section key={s.k} id={s.k} className={i % 2 ? "bg-paper-2" : ""} aria-labelledby={`${s.k}-t`}>
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-center">
            <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <p className="label flex items-center gap-3 text-olive"><span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span><span className="h-px w-10 bg-olive/40" aria-hidden /><span>{s.who}</span></p>
              <h2 id={`${s.k}-t`} className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] font-bold tracking-[-0.035em]">{s.t}</h2>
              <p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">{s.d}</p>
              <p className="label mt-10 text-ink">Have these answers ready</p>
              <ul className="mt-3 border-t border-line">
                {ASK[s.k].map(q => <li key={q} className="border-b border-line py-3 text-[16px]">{q}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
              <div className="drafting rounded-[4px] border border-line bg-paper/70 p-3 md:p-5"><Plan layer={s.k} draw={false} className="w-full" /></div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  )
}

function Close() {
  return (
    <section className="bg-deep text-paper" aria-labelledby="close-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
        <Reveal><h2 id="close-title" className="max-w-2xl font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1] font-bold tracking-[-0.035em]">Most sites need more than one. Ask for all of them in one call.</h2></Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
          <a href="index.html#proposal" className="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-paper px-7 font-medium text-ink transition hover:-translate-y-px">Request a security proposal</a>
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Service detail"><Hero /><Detail /><Close /></Page>)
