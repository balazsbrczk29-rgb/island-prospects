import { StrictMode, useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, motion } from "motion/react"
import Lenis from "lenis"
import EraBrowser from "./browser"
import { EMAIL, IMG, ISLANDS, NEEDS, PAY, PHONE, SERVICES, SIZES, STEPS, TEL, US_PHONE, US_TEL } from "./data"
import "./styles.css"

const ease = [0.22, 1, 0.36, 1] as const

function Nav() {
  return (
    <header className="nav grid12">
      <a href="#top" className="nav__name">BVG Design Services</a>
      <nav aria-label="Sections" className="nav__links">
        <a href="#services">Services</a>
        <a href="#story">Since 1996</a>
        <a href="#offices">Offices</a>
        <a href="#request">Request</a>
      </nav>
      <a href={TEL} className="nav__tel num">{PHONE}</a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero grid12" id="top" aria-labelledby="hero-title">
      <div className="hero__say">
        <h1 id="hero-title" className="t-56">Bahamian websites, built and found since&nbsp;1996.</h1>
        <p className="hero__lede t-18">Web design, hosting, search and advertising from Freeport, Grand Bahama, for businesses on every island. We started with our own: the Bahamas Vacation Guide.</p>
        <div className="hero__act">
          <a className="btn" href="#request">Start a website request</a>
          <a className="quiet num" href={TEL}>Call Freeport {PHONE}</a>
        </div>
        <p className="hero__proof">Offices in Freeport, Nassau and Abaco. Simple pages are usually ready within 24 hours.</p>
      </div>
      <div className="hero__demo"><EraBrowser /></div>
    </section>
  )
}

