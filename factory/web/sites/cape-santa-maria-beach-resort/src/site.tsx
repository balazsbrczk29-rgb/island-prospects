import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { M, BOOK, P, type PK, contact, rooms, allRooms, ROUTES, TIMETABLE, type Route } from './data'
import map from './map.json'

const ease = [0.22, 1, 0.36, 1] as const
type Pt = [number, number]
const pts = map.p as Record<string, Pt>

export function Img({ k, eager, className }: { k: PK; eager?: boolean; className?: string }) {
  const p = P[k]
  return <img className={className} src={M + p.src} width={p.w} height={p.h} alt={p.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : undefined} />
}

/* ---------- shared plan state ---------- */
export type Plan = { r: number; setR: (n: number) => void; room: number; setRoom: (n: number) => void }
export function usePlan(): Plan {
  const [r, setR] = useState(0)
  const [room, setRoom] = useState(0)
  return { r, setR, room, setRoom }
}
const mailPlan = (route: Route, room: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent('Planning a stay at Cape Santa Maria')}&body=${encodeURIComponent(`Hello,\n\nMy route: ${route.plan}.\nRoom: ${room}.\nMy dates: \nGuests: \n\nThank you.`)}`

/* ---------- header ---------- */
export function Header({ home = true }: { home?: boolean }) {
  const b = home ? '' : './'
  return (
    <header className="hd">
      <a className="hd__mark" href="./">Cape Santa Maria</a>
      <nav className="hd__nav" aria-label="Site">
        <a href={b + '#rooms'}>Rooms</a>
        <a href={b + '#beach-house'}>Beach House</a>
        <a href={b + '#days'}>Days here</a>
        <a href="getting-here.html" aria-current={home ? undefined : 'page'}>Getting here</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="btn btn--sm btn--line" href={BOOK}>Check availability</a>
    </header>
  )
}

/* ---------- the chart ---------- */
function curve(a: Pt, b: Pt, bow = 0.12): string {
  const [x1, y1] = a, [x2, y2] = b
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  // perpendicular, bowed toward the north (negative y)
  let nx = dy, ny = -dx
  if (ny > 0) { nx = -nx; ny = -ny }
  const c: Pt = [mx + nx * bow, my + ny * bow]
  return `M${x1} ${y1} Q${c[0].toFixed(1)} ${c[1].toFixed(1)} ${x2} ${y2}`
}
const CODE: Record<string, [string, number, number]> = { fxe: ['FXE', 14, 22], nas: ['NAS', -46, -10], ggt: ['GGT', -40, -14], sml: ['SML', 16, 30] }
const ISLANDS: [string, string][] = [['Florida', 'florida'], ['Grand Bahama', 'grandbahama'], ['Abaco', 'abaco'], ['Andros', 'andros'], ['Eleuthera', 'eleuthera'], ['Cat Island', 'cat'], ['Exuma', 'exuma'], ['Long Island', 'long']]

export function Chart({ route, postcard = true }: { route: Route; postcard?: boolean }) {
  const reduce = useReducedMotion()
  const draw = reduce ? 0 : 1.1
  const cape = pts.cape
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${map.w} ${map.h}`} role="img" aria-label={`Chart of the Bahamas showing the route: ${route.line}`}>
        <rect width={map.w} height={map.h} className="chart__sea" />
        <g className="chart__grat">
          {map.gx.map(([lo, x]) => <line key={'x' + lo} x1={x} x2={x} y1={0} y2={map.h} />)}
          {map.gy.map(([la, y]) => <line key={'y' + la} y1={y} y2={y} x1={0} x2={map.w} />)}
        </g>
        <path d={map.land} className="chart__land" />
        <g className="chart__deg">
          {map.gx.map(([lo, x]) => <text key={'x' + lo} x={x + 5} y={map.h - 10}>{Math.abs(lo)}°W</text>)}
          {map.gy.filter(([, y]) => y > 20).map(([la, y]) => <text key={'y' + la} x={map.w - 8} y={y - 6} textAnchor="end">{la}°N</text>)}
        </g>
        <g className="chart__isl">
          {ISLANDS.map(([n, k]) => <text key={k} x={pts[k][0]} y={pts[k][1]} textAnchor={k === 'florida' ? 'start' : 'middle'}>{n}</text>)}
        </g>
        {postcard && <line className="chart__tie" x1={800} y1={200} x2={cape[0]} y2={cape[1] - 8} />}
        <AnimatePresence initial={true}>
          <motion.g key={route.k} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.18 } }}>
            {route.legs.map((l, i) => {
              const a = pts[l.from], b = pts[l.to]
              const d = l.kind === 'taxi' ? `M${a[0]} ${a[1]} L${b[0]} ${b[1]}` : curve(a, b, l.kind === 'open' ? 0.06 : 0.12)
              const delay = i === 0 ? 0.15 : 0.15 + draw
              return (
                <motion.path key={i} d={d} className={'chart__leg chart__leg--' + l.kind}
                  initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: l.kind === 'taxi' ? draw * 0.3 : draw, delay, ease }} />
              )
            })}
            {route.codes.map((c, i) => {
              const p = pts[c], [t, dx, dy] = CODE[c]
              return (
                <motion.g key={c} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i === 0 ? 0.05 : 0.1 + draw, duration: 0.3, ease }} style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}>
                  <circle cx={p[0]} cy={p[1]} r={5.5} className="chart__pin" />
                  <text x={p[0] + dx} y={p[1] + dy} className="chart__code">{t}</text>
                </motion.g>
              )
            })}
            {route.k === 'own' && <motion.text x={pts.own[0] + 10} y={pts.own[1] + 30} className="chart__note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>from your field</motion.text>}
          </motion.g>
        </AnimatePresence>
        <g className="chart__cape">
          <circle cx={cape[0]} cy={cape[1]} r={11} className="chart__ring" />
          <circle cx={cape[0]} cy={cape[1]} r={4.5} className="chart__dot" />
          <text x={cape[0] - 16} y={cape[1] + 46} textAnchor="end" className="chart__dest">Cape Santa Maria</text>
        </g>
      </svg>
      {postcard && (
        <div className="postcard">
          <div className="ph ph--169"><Img k="aerial" eager /></div>
          <p>The bungalows on the beach.</p>
        </div>
      )}
    </figure>
  )
}

