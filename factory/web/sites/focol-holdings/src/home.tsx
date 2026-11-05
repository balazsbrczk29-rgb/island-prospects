import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Index, ease, PHONE, TEL, EMAIL } from "./site"
import Chain, { type Node } from "./Chain"

const IMG = "https://www.focol.com/wp-content/uploads/2026/02/"

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-8 pb-10 md:px-10 md:pt-10">
        <div className="flex flex-wrap items-start justify-between gap-4 text-[13px] text-muted">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>FOCOL Holdings Limited, listed on BISX</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.15 }}>The Bahamas and Turks and Caicos Islands</motion.span>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <h1 id="hero-title" className="font-display text-[clamp(3rem,7.4vw,8.4rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-ink lg:col-span-9">
            {["From the tanker", "to the light switch."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.15, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="self-end lg:col-span-3">
            <p className="text-[17px] leading-relaxed text-muted">FOCOL is the largest integrated energy company in The Bahamas: fuel import and distribution, power generation, LNG, solar and service stations, for over 50 years. It is the sole licensed Shell distributor for The Bahamas and the Turks and Caicos Islands.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#companies" className="group inline-flex min-h-12 items-center gap-2 rounded-[6px] bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-0.5 hover:bg-blue active:translate-y-0">Find the right company <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-[6px] border border-ink/20 px-5 text-[15px] transition hover:-translate-y-0.5 hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </motion.div>
        </div>
        <div className="relative pt-6">
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0"><Chain className="h-auto w-[900px] max-w-none md:w-full" /></div>
          <p className="mt-2 text-[12px] text-muted">The energy chain FOCOL's companies run. Illustration, not to scale.</p>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Head office", PHONE, TEL],
    ["Freeport Oil", "+1 (242) 352-8131", "tel:+12423528131"],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Where", "Clifton Pier, Nassau and Lucayan Harbour, Freeport", "#islands"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.4fr]">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-paper/15 not-first:border-t sm:not-first:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:not-first:border-l">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="text-[13px] text-sky">{k}</span>
              <span className={`mt-1 block font-display leading-tight font-semibold ${i === 0 ? "text-[clamp(1.6rem,2.2vw,2.2rem)] whitespace-nowrap" : "text-[clamp(1.15rem,1.4vw,1.4rem)]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-sky transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const STEPS: { id: Node; title: string; co: string; text: string }[] = [
  { id: "import", title: "Import by sea", co: "FOCOL Group", text: "Petroleum products arrive by ship for import and distribution across The Bahamas and the Turks and Caicos Islands. LNG for New Providence will arrive by marine vessel, supplied by Shell from the United States." },
  { id: "store", title: "Store and distribute", co: "Sun Oil Limited and Freeport Oil Company", text: "Sun Oil supplies gasoline, diesel, marine fuel and aviation fuel to commercial and residential customers across the country. Freeport Oil was established in 1967 by the Grand Bahama Port Authority to supply Freeport's industrial and commercial community." },
  { id: "lng", title: "Convert LNG to gas", co: "New Providence Gas Ltd.", text: "The LNG regasification terminal at Clifton Pier is moving from plans to construction. It will receive LNG, store it and convert it back to natural gas for power generation on New Providence. Sun Oil holds 60 percent, Shell 40 percent." },
  { id: "power", title: "Support power generation", co: "Bahamas Utilities Company Ltd.", text: "Services that support utilities, power generation and the essential infrastructure that keeps communities and industries on New Providence running." },
  { id: "solar", title: "Build solar", co: "Bahamas Solar & Renewables", text: "Utility-scale, commercial and industrial, micro-grid and distributed renewable projects, from development and construction to long-term operation and maintenance." },
  { id: "retail", title: "Serve drivers", co: "Convenience Retailing Limited and Grand Sun Investments", text: "Shell service stations across New Providence, run since 2007 by the Group's retail arm, and stations across Freeport and Grand Bahama with convenience stores and commercial fueling." },
]

function ChainStory() {
  const [active, setActive] = useState<Node>("import")
  return (
    <section id="chain" className="scroll-mt-20" aria-labelledby="chain-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-36">
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6"><Index n="01">What we run</Index>
            <h2 id="chain-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">Six links in one energy chain.</h2></div>
          <p className="self-end text-[17px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">Each FOCOL company runs one part of the journey. Scroll, and the drawing shows where each one works.</p>
        </Reveal>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 md:px-10 md:pb-36 lg:grid-cols-12">
        <div className="sticky top-[66px] z-10 -mx-5 bg-paper/95 px-5 py-3 backdrop-blur lg:top-28 lg:col-span-7 lg:mx-0 lg:h-fit lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
          <div className="rounded-[10px] border border-line bg-white p-3 md:p-6">
            <Chain active={active} animate={false} className="h-auto w-full" />
          </div>
        </div>
        <ol className="lg:col-span-4 lg:col-start-9">
          {STEPS.map((s, i) => (
            <motion.li key={s.id} onViewportEnter={() => setActive(s.id)} viewport={{ margin: "-45% 0px -45% 0px" }} className="flex min-h-[44vh] flex-col justify-center border-t border-line py-10 lg:min-h-[62vh]">
              <button type="button" onClick={() => setActive(s.id)} className="text-left">
                <span className={`text-[13px] tabular-nums transition ${active === s.id ? "text-blue" : "text-muted"}`}>{String(i + 1).padStart(2, "0")} / 06</span>
                <span className={`mt-3 block font-display text-[clamp(1.8rem,2.6vw,2.6rem)] leading-none font-semibold tracking-[-0.03em] transition ${active === s.id ? "text-ink" : "text-ink/40"}`}>{s.title}</span>
              </button>
              <p className="mt-4 text-[14px] text-blue">{s.co}</p>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const PHOTOS = [
  { src: IMG + "pattern-800x800.jpg", alt: "LNG carrier delivering fuel to The Bahamas", t: "LNG" },
  { src: IMG + "pattern4-800x800.jpg", alt: "Gas turbine used for power generation", t: "Power generation" },
  { src: IMG + "621238430_1469799591817212_5660954664616883644_n-Custom-800x800.jpg", alt: "Solar park in The Bahamas", t: "Solar" },
  { src: IMG + "pattern2-800x800.jpg", alt: "FOCOL employee fuelling a customer's car at the pump", t: "Fuel" },
]

function Work() {
  return (
    <section className="bg-paper-2" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div><Index n="02">On the ground</Index>
            <h2 id="work-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">Fuel, LNG, power, solar.</h2></div>
          <p className="max-w-sm text-[17px] text-muted">Photographs from FOCOL's own channels.</p>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-12">
          {PHOTOS.map((p, i) => (
            <motion.figure key={p.src} initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.2, delay: i * 0.08, ease: [0.77, 0, 0.175, 1] }} className={`group relative overflow-hidden rounded-[10px] bg-line ${["lg:col-span-5 lg:row-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-7"][i]}`}>
              <img src={p.src} alt={p.alt} width={800} height={800} loading="lazy" className={`size-full object-cover transition duration-700 group-hover:scale-[1.03] ${i === 0 ? "aspect-square lg:aspect-auto" : i === 3 ? "aspect-square lg:aspect-[16/7]" : "aspect-square"}`} />
              <figcaption className="absolute bottom-3 left-3 rounded-[4px] bg-paper/90 px-2.5 py-1 text-[13px] text-ink">{p.t}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const COMPANIES = [
  { id: "fuel-np", need: "Fuel in New Providence", co: "Sun Oil Limited", what: "Gasoline, diesel, marine fuel and aviation fuel for commercial and residential customers.", phone: "+1 (242) 702-3000", tel: "tel:+12427023000", where: "Clifton Pier, Nassau" },
  { id: "fuel-gb", need: "Fuel in Grand Bahama", co: "Freeport Oil Company", what: "Petroleum products for Freeport's industrial and commercial community since 1967.", phone: "+1 (242) 352-8131", tel: "tel:+12423528131", where: "Lucayan Harbour Area, Freeport" },
  { id: "stations-gb", need: "Service stations, Grand Bahama", co: "Grand Sun Investments Ltd", what: "Retail fuel, convenience stores and commercial fueling at stations across Freeport and Grand Bahama.", phone: "(242) 351-3104", tel: "tel:+12423513104", where: "East Mall Drive, Freeport" },
  { id: "stations-np", need: "Service stations, New Providence", co: "Convenience Retailing Limited", what: "The Group's network of fuel service stations across New Providence.", phone: "+1 (242) 362-6673", tel: "tel:+12423626673", where: "Old Fort Bay, Nassau" },
  { id: "solar", need: "A solar project", co: "Bahamas Solar & Renewables", what: "Utility-scale, commercial and industrial, micro-grid and distributed renewable energy, built and maintained.", phone: "+1 (242) 702-3000", tel: "tel:+12427023000", where: "Clifton Pier, Nassau" },
  { id: "lng", need: "LNG and natural gas", co: "New Providence Gas Ltd.", what: "Operator of the LNG regasification terminal at Clifton Pier, a joint venture of Sun Oil and Shell.", phone: "+1 (242) 702-3000", tel: "tel:+12427023000", where: "Clifton Pier, Nassau" },
  { id: "power", need: "Utilities and power", co: "Bahamas Utilities Company Ltd.", what: "Support for utilities, power generation and essential infrastructure on New Providence.", phone: "+1 (242) 702-3000", tel: "tel:+12427023000", where: "Clifton Pier, Nassau" },
]

function Companies() {
  const [sel, setSel] = useState(COMPANIES[0].id)
  const c = COMPANIES.find(x => x.id === sel)!
  return (
    <section id="companies" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36" aria-labelledby="co-title">
      <Reveal><Index n="03">Companies</Index>
        <h2 id="co-title" className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">What do you need? We'll point you to the right company.</h2></Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <ul className="border-t border-line" role="listbox" aria-label="Choose what you need">
            {COMPANIES.map(x => (
              <li key={x.id} className="border-b border-line">
                <button type="button" role="option" aria-selected={sel === x.id} onClick={() => setSel(x.id)} className={`group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[clamp(1.1rem,1.4vw,1.35rem)] transition ${sel === x.id ? "text-ink" : "text-muted hover:text-ink"}`}>
                  <span className="transition group-hover:translate-x-1">{x.need}</span>
                  <span className={`size-2.5 shrink-0 rounded-full transition ${sel === x.id ? "bg-blue" : "bg-line group-hover:bg-ink/40"}`} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="rounded-[10px] bg-ink p-8 text-paper md:p-12" aria-live="polite">
            <p className="text-[13px] text-sky">{c.need}</p>
            <p className="mt-3 font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95] font-semibold tracking-[-0.03em]">{c.co}</p>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-paper/75">{c.what}</p>
            <p className="mt-8 flex items-center gap-2 text-[15px] text-paper/75"><MapPin className="size-4 text-sky" aria-hidden />{c.where}</p>
            <a href={c.tel} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-[6px] bg-paper px-6 text-[16px] text-ink transition hover:-translate-y-0.5 hover:bg-sky"><Phone className="size-4" aria-hidden /> Call {c.phone}</a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

const SITES = [
  { island: "Grand Bahama", items: [["Freeport Oil Company", "Lucayan Harbour Area, Freeport"], ["Grand Sun Investments", "East Mall Drive, Freeport"]], q: "Lucayan+Harbour,+Freeport,+Grand+Bahama" },
  { island: "New Providence", items: [["Head office, Sun Oil, BUC, BSR, NPG", "Clifton Pier, Nassau"], ["Convenience Retailing Limited", "Old Fort Bay, Nassau"]], q: "Clifton+Pier,+Nassau,+Bahamas" },
]

function Islands() {
  const [i, setI] = useState(0)
  return (
    <section id="islands" className="scroll-mt-20 bg-paper-2" aria-labelledby="isl-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Index n="04">Locations</Index>
          <h2 id="isl-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">Two islands, one group.</h2>
          <div className="mt-10 flex gap-2" role="tablist">
            {SITES.map((s, k) => <button key={s.island} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`min-h-11 rounded-[6px] px-5 text-[15px] transition ${i === k ? "bg-ink text-paper" : "border border-ink/20 hover:border-ink"}`}>{s.island}</button>)}
          </div>
          <ul className="mt-8 border-t border-ink/15">
            {SITES[i].items.map(([n, w]) => <li key={n} className="border-b border-ink/15 py-5"><p className="font-display text-xl font-semibold">{n}</p><p className="mt-1 text-muted">{w}</p></li>)}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden rounded-[10px] border border-line lg:col-span-7">
          <iframe key={i} title={`Map of FOCOL locations on ${SITES[i].island}`} loading="lazy" className="h-full min-h-[460px] w-full" src={`https://www.google.com/maps?q=${SITES[i].q}&output=embed`} />
        </Reveal>
      </div>
    </section>
  )
}

const LEADERS = [
  ["Dexter Adderley", "President and Chief Executive Officer"],
  ["Clinton Rolle", "Chief Operating Officer"],
  ["Barbara Pinder", "Chief Financial Officer"],
  ["Darren Francis", "Chief Risk and Compliance Officer"],
  ["Stephen Adderley", "General Manager, Freeport Oil Company"],
  ["Robert Hall", "General Manager, Bahamas Utility Holdings"],
  ["Chato Outten", "General Manager, Convenience Retail Limited"],
]

function Leadership() {
  return (
    <section id="investors" className="mx-auto grid max-w-[1440px] scroll-mt-20 gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="lead-title">
      <Reveal className="lg:col-span-4">
        <Index n="05">Leadership and investors</Index>
        <h2 id="lead-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">A Bahamian company, publicly listed.</h2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">FOCOL Holdings shares trade on BISX, The Bahamas International Securities Exchange. Shareholder information is published on the investor pages.</p>
        <a href="https://www.focol.com/investors/" className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-[6px] bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-0.5 hover:bg-blue">Shareholder information <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <ol className="border-t border-line">
          {LEADERS.map(([n, r], k) => (
            <li key={n} className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 md:grid-cols-[3rem_1fr_1.3fr] md:items-baseline">
              <span className="text-[13px] text-blue tabular-nums">{String(k + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.3rem,1.8vw,1.7rem)] font-semibold tracking-[-0.02em] transition group-hover:translate-x-1">{n}</span>
              <span className="col-start-2 text-muted md:col-start-auto">{r}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}

const TYPES = {
  commercial: { label: "Commercial fuel", fields: [["Company", "text"], ["Island", "text"], ["Fuel type (gasoline, diesel, marine, aviation)", "text"]] },
  solar: { label: "Solar project", fields: [["Company or property", "text"], ["Island", "text"], ["Project type", "text"]] },
  investors: { label: "Investors", fields: [["Your name", "text"], ["Question", "text"]] },
  careers: { label: "Careers", fields: [["Your name", "text"], ["Area of interest", "text"]] },
  media: { label: "Media and community", fields: [["Organisation", "text"], ["Topic", "text"]] },
} as const
type T = keyof typeof TYPES

function Contact() {
  const [tab, setTab] = useState<T>("commercial")
  const [vals, setVals] = useState<Record<string, string>>({})
  const body = useMemo(() => {
    const l = ["Hello FOCOL,", "", `Enquiry: ${TYPES[tab].label}`]
    for (const [f] of TYPES[tab].fields) if (vals[`${tab}:${f}`]) l.push(`${f}: ${vals[`${tab}:${f}`]}`)
    if (vals.reply) l.push(`Reply to: ${vals.reply}`)
    if (vals.msg) l.push("", vals.msg)
    return l.join("\n")
  }, [vals, tab])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${TYPES[tab].label} enquiry`)}&body=${encodeURIComponent(body)}`
  const field = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-blue"
  return (
    <section id="contact" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="ct-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Index n="06" light>Contact</Index>
          <h2 id="ct-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">Customers, partners, investors, the public.</h2>
          <a href={TEL} className="mt-10 block font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-semibold hover:text-sky">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="mt-1 block text-[18px] text-paper/75 hover:text-sky">{EMAIL}</a>
          <p className="mt-1 text-paper/60">Head office, Clifton Pier, Nassau</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as T)}>
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-[8px] bg-white/10 p-1">
              {(Object.keys(TYPES) as T[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-[6px] px-4 text-[14px] text-paper/80 data-[state=active]:bg-paper data-[state=active]:text-ink">{TYPES[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(TYPES) as T[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {TYPES[k].fields.map(([f, type]) => (
                    <label key={f} className="block text-paper"><span className="text-[14px] text-paper/65">{f}</span>
                      <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className={`${field} border-paper/25`} />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="block"><span className="text-[14px] text-paper/65">Email or phone for the reply</span><input value={vals.reply ?? ""} onChange={e => setVals(s => ({ ...s, reply: e.target.value }))} className={`${field} border-paper/25`} /></label>
            <label className="block"><span className="text-[14px] text-paper/65">Message</span><input value={vals.msg ?? ""} onChange={e => setVals(s => ({ ...s, msg: e.target.value }))} className={`${field} border-paper/25`} /></label>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-sky px-6 text-[16px] text-ink transition hover:-translate-y-0.5 active:translate-y-0"><Mail className="size-4" aria-hidden /> Email this enquiry</a>
            <span className="text-[13px] text-paper/60">Opens your email app, addressed to {EMAIL}.</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Is FOCOL the Shell distributor in The Bahamas?", "Yes. FOCOL is the sole licensed Shell distributor for The Bahamas and the Turks and Caicos Islands."],
  ["What fuels does FOCOL supply?", "Through Sun Oil Limited, gasoline, diesel, marine fuel and aviation fuel for commercial and residential customers across The Bahamas. Freeport Oil Company supplies Grand Bahama."],
  ["What is the New Providence Gas terminal?", "A small-scale LNG terminal at Clifton Pier that will receive LNG by ship, store it and convert it to natural gas for power generation on New Providence. It is a joint venture of Sun Oil (60 percent) and Shell (40 percent)."],
  ["Where is FOCOL's head office?", "Clifton Pier, Nassau. Call +1 (242) 702-3000 or email info@focol.com."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4"><Index n="07">Questions</Index>
        <h2 id="faq-title" className="mt-6 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[0.95] font-semibold tracking-[-0.035em]">Asked often.</h2></Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], k) => (
            <AccordionItem key={q} value={`q${k}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[clamp(1.15rem,1.6vw,1.45rem)] font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

mount(<Page><Hero /><KeyInfo /><ChainStory /><Work /><Companies /><Islands /><Leadership /><Contact /><Questions /></Page>)
