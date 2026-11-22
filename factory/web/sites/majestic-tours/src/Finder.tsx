import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Phone, X, ArrowUpRight } from "lucide-react"
import { PIC, DRY, EMAIL, FACTS, LEN, LEN_LABEL, PHONE, PLACE_NAME, TEL, TOURS, WHAT, whatOf, tourUrl, type Len, type Place, type Tour, type What } from "./data"
import { Img, NAV, Wordmark } from "./ui"
import MAP from "./map.json"

const EASE = [0.16, 1, 0.3, 1] as const
/** Pins projected from real coordinates with the same Mercator as the OpenStreetMap coastline. */
const PIN: Record<Place, [number, number]> = { harbour: [312, 392], land: [262, 420], lagoon: [367, 361], rose: [421, 386], reefs: [170, 460], exuma: [484, 478], harbourisland: [484, 322] }
/** Exuma and Harbour Island lie beyond the frame: drawn as edge markers pointing the way. */
const EDGE = new Set<Place>(["exuma", "harbourisland"])
const LABEL: Record<Place, { t: string; dx: number; dy: number; a?: "end" | "start" | "middle" }> = {
  harbour: { t: "Nassau Harbour", dx: 0, dy: -13, a: "middle" },
  land: { t: "On the island", dx: 0, dy: 20, a: "middle" },
  lagoon: { t: "Blue Lagoon Island", dx: 0, dy: -13, a: "middle" },
  rose: { t: "Rose Island", dx: 13, dy: 3, a: "start" },
  reefs: { t: "Southwest reefs", dx: 0, dy: 20, a: "middle" },
  exuma: { t: "To the Exuma Cays, 38 nm, 55 min \u2198", dx: -13, dy: 3, a: "end" },
  harbourisland: { t: "To Harbour Island \u2197", dx: -13, dy: 3, a: "end" },
}
const LENS: { id: Len | "any"; label: string }[] = [{ id: "any", label: "Any length" }, { id: "half", label: "Half day" }, { id: "full", label: "Full day" }, { id: "evening", label: "Evening" }]
const isoToday = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={on} onClick={onClick} className={`chip ${on ? "is-on" : ""}`}>{children}</button>
}

function NassauMap({ lit, focus, place, onPin }: { lit: Map<Place, number>; focus: Place | null; place: Place | null; onPin: (p: Place) => void }) {
  const reduce = useReducedMotion()
  return (
    <svg className="map-svg" viewBox="120 300 380 200" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Map of the Nassau waters: where the matching trips go">
      <path d={(MAP as { d: string }).d} className="map-land" />
      <path d={`M${PIN.harbour[0]} ${PIN.harbour[1]} Q 420 430 ${PIN.exuma[0] - 8} ${PIN.exuma[1] - 2}`} className="map-route" />
      {(Object.keys(PIN) as Place[]).map(p => {
        const n = lit.get(p) ?? 0, on = n > 0, [x, y] = PIN[p], L = LABEL[p], sel = place === p
        return (
          <g key={p} className={`pin ${on ? "is-lit" : ""} ${focus === p ? "is-focus" : ""} ${sel ? "is-sel" : ""}`}>
            <motion.circle cx={x} cy={y} r={15} className="pin-ring" initial={false} animate={{ scale: focus === p || sel ? 1 : 0.4, opacity: focus === p || sel ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.25, ease: EASE }} style={{ transformOrigin: `${x}px ${y}px` }} />
            <motion.circle cx={x} cy={y} r={EDGE.has(p) ? 8.5 : 8} className={`pin-dot ${EDGE.has(p) ? "is-edge" : ""}`} initial={false} animate={{ scale: on ? 1 : 0.55 }} transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} style={{ transformOrigin: `${x}px ${y}px` }} />
            {on && <text x={x} y={y + 2.9} textAnchor="middle" className="pin-n">{n}</text>}
            <text x={x + L.dx} y={y + L.dy} textAnchor={L.a} className="pin-l">{L.t}</text>
            <circle cx={x} cy={y} r={13} className="pin-hit" role="button" tabIndex={0} aria-label={`${L.t}: ${n} trip${n === 1 ? "" : "s"}${sel ? ", selected" : ""}`} aria-pressed={sel}
              onClick={() => onPin(p)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPin(p) } }} />
          </g>
        )
      })}
    </svg>
  )
}

