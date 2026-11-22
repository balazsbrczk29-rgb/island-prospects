// The core tool, on screen 1: the dock office trip sheet.
// Tab 1 "Rent a boat": pick a boat and days, see the total from Donny's published rates, send it to Taylor on WhatsApp.
// Tab 2 "Does my boat fit?": LOA, draft, nights and berth against the published limits and dockage rates.
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, TriangleAlert, Check, Radio } from 'lucide-react'
import { FLEET, estimate, usd, wa, mail, wix, stayCost, fit, AMP30, ENTRY_NOTE, MARINA, type Berth } from './data'
import { WhatsAppGlyph, ease } from './site'

type Tab = 'rent' | 'fit'
const today = () => new Date().toLocaleDateString('en-CA')

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div className="h-[3.75rem] md:h-[4.75rem] overflow-hidden" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p key={value} initial={{ y: '70%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-70%', opacity: 0 }} transition={{ duration: 0.28, ease }}
          aria-hidden="true" className="font-sans font-bold text-[3.5rem] md:text-[4.5rem] leading-none tracking-[-0.04em] tnum">{value}</motion.p>
      </AnimatePresence>
    </div>
  )
}

function Stepper({ label, value, min, max, step = 1, unit, onChange, format = (n: number) => String(n) }: {
  label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (n: number) => void; format?: (n: number) => string
}) {
  const id = useId()
  return (
    <div>
      <p id={id} className="text-[0.9375rem] font-semibold mb-2">{label}</p>
      <div className="flex items-center gap-1.5 h-12 rounded-[var(--radius-sm)] bg-ground px-1" role="group" aria-labelledby={id}>
        <button type="button" aria-label={`Less, ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(Math.max(min, +(value - step).toFixed(1)))}
          className="grid place-items-center size-11 rounded-[6px] hover:bg-surface disabled:opacity-30 transition-colors active:scale-95"><Minus size={17} strokeWidth={1.75} /></button>
        <output aria-live="polite" className="flex-1 text-center font-semibold text-[1.25rem] tnum">{format(value)}<span className="text-[0.9375rem] font-medium text-muted"> {unit}</span></output>
        <button type="button" aria-label={`More, ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(Math.min(max, +(value + step).toFixed(1)))}
          className="grid place-items-center size-11 rounded-[6px] hover:bg-surface disabled:opacity-30 transition-colors active:scale-95"><Plus size={17} strokeWidth={1.75} /></button>
      </div>
    </div>
  )
}

