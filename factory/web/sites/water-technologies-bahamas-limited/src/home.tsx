import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, ease, reveal, PHONE, TEL } from "./site"
import { Machine, Flow, Chooser, Demo } from "./parts"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute top-[-20%] right-[-10%] -z-10 size-[80vw] max-w-[1100px] rounded-full bg-[radial-gradient(circle,#ffffff_0%,#e1eaec_45%,transparent_70%)]" aria-hidden />
      <div className="mx-auto grid min-h-[calc(100svh-112px)] max-w-[1440px] items-center gap-6 px-5 py-10 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-deep">Water Technologies Bahamas · Hawkins Hill · Nassau</motion.p>
          <h1 id="hero-title" className="display mt-7 text-[clamp(3rem,7.8vw,8.6rem)]">
            <span className="sr-only">Water from air machines in Nassau: </span>
            {[["Drinking water,", ""], ["made from", ""], ["the air.", "text-deep"]].map(([l, c], i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.15, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-lg text-[19px] leading-relaxed text-ink/80">Air2Water machines pull moisture from the air, filter it and purify it with UV light, so homes and offices in Nassau make their own drinking water.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="btn">Ask for a demonstration <ArrowRight className="size-4" aria-hidden /></a>
            <a href={TEL} className="btn-line"><Phone className="size-4" aria-hidden />{PHONE}</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.4, ease }} className="relative mx-auto w-[min(70vw,380px)] lg:col-span-4 lg:col-start-9 lg:w-full">
          <Machine className="h-auto w-full" />
          <p className="label absolute -bottom-2 left-0 text-[10px] text-muted">Illustration</p>
        </motion.div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items = [["Call", PHONE, TEL], ["Where", "Fairwind St, Hawkins Hill", "#contact"], ["Machines", "Stand-up and countertop", "machines.html"], ["For", "Homes and offices", "#demo"]]
  return (
    <section className="bg-deep text-white" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-b border-white/15 sm:border-l sm:first:border-l-0 lg:border-b-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9"><span className="label text-mist">{k}</span><span className="mt-2 flex items-center justify-between gap-3 font-display text-[clamp(1.2rem,1.7vw,1.6rem)] font-light">{v}<ArrowUpRight className="size-5 shrink-0 text-mist transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span></a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const FAQ = [
  ["How does an Air2Water machine make water from air?", "It draws in humid air, cools it so the moisture condenses into water, then filters the water and purifies it with ultraviolet light before you drink it."],
  ["Is it for homes or offices?", "Both. Air2Water machines come as stand-up units and portable countertop units for homes and offices."],
  ["Where is Water Technologies Bahamas?", `On Fairwind Street, Hawkins Hill, Nassau. Postal address P.O. Box N-3723. Call ${PHONE}.`],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4"><Label n="04">Questions</Label><h2 id="faq-title" className="display mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)]">Fair questions.</h2></Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="py-6 text-left font-display text-xl font-light hover:no-underline md:text-2xl">{q}</AccordionTrigger><AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-white" aria-labelledby="c-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="05">Contact</Label>
          <h2 id="c-title" className="display mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)]">Hawkins Hill, Nassau.</h2>
          <p className="mt-5 text-muted">Fairwind Street, Hawkins Hill · P.O. Box N-3723 · Fax 242-325-4202</p>
          <a href={TEL} className="mt-10 block rounded-[28px] bg-ink p-7 text-white transition hover:-translate-y-0.5"><span className="label text-mist">Call the office</span><span className="mt-3 block font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light">{PHONE}</span></a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[28px] border border-line"><iframe title="Map of Fairwind Street, Hawkins Hill, Nassau" loading="lazy" className="h-[400px] w-full lg:h-full" src="https://www.google.com/maps?q=Fairwind+Street,+Hawkins+Hill,+Nassau,+Bahamas&output=embed" /></Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyBand /><Flow n="01" /><Chooser n="02" /><Demo n="03" /><Questions /><Contact /></Page>)
