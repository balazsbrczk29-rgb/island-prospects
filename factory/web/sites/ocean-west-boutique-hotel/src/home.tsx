import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, EMAIL, BOOK, SITE, ROOMS, floorName, type Room } from "./site"
import Ridge from "./Ridge"

function Hero({ onPick }: { onPick: (r: Room) => void }) {
  const lines = ["Ten rooms on a ridge,", "lake to one side,", "ocean to the other."]
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-10 md:grid-cols-12 md:items-center md:px-10 md:pt-14">
        <div className="md:col-span-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[11px] tracking-[0.3em] text-lake uppercase">Ocean West Boutique Hotel · West Bay Street, Nassau</motion.p>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.4rem,4.1vw,4.9rem)] leading-[1.04] tracking-[-0.015em]">
            <span className="sr-only">Ocean West Boutique Hotel, Nassau: </span>
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span className={`block ${i === 2 ? "text-ocean" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.15, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }}>
            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-muted">A ten-room boutique hotel 70 feet above sea level in western New Providence, looking over Lake Killarney and the Atlantic. Five minutes from the airport.</p>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <a href={BOOK} className="group inline-flex min-h-12 items-center justify-center gap-2 bg-lake-deep px-6 text-[14px] tracking-[0.12em] text-paper uppercase transition hover:-translate-y-px hover:bg-ink active:translate-y-0">Check dates <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink/25 px-6 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.3, ease }} className="-mx-5 md:col-span-7 md:mx-0">
          <div className="relative border-y border-line md:border">
            <Ridge onPick={onPick} />
            <p className="pointer-events-none absolute top-3 right-4 hidden text-[11px] tracking-[0.2em] text-muted uppercase md:block">Tap a window to meet its room</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Front desk, 24 hours", PHONE, TEL],
    ["Rooms", "From $215 a night", "rooms.html"],
    ["Airport", "5 minutes from LPIA", "stay.html#getting-here"],
    ["Check-in / out", "3pm · 11am", "stay.html#policies"],
  ]
  return (
    <section className="mt-12 bg-ink text-paper md:mt-16" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="border-paper/15 border-b odd:border-r lg:border-b-0 lg:border-l lg:odd:border-r-0 lg:first:border-l-0">
            <a href={href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-10 md:py-9">
              <span className="text-[10.5px] tracking-[0.24em] text-blush uppercase">{k}</span>
              <span className="mt-2 block font-display text-[clamp(1.25rem,2.2vw,2.1rem)] leading-tight">{v}</span>
              <span className="mt-3 block h-px w-0 bg-blush transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Rooms({ room, setRoom }: { room: Room; setRoom: (r: Room) => void }) {
  return (
    <section id="rooms" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="rooms-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Label n="01">The ten rooms</Label>
          <h2 id="rooms-title" className="mt-5 font-display text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[1.02]">Each one named for a stone.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Every room has a full or partial ocean view, and some have French doors onto a private balcony. Choose a stone.</p>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a room">
            {ROOMS.map(r => (
              <button key={r.name} type="button" aria-pressed={room.name === r.name} onClick={() => setRoom(r)} className={`inline-flex min-h-11 items-center gap-2 border px-4 text-[14px] transition hover:-translate-y-px ${room.name === r.name ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"}`}>
                <span className="size-2.5 rotate-45 border border-ink/30" style={{ background: r.gem }} aria-hidden /> {r.name}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            <motion.article key={room.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }}>
              <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}>
                <Photo src={room.img} alt={`The ${room.name} Room at Ocean West`} className="aspect-[3/2]" />
              </motion.div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
                <h3 className="font-display text-4xl">The {room.name} Room</h3>
                <a href={BOOK} className="group inline-flex items-center gap-1 text-[14px] tracking-[0.12em] text-lake-deep uppercase">Check dates <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              </div>
              <dl className="grid grid-cols-2 gap-y-5 pt-5 sm:grid-cols-4">
                {[["Bed", room.bed], ["View", room.view], ["Floor", floorName(room.floor)], ["Balcony", room.balcony ? "Private balcony" : "No balcony"]].map(([k, v]) => (
                  <div key={k}><dt className="text-[11px] tracking-[0.2em] text-muted uppercase">{k}</dt><dd className="mt-1 text-[16px]">{v}</dd></div>
                ))}
              </dl>
            </motion.article>
          </AnimatePresence>
          <a href="rooms.html" className="group mt-10 inline-flex items-center gap-2 underline decoration-ink/30 underline-offset-4 hover:decoration-lake">Compare all ten rooms <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

