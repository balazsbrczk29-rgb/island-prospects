import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue, AnimatePresence } from "motion/react"
import { ArrowUpRight, MessageCircle, Minus, Phone, Plus } from "lucide-react"
import { C, Page, Photo, QUOTE_TEXT, chairSet, ease, img, mount, waLink } from "./site"

/* ---------- 1. Hero: the needle in the cloth ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, (v) => `${v * 12}%`)
  const lines = ["From worn to wow,", "one stitch at a time."]
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-cream-2" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        <motion.picture className="block h-full w-full" initial={{ scale: 1.07 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
          <source media="(max-width: 767px)" srcSet={img("hero-stitch-m")} />
          <Photo priority src={img("hero-stitch")} alt="A sewing machine needle stitching a piped seam into deep navy upholstery cloth" className="h-full w-full object-[62%_50%] md:object-[70%_40%]" />
        </motion.picture>
      </motion.div>

      <div className="relative mx-auto flex h-full max-w-[1320px] flex-col px-5 pb-8 pt-6 md:px-12 md:pb-12 md:pt-9">
        <div className="flex items-start justify-between gap-6">
          <p className="display pt-2 text-[1.3rem] md:pt-0 md:text-[1.45rem]">Slim Upholstery</p>
          <a href={C.tel} className="tnum t-small inline-flex min-h-[44px] items-center font-bold underline decoration-ink/30 underline-offset-[5px] hover:decoration-ink md:min-h-0">{C.phone}</a>
        </div>

        <div className="mt-[7svh] max-w-[34rem] md:my-auto md:max-w-[38rem] md:pb-[14svh]">
          <h1 id="hero-title" className="display t-h1">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" initial={{ y: "104%" }} animate={{ y: 0 }} transition={{ delay: 0.25 + i * 0.12, duration: 1.1, ease }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.9 }} className="mt-5 max-w-[27rem] text-[1.08rem] leading-relaxed text-ink/85 md:mt-6 md:text-[1.25rem]">
            Sofas, dining seats, boat cushions, car seats and church pews, re-covered at our workshop on Claridge Road, Nassau.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.9 }} className="mt-8 flex flex-wrap items-center gap-3">
            <a href={waLink(QUOTE_TEXT)} className="btn btn-primary"><MessageCircle className="size-[18px]" strokeWidth={1.9} aria-hidden /> WhatsApp a free quote</a>
            <a href="#layers" className="hidden min-h-[44px] items-center px-2 font-bold underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink md:inline-flex">See how a chair is rebuilt</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 2. The object study: one chair, five layers ---------- */
const LAYERS = [
  { key: "worn", name: "Before", title: "The chair you nearly threw out", body: "Faded cloth, a split seat, foam pushing through. The frame underneath is usually sound. Bring it to Claridge Road before you replace it.", alt: "A mahogany dining chair with a torn, faded floral seat and foam showing through" },
  { key: "frame", name: "Frame", title: "Back to bare wood", body: "Everything comes off. Old tacks out, joints checked, so nothing new goes onto a weak frame.", alt: "The same chair stripped to its bare hardwood frame" },
  { key: "webbing", name: "Webbing and springs", title: "A new base under the seat", body: "Webbing woven tight and tacked down, springs tied in, so the seat sits level and firm.", alt: "The same chair with interlaced jute webbing and five coil springs tied down with twine" },
  { key: "foam", name: "Foam", title: "Fresh foam, cut\u00a0to\u00a0fit", body: "New foam shaped to the seat and wrapped in batting, so the cloth lies smooth with no hard edges.", alt: "The same chair with a square-cut cream foam block on the seat" },
  { key: "fabric", name: "Cloth", title: "Same chair, new look", body: "The fabric you chose, pulled taut, stapled underneath and finished by hand. One stitch at a time.", alt: "The same chair finished in deep navy cloth with piping and brass nail heads" },
]

