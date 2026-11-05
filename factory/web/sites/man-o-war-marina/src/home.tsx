import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Check, Mail, Phone, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease, PHONE, TEL, DINE, DINE_TEL, EMAIL, RATES, WIX, HOURS } from "./site"

const HERO = WIX + "0b3c23_fe4056ccc3bf4942b06afd5b77b81bb2~mv2.jpg/v1/fill/w_1905,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0b3c23_fe4056ccc3bf4942b06afd5b77b81bb2~mv2.jpg"
const G1 = WIX + "0b3c23_dfa1ef9bf2204ee5949ef9c5d0f6c4dd~mv2.jpg/v1/fill/w_547,h_729,q_90,enc_avif,quality_auto/0b3c23_dfa1ef9bf2204ee5949ef9c5d0f6c4dd~mv2.jpg"
const G2 = WIX + "0b3c23_07d680b9e44048aaac78806ae00244f2~mv2.jpg/v1/fill/w_547,h_729,q_90,enc_avif,quality_auto/0b3c23_07d680b9e44048aaac78806ae00244f2~mv2.jpg"
const G3 = WIX + "0b3c23_6bc8e1ba5247465aa4ecd2c150aa6f1e~mv2.jpg/v1/fill/w_547,h_729,q_90,enc_avif,quality_auto/0b3c23_6bc8e1ba5247465aa4ecd2c150aa6f1e~mv2.jpg"

