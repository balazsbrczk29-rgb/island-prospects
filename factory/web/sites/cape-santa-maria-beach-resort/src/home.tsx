import { useMemo, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RouteFinder } from "./routes"
import { Page, mount, Reveal, Mask, Head, ease, reveal, M, EMAIL, PHONE_US, TEL_US, PHONE_LOCAL, TEL_LOCAL, BOOK } from "./site"

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 80])
  return (
    <section aria-labelledby="hero-title">
      <motion.div className="relative h-[40svh] min-h-[280px] overflow-hidden bg-[#9fcad4] md:h-[66svh]" initial={{ clipPath: "inset(6% 6% 6% 6%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ duration: 1.4, ease: reveal }}>
        <motion.img style={{ y }} src={M("image-6691a0e182846.jpg")} alt="White villas and palms along the beach at Cape Santa Maria" width={2000} height={1200} fetchPriority="high" className="absolute inset-0 h-[calc(100%+80px)] w-full -translate-y-[80px] object-cover" />
      </motion.div>
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-10 pb-14 md:px-10 md:pt-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="label text-sea">Cape Santa Maria Beach Resort · Long Island, Bahamas</motion.p>
          <h1 id="hero-title" className="mt-5 font-display text-[clamp(2.7rem,6.4vw,6.4rem)] leading-[0.98] tracking-[-0.01em]">
            {["Bungalows on the sand", "at the top of Long Island."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-sea" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.6 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }} className="lg:col-span-4">
          <p className="text-[17px] leading-relaxed text-ink/80">Beachfront bungalows and villas with verandas facing west over the water. Fly nonstop from Fort Lauderdale Executive to Stella Maris, a short taxi away.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={BOOK} className="inline-flex min-h-12 items-center gap-1.5 bg-sea px-6 text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check availability <ArrowUpRight className="size-4" aria-hidden /></a>
            <a href="getting-here.html" className="inline-flex min-h-12 items-center border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">How to get here</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Toll free", PHONE_US, TEL_US], ["Local", PHONE_LOCAL, TEL_LOCAL], ["Email", EMAIL, `mailto:${EMAIL}`], ["Nearest airport", "Stella Maris (SML)", "getting-here.html"]]
  return (
    <section className="bg-sea-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h]) => (
          <li key={k} className="border-b border-paper/15 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9"><span className="label text-blush">{k}</span><span className="mt-2 block font-display text-[clamp(1.25rem,1.7vw,1.6rem)] break-words">{v}</span><span className="mt-4 block h-px w-0 bg-blush transition-all duration-500 group-hover:w-14" aria-hidden /></a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const ROOMS = [
  { n: "Beachfront Bungalow", size: "400 sq ft", beds: "1 king", sleeps: "One bedroom", d: "Classic Bahamian style with a private veranda for the sunset, cool Italian tile floors, ceiling fans and a spacious bathroom. Right beside the Beach House, lining the beach.", img: "capesantamariabeachresortbahamas-accommodations-beachfrontbungalow-03-66991ccce624f.webp" },
  { n: "Two-Bedroom Beachfront Bungalow", size: "580 sq ft", beds: "1 king or 2 queens, 2 twins", sleeps: "Two bedrooms", d: "For families or friends: a furnished veranda, Italian tile, ceiling fans, a small fridge and safe, steps from the sand.", img: "capesantamariabeachresortbahamas-accommodations-twobedroombeachfrontbungalow-01-66991c9f44393.webp" },
  { n: "Beachfront Villa", size: "1,800 sq ft", beds: "1 king, 2 queens, sleeper sofa (select)", sleeps: "Two bedrooms", d: "Large west-facing windows, rich hardwood, a fully equipped kitchen, jetted tubs, washer and dryer, smart TV and high-speed internet, a short stroll from the Beach House.", img: "capesantamariabeachresortbahamas-accommodations-beachfrontvilla-05-66991e903c390.webp" },
]
function Rooms() {
  const [i, setI] = useState(0)
  const r = ROOMS[i]
  return (
    <section id="rooms" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="rooms-title">
      <Head index="01" label="Rooms" id="rooms-title" title={<>Three ways to wake up on the beach.</>} />
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Room types">{ROOMS.map((x, k) => <button key={x.n} role="tab" type="button" aria-selected={i === k} onClick={() => setI(k)} className={`min-h-11 border px-4 text-[15px] transition hover:-translate-y-px ${i === k ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>{x.n}</button>)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={r.n} role="tabpanel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }} className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="overflow-hidden bg-[#9fcad4] lg:col-span-7"><img src={M(r.img)} alt={`${r.n} at Cape Santa Maria`} width={1400} height={930} loading="lazy" className="aspect-[3/2] w-full object-cover transition duration-700 hover:scale-[1.02]" /></div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="font-display text-[clamp(2rem,3vw,2.8rem)] leading-tight">{r.n}</h3>
            <dl className="mt-6 grid grid-cols-2 border-y border-line">{[["Size", r.size], ["Layout", r.sleeps]].map(([k, v]) => <div key={k} className="border-r border-line py-4 last:border-r-0 last:pl-4"><dt className="label text-muted">{k}</dt><dd className="mt-1 font-display text-xl">{v}</dd></div>)}</dl>
            <p className="mt-4 text-[15px] text-muted">Beds: {r.beds}</p>
            <p className="mt-4 text-[17px] leading-relaxed">{r.d}</p>
            <a href={BOOK} className="mt-7 inline-flex min-h-12 items-center gap-1.5 bg-sea px-6 text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check {r.n.toLowerCase()} dates <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="mt-8 text-[14px] text-muted">Every room: air conditioning, coffee and tea maker, in-room safe, refrigerator, hair dryer and daily housekeeping.</p>
    </section>
  )
}

function Route() {
  return (
    <section className="bg-paper-2" aria-labelledby="route-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Head index="02" label="Getting here" id="route-title" title={<>Where are you starting from?</>}><p className="mt-5 max-w-xl text-[17px] text-muted">Pick your gateway and see the route. The resort arranges your taxi from the airport.</p></Head>
        <div className="mt-12"><RouteFinder /></div>
      </div>
    </section>
  )
}

const DAYS = [["Scuba diving", "capesantamariaresort-activities-scubadiving-05-66e896659e06e.jpg"], ["Fishing", "capesantamariabeachresortbahamas-homepage-gallery-02-669182d99e69c.jpg"], ["Snorkeling and nature cruises", "capesantamariaresort-activities-activities-snorkelingandnaturecruise-66ead66f1bede.jpg"], ["Kayaking", "capesantamariabeachresortbahamas-activities-kayaking-66e9f47f6d314.jpg"], ["Paddleboarding", "capesantamariaresort-homepage-gallery-3-6675a03f6b304.jpg"], ["The Beach House bar", "capesantamariaresort-homepage-gallery-1-6675a03c664d7.jpg"]]
function Days() {
  return (
    <section id="days" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="days-title">
      <div className="grid gap-8 lg:grid-cols-12"><div className="lg:col-span-7"><Head index="03" label="Days here" id="days-title" title={<>As busy, or as quiet, as you like.</>} /></div><Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[17px] leading-relaxed text-muted">Dive and snorkel off the cape, fish with the resort's captain, paddle the flats, then end the day at the Beach House Restaurant &amp; Bar.</p></Reveal></div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {DAYS.map(([t, f], i) => (
          <Mask key={t} delay={(i % 3) * 0.08} className={`group relative overflow-hidden bg-[#9fcad4] ${i === 0 ? "md:row-span-2" : ""}`}>
            <img src={M(f)} alt={t} width={800} height={800} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-[1.03] ${i === 0 ? "aspect-square md:h-full md:aspect-auto" : "aspect-square"}`} />
            <p className="absolute bottom-3 left-3 bg-paper px-3 py-1.5 text-[13px] font-semibold">{t}</p>
          </Mask>
        ))}
      </div>
    </section>
  )
}

type F = { k: string; type?: string; options?: string[] }
const ENQ: Record<string, { label: string; fields: F[] }> = {
  stay: { label: "A stay", fields: [{ k: "Arrival", type: "date" }, { k: "Departure", type: "date" }, { k: "Guests", options: ["1", "2", "3-4", "5-6", "7+"] }, { k: "Room", options: ROOMS.map(r => r.n) }] },
  pilot: { label: "Flying in myself", fields: [{ k: "Arrival", type: "date" }, { k: "Aircraft" }, { k: "ETA at SML" }, { k: "Guests", options: ["1", "2", "3-4", "5+"] }] },
  wedding: { label: "A wedding", fields: [{ k: "Date", type: "date" }, { k: "Guests (approx.)", type: "number" }] },
}
function Enquire() {
  const [tab, setTab] = useState("stay")
  const [v, setV] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const c = ENQ[tab]
  const lines = useMemo(() => c.fields.map(f => v[`${tab}:${f.k}`] ? `${f.k}: ${v[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [c, v, tab])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${c.label}`)}&body=${encodeURIComponent(`Hello Cape Santa Maria,\n\n${lines.join("\n")}\n\n${name ? `Name: ${name}` : ""}`)}`
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-sea"
  return (
    <section id="enquire" className="bg-paper-2" aria-labelledby="enq-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="04" label="Enquire" id="enq-title" title={<>Ask the resort.</>}><p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">For live rates, use Check availability. For anything else, fill this in and email it, or call {PHONE_US}.</p></Head></div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-0 rounded-none border border-line bg-paper p-0">{Object.entries(ENQ).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-12 flex-none rounded-none px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{x.label}</TabsTrigger>)}</TabsList>
            {Object.entries(ENQ).map(([k, x]) => <TabsContent key={k} value={k} className="mt-8"><div className="grid gap-6 sm:grid-cols-2">{x.fields.map(f => { const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`, val = v[`${k}:${f.k}`] ?? ""; const set = (s: string) => setV(o => ({ ...o, [`${k}:${f.k}`]: s })); return <div key={f.k}><label htmlFor={id} className="label text-muted">{f.k}</label>{f.options ? <select id={id} value={val} onChange={e => set(e.target.value)} className={input}><option value="">Choose</option>{f.options.map(o => <option key={o}>{o}</option>)}</select> : <input id={id} type={f.type ?? "text"} value={val} onChange={e => set(e.target.value)} className={input} />}</div> })}</div></TabsContent>)}
          </Tabs>
          <div className="mt-6"><label htmlFor="nm" className="label text-muted">Your name</label><input id="nm" value={name} onChange={e => setName(e.target.value)} autoComplete="name" className={input} /></div>
          {tab === "pilot" && <p className="mt-4 text-[14px] text-muted">Private pilots receive 15% off accommodations (some blackout dates apply) when booking by phone.</p>}
          <div className="mt-8 flex flex-col gap-3 bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between md:p-8">
            <p className="text-[15px] text-paper/85">{lines.length ? lines.join(" · ") : "Your details appear here."}</p>
            <a href={href} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-paper px-6 text-ink transition hover:-translate-y-px"><Mail className="size-4" aria-hidden />Email the resort</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [["Which airport is closest?", "Stella Maris Airport (SML). The resort arranges a taxi; taxis accept US and Bahamian dollars."], ["Can I fly from Florida?", "Yes. Makers Air flies nonstop from Fort Lauderdale Executive (FXE) to Stella Maris on Sundays, Tuesdays and Thursdays."], ["What rooms are there?", "Beachfront Bungalows (one bedroom, 400 sq ft), Two-Bedroom Beachfront Bungalows (580 sq ft) and two-bedroom Beachfront Villas (1,800 sq ft)."], ["Do you welcome private pilots?", "Yes. Stella Maris Airport has fueling and customs, and private pilots receive 15% off accommodations, with some blackout dates, when booking by phone."]]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="05" label="Questions" id="faq-title" title={<>Good to know.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">{FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="py-6 text-left font-display text-[1.5rem] font-normal hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent></AccordionItem>)}</Accordion></Reveal>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Rooms /><Route /><Days /><Enquire /><Questions /></Page>)
