import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Builder } from "./Planner"
import { Page, mount, Reveal, Head, ease, reveal, BOOK, IMG, WA_LABEL, wa } from "./site"

const SPECS = [["Boat", "24 ft Key West"], ["Seats", "8, comfortably"], ["Power", "Single 250 hp"], ["From", "$303/day"]]

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 60])
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-120px)] max-w-[1440px] lg:grid-cols-12">
        <div className="flex flex-col justify-center px-5 pt-10 pb-10 md:px-10 lg:col-span-6 lg:py-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-sea">Abaco Boat Rental · Man-O-War Cay</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.4rem,5.4vw,5.4rem)] leading-[1.0] font-medium tracking-[-0.045em]">
            {["Your own boat", "on the Sea", "of Abaco."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i === 2 ? "text-sea" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-7 max-w-md text-[18px] leading-relaxed text-ink/80">One boat, done right: a 24 ft Key West center console, picked up free at Man-O-War Cay or delivered to your cay.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }} className="mt-8 flex flex-col gap-2 sm:flex-row">
            <a href={BOOK} className="inline-flex min-h-13 items-center justify-center gap-1.5 rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check availability &amp; book <ArrowUpRight className="size-4" aria-hidden /></a>
            <a href="#delivery" className="inline-flex min-h-13 items-center justify-center rounded-full border border-ink/20 px-6 py-3.5 transition hover:-translate-y-px hover:border-ink">Price my trip</a>
          </motion.div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-4">
            {SPECS.map(([k, v], i) => <motion.div key={k} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.07, duration: 0.6, ease }} className="bg-paper p-4"><dt className="label !text-[10.5px] text-muted">{k}</dt><dd className="mt-1 font-display text-[1.05rem] font-medium">{v}</dd></motion.div>)}
          </dl>
        </div>
        <motion.div className="relative min-h-[48svh] overflow-hidden bg-[#7fb9c2] lg:col-span-6 lg:min-h-0 lg:rounded-bl-[48px]" initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.2, duration: 1.3, ease: reveal }}>
          <motion.img style={{ y }} src={`${IMG}b401ff69-86a6-489f-8c4c-714b9b292c18/Abaco-Boat-Rental-17.jpg`} alt="The 24 ft Key West center console on the Sea of Abaco" width={1400} height={1600} fetchPriority="high" className="absolute inset-0 h-[calc(100%+60px)] w-full -translate-y-[60px] object-cover" />
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["WhatsApp", WA_LABEL, wa("Hi Abaco Boat Rental!")], ["Base", "Man-O-War Cay, free pickup", "#delivery"], ["Hours", "9 to 5 daily, Nov 1 to Aug 15", "#contact"], ["Booking", "Live availability online", BOOK]]
  return (
    <section className="bg-sea-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h], i) => (
          <li key={k} className="border-b border-paper/15 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="label text-aqua">{k}</span>
              <span className={`mt-2 block font-display font-medium ${i === 0 ? "whitespace-nowrap text-[clamp(1.3rem,1.9vw,1.8rem)]" : "text-[1.1rem] leading-snug"}`}>{v}</span>
              <span className="mt-4 block h-[2px] w-0 bg-aqua transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Boat() {
  const kit = [["Garmin GPS", "Loaded with current Abaco maps."], ["Shade", "A center console with shade."], ["Cooler", "Under the helm seat: drinks, lunch, or ice and your catch."], ["Safety gear", "All of it, on board."], ["Newer hulls", "Regularly serviced, ready to roll."]]
  return (
    <section id="boat" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="boat-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="01" label="The boat" id="boat-title" title={<>Every rental is the same boat. That's the point.</>}><p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">The team searched a long time for the right rental boat and landed on the Key West 239 FS. Seating for 8, a single 250 hp engine, and newer hulls kept in top condition.</p></Head>
          <ul className="mt-10 border-t border-line">{kit.map(([t, d]) => <li key={t} className="group grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-4"><span className="font-display text-[1rem] font-medium transition group-hover:translate-x-1">{t}</span><span className="text-[16px] text-muted">{d}</span></li>)}</ul>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
          <Reveal className="col-span-2 overflow-hidden rounded-[20px]"><img src={`${IMG}c0d4c408-6d5e-4e99-acf9-957f8e218cae/Abaco-Boat-Rental-5.jpg`} alt="Guests aboard the Key West rental boat" width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full bg-[#7fb9c2] object-cover transition duration-700 hover:scale-[1.02]" /></Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-[20px]"><img src={`${IMG}c7407fb4-beaa-4728-be74-6cd9c117b83e/Abaco-Boat-Rental-6.jpg`} alt="The rental boat at the dock" width={600} height={600} loading="lazy" className="aspect-square w-full bg-[#7fb9c2] object-cover transition duration-700 hover:scale-[1.03]" /></Reveal>
          <Reveal delay={0.15} className="overflow-hidden rounded-[20px]"><img src={`${IMG}d528242a-93ae-4ef9-abe7-5e95516dcac0/Abaco-Boat-Rental-15.jpg`} alt="Clear water from the boat" width={600} height={600} loading="lazy" className="aspect-square w-full bg-[#7fb9c2] object-cover transition duration-700 hover:scale-[1.03]" /></Reveal>
        </div>
      </div>
    </section>
  )
}

function Delivery() {
  return (
    <section id="delivery" className="bg-paper-2" aria-labelledby="del-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7"><Head index="02" label="Delivery and price" id="del-title" title={<>Tap your cay. See your total.</>} /></div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[18px] leading-relaxed text-muted">Pickup at Man-O-War Cay is free. Pick where you are staying, how many days and any extras, and send the plan on WhatsApp or book it online.</p></Reveal>
        </div>
        <div className="mt-14"><Builder /></div>
      </div>
    </section>
  )
}

function Steps() {
  const s = [["Pick your dates", "Choose pickup and return times and see exactly what's available. Rentals run on a 24-hour period."], ["Choose delivery", "Free pickup at Man-O-War Cay, or delivery to you."], ["Get on the water", "Confirm, pay on the day, and you're set. No phone tag required."]]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="steps-title">
      <Head index="03" label="Booking" id="steps-title" title={<>Three steps, no phone tag.</>} />
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {s.map(([t, d], i) => <Reveal key={t} delay={i * 0.08}><li className="h-full border-t-2 border-ink pt-6"><span className="font-display text-[3rem] leading-none font-medium text-sea">{i + 1}</span><p className="mt-4 font-display text-[1.25rem] font-medium">{t}</p><p className="mt-2 max-w-sm text-[16px] text-muted">{d}</p></li></Reveal>)}
      </ol>
      <Reveal delay={0.2}><a href={BOOK} className="mt-10 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-ink px-7 font-semibold text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check availability &amp; book <ArrowUpRight className="size-4" aria-hidden /></a></Reveal>
    </section>
  )
}

