import { lazy, Suspense, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check, Mail, Minus, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Marquee } from "@/components/magicui/marquee"
import { Page, mount, Reveal, Label, SplitHead, ease, reveal, C } from "./site"
import type { SheetKind } from "./Scene"

const Scene = lazy(() => import("./Scene"))

const SHEET_INFO: Record<SheetKind, { t: string; d: string; href: string; cta: string }> = {
  proof: { t: "Digital on-demand printing", d: "Colour and black-and-white jobs at the Document Centre, powered by Xerox.", href: "document-centre.html", cta: "The Document Centre" },
  plan: { t: "Architectural and engineering prints", d: "Plans and drawings for architects, engineers and contractors.", href: "document-centre.html", cta: "The Document Centre" },
  receipt: { t: "Point of sale and ATMs", d: "NCR hardware, software and service for banks, retailers and restaurants.", href: "#supply", cta: "NCR at BBSL" },
  letter: { t: "Mail, out the door fast", d: "Neopost sorters, folders and inserters for high-volume mailings.", href: "#supply", cta: "Mailing equipment" },
  poster: { t: "Wide format colour", d: "Banners and posters printed at the Document Centre.", href: "document-centre.html", cta: "Wide format" },
  record: { t: "Scanned, indexed, findable", d: "OnBase by Hyland keeps critical business content in one place.", href: "#supply", cta: "Content management" },
}

