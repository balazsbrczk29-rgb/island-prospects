import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, BOOK, PHONE, TEL } from "./site"
import { RoomFinder, SpecialsFinder, EnquirySection, Faq } from "./parts"

const FAQ: [string, string][] = [
  ["How far is Hideaways from Exuma International Airport?", "About a fifteen-minute drive. Ask your reservation representative to pre-arrange a taxi, or pick up a rental car at the airport (book ahead)."],
  ["Which airlines fly to Exuma?", "Exuma International has flights from Nassau, Miami, Fort Lauderdale, Toronto and Atlanta on Bahamasair, Western Air, American Airlines, Air Canada and Delta."],
  ["Is there a restaurant?", "Yes. Splash! Bar & Grill is on the beach, serving breakfast 8 to 10am, lunch 11am to 5pm and dinner 6 to 9pm, with take-out to your cottage or villa."],
  ["Are the water toys really free?", "Yes, water toys are complimentary for guests, and the beach and calm water are right outside."],
  ["Can I bring my pet?", "Pets are not allowed at Hideaways."],
]

function Hero() {
  const cards = [
    { src: IMG.og, alt: "Hillside villa view over Elizabeth Harbour at Hideaways", cls: "left-0 top-0 w-[62%] aspect-[4/3] z-10", d: 0.35 },
    { src: IMG.cottageOV, alt: "Ocean View Cottage at Hideaways at Palm Bay", cls: "right-0 top-[18%] w-[46%] aspect-[3/4] z-20", d: 0.5 },
    { src: IMG.splash, alt: "Splash! Bar & Grill on the beach at Hideaways", cls: "left-[14%] bottom-0 w-[44%] aspect-[4/3] z-30", d: 0.65 },
  ]
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-10 pb-16 md:px-10 lg:min-h-[calc(100svh-125px)] lg:grid-cols-12 lg:items-center lg:pt-6">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-deep">George Town · Exuma · On Elizabeth Harbour</motion.p>
          <h1 id="hero-title" className="mt-6 font-display leading-[0.9] tracking-[-0.02em]">
            <span className="sr-only">Hideaways at Palm Bay, beach resort in George Town, Exuma: </span>
            {["Leave the world", "behind. Come", "hideaway."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block text-[clamp(3.4rem,7vw,7.2rem)] ${i === 2 ? "italic text-deep" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-lg text-[18px] leading-relaxed text-muted">Beachfront cottages and hillside villas on a private white-sand beach in George Town, with a pool, free water toys and Splash! Bar &amp; Grill on the sand. Fifteen minutes from the airport.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.9 }} className="mt-8 flex flex-wrap gap-3">
            <a href={BOOK} className="btn btn-primary">Check availability</a>
            <a href="#specials" className="btn btn-quiet">Find my special <ArrowUpRight className="size-4" aria-hidden /></a>
          </motion.div>
        </div>
        <div className="relative h-[440px] sm:h-[560px] lg:col-span-6 lg:h-[620px]">
          {cards.map(c => (
            <motion.div key={c.src} className={`absolute overflow-hidden rounded-[12px] shadow-[0_30px_60px_-30px_rgba(14,42,51,.45)] ring-[6px] ring-paper ${c.cls}`} initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0 round 12px)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 12px)" }} transition={{ delay: c.d, duration: 1.2, ease: reveal }} whileHover={{ y: -4 }}>
              <img src={c.src} alt={c.alt} width={1280} height={960} fetchPriority={c.d < 0.4 ? "high" : "auto"} className="size-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Call reservations", PHONE, TEL],
    ["From the airport", "15 minutes by road", "#getting-here"],
    ["Stay", "Cottages and villas, studio to two bedrooms", "stay.html"],
    ["On the beach", "Splash! Bar & Grill", "exuma.html#splash"],
  ]
  return (
    <section className="bg-brand text-ink" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-ink/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-white/15 md:px-8 md:py-8">
              <span className="label text-ink/75">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i === 0 ? "text-[2rem] tabular-nums" : "text-[1.55rem]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-ink transition-all duration-500 group-hover:w-10" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40" aria-labelledby="story-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <Photo src={IMG.g1} alt="The beach at Hideaways at Palm Bay, Exuma" className="aspect-[4/3] rounded-[12px]" />
          <Photo src={IMG.g3} alt="Hideaways at Palm Bay, Exuma" className="absolute -right-6 -bottom-10 hidden aspect-square w-[40%] rounded-[12px] ring-[8px] ring-paper md:block" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal><Label n="1" className="text-deep">The beach</Label></Reveal>
          <Reveal delay={0.05}><h2 id="story-title" className="mt-5 font-display text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.98]">Your little slice of <em className="text-deep">Elizabeth Harbour.</em></h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-muted">Hideaways sits right on one of the private white-sand beaches of Elizabeth Harbour, with crystal clear, calm water out front. Borrow the water toys for free, splash in the pool, book a massage in your suite, and watch the sunset from your patio.</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-[15px]">
              {["Free WiFi throughout", "Free town shuttle", "Daily housekeeping", "Grocery delivery", "Pool, all year", "Tour desk and concierge"].map(x => <li key={x} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-brand" aria-hidden />{x}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Rooms() {
  return (
    <section className="border-t border-line" aria-labelledby="rooms-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Label n="2" className="text-deep">Rooms and villas</Label>
            <h2 id="rooms-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">On the sand, or up the hill with the view.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[17px] leading-relaxed text-muted">Eight room types, from a hillside studio to two-bedroom villas with full kitchens. Filter by where you want to wake up.</p>
          </Reveal>
        </div>
        <RoomFinder />
        <a href="stay.html" className="btn btn-quiet mt-12">Compare every room <ArrowUpRight className="size-4" aria-hidden /></a>
      </div>
    </section>
  )
}

function Specials() {
  return (
    <section id="specials" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="sp-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Label n="3" className="text-brand">Specials</Label>
            <h2 id="sp-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Only the offers that apply to you, <em className="text-brand">still open today.</em></h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[17px] leading-relaxed text-paper/75">Tell us where you live and how long you are staying. Copy the code and use it in the booking engine.</p>
          </Reveal>
        </div>
        <SpecialsFinder />
      </div>
    </section>
  )
}

function Splash() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="splash-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="4" className="text-deep">Splash! Bar &amp; Grill</Label>
          <h2 id="splash-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Sky Juice on the patio. Pool table inside.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">Waterfront and pool-front dining all day, Bahamian and seafood dishes, custom pizzas, six big screens and frequent live music. Take-out to your cottage, too.</p>
          <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
            {[["Breakfast", "8:00 to 10:00am"], ["Lunch", "11:00am to 5:00pm"], ["Dinner", "6:00 to 9:00pm"]].map(([k, v]) => <div key={k} className="flex justify-between py-3"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <a href="exuma.html#splash" className="btn btn-quiet mt-8">More about Splash <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
        <div className="grid grid-cols-5 gap-3 lg:col-span-6 lg:col-start-7">
          <Photo src={IMG.splashEnjoy} alt="Inside Splash! Bar & Grill" className="col-span-3 aspect-[4/5] rounded-[12px]" />
          <div className="col-span-2 grid gap-3">
            <Photo src={IMG.cocktails} alt="Tropical cocktails at Splash!" className="aspect-square rounded-[12px]" />
            <Photo src={IMG.splashPlay} alt="Games at Splash! Bar & Grill" className="aspect-square rounded-[12px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function GettingHere() {
  return (
    <section id="getting-here" className="scroll-mt-20 border-t border-line" aria-labelledby="gh-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Label n="5" className="text-deep">Getting here</Label>
            <h2 id="gh-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Land at Exuma International. Fifteen minutes later, sand.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">Flights from Nassau, Miami, Fort Lauderdale, Toronto and Atlanta on Bahamasair, Western Air, American, Air Canada and Delta. From Nassau, Western Air and Bahamasair connect throughout the day.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href={TEL} className="btn btn-quiet"><Phone className="size-4" aria-hidden /> Arrange a taxi</a></div>
          </Reveal>
          <div className="mt-12"><Faq items={FAQ} /></div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/5] overflow-hidden rounded-[12px] bg-paper-2 md:aspect-[4/3] lg:aspect-[4/5]">
            <iframe title="Map: Hideaways at Palm Bay, George Town, Exuma" loading="lazy" className="size-full border-0" src="https://www.google.com/maps?q=Hideaways%20at%20Palm%20Bay%2C%20Queens%20Highway%2C%20George%20Town%2C%20Exuma&output=embed" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

mount(
  <Page current="Home">
    <Hero />
    <KeyBand />
    <Story />
    <Rooms />
    <Specials />
    <Splash />
    <GettingHere />
    <EnquirySection n="6" />
  </Page>
)
