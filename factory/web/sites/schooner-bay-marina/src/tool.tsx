import { useEffect, useRef } from "react"
import { animate, motion, AnimatePresence, useInView, useReducedMotion } from "motion/react"
import { CHART } from "./chart-data"
import { LIMIT, HM_TEL, HM, EMAIL } from "./site"

export type Trip = { loa: number; draft: number; nights: number; date: string; fuel: "" | "Diesel" | "Gas"; power: "" | "30 amp" | "50 amp" }
export const START: Trip = { loa: 48, draft: 5, nights: 3, date: "", fuel: "", power: "" }
const ease = [0.16, 1, 0.3, 1] as const

export function verdict(t: Trip) {
  const fitsL = t.loa <= LIMIT.loa, fitsD = t.draft <= LIMIT.draft
  const ok = fitsL && fitsD
  const tight = ok && (t.loa > 74 || t.draft > 7)
  return { ok, tight, fitsL, fitsD, est: t.loa * LIMIT.rate * t.nights }
}
export function slipMail(t: Trip, extra = "") {
  const v = verdict(t)
  const body = `Hello Harbour Master,\n\nI would like a slip at Schooner Bay.\n\nVessel name:\nLength overall: ${t.loa} ft\nDraft: ${t.draft} ft\nArriving: ${t.date || "to confirm"}\nNights: ${t.nights}\nPower: ${t.power || "none"}\nFuel: ${t.fuel || "none"}\n${v.ok ? `Estimate from the site: $${v.est.toLocaleString("en-US")} at the daily rate, before power and fuel\n` : ""}${extra}\nName:\nPhone or email:\n`
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`Slip request: ${t.loa} ft${t.date ? ", " + t.date : ""}`)}&body=${encodeURIComponent(body)}`
}
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US")

/** A number that tweens to its new value with tabular figures (no layout shift). */
function Num({ value, format = (n: number) => String(Math.round(n)) }: { value: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (reduce) { el.textContent = format(value); prev.current = value; return }
    const c = animate(prev.current, value, { duration: 0.45, ease, onUpdate: v => { el.textContent = format(v) } })
    prev.current = value
    return () => c.stop()
  }, [value])
  return <span ref={ref} className="tnum">{format(value)}</span>
}

function Stepper({ label, value, min, max, step = 1, unit, onChange, limit, limitLabel, fmt = (n: number) => String(n) }: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (n: number) => void; limit: number; limitLabel: string; fmt?: (n: number) => string }) {
  const at = (limit - min) / (max - min)
  return (
    <label className="dial">
      <span className="lab">{label}</span>
      <span className="dial-v"><Num value={value} format={fmt} /><small> {unit}</small></span>
      <span className="rng">
        <input className="range" type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} aria-label={`${label} in ${unit}`} />
        <span className={`limit ${value > limit ? "over" : ""}`} style={{ left: `calc(11px + ${at} * (100% - 22px))` }} aria-hidden="true"><i />{limitLabel}</span>
      </span>
    </label>
  )
}

export function Tool({ t, set, onRequest }: { t: Trip; set: (p: Partial<Trip>) => void; onRequest: () => void }) {
  void onRequest
  const v = verdict(t)
  const weekly = t.nights >= 7
  const line = !v.ok
    ? `${!v.fitsL ? "Longer than 80 ft. " : ""}${!v.fitsD ? "Deeper than 8 ft at mean low water. " : ""}Talk to the Harbour Master before you plan the stop.`
    : `${t.loa} ft, ${t.draft} ft draft, ${t.nights} night${t.nights > 1 ? "s" : ""}${weekly ? ". Weekly and monthly dockage is quoted by the marina." : ", before power and fuel."}`
  return (
    <div className="tool" role="group" aria-label="Can I come in?">
      <div className="dials">
        <Stepper label="Length overall" value={t.loa} min={20} max={110} unit="ft" limit={80} limitLabel="80" onChange={loa => set({ loa })} />
        <Stepper label="Draft" value={t.draft} min={2} max={12} step={0.5} unit="ft" limit={8} limitLabel="8 MLW" fmt={n => n.toFixed(1)} onChange={draft => set({ draft })} />
      </div>
      <p className="caveat">Published limits: 80 ft, 8 ft at mean low water. Plan with the tide.</p>
      <div className="row2">
        <div className="nights">
          <span className="lab">Nights</span>
          <div className="step">
            <button type="button" onClick={() => set({ nights: Math.max(1, t.nights - 1) })} aria-label="One night fewer">−</button>
            <span className="tnum" aria-live="polite">{t.nights}</span>
            <button type="button" onClick={() => set({ nights: Math.min(30, t.nights + 1) })} aria-label="One night more">+</button>
          </div>
        </div>
        <label className="date"><span className="lab">Arriving</span><input type="date" value={t.date} onChange={e => set({ date: e.target.value })} /></label>
      </div>
      <div className="chips" role="group" aria-label="Fuel and power">
        {(["Diesel", "Gas"] as const).map(f => <button key={f} type="button" aria-pressed={t.fuel === f} onClick={() => set({ fuel: t.fuel === f ? "" : f })}>{f}</button>)}
        {(["30 amp", "50 amp"] as const).map(p => <button key={p} type="button" aria-pressed={t.power === p} onClick={() => set({ power: t.power === p ? "" : p })}>{p}</button>)}
      </div>
      <div className="verdict" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${v.ok}-${v.tight}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25, ease }}>
            <p className={`verdict-h ${v.ok ? "is-ok" : "is-no"}`}><span aria-hidden="true">{v.ok ? "✓" : "✕"}</span> {!v.ok ? "Outside the published limits." : v.tight ? "Inside the limits, close to the edge." : "Inside the published limits."}</p>
          </motion.div>
        </AnimatePresence>
        <p className="verdict-l">{line}</p>
      </div>
      <div className="act">
        {v.ok && <p className="est"><Num value={v.est} format={money} /><small>{weekly ? " at the daily rate" : ""}</small></p>}
        <div className="act-b">
          {v.ok
            ? <a className="btn btn-harbour" href={slipMail(t)}>Request a slip</a>
            : <a className="btn btn-harbour" href={HM_TEL}>Call the Harbour Master</a>}
          <a className="btn btn-line tnum" href={HM_TEL}>Call {HM}</a>
        </div>
      </div>
    </div>
  )
}

const LABELS: [keyof typeof CHART.places, string, number, number, "start" | "end" | "middle"][] = [
  ["marsh", "Marsh Harbour", 12, 4, "start"], ["harbour", "Schooner Bay", 14, 5, "start"], ["hole", "Hole in the Wall", 12, 5, "start"],
  ["sandy", "Sandy Point, MYAS", 10, 4, "start"], ["nassau", "Nassau", 12, 5, "start"],
]

/** The chart: south-east Abaco to Nassau. crop = the screen 1 detail around the harbour. */
export function Chart({ crop = false, pulse = 0 }: { crop?: boolean; pulse?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const seen = useInView(ref, { once: true, margin: "-15% 0px" })
  const reduce = useReducedMotion()
  const [hx, hy] = CHART.places.harbour
  const vb = crop ? `${hx - 150} ${hy - 200} 300 412` : `0 0 ${CHART.w} ${CHART.h}`
  const pts = (r: number[][]) => r.map(p => p.join(",")).join(" ")
  const draw = reduce ? { pathLength: 1 } : { pathLength: seen ? 1 : 0 }
  return (
    <svg ref={ref} viewBox={vb} className={`chart ${crop ? "crop" : ""}`} role="img" aria-label="Chart of south-east Great Abaco: Schooner Bay harbour, Hole in the Wall to the south, and the route from Marsh Harbour to Nassau. Simplified, not for navigation.">
      <rect x="-200" y="-200" width={CHART.w + 400} height={CHART.h + 400} fill="var(--color-bank)" />
      <path d={CHART.land} fill="var(--color-land)" stroke="var(--color-ink)" strokeWidth={crop ? 0.8 : 0.7} strokeLinejoin="round" />
      <motion.polyline points={pts(CHART.route)} fill="none" stroke="var(--color-brass)" strokeWidth={crop ? 2 : 1.8} strokeDasharray="0" initial={false} animate={draw} transition={{ duration: 1.1, ease }} />
      <motion.polyline points={pts(CHART.route2)} fill="none" stroke="var(--color-brass)" strokeWidth={crop ? 2 : 1.8} initial={false} animate={draw} transition={{ duration: 1.3, delay: reduce ? 0 : 1, ease }} />
      {LABELS.map(([k, name, dx, dy, a]) => {
        const [x, y] = CHART.places[k]; const main = k === "harbour"
        return (
          <g key={k}>
            {main && <motion.circle key={pulse} cx={x} cy={y} r={14} fill="none" stroke="var(--color-harbour)" initial={{ opacity: reduce ? 0 : 0.9, scale: 0.4 }} animate={{ opacity: 0, scale: 1.6 }} transition={{ duration: 1.2, ease }} style={{ transformOrigin: `${x}px ${y}px` }} />}
            <circle cx={x} cy={y} r={main ? 5 : 3.2} fill={main ? "var(--color-harbour)" : "var(--color-ink)"} />
            <text x={x + dx} y={y + dy} textAnchor={a} className={`cl ${main ? "main" : ""}`}>{name}</text>
          </g>
        )
      })}
    </svg>
  )
}
