import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, MessageCircle, Mail, Clock, MapPin } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Chart, PHONE_FOCUS, nm, PLACES, DayPicker, PlacePicker, Extras, Receipt, Actions, BoatChip, Money, usePlan, TIERS, FEE_COLOR, type Plan } from "./Planner"
import { mount, useLenis, BOOK, PHOTO, WA_LABEL, EMAIL, SALTED_LIME, wa, ease } from "./site"

const NAV = [["#boat", "The boat"], ["#rates", "Rates and delivery"], ["#day", "A day out"], ["#faq", "Questions"], ["#contact", "Contact"]] as const

function useWide() {
  const [w, setW] = useState(typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches)
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); const f = () => setW(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f) }, [])
  return w
}

function TopLine() {
  return (
    <div className="relative z-20 flex items-center justify-between gap-6 px-4 py-3 md:px-6 lg:absolute lg:inset-x-0 lg:top-0 lg:py-4 lg:pl-[calc(480px+3rem)]">
      <a href="#top" className="font-display text-[1.15rem] leading-none font-semibold tracking-tight lg:hidden">Abaco Boat Rental</a>
      <nav aria-label="Sections" className="hidden items-center gap-1 rounded-full bg-paper/85 p-1 shadow-[0_10px_30px_-18px_rgba(14,40,30,.6)] lg:flex">
        {NAV.map(([h, l]) => <a key={h} href={h} className="rounded-full px-3.5 py-2 text-[14px] font-medium transition hover:bg-ink/[.07]">{l}</a>)}
      </nav>
      <a href={wa("Hi Abaco Boat Rental, I have a question about renting the boat.")} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper/85 px-4 text-[14px] font-semibold shadow-[0_10px_30px_-18px_rgba(14,40,30,.6)] transition hover:bg-paper"><MessageCircle className="size-4 text-pine" aria-hidden /><span className="num">{WA_LABEL}</span></a>
    </div>
  )
}

