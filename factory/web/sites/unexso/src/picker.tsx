import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Mail } from "lucide-react"
import { C, ease } from "./site"
import { EXPS, type Exp } from "./data"

const KINDS = ["All", "Dolphins", "Ocean", "Diving", "Learning"] as const
export function Picker({ onlyBookable = false }: { onlyBookable?: boolean }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All")
  const [now, setNow] = useState(onlyBookable)
  const list = useMemo(() => EXPS.filter(e => (kind === "All" || e.kind === kind) && (!now || e.status === "Bookable")), [kind, now])
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-full bg-foam-2 p-1" role="tablist" aria-label="Type of experience">
          {KINDS.map(k => <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={`min-h-11 rounded-full px-4 text-[15px] transition ${kind === k ? "bg-ink text-foam" : "hover:bg-white"}`}>{k}</button>)}
        </div>
        <button onClick={() => setNow(v => !v)} aria-pressed={now} className={`ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] transition ${now ? "border-lagoon bg-lagoon text-white" : "border-line hover:border-ink"}`}><span className={`size-2.5 rounded-full ${now ? "bg-sun" : "bg-line"}`} />Bookable now</button>
      </div>
      <ul className="mt-8 border-t border-line">
        <AnimatePresence initial={false}>
          {list.map(e => <Row key={e.name} e={e} />)}
        </AnimatePresence>
      </ul>
      <p className="mt-4 text-[13px] text-muted">Prices as published, excluding VAT. Diving is relaunching at Sanctuary Bay: ask to be told first.</p>
    </div>
  )
}
function Row({ e }: { e: Exp }) {
  const live = e.status === "Bookable"
  return (
    <motion.li layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden border-b border-line">
      <div className="group grid gap-4 py-5 sm:grid-cols-[120px_1fr_auto] sm:items-center">
        <div className="hidden aspect-[4/3] overflow-hidden rounded-xl bg-lagoon-soft sm:block">{e.img && <img src={e.img} alt={`${e.name} at Sanctuary Bay`} width={506} height={317} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" />}</div>
        <div>
          <p className="flex flex-wrap items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase"><span className="text-lagoon">{e.kind}</span><span className={`rounded-full px-2 py-0.5 tracking-normal normal-case ${live ? "bg-lagoon-soft text-deep" : "bg-sun/40 text-ink"}`}>{e.status}</span></p>
          <p className="mt-1 font-display text-[1.6rem] leading-tight font-bold tracking-[-0.01em] transition group-hover:translate-x-1">{e.name}</p>
          <p className="mt-1 max-w-xl text-[15px] text-muted">{e.d}</p>
          <p className="mt-2 text-[14px]">{[e.price, e.time].filter(Boolean).join(" · ") || "Rates on request"}</p>
        </div>
        {live && e.book ? (
          <a href={e.book} className="inline-flex min-h-12 items-center gap-2 justify-self-start rounded-full bg-ink px-5 text-[15px] text-foam transition hover:-translate-y-0.5 hover:bg-lagoon sm:justify-self-end">Book now <ArrowUpRight className="size-4" aria-hidden /></a>
        ) : (
          <a href={`mailto:${C.email}?subject=${encodeURIComponent(e.name)}`} className="inline-flex min-h-12 items-center gap-2 justify-self-start rounded-full border border-ink px-5 text-[15px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-foam sm:justify-self-end"><Mail className="size-4" aria-hidden /> {live ? "Ask about it" : "Tell me first"}</a>
        )}
      </div>
    </motion.li>
  )
}
