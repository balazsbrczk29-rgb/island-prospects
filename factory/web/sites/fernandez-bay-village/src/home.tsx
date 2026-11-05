import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, BOOK, PHONE, TEL, WA_LINK, WA_DISPLAY } from "./site"
import { PartyPlanner, MealCounter, EnquirySection, Faq } from "./parts"

const FAQ: [string, string][] = [
  ["How do I get to Fernandez Bay Village?", "Fly into New Bight Airport (MYCB) on Cat Island, five minutes from the resort. Makers Air flies from Fort Lauderdale Executive (FXE), with a 10% discount for resort guests; Western Air flies from Nassau three times a week, about thirty minutes."],
  ["Can I fly my own plane in?", "Yes. New Bight's runway is 5,000 feet and paved, operating under visual flight rules, with customs available 9:00am to 5:00pm. Private and commercial airline pilots get 15% off with the promo code PILOT."],
  ["Which cottages suit a family?", "Coconut Palm adjoins Royal Palm, and Traveler's Palm adjoins Tamarind Suite, so each pair works as one suite. For larger groups, the Manor House has four bedrooms and the Beach House two."],
  ["What does dining cost?", "Hot breakfast is $20 and continental $10. Lunch runs $8 to $18 a person. Dinner is $48 a person a night: appetizers, a meat and a seafood, sides, dessert, coffee and a beach bonfire."],
  ["Is there WiFi?", "Complimentary WiFi is available in the Clubhouse area."],
]

function Hero() {
  return (
    <section className="px-3 pt-3 md:px-5 md:pt-5" aria-labelledby="hero-title">
      <motion.div className="relative h-[44svh] min-h-[300px] overflow-hidden rounded-[6px] md:h-[56svh]" initial={{ clipPath: "inset(6% 6% 6% 6% round 6px)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 6px)" }} transition={{ duration: 1.4, ease: reveal }}>
        <motion.img src={`${IMG.hero}?format=2500w`} alt="The beach at Fernandez Bay Village, Cat Island" width={2500} height={1667} fetchPriority="high" className="size-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} />
      </motion.div>
      <div className="mx-auto max-w-[1440px] px-2 md:px-5">
        <div className="relative -mt-10 grid gap-8 rounded-t-[6px] bg-paper pt-7 md:-mt-16 md:pt-10 lg:grid-cols-12 lg:pr-0">
          <h1 id="hero-title" className="lg:col-span-8">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="label block text-casuarina">Fernandez Bay Village · Cat Island, Bahamas</motion.span>
            <span className="mt-4 block font-display text-[clamp(3rem,7.4vw,7rem)] font-light leading-[0.92] tracking-[-0.03em]">
              {["A beach view", "from every room."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.45 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
              ))}
            </span>
          </h1>
          <motion.div className="lg:col-span-4 lg:self-end lg:pb-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }}>
            <p className="max-w-sm text-[17px] leading-relaxed text-muted">A family-run village of beach cottages and two villas in the hollow of Fernandez Bay, five minutes from New Bight airport.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={BOOK} className="btn btn-primary">Check availability</a>
              <a href={WA_LINK} className="btn btn-quiet"><MessageCircle className="size-4" aria-hidden /> Ask on WhatsApp</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Fly into", "New Bight (MYCB), 5 min away", "getting-here.html"],
    ["Front desk", PHONE, TEL],
    ["WhatsApp", WA_DISPLAY, WA_LINK],
    ["Stay", "8 cottages, 2 villas", "stay.html"],
    ["Pilots", "15% off, code PILOT", "getting-here.html#pilots"],
  ]
  return (
    <section className="mt-16 bg-casuarina text-paper md:mt-24" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-white/5 md:px-8 md:py-8">
              <span className="label text-shallows">{k}</span>
              <span className="mt-2 block font-display text-[1.4rem] leading-tight">{v}</span>
              <span className="mt-3 block h-px w-0 bg-shallows transition-all duration-500 group-hover:w-10" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44" aria-labelledby="story-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Label n="01" className="text-casuarina">The bay</Label></Reveal>
          <Reveal delay={0.05}><h2 id="story-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-light leading-[1] tracking-[-0.02em]">A mile of white sand, <em>and very little else.</em></h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-muted">Fernandez Bay Village has been family run for decades. The cottages sit along a quiet, mile-long beach on Cat Island, with calm, clear water out front and a Clubhouse at the centre for coffee, dinner and the Tiki Bar. Days are barefoot: a chaise on your patio, a book, a float in the bay.</p>
          </Reveal>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <Photo src={IMG.relax} alt="Chaises facing the water at Fernandez Bay" className="aspect-[4/5] rounded-[4px] md:aspect-[5/6]" />
          <Photo src={IMG.shane} alt="Shane's Shack on the water's edge" className="absolute -bottom-12 -left-8 hidden aspect-[4/3] w-[48%] rounded-[4px] ring-[10px] ring-paper md:block" />
        </div>
      </div>
    </section>
  )
}

