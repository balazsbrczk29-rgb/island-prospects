import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Letterhead } from './letter'
import { ROOMS, BIZ, wix } from './data'
import { Footer } from './sections'

function Rooms() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap"><Letterhead base="./" /></div>
      <main id="main" className="wrap rooms-page">
        <header className="rp-head">
          <h1 className="h2">Six rooms over Marsh Harbour.</h1>
          <p className="lede muted">Garden view rooms, marina view suites and two-bedroom apartments, renovated after Dorian. Rates and live availability are in the booking system.</p>
          <a className="btn" href={BIZ.bookRooms}>Book online</a>
        </header>
        <ol className="rp-list">
          {ROOMS.map((r, k) => (
            <li key={r.id}>
              <img src={wix(r.photo.id, 960, 640)} alt={r.alt} width={960} height={640} loading={k < 2 ? 'eager' : 'lazy'} />
              <h2 className="h3">{r.name}</h2>
              <p className="muted small">{r.view}</p>
              <p className="small">{r.features.join(', ')}.</p>
            </li>
          ))}
        </ol>
        <p className="lede rp-foot">Questions before you book? Call <a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> or write to <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</p>
      </main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Rooms /></StrictMode>)
