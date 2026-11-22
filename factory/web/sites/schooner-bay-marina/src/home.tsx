import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Page, mount, IMG, HM, HM_TEL, EMAIL, MAIN, MAIN_TEL, SALES, SALES_TEL, HANDOUT } from "./site"
import { Tool, Chart, START, verdict, type Trip } from "./tool"

const reveal = [0.77, 0, 0.175, 1] as const
type Tab = "slip" | "fuel" | "stay"

function Hero({ t, set, onRequest, pulse }: { t: Trip; set: (p: Partial<Trip>) => void; onRequest: () => void; pulse: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle("off", !e.isIntersecting))
    io.observe(el); return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.figure className="pano" initial={reduce ? false : { clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ duration: 1.3, ease: reveal }}>
        <img src={IMG.pano} alt="The protected harbour basin at Schooner Bay, Great Abaco" width={1600} height={480} fetchPriority="high" />
        <figcaption className="tnum">N 26° 09.529′ W 077° 10.633′</figcaption>
      </motion.figure>
      <div className="wrap panel">
        <div className="intro">
          <h1 id="hero-title" className="display">Can I come&nbsp;in?</h1>
          <p className="lede">A protected harbour on Great Abaco&rsquo;s south-east shore, the closest marina to Hole in the Wall. Tell the Harbour Master your boat and your dates.</p>
          <p className="hours">Harbour Master Albert Russel, daily 7:30am to 4:30pm. <span className="tnum">VHF 16, working 77.</span> &ldquo;Request a slip&rdquo; opens an email with your boat already written in.</p>
        </div>
        <Tool t={t} set={set} onRequest={onRequest} />
        <div className="mini"><Chart crop pulse={pulse} /><p className="cap-s">Simplified chart. Not for navigation.</p></div>
      </div>
    </section>
  )
}

function Why() {
  const [mode, setMode] = useState<"sea" | "air">("sea")
  return (
    <section id="why" className="why" aria-labelledby="why-title">
      <div className="wrap why-grid">
        <div className="why-chart"><Chart /><p className="cap-s">Outlines simplified from Natural Earth. The route is illustrative. Not for navigation.</p></div>
        <div className="why-text">
          <h2 id="why-title" className="h2">The closest marina to Hole in the&nbsp;Wall.</h2>
          <dl className="facts">
            <div><dt>The grounds</dt><dd>&ldquo;The closest marina to the famed Hole in the Wall sport fishing grounds.&rdquo;</dd></div>
            <div><dt>The basin</dt><dd>A protected harbour basin on the cruising route from the Abaco Cays to Nassau.</dd></div>
            <div><dt>The harbour</dt><dd>Not a conventional marina: a working, living harbour at the centre of a non-gated village, open to visitors by land and by sea.</dd></div>
          </dl>
          <div className="seg" role="tablist" aria-label="Arriving">
            <button role="tab" aria-selected={mode === "sea"} onClick={() => setMode("sea")}>By sea</button>
            <button role="tab" aria-selected={mode === "air"} onClick={() => setMode("air")}>By air</button>
          </div>
          {mode === "sea"
            ? <p className="arrive tnum">Published position N 26° 09.529′, W 077° 10.633′. Call on VHF 16, working channel 77, and the Harbour Master will bring you in.</p>
            : <p className="arrive">Sandy Point airstrip (MYAS) is about 20 minutes away. Marsh Harbour is about a 30-minute ride. The marina helps with local transport.</p>}
        </div>
      </div>
    </section>
  )
}

const NUMBERS: [string, string][] = [
  ["Length overall", "To 80 ft"], ["Draft", "8 ft at mean low water"], ["Dockage", "$3.00 per ft per day, varies with length of stay"],
  ["Weekly and monthly", "Quoted by the marina"], ["Fuel", "Diesel and gas at market rates, call ahead"], ["Power", "30 and 50 amp"],
  ["On the dock", "Wi-Fi, restrooms, showers"], ["Radio", "VHF 16, working 77"], ["Hours", "Daily 7:30am to 4:30pm"], ["Harbour Master", "Albert Russel"],
]

