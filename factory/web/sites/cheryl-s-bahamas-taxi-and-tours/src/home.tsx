import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Dialog } from "radix-ui"
import { ArrowLeft, ArrowRight, Check, Minus, Plus, X, PlaneLanding, MapPinned } from "lucide-react"
import { Page, Masthead, Dock, Contact, Photo, mount, useSignName, mailto, spring, ease, R, PHONE, TEL } from "./shared"
import { STOPS, KINDS, STARTS, PRESETS, feeFor, type Kind, type Stop } from "./stops"
import { order, legs as makeLegs, KMH } from "./route"
import { TourMap } from "./map"

const go = (id: string) => document.getElementById(id === "tour" ? "builder" : id)?.scrollIntoView({ behavior: "smooth", block: "start" })
const money = (n: number) => `$${n.toLocaleString("en-US")}`

/* ---------- the arrivals card: what will be waiting ---------- */
function NameCard({ name, small = false }: { name: string; small?: boolean }) {
  const t = name.trim()
  const shown = t || "Your name"
  const size = small ? Math.max(22, Math.min(40, 440 / Math.max(6, shown.length))) : Math.max(30, Math.min(64, 760 / Math.max(6, shown.length)))
  return (
    <div className="relative rounded-[6px] bg-white px-5 pb-5 pt-4 text-navy shadow-[0_1px_0_rgba(0,0,0,.04),0_18px_40px_-18px_rgba(13,26,54,.45)]">
      <div className="flex items-center justify-between border-b-2 border-yellow pb-2 text-[12px] font-bold">
        <span className="font-display text-[15px] font-extrabold tracking-[-0.03em]">cheryl's</span>
        <span className={`tnum text-ink/60 ${small ? "hidden sm:inline" : ""}`}>Nassau arrivals</span>
      </div>
      <p className={`display mt-4 break-words leading-[1] ${t ? "" : "text-navy/30"}`} style={{ fontSize: size }}>
        {shown}
      </p>
    </div>
  )
}

