// The core tool (job spec 4): "What do you need today?" One ticket, three doors, each a short form addressed
// to the right BBSL desk with that desk's number for the visitor's island. No prices.
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react"
import { C, ease, Lamp, useHelpdesk, type Island } from "./site"

export type Door = "down" | "equip" | "print"
export const DOC_JOBS = ["Digital on-demand printing", "Architectural & engineering prints", "Wide format colour", "Banners and posters", "Custom printing", "Scanning and imaging", "Binding", "Graphic design", "Booklet production", "Conference services"]
export const PLAN_NAMES = ["Time & materials", "Full-service maintenance", "Managed print", "Advise me"]
const LINES = ["Xerox printers and copiers", "NCR ATMs", "NCR point of sale", "OnBase content management", "Lenovo & HP PCs, servers, networking", "Neopost mailing", "Security: video, access control", "Not sure yet"]
const MACHINES = ["Xerox copier or printer", "NCR ATM", "NCR point of sale", "PC or network", "Other equipment"]
const SYMPTOMS = ["Will not power on", "Paper jam", "Error code on screen", "Print quality", "Not connecting", "Other"]

const DOORS: { id: Door; n: string; t: string; d: string; head: string; to: string }[] = [
  { id: "down", n: "01", t: "My machine is down", d: "Copier, printer, ATM, point of sale or network. Reach the service helpdesk.", head: "Service ticket", to: C.service.email },
  { id: "equip", n: "02", t: "I need equipment or a print contract", d: "Xerox, NCR, OnBase, Lenovo and HP, Neopost, security. A quote from sales.", head: "Quote request", to: C.sales.email },
  { id: "print", n: "03", t: "I have a print job", d: "Plans, wide format, banners, booklets, binding. The Document Centre.", head: "Print job", to: C.copy.email },
]

/** Open the counter on a door from anywhere on the page. */
export function openDoor(door: Door, preset: Record<string, string> = {}) {
  window.dispatchEvent(new CustomEvent("bbsl:door", { detail: { door, preset } }))
  document.getElementById("counter")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function Typed({ text }: { text: string }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) { setN(text.length); return }
    setN(0); let i = 0
    const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id) }, 28)
    return () => clearInterval(id)
  }, [text, reduce])
  return <span aria-label={text}><span aria-hidden className={n < text.length ? "caret" : ""}>{text.slice(0, n)}</span></span>
}

function Chips({ label, opts, value, onChange }: { label: string; opts: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="text-[13px] text-muted">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {opts.map(o => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(value === o ? "" : o)} className={`min-h-11 border px-3.5 text-[14px] transition duration-150 active:scale-[0.97] ${value === o ? "border-ink bg-ink text-paper" : "border-line bg-sheet hover:border-ink"}`}>{o}</button>
        ))}
      </div>
    </fieldset>
  )
}
function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`block ${wide ? "sm:col-span-2" : ""}`}><span className="text-[13px] text-muted">{label}</span>{children}</label>
}

