import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CATEGORIES, PROJECTS, ISLANDS_ON_MAP, islandOf, officeFor, PHONE, TEL, EMAIL, type Cat } from "./data"
import { BAHAMAS, NEIGHBOURS, ISLAND_XY, MAP_W } from "./map"
import { ease } from "./site"

const VIEW_H = 620 // the northern and central islands, where every placed project sits

export const WORK = ["Paving or resurfacing", "Runway or apron", "Road construction", "Port, marine or sea defence", "Water, RO or utilities", "Site development", "Hot mix asphalt supply", "Ready mix concrete supply", "Building"] as const
export const ROUTER_ISLANDS = ["New Providence", "Grand Bahama", "Abaco", "Exuma", "Eleuthera", "Andros", "Bimini", "Another island"] as const
const NOUN: Record<Cat, [string, string]> = {
  "Road Construction": ["road project", "road projects"], "Airports and Runways": ["airport project", "airport projects"], "Ports": ["port project", "port projects"],
  "Coastal & Marine": ["coastal and marine project", "coastal and marine projects"], "Reverse Osmosis": ["reverse osmosis project", "reverse osmosis projects"],
  "Utility Infrastructure": ["utility project", "utility projects"], "Site Development": ["site development", "site developments"], "Buildings": ["building", "buildings"], "Drilling": ["drilling project", "drilling projects"],
}
const noun = (cat: Cat | "All", n: number) => cat === "All" ? (n === 1 ? "project" : "projects") : NOUN[cat][n === 1 ? 0 : 1]
// label placement per island so nothing collides (viewBox units)
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  "Grand Bahama": { dx: -30, dy: -34, anchor: "middle" }, Bimini: { dx: 0, dy: -26, anchor: "middle" }, Abaco: { dx: 26, dy: 8, anchor: "start" },
  "New Providence": { dx: 14, dy: 36, anchor: "start" }, Eleuthera: { dx: 22, dy: -14, anchor: "start" }, Andros: { dx: -26, dy: 10, anchor: "end" }, Exuma: { dx: 22, dy: 10, anchor: "start" },
}

export type Sel = { cat: Cat | "All"; island: string; work: string }

