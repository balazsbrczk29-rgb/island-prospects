import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { BIZ, RATE, ROOMS, wix } from './data'

type Mode = 'slip' | 'mooring' | 'room'
const EASE = [0.22, 1, 0.36, 1] as const
const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (s: string, n: number) => { const d = new Date(s + 'T12:00'); d.setDate(d.getDate() + n); return iso(d) }
const nightsBetween = (a: string, b: string) => (a && b ? Math.max(0, Math.round((new Date(b + 'T12:00').getTime() - new Date(a + 'T12:00').getTime()) / 86400000)) : 0)
const nice = (s: string) => (s ? new Date(s + 'T12:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '')
const num = (s: string) => { const n = parseFloat(s); return Number.isFinite(n) ? n : 0 }
const r1 = (n: number) => Math.round(n * 10) / 10
const f = (n: number) => r1(n).toFixed(1)

function useCompact() {
  const [c, setC] = useState(false)
  useEffect(() => { const m = matchMedia('(max-width: 900px)'); const on = () => setC(m.matches); on(); m.addEventListener('change', on); return () => m.removeEventListener('change', on) }, [])
  return c
}

/* ---------- hull outlines, in feet; each type keeps one command structure so d can animate ---------- */
function mono(cx: number, y: number, L: number, B: number, stern = 0.44) {
  const h = B / 2
  return `M${f(cx)} ${f(y)} C${f(cx + h)} ${f(y + L * 0.16)} ${f(cx + h)} ${f(y + L * 0.34)} ${f(cx + h)} ${f(y + L * 0.56)} L${f(cx + B * stern)} ${f(y + L)} L${f(cx - B * stern)} ${f(y + L)} L${f(cx - h)} ${f(y + L * 0.56)} C${f(cx - h)} ${f(y + L * 0.34)} ${f(cx - h)} ${f(y + L * 0.16)} ${f(cx)} ${f(y)} Z`
}
function hull(x: number, y: number, L: number, w: number) {
  const h = w / 2
  return `M${f(x)} ${f(y)} C${f(x + h)} ${f(y + L * 0.1)} ${f(x + h)} ${f(y + L * 0.28)} ${f(x + h)} ${f(y + L * 0.5)} L${f(x + h)} ${f(y + L)} L${f(x - h)} ${f(y + L)} L${f(x - h)} ${f(y + L * 0.5)} C${f(x - h)} ${f(y + L * 0.28)} ${f(x - h)} ${f(y + L * 0.1)} ${f(x)} ${f(y)} Z`
}
function cat(cx: number, y: number, L: number, B: number) {
  const w = Math.max(2.4, B * 0.21), off = B / 2 - w / 2
  const dx0 = cx - off + w * 0.5, dx1 = cx + off - w * 0.5
  return `${hull(cx - off, y, L, w)} ${hull(cx + off, y, L, w)} M${f(dx0)} ${f(y + L * 0.3)} L${f(dx1)} ${f(y + L * 0.3)} L${f(dx1)} ${f(y + L * 0.88)} L${f(dx0)} ${f(y + L * 0.88)} Z`
}
const isCat = (t: string) => t === 'catamaran'
const shape = (t: string, cx: number, y: number, L: number, B: number) => (isCat(t) ? cat(cx, y, L, B) : mono(cx, y, L, B, t === 'sailboat' ? 0.38 : 0.45))

/* ---------- the harbour plan ---------- */
function Plan({ mode, L, B, kind, name, compact }: { mode: Mode; L: number; B: number; kind: string; name: string; compact: boolean }) {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const [aspect, setAspect] = useState(compact ? 1.25 : 1.6)
  useEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(([e]) => { const { width, height } = e.contentRect; if (width > 0 && height > 0) setAspect(Math.round((width / height) * 100) / 100) })
    ro.observe(el); return () => ro.disconnect()
  }, [])
  const l = Math.min(Math.max(L || 30, 12), 160), b = Math.min(Math.max(B || 10, 4), 50)
  const moor = mode === 'mooring'
  const y0 = moor ? 20 : 11
  const vbH = Math.max(y0 + l + 16, (compact ? 84 : 112) / aspect)
  const vbW = vbH * aspect
  const vb = `${f(80 - vbW / 2)} 0 ${f(vbW)} ${f(vbH)}`
  const fs = Math.min(vbH * (compact ? 0.062 : 0.036), compact ? 5.2 : 3.6)
  const W = Math.max(b + 6, 18), fw = 2.2, F = Math.max(36, l * 0.72)
  const lf = 80 - W / 2 - fw, rf = 80 + W / 2
  const WL = 18, WR = 31
  const t = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }
  const fingers = [lf - WL - fw - WL - fw, lf - WL - fw, lf, rf, rf + fw + WR, rf + 2 * (fw + WR)]
  const over = b > RATE.beamMax
  const dimX = 80 - b / 2 - 1.8
  return (
    <div className="plan-box" ref={box}>
    <motion.svg className="plan-svg" viewBox={vb} initial={false} animate={{ viewBox: vb }} transition={t} preserveAspectRatio="xMidYMin meet" role="img"
      aria-label={moor ? `Your ${l} foot ${kind} on a mooring ball, drawn to scale` : `Your ${l} foot ${kind}, ${b} foot beam, drawn to scale in a slip between two neighbouring boats`}>
      <rect x={-400} y={-10} width={1000} height={400} className="pw" />
      <AnimatePresence initial={false}>
        {!moor && (
          <motion.g key="dock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>
            <rect x={-400} y={0} width={1000} height={7} className="pd" />
            {fingers.map((x, i) => <motion.rect key={i} className="pd" y={7} height={F} width={fw} initial={false} animate={{ x }} transition={t} />)}
            {/* neighbours: a 38 ft monohull and a 46 ft catamaran, for scale */}
            <motion.path className="ghost" initial={false} animate={{ d: mono(lf - WL / 2, 11, 38, 12.5) }} transition={t} />
            <motion.path className="ghost" initial={false} animate={{ d: cat(rf + fw + WR / 2, 11, 46, 25) }} transition={t} />
            <motion.rect className={`slipline ${over ? 'over' : ''}`} initial={false} animate={{ x: lf + fw, width: W }} y={7} height={F} transition={t} />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {moor && (
          <motion.g key="ball" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>
            <circle cx={80} cy={y0 + l / 2 - 4} r={l + 6} className="swing" />
            <circle cx={80} cy={9} r={2.4} className="ball" />
            <line x1={80} y1={11.4} x2={80} y2={y0} className="pennant" />
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g className={moor && !reduce ? 'swinging' : ''} style={{ transformOrigin: '80px 9px' }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.path key={isCat(kind) ? 'cat' : 'mono'} className="boat" initial={{ opacity: 0, d: shape(kind, 80, y0, l, b) }} animate={{ opacity: 1, d: shape(kind, 80, y0, l, b) }} exit={{ opacity: 0 }} transition={t} />
        </AnimatePresence>
        {(kind === 'sailboat' || kind === 'catamaran') && <motion.circle className="mast" r={0.9} cx={80} initial={false} animate={{ cy: y0 + l * 0.42 }} transition={t} />}
        <motion.text className="boatname" textAnchor="middle" x={80} initial={false} animate={{ y: y0 + l * (isCat(kind) ? 0.66 : 0.74) }} transition={t} style={{ fontSize: fs * 0.95 }}>{name || 'your boat'}</motion.text>
      </motion.g>
      {/* dimension lines */}
      <motion.g className="dim" initial={false} animate={{ x: moor ? 80 - b / 2 - 3 : dimX, y: 0 }} transition={t}>
        <motion.line x1={0} x2={0} y1={y0} initial={false} animate={{ y2: y0 + l }} transition={t} />
        <line x1={-1.2} x2={1.2} y1={y0} y2={y0} />
        <motion.line x1={-1.2} x2={1.2} initial={false} animate={{ y1: y0 + l, y2: y0 + l }} transition={t} />
      </motion.g>
      <motion.text className="dimt num" textAnchor="middle" initial={false} animate={{ x: (moor ? 80 - b / 2 - 3 : dimX) - fs * 0.55, y: y0 + l / 2 }} transition={t} style={{ fontSize: fs }}
        transform={`rotate(-90 ${f((moor ? 80 - b / 2 - 3 : dimX) - fs * 0.55)} ${f(y0 + l / 2)})`}>{r1(l)} ft</motion.text>
      <motion.g className="dim" initial={false} animate={{ y: y0 + l + 3.2 }} transition={t}>
        <motion.line y1={0} y2={0} initial={false} animate={{ x1: 80 - b / 2, x2: 80 + b / 2 }} transition={t} />
        <motion.line y1={-1.2} y2={1.2} initial={false} animate={{ x1: 80 - b / 2, x2: 80 - b / 2 }} transition={t} />
        <motion.line y1={-1.2} y2={1.2} initial={false} animate={{ x1: 80 + b / 2, x2: 80 + b / 2 }} transition={t} />
        <text className={`dimt num ${over ? 'over' : ''}`} x={80} y={fs * 1.25} textAnchor="middle" style={{ fontSize: fs }}>{r1(b)} ft beam</text>
      </motion.g>
    </motion.svg>
    </div>
  )
}

/* ---------- the desk ---------- */
export function Desk() {
  const reduce = useReducedMotion()
  const compact = useCompact()
  const [today] = useState(() => iso(new Date()))
  const [mode, setMode] = useState<Mode>('slip')
  const [loa, setLoa] = useState('42'), [beam, setBeam] = useState('24'), [draft, setDraft] = useState('4')
  const [kind, setKind] = useState('catamaran'), [name, setName] = useState('')
  const [arrive, setArrive] = useState(() => addDays(iso(new Date()), 14))
  const [leave, setLeave] = useState(() => addDays(iso(new Date()), 17))
  const [room, setRoom] = useState(2)
  const L = num(loa), B = num(beam), n = nightsBetween(arrive, leave)

  const bill = useMemo(() => {
    if (mode === 'mooring') {
      if (n === 0) return { total: '', line: 'Add a departure date for the nightly mooring rate.', tier: '$30 a night' }
      if (n < 30) return { total: money(RATE.mooringNight * n), line: `${n} night${n > 1 ? 's' : ''} at $30 a night, plus VAT.`, tier: 'Mooring ball' }
      const m = Math.floor(n / 30), rest = n % 30
      return { total: money(m * RATE.mooringMonth + Math.min(rest * RATE.mooringNight, RATE.mooringMonth)), line: `${m} month${m > 1 ? 's' : ''} at $500${rest ? ` and ${rest} night${rest > 1 ? 's' : ''} at $30` : ''}, plus VAT.`, tier: 'Mooring ball, monthly' }
    }
    if (!L) return { total: '', line: 'Dockage is charged per foot of length overall.', tier: 'Enter her length' }
    if (n === 0) return { total: money(L * RATE.short), line: `Same-day stop up to 3 hours: ${r1(L)} ft at $1.00 a foot.`, tier: 'Pick-up, drop-off or provisioning' }
    if (n === 1) return { total: money(L * RATE.one), line: `1 night, ${r1(L)} ft at $3.75 a foot.`, tier: 'One night' }
    if (n < 30) return { total: money(L * RATE.daily * n), line: `${n} nights, ${r1(L)} ft at $3.25 a foot a night.`, tier: 'Two nights or more' }
    return { total: money(L * RATE.monthly * n), line: `${n} nights, ${r1(L)} ft at the monthly rate of $2.25 a foot a night. The office confirms monthly totals.`, tier: 'Thirty nights or more' }
  }, [mode, n, L])

  const over = B > RATE.beamMax
  const beamNote = !B ? '' : over ? `A ${r1(B)} ft beam is wider than the 30 ft catamaran slips. Call the office before you come.` : isCat(kind) ? `A ${r1(B)} ft beam fits: catamarans up to 30 ft wide are welcome.` : ''
  const mooring = mode === 'mooring'
  const subject = `${mooring ? 'Mooring ball' : 'Slip request'}: ${name || 'our boat'}, ${r1(L)} ft ${kind}, ${nice(arrive)} to ${nice(leave)}`
  const body = [
    'Dear Conch Inn,', '',
    mooring ? 'We would like a mooring ball, if one is free on arrival.' : 'Please hold a slip for us.', '',
    `Boat type: ${kind}`, `Boat name: ${name || '(to follow)'}`, `LOA (bow pulpit to swim platform): ${r1(L)} ft`, `Beam: ${r1(B)} ft`, `Draft: ${r1(num(draft))} ft`,
    `Arrival: ${nice(arrive)}`, `Departure: ${nice(leave)}`, '',
    bill.total ? `Estimate from your published rates: ${bill.total} (${bill.line})` : '', '', 'Thank you.',
  ].join('\n')
  const mail = `mailto:${BIZ.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const r = ROOMS[room]
  const enter = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.05 + i * 0.08, ease: EASE } })
  const field = (label: string, v: string, set: (s: string) => void, unit: string) => (
    <label className="fld">
      <span className="fld-k">{label}</span>
      <span className="fld-box"><input className="num" inputMode="decimal" value={v} onChange={e => set(e.target.value.replace(/[^\d.]/g, '').slice(0, 5))} /><span className="fld-u" aria-hidden="true">{unit}</span></span>
    </label>
  )

  return (
    <section className="desk wrap" aria-labelledby="h1" id="desk">
      <motion.div className="desk-head" {...enter(0)}>
        <p className="cap">Marsh Harbour, Abaco <span aria-hidden="true">·</span> 73 slips and mooring balls</p>
        <h1 id="h1" className="hero-h">Hold a slip on Bay&nbsp;Street.</h1>
      </motion.div>

      <motion.form className="desk-form" {...enter(1)} onSubmit={e => { e.preventDefault(); if (mode === 'room') location.href = BIZ.bookRooms; else location.href = mail }}>
        <div className="seg" role="radiogroup" aria-label="What you need">
          {(['slip', 'mooring', 'room'] as Mode[]).map(m => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}
              onKeyDown={e => { const all: Mode[] = ['slip', 'mooring', 'room']; const k = all.indexOf(m); if (e.key === 'ArrowRight') setMode(all[(k + 1) % 3]); if (e.key === 'ArrowLeft') setMode(all[(k + 2) % 3]) }}>
              {mode === m && <motion.span layoutId="seg-on" className="seg-on" transition={reduce ? { duration: 0 } : { duration: 0.25, ease: EASE }} />}
              <span className="seg-t">{m === 'slip' ? 'Slip' : m === 'mooring' ? 'Mooring ball' : 'Room ashore'}</span>
            </button>
          ))}
        </div>

        {mode !== 'room' ? (
          <div className="fields">
            <label className="fld wide">
              <span className="fld-k">Boat name</span>
              <span className="fld-box"><input value={name} placeholder="Her name, painted on the transom" maxLength={28} onChange={e => setName(e.target.value)} /></span>
            </label>
            {field('Length overall', loa, setLoa, 'ft')}
            {field('Beam', beam, setBeam, 'ft')}
            {field('Draft', draft, setDraft, 'ft')}
            <label className="fld">
              <span className="fld-k">Type</span>
              <span className="fld-box"><select value={kind} onChange={e => setKind(e.target.value)}>
                <option value="catamaran">Catamaran</option><option value="sailboat">Sailboat</option><option value="powerboat">Powerboat</option><option value="sportfisher">Sportfisher</option><option value="trawler">Trawler</option>
              </select></span>
            </label>
            <label className="fld">
              <span className="fld-k">Arrive</span>
              <span className="fld-box"><input type="date" className="num" min={today} value={arrive} onChange={e => { const v = e.target.value; setArrive(v); if (v && leave < v) setLeave(v) }} /></span>
            </label>
            <label className="fld">
              <span className="fld-k">Leave</span>
              <span className="fld-box"><input type="date" className="num" min={arrive || today} value={leave} onChange={e => setLeave(e.target.value)} /></span>
            </label>
          </div>
        ) : (
          <div className="roomlist" role="radiogroup" aria-label="Room type">
            {ROOMS.map((x, k) => (
              <button key={x.id} type="button" role="radio" aria-checked={k === room} className={k === room ? 'on' : ''} onClick={() => setRoom(k)}>
                <span>{x.name}</span><span className="v">{x.view}</span>
              </button>
            ))}
          </div>
        )}
        <p className="desk-fine">{mode === 'room' ? 'Live rates and availability are in the inn’s own booking system.' : 'Rated on length overall, bow pulpit to swim platform. Cancel within 48 hours and the first night is charged.'}</p>
        <p className="desk-alt num">The dock office answers every day, 8:00 to 5:30: <a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> or VHF 16.</p>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </motion.form>

      <motion.div className="desk-plan" {...enter(2)}>
        <AnimatePresence initial={false} mode="wait">
          {mode !== 'room' ? (
            <motion.div key="chart" className="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
              <Plan mode={mode} L={L} B={B} kind={kind} name={name} compact={compact} />
              <p className="chart-k">{mode === 'slip' ? 'Your boat to scale in a slip, between a 38 ft monohull and a 46 ft catamaran. The office assigns the slip.' : 'Mooring balls are first come, first served.'}</p>
              {compact && bill.total && <p className="chart-total num" aria-hidden="true">{bill.total}</p>}
            </motion.div>
          ) : (
            <motion.figure key="room" className="roomfig" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
              <AnimatePresence initial={false}>
                <motion.img key={r.id} src={wix(r.photo.id, 1200, 800)} alt={r.alt} width={1200} height={800}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} />
              </AnimatePresence>
              <figcaption>{r.features.join(', ')}.</figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div className="desk-bill" {...enter(3)} aria-live="polite">
        {mode !== 'room' ? (
          <>
            <div className="bill-top">
              <p className="bill-tier">{bill.tier}</p>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.p key={bill.total || 'none'} className="bill-total num" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.24, ease: EASE }}>{bill.total || '—'.replace('—', '$ ')}</motion.p>
              </AnimatePresence>
              <p className="bill-line num">{bill.line}</p>
            </div>
            <p className="bill-meta num">{mooring ? 'Includes WiFi, the dinghy dock, showers and laundry access.' : 'Electric $0.75 a kWh (30 and 50 amp) and water $0.10 a gallon, metered. WiFi and showers free.'}</p>
            {beamNote && !mooring && <p className={`bill-beam ${over ? 'over' : ''}`}>{beamNote}</p>}
            <div className="bill-acts">
              <a className="btn" href={mail}>{mooring ? 'Ask the office about a ball' : 'Email the dock office'}</a>
              <a className="btn-2 num" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a>
              <span className="bill-vhf">or {BIZ.vhf}</span>
            </div>
          </>
        ) : (
          <>
            <div className="bill-top">
              <p className="bill-tier">{r.view}</p>
              <p className="bill-room">{r.name}</p>
              <p className="bill-line">Six room types over the marina, renovated after Dorian. Rates on request, or live in the booking system.</p>
            </div>
            <div className="bill-acts">
              <a className="btn" href={BIZ.bookRooms}>Check dates and book</a>
              <a className="btn-2 num" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a>
            </div>
          </>
        )}
      </motion.div>
    </section>
  )
}