function Words() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper" aria-labelledby="words-title">
      <img src={`${IMG}ff935fdc-b7e5-4224-90a9-425dc457ec18/Abaco-Boat-Rental-1.jpg`} alt="" aria-hidden width={1600} height={900} loading="lazy" className="absolute inset-y-0 right-0 hidden h-full w-[40%] object-cover lg:block" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="lg:w-[56%]">
          <Head dark index="04" label="From guests, as published on the current site" id="words-title" title={<>"Boat was fantastic for the sea of Abaco."</>} />
          <Reveal delay={0.1}><p className="mt-6 text-[19px] leading-relaxed text-paper/80">"We had 6 adults and 2 kids and it worked out perfectly for us with comfortable seating for everyone."</p></Reveal>
          <Reveal delay={0.15}><p className="mt-6 text-[19px] leading-relaxed text-paper/80">"It was perfectly equipped to cruise down to Little Harbour, up to Great Guana Cay, and anchoring off of Tiloo beach and Fowl Cay."</p></Reveal>
        </div>
      </div>
    </section>
  )
}

const FAQ = [
  ["What kind of boat will I get?", "All boats are identical: 24 ft Key Wests with seating for 8, a center console and a single 250 hp engine."],
  ["How long is a rental?", "Rentals run on a 24-hour period. Pick a return time earlier than your pickup time so you aren't charged an extra day."],
  ["How do I get my boat?", "Free pickup at Man-O-War Cay. Delivery is $100 each way to Elbow Cay, Hope Town, Guana Cay, Scotland Cay or Marsh Harbour, and $300 each way to Treasure Cay or Little Harbour. Elbow Cay and Marsh Harbour are free if you return the team member to Man-O-War."],
  ["Can I book online?", "Yes, it's the fastest way. Live availability is on the booking page."],
  ["When are you open?", "9am to 5pm every day, November 1 to August 15."],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="05" label="Good to know" id="faq-title" title={<>Before you book.</>}><a href={wa("Hi Abaco Boat Rental, I have a question:")} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-5 transition hover:-translate-y-px hover:border-ink"><MessageCircle className="size-4" aria-hidden />Ask on WhatsApp</a></Head></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.1rem] font-medium hover:no-underline md:text-[1.25rem]">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Boat /><Delivery /><Steps /><Words /><Questions /></Page>)