function Card({ t, onAsk, onFocus }: { t: Tour; onAsk: (t: Tour) => void; onFocus: (p: Place | null) => void }) {
  const len = LEN[t.id]
  return (
    <div className="card" onMouseEnter={() => onFocus(t.place)} onMouseLeave={() => onFocus(null)} onFocusCapture={() => onFocus(t.place)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) onFocus(null) }}>
      <div className="card-pic"><img src={t.img} alt={t.alt} width={232} height={150} loading="lazy" decoding="async" /></div>
      <p className="card-place">{PLACE_NAME[t.place]}{len ? <> · {LEN_LABEL[len]}</> : null}</p>
      <h3 className="card-name">{t.name}</h3>
      <p className={`card-fact tnum ${FACTS[t.id] ? "is-facts" : ""}`}>{FACTS[t.id] ?? (len ? t.line : "Length and price on the tour page")}</p>
      <div className="card-acts">
        <button type="button" className="card-ask" onClick={() => onAsk(t)}>Ask about this trip</button>
        <a href={tourUrl(t.id)} target="_blank" rel="noopener" className="card-link" aria-label={`${t.name}, tour page`}>Tour page<ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden /></a>
      </div>
    </div>
  )
}

type Ask = { kind: "trip"; tour: Tour } | { kind: "transfer"; type: string } | { kind: "any" }

