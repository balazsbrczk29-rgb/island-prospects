import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, EMAIL, BOOK, WP } from "./site"
import Planner from "./Planner"

const WELCOME = WP + "2019/08/welcome-img.jpg"
const ROOMS = WP + "2019/08/accomodations-img.jpg"

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10 md:pt-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-[0.24em] text-muted uppercase">
          <span>The top of Cat Island</span><span>North of Arthur’s Town · The Bahamas</span>
        </motion.div>
        <h1 id="hero-title" className="relative mt-4 font-display text-[clamp(4.6rem,19vw,17.5rem)] leading-[0.82] font-semibold tracking-[-0.045em]">
          <span className="sr-only">Orange Creek Inn, Cat Island: a beach across the road</span>
          <span aria-hidden className="block overflow-hidden"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.15, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>Orange</motion.span></span>
          <span aria-hidden className="flex items-end justify-between gap-4 overflow-hidden md:gap-8">
            <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.27, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>Creek</motion.span>
            <motion.span initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.6, duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="mb-[0.08em] hidden aspect-[4/3] w-[28vw] max-w-[420px] overflow-hidden rounded-[18px] md:block">
              <img src={WELCOME} alt="" width={840} height={630} fetchPriority="high" className="size-full object-cover" />
            </motion.span>
          </span>
        </h1>
        <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:pt-10">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }} className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] md:col-span-6">A friendly inn with the beach across the road, a grocery downstairs and the airport 3.5 miles away.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 1, ease }} className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:col-start-8 md:items-start md:justify-end">
            <a href={BOOK} className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-casuarina px-7 text-[16px] text-paper transition hover:-translate-y-px hover:bg-casuarina-deep active:translate-y-0">Check dates <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-7 text-[16px] transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </motion.div>
        </div>
        <Photo priority src={WELCOME} alt="Orange Creek Inn, Cat Island" className="mt-8 aspect-[4/3] rounded-[18px] md:hidden" />
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Call the inn", PHONE, TEL],
    ["Airport", "Arthur’s Town, 3.5 miles · pickup offered", "island.html"],
    ["The rooms", "Studios with kitchenettes", "stay.html"],
    ["Pay", "Visa, Mastercard, or cash on arrival", "stay.html#pay"],
  ]
  return (
    <section className="mt-14 md:mt-20" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="bg-flats/35">
            <a href={href} className="group block h-full px-5 py-7 transition hover:bg-flats/50 md:px-10 md:py-9">
              <span className="text-[11px] font-medium tracking-[0.22em] text-casuarina-deep uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight font-medium ${i === 0 ? "text-[clamp(1.8rem,2.4vw,2.4rem)]" : "text-xl"}`}>{v}</span>
              <ArrowRight className="mt-3 size-4 text-casuarina-deep transition group-hover:translate-x-1" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Across() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="across-title">
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-6">
          <Photo src={ROOMS} alt="The two-storey inn at Orange Creek" className="aspect-[5/4] rounded-[18px]" />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <Label n="01">The inn</Label>
          <h2 id="across-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-semibold tracking-[-0.02em]">Two storeys, one road, then white sand.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">Orange Creek Inn sits directly across the road from a white-sand beach, at the quiet north end of Cat Island. Downstairs there is a store for groceries, a laundry and an ice machine. The inn rents cars and picks guests up at the airport.</p>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">It suits couples, families, anglers and anyone who wants an uncrowded island and a kitchenette of their own.</p>
          <a href="stay.html" className="group mt-8 inline-flex items-center gap-2 text-[16px] underline decoration-ink/30 underline-offset-4 hover:decoration-casuarina">Inside the studios <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  )
}

function Getting() {
  return (
    <section className="bg-sand/60" aria-labelledby="get-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-3xl">
          <Label n="02">Getting here</Label>
          <h2 id="get-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-semibold tracking-[-0.02em]">Plan the trip in three taps.</h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">Choose where you fly from and the day you want to arrive. We show the published flights for that day, the last 3.5 miles, and what it costs to get around once you are here.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12"><Planner /></Reveal>
      </div>
    </section>
  )
}