function Hero() {
  const [active, setActive] = useState<SheetKind | null>(null)
  const info = active ? SHEET_INFO[active] : null
  return (
    <section className="paper-tex relative isolate overflow-hidden bg-paper md:h-[calc(100svh-110px)] md:min-h-[680px]" aria-labelledby="hero-title">
      {/* proof frame: crop marks + colour bar, the language of a print room */}
      <div className="pointer-events-none absolute inset-3 md:inset-6" aria-hidden>
        <span className="crop -top-3.5 -left-3.5" /><span className="crop -top-3.5 -right-3.5" /><span className="crop -bottom-3.5 -left-3.5" /><span className="crop -right-3.5 -bottom-3.5" />
      </div>
      <motion.div aria-hidden className="absolute top-6 right-6 hidden origin-left md:flex md:top-10 md:right-12" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 1.2, ease: reveal }}>
        {["#121417", "#0a6d8c", "#e3b505", "#3b3f44", "#6b6e72", "#9a9c9f", "#c4c5c6", "#e2e2e2"].map(c => <span key={c} className="h-3 w-7" style={{ background: c }} />)}
      </motion.div>

      <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-1 px-5 md:grid-cols-12 md:px-10">
        <div className="pointer-events-none relative z-10 flex flex-col justify-between pt-12 pb-6 md:col-span-7 md:pt-20 md:pb-14 [&_a]:pointer-events-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Label>Xerox · NCR · Lenovo · HP · Neopost · OnBase</Label>
          </motion.div>
          <div className="mt-10 md:mt-0">
            <h1 id="hero-title" className="font-display text-[clamp(3.2rem,7.2vw,8.4rem)] leading-[0.86] tracking-[-0.03em]">
              <span className="sr-only">Bahamas Business Solutions: office technology, print and service in Nassau and Freeport. </span>
              <SplitHead lines={["Global", "technology,", "delivered locally."]} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }} className="mt-8 max-w-[34rem] text-[18px] leading-relaxed text-muted">
              The Bahamas' Xerox distributor since 1966. Copiers, printers, ATMs and point of sale, sold, installed and serviced by our own engineers in Nassau and Freeport.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
              <a href="#quote" className="group inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-[16px] text-paper transition hover:-translate-y-0.5 hover:bg-cyan-deep active:translate-y-0">
                Request a quote <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
              <a href="#quote" data-tab="service" className="inline-flex min-h-12 items-center gap-2 border border-ink px-6 text-[16px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper active:translate-y-0">Book a service call</a>
            </motion.div>
          </div>
          <p className="mt-10 hidden font-mono text-[11px] tracking-[0.14em] text-muted uppercase md:block">BBSL · Proof 01 · Nassau + Freeport · 100% Bahamian owned</p>
        </div>

        <motion.div className="relative pb-8 md:absolute md:inset-0 md:pb-0" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.4, ease: reveal }}>
          <div className="h-[96vw] max-h-[520px] md:h-full md:max-h-none"><Suspense fallback={<div className="size-full" />}><Scene active={active} onPick={setActive} /></Suspense></div>
          <div className="pointer-events-none relative md:absolute md:right-12 md:bottom-14 md:w-[340px]">
            <AnimatePresence mode="wait">
              <motion.div key={active ?? "none"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }} className="pointer-events-auto border border-line bg-sheet/80 p-5 backdrop-blur-lg">
                {info ? (
                  <>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">From the stack</p>
                    <p className="mt-2 font-display text-2xl leading-tight">{info.t}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{info.d}</p>
                    <a href={info.href} className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-[14px] text-cyan-deep underline-offset-4 hover:underline">{info.cta} <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden /></a>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">Six documents, one supplier</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">Point at a sheet to see who at BBSL handles it: the proof, the plan, the receipt, the letter, the poster, the record.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    { k: "Freeport", v: C.freeport.phone, s: "Queens Highway, Grand Bahama", href: C.freeport.tel },
    { k: "Nassau", v: C.nassau.phone, s: "Collins Avenue & 7th Terrace", href: C.nassau.tel },
    { k: "Service helpdesk", v: C.service.phone, s: "Mon to Fri, 8:30am to 5:00pm", href: C.service.tel },
    { k: "Since 1966", v: "Xerox Bahamas", s: "100% Bahamian owned, 80+ staff", href: "#history" },
  ]
  return (
    <section className="bg-graphite text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.li key={it.k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="border-paper/12 border-b sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={it.href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="font-mono text-[11px] tracking-[0.2em] text-toner uppercase">{it.k}</span>
              <span className="mt-2 block font-display text-[clamp(1.9rem,2.5vw,2.5rem)] leading-none">{it.v}</span>
              <span className="mt-3 block text-[14px] text-paper/65">{it.s}</span>
              <span className="mt-4 block h-px w-0 bg-toner transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const LINES = [
  { name: "Xerox", role: "Exclusive local distributor", body: "Multifunction devices, stand-alone printers, production devices and high-resolution scanners for a home office, a mid-sized firm or a large enterprise. Competitive pricing, local service support and a local warranty.", uses: ["Multifunction devices", "Production printing", "High-resolution scanners", "Authorized service centre"] },
  { name: "NCR", role: "Authorized dealer and service centre", body: "Hardware, software and service for financial institutions of any size: ATMs, payment solutions and point of sale, including mobile, plus table and guest management for restaurants.", uses: ["ATMs", "Payment solutions", "Point of sale", "Financial equipment repair"] },
  { name: "OnBase by Hyland", role: "Local representative", body: "Software to manage critical business content in one central place, so the paper that comes in becomes a record your team can find.", uses: ["Content management", "Scanning and imaging", "Workflow"] },
  { name: "Lenovo & HP", role: "Partners", body: "A full line of PCs, servers and networking, installed and supported by the same team that services your printers.", uses: ["PCs", "Servers", "Networking", "Structured cabling"] },
  { name: "Neopost", role: "Mailing systems", body: "High-speed sorters, folders and inserters, so key documents leave the building fast.", uses: ["Sorting", "Folding", "Inserting"] },
  { name: "Tyco / Sensormatic", role: "Security", body: "Video surveillance, access control and theft prevention for shops, offices and public buildings.", uses: ["Video surveillance", "Access control", "Theft prevention"] },
]

function Supply() {
  const [i, setI] = useState(0)
  const l = LINES[i]
  return (
    <section id="supply" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="supply-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Label n="01">What we supply</Label>
          <h2 id="supply-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.96] tracking-[-0.02em]">World brands, one local number.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Every line below is sold, installed and serviced from Nassau and Freeport. Choose one to see what it covers.</p>
        </Reveal>
        <div className="md:col-span-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <ol className="border-t border-line" role="tablist" aria-label="Product lines">
              {LINES.map((x, k) => (
                <li key={x.name} className="border-b border-line">
                  <button role="tab" aria-selected={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className="group flex min-h-[64px] w-full items-baseline gap-5 py-4 text-left">
                    <span className={`font-mono text-[11px] transition ${k === i ? "text-cyan" : "text-muted"}`}>{String(k + 1).padStart(2, "0")}</span>
                    <span className={`font-display text-[clamp(1.8rem,2.8vw,2.7rem)] leading-none transition duration-500 ${k === i ? "translate-x-2 text-ink" : "text-ink/45 group-hover:translate-x-1 group-hover:text-ink/80"}`}>{x.name}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="relative lg:sticky lg:top-28 lg:self-start" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={l.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }} className="relative bg-sheet p-7 shadow-[0_1px_0_#d3cec2,0_30px_60px_-30px_rgba(18,20,23,.25)] md:p-9">
                  <span className="crop -top-3.5 -left-3.5" aria-hidden /><span className="crop -right-3.5 -bottom-3.5" aria-hidden />
                  <p className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">{l.role}</p>
                  <p className="mt-3 font-display text-4xl leading-none">{l.name}</p>
                  <p className="mt-5 text-[16px] leading-relaxed text-muted">{l.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {l.uses.map(u => <li key={u} className="border border-line px-3 py-1.5 text-[13px]">{u}</li>)}
                  </ul>
                  <a href="#quote" className="group mt-7 inline-flex min-h-11 items-center gap-2 text-[15px] text-cyan-deep">Ask for a {l.name} quote <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
                </motion.div>
              </AnimatePresence>
              <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">Also on our vendor list: Riso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const SECTORS = ["Government", "Commercial banks", "Private banks", "Utility companies", "Healthcare", "Hotels & hospitality", "The Bahamas", "Turks & Caicos Islands"]
function Sectors() {
  return (
    <section className="border-y border-line bg-paper-2 py-8" aria-label="Who BBSL serves">
      <Marquee className="[--duration:55s] [--gap:3rem]" pauseOnHover>
        {SECTORS.map(s => <span key={s} className="flex items-center gap-12 font-display text-[clamp(1.8rem,3vw,2.8rem)] italic text-ink/80">{s}<span className="size-2 rotate-45 bg-cyan" aria-hidden /></span>)}
      </Marquee>
    </section>
  )
}

type Cover = "yes" | "no" | "billed" | "ask"
const PLANS: { id: string; name: string; tag: string; d: string; cover: Record<string, Cover> }[] = [
  { id: "tm", name: "Time & materials", tag: "Pay per call", d: "We come when you call and bill the visit: the parts used and the hours worked.", cover: { Labour: "billed", Parts: "billed", "Everything else": "billed", Paper: "no" } },
  { id: "full", name: "Full-service maintenance", tag: "Parts and labour covered", d: "One maintenance programme that covers parts and labour on your equipment.", cover: { Labour: "yes", Parts: "yes", "Everything else": "ask", Paper: "no" } },
  { id: "mps", name: "Managed print", tag: "Everything but paper", d: "A managed print service contract that covers everything except the paper.", cover: { Labour: "yes", Parts: "yes", "Everything else": "yes", Paper: "no" } },
]
const SERVICES = ["Xerox authorized distributor and service centre", "NCR authorized distributor and service centre", "ATM and financial equipment repair", "Computer repair", "Printer and fax repair", "Network installation and support", "Structured cabling", "IT consulting services"]

function CoverMark({ v }: { v: Cover }) {
  if (v === "yes") return <span className="inline-flex items-center gap-1.5 text-cyan-deep"><Check className="size-4" aria-hidden /> Covered</span>
  if (v === "billed") return <span className="text-ink">Billed per visit</span>
  if (v === "ask") return <span className="text-muted">Ask us</span>
  return <span className="inline-flex items-center gap-1.5 text-muted"><Minus className="size-4" aria-hidden /> Not included</span>
}

function Service() {
  const [p, setP] = useState(PLANS[2].id)
  const plan = PLANS.find(x => x.id === p)!
  return (
    <section id="service" className="relative scroll-mt-24 bg-ink text-paper" aria-labelledby="service-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Label n="02" light>Service plans</Label>
            <h2 id="service-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.96] tracking-[-0.02em]">We service everything we sell.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">Factory-trained, industry-certified field service engineers, some with more than 25 years in the business. Choose how you want to pay for it, or ask for a plan somewhere in between.</p>
            <a href={C.service.tel} className="group mt-9 inline-flex min-h-12 items-center gap-3 border border-paper/30 px-6 transition hover:-translate-y-0.5 hover:border-toner">
              <Phone className="size-4" aria-hidden /> Service helpdesk {C.service.phone}
            </a>
            <p className="mt-3 text-[14px] text-paper/55">Monday to Friday, 8:30am to 5:00pm. Or bring equipment to our service centre.</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <div role="radiogroup" aria-label="Service plan" className="grid gap-px bg-paper/15 sm:grid-cols-3">
              {PLANS.map(x => (
                <button key={x.id} role="radio" aria-checked={x.id === p} onClick={() => setP(x.id)} className={`min-h-[96px] p-5 text-left transition ${x.id === p ? "bg-paper text-ink" : "bg-ink hover:bg-graphite"}`}>
                  <span className={`block font-mono text-[10px] tracking-[0.18em] uppercase ${x.id === p ? "text-cyan" : "text-toner"}`}>{x.tag}</span>
                  <span className="mt-2 block font-display text-[1.6rem] leading-tight">{x.name}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={plan.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-paper p-6 text-ink md:p-8">
                <p className="max-w-lg text-[16px] leading-relaxed text-muted">{plan.d}</p>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {Object.entries(plan.cover).map(([k, v], n) => (
                    <motion.div key={k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: n * 0.06, duration: 0.5, ease }} className="flex items-center justify-between py-3.5 text-[15px]">
                      <dt className="font-display text-xl">{k}</dt><dd><CoverMark v={v} /></dd>
                    </motion.div>
                  ))}
                </dl>
                <a href="#quote" data-tab="service" className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] text-cyan-deep">Ask about {plan.name.toLowerCase()} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
        <ol className="mt-20 grid border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, k) => (
            <motion.li key={s} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (k % 4) * 0.06, duration: 0.7, ease }} className="group flex gap-4 border-b border-paper/15 py-5 pr-6">
              <span className="font-mono text-[11px] text-toner">{String(k + 1).padStart(2, "0")}</span>
              <span className="text-[16px] text-paper/85 transition group-hover:translate-x-1">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const YEARS = [
  { y: "1966", t: "Xerox (Bahamas) Limited", d: "The company opens in Nassau. It has been in the document business ever since." },
  { y: "1968", t: "Freeport", d: "Two years later, a subsidiary office opens in Freeport, Grand Bahama." },
  { y: "1987", t: "Bahamian hands", d: "In March the management team buys the company from Xerox and becomes the local distributor for the full Xerox line. Later that year it adds NCR." },
  { y: "2002", t: "Bahamas Business Solutions", d: "In August the company merges with Bahamas Business Solutions Limited and takes the name it carries today." },
  { y: "Today", t: "Nassau, Freeport, Turks & Caicos", d: "100% Bahamian owned, more than 80 full-time employees, and more than 3,000 customers across The Bahamas and the Turks & Caicos Islands." },
]

function History() {
  return (
    <section id="history" className="paper-tex scroll-mt-24 bg-paper py-24 md:py-36" aria-labelledby="history-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Label n="03">Since 1966</Label>
          <h2 id="history-title" className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.96] tracking-[-0.02em]">Sixty years of keeping island offices printing.</h2>
        </Reveal>
        <ol className="-mx-5 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0">
          {YEARS.map((e, k) => (
            <motion.li key={e.y} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: k * 0.1, duration: 1, ease }} className={`group relative w-[78vw] shrink-0 snap-start bg-sheet p-6 shadow-[0_1px_0_#d3cec2,0_24px_50px_-28px_rgba(18,20,23,.3)] transition duration-500 hover:-translate-y-1 sm:w-[340px] md:w-auto ${k % 2 ? "md:mt-16" : ""}`}>
              <span className="crop -top-3.5 -left-3.5" aria-hidden />
              <p className="font-display text-[clamp(3.6rem,5vw,5.4rem)] leading-none tracking-[-0.03em]">{e.y}</p>
              <div className="mt-5 h-px w-full origin-left bg-line transition duration-700 group-hover:bg-cyan" />
              <p className="mt-5 font-display text-2xl leading-tight">{e.t}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{e.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const LINES_OPTS = ["Xerox printing and copying", "NCR ATMs or point of sale", "OnBase content management", "PCs, servers, networking", "Neopost mailing", "Security: Tyco / Sensormatic", "Not sure yet"]
const JOBS = ["Digital printing", "Architectural & engineering prints", "Wide format colour", "Banners and posters", "Scanning and imaging", "Binding", "Booklets", "Graphic design", "Custom printing"]
type Field = { k: string; type: "text" | "date" | "select" | "area" | "tel" | "email"; opts?: string[]; full?: boolean }
const FORMS: Record<string, { label: string; to: string; phone: [string, string]; intro: string; fields: Field[] }> = {
  equipment: { label: "Equipment quote", to: C.sales.email, phone: [C.nassau.phone, C.nassau.tel], intro: "Copiers, printers, ATMs, point of sale, PCs or mailing systems. Sales replies by email.", fields: [
    { k: "Your name", type: "text" }, { k: "Organisation", type: "text" }, { k: "Island", type: "select", opts: ["New Providence", "Grand Bahama", "Another island", "Turks & Caicos"] }, { k: "Interested in", type: "select", opts: LINES_OPTS }, { k: "Phone", type: "tel" }, { k: "What should it do?", type: "area", full: true }] },
  service: { label: "Service call", to: C.service.email, phone: [C.service.phone, C.service.tel], intro: "Something not working? Tell the helpdesk what it is and where it is.", fields: [
    { k: "Your name", type: "text" }, { k: "Organisation", type: "text" }, { k: "Equipment make and model", type: "text" }, { k: "Island", type: "select", opts: ["New Providence", "Grand Bahama", "Another island", "Turks & Caicos"] }, { k: "Phone", type: "tel" }, { k: "What is happening?", type: "area", full: true }] },
  print: { label: "Print job", to: C.copy.email, phone: [C.copy.phone, C.copy.tel], intro: "Send the job details to the Document Centre. Attach your files in the email that opens.", fields: [
    { k: "Your name", type: "text" }, { k: "Job type", type: "select", opts: JOBS }, { k: "Quantity", type: "text" }, { k: "Needed by", type: "date" }, { k: "Collect in", type: "select", opts: ["Nassau", "Freeport"] }, { k: "Notes", type: "area", full: true }] },
}

function Quote() {
  const [tab, setTab] = useState("equipment")
  const [vals, setVals] = useState<Record<string, string>>({})
  const f = FORMS[tab]
  const get = (k: string) => vals[`${tab}:${k}`] ?? ""
  const lines = f.fields.map(x => get(x.k) ? `${x.k}: ${get(x.k)}` : null).filter(Boolean) as string[]
  const href = useMemo(() => `mailto:${f.to}?subject=${encodeURIComponent(`${f.label} request via website`)}&body=${encodeURIComponent(`Hello BBSL,\n\n${lines.join("\n")}\n\nThank you.`)}`, [f, lines])
  // let in-page buttons with data-tab open the right tab
  if (typeof window !== "undefined") (window as unknown as { __bbslTab?: (t: string) => void }).__bbslTab = setTab
  return (
    <section id="quote" className="scroll-mt-24 bg-paper-2" aria-labelledby="quote-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-4">
          <Label n="04">Request a quote</Label>
          <h2 id="quote-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.96] tracking-[-0.02em]">Tell us once. The right desk replies.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Sales, service and the Document Centre each have their own inbox. Pick the request, fill in what you know, and your email app opens with it written.</p>
          <ul className="mt-10 space-y-3 font-mono text-[12px] tracking-[0.06em] text-muted">
            {Object.values(FORMS).map(x => <li key={x.to} className="flex justify-between gap-4 border-b border-line pb-2"><span>{x.label}</span><span className="text-ink">{x.to}</span></li>)}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-none bg-paper p-1">
              {Object.entries(FORMS).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded-none px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">{x.label}</TabsTrigger>)}
            </TabsList>
            {Object.entries(FORMS).map(([k, x]) => (
              <TabsContent key={k} value={k} className="mt-8">
                <p className="text-[15px] text-muted">{x.intro}</p>
                <div className="mt-6 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  {x.fields.map(fl => {
                    const id = `${k}-${fl.k.replace(/\W+/g, "-").toLowerCase()}`
                    const v = vals[`${k}:${fl.k}`] ?? ""
                    const set = (val: string) => setVals(s => ({ ...s, [`${k}:${fl.k}`]: val }))
                    const cls = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-cyan"
                    return (
                      <div key={fl.k} className={fl.full ? "sm:col-span-2" : ""}>
                        <label htmlFor={id} className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{fl.k}</label>
                        {fl.type === "select" ? (
                          <select id={id} value={v} onChange={e => set(e.target.value)} className={cls}><option value="">Choose…</option>{fl.opts!.map(o => <option key={o}>{o}</option>)}</select>
                        ) : fl.type === "area" ? (
                          <textarea id={id} rows={3} value={v} onChange={e => set(e.target.value)} className={`${cls} resize-none py-2`} />
                        ) : (
                          <input id={id} type={fl.type} value={v} onChange={e => set(e.target.value)} className={cls} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="relative mt-10 bg-sheet p-6 shadow-[0_1px_0_#d3cec2] md:p-8">
            <span className="crop -top-3.5 -right-3.5" aria-hidden />
            <p className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">Your request, to {f.to}</p>
            <p className="mt-3 min-h-12 text-[15px] leading-relaxed text-ink">{lines.length ? lines.join(" · ") : <span className="text-muted">Your details appear here as you type.</span>}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={href} className="group inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-cyan-deep active:translate-y-0"><Mail className="size-4" aria-hidden /> Email this {f.label.toLowerCase()} request</a>
              <a href={f.phone[1]} className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink px-6 transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> Or call {f.phone[0]}</a>
            </div>
            <p className="mt-4 text-[13px] text-muted">Opens your email app with everything filled in. Nothing is sent until you press send.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export const FAQ = [
  ["Where are BBSL's offices?", `In Nassau at Collins Avenue & 7th Terrace, call ${C.nassau.phone}. In Freeport on Queens Highway, Grand Bahama, call ${C.freeport.phone}. BBSL also has an office in the Turks & Caicos Islands.`],
  ["What service plans does BBSL offer?", "Time and materials, a full-service maintenance programme that covers parts and labour, a managed print service contract that covers everything except paper, or a plan somewhere in between."],
  ["When is the service helpdesk open?", `Monday to Friday, 8:30am to 5:00pm, on ${C.service.phone} or ${C.service.email}. You can also bring equipment into the service centre for repairs.`],
  ["Can I send print jobs to the Document Centre online?", `Yes. The Copy Service accepts remote document submission. Email ${C.copy.email} or call ${C.copy.phone}.`],
  ["Is BBSL a Bahamian company?", "Yes. Bahamas Business Solutions is one hundred percent Bahamian owned and has been in the document business since it began as Xerox (Bahamas) Limited in 1966."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4">
        <Label n="05">Questions</Label>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.98]">What offices ask us first.</h2>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="min-h-14 py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Offices() {
  const [o, setO] = useState<"freeport" | "nassau">("freeport")
  const off = C[o]
  const q = o === "freeport" ? "Queens Highway, Freeport, Grand Bahama, Bahamas" : "Collins Avenue and 7th Terrace, Nassau, Bahamas"
  return (
    <section id="offices" className="scroll-mt-24 border-t border-line bg-paper-2" aria-labelledby="offices-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-5">
          <Label n="06">Offices</Label>
          <h2 id="offices-title" className="mt-5 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.98]">Two islands, one team.</h2>
          <div className="mt-9 grid grid-cols-2 gap-px bg-line" role="tablist" aria-label="Choose an office">
            {(["freeport", "nassau"] as const).map(k => (
              <button key={k} role="tab" aria-selected={o === k} onClick={() => setO(k)} className={`min-h-12 text-[15px] transition ${o === k ? "bg-ink text-paper" : "bg-paper hover:bg-sheet"}`}>{C[k].label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.a key={o} href={off.tel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-px block bg-ink p-7 text-paper transition hover:bg-graphite">
              <span className="font-mono text-[11px] tracking-[0.18em] text-toner uppercase">{off.label} office</span>
              <span className="mt-3 block font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none">{off.phone}</span>
              <span className="mt-3 block text-paper/70">{off.address}{o === "nassau" ? `, ${C.nassau.box}` : ""}</span>
            </motion.a>
          </AnimatePresence>
          <p className="mt-6 text-[15px] text-muted">Email <a className="text-ink underline-offset-4 hover:underline" href={`mailto:${C.info}`}>{C.info}</a> for anything else.</p>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden border border-line md:col-span-7">
          <iframe key={o} title={`Map of the BBSL ${off.label} office`} loading="lazy" className="h-[420px] w-full md:h-full" src={`https://www.google.com/maps?q=${encodeURIComponent("Bahamas Business Solutions, " + q)}&output=embed`} />
        </Reveal>
      </div>
    </section>
  )
}

function useTabLinks() {
  if (typeof document === "undefined") return
  document.addEventListener("click", e => {
    const a = (e.target as HTMLElement).closest("[data-tab]") as HTMLElement | null
    if (a) (window as unknown as { __bbslTab?: (t: string) => void }).__bbslTab?.(a.dataset.tab!)
  })
}
useTabLinks()

mount(<Page current=""><Hero /><KeyInfo /><Supply /><Sectors /><Service /><History /><Quote /><Questions /><Offices /></Page>)
