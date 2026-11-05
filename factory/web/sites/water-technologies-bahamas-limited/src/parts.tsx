import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label, Reveal, ease, PHONE, TEL } from "./site"

export function Machine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 520" className={className} role="img" aria-label="Illustration of a stand-up water-from-air machine: humid air drawn in at the top, droplets forming, purified water at the tap.">
      <defs>
        <linearGradient id="body" x1="0" x2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#f4f8f9" /><stop offset="1" stopColor="#dbe7ea" /></linearGradient>
        <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9f1f6" /><stop offset="1" stopColor="#9fd6e3" /></linearGradient>
        <radialGradient id="uv" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#bfe6ef" stopOpacity=".9" /><stop offset="1" stopColor="#bfe6ef" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="160" cy="500" rx="120" ry="12" fill="#0d2230" opacity=".08" />
      <rect x="60" y="40" width="200" height="450" rx="34" fill="url(#body)" stroke="#cfdde1" />
      {Array.from({ length: 7 }).map((_, i) => <rect key={i} x="96" y={70 + i * 10} width="128" height="4" rx="2" fill="#0d2230" opacity=".12" />)}
      {[0, 1, 2].map(i => <motion.path key={i} d={`M${100 + i * 60} 20 q 10 20 0 40`} stroke="#135d7a" strokeWidth="1.5" fill="none" strokeDasharray="3 6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: [0, 1, 0], y: [-10, 10, 24] }} transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }} />)}
      <rect x="96" y="160" width="128" height="170" rx="20" fill="url(#win)" />
      <circle cx="160" cy="300" r="46" fill="url(#uv)" />
      {[[120, 0], [150, .7], [182, 1.3], [136, 1.9], [168, 2.4]].map(([x, d]) => <circle key={x} className="drop" style={{ animationDelay: `${d}s` }} cx={x} cy="190" r="4" fill="#135d7a" opacity=".75" />)}
      <path d="M104 300 q 56 22 112 0 v 22 a 14 14 0 0 1 -14 14 h -84 a 14 14 0 0 1 -14 -14 z" fill="#135d7a" opacity=".55" />
      <rect x="128" y="372" width="64" height="16" rx="8" fill="#0d2230" />
      <rect x="152" y="388" width="16" height="22" rx="4" fill="#0d2230" />
      <rect x="110" y="438" width="100" height="10" rx="5" fill="#cfdde1" />
    </svg>
  )
}

const STEPS = [
  { id: "air", t: "Humid air in", d: "The machine draws in the air around it. In The Bahamas, that air carries plenty of moisture." },
  { id: "cool", t: "Cooled until it condenses", d: "The air passes over a cold surface and its moisture turns into water droplets, the way a cold glass sweats." },
  { id: "filter", t: "Filtered", d: "The water is filtered continually to remove particles before it is stored." },
  { id: "uv", t: "Purified with UV light", d: "A patented ultraviolet purification process treats the water, so it is ready to drink." },
  { id: "tap", t: "Pure water at the tap", d: "Drinking water on demand, made where you are, in your home or office." },
]

