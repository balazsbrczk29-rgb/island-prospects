import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Mask, Head, ease, reveal, W, EMAIL, PHONE_US, TEL_US, PHONE_LOCAL, TEL_LOCAL, DOCKWA } from "./site"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-10 pb-16 md:px-10 md:pt-14 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6 lg:pt-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="label text-abaco">White Sound · Green Turtle Cay · Abaco</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,6.2vw,6.6rem)] leading-[0.92] tracking-[-0.025em]">
            {["The Out Islands'", "first resort,", "on the bluff."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i === 2 ? "text-abaco italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.15, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-lg text-[18px] leading-relaxed text-ink/80">Twelve acres of palms and pines between White Sound and the Sea of Abaco, with the only private beach on Green Turtle Cay and a 40-slip marina below.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-8 flex flex-wrap gap-2">
            <a href="#enquire" className="inline-flex min-h-12 items-center rounded-full bg-abaco px-6 text-paper transition hover:-translate-y-px hover:bg-abaco-deep">Ask about a room</a>
            <a href={DOCKWA} className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">Reserve a slip <ArrowUpRight className="size-4" aria-hidden /></a>
          </motion.div>
        </div>
        <div className="relative h-[460px] md:h-[580px] lg:col-span-6">
          <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.2, duration: 1.3, ease: reveal }} className="absolute top-0 right-0 h-[78%] w-[82%] overflow-hidden rounded-[6px] bg-[#9fc0c9]">
            <img src={W("87bc035ef96743bdaf8123a0d77f0481", "jpeg")} alt="Bluff House above the Sea of Abaco" width={1400} height={1000} fetchPriority="high" className="size-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }} className="absolute bottom-0 left-0 h-[46%] w-[48%] overflow-hidden rounded-[6px] border-[6px] border-paper bg-[#9fc0c9]">
            <img src={W("89c8828c6a3443d9a742a1cd5670bab8")} alt="The Bluff House marina in White Sound" width={700} height={550} className="size-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease }} className="absolute right-6 bottom-4 hidden w-[34%] rotate-[2deg] overflow-hidden rounded-[6px] border-[6px] border-paper bg-[#e9cf7a] md:block">
            <img src={W("2e67713140b647b3947e056bfd0b5248")} alt="A stingray in the clear water off Green Turtle Cay" width={480} height={331} className="aspect-[48/33] w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Reservations (US)", PHONE_US, TEL_US], ["Local and WhatsApp", PHONE_LOCAL, TEL_LOCAL], ["Email", EMAIL, `mailto:${EMAIL}`], ["Marina", "40 slips · 7 ft MLW channel", "marina.html"]]
  return (
    <section className="bg-abaco-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h]) => (
          <li key={k} className="border-b border-paper/15 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="label text-conch">{k}</span>
              <span className="mt-2 block font-display text-[clamp(1.25rem,1.7vw,1.6rem)] break-words">{v}</span>
              <span className="mt-4 block h-px w-0 bg-conch transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const COTTAGES = ["Summerset", "La Conchita", "Turtle Bluff Villa", "Pineapple House Villa", "Sweet Guava Villa", "Blue Bay Cottage", "Dove Cottage", "Coral Haven", "Sunset Cottage 4"]
function Stay() {
  const [mode, setMode] = useState<"suite" | "cottage">("suite")
  return (
    <section id="stay" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="stay-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7"><Head index="01" label="Stay" id="stay-title" title={<>A suite over the water, or a cottage of your own.</>} /></div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12">
          <div className="inline-flex rounded-full border border-line bg-paper-2 p-1" role="tablist" aria-label="Accommodation type">
            {(["suite", "cottage"] as const).map(m => <button key={m} role="tab" type="button" aria-selected={mode === m} onClick={() => setMode(m)} className={`min-h-11 rounded-full px-5 text-[15px] transition ${mode === m ? "bg-ink text-paper" : "hover:bg-paper"}`}>{m === "suite" ? "Hotel suites" : "Cottages & villas"}</button>)}
          </div>
        </Reveal>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={mode} role="tabpanel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          {mode === "suite" ? (
            <>
              <div className="overflow-hidden rounded-[6px] bg-[#9fc0c9] lg:col-span-7"><img src={W("18065ec90c1649389590808c8f920fd0")} alt="View over the Sea of Abaco from Bluff House" width={960} height={663} loading="lazy" className="aspect-[3/2] w-full object-cover transition duration-700 hover:scale-[1.02]" /></div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="font-display text-[clamp(4rem,8vw,6.5rem)] leading-none text-abaco">8</p>
                <p className="mt-2 font-display text-[1.8rem]">spacious suites</p>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">Air-conditioned, with a hint of the Caribbean and the British West Indies. Every suite has a balcony with sunset and moonrise views of the Sea of Abaco, steps from the island's only private beach.</p>
                <p className="mt-5 text-[15px] text-muted">Upper suites with a king, lower suites with a queen, each with its own living area.</p>
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-7">
                <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
                  {COTTAGES.map((c, i) => <li key={c} className="group flex items-baseline gap-4 border-b border-line py-4 sm:odd:pr-6"><span className="label text-abaco">{String(i + 1).padStart(2, "0")}</span><span className="font-display text-[1.6rem] transition group-hover:translate-x-1">{c}</span></li>)}
                </ul>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="font-display text-[clamp(4rem,8vw,6.5rem)] leading-none text-abaco">1–4</p>
                <p className="mt-2 font-display text-[1.8rem]">bedroom cottages and villas</p>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">Private cottages and villas across the property, for families, friends and long stays. Ask which one fits your group and your dates.</p>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function Marina() {
  return (
    <section className="relative bg-ink text-paper" aria-labelledby="marina-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-center">
        <Mask className="overflow-hidden rounded-[6px] bg-[#2a4456] lg:col-span-7"><img src={W("4778611dd1fa4164b42649a1e032ddd9")} alt="Boats in their slips at the Bluff House marina" width={1600} height={660} loading="lazy" className="aspect-[16/9] w-full object-cover" /></Mask>
        <div className="lg:col-span-4 lg:col-start-9">
          <Head dark index="02" label="The marina" id="marina-title" title={<>Forty slips in White Sound.</>}>
            <p className="mt-6 text-[17px] leading-relaxed text-paper/75">From the Sea of Abaco, a dredged 7 ft (MLW) channel leads into White Sound. Every boat gets its own finger pier with power, water and free Wi-Fi, and the dockmaster meets you.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href="marina.html" className="inline-flex min-h-12 items-center rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Specs and slip estimate</a>
              <a href={DOCKWA} className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-paper/30 px-5 transition hover:-translate-y-px hover:border-paper">Dockwa <ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
          </Head>
        </div>
      </div>
    </section>
  )
}

function Dining() {
  return (
    <section id="dining" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="dine-title">
      <Head index="03" label="Dining and the beach" id="dine-title" title={<>Two bars, one harbour, one private beach.</>} />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-[6px] bg-paper-2 p-7 md:p-10">
          <p className="label text-abaco">Harborside</p>
          <h3 className="mt-3 font-display text-[2.2rem]">The Boathouse Bar &amp; Restaurant</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">Breakfast and dinner six days a week, outside on the harborside deck or inside the air-conditioned dining room with water views.</p>
          <a href="tel:+12428217267" className="mt-6 inline-flex items-center gap-2"><Phone className="size-4" aria-hidden /><span className="ulink">Restaurants: +1 (242) 821-7267</span></a>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[6px] bg-conch/60 p-7 md:p-10">
          <p className="label text-abaco">On the Sea of Abaco</p>
          <h3 className="mt-3 font-display text-[2.2rem]">Tranquil Turtle Beach Bar</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/75">Beside the private beach and dock: swim, play volleyball, kayak, lounge and eat on the patio deck. Voted number 6 of the Top 25 Beach Bars in the Caribbean by Caribbean Journal.</p>
        </Reveal>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
        <Mask className="overflow-hidden rounded-[6px] bg-[#9fc0c9]"><img src={W("238dcdb245b540d2a087a3df9290e474")} alt="A diver beside a sea turtle on the reef" width={480} height={320} loading="lazy" className="aspect-[3/2] w-full object-cover" /></Mask>
        <Mask delay={0.1} className="overflow-hidden rounded-[6px] bg-[#9fc0c9]"><img src={W("99ea8aaa601544ff861617ced920d2af", "jpeg")} alt="A wedding at Bluff House" width={480} height={331} loading="lazy" className="aspect-[3/2] w-full object-cover" /></Mask>
        <Mask delay={0.2} className="col-span-2 overflow-hidden rounded-[6px] bg-[#9fc0c9] md:col-span-1"><img src={W("ebd836a292384a7193593c0c11727400")} alt="Bluff House grounds" width={818} height={543} loading="lazy" className="aspect-[3/2] w-full object-cover" /></Mask>
      </div>
    </section>
  )
}

type F = { k: string; type?: string; options?: string[] }
const ENQ: Record<string, { label: string; fields: F[] }> = {
  room: { label: "A room", fields: [{ k: "Arrival", type: "date" }, { k: "Departure", type: "date" }, { k: "Guests", options: ["1-2", "3-4", "5-6", "7-8"] }, { k: "Interested in", options: ["Hotel suite", "Cottage or villa", "Not sure"] }] },
  slip: { label: "A slip", fields: [{ k: "Boat name" }, { k: "LOA (ft)", type: "number" }, { k: "Draft (ft)", type: "number" }, { k: "Power", options: ["50 amp", "100 amp"] }, { k: "Arrival", type: "date" }, { k: "Departure", type: "date" }] },
  wedding: { label: "A wedding or event", fields: [{ k: "Date" , type: "date" }, { k: "Guests (approx.)", type: "number" }, { k: "Type", options: ["Wedding", "Vow renewal", "Family gathering", "Other"] }] },
}
function Enquire() {
  const [tab, setTab] = useState("room")
  const [v, setV] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const c = ENQ[tab]
  const lines = useMemo(() => c.fields.map(f => v[`${tab}:${f.k}`] ? `${f.k}: ${v[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [c, v, tab])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${c.label}`)}&body=${encodeURIComponent(`Hello Bluff House,\n\nI'd like to ask about ${c.label.toLowerCase()}.\n${lines.join("\n")}\n\n${name ? `Name: ${name}` : ""}`)}`
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-abaco"
  return (
    <section id="enquire" className="bg-paper-2" aria-labelledby="enq-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="04" label="Enquire" id="enq-title" title={<>Ask about a room.</>}><p className="mt-6 max-w-sm text-[18px] leading-relaxed text-muted">Fill in what you know and it becomes an email to the front desk. Or call: US {PHONE_US}, local {PHONE_LOCAL}.</p></Head></div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper p-1">{Object.entries(ENQ).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{x.label}</TabsTrigger>)}</TabsList>
            {Object.entries(ENQ).map(([k, x]) => (
              <TabsContent key={k} value={k} className="mt-8"><div className="grid gap-6 sm:grid-cols-2">{x.fields.map(f => { const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`, val = v[`${k}:${f.k}`] ?? ""; const set = (s: string) => setV(o => ({ ...o, [`${k}:${f.k}`]: s })); return <div key={f.k}><label htmlFor={id} className="label text-muted">{f.k}</label>{f.options ? <select id={id} value={val} onChange={e => set(e.target.value)} className={input}><option value="">Choose</option>{f.options.map(o => <option key={o}>{o}</option>)}</select> : <input id={id} type={f.type ?? "text"} value={val} onChange={e => set(e.target.value)} className={input} />}</div> })}</div></TabsContent>
            ))}
          </Tabs>
          <div className="mt-6"><label htmlFor="nm" className="label text-muted">Your name</label><input id="nm" value={name} onChange={e => setName(e.target.value)} autoComplete="name" className={input} /></div>
          <div className="mt-10 rounded-[6px] bg-ink p-6 text-paper md:p-8">
            <p className="label text-conch">Your enquiry</p>
            <p className="mt-3 min-h-12 text-[16px] text-paper/85">{lines.length ? lines.join(" · ") : "Your details will appear here."}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={tab === "slip" ? DOCKWA : href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">{tab === "slip" ? <>Reserve on Dockwa <ArrowUpRight className="size-4" aria-hidden /></> : <><Mail className="size-4" aria-hidden />Email the front desk</>}</a>
              {tab === "slip" && <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/30 px-5 transition hover:-translate-y-px hover:border-paper"><Mail className="size-4" aria-hidden />Or email it</a>}
            </div>
            <p className="mt-3 text-[13px] text-paper/60">Opens your email app with your details filled in.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [["How deep is the channel into Bluff House marina?", "The dredged White Sound channel coming into Bluff House is 7 ft at MLW."], ["How many slips does the marina have?", "40 slips, each with its own finger pier, power, water and free Wi-Fi; 50 and 100 amp shore power."], ["What accommodation is there?", "Eight air-conditioned hotel suites with balconies over the Sea of Abaco, plus private cottages and villas with one to four bedrooms."], ["How do I book?", "Email frontdesk@bluffhouse.com or call +1 (954) 284-7341 or +1 (242) 824-9550. Slips can be reserved on Dockwa."]]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-24 md:px-10 md:pt-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="05" label="Questions" id="faq-title" title={<>Good to know.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="py-6 text-left font-display text-[1.5rem] font-normal hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Find() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="find-title">
      <div className="lg:col-span-5"><Head index="06" label="Find us" id="find-title" title={<>White Sound, Green Turtle Cay.</>}><p className="mt-5 max-w-md text-[18px] text-muted">By boat through the White Sound channel, or by ferry with pick-up and drop-off at the Bluff House dock.</p><a href="history.html" className="group mt-8 inline-flex items-center gap-2"><span className="ulink">A little history, since the early 1950s</span><ArrowUpRight className="size-4" aria-hidden /></a></Head></div>
      <Reveal delay={0.1} className="overflow-hidden rounded-[6px] border border-line lg:col-span-7"><iframe title="Map of Bluff House, Green Turtle Cay" loading="lazy" className="h-[420px] w-full" src="https://www.google.com/maps?q=Bluff+House+Beach+Resort,+Green+Turtle+Cay,+Abaco&output=embed" /></Reveal>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Stay /><Marina /><Dining /><Enquire /><Questions /><Find /></Page>)
