// "Price your week": where the boat goes, what you add, and the whole estimate in one sticky summary.
import { Minus, Plus, Check } from "lucide-react"
import { DayStepper, Roll } from "./DayRuler"
import { BookButton } from "./chrome"
import { PLACES, dayWord, money, useTrip, waLink, type Place } from "./trip"

const GROUPS: { title: string; note: string; each: number }[] = [
  { title: "Free", note: "Pickup at Man-O-War Cay", each: 0 },
  { title: "$100 each way", note: "$100 to deliver, $100 to pick up", each: 100 },
  { title: "$300 each way", note: "The distance and time are longer", each: 300 },
]

function PlaceRow({ p }: { p: Place }) {
  const { place, set } = useTrip()
  const on = place === p.id
  return (
    <button type="button" role="radio" aria-checked={on} className={`place ${on ? "is-on" : ""}`} onClick={() => set({ place: p.id, crewBack: false })}>
      <span className="place__dot" aria-hidden="true">{on && <Check size={14} strokeWidth={2.5} />}</span>
      <span className="place__name">{p.name}</span>
    </button>
  )
}

function Hours({ label, detail, price, value, onChange, disabled, max = 8, unit = "h" }: {
  label: string; detail: string; price: string; value: number; onChange: (n: number) => void; disabled?: boolean; max?: number; unit?: string
}) {
  return (
    <div className={`extra ${disabled ? "is-off" : ""}`}>
      <div className="extra__text">
        <h4>{label} <span className="num">{price}</span></h4>
        <p>{detail}</p>
      </div>
      <div className="stepper stepper--compact">
        <button type="button" aria-label={`Less: ${label}`} data-end={(disabled || value <= 0) || undefined} onClick={() => !disabled && onChange(Math.max(0, value - 1))}><Minus size={18} strokeWidth={2} aria-hidden="true" /></button>
        <output aria-live="polite">{value}{unit ? ` ${unit}` : ""}</output>
        <button type="button" aria-label={`More: ${label}`} data-end={(disabled || value >= max) || undefined} onClick={() => !disabled && onChange(Math.min(max, value + 1))}><Plus size={18} strokeWidth={2} aria-hidden="true" /></button>
      </div>
    </div>
  )
}

export default function Planner() {
  const t = useTrip()
  const home = t.spot.id === "man-o-war"
  return (
    <section className="price wrap" id="price" aria-labelledby="price-title">
      <div className="price__steps">
        <h2 id="price-title" className="h-xl">Where should we bring&nbsp;it?</h2>
        <p className="lede">Tell us where you are staying. One of our team drives the boat to your dock, and comes back for it when your days are done.</p>

        <div role="radiogroup" aria-label="Delivery place" className="places">
          {GROUPS.map(g => (
            <div key={g.title} className="places__group">
              <p className="places__fee"><b className="num">{g.title}</b><span>{g.note}</span></p>
              <div className="places__rows">{PLACES.filter(p => p.each === g.each).map(p => <PlaceRow key={p.id} p={p} />)}</div>
            </div>
          ))}
        </div>
        {t.spot.crewBack && (
          <label className="crew">
            <input type="checkbox" checked={t.crewBack} onChange={e => t.set({ crewBack: e.target.checked })} />
            <span>We will run your team member back to Man-O-War ourselves. <b>Delivery to {t.spot.name} is then free.</b></span>
          </label>
        )}

        <h3 className="h-lg price__sub">Make it yours</h3>
        <div className="extras">
          <Hours label="Get Acquainted" price="$100 an hour" detail="A captain shows you the ins and outs of the area. Based on availability." value={t.acquainted} onChange={n => t.set({ acquainted: n })} />
          <Hours label="A Night Out" price="$50 an hour" detail={home ? "We hire a captain to run you to dinner and back." : "A captain runs you to dinner and back. For Man-O-War Cay clients only."} value={t.nightOut} onChange={n => t.set({ nightOut: n })} disabled={!home} />
          <Hours label="Snorkeling sets" price="from $5 a day each" detail="Subject to availability." value={t.snorkel} onChange={n => t.set({ snorkel: n })} unit="" />
        </div>
      </div>

      <aside className="bill" aria-label="Your estimate" data-tab-hide>
        <p className="bill__title">Your week, priced</p>
        <div className="bill__total">
          <span className="sr-only">{money(t.total)} plus VAT</span>
          <span className="bill__sum"><i aria-hidden="true">$</i><Roll value={t.total} /></span>
          <small>plus VAT</small>
        </div>
        <dl className="bill__lines">
          <div><dt>24 ft Key West, {dayWord(t.days)} at {money(t.rate)}</dt><dd className="num">{money(t.boat)}</dd></div>
          <div><dt>{home ? "Pickup at Man-O-War Cay" : `Delivery and pickup, ${t.spot.name}`}</dt><dd className="num">{t.delivery ? money(t.delivery) : "Free"}</dd></div>
          {t.acquainted > 0 && <div><dt>Get Acquainted, {t.acquainted} h</dt><dd className="num">{money(t.acquainted * 100)}</dd></div>}
          {t.nightOut > 0 && <div><dt>A Night Out, {t.nightOut} h</dt><dd className="num">{money(t.nightOut * 50)}</dd></div>}
          {t.snorkel > 0 && <div><dt>Snorkeling sets, {t.snorkel}, from</dt><dd className="num">{money(t.snorkel * 5 * t.days)}</dd></div>}
        </dl>
        <div className="bill__days"><span>Days on the water</span><DayStepper compact /></div>
        <BookButton />
        <a className="btn btn--quiet" href={waLink(t.message)}>Send this plan on WhatsApp</a>
        <p className="bill__note">An estimate from our published rates, VAT exclusive. Dates and the final price are confirmed on the live booking page. You pay on the day.</p>
      </aside>
    </section>
  )
}
