import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, DINNER, EMAIL } from "./site"
import { VILLAS, RateCalculator, SunsetClock, MenuExplorer, EnquirySection, Faq } from "./parts"

const FAQ: [string, string][] = [
  ["How do I get to Firefly Sunset Resort?", "Fly into Marsh Harbour, Abaco, take a 15-minute taxi to the Albury's or G&L ferry dock, then a 20-minute ferry to Hope Town on Elbow Cay. The resort shuttle meets you at the dock in Hope Town harbour."],
  ["How do I book a villa?", "Check your dates, then email info@fireflysunsetresort.com with the villa name, dates and number of guests. The form on this page writes that email for you."],
  ["What do the villas cost?", "In season (February to August, three-night minimum) from $800 a night for Firefly, Dragonfly and Butterfly, $1,125 for Mint To Be and $1,500 for Java Rum. Off season (September to January) from $665. Rates exclude 10% VAT; weekly rates are lower."],
  ["Is the restaurant open to non-guests?", "Yes. The Firefly Bar & Grill is open to locals and visitors seven days a week for breakfast, lunch and dinner. Reserve dinner on Tablein; parties of 12 or more must call."],
  ["Are pets welcome?", "Yes, the resort is pet friendly. Tell the front desk in advance for the pet policy, and apply for a Bahamas import permit from the Ministry of Agriculture before you travel."],
  ["How do we get around Elbow Cay?", "By golf cart. The concierge arranges a cart delivered to your villa, and boat rentals that meet you in Marsh Harbour or at the resort dock. Drive on the left."],
]

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[calc(100svh-125px)] lg:grid-cols-12">
        <div className="flex flex-col justify-between px-5 pt-10 pb-10 md:px-10 lg:col-span-5 lg:pt-16">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-sea">Hope Town · Elbow Cay · Abaco</motion.p>
            <h1 id="hero-title" className="mt-6 font-display leading-[0.92]">
              <span className="sr-only">Firefly Sunset Resort, Hope Town, Elbow Cay: </span>
              {["Get your glow", "on the Sea", "of Abaco."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className="block text-[clamp(3.4rem,6.6vw,6.6rem)]" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-md text-[17px] leading-relaxed text-muted">Five villas on Elbow Cay with a private beach, two pools, a reef to snorkel off the dock and the Firefly Bar &amp; Grill, open seven days.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.9 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#enquire" className="btn btn-primary">Request a villa</a>
              <a href={DINNER} className="btn btn-quiet">Reserve dinner <ArrowUpRight className="size-4" aria-hidden /></a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease }} className="mt-12 border-t border-line pt-6"><SunsetClock /></motion.div>
        </div>
        <motion.div className="relative h-[60svh] min-h-[360px] lg:col-span-7 lg:h-auto" initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.2, duration: 1.4, ease: reveal }}>
          <motion.img src={IMG.plunge} alt="Plunge pool overlooking the Sea of Abaco at Firefly Sunset Resort" width={1920} height={1280} fetchPriority="high" className="absolute inset-0 size-full object-cover" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }} />
        </motion.div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Where", "Hope Town, Elbow Cay", "#getting-here"],
    ["Stay", "Five villas, 2 to 3 bedrooms", "villas.html"],
    ["Bar & Grill", "Daily, 8:00am to 9:00pm", "restaurant.html"],
    ["Villa rates", "From $665 a night", "#rates"],
    ["Reach us", EMAIL, `mailto:${EMAIL}`],
  ]
  return (
    <section className="bg-sea text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-white/5 md:px-8 md:py-8">
              <span className="label text-glow">{k}</span>
              <span className={`mt-2 block leading-tight ${i === 4 ? "break-all text-[15px]" : "font-display text-[1.55rem]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-glow transition-all duration-500 group-hover:w-10" aria-hidden />
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
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Label n="01" className="text-sea">Our story</Label></Reveal>
          <Reveal delay={0.05}><h2 id="story-title" className="mt-5 font-display text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.98]">Opened in 2011. Rebuilt after Dorian.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-muted">Firefly opened quietly in late 2010 and celebrated its grand opening in 2011. On September 1, 2019, Hurricane Dorian hit Hope Town with sustained winds of 185 mph; the resort lost two villas and its dock, bar and dining deck. The dock, the outside bar and the dining deck have been rebuilt, and power is back.</p>
            <p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-muted">Today General Manager Tom Hazel and his team run five villas, a Bar &amp; Grill and a boutique, and many guests book their next stay before they check out.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-6 gap-3 self-center lg:col-span-6 lg:col-start-7">
          <Photo src={IMG.g001} alt="Firefly Sunset Resort, Hope Town" className="col-span-4 aspect-[4/3] rounded-[4px]" />
          <Photo src={IMG.g014} alt="Firefly Sunset Resort, Hope Town" className="col-span-2 aspect-[3/4] self-end rounded-[4px]" />
          <Photo src={IMG.g018} alt="Firefly Sunset Resort, Hope Town" className="col-span-3 col-start-2 aspect-[4/3] rounded-[4px]" />
          <Photo src={IMG.g029} alt="Firefly Sunset Resort, Hope Town" className="col-span-2 aspect-square rounded-[4px]" />
        </div>
      </div>
    </section>
  )
}

function Villas() {
  return (
    <section className="bg-paper-2" aria-labelledby="villas-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Label n="02" className="text-sea">The villas</Label>
            <h2 id="villas-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Five villas, each named for something that glows or flies.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[17px] leading-relaxed text-muted">Contemporary island comfort, two or three bedrooms each, and views over the Sea of Abaco toward the sunset.</p>
          </Reveal>
        </div>
        <ul className="mt-14 border-t border-ink/15">
          {VILLAS.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.05}>
              <li>
                <a href={`villas.html#${v.id}`} className="group grid gap-2 border-b border-ink/15 py-7 transition md:grid-cols-[4rem_1fr_12rem_10rem] md:items-baseline">
                  <span className="label tabular-nums text-muted">0{i + 1}</span>
                  <span className="flex items-center gap-4 font-display text-[clamp(2rem,4vw,3.6rem)] leading-none transition group-hover:translate-x-2">
                    {v.name}
                    <span className="size-2.5 rounded-full bg-glow opacity-0 shadow-[0_0_14px_4px_rgba(242,213,122,.8)] transition group-hover:opacity-100" aria-hidden />
                  </span>
                  <span className="text-[15px] text-muted">{v.beds}</span>
                  <span className="text-[15px] md:text-right">from {v.offS[0].toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} a night</span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
        <a href="villas.html" className="btn btn-quiet mt-10">Every villa and the property map <ArrowUpRight className="size-4" aria-hidden /></a>
      </div>
    </section>
  )
}

