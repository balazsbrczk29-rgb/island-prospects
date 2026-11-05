import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, BOOK, WP } from "./site"
import Planner from "./Planner"

const DO: [string, string][] = [
  ["Bonefishing and saltwater fishing", "The inn is near some of Cat Island’s bonefishing flats."],
  ["Kayaking and boat rides", "Out on the water and to nearby cays."],
  ["Bicycling", "Rent a bicycle at the inn for $10 a day."],
  ["Sightseeing", "Blue Hole, Port Royal Beach and Fernandez Bay."],
  ["Straw markets and performances", "Local crafts and Cat Island culture."],
  ["Local dining", "About six nearby restaurants of Bahamian food, $12 to $18 a meal on average."],
]
const GALLERY = [1, 2, 3, 4, 5, 6].map(i => WP + `2019/08/gallery-img-${i}-520x520.jpg`)

function Island() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-12 md:px-10 md:pt-24" aria-labelledby="is-title">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Getting here · Cat Island</Label></motion.div>
        <motion.h1 id="is-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.95] font-semibold tracking-[-0.03em]">Nassau or Fort Lauderdale, then 3.5 miles.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Most guests fly to Nassau and connect to Cat Island; others fly direct from Fort Lauderdale Executive with Makers Air. Arthur’s Town Airport is the closest, about 3.5 miles from the inn.</motion.p>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-32" aria-label="Trip planner"><Reveal><Planner /></Reveal></section>

      <section id="do" className="bg-sand/50" aria-labelledby="do-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="md:col-span-5">
            <Label n="01">On Cat Island</Label>
            <h2 id="do-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[1] font-semibold tracking-[-0.02em]">Quiet beaches, flats and a blue hole.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Cat Island is one of the least crowded islands in The Bahamas. December to April is the most popular season, but it is a year-round island.</p>
          </Reveal>
          <ol className="md:col-span-6 md:col-start-7">
            {DO.map(([t, d], i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6 first:border-t">
                <span className="text-[12px] text-casuarina">{String(i + 1).padStart(2, "0")}</span>
                <span><span className="block font-display text-2xl font-medium transition group-hover:translate-x-1">{t}</span><span className="mt-1 block text-[15px] leading-relaxed text-muted">{d}</span></span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="g-title">
        <Reveal><Label n="02">Around the inn</Label><h2 id="g-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-semibold">Photographs from Orange Creek.</h2></Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {GALLERY.map((src, i) => <Reveal key={src} delay={(i % 3) * 0.08}><Photo src={src} alt={`Orange Creek Inn and surroundings, photograph ${i + 1}`} className="aspect-square rounded-[14px]" /></Reveal>)}
        </div>
        <a href={BOOK} className="group mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-casuarina px-6 text-paper transition hover:-translate-y-px">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
      </section>
    </>
  )
}

mount(<Page current="Getting here"><Island /></Page>)
