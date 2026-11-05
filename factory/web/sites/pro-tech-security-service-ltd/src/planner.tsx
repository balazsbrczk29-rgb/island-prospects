import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Phone } from "lucide-react"
import { C, ease } from "./site"

type Kind = "Home" | "Shop" | "Office"
// Entry points on a generic single-storey plan. Labels change with the property type.
const POINTS: { id: string; x: number; y: number; rot: number; label: Record<Kind, string> }[] = [
  { id: "front", x: 250, y: 352, rot: -90, label: { Home: "Front door", Shop: "Shop front", Office: "Main entrance" } },
  { id: "back", x: 120, y: 48, rot: 90, label: { Home: "Back door", Shop: "Rear door", Office: "Rear exit" } },
  { id: "win1", x: 40, y: 250, rot: 0, label: { Home: "Living room windows", Shop: "Display window", Office: "Reception windows" } },
  { id: "win2", x: 460, y: 120, rot: 180, label: { Home: "Bedroom windows", Shop: "Side windows", Office: "Office windows" } },
  { id: "garage", x: 400, y: 352, rot: -90, label: { Home: "Garage", Shop: "Loading door", Office: "Server or file room" } },
  { id: "safe", x: 330, y: 200, rot: 135, label: { Home: "Hallway motion", Shop: "Till and stockroom", Office: "Corridor motion" } },
]

export function Planner({ compact = false }: { compact?: boolean }) {
  const [kind, setKind] = useState<Kind>("Home")
  const [on, setOn] = useState<string[]>(["front", "safe"])
  const [area, setArea] = useState("")
  const [name, setName] = useState("")
  const toggle = (id: string) => setOn(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const chosen = POINTS.filter(p => on.includes(p.id)).map(p => p.label[kind])
  const summary = [name && `Name: ${name}`, `Property: ${kind.toLowerCase()}${area ? ` in ${area}` : ""}`, chosen.length ? `Cover: ${chosen.join(", ")}` : null].filter(Boolean).join(" · ")
  return (
    <div className={`grid gap-8 ${compact ? "lg:grid-cols-[1.3fr_1fr]" : "lg:grid-cols-[1.35fr_1fr]"}`}>
      <div className="blueprint relative overflow-hidden rounded-xl bg-night p-4 md:p-6">
        <div className="mb-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Property type">
          {(["Home", "Shop", "Office"] as Kind[]).map(k => (
            <button key={k} role="radio" aria-checked={kind === k} onClick={() => setKind(k)} className={`min-h-11 rounded-md px-4 text-[15px] transition ${kind === k ? "bg-signal-bright text-ink" : "border border-paper/20 text-paper/80 hover:border-paper/60"}`}>{k}</button>
          ))}
        </div>
        <svg viewBox="0 0 500 400" className="w-full" role="img" aria-label={`Plan of a ${kind.toLowerCase()} showing ${chosen.length} protected points. Illustration.`}>
          <g fill="none" stroke="#9fb3ad" strokeWidth="3" strokeLinecap="square">
            <rect x="40" y="48" width="420" height="304" />
            <path d="M200 48v130M40 178h160M300 178v174M300 178h160M200 248v104" strokeWidth="2" />
          </g>
          <g fill="#9fb3ad" fontFamily="Sora, sans-serif" fontSize="11" letterSpacing="1.5" opacity=".7">
            <text x="60" y="78">{kind === "Home" ? "KITCHEN" : kind === "Shop" ? "STOCKROOM" : "OFFICE"}</text>
            <text x="220" y="78">{kind === "Home" ? "BEDROOM" : kind === "Shop" ? "OFFICE" : "MEETING"}</text>
            <text x="60" y="208">{kind === "Home" ? "LIVING" : kind === "Shop" ? "SHOP FLOOR" : "RECEPTION"}</text>
            <text x="320" y="208">{kind === "Home" ? "HALL" : kind === "Shop" ? "TILL" : "CORRIDOR"}</text>
          </g>
          {POINTS.map(p => {
            const active = on.includes(p.id)
            return (
              <g key={p.id} transform={`translate(${p.x} ${p.y})`} className="cursor-pointer" onClick={() => toggle(p.id)} role="button" aria-pressed={active} aria-label={p.label[kind]} tabIndex={0} onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggle(p.id)}>
                <AnimatePresence>
                  {active && (
                    <motion.path key="cone" d="M0 0 L120 -46 A124 124 0 0 1 120 46 Z" transform={`rotate(${p.rot})`} fill="url(#cone)" initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.3 }} transition={{ duration: 0.6, ease }} style={{ transformOrigin: "0 0" }} />
                  )}
                </AnimatePresence>
                {active && <circle r="10" fill="none" stroke="#3fd49a" strokeWidth="2" className="ping" />}
                <circle r="14" fill="transparent" />
                <circle r="7" fill={active ? "#3fd49a" : "#0f1a24"} stroke={active ? "#3fd49a" : "#9fb3ad"} strokeWidth="2" />
              </g>
            )
          })}
          <defs><radialGradient id="cone" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(124)"><stop offset="0" stopColor="#3fd49a" stopOpacity=".55" /><stop offset="1" stopColor="#3fd49a" stopOpacity="0" /></radialGradient></defs>
        </svg>
        <p className="mt-3 text-[13px] text-paper/60">Tap a point to add or remove it. Illustration of a typical plan, not your property.</p>
      </div>
      <div className="flex flex-col rounded-xl border border-line bg-white p-6 md:p-8">
        <p className="font-display text-[12px] font-semibold tracking-[0.18em] text-signal uppercase">Your system, so far</p>
        <ul className="mt-4 min-h-[150px] space-y-2">
          <AnimatePresence initial={false}>
            {chosen.map(c => (
              <motion.li key={c} layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.3, ease }} className="flex items-center gap-3 border-b border-line pb-2 text-[16px]"><span className="size-2.5 rounded-full bg-signal" aria-hidden />{c}</motion.li>
            ))}
          </AnimatePresence>
          {!chosen.length && <li className="text-[15px] text-muted">Nothing selected yet.</li>}
        </ul>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="text-[13px] font-semibold">Your name</span><input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-1 block min-h-12 w-full rounded-md border border-line px-3 text-[16px] outline-none focus:border-signal" /></label>
          <label className="block"><span className="text-[13px] font-semibold">Area of Nassau</span><input value={area} onChange={e => setArea(e.target.value)} className="mt-1 block min-h-12 w-full rounded-md border border-line px-3 text-[16px] outline-none focus:border-signal" /></label>
        </div>
        <div className="mt-6 rounded-lg bg-paper-2 p-4 text-[15px]"><span className="font-semibold">Read this out when you call:</span> {summary}</div>
        <a href={C.tel} className="mt-5 inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-ink px-6 text-[17px] text-paper transition hover:-translate-y-0.5 hover:bg-signal"><Phone className="size-5" aria-hidden /> Call {C.phone} for a quote</a>
        <p className="mt-3 text-[13px] text-muted">From the US: {C.us}. Rates on request.</p>
      </div>
    </div>
  )
}
