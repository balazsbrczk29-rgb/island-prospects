import { useMemo, useState } from "react"
import Film from "./film"
import { Ask, EndCredits, mount, useWheelSmoothing } from "./shell"
import { HELP, IMG, PHONE, PHONE_US, PUBLISHED, TEL, TEL_US, VENUES } from "./content"

function Planner() {
  return (
    <section className="planner" id="the-planner">
      <div className="planner__grid">
        <h2>Dr. Bernadette Burrows, wedding planner for more than twenty-six years.</h2>
        <div className="planner__text">
          <p className="planner__lead">She owns and runs Bahamas Bridal Affairs herself, from Nassau. Both weddings on this page carry her name in the credits.</p>
          <ul className="planner__facts">
            <li>A preferred wedding planner with the One and Only Ocean Club and Atlantis, for many years.</li>
            <li>Individual, personal attention for every couple.</li>
            <li>Packages that flex to fit what you ask for.</li>
            <li>Author of <cite>How to Be Fabulous</cite>.</li>
          </ul>
        </div>
        <figure className="planner__photo">
          <img src={IMG.flowers} alt="White roses, orchids and calla lilies with candles on a wedding table by the sea" data-source="generated" loading="lazy" decoding="async" width={1632} height={2048} />
        </figure>
      </div>
    </section>
  )
}

function InPrint() {
  return (
    <section className="print" id="in-print">
      <div className="print__head">
        <h2>Two of her weddings, as the magazines told them.</h2>
      </div>
      <ol className="print__list">
        {PUBLISHED.map(w => (
          <li className="print__item" key={w.id}>
            <p className="print__mag">{w.mag}<span className="num">{w.date}</span></p>
            <div className="print__body">
              <h3>{w.title}</h3>
              <p>{w.teaser}</p>
            </div>
            <div className="print__links">
              <a className="quiet" href={`weddings.html#${w.id}`}>The story and every credit</a>
              <a className="quiet" href={w.url} rel="noopener">Read it in {w.mag}</a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** The enquiry: one sentence the couple completes, then reads to the planner or copies. */
function DateNote() {
  const [names, setNames] = useState("")
  const [venue, setVenue] = useState(VENUES[0])
  const [when, setWhen] = useState("")
  const [guests, setGuests] = useState("80")
  const [help, setHelp] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const toggle = (h: string) => setHelp(s => (s.includes(h) ? s.filter(x => x !== h) : [...s, h]))
  const note = useMemo(() => {
    const list = help.length > 1 ? `${help.slice(0, -1).join(", ")} and ${help[help.length - 1]}` : help[0]
    return `Hello Dr. Burrows. We are ${names.trim() || "(our names)"}, hoping to marry ${venue}${when.trim() ? ` around ${when.trim()}` : ""}, with about ${guests || "?"} guests.${list ? ` We would like help with ${list}.` : ""}`
  }, [names, venue, when, guests, help])
  const copy = async () => {
    try { await navigator.clipboard.writeText(note) } catch { /* clipboard blocked: the note is still on screen to read */ }
    setCopied(true); setTimeout(() => setCopied(false), 2400)
  }
  return (
    <section className="date" id="your-date">
      <div className="date__in">
        <h2>Your date, in one sentence. Fill in the underlined parts.</h2>
        <p className="note">
          We are{" "}
          <label><span className="vh">Your names</span><input className="names" name="names" value={names} onChange={e => setNames(e.target.value)} placeholder="your two names" autoComplete="off" /></label>,
          hoping to marry{" "}
          <label><span className="vh">Where</span>
            <span className="pick"><span aria-hidden>{venue}</span>
              <select name="venue" value={venue} onChange={e => setVenue(e.target.value)}>
                {VENUES.map(v => <option key={v}>{v}</option>)}
              </select>
            </span>
          </label>{" "}
          around{" "}
          <label><span className="vh">Date or month</span><input className="when" name="when" value={when} onChange={e => setWhen(e.target.value)} placeholder="a date or a month" autoComplete="off" /></label>,
          with about{" "}
          <label><span className="vh">Number of guests</span><input className="guests" name="guests" type="number" inputMode="numeric" min={2} max={400} value={guests} onChange={e => setGuests(e.target.value)} /></label>{" "}
          guests. We would like help with:
        </p>
        <div className="help" role="group" aria-label="What you would like help with">
          {HELP.map(h => <button key={h} type="button" aria-pressed={help.includes(h)} onClick={() => toggle(h)}>{h}</button>)}
        </div>
        <p className="date__say">Read your sentence out when you call, or copy it and keep it beside the phone.</p>
        <div className="date__send">
          <a className="cta num" href={TEL}>Call Nassau {PHONE}</a>
          <a className="quiet num" href={TEL_US}>From the US or Canada: {PHONE_US}</a>
          <button type="button" className="quiet" onClick={copy} aria-live="polite"><span className={copied ? "copied" : undefined}>{copied ? "Copied, ready to paste" : "Copy our sentence"}</span></button>
        </div>
      </div>
    </section>
  )
}

const HIDE = [".film", "#your-date", ".credits"]

function Home() {
  useWheelSmoothing()
  return (
    <>
      <a className="skip" href="#the-planner">Skip the film</a>
      <main>
        <Film />
        <Planner />
        <InPrint />
        <DateNote />
      </main>
      <EndCredits />
      <Ask href="#your-date" hideOver={HIDE} />
    </>
  )
}

mount(<Home />)
