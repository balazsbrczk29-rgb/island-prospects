import { motion, useReducedMotion } from "motion/react"
import { CHART } from "./chart"
import type { OKey } from "./data"

const PINS: Record<OKey, { x: number; y: number; label: string; coord: string; dx: number; dy: number; anchor: "start" | "end" }> = {
  nassau: { x: CHART.nassau[0], y: CHART.nassau[1], label: "Nassau", coord: "25.07° N  77.34° W", dx: 18, dy: -40, anchor: "start" },
  longisland: { x: CHART.saltpond[0], y: CHART.saltpond[1], label: "Salt Pond, Long Island", coord: "23.35° N  75.13° W", dx: -30, dy: 4, anchor: "end" },
}

/** Real coastlines (Natural Earth 1:10m). The chosen office pin rings once when the route arrives. */
export function Chart({ office, onPick, view = "110 110 880 760", id = "chart" }: {
  office: OKey
  onPick?: (o: OKey) => void
  view?: string
  id?: string
}) {
  const reduce = useReducedMotion()
  return (
    <svg className="chart" viewBox={view} role="img" aria-labelledby={`${id}-t`} preserveAspectRatio="xMidYMid meet">
      <title id={`${id}-t`}>Chart of the central Bahamas showing the firm's two offices, Nassau on New Providence and Salt Pond on Long Island</title>
      <path className="land" d={CHART.rest} />
      <path className="isle" data-on={office === "nassau"} d={CHART.np} />
      <path className="isle" data-on={office === "longisland"} d={CHART.li} />
      <text className="sea-label" x="640" y="400" textAnchor="middle">Exuma Sound</text>
      {(Object.keys(PINS) as OKey[]).map(k => {
        const q = PINS[k]
        const on = k === office
        return (
          <g key={k} className="pin" data-pin={k} data-on={on} transform={`translate(${q.x} ${q.y})`}
            onClick={onPick ? () => onPick(k) : undefined} style={onPick ? { cursor: "pointer" } : undefined}>
            <circle r="22" fill="transparent" />
            {on && !reduce && (
              <motion.circle key={`ring-${office}`} className="ring" r="7" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 3.2, opacity: 0 }} transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }} />
            )}
            <circle className="dot" r="6.5" />
            <text x={q.dx} y={q.dy} textAnchor={q.anchor} className="pl">{q.label}</text>
            <text x={q.dx} y={q.dy + 24} textAnchor={q.anchor} className="pc">{q.coord}</text>
          </g>
        )
      })}
    </svg>
  )
}

export const PIN_XY = (o: OKey) => [PINS[o].x, PINS[o].y] as const
