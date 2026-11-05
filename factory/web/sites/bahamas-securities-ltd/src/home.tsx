import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { Phone, ArrowUpRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Record from "./Record"
import { Page, mount, Reveal, Head, ease, reveal, PHONE, TEL } from "./site"

function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-130px)] max-w-[1320px] items-center gap-12 px-5 py-14 md:px-10 lg:grid-cols-12" aria-labelledby="hero-title">
      <div className="lg:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="label text-green">Bahamas Securities (1987) Limited · Charlotte Street, Nassau</motion.p>
        <h1 id="hero-title" className="mt-7 font-display text-[clamp(3rem,7.2vw,7rem)] leading-[0.95] font-light tracking-[-0.025em]">
          {["Investment advice", "in Nassau,", "since 1987."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className={`block ${i === 2 ? "italic text-green" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.15, ease: reveal }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-xl text-[19px] leading-relaxed text-ink/80">A Nassau firm registered with the Securities Commission of The Bahamas to advise on capital market instruments. Speak to us before you invest.</motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#consultation" className="inline-flex min-h-13 items-center justify-center bg-green px-7 py-3.5 text-[16px] text-paper transition hover:-translate-y-px hover:bg-green-deep">Arrange a consultation</a>
          <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 border border-ink/20 px-6 py-3.5 text-[16px] transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.1, ease }} className="lg:col-span-5"><Record /></motion.div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Telephone", PHONE, TEL], ["Office", "Gresham House, Charlotte Street South", "#contact"], ["Regulated by", "Securities Commission of The Bahamas", "regulation.html"], ["Established", "1987", "regulation.html"]]
  return (
    <section className="border-y border-green-deep bg-green text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1320px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h], i) => (
          <li key={k} className="border-b border-paper/15 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="label text-tint/80">{k}</span>
              <span className={`mt-2 block font-display ${i === 0 ? "whitespace-nowrap text-[clamp(1.9rem,2.6vw,2.5rem)]" : "text-[1.4rem] leading-snug"}`}>{v}</span>
              <span className="mt-4 block h-px w-0 bg-tint transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Advice() {
  const rows = [["Shares", "Stakes in companies, in The Bahamas and abroad."], ["Bonds", "Loans to governments and companies that pay interest."], ["Funds", "Pooled investments run by a manager."]]
  return (
    <section id="advice" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="adv-title">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="01" label="What we do" id="adv-title" title={<>Advice on what to buy, hold or sell.</>}>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">"Capital market instruments" is the regulator's term for investments such as shares, bonds and fund units. Our registration covers advising on them: we help you decide, and you stay in control of your money.</p>
          </Head>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {rows.map(([t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-line py-7 last:border-b">
              <span className="font-display text-xl text-green">{String(i + 1).padStart(2, "0")}</span>
              <div><p className="font-display text-[clamp(1.8rem,2.8vw,2.5rem)] leading-tight transition group-hover:translate-x-1">{t}</p><p className="mt-1 text-[17px] text-muted">{d}</p></div>
            </motion.div>
          ))}
          <p className="mt-6 text-[14px] text-muted">Fees are discussed at your consultation.</p>
        </div>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="bg-paper-2" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6"><Head index="02" label="Before you trust anyone with advice" id="trust-title" title={<>Check the register first. Ours is public.</>}><p className="mt-6 max-w-lg text-[18px] leading-relaxed text-muted">Any firm that advises on investments in or from The Bahamas must be registered with the Securities Commission. We are, and we would rather you check than take our word for it.</p><a href="regulation.html" className="group mt-8 inline-flex items-center gap-2 text-[16px] text-green"><span className="ulink">How to verify a firm, step by step</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a></Head></div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <p aria-hidden className="font-display text-[clamp(8rem,16vw,14rem)] leading-[0.8] font-light text-green/15">1987</p>
          <p className="-mt-6 max-w-sm text-[18px] leading-relaxed">Nearly four decades of advising from Nassau, under one name.</p>
        </Reveal>
      </div>
    </section>
  )
}

const GOALS = ["Grow savings over time", "Income from investments", "Review what I already hold", "Plan for retirement", "Invest for a company"]
function Consultation() {
  const [goal, setGoal] = useState<string[]>([])
  const [horizon, setHorizon] = useState("")
  const [who, setWho] = useState("")
  const toggle = (g: string) => setGoal(x => x.includes(g) ? x.filter(y => y !== g) : [...x, g])
  const line = useMemo(() => [goal.length && `I would like to talk about: ${goal.join(", ").toLowerCase()}`, horizon && `My time horizon is ${horizon.toLowerCase()}`, who && `I am ${who.toLowerCase()}`].filter(Boolean).join(". "), [goal, horizon, who])
  return (
    <section id="consultation" className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="c-title">
      <div className="lg:col-span-4"><Head index="03" label="Consultation" id="c-title" title={<>Arrange a consultation.</>}><p className="mt-6 max-w-sm text-[18px] leading-relaxed text-muted">Note what you want to talk about, then call. We will take it from there, in confidence.</p></Head></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <fieldset>
          <legend className="label text-muted">I would like to talk about</legend>
          <div className="mt-4 flex flex-wrap gap-2">{GOALS.map(g => <button key={g} type="button" aria-pressed={goal.includes(g)} onClick={() => toggle(g)} className={`min-h-11 border px-4 text-[15px] transition hover:-translate-y-px ${goal.includes(g) ? "border-green bg-green text-paper" : "border-line bg-paper hover:border-ink/40"}`}>{g}</button>)}</div>
        </fieldset>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div><label htmlFor="hz" className="label text-muted">Time horizon</label><select id="hz" value={horizon} onChange={e => setHorizon(e.target.value)} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none focus:border-green"><option value="">Choose</option>{["Under 3 years", "3 to 10 years", "Over 10 years"].map(o => <option key={o}>{o}</option>)}</select></div>
          <div><label htmlFor="who" className="label text-muted">I am</label><select id="who" value={who} onChange={e => setWho(e.target.value)} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none focus:border-green"><option value="">Choose</option>{["An individual", "Investing for my family", "Representing a company"].map(o => <option key={o}>{o}</option>)}</select></div>
        </div>
        <div className="mt-10 border border-green/30 bg-tint/60 p-6 md:p-8">
          <p className="label text-green">Your notes for the call</p>
          <p className="mt-3 min-h-12 font-display text-[1.35rem] leading-snug">{line ? `${line}.` : "Choose a topic above and your notes appear here."}</p>
          <a href={TEL} className="mt-6 inline-flex min-h-12 items-center gap-2 bg-green px-6 text-paper transition hover:-translate-y-px hover:bg-green-deep"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
          <p className="mt-3 text-[13px] text-muted">Nothing on this page is sent anywhere. It only helps you prepare.</p>
        </div>
      </Reveal>
    </section>
  )
}

const FAQ = [
  ["Is Bahamas Securities registered?", "Yes. Bahamas Securities (1987) Limited appears on the Securities Commission of The Bahamas register of firms under the Securities Industry Act, 2024, for advising on capital market instruments."],
  ["Where is your office?", "Gresham House, Charlotte Street South, Nassau. Postal address P.O. Box N-10144."],
  ["How long have you been in business?", "Since 1987."],
  ["How do I start?", `Call ${PHONE} to arrange a consultation.`],
]
function Questions() {
  return (
    <section className="border-t border-line" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4"><Head index="04" label="Questions" id="faq-title" title={<>Plain answers.</>} /></div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[1.5rem] font-normal hover:no-underline md:text-[1.75rem]">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-paper-2" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="05" label="The office" id="contact-title" title={<>Gresham House, Charlotte Street South.</>}><p className="mt-5 max-w-md text-[18px] text-muted">Nassau, New Providence. P.O. Box N-10144.</p></Head>
          <a href={TEL} className="mt-10 block bg-green p-7 text-paper transition hover:-translate-y-0.5 hover:bg-green-deep"><span className="label text-tint/80">Telephone</span><span className="mt-2 block font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none">{PHONE}</span></a>
        </div>
        <Reveal delay={0.1} className="overflow-hidden border border-line lg:col-span-7"><iframe title="Map of Charlotte Street, Nassau" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[460px]" src="https://www.google.com/maps?q=Charlotte+Street+South,+Nassau,+Bahamas&output=embed" /></Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Advice /><Trust /><Consultation /><Questions /><Contact /></Page>)
