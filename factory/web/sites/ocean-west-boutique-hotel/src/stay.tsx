import { useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, BOOK, SITE } from "./site"

const FEATURES = ["Refrigerator and microwave in every room", "Outdoor pool", "Massage suite, by appointment", "Rooftop gym with an ocean view", "Free Wi-Fi", "Conference space", "Cable television", "Hair dryer", "Free parking", "Pool table", "Indoor and outdoor bars", "Complimentary toiletries"]
const POLICIES: [string, string][] = [
  ["Check-in", "3:00pm"], ["Check-out", "11:00am"], ["Late check-out", "$30, until 2:00pm"], ["Front desk", "24 hours"], ["Children", "Under 12 stay free"], ["Pets", "Not allowed"], ["Smoking", "All rooms non-smoking"], ["Housekeeping", "Daily maid service"], ["Extra beds", "Rollaway $100 a night"], ["Booking online", "Bring the card used and government ID to check-in"],
]
const ROUTE = [
  "Leave Lynden Pindling International Airport on the departures road toward Windsor Field Road.",
  "Follow Windsor Field Road through the two roundabouts.",
  "Turn left onto Blake Road.",
  "Turn right onto West Bay Street.",
  "Ocean West Boutique Hotel is on your right.",
]

function Stay() {
  const [step, setStep] = useState(0)
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:grid-cols-12 md:px-10 md:pt-24" aria-labelledby="s-title">
        <div className="md:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Your stay</Label></motion.div>
          <motion.h1 id="s-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 font-display text-[clamp(2.6rem,6.2vw,6.2rem)] leading-[1.02] tracking-[-0.015em]">Everything to know before you land.</motion.h1>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.3, ease: [0.77, 0, 0.175, 1] }} className="md:col-span-5">
          <Photo priority src={SITE + "images/abut-pic.jpg"} alt="Ocean West Boutique Hotel" className="aspect-[4/3]" />
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28" aria-labelledby="f-title">
        <Reveal className="md:col-span-4"><Label n="01">Amenities</Label><h2 id="f-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04]">At the hotel and in your room.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Airport and island transport can be arranged at a surcharge. Breakfast is a la carte, and Sapodilla is on the eastern side of the hotel.</p></Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <ul className="grid sm:grid-cols-2 sm:gap-x-10">{FEATURES.map(x => <li key={x} className="border-b border-line py-4 text-[17px]">{x}</li>)}</ul>
        </Reveal>
      </section>

      <section id="policies" className="bg-paper-2" aria-labelledby="p-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="md:col-span-4"><Label n="02">Policies</Label><h2 id="p-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04]">The fine print, plainly.</h2>
            <a href={`${SITE}policies.html`} className="group mt-8 inline-flex items-center gap-2 underline decoration-ink/30 underline-offset-4 hover:decoration-lake">Full terms and conditions <ArrowUpRight className="size-4" aria-hidden /></a></Reveal>
          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <dl>{POLICIES.map(([k, v]) => <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 border-b border-line py-4 first:border-t"><dt className="text-[11px] tracking-[0.2em] text-muted uppercase pt-1">{k}</dt><dd className="font-display text-xl">{v}</dd></div>)}</dl>
          </Reveal>
        </div>
      </section>

      <section id="getting-here" className="mx-auto grid max-w-[1440px] scroll-mt-24 gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="g-title">
        <Reveal className="md:col-span-5">
          <Label n="03">Getting here</Label>
          <h2 id="g-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04]">Five minutes from the runway.</h2>
          <ol className="mt-8">
            {ROUTE.map((s, i) => (
              <li key={s}>
                <button type="button" onClick={() => setStep(i)} aria-pressed={step === i} className={`grid w-full grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-4 text-left transition hover:bg-paper-2/60 ${step === i ? "text-ink" : "text-muted"}`}>
                  <span className={`font-display text-2xl ${step === i ? "text-lake" : ""}`}>{i + 1}</span><span className="text-[16px] leading-relaxed">{s}</span>
                </button>
              </li>
            ))}
          </ol>
          <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 bg-ink px-6 text-paper transition hover:-translate-y-px"><Phone className="size-4" aria-hidden /> Arrange a transfer, {PHONE}</a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <svg viewBox="0 0 600 420" className="w-full border border-line bg-paper-2" role="img" aria-label="Route diagram from the airport to Ocean West via Windsor Field Road, Blake Road and West Bay Street. Not to scale.">
            <path d="M0 40 H600" stroke="#2b5d78" strokeWidth="60" opacity=".85" />
            <text x="20" y="46" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" letterSpacing="2" fill="#f5f1ea">ATLANTIC OCEAN</text>
            {[
              "M 120 360 L 160 300", "M 160 300 L 300 250", "M 300 250 L 330 140", "M 330 140 L 470 110",
            ].map((d, i) => <motion.path key={d} d={d} stroke={i < step ? "#2c4d41" : "#1d2126"} strokeOpacity={i < step ? 1 : 0.3} strokeWidth={i < step ? 4 : 2} fill="none" strokeLinecap="round" initial={false} animate={{ pathLength: i < step ? 1 : 1 }} />)}
            <rect x="60" y="355" width="120" height="40" fill="#f5f1ea" stroke="#1d2126" strokeOpacity=".5" />
            <text x="120" y="380" textAnchor="middle" fontFamily="Hanken Grotesk, sans-serif" fontSize="12" fill="#1d2126">Airport (LPIA)</text>
            <text x="200" y="300" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fill="#5b6068">Windsor Field Rd</text>
            <text x="338" y="200" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fill="#5b6068">Blake Rd</text>
            <text x="360" y="104" fontFamily="Hanken Grotesk, sans-serif" fontSize="11" fill="#5b6068">West Bay St</text>
            <circle cx="470" cy="110" r={step === 4 ? 12 : 8} fill="#45705f" stroke="#f5f1ea" strokeWidth="3" />
            <text x="490" y="140" fontFamily="Prata, serif" fontSize="18" fill="#1d2126">Ocean West</text>
            <circle cx={[120, 160, 300, 330, 470][step]} cy={[360, 300, 250, 140, 110][step]} r="6" fill="#ecc9b4" stroke="#1d2126" />
            <text x="20" y="410" fontFamily="Hanken Grotesk, sans-serif" fontSize="10" letterSpacing="2" fill="#5b6068">DIAGRAM, NOT TO SCALE</text>
          </svg>
          <iframe title="Map of Ocean West Boutique Hotel, West Bay Street, Nassau" loading="lazy" className="mt-6 aspect-[16/9] w-full border border-line" src="https://www.google.com/maps?q=25.069827,-77.443689&z=15&output=embed" />
          <a href={BOOK} className="group mt-6 inline-flex items-center gap-2 underline decoration-ink/30 underline-offset-4 hover:decoration-lake">Check dates online <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
      </section>
    </>
  )
}

mount(<Page current="Your stay"><Stay /></Page>)
