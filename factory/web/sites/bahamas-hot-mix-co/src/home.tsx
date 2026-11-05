import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Page, mount, Reveal, Index, ease, PHONE, TEL, EMAIL } from "./site"
import { U, PROJECTS, CAPS, OFFICES } from "./data"
import Section from "./Section"

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-asphalt" aria-labelledby="hero-title">
      <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }} src={U + "2024/02/GBIA-9992-scaled.jpg"} alt="BHM crews rehabilitating runway 06-24 at Grand Bahama International Airport" fetchPriority="high" width={2560} height={1440} className="absolute inset-0 -z-10 size-full object-cover object-[60%_50%]" />
      <div className="mx-auto flex min-h-[calc(100svh-120px)] max-w-[1440px] flex-col justify-end px-5 pt-40 pb-6 md:px-10 md:pb-10">
        <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.3, duration: 1.2, ease: [0.77, 0, 0.175, 1] }} className="max-w-[920px] bg-paper p-6 md:p-10">
          <p className="font-mono text-[12px] text-muted">BHM Co. Ltd. / Bahamas Hot Mix / Airport Industrial Park, Nassau</p>
          <h1 id="hero-title" className="mt-4 font-display text-[clamp(2.6rem,6.2vw,6.4rem)] leading-[0.92] font-bold tracking-[-0.025em] [font-stretch:115%]">Roads, runways and ports, built in The Bahamas.</h1>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-[17px] leading-relaxed text-muted">Bahamian civil infrastructure and materials: hot mix asphalt, ready mix concrete, airports, roads, ports and water. Certified to ISO 9001, 14001 and 45001.</p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a href="#quote" className="group inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-amber px-5 text-[15px] font-medium text-ink transition hover:-translate-y-0.5 active:translate-y-0">Request a quote <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
              <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-[2px] border border-ink/25 px-5 text-[15px] transition hover:-translate-y-0.5 hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="absolute top-5 right-5 bg-paper/90 px-2 py-1 font-mono text-[11px] text-ink md:right-10">Runway 06-24, Grand Bahama International Airport</p>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Call any office", PHONE, TEL],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["Offices", "Nassau, Grand Bahama, Abaco", "#offices"],
    ["Certified", "ISO 9001, 14001, 45001. Labs ISO 17025", "capabilities.html#iso"],
  ]
  return (
    <section className="bg-amber text-ink" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-ink/20 not-first:border-t sm:not-first:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:not-first:border-l">
            <a href={href} className="group block px-5 py-7 transition hover:bg-ink/5 md:px-10 md:py-8">
              <span className="font-mono text-[12px]">{k}</span>
              <span className={`mt-1 block font-display leading-tight font-bold [font-stretch:110%] ${i === 0 ? "text-[clamp(1.6rem,2.2vw,2.2rem)] whitespace-nowrap" : "text-[clamp(1.1rem,1.4vw,1.35rem)]"}`}>{v}</span>
              <span className="mt-3 block h-[2px] w-0 bg-ink transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Mobile() {
  return (
    <section className="bg-asphalt text-paper" aria-labelledby="mob-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Index n="02" light>Family Islands</Index>
          <h2 id="mob-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.02em] [font-stretch:115%]">The plant travels to the runway.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/75">BHM runs three asphalt plants, two of them fully mobile. A mobile plant ships to the island, is set up where the work needs it, and is erected and calibrated within six days of arrival. A mobile materials lab travels with it for on-site testing.</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-px self-end bg-paper/15 lg:col-span-6 lg:col-start-7">
          {[["3", "asphalt plants"], ["2", "fully mobile"], ["6 days", "to erect and calibrate on arrival"]].map(([n, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8, ease }} className="bg-asphalt p-5 md:p-8">
              <p className="font-display text-[clamp(2.4rem,5vw,5rem)] leading-none font-bold text-amber [font-stretch:115%]">{n}</p>
              <p className="mt-3 text-[14px] text-paper/70">{l}</p>
            </motion.div>
          ))}
          <div className="col-span-3 overflow-hidden bg-asphalt"><img src={U + "2024/04/20240411-MarkDaCunha-BHM-0181-web.jpg"} alt="BHM asphalt production on site" width={1600} height={1066} loading="lazy" className="aspect-[16/7] w-full object-cover transition duration-700 hover:scale-[1.03]" /></div>
        </div>
      </div>
    </section>
  )
}

