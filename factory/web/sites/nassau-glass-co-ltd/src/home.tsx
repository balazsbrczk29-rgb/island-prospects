import { lazy, Suspense, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, ease } from "./site"
import { PHONE, TEL, PHONE2, TEL2, PHONE_INTL, ADDRESS, DEPTS, ITEMS } from "./data"
const Scene = lazy(() => import("./Scene"))

function Hero() {
  return (
    <section className="relative" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-10 pb-12 md:px-10 lg:min-h-[calc(100svh-120px)] lg:grid-cols-12 lg:items-center lg:pt-6">
        <div className="lg:col-span-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Label>The Bahamas' first glass fabricator</Label></motion.div>
          <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,6.8vw,7rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="sr-only">Nassau Glass Co Ltd: </span>
            {["Glass, cut on", "Mackey Street", "since 1959."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i === 2 ? "text-steel" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-7 max-w-[34rem] text-[clamp(1.05rem,1.3vw,1.18rem)] leading-relaxed text-ink/80">Mirrors, shower enclosures and every kind of glass, measured, made and fitted from the same hill for more than sixty years. Plus Hunter fans, bulbs, lamps and framing in the showroom.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }} className="mt-8 flex flex-wrap gap-3">
            <a href="#measure" className="group inline-flex min-h-12 items-center gap-2 bg-ink px-6 font-medium text-paper transition hover:-translate-y-px hover:bg-steel">Request a glass quote <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-12 items-center gap-2 border border-ink/30 px-6 transition hover:-translate-y-px hover:border-ink"><Phone className="size-4" aria-hidden /> {PHONE}</a>
          </motion.div>
        </div>
        <motion.div className="relative lg:col-span-6" initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10%)" }} animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }} transition={{ delay: 0.3, duration: 1.4, ease: [0.77, 0, 0.175, 1] }}>
          <div className="aspect-[5/4] w-full overflow-hidden bg-edge lg:aspect-[4/5]">
            <Suspense fallback={<div className="size-full bg-gradient-to-br from-edge to-paper" />}><Scene /></Suspense>
          </div>
          <p className="mt-3 text-[11px] font-bold tracking-[0.18em] text-muted uppercase">Illustration: light through float glass</p>
        </motion.div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items: [string, string, string][] = [["Call", PHONE, TEL], ["Or call", PHONE2, TEL2], ["Showroom", "#46 Mackey Street, top of the hill", "#visit"], ["Open", "Mon to Fri 9 to 4:30 · Sat 9 to 1", "#visit"]]
  return (
    <section className="bg-ink text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <li key={k} className={`border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0 ${i > 1 ? "col-span-2 lg:col-span-1" : ""}`}>
            <a href={href} className="group block px-5 py-6 transition hover:bg-steel md:px-8 md:py-8">
              <span className="text-[11px] font-bold tracking-[0.18em] text-edge uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight ${i < 2 ? "text-[clamp(1.6rem,2.2vw,2.1rem)] tnum" : "text-[1.3rem]"}`}>{v}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Measure() {
  const [item, setItem] = useState<string>(ITEMS[0])
  const [w, setW] = useState("")
  const [h, setH] = useState("")
  const [qty, setQty] = useState("1")
  const [where, setWhere] = useState("")
  const W = parseFloat(w) || 0, H = parseFloat(h) || 0, Q = Math.max(1, parseInt(qty) || 1)
  const sqft = (W * H * Q) / 144
  const ratio = W && H ? W / H : 0.8
  const pw = ratio >= 1 ? 220 : 220 * ratio, ph = ratio >= 1 ? 220 / ratio : 220
  const summary = [`${item}`, W && H ? `${W} in wide by ${H} in high` : null, Q > 1 ? `${Q} pieces` : null, sqft ? `about ${sqft.toFixed(1)} sq ft` : null, where ? `for ${where}` : null].filter(Boolean).join(", ")
  return (
    <section id="measure" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-32" aria-labelledby="measure-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7"><Label>01 · Get a quote</Label><h2 id="measure-title" className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98]">Measure it once, here.</h2></div>
        <p className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Choose what you need and enter the size in inches. We draw it to proportion and give you one line to read out when you call.</p>
      </Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-6">
          <div className="flex flex-wrap gap-1" role="radiogroup" aria-label="What you need">
            {ITEMS.map(x => <button key={x} type="button" role="radio" aria-checked={item === x} onClick={() => setItem(x)} className={`min-h-11 border px-4 text-[15px] transition hover:-translate-y-px ${item === x ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{x}</button>)}
          </div>
          <p className="text-[14px] text-muted">{item === "Shower enclosure" ? "Shower enclosures are manufactured at Nassau Glass." : item === "Window pane replacement" ? "The service department handles replacements and repairs, start to finish." : item === "Picture frame glass" ? "Framing is done in house, in the custom framing department." : "Cut to size for homes and businesses."}</p>
          <div className="grid grid-cols-3 gap-5">
            {([["Width (in)", w, setW], ["Height (in)", h, setH], ["How many", qty, setQty]] as const).map(([l, v, set]) => (
              <label key={l} className="block"><span className="text-[12px] font-bold tracking-[0.14em] text-muted uppercase">{l}</span><input type="number" min={0} value={v} onChange={e => set(e.target.value)} className="mt-1 block min-h-12 w-full border-b-2 border-ink/20 bg-transparent font-display text-2xl outline-none focus:border-steel" /></label>
            ))}
          </div>
          <label className="block"><span className="text-[12px] font-bold tracking-[0.14em] text-muted uppercase">Where it goes</span><input value={where} onChange={e => setWhere(e.target.value)} placeholder="Bathroom, storefront, dining table..." className="mt-1 block min-h-12 w-full border-b-2 border-ink/20 bg-transparent text-lg outline-none focus:border-steel" /></label>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative flex aspect-square items-center justify-center bg-edge/60">
            <motion.div className="pane relative" animate={{ width: pw, height: ph }} transition={{ duration: 0.6, ease }} aria-hidden>
              <span className="absolute -top-6 left-0 right-0 text-center text-[13px] text-muted tnum">{W ? `${W}″` : "width"}</span>
              <span className="absolute top-0 bottom-0 -right-12 flex items-center text-[13px] text-muted tnum">{H ? `${H}″` : "height"}</span>
              <span className="absolute inset-y-4 left-[22%] w-px rotate-12 bg-white/90" />
            </motion.div>
          </div>
          <div className="mt-6 bg-ink p-6 text-paper md:p-7" aria-live="polite">
            <p className="text-[11px] font-bold tracking-[0.18em] text-edge uppercase">Read this out on the call</p>
            <p className="mt-2 font-display text-[1.45rem] leading-snug">{summary}.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={TEL} className="inline-flex min-h-12 items-center gap-2 bg-paper px-5 text-ink transition hover:-translate-y-px hover:bg-edge"><Phone className="size-4" aria-hidden /> {PHONE}</a>
              <a href={TEL2} className="inline-flex min-h-12 items-center gap-2 border border-paper/30 px-5 tnum transition hover:border-paper">{PHONE2}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Depts() {
  const groups = ["Glass and metal", "Light and air", "Art and home"] as const
  return (
    <section className="bg-edge/50" aria-labelledby="depts-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7"><Label>02 · Under one roof</Label><h2 id="depts-title" className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98]">We do glass, and a whole lot more.</h2></div>
          <a href="services.html" className="group inline-flex min-h-11 items-center gap-2 font-medium md:col-span-4 md:col-start-9 md:justify-self-end">Every department <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <div className="mt-14 grid gap-0 border-t border-ink md:grid-cols-3">
          {groups.map((g, gi) => (
            <Reveal key={g} delay={gi * 0.08} className="border-b border-line py-8 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0">
              <p className="text-[12px] font-bold tracking-[0.18em] text-steel uppercase">{g}</p>
              <ul className="mt-5 space-y-4">{DEPTS.filter(d => d.group === g).map(d => <li key={d.id}><a href={`services.html#${d.id}`} className="group block"><span className="font-display text-[1.45rem] transition group-hover:translate-x-1 inline-block">{d.name}</span><span className="block text-[15px] text-muted">{d.line}</span></a></li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12 lg:items-end" aria-labelledby="story-title">
      <Reveal className="lg:col-span-7">
        <Label>03 · Since 1959</Label>
        <h2 id="story-title" className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95]">Same hill. Same trade. Sixty-plus years.</h2>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
        <p className="text-[17px] leading-relaxed text-muted">Nassau Glass was founded in 1959 as the Bahamas' first fabricating glass company, and it has never left its original home at #46 Mackey Street. Its sister company, Bahamas Aluminum Manufacturing, was the country's first local maker of aluminum windows, doors and railings.</p>
        <a href="http://www.bahamasaluminum.com/" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-medium">Windows, doors and shutters <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </Reveal>
    </section>
  )
}

const FAQ = [
  ["Do you install the glass as well?", "Yes. The service department does the entire job from start to finish, including replacements and repairs."],
  ["Where exactly are you?", "At #46 Mackey Street, at the top of the hill, about half a mile south of the Paradise Island Bridge."],
  ["Do you sell ceiling fans and bulbs?", "Yes. Nassau Glass is an authorized Hunter ceiling fan dealer and has a Lightbulb Center, plus lamps and replacement shades."],
  ["Can I call from outside The Bahamas?", `Yes, on ${PHONE_INTL}.`],
]

function Questions() {
  return (
    <section className="border-t border-line bg-edge/40" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label>04 · Questions</Label><h2 id="faq-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[1]">Before you visit.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[1.4rem] font-normal hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12" aria-labelledby="visit-title">
      <Reveal className="lg:col-span-5">
        <Label>05 · Visit</Label>
        <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1]">Top of the hill, Mackey Street.</h2>
        <dl className="mt-10 divide-y divide-line border-y border-ink text-[16px]">
          {[["Address", ADDRESS], ["Monday to Friday", "9:00 am to 4:30 pm"], ["Saturday", "9:00 am to 1:00 pm"], ["International", PHONE_INTL]].map(([k, v]) => <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-4 py-4"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <a href={TEL} className="mt-8 flex min-h-16 items-center gap-3 bg-ink px-7 font-display text-[1.8rem] text-paper transition hover:-translate-y-0.5 hover:bg-steel"><Phone className="size-5" aria-hidden /> <span className="tnum">{PHONE}</span></a>
      </Reveal>
      <Reveal delay={0.1} className="overflow-hidden border border-line lg:col-span-7">
        <iframe title="Map of Nassau Glass, Mackey Street, Nassau" loading="lazy" className="h-[420px] w-full lg:h-full lg:min-h-[480px]" src="https://www.google.com/maps?q=Nassau+Glass,+Mackey+Street,+Nassau,+Bahamas&output=embed" />
      </Reveal>
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyBand /><Measure /><Depts /><Story /><Questions /><Visit /></Page>)
