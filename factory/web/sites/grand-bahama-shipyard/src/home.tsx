import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IMG, SERVICES } from "./data"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, EMAIL } from "./site"

const Dock = lazy(() => import("./Dock"))

const STEPS = [
  ["Ballast in", "The floating dock sinks below the hull and the ship is brought in over the keel blocks."],
  ["Ballast out", "The East End dock rises. It is engineered to lift vessels of up to 93,500 tons."],
  ["Dry", "The hull is clear of the water. Steel, pipe, coatings and propulsion work can start."],
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", v => { progress.current = v; setStep(v < 0.3 ? 0 : v < 0.7 ? 1 : 2) })
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"])
  const [reduced, setReduced] = useState(false)
  useEffect(() => { const m = window.matchMedia("(prefers-reduced-motion: reduce)"); setReduced(m.matches); if (m.matches) progress.current = 1 }, [])
  return (
    <section ref={ref} className={`relative ${reduced ? "h-[calc(100svh-66px)]" : "h-[230svh]"}`} aria-labelledby="hero-title">
      <div className="sticky top-[66px] h-[calc(100svh-66px)] min-h-[620px] overflow-hidden bg-[#e9e6dd]">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="size-full bg-gradient-to-b from-[#c4cfd2] via-[#efe9dc] to-[#2a5560]" />}><Dock progress={progress} /></Suspense>
        </div>
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pt-8 pb-6 md:px-10 md:pt-12 md:pb-10">
          <motion.div style={{ y: titleY }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap justify-between gap-2 font-mono text-[11px] tracking-[0.16em] text-ink/75 uppercase">
              <span>Ship repair · Freeport, Grand Bahama</span>
              <span className="hidden md:block">26.53° N · 78.75° W · 93 nm east of Miami</span>
            </motion.div>
            <h1 id="hero-title" className="mt-6 max-w-[15ch] font-display text-[clamp(2.7rem,7.4vw,8.4rem)] leading-[0.9] tracking-[-0.035em] text-ink" style={{ fontStretch: "122%" }}>
              {["The Caribbean's", "largest ship", "repair yard."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.05em]">
                  <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.09, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-6 max-w-md text-[17px] leading-relaxed text-ink/80">
              Grand Bahama Shipyard drydocks and repairs cruise and commercial vessels inside the Port of Freeport, on the shipping lanes off Florida.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-7 flex flex-wrap gap-3">
              <a href="#enquire" className="group inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour active:translate-y-0">Request a docking slot <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
              <a href="#docks" className="group inline-flex min-h-12 items-center gap-2 border border-ink/40 bg-paper/50 px-6 text-[15px] text-ink backdrop-blur transition hover:-translate-y-px hover:border-ink">Check your vessel <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease }} className="ml-auto w-full max-w-[400px] border border-white/60 bg-paper/70 p-5 backdrop-blur-xl md:p-6" aria-live="polite">
            <div className="flex gap-2" aria-hidden>{STEPS.map((_, i) => <span key={i} className={`h-[3px] flex-1 transition-colors duration-500 ${i <= step ? "bg-ink" : "bg-ink/15"}`} />)}</div>
            <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-steel uppercase">0{step + 1} · {STEPS[step][0]}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{STEPS[step][1]}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-steel uppercase">{reduced ? "Illustration of the East End dock" : "Scroll to lift · Illustration of the East End dock"}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    ["Call the yard", PHONE, TEL, "Yard works 24 hours, 7 days"],
    ["Enquiries", EMAIL, `mailto:${EMAIL}`, "Office Mon to Fri, 08:00 to 18:00"],
    ["East End dock", "357 m · 93,500 t lift", "#docks", "Second dock due late 2026"],
    ["Where", "Port of Freeport", "#yard", "93 nm east of Miami"],
  ]
  return (
    <section className="bg-lime text-ink" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href, sub], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="border-ink/20 max-sm:border-b sm:max-lg:odd:border-r lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-ink/5 md:px-8 md:py-9">
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase">{k}</span>
              <span className={`mt-2 block break-words font-display leading-tight ${v.includes("@") ? "text-[clamp(1.1rem,1.35vw,1.35rem)]" : "text-[clamp(1.25rem,1.8vw,1.75rem)]"}`} style={{ fontStretch: "112%" }}>{v}</span>
              <span className="mt-2 block text-[14px] text-ink/70">{sub}</span>
              <span className="mt-3 block h-[2px] w-0 bg-ink transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const DOCK_M = 357, LIFT_T = 93500, BERTH_D = 14
