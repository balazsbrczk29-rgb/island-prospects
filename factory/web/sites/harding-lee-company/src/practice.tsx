import { ATTORNEYS, MATTERS, letter } from "./data"
import { Chart } from "./chartview"
import { Page, mount, PHONE, TEL } from "./site"

const FAQ = [
  ["Where are your offices?", "Nassau chambers are at Mecam House, Dowdeswell & Deveaux Streets (P.O. Box N-877). The Long Island office is in Salt Pond (P.O. Box LI 30-129)."],
  ["Which courts do you appear in?", "The firm practises in all courts of the Commonwealth of The Bahamas."],
  ["Do you act for clients outside The Bahamas?", "Yes. The firm acts for institutional and individual clients, locally and worldwide."],
  ["What should I put in a first email?", "The kind of matter, your name and how to reach you. Please keep confidential details for the conversation with your attorney."],
  ["How do I reach the Long Island office?", "Call (242) 338-0009 or (242) 338-0042. Fax (242) 338-0092."],
]

function Practice() {
  return (
    <Page home={false}>
      <div className="wrap">
        <p className="crumbs"><a href="index.html">Home</a> / Practice</p>
        <section className="ptitle" data-hero>
          <div>
            <h1>Six kinds of matter, and the attorney for each.</h1>
            <p>A general practice since 1996, focused on commercial law, conveyancing, company incorporation, international and domestic transactions, insurance and banking. In plain words, this is what we do and who does it.</p>
          </div>
          <figure className="pphoto chartbox"><Chart office="nassau" id="p-chart" /></figure>
        </section>
        <div className="sec" style={{ paddingTop: "var(--s6)" }}>
          {MATTERS.map(m => (
            <article className="pm" key={m.id} id={m.id}>
              <h2>{m.label}</h2>
              <div className="body">
                <p>{m.plain}</p>
                <p className="muted">{m.who.map(k => `${ATTORNEYS[k].name}, ${ATTORNEYS[k].role}`).join(". ")}.</p>
                <p><a className="link" href={letter(m, m.who[0])}>Write to {ATTORNEYS[m.who[0]].short} about this</a></p>
              </div>
            </article>
          ))}
        </div>
        <section className="sec faq" aria-labelledby="faq">
          <div className="sec-head"><h2 id="faq">Before you write</h2><p>Or call Nassau chambers on <a className="link num" href={`tel:${TEL}`}>{PHONE}</a>.</p></div>
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="num">{a}</p></details>)}
        </section>
      </div>
    </Page>
  )
}

mount(<Practice />)
