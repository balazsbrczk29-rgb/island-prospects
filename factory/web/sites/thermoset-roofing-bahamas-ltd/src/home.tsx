import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease, reveal, C, IMG } from "./site"
import { LAYERS } from "./layers"

const Scene = lazy(() => import("./Scene"))

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[calc(100svh-110px)] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-between px-5 pt-14 pb-10 md:px-10 lg:col-span-7 lg:pt-20 lg:pb-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Label>Roofing · Waterproofing · Construction · Nassau</Label></motion.div>
          <div className="mt-10 lg:mt-0">
            <h1 id="hero-title" className="font-display text-[clamp(3rem,7.2vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
              <span className="sr-only">Thermoset Roofing Bahamas: </span>
              {["The roof over", "the brands", "you know."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]"><motion.span className={`block ${i === 2 ? "text-steel" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.09, duration: 1, ease: reveal }}>{l}</motion.span></span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-7 max-w-[34rem] text-[18px] leading-relaxed text-muted">
              Bahamian-owned roofing and waterproofing contractor since 2002. Single-ply membranes, metal, shingle and torch-applied systems for homes, resorts, churches and commercial buildings.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }} className="mt-8 flex flex-wrap gap-3">
              <a href="#estimate" className="group inline-flex min-h-13 items-center gap-2 bg-ink px-6 py-3 text-[17px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-steel">Request a free estimate <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              <a href={C.officeTel} className="inline-flex min-h-13 items-center gap-2 border border-ink px-6 py-3 text-[17px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-white"><Phone className="size-4" aria-hidden /> {C.office}</a>
            </motion.div>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-10 max-w-lg border-t border-line pt-4 font-mono text-[11.5px] leading-relaxed tracking-[0.06em] text-muted uppercase">Licensed, insured, factory-certified installers of Carlisle, Elevate, Englert, Sika, Siplast and Tremco roofing products</motion.p>
        </div>
        <motion.div className="relative min-h-[60vw] lg:col-span-5 lg:min-h-0" initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.25, duration: 1.4, ease: reveal }}>
          <img src={IMG.membrane} alt="Thermoset crew installing a waterproof membrane on a flat commercial roof" width={1500} height={1000} fetchPriority="high" className="absolute inset-0 size-full bg-paper-2 object-cover" />
          <span className="absolute bottom-0 left-0 h-3 w-1/3 bg-vis" aria-hidden />
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [["Office", C.office, C.officeTel], ["Yard & office", "7 Portago Road, Oakesfield", "#office"], ["Estimates", "Always free", "#estimate"], ["Serving", "New Providence and the islands", "#clients"]]
  return (
    <section className="bg-ink text-white" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-white/12 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="font-mono text-[11px] tracking-[0.14em] text-vis uppercase">{k}</span>
              <span className="mt-2 block font-display text-[1.5rem] leading-tight font-bold tracking-tight">{v}</span>
              <span className="mt-3 block h-[3px] w-0 bg-vis transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const LAYER_COPY = [
  "The structural deck the whole system is fastened to.",
  "Thermal insulation board, laid to keep heat out and support the membrane.",
  "A cover board protects the insulation and gives the membrane a firm, even base.",
  "High-performance thermoplastic single-ply membrane for flat commercial and residential roofs.",
  "Perimeter flashing and edge metal fabricated in Kynar-finished aluminium or galvanized steel.",
  "Custom fabricated mechanical curbs to carry rooftop HVAC units, flashed into the membrane.",
]

