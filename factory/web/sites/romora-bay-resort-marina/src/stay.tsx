import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, BOOK, A } from "./site"

const ROOMS = [
  { key: "king", name: "King with Waterfront View", text: "Wake to the sound of the water. A private balcony, premium king bedding, a spacious living area and a bathroom with a walk-in shower.", feats: ["Private balcony", "Water views", "King bed", "Walk-in shower"], imgs: ["room1-1-DlzYwzon.jpg", "room1-3-ClMT7fz1.jpg", "room1-5-GeiL2ZYS.jpg", "room1-6-BCGiD4IM.jpg"] },
  { key: "suite", name: "The Suites", text: "Vaulted wood-panelled ceilings, a cosy seating area, a king bed with a daybed and an elegant bathroom.", feats: ["Vaulted ceilings", "Seating area", "King and daybed", "Garden views"], imgs: ["room2-1-CCtU0pS5.jpg", "room2-2-DhbF-0zK.jpg", "room2-5-D-rf6F4-.jpg", "room2-6-P_BGlF2m.jpg"] },
  { key: "house", name: "The House", text: "A standalone villa with a fully equipped gourmet kitchen, spacious living areas, several bedrooms and private terraces over the water and garden.", feats: ["Full kitchen", "Multiple bedrooms", "Private terraces", "Water views"], imgs: ["room3-6-DTuJzSJC.jpg", "room3-2-BRuHyVq7.jpg", "room3-3-BJJNvOdQ.jpg", "room3-9-BN6CIl9k.jpg"] },
]

function Stay() {
  const [k, setK] = useState(0)
  const [img, setImg] = useState(0)
  const r = ROOMS[k]
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-12 md:px-10 md:pt-24" aria-labelledby="s-title">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Rooms, suites and The House</Label></motion.div>
        <motion.h1 id="s-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.96]">Seventeen rooms, <em className="text-harbour">three ways to stay.</em></motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Waterview rooms built for comfort, privacy and ease: crisp linens, air-conditioned calm and a patio moments from the beach. The resort closes for the season from August 17 to November 12.</motion.p>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 md:pb-32" aria-label="Choose a room">
        <div className="flex flex-wrap gap-2 border-b border-line pb-4" role="tablist" aria-label="Room type">
          {ROOMS.map((x, i) => <button key={x.key} role="tab" type="button" aria-selected={k === i} onClick={() => { setK(i); setImg(0) }} className={`min-h-11 rounded-full px-5 text-[15px] transition hover:-translate-y-px ${k === i ? "bg-ink text-paper" : "border border-line"}`}>{x.name}</button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={r.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Photo src={A + r.imgs[img]} alt={`${r.name} at Romora Bay`} className="aspect-[3/2] rounded-[22px]" />
              <div className="mt-3 grid grid-cols-4 gap-2">
                {r.imgs.map((s, i) => <button key={s} type="button" aria-label={`Photo ${i + 1} of ${r.name}`} aria-pressed={img === i} onClick={() => setImg(i)} className={`overflow-hidden rounded-[12px] border-2 transition hover:-translate-y-px ${img === i ? "border-harbour" : "border-transparent"}`}><img src={A + s} alt="" width={300} height={200} loading="lazy" className="aspect-[3/2] w-full object-cover" /></button>)}
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <h2 className="font-display text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none">{r.name}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">{r.text}</p>
              <ul className="mt-6">{r.feats.map(f => <li key={f} className="border-b border-line py-3 font-display text-xl first:border-t">{f}</li>)}</ul>
              <a href={BOOK} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-harbour px-6 text-paper transition hover:-translate-y-px hover:bg-harbour-deep">Reserve a stay <ArrowUpRight className="size-4" aria-hidden /></a>
              <p className="mt-3 text-[13px] text-muted">Rates on request or on the booking page.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <section className="bg-sand" aria-labelledby="new-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:items-center md:px-10 md:py-32">
          <Reveal className="md:col-span-5"><Label n="02">Coming soon</Label><h2 id="new-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">New island rooms and a Bahamian reception.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">Classic louvred architecture and deep verandas for a refined arrival. Renderings shown; final design subject to refinement.</p></Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7"><Photo src={A + "reception-002-eBEEKsYd.jpeg"} alt="Rendering of the new Romora Bay reception building" className="aspect-[16/10] rounded-[22px]" /></Reveal>
        </div>
      </section>
    </>
  )
}

mount(<Page current="Rooms & The House"><Stay /></Page>)
