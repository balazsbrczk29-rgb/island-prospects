import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Marquee } from "@/components/magicui/marquee"
import { Page, mount, Reveal, Label, Lines, Photo, ease, PHONE, TEL, EMAIL, IMG } from "./site"
import RouteMap from "./RouteMap"
import { PLACES, TOURS, tourUrl, type Place } from "./tours"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-104px)] max-w-[1440px] items-stretch gap-0 md:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-between px-5 pt-10 pb-8 md:col-span-6 md:px-10 md:pt-16 md:pb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex items-center gap-4 text-[11px] tracking-[0.24em] text-muted uppercase">
            <span>Nassau · Paradise Island</span><span className="h-px w-10 bg-line" aria-hidden /><span>Est. June 1959</span>
          </motion.div>
          <div className="my-10 md:my-0">
            <h1 id="hero-title" className="font-display text-[clamp(3.1rem,7.4vw,8.4rem)] leading-[0.92] tracking-[-0.02em] text-ink">
              <span className="sr-only">Majestic Tours: </span>
              <Lines lines={["Tours and", "transfers", "from Nassau."]} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-8 max-w-[34rem] text-[18px] leading-relaxed text-muted">
              Majestic Tours is the Bahamian family company that has met guests at the airport and taken them out to the islands since 1959. Rose Island, Blue Lagoon, the Exuma Cays, the harbour at sunset.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 1, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#plan" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] bg-green px-7 text-[16px] text-paper transition hover:-translate-y-px hover:bg-green-deep active:translate-y-0">
                Plan my excursion <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </a>
              <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] border border-ink/25 px-7 text-[16px] text-ink transition hover:-translate-y-px hover:border-ink active:translate-y-0">
                <Phone className="size-4" aria-hidden /> Call {PHONE}
              </a>
            </motion.div>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="hidden text-[13px] text-muted md:block">“Service is our profession.” The company motto, since the beginning.</motion.p>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.2, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="relative min-h-[460px] bg-[#d5ece6] md:col-span-6 md:min-h-0">
          <div className="absolute inset-0"><RouteMap compact /></div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1, ease }} className="absolute right-4 bottom-4 left-4 max-w-sm rounded-[4px] border border-white/60 bg-paper/75 p-5 backdrop-blur-xl md:right-8 md:bottom-8 md:left-auto">
            <p className="text-[11px] tracking-[0.22em] text-green uppercase">Furthest day out</p>
            <p className="mt-2 font-display text-2xl leading-tight">Exuma Cays, 55 minutes by powerboat</p>
            <a href="excursions.html#exuma" className="group mt-3 inline-flex items-center gap-1 text-[15px] text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-green">See the Exuma trips <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Book a tour", PHONE, TEL],
    ["Hotel tour desks", "In the lobbies of Atlantis, RIU, Warwick and more", "transfers.html#desks"],
    ["Airport", "Meet and greet after Customs, shared or private", "transfers.html"],
    ["Head office", "Hillside Manor, Cumberland St, Nassau", "#contact"],
  ]
  return (
    <section className="bg-green-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="border-paper/15 border-b lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="text-[11px] tracking-[0.22em] text-sand uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i === 0 ? "text-[clamp(1.9rem,2.6vw,2.6rem)]" : "text-xl"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-sand transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Explorer() {
  const [place, setPlace] = useState<Place>("rose")
  const list = useMemo(() => TOURS.filter(t => t.place === place), [place])
  const lead = list[0]
  const order: Place[] = ["harbour", "rose", "lagoon", "exuma", "harbourisland", "reefs", "land"]
  return (
    <section id="where" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="where-title">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Label>01 · Where the day goes</Label>
          <h2 id="where-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.015em]">Pick an island. See every trip that goes there.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Tap a place on the chart or in the list. The route lights up and the trips Majestic books there appear below, with the photographs from each tour.</p>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a destination">
            {order.map(p => (
              <button key={p} type="button" onClick={() => setPlace(p)} aria-pressed={place === p} className={`min-h-11 rounded-[3px] border px-4 text-[14px] transition hover:-translate-y-px active:translate-y-0 ${place === p ? "border-green bg-green text-paper" : "border-line bg-paper text-ink hover:border-ink/40"}`}>{PLACES[p].name}</button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-line">
            <RouteMap active={place} onPick={setPlace} draw={false} />
          </div>
        </Reveal>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={place} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl">{PLACES[place].name}</p>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{PLACES[place].note}</p>
            {lead && <Photo src={lead.img} alt={lead.alt} className="mt-8 aspect-[3/2] rounded-[4px]" />}
          </div>
          <ol className="md:col-span-7">
            {list.map((t, i) => (
              <li key={t.id} className="border-b border-line first:border-t">
                <a href={tourUrl(t.id)} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-5 transition hover:bg-paper-2/60 md:px-3">
                  <span className="text-[12px] tracking-[0.18em] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[18px] font-medium text-ink">{t.name}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-muted">{t.line}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-green" aria-hidden />
                </a>
              </li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
      <p className="mt-10"><a href="excursions.html" className="group inline-flex items-center gap-2 text-[16px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-green">All {TOURS.length} excursions, filtered by type <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a></p>
    </section>
  )
}

function Evening() {
  const pickups = [["Cable Beach", "5:00PM"], ["Downtown", "5:15PM"], ["Paradise Island", "5:30PM"]]
  return (
    <section className="relative bg-ink text-paper" aria-labelledby="evening-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-6 md:col-start-1">
          <motion.div initial={{ clipPath: "inset(12% 12% 12% 12%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}>
            <Photo src={IMG + "flying-cloud/evening/flying-cloud-sunset-picture-1.jpg"} alt="The Flying Cloud catamaran sailing at sunset off Nassau" className="aspect-[4/5] rounded-[4px] md:aspect-[5/6]" />
          </motion.div>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center md:col-span-5 md:col-start-8">
          <Label light>02 · The evening</Label>
          <h2 id="evening-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Dinner under sail, as Nassau lights up.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-paper/75">On the Flying Cloud evening sail you cross Nassau Harbour and round Paradise Island at dusk, with a Bahamian barbecue buffet, a glass of wine from the bar and the sunset. Dress casually. Private charters for groups, parties and weddings are available.</p>
          <dl className="mt-10 grid grid-cols-3 border-t border-paper/20">
            {pickups.map(([k, v]) => (
              <div key={k} className="border-r border-paper/20 py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="text-[11px] tracking-[0.18em] text-sand uppercase">{k}</dt>
                <dd className="mt-1 font-display text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[14px] text-paper/60">Pickup times as listed; cruise times change with the season. Listed fare $137.50 per adult, $68.75 per child under 11, taxes included. Hotel transfer not included.</p>
          <a href="#plan" className="group mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-[3px] bg-paper px-6 text-ink transition hover:-translate-y-px active:translate-y-0">Ask about the dinner sail <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  )
}

const AWARDS: [string, string, string][] = [
  ["1959", "Founded", "Bill and Iris Saunders open Majestic Tours in June."],
  ["1991", "Award of Distinction", "Air Canada"],
  ["2003", "Transfer Company of the Year", "Expedia"],
  ["2003-11", "Outstanding Customer Service", "Thomas Cook Worldwide"],
  ["2005", "Tour Operator of the Year", "Cacique"],
  ["2013", "Quality Assurance Award", "MLT Vacations"],
]

function Since() {
  return (
    <section id="since-1959" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40" aria-labelledby="since-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Label>03 · Since 1959</Label>
          <h2 id="since-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.98]">A family idea that became Nassau's tour company.</h2>
          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-muted">William “Bill” Saunders was convinced tourism had a future in The Bahamas. With his wife Iris he founded Majestic Tours in June 1959, on one idea that still runs the company: a service second to none.</p>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">Today Majestic runs air-conditioned vans, buses, limousines, town cars and SUVs, has representatives in the hotel lobbies, and is a member of ASTA, CHA and IATA.</p>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <ol>
            {AWARDS.map(([y, t, by], i) => (
              <motion.li key={t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[8.5rem_1fr] items-baseline gap-4 border-b border-line py-6 first:border-t">
                <span className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] text-green transition group-hover:translate-x-1">{y}</span>
                <span><span className="block text-[18px] font-medium">{t}</span><span className="text-[15px] text-muted">{by}</span></span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Languages() {
  const langs = ["English", "Español", "Français", "Deutsch", "Italiano", "Português", "Schwiizerdütsch"]
  return (
    <section className="border-y border-line bg-paper-2 py-8" aria-label="Languages our representatives speak">
      <Marquee className="[--duration:48s] [--gap:3.5rem]" pauseOnHover>
        {langs.map(l => <span key={l} className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-ink/80">{l} <span className="ml-12 text-green" aria-hidden>·</span></span>)}
      </Marquee>
      <p className="mx-auto mt-3 max-w-[1440px] px-5 text-[13px] text-muted md:px-10">Personal representation in Spanish, French, German, Italian, Portuguese and Swiss German.</p>
    </section>
  )
}

function Arrival() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="arrive-title">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-6">
          <Label>04 · Arriving in Nassau</Label>
          <h2 id="arrive-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Someone holding a Majestic sign, after Customs.</h2>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <p className="text-[17px] leading-relaxed text-muted">Shared buses stop at three or four hotels. Private cars, limousines and SUVs wait with your name on the sign. Majestic is the only provider on the island offering private transport for disabled guests, arranged 48 hours ahead.</p>
          <a href="transfers.html" className="group mt-6 inline-flex items-center gap-2 text-[16px] underline decoration-ink/30 underline-offset-4 hover:decoration-green">How airport transfers work <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <Photo src="https://majestictoursbahamas.com/transportation/images/fleet.jpg" alt="The Majestic Tours fleet of buses and vans" className="mt-12 aspect-[16/9] rounded-[4px] md:aspect-[21/8]" />
      </Reveal>
    </section>
  )
}

const ENQ = {
  excursion: { label: "An excursion", fields: [["Excursion", "text", "e.g. Rose Island Half Day"], ["Date", "date", ""], ["Adults", "number", ""], ["Children and ages", "text", ""], ["Hotel", "text", ""]] },
  transfer: { label: "Airport transfer", fields: [["Shared, private or accessible", "text", ""], ["Arrival flight and date", "text", ""], ["Departure flight and date", "text", ""], ["Guests", "number", ""], ["Hotel", "text", ""]] },
  group: { label: "Group or event", fields: [["Organisation", "text", ""], ["Dates", "text", ""], ["Group size", "number", ""], ["What you are planning", "text", "Conference, wedding, incentive trip"]] },
} as const
type EnqKey = keyof typeof ENQ

function Plan() {
  const [tab, setTab] = useState<EnqKey>("excursion")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const fields = ENQ[tab].fields
  const lines = fields.map(([f]) => vals[`${tab}:${f}`] ? `${f}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean) as string[]
  const body = [`Hello Majestic Tours,`, ``, `I would like to ask about ${ENQ[tab].label.toLowerCase()}.`, ...lines, ``, name ? `Thank you, ${name}` : `Thank you`].join("\n")
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${ENQ[tab].label}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="plan" className="bg-paper-2" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <Label>05 · Plan</Label>
          <h2 id="plan-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98]">Tell us the day. We arrange the rest.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Choose what you need, add the details, and your email opens ready to send. Prefer to talk? Call the tour line or stop at the Majestic desk in your hotel lobby.</p>
          <p className="mt-6 text-[14px] text-muted">Transfers are best finalised at least 5 days ahead.</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as EnqKey)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-[4px] bg-paper p-1">
              {(Object.keys(ENQ) as EnqKey[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-[3px] px-5 data-[state=active]:bg-green data-[state=active]:text-paper">{ENQ[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(ENQ) as EnqKey[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-[11px] tracking-[0.2em] text-muted uppercase">Your name</span>
                    <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-xl outline-none transition focus:border-green" />
                  </label>
                  {ENQ[k].fields.map(([f, type, ph]) => (
                    <label key={f} className="block">
                      <span className="text-[11px] tracking-[0.2em] text-muted uppercase">{f}</span>
                      <input type={type} placeholder={ph} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-xl outline-none transition placeholder:text-[15px] placeholder:text-muted/70 focus:border-green" />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 rounded-[4px] bg-ink p-6 text-paper md:p-8">
            <p className="text-[11px] tracking-[0.2em] text-sand uppercase">Your message</p>
            <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-paper/80">{lines.length ? lines.join(" · ") : "Your details will appear here as you type."}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={mail} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] bg-paper px-6 text-ink transition hover:-translate-y-px active:translate-y-0"><Mail className="size-4" aria-hidden /> Email this enquiry</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-paper/30 px-6 text-paper transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
            </div>
            <p className="mt-4 text-[13px] text-paper/55">Opens your email app addressed to {EMAIL}. Nothing is sent until you press send.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export const FAQ: [string, string][] = [
  ["How do I book a Majestic tour?", `Call the tour line on ${PHONE}, email ${EMAIL}, or visit the Majestic Tours desk in the lobby of your hotel.`],
  ["Do tours include a hotel pickup?", "It depends on the tour. The Fantastic Exuma Day Trip includes the hotel transfer; the Flying Cloud evening dinner sail does not. Each tour lists it."],
  ["How far ahead should I book an airport transfer?", "Majestic asks that transportation bookings are finalised at least 5 days in advance, and accessible transport at least 48 hours in advance."],
  ["Do I clear US Immigration in Nassau?", "Yes. Flights to the United States clear US Immigration and Customs in Nassau, and Majestic's departure pickup times allow for the extra time."],
  ["Which languages do your representatives speak?", "Besides English: Spanish, French, German, Italian, Portuguese and Swiss German."],
]

function Faq() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4">
        <Label>06 · Questions</Label>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">Before you book.</h2>
      </Reveal>
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
    </section>
  )
}

function Visit() {
  return (
    <section className="border-t border-line" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-4">
          <Label>07 · Head office</Label>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02]">Hillside Manor, Cumberland Street.</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">P.O. Box N-1401, Nassau, New Providence.</p>
          <p className="mt-6 text-[17px]"><a href={TEL} className="hover:text-green">Tours {PHONE}</a></p>
          <p className="text-[17px]"><a href="tel:+12423222606" className="hover:text-green">Office (242) 322-2606</a></p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-8">
          <iframe title="Map of Majestic Tours head office, Cumberland Street, Nassau" loading="lazy" className="aspect-[16/9] w-full rounded-[4px] border border-line" src="https://www.google.com/maps?q=Hillside+Manor+Cumberland+Street+Nassau+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyInfo /><Explorer /><Evening /><Since /><Languages /><Arrival /><Plan /><Faq /><Visit /></Page>)