function Stay() {
  return (
    <section className="bg-paper-2" aria-labelledby="stay-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Label n="02" className="text-casuarina">Who's coming?</Label>
            <h2 id="stay-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">Find the cottage that fits your party.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-[17px] leading-relaxed text-muted">Eight cottages and two villas. Choose who is travelling and the ones that suit you come forward, adjoining pairs included.</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}><PartyPlanner /></Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          <a href="stay.html" className="btn btn-quiet">Every cottage and villa <ArrowUpRight className="size-4" aria-hidden /></a>
          <a href={BOOK} className="btn btn-primary">Check availability</a>
        </div>
      </div>
    </section>
  )
}

const DAY = [
  { t: "Morning", h: "Breakfast at the Clubhouse", p: "Hot or continental, sweet and savory, on the patio over the bay. Coffee is complimentary.", img: IMG.breakfast, alt: "Breakfast at Fernandez Bay Village" },
  { t: "Mid-morning", h: "Paddle to the Boiling Hole", p: "Wide, stable kayaks and paddleboards in calm water. The front desk hands out maps through the creek to a blue hole with an attitude.", img: IMG.kayaks, alt: "Kayaks and paddleboards on Fernandez Bay" },
  { t: "Midday", h: "Conch burgers and fritters", p: "Grilled fish, sandwiches and salads, or take the 13 ft Whaler out with a picnic and snorkel around the cays.", img: IMG.burger, alt: "Lunch at Fernandez Bay Village" },
  { t: "Afternoon", h: "The island, or nothing at all", p: "Drive the Queen's Highway to The Hermitage, go shelling and sea-glassing, or book a massage by the sea.", img: IMG.tour, alt: "Touring Cat Island" },
  { t: "Sundown", h: "The Tiki Bar, on the beach", p: "Order anything; if you would rather stay on your chaise, they bring it to you.", img: IMG.tiki, alt: "The Tiki Bar on the beach at Fernandez Bay Village" },
  { t: "Night", h: "Dinner, then the bonfire", p: "Appetizers, a meat and a seafood, sides, dessert and coffee, then a fire on the sand.", img: IMG.mahi, alt: "Dinner at Fernandez Bay Village" },
]

