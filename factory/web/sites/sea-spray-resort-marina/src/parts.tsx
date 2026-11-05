import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import { Phone, Radio, ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ease, PHONE, TEL, STAY } from "./site"

const MAX_LOA = 130, MIN_LOA = 20, MAX_DRAFT = 7

export function SlipCheck() {
  const [loa, setLoa] = useState(52)
  const [draft, setDraft] = useState(4.5)
  const loaOk = loa >= MIN_LOA && loa <= MAX_LOA
  const draftOk = draft <= MAX_DRAFT
  const ok = loaOk && draftOk
  const msg = ok ? "Within the published limits. Call or hail VHF 16 to confirm a slip for your dates."
    : !draftOk ? `A ${draft} ft draft is more than the 7 ft the dock takes at low tide. Call the dock office before you plan this one.`
    : loa > MAX_LOA ? `At ${loa} ft you are over the 130 ft maximum. Call the dock office to talk it through.`
    : "Under 20 ft: call the dock office about small-boat space."
  const send = () => window.dispatchEvent(new CustomEvent("ss-slip", { detail: { loa, draft } }))
  const pct = Math.min(loa, 160) / 160 * 100
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-4">
        <div>
          <label htmlFor="loa" className="flex items-baseline justify-between"><span className="label text-muted">Length overall</span><span className="font-display text-4xl font-light tabular-nums">{loa} <span className="text-lg">ft</span></span></label>
          <input id="loa" type="range" min={16} max={160} value={loa} onChange={e => setLoa(+e.target.value)} className="mt-3 w-full" />
        </div>
        <div>
          <label htmlFor="draft" className="flex items-baseline justify-between"><span className="label text-muted">Draft</span><span className="font-display text-4xl font-light tabular-nums">{draft.toFixed(1)} <span className="text-lg">ft</span></span></label>
          <input id="draft" type="range" min={1} max={10} step={0.5} value={draft} onChange={e => setDraft(+e.target.value)} className="mt-3 w-full" />
        </div>
        <motion.p key={msg} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} aria-live="polite" className={`border-l-2 pl-4 text-[16px] leading-relaxed ${ok ? "border-harbour" : "border-sand"}`}>{msg}</motion.p>
        <a href="#request" onClick={send} className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-harbour-deep">Request a slip for this boat</a>
      </div>
      <div className="lg:col-span-8">
        <div className="relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#e9f1ef_0%,#cfe4e0_55%,#a9d3cc_100%)] p-5 md:p-8">
          <p className="label text-ink/60">Dock face, 0 to 160 ft</p>
          <div className="relative mt-16 h-24">
            <motion.svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute bottom-6 left-0 h-16" animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease }} aria-hidden>
              <path d="M2 34 L330 34 Q392 34 398 22 L398 18 L40 18 Q10 18 2 26 Z" fill={ok ? "#ffffff" : "#f7efe2"} stroke="#0f2230" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d="M120 18 L130 4 L260 4 L280 18" fill="#ffffff" stroke="#0f2230" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d="M2 34 L330 34 Q392 34 398 22" fill="none" stroke={ok ? "#1d5b7f" : "#b0915a"} strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </motion.svg>
            <div className="absolute bottom-0 left-0 h-6 w-full border-t-2 border-ink/70 bg-[repeating-linear-gradient(90deg,#c9b38c_0_14px,#b9a27a_14px_16px)]" />
            <div className="absolute bottom-0 h-[132px] border-l border-dashed border-ink/60" style={{ left: `${MAX_LOA / 160 * 100}%` }}><span className="label absolute -top-6 -translate-x-1/2 whitespace-nowrap text-ink/70">130 ft max</span></div>
          </div>
          <div className="mt-10 grid grid-cols-[1fr_auto] items-end gap-6">
            <div>
              <p className="label text-ink/60">At low tide</p>
              <p className="mt-2 max-w-sm text-[15px] text-ink/75">The dock takes drafts up to 7 ft even at low tide.</p>
            </div>
            <div className="relative h-44 w-24 overflow-hidden rounded-[10px] border border-ink/20 bg-[linear-gradient(180deg,#bfe0da,#2e6f86)]" aria-label={`Depth gauge: draft ${draft} ft against 7 ft`} role="img">
              {[0, 2, 4, 6, 8, 10].map(f => <span key={f} className="absolute right-1 text-[10px] text-white/90" style={{ top: `${f * 10 + 2}%` }}>{f}</span>)}
              <div className="absolute inset-x-0 border-t-2 border-dashed border-white" style={{ top: `${MAX_DAFT_PCT}%` }} />
              <motion.div className={`absolute left-2 w-8 rounded-b-md ${draftOk ? "bg-white" : "bg-sand"}`} style={{ top: 0 }} animate={{ height: `${draft * 10}%` }} transition={{ duration: 0.5, ease }} />
            </div>
          </div>
          <p className="label mt-6 text-ink/50">Illustration, not to scale. Not for navigation.</p>
        </div>
      </div>
    </div>
  )
}
const MAX_DAFT_PCT = MAX_DRAFT * 10

