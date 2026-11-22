import { useEffect, useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ATTORNEYS, MATTERS, OFFICES, IMG, letter, type AKey, type Matter, type OKey } from "./data"
import { Chart } from "./chartview"

function Record() {
  return (
    <section className="record" aria-labelledby="record-h">
      <div className="wrap">
        <figure>
          <img src={`${IMG}dowdeswell-facade.jpg`} alt="A pale yellow two-storey building with green louvred shutters and a verandah in downtown Nassau (illustrative)" width={1600} height={2000} loading="lazy" />
          <figcaption>Downtown Nassau, where the chambers sit on Dowdeswell & Deveaux Streets. Illustrative photograph.</figcaption>
        </figure>
        <div>
          <h2 id="record-h">A senior lawyer's attention, the same one for thirty years.</h2>
          <ol className="years">
            <li><span className="y num">1982</span><p>Donna M. Harding-Lee is called to The Bahamas Bar.</p></li>
            <li><span className="y num">14 years</span><p>At Cash, Fountain & Company, becoming a partner. She works closely with Sir Gerald Cash and tutors under Sir Cyril Fountain, a former Chief Justice.</p></li>
            <li><span className="y num">1996</span><p>She founds Harding-Lee & Company, a general practice in Nassau with an office in Salt Pond, Long Island.</p></li>
            <li><span className="y num">2005</span><p>Nadia Hope Johnson, called to the Bar of England & Wales and to The Bahamas Bar that year, joins the firm in November.</p></li>
            <li><span className="y">Today</span><p>Mrs. Harding-Lee chairs the Board of Bank of The Bahamas. The firm practises in every court of the Commonwealth.</p></li>
          </ol>
        </div>
      </div>
    </section>
  )
}

function Attorneys() {
  return (
    <section className="wrap sec" id="attorneys" aria-labelledby="att-h">
      <div className="sec-head">
        <h2 id="att-h">Two attorneys. You speak to one of them.</h2>
        <p>Write to either attorney directly, or call chambers and ask for her by name.</p>
      </div>
      {(Object.keys(ATTORNEYS) as AKey[]).map(k => {
        const a = ATTORNEYS[k]
        return (
          <article className="att" key={k}>
            <span className="pf"><img src={a.portrait} alt={a.name} width={962} height={1142} loading="lazy" /></span>
            <div>
              <h3>{a.name}</h3>
              <p className="role">{a.role}</p>
              <p className="areas">{a.areas}</p>
              <a className="link mail" href={`mailto:${a.email}`}>{a.email}</a>
            </div>
            <ul className="col3">{a.record.map(r => <li key={r} className="num">{r}</li>)}</ul>
          </article>
        )
      })}
    </section>
  )
}

