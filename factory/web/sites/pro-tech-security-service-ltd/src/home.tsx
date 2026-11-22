import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { DIVISIONS, IMG, fmt, nassauNow, officeLine, officeShort, sceneFor, type DKey, type Scene } from "./data"
import { Page, mount } from "./site"
import { Planner } from "./planner"

const SCENES: Scene[] = ["day", "dusk", "night"]
const EASE = [0.22, 1, 0.36, 1] as const

function useNassau() {
  const first = useMemo(() => nassauNow(), [])
  const [now, setNow] = useState(first)
  useEffect(() => {
    const t = setInterval(() => setNow(nassauNow()), 30000)
    return () => clearInterval(t)
  }, [])
  return now
}

function Hero() {
  const reduce = useReducedMotion()
  const { hour, weekday } = useNassau()
  const scene = sceneFor(hour)
  return (
    <section className="hero2" data-hero aria-labelledby="h1">
      <p className="strip num" aria-hidden="true"><i className="live" />{fmt(hour)} in Nassau · {officeShort(hour, weekday)} · monitoring on</p>
      <figure className="scene">
        {SCENES.map(s => (
          <img key={s} src={`${IMG}street-${s}.jpg`} width={2752} height={1536} style={{ opacity: s === scene ? 1 : 0 }}
            alt={s === scene ? `A Nassau shop corner with a camera on the wall, ${s === "day" ? "by day" : s === "dusk" ? "at dusk" : "at night"} (illustrative)` : ""}
            aria-hidden={s !== scene} fetchPriority={s === scene ? "high" : "low"} loading={s === scene ? "eager" : "lazy"} />
        ))}
        <figcaption className="plate" aria-live="polite">
          <i className="live" aria-hidden="true" />
          <span className="clock num">It is {fmt(hour)} in Nassau.</span>
          <span>{officeLine(hour, weekday)}</span>
          <span className="on">The central station is watching.</span>
        </figcaption>
      </figure>
      <motion.div className="tool" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
        <span className="n num">1.0</span>
        <h1 id="h1">What do you need covered?</h1>
        <p className="sub">Pro-Tech Security: guards, CCTV and alarms, 24/7 monitoring. Nassau, since 2004.</p>
        <Planner id="hero" />
      </motion.div>
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

const STEPS = [
  ["The alarm trips.", "A door, a window or a motion sensor at your property is set off."],
  ["The signal reaches the central station.", "Pro-Tech's central station receives it, at any hour, weekends included."],
  ["The plan you agreed is followed.", "Who to call and in what order is set with you when the system is installed."],
  ["Someone is told.", "You, or the keyholders on your list, hear about it from a person."],
]

function Monitoring() {
  return (
    <section className="night" id="monitoring" aria-labelledby="m-h">
      <div className="night-in">
        <figure className="mphoto"><img src={`${IMG}control-room.jpg`} alt="A quiet monitoring desk at night with two screens (illustrative)" width={2752} height={1536} loading="lazy" /></figure>
        <div>
          <span className="n num">3.0</span>
          <h2 id="m-h">When the alarm goes off at 3 am.</h2>
          <ol className="log">
            {STEPS.map(([h, p], i) => <li key={h}><span className="dn num">3.{i + 1}</span><div><h3>{h}</h3><p>{p}</p></div></li>)}
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
        <h2 id="l-h" className="sr">Licensed, Bahamian owned, since 2004</h2>
        <ul className="facts2">
          <li><b className="num">100% Bahamian owned and operated, since 2004.</b></li>
          <li><b>Licensed and regulated by the Ministry of National Security</b> as a security service contractor, and licensed by the Bahamas Business Licence Authority.</li>
          <li><b>Officers trained in Pro-Tech's own programme</b> before they go on post.</li>
        </ul>
      </div>
      <figure className="gphoto"><img src={`${IMG}guard-gate.jpg`} alt="A security officer in a navy uniform at a white gate, seen from behind (illustrative)" width={1856} height={2304} loading="lazy" /></figure>
    </section>
  )
}

function Home() {
  return (
    <Page solid>
      <Hero />
      <Divisions />
      <Monitoring />
      <Licensed />
    </Page>
  )
}

mount(<Home />)
