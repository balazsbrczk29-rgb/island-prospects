import { StrictMode, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { ADDRESS, DEFAULT_JOB, EMAIL, JOBS, MAP, P, PHONE, SIZES, TEL, WHEN, WHEN_STORM, message, waLink, type Job, type Photo, type Side } from "./data"
import "./styles.css"

const job = (id: string) => JOBS.find(j => j.id === id)!
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches

/* arrow-key radio group: moves focus and selection like native radios */
function radioKeys(e: KeyboardEvent<HTMLElement>) {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"]
  if (!keys.includes(e.key)) return
  const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]")]
  const i = items.indexOf(document.activeElement as HTMLButtonElement)
  if (i < 0) return
  e.preventDefault()
  const n = items[(i + (keys.indexOf(e.key) < 2 ? 1 : -1) + items.length) % items.length]
  n.focus(); n.click()
}

function Img({ p, eager, className }: { p: Photo; eager?: boolean; className?: string }) {
  return <img className={className} src={p.src} alt={p.alt} width={p.w} height={p.h} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
}

function Bar() {
  return (
    <header className="bar">
      <a href="#tool" className="bar__name"><b>Cover Up</b><span>Island Marine Covering Ltd</span></a>
      <nav className="bar__nav" aria-label="Sections">
        <a href="#house">House</a>
        <a href="#boat">Boat</a>
        <a href="#how">How a job runs</a>
        <a href="#family">Since 1992</a>
        <a href="#visit">Visit</a>
      </nav>
      <a className="bar__tel num" href={TEL}>{PHONE}</a>
    </header>
  )
}

