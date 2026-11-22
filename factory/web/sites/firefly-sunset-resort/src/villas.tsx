import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { VILLAS, WHOLE } from './data'
import { Footer } from './sections'

const money = (n?: number) => (n ? '$' + n.toLocaleString('en-US') : 'On request')
function Villas() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top static"><a className="name" href="./">Firefly Sunset Resort</a><nav aria-label="Main"><a href="./#grill">Bar &amp; Grill</a><a href="./#arrive">Getting here</a><a href="./#price">Price your dates</a></nav></header>
      <main id="main" className="rates-page">
        <h1 className="h2">Villas and rates.</h1>
        <p className="cap">February to August is in season, with a three-night minimum. September to January is off season, except Thanksgiving, Christmas and New Year. Rates in US dollars, before 10% VAT.</p>
        <div className="rt-scroll" tabIndex={0} role="region" aria-label="Villa rates">
          <table className="rt num">
            <thead><tr><th scope="col">Villa</th><th scope="col">Rooms</th><th scope="col">In season, night</th><th scope="col">In season, week</th><th scope="col">Off season, night</th><th scope="col">Off season, week</th><th scope="col"><span className="sr-only">Book</span></th></tr></thead>
            <tbody>{VILLAS.map(v => <tr key={v.id}><th scope="row">{v.name}</th><td data-l="Rooms">{v.beds}</td><td data-l="In season, night">{money(v.inDay)}</td><td data-l="In season, week">{money(v.inWeek)}</td><td data-l="Off season, night">{money(v.offDay)}</td><td data-l="Off season, week">{money(v.offWeek)}</td><td><a className="textlink" href={v.book}>Request to book</a></td></tr>)}</tbody>
          </table>
        </div>
        <p className="lede-s num">The whole resort: {money(WHOLE.three)} for three days, {money(WHOLE.week)} for a week, VAT included.</p>
        <ul className="vl">{VILLAS.map(v => <li key={v.id}><h2 className="h3">{v.name}</h2><p className="cap num">{v.beds}</p><p>{v.line}</p><p><a className="textlink" href={`./#price?villa=${v.id}`}>Price my dates</a></p></li>)}</ul>
      </main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Villas /></StrictMode>)