function Numbers() {
  return (
    <section id="numbers" className="wrap numbers" aria-labelledby="num-title">
      <h2 id="num-title" className="h2">The harbour, in numbers.</h2>
      <dl className="table">
        {NUMBERS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="tnum">{v}</dd></div>)}
      </dl>
      <p className="note">The marina page lists vessels to 80 ft; the Abaco page lists 70 ft. Confirm with the Harbour Master for boats over 70 ft. <a className="ul" href={HANDOUT}>The marina handout (PDF)</a></p>
    </section>
  )
}

function Ashore() {
  const list = ["The General Store: ice, marine supplies, snacks", "Laundry delivery", "Bait and tackle", "Golf carts and help with local transport", "Pet friendly", "Blackfly Lodge, in the village"]
  return (
    <section className="ashore" aria-labelledby="ashore-title">
      <figure className="band"><img src={IMG.community} alt="The Schooner Bay village around its harbour" width={1200} height={900} loading="lazy" decoding="async" /><figcaption>The village around the harbour, Schooner Bay</figcaption></figure>
      <div className="wrap ashore-grid">
        <img className="a1" src={IMG.amenities} alt="Harbour amenities at Schooner Bay" width={1600} height={1067} loading="lazy" decoding="async" />
        <div className="ashore-text">
          <h2 id="ashore-title" className="h2">Step off, and the village is&nbsp;there.</h2>
          <ul className="ticks">{list.map(l => <li key={l}>{l}</li>)}</ul>
        </div>
        <img className="a2" src={IMG.village} alt="The harbour village at Schooner Bay" width={1200} height={800} loading="lazy" decoding="async" />
      </div>
    </section>
  )
}

const STEPS = [
  ["Explore your options", "Talk through whether a getaway or retirement home at Schooner Bay fits you and your family."],
  ["Book a Discovery Stay", "Three nights and four days hosted in the village: see the homes, walk the community, choose your excursions."],
  ["Select and purchase", "The team walks you through choosing and closing on your home."],
]

