import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Page, Masthead, Dock, Contact, Photo, mount, useSignName, mailto, spring, ease, R, PHONE, TEL } from "./shared"

function Hero({ name, setName }: { name: string; setName: (v: string) => void }) {
  const shown = name.trim() || "Your name"
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-deep text-white">
      <Masthead />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 pb-16 pt-10 sm:px-8 lg:min-h-[calc(100svh-84px)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-24 lg:pt-4">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="poster text-[clamp(3.6rem,8.4vw,9.25rem)]">
            {["look for", "your name."].map((l, i) => (
              <motion.span key={l} className={`block ${i ? "text-yellow" : ""}`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.08 + i * 0.09 }}>{l}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35, ease }} className="mt-8 max-w-[34ch] text-[length:var(--t-4)] leading-snug text-white/90">
            At Nassau airport arrivals, a Cheryl's driver in navy and yellow holds up a card with it. Taxis and private island tours for over 25 years.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-9 hidden flex-wrap items-center gap-x-7 gap-y-3 lg:flex">
            <a href="#pickup" className="btn btn-primary">Book my airport pickup <ArrowRight className="size-[18px]" aria-hidden /></a>
            <a href="tours.html" className="btn-text inline-flex items-center font-bold">Plan a private tour</a>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          {/* the real team photo, as a print behind the sign */}
          <motion.figure initial={{ opacity: 0, y: 60, rotate: 9 }} animate={{ opacity: 1, y: 0, rotate: 3.5 }} transition={{ ...spring, delay: 0.35 }}
            className="relative ml-auto w-[88%] rounded-[6px] bg-white p-2.5 pb-3 shadow-[0_30px_60px_-28px_rgba(0,0,0,.6)] sm:w-[78%] lg:w-[92%]">
            <Photo src={R("cheryl-taxi.jpeg")} alt="Two Cheryl's drivers in navy and yellow uniforms beside the company's white passenger van" ratio="1.98 / 1" eager className="rounded-[2px]" />
            <figcaption className="mt-2 px-1 text-[13px] text-muted">Cheryl's drivers, in the uniform you will look for.</figcaption>
          </motion.figure>
          {/* the arrivals sign */}
          <motion.div initial={{ opacity: 0, y: 140, rotate: -12 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ ...spring, stiffness: 180, delay: 0.55 }}
            className="relative z-10 -mt-14 w-[94%] origin-bottom sm:w-[84%] lg:-mt-20 lg:-ml-10 lg:w-[96%]">
            <div className="sign-sway rounded-[10px] bg-card text-ink shadow-[0_40px_70px_-30px_rgba(0,0,0,.65)]">
              <div className="flex items-center justify-between rounded-t-[10px] bg-yellow px-5 py-2.5 text-[14px] font-bold">
                <span>Cheryl's Bahamas Taxi</span><span className="tnum">Reg. #1080</span>
              </div>
              <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p key={shown} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
                    className={`min-h-[1.15em] break-words text-[clamp(2.1rem,4.4vw,3.9rem)] font-bold leading-[1.1] tracking-[-0.01em] ${name.trim() ? "text-ink" : "text-ink/35"}`}>{shown}</motion.p>
                </AnimatePresence>
                <p className="mt-1 text-[15px] text-muted">Welcome to Nassau</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="relative z-10 mt-6 max-w-[440px] lg:ml-[-40px]">
            <label htmlFor="sign-name" className="text-[15px] font-bold text-white">Put your name on the card</label>
            <input id="sign-name" value={name} onChange={e => setName(e.target.value.slice(0, 32))} autoComplete="name" placeholder="e.g. The Alvarez family"
              className="mt-2 block min-h-[52px] w-full rounded-[12px] border-2 border-white/30 bg-white/10 px-4 text-[18px] text-white placeholder:text-white/55 focus:border-yellow focus:outline-none" />
          </motion.div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 lg:hidden">
            <a href="#pickup" className="btn btn-primary">Book my airport pickup <ArrowRight className="size-[18px]" aria-hidden /></a>
            <a href="tours.html" className="btn-text inline-flex items-center font-bold">Plan a private tour</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const BEATS = [
  { n: "1", t: "Your flight lands.", d: "Send your airline, flight number and arrival time when you book. That is all we need to meet you." },
  { n: "2", t: "Look for navy and yellow.", d: "A Cheryl's representative waits in the arrivals lounge with a card showing your name. Every driver and rep wears the company uniform and logo." },
  { n: "3", t: "Sit back, the air is on.", d: "Air-conditioned vehicles and trained drivers who know every road. Car and booster seats are free; just tell us the children's ages." },
]

function Arrival() {
  return (
    <section aria-labelledby="arrival-title" className="on-light bg-paper">
      <div className="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 lg:py-36">
        <h2 id="arrival-title" className="poster max-w-[16ch] text-[length:var(--t-2)]">from the arrivals hall to your hotel door.</h2>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-7">
            <Photo src={R("fleet.jpeg")} alt="Cheryl's fleet of taxis and vans with uniformed drivers standing beside them" ratio="2.25 / 1" className="rounded-[var(--radius-m)]" />
            <figcaption className="mt-3 text-[15px] text-muted">The fleet: private vans and SUVs, all air-conditioned.</figcaption>
          </figure>
          <ol className="flex flex-col gap-10 lg:col-span-5">
            {BEATS.map((b, i) => (
              <motion.li key={b.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ ...spring, delay: i * 0.06 }} className="grid grid-cols-[64px_1fr] gap-4">
                <span className="poster tnum text-[64px] leading-[.8] text-deep" aria-hidden>{b.n}</span>
                <div>
                  <h3 className="display text-[length:var(--t-3)]">{b.t}</h3>
                  <p className="mt-2 max-w-[42ch] text-muted">{b.d}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
        <p className="mt-16 max-w-[60ch] border-t border-line pt-8 text-[length:var(--t-4)] leading-snug">
          Anywhere on New Providence, west end to east end. Lunch, dinner, a downtown drop-off while you are here: same number. Baby-sitting and wheelchair rentals on request.
        </p>
      </div>
    </section>
  )
}

function Pickup({ name, setName }: { name: string; setName: (v: string) => void }) {
  const [trip, setTrip] = useState<"One way" | "Round trip">("Round trip")
  const [car, setCar] = useState<"Van" | "SUV">("Van")
  const [people, setPeople] = useState(2)
  const [groceries, setGroceries] = useState(false)
  const [hotel, setHotel] = useState("")
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const g = (k: string) => String(f.get(k) || "").trim()
    window.location.href = mailto(`Airport pickup for ${name.trim() || g("contact")}`, [
      `Name on the arrival sign: ${name.trim() || "(not given)"}`,
      `Trip: ${trip}`, `Vehicle: ${car === "Van" ? "Van (private)" : "SUV (private luxury)"}`, `Passengers: ${people}`,
      `Arrival flight: ${g("arrFlight")}`, `Arrival date and time: ${g("arrWhen")}`,
      trip === "Round trip" && `Departure flight: ${g("depFlight")}`, trip === "Round trip" && `Departure date and time: ${g("depWhen")}`,
      `Hotel or tower: ${g("hotel")}`, g("kids") && `Children and seats: ${g("kids")}`,
      `Grocery shopping before arrival: ${groceries ? "Yes please (service fee applies)" : "No"}`,
      `Bags: ${g("bags")}`, "", `Contact: ${g("contact")}  ${g("phone")}`, g("note") && `Note to driver: ${g("note")}`,
    ])
    setSent(true)
  }
  return (
    <section id="pickup" aria-labelledby="pickup-title" className="on-light scroll-mt-4 bg-aqua">
      <div className="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 id="pickup-title" className="poster max-w-[13ch] text-[length:var(--t-2)]">your pickup ticket.</h2>
          <p className="max-w-[40ch] text-[length:var(--t-4)] leading-snug">Fill it in once. It lands in Cheryl's inbox as one complete booking: flight, sign name, seats, hotel.</p>
        </div>

        <form onSubmit={submit} className="mt-12 grid overflow-hidden rounded-[var(--radius-l)] bg-card shadow-[0_30px_60px_-36px_rgba(11,59,82,.6)] lg:grid-cols-[380px_28px_1fr]">
          {/* stub */}
          <div className="flex flex-col justify-between gap-8 bg-deep p-6 text-white sm:p-8">
            <div>
              <p className="text-[15px] font-bold text-aqua">Name on the arrival sign</p>
              <input aria-label="Name on the arrival sign" value={name} onChange={e => setName(e.target.value.slice(0, 32))} placeholder="Your name"
                className="mt-2 w-full border-b-2 border-white/30 bg-transparent pb-2 font-display text-[36px] font-bold tracking-[-0.03em] text-yellow placeholder:text-white/35 focus:border-yellow focus:outline-none" />
            </div>
            <div className="display text-[30px] leading-[1.05]" aria-hidden>
              <p>Nassau airport</p>
              <p className="my-1 text-aqua">{trip === "Round trip" ? "⇅" : "↓"}</p>
              <p className="break-words text-white/90">{hotel.trim() || "your hotel"}</p>
            </div>
            <dl className="tnum grid grid-cols-2 gap-x-4 gap-y-4 text-[15px]">
              <div><dt className="text-white/65">Trip</dt><dd className="font-bold">{trip}</dd></div>
              <div><dt className="text-white/65">Vehicle</dt><dd className="font-bold">{car}</dd></div>
              <div><dt className="text-white/65">Guests</dt><dd className="font-bold">{people}</dd></div>
              <div><dt className="text-white/65">Groceries</dt><dd className="font-bold">{groceries ? "Yes" : "No"}</dd></div>
            </dl>
          </div>
          <div className="perf h-[28px] w-full bg-card lg:h-auto" aria-hidden />
          {/* body */}
          <div className="grid gap-x-6 gap-y-6 p-6 sm:grid-cols-2 sm:p-8 lg:p-10">
            <div className="field">
              <span className="lab" id="trip-l">Trip</span>
              <div className="seg w-full" role="group" aria-labelledby="trip-l">
                {(["One way", "Round trip"] as const).map(t => <button type="button" key={t} aria-pressed={trip === t} onClick={() => setTrip(t)}>{t}</button>)}
              </div>
            </div>
            <div className="field">
              <span className="lab" id="car-l">Vehicle</span>
              <div className="seg w-full" role="group" aria-labelledby="car-l">
                <button type="button" aria-pressed={car === "Van"} onClick={() => setCar("Van")}>Private van</button>
                <button type="button" aria-pressed={car === "SUV"} onClick={() => setCar("SUV")}>Luxury SUV</button>
              </div>
            </div>
            <div className="field"><label htmlFor="arrFlight">Arrival airline and flight number</label><input id="arrFlight" name="arrFlight" required placeholder="e.g. AA 1234" /></div>
            <div className="field"><label htmlFor="arrWhen">Arrival date and time</label><input id="arrWhen" name="arrWhen" type="datetime-local" required /></div>
            <AnimatePresence initial={false}>
              {trip === "Round trip" && (
                <motion.div key="dep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="contents">
                  <div className="field"><label htmlFor="depFlight">Departure airline and flight number</label><input id="depFlight" name="depFlight" required placeholder="e.g. AA 4321" /></div>
                  <div className="field"><label htmlFor="depWhen">Departure date and time</label><input id="depWhen" name="depWhen" type="datetime-local" required /></div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="field">
              <span className="lab" id="pp-l">Passengers</span>
              <div className="flex items-center gap-2" role="group" aria-labelledby="pp-l">
                <button type="button" aria-label="Fewer passengers" onClick={() => setPeople(p => Math.max(1, p - 1))} className="size-[50px] rounded-[10px] border-[1.5px] border-line text-[22px] font-bold">−</button>
                <output className="tnum w-14 text-center font-display text-[28px] font-bold" aria-live="polite">{people}</output>
                <button type="button" aria-label="More passengers" onClick={() => setPeople(p => Math.min(30, p + 1))} className="size-[50px] rounded-[10px] border-[1.5px] border-line text-[22px] font-bold">+</button>
              </div>
            </div>
            <div className="field"><label htmlFor="hotel">Hotel or tower you are staying at</label><input id="hotel" name="hotel" required value={hotel} onChange={e => setHotel(e.target.value)} /></div>
            <div className="field sm:col-span-2"><label htmlFor="kids">Children's ages, car or booster seats, strollers</label><input id="kids" name="kids" placeholder="e.g. 2 and 6, one booster seat, one stroller" /></div>
            <div className="field"><label htmlFor="bags">Bags (checked and carry-on)</label><input id="bags" name="bags" placeholder="e.g. 3 checked, 2 carry-on" /></div>
            <div className="field">
              <span className="lab">Groceries waiting for you</span>
              <label className="flex min-h-[50px] cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] border-line px-4 font-normal">
                <input type="checkbox" checked={groceries} onChange={e => setGroceries(e.target.checked)} className="!min-h-0 !w-5 size-5 accent-[#0b4f6c]" />
                <span>Shop for us before we land <span className="text-muted">(service fee)</span></span>
              </label>
            </div>
            <div className="field"><label htmlFor="contact">Your full name</label><input id="contact" name="contact" required autoComplete="name" /></div>
            <div className="field"><label htmlFor="phone">Phone or WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
            <div className="field sm:col-span-2"><label htmlFor="note">Note to the driver</label><textarea id="note" name="note" rows={2} /></div>
            <p className="tnum max-w-[68ch] text-[14px] text-muted sm:col-span-2">Each guest over 3 travels with one carry-on and one checked bag. Extra suitcases are $3.30, extra duffle bags $5.50. Backpacks and purses are free.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
              <button type="submit" className="btn bg-deep text-white hover:bg-deep-2">Send my pickup request <ArrowRight className="size-[18px]" aria-hidden /></button>
              <AnimatePresence>{sent && <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-[15px] font-bold text-deep" role="status">Your email app should be open with the booking filled in.</motion.p>}</AnimatePresence>
              {!sent && <p className="text-[15px] text-muted">Opens your email app, filled in. Or call <a href={TEL} className="tnum font-bold text-ink underline underline-offset-4">{PHONE}</a>.</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

const DAYS = [
  { id: "short", hours: "3", unit: "hours", title: "sightseeing and shopping", img: "shopping.jpeg", alt: "The straw market in Nassau, walls of handmade bags and hats", pos: "50% 40%",
    lines: ["Paradise Island and Atlantis", "The 66 Steps at Fort Fincastle", "Jaws Beach", "Souvenir shopping, with help on what a fair price is"] },
  { id: "full", hours: "8", unit: "hours or more", title: "a full day out, picnic included", img: "desertedbeaches.jpeg", alt: "A quiet beach on New Providence shaded by casuarina trees", pos: "50% 60%",
    lines: ["The 66 Steps", "Snorkelling at Jaws Beach, away from the crowds", "A picnic lunch, drinks kept cold on ice", "Picnic for groups of six or more"] },
]

function Days() {
  return (
    <section aria-labelledby="days-title" className="on-light bg-paper">
      <div className="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 lg:py-36">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 id="days-title" className="poster max-w-[12ch] text-[length:var(--t-2)]">two ways to spend a day.</h2>
          <p className="max-w-[42ch] text-[length:var(--t-4)] leading-snug">Every tour is private. Start from one of these, then add or take away whatever you like.</p>
        </div>
        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-2 lg:gap-10">
          {DAYS.map((d, i) => (
            <motion.article key={d.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ ...spring, delay: i * 0.08 }} className={i ? "lg:mt-24" : ""}>
              <Photo src={R(d.img)} alt={d.alt} ratio="4 / 3" pos={d.pos} className="rounded-[var(--radius-m)]" />
              <div className="mt-7 flex items-baseline gap-4">
                <span className="poster tnum text-[clamp(4.5rem,8vw,7.5rem)] text-deep">{d.hours}</span>
                <span className="display text-[length:var(--t-3)]">{d.unit}</span>
              </div>
              <h3 className="display mt-2 text-[length:var(--t-3)] text-muted">{d.title}</h3>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {d.lines.map(l => <li key={l} className="py-3">{l}</li>)}
              </ul>
              <a href={`tours.html?day=${d.id}`} className="btn-text mt-5 inline-flex items-center gap-1.5 font-bold">Start my day from this <ArrowUpRight className="size-[18px]" aria-hidden /></a>
            </motion.article>
          ))}
        </div>
        <a href="tours.html" className="group mt-20 flex items-center justify-between gap-6 border-t-2 border-ink pt-6">
          <span className="display max-w-[30ch] text-[length:var(--t-3)]">Or build it from 22 real stops: forts, conch, rum cake, Rose Island, the pigs.</span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-yellow transition-transform duration-200 group-hover:translate-x-1"><ArrowRight className="size-6" aria-hidden /></span>
        </a>
      </div>
    </section>
  )
}

const INCLUDED = [
  ["Drinks on board.", "Bahama Mama, beer, sodas and water. You choose."],
  ["Entry fees stay small.", "Most historic sites charge $3 to $5."],
  ["Seats for the little ones.", "Car and booster seats, free of charge."],
  ["Celebrating something?", "Say so. There is a gift: champagne, roses or chocolates."],
  ["English or Spanish.", "Spanish tours and translators, for the day or the whole stay."],
]

function Included() {
  return (
    <section aria-labelledby="inc-title" className="on-light bg-yellow">
      <div className="mx-auto grid max-w-[1360px] gap-14 px-4 py-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-5">
          <h2 id="inc-title" className="poster max-w-[10ch] text-[length:var(--t-2)]">on every private tour.</h2>
          <figure className="mt-12">
            <Photo src={R("conch.png")} alt="A Cheryl's guide in uniform holding a fresh conch at a conch stand on the waterfront" ratio="2.1 / 1" pos="30% 50%" className="rounded-[var(--radius-m)]" />
            <figcaption className="mt-3 text-[15px] text-ink/75">The conch lesson: out of the shell, cleaned, then a bowl of fresh conch salad ($10, shares four).</figcaption>
          </figure>
        </div>
        <ul className="lg:col-span-7 lg:pt-3">
          {INCLUDED.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ ...spring, delay: i * 0.05 }} className="border-t-2 border-ink/80 py-6 first:border-t-0 first:pt-0">
              <p className="display text-[length:var(--t-3)]">{t}</p>
              <p className="mt-1 text-[length:var(--t-4)] leading-snug text-ink/80">{d}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Home() {
  const [name, setName] = useSignName()
  return (
    <Page>
      <main id="main">
        <Hero name={name} setName={setName} />
        <Arrival />
        <Pickup name={name} setName={setName} />
        <Days />
        <Included />
      </main>
      <Contact />
      <Dock action={{ href: "#pickup", label: "Book pickup" }} />
    </Page>
  )
}

mount(<Home />)
