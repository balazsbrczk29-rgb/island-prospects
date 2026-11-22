import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { BIZ, VILLAS, WHOLE, HOURS, ph } from './data'
import { money } from './price'
import { priceVilla } from './tool'

const ease = [0.22, 1, 0.36, 1] as const
function Title({ id, children, className = 'h2' }: { id: string; children: React.ReactNode; className?: string }) {
  return <h2 id={id} className={className}>{children}</h2>
}

export function Villas() {
  return (
    <section id="villas" className="villas-s" aria-labelledby="villas-h">
      <figure className="villas-photo"><img src={ph('114')} srcSet={`${ph('114', 1280)} 1280w, ${ph('114')} 1920w`} sizes="(max-width: 900px) 100vw, 40vw" alt="Firefly Sunset Resort seen from the water: the villas above the rebuilt dock and dining deck" width={1920} height={2553} loading="lazy" /></figure>
      <div className="villas-list">
        <Title id="villas-h">Every villa faces the sunset.</Title>
        <ol className="index">
          {VILLAS.map(v => (
            <li key={v.id}>
              <div className="ix-head"><h3 className="h3">{v.name}</h3><p className="cap num">{v.beds}</p></div>
              <p className="ix-line">{v.line}</p>
              {v.inDay && v.inWeek && v.offDay && v.offWeek
                ? <dl className="ix-rates num"><div><dt>February to August</dt><dd>{money(v.inDay)} a night, {money(v.inWeek)} a week</dd></div><div><dt>September to January</dt><dd>{money(v.offDay)} a night, {money(v.offWeek)} a week</dd></div></dl>
                : <p className="ix-rates cap">Rates on request</p>}
              <p className="ix-acts"><button type="button" className="textlink" onClick={() => priceVilla(v.id)}>Price my dates</button><a className="textlink quiet" href={v.book}>Request to book</a></p>
            </li>
          ))}
        </ol>
        <p className="rules cap">Rates in US dollars before 10% VAT. February to August: three nights minimum. The September to January rate excludes Thanksgiving, Christmas and New Year. <a href="villas.html">All rates in one table</a></p>
      </div>
    </section>
  )
}

export function Resort() {
  return (
    <section className="resort" aria-labelledby="resort-h">
      <figure className="r-a"><img src={ph('183')} srcSet={`${ph('183', 1280)} 1280w, ${ph('183')} 1920w`} sizes="(max-width: 900px) 100vw, 62vw" alt="Wooden steps from the Firefly dock down into clear water" width={1920} height={1440} loading="lazy" /></figure>
      <div className="r-text">
        <Title id="resort-h">Down the steps, the reef.</Title>
        <p className="lead">A private beach, a snorkel reef off the dock, free kayaks, two pools (the upper pool for villa guests), dock slips for your boat, and a boutique. Pets are welcome.</p>
      </div>
      <figure className="r-b"><img src={ph('099')} srcSet={`${ph('099', 1280)} 1280w, ${ph('099')} 1920w`} sizes="(max-width: 900px) 100vw, 58vw" alt="The lower pool and lawn at Firefly, sailboats on the Sea of Abaco beyond" width={1920} height={1420} loading="lazy" /><figcaption className="cap">Two pools, the Sea of Abaco beyond.</figcaption></figure>
    </section>
  )
}

export function Grill() {
  return (
    <section id="grill" className="grill" aria-labelledby="grill-h">
      <figure className="grill-photo"><img src={ph('123')} srcSet={`${ph('123', 1280)} 1280w, ${ph('123')} 1920w`} sizes="(max-width: 900px) 100vw, 58vw" alt="The Firefly dining deck at dusk under string lights, the dock and the water beyond" width={1920} height={1280} loading="lazy" /></figure>
      <div className="grill-text">
        <Title id="grill-h">Firefly Bar &amp; Grill</Title>
        <p className="lead">Open seven days, to guests, locals and visitors.</p>
        <dl className="hours num">
          {HOURS.map(h => <div key={h.meal}><dt>{h.meal}</dt><dd>{h.time}{h.note && <span>{h.note}</span>}</dd></div>)}
        </dl>
        <p className="cap">Parties of 12 or more, call <a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>. To-go orders in The Boutique until 8 pm.</p>
        <a className="btn btn-line" href={BIZ.dinner}>Reserve dinner</a>
      </div>
    </section>
  )
}

