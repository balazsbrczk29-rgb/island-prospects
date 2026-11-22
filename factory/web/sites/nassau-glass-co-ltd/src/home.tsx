import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Bars, Footer, Toolbar, mount, usePhone, useWheelSmoothing } from "./shell"
import { ALUMINUM, DEPTS, FAX, HOURS, IMG, MAP, PHONE, PHONE2, PHONE_INTL, RACK, SHOWERS, SHOWER_ALT, STOCK, SWATCH, TEL, TEL2, TEL_INTL, USES, YEARS, type Kind, type Pick } from "./data"

const Pane = lazy(() => import("./Pane"))
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

/** "24", "24.5", "24 1/2" or "1/2" -> inches; anything else -> NaN */
export function parseInches(v: string) {
  const t = v.trim().replace(/["”]|in$/g, "").trim(); if (!t) return NaN
  const m = /^(\d+(?:\.\d+)?)?(?:\s*(\d+)\/(\d+))?$/.exec(t); if (!m || (!m[1] && !m[2])) return NaN
  return (m[1] ? parseFloat(m[1]) : 0) + (m[2] ? +m[2] / +m[3] : 0)
}

type Order = { use: string; pick: Pick; frame: string; door: string; w: string; h: string; qty: number; fit: boolean }
const START: Order = { use: "window", pick: { kind: "glass", thick: "1/4", tint: "clear" }, frame: "Frameless", door: "Swing door", w: "", h: "", qty: 1, fit: false }

function Radios<T extends string>({ label, value, options, onPick, render, className }: { label: string; value: T; options: T[]; onPick: (v: T) => void; render?: (v: T) => React.ReactNode; className?: string }) {
  const key = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = options[(options.indexOf(value) + d + options.length) % options.length]
    onPick(n); (e.currentTarget.querySelector(`[data-v="${CSS.escape(n)}"]`) as HTMLElement | null)?.focus()
  }
  const id = `l-${label.replace(/\W+/g, "-")}`
  return (
    <div className={`row ${className ?? ""}`}>
      <span className="row__l" id={id}>{label}</span>
      <div className="opts" role="radiogroup" aria-labelledby={id} onKeyDown={key}>
        {options.map(o => <button key={o} type="button" role="radio" data-v={o} aria-checked={o === value} tabIndex={o === value ? 0 : -1} className="opt num" onClick={() => onPick(o)}>{render ? render(o) : o}</button>)}
      </div>
    </div>
  )
}

function OpenNow() {
  const [s, set] = useState<{ open: boolean; text: string } | null>(null)
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Nassau", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date())
      const g = (t: string) => parts.find(x => x.type === t)?.value ?? ""
      const day = g("weekday"), mins = (parseInt(g("hour")) % 24) * 60 + parseInt(g("minute"))
      const close = day === "Sun" ? 0 : day === "Sat" ? 13 * 60 : 16 * 60 + 30
      const open = close > 0 && mins >= 9 * 60 && mins < close
      const next = day === "Sun" || (day === "Sat" && mins >= close) ? "Monday" : mins >= close ? "tomorrow" : "today"
      set({ open, text: open ? `Open now on Mackey Street, until ${day === "Sat" ? "1:00 pm" : "4:30 pm"}` : `Closed now. Opens 9:00 am ${next}` })
    }
    tick(); const id = setInterval(tick, 60000); return () => clearInterval(id)
  }, [])
  return <p className="open" data-open={s?.open ?? false} aria-live="polite">{s ? <><i aria-hidden />{s.text}</> : <>&nbsp;</>}</p>
}

export function summaryOf(o: Order) {
  const use = USES.find(u => u.id === o.use)!
  const shower = use.kind === "shower"
  const s = shower ? null : STOCK[use.kind as Kind]
  const tint = s?.tints.find(t => t.id === o.pick.tint)
  const w = parseInches(o.w), h = parseInches(o.h)
  const sized = w > 0 && h > 0
  const area = sized ? (w * h / 144) * o.qty : 0
  const what = shower ? `a ${o.frame.toLowerCase()} shower enclosure with a ${o.door.toLowerCase()}`
    : `${use.kind === "laminated" ? "" : o.pick.thick + " in "}${tint?.name.toLowerCase()} ${use.kind === "laminated" ? "laminated safety glass" : use.kind}${use.say ? " " + use.say : ""}`
  return `Quote request for Nassau Glass: ${shower ? "" : `${o.qty} ${o.qty === 1 ? "piece" : "pieces"} of `}${what}${sized ? `, ${o.w.trim()} x ${o.h.trim()} in${o.qty > 1 && !shower ? " each" : ""} (${area.toFixed(1)} sq ft)` : ", size to be measured"}, ${o.fit ? "measure and fit please" : "to pick up at the counter"}.`
}

