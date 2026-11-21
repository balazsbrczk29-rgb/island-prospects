import { motion } from "motion/react"
import { MAP } from "./map-data"
import { COSTS, ORIGINS, longDate, wayFor, type Origin } from "./facts"
import { usePlan } from "./site"

type Pt = readonly [number, number]
function arc(a: Pt, b: Pt, bend = 0.22) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2
  const dx = b[0] - a[0], dy = b[1] - a[1]
  return `M${a[0]} ${a[1]} Q${mx + dy * bend} ${my - dx * bend} ${b[0]} ${b[1]}`
}
const { fxe, nas, atc, inn } = MAP.P
const LEGS: Record<Origin, { d: string; label: string }[]> = {
  florida: [{ d: arc(fxe, atc, 0.16), label: "Makers Air, direct" }],
  nassau: [{ d: arc(nas, atc), label: "Western Air" }],
  northamerica: [{ d: arc([0, 30], nas, 0.18), label: "Your flight to Nassau" }, { d: arc(nas, atc), label: "Western Air" }],
  europe: [{ d: arc([0, 5], nas, 0.12), label: "Your flight to Nassau" }, { d: arc(nas, atc), label: "Western Air" }],
}
const draw = { hidden: { pathLength: 0, opacity: 0 }, show: (i: number) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: 0.15 + i * 0.75, duration: 0.9, ease: [0.45, 0, 0.2, 1] }, opacity: { delay: 0.15 + i * 0.75, duration: 0.01 } } }) }

/** The getting-here map: real coastlines (Natural Earth), the route for where you start, drawn leg by leg. */
export default function RouteMap() {
  const { origin, arrive, set } = usePlan()
  const way = wayFor(arrive, origin)
  return (
    <div className="route">
      <div className="route__map">
        <svg viewBox={`0 0 ${MAP.W} ${MAP.H}`} role="img" aria-label={`Map of the northern Bahamas showing the route from ${ORIGINS.find(o => o.id === origin)!.label} to Arthur's Town Airport on Cat Island, 3.5 miles from Orange Creek Inn`}>
          <rect width={MAP.W} height={MAP.H} className="route__sea" />
          <path d={MAP.d} className="route__land" />
          <motion.g key={origin} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {LEGS[origin].map((l, i) => (
              <motion.path key={i} d={l.d} className="route__leg" variants={draw} custom={i} />
            ))}
          </motion.g>
          <g className="route__pts">
            <circle cx={fxe[0]} cy={fxe[1]} r="5" /><text x={fxe[0] + 12} y={fxe[1] + 5}>Fort Lauderdale FXE</text>
            <circle cx={nas[0]} cy={nas[1]} r="5" /><text x={nas[0] - 8} y={nas[1] + 34} textAnchor="middle">Nassau</text>
            <circle cx={atc[0]} cy={atc[1]} r="5" />
            <circle cx={inn[0]} cy={inn[1]} r="11" className="route__pulse" />
            <circle cx={inn[0]} cy={inn[1]} r="11" className="route__inn" />
            <text x={inn[0] - 18} y={inn[1] - 16} textAnchor="end" className="route__here">Orange Creek Inn</text>
            <text x={atc[0] + 18} y={atc[1] + 34} className="route__small">Cat Island</text>
          </g>
        </svg>
      </div>
      <div className="route__side">
        <div className="seg" role="radiogroup" aria-label="Where you start">
          {ORIGINS.map(o => (
            <button key={o.id} type="button" role="radio" aria-checked={origin === o.id} onClick={() => set({ origin: o.id })}>{o.label}</button>
          ))}
        </div>
        <ol className="legs" aria-live="polite">
          <li><span className="legs__k">{longDate(arrive)}</span><p>{way.air}: <strong className="num">{way.times}</strong>. {way.note}</p></li>
          <li><span className="legs__k num">3.5 miles</span><p>Arthur&rsquo;s Town Airport to the inn. We collect you, or a taxi is about $15. A rental car can be waiting at the airport.</p></li>
          <li><span className="legs__k num">2:00 pm</span><p>Check-in. Your studio has its own kitchenette, and the grocery store is on site.</p></li>
        </ol>
        <ul className="costs">
          {COSTS.map(([w, p]) => <li key={w}><span>{w}</span><span className="num">{p}</span></li>)}
        </ul>
      </div>
    </div>
  )
}
