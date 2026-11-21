import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { BIZ, STAYS } from './data'
import { StayItem, Footer } from './sections'

function StayPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar-top page-top"><a className="name" href="./">Fernandez Bay Village</a><a className="top-book" href={BIZ.booking}>Check availability</a></header>
      <main id="main" className="wrap stay-page">
        <h1 className="h2">Eight cottages, two villas, one beach.</h1>
        <p className="lede muted">Every room has a beach view. Coconut Palm adjoins Royal Palm, and Traveler’s Palm adjoins Tamarind, for families. Rates and live availability are in the booking system.</p>
        <h2 className="h3 stay-group">Cottages</h2>
        <div className="stay-grid">{STAYS.filter(s => s.kind === 'cottage').map(s => <StayItem key={s.id} s={s} />)}</div>
        <h2 className="h3 stay-group">Villas</h2>
        <div className="stay-grid villas">{STAYS.filter(s => s.kind === 'villa').map(s => <StayItem key={s.id} s={s} big />)}</div>
        <div className="planner-acts"><a className="btn" href={BIZ.booking}>Check availability</a><a className="textlink" href={`https://wa.me/${BIZ.wa}`}>Ask on WhatsApp</a></div>
      </main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><StayPage /></StrictMode>)
