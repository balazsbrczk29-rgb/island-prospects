import { useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Minus, Plane, Plus, Car } from "lucide-react"
import { BOOK, EMAIL, NAME, ORIGINS, longDate, offersFor, shortDate, wayFor, type Origin } from "./facts"
import { usePlan } from "./site"

function Stepper({ id, label, value, set, min, max, unit }: { id: string; label: string; value: number; set: (n: number) => void; min: number; max: number; unit: [string, string] }) {
  return (
    <div className="f">
      <span className="f__label" id={id}>{label}</span>
      <div className="step" role="group" aria-labelledby={id}>
        <button type="button" aria-label={`Fewer ${unit[1]}`} disabled={value <= min} onClick={() => set(value - 1)}><Minus aria-hidden /></button>
        <output className="num" aria-live="polite">{value} <span>{value === 1 ? unit[0] : unit[1]}</span></output>
        <button type="button" aria-label={`More ${unit[1]}`} disabled={value >= max} onClick={() => set(value + 1)}><Plus aria-hidden /></button>
      </div>
    </div>
  )
}

export function mailFor(arrive: string, nights: number, guests: number, origin: Origin, offers: string[]) {
  const from = ORIGINS.find(o => o.id === origin)!.label
  const body = [`Hello ${NAME},`, "", "We would like a studio:", `Arriving ${longDate(arrive)}, ${nights} nights, leaving ${longDate(arrive, nights)}`, `Guests: ${guests}`, `Travelling from: ${from}`,
    offers.length ? `Offers we saw on your site: ${offers.join("; ")}` : "", "", "Thank you."].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n")
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`Dates: ${nights} nights from ${longDate(arrive)}`)}&body=${encodeURIComponent(body)}`
}

/** The hero tool: dates in, then the offers that fit and the way here for that day light up underneath. */
export default function DatesBar() {
  const { arrive, nights, guests, origin, set } = usePlan()
  const offers = useMemo(() => offersFor(nights, origin, arrive || null), [nights, origin, arrive])
  const fits = offers.filter(o => o.status === "ok")
  const way = wayFor(arrive || null, origin)
  return (
    <form className="bar" onSubmit={e => e.preventDefault()} aria-label="Check your dates">
      <div className="bar__fields">
        <div className="f f--date">
          <label className="f__label" htmlFor="arrive">Arriving</label>
          <input id="arrive" type="date" className="num" value={arrive} min="2026-11-21" max="2027-12-31" required onChange={e => e.target.value && set({ arrive: e.target.value })} />
        </div>
        <Stepper id="nights-l" label="Staying" value={nights} set={n => set({ nights: n })} min={1} max={21} unit={["night", "nights"]} />
        <Stepper id="guests-l" label="Guests" value={guests} set={n => set({ guests: n })} min={1} max={8} unit={["guest", "guests"]} />
        <div className="f f--from">
          <label className="f__label" htmlFor="from">Flying from</label>
          <select id="from" value={origin} onChange={e => set({ origin: e.target.value as Origin })}>
            {ORIGINS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        <div className="bar__go">
          <a className="btn" href={BOOK} target="_blank" rel="noopener">Check availability <ArrowUpRight aria-hidden /></a>
        </div>
      </div>

      <div className="bar__out" aria-live="polite">
        <div className="out out--stay">
          <p className="out__k">Your stay</p>
          <p className="out__v num"><span>{shortDate(arrive)}</span> <span className="out__to">to {shortDate(arrive, nights)}</span></p>
          <p className="out__n">Check-in 2:00 pm, check-out noon. Rates on request, or <a className="link" href={mailFor(arrive, nights, guests, origin, fits.map(o => o.title))}>email these dates</a>.</p>
        </div>
        <div className="out out--offers">
          <p className="out__k"><span className="num">{fits.length}</span> published {fits.length === 1 ? "offer fits" : "offers fit"} these dates</p>
          <ul className="lit">
            <AnimatePresence initial={false} mode="popLayout">
              {offers.map(o => (
                <motion.li key={o.id} layout="position" data-on={o.status === "ok"} title={o.note}
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ type: "spring", stiffness: 420, damping: 32 }}>
                  {o.title}
                </motion.li>
              ))}
            </AnimatePresence>
            {offers.length === 0 && <li data-on="false">Offers start at two nights</li>}
          </ul>
          {offers.some(o => o.status !== "ok") && <a className="out__n link" href="#offers">Why some do not fit</a>}
        </div>
        <div className="out out--way">
          <p className="out__k">Your way here</p>
          <p className="out__v"><Plane aria-hidden /> <span>{way.air}, <span className="num" data-warn={!way.ok}>{way.times}</span></span></p>
          <p className="out__v"><Car aria-hidden /> <span>Then 3.5 miles: we collect you, or a taxi is about $15.</span></p>
          <p className="out__n">{way.note}</p>
        </div>
      </div>
    </form>
  )
}
