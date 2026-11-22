import { useEffect, useState } from 'react'
import { BIZ, ROUTES, STAYS, sq, type Stay } from './data'
import { MealCounter, byId, matchIds, usePlan, waHref } from './tool'

export function TopBar({ home = true }: { home?: boolean }) {
  const h = home ? '' : './'
  return (
    <header className="topbar">
      <a className="brand" href="./">Fernandez Bay Village</a>
      <nav className="toplinks" aria-label="Main">
        <a href={home ? '#stays' : 'stay.html'}>Stays</a>
        <a href={`${h}#day`}>The day</a>
        <a href={`${h}#here`}>Getting here</a>
        <a href={`${h}#dining`}>Dining</a>
        <a href={`${h}#groups`}>Weddings &amp; groups</a>
      </nav>
      <a className="btn btn-s" href={BIZ.booking}>Check dates</a>
    </header>
  )
}

const special = (s: Stay) => {
  const n = s.notes.filter(x => !/ocean view|180 degree|wrap-around|short walk/i.test(x))
  return n.length ? n.join('. ') + '.' : s.pair ? `Opens into ${byId(s.pair).name} for families.` : ''
}
const meta = (s: Stay) => [s.kind === 'villa' ? s.bed : s.bed ? `${s.bed} bed` : 'Ask the front desk'].join('')

export function StaysTable() {
  const p = usePlan()
  const fit = new Set(matchIds(p.party))
  const row = (s: Stay) => (
    <tr key={s.id} className={fit.has(s.id) ? 'fit' : ''}>
      <td className="t-img"><img src={sq(s.img!, 500)} alt={s.alt} width={500} height={333} loading="lazy" /></td>
      <th scope="row"><span className="t-name">{s.name}</span>{fit.has(s.id) && <span className="cap fits">Fits your party</span>}</th>
      <td>{meta(s)}</td>
      <td>{s.setting}</td>
      <td className="t-notes">{special(s)}</td>
      <td>{s.pair ? byId(s.pair).name : <span className="muted">{'·'}</span>}</td>
      <td><a className="t-go" href={BIZ.booking}>Check dates</a></td>
    </tr>
  )
  return (
    <section id="stays" className="section stays" aria-labelledby="stays-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="stays-h" className="h2">Eight cottages, two villas, one beach.</h2>
          <p className="lead muted">Every room has a beach view. Two pairs of cottages adjoin for families. Rates and live availability are in the booking system.</p>
        </div>
        <table className="stays-t">
          <caption className="sr-only">All stays at Fernandez Bay Village compared</caption>
          <thead><tr><th scope="col"><span className="sr-only">Photo</span></th><th scope="col">Stay</th><th scope="col">Beds</th><th scope="col">Setting</th><th scope="col">What is special</th><th scope="col">Adjoins</th><th scope="col"><span className="sr-only">Book</span></th></tr></thead>
          <tbody>
            {STAYS.filter(s => s.kind === 'cottage').map(row)}
            <tr className="t-sub"><th colSpan={7} scope="rowgroup">Villas</th></tr>
            {STAYS.filter(s => s.kind === 'villa').map(row)}
          </tbody>
        </table>
        <p className="more"><a className="textlink" href="stay.html">Every cottage in detail</a></p>
      </div>
    </section>
  )
}

