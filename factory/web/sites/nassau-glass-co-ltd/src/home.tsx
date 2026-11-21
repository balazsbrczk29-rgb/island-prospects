import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react"
import { Bars, Footer, Toolbar, mount, usePhone, useWheelSmoothing } from "./shell"
import { IMG, JOBS, PHONE, PHONE2, PHONE_INTL, FAX, RACK, SHOWERS, SHOWER_ALT, STOCK, SWATCH, TEL, TEL2, TEL_INTL, YEARS, describe, type Kind, type Pick } from "./data"

const Pane = lazy(() => import("./Pane"))
const ss = (a: number, b: number, v: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t) }
const band = (a: number, b: number, f = 0.035) => (v: number) => ss(a - f, a + f, v) * (1 - ss(b - f, b + f, v))
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

function Picker({ pick, setPick }: { pick: Pick; setPick: (p: Pick) => void }) {
  const s = STOCK[pick.kind]
  const kind = (k: Kind) => { const n = STOCK[k]; setPick({ kind: k, thick: n.thick.includes(pick.thick) ? pick.thick : n.thick[Math.min(1, n.thick.length - 1)] ?? "", tint: n.tints.some(t => t.id === pick.tint) ? pick.tint : n.tints[0].id }) }
  return (
    <div className="picker">
      <fieldset>
        <legend>Sheet</legend>
        <div className="opts">{(Object.keys(STOCK) as Kind[]).map(k => <button key={k} type="button" className="opt" aria-pressed={pick.kind === k} onClick={() => kind(k)}>{STOCK[k].label}</button>)}</div>
      </fieldset>
      <fieldset>
        <legend>Thickness</legend>
        {s.thick.length ? <div className="opts">{s.thick.map(t => <button key={t} type="button" className="opt num" aria-pressed={pick.thick === t} aria-label={`${t} of an inch`} onClick={() => setPick({ ...pick, thick: t })}>{t}</button>)}</div> : <span className="thick-note">{s.thickNote}</span>}
      </fieldset>
      <fieldset>
        <legend>Tint</legend>
        <div className="opts">{s.tints.map(t => <button key={t.id} type="button" className="opt" aria-pressed={pick.tint === t.id} onClick={() => setPick({ ...pick, tint: t.id })}><i className="dot" style={{ background: t.edge }} aria-hidden />{t.name}</button>)}</div>
      </fieldset>
    </div>
  )
}

function Chapter({ p, at, step, title, children }: { p: MotionValue<number>; at: [number, number]; step: string; title: string; children: React.ReactNode }) {
  const f = band(at[0], at[1])
  const opacity = useTransform(p, v => f(v))
  const y = useTransform(p, v => (1 - f(v)) * 18)
  return (
    <motion.div className="chapter" style={{ opacity, y }}>
      <p className="step num">{step}</p>
      <h2>{title}</h2>
      {children}
    </motion.div>
  )
}

