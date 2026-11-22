import { StrictMode, useEffect, useMemo, useState } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import Lenis from "lenis"
import { BOOK, fmtDate, IMG, inClosure, LOGO, MAP_PDF, MAPS, MARINA_EMAIL, MARINA_PHONE, MARINA_TEL, MAX_LOA, PHONE, POWER, ROOMS, SLIP, SPECS, TEL } from "./data"
import "./styles.css"

const ease = [0.16, 1, 0.3, 1] as const
type Mode = "boat" | "air"

function Nav() {
  return (
    <header className="nav wrap">
      <a href="#top" className="nav__brand" aria-label="Romora Bay Resort and Marina, top of page">
        <img src={LOGO} alt="" width={36} height={36} />
        <span>Romora Bay</span>
      </a>
      <nav className="nav__links" aria-label="Sections">
        <a href="#marina">Marina</a><a href="#rooms">Rooms</a><a href="#day">A day here</a><a href="#here">Getting here</a>
      </nav>
      <a className="nav__tel num" href={TEL}>{PHONE}</a>
    </header>
  )
}

function BoatTool() {
  const [loa, setLoa] = useState(80)
  const [power, setPower] = useState("50 amp")
  const [abroad, setAbroad] = useState(true)
  const [arr, setArr] = useState("")
  const [dep, setDep] = useState("")
  const fits = loa <= MAX_LOA
  const href = useMemo(() => {
    const body = [
      "Hello Romora Bay Marina,", "",
      `Slip request for a ${loa} ft vessel.`,
      `Power: ${power}`,
      `Clearing in from abroad: ${abroad ? "yes" : "no"}`,
      `Arrival: ${arr || "(date)"}`, `Departure: ${dep || "(date)"}`,
      "Boat name:", "Captain and phone:", "", "Thank you",
    ].join("\n")
    const subject = `Slip request, ${loa} ft${arr ? `, arriving ${arr}` : ""}`
    return `mailto:${MARINA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [loa, power, abroad, arr, dep])
  const clamp = (v: number) => Math.max(20, Math.min(240, Math.round(v || 0)))
  return (
    <div className="tool">
      <div className="loa">
        <label htmlFor="loa-n" className="cap">Length overall</label>
        <div className="loa__row">
          <span className="loa__track">
            <input id="loa-r" type="range" min={20} max={240} value={loa} onChange={e => setLoa(+e.target.value)} aria-label="Length overall in feet" />
            <span className="fit__mark" aria-hidden="true" style={{ left: `calc(10px + (100% - 20px) * ${(MAX_LOA - 20) / 220})` }}><i className="num">190 ft</i></span>
          </span>
          <span className="loa__num"><input id="loa-n" className="num" type="number" inputMode="numeric" min={20} max={240} value={loa} onChange={e => setLoa(clamp(+e.target.value))} /> ft</span>
        </div>
      </div>
      <fieldset className="grp">
        <legend className="cap">Power</legend>
        <div className="chips">
          {[...POWER, "Not sure"].map(p => <button key={p} type="button" className="chip" aria-pressed={power === p} onClick={() => setPower(p)}>{p}</button>)}
        </div>
      </fieldset>
      <div className="two">
        <fieldset className="grp">
          <legend className="cap">Clearing in from abroad?</legend>
          <div className="yn">
            <button type="button" className="chip" aria-pressed={abroad} onClick={() => setAbroad(true)}>Yes</button>
            <button type="button" className="chip" aria-pressed={!abroad} onClick={() => setAbroad(false)}>No</button>
          </div>
        </fieldset>
        <div className="dates">
          <label><span className="cap">Arrive</span><input type="date" value={arr} onChange={e => setArr(e.target.value)} /></label>
          <label><span className="cap">Leave</span><input type="date" value={dep} min={arr || undefined} onChange={e => setDep(e.target.value)} /></label>
        </div>
      </div>
      <ul className="res" aria-live="polite">
        <li data-ok={fits}><span className="num">{loa} ft</span>{fits ? ": within the 190 ft the marina welcomes." : ": over the published 190 ft. Ask the Dockmaster."}</li>
        <li data-ok={power !== "Not sure"}>{power === "Not sure" ? "The Dockmaster will match your shore power." : `${power} is on the marina's published power list.`}</li>
        {abroad && <li data-ok>Official port of entry: customs and immigration at the dock.</li>}
      </ul>
      <div className="act">
        <a className="btn" href={href}>Request this slip</a>
        <p className="act__who">Answered by Rodney Diegue, Dockmaster</p>
      </div>
      <p className="tool__more"><a href={SLIP}>Slip reservations page</a><a href={MAP_PDF}>Marina Map (PDF)</a></p>
    </div>
  )
}

function AirTool() {
  const [date, setDate] = useState("")
  const [nights, setNights] = useState(4)
  const [room, setRoom] = useState(0)
  const start = date ? new Date(date + "T12:00:00") : null
  const closed = start ? inClosure(start, nights) : false
  const r = ROOMS[room]
  return (
    <div className="tool">
      <div className="two">
        <label className="fld"><span className="cap">Arrive</span><input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
        <div className="fld">
          <span className="cap" id="n-l">Nights</span>
          <div className="step" role="group" aria-labelledby="n-l">
            <button type="button" aria-label="One night fewer" onClick={() => setNights(n => Math.max(1, n - 1))} disabled={nights <= 1}>−</button>
            <span className="num" aria-live="polite">{nights}</span>
            <button type="button" aria-label="One night more" onClick={() => setNights(n => Math.min(21, n + 1))} disabled={nights >= 21}>+</button>
          </div>
        </div>
      </div>
      <fieldset className="grp">
        <legend className="cap">Room</legend>
        <div className="rstrip" role="radiogroup" aria-label="Room type">
          {ROOMS.map((x, i) => (
            <button key={x.key} type="button" role="radio" aria-checked={room === i} className="rstrip__b" onClick={() => setRoom(i)}>
              <img src={x.imgs[0]} alt="" width={1200} height={800} loading="lazy" decoding="async" />
              <span>{x.short}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <ul className="res" aria-live="polite">
        {start ? <li data-ok={!closed}><span className="num">{nights} night{nights > 1 ? "s" : ""} from {fmtDate(start)}</span>, {r.name}.</li> : <li>Pick a date to check {r.name}.</li>}
        {closed && <li className="warn">The resort is closed for the season from 17 August to 12 November. Choose dates outside it.</li>}
      </ul>
      <div className="act">
        <a className="btn" href={BOOK} target="_blank" rel="noopener">{closed ? "See open dates" : "Check availability"}</a>
        <p className="act__who">Or call reservations <a className="num" href={TEL}>{PHONE}</a></p>
      </div>
      <p className="tool__more"><span>From North Eleuthera airport: a short taxi to the dock, then about ten minutes by water taxi.</span></p>
    </div>
  )
}

function Hero() {
  const [mode, setMode] = useState<Mode>("boat")
  const reduce = useReducedMotion()
  const key = (e: React.KeyboardEvent) => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) { e.preventDefault(); setMode(m => (m === "boat" ? "air" : "boat")) } }
  const photo = mode === "boat"
    ? { src: IMG.marinaAerial, alt: "The slips of Romora Bay Marina from above, Harbour Island" }
    : { src: IMG.drone, alt: "Romora Bay Resort and Marina from the air, Harbour Island" }
  return (
    <section className="hero" id="top" aria-labelledby="h1">
      <div className="hero__photo">
        <AnimatePresence initial={false}>
          <motion.img key={photo.src} src={photo.src} alt={photo.alt} width={1920} height={1280} fetchPriority="high"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.9, ease }} />
        </AnimatePresence>
      </div>
      <div className="hero__panel">
        <div className="hero__head">
        <p className="cap hero__where">Harbour Island, Eleuthera, The Bahamas</p>
        <h1 id="h1" className="t-hero">One dock for the yacht <em>and the room.</em></h1>
        <p className="hero__lede">Seventeen rooms and a full-service marina, an official port of entry. How are you arriving?</p>
        <div className="sw" role="radiogroup" aria-label="How are you arriving?" onKeyDown={key}>
          {(["boat", "air"] as Mode[]).map(m => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} tabIndex={mode === m ? 0 : -1} className="sw__b" onClick={() => setMode(m)}>
              {mode === m && <motion.span layoutId="sw" className="sw__on" transition={{ duration: reduce ? 0 : 0.3, ease }} />}
              <span className="sw__t">{m === "boat" ? "I'm arriving by boat" : "I'm staying with you"}</span>
            </button>
          ))}
        </div>
        </div>
        <div className="hero__tool">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3, ease }}>
            {mode === "boat" ? <BoatTool /> : <AirTool />}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Marina() {
  return (
    <section className="marina" id="marina" aria-labelledby="m-h">
      <figure className="band">
        <img src={IMG.dock} alt="A sailboat alongside the dock at Romora Bay Marina" width={1920} height={1280} loading="lazy" decoding="async" />
      </figure>
      <div className="marina__grid wrap">
        <div className="marina__say">
          <h2 id="m-h" className="t-h2">Forty-plus slips and a port of entry, <em>with a resort behind them.</em></h2>
          <dl className="people">
            <div><dt>Dockmaster</dt><dd>Rodney Diegue</dd></div>
            <div><dt>Marina Manager</dt><dd>Beriska Moss</dd></div>
          </dl>
          <p className="people__c"><a href={`mailto:${MARINA_EMAIL}`}>{MARINA_EMAIL}</a><a className="num" href={MARINA_TEL}>{MARINA_PHONE}</a><a href={MAP_PDF}>Marina Map (PDF)</a></p>
          <p className="muted small">Association of Bahamas Marinas, Platinum Member. Listed on Snag-A-Slip by Marinalife.</p>
        </div>
        <dl className="specs">
          {SPECS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="num">{v}</dd></div>)}
        </dl>
      </div>
    </section>
  )
}

