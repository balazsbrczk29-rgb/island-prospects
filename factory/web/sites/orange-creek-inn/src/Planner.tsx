import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Car, Plane, Bike } from "lucide-react"
import { FLIGHTS, ease } from "./site"

type From = keyof typeof FLIGHTS
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Planner() {
  const [from, setFrom] = useState<From>("nassau")
  const [day, setDay] = useState(5)
  const [carDays, setCarDays] = useState(2)
  const [bikeDays, setBikeDays] = useState(3)
  const f = FLIGHTS[from]
  const flies = (f.days as readonly number[]).includes(day)
  const extras = carDays * 80 + bikeDays * 10
  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
      <div className="rounded-[20px] border border-line bg-paper p-5 md:p-8">
        <div className="flex flex-wrap gap-1 rounded-full bg-sand/60 p-1" role="group" aria-label="Where you fly from">
          {(Object.keys(FLIGHTS) as From[]).map(k => (
            <button key={k} type="button" aria-pressed={from === k} onClick={() => setFrom(k)} className={`min-h-11 flex-1 rounded-full px-4 text-[15px] transition hover:-translate-y-px ${from === k ? "bg-ink text-paper" : ""}`}>{FLIGHTS[k].label}</button>
          ))}
        </div>
        <p className="mt-6 text-[11px] tracking-[0.2em] text-muted uppercase">Day you want to arrive</p>
        <div className="mt-3 grid grid-cols-7 gap-1" role="group" aria-label="Arrival day">
          {DAYS.map((d, i) => {
            const ok = (f.days as readonly number[]).includes(i)
            return (
              <button key={d} type="button" aria-pressed={day === i} onClick={() => setDay(i)} className={`relative min-h-11 rounded-xl border text-[14px] transition hover:-translate-y-px ${day === i ? "border-ink bg-ink text-paper" : "border-line"} ${ok ? "" : "text-muted/60"}`}>
                {d}{ok && <span className={`absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full ${day === i ? "bg-flats" : "bg-casuarina"}`} aria-hidden />}
              </button>
            )
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.ol key={`${from}-${day}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-8 border-l-2 border-dashed border-casuarina/40 pl-6" aria-live="polite">
            <li className="relative pb-6">
              <span className="absolute top-1 -left-[33px] flex size-4 items-center justify-center rounded-full bg-casuarina" aria-hidden />
              <p className="text-[11px] tracking-[0.2em] text-muted uppercase">{f.legs[0]}</p>
              {flies ? (
                <>
                  <p className="mt-1 flex items-center gap-2 font-display text-2xl"><Plane className="size-5 text-casuarina" aria-hidden /> {f.carrier}</p>
                  <ul className="mt-2 space-y-1 text-[15px] text-muted">{f.times.map(t => <li key={t}>{t}</li>)}</ul>
                </>
              ) : (
                <p className="mt-1 text-[16px]">No scheduled {f.carrier} flight on {DAYS[day]}. Try a highlighted day, or ask about a charter.</p>
              )}
            </li>
            <li className="relative pb-6">
              <span className="absolute top-1 -left-[33px] size-4 rounded-full border-2 border-casuarina bg-paper" aria-hidden />
              <p className="text-[11px] tracking-[0.2em] text-muted uppercase">{f.legs[1]}</p>
              <p className="mt-1 font-display text-2xl">Land, then 3.5 miles</p>
              <p className="mt-1 text-[15px] text-muted">The inn offers airport pickup. A taxi from Arthur’s Town Airport is about $15.</p>
            </li>
            <li className="relative">
              <span className="absolute top-1 -left-[33px] size-4 rounded-full bg-flats" aria-hidden />
              <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Orange Creek</p>
              <p className="mt-1 font-display text-2xl">Check in, cross the road, swim.</p>
            </li>
          </motion.ol>
        </AnimatePresence>
        <p className="mt-6 text-[13px] text-muted">{f.note} Schedules as published by the inn; confirm with the airline.</p>
      </div>

      <div className="flex flex-col justify-between rounded-[20px] bg-casuarina-deep p-5 text-paper md:p-8">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-flats uppercase">Getting around the island</p>
          <p className="mt-2 font-display text-3xl leading-tight">Car or bicycle, your call.</p>
          {[["Car rental days", carDays, setCarDays, Car, "$80 a day on average"], ["Bicycle days", bikeDays, setBikeDays, Bike, "$10 a day"]].map(([l, v, set, Icon, sub]) => {
            const I = Icon as typeof Car
            const s = set as (n: number) => void
            const n = v as number
            return (
              <div key={l as string} className="mt-7 flex items-center justify-between gap-4 border-t border-paper/15 pt-5">
                <div className="flex items-center gap-3"><I className="size-5 text-flats" aria-hidden /><div><p className="text-[16px]">{l as string}</p><p className="text-[13px] text-paper/60">{sub as string}</p></div></div>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label={`Fewer ${l}`} onClick={() => s(Math.max(0, n - 1))} className="size-11 rounded-full border border-paper/30 text-xl transition hover:-translate-y-px hover:border-paper">−</button>
                  <span className="w-8 text-center font-display text-2xl tabular-nums" aria-live="polite">{n}</span>
                  <button type="button" aria-label={`More ${l}`} onClick={() => s(Math.min(14, n + 1))} className="size-11 rounded-full border border-paper/30 text-xl transition hover:-translate-y-px hover:border-paper">+</button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-10 border-t border-paper/15 pt-6">
          <p className="text-[11px] tracking-[0.2em] text-flats uppercase">Estimated transport on the island</p>
          <p className="mt-1 font-display text-5xl tabular-nums">${extras}</p>
          <p className="mt-2 text-[13px] text-paper/60">From the averages the inn publishes. Cars can wait at the airport on arrival.</p>
        </div>
      </div>
    </div>
  )
}
