import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Phone, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Truck from "./Truck"
import { Page, mount, Reveal, Head, ease, reveal, PHONE, TEL, PHONE2, TEL2 } from "./site"

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 md:px-10 md:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-brass">Armoured Express (Bahamas) Ltd · Stapledon Gardens, Nassau</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="label text-muted">Nassau and Grand Bahama</motion.p>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 id="hero-title" className="text-[clamp(3.1rem,8.6vw,9.2rem)] leading-[0.88] font-extrabold tracking-[-0.055em] lg:col-span-8">
            {["Cash in transit,", "since 1961."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-brass" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.05, ease: reveal }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="lg:col-span-4 lg:pb-3">
            <p className="text-[18px] leading-relaxed text-ink/80">Armoured vehicles, armed uniformed guards, ATM replenishment and air courier to the Family Islands. 100% Bahamian-owned.</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row lg:flex-col">
              <a href="#planner" className="group inline-flex whitespace-nowrap min-h-13 items-center justify-center gap-2 bg-ink px-6 py-3.5 font-semibold text-paper transition hover:-translate-y-px hover:bg-steel">Request a service proposal <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
              <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 whitespace-nowrap border border-ink/25 px-5 py-3.5 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden />{PHONE}</a>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[1440px] px-5 md:mt-2 md:px-10"><Truck className="w-full" /></div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Main line", PHONE, TEL], ["Second line", PHONE2, TEL2], ["Office hours", "Mon to Fri, 9:00 to 5:00", "#contact"], ["Support", "24-hour support for clients", "#custody"]]
  return (
    <section className="bg-steel text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h], i) => (
          <li key={k} className="border-b border-paper/12 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="label text-brass-light">{k}</span>
              <span className={`mt-2.5 block font-bold tracking-tight ${i < 2 ? "whitespace-nowrap text-[clamp(1.7rem,2.3vw,2.3rem)] tabular-nums" : "text-[1.3rem] leading-snug"}`}>{v}</span>
              <span className="mt-4 block h-[3px] w-0 bg-brass-light transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const STEPS = [
  { t: "Collected", d: "Highly trained, uniformed and armed guards collect at your premises." },
  { t: "Sealed", d: "Cash travels in a secure, locked transit bag." },
  { t: "In transit", d: "In a secure armoured vehicle, with surveillance-enabled cash-in-transit." },
  { t: "Delivered", d: "Handed over where you direct: your bank, your branch, or flown on to a Family Island." },
  { t: "Dispensed", d: "ATMs replenished and given first-line maintenance, the service the company pioneered here." },
]

