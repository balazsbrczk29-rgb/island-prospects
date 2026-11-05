import { motion } from "motion/react"
import { RouteFinder } from "./routes"
import { Page, mount, Reveal, Head, reveal, M, EMAIL } from "./site"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-20 md:px-10 md:pt-20" aria-labelledby="g-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-sea">Getting here</motion.p>
      <h1 id="g-title" className="mt-5 max-w-5xl font-display text-[clamp(2.6rem,6vw,6rem)] leading-[1] tracking-[-0.01em]">
        {["Chart your course", "to the Cape."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-sea" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-muted">Scheduled flights, charters, your own plane or a seaplane to the beach. Once you know your arrival time, email {EMAIL} and the resort will have a taxi waiting.</p>
      <div className="mt-14"><RouteFinder /></div>
    </section>
  )
}

function Pilots() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="p-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6"><Head dark index="01" label="Private pilots" id="p-title" title={<>A favourite of pilot fly-ins for decades.</>}><p className="mt-6 max-w-lg text-[17px] leading-relaxed text-paper/75">Stella Maris Airport has fueling and customs, a short taxi from the lobby. The South Eastern Bonanza Society and Caribbean Flying Adventures (since 2007) bring their groups here, and private pilots receive 15% off accommodations, with some blackout dates, when booking by phone.</p></Head></div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8"><img src={M("capesantamariaresort-howtogethere-privatepilots-annualflyins-6675e39b72bda.webp")} alt="Two light aircraft flying over the water near Long Island" width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full bg-[#2a4456] object-cover" /></Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Getting here"><Hero /><Pilots /></Page>)
