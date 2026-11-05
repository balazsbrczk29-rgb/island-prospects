import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Mask, Label, ease, reveal, BOOK, EMAIL, IG, IMG, PHONE, TEL } from "./site"
import { RoomSelector } from "./Rooms"
import { Journey } from "./Journey"
import { Enquire } from "./Enquire"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="grid min-h-[calc(100svh-120px)] lg:grid-cols-12">
        <div className="relative z-10 order-2 flex flex-col justify-between px-5 pt-8 pb-10 md:px-10 lg:order-1 lg:col-span-5 lg:pt-16 lg:pb-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-grape">1 Ocean Drive · Port Howe · Cat Island</motion.p>
          <div className="mt-6 lg:mt-0">
            <h1 id="hero-title" className="display text-[clamp(3.4rem,7.6vw,8.6rem)] lg:mr-[-18vw]">
              <span className="sr-only">Greenwood Beach Resort: </span>
              {["Barefoot at", "Port Howe,", "Cat Island."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <motion.span className={`block ${i === 2 ? "italic text-grape" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-md text-[18px] leading-relaxed text-ink/80">
              A small beachfront resort at the south end of Cat Island, hosted by Pauline and Antoine, with diving and kitesurfing from the beach.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-8 flex flex-wrap gap-3">
              <a href={BOOK} className="btn">Check dates and book <ArrowUpRight className="size-4" aria-hidden /></a>
              <a href="rooms.html" className="btn-line group">See the rooms <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.15, duration: 1.5, ease: reveal }} className="relative order-1 min-h-[38svh] bg-sand lg:order-2 lg:col-span-7 lg:min-h-0">
          <img src={`${IMG}Kite-course-wind-window-1024x683.jpg`} alt="Kitesurfing on the water in front of Greenwood Beach Resort, Cat Island" width={1024} height={683} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1, ease }} className="absolute right-5 bottom-5 hidden max-w-[260px] sm:block rounded-2xl border border-white/40 bg-paper/80 p-4 backdrop-blur-xl md:right-8 md:bottom-8">
            <p className="label text-grape">Getting here</p>
            <p className="mt-1 text-[15px] leading-snug">Fly into New Bight (CAT). Taxis and rental cars meet you at the airport.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Book direct", "Check dates online", BOOK],
    ["Call", PHONE, TEL],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Fly to", "New Bight (CAT)", "getting-here.html"],
  ]
  return (
    <section className="bg-sand text-ink" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-b border-ink/10 sm:border-l sm:border-ink/10 sm:first:border-l-0 lg:border-b-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/30 md:px-8 md:py-9">
              <span className="label text-grape">{k}</span>
              <span className="mt-2 flex items-center justify-between gap-3 font-display text-[clamp(1.25rem,1.7vw,1.6rem)] leading-tight break-all sm:break-normal">{v}<ArrowUpRight className="size-5 shrink-0 text-grape transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Hosts() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="hosts-title">
      <Mask src={`${IMG}01-Cat-Island-Pauline-et-Antoine-1024x682.jpg`} alt="Pauline and Antoine, managers of Greenwood Beach Resort" w={1024} h={682} className="aspect-[4/5] lg:col-span-5" />
      <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
        <Label n="01">Your hosts</Label>
        <h2 id="hosts-title" className="display mt-6 text-[clamp(2.6rem,4.6vw,4.4rem)]">Pauline and Antoine run the house.</h2>
        <p className="mt-8 max-w-lg text-[18px] leading-relaxed text-muted">They manage Greenwood day to day, and guests come back for the way they make the place feel like home. The diving and kitesurfing are run by professionals, and the team keeps the pace slow and the welcome personal.</p>
        <a href="#enquire" className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px]">Write to them <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </Reveal>
    </section>
  )
}

function Rooms() {
  return (
    <section className="border-t border-line" aria-labelledby="rooms-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Label n="02">Rooms</Label>
            <h2 id="rooms-title" className="display mt-6 text-[clamp(2.6rem,4.6vw,4.4rem)]">Two ways to stay.</h2>
          </div>
          <a href="rooms.html" className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px]">Room details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <RoomSelector />
      </div>
    </section>
  )
}

const WATER = [
  ["The Nursery", "Dive site", "The-nursery-Dive-site-1024x631.jpg", 1024, 631],
  ["Oceanic whitetip", "Shark diving", "Surface-1024x683.jpg", 1024, 683],
  ["The wind window", "Kite course", "Kite-course-wind-window-1024x683.jpg", 1024, 683],
  ["Snorkel trip", "From the resort", "Snorkel-trip-1024x672.jpg", 1024, 672],
  ["Underwater", "Cat Island", "GOPR7892-1024x768.jpg", 1024, 768],
] as const

function Water() {
  return (
    <section id="water" className="overflow-hidden bg-atlantic text-paper" aria-labelledby="water-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-32">
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Label n="03" light>Dive and kite</Label>
            <h2 id="water-title" className="display mt-6 text-[clamp(2.6rem,4.6vw,4.4rem)]">The ocean is the main event.</h2>
          </div>
          <p className="max-w-md self-end text-[17px] leading-relaxed text-paper/75 lg:col-span-5 lg:col-start-8">Greenwood is known for its diving and kitesurfing, supervised by professionals, including dives with sharks in clear water off Cat Island.</p>
        </Reveal>
      </div>
      <div className="no-bar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-24 md:gap-8 md:px-10 md:pb-32" tabIndex={0} aria-label="Diving and kitesurfing photographs, scroll sideways">
        {WATER.map(([t, k, f, w, h], i) => (
          <motion.a key={f} href={IG} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 1, ease }} className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]">
            <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-paper/10">
              <img src={`${IMG}${f}`} alt={`${t}, ${k}, Greenwood Beach Resort`} width={w} height={h} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            </div>
            <p className="mt-4 flex items-baseline justify-between gap-3"><span className="font-display text-2xl">{t}</span><span className="label text-conch">{k}</span></p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function Dining() {
  const meals = [
    ["Breakfast", "See the breakfast menu", "https://greenwoodbeachresort.com/wp-content/uploads/2026/08/Breakfast-Menu-Greenwood-Beach-Resort-1-1.pdf"],
    ["Lunch", "Ask the resort for today's menu", "#enquire"],
    ["Dinner", "Ask the resort for today's menu", "#enquire"],
  ]
  return (
    <section id="dining" className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12" aria-labelledby="dining-title">
      <Reveal className="lg:col-span-5">
        <Label n="04">Dining</Label>
        <h2 id="dining-title" className="display mt-6 text-[clamp(2.6rem,4.6vw,4.4rem)]">Three meals on the terrace.</h2>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Fresh island flavours in a relaxed beachfront setting, from the first coffee to dinner after sunset.</p>
        <ul className="mt-10 border-t border-line">
          {meals.map(([m, d, href], i) => (
            <li key={m}>
              <a href={href} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-5">
                <span className="text-sm text-grape">0{i + 1}</span>
                <span><span className="font-display text-2xl">{m}</span><span className="mt-1 block text-[15px] text-muted">{d}</span></span>
                <ArrowUpRight className="size-5 text-grape transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <Mask src="https://greenwoodbeachresort.com/wp-content/uploads/elementor/thumbs/Greenwood-Beach-Resort-Terasse-Restaurant-scaled-rrte6uhcnv05a7184uin7k3fz80ib89qp8dg8d6vlm.jpg" alt="The restaurant terrace at Greenwood Beach Resort" className="aspect-[5/4] lg:col-span-6 lg:col-start-7" />
    </section>
  )
}

function Getting() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="journey-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Label n="05" light>Getting here</Label>
            <h2 id="journey-title" className="display mt-6 max-w-2xl text-[clamp(2.6rem,4.6vw,4.4rem)]">The journey is part of it.</h2>
          </div>
          <a href="getting-here.html" className="group inline-flex items-center gap-2 border-b border-paper pb-1 text-[15px]">Taxis and car rental <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <Journey />
      </div>
    </section>
  )
}

const FAQ = [
  ["How do I get to Greenwood Beach Resort?", "Fly to New Bight (CAT) on Cat Island: Western Air flies from Nassau, and MakersAir flies from Fort Lauderdale Executive (FXE). Local taxis and rental cars meet guests at New Bight Airport."],
  ["What can I do at Greenwood?", "Diving and kitesurfing supervised by professionals, including dives with sharks, plus snorkel trips and the beach itself."],
  ["Are meals served at the resort?", "Yes. The restaurant serves breakfast, lunch and dinner in a relaxed beachfront setting."],
  ["How do I book a room?", `Check dates and book direct online, or email ${EMAIL} or call ${PHONE}.`],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4">
        <Label n="07">Questions</Label>
        <h2 id="faq-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">Before you fly.</h2>
      </Reveal>
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

function FindUs() {
  return (
    <section className="border-t border-line" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="08">Find us</Label>
          <h2 id="find-title" className="display mt-6 text-[clamp(2.4rem,4.2vw,4rem)]">1 Ocean Drive, Port Howe.</h2>
          <p className="mt-5 max-w-md text-lg text-muted">At the south end of Cat Island, The Bahamas.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={TEL} className="group rounded-[28px] bg-grape p-6 text-paper transition hover:-translate-y-0.5 hover:bg-grape-deep">
              <Phone className="size-5" aria-hidden /><span className="mt-4 block font-display text-2xl">{PHONE}</span><span className="text-paper/70">Call the resort</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="group rounded-[28px] border border-line p-6 transition hover:-translate-y-0.5 hover:border-grape">
              <Mail className="size-5 text-grape" aria-hidden /><span className="mt-4 block font-display text-xl break-all">{EMAIL}</span><span className="text-muted">Email the resort</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[2px] border border-line">
          <iframe title="Map of Greenwood Beach Resort, Port Howe, Cat Island" loading="lazy" className="h-[420px] w-full lg:h-full" src="https://www.google.com/maps?q=24.1903379,-75.3129993&z=13&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyBand /><Hosts /><Rooms /><Water /><Dining /><Getting /><Enquire n="06" /><Questions /><FindUs /></Page>)
