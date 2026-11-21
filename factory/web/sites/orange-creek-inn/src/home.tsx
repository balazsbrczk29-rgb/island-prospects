import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Foot, LaidPrint, Letterhead, Page, Print, mount } from "./site"
import PrintPile from "./PrintPile"
import ReplyCard from "./ReplyCard"
import Way from "./Way"
import { COSTS, NAME, PHONE, PHOTOS, TEL } from "./facts"

function Opening() {
  return (
    <section className="spread opening" data-hides-reply aria-labelledby="opening-title">
      <div className="spread__words">
        <p className="voice">Dear traveller,</p>
        <h1 id="opening-title">The beach is across the road.</h1>
        <p className="opening__lead">
          {NAME} sits at the top of Cat Island, just north of Arthur&rsquo;s Town: studios with their own kitchenettes, a grocery store on site, and white sand the width of one quiet road away.
        </p>
        <div className="opening__act">
          <a className="btn" href="#reply">Check dates <ArrowRight aria-hidden /></a>
          <span>or call <a className="link num tap" href={TEL}>{PHONE}</a></span>
        </div>
      </div>
      <PrintPile photos={[PHOTOS.road, PHOTOS.inn, PHOTOS.sandbar, PHOTOS.rocks]} />
    </section>
  )
}

function Place() {
  return (
    <section id="place" className="spread" aria-labelledby="place-title">
      <div className="spread__words">
        <h2 id="place-title">Where the creek runs out to the sea.</h2>
        <p className="measure">
          Orange Creek is the settlement immediately north of Arthur&rsquo;s Town. The inn is a white two-storey building with the beach in front of it and the creek a walk away. Cat Island is one of the least crowded islands in the Bahamas, and up here you will often have the sand to yourself.
        </p>
        <p className="measure">
          December to April are the most popular months. The airport is 3.5 miles down the road, and we can come and collect you.
        </p>
        <blockquote className="quote measure">
          <p>&ldquo;The creek further up is full of turtles, stingrays and baby nurse sharks.&rdquo;</p>
          <footer>Marquis Knowles, a guest, on Google in June 2024</footer>
        </blockquote>
      </div>
      <LaidPrint photo={PHOTOS.aerial} className="spread__margin" turn={2} />
    </section>
  )
}

const IN_ROOM = [
  "Stove-top kitchenette", "Toaster and coffee maker", "Dining table and chairs", "Air conditioning and a ceiling fan",
  "Television and internet", "Alarm clock and radio", "Iron and ironing board", "Laundry and ice machine close by",
]

function Studios() {
  return (
    <section id="studios" className="spread" aria-labelledby="studios-title">
      <div className="spread__words">
        <h2 id="studios-title">A studio with its own stove.</h2>
        <p className="measure">
          Every room is a spacious studio, so you can cook what you bought at the store and eat at your own table. Come and go as you like.
        </p>
        <ul className="inroom">
          {IN_ROOM.map(i => <li key={i}>{i}</li>)}
        </ul>
        <dl className="terms">
          <dt>Check-in</dt><dd className="num">2:00 pm</dd>
          <dt>Check-out</dt><dd className="num">12:00 pm</dd>
          <dt>Rates</dt><dd>On request, <a className="link" href="#reply">with your dates</a></dd>
          <dt>Payment</dt><dd>Visa, MasterCard, or cash on arrival</dd>
        </dl>
      </div>
      <div className="pair spread__margin">
        <LaidPrint photo={PHOTOS.studioA} turn={2.2} />
        <LaidPrint photo={PHOTOS.studioB} turn={-2.4} />
      </div>
    </section>
  )
}

function OnSite() {
  return (
    <section className="onsite" aria-labelledby="onsite-title">
      <div className="stack-gap">
        <h2 id="onsite-title">What things cost up here.</h2>
        <p className="measure">
          The grocery store, the laundry and the ice machine are on the property. We rent cars and bicycles, and a car can be waiting at the airport when you land. Around us there are about six restaurants, all cooking Bahamian food.
        </p>
      </div>
      <ul className="costs">
        {COSTS.map(([what, price]) => <li key={what}><span>{what}</span><span className="num">{price}</span></li>)}
      </ul>
    </section>
  )
}

