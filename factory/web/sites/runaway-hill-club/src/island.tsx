import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Descent, Dining, GettingHere, Contact, PhoneBar, usePlan, Photo } from './site'
import { IMG } from './data'

function Island() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current="The house" />
      <main id="main">
        <section className="ihead" aria-labelledby="h1">
          <div>
            <p className="kicker">Harbour Island, The Bahamas</p>
            <h1 id="h1">The house, the table and the way&nbsp;here.</h1>
            <p className="lede">A converted 1946 English manor high on its hill, a tiled pool below it, a staircase to Pink Sands Beach, dinner with the ocean in view.</p>
            <a className="btn" href="./#book">Choose your room</a>
          </div>
          <Photo pic={IMG.hero} eager className="ihead__pic" />
        </section>
        <Descent />
        <Dining />
        <GettingHere />
      </main>
      <Contact plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Island />)