const ROUTE = [
  { t: 'Fly', m: 'Marsh Harbour', d: 'Fly into Marsh Harbour, Abaco' },
  { t: '15 min', m: 'Taxi', d: 'to the ferry dock' },
  { t: '20 min', m: 'Ferry', d: 'across to Hope Town' },
  { t: 'Shuttle', m: 'Firefly', d: 'our shuttle meets you at the harbour' },
]
export function Arrive() {
  const ref = useRef<HTMLOListElement>(null)
  const seen = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  return (
    <section id="arrive" className="arrive" aria-labelledby="arrive-h">
      <Title id="arrive-h">Getting here takes four easy steps.</Title>
      <ol className="route" ref={ref}>
        <motion.span className="route-line" aria-hidden="true" initial={false} animate={{ scaleX: seen || reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.2, ease: [0.65, 0, 0.35, 1] }} />
        {ROUTE.map((r, i) => (
          <motion.li key={r.m} initial={false} animate={{ opacity: seen || reduce ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.25 + i * 0.25 }}>
            <span className="stop" aria-hidden="true" />
            <span className="r-t num">{r.t}</span>
            <span className="r-m">{r.m}</span>
            <span className="r-d">{r.d}</span>
          </motion.li>
        ))}
      </ol>
      <p className="cap">Abaco is under 180 miles from Florida.</p>
    </section>
  )
}

export function Groups() {
  return (
    <section className="groups" aria-labelledby="groups-h">
      <div className="g-a">
        <Title id="groups-h">Take the whole resort.</Title>
        <dl className="g-prices num">
          <div><dt>Three days</dt><dd>{money(WHOLE.three)}</dd></div>
          <div><dt>One week</dt><dd>{money(WHOLE.week)}</dd></div>
        </dl>
        <p className="cap">VAT included. All six villas, for your group.</p>
        <button type="button" className="btn" onClick={() => priceVilla('whole')}>Price the whole resort</button>
      </div>
      <div className="g-b">
        <h3 className="h3">Weddings and events</h3>
        <p>Weddings and events on the beach and the decks. Tell the resort your date and your numbers.</p>
        <h3 className="h3">Concierge</h3>
        <ul className="plain"><li>Golf carts</li><li>Boats</li><li>Charters</li><li>Provisions before you arrive</li></ul>
      </div>
    </section>
  )
}

export function Night() {
  return (
    <section id="contact" className="night" aria-labelledby="night-h">
      <img src={ph('029')} srcSet={`${ph('029', 1280)} 1280w, ${ph('029')} 1920w`} sizes="100vw" alt="Firefly Sunset Resort at night, lights on the deck and the dock" width={1920} height={1427} loading="lazy" />
      <div className="calling">
        <h2 id="night-h" className="h3">Firefly Sunset Resort</h2>
        <p className="cap">{BIZ.place}</p>
        <p className="mail"><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
        <p className="num"><a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>, Bar &amp; Grill</p>
        <p className="cap">Island lines can drop with the power; email always reaches us.</p>
        <button type="button" className="btn" onClick={() => priceVilla('mint')}>Request a villa</button>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <p className="cap">Firefly Sunset Resort, Hope Town, Elbow Cay. Photographs: Firefly Sunset Resort.</p>
      <nav aria-label="Footer"><a href="./">Home</a><a href="villas.html">Villas and rates</a><a href={BIZ.instagram}>Instagram</a><a href={BIZ.facebook}>Facebook</a></nav>
    </footer>
  )
}
