import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { Page, mount, Reveal, ease, PHONE, TEL } from "./site"

const SPECS: [string, string][] = [
  ["Who it is for", "Owners at Bell Channel Club, when space is available"],
  ["Location", "On the Bell Channel inlet, Freeport, Grand Bahama"],
  ["Slips and maximum length", "Ask the office"],
  ["Depth and approach", "Ask the office"],
  ["Shore power and water", "Ask the office"],
  ["How to arrange a slip", `Call the club office on ${PHONE}`],
]

function MarinaHero() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-16 pb-10 md:px-8 md:pt-24" aria-labelledby="marina-title">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-[13px] tracking-[0.2em] text-teal uppercase">The marina</motion.p>
      <motion.h1 id="marina-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1, ease }} className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1]">A private marina on the inlet into Port Lucaya.</motion.h1>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease }} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">The docks at Bell Channel Club are for owners, offered when space is available. Everything we could not confirm from public sources is marked below, so you know exactly what to ask.</motion.p>
    </section>
  )
}

function Specs() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-24 md:px-8 md:pb-32" aria-label="Dock details">
      <Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid gap-2 py-6 md:grid-cols-[1fr_1.6fr]">
              <dt className="text-[13px] tracking-[0.16em] text-muted uppercase">{k}</dt>
              <dd className={`font-display text-2xl ${v === "Ask the office" ? "text-teal" : "text-ink"}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal delay={0.1}>
        <a href={TEL} className="mt-12 inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-8 text-lg text-paper transition hover:-translate-y-px hover:bg-teal-deep">
          <Phone className="size-5" aria-hidden /> Ask about dock availability
        </a>
      </Reveal>
    </section>
  )
}

mount(<Page current="Marina"><MarinaHero /><Specs /></Page>)
