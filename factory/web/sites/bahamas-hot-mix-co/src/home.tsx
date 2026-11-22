import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react"
import { Masthead, Footer, mount, ease } from "./site"
import { IMG, PHONE, TEL, EMAIL, OFFICES, PROJECTS, officeFor } from "./data"
import Atlas from "./Atlas"
import MapAtlas, { WORK, ROUTER_ISLANDS as ISLANDS, type Sel } from "./MapAtlas"

function Approach() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [lg, setLg] = useState(false)
  useEffect(() => { const q = matchMedia("(min-width: 1024px)"); const on = () => setLg(q.matches); on(); q.addEventListener("change", on); return () => q.removeEventListener("change", on) }, [])
  const scale = useTransform(p, v => 1 + v * 0.42)
  const y = useTransform(p, v => `${v * -4}%`)
  const slabY = useTransform(p, v => `${v < 0.12 ? 0 : Math.max(-105, (v - 0.12) * -600)}%`)
  const capX = useTransform(p, v => `${v < 0.45 ? 120 : Math.max(0, 120 - (v - 0.45) * 480)}%`)

  return (
    <section ref={ref} aria-labelledby="approach-h" className="relative lg:h-[230vh]">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div className="relative h-[42vh] min-h-[320px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
          <motion.div className="absolute inset-0 origin-[52%_56%] will-change-transform" style={lg ? { scale, y } : undefined}>
            <motion.img
              src={IMG.hogcayA.src} width={IMG.hogcayA.w} height={IMG.hogcayA.h}
              alt="Aerial view of the Hog Cay airstrip in the Exumas: a new asphalt runway and apron along a narrow cay between turquoise shallows and deep water"
              className="photo object-[50%_55%]" loading="lazy"
              initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease }}
            />
          </motion.div>
          <motion.p className="hidden lg:block absolute right-[calc(var(--pad)+20px)] bottom-[8vh] max-w-[300px] bg-[var(--color-salt)] px-4 py-3 text-sm leading-snug"
            style={{ x: capX }}>
            Hog Cay, Exuma. BHM was main contractor for the runway and apron.
          </motion.p>
        </div>

        <motion.div style={lg ? { y: slabY } : undefined}
          className="relative bg-[var(--color-salt)] lg:absolute lg:left-[var(--pad)] lg:top-0 lg:w-[min(700px,50vw)]">
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true }} transition={{ duration: 1.1, ease, delay: 0.25 }}
            className="px-[var(--pad)] pt-6 pb-8 lg:px-10 lg:pt-9 lg:pb-10">
            <h2 id="approach-h" className="text-[clamp(2.6rem,1.4rem+3.6vw,5rem)] max-w-[13ch]">We pave the runways <br className="hidden sm:block" />you land on.</h2>
            <p className="mt-5 max-w-[46ch] text-base lg:text-[1.125rem] leading-[1.5] text-[var(--color-ink)]">
              Lynden Pindling, Grand Bahama, Marsh Harbour, Bimini, Hog Cay and Norman's Cay, in asphalt from our own plants.<span className="hidden sm:inline"> Then the roads, ports and water works on the islands between.</span>
            </p>
            <div className="mt-6 lg:mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a href="#quote" className="btn">Request a quote</a>
              <a href={`tel:${TEL}`} className="link mono text-sm">{PHONE}</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


/* a hairline that draws when it enters (M9) */
function Rule({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  return <motion.div ref={ref} aria-hidden className={`rule ${dark ? "rule-dark" : ""}`} initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }} transition={{ duration: 1.2, ease }} />
}

type Shot = { src: string; w: number; h: number }
function Photo({ img, alt, className = "", sizes }: { img: Shot; alt: string; className?: string; sizes?: string }) {
  return <img src={img.src} width={img.w} height={img.h} alt={alt} loading="lazy" decoding="async" sizes={sizes} className={`photo ${className}`} style={{ aspectRatio: `${img.w} / ${img.h}` }} />
}