function Builder({ o, set }: { o: Order; set: (p: Partial<Order>) => void }) {
  const use = USES.find(u => u.id === o.use)!
  const shower = use.kind === "shower"
  const s = shower ? null : STOCK[use.kind as Kind]
  const [copied, setCopied] = useState(false)
  const w = parseInches(o.w), h = parseInches(o.h)
  const sized = w > 0 && h > 0
  const area = sized ? (w * h / 144) * o.qty : 0
  const tint = s?.tints.find(t => t.id === o.pick.tint)
  const summary = summaryOf(o)
  const pickUse = (id: string) => {
    const u = USES.find(x => x.id === id)!
    if (u.kind === "shower") return set({ use: id })
    const n = STOCK[u.kind]
    set({ use: id, pick: { kind: u.kind, thick: n.thick.includes(o.pick.thick) ? o.pick.thick : n.thick[Math.min(2, n.thick.length - 1)] ?? "", tint: n.tints.some(t => t.id === o.pick.tint) ? o.pick.tint : n.tints[0].id } })
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary) } catch { /* blocked: the summary stays on screen to read out */ }
    setCopied(true); setTimeout(() => setCopied(false), 1800)
  }
  const bad = (v: string) => v.trim() !== "" && !(parseInches(v) > 0)
  return (
    <form className="builder" onSubmit={e => e.preventDefault()} aria-label="Quote builder">
      <Radios label="What it is" value={o.use} options={USES.map(u => u.id)} onPick={pickUse} render={v => USES.find(u => u.id === v)!.label} />
      {shower ? <>
        <Radios label="Frame" value={o.frame} options={["Frameless", "Semi-frameless"]} onPick={v => set({ frame: v })} />
        <Radios label="Door" value={o.door} options={["Swing door", "Sliding door"]} onPick={v => set({ door: v })} />
      </> : <>
        {s!.thick.length ? <Radios className="row--thick" label="Thickness, in" value={o.pick.thick} options={s!.thick} onPick={v => set({ pick: { ...o.pick, thick: v } })} />
          : <div className="row"><span className="row__l">Thickness</span><p className="row__note">{s!.thickNote}, chosen with you at the counter</p></div>}
        <Radios label="Tint" value={o.pick.tint} options={s!.tints.map(t => t.id)} onPick={v => set({ pick: { ...o.pick, tint: v } })} render={v => { const t = s!.tints.find(x => x.id === v)!; return <><i className="dot" style={{ background: t.edge }} aria-hidden />{t.name}</> }} />
      </>}
      <div className="row size">
        <span className="row__l">Size, in</span>
        <div className="size__in">
          <label><span className="vh">Width in inches</span><input className="num" inputMode="decimal" value={o.w} onChange={e => set({ w: e.target.value })} placeholder="Width" aria-invalid={bad(o.w)} /></label>
          <span aria-hidden className="x">×</span>
          <label><span className="vh">Height in inches</span><input className="num" inputMode="decimal" value={o.h} onChange={e => set({ h: e.target.value })} placeholder="Height" aria-invalid={bad(o.h)} /></label>
          <div className="qty" role="group" aria-label="Pieces">
            <button type="button" onClick={() => set({ qty: Math.max(1, o.qty - 1) })} aria-label="One piece fewer">−</button>
            <span className="num" aria-live="polite">{o.qty} {o.qty === 1 ? "piece" : "pieces"}</span>
            <button type="button" onClick={() => set({ qty: Math.min(99, o.qty + 1) })} aria-label="One piece more">+</button>
          </div>
        </div>
        {(bad(o.w) || bad(o.h)) && <p className="row__note">Inches, for example 24 1/2</p>}
      </div>
      <Radios label="Fitting" value={o.fit ? "fit" : "pick"} options={["pick", "fit"]} onPick={v => set({ fit: v === "fit" })} render={v => (v === "fit" ? "Measure and fit" : "Pick up at the counter")} />
      <div className="ticket" aria-live="polite">
        <p className="ticket__area num"><span key={sized ? area.toFixed(1) : "none"} className="tick">{sized ? area.toFixed(1) : "Enter your size"}</span>{sized && <span className="ticket__u"> sq ft</span>}</p>
        <p className="ticket__sum">{summary}</p>
        <div className="ticket__acts">
          <a className="btn btn--primary num" href={TEL}>Call {PHONE}</a>
          <button type="button" className="link" onClick={copy}>{copied ? "Copied" : "Copy summary"}</button>
        </div>
        <OpenNow />
      </div>
    </form>
  )
}

