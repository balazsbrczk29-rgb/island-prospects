import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, MessageCircle, Minus, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IMG, BOOK, WA, WA_DISPLAY, EMAIL, Label, Reveal, Photo, ease, sq } from "./site"

/* ---------- stays (fernandezbayvillage.com/cottages, /villas) ---------- */
export type Stay = { id: string; name: string; kind: "cottage" | "villa"; bed: string; line: string; has: string[]; img: string; pair?: string }
export const STAYS: Stay[] = [
  { id: "shane", name: "Shane's Shack", kind: "cottage", bed: "King", line: "On the water's edge with a 180° view of the beach and windows across the whole front.", has: ["Oceanfront private terrace", "Garden shower", "A/C and overhead fans", "Small refrigerator", "K-Cup coffee maker", "Steps from the Clubhouse"], img: IMG.shane },
  { id: "royal", name: "Royal Palm", kind: "cottage", bed: "King", line: "One of the most popular cottages, with a wrap-around porch a few steps from the beach.", has: ["Large private porch", "Spacious garden bathroom", "Large walk-in closet", "A/C and overhead fans", "Small refrigerator"], img: IMG.royal, pair: "coconut" },
  { id: "coconut", name: "Coconut Palm", kind: "cottage", bed: "King", line: "High ceilings, a garden bathroom full of tropical plants and a shaded path to the beach.", has: ["Private patio", "Ocean view", "Walk-in closet", "A/C and overhead fan", "K-Cup coffee maker, sink, small refrigerator"], img: IMG.coconut, pair: "royal" },
  { id: "travelers", name: "Traveler's Palm", kind: "cottage", bed: "King", line: "High ceilings, garden bathroom and an ocean view, steps from the Clubhouse.", has: ["Private patio", "Ocean view", "Walk-in closet", "A/C and overhead fan", "K-Cup coffee maker, sink, small refrigerator"], img: IMG.travelers, pair: "tamarind" },
  { id: "tamarind", name: "Tamarind Suite", kind: "cottage", bed: "Queen", line: "High ceilings, a garden bath with tropical plants and a sliding door to the patio.", has: ["Private patio", "Ocean view", "Walk-in closet", "A/C and overhead fan", "Next to the Clubhouse"], img: IMG.tamarind, pair: "travelers" },
  { id: "seabreeze", name: "Seabreeze Cottage", kind: "cottage", bed: "King", line: "Wake to the sea. A stone patio with an umbrella table looks out over the water.", has: ["Private stone patio", "Ocean view", "Lush garden bath", "Walk-in closet", "A/C, small fridge, K-Cup machine"], img: IMG.seabreeze },
  { id: "reefs", name: "Reefs Room", kind: "cottage", bed: "Queen", line: "High ceilings, a rustic garden bath and a lovely ocean view from the patio.", has: ["Private patio", "Ocean view", "Walk-in closet", "A/C", "A few steps to the Clubhouse"], img: IMG.reefs },
  { id: "caretaker", name: "Caretaker's Cottage", kind: "cottage", bed: "", line: "A private terrace in tropical planting, a short walk to the beach.", has: ["Private terrace", "Garden bath", "Large walk-in closet", "A/C and overhead fans", "Small fridge, K-Cup machine"], img: IMG.caretaker },
  { id: "manor", name: "The Manor House", kind: "villa", bed: "Four bedrooms", line: "The village's largest house: a big common room, full kitchen, open-air showers and beach access.", has: ["Four bedrooms", "Large common room", "Full kitchen", "Open-air showers", "Beach access"], img: IMG.manor },
  { id: "beach", name: "The Beach House", kind: "villa", bed: "Two bedrooms", line: "Room for more than one family, with a full kitchen and garden bathrooms.", has: ["Two bedrooms", "Large common room", "Full kitchen", "Garden bathrooms", "Suits multiple families"], img: IMG.beachHouse },
]

const PARTIES = {
  two: { label: "The two of us", note: "Any cottage. Shane's Shack sits on the water's edge; Royal Palm is one of the most asked for.", fit: ["shane", "royal", "coconut", "travelers", "tamarind", "seabreeze", "reefs", "caretaker"] },
  family: { label: "A family", note: "Two pairs of cottages adjoin to make a suite: Coconut Palm with Royal Palm, and Traveler's Palm with Tamarind.", fit: ["royal", "coconut", "travelers", "tamarind", "beach"] },
  group: { label: "Friends or a big family", note: "Take a villa: the Manor House sleeps a party across four bedrooms, the Beach House has two. Add cottages around them.", fit: ["manor", "beach"] },
} as const
type PartyKey = keyof typeof PARTIES

