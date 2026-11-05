import { motion } from "motion/react"
import { ease } from "./site"

type LL = [number, number]
const smooth = (p: (readonly [number, number])[]) => {
  const n = p.length
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n]
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + "Z"
}
const GB: LL[] = [[26.70, -78.99], [26.66, -78.80], [26.64, -78.60], [26.61, -78.40], [26.64, -78.10], [26.74, -77.92], [26.66, -77.86], [26.56, -78.10], [26.52, -78.35], [26.50, -78.62], [26.51, -78.80], [26.57, -78.98]]

/* Crossing map: Florida to Grand Bahama */
export function Crossing({ className = "" }: { className?: string }) {
  const W = 1000, H = 560
  const P = ([la, lo]: LL) => [(lo + 80.75) / 3.1 * W, (27.25 - la) / 1.75 * H] as const
  const fl: LL[] = [[27.6, -80.33], [27.2, -80.18], [26.9, -80.07], [26.71, -80.03], [26.35, -80.07], [26.12, -80.10], [25.9, -80.12], [25.77, -80.14], [25.5, -80.33], [25.3, -80.5], [25.3, -81.2], [27.6, -81.2]]
  const flPath = "M" + fl.map(p => P(p).map(v => v.toFixed(1)).join(",")).join(" L") + " Z"
  const fp = P([26.53, -78.70]), fll = P([26.12, -80.11]), wpb = P([26.71, -80.04]), mia = P([25.77, -80.14])
  const arc = (a: readonly [number, number], b: readonly [number, number], lift: number) => `M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${(a[1] + b[1]) / 2 - lift} ${b[0]},${b[1]}`
  const scaleA = P([27.05, -80.03]), scaleB = P([27.05, -78.99])
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Illustration: Florida's east coast and Grand Bahama Island, with routes from Fort Lauderdale, West Palm Beach and Miami to Freeport. Not to scale.">
      <defs><linearGradient id="gs" x1="0" x2="1"><stop offset="0" stopColor="#cfe2ef" /><stop offset=".5" stopColor="#b5d3ea" /><stop offset="1" stopColor="#d7ebe6" /></linearGradient></defs>
      <rect width={W} height={H} fill="url(#gs)" />
      {[0.2, 0.4, 0.6, 0.8].map(f => <line key={f} x1={W * f} y1="0" x2={W * f} y2={H} stroke="#0f2233" strokeOpacity=".06" />)}
      {[0.25, 0.5, 0.75].map(f => <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="#0f2233" strokeOpacity=".06" />)}
      <text x={P([25.9, -79.7])[0]} y={P([25.9, -79.7])[1]} fontFamily="Outfit, Arial, sans-serif" fontSize="12" letterSpacing="4" fill="#134781" fillOpacity=".55">GULF STREAM</text>
      <motion.path d={flPath} fill="#e8d6ad" stroke="#0f2233" strokeOpacity=".45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      <text x={P([26.95, -80.65])[0]} y={P([26.95, -80.65])[1]} fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontSize="26" fill="#0f2233">Florida</text>
      <motion.path d={smooth(GB.map(P))} fill="#2e5b45" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: `${fp[0]}px ${fp[1]}px` }} transition={{ duration: 1.2, delay: 0.3, ease }} />
      {[[wpb, 60, "West Palm Beach", "Overnight cruise"], [fll, 40, "Fort Lauderdale", "Fast Ferry"], [mia, 90, "Miami", "Flights"]].map(([pt, lift, name, how], i) => {
        const p = pt as readonly [number, number]
        return (
          <g key={name as string}>
            <motion.path d={arc(p, fp, lift as number)} fill="none" stroke="#1b5fa8" strokeWidth="2" strokeDasharray={i === 2 ? "2 8" : "10 10"} className="route" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.2, duration: 1 }} />
            <circle cx={p[0]} cy={p[1]} r="5" fill="#0f2233" />
            <text x={p[0] + 10} y={p[1] + (i === 0 ? -10 : i === 1 ? 4 : 18)} fontFamily="Outfit, Arial, sans-serif" fontSize="13" fill="#0f2233">{name as string} <tspan fill="#52606b">· {how as string}</tspan></text>
          </g>
        )
      })}
      <circle cx={fp[0]} cy={fp[1]} r="7" fill="#f2b8c6" stroke="#0f2233" strokeWidth="2" />
      <text x={fp[0] - 10} y={fp[1] + 30} fontFamily="Playfair Display, Georgia, serif" fontSize="22" fill="#0f2233">Freeport</text>
      <text x={P([26.85, -78.55])[0]} y={P([26.85, -78.55])[1]} fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontSize="28" fill="#0f2233">Grand Bahama</text>
      <line x1={scaleA[0]} y1={scaleA[1]} x2={scaleB[0]} y2={scaleB[1]} stroke="#0f2233" strokeWidth="2" />
      <line x1={scaleA[0]} y1={scaleA[1] - 6} x2={scaleA[0]} y2={scaleA[1] + 6} stroke="#0f2233" strokeWidth="2" /><line x1={scaleB[0]} y1={scaleB[1] - 6} x2={scaleB[0]} y2={scaleB[1] + 6} stroke="#0f2233" strokeWidth="2" />
      <text x={(scaleA[0] + scaleB[0]) / 2} y={scaleA[1] - 12} textAnchor="middle" fontFamily="Outfit, Arial, sans-serif" fontSize="13" letterSpacing="2" fill="#0f2233">JUST 55 MILES EAST OF FLORIDA</text>
      <text x="16" y={H - 14} fontFamily="Outfit, Arial, sans-serif" fontSize="10" letterSpacing="1.5" fill="#52606b">ILLUSTRATION, NOT TO SCALE</text>
    </svg>
  )
}

