import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Mail, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease } from "./site"
import { TIERS, ROLES, REVENUE, tierFor, EMAIL, PHONE, TEL } from "./data"

const BENEFITS = [
  ["Industry representation", "The BCA fights for contractor interests locally and internationally."],
  ["Project and job opportunities", "Notices of bidding invitations and employment postings."],
  ["Business promotion", "A listing in the Contractor Register, promoted as a reputable contractor."],
  ["Education and certification", "Training, resources and seminars."],
  ["Discounts and services", "Trade discounts, free estimate printing and marketing support."],
  ["Recognition", "A BCA Certificate of Membership to display, and promotion on BCA Facebook and Instagram."],
]

function Finder() {
  const [role, setRole] = useState<string>(ROLES[0])
  const [rev, setRev] = useState<string>(REVENUE[0])
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const t = TIERS.find(x => x.id === tierFor(role, rev))!
  const body = [`I would like to join the BCA as a ${t.name} member ($${t.dues.toLocaleString()} a year).`, `I am ${role.toLowerCase()}, annual revenue ${rev.toLowerCase()}.`, name && `Name: ${name}`, company && `Company: ${company}`].filter(Boolean).join("\n")
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Membership application: ${t.name}`)}&body=${encodeURIComponent(body)}`
  const Opt = ({ v, cur, set }: { v: string; cur: string; set: (x: string) => void }) => (
    <button type="button" role="radio" aria-checked={cur === v} onClick={() => set(v)} className={`min-h-12 border-2 px-4 text-left text-[15px] font-medium transition hover:-translate-y-px ${cur === v ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink"}`}>{v}</button>
  )
  return (
    <section id="finder" className="mx-auto grid max-w-[1440px] scroll-mt-24 gap-12 px-5 pb-24 md:px-10 md:pb-32 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-6">
        <fieldset><legend className="text-[12px] font-semibold tracking-[0.16em] text-muted uppercase">1. I am</legend><div className="mt-3 grid gap-2 sm:grid-cols-2" role="radiogroup">{ROLES.map(r => <Opt key={r} v={r} cur={role} set={setRole} />)}</div></fieldset>
        <fieldset><legend className="text-[12px] font-semibold tracking-[0.16em] text-muted uppercase">2. Annual revenue or turnover</legend><div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup">{REVENUE.map(r => <Opt key={r} v={r} cur={rev} set={setRev} />)}</div></fieldset>
        <fieldset className="grid gap-6 sm:grid-cols-2"><legend className="mb-3 text-[12px] font-semibold tracking-[0.16em] text-muted uppercase">3. About you</legend>
          <label className="block"><span className="text-[13px] text-muted">Your name</span><input value={name} onChange={e => setName(e.target.value)} className="mt-1 block min-h-12 w-full border-b-[3px] border-ink/20 bg-transparent text-xl font-semibold outline-none focus:border-aqua" /></label>
          <label className="block"><span className="text-[13px] text-muted">Company</span><input value={company} onChange={e => setCompany(e.target.value)} className="mt-1 block min-h-12 w-full border-b-[3px] border-ink/20 bg-transparent text-xl font-semibold outline-none focus:border-aqua" /></label>
        </fieldset>
        <p className="text-[14px] text-muted">Membership is open to Bahamian citizens or residents with the right to work in The Bahamas.</p>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="sticky top-28 bg-ink p-8 text-paper md:p-10" aria-live="polite">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">Your tier</p>
          <AnimatePresence mode="wait">
            <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}>
              <p className="mt-3 font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-extrabold tracking-[-0.03em]">{t.name}</p>
              <p className="mt-4 font-display text-[3.4rem] leading-none font-extrabold text-gold tnum">${t.dues.toLocaleString()}<span className="text-[1rem] font-medium text-paper/60"> a year</span></p>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{t.who}</p>
            </motion.div>
          </AnimatePresence>
          <a href={href} className="mt-8 flex min-h-12 items-center justify-center gap-2 bg-aqua px-6 font-semibold text-white transition hover:-translate-y-px hover:bg-aqua-bright hover:text-ink"><Mail className="size-4" aria-hidden /> Email my application</a>
          <a href={TEL} className="mt-3 flex min-h-12 items-center justify-center gap-2 border border-paper/30 px-6 transition hover:border-paper"><Phone className="size-4" aria-hidden /> Or call {PHONE}</a>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-14 md:px-10 md:pt-20" aria-labelledby="m-title">
      <Label>Membership · Bahamian Contractors' Association</Label>
      <h1 id="m-title" className="mt-6 max-w-5xl font-display text-[clamp(3rem,7.4vw,7.2rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
        {["Find your tier", "in three taps."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-aqua" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
    </section>
  )
}

function Benefits() {
  return (
    <section className="bg-concrete" aria-labelledby="b-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label>What members receive</Label><h2 id="b-title" className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">Dues that come back as work.</h2></Reveal>
        <ol className="mt-14 grid border-t-[3px] border-ink md:grid-cols-2">
          {BENEFITS.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.08, duration: 0.7, ease }} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 md:pr-10 md:odd:border-r md:even:pl-10">
              <span className="font-display font-extrabold text-aqua tnum">{String(i + 1).padStart(2, "0")}</span>
              <div><p className="font-display text-[1.45rem] font-extrabold tracking-[-0.02em]">{t}</p><p className="mt-1.5 text-[16px] text-muted">{d}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

mount(<Page current="Membership"><Intro /><Finder /><Benefits /></Page>)
