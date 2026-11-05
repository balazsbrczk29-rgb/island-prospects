import { useState } from "react"
import { motion } from "motion/react"
import { Mail, Radio } from "lucide-react"
import { EMAIL } from "./data"
import { ease } from "./site"

export default function SlipCheck() {
  const [loa, setLoa] = useState(38)
  const [draft, setDraft] = useState(5)
  const fitsLen = loa <= 50, fitsDraft = draft <= 7
  const tide = draft >= 5 && draft <= 7
  const ok = fitsLen && fitsDraft
  const scale = Math.min(loa / 50, 1.3)
  const body = `Hello Donny, I'd like to ask about dockage. Boat: ${loa} ft LOA, ${draft} ft draft. Arrival: `
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-3xl bg-flats/30 p-6">
          <svg viewBox="0 0 640 260" className="block w-full" role="img" aria-label={`Your ${loa} ft boat drawn against Donny's 50 ft dockage limit and 7 ft draft limit`}>
            <rect x="0" y="120" width="640" height="140" fill="#8fd0c6" fillOpacity=".35" />
            <path d="M0 120 H640" stroke="#0f2a33" strokeWidth="1.5" />
            <path d="M40 34 H600" stroke="#0f2a33" strokeDasharray="3 5" />
            <text x="40" y="26" fontSize="13" fill="#5b6466" fontFamily="Nunito Sans, sans-serif">Dockage up to 50 ft LOA</text>
            <path d="M600 28 V40 M40 28 V40" stroke="#0f2a33" />
            <path d="M40 222 H600" stroke="#0f2a33" strokeDasharray="3 5" />
            <text x="604" y="226" fontSize="13" fill="#5b6466" fontFamily="Nunito Sans, sans-serif">7 ft</text>
            <motion.g animate={{ scaleX: scale }} transition={{ duration: 0.6, ease }} style={{ transformOrigin: "40px 120px" }}>
              <path d="M40 120 L60 92 H520 Q580 92 600 108 L590 120 Z" fill={fitsLen ? "#f5f4ef" : "#f4c430"} stroke="#0f2a33" strokeWidth="2" />
              <path d="M200 92 V60 H380 L420 92" fill="none" stroke="#0f2a33" strokeWidth="2" />
            </motion.g>
            <motion.rect x="200" y="120" width="300" initial={false} animate={{ height: Math.min(draft, 9) * 14.5 }} transition={{ duration: 0.6, ease }} fill={fitsDraft ? "#0f2a33" : "#f4c430"} fillOpacity=".8" />
          </svg>
          <p className="mt-2 text-[12px] font-bold tracking-[0.14em] text-muted uppercase">Illustration, not to scale</p>
        </div>
      </div>
      <div className="space-y-7 lg:col-span-5">
        <label className="block"><span className="flex justify-between text-[14px] font-semibold"><span>Length overall</span><span className="tnum">{loa} ft</span></span><input type="range" min={16} max={70} value={loa} onChange={e => setLoa(+e.target.value)} className="mt-3 w-full accent-[#256a5a]" /></label>
        <label className="block"><span className="flex justify-between text-[14px] font-semibold"><span>Draft</span><span className="tnum">{draft} ft</span></span><input type="range" min={1} max={10} step={0.5} value={draft} onChange={e => setDraft(+e.target.value)} className="mt-3 w-full accent-[#256a5a]" /></label>
        <div className={`rounded-3xl p-6 ${ok ? "bg-turtle text-paper" : "bg-buoy text-ink"}`} aria-live="polite">
          <p className="font-display text-[1.7rem] leading-tight">{ok ? "Within Donny's published limits." : !fitsLen ? "Longer than the 50 ft limit." : "Deeper than the 7 ft limit."}</p>
          <p className="mt-2 text-[15px] opacity-85">{ok ? (tide ? "Mind the tide: a 6 ft draft enters Black Sound at 2 ft above low water. Stay close to the last red marker, then aim for the middle of the sound." : "Ask about a fixed-price slip or a mooring.") : "Call or radio Donny before you set out."}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Dockage enquiry")}&body=${encodeURIComponent(body)}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper transition hover:-translate-y-px hover:bg-turtle"><Mail className="size-4" aria-hidden /> Ask about a slip</a>
          <span className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 px-5 text-[15px]"><Radio className="size-4" aria-hidden /> VHF 16</span>
        </div>
      </div>
    </div>
  )
}
