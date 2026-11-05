import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Mail, Phone, Minus, Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, H, Pic, ease, reveal, IMG, PHONE, TEL, EMAIL, BOOK } from "./site"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 md:px-10 md:pt-14">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow text-[17px]">An Orvis-endorsed bonefishing lodge on Mangrove Cay, Andros</motion.p>
        <div className="relative mt-4 grid items-end md:grid-cols-12">
          <h1 id="hero-title" className="relative z-10 font-display text-[clamp(4rem,12.5vw,13rem)] leading-[0.84] font-medium tracking-[-0.04em] md:col-span-8">
            <span className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1.2, ease: reveal }}>Swain's</motion.span></span>
            <span className="block overflow-hidden pb-[0.06em]"><motion.span className="block italic text-tannin" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease: reveal }}>Cay Lodge</motion.span></span>
          </h1>
          <div className="relative mt-8 md:col-span-4 md:mt-0">
            <motion.div initial={{ y: "40%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 1.8, ease }} className="mx-auto aspect-square w-[78%] overflow-hidden rounded-full md:w-full">
              <img src={IMG.hero} alt="Swain's Cay Lodge on its beach at Mangrove Cay, Andros" width={1600} height={900} fetchPriority="high" className="size-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 1.6, ease }} className="relative z-10 mt-6 h-px origin-left bg-ink" aria-hidden />
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-8 pb-14 md:grid-cols-12 md:px-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="text-[20px] leading-relaxed md:col-span-6">Between the Middle Bight and the South Bight of Andros, with handpicked local guides, a bonefish flat you can wade right off our beach, and the Andros Barrier Reef less than a mile out.</motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease }} className="flex flex-wrap items-start gap-3 md:col-span-5 md:col-start-8 md:justify-end">
          <a href="#plan" className="cta cta-fill">Plan my fishing week <ArrowRight className="size-4" aria-hidden /></a>
          <a href="#waters" className="cta cta-line">Where you'll fish</a>
        </motion.div>
      </div>
    </section>
  )
}

