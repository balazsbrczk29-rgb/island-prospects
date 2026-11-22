import { createRoot } from 'react-dom/client'
import './styles.css'
import { Header, Chart, Gateways, Timetable, Close, Strip, Img, usePlan } from './site'
import { ROUTES, contact } from './data'

function Getting() {
  const plan = usePlan()
  const route = ROUTES[plan.r]
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header home={false} />
      <main id="main">
        <section className="open open--gh" aria-labelledby="h1">
          <div className="open__text">
            <p className="dateline">Getting here</p>
            <h1 id="h1">Five ways to Long&nbsp;Island.</h1>
            <p className="open__ask" id="ask">Where do you start?</p>
            <Gateways r={plan.r} setR={plan.setR} idp="ask" />
          </div>
          <div className="open__map">
            <Chart route={route} postcard={false} />
            <p className="answer" aria-live="polite"><em>From {route.k === 'own' ? 'your own field' : route.label}:</em> {route.line}</p>
          </div>
        </section>
        <Timetable home={false} active={route.k} onPick={k => plan.setR(ROUTES.findIndex(x => x.k === k))} />
        <section className="pilots" aria-labelledby="pilots-h">
          <figure><div className="ph ph--32"><Img k="coast" /></div><figcaption>The Long Island coast from the air.</figcaption></figure>
          <div>
            <h2 id="pilots-h">Flying yourself.</h2>
            <p>Stella Maris Airport (SML) has fuel and customs on the field. Private pilots get 15% off accommodation, with some blackout dates, when they book by phone on <a className="tnum" href={`tel:${contact.tollfree.tel}`}>{contact.tollfree.label}</a>.</p>
            <p>The resort has hosted fly-ins for groups such as the South Eastern Bonanza Society and Caribbean Flying Adventures. Private charters are also available through Ascend with Makers Air, and the resort can arrange a car from Gabriel's Car Rentals.</p>
          </div>
        </section>
      </main>
      <Close plan={plan} />
      <Strip />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Getting />)
