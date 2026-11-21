import { StrictMode, useEffect, useMemo, useState } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import { EMAIL, ITEMS, MAP, NEEDS, P, PHONE, TEL, WHERE, waLink, type Item } from "./data"
import "./styles.css"

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

function Bar() {
  return (
    <header className="bar">
      <a href="#top" className="bar__name"><b>Cover Up</b><span>Island Marine Covering Ltd</span></a>
      <nav className="bar__nav" aria-label="Sections">
        <a href="#workshop">Workshop</a>
        <a href="#family">Since 1992</a>
        <a href="#measure">Get a measure</a>
      </nav>
      <a className="bar__tel num" href={TEL}>{PHONE}</a>
    </header>
  )
}

function Index({ active }: { active: string }) {
  const dept = (d: Item["dept"], label: string) => (
    <div className="idx__dept">
      <p className="idx__label">{label}</p>
      <ul>
        {ITEMS.filter(i => i.dept === d).map(i => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} onClick={e => { e.preventDefault(); go(i.id) }}>{i.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <nav className="idx" aria-label="What we make">
      {dept("house", "For the house")}
      {dept("boat", "For the boat")}
    </nav>
  )
}

function Chips({ active }: { active: string }) {
  return (
    <nav className="chips" aria-label="What we make">
      {ITEMS.map(i => (
        <a key={i.id} href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} onClick={e => { e.preventDefault(); go(i.id) }}>{i.name}</a>
      ))}
    </nav>
  )
}

function Row({ item, first }: { item: Item; first: boolean }) {
  const ph = item.photo
  return (
    <article className={`row${ph ? "" : " row--type"}`} id={item.id} data-row>
      {ph && (
        <figure className="row__photo" style={{ maxWidth: ph.w, aspectRatio: `${ph.w} / ${ph.h}` }}>
          <img src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} loading={first ? "eager" : "lazy"} fetchPriority={first ? "high" : "auto"} decoding="async" />
        </figure>
      )}
      <div className="row__text">
        <h2 className="row__name">{item.name}</h2>
        <p className="row__line">{item.line}</p>
        {!ph && <p className="row__spec">{item.facts[0]}</p>}
        <ul className="row__facts">{(ph ? item.facts : item.facts.slice(1)).map(f => <li key={f}>{f}</li>)}</ul>
        <a className="link" href={waLink(`Hello Cover Up, I'd like a measure for ${item.name.toLowerCase()}. `)}>Ask for a measure on WhatsApp</a>
      </div>
    </article>
  )
}

