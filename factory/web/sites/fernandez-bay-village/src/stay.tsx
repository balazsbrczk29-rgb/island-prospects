import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { BIZ, STAYS, sq, type Stay } from './data'
import { PlanProvider, byId } from './tool'
import { TopBar, Close, Footer, Dock } from './sections'

function Row({ s }: { s: Stay }) {
  return (
    <article className="srow" id={s.id}>
      <div className="srow-img"><img src={sq(s.img!, 1000)} alt={s.alt} width={1000} height={667} loading="lazy" /></div>
      <div className="srow-text">
        <p className="cap muted">{s.kind === 'villa' ? 'Villa' : 'Cottage'}{s.bed ? ` · ${s.kind === 'villa' ? s.bed : s.bed + ' bed'}` : ''}</p>
        <h2 className="h3">{s.name}</h2>
        <p>{s.setting}.</p>
        <ul className="srow-notes">{s.notes.map(n => <li key={n}>{n}</li>)}</ul>
        {s.pair && <p className="pairline">Adjoins {byId(s.pair).name}, for families.</p>}
        <a className="textlink" href={BIZ.booking}>Check dates for {s.name}</a>
      </div>
    </article>
  )
}

function StayPage() {
  return (
    <PlanProvider>
      <a className="skip" href="#main">Skip to content</a>
      <TopBar home={false} />
      <main id="main" className="wrap stay-page">
        <header className="page-head">
          <h1 className="h2">Eight cottages, two villas, one beach.</h1>
          <p className="lead muted">Every room at Fernandez Bay Village has a beach view. Coconut Palm adjoins Royal Palm, and Traveler’s Palm adjoins the Tamarind Suite. Rates and live availability are in the booking system.</p>
          <a className="btn" href={BIZ.booking}>Check dates</a>
        </header>
        {STAYS.filter(s => s.kind === 'cottage').map(s => <Row key={s.id} s={s} />)}
        <h2 className="h2 villas-h">The villas</h2>
        {STAYS.filter(s => s.kind === 'villa').map(s => <Row key={s.id} s={s} />)}
      </main>
      <Close />
      <Footer />
      <Dock />
    </PlanProvider>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><StayPage /></StrictMode>)
