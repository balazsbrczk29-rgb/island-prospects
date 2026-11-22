import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react"
import { CHAPTERS, DIVISIONS, IMG, STOPS, fmt, nassauNow, officeLine, sceneFor, type DKey, type Scene } from "./data"
import { Page, mount } from "./site"
import { Planner } from "./planner"

const SCENES: Scene[] = ["day", "dusk", "night"]
const INK: Record<Scene, string> = { day: "#101a24", dusk: "#fbf6ec", night: "#e9e4d8" }

function Hero({ hour, setHour, live, weekday }: { hour: number; setHour: (h: number, live?: boolean) => void; live: boolean; weekday: number }) {
  const scene = sceneFor(hour)
  return (
    <section className="hero" data-hero data-scene={scene} aria-labelledby="h1">
      <div className="frames">
        {SCENES.map(s => (
          <img key={s} src={`${IMG}street-${s}.jpg`} alt={s === scene ? `A Nassau shop corner with a camera on the wall, at ${s === "day" ? "late morning" : s === "dusk" ? "dusk" : "night"} (illustrative)` : ""} aria-hidden={s !== scene} width={1920} height={1080} style={{ opacity: s === scene ? 1 : 0 }} fetchPriority={s === "day" ? "high" : "auto"} />
        ))}
      </div>
      <div className="status" style={{ color: INK[scene] }}>
        <h1 id="h1" className="now" aria-live="polite"><span className="clock num">{live ? "It is " : "At "}{fmt(hour)}{live ? " in Nassau." : ","}</span> <span className="rest">{live ? officeLine(hour, weekday) : hour >= 9 && hour < 17 ? "our office on Farrington Road is open." : "our office is closed."} The central station is watching.</span></h1>
        <p className="sub">Pro-Tech Security: guards, CCTV and alarms, and 24/7 monitoring, from Nassau since 2004.</p>
      </div>
      <div className="strip">
        <div className="track">
          <label className="sr" htmlFor="hour">Time of day in Nassau</label>
          <input id="hour" type="range" min={0} max={23.5} step={0.25} value={hour} aria-valuetext={fmt(hour)} onChange={e => setHour(Number(e.target.value))} />
          <div className="stops">
            {STOPS.map(st => <button key={st.label} type="button" style={{ left: `${(st.hour / 23.5) * 100}%` }} aria-pressed={!live && hour === st.hour} onClick={() => setHour(st.hour)}><b className="num">{st.label}</b><span>{st.title}</span></button>)}
          </div>
        </div>
        <button type="button" className="nowbtn" aria-pressed={live} onClick={() => setHour(nassauNow().hour, true)}>Now</button>
      </div>
      <div className="tool">
        <span className="n num">1.0</span>
        <h2 className="tool-h">What do you need covered?</h2>
        <Planner id="hero" />
      </div>
    </section>
  )
}

function Divisions() {
  return (
    <section className="sec2 divs" id="services" aria-labelledby="d-h">
      <figure className="divphoto"><img src={`${IMG}cctv-closeup.jpg`} alt="A white CCTV camera on a bracket against a pale wall in morning sun (illustrative)" width={2752} height={1536} loading="lazy" /></figure>
      <div>
        <span className="n num">2.0</span>
        <h2 id="d-h">Six things Pro-Tech does.</h2>
        <ol className="dlist">
          {(Object.keys(DIVISIONS) as DKey[]).map(k => (
            <li key={k}><span className="dn num">{DIVISIONS[k].n}</span><div><h3>{DIVISIONS[k].name}</h3><p>{DIVISIONS[k].line}</p></div></li>
          ))}
        </ol>
      </div>
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
        <motion.div className="cap" key={c.n} style={{ color: c.ink }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <span className="time num">{c.time}</span>
          <div>
            <span className="n num">{c.n}</span>
            <h2>{c.title}</h2>
            {c.lines.map(l => <p key={l}>{l}</p>)}
          </div>
        </motion.div>
      </div>
      {/* every chapter's words stay in the HTML for search and screen readers */}
      <div className="sr">{CHAPTERS.map(ch => <p key={ch.n}>{ch.time} {ch.title} {ch.lines.join(" ")}</p>)}</div>
    </section>
  )
}

const STEPS = [
  ["The alarm trips.", "A door, a window or a motion sensor at your property is set off."],
  ["The signal reaches the central station.", "Pro-Tech's central station receives it, at any hour, weekends included."],
  ["The plan you agreed is followed.", "Who to call and in what order is set with you when the system is installed."],
  ["Someone is told.", "You, or the keyholders on your list, are contacted as agreed."],
]

function Monitoring() {
  return (
    <section className="night" id="monitoring" aria-labelledby="m-h">
      <div className="night-in">
        <h2 id="m-h">When the alarm goes off at 3 am.</h2>
        <div>
          <ol className="log">
            {STEPS.map(([h, p], i) => <li key={h}><span className="dn num">{i + 1}</span><div><h3>{h}</h3><p>{p}</p></div></li>)}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Licensed() {
  return (
    <section className="sec2 lic" id="who" aria-labelledby="l-h">
      <div>
        <span className="n num">4.0</span>
        <h2 id="l-h" className="num">100% Bahamian owned and operated, since 2004.</h2>
        <ul className="facts2">
          <li><b>Licensed and regulated by the Ministry of National Security</b> as a security service contractor, and licensed by the Bahamas Business Licence Authority.</li>
          <li><b>Officers trained in Pro-Tech's own programme.</b></li>
        </ul>
      </div>
      <figure className="gphoto"><img src={`${IMG}guard-gate.jpg`} alt="A security officer in a navy uniform at a white gate, seen from behind (illustrative)" width={1856} height={2304} loading="lazy" /></figure>
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
  return (
    <Page ink={INK[sceneFor(hour)]}>
      <Hero hour={hour} setHour={setHour} live={live} weekday={first.weekday} />
      <Divisions />
      <Stage />
      <Monitoring />
      <Licensed />
    </Page>
  )
}

mount(<Home />)
