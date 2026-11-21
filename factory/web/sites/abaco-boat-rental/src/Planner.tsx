import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { animate, motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, MessageCircle, Minus, Plus, ChevronDown, Check } from "lucide-react"
import { LAND, ATLANTIC, W, H, proj } from "./map-data"
import { BOOK, PHOTO, wa, ease } from "./site"

/* ---------- facts (abacoboatrental.com, Nov 2026) ---------- */
export const TIERS = [
  { label: "1 day", min: 1, rate: 475 },
  { label: "2 days", min: 2, rate: 450 },
  { label: "3 to 6 days", min: 3, rate: 330 },
  { label: "7+ days", min: 7, rate: 303 },
]
export const rateFor = (d: number) => (d >= 7 ? 303 : d >= 3 ? 330 : d === 2 ? 450 : 475)

type Place = { id: string; name: string; short: string; lat: number; lon: number; fee: 0 | 100 | 300; freeIfReturn?: boolean; ctrl?: [number, number]; lab?: "l" | "r" | "t" | "b" }
export const PLACES: Place[] = [
  { id: "mow", name: "Man-O-War Cay", short: "Man-O-War", lat: 26.590, lon: -77.006, fee: 0, lab: "l" },
  { id: "ht", name: "Hope Town", short: "Hope Town", lat: 26.540, lon: -76.957, fee: 100, ctrl: [26.566, -76.982], lab: "l" },
  { id: "ec", name: "Elbow Cay", short: "Elbow Cay", lat: 26.503, lon: -76.968, fee: 100, freeIfReturn: true, ctrl: [26.545, -76.995], lab: "l" },
  { id: "mh", name: "Marsh Harbour", short: "Marsh Harbour", lat: 26.546, lon: -77.062, fee: 100, freeIfReturn: true, ctrl: [26.578, -77.045], lab: "l" },
  { id: "sc", name: "Scotland Cay", short: "Scotland Cay", lat: 26.637, lon: -77.068, fee: 100, ctrl: [26.618, -77.030], lab: "l" },
  { id: "gc", name: "Great Guana Cay", short: "Guana Cay", lat: 26.664, lon: -77.118, fee: 100, ctrl: [26.628, -77.070], lab: "l" },
  { id: "tc", name: "Treasure Cay", short: "Treasure Cay", lat: 26.668, lon: -77.283, fee: 300, ctrl: [26.618, -77.150], lab: "b" },
  { id: "lh", name: "Little Harbour", short: "Little Harbour", lat: 26.332, lon: -76.998, fee: 300, ctrl: [26.455, -77.040], lab: "r" },
]
/* Places guests say they took the boat (published guest reviews on abacoboatrental.com) */
const DAYS_OUT = [
  { id: "tilloo", name: "Tilloo beach", lat: 26.452, lon: -76.962 },
  { id: "fowl", name: "Fowl Cay", lat: 26.628, lon: -77.035 },
]
export const nm = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const R = 3440.1, r = Math.PI / 180, dLa = (b.lat - a.lat) * r, dLo = (b.lon - a.lon) * r
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLo / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}
export const FEE_COLOR: Record<number, string> = { 0: "#2f5b3a", 100: "#c9a46a", 300: "#6e8f9c" }
const BASE = PLACES[0]
const pt = (p: { lat: number; lon: number }) => proj(p.lat, p.lon)
const routeD = (p: Place) => {
  const [x0, y0] = pt(BASE), [x1, y1] = pt(p)
  const [cx, cy] = p.ctrl ? proj(p.ctrl[0], p.ctrl[1]) : [(x0 + x1) / 2, (y0 + y1) / 2]
  return `M${x0.toFixed(1)},${y0.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`
}

