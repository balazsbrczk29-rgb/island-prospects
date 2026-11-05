import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, MaskImg, ease, reveal, IMG } from "./site"
import { ROOMS, RoomSelector, EnquirySection } from "./parts"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28" aria-labelledby="r-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-harbour">Rooms, suites and apartments</motion.p>
          <h1 id="r-title" className="mt-6 font-display text-[clamp(3rem,7.6vw,7rem)] leading-[0.9] tracking-[-0.03em]">
            {["Rooms over", "the marina"].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic text-harbour" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> at the Conch Inn, Marsh Harbour</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-md text-[17px] leading-relaxed text-muted">Modern, boutique-style rooms and suites in the heart of Marsh Harbour, renovated after Hurricane Dorian. Garden-view rooms, marina-view suites with balconies, and two-bedroom apartments with full kitchens.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#enquire" className="btn btn-primary">Ask about a room</a>
            <a href="#compare" className="btn btn-quiet">Compare the rooms</a>
          </motion.div>
        </div>
        <div className="relative lg:col-span-6">
          <MaskImg priority src={IMG.presidential} alt="The Presidential Suite at the Conch Inn" w={953} h={660} className="aspect-[953/660] rounded-[6px]" />
          <MaskImg src={IMG.queen} alt="Garden View Double Queen room" w={953} h={600} className="absolute -bottom-12 -left-10 hidden aspect-[953/600] w-[44%] rounded-[6px] ring-8 ring-paper md:block" />
        </div>
      </div>
    </section>
  )
}

function Selector() {
  return (
    <section className="bg-paper-2" aria-labelledby="sel-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mb-14">
          <Label n="01" className="text-harbour">Six ways to stay</Label>
          <h2 id="sel-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">Choose a room, see what is inside.</h2>
        </Reveal>
        <RoomSelector full />
      </div>
    </section>
  )
}

function Compare() {
  const feats = ["Balcony", "Patio", "Desk", "Microwave", "Full kitchen", "Sleeper sofa", "Large walk-in shower"]
  const has = (r: (typeof ROOMS)[number], f: string) => [...r.beds, ...r.has].some(x => x.includes(f))
  return (
    <section id="compare" className="scroll-mt-20 mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="cmp-title">
      <Reveal>
        <Label n="02" className="text-harbour">Side by side</Label>
        <h2 id="cmp-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.02em]">Every room compared.</h2>
        <p className="mt-5 max-w-xl text-[16px] text-muted">Every room has a mini refrigerator or full kitchen, a Keurig coffee maker and a walk-in shower. Rates on request.</p>
      </Reveal>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-[15px]">
          <caption className="sr-only">Conch Inn room comparison</caption>
          <thead><tr className="border-b border-ink"><th scope="col" className="label py-4 pr-4 font-normal text-muted">Room</th><th scope="col" className="label py-4 pr-4 font-normal text-muted">View</th>{feats.map(f => <th key={f} scope="col" className="label py-4 px-2 text-center font-normal text-muted">{f}</th>)}</tr></thead>
          <tbody className="divide-y divide-line">
            {ROOMS.map(r => (
              <tr key={r.id} className="transition hover:bg-paper-2">
                <th scope="row" className="py-4 pr-4 font-display text-[1.15rem] font-normal">{r.name}</th>
                <td className="py-4 pr-4 text-muted">{r.view}</td>
                {feats.map(f => <td key={f} className="px-2 text-center">{has(r, f) ? <span className="inline-block size-2.5 rounded-full bg-harbour" aria-label="Yes" /> : <span className="text-line" aria-label="No">·</span>}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Rooms() {
  return (
    <Page current="Rooms">
      <Hero />
      <Selector />
      <Compare />
      <EnquirySection />
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-10">
          <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">Arriving by boat?</p>
          <a href="marina.html" className="btn btn-quiet">Slips, rates and marina rules <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </section>
    </Page>
  )
}

mount(<Rooms />)
