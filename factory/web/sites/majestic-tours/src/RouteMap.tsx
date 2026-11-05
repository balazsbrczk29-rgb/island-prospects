import { motion } from "motion/react"
import type { Place } from "./tours"
import { PLACES } from "./tours"

// Illustration, not to scale. Relative positions only, never for navigation.
const ORIGIN = { x: 318, y: 318 }
const DEST: Record<Place, { x: number; y: number; route: string; lx: number; ly: number; anchor?: "start" | "end" | "middle" }> = {
  harbour: { x: 318, y: 318, route: "", lx: 300, ly: 292, anchor: "end" },
  rose: { x: 470, y: 278, route: "M318 318 C 370 300, 420 284, 470 278", lx: 486, ly: 270, anchor: "start" },
  lagoon: { x: 392, y: 236, route: "M318 318 C 336 284, 360 252, 392 236", lx: 404, ly: 224, anchor: "start" },
  exuma: { x: 640, y: 512, route: "M318 318 C 430 350, 560 410, 640 512", lx: 640, ly: 548, anchor: "middle" },
  harbourisland: { x: 712, y: 150, route: "M318 318 C 430 250, 600 170, 712 150", lx: 698, ly: 134, anchor: "end" },
  reefs: { x: 150, y: 392, route: "M318 318 C 290 380, 210 410, 150 392", lx: 140, ly: 424, anchor: "middle" },
  land: { x: 236, y: 344, route: "", lx: 236, ly: 372, anchor: "middle" },
}

export default function RouteMap({ active, onPick, draw = true, compact = false }: { active?: Place | null; onPick?: (p: Place) => void; draw?: boolean; compact?: boolean }) {
  const places = Object.keys(DEST) as Place[]
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label="Illustrated chart of New Providence and the islands Majestic Tours visits: Rose Island, Blue Lagoon Island, the Exuma Cays, Harbour Island and the southwest reefs. Not to scale.">
      <defs>
        <pattern id="mt-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1b2724" strokeOpacity=".06" strokeWidth="1" /></pattern>
        <radialGradient id="mt-shoal" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#bfe5dc" /><stop offset="1" stopColor="#bfe5dc" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="800" height="600" fill="#d5ece6" />
      <rect width="800" height="600" fill="url(#mt-grid)" />
      {/* shallow banks */}
      <ellipse cx="270" cy="345" rx="190" ry="90" fill="url(#mt-shoal)" />
      <ellipse cx="610" cy="470" rx="170" ry="120" fill="url(#mt-shoal)" />
      <ellipse cx="700" cy="170" rx="110" ry="80" fill="url(#mt-shoal)" />
      {/* New Providence */}
      <path d="M150 342 C 160 318, 200 308, 248 312 C 290 300, 330 306, 352 318 C 366 330, 350 352, 318 360 C 280 372, 230 378, 190 372 C 162 368, 142 360, 150 342 Z" fill="#f3eee4" stroke="#1b2724" strokeOpacity=".55" strokeWidth="1.2" />
      {/* Paradise Island */}
      <path d="M308 300 C 322 292, 350 290, 372 294 C 368 300, 340 302, 312 304 Z" fill="#f3eee4" stroke="#1b2724" strokeOpacity=".55" strokeWidth="1" />
      {/* Rose Island */}
      <path d="M440 280 C 460 270, 500 268, 528 272 C 520 280, 480 284, 444 286 Z" fill="#f3eee4" stroke="#1b2724" strokeOpacity=".5" strokeWidth="1" />
      {/* Blue Lagoon (Salt Cay) */}
      <path d="M380 238 C 388 232, 402 232, 408 236 C 402 242, 388 242, 380 238 Z" fill="#f3eee4" stroke="#1b2724" strokeOpacity=".5" strokeWidth="1" />
      {/* Exuma Cays chain */}
      {[[560, 430], [580, 452], [600, 474], [618, 494], [640, 512], [662, 534], [684, 556]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={9 - (i % 3)} ry={4} transform={`rotate(48 ${x} ${y})`} fill="#f3eee4" stroke="#1b2724" strokeOpacity=".5" strokeWidth="1" />
      ))}
      {/* Eleuthera and Harbour Island */}
      <path d="M690 160 C 720 180, 760 230, 790 300 L 800 300 L 800 210 C 780 190, 740 160, 700 150 Z" fill="#f3eee4" stroke="#1b2724" strokeOpacity=".5" strokeWidth="1" />
      <ellipse cx="712" cy="150" rx="12" ry="4" transform="rotate(20 712 150)" fill="#f3eee4" stroke="#1b2724" strokeOpacity=".6" strokeWidth="1" />
      {/* routes */}
      {places.filter(p => DEST[p].route).map((p, i) => {
        const on = active === p
        return (
          <g key={p}>
            <motion.path d={DEST[p].route} fill="none" stroke={on ? "#2e6a55" : "#1b2724"} strokeOpacity={on ? 1 : active ? 0.2 : 0.55} strokeWidth={on ? 2.4 : 1.3} strokeDasharray="5 6" strokeLinecap="round"
              initial={draw ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ delay: 0.6 + i * 0.18, duration: 1.8, ease: [0.16, 1, 0.3, 1] }} />
          </g>
        )
      })}
      {/* origin */}
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="6" fill="#2e6a55" />
      <motion.circle cx={ORIGIN.x} cy={ORIGIN.y} r="6" fill="none" stroke="#2e6a55" strokeWidth="1.5" style={{ transformBox: "fill-box", transformOrigin: "center" }} animate={{ scale: [1, 3.6], opacity: [0.8, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }} />
      <text x={ORIGIN.x + 10} y={ORIGIN.y + 24} fontFamily="Albert Sans, sans-serif" fontSize="12" letterSpacing="2" fill="#1b2724">NASSAU</text>
      {/* destinations */}
      {places.map(p => {
        const d = DEST[p]
        const on = active === p
        const label = PLACES[p].name
        const inner = (
          <>
            {p !== "harbour" && <circle cx={d.x} cy={d.y} r={on ? 8 : 5} fill={on ? "#2e6a55" : "#f3eee4"} stroke="#2e6a55" strokeWidth="2" />}
            {(!compact || p !== "land") && (
              <text x={d.lx} y={d.ly} textAnchor={d.anchor} fontFamily="Yeseva One, serif" fontSize={compact ? 17 : 19} fill={on ? "#1f4c3d" : "#1b2724"}>{label}</text>
            )}
          </>
        )
        if (!onPick) return <g key={p}>{inner}</g>
        return (
          <g key={p} role="button" tabIndex={0} aria-label={`Show trips to ${label}`} aria-pressed={on} className="cursor-pointer outline-none" onClick={() => onPick(p)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(p) } }}>
            <circle cx={d.x} cy={d.y} r="28" fill="transparent" />
            {inner}
          </g>
        )
      })}
      {/* compass + scale note */}
      <g transform="translate(726 520)" fill="none" stroke="#1b2724" strokeOpacity=".6">
        <circle r="26" /><path d="M0 -22 L5 0 L0 22 L-5 0 Z" fill="#1b2724" fillOpacity=".7" stroke="none" />
      </g>
      <text x="726" y="486" textAnchor="middle" fontFamily="Albert Sans, sans-serif" fontSize="11" letterSpacing="2" fill="#1b2724">N</text>
      <text x="24" y="34" fontFamily="Albert Sans, sans-serif" fontSize="11" letterSpacing="1.5" fill="#1b2724" fillOpacity=".7">ILLUSTRATION, NOT TO SCALE · EXUMA CAYS 38 NM BY POWERBOAT</text>
    </svg>
  )
}
