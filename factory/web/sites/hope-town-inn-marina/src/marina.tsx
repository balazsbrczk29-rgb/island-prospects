import { createRoot } from 'react-dom/client'
import './styles.css'
import { useActivePic, Fixed, SecPic, Nav, SlipCheck, Specs, Contact, Strip, Foot } from './site'

function Marina() {
  const [pic] = useActivePic(['top', 'check', 'contact'], 'docks')
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="split">
        <Fixed pic={pic} />
        <div className="col">
          <main id="main">
            <section className="sec sec--hero field" id="top" data-pic="docks" aria-labelledby="h">
              <SecPic k="docks" eager />
              <p className="brand"><a href="./" style={{ textDecoration: 'none' }}>Hope Town Inn &amp; Marina</a> &middot; Marina</p>
              <div className="hide-sm"><Nav base="./" /></div>
              <h1 id="h" className="big">Slips to 125 ft.</h1>
              <p className="lede">Fifty surge-free slips with first-class pedestals on the west side of Hope Town Harbour, and moorings to 45 ft.</p>
              <Specs />
            </section>
            <section className="sec" id="check" data-pic="harbour" aria-labelledby="k-h">
              <SecPic k="harbour" />
              <h2 id="k-h" className="mid">Will she fit?</h2>
              <SlipCheck />
            </section>
            <section className="sec" id="contact" data-pic="cay" aria-labelledby="c-h">
              <h2 id="c-h" className="mid">The marina office.</h2>
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
createRoot(document.getElementById('root')!).render(<Marina />)