function Hero() {
  const words = ["Twenty-three", "slips in a", "boatbuilders’ harbour."]
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 md:px-10 md:pt-14">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 text-[11px] tracking-[0.24em] text-muted uppercase">
          <span>Man-O-War Cay · Abaco · The Bahamas</span>
          <span>Full service marina since 1976</span>
        </motion.div>
        <div className="grid gap-8 pt-8 md:grid-cols-12 md:items-end md:pt-12">
          <h1 id="hero-title" className="font-display text-[clamp(3rem,8.4vw,9.4rem)] leading-[0.9] tracking-[-0.025em] md:col-span-9">
            <span className="sr-only">Man-O-War Marina: </span>
            {words.map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span className={`block ${i === 2 ? "italic text-harbour-deep" : ""}`} initial={{ y: "106%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.15, ease: [0.77, 0, 0.175, 1] }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="md:col-span-3 md:pb-4">
            <p className="text-[16px] leading-relaxed text-muted">Man-O-War Marina sits on the sheltered harbour of a small Abaco cay, with the island’s only fuel dock, a waterfront restaurant and slips for yachts to 120 ft.</p>
            <div className="mt-6 flex flex-col gap-2">
              <a href="#request" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px hover:bg-harbour-deep active:translate-y-0">Request a slip <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ clipPath: "inset(8% 6% 8% 6%)", opacity: 0.4 }} animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }} transition={{ delay: 0.35, duration: 1.5, ease: [0.77, 0, 0.175, 1] }} className="mt-10 md:mt-14">
        <div className="relative mx-auto max-w-[1440px] md:px-10">
          <Photo priority src={HERO} alt="Man-O-War Marina on the harbour of Man-O-War Cay, with boats along the docks" w={1905} h={646} className="aspect-[4/3] md:aspect-[1905/646]" />
        </div>
      </motion.div>
    </section>
  )
}

function Specs() {
  const items: [string, string, string][] = [
    ["Arriving", "VHF 16", "Assisted docking"],
    ["Slips", "23", "Secure, on the harbour"],
    ["Length / beam", "120 ft · 20 ft", "Maximum per slip"],
    ["Draft", "7 ft", "At low tide"],
    ["Fuel", "Gas · Diesel", "Dockside and roadside"],
  ]
  return (
    <section className="mt-10 bg-ink text-paper md:mt-14" aria-label="Key marina specifications">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-5">
        {items.map(([k, v, s], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className={`border-paper/15 border-b px-5 py-7 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 ${i === 4 ? "col-span-2 md:col-span-1" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""}`}>
            <span className="text-[11px] tracking-[0.22em] text-sand uppercase">{k}</span>
            <span className="mt-2 block font-display text-[clamp(1.9rem,3vw,3rem)] leading-none tabular-nums">{v}</span>
            <span className="mt-2 block text-[13px] text-paper/60">{s}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border-t border-paper/15 px-5 py-4 text-[14px] md:px-10">
        <span className="text-paper/70">30 and 50 amp power and water at every slip.</span>
        <a href={TEL} className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-sand">Reservations {PHONE}</a>
      </div>
    </section>
  )
}

const LIMIT = { loa: 120, beam: 20, draft: 7 }

function Fit() {
  const [loa, setLoa] = useState(52)
  const [beam, setBeam] = useState(16)
  const [draft, setDraft] = useState(4.5)
  const ok = { loa: loa <= LIMIT.loa, beam: beam <= LIMIT.beam, draft: draft <= LIMIT.draft }
  const all = ok.loa && ok.beam && ok.draft
  // section drawing: water surface at y=90, low-tide 7 ft line at y=90 + 7*22 = 244
  const ft = 22
  const keel = 90 + draft * ft
  const hullW = Math.min(330, 90 + beam * 11)
  const cx = 300
  const rows: [string, number, (v: number) => void, number, number, number, string, number, boolean][] = [
    ["Length overall", loa, setLoa, 20, 160, 1, "ft", LIMIT.loa, ok.loa],
    ["Beam", beam, setBeam, 6, 30, 0.5, "ft", LIMIT.beam, ok.beam],
    ["Draft", draft, setDraft, 2, 12, 0.5, "ft", LIMIT.draft, ok.draft],
  ]
  return (
    <section id="fit" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="fit-title">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Label n="01">Before you cross</Label>
          <h2 id="fit-title" className="mt-5 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.02em]">Will she fit?</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Set your boat’s numbers. We check them against the limits the marina publishes: 120 ft long, 20 ft of beam, and 7 ft of draft at low tide.</p>
          <div className="mt-10 space-y-8">
            {rows.map(([label, v, set, min, max, step, unit, lim, good]) => (
              <label key={label} className="block">
                <span className="flex items-baseline justify-between">
                  <span className="text-[11px] tracking-[0.2em] text-muted uppercase">{label}</span>
                  <span className={`font-display text-3xl tabular-nums ${good ? "text-ink" : "text-teak"}`}>{v} <span className="text-lg">{unit}</span></span>
                </span>
                <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(Number(e.target.value))} className="mt-3 w-full accent-[#2f6f76]" aria-valuetext={`${v} ${unit}`} />
                <span className="mt-1 flex justify-between text-[12px] text-muted"><span>Limit {lim} {unit}</span><span className="inline-flex items-center gap-1">{good ? <><Check className="size-3.5 text-harbour" aria-hidden /> Within limit</> : <><X className="size-3.5 text-teak" aria-hidden /> Over the limit</>}</span></span>
              </label>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <div className="overflow-hidden rounded-[6px] border border-line bg-paper-2">
            <svg viewBox="0 0 600 420" className="w-full" role="img" aria-label={`Cross-section of a slip: a hull with ${draft} ft draft against the 7 ft low-tide depth line. Illustration, not to scale.`}>
              <rect width="600" height="90" fill="#efe8db" />
              <rect y="90" width="600" height="330" fill="#cfe1df" />
              <rect y="244" width="600" height="176" fill="#b9d2d0" />
              {/* pilings */}
              {[60, 540].map(x => <g key={x}><rect x={x - 9} y="30" width="18" height="390" fill="#8a5a2b" opacity=".85" /><rect x={x - 9} y="30" width="18" height="6" fill="#20242a" opacity=".5" /></g>)}
              <rect x="40" y="70" width="70" height="10" fill="#8a5a2b" />
              {/* surface */}
              <path d="M0 90 Q 75 84 150 90 T 300 90 T 450 90 T 600 90" fill="none" stroke="#2f6f76" strokeWidth="1.5" />
              {/* low tide line */}
              <line x1="0" x2="600" y1="244" y2="244" stroke="#1d4a50" strokeWidth="1.5" strokeDasharray="6 6" />
              <text x="128" y="236" fontFamily="Public Sans, sans-serif" fontSize="12" letterSpacing="1.5" fill="#1d4a50">7 FT AT LOW TIDE</text>
              {/* depth ticks */}
              {Array.from({ length: 13 }, (_, i) => <g key={i}><line x1="572" x2={i % 2 ? 580 : 588} y1={90 + i * ft} y2={90 + i * ft} stroke="#20242a" strokeOpacity=".5" />{i % 2 === 0 && <text x="566" y={94 + i * ft} textAnchor="end" fontFamily="Public Sans, sans-serif" fontSize="10" fill="#5d6166">{i}</text>}</g>)}
              {/* hull */}
              <g>
                <path d={`M ${cx - hullW / 2} 52 L ${cx + hullW / 2} 52 L ${cx + hullW / 2 - 18} 90 Q ${cx + hullW / 4} ${keel - 10} ${cx} ${keel} Q ${cx - hullW / 4} ${keel - 10} ${cx - hullW / 2 + 18} 90 Z`} fill="#f6f3ec" stroke="#20242a" strokeWidth="1.5" />
                <rect x={cx - hullW / 2} width={hullW} y="46" height="8" fill="#20242a" />
                <line y1={keel} y2={keel} x1="150" x2="450" stroke={ok.draft ? "#2f6f76" : "#8a5a2b"} strokeWidth="1" strokeDasharray="2 4" />
              </g>
              <text y={keel + 18} x={cx} textAnchor="middle" fontFamily="EB Garamond, serif" fontStyle="italic" fontSize="18" fill={ok.draft ? "#1d4a50" : "#8a5a2b"}>{draft} ft draft</text>
              <text x="24" y="404" fontFamily="Public Sans, sans-serif" fontSize="10.5" letterSpacing="1.5" fill="#5d6166">ILLUSTRATION, NOT TO SCALE · NOT FOR NAVIGATION</text>
            </svg>
            <div className={`flex flex-col gap-4 border-t border-line p-6 md:flex-row md:items-center md:justify-between md:p-8 ${all ? "bg-paper" : "bg-sand/40"}`} aria-live="polite">
              <p className="font-display text-2xl leading-tight">{all ? "Within the published limits. Ask for a slip." : "Outside a published limit. Call the office to talk it through."}</p>
              <a href={all ? "#request" : TEL} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-px hover:bg-harbour-deep">{all ? "Request a slip" : `Call ${PHONE}`} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-muted">A guide only. Always confirm depths and the approach with the marina and current charts.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="bg-paper-2" aria-labelledby="story-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal className="md:col-span-4">
          <Label n="02">The harbour</Label>
          <h2 id="story-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Since 1976, and rebuilt after Dorian.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">Man-O-War Marina Village has served locals, marina guests and off-island visitors since 1976. Hurricane Dorian tore through Abaco in 2019. The marina rebuilt, and kept serving the boaters who keep coming back.</p>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">It is the only fuelling station on the island, for boats at the dock and carts on the road.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:col-span-8 md:grid-cols-3">
          {[[G1, "Boats tied up along the marina docks"], [G2, "The harbour at Man-O-War Cay"], [G3, "The marina grounds and waterfront"]].map(([src, alt], i) => (
            <Reveal key={src} delay={i * 0.1} className={i === 1 ? "md:mt-16" : i === 2 ? "col-span-2 md:col-span-1 md:mt-32" : ""}>
              <Photo src={src} alt={alt} w={547} h={729} className="aspect-[3/4] rounded-[6px]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function useNassauNow() {
  const [now, setNow] = useState<{ day: number; h: number } | null>(null)
  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Nassau", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date())
      const g = (t: string) => parts.find(p => p.type === t)?.value ?? "0"
      const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"))
      setNow({ day, h: (Number(g("hour")) % 24) + Number(g("minute")) / 60 })
    }
    read(); const id = setInterval(read, 60000); return () => clearInterval(id)
  }, [])
  return now
}

const fmt = (h: number) => { const hr = Math.floor(h); return `${hr > 12 ? hr - 12 : hr}${hr >= 12 ? "pm" : "am"}` }

function OpenNow() {
  const now = useNassauNow()
  const [day, setDay] = useState<number | null>(null)
  const d = day ?? now?.day ?? 1
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const live = day === null || day === now?.day
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="hours-title">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Label n="03">Hours</Label>
          <h2 id="hours-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Open right now?</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Shown in Bahamas time from the marina’s published hours. Everything is open Monday to Saturday, with a midday break.</p>
          <div className="mt-8 flex flex-wrap gap-1" role="group" aria-label="Choose a day">
            {days.map((n, i) => (
              <button key={n} type="button" aria-pressed={d === i} onClick={() => setDay(i)} className={`min-h-11 min-w-11 rounded-full px-3 text-[14px] transition hover:-translate-y-px ${d === i ? "bg-ink text-paper" : "border border-line hover:border-ink/40"}`}>{n}</button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <ul className="border-t border-line">
            {HOURS.map(row => {
              const openDay = d >= 1 && d <= 6
              const isOpen = live && now && openDay && row.spans.some(([a, b]) => now.h >= a && now.h < b)
              return (
                <li key={row.k} className="grid grid-cols-1 gap-3 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-[18px] font-medium">{row.k}</p>
                    <p className="mt-1 text-[15px] text-muted tabular-nums">{openDay ? row.spans.map(([a, b]) => `${fmt(a)} to ${fmt(b)}`).join(", ") : "Closed Sundays"}</p>
                  </div>
                  {/* 6am to 6pm bar */}
                  <div className="flex items-center gap-3">
                    <div className="relative h-2 w-full rounded-full bg-paper-2 sm:w-56" aria-hidden>
                      {openDay && row.spans.map(([a, b]) => <span key={a} className="absolute inset-y-0 rounded-full bg-harbour/70" style={{ left: `${((a - 6) / 12) * 100}%`, width: `${((b - a) / 12) * 100}%` }} />)}
                      {live && now && now.h >= 6 && now.h <= 18 && <span className="absolute -top-1 h-4 w-px bg-ink" style={{ left: `${((now.h - 6) / 12) * 100}%` }} />}
                    </div>
                    <span className={`w-20 text-right text-[12px] tracking-[0.16em] uppercase ${isOpen ? "text-harbour" : "text-muted"}`}>{live && now ? (isOpen ? "Open" : "Closed") : ""}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-[13px] text-muted">Bar shows 6am to 6pm. Dock N’ Dine also posts Saturday evening service on Facebook; call {DINE} to check.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Ashore() {
  const items: [string, string][] = [
    ["Dock N’ Dine", "Waterfront lunch, dinner and ice cream with a harbour-side view, for guests, locals and visitors."],
    ["Office and gift shop", "Custom t-shirts, local art and marine grade dive gear, and everything you want to ask about Man-O-War."],
    ["For marina guests", "Clean restrooms, spacious showers, laundry, a grill area and the pool."],
    ["Fuel and water", "Gas and diesel at the dock and at the roadside pump. Water tanks filled on request through the office."],
  ]
  return (
    <section className="relative bg-harbour-deep text-paper" aria-labelledby="ashore-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-5">
          <Label n="04" light>On the dock</Label>
          <h2 id="ashore-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">Tie up, then walk to lunch.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/70">The cay is two miles long and half a mile wide, with a grocery, the heritage museum and coffee shop, boatbuilding shops, beaches and the ferry.</p>
          <a href="island.html" className="group mt-8 inline-flex items-center gap-2 text-[16px] underline decoration-paper/30 underline-offset-4 hover:decoration-sand">Life on Man-O-War Cay <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <ol className="md:col-span-7">
          {items.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-paper/15 py-6 first:border-t">
              <span className="font-display text-xl text-sand italic">{String(i + 1).padStart(2, "0")}</span>
              <span><span className="block font-display text-2xl transition group-hover:translate-x-1">{t}</span><span className="mt-1 block text-[15px] leading-relaxed text-paper/70">{d}</span></span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const ENQ = {
  slip: { label: "Slip request", fields: [["Boat name", "text"], ["Make and model", "text"], ["Length overall (ft)", "number"], ["Beam (ft)", "number"], ["Draft (ft)", "number"], ["Power: 30 or 50 amp", "text"], ["Arrival", "date"], ["Departure", "date"]] },
  dine: { label: "Dock N’ Dine", fields: [["Date", "date"], ["Party size", "number"], ["Lunch or evening", "text"]] },
  other: { label: "Fuel or a question", fields: [["Subject", "text"], ["Date", "date"]] },
} as const
type K = keyof typeof ENQ

function Request() {
  const [tab, setTab] = useState<K>("slip")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const lines = ENQ[tab].fields.map(([f]) => vals[`${tab}:${f}`] ? `${f}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean) as string[]
  const body = ["Hello Man-O-War Marina,", "", `${ENQ[tab].label}:`, ...lines, "", name ? `Thank you, ${name}` : "Thank you"].join("\n")
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(`${ENQ[tab].label}${vals["slip:Boat name"] && tab === "slip" ? `: ${vals["slip:Boat name"]}` : ""}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="request" className="bg-paper-2" aria-labelledby="req-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <Label n="05">Reservations</Label>
          <h2 id="req-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98]">Request a slip.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Fill in the boat, the dates and the power you need. Your email opens ready to send to the marina office. Or call during office hours, Monday to Saturday.</p>
          <a href={RATES} className="group mt-8 inline-flex items-center gap-2 text-[16px] underline decoration-ink/30 underline-offset-4 hover:decoration-teak">Dockage rates (PDF) <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as K)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper p-1">
              {(Object.keys(ENQ) as K[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">{ENQ[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(ENQ) as K[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-[11px] tracking-[0.2em] text-muted uppercase">Your name</span>
                    <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-2xl outline-none focus:border-harbour" />
                  </label>
                  {ENQ[k].fields.map(([f, type]) => (
                    <label key={f} className="block">
                      <span className="text-[11px] tracking-[0.2em] text-muted uppercase">{f}</span>
                      <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-2xl outline-none focus:border-harbour" />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 rounded-[6px] bg-ink p-6 text-paper md:p-8">
            <p className="text-[11px] tracking-[0.2em] text-sand uppercase">Your request</p>
            <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-paper/80">{lines.length ? lines.join(" · ") : "Your details will appear here as you type."}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={mail} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px"><Mail className="size-4" aria-hidden /> Email the marina office</a>
              <a href={tab === "dine" ? DINE_TEL : TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/30 px-6 transition hover:-translate-y-px hover:border-paper"><Phone className="size-4" aria-hidden /> Call {tab === "dine" ? DINE : PHONE}</a>
            </div>
            <p className="mt-4 text-[13px] text-paper/55">Opens your email app addressed to {EMAIL}. Nothing is sent until you press send.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ: [string, string][] = [
  ["How big a boat can Man-O-War Marina take?", "The marina has 23 slips for vessels up to 120 ft long with beams up to 20 ft, and takes drafts up to 7 ft even at low tide. Staff assist with docking on VHF 16."],
  ["Is there fuel on Man-O-War Cay?", "Yes. The marina is the only fuelling station on the island, with gasoline and diesel at the dock (Mon-Sat 8am-12pm, 1pm-4pm) and at the roadside pump (Mon-Sat 9am-12pm, 2pm-4pm)."],
  ["Can I use the showers and laundry if I am on a mooring?", "No. Showers, laundry, the grill area and power are for marina guests only. The restaurant, gift store and fuel are open to everyone, and the office can fill your water tank on request."],
  ["How do I reserve a slip?", "Call (242) 554-9500 or email mowmv@hotmail.com. The office is open Monday to Saturday, 8am to 12pm and 1pm to 4pm."],
]

function Faq() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4">
        <Label n="06">Questions</Label>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">What boaters ask first.</h2>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left text-[18px] font-medium hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Where() {
  return (
    <section className="border-t border-line" aria-labelledby="where-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-4">
          <Label n="07">Find us</Label>
          <h2 id="where-title" className="mt-5 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02]">On the harbour, Man-O-War Cay.</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">Sea of Abaco, The Bahamas. Hail the marina on VHF 16 on approach.</p>
          <p className="mt-6 text-[17px]"><a href={TEL} className="hover:text-teak">Marina {PHONE}</a></p>
          <p className="text-[17px]"><a href={DINE_TEL} className="hover:text-teak">Dock N’ Dine {DINE}</a></p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-8">
          <iframe title="Map of Man-O-War Marina, Man-O-War Cay, Abaco" loading="lazy" className="aspect-[16/9] w-full rounded-[6px] border border-line" src="https://www.google.com/maps?q=Man-O-War+Marina+Man-O-War+Cay+Abaco+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Home"><Hero /><Specs /><Fit /><Story /><OpenNow /><Ashore /><Request /><Faq /><Where /></Page>)
