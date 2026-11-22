import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Contact, Footer, Bar } from './ui'
import { Counter } from './counter'
import { RateSheet } from './sections'

function Boatyard() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header page="boatyard" />
      <main id="main">
        <div className="wrap by">
          <div className="by__head">
            <h1 className="t88">Boatyard rates.</h1>
            <p className="t22 muted">Haul-out, blocking, dry storage and launch, up to 10 tons. Monday to Friday, 8:00 to 4:00, closed weekends and holidays.</p>
          </div>
          <Counter mode="yard" />
          <RateSheet />
        </div>
        <Contact preset="Haul-out and dry storage" />
      </main>
      <Footer />
      <Bar />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Boatyard />)
