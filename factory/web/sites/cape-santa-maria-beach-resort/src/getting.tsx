import { createRoot } from 'react-dom/client'
import './styles.css'
import { Masthead, Routes, Colophon, Strip, Img } from './site'

function Getting() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Masthead home={false} />
      <main id="main">
        <section className="page-lead" aria-labelledby="h1">
          <figure className="lead__pic lead__pic--short"><Img k="coast" eager /></figure>
          <h1 id="h1">Five ways to Long Island.</h1>
          <p className="stand">Every route ends at Stella Maris or on the beach itself. Pick where you are starting from.</p>
        </section>
        <section className="page-routes" aria-label="Routes"><Routes /></section>
        <section className="pilots" aria-labelledby="pilots-h">
          <h2 id="pilots-h">Flying yourself.</h2>
          <p>Stella Maris Airport (SML) has fueling and customs. Private pilots get 15% off accommodation, with some blackout dates, when they book by phone on +1 800-926-9704. The resort has welcomed fly-ins such as the South Eastern Bonanza Society and Caribbean Flying Adventures.</p>
        </section>
      </main>
      <Colophon />
      <Strip />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Getting />)
