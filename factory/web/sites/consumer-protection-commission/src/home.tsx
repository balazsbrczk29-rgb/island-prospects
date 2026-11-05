import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Kicker, ease, C } from "./site"
import { Builder } from "./builder"

// The Commission's own description of its process: "we log it, review it, reach out to the business, and update you along the way."
const STAGES = [
  { stamp: "Logged", t: "We log it", d: "Your complaint is recorded, whether it arrives by phone, WhatsApp, email or in person." },
  { stamp: "Reviewed", t: "We review it", d: "The Commission reviews what happened and the proof you shared." },
  { stamp: "Business contacted", t: "We reach out to the business", d: "The Commission reaches out to the business to investigate and mediate." },
  { stamp: "Update sent", t: "We keep you updated", d: "You are updated along the way, so you do not have to guess or worry." },
]

/** The signature visual: a Bahamian shop receipt, printed line by line, then stamped with the Commission's real process stages. */
function Receipt({ stage, auto = false }: { stage: number; auto?: boolean }) {
  const [i, setI] = useState(stage)
  useEffect(() => { setI(stage) }, [stage])
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setI(x => (x + 1) % STAGES.length), 2600)
    return () => clearInterval(t)
  }, [auto])
  const rows = [["Item", "1"], ["Qty", "1"], ["Subtotal", ""], ["VAT", ""], ["Total", ""]]
  return (
    <div className="relative mx-auto w-full max-w-[380px]" aria-hidden>
      <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
        className="relative bg-card px-8 pt-9 pb-14 shadow-[0_40px_80px_-40px_rgba(20,24,27,.45)] [mask-image:linear-gradient(#000_calc(100%-14px),transparent_calc(100%-14px)),conic-gradient(from_-45deg_at_50%_100%,#000_90deg,transparent_0)] [mask-size:100%_100%,18px_14px] [mask-position:0_0,0_100%] [mask-repeat:no-repeat,repeat-x] [mask-composite:add]">
        <p className="text-center font-display text-2xl font-semibold">Thank you</p>
        <p className="mt-1 text-center text-[13px] tracking-[0.2em] text-muted uppercase">Nassau · Keep your receipt</p>
        <div className="my-6 border-t-2 border-dashed border-line" />
        {rows.map(([k], n) => (
          <motion.div key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + n * 0.12 }} className="flex items-center justify-between py-2 text-[16px]">
            <span className={n === 4 ? "font-bold" : "text-muted"}>{k}</span>
            <span className={`h-3 rounded-full ${n === 4 ? "w-24 bg-ink" : "w-16 bg-paper-2"}`} />
          </motion.div>
        ))}
        <div className="my-6 border-t-2 border-dashed border-line" />
        <div className="flex h-12 gap-[3px]">{Array.from({ length: 38 }).map((_, n) => <span key={n} className="bg-ink" style={{ width: (n * 7) % 4 + 1 }} />)}</div>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, scale: 1.6, rotate: -18 }} animate={{ opacity: 1, scale: 1, rotate: -9 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.1 }}
          className="absolute top-[38%] left-1/2 -translate-x-1/2 rounded-lg border-[3px] border-aqua bg-card/70 px-5 py-2 text-center whitespace-nowrap text-aqua-deep backdrop-blur-[2px]">
          <span className="block text-[11px] font-bold tracking-[0.2em] uppercase">CPC · Step {i + 1} of 4</span>
          <span className="block font-display text-[1.7rem] leading-tight font-semibold uppercase">{STAGES[i].stamp}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <div aria-hidden className="absolute top-0 right-0 h-full w-[46%] bg-aqua-soft max-lg:hidden" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pt-14 pb-16 md:px-10 lg:min-h-[calc(100svh-120px)] lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Kicker>Consumer Protection Commission · The Bahamas</Kicker></motion.div>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(3rem,6.6vw,6.6rem)] leading-[0.95] font-semibold tracking-[-0.025em]">
            <span className="sr-only">Consumer Protection Commission of The Bahamas: </span>
            {["A business let", "you down?", "Tell us."].map((l, n) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span className={`block ${n === 2 ? "" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + n * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>
                  {n === 2 ? <span className="mark">Tell us.</span> : l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-7 max-w-[34rem] text-[20px] leading-relaxed text-muted">
            The Commission is mandated by the Consumer Protection Act 2023 to receive and investigate complaints against providers of goods and services.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href="file-a-complaint.html" className="group inline-flex min-h-14 items-center gap-2 rounded-full bg-aqua px-7 text-[18px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-aqua-deep active:translate-y-0">File a complaint <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href={`https://wa.me/${C.waNum}`} className="inline-flex min-h-14 items-center gap-2 rounded-full border-2 border-ink px-7 text-[18px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-white"><MessageCircle className="size-5" aria-hidden /> WhatsApp us</a>
          </motion.div>
        </div>
        <div className="relative py-6"><Receipt stage={0} auto /></div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    { icon: Phone, k: "Call", v: C.phone, href: C.tel },
    { icon: MessageCircle, k: "WhatsApp", v: C.wa, href: `https://wa.me/${C.waNum}` },
    { icon: Mail, k: "Email a complaint", v: C.complaints, href: `mailto:${C.complaints}` },
    { icon: MapPin, k: "Visit", v: "Tonique Williams-Darling Hwy", href: "#visit" },
  ]
  return (
    <section className="bg-aqua text-white" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1320px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, n) => (
          <motion.li key={it.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: n * 0.07, duration: 0.7, ease }} className="border-b border-white/15 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={it.href} className="group flex min-h-[120px] items-start gap-4 px-5 py-7 transition hover:bg-aqua-deep md:px-8">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:bg-gold group-hover:text-ink"><it.icon className="size-5" aria-hidden /></span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold tracking-[0.12em] text-white/75 uppercase">{it.k}</span>
                <span className={`mt-1 block font-display leading-tight font-semibold ${it.v.includes("@") ? "text-[1.12rem] [overflow-wrap:anywhere]" : "text-[1.45rem]"}`}>{it.v}</span>
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const BEFORE = [
  ["Talk to the business first", "Explain the problem and give them a fair chance to put it right."],
  ["Gather your proof", "Receipts, a bank record of the payment, clear photos, messages and any warranty."],
  ["Bring it to the Commission", "If they refuse to help, file a complaint and the Commission will step in."],
]

function Stage({ s, n, onActive }: { s: (typeof STAGES)[number]; n: number; onActive: (n: number) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })
  useEffect(() => { if (inView) onActive(n) }, [inView, n, onActive])
  return (
    <li ref={ref} className="flex min-h-[38vh] items-center">
      <div className={`transition duration-500 ${inView ? "opacity-100" : "opacity-35"}`}>
        <span className={`grid size-12 place-items-center rounded-full font-display text-xl font-semibold transition ${inView ? "bg-gold text-ink" : "bg-paper-2 text-muted"}`}>{n + 1}</span>
        <h3 className="mt-5 font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-tight font-semibold">{s.t}</h3>
        <p className="mt-3 max-w-md text-[19px] leading-relaxed text-muted">{s.d}</p>
      </div>
    </li>
  )
}

function How() {
  const [active, setActive] = useState(0)
  return (
    <section id="how" className="scroll-mt-24 bg-card" aria-labelledby="how-title">
      <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <Kicker n="01">How it works</Kicker>
          <h2 id="how-title" className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-semibold tracking-[-0.02em]">Three things you do. Four things we do.</h2>
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line md:grid-cols-3">
          {BEFORE.map(([t, d], n) => (
            <motion.li key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: n * 0.1, duration: 0.8, ease }} className="group bg-paper p-7 transition hover:bg-gold-soft md:p-9">
              <p className="text-[13px] font-bold tracking-[0.14em] text-aqua uppercase">You · {n + 1}</p>
              <p className="mt-3 font-display text-2xl font-semibold">{t}</p>
              <p className="mt-2 text-[17px] text-muted">{d}</p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:h-[70vh] lg:self-start">
            <div className="flex h-full items-center rounded-3xl bg-aqua-soft p-8">
              <Receipt stage={active} />
            </div>
          </div>
          <ol>{STAGES.map((s, n) => <Stage key={s.t} s={s} n={n} onActive={setActive} />)}</ol>
        </div>
      </div>
    </section>
  )
}

function Start() {
  return (
    <section id="start" className="scroll-mt-24 bg-paper-2" aria-labelledby="start-title">
      <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-3xl">
          <Kicker n="02">Start your complaint</Kicker>
          <h2 id="start-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] font-semibold tracking-[-0.02em]">Four short steps. Then press send.</h2>
          <p className="mt-5 text-[19px] text-muted">Answer what you can. We turn it into a clear message the Commission can act on, ready for WhatsApp or email.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12"><Builder /></Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Who can the Commission help?", "Consumers with a complaint against a provider of goods or services. The Commission is mandated by the Consumer Protection Act 2023 to receive and investigate those complaints."],
  ["Should I contact the business first?", "Yes. Explain the problem and give the business a chance to fix it. If you do not get a satisfactory response, report it to the Commission."],
  ["I lost my receipt. Can I still complain?", "Yes, you still have rights. A bank record of the payment, photos and messages with the business can all help."],
  ["What happens after I file?", "The Commission logs your complaint, reviews it, reaches out to the business, and updates you along the way."],
  ["How do I reach the Commission?", `Call ${C.phone}, WhatsApp ${C.wa}, email ${C.complaints}, or visit the Consumer Protection Commission building on Tonique Williams-Darling Highway, west of Sunburst Paint.`],
]

function Questions() {
  return (
    <section id="questions" className="mx-auto grid max-w-[1320px] scroll-mt-24 gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.5fr]" aria-labelledby="faq-title">
      <Reveal>
        <Kicker n="03">Questions</Kicker>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.02] font-semibold">What people ask before they file.</h2>
        <div className="mt-8 rounded-2xl border-2 border-line p-6">
          <p className="font-bold">Phone, internet or TV problem?</p>
          <p className="mt-2 text-[17px] text-muted">The communications regulator, URCA, runs its own consumer centre for those services.</p>
          <a href="https://urcabahamas.bs/consumer/" className="mt-3 inline-flex min-h-11 items-center gap-1 text-aqua-deep underline underline-offset-4">URCA consumer centre <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t-2 border-line">
          {FAQ.map(([q, a], n) => (
            <AccordionItem key={q} value={`q${n}`} className="border-b-2 border-line">
              <AccordionTrigger className="min-h-16 py-6 text-left font-display text-[1.35rem] font-semibold hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[18px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 bg-card" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Kicker n="04">Visit or call</Kicker>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.02] font-semibold">Find the Commission.</h2>
          <p className="mt-6 text-[20px]">{C.address}</p>
          <p className="mt-1 text-[18px] text-muted">{C.addressNote}.</p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <a href={C.tel} className="group rounded-2xl bg-ink p-6 text-white transition hover:-translate-y-0.5 hover:bg-aqua-deep">
              <span className="text-[13px] font-bold tracking-[0.12em] text-gold uppercase">Call</span>
              <span className="mt-2 block font-display text-[2rem] font-semibold">{C.phone}</span>
            </a>
            <a href={`https://wa.me/${C.waNum}`} className="group rounded-2xl bg-gold p-6 text-ink transition hover:-translate-y-0.5">
              <span className="text-[13px] font-bold tracking-[0.12em] uppercase">WhatsApp</span>
              <span className="mt-2 block font-display text-[2rem] font-semibold">{C.wa}</span>
            </a>
          </div>
          <p className="mt-5 text-[17px]">General enquiries: <a className="text-aqua-deep underline underline-offset-4" href={`mailto:${C.info}`}>{C.info}</a></p>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden rounded-3xl border-2 border-line">
          <iframe title="Map of the Consumer Protection Commission on Tonique Williams-Darling Highway, Nassau" loading="lazy" className="h-[420px] w-full lg:h-full" src="https://www.google.com/maps?q=Consumer+Protection+Commission,+Tonique+Williams-Darling+Highway,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><How /><Start /><Questions /><Visit /></Page>)
