import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Lines, Label, ease, reveal, PHONE, TEL } from "./site"
import { Brief } from "./Brief"

const Scene = lazy(() => import("./Scene"))

function useWebGL() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    try { const c = document.createElement("canvas"); setOk(!!(c.getContext("webgl2") || c.getContext("webgl"))) } catch { setOk(false) }
  }, [])
  return ok
}

function Hero() {
  const gl = useWebGL()
  return (
    <section className="relative isolate h-[calc(100svh-104px)] min-h-[620px] overflow-hidden bg-[#e9e1d3]" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#b9cad3_0%,#e6dccb_55%,#ddd5c6_100%)]" />
        {gl && <Suspense fallback={null}><Scene /></Suspense>}
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-paper via-paper/85 to-transparent md:h-[38%] md:via-paper/55" />
      </div>
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pt-8 pb-8 md:px-10 md:pt-12 md:pb-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap items-start justify-between gap-3">
          <p className="label text-ink/75">Airport Industrial Park · Nassau · New Providence</p>
          <p className="label hidden text-ink/60 md:block">Building contractor · Construction consultants</p>
        </motion.div>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <h1 id="hero-title" className="display text-[clamp(3.1rem,8.4vw,9.4rem)] text-ink">
              <span className="sr-only">Jones Construction Company Ltd., building contractor in Nassau: </span>
              {["Built block", "by block,", "in Nassau."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <motion.span className={`block ${i === 2 ? "text-cobalt" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.15, ease: reveal }}>{l}</motion.span>
                </span>
              ))}
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }} className="border border-ink/10 bg-paper/75 p-5 backdrop-blur-xl md:p-6">
            <p className="text-[15px] leading-relaxed text-ink/85 md:text-[16px]">Jones Construction Company Ltd. builds and advises on construction projects across New Providence, from its yard at Airport Industrial Park.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="#brief" className="btn-primary group">Discuss a project <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
              <a href={TEL} className="btn-ghost text-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </motion.div>
        </div>
      </div>
      <p className="label absolute right-5 bottom-3 text-[10px] text-ink/45 md:right-10">Illustration</p>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Office", PHONE, TEL, true],
    ["Yard and office", "Airport Industrial Park, Nassau", "#office", false],
    ["Post", "P.O. Box N-3409, Nassau", "#office", false],
    ["Work", "Construction and consulting", "capabilities.html", false],
  ] as const
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {items.map(([k, v, href, big], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-b border-paper/12 sm:border-l sm:first:border-l-0 lg:border-b-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="label text-sand">{k}</span>
              <span className={`mt-3 flex items-center justify-between gap-3 font-display font-[560] leading-tight [font-stretch:112%] ${big ? "text-[clamp(1.9rem,2.6vw,2.6rem)]" : "text-xl md:text-[1.4rem]"}`}>
                {v}<ArrowUpRight className="size-5 shrink-0 text-sand transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const STAGES = [
  { id: "ground", n: "A", t: "Site and foundations", d: "The site is set out, cleared and excavated, and reinforced footings are poured to carry the walls." },
  { id: "walls", n: "B", t: "Block walls and steel", d: "Concrete block walls go up course by course, with steel and filled cells at corners, openings and bond beams." },
  { id: "slab", n: "C", t: "Slabs and roof", d: "Floor slabs and the roof structure tie the walls together into one frame built for storm season." },
  { id: "finish", n: "D", t: "Finishes and handover", d: "Openings, render, services and finishes are completed, the site is cleared and the building is handed over." },
]

function Section({ active }: { active: string }) {
  const on = (id: string) => active === id
  const k = (id: string) => ({ animate: { opacity: on(id) ? 1 : 0.28 }, transition: { duration: 0.6, ease } })
  const stroke = "#1c1f22"
  const blue = "#2c4a9a"
  return (
    <svg viewBox="0 0 560 520" className="h-auto w-full" role="img" aria-label="Section drawing of a two-storey concrete block building: foundations, block walls, slabs and roof, finishes. Illustration.">
      <rect x="0" y="0" width="560" height="520" fill="none" />
      <line x1="20" y1="430" x2="540" y2="430" stroke={stroke} strokeWidth="1.2" />
      <path d="M20 430 l14 14 M60 430 l14 14 M100 430 l14 14 M420 430 l14 14 M460 430 l14 14 M500 430 l14 14" stroke={stroke} strokeWidth=".8" />
      <motion.g {...k("ground")}>
        <rect x="96" y="430" width="44" height="46" fill={on("ground") ? blue : "#cfcbc2"} opacity=".9" />
        <rect x="420" y="430" width="44" height="46" fill={on("ground") ? blue : "#cfcbc2"} opacity=".9" />
        <rect x="110" y="418" width="340" height="12" fill="#bdb8ae" />
        <path d="M102 470 h32 M426 470 h32" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 3" />
      </motion.g>
      <motion.g {...k("walls")}>
        {Array.from({ length: 12 }).map((_, r) => (
          <g key={r}>
            {[0, 1].map(s => (
              <rect key={s} x={s ? 428 : 110} y={414 - (r + 1) * 14.5 - (r >= 6 ? 14 : 0)} width="22" height="13" fill={on("walls") ? "#e4e1d9" : "#d6d2c9"} stroke={stroke} strokeWidth=".8" />
            ))}
          </g>
        ))}
        <line x1="121" y1="418" x2="121" y2="148" stroke={on("walls") ? blue : stroke} strokeWidth="2" strokeDasharray="2 0" />
        <line x1="439" y1="418" x2="439" y2="148" stroke={on("walls") ? blue : stroke} strokeWidth="2" />
      </motion.g>
      <motion.g {...k("slab")}>
        <rect x="104" y="316" width="352" height="14" fill={on("slab") ? blue : "#bdb8ae"} />
        <path d="M90 148 L280 70 L470 148 Z" fill="none" stroke={on("slab") ? blue : stroke} strokeWidth="2" />
        <path d="M110 148 h340" stroke={on("slab") ? blue : stroke} strokeWidth="6" />
        <path d="M150 132 L280 78 L410 132" fill="none" stroke={stroke} strokeWidth=".8" strokeDasharray="5 4" />
      </motion.g>
      <motion.g {...k("finish")}>
        <rect x="132" y="350" width="2" height="60" fill={stroke} />
        <rect x="200" y="356" width="60" height="62" fill="none" stroke={on("finish") ? blue : stroke} strokeWidth="1.5" />
        <rect x="300" y="350" width="70" height="40" fill="none" stroke={on("finish") ? blue : stroke} strokeWidth="1.5" />
        <rect x="200" y="200" width="70" height="44" fill="none" stroke={on("finish") ? blue : stroke} strokeWidth="1.5" />
        <rect x="300" y="200" width="70" height="44" fill="none" stroke={on("finish") ? blue : stroke} strokeWidth="1.5" />
        <path d="M300 222 h70 M335 200 v44 M200 222 h70 M235 200 v44" stroke={stroke} strokeWidth=".6" />
      </motion.g>
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke} letterSpacing="1">
        {[["A", 476, 462, "ground"], ["B", 476, 280, "walls"], ["C", 476, 120, "slab"], ["D", 380, 372, "finish"]].map(([l, x, y, id]) => (
          <g key={l as string}>
            <circle cx={(x as number) + 12} cy={(y as number) - 4} r="11" fill={active === id ? blue : "none"} stroke={active === id ? blue : stroke} />
            <text x={(x as number) + 12} y={y as number} textAnchor="middle" fill={active === id ? "#fff" : stroke}>{l as string}</text>
          </g>
        ))}
        <text x="20" y="506" fontSize="10" fill="#5a5f63">TYPICAL TWO-STOREY BLOCK BUILDING · SECTION · ILLUSTRATION, NOT TO SCALE</text>
      </g>
    </svg>
  )
}

function Step({ s, i, onActive }: { s: typeof STAGES[number]; i: number; onActive: (id: string) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  useEffect(() => { if (inView) onActive(s.id) }, [inView, s.id, onActive])
  return (
    <li ref={ref} className="border-t border-line py-10 md:py-16">
      <button type="button" onClick={() => onActive(s.id)} className="group grid w-full grid-cols-[3rem_1fr] gap-4 text-left">
        <span className="font-mono text-sm text-cobalt">{s.n}.0{i + 1}</span>
        <span>
          <span className="block font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-[580] leading-[1.02] tracking-[-0.02em] [font-stretch:112%] transition group-hover:translate-x-1">{s.t}</span>
          <span className="mt-4 block max-w-md text-[17px] leading-relaxed text-muted">{s.d}</span>
        </span>
      </button>
    </li>
  )
}

function Process() {
  const [active, setActive] = useState("ground")
  return (
    <section id="process" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="process-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label n="01">How a build comes together</Label>
          <h2 id="process-title" className="display mt-6 text-[clamp(2.6rem,4.8vw,4.6rem)]"><Lines lines={["From footing", "to handover."]} /></h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Most buildings in The Bahamas are concrete block, for good reason. Scroll through the four stages, or tap one, to see where each fits in the frame.</p>
          <ol className="mt-12">{STAGES.map((s, i) => <Step key={s.id} s={s} i={i} onActive={setActive} />)}</ol>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="blueprint sticky top-28 border border-line p-5 md:p-8">
            <div className="mb-4 flex justify-between font-mono text-[11px] tracking-[0.14em] text-muted uppercase"><span>Sheet 01</span><span>Stage {STAGES.find(s => s.id === active)?.n}</span></div>
            <Section active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}

const SCOPE = [
  ["New buildings", "Homes and commercial buildings in concrete block, from foundations up."],
  ["Additions and renovations", "Extending, rebuilding or upgrading an existing building."],
  ["Construction consulting", "Advice on a project before or during construction."],
  ["Site supervision", "Keeping the work on site to plan, sequence and standard."],
]

function Scope() {
  return (
    <section className="bg-paper-2" aria-labelledby="scope-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="02">What we take on</Label>
          <h2 id="scope-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">One contractor, start to finish.</h2>
          <a href="capabilities.html" className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px]">See capabilities <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <ol className="lg:col-span-7 lg:col-start-6">
          {SCOPE.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-line py-7 last:border-b md:grid-cols-[4rem_1fr_1.1fr]">
              <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl font-[560] tracking-[-0.015em] [font-stretch:110%] transition group-hover:translate-x-1 md:text-[1.9rem]">{t}</span>
              <span className="col-start-2 text-[16px] leading-relaxed text-muted md:col-start-auto">{d}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Base() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="base-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="04" light>Where we work from</Label>
          <h2 id="base-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">Airport Industrial Park.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-paper/70">The office and yard sit in Nassau's industrial park by the airport, in western New Providence, with the island's main roads close at hand.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <svg viewBox="0 0 720 380" className="h-auto w-full" role="img" aria-label="Schematic map of New Providence showing Airport Industrial Park beside Lynden Pindling International Airport, and downtown Nassau to the east. Illustration, not to scale.">
            <motion.path d="M40 210 C60 150 140 120 230 128 C300 134 360 112 440 118 C520 124 600 140 660 168 C690 184 690 220 660 236 C600 262 520 258 450 270 C380 282 300 300 220 292 C140 284 60 270 40 210 Z" fill="#262a2e" stroke="#d8c39a" strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease }} />
            <path d="M560 112 C590 104 640 104 668 112" stroke="#d8c39a" strokeWidth="1.2" fill="none" />
            <text x="612" y="96" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="#efede8" opacity=".6" letterSpacing="1.5">PARADISE ISLAND</text>
            <g fontFamily="IBM Plex Mono" fontSize="10.5" letterSpacing="1.4" fill="#efede8">
              <rect x="170" y="186" width="70" height="34" fill="none" stroke="#efede8" strokeOpacity=".4" strokeDasharray="3 3" />
              <path d="M178 212 L232 192" stroke="#efede8" strokeOpacity=".5" strokeWidth="3" />
              <text x="205" y="244" textAnchor="middle" opacity=".7">AIRPORT (NAS)</text>
              <circle cx="560" cy="150" r="4" fill="#efede8" opacity=".8" />
              <text x="560" y="172" textAnchor="middle" opacity=".7">DOWNTOWN NASSAU</text>
            </g>
            <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8, ease }} style={{ transformOrigin: "262px 214px" }}>
              <circle cx="262" cy="214" r="24" fill="none" stroke="#d8c39a" strokeWidth="1" />
              <circle cx="262" cy="214" r="7" fill="#d8c39a" />
            </motion.g>
            <text x="296" y="210" fontFamily="Archivo" fontWeight="600" fontSize="18" fill="#efede8">Jones Construction</text>
            <text x="296" y="230" fontFamily="IBM Plex Mono" fontSize="10.5" letterSpacing="1.4" fill="#d8c39a">AIRPORT INDUSTRIAL PARK</text>
            <text x="40" y="360" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1.2" fill="#efede8" opacity=".5">NEW PROVIDENCE · SCHEMATIC, NOT TO SCALE</text>
          </svg>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Jones Construction Company?", "The office is in Airport Industrial Park, Nassau, New Providence. Postal address: P.O. Box N-3409, Nassau."],
  ["How do I start a project with Jones Construction?", `Call the office on ${PHONE}. It helps to have the site location, the type of building, rough size and your timing ready, plus any drawings. The project brief above puts all of that in one line for you.`],
  ["Does Jones Construction offer construction consulting?", "Yes. The company is listed as construction consultants in the Bahamas business directory. Call the office to discuss what you need."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4">
        <Label n="05">Questions</Label>
        <h2 id="faq-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">Before you call.</h2>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl font-[560] [font-stretch:108%] hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Office() {
  return (
    <section id="office" className="border-t border-line bg-paper-2" aria-labelledby="office-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="06">Office</Label>
          <h2 id="office-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">One number for every project.</h2>
          <a href={TEL} className="group mt-10 block bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-cobalt-deep md:p-9">
            <span className="label text-sand">Call the office</span>
            <span className="mt-3 flex items-center justify-between font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-[600] leading-none tracking-[-0.03em] [font-stretch:115%]">{PHONE}<ArrowUpRight className="size-8 text-sand transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden /></span>
            <span className="mt-4 block text-paper/70">Airport Industrial Park, Nassau · P.O. Box N-3409</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden border border-line">
          <iframe title="Map of Airport Industrial Park, Nassau, New Providence" loading="lazy" className="h-[420px] w-full lg:h-full" src="https://www.google.com/maps?q=Airport+Industrial+Park,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyBand /><Process /><Scope /><Brief n="03" /><Base /><Questions /><Office /></Page>)
