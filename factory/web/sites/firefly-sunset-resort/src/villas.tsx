import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { VILLAS, WHOLE, BIZ } from './data'
import { Footer } from './sections'

const money = (n?: number) => (n ? '$' + n.toLocaleString('en-US') : 'On request')
function Villas() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top static"><a className="name" href="./">Firefly Sunset Resort</a><a className="req" href={BIZ.email && `mailto:${BIZ.email}`}>Email us</a></header>
      <main id="main" className="wrap rates-page">
        <h1 className="h2">Villas and rates.</h1>
        <p className="muted">In season February to August, three-night minimum. Off season September to January, except Thanksgiving, Christmas and New Year. Rates in US dollars, before 10% VAT.</p>
        <div className="rt-scroll" tabIndex={0} role="region" aria-label="Villa rates">
          <table className="rt num">
            <thead><tr><th scope="col">Villa</th><th scope="col">Rooms</th><th scope="col">In season, night</th><th scope="col">In season, week</th><th scope="col">Off season, night</th><th scope="col">Off season, week</th><th scope="col"><span className="sr-only">Book</span></th></tr></thead>
            <tbody>{VILLAS.map(v => <tr key={v.id}><th scope="row">{v.name}</th><td>{v.beds}</td><td>{money(v.inDay)}</td><td>{money(v.inWeek)}</td><td>{money(v.offDay)}</td><td>{money(v.offWeek)}</td><td><a className="textlink" href={v.book}>Request to book</a></td></tr>)}</tbody>
          </table>
        </div>
        <p className="lede-s">The whole resort: ${WHOLE.three.toLocaleString('en-US')} for a three-day minimum, ${WHOLE.week.toLocaleString('en-US')} for a week, VAT included.</p>
        <ul className="vl">{VILLAS.map(v => <li key={v.id}><h2 className="h3">{v.name}</h2><p className="small muted">{v.beds}</p><p>{v.line}</p></li>)}</ul>
      </main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Villas /></StrictMode>)