function Stage({ o }: { o: Order }) {
  const ref = useRef<HTMLDivElement>(null)
  const phone = usePhone()
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const w = parseInches(o.w), h = parseInches(o.h)
  const sized = w > 0 && h > 0
  const aspect = sized ? w / h : 24 / 36
  const use = USES.find(u => u.id === o.use)!
  const pick: Pick = use.kind === "shower" ? { kind: "glass", thick: "3/8", tint: "clear" } : o.pick
  return (
    <div className="stage" ref={ref}>
      <div className="stage__box">
        <div className="poster" style={{ backgroundImage: `url(${phone ? "pane-phone.png" : "pane.png"})`, opacity: ready ? 0 : 1 }} aria-hidden />
        {show && <Suspense fallback={null}><Pane pick={pick} aspect={aspect} active={active} phone={phone} onReady={() => setReady(true)} /></Suspense>}
      </div>
      <p className="stage__dims num"><i aria-hidden /><span>{sized ? `${o.w.trim()} in wide, ${o.h.trim()} in high${use.kind !== "shower" && use.kind !== "laminated" ? `, ${o.pick.thick} in thick` : ""}` : "Type a width and height: the sheet takes its shape"}</span><i aria-hidden /></p>
      <p className="stage__note">{use.kind === "laminated" ? "Laminated safety glass: two sheets bonded to an interlayer, so a broken pane holds together. " : ""}A rendered sample. The real sheet is at the counter.</p>
    </div>
  )
}

function Hero({ o, set }: { o: Order; set: (p: Partial<Order>) => void }) {
  return (
    <section className="hero" id="quote" aria-labelledby="h1">
      <Toolbar home />
      <div className="wrap hero__grid">
        <Stage o={o} />
        <div className="hero__side">
          <h1 id="h1">Glass and mirror cut to your size, on Mackey Street since 1959.</h1>
          <Builder o={o} set={set} />
        </div>
      </div>
    </section>
  )
}

