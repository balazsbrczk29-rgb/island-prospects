import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, BOOK, WP } from "./site"

const IN_ROOM = ["Stove-top kitchenette", "Toaster and coffee maker", "Dining table and chairs", "Television and internet access", "Air conditioning and ceiling fan", "Alarm clock and radio", "Iron and ironing board", "Laundry and ice machine access"]
const AT_INN = ["Convenience store on site", "Car rental", "Airport pickup", "Across the road from the beach"]

type Res = "us" | "fl" | "eu"
type Offer = { title: string; detail: string; min: number; max?: number; who?: Res[]; air?: boolean; window: string }
const OFFERS: Offer[] = [
  { title: "$150 fee credit", detail: "Pre-book a 2-night stay.", min: 2, max: 2, window: "Book Jul 1, 2026 to Jun 30, 2027 · travel Jul 5, 2026 to Oct 31, 2027" },
  { title: "$300 fee credit", detail: "Book 4 nights or longer.", min: 4, window: "Book Jul 1, 2026 to Jun 30, 2027 · travel Jul 5, 2026 to Oct 31, 2027" },
  { title: "Fly or ferry free from Nassau", detail: "One free ticket for pre-booked 2-night stays, two for 4 nights or longer (ferry offer on Bahamas Ferries' North Eleuthera, Harbour Island and Andros routes only).", min: 2, window: "Book Jul 1, 2026 to Jun 30, 2027 · travel Jul 5, 2026 to Oct 31, 2027" },
  { title: "Free round-trip tickets from Nassau", detail: "Air-inclusive: one free ticket for 4 to 6 nights, two for 7 nights.", min: 4, air: true, window: "Book Jul 1, 2026 to Jun 30, 2027 · travel Jul 2, 2026 to Oct 31, 2027" },
  { title: "$250 air or ferry credit", detail: "Florida residents, air-inclusive, 3 nights or longer.", min: 3, who: ["fl"], air: true, window: "Book Aug 24 to Nov 9, 2026 · travel to Nov 16, 2026" },
  { title: "$500 air credit", detail: "Air-inclusive package of 7 nights or longer, double occupancy, residents of the US, Canada or Europe.", min: 7, who: ["us", "fl", "eu"], air: true, window: "Book Oct 12 to Nov 9, 2026 · travel Oct 13, 2026 to Jan 31, 2027" },
]

function Specials() {
  const [nights, setNights] = useState(4)
  const [res, setRes] = useState<Res>("us")
  const match = useMemo(() => OFFERS.filter(o => nights >= o.min && (o.max === undefined || nights <= o.max) && (!o.who || o.who.includes(res))), [nights, res])
  return (
    <section id="specials" className="bg-casuarina-deep text-paper" aria-labelledby="sp-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-5">
          <Label n="02" light>Specials finder</Label>
          <h2 id="sp-title" className="mt-5 font-display text-[clamp(2.3rem,4.2vw,4rem)] leading-[1] font-semibold tracking-[-0.02em]">Which special fits your trip?</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">Set your nights and where you live. We filter the Bahama Out Islands offers the inn publishes. Blackout dates apply: Nov 26 to 28, 2026, Dec 19, 2026 to Jan 1, 2027, and others.</p>
          <div className="mt-10">
            <p className="flex items-baseline justify-between"><span className="text-[11px] tracking-[0.2em] text-flats uppercase">Nights</span><span className="font-display text-4xl tabular-nums">{nights}</span></p>
            <input type="range" min={1} max={14} value={nights} onChange={e => setNights(Number(e.target.value))} aria-label="Number of nights" className="mt-3 w-full accent-[#8ccfc4]" />
          </div>
          <div className="mt-8 flex flex-wrap gap-1 rounded-full bg-paper/10 p-1" role="group" aria-label="Where you live">
            {([["us", "US or Canada"], ["fl", "Florida"], ["eu", "Europe"]] as [Res, string][]).map(([k, l]) => (
              <button key={k} type="button" aria-pressed={res === k} onClick={() => setRes(k)} className={`min-h-11 flex-1 rounded-full px-4 text-[14px] transition hover:-translate-y-px ${res === k ? "bg-paper text-ink" : ""}`}>{l}</button>
            ))}
          </div>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7" aria-live="polite">
          <p className="text-[13px] text-paper/60">{match.length} matching {match.length === 1 ? "offer" : "offers"}</p>
          <AnimatePresence mode="popLayout">
            {match.map(o => (
              <motion.div key={o.title} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease }} className="mt-4 rounded-[18px] border border-paper/15 bg-paper/5 p-6">
                <p className="font-display text-2xl font-semibold">{o.title}{o.air && <span className="ml-3 align-middle text-[11px] font-normal tracking-[0.18em] text-flats uppercase">Air-inclusive</span>}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/75">{o.detail}</p>
                <p className="mt-3 text-[12px] tracking-[0.06em] text-paper/50">{o.window}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {!match.length && <p className="mt-4 text-paper/70">No published special for a one-night stay. Two nights unlocks the first one.</p>}
          <a href={BOOK} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
          <p className="mt-3 text-[12px] text-paper/50">Offers can change or end at any time; they cannot be combined with other Out Islands credits and are not valid for groups.</p>
        </div>
      </div>
    </section>
  )
}

function Stay() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-20 md:grid-cols-12 md:px-10 md:pt-24" aria-labelledby="st-title">
        <div className="md:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>The studios</Label></motion.div>
          <motion.h1 id="st-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 font-display text-[clamp(2.8rem,6.6vw,6.6rem)] leading-[0.95] font-semibold tracking-[-0.03em]">Studios with a kitchen, across from the sea.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mt-8 max-w-xl text-[18px] leading-relaxed text-muted">Spacious island-style studios. Cook breakfast in your kitchenette, shop the store downstairs, and walk across the road to the beach.</motion.p>
        </div>
        <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.3, duration: 1.3, ease: [0.77, 0, 0.175, 1] }} className="md:col-span-5">
          <Photo priority src={WP + "2019/08/accomodations-img.jpg"} alt="A studio at Orange Creek Inn" className="aspect-[4/5] rounded-[18px]" />
        </motion.div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-32" aria-labelledby="am-title">
        <Reveal className="md:col-span-4"><Label n="01">In every studio</Label><h2 id="am-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] font-semibold">Set up for real days.</h2></Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <ul className="grid sm:grid-cols-2 sm:gap-x-10">{IN_ROOM.map((x, i) => <li key={x} className="flex gap-4 border-b border-line py-4 text-[17px]"><span className="w-6 text-[12px] text-casuarina">{String(i + 1).padStart(2, "0")}</span>{x}</li>)}</ul>
          <p className="mt-10 text-[11px] tracking-[0.2em] text-muted uppercase">At the inn</p>
          <ul className="mt-3 flex flex-wrap gap-2">{AT_INN.map(x => <li key={x} className="rounded-full bg-flats/35 px-4 py-2 text-[15px]">{x}</li>)}</ul>
        </Reveal>
      </section>
      <Specials />
      <section id="pay" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28" aria-labelledby="pay-title">
        <Reveal className="md:col-span-5"><Label n="03">Payment</Label><h2 id="pay-title" className="mt-5 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.04] font-semibold">Visa, Mastercard, or cash when you arrive.</h2></Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7"><p className="text-[17px] leading-relaxed text-muted">The inn recommends booking early in promotional periods and the popular December to April months. Booking directly gives you the specials and air credits above.</p></Reveal>
      </section>
    </>
  )
}

mount(<Page current="Studios & specials"><Stay /></Page>)
