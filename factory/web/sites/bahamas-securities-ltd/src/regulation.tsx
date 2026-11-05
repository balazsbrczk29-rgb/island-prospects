import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Phone, Check } from "lucide-react"
import Record from "./Record"
import { Page, mount, Reveal, Head, ease, reveal, PHONE, TEL, REGISTER } from "./site"

const STEPS = [
  ["Open the Commission's list of registered firms", "The Securities Commission of The Bahamas publishes it as a PDF, updated regularly."],
  ["Find the firm's exact legal name", "Here: Bahamas Securities (1987) Limited."],
  ["Read the registered activity", "Here: Advising on Capital Market Instruments. A firm should only offer what it is registered for."],
  ["Match the address and P.O. box", "Here: Gresham House, Charlotte Street South, P.O. Box N-10144."],
  ["Call the number you found yourself", `Here: ${PHONE}. Never rely only on a number someone sends you.`],
]

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1320px] gap-12 px-5 pt-16 pb-20 md:px-10 md:pt-24 lg:grid-cols-12 lg:items-end" aria-labelledby="r-title">
      <div className="lg:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-green">Registration</motion.p>
        <h1 id="r-title" className="mt-6 font-display text-[clamp(2.8rem,6.2vw,6rem)] leading-[0.98] font-light tracking-[-0.02em]">
          {["Registered with the", "Securities Commission."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className={`block ${i ? "italic text-green" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">Under the Securities Industry Act, 2024, firms that advise on investments must be registered. This page shows our entry and how to check any adviser yourself.</p>
      </div>
      <Reveal delay={0.2} className="lg:col-span-5"><Record compact /></Reveal>
    </section>
  )
}

function Verify() {
  const [done, setDone] = useState<number[]>([])
  const t = (i: number) => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i])
  return (
    <section className="bg-paper-2" aria-labelledby="v-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="01" label="Verify an adviser" id="v-title" title={<>Five checks, two minutes.</>}><p className="mt-6 text-[17px] text-muted">Tick each one as you go. <span aria-live="polite">{done.length} of {STEPS.length} done.</span></p><a href={REGISTER} rel="noopener" className="group mt-6 inline-flex items-center gap-1.5 text-green"><span className="ulink">Open the register (PDF)</span><ArrowUpRight className="size-4" aria-hidden /></a></Head></div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {STEPS.map(([s, d], i) => (
            <li key={s} className="border-t border-line last:border-b">
              <button type="button" onClick={() => t(i)} aria-pressed={done.includes(i)} className="group grid w-full grid-cols-[2.75rem_1fr] gap-4 py-6 text-left">
                <span className={`flex size-9 items-center justify-center border transition ${done.includes(i) ? "border-green bg-green text-paper" : "border-ink/30 group-hover:border-ink"}`}>{done.includes(i) ? <Check className="size-4" aria-hidden /> : <span className="font-display text-lg">{i + 1}</span>}</span>
                <span><span className="block font-display text-[1.6rem] leading-tight transition group-hover:translate-x-1">{s}</span><span className="mt-1 block text-[16px] text-muted">{d}</span></span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28" aria-labelledby="n-title">
      <Reveal><h2 id="n-title" className="max-w-2xl font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.02] font-light">Checked? Then let us talk.</h2></Reveal>
      <Reveal delay={0.1}><a href={TEL} className="inline-flex min-h-13 items-center gap-2 bg-green px-7 py-3.5 text-paper transition hover:-translate-y-px hover:bg-green-deep"><Phone className="size-4" aria-hidden />Arrange a consultation</a></Reveal>
    </section>
  )
}

mount(<Page current="Registration"><Hero /><Verify /><Close /></Page>)
void ease
