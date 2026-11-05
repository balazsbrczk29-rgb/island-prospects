import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { ease, REGISTER } from "./site"

const FIELDS = [
  { k: "Registrant", v: "Bahamas Securities (1987) Limited", why: "The legal name you will see on every agreement with us." },
  { k: "Registered activity", v: "Advising on Capital Market Instruments", why: "What the Commission permits us to do: give investment advice." },
  { k: "Address", v: "Gresham House, Charlotte Street South", why: "Our office in Nassau, as filed with the regulator." },
  { k: "P.O. Box", v: "N-10144", why: "Our postal address, the same as in our directory listings." },
  { k: "Register date", v: "As at 30 September 2026", why: "The most recent published list of firms registered under the Securities Industry Act, 2024." },
]

export default function Record({ compact = false }: { compact?: boolean }) {
  const [i, setI] = useState(1)
  return (
    <div className="relative border border-line bg-[#fbfaf7] shadow-[0_40px_60px_-50px_rgba(22,26,24,.5)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-6">
        <p className="label text-muted">Public register extract</p>
        <p className="label text-green">Securities Industry Act, 2024</p>
      </div>
      <div>
        {FIELDS.map((f, k) => (
          <button key={f.k} type="button" onClick={() => setI(k)} onMouseEnter={() => setI(k)} aria-pressed={i === k} className={`grid w-full gap-1 border-b border-line px-5 py-3.5 text-left transition md:grid-cols-[10rem_1fr] md:px-6 ${i === k ? "bg-tint" : "hover:bg-paper-2"}`}>
            <span className="label pt-1 !text-[11px] text-muted">{f.k}</span>
            <span className={`block font-display ${compact ? "text-[1.2rem]" : "text-[1.35rem]"} leading-snug`}>{f.v}</span>
          </button>
        ))}
      </div>
      <div className="min-h-[5.5rem] px-5 py-4 md:px-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.35, ease }} className="text-[15px] leading-relaxed text-muted">{FIELDS[i].why}</motion.p>
        </AnimatePresence>
        <a href={REGISTER} rel="noopener" className="group mt-2 inline-flex items-center gap-1.5 text-[15px] text-green"><span className="ulink">Check it on the Commission's register</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
      </div>
    </div>
  )
}
