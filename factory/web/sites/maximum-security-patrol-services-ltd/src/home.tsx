import { StrictMode, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { HOURS, PREMISES, SERVICES, biz, message, type Hours, type SvcId } from "./data"
import { Plan, Symbol } from "./plan"
import "./styles.css"

const reducedQ = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches

function arrows(e: KeyboardEvent<HTMLElement>, sel: string) {
  const k = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].indexOf(e.key)
  if (k < 0) return
  const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>(sel)]
  const i = items.indexOf(document.activeElement as HTMLButtonElement)
  if (i < 0) return
  e.preventDefault()
  const n = items[(i + (k < 2 ? 1 : -1) + items.length) % items.length]
  n.focus(); n.click()
}

function Bar() {
  return (
    <header className="bar">
      <a className="bar__name" href="#builder"><span className="bar__full">Maximum Security &amp; Patrol Services</span><span className="bar__short">Maximum Security</span></a>
      <nav className="bar__nav" aria-label="Sections"><a href="#services">Services</a><a href="#since">Since 1993</a><a href="#how">How it works</a><a href="#call">Contact</a></nav>
      <div className="bar__tel num">
        {biz.phones.map((p, i) => <a key={p.tel} href={p.tel} className={i ? "bar__tel2" : ""}>{p.label}</a>)}
      </div>
    </header>
  )
}

type State = { prem: string; svc: SvcId[]; hours: Hours; posts: number; where: string }

function Builder({ st, set, callRef }: { st: State; set: (f: (s: State) => State) => void; callRef: React.RefObject<HTMLAnchorElement | null> }) {
  const p = PREMISES.find(x => x.id === st.prem)!
  const say = useMemo(() => message(p, st.svc, st.hours, st.posts, st.where), [p, st])
  const [copied, setCopied] = useState(false)
  const [reduced, setReduced] = useState(false)
  useEffect(() => setReduced(reducedQ()), [])
  const toggle = (id: SvcId) => set(s => ({ ...s, svc: s.svc.includes(id) ? s.svc.filter(x => x !== id) : [...s.svc, id] }))
  const copy = async () => {
    try { await navigator.clipboard.writeText(say); setCopied(true); setTimeout(() => setCopied(false), 1600) }
    catch { const r = document.createRange(); const el = document.getElementById("say"); if (el) { r.selectNodeContents(el); getSelection()?.removeAllRanges(); getSelection()?.addRange(r) } }
  }
  return (
    <section className="builder" id="builder" aria-labelledby="title">
      <div className="ask">
        <h1 id="title" className="hero">Security officers, patrols and alarm monitoring for Nassau.</h1>
        <p className="lede">Build your request on the plan, then call the office on Carib Road. A Nassau company since 1993.</p>

        <div className="field">
          <p className="field__label" id="l-hours">Hours to cover</p>
          <div className="chips" role="radiogroup" aria-labelledby="l-hours" onKeyDown={e => arrows(e, "[role=radio]")}>
            {HOURS.map(h => <button key={h} type="button" role="radio" aria-checked={st.hours === h} tabIndex={st.hours === h ? 0 : -1} onClick={() => set(s => ({ ...s, hours: h }))}>{h}</button>)}
          </div>
        </div>
        <div className="field field--row">
          <div className="field">
            <p className="field__label" id="l-posts">Officers on post at once</p>
            <div className="step" role="group" aria-labelledby="l-posts">
              <button type="button" aria-label="Fewer officers" onClick={() => set(s => ({ ...s, posts: Math.max(1, s.posts - 1) }))}>&minus;</button>
              <output className="num" aria-live="polite" key={st.posts}>{st.posts}</output>
              <button type="button" aria-label="More officers" onClick={() => set(s => ({ ...s, posts: Math.min(30, s.posts + 1), svc: s.svc.includes("officers") ? s.svc : [...s.svc, "officers"] }))}>+</button>
            </div>
          </div>
          <label className="field field--grow">
            <span className="field__label">Where</span>
            <input value={st.where} onChange={e => set(s => ({ ...s, where: e.target.value }))} placeholder="e.g. Bay Street, Nassau" />
          </label>
        </div>

        <div className="readback">
          <p className="readback__k">What to say when the office answers</p>
          <p id="say" className="readback__say" aria-live="polite">{say}</p>
          <div className="readback__act">
            <a ref={callRef} className="btn num" href={biz.phones[0].tel}>Call {biz.phones[0].label}</a>
            <a className="link num" href={biz.phones[1].tel}>or {biz.phones[1].label}</a>
          </div>
          <div className="readback__more">
            <button type="button" className="link" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
            <a className="link" href={`mailto:?subject=${encodeURIComponent("Security proposal request: Maximum Security, Carib Road")}&body=${encodeURIComponent(say + "\n\nMaximum Security & Patrol Services, " + biz.address + ", Nassau. " + biz.phones.map(x => x.label).join(" / "))}`}>Email to a colleague</a>
          </div>
        </div>
      </div>

      <div className="sheet">
        <div className="tabs" role="tablist" aria-label="Premises" onKeyDown={e => arrows(e, "[role=tab]")}>
          {PREMISES.map(x => (
            <button key={x.id} type="button" role="tab" aria-selected={x.id === st.prem} tabIndex={x.id === st.prem ? 0 : -1} aria-controls="plan" onClick={() => set(s => ({ ...s, prem: x.id }))}>{x.name}</button>
          ))}
        </div>
        <div className="sheet__plan" id="plan" role="tabpanel">
          <Plan p={p} on={st.svc} posts={st.posts} hours={st.hours} reduced={reduced} />
        </div>
        <div className="legend" role="group" aria-label="Services on the plan">
          {SERVICES.map(s => (
            <button key={s.id} type="button" aria-pressed={st.svc.includes(s.id)} onClick={() => toggle(s.id)}>
              <Symbol id={s.id} /><span>{s.name}</span>
            </button>
          ))}
        </div>
        <p className="sheet__note">Diagram for illustration. A site visit sets the real posts and routes.</p>
      </div>
    </section>
  )
}

