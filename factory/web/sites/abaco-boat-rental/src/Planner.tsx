import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { MessageCircle, ArrowUpRight } from "lucide-react"
import { BOOK, wa, ease } from "./site"

export const rateFor = (d: number) => (d >= 7 ? 303 : d >= 3 ? 330 : d === 2 ? 450 : 475)

type Place = { id: string; name: string; at: [number, number]; fee: number; freeIfReturn?: boolean }
export const PLACES: Place[] = [
  { id: "mow", name: "Man-O-War Cay", at: [26.592, -77.0], fee: 0 },
  { id: "mh", name: "Marsh Harbour", at: [26.541, -77.065], fee: 100, freeIfReturn: true },
  { id: "ec", name: "Elbow Cay", at: [26.505, -76.94], fee: 100, freeIfReturn: true },
  { id: "ht", name: "Hope Town", at: [26.548, -76.958], fee: 100 },
  { id: "sc", name: "Scotland Cay", at: [26.632, -77.06], fee: 100 },
  { id: "gc", name: "Great Guana Cay", at: [26.665, -77.115], fee: 100 },
  { id: "tc", name: "Treasure Cay", at: [26.67, -77.29], fee: 300 },
  { id: "lh", name: "Little Harbour", at: [26.33, -76.99], fee: 300 },
]
const W = 900, H = 760
const P = ([la, lo]: [number, number]) => [(lo + 77.4) / 0.55 * W, (26.75 - la) / 0.47 * H] as const
const ABACO: [number, number][] = [[26.79, -77.42], [26.74, -77.33], [26.69, -77.24], [26.63, -77.16], [26.575, -77.11], [26.53, -77.085], [26.47, -77.06], [26.40, -77.03], [26.33, -77.02], [26.25, -77.0], [26.25, -77.42]]
const abacoPath = "M" + ABACO.map(p => P(p).map(v => v.toFixed(0)).join(",")).join(" L") + " Z"
const feeColor = (f: number) => (f === 0 ? "#7fd6d3" : f === 100 ? "#efe3c8" : "#f3f6f4")

export function Chart({ sel, onSel }: { sel: string; onSel: (id: string) => void }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="group" aria-label="Illustrated chart of the Sea of Abaco with delivery points coloured by fee. Not for navigation.">
      <rect width={W} height={H} rx="20" fill="#bfe3e6" />
      <path d={abacoPath} fill="#cfe0c8" stroke="#0b2a33" strokeOpacity=".35" />
      <text x="60" y="560" fontFamily="Unbounded, Arial, sans-serif" fontSize="22" fill="#0b2a33" fillOpacity=".55">Great Abaco</text>
      <text x="520" y="520" fontFamily="Manrope, Arial, sans-serif" fontSize="13" letterSpacing="4" fill="#0b525b" fillOpacity=".6">SEA OF ABACO</text>
      <text x="760" y="120" fontFamily="Manrope, Arial, sans-serif" fontSize="13" letterSpacing="4" fill="#0b525b" fillOpacity=".6" transform="rotate(64 760 120)">ATLANTIC</text>
      {PLACES.filter(p => p.id !== "mow").map((p, i) => {
        const [x, y] = P(p.at), [mx, my] = P(PLACES[0].at)
        return <motion.path key={`r${p.id}`} d={`M${mx},${my} Q${(mx + x) / 2 + 30},${(my + y) / 2 - 30} ${x},${y}`} fill="none" stroke="#0f6f7a" strokeWidth={sel === p.id ? 3 : 1.2} strokeDasharray="6 7" strokeOpacity={sel === p.id ? 1 : 0.35} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }} />
      })}
      {PLACES.map(p => {
        const [x, y] = P(p.at), on = sel === p.id, left = x > 700 && p.id !== "ht"
        return (
          <g key={p.id} role="button" tabIndex={0} aria-pressed={on} aria-label={`${p.name}, ${p.fee === 0 ? "free pickup" : `$${p.fee} per direction`}`} onClick={() => onSel(p.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSel(p.id) } }} className="cursor-pointer">
            <circle cx={x} cy={y} r={p.id === "mow" ? 16 : on ? 14 : 10} fill={feeColor(p.fee)} stroke="#0b2a33" strokeWidth={on ? 3 : 1.6} style={{ transition: "r .25s" }} />
            <text x={left ? x - 18 : x + 18} y={y + 5} textAnchor={left ? "end" : "start"} fontFamily="Manrope, Arial, sans-serif" fontWeight={on ? 700 : 600} fontSize="17" fill="#0b2a33">{p.name}{p.id === "mow" ? " · base" : ""}</text>
          </g>
        )
      })}
      <g transform={`translate(24 ${H - 108})`} fontFamily="Manrope, Arial, sans-serif" fontSize="14" fill="#0b2a33">
        <rect width="250" height="88" rx="12" fill="#f3f6f4" fillOpacity=".9" />
        {[["#7fd6d3", "Free pickup"], ["#efe3c8", "$100 per direction"], ["#f3f6f4", "$300 per direction"]].map(([c, t], i) => <g key={t} transform={`translate(16 ${22 + i * 24})`}><circle r="7" fill={c} stroke="#0b2a33" /><text x="16" y="5">{t}</text></g>)}
      </g>
      <text x={W - 20} y={H - 16} textAnchor="end" fontFamily="Manrope, Arial, sans-serif" fontSize="11" letterSpacing="1.5" fill="#0b2a33" fillOpacity=".6">ILLUSTRATION, NOT FOR NAVIGATION</text>
    </svg>
  )
}

