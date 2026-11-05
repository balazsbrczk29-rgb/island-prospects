import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Crossing, IslandMap, SPOTS } from "./maps"
import { Page, mount, Reveal, Head, ease, reveal, A, SITE, DEALS, GUIDE } from "./site"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 pt-10 md:px-10 md:pt-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="label text-gulf">Grand Bahama Island · The Bahamas</motion.p>
          <h1 id="hero-title" className="mt-5 font-display text-[clamp(3rem,7.4vw,7.6rem)] leading-[0.92] font-medium tracking-[-0.03em]">
            {["The Bahamas,", "55 miles from Florida."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic text-gulf" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 1.15, ease: reveal }}>{l}</motion.span></span>)}
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="lg:col-span-4 lg:col-start-9 lg:pb-4">
          <p className="text-[18px] leading-relaxed text-ink/80">Fly in and be on the beach by noon, take the Fast Ferry from Fort Lauderdale, or cruise over from West Palm Beach.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#planner" className="inline-flex min-h-12 items-center rounded-full bg-gulf px-6 text-paper transition hover:-translate-y-px hover:bg-gulf-deep">Plan your trip</a>
            <a href="getting-here.html" className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">Getting here</a>
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.4, ease: reveal }} className="mx-auto mt-8 max-w-[1440px] px-3 md:px-6">
        <div className="overflow-hidden rounded-[22px]"><Crossing className="block w-full" /></div>
      </motion.div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [["Distance", "55 miles east of Florida", "#hero-title"], ["By sea", "Fast Ferry from Fort Lauderdale, cruise from West Palm Beach", "getting-here.html"], ["By air", "Fly in, on the beach by noon", "getting-here.html"], ["Before you go", "Download the destination guide", GUIDE]]
  return (
    <section className="mt-12 bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, h]) => (
          <li key={k} className="border-b border-paper/12 sm:odd:border-r lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={h} className="group block h-full px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="label text-flamingo">{k}</span>
              <span className="mt-2 block font-display text-[1.45rem] leading-snug">{v}</span>
              <span className="mt-4 block h-px w-0 bg-flamingo transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Favourites({ picked, toggle }: { picked: string[]; toggle: (id: string) => void }) {
  const [active, setActive] = useState("park")
  const s = SPOTS.find(x => x.id === active)!
  const pick = (id: string) => { setActive(id) }
  return (
    <section id="favourites" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="fav-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7"><Head index="01" label="Traveller favourites" id="fav-title" title={<>Caves at one end, <span className="italic">stingrays at the other.</span></>} /></div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-12"><p className="text-[18px] leading-relaxed text-muted">The five places visitors love most, from West End to the national park. Tap a number, then add it to your day.</p></Reveal>
      </div>
      <div className="mt-12"><IslandMap active={active} picked={picked} onPick={pick} /></div>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Favourites">
        {SPOTS.map((x, i) => <button key={x.id} role="tab" aria-selected={active === x.id} type="button" onClick={() => pick(x.id)} className={`min-h-11 rounded-full border px-4 text-[15px] transition hover:-translate-y-px ${active === x.id ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>{i + 1}. {x.name}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }} className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center" role="tabpanel">
          <div className="overflow-hidden rounded-[22px] bg-[#9cc3cf] lg:col-span-6"><img src={`${A}${s.img}`} alt={s.name} width={1200} height={720} loading="lazy" className="aspect-[5/3] w-full object-cover transition duration-700 hover:scale-[1.02]" /></div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-tight">{s.name}</h3>
            <p className="mt-4 text-[18px] leading-relaxed text-muted">{s.d}</p>
            <button type="button" onClick={() => toggle(s.id)} aria-pressed={picked.includes(s.id)} className={`mt-7 inline-flex min-h-12 items-center rounded-full px-6 transition hover:-translate-y-px ${picked.includes(s.id) ? "bg-flamingo text-ink" : "bg-gulf text-paper hover:bg-gulf-deep"}`}>{picked.includes(s.id) ? "In your day: remove" : "Add to your day"}</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

const CATS = ["Beaches", "Water activities", "Nature and eco-tours", "Dining", "Spa and wellness", "Festivals and events", "Golf", "Shopping", "Fishing", "Nightlife", "Tennis"]
const CAT_URL: Record<string, string> = { Beaches: "beaches", "Water activities": "water-activities", "Nature and eco-tours": "nature-and-eco-tours", Dining: "dining-and-restaurants", "Spa and wellness": "couples", "Festivals and events": "festivals-and-events", Golf: "golf", Shopping: "shopping", Fishing: "fishing", Nightlife: "nightlife", Tennis: "tennis" }

function More() {
  return (
    <section className="bg-paper-2" aria-labelledby="more-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head index="02" label="Something for everyone" id="more-title" title={<>Eleven ways to spend a day.</>}><p className="mt-6 max-w-md text-[18px] leading-relaxed text-muted">Families swim with dolphins, couples dine over the ocean, friends go deep-sea fishing. Every category links to the Board's full listings.</p></Head>
          <div className="mt-10 grid grid-cols-2 gap-3">
            <img src={`${A}beaches-410x350.jpg`} alt="A Grand Bahama beach" width={410} height={350} loading="lazy" className="aspect-[41/35] w-full rounded-[16px] bg-[#9cc3cf] object-cover" />
            <img src={`${A}festivals-and-events-410x350.jpg`} alt="A festival on Grand Bahama" width={410} height={350} loading="lazy" className="mt-8 aspect-[41/35] w-full rounded-[16px] bg-[#e8d6ad] object-cover" />
          </div>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7">
          {CATS.map((c, i) => (
            <motion.li key={c} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.6, ease }} className="border-t border-line last:border-b">
              <a href={`${SITE}/things-to-do/${CAT_URL[c]}/`} className="group flex items-center justify-between py-4"><span className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] transition group-hover:translate-x-1">{c}</span><ArrowUpRight className="size-5 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gulf" aria-hidden /></a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const WAYS = [["Fly", `${SITE}/getting-here/air/`], ["Fast Ferry from Fort Lauderdale", `${SITE}/getting-here/by-ferry-and-cruise-ship/`], ["Cruise from West Palm Beach", `${SITE}/getting-here/by-ferry-and-cruise-ship/`], ["Private boat", `${SITE}/getting-here/private-boat/`]]
function Planner({ picked, toggle }: { picked: string[]; toggle: (id: string) => void }) {
  const [way, setWay] = useState(0)
  const [nights, setNights] = useState(3)
  const day = useMemo(() => SPOTS.filter(s => picked.includes(s.id)).sort((a, b) => a.at[1] - b.at[1]), [picked])
  return (
    <section id="planner" className="bg-gulf-deep text-paper" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Head dark index="03" label="Plan your trip" id="plan-title" title={<>Your Grand Bahama, in three choices.</>} />
          <div className="mt-10 space-y-8">
            <div>
              <p className="label text-flamingo">1. How are you coming?</p>
              <div className="mt-3 flex flex-wrap gap-2">{WAYS.map(([w], i) => <button key={w} type="button" aria-pressed={way === i} onClick={() => setWay(i)} className={`min-h-11 rounded-full border px-4 text-[15px] transition hover:-translate-y-px ${way === i ? "border-paper bg-paper text-ink" : "border-paper/30 hover:border-paper"}`}>{w}</button>)}</div>
            </div>
            <div>
              <label htmlFor="nights" className="label flex justify-between text-flamingo"><span>2. How many nights?</span><span className="text-paper">{nights}</span></label>
              <input id="nights" type="range" min={1} max={14} value={nights} onChange={e => setNights(+e.target.value)} className="mt-3 w-full accent-[#f2b8c6]" />
            </div>
            <div>
              <p className="label text-flamingo">3. What do you want to see?</p>
              <div className="mt-3 flex flex-wrap gap-2">{SPOTS.map(s => <button key={s.id} type="button" aria-pressed={picked.includes(s.id)} onClick={() => toggle(s.id)} className={`min-h-11 rounded-full border px-4 text-[15px] transition hover:-translate-y-px ${picked.includes(s.id) ? "border-flamingo bg-flamingo text-ink" : "border-paper/30 hover:border-paper"}`}>{s.name}</button>)}</div>
            </div>
          </div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[22px] bg-paper p-6 text-ink md:p-9">
            <p className="label text-gulf">Your plan</p>
            <p className="mt-3 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-snug">{nights} {nights === 1 ? "night" : "nights"} on Grand Bahama, {["flying in", "arriving on the Fast Ferry", "arriving by cruise from West Palm Beach", "arriving by private boat"][way]}.</p>
            <ol className="mt-6 border-t border-line">
              {day.length ? day.map((s, i) => <li key={s.id} className="flex items-baseline gap-4 border-b border-line py-3"><span className="font-display text-gulf">{String(i + 1).padStart(2, "0")}</span><span className="text-[17px]">{s.name}</span></li>)
                : <li className="py-4 text-[16px] text-muted">Pick a few favourites and they appear here, ordered west to east.</li>}
            </ol>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a href={WAYS[way][1]} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-gulf px-6 text-paper transition hover:-translate-y-px">Travel options <ArrowUpRight className="size-4" aria-hidden /></a>
              <a href={DEALS} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">Hot deals <ArrowUpRight className="size-4" aria-hidden /></a>
              <a href={GUIDE} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-ink/25 px-5 transition hover:-translate-y-px hover:border-ink">Destination guide <ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["How far is Grand Bahama from Florida?", "Grand Bahama Island is just 55 miles east of Florida."],
  ["How do I get to Grand Bahama?", "By air, by Fast Ferry from Fort Lauderdale, by cruise from West Palm Beach, as a cruise port of call, or by private boat or charter."],
  ["What is there to do?", "Beaches, water activities, nature and eco-tours, dining, spa and wellness, festivals, golf, shopping, fishing, nightlife and tennis. Favourites include Lucayan National Park, UNEXSO, Garden of the Groves, West End Ecology Tours and Smith's Point Fish Fry."],
  ["Where can I find deals?", "The Grand Bahama Island Promotion Board lists current hot deals and vacation packages on its deals page."],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <div className="lg:col-span-4"><Head index="04" label="Questions" id="faq-title" title={<>Good to know.</>} /></div>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.45rem] font-normal hover:no-underline md:text-[1.7rem]">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function App() {
  const [picked, setPicked] = useState<string[]>(["park", "fry"])
  const toggle = (id: string) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  return <Page current=""><Hero /><KeyInfo /><Favourites picked={picked} toggle={toggle} /><More /><Planner picked={picked} toggle={toggle} /><Questions /></Page>
}

mount(<App />)
