import { createRoot } from 'react-dom/client'
import './styles.css'
import { IMG, chapters, services } from './data'
import { Top, Proposal, Credits, CallPill } from './site'

const pic: Record<string, number> = { officers: 0, patrol: 2, alarm: 4, investigations: -1, consultancy: 3 }
function Services() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Top home={false} />
      <main id="main" className="wrap">
        <div className="page-head">
          <h1>Officers, patrols, alarm monitoring, investigations and consultancy.</h1>
          <p>Five services from one Nassau company founded in 1993, run from #15 Carib Road.</p>
        </div>
        {services.map(s => {
          const i = pic[s.id]; const src = i >= 0 ? IMG + chapters[i].img : IMG + 'notes.jpg'; const alt = i >= 0 ? chapters[i].alt : 'A notebook, pen and folder on a desk in striped window light (illustrative photograph)'
          return (
            <section className="svc-row" id={s.id} key={s.id} aria-labelledby={s.id + '-h'}>
              <span className="t">{s.n}</span>
              <div className="b"><h2 id={s.id + '-h'}>{s.name}</h2><p>{s.body}</p><p>For: {s.who.toLowerCase()}.</p></div>
              <img src={src} alt={alt} loading="lazy" width={640} height={427} data-source="generated" />
            </section>
          )
        })}
      </main>
      <Proposal />
      <Credits />
      <CallPill />
    </>
  )
}
createRoot(document.getElementById('root')!).render(<Services />)
