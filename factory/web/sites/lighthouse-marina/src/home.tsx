import { motion } from "motion/react"
import { ArrowUpRight, Phone, Radio } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, PHONE, TEL, PHONE2, TEL2, PHONE_US, TEL_US, EMAIL } from "./site"
import { Lighthouse, FitCheck, Enquiry, Faq } from "./parts"

const FAQ: [string, string][] = [
  ["Where is Lighthouse Marina?", "At the base of the historic Elbow Reef Lighthouse in Hope Town Harbour, Elbow Cay, Abaco, within easy reach of provisioning, restaurants and local amenities."],
  ["What size boat fits your slips?", "Our 6 protected slips take vessels up to 60 ft LOA, drawing up to 6 ft at low water. Contact the office in advance to reserve."],
  ["Do you sell diesel?", "Yes. The rebuilt fuel dock has three fueling stations, two gas and one diesel, and it is the only marine fuel station on Elbow Cay."],
  ["Can you haul and store my boat?", "Yes, hauling and dry storage up to 10 tons, with storage and launch preparation, bottom painting and fiberglass repair. The boatyard is open Monday to Friday, 8am to 4pm."],
  ["Do you service outboards?", "Yes. We are a Mercury Outboard sales and service dealer, with a mechanic on duty Monday to Friday."],
]

function Hero() {
  const specs = [["Slips", "6 protected"], ["Max LOA", "60 ft"], ["Draft", "6 ft at low water"], ["Fuel", "2 gas, 1 diesel"], ["Power", "30 and 50 amp"]]
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-10 md:px-10 lg:grid-cols-12 lg:pt-14">
        <div className="lg:col-span-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label flex items-center gap-2 text-chart"><Radio className="size-4" aria-hidden /> Hope Town Harbour · Elbow Cay · VHF 16</motion.p>
          <h1 id="hero-title" className="mt-6 font-display font-semibold leading-[0.9] tracking-[-0.045em]">
            <span className="sr-only">Lighthouse Marina, Hope Town, Abaco: </span>
            {["The fuel dock under", "the lighthouse."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block text-[clamp(3rem,7.4vw,7.4rem)] ${i ? "text-chart" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }} className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">Since 1980: the only marine fuel on Elbow Cay, six protected slips, a boatyard that hauls and stores up to 10 tons, and a store stocked for the fishing.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">Request a slip or service</a>
            <a href={TEL} className="btn btn-quiet"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </motion.div>
        </div>
        <motion.div className="relative hidden lg:col-span-4 lg:block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease }}>
          <Lighthouse className="absolute bottom-0 right-0 h-[min(62vh,520px)] w-auto" />
        </motion.div>
      </div>
      <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.9 }} className="mx-auto mt-12 grid max-w-[1440px] grid-cols-2 border-y border-ink px-5 sm:grid-cols-3 md:px-10 lg:grid-cols-5">
        {specs.map(([k, v], i) => (
          <div key={k} className={`py-5 ${i ? "lg:border-l lg:border-line lg:pl-6" : ""}`}>
            <dt className="label text-muted">{k}</dt>
            <dd className="mt-1 font-display text-[clamp(1.3rem,2vw,1.8rem)] font-semibold tracking-[-0.02em]">{v}</dd>
          </div>
        ))}
      </motion.dl>
      <motion.div className="relative h-[42svh] min-h-[260px] overflow-hidden" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.5, duration: 1.4, ease: reveal }}>
        <img src={IMG.banner} alt="Lighthouse Marina in Hope Town Harbour, Abaco" width={1905} height={697} fetchPriority="high" className="size-full object-cover" />
      </motion.div>
    </section>
  )
}

