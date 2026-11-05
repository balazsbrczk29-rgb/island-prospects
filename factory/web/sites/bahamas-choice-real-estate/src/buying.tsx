import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Mask, ease, reveal, PHONE, TEL, IMG } from "./site"

const STEPS = [
  { t: "Tell us your brief", d: "The island, the kind of property, your budget and your timing. We listen first, then search.", ask: "Which islands fit the way you want to live or invest?" },
  { t: "Shortlist and view", d: "We find the listings that fit and arrange the viewings.", ask: "Which features matter most when you view?" },
  { t: "Make an offer", d: "We present your offer, negotiate on your behalf and keep both sides moving.", ask: "What would make this the right price for you?" },
  { t: "Legal, banking and approvals", d: "An attorney handles the legal side. When you ask, we recommend reputable law firms and banks, and explain the government requirements that apply to you.", ask: "Ask us which approvals apply to your purchase." },
  { t: "Survey and inspection", d: "We can recommend appraisers, surveyors and inspectors so you know exactly what you are buying.", ask: "Would you like an inspection before you commit?" },
  { t: "Closing and beyond", d: "After the keys: moving and relocation help, contractors, landscaping and home decor firms we trust.", ask: "Who will look after the property when you are away?" },
]

const LINKS = [
  ["Government of The Bahamas", "Official portal for permits, ministries and forms", "https://www.bahamas.gov.bs/"],
  ["Department of Inland Revenue", "Official source for property tax and stamp duty", "https://inlandrevenue.finance.gov.bs/"],
  ["Bahamas Real Estate Association", "Check that your agent is licensed", "https://www.breabahamas.com/"],
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:px-10 md:pt-20 lg:grid-cols-12 lg:items-end" aria-labelledby="buy-title">
      <div className="lg:col-span-7">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="label text-grape">Buying from abroad</motion.p>
        <h1 id="buy-title" className="mt-5 font-display text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.96] tracking-[-0.03em]">
          {["Buying in The Bahamas,", "step by step."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }} className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">It can be daunting to buy here as a first-time buyer or as an international client. This is how Bahamas Choice walks you through it, from Nassau, with one team the whole way.</motion.p>
      </div>
      <Mask className="overflow-hidden rounded-[6px] lg:col-span-5" delay={0.2}>
        <img src={`${IMG}2023/09/IMG_0143.jpg`} alt="A Bahamian shoreline photographed by Bahamas Choice Real Estate" width={900} height={1100} fetchPriority="high" className="aspect-[4/5] w-full bg-[#9fc3c4] object-cover lg:aspect-[5/6]" />
      </Mask>
    </section>
  )
}

function Tracker() {
  const [i, setI] = useState(0)
  const s = STEPS[i]
  return (
    <section className="bg-deep text-paper" aria-labelledby="steps-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="label flex items-center gap-3 text-conch"><span>01</span><span className="h-px w-10 bg-conch/50" aria-hidden /><span>Six steps</span></p>
          <h2 id="steps-title" className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.02em]">Where you are, and what comes next.</h2>
        </Reveal>
        <div className="mt-14" role="tablist" aria-label="Buying steps">
          <div className="relative h-px bg-paper/20"><motion.div className="absolute inset-y-0 left-0 bg-conch" animate={{ width: `${((i + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.8, ease }} /></div>
          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
            {STEPS.map((x, k) => (
              <button key={x.t} role="tab" type="button" aria-selected={i === k} onClick={() => setI(k)} className={`min-h-14 rounded-[4px] px-3 py-3 text-left text-[14px] leading-snug transition hover:-translate-y-px ${i === k ? "bg-paper text-ink" : "bg-white/5 text-paper/75 hover:bg-white/10"}`}>
                <span className="label block !text-[10.5px] opacity-70">Step {k + 1}</span>{x.t}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-12" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="md:col-span-7">
              <p className="font-display text-[clamp(5rem,10vw,9rem)] leading-none text-conch/80">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] leading-tight">{s.t}</h3>
              <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-paper/75">{s.d}</p>
            </motion.div>
          </AnimatePresence>
          <div className="self-end md:col-span-4 md:col-start-9">
            <p className="label text-conch">A question to bring to the call</p>
            <p className="mt-3 font-display text-[1.6rem] leading-snug">{s.ask}</p>
            <div className="mt-8 flex gap-2">
              <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="min-h-12 rounded-full border border-paper/30 px-5 transition hover:-translate-y-px disabled:opacity-30">Previous</button>
              {i < STEPS.length - 1 ? <button type="button" onClick={() => setI(i + 1)} className="min-h-12 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Next step</button> : <a href="index.html#brief" className="inline-flex min-h-12 items-center rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Send your brief</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Official() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="official-title">
      <Reveal className="lg:col-span-4">
        <p className="label flex items-center gap-3 text-grape"><span>02</span><span className="h-px w-10 bg-grape/40" aria-hidden /><span>Official sources</span></p>
        <h2 id="official-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">Rules and rates, from the source.</h2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Taxes, duties and approvals for international buyers change. We point you to the official pages and your attorney confirms what applies to you.</p>
      </Reveal>
      <ul className="lg:col-span-7 lg:col-start-6">
        {LINKS.map(([t, d, h]) => (
          <li key={t} className="border-t border-line last:border-b">
            <a href={h} rel="noopener" className="group flex items-center justify-between gap-6 py-7">
              <span><span className="block font-display text-[clamp(1.5rem,2.4vw,2.1rem)] transition group-hover:translate-x-1">{t}</span><span className="mt-1 block text-[16px] text-muted">{d}</span></span>
              <ArrowUpRight className="size-6 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Next() {
  return (
    <section className="bg-paper-2" aria-labelledby="next-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
        <Reveal>
          <h2 id="next-title" className="max-w-2xl font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.02em]">Start with step one: your brief.</h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
          <a href="index.html#brief" className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-7 text-paper transition hover:-translate-y-px hover:bg-grape-deep">Send your brief</a>
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Buying from abroad"><Hero /><Tracker /><Official /><Next /></Page>)