function Sheet({ ask, onClose }: { ask: Ask | null; onClose: () => void }) {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  useEffect(() => {
    if (!ask) return
    setSent(false)
    const prev = document.activeElement as HTMLElement | null
    setTimeout(() => box.current?.querySelector<HTMLElement>("#sheet-h")?.focus(), 60)
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "Tab" && box.current) {
        const f = [...box.current.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea")]
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener("keydown", key)
    return () => { window.removeEventListener("keydown", key); prev?.focus() }
  }, [ask, onClose])
  const title = ask?.kind === "trip" ? ask.tour.name : ask?.kind === "any" ? "Plan my excursion" : `Airport transfer, ${ask?.kind === "transfer" ? ask.type.toLowerCase() : ""}`
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget
    if (!f.checkValidity()) return
    e.preventDefault()
    const fd = new FormData(f)
    const lines = ["Hello Majestic Tours,", "", ask?.kind === "trip" ? `I would like to ask about: ${ask.tour.name}` : ask?.kind === "any" ? "Please suggest an excursion for us." : `I would like a quote for an airport transfer (${ask?.kind === "transfer" ? ask.type : ""}).`, ""]
    fd.forEach((v, k) => { const s = String(v).trim(); if (s) lines.push(`${k}: ${s}`) })
    lines.push("", "Sent from the Majestic Tours website.")
    const subj = `${ask?.kind === "transfer" ? "Airport transfer" : "Excursion enquiry"}: ${ask?.kind === "trip" ? ask.tour.name : ask?.kind === "transfer" ? ask.type : "not sure yet"}${fd.get("Date") ? ", " + fd.get("Date") : ""}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(lines.join("\n"))}`
    setSent(true)
  }
  return (
    <AnimatePresence>
      {ask && (
        <motion.div className="sheet-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
          <motion.div ref={box} role="dialog" aria-modal="true" aria-labelledby="sheet-h" className="sheet"
            initial={reduce ? false : { x: "8%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={reduce ? undefined : { x: "8%", opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
            <div className="sheet-top">
              <p className="sheet-k">{ask.kind === "trip" ? PLACE_NAME[ask.tour.place] : ask.kind === "any" ? "Tell us the day; an agent suggests the trip" : "Meet and greet after Customs"}</p>
              <button type="button" className="sheet-x" onClick={onClose} aria-label="Close"><X className="size-5" strokeWidth={1.5} aria-hidden /></button>
            </div>
            <h2 id="sheet-h" className="sheet-h" tabIndex={-1}>{title}</h2>
            {ask.kind === "trip" && FACTS[ask.tour.id] && <p className="sheet-fact tnum">{FACTS[ask.tour.id]}</p>}
            <form className="sheet-form" onSubmit={submit}>
              {ask.kind === "any" && <label><span className="field-label">What you have in mind</span><input name="Ideas" className="field-input" placeholder="Animals, a beach, an evening sail..." /></label>}
              {ask.kind === "transfer" && <label><span className="field-label">Arrival flight</span><input name="Flight" className="field-input" placeholder="Airline and flight number" /></label>}
              <label><span className="field-label">{ask.kind === "trip" ? "Date" : "Arrival date"}</span><input name="Date" type="date" min={isoToday()} className="field-input tnum" required /></label>
              <div className="sheet-two">
                <label><span className="field-label">Adults</span><input name="Adults" type="number" min="1" defaultValue="2" className="field-input tnum" /></label>
                <label><span className="field-label">Children</span><input name="Children" type="number" min="0" defaultValue="0" className="field-input tnum" /></label>
              </div>
              <label><span className="field-label">{ask.kind === "trip" ? "Staying at (hotel or ship)" : "Hotel"}</span><input name="Staying at" className="field-input" autoComplete="off" /></label>
              <label><span className="field-label">Your name</span><input name="Name" className="field-input" autoComplete="name" required /></label>
              <button type="submit" className="btn w-full">Send to Majestic</button>
              <p className="sheet-note" aria-live="polite">{sent ? "Your email app opened with the request filled in." : `Opens your email, addressed to ${EMAIL}. Or call `}{!sent && <a href={TEL} className="tnum">{PHONE}</a>}{!sent && "."}</p>
              {ask.kind === "trip" && <a href={tourUrl(ask.tour.id)} target="_blank" rel="noopener" className="link text-cap">Read the full tour page<ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden /></a>}
              {ask.kind === "transfer" && ask.type === "Accessible" && <p className="sheet-note">The accessible van must be arranged at least 48 hours ahead.</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const TRANSFER = [
  { id: "Shared", line: "A shuttle bus with three or four hotel stops." },
  { id: "Private", line: "Town car, SUV or limousine, just your party." },
  { id: "Accessible", line: "The only accessible private transport on the island. Book 48 hours ahead." },
]

export function Finder() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState<"trips" | "transfer">("trips")
  const [what, setWhat] = useState<What>("all")
  const [len, setLen] = useState<Len | "any">("any")
  const [dry, setDry] = useState(false)
  const [place, setPlace] = useState<Place | null>(null)
  const [focus, setFocus] = useState<Place | null>(null)
  const [ask, setAsk] = useState<Ask | null>(null)
  const [ttype, setTtype] = useState("Shared")
  useEffect(() => {
    const h = () => { if (location.hash === "#ask") { setAsk({ kind: "any" }); history.replaceState(null, "", location.pathname + location.search) } }
    h(); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h)
  }, [])
  const rail = useRef<HTMLUListElement>(null)

  const base = useMemo(() => TOURS.filter(t => (what === "all" || whatOf(t) === what) && (len === "any" || LEN[t.id] === len) && (!dry || DRY.has(t.id))), [what, len, dry])
  const shown = useMemo(() => {
    const list = place ? base.filter(t => t.place === place) : base
    // published prices first, then stated lengths, so the most informative cards lead
    return [...list].sort((a, b) => (FACTS[b.id] ? 2 : LEN[b.id] ? 1 : 0) - (FACTS[a.id] ? 2 : LEN[a.id] ? 1 : 0))
  }, [base, place])
  const lit = useMemo(() => { const m = new Map<Place, number>(); base.forEach(t => m.set(t.place, (m.get(t.place) ?? 0) + 1)); return m }, [base])
  useEffect(() => { rail.current?.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" }) }, [shown, reduce])
  useEffect(() => { if (place && !lit.get(place)) setPlace(null) }, [lit, place])
  const clear = () => { setWhat("all"); setLen("any"); setDry(false); setPlace(null) }

  return (
    <section className="finder" aria-labelledby="h1">
      <header className="fh">
        <Wordmark />
        <nav aria-label="Main" className="fh-nav">{NAV.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
        <a href={TEL} className="fh-tel tnum"><Phone className="size-4" strokeWidth={1.5} aria-hidden /><span>{PHONE}</span></a>
      </header>
      <div className="fgrid">
        <div className="fleft">
          <motion.p className="fcap" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>Nassau and Paradise Island · a Bahamian family company since June 1959</motion.p>
          <motion.h1 id="h1" className="display fh1" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>Out of Nassau.</motion.h1>
          <figure className="fphoto fphoto-phone"><Img pic={PIC.flyingCloud} className="w-full" eager /><figcaption>The Flying Cloud leaving Nassau Harbour at sunset.</figcaption></figure>
          <div className="ftabs" role="tablist" aria-label="What you are planning">
            <button role="tab" id="tab-trips" aria-controls="panel" aria-selected={tab === "trips"} tabIndex={tab === "trips" ? 0 : -1} className={tab === "trips" ? "is-on" : ""} onClick={() => setTab("trips")} onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { setTab("transfer"); document.getElementById("tab-transfer")?.focus() } }}>Excursions</button>
            <button role="tab" id="tab-transfer" aria-controls="panel" aria-selected={tab === "transfer"} tabIndex={tab === "transfer" ? 0 : -1} className={tab === "transfer" ? "is-on" : ""} onClick={() => setTab("transfer")} onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { setTab("trips"); document.getElementById("tab-trips")?.focus() } }}>Airport transfer</button>
          </div>
          {tab === "trips" ? (
            <div className="filters" role="tabpanel" id="panel" aria-labelledby="tab-trips">
              <fieldset><legend>What</legend><div className="chips">{WHAT.map(w => <Chip key={w.id} on={what === w.id} onClick={() => setWhat(w.id)}>{w.label}</Chip>)}</div></fieldset>
              <fieldset><legend>How long</legend><div className="chips">{LENS.map(l => <Chip key={l.id} on={len === l.id} onClick={() => setLen(l.id)}>{l.label}</Chip>)}</div></fieldset>
              <label className="dry"><input type="checkbox" checked={dry} onChange={e => setDry(e.target.checked)} /><span className="dry-sw" aria-hidden /><span>Stays on deck or on land</span></label>
              <div className="frow">
              <p className="fcount tnum" aria-live="polite">
                {shown.length ? <><strong>{shown.length}</strong> {shown.length === 1 ? "trip fits" : "trips fit"}{place ? <> at {PLACE_NAME[place]} <button type="button" className="fclear" onClick={() => setPlace(null)}>show all places</button></> : "."}</> : <>No trip fits all of that. <button type="button" className="fclear" onClick={clear}>Clear the filters</button></>}
              </p>
              <button type="button" className="btn" onClick={() => setAsk({ kind: "any" })}>Plan my excursion</button>
              </div>
            </div>
          ) : (
            <div className="filters" role="tabpanel" id="panel" aria-labelledby="tab-transfer">
              <p className="tlead">Met after Customs at Ground Transportation by a Majestic representative with a sign.</p>
              <div className="ttypes" role="radiogroup" aria-label="Transfer type">
                {TRANSFER.map(t => (
                  <button key={t.id} type="button" role="radio" aria-checked={ttype === t.id} className={`ttype ${ttype === t.id ? "is-on" : ""}`} onClick={() => setTtype(t.id)}>
                    <span className="ttype-n">{t.id}</span><span className="ttype-l">{t.line}</span>
                  </button>
                ))}
              </div>
              <div className="tacts">
                <button type="button" className="btn" onClick={() => setAsk({ kind: "transfer", type: ttype })}>Request a {ttype.toLowerCase()} transfer</button>
                <a href="transfers.html" className="link text-small">How the arrival works</a>
              </div>
            </div>
          )}
          <p className="fcall">Rather talk? <a href={TEL} className="tnum">Call {PHONE}</a>, or find the Majestic desk in your hotel lobby. {tab === "trips" ? "Ask on each trip, or let an agent suggest one." : "Private vans and buses for groups are arranged ahead."}</p>
        </div>
        <div className="fright">
          <div className={`map ${tab === "transfer" ? "is-dim" : ""}`}>
            <NassauMap lit={tab === "trips" ? lit : new Map()} focus={focus} place={place} onPin={p => { setTab("trips"); setPlace(cur => (cur === p ? null : p)) }} />
            <p className="map-credit">Coastline © OpenStreetMap contributors</p>
            <figure className="fphoto fphoto-desk"><Img pic={PIC.flyingCloud} className="w-full" eager maxW={300} /><figcaption>The Flying Cloud leaving the harbour at sunset</figcaption></figure>
          </div>
          {tab === "trips" && (
            <div className="places chips" role="group" aria-label="Where">
              {(Object.keys(PIN) as Place[]).filter(p => lit.get(p)).map(p => (
                <Chip key={p} on={place === p} onClick={() => setPlace(cur => (cur === p ? null : p))}>{LABEL[p].t} <span className="tnum">{lit.get(p)}</span></Chip>
              ))}
            </div>
          )}
          {tab === "trips" && (
            <ul ref={rail} className="rail" aria-label="Matching trips">
              <AnimatePresence initial={false} mode="popLayout">
                {shown.map((t, i) => (
                  <motion.li key={t.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease: EASE, delay: reduce ? 0 : Math.min(i, 6) * 0.03 }}>
                    <Card t={t} onAsk={x => setAsk({ kind: "trip", tour: x })} onFocus={setFocus} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
          {tab === "transfer" && (
            <ol className="tsteps">
              <li><span className="tnum">1</span>Print your voucher before you fly.</li>
              <li><span className="tnum">2</span>After Customs, walk out toward Ground Transportation.</li>
              <li><span className="tnum">3</span>A Majestic representative holds the sign, with your name for private transfers.</li>
              <li><span className="tnum">4</span>Shared buses stop at three or four hotels on the way.</li>
            </ol>
          )}
        </div>
      </div>
      <Sheet ask={ask} onClose={() => setAsk(null)} />
    </section>
  )
}
