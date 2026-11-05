import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Head, ease, reveal, PHONE, TEL, CDN, CDN2 } from "./site"

const HOMES = [
  { n: "Oceanfront home", bed: "6", bath: "6.5", sq: "3,879", price: "From $5,999,500", d: "Four oceanfront homes, steps from the water with wide sea views. Each has six bedrooms, six and a half baths and a private pool on the shoreline, fully furnished and ready from day one.", img: `${CDN2}69dcaac2469118b3813301bf_91a73aa0-3326-4643-ad19-30c74c449bae.webp` },
  { n: "Marina View Cottage, Plan A", bed: "3", bath: "3.5", sq: "2,264", price: "From $3,050,000 marina view, $4,050,000 oceanfront", d: "Three bedrooms, three and a half baths and a detached garage for a golf cart and owner storage. Fully furnished with linens and housewares. Oceanfront lots can add a private pool.", img: `${CDN2}69bd620f52aa3353cc5214dd_9ad5a460-ad28-4e7c-a98a-b9c6496add38.png` },
  { n: "Marina View Cottage, Plan B", bed: "3 or 4", bath: "3.5", sq: "2,492", price: "From $3,300,000 marina view, $4,250,000 oceanfront", d: "Three bedrooms and three and a half baths with an attached garage for a golf cart and storage, which can become a fourth bedroom. Pricing reflects the four-bedroom option.", img: `${CDN2}69b3c04ddf5b83b558f1a72c_Cottage-B.png` },
]
const PACKAGE = `${CDN}6a2038e2edec7d0a2a5f9f06_Sea%20Spray%20-%20Sales%20Package%202026.pdf`

function Selector() {
  const [i, setI] = useState(0)
  const h = HOMES[i]
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32" aria-labelledby="r-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-harbour">Residences · Sea Spray, Elbow Cay</motion.p>
      <h1 id="r-title" className="mt-5 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-light tracking-[-0.04em]">
        {["Own a piece", "of Elbow Cay."].map((l, k) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${k ? "italic text-harbour" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + k * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Residence types">
        {HOMES.map((x, k) => <button key={x.n} role="tab" type="button" aria-selected={i === k} onClick={() => setI(k)} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${i === k ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>{x.n}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="mt-10 grid gap-10 lg:grid-cols-12" role="tabpanel">
          <div className="overflow-hidden rounded-[18px] bg-[#cfdcd8] lg:col-span-7"><img src={h.img} alt={`Rendering of the ${h.n}`} width={1400} height={900} className="aspect-[14/9] w-full object-cover" /></div>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-tight font-light">{h.n}</h2>
            <dl className="mt-6 grid grid-cols-3 border-y border-line">
              {[["Bed", h.bed], ["Bath", h.bath], ["Sq ft", h.sq]].map(([k, v]) => <div key={k} className="border-r border-line py-4 pl-4 first:pl-0 last:border-r-0"><dt className="label text-muted">{k}</dt><dd className="mt-1 font-display text-3xl font-light">{v}</dd></div>)}
            </dl>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">{h.d}</p>
            <p className="mt-6 font-display text-[1.5rem] italic text-harbour">{h.price}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function Next() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="n-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7"><Head dark index="01" label="Next step" id="n-title" title={<>Read the sales package, then talk to us.</>} /></div>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <a href={PACKAGE} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Sales package 2026 <ArrowUpRight className="size-4" aria-hidden /></a>
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Residences"><Selector /><Next /></Page>)
