import { lazy, Suspense } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import BlurText from "@/components/reactbits/TextAnimations/BlurText/BlurText"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, ease, PHONE, TEL } from "./site"

const Scene = lazy(() => import("./Scene"))
const Cinematic = lazy(() => import("./Cinematic"))

const FACTS = [
  ["Gated", "A quiet, gated community on the Bell Channel inlet."],
  ["Two waters", "Units sit on both the canal and the beach."],
  ["Owners' marina", "Private docks for owners, when space allows."],
  ["Heated pool", "Plus tennis courts and an owners' library."],
]
const LIVING = [
  ["Heated pool", "For owners and their guests."],
  ["Tennis courts", "On the grounds, inside the gate."],
  ["Owners' library", "A quiet room shared by the club."],
  ["Storage garages", "A limited number, for boats, carts and gear."],
  ["Reverse osmosis water", "Supplied to every unit."],
  ["A maintained beach", "Looked after by the homeowners' association."],
]
const FAQ = [
  ["Can visiting boats dock at Bell Channel Club?", `The marina is a private marina for owners, offered when space is available. Call the club office on ${PHONE} to ask about dock availability.`],
  ["Where is Bell Channel Club & Marina?", "On the Bell Channel inlet in Freeport, Grand Bahama. The complex sits on both the canal and the beach, and its units overlook the inlet into Port Lucaya Marketplace."],
  ["What amenities does the club have?", "A heated pool, tennis courts, an owners' library, a limited number of storage garages and a reverse osmosis water system serving all units. The homeowners' association maintains the beach."],
]

