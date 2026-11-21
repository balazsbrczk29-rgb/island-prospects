import { useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { AnimatePresence, LayoutGroup, animate, motion } from "motion/react"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Minus, Phone, Play, Plus, X } from "lucide-react"
import { COTTAGES, EMAIL, EXTRAS, FAQ, FB, FILM, I, NAME, PHONE, TAX, TEL, bookUrl, type Cottage, type Shot } from "./data"
import "./styles.css"

/* ---------- helpers ---------- */
const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US")
const iso = (d: Date) => d.toISOString().slice(0, 10)
const addDays = (s: string, n: number) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return iso(d) }
const nightsBetween = (a: string, b: string) => Math.max(0, Math.round((+new Date(b + "T12:00:00") - +new Date(a + "T12:00:00")) / 864e5))
const short = (s: string) => new Date(s + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
const lodging = (c: Cottage, n: number) => c.rate * n * (1 + TAX.vat + TAX.levy)
/** Dinner is offered Wednesday to Saturday: count those evenings inside the stay. */
const dinnerNights = (a: string, n: number) => { let k = 0; for (let i = 0; i < n; i++) { const d = new Date(a + "T12:00:00"); d.setDate(d.getDate() + i); const w = d.getDay(); if (w >= 3 && w <= 6) k++ } return k }
const ease = [0.22, 1, 0.36, 1] as const

function Ticker({ value, from }: { value: number; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(from ?? value)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = usd(value); prev.current = value; return }
    const c = animate(prev.current, value, { duration: 0.55, ease, onUpdate: v => { el.textContent = usd(v) } })
    prev.current = value
    return () => c.stop()
  }, [value])
  return <span ref={ref} className="num">{usd(value)}</span>
}

function Photo({ s, className = "", eager = false, sizes }: { s: Shot; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <figure className={`photo ${className}`} style={{ maxWidth: s.w, aspectRatio: `${s.w} / ${s.h}` }}>
      <img src={I + s.f} alt={s.alt} width={s.w} height={s.h} loading={eager ? "eager" : "lazy"} decoding="async" sizes={sizes} />
    </figure>
  )
}

type Stay = { arrive: string; leave: string; guests: number }
type Extras = { breakfast: boolean; dinner: boolean; taxi: boolean }

/* ---------- top bar ---------- */
function Top() {
  return (
    <div className="top wrap">
      <a className="wordmark" href="#top" aria-label={`${NAME}, top of page`}>Pigeon Cay <i>Beach Club</i></a>
      <nav aria-label="Sections">
        <a href="#cottages">Cottages</a>
        <a href="#place">The 200 acres</a>
        <a href="#meals">Meals</a>
        <a href="#getting-here">Getting here</a>
        <a href="#weddings">Weddings</a>
      </nav>
      <a className="top-tel num" href={TEL}><Phone aria-hidden /> <span>{PHONE}</span></a>
    </div>
  )
}

/* ---------- 1. the beach, the strip and the chooser ---------- */
const BAND: Shot[] = [
  { f: "header-6.jpg", w: 1920, h: 532, alt: "Turquoise water and a breaking wave between the stone gateposts and palms at Pigeon Cay" },
  { f: "header-3.jpg", w: 1920, h: 532, alt: "A rope hammock between casuarina trees beside a white cottage at Pigeon Cay" },
]

function Band() {
  const [on, setOn] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let vis = true
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting }); if (ref.current) io.observe(ref.current)
    const id = setInterval(() => { if (vis && !document.hidden) setOn(v => (v + 1) % BAND.length) }, 7000)
    return () => { clearInterval(id); io.disconnect() }
  }, [])
  return (
    <div className="band" ref={ref}>
      {BAND.map((s, i) => (
        <img key={s.f} src={I + s.f} alt={i === on ? s.alt : ""} aria-hidden={i !== on} width={s.w} height={s.h} data-on={i === on} fetchPriority={i === 0 ? "high" : "low"} decoding="async" />
      ))}
    </div>
  )
}

function Stepper({ value, set, min, max, label }: { value: number; set: (n: number) => void; min: number; max: number; label: string }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => set(Math.max(min, value - 1))}><Minus aria-hidden /></button>
      <output className="num" aria-live="polite">{value}</output>
      <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => set(Math.min(max, value + 1))}><Plus aria-hidden /></button>
    </div>
  )
}

