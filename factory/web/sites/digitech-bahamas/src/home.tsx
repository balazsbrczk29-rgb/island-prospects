import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Mail, Phone, Minus, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Lines, ease, PHONE, TEL, PHONE2, TEL2, EMAIL } from "./site"
import Net, { type Plan } from "./Net"
import { SERVICES } from "./data"

const HERO_PLAN: Plan = { pos: 2, pcs: 3, staffWifi: true, guestWifi: true, server: false, backup: true }

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-110px)] max-w-[1400px] items-center gap-10 px-5 pt-10 pb-16 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-muted"><i className="size-1.5 rounded-full bg-signal" />Digitech Bahamas Ltd., Centreville, Nassau</motion.p>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(2.8rem,5.6vw,6.2rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
            <Lines lines={["IT, networks and", "point of sale for", "Bahamian business."]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }} className="mt-7 max-w-[32rem] text-[18px] leading-relaxed text-muted">We design and cable your network, install and support Razor POS for retail and restaurants, back your data up to the cloud and manage your IT, so you can focus on your business.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href="#network" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[16px] text-paper transition hover:-translate-y-0.5 hover:bg-signal-deep active:translate-y-0">Plan your network <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-[16px] transition hover:-translate-y-0.5 hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.1, ease }} className="rounded-[24px] border border-line bg-white p-3 shadow-[0_40px_80px_-50px_rgba(14,23,38,.45)] lg:col-span-6">
          <Net plan={HERO_PLAN} className="h-auto w-full" />
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Call", PHONE, TEL],
    ["Second line", PHONE2, TEL2],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Office", "#33 East Avenue, Centreville", "#find"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1400px] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1.2fr]">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-paper/15 not-first:border-t sm:not-first:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:not-first:border-l">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-8">
              <span className="text-[13px] text-signal">{k}</span>
              <span className={`mt-1 block font-display font-semibold tracking-[-0.02em] leading-tight ${i < 2 ? "text-[clamp(1.6rem,2.3vw,2.3rem)] whitespace-nowrap" : "text-[clamp(1.05rem,1.4vw,1.35rem)]"}`}>{v}</span>
              <span className="mt-3 block h-[2px] w-0 bg-signal transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Stepper({ label, value, set }: { label: string; value: number; set: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3.5">
      <span className="text-[16px]">{label}</span>
      <span className="flex items-center gap-2">
        <button type="button" onClick={() => set(Math.max(0, value - 1))} className="grid size-11 place-items-center rounded-full border border-line transition hover:border-ink active:scale-95" aria-label={`Fewer ${label}`}><Minus className="size-4" /></button>
        <span className="w-8 text-center font-display text-xl font-semibold tabular-nums" aria-live="polite">{value}</span>
        <button type="button" onClick={() => set(Math.min(8, value + 1))} className="grid size-11 place-items-center rounded-full border border-line transition hover:border-ink active:scale-95" aria-label={`More ${label}`}><Plus className="size-4" /></button>
      </span>
    </div>
  )
}
function Toggle({ label, on, set }: { label: string; on: boolean; set: (b: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => set(!on)} className="flex min-h-14 w-full items-center justify-between border-b border-line text-left text-[16px]">
      {label}
      <span className={`relative h-7 w-12 rounded-full transition ${on ? "bg-signal" : "bg-line"}`}><span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${on ? "left-6" : "left-1"}`} /></span>
    </button>
  )
}

function planText(p: Plan) {
  return [p.pos && `${p.pos} POS station(s)`, p.pcs && `${p.pcs} office PC(s)`, p.staffWifi && "staff Wi-Fi", p.guestWifi && "guest Wi-Fi", p.server && "virtual server", p.backup && "cloud backup"].filter(Boolean).join(", ")
}

function Planner({ plan, setPlan }: { plan: Plan; setPlan: (p: Plan) => void }) {
  const up = (k: Partial<Plan>) => setPlan({ ...plan, ...k })
  return (
    <section id="network" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="net-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="01">Network planner</Label>
          <h2 id="net-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] font-semibold tracking-[-0.04em]">Draw your network before we cable it.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Tell us what your shop, restaurant or office runs. The drawing shows how Digitech would separate it: firewall and VPN, a switch, and its own network for tills, staff and guests.</p>
          <div className="mt-8">
            <Stepper label="POS stations" value={plan.pos} set={n => up({ pos: n })} />
            <Stepper label="Office computers" value={plan.pcs} set={n => up({ pcs: n })} />
            <Toggle label="Staff Wi-Fi" on={plan.staffWifi} set={b => up({ staffWifi: b })} />
            <Toggle label="Guest Wi-Fi" on={plan.guestWifi} set={b => up({ guestWifi: b })} />
            <Toggle label="Virtual server" on={plan.server} set={b => up({ server: b })} />
            <Toggle label="Cloud backup" on={plan.backup} set={b => up({ backup: b })} />
          </div>
          <a href="#start" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-signal px-6 text-[16px] text-white transition hover:-translate-y-0.5 hover:bg-signal-deep">Send this plan for a quote <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="sticky top-28 rounded-[24px] border border-line bg-white p-3 md:p-6">
            <Net plan={plan} className="h-auto w-full" />
            <p className="mt-3 px-2 text-[12px] text-muted">A sketch for discussion. Digitech designs the real network on site.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Pos() {
  const steps = [["Hardware", "Terminals and peripherals for the counter or the bar."], ["Software", "Razor POS, designed for retail and food and beverage."], ["Training", "Your staff learn the system before you go live."], ["Support", "Post-installation support from the team that set it up."]]
  return (
    <section id="pos" className="scroll-mt-24 bg-paper-2" aria-labelledby="pos-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n="02">Point of sale</Label>
          <h2 id="pos-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] font-semibold tracking-[-0.04em]">Razor POS, installed and supported.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Digitech is an advanced dealer for Razor POS Systems, built for retail and food and beverage businesses. One team supplies it, sets it up, trains your staff and stays on call.</p>
          <div className="mt-8 overflow-hidden rounded-[20px] border border-line bg-white"><img src="https://digitechbahamas.com/bs/wp-content/uploads/2023/04/POS-Shot.png" alt="Razor POS system as shown on digitechbahamas.com" width={900} height={600} loading="lazy" className="w-full object-cover transition duration-700 hover:scale-[1.03]" /></div>
        </Reveal>
        <ol className="self-center lg:col-span-6 lg:col-start-7">
          {steps.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 first:border-t">
              <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-sm font-semibold text-paper transition group-hover:bg-signal">{i + 1}</span>
              <div><p className="font-display text-2xl font-semibold tracking-[-0.02em]">{t}</p><p className="mt-1 text-[16px] text-muted">{d}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="svc-title">
      <Reveal className="grid gap-6 lg:grid-cols-12"><div className="lg:col-span-6"><Label n="03">Services</Label>
        <h2 id="svc-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] font-semibold tracking-[-0.04em]">Five things we look after.</h2></div></Reveal>
      <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(s => (
          <li key={s.id} className="bg-white">
            <a href={`services.html#${s.id}`} className="group flex h-full flex-col p-7 transition hover:bg-paper md:p-9">
              <p className="font-display text-2xl font-semibold tracking-[-0.02em]">{s.t}</p>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.d}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-[14px] text-signal-deep">Details <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
            </a>
          </li>
        ))}
        <li className="bg-ink p-7 text-paper md:p-9">
          <p className="text-[13px] text-signal">Clients shown on digitechbahamas.com</p>
          <ul className="mt-4 space-y-2 font-display text-xl">{["Hana", "Naughty Johnny's", "Blu Sail", "Beauty Shack", "Little Caesars"].map(c => <li key={c}>{c}</li>)}</ul>
        </li>
      </ul>
    </section>
  )
}