/* ---------- gateway picker ---------- */
export function Gateways({ r, setR, idp }: { r: number; setR: (n: number) => void; idp: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (r + d + ROUTES.length) % ROUTES.length
    setR(n); refs.current[n]?.focus()
  }
  useEffect(() => { const el = refs.current[r]; if (el && el.parentElement && el.parentElement.scrollWidth > el.parentElement.clientWidth) el.parentElement.scrollTo({ left: el.offsetLeft - 20, behavior: 'smooth' }) }, [r])
  return (
    <div className="gates" role="radiogroup" aria-labelledby={idp} onKeyDown={onKey}>
      {ROUTES.map((x, i) => (
        <button key={x.k} ref={el => { refs.current[i] = el }} type="button" role="radio" aria-checked={i === r} tabIndex={i === r ? 0 : -1} className="gate" onClick={() => setR(i)}>
          <span className="gate__name">{x.label}</span>
          <span className="gate__mode">{x.mode}</span>
        </button>
      ))}
    </div>
  )
}

export function RoomChips({ room, setRoom }: { room: number; setRoom: (n: number) => void }) {
  return (
    <div className="chips" role="group" aria-label="Room">
      {rooms.map((x, i) => (
        <button key={x.k} type="button" className="chip" aria-pressed={i === room} onClick={() => setRoom(i)}>
          <span className="chip__t">{x.short}</span><span className="chip__s tnum">{x.size}</span>
        </button>
      ))}
    </div>
  )
}

function Sentence({ route }: { route: Route }) {
  return (
    <p className="answer" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={route.k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.26, ease }}>
          <em>From {route.label === 'Your own plane' ? 'your own field' : route.label}:</em> {route.line}
        </motion.span>
      </AnimatePresence>
    </p>
  )
}

/* ---------- screen 1 ---------- */
export function Opening({ plan }: { plan: Plan }) {
  const route = ROUTES[plan.r]
  return (
    <section className="open" aria-labelledby="h1">
      <div className="open__text">
        <p className="dateline">Seymour's, Long Island, The Bahamas</p>
        <h1 id="h1">The beach at the end of the&nbsp;line.</h1>
        <p className="open__ask" id="ask">Where do you start?</p>
        <Gateways r={plan.r} setR={plan.setR} idp="ask" />
        <Sentence route={route} />
      </div>
      <div className="open__map">
        <Chart route={route} />
      <div className="open__book">
        <RoomChips room={plan.room} setRoom={plan.setRoom} />
        <div className="open__acts">
          <a className="btn" href={BOOK}>Check availability</a>
          <a className="ul" href={mailPlan(route, rooms[plan.room].name)}>Email us this plan</a>
        </div>
      </div>
      </div>
    </section>
  )
}

