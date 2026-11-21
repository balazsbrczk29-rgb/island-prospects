import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { BIZ, LIMITS, PHOTO } from './data'
import { PLACES, headline, line, nassauNow } from './hours'
import { Colophon, Masthead, MobileStrip, Photo, mount } from './site'

function useNow() {
  const [now, setNow] = useState(() => nassauNow())
  useEffect(() => { const t = setInterval(() => setNow(nassauNow()), 30_000); return () => clearInterval(t) }, [])
  return now
}

type Boat = { loa: number; beam: number; draft: number }

function Hero({ now }: { now: { day: number; min: number } }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, v => (reduce ? 1 : 1 + v * 0.09))
  const h = headline(now.day, now.min)
  return (
    <section aria-labelledby="live" className="hero" data-hero>
      <div className="hero-band" ref={ref}>
        <motion.div className="ph" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}>
          <motion.img src={PHOTO.dusk.src(1800, 2400)} srcSet={`${PHOTO.dusk.src(900, 1200)} 900w, ${PHOTO.dusk.src(1800, 2400)} 1800w`} sizes="100vw"
            alt={PHOTO.dusk.alt} width={1800} height={2400} fetchPriority="high" style={{ scale }} />
        </motion.div>
        <p className="hero-cap">The main dock at sundown</p>
      </div>
      <div className="wrap">
        <div className="hero-text">
          <p id="live" className="live" aria-live="polite">
            <span className="when tab">{h.when}</span>
            <span className="what"><span className={h.open ? 'dot' : 'dot off'} aria-hidden="true" />{h.what}</span>
          </p>
          <p className="board" aria-label="Open now, Bahamas time">
            {PLACES.slice(1).map(p => { const l = line(p, now.day, now.min); return <span key={p.key} className={l.open ? 'o' : 'c'}><b>{p.name}</b>&nbsp;{l.text}</span> })}
          </p>
          <div className="hero-act">
            <a className="btn" href="#request">Request a slip</a>
            <p className="alt tab"><a className="lnk" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a><span>Assisted docking on VHF 16</span></p>
          </div>
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
          <p className="facts-links"><a className="lnk" href={BIZ.rates} target="_blank" rel="noopener">Dockage rates (PDF)</a><a className="lnk tab" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></p>
        </aside>
      </div>
    </section>
  )
}

function Stepper({ id, label, value, min, max, onChange }: { id: string; label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n)))
  return (
    <div className="stepper">
      <label htmlFor={id}>{label}</label>
      <div className="stepper-row">
        <button type="button" aria-label={`Less ${label.toLowerCase()}`} onClick={() => onChange(clamp(value - 1))}>&minus;</button>
        <input id={id} className="tab" inputMode="numeric" size={3} value={value} onChange={e => { const n = parseInt(e.target.value.replace(/\D/g, ''), 10); if (!isNaN(n)) onChange(clamp(n)) }} />
        <span className="unit">ft</span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => onChange(clamp(value + 1))}>+</button>
      </div>
    </div>
  )
}

function verdict(b: Boat) {
  const over = [
    b.loa > LIMITS.loa && `her length is ${b.loa} ft, over the ${LIMITS.loa} ft we list`,
    b.beam > LIMITS.beam && `her beam is ${b.beam} ft, over the ${LIMITS.beam} ft we list`,
    b.draft > LIMITS.draft && `she draws ${b.draft} ft, more than the ${LIMITS.draft} ft we have at low tide`,
  ].filter(Boolean) as string[]
  if (over.length) return { ok: false, title: 'Talk to the dockmaster first.', body: `As entered, ${over.join(', and ')}. Call ${BIZ.phone} before you plan on a slip here.` }
  const spare = LIMITS.draft - b.draft
  return { ok: true, title: 'She fits.', body: `${b.loa} ft by ${b.beam} ft, drawing ${b.draft} ft: inside every limit we publish, with ${spare} ft to spare at low tide.` }
}

