import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import Truck, { TruckPlate, CALLOUTS } from "./Truck"
import Manifest, { PlanProvider, usePlan, CopyButton, stageCount, type Svc } from "./Planner"
import { Page, mount, OfficeStatus, PHONE, TEL, PHONE2, TEL2, out } from "./site"

function useSendToPlanner() {
  const { plan, set } = usePlan()
  return (s: Svc) => {
    set({ svcs: plan.svcs.includes(s) ? plan.svcs : [...plan.svcs, s], focus: s })
    document.getElementById("manifest")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
  }
}

function In({ children, className = "", delay = 0, as }: { children: React.ReactNode; className?: string; delay?: number; as?: "li" }) {
  const reduce = useReducedMotion()
  const C = as === "li" ? motion.li : motion.div
  return <C className={className} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.5, delay, ease: out }}>{children}</C>
}

function HeroTruck() {
  const { plan } = usePlan()
  return <Truck className="block w-full" runKey={`${plan.focus}-${plan.island}-${plan.count}`} stages={stageCount(plan)} />
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="hero-title" className="wrap grid gap-8 pt-2 pb-16 md:pb-24 lg:grid-cols-12 lg:gap-6 lg:pt-4">
      <div className="flex flex-col lg:col-span-5 lg:pr-4">
        <p className="text-[14px] text-muted">Stapledon Gardens, Nassau · Serving Nassau and Grand Bahama</p>
        <h1 id="hero-title" className="display mt-4 text-[42px] leading-[1.0] md:text-[56px] xl:text-[60px] xl:leading-[0.98]">
          <motion.span className="block" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: out }}>The Bahamas' armoured courier, since <span className="tnum">1961</span>.</motion.span>
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="serif mt-5 max-w-[34ch] text-[18px] leading-[1.5] text-ink/85 md:text-[21px] md:leading-[1.45]">Cash in transit with armoured vehicles and armed, uniformed guards. ATM replenishment and first-line maintenance. Air courier to the Family Islands. 100% Bahamian owned and operated.</motion.p>
        <div className="order-last mt-6 grid gap-2 sm:grid-cols-2 lg:hidden">
          <a href="#manifest" className="btn-primary whitespace-nowrap">Plan your request</a>
          <a href={TEL} className="btn-ghost tnum whitespace-nowrap"><Phone className="size-4" strokeWidth={1.75} aria-hidden />{PHONE}</a>
        </div>
        <div className="mt-6 lg:mt-12">
          <HeroTruck />
          <p className="tnum mt-3 text-[14px] text-muted">Each stage of your run, signed. Public liability cover up to $2,000,000.</p>
        </div>
      </div>
      <div className="max-lg:-mx-[var(--pad)] lg:col-span-7"><Manifest /></div>
    </section>
  )
}

const LEDGER: { id: Svc; code: string; t: string; d: string; ready: string[] }[] = [
  { id: "cit", code: "01", t: "Cash in transit", d: "Cash collected by highly trained, uniformed and armed guards, carried in secure locked transit bags inside secure armoured vehicles, with surveillance-enabled cash in transit.", ready: ["Pickup and drop-off addresses", "How often, and on which days", "Typical consignment, roughly"] },
  { id: "atm", code: "02", t: "ATM services", d: "The first in The Bahamas to cater to the demand for ATM services. Replenishment of your machines and first-line maintenance.", ready: ["How many ATMs, and where", "Replenishment, maintenance or both", "Fill schedule you need"] },
  { id: "air", code: "03", t: "Family Island air courier", d: "Air courier solutions for consignments that need to reach the Family Islands securely.", ready: ["Which island and settlement", "Cash, valuables or documents", "Regular or one-off"] },
  { id: "cit", code: "04", t: "24-hour support", d: "24-hour support, backed by a seasoned management team of armoured security experts.", ready: ["Your account or site name", "Who to call back"] },
]