function Rooms() {
  const [pick, setPick] = useState<number[]>([0, 0, 0])
  return (
    <section className="rooms" id="rooms" aria-labelledby="r-h">
      <div className="wrap">
        <h2 id="r-h" className="t-h2">Seventeen rooms, <em>three ways to stay.</em></h2>
        <ul className="rooms__row">
          {ROOMS.map((r, i) => (
            <li key={r.key} className="room">
              <div className="room__ph">
                <AnimatePresence initial={false}>
                  <motion.img key={r.imgs[pick[i]]} src={r.imgs[pick[i]]} alt={`${r.name} at Romora Bay, photo ${pick[i] + 1} of 4`} width={1200} height={800} loading="lazy" decoding="async"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
                </AnimatePresence>
              </div>
              <div className="room__th" role="group" aria-label={`${r.name} photos`}>
                {r.imgs.map((s, j) => (
                  <button key={s} type="button" aria-label={`Photo ${j + 1}`} aria-pressed={pick[i] === j} onClick={() => setPick(p => p.map((v, k) => (k === i ? j : v)))}>
                    <img src={s} alt="" width={1200} height={800} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
              <h3 className="t-h3">{r.name}</h3>
              <p className="room__t">{r.text}</p>
              <p className="room__f">{r.feats.join(" · ")}</p>
              <a className="btn btn--line" href={BOOK} target="_blank" rel="noopener">Check availability</a>
            </li>
          ))}
        </ul>
        <p className="rooms__note">Rates on the booking page or by phone. The resort closes for the season from 17 August to 12 November.</p>
      </div>
    </section>
  )
}

function Day() {
  return (
    <section className="day" id="day" aria-labelledby="d-h">
      <div className="wrap">
        <h2 id="d-h" className="t-h2">Lunch on the water, <em>dinner upstairs.</em></h2>
        <div className="day__a">
          <img src={IMG.sipsip} alt="Tables on the Sip Sip deck over the harbour" width={1600} height={1067} loading="lazy" decoding="async" />
          <div>
            <h3 className="t-h3">Sip Sip</h3>
            <p>The waterfront restaurant: fresh-caught seafood, local ingredients and sunset cocktails.</p>
            <p className="day__h num">Lunch 11:30am to 4pm. Closed Tuesdays.</p>
          </div>
        </div>
        <div className="day__b">
          <div className="day__c">
            <img src={IMG.upstairs} alt="The patio at Upstairs at Romora, looking over the harbour" width={1200} height={800} loading="lazy" decoding="async" />
            <h3 className="t-h3">Upstairs @ Romora</h3>
            <p>Breakfast and dinner with harbour views and a serious wine list. Catering and events on request.</p>
          </div>
          <div className="day__c">
            <img src={IMG.kayak} alt="Kayaking in clear water off Harbour Island" width={1200} height={800} loading="lazy" decoding="async" />
            <h3 className="t-h3">The water and the pink sand</h3>
            <p>Kayaking, snorkelling and fishing from the resort, and the pink sand beaches a short walk away.</p>
          </div>
          <div className="day__c">
            <img src={IMG.pickle} alt="A pickleball game on the Romora Bay courts" width={1200} height={800} loading="lazy" decoding="async" />
            <h3 className="t-h3">The pickleball club</h3>
            <p>Courts on site, with clinics and social play through the season.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Here() {
  return (
    <section className="here" id="here" aria-labelledby="g-h">
      <div className="wrap">
        <h2 id="g-h" className="t-h2">Getting here.</h2>
        <div className="here__cols">
          <div>
            <h3 className="t-h3">By sea</h3>
            <p>Romora Bay Marina is an official port of entry: clear customs and immigration at the dock. Send your length, power and dates to the marina before you leave.</p>
            <p className="here__c"><a href={`mailto:${MARINA_EMAIL}`}>{MARINA_EMAIL}</a><a className="num" href={MARINA_TEL}>{MARINA_PHONE}</a><a href={MAP_PDF}>Marina Map (PDF)</a></p>
          </div>
          <div>
            <h3 className="t-h3">By air</h3>
            <p>Fly into North Eleuthera airport. From there it is a short taxi ride to the North Eleuthera dock, then about ten minutes by water taxi across to Harbour Island.</p>
            <p className="here__c"><a className="num" href={TEL}>Reservations {PHONE}</a><a href={MAPS} target="_blank" rel="noopener">Open in Maps</a></p>
          </div>
        </div>
      </div>
      <figure className="here__ph wrap">
        <img src={IMG.harbourView} alt="The harbour at Romora Bay seen from the resort" width={1600} height={900} loading="lazy" decoding="async" />
      </figure>
    </section>
  )
}

function Contact() {
  return (
    <section className="close wrap" aria-labelledby="c-h">
      <h2 id="c-h" className="t-h2">Call reservations, <em>or write to the marina.</em></h2>
      <a className="close__tel num" href={TEL}>{PHONE}</a>
      <p className="close__c"><a href={`mailto:${MARINA_EMAIL}`}>{MARINA_EMAIL}</a><a className="num" href={MARINA_TEL}>Marina {MARINA_PHONE}</a><span>Harbour Island, Eleuthera, The Bahamas</span></p>
      <div className="close__act">
        <a className="btn" href={BOOK} target="_blank" rel="noopener">Check availability</a>
        <a className="btn btn--line" href="#top">Request a slip</a>
      </div>
      <footer className="foot">
        <p>Romora Bay Resort & Marina, Harbour Island. Seventeen rooms and a full-service marina.</p>
        <p>Photographs from romorabay.com.</p>
      </footer>
    </section>
  )
}

function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const top = document.getElementById("top"), close = document.getElementById("c-h")
    if (!top || !close) return
    let past = false, atClose = false
    const io = new IntersectionObserver(es => {
      for (const e of es) { if (e.target === top) past = !e.isIntersecting; if (e.target === close) atClose = e.isIntersecting }
      setShow(past && !atClose)
    })
    io.observe(top); io.observe(close)
    return () => io.disconnect()
  }, [])
  return (
    <div className="dock" data-show={show} aria-hidden={!show}>
      <a className="btn btn--line" href="#top" tabIndex={show ? 0 : -1}>Request a slip</a>
      <a className="btn" href={BOOK} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}>Check availability</a>
    </div>
  )
}

function Home() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const l = new Lenis({ duration: 1.1 })
    let id = 0
    const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#top">Skip to the arrival planner</a>
      <Nav />
      <main><Hero /><Marina /><Rooms /><Day /><Here /><Contact /></main>
      <Dock />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
