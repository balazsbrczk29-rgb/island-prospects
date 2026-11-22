import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Top } from './hero'
import { ALL_ROOMS_HAVE, BIZ } from './data'
import { BookFrame, CompareTable } from './rooms'
import { Footer } from './sections'
import { useSmooth } from './smooth'

const AMENITIES: [string, string][] = [
  ['On the beach', 'Private beach on Jolly Hall Bay, complimentary water toys, snorkelling, canoeing, fishing'],
  ['At the resort', 'Outdoor pool open all year, sun terrace, BBQ and garden, fitness centre, library, table tennis, billiards and games room'],
  ['Looked after', 'Daily housekeeping, grocery delivery, laundry, in-suite massage, concierge and tour desk'],
  ['Getting about', 'Free shuttle into George Town, airport taxi arranged for you, free parking'],
  ['Connected', 'Free WiFi throughout; meeting and banquet space'],
  ['House rules', 'Non-smoking resort. Pets are not allowed.'],
]

function Stay() {
  useSmooth()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Top base="./" />
      <main id="main" className="stay">
        <header className="wrap stay-head">
          <h1 className="h2">All eight rooms, side by side.</h1>
          <p className="lede muted">Five on the ocean side by the beach, three Island Time villas on the hill. {ALL_ROOMS_HAVE}</p>
        </header>
        <div className="wrap">
          <CompareTable />
          <p className="small muted cmp-note">Beds for: how many sleep in the listed beds. Rates on request, or live in the booking system for your dates.</p>
        </div>
        <section className="wrap amen" aria-labelledby="amen-h">
          <h2 id="amen-h" className="h2">What comes with every stay.</h2>
          <dl>{AMENITIES.map(([k, v]) => <div key={k}><dt className="h3">{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
        <section className="contact" aria-label="Book">
          <div className="wrap contact-grid">
            <div>
              <h2 className="h2">Found the one?</h2>
              <p className="lede" style={{ marginTop: 24 }}>Questions first? Call <a className="num" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a> or write to <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</p>
            </div>
            <BookFrame compact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<StrictMode><Stay /></StrictMode>)