function Hero() {
  return (
    <section className="relative isolate h-[calc(100svh-96px)] min-h-[640px] overflow-hidden bg-[#2a4a55]" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<div className="size-full bg-gradient-to-b from-[#6f8fa0] via-[#e2b48c] to-[#173f49]" />}><Cinematic /></Suspense>
      </div>
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pt-10 pb-8 md:px-10 md:pt-14 md:pb-10">
        <div className="flex items-start justify-between text-[11px] tracking-[0.22em] text-white/85 uppercase">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>Bell Channel · Freeport · Grand Bahama</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }} className="hidden md:block">26.51° N · 78.64° W</motion.span>
        </div>
        <div className="grid items-end gap-8 md:grid-cols-[1fr_360px]">
          <h1 id="hero-title" className="font-display text-[clamp(3.2rem,8.6vw,9rem)] leading-[0.88] tracking-[-0.025em] text-white [text-shadow:0_2px_40px_rgba(20,48,58,.35)]">
            {["Between the canal", "and the beach."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span className={`block ${i === 1 ? "italic text-[#f3dcc0]" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.25 + i * 0.12, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="relative rounded-2xl border border-white/25 bg-white/12 p-6 text-white backdrop-blur-xl">
            <p className="text-[15px] leading-relaxed text-white/90">A gated club of condominiums and townhouses on the inlet into Port Lucaya, with a private marina for owners.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[15px] text-ink transition hover:-translate-y-px active:translate-y-0"><Phone className="size-4" aria-hidden /> Call the club office</a>
              <a href="marina.html" className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/40 px-5 text-[15px] text-white transition hover:border-white">The marina <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            </div>
            <BorderBeam size={120} duration={10} colorFrom="#f3dcc0" colorTo="#ffffff" borderWidth={1} />
          </motion.div>
        </div>
      </div>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-white/60 uppercase">Illustration · Bell Channel at golden hour</p>
    </section>
  )
}

function Explore() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="explore-title">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="text-[11px] tracking-[0.22em] text-teal uppercase">01 · Explore</p>
          <h2 id="explore-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.02em]">The whole club, from above.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Move across the model and tap a label: the beach the association keeps, the townhouses, the owners' docks on the canal, and the channel into Port Lucaya.</p>
          <p className="mt-8 text-[11px] tracking-[0.18em] text-muted uppercase">Illustration, not to scale</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sea md:aspect-[16/10]">
            <Suspense fallback={<div className="size-full bg-sea" />}><Scene /></Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Facts() {
  return (
    <section id="club" className="border-y border-line bg-paper-2" aria-label="The club at a glance">
      <ul className="mx-auto grid max-w-[1240px] md:grid-cols-4">
        {FACTS.map(([t, d], i) => (
          <motion.li key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="border-line px-5 py-8 md:border-l md:px-8 md:first:border-l-0">
            <p className="font-display text-2xl">{t}</p>
            <p className="mt-2 text-[15px] text-muted">{d}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Setting() {
  return (
    <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-36" aria-labelledby="setting-title">
      <Reveal>
        <p className="text-[13px] tracking-[0.2em] text-teal uppercase">The setting</p>
        <h2 id="setting-title" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04]">Water on both sides of the gate.</h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">The club stands where the Bell Channel inlet meets the open water. On one side, a canal. On the other, a beach the homeowners' association keeps. Units look out over the inlet into Port Lucaya Marketplace.</p>
      </Reveal>
      <Reveal delay={0.1}>
        <svg viewBox="0 0 520 420" className="w-full" role="img" aria-label="Illustration of the club between the canal and the beach, beside the Bell Channel inlet. Not for navigation.">
          <rect width="520" height="420" rx="24" fill="#e3ebe7" />
          <rect x="0" y="300" width="520" height="120" fill="#d6e6e3" />
          <path d="M0 300 C120 290 200 310 300 298 S460 292 520 300" fill="none" stroke="#14303a" strokeWidth="1.5" />
          <rect x="0" y="190" width="250" height="34" fill="#d6e6e3" />
          <rect x="262" y="0" width="54" height="300" fill="#d6e6e3" />
          <motion.path d="M289 420 L289 40" stroke="#1f7a78" strokeWidth="2" strokeDasharray="6 7" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease }} />
          <ellipse cx="289" cy="48" rx="110" ry="36" fill="#d6e6e3" />
          <text x="289" y="46" textAnchor="middle" fontFamily="DM Serif Display" fontSize="20" fill="#14303a">Port Lucaya</text>
          <text x="289" y="66" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="11" fill="#4d6066">Marketplace</text>
          <motion.g initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.9, ease }} style={{ transformOrigin: "200px 262px" }}>
            <circle cx="200" cy="262" r="40" fill="none" stroke="#1f7a78" strokeWidth="1.5" />
            <rect x="178" y="242" width="44" height="40" rx="4" fill="#1f7a78" />
          </motion.g>
          <text x="56" y="268" fontFamily="DM Serif Display" fontSize="18" fill="#14303a">The club</text>
          <text x="14" y="212" fontFamily="IBM Plex Sans" fontSize="12" fill="#4d6066">Canal</text>
          <text x="120" y="292" fontFamily="IBM Plex Sans" fontSize="12" fill="#4d6066">Beach</text>
          <text x="330" y="180" fontFamily="IBM Plex Sans" fontSize="12" fill="#4d6066" transform="rotate(-90 330 180)">Bell Channel inlet</text>
          <text x="20" y="404" fontFamily="IBM Plex Sans" fontSize="11" fill="#4d6066">Illustration of the setting. Not for navigation.</text>
        </svg>
      </Reveal>
    </section>
  )
}

function Living() {
  return (
    <section id="living" className="bg-ink text-paper" aria-labelledby="living-title">
      <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-sand uppercase">Living here</p>
          <h2 id="living-title" className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04]">Small, private, and everything inside the gate.</h2>
        </Reveal>
        <ol className="mt-14 divide-y divide-paper/15 border-y border-paper/15">
          {LIVING.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[4rem_1fr_1.2fr]">
              <span className="font-display text-sand">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl transition group-hover:translate-x-1 md:text-3xl">{t}</span>
              <span className="col-start-2 text-paper/70 md:col-start-auto">{d}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-32" aria-labelledby="faq-title">
      <Reveal>
        <p className="text-[13px] tracking-[0.2em] text-teal uppercase">Questions</p>
        <h2 id="faq-title" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04]">What people ask the office.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function FindUs() {
  return (
    <section id="find-us" className="border-t border-line bg-paper-2" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-teal uppercase">Find us</p>
          <h2 id="find-title" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.04]">One call reaches the club.</h2>
          <p className="mt-5 max-w-md text-lg text-muted">Owners, guests, buyers and boaters: the club office is the place to start.</p>
          <a href={TEL} className="mt-9 block rounded-3xl bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-teal-deep">
            <span className="text-[11px] tracking-[0.18em] text-sand uppercase">Club office</span>
            <span className="mt-2 block font-display text-[clamp(2rem,4vw,3rem)] leading-none">{PHONE}</span>
            <span className="mt-3 block text-paper/70">Fax (242) 373-3802 · P.O. Box F-44053, Freeport</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-line">
          <iframe title="Map of Bell Channel, Freeport, Grand Bahama" loading="lazy" className="h-[420px] w-full md:h-full" src="https://www.google.com/maps?q=Bell+Channel+Club,+Freeport,+Grand+Bahama&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="The club"><Hero /><Facts /><Explore /><Setting /><Living /><Questions /><FindUs /></Page>)
