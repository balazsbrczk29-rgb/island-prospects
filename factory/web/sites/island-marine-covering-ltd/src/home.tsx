import { lazy, Suspense, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, Photo, ease } from "./site"
import { PHONE, TEL, ADDRESS, PHOTOS, LAND, SEA } from "./data"

const Awning = lazy(() => import("./Awning"))

function Hero() {
  const lines = ["Shade and shelter,", "sewn in Nassau."]
  return (
    <section className="relative" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[calc(100svh-120px)] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-between gap-8 px-5 pt-8 pb-12 md:px-10 lg:col-span-7 lg:pt-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Label>Island Marine Covering · Airport Industrial Park · since 1992</Label>
          </motion.div>
          <div>
            <h1 id="hero-title" className="font-display text-[clamp(3rem,7.4vw,8.25rem)] leading-[0.92] font-semibold tracking-[-0.035em] lg:mr-[-18%] lg:pr-6">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.1em]">
                  <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.15, ease: [0.77, 0, 0.175, 1] }}>
                    {i === 1 ? <span className="relative inline-block bg-paper pr-4">{l}</span> : <span className="relative inline-block bg-paper pr-4">{l}</span>}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-8 max-w-[36rem] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-ink/80">
              Cover Up, Island Marine Covering, makes awnings, weather screens, hurricane shutters and marine canvas in its own workshop in Nassau. Every piece customised, from an awning in Old Fort Bay to the enclosure on a yacht.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-8 flex flex-wrap gap-3">
              <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-ink px-6 text-paper transition hover:-translate-y-px hover:bg-canvas active:translate-y-0"><Phone className="size-4" aria-hidden /> Call for a measure</a>
              <a href="services.html" className="group inline-flex min-h-12 items-center gap-2 rounded-[2px] border border-ink/30 px-6 transition hover:-translate-y-px hover:border-ink">See what we make <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            </motion.div>
          </div>
        </div>
        <div className="relative order-first px-5 pt-5 md:px-10 lg:order-none lg:col-span-5 lg:px-0 lg:pt-0">
          <Photo src={PHOTOS.oldFortBay.src} alt={PHOTOS.oldFortBay.alt} eager className="aspect-[16/10] w-full md:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto" />
          <motion.div className="absolute top-0 bottom-0 left-5 hidden w-[1.5px] origin-top text-paper md:left-10 lg:left-6 lg:block" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1, duration: 1.4, ease }} aria-hidden>
            <div className="h-full w-full" style={{ backgroundImage: "linear-gradient(to bottom, currentColor 55%, transparent 0)", backgroundSize: "1.5px 10px" }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items: [string, string, string][] = [
    ["Call for a measure", PHONE, TEL],
    ["The workshop", "Airport Industrial Park, Nassau", "#workshop"],
    ["On land", "Awnings, screens, shutters", "services.html"],
    ["On the water", "Bimini tops, isinglass, upholstery", "services.html#sea"],
  ]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-canvas-deep md:px-8 md:py-8">
              <span className="text-[12px] tracking-[0.16em] text-rope uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i === 0 ? "text-[clamp(1.8rem,2.4vw,2.4rem)]" : "text-[1.35rem]"}`}>{v}</span>
              <span className="mt-3 block h-px w-0 bg-rope transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function LandSea() {
  const [mode, setMode] = useState<"land" | "sea">("land")
  const list = mode === "land" ? LAND : SEA
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="ls-title">
      <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label>01 · Land and sea</Label>
          <h2 id="ls-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.03em]">Two trades under one roof.</h2>
        </div>
        <div className="md:col-span-5 md:justify-self-end">
          <div className="inline-grid grid-cols-2 rounded-[2px] border border-ink p-1" role="tablist" aria-label="Show work for">
            {(["land", "sea"] as const).map(m => (
              <button key={m} role="tab" aria-selected={mode === m} type="button" onClick={() => setMode(m)} className={`relative min-h-11 min-w-32 px-5 text-[15px] transition ${mode === m ? "text-paper" : "text-ink hover:text-canvas"}`}>
                {mode === m && <motion.span layoutId="ls-pill" className="absolute inset-0 rounded-[2px] bg-ink" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{m === "land" ? "On land" : "On the water"}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <ol className="border-t border-ink lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
              {list.map(([t, d], i) => (
                <li key={t} className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7">
                  <span className="font-display text-canvas tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-[1.75rem] leading-tight transition group-hover:translate-x-1 md:text-[2.1rem]">{t}</p>
                    <p className="mt-1.5 text-[16px] text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </motion.div>
          </AnimatePresence>
        </ol>
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {mode === "land" ? (
              <motion.div key="land" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Photo src={PHOTOS.workshop.src} alt={PHOTOS.workshop.alt} className="aspect-[4/3] w-full" />
              </motion.div>
            ) : (
              <motion.div key="sea" className="grid grid-cols-5 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Photo src={PHOTOS.covers.src} alt={PHOTOS.covers.alt} className="col-span-5 aspect-[16/9]" />
                <Photo src={PHOTOS.upholstery.src} alt={PHOTOS.upholstery.alt} className="col-span-3 col-start-3 aspect-[16/9]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const TIMELINE = [
  ["Before", "Henry and Viola Nixon", "Nixon's Upholstery Services dresses the lobbies, halls and rooms of Nassau hotels including The Montague, The British Colonial and The Royal Victorian."],
  ["1992", "One machine, one roll", "Ricky Nixon starts Island Marine Covering with one sewing machine and one roll of canvas, in an old cottage in Montagu."],
  ["Then", "To the Abacos", "The family trade reaches Abaco with Ricky's brother, Kirk."],
  ["Now", "Cover Up", "A manufacturing workshop in the Airport Industrial Park, still learning at awning and marine canvas seminars across North and South America."],
]

function Story() {
  return (
    <section id="story" className="bg-mist" aria-labelledby="story-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label>02 · Our story</Label>
          <h2 id="story-title" className="mt-5 font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1.02] font-semibold tracking-[-0.03em]">A family trade that began in Nassau's grand hotels.</h2>
          <Photo src={PHOTOS.ferry.src} alt={PHOTOS.ferry.alt} className="mt-12 aspect-[16/9] w-full" />
        </Reveal>
        <ol className="lg:col-span-6 lg:col-start-7">
          {TIMELINE.map(([when, t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="relative grid grid-cols-[5.5rem_1fr] gap-x-6 pb-12 last:pb-0">
              <span className="font-display text-[1.35rem] text-canvas">{when}</span>
              <div className="relative border-l border-ink/20 pl-6">
                <span className="absolute top-2.5 -left-[5px] size-[9px] rounded-full bg-canvas" aria-hidden />
                <p className="font-display text-[1.6rem] leading-tight">{t}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{d}</p>
              </div>
            </motion.li>
          ))}
          <li className="mt-12 border-t border-ink/20 pt-8 font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-snug italic text-ink/85">"I started with one sewing machine and one roll of canvas working in an old cottage in Montagu village."</li>
        </ol>
      </div>
    </section>
  )
}

function Design() {
  return (
    <section id="design" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="design-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label>03 · Design an awning</Label>
          <h2 id="design-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.03em]">Try it on your front before you call.</h2>
        </div>
        <p className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Choose the type, the valance and the canvas. The drawing changes as you go, and the line below is what to tell the workshop.</p>
      </Reveal>
      <div className="mt-14"><Suspense fallback={<div className="aspect-[4/3] w-full bg-mist" />}><Awning /></Suspense></div>
    </section>
  )
}

const PLAN = {
  home: { label: "Home or business", intro: "Awnings, retractable awnings and weather screens for a house, shop, restaurant or hotel.", fields: [["What you need", "text"], ["Where it goes (window, door, verandah, terrace)", "text"], ["Rough width in feet", "number"], ["Settlement", "text"]] },
  storm: { label: "Hurricane shutters", intro: "Shutters made for your openings, before the season.", fields: [["Number of openings", "number"], ["House or business", "text"], ["Settlement", "text"]] },
  boat: { label: "Boat canvas", intro: "Bimini tops, isinglass enclosures, covers and upholstery.", fields: [["Boat make and length", "text"], ["What you need", "text"], ["Where the boat is kept", "text"]] },
} as const
type PlanKey = keyof typeof PLAN

function PlanCall() {
  const [tab, setTab] = useState<PlanKey>("home")
  const [vals, setVals] = useState<Record<string, string>>({})
  const conf = PLAN[tab]
  const summary = conf.fields.map(([f]) => vals[`${tab}:${f}`] ? `${f.split(" (")[0]}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean).join(" · ")
  return (
    <section id="plan" className="bg-ink text-paper" aria-labelledby="plan-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <Label light>04 · Plan your call</Label>
          <h2 id="plan-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] font-semibold tracking-[-0.03em]">Have the details ready.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-paper/70">The workshop takes enquiries by phone. Fill in what you know and read the line out when you call.</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as PlanKey)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-[2px] bg-paper/10 p-1">
              {Object.entries(PLAN).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded-[2px] px-4 text-paper/80 data-[state=active]:bg-paper data-[state=active]:text-ink">{c.label}</TabsTrigger>)}
            </TabsList>
            {Object.entries(PLAN).map(([k, c]) => (
              <TabsContent key={k} value={k} className="mt-8">
                <p className="text-[15px] text-paper/65">{c.intro}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {c.fields.map(([f, type]) => (
                    <label key={f} className="block">
                      <span className="text-[12px] tracking-[0.14em] text-paper/60 uppercase">{f}</span>
                      <input type={type} name={f} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-paper/30 bg-transparent font-display text-xl text-paper outline-none transition focus:border-rope" />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 flex flex-col gap-4 rounded-[2px] bg-paper p-6 text-ink md:flex-row md:items-center md:justify-between md:p-7">
            <p className="text-[15px] text-muted">{summary ? <>Read out: <span className="text-ink">{conf.label}. {summary}</span></> : "Your details will appear here."}</p>
            <a href={TEL} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[2px] bg-ink px-6 text-paper transition hover:-translate-y-px hover:bg-canvas"><Phone className="size-4" aria-hidden /> Call {PHONE}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Is Cover Up the same company as Island Marine Covering (IMC)?", "Yes. Island Marine Covering Ltd, IMC, trades as Cover Up from its manufacturing workshop in the Airport Industrial Park, Nassau."],
  ["Is everything made in The Bahamas?", "Yes. Every awning, weather screen, hurricane shutter and piece of marine canvas is customised and manufactured here in Nassau."],
  ["Do you make canvas for boats of every size?", "From a Bimini top on a 10 ft inflatable to an isinglass enclosure on a mega yacht, plus boat upholstery."],
  ["Can I visit the workshop?", `Yes, the workshop invites customers to its facility at ${ADDRESS}. Call ${PHONE} before you come.`],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4">
        <Label>05 · Questions</Label>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] font-semibold tracking-[-0.03em]">Before you call.</h2>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.35rem] hover:no-underline md:text-[1.55rem]">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Workshop() {
  return (
    <section id="workshop" className="border-t border-line bg-mist" aria-labelledby="ws-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-5">
          <Label>06 · The workshop</Label>
          <h2 id="ws-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] font-semibold tracking-[-0.03em]">Sabal Close, Airport Industrial Park.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">Island Marine Covering's own manufacturing facility, where every piece is made. Customers are welcome to come by; call ahead.</p>
          <a href={TEL} className="mt-9 block rounded-[2px] bg-ink p-7 text-paper transition hover:-translate-y-0.5 hover:bg-canvas">
            <span className="text-[12px] tracking-[0.16em] text-rope uppercase">Call for a measure</span>
            <span className="mt-2 block font-display text-[clamp(2rem,3.6vw,3rem)] leading-none">{PHONE}</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[2px] border border-line md:col-span-7">
          <iframe title="Map of Airport Industrial Park, Nassau" loading="lazy" className="h-[420px] w-full md:h-full md:min-h-[480px]" src="https://www.google.com/maps?q=Sabal+Close,+Airport+Industrial+Park,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyBand /><LandSea /><Story /><Design /><PlanCall /><Questions /><Workshop /></Page>)
