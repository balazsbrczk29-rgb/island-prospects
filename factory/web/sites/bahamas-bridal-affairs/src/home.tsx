import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, ease } from "./site"
import { PHONE, TEL, PHONE_US, TEL_US, HELP, SETTINGS, WEDDINGS } from "./data"

type Plan = { names: string; date: string; guests: string; setting: (typeof SETTINGS)[number]; help: string[]; from: string }

function prettyDate(d: string) {
  if (!d) return "on the day you choose"
  const dt = new Date(d + "T12:00:00")
  return dt.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

function Invitation({ p }: { p: Plan }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30, rotate: -1.2 }} animate={{ opacity: 1, y: 0, rotate: -1.2 }} transition={{ delay: 0.5, duration: 1.4, ease }} className="card-paper relative mx-auto aspect-[5/7] w-full max-w-[420px] p-[9%] text-center">
      <div className="absolute inset-[4.5%] border border-champagne/60" aria-hidden />
      <div className="absolute inset-[5.6%] border border-champagne/30" aria-hidden />
      <div className="relative flex h-full flex-col items-center justify-between">
        <p className="text-[10px] tracking-[0.34em] text-muted uppercase">Together with their families</p>
        <div>
          <AnimatePresence mode="wait">
            <motion.p key={p.names || "empty"} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`deboss font-display text-[clamp(1.9rem,3.2vw,2.7rem)] leading-[1.05] italic ${p.names ? "" : "text-muted/50"}`}>
              {p.names || "Your names here"}
            </motion.p>
          </AnimatePresence>
          <p className="mx-auto mt-5 max-w-[16rem] text-[13px] leading-relaxed text-muted">request the pleasure of your company at their wedding celebration</p>
        </div>
        <div>
          <p className="font-display text-[1.15rem] leading-snug">{prettyDate(p.date)}</p>
          <p className="mt-2 text-[12px] tracking-[0.22em] text-sea uppercase">{p.setting === "Not sure yet" ? "Nassau · Paradise Island" : `${p.setting} · Nassau`}</p>
        </div>
        <div className="w-full">
          <div className="mx-auto h-px w-16 bg-champagne" />
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted uppercase">{p.guests ? `${p.guests} guests` : "Guests to be confirmed"}</p>
          <p className="mt-1 text-[10px] tracking-[0.2em] text-muted/80 uppercase">Planned by Bahamas Bridal Affairs</p>
        </div>
      </div>
    </motion.div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[11px] tracking-[0.24em] text-muted uppercase">{label}</span>{children}</label>
}
const inputCls = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-[1.25rem] outline-none transition focus:border-sea"

