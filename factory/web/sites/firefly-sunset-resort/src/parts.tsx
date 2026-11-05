import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Mail, Sunset } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IMG, EMAIL, DINNER, PHONE, TEL, Label, Reveal, Photo, ease } from "./site"

/* ---------- villas + published rates (fireflysunsetresort.com/rooms) ---------- */
export type Villa = { id: string; name: string; beds: string; line: string; detail: string[]; img?: string; inS: [number, number]; offS: [number, number] }
export const VILLAS: Villa[] = [
  { id: "mint", name: "Mint To Be", beds: "2 bed · 2 bath", line: "The romantic one. On the edge of a coral cliff, almost suspended over the Sea of Abaco, with a private plunge pool and a back deck for the sunset.", detail: ["Private plunge pool", "Back deck facing the sunset", "Built for honeymooners or two couples"], img: IMG.plunge, inS: [1125, 7650], offS: [1000, 6800] },
  { id: "java", name: "Java Rum Plantation", beds: "3 bed · 2 bath", line: "Plantation style, steps above the white sand beach, with expansive wooden decks, sun-drenched French doors and rich Brazilian wood.", detail: ["Three bedrooms", "Steps above the beach", "Named after the resort's Sea Island Java Rum"], inS: [1500, 10200], offS: [1350, 9180] },
  { id: "firefly", name: "Firefly", beds: "2 bed · 2 bath", line: "Modern, tropical interiors with elevated views over the Sea of Abaco. Each bedroom has its own adjoining full bath.", detail: ["Elevated sea views", "En-suite bath to each bedroom", "Families or two couples"], inS: [800, 5440], offS: [665, 4525] },
  { id: "dragonfly", name: "Dragonfly", beds: "2 bed · 2 bath", line: "Island sophistication meets southern cottage living, where the tea is as good as the sunsets.", detail: ["Elevated sea views", "Modern tropical interiors", "Two bedrooms, two baths"], inS: [800, 5440], offS: [665, 4525] },
  { id: "butterfly", name: "Butterfly", beds: "2 bed · 2 bath", line: "The third of the sister villas, with the same elevated outlook over the water toward the sunset.", detail: ["Elevated sea views", "Modern tropical interiors", "Two bedrooms, two baths"], inS: [800, 5440], offS: [665, 4525] },
]

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const inSeason = (m: number) => m >= 1 && m <= 7 // Feb (1) to Aug (7)
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function RateCalculator() {
  const [vid, setVid] = useState("mint")
  const [month, setMonth] = useState(new Date().getMonth())
  const [nights, setNights] = useState(5)
  const v = VILLAS.find(x => x.id === vid)!
  const peak = inSeason(month)
  const [daily, weekly] = peak ? v.inS : v.offS
  const minN = peak ? 3 : 1
  const n = Math.max(minN, nights)
  const weeks = Math.floor(n / 7), rest = n % 7
  const sub = weeks * weekly + rest * daily
  const vat = sub * 0.1
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-6">
        <fieldset>
          <legend className="label text-muted">Villa</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {VILLAS.map(x => (
              <button key={x.id} type="button" aria-pressed={vid === x.id} onClick={() => setVid(x.id)} className={`min-h-12 rounded-[3px] border px-3 text-left text-[15px] transition hover:-translate-y-px ${vid === x.id ? "border-sea bg-sea text-paper" : "border-ink/15 hover:border-ink"}`}>{x.name}</button>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="label text-muted">Arriving in</span>
            <select value={month} onChange={e => setMonth(Number(e.target.value))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none focus:border-sea">
              {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="label text-muted">Nights</span>
            <input type="number" min={1} max={60} value={nights} onChange={e => setNights(Math.max(1, Math.min(60, Number(e.target.value) || 1)))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] tabular-nums outline-none focus:border-sea" />
          </label>
        </div>
        <p className="text-[14px] text-muted">{peak ? "In season, February to August: three-night minimum." : "Off season, September to January. Thanksgiving, Christmas and New Year are priced separately: ask the resort."}</p>
      </div>
      <div className="flex flex-col justify-between rounded-[4px] bg-dusk p-6 text-paper md:p-8 lg:col-span-6">
        <div>
          <p className="label text-glow">{v.name} · {peak ? "In season" : "Off season"}</p>
          <motion.p key={`${vid}${month}${n}`} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="mt-3 font-display text-[clamp(3.2rem,6vw,5rem)] leading-none tabular-nums">{usd(sub + vat)}</motion.p>
          <p className="mt-2 text-[15px] text-paper/70">for {n} {n === 1 ? "night" : "nights"}, including 10% VAT</p>
          <dl className="mt-6 space-y-2 border-t border-paper/15 pt-5 text-[15px]">
            {weeks > 0 && <div className="flex justify-between"><dt className="text-paper/70">{weeks} {weeks === 1 ? "week" : "weeks"} at {usd(weekly)}</dt><dd className="tabular-nums">{usd(weeks * weekly)}</dd></div>}
            {rest > 0 && <div className="flex justify-between"><dt className="text-paper/70">{rest} {rest === 1 ? "night" : "nights"} at {usd(daily)}</dt><dd className="tabular-nums">{usd(rest * daily)}</dd></div>}
            <div className="flex justify-between"><dt className="text-paper/70">VAT 10%</dt><dd className="tabular-nums">{usd(vat)}</dd></div>
          </dl>
          {n !== nights && <p className="mt-3 text-[14px] text-glow">Raised to the {minN}-night in-season minimum.</p>}
        </div>
        <div className="mt-8">
          <p className="text-[13px] text-paper/60">From the resort's published rates. Weekly rate applied per full seven nights. The resort confirms the final price by email.</p>
          <a href="#enquire" onClick={() => window.dispatchEvent(new CustomEvent("ff:prefill", { detail: { villa: v.name, nights: String(n), month: MONTHS[month] } }))} className="btn btn-glow mt-5 w-full justify-center">Request {v.name} for these dates</a>
        </div>
      </div>
    </div>
  )
}

/* ---------- tonight's sunset over Hope Town (NOAA sunrise equation) ---------- */
function sunsetFor(date: Date, lat = 26.54, lon = -76.96) {
  const rad = Math.PI / 180
  const jd = date.getTime() / 86400000 + 2440587.5
  const n = Math.round(jd - 2451545.0 + 0.0008 + lon / 360) - lon / 360
  const M = (357.5291 + 0.98560028 * n) % 360
  const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad)
  const L = (M + C + 180 + 102.9372) % 360
  const jt = 2451545.0 + n + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad)
  const dec = Math.asin(Math.sin(L * rad) * Math.sin(23.4397 * rad))
  const cosW = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(dec)) / (Math.cos(lat * rad) * Math.cos(dec))
  const w = Math.acos(cosW) / rad
  return new Date((jt + w / 360 - 2440587.5) * 86400000)
}

export function SunsetClock({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => { setNow(new Date()); const id = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(id) }, [])
  const info = useMemo(() => {
    if (!now) return null
    let s = sunsetFor(now)
    if (s.getTime() < now.getTime() - 20 * 60000) s = sunsetFor(new Date(now.getTime() + 86400000))
    const mins = Math.round((s.getTime() - now.getTime()) / 60000)
    const time = s.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Nassau" })
    const today = s.toLocaleDateString("en-US", { timeZone: "America/Nassau" }) === now.toLocaleDateString("en-US", { timeZone: "America/Nassau" })
    return { time, mins, today }
  }, [now])
  const sub = tone === "dark" ? "text-paper/70" : "text-muted"
  return (
    <div>
      <p className={`label flex items-center gap-2 ${tone === "dark" ? "text-glow" : "text-sea"}`}><Sunset className="size-4" aria-hidden /> {info && !info.today ? "Tomorrow's" : "Tonight's"} sunset in Hope Town</p>
      <p className="mt-2 font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none tabular-nums" aria-live="polite">{info ? info.time : "At golden hour"}</p>
      <p className={`mt-2 text-[14px] ${sub}`}>{info ? (info.mins > 0 ? `${Math.floor(info.mins / 60) ? `${Math.floor(info.mins / 60)} h ` : ""}${info.mins % 60} min from now, Bahamas time` : "Happening now. Look west over the Sea of Abaco.") : "Calculated live for Hope Town, Elbow Cay."}</p>
    </div>
  )
}

/* ---------- menus (fireflysunsetresort.com/empty-page) ---------- */
type Dish = [string, string, string]
const SEA = /conch|fish|shrimp|lobster|tuna|calamari|crab|clam|vongole|seafood|catch/i
export const MENU: Record<string, { label: string; hours: string; note?: string; items: Dish[] }> = {
  breakfast: { label: "Breakfast", hours: "Daily 8:00am to 11:00am", note: "A special Bahamian breakfast on Sundays. No reservations needed.", items: [] },
  lunch: { label: "Lunch", hours: "Daily 11:30am to 4:00pm", items: [
    ["Bahamian Conch Fritters (6)", "Caribbean cocktail sauce", "$15"], ["Bahamian Conch Chowder", "Sherry, hot pepper and lime", "Cup $13 · Bowl $16"], ["Coconut Panko Shrimp", "Caribbean cocktail sauce", "$21"], ["Tuna Tataki", "Ginger sesame crust, wasabi mayo, hoisin", "$29"], ["Firefly House Salad", "Avocado, toasted nuts, cranberries", "$19"], ["Fish Taco", "Grilled, blackened or panko, fruit salsa", "$28"], ["Classic Burger", "Cheddar, pickle, shoestring fries", "$26"], ["Lobster Grilled Cheese", "Seasonal. Arugula, provolone, mascarpone", "$32"], ["Cracked Conch", "Peas 'n rice, coleslaw, house tartar", "$32"], ["Jerk Chicken Wrap", "Avocado, romaine, lime garlic aioli", "$26"],
  ] },
  dinner: { label: "Dinner", hours: "Daily 5:30pm to 9:00pm, kitchen closes at 9", items: [
    ["Artichoke & Lump Crab Dip", "Olive oil toasted crostini", "$20"], ["Bahamian Conch Fritters (6)", "Caribbean cocktail sauce", "$15"], ["Beet & Arugula Salad", "Goat cheese, balsamic", "$19"], ["Catch of the Day", "Grilled, blackened or piccata", "$45"], ["Butter Poached Lobster", "Seasonal. Creamy sundried tomato sauce", "$60"], ["Vongole", "Linguini, clams, white wine, garlic bread", "$48"], ["Stuffed Chicken Breast", "Spinach, sundried tomato, cream", "$42"], ["NY Strip Steak", "12 oz, blue cheese butter", "$62"], ["Filet Mignon", "8 oz, cognac peppercorn sauce", "$68"], ["Fettuccine Primavera", "Seasonal vegetables, white wine cream", "$38"],
  ] },
  kids: { label: "Kids", hours: "Lunch and dinner", items: [
    ["Grilled Cheese", "Add bacon +$3", "$15"], ["Chicken Fingers", "Shoestring fries", "$19"], ["All Beef Hotdog", "Shoestring fries", "$16"], ["Kid's Pizza", "Cheese or pepperoni", "$19"], ["Fish Fingers", "Shoestring fries", "$21"], ["Kid's Pasta", "Butter and cheese", "$15"],
  ] },
}

export function MenuExplorer({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState("dinner")
  const [sea, setSea] = useState(false)
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-full bg-paper-2 p-1">
          {Object.entries(MENU).map(([k, m]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded-full px-4 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper sm:px-5">{m.label}</TabsTrigger>)}
        </TabsList>
        <button type="button" aria-pressed={sea} onClick={() => setSea(s => !s)} className={`min-h-11 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${sea ? "border-sea bg-sea text-paper" : "border-ink/20 hover:border-ink"}`}>From the sea only</button>
      </div>
      {Object.entries(MENU).map(([k, m]) => {
        const items = (sea ? m.items.filter(i => SEA.test(i[0] + i[1])) : m.items).slice(0, compact ? 6 : 99)
        return (
          <TabsContent key={k} value={k} className="mt-8">
            <p className="label text-sea">{m.hours}</p>
            {m.note && <p className="mt-3 max-w-xl font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-snug">{m.note}</p>}
            <ul className="mt-4 grid gap-x-12 md:grid-cols-2">
              <AnimatePresence initial={false}>
                {items.map(([name, desc, price]) => (
                  <motion.li key={name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="flex items-baseline gap-4 border-b border-line py-4">
                    <span className="flex-1"><span className="block text-[17px] font-medium">{name}</span><span className="mt-0.5 block text-[14px] text-muted">{desc}</span></span>
                    <span className="shrink-0 tabular-nums text-[15px]">{price}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {!m.items.length && <a href={DINNER} className="btn btn-quiet mt-6">See the full menu on Tablein <ArrowUpRight className="size-4" aria-hidden /></a>}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

/* ---------- enquiry: the resort asks for villa, dates and guests by email ---------- */
export function Enquiry() {
  const [v, setV] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  useEffect(() => {
    const on = (e: Event) => { const d = (e as CustomEvent).detail as Record<string, string>; setV(s => ({ ...s, Villa: d.villa, Nights: d.nights, Note: `Planning to arrive in ${d.month}` })) }
    window.addEventListener("ff:prefill", on); return () => window.removeEventListener("ff:prefill", on)
  }, [])
  const set = (k: string, x: string) => setV(s => ({ ...s, [k]: x }))
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lines = ["Hello Firefly Sunset Resort,", ""]
    for (const k of ["Villa", "Arriving", "Departing", "Nights", "Guests", "Golf cart or boat", "Name", "Message", "Note"]) if (v[k]) lines.push(`${k}: ${v[k]}`)
    lines.push("", "(sent from the website)")
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Villa request${v.Villa ? `: ${v.Villa}` : ""}`)}&body=${encodeURIComponent(lines.join("\n"))}`
    setSent(true)
  }
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-sea"
  return (
    <form data-enquiry data-business="Firefly Sunset Resort" data-whatsapp="" data-email={EMAIL} action={`mailto:${EMAIL}`} method="post" encType="text/plain" onSubmit={submit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <label className="block sm:col-span-2"><span className="label text-muted">Villa</span>
        <select name="Villa" value={v.Villa ?? ""} onChange={e => set("Villa", e.target.value)} className={input}>
          <option value="">Not sure yet</option>{VILLAS.map(x => <option key={x.id}>{x.name}</option>)}<option>The whole resort</option>
        </select>
      </label>
      <label className="block"><span className="label text-muted">Arriving</span><input name="Arriving" type="date" value={v.Arriving ?? ""} onChange={e => set("Arriving", e.target.value)} className={input} /></label>
      <label className="block"><span className="label text-muted">Departing</span><input name="Departing" type="date" value={v.Departing ?? ""} onChange={e => set("Departing", e.target.value)} className={input} /></label>
      <label className="block"><span className="label text-muted">Guests</span><input name="Guests" type="number" min={1} value={v.Guests ?? ""} onChange={e => set("Guests", e.target.value)} className={input} /></label>
      <label className="block"><span className="label text-muted">Golf cart or boat?</span>
        <select name="Golf cart or boat" value={v["Golf cart or boat"] ?? ""} onChange={e => set("Golf cart or boat", e.target.value)} className={input}>
          <option value="">No thanks</option><option>Golf cart</option><option>Boat</option><option>Both</option>
        </select>
      </label>
      <label className="block sm:col-span-2"><span className="label text-muted">Your name</span><input name="Name" required autoComplete="name" value={v.Name ?? ""} onChange={e => set("Name", e.target.value)} className={input} /></label>
      <label className="block sm:col-span-2"><span className="label text-muted">Anything else</span><textarea name="Message" rows={3} value={v.Message ?? ""} onChange={e => set("Message", e.target.value)} className={`${input} resize-none py-3`} /></label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary justify-center"><Mail className="size-4" aria-hidden /> Request a villa</button>
        <a href={TEL} className="btn btn-quiet justify-center">Or call {PHONE}</a>
      </div>
      <p className="text-[14px] text-muted sm:col-span-2" aria-live="polite">{sent ? "Your email app opened with the villa, dates and guests filled in." : `Opens an email to ${EMAIL} with the villa name, dates and number of guests, which is what the resort needs to confirm a booking.`}</p>
    </form>
  )
}

export function EnquirySection({ n }: { n?: string }) {
  return (
    <section id="enquire" className="scroll-mt-20 bg-paper-2" aria-labelledby="enq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n={n} className="text-sea">Request a villa</Label>
          <h2 id="enq-title" className="mt-5 font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.95]">Tell us when. We do the rest.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">The resort confirms every villa booking by email. Send the villa, your dates and how many are coming, and add a golf cart or boat if you want one waiting.</p>
          <Photo src={IMG.upperPool} alt="The upper pool at Firefly Sunset Resort, reserved for villa guests" className="mt-10 hidden aspect-[4/3] rounded-[4px] lg:block" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><Enquiry /></Reveal>
      </div>
    </section>
  )
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {items.map(([q, a], i) => (
        <AccordionItem key={q} value={`f${i}`} className="border-b border-line">
          <AccordionTrigger className="min-h-14 py-5 text-left text-[clamp(1.05rem,1.5vw,1.2rem)] font-medium hover:no-underline">{q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
