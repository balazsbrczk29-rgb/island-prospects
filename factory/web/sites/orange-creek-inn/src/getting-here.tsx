import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Foot, Img, Masthead, Page, mount, usePlan } from "./site"
import { BOOK, PHONE, PHOTOS, TEL } from "./facts"
import RouteMap from "./RouteMap"

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const
const FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const MAKERS = [true, false, true, false, true, true, false]

function DayPlan() {
  const { arrive } = usePlan()
  const [d, setD] = useState(() => (new Date(arrive + "T12:00:00Z").getUTCDay() + 6) % 7)
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
      <Masthead home={false} />
      <main id="main" className="guide">
        <section className="guide__top" aria-labelledby="g-h1">
          <div>
            <h1 id="g-h1">Getting to Orange Creek Inn, Cat Island.</h1>
            <p className="lead">Most guests fly to Nassau and take a short domestic flight to Arthur&rsquo;s Town. From Florida there is a direct flight four days a week. Then it is 3.5 miles up a quiet road to the inn.</p>
            <p><a className="btn" href={BOOK} target="_blank" rel="noopener">Check availability <ArrowUpRight aria-hidden /></a></p>
          </div>
          <figure><Img photo={PHOTOS.road} eager sizes="(min-width: 1100px) 640px, 100vw" /><figcaption>{PHOTOS.road.caption}</figcaption></figure>
        </section>

        <section className="guide__sec" aria-labelledby="day-h">
          <h2 id="day-h">Pick the day you want to land.</h2>
          <div>
            <DayPlan />
            <p className="lead" style={{ marginTop: 24, fontSize: "1rem" }}>Flight times are the ones the inn publishes for guests. Airlines change them, so confirm when you book.</p>
          </div>
        </section>

        <section className="guide__sec" aria-labelledby="routes-h">
          <h2 id="routes-h">The two ways in.</h2>
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

        <section className="guide__sec guide__sec--map" aria-labelledby="map-h">
          <h2 id="map-h">Your route, and what the week costs.</h2>
          <div><RouteMap /></div>
        </section>

        <section className="guide__sec" aria-labelledby="asked-h">
          <h2 id="asked-h">What guests ask before they come.</h2>
          <div className="asked">
            {ASKED.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
            <div><h3>Can I just call?</h3><p>Of course: <a className="link num" href={TEL}>{PHONE}</a>.</p></div>
          </div>
        </section>
      </main>
      <Foot />
    </Page>
  )
}

mount(<GettingHere />)
