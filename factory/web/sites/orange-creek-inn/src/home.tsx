import { motion } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { BOOK, EMAIL, FACEBOOK, PHONE, PHOTOS, TEL } from "./facts"
import { Foot, Img, Masthead, Page, mount } from "./site"
import DatesBar from "./DatesBar"
import RouteMap from "./RouteMap"
import Specials from "./Specials"
import Strip from "./Strip"

const ease = [0.2, 0.7, 0.2, 1] as const
const IN_STUDIO = [
  "Stove-top kitchenette", "Toaster and coffee maker", "Dining table and chairs", "Air conditioning and ceiling fan",
  "Television and internet", "Alarm clock radio", "Iron and ironing board",
]

function Home() {
  return (
    <Page home>
      <Masthead home />
      <main id="main">
        <section className="hero" aria-labelledby="h1">
          <div className="hero__words">
            <motion.h1 id="h1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
              The beach is across the&nbsp;road.
            </motion.h1>
            <motion.p className="hero__lede" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease }}>
              Spacious studios with their own kitchenettes at the top of Cat Island, just north of Arthur&rsquo;s Town. A grocery store, laundry and cars on site, and bonefish flats close by.
            </motion.p>
          </div>
          <motion.figure className="hero__photo" initial={{ clipPath: "inset(12% 0 0 0)", opacity: 0.4 }} animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }} transition={{ duration: 1.1, ease }}>
            <div className="hero__frame"><Img photo={PHOTOS.road} eager sizes="(min-width: 1100px) 860px, 100vw" className="hero__img" /></div>
          </motion.figure>
          <motion.div className="hero__bar" data-hides-key initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease }}>
            <DatesBar />
          </motion.div>
        </section>

        <section id="studio" className="studio" aria-labelledby="studio-h">
          <div className="studio__photos">
            <figure className="studio__a"><Img photo={PHOTOS.studioA} sizes="(min-width: 1100px) 640px, 100vw" /><figcaption>{PHOTOS.studioA.caption}</figcaption></figure>
            <figure className="studio__b"><Img photo={PHOTOS.studioB} sizes="(min-width: 1100px) 720px, 100vw" /><figcaption>{PHOTOS.studioB.caption}</figcaption></figure>
          </div>
          <div className="studio__text">
            <h2 id="studio-h">Your studio: room to cook, eat and spread out.</h2>
            <p className="lead">Every studio is spacious, with its own kitchenette and a table to eat at. Swim before breakfast, then cook what you caught for dinner.</p>
            <ul className="ticks">{IN_STUDIO.map(t => <li key={t}>{t}</li>)}</ul>
            <dl className="facts">
              <div><dt>Check-in</dt><dd className="num">2:00 pm</dd></div>
              <div><dt>Check-out</dt><dd className="num">12:00 noon</dd></div>
              <div><dt>Rates</dt><dd>On request, or live on <a className="link" href={BOOK} target="_blank" rel="noopener">BahamaGo</a></dd></div>
              <div><dt>Payment</dt><dd>Visa, MasterCard, or cash on arrival</dd></div>
            </dl>
            <div className="onsite">
              <h3>On site</h3>
              <p>A grocery store, laundry and an ice machine. Cars for about <span className="num">$80</span> a day, waiting at the airport if you like, and bicycles for <span className="num">$10</span>.</p>
            </div>
          </div>
        </section>

        <section id="around" className="around" aria-labelledby="around-h">
          <div className="around__top">
            <figure className="around__aerial"><Img photo={PHOTOS.aerial} sizes="(min-width: 1100px) 760px, 100vw" /><figcaption>{PHOTOS.aerial.caption}</figcaption></figure>
            <div className="around__text">
              <h2 id="around-h">The top of Cat Island, at walking pace.</h2>
              <p className="lead">Orange Creek is where a creek runs out to the sea, with white sandbars at low water and bonefishing flats nearby. Guests write about turtles, stingrays and bonefish in the creek.</p>
              <ul className="near">
                <li><strong>On the water</strong> Bonefishing, saltwater fishing, kayaking and boat rides.</li>
                <li><strong>Along the island</strong> The Blue Hole, Port Royal Beach, Fernandez Bay, straw markets and sightseeing tours.</li>
                <li><strong>Dinner out</strong> About six restaurants nearby serve Bahamian food, <span className="num">$12 to $18</span> a meal.</li>
              </ul>
            </div>
          </div>
          <Strip photos={[PHOTOS.flats, PHOTOS.bonefish, PHOTOS.angler, PHOTOS.egrets, PHOTOS.kayak, PHOTOS.creek, PHOTOS.sandbar, PHOTOS.rocks]} />
        </section>

        <section id="getting-here" className="getting" aria-labelledby="get-h">
          <div className="getting__head">
            <h2 id="get-h">One short flight, then three and a half miles.</h2>
            <p className="lead">Pick where you start. The route, the flight on your arrival day and what the week costs follow your dates. <a className="link" href="getting-here.html">The full travel guide</a></p>
          </div>
          <RouteMap />
        </section>

        <section id="offers" className="offers-sec" data-hides-key aria-labelledby="offers-h">
          <h2 id="offers-h">Six published offers, checked against your dates.</h2>
          <Specials />
        </section>

        <section id="contact" className="contact" data-hides-key aria-labelledby="contact-h">
          <figure className="contact__photo"><Img photo={PHOTOS.inn} sizes="(min-width: 1100px) 620px, 100vw" /><figcaption>{PHOTOS.inn.caption}</figcaption></figure>
          <div className="contact__text">
            <h2 id="contact-h">Call us, write, or book online.</h2>
            <p className="lead">Ask about dates, airport pick-up, a car waiting at the airport or a late arrival.</p>
            <ul className="reach">
              <li><a href={TEL}><Phone aria-hidden /><span className="num">{PHONE}</span></a></li>
              <li><a href={`mailto:${EMAIL}`}><Mail aria-hidden /><span>{EMAIL}</span></a></li>
              <li><a href={BOOK} target="_blank" rel="noopener"><ArrowUpRight aria-hidden /><span>Live availability on BahamaGo</span></a></li>
              <li><a href={FACEBOOK} target="_blank" rel="noopener"><ArrowUpRight aria-hidden /><span>Orange Creek Inn on Facebook</span></a></li>
            </ul>
          </div>
        </section>
      </main>
      <Foot />
    </Page>
  )
}

mount(<Home />)
