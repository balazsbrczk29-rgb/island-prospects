import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react"
import { HELP, PHONE, PHONE_US, TEL, TEL_US, VENUES } from "./content"

/* ---------- the shared wedding (one store for the card, the venues screen and the closing call) ---------- */
type Wedding = { a: string; b: string; date: string; guests: number; venue: string; help: string[] }
type Store = Wedding & { set: (p: Partial<Wedding>) => void }
const Ctx = createContext<Store | null>(null)
export function WeddingProvider({ children }: { children: ReactNode }) {
  const [w, setW] = useState<Wedding>({ a: "", b: "", date: "", guests: 80, venue: VENUES[0].id, help: [] })
  const value = useMemo(() => ({ ...w, set: (p: Partial<Wedding>) => setW(s => ({ ...s, ...p })) }), [w])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useWedding = () => useContext(Ctx)!

/* ---------- dates written the way a stationer writes them ---------- */
const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
const ORD: Record<string, string> = { one: "first", two: "second", three: "third", five: "fifth", eight: "eighth", nine: "ninth", twelve: "twelfth", twenty: "twentieth", thirty: "thirtieth" }
const words = (n: number): string => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "")
const ordinal = (n: number) => { const w = words(n); const parts = w.split("-"); const last = parts.pop()!; return [...parts, ORD[last] ?? last + "th"].join("-") }
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export function parseDate(v: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v); if (!m) return null
  const d = new Date(+m[1], +m[2] - 1, +m[3]); if (isNaN(+d)) return null
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return { d, past: d < today }
}
export const cardDate = (d: Date) => [`${DAYS[d.getDay()]},`, `the ${ordinal(d.getDate())} of ${MONTHS[d.getMonth()]}`, `two thousand ${words(d.getFullYear() - 2000)}`]
const shortDate = (d: Date) => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
const list = (xs: string[]) => xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs[0] ?? ""

export function useSentence() {
  const w = useWedding()
  return useMemo(() => {
    const v = VENUES.find(x => x.id === w.venue)!
    const names = [w.a.trim(), w.b.trim()].filter(Boolean)
    const pd = parseDate(w.date)
    const parts = ["Hello Dr. Burrows,"]
    if (names.length) parts.push(`we are ${list(names)}.`)
    parts.push(`We hope to marry ${v.say}${pd && !pd.past ? ` on ${shortDate(pd.d)}` : ""}, with about ${w.guests} guests.`)
    if (w.help.length) parts.push(`We would like help with ${list(w.help)}.`)
    const s = parts.join(" ")
    return { text: s.replace("Hello Dr. Burrows, We", "Hello Dr. Burrows. We"), touched: names.length > 0 || !!pd || w.help.length > 0 }
  }, [w])
}

/* ---------- the invitation card: sets itself, one line at a time ---------- */
function Line({ k, className, children }: { k: string; className?: string; children: ReactNode }) {
  // keyed by its own text: only a line whose words changed re-sets
  return <span key={k} className={`card__line ${className ?? ""}`}>{children}</span>
}
export function Card() {
  const w = useWedding()
  const v = VENUES.find(x => x.id === w.venue)!
  const pd = parseDate(w.date)
  // a past date never reaches the card: it keeps the last future date the couple chose
  const last = useRef<Date | null>(null)
  if (pd && !pd.past) last.current = pd.d
  if (!w.date) last.current = null
  const shown = last.current
  const [wd, dm, yr] = shown ? cardDate(shown) : ["", "on a day", "still to be chosen"]
  const ph = shown ? "" : "ph"
  const a = w.a.trim(), b = w.b.trim()
  return (
    <figure className="card" aria-label="Your invitation, as it would read">
      <div className="card__in">
        <Line key="fam" k="fam" className="card__cap">Together with their families</Line>
        <span className="card__names card__names--read" aria-hidden>
          <span className={a ? "" : "ph"}>{a || "Your name"}</span>
          <span className="card__amp">and</span>
          <span className={b ? "" : "ph"}>{b || "your partner"}</span>
        </span>
        <span className="card__names card__names--write">
          <input value={w.a} onChange={e => w.set({ a: e.target.value })} placeholder="Your name" aria-label="Your name" autoComplete="given-name" maxLength={28} />
          <span className="card__amp">and</span>
          <input value={w.b} onChange={e => w.set({ b: e.target.value })} placeholder="your partner" aria-label="Your partner's name" autoComplete="off" maxLength={28} />
        </span>
        <Line key="wm" k="wm">will be married</Line>
        <span className="card__date">
          <Line key={"d1" + wd + dm} k={"d1" + wd + dm} className={ph}>{wd && <>{wd} </>}<span className="nw">{dm}</span></Line>
          <Line key={"d2" + yr} k={"d2" + yr} className={ph}>{yr}</Line>
        </span>
        <span className="card__venue">
          <Line key={"v" + v.id} k={"v" + v.id} className="card__sc">{v.card}</Line>
          <Line key={"p" + v.id} k={"p" + v.id}>{v.place}</Line>
        </span>
        <Line key="g" k="g" className="card__guests"><span>with about </span><span className="num">{w.guests}</span><span> guests</span></Line>
        <span className="card__foot">Planned with Bahamas Bridal Affairs</span>
      </div>
    </figure>
  )
}

