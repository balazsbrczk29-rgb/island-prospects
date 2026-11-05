import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, H2, ease, reveal, PHONE, TEL } from "./site"
import { BRANDS, V } from "./data"
import { Lineup, Departments, Request } from "./parts"

const PARADE = [["h9-2027", "GWM Haval H9"], ["canter-14-foot-2025", "FUSO Canter 14 ft"], ["d260-2025", "CMC D260"], ["ram1500-2025", "RAM 1500 Bighorn"]]

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-112px)] flex-col justify-between overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-10 md:px-10 md:pt-14">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap justify-between gap-3">
          <p className="label text-olive">#44 Montrose Avenue · Palmdale · Nassau</p>
          <p className="label hidden text-muted md:block">New · Used · Service · Parts</p>
        </motion.div>
        <h1 id="hero-title" className="display mt-8 text-[clamp(2.7rem,7.6vw,8.4rem)]">
          <span className="sr-only">Bahamas Bus &amp; Truck: </span>
          {[["Moving Nassau", ""], ["since 1944.", "text-olive"]].map(([l, c], i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-lg text-[18px] leading-relaxed text-ink/80">Family SUVs, pickups, trucks and vans from GWM, Mitsubishi, RAM, FUSO and CMC, with genuine parts and a service department on the same lot.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#lineup" className="cta">See the lineup <ArrowRight className="size-4" aria-hidden /></a>
            <a href="#request" className="cta-line">Book a test drive</a>
          </div>
        </motion.div>
      </div>
      <div className="relative mt-10 pb-6">
        <div className="no-scroll flex items-end gap-[3vw] px-5 md:px-10">
          {PARADE.map(([img, name], i) => (
            <motion.img key={img} src={`${V}${img}/side.png`} alt={`${name}, side view`} width={800} height={400} fetchPriority={i === 0 ? "high" : "auto"} initial={{ x: "70vw", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.16, duration: 1.6, ease }} className={`h-auto object-contain ${i > 1 ? "hidden md:block" : ""} w-[44vw] md:w-[22vw]`} />
          ))}
        </div>
        <div className="road road-roll mx-5 mt-2 h-[3px] md:mx-10" aria-hidden />
        <div className="mx-5 h-px bg-ink/20 md:mx-10" aria-hidden />
      </div>
    </section>
  )
}

function KeyBand() {
  const items = [["Showroom", PHONE, TEL], ["Sales hours", "Mon to Fri 8 to 5 · Sat 9 to 1", "#departments"], ["Find us", "44 Montrose Ave, Palmdale", "#visit"], ["Service", "By appointment", "#request"]]
  return (
    <section className="bg-olive text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-b border-paper/15 sm:border-l sm:first:border-l-0 lg:border-b-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-black/10 md:px-8 md:py-8">
              <span className="label text-lime">{k}</span>
              <span className="mt-2 flex items-center justify-between gap-3 font-display text-[clamp(1.05rem,1.4vw,1.35rem)] leading-snug">{v}<ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Heritage() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-end gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="her-title">
      <Reveal className="lg:col-span-7">
        <Label n="02">Since 1944</Label>
        <p className="display mt-6 text-[clamp(6rem,20vw,19rem)] leading-[0.8] text-olive" aria-hidden>1944</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5">
        <H2 id="her-title">Serving The Bahamas with automotive expertise.</H2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">More than eighty years on, the dealership on Montrose Avenue sells and looks after the vehicles Nassau works with: family SUVs, contractors' trucks, taxi and church vans.</p>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Brands">{BRANDS.map(b => <li key={b} className="rounded-lg border border-line bg-white px-3 py-1.5 text-[14px] font-medium">{b}</li>)}</ul>
      </Reveal>
    </section>
  )
}

const FAQ = [
  ["Where is Bahamas Bus & Truck?", "At #44 Montrose Avenue, Palmdale, Nassau, New Providence."],
  ["When is the showroom open?", "Vehicle sales are open Monday to Friday 8am to 5pm and Saturday 9am to 1pm. Closed Sunday."],
  ["Do I need an appointment for service?", "Yes. Service is by appointment, Monday to Friday 8am to 5pm. Drop off by 9am for same-day service consideration."],
  ["Do you repair bodywork?", "Bahamas Bus & Truck no longer runs an in-house body shop. Reception will direct you to the current partner facility."],
]

function Questions() {
  return (
    <section className="border-t border-line" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="05">Questions</Label><H2 id="faq-title">Quick answers.</H2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
            {FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="py-6 text-left font-display text-lg hover:no-underline md:text-xl">{q}</AccordionTrigger><AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" className="bg-paper-2" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="06">Find us</Label>
          <H2 id="visit-title">44 Montrose Avenue, Palmdale.</H2>
          <a href={TEL} className="group mt-10 block rounded-2xl bg-ink p-7 text-paper transition hover:-translate-y-0.5">
            <span className="label text-lime">Main office, lines 1722 to 1725</span>
            <span className="mt-3 flex items-center justify-between font-display text-[clamp(1.8rem,3.6vw,3rem)]">{PHONE}<Phone className="size-7 text-lime" aria-hidden /></span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-line">
          <iframe title="Map of Bahamas Bus & Truck, Montrose Avenue, Nassau" loading="lazy" className="h-[400px] w-full lg:h-full" src="https://www.google.com/maps?q=44+Montrose+Avenue,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyBand /><Lineup n="01" /><Heritage /><Departments n="03" /><Request n="04" /><Questions /><Visit /></Page>)
