import { useState } from "react"
import { motion } from "motion/react"
import { Mail } from "lucide-react"
import { Page, mount, Reveal, ease, reveal, MaskImg, SectionHead } from "./site"
import { IMG, EMAIL } from "./data"

const DAYS = [
  ["On the beach", "Pink Sands Beach below the inn, with loungers, umbrellas, kayaks and paddle boards."],
  ["On the water", "Water sports around Harbour Island, arranged with the inn's concierge."],
  ["In town", "Browse the boutique shops of Harbour Island."],
  ["Slow mornings", "Book a massage, a yoga session or a fitness class."],
]

function Head() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-16 md:grid-cols-12 md:px-10 md:pt-28" aria-labelledby="island-title">
      <div className="md:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label">Days, dining and events</motion.p>
        <h1 id="island-title" className="mt-5 font-display text-[clamp(3.2rem,8.5vw,8.6rem)] leading-[0.9] tracking-[-0.03em]">
          {["Days on", "Harbour Island."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "italic text-tile" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-lg text-[18px] leading-relaxed">The inn keeps things quiet on purpose. What you do with the day is up to you: the beach, the water, the town, or nothing at all.</motion.p>
      </div>
      <MaskImg src={IMG.yoga} alt="Yoga on the beach below Runaway Hill Inn" w={705} h={470} eager className="aspect-[4/5] rounded-[24px] md:col-span-5" />
    </section>
  )
}

function Days() {
  const [i, setI] = useState(0)
  const pics = [IMG.beach, IMG.chairs, IMG.house2, IMG.house3]
  return (
    <section className="bg-paper-2" aria-labelledby="days-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <SectionHead n="01" kicker="Four ways to spend a day" id="days-title" title="Choose a pace." />
          <ul className="mt-10 border-t border-ink/15">
            {DAYS.map(([t, d], k) => (
              <li key={t} className="border-b border-ink/15">
                <button type="button" onClick={() => setI(k)} onMouseEnter={() => setI(k)} aria-pressed={i === k} className="group w-full py-5 text-left">
                  <span className={`font-display text-[clamp(1.6rem,2.4vw,2.2rem)] transition group-hover:translate-x-1 inline-block ${i === k ? "italic text-tile" : ""}`}>{t}</span>
                  <motion.span initial={false} animate={{ height: i === k ? "auto" : 0, opacity: i === k ? 1 : 0 }} transition={{ duration: 0.5, ease }} className="block overflow-hidden text-[16px] text-muted"><span className="block pt-2">{d}</span></motion.span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[24px] bg-paper">
            <motion.img key={i} src={pics[i]} alt={`${DAYS[i][0]} at Runaway Hill Inn`} width={705} height={705} loading="lazy" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1, ease: reveal }} className="size-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Dining() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="dining-title">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4"><SectionHead n="02" kicker="Dining" id="dining-title" title={<>Dinner with<br /><em className="text-tile">the ocean in view.</em></>}>The lobby, bar and restaurant sit in the Main House with panoramic ocean views. Evenings often start on the patio.</SectionHead></div>
        <MaskImg src={IMG.restaurant} alt="The restaurant in the Main House" w={1170} h={780} className="aspect-[16/10] rounded-[24px] md:col-span-8" />
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-12">
        <MaskImg src={IMG.lounge} alt="The oceanfront lounge" w={705} h={455} className="aspect-[3/2] rounded-[24px] md:col-span-5 md:col-start-2" />
        <MaskImg src={IMG.patio} alt="Cheers on the patio" w={705} h={697} className="aspect-square rounded-[24px] md:col-span-4 md:col-start-8 md:-mt-24" />
      </div>
    </section>
  )
}

function Events() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="events-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <MaskImg src={IMG.wedding} alt="A wedding at Runaway Hill Inn" w={705} h={470} className="aspect-[4/5] rounded-[24px] md:col-span-5" />
        <Reveal className="md:col-span-6 md:col-start-7">
          <p className="text-[12px] tracking-[0.16em] text-glass uppercase"><span className="text-conch">03</span>&ensp;Special events</p>
          <h2 id="events-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1]">Weddings on the hill, <em className="text-glass">dinners by the sea.</em></h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/75">The inn hosts weddings and special events, and its events team looks after the detail. With the Infinity House next door, the whole party can stay together.</p>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Event enquiry")}`} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden /> Ask about your date</a>
        </Reveal>
      </div>
    </section>
  )
}

const ROUTE = [
  ["Fly", "North Eleuthera International Airport", "Daily flights to and from the US and other Bahamian islands."],
  ["Ride", "Taxi to the dock", "A short taxi ride from the airport."],
  ["Cross", "Water taxi to Harbour Island", "A short hop across the harbour."],
  ["Arrive", "Runaway Hill Inn", "Love Lane and Colebrooke Streets, above Pink Sands Beach."],
]

function GettingHere() {
  return (
    <section id="getting-here" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="route-title">
      <SectionHead n="04" kicker="Getting here" id="route-title" title="Plane, taxi, boat, hill." />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <motion.span aria-hidden className="absolute top-[11px] left-0 hidden h-px w-full origin-left bg-tile md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease }} />
        {ROUTE.map(([k, t, d], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.25, duration: 0.8, ease }} className="relative">
            <span className="relative z-10 block size-[23px] rounded-full border-4 border-paper bg-tile" aria-hidden />
            <p className="mt-6 font-display text-tile italic">{i + 1}. {k}</p>
            <h3 className="mt-1 font-display text-2xl leading-tight">{t}</h3>
            <p className="mt-2 text-[16px] text-muted">{d}</p>
          </motion.li>
        ))}
      </ol>
      <p className="mt-12 text-[15px] text-muted">The inn offers a full concierge service: write to <a href={`mailto:${EMAIL}`} className="ulink text-tile">{EMAIL}</a> for help planning the journey.</p>
    </section>
  )
}

mount(<Page current="Days & events"><Head /><Days /><Dining /><Events /><GettingHere /></Page>)