/* ---------- the inputs ---------- */
export function Fields() {
  const w = useWedding()
  const pd = parseDate(w.date)
  const step = (n: number) => w.set({ guests: Math.min(400, Math.max(2, (Math.round(w.guests / 10) * 10 || 0) + n)) })
  const min = new Date(); const minIso = `${min.getFullYear()}-${String(min.getMonth() + 1).padStart(2, "0")}-${String(min.getDate()).padStart(2, "0")}`
  const onVenueKey = (e: React.KeyboardEvent) => {
    const i = VENUES.findIndex(x => x.id === w.venue)
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = VENUES[(i + d + VENUES.length) % VENUES.length]
    w.set({ venue: n.id });
    (e.currentTarget.querySelector(`[data-v="${n.id}"]`) as HTMLElement | null)?.focus()
  }
  return (
    <div className="fields">
      <div className="field field--names">
        <label className="cap" htmlFor="name-a">Your names</label>
        <div className="names">
          <input id="name-a" value={w.a} onChange={e => w.set({ a: e.target.value })} placeholder="Your name" autoComplete="given-name" maxLength={28} />
          <span aria-hidden>and</span>
          <input aria-label="Partner's name" value={w.b} onChange={e => w.set({ b: e.target.value })} placeholder="Your partner" autoComplete="off" maxLength={28} />
        </div>
      </div>
      <div className="field field--row">
        <div>
          <label className="cap" htmlFor="date">The date you hope for</label>
          <input id="date" className="num" type="date" min={minIso} value={w.date} onChange={e => w.set({ date: e.target.value })} aria-describedby="date-note" />
          <p id="date-note" className="hint" aria-live="polite">{pd ? (pd.past ? "That date has passed. Pick a future one." : `That is a ${DAYS[pd.d.getDay()]}.`) : "A date, or roughly when."}</p>
        </div>
        <div>
          <span className="cap" id="guests-l">Guests</span>
          <div className="stepper" role="group" aria-labelledby="guests-l">
            <button type="button" onClick={() => step(-10)} aria-label="Ten fewer guests">−</button>
            <input className="num" type="number" inputMode="numeric" min={2} max={400} value={w.guests} aria-label="Number of guests"
              onChange={e => w.set({ guests: Math.min(400, Math.max(0, +e.target.value || 0)) })}
              onBlur={() => w.set({ guests: Math.max(2, w.guests) })} />
            <button type="button" onClick={() => step(10)} aria-label="Ten more guests">+</button>
          </div>
        </div>
      </div>
      <div className="field">
        <span className="cap" id="venue-l">Where, from her published weddings</span>
        <div className="seg" role="radiogroup" aria-labelledby="venue-l" onKeyDown={onVenueKey}>
          {VENUES.map(v => (
            <button key={v.id} type="button" role="radio" data-v={v.id} aria-checked={w.venue === v.id} tabIndex={w.venue === v.id ? 0 : -1} onClick={() => w.set({ venue: v.id })}>{v.label}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <span className="cap" id="help-l">We would like help with</span>
        <div className="chips" role="group" aria-labelledby="help-l">
          {HELP.map(h => (
            <button key={h} type="button" aria-pressed={w.help.includes(h)} onClick={() => w.set({ help: w.help.includes(h) ? w.help.filter(x => x !== h) : [...w.help, h] })}>{h}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- the read-back and the two calls ---------- */
export function Say({ id }: { id?: string }) {
  const { text } = useSentence()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(text) } catch { /* blocked: the sentence stays on screen to read */ }
    setCopied(true); setTimeout(() => setCopied(false), 2200)
  }
  return (
    <div className="say" id={id}>
      <p className="cap">Say this when you call</p>
      <p className="say__text" aria-live="polite">{text}</p>
      <div className="say__calls">
        <a className="btn btn--primary btn--two" href={TEL}><span>Call Nassau</span><span className="num">{PHONE}</span></a>
        <a className="btn btn--line btn--two" href={TEL_US}><span>From the US and Canada</span><span className="num">{PHONE_US}</span></a>
        <button type="button" className="link" onClick={copy}><span key={String(copied)} className="swap">{copied ? "Copied" : "Copy the sentence"}</span></button>
      </div>
    </div>
  )
}
