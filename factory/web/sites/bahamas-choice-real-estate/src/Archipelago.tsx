import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ease } from "./site"

type Isle = { id: string; name: string; pts: [number, number][]; places?: string[]; label?: [number, number] }

// Rough outlines from approximate latitude/longitude. Illustration only, not to scale, not for navigation.
export const ISLES: Isle[] = [
  { id: "gb", name: "Grand Bahama & Freeport", pts: [[26.70,-78.99],[26.64,-78.70],[26.60,-78.40],[26.64,-78.10],[26.74,-77.92],[26.66,-77.86],[26.52,-78.30],[26.50,-78.70],[26.55,-78.98]], places: ["Bahamia", "Bootle Bay", "Civic Industrial Area", "Eight Mile Rock", "Fortune Bay", "Lucaya", "Sweetings Cay"] },
  { id: "ab", name: "Great Abaco & Little Abaco", pts: [[26.93,-77.85],[26.88,-77.45],[26.70,-77.15],[26.48,-77.00],[26.25,-76.97],[25.95,-77.14],[25.86,-77.27],[26.02,-77.36],[26.30,-77.20],[26.55,-77.26],[26.78,-77.52],[26.86,-77.84]], places: ["Cedar Harbour", "Cooper's Town", "Elbow Cay", "Green Turtle Cay", "Hope Town", "Marsh Harbour", "Treasure Cay"] },
  { id: "bi", name: "Bimini", pts: [[25.80,-79.30],[25.74,-79.24],[25.66,-79.28],[25.72,-79.33]], places: ["Alice Town", "Bailey Town", "Bimini Bay", "Cat Cay", "North Bimini", "South Bimini"] },
  { id: "be", name: "Berry Islands", pts: [[25.84,-77.92],[25.74,-77.72],[25.48,-77.70],[25.56,-77.86]], places: ["Great Harbour Cay"] },
  { id: "np", name: "New Providence & Paradise Island", pts: [[25.09,-77.55],[25.11,-77.30],[25.04,-77.25],[24.99,-77.45],[25.00,-77.55]], places: ["Downtown", "Eastern Road", "Love Beach", "Lyford Cay", "Old Fort Bay", "Paradise Island", "West Bay Street"] },
  { id: "an", name: "Andros", pts: [[25.18,-78.12],[25.05,-77.78],[24.70,-77.70],[24.30,-77.62],[23.92,-77.55],[23.70,-77.66],[23.95,-78.02],[24.30,-78.22],[24.75,-78.32],[25.05,-78.30]], places: ["Cargill Creek", "Congo Town", "Kamalame Cay", "Kemp's Bay", "Mangrove Cay", "Nicholl's Town", "Staniard Creek"] },
  { id: "el", name: "Eleuthera", pts: [[25.56,-76.76],[25.48,-76.60],[25.30,-76.40],[25.14,-76.20],[24.94,-76.11],[24.64,-76.14],[24.76,-76.25],[25.05,-76.30],[25.25,-76.50],[25.46,-76.73]], places: ["Current", "Governor's Harbour", "Gregory Town", "Harbour Island", "Rock Sound", "Spanish Wells", "Windermere Island"] },
  { id: "ca", name: "Cat Island & Cat Cay", pts: [[24.71,-75.76],[24.40,-75.45],[24.14,-75.29],[24.12,-75.39],[24.40,-75.59],[24.65,-75.84]], places: ["Arthur's Town", "Bennet's Harbour", "New Bight", "Orange Creek", "Port Howe", "Tea Bay"] },
  { id: "ex", name: "Great Exuma & Little Exuma", pts: [[24.56,-76.76],[24.10,-76.44],[23.75,-76.04],[23.46,-75.64],[23.40,-75.76],[23.70,-76.16],[24.05,-76.56],[24.50,-76.86]], places: ["Emerald Bay", "Farmer's Hill", "George Town", "Jimmy Hill", "Moss Town", "Stocking Island"] },
  { id: "ss", name: "San Salvador", pts: [[24.14,-74.51],[24.10,-74.42],[23.95,-74.47],[23.98,-74.55]] },
  { id: "rc", name: "Rum Cay", pts: [[23.71,-74.90],[23.68,-74.79],[23.63,-74.86]] },
  { id: "li", name: "Long Island", pts: [[23.63,-75.34],[23.30,-75.10],[22.95,-74.87],[22.87,-74.93],[23.20,-75.20],[23.55,-75.39]], places: ["Burnt Ground", "Cape Santa Maria", "Deadman's Cay", "Deans", "Lochabar", "Stella Maris"] },
  { id: "ac", name: "Acklins & Crooked Island", pts: [[22.82,-74.36],[22.79,-74.10],[22.55,-73.88],[22.20,-73.94],[22.14,-74.06],[22.45,-74.10],[22.70,-74.31]], places: ["Colonel Hill", "Delectable Bay", "French Wells", "Landrail Point", "Lovely Bay", "Major's Cay", "Moss Town", "Spring Point"] },
  { id: "ra", name: "Ragged Island", pts: [[22.27,-75.76],[22.14,-75.69],[22.17,-75.79]] },
  { id: "ma", name: "Mayaguana", pts: [[22.46,-73.15],[22.43,-72.84],[22.33,-72.84],[22.32,-73.10]] },
  { id: "in", name: "Inagua", pts: [[21.26,-73.66],[21.21,-73.25],[21.00,-73.03],[20.91,-73.40],[21.05,-73.71]] },
]

