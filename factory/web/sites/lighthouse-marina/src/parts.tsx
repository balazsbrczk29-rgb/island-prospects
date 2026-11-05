import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Mail, Phone, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EMAIL, PHONE, TEL, Label, Reveal, ease } from "./site"

/* ---------- the Elbow Reef Lighthouse, drawn, with a slow beam ---------- */
export function Lighthouse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label="Illustration of the red and white Elbow Reef Lighthouse above Hope Town Harbour">
      <defs>
        <linearGradient id="beam" x1="0" x2="1"><stop offset="0" stopColor="#f6e7b0" stopOpacity=".85" /><stop offset="1" stopColor="#f6e7b0" stopOpacity="0" /></linearGradient>
      </defs>
      <g className="beam" style={{ transformOrigin: "200px 92px" }}>
        <path d="M200 92 L400 40 L400 144 Z" fill="url(#beam)" />
      </g>
      <path d="M150 470 L250 470 L234 130 L166 130 Z" fill="#fbfaf7" stroke="#13202b" strokeWidth="2" />
      {[0, 1, 2, 3].map(i => { const y1 = 170 + i * 80, y2 = y1 + 40; const k = (y: number) => 16 * (470 - y) / 340; return <path key={i} d={`M${166 - 16 + k(y1)} ${y1} L${234 + 16 - k(y1)} ${y1} L${234 + 16 - k(y2)} ${y2} L${166 - 16 + k(y2)} ${y2} Z`} fill="#b8312f" /> })}
      <rect x="160" y="116" width="80" height="14" fill="#13202b" />
      <rect x="172" y="74" width="56" height="42" fill="#f6e7b0" stroke="#13202b" strokeWidth="2" />
      {[0, 1, 2, 3].map(i => <line key={i} x1={172 + i * 14} y1="74" x2={172 + i * 14} y2="116" stroke="#13202b" strokeWidth="1.5" />)}
      <path d="M166 74 L200 46 L234 74 Z" fill="#b8312f" stroke="#13202b" strokeWidth="2" />
      <circle cx="200" cy="42" r="5" fill="#13202b" />
      <path d="M0 470 Q100 455 200 470 T400 470 L400 520 L0 520 Z" fill="#1e4f7a" opacity=".9" />
      <path d="M0 488 Q100 476 200 488 T400 488" fill="none" stroke="#f6f3ee" strokeOpacity=".5" strokeWidth="2" />
    </svg>
  )
}

/* ---------- slip fit check: 6 slips, 60 ft LOA, 6 ft draft at low water ---------- */
function Row({ label, val, unit, max, okv, set, step, min, top }: { label: string; val: number; unit: string; max: number; okv: boolean; set: (n: number) => void; step: number; min: number; top: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label text-muted">{label}</span>
        <span className={`inline-flex items-center gap-1.5 text-[14px] ${okv ? "text-chart" : "text-ink"}`}>{okv ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />} Marina limit {max} {unit}</span>
      </div>
      <p className="mt-2 font-display text-[clamp(3rem,6vw,4.6rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">{val}<span className="ml-1 text-[0.4em] font-medium text-muted">{unit}</span></p>
      <div className="relative mt-4">
        <input type="range" min={min} max={top} step={step} value={val} onChange={e => set(Number(e.target.value))} className="range w-full" aria-label={label} />
        <span className="pointer-events-none absolute -top-1 h-4 w-px bg-ink" style={{ left: `${((max - min) / (top - min)) * 100}%` }} aria-hidden />
      </div>
    </div>
  )
}

export function FitCheck() {
  const [loa, setLoa] = useState(38)
  const [draft, setDraft] = useState(3.5)
  const okL = loa <= 60, okD = draft <= 6
  const ok = okL && okD
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-7">
        <Row label="Length overall" val={loa} unit="ft" max={60} okv={okL} set={setLoa} step={1} min={15} top={80} />
        <Row label="Draft" val={draft} unit="ft" max={6} okv={okD} set={setDraft} step={0.5} min={1} top={9} />
      </div>
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div key={String(ok)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className={`flex h-full flex-col justify-between rounded-[8px] p-6 md:p-8 ${ok ? "bg-chart text-paper" : "bg-buff text-ink"}`}>
            <div>
              <p className="label opacity-80">{ok ? "Within the published limits" : "Outside the published limits"}</p>
              <p className="mt-3 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight">{ok ? "Your boat fits our protected slips." : !okL ? "Longer than the 60 ft our slips take." : "Deeper than 6 ft at low water."}</p>
              <p className="mt-3 text-[15px] opacity-80">{ok ? "Six slips means space goes quickly. Ask the office before you come in." : "Call the office: we can still fuel you and point you to the right berth in the harbour."}</p>
            </div>
            <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent("lm:prefill", { detail: { loa: String(loa), draft: String(draft) } }))} className={`btn mt-8 justify-center ${ok ? "btn-light" : "btn-primary"}`}>Request a slip for {loa} ft</a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- haul-out and storage estimator (rates effective November 2024) ---------- */
