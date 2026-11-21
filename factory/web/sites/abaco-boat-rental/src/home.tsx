import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import DayRuler, { DayStepper, Roll } from "./DayRuler"
import LivingWater from "./LivingWater"
import Planner from "./Planner"
import { BookButton, Closing, Toolbar, TripTab, ease, mount } from "./chrome"
import { PHOTO, dayWord, money, sized, useTrip } from "./trip"
import "./styles.css"

function Hero() {
  const { days, rate, boat } = useTrip()
  // more days, more sea: the frame eases back from a tight crop to the whole photograph
  const zoom = 1.12 - 0.12 * Math.min(1, (days - 1) / 6)
  return (
    <section className="hero" aria-labelledby="hero-title" data-tab-hide>
      <div className="hero__main wrap">
        <div className="hero__say">
          <h1 id="hero-title" className="hero__title">
            <span><i>One boat,</i></span> <span><i>done right.</i></span>
          </h1>
          <p className="hero__lede">A 24 ft Key West for eight, kept on Man-O-War Cay and delivered to your dock anywhere on the Sea of Abaco.</p>
        </div>
        <figure className="hero__photo">
          <img
            src={sized(PHOTO.boat, 1000)} srcSet={`${sized(PHOTO.boat, 500)} 500w, ${sized(PHOTO.boat, 750)} 750w, ${sized(PHOTO.boat, 1000)} 844w`}
            sizes="(min-width: 1024px) 42vw, 100vw" width={844} height={844} fetchPriority="high" decoding="async"
            alt="Our 24 ft Key West center console under way off Abaco, two aboard, T-top up and rods in the holders"
            style={{ transform: `scale(${zoom})` }}
          />
        </figure>
      </div>
      <div className="hero__rate wrap">
        <div className="hero__dial">
          <p className="hero__ask" id="ask">How long are you staying? <span>The longer you float, the more you save.</span></p>
          <DayRuler />
        </div>
        <div className="hero__result">
          <p className="hero__price">
            <span className="sr-only">{money(rate)} a day</span>
            <span className="hero__figure" aria-hidden="true"><i>$</i><Roll value={rate} /></span>
            <span className="hero__per" aria-hidden="true">a day</span>
          </p>
          <div className="hero__step"><DayStepper compact /></div>
          <p className="hero__total num" aria-live="polite">{dayWord(days)} on the water: {money(boat)} plus VAT</p>
          <BookButton />
        </div>
      </div>
    </section>
  )
}

const SPEC: [string, string][] = [
  ["Seats", "Eight, comfortably"],
  ["Helm", "Center console, shaded"],
  ["Power", "Single 250 hp engine"],
  ["Finding your way", "Garmin GPS, current Abaco maps"],
  ["Cooler", "Under the helm seat"],
  ["Safety", "All required gear on board"],
]

function Boat() {
  return (
    <section className="boat wrap" id="boat" aria-labelledby="boat-title">
      <div className="boat__say">
        <h2 id="boat-title" className="h-xl">Every rental is the same 24&nbsp;ft Key&nbsp;West.</h2>
        <p className="lede">We searched a long time for the right rental boat and landed on the Key West 239 FS. Newer hulls, serviced regularly, all identical. There is nothing to compare and no lesser boat to end up with.</p>
        <blockquote className="aside-quote">
          <p>“We island hopped all over for multiple days and barely burned half a tank.”</p>
          <footer>A guest, in words published on abacoboatrental.com</footer>
        </blockquote>
      </div>
      <dl className="spec">
        {SPEC.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  )
}

function Dock() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, v => `${(v - 0.5) * -9}%`)
  return (
    <section className="dock" ref={ref} aria-labelledby="dock-title">
      <motion.img
        className="dock__img" style={{ y }}
        src={sized(PHOTO.dock, 1500)} srcSet={`${sized(PHOTO.dock, 750)} 750w, ${sized(PHOTO.dock, 1500)} 1500w, ${sized(PHOTO.dock, 2500)} 2000w`} sizes="100vw"
        width={2000} height={2666} loading="lazy" decoding="async" alt="A long dock seen from straight above, reaching out over clear turquoise water"
      />
      <div className="dock__say wrap">
        <h2 id="dock-title" className="dock__title">First time in the Abacos? We bring the boat to your&nbsp;dock.</h2>
      </div>
    </section>
  )
}

const WORDS = [
  "Boat was fantastic for the sea of Abaco. We had 6 adults and 2 kids and it worked out perfectly for us with comfortable seating for everyone.",
  "It was perfectly equipped to cruise down to Little Harbour, up to Great Guana Cay, and anchoring off of Tiloo beach and Fowl Cay.",
  "The boat ran great, the fuel was topped off, and they even dropped it off for me upon our arrival!",
]

function Guests() {
  const [i, setI] = useState(0)
  const go = (d: number) => setI(n => (n + d + WORDS.length) % WORDS.length)
  return (
    <section className="guests" aria-labelledby="guests-title">
      <LivingWater
        className="guests__photo" focus="50% 52%"
        src={sized(PHOTO.turtle, 1500)} texture={sized(PHOTO.turtle, 1500)}
        srcSet={`${sized(PHOTO.turtle, 750)} 750w, ${sized(PHOTO.turtle, 1500)} 1500w, ${sized(PHOTO.turtle, 2500)} 2500w`} sizes="100vw"
        alt="A sea turtle gliding over rippled white sand in clear shallow water"
      />
      <div className="guests__say wrap">
        <h2 id="guests-title" className="guests__title">What guests wrote after their&nbsp;week</h2>
        <div className="guests__stage" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease }}>
              <p>“{WORDS[i]}”</p>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="guests__nav">
          <button type="button" aria-label="Previous guest note" onClick={() => go(-1)}><ArrowLeft size={20} strokeWidth={2} aria-hidden="true" /></button>
          <span className="num" aria-hidden="true">{i + 1} / {WORDS.length}</span>
          <button type="button" aria-label="Next guest note" onClick={() => go(1)}><ArrowRight size={20} strokeWidth={2} aria-hidden="true" /></button>
          <span className="guests__src">Unnamed guest notes, exactly as published on abacoboatrental.com</span>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <a className="skip" href="#price">Skip to rates and delivery</a>
      <Toolbar here="home" />
      <main>
        <Hero />
        <Boat />
        <Dock />
        <Planner />
        <Guests />
      </main>
      <Closing />
      <TripTab />
    </>
  )
}
mount(<Home />)