function Rack({ quote }: { quote: (k: Kind) => void }) {
  return (
    <section className="sec" id="rack" aria-labelledby="rack-h">
      <div className="wrap">
        <div className="head">
          <h2 id="rack-h">Everything on the rack, in one table.</h2>
          <p>The sheet goods the Glass Division keeps in stock, cut to any shape or size by factory-trained staff.</p>
        </div>
        <table className="rack">
          <thead><tr><th scope="col">Sheet</th><th scope="col">Thickness</th><th scope="col">Tints</th><th scope="col">Used for</th><th scope="col"><span className="vh">Action</span></th></tr></thead>
          <tbody>
            {RACK.map(r => (
              <tr key={r.name} data-rise>
                <th scope="row">{r.name}</th>
                <td className="num" data-l="Thickness">{r.thick}</td>
                <td data-l="Tints"><span className="tints">{r.tints.length ? r.tints.map(t => <span key={t}>{SWATCH[t] && <i style={{ background: SWATCH[t] }} aria-hidden />}{t}</span>) : "Ask at the counter"}</span></td>
                <td data-l="Used for">{r.use}</td>
                <td>{r.kind ? <button type="button" className="link" onClick={() => quote(r.kind as Kind)}>Quote it</button> : <a className="link num" href={TEL}>Call</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Showers({ quote }: { quote: () => void }) {
  return (
    <section className="sec showers" id="showers" aria-labelledby="showers-h">
      <div className="wrap head">
        <h2 id="showers-h">Shower enclosures are made here, not shipped in.</h2>
        <p>Nassau Glass manufactures its own: frameless and semi-frameless systems, with swing or sliding doors, in a choice of models, finishes and glass.</p>
        <button type="button" className="btn btn--line" onClick={quote}>Quote an enclosure</button>
      </div>
      <div className="strip" tabIndex={0} role="group" aria-label="Six shower enclosures by Nassau Glass, scroll sideways">
        {SHOWERS.map((s, i) => (
          <figure key={s.n}><img src={s.src} alt={SHOWER_ALT[i]} width={750} height={1000} loading="lazy" decoding="async" /></figure>
        ))}
      </div>
      <p className="wrap small showers__credit">Photographs: Nassau Glass.</p>
    </section>
  )
}

function WalkIn() {
  const show = ["bulbs", "fans", "framing", "decor", "metals", "service"]
  const list = show.map(id => DEPTS.find(d => d.id === id)!)
  return (
    <section className="sec" id="departments" aria-labelledby="dept-h">
      <div className="wrap">
        <div className="head">
          <h2 id="dept-h">Bulbs, Hunter fans, framing and lamps, at the same counter.</h2>
          <p>Walk in for the showroom, or have the shop make and fit. <a className="link" href="departments.html">All nine departments</a></p>
        </div>
        <ul className="depts">
          {list.map(d => (
            <li key={d.id} data-rise>
              <h3>{d.name}</h3>
              {d.since && <p className="small num">Since {d.since}</p>}
              <p>{d.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Since() {
  return (
    <section className="sec founded" aria-labelledby="since-h">
      <div className="wrap">
        <h2 id="since-h">The Bahamas' first glass fabricator, at the top of Mackey Street since 1959.</h2>
        <ol className="years">
          {YEARS.map(y => (
            <li key={y.y} data-rise>
              <span className="years__y num">{y.y}</span>
              <h3>{y.t}</h3>
              <p>{y.d}</p>
            </li>
          ))}
        </ol>
        <p className="founded__sis">Aluminum windows, doors and railings are made locally by the sister company, <a href={ALUMINUM} rel="noopener">Bahamas Aluminum Manufacturing Co. Ltd.</a></p>
      </div>
    </section>
  )
}

function Write({ o }: { o: Order }) {
  const [msg, setMsg] = useState("")
  const [sent, setSent] = useState(false)
  const summary = summaryOf(o)
  const touched = useRef(false)
  useEffect(() => { if (!touched.current) setMsg(summary) }, [summary])
  return (
    <form className="write" onSubmit={e => { e.preventDefault(); setSent(true) }} aria-labelledby="write-h">
      <h3 id="write-h">Or write to the counter</h3>
      <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
      <label><span>Phone or email</span><input name="contact" autoComplete="email" required /></label>
      <label><span>Message</span><textarea name="message" rows={4} value={msg} onChange={e => { touched.current = true; setMsg(e.target.value) }} /></label>
      <button type="submit" className="btn btn--primary">Send to the counter</button>
      {sent && <p className="write__sent" role="status">Thank you. On the live site this goes straight to the Nassau Glass inbox, through the form on their current site.</p>}
    </form>
  )
}

function Visit({ o }: { o: Order }) {
  return (
    <section className="sec visit" id="visit" data-quiet aria-labelledby="visit-h">
      <div className="wrap visit__grid">
        <div>
          <h2 id="visit-h">The green building at the top of the hill.</h2>
          <p className="lead">#46 Mackey Street, Nassau, half a mile south of the Paradise Island Bridge. The same address since 1959.</p>
          <OpenNow />
          <p className="visit__acts"><a className="btn btn--primary num" href={TEL}>Call {PHONE}</a><a className="link" href={MAP} rel="noopener">Open in Google Maps</a></p>
        </div>
        <table className="hours num">
          <tbody>
            <tr><th scope="row">Monday to Friday</th><td>{HOURS.week}</td></tr>
            <tr><th scope="row">Saturday</th><td>{HOURS.sat}</td></tr>
            <tr><th scope="row">Second line</th><td><a href={TEL2}>{PHONE2}</a></td></tr>
            <tr><th scope="row">Calling from abroad</th><td><a href={TEL_INTL}>{PHONE_INTL}</a></td></tr>
            <tr><th scope="row">Fax</th><td>{FAX}</td></tr>
          </tbody>
        </table>
        <Write o={o} />
        <figure className="visit__photo">
          <img src={`${IMG}2020/05/ng_gallery.jpg`} alt="The Nassau Glass building on Mackey Street, painted green with white trim" width={400} height={234} loading="lazy" decoding="async" />
          <figcaption className="small">Photograph: Nassau Glass.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-rise]")
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach(e => (e.dataset.rise = "in")); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.rise = "in"; io.unobserve(e.target) } }), { rootMargin: "0px 0px -10% 0px" })
    els.forEach((e, i) => { e.style.transitionDelay = `${(i % 6) * 60}ms`; io.observe(e) })
    return () => io.disconnect()
  }, [])
}

function Home() {
  useWheelSmoothing()
  useReveal()
  const [o, setO] = useState<Order>(START)
  const set = useMemo(() => (p: Partial<Order>) => setO(s => ({ ...s, ...p })), [])
  const quoteKind = (k: Kind) => {
    const u = USES.find(x => x.kind === k)!
    const n = STOCK[k]
    set({ use: u.id, pick: { kind: k, thick: n.thick[Math.min(2, n.thick.length - 1)] ?? "", tint: n.tints[0].id } }); go("quote")
  }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <Hero o={o} set={set} />
        <Rack quote={quoteKind} />
        <Showers quote={() => { set({ use: "shower" }); go("quote") }} />
        <WalkIn />
        <Since />
        <Visit o={o} />
      </main>
      <Footer />
      <Bars after="#quote" home />
    </>
  )
}

mount(<Home />)
