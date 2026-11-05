import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { MessageCircle, Minus, Phone, Plus } from "lucide-react"
import { C, ease, waLink } from "./site"

// The pieces Slim Upholstery says it works on (home, auto, marine, aircraft, churches; sofas and dining seats).
const ITEMS = {
  sofa: { label: "Sofa", area: "Home", body: "M40 150 h320 v60 h-320z M60 95 h280 v60 h-280z M20 120 h40 v90 h-40z M340 120 h40 v90 h-40z", legs: "M50 210 v18 M350 210 v18", seams: "M200 98 v110 M60 150 h280" },
  chair: { label: "Dining chair", area: "Home", body: "M140 40 h120 v110 h-120z M120 150 h160 v34 h-160z", legs: "M130 184 v50 M270 184 v50 M150 150 v-4", seams: "M140 95 h120" },
  boat: { label: "Boat cushions", area: "Marine", body: "M30 140 h160 v46 h-160z M210 140 h160 v46 h-160z M60 80 h280 v50 h-280z", legs: "M10 200 q190 40 380 0", seams: "M110 140 v46 M290 140 v46 M200 80 v50" },
  car: { label: "Car seat", area: "Auto", body: "M150 30 q50 -18 100 0 v120 h-100z M120 150 h170 q20 0 20 20 v24 h-210 v-24 q0 -20 20 -20z", legs: "M150 214 h120", seams: "M170 50 v95 M230 50 v95 M120 172 h190" },
  pew: { label: "Church pew", area: "Churches", body: "M30 70 h340 v70 h-340z M20 140 h360 v40 h-360z", legs: "M40 180 v50 M360 180 v50 M200 180 v50", seams: "M30 105 h340 M140 140 v40 M260 140 v40" },
} as const
type ItemKey = keyof typeof ITEMS

const COLOURS = [
  { n: "Navy", c: "#23395b" }, { n: "Natural linen", c: "#d8cbb4" }, { n: "Sea glass", c: "#8fb9b0" }, { n: "Mustard", c: "#c99a2e" },
  { n: "Charcoal", c: "#3b3b3d" }, { n: "Ivory", c: "#efe8da" }, { n: "Olive", c: "#6b6f3a" }, { n: "Sand", c: "#b99a74" },
]
const WEAVES = ["Plain", "Stripe", "Herringbone"] as const

export function Studio() {
  const [item, setItem] = useState<ItemKey>("sofa")
  const [col, setCol] = useState(COLOURS[0])
  const [weave, setWeave] = useState<(typeof WEAVES)[number]>("Plain")
  const [qty, setQty] = useState(1)
  const it = ITEMS[item]
  const dark = ["Navy", "Charcoal", "Olive"].includes(col.n)
  const msg = `Hi Slim Upholstery, I would like a free quote.\nPiece: ${it.label} (${it.area})\nHow many: ${qty}\nColour idea: ${col.n}, ${weave.toLowerCase()}\nI can send photos of what I have.`
  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
      <div className="weave relative overflow-hidden rounded-[28px] bg-linen-2 p-6 md:p-10">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Piece">
          {(Object.keys(ITEMS) as ItemKey[]).map(k => (
            <button key={k} role="radio" aria-checked={item === k} onClick={() => setItem(k)} className={`min-h-11 rounded-full px-4 text-[15px] transition ${item === k ? "bg-ink text-linen" : "bg-linen hover:-translate-y-px"}`}>{ITEMS[k].label}</button>
          ))}
        </div>
        <svg viewBox="0 0 400 250" className="mt-6 w-full" role="img" aria-label={`${it.label} illustrated in ${col.n}, ${weave.toLowerCase()} fabric`}>
          <defs>
            <pattern id="stripe" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><rect width="14" height="14" fill={col.c} /><rect width="5" height="14" fill={dark ? "#ffffff" : "#2a2420"} opacity=".14" /></pattern>
            <pattern id="herring" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill={col.c} /><path d="M0 8 l8 -8 M8 16 l8 -8 M8 0 l8 8 M0 8 l8 8" stroke={dark ? "#ffffff" : "#2a2420"} strokeOpacity=".16" strokeWidth="2" /></pattern>
          </defs>
          <AnimatePresence mode="wait">
            <motion.g key={item} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }}>
              <path d={it.legs} stroke="#2a2420" strokeWidth="6" strokeLinecap="round" fill="none" />
              <motion.path d={it.body} animate={{ fill: weave === "Plain" ? col.c : weave === "Stripe" ? "url(#stripe)" : "url(#herring)" }} transition={{ duration: 0.4 }} stroke="#2a2420" strokeWidth="2.5" strokeLinejoin="round" />
              <motion.path key={col.n + weave} d={it.seams} fill="none" stroke="#c99a2e" strokeWidth="2" strokeDasharray="5 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease }} />
            </motion.g>
          </AnimatePresence>
        </svg>
        <p className="mt-2 text-[13px] text-muted">Colour ideas to talk through with Slim, not a fabric catalogue.</p>
      </div>

      <div className="flex flex-col">
        <fieldset>
          <legend className="text-[11px] font-medium tracking-[0.2em] text-muted uppercase">Colour idea · {col.n}</legend>
          <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8 sm:gap-2">
            {COLOURS.map(c => (
              <button key={c.n} aria-label={c.n} aria-pressed={col.n === c.n} onClick={() => setCol(c)} className={`aspect-square rounded-full border-2 transition hover:scale-105 ${col.n === c.n ? "border-ink ring-2 ring-thread ring-offset-2 ring-offset-linen" : "border-transparent"}`} style={{ background: c.c }} />
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-7">
          <legend className="text-[11px] font-medium tracking-[0.2em] text-muted uppercase">Fabric look</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">{WEAVES.map(w => <button key={w} aria-pressed={weave === w} onClick={() => setWeave(w)} className={`min-h-11 rounded-full border text-[15px] transition ${weave === w ? "border-ink bg-ink text-linen" : "border-line hover:border-ink"}`}>{w}</button>)}</div>
        </fieldset>
        <div className="mt-7 flex items-center justify-between rounded-full border border-line p-1.5">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="grid size-11 place-items-center rounded-full hover:bg-linen-2" aria-label="Fewer pieces"><Minus className="size-4" /></button>
          <p aria-live="polite"><span className="font-display text-2xl">{qty}</span> <span className="text-[14px] text-muted">{qty === 1 ? "piece" : "pieces"}</span></p>
          <button onClick={() => setQty(q => Math.min(40, q + 1))} className="grid size-11 place-items-center rounded-full hover:bg-linen-2" aria-label="More pieces"><Plus className="size-4" /></button>
        </div>
        <div className="mt-7 rounded-2xl bg-white/70 p-5 text-[15px] leading-relaxed">
          <p className="font-display text-xl">{qty} × {it.label}</p>
          <p className="text-muted">{it.area} upholstery · {col.n}, {weave.toLowerCase()}</p>
        </div>
        <a href={waLink(msg)} className="mt-5 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[17px] text-linen transition hover:-translate-y-0.5 hover:bg-navy-deep"><MessageCircle className="size-5" aria-hidden /> Send for a free quote</a>
        <a href={C.tel} className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 text-[15px] underline-offset-4 hover:underline"><Phone className="size-4" aria-hidden /> Or call {C.phone}</a>
        <p className="mt-2 text-center text-[13px] text-muted">Opens WhatsApp with your choices written. Add photos of your piece before sending.</p>
      </div>
    </div>
  )
}
