import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IMG, EMAIL, PHONE, TEL, Label, Reveal, ease } from "./site"

/* ---------- rooms (conchinn.com/rooms) ---------- */
export type Room = { id: string; name: string; view: string; sleeps: string; beds: string[]; has: string[]; img?: string; alt?: string }
export const ROOMS: Room[] = [
  { id: "dq", name: "Garden View Double Queen", view: "Garden view", sleeps: "Two queen beds", beds: ["Two queen beds"], has: ["Desk", "Balcony", "Mini refrigerator", "Keurig coffee maker", "Walk-in shower"], img: IMG.queen, alt: "Garden View Double Queen room with two queen beds at the Conch Inn" },
  { id: "sk", name: "Garden View Single King", view: "Garden view", sleeps: "One king bed", beds: ["King bed"], has: ["Desk", "Balcony", "Mini refrigerator", "Keurig coffee maker", "Walk-in shower"], img: IMG.king, alt: "A renovated guest room at the Conch Inn" },
  { id: "ks", name: "Marina View King Suite", view: "Marina view", sleeps: "King bed and sleeper sofa", beds: ["King bed", "Sleeper sofa"], has: ["Balcony", "Mini refrigerator", "Keurig coffee maker", "Large walk-in shower", "Microwave"], img: IMG.suite, alt: "Marina View suite at the Conch Inn" },
  { id: "kq", name: "Marina View King & Queen Suite", view: "Marina view", sleeps: "King bed and queen bed", beds: ["King bed", "Queen bed"], has: ["Balcony", "Mini refrigerator", "Keurig coffee maker", "Large walk-in shower", "Microwave"] },
  { id: "ap", name: "Harbour View Two Bed, Two Bath Apartment", view: "Harbour view", sleeps: "King, queen and sleeper sofa", beds: ["Bedroom 1: king bed, private bathroom", "Bedroom 2: queen bed, bathroom from bedroom and living room", "Sleeper sofa"], has: ["Full kitchen", "Keurig coffee maker", "Large walk-in shower", "Microwave", "Patio"] },
  { id: "ps", name: "Presidential Suite", view: "Marina view, two bed, two bath", sleeps: "Two kings and sleeper sofa", beds: ["Bedroom 1: king bed, private bathroom", "Bedroom 2: king bed, bathroom from bedroom and living room", "Sleeper sofa"], has: ["Full kitchen", "Keurig coffee maker", "Large walk-in shower", "Microwave", "Balcony"], img: IMG.presidential, alt: "The Presidential Suite, two bedrooms and two bathrooms over the marina" },
]

