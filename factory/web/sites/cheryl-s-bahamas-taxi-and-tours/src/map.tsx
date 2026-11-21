import { useEffect, useMemo, useRef, useState } from "react"
import { animate, motion } from "motion/react"
import { LAND, VB_W, VB_H, project } from "./island"
import { STOPS, DOCK, type Stop } from "./stops"
import { arc, type Leg } from "./route"

type VB = { x: number; y: number; w: number; h: number }

const PLACES: { t: string; at: [number, number]; big?: boolean; it?: boolean }[] = [
  { t: "New Providence", at: [25.028, -77.43], big: true },
  { t: "Nassau", at: [25.067, -77.344] },
  { t: "Paradise Island", at: [25.091, -77.333] },
  { t: "Cable Beach", at: [25.068, -77.414] },
  { t: "Rose Island", at: [25.106, -77.2] },
  { t: "airport", at: [25.033, -77.466] },
  { t: "Atlantic", at: [25.13, -77.52], it: true },
]

function fit(pts: [number, number][], aspect: number, min = 150): VB {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  pts.forEach(([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y) })
  let w = Math.max(min, x1 - x0) * 1.3, h = Math.max(min / aspect, y1 - y0) * 1.45
  if (w / h > aspect) h = w / aspect; else w = h * aspect
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + h * 0.02
  return { x: cx - w / 2, y: cy - h / 2, w, h }
}

