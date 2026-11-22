import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, Copy, Minus, Phone, Plus, Printer } from "lucide-react"
import { PHONE, PHONE2, TEL, TEL2, out } from "./site"

export type Svc = "cit" | "atm" | "atmm" | "air" | "guard" | "avsec"
type Island = "np" | "gb" | "fi"
type Freq = "daily" | "days" | "call"
export type Plan = { svcs: Svc[]; focus: Svc | null; island: Island; count: number; freq: Freq; days: string[]; sector: string }

export const SERVICES: { id: Svc; t: string; co?: string }[] = [
  { id: "cit", t: "Cash pickups" },
  { id: "atm", t: "ATM replenishment" },
  { id: "atmm", t: "ATM first-line maintenance" },
  { id: "air", t: "Family Island air courier" },
  { id: "guard", t: "Static guards", co: "Security Services" },
  { id: "avsec", t: "Aviation security", co: "Security Services" },
]
const ISLANDS: [Island, string][] = [["np", "New Providence"], ["gb", "Grand Bahama"], ["fi", "Family Island"]]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const SECTORS = ["Bank or credit union", "Retailer", "Fuel station", "Casino", "Hotel or restaurant", "Government revenue point", "Other business"]

const Ctx = createContext<{ plan: Plan; set: (p: Partial<Plan>) => void; toggle: (s: Svc) => void; summary: string } | null>(null)
export const usePlan = () => useContext(Ctx)!

const islandName = (p: Plan) => p.island === "np" ? "New Providence" : p.island === "gb" ? "Grand Bahama" : "a Family Island"
const unit = (p: Plan, n = p.count) => (p.focus === "atm" || p.focus === "atmm" ? (n === 1 ? "ATM" : "ATMs") : (n === 1 ? "site" : "sites"))
const freqText = (p: Plan) => p.freq === "daily" ? "daily" : p.freq === "call" ? "on call" : p.days.length ? `every ${p.days.join(", ")}` : "on set days"

export function summaryOf(p: Plan) {
  if (!p.svcs.length) return ""
  const names = SERVICES.filter(s => p.svcs.includes(s.id)).map(s => /^(ATM|Family)/.test(s.t) ? s.t : s.t.toLowerCase())
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0]
  const u = p.svcs.some(s => s === "atm" || s === "atmm") ? (p.count === 1 ? "ATM" : "ATMs") : (p.count === 1 ? "site" : "sites")
  const where = p.island === "fi" ? "from Nassau, flown to a Family Island" : `on ${islandName(p)}`
  return `Request for Armoured Express: ${list} for ${p.count} ${u} ${where}, ${freqText(p)}. Sector: ${p.sector.toLowerCase()}.`
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>({ svcs: ["atm"], focus: "atm", island: "gb", count: 6, freq: "daily", days: ["Mon", "Wed", "Fri"], sector: SECTORS[0] })
  const set = (p: Partial<Plan>) => setPlan(o => {
    const n = { ...o, ...p }
    if (p.island === "fi" && !n.svcs.includes("air")) { n.svcs = [...n.svcs, "air"]; n.focus = "air" }
    return n
  })
  const toggle = (s: Svc) => setPlan(o => {
    const on = o.svcs.includes(s)
    const svcs = on ? o.svcs.filter(x => x !== s) : [...o.svcs, s]
    return { ...o, svcs, focus: on ? (o.focus === s ? (svcs.at(-1) ?? null) : o.focus) : s }
  })
  const summary = useMemo(() => summaryOf(plan), [plan])
  return <Ctx.Provider value={{ plan, set, toggle, summary }}>{children}</Ctx.Provider>
}

type Step = { t: string; place: string; safe: string }
const GUARDS = "Highly trained, uniformed and armed guards."
const BAG = "Secure, locked transit bags."
const VAN = "Surveillance-enabled cash in transit. Public liability cover up to $2,000,000."
const SUPPORT = "24-hour support."

export const stageCount = (p: Plan) => Math.max(route(p).length, 1)