export function Builder() {
  const [sel, setSel] = useState("ht")
  const [days, setDays] = useState(7)
  const [ret, setRet] = useState(false)
  const [night, setNight] = useState(0)
  const [intro, setIntro] = useState(0)
  const [snorkel, setSnorkel] = useState(0)
  const place = PLACES.find(p => p.id === sel)!
  const dFee = place.fee === 0 || (place.freeIfReturn && ret) ? 0 : place.fee
  const rate = rateFor(days)
  const nightOk = sel === "mow"
  const lines = useMemo(() => {
    const l: [string, number][] = [[`${days} ${days === 1 ? "day" : "days"} at $${rate}/day`, days * rate]]
    l.push([dFee ? `Delivery and pickup, ${place.name} ($${dFee} each way)` : `${place.name}: ${place.id === "mow" ? "free pickup" : "free delivery (you run our team member back)"}`, dFee * 2])
    if (nightOk && night) l.push([`A Night Out, ${night} hr`, night * 50])
    if (intro) l.push([`Get Acquainted, ${intro} hr`, intro * 100])
    if (snorkel) l.push([`${snorkel} snorkel ${snorkel === 1 ? "set" : "sets"}, from $5/day`, snorkel * 5 * days])
    return l
  }, [days, rate, dFee, place, night, intro, snorkel, nightOk])
  const total = lines.reduce((a, b) => a + b[1], 0)
  const msg = `Hi Abaco Boat Rental! I'd like the 24ft Key West for ${days} ${days === 1 ? "day" : "days"}, ${place.id === "mow" ? "picking up at Man-O-War Cay" : `delivered to ${place.name}`}.${nightOk && night ? ` A Night Out: ${night} hr.` : ""}${intro ? ` Get Acquainted: ${intro} hr.` : ""}${snorkel ? ` Snorkel sets: ${snorkel}.` : ""} My estimate from your site: $${total.toLocaleString()} before VAT. My dates are: `
  const step = "flex size-11 items-center justify-center rounded-full border border-line text-lg transition hover:-translate-y-px hover:border-ink disabled:opacity-30"
  const Count = ({ v, set, max, label }: { v: number; set: (n: number) => void; max: number; label: string }) => (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3">
      <span className="text-[16px]">{label}</span>
      <span className="flex items-center gap-3"><button type="button" className={step} aria-label={`Fewer: ${label}`} disabled={v === 0} onClick={() => set(Math.max(0, v - 1))}>−</button><span className="w-6 text-center font-display tabular-nums">{v}</span><button type="button" className={step} aria-label={`More: ${label}`} disabled={v === max} onClick={() => set(Math.min(max, v + 1))}>+</button></span>
    </div>
  )
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Chart sel={sel} onSel={setSel} />
        <div className="mt-4 flex flex-wrap gap-2">{PLACES.map(p => <button key={p.id} type="button" aria-pressed={sel === p.id} onClick={() => setSel(p.id)} className={`min-h-11 rounded-full border px-4 text-[14px] font-medium transition hover:-translate-y-px ${sel === p.id ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink/40"}`}>{p.name}</button>)}</div>
      </div>
      <div className="lg:col-span-5">
        <div className="rounded-[20px] bg-paper p-6 shadow-[0_30px_60px_-40px_rgba(11,42,51,.45)] md:p-8">
          <label htmlFor="days" className="flex items-baseline justify-between"><span className="label text-muted">Days</span><span className="font-display text-3xl font-medium tabular-nums">{days}</span></label>
          <input id="days" type="range" min={1} max={14} value={days} onChange={e => setDays(+e.target.value)} className="mt-3 w-full accent-[#0f6f7a]" />
          <p className="mt-1 text-[14px] text-muted">${rate}/day at {days} {days === 1 ? "day" : "days"}. The longer you float, the more you save.</p>
          <div className="mt-6">
            <p className="label text-muted">Where you want the boat: <span className="text-ink">{place.name}</span></p>
            {place.freeIfReturn && <label className="mt-3 flex min-h-11 items-center gap-3 text-[15px]"><input type="checkbox" checked={ret} onChange={e => setRet(e.target.checked)} className="size-5 accent-[#0f6f7a]" />I'll run your team member back to Man-O-War (free delivery)</label>}
          </div>
          <div className="mt-4">
            {nightOk ? <Count v={night} set={setNight} max={6} label="A Night Out, $50/hr" /> : <p className="border-b border-line py-3 text-[14px] text-muted">A Night Out is for Man-O-War clients.</p>}
            <Count v={intro} set={setIntro} max={4} label="Get Acquainted, $100/hr" />
            <Count v={snorkel} set={setSnorkel} max={8} label="Snorkel sets, from $5/day" />
          </div>
          <ul className="mt-6 space-y-1.5 text-[14px] text-muted">{lines.map(([t, v]) => <li key={t} className="flex justify-between gap-4"><span>{t}</span><span className="tabular-nums">${v.toLocaleString()}</span></li>)}</ul>
          <motion.p key={total} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} className="mt-4 flex items-baseline justify-between border-t border-ink pt-4" aria-live="polite"><span className="label">Estimate before VAT</span><span className="font-display text-[2.2rem] font-medium tabular-nums">${total.toLocaleString()}</span></motion.p>
          <div className="mt-6 grid gap-2">
            <a href={BOOK} className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-ink px-6 font-semibold text-paper transition hover:-translate-y-px hover:bg-sea-deep">Check availability &amp; book <ArrowUpRight className="size-4" aria-hidden /></a>
            <a href={wa(msg)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-6 transition hover:-translate-y-px hover:border-ink"><MessageCircle className="size-4" aria-hidden />Send this on WhatsApp</a>
          </div>
          <p className="mt-3 text-[13px] text-muted">An estimate from the published rates. VAT is added at booking; you pay on the day.</p>
        </div>
      </div>
    </div>
  )
}