function Rent() {
  const [boatId, setBoatId] = useState(FLEET[2].id)
  const [days, setDays] = useState(7)
  const [date, setDate] = useState('')
  const [people, setPeople] = useState(2)
  const [where, setWhere] = useState('')
  const [flash, setFlash] = useState(0)
  const dateId = useId(), peopleId = useId(), whereId = useId()
  const boat = FLEET.find(b => b.id === boatId)!
  const maxPeople = boat.id === 'whaler17' ? 3 : boat.id === 'whaler19' ? 4 : 6
  const group = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('boat'); if (q && FLEET.some(b => b.id === q)) setBoatId(q)
    const on = (e: Event) => { setBoatId((e as CustomEvent<string>).detail); setFlash(f => f + 1) }
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

  const onKey = (e: KeyboardEvent) => {
    const i = FLEET.findIndex(b => b.id === boatId)
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault(); const n = FLEET[(i + d + FLEET.length) % FLEET.length]; setBoatId(n.id)
    ;(group.current?.querySelector(`[data-id="${n.id}"]`) as HTMLElement | null)?.focus()
  }

  return (
    <div className="grid gap-4">
      <div ref={group} role="radiogroup" aria-label="Boat" onKeyDown={onKey} className="grid grid-cols-2 gap-2">
        {FLEET.map(b => {
          const on = b.id === boatId
          return (
            <button key={b.id} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1} data-id={b.id} onClick={() => setBoatId(b.id)}
              className={`relative flex items-center gap-3 min-h-[58px] p-[7px] pl-3 sm:pl-[7px] pr-3 rounded-[var(--radius-md)] text-left transition-[background-color,box-shadow] duration-200 active:scale-[0.98] ${on ? 'bg-surface shadow-[inset_0_0_0_2px_var(--color-channel)]' : 'bg-ground hover:bg-flats/45'}`}>
              {on && <motion.span key={flash} aria-hidden="true" className="absolute inset-0 rounded-[var(--radius-md)] shadow-[0_0_0_5px_var(--color-flats)]" initial={{ opacity: flash ? 1 : 0 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, ease }} />}
              <span className="ph hidden sm:block size-11 shrink-0 rounded-[7px]"><img src={wix(b.cover, 120)} width={120} height={120} alt="" loading="lazy" decoding="async" style={{ objectPosition: b.pos }} /></span>
              <span className="leading-tight min-w-0">
                <span className="block font-semibold text-[0.9375rem] md:text-[1rem]">{b.short === 'Angler' || b.short === 'Century' ? b.name : b.short}</span>
                <span className="block text-[0.875rem] text-muted tnum mt-0.5">{usd(b.day)} a day<span className="hidden sm:inline">, {b.people.replace(' adults', '').replace(' to ', '-')}</span></span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <Stepper label="Days" unit={days === 1 ? 'day' : 'days'} value={days} min={3} max={14} onChange={setDays} />
        <div>
          <label htmlFor={dateId} className="block text-[0.9375rem] font-semibold mb-2">First day</label>
          <input id={dateId} type="date" min={today()} value={date} onChange={e => setDate(e.target.value)}
            className="w-full h-12 px-3 rounded-[var(--radius-sm)] bg-ground text-ink text-[1rem] tnum" />
        </div>
      </div>

      <div>
        <label htmlFor={whereId} className="sr-only">Where you are staying on Green Turtle Cay (optional)</label>
        <input id={whereId} type="text" value={where} onChange={e => setWhere(e.target.value)} placeholder="Where you're staying (optional)" autoComplete="off"
          className="w-full h-11 px-3 rounded-[var(--radius-sm)] bg-ground text-ink text-[1rem] placeholder:text-muted" />
      </div>

      <div className="flex items-end justify-between gap-4 pt-1 border-t border-line">
        <div className="pt-4 min-w-0">
          <p className="text-[0.9375rem] font-semibold">{boat.name}, {days} days</p>
          <Figure value={usd(total)} label={`Estimated total ${usd(total)}`} />
          <p className="text-[0.9375rem] text-muted tnum">{breakdown}{days >= 14 ? '. Longer? Ask Taylor.' : ''}</p>
        </div>
        <div className="pb-1 shrink-0">
          <label htmlFor={peopleId} className="block text-[0.875rem] text-muted mb-1">People</label>
          <select id={peopleId} value={people} onChange={e => setPeople(+e.target.value)} className="h-11 pl-3 pr-2 rounded-[var(--radius-sm)] bg-ground text-ink font-semibold tnum">
            {Array.from({ length: maxPeople }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <a className="btn btn-primary w-full max-lg:sticky max-lg:bottom-[88px] max-lg:z-10 max-lg:shadow-[0_8px_24px_rgb(13_43_46/0.25)]" href={wa(message)} target="_blank" rel="noopener"><WhatsAppGlyph />Send to Taylor on WhatsApp</a>
        <p className="text-[0.875rem] text-muted text-center leading-snug">
          Cash only, $100 deposit, 3-day minimum{boat.experience ? ', boating experience needed' : ''}. Nothing is booked here.<br />
          <a className="inline-flex items-center min-h-11 font-semibold text-ink underline underline-offset-4 decoration-1 hover:decoration-2" href={mail(`Boat rental request: ${boat.name}, ${days} days`, message)}>Email Donny instead</a>
        </p>
      </div>
    </div>
  )
}

export function Fits() {
  const [loa, setLoa] = useState(38)
  const [draft, setDraft] = useState(5)
  const [nights, setNights] = useState(3)
  const [berth, setBerth] = useState<Berth>('dock')
  const [amp, setAmp] = useState(false)
  const r = fit(loa, draft, berth)
  const cost = r.ok ? stayCost(r.rate, nights) : null
  const power = r.ok && berth === 'dock' && amp ? stayCost(AMP30, nights) : null
  const total = cost ? cost.total + (power?.total ?? 0) : 0
  const body = `Hello Donny, I'd like a ${berth === 'dock' ? 'slip' : 'mooring'} at Donny's.\nBoat: ${loa} ft LOA, ${draft} ft draft\nNights: ${nights}${berth === 'dock' ? `\n30 amp: ${amp ? 'yes' : 'no'}` : ''}\n${cost ? `My estimate from your published rates: ${usd(total)}.` : 'I know this is over your published limits; is there a way to fit us?'}`

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 gap-3">
        <Stepper label="Length overall" unit="ft" value={loa} min={10} max={80} onChange={setLoa} />
        <Stepper label="Draft" unit="ft" value={draft} min={1} max={12} step={0.5} onChange={setDraft} format={n => n.toFixed(1).replace('.0', '')} />
        <Stepper label="Nights" unit={nights === 1 ? 'night' : 'nights'} value={nights} min={1} max={31} onChange={setNights} />
        <div>
          <p className="text-[0.9375rem] font-semibold mb-2">Berth</p>
          <div role="radiogroup" aria-label="Berth" className="grid grid-cols-2 h-12 p-1 rounded-[var(--radius-sm)] bg-ground">
            {(['dock', 'mooring'] as Berth[]).map(b => (
              <button key={b} type="button" role="radio" aria-checked={berth === b} onClick={() => setBerth(b)}
                className={`rounded-[5px] text-[0.9375rem] font-semibold capitalize transition-colors ${berth === b ? 'bg-surface shadow-[inset_0_0_0_1.5px_var(--color-channel)]' : 'text-muted hover:text-ink'}`}>{b}</button>
            ))}
          </div>
        </div>
      </div>
      {berth === 'dock' && (
        <label className="flex items-center gap-3 min-h-11 cursor-pointer text-[0.9375rem]">
          <input type="checkbox" checked={amp} onChange={e => setAmp(e.target.checked)} className="size-5 accent-[var(--color-channel)]" />
          30 amp power <span className="text-muted tnum">(+$5 a day, +$20 a week, +$100 a month)</span>
        </label>
      )}

      <div className="pt-4 border-t border-line" aria-live="polite">
        <p className={`flex items-center gap-2 font-semibold ${r.ok ? 'text-channel' : 'text-ink'}`}>
          {r.ok ? <Check size={18} strokeWidth={2} aria-hidden="true" /> : <TriangleAlert size={18} strokeWidth={1.75} aria-hidden="true" />}{r.label}
        </p>
        {cost ? (
          <>
            <Figure value={usd(total)} label={`Estimated ${usd(total)}`} />
            <p className="text-[0.9375rem] text-muted tnum">{cost.how}{power ? `, plus 30 amp ${usd(power.total)}` : ''}</p>
          </>
        ) : (
          <p className="mt-2 text-[1rem] text-muted max-w-[44ch]">Donny&rsquo;s publishes dockage up to {MARINA.loa} ft LOA and {MARINA.draft} ft draft. Call or radio before you come and ask what is possible.</p>
        )}
        <AnimatePresence initial={false}>
          {draft >= 6 && (
            <motion.p key="entry" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}
              className="overflow-hidden text-[0.9375rem] leading-snug"><span className="block pt-3"><span className="font-semibold">Black Sound entry: </span>{ENTRY_NOTE}</span></motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-2">
        <a className="btn btn-primary w-full" href={mail(`${berth === 'dock' ? 'Slip' : 'Mooring'} request: ${loa} ft, ${draft} ft draft, ${nights} nights`, body)}>Ask Donny for a {berth === 'dock' ? 'slip' : 'mooring'}</a>
        <p className="flex items-center justify-center gap-2 text-[0.875rem] text-muted"><Radio size={15} strokeWidth={1.75} aria-hidden="true" />On the water: VHF 16, working 10</p>
      </div>
    </div>
  )
}

const TABS: [Tab, string][] = [['rent', 'Rent a boat'], ['fit', 'Does my boat fit?']]

export default function TripSheet(): ReactNode {
  const [tab, setTab] = useState<Tab>('rent')
  const ids = { rent: useId(), fit: useId() }
  useEffect(() => {
    const open = (t: Tab) => { setTab(t); document.getElementById('sheet')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }) }
    if (location.hash === '#fit') setTab('fit')
    if (new URLSearchParams(location.search).get('boat') || location.hash === '#sheet') setTimeout(() => open('rent'), 300)
    const onFit = () => open('fit'); const onBoat = () => open('rent')
    window.addEventListener('donny:fit', onFit); window.addEventListener('donny:boat', onBoat)
    return () => { window.removeEventListener('donny:fit', onFit); window.removeEventListener('donny:boat', onBoat) }
  }, [])
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault(); const n = tab === 'rent' ? 'fit' : 'rent'; setTab(n); document.getElementById(`tab-${n}`)?.focus()
  }
  return (
    <div id="sheet" className="bg-surface rounded-[var(--radius-lg)] shadow-[var(--shadow-sheet)] p-[10px] scroll-mt-6">
      <div role="tablist" aria-label="Trip sheet" onKeyDown={onKey} className="grid grid-cols-2 p-1 rounded-[var(--radius-md)] bg-ground">
        {TABS.map(([t, label]) => (
          <button key={t} id={`tab-${t}`} type="button" role="tab" aria-selected={tab === t} aria-controls={ids[t]} tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)}
            className={`relative h-11 rounded-[10px] text-[0.9375rem] md:text-[1rem] font-semibold transition-colors ${tab === t ? 'text-ink' : 'text-muted hover:text-ink'}`}>
            {tab === t && <motion.span layoutId="tab-ind" className="absolute inset-0 rounded-[10px] bg-surface shadow-[0_1px_3px_rgb(13_43_46/0.12)]" transition={{ duration: 0.24, ease }} />}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
      <div className="px-3.5 pt-5 pb-3.5 md:px-5 md:pt-6 md:pb-5">
        {TABS.map(([t]) => (
          <motion.div key={t} id={ids[t]} role="tabpanel" aria-labelledby={`tab-${t}`} hidden={tab !== t}
            initial={false} animate={tab === t ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.24, ease }}>
            {t === 'rent' ? <Rent /> : <Fits />}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
