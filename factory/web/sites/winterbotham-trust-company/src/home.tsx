import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, ease } from "./site"
import { PHONE, TEL, HQ, LOGIN, OFFICES, SERVICES, AUDIENCES } from "./data"

function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  return now
}
const fmt = (d: Date, tz: string, sec = false) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", ...(sec ? { second: "2-digit" } : {}), hour12: false }).format(d)
const day = (d: Date, tz: string) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short" }).format(d)

function Hero({ office, setOffice }: { office: string; setOffice: (id: string) => void }) {
  const now = useNow()
  const lines = ["Trust is built", "over time."]
  return (
    <section className="relative" aria-labelledby="hero-title">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-12 px-5 pt-12 pb-0 md:px-10 lg:min-h-[calc(100svh-130px)] lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div className="lg:col-span-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Label>The Winterbotham Trust Company</Label>
            <p className="mt-3 max-w-[16rem] text-[14px] leading-relaxed text-muted">Bank and trust group. Head office in Nassau, The Bahamas.</p>
          </motion.div>
          <div className="lg:col-span-9">
            <h1 id="hero-title" className="font-display text-[clamp(3.4rem,10.2vw,10.5rem)] leading-[0.86] font-medium tracking-[-0.025em]">
              <span className="sr-only">Winterbotham, Nassau trust company. </span>
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]">
                  <motion.span className={`block ${i === 1 ? "pl-[12%] italic" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.25 + i * 0.12, duration: 1.4, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
              <p className="max-w-[32rem] text-[clamp(1.05rem,1.25vw,1.18rem)] leading-relaxed text-ink/80">Winterbotham designs and administers trusts, companies, foundations and funds for families, entrepreneurs and institutions, and keeps administering them for generations. Regulated by the Central Bank of The Bahamas and the Securities Commission.</p>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href="#consult" className="group inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-paper transition hover:-translate-y-px hover:bg-brass">Arrange a consultation <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
                <a href={LOGIN} className="inline-flex min-h-12 items-center border border-ink/30 px-6 transition hover:-translate-y-px hover:border-ink">Client login</a>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="-mx-5 grid grid-cols-2 border-t border-ink sm:grid-cols-3 md:mx-0 lg:grid-cols-6" aria-label="Local time at Winterbotham offices">
          {OFFICES.map(o => (
            <li key={o.id} className="border-b border-line odd:border-r sm:border-r lg:border-b-0 lg:last:border-r-0">
              <a href="#offices" onClick={() => setOffice(o.id)} className={`group block px-5 py-5 transition hover:bg-stone ${office === o.id ? "bg-stone/60" : ""}`}>
                <span className="block text-[11px] tracking-[0.2em] text-muted uppercase">{o.city}</span>
                <span className="mt-1 block font-display text-[2rem] leading-none tnum" suppressHydrationWarning>{fmt(now, o.tz)}</span>
                <span className="mt-1 block text-[12px] text-muted" suppressHydrationWarning>{day(now, o.tz)} · {o.country}</span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function KeyBand() {
  const items: [string, string, string][] = [
    ["Nassau desk", PHONE, TEL],
    ["Head office", "Marlborough & Queen Streets", "#offices"],
    ["Regulated by", "Central Bank and Securities Commission of The Bahamas", "#questions"],
    ["Clients", "E-banking login", LOGIN],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr_0.8fr]">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="text-[11px] tracking-[0.22em] text-brass-light uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i === 0 ? "text-[clamp(1.8rem,2.4vw,2.4rem)] tnum" : "text-[1.45rem]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-brass-light transition-all duration-700 group-hover:w-16" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Finder() {
  const [aud, setAud] = useState<string>("family")
  const a = AUDIENCES.find(x => x.id === aud)!
  const list = a.services.map(id => SERVICES.find(s => s.id === id)!)
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40" aria-labelledby="finder-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>01 · What we do</Label>
          <h2 id="finder-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.02em]">Start with who you are.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Eight service lines, from trusteeship to global custody. Choose the description that fits and see the ones that apply.</p>
          <ul className="mt-10 border-t border-ink" role="radiogroup" aria-label="I am">
            {AUDIENCES.map(x => (
              <li key={x.id} className="border-b border-line">
                <button type="button" role="radio" aria-checked={aud === x.id} onClick={() => setAud(x.id)} className="group flex min-h-14 w-full items-center justify-between py-3 text-left">
                  <span className={`font-display text-[1.6rem] transition ${aud === x.id ? "text-ink" : "text-muted group-hover:translate-x-1 group-hover:text-ink"}`}><span className="text-[1rem] text-brass">I am </span>{x.label.toLowerCase()}</span>
                  <span className={`h-px bg-brass transition-all duration-700 ${aud === x.id ? "w-12" : "w-0"}`} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.ol key={aud} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="border-t border-ink">
              {list.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="grid gap-2 border-b border-line py-8 md:grid-cols-[3rem_12rem_1fr] md:gap-6">
                  <span className="font-display text-[1.2rem] text-brass tnum">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`services.html#${s.id}`} className="group font-display text-[2rem] leading-none"><span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">{s.name}</span></a>
                  <p className="text-[16px] leading-relaxed text-muted">{s.line}</p>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
          <a href="services.html" className="group mt-8 inline-flex min-h-11 items-center gap-2 text-[15px]">All eight service lines <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

const LINE = [
  ["1855 to 1912", "James Batten Winterbotham", "Of Cheltenham, Gloucestershire. The founder is his direct descendant."],
  ["1920 to 1923", "Clara Winterbotham", "Mayoress of Cheltenham."],
  ["East Africa", "Cicely Hooper", "A pioneering missionary, alongside her husband Handly Hooper."],
  ["South America", "George Washington Winterbotham", "Railway engineer, laying the foundations of railways across the continent."],
  ["Nassau", "Geoffrey Hooper", "After a long career in international banking, founds The Winterbotham Trust Company Limited."],
]

function Heritage() {
  return (
    <section id="heritage" className="bg-stone" aria-labelledby="heritage-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label>02 · Heritage</Label>
          <h2 id="heritage-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.02em]">Two centuries of a family name.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Local government, missions and railway engineering: the Winterbothams were pioneers in public life long before the family name came to Nassau, carried by values of honesty and integrity.</p>
        </Reveal>
        <ol className="relative lg:col-span-6 lg:col-start-7">
          <motion.span className="absolute top-2 bottom-2 left-[7.5rem] w-px origin-top bg-ink/30 md:left-[9.5rem]" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease }} aria-hidden />
          {LINE.map(([when, who, what], i) => (
            <motion.li key={who} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.1, duration: 0.9, ease }} className="relative grid grid-cols-[7.5rem_1fr] pb-10 last:pb-0 md:grid-cols-[9.5rem_1fr]">
              <span className="pr-5 text-[12px] tracking-[0.16em] text-brass uppercase">{when}</span>
              <div className="relative pl-8">
                <span className={`absolute top-2 -left-[4px] size-[9px] rounded-full ${i === LINE.length - 1 ? "bg-brass" : "border border-ink bg-stone"}`} aria-hidden />
                <p className="font-display text-[1.8rem] leading-tight">{who}</p>
                <p className="mt-1.5 text-[16px] leading-relaxed text-muted">{what}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const VALUES = [
  ["Trust", "Something built over time. Time is what allows relationships that endure through generations."],
  ["Commitment", "Delivering results, and caring how clients feel when working together."],
  ["Excellence", "Fulfilment and transparency. When we say something, we do it, as a team."],
]

function Values() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36" aria-labelledby="values-title">
      <Reveal><Label>03 · Values</Label><h2 id="values-title" className="sr-only">Values</h2></Reveal>
      <div className="mt-10 grid gap-0 border-t border-ink md:grid-cols-3">
        {VALUES.map(([v, d], i) => (
          <Reveal key={v} delay={i * 0.1} className="border-b border-line py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0">
            <p className="font-display text-[clamp(3rem,5vw,4.8rem)] leading-none italic">{v}</p>
            <p className="mt-5 max-w-xs text-[16px] leading-relaxed text-muted">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Offices({ office, setOffice }: { office: string; setOffice: (id: string) => void }) {
  const now = useNow()
  const o = OFFICES.find(x => x.id === office)!
  return (
    <section id="offices" className="bg-ink text-paper" aria-labelledby="offices-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label light>04 · Offices</Label>
          <h2 id="offices-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.02em]">Six offices, one desk in Nassau.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">Trades are executed centrally from the Nassau trading desk. Choose an office for its address and line.</p>
          <ul className="mt-10 border-t border-paper/25">
            {OFFICES.map(x => (
              <li key={x.id} className="border-b border-paper/15">
                <button type="button" aria-pressed={office === x.id} onClick={() => setOffice(x.id)} className="group flex min-h-14 w-full items-center justify-between py-3 text-left">
                  <span className={`font-display text-[1.6rem] transition ${office === x.id ? "text-paper" : "text-paper/55 group-hover:translate-x-1 group-hover:text-paper"}`}>{x.city}</span>
                  <span className="text-[14px] text-paper/60 tnum" suppressHydrationWarning>{fmt(now, x.tz)}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <AnimatePresence mode="wait">
            <motion.div key={o.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease }} className="border border-paper/20 p-8 md:p-12">
              <p className="text-[11px] tracking-[0.22em] text-brass-light uppercase">{o.role} · {o.country}</p>
              <p className="mt-6 font-display text-[clamp(4rem,9vw,7.5rem)] leading-none tnum" suppressHydrationWarning>{fmt(now, o.tz, true)}</p>
              <p className="mt-2 text-[14px] text-paper/60" suppressHydrationWarning>Local time, {day(now, o.tz)}</p>
              <div className="mt-10 h-px bg-paper/20" />
              <p className="mt-8 font-display text-[1.6rem] leading-snug">{o.address}</p>
              <a href={`tel:${o.tel}`} className="mt-6 inline-flex min-h-12 items-center gap-2 border border-paper/40 px-5 text-[15px] tnum transition hover:-translate-y-px hover:border-paper hover:bg-paper hover:text-ink"><Phone className="size-4" aria-hidden /> {o.phone}</a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const CONSULT = {
  trust: { label: "Trusts and estates", intro: "Trusteeship, Private Trust Companies, escrow and other corporate trust services.", fields: [["Your name", "text"], ["Country of residence", "text"], ["What you would like to structure", "text"]] },
  funds: { label: "Funds", intro: "Licensing, incorporation, NAV, transfer agency and administration.", fields: [["Your name", "text"], ["Fund or manager", "text"], ["Stage (new or existing fund)", "text"]] },
  banking: { label: "Banking and custody", intro: "Multi-currency accounts, payments, FX, brokerage and global custody.", fields: [["Your name", "text"], ["Company, if any", "text"], ["What you need", "text"]] },
  corporate: { label: "Companies", intro: "Formation, administration, governance and physical presence.", fields: [["Your name", "text"], ["Jurisdiction of interest", "text"], ["What you need", "text"]] },
} as const
type CK = keyof typeof CONSULT

function Consult() {
  const [tab, setTab] = useState<CK>("trust")
  const [vals, setVals] = useState<Record<string, string>>({})
  const conf = CONSULT[tab]
  const summary = conf.fields.map(([f]) => vals[`${tab}:${f}`] ? `${f.split(" (")[0]}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean).join(" · ")
  return (
    <section id="consult" className="mx-auto grid max-w-[1440px] gap-14 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="consult-title">
      <Reveal className="lg:col-span-4">
        <Label>05 · Consultation</Label>
        <h2 id="consult-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.02em]">Arrange a first conversation.</h2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">The Nassau desk takes new enquiries by telephone. Note the essentials here so the first call is short and specific.</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Tabs value={tab} onValueChange={v => setTab(v as CK)}>
          <TabsList className="h-auto w-full flex-wrap justify-start gap-0 rounded-none border-b border-ink bg-transparent p-0">
            {Object.entries(CONSULT).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-12 flex-none rounded-none border-0 border-b-2 border-transparent px-4 text-[15px] text-muted data-[state=active]:border-brass data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none">{c.label}</TabsTrigger>)}
          </TabsList>
          {Object.entries(CONSULT).map(([k, c]) => (
            <TabsContent key={k} value={k} className="mt-8">
              <p className="text-[15px] text-muted">{c.intro}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {c.fields.map(([f, type]) => (
                  <label key={f} className={`block ${f.startsWith("What") ? "sm:col-span-2" : ""}`}>
                    <span className="text-[11px] tracking-[0.18em] text-muted uppercase">{f}</span>
                    <input type={type} name={f} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/30 bg-transparent font-display text-[1.5rem] outline-none transition focus:border-brass" />
                  </label>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-10 flex flex-col gap-4 bg-ink p-6 text-paper md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-[15px] text-paper/70">{summary ? <>To mention on the call: <span className="text-paper">{conf.label}. {summary}</span></> : "Your notes will appear here, ready for the call."}</p>
          <a href={TEL} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-paper px-6 text-ink tnum transition hover:-translate-y-px hover:bg-brass-light"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </div>
      </Reveal>
    </section>
  )
}

const FAQ = [
  ["Where is Winterbotham's head office?", `${HQ}, The Bahamas. Telephone ${PHONE}.`],
  ["Who regulates The Winterbotham Trust Company Limited?", "The Central Bank of The Bahamas and the Securities Commission of The Bahamas."],
  ["Where else does Winterbotham have offices?", "The Cayman Islands, Montevideo in Uruguay, Hong Kong, San Juan in Puerto Rico, and Brisbane in Australia through SeventyTwo Capital."],
  ["Is Winterbotham certified for quality and information security?", "Winterbotham publishes ISO 9001 and ISO 27001 certificates on its website."],
]

function Questions() {
  return (
    <section id="questions" className="border-t border-line bg-stone" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>06 · Questions</Label>
          <h2 id="faq-title" className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.02em]">Due diligence, answered.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[1.6rem] font-medium hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Home() {
  const [office, setOffice] = useState("nassau")
  return (
    <Page current="Home">
      <Hero office={office} setOffice={setOffice} />
      <KeyBand />
      <Finder />
      <Heritage />
      <Values />
      <Offices office={office} setOffice={setOffice} />
      <Consult />
      <Questions />
    </Page>
  )
}

mount(<Home />)
