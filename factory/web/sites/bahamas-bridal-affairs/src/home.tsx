import { useEffect, useRef, useState } from "react"
import { Footer, TopLine, mount, useReveal, useWheelSmoothing } from "./shell"
import { Card, Fields, Say, WeddingProvider, useSentence, useWedding } from "./compose"
import { IMG, PHONE, PHONE_US, PUBLISHED, TEL, TEL_US, VENUES } from "./content"

function Compose() {
  return (
    <section className="hero" id="compose" aria-labelledby="h1">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 id="h1">Check your wedding date with Dr. Bernadette Burrows.</h1>
          <p className="lead">Weddings in Nassau and on Paradise Island for more than 26 years, with the owner herself at your side. A preferred planner with the One&amp;Only Ocean Club and Atlantis for many years.</p>
          <Fields />
        </div>
        <div className="hero__paper">
          <Card />
          <Say />
        </div>
      </div>
    </section>
  )
}

function Venues() {
  const w = useWedding()
  const real = VENUES.filter(v => v.img)
  const [on, setOn] = useState(real[0].id)
  const [flash, setFlash] = useState("")
  useEffect(() => { if (real.some(v => v.id === w.venue)) setOn(w.venue) }, [w.venue])
  const pick = (id: string) => { setOn(id); w.set({ venue: id }); setFlash(id); setTimeout(() => setFlash(f => (f === id ? "" : f)), 2000) }
  const cur = real.find(v => v.id === on)!
  return (
    <section className="venues" aria-labelledby="venues-h">
      <div className="wrap venues__grid">
        <div className="venues__copy">
          <h2 id="venues-h">The Ocean Club, Atlantis and Lyford Cay, in her own weddings.</h2>
          <ul className="venues__list">
            {real.map(v => (
              <li key={v.id}>
                <button type="button" aria-pressed={on === v.id} onClick={() => pick(v.id)} onMouseEnter={() => setOn(v.id)} onFocus={() => setOn(v.id)}>
                  <span className="venues__name">{v.card}<span className="venues__place">, {v.place}</span></span>
                  <span className="venues__told">{v.told}</span>
                  <span className="venues__set" data-on={flash === v.id} aria-live="polite">{flash === v.id ? "Set on your card" : "Choose for your card"}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <figure className="venues__photo">
          <div className="venues__frame">
            {real.map(v => (
              <img key={v.id} src={v.img} alt={v.alt} width={v.w} height={v.h} loading="lazy" decoding="async" data-on={on === v.id} data-real={v.real} />
            ))}
          </div>
          <figcaption>{cur.credit}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function InPrint() {
  return (
    <section className="print" aria-labelledby="print-h">
      <div className="wrap">
        <h2 id="print-h">Two of her weddings, as the magazines told them.</h2>
        <ol className="print__list">
          {PUBLISHED.map(p => (
            <li className="print__row" key={p.id} data-rise>
              <p className="print__mag"><cite>{p.mag}</cite></p>
              <div className="print__body">
                <p className="cap num">{p.date}</p>
                <h3>{p.title}</h3>
                <p>{p.teaser}</p>
                <p className="print__links">
                  <a href={`weddings.html#${p.id}`}>The story and every credit</a>
                  <a href={p.url} rel="noopener">Read it in {p.mag}</a>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const STEPS = [
  ["First call", "You tell her the date, the guest count and the kind of day you picture. She tells you what is possible."],
  ["The venue", "Choosing the ceremony and reception places, starting from the resorts she knows well."],
  ["Your vendors", "Flowers, cake, music, hair and makeup, stationery and transport, booked and coordinated."],
  ["The day", "She is there, running the timings, so your families can simply be guests."],
]
function Steps() {
  return (
    <section className="steps" aria-labelledby="steps-h">
      <div className="wrap">
        <h2 id="steps-h">How planning with her runs.</h2>
        <ol className="steps__row">
          {STEPS.map(([t, d], i) => (
            <li key={t} data-rise style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="steps__n num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <p className="steps__note">Described in general terms, from the credits of her published weddings. The exact steps and what each package includes are to confirm with Dr. Burrows.</p>
      </div>
    </section>
  )
}

function Planner() {
  return (
    <section className="planner" aria-labelledby="planner-h">
      <div className="wrap planner__grid">
        <div>
          <h2 id="planner-h">Dr. Bernadette Burrows plans every wedding herself.</h2>
          <p className="lead">She owns and runs Bahamas Bridal Affairs from Nassau. Couples get her individual, personal attention, and packages that flex to fit what they ask for.</p>
          <ul className="planner__facts">
            <li><span className="num">26+</span> years planning weddings and events.</li>
            <li>A preferred wedding planner with the One&amp;Only Ocean Club and Atlantis, for many years.</li>
            <li>Credited by name in both magazine features on this page.</li>
            <li>Author of <cite>How to Be Fabulous</cite>.</li>
          </ul>
        </div>
        <figure className="planner__photo">
          <img src={IMG.flowers} alt="White roses, orchids and calla lilies with candles on a wedding table by the sea" width={1632} height={2048} loading="lazy" decoding="async" />
          <figcaption>Illustrative photography, waiting for her own.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Call() {
  const { text, touched } = useSentence()
  return (
    <section className="call" id="call" aria-labelledby="call-h">
      <div className="wrap">
        <h2 id="call-h">Call her about your date.</h2>
        {touched ? <blockquote className="call__quote">{text}</blockquote> : <p className="call__quote call__quote--empty"><a href="#compose">Compose your date first</a>, and your sentence will be waiting here.</p>}
        <div className="call__grid">
          <div>
            <p className="cap">From Nassau</p>
            <a className="call__num num" href={TEL}>{PHONE}</a>
            <a className="btn btn--light num" href={TEL}>Call Nassau</a>
          </div>
          <div>
            <p className="cap">From the US and Canada</p>
            <a className="call__num num" href={TEL_US}>{PHONE_US}</a>
            <a className="btn btn--ghost num" href={TEL_US}>Call the US number</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Phone only: the two calls follow once the composer is off screen, and step aside for the closing call. */
function CallBar() {
  const [show, setShow] = useState(false)
  const seen = useRef(new Set<Element>())
  useEffect(() => {
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? seen.current.add(e.target) : seen.current.delete(e.target)))
      setShow(seen.current.size === 0)
    })
    ;["#compose .say", "#call", ".foot"].forEach(s => { const el = document.querySelector(s); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <div className="callbar" data-show={show} aria-hidden={!show}>
      <a className="btn btn--primary num" href={TEL} tabIndex={show ? 0 : -1}>Call Nassau</a>
      <a className="btn btn--line num" href={TEL_US} tabIndex={show ? 0 : -1}>US and Canada</a>
    </div>
  )
}

function Home() {
  useWheelSmoothing()
  useReveal()
  return (
    <WeddingProvider>
      <a className="skip" href="#compose">Skip to your date</a>
      <TopLine home />
      <main>
        <Compose />
        <Venues />
        <InPrint />
        <Steps />
        <Planner />
        <Call />
      </main>
      <Footer />
      <CallBar />
    </WeddingProvider>
  )
}

mount(<Home />)