type F = { k: string; type?: string; options?: string[] }
const ENQ: Record<string, { label: string; intro: string; fields: F[] }> = {
  slip: { label: "A slip", intro: "Boat details and dates for the dock office.", fields: [{ k: "Boat name" }, { k: "LOA (ft)", type: "number" }, { k: "Draft (ft)", type: "number" }, { k: "Beam (ft)", type: "number" }, { k: "Arrival", type: "date" }, { k: "Departure", type: "date" }] },
  stay: { label: "A stay", intro: "Villa stays are booked online. Questions first? Add them here and call.", fields: [{ k: "Arrival", type: "date" }, { k: "Departure", type: "date" }, { k: "Guests", options: ["1-2", "3-4", "5-6", "7+"] }, { k: "Arriving by", options: ["Own boat", "Ferry or water taxi", "Not sure yet"] }] },
  home: { label: "A residence", intro: "Oceanfront homes and Marina View cottages.", fields: [{ k: "Interested in", options: ["Oceanfront home", "Marina View Cottage, Plan A", "Marina View Cottage, Plan B", "Not sure yet"] }, { k: "Your name" }, { k: "Best number" }] },
}

export function Enquiry() {
  const [tab, setTab] = useState("slip")
  const [v, setV] = useState<Record<string, string>>({})
  useEffect(() => {
    const h = (e: Event) => { const d = (e as CustomEvent).detail; setTab("slip"); setV(o => ({ ...o, "slip:LOA (ft)": String(d.loa), "slip:Draft (ft)": String(d.draft) })) }
    window.addEventListener("ss-slip", h); return () => window.removeEventListener("ss-slip", h)
  }, [])
  const c = ENQ[tab]
  const lines = useMemo(() => c.fields.map(f => v[`${tab}:${f.k}`] ? `${f.k} ${v[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [c, v, tab])
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-harbour"
  return (
    <div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper p-1">
          {Object.entries(ENQ).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{x.label}</TabsTrigger>)}
        </TabsList>
        {Object.entries(ENQ).map(([k, x]) => (
          <TabsContent key={k} value={k} className="mt-7">
            <p className="text-[16px] text-muted">{x.intro}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {x.fields.map(f => {
                const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`, val = v[`${k}:${f.k}`] ?? ""
                const set = (s: string) => setV(o => ({ ...o, [`${k}:${f.k}`]: s }))
                return <div key={f.k}><label htmlFor={id} className="label text-muted">{f.k}</label>{f.options ? <select id={id} value={val} onChange={e => set(e.target.value)} className={input}><option value="">Choose</option>{f.options.map(o => <option key={o}>{o}</option>)}</select> : <input id={id} type={f.type ?? "text"} value={val} onChange={e => set(e.target.value)} className={input} />}</div>
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-10 rounded-[18px] bg-ink p-6 text-paper md:p-8">
        <p className="label text-seaglass">Read this out, or hail VHF 16</p>
        <p className="mt-3 min-h-12 text-[16px] leading-relaxed text-paper/85">{lines.length ? `Requesting ${c.label.toLowerCase()}: ${lines.join(", ")}.` : "Your details will appear here as you fill them in."}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
          <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/25 px-5 text-paper/85"><Radio className="size-4" aria-hidden />VHF Channel 16</span>
          {tab === "stay" && <a href={STAY} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-paper/40 px-5 transition hover:-translate-y-px hover:border-paper">Book your stay online <ArrowUpRight className="size-4" aria-hidden /></a>}
        </div>
      </div>
    </div>
  )
}
