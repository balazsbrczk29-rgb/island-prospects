import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Heading, ease, reveal, BOOK, EMAIL, PHONE, TEL } from "./site"
import { COTTAGES, I, INCLUDED } from "./data"
import { Explorer } from "./Explorer"
import { Estimator } from "./Estimator"

function Hero() {
  const strip = [...COTTAGES, ...COTTAGES]
  return (
    <section className="relative flex min-h-[calc(100svh-112px)] flex-col justify-between overflow-hidden pt-10 md:pt-14" aria-labelledby="hero-title">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap justify-between gap-3">
          <p className="label text-thatch">Roker's · North Cat Island · The Bahamas</p>
          <p className="label hidden text-muted md:block">From $215 a night · No deposit</p>
        </motion.div>
        <h1 id="hero-title" className="display mt-8 text-[clamp(3.3rem,9.6vw,10.4rem)] md:mt-10">
          <span className="sr-only">Pigeon Cay Beach Club: </span>
          {[["Eight cottages,", ""], ["one quiet beach.", "italic text-thatch"]].map(([l, c], i) => (
            <span key={l} className="block overflow-hidden pb-[0.1em]">
              <motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 1.2, ease: reveal }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.9, ease }} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-lg text-[18px] leading-relaxed text-ink/80">Self-catering beach cottages on a private 200-acre property, three miles south of Bennett's Harbour on Cat Island. Kayaks, bikes and an honor bar under the palapa.</p>
          <div className="flex flex-wrap gap-3">
            <a href={BOOK} className="pill">Check dates and book <ArrowUpRight className="size-4" aria-hidden /></a>
            <a href="#estimate" className="pill-line group">Estimate a stay <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.2, ease }} className="mt-12 overflow-hidden pb-8">
        <div className="drift flex w-max gap-4">
          {strip.map((c, i) => (
            <a key={`${c.id}${i}`} href="cottages.html" aria-hidden={i >= COTTAGES.length} tabIndex={i >= COTTAGES.length ? -1 : 0} className="group relative block h-[30svh] min-h-[200px] w-[62vw] shrink-0 overflow-hidden rounded-[20px] bg-paper-2 sm:w-[34vw] lg:w-[22vw]">
              <img src={I + c.imgs[0]} alt={i < COTTAGES.length ? `${c.name} cottage, Pigeon Cay Beach Club` : ""} loading={i < 4 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} width={800} height={600} className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-paper/85 px-4 py-2 text-[14px] backdrop-blur-md"><span className="font-display italic">{c.name}</span><span className="tabular-nums">${c.rate}</span></span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Reservations", PHONE, TEL],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Rates", "$215 to $425 a night", "cottages.html"],
    ["Booking", "No deposit, pay on departure", BOOK],
  ]
  return (
    <section className="bg-deep text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-b border-paper/12 sm:border-l sm:first:border-l-0 lg:border-b-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="label text-shallow">{k}</span>
              <span className="mt-2 flex items-center justify-between gap-3 font-display text-[clamp(1.3rem,1.8vw,1.7rem)] leading-tight">{v}<ArrowUpRight className="size-5 shrink-0 text-shallow transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Cottages() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="cot-title">
      <Reveal className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7"><Label n="01">The cottages</Label><Heading id="cot-title">Handcrafted, steps from the sand.</Heading></div>
        <p className="max-w-md text-[17px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">Open floor plans and island décor, each with a fully equipped kitchen (the Sea Studio has a kitchenette). Choose one to see it.</p>
      </Reveal>
      <Explorer />
    </section>
  )
}

function Included() {
  return (
    <section className="border-y border-line" aria-labelledby="inc-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="02">In every cottage</Label><Heading id="inc-title">Already there when you arrive.</Heading></Reveal>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {INCLUDED.map((x, i) => (
            <motion.li key={x} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.7, ease }} className="flex items-baseline gap-4 border-b border-line py-4 text-[17px]">
              <span className="font-display text-sm text-thatch italic">{String(i + 1).padStart(2, "0")}</span>{x}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const DAYS = [
  ["Morning", "Complimentary coffee and tea at the beach bar, then breakfast if you want it.", "big-house-img2.jpg"],
  ["Midday", "Kayaks, canoes, paddle boards, bikes and snorkel gear are yours to use. Walk or ride the 200 acres.", "oleander-img2.jpg"],
  ["Afternoon", "Flats fishing, eco tours, caving or diving nearby, or a massage and a hammock.", "causarina2.jpg"],
  ["Evening", "The palapa honor bar, a bonfire on the beach, and dinner Wednesday to Saturday.", "winston-cottage2.jpg"],
]

