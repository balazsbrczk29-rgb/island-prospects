import { useState } from "react"
import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { PHONE, TEL } from "./data"
import { ease } from "./site"

const TYPES = ["Fixed awning", "Retractable awning", "Weather screen", "Hurricane shutter"] as const
const VALANCES = ["Scalloped", "Straight", "No valance"] as const
const STRIPES = {
  "Canvas blue": ["#1f5f99", "#1f5f99"],
  "Blue and white": ["#1f5f99", "#f3f5f4"],
  "Navy and sand": ["#13243a", "#c9a46a"],
} as const
type Stripe = keyof typeof STRIPES

function Choice<T extends string>({ label, opts, value, set }: { label: string; opts: readonly T[]; value: T; set: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="text-[12px] tracking-[0.16em] text-muted uppercase">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {opts.map(o => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => set(o)} className={`min-h-11 rounded-[2px] border px-4 text-[14px] transition hover:-translate-y-px ${value === o ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink"}`}>{o}</button>
        ))}
      </div>
    </fieldset>
  )
}

export default function Awning() {
  const [type, setType] = useState<(typeof TYPES)[number]>("Fixed awning")
  const [val, setVal] = useState<(typeof VALANCES)[number]>("Scalloped")
  const [stripe, setStripe] = useState<Stripe>("Blue and white")
  const [a, b] = STRIPES[stripe]
  const W = 520, L = 140, R = 660, top = 150
  const projection = type === "Retractable awning" ? 70 : 92
  const n = 14, sw = (R - L) / n
  const valY = top + projection
  const scallop = Array.from({ length: n }, (_, i) => `Q${L + sw * i + sw / 2} ${valY + 34} ${L + sw * (i + 1)} ${valY + 18}`).join(" ")
  const summary = `${type}${type === "Hurricane shutter" ? "" : `, ${val.toLowerCase()} valance, ${stripe.toLowerCase()} canvas`}`
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-[2px] bg-mist">
          <svg viewBox="80 40 640 480" className="block w-full" role="img" aria-label={`Illustration of a building front with a ${summary.toLowerCase()}`}>
            <defs>
              <pattern id="stripes" width={sw * 2} height="10" patternUnits="userSpaceOnUse" x={L}>
                <rect width={sw} height="10" fill={a} /><rect x={sw} width={sw} height="10" fill={b} />
              </pattern>
              <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#13243a" stopOpacity=".18" /><stop offset="1" stopColor="#13243a" stopOpacity="0" /></linearGradient>
            </defs>
            {/* wall */}
            <rect x="110" y="70" width="580" height="420" fill="#f3f5f4" stroke="#13243a" strokeWidth="2" />
            <path d="M110 490 H690" stroke="#13243a" strokeWidth="3" />
            {/* window and door */}
            <rect x="180" y="250" width="250" height="170" fill="#c8d8e2" stroke="#13243a" strokeWidth="2" />
            <path d="M305 250 V420 M180 335 H430" stroke="#13243a" strokeWidth="1.5" />
            <rect x="480" y="250" width="110" height="240" fill="#c8d8e2" stroke="#13243a" strokeWidth="2" />
            <path d="M535 250 V490" stroke="#13243a" strokeWidth="1.5" />
            {/* shade on wall */}
            {type !== "Hurricane shutter" && <motion.rect key={type + "s"} x={L} y={top + 6} width={R - L} height="120" fill="url(#shade)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />}
            {type === "Hurricane shutter" ? (
              <g>
                <rect x="170" y="226" width="270" height="22" fill="#13243a" />
                <rect x="470" y="226" width="130" height="22" fill="#13243a" />
                {[["170", 270], ["470", 130]].map(([x, w]) => (
                  <motion.g key={x as string} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }} style={{ transformOrigin: `${x}px 248px` }}>
                    <rect x={+x + 5} y="248" width={(w as number) - 10} height={x === "170" ? 180 : 242} fill="#dfe8ee" stroke="#13243a" strokeWidth="1.5" />
                    {Array.from({ length: x === "170" ? 15 : 20 }, (_, i) => <path key={i} d={`M${+x + 5} ${260 + i * 12} H${+x + (w as number) - 5}`} stroke="#13243a" strokeOpacity=".45" />)}
                  </motion.g>
                ))}
              </g>
            ) : (
              <motion.g key={type + val + stripe} initial={{ scaleY: 0.05, opacity: 0.4 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.9, ease }} style={{ transformOrigin: `400px ${top}px` }}>
                {/* canopy, slanted */}
                <path d={`M${L + 12} ${top} H${R - 12} L${R} ${valY} H${L} Z`} fill="url(#stripes)" stroke="#13243a" strokeWidth="2" />
                {type === "Retractable awning" && <path d={`M${L + 30} ${top + 4} L${L + 20} ${valY} M${R - 30} ${top + 4} L${R - 20} ${valY}`} stroke="#13243a" strokeWidth="3" />}
                {val === "Scalloped" && <path d={`M${L} ${valY} V${valY + 18} ${scallop} V${valY} Z`} fill="url(#stripes)" stroke="#13243a" strokeWidth="2" />}
                {val === "Straight" && <rect x={L} y={valY} width={R - L} height="26" fill="url(#stripes)" stroke="#13243a" strokeWidth="2" />}
                <motion.path d={`M${L + 4} ${valY + 6} H${R - 4}`} stroke="#c9a46a" strokeWidth="1.5" strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.3, ease }} />
                {type === "Weather screen" && (
                  <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.77, 0, 0.175, 1] }} style={{ transformOrigin: `400px ${valY}px` }}>
                    <rect x={L + 6} y={valY + (val === "No valance" ? 0 : 20)} width={R - L - 12} height={490 - valY - (val === "No valance" ? 0 : 20)} fill="#ffffff" fillOpacity=".45" stroke="#13243a" strokeWidth="1.5" />
                    <path d={`M${L + 6} ${valY + 60} H${R - 6} M${L + 6} ${valY + 140} H${R - 6} M${L + 6} ${valY + 220} H${R - 6}`} stroke="#13243a" strokeOpacity=".35" />
                  </motion.g>
                )}
              </motion.g>
            )}
            {/* palm */}
            <path d="M672 490 C676 420 668 380 680 330" stroke="#13243a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M680 332 C660 310 630 312 612 326 M680 332 C700 306 730 306 744 320 M680 332 C672 300 650 290 632 292 M680 332 C694 300 716 292 734 296" stroke="#13243a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <p className="absolute bottom-3 left-4 text-[11px] tracking-[0.14em] text-muted uppercase">Illustration</p>
        </div>
      </div>
      <div className="space-y-8 lg:col-span-5">
        <Choice label="What it is" opts={TYPES} value={type} set={setType} />
        {type !== "Hurricane shutter" && <Choice label="Valance" opts={VALANCES} value={val} set={setVal} />}
        {type !== "Hurricane shutter" && <Choice label="Canvas" opts={Object.keys(STRIPES) as Stripe[]} value={stripe} set={setStripe} />}
        <div className="rounded-[2px] bg-ink p-6 text-paper">
          <p className="text-[12px] tracking-[0.16em] text-rope uppercase">Read this out on the call</p>
          <p className="mt-2 font-display text-[1.5rem] leading-snug">{summary}.</p>
          <a href={TEL} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-paper px-5 text-ink transition hover:-translate-y-px hover:bg-rope"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
        </div>
        <p className="text-[14px] text-muted">Colours here are illustrative. Every piece is customised to your needs: ask about fabrics and colours on the call.</p>
      </div>
    </div>
  )
}
