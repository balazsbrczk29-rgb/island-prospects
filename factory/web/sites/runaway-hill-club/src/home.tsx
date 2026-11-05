import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, ease, reveal, MaskImg, SectionHead, TileStrip } from "./site"
import { IMG, ROOMS, EMAIL, BOOK, LOCAL, LOCAL_TEL, US, US_TEL, money, type House } from "./data"

function Hero() {
  return (
    <section className="px-3 pt-3 md:px-6 md:pt-6" aria-labelledby="hero-title">
      <div className="relative h-[min(60svh,520px)] min-h-[420px] md:h-[calc(100svh-170px)] md:min-h-[600px] overflow-hidden rounded-[22px] bg-paper-2 md:rounded-[30px]">
        <motion.img src={IMG.hero} alt="Runaway Hill Inn on its hill above the ocean, Harbour Island" width={1600} height={1000} fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[60%_center]"
          initial={{ scale: 1.08, clipPath: "inset(6% 6% 6% 6% round 30px)" }} animate={{ scale: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }} transition={{ duration: 1.6, ease: reveal }} />
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease }}
          className="absolute top-6 right-6 hidden w-[320px] md:block rounded-2xl border border-white/50 bg-paper/78 p-5 backdrop-blur-xl md:top-6 md:right-6">
          <p className="label">Room key</p>
          <p className="mt-2 font-display text-2xl leading-tight">Eleven rooms by name, and the Infinity House on the sand.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="#stay" className="btn-primary">Ask about a room</a>
            <a href={BOOK} className="btn-quiet">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 max-w-[94%] rounded-tr-[26px] bg-paper pt-5 pr-6 md:rounded-tr-[36px] md:pt-7 md:pr-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="label pl-1">Harbour Island, Bahamas · a manor from 1946</motion.p>
          <h1 id="hero-title" className="mt-2 font-display text-[clamp(3.4rem,9.4vw,9.6rem)] leading-[0.86] tracking-[-0.035em]">
            {["Runaway", "Hill Inn"].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.05em]">
                <motion.span className={`block ${i ? "pl-[0.6em] italic text-tile" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.35 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span>
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-6 px-2 pt-8 pb-4 md:grid-cols-12 md:px-4">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }} className="max-w-xl text-[18px] leading-relaxed md:col-span-6 md:col-start-7">
          A converted 1946 English manor on one of Harbour Island's highest points, looking down on Pink Sands Beach. Eleven rooms, a tiled pool, a restaurant with the ocean in every window, and a staircase to the sand.
        </motion.p>
        <div className="flex flex-wrap gap-2 md:hidden">
          <a href="#stay" className="btn-primary">Ask about a room</a>
          <a href={BOOK} className="btn-quiet">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [
    { k: "Reservations", v: EMAIL, href: `mailto:${EMAIL}`, big: true },
    { k: "Call", v: `${LOCAL} local`, sub: `${US} US and Canada`, href: LOCAL_TEL },
    { k: "Where", v: "Love Lane and Colebrooke Streets", sub: "Harbour Island, on Pink Sands Beach", href: "island.html#getting-here" },
    { k: "Stays", v: "3 night minimum", sub: "11 rooms and a five-bedroom house", href: "rooms.html" },
  ]
  return (
    <section aria-label="Key information" className="mt-10 bg-tile text-paper">
      <ul className="mx-auto grid max-w-[1440px] md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        {items.map((it, i) => (
          <motion.li key={it.k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.8, ease }} className="border-paper/20 max-md:border-b md:border-l md:first:border-l-0">
            <a href={it.href} className="group block px-5 py-7 transition hover:bg-white/6 md:px-8 md:py-10">
              <span className="text-[12px] tracking-[0.16em] text-glass uppercase">{it.k}</span>
              <span className={`mt-2 block font-display leading-tight break-words ${it.big ? "text-[clamp(1.5rem,2.1vw,2.1rem)]" : "text-xl md:text-[1.4rem]"}`}>{it.v}</span>
              {it.sub && <span className="mt-1 block text-[15px] text-paper/75">{it.sub}</span>}
              <span className="mt-3 block h-px w-0 bg-glass transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const STOPS = [
  { t: "The Main House", d: "A one-and-a-half-storey manor from 1946, with five rooms upstairs and down. The lobby, bar and restaurant look out across the ocean.", img: IMG.restaurant, alt: "The restaurant at Runaway Hill Inn with ocean views", at: 0.02 },
  { t: "The pool and sun deck", d: "A few steps down from the house: the tiled pool and its deck, the patio where evenings start.", img: IMG.pool, alt: "The tiled pool below the Main House", at: 0.36 },
  { t: "The staircase", d: "Down through the garden on the hill, around thirty feet above the beach.", img: IMG.patio, alt: "Guests on the patio at Runaway Hill Inn", at: 0.66 },
  { t: "Pink Sands Beach", d: "175 feet of the inn's own beachfront, with loungers, umbrellas, kayaks and paddle boards waiting.", img: IMG.beach, alt: "Pink Sands Beach seen from Runaway Hill Inn", at: 1 },
]

function Descent() {
  const ref = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [p, setP] = useState(0)
  const [pt, setPt] = useState({ x: 92, y: 96 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", v => {
    setP(v)
    const path = pathRef.current
    if (path) { const L = path.getTotalLength(); const q = path.getPointAtLength(L * Math.min(1, Math.max(0, v))); setPt({ x: q.x, y: q.y }) }
  })
  const active = p < 0.25 ? 0 : p < 0.52 ? 1 : p < 0.8 ? 2 : 3
  return (
    <section id="house" ref={ref} className="relative bg-paper" aria-labelledby="descent-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 md:col-start-1">
          <div className="pt-24 md:pt-36">
            <SectionHead n="01" kicker="The house" id="descent-title" title={<>From the hall<br /><em className="text-tile">to the sand.</em></>}>
              The inn is a walk downhill. Scroll and take it: four stops, about thirty feet, from the manor house to the beach.
            </SectionHead>
          </div>
          <ol className="mt-10">
            {STOPS.map((s, i) => (
              <li key={s.t} className="flex min-h-[62svh] items-center md:min-h-[80svh]">
                <div className={`transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-35"}`}>
                  <p className="font-display text-tile italic">Stop {i + 1} of 4</p>
                  <h3 className="mt-2 font-display text-[clamp(2rem,3.2vw,3rem)] leading-[1.02]">{s.t}</h3>
                  <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-muted">{s.d}</p>
                  <img src={s.img} alt={s.alt} width={705} height={470} loading="lazy" className="mt-6 aspect-[4/3] w-full rounded-2xl object-cover md:hidden" />
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative hidden md:col-span-7 md:col-start-6 md:block">
          <div className="sticky top-[88px] flex h-[calc(100svh-104px)] flex-col justify-center py-6">
            <div className="relative grid h-full grid-rows-[1fr_auto] gap-4">
              <div className="relative overflow-hidden rounded-[26px] bg-paper-2">
                <AnimatePresence mode="popLayout">
                  <motion.img key={active} src={STOPS[active].img} alt={STOPS[active].alt} width={1170} height={780}
                    initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.06 }} animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: reveal }}
                    className="absolute inset-0 size-full object-cover" />
                </AnimatePresence>
                <svg viewBox="0 0 400 240" className="absolute bottom-4 left-4 w-[46%] rounded-2xl bg-paper/85 p-2 backdrop-blur-md" role="img" aria-label="Section drawing of the inn: house at the top, pool, staircase, beach at the bottom. Illustration, not to scale.">
                  <path d="M0 210 Q90 196 120 150 Q150 104 210 92 L400 92 L400 240 L0 240 Z" fill="#a9d0c5" opacity=".0" />
                  <path d="M0 240 L0 70 Q50 64 110 70 Q170 80 210 120 Q250 165 300 190 L400 200 L400 240 Z" fill="#f1e2d9" />
                  <path d="M300 190 Q350 196 400 200 L400 240 L270 240 Z" fill="#e6bcae" />
                  <path d="M330 214 Q365 208 400 206 L400 240 L320 240 Z" fill="#a9d0c5" />
                  <rect x="44" y="40" width="74" height="30" fill="#f8efe9" stroke="#1f2838" strokeWidth="1.2" />
                  <path d="M38 42 L81 18 L124 42" fill="#f8efe9" stroke="#1f2838" strokeWidth="1.2" />
                  <rect x="140" y="84" width="40" height="8" rx="2" fill="#a9d0c5" stroke="#2b5175" />
                  <path d="M200 112 l10 0 l0 8 l10 0 l0 8 l10 0 l0 8 l10 0 l0 8 l10 0 l0 8 l10 0 l0 8 l10 0" fill="none" stroke="#2b5175" strokeWidth="1.2" />
                  <path ref={pathRef} d="M92 66 Q130 72 160 84 Q190 98 205 112 Q240 140 270 168 Q300 192 330 198" fill="none" stroke="#2b5175" strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx={pt.x} cy={pt.y} r="6" fill="#2b5175" stroke="#f8efe9" strokeWidth="2" />
                  <text x="46" y="32" fontSize="10" fill="#1f2838" fontFamily="Be Vietnam Pro">House</text>
                  <text x="140" y="104" fontSize="10" fill="#1f2838" fontFamily="Be Vietnam Pro">Pool</text>
                  <text x="236" y="122" fontSize="10" fill="#1f2838" fontFamily="Be Vietnam Pro">Stairs</text>
                  <text x="300" y="232" fontSize="10" fill="#1f2838" fontFamily="Be Vietnam Pro">Pink Sands Beach</text>
                </svg>
              </div>
              <div className="flex items-center justify-between text-[13px] text-muted">
                <span><span className="text-ink">{STOPS[active].t}</span>, stop {active + 1} of 4</span>
                <span>Drawing is an illustration, not to scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HOUSES: ("All" | House)[] = ["All", "Main House", "Courtyard", "Villas", "Infinity House"]