export function RoomSelector({ full = false }: { full?: boolean }) {
  const [id, setId] = useState(ROOMS[2].id)
  const room = ROOMS.find(r => r.id === id)!
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5" role="tablist" aria-label="Room types">
        {ROOMS.map((r, i) => (
          <button key={r.id} role="tab" aria-selected={r.id === id} onClick={() => setId(r.id)} className={`group flex w-full items-baseline gap-4 border-t border-line py-4 text-left transition last:border-b ${r.id === id ? "text-ink" : "text-muted hover:text-ink"}`}>
            <span className="label w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">
              <span className="block font-display text-[clamp(1.25rem,1.8vw,1.6rem)] leading-tight">{r.name}</span>
              <span className="mt-1 block text-[14px] text-muted">{r.view} · {r.sleeps}</span>
            </span>
            <ArrowRight className={`size-4 shrink-0 transition ${r.id === id ? "translate-x-0 text-harbour opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} aria-hidden />
          </button>
        ))}
      </div>
      <div className="lg:col-span-7" role="tabpanel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={room.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }}>
            {room.img ? (
              <div className="aspect-[953/600] overflow-hidden rounded-[6px] bg-paper-2">
                <img src={room.img} alt={room.alt} width={953} height={600} loading="lazy" className="size-full object-cover transition duration-700 hover:scale-[1.03]" />
              </div>
            ) : (
              <div className="flex aspect-[953/600] flex-col justify-between rounded-[6px] bg-conch p-6 md:p-10">
                <p className="label text-ink/70">Inside the {room.view.toLowerCase()} rooms</p>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {[...room.beds, ...room.has].map(x => <li key={x} className="border-t border-ink/15 pt-3 font-display text-[clamp(1.1rem,1.6vw,1.45rem)] leading-snug">{x}</li>)}
                </ul>
              </div>
            )}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="label text-harbour">{room.view}</p>
                <h3 className="mt-2 font-display text-[1.75rem] leading-tight">{room.name}</h3>
                <p className="mt-2 text-[15px] text-muted">Rates on request. The office replies by email or phone.</p>
              </div>
              <ul className="grid grid-cols-1 gap-1.5 text-[15px] sm:grid-cols-2 md:grid-cols-1">
                {(full ? [...room.beds, ...room.has] : [...room.beds, ...room.has].slice(0, 5)).map(x => <li key={x} className="flex gap-2"><span className="mt-[9px] size-1 shrink-0 rounded-full bg-harbour" aria-hidden />{x}</li>)}
              </ul>
            </div>
            <a href={`index.html#enquire`} onClick={() => window.dispatchEvent(new CustomEvent("conch:prefill", { detail: { tab: "room", room: room.name } }))} className="btn btn-quiet mt-6">Ask about the {room.name.replace("Harbour View Two Bed, Two Bath ", "")} <ArrowUpRight className="size-4" aria-hidden /></a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- dockage calculator (conchinn.com/marina rates) ---------- */
const RATES = [
  { key: "1", label: "1 night", rate: 3.75, test: (n: number) => n === 1 },
  { key: "2", label: "2+ nights", rate: 3.25, test: (n: number) => n >= 2 && n < 30 },
  { key: "30", label: "30+ nights", rate: 2.25, test: (n: number) => n >= 30 },
]
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function Num({ id, label, value, set, min, max, unit }: { id: string; label: string; value: number; set: (n: number) => void; min: number; max: number; unit: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="label text-ink/70">{label}</span>
      <span className="mt-2 flex items-baseline gap-2 border-b border-ink/25 transition focus-within:border-harbour">
        <input id={id} type="number" inputMode="numeric" min={min} max={max} value={value} onChange={e => set(Math.max(min, Math.min(max, Number(e.target.value) || min)))} className="min-h-12 w-full bg-transparent font-display text-[2.2rem] tabular-nums outline-none" />
        <span className="text-[15px] text-ink/60">{unit}</span>
      </span>
      <input type="range" aria-label={`${label} slider`} min={min} max={max} value={value} onChange={e => set(Number(e.target.value))} className="range mt-3 w-full" />
    </label>
  )
}

export function DockCalculator() {
  const [loa, setLoa] = useState(42)
  const [beam, setBeam] = useState(22)
  const [nights, setNights] = useState(3)
  const [stop, setStop] = useState(false)
  const tier = RATES.find(r => r.test(nights)) ?? RATES[0]
  const total = useMemo(() => stop ? loa * 1 : loa * tier.rate * nights, [loa, tier, nights, stop])
  const wide = beam > 30
  const send = () => window.dispatchEvent(new CustomEvent("conch:prefill", { detail: { tab: "slip", loa: String(loa), beam: String(beam), nights: stop ? "Short stop, up to 3 hours" : String(nights) } }))
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="inline-flex rounded-full bg-paper/60 p-1" role="radiogroup" aria-label="Type of stay">
          {[["Overnight", false], ["Short stop, up to 3 hours", true]].map(([l, v]) => (
            <button key={String(l)} role="radio" aria-checked={stop === v} onClick={() => setStop(v as boolean)} className={`min-h-11 rounded-full px-4 text-[14px] transition md:px-5 md:text-[15px] ${stop === v ? "bg-ink text-paper" : "text-ink hover:bg-paper"}`}>{l as string}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <Num id="calc-loa" label="Length overall" value={loa} set={setLoa} min={15} max={130} unit="ft" />
          <Num id="calc-beam" label="Beam" value={beam} set={setBeam} min={5} max={40} unit="ft" />
          {!stop ? <Num id="calc-nights" label="Nights" value={nights} set={setNights} min={1} max={60} unit={nights === 1 ? "night" : "nights"} /> : <div className="hidden sm:block" />}
        </div>
        <AnimatePresence>
          {wide && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6 max-w-lg text-[15px] text-ink">
              Wider than the 30 ft catamarans the marina lists. Call the office on <a href={TEL} className="ulink">{PHONE}</a> before you plan on a slip.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col justify-between rounded-[6px] bg-ink p-6 text-paper md:p-8 lg:col-span-5">
        <div>
          <p className="label text-conch">Estimated dockage</p>
          <motion.p key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="mt-3 font-display text-[clamp(3rem,6vw,4.75rem)] leading-none tabular-nums">{money(total)}</motion.p>
          <p className="mt-3 text-[15px] text-paper/75">{stop ? `${loa} ft at $1.00 per foot, a slip assigned by the office on arrival.` : `${loa} ft × $${tier.rate.toFixed(2)} per foot × ${nights} ${nights === 1 ? "night" : "nights"}`}</p>
          {!stop && (
            <ul className="mt-6 grid grid-cols-3 gap-2 text-center">
              {RATES.map(r => (
                <li key={r.key} className={`rounded-[4px] border px-2 py-3 transition ${r === tier ? "border-conch bg-conch text-ink" : "border-paper/20 text-paper/70"}`}>
                  <span className="block font-display text-[1.35rem] tabular-nums">${r.rate.toFixed(2)}</span>
                  <span className="block text-[12px]">{r.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-8">
          <p className="text-[13px] leading-relaxed text-paper/65">Before metered power ($0.75 per kWh, 30 and 50 amp) and water ($0.10 per gallon). Rate is on length from bow pulpit to swim platform. Certain slips have a minimum length; taxes may apply. The office confirms the final figure.</p>
          <a href="#enquire" onClick={send} className="btn btn-light mt-6 w-full justify-center">Request a slip with these details <ArrowRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </div>
  )
}

/* ---------- enquiry (email, the office's own field list) ---------- */
const FORMS = {
  slip: { label: "Slip", intro: "The office asks for boat type, name, LOA, beam, draft and your dates. Fill them in once here.", fields: [["Boat type", "text", "Catamaran, sailboat, sportfish..."], ["Boat name", "text", ""], ["LOA (ft)", "number", ""], ["Beam (ft)", "number", ""], ["Draft (ft)", "number", ""], ["Power", "select", "30 amp|50 amp|Not needed"], ["Arriving", "date", ""], ["Departing", "date", ""]] },
  mooring: { label: "Mooring ball", intro: "Mooring balls are first come, first served. Tell the office when you expect to arrive.", fields: [["Boat name", "text", ""], ["LOA (ft)", "number", ""], ["Arriving", "date", ""], ["Nights", "number", ""]] },
  room: { label: "Room", intro: "Rooms, suites and apartments over the marina and the garden. Rates on request.", fields: [["Room", "select", ROOMS.map(r => r.name).join("|")], ["Arriving", "date", ""], ["Departing", "date", ""], ["Guests", "number", ""]] },
} as const
type FormKey = keyof typeof FORMS

export function Enquiry() {
  const [tab, setTab] = useState<FormKey>("slip")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail as Record<string, string>
      setTab(d.tab as FormKey)
      setVals(v => ({ ...v, ...(d.loa ? { "slip:LOA (ft)": d.loa, "slip:Beam (ft)": d.beam } : {}), ...(d.room ? { "room:Room": d.room } : {}), ...(d.nights ? { "slip:Note": `Planned stay: ${d.nights}` } : {}) }))
    }
    window.addEventListener("conch:prefill", on)
    return () => window.removeEventListener("conch:prefill", on)
  }, [])
  const set = (k: string, v: string) => setVals(s => ({ ...s, [k]: v }))
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = FORMS[tab]
    const lines = ["Hello Conch Inn & Marina,", "", `${f.label} enquiry`]
    for (const [name] of f.fields) { const v = vals[`${tab}:${name}`]; if (v) lines.push(`${name}: ${v}`) }
    if (vals[`slip:Note`] && tab === "slip") lines.push(vals["slip:Note"])
    for (const k of ["Name", "Email", "Message"]) if (vals[k]) lines.push(`${k}: ${vals[k]}`)
    lines.push("", "(sent from the website)")
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${f.label} request${vals[`${tab}:Boat name`] ? `: ${vals[`${tab}:Boat name`]}` : ""}`)}&body=${encodeURIComponent(lines.join("\n"))}`
    setSent(true)
  }
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-harbour"
  return (
    <form data-enquiry data-business="The Conch Inn & Marina" data-whatsapp="" data-email={EMAIL} action={`mailto:${EMAIL}`} method="post" encType="text/plain" onSubmit={submit} className="enquiry">
      <Tabs value={tab} onValueChange={v => setTab(v as FormKey)}>
        <TabsList className="h-auto w-full justify-start gap-1 rounded-full bg-paper-2 p-1 sm:w-fit">
          {(Object.keys(FORMS) as FormKey[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-1 rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper sm:flex-none">{FORMS[k].label}</TabsTrigger>)}
        </TabsList>
        {(Object.keys(FORMS) as FormKey[]).map(k => (
          <TabsContent key={k} value={k} className="mt-8">
            <p className="max-w-xl text-[16px] text-muted">{FORMS[k].intro}</p>
            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {FORMS[k].fields.map(([name, type, hint]) => (
                <label key={name} className="block">
                  <span className="label text-muted">{name}</span>
                  {type === "select" ? (
                    <select name={name} value={vals[`${k}:${name}`] ?? ""} onChange={e => set(`${k}:${name}`, e.target.value)} className={input}>
                      <option value="">Choose</option>
                      {hint.split("|").map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input name={name} type={type} placeholder={hint} value={vals[`${k}:${name}`] ?? ""} onChange={e => set(`${k}:${name}`, e.target.value)} className={input} />
                  )}
                </label>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <label className="block"><span className="label text-muted">Your name</span><input name="Name" required autoComplete="name" value={vals.Name ?? ""} onChange={e => set("Name", e.target.value)} className={input} /></label>
        <label className="block"><span className="label text-muted">Your email</span><input name="Email" type="email" autoComplete="email" value={vals.Email ?? ""} onChange={e => set("Email", e.target.value)} className={input} /></label>
        <label className="block sm:col-span-2"><span className="label text-muted">Message</span><textarea name="Message" rows={3} value={vals.Message ?? ""} onChange={e => set("Message", e.target.value)} className={`${input} resize-none py-3`} /></label>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary justify-center"><Mail className="size-4" aria-hidden /> {tab === "room" ? "Ask about a room" : tab === "mooring" ? "Ask about a mooring ball" : "Request a slip"}</button>
        <a href={TEL} className="btn btn-quiet justify-center"><Phone className="size-4" aria-hidden /> Or call {PHONE}</a>
      </div>
      <p className="enquiry__note mt-4 text-[14px] text-muted" aria-live="polite">{sent ? "Your email app opened with your details filled in." : "Opens your email app with everything filled in, addressed to the office."}</p>
    </form>
  )
}

/* ---------- facts marquee ---------- */
export function FactBand() {
  const items = ["73 dock slips", "VHF channel 16", "Gasoline, diesel and ice", "30 and 50 amp power", "Free WiFi at every slip", "Snappas Bar & Grill on the dock", "Mooring balls", "24-hour security", "Open since 1972"]
  return (
    <div className="marquee overflow-hidden border-y border-line bg-paper py-5" aria-label="Marina at a glance">
      <div className="marquee__track flex w-max gap-12">
        {[...items, ...items].map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex items-center gap-12 whitespace-nowrap font-display text-[clamp(1.4rem,2.4vw,2.2rem)] text-ink">{t}<span className="size-2 rounded-full bg-conch" aria-hidden /></span>
        ))}
      </div>
    </div>
  )
}

/* ---------- amenities (conchinn.com/marina) ---------- */
export const AMENITIES = [
  ["Electric", "$0.75 per kWh, 30 and 50 amp service, metered daily"],
  ["Water", "$0.10 per gallon, metered, billed at checkout"],
  ["Internet", "Free high-speed WiFi for every dock and mooring guest"],
  ["Showers and restrooms", "Complimentary for dock and mooring guests"],
  ["Laundry", "Token-operated washers and dryers"],
  ["Fuel", "Gasoline, diesel and ice"],
  ["Security", "24 hours"],
  ["Pool", "A heated plunge pool beside the docks"],
  ["Dinghy dock", "Complimentary"],
  ["Restaurant and bar", "Snappas Bar & Grill, on the water"],
]

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {items.map(([q, a], i) => (
        <AccordionItem key={q} value={`f${i}`} className="border-b border-line">
          <AccordionTrigger className="min-h-14 py-5 text-left font-display text-[clamp(1.2rem,1.8vw,1.55rem)] font-normal hover:no-underline">{q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function EnquirySection() {
  return (
    <section id="enquire" className="scroll-mt-20 bg-paper" aria-labelledby="enquire-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="06" className="text-harbour">Enquire</Label>
          <h2 id="enquire-title" className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.02em]">Tell the dock office you are coming.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Choose a slip, a mooring ball or a room. Your details go straight to {EMAIL}, the office answers by email or phone.</p>
          <dl className="mt-10 space-y-4 text-[15px]">
            <div><dt className="label text-muted">Office</dt><dd className="mt-1"><a href={TEL} className="ulink font-display text-[1.6rem]">{PHONE}</a></dd></div>
            <div><dt className="label text-muted">On the water</dt><dd className="mt-1 font-display text-[1.6rem]">VHF channel 16</dd></div>
            <div><dt className="label text-muted">Hours</dt><dd className="mt-1">Monday to Sunday, 8:00am to 5:30pm</dd></div>
          </dl>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><Enquiry /></Reveal>
      </div>
    </section>
  )
}