export const SPOTS: { id: string; name: string; at: LL; img: string; d: string }[] = [
  { id: "west", name: "West End Ecology Tours", at: [26.69, -78.95], img: "3-West-End-Ecology-Tours-GOPR8097-604x360.jpg", d: "Stingray, Coral Reef and Reef Fishing experiences among the mangroves and reefs of West End, a town of 1930s bootleggers and legendary sport fishermen." },
  { id: "groves", name: "Garden of the Groves", at: [26.56, -78.62], img: "garden-of-the-groves-604x360.png", d: "Waterfalls, birds and butterflies, a replica of Freeport's first chapel, the only labyrinth in The Bahamas and the Garden Cafe." },
  { id: "unexso", name: "UNEXSO", at: [26.505, -78.66], img: "diving-with-dolphins.jpg", d: "Grand Bahama's dolphin sanctuary at Sanctuary Bay: swim with dolphins in a natural lagoon." },
  { id: "fry", name: "Smith's Point Fish Fry", at: [26.505, -78.6], img: "Outriggers-Fish-Fry-604x360.jpg", d: "Fried snapper, lobster, potato bread and conch salad, with rum punch and Bahamian music. A Grand Bahama institution." },
  { id: "park", name: "Lucayan National Park", at: [26.61, -78.3], img: "underwater-cave.jpg", d: "The Lucayan Caverns, over six miles of caves and charted tunnels, one of the longest underwater cave systems in the world, and Gold Rock Beach." },
]

/* Island map with pins */
export function IslandMap({ active, picked, onPick }: { active: string; picked: string[]; onPick: (id: string) => void }) {
  const W = 1000, H = 300
  const P = ([la, lo]: LL) => [(lo + 79.05) / 1.25 * W, (26.82 - la) / 0.38 * H] as const
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="group" aria-label="Illustrated map of Grand Bahama Island with five favourite places. Not to scale.">
      <rect width={W} height={H} fill="#d5e6ee" rx="18" />
      <path d={smooth(GB.map(P))} fill="#2e5b45" />
      <text x={P([26.78, -78.66])[0]} y={P([26.78, -78.66])[1]} fontFamily="Outfit, Arial, sans-serif" fontSize="12" letterSpacing="3" fill="#0f2233" fillOpacity=".6">NORTHWEST PROVIDENCE CHANNEL</text>
      <text x={P([26.45, -78.95])[0]} y={H - 18} fontFamily="Outfit, Arial, sans-serif" fontSize="12" letterSpacing="3" fill="#0f2233" fillOpacity=".6">FREEPORT AND LUCAYA ON THE SOUTH SHORE</text>
      {SPOTS.map((s, i) => {
        const [x, y] = P(s.at), on = active === s.id, sel = picked.includes(s.id)
        return (
          <g key={s.id} role="button" tabIndex={0} aria-label={`${s.name}${sel ? ", in your day" : ""}`} onClick={() => onPick(s.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(s.id) } }} className="cursor-pointer">
            <circle cx={x} cy={y} r={on ? 22 : 16} fill={sel ? "#f2b8c6" : "#f1f2ee"} stroke="#0f2233" strokeWidth={on ? 3 : 2} style={{ transition: "r .3s, fill .3s" }} />
            <text x={x} y={y + 5} textAnchor="middle" fontFamily="Outfit, Arial, sans-serif" fontWeight="600" fontSize="14" fill="#0f2233">{i + 1}</text>
          </g>
        )
      })}
    </svg>
  )
}
