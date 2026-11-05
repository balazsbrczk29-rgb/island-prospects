import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Mail, Phone, MoveHorizontal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Lines, ease, PHONE, TEL, US_PHONE, US_TEL, EMAIL } from "./site"
import Browser from "./Browser"
import { SERVICES, FAQ } from "./data"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[calc(100svh-110px)] max-w-[1400px] items-center gap-12 px-5 pt-10 pb-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-6">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="flex items-center gap-3 text-[14px] text-muted">
            <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[12px] text-paper"><i className="size-1.5 rounded-full bg-gold" />Bahamian owned</span>
            Web design, search and hosting in Freeport
          </motion.p>
          <h1 id="hero-title" className="mt-8 font-display text-[clamp(3.1rem,5.7vw,6.6rem)] leading-[0.92] font-bold tracking-[-0.045em] text-ink">
            <Lines className="lg:whitespace-nowrap" lines={["Getting Bahamian", "businesses found", "since 1996."]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }} className="mt-8 max-w-[34rem] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-muted">
            BVG Design Services designs, hosts and promotes websites for Bahamian businesses from its headquarters in Freeport, Grand Bahama. We started with our own Bahamas Vacation Guide, and we still look after it.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-3">
            <a href="#start" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[16px] text-paper transition duration-200 hover:-translate-y-0.5 hover:bg-aqua active:translate-y-0">Start a website request <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-[16px] text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink active:translate-y-0"><Phone className="size-4" aria-hidden /> Call the Freeport office</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30, rotate: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.2, ease }} className="lg:col-span-5">
          <Browser />
        </motion.div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items: [string, string, string][] = [
    ["Freeport office", PHONE, TEL],
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["US line", US_PHONE, US_TEL],
    ["Offices", "Freeport HQ, Nassau and Abaco", "#offices"],
  ]
  return (
    <section className="bg-gold text-ink" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1400px] sm:grid-cols-2 lg:grid-cols-[1.2fr_1.3fr_1fr_1.2fr]">
        {items.map(([k, v, href], i) => (
          <li key={k} className="border-ink/15 not-first:border-t sm:not-first:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:not-first:border-l">
            <a href={href} className="group block px-5 py-6 transition hover:bg-ink/5 md:px-10 md:py-8">
              <span className="text-[13px] text-ink/70">{k}</span>
              <span className={`mt-1 block font-display font-bold tracking-[-0.02em] ${i === 0 ? "whitespace-nowrap text-[clamp(1.8rem,2.6vw,2.5rem)]" : "text-[clamp(1.2rem,1.6vw,1.5rem)]"} leading-tight`}>{v}</span>
              <span className="mt-3 block h-[2px] w-0 bg-ink transition-all duration-500 group-hover:w-12" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const ISLANDS = ["Freeport / Lucaya", "Nassau / Paradise Island", "Abaco", "Exuma", "Eleuthera", "Long Island", "Bimini", "Andros"]

function Story() {
  const [pos, setPos] = useState(52)
  return (
    <section id="story" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="story-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="01">Since 1996</Label>
          <h2 id="story-title" className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">Two founders, one guide, thirty years online.</h2>
          <div className="mt-7 max-w-md space-y-4 text-[17px] leading-relaxed text-muted">
            <p>In mid-1996 two entrepreneurs split the job of getting online: one took the graphics, the other the code. Their first multi-page site, the Bahamas Vacation Guide, climbed to the top of the search engines.</p>
            <p>Businesses started asking to be included and to have pages made for them. The studio got its name from the guide: BVG stands for Bahamas Vacation Guide.</p>
          </div>
          <p className="mt-8 flex items-center gap-2 text-[14px] text-ink"><MoveHorizontal className="size-4 text-aqua" aria-hidden /> Drag the line to compare a 1996 page with today.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-ink/10 select-none sm:aspect-[16/11]">
            {/* today */}
            <div className="absolute inset-0 flex flex-col bg-paper-2 p-5 md:p-9">
              <div className="flex items-center justify-between text-[13px]"><b className="font-display text-ink">Bahamas Vacation Guide</b><span className="hidden gap-4 text-muted sm:flex"><span>Islands</span><span>Stay</span><span>Do</span></span></div>
              <p className="mt-auto max-w-[16ch] font-display text-[clamp(2rem,5vw,4.6rem)] leading-[0.9] font-bold tracking-[-0.04em] text-ink">Where you want to go before you go.</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ISLANDS.slice(0, 6).map(i => <li key={i} className="rounded-full bg-white px-3 py-1.5 text-[12px] text-ink md:text-[13px]">{i}</li>)}
              </ul>
              <span className="absolute top-5 right-5 rounded-full bg-aqua px-3 py-1 text-[12px] text-white md:top-9 md:right-9">Today</span>
            </div>
            {/* 1996 */}
            <div className="absolute inset-0 bg-[#ffffff] p-5 [font-family:'Times_New_Roman',Times,serif] md:p-9" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden={pos < 5}>
              <div className="flex items-center gap-3 border-b-4 border-double border-[#808080] pb-3">
                <img src="https://www.bvgdesign.com/logobvg5bb.jpg" alt="BVG Design logo, from bvgdesign.com" width="96" height="48" className="h-10 w-auto bg-[#c0c0c0]" loading="lazy" />
                <b className="text-[18px] text-[#000080] md:text-[24px]">Bahamas Vacation Guide</b>
              </div>
              <p className="mt-3 text-center text-[14px] font-bold text-[#800000] md:text-[17px]">We are where you want to go before you go to The Bahamas.</p>
              <table className="mx-auto mt-4 border-separate border-spacing-1 text-[13px] md:text-[15px]"><tbody>
                {[0, 2, 4, 6].map(r => (
                  <tr key={r}>{ISLANDS.slice(r, r + 2).map(i => <td key={i} className="border-2 border-[#dfdfdf_#808080_#808080_#dfdfdf] bg-[#c0c0c0] px-3 py-1 text-[#0000ee] underline">{i}</td>)}</tr>
                ))}
              </tbody></table>
              <p className="mt-4 text-center text-[12px] text-[#000]">Best viewed at 800 x 600. Last updated by hand.</p>
              <span className="absolute top-5 left-5 bg-[#000080] px-2 py-0.5 text-[12px] text-white md:top-9 md:left-9">1996</span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${pos}%` }} aria-hidden>
              <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-paper shadow-lg"><MoveHorizontal className="size-4" /></span>
            </div>
            <input type="range" min={0} max={100} value={pos} onChange={e => setPos(+e.target.value)} aria-label="Compare a 1996 page with today" className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
          </div>
          <p className="mt-3 text-[12px] text-muted">Recreation in the style of each era. The guide itself is still online at bahamasvacationguide.com.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-ink text-paper" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label n="02" light>What we do</Label>
            <h2 id="services-title" className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">Six ways we put you online.</h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end lg:col-span-5 lg:col-start-8">
            <p className="text-[17px] leading-relaxed text-paper/70">Personal service, and no account too small or too large. Every job is quoted for what you need.</p>
          </Reveal>
        </div>
        <ul className="mt-16 border-t border-paper/15">
          {SERVICES.map((s, i) => (
            <li key={s.id} onMouseEnter={() => setOpen(i)} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-paper/15 py-6 md:grid-cols-[4rem_1fr_1.3fr_auto] md:py-8">
              <span className="font-display text-[15px] text-gold">{String(i + 1).padStart(2, "0")}</span>
              <button type="button" onClick={() => setOpen(i)} aria-expanded={open === i} className={`text-left font-display text-[clamp(1.6rem,3vw,2.8rem)] leading-none font-bold tracking-[-0.03em] transition duration-300 group-hover:translate-x-1 ${open === i ? "text-paper" : "text-paper/55"}`}>{s.t}</button>
              <a href={`services.html#${s.id}`} className="col-start-3 row-start-1 inline-flex size-11 items-center justify-center self-center rounded-full border border-paper/20 transition hover:-translate-y-0.5 hover:border-gold hover:text-gold md:col-start-4" aria-label={`${s.t}, details`}><ArrowUpRight className="size-4" /></a>
              <motion.p initial={false} animate={{ opacity: open === i ? 1 : 0.4 }} transition={{ duration: 0.5, ease }} className="col-span-2 col-start-2 overflow-hidden pt-3 text-[16px] leading-relaxed text-paper/75 md:col-span-1 md:col-start-3 md:row-start-1 md:pt-0">{s.d}</motion.p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const OFFICES = [
  { id: "freeport", name: "Freeport", tag: "Headquarters", x: 392, y: 136, lines: ["Smith's Point, Freeport, Grand Bahama", "P.O. Box F-43652", `Tel and fax ${PHONE}`], href: TEL },
  { id: "abaco", name: "Abaco", tag: "Office", x: 712, y: 150, lines: ["Office on Abaco, listed on bvgdesign.com", "Reach it through the Freeport office"], href: TEL },
  { id: "nassau", name: "Nassau", tag: "Office", x: 652, y: 432, lines: ["Office in Nassau, listed on bvgdesign.com", "Reach it through the Freeport office"], href: TEL },
  { id: "us", name: "Fort Lauderdale", tag: "US line and mailing", x: 96, y: 222, lines: ["5115 NW 17th Terrace, Hangar 39a", "Fort Lauderdale, FL 33309", `US line ${US_PHONE}`], href: US_TEL },
]

function Offices() {
  const [sel, setSel] = useState("freeport")
  const o = OFFICES.find(x => x.id === sel)!
  return (
    <section id="offices" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36" aria-labelledby="offices-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="03">Offices</Label>
          <h2 id="offices-title" className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">Run from Freeport, working across the islands.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">A Bahamian-owned firm with its headquarters on Grand Bahama, offices in Nassau and Abaco, and a US line and mailing address in Fort Lauderdale. Tap a point on the chart.</p>
          <div className="mt-10 rounded-[22px] border border-line bg-white p-6">
            <p className="text-[13px] text-aqua">{o.tag}</p>
            <p className="mt-1 font-display text-3xl font-bold tracking-[-0.03em]">{o.name}</p>
            <ul className="mt-3 space-y-1 text-[15px] text-muted">{o.lines.map(l => <li key={l}>{l}</li>)}</ul>
            <a href={o.href} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] text-paper transition hover:-translate-y-px hover:bg-aqua"><Phone className="size-4" aria-hidden /> Call</a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-[22px] bg-aqua-soft">
            <svg viewBox="0 0 880 560" className="block w-full" role="img" aria-label="Chart of the northern Bahamas and South Florida showing BVG Design offices in Freeport, Abaco and Nassau and the US line in Fort Lauderdale. Illustration, not to scale.">
              <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#007f88" strokeOpacity=".12" /></pattern></defs>
              <rect width="880" height="560" fill="url(#g)" />
              <path d="M0 0 H96 C110 80 118 160 112 240 C106 330 92 430 70 560 H0Z" fill="#f6f5f1" />
              <path d="M318 112 C350 98 420 104 470 112 C510 118 540 120 548 132 C520 142 470 140 420 138 C380 136 340 136 318 128Z" fill="#f6f5f1" />
              <path d="M688 58 C704 70 716 96 722 128 C728 168 724 210 712 250 C704 262 698 256 700 240 C708 200 708 160 700 128 C694 100 684 80 680 64Z" fill="#f6f5f1" />
              <path d="M640 72 C660 70 676 76 684 84 C668 88 650 86 640 80Z" fill="#f6f5f1" />
              <path d="M614 426 C630 418 668 420 686 428 C670 440 632 442 614 434Z" fill="#f6f5f1" />
              <path d="M470 400 C500 392 560 396 590 410 C604 440 600 500 592 560 H470 C462 500 462 440 470 400Z" fill="#f6f5f1" />
              <path d="M770 310 C790 330 812 360 840 380 C860 396 872 430 868 470 C860 480 852 470 852 452 C850 420 830 400 806 384 C784 368 768 340 762 316Z" fill="#f6f5f1" />
              <circle cx="266" cy="294" r="6" fill="#f6f5f1" /><circle cx="270" cy="312" r="4" fill="#f6f5f1" />
              <g fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="#5a6161">
                <text x="20" y="300">Florida</text><text x="430" y="96">Grand Bahama</text><text x="736" y="90">Abaco</text>
                <text x="500" y="470">Andros</text><text x="610" y="462">New Providence</text><text x="800" y="300">Eleuthera</text><text x="282" y="300">Bimini</text>
              </g>
              {OFFICES.filter(x => x.id !== "freeport").map(x => (
                <motion.path key={x.id} d={`M392 136 Q ${(392 + x.x) / 2} ${Math.min(136, x.y) - 70} ${x.x} ${x.y}`} fill="none" stroke="#101515" strokeWidth="1.5" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease, delay: 0.3 }} />
              ))}
              {OFFICES.map(x => (
                <g key={x.id} transform={`translate(${x.x} ${x.y})`}>
                  <circle r={sel === x.id ? 22 : 14} fill={sel === x.id ? "#f2c230" : "#ffffff"} stroke="#101515" strokeWidth="1.5" style={{ transition: "r .4s cubic-bezier(.16,1,.3,1)" }} />
                  <circle r="5" fill="#101515" />
                </g>
              ))}
              <text x="20" y="544" fontFamily="Instrument Sans, sans-serif" fontSize="12" fill="#5a6161">Illustration, not to scale.</text>
            </svg>
            {OFFICES.map(x => (
              <button key={x.id} type="button" onClick={() => setSel(x.id)} aria-pressed={sel === x.id} className={`absolute -translate-x-1/2 translate-y-4 rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap transition duration-300 hover:-translate-y-0 ${sel === x.id ? "bg-ink text-paper" : "bg-white text-ink hover:bg-gold"}`} style={{ left: `${(x.x / 880) * 100}%`, top: `${(x.y / 560) * 100}%` }}>
                {x.name}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const ISLAND_OPTS = ["Grand Bahama", "New Providence", "Abaco", "Exuma", "Eleuthera", "Another island", "Outside The Bahamas"]
const TYPES = {
  new: { label: "New site", subject: "New website request", fields: [["What does your business do?", "text"], ["Pages you think you need", "number"], ["Do you have a domain name?", "text"]] },
  redesign: { label: "Redesign", subject: "Redesign or takeover", fields: [["Your current website address", "url"], ["What is not working?", "text"]] },
  seo: { label: "Get found", subject: "Search optimization and promotion", fields: [["Your website address", "url"], ["What should people find you for?", "text"]] },
  hosting: { label: "Hosting", subject: "Hosting and domain", fields: [["Domain you want", "text"], ["Moving from another host?", "text"]] },
  ads: { label: "Advertising", subject: "Advertising campaign", fields: [["What are you promoting?", "text"], ["Print, video or both?", "text"]] },
} as const
type T = keyof typeof TYPES

function Start() {
  const [tab, setTab] = useState<T>("new")
  const [vals, setVals] = useState<Record<string, string>>({ island: "Grand Bahama" })
  const set = (k: string, v: string) => setVals(s => ({ ...s, [k]: v }))
  const conf = TYPES[tab]
  const body = useMemo(() => {
    const lines = ["Hello BVG Design,", "", `Request: ${conf.label}`]
    for (const [f] of conf.fields) if (vals[`${tab}:${f}`]) lines.push(`${f} ${vals[`${tab}:${f}`]}`)
    for (const [k, l] of [["business", "Business"], ["island", "Island"], ["name", "Name"], ["contact", "Phone or email"]] as const) if (vals[k]) lines.push(`${l}: ${vals[k]}`)
    return lines.join("\n")
  }, [vals, tab, conf])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(conf.subject)}&body=${encodeURIComponent(body + "\n\n(sent from the website)")}`
  const field = "mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent text-[18px] outline-none transition focus:border-aqua"
  return (
    <section id="start" className="scroll-mt-24 bg-paper-2" aria-labelledby="start-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Label n="04">Start a project</Label>
          <h2 id="start-title" className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">Tell us what you need. We quote it.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Choose the kind of job, add a few details, and your email opens with the request written out. Simple pages are normally ready within 24 hours of the order.</p>
          <a href={TEL} className="mt-8 inline-flex items-center gap-2 text-[16px] text-ink underline decoration-aqua decoration-2 underline-offset-4 hover:decoration-ink">Rather talk? Call {PHONE}</a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as T)}>
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-full bg-paper p-1">
              {(Object.keys(TYPES) as T[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-4 text-[14px] data-[state=active]:bg-ink data-[state=active]:text-paper">{TYPES[k].label}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(TYPES) as T[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {TYPES[k].fields.map(([f, type]) => (
                    <label key={f} className="block"><span className="text-[14px] text-muted">{f}</span>
                      <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => set(`${k}:${f}`, e.target.value)} className={field} />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="block"><span className="text-[14px] text-muted">Business name</span><input value={vals.business ?? ""} onChange={e => set("business", e.target.value)} className={field} autoComplete="organization" /></label>
            <label className="block"><span className="text-[14px] text-muted">Island</span>
              <select value={vals.island} onChange={e => set("island", e.target.value)} className={field}>{ISLAND_OPTS.map(i => <option key={i}>{i}</option>)}</select>
            </label>
            <label className="block"><span className="text-[14px] text-muted">Your name</span><input value={vals.name ?? ""} onChange={e => set("name", e.target.value)} className={field} autoComplete="name" /></label>
            <label className="block"><span className="text-[14px] text-muted">Phone or email for the reply</span><input value={vals.contact ?? ""} onChange={e => set("contact", e.target.value)} className={field} /></label>
          </div>
          <div className="mt-10 rounded-[22px] bg-ink p-6 text-paper md:p-8">
            <p className="text-[13px] text-gold">Your request</p>
            <pre className="mt-3 max-h-48 overflow-auto font-sans text-[15px] leading-relaxed whitespace-pre-wrap text-paper/85">{body}</pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-[16px] text-ink transition hover:-translate-y-0.5 active:translate-y-0"><Mail className="size-4" aria-hidden /> Email this request</a>
              <span className="text-[13px] text-paper/60">Opens your email app, addressed to {EMAIL}.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12" aria-labelledby="faq-title">
      <Reveal className="lg:col-span-4">
        <Label n="05">Questions</Label>
        <h2 id="faq-title" className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">What clients ask first.</h2>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-semibold tracking-[-0.02em] hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function FindUs() {
  return (
    <section className="border-t border-line" aria-labelledby="find-title">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <Label n="06">Find us</Label>
          <h2 id="find-title" className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">Smith's Point, Freeport.</h2>
          <a href={TEL} className="mt-10 block rounded-[22px] bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-aqua">
            <span className="text-[13px] text-gold">Freeport office, tel and fax</span>
            <span className="mt-2 block font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-none font-bold tracking-[-0.03em]">{PHONE}</span>
            <span className="mt-3 block text-paper/70">P.O. Box F-43652, Freeport, Grand Bahama</span>
          </a>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <a href={`mailto:${EMAIL}`} className="rounded-[22px] border border-line p-6 transition hover:-translate-y-0.5 hover:border-ink"><span className="text-[13px] text-muted">Email</span><span className="mt-1 block font-display text-xl font-bold">{EMAIL}</span></a>
            <a href={US_TEL} className="rounded-[22px] border border-line p-6 transition hover:-translate-y-0.5 hover:border-ink"><span className="text-[13px] text-muted">US line</span><span className="mt-1 block font-display text-xl font-bold">{US_PHONE}</span></a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden rounded-[22px] border border-line">
          <iframe title="Map of Smith's Point, Freeport, Grand Bahama" loading="lazy" className="h-full min-h-[420px] w-full" src="https://www.google.com/maps?q=Smith%27s+Point,+Freeport,+Grand+Bahama&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Since 1996"><Hero /><KeyInfo /><Story /><Services /><Offices /><Start /><Questions /><FindUs /></Page>)