function route(p: Plan): Step[] {
  const n = p.count, isl = p.island === "fi" ? "Nassau or Grand Bahama" : islandName(p)
  const fr = freqText(p), Fr = fr[0].toUpperCase() + fr.slice(1)
  switch (p.focus) {
    case "cit": return [
      { t: "Collected", place: `Your ${n} ${unit(p)}, ${isl}`, safe: GUARDS },
      { t: "Sealed", place: "Locked transit bag", safe: BAG },
      { t: "In transit", place: "Armoured vehicle", safe: VAN },
      { t: "Delivered", place: "Where you direct: your bank or branch", safe: "Security countermeasures best practice." },
      { t: "Signed back", place: `${Fr}`, safe: SUPPORT },
    ]
    case "atm": return [
      { t: "Prepared", place: `Cash for your ${n} ${unit(p)}`, safe: "A seasoned management team of armoured security experts." },
      { t: "Sealed", place: "Locked transit bag", safe: BAG },
      { t: "In transit", place: "Armoured vehicle", safe: VAN },
      { t: "Replenished", place: `${n === 1 ? "Your ATM" : `Each of your ${n} ATMs`}, ${isl}`, safe: "The first in The Bahamas to cater to the demand for ATM services." },
      { t: "Signed off", place: `${Fr}`, safe: SUPPORT },
    ]
    case "atmm": return [
      { t: "Dispatched", place: "Armoured Services Officers", safe: "Cross-trained in physical security, as part of a business continuity plan." },
      { t: "Serviced", place: `${n === 1 ? "Your ATM" : `Each of your ${n} ATMs`}, ${isl}`, safe: "First-line ATM maintenance." },
      { t: "Signed off", place: `${Fr}`, safe: SUPPORT },
    ]
    case "air": return [
      { t: "Collected", place: `Your site, ${p.island === "fi" ? "Nassau" : islandName(p)}`, safe: GUARDS },
      { t: "Sealed", place: "Locked transit bag", safe: BAG },
      { t: "To the aircraft", place: "Armoured vehicle", safe: VAN },
      { t: "Flown", place: "To the Family Island you name", safe: "Air courier solutions for the Family Islands." },
      { t: "Signed on arrival", place: `${Fr}`, safe: SUPPORT },
    ]
    case "guard": return [
      { t: "Assigned", place: "Security Services (Bah.) Ltd.", safe: "Static guard services from the sister company." },
      { t: "Stationed", place: `Your ${n} ${unit(p)}, ${isl}`, safe: "Static guards at your premises." },
      { t: "Backed", place: "The Armoured Express team", safe: "Armoured Services Officers cross-trained in physical security, for business continuity." },
    ]
    case "avsec": return [
      { t: "Assigned", place: "Security Services (Bah.) Ltd.", safe: "The sister company of Armoured Express." },
      { t: "On duty", place: `Your airport or aviation facility, ${isl}`, safe: "Aviation security from Security Services (Bah.) Ltd." },
      { t: "Overseen", place: "Management", safe: "A seasoned management team of armoured security experts." },
    ]
    default: return []
  }
}