function Specials() {
  const offers: [string, string][] = [
    ["2 nights, pre-booked", "$150 fee credit"],
    ["4 nights or longer", "$300 fee credit"],
    ["4 to 6 nights, air-inclusive", "One free round-trip ticket from Nassau"],
    ["7 nights, air-inclusive", "Two free round-trip tickets from Nassau"],
  ]
  return (
    <section className="bg-casuarina-deep text-paper" aria-labelledby="sp-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-5">
          <Label n="03" light>Specials</Label>
          <h2 id="sp-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-semibold tracking-[-0.02em]">Stay longer, fly cheaper.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">The inn takes part in the Bahama Out Islands Promotion Board offers. Booking window July 1, 2026 to June 30, 2027; blackout dates apply.</p>
          <a href="stay.html#specials" className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Find the special for your trip <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <ul className="md:col-span-6 md:col-start-7">
          {offers.map(([k, v], i) => (
            <motion.li key={k} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="group flex flex-col justify-between gap-1 border-b border-paper/15 py-6 first:border-t sm:flex-row sm:items-baseline">
              <span className="text-[15px] text-paper/70">{k}</span>
              <span className="font-display text-2xl font-medium transition group-hover:-translate-x-1">{v}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const ENQ = {
  dates: { label: "Dates and studio", fields: [["Arrival", "date"], ["Departure", "date"], ["Adults", "number"], ["Children", "number"]] },
  pickup: { label: "Pickup and car", fields: [["Flight and arrival time", "text"], ["Car rental days", "number"], ["Bicycles", "number"]] },
  fishing: { label: "Fishing", fields: [["Dates", "text"], ["Anglers", "number"], ["Bonefishing or offshore", "text"]] },
} as const
type K = keyof typeof ENQ

function Ask() {
  const [tab, setTab] = useState<K>("dates")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const lines = ENQ[tab].fields.map(([f]) => vals[`${tab}:${f}`] ? `${f}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean) as string[]
  const body = ["Hello Orange Creek Inn,", "", `${ENQ[tab].label}:`, ...lines, "", name ? `Thank you, ${name}` : "Thank you"].join("\n")
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${ENQ[tab].label}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="ask" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="ask-title">
      <Reveal className="md:col-span-4">
        <Label n="04">Ask the inn</Label>
        <h2 id="ask-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[1] font-semibold tracking-[-0.02em]">Book online, or just ask.</h2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Check live dates on the booking page, or send your plans and the inn will reply by email. A car can be waiting at the airport.</p>
        <a href={BOOK} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-casuarina px-6 text-paper transition hover:-translate-y-px">Check dates online <ArrowUpRight className="size-4" aria-hidden /></a>
        <p className="mt-3 text-[13px] text-muted">Online booking opens the Bahama Out Islands booking page.</p>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Tabs value={tab} onValueChange={v => setTab(v as K)}>
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-sand/60 p-1">
            {(Object.keys(ENQ) as K[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">{ENQ[k].label}</TabsTrigger>)}
          </TabsList>
          {(Object.keys(ENQ) as K[]).map(k => (
            <TabsContent key={k} value={k} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block sm:col-span-2"><span className="text-[11px] tracking-[0.2em] text-muted uppercase">Your name</span>
                  <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none focus:border-casuarina" /></label>
                {ENQ[k].fields.map(([f, type]) => (
                  <label key={f} className="block"><span className="text-[11px] tracking-[0.2em] text-muted uppercase">{f}</span>
                    <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none focus:border-casuarina" /></label>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-10 rounded-[20px] bg-ink p-6 text-paper md:p-8">
          <p className="text-[11px] tracking-[0.2em] text-flats uppercase">Your message</p>
          <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-paper/80">{lines.length ? lines.join(" · ") : "Your details will appear here as you type."}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={mail} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px"><Mail className="size-4" aria-hidden /> Email the inn</a>
            <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </div>
          <p className="mt-4 text-[13px] text-paper/55">Opens your email app addressed to {EMAIL}. Nothing is sent until you press send.</p>
        </div>
      </Reveal>
    </section>
  )
}

const FAQ: [string, string][] = [
  ["Where is Orange Creek Inn?", "In Orange Creek, immediately north of Arthur’s Town on Cat Island, The Bahamas, directly across the road from a white-sand beach."],
  ["How do I get to Orange Creek Inn?", "Fly to Nassau and take a Western Air flight to Cat Island, or fly Makers Air from Fort Lauderdale Executive. Arthur’s Town Airport is about 3.5 miles away; the inn offers airport pickup, and a taxi is about $15."],
  ["Do I need a car?", "It is recommended for exploring. Car rental averages $80 a day and can be waiting at the airport; bicycles are $10 a day."],
  ["Is it good for bonefishing?", "Yes. The inn is near bonefishing flats on Cat Island and is popular with anglers."],
  ["How do I pay?", "Visa and Mastercard, or cash on arrival."],
]

function Faq() {
  return (
    <section className="bg-sand/40" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4"><Label n="05">Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-semibold">The ones guests ask.</h2></Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible className="border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left text-[18px] font-medium hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Map() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24" aria-label="Map">
      <iframe title="Map of Orange Creek, Cat Island" loading="lazy" className="aspect-[4/3] w-full rounded-[18px] border border-line md:aspect-[21/8]" src="https://www.google.com/maps?q=Orange+Creek+Inn+Cat+Island+Bahamas&output=embed" />
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyInfo /><Across /><Getting /><Specials /><Ask /><Faq /><Map /></Page>)