// Scroll map: the stage holds on "Before", then each new layer wipes up over the last one (a seam travels with the
// wipe edge), then holds on the finished chair. Transform-only: the wipe is a translated mask with a counter-translated photo.
const START = 0.1, END = 0.88
const span = (n: number) => (END - START) / (n - 1)
const wipeOf = (v: number, i: number, n: number) => {
  if (i === 0) return 1
  const a = START + (i - 1) * span(n)
  const b = a + span(n) * 0.72
  return Math.min(1, Math.max(0, (v - a) / (b - a)))
}

function LayerImage({ i, p, n }: { i: number; p: MotionValue<number>; n: number }) {
  const mask = useTransform(p, (v) => `translate3d(0, ${(1 - wipeOf(v, i, n)) * 100}%, 0)`)
  const inner = useTransform(p, (v) => `translate3d(0, ${-(1 - wipeOf(v, i, n)) * 100}%, 0)`)
  const seam = useTransform(p, (v) => { const w = wipeOf(v, i, n); return w > 0.001 && w < 0.999 ? 1 : 0 })
  return (
    <motion.div className="absolute inset-0 overflow-hidden will-change-transform" style={{ transform: i ? mask : undefined }}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ transform: i ? inner : undefined }}>
        <Photo src={img(`chair-${LAYERS[i].key}-1600`)} srcSet={chairSet(LAYERS[i].key)} sizes="(min-width: 768px) 80svh, 100vw" alt={LAYERS[i].alt} className="h-full w-full object-[50%_62%]" priority={i === 0} />
      </motion.div>
      {i > 0 && <motion.span aria-hidden className="stitch absolute inset-x-0 top-0 text-cream" style={{ opacity: seam }} />}
    </motion.div>
  )
}

