// The main feature: pick a boat and your days, see the cost from Donny's published rates,
// then send Taylor a complete WhatsApp request (or an email, Donny's preferred channel).
import { useEffect, useId, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, Mail } from 'lucide-react'
import { FLEET, estimate, usd, wa, mail, wix } from './data'
import { WhatsAppGlyph, ease } from './site'

const MIN = 3, MAX = 14

export default function Planner() {
  const [boatId, setBoatId] = useState(FLEET[2].id)
  const [days, setDays] = useState(7)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(2)
  const [where, setWhere] = useState('')
  const ids = { date: useId(), people: useId(), where: useId(), days: useId() }
  const boat = FLEET.find(b => b.id === boatId)!
  const maxPeople = boat.id === 'whaler17' ? 3 : boat.id === 'whaler19' ? 4 : 6

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('boat'); if (q && FLEET.some(b => b.id === q)) setBoatId(q)
    const on = (e: Event) => setBoatId((e as CustomEvent<string>).detail)
    window.addEventListener('donny:boat', on); return () => window.removeEventListener('donny:boat', on)
  }, [])
  useEffect(() => { if (people > maxPeople) setPeople(maxPeople) }, [maxPeople, people])

  const total = estimate(boat, days)
  const weeks = Math.floor(days / 7), rest = days % 7
  const breakdown = [weeks ? `${weeks === 1 ? '1 week' : `${weeks} weeks`} at ${usd(boat.week)}` : '', rest ? `${rest} ${rest === 1 ? 'day' : 'days'} at ${usd(boat.day)}` : ''].filter(Boolean).join(' + ')
  const nice = date ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' }) : ''
  const message = useMemo(() => [
    `Hello Taylor, I'd like to rent the ${boat.name} from Donny's.`,
    `Days: ${days}${nice ? `, starting ${nice}` : ''}`,
    `People: ${people}`,
    where ? `Staying at: ${where}, Green Turtle Cay` : 'Staying on Green Turtle Cay',
    `My estimate from your published rates: ${usd(total)} (${breakdown}). Is the boat free?`,
  ].join('\n'), [boat, days, nice, people, where, total, breakdown])

  return (
    <section id="plan" data-quiet aria-labelledby="plan-title" className="bg-sand px-5 md:px-[4vw] py-20 md:py-28 scroll-mt-4">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[1.15fr_1fr] items-start">
          <form className="grid gap-10" onSubmit={e => e.preventDefault()}>
            <div>
              <h2 id="plan-title" className="text-[2.5rem] md:text-[4rem] tracking-[-0.045em] max-w-[13ch]">Three days to two weeks: what your boat costs</h2>
              <p className="mt-4 max-w-[48ch] text-muted">Choose a boat and how long you stay. The total comes from Donny&rsquo;s published rates, and Taylor confirms it on WhatsApp.</p>
            </div>
            <fieldset>
              <legend className="font-semibold mb-4">Boat</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {FLEET.map(b => {
                  const on = b.id === boatId
                  return (
                    <label key={b.id} className={`relative flex items-center gap-4 p-2.5 pr-4 rounded-[var(--radius-md)] cursor-pointer transition-[background-color,box-shadow] duration-200 ${on ? 'bg-white shadow-[inset_0_0_0_2px_var(--color-channel)]' : 'bg-white/55 hover:bg-white'}`}>
                      <input type="radio" name="boat" value={b.id} checked={on} onChange={() => setBoatId(b.id)} className="sr-only" />
                      <span className="ph size-16 shrink-0 rounded-[calc(var(--radius-md)-10px)]"><img src={wix(b.cover, 200)} alt="" loading="lazy" /></span>
                      <span className="leading-tight">
                        <span className="block font-semibold">{b.name}</span>
                        <span className="block text-[0.9375rem] text-muted tnum mt-1">{usd(b.day)} a day, {b.people}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p id={ids.days} className="font-semibold mb-3">Days</p>
                <div className="flex items-center gap-3" role="group" aria-labelledby={ids.days}>
                  <button type="button" aria-label="One day fewer" disabled={days <= MIN} onClick={() => setDays(d => Math.max(MIN, d - 1))}
                    className="grid place-items-center size-12 rounded-full bg-white disabled:opacity-35 hover:bg-flats transition-colors"><Minus size={18} strokeWidth={1.75} /></button>
                  <output aria-live="polite" className="w-16 text-center font-sans font-semibold text-[2.25rem] tnum">{days}</output>
                  <button type="button" aria-label="One day more" disabled={days >= MAX} onClick={() => setDays(d => Math.min(MAX, d + 1))}
                    className="grid place-items-center size-12 rounded-full bg-white disabled:opacity-35 hover:bg-flats transition-colors"><Plus size={18} strokeWidth={1.75} /></button>
                </div>
                <p className="mt-2 text-[0.9375rem] text-muted">Three days minimum{days >= MAX ? '. Longer? Ask Taylor.' : ''}</p>
              </div>
              <div>
                <label htmlFor={ids.date} className="block font-semibold mb-3">First day</label>
                <input id={ids.date} type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-line)]" />
              </div>
              <div>
                <label htmlFor={ids.people} className="block font-semibold mb-3">People</label>
                <select id={ids.people} value={people} onChange={e => setPeople(+e.target.value)}
                  className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-line)]">
                  {Array.from({ length: maxPeople }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor={ids.where} className="block font-semibold mb-3">Where you&rsquo;re staying</label>
                <input id={ids.where} type="text" value={where} onChange={e => setWhere(e.target.value)} placeholder="House or rental name" autoComplete="off"
                  className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-muted/80" />
              </div>
            </div>
          </form>

          <div className="lg:sticky lg:top-8 bg-white rounded-[var(--radius-lg)] p-6 md:p-10" aria-live="polite">
            <p className="font-semibold">{boat.name}, {days} days</p>
            <div className="mt-2 h-[5.5rem] md:h-[6.5rem] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p key={total} initial={{ y: '60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-60%', opacity: 0 }} transition={{ duration: 0.28, ease }}
                  className="font-sans font-bold text-[4.25rem] md:text-[5.25rem] leading-none tracking-[-0.04em] tnum">{usd(total)}</motion.p>
              </AnimatePresence>
            </div>
            <p className="text-muted tnum">{breakdown}</p>
            <ul className="mt-7 grid gap-2.5 text-[1rem] list-none p-0">
              <li>Paid in full in cash before you start. No ATM on the island, no cards.</li>
              <li>A $100 deposit is required and is non-refundable.</li>
              {boat.experience && <li>This boat needs boating experience.</li>}
            </ul>
            <div className="mt-8 grid gap-3">
              <a className="btn btn-primary w-full" href={wa(message)} target="_blank" rel="noopener"><WhatsAppGlyph />Send to Taylor on WhatsApp</a>
              <a className="btn btn-ghost w-full" href={mail(`Boat rental request: ${boat.name}, ${days} days`, message)}><Mail size={18} strokeWidth={1.75} aria-hidden="true" />Email Donny instead</a>
            </div>
            <p className="mt-4 text-[0.875rem] text-muted">Nothing is booked or paid here. Taylor replies to confirm the boat and dates.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
