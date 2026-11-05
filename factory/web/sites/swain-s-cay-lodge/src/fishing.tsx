import { motion } from "motion/react"
import { FileText, Mail } from "lucide-react"
import { Page, mount, Reveal, H, Pic, ease, reveal, IMG, EMAIL, GUIDE_PDF } from "./site"

const KINDS = [
  { t: "Bonefishing", img: IMG.bone, d: "Mangrove Cay gives easy access to the South Bight or the fabled Middle Bight of Andros. Handpicked local independent guides know the spot for the wind and tide. Or wade the flat off the beach on your own." },
  { t: "Reef fishing", img: IMG.reef, d: "The Andros Barrier Reef runs 140 miles and lies less than a mile from shore in most places. Expect yellowtail snapper, Nassau grouper, triggerfish, barracuda, reef sharks and porgy." },
  { t: "Deep sea fishing", img: IMG.deep, d: "Outside the reef the bottom drops to 6,000 feet: wahoo, dolphin fish, tuna and billfish." },
  { t: "Spearfishing", img: IMG.spear, d: "Hunt your own dinner. The team arranges guided tours and lessons, beginners welcome." },
]
const INCL = ["Professional guide and boat, up to 2 guests per boat", "Accommodation", "All meals", "Purified or bottled water", "Transfers to and from the airport", "Transfers to and from the dock, Middle or South Bight", "Wi-Fi, lodge amenities and levies"]
const EXCL = ["Airfare to and from Nassau", "Alcoholic beverages and sodas", "Gratuities for guides and staff", "Fly fishing equipment and flies", "10% VAT on bar, other activities, fly shop", "Fishing licences, from license.gooutdoorsbahamas.com"]

function Top() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 md:px-10 md:pt-24" aria-labelledby="f-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-[17px]">The fishing</motion.p>
      <h1 id="f-title" className="mt-3 font-display text-[clamp(3.2rem,8.4vw,8.4rem)] leading-[0.88] font-medium tracking-[-0.035em]">
        {["Bonefishing on", "Andros, from the beach."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.05em]"><motion.span className={`block ${i ? "italic text-tannin" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <motion.img initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.3, ease: reveal }} src={IMG.fishing} alt="Fishing the flats of Andros from Swain's Cay Lodge" width={1600} height={800} className="mt-12 aspect-[16/7] w-full object-cover" />
    </section>
  )
}

function Kinds() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28" aria-labelledby="k-title">
      <H n="I" k="Four ways to fish" id="k-title">From the flat<br /><em className="text-tannin">to the blue.</em></H>
      <ul className="mt-16 grid gap-16">
        {KINDS.map((k, i) => (
          <li key={k.t} className="grid items-center gap-8 md:grid-cols-12">
            <Pic src={k.img} alt={`${k.t} with Swain's Cay Lodge`} className={`aspect-[3/2] md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`} />
            <Reveal className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
              <p className="eyebrow">{["One", "Two", "Three", "Four"][i]}</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-medium leading-none">{k.t}</h3>
              <p className="mt-4 text-[19px] leading-relaxed text-muted">{k.d}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Packages() {
  return (
    <section id="packages" className="bg-bight text-paper" aria-labelledby="p-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <H dark n="II" k="2026-2027 season, March 2026 to April 2027" id="p-title">Packages, <em className="text-flat">plainly.</em></H>
        <div className="mt-14 grid gap-px bg-paper/15 md:grid-cols-3">
          {[["Day trip", "$975 per boat", "A full day of fishing for 1 or 2 anglers. Lunch and transport included. Lodging not included."], ["Half day", "A la carte", "Add a half day on your arrival or departure day."], ["Non-angler rate", "$450", "For guests travelling with an angler who are not fishing."]].map(([t, p, d]) => (
            <Reveal key={t} className="bg-bight p-7"><p className="eyebrow !text-flat">{t}</p><p className="mt-2 font-display text-4xl">{p}</p><p className="mt-3 text-paper/75">{d}</p></Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal><p className="font-display text-2xl">Fishing packages include</p><ul className="mt-4 border-t border-paper/20">{INCL.map(x => <li key={x} className="border-b border-paper/15 py-3">{x}</li>)}</ul></Reveal>
          <Reveal delay={0.1}><p className="font-display text-2xl">Not included</p><ul className="mt-4 border-t border-paper/20 text-paper/80">{EXCL.map(x => <li key={x} className="border-b border-paper/15 py-3">{x}</li>)}</ul></Reveal>
        </div>
        <Reveal className="mt-14 grid gap-8 md:grid-cols-3">
          {[["Deposit", "50% within 21 days of booking; balance 90 days before arrival."], ["Gratuities", "Recommended $125 per day per boat per guide, $35 per night per guest for lodge staff."], ["Check in", "Any time after 2 pm. Check out flexes to your flight."]].map(([k, v]) => <div key={k}><p className="eyebrow !text-flat">{k}</p><p className="mt-1 text-[18px]">{v}</p></div>)}
        </Reveal>
        <Reveal className="mt-14 flex flex-wrap gap-3">
          <a href="index.html#plan" className="cta bg-paper text-ink"><Mail className="size-4" aria-hidden /> Plan my fishing week</a>
          <a href={GUIDE_PDF} className="cta border border-paper/35 hover:border-paper"><FileText className="size-4" aria-hidden /> Fishing guide (PDF)</a>
        </Reveal>
        <p className="mt-6 text-[14px] text-paper/60">All packages subject to 10% VAT. For tailored, non-guided or self-guided packages, write to {EMAIL}.</p>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-label="Fishing photographs">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
        <Pic src={IMG.fg1} alt="Bonefishing on Andros" className="col-span-2 aspect-[16/9] md:col-span-8" />
        <Pic src={IMG.fg2} alt="On the flats near Mangrove Cay" className="aspect-square md:col-span-4 md:aspect-auto" />
        <Pic src={IMG.fg5} alt="A guest's catch" className="aspect-square md:col-span-4" />
        <Pic src={IMG.fg3} alt="Fishing from the skiff" className="aspect-square md:col-span-8 md:aspect-auto" />
      </div>
      <p className="mt-4 text-[14px] text-muted">Photography courtesy of Lauren Brown Photography and Ian Davis at Yellow Dog Fly Fishing.</p>
    </section>
  )
}

mount(<Page current="The fishing"><Top /><Kinds /><Packages /><Gallery /></Page>)
