import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header } from './header'
import { ROOMS, BIZ, wix } from './data'
import { Footer } from './sections'

function Rooms() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header base="./" />
      <main id="main" className="wrap rooms-page">
        <header className="rp-head">
          <h1 className="h2">Six rooms over Marsh Harbour.</h1>
          <p className="lede muted">Garden view rooms, marina view suites and two-bedroom apartments, renovated after Dorian. Rates and live availability are in the booking system.</p>
          <a className="btn" href={BIZ.bookRooms}>Check dates and book</a>
        </header>
        <ol className="rp-list">
          {ROOMS.map((r, k) => (
            <li key={r.id}>
              <img src={wix(r.photo.id, 960, 640)} alt={r.alt} width={960} height={640} loading={k < 2 ? 'eager' : 'lazy'} />
              <h2 className="h3">{r.name}</h2>
              <p className="rp-v">{r.view}</p>
              <p className="rp-f">{r.features.join(', ')}.</p>
            </li>
          ))}
        </ol>
        <p className="lede rp-foot">Arriving by boat? <a href="./#desk">Request a slip</a> first. Questions before you book? Call <a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> or write to <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</p>
      </main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Rooms /></StrictMode>)