const RUNWAYS = [
  { name: "Lynden Pindling International", island: "New Providence", work: "Runway 10-28 rehabilitation", img: IMG.lpia, alt: "Runway 10-28 at Lynden Pindling International seen from above, freshly resurfaced, threshold markings and the number 10" },
  { name: "Grand Bahama International", island: "Grand Bahama", work: "Runway works, paved at night", img: IMG.gbia, alt: "A BHM paver laying asphalt under floodlights at Grand Bahama International, crew in orange alongside" },
  { name: "Hog Cay", island: "Exuma", work: "Main contractor, runway and apron", img: IMG.hogcayB, alt: "Hog Cay runway and apron from the air, a dark strip of new asphalt along the cay with turquoise water either side" },
  { name: "Norman's Cay", island: "Exuma", work: "Runway chip coat", img: IMG.normans, alt: "Trucks and a loader spreading aggregate on the Norman's Cay runway under a clear sky" },
  { name: "Marsh Harbour International", island: "Abaco", work: "Runway works", img: null, alt: "" },
  { name: "Bimini Airport", island: "Bimini", work: "Runway works", img: null, alt: "" },
  { name: "Odyssey, Nassau and Exuma", island: "New Providence, Exuma", work: "Hangar apron and facilities", img: null, alt: "" },
]