function Services() {
  const [on, setOn] = useState(SERVICES[0].id)
  return (
    <section className="svc grid12" id="services" aria-labelledby="svc-title">
      <h2 id="svc-title" className="svc__title t-56">Everything a Bahamian business needs to be online, from one Freeport studio.</h2>
      <div className="svc__list">
        {SERVICES.map(s => (
          <article key={s.id} className="svc__row" data-on={on === s.id} onMouseEnter={() => setOn(s.id)}>
            <h3>
              <button type="button" aria-expanded={on === s.id} aria-controls={`svc-${s.id}`} onClick={() => setOn(s.id)} className="t-28">{s.name}</button>
            </h3>
            <p className="svc__line">{s.line}</p>
            <AnimatePresence initial={false}>
              {on === s.id && (
                <motion.div id={`svc-${s.id}`} className="svc__more" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.32, ease }}>
                  <ul>{s.facts.map(f => <li key={f}>{f}</li>)}</ul>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
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
      <div className="grid12">
        <p className="story__year t-120 num" aria-hidden="true">1996</p>
        <div className="story__text">
          <h2 id="story-title" className="t-28">Two entrepreneurs, one afternoon in mid 1996.</h2>
          <p>One took the graphics, the other the code. A month later their multi-page Bahamas Vacation Guide went straight to the top of the search engines, ahead of the established Bahamas guides.</p>
          <p>Businesses started asking to be included and for pages of their own. The guide gave the studio its name: BVG stands for Bahamas Vacation Guide. It is still online, still designed and maintained by BVG.</p>
          <a className="quiet" href="http://www.bahamasvacationguide.com/" rel="noopener">Visit the Bahamas Vacation Guide</a>
        </div>
      </div>
      <ul className="strip" aria-label="Photographs from the Bahamas Vacation Guide">
        {STRIP.map(([src, cap, alt]) => (
          <li key={cap}>
            <img src={src} alt={alt} width={900} height={398} loading="lazy" decoding="async" />
            <span className="t-14">{cap}</span>
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
        <img src={IMG.harbour} alt="Lucayan Harbour, Freeport, from above: palms, green roofs of the market and the harbour beyond" width={2400} height={1600} loading="lazy" decoding="async" />
        <figcaption className="t-14">Lucayan Harbour, Freeport. Photo: Jon Worth, Wikimedia Commons, CC BY-SA 2.0.</figcaption>
      </figure>
      <div className="grid12 offices__grid">
        <h2 id="off-title" className="t-56 offices__title">Bahamian owned, with offices in Freeport, Nassau and Abaco.</h2>
        <div className="off off--hq">
          <h3 className="t-18">Freeport, headquarters</h3>
          <p className="muted">Smith's Point, P.O. Box F-43652<br />Freeport, Grand Bahama</p>
          <a className="num" href={TEL}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="off">
          <h3 className="t-18">Nassau and Abaco</h3>
          <p className="muted">Local offices. Start with Freeport and we connect you.</p>
        </div>
        <div className="off">
          <h3 className="t-18">From the United States</h3>
          <a className="num" href={US_TEL}>{US_PHONE}</a>
          <p className="muted">5115 NW 17th Terrace, Hangar 39a<br />Fort Lauderdale, FL 33309</p>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section className="steps grid12" aria-labelledby="steps-title">
      <h2 id="steps-title" className="t-28 steps__title">How a site with BVG goes.</h2>
      <ol className="steps__list">
        {STEPS.map(([h, p], i) => (
          <li key={h}><span className="num t-14 muted">{i + 1}</span><h3 className="t-18">{h}</h3><p>{p}</p></li>
        ))}
      </ol>
      <p className="steps__pay muted">{PAY} No account is too small or too large.</p>
    </section>
  )
}

function Request() {
  const [needs, setNeeds] = useState<string[]>([NEEDS[0]])
  const [biz, setBiz] = useState("")
  const [island, setIsland] = useState(ISLANDS[0])
  const [size, setSize] = useState(SIZES[1])
  const [note, setNote] = useState("")
  const toggle = (n: string) => setNeeds(s => (s.includes(n) ? s.filter(x => x !== n) : [...s, n]))
  const body = useMemo(() => [
    `Hello BVG Design,`,
    ``,
    `Business: ${biz.trim() || "(your business name)"}`,
    `Island: ${island}`,
    `What we need: ${needs.length ? needs.join(", ") : "(choose above)"}`,
    `Size: ${size}`,
    note.trim() ? `Notes: ${note.trim()}` : "",
    ``,
    `Please call or email me back.`,
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n"), [needs, biz, island, size, note])
  const subject = `Website request: ${biz.trim() || "new client"}`
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return (
    <section className="req grid12" id="request" aria-labelledby="req-title">
      <div className="req__form">
        <h2 id="req-title" className="t-56">Tell us what you need.</h2>
        <p className="t-18 muted req__lede">Four quick choices write the email for you. We answer from Freeport.</p>
        <fieldset>
          <legend className="t-14">What do you need?</legend>
          <div className="chips">
            {NEEDS.map(n => <button key={n} type="button" aria-pressed={needs.includes(n)} onClick={() => toggle(n)}>{n}</button>)}
          </div>
        </fieldset>
        <div className="req__row">
          <label><span className="t-14">Business name</span><input value={biz} onChange={e => setBiz(e.target.value)} placeholder="e.g. your guesthouse in Lucaya" autoComplete="organization" /></label>
          <label><span className="t-14">Island</span><select value={island} onChange={e => setIsland(e.target.value)}>{ISLANDS.map(i => <option key={i}>{i}</option>)}</select></label>
        </div>
        <fieldset>
          <legend className="t-14">How big?</legend>
          <div className="chips chips--one">
            {SIZES.map(s => <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)}>{s}</button>)}
          </div>
        </fieldset>
        <label className="req__note"><span className="t-14">Anything else (optional)</span><textarea rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Your current website, a deadline, what is not working" /></label>
      </div>
      <div className="req__out">
        <div className="mail">
          <p className="mail__to t-14">To {EMAIL}</p>
          <p className="mail__sub">{subject}</p>
          <pre className="mail__body">{body}</pre>
        </div>
        <a className="btn btn--light" href={href}>Email the request</a>
        <a className="quiet quiet--light num" href={TEL}>Or call Freeport {PHONE}</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot grid12">
      <p className="foot__name t-28">BVG Design Services</p>
      <div className="foot__c">
        <a className="num" href={TEL}>{PHONE}</a>
        <a className="num" href={US_TEL}>US {US_PHONE}</a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <p className="muted">P.O. Box F-43652, Freeport, Grand Bahama</p>
      </div>
      <p className="foot__fine t-14 muted">Island photographs from the Bahamas Vacation Guide. Lucayan Harbour: Jon Worth, Wikimedia Commons, CC BY-SA 2.0.</p>
    </footer>
  )
}

function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.getElementById("top"), req = document.getElementById("request")
    if (!hero || !req) return
    let past = false, atReq = false
    const io = new IntersectionObserver(es => {
      for (const e of es) { if (e.target === hero) past = !e.isIntersecting; if (e.target === req) atReq = e.isIntersecting }
      setShow(past && !atReq)
      document.documentElement.dataset.dock = String(past && !atReq)
    }, { threshold: 0 })
    io.observe(hero); io.observe(req)
    return () => io.disconnect()
  }, [])
  return (
    <div className="dock" data-show={show} aria-hidden={!show}>
      <a href="#request" className="btn" tabIndex={show ? 0 : -1}>Start a website request</a>
      <a href={TEL} className="dock__tel" aria-label={`Call Freeport ${PHONE}`} tabIndex={show ? 0 : -1}>Call</a>
    </div>
  )
}

function Home() {
  const started = useRef(false)
  useEffect(() => {
    if (started.current || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    started.current = true
    const lenis = new Lenis({ duration: 1.05 })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#request">Skip to the website request</a>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Story />
        <Offices />
        <Steps />
        <Request />
      </main>
      <Footer />
      <Dock />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
