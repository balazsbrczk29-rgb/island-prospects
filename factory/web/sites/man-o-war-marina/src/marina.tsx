import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, RATES, WIX, HOURS } from "./site"

const BANNER = WIX + "0b3c23_8644da714b4c437e8e7cbf5070c31817~mv2.jpg/v1/fill/w_1905,h_257,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b3c23_8644da714b4c437e8e7cbf5070c31817~mv2.jpg"
const SIDE = WIX + "0b3c23_5ee2be2f41934c34acf94d9f6436b3c3~mv2.png/v1/fill/w_638,h_478,al_c,lg_1,q_85,enc_avif,quality_auto/0b3c23_5ee2be2f41934c34acf94d9f6436b3c3~mv2.png"

const SPECS: [string, string][] = [
  ["Slips", "23"],
  ["Maximum length overall", "120 ft"],
  ["Maximum beam", "20 ft"],
  ["Maximum draft", "7 ft, even at low tide"],
  ["Shore power", "30 and 50 amp at each slip"],
  ["Water", "At each slip"],
  ["Docking", "Assisted docking and launching, VHF 16"],
  ["Fuel", "Gasoline and diesel, dockside and roadside"],
  ["Rates", "Dockage rate sheet (PDF)"],
]

const GUEST = ["Clean restrooms", "Spacious showers", "Laundry facilities", "Grill area", "Pool", "Power at the slip"]
const PUBLIC = ["Dock N’ Dine restaurant", "Office and gift shop", "Dockside and roadside fuel", "Water tank fill, on request"]

function Marina() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-12 md:px-10 md:pt-24" aria-labelledby="m-title">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>The marina · Man-O-War Cay</Label></motion.div>
        <motion.h1 id="m-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,7vw,7rem)] leading-[0.94] tracking-[-0.02em]">The dock sheet, <span className="italic text-harbour-deep">on one page.</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Everything a captain asks before calling Man-O-War Marina: what fits, what is at the slip, when the fuel dock is open, and what is open to boaters who are not staying.</motion.p>
      </section>
      <motion.div initial={{ clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ delay: 0.3, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="mx-auto max-w-[1440px] md:px-10">
        <Photo priority src={BANNER} alt="The docks of Man-O-War Marina along the harbour" w={1905} h={257} className="aspect-[3/1] md:aspect-[1905/257]" />
      </motion.div>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="spec-title">
        <Reveal className="md:col-span-4">
          <Label n="01">Specifications</Label>
          <h2 id="spec-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">What fits, and what is at the slip.</h2>
          <a href="index.html#fit" className="group mt-8 inline-flex items-center gap-2 text-[16px] underline decoration-ink/30 underline-offset-4 hover:decoration-teak">Check your boat against the limits <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <dl>
            {SPECS.map(([k, v]) => (
              <div key={k} className="group grid grid-cols-1 gap-1 border-b border-line py-5 first:border-t sm:grid-cols-[1fr_1.3fr] sm:gap-6">
                <dt className="text-[11px] tracking-[0.2em] text-muted uppercase sm:pt-2">{k}</dt>
                <dd className="font-display text-[1.6rem] leading-tight tabular-nums transition group-hover:translate-x-1">{k === "Rates" ? <a href={RATES} className="inline-flex items-center gap-1 underline decoration-ink/25 underline-offset-4 hover:decoration-teak">{v} <ArrowUpRight className="size-4" aria-hidden /></a> : v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] text-muted">From the marina’s published services. Approach and depth information must come from current charts and the marina office.</p>
        </Reveal>
      </section>

      <section className="bg-ink text-paper" aria-labelledby="fuel-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <Reveal className="md:col-span-5">
            <Label n="02" light>Fuel and hours</Label>
            <h2 id="fuel-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">The only fuel on the island.</h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">Gasoline and diesel for boats at the dock and for drivers at the roadside pump. Fuel prices move with the market; ask the office for today’s price.</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <ul>
              {HOURS.map(h => (
                <li key={h.k} className="flex flex-col justify-between gap-1 border-b border-paper/15 py-5 first:border-t sm:flex-row sm:items-baseline">
                  <span className="text-[17px]">{h.k}</span>
                  <span className="font-display text-xl text-sand tabular-nums">Mon-Sat {h.spans.map(([a, b]) => `${a > 12 ? a - 12 : a}${a >= 12 ? "pm" : "am"}-${b > 12 ? b - 12 : b}${b >= 12 ? "pm" : "am"}`).join(", ")}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="fac-title">
        <Reveal className="md:col-span-5">
          <Label n="03">Facilities</Label>
          <h2 id="fac-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">Who can use what.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Guest facilities are for boats staying at the marina. Boats on moorings, at anchor outside the harbour or passing through are welcome at the restaurant, the shop and the fuel dock.</p>
          <Photo src={SIDE} alt="Man-O-War Marina facilities" w={638} h={478} className="mt-10 aspect-[4/3] rounded-[6px]" />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
          {[["Marina guests only", GUEST], ["Open to everyone", PUBLIC]].map(([t, list]) => (
            <Reveal key={t as string}>
              <p className="text-[11px] tracking-[0.2em] text-teak uppercase">{t as string}</p>
              <ul className="mt-4">
                {(list as string[]).map(x => <li key={x} className="border-b border-line py-4 font-display text-xl first:border-t">{x}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2" aria-labelledby="cta-title">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-12 md:items-end md:px-10 md:py-28">
          <Reveal className="md:col-span-7">
            <Label>Planning the crossing?</Label>
            <h2 id="cta-title" className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1]">Send the boat’s details, and your dates.</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            <a href="index.html#request" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px">Request a slip <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 transition hover:-translate-y-px"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </Reveal>
        </div>
      </section>
    </>
  )
}

mount(<Page current="The marina"><Marina /></Page>)
