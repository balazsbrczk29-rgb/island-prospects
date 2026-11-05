import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Plan from "./Plan"
import { SERVICES } from "./data"
import { Page, mount, Reveal, Head, ease, reveal, PHONE, TEL, PHONE2, TEL2 } from "./site"


function Hero() {
  return (
    <section className="drafting relative border-b border-line" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-120px)] max-w-[1440px] items-center gap-8 px-5 pt-10 pb-12 md:px-10 lg:grid-cols-12 lg:pt-6">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="label text-olive">Maximum Security &amp; Patrol Services Ltd · Carib Road, Nassau</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,6.8vw,6.8rem)] leading-[0.92] font-bold tracking-[-0.045em]">
            {["Trained officers", "for Nassau,", "since 1993."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i === 2 ? "text-olive" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1, ease: reveal }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease }} className="mt-7 max-w-[34rem] text-[18px] leading-relaxed text-ink/80">Security officers, patrols, alarm monitoring, investigations and consultancy for businesses, government and private clients in New Providence.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#proposal" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] bg-ink px-7 py-3.5 text-[16px] font-medium text-paper transition duration-200 hover:-translate-y-px hover:bg-olive-deep active:translate-y-0">Request a security proposal <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[3px] border border-ink/25 bg-paper px-6 py-3.5 text-[16px] transition duration-200 hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
          </motion.div>
        </div>
        <motion.div className="relative lg:col-span-6" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1.2, ease }}>
          <div className="rounded-[4px] border border-line bg-paper/80 p-3 shadow-[0_30px_60px_-40px_rgba(18,26,33,.45)] backdrop-blur-sm md:p-5">
            <Plan className="w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Main line", PHONE, TEL],
    ["Second line", PHONE2, TEL2],
    ["Office", "Carib House, #15 Carib Road, Nassau", "#contact"],
    ["Founded", "1993, by Byron C. Rodgers", "#since-1993"],
  ]
  return (
    <section className="bg-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-b border-paper/12 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="label text-olive-light">{k}</span>
              <span className={`mt-2.5 block font-display font-semibold tracking-tight ${i < 2 ? "whitespace-nowrap text-[clamp(1.7rem,2.3vw,2.3rem)] tabular-nums" : "text-[1.3rem] leading-snug md:text-[1.45rem]"}`}>{v}</span>
              <span className="mt-4 block h-[2px] w-0 bg-olive-light transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Services() {
  const [sel, setSel] = useState(0)
  const s = SERVICES[sel]
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="services-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7"><Head index="01" label="Services" id="services-title" title={<>Five ways we cover a site.</>} /></div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[18px] leading-relaxed text-muted">Choose a service to see where it sits on a typical premises. Most sites need more than one; we put them together under one company.</p></Reveal>
      </div>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <ol className="lg:col-span-5" aria-label="Services">
          {SERVICES.map((x, i) => (
            <li key={x.k} className="border-t border-line last:border-b">
              <button type="button" onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} aria-pressed={sel === i} className="group grid w-full grid-cols-[2.8rem_1fr] items-baseline gap-3 py-5 text-left">
                <span className={`font-display text-lg font-bold tabular-nums transition ${sel === i ? "text-olive" : "text-steel"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block font-display text-[clamp(1.45rem,2.2vw,2rem)] font-semibold tracking-tight transition ${sel === i ? "translate-x-1" : "group-hover:translate-x-1"}`}>{x.t}</span>
                  <motion.span initial={false} animate={{ height: sel === i ? "auto" : 0, opacity: sel === i ? 1 : 0 }} transition={{ duration: 0.45, ease }} className="block overflow-hidden">
                    <span className="block max-w-md pt-2 text-[16px] leading-relaxed text-muted">{x.d}</span>
                    <span className="label mt-3 block !text-[11px] text-olive">For: {x.who}</span>
                  </motion.span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="lg:col-span-7">
          <div className="drafting sticky top-28 rounded-[4px] border border-line bg-paper-2/60 p-3 md:p-6">
            <Plan layer={s.k} draw={false} className="w-full" />
            <p className="mt-2 flex items-center justify-between gap-4 border-t border-line pt-4 text-[15px]"><span className="font-display font-semibold">{s.t}</span><a href="services.html" className="ulink text-muted">Service detail</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section id="since-1993" className="relative overflow-hidden bg-paper-2" aria-labelledby="story-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Head index="02" label="Since 1993" id="story-title" title={<>It started with a dozen officers.</>}>
            <p className="mt-7 max-w-lg text-[18px] leading-relaxed text-muted">Mr. Byron C. Rodgers, Chairman and CEO, founded Maximum Security &amp; Patrol Services in 1993 with not more than a dozen fully trained officers. The company has served the business and financial community, government, retail and private clients from Carib Road ever since.</p>
          </Head>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <p aria-hidden className="font-display text-[clamp(7rem,17vw,15rem)] leading-[0.8] font-bold tracking-[-0.06em] text-ink/[0.07]">1993</p>
          <blockquote className="-mt-10 border-l-2 border-olive pl-6 md:-mt-16">
            <p className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.15] font-semibold tracking-tight">“Our leadership has often been commended for transforming an industry known for turnover and low standards.”</p>
            <footer className="mt-4 text-[15px] text-muted">From the company's own description</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

function Sectors() {
  const rows = [
    ["Business and financial community", "Banks, offices and professional firms"],
    ["Government", "Public buildings and agencies"],
    ["Retail", "Stores, plazas and their car parks"],
    ["Private clients", "Homes, estates and individuals"],
  ]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="sectors-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="03" label="Who we protect" id="sectors-title" title={<>Public and private, across sectors.</>} /></div>
        <ul className="lg:col-span-7 lg:col-start-6">
          {rows.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="group grid gap-1 border-t border-line py-6 last:border-b md:grid-cols-[1.3fr_1fr] md:items-baseline">
              <span className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-tight transition group-hover:translate-x-1">{t}</span>
              <span className="text-[16px] text-muted">{d}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

type F = { k: string; type?: string; options?: string[] }
const PREMISES = ["Office", "Bank or financial", "Retail store or plaza", "Government building", "Residence or estate", "Warehouse or yard", "Event", "Other"]
const PROPOSALS: Record<string, { label: string; fields: F[] }> = {
  officers: { label: "Officers on post", fields: [{ k: "Premises", options: PREMISES }, { k: "Number of posts", options: ["1", "2", "3", "4+", "Not sure"] }, { k: "Coverage", options: ["Business hours", "Nights", "24 hours", "Weekends", "One-off event"] }, { k: "Start date", type: "date" }] },
  patrol: { label: "Patrols", fields: [{ k: "Premises", options: PREMISES }, { k: "Sites to patrol", options: ["1", "2-3", "4+"] }, { k: "When", options: ["Nights", "After hours", "Weekends", "24 hours"] }, { k: "Area or street" }] },
  alarm: { label: "Alarm monitoring", fields: [{ k: "Premises", options: PREMISES }, { k: "Existing alarm", options: ["Yes", "No", "Not sure"] }, { k: "Area or street" }] },
  other: { label: "Investigations or consultancy", fields: [{ k: "I need", options: ["An investigation", "A site security review", "Security for a special situation"] }, { k: "Premises", options: PREMISES }, { k: "Timing", options: ["Urgent", "This month", "Planning ahead"] }] },
}

function Proposal() {
  const [tab, setTab] = useState("officers")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [org, setOrg] = useState("")
  const conf = PROPOSALS[tab]
  const lines = useMemo(() => conf.fields.map(f => vals[`${tab}:${f.k}`] ? `${f.k}: ${vals[`${tab}:${f.k}`]}` : null).filter(Boolean) as string[], [conf, vals, tab])
  const input = "mt-2 block min-h-12 w-full rounded-none border-b border-ink/30 bg-transparent text-[17px] outline-none transition focus:border-olive"
  return (
    <section id="proposal" className="bg-deep text-paper" aria-labelledby="proposal-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Head dark index="04" label="Request a proposal" id="proposal-title" title={<>Put your site on one line.</>}>
            <p className="mt-6 max-w-sm text-[18px] leading-relaxed text-paper/70">The office takes requests by phone. Choose the service, fill in what you know, and read the summary out when you call.</p>
          </Head>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-[4px] bg-paper p-5 text-ink md:p-8">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-[3px] bg-paper-2 p-1">
                {Object.entries(PROPOSALS).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-[2px] px-4 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{c.label}</TabsTrigger>)}
              </TabsList>
              {Object.entries(PROPOSALS).map(([k, c]) => (
                <TabsContent key={k} value={k} className="mt-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {c.fields.map(f => {
                      const id = `${k}-${f.k.replace(/\W+/g, "-").toLowerCase()}`
                      const v = vals[`${k}:${f.k}`] ?? ""
                      const set = (x: string) => setVals(o => ({ ...o, [`${k}:${f.k}`]: x }))
                      return (
                        <div key={f.k}>
                          <label htmlFor={id} className="label text-muted">{f.k}</label>
                          {f.options ? <select id={id} value={v} onChange={e => set(e.target.value)} className={input}><option value="">Choose</option>{f.options.map(o => <option key={o}>{o}</option>)}</select>
                            : <input id={id} type={f.type ?? "text"} value={v} onChange={e => set(e.target.value)} className={input} />}
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="mt-6"><label htmlFor="org" className="label text-muted">Company or name</label><input id="org" value={org} onChange={e => setOrg(e.target.value)} autoComplete="organization" className={input} /></div>
          </div>
          <div className="mt-6 grid gap-5 rounded-[4px] border border-paper/15 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="label text-olive-light">Read this out when you call</p>
              <p className="mt-3 text-[17px] leading-relaxed text-paper/90">{lines.length ? `${org ? `${org}: ` : ""}${conf.label}. ${lines.join(". ")}.` : "Your summary appears here as you choose."}</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] bg-paper px-6 font-medium text-ink transition hover:-translate-y-px active:translate-y-0"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
              <a href={TEL2} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper">Or {PHONE2}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Maximum Security & Patrol Services?", "At Carib House, #15 Carib Road, Nassau, New Providence. Postal address P.O. Box N-9425."],
  ["What services do you provide?", "Trained security officers, patrols, alarm monitoring, investigations and consultancy, plus customised arrangements for situations that need a special response."],
  ["Who do you work for?", "Clients in the business and financial community, government, retail and private clients."],
  ["How do I request a proposal?", `Call the office on ${PHONE} or ${PHONE2}. Use the proposal summary on this page so you have the details ready.`],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="05" label="Questions" id="faq-title" title={<>Before you call.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.25rem] font-semibold tracking-tight hover:no-underline md:text-[1.45rem]">{q}</AccordionTrigger>
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
    <section id="contact" className="border-t border-line bg-paper-2" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="06" label="The office" id="contact-title" title={<>Carib House, #15 Carib Road.</>}>
            <p className="mt-5 max-w-md text-[18px] leading-relaxed text-muted">Nassau, New Providence. P.O. Box N-9425.</p>
          </Head>
          <div className="mt-10 grid gap-3">
            <a href={TEL} className="block rounded-[4px] bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-olive-deep">
              <span className="label text-olive-light">Main line</span>
              <span className="mt-2 block font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none font-bold tracking-tight tabular-nums">{PHONE}</span>
            </a>
            <a href={TEL2} className="flex items-center justify-between rounded-[4px] border border-ink/20 p-5 transition hover:-translate-y-0.5 hover:border-ink">
              <span className="label text-muted">Second line</span><span className="font-display text-2xl font-semibold tabular-nums">{PHONE2}</span>
            </a>
            <p className="px-1 text-[15px] text-muted">Fax 242-394-5428</p>
          </div>
        </div>
        <Reveal delay={0.1} className="overflow-hidden rounded-[4px] border border-line lg:col-span-7">
          <iframe title="Map of Carib Road, Nassau, New Providence" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[480px]" src="https://www.google.com/maps?q=Carib+Road,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Services /><Story /><Sectors /><Proposal /><Questions /><Contact /></Page>)
