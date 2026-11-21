import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Foot, LaidPrint, Letterhead, Page, mount } from "./site"
import { COSTS, PHONE, PHOTOS, TEL } from "./facts"

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const
const FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const MAKERS = [true, false, true, false, true, true, false]

function DayPlan() {
  const [d, setD] = useState(2)
  const next = FULL[[1, 2, 3, 4, 5, 6].map(k => (d + k) % 7).find(i => MAKERS[i])!]
  return (
    <div>
      <div className="week" role="group" aria-label="Day you want to arrive">
        {WEEK.map((w, i) => (
          <button key={w} type="button" aria-pressed={d === i} aria-label={FULL[i]} onClick={() => setD(i)}>{w}</button>
        ))}
      </div>
      <div className="dayplan" aria-live="polite">
        <h3>Arriving on a {FULL[d]}</h3>
        <p><strong>Through Nassau:</strong> Western Air lands on Cat Island at <span className="num">9:30 am</span> and <span className="num">4:00 pm</span>.</p>
        {MAKERS[d]
          ? <p><strong>Direct from Fort Lauderdale:</strong> Makers Air leaves FXE at <span className="num">6:45 am</span> and <span className="num">12:45 pm</span>.</p>
          : <p><strong>Direct from Fort Lauderdale:</strong> no Makers Air flight on a {FULL[d]}. The next one is {next}, or ask about a private charter.</p>}
      </div>
    </div>
  )
}

const ASKED: [string, string][] = [
  ["Which airport is nearest?", "Arthur's Town Airport, about 3.5 miles from the inn. A taxi is about $15, or we can collect you."],
  ["Do I need a car?", "Cars and bicycles are both available and worth having for the beaches and settlements along the island. A car is about $80 a day and can be waiting at the airport. Bicycles are $10 a day."],
  ["Is the inn close to the beach?", "It is directly across the road from a white-sand beach, for swimming, fishing or doing nothing."],
  ["Where do we eat?", "Your studio has a stove-top kitchenette and the grocery store is on site. There are about six restaurants nearby serving Bahamian food, at $12 to $18 for an average meal."],
  ["Is the fishing good?", "Some of the best bonefishing flats on Cat Island are close to the inn, and there is saltwater fishing too."],
  ["When is the best time to come?", "Cat Island is a year-round island. December to April are the most popular months."],
  ["How do I pay?", "Visa or MasterCard, or cash when you arrive."],
]

function GettingHere() {
  return (
    <Page home={false}>
      <Letterhead home={false} />
      <main id="letter">
        <div className="sheet sheet--below sheet--above">
          <section className="arrive" data-hides-reply aria-labelledby="arrive-title">
            <div className="stack-gap">
              <p className="voice">How to reach Orange Creek Inn, Cat Island</p>
              <h1 id="arrive-title">One short flight, then three and a half miles.</h1>
              <p className="measure">
                Most guests fly to Nassau and take a domestic flight on to Cat Island. From Florida there is a direct flight four days a week. Either way, the last stretch is a quiet road north from Arthur&rsquo;s Town Airport.
              </p>
              <p><a className="btn" href="index.html#reply">Check dates <ArrowRight aria-hidden /></a></p>
            </div>
            <LaidPrint photo={PHOTOS.road} className="arrive__print" turn={2} />
          </section>

          <section aria-labelledby="day-title">
            <div className="dayday">
              <div className="stack-gap">
                <h2 id="day-title">Pick the day you want to land.</h2>
                <p className="measure">Flight times are the ones we publish for guests. Airlines change them, so confirm when you book.</p>
              </div>
              <DayPlan />
            </div>
            <div className="routes">
              <div>
                <h3>Through Nassau</h3>
                <dl>
                  <dt>Airline</dt><dd>Western Air</dd>
                  <dt>Lands</dt><dd className="num">9:30 am and 4:00 pm</dd>
                  <dt>Fare</dt><dd className="num">about $190 round trip</dd>
                </dl>
              </div>
              <div>
                <h3>Direct from Fort Lauderdale</h3>
                <dl>
                  <dt>Airline</dt><dd>Makers Air, from Fort Lauderdale Executive (FXE)</dd>
                  <dt>Days</dt><dd>Monday, Wednesday, Friday, Saturday</dd>
                  <dt>Out</dt><dd className="num">6:45 am and 12:45 pm</dd>
                  <dt>Home</dt><dd className="num">10:00 am from Cat Island</dd>
                  <dt>Charters</dt><dd>Private flights at the time you choose</dd>
                </dl>
              </div>
            </div>
          </section>

          <section className="onsite" aria-labelledby="costs-title">
            <div className="stack-gap">
              <h2 id="costs-title">What things cost up here.</h2>
              <p className="measure">Rough figures so you can plan the week. Room rates depend on your dates: send them and we will reply.</p>
              <p><a className="link tap" href="index.html#reply">Send your dates</a> or call <a className="link num tap" href={TEL}>{PHONE}</a></p>
            </div>
            <ul className="costs">
              {COSTS.map(([what, price]) => <li key={what}><span>{what}</span><span className="num">{price}</span></li>)}
            </ul>
          </section>

          <section aria-labelledby="asked-title">
            <h2 id="asked-title">What guests ask before they come.</h2>
            <div className="asked">
              {ASKED.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
            </div>
          </section>
        </div>
      </main>
      <Foot />
    </Page>
  )
}

mount(<GettingHere />)
