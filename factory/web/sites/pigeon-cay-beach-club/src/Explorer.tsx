import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { COTTAGES, I } from "./data"
import { ease } from "./site"

export function Explorer() {
  const [id, setId] = useState(COTTAGES[0].id)
  const [pic, setPic] = useState(0)
  const c = COTTAGES.find(x => x.id === id)!
  const pick = (x: string) => { setId(x); setPic(0) }
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol role="tablist" aria-label="Choose a cottage" className="border-t border-line lg:col-span-4">
        {COTTAGES.map((x, i) => (
          <li key={x.id}>
            <button role="tab" aria-selected={id === x.id} onClick={() => pick(x.id)} className="group grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b border-line py-4 text-left">
              <span className={`font-display text-sm italic ${id === x.id ? "text-thatch" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={`font-display text-[1.55rem] leading-tight transition group-hover:translate-x-1 ${id === x.id ? "text-ink" : "text-ink/50"}`}>{x.name}</span>
              <span className={`text-[14px] tabular-nums ${id === x.id ? "text-ink" : "text-muted"}`}>${x.rate}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="lg:col-span-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-paper-2 md:aspect-[16/10]">
          <AnimatePresence mode="popLayout">
            <motion.img key={c.imgs[pic]} src={I + c.imgs[pic]} alt={`${c.name} cottage at Pigeon Cay Beach Club, photo ${pic + 1}`} loading="lazy" width={1200} height={800} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }} className="absolute inset-0 size-full object-cover" />
          </AnimatePresence>
          <div className="absolute bottom-4 left-4 flex gap-1.5" role="group" aria-label="Photos">
            {c.imgs.map((_, i) => <button key={i} type="button" aria-label={`Photo ${i + 1} of ${c.imgs.length}`} onClick={() => setPic(i)} className="flex size-11 items-center justify-center"><span className={`block h-1.5 rounded-full transition-all ${pic === i ? "w-8 bg-paper" : "w-3 bg-paper/60"}`} /></button>)}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.dl key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[["Sleeps", `Up to ${c.guests}`], ["Beds", c.beds], ["Kitchen", c.kitchen], ["Per night", `$${c.rate}`]].map(([k, v]) => (
              <div key={k} className="border-t border-ink/20 pt-3"><dt className="label text-muted">{k}</dt><dd className="mt-1 font-display text-xl leading-snug">{v}</dd></div>
            ))}
          </motion.dl>
        </AnimatePresence>
        <a href="#estimate" onClick={() => window.dispatchEvent(new CustomEvent("pc-cottage", { detail: c.id }))} className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px]">Estimate a stay in {c.name} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </div>
    </div>
  )
}