export default function Counter() {
  const [door, setDoor] = useState<Door | null>(null)
  const [island, setIsland] = useState<Island>("nassau")
  const [v, setV] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [warn, setWarn] = useState(false)
  const first = useRef<HTMLDivElement>(null)
  const desk = useHelpdesk()
  const set = (k: string) => (val: string) => setV(s => ({ ...s, [k]: val }))
  const get = (k: string) => v[k] ?? ""

  useEffect(() => {
    const on = (e: Event) => { const { door: d, preset } = (e as CustomEvent).detail; setDoor(d); setSent(false); setV(s => ({ ...s, ...preset })) }
    window.addEventListener("bbsl:door", on); return () => window.removeEventListener("bbsl:door", on)
  }, [])
  useEffect(() => { if (door) setTimeout(() => first.current?.querySelector<HTMLElement>("input,select,button")?.focus({ preventScroll: true }), 450) }, [door])
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") setDoor(null) }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k) }, [])

  const D = DOORS.find(d => d.id === door)
  const isl = island === "nassau" ? "Nassau" : "Freeport"
  const office = C[island]
  const fields: Record<Door, string[]> = {
    down: ["Machine", "Make and model", "What is happening", "Details", "Business", "Your name", "Phone"],
    equip: ["Interested in", "Volume", "Plan preference", "Organisation", "Your name", "Phone"],
    print: ["Job type", "Size", "Quantity", "Needed by", "Files", "Your name", "Phone"],
  }
  const lines = door ? [`Island: ${isl}`, ...fields[door].filter(f => get(f)).map(f => `${f}: ${get(f)}`)] : []
  const subject = door === "down" ? `Service call, ${isl}${get("Machine") ? `: ${get("Machine")}` : ""}` : door === "equip" ? (get("Interested in").startsWith("Xerox") ? "Xerox quote request" : "Equipment quote request") : "Print job for the Document Centre"
  const href = D ? `mailto:${D.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello BBSL,\n\n${lines.join("\n")}\n\nSent from the BBSL website counter.`)}` : "#"
  const call = door === "down" ? { k: "Call the helpdesk", v: C.service.phone, href: C.service.tel } : door === "print" ? { k: "Call the Document Centre", v: C.copy.phone, href: C.copy.tel } : { k: `Call ${isl} sales`, v: office.phone, href: office.tel }
  const canSend = !!(get("Your name") || get("Phone"))
  const header = useMemo(() => D ? `${D.head.toUpperCase()} · ${isl.toUpperCase()}` : "WHAT DO YOU NEED?", [D, isl])

  const send = (e: React.MouseEvent) => {
    if (!canSend) { e.preventDefault(); setWarn(true); return }
    setWarn(false); setTimeout(() => setSent(true), 600)
  }
  const reset = () => { setDoor(null); setSent(false); setV({}) }

  return (
    <div id="counter" className="relative scroll-mt-6 bg-sheet shadow-[var(--shadow-sheet)]">
      <span className="crop -top-3.5 -left-3.5" aria-hidden /><span className="crop -right-3.5 -bottom-3.5" aria-hidden />
      {/* ticket head */}
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-line px-5 md:px-8">
        <p className="font-mono text-[13px] tracking-[0.04em]" aria-live="polite"><Typed text={header} /></p>
        <div className="flex shrink-0 gap-px bg-line" role="radiogroup" aria-label="Your island">
          {(["nassau", "freeport"] as const).map(k => (
            <button key={k} role="radio" aria-checked={island === k} onClick={() => setIsland(k)} className={`min-h-11 px-3 text-[13px] transition duration-150 ${island === k ? "bg-ink text-paper" : "bg-sheet hover:bg-paper"}`}>{C[k].label}</button>
          ))}
        </div>
      </div>

      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {!door && (
            <motion.ol key="doors" exit={{ opacity: 0 }} transition={{ duration: 0.2 }} aria-label="Choose a desk">
              {DOORS.map(d => (
                <li key={d.id} className="border-b border-line last:border-b-0">
                  <motion.button layoutId={`door-${d.id}`} onClick={() => { setDoor(d.id); setSent(false) }} className="group grid min-h-[96px] w-full grid-cols-[1fr_auto] md:grid-cols-[2.25rem_1fr_auto] items-center gap-4 px-5 py-5 text-left transition-colors duration-150 hover:bg-paper md:min-h-[112px] md:px-8">
                    <span className="hidden font-mono text-[13px] text-muted md:block">{d.n}</span>
                    <span>
                      <span className="block font-display text-[clamp(26px,2.5vw,34px)] leading-[1.05]">{d.t}</span>
                      <span className="mt-1.5 block text-[15px] leading-snug text-muted">{d.d}</span>
                    </span>
                    <span className="grid size-11 place-items-center border border-line transition duration-200 group-hover:border-cyan group-hover:bg-cyan group-hover:text-paper" aria-hidden><ArrowRight className="size-4" /></span>
                  </motion.button>
                </li>
              ))}
              <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line bg-paper px-5 py-3.5 md:px-8">
                <span className="flex items-center gap-3 text-[14px]"><Lamp open={desk.open} />{desk.text}</span>
                <a href={C.service.tel} className="flex min-h-11 items-center gap-2 font-mono text-[14px] hover:text-cyan"><Phone className="size-3.5" aria-hidden />{C.service.phone}</a>
              </li>
            </motion.ol>
          )}

          {D && (
            <motion.div key={`form-${D.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <motion.div layoutId={`door-${D.id}`} className="flex items-start gap-4 border-b border-line bg-paper px-5 py-5 md:px-8">
                <button onClick={() => setDoor(null)} className="-ml-2 grid size-11 shrink-0 place-items-center hover:bg-sheet" aria-label="Back to all desks"><ArrowLeft className="size-4" /></button>
                <div>
                  <p className="font-display text-[28px] leading-[1.05]">{D.t}</p>
                  <p className="mt-1 font-mono text-[13px] text-muted">To {D.to}</p>
                </div>
              </motion.div>

              {sent ? (
                <div className="relative px-5 py-8 md:px-8">
                  <motion.span initial={{ scale: 1.4, rotate: 6, opacity: 0 }} animate={{ scale: 1, rotate: -4, opacity: 1 }} transition={{ duration: 0.45, ease }} className="absolute top-6 right-6 border-2 border-cyan px-3 py-1.5 font-mono text-[13px] text-cyan">READY TO SEND</motion.span>
                  <p className="max-w-[30ch] font-display text-[26px] leading-tight">Your email app has the ticket. Press send and the {D.head.toLowerCase().includes("print") ? "Document Centre" : D.id === "down" ? "helpdesk" : "sales desk"} has everything it needs.</p>
                  <ul className="mt-5 space-y-1 font-mono text-[13px] text-muted">{lines.map(l => <li key={l}>{l}</li>)}</ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={call.href} className="inline-flex min-h-12 items-center gap-2 border border-ink px-5 text-[15px] hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> {call.k} {call.v}</a>
                    <button onClick={reset} className="min-h-12 px-3 text-[15px] underline underline-offset-4">Start another</button>
                  </div>
                </div>
              ) : (
                <div ref={first} className="px-5 py-6 md:px-8 md:py-7">
                  {D.id === "down" && (
                    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-6">
                      <p className="flex items-center gap-3 text-[15px]"><Lamp open={desk.open} />{desk.text}</p>
                      <a href={C.service.tel} className="inline-flex min-h-12 items-center gap-2 bg-ink px-5 text-[15px] text-paper transition hover:bg-graphite"><Phone className="size-4" aria-hidden /> Call {C.service.phone}</a>
                      <p className="w-full text-[14px] text-muted">Engineers on New Providence and Grand Bahama. Small equipment can also be carried in to the service centre.</p>
                    </div>
                  )}
                  <motion.div className="grid gap-x-6 gap-y-5 sm:grid-cols-2" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.04 } } }}>
                    {D.id === "down" && <>
                      <Chips label="Machine" opts={MACHINES} value={get("Machine")} onChange={set("Machine")} />
                      <Field label="Make and model, if you know it"><input className="field" value={get("Make and model")} onChange={e => set("Make and model")(e.target.value)} /></Field>
                      <Field label="Business"><input className="field" autoComplete="organization" value={get("Business")} onChange={e => set("Business")(e.target.value)} /></Field>
                      <Chips label="What is happening" opts={SYMPTOMS} value={get("What is happening")} onChange={set("What is happening")} />
                      <Field label="Error code or details" wide><input className="field" value={get("Details")} onChange={e => set("Details")(e.target.value)} /></Field>
                    </>}
                    {D.id === "equip" && <>
                      <Field label="Interested in"><select className="field" value={get("Interested in")} onChange={e => set("Interested in")(e.target.value)}><option value="">Choose a line</option>{LINES.map(o => <option key={o}>{o}</option>)}</select></Field>
                      <Field label="Rough volume"><select className="field" value={get("Volume")} onChange={e => set("Volume")(e.target.value)}><option value="">Pages a month or sites</option>{["Under 5,000 pages a month", "5,000 to 20,000 pages a month", "Over 20,000 pages a month", "One site", "Several sites or branches", "Not sure"].map(o => <option key={o}>{o}</option>)}</select></Field>
                      <Chips label="How you want it covered" opts={PLAN_NAMES} value={get("Plan preference")} onChange={set("Plan preference")} />
                      <p className="-mt-2 text-[13px] text-muted sm:col-span-2">Time and materials: billed per visit. Full service: parts and labour covered. Managed print: everything except paper.</p>
                      <Field label="Organisation"><input className="field" autoComplete="organization" value={get("Organisation")} onChange={e => set("Organisation")(e.target.value)} /></Field>
                    </>}
                    {D.id === "print" && <>
                      <Field label="Job type"><select className="field" value={get("Job type")} onChange={e => set("Job type")(e.target.value)}><option value="">Choose a service</option>{DOC_JOBS.map(o => <option key={o}>{o}</option>)}</select></Field>
                      <Field label="Size"><select className="field" value={get("Size")} onChange={e => set("Size")(e.target.value)}><option value="">Choose a size</option>{["Letter", "Legal", "Tabloid", "Plan sheet", "Wide format", "Other"].map(o => <option key={o}>{o}</option>)}</select></Field>
                      <Field label="Quantity"><input className="field" inputMode="numeric" value={get("Quantity")} onChange={e => set("Quantity")(e.target.value)} /></Field>
                      <Field label="Needed by"><input type="date" className="field" value={get("Needed by")} onChange={e => set("Needed by")(e.target.value)} /></Field>
                      <Chips label="Your files" opts={["I will attach them to the email", "I will bring them in"]} value={get("Files")} onChange={set("Files")} />
                    </>}
                    <Field label="Your name"><input className="field" autoComplete="name" value={get("Your name")} onChange={e => set("Your name")(e.target.value)} /></Field>
                    <Field label="Phone"><input className="field" type="tel" autoComplete="tel" value={get("Phone")} onChange={e => set("Phone")(e.target.value)} /></Field>
                  </motion.div>
                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <a href={href} onClick={send} className="group inline-flex min-h-13 items-center justify-center gap-2 bg-cyan px-6 py-3.5 text-[16px] text-paper transition duration-150 hover:bg-cyan-deep active:scale-[0.98]"><Mail className="size-4" aria-hidden /> Email it to {D.to}</a>
                    <a href={call.href} className="inline-flex min-h-12 items-center gap-2 text-[15px] underline-offset-4 hover:underline"><Phone className="size-4" aria-hidden /> {call.k} <span className="font-mono">{call.v}</span></a>
                  </div>
                  <p className="mt-3 text-[13px] text-muted" aria-live="polite">{warn ? "Add a name or phone so the desk can reply." : `${lines.length} lines ready · your email app opens with them written`}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}