export default function MapAtlas({ sel, set }: { sel: Sel; set: (s: Partial<Sel>) => void }) {
  const reduce = useReducedMotion()
  const [focus, setFocus] = useState<string>("New Providence")
  const [pick, setPick] = useState<string>("")
  const rows = useMemo(() => PROJECTS.filter(p => sel.cat === "All" || p.cat === sel.cat), [sel.cat])
  const byIsland = useMemo(() => { const m: Record<string, typeof rows> = {}; rows.forEach(p => { (m[islandOf(p.name)] ??= []).push(p) }); return m }, [rows])
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map(c => [c, PROJECTS.filter(p => p.cat === c).length])), [])
  const here = focus ? byIsland[focus] ?? [] : []
  const project = here.find(p => p.name === pick) ?? here[0]
  const office = officeFor(sel.island)
  const ready = !!(sel.island && sel.work)
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request: ${sel.work}, ${sel.island}`)}&body=${encodeURIComponent(`Hello BHM,\n\nWork: ${sel.work}\nIsland: ${sel.island}\nScope: \nName: \nCompany or ministry: \nReply to: \n\nFor the ${office.town} office.`)}`
  const choose = (isl: string) => { setFocus(isl); set({ island: isl }) }

  return (
    <section aria-labelledby="h1" className="bg-[var(--color-salt)]">
      <div className="wrap pt-6 pb-16 lg:pt-8 lg:pb-24 grid gap-6 lg:gap-x-10 lg:gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 min-w-0">
          <h1 id="h1" className="text-[clamp(2.1rem,1.2rem+2.2vw,3.5rem)] max-w-[16ch]">{PROJECTS.length} projects across The Bahamas. Which island is yours?</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)] max-w-[48ch]">Bahamas Hot Mix: roads, runways, ports and water works, from offices in Nassau, Freeport and Marsh Harbour. Every project from bhmgroup.com, on the island where it was built.</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:row-span-3 min-w-0">
          <div role="group" aria-label="Filter by kind of work" className="-mx-[var(--pad)] px-[var(--pad)] flex gap-2 overflow-x-auto pb-1 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible [scrollbar-width:none]">
            {(["All", ...CATEGORIES] as const).map(c => {
              const on = sel.cat === c
              return (
                <button key={c} type="button" aria-pressed={on} onClick={() => set({ cat: c })}
                  className={`shrink-0 min-h-[44px] px-3 border text-sm rounded-[var(--r)] transition-colors duration-150 ${on ? "bg-[var(--color-petrol)] border-[var(--color-petrol)] text-white" : "border-[var(--color-line)] bg-[var(--color-white)] hover:border-[var(--color-ink)]"}`}>
                  {c === "All" ? "All work" : c} <span className="mono text-[0.75rem] opacity-75">{c === "All" ? PROJECTS.length : counts[c]}</span>
                </button>
              )
            })}
          </div>
          <figure className="mt-4 bg-[var(--color-white)] border border-[var(--color-line)] rounded-[var(--r)] overflow-hidden">
            <svg viewBox={`0 40 ${MAP_W} ${VIEW_H}`} className="block w-full h-auto" role="group" aria-label="Map of The Bahamas with BHM projects counted by island">
              <defs><pattern id="grid" width="62.5" height="62.5" patternUnits="userSpaceOnUse"><path d="M62.5 0H0V62.5" fill="none" stroke="#CFCFCB" strokeWidth="0.8" opacity="0.6" /></pattern></defs>
              <rect y={40} width={MAP_W} height={VIEW_H} fill="url(#grid)" />
              <path d={NEIGHBOURS} fill="#DCDCD8" />
              <motion.path d={BAHAMAS} fill="#2F3135" stroke="#2F3135" strokeWidth={0.6} initial={reduce ? false : { fillOpacity: 0 }} animate={{ fillOpacity: 0.86 }} transition={{ duration: 0.8, ease }} />
              {ISLANDS_ON_MAP.map((isl, k) => {
                const n = byIsland[isl]?.length ?? 0
                const [x, y] = ISLAND_XY[isl]
                const on = focus === isl
                const r = n ? 7 + 2.6 * Math.sqrt(n) : 5
                const L = LABEL[isl]
                return (
                  <g key={isl}>
                    <motion.circle cx={x} cy={y} initial={reduce ? false : { r: 0 }} animate={{ r, opacity: n ? 0.92 : 0.35 }} transition={{ duration: 0.4, ease, delay: reduce ? 0 : 0.5 + k * 0.08 }} fill={n ? "#0B5D73" : "#5E6268"} />
                    {on && <circle cx={x} cy={y} r={r + 7} fill="none" stroke="#0B5D73" strokeWidth={2.5} />}
                    <text x={x + (L.anchor === "middle" ? L.dx : L.anchor === "start" ? r + L.dx : -r + L.dx)} y={y + L.dy} textAnchor={L.anchor} className="mono map-label" fontSize={24} fill="#1D2023" paintOrder="stroke" stroke="#F8F8F6" strokeWidth={6}>
                      {isl} <tspan fontWeight={500}>{n}</tspan>
                    </text>
                    <circle cx={x} cy={y} r={44} fill="transparent" className="cursor-pointer hit" role="button" tabIndex={0}
                      aria-label={`${isl}, ${n} ${noun(sel.cat, n)}`} aria-pressed={on}
                      onClick={() => choose(isl)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(isl) } }} />
                  </g>
                )
              })}
            </svg>
            <figcaption className="px-3 py-2 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] mono">
              {(byIsland["Across the islands"]?.length ?? 0)} more {noun(sel.cat, byIsland["Across the islands"]?.length ?? 0)} not placed on the map; see the full list below.
            </figcaption>
          </figure>
        </div>

        <form className="lg:col-span-5 lg:col-start-8 lg:row-start-3 min-w-0 bg-[var(--color-white)] border border-[var(--color-line)] rounded-[var(--r)] p-5" onSubmit={e => e.preventDefault()} aria-label="Quote router">
          <p className="font-[family-name:var(--font-display)] text-lg tracking-[-0.02em]">Request a quote</p>
          <div className="mt-2 grid sm:grid-cols-2 gap-x-4">
            <label className="mt-2 grid gap-1 text-sm text-[var(--color-muted)]">What do you need?
              <select value={sel.work} onChange={e => set({ work: e.target.value })} className="min-h-[48px] bg-transparent border-b border-[var(--color-line)] text-base text-[var(--color-ink)]">
                <option value="">Choose the work</option>{WORK.map(w => <option key={w}>{w}</option>)}
              </select></label>
            <label className="mt-2 grid gap-1 text-sm text-[var(--color-muted)]">On which island?
              <select value={sel.island} onChange={e => { set({ island: e.target.value }); if ((ISLANDS_ON_MAP as readonly string[]).includes(e.target.value)) setFocus(e.target.value) }} className="min-h-[48px] bg-transparent border-b border-[var(--color-line)] text-base text-[var(--color-ink)]">
                <option value="">Choose the island</option>{ROUTER_ISLANDS.map(w => <option key={w}>{w}</option>)}
              </select></label>
          </div>
          <p className="mt-4 text-sm min-h-[2.8em]">{sel.island ? <>Handled by the <b className="font-medium">{office.town} office</b>, {office.line}. <a className="mono underline underline-offset-4" href={`tel:${TEL}`}>{PHONE}</a></> : <span className="text-[var(--color-muted)]">Pick the island and we route you to Nassau, Freeport or Marsh Harbour.</span>}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={ready ? mailto : "#quote"} className="btn">{ready ? `Email the ${office.town} office` : "Request a quote"}</a>
            <a href="#quote" className="link text-sm">Add scope and contact details</a>
          </div>
        </form>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2 min-w-0 border-t-2 border-[var(--color-ink)] pt-4" aria-live="polite">
          <p className="flex items-baseline justify-between gap-4"><span className="font-[family-name:var(--font-display)] text-[1.375rem] tracking-[-0.02em]">{focus}</span><span className="mono text-sm text-[var(--color-muted)]">{here.length} {noun(sel.cat, here.length)}</span></p>
          {here.length && project ? (
            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,160px)] gap-4 items-start">
              <ol className="max-h-[176px] overflow-y-auto pr-1 text-sm" aria-label={`Projects on ${focus}`}>
                {here.map(p => <li key={p.url + p.name}><button type="button" aria-pressed={p === project} onClick={() => setPick(p.name)}
                  className={`w-full text-left flex min-h-[44px] items-center border-b border-[var(--color-line)] hover:text-[var(--color-petrol)] ${p === project ? "text-[var(--color-petrol)] font-medium" : ""}`}>{p.name}</button></li>)}
              </ol>
              <div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img key={project.thumb} src={project.thumb} width={400} height={284} alt={`${project.name}, from bhmgroup.com`} className="photo !h-auto aspect-[400/284] bg-[var(--color-salt-2)]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} />
                </AnimatePresence>
                <p className="mt-2 text-xs text-[var(--color-muted)]">{project.cat}</p>
                <a className="text-xs underline underline-offset-4 inline-flex items-center min-h-[44px]" href={project.url}>Scope on bhmgroup.com</a>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm">No {sel.cat === "All" ? "projects" : NOUN[sel.cat][1]} placed on {focus}. <button type="button" className="underline underline-offset-4" onClick={() => set({ cat: "All" })}>See all {focus} work</button></p>
          )}
        </div>
      </div>
    </section>
  )
}