/* ---------- screen 1: the two paths ---------- */
function Hero({ name, setName, flight, setFlight, startId, setStartId, loadDay }: {
  name: string; setName: (v: string) => void; flight: string; setFlight: (v: string) => void
  startId: string; setStartId: (v: string) => void; loadDay: (k: string) => void
}) {
  const [path, setPath] = useState<"pickup" | "tour">("pickup")
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative bg-navy text-white">
      <Masthead />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 pb-24 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-10">
        <div className="lg:col-span-7">
          <p className="tnum text-[15px] font-bold text-yellow">Taxi Service #1080 · 25+ years<span className="hidden sm:inline"> · English or Spanish</span></p>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.05 }}
            className="poster mt-4 text-[clamp(3rem,13.4vw,4.4rem)] lg:text-[clamp(3.6rem,4.7vw,4.75rem)]">
            met at arrivals.<br /><span className="text-yellow">shown the island.</span>
          </motion.h1>

          <div className="relative mt-6 lg:hidden">
            <Photo src={R("cheryl-taxi.jpeg")} eager alt="Two Cheryl's drivers in navy and yellow uniforms beside the company's white passenger van" ratio="16 / 9" pos="44% 55%" className="rounded-[var(--radius-m)]" />
            <div className="absolute -bottom-4 right-2 w-[58%] rotate-[-2deg]"><NameCard name={name} small /></div>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.18 }}
            className="on-light mt-10 overflow-hidden rounded-[var(--radius-l)] bg-card text-ink lg:mt-10">
            <div className="grid grid-cols-2" role="tablist" aria-label="What would you like to book?">
              {([["pickup", "Airport pickup", "Your name on a card at arrivals", PlaneLanding], ["tour", "Private tour", "Build your day on the map", MapPinned]] as const).map(([k, t, d, Icon]) => (
                <button key={k} role="tab" aria-selected={path === k} aria-controls={`path-${k}`} id={`tab-${k}`} onClick={() => setPath(k)}
                  className={`relative flex min-h-[84px] items-start gap-3 px-4 py-4 text-left transition-colors sm:px-6 ${path === k ? "bg-card" : "bg-paper-2 text-ink/75 hover:bg-[#dcdfd8]"}`}>
                  <Icon className="mt-1 hidden size-6 shrink-0 text-navy sm:block" strokeWidth={2} aria-hidden />
                  <span><span className="display block text-[20px] sm:text-[24px]">{t}</span><span className="mt-0.5 block text-[14px] text-muted sm:text-[15px]">{d}</span></span>
                  {path === k && <motion.span layoutId="tabbar" className="absolute inset-x-0 top-0 h-[4px] bg-yellow" transition={spring} />}
                </button>
              ))}
            </div>
            <div className="p-4 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                {path === "pickup" ? (
                  <motion.form key="p" id="path-pickup" role="tabpanel" aria-labelledby="tab-pickup" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease }}
                    onSubmit={e => { e.preventDefault(); go("pickup") }} className="grid gap-4 sm:grid-cols-[1.2fr_1fr_auto] sm:items-end">
                    <div className="field"><label htmlFor="h-name">Name on the card</label><input id="h-name" value={name} onChange={e => setName(e.target.value.slice(0, 28))} autoComplete="name" placeholder="e.g. The Alvarez family" /></div>
                    <div className="field"><label htmlFor="h-flight">Arrival flight</label><input id="h-flight" value={flight} onChange={e => setFlight(e.target.value.slice(0, 20))} placeholder="e.g. AA 1234" /></div>
                    <button className="btn btn-primary">Book my pickup <ArrowRight className="size-[18px]" aria-hidden /></button>
                  </motion.form>
                ) : (
                  <motion.div key="t" id="path-tour" role="tabpanel" aria-labelledby="tab-tour" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease }}>
                    <p className="lab text-[15px] font-bold" id="h-start">Where are you staying?</p>
                    <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="h-start">
                      {STARTS.filter(s => s.id !== "airport").map(s => (
                        <button key={s.id} type="button" aria-pressed={startId === s.id} onClick={() => setStartId(s.id)}
                          className={`min-h-11 rounded-full border-[1.5px] px-4 text-[15px] font-bold transition-colors ${startId === s.id ? "border-navy bg-navy text-white" : "border-line hover:border-navy"}`}>{s.label}</button>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <button type="button" onClick={() => { go("tour") }} className="btn btn-primary">Pick stops on the map <ArrowRight className="size-[18px]" aria-hidden /></button>
                      <span className="text-[15px] text-muted">or start from <button type="button" onClick={() => loadDay("short")} className="font-bold text-ink underline decoration-2 underline-offset-4">3 hours</button> · <button type="button" onClick={() => loadDay("full")} className="font-bold text-ink underline decoration-2 underline-offset-4">a full day</button></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <p className="mt-5 text-[15px] text-white/80">Rather talk? <a href={TEL} className="tnum font-bold text-white underline decoration-yellow decoration-2 underline-offset-4">{PHONE}</a>, day or night.</p>
        </div>

        <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, stiffness: 150, delay: 0.3 }} className="hidden lg:col-span-5 lg:block lg:pt-4">
          <div className="relative mx-auto max-w-[460px]">
            <Photo src={R("cheryl-taxi.jpeg")} eager alt="Two Cheryl's drivers in navy and yellow uniforms beside the company's white passenger van" ratio="4 / 5" pos="44% 60%" className="rounded-[var(--radius-l)]" />
            <div className="absolute -bottom-6 -left-4 w-[64%] rotate-[-2.5deg] sm:-left-8"><NameCard name={name} small /></div>
          </div>
          <figcaption className="mx-auto mt-10 max-w-[460px] text-[14px] text-white/75">Cheryl's drivers, in the navy and yellow you will look for at arrivals.</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

/* ---------- screen 2: the pickup flow ---------- */
const STEPS = ["Flight", "Who", "Hotel"] as const

function Pickup({ name, setName, flight, setFlight }: { name: string; setName: (v: string) => void; flight: string; setFlight: (v: string) => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<boolean[]>([false, false, false])
  const [trip, setTrip] = useState<"One way" | "Round trip">("Round trip")
  const [car, setCar] = useState<"Van" | "SUV">("Van")
  const [people, setPeople] = useState(2)
  const [groceries, setGroceries] = useState(false)
  const [f, setF] = useState({ arrWhen: "", depFlight: "", depWhen: "", contact: "", kids: "", hotel: "", bags: "", phone: "", note: "" })
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
      `Arrival flight: ${flight}`, `Arrival date and time: ${f.arrWhen}`,
      trip === "Round trip" && `Departure flight: ${f.depFlight}`, trip === "Round trip" && `Departure date and time: ${f.depWhen}`,
      `Hotel or tower: ${f.hotel}`, f.kids && `Children and seats: ${f.kids}`,
      `Grocery shopping before arrival: ${groceries ? "Yes please (service fee applies)" : "No"}`,
      f.bags && `Bags: ${f.bags}`, "", `Contact: ${f.contact}  ${f.phone}`, f.note && `Note to driver: ${f.note}`,
    ])
    setSent(true)
  }

  const stub: { label: string; lines: string[] }[] = [
    { label: "Flight", lines: [flight && `${flight}, lands ${when(f.arrWhen)}`, trip === "Round trip" && f.depFlight && `${f.depFlight}, leaves ${when(f.depWhen)}`].filter(Boolean) as string[] },
    { label: "Who", lines: [f.contact, `${people} guest${people > 1 ? "s" : ""}, ${car === "Van" ? "private van" : "luxury SUV"}`, f.kids].filter(Boolean) as string[] },
    { label: "Hotel", lines: [f.hotel, groceries && "Groceries waiting"].filter(Boolean) as string[] },
  ]

  return (
    <section id="pickup" aria-labelledby="pickup-title" className="on-light scroll-mt-2 bg-paper">
      <div className="mx-auto max-w-[1360px] px-4 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 id="pickup-title" className="poster max-w-[14ch] text-[length:var(--t-2)]">your airport pickup, in three steps.</h2>
          <p className="max-w-[40ch] text-[length:var(--t-4)] leading-snug text-muted">Every field Cheryl's asks for today, on one ticket. It arrives in her inbox as one complete booking.</p>
        </div>

        <form onSubmit={submit} className="mt-10 grid overflow-hidden rounded-[var(--radius-l)] bg-card shadow-[0_30px_60px_-40px_rgba(13,26,54,.45)] lg:mt-14 lg:grid-cols-[420px_28px_1fr]">
          <div className="flex flex-col gap-7 bg-yellow p-5 sm:p-8">
            <div>
              <p className="text-[15px] font-bold">This card will be waiting at arrivals</p>
              <div className="mt-3"><NameCard name={name} /></div>
              <label htmlFor="p-name" className="sr-only">Name on the arrival sign</label>
              <input id="p-name" value={name} onChange={e => setName(e.target.value.slice(0, 28))} placeholder="Type the name for the card"
                className="mt-3 w-full rounded-[10px] border-[1.5px] border-ink/25 bg-white/60 px-3 py-2.5 text-[16px] focus:border-ink focus:outline-none" />
            </div>
            <ol className="flex flex-col gap-5">
              {stub.map((s, i) => (
                <li key={s.label} className="grid grid-cols-[32px_1fr] gap-3">
                  <span className={`grid size-8 place-items-center rounded-full text-[14px] font-bold transition-colors ${done[i] ? "bg-navy text-yellow" : "border-2 border-ink/40 text-ink/75"}`}>
                    {done[i] ? <Check className="size-4" aria-hidden /> : i + 1}
                  </span>
                  <div className="min-h-[48px]">
                    <p className="display text-[20px]">{s.label}</p>
                    <AnimatePresence initial={false}>
                      {done[i] && s.lines.map(l => (
                        <motion.p key={l} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring} className="tnum text-[15px] leading-snug">{l}</motion.p>
                      ))}
                    </AnimatePresence>
                    {!done[i] && <p className="text-[15px] text-ink/75">{i === step ? "Filling in now" : "To come"}</p>}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-auto text-[14px] text-ink/80">From Nassau airport to anywhere on New Providence. Car and booster seats free.</p>
          </div>
          <div className="perf-ink h-[28px] w-full bg-card lg:h-auto" aria-hidden />

          <div className="flex flex-col p-5 sm:p-8 lg:p-10">
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
                    <div className="field"><label htmlFor="arrFlight">Arrival airline and flight number</label><input id="arrFlight" required value={flight} onChange={e => setFlight(e.target.value.slice(0, 20))} placeholder="e.g. AA 1234" /></div>
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
                      <Counter label="passengers" value={people} set={setPeople} min={1} max={30} />
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
                      <label className="!mb-0 !flex min-h-[50px] cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] border-line px-4 font-normal">
                        <input type="checkbox" checked={groceries} onChange={e => setGroceries(e.target.checked)} className="!min-h-0 !w-5 !p-0 size-5 shrink-0 accent-[#14254a]" />
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
              <button type="submit" className="btn btn-navy ml-auto">
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

function Counter({ label, value, set, min, max }: { label: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      <button type="button" aria-label={`Fewer ${label}`} disabled={value <= min} onClick={() => set(Math.max(min, value - 1))} className="grid size-11 place-items-center rounded-[10px] border-[1.5px] border-line disabled:opacity-40"><Minus className="size-4" aria-hidden /></button>
      <output className="tnum w-10 text-center font-display text-[24px] font-bold" aria-live="polite">{value}</output>
      <button type="button" aria-label={`More ${label}`} disabled={value >= max} onClick={() => set(Math.min(max, value + 1))} className="grid size-11 place-items-center rounded-[10px] border-[1.5px] border-line disabled:opacity-40"><Plus className="size-4" aria-hidden /></button>
    </div>
  )
}

/* ---------- screen 3: the tour builder ---------- */
function StopRow({ s, n, toggle, focus, setFocus, setHover }: { s: Stop; n: number; toggle: () => void; focus: boolean; setFocus: () => void; setHover: (v: string | null) => void }) {
  return (
    <li id={`stop-${s.id}`} onPointerEnter={e => { if (e.pointerType === "mouse") setHover(s.id) }} onPointerLeave={() => setHover(null)}
      className={`grid grid-cols-[72px_1fr_auto] items-center gap-3 border-b border-line py-3 transition-colors ${focus ? "bg-yellow/25" : ""}`}>
      <button type="button" onClick={setFocus} aria-label={`Show ${s.name} on the map`} className="block overflow-hidden rounded-[8px]">
        <Photo src={R(s.img)} alt="" ratio="4 / 3" className="w-[72px]" />
      </button>
      <div className="min-w-0">
        <button type="button" onClick={setFocus} className="display block text-left text-[18px] leading-tight hover:underline">{s.name}</button>
        {s.note && <p className="tnum mt-0.5 text-[14px] text-muted">{s.note}</p>}
      </div>
      <button type="button" onClick={toggle} aria-pressed={!!n} aria-label={n ? `Remove ${s.name} from my day` : `Add ${s.name} to my day`}
        className={`grid size-11 place-items-center rounded-full border-[1.5px] font-bold transition-colors ${n ? "border-navy bg-navy text-yellow" : "border-navy/40 text-navy hover:border-navy hover:bg-navy/5"}`}>
        {n ? <span className="tnum text-[15px]">{n}</span> : <Plus className="size-5" aria-hidden />}
      </button>
    </li>
  )
}

function SendDay({ open, setOpen, route, startLabel, adults, kids, setAdults, setKids, km, mins, fees, name }: {
  open: boolean; setOpen: (v: boolean) => void; route: Stop[]; startLabel: string; adults: number; kids: number
  setAdults: (n: number) => void; setKids: (n: number) => void; km: number; mins: number; fees: { lo: number; hi: number }; name: string
}) {
  const [lang, setLang] = useState<"English" | "Spanish">("English")
  const [len, setLen] = useState<"3 hours" | "Full day" | "Not sure">(route.length > 3 ? "Full day" : "3 hours")
  const [f, setF] = useState({ who: name, contact: "", date: "", note: "" })
  const send = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = mailto(`Private tour request: ${route.length} stops`, [
      `Name: ${f.who}`, `Phone or email: ${f.contact}`, `Date: ${f.date}`,
      `Guests: ${adults} adult${adults > 1 ? "s" : ""}${kids ? `, ${kids} child${kids > 1 ? "ren" : ""}` : ""}`,
      `Language: ${lang}`, `Length: ${len}`, `Starting from: ${startLabel}`, "",
      "Stops, in this order:", ...route.map((s, i) => `${i + 1}. ${s.name}`), "",
      `Planner estimate: about ${Math.round(km)} km by road, ${mins} min of driving.`,
      fees.hi > 0 && `Entry fees listed on your site: about ${money(fees.lo)}${fees.hi !== fees.lo ? ` to ${money(fees.hi)}` : ""}.`,
      f.note && `\nNotes: ${f.note}`,
    ])
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay asChild><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[9000] bg-navy-2/50" /></Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} transition={spring} data-lenis-prevent
            className="on-light fixed inset-y-0 right-0 z-[9001] flex w-full max-w-[520px] flex-col overflow-y-auto bg-paper p-5 text-ink sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="poster text-[40px]">send my day.</Dialog.Title>
                <Dialog.Description className="mt-2 text-muted">Cheryl's replies with the fare for your group and confirms the timing.</Dialog.Description>
              </div>
              <Dialog.Close className="grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-line" aria-label="Close"><X className="size-5" aria-hidden /></Dialog.Close>
            </div>
            <ol className="mt-6 flex flex-wrap gap-2">
              {route.map((s, i) => <li key={s.id} className="rounded-full bg-navy px-3 py-1.5 text-[14px] font-bold text-white"><span className="tnum text-yellow">{i + 1}</span> {s.short}</li>)}
            </ol>
            <form onSubmit={send} className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="field sm:col-span-2"><label htmlFor="d-who">Your name</label><input id="d-who" required value={f.who} onChange={e => setF({ ...f, who: e.target.value })} autoComplete="name" /></div>
              <div className="field"><label htmlFor="d-contact">Phone or email</label><input id="d-contact" required value={f.contact} onChange={e => setF({ ...f, contact: e.target.value })} /></div>
              <div className="field"><label htmlFor="d-date">Date</label><input id="d-date" type="date" required value={f.date} onChange={e => setF({ ...f, date: e.target.value })} /></div>
              <div className="field"><span className="lab">Adults</span><Counter label="adults" value={adults} set={setAdults} min={1} max={30} /></div>
              <div className="field"><span className="lab">Children</span><Counter label="children" value={kids} set={setKids} min={0} max={20} /></div>
              <div className="field"><span className="lab" id="d-lang">Language</span>
                <div className="seg w-full" role="group" aria-labelledby="d-lang">{(["English", "Spanish"] as const).map(l => <button type="button" key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l}</button>)}</div></div>
              <div className="field"><span className="lab" id="d-len">Length</span>
                <div className="seg w-full" role="group" aria-labelledby="d-len">{(["3 hours", "Full day", "Not sure"] as const).map(l => <button type="button" key={l} aria-pressed={len === l} onClick={() => setLen(l)}>{l}</button>)}</div></div>
              <div className="field sm:col-span-2"><label htmlFor="d-note">Anything else? A birthday, a cruise departure time</label><textarea id="d-note" value={f.note} onChange={e => setF({ ...f, note: e.target.value })} /></div>
              <button className="btn btn-navy sm:col-span-2">Send my day to Cheryl's <ArrowRight className="size-[18px]" aria-hidden /></button>
              <p className="text-[14px] text-muted sm:col-span-2">Opens your email app with everything filled in. Or call <a href={TEL} className="tnum font-bold text-ink underline underline-offset-4">{PHONE}</a>.</p>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Tour({ ids, setIds, startId, setStartId, name }: { ids: string[]; setIds: (f: (v: string[]) => string[]) => void; startId: string; setStartId: (v: string) => void; name: string }) {
  const [kind, setKind] = useState<Kind | "All">("All")
  const [focus, setFocus] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const start = STARTS.find(s => s.id === startId)!
  const route = useMemo(() => order(start.at, ids), [start, ids])
  const lg = useMemo(() => makeLegs(start.at, route), [start, route])
  const km = lg.reduce((a, l) => a + l.km, 0)
  const mins = Math.max(0, Math.round((km / KMH) * 60 / 5) * 5)
  const fees = route.reduce((a, s) => { const f = feeFor(s.id, adults, kids); return f ? { lo: a.lo + f.lo, hi: a.hi + f.hi } : a }, { lo: 0, hi: 0 })
  const quoted = route.filter(s => !feeFor(s.id, adults, kids)).length
  const toggle = (id: string) => setIds(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  const n = (id: string) => { const i = route.findIndex(s => s.id === id); return i < 0 ? 0 : i + 1 }
  const fs = focus ? STOPS.find(s => s.id === focus)! : null
  const list = STOPS.filter(s => kind === "All" || s.kind === kind)
  const pick = (id: string) => { setFocus(id); const el = document.getElementById(`stop-${id}`); const box = el?.closest("[data-list]"); if (el && box && window.matchMedia("(min-width: 1024px)").matches) box.scrollTo({ top: el.offsetTop - 120, behavior: "smooth" }) }

  return (
    <section id="tour" aria-labelledby="tour-title" className="on-light scroll-mt-2 bg-paper-2">
      <div className="mx-auto max-w-[1360px] px-4 pt-20 sm:px-8 lg:pt-28">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 id="tour-title" className="poster max-w-[20ch] text-[length:var(--t-2)] lg:text-[clamp(2.6rem,4.4vw,4.4rem)]">draw your day on the island.</h2>
          <p className="max-w-[44ch] text-[length:var(--t-4)] leading-snug text-muted">Every tour is private, with drinks on board. Tap the stops you want: the route, the driving and the entry fees add up as you go.</p>
        </div>
      </div>

      <div id="builder" className="mx-auto mt-10 max-w-[1360px] scroll-mt-4 pb-20 sm:px-8 lg:mt-12 lg:pb-28">
        <div className="grid overflow-hidden bg-card sm:rounded-[var(--radius-l)] lg:h-[min(820px,calc(100svh-48px))] lg:grid-cols-[420px_1fr]">
          {/* map (phone: sticky at the top of the builder) */}
          <div className="sticky top-0 z-20 h-[44svh] min-h-[300px] lg:static lg:order-2 lg:flex lg:h-auto lg:flex-col">
            <div className="relative h-full lg:flex-1">
              <TourMap start={start} stops={route} legs={lg} focus={focus} hover={hover} onPick={pick} />
              <AnimatePresence>
                {fs && (
                  <motion.div key={fs.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={spring}
                    className="absolute bottom-3 left-3 right-3 z-10 grid grid-cols-[96px_1fr] gap-3 rounded-[14px] bg-white p-3 shadow-[0_18px_40px_-16px_rgba(13,26,54,.45)] sm:right-auto sm:w-[440px] sm:grid-cols-[132px_1fr]">
                    <Photo src={R(fs.img)} alt={fs.name} ratio="4 / 3" className="rounded-[8px]" />
                    <div className="min-w-0 pr-8">
                      <p className="display text-[18px] leading-tight">{fs.name}</p>
                      <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-muted sm:line-clamp-3">{fs.line}</p>
                      <button type="button" onClick={() => toggle(fs.id)} className={`mt-2 inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-bold ${n(fs.id) ? "border-[1.5px] border-navy text-navy" : "bg-navy text-white"}`}>
                        {n(fs.id) ? <>Remove from my day</> : <><Plus className="size-4" aria-hidden />Add to my day</>}
                      </button>
                    </div>
                    <button type="button" onClick={() => setFocus(null)} aria-label="Close" className="absolute right-1.5 top-1.5 grid size-10 place-items-center rounded-full text-ink/70 hover:bg-paper"><X className="size-4" aria-hidden /></button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* the day, desktop */}
            <DaySummary className="hidden lg:flex" route={route} km={km} mins={mins} fees={fees} quoted={quoted} adults={adults} kids={kids} onSend={() => setOpen(true)} onClear={() => setIds(() => [])} />
          </div>

          {/* stops */}
          <div className="flex min-h-0 flex-col border-line lg:order-1 lg:border-r">
            <div className="border-b border-line px-4 pb-3 pt-5 sm:px-6">
              <p className="text-[15px] font-bold" id="t-start">Starting and ending at</p>
              <select aria-labelledby="t-start" value={startId} onChange={e => setStartId(e.target.value)}
                className="mt-2 min-h-11 w-full rounded-[10px] border-[1.5px] border-line bg-white px-3 font-bold">
                {STARTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <div className="scroll-thin -mx-1 mt-3 flex gap-1 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter stops">
                {(["All", ...KINDS] as const).map(k => (
                  <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}
                    className={`min-h-10 shrink-0 rounded-full px-3.5 text-[14px] font-bold transition-colors ${kind === k ? "bg-navy text-white" : "text-muted hover:bg-paper"}`}>{k === "Culture and shopping" ? "Culture" : k === "Beach and water" ? "Water" : k}</button>
                ))}
              </div>
            </div>
            <ul data-list data-lenis-prevent className="scroll-thin relative min-h-0 flex-1 overflow-y-auto px-4 pb-28 sm:px-6 lg:pb-4">
              {list.map(s => <StopRow key={s.id} s={s} n={n(s.id)} toggle={() => toggle(s.id)} focus={focus === s.id} setFocus={() => pick(s.id)} setHover={setHover} />)}
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-[75ch] px-4 text-[14px] text-muted sm:px-0">Driving times are a planning estimate. Cheryl's confirms the order, the timing and the fare for your group. Historic sites usually charge $3 to $5.</p>
      </div>

      {/* the day, phone: a bar under the thumb */}
      <DaySummary className="fixed inset-x-0 bottom-0 z-[7999] lg:hidden" bar route={route} km={km} mins={mins} fees={fees} quoted={quoted} adults={adults} kids={kids} onSend={() => setOpen(true)} onClear={() => setIds(() => [])} />
      <SendDay open={open} setOpen={setOpen} route={route} startLabel={start.label} adults={adults} kids={kids} setAdults={setAdults} setKids={setKids} km={km} mins={mins} fees={fees} name={name} />
    </section>
  )
}

function DaySummary({ className = "", bar = false, route, km, mins, fees, quoted, adults, kids, onSend, onClear }: {
  className?: string; bar?: boolean; route: Stop[]; km: number; mins: number; fees: { lo: number; hi: number }; quoted: number; adults: number; kids: number; onSend: () => void; onClear: () => void
}) {
  const [inView, setInView] = useState(!bar)
  useEffect(() => {
    if (!bar) return
    const el = document.getElementById("tour"); if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "-30% 0px -10% 0px" })
    io.observe(el); return () => io.disconnect()
  }, [bar])
  useEffect(() => { if (bar) document.documentElement.style.setProperty("--tourbar", inView ? "1" : "0") }, [bar, inView])
  const ppl = `${adults + kids} guest${adults + kids > 1 ? "s" : ""}`
  const feeText = fees.hi ? `${money(fees.lo)}${fees.hi !== fees.lo ? `-${money(fees.hi)}` : ""}` : "$0"
  if (bar) return (
    <motion.div initial={false} animate={{ y: inView ? 0 : 140 }} transition={spring} aria-hidden={!inView} className={`${className} px-3 pb-[calc(10px+env(safe-area-inset-bottom))]`}>
      <div className="flex items-center gap-3 rounded-[18px] bg-navy p-2 pl-4 text-white shadow-[0_14px_40px_-12px_rgba(13,26,54,.6)]">
        <p className="tnum min-w-0 flex-1 text-[14px] leading-tight">
          {route.length ? <><b className="text-yellow">{route.length} stop{route.length > 1 ? "s" : ""}</b> · {Math.round(km)} km · about {mins} min</> : <>Tap stops to draw your day</>}
        </p>
        <button type="button" disabled={!route.length} tabIndex={inView ? undefined : -1} onClick={onSend} className="min-h-12 shrink-0 rounded-[12px] bg-yellow px-4 font-bold text-ink disabled:opacity-50">Send my day</button>
      </div>
    </motion.div>
  )
  return (
    <div className={`${className} items-center gap-6 border-t border-line bg-white px-6 py-4`}>
      <dl className="tnum grid flex-1 grid-cols-4 gap-4">
        {[["Stops", String(route.length)], ["By road", `${Math.round(km)} km`], ["Driving, estimate", `${mins} min`], [`Entry fees, ${ppl}`, feeText]].map(([t, v]) => (
          <div key={t}><dt className="text-[13px] text-muted">{t}</dt><dd className="display text-[26px]">{v}</dd></div>
        ))}
      </dl>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <button type="button" disabled={!route.length} onClick={onSend} className="btn btn-primary disabled:opacity-50">Send my day <ArrowRight className="size-[18px]" aria-hidden /></button>
        {route.length > 0 ? <button type="button" onClick={onClear} className="min-h-10 text-[13px] text-muted underline underline-offset-2">Clear{quoted ? ` · ${quoted} stop${quoted > 1 ? "s" : ""} priced by Cheryl's` : ""}</button> : <span className="text-[13px] text-muted">Add a stop to begin</span>}
      </div>
    </div>
  )
}

/* ---------- screen 4: example days ---------- */
const DAYS = [
  { id: "short", hours: "3 hours", title: "Sightseeing and shopping", img: "shopping.jpeg", alt: "The straw market in Nassau, walls of handmade bags and hats", pos: "50% 40%",
    lines: ["Paradise Island and Atlantis", "The 66 Steps at Fort Fincastle", "Jaws Beach", "Souvenir shopping, with help on what a fair price is"] },
  { id: "full", hours: "8 hours +", title: "A full day out, picnic included", img: "desertedbeaches.jpeg", alt: "A quiet beach on New Providence shaded by casuarina trees", pos: "50% 60%",
    lines: ["The 66 Steps", "Snorkelling at Jaws Beach, away from the crowds", "A picnic lunch, drinks kept cold on ice", "Picnic for groups of six or more"] },
]

function Days({ loadDay }: { loadDay: (k: string) => void }) {
  return (
    <section aria-labelledby="days-title" className="on-light bg-paper">
      <div className="mx-auto max-w-[1360px] px-4 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="days-title" className="poster text-[length:var(--t-2)] lg:col-span-6">or start from a day guests love.</h2>
          <p className="max-w-[42ch] text-[length:var(--t-4)] leading-snug text-muted lg:col-span-5 lg:col-start-8">Two of Cheryl's own sample tours. Load one onto the map, then add or take away whatever you like.</p>
        </div>
        <div className="mt-12 grid gap-16 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          {DAYS.map((d, i) => (
            <motion.article key={d.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ ...spring, delay: i * 0.08 }}
              className={i ? "lg:mt-24" : ""}>
              <Photo src={R(d.img)} alt={d.alt} ratio="3 / 2" pos={d.pos} className="max-w-[600px] rounded-[var(--radius-m)]" />
              <p className="poster tnum mt-7 text-[clamp(3rem,5.4vw,5rem)] text-navy">{d.hours}</p>
              <h3 className="display mt-2 text-[length:var(--t-3)]">{d.title}</h3>
              <ul className="mt-5 max-w-[560px] divide-y divide-line border-y border-line">
                {d.lines.map(l => <li key={l} className="py-3">{l}</li>)}
              </ul>
              <button type="button" onClick={() => loadDay(d.id)} className="btn btn-navy mt-6">Load this day on the map <ArrowRight className="size-[18px]" aria-hidden /></button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- screen 5: why Cheryl's ---------- */
const WHY: [string, string, string][] = [
  ["#1080", "Licensed.", "Registered Taxi Service #1080 in The Bahamas, with trained drivers who know every road from the western end to the eastern end."],
  ["25+", "Years on the island.", "Taxis and private tours across Nassau and Paradise Island for over 25 years. TripAdvisor Travellers' Choice 2022."],
  ["0", "Dollars for car seats.", "Car and booster seats are free. Baby-sitting and wheelchair rentals can be added to your stay."],
  ["2", "Languages.", "Tours in English or Spanish, and Spanish translators for events, outings and the day to day."],
]

function Why() {
  return (
    <section aria-labelledby="why-title" className="on-light bg-yellow">
      <div className="mx-auto grid max-w-[1360px] gap-14 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="why-title" className="poster max-w-[10ch] text-[length:var(--t-2)]">why families ride with cheryl's.</h2>
          <figure className="mt-10 max-w-[480px]">
            <Photo src={R("fleet.jpeg")} alt="Cheryl's air-conditioned vans and SUVs lined up" ratio="3 / 2" className="rounded-[var(--radius-m)]" />
            <figcaption className="mt-3 text-[15px] text-ink/80">The air-conditioned fleet: private vans and luxury SUVs. Drinks on every tour: Bahama Mama, beer, sodas and water.</figcaption>
          </figure>
        </div>
        <ol className="lg:col-span-7 lg:pt-2">
          {WHY.map(([big, t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ ...spring, delay: i * 0.05 }}
              className="grid grid-cols-[104px_1fr] gap-6 border-t-2 sm:grid-cols-[250px_1fr] sm:gap-10 border-ink/80 py-6 first:border-t-0 first:pt-0 sm:gap-8">
              <span className="poster tnum text-[clamp(1.75rem,3.4vw,3rem)] leading-[.9] text-navy">{big}</span>
              <div><p className="display text-[length:var(--t-3)]">{t}</p><p className="mt-1 max-w-[46ch] text-[17px] leading-snug text-ink/85">{d}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Home() {
  const [name, setName] = useSignName()
  const [flight, setFlight] = useState("")
  const [ids, setIds] = useState<string[]>([])
  const [startId, setStartId] = useState("cable")
  const loadDay = (k: string) => { setIds(() => PRESETS[k].ids); go("tour") }
  return (
    <Page>
      <main id="main">
        <Hero name={name} setName={setName} flight={flight} setFlight={setFlight} startId={startId} setStartId={setStartId} loadDay={loadDay} />
        <Pickup name={name} setName={setName} flight={flight} setFlight={setFlight} />
        <Tour ids={ids} setIds={setIds} startId={startId} setStartId={setStartId} name={name} />
        <Days loadDay={loadDay} />
        <Why />
      </main>
      <Contact />
      <Dock action={{ href: "#pickup", label: "Book pickup" }} hideWhile={["hero", "pickup", "tour", "builder"]} />
    </Page>
  )
}

mount(<Home />)
