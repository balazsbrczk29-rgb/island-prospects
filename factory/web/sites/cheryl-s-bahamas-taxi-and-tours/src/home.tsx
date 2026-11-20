import { useRef, useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { Page, Masthead, Dock, Contact, Photo, mount, useSignName, mailto, spring, ease, R, PHONE, TEL } from "./shared"

/* The arrivals sign: the typed name is written onto the blank card in the driver's hands. */
function SignPhoto({ name }: { name: string }) {
  const text = name.trim()
  const shown = text || "Your name"
  // fit the marker line to the card: ~35% of the photo width available
  const size = Math.max(2.6, Math.min(7.2, 33 / (Math.max(5, shown.length) * 0.62)))
  return (
    <figure className="relative">
      <div className="sign-photo relative overflow-hidden rounded-[var(--radius-m)] bg-[#cfd8dc]" style={{ aspectRatio: "1600 / 1067" }}>
        <img src="./arrivals-sign.jpg" alt="A driver in a navy uniform with yellow trim holding up a white arrivals card with your name on it" width={1600} height={1067}
          fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        {/* writing area on the card (card spans ~11.8-53% x, 24-68% y in the photo) */}
        <div aria-hidden className="absolute flex items-center justify-center"
          style={{ left: "14.5%", top: "31%", width: "36.5%", height: "33%", transform: "rotate(-1.1deg) skewY(-0.4deg)" }}>
          <p className={`marker whitespace-nowrap ${text ? "text-[#14213d]" : "text-[#14213d]/30"}`} style={{ fontSize: `${size}cqw`, mixBlendMode: "multiply" }}>
            {shown.split("").map((ch, i) => (
              <motion.span key={`${i}-${ch}`} className="inline-block" initial={text ? { opacity: 0, y: "-0.12em", scale: 1.25 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.16, ease: "easeOut" }}>{ch === " " ? " " : ch}</motion.span>
            ))}
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-[13px] text-white/70">Illustrative photo. Cheryl's drivers wear the navy and yellow company uniform.</figcaption>
    </figure>
  )
}

function Hero({ name, setName }: { name: string; setName: (v: string) => void }) {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-deep text-white">
      <Masthead />
      <div className="mx-auto max-w-[1360px] px-4 pb-28 pt-5 sm:px-8 lg:pb-20 lg:pt-6">
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.05 }}
          className="poster text-[12.4vw] tracking-[-0.06em] lg:text-[clamp(3.3rem,7.3vw,7.9rem)]">
          look for <span className="text-yellow">your&nbsp;name.</span>
        </motion.h1>
        <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <motion.div initial={{ opacity: 0, y: 40, rotate: 1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ ...spring, stiffness: 160, delay: 0.25 }}
            className="lg:order-2 lg:col-span-7" style={{ containerType: "inline-size" }}>
            <SignPhoto name={name} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4, ease }} className="flex flex-col lg:order-1 lg:col-span-5 lg:justify-center">
            <p className="order-last mt-8 max-w-[34ch] text-[length:var(--t-4)] leading-snug text-white/90 lg:order-none lg:mt-0">
              At Nassau airport arrivals, a Cheryl's driver holds up a card with your name on it. Taxis and private island tours for over 25 years.
            </p>
            <label htmlFor="sign-name" className="display text-[24px] text-yellow lg:mt-10">Write your name on the card</label>
            <input id="sign-name" value={name} onChange={e => setName(e.target.value.slice(0, 28))} autoComplete="name" placeholder="e.g. The Alvarez family"
              className="mt-3 block min-h-[72px] w-full rounded-[14px] border-2 border-white bg-white px-5 font-display text-[26px] font-bold tracking-[-0.02em] text-ink placeholder:font-sans placeholder:text-[20px] placeholder:font-normal placeholder:tracking-normal placeholder:text-[#5b6b76] focus:border-yellow focus:outline-none focus:ring-4 focus:ring-yellow/50" />
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-1">
              <a href="#pickup" className="btn btn-primary">Book my airport pickup <ArrowRight className="size-[18px]" aria-hidden /></a>
              <a href="tours.html" className="btn-text inline-flex items-center font-bold">Plan a private tour</a>
            </div>
          </motion.div>
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
      <div className="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 lg:py-32">
        <h2 id="arrival-title" className="poster max-w-[16ch] text-[length:var(--t-2)]">from the arrivals hall to your hotel door.</h2>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-10">
          <figure className="lg:col-span-7">
            <Photo src={R("cheryl-taxi.jpeg")} alt="Two Cheryl's drivers in navy and yellow uniforms beside the company's white passenger van" ratio="4 / 3" pos="44% 70%" className="rounded-[var(--radius-m)]" />
            <figcaption className="mt-3 text-[15px] text-muted">Cheryl's drivers, in the uniform you will look for, with one of the air-conditioned vans.</figcaption>
          </figure>
          <div className="lg:col-span-5">
            <ol className="flex flex-col gap-10">
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
        </div>
        <p className="mt-16 max-w-[60ch] border-t border-line pt-8 text-[length:var(--t-4)] leading-snug">
          Anywhere on New Providence, west end to east end. Lunch, dinner, a downtown drop-off while you are here: same number. Baby-sitting and wheelchair rentals on request.
        </p>
      </div>
    </section>
  )
}