function Services({ st, add }: { st: State; add: (id: SvcId) => void }) {
  return (
    <section className="svcs" id="services" aria-labelledby="svcs-title">
      <h2 id="svcs-title" className="h2">Five services from one office that answers.</h2>
      <ol>
        {SERVICES.map(s => (
          <li key={s.id} className="lane">
            <span className="lane__n num">{s.n}</span>
            <h3 className="h3 lane__name">{s.name}</h3>
            <div className="lane__body">
              <p>{s.words}</p>
              <p className="lane__who">For {s.who.charAt(0).toLowerCase() + s.who.slice(1)}.</p>
            </div>
            <button type="button" className="lane__act" aria-pressed={st.svc.includes(s.id)} onClick={() => add(s.id)}>{st.svc.includes(s.id) ? "In your proposal" : "Add to my proposal"}</button>
            {s.photo && s.id !== "patrols" && (
              <figure className="lane__photo">
                <div className="frame"><img src={s.photo.src} alt={s.photo.alt} width={1920} height={1080} loading="lazy" decoding="async" data-source="generated" /></div>
                <figcaption>Illustrative photograph</figcaption>
              </figure>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

function Sectors() {
  return (
    <section className="sectors" aria-labelledby="sec-title">
      <h2 id="sec-title" className="sectors__k">Who we protect, in our own words.</h2>
      <ul>{["Business and financial", "Government", "Retail", "Private and public clients"].map(x => <li key={x}>{x}</li>)}</ul>
    </section>
  )
}

function Since() {
  return (
    <section className="since" id="since" aria-labelledby="since-title">
      <p className="since__year num" aria-hidden="true">1993</p>
      <div className="since__text">
        <h2 id="since-title" className="h2">Started with not more than a dozen fully trained officers.</h2>
        <p>Byron C. Rodgers, Chairman and CEO, founded Maximum Security &amp; Patrol Services in 1993. The aim from the first day: to change an industry known for turnover and low standards.</p>
        <p>Today the company supplies officers, patrols, alarm monitoring, investigations and consultancy from one office on Carib Road, and is listed on the URCA public register of licensees.</p>
      </div>
    </section>
  )
}

function How() {
  const steps = [
    ["Call the office", "Tell us the premises, the hours and what worries you. The summary above says it for you."],
    ["Site visit", "We walk the premises and the perimeter with you."],
    ["Written plan", "Posts, patrol routes and monitoring, set out for your approval."],
    ["Officers on post", "Trained officers start on the agreed schedule."],
  ]
  return (
    <section className="how" id="how" aria-labelledby="how-title">
      <h2 id="how-title" className="h2">How a proposal works.</h2>
      <ol>{steps.map(([t, d], i) => <li key={t}><span className="num">{String(i + 1).padStart(2, "0")}</span><h3 className="h3">{t}</h3><p>{d}</p></li>)}</ol>
    </section>
  )
}

function Call() {
  return (
    <section className="call" id="call" aria-labelledby="call-title">
      <h2 id="call-title" className="h2">Call Carib Road.</h2>
      <div className="call__grid">
        <div className="call__nums">
          {biz.phones.map(p => <a key={p.tel} className="call__num num" href={p.tel}>{p.label}</a>)}
          <p className="num">Fax {biz.fax}</p>
        </div>
        <address className="call__addr">
          <p className="h3">{biz.address}</p>
          <p>{biz.town}</p>
          <p>{biz.box}, Nassau</p>
          <a className="link" href={biz.map} target="_blank" rel="noopener">Open in Maps</a>
        </address>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <p className="foot__name">{biz.name}</p>
      <p>Founded 1993 by Byron C. Rodgers. {biz.address}, Nassau.</p>
      <p className="foot__fine">Photography: illustrative images generated for this concept, to be replaced with your own. The site plans are diagrams.</p>
    </footer>
  )
}

function Home() {
  const [st, setSt] = useState<State>({ prem: "office", svc: ["officers", "patrols"], hours: "Nights", posts: 2, where: "" })
  const set = (f: (s: State) => State) => setSt(f)
  const callRef = useRef<HTMLAnchorElement>(null)
  const [dock, setDock] = useState(false)

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || reducedQ()) return
    const lenis = new Lenis({ duration: 1.05 })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  useEffect(() => {
    const a = callRef.current, b = document.getElementById("call"), c = document.querySelector(".legend")
    if (!a || !b || !c) return
    const vis = new Map<Element, boolean>([[a, true], [b, false], [c, true]])
    const io = new IntersectionObserver(es => { es.forEach(e => vis.set(e.target, e.isIntersecting || (e.target === c && e.boundingClientRect.top > 0))); setDock(![...vis.values()].some(Boolean)) })
    io.observe(a); io.observe(b); io.observe(c)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const narrow = matchMedia("(max-width: 900px)").matches
    document.documentElement.style.setProperty("--concept-offset", dock && narrow ? "72px" : "0px")
  }, [dock])

  const add = (id: SvcId) => {
    setSt(s => ({ ...s, svc: s.svc.includes(id) ? s.svc : [...s.svc, id] }))
    document.getElementById("builder")?.scrollIntoView({ behavior: reducedQ() ? "auto" : "smooth" })
  }

  return (
    <>
      <a className="skip" href="#builder">Skip to the proposal builder</a>
      <Bar />
      <main>
        <Builder st={st} set={set} callRef={callRef} />
        <Services st={st} add={add} />
        <figure className="band">
          <div className="frame"><img src={SERVICES[1].photo!.src} alt={SERVICES[1].photo!.alt} width={1920} height={1080} loading="lazy" decoding="async" data-source="generated" /></div>
          <figcaption>Patrols after closing. Illustrative photograph.</figcaption>
        </figure>
        <Sectors />
        <Since />
        <How />
        <Call />
      </main>
      <Footer />
      <div className={`dock${dock ? " is-on" : ""}`} aria-hidden={!dock}>
        <a className="btn num" href={biz.phones[0].tel} tabIndex={dock ? 0 : -1}>Call {biz.phones[0].label}</a>
      </div>
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
