import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { BIZ, LIMITS, PHOTO, DOCKAGE } from './data'
import { PLACES, headline, line, nassauNow } from './hours'
import { Colophon, Masthead, MobileStrip, Photo, mount } from './site'

function useNow() {
  const [now, setNow] = useState(() => nassauNow())
  useEffect(() => { const t = setInterval(() => setNow(nassauNow()), 30_000); return () => clearInterval(t) }, [])
  return now
}

type Boat = { loa: number; beam: number; draft: number }
type Trip = { arrive: string; nights: number }
const money = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (s: string, n: number) => { const d = new Date(s + 'T12:00'); d.setDate(d.getDate() + n); return iso(d) }
const longDate = (s: string) => new Date(s + 'T12:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })

function verdict(b: Boat) {
  const over = [
    b.loa > LIMITS.loa && `her length is ${b.loa} ft, over the ${LIMITS.loa} ft the marina lists`,
    b.beam > LIMITS.beam && `her beam is ${b.beam} ft, over the ${LIMITS.beam} ft listed`,
    b.draft > LIMITS.draft && `she draws ${b.draft} ft, more than the ${LIMITS.draft} ft at low tide`,
  ].filter(Boolean) as string[]
  if (over.length) return { ok: false, title: 'Talk to the dockmaster first.', body: `As entered, ${over.join(', and ')}. Call ${BIZ.phone} before you plan on a slip here.` }
  const spare = LIMITS.draft - b.draft
  return { ok: true, title: 'She fits.', body: `${b.loa} by ${b.beam} ft, drawing ${b.draft} ft: inside every limit, with ${spare} ft to spare at low tide.` }
}

export function estimate(b: Boat, nights: number) {
  if (nights <= 0) return { total: DOCKAGE.dayStop, line: `Day stop: ${money(DOCKAGE.dayStop)}, the first hour free.` }
  const rate = DOCKAGE.tiers.find(([max]) => nights <= max)![1]
  const total = b.loa * rate * nights
  return { total, line: `${nights} ${nights === 1 ? 'night' : 'nights'} x ${b.loa} ft x ${money(rate)} a foot` }
}

function Stepper({ id, label, value, min, max, unit = 'ft', onChange }: { id: string; label: string; value: number; min: number; max: number; unit?: string; onChange: (n: number) => void }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n)))
  return (
    <div className="stepper">
      <label htmlFor={id}>{label}{unit && <span className="unit">, {unit}</span>}</label>
      <div className="stepper-row">
        <button type="button" aria-label={`Less ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>&minus;</button>
        <input id={id} className="tab" inputMode="numeric" size={3} value={value}
          onKeyDown={e => { if (e.key === 'ArrowUp') { e.preventDefault(); onChange(clamp(value + 1)) } if (e.key === 'ArrowDown') { e.preventDefault(); onChange(clamp(value - 1)) } }}
          onChange={e => { const n = parseInt(e.target.value.replace(/\D/g, ''), 10); if (!isNaN(n)) onChange(clamp(n)) }} />
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(clamp(value + 1))}>+</button>
      </div>
    </div>
  )
}

function Check({ boat, setBoat, trip, setTrip }: { boat: Boat; setBoat: (b: Boat) => void; trip: Trip; setTrip: (t: Trip) => void }) {
  const v = verdict(boat)
  const est = estimate(boat, trip.nights)
  const rows: [keyof Boat, string, number][] = [['loa', 'Length', LIMITS.loa], ['beam', 'Beam', LIMITS.beam], ['draft', 'Draft', LIMITS.draft]]
  return (
    <div className={`check ${v.ok ? 'yes' : 'no'}`} id="fit">
      <h2 className="check-h">Will she fit?</h2>
      <div className="steppers">
        <Stepper id="f-loa" label="Length overall" value={boat.loa} min={10} max={200} onChange={n => setBoat({ ...boat, loa: n })} />
        <Stepper id="f-beam" label="Beam" value={boat.beam} min={4} max={40} onChange={n => setBoat({ ...boat, beam: n })} />
        <Stepper id="f-draft" label="Draft" value={boat.draft} min={1} max={15} onChange={n => setBoat({ ...boat, draft: n })} />
        <Stepper id="f-nights" label="Nights" unit="" value={trip.nights} min={0} max={90} onChange={n => setTrip({ ...trip, nights: n })} />
      </div>
      <div className="answer" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={v.ok ? 'ok' : v.body} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <p className="verdict">{v.title}</p>
            <p className="verdict-body tab">{v.body}</p>
          </motion.div>
        </AnimatePresence>
        <div className="gauges" aria-hidden="true">
          {rows.map(([k, label, lim]) => {
            const scaleMax = lim * 1.4
            return (
              <div className="gauge" key={k}>
                <span className="g-label">{label}</span>
                <div className="g-track"><span className="g-fill" style={{ transform: `scaleX(${Math.min(boat[k], scaleMax) / scaleMax})` }} data-over={boat[k] > lim || undefined} /><span className="g-limit" style={{ left: `${(lim / scaleMax) * 100}%` }} /></div>
                <span className="g-val tab">{boat[k]} <small>of {lim}</small></span>
              </div>
            )
          })}
        </div>
        {v.ok && <p className="est tab"><b>{money(est.total)}</b> <span>{trip.nights > 0 ? `dockage, ${est.line}, from the marina’s rate sheet. Power and water metered.` : est.line}</span></p>}
      </div>
      <div className="check-act">
        {v.ok
          ? <a className="btn" href="#request">Request a slip for her</a>
          : <a className="btn" href={`tel:${BIZ.tel}`}>Call the dockmaster</a>}
        <p className="alt tab">{v.ok && <a className="lnk" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a>}<span>VHF 16 on arrival</span></p>
      </div>
    </div>
  )
}

function Hero({ now, boat, setBoat, trip, setTrip }: { now: { day: number; min: number }; boat: Boat; setBoat: (b: Boat) => void; trip: Trip; setTrip: (t: Trip) => void }) {
  const reduce = useReducedMotion()
  const h = headline(now.day, now.min)
  return (
    <section aria-labelledby="live" className="hero" data-hero>
      <div className="wrap hero-grid">
        <figure className="hero-fig">
          <motion.div className="ph" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}>
            <img src={PHOTO.dusk.src(1050, 1400)} srcSet={`${PHOTO.dusk.src(600, 800)} 600w, ${PHOTO.dusk.src(1050, 1400)} 1050w`} sizes="(max-width: 860px) 100vw, 520px"
              alt={PHOTO.dusk.alt} width={1050} height={1400} fetchPriority="high" />
          </motion.div>
          <figcaption>The main dock at sundown.</figcaption>
        </figure>
        <div className="hero-text">
          <p id="live" className="live" aria-live="polite">
            <span className="when tab">{h.when}</span>
            <span className="what"><span className={h.open ? 'dot' : 'dot off'} aria-hidden="true" />{h.what}</span>
          </p>
          <p className="board" aria-label="Open now, Bahamas time">
            {PLACES.slice(1).map(p => { const l = line(p, now.day, now.min); return <span key={p.key} className={l.open ? 'o' : 'c'}><b>{p.name}</b> {l.text}</span> })}
          </p>
          <Check boat={boat} setBoat={setBoat} trip={trip} setTrip={setTrip} />
        </div>
      </div>
    </section>
  )
}

const SPECS: [string, string, string?][] = [
  ['Slips', '23'],
  ['Length overall', '120', 'ft'],
  ['Beam', '20', 'ft'],
  ['Draft at low tide', '7', 'ft'],
]

function Docks() {
  return (
    <section id="docks" className="docks" aria-labelledby="docks-h">
      <div className="wrap docks-grid">
        <div className="docks-story">
          <h2 id="docks-h" className="h2">Twenty-three slips, and seven feet of water under you at low tide.</h2>
          <div className="cols">
            <p className="drop">Man-O-War Marina has served this harbour since 1976: locals, marina guests and boats in from off the island. Hurricane Dorian did great damage in 2019. The marina rebuilt, and the docks, the fuel pumps, the restaurant and the shop are serving boats again.</p>
            <p>Slips take vessels up to 120 feet long with beams up to 20 feet, and drafts to 7 feet even at low tide. Every slip has 30 and 50 amp power and fresh water. Call on channel 16 as you come in and the dock staff will help you alongside.</p>
          </div>
          <figure className="docks-fig">
            <Photo p={PHOTO.sign} w={1440} h={1080} sizes="(max-width: 860px) 100vw, 640px" />
            <figcaption>The marina sign among the sailboats at their slips.</figcaption>
          </figure>
        </div>
        <aside className="facts" aria-label="Dock facts for captains">
          <p className="facts-title">For the captain</p>
          <dl className="specs">
            {SPECS.map(([k, v, u]) => <div key={k}><dt>{k}</dt><dd className="tab">{v}{u && <small> {u}</small>}</dd></div>)}
          </dl>
          <dl className="specs-list">
            <div><dt>Power</dt><dd>30 and 50 amp at every slip</dd></div>
            <div><dt>Water</dt><dd>At every slip</dd></div>
            <div><dt>Docking</dt><dd>Assisted, call VHF 16</dd></div>
            <div><dt>Fuel</dt><dd>Gasoline and diesel at the dock, the only pumps on the cay</dd></div>
            <div><dt>Office</dt><dd className="tab">Mon to Sat, 8 to 12 and 1 to 4</dd></div>
          </dl>
          <p className="facts-title rates-t">Dockage</p>
          <dl className="specs-list tab">
            <div><dt>Day stop</dt><dd>{money(DOCKAGE.dayStop)}, the first hour free</dd></div>
            <div><dt>Per night</dt><dd>$2.50 a foot to 14 nights, $2.00 for 15 to 30, $1.50 beyond 30, $1.00 beyond 60</dd></div>
            <div><dt>Dining</dt><dd>Free dockage while you eat at Dock N&rsquo; Dine</dd></div>
            <div><dt>Metered</dt><dd>Power $0.75 per kW, water $0.50 a gallon</dd></div>
            <div><dt>Laundry</dt><dd>{money(DOCKAGE.laundry)} a load</dd></div>
          </dl>
          <p className="facts-links"><a className="lnk" href={BIZ.rates} target="_blank" rel="noopener">The rate sheet (PDF)</a><a className="lnk tab" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></p>
        </aside>
      </div>
    </section>
  )
}

const DAYBAR = { from: 6 * 60, to: 18 * 60 }
function Fuel({ now }: { now: { day: number; min: number } }) {
  const working = now.day >= 1 && now.day <= 6
  const pct = (m: number) => ((m - DAYBAR.from) / (DAYBAR.to - DAYBAR.from)) * 100
  const nowPct = Math.min(100, Math.max(0, pct(now.min)))
  return (
    <section id="fuel" className="fuel" aria-labelledby="fuel-h">
      <div className="wrap fuel-grid">
        <div>
          <h2 id="fuel-h" className="h2">The only fuel on Man&#8209;O&#8209;War Cay.</h2>
          <p className="lede">Gasoline and diesel, alongside at the fuel dock or from the roadside pump in the village. Monday to Saturday, Bahamas time.</p>
          <div className="pumps">
            {[PLACES[0], PLACES[2]].map(p => {
              const l = line(p, now.day, now.min)
              return (
                <div className="pump" key={p.key}>
                  <h3 className="h3">{p.key === 'fuel' ? 'Dockside' : 'Roadside pump'}</h3>
                  <p className="tab hrs">{p.spans.map(([a, b]) => `${a / 60 > 12 ? a / 60 - 12 : a / 60} to ${b / 60 > 12 ? b / 60 - 12 : b / 60}`).join(' and ')}</p>
                  <p className={`state ${l.open ? 'o' : 'c'}`}>{l.open ? 'Open now, ' : 'Closed, '}{l.text}</p>
                  <div className="daybar" aria-hidden="true">
                    {p.spans.map(([a, b]) => <span key={a} className="span" style={{ left: `${pct(a)}%`, width: `${pct(b) - pct(a)}%` }} />)}
                    {working && <span className="tick" style={{ left: `${nowPct}%` }} />}
                  </div>
                  <p className="daybar-k tab" aria-hidden="true"><span>6 am</span><span>noon</span><span>6 pm</span></p>
                </div>
              )
            })}
          </div>
        </div>
        <figure className="fuel-fig">
          <Photo p={PHOTO.flag} w={960} h={1200} sizes="(max-width: 860px) 100vw, 460px" />
          <figcaption>A finger dock on a bright morning.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Request({ boat, trip, setTrip }: { boat: Boat; trip: Trip; setTrip: (t: Trip) => void }) {
  const [f, setF] = useState<Record<string, string>>({ power: '50 amp' })
  const leave = trip.arrive ? addDays(trip.arrive, trip.nights) : ''
  const est = estimate(boat, trip.nights)
  const fits = verdict(boat).ok
  const set = (k: string, v: string) => setF(s => ({ ...s, [k]: v }))
  const body = useMemo(() => [
    'Dear dockmaster,', '',
    `I would like to request a slip${trip.arrive ? ` from ${longDate(trip.arrive)}` : ''}${trip.arrive && trip.nights ? ` to ${longDate(leave)}` : ''} (${trip.nights ? `${trip.nights} ${trip.nights === 1 ? 'night' : 'nights'}` : 'day stop'}).`,
    `Boat: ${f.boat || '(name)'}, ${boat.loa} ft LOA, ${boat.beam} ft beam, ${boat.draft} ft draft.`,
    `Power: ${f.power}.`,
    fits ? `Your rate sheet suggests about ${money(est.total)} in dockage before power and water; please confirm.` : '',
    f.note ? `\n${f.note}` : '', '',
    `${f.name || ''}${f.phone ? `, ${f.phone}` : ''}`,
  ].join('\n'), [f, boat])
  const href = `mailto:${BIZ.email}?subject=${encodeURIComponent(`Slip request${f.boat ? `: ${f.boat}` : ''}${trip.arrive ? `, ${longDate(trip.arrive)}` : ''}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="request" className="request" aria-labelledby="req-h">
      <div className="wrap req-grid">
        <div className="req-head">
          <h2 id="req-h" className="h2">Request a slip</h2>
          <p className="lede">Fill in what you know. Your email opens with the letter written, addressed to the marina office. Your boat and nights come from the check at the top.</p>
          <p className="req-alt tab">Rather talk? <a className="lnk" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>, Monday to Saturday, 8 to 12 and 1 to 4. On arrival, VHF 16.</p>
        </div>
        <form className="letter" onSubmit={e => { e.preventDefault(); location.href = href }}>
          <p className="salute">Dear dockmaster,</p>
          <p className="flow">
            I would like a slip from <label className="inl"><span className="sr">Arriving</span><input type="date" min={iso(new Date())} value={trip.arrive} onChange={e => setTrip({ ...trip, arrive: e.target.value })} /></label>
            {trip.nights > 0 ? <> for <span className="tab">{trip.nights} {trip.nights === 1 ? 'night' : 'nights'}</span>{trip.arrive && <span className="tab"> (leaving {longDate(leave)})</span>}</> : <> for a day stop</>}, for <label className="inl wide"><span className="sr">Boat name</span><input placeholder="boat name" value={f.boat || ''} onChange={e => set('boat', e.target.value)} autoComplete="off" /></label>,
            <span className="tab"> {boat.loa} ft overall, {boat.beam} ft beam, drawing {boat.draft} ft.</span>
          </p>
          {fits && <p className="letter-est tab">About {money(est.total)} in dockage at the published rates, before power and water.</p>}
          <fieldset className="power"><legend>Shore power</legend>
            {['30 amp', '50 amp', 'None needed'].map(o => <label key={o} className={f.power === o ? 'on' : ''}><input type="radio" name="power" checked={f.power === o} onChange={() => set('power', o)} />{o}</label>)}
          </fieldset>
          <label className="block">Anything else (fuel on arrival, crew, questions)<textarea rows={3} value={f.note || ''} onChange={e => set('note', e.target.value)} /></label>
          <div className="sign">
            <label className="block">Your name<input autoComplete="name" value={f.name || ''} onChange={e => set('name', e.target.value)} /></label>
            <label className="block">Phone or email for the reply<input autoComplete="tel" value={f.phone || ''} onChange={e => set('phone', e.target.value)} /></label>
          </div>
          <div className="send">
            <button className="btn" type="submit">Write the email</button>
            <span className="note">Opens your email app, addressed to {BIZ.email}. Nothing is sent until you press send.</span>
          </div>
        </form>
      </div>
    </section>
  )
}

const DAY: { at: number; t: string; d: string }[] = [
  { at: 480, t: '8:00', d: 'The fuel dock and the office open. Gasoline and diesel alongside; the office and gift shop share one room.' },
  { at: 540, t: '9:00', d: 'The roadside pump opens for drivers on the island.' },
  { at: 660, t: '11:00', d: 'Dock N’ Dine starts lunch, local and international cooking on the water.' },
  { at: 720, t: '12:00', d: 'The office and both pumps break for lunch.' },
  { at: 780, t: '1:00', d: 'The fuel dock and the office reopen.' },
  { at: 840, t: '2:00', d: 'The roadside pump reopens.' },
  { at: 900, t: '3:00', d: 'Lunch service ends.' },
  { at: 960, t: '4:00', d: 'The office and the fuel dock close for the day.' },
  { at: 1020, t: 'Evening', d: 'For marina guests: showers and restrooms, laundry, the grill area and the pool.' },
]

function Day({ now }: { now: { day: number; min: number } }) {
  const working = now.day >= 1 && now.day <= 6
  let cur = -1
  DAY.forEach((r, i) => { if (now.min >= r.at) cur = i })
  return (
    <section id="day" className="day" aria-labelledby="day-h">
      <div className="wrap day-grid">
        <figure className="day-fig">
          <Photo p={PHOTO.porch} w={1200} h={1500} sizes="(max-width: 860px) 100vw, 560px" />
          <figcaption>The porch at Dock N&rsquo; Dine. Lunch Monday to Saturday, 11 to 3. <a className="lnk tab" href={`tel:${BIZ.restaurantTel}`}>{BIZ.restaurantPhone}</a></figcaption>
        </figure>
        <div className="day-list">
          <h2 id="day-h" className="h2">A day at the marina</h2>
          <p className="lede">Monday to Saturday, by the hours the marina keeps. {working ? 'The line shows where the day is now, in Bahamas time.' : 'Today is Sunday: the office and pumps open again Monday at eight.'}</p>
          <ol className="timeline">
            {DAY.map((r, i) => (
              <li key={r.t} data-now={working && i === cur ? '' : undefined} data-past={working && i < cur ? '' : undefined}>
                <time className="tab">{r.t}{r.at < 1020 && <small>{r.at < 720 ? ' am' : ' pm'}</small>}</time>
                <p>{r.d}{working && i === cur && <span className="nowtag">now</span>}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Ashore() {
  return (
    <section className="ashore" aria-labelledby="ashore-h">
      <div className="wrap ashore-grid">
        <figure className="a-big">
          <Photo p={PHOTO.walk} w={1280} h={1600} sizes="(max-width: 860px) 100vw, 720px" />
          <figcaption>The boardwalk from the slips to Dock N&rsquo; Dine.</figcaption>
        </figure>
        <div className="a-side">
          <h2 id="ashore-h" className="h2">Everything ashore is a short walk down the boardwalk.</h2>
          <p>Dock N&rsquo; Dine serves lunch, dinner and ice cream with the harbour in front of you, to marina guests, islanders and off-island visitors. The office doubles as the gift shop: custom t-shirts, local art and marine grade dive gear.</p>
          <figure className="a-small">
            <Photo p={PHOTO.shop} w={800} h={1000} sizes="(max-width: 860px) 70vw, 360px" />
            <figcaption>Inside the office and gift shop.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function Cay() {
  return (
    <section className="cay" aria-labelledby="cay-h">
      <div className="wrap"><div className="cay-inner">
        <h2 id="cay-h" className="h2">Man&#8209;O&#8209;War Cay is two miles long and half a mile wide.</h2>
        <p className="cay-body">From the marina you walk to the grocery, the Heritage Museum and its coffee shop, the bakeries, the boat-building shops, the churches, the playground, the beaches and the ferry.</p>
        <a className="lnk" href="island.html">Life on the cay</a>
      </div></div>
    </section>
  )
}

function Home() {
  const now = useNow()
  const [boat, setBoat] = useState<Boat>({ loa: 52, beam: 16, draft: 5 })
  const [trip, setTrip] = useState<Trip>({ arrive: '', nights: 3 })
  return (
    <>
      <Masthead home />
      <main id="main">
        <Hero now={now} boat={boat} setBoat={setBoat} trip={trip} setTrip={setTrip} />
        <Docks />
        <Fuel now={now} />
        <Request boat={boat} trip={trip} setTrip={setTrip} />
        <Day now={now} />
        <Ashore />
        <Cay />
      </main>
      <Colophon />
      <MobileStrip />
    </>
  )
}

mount(<Home />)
