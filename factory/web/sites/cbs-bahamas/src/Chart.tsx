import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { ISLANDS, NASSAU, SHOP, ONLINE_EMAIL } from "./data"
import { ease } from "./site"

type Island = (typeof ISLANDS)[number]
// Stylised outlines, positioned roughly. Illustration, not to scale, not for navigation.
const SHAPES: Record<string, [number, number, number]> = {
  abaco: [26, 74, 18], "grand-bahama": [100, 16, -12], bimini: [8, 18, 0], andros: [62, 110, 8],
  eleuthera: [12, 96, -28], exuma: [10, 90, -40], "cat-island": [12, 62, -20], "long-island": [9, 74, -38], inagua: [58, 30, 0],
}
function blob(cx: number, cy: number, rx: number, ry: number, rot: number) {
  const pts = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2
    const wob = 1 + 0.12 * Math.sin(i * 2.7 + cx) + 0.06 * Math.cos(i * 5.1 + cy)
    const x = Math.cos(a) * rx * wob, y = Math.sin(a) * ry * wob
    const r = (rot * Math.PI) / 180
    return [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)]
  })
  return "M" + pts.map((p, i) => {
    const n = pts[(i + 1) % pts.length]
    return `${p[0].toFixed(1)} ${p[1].toFixed(1)} Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + n[0]) / 2).toFixed(1)} ${((p[1] + n[1]) / 2).toFixed(1)}`
  }).join(" T") + "Z"
}
function route(to: Island) {
  const mx = (NASSAU.x + to.x) / 2, my = (NASSAU.y + to.y) / 2
  const dx = to.x - NASSAU.x, dy = to.y - NASSAU.y
  return `M${NASSAU.x} ${NASSAU.y} Q${mx - dy * 0.25} ${my + dx * 0.25} ${to.x} ${to.y}`
}

