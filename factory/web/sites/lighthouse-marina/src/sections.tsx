import { photos, pano, sheet } from './data'
import { Img } from './ui'
import { Counter } from './counter'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h" id="top">
      <div className="hero__main">
        <h1 id="hero-h" className="t88">The only marine fuel on Elbow&nbsp;Cay.</h1>
        <p className="t22 muted hero__lede">Six slips, a boatyard and a ship’s store at the foot of the Hope Town lighthouse, since 1980.</p>
        <Counter />
      </div>
      <div className="hero__photo"><Img p={photos.dock} sizes="(max-width: 900px) 100vw, 42vw" max={2000} eager /></div>
    </section>
  )
}

export function Fuel() {
  return (
    <section id="fuel" className="sec wrap" aria-labelledby="fuel-h">
      <div className="fuel">
        <figure className="fuel__photo"><Img p={photos.wide} sizes="(max-width: 900px) 100vw, 55vw" max={2048} /></figure>
        <div className="fuel__text">
          <h2 id="fuel-h" className="t56">Two gas pumps, one diesel.</h2>
          <p className="t22 muted">The only marine fuel station on Elbow Cay. The docks and the fuel station have been rebuilt, and the gift shop renovated.</p>
          <ul className="specs">
            <li><b className="num">3</b><span>fuel stations, 2 gas and 1 diesel</span></li>
            <li><b>Bait</b><span>ballyhoo, squid, shrimp, minnows, and ice</span></li>
            <li><b>Laundry</b><span>tokens sold on the fuel dock, open every day 8:00 to 6:00</span></li>
          </ul>
        </div>
      </div>
      <div className="slips" aria-labelledby="slips-h">
        <h3 id="slips-h" className="t32">Six protected slips</h3>
        <dl className="slips__row">
          <div><dt className="t14 muted">Length overall</dt><dd className="num">60 ft</dd></div>
          <div><dt className="t14 muted">Draft at low water</dt><dd className="num">6 ft</dd></div>
          <div><dt className="t14 muted">Shore power</dt><dd className="num">30 / 50 A</dd></div>
          <div><dt className="t14 muted">Standby generator</dt><dd className="num">60 kW</dd></div>
          <div><dt className="t14 muted">Ashore</dt><dd>Hot showers, laundry</dd></div>
        </dl>
        <p className="t14 muted">Deep water dockage. Dockage rates on request: call or use the form below.</p>
      </div>
    </section>
  )
}

export function Yard() {
  return (
    <section id="yard" className="sec sec--surface" aria-labelledby="yard-h">
      <div className="wrap">
        <div className="yard">
          <div className="yard__text">
            <h2 id="yard-h" className="t56">Haul-out and dry storage to 10 tons.</h2>
            <p className="t22 muted">Factory-trained technicians for engines, bottom paint, fiberglass, brite work and detailing, and Mercury Outboard sales and service. The yard is open Monday to Friday, 8:00 to 4:00.</p>
            <p><a className="link" href="#counter">Estimate your haul-out at the top of the page</a></p>
          </div>
          <figure className="yard__photo"><Img p={photos.yard} sizes="(max-width: 900px) 100vw, 45vw" max={2000} /></figure>
        </div>
        <RateSheet />
      </div>
    </section>
  )
}

export function RateSheet() {
  return (
    <div className="sheet">
      <p className="sheet__note t14 muted">Rates from November 2024, plus 10% VAT on all services.</p>
      {sheet.map(([h, rows]) => (
        <div key={h} className="sheet__col">
          <h3 className="t14 sheet__h">{h}</h3>
          <table><tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td className="num">{b}</td></tr>)}</tbody></table>
        </div>
      ))}
    </div>
  )
}

export function Harbour() {
  return (
    <section id="harbour" className="harbour" aria-labelledby="harbour-h">
      <div className="wrap harbour__head">
        <h2 id="harbour-h" className="t56">The view from the gallery.</h2>
        <p className="t18 muted">Hope Town Harbour from the Elbow Reef Lighthouse. The fuel dock is at its foot. Drag or swipe to look across.</p>
      </div>
      <div className="harbour__band" tabIndex={0} role="region" aria-label="Panorama of Hope Town Harbour, scroll sideways">
        <img src={pano.src3840} srcSet={`${pano.src1920} 1920w, ${pano.src3840} 3840w`} sizes="(max-width: 900px) 1600px, 2450px"
          width={3840} height={880} alt={pano.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      </div>
      <p className="wrap t14 muted harbour__credit">{pano.credit}</p>
    </section>
  )
}

export function Store() {
  return (
    <section id="store" className="sec wrap" aria-labelledby="store-h">
      <div className="store">
        <figure className="store__a"><Img p={photos.store} sizes="(max-width: 900px) 60vw, 32vw" max={1400} /></figure>
        <figure className="store__b"><Img p={photos.crate} sizes="(max-width: 900px) 40vw, 16vw" max={1000} /></figure>
        <div className="store__text">
          <h2 id="store-h" className="t56">The largest selection of rods and tackle on the island.</h2>
          <ul className="list t18">
            <li>Rods, fishing tackle and marine supplies</li>
            <li>Bait and ice</li>
            <li>Souvenirs, clothing and local crafts</li>
            <li>Snacks and soft drinks</li>
          </ul>
          <p className="t18">Monday to Saturday, 8:00 to 4:00.</p>
          <p className="t14 muted">Lighthouse Marina Liquors, for cold beer, wines, spirits and cigars, is reopening soon.</p>
        </div>
      </div>
    </section>
  )
}
