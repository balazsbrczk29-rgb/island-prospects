import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, MaskImg, ease, reveal, IMG, PHONE, TEL } from "./site"
import { DockCalculator, FactBand, RoomSelector, EnquirySection, Faq } from "./parts"

const FAQ: [string, string][] = [
  ["How do I reserve a slip at the Conch Inn Marina?", "Email info@conchinn.com with your boat type, boat name, LOA, beam, draft and arrival and departure dates, or call the office on 242-367-4000. The form on this page writes that email for you. The marina cannot guarantee a particular slip, but the office picks the best one for your boat."],
  ["What does dockage cost?", "$3.75 per foot for one night, $3.25 per foot a night for two nights or more, and $2.25 per foot for stays of 30 nights or more. Power is metered at $0.75 per kWh and water at $0.10 per gallon. Certain slips have a minimum length."],
  ["Can a catamaran fit?", "Yes. The marina lists catamarans up to 30 feet wide. For anything wider, call the office before you plan on a slip."],
  ["Is there fuel?", "The marina lists gasoline, diesel and ice. Ask the office for fuel dock times when you call or radio on VHF 16."],
  ["What are check-in and check-out times for the marina?", "Both are 12:00pm. Early check-in and late check-out depend on the season and need the Dock Master's approval."],
  ["How far is the airport?", "Leonard M. Thompson International Airport is about 3 miles from the inn. Restaurants, groceries, liquor stores and shops are within walking distance."],
]