function Hero({ plan }: { plan: Plan }) {
  const wide = useWide()
  return (
    <section id="top" className="relative bg-ground lg:h-[100svh] lg:min-h-[800px]" aria-labelledby="hero-title">
      <TopLine />
      <div className="lg:absolute lg:inset-0">
        {/* phone: the headline sits above the chart */}
        {!wide && <div className="px-4 pt-1 pb-4">
          <h1 id="hero-title" className="text-[2.15rem] leading-[1.02] font-semibold tracking-[-0.035em]">Tap your cay. The boat comes to you.</h1>
          <a href="#boat" className="mt-3 flex items-center gap-3">
            <img src={PHOTO.boat} alt="The 24 ft Key West center console underway" width={844} height={844} fetchPriority="high" className="size-16 shrink-0 rounded-[12px] bg-slate/40 object-cover" />
            <span className="text-[15px] leading-snug text-muted"><b className="font-semibold text-ink">A 24 ft Key West</b> from Man-O-War Cay, seats 8, from $303 a day.</span>
          </a>
        </div>}
        <div className="relative h-[54svh] min-h-[380px] lg:absolute lg:inset-0 lg:h-auto">
          <Chart plan={plan} inset={wide ? 528 : 0} insetBottom={wide ? 0 : 76} focus={wide ? undefined : PHONE_FOCUS} className="size-full" label="Chart of the Sea of Abaco. Tap a delivery point to price your boat. Illustration, not for navigation." />
          {wide && <BoatChip className="absolute top-24 right-6 w-[250px] xl:w-[270px]" />}
          {/* phone: live total strip on the chart */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-md bg-paper/95 py-2 pr-2 pl-4 shadow-[0_14px_34px_-20px_rgba(14,40,30,.8)] lg:hidden">
            <span className="min-w-0 text-[13px] leading-tight"><span className="block truncate text-muted">{plan.place.short} · {plan.days} {plan.days === 1 ? "day" : "days"}</span><Money value={plan.total} className="font-display text-[1.45rem] leading-none font-semibold" /></span>
            <a href="#plan" className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-ink px-4 text-[14px] font-semibold text-paper">Adjust and book</a>
          </div>
        </div>
      </div>
      {/* the legend panel: the planner */}
      <motion.div id="plan" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
        className="relative z-10 scroll-mt-4 bg-paper px-4 pt-6 pb-8 lg:absolute lg:top-5 lg:bottom-5 lg:left-5 lg:flex lg:w-[480px] lg:flex-col lg:overflow-hidden lg:rounded-lg lg:px-7 lg:pt-6 lg:pb-6 lg:shadow-[0_30px_70px_-40px_rgba(14,40,30,.75)]">
        <a href="#top" className="hidden font-display text-[1.2rem] leading-none font-semibold tracking-tight lg:block">Abaco Boat Rental</a>
        {wide && <h1 id="hero-title" className="hidden lg:mt-5 lg:block lg:text-[2.85rem] lg:leading-[0.98] lg:font-semibold lg:tracking-[-0.04em]">Tap your cay. The boat comes to you.</h1>}
        <p className="hidden text-[15.5px] leading-snug text-muted lg:mt-3 lg:block">One 24 ft Key West, picked up free at Man-O-War Cay or delivered from Treasure Cay to Little Harbour. Pick your cay and your days: the price below is the real one.</p>
        <div className="space-y-5 lg:mt-5 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:space-y-4">
          <div><PlacePicker plan={plan} /><p className="mt-2 text-[13px] text-muted num" aria-live="polite">{plan.place.id === "mow" ? "Our home dock: pickup is free." : `${plan.place.name} is about ${nm(PLACES[0], plan.place).toFixed(0)} nm from our Man-O-War dock.`}</p></div>
          <DayPicker plan={plan} />
          <Extras plan={plan} />
          <div className="lg:mt-auto"><Receipt plan={plan} /></div>
          <Actions plan={plan} />
        </div>
      </motion.div>
    </section>
  )
}

function SectionHead({ id, kicker, title, children }: { id: string; kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[13px] font-semibold text-pine"><span className="h-px w-6 bg-pine" aria-hidden />{kicker}</p>
      <h2 id={id} className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-semibold tracking-[-0.035em]">{title}</h2>
      {children}
    </div>
  )
}

const SPEC: [string, string][] = [
  ["Length", "24 ft"], ["Model", "Key West 239 FS"], ["Seats", "8, comfortably"], ["Power", "Single 250 hp"],
  ["Navigation", "Garmin GPS with current Abaco maps"], ["Shade", "Center console with shade"], ["Cooler", "Under the helm seat: drinks, lunch, or ice and your catch"],
  ["Safety", "All required gear on board"], ["Upkeep", "Newer hulls, serviced regularly"],
]
function Boat() {
  return (
    <section id="boat" className="scroll-mt-6 bg-paper" aria-labelledby="boat-title">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-20">
        <motion.figure initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease }} className="lg:sticky lg:top-8 lg:self-start">
          <img src={PHOTO.boat} alt="The white 24 ft Key West center console underway in the Sea of Abaco, a channel marker behind" width={844} height={844} loading="lazy" className="aspect-square w-full max-w-[560px] rounded-lg bg-slate/30 object-cover" />
          <figcaption className="mt-3 text-[13px] text-muted">Every rental is this boat. Photo: Abaco Boat Rental.</figcaption>
        </motion.figure>
        <div>
          <SectionHead id="boat-title" kicker="The boat" title="One boat, done right. Every rental is the same Key West.">
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">The team searched a long time for the right rental boat and landed on the Key West 239 FS. No options to compare: every boat is identical and well kept.</p>
          </SectionHead>
          <dl className="mt-10 border-t border-ink">
            {SPEC.map(([k, v], i) => (
              <motion.div key={k} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.035, ease }} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5 md:grid-cols-[10rem_1fr]">
                <dt className="text-[14px] font-semibold text-muted">{k}</dt><dd className="text-[16.5px]">{v}</dd>
              </motion.div>
            ))}
          </dl>
          <blockquote className="mt-10 max-w-xl">
            <p className="font-display text-[1.45rem] leading-snug font-medium tracking-[-0.015em]">“We had 6 adults and 2 kids and it worked out perfectly for us with comfortable seating for everyone.”</p>
            <footer className="mt-3 text-[13px] text-muted">A guest review, as published on abacoboatrental.com</footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