/* ---------- planner state ---------- */
export function usePlan() {
  const [sel, setSel] = useState("ht")
  const [days, setDays] = useState(7)
  const [ret, setRet] = useState(false)
  const [night, setNight] = useState(0)
  const [intro, setIntro] = useState(0)
  const [snorkel, setSnorkel] = useState(0)
  const place = PLACES.find(p => p.id === sel)!
  const rate = rateFor(days)
  const dFee = place.fee === 0 || (place.freeIfReturn && ret) ? 0 : place.fee
  const nightOk = sel === "mow"
  const lines = useMemo(() => {
    const l: [string, number][] = [[`${days} ${days === 1 ? "day" : "days"} × $${rate}`, days * rate]]
    l.push([place.id === "mow" ? "Pickup at Man-O-War Cay" : dFee ? `Delivery and pickup, ${place.name}` : `${place.name}, you run our team member back`, dFee * 2])
    if (nightOk && night) l.push([`A Night Out, ${night} hr`, night * 50])
    if (intro) l.push([`Get Acquainted, ${intro} hr`, intro * 100])
    if (snorkel) l.push([`${snorkel} snorkel ${snorkel === 1 ? "set" : "sets"} × ${days} ${days === 1 ? "day" : "days"}, from $5`, snorkel * 5 * days])
    return l
  }, [days, rate, dFee, place, night, intro, snorkel, nightOk])
  const total = lines.reduce((a, b) => a + b[1], 0)
  const msg = `Hi Abaco Boat Rental! I'd like the 24 ft Key West for ${days} ${days === 1 ? "day" : "days"}, ${place.id === "mow" ? "picking up at Man-O-War Cay" : `delivered to ${place.name}`}${place.freeIfReturn && ret ? " (I'll run your team member back to Man-O-War)" : ""}.${nightOk && night ? ` A Night Out: ${night} hr.` : ""}${intro ? ` Get Acquainted: ${intro} hr.` : ""}${snorkel ? ` Snorkel sets: ${snorkel}.` : ""} My estimate from your site: $${total.toLocaleString("en-US")} before VAT. My dates are: `
  return { sel, setSel, days, setDays, ret, setRet, night, setNight, intro, setIntro, snorkel, setSnorkel, place, rate, dFee, nightOk, lines, total, msg }
}
export type Plan = ReturnType<typeof usePlan>

/* ---------- animated number ---------- */
export function Money({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const c = animate(prev.current, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1], onUpdate: v => { el.textContent = "$" + Math.round(v).toLocaleString("en-US") } })
    prev.current = value
    return () => c.stop()
  }, [value])
  return <span ref={ref} className={`num ${className}`}>${value.toLocaleString("en-US")}</span>
}

/* ---------- the chart ---------- */
export type Box = { x: number; y: number; w: number; h: number }
const bboxOf = (ps: [number, number][], pad: number, minW: number): Box => {
  let x0 = Math.min(...ps.map(p => p[0])), x1 = Math.max(...ps.map(p => p[0])), y0 = Math.min(...ps.map(p => p[1])), y1 = Math.max(...ps.map(p => p[1]))
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
  const w = Math.max(x1 - x0 + pad * 2, minW), h = Math.max(y1 - y0 + pad * 2, minW)
  return { x: cx - w / 2, y: cy - h / 2, w, h }
}
export const PHONE_FOCUS = bboxOf([proj(26.70, -77.15), proj(26.325, -76.93)], 10, 200)
const ALL = bboxOf([...PLACES.map(pt), proj(26.77, -77.32)], 40, 300)

