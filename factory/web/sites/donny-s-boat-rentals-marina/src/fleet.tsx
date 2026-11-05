import { motion } from "motion/react"
import { MessageCircle } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease } from "./site"
import { BOATS, TERMS, wa } from "./data"
import Chooser from "./Chooser"

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-12 md:px-10 md:pt-20" aria-labelledby="f-title">
      <Label>Rental fleet · Green Turtle Cay</Label>
      <h1 id="f-title" className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6.6vw,6rem)] leading-[0.98]">
        {["Four boats,", "17 to 23 feet."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-turtle" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
    </section>
  )
}

function Rows() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10" aria-label="The boats">
      {BOATS.map((b, i) => (
        <article key={b.id} className="grid gap-8 border-t border-ink py-12 md:grid-cols-12 md:items-center">
          <Photo src={b.img} alt={`The ${b.name} rental boat at Donny's`} className={`aspect-[4/3] rounded-[2rem] md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`} />
          <div className={`md:col-span-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}>
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.16em] text-turtle uppercase">{b.hp} · {b.people}</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{b.name}</h2>
              <p className="mt-5 font-display text-[1.5rem] tnum">${b.day} a day <span className="text-muted">·</span> ${b.week.toLocaleString()} for 7 days</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">{b.kit.map(k => <li key={k} className="rounded-full bg-sand/70 px-3 py-1 text-[14px]">{k}</li>)}</ul>
              <p className="mt-4 text-[15px] text-muted">3-day minimum.{b.exp ? " Boating experience required." : ""}</p>
              <a href={wa(`Hi Taylor, is the ${b.name} free for my dates? From: ... For: ... days.`)} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-turtle px-6 font-bold text-paper transition hover:-translate-y-px hover:bg-ink"><MessageCircle className="size-4" aria-hidden /> Ask about the {b.name}</a>
            </Reveal>
          </div>
        </article>
      ))}
    </section>
  )
}

function Calc() {
  return (
    <section className="bg-sand/50" aria-labelledby="calc-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-28">
        <Reveal><Label>Estimate</Label><h2 id="calc-title" className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">Price your week.</h2></Reveal>
        <div className="mt-12"><Chooser /></div>
      </div>
    </section>
  )
}

function Terms() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-28" aria-labelledby="t-title">
      <Reveal><Label>Terms</Label><h2 id="t-title" className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">Good to know.</h2></Reveal>
      <ol className="mt-10 grid border-t border-ink md:grid-cols-2">
        {TERMS.map((t, i) => <li key={t} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-5 md:pr-8 md:odd:border-r md:even:pl-8"><span className="font-display text-turtle tnum">{String(i + 1).padStart(2, "0")}</span><span className="text-[16px] leading-relaxed">{t}</span></li>)}
      </ol>
    </section>
  )
}

mount(<Page current="Rent a boat"><Intro /><Rows /><Calc /><Terms /></Page>)