function Rates() {
  return (
    <section id="rates" className="scroll-mt-20 mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="rates-title">
      <div className="mb-12 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Label n="03" className="text-sea">Rates</Label>
          <h2 id="rates-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">The real price, VAT included.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-[17px] leading-relaxed text-muted">Pick a villa, the month you arrive and how long you stay. The total uses the resort's published daily and weekly rates and adds the 10% VAT.</p>
        </Reveal>
      </div>
      <Reveal delay={0.1}><RateCalculator /></Reveal>
    </section>
  )
}

function Resort() {
  const items = [
    ["Private beach", "White sand with chairs and umbrellas, steps from the villas"],
    ["Two pools", "The upper pool is for villa guests only"],
    ["A reef off the dock", "A man-made reef for snorkelling: stingrays, turtles, even sharks"],
    ["Kayaks", "Complimentary for guests, to explore the Sea of Abaco"],
    ["Dock slips", "Bring your rental boat right to the resort"],
    ["Corn hole", "On the beach, best played as the sun goes down"],
  ]
  return (
    <section id="resort" className="fireflies relative scroll-mt-20 overflow-hidden bg-dusk text-paper" aria-labelledby="resort-title">
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Label n="04" className="text-glow">The resort</Label>
            <h2 id="resort-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">A beach, a reef and a concierge who books the rest.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/75">From the moment you book, the team lines up your golf cart and boat, fishing and sailing charters, scuba, conch pulling and island tours, and can stock the villa with groceries before you land. Pets are welcome.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-[4px] border border-paper/15 bg-white/5 p-6 backdrop-blur"><SunsetClock tone="dark" /></Reveal>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {items.map(([k, v], i) => (
            <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.08, duration: 0.8, ease }} className="border-t border-paper/15 py-6">
              <p className="font-display text-[1.9rem] leading-tight">{k}</p>
              <p className="mt-1 text-[15px] text-paper/70">{v}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Grill() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="grill-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Label n="05" className="text-sea">Firefly Bar &amp; Grill</Label>
            <h2 id="grill-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Conch fritters at lunch, filet at sunset.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">Open to everyone on Elbow Cay, seven days a week. Breakfast needs no reservation; book dinner online.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={DINNER} className="btn btn-primary">Reserve dinner</a>
              <a href="restaurant.html" className="btn btn-quiet">Full menus <ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
          </Reveal>
          <Photo src={IMG.dining} alt="Inside dining at the Firefly Bar & Grill" className="mt-10 aspect-[4/3] rounded-[4px]" />
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><MenuExplorer compact /></Reveal>
      </div>
    </section>
  )
}

function GettingHere() {
  const steps = [
    ["Fly to Marsh Harbour", "Commercial or private, into Abaco. Abaco is under 180 miles east of Florida."],
    ["Taxi to the ferry", "About 15 minutes to the Albury's or G&L ferry dock."],
    ["Ferry to Hope Town", "About 20 minutes across to Elbow Cay."],
    ["The resort shuttle", "Waiting at the dock in Hope Town harbour to take you to your villa."],
  ]
  return (
    <section id="getting-here" className="scroll-mt-20 border-t border-line" aria-labelledby="gh-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <Label n="06" className="text-sea">Getting here</Label>
          <h2 id="gh-title" className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Four easy steps from the runway to your deck.</h2>
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-line md:grid-cols-4">
          {steps.map(([h, p], i) => (
            <motion.li key={h} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="bg-paper p-6 md:p-8">
              <p className="font-display text-[3.4rem] leading-none text-sea">{i + 1}</p>
              <p className="mt-6 text-[18px] font-medium">{h}</p>
              <p className="mt-2 text-[15px] text-muted">{p}</p>
            </motion.li>
          ))}
        </ol>
        <p className="mt-6 text-[15px] text-muted">Renting a boat for the week? Many rental companies will meet you in Marsh Harbour; the concierge can arrange it.</p>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section className="border-t border-line" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Label n="08" className="text-sea">Questions</Label>
          <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.98]">Good to know.</h2>
          <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-2">
            <iframe title="Map: Firefly Sunset Resort, Hope Town, Elbow Cay" loading="lazy" className="size-full border-0" src="https://www.google.com/maps?q=Firefly%20Sunset%20Resort%2C%20Hope%20Town%2C%20Elbow%20Cay%2C%20Bahamas&output=embed" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6"><Faq items={FAQ} /></div>
      </div>
    </section>
  )
}

mount(
  <Page current="Home">
    <Hero />
    <KeyBand />
    <Story />
    <Villas />
    <Rates />
    <Resort />
    <Grill />
    <GettingHere />
    <EnquirySection n="07" />
    <Questions />
  </Page>
)
