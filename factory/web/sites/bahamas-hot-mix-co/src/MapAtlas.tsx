import { useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CATEGORIES, PROJECTS, ISLANDS_ON_MAP, islandOf, officeFor, PHONE, TEL, EMAIL, type Cat } from "./data"
import { BAHAMAS, NEIGHBOURS, ISLAND_XY, MAP_W, MAP_H } from "./map"
import { ease } from "./site"

export const WORK = ["Paving or resurfacing", "Runway or apron", "Road construction", "Port, marine or sea defence", "Water, RO or utilities", "Site development", "Hot mix asphalt supply", "Ready mix concrete supply"]
export const ROUTER_ISLANDS = ["New Providence", "Grand Bahama", "Abaco", "Exuma", "Eleuthera", "Andros", "Bimini", "Another island"] as const
const SHORT: Partial<Record<Cat, string>> = { "Road Construction": "Roads", "Airports and Runways": "Runways", "Coastal & Marine": "Coastal", "Reverse Osmosis": "Water (RO)", "Utility Infrastructure": "Utilities", "Site Development": "Site development" }

export type Sel = { cat: Cat | "All"; island: string; work: string }

export default function MapAtlas({ sel, set }: { sel: Sel; set: (s: Partial<Sel>) => void }) {
  const rows = useMemo(() => PROJECTS.filter(p => sel.cat === "All" || p.cat === sel.cat), [sel.cat])
  const byIsland = useMemo(() => { const m: Record<string, typeof rows> = {}; rows.forEach(p => { (m[islandOf(p.name)] ??= []).push(p) }); return m }, [rows])
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map(c => [c, PROJECTS.filter(p => p.cat === c).length])), [])
  const here = sel.island ? byIsland[sel.island] ?? [] : []
  const office = officeFor(sel.island)
  const top = [...ISLANDS_ON_MAP].sort((a, b) => (byIsland[b]?.length ?? 0) - (byIsland[a]?.length ?? 0)).slice(0, 3)
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request: ${sel.work || "works"}${sel.island ? `, ${sel.island}` : ""}`)}&body=${encodeURIComponent(`Hello BHM,\n\nWork: ${sel.work || ""}\nIsland: ${sel.island || ""}\nScope: \nName: \nCompany or ministry: \nReply to: \n\nFor the ${office.town} office.`)}`

  return (
    <section aria-labelledby="h1" className="bg-[var(--color-salt)]">
      <div className="wrap pt-6 pb-16 lg:pt-8 lg:pb-24 grid gap-8 lg:gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:row-span-2 min-w-0 order-2 lg:order-1">
          <div role="group" aria-label="Filter by kind of work" className="-mx-[var(--pad)] px-[var(--pad)] flex gap-2 overflow-x-auto pb-1 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible [scrollbar-width:none]">
            {(["All", ...CATEGORIES] as const).map(c => {
              const on = sel.cat === c
              return (
                <button key={c} type="button" aria-pressed={on} onClick={() => set({ cat: c })}
                  className={`shrink-0 min-h-[44px] px-3.5 border text-sm rounded-[var(--r)] transition-colors duration-150 ${on ? "bg-[var(--color-petrol)] border-[var(--color-petrol)] text-white" : "border-[var(--color-line)] bg-[var(--color-white)] hover:border-[var(--color-ink)]"}`}>
                  {c === "All" ? "All work" : SHORT[c] ?? c} <span className="mono text-[0.75rem] opacity-75">{c === "All" ? PROJECTS.length : counts[c]}</span>
                </button>
              )
            })}
          </div>
          <figure className="mt-4 relative bg-[var(--color-white)] border border-[var(--color-line)] rounded-[var(--r)] overflow-hidden">
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block w-full h-auto" role="group" aria-label="Map of The Bahamas with BHM projects counted by island">
              <defs><pattern id="grid" width="62.5" height="62.5" patternUnits="userSpaceOnUse"><path d="M62.5 0H0V62.5" fill="none" stroke="#CFCFCB" strokeWidth="0.8" opacity="0.6" /></pattern></defs>
              <rect width={MAP_W} height={MAP_H} fill="url(#grid)" />
              <path d={NEIGHBOURS} fill="#DCDCD8" />
              <path d={BAHAMAS} fill="#2F3135" fillOpacity={0.86} stroke="#2F3135" strokeWidth={0.6} />
              {ISLANDS_ON_MAP.map(isl => {
                const n = byIsland[isl]?.length ?? 0
                const [x, y] = ISLAND_XY[isl]
                const on = sel.island === isl
                const r = n ? 7 + 2.6 * Math.sqrt(n) : 5
                const right = isl !== "Bimini" && isl !== "Grand Bahama" && isl !== "Andros"
                return (
                  <g key={isl}>
                    <motion.circle cx={x} cy={y} initial={false} animate={{ r, opacity: n ? 0.92 : 0.35 }} transition={{ duration: 0.3, ease }} fill={n ? "#0B5D73" : "#5E6268"} />
                    {on && <circle cx={x} cy={y} r={r + 7} fill="none" stroke="#0B5D73" strokeWidth={2.5} />}
                    <text x={right ? x + r + 12 : x - r - 14} y={y + 6} textAnchor={right ? "start" : "end"} className="mono map-label" fontSize={20} fill="#1D2023" paintOrder="stroke" stroke="#F8F8F6" strokeWidth={5}>
                      {isl} <tspan fontWeight={500}>{n}</tspan>
                    </text>
                    <circle cx={x} cy={y} r={58} fill="transparent" className="cursor-pointer" role="button" tabIndex={0}
                      aria-label={`${isl}, ${n} ${n === 1 ? "project" : "projects"}`} aria-pressed={on}
                      onClick={() => set({ island: on ? "" : isl })} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); set({ island: on ? "" : isl }) } }} />
                  </g>
                )
              })}
              <text x={MAP_W - 16} y={MAP_H - 16} textAnchor="end" className="mono map-coord" fontSize={16} fill="#5E6268">27°N to 21°N, 79°W to 73°W</text>
            </svg>
            <figcaption className="px-3 py-2 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] mono">
              {(byIsland["Across the islands"]?.length ?? 0)} more across the islands, location not listed
            </figcaption>
          </figure>
          <ul className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 lg:hidden" aria-label="Islands">
            {ISLANDS_ON_MAP.map(isl => (
              <li key={isl}><button type="button" aria-pressed={sel.island === isl} onClick={() => set({ island: sel.island === isl ? "" : isl })}
                className={`w-full min-h-[44px] flex justify-between items-center border-b border-[var(--color-line)] text-sm ${sel.island === isl ? "text-[var(--color-petrol)] font-medium" : ""}`}>
                {isl}<span className="mono">{byIsland[isl]?.length ?? 0}</span></button></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 min-w-0 order-1 lg:order-2">
          <h1 id="h1" className="text-[clamp(2.1rem,1.2rem+2.2vw,3.5rem)] max-w-[16ch]">{PROJECTS.length} projects across The Bahamas. Which island is yours?</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)] max-w-[48ch]">Bahamas Hot Mix: roads, runways, ports and water works, from three offices. Every project from bhmgroup.com, counted where it was built.</p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 min-w-0 order-3">
          <div className="border-t-2 border-[var(--color-ink)] pt-4" aria-live="polite">
            {sel.island ? (
              <>
                <p className="flex items-baseline justify-between gap-4"><span className="font-[family-name:var(--font-display)] text-[1.375rem] tracking-[-0.02em]">{sel.island}</span><span className="mono text-sm text-[var(--color-muted)]">{here.length} {sel.cat === "All" ? "projects" : (SHORT[sel.cat] ?? sel.cat).toLowerCase()}</span></p>
                {here.length ? (
                  <div className="mt-3 grid grid-cols-[minmax(0,1fr)_140px] gap-4 items-start">
                    <ol className="max-h-[188px] overflow-y-auto pr-1 text-sm">
                      {here.map(p => <li key={p.url + p.name}><a href={p.url} className="flex min-h-[36px] items-center border-b border-[var(--color-line)] hover:text-[var(--color-petrol)]">{p.name}</a></li>)}
                    </ol>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img key={here[0].thumb} src={here[0].thumb} width={400} height={284} alt="" loading="lazy" className="photo !h-auto aspect-[400/284] bg-[var(--color-salt-2)]"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} />
                    </AnimatePresence>
                  </div>
                ) : (
                  <p className="mt-3 text-sm">No {(SHORT[sel.cat as Cat] ?? sel.cat).toLowerCase()} projects listed on {sel.island}. <button type="button" className="link" onClick={() => set({ cat: "All" })}>See all {sel.island} work</button></p>
                )}
              </>
            ) : (
              <p className="text-sm text-[var(--color-muted)]">Tap an island to see what BHM built there. Most work: {top.map((t, i) => <span key={t}><button type="button" className="link text-[var(--color-ink)] min-h-[44px]" onClick={() => set({ island: t })}>{t}</button>{i < top.length - 1 ? ", " : "."}</span>)}</p>
            )}
          </div>

          <form className="mt-6 bg-[var(--color-white)] border border-[var(--color-line)] rounded-[var(--r)] p-5" onSubmit={e => e.preventDefault()} aria-label="Quote router">
            <p className="font-[family-name:var(--font-display)] text-lg tracking-[-0.02em]">Request a quote</p>
            <label className="mt-3 grid gap-1 text-sm text-[var(--color-muted)]">What do you need?
              <select value={sel.work} onChange={e => set({ work: e.target.value })} className="min-h-[48px] bg-transparent border-b border-[var(--color-line)] text-base text-[var(--color-ink)]">
                <option value="">Choose the work</option>{WORK.map(w => <option key={w}>{w}</option>)}
              </select></label>
            <label className="mt-3 grid gap-1 text-sm text-[var(--color-muted)]">On which island?
              <select value={sel.island} onChange={e => set({ island: e.target.value })} className="min-h-[48px] bg-transparent border-b border-[var(--color-line)] text-base text-[var(--color-ink)]">
                <option value="">Choose the island</option>{ROUTER_ISLANDS.map(w => <option key={w}>{w}</option>)}
              </select></label>
            <p className="mt-4 text-sm min-h-[2.8em]">{sel.island ? <>Handled by the <b className="font-medium">{office.town} office</b>, {office.line}. <a className="mono link" href={`tel:${TEL}`}>{PHONE}</a></> : <span className="text-[var(--color-muted)]">Pick the island and we route you to Nassau, Freeport or Marsh Harbour.</span>}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href={mailto} className="btn">Request a quote</a>
              <a href="#quote" className="link text-sm">Add scope and contact details</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
