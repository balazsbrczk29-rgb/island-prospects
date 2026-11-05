import { motion } from "motion/react"
import { Phone, MessageCircle } from "lucide-react"
import { Page, mount, Reveal, Kicker, ease, C } from "./site"
import { Builder } from "./builder"

const INCLUDE = [
  ["Your first name and a phone number", "So the Commission can reach you about the complaint."],
  ["The business", "Its name and where it is."],
  ["What happened, in order", "Dates, what was promised, what went wrong, what the business said."],
  ["Your proof", "Receipt or invoice, a bank record of the payment, clear photos, messages."],
  ["What you want", "A repair, a replacement, a refund: say it plainly."],
]

function Intro() {
  return (
    <section className="bg-paper" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pt-14 pb-12 md:px-10 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <Kicker>File a complaint</Kicker>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.96] font-semibold tracking-[-0.025em]">
            {["Clear complaints", "move faster."].map((l, n) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + n * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{n === 1 ? <span className="mark">{l}</span> : l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease }} className="mt-6 max-w-[36rem] text-[20px] leading-relaxed text-muted">
            A clean, clear complaint helps the Commission move. Work through the four steps below, then send it on WhatsApp or by email with your photos and receipts attached.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease }} className="grid gap-3">
          <a href={C.tel} className="flex min-h-16 items-center gap-3 rounded-2xl border-2 border-line bg-card px-5 transition hover:-translate-y-0.5 hover:border-ink"><Phone className="size-5 text-aqua" aria-hidden /> Prefer to talk? Call <strong>{C.phone}</strong></a>
          <a href={`https://wa.me/${C.waNum}`} className="flex min-h-16 items-center gap-3 rounded-2xl border-2 border-line bg-card px-5 transition hover:-translate-y-0.5 hover:border-ink"><MessageCircle className="size-5 text-aqua" aria-hidden /> WhatsApp <strong>{C.wa}</strong></a>
        </motion.div>
      </div>
    </section>
  )
}

function Form() {
  return (
    <section className="bg-paper-2" aria-label="Complaint builder">
      <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24"><Builder /></div>
    </section>
  )
}

function Include() {
  return (
    <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.5fr]" aria-labelledby="inc-title">
      <Reveal>
        <Kicker n="01">What to include</Kicker>
        <h2 id="inc-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.02] font-semibold">Five things to have ready.</h2>
      </Reveal>
      <ol className="border-t-2 border-line">
        {INCLUDE.map(([t, d], n) => (
          <motion.li key={t} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: n * 0.07, duration: 0.7, ease }} className="group grid grid-cols-[3rem_1fr] gap-4 border-b-2 border-line py-6">
            <span className="grid size-10 place-items-center rounded-full bg-aqua-soft font-display font-semibold text-aqua-deep transition group-hover:bg-gold group-hover:text-ink">{n + 1}</span>
            <span><span className="block font-display text-2xl font-semibold">{t}</span><span className="mt-1 block text-[18px] text-muted">{d}</span></span>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

mount(<Page current="File a complaint"><Intro /><Form /><Include /></Page>)
