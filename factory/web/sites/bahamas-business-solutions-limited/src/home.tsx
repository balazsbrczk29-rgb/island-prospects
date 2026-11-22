import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Check, Minus, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Feed, ProofLine, Lamp, useHelpdesk, ease, mask, C } from "./site"
import Counter, { openDoor, DOC_JOBS } from "./Counter"
import type { SheetKind } from "./Scene"

const Scene = lazy(() => import("./Scene"))

/* ---------- Screen 1: the counter ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-3 hidden md:block md:inset-6" aria-hidden>
        <span className="crop -top-3.5 -left-3.5" /><span className="crop -top-3.5 -right-3.5" /><span className="crop -bottom-3.5 -left-3.5" /><span className="crop -right-3.5 -bottom-3.5" />
      </div>
      <motion.div aria-hidden className="absolute top-10 right-14 hidden origin-left md:flex" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 1.1, ease: mask }}>
        {["var(--color-ink)", "var(--color-cyan)", "var(--color-toner)", "#373b3f", "#616467", "#909295", "#bcbebf", "#dddedf"].map(c => <span key={c} className="h-3 w-7" style={{ background: c }} />)}
      </motion.div>

      <div className="wrap grid gap-7 pt-7 pb-14 md:grid-cols-12 md:gap-6 md:pt-20 md:pb-10">
        <div className="md:col-span-5 md:flex md:flex-col md:justify-between md:pr-8">
          <div>
            <motion.h1 id="hero-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="font-display text-[length:var(--text-hero)] leading-[0.94] tracking-[-0.025em]">
              <span className="block">Tell us what you need.</span><span className="block">The right BBSL desk answers.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-6 hidden max-w-[44ch] text-[length:var(--text-lead)] leading-[1.5] text-muted md:block">
              The Bahamas' Xerox company since 1966. Copiers, printers, ATMs and point of sale, sold and serviced from offices in Nassau and Freeport.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-10 hidden md:block">
            <Marks />
          </motion.div>
        </div>
        <motion.div className="md:col-span-7" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.15, duration: 0.9, ease: mask }}>
          <Counter />
          <div className="md:hidden"><Offices2 /></div>
        </motion.div>
        <div className="md:hidden">
          <p className="max-w-[44ch] text-[17px] text-muted">The Bahamas' Xerox company since 1966. Copiers, printers, ATMs and point of sale, sold and serviced from offices in Nassau and Freeport.</p>
          <div className="mt-6"><Marks /></div>
        </div>
      </div>
      <div className="wrap hidden pb-10 md:block"><p className="slug text-right">BBSL · Proof 01 · Global Technology. Delivered Locally.</p></div>
    </section>
  )
}

function Marks() {
  return (
    <ul className="space-y-2 text-[15px]">
      {["Exclusive local Xerox distributor", "Authorised NCR dealer and service centre", "OnBase by Hyland local representative"].map(m => (
        <li key={m} className="flex items-center gap-3"><Check className="size-4 text-ink" aria-hidden />{m}</li>
      ))}
    </ul>
  )
}
function Offices2() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-px border-y border-line bg-line">
      {[C.nassau, C.freeport].map(o => (
        <a key={o.label} href={o.tel} className="group bg-paper py-3.5 pr-4 [&+a]:pl-5">
          <span className="block text-[13px] text-muted">{o.label} office</span>
          <span className="mt-1 block font-mono text-[16px] group-hover:text-cyan">{o.phone}</span>
        </a>
      ))}
    </div>
  )
}

/* ---------- Screen 2: the stack and the product lines ---------- */
const LINES: { kind: SheetKind; name: string; role: string; body: string; uses: string[] }[] = [
  { kind: "proof", name: "Xerox", role: "Exclusive local distributor", body: "Multifunction devices, stand-alone printers, production devices and high-resolution scanners for a home office, a mid-sized firm or a large enterprise. Competitive pricing, local service support and a local warranty.", uses: ["Multifunction devices", "Production printing", "High-resolution scanners", "Authorised service centre"] },
  { kind: "receipt", name: "NCR", role: "Authorised dealer and service centre", body: "Hardware, software and service for financial institutions of any size: ATMs, payment solutions and point of sale, including mobile, plus table and guest management for restaurants.", uses: ["ATMs", "Payment solutions", "Point of sale", "ATM and financial equipment repair"] },
  { kind: "record", name: "OnBase by Hyland", role: "Local representative", body: "Software to manage critical business content in one central place, so the paper that comes in becomes a record your team can find.", uses: ["Content management", "Scanning and imaging"] },
  { kind: "network", name: "Lenovo & HP", role: "PCs, servers, networking", body: "A full line of PCs, servers and networking, with network installation, structured cabling and IT consulting from BBSL's service team.", uses: ["PCs", "Servers", "Network installation", "Structured cabling"] },
  { kind: "letter", name: "Neopost", role: "Mailing systems", body: "High-speed sorters, folders and inserters, so key documents leave the building fast.", uses: ["Sorting", "Folding", "Inserting"] },
  { kind: "access", name: "Security", role: "Video, access, theft prevention", body: "Video surveillance, access control and theft prevention.", uses: ["Video surveillance", "Access control", "Theft prevention"] },
]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { rootMargin: "100px" }); io.observe(el); return () => io.disconnect() }, [])
  return [ref, v] as const
}