function Strip({ stay, setStay, today }: { stay: Stay; setStay: (s: Stay) => void; today: string }) {
  const n = nightsBetween(stay.arrive, stay.leave)
  return (
    <form className="strip" onSubmit={e => { e.preventDefault(); location.href = bookUrl(stay.arrive, stay.leave, stay.guests) }} aria-label="Your dates">
      <label className="field">
        <span>Arrive</span>
        <input className="num" type="date" min={today} value={stay.arrive} required
          onChange={e => { const a = e.target.value; if (!a) return; setStay({ ...stay, arrive: a, leave: nightsBetween(a, stay.leave) > 0 ? stay.leave : addDays(a, 7) }) }} />
      </label>
      <label className="field">
        <span>Leave</span>
        <input className="num" type="date" min={addDays(stay.arrive, 1)} value={stay.leave} required
          onChange={e => { const l = e.target.value; if (l && nightsBetween(stay.arrive, l) > 0) setStay({ ...stay, leave: l }) }} />
      </label>
      <div className="field field--guests">
        <span id="g-l">Guests</span>
        <Stepper label="Guests" value={stay.guests} min={1} max={6} set={g => setStay({ ...stay, guests: g })} />
      </div>
      <div className="strip-go">
        <button className="btn" type="submit">Check availability <ArrowUpRight aria-hidden /></button>
        <p className="promise"><b>No deposit.</b> Pay when you leave.</p>
      </div>
      <p className="sr-only" aria-live="polite">{n} nights selected</p>
    </form>
  )
}

function Card({ c, n, fits, guests, open, i }: { c: Cottage; n: number; fits: boolean; guests: number; open: (id: string) => void; i: number }) {
  const s = c.shots[0]
  return (
    <motion.li layout="position" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ layout: { duration: 0.6, ease }, default: { duration: 0.9, ease, delay: 0.25 + i * 0.07 } }} className="card" data-fits={fits}>
      <button type="button" className="card-hit" onClick={() => open(c.id)} aria-label={`${c.name}: see photos and details`}>
        <motion.div layoutId={`ph-${c.id}`} className="card-ph" animate={{ y: fits ? 0 : 10, opacity: fits ? 1 : 0.42 }} transition={{ duration: 0.5, ease }}>
          <img src={I + s.f} alt={s.alt} width={s.w} height={s.h} loading={i < 5 ? "eager" : "lazy"} decoding="async" />
          <span className="card-count num">{c.shots.length} photos</span>
        </motion.div>
        <div className="card-tx">
          <h3>{c.name}</h3>
          <p className="card-meta">Sleeps {c.sleeps} <span aria-hidden>·</span> {c.beds}</p>
          {fits ? (
            <p className="card-price"><span className="num">{usd(c.rate)}</span> a night <span className="card-total">{n} {n === 1 ? "night" : "nights"} <Ticker value={lodging(c, n)} from={0} /> with taxes</span></p>
          ) : (
            <p className="card-price card-price--no">Sleeps {c.sleeps}, not {guests}</p>
          )}
        </div>
      </button>
    </motion.li>
  )
}

function Chooser({ stay, open }: { stay: Stay; open: (id: string) => void }) {
  const n = nightsBetween(stay.arrive, stay.leave)
  const list = useMemo(() => [...COTTAGES].sort((a, b) => (Number(b.sleeps >= stay.guests) - Number(a.sleeps >= stay.guests)) || a.rate - b.rate), [stay.guests])
  const fitCount = list.filter(c => c.sleeps >= stay.guests).length
  const best = list.find(c => c.sleeps >= stay.guests)!
  const rail = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ l: true, r: false })
  const onScroll = () => { const el = rail.current; if (!el) return; setEdge({ l: el.scrollLeft < 8, r: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 }) }
  useEffect(() => { onScroll(); rail.current?.scrollTo({ left: 0, behavior: "smooth" }) }, [stay.guests])
  const nudge = (d: number) => { const el = rail.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: "smooth" }) }
  return (
    <div className="chooser" aria-labelledby="ch-h">
      <div className="chooser-head wrap">
        <div className="chooser-say" aria-live="polite">
          <p id="ch-h" className="say-big"><span className="num">{fitCount}</span> of 8 cottages sleep {stay.guests}. From <b className="say-tot"><Ticker value={lodging(best, n)} from={0} /></b> for <span className="num">{n}</span> {n === 1 ? "night" : "nights"}, taxes&nbsp;in.</p>
          <p className="say-small"><span className="say-d">{short(stay.arrive)} to {short(stay.leave)}. </span>Tap a cottage for its photos. Due today: $0.</p>
        </div>
        <div className="rail-ctl">
          <button type="button" aria-label="Scroll cottages left" disabled={edge.l} onClick={() => nudge(-1)}><ArrowLeft aria-hidden /></button>
          <button type="button" aria-label="Scroll cottages right" disabled={edge.r} onClick={() => nudge(1)}><ArrowRight aria-hidden /></button>
        </div>
      </div>
      <LayoutGroup>
        <ul className="rail" ref={rail} onScroll={onScroll}>
          {list.map((c, i) => <Card key={c.id} c={c} n={n} i={i} fits={c.sleeps >= stay.guests} guests={stay.guests} open={open} />)}
        </ul>
      </LayoutGroup>
    </div>
  )
}

