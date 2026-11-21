import { createRoot } from 'react-dom/client'
import './styles.css'
import { IMG, pics } from './data'
import { useActivePic, Fixed, SecPic, Nav, StayFinder, Contact, Strip, Foot } from './site'

function Stay() {
  const [pic] = useActivePic(['top', 'rooms', 'contact'], 'cottage')
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="split">
        <Fixed pic={pic} />
        <div className="col">
          <main id="main">
            <section className="sec sec--hero" id="top" data-pic="cottage" aria-labelledby="h">
              <SecPic k="cottage" eager />
              <p className="brand"><a href="./" style={{ textDecoration: 'none' }}>Hope Town Inn &amp; Marina</a> &middot; Rooms and villas</p>
              <div className="hide-sm"><Nav base="./" /></div>
              <h1 id="h" className="big">Nine ways to stay.</h1>
              <p className="lede">Three room types in the inn and six named villas across the estate, from a king room for two to villas for eight.</p>
            </section>
            <section className="sec" id="rooms" data-pic="living" aria-labelledby="r-h">
              <SecPic k="living" />
              <h2 id="r-h" className="mid">Find the one that fits your party.</h2>
              <div style={{ marginTop: 'var(--s-4)' }}><StayFinder /></div>
              <img className="inline-pic" src={IMG + pics.porch.src} alt={pics.porch.alt} loading="lazy" width={640} height={480} />
            </section>
            <section className="sec" id="contact" data-pic="cottage" aria-labelledby="c-h">
              <h2 id="c-h" className="mid">Questions about a villa?</h2>
              <Contact />
            </section>
          </main>
          <Foot />
          <Strip />
        </div>
      </div>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Stay />)