function Band() {
  const items = [
    ["Call the lodge", PHONE, TEL],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Guided day, 2026-27", "$975 per boat", "fishing.html#packages"],
    ["The lodge", "12 units, up to 26 guests", "lodge.html"],
  ]
  return (
    <section aria-label="Key information" className="bg-bight text-paper">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-paper/15 max-lg:border-b lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-8 md:py-9">
              <span className="eyebrow !text-flat">{k}</span>
              <span className="mt-1 block font-display text-[clamp(1.35rem,1.75vw,1.9rem)] leading-tight break-words">{v}</span>
              <span className="mt-3 block h-px w-0 bg-flat transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const WATERS = {
  home: { t: "The home flat", how: "Wade it yourself, no guide needed", fish: ["Bonefish"], d: "A wadeable bonefish flat right off the lodge beach. Spend a day on the sand and try to fool a bonefish on your own. They are very clever fish.", img: IMG.bone },
  middle: { t: "Middle Bight", how: "With a handpicked local guide", fish: ["Bonefish"], d: "The fabled Middle Bight of Andros, a short transfer to the dock. Your guide picks the spot for the wind and tide.", img: IMG.fg1 },
  south: { t: "South Bight", how: "With a handpicked local guide", fish: ["Bonefish"], d: "The other way out from Mangrove Cay to the flats, with dock transfers included in fishing packages.", img: IMG.fg3 },
  reef: { t: "Andros Barrier Reef", how: "Reef fishing or spearfishing with local guides", fish: ["Yellowtail snapper", "Nassau grouper", "Triggerfish", "Barracuda", "Reef sharks", "Porgy"], d: "One of the largest coral reefs in the world: 140 miles long and less than a mile from shore in most places. Spearfishing tours and lessons too.", img: IMG.reef },
  deep: { t: "Beyond the reef", how: "Deep sea fishing", fish: ["Wahoo", "Dolphin fish", "Tuna", "Billfish"], d: "Just outside the reef the water drops to 6,000 feet: perfect for big pelagic game fish.", img: IMG.deep },
} as const
type W = keyof typeof WATERS

function Waters() {
  const [w, setW] = useState<W>("home")
  const d = WATERS[w]
  const hot = (k: W) => ({ onClick: () => setW(k), onMouseEnter: () => setW(k), role: "button" as const, tabIndex: 0, "aria-label": WATERS[k].t, "aria-pressed": w === k, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setW(k) } }, className: "cursor-pointer outline-none" })
  const on = (k: W) => w === k
  return (
    <section id="waters" className="bg-paper-2" aria-labelledby="waters-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <H n="I" k="Where you'll fish" id="waters-title" intro="Five waters from one lodge. Tap one on the chart to see how you fish it and what you are likely to meet.">Flats, bights,<br /><em className="text-tannin">reef and blue.</em></H>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a water">
              {(Object.keys(WATERS) as W[]).map(k => <button key={k} type="button" aria-pressed={on(k)} onClick={() => setW(k)} className={`min-h-11 border px-4 text-[16px] transition hover:-translate-y-px ${on(k) ? "border-ink bg-ink text-paper" : "border-ink/25"}`}>{WATERS[k].t}</button>)}
            </div>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <svg viewBox="0 0 800 460" className="w-full" role="img" aria-label="Illustrated chart of Mangrove Cay between the Middle Bight and South Bight, with the lodge's home flat, the Andros Barrier Reef and deep water beyond. Not to scale, not for navigation.">
                <rect width="800" height="460" fill="#e2e6da" />
                <rect x="620" y="0" width="180" height="460" fill="#1f4d55" />
                <g {...hot("deep")}><rect x="620" y="0" width="180" height="460" fill={on("deep") ? "#2a6a75" : "#1f4d55"} /><text x="710" y="236" textAnchor="middle" fill="#eef0e8" fontSize="18" fontFamily="Alegreya" fontStyle="italic">6,000 ft</text><text x="710" y="258" textAnchor="middle" fill="#eef0e8" fontSize="13" fontFamily="Alegreya Sans" opacity=".8">beyond the reef</text></g>
                <rect x="470" y="0" width="150" height="460" fill="#9fcbc4" />
                <g {...hot("reef")}><path d="M596 0 C584 60 606 120 592 180 S604 300 590 360 S600 430 594 460" stroke={on("reef") ? "#7a5530" : "#1c2a24"} strokeWidth={on("reef") ? 8 : 5} strokeDasharray="2 9" strokeLinecap="round" fill="none" /><rect x="570" y="0" width="50" height="460" fill="transparent" /><text x="578" y="40" fill="#1c2a24" fontSize="13" fontFamily="Alegreya Sans" transform="rotate(90 578 40)">Andros Barrier Reef</text></g>
                <g {...hot("middle")}><path d="M0 0 H470 V70 C380 92 260 66 150 84 C90 94 40 80 0 92 Z" fill={on("middle") ? "#5fa39a" : "#b9d8d1"} /><text x="190" y="44" fill="#1c2a24" fontSize="22" fontFamily="Alegreya" fontStyle="italic">Middle Bight</text></g>
                <g {...hot("south")}><path d="M0 460 H470 V392 C370 372 250 400 150 380 C90 370 40 384 0 372 Z" fill={on("south") ? "#5fa39a" : "#b9d8d1"} /><text x="190" y="432" fill="#1c2a24" fontSize="22" fontFamily="Alegreya" fontStyle="italic">South Bight</text></g>
                <path d="M0 110 C120 96 240 120 360 104 C410 98 450 110 470 120 L470 350 C430 362 380 354 330 366 C220 386 110 356 0 360 Z" fill="#c9cfa8" />
                <text x="160" y="240" fill="#1c2a24" fontSize="30" fontFamily="Alegreya" fontWeight="500">Mangrove Cay</text>
                <g {...hot("home")}><ellipse cx="510" cy="260" rx="34" ry="60" fill={on("home") ? "#5fa39a" : "#c3e2dc"} stroke="#1c2a24" strokeDasharray="3 4" /><text x="510" y="345" textAnchor="middle" fill="#1c2a24" fontSize="13" fontFamily="Alegreya Sans">home flat</text></g>
                <g><rect x="452" y="246" width="20" height="16" fill="#7a5530" /><path d="M448 248 L462 236 L476 248" fill="#7a5530" /><text x="440" y="226" textAnchor="end" fill="#1c2a24" fontSize="15" fontFamily="Alegreya" fontStyle="italic">the lodge</text></g>
                <text x="16" y="448" fill="#56635b" fontSize="11" fontFamily="Alegreya Sans">Illustration, not to scale. Not for navigation.</text>
              </svg>
            </Reveal>
            <AnimatePresence mode="wait">
              <motion.div key={w} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease }} className="mt-6 grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="font-display text-3xl font-medium">{d.t}</p>
                  <p className="mt-1 italic text-tannin">{d.how}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">{d.fish.map(f => <li key={f} className="border border-ink/20 px-2.5 py-0.5 text-[15px]">{f}</li>)}</ul>
                </div>
                <p className="text-[18px] leading-relaxed text-muted">{d.d}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="story-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Pic src={IMG.fg4} alt="A bonefish caught on the flats near Swain's Cay Lodge" w={1024} h={700} className="aspect-[4/3] md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9 md:self-center">
          <H n="II" k="A day here" id="story-title" intro="Breakfast before the tide. A transfer to the dock and a day on the flats with your guide. Back to the beach, a drink at the Reefside, Bahamian cooking for dinner and fishing stories with the other guests.">Out with the tide,<br /><em className="text-tannin">back for dinner.</em></H>
          <a href="fishing.html" className="ulink mt-8 inline-block text-tannin">The fishing, packages and what's included</a>
        </div>
      </div>
    </section>
  )
}