export default function Chart() {
  const [id, setId] = useState<Island["id"]>("exuma")
  const [boat, setBoat] = useState("")
  const [copied, setCopied] = useState(false)
  const isl = ISLANDS.find(i => i.id === id)!
  const line = `${isl.town}, ${isl.name} via ${boat.trim() ? (boat.trim().toUpperCase().startsWith("M/V") ? boat.trim() : "M/V " + boat.trim()) : "the next available mailboat"}`
  const shapes = useMemo(() => ISLANDS.map(i => ({ id: i.id, d: blob(i.x, i.y, ...SHAPES[i.id]) })), [])
  const copy = async () => { try { await navigator.clipboard.writeText(line); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ } }
  const steps = [
    ["Choose the mailboat at checkout", `Pick "Deliver to Mailboat: Potter's Cay". Most boats leave from there; a few from Arawak Cay. Not sure? Choose either, the CBS dispatcher corrects it for ${isl.name}.`],
    ["Write your island in the address", line],
    ["Add the freight acceptance date", "Enter the day the boat takes cargo for your port in Order Details. Unsure? Choose the next date and CBS reschedules. Same-day mailboat drop-off is not available."],
    ["CBS picks, preps and packs", "Your order is consolidated and packed to keep the boat's freight low and your items safe."],
    ["Photos and a signed proof at the dock", "Email updates throughout, photos of your items at handoff, and a proof of delivery signed by the mailboat."],
  ]
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-[6px] bg-sea">
          <svg viewBox="80 20 880 640" className="block w-full" role="img" aria-label={`Illustrated chart of The Bahamas with a mailboat line from Potter's Cay, Nassau, to ${isl.name}. Illustration, not to scale.`}>
            <defs>
              <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0 V8" stroke="#245a41" strokeOpacity=".22" strokeWidth="1" /></pattern>
            </defs>
            {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M80 ${60 + i * 52} H960`} stroke="#245a41" strokeOpacity=".08" />)}
            {shapes.map(s => (
              <g key={s.id} className="cursor-pointer" onClick={() => setId(s.id as Island["id"])}>
                <path d={s.d} fill={s.id === id ? "#245a41" : "#eeefe9"} stroke="#245a41" strokeWidth="1.5" style={{ transition: "fill .5s cubic-bezier(.16,1,.3,1)" }} />
                <path d={s.d} fill="url(#hatch)" opacity={s.id === id ? 0 : 1} />
              </g>
            ))}
            {ISLANDS.map(i => (
              <text key={i.id} x={i.x + (SHAPES[i.id][0] > 40 ? 0 : 22)} y={i.y + (SHAPES[i.id][0] > 40 ? SHAPES[i.id][1] + 22 : 4)} textAnchor={SHAPES[i.id][0] > 40 ? "middle" : "start"} fontFamily="Figtree, sans-serif" fontSize="15" fontWeight={i.id === id ? 600 : 400} fill="#17201d" className="pointer-events-none">{i.name}</text>
            ))}
            <motion.path key={id} d={route(isl)} fill="none" stroke="#17201d" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease }} />
            <g key={id + "boat"}>
              <path d="M-9 -3 H9 L6 4 H-6 Z M-2 -3 V-11 L5 -5 Z" fill="#e2b23a" stroke="#17201d" strokeWidth="1.2">
                <animateMotion dur="1.4s" fill="freeze" path={route(isl)} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.16 1 0.3 1" />
              </path>
            </g>
            <circle cx={NASSAU.x} cy={NASSAU.y} r="11" fill="#e2b23a" stroke="#17201d" strokeWidth="2" />
            <text x={NASSAU.x - 18} y={NASSAU.y - 16} textAnchor="end" fontFamily="Bricolage Grotesque, Figtree" fontSize="20" fontWeight="700" fill="#17201d">Nassau</text>
            <text x={NASSAU.x - 18} y={NASSAU.y + 2} textAnchor="end" fontFamily="Figtree, sans-serif" fontSize="13" fill="#56605b">CBS · Potter's Cay</text>
          </svg>
          <p className="absolute bottom-3 left-4 text-[11px] tracking-[0.16em] text-muted uppercase">Illustration, not to scale</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Your island">
          {ISLANDS.map(i => (
            <button key={i.id} type="button" role="radio" aria-checked={i.id === id} onClick={() => setId(i.id)} className={`min-h-11 rounded-[4px] border px-4 text-[14px] transition hover:-translate-y-px ${i.id === id ? "border-pine bg-pine text-paper" : "border-line bg-paper text-ink hover:border-pine"}`}>{i.name}</button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <label className="block">
          <span className="text-[12px] tracking-[0.18em] text-muted uppercase">Your usual mailboat (optional)</span>
          <input value={boat} onChange={e => setBoat(e.target.value)} placeholder="Type the boat's name" className="mt-2 block min-h-12 w-full border-b-2 border-ink/25 bg-transparent font-display text-xl outline-none transition focus:border-pine" />
        </label>
        <ol className="mt-8 border-t border-ink/20">
          {steps.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink/20 py-5">
              <span className="font-display text-xl font-bold text-pine tabular-nums">{i + 1}</span>
              <div>
                <p className="font-display text-[1.25rem] leading-tight font-bold tracking-[-0.01em]">{t}</p>
                {i === 1 ? (
                  <div className="mt-2 flex items-center gap-2">
                    <code className="flex-1 rounded-[4px] bg-paper px-3 py-2 font-sans text-[15px] text-ink">{d}</code>
                    <button type="button" onClick={copy} aria-label="Copy the address line" className="inline-flex size-11 items-center justify-center rounded-[4px] border border-line bg-paper transition hover:-translate-y-px hover:border-ink">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</button>
                  </div>
                ) : <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{d}</p>}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">Drop-off at the boat is free on every order, whatever the size. The mailboat charges its own freight fee when you collect on {isl.name}; CBS cannot quote it in advance. Questions after collection: <a className="underline decoration-tape decoration-2 underline-offset-4" href={`mailto:${ONLINE_EMAIL}`}>{ONLINE_EMAIL}</a>.</p>
        <a href={SHOP + "outislands"} className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-pine px-6 font-medium text-paper transition hover:-translate-y-px hover:bg-pine-deep">
          Start an order for {isl.name} <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </div>
  )
}
