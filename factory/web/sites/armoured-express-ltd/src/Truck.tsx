import { motion, useReducedMotion } from "motion/react"

const INK = "#15181e"
const SOFT = "rgb(21 24 30 / .45)"
const PLATE = "#fbfaf7"
const GLASS = "#2b343d"
const out = [0.22, 1, 0.36, 1] as const

function Wheel({ cx, arrive }: { cx: number; arrive: boolean }) {
  const reduce = useReducedMotion()
  return (
    <g>
      <circle cx={cx} cy="238" r="34" fill={INK} />
      <motion.g style={{ transformOrigin: `${cx}px 238px`, transformBox: "view-box" }} initial={{ rotate: arrive && !reduce ? -540 : 0 }} animate={{ rotate: 0 }} transition={{ duration: 1.4, ease: out }}>
        <circle cx={cx} cy="238" r="17" fill={PLATE} />
        <circle cx={cx} cy="238" r="5" fill={INK} />
        {[0, 60, 120, 180, 240, 300].map(a => <circle key={a} cx={cx + 11 * Math.cos((a * Math.PI) / 180)} cy={238 + 11 * Math.sin((a * Math.PI) / 180)} r="1.8" fill={INK} />)}
      </motion.g>
    </g>
  )
}

/** Technical elevation of a cab-over armoured box truck, facing right. */
function Body({ arrive }: { arrive: boolean }) {
  return (
    <g>
      {/* armoured body */}
      <rect x="70" y="46" width="560" height="178" fill={PLATE} stroke={INK} strokeWidth="2" />
      {[150, 250, 350, 450, 550].map(x => <line key={x} x1={x} y1="46" x2={x} y2="224" stroke={SOFT} strokeWidth="1" />)}
      {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={86 + i * 40} cy="58" r="2" fill={SOFT} />)}
      {Array.from({ length: 14 }).map((_, i) => <circle key={`b${i}`} cx={86 + i * 40} cy="212" r="2" fill={SOFT} />)}
      {/* rear door with lock */}
      <rect x="78" y="70" width="58" height="140" fill="none" stroke={INK} strokeWidth="1.5" />
      <rect x="122" y="128" width="8" height="22" fill={INK} />
      {/* gun ports and side hatch */}
      {[300, 420].map(x => <circle key={x} cx={x} cy="104" r="7" fill="none" stroke={INK} strokeWidth="1.5" />)}
      <rect x="478" y="88" width="96" height="112" fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx="560" cy="146" r="4" fill={INK} />
      {/* camera dome */}
      <path d="M590 46 v-8 h22 v8" fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx="601" cy="34" r="6" fill={GLASS} />
      <text x="180" y="160" fontFamily="Libre Franklin, Arial, sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.5" fill={INK}>Armoured Express</text>
      {/* cab over */}
      <path d="M640 224 V70 Q640 58 652 58 H810 Q842 58 850 92 L872 176 V224 Z" fill={PLATE} stroke={INK} strokeWidth="2" />
      <path d="M760 72 H812 Q830 72 836 96 L852 160 H760 Z" fill={GLASS} />
      <rect x="664" y="76" width="80" height="62" fill={GLASS} />
      <line x1="752" y1="66" x2="752" y2="224" stroke={SOFT} />
      <rect x="738" y="152" width="10" height="4" fill={INK} />
      <rect x="866" y="188" width="18" height="12" fill={INK} />
      {/* chassis */}
      <rect x="62" y="224" width="826" height="12" fill={INK} />
      <Wheel cx={200} arrive={arrive} />
      <Wheel cx={256} arrive={arrive} />
      <Wheel cx={770} arrive={arrive} />
    </g>
  )
}

export default function Truck({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 1000 300" className={className} role="img" aria-label="Technical drawing of an Armoured Express armoured truck">
      <line x1="0" y1="273" x2="1000" y2="273" stroke={INK} strokeWidth="1.5" />
      {Array.from({ length: 25 }).map((_, i) => <line key={i} x1={i * 42} y1="288" x2={i * 42 + 22} y2="288" stroke={SOFT} />)}
      <motion.g initial={{ x: reduce ? 0 : -700, opacity: reduce ? 1 : 0.0001 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.4, ease: out, opacity: { duration: 0.3 } }}>
        <Body arrive />
      </motion.g>
    </svg>
  )
}

export const CALLOUTS: { n: number; t: string; d: string; at: [number, number]; up: boolean }[] = [
  { n: 1, t: "Armoured vehicle", d: "Secure armoured vehicles.", at: [300, 104], up: true },
  { n: 2, t: "Surveillance", d: "Surveillance-enabled cash in transit.", at: [601, 34], up: true },
  { n: 3, t: "Locked transit bags", d: "Cash travels in secure, locked transit bags.", at: [107, 140], up: false },
  { n: 4, t: "Crew", d: "Highly trained, uniformed and armed guards.", at: [800, 112], up: true },
  { n: 5, t: "Countermeasures", d: "Security countermeasures best practice, to deter attack.", at: [526, 146], up: false },
  { n: 6, t: "Cover", d: "Public liability coverage up to two million dollars.", at: [770, 238], up: false },
]

/** The same truck at plate scale, with leader-line callouts that draw in once. */
export function TruckPlate({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="-20 -60 1040 410" className={className} role="img" aria-label="Elevation of the armoured truck with its six stated safeguards marked">
      <line x1="-20" y1="273" x2="1020" y2="273" stroke={INK} strokeWidth="1.5" />
      <Body arrive={false} />
      {CALLOUTS.map((c, i) => {
        const [x, y] = c.at, ry = c.up ? -26 : 314
        return (
          <g key={c.n}>
            <motion.path d={`M${x} ${y} L${x} ${c.up ? ry + 15 : ry - 15}`} fill="none" stroke={INK} strokeWidth="1.2" initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.65, 0, 0.35, 1] }} />
            <circle cx={x} cy={y} r="5" fill={INK} />
            <motion.g initial={{ opacity: reduce ? 1 : 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 0.4, delay: 0.55 + i * 0.12 }}>
              <circle cx={x} cy={ry} r="15" fill={INK} />
              <text x={x} y={ry + 6} textAnchor="middle" fontFamily="Libre Franklin, Arial, sans-serif" fontWeight="700" fontSize="17" fill={PLATE}>{c.n}</text>
              <text className="max-md:hidden" x={x + 24} y={ry + 6} fontFamily="Libre Franklin, Arial, sans-serif" fontWeight="600" fontSize="18" fill={INK}>{c.t}</text>
            </motion.g>
          </g>
        )
      })}
    </svg>
  )
}
