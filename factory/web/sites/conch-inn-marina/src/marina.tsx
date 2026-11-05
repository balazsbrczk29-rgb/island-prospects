import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, MaskImg, ease, reveal, IMG, PHONE, TEL, EMAIL } from "./site"
import { AMENITIES, DockCalculator, EnquirySection, Faq } from "./parts"

const RULES: [string, string][] = [
  ["Slip assignment", "The marina cannot guarantee a particular slip, even with a confirmed reservation, and may move a boat to fit another vessel. Staff help with any move."],
  ["How length is measured", "Rates are based on length from bow pulpit to swim platform. Rafted boats do not receive a discounted rate."],
  ["Check-in and check-out", "Both at 12:00pm. Early arrival or late departure depends on the season and needs the Dock Master's approval."],
  ["Cancellations", "Cancelling within 48 hours of your reservation is charged the first night."],
  ["On the docks", "No fishing anywhere in the marina. The basin is a no-wake zone. Music low or off after 9pm. Dogs on a leash. Drones need Bahamas Civil Aviation registration."],
  ["Insurance and weather", "Hull and liability insurance must be in effect while you are docked. Owners arrange their own safe shelter for tropical storms and hurricanes."],
  ["Repairs and discharge", "No work that could release fuel, oil, grease or bottom paint, and no overboard discharge of heads or holding tanks."],
]

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 md:pt-14 md:pb-24" aria-labelledby="m-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-harbour">The marina · Marsh Harbour, Abaco</motion.p>
          <h1 id="m-title" className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.03em]">
            {["Slips, moorings", "and the rules"].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic text-harbour" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> at the Conch Inn Marina, Marsh Harbour</span>
          </h1>
        </div>
        <motion.div className="lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>
          <p className="text-[17px] leading-relaxed text-muted">The Conch Inn Marina is a family-owned, full-service marina of 73 slips and a field of mooring balls, steps from the inn on Bay Street. Call or email the office for quotes and reservations.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#enquire" className="btn btn-primary">Request a slip</a>
            <a href={TEL} className="btn btn-quiet"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </div>
        </motion.div>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-12">
        <MaskImg priority src={IMG.dockB} alt="The Conch Inn Marina docks" w={960} h={640} className="aspect-[3/2] rounded-[6px] md:col-span-8" />
        <MaskImg src={IMG.dockC} alt="Slips at the Conch Inn Marina" w={960} h={640} className="aspect-[3/2] rounded-[6px] md:col-span-4 md:aspect-auto" />
      </div>
    </section>
  )
}

function Specs() {
  const rows = [
    ["One night", "$3.75 per foot"],
    ["Two nights or more", "$3.25 per foot, per night"],
    ["30 nights or more", "$2.25 per foot, per night, the monthly rate"],
    ["Short stop, up to 3 hours", "$1.00 per foot, for pick-ups, drop-offs and provisioning"],
    ["Mooring ball", "$30 a night or $500 a month, plus VAT; first come, first served"],
  ]
  return (
    <section className="bg-ink text-paper" aria-labelledby="specs-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="01" className="text-conch">Rates</Label>
          <h2 id="specs-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">Published rates, per foot.</h2>
          <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-paper/70">Certain slips have a minimum length. Mooring rates include WiFi, the dinghy dock, showers and laundry access. Prefer not to pay for a short stop? The free Union Jack public dock is a third of a mile west.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <table className="w-full text-left">
            <caption className="sr-only">Conch Inn Marina dockage and mooring rates</caption>
            <tbody className="divide-y divide-paper/15 border-y border-paper/15">
              {rows.map(([k, v]) => (
                <tr key={k} className="transition hover:bg-white/5">
                  <th scope="row" className="py-5 pr-6 align-top font-normal text-paper/70">{k}</th>
                  <td className="py-5 font-display text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

function Amenities() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="am-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="02" className="text-harbour">At the slip</Label>
          <h2 id="am-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">Everything a crew asks for on arrival.</h2>
          <MaskImg src={IMG.marina} alt="The Conch Inn Marina basin" w={953} h={680} className="mt-10 hidden aspect-[953/680] rounded-[6px] lg:block" />
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="grid border-t border-line sm:grid-cols-2">
            {AMENITIES.map(([k, v], i) => (
              <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.06, duration: 0.7, ease }} className="border-b border-line py-6 sm:odd:pr-8 sm:even:pl-8 sm:even:border-l">
                <p className="label text-harbour tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-[1.5rem] leading-tight">{k}</p>
                <p className="mt-1 text-[15px] text-muted">{v}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Calc() {
  return (
    <section className="bg-conch" aria-labelledby="calc-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <Label n="03" className="text-ink/70">Estimate</Label>
          <h2 id="calc-title" className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">Your boat, your nights, their rates.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14"><DockCalculator /></Reveal>
      </div>
    </section>
  )
}

function Rules() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="rules-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="04" className="text-harbour">Marina rules</Label>
          <h2 id="rules-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">The short version.</h2>
          <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-muted">By docking or reserving a slip, the boat owner agrees to the marina's full rules and terms, which the office shares on request at {EMAIL}.</p>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6"><Faq items={RULES} /></div>
      </div>
    </section>
  )
}

function Marina() {
  return (
    <Page current="Marina">
      <Hero />
      <Specs />
      <Amenities />
      <Calc />
      <Rules />
      <EnquirySection />
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-10">
          <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">Staying ashore after the crossing?</p>
          <a href="rooms.html" className="btn btn-quiet">See the rooms and suites <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </section>
    </Page>
  )
}

mount(<Marina />)
