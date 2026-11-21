import { Page, mount } from "./site"
import { Planner } from "./planner"

const FAQ: [string, string][] = [["Where is Pro-Tech Security?", "At #2 Farrington Road & Gregory Street, Nassau (P.O. Box CB-13083). The office is open Monday to Friday, 9 am to 5 pm."], ["Is the alarm monitored at night?", "Pro-Tech runs 24/7 central station monitoring, so a monitored alarm is watched around the clock, including weekends."], ["Is Pro-Tech licensed?", "Yes. Pro-Tech is licensed and regulated by the Ministry of National Security as a security service contractor, and holds a Bahamas business licence."], ["How do I get a quote?", "Call (242) 328-0653 during office hours. The planner on this site prepares a short list of what you need so the call is quick."]]

function Plan() {
  return (
    <Page solid>
      <section className="ptop" data-hero>
        <p className="crumbs"><a href="index.html">Home</a> / Plan your call</p>
        <h1>Tell us what to protect. Call with the list.</h1>
        <p>Choose the property and what you need. The page writes a one-line request you can read out or copy, so the call to the Farrington Road office takes a minute.</p>
        <Planner />
      </section>
      <section className="sec" aria-labelledby="faq-h">
        <span className="n num">FAQ</span>
        <h2 id="faq-h">Before you call.</h2>
        <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="num">{a}</p></details>)}</div>
      </section>
    </Page>
  )
}

mount(<Plan />)