function Hero() {
  return (
    <section className="relative flex min-h-[640px] flex-col lg:h-[calc(100svh-121px)]" aria-labelledby="hero-title">
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 md:px-10 md:pt-10">
        <div className="flex items-start justify-between text-muted">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label">Bay Street · Marsh Harbour · Abaco</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.15 }} className="label hidden md:block">Open since 1972 · VHF 16</motion.p>
        </div>
        <div className="mt-6 grid items-end gap-6 lg:grid-cols-12">
          <h1 id="hero-title" className="font-display leading-[0.86] tracking-[-0.035em] lg:col-span-8">
            <span className="sr-only">The Conch Inn &amp; Marina, Marsh Harbour, Abaco</span>
            {["Conch Inn", "& Marina"].map((l, i) => (
              <span key={l} aria-hidden className="block overflow-hidden pb-[0.08em]">
                <motion.span className={`block whitespace-nowrap ${i ? "pl-[0.6em] italic text-harbour" : ""} text-[clamp(3.6rem,10.6vw,10rem)]`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.15, ease: reveal }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div className="pb-4 lg:col-span-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }}>
            <p className="max-w-sm text-[17px] leading-relaxed">A family-run inn and 73-slip marina on the harbour front of Marsh Harbour, Abaco. Tie up, walk into town, sleep over the water.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#enquire" className="btn btn-primary">Request a slip</a>
              <a href="rooms.html" className="btn btn-quiet">Ask about a room <ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div className="relative mt-6 h-[52svh] min-h-[300px] flex-1 overflow-hidden lg:mt-8 lg:h-auto" initial={{ clipPath: "inset(12% 4% 0% 4%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ delay: 0.3, duration: 1.4, ease: reveal }}>
        <motion.img src={IMG.banner} alt="The Conch Inn & Marina on the harbour in Marsh Harbour, Abaco" width={1600} height={527} fetchPriority="high" className="size-full object-cover object-[50%_60%]" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease }} className="glass absolute right-4 bottom-4 left-4 rounded-[6px] p-4 sm:left-auto sm:w-[340px] md:right-10 md:bottom-8 md:p-5">
          <p className="label text-muted">Arriving by sea</p>
          <p className="mt-1 font-display text-[1.45rem] leading-tight">73 slips, catamarans to 30 ft beam</p>
          <a href={TEL} className="ulink mt-2 inline-flex items-center gap-2 text-[15px]"><Phone className="size-3.5" aria-hidden /> Office {PHONE} · VHF 16</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Dock office", PHONE, TEL],
    ["On the water", "VHF channel 16", "marina.html"],
    ["Dockage", "From $2.25 per foot", "#rates"],
    ["Where", "Bay Street, Marsh Harbour", "#contact"],
    ["Office hours", "Daily, 8:00am to 5:30pm", "#contact"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-paper/15 border-b lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-white/5 md:px-8 md:py-8">
              <span className="label text-conch">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i === 0 ? "text-[2rem] tabular-nums" : "text-[1.35rem]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-conch transition-all duration-500 group-hover:w-10" aria-hidden />
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
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-2"><Label n="01" className="text-harbour">The inn</Label></Reveal>
        <div className="lg:col-span-6">
          <Reveal><h2 id="story-title" className="font-display text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[1] tracking-[-0.02em]">On Bay Street since 1972, rebuilt after Dorian.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[60ch] text-[18px] leading-relaxed text-muted">The Conch Inn first opened in 1972. Hurricane Dorian closed it in 2019; it reopened in March 2021 and the family has since renovated every room, suite and apartment. What has not changed is the address: the harbour front of Marsh Harbour, steps from the slips and a short walk from town.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4 lg:pl-8">
          <p className="font-display text-[clamp(5rem,11vw,10rem)] leading-[0.8] tracking-[-0.04em] text-conch-deep" aria-hidden>1972</p>
          <div className="mt-6 space-y-3 border-t border-line pt-6 text-[15px]">
            <p className="flex justify-between gap-4"><span className="text-muted">First opened</span><span>1972</span></p>
            <p className="flex justify-between gap-4"><span className="text-muted">Reopened after Dorian</span><span>March 2021</span></p>
            <p className="flex justify-between gap-4"><span className="text-muted">Run by</span><span>The family</span></p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Marina() {
  return (
    <section className="relative overflow-hidden bg-paper-2" aria-labelledby="marina-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 py-24 md:py-36 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <MaskImg src={IMG.marina} alt="Boats in the Conch Inn Marina, Marsh Harbour" w={953} h={680} className="aspect-[953/680] lg:rounded-r-[6px]" />
          <MaskImg src={IMG.dockA} alt="On the docks at the Conch Inn Marina" w={960} h={640} className="absolute -bottom-10 right-6 hidden aspect-[3/2] w-[38%] rounded-[6px] shadow-[0_30px_60px_-30px_rgba(20,36,48,.5)] ring-8 ring-paper-2 md:block" />
        </div>
        <div className="px-5 md:px-10 lg:col-span-5 lg:pl-6 lg:pr-10">
          <Reveal>
            <Label n="02" className="text-harbour">The marina</Label>
            <h2 id="marina-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">Seventy-three slips, in the middle of town.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">A family-owned, full-service marina with slips and mooring balls. Power and water at every slip, free WiFi, clean private showers, laundry, fuel and ice, with 24-hour security on the docks.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 divide-y divide-line border-y border-line text-[15px]">
              {[["Slips", "73, catamarans to 30 ft beam"], ["Power", "30 and 50 amp, $0.75 per kWh"], ["Fuel", "Gasoline, diesel, ice"], ["Moorings", "$30 a night or $500 a month, plus VAT"], ["Short stops", "Up to 3 hours at $1.00 per foot"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3.5"><dt className="text-muted">{k}</dt><dd className="text-right">{v}</dd></div>
              ))}
            </dl>
            <a href="marina.html" className="btn btn-quiet mt-8">Marina details and rules <ArrowUpRight className="size-4" aria-hidden /></a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Rates() {
  return (
    <section id="rates" className="scroll-mt-20 bg-conch" aria-labelledby="rates-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label n="03" className="text-ink/70">Dockage</Label>
            <h2 id="rates-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">Know the number before you cross.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-[17px] leading-relaxed text-ink/75">The marina publishes its per-foot rates. Enter your boat and your nights, and the estimate updates using exactly those figures.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-14"><DockCalculator /></Reveal>
      </div>
    </section>
  )
}

function Rooms() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="rooms-title">
      <div className="mb-14 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Label n="04" className="text-harbour">Rooms ashore</Label>
          <h2 id="rooms-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">A balcony over the slips.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-[17px] leading-relaxed text-muted">Boutique rooms, marina-view suites and two-bedroom apartments with full kitchens, all renovated after the storm. Choose one to see what is inside.</p>
        </Reveal>
      </div>
      <Reveal delay={0.1}><RoomSelector /></Reveal>
      <a href="rooms.html" className="btn btn-quiet mt-12">All rooms and suites <ArrowUpRight className="size-4" aria-hidden /></a>
    </section>
  )
}

function Ashore() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const stops = [
    { x: 11, t: "Union Jack public dock", d: "1/3 mile west, free dockage" },
    { x: 37, t: "The Conch Inn & Marina", d: "Bay Street, Marsh Harbour", main: true },
    { x: 63, t: "Town", d: "Restaurants, groceries, liquor and shops, on foot" },
    { x: 89, t: "Leonard M. Thompson Intl. (MHH)", d: "About 3 miles by road" },
  ]
  return (
    <section id="ashore" className="scroll-mt-20 bg-paper-2" aria-labelledby="ashore-title">
      <div className="relative">
        <MaskImg src={IMG.snappas} alt="Snappas Bar & Grill on the dock at the Conch Inn" w={953} h={680} className="h-[70svh] min-h-[420px] w-full" />
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal className="relative -mt-28 max-w-xl rounded-[6px] bg-paper p-7 md:-mt-40 md:p-10">
            <Label n="05" className="text-harbour">Ashore</Label>
            <h2 id="ashore-title" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.02em]">Snappas, then a walk into town.</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">Snappas Bar &amp; Grill is the inn's dockside restaurant and bar, with live music and a harbour view. Navigare Yachting, Dream Yacht Charters and the Renu Day Spa are on the property too.</p>
            <a href="https://snappasbarandgrill.com/" className="btn btn-quiet mt-6">Visit Snappas <ArrowUpRight className="size-4" aria-hidden /></a>
          </Reveal>
        </div>
      </div>
      <div ref={ref} className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <p className="label text-muted">Getting around · illustration, not to scale</p>
        <div className="relative mt-10 hidden h-48 md:block">
          <svg className="absolute inset-x-0 top-[38px] h-4 w-full overflow-visible" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden>
            <line x1="11" y1="2" x2="89" y2="2" stroke="var(--color-line)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <motion.line x1="11" y1="2" x2="89" y2="2" stroke="var(--color-harbour)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
          </svg>
          {stops.map(s => (
            <div key={s.t} className="absolute top-0 w-[22%] -translate-x-1/2 text-center" style={{ left: `${s.x}%` }}>
              <p className="label text-muted">{s.main ? "You are here" : " "}</p>
              <span className={`mx-auto mt-3 block rounded-full border-2 border-harbour ${s.main ? "size-5 bg-harbour" : "size-3.5 bg-paper-2"}`} aria-hidden />
              <p className="mt-4 font-display text-[1.25rem] leading-tight">{s.t}</p>
              <p className="mt-1 text-[14px] text-muted">{s.d}</p>
            </div>
          ))}
        </div>
        <ol className="mt-8 space-y-0 border-l border-harbour/40 md:hidden">
          {stops.map(s => (
            <li key={s.t} className="relative pb-8 pl-6 last:pb-0">
              <span className={`absolute top-1.5 -left-[7px] block rounded-full border-2 border-harbour ${s.main ? "size-3.5 bg-harbour" : "size-3.5 bg-paper-2"}`} aria-hidden />
              <p className="font-display text-[1.3rem] leading-tight">{s.t}</p>
              <p className="mt-1 text-[15px] text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label n="07" className="text-harbour">Questions</Label>
          <h2 id="contact-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.02em]">What boaters ask first.</h2>
          <div className="mt-10"><Faq items={FAQ} /></div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/3] overflow-hidden rounded-[6px] bg-paper-2">
            <iframe title="Map: The Conch Inn & Marina, Bay Street, Marsh Harbour, Abaco" loading="lazy" className="size-full border-0 grayscale-[30%]" src="https://www.google.com/maps?q=Conch%20Inn%20%26%20Marina%2C%20Bay%20Street%2C%20Marsh%20Harbour%2C%20Abaco%2C%20Bahamas&output=embed" />
          </div>
          <div className="mt-8 grid gap-6 text-[15px] sm:grid-cols-2">
            <div><p className="label text-muted">Address</p><p className="mt-2">700 Bay Street<br />Marsh Harbour, Abaco<br />The Bahamas</p></div>
            <div><p className="label text-muted">Reach the office</p><p className="mt-2"><a href={TEL} className="ulink">242-367-4000</a><br /><a href="tel:+12425777000" className="ulink">242-577-7000</a><br /><a href="mailto:info@conchinn.com" className="ulink">info@conchinn.com</a></p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <Page current="Home">
      <Hero />
      <KeyBand />
      <Story />
      <Marina />
      <Rates />
      <FactBand />
      <Rooms />
      <Ashore />
      <EnquirySection />
      <Contact />
    </Page>
  )
}

mount(<Home />)
