import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, ease } from "./site"
import { PHONE, TEL, EMAIL, ADDRESS, EVENT, TIERS } from "./data"
import Skyline from "./Skyline"

function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden lg:min-h-[calc(100svh-120px)]" aria-labelledby="hero-title">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 pt-10 md:px-10 lg:grid-cols-12 lg:pt-14">
        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Label>The voice of Bahamian contractors · since 1959</Label></motion.div>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,7.2vw,7.6rem)] leading-[0.88] font-extrabold tracking-[-0.045em]">
            <span className="sr-only">Bahamian Contractors' Association: </span>
            {["Building the", "Bahamian horizon."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-aqua" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
            ))}
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="lg:col-span-4 lg:self-end">
          <p className="text-[17px] leading-relaxed text-ink/80">The BCA unites contractors, suppliers and developers across The Bahamas: advocacy for the industry, training and certification, and bid notices for members.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="membership.html#finder" className="group inline-flex min-h-12 items-center gap-2 bg-aqua px-6 font-semibold text-white transition hover:-translate-y-px hover:bg-ink">Find your membership <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href="#event" className="inline-flex min-h-12 items-center border-2 border-ink px-6 font-semibold transition hover:-translate-y-px hover:bg-ink hover:text-paper">Next event</a>
          </div>
        </motion.div>
      </div>
      <div className="mt-8 h-[220px] w-full md:h-[300px] lg:mt-auto lg:h-[340px]"><Skyline /></div>
    </section>
  )
}

