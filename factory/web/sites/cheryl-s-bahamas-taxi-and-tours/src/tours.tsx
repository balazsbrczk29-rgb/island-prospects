import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Mail, Phone } from "lucide-react"
import { Page, mount, Reveal, Head, ease, reveal, R, PHONE, TEL, EMAIL } from "./site"

type T = { n: string; g: string; d: string; img?: string }
const TOURS: T[] = [
  { n: "The Forts and the 66 Steps", g: "History", d: "Fort Charlotte, Fort Fincastle and the 66 Steps, Fort Montague. Wednesday and Friday re-enactments at 11:30am with the cannon fired at noon; small entrance fee.", img: "the-forts.png" },
  { n: "Clifton Heritage Park", g: "History", d: "A 45-minute historical immersion, with ATV, beach and shore-snorkel options. Ask for pricing.", img: "clifton-heritage-park.png" },
  { n: "The Cloisters", g: "History", d: "A historic site on Paradise Island, popular for weddings and photos, with a view across to Nassau.", img: "cloisters.png" },
  { n: "The Bat Cave", g: "History", d: "A limestone cave now home to fruit bats, and the famous kissing chair.", img: "bat-cave.png" },
  { n: "Conch demonstration", g: "Food and culture", d: "Conch 101, then fresh conch salad: $10 a bowl, shared by four.", img: "conch.png" },
  { n: "The Fish Fry", g: "Food and culture", d: "Lunch with the locals at 15 to 20 Bahamian seafood restaurants.", img: "fish-fry.png" },
  { n: "Junkanoo World Museum", g: "Food and culture", d: "Hands-on Junkanoo: drums, horns, cowbells, costumes and a Bahamian lunch on site. Ask about pricing.", img: "junkanoo.png" },
  { n: "Rum Cake Factory", g: "Food and culture", d: "Free tastings of flavours like pina colada, amaretto, banana and cinnamon.", img: "rum-cake-factory.png" },
  { n: "Rum distillery", g: "Food and culture", d: "A historical tour that ends at the bar.", img: "run-distillary.png" },
  { n: "Bahama hand craft and candy store", g: "Food and culture", d: "Locally made souvenirs of conch shell, coconut and straw, and a Bahamian sugar rush.", img: "hand-craft.png" },
  { n: "Ardastra Gardens Zoo", g: "Nature", d: "Four acres of gardens, native birds and the flamingo show at 10:30am. $18 per person, under 4 free.", img: "ardastra-gardens-zoo.png" },
  { n: "Time at Love Beach", g: "Beach and water", d: "A secluded beach with music, food and drinks; snorkelling $20. Day package with lunch for 6 or more.", img: "time-at-the-beach.png" },
  { n: "All-day snorkel cruise to Rose Island", g: "Beach and water", d: "About 6 hours: reef snorkelling, a secluded beach and a BBQ lunch, unlimited soft drinks and rum punch on the sail back. Hotel transfers from most hotels.", img: "snorkeling.png" },
  { n: "Blue Lagoon beach day", g: "Beach and water", d: "Boat ride to Blue Lagoon Island, grilled lunch, aqua parks and the Dolphin Encounters facility.", img: "blue-lagoon-beach.png" },
  { n: "Dolphin swim", g: "Beach and water", d: "Orientation, then hugs, kisses and a foot push across the natural ocean lagoon.", img: "dolphin-swim.png" },
  { n: "Swimming with the pigs", g: "Beach and water", d: "Exuma day trips 9am to 5pm, or Pieces of 8 Charters' 38 ft powerboats: $400 adults, $365 kids 5 to 11, lunch included.", img: "swim-with-pigs.png" },
  { n: "Fishing and snorkeling", g: "Beach and water", d: "Sightseeing by boat, reef fishing and optional snorkelling near an exclusive island.", img: "fishing-and-snorkeling.png" },
  { n: "Parasailing, jet ski, glass bottom boat", g: "Beach and water", d: "Ask what's running on your day.", img: "parasailing-jetski.png" },
]
const GROUPS = ["All", "History", "Food and culture", "Nature", "Beach and water"]

function Hero() {
  return (
    <section className="bg-navy text-paper" aria-labelledby="t-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 md:px-10 md:pt-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-yellow">Private tours · English or Spanish</motion.p>
        <h1 id="t-title" className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.95] font-bold tracking-[-0.045em]">
          {["Your island,", "your way, your driver."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-yellow" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-paper/85">Every tour is private: add or take away anything. Drinks are included (Bahama Mama, beers, sodas, water), car seats are free, and if you're celebrating, tell us: there's a little gift.</p>
      </div>
    </section>
  )
}

function Examples() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-6 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28" aria-labelledby="ex-title">
      <h2 id="ex-title" className="sr-only">Two popular tours</h2>
      {[["3 hours", "Sightseeing and shopping", "Paradise Island (including Atlantis), the 66 Steps and Jaws Beach, with time for souvenirs and help negotiating a fair price."], ["8+ hours", "Full day out with picnic lunch", "The 66 Steps, snorkelling at Jaws Beach away from the crowds, and a picnic with drinks on ice. For 6 or more."]].map(([h, t, d], i) => (
        <Reveal key={t} delay={i * 0.1} className={`rounded-[10px] p-7 md:p-10 ${i ? "bg-yellow text-navy" : "bg-paper-2"}`}>
          <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none font-bold tracking-[-0.04em]">{h}</p>
          <h3 className="mt-4 font-display text-[1.8rem] font-bold">{t}</h3>
          <p className="mt-3 max-w-md text-[17px] leading-relaxed">{d}</p>
        </Reveal>
      ))}
    </section>
  )
}

function Catalogue() {
  const [g, setG] = useState("All")
  const list = TOURS.filter(t => g === "All" || t.g === g)
  return (
    <section className="bg-paper-2" aria-labelledby="cat-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Head index="01" label="Every tour" id="cat-title" title={<>{TOURS.length} ways to spend a day.</>} />
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter tours">{GROUPS.map(x => <button key={x} role="tab" type="button" aria-selected={g === x} onClick={() => setG(x)} className={`min-h-11 rounded-full border-2 px-4 text-[15px] font-bold transition hover:-translate-y-px ${g === x ? "border-navy bg-navy text-paper" : "border-navy/20 text-navy hover:border-navy"}`}>{x}</button>)}</div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map(t => (
              <motion.li key={t.n} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease }} className="group overflow-hidden rounded-[10px] bg-paper">
                {t.img && <div className="overflow-hidden bg-[#c9d3e4]"><img src={R(t.img)} alt={t.n} width={600} height={400} loading="lazy" className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>}
                <div className="p-5"><p className="label text-muted">{t.g}</p><h3 className="mt-2 font-display text-[1.35rem] font-bold text-navy">{t.n}</h3><p className="mt-2 text-[15px] leading-relaxed text-muted">{t.d}</p></div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="bg-navy text-paper" aria-labelledby="c-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-24">
        <Reveal><h2 id="c-title" className="max-w-2xl font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1] font-bold tracking-[-0.035em]">Tell us what you like. We'll design the day.</h2></Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
          <a href="index.html#plan" className="inline-flex min-h-12 items-center justify-center rounded-full bg-yellow px-7 font-bold text-navy transition hover:-translate-y-px">Plan my tour</a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Mail className="size-4" aria-hidden />Email</a>
          <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden />{PHONE}</a>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Private tours"><Hero /><Examples /><Catalogue /><Close /></Page>)
