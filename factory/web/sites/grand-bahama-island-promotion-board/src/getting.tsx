import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Crossing } from "./maps"
import { Page, mount, Reveal, Head, ease, reveal, SITE, DEALS } from "./site"

const OPTS = [
  { t: "By air", s: "Hop on a plane and you could be on the beach by noon.", url: `${SITE}/getting-here/air/` },
  { t: "By Fast Ferry", s: "Depart on the Fast Ferry from Fort Lauderdale and enjoy a relaxing glide across.", url: `${SITE}/getting-here/by-ferry-and-cruise-ship/` },
  { t: "By cruise", s: "Sail from West Palm Beach, or make Grand Bahama one of your ports of call.", url: `${SITE}/getting-here/by-ferry-and-cruise-ship/` },
  { t: "By private boat", s: "For a more intimate journey, charter a boat or plane and travel your way.", url: `${SITE}/getting-here/private-boat/` },
]

function Hero() {
  const [i, setI] = useState(1)
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-20 md:px-10 md:pt-20" aria-labelledby="g-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-gulf">Getting here</motion.p>
      <h1 id="g-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6.6vw,6.4rem)] leading-[0.94] font-medium tracking-[-0.03em]">
        {["Getting to Grand Bahama", "is a short hop."].map((l, k) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${k ? "italic text-gulf" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + k * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div role="tablist" aria-label="Ways to get here" className="border-t border-line">
            {OPTS.map((o, k) => (
              <button key={o.t} role="tab" aria-selected={i === k} type="button" onClick={() => setI(k)} className="group flex w-full items-baseline justify-between border-b border-line py-5 text-left">
                <span className={`font-display text-[clamp(1.7rem,2.6vw,2.4rem)] transition ${i === k ? "translate-x-2 text-gulf" : "group-hover:translate-x-1"}`}>{o.t}</span>
                <span className="label text-muted">{String(k + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={i} role="tabpanel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-8">
              <p className="text-[19px] leading-relaxed">{OPTS[i].s}</p>
              <a href={OPTS[i].url} className="mt-6 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-gulf px-6 text-paper transition hover:-translate-y-px hover:bg-gulf-deep">Details and schedules <ArrowUpRight className="size-4" aria-hidden /></a>
            </motion.div>
          </AnimatePresence>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7"><div className="overflow-hidden rounded-[22px]"><Crossing className="block w-full" /></div></Reveal>
      </div>
    </section>
  )
}

function Around() {
  return (
    <section className="bg-paper-2" aria-labelledby="ar-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5"><Head index="01" label="Getting around" id="ar-title" title={<>Once you land, the island is easy.</>}><p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">Scenery, attractions and beaches are all within reach. Find the transport that suits your plans and budget.</p><div className="mt-8 flex flex-wrap gap-2"><a href={`${SITE}/getting-here/transportation`} className="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px">Find transportation <ArrowUpRight className="size-4" aria-hidden /></a><a href={DEALS} className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">Hot deals</a></div></Head></div>
        <Reveal delay={0.1} className="overflow-hidden rounded-[22px] border border-line lg:col-span-7"><iframe title="Map of Freeport, Grand Bahama" loading="lazy" className="h-[420px] w-full" src="https://www.google.com/maps?q=Freeport,+Grand+Bahama,+Bahamas&output=embed" /></Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Getting here"><Hero /><Around /></Page>)