function Hero({ stay, setStay, today, open }: { stay: Stay; setStay: (s: Stay) => void; today: string; open: (id: string) => void }) {
  return (
    <header className="hero" id="top">
      <Top />
      <Band />
      <div className="wrap hero-row">
        <div className="hero-say">
          <h1>Eight cottages on a private beach in north Cat&nbsp;Island</h1>
          <p className="hero-sub">From $215 a night, on 200 acres at Roker's, with an honor bar on the&nbsp;sand.</p>
        </div>
        <Strip stay={stay} setStay={setStay} today={today} />
      </div>
      <Chooser stay={stay} open={open} />
    </header>
  )
}

/* ---------- gallery (tap a cottage) ---------- */
function Gallery({ id, close, stay }: { id: string | null; close: () => void; stay: Stay }) {
  const c = COTTAGES.find(x => x.id === id)
  const n = nightsBetween(stay.arrive, stay.leave)
  const [k, setK] = useState(0)
  useEffect(() => setK(0), [id])
  const fits = c ? c.sleeps >= stay.guests : true
  return (
    <Dialog.Root open={!!c} onOpenChange={o => { if (!o) close() }}>
      <AnimatePresence>
        {c && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div className="g-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div className="g" onKeyDown={e => { if (e.key === "ArrowRight") setK((k + 1) % c.shots.length); if (e.key === "ArrowLeft") setK((k - 1 + c.shots.length) % c.shots.length) }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.45, ease }}>
                <div className="g-bar">
                  <Dialog.Title className="g-title">{c.name}</Dialog.Title>
                  <Dialog.Close className="g-x" aria-label="Close"><X aria-hidden /></Dialog.Close>
                </div>
                <div className="g-body">
                  <div className="g-stage">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.img key={c.shots[k].f} src={I + c.shots[k].f} alt={c.shots[k].alt} width={c.shots[k].w} height={c.shots[k].h}
                        style={{ maxWidth: c.shots[k].w, aspectRatio: `${c.shots[k].w} / ${c.shots[k].h}` }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
                    </AnimatePresence>
                    {c.shots.length > 1 && (
                      <div className="g-nav">
                        <button type="button" aria-label="Previous photo" onClick={() => setK((k - 1 + c.shots.length) % c.shots.length)}><ArrowLeft aria-hidden /></button>
                        <span className="num">{k + 1} / {c.shots.length}</span>
                        <button type="button" aria-label="Next photo" onClick={() => setK((k + 1) % c.shots.length)}><ArrowRight aria-hidden /></button>
                      </div>
                    )}
                    <p className="g-cap">{c.shots[k].alt}</p>
                    <div className="g-thumbs" role="tablist" aria-label={`${c.name} photos`}>
                      {c.shots.map((s, i) => (
                        <button key={s.f} type="button" role="tab" aria-selected={i === k} aria-label={`Photo ${i + 1} of ${c.shots.length}`} onClick={() => setK(i)}>
                          <img src={I + s.f} alt="" width={s.w} height={s.h} loading="lazy" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="g-info">
                    <p className="g-note">{c.note}</p>
                    <dl className="g-facts">
                      <div><dt>Sleeps</dt><dd className="num">{c.sleeps}</dd></div>
                      <div><dt>Beds</dt><dd>{c.beds}</dd></div>
                      <div><dt>Kitchen</dt><dd>{c.kitchen}</dd></div>
                      <div><dt>Nightly rate</dt><dd className="num">{usd(c.rate)}</dd></div>
                    </dl>
                    <div className="g-sum">
                      <p><span className="num">{n}</span> nights, {short(stay.arrive)} to {short(stay.leave)}</p>
                      <p className="g-total"><Ticker value={lodging(c, n)} /> <small>with 10% VAT and 6% levy</small></p>
                      <p className="g-due">Due today <b className="num">$0</b></p>
                    </div>
                    {fits
                      ? <a className="btn btn--wide" href={bookUrl(stay.arrive, stay.leave, stay.guests)}>Check {c.name} for these dates <ArrowUpRight aria-hidden /></a>
                      : <p className="g-warn">{c.name} sleeps {c.sleeps}. For {stay.guests} guests, look at the family cottages.</p>}
                    <p className="g-fine">Opens the club's own booking page with your dates filled in. A card number holds the cottage. No deposit.</p>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

/* ---------- 2. compare the tiers ---------- */
function Compare({ open, stay }: { open: (id: string) => void; stay: Stay }) {
  const n = nightsBetween(stay.arrive, stay.leave)
  const tiers: { key: Cottage["tier"]; title: string; sub: string }[] = [
    { key: "two", title: "For two", sub: "Five cottages, $215 to $250 a night" },
    { key: "family", title: "For families and friends", sub: "Three cottages for four to six, $315 to $425 a night" },
  ]
  return (
    <section className="sec compare" id="cottages" aria-labelledby="cmp-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="cmp-h" className="h2">Every cottage, side by&nbsp;side</h2>
          <p className="lede">Each was built by hand and is different from the next. All are steps from the sand, with housekeeping, air conditioning and ceiling fans. Totals follow your dates; cottages too small for <span className="num">{stay.guests}</span> {stay.guests === 1 ? "guest" : "guests"} are dimmed.</p>
        </div>
        {tiers.map(t => {
          const cs = COTTAGES.filter(c => c.tier === t.key)
          return (
            <div className="tier" key={t.key}>
              <div className="tier-head"><h3>{t.title}</h3><p className="num">{t.sub}</p></div>
              <div className="cmp" role="table" aria-label={t.title} style={{ ["--cols" as string]: cs.length }}>
                <div className="cmp-row cmp-row--ph" role="row">
                  <span className="cmp-lab" role="rowheader"><span className="sr-only">Photo</span></span>
                  {cs.map(c => (
                    <span role="cell" key={c.id} data-fits={c.sleeps >= stay.guests}>
                      <button type="button" className="cmp-ph" onClick={() => open(c.id)} aria-label={`${c.name}: open the photos`}>
                        <img src={I + c.shots[0].f} alt={c.shots[0].alt} width={c.shots[0].w} height={c.shots[0].h} loading="lazy" decoding="async" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="cmp-row cmp-row--name" role="row">
                  <span className="cmp-lab" role="rowheader">Cottage</span>
                  {cs.map(c => <span role="cell" key={c.id} data-fits={c.sleeps >= stay.guests}><b>{c.name}</b><small>{c.note}</small></span>)}
                </div>
                {([["Sleeps", (c: Cottage) => String(c.sleeps)], ["Beds", (c: Cottage) => c.beds], ["Kitchen", (c: Cottage) => c.kitchen], ["A night", (c: Cottage) => usd(c.rate)]] as const).map(([lab, f]) => (
                  <div className="cmp-row" role="row" key={lab}>
                    <span className="cmp-lab" role="rowheader">{lab}</span>
                    {cs.map(c => <span role="cell" className="num" key={c.id} data-fits={c.sleeps >= stay.guests}>{f(c)}</span>)}
                  </div>
                ))}
                <div className="cmp-row cmp-row--total" role="row">
                  <span className="cmp-lab" role="rowheader"><span className="num">{n}</span> nights, taxes in</span>
                  {cs.map(c => (
                    <span role="cell" key={c.id} data-fits={c.sleeps >= stay.guests}>
                      {c.sleeps >= stay.guests ? <b className="num">{usd(lodging(c, n))}</b> : <em>Sleeps {c.sleeps}</em>}
                      <button type="button" className="link" onClick={() => open(c.id)}>{c.shots.length} photos</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
        <p className="fine">The club also manages private homes near Pigeon Cay. <a href={`mailto:${EMAIL}?subject=Private%20homes%20near%20Pigeon%20Cay`}>Ask about them</a>.</p>
      </div>
    </section>
  )
}

/* ---------- 3. the 200 acres ---------- */
const INCLUDED = [
  "The palapa honor bar on the beach",
  "Morning coffee and tea at the beach bar",
  "Kayaks, canoes and paddle boards",
  "Bicycles for the property's trails",
  "Snorkel gear",
  "Wi-Fi in the public areas",
]

function Place() {
  return (
    <section className="sec place" id="place" aria-labelledby="pl-h">
      <div className="wrap place-grid">
        <div className="place-a">
          <Photo s={{ f: "gallery-img-36.jpg", w: 800, h: 600, alt: "Inside the palapa honor bar: a tiled bar and wooden stools looking out at the sea" }} />
          <p className="cap">The palapa honor bar, open to the beach and the breeze.</p>
        </div>
        <div className="place-b">
          <h2 id="pl-h" className="h2">200 private acres, one beach, and everything to play&nbsp;with</h2>
          <p className="lede">Pigeon Cay sits three miles south of Bennett's Harbour on the north of Cat Island. Behind the beach are soft sandy flats for bonefishing and trails to walk or cycle.</p>
          <h3 className="h3">Included in every stay</h3>
          <ul className="ticks">
            {INCLUDED.map(t => <li key={t}><Check aria-hidden /> {t}</li>)}
          </ul>
          <a className="link" href={FILM}><Play aria-hidden /> Watch the Pigeon Cay film</a>
        </div>
        <div className="place-c">
          <Photo s={{ f: "31.jpg", w: 380, h: 580, alt: "A vine-covered archway and flagstone path leading to the beach" }} />
          <Photo s={{ f: "30.jpg", w: 380, h: 580, alt: "A red umbrella and two loungers on the sand, framed by palm fronds" }} />
          <div className="place-c3">
            <Photo s={{ f: "gallery-img-34.jpg", w: 800, h: 600, alt: "A rope hammock between casuarinas, with kayaks and paddles on the beach" }} />
            <p className="cap">Kayaks wait on the sand. Take one out whenever the water is calm.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. meals and extras ---------- */
function Meals({ extras, setExtras, stay }: { extras: Extras; setExtras: (e: Extras) => void; stay: Stay }) {
  const n = nightsBetween(stay.arrive, stay.leave)
  const dn = dinnerNights(stay.arrive, n)
  const rows: { key: keyof Extras; name: string; detail: string; price: string; sum: number }[] = [
    { key: "breakfast", name: "Breakfast", detail: "Offered every morning, per person", price: "$18", sum: EXTRAS.breakfast * stay.guests * n * (1 + EXTRAS.gratuity) },
    { key: "dinner", name: "Dinner", detail: "Wednesday to Saturday, per person", price: "$35", sum: EXTRAS.dinner * stay.guests * dn * (1 + EXTRAS.gratuity) },
    { key: "taxi", name: "Taxi from the airport", detail: "$60 one way", price: "$120 round trip", sum: EXTRAS.taxiReturn },
  ]
  return (
    <section className="sec meals" id="meals" aria-labelledby="ml-h">
      <div className="wrap meals-grid">
        <div>
          <h2 id="ml-h" className="h2">Cook in your own kitchen, or let the club bring&nbsp;dinner</h2>
          <p className="lede">Every cottage has a kitchen. Breakfast is offered each morning and dinner from Wednesday to Saturday. A 15% gratuity is added to meals.</p>
          <p className="fine">Car rentals start at $75, depending on the vehicle. Cribs are available, and the club lists child care. Flats fishing and boat excursions can be arranged.</p>
        </div>
        <div className="menu" role="group" aria-label="Add extras to your estimate">
          <p className="menu-say">Tap to add them to your estimate for <span className="num">{stay.guests}</span> {stay.guests === 1 ? "guest" : "guests"} and <span className="num">{n}</span> nights.</p>
          {rows.map(r => (
            <button key={r.key} type="button" className="menu-row" aria-pressed={extras[r.key]} onClick={() => setExtras({ ...extras, [r.key]: !extras[r.key] })}>
              <span className="menu-box" aria-hidden>{extras[r.key] && <Check />}</span>
              <span className="menu-name">{r.name}<small>{r.detail}</small></span>
              <span className="menu-price num">{r.price}</span>
              <span className="menu-sum num">{extras[r.key] ? `+${usd(r.sum)}` : ""}</span>
            </button>
          ))}
          <p className="fine">Dinner counts the <span className="num">{dn}</span> Wednesday to Saturday evenings in your dates. Meal sums include the 15% gratuity.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- 5. getting here ---------- */
function Way() {
  return (
    <section className="sec way" id="getting-here" aria-labelledby="way-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="way-h" className="h2">Two airports on Cat Island, then a short taxi&nbsp;ride</h2>
          <p className="lede">The club is on the north of the island, three miles south of Bennett's Harbour. Tell them your flight and they will arrange the transfer.</p>
        </div>
        <div className="line" aria-hidden>
          <span className="stop"><b>Fort Lauderdale</b> or <b>Nassau</b></span>
          <span className="leg">Makers Air, Bahamasair, Western Air</span>
          <span className="stop"><b>Arthur's Town</b> or <b>New Bight</b></span>
          <span className="leg num">Taxi $60</span>
          <span className="stop stop--end"><b>Pigeon Cay</b></span>
        </div>
        <ol className="route">
          <li>
            <h3>From Florida, direct</h3>
            <p><b>Makers Air</b> flies from Fort Lauderdale Executive (FXE) to New Bight, and since May 2026 to Arthur's Town (ATC) in the north.</p>
          </li>
          <li>
            <h3>Or through Nassau</h3>
            <p>Most guests connect in Nassau. <b>Bahamasair</b> flies twice a week to Arthur's Town, <b>Western Air</b> to New Bight, and <b>Marlin Air</b> charters from Nassau, <a className="num" href="tel:+12423423014">242-342-3014</a>.</p>
          </li>
          <li>
            <h3>Taxi to your cottage</h3>
            <p className="num"><b>$60 one way, $120 round trip.</b> A rental car is only worth it if you want to explore.</p>
          </li>
        </ol>
        <div className="offer">
          <h3>Fly free from Nassau</h3>
          <p className="num">Pre-book an air-inclusive stay of 4 to 6 nights and one round-trip ticket from Nassau is free; stay 7 nights and two are, at double occupancy. Book by June 30, 2027 and travel by October 31, 2027. A Bahama Out Islands Promotion Board offer: book at least 14 days ahead, blackout dates and its terms apply.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. weddings ---------- */
const PLAN = ["The marriage licence and the officiant", "Flowers and a photographer", "Rehearsal and reception dinner at the club or a local restaurant", "A locally made cake", "Charter flights from Fort Lauderdale for your guests"]

function Weddings() {
  return (
    <section className="sec wed on-deep" id="weddings" aria-labelledby="wed-h">
      <div className="wrap wed-grid">
        <Photo className="wed-ph" s={{ f: "weddings-3.jpg", w: 640, h: 480, alt: "A bride and groom walking hand in hand along the empty beach" }} />
        <div>
          <h2 id="wed-h" className="h2">Married on the sand, in a 100-year-old church, or at the&nbsp;Hermitage</h2>
          <p className="lede">For two, or for up to 40 guests. The club plans it before, during and after.</p>
          <ul className="ticks">{PLAN.map(t => <li key={t}><Check aria-hidden /> {t}</li>)}</ul>
          <a className="btn btn--light" href={`mailto:${EMAIL}?subject=Wedding%20at%20Pigeon%20Cay`}>Ask about your date</a>
        </div>
      </div>
    </section>
  )
}

/* ---------- 7. policies, contact, book ---------- */
function Policies({ stay, pick }: { stay: Stay; pick: Cottage | null }) {
  return (
    <section className="sec pol" id="policies" aria-labelledby="pol-h">
      <div className="wrap pol-grid">
        <div>
          <h2 id="pol-h" className="h2">The terms, in plain&nbsp;words</h2>
          <dl className="terms">
            <div><dt>To book</dt><dd>A card number holds your cottage. No deposit.</dd></div>
            <div><dt>To pay</dt><dd>On departure.</dd></div>
            <div><dt>To cancel</dt><dd>Free up to 30 days before arrival. Inside 30 days, one night is charged, and can be credited or used within a year.</dd></div>
            <div><dt>Taxes</dt><dd className="num">VAT 10% and resort levy 6% on lodging. 15% gratuity on meals.</dd></div>
          </dl>
        </div>
        <div className="faq">
          {FAQ.slice(3).map(f => (
            <details key={f.q}><summary>{f.q}<Plus aria-hidden /></summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
      <div className="wrap close" id="contact">
        <h2 className="close-h">{pick ? `Hold ${pick.name} today.` : "Hold a cottage today."} Pay nothing until the day you&nbsp;leave.</h2>
        <div className="close-act">
          <a className="btn" href={bookUrl(stay.arrive, stay.leave, stay.guests)}>Check availability <ArrowUpRight aria-hidden /></a>
          <a className="link num" href={TEL}>{PHONE}</a>
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
    </section>
  )
}

function Foot() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <p className="wordmark">Pigeon Cay <i>Beach Club</i></p>
        <p>Roker's, north Cat Island, The Bahamas. Three miles south of Bennett's Harbour.</p>
        <p><a href={FB}>Facebook</a></p>
        <p className="muted">Photography: Pigeon Cay Beach Club.</p>
      </div>
    </footer>
  )
}

/* ---------- the stay bar (after the first screen, hidden over the closing block) ---------- */
function StayBar({ stay, extras, pick, open }: { stay: Stay; extras: Extras; pick: Cottage | null; open: (id: string) => void }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.getElementById("top"), close = document.getElementById("contact")
    let hv = true, cv = false
    const upd = () => setShow(!hv && !cv)
    const io1 = new IntersectionObserver(([e]) => { hv = e.isIntersecting; upd() }, { threshold: 0.05 })
    const io2 = new IntersectionObserver(([e]) => { cv = e.isIntersecting; upd() })
    if (hero) io1.observe(hero); if (close) io2.observe(close)
    return () => { io1.disconnect(); io2.disconnect() }
  }, [])
  useEffect(() => {
    document.documentElement.style.setProperty("--concept-offset", show ? (innerWidth < 700 ? "76px" : "84px") : "0px")
  }, [show])
  const n = nightsBetween(stay.arrive, stay.leave)
  const c = pick && pick.sleeps >= stay.guests ? pick : COTTAGES.find(x => x.sleeps >= stay.guests)!
  const ext = (extras.breakfast ? EXTRAS.breakfast * stay.guests * n : 0) * (1 + EXTRAS.gratuity)
    + (extras.dinner ? EXTRAS.dinner * stay.guests * dinnerNights(stay.arrive, n) : 0) * (1 + EXTRAS.gratuity)
    + (extras.taxi ? EXTRAS.taxiReturn : 0)
  return (
    <AnimatePresence>
      {show && (
        <motion.aside className="bar" aria-label="Your stay" initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ duration: 0.45, ease }}>
          <button type="button" className="bar-what" onClick={() => open(c.id)}>
            <b>{c.name}</b>
            <span className="num bar-dates">{pick && pick.sleeps >= stay.guests ? "" : "Lowest rate that fits. "}{short(stay.arrive)} to {short(stay.leave)}, {stay.guests} {stay.guests === 1 ? "guest" : "guests"}</span>
            <span className="num bar-mtot">{usd(lodging(c, n) + ext)} with taxes, $0 today</span>
          </button>
          <p className="bar-sum"><Ticker value={lodging(c, n) + ext} /><small>estimate with taxes{ext ? " and extras" : ""}. Due today $0</small></p>
          <a className="btn" href={bookUrl(stay.arrive, stay.leave, stay.guests)}>Check availability</a>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

/* ---------- app ---------- */
function App() {
  const today = useMemo(() => iso(new Date()), [])
  const [stay, setStay] = useState<Stay>(() => { const a = addDays(today, 60); return { arrive: a, leave: addDays(a, 7), guests: 2 } })
  const [extras, setExtras] = useState<Extras>({ breakfast: false, dinner: false, taxi: false })
  const [gal, setGal] = useState<string | null>(null)
  const [pickId, setPickId] = useState<string | null>(null)
  const open = (id: string) => { setGal(id); setPickId(id) }
  const pick = COTTAGES.find(c => c.id === pickId) || null
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true })
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Hero stay={stay} setStay={setStay} today={today} open={open} />
      <main id="main">
        <Compare open={open} stay={stay} />
        <Place />
        <Meals extras={extras} setExtras={setExtras} stay={stay} />
        <Way />
        <Weddings />
        <Policies stay={stay} pick={pick} />
      </main>
      <Foot />
      <StayBar stay={stay} extras={extras} pick={pick} open={open} />
      <Gallery id={gal} close={() => setGal(null)} stay={stay} />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
