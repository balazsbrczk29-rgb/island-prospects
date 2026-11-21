import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Minus, Plus } from "lucide-react"
import { BOOK, EMAIL, NAME, ORIGINS, longDate, offersFor, type Origin } from "./facts"

function Stepper({ label, value, set, min, max, unit }: { label: string; value: number; set: (n: number) => void; min: number; max: number; unit: [string, string] }) {
  return (
    <div className="field">
      <span className="field__name" id={`${label}-name`}>{label}</span>
      <div className="stepper" role="group" aria-labelledby={`${label}-name`}>
        <button type="button" aria-label={`Fewer ${unit[1]}`} disabled={value <= min} onClick={() => set(value - 1)}><Minus aria-hidden /></button>
        <output className="num" aria-live="polite">{value} {value === 1 ? unit[0] : unit[1]}</output>
        <button type="button" aria-label={`More ${unit[1]}`} disabled={value >= max} onClick={() => set(value + 1)}><Plus aria-hidden /></button>
      </div>
    </div>
  )
}

/** The reply card: when, how long, from where. It works out which published offers fit and writes the email. */
export default function ReplyCard() {
  const [arrive, setArrive] = useState("")
  const [nights, setNights] = useState(4)
  const [guests, setGuests] = useState(2)
  const [origin, setOrigin] = useState<Origin>("florida")
  const [name, setName] = useState("")
  const [note, setNote] = useState("")
  const offers = useMemo(() => offersFor(nights, origin, arrive || null), [nights, origin, arrive])
  const fits = offers.filter(o => o.status === "ok")
  const from = ORIGINS.find(o => o.id === origin)!.label
  const when = arrive ? `${longDate(arrive)} to ${longDate(arrive, nights)}` : "dates still open"
  const body = [
    `Hello ${NAME},`, "", "I would like to ask about a studio.",
    `Arriving: ${arrive ? longDate(arrive) : "not decided yet"}`, `Nights: ${nights}`, `Guests: ${guests}`, `Travelling from: ${from}`,
    fits.length ? `Offers I saw on your site: ${fits.map(o => o.title).join("; ")}` : "",
    note ? `Note: ${note}` : "", "",
    name ? `Thank you,\n${name}` : "Thank you.",
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n")
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`Dates enquiry: ${nights} nights${arrive ? ", arriving " + longDate(arrive) : ""}`)}&body=${encodeURIComponent(body)}`

  return (
    <form className="reply__card" onSubmit={e => e.preventDefault()} aria-label={`Reply card to ${NAME}`}>
      <div className="reply__ask">
        <div className="field__row">
          <div className="field">
            <label htmlFor="arrive">Arriving</label>
            <input id="arrive" type="date" className="num" value={arrive} min="2026-11-21" max="2027-12-31" onChange={e => setArrive(e.target.value)} />
          </div>
          <Stepper label="Staying" value={nights} set={setNights} min={1} max={21} unit={["night", "nights"]} />
        </div>
        <div className="field__row">
          <Stepper label="Guests" value={guests} set={setGuests} min={1} max={8} unit={["guest", "guests"]} />
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>
        <fieldset className="field">
          <legend>Travelling from</legend>
          <div className="chips">
            {ORIGINS.map(o => (
              <label key={o.id}><input type="radio" name="origin" value={o.id} checked={origin === o.id} onChange={() => setOrigin(o.id)} />{o.label}</label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="note">Anything we should know</label>
          <textarea id="note" rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Airport pick-up, a car, a late arrival" />
        </div>
      </div>
      <div className="reply__fits" aria-live="polite">
        <p className="fits__sum"><span className="num">{nights}</span> {nights === 1 ? "night" : "nights"}, {when}.</p>
        <ul className="fits__list">
          <AnimatePresence initial={false} mode="popLayout">
            {offers.map(o => (
              <motion.li key={o.id} layout data-status={o.status} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                <strong>{o.title}</strong>
                <small>{o.note}</small>
              </motion.li>
            ))}
            {offers.length === 0 && (
              <motion.li key="none" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <strong>The published offers start at two nights.</strong>
                <small>One night is welcome too. Ask us for the rate.</small>
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>
      <div className="reply__send">
        <a className="btn" href={mail}>Send to the inn <ArrowRight aria-hidden /></a>
        <p>Opens your email with these details filled in. Or <a className="link" href={BOOK} target="_blank" rel="noopener">check live availability on BahamaGo</a>.</p>
      </div>
    </form>
  )
}
