import { motion } from "motion/react"
import { ArrowUpRight, Mail } from "lucide-react"
import { Page, mount, Reveal, ease, reveal, MaskImg, TileStrip } from "./site"
import { ROOMS, EMAIL, BOOK, money, type House } from "./data"

const GROUPS: { h: House; d: string }[] = [
  { h: "Main House", d: "Five rooms in the 1946 manor, beside the lobby, bar and restaurant." },
  { h: "Courtyard", d: "Three rooms that can connect, for families and friends travelling together." },
  { h: "Villas", d: "Two villa rooms and Lyon Holland, with its own kitchen, living room and bay-view deck." },
  { h: "Infinity House", d: "A five-bedroom oceanfront home next to the inn, on the beach." },
]
const AMENITIES = ["Air-conditioning and ceiling fan", "Wireless internet", "Room service", "Daily housekeeping and nightly turndown", "In-room safe and hairdryer", "Reverse osmosis filtered water cooler", "Private patio", "Sealy Posturepedic king bed"]

function Head() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 md:px-10 md:pt-28" aria-labelledby="rooms-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label">Rooms and rates</motion.p>
      <h1 id="rooms-title" className="mt-5 font-display text-[clamp(3.4rem,10vw,10rem)] leading-[0.88] tracking-[-0.035em]">
        {["Rooms at", "Runaway Hill."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "italic text-tile" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
        ))}
      </h1>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-10 grid gap-6 md:grid-cols-12">
        <p className="max-w-xl text-[18px] leading-relaxed md:col-span-6">Eleven rooms, each with its own name, and a five-bedroom house on the beach. Rates below are the inn's published nightly rates, before 30% tax and gratuity. Stays are three nights or more.</p>
        <div className="flex flex-wrap items-start gap-2 md:col-span-5 md:col-start-8 md:justify-end">
          <a href="index.html#stay" className="btn-primary">Ask about a room</a>
          <a href={BOOK} className="btn-quiet">Check dates online <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </motion.div>
    </section>
  )
}

function Group({ h, d, gi }: { h: House; d: string; gi: number }) {
  const rooms = ROOMS.filter(r => r.house === h)
  return (
    <section className={gi % 2 ? "bg-paper-2" : "bg-paper"} aria-labelledby={`g-${gi}`}>
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="grid gap-4 md:grid-cols-12">
          <p className="label md:col-span-2"><span className="text-tile">0{gi + 1}</span>&ensp;{rooms.length} {rooms.length > 1 ? "rooms" : "home"}</p>
          <h2 id={`g-${gi}`} className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-none md:col-span-5">{h}</h2>
          <p className="max-w-md text-[17px] text-muted md:col-span-5">{d}</p>
        </Reveal>
        <ul className="mt-14 grid gap-16">
          {rooms.map((r, i) => (
            <li key={r.n} className="grid items-center gap-8 md:grid-cols-12">
              <MaskImg src={r.img} alt={`${r.name} at Runaway Hill Inn`} w={705} h={560} className={`aspect-[5/4] rounded-[22px] md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`} />
              <Reveal className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <p className="font-display text-tile italic">{r.n === "IH" ? "The beach house" : `Room ${r.n}`}</p>
                <h3 className="mt-2 font-display text-[clamp(2rem,3.2vw,3rem)] leading-[1.02]">{r.name}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">{r.note}</p>
                <dl className="mt-6 grid grid-cols-2 border-t border-line text-[15px]">
                  <div className="border-b border-line py-3 pr-3"><dt className="label">Beds</dt><dd className="mt-1">{r.bed}</dd></div>
                  <div className="border-b border-line py-3 pl-3"><dt className="label">Published rate</dt><dd className="mt-1 tabular-nums">{money(r.rate)} {r.n === "IH" ? "a day" : "a night"}</dd></div>
                </dl>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Stay enquiry: ${r.name}`)}`} className="ulink mt-5 inline-flex items-center gap-2 text-tile"><Mail className="size-4" aria-hidden /> Ask about {r.name}</a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Details() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="details-title">
      <TileStrip className="block h-5 w-full" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="text-[12px] tracking-[0.16em] text-glass uppercase">In every booking</p>
          <h2 id="details-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">The small print, <em className="text-glass">in plain words.</em></h2>
        </Reveal>
        <div className="grid gap-10 md:col-span-7 md:col-start-6 md:grid-cols-2">
          <Reveal>
            <p className="text-[12px] tracking-[0.16em] text-paper/60 uppercase">Policies</p>
            <ul className="mt-4 divide-y divide-paper/15 border-y border-paper/15 text-[16px]">
              <li className="py-3">Three night minimum stay</li>
              <li className="py-3">10% room gratuity, 10% VAT, 10% resort levy</li>
              <li className="py-3">$150 for a cot or each extra person over age 10</li>
              <li className="py-3">Infinity House weekly: $21,750 before taxes</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[12px] tracking-[0.16em] text-paper/60 uppercase">In the rooms</p>
            <ul className="mt-4 divide-y divide-paper/15 border-y border-paper/15 text-[16px]">
              {AMENITIES.map(a => <li key={a} className="py-3">{a}</li>)}
            </ul>
            <p className="mt-3 text-[13px] text-paper/55">As listed by the inn for its rooms. Ask reservations about any one room.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="Rooms"><Head />{GROUPS.map((g, i) => <Group key={g.h} {...g} gi={i} />)}<Details /></Page>)