export function GettingHere() {
  const p = usePlan()
  return (
    <section id="here" className="section here" aria-labelledby="here-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="here-h" className="h2">Five minutes from New Bight airport.</h2>
          <p className="lead muted">Fly into New Bight (MYCB) on Cat Island and you are on the beach before your bags are cold.</p>
        </div>
        <ol className="routes">
          {ROUTES.map(r => (
            <li key={r.id} className={p.from === r.id ? 'mine' : ''}>
              <p className="cap route-k">{p.from === r.id ? 'Your route' : ' '}</p>
              <h3 className="h3">{r.from}</h3>
              <p className="route-c">{r.carrier}</p>
              <p className="muted">{r.how}</p>
              {r.perk && <p className="perk">{r.perk}.</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Clubhouse() {
  return (
    <section id="dining" className="section club" aria-labelledby="club-h">
      <div className="wrap club-grid">
        <figure className="club-photo">
          <img src={sq('dbaf91be-dc01-4852-8145-dddfa5c6394a/5T1A8406.jpg', 1500)} alt="A red cocktail and a pina colada on the Tiki Bar counter under string lights" width={1500} height={1000} loading="lazy" />
          <figcaption className="cap muted">The Tiki Bar, on the beach at the Clubhouse.</figcaption>
        </figure>
        <div className="club-text">
          <h2 id="club-h" className="h2">Dinner is handled.</h2>
          <dl className="prices num">
            <div><dt>Breakfast</dt><dd>Hot $20, continental $10</dd></div>
            <div><dt>Lunch</dt><dd>$8 to $18: conch burgers, fritters, grilled fish, salads</dd></div>
            <div><dt>Dinner</dt><dd>$48 a person: appetizers, a meat and a seafood, sides, dessert, coffee, then the beach bonfire</dd></div>
          </dl>
          <p className="muted">The Clubhouse has the dining room and patio over the bay, the Tiki Bar that brings drinks to the sand, a boutique for gifts, beachwear and ice cream, free WiFi and free coffee.</p>
          <MealCounter id="meals-club" />
        </div>
      </div>
    </section>
  )
}

export function Groups() {
  const p = usePlan()
  const manor = byId('manor'), beach = byId('beachhouse')
  return (
    <section id="groups" className="section groups" aria-labelledby="groups-h">
      <div className="wrap">
        <div className="villas">
          {[manor, beach].map(v => (
            <figure key={v.id} className="villa">
              <img src={sq(v.img!, 1500)} alt={v.alt} width={1500} height={1000} loading="lazy" />
              <figcaption><span className="h3">{v.name}</span><span className="muted">{v.bed}. {v.notes.join('. ')}.</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="groups-grid">
          <div>
            <h2 id="groups-h" className="h2">A whole villa, or the whole village.</h2>
            <p className="lead muted">For weddings, family reunions and groups of friends, tell the family who runs Fernandez Bay your dates and how many are coming. They answer on WhatsApp.</p>
          </div>
          <form className="enquiry" data-enquiry data-business={BIZ.name} data-whatsapp={BIZ.wa} data-email={BIZ.email} action={`mailto:${BIZ.email}`} method="post" encType="text/plain">
            <div className="two">
              <label>Arriving<input type="date" name="Arrival" /></label>
              <label>Leaving<input type="date" name="Departure" /></label>
            </div>
            <div className="two">
              <label>Guests<input className="num" type="number" name="Guests" min={1} max={40} key={p.guests} defaultValue={p.guests} inputMode="numeric" /></label>
              <label>Interested in
                <select name="Interested in" key={p.party} defaultValue={p.party === 'friends' ? 'The Manor House' : p.party === 'family' ? 'Two adjoining cottages' : 'A cottage'}>
                  <option>A cottage</option><option>Two adjoining cottages</option><option>The Beach House</option><option>The Manor House</option><option>A wedding or event</option>
                </select>
              </label>
            </div>
            <label>Your name<input name="Name" required autoComplete="name" /></label>
            <label>Message<textarea name="Message" rows={3} /></label>
            <button className="btn" type="submit">Send on WhatsApp</button>
            <p className="cap muted enquiry__note">Opens WhatsApp with your details filled in.</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export function Close() {
  const p = usePlan()
  return (
    <section id="contact" className="close field" aria-labelledby="close-h">
      <div className="wrap close-grid">
        <h2 id="close-h" className="h2">Your cottage is waiting on Fernandez Bay.</h2>
        <div className="close-acts">
          <a className="btn btn-paper" href={BIZ.booking}>Check dates</a>
          <a className="textlink" href={waHref(p)}>WhatsApp <span className="num">{BIZ.whatsapp}</span></a>
        </div>
        <ul className="close-lines">
          <li><a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a><span className="cap f-muted">Front desk and reservations</span></li>
          <li><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a><span className="cap f-muted">Reservations by email</span></li>
          <li><span>Fernandez Bay, near New Bight, Cat Island</span><span className="cap f-muted">Five minutes from New Bight airport (MYCB)</span></li>
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot field">
      <div className="wrap foot-row">
        <p className="cap f-muted">Fernandez Bay Village, Cat Island, Bahamas. Photographs: Fernandez Bay Village.</p>
        <nav aria-label="Footer" className="cap"><a href="./">Home</a><a href="stay.html">Cottages &amp; villas</a><a href={BIZ.instagram}>Instagram</a><a href={BIZ.facebook}>Facebook</a></nav>
      </div>
    </footer>
  )
}

/** Phone dock: appears once the hero has scrolled away, hides over the close. */
export function Dock() {
  const p = usePlan()
  const [on, setOn] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.hero, .page-head')
    const close = document.getElementById('contact')
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); setOn(vis.size === 0) })
    ;[hero, close].forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const phone = matchMedia('(max-width: 900px)').matches
    document.documentElement.style.setProperty('--concept-offset', on && phone ? '76px' : '0px')
  }, [on])
  return (
    <div className={`dock ${on ? 'on' : ''}`} aria-hidden={!on}>
      <a className="btn" href={BIZ.booking} tabIndex={on ? 0 : -1}>Check dates</a>
      <a className="textlink" href={waHref(p)} tabIndex={on ? 0 : -1}>WhatsApp</a>
    </div>
  )
}
