import { useEffect, useRef } from "react"
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
        <circle cx={cx} cy="238" r="19" fill={PLATE} />
        <circle cx={cx} cy="238" r="13" fill="none" stroke={INK} strokeWidth="1" />
        <circle cx={cx} cy="238" r="5" fill={INK} />
        {[0, 60, 120, 180, 240, 300].map(a => <circle key={a} cx={cx + 9 * Math.cos((a * Math.PI) / 180)} cy={238 + 9 * Math.sin((a * Math.PI) / 180)} r="1.6" fill={INK} />)}
      </motion.g>
    </g>
  )
}

const arch = (cx: number) => (
  <g key={cx}>
    <path d={`M${cx - 44} 224 A44 44 0 0 1 ${cx + 44} 224 Z`} fill={PLATE} />
    <path d={`M${cx - 44} 224 A44 44 0 0 1 ${cx + 44} 224`} fill="none" stroke={INK} strokeWidth="2" />
  </g>
)

/** Technical elevation of a cab-over (Hino L-series type) armoured box truck, facing right. 2 px outlines, 1 px detail. */
function Body({ arrive }: { arrive: boolean }) {
  return (
    <g>
      {/* armoured box body */}
      <rect x="70" y="52" width="566" height="172" fill={PLATE} stroke={INK} strokeWidth="2" />
      {[214, 358, 502].map(x => <line key={x} x1={x} y1="52" x2={x} y2="224" stroke={SOFT} strokeWidth="1" />)}
      <line x1="70" y1="66" x2="636" y2="66" stroke={SOFT} strokeWidth="1" />
      {/* rear door */}
      <rect x="80" y="76" width="56" height="138" fill="none" stroke={INK} strokeWidth="1" />
      <rect x="78" y="94" width="5" height="12" fill={INK} />
      <rect x="78" y="184" width="5" height="12" fill={INK} />
      <rect x="120" y="132" width="12" height="28" fill="none" stroke={INK} strokeWidth="1" />
      <rect x="124" y="140" width="4" height="12" fill={INK} />
      <line x1="136" y1="172" x2="636" y2="172" stroke={SOFT} strokeWidth="1" />
      <text x="232" y="156" fontFamily="Libre Franklin, Arial, sans-serif" fontWeight="800" fontSize="25" letterSpacing="0.3" fill={INK}>Armoured Express</text>
      {/* cab over, flat near-vertical front */}
      <path d="M646 224 V66 Q646 58 654 58 H838 Q848 58 849 68 L856 204 V224 Z" fill={PLATE} stroke={INK} strokeWidth="2" />
      <path d="M772 74 H840 L845 140 H772 Z" fill={GLASS} />
      <rect x="668" y="74" width="86" height="64" fill={GLASS} />
      <rect x="660" y="68" width="102" height="146" fill="none" stroke={INK} strokeWidth="1" />
      <rect x="742" y="152" width="10" height="3" fill={INK} />
      {/* mirror arm and mirror */}
      <path d="M848 86 H872" stroke={INK} strokeWidth="1.5" />
      <rect x="868" y="76" width="8" height="36" fill={INK} />
      {/* bumper, lamp, step */}
      <rect x="842" y="200" width="24" height="18" fill={INK} />
      <rect x="850" y="168" width="8" height="10" fill="none" stroke={INK} strokeWidth="1" />
      <rect x="676" y="228" width="44" height="5" fill={INK} />
      {/* chassis rail and fuel tank */}
      <rect x="66" y="222" width="790" height="10" fill={INK} />
      <rect x="470" y="230" width="86" height="24" rx="4" fill={PLATE} stroke={INK} strokeWidth="1.5" />
      {arch(232)}
      {arch(772)}
      <Wheel cx={232} arrive={arrive} />
      <Wheel cx={772} arrive={arrive} />
    </g>
  )
}

/** Hero truck: drives along the road rule from stage 01 to the last stage of the planned run, parking as the last step is signed. */
export default function Truck({ className = "", runKey = "", stages = 5 }: { className?: string; runKey?: string; stages?: number }) {
  const reduce = useReducedMotion()
  const first = useRef(true)
  useEffect(() => { first.current = false }, [])
  const S = 0.7, front = 884 * S
  const ticks = Array.from({ length: stages }, (_, i) => (stages === 1 ? 975 : 150 + (i * 825) / (stages - 1)))
  const end = ticks[ticks.length - 1] - front
  const initialX = reduce ? end : first.current ? -720 : ticks[0] - front
  const dur = first.current ? 1.4 : 0.5 + stages * 0.09
  return (
    <svg viewBox="0 0 1000 232" overflow="hidden" className={className} role="img" aria-label={`Technical drawing of an Armoured Express truck driving the ${stages} stages of the planned run`}>
      <line x1="0" y1="186" x2="1000" y2="186" stroke={INK} strokeWidth="1.5" />
      {ticks.map((x, i) => (
        <g key={`${runKey}-${i}`}>
          <line x1={x} y1="186" x2={x} y2="196" stroke={INK} strokeWidth="2" />
          <motion.text x={x} y="226" textAnchor="middle" fontFamily="Libre Franklin, Arial, sans-serif" fontWeight={i === stages - 1 ? 700 : 500} fontSize="26" style={{ fontVariantNumeric: "tabular-nums" }} fill={INK} initial={{ opacity: reduce ? 1 : 0.25 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : (first.current ? 1 : 0.14) + i * 0.09, duration: 0.2 }}>{String(i + 1).padStart(2, "0")}</motion.text>
        </g>
      ))}
      <motion.g key={runKey} initial={{ x: initialX }} animate={{ x: end }} transition={{ duration: reduce ? 0 : dur, ease: first.current ? out : [0.45, 0, 0.25, 1] }}>
        <g transform={`translate(0 0) scale(${S})`}><Body arrive={!reduce} /></g>
      </motion.g>
    </svg>
  )
}

export const CALLOUTS: { n: number; t: string; d: string; at: [number, number]; up: boolean }[] = [
  { n: 1, t: "Armoured vehicle", d: "Secure armoured vehicles.", at: [300, 100], up: true },
  { n: 2, t: "Surveillance", d: "Surveillance-enabled cash in transit.", at: [540, 100], up: true },
  { n: 3, t: "Locked transit bags", d: "Cash travels in secure, locked transit bags.", at: [108, 180], up: false },
  { n: 4, t: "Crew", d: "Highly trained, uniformed and armed guards.", at: [712, 106], up: true },
  { n: 5, t: "Countermeasures", d: "Security countermeasures best practice, to deter attack.", at: [380, 196], up: false },
  { n: 6, t: "Cover", d: "Public liability coverage up to two million dollars.", at: [610, 196], up: false },
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
