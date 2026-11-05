import { useEffect, useMemo, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Phone, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Archipelago from "./Archipelago"
import { Page, mount, Reveal, Mask, SectionHead, ease, reveal, PHONE, TEL, EMAIL, IMG } from "./site"

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 70])
  return (
    <section className="relative px-3 pt-3 md:px-6 md:pt-6" aria-labelledby="hero-title">
      <div className="relative md:h-[calc(100svh-110px)] md:min-h-[620px]">
        <motion.div className="relative h-[44svh] overflow-hidden rounded-[6px] bg-[#9fc3c4] md:absolute md:inset-0 md:h-auto" initial={{ clipPath: "inset(8% 8% 8% 8%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ duration: 1.4, delay: 0.15, ease: reveal }}>
          <motion.img style={{ y }} src={`${IMG}2024/05/Home-Page-Imgae-Harbour-Island.jpeg`} alt="Harbour Island, Eleuthera, from the water" width={1920} height={1080} fetchPriority="high" className="h-[calc(100%+70px)] w-full -translate-y-[70px] object-cover object-[60%_50%]" />
        </motion.div>
        <div className="absolute top-5 right-5 hidden md:block">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="label rounded-full bg-paper/80 px-4 py-2 text-ink backdrop-blur">Harbour Island, Eleuthera</motion.p>
        </div>
        <div className="relative -mt-8 mr-8 rounded-tr-[6px] bg-paper pt-6 pr-4 md:absolute md:bottom-0 md:left-0 md:mt-0 md:mr-0 md:w-[min(100%,1120px)] md:pt-10 md:pr-14">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="label pl-2 text-grape md:pl-4">Bahamas Choice Real Estate · Since 2013</motion.p>
          <h1 id="hero-title" className="mt-4 pl-2 font-display text-[clamp(2.5rem,6.1vw,6.6rem)] leading-[0.95] tracking-[-0.03em] md:pl-4">
            {["A Nassau family brokerage", "for every island."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.55 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.9, ease }} className="absolute right-4 bottom-4 hidden w-[340px] rounded-[6px] border border-white/50 bg-paper/78 p-6 backdrop-blur-xl lg:block">
          <p className="text-[15px] leading-relaxed text-ink/85">Buying, selling or leasing a home, land or commercial property, guided by one team from first viewing to closing and beyond.</p>
          <div className="mt-5 flex gap-2">
            <a href="#brief" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-grape-deep">Send your brief</a>
            <a href={TEL} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/25 px-4 text-[15px] transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden />Call</a>
          </div>
        </motion.div>
      </div>
      <div className="px-2 pt-5 pb-2 lg:hidden">
        <p className="text-[17px] leading-relaxed text-ink/85">Buying, selling or leasing a home, land or commercial property, guided by one team from first viewing to closing and beyond.</p>
        <a href="#brief" className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-ink text-paper">Send your brief</a>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Call the office", PHONE, TEL],
    ["Email", "sales@bahamaschoice​realestate.com", `mailto:${EMAIL}`],
    ["Office", "Yamacraw Hill Road, Nassau", "#contact"],
    ["We handle", "Buying, selling, rentals, commercial", "#brief"],
  ]
  return (
    <section className="mt-10 bg-deep text-paper md:mt-14" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1.2fr_1.3fr_1fr_1fr]">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-paper/15 border-b sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-10">
              <span className="label text-conch">{k}</span>
              <span className={`mt-3 block font-display leading-tight ${i === 0 ? "text-[clamp(2rem,2.8vw,2.7rem)]" : "text-[1.35rem] md:text-[1.55rem]"}`}>{v}</span>
              <span className="mt-4 block h-px w-0 bg-conch transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Islands() {
  return (
    <section id="islands" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="islands-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead index="01" label="The islands" id="islands-title" title={<>Wherever the search leads.</>} />
        </div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-14">
          <p className="text-[18px] leading-relaxed text-muted">From an office on Yamacraw Hill Road, the team works across sixteen island groups, from Bimini to Inagua. Choose an island to see the areas we feature there.</p>
        </Reveal>
      </div>
      <div className="mt-14 md:mt-20"><Archipelago /></div>
    </section>
  )
}