function Register() {
  const [house, setHouse] = useState<(typeof HOUSES)[number]>("All")
  const list = useMemo(() => ROOMS.filter(r => house === "All" || r.house === house), [house])
  const [sel, setSel] = useState(ROOMS[0].n)
  const room = ROOMS.find(r => r.n === sel) ?? ROOMS[0]
  return (
    <section className="bg-paper-2 grain" aria-labelledby="register-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHead n="02" kicker="The register" id="register-title" title={<>Every room<br />has a name.</>}>
              Choose by house. Each line is a room you can ask for by name, with its bed and the published nightly rate before the 30% tax and gratuity.
            </SectionHead>
          </div>
          <div className="flex flex-wrap items-end gap-2 md:col-span-7 md:justify-end" role="group" aria-label="Filter rooms by house">
            {HOUSES.map(h => (
              <button key={h} type="button" onClick={() => { setHouse(h); const f = ROOMS.find(r => h === "All" || r.house === h); if (f) setSel(f.n) }} aria-pressed={house === h}
                className={`min-h-11 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${house === h ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{h}</button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <ol className="border-t border-ink/15 md:col-span-7">
            <AnimatePresence initial={false}>
              {list.map(r => (
                <motion.li key={r.n} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="border-b border-ink/15">
                  <button type="button" onClick={() => setSel(r.n)} onMouseEnter={() => setSel(r.n)} aria-pressed={sel === r.n}
                    className="group grid w-full grid-cols-[2.6rem_1fr_auto] items-baseline gap-3 py-5 text-left md:grid-cols-[3rem_1.4fr_1fr_auto]">
                    <span className="font-display text-tile">{r.n}</span>
                    <span className={`font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight transition-transform duration-300 group-hover:translate-x-1 ${sel === r.n ? "italic text-tile" : ""}`}>{r.name}</span>
                    <span className="hidden text-[14px] text-muted md:block">{r.house} · {r.bed.split(",")[0]}</span>
                    <span className="text-[15px] tabular-nums">{money(r.rate)}{r.n === "IH" ? " / day" : ""}</span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-paper">
                <AnimatePresence mode="popLayout">
                  <motion.img key={room.n} src={room.img} alt={`${room.name}, room ${room.n} at Runaway Hill Inn`} width={705} height={705} loading="lazy"
                    initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="absolute inset-0 size-full object-cover" />
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={room.n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease }} className="mt-5">
                  <p className="label">{room.house} · {room.bed}</p>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{room.note}</p>
                  <a href={`#stay`} onClick={() => window.dispatchEvent(new CustomEvent("pick-room", { detail: room.n }))} className="ulink mt-4 inline-block text-tile">Ask about {room.name}</a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <Reveal className="mt-12"><a href="rooms.html" className="btn-quiet">See every room and rate <ArrowUpRight className="size-4" aria-hidden /></a></Reveal>
      </div>
    </section>
  )
}

function Voice() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40" aria-label="A guest, in their words">
      <Reveal className="grid gap-8 md:grid-cols-12">
        <p className="label md:col-span-2">A guest wrote</p>
        <blockquote className="md:col-span-9">
          <p className="font-display text-[clamp(1.9rem,3.6vw,3.6rem)] leading-[1.1] tracking-[-0.015em]">“The grounds are enchanting and the house is gorgeous. Windows open with a breeze running through and a breathtaking view of the ocean.”</p>
          <footer className="mt-6 text-[15px] text-muted">Caroline C., quoted on runawayhill.com</footer>
        </blockquote>
      </Reveal>
    </section>
  )
}

type Tab = "room" | "house" | "event"
function Stay() {
  const [tab, setTab] = useState<Tab>("room")
  const [room, setRoom] = useState("1")
  const [nights, setNights] = useState(4)
  const [v, setV] = useState<Record<string, string>>({})
  useEffect(() => { const h = (e: Event) => { const n = (e as CustomEvent).detail as string; if (n === "IH") setTab("house"); else { setTab("room"); setRoom(n) } }; window.addEventListener("pick-room", h); return () => window.removeEventListener("pick-room", h) }, [])
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV(s => ({ ...s, [k]: e.target.value }))
  const r = ROOMS.find(x => x.n === room)!
  const n = Math.max(3, nights || 3)
  const base = tab === "house" ? ROOMS[11].rate * n : r.rate * n
  const total = base * 1.3
  const lines = tab === "event"
    ? [`Event enquiry`, `Occasion: ${v.occasion || "-"}`, `Date: ${v.edate || "-"}`, `Guests: ${v.eguests || "-"}`]
    : [tab === "house" ? "Infinity House" : `Room ${r.n}, ${r.name}`, `Arrive: ${v.arrive || "-"}`, `Nights: ${n}`, `Guests: ${v.guests || "-"}`]
  const body = [...lines, `Name: ${v.name || "-"}`, v.msg ? `Note: ${v.msg}` : ""].filter(Boolean).join("\n")
  const subject = tab === "event" ? "Event enquiry" : `Stay enquiry: ${lines[0]}`
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return (
    <section id="stay" className="bg-ink text-paper" aria-labelledby="stay-title">
      <TileStrip className="block h-5 w-full opacity-90" />
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="text-[12px] tracking-[0.16em] text-glass uppercase"><span className="text-conch">03</span>&ensp;Plan your stay</p>
          <h2 id="stay-title" className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1] tracking-[-0.02em]">Ask for the room<br /><em className="text-glass">you want.</em></h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-paper/75">Pick a room, your dates and party. We write the email to reservations for you, with an estimate from the published rates. Prefer to book now? The inn's own booking page has live dates.</p>
          <a href={BOOK} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/35 px-5 text-[15px] transition hover:-translate-y-px hover:border-paper">Check dates online <ArrowUpRight className="size-4" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={t => setTab(t as Tab)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-white/8 p-1">
              {([["room", "A room"], ["house", "Infinity House"], ["event", "An event"]] as const).map(([k, l]) => (
                <TabsTrigger key={k} value={k} className="min-h-11 rounded-full px-5 text-paper/80 data-[state=active]:bg-paper data-[state=active]:text-ink">{l}</TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 [&_.field_input]:text-paper [&_.field_select]:text-paper [&_.field_textarea]:text-paper [&_.field_input]:border-paper/30 [&_.field_select]:border-paper/30 [&_.field_textarea]:border-paper/30">
              <TabsContent value="room" className="contents">
                <label className="field sm:col-span-2"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Room</span>
                  <select value={room} onChange={e => setRoom(e.target.value)} className="[&>option]:text-ink">
                    {ROOMS.filter(x => x.n !== "IH").map(x => <option key={x.n} value={x.n}>{x.n}. {x.name} ({x.house}, {x.bed.split(",")[0]})</option>)}
                  </select>
                </label>
              </TabsContent>
              <TabsContent value="house" className="contents">
                <p className="text-[15px] text-paper/70 sm:col-span-2">Five bedrooms on the beach: three kings and two rooms of two twins, for families and groups of friends.</p>
              </TabsContent>
              {tab !== "event" ? (<>
                <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Arrival</span><input type="date" value={v.arrive ?? ""} onChange={set("arrive")} /></label>
                <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Nights (3 minimum)</span><input type="number" min={3} value={nights} onChange={e => setNights(parseInt(e.target.value) || 3)} /></label>
                <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Guests</span><input type="number" min={1} value={v.guests ?? ""} onChange={set("guests")} /></label>
              </>) : (<>
                <TabsContent value="event" className="contents">
                  <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Occasion</span><input value={v.occasion ?? ""} onChange={set("occasion")} placeholder="Wedding, anniversary..." /></label>
                  <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Date</span><input type="date" value={v.edate ?? ""} onChange={set("edate")} /></label>
                  <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Guests</span><input type="number" min={1} value={v.eguests ?? ""} onChange={set("eguests")} /></label>
                </TabsContent>
              </>)}
              <label className="field"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Your name</span><input autoComplete="name" value={v.name ?? ""} onChange={set("name")} /></label>
              <label className="field sm:col-span-2"><span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">Anything we should know</span><textarea rows={3} value={v.msg ?? ""} onChange={set("msg")} /></label>
            </div>
          </Tabs>
          <div className="mt-10 grid gap-6 rounded-[24px] bg-paper p-6 text-ink md:grid-cols-[1fr_auto] md:items-end md:p-8">
            <div>
              {tab === "event" ? (
                <p className="text-[15px] text-muted">The inn's events team plans weddings and celebrations. Your details go straight to reservations.</p>
              ) : (<>
                <p className="label">Estimate from published rates</p>
                <p className="mt-2 font-display text-[clamp(2rem,3.4vw,3rem)] leading-none tabular-nums">{money(Math.round(total))}</p>
                <p className="mt-2 text-[14px] text-muted">{n} nights × {money(tab === "house" ? ROOMS[11].rate : r.rate)}, plus 10% gratuity, 10% VAT and 10% resort levy. Confirmed by the inn.</p>
              </>)}
            </div>
            <a href={mailto} className="btn-primary min-h-12 justify-center px-7"><Mail className="size-4" aria-hidden /> {tab === "event" ? "Send the event enquiry" : "Send my room enquiry"}</a>
          </div>
          <p className="mt-4 text-[14px] text-paper/60">Opens your email app, addressed to {EMAIL}. Or call {LOCAL} (local) or {US} (US and Canada).</p>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["How many rooms does Runaway Hill Inn have?", "Eleven rooms across the Main House, the Courtyard and the Villas, plus the Infinity House, a five-bedroom oceanfront home next door."],
  ["Is there a minimum stay?", "Yes, three nights. A cot or an extra person over age 10 is $150."],
  ["What taxes are added to the rates?", "Published rates are before a 10% room gratuity, 10% VAT and 10% resort levy, 30% in all."],
  ["How do I get to Harbour Island?", "Fly to North Eleuthera International Airport, then take a short taxi and water taxi ride across to Harbour Island."],
  ["Can we hold a wedding or event at the inn?", "Yes. The inn hosts special events, planned by its events team. Send an event enquiry with your date and guest count."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <div className="md:col-span-4"><SectionHead n="04" kicker="Questions" id="faq-title" title="Before you write." /></div>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Find() {
  return (
    <section className="border-t border-line bg-paper-2" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <SectionHead n="05" kicker="Find the inn" id="find-title" title={<>Love Lane and<br />Colebrooke Streets.</>}>
            On Harbour Island, above Pink Sands Beach. Reached from North Eleuthera International Airport by taxi and a short water taxi.
          </SectionHead>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href={LOCAL_TEL} className="btn-primary"><Phone className="size-4" aria-hidden /> Call {LOCAL}</a>
            <a href={US_TEL} className="btn-quiet">US {US}</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-line md:col-span-7">
          <iframe title="Map of Runaway Hill Inn, Harbour Island" loading="lazy" className="h-[420px] w-full" src="https://www.google.com/maps?q=Runaway+Hill+Inn,+Harbour+Island,+Bahamas&output=embed" />
        </div>
      </div>
    </section>
  )
}

mount(<Page current="The house"><Hero /><KeyInfo /><Descent /><Register /><Voice /><Stay /><Questions /><Find /></Page>)