/* ---------- screen 2 ---------- */
export function Rooms({ plan }: { plan: Plan }) {
  const r = rooms[plan.room]
  const rows: [string, (x: typeof r) => ReactNode][] = [
    ['Size', x => <span className="tnum">{x.size}</span>], ['Bedrooms', x => x.bedrooms], ['Beds', x => x.beds], ['Kitchen', x => x.kitchen], ['Outside', x => x.outside], ['Also', x => x.extra],
  ]
  return (
    <section className="rooms" id="rooms" aria-labelledby="rooms-h">
      <figure className="rooms__pic">
        <div className="ph ph--43">
          <AnimatePresence initial={false}>
            <motion.div key={r.pic} className="fill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}><Img k={r.pic} /></motion.div>
          </AnimatePresence>
        </div>
        <figcaption>{r.cap}</figcaption>
      </figure>
      <div className="rooms__text">
        <h2 id="rooms-h">Three ways to sleep on the&nbsp;beach.</h2>
        <p className="rooms__lede">The bungalows line the sand beside the Beach House, and the villas look west over the water. Choose one and check your dates.</p>
        <div className="rtable" role="table" aria-label="The three beachfront room types">
          <div className="rtable__row rtable__head" role="row">
            <span role="columnheader" className="rtable__k" />
            {rooms.map((x, i) => (
              <span role="columnheader" key={x.k} className={'rtable__c' + (i === plan.room ? ' is-on' : '')}>
                <button type="button" aria-pressed={i === plan.room} onClick={() => plan.setRoom(i)}>{x.name}</button>
              </span>
            ))}
          </div>
          {rows.map(([label, f]) => (
            <div className="rtable__row" role="row" key={label}>
              <span role="rowheader" className="rtable__k">{label}</span>
              {rooms.map((x, i) => <span role="cell" key={x.k} className={'rtable__c' + (i === plan.room ? ' is-on' : '')}>{f(x)}</span>)}
            </div>
          ))}
        </div>
        <div className="rphone">
          <RoomChips room={plan.room} setRoom={plan.setRoom} />
          <dl className="rphone__dl">{rows.map(([label, f]) => <div key={label}><dt>{label}</dt><dd>{f(r)}</dd></div>)}</dl>
        </div>
        <p className="small">{allRooms}</p>
        <a className="btn" href={BOOK}>Check availability for the {r.short.toLowerCase()}</a>
      </div>
    </section>
  )
}

/* ---------- screen 3 ---------- */
export function Beach() {
  return (
    <>
      <section className="beach" aria-label="The beach">
        <figure className="beach__plate">
          <div className="ph ph--wide"><Img k="aerial" /></div>
          <figcaption>The bungalows from the air, a few steps from the water.</figcaption>
        </figure>
        <div className="beach__story">
          <p className="dropcap">Cape Santa Maria sits at the far northern tip of Long Island, where the beach runs long and white and the water turns every shade of turquoise. The bungalows line the sand beside the Beach House, so the walk from your door to the sea is a few barefoot steps.</p>
          <figure><div className="ph ph--32"><Img k="beach" /></div><figcaption>The beach at Cape Santa Maria, the bungalows behind the palms.</figcaption></figure>
        </div>
      </section>
      <section className="bh" id="beach-house" aria-labelledby="bh-h">
        <figure className="bh__pic"><div className="ph ph--45"><Img k="bar" /></div><figcaption>The bar, a few steps from the water.</figcaption></figure>
        <div className="bh__text">
          <h2 id="bh-h">The Beach House.</h2>
          <p>The resort's restaurant and bar sits on the sand with the bungalows on either side, so dinner is a short barefoot walk from your veranda.</p>
          <p>Ask for the menu and dinner times when you book, and tell the team about any dietary needs before you arrive.</p>
          <figure className="bh__small"><div className="ph ph--32"><Img k="salad" /></div><figcaption>At the Beach House.</figcaption></figure>
        </div>
      </section>
    </>
  )
}

