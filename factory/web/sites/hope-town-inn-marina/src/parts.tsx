import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Anchor, Mail, Minus, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { C, STAYS, ease } from "./site"

/** Stay finder: choose a party size, see which of the resort's real rooms and villas fit. */
export function StayFinder({ dark = false }: { dark?: boolean }) {
  const [guests, setGuests] = useState(2)
  const fits = useMemo(() => STAYS.filter(s => s.guests >= guests), [guests])
  const [sel, setSel] = useState(STAYS[2].name)
  const cur = fits.find(s => s.name === sel) ?? fits[0]
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <div className={`flex items-center justify-between rounded-full border p-2 ${dark ? "border-paper/20" : "border-line bg-white/60"}`}>
          <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="grid size-11 place-items-center rounded-full transition hover:bg-ink hover:text-paper" aria-label="Fewer guests"><Minus className="size-4" /></button>
          <p className="text-center" aria-live="polite"><span className="font-display text-3xl">{guests}</span> <span className="text-[14px] text-muted">{guests === 1 ? "guest" : "guests"}</span></p>
          <button onClick={() => setGuests(g => Math.min(8, g + 1))} className="grid size-11 place-items-center rounded-full transition hover:bg-ink hover:text-paper" aria-label="More guests"><Plus className="size-4" /></button>
        </div>
        <p className="mt-4 text-[14px] text-muted">{fits.length} of {STAYS.length} rooms and villas sleep {guests} or more.</p>
        <ul className="mt-6 border-t border-line" role="listbox" aria-label="Rooms and villas">
          <AnimatePresence initial={false}>
            {fits.map(s => (
              <motion.li key={s.name} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden border-b border-line">
                <button role="option" aria-selected={cur?.name === s.name} onClick={() => setSel(s.name)} onMouseEnter={() => setSel(s.name)} className="group flex min-h-14 w-full items-baseline justify-between gap-4 py-3.5 text-left">
                  <span className={`font-display text-[1.7rem] leading-tight transition ${cur?.name === s.name ? "translate-x-2 italic" : "group-hover:translate-x-1"}`}>{s.name}</span>
                  <span className="shrink-0 text-[13px] text-muted">{s.kind} · {s.guests} guests</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <div className="relative lg:sticky lg:top-28 lg:self-start">
        <AnimatePresence mode="wait">
          {cur && (
            <motion.figure key={cur.name} initial={{ opacity: 0, clipPath: "inset(0 0 0 30%)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="relative">
              <img src={cur.img} alt={`${cur.name} at Hope Town Inn & Marina`} width={395} height={300} loading="lazy" className="aspect-[4/3] w-full rounded-[2px] bg-shallows object-cover" />
              <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-3xl italic">{cur.name}</p>
                  <p className="mt-1 text-[15px] text-muted">Sleeps {cur.guests} · {cur.ft.toLocaleString()} ft² / {cur.m} m²</p>
                </div>
                <a href={C.book} className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check dates <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              </div>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Slip check against the marina's published limits: slips up to 125 ft, moorings up to 45 ft. */
export function SlipCheck() {
  const [loa, setLoa] = useState("")
  const n = parseFloat(loa)
  const res = !loa || isNaN(n) || n <= 0 ? null
    : n <= 45 ? { t: "A slip or a mooring", d: "Your boat is within the published limits for both the slips and the moorings (up to 45 ft)." }
    : n <= 125 ? { t: "A slip fits", d: "Dockage is published for vessels up to 125 ft, with 30, 50 and 100 amp service." }
    : { t: "Talk to the dockmaster", d: "That is longer than the published 125 ft maximum. Email the marina to ask." }
  return (
    <div className="rounded-[28px] border border-paper/15 bg-white/[0.04] p-6 backdrop-blur md:p-8">
      <label htmlFor="loa" className="text-[11px] font-semibold tracking-[0.22em] text-sand uppercase">Length overall, in feet</label>
      <div className="mt-3 flex items-end gap-3 border-b border-paper/30 pb-2">
        <Anchor className="mb-2 size-5 text-sand" aria-hidden />
        <input id="loa" inputMode="decimal" type="number" min="1" placeholder="62" value={loa} onChange={e => setLoa(e.target.value)} className="w-full bg-transparent font-display text-6xl text-paper outline-none placeholder:text-paper/25" />
        <span className="mb-2 text-paper/60">ft</span>
      </div>
      <div className="relative mt-6 h-2 rounded-full bg-paper/10" aria-hidden>
        <span className="absolute inset-y-0 left-0 rounded-full bg-shallows/40" style={{ width: `${(45 / 140) * 100}%` }} />
        <span className="absolute inset-y-0 left-0 rounded-full border-r-2 border-sand" style={{ width: `${(125 / 140) * 100}%` }} />
        {res && <motion.span layout className="absolute -top-1.5 size-5 -translate-x-1/2 rounded-full bg-paper shadow" style={{ left: `${Math.min(100, (n / 140) * 100)}%` }} />}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-paper/50"><span>0</span><span>Moorings to 45 ft</span><span>Slips to 125 ft</span></div>
      <div className="mt-6 min-h-[92px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {res ? (
            <motion.div key={res.t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
              <p className="font-display text-3xl text-paper italic">{res.t}</p>
              <p className="mt-1 text-[15px] text-paper/70">{res.d}</p>
            </motion.div>
          ) : <p className="text-[15px] text-paper/60">Enter your boat's length to check it against the marina's published limits.</p>}
        </AnimatePresence>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={C.dockwa} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-5 text-[15px] text-ink transition hover:-translate-y-px">Book a slip on Dockwa <ArrowUpRight className="size-4" aria-hidden /></a>
        <a href={`mailto:${C.email}?subject=${encodeURIComponent("Slip enquiry")}&body=${encodeURIComponent(loa ? `Boat length overall: ${loa} ft\n` : "")}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/30 px-5 text-[15px] text-paper transition hover:border-paper">Email the marina</a>
      </div>
    </div>
  )
}

const PLAN = {
  stay: { label: "A room or villa", fields: [["Arrival", "date"], ["Departure", "date"], ["Guests", "number"], ["Room or villa", "text"]] },
  slip: { label: "A slip", fields: [["Boat name", "text"], ["Length overall (ft)", "number"], ["Arrival", "date"], ["Departure", "date"]] },
  event: { label: "A wedding or event", fields: [["Your name", "text"], ["Date", "date"], ["Guests", "number"], ["What you have in mind", "text"]] },
} as const

export function Plan() {
  const [tab, setTab] = useState<keyof typeof PLAN>("stay")
  const [v, setV] = useState<Record<string, string>>({})
  const conf = PLAN[tab]
  const lines = conf.fields.map(([f]) => v[`${tab}:${f}`] ? `${f}: ${v[`${tab}:${f}`]}` : null).filter(Boolean) as string[]
  const mail = `mailto:${C.email}?subject=${encodeURIComponent(`Enquiry: ${conf.label}`)}&body=${encodeURIComponent(`Hello Hope Town Inn & Marina,\n\n${lines.join("\n")}\n\nThank you.`)}`
  return (
    <div>
      <Tabs value={tab} onValueChange={t => setTab(t as keyof typeof PLAN)}>
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper-2 p-1">
          {Object.entries(PLAN).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{c.label}</TabsTrigger>)}
        </TabsList>
        {Object.entries(PLAN).map(([k, c]) => (
          <TabsContent key={k} value={k} className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {c.fields.map(([f, type]) => {
                const id = `${k}-${f.replace(/\W+/g, "-").toLowerCase()}`
                return (
                  <div key={f}>
                    <label htmlFor={id} className="text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">{f}</label>
                    <input id={id} type={type} value={v[`${k}:${f}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-2xl outline-none transition focus:border-sea" />
                  </div>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-10 flex flex-col gap-4 rounded-[28px] bg-ink p-6 text-paper md:flex-row md:items-center md:justify-between md:p-8">
        <p className="text-[15px] text-paper/75">{lines.length ? lines.join(" · ") : "Your details will appear here, ready to send."}</p>
        <div className="flex shrink-0 flex-wrap gap-2">
          {tab === "stay" && <a href={C.book} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Check live rates <ArrowUpRight className="size-4" aria-hidden /></a>}
          {tab === "slip" && <a href={C.dockwa} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Book on Dockwa <ArrowUpRight className="size-4" aria-hidden /></a>}
          <a href={mail} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/30 px-6 transition hover:border-paper"><Mail className="size-4" aria-hidden /> Email the office</a>
        </div>
      </div>
      <p className="mt-3 text-[13px] text-muted">Rates on request. Email opens with your details filled in; nothing is sent until you press send.</p>
    </div>
  )
}
