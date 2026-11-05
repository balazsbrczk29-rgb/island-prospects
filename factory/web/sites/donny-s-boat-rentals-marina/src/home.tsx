import { lazy, Suspense, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, MessageCircle, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease } from "./site"
import { PHONE, TEL, PHONE_US, TEL_US, WA_LABEL, IMG, BOATS, TERMS, wa } from "./data"
import Chooser from "./Chooser"
const SlipCheck = lazy(() => import("./SlipCheck"))

function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 bg-flats">
        <motion.img src={IMG.hero.src} alt={IMG.hero.alt} width={2000} height={1499} fetchPriority="high" className="size-full object-cover" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} />
      </div>
      <div className="mx-auto flex min-h-[calc(100svh-120px)] max-w-[1440px] flex-col justify-end px-5 pt-40 pb-6 md:px-10 md:pb-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.1, ease }} className="max-w-[720px] rounded-[2rem] bg-paper/88 p-7 backdrop-blur-xl md:p-10">
          <Label>Black Sound · Green Turtle Cay · Abaco</Label>
          <h1 id="hero-title" className="mt-4 font-display text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.98] tracking-[-0.01em]">
            <span className="sr-only">Donny's Boat Rentals and Marina: </span>
            {["Your boat, waiting", "at the end of Black Sound."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/80">A family-run marina on Green Turtle Cay with four rental boats from 17 to 23 ft and fixed-price dockage to 50 ft. Donny lives on site.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#reserve" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-turtle px-6 font-bold text-paper transition hover:-translate-y-px hover:bg-ink">Reserve a boat <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href="#fits" className="inline-flex min-h-12 items-center rounded-full border-2 border-ink px-6 font-bold transition hover:-translate-y-px hover:bg-ink hover:text-paper">Check if your boat fits</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items: [string, string, string][] = [
    ["WhatsApp Taylor", WA_LABEL, wa("Hi Taylor, I'd like to ask about Donny's.")],
    ["Call", PHONE, TEL],
    ["From the US", PHONE_US, TEL_US],
    ["On the radio", "VHF 16 · working 10", "marina.html"],
    ["Dockage", "To 50 ft LOA · 7 ft draft", "#fits"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-5">
        {items.map(([k, v, href], i) => (
          <li key={k} className={`border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
            <a href={href} className="group block px-5 py-6 transition hover:bg-turtle md:px-7 md:py-8">
              <span className="text-[11px] font-bold tracking-[0.16em] text-flats uppercase">{k}</span>
              <span className="mt-2 block font-display text-[1.3rem] leading-tight tnum md:text-[1.45rem]">{v}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Reserve() {
  return (
    <section id="reserve" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-32" aria-labelledby="reserve-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7"><Label>01 · Rent a boat</Label><h2 id="reserve-title" className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[1]">Pick a boat, count the days.</h2></div>
        <p className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Every boat has a 4-stroke engine. Rentals are for guests staying on Green Turtle Cay, 3 days minimum, cash only.</p>
      </Reveal>
      <div className="mt-14"><Chooser /></div>
    </section>
  )
}

const PLACES = [
  ["No Name Cay", "The swimming pigs."],
  ["Manjack Cay", "Turtles in the shallows."],
  ["Secluded beaches", "Picnics, snorkelling, an afternoon to yourselves."],
  ["Abaco Sound", "Fishing, and the whole sound to explore, island to island."],
] as const

function Islands() {
  return (
    <section id="islands" className="bg-sand/60" aria-labelledby="islands-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <Label>02 · Where to go</Label>
          <h2 id="islands-title" className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[1]">Pigs, turtles and a beach of your own.</h2>
          <ol className="mt-10 border-t border-ink/20">
            {PLACES.map(([t, d], i) => (
              <motion.li key={t} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="group grid grid-cols-[2.5rem_1fr] border-b border-ink/15 py-5">
                <span className="font-display text-turtle tnum">{String(i + 1).padStart(2, "0")}</span>
                <div><p className="font-display text-[1.5rem] transition group-hover:translate-x-1">{t}</p><p className="text-[15px] text-muted">{d}</p></div>
              </motion.li>
            ))}
          </ol>
        </Reveal>
        <div className="grid grid-cols-5 gap-4 lg:col-span-6 lg:col-start-7">
          <Photo src={IMG.dock.src} alt={IMG.dock.alt} className="col-span-3 aspect-[3/4] rounded-[2rem]" />
          <Photo src={BOATS[2].img} alt="The 19 ft Boston Whaler rental boat" className="col-span-2 mt-16 aspect-[3/4] rounded-[2rem]" />
        </div>
      </div>
    </section>
  )
}

function Fits() {
  return (
    <section id="fits" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-32" aria-labelledby="fits-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7"><Label>03 · Cruisers</Label><h2 id="fits-title" className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[1]">Will your boat fit?</h2></div>
        <p className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Fixed-price dockage up to 50 ft LOA and 7 ft draft, and moorings with plenty of swing room. Customs is a 10-minute walk away in New Plymouth.</p>
      </Reveal>
      <div className="mt-14"><Suspense fallback={<div className="h-80 rounded-3xl bg-flats/30" />}><SlipCheck /></Suspense></div>
    </section>
  )
}

function Ask() {
  const [vals, setVals] = useState<Record<string, string>>({})
  const v = (k: string) => vals[k] ?? ""
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setVals(x => ({ ...x, [k]: e.target.value }))
  const field = (k: string, label: string, type = "text") => <label className="block"><span className="text-[12px] font-bold tracking-[0.14em] text-muted uppercase">{label}</span><input type={type} name={k} value={v(k)} onChange={set(k)} className="mt-1 block min-h-12 w-full border-b-2 border-ink/20 bg-transparent text-lg outline-none focus:border-turtle" /></label>
  const tourMsg = `Hi Taylor, we'd like to ask about a tour. Date: ${v("tdate") || "flexible"}. People: ${v("tppl") || "?"}. Interested in: ${v("twhat") || "island hopping"}.`
  const slipMsg = `Hi Donny, dockage enquiry. Boat: ${v("sboat") || "?"}, LOA ${v("sloa") || "?"} ft. Arriving ${v("sarr") || "?"} for ${v("snights") || "?"} nights.`
  return (
    <section className="bg-flats/25" aria-labelledby="ask-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label>04 · Ask Donny's</Label><h2 id="ask-title" className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1]">Tours and slips, by message.</h2><p className="mt-5 max-w-sm text-[17px] text-muted">Fill in what you know and send it on WhatsApp. Rentals are booked with the chooser above.</p></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs defaultValue="tour">
            <TabsList className="h-auto gap-1 rounded-full bg-paper p-1">
              <TabsTrigger value="tour" className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">A tour</TabsTrigger>
              <TabsTrigger value="slip" className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">A slip or mooring</TabsTrigger>
            </TabsList>
            <TabsContent value="tour" className="mt-8"><div className="grid gap-6 sm:grid-cols-3">{field("tdate", "Date", "date")}{field("tppl", "People", "number")}{field("twhat", "What you'd love to see")}</div><a href={wa(tourMsg)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-turtle px-6 font-bold text-paper transition hover:-translate-y-px hover:bg-ink"><MessageCircle className="size-4" aria-hidden /> Send on WhatsApp</a></TabsContent>
            <TabsContent value="slip" className="mt-8"><div className="grid gap-6 sm:grid-cols-2">{field("sboat", "Boat name and type")}{field("sloa", "LOA (ft)", "number")}{field("sarr", "Arrival", "date")}{field("snights", "Nights", "number")}</div><a href={wa(slipMsg)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-turtle px-6 font-bold text-paper transition hover:-translate-y-px hover:bg-ink"><MessageCircle className="size-4" aria-hidden /> Send on WhatsApp</a></TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}

function Terms() {
  const faq: [string, string][] = [
    ["Can I pay by card?", TERMS[0]],
    ["Is there a deposit or minimum?", TERMS[1]],
    ["Who can rent?", TERMS[2]],
    ["What are the hours?", TERMS[3]],
    ["Where can I take the boat?", TERMS[4]],
    ["What about fuel and weather?", TERMS[5]],
  ]
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="terms-title">
      <Reveal className="lg:col-span-4"><Label>05 · Before you go</Label><h2 id="terms-title" className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1]">The rental terms, plainly.</h2></Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
          {faq.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-5 text-left font-display text-[1.35rem] font-normal hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function FindUs() {
  return (
    <section className="border-t border-line bg-sand/50" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label>06 · Find us</Label>
          <h2 id="find-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">The end of Black Sound.</h2>
          <p className="mt-5 text-[17px] text-muted">New Plymouth is a 10-minute walk: Customs, restaurants, groceries and a small hardware store. A fuel dock and boat yard are close by.</p>
          <p className="mt-6 font-display text-[1.3rem] tnum">N 26° 45.460′ · W 077° 19.301′</p>
          <a href={TEL} className="mt-8 flex min-h-16 items-center gap-3 rounded-full bg-ink px-7 font-display text-[1.6rem] text-paper transition hover:-translate-y-0.5 hover:bg-turtle"><Phone className="size-5" aria-hidden /> {PHONE}</a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] border border-line lg:col-span-7">
          <iframe title="Map of Black Sound, Green Turtle Cay" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[480px]" src="https://www.google.com/maps?q=26.7577,-77.3217&z=15&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyBand /><Reserve /><Islands /><Fits /><Ask /><Terms /><FindUs /></Page>)