function KeyBand() {
  const items = [
    ["Marina office", PHONE, TEL],
    ["Also", PHONE2, TEL2],
    ["From the U.S.", PHONE_US, TEL_US],
    ["On the water", "VHF channel 16", "#contact"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-white/5 md:px-8 md:py-8">
              <span className="label text-buff">{k}</span>
              <span className="mt-2 block font-display text-[1.7rem] font-semibold tabular-nums tracking-[-0.02em]">{v}</span>
              <span className="mt-3 block h-px w-0 bg-buff transition-all duration-500 group-hover:w-10" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40" aria-labelledby="story-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Label n="01" className="text-chart">Rebuilt and ready</Label></Reveal>
          <Reveal delay={0.05}><h2 id="story-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">New docks, new fuel dock, same corner of the harbour.</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-muted">Lighthouse Marina has sat at the foot of the Elbow Reef Lighthouse since 1980. The docks and fuel station have been rebuilt and the gift shop renovated. Excursions, golf carts and bikes are just across the harbour, and the settlement's restaurants and provisioning are within easy reach.</p></Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Photo src={IMG.rebuilt} alt="The rebuilt docks at Lighthouse Marina" w={953} h={1127} className="aspect-[953/1127] max-h-[720px] w-full rounded-[8px]" />
        </div>
      </div>
    </section>
  )
}

function Fit() {
  return (
    <section id="fit" className="scroll-mt-20 bg-paper-2" aria-labelledby="fit-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6"><Label n="02" className="text-chart">Slips</Label><h2 id="fit-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Will your boat fit?</h2></Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end"><p className="text-[17px] leading-relaxed text-muted">Six protected slips with 30 and 50 amp power, hot showers and a laundry open every day. Slide to your length and draft.</p></Reveal>
        </div>
        <FitCheck />
      </div>
    </section>
  )
}

function Fuel() {
  const store = ["Fuel: 2 gas pumps, 1 diesel", "Ice", "Bait: ballyhoo, squid, shrimp, minnows", "Largest selection of rods and tackle on the island", "Souvenirs and clothing", "Snacks and soft drinks", "Cold beer, wines, spirits and cigars"]
  return (
    <section id="fuel" className="scroll-mt-20 mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="fuel-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Label n="03" className="text-chart">Fuel and ship's store</Label><h2 id="fuel-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Fill up, stock up, head out.</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">The only marine fuel station on Elbow Cay, with everything you need before a day on the Sea of Abaco. Mercury Outboard sales and service on site.</p></Reveal>
          <Photo src={IMG.facilities} alt="Facilities at Lighthouse Marina" w={523} h={392} className="mt-10 aspect-[4/3] rounded-[8px]" />
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {store.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.7, ease }} className="group flex items-baseline gap-6 border-b border-line py-5 first:border-t">
              <span className="label w-8 shrink-0 tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.3rem,2vw,1.7rem)] font-medium tracking-[-0.02em] transition group-hover:translate-x-1 group-hover:text-chart">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Yard() {
  return (
    <section className="bg-chart text-paper" aria-labelledby="yard-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Label n="04" className="text-buff">Boatyard</Label>
          <h2 id="yard-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Haul-out, storage and repairs, with published rates.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-[17px] leading-relaxed text-paper/80">Hauling and dry storage up to 10 tons, bottom painting, fiberglass, brite work and engine servicing. Monday to Friday, 8am to 4pm.</p>
          <a href="boatyard.html" className="btn btn-light mt-6">Price a haul-out <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="05" className="text-chart">Contact the office</Label>
          <h2 id="contact-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">Tell us before you come in.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">For slip reservations, service, fishing charters or anything else, write ahead or call. On the water, we listen on VHF 16.</p>
          <p className="mt-8 text-[15px]"><a href={`mailto:${EMAIL}`} className="ulink break-all">{EMAIL}</a></p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><Enquiry /></Reveal>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-line px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5"><Label n="06" className="text-chart">Questions</Label><div className="mt-8"><Faq items={FAQ} /></div></div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/3] overflow-hidden rounded-[8px] bg-paper-2"><iframe title="Map: Lighthouse Marina, Hope Town, Elbow Cay" loading="lazy" className="size-full border-0" src="https://www.google.com/maps?q=Lighthouse%20Marina%2C%20Hope%20Town%2C%20Abaco%2C%20Bahamas&output=embed" /></div>
        </div>
      </div>
    </section>
  )
}

mount(
  <Page current="Home">
    <Hero />
    <KeyBand />
    <Story />
    <Fit />
    <Fuel />
    <Yard />
    <Contact />
  </Page>
)
