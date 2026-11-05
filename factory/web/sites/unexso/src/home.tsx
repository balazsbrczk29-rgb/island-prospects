import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Marquee } from "@/components/magicui/marquee"
import { Page, mount, Reveal, Label, ease, C } from "./site"
import { LOG } from "./data"
import { Picker } from "./picker"

const W = "https://static.wixstatic.com/media/"
const IMG = {
  care: W + "59a57c_2b64ba4bc16942bdba3e234a26811c8a~mv2.jpg/v1/fill/w_800,h_407,fp_0.47_0.31,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7608.jpg",
  expert: W + "59a57c_4566e22cb3a34d4488147ccd68ba7182~mv2.jpg/v1/fill/w_800,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/tristian%20strategy.jpg",
  encounter: W + "59a57c_0b805913a89743fdb3fe1b78de7fb6ba~mv2.jpg/v1/fill/w_506,h_317,fp_0.44_0.33,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7620_edited.jpg",
}

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-14 pb-16 md:px-10 lg:min-h-[calc(100svh-110px)] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Label>Since 1965 · Sanctuary Bay · Freeport, Grand Bahama</Label></motion.div>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(3rem,6.6vw,7rem)] leading-[0.92] font-extrabold tracking-[-0.035em]">
            <span className="sr-only">UNEXSO, Underwater Explorers Society: </span>
            {["Meet the", "dolphins of", "Sanctuary Bay."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i === 2 ? "text-lagoon" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-7 max-w-[32rem] text-[18px] leading-relaxed text-muted">Encounter, swim and work alongside Atlantic bottlenose dolphins in a natural 9-acre lagoon, with UNEXSO, one of the first in The Bahamas to offer recreational scuba, back in 1965.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={C.book} className="group inline-flex min-h-13 items-center gap-2 rounded-full bg-sun px-7 py-3 text-[17px] font-semibold transition hover:-translate-y-0.5">Book an experience <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href="experiences.html" className="inline-flex min-h-13 items-center rounded-full border border-ink px-7 py-3 text-[17px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-foam">See all experiences</a>
          </motion.div>
          <p className="mt-5 text-[14px] text-muted">From $50 per adult for the Snorkel Sea Safari. Prices exclude VAT.</p>
        </div>
        <div className="relative h-[110vw] max-h-[620px] sm:h-[560px]">
          <motion.div className="absolute top-0 right-0 h-[72%] w-[86%] overflow-hidden rounded-[32px] bg-lagoon-soft" initial={{ clipPath: "inset(100% 0 0 0 round 32px)" }} animate={{ clipPath: "inset(0% 0 0 0 round 32px)" }} transition={{ delay: 0.25, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}>
            <img src={IMG.encounter} alt="A guest meeting a dolphin at Sanctuary Bay" width={506} height={317} fetchPriority="high" className="size-full object-cover" />
          </motion.div>
          <motion.div className="absolute bottom-0 left-0 h-[46%] w-[62%] overflow-hidden rounded-[28px] border-8 border-foam bg-lagoon-soft" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1, ease }}>
            <img src={IMG.care} alt="Dolphins receiving care at Sanctuary Bay" width={800} height={407} className="size-full object-cover" />
          </motion.div>
          <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1, type: "spring", stiffness: 180, damping: 16 }} className="absolute right-4 bottom-[22%] grid size-28 place-items-center rounded-full bg-deep text-center text-foam shadow-xl">
            <span><span className="block font-display text-3xl font-extrabold leading-none">1965</span><span className="mt-1 block text-[10px] tracking-[0.14em] uppercase">Est.</span></span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    { icon: ArrowUpRight, k: "Book online", v: "Instant booking", href: C.book },
    { icon: Phone, k: "Bookings", v: C.phone, href: C.tel },
    { icon: MapPin, k: "Where", v: "Sanctuary Bay, Sterling Circle", href: "#visit" },
    { icon: Clock, k: "Open", v: "Mon to Fri, 9 to 5", href: "#visit" },
  ]
  return (
    <section className="bg-deep text-foam" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1400px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.li key={it.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-foam/12 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={it.href} className="group flex items-start gap-4 px-5 py-7 transition hover:bg-abyss md:px-8">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foam/10 transition group-hover:bg-sun group-hover:text-ink"><it.icon className="size-5" aria-hidden /></span>
              <span><span className="block text-[12px] font-semibold tracking-[0.14em] text-sun uppercase">{it.k}</span><span className="mt-1 block font-display text-[1.35rem] leading-tight font-bold">{it.v}</span></span>
            </a>
          </motion.li>
        ))}
      </ul>
      <div className="border-t border-foam/10 py-4">
        <Marquee className="[--duration:45s] [--gap:2.5rem]" pauseOnHover>
          {["Dolphin Encounter", "Dolphin Swim", "Snorkel Sea Safari", "Glass Bottom Boat", "Eco-Snorkel", "Marine Mammal Specialist", "Shark Dive, returning", "Wreck Dive, returning"].map(s => <span key={s} className="flex items-center gap-10 font-display text-xl font-bold text-foam/80">{s}<span className="size-1.5 rounded-full bg-sun" aria-hidden /></span>)}
        </Marquee>
      </div>
    </section>
  )
}

