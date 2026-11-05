import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Plane, Ship } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, MaskImg, ease, reveal, C, IMG } from "./site"
import { StayFinder, SlipCheck, Plan } from "./parts"

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink" aria-labelledby="hero-title">
      <motion.div style={{ y }} className="relative h-[78svh] min-h-[520px] md:h-[calc(100svh-104px)]">
        <motion.img src={IMG.harbour} alt="Hope Town Harbour from Hope Town Inn & Marina" width={1905} height={856} fetchPriority="high"
          initial={{ scale: 1.12, clipPath: "inset(0 0 0 0)" }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}
          className="size-full object-cover object-[60%_50%]" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1440px] px-0 md:px-10">
          <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.4, duration: 1.2, ease: reveal }}
            className="bg-paper px-5 pt-8 pb-7 md:w-[min(760px,62%)] md:px-12 md:pt-12 md:pb-10">
            <Label>Elbow Cay · Abaco · The Bahamas</Label>
            <h1 id="hero-title" className="mt-5 font-display text-[clamp(2.9rem,6.4vw,6.6rem)] leading-[0.9] font-medium tracking-[-0.02em]">
              <span className="sr-only">Hope Town Inn &amp; Marina: </span>
              {["Beside the lighthouse,", "on Hope Town Harbour."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.75 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
              ))}
            </h1>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.9, ease }} className="mt-7 flex flex-wrap items-center gap-3">
              <a href={C.book} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-0.5 hover:bg-sea-deep">Check room rates <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              <a href={C.dockwa} className="inline-flex min-h-12 items-center rounded-full border border-ink px-6 text-[15px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper">Book a slip</a>
              <span className="text-[13px] text-muted">Rooms, villas and slips to 125 ft</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    ["Stay", "3 rooms, 6 villas", "stay.html"],
    ["Marina", "Slips to 125 ft", "marina.html"],
    ["Bridget's Rum Bar", "Breakfast, lunch, dinner", "#dine"],
    ["Reservations", C.us, C.usTel],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="border-paper/12 border-b border-l first:border-l-0 lg:border-b-0 [&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="text-[11px] font-semibold tracking-[0.22em] text-sand uppercase">{k}</span>
              <span className="mt-2 block font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight italic">{v}</span>
              <span className="mt-3 block h-px w-0 bg-sand transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const AMENITIES = ["Welcome center", "Swimming pools", "Harbour views", "Rum bar", "Restaurant", "Gift shop", "Spa", "Concierge", "Sun loungers", "Wifi"]
function Estate() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40" aria-labelledby="estate-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5 md:col-start-2">
          <Label n="01">The estate</Label>
          <h2 id="estate-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.98] font-medium">Fifteen acres on the <em>west side</em> of the harbour.</h2>
          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-muted">A private estate next door to the Elbow Reef Lighthouse, anchoring the western side of Hope Town Harbour. Hotel rooms and villas, a marina, Bridget's Rum Bar and a boutique, all a short walk from the water.</p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-line">
            {AMENITIES.map(a => <li key={a} className="border-b border-line py-3 text-[15px]">{a}</li>)}
          </ul>
        </Reveal>
        <div className="relative md:col-span-5 md:col-start-8">
          <MaskImg src={IMG.villasHero} alt="Villas at Hope Town Inn & Marina" className="aspect-[4/5] md:translate-y-16" w={1905} h={856} />
          <MaskImg src={IMG.water} alt="Turquoise water off Elbow Cay" delay={0.2} className="absolute -bottom-10 -left-10 hidden aspect-[3/4] w-[46%] border-8 border-paper md:block md:-left-24" w={467} h={613} />
        </div>
      </div>
    </section>
  )
}

function Stay() {
  return (
    <section id="stay" className="scroll-mt-24 bg-paper-2" aria-labelledby="stay-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="max-w-2xl">
          <Label n="02">Rooms &amp; villas</Label>
          <h2 id="stay-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.98] font-medium">How many are you?</h2>
          <p className="mt-5 text-[17px] text-muted">Nine ways to stay, from a king room for two to villas that sleep eight. Set your party and see what fits.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14"><StayFinder /></Reveal>
        <a href="stay.html" className="group mt-12 inline-flex min-h-11 items-center gap-2 text-[15px] text-sea-deep">See every room and villa <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
      </div>
    </section>
  )
}