export function TourMap({ start, stops, legs, focus, onPick, hover }: {
  start: { at: [number, number]; label: string }; stops: Stop[]; legs: Leg[]; focus: string | null; hover: string | null; onPick: (id: string) => void
}) {
  const box = useRef<HTMLDivElement>(null)
  const [aspect, setAspect] = useState(2)
  const [vb, setVb] = useState<VB>({ x: 40, y: 40, w: 920, h: 460 })
  const cur = useRef(vb)
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(([e]) => { const r = e.contentRect; if (r.width && r.height) setAspect(r.width / r.height) })
    ro.observe(el); return () => ro.disconnect()
  }, [])

  const target = useMemo(() => {
    const s = project(start.at[0], start.at[1])
    if (!stops.length) {
      const all = STOPS.filter(x => !x.far && x.id !== "rose").map(x => project(x.at[0], x.at[1]))
      return fit([s, ...all, project(25.0, -77.56)], aspect, 300)
    }
    const pts: [number, number][] = [s, ...stops.map(x => project(x.at[0], x.at[1]))]
    if (stops.some(x => x.sea)) pts.push(project(DOCK[0], DOCK[1]))
    return fit(pts, aspect, aspect < 1.2 ? 120 : 170)
  }, [start, stops, aspect])

  useEffect(() => {
    const from = { ...cur.current }
    if (reduce) { cur.current = target; setVb(target); return }
    const c = animate(0, 1, {
      duration: 0.9, ease: [0.22, 1, 0.36, 1],
      onUpdate: t => { const v = { x: from.x + (target.x - from.x) * t, y: from.y + (target.y - from.y) * t, w: from.w + (target.w - from.w) * t, h: from.h + (target.h - from.h) * t }; cur.current = v; setVb(v) },
    })
    return () => c.stop()
  }, [target, reduce])

  const k = vb.w / 1000 // screen-constant sizing
  const sel = new Map(stops.map((s, i) => [s.id, i + 1]))
  const sp = project(start.at[0], start.at[1])
  const full = legs.map(l => arc(l.a, l.b)).join(" ").replace(/ M[^Q]+/g, m => " L" + m.slice(2))
  const roadKm = legs.reduce((a, l) => a + l.km, 0)

  return (
    <div ref={box} className="relative h-full w-full overflow-hidden bg-sea">
      <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} className="absolute inset-0 h-full w-full" role="img"
        aria-label={stops.length ? `Map of New Providence with your route: ${stops.map(s => s.short).join(", ")}, about ${Math.round(roadKm)} km by road` : "Map of New Providence with Cheryl's tour stops"}>
        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={4} /></filter>
        </defs>
        <rect x={-500} y={-500} width={VB_W + 1000} height={VB_H + 1000} fill="var(--color-sea)" />
        {/* shallows: a pale band hugging every coast, as from the air */}
        <path d={LAND} fill="var(--color-shallow)" stroke="var(--color-shallow)" strokeWidth={14} strokeLinejoin="round" filter="url(#soft)" />
        <path d={LAND} fill="var(--color-shallow)" stroke="var(--color-shallow-2)" strokeWidth={5} strokeLinejoin="round" />
        <path d={LAND} fill="var(--color-sand)" stroke="var(--color-coast)" strokeWidth={0.8 * k} strokeLinejoin="round" />

        {PLACES.map(p => { const [x, y] = project(p.at[0], p.at[1]); return (
          <text key={p.t} x={x} y={y} textAnchor="middle" fontSize={(p.big ? 15 : 10.5) * k} letterSpacing={p.big ? 4 * k : 0}
            className={p.big ? "map-big" : p.it ? "map-sea" : "map-label"}>{p.big ? p.t.toUpperCase() : p.t}</text>
        ) })}

        {/* the route */}
        {legs.map(l => (
          <g key={l.key}>
            {l.mode === "road" && <motion.path d={arc(l.a, l.b)} fill="none" stroke="var(--color-yellow)" strokeWidth={7 * k} strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} />}
            <motion.path d={arc(l.a, l.b)} fill="none" stroke="var(--color-navy)" strokeWidth={(l.mode === "road" ? 2.6 : 1.8) * k} strokeLinecap="round"
              strokeDasharray={l.mode === "sea" ? `${5 * k} ${4 * k}` : undefined}
              initial={{ pathLength: reduce ? 1 : 0, opacity: 0.4 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
          </g>
        ))}
        {full && !reduce && (
          <g key={full}>
            <rect x={-6 * k} y={-3.6 * k} width={12 * k} height={7.2 * k} rx={2 * k} fill="var(--color-navy)" stroke="#fff" strokeWidth={1 * k} />
            <rect x={-6 * k} y={-0.8 * k} width={12 * k} height={1.6 * k} fill="var(--color-yellow)" />
            <animateMotion dur={`${Math.max(6, legs.length * 2.2)}s`} repeatCount="indefinite" rotate="auto" path={full} />
          </g>
        )}

        {/* every stop on the island */}
        {STOPS.map(s => {
          const [x, y] = project(s.at[0], s.at[1]); const n = sel.get(s.id); const f = focus === s.id || hover === s.id
          return (
            <g key={s.id} transform={`translate(${x} ${y})`} className="cursor-pointer" onClick={() => onPick(s.id)}>
              <title>{s.name}</title>
              <circle r={14 * k} fill="transparent" />
              {f && <circle r={(n ? 15 : 10) * k} fill="none" stroke="var(--color-navy)" strokeWidth={1.4 * k} className="pin-pulse" />}
              {n ? <>
                <circle r={9.5 * k} fill="var(--color-navy)" stroke="#fff" strokeWidth={1.6 * k} />
                <text y={3.6 * k} textAnchor="middle" fontSize={10 * k} className="map-num">{n}</text>
              </> : <circle r={(f ? 5.5 : 4) * k} fill="#fff" stroke="var(--color-navy)" strokeWidth={1.6 * k} />}
              {(n || f) && <text x={13 * k} y={-10 * k} fontSize={10.5 * k} className="map-stop" paintOrder="stroke">{s.short}</text>}
            </g>
          )
        })}

        {/* start and finish */}
        <g transform={`translate(${sp[0]} ${sp[1]})`}>
          <rect x={-7 * k} y={-7 * k} width={14 * k} height={14 * k} rx={3 * k} transform="rotate(45)" fill="var(--color-yellow)" stroke="var(--color-navy)" strokeWidth={1.8 * k} />
          <text x={12 * k} y={14 * k} fontSize={10.5 * k} className="map-stop" paintOrder="stroke">{start.label}</text>
        </g>
      </svg>

      {stops.some(s => s.far) && (
        <p className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-bold text-navy shadow-sm">Exuma trips leave the map: by boat or plane</p>
      )}
      <p className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-ink/70">Positions approximate. Coastline: geoBoundaries, CC BY 4.0</p>
    </div>
  )
}