function Experiences() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="exp-title">
      <Reveal className="max-w-3xl">
        <Label n="01">Book today</Label>
        <h2 id="exp-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">Pick your way into the water.</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-10"><Picker onlyBookable /></Reveal>
    </section>
  )
}

function Gauge({ year, p }: { year: string; p: number }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden>
      <svg viewBox="0 0 200 200" className="size-full">
        <circle cx="100" cy="100" r="92" fill="#072530" stroke="#bfe3e3" strokeOpacity=".3" strokeWidth="2" />
        {Array.from({ length: 60 }).map((_, i) => { const a = (i / 60) * Math.PI * 2 - Math.PI / 2; const r1 = i % 5 ? 82 : 76; return <line key={i} x1={100 + Math.cos(a) * r1} y1={100 + Math.sin(a) * r1} x2={100 + Math.cos(a) * 86} y2={100 + Math.sin(a) * 86} stroke="#bfe3e3" strokeOpacity={i % 5 ? 0.35 : 0.8} strokeWidth={i % 5 ? 1 : 2} /> })}
        <circle cx="100" cy="100" r="70" fill="none" stroke="#ffd23f" strokeWidth="3" strokeDasharray={`${p * 440} 440`} transform="rotate(-90 100 100)" strokeLinecap="round" />
        <g transform={`rotate(${p * 360 - 90} 100 100)`}><line x1="100" y1="100" x2="168" y2="100" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" /></g>
        <circle cx="100" cy="100" r="5" fill="#ffd23f" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="mt-24"><p className="text-[10px] tracking-[0.22em] text-lagoon-soft uppercase">Dive log</p><AnimatePresence mode="wait"><motion.p key={year} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="font-display text-4xl font-extrabold text-foam">{year}</motion.p></AnimatePresence></div>
      </div>
    </div>
  )
}