function CustodyLine() {
  const { plan, set } = usePlan()
  const reduce = useReducedMotion()
  const steps = route(plan)
  const key = plan.focus ?? "none"
  const svc = SERVICES.find(s => s.id === plan.focus)
  const runHead = svc ? [svc.t, plan.focus === "avsec" ? null : `${plan.count} ${unit(plan)}`, islandName(plan).replace("a Family Island", "Family Island"), freqText(plan).replace(/^\w/, c => c.toUpperCase())].filter(Boolean).join(" · ") : ""
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[14px] font-semibold">Chain of custody</p>
        <p className="tnum text-[13px] text-muted" aria-live="polite">{runHead || "No run selected"}</p>
      </div>
      {plan.svcs.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Selected services">
          {SERVICES.filter(s => plan.svcs.includes(s.id)).map(s => (
            <button key={s.id} type="button" role="tab" aria-selected={plan.focus === s.id} onClick={() => set({ focus: s.id })} className={`min-h-9 px-2.5 text-[13px] font-medium transition-colors ${plan.focus === s.id ? "bg-ink text-surface" : "border border-ink/20 hover:border-ink"}`}>{s.t}</button>
          ))}
        </div>
      )}
      <div className="relative mt-5 flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ol key={key} className="relative" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.16 } }}>
            {steps.length > 0 && <motion.span aria-hidden className="absolute top-2 bottom-6 left-[5px] w-[2px] origin-top bg-ink" initial={{ scaleY: reduce ? 1 : 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }} />}
            {steps.length === 0 && <li className="serif py-10 text-[17px] text-muted">Tick a service to see its route.</li>}
            {steps.map((s, i) => (
              <motion.li key={s.t} className="relative grid grid-cols-[24px_1fr_auto] gap-x-2 pb-4 last:pb-0" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.09 * i, ease: out }}>
                <span aria-hidden className={`relative z-[1] mt-[7px] block size-3 border-2 border-ink ${i === steps.length - 1 ? "bg-surface" : "bg-ink"}`} />
                <div className="min-w-0">
                  <p className="text-[16px] leading-snug"><span className="tnum mr-2 text-[13px] font-medium text-muted">{String(i + 1).padStart(2, "0")}</span><span className="font-semibold">{s.t}</span><AnimatePresence mode="popLayout" initial={false}><motion.span key={s.place} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="tnum text-[15px] text-ink/75"> · {s.place}</motion.span></AnimatePresence></p>
                  <p className="serif mt-1 text-[14.5px] leading-snug text-muted">{s.safe}</p>
                </div>
                <motion.span className="stamp mt-0.5 h-fit self-start max-sm:col-start-2 max-sm:mt-2 max-sm:justify-self-start" initial={reduce ? false : { scale: 1.45, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: -4 }} transition={{ duration: 0.28, delay: 0.09 * i + 0.14, ease: out }}>Signed</motion.span>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Inputs() {
  const { plan, set, toggle } = usePlan()
  const u = unit(plan)
  const clamp = (v: number) => Math.max(1, Math.min(99, v || 1))
  return (
    <div className="flex h-full flex-col gap-4">
      <fieldset>
        <legend className="field-label">What do you need?</legend>
        <ul className="mt-2 grid grid-cols-2 gap-1.5 md:block md:border-t md:border-line">
          {SERVICES.map(s => {
            const on = plan.svcs.includes(s.id), focus = plan.focus === s.id
            return (
              <li key={s.id} className="md:border-b md:border-line">
                <button type="button" role="checkbox" aria-checked={on} onClick={() => toggle(s.id)} className="group flex min-h-12 w-full items-center gap-2.5 border border-ink/20 px-2.5 text-left md:min-h-11 md:gap-3 md:border-0 md:px-0 lg:min-h-10">
                  <span className={`flex size-[18px] shrink-0 items-center justify-center border transition-colors duration-150 ${on ? "border-brass bg-brass text-surface" : "border-ink/35 group-hover:border-ink"}`}>{on && <Check className="size-3.5" strokeWidth={2.5} aria-hidden />}</span>
                  <span className={`text-[14px] leading-tight md:text-[15px] ${focus ? "font-semibold" : ""}`}>{s.t}</span>
                  {s.co && <span className="ml-auto hidden text-[12.5px] text-muted md:inline">{s.co}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="field-label">Island</legend>
        <div className="seg mt-2">{ISLANDS.map(([k, l]) => <button key={k} type="button" aria-pressed={plan.island === k} onClick={() => set({ island: k })}><span className="mx-auto block max-w-[8ch]">{l}</span></button>)}</div>
        {plan.island === "fi" && <p className="mt-2 text-[13px] text-muted">Family Island runs go by air courier.</p>}
      </fieldset>
      <fieldset>
        <legend className="field-label">How often?</legend>
        <div className="seg mt-2">{([["daily", "Daily"], ["days", "Set days"], ["call", "On call"]] as [Freq, string][]).map(([k, l]) => <button key={k} type="button" aria-pressed={plan.freq === k} onClick={() => set({ freq: k })}>{l}</button>)}</div>
      </fieldset>
        <AnimatePresence initial={false}>
          {plan.freq === "days" && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: out }} className="-mt-2 grid grid-cols-7 gap-1" aria-label="Days">
              {DAYS.map(d => { const on = plan.days.includes(d); return <button key={d} type="button" aria-pressed={on} onClick={() => set({ days: on ? plan.days.filter(x => x !== d) : DAYS.filter(x => x === d || plan.days.includes(x)) })} className={`min-h-10 text-[13px] font-medium transition-colors ${on ? "bg-ink text-surface" : "border border-ink/20 hover:border-ink"}`}>{d}</button> })}
            </motion.div>
          )}
        </AnimatePresence>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="count" className="field-label">How many {u}?</label>
          <div className="flex h-11 items-stretch border border-ink/20">
            <button type="button" aria-label={`Fewer ${u}`} onClick={() => set({ count: clamp(plan.count - 1) })} className="w-10 transition-colors hover:bg-field"><Minus className="mx-auto size-4" strokeWidth={1.75} /></button>
            <input id="count" inputMode="numeric" value={plan.count} onChange={e => set({ count: clamp(parseInt(e.target.value)) })} onKeyDown={e => { if (e.key === "ArrowUp") { e.preventDefault(); set({ count: clamp(plan.count + 1) }) } if (e.key === "ArrowDown") { e.preventDefault(); set({ count: clamp(plan.count - 1) }) } }} className="w-11 border-x border-ink/20 bg-transparent text-center text-[16px] font-semibold outline-none focus:bg-field" />
            <button type="button" aria-label={`More ${u}`} onClick={() => set({ count: clamp(plan.count + 1) })} className="w-10 transition-colors hover:bg-field"><Plus className="mx-auto size-4" strokeWidth={1.75} /></button>
          </div>
        </div>
        <div>
          <label htmlFor="sector" className="field-label">Your sector</label>
          <select id="sector" value={plan.sector} onChange={e => set({ sector: e.target.value })} className="mt-2 h-11 w-full border border-ink/20 bg-transparent px-2.5 text-[15px] outline-none focus:border-ink">{SECTORS.map(s => <option key={s}>{s}</option>)}</select>
        </div>
      </div>
      <p className="mt-auto border-t border-line pt-3 text-[13.5px] leading-snug text-muted max-md:hidden">Requests are taken by phone, Monday to Friday, 9:00 to 5:00. Also <a href={TEL2} className="tnum ulink text-ink">{PHONE2}</a>. No prices are quoted online.</p>
    </div>
  )
}

export function CopyButton({ className = "" }: { className?: string }) {
  const { summary } = usePlan()
  const [done, setDone] = useState(false)
  return (
    <button type="button" disabled={!summary} onClick={async () => { try { await navigator.clipboard.writeText(`${summary} Office Mon to Fri, 9:00 to 5:00.`) } catch { /* clipboard blocked */ } setDone(true); setTimeout(() => setDone(false), 2000) }} className={`inline-flex min-h-11 items-center gap-2 text-[15px] font-medium disabled:opacity-40 ${className}`}>
      {done ? <Check className="size-4" strokeWidth={1.75} aria-hidden /> : <Copy className="size-4" strokeWidth={1.75} aria-hidden />}<span className="ulink" aria-live="polite">{done ? "Summary copied" : "Copy summary"}</span>
    </button>
  )
}

export default function Manifest() {
  const { summary } = usePlan()
  const today = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Nassau" }).format(new Date())
  return (
    <section id="manifest" aria-labelledby="manifest-title" className="sheet scroll-mt-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5 md:px-7">
        <h2 id="manifest-title" className="text-[22px] font-bold tracking-[-0.02em] md:text-[24px]">Request a service proposal</h2>
        <p className="tnum hidden text-[13px] text-muted sm:block">AE-REQ · {today}</p>
      </div>
      <div className="grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="px-5 py-5 md:border-r md:border-line md:px-7"><Inputs /></div>
        <div className="flex flex-col border-t border-line md:border-t-0">
          <div className="flex-1 px-5 py-5 md:px-7"><CustodyLine /></div>
          <div className="border-t border-line bg-field/50 px-5 py-4 md:px-7">
            <p className="serif text-[15.5px] leading-snug" aria-live="polite">{summary || "Your request summary appears here."}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
              <a href={TEL} className="btn-primary tnum max-sm:w-full"><Phone className="size-4" strokeWidth={1.75} aria-hidden />Call {PHONE}</a>
              <CopyButton />
              <button type="button" onClick={() => window.print()} className="no-print hidden min-h-11 items-center gap-2 text-[15px] font-medium md:inline-flex"><Printer className="size-4" strokeWidth={1.75} aria-hidden /><span className="ulink">Print</span></button>
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only">Also on <a href={TEL2}>{PHONE2}</a>.</p>
    </section>
  )
}