function Marina() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="marina-title">
      <MaskImg src={IMG.marinaWide} alt="The marina at Hope Town Inn & Marina" className="aspect-[16/9] w-full md:aspect-[21/8]" w={1905} h={1000} />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-2">
        <Reveal>
          <Label n="03" light>The marina</Label>
          <h2 id="marina-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.98] font-medium">Fifty surge-free slips. <em>Room for 125 ft.</em></h2>
          <dl className="mt-10 grid grid-cols-2 gap-px bg-paper/15">
            {[["Slips", "50, surge free"], ["Max length", "125 ft"], ["Moorings", "To 45 ft"], ["Power", "30 / 50 / 100 A"], ["Water", "Reverse osmosis"], ["Ashore", "Laundry, showers, ice"]].map(([k, v]) => (
              <div key={k} className="bg-ink p-5"><dt className="text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">{k}</dt><dd className="mt-1 font-display text-2xl">{v}</dd></div>
            ))}
          </dl>
          <a href="marina.html" className="group mt-8 inline-flex min-h-11 items-center gap-2 text-[15px] text-sand">Marina details <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="lg:self-end"><SlipCheck /></Reveal>
      </div>
    </section>
  )
}

function Dine() {
  return (
    <section id="dine" className="scroll-mt-24" aria-labelledby="dine-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-40">
        <MaskImg src={IMG.restaurant} alt="The restaurant at Hope Town Inn & Marina" className="aspect-[16/11] md:col-span-7" w={1905} h={856} />
        <Reveal className="md:col-span-4 md:col-start-9">
          <Label n="04">Bridget's Rum Bar</Label>
          <h2 id="dine-title" className="mt-6 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1] font-medium">One of the deepest rum lists in The Bahamas.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">Local chefs cook local and American dishes for breakfast, lunch and dinner. At the bar, one of the most extensive rum selections in the country, and cocktails to match.</p>
          <ul className="mt-8 flex flex-wrap gap-2 text-[14px]">{["Breakfast", "Lunch", "Dinner", "Cocktails"].map(x => <li key={x} className="rounded-full border border-line px-4 py-2">{x}</li>)}</ul>
        </Reveal>
      </div>
    </section>
  )
}