const STEPS = [
  ["Listen", "We start with what you want and why: the island, the kind of property, the budget, the timing. Our team calls it our trademark."],
  ["Search and view", "We find the listings that fit, arrange viewings and tell you plainly what we see."],
  ["Offer to closing", "We guide the sale or purchase through to completion, and anticipate the small or large snags on the way."],
  ["And beyond", "When asked, we introduce reputable lawyers, banks, appraisers, surveyors, inspectors, contractors and help with moving."],
]

function How() {
  const [active, setActive] = useState(0)
  return (
    <section id="how" className="bg-paper-2" aria-labelledby="how-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead index="02" label="How we work" id="how-title" title={<>End to end, with one team.</>}>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">Doing business here as a first-time buyer, or from abroad, can be daunting. Our estate professionals keep up to date and stay with you from beginning to end.</p>
          </SectionHead>
          <Mask className="mt-12 hidden overflow-hidden rounded-[6px] lg:block" delay={0.1}>
            <img src={`${IMG}2024/05/Sunset.jpg`} alt="Sunset over the water in The Bahamas" width={900} height={600} loading="lazy" className="aspect-[3/2] w-full bg-[#c7b7a8] object-cover transition duration-700 hover:scale-[1.03]" />
          </Mask>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="border-t border-ink/15 last:border-b">
              <button type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-expanded={active === i} className="group grid w-full grid-cols-[3.2rem_1fr] items-baseline gap-4 py-7 text-left md:grid-cols-[4.5rem_1fr]">
                <span className={`font-display text-2xl transition ${active === i ? "text-grape" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight transition group-hover:translate-x-1">{t}</span>
                  <motion.span initial={false} animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }} transition={{ duration: 0.5, ease }} className="block overflow-hidden">
                    <span className="block max-w-lg pt-3 text-[17px] leading-relaxed text-muted">{d}</span>
                  </motion.span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const DEVS: [string, string][] = [
  ["Palm Cay", "Palm-Cay"], ["Goldwynn", "Goldwynn"], ["Ocean Club Residences and Marina", "Ocean-Club-Residences-and-Marina"],
  ["Windsor Lakes", "Windsor-Lakes"], ["Treasure Cove", "Treasure-Cove"], ["Bayroc", "Bayroc"], ["Charlottesville and Turnberry", "Charlottesville-and-Turnberry"],
]
const MORE = ["Aqualina", "The Residences at Montage Cay", "The Ocean Club Four Seasons Residences", "Venetian West"]

function Developments() {
  const [i, setI] = useState(0)
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="dev-title">
      <SectionHead index="03" label="Developments" id="dev-title" title={<>Residences we know well.</>} />
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <ul className="lg:col-span-5" aria-label="Developments">
          {DEVS.map(([n], k) => (
            <li key={n}>
              <button type="button" onClick={() => setI(k)} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} aria-pressed={i === k} className="group flex w-full items-baseline justify-between border-b border-line py-4 text-left">
                <span className={`font-display text-[clamp(1.5rem,2.3vw,2.1rem)] leading-tight transition ${i === k ? "translate-x-2 text-grape" : "group-hover:translate-x-1"}`}>{n}</span>
                <span className="label text-muted">{String(k + 1).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
          <li className="pt-6 text-[15px] leading-relaxed text-muted">Also: {MORE.join(", ")}.</li>
        </ul>
        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-[#b9c8c2] lg:sticky lg:top-28">
            {DEVS.map(([n, f], k) => (
              <motion.img key={f} src={`${IMG}2023/11/${f}.jpg`} alt={`${n}, a development presented by Bahamas Choice Real Estate`} width={1200} height={900} loading="lazy" initial={false} animate={{ opacity: i === k ? 1 : 0, scale: i === k ? 1 : 1.04 }} transition={{ duration: 0.9, ease }} className="absolute inset-0 size-full object-cover" />
            ))}
            <p className="label absolute bottom-4 left-4 rounded-full bg-paper/85 px-4 py-2 text-ink backdrop-blur">{DEVS[i][0]}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const TEAM = [
  { n: "Lana Munnings-Basalyga", r: "Principal Broker, BREA licence #480", ph: "242-357-7698", e: "lana@bahamaschoice.com", img: "2023/09/Lana-Munnings-Basalyga.jpg" },
  { n: "Greg Munnings", r: "Estate Agent", ph: "242-556-5102", e: "gregory@bahamaschoice.com", img: "2026/03/26.03.2026-Greg.jpg" },
  { n: "Sherry Morris", r: "Bahamas Choice team", ph: "242-424-1861", e: "sherry@bahamaschoice.com", img: "2023/09/Sherry-Morris-photo-for-Website.jpg" },
  { n: "Erica Pinder", r: "Bahamas Choice team", ph: "242-457-0248", e: "erica@bahamaschoice.com", img: "2023/09/Erica-Pinder-Photfo-for-Website.jpg" },
]

function Team() {
  return (
    <section id="team" className="bg-deep text-paper" aria-labelledby="team-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7"><SectionHead dark index="04" label="The team" id="team-title" title={<>Call the person, not a switchboard.</>} /></div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-14"><p className="text-[18px] leading-relaxed text-paper/75">A small company with one big goal: professional, efficient and friendly service that turns customers into clients for life. Every agent has a direct line.</p></Reveal>
        </div>
        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t, k) => (
            <li key={t.n} className={k % 2 ? "lg:mt-16" : ""}>
              <Mask delay={k * 0.08} className="overflow-hidden rounded-[6px] bg-[#2c4a46]">
                <img src={`${IMG}${t.img}`} alt={`Portrait of ${t.n}`} width={600} height={750} loading="lazy" className="aspect-[4/5] w-full object-cover object-top transition duration-700 hover:scale-[1.03]" />
              </Mask>
              <p className="mt-5 font-display text-[1.6rem] leading-tight">{t.n}</p>
              <p className="mt-1 text-[14px] text-paper/60">{t.r}</p>
              <div className="mt-4 flex flex-col gap-1.5 text-[15px]">
                <a href={`tel:+1${t.ph.replace(/\D/g, "")}`} className="ulink inline-flex w-fit items-center gap-2"><Phone className="size-3.5" aria-hidden />{t.ph}</a>
                <a href={`mailto:${t.e}`} className="ulink inline-flex w-fit items-center gap-2 break-all"><Mail className="size-3.5" aria-hidden />{t.e}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const QUOTES = [
  { q: "Mrs. Basalyga sold the property within 4 months at the height of the pandemic, without Mom being present in the Bahamas.", a: "Jennifer Brice" },
  { q: "If someone should ask me about my experience with you and your services, I would gladly say you held my hand.", a: "T. Johnson, on working with Sherry" },
  { q: "You were very professional and knowledgeable in your field and made this sale a smooth one.", a: "Yasmine" },
]

function Words() {
  const [i, setI] = useState(0)
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="words-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3"><SectionHead index="05" label="Clients" id="words-title" title={<>In their words.</>} /></div>
        <figure className="lg:col-span-8 lg:col-start-5">
          <motion.blockquote key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.12] tracking-[-0.015em]">
            “{QUOTES[i].q}”
          </motion.blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
            <span className="text-[16px] text-muted">{QUOTES[i].a}</span>
            <span className="flex gap-2">
              {QUOTES.map((x, k) => <button key={x.a} type="button" onClick={() => setI(k)} aria-label={`Quote ${k + 1} of ${QUOTES.length}`} aria-pressed={i === k} className={`flex size-11 items-center justify-center rounded-full border text-[14px] transition hover:-translate-y-px ${i === k ? "border-ink bg-ink text-paper" : "border-line"}`}>{k + 1}</button>)}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

type Field = { k: string; type?: string; options?: string[] }
const ISLAND_OPTIONS = ["Not sure yet", "New Providence & Paradise Island", "Grand Bahama & Freeport", "Abaco", "Eleuthera / Harbour Island", "Exuma", "Andros", "Long Island", "Bimini", "Berry Islands", "Cat Island", "Another island"]
const BRIEFS: Record<string, { label: string; intro: string; fields: Field[] }> = {
  buy: { label: "Buy", intro: "Looking for a home, land or a second home on the islands, from here or from abroad.", fields: [{ k: "Island", options: ISLAND_OPTIONS }, { k: "Property type", options: ["House", "Condo or townhouse", "Land", "Waterfront or dock", "Not sure"] }, { k: "Budget (US$)" }, { k: "Timing", options: ["As soon as possible", "Within 6 months", "Within a year", "Just researching"] }] },
  sell: { label: "Sell", intro: "Selling a home, land or a family property, including if you live overseas.", fields: [{ k: "Island", options: ISLAND_OPTIONS }, { k: "Property type", options: ["House", "Condo or townhouse", "Land", "Commercial", "Family property"] }, { k: "Area or street" }, { k: "You live", options: ["In The Bahamas", "Abroad"] }] },
  rent: { label: "Rent or lease", intro: "Renting a home or leasing commercial space, or letting your property.", fields: [{ k: "I want to", options: ["Rent a home", "Lease commercial space", "Let my property"] }, { k: "Island", options: ISLAND_OPTIONS }, { k: "Bedrooms or size" }, { k: "Move-in date", type: "date" }] },
  invest: { label: "Commercial & invest", intro: "Commercial buildings, business opportunities, apartment complexes and investment property.", fields: [{ k: "Interest", options: ["Commercial building", "Business opportunity", "Apartment complex", "Resort or hotel", "Land for development"] }, { k: "Island", options: ISLAND_OPTIONS }, { k: "Budget (US$)" }] },
}

function Brief() {
  const [tab, setTab] = useState("buy")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [who, setWho] = useState({ name: "", phone: "", note: "" })
  useEffect(() => {
    const pick = (name: string) => {
      const opt = name.startsWith("Great Abaco") ? "Abaco" : name.startsWith("Eleuthera") ? "Eleuthera / Harbour Island" : name.startsWith("Great Exuma") ? "Exuma" : name.startsWith("Cat Island") ? "Cat Island" : ISLAND_OPTIONS.includes(name) ? name : "Another island"
      setVals(v => ({ ...v, "buy:Island": opt }))
      setTab("buy")
    }
    try { const s = sessionStorage.getItem("bc-island"); if (s) pick(s) } catch { /* ignore */ }
    const h = (e: Event) => pick((e as CustomEvent).detail)
    window.addEventListener("bc-island", h)
    return () => window.removeEventListener("bc-island", h)
  }, [])
  const conf = BRIEFS[tab]
  const lines = useMemo(() => conf.fields.map(f => vals[`${tab}:${f.k}`] ? `${f.k}: ${vals[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [conf, vals, tab])
  const body = [`Hello Bahamas Choice,`, ``, `I would like to ${conf.label.toLowerCase()}.`, ...lines, who.note && `Notes: ${who.note}`, ``, who.name && `Name: ${who.name}`, who.phone && `Phone: ${who.phone}`].filter(x => x !== "" && x !== false && x !== undefined).join("\n")
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Brief: ${conf.label}${vals[`${tab}:Island`] ? `, ${vals[`${tab}:Island`]}` : ""}`)}&body=${encodeURIComponent(body)}`
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-grape"
  return (
    <section id="brief" className="bg-paper-2" aria-labelledby="brief-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead index="06" label="Your brief" id="brief-title" title={<>Tell us what you are looking for.</>}>
            <p className="mt-6 max-w-sm text-[18px] leading-relaxed text-muted">Choose what you want to do and fill in what you know. Your brief becomes an email to the office, ready to send.</p>
            <a href={TEL} className="mt-8 inline-flex items-center gap-2 text-[16px]"><Phone className="size-4" aria-hidden /><span className="ulink">Or call {PHONE}</span></a>
          </SectionHead>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper p-1">
              {Object.entries(BRIEFS).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{c.label}</TabsTrigger>)}
            </TabsList>
            {Object.entries(BRIEFS).map(([k, c]) => (
              <TabsContent key={k} value={k} className="mt-8">
                <p className="text-[16px] text-muted">{c.intro}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {c.fields.map(f => {
                    const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`
                    const v = vals[`${k}:${f.k}`] ?? ""
                    const set = (x: string) => setVals(o => ({ ...o, [`${k}:${f.k}`]: x }))
                    return (
                      <div key={f.k}>
                        <label htmlFor={id} className="label text-muted">{f.k}</label>
                        {f.options ? (
                          <select id={id} value={v} onChange={e => set(e.target.value)} className={input}>
                            <option value="">Choose</option>
                            {f.options.map(o => <option key={o}>{o}</option>)}
                          </select>
                        ) : <input id={id} type={f.type ?? "text"} value={v} onChange={e => set(e.target.value)} className={input} />}
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div><label htmlFor="b-name" className="label text-muted">Your name</label><input id="b-name" autoComplete="name" value={who.name} onChange={e => setWho({ ...who, name: e.target.value })} className={input} /></div>
            <div><label htmlFor="b-phone" className="label text-muted">Phone or WhatsApp</label><input id="b-phone" autoComplete="tel" value={who.phone} onChange={e => setWho({ ...who, phone: e.target.value })} className={input} /></div>
            <div className="sm:col-span-2"><label htmlFor="b-note" className="label text-muted">Anything else</label><textarea id="b-note" rows={2} value={who.note} onChange={e => setWho({ ...who, note: e.target.value })} className={`${input} resize-none py-2`} /></div>
          </div>
          <div className="mt-10 rounded-[6px] bg-ink p-6 text-paper md:p-8">
            <p className="label text-conch">Your brief</p>
            <p className="mt-3 min-h-12 text-[16px] leading-relaxed text-paper/85">{lines.length ? `${conf.label}: ${lines.join(" · ")}` : "Your choices will appear here as you fill in the form."}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a href={href} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px active:translate-y-0">Send your brief <ArrowUpRight className="size-4" aria-hidden /></a>
              <p className="text-[14px] text-paper/60">Opens your email app with the brief filled in. Nothing is sent until you press send.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Can you help if I am buying from outside The Bahamas?", "Yes. International clients are part of what we do. We guide you through each step, and when you ask, we help with banking and legal information, government requirements and relocation. See Buying from abroad for how it works."],
  ["Can you sell a family property while the owner lives abroad?", "Yes. Our clients have sold family property with us while living overseas, and we keep you informed with regular updates through the sale."],
  ["Which islands do you cover?", "All the major islands, from New Providence, Paradise Island and Grand Bahama to Abaco, Eleuthera, Exuma, Andros, Long Island, Bimini and the southern islands such as Inagua and Mayaguana."],
  ["Do you handle rentals and commercial property?", "Yes. We work on residential and commercial sales and rentals, investment property and business opportunities."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><SectionHead index="07" label="Questions" id="faq-title" title={<>What people ask first.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.35rem] hover:no-underline md:text-[1.6rem]">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead index="08" label="The office" id="contact-title" title={<>Yamacraw Hill Road, Nassau.</>}>
            <p className="mt-5 max-w-md text-[18px] leading-relaxed text-muted">Visit, call or write. Tell us the island and we will tell you who to speak to.</p>
          </SectionHead>
          <a href={TEL} className="mt-10 block rounded-[6px] bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-grape-deep">
            <span className="label text-conch">Call the office</span>
            <span className="mt-2 block font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none">{PHONE}</span>
            <span className="mt-3 block break-all text-paper/70">{EMAIL}</span>
          </a>
        </div>
        <Reveal delay={0.1} className="overflow-hidden rounded-[6px] border border-line lg:col-span-7">
          <iframe title="Map of Yamacraw Hill Road, Nassau, New Providence" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[480px]" src="https://www.google.com/maps?q=Yamacraw+Hill+Road,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Islands /><How /><Developments /><Team /><Words /><Brief /><Questions /><Contact /></Page>)
