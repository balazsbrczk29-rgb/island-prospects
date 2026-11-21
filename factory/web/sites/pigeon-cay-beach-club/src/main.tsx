import { useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { animate } from "motion/react"
import { ArrowUpRight, Minus, Play, Plus } from "lucide-react"
import { BOOK, COTTAGES, EMAIL, FAQ, FB, FEES, FILM, I, NAME, PHONE, TEL, type Cottage, type Shot } from "./data"
import "./styles.css"

const usd = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })

function Photo({ s, className = "", eager = false }: { s: Shot; className?: string; eager?: boolean }) {
  return (
    <div className={`photo ${className}`} style={{ maxWidth: s.w }}>
      <img src={I + s.f} alt={s.alt} width={s.w} height={s.h} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  )
}

/* ---------- 1. first screen ---------- */
const REEL: Shot[] = [
  { f: "header-6.jpg", w: 1920, h: 532, alt: "Turquoise sea and a breaking wave seen between the stone gateposts and palms at Pigeon Cay" },
  { f: "header-3.jpg", w: 1920, h: 532, alt: "A rope hammock strung between casuarina trees beside a white cottage at Pigeon Cay" },
]

function Hero() {
  const [on, setOn] = useState(0)
  const auto = useRef(true)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    if (ref.current) io.observe(ref.current)
    const id = setInterval(() => { if (auto.current && visible) setOn(v => (v + 1) % REEL.length) }, 6500)
    return () => { clearInterval(id); io.disconnect() }
  }, [])
  return (
    <header ref={ref} className="hero" id="top">
      <div className="wrap top">
        <a className="wordmark" href="#top">{NAME}</a>
        <nav aria-label="Sections">
          <a href="#cottages">Cottages</a>
          <a href="#tab">Your tab</a>
          <a href="#getting-here">Getting here</a>
          <a href="#weddings">Weddings</a>
          <a className="tel num" href={TEL}>{PHONE}</a>
        </nav>
      </div>
      <div className="wrap hero-grid">
        <h1 className="display rise">
          <span>Pour your own&nbsp;drink.</span>
          <span>Take a&nbsp;kayak.</span>
          <span>Pay when you&nbsp;leave.</span>
        </h1>
        <div className="hero-side rise" style={{ animationDelay: "120ms" }}>
          <p>Eight cottages on a private Cat Island beach, run on the honor system: an honor bar under the palapa, and no deposit to book.</p>
          <div className="hero-cta">
            <a className="btn" href={BOOK}>Check dates <ArrowUpRight aria-hidden /></a>
            <a className="link" href="#tab">Work out your tab</a>
          </div>
          <p className="hero-fact num">From $215 a night. Due today: $0.</p>
        </div>
        <div className="reel rise" style={{ animationDelay: "220ms" }}>
          {REEL.map((s, i) => (
            <img key={s.f} src={I + s.f} alt={s.alt} width={s.w} height={s.h} data-on={i === on} fetchPriority={i === 0 ? "high" : "low"} decoding="async" />
          ))}
          <div className="reel-ctl">
            {REEL.map((s, i) => (
              <button key={s.f} type="button" aria-pressed={i === on} aria-label={i === 0 ? "Show the sea through the gate" : "Show the hammock"} onClick={() => { auto.current = false; setOn(i) }}><i /></button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

/* ---------- 2. on the house ---------- */
function House() {
  return (
    <section className="house on-teal" aria-labelledby="house-h">
      <div className="wrap house-grid">
        <div>
          <h2 id="house-h" className="big">
            The bar is a thatched palapa on the sand, and it runs on the honor system. <em>Kayaks, canoes, paddle boards, bicycles and snorkel gear</em> are yours to take. Morning coffee and tea wait at the beach bar. You settle up on your last day.
          </h2>
          <div className="house-foot">
            <p>Pigeon Cay is a 200-acre private property on the north of Cat Island, three miles south of Bennett's Harbour.</p>
            <a className="link" href={FILM}><Play aria-hidden style={{ width: 16, height: 16, marginRight: 8 }} />Watch the Pigeon Cay film</a>
          </div>
        </div>
        <div className="prints">
          <Photo s={{ f: "gallery-img-36.jpg", w: 800, h: 600, alt: "Inside the palapa honor bar: a tiled bar and wooden stools looking out at the sea" }} />
          <Photo s={{ f: "gallery-img-34.jpg", w: 800, h: 600, alt: "A hammock between casuarinas with kayaks and paddles stacked on the beach" }} />
        </div>
      </div>
    </section>
  )
}

/* ---------- 3. cottages ---------- */
function CottageDetail({ c, onPick }: { c: Cottage; onPick: () => void }) {
  return (
    <div className="cot-detail swap" key={c.id}>
      <div className="cot-shots" data-n={c.shots.length}>
        {c.shots.map(s => <Photo key={s.f} s={s} />)}
      </div>
      <p>{c.note} {c.kitchen}, air conditioning, ceiling fans and an outdoor seat with an ocean view.</p>
      <a className="btn" href="#tab" onClick={onPick}>Put {c.name} on your tab</a>
    </div>
  )
}

function Cottages({ pick, setPick }: { pick: string; setPick: (id: string) => void }) {
  const c = COTTAGES.find(x => x.id === pick)!
  return (
    <section className="sec" id="cottages" aria-labelledby="cot-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="cot-h" className="h2">Eight cottages, $215 to $425 a&nbsp;night</h2>
          <p className="muted">Each one was built by hand and is different from the next. All are steps from the beach, with housekeeping included.</p>
        </div>
        <div className="cots">
          <ul>
            {COTTAGES.map(x => (
              <li key={x.id}>
                <div className="cot">
                  <button type="button" className="cot-row" aria-expanded={x.id === pick} onClick={() => setPick(x.id)}>
                    <span className="cot-name">{x.name}</span>
                    <span className="cot-meta">Sleeps {x.sleeps === 2 ? "1 to 2" : `1 to ${x.sleeps}`}. {x.beds}. {x.kitchen}.</span>
                    <span className="cot-rate num">{usd(x.rate)}<small>a night</small></span>
                  </button>
                  {x.id === pick && <div className="cot-inline"><CottageDetail c={x} onPick={() => setPick(x.id)} /></div>}
                </div>
              </li>
            ))}
          </ul>
          <aside className="cot-panel" aria-live="polite" aria-label={`${c.name} photographs`}>
            <CottageDetail c={c} onPick={() => setPick(c.id)} />
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. the tab ---------- */
function Money({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = usd(value); prev.current = value; return }
    const ctl = animate(prev.current, value, { duration: 0.45, ease: [0.22, 1, 0.36, 1], onUpdate: v => { el.textContent = usd(Math.round(v)) }, onComplete: () => { el.textContent = usd(value) } })
    prev.current = value
    return () => ctl.stop()
  }, [value])
  return <b ref={ref} className="num">{usd(value)}</b>
}

function Stepper({ label, value, set, min, max }: { label: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="step" role="group" aria-label={label}>
      <button type="button" aria-label={`Fewer: ${label}`} aria-disabled={value <= min} onClick={() => set(Math.max(min, value - 1))}><Minus aria-hidden /></button>
      <output className="num" aria-live="polite">{value}</output>
      <button type="button" aria-label={`More: ${label}`} aria-disabled={value >= max} onClick={() => set(Math.min(max, value + 1))}><Plus aria-hidden /></button>
    </div>
  )
}

function Tab({ pick, setPick }: { pick: string; setPick: (id: string) => void }) {
  const c = COTTAGES.find(x => x.id === pick)!
  const [nights, setNights] = useState(7)
  const [guests, setGuests] = useState(2)
  const [bfast, setBfast] = useState(0)
  const [dinner, setDinner] = useState(0)
  const [taxi, setTaxi] = useState<"none" | "one" | "return">("return")
  const [arrive, setArrive] = useState("")
  const g = Math.min(guests, c.sleeps), b = Math.min(bfast, nights), d = Math.min(dinner, nights)
  const t = useMemo(() => {
    const lodging = c.rate * nights
    const tax = Math.round(lodging * (FEES.vat + FEES.levy) * 100) / 100
    const meals = b * g * FEES.breakfast + d * g * FEES.dinner
    const grat = Math.round(meals * FEES.gratuity * 100) / 100
    const cab = taxi === "return" ? FEES.taxiReturn : taxi === "one" ? FEES.taxiOneWay : 0
    return { lodging, tax, meals, grat, cab, total: Math.round((lodging + tax + meals + grat + cab) * 100) / 100 }
  }, [c, nights, g, b, d, taxi])
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`Dates for ${c.name}, ${nights} nights`)}&body=${encodeURIComponent(
    `Hello,\n\nWe would like to stay at Pigeon Cay Beach Club.\n\nCottage: ${c.name} (${usd(c.rate)} a night)\nArriving: ${arrive || "flexible"}\nNights: ${nights}\nGuests: ${g}\nBreakfasts: ${b} mornings\nDinners: ${d} evenings\nTaxi: ${taxi === "return" ? "both ways" : taxi === "one" ? "one way" : "not needed"}\nEstimated tab: ${usd(t.total)}\n\nIs the cottage free for these dates?\n\nThank you`)}`
  return (
    <section className="tab" id="tab" aria-labelledby="tab-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="tab-h" className="h2">Work out your tab before you&nbsp;come</h2>
          <p>Every rate, tax and fee the club publishes, added up. Nothing is charged until the day you leave.</p>
        </div>
        <div className="tab-grid">
          <div>
            <div className="field">
              <span className="lab" id="f-cot">Cottage</span>
              <div className="chips" role="group" aria-labelledby="f-cot">
                {COTTAGES.map(x => <button key={x.id} type="button" className="chip" aria-pressed={x.id === pick} onClick={() => setPick(x.id)}>{x.name} <span className="num">{usd(x.rate)}</span></button>)}
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-arr">Arriving</label>
              <input id="f-arr" className="date num" type="date" value={arrive} onChange={e => setArrive(e.target.value)} />
            </div>
            <div className="field">
              <span className="lab">Nights</span>
              <Stepper label="nights" value={nights} set={setNights} min={1} max={28} />
            </div>
            <div className="field">
              <span className="lab">Guests</span>
              <Stepper label="guests" value={g} set={setGuests} min={1} max={c.sleeps} />
              <p className="hint">{c.name} sleeps up to {c.sleeps}. {c.beds}.</p>
            </div>
            <div className="field">
              <span className="lab">Breakfasts</span>
              <Stepper label="breakfast mornings" value={b} set={setBfast} min={0} max={nights} />
              <p className="hint num">$18 a person, offered every morning. Every cottage has its own kitchen too.</p>
            </div>
            <div className="field">
              <span className="lab">Dinners</span>
              <Stepper label="dinner evenings" value={d} set={setDinner} min={0} max={nights} />
              <p className="hint num">$35 a person, Wednesday to Saturday.</p>
            </div>
            <div className="field">
              <span className="lab" id="f-taxi">Airport taxi</span>
              <div className="chips" role="group" aria-labelledby="f-taxi">
                {([["return", "Both ways $120"], ["one", "One way $60"], ["none", "Not needed"]] as const).map(([k, l]) => <button key={k} type="button" className="chip num" aria-pressed={taxi === k} onClick={() => setTaxi(k)}>{l}</button>)}
              </div>
            </div>
          </div>
          <aside className="bill" aria-label="Your estimated tab">
            <h3>{c.name}, {nights} {nights === 1 ? "night" : "nights"}, {g} {g === 1 ? "guest" : "guests"}</h3>
            <dl>
              <div><dt>{nights} × {usd(c.rate)}</dt><dd className="num">{usd(t.lodging)}</dd></div>
              <div><dt>VAT 10% and resort levy 6%</dt><dd className="num">{usd(t.tax)}</dd></div>
              {t.meals > 0 && <div><dt>Meals, with 15% gratuity</dt><dd className="num">{usd(t.meals + t.grat)}</dd></div>}
              {t.cab > 0 && <div><dt>Taxi</dt><dd className="num">{usd(t.cab)}</dd></div>}
            </dl>
            <div className="sum"><span>Due when you leave</span><Money value={t.total} /></div>
            <div className="today"><span>Due today</span><b className="num">$0</b></div>
            <a className="btn" href={BOOK}>Check these dates <ArrowUpRight aria-hidden /></a>
            <a className="link" href={mail}>Email this tab to the club</a>
            <small>An estimate from the club's published rates, with taxes applied to lodging. The club holds a card number to reserve, takes no deposit, and confirms the final amount.</small>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ---------- 5. table and evenings ---------- */
function Evenings() {
  return (
    <section className="sec" aria-labelledby="eat-h">
      <div className="wrap">
        <Photo className="band" s={{ f: "special-bg.jpg", w: 1920, h: 647, alt: "Chairs around the stone fire ring on the beach at Pigeon Cay, late in the day" }} />
        <div className="eat">
          <div>
            <h2 id="eat-h" className="h2">Cook in your own kitchen, or let the club bring&nbsp;dinner</h2>
            <p className="lede" style={{ marginTop: "var(--s5)", maxWidth: "36rem" }}>Breakfast is offered every morning and dinner from Wednesday to Saturday, served at your cottage or outdoors beside the beach.</p>
          </div>
          <dl className="prices num">
            <div><dt>Breakfast<span>each morning, per person</span></dt><dd>$18</dd></div>
            <div><dt>Dinner<span>Wednesday to Saturday, per person</span></dt><dd>$35</dd></div>
            <div><dt>Massage<span>per hour</span></dt><dd>$95</dd></div>
            <div><dt>Babysitting<span>per hour</span></dt><dd>$10</dd></div>
            <div><dt>Car rental<span>depending on the vehicle</span></dt><dd>from $75</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. getting here ---------- */
function Way() {
  return (
    <section className="way on-teal" id="getting-here" aria-labelledby="way-h">
      <div className="wrap">
        <h2 id="way-h" className="h2" style={{ maxWidth: "46rem" }}>One flight to New Bight, then a taxi up the&nbsp;island</h2>
        <ol className="steps">
          <li>
            <h3>Fly to New Bight, Cat Island (TBI)</h3>
            <p><b>Makers Air</b> flies seven days a week from Fort Lauderdale Executive (FXE). <b>Western Air</b> also flies into New Bight, and most other guests connect through Nassau. <b>Marlin Air</b> charters from Nassau: <a className="num" href="tel:+12423423014">242-342-3014</a>.</p>
          </li>
          <li>
            <h3>Take the taxi</h3>
            <p className="num">It is <b>$60 one way, $120 for both ways</b>. Tell the club your flight and they will help arrange the transfer.</p>
          </li>
          <li>
            <h3>Arrive near The Bluff</h3>
            <p>The club is on the north of Cat Island, three miles south of Bennett's Harbour. A rental car is worth having only if you want to explore.</p>
          </li>
          <li className="offer">
            <h3>Fly free from Nassau</h3>
            <p className="num">Pre-book an air-inclusive stay of 4 to 6 nights and one airline ticket from Nassau is free. Stay 7 nights and two are, at double occupancy. Book by June 30, 2027 and travel by October 31, 2027. The offer runs through the Bahama Out Islands Promotion Board and its terms apply.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}

/* ---------- 7. weddings, a guest, questions ---------- */
function Weddings() {
  return (
    <section className="sec" id="weddings" aria-labelledby="wed-h">
      <div className="wrap wed">
        <div>
          <h2 id="wed-h" className="h2">Married barefoot on the sand, or in a 100-year-old&nbsp;church</h2>
          <p className="lede" style={{ marginTop: "var(--s5)", maxWidth: "34rem" }}>For two, or for up to 40 guests. Ceremonies are held on the beach, in the old church near the cottages, or at the Hermitage.</p>
          <a className="btn" href={`mailto:${EMAIL}?subject=${encodeURIComponent("A wedding at Pigeon Cay")}`}>Ask about a wedding date</a>
        </div>
        <p className="flow muted">The club plans the whole of it, before, during and after: the marriage licence and the officiant, flowers and a photographer, the rehearsal and reception dinner at the beach club or a local restaurant, a locally made cake, a DJ or a rake and scrape band, transport on the island, and charter flights from Fort Lauderdale for your guests.</p>
      </div>
    </section>
  )
}

function Said() {
  return (
    <section className="said" aria-label="A returning guest">
      <div className="wrap said-grid">
        <blockquote>
          <p>“We love the laid back home feel of PCBC. Ned &amp; Leslie treat us as family and are warm and friendly.”</p>
          <footer>Dan M. has spent more than 300 days on Cat Island over 11 years of visits. From his <a href="https://www.tripadvisor.com/ShowUserReviews-g147427-d151487-r1008992098-Pigeon_Cay_Beach_Club-Cat_Island_Out_Islands_Bahamas.html">TripAdvisor review</a>, May 2025.</footer>
        </blockquote>
        <div className="trio">
          <Photo s={{ f: "30.jpg", w: 380, h: 580, alt: "Two loungers and an umbrella on the sand, framed by palm fronds, late afternoon" }} />
          <Photo s={{ f: "34.jpg", w: 380, h: 580, alt: "White sand and glassy turquoise water at Pigeon Cay" }} />
          <Photo s={{ f: "31.jpg", w: 380, h: 580, alt: "A vine-covered archway and flagstone path leading to the beach" }} />
        </div>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section className="sec" aria-labelledby="faq-h">
      <div className="wrap faq">
        <h2 id="faq-h" className="h2">Before you ask</h2>
        <div>
          {FAQ.map(f => (
            <details key={f.q}>
              <summary>{f.q}<Plus aria-hidden /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 8. contact ---------- */
function Foot() {
  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="tel num" href={TEL}>{PHONE}</a>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="side">
            <p>The club holds a card number to reserve your cottage. No deposit. You pay on departure.</p>
            <a className="btn btn--straw" href={BOOK}>Check dates <ArrowUpRight aria-hidden /></a>
          </div>
        </div>
        <div className="fine">
          <span>{NAME}, near The Bluff, north Cat Island, The Bahamas</span>
          <a href={FB}>Facebook</a>
          <span>Photography: Pigeon Cay Beach Club</span>
        </div>
      </div>
    </footer>
  )
}

function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.getElementById("top"), foot = document.getElementById("contact")
    if (!hero || !foot) return
    const seen = { hero: true, foot: false }
    const apply = () => {
      const s = !seen.hero && !seen.foot
      setShow(s)
      document.documentElement.style.setProperty("--concept-offset", s && innerWidth < 861 ? "64px" : "0px")
    }
    const io = new IntersectionObserver(es => { for (const e of es) { if (e.target === hero) seen.hero = e.isIntersecting; else seen.foot = e.isIntersecting } apply() }, { threshold: 0.05 })
    io.observe(hero); io.observe(foot)
    return () => io.disconnect()
  }, [])
  return (
    <nav className="dock" data-show={show} aria-label="Quick links" inert={!show}>
      <a href="#cottages">Cottages</a>
      <a href="#tab">Your tab</a>
      <a className="opt" href="#getting-here">Getting here</a>
      <a className="btn" href={BOOK}>Check dates</a>
    </nav>
  )
}

function App() {
  const [pick, setPick] = useState("sea-studio")
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true })
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero />
      <main id="main">
        <House />
        <Cottages pick={pick} setPick={setPick} />
        <Tab pick={pick} setPick={setPick} />
        <Evenings />
        <Way />
        <Weddings />
        <Said />
        <Questions />
      </main>
      <Foot />
      <Dock />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
