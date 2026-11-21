import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, Phone, Check, Ship, Palmtree } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Mark, ease, usd, PHONE, TEL, US_PHONE, US_TEL } from "./site"
import { PACKAGES, LICENCE, SERVICES, GALLERY, IMG } from "./data"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[calc(100svh-120px)] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center px-5 pt-12 pb-10 md:px-10 lg:col-span-6 lg:py-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[14px] text-muted">Destination weddings in Nassau, The Bahamas</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3.2rem,7vw,7.6rem)] leading-[0.92] tracking-[-0.02em] text-ink lg:mr-[-18%]">
            {["Married in Nassau,", "with Anna", "beside you."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span className={`block ${i === 2 ? "text-rose" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-8 max-w-md text-[18px] leading-relaxed text-muted">Anna's Wedding Planning has planned beach and cruise-day weddings in Nassau for more than two decades, for couples from Australia to Sweden. Packages from USD 950, licence paperwork included.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 1, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href="#plan" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-6 text-[16px] text-white transition hover:-translate-y-0.5 hover:bg-ink active:translate-y-0">Check your wedding date <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href="#finder" className="inline-flex min-h-12 items-center rounded-full border border-ink/20 px-6 text-[16px] transition hover:-translate-y-0.5 hover:border-ink">Find your package</a>
          </motion.div>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.15, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="relative h-[62svh] lg:col-span-6 lg:h-auto">
          <img src={IMG + "2024/04/Real-Love-Hero-Banner.webp"} alt="A couple at their beach wedding in Nassau, planned by Anna's Wedding Planning" fetchPriority="high" width={1600} height={1000} className="absolute inset-0 size-full rounded-bl-[120px] object-cover lg:rounded-bl-[200px]" />
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Call Anna in Nassau", PHONE, TEL],
    ["From the United States", US_PHONE, US_TEL],
    ["Packages", "From USD 950", "packages.html"],
    ["Licence", "24 hours on island, then apply", "#licence"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-paper/15 not-first:border-t sm:not-first:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:not-first:border-l">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="text-[13px] text-blush">{k}</span>
              <span className={`mt-1 block font-display leading-tight ${i < 2 ? "text-[clamp(1.7rem,2.3vw,2.3rem)] whitespace-nowrap" : "text-[clamp(1.25rem,1.6vw,1.6rem)]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-blush transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Finder() {
  const [mode, setMode] = useState<"beach" | "cruise">("beach")
  const [guests, setGuests] = useState(6)
  const list = useMemo(() => PACKAGES.filter(p => p.group === mode).sort((a, b) => a.price - b.price), [mode])
  const best = list.find(p => p.guests >= guests) ?? list[list.length - 1]
  return (
    <section id="finder" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="finder-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Mark n="i.">Find your package</Mark>
          <h2 id="finder-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Tell us how you arrive and who comes with you.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Every package can be adjusted to your number of guests and your wishes. These are Anna's published starting points.</p>
          <div className="mt-10 grid grid-cols-2 gap-2 rounded-full bg-blush p-1.5" role="group" aria-label="How you arrive">
            {([["beach", "Staying on island", Palmtree], ["cruise", "Arriving by cruise", Ship]] as const).map(([k, l, Icon]) => (
              <button key={k} type="button" aria-pressed={mode === k} onClick={() => setMode(k)} className={`flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-[15px] transition ${mode === k ? "bg-ink text-paper" : "text-ink hover:bg-white/70"}`}><Icon className="size-4" aria-hidden />{l}</button>
            ))}
          </div>
          <label className="mt-10 block">
            <span className="flex items-baseline justify-between text-[14px] text-muted">Guests, including the two of you <b className="font-display text-3xl font-normal text-ink">{guests}</b></span>
            <input type="range" min={2} max={50} value={guests} onChange={e => setGuests(+e.target.value)} className="range mt-4 w-full" />
          </label>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait">
            <motion.article key={best.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55, ease }} className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-40px_rgba(31,42,46,.5)] md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-[260px] bg-blush"><img src={best.img} alt={`${best.name} package wedding by Anna's Wedding Planning`} width={600} height={600} loading="lazy" className="absolute inset-0 size-full object-cover" /></div>
              <div className="p-7 md:p-9">
                <p className="text-[13px] text-rose">Closest match for {guests} guests</p>
                <h3 className="mt-2 font-display text-4xl">{best.name}</h3>
                <p className="mt-1 text-[15px] text-muted">{usd(best.price)} · {best.id === "basic" ? "no guest seating listed" : `set up for up to ${best.guests}`}, adjustable</p>
                <ul className="mt-5 space-y-2 text-[15px]">
                  {best.items.slice(0, 7).map(it => <li key={it} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-rose" aria-hidden />{it}</li>)}
                </ul>
                {best.items.length > 7 && <p className="mt-3 text-[14px] text-muted">and {best.items.length - 7} more on the packages page</p>}
              </div>
            </motion.article>
          </AnimatePresence>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {list.map(p => (
              <li key={p.id}><a href={`packages.html#${p.id}`} className={`group flex min-h-16 flex-col justify-center rounded-2xl border px-4 py-3 transition hover:-translate-y-0.5 ${p.id === best.id ? "border-rose bg-blush" : "border-line hover:border-ink"}`}>
                <span className="font-display text-xl">{p.name}</span><span className="text-[13px] text-muted">{usd(p.price)}</span></a></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Licence() {
  const [done, setDone] = useState<number[]>([])
  const pct = Math.round((done.length / LICENCE.length) * 100)
  return (
    <section id="licence" className="scroll-mt-24 bg-blush" aria-labelledby="lic-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Mark n="ii.">Marriage licence</Mark>
          <h2 id="lic-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Your paperwork, ticked off.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Anna schedules your appointment with the Registrar's office and prepares the documents for the interview. Tick what you already have.</p>
          <div className="mt-10 flex items-center gap-5">
            <svg viewBox="0 0 44 44" className="size-24 -rotate-90" aria-hidden><circle cx="22" cy="22" r="19" fill="none" stroke="#eadfd8" strokeWidth="3" /><motion.circle cx="22" cy="22" r="19" fill="none" stroke="#b44c6e" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" animate={{ strokeDashoffset: 1 - done.length / LICENCE.length }} transition={{ duration: 0.6, ease }} /></svg>
            <p className="font-display text-4xl">{pct}%<span className="mt-1 block font-sans text-[14px] text-muted">ready for the Registrar</span></p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-ink/15">
            {LICENCE.map((t, i) => {
              const on = done.includes(i)
              return (
                <li key={t} className="border-b border-ink/15">
                  <button type="button" aria-pressed={on} onClick={() => setDone(d => on ? d.filter(x => x !== i) : [...d, i])} className="group flex w-full items-start gap-4 py-5 text-left">
                    <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition ${on ? "border-rose bg-rose text-white" : "border-ink/30 group-hover:border-rose"}`}><Check className={`size-4 transition ${on ? "scale-100" : "scale-0"}`} aria-hidden /></span>
                    <span className={`text-[17px] leading-relaxed transition ${on ? "text-muted line-through decoration-rose/50" : "text-ink"}`}>{t}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-[13px] text-muted">As published by Anna's Wedding Planning. Requirements are set by the Registrar General's Department of The Bahamas; Anna confirms the current rules when you book.</p>
        </Reveal>
      </div>
    </section>
  )
}

const COUNTRIES = ["Australia", "Egypt", "Ethiopia", "North and South Africa", "Dubai", "India", "Germany", "Switzerland", "Sweden", "France", "North America", "South America"]

function Anna() {
  return (
    <section id="anna" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="anna-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-blush">
            <img src={GALLERY[2]} alt="A wedding planned by Anna's Wedding Planning in Nassau" width={800} height={1000} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 hover:scale-[1.03]" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="self-center lg:col-span-6 lg:col-start-7">
          <Mark n="iii.">About Anna</Mark>
          <h2 id="anna-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Two decades of weddings, one planner who answers.</h2>
          <div className="mt-7 max-w-xl space-y-4 text-[18px] leading-relaxed text-muted">
            <p>Annamae Fox has planned destination weddings in The Bahamas for more than twenty years, with a network of trusted professionals around her.</p>
            <p>Her mission is simple: you enjoy the day without worry, and it feels like nobody else's. Experience, resourcefulness, time management and attention to detail are how she gets there.</p>
          </div>
          <p className="mt-10 text-[14px] text-muted">Couples have come to her from</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {COUNTRIES.map(c => <li key={c} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] transition hover:border-rose hover:text-rose">{c}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="overflow-hidden pb-24 md:pb-36" aria-label="Weddings by Anna">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-5">
          {GALLERY.map((src, i) => (
            <motion.div key={src} initial={{ clipPath: "inset(15% 0 15% 0)", opacity: 0 }} whileInView={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.2, delay: (i % 3) * 0.08, ease: [0.77, 0, 0.175, 1] }} className={`group overflow-hidden rounded-[20px] bg-blush ${["md:col-span-2 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "col-span-2 md:col-span-6"][i]}`}>
              <img src={src} alt="A wedding in Nassau planned by Anna's Wedding Planning" width={800} height={600} loading="lazy" className={`size-full object-cover transition duration-700 group-hover:scale-[1.03] ${i === 0 ? "aspect-[3/4] md:aspect-auto" : i === 5 ? "aspect-[16/8] md:aspect-[16/5]" : "aspect-[4/3]"}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="svc-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="flex items-baseline gap-3 text-[14px] text-paper/70"><span className="font-display text-[1.4rem] text-blush">iv.</span>What Anna does</p>
          <h2 id="svc-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">From first call to the last toast.</h2>
        </Reveal>
        <ol className="lg:col-span-7 lg:col-start-6">
          {SERVICES.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-paper/15 py-6 first:border-t">
              <span className="font-display text-xl text-blush">{i + 1}</span>
              <div><p className="font-display text-[clamp(1.5rem,2.2vw,2.1rem)] transition group-hover:translate-x-1">{t}</p><p className="mt-2 text-[16px] leading-relaxed text-paper/70">{d}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const KINDS = {
  beach: { label: "Beach wedding", fields: [["Wedding date", "date"], ["Guests", "number"], ["Where you are staying", "text"], ["Package you like", "text"]] },
  cruise: { label: "Cruise-day wedding", fields: [["Date in Nassau", "date"], ["Ship name", "text"], ["Guests", "number"], ["Package you like", "text"]] },
  renewal: { label: "Vow renewal", fields: [["Date", "date"], ["Years married", "number"], ["Guests", "number"], ["Where you are staying", "text"]] },
} as const
type K = keyof typeof KINDS

function Plan() {
  const [tab, setTab] = useState<K>("beach")
  const [vals, setVals] = useState<Record<string, string>>({})
  const summary = KINDS[tab].fields.map(([f]) => vals[`${tab}:${f}`] ? `${f}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean).join(" · ")
  return (
    <section id="plan" className="mx-auto grid max-w-[1440px] scroll-mt-24 gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="plan-title">
      <Reveal className="lg:col-span-4">
        <Mark n="v.">Check your wedding date</Mark>
        <h2 id="plan-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Have your details ready for Anna.</h2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Choose your kind of wedding and fill in what you know. We put it in one line you can read out when you call, from The Bahamas or the US line.</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Tabs value={tab} onValueChange={v => setTab(v as K)}>
          <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-full bg-blush p-1">
            {(Object.keys(KINDS) as K[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{KINDS[k].label}</TabsTrigger>)}
          </TabsList>
          {(Object.keys(KINDS) as K[]).map(k => (
            <TabsContent key={k} value={k} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {KINDS[k].fields.map(([f, type]) => (
                  <label key={f} className="block"><span className="text-[14px] text-muted">{f}</span>
                    <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none transition focus:border-rose" />
                  </label>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-10 rounded-[28px] bg-ink p-7 text-paper md:p-9">
          <p className="text-[15px] text-paper/80">{summary ? <>Read out: <span className="text-paper">{KINDS[tab].label} · {summary}</span></> : "Your details will appear here as one line."}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose px-6 text-white transition hover:-translate-y-0.5"><Phone className="size-4" aria-hidden /> Call Nassau {PHONE}</a>
            <a href={US_TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 transition hover:-translate-y-0.5 hover:border-paper">US line {US_PHONE}</a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const FAQ = [
  ["Can we marry on a cruise ship day in Nassau?", "Yes. Anna's cruise packages are built for it. The licence needs a letter from the ship's purser confirming the ship has been in Bahamian waters for 24 hours."],
  ["How long must we be in The Bahamas before applying for the licence?", "Both of you must be in The Bahamas and have been there for 24 hours before the date you apply."],
  ["What does a package cost?", "Published packages start at USD 950 for the Basic beach package. Cruise packages start at USD 3,495 for 25 guests. All can be adjusted to your guest count and wishes."],
  ["What is the marriage licence fee?", "The licence fee is $100. Anna prepares your documents and schedules the Registrar's appointment."],
]

function Questions() {
  return (
    <section className="border-t border-line" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Mark n="vi.">Questions</Mark>
          <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[0.98]">What couples ask first.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[clamp(1.2rem,1.7vw,1.55rem)] font-normal hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Finder /><Licence /><Anna /><Gallery /><Services /><Plan /><Questions /></Page>)