function Ridgeline() {
  return (
    <section className="bg-lake-deep text-paper" aria-labelledby="ridge-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-5 md:col-start-1">
          <Photo src={SITE + "images/home-ing.jpg"} alt="Ocean West Boutique Hotel and its pool" className="aspect-[4/5]" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <Label n="02" light>The setting</Label>
          <h2 id="ridge-title" className="mt-5 font-display text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[1.02]">Seventy feet up, and very quiet.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-paper/75">Ocean West stands on high ground in the western district of New Providence. To the south lies Lake Killarney; to the north, the Atlantic. Access is for guests only.</p>
          <p className="mt-5 text-[17px] leading-relaxed text-paper/75">The airport is five minutes away, and the Cable Beach strip, with its casino, fine dining and nightlife, is three to four miles east.</p>
          <dl className="mt-10 grid grid-cols-3 border-t border-paper/20">
            {[["70 ft", "above sea level"], ["10", "rooms"], ["5 min", "to the airport"]].map(([v, k]) => (
              <div key={k} className="border-r border-paper/20 py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4"><dd className="font-display text-[clamp(1.8rem,3vw,2.6rem)]">{v}</dd><dt className="text-[11px] tracking-[0.18em] text-blush uppercase">{k}</dt></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Amenities() {
  const list: [string, string][] = [
    ["Outdoor pool and two bars", "A drink from the indoor or outdoor bar, by the pool or over a game of pool."],
    ["Rooftop gym", "With a view of the ocean."],
    ["Massage suite", "On the third floor, by appointment."],
    ["Breakfast", "Traditional or Bahamian, served a la carte."],
    ["Sapodilla", "The fine dining restaurant on the eastern side of the hotel."],
    ["In every room", "Refrigerator, microwave, cable TV, hair dryer, free Wi-Fi and toiletries."],
  ]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="am-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Label n="03">At the hotel</Label>
          <h2 id="am-title" className="mt-5 font-display text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[1.02]">Small, with what you need.</h2>
          <Photo src={SITE + "images/menti-pic.jpg"} alt="The pool terrace at Ocean West" className="mt-10 aspect-[4/3]" />
        </Reveal>
        <ol className="md:col-span-7 md:col-start-6">
          {list.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 first:border-t">
              <span className="text-[12px] tracking-[0.2em] text-lake">{String(i + 1).padStart(2, "0")}</span>
              <span><span className="block font-display text-2xl transition group-hover:translate-x-1">{t}</span><span className="mt-1 block text-[15px] leading-relaxed text-muted">{d}</span></span>
            </motion.li>
          ))}
          <a href="stay.html" className="group mt-8 inline-flex items-center gap-2 underline decoration-ink/30 underline-offset-4 hover:decoration-lake">Amenities, policies and getting here <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </ol>
      </div>
    </section>
  )
}

const ENQ = {
  room: { label: "Ask about a room", fields: [["Room you like", "text"], ["Arrival", "date"], ["Departure", "date"], ["Adults", "number"], ["Children under 12", "number"]] },
  long: { label: "Extended stay", fields: [["Arrival", "date"], ["How many weeks", "number"], ["Guests", "number"]] },
  group: { label: "Group or meeting", fields: [["Organisation", "text"], ["Dates", "text"], ["Rooms needed", "number"], ["Conference space", "text"]] },
} as const
type K = keyof typeof ENQ

function Plan({ room }: { room: Room }) {
  const [tab, setTab] = useState<K>("room")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const get = (k: K, f: string) => vals[`${k}:${f}`] ?? (k === "room" && f === "Room you like" ? `${room.name} Room` : "")
  const lines = ENQ[tab].fields.map(([f]) => get(tab, f) ? `${f}: ${get(tab, f)}` : null).filter(Boolean) as string[]
  const body = ["Hello Ocean West,", "", `${ENQ[tab].label}:`, ...lines, "", name ? `Thank you, ${name}` : "Thank you"].join("\n")
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(ENQ[tab].label)}&body=${encodeURIComponent(body)}`
  return (
    <section id="plan" className="bg-paper-2" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <Label n="04">Plan your stay</Label>
          <h2 id="plan-title" className="mt-5 font-display text-[clamp(2.3rem,4.4vw,4rem)] leading-[1.02]">Book direct, or ask us first.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">See live availability on the hotel’s own booking page. For a particular room, a longer stay or a group, send the details and the front desk will reply.</p>
          <a href={BOOK} className="group mt-8 inline-flex min-h-12 items-center gap-2 bg-lake-deep px-6 text-[14px] tracking-[0.12em] text-paper uppercase transition hover:-translate-y-px">Check dates online <ArrowUpRight className="size-4" aria-hidden /></a>
          <p className="mt-4 text-[13px] text-muted">Rates $215 to $600 a night for one or two guests; children under 12 stay free.</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as K)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-none bg-paper p-1">
              {(Object.keys(ENQ) as K[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-none px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">{ENQ[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(ENQ) as K[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block sm:col-span-2"><span className="text-[11px] tracking-[0.2em] text-muted uppercase">Your name</span>
                    <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none focus:border-lake" /></label>
                  {ENQ[k].fields.map(([f, type]) => (
                    <label key={f} className="block"><span className="text-[11px] tracking-[0.2em] text-muted uppercase">{f}</span>
                      <input type={type} value={get(k, f)} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none focus:border-lake" /></label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 bg-ink p-6 text-paper md:p-8">
            <p className="text-[11px] tracking-[0.2em] text-blush uppercase">Your message</p>
            <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-paper/80">{lines.join(" · ")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={mail} className="inline-flex min-h-12 items-center justify-center gap-2 bg-paper px-6 text-ink transition hover:-translate-y-px"><Mail className="size-4" aria-hidden /> Email the front desk</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
            <p className="mt-4 text-[13px] text-paper/55">Opens your email app addressed to {EMAIL}. Nothing is sent until you press send.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ: [string, string][] = [
  ["How far is Ocean West from Nassau airport?", "About a five minute drive from Lynden Pindling International Airport. Airport transport is available at a surcharge."],
  ["What are the check-in and check-out times?", "Check-in is at 3pm and check-out at 11am. Late check-out until 2pm is $30. The front desk is open 24 hours."],
  ["Do children stay free?", "Children under 12 stay free. Rates are for single and double occupancy; rollaway beds are $100 a night."],
  ["Is breakfast included?", "No. A traditional or Bahamian breakfast is served a la carte."],
  ["Are pets allowed?", "No pets are allowed on the premises, and all rooms are non-smoking."],
]

function Faq() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4"><Label n="05">Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.04]">Before you arrive.</h2></Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left text-[18px] font-medium hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Home() {
  const [room, setRoom] = useState<Room>(ROOMS[0])
  const pick = (r: Room) => { setRoom(r); document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" }) }
  return (<><Hero onPick={pick} /><KeyInfo /><Rooms room={room} setRoom={setRoom} /><Ridgeline /><Amenities /><Plan room={room} /><Faq /></>)
}

mount(<Page current="Home"><Home /></Page>)
