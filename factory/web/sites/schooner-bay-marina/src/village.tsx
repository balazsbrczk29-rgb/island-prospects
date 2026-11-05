import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { Page, mount, Reveal, Head, ease, reveal, IMG, MAIN, MAIN_TEL, SALES, SALES_TEL } from "./site"

const STEPS = [
  ["Explore your options", "Talk through whether a getaway or retirement home at Schooner Bay fits you and your family."],
  ["Book a Discovery Stay", "Three nights and four days hosted in the village: see the homes, walk the community, choose your excursions."],
  ["Select and purchase", "The team walks you through choosing and closing on your home."],
]

function Top() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-20 md:grid-cols-12 md:px-10 md:pt-24" aria-labelledby="v-title">
      <div className="md:col-span-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cap">The village</motion.p>
        <h1 id="v-title" className="mt-5 font-display text-[clamp(3rem,7.5vw,7.4rem)] leading-[0.9] tracking-[-0.035em]">
          {["A village", "around the water."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.04em]"><motion.span className={`block ${i ? "italic text-harbour" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-lg text-[18px] leading-relaxed">Schooner Bay is a private village centred on its natural harbour, open to visitors by land and by sea. The marina, Blackfly Lodge and the village invite you to come and see it.</motion.p>
      </div>
      <motion.img initial={{ clipPath: "inset(8% 8% 8% 8%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ delay: 0.2, duration: 1.3, ease: reveal }} src={IMG.community} alt="Schooner Bay community from above" width={1200} height={900} className="aspect-[4/3] w-full object-cover md:col-span-6" />
    </section>
  )
}

function Living() {
  return (
    <section className="bg-paper-2" aria-labelledby="live-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4"><Head n="01" k="Owning here" id="live-title" title={<>Three steps<br /><em className="text-harbour">to a key.</em></>}>For buyers of a getaway or retirement home. Residents also have covered, secured storage for their boats.</Head></div>
        <ol className="md:col-span-7 md:col-start-6">
          {STEPS.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8, ease }} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-ink/15 py-7 first:border-t">
              <span className="font-display text-4xl text-brass">{i + 1}</span>
              <span><span className="block font-display text-[clamp(1.6rem,2.4vw,2.2rem)]">{t}</span><span className="mt-2 block text-muted">{d}</span></span>
            </motion.li>
          ))}
          <div className="mt-10 flex flex-wrap gap-2">
            <a href={SALES_TEL} className="btn btn-ink"><Phone className="size-4" aria-hidden /> Sales, June Russell {SALES}</a>
          </div>
        </ol>
      </div>
    </section>
  )
}

function Homes() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="homes-title">
      <div className="grid gap-12 md:grid-cols-12">
        <motion.img initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 1.3, ease: reveal }} src={IMG.villa} alt="A Schooner Bay villa" width={1200} height={800} loading="lazy" className="aspect-[4/3] w-full object-cover md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9"><Head n="02" k="Days here" id="homes-title" title="Fish, swim, walk to the harbour.">Abaco is known for fishing, white sand beaches, snorkelling and diving. Blackfly Lodge is part of the village.</Head>
          <a href={MAIN_TEL} className="btn btn-line mt-8"><Phone className="size-4" aria-hidden /> Village {MAIN}</a>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="Village"><Top /><Living /><Homes /></Page>)
