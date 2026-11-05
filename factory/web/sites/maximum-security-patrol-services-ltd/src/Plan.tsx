import { motion, useReducedMotion } from "motion/react"
import { ease } from "./site"

export type Layer = "all" | "officers" | "patrol" | "alarm" | "investigations" | "consultancy"

const INK = "#121a21", OLIVE = "#56652a", STEEL = "#8d99a2"
const ROUTE = "M110 110 H690 V490 H110 Z"

function L({ on, children }: { on: boolean; children: React.ReactNode }) {
  return <motion.g initial={false} animate={{ opacity: on ? 1 : 0.14 }} transition={{ duration: 0.5, ease }}>{children}</motion.g>
}

export default function Plan({ layer = "all", draw = true, className = "" }: { layer?: Layer; draw?: boolean; className?: string }) {
  const reduce = useReducedMotion()
  const show = (k: Layer) => layer === "all" || layer === k
  const d = (delay: number) => ({ initial: draw ? { pathLength: 0 } : false, animate: { pathLength: 1 }, transition: { duration: 1.6, delay, ease } })
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Illustration of a guarded premises: officer posts at the gate and lobby, a patrol route around the perimeter, alarm sensors linked to monitoring, an incident point and survey measurements.">
      {/* boundary and building */}
      <motion.rect x="70" y="70" width="660" height="460" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="2 6" initial={draw ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      <motion.rect x="230" y="160" width="340" height="200" fill="#e2e5e3" stroke={INK} strokeWidth="1.5" {...d(0.2)} />
      {[0, 1, 2, 3, 4, 5, 6].map(i => <line key={i} x1={250 + i * 48} y1="160" x2={230 + i * 48} y2="180" stroke={INK} strokeOpacity=".25" />)}
      <text x="400" y="265" textAnchor="middle" fontFamily="Red Hat Display, Arial, sans-serif" fontWeight="700" fontSize="18" fill={INK}>Client premises</text>
      <text x="400" y="288" textAnchor="middle" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="12" fill="#55606a">Office, bank, store or residence</text>
      {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={140 + i * 58} y="410" width="44" height="60" fill="none" stroke={INK} strokeOpacity=".3" />)}
      <text x="140" y="400" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" letterSpacing="1.5" fill="#55606a">CAR PARK</text>
      <rect x="370" y="522" width="60" height="16" fill="#eef0ef" /><text x="400" y="560" textAnchor="middle" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" letterSpacing="1.5" fill="#55606a">MAIN GATE</text>

      {/* consultancy: survey dimensions */}
      <L on={show("consultancy")}>
        <line x1="230" y1="130" x2="570" y2="130" stroke={OLIVE} strokeWidth="1.2" /><line x1="230" y1="124" x2="230" y2="136" stroke={OLIVE} /><line x1="570" y1="124" x2="570" y2="136" stroke={OLIVE} />
        <text x="400" y="124" textAnchor="middle" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" letterSpacing="1.5" fill={OLIVE}>SITE SURVEY</text>
        <line x1="600" y1="160" x2="600" y2="360" stroke={OLIVE} strokeWidth="1.2" /><line x1="594" y1="160" x2="606" y2="160" stroke={OLIVE} /><line x1="594" y1="360" x2="606" y2="360" stroke={OLIVE} />
        <circle cx="230" cy="160" r="14" fill="none" stroke={OLIVE} strokeDasharray="3 3" /><circle cx="570" cy="360" r="14" fill="none" stroke={OLIVE} strokeDasharray="3 3" />
        <text x="612" y="264" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" fill={OLIVE}>Weak points</text>
      </L>

      {/* patrol route */}
      <L on={show("patrol")}>
        <motion.path id="route" d={ROUTE} fill="none" stroke={OLIVE} strokeWidth="2.4" strokeDasharray="10 8" initial={draw ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
        {[[110, 110], [690, 110], [690, 490], [110, 490]].map(([x, y], i) => (
          <g key={i}><rect x={x - 7} y={y - 7} width="14" height="14" fill="#eef0ef" stroke={OLIVE} strokeWidth="2" /><text x={x + (x < 400 ? 14 : -14)} y={y - 12} textAnchor={x < 400 ? "start" : "end"} fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" fill={OLIVE}>Checkpoint {i + 1}</text></g>
        ))}
        {!reduce && (
          <circle r="7" fill={OLIVE}>
            <animateMotion dur="14s" repeatCount="indefinite" path={ROUTE} />
          </circle>
        )}
      </L>

      {/* alarm sensors and monitoring link */}
      <L on={show("alarm")}>
        {[[230, 220], [230, 300], [570, 220], [400, 160], [400, 360]].map(([x, y], i) => (
          <g key={i}><circle cx={x} cy={y} r="6" fill={OLIVE} /><circle cx={x} cy={y} r="13" fill="none" stroke={OLIVE} strokeOpacity=".5" /></g>
        ))}
        <path d="M570 300 H760" stroke={OLIVE} strokeWidth="1.6" strokeDasharray="4 4" fill="none" />
        <path d="M752 294 L762 300 L752 306" stroke={OLIVE} strokeWidth="1.6" fill="none" />
        <text x="752" y="286" textAnchor="end" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" letterSpacing="1.2" fill={OLIVE}>TO MONITORING</text>
      </L>

      {/* officers on post */}
      <L on={show("officers")}>
        {[[400, 512, "Gate post"], [400, 380, "Lobby post"]].map(([x, y, t]) => (
          <g key={t as string}>
            <circle cx={x as number} cy={y as number} r="15" fill={INK} />
            <circle cx={x as number} cy={(y as number) - 4} r="4.5" fill="#eef0ef" /><path d={`M${(x as number) - 7} ${(y as number) + 9} q7 -10 14 0`} fill="#eef0ef" />
            <text x={(x as number) + 24} y={(y as number) + 4} fontFamily="Red Hat Display, Arial, sans-serif" fontWeight="700" fontSize="13" fill={INK}>{t}</text>
          </g>
        ))}
      </L>

      {/* investigations */}
      <L on={show("investigations")}>
        <circle cx="200" cy="440" r="8" fill={INK} />
        {[22, 38, 54].map((r, i) => <circle key={r} cx="200" cy="440" r={r} fill="none" stroke={INK} strokeOpacity={0.5 - i * 0.14} strokeDasharray="2 4" />)}
        <path d="M200 440 L120 330" stroke={INK} strokeOpacity=".5" />
        <rect x="80" y="300" width="96" height="32" fill="#eef0ef" stroke={INK} strokeOpacity=".5" />
        <text x="128" y="321" textAnchor="middle" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="11" fill={INK}>Incident report</text>
      </L>
      <text x="22" y="590" fontFamily="Red Hat Text, Arial, sans-serif" fontSize="10" letterSpacing="1.5" fill={STEEL}>ILLUSTRATION OF A TYPICAL SITE</text>
    </svg>
  )
}