/* the stage: the chosen job's own photograph unrolls over the last one like an awning coming down */
type Layer = { key: number; job: Job }
function Stage({ j }: { j: Job }) {
  const [layers, setLayers] = useState<Layer[]>([{ key: 0, job: j }])
  const n = useRef(0)
  useEffect(() => {
    setLayers(l => (l[l.length - 1].job.id === j.id ? l : [...l.slice(-1), { key: ++n.current, job: j }]))
  }, [j])
  return (
    <div className="stage" aria-live="polite">
      {layers.map((l, i) => (
        <div key={l.key} className={`stage__layer${i > 0 && l.key > 0 ? " is-in" : ""}`}
          onAnimationEnd={e => { if (e.target === e.currentTarget) setLayers(ls => ls.slice(-1)) }}>
          <div className="stage__inner">
            {l.job.photo ? <Img p={l.job.photo} eager className="stage__img" /> : (
              <div className="plate">
                <p className="plate__name">{l.job.name}</p>
                <p className="plate__note">{l.job.line} Send us a photo of the {l.job.side === "house" ? "opening" : "boat"} and we come to measure.</p>
              </div>
            )}
          </div>
          <span className="stage__valance" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

type Pick = { side: Side; jobId: string }
function Tool({ pick, setPick, sendRef, onMsg }: { pick: Pick; setPick: (p: Pick) => void; sendRef: React.RefObject<HTMLAnchorElement | null>; onMsg: (m: string) => void }) {
  const j = job(pick.jobId)
  const sizes = SIZES[j.size]
  const whens = j.storm ? [WHEN_STORM, ...WHEN] : WHEN
  const [size, setSize] = useState("Not sure")
  const [where, setWhere] = useState("")
  const [when, setWhen] = useState(WHEN[0])
  useEffect(() => { setSize("Not sure"); if (!whens.includes(when)) setWhen(WHEN[0]) }, [j.size, j.storm]) // eslint-disable-line react-hooks/exhaustive-deps
  const msg = useMemo(() => message(j, size, where, when), [j, size, where, when])
  useEffect(() => onMsg(msg), [msg, onMsg])
  const sides: [Side, string][] = [["house", "House"], ["boat", "Boat"]]
  return (
    <section className="tool" id="tool" aria-labelledby="title">
      <div className="tool__ask">
        <h1 id="title" className="hero">Shade and shelter, cut and sewn in Nassau.</h1>
        <p className="tool__lede">Awnings for the house, tops and upholstery for the boat, made in the Airport Industrial Park since 1992. WhatsApp us for an immediate response.</p>

        <div className="sides" role="radiogroup" aria-label="What needs covering" onKeyDown={radioKeys} data-side={pick.side}>
          {sides.map(([s, label]) => (
            <button key={s} type="button" role="radio" aria-checked={pick.side === s} tabIndex={pick.side === s ? 0 : -1}
              onClick={() => setPick({ side: s, jobId: pick.side === s ? pick.jobId : DEFAULT_JOB[s] })}>{label}</button>
          ))}
          <span className="sides__mark" aria-hidden="true" />
        </div>

        <div className="jobs" role="radiogroup" aria-label={`Jobs for the ${pick.side}`} onKeyDown={radioKeys} key={pick.side}>
          {JOBS.filter(x => x.side === pick.side).map(x => (
            <button key={x.id} type="button" role="radio" aria-checked={x.id === j.id} tabIndex={x.id === j.id ? 0 : -1}
              onClick={() => setPick({ side: pick.side, jobId: x.id })}>{x.name}</button>
          ))}
        </div>

        <div className="qs">
          <div className="q">
            <p className="q__label" id="q-size">{sizes.label}</p>
            <div className="chips" role="radiogroup" aria-labelledby="q-size" onKeyDown={radioKeys}>
              {sizes.opts.map(o => <button key={o} type="button" role="radio" aria-checked={size === o} tabIndex={size === o ? 0 : -1} onClick={() => setSize(o)}>{o}</button>)}
            </div>
          </div>
          <label className="q">
            <span className="q__label">Where</span>
            <input value={where} onChange={e => setWhere(e.target.value)} placeholder="e.g. Lyford Cay, Nassau Harbour, Abaco" autoComplete="address-level2" />
          </label>
          <div className="q">
            <p className="q__label" id="q-when">When</p>
            <div className="chips" role="radiogroup" aria-labelledby="q-when" onKeyDown={radioKeys}>
              {whens.map(o => <button key={o} type="button" role="radio" aria-checked={when === o} tabIndex={when === o ? 0 : -1} onClick={() => setWhen(o)}>{o}</button>)}
            </div>
          </div>
        </div>

        <div className="send">
          <p className="send__msg"><span className="answer__to num">To {PHONE} on WhatsApp</span><q>{msg}</q></p>
          <a ref={sendRef} className="btn" href={waLink(msg)} target="_blank" rel="noopener">Send on WhatsApp</a>
          <a className="link num" href={TEL}>or call {PHONE}</a>
        </div>
      </div>

      <div className="tool__show">
        <Stage j={j} />
        <div className="answer">
          <div className="answer__job">
            <p className="answer__name">{j.name}</p>
            <p className="answer__line">{j.line}</p>
          </div>
          <ul className="answer__facts">{j.facts.map(f => <li key={f}>{f}</li>)}</ul>
          <p className="answer__msg"><span className="answer__to num">To {PHONE} on WhatsApp</span><q>{msg}</q></p>
        </div>
      </div>
    </section>
  )
}

function Ledger({ side, onAsk }: { side: Side; onAsk: (j: Job) => void }) {
  const house = side === "house"
  return (
    <section className={`ledger ledger--${side}`} id={side} aria-labelledby={`${side}-title`}>
      <div className="ledger__head">
        <h2 id={`${side}-title`} className="h2">{house ? "For the house" : "For the boat"}</h2>
        <p>{house
          ? "Awnings, weather curtains, hurricane shutters and sun shades, measured at your house and made at Raphia Close."
          : "From a Bimini top on a 10 ft inflatable to an isinglass enclosure on a mega yacht, plus upholstery for boats and ferries."}</p>
      </div>
      {JOBS.filter(j => j.side === side).map(j => (
        <article key={j.id} className={`entry${j.photo ? "" : " entry--type"}`} id={`job-${j.id}`}>
          <div className="entry__text">
            <h3 className="h3">{j.name}</h3>
            <p>{j.line}</p>
            <ul className="spec">{j.facts.map(f => <li key={f}>{f}</li>)}</ul>
            <button type="button" className="link" onClick={() => onAsk(j)}>Ask for a measure for this</button>
          </div>
          {j.photo && (
            <figure className="entry__photo" style={{ maxWidth: j.photo.w }}>
              <div className="frame" style={{ aspectRatio: `${j.photo.w} / ${j.photo.h}` }}><Img p={j.photo} /></div>
              {j.photo.cap && <figcaption>{j.photo.cap}</figcaption>}
            </figure>
          )}
        </article>
      ))}
    </section>
  )
}

function How() {
  const beats = [
    ["1", "Measure", "Send a photo on WhatsApp, then we come to the house, the dock or the boat yard to measure."],
    ["2", "Cut and sew in Nassau", "Patterns are cut and sewn at Raphia Close. Products are 100% made in the Bahamas."],
    ["3", "Fit", "We fit the finished awning, curtain, top or cushion where it lives."],
  ]
  const strip: [Photo, string][] = [[P.cutting, "Patterns laid out on the long table"], [P.sewing, "Vinyl fed through the machine by hand"], [P.seat, "A finished helm seat"]]
  return (
    <section className="how" id="how" aria-labelledby="how-title">
      <h2 id="how-title" className="h2 how__title">How a job runs, from your photo to the fitting.</h2>
      <ol className="beats">
        {beats.map(([n, t, d]) => (
          <li key={n}><span className="beats__n num">{n}</span><h3 className="h3">{t}</h3><p>{d}</p></li>
        ))}
      </ol>
      <ul className="strip">
        {strip.map(([p, c]) => (
          <li key={c}><div className="frame" style={{ aspectRatio: "3 / 4" }}><Img p={p} /></div><span>{c}</span></li>
        ))}
      </ul>
      <p className="how__storm">Hurricane shutters are made to each opening, so ask for your measure well before the season.</p>
    </section>
  )
}

function Family() {
  return (
    <section className="fam" id="family" aria-labelledby="fam-title">
      <figure className="fam__photo" style={{ maxWidth: P.workshop.w }}>
        <div className="frame" style={{ aspectRatio: "4 / 3" }}><Img p={P.workshop} /></div>
        <figcaption>The workshop today, Raphia Close, Airport Industrial Park.</figcaption>
      </figure>
      <div className="fam__text">
        <p className="fam__year num" aria-hidden="true">1992</p>
        <h2 id="fam-title" className="fam__quote">"I started with one sewing machine and one roll of canvas, working in an old cottage in Montagu village."</h2>
        <p>That is how Island Marine Covering began, with Ricky Nixon and what he learned from his father. Henry Nixon founded Nixon's Upholstery Services and, with his wife Viola, upholstered for Nassau hotels including The Montague, The British Colonial and The Royal Victorian.</p>
        <p>The family's work reached Abaco with Ricky's brother Kirk. Today the company trades as Cover Up and still goes to awning and marine canvas seminars in North and South America.</p>
      </div>
    </section>
  )
}

function Visit({ onWhatsApp }: { onWhatsApp: string }) {
  return (
    <section className="visit" id="visit" aria-labelledby="visit-title">
      <h2 id="visit-title" className="h2 visit__title">Bring a photo to Raphia Close, or send it.</h2>
      <div className="visit__grid">
        <address className="visit__addr">
          <p className="h3">{ADDRESS}</p>
          <p>P.O. Box SP 62402, Nassau, New Providence</p>
          <p className="visit__note">Come to the workshop to see the canvas and vinyl colours before you choose.</p>
          <a className="link" href={MAP} target="_blank" rel="noopener">Open in Maps</a>
        </address>
        <div className="visit__reach">
          <a className="btn" href={onWhatsApp} target="_blank" rel="noopener">WhatsApp {PHONE}</a>
          <a className="reach num" href={TEL}><span>Call</span>{PHONE}</a>
          <a className="reach" href={`mailto:${EMAIL}?subject=${encodeURIComponent("Measure request")}`}><span>Email</span>{EMAIL}</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <p className="foot__name"><b>Cover Up</b> Island Marine Covering Ltd, since 1992</p>
      <p>{ADDRESS}, Nassau. <a href={TEL} className="num">{PHONE}</a></p>
      <p className="foot__fine">All photographs are Cover Up's own work, from coverupbahamas.com.</p>
    </footer>
  )
}

function Home() {
  const [pick, setPick] = useState<Pick>({ side: "house", jobId: "awnings" })
  const sendRef = useRef<HTMLAnchorElement>(null)
  const [dock, setDock] = useState(false)
  const j = job(pick.jobId)
  const [msg, setMsg] = useState("")
  const generic = waLink(msg || `Hello Cover Up, I'd like a measure for ${j.noun} for my ${j.side}. I can send photos.`)

  useEffect(() => {
    const pre = () => JOBS.forEach(x => { if (x.photo) new Image().src = x.photo.src })
    const w = window as Window & { requestIdleCallback?: (f: () => void) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(pre); else setTimeout(pre, 1500)
  }, [])

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || reduced()) return
    const lenis = new Lenis({ duration: 1.05 })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  useEffect(() => {
    const el = sendRef.current, end = document.getElementById("visit")
    if (!el || !end) return
    let a = true, b = false
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.target === el) a = e.isIntersecting; else b = e.isIntersecting })
      setDock(!a && !b)
    })
    io.observe(el); io.observe(end)
    return () => io.disconnect()
  }, [])

  const ask = (x: Job) => {
    setPick({ side: x.side, jobId: x.id })
    document.getElementById("tool")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" })
    setTimeout(() => sendRef.current?.focus({ preventScroll: true }), 700)
  }

  return (
    <>
      <a className="skip" href="#tool">Skip to the measure request</a>
      <Bar />
      <main>
        <Tool pick={pick} setPick={setPick} sendRef={sendRef} onMsg={setMsg} />
        <Ledger side="house" onAsk={ask} />
        <Ledger side="boat" onAsk={ask} />
        <How />
        <Family />
        <Visit onWhatsApp={generic} />
      </main>
      <Footer />
      <div className={`dock${dock ? " is-on" : ""}`} aria-hidden={!dock}>
        <span className="dock__job">{j.name}</span>
        <a className="btn" href={generic} target="_blank" rel="noopener" tabIndex={dock ? 0 : -1}>Send on WhatsApp</a>
      </div>
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
