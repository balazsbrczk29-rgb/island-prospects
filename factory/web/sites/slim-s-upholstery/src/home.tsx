import { motion } from "motion/react"
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Marquee } from "@/components/magicui/marquee"
import { Page, mount, Reveal, Label, ease, C, waLink } from "./site"
import { Studio } from "./studio"

function Hero() {
  return (
    <section className="weave relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-5 py-16 md:px-10 md:py-24 lg:min-h-[calc(100svh-120px)] lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Label>Upholstery · #21 Claridge Road, Nassau</Label></motion.div>
          <h1 id="hero-title" className="mt-7 font-display text-[clamp(3.2rem,7vw,7.4rem)] leading-[0.92] tracking-[-0.025em]">
            <span className="sr-only">Slim Upholstery, Nassau: </span>
            {["From worn", "to wow."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-navy" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.1, duration: 1.05, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-7 max-w-[30rem] text-[19px] leading-relaxed text-muted">Home, auto, marine, aircraft and church upholstery, done one stitch at a time in our Claridge Road shop.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.8, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href={waLink("Hi Slim Upholstery, I would like a free quote.")} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-navy px-7 py-3 text-[17px] text-linen transition hover:-translate-y-0.5 hover:bg-navy-deep"><MessageCircle className="size-5" aria-hidden /> WhatsApp a free quote</a>
            <a href="#studio" className="group inline-flex min-h-13 items-center gap-2 rounded-full border border-ink px-7 py-3 text-[17px] transition hover:-translate-y-0.5 hover:bg-ink hover:text-linen">Try colours <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, rotate: -4, scale: 0.94 }} animate={{ opacity: 1, rotate: -3, scale: 1 }} transition={{ delay: 0.25, duration: 1.2, ease }} className="relative mx-auto aspect-square w-full max-w-[480px]" aria-hidden>
          {/* a fabric swatch book: three fanned swatches with a stitched seam being sewn */}
          {[["#d8cbb4", 10], ["#8fb9b0", 4], ["#23395b", -3]].map(([c, r], i) => (
            <motion.div key={i} initial={{ rotate: 0, y: 30 }} animate={{ rotate: r as number, y: 0 }} transition={{ delay: 0.4 + i * 0.12, duration: 1, ease }} className="absolute inset-[8%] origin-bottom-left rounded-[22px] shadow-[0_30px_60px_-30px_rgba(42,36,32,.5)]" style={{ background: c as string, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 2px, transparent 2px 7px), repeating-linear-gradient(-45deg, rgba(0,0,0,.06) 0 2px, transparent 2px 7px)" }} />
          ))}
          <svg viewBox="0 0 400 400" className="absolute inset-[8%] size-[84%]">
            <motion.path d="M40 300 C 120 250, 200 330, 360 260" fill="none" stroke="#c99a2e" strokeWidth="4" strokeDasharray="10 9" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 2.2, ease }} />
            <motion.g initial={{ x: 40, y: 300 }} animate={{ x: [40, 360], y: [300, 260] }} transition={{ delay: 1.1, duration: 2.2, ease }}>
              <path d="M0 0 L-40 -60" stroke="#efe8da" strokeWidth="3" strokeLinecap="round" />
              <circle cx="-40" cy="-60" r="4" fill="none" stroke="#efe8da" strokeWidth="2" />
            </motion.g>
            <text x="44" y="70" fill="#efe8da" fontFamily="Young Serif, serif" fontSize="30">Same chairs,</text>
            <text x="44" y="108" fill="#c99a2e" fontFamily="Young Serif, serif" fontSize="30">new look.</text>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    { icon: MessageCircle, k: "Call or WhatsApp", v: C.phone, href: waLink("Hi Slim Upholstery, I would like a free quote.") },
    { icon: MapPin, k: "The shop", v: "#21 Claridge Road", href: "#visit" },
    { icon: Clock, k: "Open", v: "Mon to Sat, 9 to 5:30", href: "#visit" },
    { icon: Phone, k: "Quotes", v: "Free, by appointment", href: C.tel },
  ]
  return (
    <section className="bg-navy text-linen" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1360px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.li key={it.k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-linen/15 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <a href={it.href} className="group flex items-start gap-4 px-5 py-7 transition hover:bg-navy-deep md:px-8 md:py-8">
              <it.icon className="mt-1 size-5 shrink-0 text-thread" aria-hidden />
              <span><span className="block text-[11px] font-medium tracking-[0.2em] text-linen/70 uppercase">{it.k}</span><span className="mt-1 block font-display text-[1.45rem] leading-tight">{it.v}</span><span className="stitch mt-3 block h-[2px] w-0 transition-all duration-500 group-hover:w-14" /></span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Band() {
  return (
    <section className="border-b border-line py-7" aria-label="Specialities">
      <Marquee className="[--duration:50s] [--gap:2.5rem]" pauseOnHover>
        {["Sofas", "Dining seats", "Home", "Auto", "Marine", "Aircraft", "Churches"].map(s => <span key={s} className="flex items-center gap-10 font-display text-[clamp(1.8rem,3vw,2.6rem)]">{s}<span className="stitch h-[2px] w-10" aria-hidden /></span>)}
      </Marquee>
    </section>
  )
}

function StudioSection() {
  return (
    <section id="studio" className="scroll-mt-24" aria-labelledby="studio-title">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-3xl">
          <Label n="01">Fabric studio</Label>
          <h2 id="studio-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] tracking-[-0.02em]">Picture it before we pull a single staple.</h2>
          <p className="mt-5 text-[18px] text-muted">Pick the piece, try a colour and a fabric look, then send it to Slim on WhatsApp with photos of what you have now.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12"><Studio /></Reveal>
      </div>
    </section>
  )
}

const STEPS = [
  ["Send photos", `WhatsApp ${C.phone} with pictures of the piece and what you have in mind.`],
  ["Get a free quote", "Slim replies with a price for the job, no charge for quoting."],
  ["Book an appointment", "Bring it to Claridge Road or arrange a time that suits you."],
  ["Same piece, new look", "Reupholstered and stitched to finish, ready to collect."],
]
function How() {
  return (
    <section className="bg-linen-2" aria-labelledby="how-title">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label n="02">How a job goes</Label><h2 id="how-title" className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] tracking-[-0.02em]">Four steps, one stitch at a time.</h2></Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <motion.span className="stitch absolute top-6 left-0 hidden h-[2px] origin-left md:block" style={{ width: "100%" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} aria-hidden />
          {STEPS.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease }} className="relative">
              <span className="relative z-10 grid size-12 place-items-center rounded-full bg-ink font-display text-lg text-linen">{i + 1}</span>
              <p className="mt-5 font-display text-2xl">{t}</p>
              <p className="mt-2 text-[16px] text-muted">{d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const FAQ = [
  ["What does Slim Upholstery work on?", "Home, auto, marine, aircraft and church upholstery: sofas, dining seats, boat cushions, car seats, pews and more."],
  ["Is the quote free?", `Yes. Call or WhatsApp ${C.phone} for a free quote. Appointments are available.`],
  ["Where is the shop and when is it open?", `At ${C.address}. Monday to Saturday, 9:00am to 5:30pm. Closed Sunday.`],
]

function Visit() {
  return (
    <section id="visit" className="scroll-mt-24" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
        <Reveal>
          <Label n="03">Visit the shop</Label>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] tracking-[-0.02em]">#21 Claridge Road.</h2>
          <dl className="mt-8 border-t border-line">{C.hours.map(([d, h]) => <div key={d} className="flex justify-between border-b border-line py-3.5 text-[17px]"><dt>{d}</dt><dd className="text-muted">{h}</dd></div>)}</dl>
          <Accordion type="single" collapsible className="mt-10 border-t border-line">
            {FAQ.map(([q, a], i) => <AccordionItem key={q} value={`q${i}`} className="border-line"><AccordionTrigger className="min-h-14 py-5 text-left font-display text-xl hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-5 text-[16px] text-muted">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="min-h-[360px] flex-1 overflow-hidden rounded-[28px] border border-line"><iframe title="Map of Slim Upholstery, 21 Claridge Road, Nassau" loading="lazy" className="h-full min-h-[360px] w-full" src="https://www.google.com/maps?q=21+Claridge+Road,+Nassau,+Bahamas&output=embed" /></div>
          <a href={waLink("Hi Slim Upholstery, I would like a free quote.")} className="flex items-center justify-between gap-4 rounded-[28px] bg-navy p-7 text-linen transition hover:-translate-y-0.5 hover:bg-navy-deep">
            <span><span className="block text-[11px] font-medium tracking-[0.2em] text-thread uppercase">Call or WhatsApp</span><span className="mt-1 block font-display text-[clamp(2rem,3.6vw,2.8rem)]">{C.phone}</span></span>
            <MessageCircle className="size-8 text-thread" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Band /><StudioSection /><How /><Visit /></Page>)
