import { StrictMode, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import Lenis from "lenis"
import { EraWindow, ERAS, type Year } from "./browser"
import { answer, BIZ, DEFAULT_REQ, EMAIL, IMG, ISLANDS, mail, NEEDS, PAGES, PAY, PHONE, SERVICES, STEPS, TEL, US_PHONE, US_TEL, type NeedId, type Req } from "./data"
import "./styles.css"

const ease = [0.22, 1, 0.36, 1] as const
type SetReq = Dispatch<SetStateAction<Req>>
let lenis: Lenis | null = null
const go = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -8 })
  else el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
}

function Nav() {
  return (
    <header className="nav wrap">
      <a href="#top" className="nav__name"><img className="logo" src="https://www.bvgdesign.com/logobvg5bb.jpg" alt="" height={32} />BVG Design Services</a>
      <nav aria-label="Sections" className="nav__links">
        <a href="#services">Services</a>
        <a href="#then-now">Since 1996</a>
        <a href="#offices">Offices</a>
      </nav>
      <a href={TEL} className="nav__tel num">{PHONE}</a>
    </header>
  )
}

function Builder({ req, setReq }: { req: Req; setReq: SetReq }) {
  const reduce = useReducedMotion()
  const lines = useMemo(() => answer(req), [req])
  const m = useMemo(() => mail(req), [req])
  const showPages = req.needs.includes("site") || req.needs.includes("redesign")
  const toggle = (id: NeedId) => setReq(r => ({ ...r, needs: r.needs.includes(id) ? r.needs.filter(n => n !== id) : [...r.needs, id] }))
  const segKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (i + d + PAGES.length) % PAGES.length
    setReq(r => ({ ...r, pages: PAGES[n] }))
    ;(e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus()
  }
  return (
    <div className="bld" id="request" aria-labelledby="bld-title">
      <h2 id="bld-title" className="bld__title">Start your request</h2>
      <fieldset className="bld__group">
        <legend>What do you need?</legend>
        <div className="chips">
          {NEEDS.map(n => <button key={n.id} type="button" className="chip" aria-pressed={req.needs.includes(n.id)} onClick={() => toggle(n.id)}>{n.label}</button>)}
        </div>
      </fieldset>
      <AnimatePresence initial={false}>
        {showPages && (
          <motion.fieldset key="pages" className="bld__group bld__pages" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28, ease }}>
            <legend>How many pages?</legend>
            <LayoutGroup id="seg">
              <div className="seg" role="radiogroup" aria-label="How many pages">
                {PAGES.map((p, i) => {
                  const on = req.pages === p
                  return (
                    <button key={p} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1} className="seg__opt num" onClick={() => setReq(r => ({ ...r, pages: p }))} onKeyDown={e => segKey(e, i)}>
                      {on && <motion.span layoutId="seg-on" className="seg__on" transition={{ duration: reduce ? 0 : 0.28, ease }} />}
                      <span className="seg__t">{p}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          </motion.fieldset>
        )}
      </AnimatePresence>
      <div className="bld__row">
        <label className="fld"><span>Business</span>
          <select value={req.biz} onChange={e => setReq(r => ({ ...r, biz: e.target.value }))}>{BIZ.map(b => <option key={b}>{b}</option>)}</select>
        </label>
        <label className="fld"><span>Island</span>
          <select value={req.island} onChange={e => setReq(r => ({ ...r, island: e.target.value }))}>{ISLANDS.map(i => <option key={i}>{i}</option>)}</select>
        </label>
        <label className="fld fld--wide">
          <input aria-label="Business name, optional" value={req.name} onChange={e => setReq(r => ({ ...r, name: e.target.value }))} placeholder="Business name (optional)" autoComplete="organization" />
        </label>
        <label className="fld fld--wide">
          <textarea aria-label="Anything else, optional" rows={1} value={req.note} onChange={e => setReq(r => ({ ...r, note: e.target.value }))} placeholder="Anything else? Your current site, a deadline" />
        </label>
      </div>
      <div className="ans" aria-live="polite">
        <p className="ans__h">What BVG does for this</p>
        <ul className="ans__list">
          <AnimatePresence initial={false} mode="popLayout">
            {lines.length === 0 && (
              <motion.li key="empty" className="ans__empty" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Choose what you need and this fills in.</motion.li>
            )}
            {lines.map(l => (
              <motion.li key={l.id} layout={!reduce} data-tier={l.tier || undefined} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease }}>{l.text}</motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <p className="ans__pay">{PAY}</p>
      </div>
      <div className="bld__act">
        <a className="btn" href={m.href}>Send my request</a>
        <a className="quiet num" href={TEL}>Call Freeport {PHONE}</a>
      </div>
      <p className="bld__fine">Writes an email to <span className="sel">{EMAIL}</span>. From the US: <a className="num" href={US_TEL}>{US_PHONE}</a>.</p>
    </div>
  )
}

function Hero({ req, setReq }: { req: Req; setReq: SetReq }) {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="hero__say">
        <h1 id="hero-title" className="t-hero">Built and found since&nbsp;1996.</h1>
        <p className="hero__lede t-lead">Bahamian-owned web design, hosting, search and advertising from Freeport, Grand Bahama, for businesses on every island. We started with our own site, the Bahamas Vacation Guide.</p>
        <p className="hero__proof">Offices in Freeport, Nassau and Abaco.</p>
        <a className="see" href="#then-now" onClick={e => { e.preventDefault(); go("then-now") }}>
          <span className="see__win"><EraWindow year={1996} /></span>
          <span className="see__t"><b>The Bahamas Vacation Guide, 1996</b>See it rebuilt for 2026</span>
        </a>
      </div>
      <div className="hero__tool"><Builder req={req} setReq={setReq} /></div>
    </section>
  )
}

function ThenNow({ req }: { req: Req }) {
  const m = useMemo(() => mail(req), [req])
  const chosen = NEEDS.filter(n => req.needs.includes(n.id))
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [year, setYear] = useState<Year>(reduce ? 2026 : 1996)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", v => {
    if (reduce) return
    const i = Math.min(ERAS.length - 1, Math.max(0, Math.floor(v * ERAS.length * 0.999 + 0.0001)))
    const y = ERAS[i].year
    setYear(p => (p === y ? p : y))
  })
  const pick = (i: number) => {
    setYear(ERAS[i].year)
    const el = ref.current
    if (!el || reduce) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    const y = top + span * ((i + 0.5) / ERAS.length)
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: "smooth" })
  }
  const last = year === 2026
  return (
    <section className="tn" id="then-now" ref={ref} aria-labelledby="tn-title" data-reduce={reduce || undefined}>
      <div className="tn__pin">
        <div className="tn__grid wrap">
          <div className="tn__say">
            <h2 id="tn-title" className="t-h2">Our first site, rebuilt for every era since.</h2>
            <p className="tn__short">BVG's first site, 1996, rebuilt for each decade since.</p>
            <p className="tn__p">The Bahamas Vacation Guide went online in 1996 and reached the top of the search engines. Scroll through thirty years of how it would have been built. The words and island photographs are the guide's own.</p>
            <div className="rail" role="group" aria-label="Choose an era">
              {ERAS.map((e, i) => (
                <button key={e.year} type="button" className="rail__b" aria-pressed={year === e.year} onClick={() => pick(i)}>
                  <span className="rail__y num">{e.year}</span>
                  <span className="rail__l">{e.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="tn__win" data-phone={last}>
            <EraWindow year={year} />
            <div className="tn__next" data-show={last} aria-hidden={!last}>
              <p className="tn__next-h">Your site is next.</p>
              <p className="tn__next-p">Your request so far, ready to send to Freeport:</p>
              <ul className="tn__chips">{chosen.length ? chosen.map(n => <li key={n.id}>{n.label}</li>) : <li>Advice on what I need</li>}<li>{req.island}</li></ul>
              <div className="tn__act">
                <a className="btn" href={m.href} tabIndex={last ? 0 : -1}>Send my request</a>
                <a className="quiet" href="#top" tabIndex={last ? 0 : -1} onClick={e => { e.preventDefault(); go("top") }}>Edit my request</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services({ req, setReq }: { req: Req; setReq: SetReq }) {
  const toggle = (id: NeedId) => setReq(r => ({ ...r, needs: r.needs.includes(id) ? r.needs.filter(n => n !== id) : [...r.needs, id] }))
  return (
    <section className="svc wrap" id="services" aria-labelledby="svc-title">
      <div className="svc__head">
        <h2 id="svc-title" className="t-h2">Everything a Bahamian business needs online, from one Freeport studio.</h2>
      </div>
      <ul className="svc__list">
        {SERVICES.map(s => {
          const on = req.needs.includes(s.need)
          return (
            <li key={s.id} className="svc__row">
              <h3 className="t-h3">{s.name}</h3>
              <p className="svc__line">{s.line}</p>
              <p className="svc__facts">{s.facts.join(" · ")}</p>
              <button type="button" className="add" aria-pressed={on} onClick={() => toggle(s.need)}>
                <span className="add__box" aria-hidden="true" />{on ? "In your request" : "Add to my request"}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Steps() {
  return (
    <section className="steps wrap" aria-labelledby="steps-title">
      <h2 id="steps-title" className="t-h2 steps__title">How a site with BVG goes.</h2>
      <ol className="steps__list">
        {STEPS.map(([h, p], i) => (
          <li key={h}><span className="steps__n num">{i + 1}</span><h3 className="t-h3">{h}</h3><p>{p}</p></li>
        ))}
      </ol>
      <p className="steps__fast t-lead">Simple pages are normally ready within 24 hours of the order.</p>
      <p className="steps__pay">{PAY}</p>
    </section>
  )
}

const STRIP: [string, string, string][] = [
  [IMG.hopeTown, "Hope Town, Elbow Cay, Abaco", "Hope Town harbour with its red and white lighthouse behind the docks"],
  [IMG.treasureCay, "Treasure Cay, Abaco", "A thatched shade on the beach at Treasure Cay, pale green water beyond"],
  [IMG.nassauLight, "The lighthouse, Nassau", "The white lighthouse on its rocky point at the mouth of Nassau harbour"],
  [IMG.deadmans, "Dead Man's Reef, Grand Bahama", "Sunset rays over the water seen from the beach at Dead Man's Reef"],
]

function Story() {
  return (
    <section className="story" id="story" aria-labelledby="story-title">
      <div className="story__grid wrap">
        <p className="story__year t-hero num" aria-hidden="true">1996</p>
        <div className="story__text">
          <h2 id="story-title" className="t-h3">Two entrepreneurs in mid 1996: one took the graphics, the other the code.</h2>
          <p>Their first multi-page site, the Bahamas Vacation Guide, went to the top of the search engines. Businesses asked to be included, then asked for sites of their own.</p>
          <p>The guide gave the studio its name: BVG stands for Bahamas Vacation Guide. It is still online, its pages signed "Designed and Maintained by BVG Design".</p>
          <a className="quiet" href="http://www.bahamasvacationguide.com/" rel="noopener">Visit the Bahamas Vacation Guide</a>
        </div>
      </div>
      <ul className="strip wrap" aria-label="Photographs from the Bahamas Vacation Guide">
        {STRIP.map(([src, cap, alt]) => (
          <li key={cap}>
            <img src={src} alt={alt} width={900} height={398} loading="lazy" decoding="async" />
            <span>{cap}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Offices() {
  return (
    <section className="offices" id="offices" aria-labelledby="off-title">
      <figure className="offices__photo">
        <img src={IMG.harbour} alt="Lucayan Harbour, Freeport, from above: palms, the green roofs of the market and the harbour beyond" width={2400} height={1600} loading="lazy" decoding="async" />
        <figcaption className="wrap">Lucayan Harbour, Freeport. Photo: Jon Worth, Wikimedia Commons, CC BY-SA 2.0.</figcaption>
      </figure>
      <div className="offices__grid wrap">
        <h2 id="off-title" className="t-h2 offices__title">Bahamian owned, with offices in Freeport, Nassau and Abaco.</h2>
        <div className="off">
          <h3 className="t-h3">Freeport</h3>
          <p className="muted">Headquarters. P.O. Box F-43652, Freeport, Grand Bahama</p>
          <a className="num" href={TEL}>{PHONE}</a>
        </div>
        <div className="off">
          <h3 className="t-h3">Nassau and Abaco</h3>
          <p className="muted">Local offices.</p>
        </div>
        <div className="off">
          <h3 className="t-h3">United States</h3>
          <p className="muted">Staff and affiliates. 5115 NW 17th Terrace, Hangar 39a, Fort Lauderdale, FL 33309</p>
          <a className="num" href={US_TEL}>{US_PHONE}</a>
        </div>
      </div>
    </section>
  )
}

function Contact({ req }: { req: Req }) {
  const m = useMemo(() => mail(req), [req])
  return (
    <section className="close" id="contact" aria-labelledby="close-title">
      <div className="close__grid wrap">
        <h2 id="close-title" className="close__h">Talk to Freeport.</h2>
        <a className="close__tel num" href={TEL}>{PHONE}</a>
        <a className="close__mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div className="close__act">
          <a className="btn" href={m.href}>Send my request</a>
          <a className="quiet" href="#top" onClick={e => { e.preventDefault(); go("top") }}>Edit my request</a>
        </div>
        <p className="close__fine">From the US <a className="num" href={US_TEL}>{US_PHONE}</a>. Mail: P.O. Box F-43652, Freeport, Grand Bahama.</p>
      </div>
      <footer className="foot wrap">
        <p className="foot__brand"><img className="logo logo--foot" src="https://www.bvgdesign.com/logobvg5bb.jpg" alt="BVG Design Services logo" height={48} />Web design, hosting, search and advertising since 1996.</p>
        <p>Island photographs from the Bahamas Vacation Guide. Lucayan Harbour: Jon Worth, Wikimedia Commons, CC BY-SA 2.0.</p>
      </footer>
    </section>
  )
}

function Dock({ req }: { req: Req }) {
  const [show, setShow] = useState(false)
  const m = useMemo(() => mail(req), [req])
  useEffect(() => {
    const h1 = document.getElementById("hero-title"), act = document.querySelector(".bld__act"), close = document.getElementById("contact")
    if (!h1 || !act || !close) return
    let past = false, atAct = false, atClose = false
    const io = new IntersectionObserver(es => {
      for (const e of es) {
        if (e.target === h1) past = !e.isIntersecting || e.boundingClientRect.top < 0
        if (e.target === act) atAct = e.isIntersecting
        if (e.target === close) atClose = e.isIntersecting
      }
      setShow(past && !atAct && !atClose)
    }, { threshold: 0 })
    io.observe(h1); io.observe(act); io.observe(close)
    return () => io.disconnect()
  }, [])
  const n = req.needs.length
  return (
    <div className="dock" data-show={show} aria-hidden={!show}>
      <a href={m.href} className="btn" tabIndex={show ? 0 : -1}>Send my request{n > 0 && <span className="dock__n num">{n}</span>}</a>
      <a href={TEL} className="dock__tel" aria-label={`Call Freeport ${PHONE}`} tabIndex={show ? 0 : -1}>Call</a>
    </div>
  )
}

function Home() {
  const [req, setReq] = useState<Req>(DEFAULT_REQ)
  useEffect(() => {
    if (lenis || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const l = new Lenis({ duration: 1.05 })
    lenis = l
    let id = 0
    const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy(); lenis = null }
  }, [])
  return (
    <>
      <a className="skip" href="#request">Skip to the website request</a>
      <Nav />
      <main>
        <Hero req={req} setReq={setReq} />
        <ThenNow req={req} />
        <Services req={req} setReq={setReq} />
        <Steps />
        <Story />
        <Offices />
        <Contact req={req} />
      </main>
      <Dock req={req} />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