function Log() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] })
  const [i, setI] = useState(0)
  const [p, setP] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", v => { setP(v); setI(Math.min(LOG.length - 1, Math.max(0, Math.floor(v * LOG.length)))) })
  const bg = useTransform(scrollYProgress, [0, 1], ["#0b3b4a", "#041a22"])
  return (
    <motion.section id="log" ref={ref} style={{ backgroundColor: bg }} className="scroll-mt-24 text-foam" aria-labelledby="log-title">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-32">
        <Reveal><Label n="02" light>Since 1965</Label><h2 id="log-title" className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">Sixty years below the surface.</h2>
          <p className="mt-5 max-w-xl text-[17px] text-foam/70">"The exploration of the seas is not the private domain of the scientist, nor the industrialist, nor the military, nor the diving sportsman. Its pursuit belongs to all people." Al Tillman, UNEXSO, 1966.</p></Reveal>
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-28 md:px-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100svh-120px)] lg:self-start"><div className="flex h-full items-center py-10"><Gauge year={LOG[i].y} p={p} /></div></div>
        <ol>
          {LOG.map((e, k) => (
            <li key={e.y} className={`flex min-h-[55vh] items-center transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-40"}`}>
              <div>
                <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none font-extrabold text-sun">{e.y}</p>
                <p className="mt-3 font-display text-2xl font-bold">{e.t}</p>
                <p className="mt-2 max-w-md text-[17px] text-foam/75">{e.d}</p>
                {e.img && <img src={e.img} alt={`UNEXSO archive: ${e.t}, ${e.y}`} width={960} height={720} loading="lazy" className="mt-6 aspect-[4/3] w-full max-w-md rounded-2xl bg-deep object-cover grayscale-[30%]" />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  )
}

function Lab() {
  return (
    <section id="lab" className="scroll-mt-24" aria-labelledby="lab-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-[32px] bg-lagoon-soft"><img src={IMG.expert} alt="A Sanctuary Bay dolphin expert at work" width={800} height={407} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]" /></Reveal>
        <Reveal delay={0.1}>
          <Label n="03">UNEXSO Lab</Label>
          <h2 id="lab-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">Education, research and a reef to replant.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">The UNEXSO Lab at Sanctuary Bay supports in-house research, education and training, with a focus on native wildlife. With the Perry Institute for Marine Science, UNEXSO plants coral domes to support reef restoration, and guests can see the work up close.</p>
          <a href={`mailto:${C.email}?subject=${encodeURIComponent("Educational visit")}`} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-6 transition hover:-translate-y-0.5 hover:bg-ink hover:text-foam">Plan a school visit</a>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is UNEXSO now?", `At Sanctuary Bay, Sterling Circle, Freeport, Grand Bahama. Open ${C.hours.toLowerCase()}.`],
  ["Can I still dive with UNEXSO?", "The diving programme is relaunching at Sanctuary Bay, with shark, wreck and concierge diving returning soon. Email to be told when it reopens."],
  ["Are children welcome?", "Yes. The Dolphin Encounter and Glass Bottom Boat are for all ages, and the Snorkel Sea Safari has children's prices."],
  ["How do I book?", `Book online through the booking links on this page, call ${C.phone} (international ${C.intl}) or email ${C.email}.`],
]
function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 bg-foam-2" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        <Reveal>
          <Label n="04">Visit</Label>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">Sterling Circle, Freeport.</h2>
          <Accordion type="single" collapsible defaultValue="q0" className="mt-10 border-t border-line">
            {FAQ.map(([q, a], k) => <AccordionItem key={q} value={`q${k}`} className="border-line"><AccordionTrigger className="min-h-14 py-5 text-left font-display text-xl font-bold hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-5 text-[16px] text-muted">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="min-h-[340px] flex-1 overflow-hidden rounded-[28px] border border-line"><iframe title="Map of Sanctuary Bay, Freeport, Grand Bahama" loading="lazy" className="h-full min-h-[340px] w-full" src="https://www.google.com/maps?q=Sanctuary+Bay,+Sterling+Circle,+Freeport,+Grand+Bahama&output=embed" /></div>
          <a href={C.tel} className="rounded-[28px] bg-deep p-7 text-foam transition hover:-translate-y-0.5"><span className="text-[12px] font-semibold tracking-[0.14em] text-sun uppercase">Bookings and customer service</span><span className="mt-2 block font-display text-[2rem] font-extrabold">{C.phone}</span><span className="text-foam/70">International {C.intl} · {C.email}</span></a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Experiences /><Log /><Lab /><Visit /></Page>)
