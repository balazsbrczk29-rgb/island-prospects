import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Mail, Phone, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Head, ease, reveal, R, PHONE, TEL, PHONE2, TEL2, EMAIL } from "./site"

function Hero() {
  const [name, setName] = useState("")
  const shown = name.trim() || "Your Name Here"
  return (
    <section className="relative overflow-hidden bg-navy text-paper" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-120px)] max-w-[1440px] items-center gap-12 px-5 py-14 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-yellow">Cheryl's Bahamas Taxi and Tours · Nassau and Paradise Island</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.9rem,6.6vw,6.6rem)] leading-[0.95] font-bold tracking-[-0.045em]">
            {["Look for your name", "at Nassau arrivals."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-yellow" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease }} className="mt-7 max-w-lg text-[18px] leading-relaxed text-paper/85">For over 25 years, Cheryl's has met visitors at the airport and shown them the island: air-conditioned taxis, trained drivers in navy and yellow, and private tours in English or Spanish.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease }} className="mt-8 flex flex-col gap-2 sm:flex-row">
            <a href="#airport" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-bold text-navy transition hover:-translate-y-px">Book my airport pickup <ArrowRight className="size-4" aria-hidden /></a>
            <a href="#plan" className="inline-flex min-h-13 items-center justify-center rounded-full border-2 border-paper/40 px-6 py-3.5 font-bold transition hover:-translate-y-px hover:border-paper">Plan a private tour</a>
          </motion.div>
        </div>
        <div className="lg:col-span-6">
          <motion.div initial={{ opacity: 0, rotate: -6, y: 40 }} animate={{ opacity: 1, rotate: -2.5, y: 0 }} transition={{ delay: 0.35, duration: 1.1, ease }} className="mx-auto max-w-[560px] rounded-[10px] bg-paper p-6 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] md:p-9">
            <div className="flex items-center justify-between border-b-4 border-yellow pb-3"><span className="label text-navy">Cheryl's Bahamas Taxi</span><span className="label text-muted">Arrivals</span></div>
            <AnimatePresence mode="wait"><motion.p key={shown} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mt-6 min-h-[2.2em] font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-bold tracking-[-0.03em] break-words text-navy">{shown}</motion.p></AnimatePresence>
            <p className="mt-4 text-[14px] text-muted">Welcome to Nassau</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="mx-auto mt-8 max-w-[560px]">
            <label htmlFor="sign" className="label text-yellow">Type the name for your sign</label>
            <input id="sign" value={name} maxLength={40} onChange={e => setName(e.target.value)} placeholder="Your name or family" className="mt-2 block min-h-12 w-full rounded-full border-2 border-paper/30 bg-transparent px-5 text-[17px] text-paper placeholder:text-paper/45 outline-none focus:border-yellow" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Office line", PHONE, TEL], ["Second line", PHONE2, TEL2], ["Hours", "9am to 6pm, 7 days", "#contact"], ["Licensed", "Registered Taxi Service #1080", "#airport"]]
  return (
    <section className="bg-yellow text-navy" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h], i) => (
          <li key={k} className="border-b border-navy/15 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/25 md:px-10 md:py-9"><span className="label">{k}</span><span className={`mt-2 block font-display font-bold tracking-tight ${i < 2 ? "whitespace-nowrap text-[clamp(1.7rem,2.3vw,2.3rem)]" : "text-[1.3rem] leading-snug"}`}>{v}</span><span className="mt-3 block h-[3px] w-0 bg-navy transition-all duration-500 group-hover:w-14" aria-hidden /></a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Airport() {
  const pts = ["A representative waits in the arrivals lounge with your name on a card.", "Drivers and reps wear a navy blue and yellow uniform with the company logo.", "Air-conditioned vehicles and drivers who know the roads.", "Car seats and booster seats at no charge, just ask.", "Lunch, dinner and downtown drop-offs while you're here.", "Baby-sitting and wheelchair rentals on request."]
  return (
    <section id="airport" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="air-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Head index="01" label="Airport pickup" id="air-title" title={<>The most popular ride: airport to your door.</>} />
          <ul className="mt-10">{pts.map((p, i) => <Reveal key={p} delay={i * 0.04}><li className="flex gap-4 border-t border-line py-4 last:border-b"><Check className="mt-1 size-5 shrink-0 text-navy" aria-hidden /><span className="text-[17px]">{p}</span></li></Reveal>)}</ul>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <div className="overflow-hidden rounded-[10px] bg-[#c9d3e4]"><img src={R("fleet.jpeg")} alt="Cheryl's air-conditioned taxi fleet" width={900} height={600} loading="lazy" className="aspect-[3/2] w-full object-cover transition duration-700 hover:scale-[1.03]" /></div>
          <div className="mt-4 overflow-hidden rounded-[10px] bg-[#c9d3e4]"><img src={R("cheryl-taxi.jpeg")} alt="A Cheryl's Bahamas Taxi vehicle" width={900} height={400} loading="lazy" className="aspect-[9/4] w-full object-cover transition duration-700 hover:scale-[1.03]" /></div>
        </Reveal>
      </div>
    </section>
  )
}

const STOPS = [
  { id: "forts", n: "The Forts and the 66 Steps", d: "Fort Charlotte, Fort Fincastle and the 66 Steps, Fort Montague. Re-enactments Wednesday and Friday at 11:30am, cannon at noon.", img: "the-forts.png" },
  { id: "conch", n: "Conch demonstration", d: "How conch is cleaned, then fresh conch salad: $10 a bowl, shared by four.", img: "conch.png" },
  { id: "fry", n: "The Fish Fry", d: "Lunch with the locals, 15 to 20 restaurants of Bahamian seafood.", img: "fish-fry.png" },
  { id: "junkanoo", n: "Junkanoo World Museum", d: "Drums, horns, cowbells and costumes you can try on.", img: "junkanoo.png" },
  { id: "zoo", n: "Ardastra Gardens Zoo", d: "Four acres of gardens and the flamingo show at 10:30am. Entry $18 per person, under 4 free.", img: "ardastra-gardens-zoo.png" },
  { id: "beach", n: "Time at Love Beach", d: "A secluded beach away from town. Snorkelling $20.", img: "time-at-the-beach.png" },
  { id: "rumcake", n: "Rum Cake Factory", d: "Free tasting: pina colada, amaretto, banana, cinnamon and more.", img: "rum-cake-factory.png" },
  { id: "clifton", n: "Clifton Heritage Park", d: "A 45-minute historical immersion, with ATV and snorkel options.", img: "clifton-heritage-park.png" },
]
const LENGTHS = ["Sightseeing and shopping, about 3 hours", "Full day with picnic lunch, at least 8 hours (6+ people)"]

function Plan() {
  const [picked, setPicked] = useState<string[]>(["forts", "fry"])
  const [len, setLen] = useState(0)
  const [people, setPeople] = useState(2)
  const [lang, setLang] = useState("English")
  const [date, setDate] = useState("")
  const toggle = (id: string) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const chosen = STOPS.filter(s => picked.includes(s.id))
  const body = `Hello Cheryl,\n\nI'd like a private tour.\nLength: ${LENGTHS[len]}\nStops: ${chosen.map(s => s.n).join(", ") || "Please suggest"}\nPeople: ${people}\nLanguage: ${lang}\n${date ? `Date: ${date}\n` : ""}\nThank you!`
  return (
    <section id="plan" className="bg-paper-2" aria-labelledby="plan-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12"><div className="lg:col-span-7"><Head index="02" label="Plan a private tour" id="plan-title" title={<>Pick the stops. We'll drive.</>} /></div><Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[17px] leading-relaxed text-muted">Every tour is private and built around you. Drinks are included; most historic sites charge $3 to $5 entry.</p></Reveal></div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {STOPS.map(s => {
              const on = picked.includes(s.id)
              return (
                <li key={s.id}>
                  <button type="button" aria-pressed={on} onClick={() => toggle(s.id)} className={`group flex w-full gap-4 rounded-[10px] border-2 p-3 text-left transition hover:-translate-y-0.5 ${on ? "border-navy bg-paper" : "border-transparent bg-paper/60 hover:border-navy/30"}`}>
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-[6px] bg-[#c9d3e4]"><img src={R(s.img)} alt="" width={160} height={160} loading="lazy" className="size-full object-cover" /></span>
                    <span><span className="flex items-center gap-2 font-display text-[1.15rem] font-bold text-navy">{on && <Check className="size-4" aria-hidden />}{s.n}</span><span className="mt-1 block text-[14px] leading-snug text-muted">{s.d}</span></span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="lg:col-span-5">
            <div className="rounded-[10px] bg-navy p-6 text-paper md:p-8">
              <p className="label text-yellow">Your tour</p>
              <div className="mt-4 grid gap-2">{LENGTHS.map((l, i) => <button key={l} type="button" aria-pressed={len === i} onClick={() => setLen(i)} className={`min-h-11 rounded-full border-2 px-4 text-left text-[15px] transition ${len === i ? "border-yellow bg-yellow font-bold text-navy" : "border-paper/25 hover:border-paper"}`}>{l}</button>)}</div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div><label htmlFor="ppl" className="label text-paper/70">People</label><input id="ppl" type="number" min={1} max={30} value={people} onChange={e => setPeople(Math.max(1, +e.target.value || 1))} className="mt-2 block min-h-12 w-full rounded-full border-2 border-paper/25 bg-transparent px-4 text-[17px] outline-none focus:border-yellow" /></div>
                <div><label htmlFor="lang" className="label text-paper/70">Language</label><select id="lang" value={lang} onChange={e => setLang(e.target.value)} className="mt-2 block min-h-12 w-full rounded-full border-2 border-paper/25 bg-navy px-4 text-[17px] outline-none focus:border-yellow"><option>English</option><option>Spanish</option></select></div>
                <div className="col-span-2"><label htmlFor="dt" className="label text-paper/70">Date</label><input id="dt" type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-2 block min-h-12 w-full rounded-full border-2 border-paper/25 bg-transparent px-4 text-[17px] outline-none focus:border-yellow" /></div>
              </div>
              <ol className="mt-6 border-t border-paper/20 pt-4 text-[15px]">{chosen.length ? chosen.map((s, i) => <li key={s.id} className="flex gap-3 py-1"><span className="font-bold text-yellow">{i + 1}</span>{s.n}</li>) : <li className="text-paper/60">Pick a few stops, or leave it to Cheryl's.</li>}</ol>
              {len === 1 && people < 6 && <p className="mt-3 text-[13px] text-yellow">The picnic full day is for groups of 6 or more.</p>}
              <div className="mt-6 grid gap-2">
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Private tour request")}&body=${encodeURIComponent(body)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-yellow px-6 font-bold text-navy transition hover:-translate-y-px"><Mail className="size-4" aria-hidden />Email this plan</a>
                <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden />Or call {PHONE}</a>
              </div>
            </div>
          </div>
        </div>
        <Reveal><a href="tours.html" className="mt-10 inline-flex items-center gap-2 font-bold text-navy"><span className="ulink">See every tour, from swimming pigs to glass-bottom boats</span><ArrowRight className="size-4" aria-hidden /></a></Reveal>
      </div>
    </section>
  )
}

type F = { k: string; type?: string; options?: string[] }
const ENQ: Record<string, { label: string; fields: F[] }> = {
  pickup: { label: "Airport pickup", fields: [{ k: "Flight number" }, { k: "Arrival date", type: "date" }, { k: "Arrival time", type: "time" }, { k: "Passengers", type: "number" }, { k: "Going to (hotel or address)" }, { k: "Car or booster seats", options: ["None", "1", "2", "3+"] }] },
  ride: { label: "A taxi on the island", fields: [{ k: "Date", type: "date" }, { k: "Pickup time", type: "time" }, { k: "From" }, { k: "To" }, { k: "Passengers", type: "number" }] },
}
function Book() {
  const [tab, setTab] = useState("pickup")
  const [v, setV] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const c = ENQ[tab]
  const lines = useMemo(() => c.fields.map(f => v[`${tab}:${f.k}`] ? `${f.k}: ${v[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [c, v, tab])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(c.label)}&body=${encodeURIComponent(`Hello Cheryl,\n\n${c.label} request:\n${lines.join("\n")}\n\nName on the sign: ${name}`)}`
  const input = "mt-2 block min-h-12 w-full border-b-2 border-ink/20 bg-transparent text-[17px] outline-none transition focus:border-navy"
  return (
    <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="book-title">
      <div className="lg:col-span-4"><Head index="03" label="Book a ride" id="book-title" title={<>Book your pickup.</>}><p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Send your flight details by email, or call the office from 9am to 6pm. Outside those hours, call {PHONE}.</p></Head></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper-2 p-1">{Object.entries(ENQ).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[15px] data-[state=active]:bg-navy data-[state=active]:text-paper">{x.label}</TabsTrigger>)}</TabsList>
          {Object.entries(ENQ).map(([k, x]) => <TabsContent key={k} value={k} className="mt-8"><div className="grid gap-6 sm:grid-cols-2">{x.fields.map(f => { const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`, val = v[`${k}:${f.k}`] ?? ""; const set = (s: string) => setV(o => ({ ...o, [`${k}:${f.k}`]: s })); return <div key={f.k}><label htmlFor={id} className="label text-muted">{f.k}</label>{f.options ? <select id={id} value={val} onChange={e => set(e.target.value)} className={input}><option value="">Choose</option>{f.options.map(o => <option key={o}>{o}</option>)}</select> : <input id={id} type={f.type ?? "text"} value={val} onChange={e => set(e.target.value)} className={input} />}</div> })}</div></TabsContent>)}
        </Tabs>
        <div className="mt-6"><label htmlFor="nm" className="label text-muted">Name for the sign</label><input id="nm" value={name} onChange={e => setName(e.target.value)} autoComplete="name" className={input} /></div>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-7 font-bold text-paper transition hover:-translate-y-px"><Mail className="size-4" aria-hidden />Email my booking</a>
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-navy/30 px-6 font-bold text-navy transition hover:-translate-y-px hover:border-navy"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
        </div>
        <p className="mt-3 text-[13px] text-muted">Opens your email app with your details filled in. All major credit cards accepted.</p>
      </Reveal>
    </section>
  )
}

const FAQ = [["Where will I find my driver?", "In the arrivals lounge at Nassau airport, holding a card with your name. Drivers and representatives wear a navy blue and yellow uniform with the company logo."], ["Do you have car seats?", "Yes, car and booster seats at no charge. Just let us know."], ["Can I have a tour in Spanish?", "Yes. All tours are available in English or Spanish, and Spanish translators are available."], ["How do I pay?", "All major credit cards are accepted."], ["When can I call?", `The office is open 9am to 6pm, seven days a week, on ${PHONE} or ${PHONE2}. At all other times call ${PHONE} or 242-525-5729.`]]
function Questions() {
  return (
    <section className="bg-paper-2" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="04" label="Questions" id="faq-title" title={<>Before you land.</>} /></div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">{FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="py-6 text-left font-display text-[1.3rem] font-bold text-navy hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent></AccordionItem>)}</Accordion></Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Airport /><Plan /><Book /><Questions /></Page>)