const W = 760, H = 700
const px = ([lat, lon]: [number, number]) => [(lon + 79.6) * 108, (27.3 - lat) * 108] as const

function path(pts: [number, number][]) {
  const p = pts.map(px)
  const n = p.length
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + "Z"
}
const centre = (pts: [number, number][]) => {
  const p = pts.map(px); return [p.reduce((a, b) => a + b[0], 0) / p.length, p.reduce((a, b) => a + b[1], 0) / p.length] as const
}

export default function Archipelago() {
  const [sel, setSel] = useState("np")
  const isle = ISLES.find(i => i.id === sel)!
  const nassau = px([25.06, -77.36])
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="relative lg:col-span-7">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="group" aria-label="Illustrated chart of the islands of The Bahamas. Select an island to see the areas Bahamas Choice lists there.">
          <defs>
            <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse"><path d="M54 0H0V54" fill="none" stroke="#17212b" strokeOpacity=".07" strokeWidth="1" /></pattern>
            <radialGradient id="bank" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#cfe0d8" /><stop offset="1" stopColor="#cfe0d8" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#grid)" />
          {ISLES.map((i, k) => {
            const [cx, cy] = centre(i.pts)
            return <motion.ellipse key={`b${i.id}`} cx={cx} cy={cy} rx={i.pts.length > 6 ? 70 : 34} ry={i.pts.length > 6 ? 58 : 30} fill="url(#bank)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + k * 0.03, duration: 1.4 }} />
          })}
          <motion.path d={`M${nassau[0]},${nassau[1]} L${nassau[0] + 250},${nassau[1] - 150}`} stroke="#17212b" strokeOpacity=".25" strokeDasharray="3 5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.8, ease }} />
          <text x={nassau[0] + 256} y={nassau[1] - 154} fontFamily="Albert Sans" fontSize="12" letterSpacing="2" fill="#59636d">OUR OFFICE · NASSAU</text>
          {ISLES.map((i, k) => {
            const active = i.id === sel
            return (
              <motion.path key={i.id} d={path(i.pts)} className="island" role="button" tabIndex={0} aria-label={i.name} aria-pressed={active}
                fill={active ? "#44663f" : "#e7e5de"} stroke={active ? "#2f4a2c" : "#17212b"} strokeOpacity={active ? 1 : 0.55} strokeWidth={active ? 1.6 : 1}
                onClick={() => setSel(i.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(i.id) } }}
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: k * 0.05, duration: 1.2, ease }}
                whileHover={{ scale: 1.04 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            )
          })}
          <circle cx={nassau[0]} cy={nassau[1]} r="4" fill="#17212b" />
          <text x="22" y={H - 24} fontFamily="Albert Sans" fontSize="11" letterSpacing="1.5" fill="#59636d">ILLUSTRATION, NOT TO SCALE</text>
        </svg>
      </div>
      <div className="lg:col-span-5">
        <ul className="flex flex-wrap gap-2" aria-label="Islands">
          {ISLES.map(i => (
            <li key={i.id}><button type="button" onClick={() => setSel(i.id)} aria-pressed={i.id === sel} className={`min-h-11 rounded-full border px-4 text-[14px] transition duration-200 hover:-translate-y-px ${i.id === sel ? "border-grape bg-grape text-paper" : "border-line bg-paper hover:border-ink/40"}`}>{i.name}</button></li>
          ))}
        </ul>
        <div className="mt-8 border-t border-line pt-8" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
              <p className="label text-muted">Selected island</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.8rem)] leading-[1.02]">{isle.name}</h3>
              {isle.places ? (
                <>
                  <p className="mt-5 text-[16px] text-muted">Areas we feature here</p>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[17px]">
                    {isle.places.map(p => <li key={p} className="border-b border-line/80 py-1.5">{p}</li>)}
                  </ul>
                </>
              ) : (
                <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-muted">One of the islands we cover. Tell us what you are looking for and we will tell you what is available.</p>
              )}
              <a href={`#brief`} data-island={isle.name} onClick={() => { try { sessionStorage.setItem("bc-island", isle.name) } catch { /* ignore */ } window.dispatchEvent(new CustomEvent("bc-island", { detail: isle.name })) }} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-paper transition duration-200 hover:-translate-y-px hover:bg-grape-deep">
                Ask about {isle.name.split(" & ")[0]} <span className="transition group-hover:translate-x-1" aria-hidden>›</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