function Custody() {
  const [n, setN] = useState(1)
  return (
    <section id="custody" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="cust-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7"><Head index="01" label="Chain of custody" id="cust-title" title={<>Every hand-off, accounted for.</>} /></div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[18px] leading-relaxed text-muted">Step through a consignment the way the crew handles it. Each stage is signed off on the tag before the next begins.</p></Reveal>
      </div>
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7"><ol>
          {STEPS.map((s, i) => {
            const done = i < n, cur = i === n - 1
            return (
              <li key={s.t} className="border-t border-line last:border-b">
                <button type="button" onClick={() => setN(i + 1)} aria-pressed={done} className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left">
                  <span className={`flex size-10 items-center justify-center border-2 font-bold tabular-nums transition ${done ? "border-ink bg-ink text-paper" : "border-line text-muted group-hover:border-ink/40"}`}>{done ? <Check className="size-4" aria-hidden /> : i + 1}</span>
                  <span>
                    <span className={`block text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold tracking-tight transition group-hover:translate-x-1 ${done ? "" : "text-ink/45"}`}>{s.t}</span>
                    <span className="mt-1 block max-w-lg text-[16px] text-muted">{s.d}</span>
                  </span>
                  <span className={`label !text-[11px] ${cur ? "text-brass" : "text-transparent"}`}>Now</span>
                </button>
              </li>
            )
          })}
          </ol>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={() => setN(Math.max(1, n - 1))} className="min-h-12 border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">Back a step</button>
            <button type="button" onClick={() => setN(n >= STEPS.length ? 1 : n + 1)} className="min-h-12 bg-ink px-6 font-semibold text-paper transition hover:-translate-y-px hover:bg-steel">{n >= STEPS.length ? "Start again" : "Sign off next step"}</button>
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="relative mx-auto max-w-sm rotate-[-1.5deg] bg-[#e9d9b4] p-7 pt-12 shadow-[0_30px_50px_-30px_rgba(20,22,27,.5)] [clip-path:polygon(14%_0,86%_0,100%_9%,100%_100%,0_100%,0_9%)] lg:sticky lg:top-28">
            <span className="absolute top-4 left-1/2 size-5 -translate-x-1/2 rounded-full border-2 border-ink/40 bg-paper" aria-hidden />
            <p className="label text-center text-ink/70">Transit tag</p>
            <p className="mt-1 text-center text-[1.4rem] font-extrabold tracking-tight">Armoured Express</p>
            <ul className="mt-6 space-y-2 border-t border-dashed border-ink/40 pt-5">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex items-center justify-between text-[15px]">
                  <span className={i < n ? "font-semibold" : "text-ink/40"}>{s.t}</span>
                  <AnimatePresence>{i < n && <motion.span initial={{ scale: 1.8, opacity: 0, rotate: -14 }} animate={{ scale: 1, opacity: 1, rotate: -6 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} className="border-2 border-brass px-1.5 text-[11px] font-bold tracking-[0.14em] text-brass uppercase">Signed</motion.span>}</AnimatePresence>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-dashed border-ink/40 pt-4 text-center text-[13px] text-ink/60" aria-live="polite">{n >= STEPS.length ? "Consignment complete." : `Next: ${STEPS[n].t.toLowerCase()}.`}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-paper-2" aria-labelledby="svc-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Head index="02" label="Two companies, one family" id="svc-title" title={<>One mission: protect what you move and where you keep it.</>} />
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="bg-paper p-7 md:p-10 lg:col-span-7">
            <p className="label text-brass">Armoured Express (Bahamas) Ltd.</p>
            <ul className="mt-6">
              {[["Cash in transit", "Armoured vehicles, armed uniformed guards, locked transit bags, surveillance-enabled."], ["ATM services", "Replenishment and first-line maintenance."], ["Family Island air courier", "Consignments flown to the Family Islands."], ["24-hour support", "For clients, around the clock."]].map(([t, d]) => (
                <li key={t} className="group grid gap-1 border-t border-line py-5 md:grid-cols-[1fr_1.3fr]"><span className="text-[1.5rem] font-bold tracking-tight transition group-hover:translate-x-1">{t}</span><span className="text-[16px] text-muted">{d}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="bg-steel p-7 text-paper md:p-10 lg:col-span-5">
            <p className="label text-brass-light">Security Services (Bah.) Ltd.</p>
            <p className="mt-3 text-[16px] text-paper/70">The subsidiary that extends the offer on the ground and at the airport.</p>
            <ul className="mt-6">
              {[["Static guards", "Officers stationed at your premises."], ["Aviation security", "Security for aviation clients."]].map(([t, d]) => (
                <li key={t} className="group border-t border-paper/15 py-5"><span className="block text-[1.5rem] font-bold tracking-tight transition group-hover:translate-x-1">{t}</span><span className="mt-1 block text-[16px] text-paper/70">{d}</span></li>
              ))}
            </ul>
            <a href="services.html" className="group mt-4 inline-flex items-center gap-2 text-brass-light"><span className="ulink">All services in detail</span><ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Standards() {
  const rows = [["Public liability", "Coverage up to two million dollars"], ["Countermeasures", "Best practice in security countermeasures to deter attack"], ["In transit", "Surveillance-enabled cash-in-transit"], ["Containers", "Secure, locked transit bags"], ["Continuity", "Armoured Services Officers cross-trained in physical security"], ["Leadership", "A seasoned management team of armoured security experts"]]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="std-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="03" label="What sets us apart" id="std-title" title={<>The questions your insurer will ask.</>} /></div>
        <dl className="lg:col-span-7 lg:col-start-6">
          {rows.map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease }} className="grid gap-1 border-t border-line py-5 last:border-b md:grid-cols-[1fr_2fr]">
              <dt className="label pt-1.5 text-muted">{k}</dt><dd className="text-[1.35rem] leading-snug font-semibold tracking-tight">{v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Heritage() {
  return (
    <section id="since-1961" className="relative overflow-hidden bg-ink text-paper" aria-labelledby="her-title">
      <p aria-hidden className="pointer-events-none absolute -right-6 -bottom-10 text-[clamp(10rem,30vw,28rem)] leading-none font-extrabold tracking-[-0.06em] text-paper/[0.05]">1961</p>
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-6"><Head dark index="04" label="Since 1961" id="her-title" title={<>Bahamian-owned, from the first armoured run.</>} /></div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <ol className="border-l border-brass-light/50">
            {[["1961", "Founded as Burns Security International."], ["First", "The first in The Bahamas to answer the demand for ATM services."], ["Today", "Armoured Express and Security Services: 100% Bahamian-owned and operated, serving Nassau and Grand Bahama for over 60 years."]].map(([y, t]) => (
              <li key={y} className="relative pb-10 pl-8 last:pb-0"><span className="absolute top-2 -left-[5px] size-2.5 bg-brass-light" aria-hidden /><span className="text-[1.6rem] font-extrabold tracking-tight text-brass-light">{y}</span><p className="mt-2 max-w-md text-[17px] leading-relaxed text-paper/80">{t}</p></li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

type F = { k: string; type?: string; options?: string[] }
const BIZ = ["Bank or credit union", "Retail store", "Fuel station", "Restaurant or hotel", "Government office", "Other business"]
const PLAN: Record<string, { label: string; fields: F[] }> = {
  cit: { label: "Cash collection", fields: [{ k: "Business", options: BIZ }, { k: "Island", options: ["New Providence", "Grand Bahama"] }, { k: "Frequency", options: ["Daily", "Several times a week", "Weekly", "One-off"] }, { k: "Start date", type: "date" }] },
  atm: { label: "ATM services", fields: [{ k: "Number of ATMs", options: ["1", "2-5", "6+"] }, { k: "Island", options: ["New Providence", "Grand Bahama"] }, { k: "Need", options: ["Replenishment", "First-line maintenance", "Both"] }] },
  air: { label: "Family Island courier", fields: [{ k: "Destination island" }, { k: "Consignment", options: ["Cash", "Valuables", "Documents"] }, { k: "Frequency", options: ["Regular", "One-off"] }] },
  guard: { label: "Guards & aviation", fields: [{ k: "Service", options: ["Static guards", "Aviation security"] }, { k: "Premises or airport" }, { k: "Hours", options: ["Business hours", "Nights", "24 hours"] }] },
}

function Planner() {
  const [tab, setTab] = useState("cit")
  const [v, setV] = useState<Record<string, string>>({})
  const [org, setOrg] = useState("")
  const c = PLAN[tab]
  const lines = useMemo(() => c.fields.map(f => v[`${tab}:${f.k}`] ? `${f.k}: ${v[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [c, v, tab])
  const input = "mt-2 block min-h-12 w-full border-b-2 border-ink/20 bg-transparent text-[17px] outline-none transition focus:border-brass"
  return (
    <section id="planner" className="bg-paper-2" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Head index="05" label="Request service" id="plan-title" title={<>Brief us in one minute.</>}>
            <p className="mt-6 max-w-sm text-[18px] leading-relaxed text-muted">Requests are taken by phone. Choose the service, fill in what you know, and read the summary to the office.</p>
          </Head>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-0 rounded-none border border-ink/15 bg-paper p-0">
              {Object.entries(PLAN).map(([k, x]) => <TabsTrigger key={k} value={k} className="min-h-12 flex-none rounded-none px-4 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{x.label}</TabsTrigger>)}
            </TabsList>
            {Object.entries(PLAN).map(([k, x]) => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {x.fields.map(f => {
                    const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`, val = v[`${k}:${f.k}`] ?? ""
                    const set = (s: string) => setV(o => ({ ...o, [`${k}:${f.k}`]: s }))
                    return <div key={f.k}><label htmlFor={id} className="label text-muted">{f.k}</label>{f.options ? <select id={id} value={val} onChange={e => set(e.target.value)} className={input}><option value="">Choose</option>{f.options.map(o => <option key={o}>{o}</option>)}</select> : <input id={id} type={f.type ?? "text"} value={val} onChange={e => set(e.target.value)} className={input} />}</div>
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-6"><label htmlFor="org" className="label text-muted">Company</label><input id="org" value={org} onChange={e => setOrg(e.target.value)} autoComplete="organization" className={input} /></div>
          <div className="mt-10 grid gap-5 bg-ink p-6 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div><p className="label text-brass-light">Read this to the office</p><p className="mt-3 text-[17px] leading-relaxed text-paper/90">{lines.length ? `${org ? `${org}. ` : ""}${c.label}. ${lines.join(". ")}.` : "Your summary appears here as you choose."}</p></div>
            <div className="flex flex-col gap-2">
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 bg-paper px-6 font-semibold text-ink transition hover:-translate-y-px"><Phone className="size-4" aria-hidden />{PHONE}</a>
              <a href={TEL2} className="inline-flex min-h-12 items-center justify-center border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper">Or {PHONE2}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where are Armoured Express and Security Services based?", "In Stapledon Gardens, Nassau, New Providence (P.O. Box N-4499). The companies serve Nassau and Grand Bahama."],
  ["Do you replenish ATMs?", "Yes. Armoured Express was the first in The Bahamas to cater to the demand for ATM services and specialises in replenishing ATMs and first-line maintenance."],
  ["Can you move cash or valuables to the Family Islands?", "Yes, through the company's air courier solutions for the Family Islands."],
  ["What insurance do you carry?", "Public liability coverage up to two million dollars."],
  ["When can I reach the office?", `Monday to Friday, 9:00 to 5:00, on ${PHONE} or ${PHONE2}. Clients have 24-hour support.`],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="06" label="Questions" id="faq-title" title={<>Straight answers.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left text-[1.2rem] font-bold tracking-tight hover:no-underline md:text-[1.4rem]">{q}</AccordionTrigger>
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
          <Head index="07" label="The office" id="contact-title" title={<>Stapledon Gardens, Nassau.</>}><p className="mt-5 max-w-md text-[18px] text-muted">P.O. Box N-4499. Monday to Friday, 9:00 to 5:00.</p></Head>
          <a href={TEL} className="mt-10 block bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-steel"><span className="label text-brass-light">Main line</span><span className="mt-2 block text-[clamp(2.2rem,4vw,3.2rem)] leading-none font-extrabold tracking-tight tabular-nums">{PHONE}</span></a>
          <a href={TEL2} className="mt-3 flex items-center justify-between border border-ink/20 p-5 transition hover:-translate-y-0.5 hover:border-ink"><span className="label text-muted">Second line</span><span className="text-2xl font-bold tabular-nums">{PHONE2}</span></a>
        </div>
        <Reveal delay={0.1} className="overflow-hidden border border-line lg:col-span-7"><iframe title="Map of Stapledon Gardens, Nassau" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[480px]" src="https://www.google.com/maps?q=Stapledon+Gardens,+Nassau,+Bahamas&output=embed" /></Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Custody /><Services /><Standards /><Heritage /><Planner /><Questions /><Contact /></Page>)
