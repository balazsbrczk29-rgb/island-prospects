import { motion } from "motion/react"
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Shield, ease, C } from "./site"
import { Planner } from "./planner"

function Hero() {
  return (
    <section className="blueprint relative overflow-hidden bg-night text-paper" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:min-h-[calc(100svh-120px)] lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Label light>Security &amp; alarm service · Pitt Road, Nassau</Label></motion.div>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(2.6rem,5vw,5.2rem)] leading-[1] font-semibold tracking-[-0.035em]">
            <span className="sr-only">Pro Tech Security Service: </span>
            {["Alarm systems for", "Nassau homes", "and businesses."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i === 2 ? "text-signal-bright" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-7 max-w-[32rem] text-[18px] leading-relaxed text-paper/75">Pro Tech Security Service Limited works from Jem's Plaza on Pitt Road. Tell us what you need covered and we will talk you through it on the phone.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href={C.tel} className="inline-flex min-h-13 items-center gap-2 rounded-md bg-signal-bright px-6 py-3 text-[17px] font-semibold text-ink transition hover:-translate-y-0.5"><Phone className="size-5" aria-hidden /> Call {C.phone}</a>
            <a href="#plan" className="group inline-flex min-h-13 items-center gap-2 rounded-md border border-paper/30 px-6 py-3 text-[17px] transition hover:-translate-y-0.5 hover:border-paper">Plan your system <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.2, ease }} className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden>
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            {[180, 140, 100, 60].map(r => <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#3fd49a" strokeOpacity=".18" />)}
            <path d="M200 20v360M20 200h360" stroke="#3fd49a" strokeOpacity=".12" />
            <motion.g style={{ originX: "200px", originY: "200px" }} animate={{ rotate: 360 }} transition={{ duration: 6, ease: "linear", repeat: Infinity }}>
              <path d="M200 200 L380 200 A180 180 0 0 0 327 73 Z" fill="url(#sweep)" />
            </motion.g>
            {[[290, 120], [110, 260], [250, 300], [140, 130]].map(([x, y], i) => (
              <g key={i}><circle cx={x} cy={y} r="12" fill="none" stroke="#3fd49a" className="ping" style={{ animationDelay: `${i * 0.6}s` }} /><circle cx={x} cy={y} r="5" fill="#3fd49a" /></g>
            ))}
            <defs><linearGradient id="sweep" x1="1" y1="0.5" x2="0.6" y2="0"><stop offset="0" stopColor="#3fd49a" stopOpacity=".45" /><stop offset="1" stopColor="#3fd49a" stopOpacity="0" /></linearGradient></defs>
          </svg>
          <Shield className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-paper" />
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    { icon: Phone, k: "Call", v: C.phone, href: C.tel },
    { icon: Phone, k: "From the US", v: C.us, href: C.usTel },
    { icon: MapPin, k: "Office", v: "Jem's Plaza, Pitt Road", href: "#find" },
    { icon: Clock, k: "Hours", v: "Listed as 24 hours", href: C.tel },
  ]
  return (
    <section className="border-b border-line bg-white" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1360px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.li key={it.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-line sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={it.href} className="group flex items-start gap-4 px-5 py-7 transition hover:bg-paper md:px-8">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-paper-2 text-signal transition group-hover:bg-signal group-hover:text-paper"><it.icon className="size-5" aria-hidden /></span>
              <span><span className="block text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">{it.k}</span><span className="mt-1 block font-display text-[1.35rem] font-semibold tracking-tight">{it.v}</span></span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function PlanSection() {
  return (
    <section id="plan" className="scroll-mt-24" aria-labelledby="plan-title">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-3xl">
          <Label n="01">Plan your system</Label>
          <h2 id="plan-title" className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em]">Mark the doors and windows that worry you.</h2>
          <p className="mt-5 text-[18px] text-muted">Choose your property type and tap each entry point. You get a short list to read out when you call, so the first conversation is quick and specific.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12"><Planner compact /></Reveal>
      </div>
    </section>
  )
}

const PROTECT = [
  ["Homes", "Alarm systems for houses and apartments: doors, windows and the rooms that matter."],
  ["Shops", "Cover for shop fronts, tills and stockrooms, open hours and after hours."],
  ["Offices", "Entrances, file rooms and equipment protected around the working day."],
  ["Warehouses and yards", "Loading doors and large spaces where movement must be noticed."],
]
function Protect() {
  return (
    <section id="protect" className="scroll-mt-24 bg-paper-2" aria-labelledby="protect-title">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <Label n="02">What we protect</Label>
          <h2 id="protect-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.03em]">Security and alarm systems, for every kind of door.</h2>
        </Reveal>
        <ol className="border-t border-steel/30">
          {PROTECT.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7, ease }} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-steel/30 py-7 md:grid-cols-[4rem_1fr_1.3fr]">
              <span className="font-display text-[15px] font-semibold text-signal">0{i + 1}</span>
              <span className="font-display text-[1.8rem] font-semibold tracking-tight transition group-hover:translate-x-1">{t}</span>
              <span className="col-start-2 text-[16px] text-muted md:col-start-auto">{d}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Pro Tech Security?", `At ${C.address}, New Providence. Postal address ${C.box}.`],
  ["How do I get a quote?", `Call ${C.phone}. Use the planner on this page first so you can say exactly which doors, windows and rooms you want covered.`],
  ["Can I call from the United States?", `Yes. The US line is ${C.us}.`],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="faq-title">
      <Reveal><Label n="03">Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.03em]">Before you call.</h2></Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="min-h-14 py-6 text-left font-display text-xl font-semibold hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-[17px] text-muted">{a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Find() {
  return (
    <section id="find" className="scroll-mt-24 bg-paper-2" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="04">Find us</Label>
          <h2 id="find-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.03em]">Jem's Plaza, Pitt Road.</h2>
          <p className="mt-5 text-[18px] text-muted">{C.address}. {C.box}.</p>
          <a href={C.tel} className="mt-9 block rounded-xl bg-signal-bright p-7 text-ink transition hover:-translate-y-0.5">
            <span className="text-[12px] font-semibold tracking-[0.16em] uppercase">Call</span>
            <span className="mt-2 block font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold tracking-tight">{C.phone}</span>
            <span className="mt-1 block text-[15px]">From the US {C.us}</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[400px] overflow-hidden rounded-xl border border-line">
          <iframe title="Map of Pitt Road, Nassau" loading="lazy" className="h-[400px] w-full lg:h-full" src="https://www.google.com/maps?q=Jem's+Plaza,+Pitt+Road,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><PlanSection /><Protect /><Questions /><Find /></Page>)