function Services() {
  const send = useSendToPlanner()
  return (
    <section id="services" aria-labelledby="svc-title" className="wrap scroll-mt-6 py-[72px] md:py-32">
      <div className="grid gap-6 lg:grid-cols-12">
        <In className="lg:col-span-6"><h2 id="svc-title" className="h2">Four services from one armoured fleet.</h2></In>
        <In delay={0.05} className="lg:col-span-5 lg:col-start-8"><p className="serif text-[18px] leading-[1.6] text-muted">Cash in transit, ATM services and air courier to the Family Islands, from a company that has moved Bahamian cash since 1961.</p></In>
      </div>
      <ol className="mt-12 border-t border-ink md:mt-16">
        {LEDGER.map((r, i) => (
          <In as="li" key={r.code} delay={i * 0.04} className="group grid gap-4 border-b border-line py-7 transition-colors hover:border-ink md:py-9 lg:grid-cols-12 lg:gap-6">
              <h3 className="flex items-baseline gap-3 text-[26px] leading-[1.1] font-bold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 md:text-t4 lg:col-span-3"><span className="tnum text-[15px] font-medium text-muted">{r.code}</span>{r.t}</h3>
              <p className="serif text-[17px] leading-[1.6] md:text-[18px] lg:col-span-4">{r.d}</p>
              <div className="lg:col-span-3">
                <p className="text-[14px] font-semibold">Have ready when you call</p>
                <ul className="mt-2 space-y-1 text-[15px] text-muted">{r.ready.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="lg:col-span-2 lg:text-right">
                {r.code !== "04" ? <button type="button" onClick={() => send(r.id)} className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold"><span className="ulink">Plan this run</span><ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden /></button>
                  : <a href={TEL} className="tnum inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold"><span className="ulink">{PHONE}</span></a>}
              </div>
          </In>
        ))}
      </ol>
    </section>
  )
}

function Custody() {
  const extra = [
    ["Continuity", "Armoured Services Officers are cross-trained in physical security, as part of a business continuity plan."],
    ["Leadership", "A seasoned management team of armoured security experts."],
  ]
  return (
    <section id="custody" aria-labelledby="cust-title" className="scroll-mt-6 border-t border-line bg-surface py-[72px] md:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12">
          <In className="lg:col-span-6"><h2 id="cust-title" className="h2">Every hand-off, accounted for.</h2></In>
          <In delay={0.05} className="lg:col-span-5 lg:col-start-8"><p className="serif text-[18px] leading-[1.6] text-muted">The questions an insurer or auditor asks, answered in the company's own words. Each safeguard covers a step of the run you planned above.</p></In>
        </div>
        <TruckPlate className="mt-10 block w-full md:mt-16" />
        <dl className="mt-10 grid gap-x-6 md:mt-14 md:grid-cols-2 lg:grid-cols-12">
          {CALLOUTS.map(c => (
            <div key={c.n} className="grid grid-cols-[36px_1fr] border-t border-line py-5 lg:col-span-6">
              <dt className="contents"><span className="tnum flex size-[26px] items-center justify-center rounded-full bg-ink text-[13px] font-bold text-surface">{c.n}</span></dt>
              <dd><span className="block text-[17px] font-semibold">{c.t}</span><span className="serif mt-0.5 block text-[17px] leading-[1.55] text-muted">{c.d}</span></dd>
            </div>
          ))}
          {extra.map(([t, d]) => (
            <div key={t} className="grid grid-cols-[36px_1fr] border-t border-line py-5 lg:col-span-6">
              <dt className="contents"><span aria-hidden className="mt-2 block size-3 border-2 border-ink" /></dt>
              <dd><span className="block text-[17px] font-semibold">{t}</span><span className="serif mt-0.5 block text-[17px] leading-[1.55] text-muted">{d}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Sister() {
  const send = useSendToPlanner()
  const rows: [Svc, string, string][] = [["guard", "Static guards", "Officers stationed at your premises, backed by Armoured Services Officers cross-trained in physical security."], ["avsec", "Aviation security", "Security services for airports and aviation clients."]]
  return (
    <section id="security-services" aria-labelledby="sis-title" className="scroll-mt-6 bg-steel py-[72px] text-on-steel md:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12">
          <In className="lg:col-span-7">
            <p className="text-[15px] text-on-steel-muted">Security Services (Bah.) Ltd., the sister company</p>
            <h2 id="sis-title" className="h2 mt-4">Two companies, one family, one mission.</h2>
          </In>
          <In delay={0.05} className="lg:col-span-4 lg:col-start-9 lg:self-end"><p className="serif text-[18px] leading-[1.6] text-on-steel-muted">Armoured Express moves and replenishes. Its sister company stands guard, on the ground and at the airport.</p></In>
        </div>
        <ul className="mt-12 grid border-t border-on-steel/25 md:mt-16 md:grid-cols-2 md:gap-6">
          {rows.map(([id, t, d], i) => (
            <In as="li" key={id} delay={i * 0.05} className="border-b border-on-steel/25 py-7 md:border-b-0 md:py-9">
                <h3 className="text-t4 font-bold tracking-[-0.02em]">{t}</h3>
                <p className="serif mt-2 max-w-[44ch] text-[17px] leading-[1.6] text-on-steel-muted">{d}</p>
                <button type="button" onClick={() => send(id)} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brass-light"><span className="ulink">Add to your request</span><ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden /></button>
            </In>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Heritage() {
  const stops = [
    ["1961", "Founded as Burns Security International, the company that pioneered the armoured security industry in The Bahamas."],
    ["First", "The first in The Bahamas to cater to the demand for ATM services, and still the specialist in replenishing them."],
    ["Today", "Armoured Express and Security Services: 100% Bahamian owned and operated, serving Nassau and Grand Bahama for over 60 years."],
  ]
  return (
    <section id="since-1961" aria-labelledby="her-title" className="scroll-mt-6 bg-field py-[72px] md:py-32">
      <div className="wrap">
        <In><h2 id="her-title" className="h2 max-w-[18ch]">Pioneers of armoured security in The Bahamas.</h2></In>
        <ol className="relative mt-12 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-6">
          <li aria-hidden className="absolute top-0 bottom-0 left-[5px] w-px bg-ink md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />
          {stops.map(([y, t], i) => (
            <In as="li" key={y} delay={i * 0.08} className="relative pl-8 md:pt-10 md:pl-0">
                <span aria-hidden className="absolute top-2 left-0 size-3 bg-ink md:top-[1px]" />
                <p className="display tnum text-[56px] leading-none md:text-t6">{y}</p>
                <p className="serif mt-4 max-w-[34ch] text-[17px] leading-[1.6] text-ink/80 md:text-[18px]">{t}</p>
            </In>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const { summary } = usePlan()
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-6 py-[72px] md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <In><h2 id="contact-title" className="h2">Read your request to the office.</h2></In>
          <In delay={0.05}>
            <div className="sheet mt-8 p-5 md:p-7">
              <p className="serif text-[19px] leading-[1.5] md:text-t3">{summary || "Tick a service in the request sheet above, and your summary appears here."}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={TEL} className="btn-primary tnum min-h-14 px-7 text-[19px]"><Phone className="size-[18px]" strokeWidth={1.75} aria-hidden />Call {PHONE}</a>
                <CopyButton />
              </div>
            </div>
          </In>
          <In delay={0.1}>
            <dl className="mt-10 grid gap-x-6 gap-y-6 text-[16px] sm:grid-cols-2">
              <div><dt className="font-semibold">Also</dt><dd className="mt-1"><a href={TEL2} className="tnum inline-flex min-h-11 items-center text-[19px]"><span className="ulink">{PHONE2}</span></a></dd></div>
              <div><dt className="font-semibold">Hours</dt><dd className="mt-1 text-muted">Office Mon to Fri, 9:00 to 5:00<br /><OfficeStatus className="mt-1 text-ink" /></dd></div>
              <div><dt className="font-semibold">Office</dt><dd className="mt-1 text-muted">Stapledon Gardens<br />P.O. Box N-4499, Nassau</dd></div>
              <div><dt className="font-semibold">Coverage</dt><dd className="mt-1 text-muted">Nassau and Grand Bahama, air courier to the Family Islands</dd></div>
            </dl>
          </In>
        </div>
        <In delay={0.1} className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-field lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <p className="absolute inset-0 flex items-center justify-center text-[15px] text-muted">Map of Stapledon Gardens, Nassau</p>
            <iframe title="Map of Stapledon Gardens, Nassau" loading="lazy" className="absolute inset-0 h-full w-full grayscale-[60%]" src="https://www.google.com/maps?q=Stapledon+Gardens,+Nassau,+Bahamas&output=embed" />
          </div>
        </In>
      </div>
    </section>
  )
}

mount(<PlanProvider><Page><Hero /><Services /><Custody /><Sister /><Heritage /><Contact /></Page></PlanProvider>)
