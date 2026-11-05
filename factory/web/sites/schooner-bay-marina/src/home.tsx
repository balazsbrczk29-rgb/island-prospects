import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Phone, Mail, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Head, ease, reveal, IMG, HM, HM_TEL, EMAIL, LIMIT, HANDOUT, MAIN, MAIN_TEL } from "./site"

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <h1 id="hero-title" className="sr-only">Schooner Bay Marina, a protected harbour on Great Abaco</h1>
      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10 md:pt-10">
        <div className="flex items-end justify-between gap-6">
          <div className="overflow-hidden" aria-hidden>
            <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.15, duration: 1.2, ease: reveal }} className="font-display text-[clamp(4.4rem,20vw,15.5rem)] md:text-[clamp(4.4rem,15vw,15.5rem)] leading-[0.8] tracking-[-0.045em]">Schooner</motion.p>
          </div>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="hidden shrink-0 pb-4 text-right text-[13px] text-muted lg:block">
            <dt className="cap">Published position</dt>
            <dd className="mt-1 text-ink">N 26° 09.529′ · W 077° 10.633′</dd>
            <dd className="mt-1">Not for navigation</dd>
          </motion.dl>
        </div>
      </div>
      <motion.div className="relative mt-3 h-[34svh] min-h-[220px] md:h-[46svh]" initial={{ clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: "inset(0 0% 0 0%)" }} transition={{ delay: 0.35, duration: 1.5, ease: reveal }}>
        <img src={IMG.pano} alt="The protected harbour at Schooner Bay, Great Abaco" width={1600} height={480} fetchPriority="high" className="size-full object-cover" />
        <span className="absolute bottom-3 left-5 bg-paper px-2 py-1 text-[12px] text-muted md:left-10">The harbour, Schooner Bay</span>
      </motion.div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="overflow-hidden md:col-span-6" aria-hidden>
            <motion.p initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease: reveal }} className="font-display text-[clamp(4.4rem,20vw,15.5rem)] md:text-[clamp(4.4rem,15vw,15.5rem)] leading-[0.86] tracking-[-0.045em] italic text-harbour">Bay.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="pt-2 pb-10 md:col-span-5 md:col-start-8 md:pt-8">
            <p className="text-[18px] leading-relaxed">A protected harbour on Great Abaco's south-east shore, the closest marina to the Hole in the Wall fishing grounds. Fuel, power and a Harbour Master on 16, with a village around the water.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#fit" className="btn btn-ink">Will my boat fit? <ArrowRight className="size-4" aria-hidden /></a>
              <a href="#request" className="btn btn-line">Request a slip</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Band() {
  const items = [
    { k: "Harbour Master", v: HM, s: "Daily 7:30 am to 4:30 pm", href: HM_TEL },
    { k: "Radio", v: "VHF 16", s: "Working channel 77", href: "marina.html#arrive" },
    { k: "Takes vessels to", v: "80 ft", s: "8 ft draft at mean low water", href: "#fit" },
    { k: "Fuel", v: "Diesel and gas", s: "Call ahead to arrange", href: "marina.html#fuel" },
    { k: "Dockage", v: "$3.00 / ft", s: "Daily rate, varies with stay", href: "#request" },
  ]
  return (
    <section aria-label="Key information" className="bg-ink text-paper">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-5">
        {items.map((it, i) => (
          <motion.li key={it.k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8 }} className="border-paper/15 max-lg:border-b lg:border-l lg:first:border-l-0">
            <a href={it.href} className="group block px-5 py-7 transition hover:bg-white/5 md:px-7 md:py-9">
              <span className="cap !text-foam/80">{it.k}</span>
              <span className="mt-2 block whitespace-nowrap font-display text-[clamp(1.7rem,2.3vw,2.4rem)] leading-none">{it.v}</span>
              <span className="mt-2 block text-[14px] text-paper/65">{it.s}</span>
              <span className="mt-3 block h-px w-0 bg-brass transition-all duration-500 group-hover:w-10" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Fit() {
  const [loa, setLoa] = useState(48)
  const [draft, setDraft] = useState(5)
  const [nights, setNights] = useState(3)
  const fitsL = loa <= LIMIT.loa
  const fitsD = draft <= LIMIT.draft
  const tight = fitsL && fitsD && (draft > LIMIT.draft - 1 || loa > LIMIT.loa - 6)
  const ok = fitsL && fitsD
  const est = loa * LIMIT.rate * nights
  const hullW = Math.min(loa, 100) / 100 * 560
  useEffect(() => { window.dispatchEvent(new CustomEvent("fit", { detail: { loa, draft, nights } })) }, [loa, draft, nights])
  return (
    <section id="fit" className="chart-grid bg-paper-2" aria-labelledby="fit-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <Head n="01" k="Will she fit?" id="fit-title" title={<>Check her against<br /><em className="text-harbour">the harbour.</em></>}>
            Set your length and draft. We measure them against the limits the marina publishes: up to 80 feet, 8 feet at mean low water.
          </Head>
        </div>
        <div className="md:col-span-8">
          <Reveal className="rounded-md border border-line bg-paper p-5 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <label className="block"><span className="cap">Length overall</span><span className="mt-1 block font-display text-4xl">{loa} ft</span><input className="range" type="range" min={20} max={110} value={loa} onChange={e => setLoa(+e.target.value)} aria-label="Length overall in feet" /></label>
              <label className="block"><span className="cap">Draft</span><span className="mt-1 block font-display text-4xl">{draft.toFixed(1)} ft</span><input className="range" type="range" min={2} max={12} step={0.5} value={draft} onChange={e => setDraft(+e.target.value)} aria-label="Draft in feet" /></label>
              <label className="block"><span className="cap">Nights</span><span className="mt-1 block font-display text-4xl">{nights}</span><input className="range" type="range" min={1} max={30} value={nights} onChange={e => setNights(+e.target.value)} aria-label="Nights" /></label>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_120px]">
              <svg viewBox="0 0 620 170" className="w-full" role="img" aria-label={`Plan view: a ${loa} foot hull against the 80 foot limit. Illustration.`}>
                <rect x="20" y="40" width={560 * 0.8} height="90" fill="none" stroke="#0f2530" strokeDasharray="5 5" />
                <text x={20 + 560 * 0.8} y="32" textAnchor="end" fontSize="12" fill="#51636a">80 ft published limit</text>
                {Array.from({ length: 11 }).map((_, i) => (
                  <g key={i}><line x1={20 + i * 56} x2={20 + i * 56} y1="140" y2={i % 5 ? 146 : 152} stroke="#0f2530" /><text x={20 + i * 56} y="166" fontSize="10" textAnchor="middle" fill="#51636a">{i * 10}</text></g>
                ))}
                <line x1="20" x2="580" y1="140" y2="140" stroke="#0f2530" />
                <motion.path initial={false} d={`M20 85 L${20 + hullW * 0.78} 52 Q${20 + hullW} 60 ${20 + hullW} 85 Q${20 + hullW} 110 ${20 + hullW * 0.78} 118 Z`} animate={{ d: `M20 85 L${20 + hullW * 0.78} 52 Q${20 + hullW} 60 ${20 + hullW} 85 Q${20 + hullW} 110 ${20 + hullW * 0.78} 118 Z` }} transition={{ duration: 0.5, ease }} fill={fitsL ? "#1d4e6e" : "#a8792f"} opacity=".9" />
                <motion.rect initial={false} x={20 + hullW * 0.35} width={hullW * 0.3} animate={{ x: 20 + hullW * 0.35, width: hullW * 0.3 }} transition={{ duration: 0.5, ease }} y="72" height="26" rx="4" fill="#eef1ef" opacity=".85" />
              </svg>
              <svg viewBox="0 0 120 170" className="h-[170px] w-full" role="img" aria-label={`Depth gauge: ${draft} foot draft against 8 feet at mean low water`}>
                <rect x="40" y="10" width="40" height="150" fill="#cfe3e0" />
                <line x1="30" x2="90" y1={10 + 8 / 12 * 150} y2={10 + 8 / 12 * 150} stroke="#0f2530" strokeWidth="1.5" />
                <text x="92" y={14 + 8 / 12 * 150} fontSize="10" fill="#0f2530">8 ft</text>
                <motion.rect initial={false} height={draft / 12 * 150} animate={{ height: draft / 12 * 150 }} transition={{ duration: 0.5, ease }} x="52" y="10" width="16" fill={fitsD ? "#1d4e6e" : "#a8792f"} />
                <text x="2" y="16" fontSize="10" fill="#51636a">MLW</text>
              </svg>
            </div>
            <div className="mt-8 grid items-end gap-6 border-t border-line pt-6 md:grid-cols-[1fr_auto]">
              <AnimatePresence mode="wait">
                <motion.div key={`${ok}-${tight}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">{!ok ? "Outside the published limits." : tight ? "Inside the limits, close to the edge." : "Inside the published limits."}</p>
                  <p className="mt-2 max-w-lg text-[15px] text-muted">{!ok ? `${!fitsL ? "Longer than 80 ft. " : ""}${!fitsD ? "Deeper than 8 ft at MLW. " : ""}Talk to the Harbour Master before planning a stop.` : tight ? "Call the Harbour Master to plan your arrival before you set out." : `Dockage estimate at the published daily rate: ${loa} ft × $3.00 × ${nights} night${nights > 1 ? "s" : ""}.`}</p>
                </motion.div>
              </AnimatePresence>
              <div className="text-right">
                {ok && <p className="font-display text-5xl leading-none">${est.toLocaleString("en-US")}</p>}
                <a href="#request" className="btn btn-ink mt-4">Request a slip <ArrowRight className="size-4" aria-hidden /></a>
              </div>
            </div>
            <p className="mt-4 text-[12px] text-muted">Estimate only, before power and fuel. Weekly and monthly dockage is quoted by the marina. Not for navigation.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Harbour() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="harbour-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5"><Head n="02" k="The harbour" id="harbour-title" title={<>A harbour with<br />a village around it.</>}>
          The marina calls it what it is: a working, living, recreational harbour, the centre of a village. Owners and passing boats share the basin, and nobody is gated out.
        </Head></div>
        <motion.div className="md:col-span-7" initial={{ clipPath: "inset(10% 10% 10% 10%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true }} transition={{ duration: 1.3, ease: reveal }}>
          <img src={IMG.village} alt="The harbour village at Schooner Bay" width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover" />
          <p className="mt-3 text-[13px] text-muted">The harbour village, Schooner Bay</p>
        </motion.div>
      </div>
      <div className="mt-20 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5 md:col-start-2">
          <p className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12]">Closest marina to <em className="text-harbour">Hole in the Wall</em>, on the run between the Abaco Cays and Nassau.</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <p className="text-[17px] leading-relaxed text-muted">The famed sport fishing grounds are the reason many boats come south. A protected basin is the reason they sleep well when they get here: fuel at the dock, 30 and 50 amp power, showers, Wi-Fi and the General Store a few steps away.</p>
        </Reveal>
      </div>
    </section>
  )
}

const SERVICES = [
  ["Fuel", "Diesel and gas at market rates. Call ahead to arrange."],
  ["Power", "30 and 50 amp shore power."],
  ["Ashore", "Restrooms, showers and Wi-Fi."],
  ["General Store", "Ice, marine supplies, snacks and laundry delivery."],
  ["Pets", "Pet friendly."],
  ["Getting around", "Help with local transport and golf cart rentals."],
  ["Owners", "Covered, secured boat storage for Schooner Bay residents."],
]
function Services() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="svc-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4"><Head dark n="03" k="At the dock" id="svc-title" title={<>What is<br /><em className="text-foam">waiting.</em></>} /></div>
        <ol className="md:col-span-7 md:col-start-6">
          {SERVICES.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ delay: i * 0.05, duration: 0.7, ease }} className="group grid grid-cols-[1fr_1.4fr] gap-6 border-b border-paper/15 py-5 first:border-t">
              <span className="font-display text-2xl transition group-hover:translate-x-1">{t}</span>
              <span className="text-paper/70">{d}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

type T = "slip" | "fuel" | "storage"
function Request() {
  const [tab, setTab] = useState<T>("slip")
  const [v, setV] = useState<Record<string, string>>({ loa: "48", draft: "5" })
  useEffect(() => { const h = (e: Event) => { const d = (e as CustomEvent).detail; setV(s => ({ ...s, loa: String(d.loa), draft: String(d.draft) })) }; window.addEventListener("fit", h); return () => window.removeEventListener("fit", h) }, [])
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV(s => ({ ...s, [k]: e.target.value }))
  const fields: Record<T, [string, string, string?][]> = {
    slip: [["boat", "Vessel name"], ["loa", "LOA (ft)", "number"], ["draft", "Draft (ft)", "number"], ["beam", "Beam (ft)", "number"], ["arrive", "Arrival", "date"], ["depart", "Departure", "date"], ["power", "Power (30 or 50 amp)"], ["name", "Captain or owner"]],
    fuel: [["boat", "Vessel name"], ["fuel", "Diesel or gas"], ["gallons", "Approx. gallons", "number"], ["arrive", "Arriving", "date"], ["name", "Captain or owner"]],
    storage: [["boat", "Vessel"], ["loa", "LOA (ft)", "number"], ["name", "Your name"], ["home", "Your home at Schooner Bay, if any"]],
  }
  const title = { slip: "Slip request", fuel: "Fuel request", storage: "Boat storage enquiry" }[tab]
  const body = fields[tab].map(([k, l]) => `${l}: ${v[k] || "-"}`).concat(v.msg ? [`Note: ${v.msg}`] : []).join("\n")
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`${title}${v.boat ? `: ${v.boat}` : ""}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="request" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="req-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Head n="04" k="Request" id="req-title" title={<>Tell the<br /><em className="text-harbour">Harbour Master.</em></>}>
            Fill in what you know. We write the email to the Harbour Master with every detail in one place. Underway? Call or raise the marina on VHF 16.
          </Head>
          <a href={HM_TEL} className="btn btn-line mt-8"><Phone className="size-4" aria-hidden /> {HM}</a>
        </div>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={t => setTab(t as T)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-md bg-paper-2 p-1">
              {([["slip", "A slip"], ["fuel", "Fuel"], ["storage", "Owner boat storage"]] as const).map(([k, l]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">{l}</TabsTrigger>)}
            </TabsList>
            {(Object.keys(fields) as T[]).map(k => (
              <TabsContent key={k} value={k} className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields[k].map(([fk, l, type]) => <label key={fk} className="field"><span className="cap">{l}</span><input type={type ?? "text"} value={v[fk] ?? ""} onChange={set(fk)} /></label>)}
                  <label className="field sm:col-span-2"><span className="cap">Anything else</span><textarea value={v.msg ?? ""} onChange={set("msg")} /></label>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-8 grid gap-4 rounded-md bg-ink p-6 text-paper md:grid-cols-[1fr_auto] md:items-center">
            <p className="text-[14px] whitespace-pre-line text-paper/75">{body.split("\n").slice(0, 4).join(" · ")}</p>
            <a href={mailto} className="btn bg-paper text-ink"><Mail className="size-4" aria-hidden /> Send the {title.toLowerCase()}</a>
          </div>
          <p className="mt-3 text-[13px] text-muted">Opens your email app, addressed to {EMAIL}. Office hours 7:30 am to 4:30 pm daily.</p>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["How big a boat can Schooner Bay take?", "The marina publishes vessels up to 80 feet with an 8 foot draft at mean low water. Confirm your arrival with the Harbour Master."],
  ["Is there fuel at Schooner Bay?", "Yes. Diesel and gas at market rates. Call ahead to arrange service when possible."],
  ["What does dockage cost?", "Transient dockage is offered daily, weekly and monthly. The published daily rate is $3.00 per foot and varies with the length of stay."],
  ["How do I reach the Harbour Master?", `Call ${HM}, email ${EMAIL}, or raise the marina on VHF 16 (working 77). Open 7:30 am to 4:30 pm daily.`],
  ["How far is the airport?", "Marsh Harbour International (MHH) is about a 30-minute ride. Sandy Point Airstrip (MYAS), for private planes and light jets, is about 20 minutes."],
]
function Questions() {
  return (
    <section className="bg-paper-2" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4"><Head n="05" k="Questions" id="faq-title" title="Before you cast off." /></div>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink/20">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-ink/20">
                <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <a href={HANDOUT} className="ulink mt-8 inline-flex items-center gap-2 text-harbour"><FileText className="size-4" aria-hidden /> Download the marina handout (PDF)</a>
        </Reveal>
      </div>
    </section>
  )
}

function Find() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28" aria-labelledby="find-title">
      <div className="md:col-span-5">
        <Head n="06" k="Find us" id="find-title" title={<>South-east<br />Great Abaco.</>}>
          By road, about 30 minutes from Marsh Harbour International. By sea, on the cruising route between the Abaco Cays and Nassau.
        </Head>
        <a href={MAIN_TEL} className="btn btn-line mt-8">Village main line {MAIN}</a>
      </div>
      <div className="overflow-hidden rounded-md border border-line md:col-span-7">
        <iframe title="Map of Schooner Bay, Great Abaco" loading="lazy" className="h-[420px] w-full" src="https://www.google.com/maps?q=Schooner+Bay,+Abaco,+Bahamas&output=embed" />
      </div>
    </section>
  )
}

mount(<Page current="Will she fit?"><Hero /><Band /><Fit /><Harbour /><Services /><Request /><Questions /><Find /></Page>)
