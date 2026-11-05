import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { BOOK, IMG, ease } from "./site"

export const ROOMS = [
  {
    id: "king",
    name: "Executive King Room",
    img: `${IMG}Cat-Island-Greenwood-room-1024x683.jpg`, w: 1024, h: 683,
    line: "A king bed, a few steps from the sand.",
    for: "Couples and solo travellers",
    notes: ["King bed", "Private bathroom", "Book direct online"],
  },
  {
    id: "family",
    name: "Executive Family Room",
    img: `${IMG}King-size-AC-room-1-of-1-scaled-e1786570117617-1024x623.jpg`, w: 1024, h: 623,
    line: "Space for the whole family, by the beach.",
    for: "Families and small groups",
    notes: ["Space for families", "Private bathroom", "Book direct online"],
  },
]

export function RoomSelector() {
  const [id, setId] = useState(ROOMS[0].id)
  const r = ROOMS.find(x => x.id === id)!
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-sand lg:col-span-7">
        <AnimatePresence mode="popLayout">
          <motion.img key={r.id} src={r.img} alt={`${r.name} at Greenwood Beach Resort`} width={r.w} height={r.h} loading="lazy" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }} className="absolute inset-0 size-full object-cover" />
        </AnimatePresence>
      </div>
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Choose a room" className="border-t border-line">
          {ROOMS.map((x, i) => (
            <button key={x.id} role="tab" aria-selected={id === x.id} onClick={() => setId(x.id)} className="group flex w-full items-baseline gap-5 border-b border-line py-6 text-left">
              <span className={`text-sm transition ${id === x.id ? "text-grape" : "text-muted"}`}>0{i + 1}</span>
              <span className={`font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight transition group-hover:translate-x-1 ${id === x.id ? "text-ink" : "text-ink/45"}`}>{x.name}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="mt-8">
            <p className="text-[18px] leading-relaxed">{r.line}</p>
            <p className="label mt-5 text-muted">{r.for}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{r.notes.map(n => <li key={n} className="rounded-full border border-line px-3 py-1.5 text-[14px]">{n}</li>)}</ul>
            <a href={BOOK} className="btn mt-8">Check dates for this room <ArrowUpRight className="size-4" aria-hidden /></a>
            <p className="mt-3 text-[13px] text-muted">Rates and availability on the resort's own booking page.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