const storageRate = (twin: boolean, loa: number) => twin ? { per: 9, flat: 0 } : loa <= 25 ? { per: 0, flat: 200 } : loa <= 30 ? { per: 8.5, flat: 0 } : { per: 9, flat: 0 }
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })
export function YardEstimator() {
  const [twin, setTwin] = useState(false)
  const [loa, setLoa] = useState(26)
  const [months, setMonths] = useState(4)
  const [wash, setWash] = useState(true)
  const haul = twin ? 7 : 5.5, launch = twin ? 7 : 5.5, block = twin ? 60 : 50
  const st = storageRate(twin, loa)
  const lines: [string, number][] = [
    [`Haul, ${loa} ft at $${haul.toFixed(2)}`, loa * haul],
    [`Blocking`, block],
    [`Storage, ${months} ${months === 1 ? "month" : "months"} ${st.flat ? "at $200" : `at $${st.per.toFixed(2)}/ft`}`, (st.flat || st.per * loa) * months],
    [`Launch, ${loa} ft at $${launch.toFixed(2)}`, loa * launch],
    ...(wash ? [[`Pressure cleaning at $${twin ? 8 : 6}/ft`, loa * (twin ? 8 : 6)] as [string, number]] : []),
  ]
  const sub = lines.reduce((a, [, v]) => a + v, 0)
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-6">
        <div className="inline-flex rounded-[6px] bg-paper-2 p-1" role="radiogroup" aria-label="Hull">
          {[["Single hull", false], ["Twin hull", true]].map(([l, v]) => <button key={String(l)} role="radio" aria-checked={twin === v} onClick={() => setTwin(v as boolean)} className={`min-h-11 rounded-[4px] px-5 text-[15px] transition ${twin === v ? "bg-ink text-paper" : "hover:bg-paper"}`}>{l as string}</button>)}
        </div>
        <label className="block">
          <span className="label text-muted">Length overall</span>
          <span className="mt-2 block font-display text-[2.6rem] font-semibold leading-none tabular-nums">{loa} ft</span>
          <input type="range" min={15} max={45} value={loa} onChange={e => setLoa(Number(e.target.value))} className="range mt-4 w-full" aria-label="Length overall in feet" />
        </label>
        <label className="block">
          <span className="label text-muted">Months in dry storage</span>
          <span className="mt-2 block font-display text-[2.6rem] font-semibold leading-none tabular-nums">{months}</span>
          <input type="range" min={1} max={12} value={months} onChange={e => setMonths(Number(e.target.value))} className="range mt-4 w-full" aria-label="Months in storage" />
        </label>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-[16px]"><input type="checkbox" checked={wash} onChange={() => setWash(w => !w)} className="size-5 accent-[var(--color-chart)]" /> Add pressure cleaning on haul-out</label>
        <p className="text-[13px] text-muted">Dry storage and hauling up to 10 tons.</p>
      </div>
      <div className="rounded-[8px] border border-ink/15 bg-paper p-6 md:p-8 lg:col-span-6">
        <p className="label text-chart">Haul, store and launch</p>
        <ul className="mt-5 divide-y divide-line border-y border-line text-[15px]">
          {lines.map(([k, v]) => <li key={k} className="flex justify-between gap-4 py-3"><span className="text-muted">{k}</span><span className="tabular-nums">{usd(v)}</span></li>)}
          <li className="flex justify-between gap-4 py-3"><span className="text-muted">VAT 10%</span><span className="tabular-nums">{usd(sub * 0.1)}</span></li>
        </ul>
        <motion.p key={sub} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="mt-6 font-display text-[clamp(2.8rem,5vw,4rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">{usd(sub * 1.1)}</motion.p>
        <p className="mt-3 text-[13px] text-muted">From the boatyard's published rates, effective November 2024. Prep, painting and mechanical work are billed by the hour. The office confirms every quote.</p>
        <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent("lm:prefill", { detail: { tab: "yard", loa: String(loa), months: String(months), hull: twin ? "Twin hull" : "Single hull" } }))} className="btn btn-primary mt-6 w-full justify-center">Book a haul-out</a>
      </div>
    </div>
  )
}