function Live({ onStay }: { onStay: () => void }) {
  return (
    <section id="live" className="live" aria-labelledby="live-title">
      <div className="wrap live-grid">
        <img src={IMG.villa} alt="A Schooner Bay villa" width={1200} height={800} loading="lazy" decoding="async" />
        <div>
          <h2 id="live-title" className="h2">Come for a Discovery&nbsp;Stay.</h2>
          <p className="lede-s">Three nights and four days, hosted, for anyone thinking of a getaway or retirement home here. Residents also have covered, secured storage for their boats.</p>
          <ol className="steps">{STEPS.map(([h, d], i) => <li key={h}><span className="tnum">{i + 1}</span><div><h3>{h}</h3><p>{d}</p></div></li>)}</ol>
          <div className="btns">
            <button type="button" className="btn btn-harbour" onClick={onStay}>Book a Discovery Stay</button>
            <a className="btn btn-line tnum" href={SALES_TEL}>Sales, June Russell {SALES}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Request({ t, tab, setTab }: { t: Trip; tab: Tab; setTab: (t: Tab) => void }) {
  const [f, setF] = useState({ boat: "", name: "", contact: "", gallons: "", party: "2", when: "", note: "" })
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value })
  const v = verdict(t)
  const lines: Record<Tab, string[]> = {
    slip: [`Vessel: ${f.boat}`, `Length overall: ${t.loa} ft`, `Draft: ${t.draft} ft`, `Arriving: ${t.date || "to confirm"}`, `Nights: ${t.nights}`, `Power: ${t.power || "none"}`, `Fuel: ${t.fuel || "none"}`, v.ok ? `Estimate from the site: $${v.est.toLocaleString("en-US")} at the daily rate, before power and fuel` : ""],
    fuel: [`Vessel: ${f.boat}`, `Fuel: ${t.fuel || "diesel or gas"}`, `Approx. gallons: ${f.gallons}`, `Arriving: ${t.date || "to confirm"}`],
    stay: [`Party: ${f.party}`, `Preferred dates: ${f.when}`],
  }
  const subj = { slip: `Slip request: ${f.boat || "vessel"} ${t.loa} ft${t.date ? ", " + t.date : ""}`, fuel: `Fuel request: ${f.boat || "vessel"}`, stay: "Discovery Stay enquiry, for June Russell, Sales" }[tab]
  const to = EMAIL
  const body = `Hello,\n\n${lines[tab].filter(Boolean).join("\n")}\n${f.note ? "\n" + f.note + "\n" : ""}\nName: ${f.name}\nPhone or email: ${f.contact}\n`
  const ok = f.name.trim() && f.contact.trim()
  return (
    <section id="request" className="request" aria-labelledby="req-title">
      <div className="wrap req-grid">
        <div>
          <h2 id="req-title" className="h2">Send it to the harbour.</h2>
          <div className="tabs" role="tablist" aria-label="Request type">
            {([["slip", "A slip"], ["fuel", "Fuel"], ["stay", "Discovery Stay"]] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>)}
          </div>
          <form className="form" onSubmit={e => { e.preventDefault(); if (ok) location.href = `mailto:${to}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}` }}>
            {tab !== "stay" && <label className="field"><span>Vessel name</span><input value={f.boat} onChange={set("boat")} /></label>}
            {tab === "fuel" && <label className="field"><span>Approx. gallons</span><input inputMode="numeric" value={f.gallons} onChange={set("gallons")} /></label>}
            {tab === "stay" && <><label className="field"><span>How many of you</span><input inputMode="numeric" value={f.party} onChange={set("party")} /></label><label className="field"><span>Dates you have in mind</span><input value={f.when} onChange={set("when")} /></label></>}
            <label className="field"><span>Your name</span><input required autoComplete="name" value={f.name} onChange={set("name")} /></label>
            <label className="field"><span>Phone or email</span><input required value={f.contact} onChange={set("contact")} /></label>
            <label className="field full"><span>Anything else</span><textarea value={f.note} onChange={set("note")} /></label>
            {tab === "slip" && <p className="sum full tnum">{t.loa} ft, {t.draft} ft draft, {t.nights} night{t.nights > 1 ? "s" : ""}{t.date ? `, from ${t.date}` : ""}{t.power ? `, ${t.power}` : ""}{t.fuel ? `, ${t.fuel.toLowerCase()}` : ""}. Change these above.</p>}
            <div className="full btns"><button className="btn btn-harbour" type="submit" aria-disabled={!ok}>{tab === "stay" ? "Send the enquiry" : "Send to the Harbour Master"}</button><span className="hint">{ok ? "Opens your email with everything filled in." : "Add your name and a phone or email."}</span></div>
          </form>
        </div>
        <aside className="who" aria-label="Who answers">
          <div><p className="lab">Harbour Master, direct</p><a className="big tnum" href={HM_TEL}>{HM}</a><a className="ul" href={`mailto:${EMAIL}`}>{EMAIL}</a><p>VHF 16, working 77. Daily 7:30am to 4:30pm.</p></div>
          <div><p className="lab">Village main line</p><a className="big tnum" href={MAIN_TEL}>{MAIN}</a><p>General enquiries.</p></div>
          <div><p className="lab">Sales, June Russell</p><a className="big tnum" href={SALES_TEL}>{SALES}</a><p>Homes and Discovery Stays.</p></div>
        </aside>
      </div>
    </section>
  )
}

function Home() {
  const [t, setT] = useState<Trip>(START)
  const [tab, setTab] = useState<Tab>("slip")
  const [pulse, setPulse] = useState(0)
  const set = (p: Partial<Trip>) => setT(prev => { const n = { ...prev, ...p }; if (verdict(n).ok !== verdict(prev).ok) setPulse(x => x + 1); return n })
  const go = (k: Tab) => { setTab(k); document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" }) }
  return (
    <Page current="Home">
      <Hero t={t} set={set} onRequest={() => go("slip")} pulse={pulse} />
      <Why />
      <Numbers />
      <Ashore />
      <Live onStay={() => go("stay")} />
      <Request t={t} tab={tab} setTab={setTab} />
    </Page>
  )
}

mount(<Home />)