function Count({ label, value, set, min = 0 }: { label: string; value: number; set: (n: number) => void; min?: number }) {
  return (
    <div>
      <p className="text-[15px] text-muted">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        <button type="button" className="step" aria-label={`Fewer ${label}`} onClick={() => set(Math.max(min, value - 1))}><Minus className="size-4" /></button>
        <span className="w-10 text-center font-display text-3xl tabular-nums" aria-live="polite">{value}</span>
        <button type="button" className="step" aria-label={`More ${label}`} onClick={() => set(value + 1)}><Plus className="size-4" /></button>
      </div>
    </div>
  )
}

function Plan() {
  const [anglers, setAnglers] = useState(2)
  const [others, setOthers] = useState(0)
  const [nights, setNights] = useState(5)
  const [days, setDays] = useState(4)
  const [mix, setMix] = useState<string[]>(["Guided bonefishing"])
  const [v, setV] = useState<Record<string, string>>({})
  const boats = Math.ceil(anglers / 2)
  const guideTip = 125 * days * boats
  const staffTip = 35 * nights * (anglers + others)
  const MIX = ["Guided bonefishing", "Home flat, self-guided", "Reef fishing", "Deep sea fishing", "Spearfishing"]
  const body = [`Anglers: ${anglers}`, `Non-anglers: ${others}`, `Nights: ${nights}`, `Guided days: ${days} (${boats} boat${boats > 1 ? "s" : ""} a day)`, `Fishing: ${mix.join(", ") || "-"}`, `Arrival: ${v.arrive || "-"}`, `Name: ${v.name || "-"}`, v.msg ? `Note: ${v.msg}` : ""].filter(Boolean).join("\n")
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Fishing week enquiry: ${anglers} angler${anglers > 1 ? "s" : ""}, ${nights} nights`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="plan" className="bg-bight text-paper" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <H dark n="III" k="Plan my fishing week" id="plan-title" intro="Set your party and your days. We count the boats (up to two anglers each), show the lodge's recommended gratuities, and write the email to the lodge for you.">Your week,<br /><em className="text-flat">worked out.</em></H>
          <a href={TEL} className="cta mt-8 border border-paper/35 hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </div>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <div className="grid gap-8 rounded-sm bg-paper p-6 text-ink sm:grid-cols-2 md:p-8">
            <Count label="Anglers" value={anglers} set={setAnglers} min={1} />
            <Count label="Non-anglers" value={others} set={setOthers} />
            <Count label="Nights" value={nights} set={n => { setNights(Math.max(1, n)); if (days > n) setDays(n) }} min={1} />
            <Count label="Guided days" value={days} set={n => setDays(Math.min(n, nights))} />
            <div className="sm:col-span-2">
              <p className="text-[15px] text-muted">What you'd like to fish</p>
              <div className="mt-2 flex flex-wrap gap-2">{MIX.map(m => { const o = mix.includes(m); return <button key={m} type="button" aria-pressed={o} onClick={() => setMix(s => o ? s.filter(x => x !== m) : [...s, m])} className={`min-h-11 border px-3.5 text-[16px] transition hover:-translate-y-px ${o ? "border-tannin bg-tannin text-white" : "border-ink/25"}`}>{m}</button> })}</div>
            </div>
            <label className="field"><span className="text-[15px] text-muted">Arrival</span><input type="date" value={v.arrive ?? ""} onChange={e => setV(s => ({ ...s, arrive: e.target.value }))} /></label>
            <label className="field"><span className="text-[15px] text-muted">Your name</span><input autoComplete="name" value={v.name ?? ""} onChange={e => setV(s => ({ ...s, name: e.target.value }))} /></label>
            <label className="field sm:col-span-2"><span className="text-[15px] text-muted">Anything else (experience, gear, dietary needs)</span><textarea value={v.msg ?? ""} onChange={e => setV(s => ({ ...s, msg: e.target.value }))} /></label>
            <dl className="grid grid-cols-3 border-y border-line sm:col-span-2">
              <div className="py-4 pr-3"><dt className="text-[14px] text-muted">Boats a day</dt><dd className="font-display text-3xl">{boats}</dd></div>
              <div className="border-l border-line py-4 px-3"><dt className="text-[14px] text-muted">Guide gratuities</dt><dd className="font-display text-3xl">${guideTip.toLocaleString()}</dd></div>
              <div className="border-l border-line py-4 pl-3"><dt className="text-[14px] text-muted">Lodge staff gratuities</dt><dd className="font-display text-3xl">${staffTip.toLocaleString()}</dd></div>
            </dl>
            <p className="-mt-4 text-[14px] text-muted sm:col-span-2">Gratuities from the lodge's guidance: $125 per day per boat per guide, $35 per night per guest for lodge staff. Package prices come from the lodge.</p>
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <a href={href} className="cta cta-fill"><Mail className="size-4" aria-hidden /> Send my fishing week to the lodge</a>
              <a href={BOOK} className="cta cta-line">Book a room online</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Do I need a guide to go bonefishing?", "Not necessarily. The lodge works with handpicked local guides for the South and Middle Bight, and there is a wadeable bonefish flat right off the beach if you want to fish on your own."],
  ["What does a fishing package include?", "A professional guide and boat for up to two guests per boat, accommodation, all meals, water, airport and dock transfers, Wi-Fi, lodge amenities and levies."],
  ["What is not included?", "Airfare to and from Nassau, alcohol and sodas, gratuities, fly fishing gear and flies, 10% VAT on extras, and fishing licences (license.gooutdoorsbahamas.com)."],
  ["How do deposits work?", "A 50% deposit confirms a reservation and is due within 21 days of booking. The balance is due 90 days before arrival."],
  ["What else is there to do?", "Complimentary bicycles, kayaks and snorkelling gear, reef and deep sea fishing, spearfishing lessons, and the beach."],
]
function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <div className="md:col-span-4"><H n="IV" k="Questions anglers ask" id="faq-title">Before you<br /><em className="text-tannin">pack the rods.</em></H></div>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink/20">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-ink/20">
              <AccordionTrigger className="py-6 text-left font-display text-xl font-medium hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Find() {
  return (
    <section className="border-t border-line bg-paper-2" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-5"><H n="V" k="Find us" id="find-title" intro="Mangrove Cay Settlement, Mangrove Cay, Andros. Airport transfers are included in fishing packages.">Mangrove Cay,<br /><em className="text-tannin">Andros.</em></H></div>
        <div className="overflow-hidden border border-line md:col-span-7"><iframe title="Map of Swain's Cay Lodge, Mangrove Cay, Andros" loading="lazy" className="h-[420px] w-full" src="https://www.google.com/maps?q=Swain's+Cay+Lodge,+Mangrove+Cay,+Andros,+Bahamas&output=embed" /></div>
      </div>
    </section>
  )
}

mount(<Page current="Where you'll fish"><Hero /><Band /><Waters /><Story /><Plan /><Questions /><Find /></Page>)