function Systems() {
  const ref = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", v => { progress.current = v; setActive(Math.min(LAYERS.length - 1, Math.floor(v * LAYERS.length * 1.02))) })
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) progress.current = 1 }, [])
  return (
    <section id="systems" ref={ref} className="relative scroll-mt-24 bg-white" style={{ height: "320vh" }} aria-labelledby="systems-title">
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] flex-col overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1440px] flex-1 gap-6 px-5 py-10 md:px-10 lg:grid-cols-12 lg:py-14">
          <div className="lg:col-span-4">
            <Label n="01">Anatomy of a Thermoset roof</Label>
            <h2 id="systems-title" className="mt-4 font-display text-[clamp(2rem,3.6vw,3.6rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">Built in layers. <span className="text-steel">Detailed at the edges.</span></h2>
            <ol className="mt-8 hidden border-t border-line lg:block">
              {LAYERS.map((l, i) => (
                <li key={l.key} className={`border-b border-line py-3 transition duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}>
                  <p className="flex items-baseline gap-3"><span className="font-mono text-[11px] text-steel">0{i + 1}</span><span className="font-display text-lg font-bold tracking-tight">{l.label}</span></p>
                  <p className={`grid pl-8 text-[15px] text-muted transition-[grid-template-rows] duration-500 ${i === active ? "grid-rows-[1fr] pt-1" : "grid-rows-[0fr]"}`}><span className="overflow-hidden">{LAYER_COPY[i]}</span></p>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative min-h-[300px] lg:col-span-8">
            <Suspense fallback={<div className="size-full" />}><Scene progress={progress} active={active} /></Suspense>
            <div className="absolute inset-x-0 bottom-0 lg:hidden">
              <p className="font-mono text-[11px] text-steel">0{active + 1} / 06</p>
              <p className="font-display text-xl font-bold">{LAYERS[active].label}</p>
              <p className="text-[15px] text-muted">{LAYER_COPY[active]}</p>
            </div>
            <p className="absolute top-0 right-0 font-mono text-[10.5px] tracking-[0.1em] text-muted uppercase">Illustration of a typical single-ply assembly</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const CLIENTS: Record<string, string[]> = {
  "Resorts & hotels": ["Baha Mar", "Atlantis", "Sandals Royal Bahamian", "Goldwynn", "Harborside", "Albany", "Breezes", "Four Seasons (now Ocean Club)", "Aquilina Resort", "The One", "The Pointe and Margaritaville", "The British Colonial Hotel"],
  "Churches": ["Christ Church Cathedral", "The Church of the Most Holy Trinity", "Hillview Seventh Day Adventist Church", "St. George's Anglican Church", "Epiphany Church", "Grants Town Seventh Day Adventist Church", "Saint Martin de Porres Convent", "The Bahamas Jewish Center"],
  "Public & institutional": ["Lynden Pindling International Airport", "U.S. Embassy, Nassau", "The Princess Margaret Hospital", "Festival Place", "Loyola Hall", "Mount Moriah Community Center", "The Paradise Island Police Station"],
  "Commercial": ["The Mall at Marathon", "Sysco Bahamas Food Service", "Cable Bahamas", "Batelco", "Wendy's (Freeport and Nassau)", "Popeye's", "Shell and Rubis stations", "B.A.F. Insurance", "J.S. Johnson Insurance", "Tropic Seafood", "Sandy Port Plaza", "ASA H. Pritchard Ltd."],
}

function Clients() {
  const cats = Object.keys(CLIENTS)
  const [cat, setCat] = useState(cats[0])
  return (
    <section id="clients" className="scroll-mt-24" aria-labelledby="clients-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label n="02">Two decades of roofs</Label>
            <h2 id="clients-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.96] font-extrabold tracking-[-0.04em]">New roofs and re-roofs across The Bahamas.</h2>
            <p className="mt-5 max-w-md text-[17px] text-muted">A sample of the clients Thermoset lists for roofing and waterproofing work, from resorts to churches and public buildings.</p>
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Client type">
              {cats.map(c => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`min-h-11 px-4 text-[15px] transition ${cat === c ? "bg-ink text-white" : "border border-line hover:border-ink"}`}>{c}</button>)}
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.ul key={cat} className="columns-1 gap-8 sm:columns-2" initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.035 } }, h: {} }}>
                {CLIENTS[cat].map(n => (
                  <motion.li key={n} variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } }} className="group break-inside-avoid border-b border-line py-3.5 font-display text-[1.45rem] leading-tight font-bold tracking-tight">
                    <span className="inline-block transition group-hover:translate-x-1 group-hover:text-steel">{n}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          <Photo src={IMG.scaffold} alt="Thermoset crew on scaffolding working on a house roof" className="aspect-[4/3]" />
          <Photo src={IMG.waterproof} alt="Waterproofing work by Thermoset" className="aspect-[4/3] md:mt-12" />
          <Photo src={IMG.construction} alt="General construction work by Thermoset" className="aspect-[4/3]" />
        </div>
      </div>
    </section>
  )
}

const RADAR = [
  ["Scheduled preventative maintenance", "Routine inspections and debris removal to catch minor issues early."],
  ["Leak investigation and repair", "Prompt response to active leaks, with full documentation and visual reports."],
  ["Roof condition reports", "After each visit: high-resolution photos, core samples if required, clear next steps."],
  ["Priority emergency service", "Members move to the front of the line during storms and sudden repairs."],
  ["Asset management planning", "Annual reporting and capital planning for smarter facility budgets."],
  ["Warranty compliance monitoring", "Keeps your roof meeting the manufacturer's warranty requirements."],
]
function Radar() {
  return (
    <section className="bg-steel-deep text-white" aria-labelledby="radar-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="03" light>R.A.D.A.R. program</Label>
          <h2 id="radar-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.96] font-extrabold tracking-[-0.04em]">Roof Assessment, Diagnostics and Response.</h2>
          <p className="mt-5 max-w-md text-[17px] text-white/75">A proactive maintenance and repair service that protects your roofing investment and extends its life. Plans for commercial complexes, industrial facilities and luxury residential estates.</p>
          <a href="#estimate" data-tab="radar" className="mt-8 inline-flex min-h-12 items-center gap-2 bg-vis px-6 font-semibold text-ink transition hover:-translate-y-0.5">Book a free roof health assessment <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
        <ol className="grid gap-px bg-white/15 sm:grid-cols-2 lg:col-span-7">
          {RADAR.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7 }} className="group bg-steel-deep p-6 transition hover:bg-steel">
              <span className="font-mono text-[11px] text-vis">R/0{i + 1}</span>
              <p className="mt-2 font-display text-xl font-bold tracking-tight">{t}</p>
              <p className="mt-1 text-[15px] text-white/70">{d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const SYSTEMS = ["TPO / PVC single-ply membrane", "Modified bitumen / torch-applied", "Standing seam and metal", "Shingle", "Not sure"]
const FORMS = {
  repair: { label: "Leak or repair", fields: [["Property type", ["Home", "Commercial", "Industrial", "Church or institution"]], ["Roof type", SYSTEMS], ["Island", ["New Providence", "Grand Bahama", "Another island"]]] },
  roof: { label: "New roof or re-roof", fields: [["Property type", ["Home", "Commercial", "Industrial", "Church or institution"]], ["System of interest", SYSTEMS], ["Island", ["New Providence", "Grand Bahama", "Another island"]]] },
  radar: { label: "R.A.D.A.R. maintenance", fields: [["Property type", ["Commercial complex", "Industrial facility", "Luxury residential estate"]], ["Roof type", SYSTEMS], ["Island", ["New Providence", "Grand Bahama", "Another island"]]] },
} as const
type FormKey = keyof typeof FORMS

function Estimate() {
  const [tab, setTab] = useState<FormKey>("repair")
  const [v, setV] = useState<Record<string, string>>({})
  const [who, setWho] = useState({ name: "", phone: "", where: "" })
  useEffect(() => {
    const h = (e: MouseEvent) => { const a = (e.target as HTMLElement).closest("[data-tab]") as HTMLElement | null; if (a?.dataset.tab) setTab(a.dataset.tab as FormKey) }
    document.addEventListener("click", h); return () => document.removeEventListener("click", h)
  }, [])
  const f = FORMS[tab]
  const lines = useMemo(() => [
    `Request: ${f.label}`,
    ...f.fields.map(([k]) => v[`${tab}:${k}`] ? `${k}: ${v[`${tab}:${k}`]}` : null),
    who.where && `Property location: ${who.where}`, who.name && `Name: ${who.name}`, who.phone && `Phone: ${who.phone}`,
  ].filter(Boolean) as string[], [f, v, tab, who])
  const mail = `mailto:${C.gm.email}?subject=${encodeURIComponent(`Free estimate: ${f.label}`)}&body=${encodeURIComponent(`Hello Thermoset,\n\n${lines.join("\n")}\n\nThank you.`)}`
  const sel = "mt-2 block min-h-12 w-full border-b-2 border-ink/20 bg-transparent text-[17px] outline-none transition focus:border-steel"
  return (
    <section id="estimate" className="scroll-mt-24 bg-paper-2" aria-labelledby="estimate-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="04">Free estimate</Label>
          <h2 id="estimate-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.96] font-extrabold tracking-[-0.04em]">All estimates are free.</h2>
          <p className="mt-5 max-w-sm text-[17px] text-muted">Expert, no-obligation assessments to help you plan with confidence. Tell us about the roof and we will be in touch.</p>
          <div className="mt-8 space-y-1 text-[15px]"><p className="font-semibold">{C.gm.name}, {C.gm.role}</p><a href={C.gm.tel} className="block hover:text-steel">{C.gm.cell}</a><a href={`mailto:${C.gm.email}`} className="block break-all hover:text-steel">{C.gm.email}</a></div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={t => setTab(t as FormKey)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-none bg-paper p-1">
              {(Object.keys(FORMS) as FormKey[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-none px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-white">{FORMS[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(FORMS) as FormKey[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-3">
                  {FORMS[k].fields.map(([label, opts]) => {
                    const id = `${k}-${label.replace(/\W+/g, "-").toLowerCase()}`
                    return <div key={label}><label htmlFor={id} className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{label}</label><select id={id} value={v[`${k}:${label}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${label}`]: e.target.value }))} className={sel}><option value="">Choose…</option>{(opts as readonly string[]).map(o => <option key={o}>{o}</option>)}</select></div>
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {([["name", "Your name", "text"], ["phone", "Phone", "tel"], ["where", "Area or address", "text"]] as const).map(([k, l, t]) => (
              <div key={k}><label htmlFor={`who-${k}`} className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{l}</label><input id={`who-${k}`} type={t} value={who[k]} onChange={e => setWho(s => ({ ...s, [k]: e.target.value }))} className={sel} /></div>
            ))}
          </div>
          <div className="mt-10 bg-ink p-6 text-white md:p-8">
            <p className="font-mono text-[11px] tracking-[0.14em] text-vis uppercase">Your request</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">{lines.join(" · ")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={mail} className="inline-flex min-h-12 items-center justify-center gap-2 bg-vis px-6 font-semibold text-ink transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden /> Email this request</a>
              <a href={C.officeTel} className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/30 px-6 transition hover:-translate-y-0.5 hover:border-white"><Phone className="size-4" aria-hidden /> Or call {C.office}</a>
            </div>
            <p className="mt-4 text-[13px] text-white/55">Opens your email app with the details filled in. Nothing is sent until you press send.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Are estimates really free?", "Yes. All estimates are free and no-obligation."],
  ["Which roofing systems do you install?", "TPO and PVC single-ply membranes, modified bitumen and torch-applied systems, standing seam and metal roofing, and architectural, synthetic and 3-tab shingles. Thermoset is a factory-certified installer of Carlisle, Elevate, Englert, Sika, Siplast and Tremco products."],
  ["Do you work outside New Providence?", "Yes. Thermoset serves residential, commercial and industrial properties throughout New Providence and the surrounding islands, with projects in Freeport among its clients."],
  ["Where is your office?", `At ${C.address}. Call the office on ${C.office}.`],
]
function Questions() {
  return (
    <section id="office" className="scroll-mt-24" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="05">Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">Before we climb up.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t-2 border-ink">
            {FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="min-h-14 py-6 text-left font-display text-xl font-bold tracking-tight hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-[16px] text-muted">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
          <div className="mt-10 h-[340px] overflow-hidden border border-line"><iframe title="Map of 7 Portago Road, Oakesfield, Nassau" loading="lazy" className="size-full" src="https://www.google.com/maps?q=Portago+Road,+Oakesfield,+Nassau,+Bahamas&output=embed" /></div>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Systems /><Clients /><Radar /><Estimate /><Questions /></Page>)
