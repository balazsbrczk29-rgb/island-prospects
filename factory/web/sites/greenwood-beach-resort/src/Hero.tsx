import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { IMG, ROOMS, Photo, BOOK, WA, WHATSAPP, bookingUrl, ease } from "./site"

type RoomId = (typeof ROOMS)[number]["id"]
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
const MONTH_NAME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const short = (s: string, add = 0) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + add); return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) }
/** Oceanic whitetips visit March to June (greenwoodbeachresort.com/activities). */
const inSeason = (m: number) => m >= 2 && m <= 5

function Step({ label, value, min, max, set, unit }: { label: string; value: number; min: number; max: number; set: (v: number) => void; unit: string }) {
  return (
    <div className="bk-cell" role="group" aria-label={label}>
      <span className="bk-k">{label}</span>
      <div className="bk-step">
        <output className="bk-v num" aria-live="polite">{value}<span className="bk-u"> {unit}</span></output>
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => set(value - 1)}>&minus;</button>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => set(value + 1)}>+</button>
      </div>
    </div>
  )
}

/** The month strip: the whitetip band in deep sea blue, a marker on the arrival month. */
function Season({ month }: { month: number }) {
  const reduce = useReducedMotion()
  const on = inSeason(month)
  return (
    <div className="season">
      <div className="season-strip" aria-hidden>
        <span className="season-band" style={{ left: `${(2 / 12) * 100}%`, width: `${(4 / 12) * 100}%` }}><span>Whitetips</span></span>
        {MONTHS.map((m, i) => <span key={i} className={`season-m ${i === month ? "is-on" : ""}`}>{m}</span>)}
        <motion.span className="season-mark" initial={false} animate={{ left: `${((month + 0.5) / 12) * 100}%` }} transition={{ duration: reduce ? 0 : 0.45, ease }} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={on ? "in" : MONTH_NAME[month]} className="season-t" aria-live="polite" initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
          {on
            ? <>Your dates fall in whitetip season, March to June. <a href="#whitetips" className="link">Add the dive package</a></>
            : <>Oceanic whitetips visit from March to June. In {MONTH_NAME[month]}, ask Pauline and Antoine about kite lessons and reef trips.</>}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export function BookStrip({ idp = "h" }: { idp?: string }) {
  const reduce = useReducedMotion()
  const [room, setRoom] = useState<RoomId>("king")
  const [arrive, setArrive] = useState(() => { const d = new Date(); d.setDate(d.getDate() + 30); return iso(d) })
  const [nights, setNights] = useState(4)
  const [adults, setAdults] = useState(2)
  const r = ROOMS.find(x => x.id === room)!
  useEffect(() => {
    const h = (e: Event) => { const id = (e as CustomEvent<RoomId>).detail; const x = ROOMS.find(y => y.id === id); if (!x) return; setRoom(id); setAdults(v => Math.min(v, x.guests)); document.getElementById("dates")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }) }
    window.addEventListener("gw-room", h); return () => window.removeEventListener("gw-room", h)
  }, [reduce])
  const a = Math.min(adults, r.guests)
  const month = arrive ? new Date(arrive + "T12:00:00").getMonth() : new Date().getMonth()
  const href = arrive ? bookingUrl({ roomTypeId: r.roomTypeId, arrive, nights, adults: a }) : BOOK
  return (
    <div className="bk">
      <div className="bk-rooms" role="radiogroup" aria-label="Room">
        {ROOMS.map(x => {
          const on = x.id === room
          return (
            <button key={x.id} type="button" role="radio" aria-checked={on} className={`bk-room ${on ? "is-on" : ""}`} onClick={() => { setRoom(x.id); setAdults(v => Math.min(v, x.guests)) }}>
              <span className="bk-thumb"><Photo img={x.img} alt="" className="h-full w-full" /></span>
              <span className="bk-room-t"><span className="bk-room-n">{x.name.replace("Executive ", "")}</span><span className="bk-room-s num">Sleeps {x.guests}. {x.short}.</span></span>
            </button>
          )
        })}
      </div>
      <div className="bk-row">
        <label className="bk-cell bk-date">
          <span className="bk-k">Arrival</span>
          <span className="bk-v num" aria-hidden>{arrive ? short(arrive) : "Choose"}</span>
          <input id={`${idp}-arrive`} type="date" aria-label="Arrival date" min={iso(new Date())} value={arrive}
            onClick={e => { try { (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.() } catch { /* unsupported */ } }}
            onChange={e => { const v = e.target.value; setArrive(v && v < iso(new Date()) ? iso(new Date()) : v) }} />
        </label>
        <Step label="Nights" value={nights} min={1} max={28} set={setNights} unit={nights === 1 ? "night" : "nights"} />
        <Step label="Adults" value={a} min={1} max={r.guests} set={setAdults} unit={a === 1 ? "adult" : "adults"} />
      </div>
      <div className="bk-go">
        <a href={href} className="btn bk-btn num">{arrive ? `Check dates, ${short(arrive)} to ${short(arrive, nights)}` : "Check dates and book"}</a>
        <p className="bk-note">Opens Greenwood's own booking page with live rates.</p>
      </div>
      <Season month={month} />
          </div>
  )
}

export function HomeHero() {
  const reduce = useReducedMotion()
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease }}>
          <Photo img={IMG.whitetipSurface} eager alt="An oceanic whitetip shark just below the surface off Cat Island, photographed by Greenwood" className="h-full w-full" />
        </motion.div>
      </div>
      <div className="hero-bar">
        <div className="hero-name">
          <p className="hero-cap">Greenwood Beach Resort, south Cat Island</p>
          <h1 id="hero-title" className="mono-word hero-h1">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.25, duration: 1.1, ease }}>Port Howe</motion.span>
            </span>
          </h1>
          <p className="hero-line">Pauline and Antoine's small beachfront resort, where the diving and the kite lessons start at the sand. <a href={WA} className="link num">WhatsApp {WHATSAPP}</a></p>
          <dl className="hero-facts">
            <div><dt>Table</dt><dd>Breakfast, lunch and dinner on the beachfront terrace</dd></div>
            <div><dt>Getting here</dt><dd>Fly to New Bight from Nassau or Fort Lauderdale. <a href="getting-here.html" className="link">How</a></dd></div>
          </dl>
        </div>
        <motion.div id="dates" className="hero-book scroll-mt-24" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }}>
          <BookStrip />
        </motion.div>
      </div>
    </section>
  )
}

/** Screen 2: both rooms side by side, so the choice is obvious. */
export function RoomsCompare() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="cmp">
      <div className="cmp-head">
        <h2 id="rooms-title" className="display text-[length:var(--t-2xl)]">Two rooms, a few steps from the sand.</h2>
        <p className="text-muted">Both are Executive rooms in the garden, each with a private bathroom. Breakfast, lunch and dinner are served on the beachfront terrace. <a href="rooms.html" className="link text-ink">Rooms and meal times</a></p>
      </div>
      <div className="cmp-grid">
        {ROOMS.map(r => (
          <article key={r.id} className="cmp-room">
            <div className="cmp-photo"><Photo img={r.img} alt={r.alt} className="h-full w-full" /></div>
            <h3 className="display cmp-n">{r.name}</h3>
            <dl className="cmp-dl num">
              <div><dt>Sleeps</dt><dd>{r.guests}</dd></div>
              <div><dt>Beds</dt><dd>{r.beds}</dd></div>
            </dl>
            <p className="cmp-line">{r.line}</p>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("gw-room", { detail: r.id }))} className="btn-line btn">Choose this room and dates</button>
          </article>
        ))}
      </div>
    </section>
  )
}