const EXAMPLES = [1, 2, 5, 7, 10]
const DELIVERY = [
  { fee: 0, title: "Free", places: "Pickup at Man-O-War Cay, our home dock" },
  { fee: 0, title: "Free", places: "Elbow Cay and Marsh Harbour, if you run our team member back to Man-O-War" },
  { fee: 100, title: "$100 each way", places: "Elbow Cay, Hope Town, Guana Cay, Scotland Cay, Marsh Harbour" },
  { fee: 300, title: "$300 each way", places: "Treasure Cay and Little Harbour, for the distance and time" },
]
function Rates({ plan }: { plan: Plan }) {
  return (
    <section id="rates" className="scroll-mt-6 bg-ground" aria-labelledby="rates-title">
      <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <SectionHead id="rates-title" kicker="Rates and delivery" title="The longer you float, the more you save." />
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold">Day rate, VAT exclusive</p>
            <ul className="mt-4 space-y-2.5">
              {TIERS.map(t => {
                const on = t.rate === plan.rate
                return (
                  <li key={t.label}>
                    <button type="button" onClick={() => plan.setDays(t.min)} aria-pressed={on} className="group grid w-full grid-cols-[6.5rem_1fr_auto] items-center gap-4 text-left">
                      <span className="text-[15px] font-medium">{t.label}</span>
                      <span className="relative h-11 overflow-hidden rounded-sm bg-ink/[.06]"><motion.span className={`absolute inset-y-0 left-0 rounded-sm ${on ? "bg-pine" : "bg-ink/25 group-hover:bg-ink/40"}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: t.rate / 475 }} viewport={{ once: true }} transition={{ duration: 1, ease }} style={{ width: "100%", transformOrigin: "left" }} /></span>
                      <span className="w-24 text-right font-display text-[1.7rem] leading-none font-semibold num">${t.rate}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-[15px] num">
                <caption className="pb-3 text-left text-sm font-semibold">What the boat alone costs</caption>
                <thead><tr className="border-b border-ink text-[13px] text-muted">{EXAMPLES.map(d => <th key={d} scope="col" className="py-2 pr-3 font-medium">{d} {d === 1 ? "day" : "days"}</th>)}</tr></thead>
                <tbody><tr>{EXAMPLES.map(d => <td key={d} className="py-3 pr-3 font-display text-[1.25rem] font-semibold">${(d * (d >= 7 ? 303 : d >= 3 ? 330 : d === 2 ? 450 : 475)).toLocaleString("en-US")}</td>)}</tr></tbody>
              </table>
              <p className="mt-2 text-[13px] text-muted">Rentals run on a 24-hour period: pick a return time earlier than your pickup time so you aren't charged an extra day.</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Getting the boat to you</p>
            <ul className="mt-4 border-t border-ink">
              {DELIVERY.map(d => (
                <li key={d.places} className="grid grid-cols-[1.1rem_8.5rem_1fr] items-baseline gap-3 border-b border-line py-4">
                  <span className="size-3 translate-y-0.5 rounded-full" style={{ background: FEE_COLOR[d.fee] }} aria-hidden />
                  <span className="font-display text-[1.15rem] font-semibold num">{d.title}</span>
                  <span className="text-[15.5px] text-muted">{d.places}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm font-semibold">Add-ons</p>
            <ul className="mt-4 border-t border-ink">
              {[["A Night Out", "$50/hr", "A captain runs you to dinner and back. Man-O-War clients only."], ["Get Acquainted", "$100/hr", "A captain shows you the ins and outs of the area. Based on availability."], ["Snorkel set", "from $5/day", "Subject to availability."]].map(([t, p, d]) => (
                <li key={t} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-line py-4"><span className="font-display text-[1.15rem] font-semibold">{t}</span><span className="font-display text-[1.15rem] font-semibold text-pine num">{p}</span><span className="col-span-2 mt-1 text-[15px] text-muted">{d}</span></li>
              ))}
            </ul>
            <a href="#plan" className="mt-8 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-ink px-6 font-semibold text-paper transition hover:bg-pine-deep">Price your week on the chart <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

const SHOTS = [
  { src: PHOTO.turtle, w: 2500, h: 1667, alt: "A sea turtle gliding over rippled white sand in clear water", cap: "A turtle over the sand", cls: "md:col-span-7 md:row-span-2", ratio: "aspect-[3/2]" },
  { src: PHOTO.dock, w: 2000, h: 2666, alt: "Looking straight down at a narrow dock over turquoise water", cap: "Turquoise water off a dock", cls: "md:col-span-5 md:row-span-3", ratio: "aspect-[3/4]" },
  { src: PHOTO.conch, w: 2500, h: 1656, alt: "A pink conch shell on rippled sand under clear shallow water", cap: "A conch in the shallows", cls: "md:col-span-4", ratio: "aspect-[3/2]" },
  { src: PHOTO.pig, w: 2500, h: 1529, alt: "A pig swimming in clear turquoise water", cap: "Swimming pigs", cls: "md:col-span-3", ratio: "aspect-[4/3]" },
]
function DayOut() {
  return (
    <section id="day" className="scroll-mt-6 bg-paper" aria-labelledby="day-title">
      <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHead id="day-title" kicker="A day out" title="Turtles, sandbars and clear water, at your own pace." />
          <blockquote className="lg:pb-2">
            <p className="text-[17px] leading-relaxed">“It was perfectly equipped to cruise down to Little Harbour, up to Great Guana Cay, and anchoring off of Tiloo beach and Fowl Cay.”</p>
            <footer className="mt-2 text-[13px] text-muted">A guest review, as published on abacoboatrental.com. Every one of those stops is on the chart above.</footer>
          </blockquote>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-12 md:gap-4">
          {SHOTS.map((s, i) => (
            <motion.figure key={s.src} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease }} className={`group relative overflow-hidden rounded-md bg-slate/30 ${s.cls}`}>
              <img src={`${s.src}?format=1500w`} alt={s.alt} width={s.w} height={s.h} loading="lazy" className={`${s.ratio} size-full object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.03] md:aspect-auto md:min-h-full`} />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[13px] font-medium">{s.cap}</figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-[15px] text-muted">“We island hopped all over for multiple days and barely burned half a tank.” <span className="text-[13px]">A guest review, as published on abacoboatrental.com</span></p>
      </div>
    </section>
  )
}

const FAQ: [string, string][] = [
  ["Where can I take the boat?", "Your rental is approved for use within a set boundary around Abaco: the Sea of Abaco from Green Turtle Cay down to Little Harbour, inside the outer cays. It keeps you in safe, familiar water, close to fuel, help and cell service. The Atlantic side is a no-go area. If you have a route in mind, ask and the team will confirm it is in range."],
  ["How do I book?", "Online, right on the booking page. Pick your dates, choose pickup and return times, and see exactly what's available. Whatever shows open is open, so there's no need to call to check dates."],
  ["How long is a rental?", "Rentals run on a 24-hour period. Choose a return time earlier than your pickup time so you aren't charged for an extra day. Single-day rentals are fine, and the day rate drops as you add days."],
  ["How do I get my boat?", "Free pickup at Man-O-War Cay. Elbow Cay and Marsh Harbour are free if you run the team member who brought the boat back to Man-O-War. Delivery and pickup to Elbow Cay, Hope Town, Guana Cay, Scotland Cay or Marsh Harbour is $100 each way; Treasure Cay and Little Harbour are $300 each way."],
  ["It's my first time in the Abacos. Is Man-O-War hard to reach?", "That's exactly why they deliver. Say where you're staying and the boat comes to you."],
  ["What's on board?", "A Garmin GPS loaded with current Abaco maps, all required safety gear, and an easy-access cooler under the helm seat."],
  ["When are you open?", "9am to 5pm every day, November 1 to August 15."],
]
function Questions() {
  return (
    <section id="faq" className="scroll-mt-6 bg-ground" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHead id="faq-title" kicker="Good to know" title="Before you book." />
          <Accordion type="single" collapsible defaultValue="q0" className="mt-8 border-t border-ink">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left font-display text-[1.12rem] font-semibold hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <figure className="lg:sticky lg:top-8 lg:self-start">
          <Chart className="aspect-[4/5] w-full rounded-lg md:aspect-square" interactive={false} showTrips={false} label="The rental area: the Sea of Abaco inside the outer cays, from Green Turtle Cay to Little Harbour. The Atlantic beyond the cays is outside it." />
          <figcaption className="mt-3 text-[13.5px] leading-snug text-muted"><b className="font-semibold text-ink">The rental area.</b> Turquoise is in, from Green Turtle Cay to Little Harbour; the deep-blue Atlantic beyond the cays is out. Drawn from the map in the rental agreement; ask to confirm a route.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" className="bg-ink text-paper" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1320px] px-4 pt-20 pb-10 md:px-8 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-[13px] font-semibold text-needle"><span className="h-px w-6 bg-needle" aria-hidden />Contact</p>
            <h2 id="contact-title" className="mt-3 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em]">Your dates, your boat, your Abacos.</h2>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <a href={BOOK} className="inline-flex min-h-13 items-center justify-center gap-1.5 rounded-full bg-needle px-7 font-semibold text-ink transition hover:bg-[#d8b680]">Check availability and book <ArrowUpRight className="size-4" aria-hidden /></a>
              <a href={wa("Hi Abaco Boat Rental!")} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-paper/30 px-6 transition hover:border-paper"><MessageCircle className="size-4" aria-hidden />WhatsApp</a>
            </div>
          </div>
          <ul className="grid gap-6 text-[16px] sm:grid-cols-2 lg:grid-cols-1">
            <li className="flex gap-3"><MessageCircle className="mt-1 size-4 shrink-0 text-needle" aria-hidden /><a href={wa("Hi Abaco Boat Rental!")} className="ulink num">WhatsApp {WA_LABEL}</a></li>
            <li className="flex gap-3"><Mail className="mt-1 size-4 shrink-0 text-needle" aria-hidden /><a href={`mailto:${EMAIL}`} className="ulink break-all">{EMAIL}</a></li>
            <li className="flex gap-3"><Clock className="mt-1 size-4 shrink-0 text-needle" aria-hidden /><span>9am to 5pm every day<br /><span className="text-paper/70">November 1 to August 15</span></span></li>
            <li className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-needle" aria-hidden /><span>Man-O-War Cay, Abaco, The Bahamas<br /><a href={SALTED_LIME} className="ulink text-paper/70">Need a drink? Salted Lime</a></span></li>
          </ul>
        </div>
        <p className="mt-20 border-t border-paper/15 pt-6 text-[12.5px] leading-relaxed text-paper/60">Concept by ESTATIQ AI Solutions. Photos and guest reviews from abacoboatrental.com. Chart drawn from Natural Earth (public domain), an illustration, not for navigation. Prices from the published rates, before VAT.</p>
      </div>
    </footer>
  )
}

/* floating plan dock: appears once the chart has scrolled away */
function Dock({ plan }: { plan: Plan }) {
  const [show, setShow] = useState(false)
  const seen = useRef({ hero: true, contact: false })
  useEffect(() => {
    const hero = document.getElementById("plan"), contact = document.getElementById("contact")
    if (!hero || !contact) return
    const io = new IntersectionObserver(es => { for (const e of es) { if (e.target === hero) seen.current.hero = e.isIntersecting; else seen.current.contact = e.isIntersecting } setShow(!seen.current.hero && !seen.current.contact) }, { threshold: 0 })
    io.observe(hero); io.observe(contact)
    return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty("--concept-offset", show && window.innerWidth < 768 ? "72px" : "0px") }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} transition={{ duration: 0.45, ease }}
          className="fixed right-3 bottom-[calc(12px+env(safe-area-inset-bottom))] left-3 z-40 flex items-center justify-between gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-paper shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)] md:right-6 md:left-auto md:w-[440px]">
          <a href="#plan" className="min-w-0 text-[12.5px] leading-tight"><span className="block truncate text-paper/70">{plan.place.short} · {plan.days} {plan.days === 1 ? "day" : "days"}</span><Money value={plan.total} className="font-display text-[1.3rem] leading-none font-semibold" /></a>
          <span className="flex shrink-0 gap-1.5">
            <a href={wa(plan.msg)} aria-label="Send this plan on WhatsApp" className="flex size-12 items-center justify-center rounded-full border border-paper/25"><MessageCircle className="size-5" aria-hidden /></a>
            <a href={BOOK} className="inline-flex min-h-12 items-center rounded-full bg-needle px-5 text-[14.5px] font-semibold text-ink">Book</a>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  useLenis()
  const plan = usePlan()
  return (<><a href="#plan" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:p-3">Skip to the trip planner</a><main><Hero plan={plan} /><Boat /><Rates plan={plan} /><DayOut /><Questions /></main><Contact /><Dock plan={plan} /></>)
}
mount(<App />)
