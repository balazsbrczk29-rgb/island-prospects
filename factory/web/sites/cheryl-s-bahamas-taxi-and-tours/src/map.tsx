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
  { t: "Atlantic Ocean", at: [25.128, -77.47], it: true },
]

function fit(pts: [number, number][], aspect: number, min = 150): VB {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  pts.forEach(([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y) })
  let w = Math.max(min, x1 - x0) * (aspect < 1.2 ? 1.28 : 1.3), h = Math.max(min / aspect, y1 - y0) * 1.45
  if (w / h > aspect) h = w / aspect; else w = h * aspect
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + h * 0.02
  return { x: cx - w / 2, y: cy - h / 2, w, h }
}

export function TourMap({ start, stops, legs, focus, onPick, hover }: {
  start: { at: [number, number]; label: string }; stops: Stop[]; legs: Leg[]; focus: string | null; hover: string | null; onPick: (id: string) => void
}) {
  const box = useRef<HTMLDivElement>(null)
  const [aspect, setAspect] = useState(2)
  const [px, setPx] = useState(900)
  const [vb, setVb] = useState<VB>({ x: 40, y: 40, w: 920, h: 460 })
  const cur = useRef(vb)
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(([e]) => { const r = e.contentRect; if (r.width && r.height) { setAspect(r.width / r.height); setPx(r.width) } })
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
    return fit(pts, aspect, aspect < 1.2 ? 80 : 170)
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

  const k = vb.w / px // map units per screen pixel: marks keep their size at any zoom
  const sel = new Map(stops.map((s, i) => [s.id, i + 1]))
  const sp = project(start.at[0], start.at[1])
  /* place labels so they do not sit on top of each other */
  const labels = new Map<string, [number, number, "start" | "end"]>()
  const placeOk = new Set<string>()
  {
    const boxes: [number, number, number, number][] = []
    const want: { id: string; t: string; x: number; y: number }[] = [{ id: "__start", t: start.label, x: sp[0], y: sp[1] }]
    STOPS.forEach(s => { if (sel.has(s.id) || focus === s.id || hover === s.id) { const [x, y] = project(s.at[0], s.at[1]); want.push({ id: s.id, t: s.short, x, y }) } })
    STOPS.forEach(s => { const [x, y] = project(s.at[0], s.at[1]); boxes.push([x - 6 * k, y - 6 * k, x + 6 * k, y + 6 * k]) })
    const hit = (b: [number, number, number, number]) => boxes.some(o => !(b[2] < o[0] || b[0] > o[2] || b[3] < o[1] || b[1] > o[3]))
    for (const w of want) {
      const tw = w.t.length * 7.4 * k, th = 13 * k
      const cands: [number, number, "start" | "end"][] = [[13 * k, -9 * k, "start"], [13 * k, 15 * k, "start"], [-13 * k, -9 * k, "end"], [-13 * k, 15 * k, "end"], [-tw / 2, -16 * k, "start"], [-tw / 2, 26 * k, "start"]]
      let pick = cands[0]
      for (const c of cands) {
        const x0 = c[2] === "end" ? w.x + c[0] - tw : w.x + c[0], y1 = w.y + c[1]
        const b: [number, number, number, number] = [x0, y1 - th, x0 + tw, y1 + 2 * k]
        if (!hit(b)) { pick = c; break }
      }
      const x0 = pick[2] === "end" ? w.x + pick[0] - tw : w.x + pick[0], y1 = w.y + pick[1]
      boxes.push([x0, y1 - th, x0 + tw, y1 + 2 * k])
      labels.set(w.id, pick)
    }
    /* place names only where they do not collide with the day */
    PLACES.forEach(p => {
      const [x, y] = project(p.at[0], p.at[1]); const tw = p.t.length * (p.big ? 11 : 7) * k, th = 12 * k
      const b: [number, number, number, number] = [x - tw / 2, y - th, x + tw / 2, y + 2 * k]
      if (p.big || !hit(b)) { placeOk.add(p.t); boxes.push(b) }
    })
  }
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

        {PLACES.filter(p => p.t !== start.label && placeOk.has(p.t)).map(p => { const [x, y] = project(p.at[0], p.at[1]); return (
          <text key={p.t} x={x} y={y} textAnchor="middle" fontSize={(p.big ? 14 : 12) * k} letterSpacing={p.big ? 5 * k : 0}
            className={p.big ? "map-big" : p.it ? "map-sea" : "map-label"}>{p.big ? p.t.toUpperCase() : p.t}</text>
        ) })}

        {/* the route */}
        {legs.map(l => (
          <g key={l.key}>
            {l.mode === "road" && <motion.path d={arc(l.a, l.b)} fill="none" stroke="var(--color-yellow)" strokeWidth={8 * k} strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} />}
            <motion.path d={arc(l.a, l.b)} fill="none" stroke={l.mode === "road" ? "var(--color-navy)" : "#2f6f8f"} strokeWidth={(l.mode === "road" ? 3 : 2) * k} strokeLinecap="round"
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
              <circle r={16 * k} fill="transparent" />
              {f && <circle r={(n ? 15 : 10) * k} fill="none" stroke="var(--color-navy)" strokeWidth={1.4 * k} className="pin-pulse" />}
              {n ? <>
                <circle r={11 * k} fill="var(--color-navy)" stroke="#fff" strokeWidth={1.6 * k} />
                <text y={3.9 * k} textAnchor="middle" fontSize={11 * k} className="map-num">{n}</text>
              </> : <circle r={(f ? 5.5 : 4) * k} fill="#fff" stroke="var(--color-navy)" strokeWidth={1.6 * k} />}
              {labels.has(s.id) && <text x={labels.get(s.id)![0]} y={labels.get(s.id)![1]} textAnchor={labels.get(s.id)![2]} fontSize={13 * k} className="map-stop" paintOrder="stroke">{s.short}</text>}
            </g>
          )
        })}

        {/* start and finish */}
        <g transform={`translate(${sp[0]} ${sp[1]})`}>
          <rect x={-7 * k} y={-7 * k} width={14 * k} height={14 * k} rx={3 * k} transform="rotate(45)" fill="var(--color-yellow)" stroke="var(--color-navy)" strokeWidth={1.8 * k} />
          <text x={labels.get("__start")![0]} y={labels.get("__start")![1]} textAnchor={labels.get("__start")![2]} fontSize={13 * k} className="map-stop" paintOrder="stroke">{start.label}</text>
        </g>
      </svg>

      {stops.some(s => s.far) && (
        <p className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-bold text-navy shadow-sm">Exuma trips leave the map: by boat or plane</p>
      )}
      <p className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-ink/70">Positions approximate. Coastline: geoBoundaries, CC BY 4.0</p>
    </div>
  )
}
