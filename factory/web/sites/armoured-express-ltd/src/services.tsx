import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { Page, mount, Reveal, ease, reveal, PHONE, TEL } from "./site"

const S = [
  { id: "cit", co: "Armoured Express", t: "Cash in transit", d: "Cash collected by highly trained, uniformed and armed guards, carried in secure locked transit bags inside secure armoured vehicles, with surveillance-enabled cash-in-transit from pickup to hand-over.", ask: ["Where and how often do you need collections?", "Where should the cash be delivered?", "Roughly what volume moves on a typical day?"] },
  { id: "atm", co: "Armoured Express", t: "ATM services", d: "The company was the first in The Bahamas to cater to the demand for ATM services. It specialises in replenishing ATMs and providing first-line maintenance.", ask: ["How many machines, and where?", "How often do they run low?", "Do you need maintenance as well as fills?"] },
  { id: "air", co: "Armoured Express", t: "Family Island air courier", d: "Air courier solutions for consignments that need to reach the Family Islands securely.", ask: ["Which island, and which settlement?", "Cash, valuables or documents?", "Regular run or one-off?"] },
  { id: "guards", co: "Security Services (Bah.) Ltd.", t: "Static guards", d: "Officers stationed at your premises, from the sister company, backed by Armoured Services Officers cross-trained in physical security.", ask: ["How many posts?", "Which hours?", "What does a guard need to watch?"] },
  { id: "aviation", co: "Security Services (Bah.) Ltd.", t: "Aviation security", d: "Security services for aviation clients, from the sister company.", ask: ["Which airport or facility?", "Which operations need cover?", "Start date?"] },
]

function Hero() {
  return (
    <section className="border-b border-line" aria-labelledby="s-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-14 md:px-10 md:pt-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-brass">Services · Armoured Express and Security Services</motion.p>
        <h1 id="s-title" className="mt-5 max-w-5xl text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          {["Five services,", "one chain of custody."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-brass" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {S.map((s, i) => <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-[15px] transition hover:-translate-y-px hover:border-ink"><span className="font-bold text-brass tabular-nums">{String(i + 1).padStart(2, "0")}</span>{s.t}</a>)}
        </nav>
      </div>
    </section>
  )
}

function Detail() {
  return (
    <div>
      {S.map((s, i) => (
        <section key={s.id} id={s.id} className={i % 2 ? "bg-paper-2" : ""} aria-labelledby={`${s.id}-t`}>
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-2"><p className="text-[clamp(3rem,6vw,5.5rem)] leading-none font-extrabold tracking-[-0.05em] text-brass/80 tabular-nums">{String(i + 1).padStart(2, "0")}</p></Reveal>
            <Reveal delay={0.05} className="lg:col-span-5">
              <p className="label text-muted">{s.co}</p>
              <h2 id={`${s.id}-t`} className="mt-3 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1] font-extrabold tracking-[-0.04em]">{s.t}</h2>
              <p className="mt-5 max-w-lg text-[18px] leading-relaxed text-muted">{s.d}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="label text-ink">Have these answers ready</p>
              <ul className="mt-3 border-t border-line">{s.ask.map(q => <li key={q} className="border-b border-line py-3 text-[16px]">{q}</li>)}</ul>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  )
}

function Close() {
  return (
    <section className="bg-steel text-paper" aria-labelledby="c-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
        <Reveal><h2 id="c-title" className="max-w-2xl text-[clamp(2.2rem,4.4vw,4rem)] leading-[1] font-extrabold tracking-[-0.04em]">Combine services in one call.</h2></Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
          <a href="index.html#planner" className="inline-flex min-h-12 items-center justify-center bg-paper px-7 font-semibold text-ink transition hover:-translate-y-px">Request a service proposal</a>
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Services"><Hero /><Detail /><Close /></Page>)
void ease