function Lines() {
  const [k, setK] = useState<SheetKind>("proof")
  const [ref, inView] = useInView<HTMLDivElement>()
  const l = LINES.find(x => x.kind === k)!
  return (
    <section id="lines" className="scroll-mt-6 py-[72px] md:py-32" aria-labelledby="lines-title">
      <div className="wrap">
        <ProofLine n="02" name="Equipment" />
        <h2 id="lines-title" className="mt-10 max-w-[18ch] font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">World brands, sold and serviced from two islands.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6">
          <div ref={ref} className="relative h-[300px] bg-paper-2 md:col-span-7 md:h-[600px]">
            <span className="crop -top-3.5 -left-3.5" aria-hidden /><span className="crop -right-3.5 -bottom-3.5" aria-hidden />
            <Suspense fallback={null}><Scene active={k} onPick={x => x && setK(x)} run={inView} /></Suspense>
            <p className="slug absolute bottom-4 left-5">Six documents, one supplier · tap a sheet</p>
          </div>
          <div className="md:col-span-5">
            <ol className="border-t border-line" role="tablist" aria-label="Product lines">
              {LINES.map(x => (
                <li key={x.kind} className="border-b border-line">
                  <button role="tab" aria-selected={x.kind === k} onClick={() => setK(x.kind)} className="group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left">
                    <span className={`font-display text-[30px] leading-none transition duration-300 ${x.kind === k ? "translate-x-1.5 text-ink" : "text-[#6f7276] group-hover:text-ink"}`}>{x.name}</span>
                    <span className={`text-[13px] transition ${x.kind === k ? "text-cyan" : "text-muted"}`}>{x.role}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div aria-live="polite" className="mt-8 min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div key={l.kind} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease }}>
                  <p className="max-w-[52ch] text-[16px] text-muted">{l.body}</p>
                  <p className="mt-4 text-[15px]">{l.uses.join(" · ")}</p>
                  <button onClick={() => openDoor("equip", { "Interested in": l.kind === "proof" ? "Xerox printers and copiers" : l.kind === "receipt" ? "NCR ATMs" : l.kind === "record" ? "OnBase content management" : l.kind === "network" ? "Lenovo & HP PCs, servers, networking" : l.kind === "letter" ? "Neopost mailing" : "Security: video, access control" })} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] text-ink underline underline-offset-4">Ask for a {l.name} quote <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></button>
                </motion.div>
              </AnimatePresence>
              <p className="mt-8 border-t border-line pt-4 text-[15px]">Vendors: Xerox, NCR Atleos, Riso, Lenovo, HP.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Screen 3: service ---------- */
type Cover = "yes" | "no" | "billed" | "ask"
const PLANS: { id: string; name: string; d: string; cover: Cover[] }[] = [
  { id: "Time & materials", name: "Time & materials", d: "You call, an engineer comes, the visit is billed.", cover: ["billed", "billed", "billed", "no"] },
  { id: "Full-service maintenance", name: "Full-service maintenance", d: "One programme covering parts and labour.", cover: ["yes", "yes", "ask", "no"] },
  { id: "Managed print", name: "Managed print", d: "A contract that covers everything except paper.", cover: ["yes", "yes", "yes", "no"] },
]
const ROWS = ["Labour", "Parts", "Toner and supplies", "Paper"]
const OPTIONS = ["Xerox authorised distributor and service centre", "NCR authorised distributor and service centre", "ATM and financial equipment repair", "Computer repair", "Printer and fax repair", "Network installation and support", "Structured cabling", "IT consulting services"]

function Mark({ v }: { v: Cover }) {
  if (v === "yes") return <span className="inline-flex items-center gap-1.5"><Check className="size-4 text-toner" aria-hidden />Covered</span>
  if (v === "billed") return <span>Billed per visit</span>
  if (v === "ask") return <span className="text-paper-soft">Ask us</span>
  return <span className="inline-flex items-center gap-1.5 text-paper-soft"><Minus className="size-4" aria-hidden />Not included</span>
}

function Service() {
  const [p, setP] = useState(2)
  const desk = useHelpdesk()
  return (
    <section id="service" className="scroll-mt-6 bg-graphite py-[72px] text-paper md:py-32" aria-labelledby="service-title">
      <div className="wrap">
        <ProofLine n="03" name="Service" light />
        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5 md:flex md:flex-col md:justify-between md:pr-8">
            <h2 id="service-title" className="font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">We service everything we sell.</h2>
            <p className="mt-6 max-w-[46ch] text-[17px] text-paper-mid">Factory-trained, industry-certified field service engineers, some with more than 25 years in the business. Or carry equipment in to the service centre.</p>
            <p className="mt-8 flex items-center gap-3 text-[15px]"><Lamp open={desk.open} />{desk.text}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={C.service.tel} className="inline-flex min-h-12 items-center gap-2 bg-cyan px-5 text-[15px] text-paper transition hover:bg-cyan-deep"><Phone className="size-4" aria-hidden /> Service helpdesk {C.service.phone}</a>
              <button onClick={() => openDoor("down")} className="min-h-12 border border-edge-dark px-5 text-[15px] transition hover:border-paper">Write a service ticket</button>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-3 gap-px bg-rule-dark" role="radiogroup" aria-label="Service plan">
              {PLANS.map((x, i) => (
                <button key={x.id} role="radio" aria-checked={i === p} onClick={() => setP(i)} className={`min-h-[104px] p-4 text-left transition duration-200 md:p-5 ${i === p ? "bg-paper text-ink" : "bg-graphite hover:bg-ink"}`}>
                  <span className="block font-display text-[21px] leading-tight md:text-[24px]">{x.name}</span>
                  <span className={`mt-2 hidden text-[13px] leading-snug md:block ${i === p ? "text-muted" : "text-paper-soft"}`}>{x.d}</span>
                </button>
              ))}
            </div>
            <dl className="border-b border-rule-dark">
              {ROWS.map((r, ri) => (
                <div key={r} className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-rule-dark py-4 text-[15px] md:grid-cols-[1.2fr_repeat(3,1fr)]">
                  <dt className="font-display text-[21px]">{r}</dt>
                  {PLANS.map((x, i) => (
                    <dd key={x.id} className={`${i === p ? "block" : "hidden md:block"} ${i === p ? "" : "md:text-paper-soft"}`}><Mark v={x.cover[ri]} /></dd>
                  ))}
                </div>
              ))}
            </dl>
            <button onClick={() => openDoor("equip", { "Plan preference": PLANS[p].id })} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] text-toner underline-offset-4 hover:underline">Ask about {PLANS[p].name.toLowerCase()} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></button>
            <p className="mt-2 text-[13px] text-paper-soft">Or a plan somewhere in between. Toner and supplies on full service: confirm with BBSL.</p>
          </div>
        </div>
        <ul className="mt-20 grid border-t border-rule-dark sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map(s => <li key={s} className="border-b border-rule-dark py-4 pr-6 text-[15px] text-paper-mid">{s}</li>)}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Screen 4: the Document Centre ---------- */
function Centre() {
  return (
    <section className="py-[72px] md:py-32" aria-labelledby="centre-title">
      <div className="wrap">
        <ProofLine n="04" name="Document Centre" />
        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-6">
            <h2 id="centre-title" className="font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">Send the file. Collect the job.</h2>
            <p className="mt-6 max-w-[46ch] text-[17px] text-muted">The BBSL Document Centre prints for architects, contractors, offices and events, powered by Xerox. Files can be sent in remotely and collected in Nassau or Freeport.</p>
            <ol className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
              {DOC_JOBS.map((j, i) => (
                <li key={j} className="flex min-h-14 items-center gap-4 border-b border-line text-[16px]"><span className="w-6 font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>{j}</li>
              ))}
            </ol>
          </div>
          <Feed className="md:col-span-5 md:col-start-8 md:self-start">
            <div className="relative bg-sheet p-7 shadow-[var(--shadow-sheet)] md:p-9">
              <span className="crop -top-3.5 -left-3.5" aria-hidden /><span className="crop -right-3.5 -bottom-3.5" aria-hidden />
              <p className="font-mono text-[15px] tracking-[0.04em]">PRINT JOB · DOCUMENT CENTRE</p>
              <p className="mt-1 border-b border-dashed border-line pb-3 font-mono text-[12px] text-muted">To {C.copy.email}</p>
              <ul className="mt-5 space-y-3">
                {["Architectural & engineering prints", "Wide format colour", "Binding"].map(t => (
                  <li key={t} className="flex items-center gap-3 font-display text-[22px] leading-tight"><span className="grid size-6 place-items-center bg-ink text-paper" aria-hidden><Check className="size-3.5" /></span>{t}</li>
                ))}
              </ul>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-[14px]">
                <div><dt className="text-muted">Files</dt><dd className="mt-1">Sent remotely</dd></div>
                <div><dt className="text-muted">Rates</dt><dd className="mt-1">On request</dd></div>
              </dl>
              <button onClick={() => openDoor("print")} className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 bg-cyan px-5 text-[15px] text-paper transition hover:bg-cyan-deep">Start a print job</button>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[14px]">
                <a href={C.copy.tel} className="flex min-h-11 items-center font-mono hover:text-cyan">{C.copy.phone}</a>
                <a href="document-centre.html" className="flex min-h-11 items-center gap-1 underline underline-offset-4">Full service list <ArrowUpRight className="size-3.5" aria-hidden /></a>
              </div>
            </div>
          </Feed>
        </div>
      </div>
    </section>
  )
}

/* ---------- Screen 5: since 1966 ---------- */
const YEARS = [
  { y: "1966", t: "Xerox (Bahamas) Limited", d: "The company opens in Nassau. It has been in the document business ever since." },
  { y: "1968", t: "Freeport", d: "Two years later, a subsidiary office opens in Freeport, Grand Bahama." },
  { y: "1987", t: "Bahamian hands", d: "In March the management team buys the company from Xerox and keeps the full Xerox line. Later that year it adds NCR." },
  { y: "2002", t: "Bahamas Business Solutions", d: "In August the company merges into Bahamas Business Solutions Limited, the name it carries today." },
  { y: "Today", t: "Two islands and Turks & Caicos", d: "100% Bahamian owned, more than 80 full-time employees, more than 3,000 customers." },
]
function History() {
  return (
    <section id="history" className="bg-paper-2 py-[72px] md:py-32" aria-labelledby="history-title">
      <div className="wrap">
        <ProofLine n="05" name="Since 1966" />
        <h2 id="history-title" className="mt-10 max-w-[20ch] font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">Sixty years of keeping island offices printing.</h2>
        <ol className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0">
          {YEARS.map((e, k) => (
            <motion.li key={e.y} initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: k * 0.06, duration: 0.6, ease }} className="relative w-[76vw] shrink-0 snap-start bg-sheet p-6 shadow-[var(--shadow-sheet)] md:w-auto">
              <div className="mb-5 flex items-center justify-between border-b border-dashed border-line pb-3" aria-hidden><span className="flex">{["var(--color-ink)", "var(--color-cyan)", "var(--color-toner)", "#9a9c9f"].map(c => <span key={c} className="h-2 w-4" style={{ background: c }} />)}</span><span className="font-mono text-[11px] text-muted">REF {e.y === "Today" ? "2026" : e.y}</span></div>
              <p className="font-display text-[56px] leading-none tracking-[-0.03em]">{e.y}</p>
              <p className="mt-6 font-display text-[24px] leading-tight">{e.t}</p>
              <p className="mt-3 text-[15px] text-muted">{e.d}</p>
            </motion.li>
          ))}
        </ol>
        <p className="mt-12 max-w-[64ch] text-[17px] text-muted">Trusted by government, commercial and private banks, utility companies, healthcare, and hotels and hospitality across The Bahamas and the Turks and Caicos Islands.</p>
      </div>
    </section>
  )
}

/* ---------- Screen 6: questions ---------- */
export const FAQ = [
  ["Where are BBSL's offices?", `In Nassau at Collins Avenue & 7th Terrace, call ${C.nassau.phone}. In Freeport on Queens Highway, Grand Bahama, call ${C.freeport.phone}. BBSL also has an office in the Turks & Caicos Islands.`],
  ["What service plans does BBSL offer?", "Time and materials, a full-service maintenance programme that covers parts and labour, a managed print service contract that covers everything except paper, or a plan somewhere in between."],
  ["When is the service helpdesk open?", `Monday to Friday, 8:30am to 5:00pm, on ${C.service.phone} or ${C.service.email}. You can also bring equipment into the service centre for repairs.`],
  ["Can I send print jobs to the Document Centre online?", `Yes. The Copy Service accepts remote document submission. Email ${C.copy.email} or call ${C.copy.phone}.`],
  ["Is BBSL a Bahamian company?", "Yes. Bahamas Business Solutions is one hundred percent Bahamian owned and has been in the document business since it began as Xerox (Bahamas) Limited in 1966."],
]
function Questions() {
  return (
    <section className="py-[72px] md:py-32" aria-labelledby="faq-title">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-6">
        <h2 id="faq-title" className="font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em] md:col-span-4">What offices ask first.</h2>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line md:col-span-7 md:col-start-6">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="min-h-14 py-5 text-left font-display text-[24px] font-normal hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/* ---------- Screen 7: offices ---------- */
function Offices() {
  const [o, setO] = useState<"freeport" | "nassau">("nassau")
  const off = C[o]
  const q = o === "freeport" ? "Queens Highway, Freeport, Grand Bahama, Bahamas" : "Collins Avenue and 7th Terrace, Nassau, Bahamas"
  return (
    <section id="offices" className="scroll-mt-6 border-t border-line bg-paper-2 py-[72px] md:py-32" aria-labelledby="offices-title">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 id="offices-title" className="font-display text-[length:var(--text-h2)] leading-[1] tracking-[-0.02em]">Two islands, one team.</h2>
          <div className="mt-9 grid grid-cols-2 gap-px bg-line" role="tablist" aria-label="Choose an office">
            {(["nassau", "freeport"] as const).map(k => (
              <button key={k} role="tab" aria-selected={o === k} onClick={() => setO(k)} className={`min-h-12 text-[15px] transition ${o === k ? "bg-ink text-paper" : "bg-paper hover:bg-sheet"}`}>{C[k].label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={o} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }} className="mt-px bg-sheet p-7">
              <a href={off.tel} className="flex min-h-12 items-center font-mono text-[30px] leading-none hover:text-cyan">{off.phone}</a>
              <p className="mt-4 text-[16px]">{off.address}{o === "nassau" ? `, ${C.nassau.box}` : ""}</p>
              <p className="mt-2 text-[15px] text-muted">Service helpdesk Monday to Friday, 8:30 am to 5:00 pm.{o === "freeport" ? " Street address to confirm with BBSL." : ""}</p>
            </motion.div>
          </AnimatePresence>
          <p className="mt-6 text-[15px] text-muted">BBSL also serves the Turks and Caicos Islands. Anything else: <a className="text-ink underline underline-offset-4" href={`mailto:${C.info}`}>{C.info}</a></p>
          <a href="#counter" className="mt-8 inline-flex min-h-12 items-center gap-2 bg-cyan px-5 text-[15px] text-paper transition hover:bg-cyan-deep">Back to the counter <ArrowRight className="size-4" aria-hidden /></a>
        </div>
        <div className="relative min-h-[380px] overflow-hidden border border-line bg-sheet md:col-span-7">
          <p className="absolute inset-0 grid place-items-center p-8 text-center text-[15px] text-muted">Map: {q}</p>
          <iframe key={o} title={`Map of the BBSL ${off.label} office`} loading="lazy" className="relative h-[380px] w-full md:h-full" src={`https://www.google.com/maps?q=${encodeURIComponent("Bahamas Business Solutions, " + q)}&output=embed`} />
        </div>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><Lines /><Service /><Centre /><History /><Questions /><Offices /></Page>)
