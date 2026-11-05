import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, ArrowUpRight, Copy, Mail, Phone, ShoppingBag } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DEPTS, MOMENTS, SHOP, REGISTRY } from "./data"
import { Page, mount, Reveal, Eyebrow, ease, PHONE, TEL, EMAIL } from "./site"

const TINTS = ["#efe1e7", "#dfece7", "#f0e6d2", "#e4e3ee", "#e9ddd3"]
function Tile({ d, i }: { d: (typeof DEPTS)[number]; i: number }) {
  return (
    <a href={d.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl" style={{ background: TINTS[i % TINTS.length] }} tabIndex={-1}>
      <img src={d.img} alt="" loading={i < 6 ? "eager" : "lazy"} width={400} height={500} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      <span className="absolute inset-x-2 bottom-2 rounded-xl bg-paper/90 px-3 py-2 text-[13px] leading-tight backdrop-blur">{d.name}</span>
    </a>
  )
}

function Hero() {
  const cols = [DEPTS.slice(0, 7), DEPTS.slice(7, 14), DEPTS.slice(14).concat(DEPTS.slice(0, 2))]
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-120px)] max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center py-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[14px] tracking-[0.14em] text-muted uppercase">Kelly's House &amp; Home · The Mall at Marathon, Nassau</motion.p>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(2.9rem,6.2vw,6.4rem)] leading-[0.98] tracking-[-0.03em]">
            {["Fine china", "to water tanks,", "since 1927."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i === 2 ? "text-bloom" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-7 max-w-[44ch] text-[18px] leading-relaxed text-ink/75">Nassau's largest department store: 40,000 square feet of housewares, hardware, paint, garden, toys and more at the Mall at Marathon, online, and on the mail boat to every Family Island.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href={SHOP} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-bloom"><ShoppingBag className="size-4" aria-hidden /> Shop Kelly's online</a>
            <a href="#islands" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-[15px] transition hover:-translate-y-px hover:border-ink">Ordering from a Family Island <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.2 }} className="wall relative hidden h-[calc(100svh-120px)] grid-cols-3 gap-3 overflow-hidden lg:grid" aria-hidden>
          {cols.map((c, ci) => (
            <div key={ci} className="wall-col flex flex-col gap-3" style={{ ["--d" as string]: `${70 + ci * 18}s`, animationDirection: ci === 1 ? "reverse" : "normal" }}>
              {[...c, ...c].map((d, i) => <Tile key={`${d.name}-${i}`} d={d} i={i + ci} />)}
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
        </motion.div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-6 lg:hidden" aria-hidden>
          {DEPTS.slice(0, 8).map((d, i) => <div key={d.name} className="w-40 shrink-0"><Tile d={d} i={i} /></div>)}
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [["Call the store", PHONE, TEL], ["Find us", "The Mall at Marathon", "#visit"], ["Family Islands", "Mail boat delivery", "#islands"], ["Shop anytime", "kellysbahamas.com", SHOP]]
  return (
    <section className="bg-bloom text-white" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease }} className="border-white/20 max-sm:border-b sm:max-lg:odd:border-r lg:border-l lg:first:border-l-0">
            <a href={href} className="group flex items-end justify-between gap-3 px-5 py-7 transition hover:bg-white/10 md:px-8 md:py-9">
              <span><span className="block text-[13px] text-white/75">{k}</span><span className="mt-1 block font-display text-[clamp(1.35rem,1.9vw,1.8rem)]">{v}</span></span>
              <ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Moments() {
  const [id, setId] = useState(MOMENTS[0].id)
  const m = MOMENTS.find(x => x.id === id)!
  const imgs = m.depts.map(n => DEPTS.find(d => d.name === n)!)
  return (
    <section id="moments" className="scroll-mt-20 mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="mom-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow n="01">Whatever is happening at home</Eyebrow>
            <h2 id="mom-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.02em]">Getting married, expecting, painting, planting.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Kelly's own promise, made practical. Pick what is going on and see where to start.</p>
          </Reveal>
          <ul className="mt-10 border-t border-line" role="tablist" aria-label="What is happening at home">
            {MOMENTS.map(x => (
              <li key={x.id} className="border-b border-line">
                <button role="tab" aria-selected={id === x.id} onClick={() => setId(x.id)} onMouseEnter={() => setId(x.id)} className="group flex min-h-16 w-full items-center justify-between text-left">
                  <span className={`font-display text-[clamp(1.4rem,2.2vw,2rem)] transition ${id === x.id ? "translate-x-2 text-bloom" : "group-hover:translate-x-1"}`}>{x.label}</span>
                  <ArrowRight className={`size-5 transition ${id === x.id ? "text-bloom" : "text-muted opacity-0 group-hover:opacity-100"}`} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div key={id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} role="tabpanel">
              <div className="grid grid-cols-[1.3fr_1fr] gap-3">
                <a href={imgs[0].href} className="group row-span-2 overflow-hidden rounded-[22px]" style={{ background: TINTS[0] }}><img src={imgs[0].img} alt={imgs[0].name} loading="lazy" width={600} height={760} className="aspect-[4/5] size-full object-cover transition duration-700 group-hover:scale-[1.03]" /></a>
                {imgs.slice(1).map((d, i) => <a key={d.name} href={d.href} className="group overflow-hidden rounded-[22px]" style={{ background: TINTS[i + 1] }}><img src={d.img} alt={d.name} loading="lazy" width={400} height={300} className="aspect-[4/3] size-full object-cover transition duration-700 group-hover:scale-[1.03]" /></a>)}
              </div>
              <div className="mt-6 flex flex-col gap-5 rounded-[22px] bg-paper-2 p-6 md:flex-row md:items-center md:justify-between">
                <div><p className="text-[17px]">{m.line}</p><p className="mt-2 text-[14px] text-muted">{m.depts.join(" · ")}</p></div>
                <a href={m.cta[1]} className="group inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-bloom">{m.cta[0]} <ArrowUpRight className="size-4" aria-hidden /></a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const ISLANDS = ["Abaco", "Acklins", "Andros", "Berry Islands", "Bimini", "Cat Island", "Crooked Island", "Eleuthera", "Exuma", "Grand Bahama", "Harbour Island", "Inagua", "Long Island", "Mayaguana", "Ragged Island", "Rum Cay", "San Salvador", "Spanish Wells"]
function Islands() {
  const [f, setF] = useState({ receiver: "", boat: "", settlement: "", island: "", notes: "" })
  const [copied, setCopied] = useState(false)
  const text = [`Mail boat delivery instructions`, `Receiver: ${f.receiver || "..."}`, `Mail boat: ${f.boat || "..."}`, `Settlement: ${f.settlement || "..."}`, `Island: ${f.island || "..."}`, f.notes ? `Special instructions: ${f.notes}` : ""].filter(Boolean).join("\n")
  const ready = f.receiver && f.boat && f.settlement && f.island
  const copy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) } }
  const field = (k: keyof typeof f, label: string) => (
    <label className="block"><span className="text-[13px] text-paper/70">{label}</span>
      <input value={f[k]} onChange={e => setF(v => ({ ...v, [k]: e.target.value }))} className="mt-2 block min-h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-[16px] text-paper outline-none transition focus:border-sea" /></label>
  )
  const steps = [["Shop", "Order online or in store and choose mail boat delivery."], ["Potters Cay Dock", "Kelly's delivers your order to the boat you name, Monday to Friday, for a $25 fee plus VAT."], ["Your island", "You arrange freight payment and collection with the shipper."]]
  return (
    <section id="islands" className="scroll-mt-20 bg-sea-deep text-paper" aria-labelledby="isl-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow n="02" light>Family Island orders</Eyebrow>
            <h2 id="isl-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.02em]">From Marathon to the mail boat.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/75">Kelly's delivers to Potters Cay Dock for shipping to every Family Island. Fill in the four details the store needs, then paste them into your order.</p>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4 bg-sea-deep/95 p-5"><span className="font-display text-2xl text-sea">{i + 1}</span><span><span className="block font-display text-xl">{t}</span><span className="mt-1 block text-[15px] text-paper/70">{d}</span></span></li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[26px] border border-white/15 bg-white/5 p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {field("receiver", "Receiver's name")}
                {field("boat", "Name of the mail boat")}
                {field("settlement", "Settlement")}
                <label className="block"><span className="text-[13px] text-paper/70">Island</span>
                  <select value={f.island} onChange={e => setF(v => ({ ...v, island: e.target.value }))} className="mt-2 block min-h-12 w-full rounded-xl border border-white/15 bg-sea-deep px-4 text-[16px] text-paper outline-none focus:border-sea">
                    <option value="">Choose an island</option>
                    {ISLANDS.map(i => <option key={i}>{i}</option>)}
                  </select></label>
                <div className="sm:col-span-2">{field("notes", "Special delivery instructions (optional)")}</div>
              </div>
              <pre className="mt-6 overflow-x-auto rounded-xl bg-black/25 p-4 font-sans text-[14px] leading-relaxed whitespace-pre-wrap text-paper/90">{text}</pre>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={copy} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-[15px] text-ink transition hover:-translate-y-px"><Copy className="size-4" aria-hidden /> {copied ? "Copied" : "Copy instructions"}</button>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Mail boat delivery instructions")}&body=${encodeURIComponent(text)}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-[15px] transition hover:-translate-y-px hover:border-white"><Mail className="size-4" aria-hidden /> Email them to Kelly's</a>
              </div>
              <p className="mt-4 text-[13px] text-paper/60">{ready ? "All four details are in." : "Receiver, boat, settlement and island are all needed."} Orders after the cut-off time go on the next delivery.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const items = [
    ["Gift registry", "Weddings, showers, birthdays and anniversaries.", REGISTRY],
    ["Contractor Cards", "For the trade, at Nassau's largest department store.", "#visit"],
    ["In-store pick up", "Order online, collect at the Mall at Marathon.", SHOP],
    ["Local delivery", "New Providence and Paradise Island, Monday to Saturday.", SHOP],
  ]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="svc-title">
      <Reveal className="max-w-2xl">
        <Eyebrow n="03">Ways to shop</Eyebrow>
        <h2 id="svc-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04] tracking-[-0.02em]">However you need it, Kelly's has a way.</h2>
      </Reveal>
      <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] bg-line md:grid-cols-2 lg:grid-cols-4">
        {items.map(([t, d, href], i) => (
          <Reveal key={t} delay={i * 0.06} className="bg-paper">
            <a href={href} className="group flex h-full min-h-52 flex-col justify-between p-7 transition hover:bg-paper-2">
              <span className="font-display text-[15px] text-bloom">0{i + 1}</span>
              <span><span className="block font-display text-2xl transition group-hover:translate-x-1">{t}</span><span className="mt-2 block text-[15px] text-muted">{d}</span></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Kelly's House & Home?", "In the Mall at Marathon on Robinson Road, Nassau (P.O. Box N-865). Call (242) 393-4002."],
  ["Does Kelly's ship to the Family Islands?", "Yes. Kelly's delivers to Potters Cay Dock for shipping on the mail boat you choose, Monday to Friday, for a $25 fee plus VAT. The customer arranges freight payment and collection with the shipper."],
  ["Does Kelly's deliver in Nassau?", "Yes. Local deliveries on New Providence and Paradise Island run Monday to Saturday. Orders after the afternoon cut-off are scheduled for the next day where possible."],
  ["Can I set up a gift registry?", "Yes. Kelly's runs a gift registry for weddings, showers, birthdays and anniversaries."],
]
function Visit() {
  return (
    <section id="visit" className="scroll-mt-20 border-t border-line bg-paper-2" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow n="04">Visit</Eyebrow>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.02em]">The Mall at Marathon.</h2>
          <p className="mt-5 text-[17px] text-muted">Robinson Road, Nassau. P.O. Box N-865.</p>
          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink text-paper transition hover:-translate-y-px hover:bg-bloom"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-ink/20 transition hover:-translate-y-px hover:border-ink"><Mail className="size-4" aria-hidden /> Email Kelly's</a>
          </div>
          <Accordion type="single" collapsible defaultValue="q0" className="mt-12 border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left font-display text-xl hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[26px] border border-line lg:col-span-7">
          <iframe title="Map of Kelly's House & Home, The Mall at Marathon, Nassau" loading="lazy" className="h-[440px] w-full lg:h-full" src="https://www.google.com/maps?q=Kelly's+House+%26+Home,+Mall+at+Marathon,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Moments /><Islands /><Services /><Visit /></Page>)