/* ---------- enquiry ---------- */
const FORMS = {
  slip: { label: "Slip", fields: [["Boat name", "text"], ["LOA (ft)", "number"], ["Draft (ft)", "number"], ["Power", "select:30 amp|50 amp|Not needed"], ["Arriving", "date"], ["Departing", "date"]] },
  yard: { label: "Haul-out and storage", fields: [["Boat and engine", "text"], ["Hull", "select:Single hull|Twin hull"], ["LOA (ft)", "number"], ["Months of storage", "number"], ["Haul date", "date"]] },
  service: { label: "Mechanic", fields: [["Boat and engine", "text"], ["What needs doing", "text"], ["Where is the boat", "text"], ["Preferred date", "date"]] },
} as const
type FK = keyof typeof FORMS

export function Enquiry() {
  const [tab, setTab] = useState<FK>("slip")
  const [v, setV] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail as Record<string, string>
      if (d.tab === "yard") { setTab("yard"); setV(s => ({ ...s, "yard:LOA (ft)": d.loa, "yard:Months of storage": d.months, "yard:Hull": d.hull })) }
      else { setTab("slip"); setV(s => ({ ...s, "slip:LOA (ft)": d.loa, "slip:Draft (ft)": d.draft })) }
    }
    window.addEventListener("lm:prefill", on); return () => window.removeEventListener("lm:prefill", on)
  }, [])
  const set = (k: string, x: string) => setV(s => ({ ...s, [k]: x }))
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lines = ["Hello Lighthouse Marina,", "", `${FORMS[tab].label} request`]
    for (const [n] of FORMS[tab].fields) { const x = v[`${tab}:${n}`]; if (x) lines.push(`${n}: ${x}`) }
    for (const k of ["Name", "Phone", "Message"]) if (v[k]) lines.push(`${k}: ${v[k]}`)
    lines.push("", "(sent from the website)")
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${FORMS[tab].label} request${v[`${tab}:Boat name`] ? `: ${v[`${tab}:Boat name`]}` : ""}`)}&body=${encodeURIComponent(lines.join("\n"))}`
    setSent(true)
  }
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-chart"
  return (
    <form data-enquiry data-business="Lighthouse Marina" data-whatsapp="" data-email={EMAIL} action={`mailto:${EMAIL}`} method="post" encType="text/plain" onSubmit={submit}>
      <Tabs value={tab} onValueChange={x => setTab(x as FK)}>
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-[6px] bg-paper-2 p-1 sm:w-fit">
          {(Object.keys(FORMS) as FK[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-[4px] px-4 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{FORMS[k].label}</TabsTrigger>)}
        </TabsList>
        {(Object.keys(FORMS) as FK[]).map(k => (
          <TabsContent key={k} value={k} className="mt-8">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {FORMS[k].fields.map(([name, type]) => (
                <label key={name} className="block"><span className="label text-muted">{name}</span>
                  {type.startsWith("select:") ? (
                    <select name={name} value={v[`${k}:${name}`] ?? ""} onChange={e => set(`${k}:${name}`, e.target.value)} className={input}><option value="">Choose</option>{type.slice(7).split("|").map(o => <option key={o}>{o}</option>)}</select>
                  ) : <input name={name} type={type} value={v[`${k}:${name}`] ?? ""} onChange={e => set(`${k}:${name}`, e.target.value)} className={input} />}
                </label>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <label className="block"><span className="label text-muted">Your name</span><input name="Name" required autoComplete="name" value={v.Name ?? ""} onChange={e => set("Name", e.target.value)} className={input} /></label>
        <label className="block"><span className="label text-muted">Phone or VHF</span><input name="Phone" autoComplete="tel" value={v.Phone ?? ""} onChange={e => set("Phone", e.target.value)} className={input} /></label>
        <label className="block sm:col-span-2"><span className="label text-muted">Message</span><textarea name="Message" rows={3} value={v.Message ?? ""} onChange={e => set("Message", e.target.value)} className={`${input} resize-none py-3`} /></label>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-primary justify-center"><Mail className="size-4" aria-hidden /> Send to the marina office</button>
        <a href={TEL} className="btn btn-quiet justify-center"><Phone className="size-4" aria-hidden /> {PHONE}</a>
      </div>
      <p className="mt-4 text-[14px] text-muted" aria-live="polite">{sent ? "Your email app opened with your details." : "Opens your email app with everything filled in. On the water? Call on VHF 16."}</p>
    </form>
  )
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {items.map(([q, a], i) => (
        <AccordionItem key={q} value={`f${i}`} className="border-b border-line">
          <AccordionTrigger className="min-h-14 py-5 text-left font-display text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium hover:no-underline">{q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { Label, Reveal }
