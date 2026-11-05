import { lazy, Suspense, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Label, ease } from "./site"
import { PHONE, TEL, SHOP, STORE_EMAIL, ONLINE_EMAIL, ADDRESS } from "./data"
import House from "./House"

const Chart = lazy(() => import("./Chart"))

function Shutters() {
  const slats = Array.from({ length: 16 }, (_, i) => i)
  const panel = (side: "l" | "r") => (
    <motion.div
      className={`absolute top-0 ${side === "l" ? "left-0 origin-left" : "right-0 origin-right"} h-full w-1/2 border-2 border-ink bg-pine`}
      initial={{ scaleX: 1 }} animate={{ scaleX: 0.16 }} transition={{ delay: 1.1, duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
      aria-hidden
    >
      <div className="flex h-full flex-col justify-between p-[6%]">
        {slats.map(i => <span key={i} className="block h-[3px] bg-paper/80" />)}
      </div>
    </motion.div>
  )
  return (
    <div className="relative aspect-[4/5] w-full max-w-[300px] ml-auto border-2 border-ink bg-paper-2 p-3">
      <div className="relative size-full overflow-hidden border-2 border-ink bg-tape/90">
        <div className="flex size-full flex-col justify-between px-[20%] py-6 text-ink">
          <p className="text-[11px] tracking-[0.16em] uppercase">Home Center</p>
          <div>
            <p className="font-display text-[clamp(1.4rem,2vw,2rem)] leading-[1] font-bold tracking-[-0.03em]">Open daily</p>
            <p className="mt-3 text-[14px] leading-snug">Mon to Sat<br />8 am to 8 pm<br />Sunday<br />9 am to 5 pm</p>
          </div>
          <p className="text-[13px] leading-snug">Carmichael Road</p>
        </div>
        {panel("l")}{panel("r")}
      </div>
      <span className="absolute -bottom-[10px] left-0 h-[10px] w-full bg-ink" aria-hidden />
    </div>
  )
}

function Hero() {
  const lines = ["Build beautiful,", "on every island."]
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:min-h-[calc(100svh-110px)] px-5 pt-6 pb-10 md:px-10 md:pt-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex items-center justify-between border-b border-ink/15 pb-4 text-[12px] tracking-[0.18em] text-muted uppercase">
          <span>Commonwealth Building Supplies Ltd</span>
          <span className="hidden sm:inline">Nassau, New Providence · Est. 1973</span>
        </motion.div>
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h1 id="hero-title" className="font-display text-[clamp(3.1rem,8.6vw,9rem)] leading-[0.86] font-bold tracking-[-0.045em] text-ink md:col-span-9">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span className={`block ${i === 1 ? "text-pine" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div className="hidden md:col-span-3 md:block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }}>
            <Shutters />
          </motion.div>
        </div>
        <motion.div className="grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-12 md:items-end" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }}>
          <p className="max-w-[36rem] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-ink/85 md:col-span-6">CBS Bahamas is the Bahamian-owned home improvement store on Carmichael Road, Nassau. Doors, windows, roofing, bath, kitchen and garden since 1973, and free drop-off at the mailboat for every Family Island order.</p>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <a href={SHOP} className="group inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-pine px-6 text-[16px] font-medium text-paper transition hover:-translate-y-px hover:bg-pine-deep active:translate-y-0">Shop CBS online <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-[4px] border-2 border-ink px-6 text-[16px] text-ink transition hover:-translate-y-px hover:bg-ink hover:text-paper"><Phone className="size-4" aria-hidden /> Call the Home Center</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function KeyBand() {
  const items: [string, string, string][] = [
    ["Call the store", PHONE, TEL],
    ["Find us", "SouthWest Plaza, Carmichael Road", "#visit"],
    ["Open", "Mon to Sat 8 to 8 · Sun 9 to 5", "#visit"],
    ["Family Islands", "Free drop-off at the mailboat", "#islands"],
  ]
  return (
    <section className="bg-pine text-paper" aria-label="Key information">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr]">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease }} className="border-b border-paper/15 lg:border-b-0 lg:border-l lg:first:border-l-0">
            <a href={href} className="group block px-5 py-6 transition hover:bg-pine-deep md:px-8 md:py-8">
              <span className="text-[12px] tracking-[0.18em] text-tape uppercase">{k}</span>
              <span className={`mt-2 block font-display leading-tight font-bold tracking-[-0.02em] ${i === 0 ? "text-[clamp(1.8rem,2.4vw,2.4rem)]" : "text-[1.3rem]"}`}>{v}</span>
              <span className="mt-3 block h-[2px] w-0 bg-tape transition-all duration-500 group-hover:w-14" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function ShopHouse() {
  return (
    <section id="house" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="house-title">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label>01 · Shop the house</Label>
          <h2 id="house-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.035em]">Every part of a house, one store.</h2>
        </div>
        <p className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Tap the roof, a shutter, the kitchen tap or the porch fan. Each one opens that department of the CBS online store.</p>
      </Reveal>
      <div className="mt-14"><House /></div>
    </section>
  )
}

function Islands() {
  return (
    <section id="islands" className="border-y border-line bg-paper-2" aria-labelledby="islands-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Label>02 · Family Islands</Label>
            <h2 id="islands-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.035em]">From Carmichael Road to your dock.</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-muted md:col-span-4 md:col-start-9">Choose your island. CBS drops your order at the mailboat for free, with photos and a signed proof at handoff.</p>
        </Reveal>
        <div className="mt-14">
          <Suspense fallback={<div className="aspect-[11/8] w-full rounded-[6px] bg-sea" />}><Chart /></Suspense>
        </div>
      </div>
    </section>
  )
}

const WAYS = [
  ["Walk the aisles", "The Home Center at SouthWest Plaza, Carmichael Road, open seven days."],
  ["Order online, pick up", "Thousands of products on cbsbahamas.com, ready for pick-up."],
  ["Smart-locker pickup", "Collect an online order from a smart locker when it suits you."],
  ["Island-wide delivery", "Online orders delivered island-wide."],
  ["Free mailboat drop-off", "Every Family Island order taken to the boat at no charge."],
  ["Special order", "Not on the shelf? Thousands more items by special order."],
]

function Ways() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="ways-title">
      <Reveal className="md:col-span-4">
        <Label>03 · Getting it home</Label>
        <h2 id="ways-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">Six ways to get it home.</h2>
        <div className="mt-10 border-l-4 border-tape pl-5">
          <p className="font-display text-2xl leading-tight font-bold tracking-[-0.02em]">Price match guarantee.</p>
          <p className="mt-2 text-[15px] text-muted">As promised on the CBS store. Ask at the counter for the details.</p>
        </div>
      </Reveal>
      <ol className="border-t-2 border-ink md:col-span-7 md:col-start-6">
        {WAYS.map(([t, d], i) => (
          <motion.li key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: i * 0.05, duration: 0.7, ease }} className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line py-6 md:grid-cols-[3.5rem_1fr_1.3fr]">
            <span className="font-display font-bold text-pine tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] transition group-hover:translate-x-1 md:text-[1.75rem]">{t}</span>
            <span className="col-start-2 text-[16px] text-muted md:col-start-auto">{d}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

const ASK = {
  stock: { label: "Is it in stock?", to: STORE_EMAIL, intro: "For anything you want to collect at the Home Center.", fields: [["Item or SKU", "text"], ["Quantity", "number"], ["Your name", "text"], ["Your phone", "tel"]] },
  island: { label: "Family Island order", to: ONLINE_EMAIL, intro: "For online and mailboat orders. The stores cannot help with these, so this goes to the online team.", fields: [["Order number", "text"], ["Island and settlement", "text"], ["Mailboat", "text"], ["Your name", "text"]] },
  bulk: { label: "Builder or bulk", to: STORE_EMAIL, intro: "For contractors and owner-builders pricing a job in quantity.", fields: [["Project", "text"], ["Materials needed", "text"], ["Needed by", "date"], ["Your name", "text"]] },
} as const
type AskKey = keyof typeof ASK

function Ask() {
  const [tab, setTab] = useState<AskKey>("stock")
  const [vals, setVals] = useState<Record<string, string>>({})
  const conf = ASK[tab]
  const filled = conf.fields.map(([f]) => [f, vals[`${tab}:${f}`]] as const).filter(([, v]) => v)
  const body = filled.map(([f, v]) => `${f}: ${v}`).join("\n")
  const href = `mailto:${conf.to}?subject=${encodeURIComponent(`${conf.label} (from the website)`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="ask" className="bg-ink text-paper" aria-labelledby="ask-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Reveal className="md:col-span-4">
          <Label light>04 · Ask the store</Label>
          <h2 id="ask-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">Ask before you drive.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-paper/75">Choose what you need, fill in what you know. We put it into one email to the right CBS inbox.</p>
          <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2 text-[17px] text-paper underline decoration-tape decoration-2 underline-offset-[6px] transition hover:text-tape"><Phone className="size-4" aria-hidden /> Or call {PHONE}</a>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={v => setTab(v as AskKey)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-[6px] bg-paper/10 p-1">
              {Object.entries(ASK).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded-[4px] px-4 text-paper/80 data-[state=active]:bg-tape data-[state=active]:text-ink">{c.label}</TabsTrigger>)}
            </TabsList>
            {Object.entries(ASK).map(([k, c]) => (
              <TabsContent key={k} value={k} className="mt-8">
                <p className="text-[15px] text-paper/70">{c.intro}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {c.fields.map(([f, type]) => (
                    <label key={f} className="block">
                      <span className="text-[12px] tracking-[0.16em] text-paper/60 uppercase">{f}</span>
                      <input type={type} name={f} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(v => ({ ...v, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b-2 border-paper/25 bg-transparent font-display text-xl text-paper outline-none transition [color-scheme:dark] focus:border-tape" />
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-10 flex flex-col gap-4 rounded-[6px] bg-paper p-6 text-ink md:flex-row md:items-center md:justify-between md:p-7">
            <p className="text-[15px] text-muted">{filled.length ? <span className="text-ink">{filled.map(([f, v]) => `${f}: ${v}`).join(" · ")}</span> : `Goes to ${conf.to}`}</p>
            <a href={href} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-pine px-6 font-medium text-paper transition hover:-translate-y-px hover:bg-pine-deep"><Mail className="size-4" aria-hidden /> Email the store</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Does CBS charge to take my order to the mailboat?", "No. Drop-off at the mailboat is free on every order, whatever the size, weight or contents. The mailboat charges its own freight fee when you collect at your island, and CBS cannot quote that fee in advance."],
  ["Which port do the mailboats leave from?", "Most leave from Potter's Cay, a few from Arawak Cay. If you are not sure, choose either at checkout and the CBS dispatcher will correct it for your island."],
  ["Can I get my mailboat order the same day?", "No. Same-day mailboat drop-off is not available. Add the boat's freight acceptance date to your order, or choose the next date and CBS will reschedule."],
  ["What are the Home Center's hours?", "Monday to Saturday 8 am to 8 pm, Sunday 9 am to 5 pm, at SouthWest Plaza on Carmichael Road."],
  ["Can I order something that is not on the shelf?", "Yes. CBS takes special orders on thousands of items it does not keep in stock."],
]

function Questions() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="faq-title">
      <Reveal className="md:col-span-4">
        <Label>05 · Questions</Label>
        <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">What customers ask first.</h2>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t-2 border-ink">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="py-6 text-left font-display text-[1.3rem] font-bold tracking-[-0.01em] hover:no-underline md:text-[1.5rem]">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-[16px] leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" className="border-t border-line bg-paper-2" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-5">
          <Label>06 · Visit</Label>
          <h2 id="visit-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.03em]">SouthWest Plaza, Carmichael Road.</h2>
          <dl className="mt-10 divide-y divide-line border-y border-line text-[16px]">
            {[["Address", ADDRESS + ", New Providence"], ["Monday to Saturday", "8 am to 8 pm"], ["Sunday", "9 am to 5 pm"]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[1fr_1.3fr] gap-4 py-4"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <a href={TEL} className="group mt-8 block rounded-[6px] bg-pine p-7 text-paper transition hover:-translate-y-0.5 hover:bg-pine-deep">
            <span className="text-[12px] tracking-[0.18em] text-tape uppercase">The Home Center</span>
            <span className="mt-2 block font-display text-[clamp(2rem,3.6vw,3rem)] leading-none font-bold tracking-[-0.03em]">{PHONE}</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[6px] border border-line md:col-span-7">
          <iframe title="Map of CBS Bahamas, SouthWest Plaza, Carmichael Road, Nassau" loading="lazy" className="h-[420px] w-full md:h-full md:min-h-[520px]" src="https://www.google.com/maps?q=CBS+Bahamas,+SouthWest+Plaza,+Carmichael+Road,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Home"><Hero /><KeyBand /><ShopHouse /><Islands /><Ways /><Ask /><Questions /><Visit /></Page>)
