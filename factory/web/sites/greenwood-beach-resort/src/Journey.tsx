import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ease } from "./site"

const ROUTES = {
  usa: {
    label: "From the USA",
    from: "Fort Lauderdale Executive (FXE)",
    carrier: "MakersAir",
    path: "M104 112 C 300 60, 560 200, 664 374",
    lines: [
      "Flights from Fort Lauderdale Executive to New Bight several times a week.",
      "Outbound at 7am or 1pm, return at 10:20am or 4:20pm, depending on the date.",
      "Resort guests get 10% off the airfare: ask the resort for the promo code.",
    ],
  },
  nassau: {
    label: "From Nassau",
    from: "Nassau domestic terminal",
    carrier: "Western Air",
    path: "M440 272 C 520 270, 620 300, 664 374",
    lines: [
      "One flight a day at 1pm on Monday, Wednesday, Thursday and Friday, and 12pm on Sunday.",
      "Extra days are added in high season.",
      "Round trip is approx. $260 per person. Reservations: Western Air, +1 242 377 2222.",
    ],
  },
} as const
type K = keyof typeof ROUTES

export function Journey({ compact = false }: { compact?: boolean }) {
  const [k, setK] = useState<K>("usa")
  const r = ROUTES[k]
  return (
    <div className={`grid gap-10 ${compact ? "" : "lg:grid-cols-12"}`}>
      <div className={compact ? "" : "lg:col-span-4"}>
        <div role="tablist" aria-label="Choose where you fly from" className="inline-flex rounded-full border border-paper/25 p-1">
          {(Object.keys(ROUTES) as K[]).map(key => (
            <button key={key} role="tab" aria-selected={k === key} onClick={() => setK(key)} className={`min-h-11 rounded-full px-5 text-[15px] transition ${k === key ? "bg-paper text-ink" : "text-paper/80 hover:text-paper"}`}>{ROUTES[key].label}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease }} className="mt-8">
            <p className="label text-conch">{r.carrier}</p>
            <p className="mt-2 font-display text-2xl leading-snug">{r.from} to New Bight (CAT)</p>
            <ol className="mt-6 space-y-4 border-l border-paper/20 pl-5 text-[16px] leading-relaxed text-paper/80">
              {r.lines.map(l => <li key={l}>{l}</li>)}
              <li>From New Bight Airport, a local taxi or a rental car brings you south to Port Howe.</li>
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={compact ? "" : "lg:col-span-8"}>
        <svg viewBox="0 0 760 440" className="h-auto w-full" role="img" aria-label={`Route map: ${r.from} to New Bight, Cat Island, then by road to Port Howe. Schematic.`}>
          <path d="M60 0 C 92 60, 110 120, 96 220 C 90 280, 70 330, 40 380" fill="none" stroke="#f7f1ea" strokeOpacity=".35" strokeWidth="1.2" />
          <text x="40" y="60" fontSize="11" letterSpacing="2" fill="#f7f1ea" opacity=".55">FLORIDA</text>
          <path d="M330 250 C 360 240, 400 262, 396 320 C 392 380, 360 420, 334 410 C 318 380, 316 300, 330 250 Z" fill="#f7f1ea" fillOpacity=".07" stroke="#f7f1ea" strokeOpacity=".25" />
          <text x="300" y="440" fontSize="10" letterSpacing="2" fill="#f7f1ea" opacity=".4">ANDROS</text>
          <ellipse cx="440" cy="272" rx="16" ry="7" fill="#f7f1ea" fillOpacity=".12" stroke="#f7f1ea" strokeOpacity=".35" />
          <path d="M520 212 C 560 230, 584 280, 590 330" fill="none" stroke="#f7f1ea" strokeOpacity=".3" strokeWidth="6" strokeLinecap="round" />
          <text x="596" y="250" fontSize="10" letterSpacing="2" fill="#f7f1ea" opacity=".4">ELEUTHERA</text>
          <path d="M540 340 C 560 380, 600 420, 640 440" fill="none" stroke="#f7f1ea" strokeOpacity=".2" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
          <text x="520" y="425" fontSize="10" letterSpacing="2" fill="#f7f1ea" opacity=".4">EXUMA</text>
          <path d="M634 326 C 650 340, 662 358, 668 380 C 672 392, 684 398, 698 396" fill="none" stroke="#e1a999" strokeWidth="7" strokeLinecap="round" />
          <text x="720" y="318" textAnchor="end" fontSize="11" letterSpacing="2" fill="#e1a999">CAT ISLAND</text>
          <AnimatePresence mode="wait">
            <motion.path key={k} d={r.path} fill="none" stroke="#f7f1ea" strokeWidth="1.6" strokeDasharray="5 6" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease }} />
          </AnimatePresence>
          <motion.path d="M666 378 C 672 390, 682 395, 690 395" fill="none" stroke="#f7f1ea" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1, ease }} />
          {[[104, 112, "FXE", k === "usa"], [440, 272, "NASSAU", k === "nassau"]].map(([x, y, l, on]) => (
            <g key={l as string} opacity={on ? 1 : 0.45}>
              <circle cx={x as number} cy={y as number} r="5" fill="#f7f1ea" />
              <text x={(x as number) + 10} y={(y as number) - 10} fontSize="11" letterSpacing="2" fill="#f7f1ea">{l as string}</text>
            </g>
          ))}
          <circle cx="666" cy="376" r="5" fill="#f7f1ea" />
          <text x="560" y="372" fontSize="11" letterSpacing="2" fill="#f7f1ea">NEW BIGHT</text>
          <circle cx="692" cy="395" r="9" fill="#e1a999" />
          <circle cx="692" cy="395" r="18" fill="none" stroke="#e1a999" strokeOpacity=".6" />
          <text x="660" y="425" fontSize="12" letterSpacing="2" fill="#f7f1ea" fontWeight="600">PORT HOWE</text>
        </svg>
        <p className="label mt-2 text-right text-[10px] text-paper/45">Schematic, not to scale</p>
      </div>
    </div>
  )
}