const ROUTES = [
  { from: "Miami (MIA)", air: "American Airlines", to: "Marsh Harbour (MHH)" },
  { from: "Charlotte (CLT)", air: "American Airlines", to: "Marsh Harbour (MHH)" },
  { from: "Atlanta (ATL)", air: "Delta", to: "Marsh Harbour (MHH)" },
  { from: "Orlando Sanford (SFB)", air: "Air Unlimited", to: "Marsh Harbour (MHH) or Treasure Cay (TCB)" },
  { from: "Fort Lauderdale", air: "Silver Airways, Island Wings or Aztec Airlines", to: "Marsh Harbour (MHH)" },
  { from: "West Palm Beach", air: "Bahamasair", to: "Marsh Harbour (MHH)" },
  { from: "Nassau", air: "Bahamasair or Western Air", to: "Marsh Harbour (MHH)" },
]
function GettingHere() {
  const [r, setR] = useState(0)
  const route = ROUTES[r]
  const tc = route.to.includes("Treasure")
  return (
    <section id="getting-here" className="scroll-mt-24 bg-shallows/60" aria-labelledby="gh-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <Label n="05">Getting here</Label>
          <h2 id="gh-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.98] font-medium">A flight, a ferry, <em>then the harbour.</em></h2>
          <label htmlFor="from" className="mt-10 block text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">Flying from</label>
          <select id="from" value={r} onChange={e => setR(+e.target.value)} className="mt-2 block min-h-14 w-full border-b border-ink/30 bg-transparent font-display text-3xl outline-none focus:border-sea">
            {ROUTES.map((x, i) => <option key={x.from} value={i}>{x.from}</option>)}
          </select>
          <p className="mt-5 text-[15px] text-muted">Charters fly from Florida too, and boaters can cross on their own keel: the marina is ready when you arrive.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="relative">
            <span className="absolute top-6 bottom-6 left-[23px] w-px bg-ink/20" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div key={r} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {[
                  { icon: Plane, t: route.from, d: route.air },
                  { icon: Plane, t: route.to, d: tc ? "Then a boat ride across to Elbow Cay" : "A short ride to the ferry dock" },
                  { icon: Ship, t: "Ferry to Hope Town", d: "GNL Ferry or The Ferry Limited run from Marsh Harbour" },
                  { icon: ArrowUpRight, t: "Hope Town Inn & Marina", d: "West side of Hope Town Harbour, Elbow Cay" },
                ].map((s, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12, duration: 0.6, ease }} className="relative flex gap-5 pb-8 last:pb-0">
                    <span className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full ${i === 3 ? "bg-ink text-paper" : "border border-ink/20 bg-paper"}`}><s.icon className="size-5" aria-hidden /></span>
                    <span className="pt-1"><span className="block font-display text-2xl">{s.t}</span><span className="text-[15px] text-muted">{s.d}</span></span>
                  </motion.li>
                ))}
              </motion.div>
            </AnimatePresence>
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

function Moments() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-6 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36" aria-labelledby="moments-title">
      <Reveal className="md:col-span-12">
        <Label n="06">On the calendar</Label>
        <h2 id="moments-title" className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1] font-medium">Tournaments, a private cay, and a lighthouse to keep lit.</h2>
      </Reveal>
      <Reveal className="md:col-span-7">
        <MaskImg src={IMG.sportfish} alt="A sportfishing boat at the marina" className="aspect-[16/10]" w={387} h={280} />
        <p className="mt-5 font-display text-3xl">The Elbow Reef Classic</p>
        <p className="mt-2 max-w-lg text-[16px] text-muted">Four days of fishing and festivities, held each year at Hope Town Inn &amp; Marina. Proceeds go to preserving and protecting the Elbow Reef Lighthouse.</p>
        <a href="https://www.elbowreeflighthousesociety.com/elbowreefclassic" className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[15px] text-sea-deep">Tournament registration <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-5 md:mt-28">
        <MaskImg src={IMG.johnnys} alt="The dock at Johnny's Cay" className="aspect-[4/5]" w={1920} h={1080} />
        <p className="mt-5 font-display text-3xl">Johnny's Cay</p>
        <p className="mt-2 text-[16px] text-muted">A private island rental, for when the harbour is not quite far enough.</p>
        <a href="https://www.johnnyscayabaco.com/" className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[15px] text-sea-deep">Johnny's Cay <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
      </Reveal>
      <p className="mt-6 text-[13px] text-muted md:col-span-12">Marinalife 2024 Readers' Choice Awards winner · Dockwa Elite Fleet 2024</p>
    </section>
  )
}

function PlanSection() {
  return (
    <section id="plan" className="scroll-mt-24 bg-paper-2" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-4">
          <Label n="07">Plan your stay</Label>
          <h2 id="plan-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.98] font-medium">Tell us when. <em>We'll take it from there.</em></h2>
          <p className="mt-6 max-w-sm text-[16px] text-muted">Live rates for rooms and villas, slips through Dockwa, and the office for everything else.</p>
          <p className="mt-8 text-[15px]"><a href={C.usTel} className="underline-offset-4 hover:underline">US {C.us}</a><br /><a href={C.bsTel} className="underline-offset-4 hover:underline">BS {C.bs}</a><br /><a href={`mailto:${C.email}`} className="underline-offset-4 hover:underline">{C.email}</a></p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6"><Plan /></Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Hope Town Inn & Marina?", "On the western side of Hope Town Harbour, Elbow Cay, in the Abaco Islands of The Bahamas, next door to the Elbow Reef Lighthouse."],
  ["How do I get to Elbow Cay?", "Fly into Marsh Harbour (MHH) and take the ferry to Hope Town, or fly to Treasure Cay (TCB) and continue by boat. You can also arrive by private boat from Florida."],
  ["How big a boat can the marina take?", "Dockage is available for vessels up to 125 ft across 50 surge-free slips, with moorings for boats up to 45 ft and 30, 50 and 100 amp service."],
  ["What rooms and villas are there?", "Three hotel room types (Double Occupancy, King Bed and King Suite) and six villas sleeping four to eight guests."],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4"><Label n="08">Questions</Label><h2 id="faq-title" className="mt-6 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1] font-medium">Before you come.</h2></Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="min-h-14 py-6 text-left font-display text-2xl hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Estate /><Stay /><Marina /><Dine /><GettingHere /><Moments /><PlanSection /><Questions /></Page>)
