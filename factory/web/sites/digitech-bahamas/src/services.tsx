import { createRoot } from 'react-dom/client'
import './styles.css'
import { IMG, services } from './data'
import { Contact, Dock } from './site'

function Services() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar topbar--static">
        <a className="wordmark" href="./"><i aria-hidden="true" />Digitech Bahamas</a>
        <a className="num" href="tel:+12426762033">(242) 676-2033</a>
      </header>
      <main id="main" className="wrap">
        <div className="svc-hero">
          <h1>The till, the network, the servers and the backup.</h1>
          <p>Affordable IT consultancy in The Bahamas: four services from one team in Centreville, Nassau, supported after installation.</p>
        </div>
        {services.map((s, i) => (
          <section className="svc" id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
            <span className="svc__n num">0{i + 1}</span>
            <div className="svc__b">
              <h2 id={`${s.id}-h`}>{s.name}</h2>
              <p>{s.body}</p>
              <ul>{s.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
              <p style={{ marginTop: '2rem' }}><a className="btn btn-primary" href="./#compose">Build your quote</a></p>
            </div>
            <img className={'svc__img' + (s.xray ? ' xr__img' : '')} src={IMG + s.img} alt={s.alt} loading={i ? 'lazy' : 'eager'} width={800} height={533} data-source="generated" />
          </section>
        ))}
      </main>
      <Contact />
      <Dock />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Services />)
