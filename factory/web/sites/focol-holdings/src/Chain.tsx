import type { ReactNode } from "react"
import { motion } from "motion/react"

export type Node = "import" | "store" | "lng" | "power" | "solar" | "retail"
const ink = "#0c1b2a"
const hi = "#1c7fb0"

function G({ id, active, children, label, lx, ly }: { id: Node; active: Node | null; children: ReactNode; label: string; lx: number; ly: number }) {
  const on = active === null || active === id
  return (
    <g style={{ opacity: on ? 1 : 0.28, transition: "opacity .6s cubic-bezier(.16,1,.3,1)" }} stroke={active === id ? hi : ink} data-node={id}>
      {children}
      <g stroke="none" fill={active === id ? hi : ink} fontFamily="Public Sans, sans-serif" fontSize="15" letterSpacing="0.5">
        <line x1={lx} y1={ly + 8} x2={lx} y2={ly + 40} stroke={active === id ? hi : ink} strokeWidth="1" />
        <circle cx={lx} cy={ly + 44} r="3.5" />
        <text x={lx} y={ly} textAnchor="middle">{label}</text>
      </g>
    </g>
  )
}

const draw = (d = 0) => ({ initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 2.2, delay: d, ease: [0.16, 1, 0.3, 1] as const } })

/** Elevation drawing of the energy chain FOCOL's companies run: ship, terminal tanks, LNG regas, power, solar, service station. Illustration, not to scale. */
export default function Chain({ active = null, animate = true, className = "" }: { active?: Node | null; animate?: boolean; className?: string }) {
  const P = animate ? motion.path : ("path" as any)
  const a = (d: number) => (animate ? draw(d) : {})
  return (
    <svg viewBox="0 150 1400 320" className={className} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Line drawing of the energy chain: a tanker at the pier, terminal storage tanks, an LNG regasification unit, a power station, a solar field and a service station. Illustration, not to scale.">
      {/* ground and sea */}
      <P d="M0 420 H1400" stroke={ink} {...a(0)} />
      {[0, 1, 2, 3].map(i => <P key={i} d={`M${10 + i * 70} ${438 + (i % 2) * 14} q 18 -6 36 0 t 36 0`} stroke={ink} strokeOpacity=".35" {...a(0.2 + i * 0.1)} />)}
      <G id="import" active={active} label="Import by sea" lx={170} ly={250}>
        <P d="M30 392 L60 432 H320 L346 392 Z" {...a(0.1)} />
        <P d="M60 392 V372 H270 V392 M250 372 V330 H300 V392 M262 344 H290 M262 356 H290" {...a(0.3)} />
        <P d="M286 330 V306 H298 V330" {...a(0.4)} />
        {[90, 140, 190].map((x, i) => <P key={x} d={`M${x} 372 a 22 22 0 0 1 44 0`} {...a(0.4 + i * 0.1)} />)}
        <P d="M346 420 H400 V404 M360 404 H400" {...a(0.6)} />
      </G>
      <G id="store" active={active} label="Terminal storage" lx={510} ly={210}>
        {[[420, 80, 130], [510, 64, 110], [584, 52, 90]].map(([x, w, h], i) => (
          <g key={x}>
            <P d={`M${x} 420 V${420 - h} H${x + w} V420`} {...a(0.5 + i * 0.12)} />
            <P d={`M${x} ${420 - h} q ${w / 2} -14 ${w} 0`} {...a(0.6 + i * 0.12)} />
            <P d={`M${x + 8} ${420 - h + 10} V410`} strokeOpacity=".4" {...a(0.8)} />
          </g>
        ))}
        <P d="M400 404 H640" strokeDasharray="4 5" {...a(0.9)} />
      </G>
      <G id="lng" active={active} label="LNG regasification" lx={720} ly={250}>
        <P d="M660 420 V356 H780 V420 M672 356 V330 H700 V356 M740 356 V320 H768 V356" {...a(0.8)} />
        {[686, 702, 718, 734, 750].map((x, i) => <P key={x} d={`M${x} 366 V410`} strokeOpacity=".55" {...a(1 + i * 0.05)} />)}
        <P d="M640 404 H660 M780 392 H830" strokeDasharray="4 5" {...a(1.1)} />
      </G>
      <G id="power" active={active} label="Power generation" lx={905} ly={170}>
        <P d="M830 420 V320 L880 300 L930 320 V420 M930 340 H980 V420" {...a(1)} />
        <P d="M870 300 V214 H888 V300 M906 300 V234 H920 V300" {...a(1.1)} />
        {[846, 866, 946, 962].map(x => <P key={x} d={`M${x} 360 h10 v16 h-10 z`} strokeOpacity=".6" {...a(1.2)} />)}
        <P d="M1000 420 L1012 250 L1024 420 M1004 330 H1020 M998 284 H1026 M1006 380 H1018" {...a(1.3)} />
        <P d="M1012 250 C1060 270 1100 270 1140 282" strokeOpacity=".5" {...a(1.4)} />
      </G>
      <G id="solar" active={active} label="Solar" lx={1110} ly={300}>
        {[1048, 1092, 1136].map((x, i) => (
          <g key={x}>
            <P d={`M${x} 396 L${x + 36} 370 L${x + 40} 378 L${x + 4} 404 Z`} {...a(1.3 + i * 0.1)} />
            <P d={`M${x + 20} 388 V420`} {...a(1.4 + i * 0.1)} />
          </g>
        ))}
      </G>
      <G id="retail" active={active} label="Service stations" lx={1300} ly={250}>
        <P d="M1210 340 H1390 V354 H1210 Z M1230 354 V420 M1370 354 V420" {...a(1.4)} />
        <P d="M1278 420 V380 H1302 V420 M1284 388 H1296" {...a(1.6)} />
        <P d="M1320 420 V372 H1340 V420" {...a(1.65)} />
      </G>
    </svg>
  )
}
