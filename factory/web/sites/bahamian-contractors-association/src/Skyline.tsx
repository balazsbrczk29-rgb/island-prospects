import { motion } from "motion/react"

const B: [number, number, number][] = [ // x, width, height
  [40, 90, 120], [140, 70, 180], [220, 120, 140], [350, 80, 230], [440, 140, 300], [590, 70, 160], [670, 110, 210],
  [790, 90, 130], [890, 150, 260], [1050, 80, 190], [1140, 120, 150], [1270, 90, 230], [1370, 60, 110],
]
const G = 360
const ease = [0.16, 1, 0.3, 1] as const

export default function Skyline() {
  return (
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" className="block h-full w-full" role="img" aria-label="Line drawing of a Bahamian skyline under construction, with scaffolding and a tower crane above the water">
      {B.map(([x, w, h], i) => {
        const scaffold = i === 4
        const floors = Math.floor(h / 22)
        return (
          <motion.g key={x} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.25 + i * 0.06, duration: 1.2, ease }} style={{ transformOrigin: `${x}px ${G}px` }}>
            <rect x={x} y={G - h} width={w} height={h} fill={scaffold ? "#e1e1db" : "#eeeeea"} stroke="#121417" strokeWidth="1.6" />
            {Array.from({ length: floors }, (_, f) => <path key={f} d={`M${x} ${G - (f + 1) * 22} H${x + w}`} stroke="#121417" strokeOpacity={scaffold ? 0.5 : 0.18} />)}
            {!scaffold && Array.from({ length: Math.floor(w / 26) }, (_, c) => <path key={c} d={`M${x + 13 + c * 26} ${G - h + 10} V${G - 8}`} stroke="#121417" strokeOpacity=".12" strokeDasharray="8 14" />)}
            {scaffold && Array.from({ length: 6 }, (_, c) => <path key={c} d={`M${x + c * (w / 5)} ${G - h - 20} V${G}`} stroke="#121417" strokeWidth="1.2" />)}
            {scaffold && Array.from({ length: floors }, (_, f) => <path key={"d" + f} d={`M${x} ${G - f * 22} L${x + w / 5} ${G - (f + 1) * 22}`} stroke="#121417" strokeOpacity=".4" />)}
          </motion.g>
        )
      })}
      {/* crane */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
        <path d="M1000 360 V120 M1012 360 V120" stroke="#121417" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M1000 ${360 - i * 20} L1012 ${340 - i * 20}`} stroke="#121417" strokeWidth="1" />)}
        <motion.g initial={{ rotate: -6 }} animate={{ rotate: 0 }} transition={{ delay: 1.3, duration: 2.2, ease }} style={{ transformOrigin: "1006px 120px" }}>
          <path d="M860 120 H1260 M860 132 H1260 M1006 120 L1006 94 L1260 120 M1006 94 L860 120" stroke="#121417" strokeWidth="1.6" fill="none" />
          {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${860 + i * 20} 120 L${870 + i * 20} 132`} stroke="#121417" strokeWidth=".8" />)}
          <rect x="866" y="132" width="40" height="22" fill="#121417" />
          <motion.g initial={{ y: -40 }} animate={{ y: 0 }} transition={{ delay: 1.6, duration: 2, ease }}>
            <path d="M1180 132 V190" stroke="#121417" strokeWidth="1" />
            <path d="M1172 190 h16 l-8 12z" fill="#f2b705" stroke="#121417" />
            <rect x="1150" y="204" width="60" height="14" fill="#f2b705" stroke="#121417" />
          </motion.g>
        </motion.g>
      </motion.g>
      {/* water */}
      <rect x="0" y={G} width="1440" height="60" fill="#00abc9" fillOpacity=".18" />
      <path d={`M0 ${G} H1440`} stroke="#121417" strokeWidth="2.5" />
      {Array.from({ length: 4 }, (_, i) => <motion.path key={i} d={`M${120 + i * 330} ${G + 18 + (i % 2) * 14} h120`} stroke="#00778b" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4 + i * 0.1, duration: 1.2, ease }} />)}
    </svg>
  )
}
