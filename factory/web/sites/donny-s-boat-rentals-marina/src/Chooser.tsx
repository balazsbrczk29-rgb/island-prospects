import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Minus, Plus, MessageCircle } from "lucide-react"
import { BOATS, cost, wa, EMAIL } from "./data"
import { ease } from "./site"

export default function Chooser() {
  const [id, setId] = useState<string>("century")
  const [days, setDays] = useState(3)
  const [start, setStart] = useState("")
  const [stay, setStay] = useState("")
  const b = BOATS.find(x => x.id === id)!
  const total = cost(b.day, b.week, days)
  const msg = `Hi Taylor, I'd like to rent the ${b.name} for ${days} days${start ? ` from ${start}` : ""}.${stay ? ` We're staying at ${stay}, Green Turtle Cay.` : ""} Estimate from your rates: $${total.toLocaleString()}.`
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Choose a boat">
          {BOATS.map(x => (
            <button key={x.id} type="button" role="radio" aria-checked={id === x.id} onClick={() => setId(x.id)} className={`min-h-16 rounded-2xl border-2 px-4 py-3 text-left transition hover:-translate-y-px ${id === x.id ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink/40"}`}>
              <span className="block font-display text-[1.15rem] leading-tight">{x.name}</span>
              <span className={`block text-[13px] ${id === x.id ? "text-paper/70" : "text-muted"}`}>${x.day} a day</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="photo aspect-[4/3] rounded-3xl"><img src={b.img} alt={`The ${b.name} rental boat at Donny's`} loading="lazy" width={800} height={600} className="size-full object-cover" /></div>
            <div>
              <p className="font-display text-[2rem] leading-none">{b.name}</p>
              <dl className="mt-5 divide-y divide-line border-y border-line text-[15px]">
                <div className="flex justify-between py-2.5"><dt className="text-muted">Engine</dt><dd>{b.hp}</dd></div>
                <div className="flex justify-between py-2.5"><dt className="text-muted">Suits</dt><dd>{b.people}</dd></div>
                <div className="flex justify-between py-2.5"><dt className="text-muted">Rates</dt><dd className="tnum">${b.day} a day · ${b.week.toLocaleString()} a week</dd></div>
              </dl>
              <ul className="mt-4 flex flex-wrap gap-1.5">{b.kit.map(k => <li key={k} className="rounded-full bg-sand/70 px-3 py-1 text-[13px]">{k}</li>)}</ul>
              {b.exp && <p className="mt-4 text-[14px] font-semibold text-turtle">Boating experience required.</p>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="lg:col-span-5">
        <div className="rounded-3xl bg-ink p-7 text-paper md:p-9">
          <p className="text-[12px] font-bold tracking-[0.16em] text-flats uppercase">Your rental</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[15px] text-paper/75">Days (3 minimum)</span>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Fewer days" onClick={() => setDays(d => Math.max(3, d - 1))} className="inline-flex size-11 items-center justify-center rounded-full border border-paper/30 transition hover:bg-paper hover:text-ink"><Minus className="size-4" /></button>
              <span className="w-10 text-center font-display text-[2rem] tnum" aria-live="polite">{days}</span>
              <button type="button" aria-label="More days" onClick={() => setDays(d => Math.min(28, d + 1))} className="inline-flex size-11 items-center justify-center rounded-full border border-paper/30 transition hover:bg-paper hover:text-ink"><Plus className="size-4" /></button>
            </div>
          </div>
          <label className="mt-5 block"><span className="text-[12px] font-bold tracking-[0.14em] text-paper/60 uppercase">First day</span><input type="date" value={start} onChange={e => setStart(e.target.value)} className="mt-1 block min-h-12 w-full border-b border-paper/30 bg-transparent text-lg text-paper outline-none [color-scheme:dark] focus:border-flats" /></label>
          <label className="mt-5 block"><span className="text-[12px] font-bold tracking-[0.14em] text-paper/60 uppercase">Where you're staying on the cay</span><input value={stay} onChange={e => setStay(e.target.value)} className="mt-1 block min-h-12 w-full border-b border-paper/30 bg-transparent text-lg text-paper outline-none focus:border-flats" /></label>
          <div className="mt-7 flex items-end justify-between border-t border-paper/20 pt-5">
            <span className="text-[14px] text-paper/70">Estimate at published rates</span>
            <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-[2.6rem] leading-none tnum">${total.toLocaleString()}</motion.span>
          </div>
          <a href={wa(msg)} className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-buoy px-6 font-bold text-ink transition hover:-translate-y-px"><MessageCircle className="size-4" aria-hidden /> Reserve on WhatsApp</a>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Booking request - ${b.name}`)}&body=${encodeURIComponent(msg)}`} className="mt-3 block text-center text-[14px] text-paper/70 underline decoration-flats underline-offset-4 hover:text-paper">or send it by email</a>
          <p className="mt-4 text-[13px] text-paper/55">Cash only: no ATM on the island, no credit cards. $100 non-refundable deposit.</p>
        </div>
      </div>
    </div>
  )
}