const KINDS = ["All", "Airports", "Roads", "Ports and sites"] as const

function Projects() {
  const [k, setK] = useState<(typeof KINDS)[number]>("All")
  const list = useMemo(() => PROJECTS.filter(p => k === "All" || p.kind === k), [k])
  const [sel, setSel] = useState("gbia")
  const p = PROJECTS.find(x => x.id === sel)!
  return (
    <section id="projects" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36" aria-labelledby="proj-title">
      <Reveal className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6"><Index n="03">Projects</Index>
          <h2 id="proj-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.02em] [font-stretch:115%]">From Bay Street to Hog Cay.</h2></div>
        <div className="flex flex-wrap gap-2 self-end lg:col-span-6 lg:justify-end" role="group" aria-label="Filter projects">
          {KINDS.map(x => <button key={x} type="button" aria-pressed={k === x} onClick={() => setK(x)} className={`min-h-11 rounded-[2px] px-4 text-[15px] transition ${k === x ? "bg-ink text-paper" : "border border-ink/20 hover:border-ink"}`}>{x}</button>)}
        </div>
      </Reveal>
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <div className="relative overflow-hidden bg-paper-2 lg:col-span-7">
          <svg viewBox="0 0 880 620" className="block w-full" role="img" aria-label="Chart of The Bahamas with BHM project locations. Illustration, not to scale.">
            <defs><pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#1a1c1e" strokeOpacity=".07" /></pattern></defs>
            <rect width="880" height="620" fill="url(#grid)" />
            <g fill="#f1f0ec" stroke="#1a1c1e" strokeOpacity=".25">
              <path d="M150 96 C190 80 260 84 330 92 C350 98 350 110 320 112 C270 116 200 112 160 108Z" />
              <path d="M446 30 C460 50 474 80 478 120 C480 150 472 180 462 196 C456 190 462 160 460 130 C456 96 446 64 436 40Z" />
              <path d="M122 220 C130 214 140 218 138 232 C132 240 124 236 122 220Z" />
              <path d="M450 264 C470 256 500 258 510 268 C496 280 466 282 450 274Z" />
              <path d="M340 300 C380 290 420 300 430 330 C440 380 430 450 410 520 C380 530 350 500 340 460 C330 400 330 340 340 300Z" />
              <path d="M560 200 C580 220 610 250 630 290 C640 320 640 350 630 360 C622 340 612 300 590 270 C572 248 556 222 552 206Z" />
              <path d="M540 300 C560 320 590 350 610 380 C630 410 650 420 676 440 C670 446 650 440 630 420 C600 392 570 360 548 330Z" />
            </g>
            <g fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#5d6166">
              <text x="180" y="78">GRAND BAHAMA</text><text x="490" y="60">ABACO</text><text x="96" y="210">BIMINI</text><text x="430" y="300">NEW PROVIDENCE</text><text x="300" y="420">ANDROS</text><text x="640" y="236">ELEUTHERA</text><text x="690" y="470">EXUMA</text>
            </g>
            {PROJECTS.map(x => {
              const on = list.includes(x)
              return (
                <g key={x.id} style={{ opacity: on ? 1 : 0.15, transition: "opacity .4s" }}>
                  <circle cx={x.x} cy={x.y} r={sel === x.id ? 11 : 6} fill={sel === x.id ? "#f0c300" : "#1a1c1e"} stroke="#1a1c1e" strokeWidth="2" style={{ transition: "r .3s" }} />
                </g>
              )
            })}
            <text x="20" y="604" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#5d6166">Illustration, not to scale.</text>
          </svg>
        </div>
        <div className="lg:col-span-5">
          <motion.a key={p.id} href={p.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="group block border border-ink/15 bg-white transition hover:-translate-y-0.5">
            <div className="overflow-hidden bg-paper-2"><img src={p.img} alt={p.name} width={400} height={284} loading="lazy" className="aspect-[400/240] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
            <div className="flex items-start justify-between gap-4 p-5"><div><p className="font-mono text-[12px] text-muted">{p.kind} / {p.island}</p><p className="mt-1 font-display text-xl font-bold">{p.name}</p></div><ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></div>
          </motion.a>
          <ul className="mt-5 max-h-[300px] overflow-auto border-t border-line" data-lenis-prevent>
            {list.map(x => (
              <li key={x.id} className="border-b border-line">
                <button type="button" onClick={() => setSel(x.id)} aria-pressed={sel === x.id} className={`flex min-h-12 w-full items-center justify-between gap-3 py-2.5 text-left text-[15px] transition hover:pl-1 ${sel === x.id ? "font-semibold" : "text-muted hover:text-ink"}`}>
                  <span>{x.name}</span><span className="shrink-0 font-mono text-[11px] text-muted">{x.island}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Caps() {
  return (
    <section className="bg-paper-2" aria-labelledby="caps-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6"><div><Index n="04">Capabilities</Index>
          <h2 id="caps-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.02em] [font-stretch:115%]">No job too big or too small.</h2></div>
          <p className="max-w-sm text-[17px] text-muted">From paving a sidewalk at your home to laying the foundation for an airport.</p></Reveal>
        <ol className="mt-14 border-t border-ink/20">
          {CAPS.map((c, i) => (
            <li key={c.id}><a href={`capabilities.html#${c.id}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-ink/20 py-6 md:grid-cols-[4rem_1fr_1.3fr_auto]">
              <span className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] leading-tight font-bold [font-stretch:110%] transition group-hover:translate-x-1">{c.t}</span>
              <span className="col-span-2 col-start-2 mt-2 text-[16px] text-muted md:col-span-1 md:col-start-3 md:row-start-1 md:mt-0">{c.d}</span>
              <ArrowUpRight className="col-start-3 row-start-1 size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:col-start-4" aria-hidden />
            </a></li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Words() {
  const q = [
    ["Over more than six years that Golder has worked with BHM we have been impressed with their capabilities and professional approach to work. We have found them very responsive, reliable and highly competent.", "Golder Associates"],
    ["Their commitment to quality and understanding of the importance of a cohesive project makes them a great partner.", "Nassau Airport Development Company"],
  ]
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2" aria-label="What clients have said, as published on bhmgroup.com">
      {q.map(([t, a]) => (
        <Reveal key={a}><blockquote className="border-l-4 border-amber pl-6">
          <p className="font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-snug font-medium">{t}</p>
          <footer className="mt-5 font-mono text-[13px] text-muted">{a}, quoted on bhmgroup.com</footer>
        </blockquote></Reveal>
      ))}
    </section>
  )
}

const QT = {
  paving: { label: "Paving and roads", f: [["Location and island", "text"], ["Approximate area", "text"], ["New road, resurfacing or repair?", "text"]] },
  asphalt: { label: "Asphalt supply", f: [["Delivery location", "text"], ["Quantity", "text"], ["Specification or grade", "text"]] },
  concrete: { label: "Ready mix concrete", f: [["Delivery location", "text"], ["Quantity", "text"], ["Strength or mix", "text"]] },
  airport: { label: "Airport or runway", f: [["Airport", "text"], ["Scope", "text"], ["Target dates", "text"]] },
  other: { label: "Water, ports, site work", f: [["Project", "text"], ["Location and island", "text"], ["Scope", "text"]] },
} as const
type Q = keyof typeof QT

function Quote() {
  const [tab, setTab] = useState<Q>("paving")
  const [v, setV] = useState<Record<string, string>>({})
  const body = useMemo(() => {
    const l = ["Hello BHM,", "", `Quote request: ${QT[tab].label}`]
    for (const [f] of QT[tab].f) if (v[`${tab}:${f}`]) l.push(`${f}: ${v[`${tab}:${f}`]}`)
    for (const [kk, lab] of [["co", "Company"], ["name", "Name"], ["reply", "Phone or email"]]) if (v[kk]) l.push(`${lab}: ${v[kk]}`)
    return l.join("\n")
  }, [v, tab])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request: ${QT[tab].label}`)}&body=${encodeURIComponent(body + "\n\n(sent from the website)")}`
  const field = "mt-2 block min-h-12 w-full border-b border-ink/30 bg-transparent text-[18px] outline-none transition focus:border-amber-deep"
  return (
    <section id="quote" className="scroll-mt-20 border-t border-line" aria-labelledby="q-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Index n="05">Request a quote</Index>
          <h2 id="q-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.02em] [font-stretch:115%]">Tell us the job. We price it.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Pick the kind of work and add what you know. Your email opens with the request written out, addressed to {EMAIL}.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={x => setTab(x as Q)}>
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-[2px] bg-paper-2 p-1">
              {(Object.keys(QT) as Q[]).map(x => <TabsTrigger key={x} value={x} className="min-h-11 flex-none rounded-[2px] px-4 text-[14px] data-[state=active]:bg-ink data-[state=active]:text-paper">{QT[x].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(QT) as Q[]).map(x => (
              <TabsContent key={x} value={x} className="mt-8"><div className="grid gap-6 sm:grid-cols-3">
                {QT[x].f.map(([f, t]) => <label key={f} className="block"><span className="text-[14px] text-muted">{f}</span><input type={t} value={v[`${x}:${f}`] ?? ""} onChange={e => setV(s => ({ ...s, [`${x}:${f}`]: e.target.value }))} className={field} /></label>)}
              </div></TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <label className="block"><span className="text-[14px] text-muted">Company</span><input value={v.co ?? ""} onChange={e => setV(s => ({ ...s, co: e.target.value }))} className={field} autoComplete="organization" /></label>
            <label className="block"><span className="text-[14px] text-muted">Your name</span><input value={v.name ?? ""} onChange={e => setV(s => ({ ...s, name: e.target.value }))} className={field} autoComplete="name" /></label>
            <label className="block"><span className="text-[14px] text-muted">Phone or email</span><input value={v.reply ?? ""} onChange={e => setV(s => ({ ...s, reply: e.target.value }))} className={field} /></label>
          </div>
          <div className="mt-10 bg-asphalt p-6 text-paper md:p-8">
            <pre className="max-h-44 overflow-auto font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-paper/85">{body}</pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-amber px-6 font-medium text-ink transition hover:-translate-y-0.5"><Mail className="size-4" aria-hidden /> Email this quote request</a>
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-paper/25 px-6 transition hover:-translate-y-0.5 hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Offices() {
  const [i, setI] = useState(0)
  return (
    <section id="offices" className="scroll-mt-20 bg-paper-2" aria-labelledby="off-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Index n="06">Offices</Index>
          <h2 id="off-title" className="mt-6 font-display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.02em] [font-stretch:115%]">Three islands, one number.</h2>
          <ul className="mt-10 border-t border-ink/20">
            {OFFICES.map((o, k) => (
              <li key={o.name} className="border-b border-ink/20"><button type="button" aria-pressed={i === k} onClick={() => setI(k)} className="group w-full py-5 text-left">
                <p className={`font-display text-2xl font-bold transition group-hover:translate-x-1 ${i === k ? "" : "text-ink/50"}`}>{o.name}</p>
                <p className="mt-1 text-muted">{o.co}. {o.lines.join(", ")}</p>
              </button></li>
            ))}
          </ul>
          <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-asphalt"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[440px] overflow-hidden border border-line lg:col-span-7">
          <iframe key={i} title={`Map of BHM ${OFFICES[i].name}`} loading="lazy" className="h-full min-h-[460px] w-full" src={`https://www.google.com/maps?q=${OFFICES[i].q}&output=embed`} />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page><Hero /><KeyInfo /><section id="section" aria-labelledby="section-title" className="scroll-mt-16"><Section /></section><Mobile /><Projects /><Caps /><Words /><Quote /><Offices /></Page>)
