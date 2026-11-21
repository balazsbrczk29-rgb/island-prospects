import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { M, BOOK, P, contact, rooms, ROUTES } from './data'

const ease = [0.22, 1, 0.36, 1] as const
type K = keyof typeof P
export const Img = ({ k, className, eager, sizes }: { k: K; className?: string; eager?: boolean; sizes?: string }) => (
  <img className={className} src={M + P[k].src} alt={P[k].alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} sizes={sizes} />
)

export function Masthead({ home = true }: { home?: boolean }) {
  const b = home ? '' : './'
  return (
    <header className="mast">
      <div className="mast__row">
        <a className="mast__title" href="./">Cape Santa Maria</a>
        <p className="mast__date">Seymour's, Long Island, The Bahamas</p>
      </div>
      <nav className="mast__nav" aria-label="Site">
        <a href={b + '#rooms'}>Rooms</a><a href={b + '#beach-house'}>The Beach House</a><a href={b + '#days'}>Days here</a><a href="getting-here.html">Getting here</a><a href={b + '#contact'}>Contact</a>
        <a className="mast__book" href={BOOK}>Check availability</a>
      </nav>
    </header>
  )
}

export function Lead() {
  const [i, setI] = useState(0)
  const r = ROUTES[i]
  return (
    <section className="lead" aria-labelledby="h1">
      <figure className="lead__pic"><Img k="aerial" eager /></figure>
      <div className="lead__text">
        <h1 id="h1">Getting here is half the&nbsp;story.</h1>
        <p className="stand">
          <span>From </span>
          <label className="gate">
            <span className="sr-only">Where are you starting from?</span>
            <select value={i} onChange={e => setI(+e.target.value)}>
              {ROUTES.map((x, k) => <option key={x.k} value={k}>{x.label}</option>)}
            </select>
          </label>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={r.k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>, {r.line}</motion.span>
          </AnimatePresence>
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ol key={r.k + '-legs'} className="legline" aria-label="Your route" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {r.steps.map(([s], k) => <motion.li key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * k, duration: 0.4, ease }}>{s}</motion.li>)}
          </motion.ol>
        </AnimatePresence>
        <div className="lead__acts"><a className="btn" href={BOOK}>Check availability</a><a className="ul" href="getting-here.html">Every route, step by step</a></div>
      </div>
    </section>
  )
}

export function Opening() {
  return (
    <section className="open" aria-label="The place">
      <div>
      <div className="open__cols">
        <p className="dropcap">Cape Santa Maria sits at the far northern tip of Long Island, where the beach runs long and white and the water turns every shade of turquoise. The beachfront bungalows line the sand beside the Beach House, so the walk from your door to the sea is a few barefoot steps.</p>
        <p>Days here are as busy or as empty as you make them: scuba diving, snorkelling and a nature cruise, fishing, kayaking and paddleboarding from the beach, or nothing at all. The resort hosts weddings too. In the evening the villas' west-facing windows and the bungalow verandas look straight into the sunset.</p>
      </div>
      <figure className="open__pic"><Img k="beach" /><figcaption>The beach at Cape Santa Maria.</figcaption></figure>
      </div>
      <aside className="facts" aria-label="At a glance">
        <h2>At a glance</h2>
        <dl>
          <div><dt>Where</dt><dd>Seymour's, Long Island</dd></div>
          <div><dt>Nearest airport</dt><dd>Stella Maris (SML)</dd></div>
          <div><dt>Reservations</dt><dd><a href={`tel:${contact.tollfree.tel}`} className="tnum">{contact.tollfree.label}</a></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
        </dl>
        <a className="btn wide" href={BOOK}>Check availability</a>
      </aside>
    </section>
  )
}

export function Rooms() {
  const [i, setI] = useState(0)
  const r = rooms[i]
  return (
    <section className="rooms" id="rooms" aria-labelledby="rooms-h">
      <figure className="rooms__pic">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={r.pic} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}><Img k={r.pic} /></motion.div>
        </AnimatePresence>
        <figcaption>{r.pic === 'villa' ? 'A Beachfront Villa living room.' : 'A Beachfront Bungalow bedroom.'}</figcaption>
      </figure>
      <div className="rooms__text">
        <h2 id="rooms-h">Three ways to sleep on the beach.</h2>
        <ul className="roomlist" role="tablist" aria-label="Rooms">
          {rooms.map((x, k) => (
            <li key={x.name}><button type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}><b>{x.name}</b><span className="tnum">{x.size}</span></button></li>
          ))}
        </ul>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={r.name} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="roomdetail">
            <p><b>{r.sleeps}.</b> {r.beds}. {r.notes}</p>
            <p className="small">Every room: air conditioning, coffee and tea, safe, fridge and daily housekeeping.</p>
          </motion.div>
        </AnimatePresence>
        <a className="btn" href={BOOK}>Check availability</a>
      </div>
    </section>
  )
}

export function Essay() {
  const items: { k: K; c: string }[] = [
    { k: 'paddle', c: 'Paddleboarding off the beach.' },
    { k: 'fishing', c: 'Fishing the flats.' },
    { k: 'coast', c: 'The Long Island coast.' },
  ]
  return (
    <section className="essay" id="days" aria-labelledby="days-h">
      <h2 id="days-h">Days here.</h2>
      <div className="essay__grid">
        {items.map((x, n) => (
          <figure key={x.k} className={'ess ess--' + n}><Img k={x.k} /><figcaption>{x.c}</figcaption></figure>
        ))}
      </div>
    </section>
  )
}

export function BeachHouse() {
  return (
    <section className="bh" id="beach-house" aria-labelledby="bh-h">
      <figure className="bh__pic"><Img k="bar" /></figure>
      <div className="bh__text">
        <h2 id="bh-h">The Beach House.</h2>
        <p>The resort's restaurant and bar sits on the sand, with the bungalows on either side. Ask about the menu and dinner times when you book.</p>
        <figure className="bh__small"><Img k="salad" /></figure>
      </div>
    </section>
  )
}

export function Routes() {
  const [i, setI] = useState(0)
  const r = ROUTES[i]
  return (
    <div className="routes">
      <div className="routes__tabs" role="tablist" aria-label="Where are you starting from?">
        {ROUTES.map((x, k) => <button key={x.k} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}>From {x.label}</button>)}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ol key={r.k} className="legs" role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {r.steps.map(([t, d], k) => (
            <motion.li key={t} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.08, duration: 0.45, ease }}><b>{t}</b><span>{d}</span></motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  )
}

export function Colophon() {
  return (
    <footer className="colophon" id="contact">
      <h2>Write, call, or check your dates.</h2>
      <div className="colophon__grid">
        <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p className="tnum"><a href={`tel:${contact.tollfree.tel}`}>{contact.tollfree.label}</a> toll free<br /><a href={`tel:${contact.local.tel}`}>{contact.local.label}</a> on the island</p>
        <p>{contact.address}</p>
      </div>
      <a className="btn" href={BOOK}>Check availability</a>
      <p className="credit">Photography: Cape Santa Maria Beach Resort.</p>
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
