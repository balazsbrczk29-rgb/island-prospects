import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plane } from "lucide-react"
import { Page, mount, Reveal, H, Pic, ease, reveal, IMG, EMAIL, BOOK, PHONE, TEL } from "./site"

const ROOMS = [
  { t: "Beach Front Suite", img: IMG.bfs, f: ["En-suite bathroom", "Air conditioning", "Furnished patio", "Wi-Fi"] },
  { t: "Ocean View Suite", img: IMG.ovs, f: ["En-suite bathroom", "Air conditioning", "Furnished patio", "Wi-Fi"] },
  { t: "Ocean View Room", img: IMG.ovr, f: ["En-suite bathroom", "Air conditioning", "Furnished patio", "Wi-Fi"] },
  { t: "Duplex Apartment", img: IMG.duplex, f: ["3 double bedrooms", "Kitchenette", "Dining area", "Furnished terrace"] },
]

function Top() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-16 md:grid-cols-12 md:px-10 md:pt-24" aria-labelledby="l-title">
      <div className="md:col-span-6">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-[17px]">The lodge</motion.p>
        <h1 id="l-title" className="mt-3 font-display text-[clamp(3.2rem,8vw,8rem)] leading-[0.88] font-medium tracking-[-0.035em]">
          {["A lodge", "on the beach."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "italic text-tannin" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-lg text-[20px] leading-relaxed">Twelve units for up to 26 guests, a restaurant and bar on the sand, and bicycles, kayaks and snorkelling gear free to borrow.</motion.p>
      </div>
      <motion.img initial={{ clipPath: "inset(10% 10% 10% 10%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ delay: 0.2, duration: 1.3, ease: reveal }} src={IMG.welcome} alt="Swain's Cay Lodge and its beach" width={1400} height={900} className="aspect-[4/3] w-full object-cover md:col-span-6" />
    </section>
  )
}

function Rooms() {
  const [i, setI] = useState(0)
  const r = ROOMS[i]
  return (
    <section className="bg-paper-2" aria-labelledby="r-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <H n="I" k="Rooms" id="r-title">Four ways<br /><em className="text-tannin">to sleep.</em></H>
          <ul className="mt-10 border-t border-ink/20">
            {ROOMS.map((x, k) => <li key={x.t} className="border-b border-ink/20"><button type="button" aria-pressed={i === k} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className={`w-full py-4 text-left font-display text-2xl transition hover:translate-x-1 ${i === k ? "italic text-tannin" : ""}`}>{x.t}</button></li>)}
          </ul>
          <a href={BOOK} className="cta cta-fill mt-8">Check dates online</a>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="relative aspect-[1024/540] overflow-hidden bg-paper">
            <AnimatePresence mode="popLayout"><motion.img key={r.t} src={r.img} alt={`${r.t} at Swain's Cay Lodge`} width={1024} height={540} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: reveal }} className="absolute inset-0 size-full object-cover" /></AnimatePresence>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-px bg-line">{r.f.map(f => <li key={f} className="bg-paper-2 py-3 pr-3 text-[17px]">{f}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

function Dining() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="d-title">
      <Pic src={IMG.dining} alt="The Reefside Restaurant and Bar on the beach" w={1200} h={780} className="aspect-[3/2] md:col-span-7" />
      <div className="md:col-span-4 md:col-start-9 md:self-center"><H n="II" k="Reefside Restaurant & Bar" id="d-title" intro="Right on the beach. Authentic Bahamian cuisine, fresh and home-cooked, for breakfast and dinner.">Home cooking,<br /><em className="text-tannin">on the sand.</em></H></div>
    </section>
  )
}

function GettingHere() {
  return (
    <section id="getting-here" className="bg-bight text-paper" aria-labelledby="g-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5"><H dark n="III" k="Getting here" id="g-title" intro="Fly to Nassau, then on to Andros. Fishing packages include transfers to and from the airport.">Via Nassau,<br /><em className="text-flat">then the out island.</em></H></div>
        <div className="md:col-span-6 md:col-start-7">
          <ul className="border-t border-paper/20">
            {[["Bahamas residents", "Fly or cruise free from Nassau with pre-booked 2 and 4 night stays, as current offers allow."], ["Private pilots", "A $300 fee credit for 4 nights or longer, $150 for a pre-booked 2-night stay."], ["From the US, Canada and Europe", "Seasonal air credits on air-inclusive packages. Ask the lodge which offer fits your dates."]].map(([k, v]) => (
              <li key={k} className="grid gap-1 border-b border-paper/15 py-5 md:grid-cols-[1fr_1.5fr]"><span className="font-display text-xl">{k}</span><span className="text-paper/75">{v}</span></li>
            ))}
          </ul>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Travel to Swain's Cay Lodge")}`} className="cta bg-paper text-ink"><Plane className="size-4" aria-hidden /> Ask about flights and offers</a>
            <a href={TEL} className="cta border border-paper/35 hover:border-paper">{PHONE}</a>
          </Reveal>
          <p className="mt-6 text-[14px] text-paper/60">Offers have booking and travel windows and blackout dates; the lodge confirms terms.</p>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="The lodge"><Top /><Rooms /><Dining /><GettingHere /></Page>)