export function PartyPlanner() {
  const [party, setParty] = useState<PartyKey>("family")
  const p = PARTIES[party]
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Who is coming">
        {(Object.keys(PARTIES) as PartyKey[]).map(k => (
          <button key={k} role="radio" aria-checked={party === k} onClick={() => setParty(k)} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${party === k ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{PARTIES[k].label}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={party} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-6 max-w-2xl font-display text-[clamp(1.3rem,2vw,1.75rem)] leading-snug">{p.note}</motion.p>
      </AnimatePresence>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5">
        {STAYS.map(s => {
          const on = (p.fit as readonly string[]).includes(s.id)
          const partner = s.pair && on && party === "family" ? STAYS.find(x => x.id === s.pair) : undefined
          return (
            <motion.li key={s.id} animate={{ opacity: on ? 1 : 0.32, scale: on ? 1 : 0.97 }} transition={{ duration: 0.5, ease }}>
              <a href={`stay.html#${s.id}`} className="group block" tabIndex={on ? 0 : -1}>
                <div className="aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-2">
                  <img src={sq(s.img, 750)} alt={`${s.name} at Fernandez Bay Village`} width={750} height={938} loading="lazy" className={`size-full object-cover transition duration-700 group-hover:scale-[1.03] ${on ? "" : "grayscale"}`} />
                </div>
                <p className="mt-3 font-display text-[1.2rem] leading-tight">{s.name}</p>
                <p className="mt-0.5 text-[13px] text-muted">{s.kind === "villa" ? s.bed : s.bed ? `${s.bed} bed` : "Garden bath, terrace"}{partner ? ` · adjoins ${partner.name}` : ""}</p>
              </a>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- meal plan (fernandezbayvillage.com/dining) ---------- */
const MEALS = [
  { id: "hot", label: "Hot breakfast", price: 20 },
  { id: "cont", label: "Continental breakfast", price: 10 },
  { id: "dinner", label: "Dinner and the beach bonfire", price: 48 },
]
function Stepper({ label, value, set, min = 1, max = 30 }: { label: string; value: number; set: (n: number) => void; min?: number; max?: number }) {
  return (
    <div>
      <p className="label text-muted">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - 1))} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink active:scale-95"><Minus className="size-4" /></button>
        <output className="w-12 text-center font-display text-[2.4rem] tabular-nums" aria-live="polite">{value}</output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(Math.min(max, value + 1))} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink active:scale-95"><Plus className="size-4" /></button>
      </div>
    </div>
  )
}
export function MealCounter() {
  const [guests, setGuests] = useState(2)
  const [nights, setNights] = useState(5)
  const [chosen, setChosen] = useState<Record<string, boolean>>({ hot: true, dinner: true })
  const toggle = (id: string) => setChosen(c => { const n = { ...c, [id]: !c[id] }; if (id === "hot" && n.hot) n.cont = false; if (id === "cont" && n.cont) n.hot = false; return n })
  const perDay = MEALS.filter(m => chosen[m.id]).reduce((a, m) => a + m.price, 0)
  const total = perDay * guests * nights
  return (
    <div className="grid gap-10 rounded-[6px] bg-paper p-6 md:grid-cols-2 md:p-10">
      <div>
        <div className="flex flex-wrap gap-10">
          <Stepper label="Guests" value={guests} set={setGuests} max={16} />
          <Stepper label="Nights" value={nights} set={setNights} />
        </div>
        <fieldset className="mt-8">
          <legend className="label text-muted">Meals each day</legend>
          <div className="mt-3 space-y-2">
            {MEALS.map(m => (
              <label key={m.id} className={`flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-[4px] border px-4 transition ${chosen[m.id] ? "border-casuarina bg-shallows/40" : "border-line hover:border-ink/40"}`}>
                <span className="flex items-center gap-3"><input type="checkbox" checked={!!chosen[m.id]} onChange={() => toggle(m.id)} className="size-4 accent-[var(--color-casuarina)]" />{m.label}</span>
                <span className="tabular-nums text-muted">${m.price}</span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-muted">Lunch is ordered as you go, $8 to $18 a person.</p>
        </fieldset>
      </div>
      <div className="flex flex-col justify-between border-t border-line pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10">
        <div>
          <p className="label text-casuarina">Meals for your stay</p>
          <motion.p key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="mt-3 font-display text-[clamp(3.2rem,6vw,5rem)] leading-none tabular-nums">${total.toLocaleString("en-US")}</motion.p>
          <p className="mt-3 text-[15px] text-muted">${perDay} a person a day × {guests} {guests === 1 ? "guest" : "guests"} × {nights} {nights === 1 ? "night" : "nights"}, at the resort's published menu prices.</p>
        </div>
        <p className="mt-8 text-[13px] text-muted">An estimate for planning, before drinks, tax and gratuity. The front desk confirms current prices.</p>
      </div>
    </div>
  )
}

/* ---------- enquiry (WhatsApp, their published number) ---------- */
const FORMS = {
  stay: { label: "A stay", fields: [["Arriving", "date"], ["Departing", "date"], ["Guests", "number"], ["Cottage or villa", "select:" + ["No preference", ...STAYS.map(s => s.name)].join("|")]] },
  group: { label: "Group or wedding", fields: [["Dates", "text"], ["Number of guests", "number"], ["Occasion", "select:Family reunion|Friends' trip|Wedding|Other"]] },
  pilot: { label: "Flying in", fields: [["Aircraft", "text"], ["Arriving", "date"], ["From", "text"], ["Guests", "number"]] },
} as const
type FormKey = keyof typeof FORMS

export function Enquiry() {
  const [tab, setTab] = useState<FormKey>("stay")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const set = (k: string, v: string) => setVals(s => ({ ...s, [k]: v }))
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lines = ["Hello Fernandez Bay Village,", "", `Enquiry: ${FORMS[tab].label}`]
    for (const [n] of FORMS[tab].fields) { const v = vals[`${tab}:${n}`]; if (v) lines.push(`${n}: ${v}`) }
    for (const k of ["Name", "Message"]) if (vals[k]) lines.push(`${k}: ${vals[k]}`)
    lines.push("", "(sent from the website)")
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank")
    setSent(true)
  }
  const input = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-casuarina"
  return (
    <form data-enquiry data-business="Fernandez Bay Village" data-whatsapp={WA} data-email={EMAIL} action={`mailto:${EMAIL}`} method="post" encType="text/plain" onSubmit={submit}>
      <Tabs value={tab} onValueChange={v => setTab(v as FormKey)}>
        <TabsList className="h-auto w-full justify-start gap-1 rounded-full bg-paper-2 p-1 sm:w-fit">
          {(Object.keys(FORMS) as FormKey[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-1 rounded-full px-4 text-[14px] data-[state=active]:bg-ink data-[state=active]:text-paper sm:flex-none sm:px-5 sm:text-[15px]">{FORMS[k].label}</TabsTrigger>)}
        </TabsList>
        {(Object.keys(FORMS) as FormKey[]).map(k => (
          <TabsContent key={k} value={k} className="mt-8">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {FORMS[k].fields.map(([name, type]) => (
                <label key={name} className="block">
                  <span className="label text-muted">{name}</span>
                  {type.startsWith("select:") ? (
                    <select name={name} value={vals[`${k}:${name}`] ?? ""} onChange={e => set(`${k}:${name}`, e.target.value)} className={input}>
                      <option value="">Choose</option>
                      {type.slice(7).split("|").map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : <input name={name} type={type} value={vals[`${k}:${name}`] ?? ""} onChange={e => set(`${k}:${name}`, e.target.value)} className={input} />}
                </label>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <label className="block"><span className="label text-muted">Your name</span><input name="Name" required autoComplete="name" value={vals.Name ?? ""} onChange={e => set("Name", e.target.value)} className={input} /></label>
        <label className="block sm:col-span-2"><span className="label text-muted">Anything else</span><textarea name="Message" rows={3} value={vals.Message ?? ""} onChange={e => set("Message", e.target.value)} className={`${input} resize-none py-3`} /></label>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary justify-center"><MessageCircle className="size-4" aria-hidden /> Ask on WhatsApp</button>
        <a href={BOOK} className="btn btn-quiet justify-center">Or check availability online <ArrowUpRight className="size-4" aria-hidden /></a>
      </div>
      <p className="mt-4 text-[14px] text-muted" aria-live="polite">{sent ? "WhatsApp opened in a new tab with your details." : `Opens WhatsApp to the front desk on ${WA_DISPLAY}, with your details filled in.`}</p>
    </form>
  )
}

export function EnquirySection({ n = "06" }: { n?: string }) {
  return (
    <section id="enquire" className="scroll-mt-20 bg-paper-2" aria-labelledby="enq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n={n} className="text-casuarina">Ask the front desk</Label>
          <h2 id="enq-title" className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.4rem)] font-light leading-[0.98] tracking-[-0.02em]">Questions first? <em>Ask the people who live here.</em></h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Dates and rates are live in the booking engine. For villas, groups, weddings or flying in yourself, send the front desk a message.</p>
          <Photo src={IMG.clubhouse} alt="The Clubhouse entrance at Fernandez Bay Village" className="mt-10 hidden aspect-[4/3] rounded-[4px] lg:block" />
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
          <AccordionTrigger className="min-h-14 py-5 text-left font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-normal hover:no-underline">{q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