function Offices({ o, setO }: { o: OKey; setO: (o: OKey) => void }) {
  const keys = Object.keys(OFFICES) as OKey[]
  const x = OFFICES[o]
  return (
    <section className="wrap sec" id="offices" aria-labelledby="off-h">
      <div className="sec-head">
        <h2 id="off-h">Nassau chambers, and an office on Long Island.</h2>
        <p>The firm works from Mecam House in Nassau and from Salt Pond, Long Island. Call either office directly.</p>
      </div>
      <div className="offices-photo">
        <img src={`${IMG}salt-pond-dock.jpg`} alt="A weathered timber dock over clear turquoise shallows, Long Island, The Bahamas (illustrative)" width={1920} height={1088} loading="lazy" />
      </div>
      <div className="office-panel">
        <div className="tabs" role="tablist" aria-label="Offices">
          {keys.map(k => (
            <button key={k} role="tab" id={`tab-${k}`} aria-controls="office-panel" aria-selected={o === k} onClick={() => setO(k)}>{OFFICES[k].name}</button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={o} id="office-panel" role="tabpanel" aria-labelledby={`tab-${o}`} className="office" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <address>{x.lines.map(l => <div key={l}>{l}</div>)}<div>{x.island}</div></address>
            <div>
              <div className="phones">{x.phones.map(([t, h]) => <a key={h} className="link num" href={`tel:${h}`}>{t}</a>)}</div>
              <p className="fax num">Fax {x.fax}</p>
            </div>
            <p className="dir"><a className="link" href={x.map} target="_blank" rel="noopener">Directions in Google Maps</a></p>
            <div className="mini"><Chart office={o} onPick={setO} id="off-chart" view={o === "nassau" ? "130 110 400 240" : "570 560 420 300"} /></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Practice() {
  return (
    <section className="wrap sec" aria-labelledby="pr-h">
      <div className="sec-head">
        <h2 id="pr-h">What the firm does, in plain words.</h2>
        <p>A general practice, for institutional and individual clients, locally and worldwide.</p>
      </div>
      <div className="index">
        {MATTERS.map(m => (
          <a key={m.id} href={`practice.html#${m.id}`}>
            <h3>{m.label}</h3>
            <span className="by">{m.who.map(k => ATTORNEYS[k].initials).join(" + ")}</span>
            <p>{m.plain}</p>
          </a>
        ))}
      </div>
      <p className="courts">The firm appears in all courts of the Commonwealth of The Bahamas. <a className="link" href="practice.html">More about each matter</a></p>
    </section>
  )
}

function Write({ m, o }: { m: Matter; o: OKey }) {
  const [mid, setMid] = useState(m.id)
  const [to, setTo] = useState<AKey>(m.who[0])
  const [name, setName] = useState("")
  const [reply, setReply] = useState("")
  const [note, setNote] = useState("")
  useEffect(() => { setMid(m.id); setTo(m.who[0]) }, [m])
  const matter = MATTERS.find(x => x.id === mid) ?? null
  const submit = (e: FormEvent) => { e.preventDefault(); window.location.href = letter(matter, to, o, name, reply, note) }
  return (
    <section className="wrap sec" id="write" aria-labelledby="w-h">
      <div className="sec-head">
        <h2 id="w-h">Write to us. The first letter is simple.</h2>
        <p>Choose the matter and we prepare an email to the attorney who handles it. It opens in your own mail app, so nothing is sent until you press send.</p>
      </div>
      <div className="enq">
        <form className="form" onSubmit={submit}>
          <div className="field full">
            <label htmlFor="f-m">Your matter</label>
            <select id="f-m" value={mid} onChange={e => { const n = MATTERS.find(x => x.id === e.target.value)!; setMid(n.id); setTo(n.who[0]) }}>
              {MATTERS.map(x => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-a">Attorney</label>
            <select id="f-a" value={to} onChange={e => setTo(e.target.value as AKey)}>
              {(Object.keys(ATTORNEYS) as AKey[]).map(k => <option key={k} value={k}>{ATTORNEYS[k].name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-n">Your name</label>
            <input id="f-n" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="field full">
            <label htmlFor="f-r">Best way to reach you (phone or email)</label>
            <input id="f-r" value={reply} onChange={e => setReply(e.target.value)} />
          </div>
          <div className="field full">
            <label htmlFor="f-t">A line about it (optional)</label>
            <textarea id="f-t" value={note} onChange={e => setNote(e.target.value)} />
            <span className="hint">Please keep confidential details for the conversation itself.</span>
          </div>
          <div className="field full"><button className="btn" type="submit">Prepare my email to {ATTORNEYS[to].short}</button></div>
        </form>
        <div className="card">
          {(Object.keys(OFFICES) as OKey[]).map(k => {
            const x = OFFICES[k]
            return (
              <div key={k}>
                <h3>{x.name}</h3>
                <p>{x.lines.join(", ")}</p>
                <p className="num">{x.phones.map(([t, h], i) => <span key={h}>{i ? ", " : ""}<a className="link" href={`tel:${h}`}>{t}</a></span>)}</p>
              </div>
            )
          })}
          <div>
            <h3>Email</h3>
            {(Object.keys(ATTORNEYS) as AKey[]).map(k => <p key={k}><a className="link" href={`mailto:${ATTORNEYS[k].email}`}>{ATTORNEYS[k].email}</a></p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  ["You write or call", "Tell us the kind of matter and how to reach you. A line is enough; keep confidential details for the meeting."],
  ["Your attorney replies", "The attorney who handles that kind of matter contacts you to arrange a first meeting, in Nassau or in Salt Pond."],
  ["Bring what you have", "Deeds, company papers, letters or contracts: whatever you already hold about the matter."],
  ["Terms before work", "How the matter will be handled and charged is agreed with you before the work begins."],
]

function Consult() {
  return (
    <section className="wrap sec consult" aria-labelledby="c-h">
      <figure className="cphoto">
        <img src={`${IMG}louvre-desk.jpg`} alt="Morning light through louvred shutters across a desk and a ribboned deed (illustrative)" width={1920} height={1088} loading="lazy" />
      </figure>
      <div>
        <h2 id="c-h">What happens after you write.</h2>
        <ol className="steps">
          {STEPS.map(([h, p], i) => (
            <li key={h}><span className="n num">{i + 1}</span><div><h3>{h}</h3><p>{p}</p></div></li>
          ))}
        </ol>
        <p className="cnote"><a className="link" href="#write">Write to us</a></p>
      </div>
    </section>
  )
}

export function Rest({ m, o, setO }: { m: Matter; o: OKey; setO: (o: OKey) => void }) {
  return (
    <>
      <Practice />
      <Record />
      <Attorneys />
      <Offices o={o} setO={setO} />
      <Consult />
      <Write m={m} o={o} />
    </>
  )
}