const STEPS = ["Flight", "Who", "Hotel"] as const

function Pickup({ name, setName }: { name: string; setName: (v: string) => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<boolean[]>([false, false, false])
  const [trip, setTrip] = useState<"One way" | "Round trip">("Round trip")
  const [car, setCar] = useState<"Van" | "SUV">("Van")
  const [people, setPeople] = useState(2)
  const [groceries, setGroceries] = useState(false)
  const [f, setF] = useState({ arrFlight: "", arrWhen: "", depFlight: "", depWhen: "", contact: "", kids: "", hotel: "", bags: "", phone: "", note: "" })
  const [sent, setSent] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF(v => ({ ...v, [k]: e.target.value }))

  const valid = () => {
    const els = stepRef.current ? Array.from(stepRef.current.querySelectorAll<HTMLInputElement>("input[required]")) : []
    const bad = els.find(el => !el.checkValidity())
    if (bad) { bad.reportValidity(); return false }
    return true
  }
  const next = () => { if (!valid()) return; setDone(d => d.map((x, i) => i === step ? true : x)); setStep(s => Math.min(2, s + 1)) }
  const when = (v: string) => v ? new Date(v).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : ""

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < 2) { next(); return }
    if (!valid()) return
    setDone([true, true, true])
    window.location.href = mailto(`Airport pickup for ${name.trim() || f.contact}`, [
      `Name on the arrival sign: ${name.trim() || "(not given)"}`,
      `Trip: ${trip}`, `Vehicle: ${car === "Van" ? "Van (private)" : "SUV (private luxury)"}`, `Passengers: ${people}`,
      `Arrival flight: ${f.arrFlight}`, `Arrival date and time: ${f.arrWhen}`,
      trip === "Round trip" && `Departure flight: ${f.depFlight}`, trip === "Round trip" && `Departure date and time: ${f.depWhen}`,
      `Hotel or tower: ${f.hotel}`, f.kids && `Children and seats: ${f.kids}`,
      `Grocery shopping before arrival: ${groceries ? "Yes please (service fee applies)" : "No"}`,
      f.bags && `Bags: ${f.bags}`, "", `Contact: ${f.contact}  ${f.phone}`, f.note && `Note to driver: ${f.note}`,
    ])
    setSent(true)
  }

  const stub: { label: string; lines: string[] }[] = [
    { label: "Flight", lines: [f.arrFlight && `${f.arrFlight}, lands ${when(f.arrWhen)}`, trip === "Round trip" && f.depFlight && `${f.depFlight}, leaves ${when(f.depWhen)}`].filter(Boolean) as string[] },
    { label: "Who", lines: [f.contact && f.contact, `${people} guest${people > 1 ? "s" : ""}, ${car === "Van" ? "private van" : "luxury SUV"}`, f.kids].filter(Boolean) as string[] },
    { label: "Hotel", lines: [f.hotel, groceries && "Groceries waiting"].filter(Boolean) as string[] },
  ]

  return (
    <section id="pickup" aria-labelledby="pickup-title" className="scroll-mt-4 bg-ink text-white">
      <div className="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 id="pickup-title" className="poster max-w-[13ch] text-[length:var(--t-2)]">your pickup ticket.</h2>
          <p className="max-w-[40ch] text-[length:var(--t-4)] leading-snug text-white/85">Three short steps. It lands in Cheryl's inbox as one complete booking.</p>
        </div>

        <form onSubmit={submit} noValidate={false} className="on-light mt-12 grid overflow-hidden rounded-[var(--radius-l)] bg-card text-ink lg:grid-cols-[400px_28px_1fr]">
          {/* stub: fills as each step completes */}
          <div className="flex flex-col gap-7 bg-yellow p-6 sm:p-8">
            <div>
              <p className="text-[15px] font-bold">Name on the arrival sign</p>
              <input aria-label="Name on the arrival sign" value={name} onChange={e => setName(e.target.value.slice(0, 28))} placeholder="Your name"
                className="marker mt-2 w-full border-b-2 border-ink/30 bg-transparent pb-2 text-[34px] text-ink placeholder:text-ink/45 focus:border-ink focus:outline-none" />
            </div>
            <ol className="flex flex-col gap-5">
              {stub.map((s, i) => (
                <li key={s.label} className="grid grid-cols-[32px_1fr] gap-3">
                  <span className={`grid size-8 place-items-center rounded-full text-[14px] font-bold transition-colors ${done[i] ? "bg-ink text-yellow" : "border-2 border-ink/40 text-ink/70"}`}>
                    {done[i] ? <Check className="size-4" aria-hidden /> : i + 1}
                  </span>
                  <div className="min-h-[52px]">
                    <p className="display text-[20px]">{s.label}</p>
                    <AnimatePresence initial={false}>
                      {done[i] && s.lines.map(l => (
                        <motion.p key={l} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring} className="tnum text-[15px] leading-snug">{l}</motion.p>
                      ))}
                    </AnimatePresence>
                    {!done[i] && <p className="text-[15px] text-ink/70">{i === step ? "Filling in now" : "To come"}</p>}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-auto text-[14px] text-ink/80">From Nassau airport. Car and booster seats free.</p>
          </div>
          <div className="perf-ink h-[28px] w-full bg-card lg:h-auto" aria-hidden />

          {/* body */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex gap-6 border-b-2 border-ink pb-2" role="tablist" aria-label="Booking steps">
              {STEPS.map((s, i) => (
                <button key={s} type="button" role="tab" aria-selected={step === i} disabled={i > step && !done[i - 1]} onClick={() => setStep(i)}
                  className={`min-h-11 px-1 text-[16px] font-bold transition-colors disabled:opacity-45 ${step === i ? "text-ink underline decoration-[3px] decoration-yellow underline-offset-[10px]" : "text-muted hover:text-ink"}`}>
                  <span className="tnum">{i + 1}</span> {s}
                </button>
              ))}
            </div>
            <div ref={stepRef} className="relative mt-8 min-h-[300px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22, ease }}
                  className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  {step === 0 && <>
                    <div className="field sm:col-span-2">
                      <span className="lab" id="trip-l">Trip</span>
                      <div className="seg w-full sm:w-auto" role="group" aria-labelledby="trip-l">
                        {(["One way", "Round trip"] as const).map(t => <button type="button" key={t} aria-pressed={trip === t} onClick={() => setTrip(t)}>{t}</button>)}
                      </div>
                    </div>
                    <div className="field"><label htmlFor="arrFlight">Arrival airline and flight number</label><input id="arrFlight" required value={f.arrFlight} onChange={set("arrFlight")} placeholder="e.g. AA 1234" /></div>
                    <div className="field"><label htmlFor="arrWhen">Arrival date and time</label><input id="arrWhen" type="datetime-local" required value={f.arrWhen} onChange={set("arrWhen")} /></div>
                    {trip === "Round trip" && <>
                      <div className="field"><label htmlFor="depFlight">Departure airline and flight number</label><input id="depFlight" required value={f.depFlight} onChange={set("depFlight")} placeholder="e.g. AA 4321" /></div>
                      <div className="field"><label htmlFor="depWhen">Departure date and time</label><input id="depWhen" type="datetime-local" required value={f.depWhen} onChange={set("depWhen")} /></div>
                    </>}
                  </>}
                  {step === 1 && <>
                    <div className="field"><label htmlFor="contact">Your full name</label><input id="contact" required autoComplete="name" value={f.contact} onChange={set("contact")} /></div>
                    <div className="field">
                      <span className="lab" id="pp-l">Passengers</span>
                      <div className="flex items-center gap-2" role="group" aria-labelledby="pp-l">
                        <button type="button" aria-label="Fewer passengers" onClick={() => setPeople(p => Math.max(1, p - 1))} className="size-[50px] rounded-[10px] border-[1.5px] border-line text-[22px] font-bold">−</button>
                        <output className="tnum w-14 text-center font-display text-[28px] font-bold" aria-live="polite">{people}</output>
                        <button type="button" aria-label="More passengers" onClick={() => setPeople(p => Math.min(30, p + 1))} className="size-[50px] rounded-[10px] border-[1.5px] border-line text-[22px] font-bold">+</button>
                      </div>
                    </div>
                    <div className="field sm:col-span-2">
                      <span className="lab" id="car-l">Vehicle</span>
                      <div className="seg w-full sm:w-auto" role="group" aria-labelledby="car-l">
                        <button type="button" aria-pressed={car === "Van"} onClick={() => setCar("Van")}>Private van</button>
                        <button type="button" aria-pressed={car === "SUV"} onClick={() => setCar("SUV")}>Luxury SUV</button>
                      </div>
                    </div>
                    <div className="field sm:col-span-2"><label htmlFor="kids">Children's ages, car or booster seats, strollers</label><input id="kids" value={f.kids} onChange={set("kids")} placeholder="e.g. 2 and 6, one booster seat, one stroller" /></div>
                  </>}
                  {step === 2 && <>
                    <div className="field"><label htmlFor="hotel">Hotel or tower you are staying at</label><input id="hotel" required value={f.hotel} onChange={set("hotel")} /></div>
                    <div className="field"><label htmlFor="phone">Phone or email for the driver</label><input id="phone" required autoComplete="tel" value={f.phone} onChange={set("phone")} /></div>
                    <div className="field"><label htmlFor="bags">Bags (checked and carry-on)</label><input id="bags" value={f.bags} onChange={set("bags")} placeholder="e.g. 3 checked, 2 carry-on" /></div>
                    <div className="field">
                      <span className="lab">Groceries waiting for you</span>
                      <label className="!flex min-h-[50px] cursor-pointer items-center gap-3 !mb-0 rounded-[10px] border-[1.5px] border-line px-4 font-normal">
                        <input type="checkbox" checked={groceries} onChange={e => setGroceries(e.target.checked)} className="!min-h-0 !w-5 !p-0 size-5 shrink-0 accent-[#0b4f6c]" />
                        <span>Shop for us before we land <span className="text-muted">(service fee)</span></span>
                      </label>
                    </div>
                    <div className="field sm:col-span-2"><label htmlFor="note">Note to the driver</label><input id="note" value={f.note} onChange={set("note")} /></div>
                    <p className="tnum max-w-[64ch] text-[14px] text-muted sm:col-span-2">Each guest over 3 travels with one carry-on and one checked bag. Extra suitcases are $3.30, extra duffle bags $5.50. Backpacks and purses are free.</p>
                  </>}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              {step > 0 && <button type="button" onClick={() => setStep(s => s - 1)} className="btn-text inline-flex items-center gap-1.5 font-bold"><ArrowLeft className="size-4" aria-hidden />Back</button>}
              <button type="submit" className="btn btn-primary ml-auto">
                {step < 2 ? <>Next: {STEPS[step + 1]}</> : <>Send my pickup request</>} <ArrowRight className="size-[18px]" aria-hidden />
              </button>
            </div>
            <p className="mt-3 text-right text-[14px] text-muted" role="status">{sent ? "Your email app should be open with the booking filled in." : <>Opens your email app, filled in. Or call <a href={TEL} className="tnum font-bold text-ink underline underline-offset-4">{PHONE}</a>.</>}</p>
          </div>
        </form>
      </div>
    </section>
  )
}

const DAYS = [
  { id: "short", hours: "3 hours", title: "Sightseeing and shopping", img: "shopping.jpeg", alt: "The straw market in Nassau, walls of handmade bags and hats", pos: "50% 40%",
    lines: ["Paradise Island and Atlantis", "The 66 Steps at Fort Fincastle", "Jaws Beach", "Souvenir shopping, with help on what a fair price is"] },
  { id: "full", hours: "8 hours +", title: "A full day out, picnic included", img: "desertedbeaches.jpeg", alt: "A quiet beach on New Providence shaded by casuarina trees", pos: "50% 60%",
    lines: ["The 66 Steps", "Snorkelling at Jaws Beach, away from the crowds", "A picnic lunch, drinks kept cold on ice", "Picnic for groups of six or more"] },
]

function Days() {
  return (
    <section aria-labelledby="days-title" className="on-light bg-paper">
      <div className="mx-auto max-w-[1360px] px-4 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="days-title" className="poster text-[length:var(--t-2)] lg:col-span-6">two ways to spend a&nbsp;day.</h2>
          <p className="max-w-[42ch] text-[length:var(--t-4)] leading-snug lg:col-span-5 lg:col-start-8">Every tour is private. Start from one of these, then add or take away whatever you like.</p>
        </div>
        <div className="mt-14 grid gap-16 lg:mt-16 lg:grid-cols-2 lg:gap-10">
          {DAYS.map((d, i) => (
            <motion.article key={d.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ ...spring, delay: i * 0.08 }}>
              <Photo src={R(d.img)} alt={d.alt} ratio="4 / 3" pos={d.pos} className="rounded-[var(--radius-m)]" />
              <p className="poster tnum mt-7 text-[clamp(3.4rem,6vw,5.6rem)] text-deep">{d.hours}</p>
              <h3 className="display mt-3 text-[length:var(--t-3)]">{d.title}</h3>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {d.lines.map(l => <li key={l} className="py-3">{l}</li>)}
              </ul>
              <a href={`tours.html?day=${d.id}`} className="btn-text mt-5 inline-flex items-center gap-1.5 font-bold">Start my day from this <ArrowUpRight className="size-[18px]" aria-hidden /></a>
            </motion.article>
          ))}
        </div>
        <a href="tours.html" className="group mt-20 flex items-center justify-between gap-6 border-t-2 border-ink pt-6">
          <span className="display max-w-[34ch] text-[length:var(--t-3)]">Or build it from 22 real stops: forts, conch, rum cake, Rose Island, the&nbsp;pigs.</span>
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
            <figcaption className="mt-3 text-[15px] text-ink/80">The conch lesson: out of the shell, cleaned, then a bowl of fresh conch salad ($10, shares four).</figcaption>
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
      <Dock action={{ href: "#pickup", label: "Book pickup" }} hideWhile={["hero", "pickup"]} />
    </Page>
  )
}

mount(<Home />)