function Hero({ p, set }: { p: Plan; set: (u: Partial<Plan>) => void }) {
  const lines = ["Twenty-six years", "of island weddings."]
  return (
    <section id="date" className="relative overflow-hidden bg-gradient-to-b from-paper via-paper to-blush/70" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-12 pb-16 md:px-10 lg:min-h-[calc(100svh-120px)] lg:grid-cols-12 lg:items-center lg:pt-10">
        <div className="lg:col-span-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}><Label>Wedding planner · Nassau and Paradise Island</Label></motion.div>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.9rem,6.4vw,6.6rem)] leading-[0.98] font-medium tracking-[-0.02em]">
            <span className="sr-only">Bahamas Bridal Affairs: </span>
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-7 max-w-[34rem] text-[clamp(1.05rem,1.3vw,1.18rem)] leading-relaxed text-ink/80">
            Bahamas Bridal Affairs is Dr. Bernadette Burrows, for many years a preferred wedding planner with the One&Only Ocean Club and Atlantis. Start with your names and your date.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }} className="mt-9 grid gap-6 sm:grid-cols-[1.5fr_1fr_0.7fr]">
            <Field label="Your names"><input value={p.names} onChange={e => set({ names: e.target.value })} placeholder="Alex & Sam" className={inputCls} /></Field>
            <Field label="Wedding date"><input type="date" value={p.date} onChange={e => set({ date: e.target.value })} className={inputCls} /></Field>
            <Field label="Guests"><input type="number" min={2} value={p.guests} onChange={e => set({ guests: e.target.value })} className={inputCls} /></Field>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#plan" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px hover:bg-sea">Check your wedding date <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href={TEL_US} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/30 px-6 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden /> Call from the US</a>
          </motion.div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8"><Invitation p={p} /></div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items: [string, string, string][] = [
    ["Nassau office", PHONE, TEL],
    ["From the US and Canada", PHONE_US, TEL_US],
    ["Experience", "More than 26 years", "#planner"],
    ["Preferred planner", "One&Only Ocean Club and Atlantis", "#planner"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="text-[11px] tracking-[0.24em] text-glass uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i < 2 ? "text-[clamp(1.6rem,2.2vw,2.2rem)]" : "text-[1.35rem] italic"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-glass transition-all duration-700 group-hover:w-16" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PlanDay({ p, set }: { p: Plan; set: (u: Partial<Plan>) => void }) {
  const toggle = (h: string) => set({ help: p.help.includes(h) ? p.help.filter(x => x !== h) : [...p.help, h] })
  const parts = [p.names && `Names: ${p.names}`, p.date && `Date: ${prettyDate(p.date)}`, p.guests && `Guests: ${p.guests}`, `Setting: ${p.setting}`, p.help.length ? `Help with: ${p.help.join(", ")}` : null, p.from && `Calling from: ${p.from}`].filter(Boolean)
  return (
    <section id="plan" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36" aria-labelledby="plan-title">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>01 · Your day</Label>
          <h2 id="plan-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-medium tracking-[-0.02em]">Tell her what you imagine.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Packages are flexible, built around your requests and your traditions. Choose what you would like help with, and read the summary out when you call.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs defaultValue="setting">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-blush p-1">
              <TabsTrigger value="setting" className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">The setting</TabsTrigger>
              <TabsTrigger value="help" className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">What you need</TabsTrigger>
              <TabsTrigger value="you" className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">About you</TabsTrigger>
            </TabsList>
            <TabsContent value="setting" className="mt-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {SETTINGS.map(s => (
                  <button key={s} type="button" aria-pressed={p.setting === s} onClick={() => set({ setting: s })} className={`min-h-16 rounded-2xl border px-6 text-left font-display text-[1.4rem] transition hover:-translate-y-px ${p.setting === s ? "border-sea bg-glass/60" : "border-line hover:border-ink/40"}`}>{s}</button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="help" className="mt-8">
              <div className="flex flex-wrap gap-2">
                {HELP.map(h => (
                  <button key={h} type="button" aria-pressed={p.help.includes(h)} onClick={() => toggle(h)} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${p.help.includes(h) ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{h}</button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="you" className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Where you live"><input value={p.from} onChange={e => set({ from: e.target.value })} placeholder="Toronto, Atlanta, Nassau..." className={inputCls} /></Field>
                <Field label="Your names"><input value={p.names} onChange={e => set({ names: e.target.value })} className={inputCls} /></Field>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-10 rounded-3xl bg-ink p-6 text-paper md:p-8">
            <p className="text-[11px] tracking-[0.24em] text-glass uppercase">Read this out on the call</p>
            <p className="mt-3 font-display text-[1.3rem] leading-relaxed">{parts.join(" · ")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px hover:bg-glass"><Phone className="size-4" aria-hidden /> Nassau {PHONE}</a>
              <a href={TEL_US} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden /> US {PHONE_US}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Planner() {
  return (
    <section id="planner" className="bg-blush/60" aria-labelledby="planner-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <Label>02 · Your planner</Label>
          <h2 id="planner-title" className="mt-6 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.02em]">Planned personally, by the owner.</h2>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.1}>
            <p className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-snug italic">"With more than twenty-six years of experience, we understand the importance and value of making those precious moments memorable and stress free."</p>
            <p className="mt-6 text-[12px] tracking-[0.24em] text-muted uppercase">Bahamas Bridal Affairs</p>
          </Reveal>
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {[["Owner and operator", "Dr. Bernadette Burrows"], ["Preferred planner", "One&Only Ocean Club / Atlantis, for many years"], ["Approach", "Individual, personal attention"], ["Also", "Author of How to Be Fabulous"]].map(([k, v], i) => (
              <motion.div key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="grid grid-cols-[9rem_1fr] gap-4 py-5">
                <dt className="text-[12px] tracking-[0.18em] text-muted uppercase">{k}</dt>
                <dd className="font-display text-[1.2rem]">{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Published() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36" aria-labelledby="pub-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label>03 · As published</Label>
          <h2 id="pub-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-medium tracking-[-0.02em]">Weddings the magazines wrote about.</h2>
        </div>
        <a href="weddings.html" className="group inline-flex min-h-11 items-center gap-2 text-[15px] md:col-span-4 md:col-start-9 md:justify-self-end">See the credits <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </Reveal>
      <ol className="mt-14 border-t border-ink">
        {WEDDINGS.map(w => (
          <li key={w.id} className="border-b border-line">
            <a href={w.url} className="group grid gap-3 py-10 md:grid-cols-12 md:items-baseline md:gap-6">
              <span className="text-[12px] tracking-[0.24em] text-sea uppercase md:col-span-2">{w.mag} · {w.year}</span>
              <span className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight transition group-hover:translate-x-1 md:col-span-6">{w.title}</span>
              <span className="text-[16px] text-muted md:col-span-4">{w.where}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

const FAQ = [
  ["Who will plan our wedding?", "Dr. Bernadette Burrows, the owner and operator of Bahamas Bridal Affairs, with more than 26 years of experience and a long record as a preferred planner with the One&Only Ocean Club and Atlantis."],
  ["Are the packages fixed?", "No. The packages are flexible, built around your requests and your traditions."],
  ["We live in the US. How do we reach you?", `Call ${PHONE_US}, or the Nassau office on ${PHONE}.`],
  ["Where is Bahamas Bridal Affairs based?", "Fire Trail Road West, Nassau, New Providence."],
]

function Questions() {
  return (
    <section id="questions" className="border-t border-line bg-glass/40" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label>04 · Questions</Label>
          <h2 id="faq-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-medium">Before you call.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[1.45rem] font-medium hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function CallBlock() {
  return (
    <section id="call" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-28 md:px-10 md:py-32 lg:grid-cols-12 lg:items-end" aria-labelledby="call-title">
      <Reveal className="lg:col-span-6">
        <Label>05 · Contact</Label>
        <h2 id="call-title" className="mt-6 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.02em]">Say your date out loud.</h2>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Fire Trail Road West, Nassau. P.O. Box CB-13320.</p>
      </Reveal>
      <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
        {[["Nassau", PHONE, TEL], ["US and Canada", PHONE_US, TEL_US]].map(([k, v, h]) => (
          <a key={k} href={h} className="group block rounded-3xl bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-sea">
            <span className="text-[11px] tracking-[0.24em] text-glass uppercase">{k}</span>
            <span className="mt-3 block font-display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-none">{v}</span>
          </a>
        ))}
      </Reveal>
    </section>
  )
}

function Home() {
  const [p, setP] = useState<Plan>({ names: "", date: "", guests: "", setting: "Not sure yet", help: [], from: "" })
  const set = (u: Partial<Plan>) => setP(x => ({ ...x, ...u }))
  return (
    <Page current="Home">
      <Hero p={p} set={set} />
      <KeyBand />
      <PlanDay p={p} set={set} />
      <Planner />
      <Published />
      <Questions />
      <CallBlock />
    </Page>
  )
}

mount(<Home />)