function Study({ pick, setPick }: { pick: Pick; setPick: (p: Pick) => void }) {
  const ref = useRef<HTMLElement>(null)
  const phone = usePhone()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [phase, setPhase] = useState(0)
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const [show3d, setShow3d] = useState(false)
  useMotionValueEvent(p, "change", v => { const n = v < 0.1 ? 0 : v < 0.62 ? 1 : 2; if (n !== phase) setPhase(n) })
  useEffect(() => {
    setShow3d(true)
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const heroOpacity = useTransform(p, v => 1 - ss(0.03, 0.12, v))
  const heroY = useTransform(p, v => -ss(0.03, 0.12, v) * 28)
  const lam = () => { setPick({ kind: "laminated", thick: "", tint: "clear" }); go("quote") }
  return (
    <section ref={ref} className="study" data-stage id="top" aria-label="Glass in stock, and how laminated safety glass is built">
      <div className="study-pin">
        <Toolbar home />
        <div className="pane-wrap">
          <div className="poster" style={{ backgroundImage: `url(${phone ? "pane-phone.png" : "pane.png"})`, opacity: ready ? 0 : 1 }} />
          <div style={{ position: "absolute", inset: 0 }}>
            {show3d && <Suspense fallback={null}><Pane pick={pick} progress={p} active={active} phone={phone} onReady={() => setReady(true)} /></Suspense>}
          </div>
        </div>
        <motion.div className="hero" style={{ opacity: heroOpacity, y: heroY, pointerEvents: phase === 0 ? "auto" : "none" }} inert={phase !== 0}>
          <div>
            <h1>Glass from <span className="frac num">1/16</span> to <span className="frac num">3/4</span> of an inch, cut to any shape on Mackey Street.</h1>
            <p className="sub">The Bahamas' first fabricating glass company, at #46 since 1959. Choose a sheet and see what is on the rack.</p>
          </div>
          <div>
            <Picker pick={pick} setPick={setPick} />
            <div className="hero-cta">
              <button type="button" className="btn btn-glass" onClick={() => go("quote")}>Quote this glass</button>
              <span className="shown" aria-live="polite">Shown: {describe(pick)}</span>
            </div>
          </div>
        </motion.div>
        <motion.p className="pane-note small" style={{ opacity: heroOpacity }}>A rendered sample. The real sheet is at the counter.</motion.p>
        <div className="chapters">
          <Chapter p={p} at={[0.2, 0.41]} step="Laminated safety glass, 1 of 3" title="It starts as two sheets of glass.">
            <p>This is what goes into a hurricane impact window, or a replacement boat windshield.</p>
          </Chapter>
          <Chapter p={p} at={[0.41, 0.62]} step="2 of 3" title="An interlayer is bonded between them.">
            <p>If the glass breaks, the pieces hold to the interlayer instead of falling out of the frame.</p>
          </Chapter>
          <Chapter p={p} at={[0.62, 1.2]} step="3 of 3" title="Stocked in clear, bronze, gray and green.">
            <p>In a large selection of thicknesses, at #46 Mackey Street.</p>
            <button type="button" className="link" style={{ pointerEvents: phase === 2 ? "auto" : "none" }} tabIndex={phase === 2 ? 0 : -1} onClick={lam}>Quote laminated glass</button>
          </Chapter>
        </div>
      </div>
    </section>
  )
}

function Showers({ onQuote }: { onQuote: (s: string) => void }) {
  const [frame, setFrame] = useState("Frameless")
  const [door, setDoor] = useState("Swing door")
  const label = `${frame.toLowerCase()}, ${door.toLowerCase()}`
  return (
    <section className="sec showers" id="showers" aria-labelledby="showers-h">
      <div className="wrap sec-head">
        <h2 id="showers-h">Shower enclosures are made here, not shipped in.</h2>
        <p>Nassau Glass manufactures its own enclosures: frameless and semi-frameless systems, with swing or sliding doors, in a choice of finishes and glass.</p>
      </div>
      <div className="strip" tabIndex={0} role="group" aria-label="Six shower enclosures by Nassau Glass">
        {SHOWERS.map((s, i) => (
          <figure key={s.n}>
            <img src={s.src} alt={SHOWER_ALT[i]} width={750} height={1000} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
      <div className="wrap build">
        <div className="rows">
          <div className="row"><span>Frame</span><div className="seg">{["Frameless", "Semi-frameless"].map(v => <button key={v} type="button" aria-pressed={frame === v} onClick={() => setFrame(v)}>{v}</button>)}</div></div>
          <div className="row"><span>Door</span><div className="seg">{["Swing door", "Sliding door"].map(v => <button key={v} type="button" aria-pressed={door === v} onClick={() => setDoor(v)}>{v}</button>)}</div></div>
        </div>
        <button type="button" className="btn btn-ink" onClick={() => onQuote(label)}>Quote a {label} enclosure</button>
      </div>
    </section>
  )
}

function Rack({ onQuote }: { onQuote: (k: Kind) => void }) {
  return (
    <section className="sec" id="rack" aria-labelledby="rack-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="rack-h">What is on the rack today.</h2>
          <p>The sheet goods the Glass Division keeps in stock, cut to size by factory-trained staff.</p>
        </div>
        <div className="rack">
          {RACK.map(r => (
            <div className="rack-row" key={r.name}>
              <h3>{r.name}</h3>
              <span className="num">{r.thick}</span>
              <span className="tints">{r.tints.map(t => <span key={t}>{SWATCH[t] && <i style={{ background: SWATCH[t] }} aria-hidden />}{t}</span>)}</span>
              <span className="use">{r.use}</span>
              {r.kind ? <button type="button" className="link" onClick={() => onQuote(r.kind as Kind)} aria-label={`Quote ${r.name.toLowerCase()}`}>Quote it</button> : <a className="link num" href={TEL} aria-label={`Call about ${r.name.toLowerCase()}`}>Call</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Metals({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="sec metals" aria-labelledby="metals-h">
      <div className="wrap">
        <h2 id="metals-h">A single storefront entrance, or a six-story curtain wall.</h2>
        <div className="cols">
          <div>
            <h3>Architectural Metals</h3>
            <p>Residential and commercial. The division can help design a system or write a scope of work. No job is considered too small or too large.</p>
            <button type="button" className="link" onClick={onQuote} style={{ marginTop: 16 }}>Quote a storefront</button>
          </div>
          <div>
            <h3>Service Department</h3>
            <p>Installation, repairs and replacements for glass, windows and doors, in homes and in office buildings. The same shop does the whole job, start to finish.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Hill() {
  return (
    <section className="sec" aria-labelledby="hill-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="hill-h">Glass, and a whole lot more, added one department at a time.</h2>
          <p>Five dates from the same address at the top of the hill. <a className="link" href="departments.html">See all nine departments</a></p>
        </div>
        <div className="hill">
          {YEARS.map(y => (
            <article key={y.y}>
              <div className="y num">{y.y}</div>
              <h3>{y.t}</h3>
              <p>{y.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

type Order = { job: string; w: string; h: string; qty: string; name: string; enclosure: string }
function Quote({ pick, setPick, order, setOrder }: { pick: Pick; setPick: (p: Pick) => void; order: Order; setOrder: (o: Order) => void }) {
  const [copied, setCopied] = useState(false)
  const s = STOCK[pick.kind]
  const w = parseFloat(order.w), h = parseFloat(order.h), q = Math.max(1, parseInt(order.qty) || 1)
  const sized = w > 0 && h > 0
  const area = sized ? ((w * h) / 144) * q : 0
  const set = (k: keyof Order) => (e: React.ChangeEvent<HTMLInputElement>) => setOrder({ ...order, [k]: e.target.value })
  const lines: [string, string][] = [
    ["Job", order.job],
    ["Glass", describe(pick)],
    ...(order.job === "Shower enclosure" && order.enclosure ? [["Enclosure", order.enclosure] as [string, string]] : []),
    ["Size", sized ? `${order.w} x ${order.h} in, ${q} ${q === 1 ? "piece" : "pieces"}` : "To be measured"],
    ...(sized ? [["Area", `${area.toFixed(1)} sq ft`] as [string, string]] : []),
    ...(order.name ? [["For", order.name] as [string, string]] : []),
  ]
  const copy = async () => {
    const text = `Quote request for Nassau Glass\n${lines.map(l => `${l[0]}: ${l[1]}`).join("\n")}`
    try { await navigator.clipboard.writeText(text) } catch { /* clipboard blocked: the summary stays on screen to read out */ }
    setCopied(true); setTimeout(() => setCopied(false), 1800)
  }
  const kind = (k: Kind) => { const n = STOCK[k]; setPick({ kind: k, thick: n.thick.includes(pick.thick) ? pick.thick : n.thick[Math.min(1, n.thick.length - 1)] ?? "", tint: n.tints.some(t => t.id === pick.tint) ? pick.tint : n.tints[0].id }) }
  return (
    <section className="sec" id="quote" data-quiet aria-labelledby="quote-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="quote-h">Tell the shop what you need before you call.</h2>
          <p>Four answers make a summary the counter can price. Not sure of the size? Leave it blank and ask for a measure.</p>
        </div>
        <div className="order">
          <form onSubmit={e => e.preventDefault()} aria-label="Quote request">
            <div className="field">
              <span className="lab" id="job-l">What is it for</span>
              <div className="chips" role="group" aria-labelledby="job-l">{JOBS.map(j => <button key={j} type="button" className="chip" aria-pressed={order.job === j} onClick={() => setOrder({ ...order, job: j })}>{j}</button>)}</div>
            </div>
            <div className="field">
              <span className="lab" id="kind-l">Sheet</span>
              <div className="chips" role="group" aria-labelledby="kind-l">
                {(Object.keys(STOCK) as Kind[]).map(k => <button key={k} type="button" className="chip" aria-pressed={pick.kind === k} onClick={() => kind(k)}>{STOCK[k].label}</button>)}
              </div>
              {s.thick.length > 0 && <div className="chips" role="group" aria-label="Thickness">
                {s.thick.map(t => <button key={t} type="button" className="chip num" aria-pressed={pick.thick === t} aria-label={`${t} of an inch`} onClick={() => setPick({ ...pick, thick: t })}>{t} in</button>)}
              </div>}
              <div className="chips" role="group" aria-label="Tint">
                {s.tints.map(t => <button key={t.id} type="button" className="chip" aria-pressed={pick.tint === t.id} onClick={() => setPick({ ...pick, tint: t.id })}>{t.name}</button>)}
              </div>
            </div>
            <div className="size">
              <div className="field"><label htmlFor="q-w">Width, inches</label><input id="q-w" className="inp" inputMode="decimal" value={order.w} onChange={set("w")} placeholder="24" /></div>
              <span className="x" aria-hidden>x</span>
              <div className="field"><label htmlFor="q-h">Height, inches</label><input id="q-h" className="inp" inputMode="decimal" value={order.h} onChange={set("h")} placeholder="36" /></div>
              <div className="field"><label htmlFor="q-q">Pieces</label><input id="q-q" className="inp" inputMode="numeric" value={order.qty} onChange={set("qty")} /></div>
            </div>
            <div className="field"><label htmlFor="q-n">Your name</label><input id="q-n" className="inp" autoComplete="name" value={order.name} onChange={set("name")} /></div>
          </form>
          <aside className="ticket" aria-live="polite" aria-label="Your summary">
            <h3>Read this to the counter</h3>
            <dl className="num">{lines.map(l => <div key={l[0]} style={{ display: "contents" }}><dt>{l[0]}</dt><dd>{l[1]}</dd></div>)}</dl>
            <div className="acts">
              <a className="btn btn-glass num" href={TEL}>Call {PHONE}</a>
              <button type="button" className="link" onClick={copy}>{copied ? "Copied" : "Copy the summary"}</button>
            </div>
            <p className="small">Prices come from the shop, not from this page.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function OpenNow() {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null)
  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Nassau", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date())
    const get = (t: string) => parts.find(x => x.type === t)?.value ?? ""
    const day = get("weekday"), mins = (parseInt(get("hour")) % 24) * 60 + parseInt(get("minute"))
    const close = day === "Sun" ? 0 : day === "Sat" ? 13 * 60 : 16 * 60 + 30
    const open = close > 0 && mins >= 9 * 60 && mins < close
    setState({ open, text: open ? `Open now, until ${day === "Sat" ? "1:00 pm" : "4:30 pm"}` : "Closed now, opens 9:00 am" + (day === "Sat" && mins >= close || day === "Sun" ? " Monday" : "") })
  }, [])
  return <p className="open-now" data-open={state?.open ?? true}>{state && <><i aria-hidden />{state.text}</>}</p>
}

function Visit() {
  return (
    <section className="sec visit" id="visit" data-quiet aria-labelledby="visit-h">
      <div className="wrap visit-grid">
        <div>
          <h2 id="visit-h">The green building at the top of the hill.</h2>
          <p className="way">#46 Mackey Street, Nassau, half a mile south of the Paradise Island Bridge. The same address since 1959.</p>
          <div className="phones num">
            <a href={TEL}>{PHONE}</a>
            <a href={TEL2}>{PHONE2}</a>
          </div>
        </div>
        <div>
          <OpenNow />
          <table className="num">
            <tbody>
              <tr><td>Monday to Friday</td><td>9:00 am to 4:30 pm</td></tr>
              <tr><td>Saturday</td><td>9:00 am to 1:00 pm</td></tr>
              <tr><td>Calling from abroad</td><td><a href={TEL_INTL}>{PHONE_INTL}</a></td></tr>
              <tr><td>Fax</td><td>{FAX}</td></tr>
            </tbody>
          </table>
        </div>
        <img src={`${IMG}2020/05/ng_gallery.jpg`} alt="The Nassau Glass building on Mackey Street, painted green with white trim" width={400} height={234} loading="lazy" decoding="async" />
      </div>
    </section>
  )
}

function Home() {
  useWheelSmoothing()
  const [pick, setPick] = useState<Pick>({ kind: "glass", thick: "1/4", tint: "clear" })
  const [order, setOrder] = useState<Order>({ job: "Tabletop", w: "", h: "", qty: "1", name: "", enclosure: "" })
  const quoteKind = (k: Kind) => { const n = STOCK[k]; setPick({ kind: k, thick: n.thick[Math.min(1, n.thick.length - 1)] ?? "", tint: n.tints[0].id }); if (k === "mirror") setOrder({ ...order, job: "Mirror" }); go("quote") }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <Study pick={pick} setPick={setPick} />
        <Showers onQuote={s => { setOrder({ ...order, job: "Shower enclosure", enclosure: s }); go("quote") }} />
        <Rack onQuote={quoteKind} />
        <Metals onQuote={() => { setOrder({ ...order, job: "Storefront" }); go("quote") }} />
        <Hill />
        <Quote pick={pick} setPick={setPick} order={order} setOrder={setOrder} />
        <Visit />
      </main>
      <Footer />
      <Bars after="#top" home />
    </>
  )
}

mount(<Home />)
