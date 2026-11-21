import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BIZ, STAYS, PARTIES, ROUTES, CREDITS, sq, type Stay } from './data'

const byId = (id: string) => STAYS.find(s => s.id === id)!

export function StayItem({ s, big = false }: { s: Stay; big?: boolean }) {
  const pair = s.pair ? byId(s.pair).name : ''
  return (
    <article className={`stay ${big ? 'big' : ''}`}>
      {s.img && <div className="stay-img"><img src={sq(s.img, big ? 1500 : 1000)} alt={s.alt} width={big ? 1500 : 1000} height={big ? 1000 : 667} loading="lazy" /></div>}
      <h3 className="h3">{s.name}</h3>
      <p className="small muted">{[s.kind === 'villa' ? 'Villa' : 'Cottage', s.bed, pair && `adjoins ${pair}`].filter(Boolean).join(' · ')}</p>
      <p className="small">{s.notes.join('. ')}.</p>
    </article>
  )
}

export function Planner() {
  const [pid, setPid] = useState<(typeof PARTIES)[number]['id']>('two')
  const party = PARTIES.find(p => p.id === pid)!
  const list = party.ids.map(byId)
  return (
    <section id="planner" className="planner" aria-labelledby="planner-h">
      <div className="wrap">
        <div className="planner-head">
          <h2 id="planner-h" className="h2">Who’s coming?</h2>
          <div className="party" role="radiogroup" aria-label="Who is coming">
            {PARTIES.map(p => (
              <button key={p.id} type="button" role="radio" aria-checked={pid === p.id} className={pid === p.id ? 'on' : ''} onClick={() => setPid(p.id)}>{p.label}</button>
            ))}
          </div>
        </div>
        <p className="lede planner-note" aria-live="polite">{party.note}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pid} className={`planner-row n${list.length}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 0.61, 0.24, 1] }}>
            {list.map((s, i) => <StayItem key={s.id} s={s} big={i === 0} />)}
          </motion.div>
        </AnimatePresence>
        <div className="planner-acts">
          <a className="btn" href={BIZ.booking}>Check availability</a>
          <a className="textlink" href="stay.html">All cottages and villas</a>
        </div>
      </div>
    </section>
  )
}

export function GettingHere() {
  return (
    <section id="here" className="here" aria-labelledby="here-h">
      <div className="wrap">
        <h2 id="here-h" className="h2">Five minutes from New Bight airport.</h2>
        <ol className="routes">
          {ROUTES.map(r => <li key={r.from}><h3 className="h3">From {r.from}</h3><p>{r.how}</p></li>)}
        </ol>
      </div>
    </section>
  )
}

export function Credits() {
  const meals = CREDITS[0]
  return (
    <section id="contact" className="credits" aria-labelledby="credits-h">
      <div className="wrap credits-grid">
        <div>
          <h2 id="credits-h" className="h2">The practical part.</h2>
          <table className="meals num">
            <caption className="sr-only">Meals at the Clubhouse</caption>
            <tbody>
              <tr><th scope="row">Breakfast</th><td>Hot $20, continental $10</td></tr>
              <tr><th scope="row">Lunch</th><td>$8 to $18: conch burgers, fritters, grilled fish, salads</td></tr>
              <tr><th scope="row">Dinner</th><td>$48 a person: appetizers, a meat and a seafood, sides, dessert, coffee, the bonfire</td></tr>
            </tbody>
          </table>
          <div className="facts">
            {CREDITS.slice(1).map(([h, items]) => (
              <div key={h}><h3 className="h3">{h}</h3><p className="small muted">{items.join(', ')}.</p></div>
            ))}
          </div>
          <p className="small muted">{meals[1][3]}.</p>
        </div>
        <form className="enquiry" data-enquiry data-business={BIZ.name} data-whatsapp={BIZ.wa} data-email={BIZ.email} action={`mailto:${BIZ.email}`} method="post" encType="text/plain">
          <h3 className="h3">Ask us on WhatsApp</h3>
          <div className="two">
            <label>Arriving<input type="date" name="Arrival" /></label>
            <label>Leaving<input type="date" name="Departure" /></label>
          </div>
          <div className="two">
            <label>Guests<input type="number" name="Guests" min={1} max={20} defaultValue={2} inputMode="numeric" /></label>
            <label>Interested in
              <select name="Interested in" defaultValue="A cottage"><option>A cottage</option><option>Two adjoining cottages</option><option>The Beach House</option><option>The Manor House</option><option>A wedding or event</option></select>
            </label>
          </div>
          <label>Your name<input name="Name" required autoComplete="name" /></label>
          <label>Message<textarea name="Message" rows={3} /></label>
          <button className="btn" type="submit">Send on WhatsApp</button>
          <p className="small muted">Or call the front desk <a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>, write to <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</p>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot wrap">
      <p className="h3">Fernandez Bay Village</p>
      <p className="small muted">Fernandez Bay, near New Bight, Cat Island, Bahamas</p>
      <nav aria-label="Footer"><a href="./">The day</a><a href="stay.html">Cottages &amp; villas</a><a href={BIZ.instagram}>Instagram</a><a href={BIZ.facebook}>Facebook</a></nav>
      <p className="small muted">Photographs: Fernandez Bay Village.</p>
    </footer>
  )
}

export function Dock() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const quiet = [document.querySelector('.film'), document.getElementById('contact')].filter(Boolean) as Element[]
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); setOn(vis.size === 0) })
    quiet.forEach(q => io.observe(q))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const film = document.querySelector('.film')?.getBoundingClientRect()
    const filmVisible = film ? film.bottom > innerHeight * 0.4 : false
    if (filmVisible) return
    document.documentElement.style.setProperty('--concept-offset', on && matchMedia('(max-width: 900px)').matches ? '72px' : '0px')
  }, [on])
  return (
    <div className={`dock ${on ? 'on' : ''}`}>
      <a className="btn" href={BIZ.booking} tabIndex={on ? 0 : -1}>Check availability</a>
    </div>
  )
}
