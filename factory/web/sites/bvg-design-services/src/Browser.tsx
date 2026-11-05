import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RotateCcw, Search } from "lucide-react"

const QUERY = "web design freeport bahamas"
const ease = [0.16, 1, 0.3, 1] as const

/** The craft itself: a browser that receives a Bahamian search and assembles a site in the flag colours. */
export default function Browser() {
  const [run, setRun] = useState(0)
  const [typed, setTyped] = useState(0)
  const [stage, setStage] = useState(0) // 0 typing, 1..4 assembling
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) { setTyped(QUERY.length); setStage(4); return }
    setTyped(0); setStage(0)
    const timers: number[] = []
    for (let i = 1; i <= QUERY.length; i++) timers.push(window.setTimeout(() => setTyped(i), 500 + i * 32))
    const t0 = 500 + QUERY.length * 32 + 250
    ;[1, 2, 3, 4].forEach((s, i) => timers.push(window.setTimeout(() => setStage(s), t0 + i * 300)))
    return () => timers.forEach(clearTimeout)
  }, [run])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_40px_80px_-40px_rgba(16,21,21,.45)]">
        <div className="flex items-center gap-3 border-b border-ink/10 bg-paper-2 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#e3a8a0]" /><i className="size-2.5 rounded-full bg-gold" /><i className="size-2.5 rounded-full bg-aqua/70" /></span>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] text-ink">
            <Search className="size-3.5 shrink-0 text-muted" aria-hidden />
            <span className="truncate">{QUERY.slice(0, typed)}</span>
            {stage === 0 && <span className="caret h-4 w-px bg-ink" aria-hidden />}
          </div>
          <button type="button" onClick={() => setRun(r => r + 1)} className="group inline-flex size-9 items-center justify-center rounded-full text-muted transition hover:bg-white hover:text-ink" aria-label="Replay the build">
            <RotateCcw className="size-4 transition duration-500 group-hover:-rotate-180" />
          </button>
        </div>
        <div className="relative aspect-[5/4] bg-white p-4 md:p-6">
          <AnimatePresence>
            {stage === 0 && (
              <motion.div key="blank" exit={{ opacity: 0 }} className="absolute inset-4 grid place-items-center rounded-xl border border-dashed border-ink/15 md:inset-6">
                <span className="text-[13px] text-muted">A Bahamian business, about to be found</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex h-full flex-col gap-3">
            <motion.div initial={false} animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }} transition={{ duration: 0.6, ease }} className="flex items-center justify-between rounded-lg bg-ink px-3 py-2.5">
              <span className="flex items-center gap-2"><i className="size-3 rounded-full bg-gold" /><b className="font-display text-[13px] text-paper">Your business, Lucaya</b></span>
              <span className="hidden gap-3 text-[11px] text-paper/70 sm:flex"><span>Rooms</span><span>Island</span><span>Contact</span></span>
            </motion.div>
            <motion.div initial={false} animate={stage >= 2 ? { clipPath: "inset(0 0% 0 0 round 12px)" } : { clipPath: "inset(0 100% 0 0 round 12px)" }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }} className="relative flex-1 overflow-hidden rounded-xl bg-aqua-soft">
              <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden>
                <circle cx="250" cy="120" r="24" fill="#f2c230" />
                <path d="M0 150 C80 138 140 160 220 148 S340 136 400 146 L400 220 L0 220Z" fill="#007f88" />
                <path d="M0 172 C90 162 160 182 250 170 S350 162 400 170 L400 220 L0 220Z" fill="#0b5f66" />
                <g transform="translate(270 0)"><path d="M58 150 C58 118 64 96 70 82" stroke="#101515" strokeWidth="3" fill="none" />
                <path d="M70 82 C56 76 44 80 36 90 M70 82 C80 70 94 70 104 76 M70 82 C64 66 66 56 72 48 M70 82 C88 82 96 92 98 102" stroke="#101515" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
              </svg>
              <motion.p initial={false} animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.7, ease }} className="absolute top-4 left-4 max-w-[70%] font-display text-[clamp(1.1rem,2.2vw,1.9rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink">Your business, clear on every phone.</motion.p>
            </motion.div>
            <motion.div initial={false} animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.6, ease }} className="flex items-center gap-2">
              <span className="rounded-full bg-ink px-3 py-1.5 text-[11px] text-paper">Ask about a room</span>
              <span className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] text-ink">Call the front desk</span>
              <span className="ml-auto hidden text-[11px] text-muted sm:block">Mobile ready · Search ready</span>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-muted">An example build, not a client site.</p>
    </div>
  )
}