function useDays() {
  const [d, setD] = useState<number | null>(null)
  useEffect(() => { const f = () => { const today = new Date(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Nassau" }).format(new Date()) + "T00:00:00-05:00"); setD(Math.round((new Date(EVENT.date).getTime() - today.getTime()) / 86400000)) }; f(); const id = setInterval(f, 60000); return () => clearInterval(id) }, [])
  return d
}

function KeyBand() {
  const days = useDays()
  const items: [string, string, string][] = [
    ["Call the office", PHONE, TEL],
    ["Office", "#27 Chesapeake Road, Suite #11", "#office"],
    ["Open", "Mon to Wed 9 to 3 · Thu 9 to 12", "#office"],
    ["Next event", days !== null && days > 0 ? `${EVENT.name}, in ${days} days` : `${EVENT.name}, ${EVENT.day}`, "#event"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-aqua md:px-8 md:py-8">
              <span className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight font-extrabold tracking-[-0.02em] ${i === 0 ? "text-[clamp(1.7rem,2.3vw,2.2rem)] tnum" : "text-[1.2rem]"}`}>{v}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const WORK = [
  ["Advocacy", ["The official voice of the construction industry in The Bahamas.", "At the table in Economic Partnership Agreement talks with the EU, Caricom and others.", "Drove the Construction Contractors Act of 2016, and presses for its Board to be appointed."]],
  ["Education", ["Training seminars and certification programmes.", "The Contractor Seminar Series, with international partners.", "Support for standard testing and licensing, and awards for excellent work."]],
  ["Growth", ["Invitations to bid on government and private projects.", "Local firms promoted to international companies coming to The Bahamas.", "Monthly luncheons, events, industry reports and market insight."]],
] as const

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="work-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7"><Label>01 · What we do</Label><h2 id="work-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">Protect, educate, and win work for contractors.</h2></div>
      </Reveal>
      <div className="mt-14 grid border-t-[3px] border-ink md:grid-cols-3">
        {WORK.map(([t, items], i) => (
          <Reveal key={t} delay={i * 0.08} className="border-b border-line py-8 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0">
            <p className="font-display text-[2rem] font-extrabold tracking-[-0.03em]"><span className="mr-3 text-aqua tnum">{String(i + 1).padStart(2, "0")}</span>{t}</p>
            <ul className="mt-6 space-y-4">
              {items.map(x => <li key={x} className="border-l-2 border-gold pl-4 text-[16px] leading-relaxed text-muted">{x}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const ACT = [
  ["1959", "The BCA is established", "The leading organisation advocating for construction professionals in The Bahamas."],
  ["2016", "Construction Contractors Act passed", "A significant achievement driven by the BCA, making the Construction Contractors Board, a key regulatory body, possible."],
  ["Now", "The Board, still to be appointed", "The BCA urges the timely appointment of the Construction Contractors Board that the Act mandates."],
] as const

function Act() {
  return (
    <section id="act" className="bg-concrete" aria-labelledby="act-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>02 · The Contractors Act</Label>
          <h2 id="act-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">What your dues have built.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">The BCA drove the Act that makes a Construction Contractors Board possible, and keeps pressing for the Board to be appointed.</p>
        </Reveal>
        <ol className="relative lg:col-span-7 lg:col-start-6">
          <motion.span className="absolute top-3 bottom-3 left-[4.5rem] w-[3px] origin-top bg-ink md:left-[6rem]" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} aria-hidden />
          {ACT.map(([y, t, d], i) => (
            <motion.li key={y} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease }} className="relative grid grid-cols-[4.5rem_1fr] pb-12 last:pb-0 md:grid-cols-[6rem_1fr]">
              <span className="font-display text-[1.6rem] font-extrabold text-aqua tnum">{y}</span>
              <div className="relative pl-8">
                <span className={`absolute top-2.5 -left-[7px] size-[17px] border-[3px] border-ink ${i === 2 ? "bg-gold" : "bg-paper"}`} aria-hidden />
                <p className="font-display text-[1.6rem] leading-tight font-extrabold tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Event() {
  const days = useDays()
  return (
    <section id="event" className="bg-aqua text-white" aria-labelledby="event-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Label light>03 · Next event</Label>
          <h2 id="event-title" className="mt-5 font-display text-[clamp(3rem,7vw,6.6rem)] leading-[0.88] font-extrabold tracking-[-0.045em]">{EVENT.name}.</h2>
          <p className="mt-4 font-display text-[1.6rem] font-semibold">{EVENT.what} · {EVENT.day} · {EVENT.where}</p>
          <ul className="mt-8 flex flex-wrap gap-2">{EVENT.bits.map(b => <li key={b} className="border border-white/40 px-4 py-2 text-[14px]">{b}</li>)}</ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <div className="bg-ink p-8">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">Countdown</p>
            <p className="mt-2 font-display text-[clamp(4rem,8vw,6.5rem)] leading-none font-extrabold tnum">{days !== null ? Math.max(days, 0) : "··"}</p>
            <p className="text-[15px] text-white/70">days to go</p>
            <a href={EVENT.url} className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-gold px-6 font-semibold text-ink transition hover:-translate-y-px">RSVP for {EVENT.name} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <p className="mt-3 text-[13px] text-white/60">Registration is confirmed once payment is sent.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Tiers() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="tiers-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7"><Label>04 · Membership</Label><h2 id="tiers-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">Four tiers, dues in plain sight.</h2></div>
        <a href="membership.html#finder" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-aqua md:col-span-4 md:col-start-9 md:justify-self-end">Find your tier <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </Reveal>
      <ol className="mt-14 grid border-t-[3px] border-ink sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t, i) => (
          <motion.li key={t.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-line py-8 sm:pr-6 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0">
            <p className="font-display text-[1.4rem] font-extrabold">{t.name}</p>
            <p className="mt-3 font-display text-[2.8rem] leading-none font-extrabold tracking-[-0.03em] tnum">${t.dues.toLocaleString()}<span className="text-[1rem] font-medium text-muted"> / year</span></p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.who}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

const FAQ = [
  ["Who can become a member?", "Bahamian citizens or residents with the right to work in The Bahamas. The BCA welcomes contractors, suppliers, developers and industry professionals."],
  ["Can non-contractors join?", "Yes. Associate Membership is for building suppliers, manufacturers, consultants, project managers and other professionals."],
  ["Does the BCA offer training?", "Yes. The Contractor Seminar Series and educational partnerships with vocational institutions provide ongoing learning."],
  ["How does the BCA support foreign investment projects?", "It works with developers, government agencies and foreign investors so local contractors can reach major projects, and helps navigate regulations."],
]

function Questions() {
  return (
    <section className="border-t border-line bg-concrete" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label>05 · Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">You ask, we tell.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t-[3px] border-ink">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[1.3rem] font-extrabold tracking-[-0.01em] hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Office() {
  return (
    <section id="office" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12" aria-labelledby="office-title">
      <Reveal className="lg:col-span-5">
        <Label>06 · Office</Label>
        <h2 id="office-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">Chesapeake Road, Suite 11.</h2>
        <dl className="mt-10 divide-y divide-line border-y-[3px] border-ink text-[16px]">
          {[["Address", ADDRESS], ["Monday to Wednesday", "9:00 am to 3:00 pm"], ["Thursday", "9:00 am to 12:00 pm"], ["Email", EMAIL]].map(([k, v]) => <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-4 py-4"><dt className="text-muted">{k}</dt><dd className="break-words">{v}</dd></div>)}
        </dl>
        <a href={TEL} className="mt-8 flex min-h-16 items-center gap-3 bg-ink px-7 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-paper transition hover:-translate-y-0.5 hover:bg-aqua"><Phone className="size-6" aria-hidden /> <span className="tnum">{PHONE}</span></a>
      </Reveal>
      <Reveal delay={0.1} className="overflow-hidden border-[3px] border-ink lg:col-span-7">
        <iframe title="Map of 27 Chesapeake Road, Nassau" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[500px]" src="https://www.google.com/maps?q=27+Chesapeake+Road,+Nassau,+Bahamas&output=embed" />
      </Reveal>
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyBand /><Work /><Act /><Event /><Tiers /><Questions /><Office /></Page>)
