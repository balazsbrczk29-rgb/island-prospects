import { motion } from "motion/react"
import { Mail } from "lucide-react"
import { Page, mount, Reveal, Img, ease, reveal, EMAIL } from "./site"
import { UNITS, TAGS } from "./data"

function Top() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 md:px-10 md:pt-24" aria-labelledby="s-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="kicker">Rooms, cottages and houses</motion.p>
      <h1 id="s-title" className="mt-5 font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.03em]">
        {["Ten ways to stay", "on Long Island."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "italic text-lagoon" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Scattered through the palm gardens on the Atlantic shore. Whichever way you turn, the resort says, your view finds the turquoise or the ink-blue of the two near shorelines. Rates on request.</motion.p>
    </section>
  )
}

function List() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-36" aria-label="All accommodation">
      <ul className="grid gap-20">
        {UNITS.map((u, i) => (
          <li key={u.id} className="grid items-center gap-8 md:grid-cols-12">
            <div className={`grid grid-cols-[1.6fr_1fr] gap-3 md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
              <Img src={u.img} alt={`${u.name} at Stella Maris Resort Club`} className="aspect-[4/3] rounded-[24px]" />
              <Img src={u.img2} alt={`Inside ${u.name}`} className="aspect-[3/4] self-end rounded-[24px]" />
            </div>
            <Reveal className={`md:col-span-4 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
              <p className="kicker"><span className="text-lagoon">{String(i + 1).padStart(2, "0")}</span>&ensp;{u.kind}</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,3.4vw,3.2rem)] leading-[1]">{u.name}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">{u.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">{u.tags.map(t => <li key={t} className="rounded-full bg-paper-2 px-3 py-1 text-[13px]">{TAGS[t]}</li>)}</ul>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Stay enquiry: ${u.name}`)}`} className="ulink mt-6 inline-flex items-center gap-2 text-lagoon"><Mail className="size-4" aria-hidden /> Ask about {u.name}</a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Note() {
  return (
    <section className="bg-atlantic text-paper" aria-label="Booking notes">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-3 md:px-10">
        {[["Rates", "On request from reservations, for your dates."], ["Payment", "Credit card only: Visa, Mastercard, American Express."], ["Pools", "Three hotel pools, plus private pools at two rental villas."]].map(([k, v]) => (
          <Reveal key={k}><p className="kicker !text-shallows">{k}</p><p className="mt-2 font-display text-2xl leading-snug">{v}</p></Reveal>
        ))}
      </div>
    </section>
  )
}

mount(<Page current="Rooms & houses"><Top /><List /><Note /></Page>)
