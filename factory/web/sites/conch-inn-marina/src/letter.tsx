import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { BIZ, PHOTO, RATE, wix } from './data'

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
const nightsBetween = (a: string, d: string) => (a && d ? Math.round((new Date(d + 'T12:00').getTime() - new Date(a + 'T12:00').getTime()) / 86400000) : 0)

export function Letterhead({ base = '' }: { base?: string }) {
  return (
    <header className="lh">
      <a className="lh-name" href={base || './'}>The Conch Inn{'\u00a0'}<span className="amp">&amp;</span>{'\u00a0'}Marina</a>
      <nav aria-label="Main">
        <a href={base + '#rates'}>Rates</a>
        <a href={base + '#ashore'}>Ashore</a>
        <a href={base + '#rooms'}>Rooms</a>
        <a href={base + '#office'}>Office</a>
        <a className="lh-book" href={BIZ.bookRooms}>Book a room</a>
      </nav>
      <p className="lh-line num">Bay Street, Marsh Harbour, Abaco <span aria-hidden="true">·</span> <a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> <span aria-hidden="true">·</span> {BIZ.vhf} <span aria-hidden="true">·</span> <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
    </header>
  )
}

const short = (iso: string) => iso ? new Date(iso + 'T12:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
function DateBlank({ label, value, min, onChange }: { label: string; value: string; min: string; onChange: (v: string) => void }) {
  return (
    <span className="dateblank">
      <span className={`blank ${value ? '' : 'empty'}`} aria-hidden="true">{value ? short(value) : 'pick a day'}</span>
      <input type="date" aria-label={label} min={min} value={value} onChange={e => onChange(e.target.value)} onClick={e => { try { (e.currentTarget as any).showPicker?.() } catch {} }} />
    </span>
  )
}

function Blank({ label, w, ...p }: { label: string; w: number } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="blank" aria-label={label} style={{ width: `${w}ch` }} {...p} />
}

export function Letter() {
  const reduce = useReducedMotion()
  const [boat, setBoat] = useState(''), [loa, setLoa] = useState('42'), [kind, setKind] = useState('catamaran')
  const [beam, setBeam] = useState('24'), [draft, setDraft] = useState('4'), [arrive, setArrive] = useState(''), [leave, setLeave] = useState('')
  const today = new Date().toISOString().slice(0, 10)
  const n = nightsBetween(arrive, leave), L = parseFloat(loa) || 0, B = parseFloat(beam) || 0
  const reply = useMemo(() => {
    if (!L) return { head: 'Tell us her length.', sub: 'Dockage is charged per foot of length overall.' }
    if (n <= 0) return { head: `${money(L * RATE.daily)} a night`, sub: `for ${L} ft at the two-night-plus rate of $3.25 a foot ($3.75 for a single night). Add your dates for the full stay.` }
    if (n >= 30) return { head: `$2.25 a foot, monthly`, sub: `${n} nights qualifies for the monthly rate. The office confirms the total for the month.` }
    const rate = n === 1 ? RATE.one : RATE.daily
    return { head: money(L * rate * n), sub: `${n} night${n > 1 ? 's' : ''} for ${L} ft at $${rate.toFixed(2)} a foot. Electric is $0.75 a kWh and water $0.10 a gallon on top.` }
  }, [L, n])
  const beamNote = B > RATE.beamMax ? `A ${B} ft beam is wider than the 30 ft catamaran slips: call the office before you come.` : B ? `A ${B} ft beam fits: catamarans up to 30 ft wide are welcome.` : ''
  const body = [`Boat name: ${boat || '(not given)'}`, `Boat type: ${kind}`, `LOA: ${loa} ft`, `Beam: ${beam} ft`, `Draft: ${draft} ft`, `Arrival: ${arrive || '(tbc)'}`, `Departure: ${leave || '(tbc)'}`, '', 'Sent from the Conch Inn website.'].join('\n')
  const mail = `mailto:${BIZ.email}?subject=${encodeURIComponent(`Slip request: ${boat || 'my boat'}, ${loa} ft ${kind}`)}&body=${encodeURIComponent('Dear Conch Inn,\n\nPlease hold a slip for us.\n\n' + body)}`
  const appear = (i: number) => reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 0.61, 0.24, 1] as const } }
  return (
    <section className="hero" aria-labelledby="h1">
      <div className="hero-paper">
        <Letterhead />
        <form className="letter" onSubmit={e => { e.preventDefault(); location.href = mail }}>
          <motion.h1 id="h1" className="salute" {...appear(0)}>Dear Conch Inn,<span className="sr-only"> a slip request to The Conch Inn &amp; Marina, Marsh Harbour, Abaco</span></motion.h1>
          <motion.p className="body" {...appear(1)}>
            please hold a slip for <Blank label="Boat name" w={Math.max(9, boat.length + 1)} placeholder="her name" value={boat} onChange={e => setBoat(e.target.value)} />,
            {' '}our <Blank label="Length overall in feet" w={Math.max(2.4, loa.length + 0.6)} inputMode="decimal" value={loa} onChange={e => setLoa(e.target.value.replace(/[^\d.]/g, ''))} /> ft{' '}
            <select className="blank" aria-label="Boat type" value={kind} onChange={e => setKind(e.target.value)}>
              <option value="catamaran">catamaran</option><option value="sailboat">sailboat</option><option value="powerboat">powerboat</option><option value="sportfisher">sportfisher</option><option value="trawler">trawler</option>
            </select>
            {' '}with a <Blank label="Beam in feet" w={Math.max(2.4, beam.length + 0.6)} inputMode="decimal" value={beam} onChange={e => setBeam(e.target.value.replace(/[^\d.]/g, ''))} /> ft beam and a{' '}
            <Blank label="Draft in feet" w={Math.max(2, draft.length + 0.6)} inputMode="decimal" value={draft} onChange={e => setDraft(e.target.value.replace(/[^\d.]/g, ''))} /> ft draft.
            {' '}We arrive <DateBlank label="Arrival date" min={today} value={arrive} onChange={v => { setArrive(v); if (leave && v >= leave) setLeave('') }} />
            {' '}and leave <DateBlank label="Departure date" min={arrive || today} value={leave} onChange={setLeave} />.
          </motion.p>
          <motion.div className="reply" aria-live="polite" {...appear(2)}>
            <p className="reply-k">From our published rates</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={reply.head} className="reply-v num" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>{reply.head}</motion.p>
            </AnimatePresence>
            <p className="reply-s">{reply.sub}</p>
            {beamNote && <p className={`reply-s ${B > RATE.beamMax ? 'warn' : ''}`}>{beamNote}</p>}
          </motion.div>
          <motion.div className="acts" {...appear(3)}>
            <button className="btn" type="submit">Send to the dock office</button>
            <p className="acts-alt num">or call <a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>, {BIZ.vhf}</p>
            <p className="acts-ashore">Staying ashore? <a href={BIZ.bookRooms}>Book a room online</a></p>
          </motion.div>
        </form>
      </div>
      <figure className="hero-photo">
        <img src={wix(PHOTO.docks.id, 1200, 1176)} alt={PHOTO.docks.alt} width={1200} height={1176} fetchPriority="high" />
      </figure>
    </section>
  )
}