/* ---------- screen 4 ---------- */
export function Days() {
  return (
    <section className="days" id="days" aria-labelledby="days-h">
      <div className="days__head">
        <h2 id="days-h">Days here are as busy as you make&nbsp;them.</h2>
        <div className="days__copy">
          <p className="lede">Scuba diving, snorkelling and a nature cruise, fishing, kayaking and paddleboarding straight off the beach, or nothing at all.</p>
          <p className="days__wed"><b>Weddings.</b> The resort hosts weddings on the beach. Write to <a href={`mailto:${contact.email}?subject=${encodeURIComponent('A wedding at Cape Santa Maria')}`}>{contact.email}</a> with your date and the number of guests.</p>
        </div>
      </div>
      <div className="days__grid">
        <figure className="d1"><div className="ph ph--32"><Img k="paddle" /></div><figcaption>Paddleboarding off the beach, dog aboard.</figcaption></figure>
        <figure className="d2"><div className="ph ph--45"><Img k="fishing" /></div><figcaption>Fishing off Long Island.</figcaption></figure>
        <figure className="d3"><div className="ph ph--32"><Img k="scuba" /></div><figcaption>On the reef with the dive team.</figcaption></figure>
      </div>
    </section>
  )
}

/* ---------- screen 5 ---------- */
export function Timetable({ onPick, active, home = true }: { onPick?: (k: string) => void; active?: string; home?: boolean }) {
  return (
    <section className="tt" id="getting-here" aria-labelledby="tt-h">
      <div className="tt__head">
        <h2 id="tt-h">Every way to Long&nbsp;Island.</h2>
        <p className="lede">Every route ends at Stella Maris Airport (SML), a short taxi ride from the resort, or on the beach itself. The resort arranges your taxi.</p>
      </div>
      <div className="tt__table" role="table" aria-label="Routes to Cape Santa Maria">
        <div className="tt__row tt__th" role="row">{['From', 'Carrier', 'Days', 'Lands at', 'Then'].map(h => <span role="columnheader" key={h}>{h}</span>)}</div>
        {TIMETABLE.map((t, i) => (
          <div role="row" key={i} className={'tt__row' + (active === t.r ? ' is-on' : '')} onClick={onPick ? () => onPick(t.r) : undefined}>
            <span role="cell" className="tt__from">{onPick ? <button type="button" onClick={() => onPick(t.r)} aria-pressed={active === t.r}>{t.from}</button> : t.from}</span>
            <span role="cell">{t.carrier}</span>
            <span role="cell" className="tt__days">{t.days}</span>
            <span role="cell">{t.lands}</span>
            <span role="cell" className="tt__then">{t.then}</span>
          </div>
        ))}
      </div>
      {home && <p className="tt__more"><a className="ul" href="getting-here.html">Getting here, with the chart and notes for pilots</a></p>}
    </section>
  )
}

/* ---------- screen 6 ---------- */
export function Close({ plan }: { plan: Plan }) {
  const route = ROUTES[plan.r], room = rooms[plan.room]
  return (
    <footer className="close" id="contact">
      <div className="close__main">
        <h2>Your plan, in one&nbsp;line.</h2>
        <p className="close__plan">{route.plan}, then a {room.name} on the&nbsp;beach.</p>
        <div className="close__acts">
          <a className="btn btn--lg" href={BOOK}>Check availability</a>
          <a className="ul" href={mailPlan(route, room.name)}>Email this plan to the resort</a>
        </div>
      </div>
      <div className="close__grid">
        <p><a className="tnum" href={`tel:${contact.tollfree.tel}`}>{contact.tollfree.label}</a><span>Toll free from the US and Canada</span></p>
        <p><a className="tnum" href={`tel:${contact.local.tel}`}>{contact.local.label}</a><span>On the island</span></p>
        <p><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.address}</span></p>
        <p className="close__social">{contact.socials.map(([n, u]) => <a key={n} href={u}>{n}</a>)}</p>
      </div>
      <p className="credit">Photography: Cape Santa Maria Beach Resort. Chart: Natural Earth coastline, public domain.</p>
    </footer>
  )
}

export function Strip() {
  return (
    <div className="strip" aria-label="Book">
      <a className="btn" href={BOOK}>Check availability</a>
      <a className="strip__call" href={`tel:${contact.tollfree.tel}`}>Call</a>
    </div>
  )
}
