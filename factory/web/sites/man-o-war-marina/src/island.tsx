import { PHOTO } from './data'
import { Colophon, Masthead, MobileStrip, Photo, mount } from './site'

const ASHORE = ['Grocery', 'Heritage Museum and coffee shop', 'Bakeries', 'Boat-building shops', 'Gift shops', 'Churches', 'Playground', 'Beaches', 'Ferry services']

function Island() {
  return (
    <>
      <Masthead current="island.html" />
      <main id="main">
        <section className="page-head wrap" aria-labelledby="pg-h">
          <div className="ph-grid">
            <div>
              <h1 id="pg-h" className="h2">Two miles long, half a mile wide, and you can walk all of it.</h1>
              <p className="lede">Tie up at Man&#8209;O&#8209;War Marina and everything below is on foot from the dock. Ask at the office about anything on the island.</p>
            </div>
            <figure className="ph-fig">
              <Photo p={PHOTO.walk} w={1000} h={1250} eager sizes="(max-width: 860px) 100vw, 480px" />
              <figcaption>The marina boardwalk, where a walk round the cay starts.</figcaption>
            </figure>
          </div>
        </section>
        <section className="wrap index" aria-labelledby="ix-h">
          <h2 id="ix-h" className="ix-title">What is ashore</h2>
          <ol className="ix">
            {ASHORE.map(h => <li key={h}><span className="ix-h">{h}</span></li>)}
          </ol>
        </section>
      </main>
      <Colophon />
      <MobileStrip />
    </>
  )
}
mount(<Island />)