export function Flow({ n = "01" }: { n?: string }) {
  const [i, setI] = useState(0)
  const s = STEPS[i]
  const xs = [60, 210, 360, 510, 660]
  return (
    <section id="how" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="how-title">
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7"><Label n={n}>How it works</Label><h2 id="how-title" className="display mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">From the air you breathe to the glass you drink.</h2></div>
        <p className="max-w-md text-muted lg:col-span-4 lg:col-start-9">Air2Water machines use technology developed and patented by Worldwide Water, Inc. Tap a stage to follow the water.</p>
      </Reveal>
      <div className="mt-14 overflow-x-auto rounded-[28px] bg-white p-4 md:p-8">
        <svg viewBox="0 0 720 150" className="min-w-[640px] w-full" role="img" aria-label="Five stages: air in, condensation, filtering, UV purification, water at the tap. Illustration.">
          <path d="M60 75 H 660" stroke="#cfdde1" strokeWidth="2" />
          <path d="M60 75 H 660" stroke="#135d7a" strokeWidth="3" className="flow" fill="none" />
          {xs.map((x, k) => (
            <g key={k} onClick={() => setI(k)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy="75" r={k === i ? 30 : 22} fill={k <= i ? "#135d7a" : "#eef3f4"} stroke="#135d7a" strokeWidth="1.5" style={{ transition: "all .5s cubic-bezier(.16,1,.3,1)" }} />
              <text x={x} y="80" textAnchor="middle" fontFamily="Sora" fontSize="14" fill={k <= i ? "#fff" : "#135d7a"}>{k + 1}</text>
              <text x={x} y="135" textAnchor="middle" fontFamily="Source Sans 3" fontSize="13" fill="#536772">{["Air in", "Condense", "Filter", "UV light", "At the tap"][k]}</text>
            </g>
          ))}
        </svg>
        <div role="tablist" aria-label="Stages" className="mt-4 flex flex-wrap gap-2">
          {STEPS.map((x, k) => <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`min-h-11 rounded-full px-4 text-[15px] transition hover:-translate-y-px ${i === k ? "bg-ink text-white" : "bg-paper"}`}>{k + 1}. {x.t}</button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-8 grid gap-4 md:grid-cols-[1fr_2fr] md:items-baseline">
            <p className="display text-[clamp(1.8rem,3vw,2.6rem)]">{s.t}</p>
            <p className="max-w-xl text-[18px] leading-relaxed text-muted">{s.d}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="label mt-4 text-right text-[10px] text-muted">Simplified illustration</p>
    </section>
  )
}

const FITS = {
  home: { label: "A home", fit: "A stand-up machine for the kitchen, or a portable countertop unit.", why: "Drinking water made in the house, without carrying bottles home." },
  office: { label: "An office", fit: "A stand-up machine where people gather for water.", why: "One machine in place of a stack of delivered bottles." },
  site: { label: "A site or remote place", fit: "Ask about mobile and larger water machines.", why: "Water made where you are, when supply is far away." },
} as const
type FK = keyof typeof FITS

export function Chooser({ n = "02" }: { n?: string }) {
  const [k, setK] = useState<FK>("home")
  const f = FITS[k]
  return (
    <section className="bg-ink text-white" aria-labelledby="fit-title">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label n={n} light>Which machine</Label>
          <h2 id="fit-title" className="display mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)]">Where will you drink it?</h2>
          <div role="tablist" aria-label="Where the machine goes" className="mt-10 flex flex-wrap gap-2">
            {(Object.keys(FITS) as FK[]).map(x => <button key={x} role="tab" aria-selected={k === x} onClick={() => setK(x)} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${k === x ? "border-mist bg-mist text-ink" : "border-white/25"}`}>{FITS[x].label}</button>)}
          </div>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <AnimatePresence mode="wait">
            <motion.div key={k} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.5, ease }} className="rounded-[28px] border border-white/15 bg-white/5 p-8 backdrop-blur md:p-10">
              <p className="label text-mist">For {f.label.toLowerCase()}</p>
              <p className="display mt-4 text-[clamp(1.8rem,2.8vw,2.6rem)]">{f.fit}</p>
              <p className="mt-6 text-[18px] text-white/70">{f.why}</p>
              <a href="#demo" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-ink transition hover:-translate-y-0.5">Ask for a demonstration</a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const DEMO: Record<string, { label: string; fields: [string, string[] | null][] }> = {
  home: { label: "Home", fields: [["Area of Nassau", null], ["People in the house", ["1 to 2", "3 to 4", "5 or more"]], ["Water you use now", ["Delivered bottles", "Store-bought bottles", "Tap with a filter", "Other"]], ["Best time to call", ["Morning", "Afternoon", "Evening"]]] },
  office: { label: "Office", fields: [["Company", null], ["Area of Nassau", null], ["People in the office", ["Under 10", "10 to 30", "30 or more"]], ["Water you use now", ["Delivered bottles", "Water cooler", "Tap with a filter", "Other"]]] },
  site: { label: "Site or larger", fields: [["Organisation", null], ["Location or island", null], ["What it is for", ["Worksite", "Remote property", "Event", "Other"]], ["Best time to call", ["Morning", "Afternoon", "Evening"]]] },
}

export function Demo({ n = "03" }: { n?: string }) {
  const [tab, setTab] = useState("home")
  const [v, setV] = useState<Record<string, string>>({})
  const lines = DEMO[tab].fields.map(([k]) => v[`${tab}:${k}`] ? `${k}: ${v[`${tab}:${k}`]}` : null).filter(Boolean)
  return (
    <section id="demo" className="bg-paper-2" aria-labelledby="demo-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n={n}>Demonstration</Label><h2 id="demo-title" className="display mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)]">See it make water.</h2><p className="mt-6 max-w-sm text-muted">The team takes enquiries by phone. Fill in what you know and read it out when you call, so the right machine comes to the demonstration.</p></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full gap-1 rounded-full bg-white p-1">{Object.entries(DEMO).map(([k, d]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-1 rounded-full data-[state=active]:bg-deep data-[state=active]:text-white">{d.label}</TabsTrigger>)}</TabsList>
            {Object.entries(DEMO).map(([k, d]) => (
              <TabsContent key={k} value={k} className="mt-8 grid gap-5 sm:grid-cols-2">
                {d.fields.map(([f, opts]) => (
                  <label key={f} className="block"><span className="label text-muted">{f}</span>
                    {opts ? <select value={v[`${k}:${f}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className="field mt-2"><option value="">Choose</option>{opts.map(o => <option key={o}>{o}</option>)}</select>
                      : <input value={v[`${k}:${f}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className="field mt-2" />}
                  </label>
                ))}
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-8 rounded-[28px] bg-ink p-6 text-white md:p-8">
            <p className="label text-mist">Read out when you call</p>
            <p className="mt-3 min-h-[3rem] text-[18px] text-white/90">{lines.length ? `Demonstration for a ${DEMO[tab].label.toLowerCase()}. ${lines.join(". ")}.` : "Your details will appear here."}</p>
            <a href={TEL} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-mist px-6 font-medium text-ink transition hover:-translate-y-0.5"><Phone className="size-4" aria-hidden />Call {PHONE}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