let uid = 0
export function Chart({ plan, inset = 0, insetBottom = 0, focus, interactive = true, showTrips = true, className = "", label }: { plan?: Plan; inset?: number; insetBottom?: number; focus?: Box; interactive?: boolean; showTrips?: boolean; className?: string; label: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const boat = useRef<SVGGElement>(null)
  const route = useRef<SVGPathElement>(null)
  const cam = useRef<Box>({ ...ALL })
  const touched = useRef(false)
  const firstSel = useRef(plan?.sel)
  const sel = plan?.sel
  const place = PLACES.find(p => p.id === sel)

  const fit = (b: Box): Box => {
    const el = wrap.current; if (!el) return b
    const cw = el.clientWidth, ch = el.clientHeight, vw = Math.max(cw - inset, 1), vh = Math.max(ch - insetBottom, 1)
    const s = Math.max(b.w / vw, b.h / vh) // map units per px
    const w = cw * s, h = ch * s
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2
    return { x: cx - (inset * s) - vw * s / 2, y: cy - vh * s / 2, w, h }
  }
  const apply = (b: Box) => {
    const s = svg.current, el = wrap.current; if (!s || !el) return
    s.setAttribute("viewBox", `${b.x.toFixed(2)} ${b.y.toFixed(2)} ${b.w.toFixed(2)} ${b.h.toFixed(2)}`)
    s.style.setProperty("--u", String(b.w / el.clientWidth))
  }
  const target = (): Box => {
    if (!place || !touched.current || place.id === "mow") return focus ?? ALL
    return bboxOf([pt(BASE), pt(place), ...(place.ctrl ? [proj(place.ctrl[0], place.ctrl[1])] : [])], 70, 330)
  }
  useLayoutEffect(() => {
    const go = () => { const b = fit(target()); cam.current = b; apply(b) }
    go()
    const ro = new ResizeObserver(go); if (wrap.current) ro.observe(wrap.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inset, insetBottom, focus])
  useEffect(() => {
    if (sel !== firstSel.current) touched.current = true
    const to = fit(target()), from = { ...cam.current }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { cam.current = to; apply(to); return }
    const c = animate(0, 1, { duration: 1.4, ease: [0.65, 0, 0.35, 1], onUpdate: t => { const b = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t, w: from.w + (to.w - from.w) * t, h: from.h + (to.h - from.h) * t }; cam.current = b; apply(b) } })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel])
  // boat travels the route
  useEffect(() => {
    const p = route.current, g = boat.current; if (!p || !g) return
    const L = p.getTotalLength()
    const put = (t: number) => { const a = p.getPointAtLength(L * t), b2 = p.getPointAtLength(Math.min(L, L * t + 1)); const ang = Math.atan2(b2.y - a.y, b2.x - a.x) * 180 / Math.PI; g.style.transform = `translate(${a.x}px, ${a.y}px) rotate(${L ? ang : 0}deg) scale(var(--u))` }
    if (!L || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { put(1); return }
    const c = animate(0, 1, { duration: 1.6, delay: 0.25, ease: [0.45, 0, 0.2, 1], onUpdate: put })
    return () => c.stop()
  }, [sel])

  const id = useRef(`land${++uid}`).current
  const choose = (id: string) => { touched.current = true; plan?.setSel(id) }
  const [bx, by] = pt(BASE)
  return (
    <div ref={wrap} className={`relative overflow-hidden bg-shallow ${className}`}>
      <svg ref={svg} viewBox={`${ALL.x} ${ALL.y} ${ALL.w} ${ALL.h}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full select-none" role="group" aria-label={label} style={{ ["--u" as string]: 1 }}>
        <defs>
          <radialGradient id="sea" cx="55%" cy="45%" r="75%"><stop offset="0" stopColor="#b5e6da" /><stop offset=".6" stopColor="#9fd8cb" /><stop offset="1" stopColor="#7fc6bd" /></radialGradient>
          <linearGradient id="atl" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stopColor="#2a7c93" /><stop offset=".35" stopColor="#1f5d78" /><stop offset="1" stopColor="#173f57" /></linearGradient>
          <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5" /></filter>
          <path id={id} d={LAND} />
          <filter id="lift" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#0e3b33" floodOpacity=".28" /></filter>
        </defs>
        <rect x="-2000" y="-2000" width="5000" height="5000" fill="url(#sea)" />
        {/* the reef edge: Atlantic beyond the cays, outside the rental area */}
        <path d={ATLANTIC} fill="#5fb0b4" filter="url(#soft)" transform="translate(-6 0)" />
        <path d={ATLANTIC} fill="url(#atl)" />
        {/* sand banks around every cay */}
        <use href={`#${id}`} fill="none" stroke="#e3f6ee" strokeWidth="16" strokeLinejoin="round" opacity=".75" filter="url(#soft)" />
        <use href={`#${id}`} fill="none" stroke="#c7ecdf" strokeWidth="7" strokeLinejoin="round" />
        <use href={`#${id}`} fill="#bccb9b" stroke="#f2e9cc" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" filter="url(#lift)" />
        {/* chart graticule, every 5 minutes */}
        <g stroke="#15261c" strokeOpacity=".12" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {[26.33333, 26.41667, 26.5, 26.58333, 26.66667, 26.75].map(la => { const [, y] = proj(la, -77.4); return <line key={la} x1="-600" x2="1600" y1={y} y2={y} vectorEffect="non-scaling-stroke" /> })}
          {[-77.33333, -77.25, -77.16667, -77.08333, -77.0, -76.91667].map(lo => { const [x] = proj(26.5, lo); return <line key={lo} y1="-600" y2="1600" x1={x} x2={x} vectorEffect="non-scaling-stroke" /> })}
        </g>
        <g fill="#15261c" fillOpacity=".55" className="num" style={{ fontSize: "calc(var(--u) * 10.5px)", letterSpacing: ".06em" }} fontFamily="Figtree, sans-serif">
          {[26.41667, 26.5, 26.58333, 26.66667].map(la => { const [, y] = proj(la, -77.4); const m = Math.round((la % 1) * 60); return <text key={la} x={proj(la, -76.885)[0]} y={y - 4}>26°{m}′N</text> })}
        </g>
        {/* boundary note on the Atlantic */}
        <g style={{ transform: `translate(${proj(26.43, -76.905)[0]}px, ${proj(26.43, -76.905)[1]}px) scale(var(--u))` }} fill="#eaf6f3" fontFamily="Figtree, sans-serif">
          <text fontSize="11" letterSpacing="2.2" fontWeight="600">ATLANTIC</text>
          <text y="15" fontSize="11" fillOpacity=".8">outside the rental area</text>
        </g>
        <g style={{ transform: `translate(${proj(26.6, -77.17)[0]}px, ${proj(26.6, -77.17)[1]}px) scale(var(--u))` }} fill="#15261c" fillOpacity=".5" fontFamily="Bricolage, sans-serif"><text fontSize="13" letterSpacing="5" fontWeight="600">SEA OF ABACO</text></g>

        {/* every delivery route, faint; the chosen one drawn */}
        {PLACES.slice(1).map(p => <path key={p.id} d={routeD(p)} fill="none" stroke="#15261c" strokeOpacity={sel === p.id ? 0 : 0.18} strokeWidth="1.2" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />)}
        {place && place.id !== "mow" && (
          <motion.path key={place.id} ref={route} d={routeD(place)} fill="none" stroke={FEE_COLOR[place.fee]} strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.25, ease: [0.45, 0, 0.2, 1] }} />
        )}
        {(!place || place.id === "mow") && <path ref={route} d={`M${bx},${by} L${bx},${by}`} fill="none" />}

        {/* where a day can take you */}
        {showTrips && DAYS_OUT.map(d => { const [x, y] = pt(d); const n = nm(BASE, d); return (
          <g key={d.id} style={{ transform: `translate(${x}px, ${y}px) scale(var(--u))` }} aria-hidden>
            <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" fill="#f4f1e6" stroke="#15261c" strokeWidth="1.2" />
            <text x="9" y="-6" fontSize="11.5" fontFamily="Figtree, sans-serif" fill="#15261c" fillOpacity=".8" className="num" paintOrder="stroke" stroke="#cdeee3" strokeWidth="3" strokeLinejoin="round">{d.name} · {n.toFixed(0)} nm</text>
          </g>) })}

        {/* delivery points */}
        {PLACES.map(p => {
          const [x, y] = pt(p), on = sel === p.id, base = p.id === "mow"
          const lab = p.lab ?? "r"
          const tx = lab === "l" ? -14 : lab === "r" ? 14 : 0, ty = lab === "b" ? 24 : lab === "t" ? -16 : 5
          const anchor = lab === "l" ? "end" : lab === "r" ? "start" : "middle"
          return (
            <g key={p.id} style={{ transform: `translate(${x}px, ${y}px) scale(var(--u))` }} className={interactive ? "cursor-pointer" : ""}
              {...(interactive ? { role: "button", tabIndex: 0, "aria-pressed": on, "aria-label": `${p.name}: ${p.fee === 0 ? "free pickup" : p.freeIfReturn ? `$${p.fee} each way, or free if you run our team member back` : `$${p.fee} each way`}`, onClick: () => choose(p.id), onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(p.id) } } } : {})}>
              <circle r="22" fill="transparent" />
              {on && <circle r="15" fill={FEE_COLOR[p.fee]} opacity=".25"><animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" /></circle>}
              <circle r={base ? 9 : on ? 8 : 6} fill={base ? "#15261c" : FEE_COLOR[p.fee]} stroke="#f4f1e6" strokeWidth="2.5" />
              {base && <circle r="3" fill="#f4f1e6" />}
              <text x={tx} y={ty} textAnchor={anchor} fontFamily="Figtree, sans-serif" fontSize={on || base ? 15 : 13.5} fontWeight={on || base ? 700 : 600} fill="#15261c" paintOrder="stroke" stroke="#e8f5ef" strokeWidth="4" strokeLinejoin="round">{p.short}{base ? " · our dock" : ""}</text>
              <text x={tx} y={ty + 15} textAnchor={anchor} fontFamily="Figtree, sans-serif" fontSize="11.5" fontWeight="600" fill="#15261c" fillOpacity=".72" paintOrder="stroke" stroke="#e8f5ef" strokeWidth="3.5" className="num">{p.fee === 0 ? "free pickup" : `$${p.fee} each way · ${nm(BASE, p).toFixed(0)} nm`}</text>
            </g>
          )
        })}
        {/* the boat */}
        <g ref={boat} style={{ transform: `translate(${bx}px, ${by}px) scale(var(--u))` }} aria-hidden>
          <path d="M-13,-5.5 L7,-5.5 Q15,-5 17,0 Q15,5 7,5.5 L-13,5.5 Q-15,0 -13,-5.5Z" fill="#fbfaf5" stroke="#15261c" strokeWidth="1.5" />
          <rect x="-4" y="-3" width="6" height="6" rx="1.2" fill="#15261c" />
        </g>
      </svg>
      <div className="glint water-shimmer pointer-events-none absolute -inset-6" aria-hidden />
      <p className="pointer-events-none absolute right-3 bottom-2 text-[11px] tracking-wide text-ink/60 md:right-5 md:bottom-3">Illustration from Natural Earth data, not for navigation</p>
    </div>
  )
}

/* ---------- controls ---------- */
const stepBtn = "flex size-11 items-center justify-center rounded-full border border-ink/20 bg-paper transition duration-200 hover:border-ink active:scale-95 disabled:opacity-30"

export function DayPicker({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  const { days, setDays, rate } = plan
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p id="days-label" className="text-sm font-semibold">How many days?</p>
        <div className="flex items-center gap-2" role="group" aria-labelledby="days-label">
          <button type="button" className={stepBtn} aria-label="One day fewer" disabled={days <= 1} onClick={() => setDays(Math.max(1, days - 1))}><Minus className="size-4" aria-hidden /></button>
          <span className="w-16 text-center font-display text-[1.9rem] leading-none font-semibold num" aria-live="polite">{days}<span className="sr-only"> days</span></span>
          <button type="button" className={stepBtn} aria-label="One day more" disabled={days >= 21} onClick={() => setDays(Math.min(21, days + 1))}><Plus className="size-4" aria-hidden /></button>
        </div>
      </div>
      {/* the rate ladder: the day rate rolls down as days go up */}
      <ol className={`mt-3 grid grid-cols-4 gap-1 ${compact ? "" : ""}`} aria-label="Day rates">
        {TIERS.map(t => {
          const on = t.rate === rate
          return (
            <li key={t.label}>
              <button type="button" onClick={() => setDays(t.min === 7 ? Math.max(7, days) : t.min === 3 ? (days >= 3 && days <= 6 ? days : 3) : t.min)} aria-pressed={on}
                className={`relative w-full overflow-hidden rounded-sm px-2 pt-2 pb-2.5 text-left transition duration-300 ${on ? "bg-ink text-paper" : "bg-ink/[.06] text-ink hover:bg-ink/10"}`}>
                <span className="block text-[11.5px] leading-tight font-medium opacity-80">{t.label}</span>
                <span className="mt-0.5 block font-display text-[1.15rem] leading-none font-semibold num">${t.rate}</span>
                <span className={`absolute inset-x-0 bottom-0 h-[3px] ${on ? "bg-needle" : "bg-transparent"}`} aria-hidden style={{ transform: `scaleX(${t.rate / 475})`, transformOrigin: "left" }} />
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function PlacePicker({ plan, onPick }: { plan: Plan; onPick?: () => void }) {
  return (
    <div>
      <p className="text-sm font-semibold">Where are you staying?</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {PLACES.map(p => {
          const on = plan.sel === p.id
          return (
            <button key={p.id} type="button" aria-pressed={on} onClick={() => { plan.setSel(p.id); onPick?.() }}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-[14px] font-medium transition duration-200 active:scale-[.97] ${on ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper hover:border-ink/50"}`}>
              <span className="size-2 rounded-full" style={{ background: p.id === "mow" ? (on ? "#f4f1e6" : "#15261c") : FEE_COLOR[p.fee] }} aria-hidden />{p.short}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Count({ v, set, max, label, note }: { v: number; set: (n: number) => void; max: number; label: string; note: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-[15px] leading-snug"><span className="font-semibold">{label}</span><br /><span className="text-[13px] text-muted">{note}</span></span>
      <span className="flex items-center gap-2"><button type="button" className={stepBtn} aria-label={`Less: ${label}`} disabled={v === 0} onClick={() => set(Math.max(0, v - 1))}><Minus className="size-4" aria-hidden /></button><span className="w-5 text-center font-semibold num">{v}</span><button type="button" className={stepBtn} aria-label={`More: ${label}`} disabled={v === max} onClick={() => set(Math.min(max, v + 1))}><Plus className="size-4" aria-hidden /></button></span>
    </div>
  )
}

export function Extras({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false)
  const n = (plan.nightOk ? plan.night : 0) + plan.intro + plan.snorkel
  return (
    <div className="border-t border-ink/12">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-h-12 w-full items-center justify-between text-left text-sm font-semibold">
        <span>Captain and snorkel add-ons{n ? <span className="ml-2 rounded-full bg-needle/40 px-2 py-0.5 text-[12px] num">{n}</span> : null}</span>
        <ChevronDown className={`size-4 transition duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
            <div className="divide-y divide-ink/10 pb-2">
              {plan.place.freeIfReturn && (
                <label className="flex min-h-12 items-center gap-3 py-2 text-[14.5px]">
                  <input type="checkbox" checked={plan.ret} onChange={e => plan.setRet(e.target.checked)} className="size-5 accent-[#2f5b3a]" />
                  <span>I'll run your team member back to Man-O-War <span className="text-muted">(delivery is then free)</span></span>
                </label>
              )}
              {plan.nightOk ? <Count v={plan.night} set={plan.setNight} max={6} label="A Night Out" note="$50/hr, a captain runs you to dinner and back" /> : <p className="py-2.5 text-[13px] text-muted">A Night Out ($50/hr, captain to dinner and back) is for Man-O-War clients.</p>}
              <Count v={plan.intro} set={plan.setIntro} max={4} label="Get Acquainted" note="$100/hr, a captain shows you the area" />
              <Count v={plan.snorkel} set={plan.setSnorkel} max={8} label="Snorkel sets" note="from $5 a day, subject to availability" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Receipt({ plan, big = true }: { plan: Plan; big?: boolean }) {
  return (
    <div>
      <ul className="space-y-1 text-[14px] text-muted">
        {plan.lines.map(([t, v]) => <li key={t} className="flex justify-between gap-4"><span>{t}</span><span className="num">${v.toLocaleString("en-US")}</span></li>)}
      </ul>
      <p className="mt-3 flex items-baseline justify-between border-t border-ink pt-3">
        <span className="text-sm font-semibold">Your estimate <span className="font-normal text-muted">before VAT</span></span>
        <Money value={plan.total} className={`font-display font-semibold tracking-tight ${big ? "text-[2.4rem] leading-none" : "text-[1.8rem] leading-none"}`} />
      </p>
    </div>
  )
}

export function Actions({ plan }: { plan: Plan }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[1.25fr_1fr]">
      <a href={BOOK} className="inline-flex min-h-13 items-center justify-center gap-1.5 rounded-full bg-pine px-5 text-[15.5px] font-semibold text-paper transition duration-200 hover:bg-pine-deep active:scale-[.98]">Book these dates <ArrowUpRight className="size-4" aria-hidden /></a>
      <a href={wa(plan.msg)} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-4 text-[15px] font-medium transition duration-200 hover:border-ink active:scale-[.98]"><MessageCircle className="size-4" aria-hidden />Send on WhatsApp</a>
    </div>
  )
}

export function BoatChip({ className = "" }: { className?: string }) {
  return (
    <a href="#boat" className={`group block overflow-hidden rounded-md bg-paper p-1.5 shadow-[0_18px_40px_-22px_rgba(14,40,30,.7)] ${className}`}>
      <img src={PHOTO.boat} alt="The 24 ft Key West center console underway with two people aboard" width={844} height={844} className="aspect-square w-full rounded-[12px] bg-slate/40 object-cover" fetchPriority="high" />
      <span className="flex items-center justify-between gap-2 px-1.5 pt-1.5 pb-0.5 text-[12.5px] leading-tight"><span><b className="font-semibold">The boat:</b> 24 ft Key West, seats 8</span><Check className="size-3.5 text-pine" aria-hidden /></span>
    </a>
  )
}
