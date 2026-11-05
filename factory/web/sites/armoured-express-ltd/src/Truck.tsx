import { motion, useReducedMotion } from "motion/react"

const INK = "#14161b", BRASS = "#c8a96a"

function Wheel({ cx, delay }: { cx: number; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <g>
      <circle cx={cx} cy="246" r="32" fill={INK} />
      <motion.g style={{ transformOrigin: `${cx}px 246px` }} initial={{ rotate: reduce ? 0 : -720 }} animate={{ rotate: 0 }} transition={{ duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] }}>
        <circle cx={cx} cy="246" r="15" fill="#f0f0ec" />
        {[0, 72, 144, 216, 288].map(a => <circle key={a} cx={cx + 9 * Math.cos((a * Math.PI) / 180)} cy={246 + 9 * Math.sin((a * Math.PI) / 180)} r="2.4" fill={INK} />)}
      </motion.g>
    </g>
  )
}

export default function Truck({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 980 300" className={className} role="img" aria-label="Line drawing of an armoured truck arriving at a bank with an ATM">
      <line x1="0" y1="279" x2="980" y2="279" stroke={INK} strokeWidth="1.5" />
      {Array.from({ length: 24 }).map((_, i) => <line key={i} x1={i * 42} y1="290" x2={i * 42 + 20} y2="290" stroke={INK} strokeOpacity=".25" />)}
      {/* bank and ATM */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
        <path d="M740 279 V120 H960 V279" fill="none" stroke={INK} strokeWidth="1.5" />
        <path d="M728 120 L850 70 L972 120 Z" fill="none" stroke={INK} strokeWidth="1.5" />
        {[760, 800, 900, 940].map(x => <rect key={x} x={x - 6} y="134" width="12" height="145" fill="none" stroke={INK} strokeOpacity=".5" />)}
        <rect x="822" y="170" width="56" height="109" fill="#e4e3dc" stroke={INK} strokeWidth="1.5" />
        <rect x="832" y="182" width="36" height="24" fill={INK} />
        <rect x="836" y="216" width="28" height="4" fill={BRASS} />
        <text x="850" y="248" textAnchor="middle" fontFamily="Libre Franklin, Arial, sans-serif" fontWeight="700" fontSize="11" letterSpacing="2" fill={INK}>ATM</text>
      </motion.g>
      {/* truck */}
      <motion.g initial={{ x: reduce ? 0 : -760 }} animate={{ x: 0 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}>
        <rect x="236" y="62" width="440" height="184" fill="#f7f7f3" stroke={INK} strokeWidth="2" />
        <rect x="236" y="204" width="440" height="10" fill={BRASS} />
        {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={256 + i * 37} cy="76" r="2.2" fill={INK} fillOpacity=".5" />)}
        {Array.from({ length: 12 }).map((_, i) => <circle key={`b${i}`} cx={256 + i * 37} cy="192" r="2.2" fill={INK} fillOpacity=".5" />)}
        <rect x="560" y="96" width="86" height="104" fill="none" stroke={INK} strokeWidth="1.5" />
        <circle cx="632" cy="150" r="4" fill={INK} />
        {[300, 380, 460].map(x => <circle key={x} cx={x} cy="112" r="6" fill="none" stroke={INK} strokeWidth="1.5" />)}
        <text x="272" y="170" fontFamily="Libre Franklin, Arial, sans-serif" fontWeight="800" fontSize="22" letterSpacing="1" fill={INK}>ARMOURED EXPRESS</text>
        <path d="M60 246 V128 Q60 96 92 96 H196 L228 154 V246 Z" fill="#f7f7f3" stroke={INK} strokeWidth="2" />
        <path d="M120 108 H192 L214 150 H120 Z" fill={INK} fillOpacity=".85" />
        <rect x="76" y="108" width="34" height="42" fill={INK} fillOpacity=".85" />
        <rect x="60" y="204" width="168" height="10" fill={BRASS} />
        <rect x="40" y="226" width="26" height="14" fill={INK} />
        <rect x="228" y="236" width="458" height="12" fill={INK} />
        <Wheel cx={150} delay={0} />
        <Wheel cx={590} delay={0} />
      </motion.g>
    </svg>
  )
}
