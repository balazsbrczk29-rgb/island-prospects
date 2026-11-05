import { useMemo, useState } from "react"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"
import { ArrowUpRight, Mail, Minus, Phone, Plus } from "lucide-react"
import { COTTAGES, FEES } from "./data"
import { BOOK, EMAIL, Heading, Label, PHONE, Reveal, TEL } from "./site"

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`

function Num({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const txt = useTransform(mv, v => usd(v))
  useEffect(() => { const c = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] }); return c.stop }, [value, mv])
  return <motion.span>{txt}</motion.span>
}

function Stepper({ label, value, set, min, max }: { label: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div>
      <span className="label text-muted">{label}</span>
      <div className="mt-2 flex items-center justify-between border-b border-ink/25 py-1">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - 1))} className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-paper-2"><Minus className="size-4" /></button>
        <span className="font-display text-2xl" aria-live="polite">{value}</span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(Math.min(max, value + 1))} className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-paper-2"><Plus className="size-4" /></button>
      </div>
    </div>
  )
}

export function Estimator({ n = "03", initial = "oleander" }: { n?: string; initial?: string }) {
  const [id, setId] = useState(initial)
  const c = COTTAGES.find(x => x.id === id)!
  const [nights, setNights] = useState(5)
  const [guests, setGuests] = useState(2)
  const [breakfast, setBreakfast] = useState(true)
  const [dinners, setDinners] = useState(2)
  const [taxi, setTaxi] = useState(true)
  useEffect(() => {
    const on = (e: Event) => setId((e as CustomEvent<string>).detail)
    window.addEventListener("pc-cottage", on)
    return () => window.removeEventListener("pc-cottage", on)
  }, [])
  const g = Math.min(guests, c.guests)
  const maxDinners = Math.min(nights, 4 * Math.ceil(nights / 7))
  const d = Math.min(dinners, maxDinners)
  const r = useMemo(() => {
    const lodging = c.rate * nights
    const taxes = lodging * (FEES.vat + FEES.levy)
    const meals = ((breakfast ? FEES.breakfast * nights : 0) + FEES.dinner * d) * g * (1 + FEES.gratuity)
    const transfer = taxi ? FEES.taxiRT : 0
    return { lodging, taxes, meals, transfer, total: lodging + taxes + meals + transfer }
  }, [c, nights, breakfast, d, g, taxi])
  const body = `Hello,\n\nI would like to ask about ${c.name} for ${nights} nights, ${g} guest${g > 1 ? "s" : ""}.\nBreakfast: ${breakfast ? "yes" : "no"}. Dinners: ${d}. Taxi from the airport: ${taxi ? "round trip" : "no"}.\nWebsite estimate: ${usd(r.total)}.\n\nMy dates are: \n\nThank you`
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`${c.name}, ${nights} nights`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="estimate" className="bg-paper-2" aria-labelledby="est-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n={n}>Plan a stay</Label>
          <Heading id="est-title">What a week <em>really</em> costs.</Heading>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Pick a cottage, your nights and meals. We add the published rates, the 10% VAT, the 6% resort levy, the 15% meal gratuity and the island taxi, so there are no surprises.</p>
          <p className="mt-6 max-w-sm border-l-2 border-thatch pl-4 text-[15px] leading-relaxed">No deposit required. The club holds a card to reserve and payment is due on departure. Cancel 30 days or more before arrival and nothing is charged.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <label className="block">
            <span className="label text-muted">Cottage</span>
            <select value={id} onChange={e => setId(e.target.value)} className="field mt-2">
              {COTTAGES.map(x => <option key={x.id} value={x.id}>{x.name}: up to {x.guests}, {usd(x.rate)} a night</option>)}
            </select>
          </label>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <Stepper label="Nights" value={nights} set={setNights} min={1} max={21} />
            <Stepper label="Guests" value={g} set={setGuests} min={1} max={c.guests} />
            <Stepper label="Dinners" value={d} set={setDinners} min={0} max={maxDinners} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[["Breakfast each morning", breakfast, setBreakfast], ["Taxi from the airport, round trip", taxi, setTaxi]].map(([l, on, set]) => (
              <button key={l as string} type="button" aria-pressed={on as boolean} onClick={() => (set as (b: boolean) => void)(!(on as boolean))} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${on ? "border-deep bg-deep text-paper" : "border-ink/25"}`}>{l as string}</button>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-muted">Dinner is served Wednesday to Saturday, so a week allows up to four.</p>
          <div className="mt-10 rounded-[24px] bg-deep p-6 text-paper md:p-8">
            <dl className="grid gap-2 text-[15px] text-paper/80">
              {[[`${c.name}, ${nights} nights`, r.lodging], ["VAT 10% and resort levy 6%", r.taxes], ["Meals with 15% gratuity", r.meals], ["Taxi", r.transfer]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-4 border-b border-paper/12 pb-2"><dt>{k}</dt><dd><Num value={v as number} /></dd></div>
              ))}
            </dl>
            <p className="mt-6 flex items-end justify-between gap-4"><span className="label text-shallow">Estimated total</span><span className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-none italic"><Num value={r.total} /></span></p>
            <p className="mt-3 text-[13px] text-paper/55">Estimate from published rates; the club confirms the final price.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={BOOK} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-0.5">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
              <a href={mail} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/35 px-6 transition hover:-translate-y-0.5 hover:border-paper"><Mail className="size-4" aria-hidden />Email this plan</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-paper/85 transition hover:text-paper"><Phone className="size-4" aria-hidden />{PHONE}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