function Checker() {
  const [loa, setLoa] = useState(290)
  const [tons, setTons] = useState("")
  const [draft, setDraft] = useState("")
  const ft = Math.round(loa * 3.2808)
  const t = Number(tons), d = Number(draft)
  const rows: [string, boolean | null, string][] = [
    ["Length", loa <= DOCK_M, loa <= DOCK_M ? `${loa} m sits inside the East End dock's approx. 357 m length.` : `${loa} m is longer than the East End dock's approx. 357 m length. Talk to the planning team.`],
    ["Lift weight", tons ? t <= LIFT_T : null, tons ? (t <= LIFT_T ? `${t.toLocaleString()} t is within the published lift of up to 93,500 tons.` : `${t.toLocaleString()} t is above the published 93,500 ton lift.`) : "Add the docking weight to compare with the 93,500 ton lift."],
    ["Afloat at the pier", draft ? d <= BERTH_D : null, draft ? (d <= BERTH_D ? `A ${d} m draft is within the 14 m water depth at the deep-water berth.` : `A ${d} m draft is deeper than the 14 m published at the berth.`) : "Add your draft to compare with the 14 m deep-water berth."],
  ]
  const w = 640, scale = (w - 40) / 380
  const hullD = `M20 56 L${20 + loa * scale * 0.86} 56 Q${20 + loa * scale} 50 ${20 + loa * scale} 30 L20 30 Z`
  return (
    <section id="docks" className="scroll-mt-20 mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="docks-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="01">Docks and berth</Label>
          <h2 id="docks-title" className="mt-5 font-display text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[0.95] tracking-[-0.03em]" style={{ fontStretch: "118%" }}>Will your ship fit? A first look.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-steel">Set your vessel's length and, if you have them, its docking weight and draft. We compare them with the figures the yard publishes for the East End floating dock and the deep-water berth.</p>
          <p className="mt-6 max-w-sm border-l-2 border-lime pl-4 text-[14px] leading-relaxed text-steel">A first look only. Every docking is planned and confirmed by the yard's naval architects against full vessel particulars.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="border border-line bg-paper-2/60 p-5 md:p-8">
            <label className="block">
              <span className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.16em] text-steel uppercase"><span>Length overall</span><span className="text-ink">{loa} m · {ft} ft</span></span>
              <input type="range" min={80} max={400} value={loa} onChange={e => setLoa(Number(e.target.value))} className="range mt-4 w-full" aria-label="Length overall in metres" />
            </label>
            <svg viewBox={`0 0 ${w} 150`} className="mt-8 w-full" role="img" aria-label={`Your ${loa} metre vessel drawn against the approx. 357 metre East End dock`}>
              <rect x="20" y="70" width={DOCK_M * scale} height="44" fill="#3d4750" />
              <rect x="20" y="58" width={DOCK_M * scale} height="12" fill="#59646d" />
              <rect x="20" y="58" width={DOCK_M * scale} height="3" fill="#d6e04b" />
              <text x="20" y="138" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#57616a">EAST END DOCK · APPROX. 357 M</text>
              <motion.path initial={false} d={hullD} animate={{ d: hullD }} transition={{ duration: 0.5, ease }} fill={loa <= DOCK_M ? "#101418" : "#173f4d"} />
              <motion.rect initial={false} width={loa * scale * 0.7} animate={{ width: loa * scale * 0.7 }} transition={{ duration: 0.5, ease }} x="34" y="12" height="18" fill="#f4f3ee" stroke="#101418" strokeWidth="1" />
              <text x={20} y={8} fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#101418">YOUR VESSEL · {loa} M</text>
              <line x1={20 + DOCK_M * scale} x2={20 + DOCK_M * scale} y1="20" y2="120" stroke="#101418" strokeDasharray="3 4" />
            </svg>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block"><span className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Docking weight (t), optional</span>
                <input inputMode="numeric" value={tons} onChange={e => setTons(e.target.value.replace(/[^\d]/g, ""))} placeholder="e.g. 45000" className="mt-2 block min-h-12 w-full border-b border-ink/30 bg-transparent font-display text-xl outline-none focus:border-ink" /></label>
              <label className="block"><span className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Draft (m), optional</span>
                <input inputMode="decimal" value={draft} onChange={e => setDraft(e.target.value.replace(/[^\d.]/g, ""))} placeholder="e.g. 8.2" className="mt-2 block min-h-12 w-full border-b border-ink/30 bg-transparent font-display text-xl outline-none focus:border-ink" /></label>
            </div>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {rows.map(([k, ok, txt]) => (
                <li key={k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-4 text-[15px]">
                  <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase"><span className={`size-2.5 ${ok === null ? "bg-line" : ok ? "bg-lime ring-1 ring-ink" : "bg-harbour"}`} aria-hidden />{k}</span>
                  <span className="text-ink/85">{txt}</span>
                </li>
              ))}
            </ul>
            <a href="#enquire" className="group mt-6 inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour">Send particulars to the planning team <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Owners() {
  return (
    <section id="yard" className="scroll-mt-20 border-t border-line" aria-labelledby="owners-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="02">The yard</Label>
          <h2 id="owners-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>Built by cruising, for every kind of ship.</h2>
          <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-steel">Grand Bahama Shipyard is a joint venture between Carnival Corporation, Royal Caribbean Group and MSC Cruises. It was established in Freeport in 1999 and docks cruise and commercial vessels alike, from planning and steel to coatings and propulsion.</p>
          <dl className="mt-10 grid grid-cols-2 gap-px bg-line">
            {[["Established", "1999, Freeport"], ["Redevelopment", "$600 million programme"], ["Deep-water berth", "1 km, 14 m depth"], ["Workshop", "35,000 ft²"]].map(([k, v]) => (
              <div key={k} className="bg-paper p-5"><dt className="font-mono text-[11px] tracking-[0.14em] text-steel uppercase">{k}</dt><dd className="mt-2 font-display text-xl" style={{ fontStretch: "110%" }}>{v}</dd></div>
            ))}
          </dl>
        </Reveal>
        <div className="grid gap-4 lg:col-span-7 lg:grid-cols-[1.4fr_1fr]">
          <Photo src={`${IMG}2026/02/GBSL26byAlfredAnderson-0148-1.jpg`} alt="Carnival Elation lifted in the East End floating dock at Grand Bahama Shipyard" ratio="aspect-[4/5]" />
          <div className="grid gap-4 lg:mt-24">
            <Photo src={`${IMG}2026/06/DJI_0166.jpg`} alt="Aerial view of Grand Bahama Shipyard in Freeport Harbour" ratio="aspect-square" />
            <Photo src={`${IMG}2020/11/facilities-body-wharfage4.jpg`} alt="Ship alongside the deep-water wharf at Grand Bahama Shipyard" ratio="aspect-square" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section id="safety" className="scroll-mt-20 bg-harbour text-paper" aria-labelledby="safety-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal><Label n="03" light>Safety record</Label></Reveal>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="safety-title" className="font-display leading-[0.88] tracking-[-0.04em]" style={{ fontStretch: "122%" }}>
              <span className="block text-[clamp(4.5rem,13vw,12.5rem)] text-lime">1.45m</span>
              <span className="mt-4 block max-w-[18ch] text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.05] tracking-[-0.02em]">trade labour hours without a lost time injury.</span>
            </h2>
            <p className="mt-6 max-w-lg text-paper/75">Reached as of 25 June 2026, during one of the yard's busiest periods, after passing one million hours on 14 April 2026.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-6">
            <ol className="divide-y divide-paper/15 border-y border-paper/15">
              {[["British Safety Council", "Merit, International Safety Awards 2026, for performance across 2025"], ["ISO 9001", "Quality management"], ["ISO 45001", "Occupational health and safety"], ["ISO 14001", "Environmental management system"], ["ISPS", "Compliant port facility security"]].map(([k, v], i) => (
                <motion.li key={k} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[2.5rem_1fr] gap-3 py-5">
                  <span className="font-mono text-[12px] text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span><span className="block font-display text-xl transition group-hover:translate-x-1" style={{ fontStretch: "112%" }}>{k}</span><span className="mt-1 block text-[15px] text-paper/70">{v}</span></span>
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const TIMELINE = [
  ["1999", "Established in Freeport as part of a plan to build a maritime centre on the island."],
  ["2019", "Prior docking assets lost. The yard begins rebuilding its multi-dock capability."],
  ["Jan 2026", "Carnival Elation enters the new East End floating dock on 16 January."],
  ["Feb 2026", "Carnival Elation returns to service on 9 February, as planned."],
  ["Jun 2026", "1.45 million trade labour hours without a lost time injury."],
  ["Late 2026", "The Lucayan floating dock is expected, taking the yard to three docks."],
]
function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] })
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="time-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <Label n="04">Back to full strength</Label>
          <h2 id="time-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>From one dock to three.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-steel">The yard is now a two-dock operation again, with a third dock on the way. Planners booking a window should know where it stands today.</p>
        </Reveal>
        <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <motion.span style={{ scaleY: scrollYProgress }} className="absolute top-0 left-[7px] h-full w-[2px] origin-top bg-ink" aria-hidden />
          <span className="absolute top-0 left-[7px] h-full w-[2px] bg-line" aria-hidden />
          {TIMELINE.map(([y, t]) => (
            <li key={y} className="relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-8">
              <span className="absolute top-2 left-0 size-4 border-2 border-ink bg-lime" aria-hidden />
              <span className="font-display text-2xl" style={{ fontStretch: "118%" }}>{y}</span>
              <span className="text-[17px] leading-relaxed text-ink/80">{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Capabilities() {
  const [active, setActive] = useState(0)
  return (
    <section className="border-t border-line bg-paper-2" aria-labelledby="cap-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Label n="05">Capabilities</Label>
            <h2 id="cap-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>One yard, every trade on board.</h2>
          </Reveal>
          <ol className="mt-10 border-t border-ink/15">
            {SERVICES.map(([t, d], i) => (
              <li key={t} className="border-b border-ink/15">
                <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={active === i} className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-5 text-left">
                  <span className={`font-mono text-[12px] ${active === i ? "text-ink" : "text-steel"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className={`block font-display text-[clamp(1.3rem,2vw,1.8rem)] leading-tight transition ${active === i ? "translate-x-1" : "group-hover:translate-x-1"}`} style={{ fontStretch: "112%" }}>{t}</span>
                    <motion.span initial={false} animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }} transition={{ duration: 0.5, ease }} className="block overflow-hidden text-[15px] leading-relaxed text-steel"><span className="block pt-2">{d}</span></motion.span>
                  </span>
                  <ArrowRight className={`size-4 transition ${active === i ? "translate-x-0 text-ink" : "-translate-x-1 text-steel opacity-0 group-hover:opacity-100"}`} aria-hidden />
                </button>
              </li>
            ))}
          </ol>
          <a href="capabilities.html" className="group mt-8 inline-flex min-h-12 items-center gap-2 border-b-2 border-ink text-[15px] text-ink">See every capability, workshop and spec <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </div>
        <div className="relative lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper">
            {SERVICES.map(([t, , src], i) => (
              <motion.img key={src} src={`${IMG}${src}`} alt={`${t} at Grand Bahama Shipyard`} loading="lazy" width={1000} height={1250} initial={false} animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }} transition={{ duration: 0.8, ease }} className="absolute inset-0 size-full object-cover" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const QUOTES = [
  ["All repairs were completed in a timely manner and in line with the schedule. Excellent communication with the project manager.", "Stena"],
  ["Good teams and very good communication. Great team to work with for a successful docking. Good workmanship.", "Holland America Group"],
  ["Overall, the docking was a success. Yard team were professional and effective.", "Disney Cruise Line"],
]
function Feedback() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="fb-title">
      <Reveal>
        <Label n="06">Close-out feedback</Label>
        <h2 id="fb-title" className="mt-5 max-w-3xl font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "114%" }}>What owners wrote after undocking.</h2>
        <p className="mt-4 max-w-xl text-[15px] text-steel">Quoted from the client feedback Grand Bahama Shipyard publishes on its own website.</p>
      </Reveal>
      <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
        {QUOTES.map(([q, who], i) => (
          <Reveal key={who} delay={i * 0.08} className="bg-paper">
            <figure className="flex h-full flex-col justify-between gap-10 p-6 md:p-8">
              <blockquote className="font-display text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.25] tracking-[-0.01em]" style={{ fontStretch: "104%" }}>“{q}”</blockquote>
              <figcaption className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">{who}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const ENQ = {
  dock: { label: "Drydock window", subject: "Drydock enquiry", fields: [["Vessel name", "text"], ["IMO number", "text"], ["Vessel type", "text"], ["Length overall (m)", "number"], ["Preferred window", "text"], ["Main scope", "text"]] },
  afloat: { label: "Afloat or voyage repair", subject: "Afloat repair enquiry", fields: [["Vessel name", "text"], ["IMO number", "text"], ["ETA Freeport", "date"], ["Draft (m)", "number"], ["Scope of work", "text"], ["Your company", "text"]] },
  supplier: { label: "Become a supplier", subject: "Supplier registration", fields: [["Company", "text"], ["Country", "text"], ["Products or services", "text"], ["Certifications", "text"], ["Contact name", "text"], ["Website", "text"]] },
} as const
type EK = keyof typeof ENQ
function Enquire() {
  const [tab, setTab] = useState<EK>("dock")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [msg, setMsg] = useState("")
  const conf = ENQ[tab]
  const lines = conf.fields.map(([f]) => vals[`${tab}:${f}`] ? `${f}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean) as string[]
  const body = ["Hello Grand Bahama Shipyard,", "", ...lines, msg ? `Notes: ${msg}` : "", "", "(sent from the website)"].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n")
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${conf.subject}${vals[`${tab}:Vessel name`] ? ": " + vals[`${tab}:Vessel name`] : ""}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="enquire" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="enq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="07" light>Enquire</Label>
          <h2 id="enq-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[0.95] tracking-[-0.03em]" style={{ fontStretch: "118%" }}>Request a docking slot.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-paper/75">Pick the enquiry, add the particulars you have, and your email opens addressed to the yard with everything in order. Each project gets a designated project manager and a detailed schedule.</p>
          <a href={TEL} className="group mt-10 block border border-paper/20 p-6 transition hover:border-lime">
            <span className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Prefer to call</span>
            <span className="mt-2 block font-display text-[clamp(1.6rem,2.4vw,2.2rem)]" style={{ fontStretch: "112%" }}>{PHONE}</span>
            <span className="mt-1 flex items-center gap-2 text-paper/65"><Phone className="size-4" aria-hidden /> Yard works 24 hours, 7 days</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as EK)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-none bg-paper/10 p-1">
              {(Object.keys(ENQ) as EK[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-none px-4 text-paper/80 data-[state=active]:bg-lime data-[state=active]:text-ink">{ENQ[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(ENQ) as EK[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  {ENQ[k].fields.map(([f, type]) => (
                    <label key={f} className="block">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-paper/60 uppercase">{f}</span>
                      <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-paper/30 bg-transparent text-lg text-paper outline-none transition [color-scheme:dark] focus:border-lime" />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <label className="mt-6 block"><span className="font-mono text-[11px] tracking-[0.14em] text-paper/60 uppercase">Anything else</span>
            <textarea rows={3} value={msg} onChange={e => setMsg(e.target.value)} className="mt-2 block w-full border-b border-paper/30 bg-transparent text-lg text-paper outline-none focus:border-lime" /></label>
          <div className="mt-10 flex flex-col gap-5 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-[14px] text-paper/65">{lines.length ? `${lines.length} detail${lines.length > 1 ? "s" : ""} ready to send to ${EMAIL}.` : `Opens your email app, addressed to ${EMAIL}.`}</p>
            <a href={href} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-lime px-6 text-[15px] text-ink transition hover:-translate-y-px active:translate-y-0"><Mail className="size-4" aria-hidden /> Email the planning team</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["How big a ship can Grand Bahama Shipyard dock?", "The East End floating dock is approximately 357 metres long with a beam of about 70 metres and is engineered to lift vessels of up to 93,500 tons. Every docking is confirmed by the planning team against full vessel particulars."],
  ["Where is the shipyard?", "Inside the Port of Freeport on The Fishing Hole Road, Freeport, Grand Bahama, about 93 nautical miles east of Miami and on the major shipping routes."],
  ["Can you repair ships afloat?", "Yes. The yard has 1 km of deep-water berth with 14 m of water depth for afloat repairs and underwater propulsion system exchanges, with cranes and logistics at each berth."],
  ["Who owns Grand Bahama Shipyard?", "It is operated as a joint venture between Carnival Corporation, Royal Caribbean Group and MSC Cruises."],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="faq-title">
      <Reveal>
        <Label n="08">Questions</Label>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>What planners ask first.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl" style={{ fontStretch: "108%" }}>{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-steel">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function FindUs() {
  return (
    <section className="border-t border-line bg-paper-2" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="09">Find the yard</Label>
          <h2 id="find-title" className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1] tracking-[-0.03em]" style={{ fontStretch: "116%" }}>Freeport Harbour, Grand Bahama.</h2>
          <p className="mt-6 max-w-md text-[17px] text-steel">The Fishing Hole Road, Freeport. P.O. Box F-42623. Equipment and materials can be cleared through the yard's own customs brokerage department.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={TEL} className="group bg-ink p-6 text-paper transition hover:-translate-y-0.5 hover:bg-harbour"><span className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">Call</span><span className="mt-2 block font-display text-2xl" style={{ fontStretch: "110%" }}>{PHONE}</span></a>
            <a href={`mailto:${EMAIL}`} className="group border border-ink p-6 transition hover:-translate-y-0.5"><span className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Email</span><span className="mt-2 block break-all font-display text-xl" style={{ fontStretch: "106%" }}>{EMAIL}</span></a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden border border-line">
          <iframe title="Map of Grand Bahama Shipyard, Freeport, Grand Bahama" loading="lazy" className="h-[420px] w-full lg:h-full" src="https://www.google.com/maps?q=Grand+Bahama+Shipyard+Limited,+Freeport,+Grand+Bahama&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Docks"><Hero /><KeyInfo /><Checker /><Owners /><Safety /><Timeline /><Capabilities /><Feedback /><Enquire /><Questions /><FindUs /></Page>)
