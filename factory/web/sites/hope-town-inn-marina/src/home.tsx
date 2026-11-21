import { createRoot } from 'react-dom/client'
import './styles.css'
import { IMG, RATES, DOCKWA, pics } from './data'
import { useActivePic, Fixed, SecPic, Nav, StayFinder, SlipCheck, Specs, Contact, Strip, Foot } from './site'

const IDS = ['top', 'ferry', 'boat', 'bar', 'cay', 'here', 'contact']

function Home() {
  const [pic] = useActivePic(IDS, 'harbour')
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="split">
        <Fixed pic={pic} />
        <div className="col">
          <main id="main">
            <section className="sec sec--hero" id="top" data-pic="harbour" aria-labelledby="h">
              <SecPic k="harbour" eager />
              <p className="brand">Hope Town Inn &amp; Marina &middot; Elbow Cay, Abaco</p>
              <div className="hide-sm"><Nav /></div>
              <h1 id="h" className="big">Two ways in.</h1>
              <p className="lede">A 15-acre estate beside the Elbow Reef Lighthouse, on the west side of Hope Town Harbour. Guests and boats arrive at the same dock.</p>
              <div className="ways">
                <a className="way" href="#ferry"><b>By ferry</b><span>Three room types and six villas, for one to eight</span></a>
                <a className="way" href="#boat"><b>By boat</b><span>Fifty surge-free slips, boats to 125 ft</span></a>
              </div>
            </section>

            <section className="sec" id="ferry" data-pic="cottage" aria-labelledby="ferry-h">
              <SecPic k="cottage" />
              <p className="kicker">Rooms and villas</p>
              <h2 id="ferry-h" className="big">By ferry.</h2>
              <p className="body">The ferry brings you across from Marsh Harbour. Choose how many of you are coming and see which of the nine stays fits, from a king room for two to the eight-guest villas.</p>
              <div style={{ marginTop: 'var(--s-4)' }}><StayFinder /></div>
            </section>

            <section className="sec field" id="boat" data-pic="docks" aria-labelledby="boat-h">
              <SecPic k="docks" />
              <p className="kicker">The marina</p>
              <h2 id="boat-h" className="big">By boat.</h2>
              <p className="body">The inn anchors the west side of Hope Town Harbour, with dockage up to 125 ft and moorings for smaller boats. Check your length, then book the slip on Dockwa.</p>
              <SlipCheck />
              <Specs />
            </section>

            <section className="sec" id="bar" data-pic="bar" aria-labelledby="bar-h">
              <SecPic k="bar" />
              <p className="kicker">Bridget's Rum Bar and the restaurant</p>
              <h2 id="bar-h" className="mid">One of the most extensive rum selections in The Bahamas.</h2>
              <p className="body">Local chefs cook local and American dishes for breakfast, lunch and dinner, with the harbour in view.</p>
              <img className="inline-pic" src={IMG + pics.drinks.src} alt={pics.drinks.alt} loading="lazy" width={640} height={480} />
            </section>

            <section className="sec" id="cay" data-pic="cay" aria-labelledby="cay-h">
              <SecPic k="cay" />
              <p className="kicker">For the whole party</p>
              <h2 id="cay-h" className="big">Johnny's Cay.</h2>
              <p className="body">A private island available to rent through the inn. Ask the office for dates and what is included.</p>
              <div className="acts"><a className="ul" href="#contact">Ask about Johnny's Cay</a></div>
            </section>

            <section className="sec" id="here" data-pic="harbour" aria-labelledby="here-h">
              <SecPic k="harbour" />
              <p className="kicker">Getting here</p>
              <h2 id="here-h" className="mid">Fly to Marsh Harbour, then the ferry to Hope Town.</h2>
              <p className="body">GNL Ferry and The Ferry Limited run from Marsh Harbour to Hope Town. You can also fly into Treasure Cay and come over by boat. Arriving on your own boat, book the slip ahead on Dockwa.</p>
              <div className="acts"><a className="btn btn-line" href={DOCKWA}>Book a slip</a><a className="ul" href={RATES}>Check room rates</a></div>
            </section>

            <section className="sec" id="contact" data-pic="cottage" aria-labelledby="c-h">
              <p className="kicker">The office</p>
              <h2 id="c-h" className="mid">Write or call before you cross.</h2>
              <Contact />
              <p className="body">Every year the inn hosts the Elbow Reef Classic, four days with proceeds to the Elbow Reef Lighthouse. Marinalife 2024 Readers' Choice. Dockwa Elite Fleet 2024.</p>
            </section>
          </main>
          <Foot />
          <Strip />
        </div>
      </div>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Home />)
