import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Mask, Label, ease, reveal, BOOK } from "./site"
import { ROOMS } from "./Rooms"
import { Enquire } from "./Enquire"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16" aria-labelledby="rooms-title">
      <p className="label text-grape">Rooms · Greenwood Beach Resort · Port Howe</p>
      <h1 id="rooms-title" className="display mt-8 text-[clamp(3.2rem,9vw,9.4rem)]">
        {["Rooms a few steps", "from the sand."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.08em]">
            <motion.span className={`block ${i ? "italic text-grape" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span>
          </span>
        ))}
      </h1>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-[18px] leading-relaxed text-ink/80">Two room types at Greenwood, each a comfortable island retreat on the beachfront at Port Howe, Cat Island. Rates and live availability are on the resort's own booking page.</p>
        <a href={BOOK} className="btn">Check dates and book <ArrowUpRight className="size-4" aria-hidden /></a>
      </motion.div>
    </section>
  )
}

function Room({ r, i }: { r: typeof ROOMS[number]; i: number }) {
  const flip = i % 2 === 1
  return (
    <section className="border-t border-line" aria-labelledby={`room-${r.id}`}>
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
        <Mask src={r.img} alt={`${r.name} at Greenwood Beach Resort, Cat Island`} w={r.w} h={r.h} className={`aspect-[4/3] lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`} />
        <Reveal delay={0.1} className={`lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
          <Label n={`0${i + 1}`}>{r.for}</Label>
          <h2 id={`room-${r.id}`} className="display mt-6 text-[clamp(2.4rem,4vw,3.8rem)]">{r.name}</h2>
          <p className="mt-6 text-[18px] leading-relaxed text-muted">{r.line}</p>
          <ul className="mt-8 border-t border-line">{r.notes.map(n => <li key={n} className="border-b border-line py-3 text-[16px]">{n}</li>)}</ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BOOK} className="btn">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
            <a href="#enquire" className="btn-line group">Ask about this room <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Rooms"><Hero />{ROOMS.map((r, i) => <Room key={r.id} r={r} i={i} />)}<Enquire n="03" /></Page>)