function Fit({ boat, setBoat }: { boat: Boat; setBoat: (b: Boat) => void }) {
  const v = verdict(boat)
  const rows: [keyof Boat, string, number][] = [['loa', 'Length', LIMITS.loa], ['beam', 'Beam', LIMITS.beam], ['draft', 'Draft', LIMITS.draft]]
  return (
    <section id="fit" className="fit" aria-labelledby="fit-h">
      <div className="wrap fit-grid">
        <div className="fit-in">
          <h2 id="fit-h" className="h2">Will she fit?</h2>
          <p className="lede">Set your boat against the limits the marina publishes. Takes ten seconds.</p>
          <div className="steppers">
            <Stepper id="f-loa" label="Length overall" value={boat.loa} min={10} max={200} onChange={n => setBoat({ ...boat, loa: n })} />
            <Stepper id="f-beam" label="Beam" value={boat.beam} min={4} max={40} onChange={n => setBoat({ ...boat, beam: n })} />
            <Stepper id="f-draft" label="Draft" value={boat.draft} min={1} max={15} onChange={n => setBoat({ ...boat, draft: n })} />
          </div>
        </div>
        <div className={`fit-out ${v.ok ? 'yes' : 'no'}`} aria-live="polite">
          <p className="verdict">{v.title}</p>
          <p className="verdict-body tab">{v.body}</p>
          <div className="gauges">
            {rows.map(([k, label, lim]) => {
              const scaleMax = lim * 1.4
              return (
                <div className="gauge" key={k}>
                  <span className="g-label">{label}</span>
                  <div className="g-track" aria-hidden="true">
                    <span className="g-fill" style={{ transform: `scaleX(${Math.min(boat[k], scaleMax) / scaleMax})` }} data-over={boat[k] > lim || undefined} />
                    <span className="g-limit" style={{ left: `${(lim / scaleMax) * 100}%` }} />
                  </div>
                  <span className="g-val tab">{boat[k]} <small>of {lim} ft</small></span>
                </div>
              )
            })}
          </div>
          <a className="btn" href="#request">{v.ok ? 'Request a slip for her' : 'Ask about a slip'}</a>
        </div>
      </div>
    </section>
  )
}

function Request({ boat }: { boat: Boat }) {
  const [f, setF] = useState<Record<string, string>>({ power: '50 amp' })
  const set = (k: string, v: string) => setF(s => ({ ...s, [k]: v }))
  const body = useMemo(() => [
    'Dear dockmaster,', '',
    `I would like to request a slip${f.from ? ` from ${f.from}` : ''}${f.to ? ` to ${f.to}` : ''}.`,
    `Boat: ${f.boat || '(name)'}, ${boat.loa} ft LOA, ${boat.beam} ft beam, ${boat.draft} ft draft.`,
    `Power: ${f.power}.`,
    f.note ? `\n${f.note}` : '', '',
    `${f.name || ''}${f.phone ? `, ${f.phone}` : ''}`,
  ].join('\n'), [f, boat])
  const href = `mailto:${BIZ.email}?subject=${encodeURIComponent(`Slip request${f.boat ? `: ${f.boat}` : ''}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="request" className="request" aria-labelledby="req-h">
      <div className="wrap req-grid">
        <div className="req-head">
          <h2 id="req-h" className="h2">Request a slip</h2>
          <p className="lede">Fill in what you know. Your email opens with the letter written, addressed to the marina office. Your boat's size comes from the check above.</p>
          <p className="req-alt tab">Rather talk? <a className="lnk" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>, Monday to Saturday, 8 to 12 and 1 to 4. On arrival, VHF 16.</p>
        </div>
        <form className="letter" onSubmit={e => { e.preventDefault(); location.href = href }}>
          <p className="salute">Dear dockmaster,</p>
          <p className="flow">
            I would like a slip from <label className="inl"><span className="sr">Arriving</span><input type="date" value={f.from || ''} onChange={e => set('from', e.target.value)} /></label>
            to <label className="inl"><span className="sr">Leaving</span><input type="date" min={f.from} value={f.to || ''} onChange={e => set('to', e.target.value)} /></label>
            for <label className="inl wide"><span className="sr">Boat name</span><input placeholder="boat name" value={f.boat || ''} onChange={e => set('boat', e.target.value)} autoComplete="off" /></label>,
            <span className="tab"> {boat.loa} ft overall, {boat.beam} ft beam, drawing {boat.draft} ft.</span>
          </p>
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
  return (
    <>
      <Masthead home />
      <main id="main">
        <Hero now={now} />
        <Docks />
        <Fit boat={boat} setBoat={setBoat} />
        <Request boat={boat} />
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
