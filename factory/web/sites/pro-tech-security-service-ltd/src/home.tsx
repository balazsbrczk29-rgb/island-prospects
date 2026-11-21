import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react"
import { CHAPTERS, IMG, PHONE, STOPS, TEL, fmt, nassauNow, officeLine, sceneFor, type Scene } from "./data"
import { Page, mount } from "./site"
import { Planner } from "./planner"

const SCENES: Scene[] = ["day", "dusk", "night"]
const INK: Record<Scene, string> = { day: "#101a24", dusk: "#f4efe4", night: "#e9e4d8" }

function Hero({ hour, setHour, live, weekday }: { hour: number; setHour: (h: number, live?: boolean) => void; live: boolean; weekday: number }) {
  const scene = sceneFor(hour)
  return (
    <section className="hero" data-hero aria-labelledby="h1">
      <div className="frames">
        {SCENES.map(s => (
          <img key={s} src={`${IMG}street-${s}.jpg`} alt={s === scene ? `A Nassau shop corner with a camera on the wall, at ${s === "day" ? "late morning" : s === "dusk" ? "dusk" : "night"} (illustrative)` : ""} aria-hidden={s !== scene} width={1920} height={1080} style={{ opacity: s === scene ? 1 : 0 }} fetchPriority={s === "day" ? "high" : "auto"} />
        ))}
      </div>
      <div className="strip">
        <div>
          <h1 id="h1"><span className="clock num">{live ? "It is " : "At "}{fmt(hour)}{live ? " in Nassau." : ","}</span> {live ? officeLine(hour, weekday) : hour >= 9 && hour < 17 ? "our office on Farrington Road is open." : "our office is closed."} The central station is watching.</h1>
          <p className="sub">Pro-Tech Security: guards, CCTV and alarms, and 24/7 monitoring, from Nassau since 2004.</p>
        </div>
        <a className="btn num" href={`tel:${TEL}`}>Call {PHONE}</a>
        <div className="track">
          <label className="sr" htmlFor="hour" style={{ position: "absolute", left: -9999 }}>Time of day in Nassau</label>
          <input id="hour" type="range" min={0} max={23.5} step={0.25} value={hour} aria-valuetext={fmt(hour)} onChange={e => setHour(Number(e.target.value))} />
          <div className="stops">
            <button type="button" aria-pressed={live} onClick={() => setHour(nassauNow().hour, true)}><b>Now</b>Nassau time</button>
            {STOPS.map(s => <button key={s.label} type="button" aria-pressed={!live && hour === s.hour} onClick={() => setHour(s.hour)}><b className="num">{s.label}</b>{s.title}</button>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Card0() {
  return (
    <section className="card0" id="who" aria-labelledby="who-h">
      <span className="n num">1.0</span>
      <h2 id="who-h">Since 2004. 100% Bahamian owned. Licensed by the Ministry of National Security.</h2>
      <dl className="facts">
        <div><dt>Office</dt><dd>#2 Farrington Road &amp; Gregory Street, Nassau</dd></div>
        <div><dt>Office hours</dt><dd className="num">Monday to Friday, 9 am to 5 pm</dd></div>
        <div><dt>Monitoring</dt><dd>Central station, 24/7</dd></div>
        <div className="act"><a className="btn num" href={`tel:${TEL}`}>Call {PHONE}</a></div>
      </dl>
    </section>
  )
}

function Frame({ i, n, p, src, alt, portrait }: { i: number; n: number; p: MotionValue<number>; src: string; alt: string; portrait: boolean }) {
  const seg = 1 / n
  const opacity = useTransform(p, v => {
    if (i === 0) return 1
    const start = i * seg - seg * 0.28
    return Math.min(1, Math.max(0, (v - start) / (seg * 0.28)))
  })
  const scale = useTransform(p, v => 1.06 - 0.06 * Math.min(1, Math.max(0, (v - i * seg + seg * 0.3) / (seg * 1.3))))
  return <motion.img src={`${IMG}${src}`} alt={alt} className={portrait ? "portrait" : undefined} style={{ opacity, scale, zIndex: i }} width={1920} height={1080} loading="lazy" />
}

function Stage() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [k, setK] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", v => {
    const next = Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(v * CHAPTERS.length + 0.15)))
    setK(prev => (prev === next ? prev : next))
  })
  const c = CHAPTERS[k]
  return (
    <section className="stage" id="hours" ref={ref} data-stage aria-label="Twenty-four hours with Pro-Tech" style={{ height: `${CHAPTERS.length * 100}svh` }}>
      <div className="pin">
        <div className="imgs">
          {CHAPTERS.map((ch, i) => <Frame key={ch.img} i={i} n={CHAPTERS.length} p={scrollYProgress} src={ch.img} alt={ch.alt} portrait={ch.img === "guard-gate.jpg"} />)}
        </div>
        <motion.div className="cap" key={c.n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <span className="time num">{c.time}</span>
          <div>
            <span className="n num">{c.n}</span>
            <h2>{c.title}</h2>
            {c.lines.map(l => <p key={l}>{l}</p>)}
          </div>
        </motion.div>
      </div>
      {/* every chapter's words stay in the HTML for search and screen readers */}
      <div style={{ position: "absolute", left: -9999 }}>{CHAPTERS.map(ch => <p key={ch.n}>{ch.time} {ch.title} {ch.lines.join(" ")}</p>)}</div>
    </section>
  )
}

function Also() {
  return (
    <section className="sec" id="also" aria-labelledby="also-h">
      <span className="n num">6.0</span>
      <h2 id="also-h">And when something has already happened.</h2>
      <div className="also">
        <div><h3>Consulting and investigations</h3><p>Security consulting for homes and businesses, and investigations, handled by the same licensed company.</p></div>
        <div><h3>Collections</h3><p>A collections service, from the same Nassau office.</p></div>
        <div><h3>Security supplies</h3><p>Equipment and supplies for homes and businesses, from the Farrington Road office.</p></div>
        <div><h3>Alarm and CCTV service</h3><p>Alarm and CCTV systems sold and serviced by Pro-Tech, so there is one number to call.</p></div>
      </div>
    </section>
  )
}

function PlanSection() {
  return (
    <section className="sec" id="plan" aria-labelledby="plan-h">
      <span className="n num">7.0</span>
      <h2 id="plan-h">Plan the call in a minute.</h2>
      <Planner />
    </section>
  )
}

function Home() {
  const first = useMemo(() => nassauNow(), [])
  const [hour, setH] = useState(first.hour)
  const [live, setLive] = useState(true)
  const setHour = (h: number, isLive = false) => { setH(h); setLive(isLive) }
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setH(nassauNow().hour), 30000)
    return () => clearInterval(t)
  }, [live])
  const ink = INK[sceneFor(hour)]
  return (
    <Page ink={ink}>
      <Hero hour={hour} setHour={setHour} live={live} weekday={first.weekday} />
      <Card0 />
      <Stage />
      <Also />
      <PlanSection />
    </Page>
  )
}

mount(<Home />)