const TYPES = {
  network: { label: "Network", fields: [["Business type", "text"], ["Location", "text"]] },
  pos: { label: "POS system", fields: [["Retail or food and beverage?", "text"], ["Number of tills", "number"]] },
  backup: { label: "Cloud backup", fields: [["Computers to protect", "number"], ["Current backup", "text"]] },
  managed: { label: "Managed IT", fields: [["Staff using computers", "number"], ["Main problem today", "text"]] },
} as const
type T = keyof typeof TYPES

function Start({ plan }: { plan: Plan }) {
  const [tab, setTab] = useState<T>("network")
  const [v, setV] = useState<Record<string, string>>({})
  const body = useMemo(() => {
    const l = ["Hello Digitech,", "", `Quote request: ${TYPES[tab].label}`]
    if (tab === "network") l.push(`Planned network: ${planText(plan) || "to discuss"}`)
    for (const [f] of TYPES[tab].fields) if (v[`${tab}:${f}`]) l.push(`${f}: ${v[`${tab}:${f}`]}`)
    for (const [k, lab] of [["biz", "Business"], ["name", "Name"], ["reply", "Phone or email"]]) if (v[k]) l.push(`${lab}: ${v[k]}`)
    return l.join("\n")
  }, [v, tab, plan])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request: ${TYPES[tab].label}`)}&body=${encodeURIComponent(body + "\n\n(sent from the website)")}`
  const field = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-signal"
  return (
    <section id="start" className="scroll-mt-24 bg-paper-2" aria-labelledby="start-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="04">Get a quote</Label>
          <h2 id="start-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] font-semibold tracking-[-0.04em]">Have a project in mind?</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Pick what you need. Your network plan from above is added for you, and your email opens with everything written out to {EMAIL}.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={x => setTab(x as T)}>
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-full bg-paper p-1">
              {(Object.keys(TYPES) as T[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[14px] data-[state=active]:bg-ink data-[state=active]:text-paper">{TYPES[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(TYPES) as T[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8"><div className="grid gap-6 sm:grid-cols-2">
                {TYPES[k].fields.map(([f, t]) => <label key={f} className="block"><span className="text-[14px] text-muted">{f}</span><input type={t} value={v[`${k}:${f}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className={field} /></label>)}
              </div></TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <label className="block"><span className="text-[14px] text-muted">Business</span><input value={v.biz ?? ""} onChange={e => setV(s => ({ ...s, biz: e.target.value }))} className={field} autoComplete="organization" /></label>
            <label className="block"><span className="text-[14px] text-muted">Your name</span><input value={v.name ?? ""} onChange={e => setV(s => ({ ...s, name: e.target.value }))} className={field} autoComplete="name" /></label>
            <label className="block"><span className="text-[14px] text-muted">Phone or email</span><input value={v.reply ?? ""} onChange={e => setV(s => ({ ...s, reply: e.target.value }))} className={field} /></label>
          </div>
          <div className="mt-10 rounded-[24px] bg-ink p-6 text-paper md:p-8">
            <pre className="max-h-44 overflow-auto font-sans text-[15px] leading-relaxed whitespace-pre-wrap text-paper/85">{body}</pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-signal px-6 text-white transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden /> Email this request</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 transition hover:-translate-y-0.5 hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Do you set up POS for restaurants and bars?", "Yes. Digitech is an advanced dealer for Razor POS Systems, designed for retail and food and beverage businesses, with hardware, software, training and post-installation support."],
  ["Can you cable and certify a new office?", "Yes. We design networks from the ground up: cabling, termination and certification, through to wireless networks with multiple VLANs, firewall and VPN."],
  ["What does cloud backup protect?", "Your data and your endpoints, on a best-in-class IT management platform that also helps protect against online threats."],
  ["Where are you?", "#33 East Avenue, Centreville, Nassau. Call (242) 676-2033 or (242) 676-3022, or email sales@digitechbahamas.com."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4"><Label n="05">Questions</Label>
        <h2 id="faq-title" className="mt-6 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">Asked before every install.</h2></Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[clamp(1.15rem,1.6vw,1.45rem)] font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function FindUs() {
  return (
    <section id="find" className="scroll-mt-24 border-t border-line" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="06">Find us</Label>
          <h2 id="find-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95] font-semibold tracking-[-0.04em]">#33 East Avenue, Centreville.</h2>
          <a href={TEL} className="mt-10 block rounded-[24px] bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-signal-deep">
            <span className="text-[13px] text-signal">Call Digitech</span>
            <span className="mt-2 block font-display text-[clamp(2.2rem,4.2vw,3.4rem)] leading-none font-semibold tracking-[-0.03em]">{PHONE}</span>
            <span className="mt-3 block text-paper/70">or {PHONE2} · {EMAIL}</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden rounded-[24px] border border-line">
          <iframe title="Map of East Avenue, Centreville, Nassau" loading="lazy" className="h-full min-h-[420px] w-full" src="https://www.google.com/maps?q=East+Avenue,+Centreville,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

function App() {
  const [plan, setPlan] = useState<Plan>({ pos: 2, pcs: 2, staffWifi: true, guestWifi: false, server: false, backup: true })
  return <Page current=""><Hero /><KeyInfo /><Planner plan={plan} setPlan={setPlan} /><Pos /><Services /><Start plan={plan} /><Questions /><FindUs /></Page>
}

mount(<App />)