function Layers() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [step, setStep] = useState(0)
  const n = LAYERS.length
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let s = 0
    for (let i = 1; i < n; i++) if (wipeOf(v, i, n) > 0.5) s = i
    if (s !== step) setStep(s)
  })
  const L = LAYERS[step]
  return (
    <section ref={ref} id="layers" data-stage className="relative h-[520vh] bg-cream" aria-labelledby="layers-title">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden md:flex-row">
        {/* the chair: full height on desktop, full width on phones */}
        <div className="relative h-[54svh] w-full shrink-0 bg-cream-2 md:order-2 md:h-full md:w-auto md:aspect-[4/5]">
          {LAYERS.map((_, i) => <LayerImage key={i} i={i} p={scrollYProgress} n={n} />)}
        </div>

        <div className="flex flex-1 flex-col px-5 pt-5 md:order-1 md:justify-center md:px-12 md:pb-[8svh] md:pt-0 lg:px-20">
          <div className="mb-4 flex gap-1.5 md:hidden" aria-hidden>
            {LAYERS.map((l, i) => <span key={l.key} className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-navy" : "bg-line"}`} />)}
          </div>
          <h2 id="layers-title" className="t-small font-bold text-ink/75">One chair, rebuilt layer by layer<span className="font-normal md:hidden"> (illustrative photos)</span></h2>
          <div className="relative mt-2 min-h-[9.5rem] md:mt-6 md:min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={L.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.34, ease }}>
                <p className="display text-[1.85rem] md:text-[clamp(2.4rem,3.6vw,3.4rem)]">{L.title}</p>
                <p className="mt-2 max-w-[30rem] text-[0.98rem] leading-relaxed text-ink/85 md:mt-5 md:text-[1.08rem]">{L.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ol className="mt-10 hidden md:flex md:max-w-[34rem] md:flex-wrap md:gap-x-6 md:gap-y-2" aria-label="Layers">
            {LAYERS.map((l, i) => (
              <li key={l.key} className={`t-small transition-colors duration-300 ${i === step ? "font-bold text-ink" : i < step ? "text-ink/75" : "text-ink/60"}`}>
                <span className="tnum mr-1.5">{String(i + 1).padStart(2, "0")}</span>{l.name}
              </li>
            ))}
          </ol>
        </div>
        <p className="t-cap absolute bottom-[calc(96px+1rem)] right-5 hidden rounded-full bg-cream/90 px-3 py-1.5 text-ink/80 md:block">Illustrative photographs of the process</p>
      </div>
    </section>
  )
}

/* ---------- 3. What we upholster: the list is the selector ---------- */
const AREAS = [
  { key: "home", name: "Home", line: "Sofas, dining seats, cushions and the other pieces you live with.", photo: "sofa-living", alt: "A navy reupholstered sofa in a bright room with white louvred shutters" },
  { key: "marine", name: "Marine", line: "Boat cushions and cockpit seating.", photo: "marine-cushions", alt: "New white boat cushions with navy piping in a sportfishing cockpit over turquoise water" },
  { key: "auto", name: "Auto", line: "Car seats and interiors, re-covered and restitched.", photo: "auto-seat", alt: "A car seat re-covered in tan leather with cream double stitching" },
  { key: "aircraft", name: "Aircraft", line: "Aircraft seating and cabin upholstery.", photo: "aircraft-seat", alt: "A cream leather club seat in a small aircraft cabin with oval windows" },
  { key: "churches", name: "Churches", line: "Pews and church seating, done as a set.", photo: "church-pew", alt: "Church pews with new deep green seat cushions in a white church with louvred windows" },
]

function Areas() {
  const [active, setActive] = useState(0)
  const A = AREAS[active]
  return (
    <section className="bg-cream px-5 py-24 md:px-12 md:py-36" aria-labelledby="areas-title">
      <div className="mx-auto max-w-[1320px]">
        <h2 id="areas-title" className="display t-h2 max-w-[44rem]">Home, auto, marine, aircraft and church upholstery.</h2>
        <p className="t-lead mt-5 max-w-[34rem] text-ink/80">If it has a seat, a cushion or a cover, we can strip it and do it again.</p>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <ul className="border-t border-line">
            {AREAS.map((a, i) => (
              <li key={a.key} className="border-b border-line">
                <button
                  type="button" aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-5 py-5 text-left md:py-7"
                >
                  <span className={`display text-[2.2rem] leading-none transition-colors duration-300 md:text-[3.4rem] ${active === i ? "text-ink" : "text-ink/55 group-hover:text-ink/80"}`}>{a.name}</span>
                  {active === i && <span className="t-small hidden max-w-[16rem] text-muted lg:block">{a.line}</span>}
                </button>
                <div className="pb-6 md:hidden">
                  <p className="t-small text-muted">{a.line}</p>
                  <div className="mt-4 aspect-[3/2] overflow-hidden rounded-[14px] bg-cream-2">
                    <Photo src={img(a.photo)} alt={a.alt} className="h-full w-full" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="relative hidden aspect-[4/3.4] overflow-hidden rounded-[22px] bg-cream-2 md:sticky md:top-[10vh] md:block">
            <AnimatePresence initial={false}>
              <motion.div key={A.key} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}>
                <Photo src={img(A.photo)} alt={A.alt} className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <a href="what-we-upholster.html" className="mt-12 inline-flex min-h-[44px] items-center gap-2 font-bold underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-ink">More on each kind of job <ArrowUpRight className="size-[18px]" strokeWidth={1.9} aria-hidden /></a>
      </div>
    </section>
  )
}

/* ---------- 4. How it works: straw field ---------- */
function HowItWorks() {
  const steps = [
    ["Send a photo", `WhatsApp a picture of the piece to ${C.phone}. A tape measure in the shot helps.`],
    ["Get a free quote", "Slim Upholstery replies with a price for the job. Quotes cost nothing."],
    ["Book a time", "Appointments are available. Bring it in, or arrange the pick-up of larger pieces."],
  ]
  return (
    <section className="bg-straw" aria-labelledby="how-title">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] bg-cream-2 md:aspect-auto md:min-h-[86svh]">
          <Photo src={img("hands-staple")} alt="Hands pulling navy cloth taut over a seat edge and stapling it underneath" className="absolute inset-0 h-full w-full" />
        </div>
        <div className="flex flex-col justify-center px-5 py-20 md:px-16 md:py-24">
          <h2 id="how-title" className="display t-h2 max-w-[30rem]">Send a photo. Get a free quote.</h2>
          <ol className="mt-12 space-y-9">
            {steps.map(([t, b], i) => (
              <li key={t} className="grid grid-cols-[2.6rem_1fr] gap-x-4">
                <span className="display tnum text-[1.6rem] leading-none text-saddle">{i + 1}</span>
                <div>
                  <p className="text-[1.2rem] font-bold">{t}</p>
                  <p className="mt-1.5 max-w-[26rem] text-ink/80">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------- 5. Quote builder: writes the WhatsApp message ---------- */
const PIECES = ["Sofa", "Dining chairs", "Cushions", "Boat seating", "Car seats", "Church pews", "Something else"]
const CLOTHS = [
  { name: "Navy weave", c: "#1E3557" }, { name: "Sand linen", c: "#D8C6A2" }, { name: "Olive", c: "#5E6A3E" },
  { name: "Cream", c: "#F1E9D6" }, { name: "Outdoor canvas", c: "#9FB3B8" }, { name: "Leather or vinyl", c: "#8C5A2B" },
]

function QuoteBuilder() {
  const [piece, setPiece] = useState("Dining chairs")
  const [qty, setQty] = useState(4)
  const [cloth, setCloth] = useState<string | null>("Navy weave")
  const [name, setName] = useState("")
  const msg = `Hi Slim Upholstery${name.trim() ? `, this is ${name.trim()}` : ""}. I would like a free quote: ${qty} x ${piece.toLowerCase()}${cloth ? `, thinking of ${cloth.toLowerCase()}` : ", fabric still to choose"}. I can send photos now. When is a good time to come by?`
  return (
    <section id="quote" className="bg-cream px-5 py-24 md:px-12 md:py-36" aria-labelledby="quote-title">
      <div className="mx-auto grid max-w-[1320px] gap-14 md:grid-cols-[1.05fr_1fr] md:gap-20">
        <div>
          <h2 id="quote-title" className="display t-h2 max-w-[34rem]">Tell us what needs doing.</h2>
          <p className="t-lead mt-5 max-w-[30rem] text-ink/80">Three choices, and your WhatsApp message is written for you.</p>

          <fieldset className="mt-12">
            <legend className="font-bold">The piece</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {PIECES.map((p) => (
                <button key={p} type="button" aria-pressed={piece === p} onClick={() => setPiece(p)}
                  className={`min-h-[44px] rounded-full px-4 t-small transition-colors duration-200 ${piece === p ? "bg-ink text-cream" : "bg-cream-2 text-ink hover:bg-straw"}`}>{p}</button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="font-bold">How many</legend>
            <div className="mt-4 inline-flex items-center rounded-full bg-cream-2 p-1">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-straw" aria-label="One fewer"><Minus className="size-4" strokeWidth={2} aria-hidden /></button>
              <output className="tnum w-12 text-center text-[1.25rem] font-bold" aria-live="polite">{qty}</output>
              <button type="button" onClick={() => setQty((q) => Math.min(60, q + 1))} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-straw" aria-label="One more"><Plus className="size-4" strokeWidth={2} aria-hidden /></button>
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="font-bold">A cloth idea <span className="font-normal text-muted">(you will see real samples at the shop)</span></legend>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {CLOTHS.map((c) => (
                <button key={c.name} type="button" aria-pressed={cloth === c.name} onClick={() => setCloth(cloth === c.name ? null : c.name)} className="group text-left">
                  <span className={`block aspect-square rounded-[14px] transition-[box-shadow,transform] duration-200 group-active:scale-95 ${cloth === c.name ? "shadow-[0_0_0_2px_var(--color-cream),0_0_0_4px_var(--color-ink)]" : "shadow-[inset_0_0_0_1px_rgba(43,33,24,.12)]"}`} style={{ background: c.c }} />
                  <span className="t-cap mt-2 block leading-snug">{c.name}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="md:sticky md:top-[12vh] md:self-start">
          <div className="rounded-[26px] bg-cream-2 p-6 md:p-8">
            <label htmlFor="q-name" className="font-bold">Your name <span className="font-normal text-muted">(optional)</span></label>
            <input id="q-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-3 block min-h-[48px] w-full rounded-[14px] border border-line bg-cream px-4 outline-none focus:border-ink" />
            <p className="mt-7 font-bold">Your message</p>
            <p className="mt-3 rounded-[18px] rounded-bl-[6px] bg-cream p-5 leading-relaxed text-ink/90" aria-live="polite">{msg}</p>
            <a href={waLink(msg)} className="btn btn-primary mt-7 w-full min-h-[54px] text-[1rem]"><MessageCircle className="size-[19px]" strokeWidth={1.9} aria-hidden /> Send on WhatsApp</a>
            <p className="t-small mt-4 text-center text-muted">Opens WhatsApp with this message to {C.phone}. Or call <a href={C.tel} className="tnum whitespace-nowrap underline underline-offset-4">{C.phone}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. Visit: navy field ---------- */
function Visit() {
  return (
    <section id="visit" className="bg-navy px-5 py-24 text-cream md:px-12 md:py-32" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1320px] gap-14 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 id="visit-title" className="display t-h2">{C.street},<br />Nassau.</h2>
          <p className="t-lead mt-6 max-w-[30rem] text-cream/80">The workshop is on Claridge Road. Come with photos or with the piece itself; cloth samples are there to touch.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={C.map} className="btn text-cream shadow-[inset_0_0_0_1.5px_var(--color-cream)] hover:bg-cream hover:text-ink">Directions <ArrowUpRight className="size-[17px]" strokeWidth={1.9} aria-hidden /></a>
            <a href={C.tel} className="btn tnum text-cream shadow-[inset_0_0_0_1.5px_rgba(247,240,224,.4)] hover:shadow-[inset_0_0_0_1.5px_var(--color-cream)]"><Phone className="size-[17px]" strokeWidth={1.9} aria-hidden /> {C.phone}</a>
          </div>
        </div>
        <dl className="tnum grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 self-end text-cream/90">
          <dt className="text-cream/60">Monday to Friday</dt><dd>9:00am to 5:30pm</dd>
          <dt className="text-cream/60">Saturday</dt><dd>Shorter hours, call ahead</dd>
          <dt className="text-cream/60">Sunday</dt><dd>Closed</dd>
          <dt className="pt-6 text-cream/60">Call or WhatsApp</dt><dd className="pt-6"><a className="underline decoration-cream/30 underline-offset-4 hover:decoration-cream" href={C.tel}>{C.phone}</a></dd>
          <dt className="text-cream/60">Shop line</dt><dd><a className="underline decoration-cream/30 underline-offset-4 hover:decoration-cream" href={C.tel2}>{C.phone2}</a></dd>
          <dt className="text-cream/60">Recent work</dt><dd className="flex flex-wrap gap-x-4"><a className="underline decoration-cream/30 underline-offset-4 hover:decoration-cream" href={C.ig}>Instagram</a><a className="underline decoration-cream/30 underline-offset-4 hover:decoration-cream" href={C.tt}>TikTok</a><a className="underline decoration-cream/30 underline-offset-4 hover:decoration-cream" href={C.fb}>Facebook</a></dd>
        </dl>
      </div>
    </section>
  )
}

function Home() {
  return (
    <Page current="home">
      <Hero />
      <Layers />
      <Areas />
      <HowItWorks />
      <QuoteBuilder />
      <Visit />
    </Page>
  )
}

mount(<Home />)
