import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Shores, Water, Getting, Close, PhoneBar, Photo, usePlan } from './site'
import { IMG } from './data'

function Island() {
  const plan = usePlan()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current="The island" />
      <main id="main">
        <section className="ihead" aria-labelledby="h1">
          <div>
            <p className="kicker">Stella Maris, Long Island, The Bahamas</p>
            <h1 id="h1">An Out Island club between two&nbsp;shorelines.</h1>
            <p className="lede">Food is great, as is casual evening fun, and many activities are free of charge. Dive Dean's Blue Hole, fish the bays, and let the club fly you in.</p>
            <a className="btn" href="./#plan">Plan your stay</a>
          </div>
          <Photo pic={IMG.resort} eager className="ihead__pic" />
        </section>
        <Shores />
        <Water plan={plan} />
        <Getting plan={plan} />
      </main>
      <Close plan={plan} />
      <PhoneBar plan={plan} />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Island />)
