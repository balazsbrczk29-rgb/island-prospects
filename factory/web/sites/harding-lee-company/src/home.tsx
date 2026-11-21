import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ATTORNEYS, MATTERS, IMG, letter, type Matter } from "./data"
import { Page, mount, PHONE, TEL } from "./site"
import { Rest } from "./sections"

function Answer({ m }: { m: Matter }) {
  const lead = ATTORNEYS[m.who[0]]
  const names = m.who.map(k => ATTORNEYS[k].name).join(" and ")
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }} aria-live="polite">
        <div className="who">
          <div className="faces">{m.who.map(k => <span className="pf" key={k}><img src={ATTORNEYS[k].portrait} alt={ATTORNEYS[k].name} width={962} height={1142} /></span>)}</div>
          <div>
            <p className="names">{names}</p>
            <p className="role">{m.who.map(k => ATTORNEYS[k].role).join(" and ")}</p>
          </div>
        </div>
        <p className="why">{m.why}</p>
        <div className="acts">
          <a className="btn" href={letter(m, m.who[0])}>Write to {lead.short}</a>
          <a className="link num" href={`tel:${TEL}`}>Call Nassau chambers, {PHONE}</a>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Hero({ m, setM }: { m: Matter; setM: (m: Matter) => void }) {
  return (
    <section className="wrap hero" data-hero aria-labelledby="h1">
      <div className="hero-q">
        <h1 id="h1">What are you dealing with? We will tell you who handles it.</h1>
        <p className="lede">A law practice in Nassau and Salt Pond, Long Island, since 1996, led by a senior partner called to the Bahamas Bar in 1982.</p>
        <ul className="matters" aria-label="Choose your matter">
          {MATTERS.map(x => (
            <li key={x.id}>
              <button type="button" aria-pressed={x.id === m.id} onClick={() => setM(x)}>
                <span>{x.label}</span><span className="tick" aria-hidden="true" />
              </button>
              {x.id === m.id && <div className="answer-inline"><Answer m={m} /></div>}
            </li>
          ))}
        </ul>
      </div>
      <div className="hero-side">
        <motion.div className="photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <img src={`${IMG}louvre-desk.jpg`} alt="Morning light through louvred shutters across a mahogany desk and a ribboned deed (illustrative)" width={1600} height={900} fetchPriority="high" />
        </motion.div>
        <div className="answer"><Answer m={m} /></div>
      </div>
    </section>
  )
}

function Home() {
  const [m, setM] = useState<Matter>(MATTERS[0])
  return (
    <Page>
      <Hero m={m} setM={setM} />
      <Rest m={m} />
    </Page>
  )
}

mount(<Home />)