const DAYS = [PHOTOS.flats, PHOTOS.bonefish, PHOTOS.angler, PHOTOS.egrets, PHOTOS.kayak, PHOTOS.creek]

function Days() {
  const strip = useRef<HTMLDivElement>(null)
  const hold = useRef<{ x: number; left: number } | null>(null)
  const step = (dir: number) => {
    const el = strip.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 500) + 32), behavior: "smooth" })
  }
  return (
    <section id="days" className="days on-deep" aria-labelledby="days-title">
      <div className="days__head">
        <div className="stack-gap">
          <h2 id="days-title">Days here are mostly water.</h2>
          <p>
            Some of Cat Island&rsquo;s best bonefishing flats are close by. There is saltwater fishing, kayaking, bicycling, boat rides and sightseeing tours, the straw markets, and the Blue Hole, Port Royal Beach and Fernandez Bay to drive to.
          </p>
        </div>
        <div className="days__tools">
          <button type="button" className="round" aria-label="Earlier photographs" onClick={() => step(-1)}><ArrowLeft aria-hidden /></button>
          <button type="button" className="round" aria-label="More photographs" onClick={() => step(1)}><ArrowRight aria-hidden /></button>
        </div>
      </div>
      <div
        ref={strip}
        className="strip"
        tabIndex={0}
        role="group"
        aria-label="Photographs of days at Orange Creek"
        onPointerDown={e => { if (e.pointerType === "mouse") { hold.current = { x: e.clientX, left: e.currentTarget.scrollLeft }; e.currentTarget.classList.add("is-held") } }}
        onPointerMove={e => { if (hold.current) e.currentTarget.scrollLeft = hold.current.left - (e.clientX - hold.current.x) }}
        onPointerUp={e => { hold.current = null; e.currentTarget.classList.remove("is-held") }}
        onPointerLeave={e => { hold.current = null; e.currentTarget.classList.remove("is-held") }}
      >
        {DAYS.map(photo => <figure key={photo.src} className="print"><Print photo={photo} /></figure>)}
      </div>
    </section>
  )
}

function GettingHere() {
  return (
    <section id="way" aria-labelledby="way-title">
      <h2 id="way-title" className="measure">One short flight, then three and a half miles.</h2>
      <Way more={<a className="link" href="getting-here.html">Flight days, prices and what guests ask</a>} />
    </section>
  )
}

function Reply() {
  return (
    <section id="reply" data-hides-reply aria-labelledby="reply-title">
      <h2 id="reply-title" className="measure">Tell us when. We will tell you what fits.</h2>
      <p className="measure" style={{ marginTop: "var(--s5)" }}>
        Six offers are published for the Out Islands this season. Set your dates and the card shows the ones your stay qualifies for.
      </p>
      <div className="reply"><ReplyCard /></div>
    </section>
  )
}

function SignOff() {
  return (
    <section className="signoff" aria-labelledby="signoff-title">
      <div>
        <p className="voice">With warm wishes from the top of Cat Island,</p>
        <h2 id="signoff-title">Come up and see us.</h2>
        <p className="signoff__name">{NAME}</p>
      </div>
      <blockquote className="quote">
        <p>&ldquo;Staying at Orange Creek Inn felt like visiting family in the best way.&rdquo;</p>
        <footer>SamMcK2022, a guest, on Tripadvisor in March 2022</footer>
      </blockquote>
    </section>
  )
}

function Home() {
  return (
    <Page home>
      <Letterhead home />
      <main id="letter">
        <div className="sheet sheet--below">
          <Opening />
          <Place />
          <Studios />
          <OnSite />
        </div>
        <Days />
        <div className="sheet sheet--above">
          <GettingHere />
          <Reply />
          <SignOff />
        </div>
      </main>
      <Foot />
    </Page>
  )
}

mount(<Home />)
