import { motion } from "motion/react"
import { ROOMS, type Room } from "./site"

// Elevation drawing, not to scale: Lake Killarney to the south, the ridge at 70 ft, the Atlantic to the north.
const FLOOR_Y: Record<number, number> = { 3: 120, 2: 172, 1: 224 }
const X0 = 362, W = 276

export default function Ridge({ active, onPick, intro = true }: { active?: string | null; onPick?: (r: Room) => void; intro?: boolean }) {
  const byFloor = (f: number) => ROOMS.filter(r => r.floor === f)
  return (
    <svg viewBox="0 0 1000 520" className="h-auto w-full" role="img" aria-label="Elevation drawing of Ocean West on its ridge, 70 feet above sea level, with Lake Killarney to the south and the Atlantic Ocean to the north. Each window is one of the ten gem-named rooms. Illustration, not to scale.">
      <defs>
        <linearGradient id="ow-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f5f1ea" /><stop offset="1" stopColor="#f1e3d6" /></linearGradient>
        <linearGradient id="ow-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b5d78" /><stop offset="1" stopColor="#1d4359" /></linearGradient>
        <linearGradient id="ow-lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f9483" /><stop offset="1" stopColor="#45705f" /></linearGradient>
      </defs>
      <rect width="1000" height="520" fill="url(#ow-sky)" />
      <circle cx="860" cy="120" r="44" fill="#ecc9b4" opacity=".7" />
      {/* lake and ocean */}
      <motion.rect initial={intro ? { scaleX: 0 } : false} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} style={{ transformOrigin: "0 0" }} x="0" y="400" width="250" height="120" fill="url(#ow-lake)" />
      <motion.rect initial={intro ? { scaleX: 0 } : false} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} style={{ transformOrigin: "1000px 0" }} x="740" y="400" width="260" height="120" fill="url(#ow-sea)" />
      {[0, 1, 2].map(i => <motion.path key={i} d={`M ${760 + i * 70} ${420 + i * 22} q 14 -6 28 0 t 28 0`} stroke="#f5f1ea" strokeOpacity=".5" fill="none" animate={{ x: [0, 10, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }} />)}
      {/* ridge */}
      <path d="M 200 400 C 280 390, 300 280, 350 262 L 650 262 C 700 280, 720 390, 800 400 L 800 520 L 200 520 Z" fill="#d9cdb8" />
      <path d="M 200 400 C 280 390, 300 280, 350 262 L 650 262 C 700 280, 720 390, 800 400" fill="none" stroke="#1d2126" strokeOpacity=".5" />
      {/* palms */}
      {[[318, 300], [690, 296]].map(([x, y]) => (
        <g key={x} stroke="#2c4d41" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d={`M ${x} ${y} q 4 -40 2 -70`} />
          <path d={`M ${x + 2} ${y - 70} q -22 -6 -34 8 M ${x + 2} ${y - 70} q 22 -8 36 6 M ${x + 2} ${y - 70} q -8 -18 -26 -22 M ${x + 2} ${y - 70} q 12 -18 30 -18`} />
        </g>
      ))}
      {/* building */}
      <rect x={X0 - 12} y="104" width={W + 24} height="158" fill="#f5f1ea" stroke="#1d2126" strokeWidth="1.4" />
      <rect x={X0 - 18} y="98" width={W + 36} height="8" fill="#1d2126" />
      {[156, 208].map(y => <line key={y} x1={X0 - 12} x2={X0 + W + 12} y1={y} y2={y} stroke="#1d2126" strokeOpacity=".35" />)}
      <text x={X0 + W / 2} y="88" textAnchor="middle" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" letterSpacing="2.5" fill="#5b6068">ROOFTOP GYM</text>
      {[3, 2, 1].map(f => {
        const rooms = byFloor(f)
        const slot = W / rooms.length
        return rooms.map((r, i) => {
          const x = X0 + i * slot + slot / 2
          const y = FLOOR_Y[f]
          const on = active === r.name
          const win = (
            <g>
              <rect x={x - 14} y={y} width="28" height="30" fill={on ? r.gem : "#e7ddd0"} stroke={on ? "#1d2126" : "#1d2126"} strokeOpacity={on ? 1 : 0.45} strokeWidth={on ? 2 : 1} />
              <rect x={x - 5} y={y + 8} width="10" height="10" transform={`rotate(45 ${x} ${y + 13})`} fill={r.gem} stroke="#1d2126" strokeOpacity=".4" />
              {r.balcony && <line x1={x - 18} x2={x + 18} y1={y + 34} y2={y + 34} stroke="#1d2126" strokeWidth="2" />}
            </g>
          )
          if (!onPick) return <g key={r.name}>{win}</g>
          return (
            <g key={r.name} role="button" tabIndex={0} aria-label={`${r.name} Room, ${r.bed}, ${r.view}`} aria-pressed={on} className="cursor-pointer outline-none" onClick={() => onPick(r)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(r) } }}>
              <rect x={x - 22} y={y - 6} width="44" height="44" fill="transparent" />
              {win}
            </g>
          )
        })
      })}
      {/* 70 ft marker */}
      <g stroke="#1d2126" strokeOpacity=".7">
        <line x1="700" x2="700" y1="262" y2="400" />
        <line x1="692" x2="708" y1="262" y2="262" /><line x1="692" x2="708" y1="400" y2="400" />
      </g>
      <text x="714" y="336" fontFamily="Prata, serif" fontSize="22" fill="#1d2126">70 ft</text>
      <text x="714" y="354" fontFamily="Hanken Grotesk, sans-serif" fontSize="10" letterSpacing="2" fill="#5b6068">ABOVE SEA LEVEL</text>
      <text x="20" y="500" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" letterSpacing="2.5" fill="#f5f1ea">LAKE KILLARNEY (S)</text>
      <text x="980" y="500" textAnchor="end" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" letterSpacing="2.5" fill="#f5f1ea">ATLANTIC (N)</text>
      <text x="24" y="32" fontFamily="Hanken Grotesk, sans-serif" fontSize="10" letterSpacing="2" fill="#5b6068">ILLUSTRATION, NOT TO SCALE</text>
    </svg>
  )
}