function Days() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 70%"] })
  const draw = useTransform(scrollYProgress, [0, 1], [0.02, 1])
  const angle = useTransform(scrollYProgress, [0, 1], [Math.PI, 0])
  const cx = useTransform(angle, a => 150 + 120 * Math.cos(a))
  const cy = useTransform(angle, a => 140 - 120 * Math.sin(a))
  const label = useTransform(scrollYProgress, p => DAY[Math.min(DAY.length - 1, Math.floor(p * DAY.length))].t)
  return (
    <section id="days" className="scroll-mt-20" aria-labelledby="days-title">
      <div ref={ref} className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Label n="03" className="text-casuarina">Days here</Label>
            <h2 id="days-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">One day in the bay, <em>sunrise to bonfire.</em></h2>
            <svg viewBox="0 0 300 150" className="mt-10 hidden w-full max-w-[340px] lg:block" aria-hidden>
              <line x1="0" y1="140" x2="300" y2="140" stroke="var(--color-line)" />
              <path d="M30 140 A120 120 0 0 1 270 140" fill="none" stroke="var(--color-line)" strokeDasharray="2 5" />
              <motion.path d="M30 140 A120 120 0 0 1 270 140" fill="none" stroke="var(--color-casuarina)" strokeWidth="1.5" style={{ pathLength: draw }} />
              <motion.circle r="9" fill="var(--color-sand)" stroke="var(--color-ink)" strokeWidth="1" cx={cx} cy={cy} />
            </svg>
            <motion.p className="label mt-4 hidden text-muted lg:block">{label}</motion.p>
          </div>
        </div>
        <ol className="space-y-20 lg:col-span-7 lg:col-start-6 md:space-y-28">
          {DAY.map((d, i) => (
            <li key={d.t} className={`grid gap-6 md:grid-cols-2 md:items-end ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Photo src={d.img} alt={d.alt} className="aspect-[4/5] rounded-[4px]" />
              <Reveal>
                <p className="label text-casuarina">{String(i + 1).padStart(2, "0")} · {d.t}</p>
                <h3 className="mt-3 font-display text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight">{d.h}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{d.p}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Dining() {
  return (
    <section id="dining" className="scroll-mt-20 bg-shallows/45" aria-labelledby="dining-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label n="04" className="text-casuarina">Dining</Label>
            <h2 id="dining-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">Dinner is handled. <em>Here is what it costs.</em></h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Indoor and seaside dining at the Clubhouse, always fresh. Choose the meals you want each day and see the total for your stay.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <Photo src={IMG.diningRoom} alt="The dining room at Fernandez Bay Village" className="aspect-[16/10] rounded-[4px]" />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-12"><MealCounter /></Reveal>
      </div>
    </section>
  )
}

function GettingHere() {
  const routes = [
    ["From Fort Lauderdale", "Makers Air, FXE to New Bight (MYCB). 10% off for resort guests."],
    ["From Nassau", "Western Air, three times a week, about thirty minutes."],
    ["In your own plane", "5,000 ft paved runway, VFR, customs 9:00am to 5:00pm."],
  ]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="gh-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="05" className="text-casuarina">Getting here</Label>
          <h2 id="gh-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[0.98] tracking-[-0.02em]">Worth the journey, <em>and it is a short one.</em></h2>
          <a href="getting-here.html" className="btn btn-quiet mt-8">Plan the flight <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
        <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
          {routes.map(([h, p], i) => (
            <Reveal key={h} delay={i * 0.06}>
              <li className="group grid gap-2 border-b border-line py-7 md:grid-cols-[3rem_1fr_1.4fr] md:items-baseline">
                <span className="label tabular-nums text-muted">0{i + 1}</span>
                <a href="getting-here.html" className="font-display text-[1.7rem] leading-tight transition group-hover:translate-x-1 group-hover:text-casuarina">{h}</a>
                <p className="text-[16px] text-muted">{p}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section className="border-t border-line" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label n="07" className="text-casuarina">Questions</Label>
          <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[0.98] tracking-[-0.02em]">Before you pack.</h2>
          <div className="mt-10"><Faq items={FAQ} /></div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-2">
            <iframe title="Map: Fernandez Bay Village, Cat Island" loading="lazy" className="size-full border-0" src="https://www.google.com/maps?q=Fernandez%20Bay%20Village%2C%20Cat%20Island%2C%20Bahamas&output=embed" />
          </div>
          <p className="mt-6 text-[15px] text-muted">Fernandez Bay, near New Bight, Cat Island, The Bahamas. Five minutes by road from New Bight Airport.</p>
        </div>
      </div>
    </section>
  )
}

mount(
  <Page current="Home">
    <Hero />
    <KeyBand />
    <Story />
    <Stay />
    <Days />
    <Dining />
    <GettingHere />
    <EnquirySection />
    <Questions />
  </Page>
)