function Days() {
  return (
    <section id="days" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="days-title">
      <Reveal><Label n="04">Days here</Label><Heading id="days-title" className="max-w-3xl">Unplugged, but never bored.</Heading></Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {DAYS.map(([t, d, img], i) => (
          <motion.article key={t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.1, duration: 1, ease }} className={`group ${i % 2 ? "lg:mt-20" : ""}`}>
            <div className="aspect-[3/4] overflow-hidden rounded-[20px] bg-paper-2"><img src={I + img} alt="Pigeon Cay Beach Club, Cat Island" loading="lazy" width={800} height={1067} className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
            <p className="label mt-5 text-thatch">{String(i + 1).padStart(2, "0")} · {t}</p>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">{d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Weddings() {
  return (
    <section className="bg-deep text-paper" aria-labelledby="wed-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="overflow-hidden rounded-[24px] lg:col-span-6"><img src={I + "weddings-1.jpg"} alt="A wedding at Pigeon Cay Beach Club, Cat Island" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover" /></Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <Label n="05" light>Weddings</Label>
          <Heading id="wed-title">Toes in the sand, or a 100-year-old church.</Heading>
          <p className="mt-6 text-[17px] leading-relaxed text-paper/75">For two, or for family and friends of up to 40 guests, with planning before, during and after.</p>
          <a href="weddings.html" className="group mt-8 inline-flex items-center gap-2 border-b border-paper pb-1 text-[15px]">Plan a Cat Island wedding <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Pigeon Cay Beach Club?", "On a private beachfront property in the northern part of Cat Island, three miles south of Bennett's Harbour, near The Bluff settlement."],
  ["How do I get to Pigeon Cay?", "Most guests fly into Nassau, take a domestic flight to Cat Island and finish with a short drive. Taxis are $60 one way, $120 round trip, and the club can help arrange transfers."],
  ["Do I need to pay a deposit?", "No deposit is required. The club holds a credit card to reserve your cottage and payment is due on departure. Cancel 30 days or more before arrival and nothing is charged; inside 30 days, one night is charged."],
  ["Are meals included?", "Every cottage has a kitchen or kitchenette. Breakfast is offered each morning ($18 per person) and dinner Wednesday to Saturday ($35 per person), with a 15% gratuity added."],
  ["Is there anything else to know about fishing?", "All anglers over 12 need a Bahamas flats fishing licence. Lodge owners and guides can arrange it before you arrive."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4"><Label n="06">Questions</Label><Heading id="faq-title">Good to know.</Heading></Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper-2" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="07">Contact</Label>
          <Heading id="contact-title">The club helps with all travel plans.</Heading>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={TEL} className="rounded-[24px] bg-deep p-6 text-paper transition hover:-translate-y-0.5"><Phone className="size-5" aria-hidden /><span className="mt-4 block font-display text-2xl">{PHONE}</span><span className="text-paper/70">Call for reservations</span></a>
            <a href={`mailto:${EMAIL}`} className="rounded-[24px] border border-ink/15 bg-paper p-6 transition hover:-translate-y-0.5"><Mail className="size-5 text-thatch" aria-hidden /><span className="mt-4 block font-display text-2xl">{EMAIL}</span><span className="text-muted">Email the club</span></a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[24px] border border-line">
          <iframe title="Map of Pigeon Cay Beach Club, Roker's, Cat Island" loading="lazy" className="h-[420px] w-full lg:h-full" src="https://www.google.com/maps?q=Pigeon+Cay+Beach+Club,+Cat+Island,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyBand /><Cottages /><Included /><Estimator n="03" /><Days /><Weddings /><Questions /><Contact /></Page>)