function Runways() {
  const [i, setI] = useState(1)
  const withImg = RUNWAYS.map((r, k) => (r.img ? k : -1)).filter(k => k >= 0)
  const shownIdx = RUNWAYS[i].img ? i : withImg.filter(k => k <= i).pop() ?? 0
  const shown = RUNWAYS[shownIdx]
  return (
    <section id="runways" aria-labelledby="runways-h" className="bg-[var(--color-salt)]">
      {/* threshold: the straight-down shot of LPIA, full bleed */}
      <figure className="relative">
        <div className="h-[62vh] lg:h-[92vh] overflow-hidden">
          <Photo img={IMG.lpia} alt="Runway 10-28 at Lynden Pindling International from above: new asphalt, white threshold bars and the painted number 10" className="h-full object-[50%_62%]" />
        </div>
        <figcaption className="wrap relative lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex lg:justify-end pointer-events-none">
          <div className="bg-[var(--color-salt)] pt-6 lg:px-10 lg:pt-8 lg:pb-2 lg:w-[min(620px,46vw)] pointer-events-auto">
            <p className="mono text-sm text-[var(--color-muted)]">RWY 10-28 · Nassau</p>
            <h2 id="runways-h" className="mt-3 text-2xl max-w-[14ch]">Seven airfields, from Nassau to a cay in the Exumas.</h2>
          </div>
        </figcaption>
      </figure>

      <div className="wrap pt-10 pb-28 lg:pt-20 lg:pb-40 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="max-w-[52ch] text-base lg:text-[1.125rem]">Over three decades of airport construction: Lynden Pindling runway 10-28 and the terminal, Grand Bahama, Marsh Harbour, Bimini, Hog Cay as main contractor, Norman's Cay and both Odyssey FBOs. Asphalt from their own plants, two of them fully mobile, with mobile labs.</p>
          <ol className="mt-12 border-t border-[var(--color-line)]">
            {RUNWAYS.map((r, k) => (
              <li key={r.name} className="border-b border-[var(--color-line)]">
                <button type="button" onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)} aria-pressed={k === i}
                  className="w-full text-left grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-x-6 gap-y-1 py-4 min-h-[64px] items-baseline">
                  <span className={`font-[family-name:var(--font-display)] text-[1.25rem] lg:text-[1.5rem] tracking-[-0.025em] leading-tight transition-colors ${k === i ? "text-[var(--color-petrol)]" : ""}`}>{r.name}</span>
                  <span className="text-xs text-[var(--color-muted)] sm:hidden text-right">{r.island}</span>
                  <span className="col-span-2 sm:col-span-1 text-sm text-[var(--color-muted)]">{r.work}<span className="hidden sm:inline">, {r.island}</span></span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-10">
            <div className="relative overflow-hidden bg-[#CBD3D2]" style={{ aspectRatio: "4 / 3" }}>
              <AnimatePresence initial={false}>
                <motion.img key={shown.name} src={shown.img!.src} width={shown.img!.w} height={shown.img!.h} alt={shown.alt} loading="lazy"
                  className="photo absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} />
              </AnimatePresence>
            </div>
            <p className="mt-3 text-sm"><span className="font-medium">{shown.name}</span>, {shown.island}. {shown.work}.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const INWARD = [
  { group: "The road into town", img: IMG.bay, alt: "Bay Street, Nassau, after BHM's rehabilitation: fresh asphalt, crisp lane markings, traffic and pastel colonial buildings", items: ["Bay Street Road Rehabilitation", "Harrold Road", "Baillou Hill", "Baha Mar West Bay Street & C7 Realignment", "Paradise Island (PITDA) Road Works", "Carnival Grand Cruise Port New Access Road", "Grand Bahama, Eleuthera and North Abaco roads"] },
  { group: "The port and the sea wall", img: IMG.revetment, alt: "A new limestone armour-rock revetment running along the shore between turquoise water and a graded sand road", items: ["Freeport Container Port pavement revitalization", "Arawak Cay Port new port facility", "Marsh Harbour Port & Customs Facility", "Carnival Celebration Cay", "Bahamas Ferries Terminal", "Bay Street Marina and Sea Wall", "Sandypoint Sea Defense"] },
  { group: "The water from the tap", img: IMG.ro, alt: "The Kemps Bay reverse osmosis plant on Andros: a dark water tank above low plant buildings on white limestone", items: ["Kemps Bay RO Plant", "NPWDCo", "Grand Bahama Well Field 1", "Western New Providence Wastewater Treatment Plant", "Water distribution on the Family Islands (IDB funded)", "Shirley Street water and sewage rehabilitation"] },
]

function Inward() {
  return (
    <section aria-labelledby="inward-h" className="bg-[var(--color-white)]">
      <div className="wrap pt-24 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-12 items-end">
          <h2 id="inward-h" className="lg:col-span-7 text-2xl max-w-[16ch]">Then the road into town, the port, and the water from the tap.</h2>
          <p className="lg:col-span-4 lg:col-start-9 text-base max-w-[44ch]">The same crews and the same plants build what a visitor meets after landing, and what residents use every day.</p>
        </div>
      </div>

      {/* one wide photograph at its real size: Freeport Container Port */}
      <figure className="wrap mt-14 lg:mt-20">
        <div className="max-w-[1876px]">
          <Photo img={IMG.port} alt="Freeport Container Port from the air: stacked containers, gantry cranes and the quay BHM repaved, with turquoise water in front" className="w-full max-h-[78vh] object-cover" />
        </div>
        <figcaption className="mt-3 text-sm text-[var(--color-muted)]">Freeport Container Port, Grand Bahama. Pavement revitalization, Phase 1 and Delta 2-4 & GS6.</figcaption>
      </figure>

      <div className="wrap pt-16 pb-28 lg:pt-24 lg:pb-40">
        <Rule />
        {INWARD.map(g => (
          <div key={g.group}>
            <div className="grid gap-6 py-10 lg:py-14 lg:grid-cols-12">
              <h3 className="lg:col-span-3 text-xl max-w-[12ch]">{g.group}</h3>
              <ul className="lg:col-span-5 space-y-2.5 text-base">
                {g.items.map(t => <li key={t}>{t}</li>)}
              </ul>
              <figure className="lg:col-span-4 max-w-[440px] lg:justify-self-end w-full">
                <Photo img={g.img} alt={g.alt} className="w-full" />
              </figure>
            </div>
            <Rule />
          </div>
        ))}
      </div>
    </section>
  )
}

const NUMBERS = [
  { n: "3", line: "asphalt plants, our own, mixing to the job's design." },
  { n: "2", line: "of them fully mobile, shipped to the island that needs them." },
  { n: "6", unit: "days", line: "to erect and calibrate a mobile plant on site." },
]

function Materials() {
  return (
    <section id="materials" aria-labelledby="mat-h" className="bg-[var(--color-ink-deep)] text-[#D7D9DB]">
      <div className="wrap py-24 lg:py-36 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="mat-h" className="text-2xl text-white max-w-[10ch]">We make what we lay.</h2>
          <p className="mt-6 max-w-[44ch]">BHM produces its own asphalt and concrete, tests them in its own laboratories, and modifies bitumen to Performance Grades for the load a road or runway will carry.</p>
          <dl className="mt-14 border-t border-[var(--color-line-dark)]">
            {NUMBERS.map(x => (
              <div key={x.line} className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8.5rem_minmax(0,1fr)] gap-6 items-baseline py-6 border-b border-[var(--color-line-dark)]">
                <dt className="mono text-white text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none tracking-[-0.04em]">{x.n}{x.unit && <span className="text-[1rem] tracking-normal ml-1.5 text-[#A9AEB3]">{x.unit}</span>}</dt>
                <dd className="text-[1.0625rem] leading-snug max-w-[30ch]">{x.line}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a className="link text-white" href="https://bhmgroup.com/expertise/hot-mix-asphalt-supply/">Hot mix asphalt supply</a>
            <a className="link text-white" href="https://bhmconcretebahamas.com/">Ready mix concrete, Grand Bahama</a>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 space-y-10">
          <figure className="max-w-[1000px]">
            <Photo img={IMG.plant} alt="BHM's mobile Ammann asphalt plant set up on a cleared limestone site, drum, conveyor and silos under a blue sky" className="w-full" />
            <figcaption className="mt-3 text-sm text-[#A9AEB3]">One of the two mobile asphalt plants, set up on site.</figcaption>
          </figure>
          <figure className="max-w-[640px] lg:ml-auto">
            <Photo img={IMG.concrete} alt="The BHM ready mix concrete plant in Grand Bahama: cement silos, batching tower and conveyors on a white limestone yard" className="w-full" />
            <figcaption className="mt-3 text-sm text-[#A9AEB3]">The ready mix concrete plant, Grand Bahama.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

const ISO = [
  { std: "ISO 9001:2015", what: "Quality management (QA/QC).", by: "Bureau Veritas" },
  { std: "ISO 14001:2015", what: "Environmental management on every site.", by: "Bureau Veritas" },
  { std: "ISO 45001:2018", what: "Occupational health and safety for crews and the public.", by: "Bureau Veritas" },
  { std: "ISO/IEC 17025:2017", what: "Testing laboratories: the results on your mix design and cores.", by: "IAS" },
]

function Certified() {
  return (
    <section aria-labelledby="iso-h" className="bg-[var(--color-salt)]">
      <div className="wrap py-24 lg:py-36 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="iso-h" className="text-2xl max-w-[11ch]">Audited by third parties.</h2>
          <p className="mt-6 max-w-[38ch]">The certificates engineers and tender boards ask for, kept current by outside auditors.</p>
          <a className="link mt-4" href="https://bhmgroup.com/iso-2/">Why certification matters</a>
        </div>
        <div className="lg:col-span-8">
          <Rule />
          {ISO.map(r => (
            <div key={r.std}>
              <div className="grid gap-2 sm:grid-cols-[13rem_minmax(0,1fr)_9rem] sm:gap-8 py-6 items-baseline">
                <p className="mono text-[1.0625rem] text-[var(--color-ink)]">{r.std}</p>
                <p>{r.what}</p>
                <p className="text-sm text-[var(--color-muted)] sm:text-right">{r.by}</p>
              </div>
              <Rule />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({ sel, set }: { sel: Sel; set: (s: Partial<Sel>) => void }) {
  return (
    <section id="projects" aria-labelledby="proj-h" className="bg-[var(--color-white)]">
      <div className="wrap py-24 lg:py-36">
        <div className="grid gap-8 lg:grid-cols-12 items-end mb-12">
          <h2 id="proj-h" className="lg:col-span-7 text-2xl max-w-[14ch]">{PROJECTS.length} projects, on the record.</h2>
          <p className="lg:col-span-4 lg:col-start-9 max-w-[42ch]">From a high school to a cruise port. Choose a kind of work; each project opens its page on bhmgroup.com.</p>
        </div>
        <Atlas limit={14} cat={sel.cat} setCat={c => set({ cat: c })} />
        <a href="projects.html" className="link mt-8 font-medium">See all {PROJECTS.length} projects</a>
      </div>
    </section>
  )
}


function QuoteDesk({ sel, set }: { sel: Sel; set: (s: Partial<Sel>) => void }) {
  const work = sel.work, island = sel.island
  const setWork = (w: string) => set({ work: w }), setIsland = (i: string) => set({ island: i })
  const [f, setF] = useState({ scope: "", name: "", org: "", reply: "" })
  const office = officeFor(island)
  const body = useMemo(() => [
    `Work: ${work || "(not chosen)"}`, `Island: ${island || "(not chosen)"}`, f.scope && `Scope: ${f.scope}`,
    f.name && `Name: ${f.name}`, f.org && `Company: ${f.org}`, f.reply && `Reply to: ${f.reply}`,
  ].filter(Boolean).join("\n"), [work, island, f])
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request: ${work || "works"}${island ? `, ${island}` : ""}`)}&body=${encodeURIComponent(`Hello BHM,\n\n${body}\n\nFor the ${office.town} office.`)}`
  const chip = (on: boolean) => `min-h-[44px] px-4 border rounded-[var(--r)] text-sm text-left transition-colors duration-150 ${on ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white" : "border-[var(--color-line)] hover:border-[var(--color-ink)] bg-transparent"}`
  const input = "w-full min-h-[48px] bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-petrol)] outline-none py-2 text-base placeholder:text-[#8A8E93]"

  return (
    <section id="quote" aria-labelledby="quote-h" className="bg-[var(--color-salt)]">
      <div className="wrap py-24 lg:py-36 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="quote-h" className="text-2xl max-w-[13ch]">Request a quote, from a driveway to an airfield.</h2>
          <form className="mt-12 space-y-10" onSubmit={e => e.preventDefault()} aria-label="Quote request to BHM">
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-lg tracking-[-0.02em] mb-4">What do you need?</legend>
              <div className="flex flex-wrap gap-2">{WORK.map(w => <button type="button" key={w} aria-pressed={work === w} onClick={() => setWork(w)} className={chip(work === w)}>{w}</button>)}</div>
            </fieldset>
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-lg tracking-[-0.02em] mb-4">On which island?</legend>
              <div className="flex flex-wrap gap-2">{ISLANDS.map(w => <button type="button" key={w} aria-pressed={island === w} onClick={() => setIsland(w)} className={chip(island === w)}>{w}</button>)}</div>
            </fieldset>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="sm:col-span-2 block"><span className="text-sm text-[var(--color-muted)]">Scope, in your words</span>
                <input className={input} value={f.scope} onChange={e => setF({ ...f, scope: e.target.value })} placeholder="Resurface a 400 m access road, start in March" /></label>
              <label className="block"><span className="text-sm text-[var(--color-muted)]">Your name</span>
                <input className={input} autoComplete="name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></label>
              <label className="block"><span className="text-sm text-[var(--color-muted)]">Company or ministry</span>
                <input className={input} autoComplete="organization" value={f.org} onChange={e => setF({ ...f, org: e.target.value })} /></label>
              <label className="sm:col-span-2 block"><span className="text-sm text-[var(--color-muted)]">Email or phone for the reply</span>
                <input className={input} autoComplete="email" value={f.reply} onChange={e => setF({ ...f, reply: e.target.value })} /></label>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <a href={href} className="btn">Email this request</a>
              <a href={`tel:${TEL}`} className="link mono text-sm">or call {PHONE}</a>
            </div>
            <p className="text-xs text-[var(--color-muted)]">Opens your email app with the request written out, addressed to {EMAIL}.</p>
          </form>
        </div>

        <div id="offices" className="lg:col-span-4 lg:col-start-9 scroll-mt-10">
          <h3 className="text-xl">Three offices</h3>
          <div className="mt-6 border-t border-[var(--color-line)]">
            {OFFICES.map(o => {
              const on = o === office && island !== ""
              return (
                <div key={o.town} className="py-6 border-b border-[var(--color-line)]">
                  <p className="font-[family-name:var(--font-display)] text-[1.375rem] tracking-[-0.02em] flex items-center gap-3">
                    {o.town}
                    <AnimatePresence>{on && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-[var(--color-petrol)] font-[family-name:var(--font-sans)] tracking-normal">handles your request</motion.span>}</AnimatePresence>
                  </p>
                  <p className="text-sm mt-1">{o.entity}, {o.line}, {o.island}</p>
                  <p className="mono text-sm text-[var(--color-muted)] mt-1">{o.po}</p>
                </div>
              )
            })}
            <p className="pt-6"><a className="mono link" href={`tel:${TEL}`}>{PHONE}</a></p>
            <p className="pt-6 text-sm">Careers: BHM is hiring graduate civil engineers and equipment operators. <a className="link" href="https://bhmgroup.com/about/careers/">Apply on bhmgroup.com</a></p>
            <p><a className="mono link" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* phone: a thumb dock after the hero, hidden over the quote desk */
function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.getElementById("h1"); const quote = document.getElementById("quote")
    if (!hero || !quote) return
    let pastHero = false, atQuote = false
    const io = new IntersectionObserver(es => { es.forEach(e => { if (e.target === hero) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; else atQuote = e.isIntersecting }); setShow(pastHero && !atQuote) }, { rootMargin: "0px 0px -20% 0px" })
    io.observe(hero); io.observe(quote); return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty("--concept-offset", show ? "64px" : "0px") }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ duration: 0.28, ease }}
          className="lg:hidden fixed inset-x-0 bottom-0 z-30 bg-[var(--color-salt)] border-t border-[var(--color-line)] px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
          <a href={`tel:${TEL}`} className="mono text-sm min-h-[44px] inline-flex items-center">{PHONE}</a>
          <a href="#quote" className="btn !min-h-[44px]">Request a quote</a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Home() {
  const [sel, setSel] = useState<Sel>({ cat: "All", island: "", work: "" })
  const set = (s: Partial<Sel>) => setSel(v => ({ ...v, ...s }))
  return (
    <>
      <Masthead />
      <main id="main">
        <MapAtlas sel={sel} set={set} />
        <Approach />
        <Runways />
        <Inward />
        <Materials />
        <Certified />
        <Projects sel={sel} set={set} />
        <QuoteDesk sel={sel} set={set} />
      </main>
      <Footer />
      <Dock />
    </>
  )
}

mount(<Home />)
