import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BIZ, VILLAS, VAT, WHOLE, HOURS, ph } from './data'

const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const iso = (d: Date) => d.toISOString().slice(0, 10)
const addDays = (s: string, n: number) => { const d = new Date(s + 'T12:00'); d.setDate(d.getDate() + n); return iso(d) }

export function Pair() {
  return (
    <section className="pair" aria-labelledby="pair-h">
      <figure className="pair-a"><img src={ph('099')} alt="The lower pool and lawn at Firefly, sailboats on the Sea of Abaco beyond" width={1920} height={1420} loading="lazy" /></figure>
      <figure className="pair-b"><img src={ph('114')} alt="Firefly Sunset Resort seen from the water: the rebuilt dock, bar and dining deck" width={1920} height={2553} loading="lazy" /></figure>
      <div className="pair-cap">
        <h2 id="pair-h" className="h2">Six homes on the Sea of Abaco.</h2>
        <p className="muted">Hurricane Dorian took two villas in 2019. The dock, the outside bar and the dining deck were rebuilt. Today there are five villas and the original owners’ house, all above the water.</p>
      </div>
    </section>
  )
}

export function VillaCheck() {
  const [id, setId] = useState('mint')
  const start = useMemo(() => { const t = new Date(); const y = t.getMonth() >= 1 && t.getMonth() <= 6 ? t.getFullYear() : t.getFullYear() + (t.getMonth() >= 7 ? 1 : 0); const d = `${y}-03-07`; return d > iso(t) ? d : addDays(iso(t), 14) }, [])
  const [arrive, setArrive] = useState(start), [leave, setLeave] = useState(addDays(start, 7))
  const v = VILLAS.find(x => x.id === id)!
  const n = Math.max(0, Math.round((new Date(leave + 'T12:00').getTime() - new Date(arrive + 'T12:00').getTime()) / 86400000))
  const m = new Date(arrive + 'T12:00').getMonth()
  const inSeason = m >= 1 && m <= 7
  const holiday = (() => { for (let i = 0; i < n; i++) { const d = addDays(arrive, i).slice(5); if ((d >= '11-25' && d <= '11-29') || d >= '12-20' || d <= '01-02') return true } return false })()
  const day = inSeason ? v.inDay : v.offDay, week = inSeason ? v.inWeek : v.offWeek
  let result: { head: string; sub: string }
  if (!day || !week) result = { head: 'Rate on request', sub: `${v.name} has no published rate yet. Ask for your dates.` }
  else if (n <= 0) result = { head: 'Pick your dates', sub: '' }
  else if (!inSeason && holiday) result = { head: 'Holiday dates', sub: 'Thanksgiving, Christmas and New Year are priced separately. Ask for your dates.' }
  else if (inSeason && n < 3) result = { head: 'Three nights minimum', sub: 'From February to August stays start at three nights.' }
  else {
    const base = Math.floor(n / 7) * week + (n % 7) * day
    result = { head: money(base * (1 + VAT)), sub: `${n} nights, ${inSeason ? 'in season' : 'off season'}: ${money(base)} plus 10% VAT${n >= 7 ? ', weekly rate applied' : ''}.` }
  }
  const mail = `mailto:${BIZ.email}?subject=${encodeURIComponent(`Villa request: ${v.name}`)}&body=${encodeURIComponent(`Villa: ${v.name}\nArrival: ${arrive}\nDeparture: ${leave}\nGuests: \n\nSent from the Firefly website.`)}`
  return (
    <section id="villas" className="check" aria-labelledby="check-h">
      <div className="wrap check-grid">
        <div>
          <h2 id="check-h" className="h2">Choose your villa.</h2>
          <ul className="villa-list" role="radiogroup" aria-label="Villas">
            {VILLAS.map(x => (
              <li key={x.id}>
                <button type="button" role="radio" aria-checked={x.id === id} className={x.id === id ? 'on' : ''} onClick={() => setId(x.id)}>
                  <span className="vn">{x.name}</span>
                  <span className="vb">{x.beds}</span>
                  <span className="vp num">{x.offDay ? `from ${money(x.offDay)} a night` : 'rate on request'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel" aria-live="polite">
          <p className="panel-name h3">{v.name}</p>
          <p className="muted small">{v.line}</p>
          <div className="dates">
            <label>Arrive<input type="date" value={arrive} min={iso(new Date())} onChange={e => { setArrive(e.target.value); if (leave <= e.target.value) setLeave(addDays(e.target.value, 3)) }} /></label>
            <label>Leave<input type="date" value={leave} min={addDays(arrive, 1)} onChange={e => setLeave(e.target.value)} /></label>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={result.head} className="total num" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{result.head}</motion.p>
          </AnimatePresence>
          <p className="small muted total-sub">{result.sub}</p>
          <div className="panel-acts">
            <a className="btn" href={v.book}>Request to book</a>
            <a className="textlink" href={mail}>or email us</a>
          </div>
          <p className="small muted">Live availability is on each villa's booking page. The whole resort: {money(WHOLE.three)} for three days or {money(WHOLE.week)} a week, VAT included.</p>
        </div>
      </div>
    </section>
  )
}

export function Grill() {
  return (
    <section id="grill" className="grill" aria-labelledby="grill-h">
      <figure className="grill-photo"><img src={ph('123')} alt="The Firefly dining deck at dusk under string lights, the dock and the water beyond" width={1920} height={1280} loading="lazy" /></figure>
      <div className="grill-text">
        <h2 id="grill-h" className="h2">Firefly Bar &amp; Grill</h2>
        <p className="muted">Open seven days, to guests, locals and visitors.</p>
        <dl className="hours num">
          {HOURS.map(h => <div key={h.meal}><dt>{h.meal}</dt><dd>{h.time}{h.note && <span>{h.note}</span>}</dd></div>)}
        </dl>
        <p className="small muted">To-go orders in The Boutique until 8 pm.</p>
        <a className="btn" href={BIZ.dinner}>Reserve dinner</a>
      </div>
    </section>
  )
}

export function Water() {
  return (
    <section className="water" aria-labelledby="water-h">
      <img src={ph('183')} alt="Wooden steps from the Firefly dock down into clear water" width={1920} height={1440} loading="lazy" />
      <div className="water-line">
        <h2 id="water-h" className="h3">Down the steps:</h2>
        <p>a private beach, a reef off the dock where guests have seen stingrays, turtles and sharks, free kayaks, two pools, dock slips, corn hole on the sand. Golf carts and boats arranged for you.</p>
      </div>
    </section>
  )
}

export function Arrive() {
  return (
    <section className="arrive wrap" aria-labelledby="arrive-h">
      <h2 id="arrive-h" className="h2">Getting here.</h2>
      <p className="arrive-p">Fly to Marsh Harbour. A fifteen-minute taxi takes you to the ferry dock, a twenty-minute ferry takes you to Hope Town, and our shuttle meets you at the harbour. Abaco is under 180 miles from Florida.</p>
    </section>
  )
}

export function Night() {
  return (
    <section id="contact" className="night" aria-labelledby="night-h">
      <img src={ph('029')} alt="Firefly Sunset Resort at night, lights on the deck and the dock" width={1920} height={1427} loading="lazy" />
      <div className="calling">
        <h2 id="night-h" className="h3">Firefly Sunset Resort</h2>
        <p className="small">{BIZ.place}</p>
        <p><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
        <p className="num"><a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> <span className="muted small">(restaurant)</span></p>
        <p className="small muted">Island phone lines can drop with the power; email always reaches us.</p>
        <p className="calling-links"><a href="#villas">Request a villa</a><a href={BIZ.dinner}>Reserve dinner</a><a href={BIZ.instagram}>Instagram</a></p>
      </div>
    </section>
  )
}

export function Footer() {
  return <footer className="foot wrap"><p className="small muted">Firefly Sunset Resort, Hope Town, Elbow Cay. Photographs: Firefly Sunset Resort.</p><nav aria-label="Footer"><a href="./">Home</a><a href="villas.html">Villas and rates</a></nav></footer>
}