function Catalogue() {
  const [active, setActive] = useState(ITEMS[0].id)
  useEffect(() => {
    const rows = [...document.querySelectorAll<HTMLElement>("[data-row]")]
    const io = new IntersectionObserver(es => {
      const vis = es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (vis[0]) setActive(vis[0].target.id)
    }, { rootMargin: "-35% 0px -55% 0px" })
    rows.forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [])
  return (
    <section className="cat" id="top" aria-labelledby="title">
      <aside className="cat__side">
        <div className="cat__sticky">
          <h1 id="title" className="cat__title">Shade and shelter, cut and sewn in Nassau.</h1>
          <p className="cat__lede">Awnings for the house, tops and upholstery for the boat. Measured on site, made at our workshop in the Airport Industrial Park.</p>
          <div className="cat__act">
            <a className="btn" href={waLink("Hello Cover Up, I'd like a measure. Here is a photo of the job: ")}>WhatsApp a photo for a measure</a>
            <a className="link num" href={TEL}>Call {PHONE}</a>
          </div>
        </div>
        <div className="cat__pin">
          <Index active={active} />
          <a className="btn btn--small" href={waLink("Hello Cover Up, I'd like a measure. Here is a photo of the job: ")}>WhatsApp for a measure</a>
        </div>
      </aside>
      <Chips active={active} />
      <div className="cat__rows">
        {ITEMS.map((it, i) => (
          <div key={it.id}>
            {(i === 0 || ITEMS[i - 1].dept !== it.dept) && <p className="cat__dept" aria-hidden="true">{it.dept === "house" ? "For the house" : "For the boat"}</p>}
            <Row item={it} first={i === 0} />
          </div>
        ))}
      </div>
    </section>
  )
}

function Workshop() {
  const strip = [
    [P.cutting, "Patterns cut on the long table"],
    [P.sewing, "Sewn by hand at the machine"],
    [P.seat, "A finished helm seat"],
  ] as const
  return (
    <section className="shop" id="workshop" aria-labelledby="shop-title">
      <div className="shop__head">
        <h2 id="shop-title" className="h2">Every job is made at Raphia Close.</h2>
        <p>Our products are 100% made in the Bahamas. Come to the workshop in the Airport Industrial Park to see the canvas and vinyl colours before you choose.</p>
      </div>
      <ul className="shop__strip">
        {strip.map(([ph, cap]) => (
          <li key={cap}>
            <img src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} loading="lazy" decoding="async" />
            <span>{cap}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Family() {
  return (
    <section className="fam" id="family" aria-labelledby="fam-title">
      <figure className="fam__photo">
        <img src={P.workshop.src} alt={P.workshop.alt} width={P.workshop.w} height={P.workshop.h} loading="lazy" decoding="async" />
        <figcaption>The workshop today, Raphia Close, Airport Industrial Park.</figcaption>
      </figure>
      <div className="fam__text">
        <p className="fam__year num" aria-hidden="true">1992</p>
        <h2 id="fam-title" className="h2">One sewing machine and one roll of canvas, in an old cottage in Montagu village.</h2>
        <p>That is how Island Marine Covering began in 1992. The trade came from the family: Henry Nixon founded Nixon's Upholstery Services and, with his wife Viola, upholstered for Nassau hotels including The Montague, The British Colonial and The Royal Victorian.</p>
        <p>The family's work reached Abaco with Kirk Nixon. Today the company trades as Cover Up and still goes to awning and marine canvas seminars in North and South America to keep learning the craft.</p>
      </div>
    </section>
  )
}

function Measure() {
  const [need, setNeed] = useState(NEEDS[0])
  const [where, setWhere] = useState(WHERE[0])
  const [area, setArea] = useState("")
  const msg = useMemo(() => `Hello Cover Up, I'd like a measure for ${need.toLowerCase()} for ${where.toLowerCase()}${area.trim() ? ` in ${area.trim()}` : ""}. I'll send a photo of the space.`, [need, where, area])
  return (
    <section className="msr" id="measure" aria-labelledby="msr-title">
      <div className="msr__form">
        <h2 id="msr-title" className="h2">Send us a photo. We come to measure.</h2>
        <label><span>What do you need?</span>
          <select value={need} onChange={e => setNeed(e.target.value)}>{NEEDS.map(n => <option key={n}>{n}</option>)}</select>
        </label>
        <fieldset>
          <legend>For</legend>
          <div className="seg">{WHERE.map(w => <button key={w} type="button" aria-pressed={where === w} onClick={() => setWhere(w)}>{w}</button>)}</div>
        </fieldset>
        <label><span>Where in the Bahamas (optional)</span><input value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. Lyford Cay, Nassau Harbour, Abaco" /></label>
      </div>
      <div className="msr__out">
        <p className="msr__msg">{msg}</p>
        <a className="btn btn--sun" href={waLink(msg)}>Send on WhatsApp</a>
        <div className="msr__alt">
          <a className="link num" href={TEL}>Call {PHONE}</a>
          <a className="link" href={`mailto:${EMAIL}?subject=${encodeURIComponent("Measure request")}&body=${encodeURIComponent(msg)}`}>{EMAIL}</a>
        </div>
        <p className="msr__visit">Raphia Close, Suite 13/14, Airport Industrial Park, P.O. Box SP 62402, Nassau. <a className="link" href={MAP} rel="noopener">Map</a></p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <p className="foot__name"><b>Cover Up</b> Island Marine Covering Ltd</p>
      <p>Raphia Close, Suite 13/14, Airport Industrial Park, Nassau. <a href={TEL} className="num">{PHONE}</a></p>
      <p className="foot__fine">All photographs are Cover Up's own work, from coverupbahamas.com.</p>
    </footer>
  )
}

function Home() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.05 })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <a className="skip" href="#measure">Skip to get a measure</a>
      <Bar />
      <main>
        <Catalogue />
        <Workshop />
        <Family />
        <Measure />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><Home /></StrictMode>)
