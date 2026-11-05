import { lazy, Suspense, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, ArrowUpRight, Mail, Minus, Phone, Plus, ShoppingBag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Dept } from "./Counter"
import { DEPTS, SHOP } from "./data"
import { Page, mount, Reveal, Kicker, ease, PHONE, TEL, EMAIL } from "./site"

const Counter = lazy(() => import("./Counter"))

function Hero() {
  const [active, setActive] = useState<Dept | null>("disposables")
  const d = DEPTS.find(x => x.id === active)
  return (
    <section className="mx-auto max-w-[1400px] px-3 pt-3 md:px-6 md:pt-6" aria-labelledby="hero-title">
      <div className="grid min-h-[calc(100svh-160px)] overflow-hidden rounded-[28px] bg-paper-2 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col justify-between gap-10 p-6 md:p-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-[14px] text-muted">Nassau Paper Company · #34 Carib Road, Nassau</motion.p>
          <div>
            <h1 id="hero-title" className="font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.95] tracking-[-0.045em]">
              {["Everything your", "business goes", "through."].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i === 2 ? "text-pen" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease }} className="mt-6 max-w-[42ch] text-[18px] leading-relaxed text-ink/75">Disposables, cleaning and janitorial supplies, copy paper and commercial printing, from one counter on Carib Road and an online store.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="flex flex-wrap gap-3">
            <a href="#quote" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px active:translate-y-0">Request a supply quote <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
            <a href={SHOP} className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 bg-paper px-6 text-[15px] transition hover:-translate-y-px hover:border-ink"><ShoppingBag className="size-4" aria-hidden /> Shop online</a>
          </motion.div>
        </div>
        <div className="relative min-h-[440px] lg:min-h-0">
          <Suspense fallback={<div className="size-full bg-paper-2" />}><Counter active={active} onPick={setActive} /></Suspense>
          <AnimatePresence mode="wait">
            {d && (
              <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }} className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/75 p-4 backdrop-blur-xl md:inset-x-auto md:right-6 md:bottom-6 md:w-[340px] md:p-5">
                <p className="text-[12px] tracking-[0.12em] text-pen uppercase">Department</p>
                <p className="mt-1 font-display text-xl tracking-[-0.02em]">{d.name}</p>
                <p className="mt-1.5 text-[14px] leading-snug text-ink/75">{d.line}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function KeyInfo() {
  const items = [["Call the store", PHONE, TEL], ["Open", "Mon to Fri, 8 to 5", "#visit"], ["Find us", "#34 Carib Road", "#visit"], ["Order anytime", "Online store", SHOP]]
  return (
    <section className="mx-auto mt-3 max-w-[1400px] px-3 md:mt-6 md:px-6" aria-label="Key information">
      <ul className="grid gap-px overflow-hidden rounded-[22px] bg-ink/90 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, v, href], i) => (
          <motion.li key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease }} className="bg-ink">
            <a href={href} className="group flex items-end justify-between gap-4 px-6 py-6 text-paper transition hover:bg-white/5 md:px-7 md:py-8">
              <span><span className="block text-[13px] text-paper/60">{k}</span><span className="mt-1 block font-display text-[clamp(1.3rem,1.9vw,1.75rem)] tracking-[-0.02em]">{v}</span></span>
              <ArrowUpRight className="size-5 shrink-0 text-kraft-light transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Departments() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="dep-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Kicker n="01">Departments</Kicker>
          <h2 id="dep-title" className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.04em]">Six aisles, one invoice.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">The departments the store lists, with the brands it names. Ask the counter for anything you do not see.</p>
          <a href="departments.html" className="group mt-8 inline-flex min-h-11 items-center gap-2 text-[15px] text-pen">Every department and brand <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
        </Reveal>
        <ol className="lg:col-span-8">
          {DEPTS.map((d, i) => (
            <motion.li key={d.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ delay: (i % 3) * 0.05, duration: 0.7, ease }} className="group grid grid-cols-[3rem_1fr] gap-x-4 gap-y-3 border-t border-line py-7 last:border-b md:grid-cols-[3.5rem_1fr_1.1fr]">
              <span className="font-display text-[15px] text-pen">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-tight tracking-[-0.03em] transition group-hover:translate-x-1">{d.name}</span>
              <span className="col-start-2 md:col-start-auto">
                <span className="block text-[16px] leading-relaxed text-ink/75">{d.line}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">{d.includes.map(t => <span key={t} className="rounded-full bg-paper-2 px-2.5 py-1 text-[12.5px] text-ink/75">{t}</span>)}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const ITEMS: Record<string, { label: string; items: string[] }> = {
  disposables: { label: "Disposables", items: ["Paper cups", "Plastic cups", "Plates and bowls", "Foil products", "Takeaway containers", "Popcorn bags"] },
  janitorial: { label: "Janitorial", items: ["Roll towel", "Toilet tissue", "Can liners", "Zip bags", "Cleaning chemicals", "Rubbermaid equipment"] },
  office: { label: "Paper and office", items: ["Copy paper", "Envelopes", "Chart paper", "Office supplies", "Shipping supplies", "Gift wrap"] },
  printing: { label: "Printing", items: ["Business cards", "Flyers", "Letterhead", "Forms", "Menus", "Signage"] },
}
function Quote() {
  const [tab, setTab] = useState("disposables")
  const [qty, setQty] = useState<Record<string, number>>({})
  const [biz, setBiz] = useState("")
  const [notes, setNotes] = useState("")
  const [collect, setCollect] = useState<"collect" | "delivery">("collect")
  const set = (k: string, d: number) => setQty(q => ({ ...q, [k]: Math.max(0, (q[k] ?? 0) + d) }))
  const lines = Object.entries(qty).filter(([, v]) => v > 0).map(([k, v]) => { const [cat, item] = k.split("::"); return `${item} (${ITEMS[cat].label}): ${v} case${v > 1 ? "s" : ""}` })
  const body = ["Hello Nassau Paper Company,", "", "Please quote for:", ...(lines.length ? lines.map(l => `- ${l}`) : ["- (items to follow)"]), "", collect === "collect" ? "I will collect at Carib Road." : "Please tell me about delivery options.", notes ? `Notes: ${notes}` : "", biz ? `Business: ${biz}` : "", "", "(sent from the website)"].filter(Boolean).join("\n")
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request${biz ? ": " + biz : ""}`)}&body=${encodeURIComponent(body)}`
  return (
    <section id="quote" className="scroll-mt-20 mx-auto max-w-[1400px] px-3 md:px-6" aria-labelledby="quote-title">
      <div className="grid gap-12 rounded-[28px] bg-paper-2 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Kicker n="02">Request a quote</Kicker>
          <h2 id="quote-title" className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.04em]">Build the order, we price it.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Tap the items your business needs, set the cases, and send the list to the store by email. Prices come back from the counter, not from this page.</p>
          <div className="mt-10 rounded-2xl bg-ink p-6 text-paper">
            <p className="text-[13px] text-paper/60">Your list</p>
            <AnimatePresence initial={false}>
              {lines.length ? lines.map(l => <motion.p key={l} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-paper/10 py-2 text-[15px]">{l}</motion.p>) : <p className="mt-2 text-[15px] text-paper/70">Nothing yet. Add items on the right.</p>}
            </AnimatePresence>
            <a href={href} className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-pen px-6 text-[15px] text-white transition hover:-translate-y-px hover:bg-pen-deep"><Mail className="size-4" aria-hidden /> Email this list to the store</a>
            <a href={TEL} className="mt-3 flex min-h-11 items-center justify-center gap-2 text-[14px] text-paper/75 hover:text-paper"><Phone className="size-4" aria-hidden /> Or read it out: {PHONE}</a>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper p-1">
              {Object.entries(ITEMS).map(([k, c]) => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 data-[state=active]:bg-ink data-[state=active]:text-paper">{c.label}</TabsTrigger>)}
            </TabsList>
            {Object.entries(ITEMS).map(([k, c]) => (
              <TabsContent key={k} value={k} className="mt-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {c.items.map(it => {
                    const key = `${k}::${it}`, v = qty[key] ?? 0
                    return (
                      <li key={it} className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${v ? "border-pen bg-white" : "border-line bg-paper hover:border-ink/30"}`}>
                        <span className="text-[16px]">{it}</span>
                        <span className="flex items-center gap-1">
                          <button type="button" onClick={() => set(key, -1)} aria-label={`Fewer ${it}`} className="grid size-11 place-items-center rounded-full transition hover:bg-ink/5 aria-disabled:opacity-30" aria-disabled={!v}><Minus className="size-4" /></button>
                          <span className="w-6 text-center font-display tabular-nums" aria-live="polite">{v}</span>
                          <button type="button" onClick={() => set(key, 1)} aria-label={`More ${it}`} className="grid size-11 place-items-center rounded-full bg-ink text-paper transition hover:-translate-y-px"><Plus className="size-4" /></button>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <label className="block"><span className="text-[13px] text-muted">Business name</span><input value={biz} onChange={e => setBiz(e.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-[16px] outline-none focus:border-pen" /></label>
            <fieldset><legend className="text-[13px] text-muted">Collection</legend>
              <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-paper p-1">
                {(["collect", "delivery"] as const).map(o => <button key={o} type="button" onClick={() => setCollect(o)} aria-pressed={collect === o} className={`min-h-10 rounded-lg text-[14px] transition ${collect === o ? "bg-ink text-paper" : "hover:bg-ink/5"}`}>{o === "collect" ? "Collect at Carib Rd" : "Ask about delivery"}</button>)}
              </div>
            </fieldset>
            <label className="block sm:col-span-2"><span className="text-[13px] text-muted">Sizes, brands or anything else</span><textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} className="mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-[16px] outline-none focus:border-pen" /></label>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Printing() {
  return (
    <section id="printing" className="scroll-mt-20 mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="print-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Kicker n="03">Printing</Kicker>
          <h2 id="print-title" className="mt-6 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.04em]">The print shop is in the same building.</h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">Full commercial printing runs through Napco Printing Service at #34 Carib Road, so paper, print and packaging can sit on one order.</p>
          <a href="#quote" onClick={() => document.querySelector<HTMLButtonElement>('[value="printing"]')?.click()} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px">Ask about a print job <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden /></a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6">
          <svg viewBox="0 0 560 380" className="w-full" role="img" aria-label="Drawing of a sheet passing through printer rollers and coming out printed">
            <rect width="560" height="380" rx="28" fill="#ebe7de" />
            <rect x="140" y="140" width="280" height="70" rx="14" fill="#17191c" />
            {[180, 240, 300, 360].map(x => <circle key={x} cx={x} cy="175" r="16" fill="#2a2e33" stroke="#3a3f45" />)}
            <motion.g initial={{ x: -170 }} whileInView={{ x: 0 }} viewport={{ once: true }} transition={{ duration: 2.2, ease }}>
              <rect x="210" y="220" width="140" height="130" rx="4" fill="#fff" stroke="#dcd7cc" />
              <rect x="226" y="238" width="70" height="10" rx="2" fill="#2f6fde" />
              {[0, 1, 2, 3, 4].map(i => <rect key={i} x="226" y={262 + i * 14} width={i === 4 ? 60 : 108} height="5" rx="2" fill="#c9c4b8" />)}
            </motion.g>
            <rect x="210" y="40" width="140" height="96" rx="4" fill="#fff" stroke="#dcd7cc" />
            <rect x="196" y="120" width="168" height="24" rx="6" fill="#a87a45" />
          </svg>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Nassau Paper Company?", "At #34 Carib Road, Nassau, P.O. Box N-4139, near the corner of Mount Pleasant Road."],
  ["What are the store's hours?", "Monday to Friday, 8:00 am to 5:00 pm. Closed Saturday and Sunday."],
  ["Can I order online?", "Yes. Nassau Paper Company runs an online store, and you can also email a list for a quote to info@nassaupaperco.com."],
  ["Do you do printing?", "Yes. Full commercial printing is available through Napco Printing Service at the same Carib Road address."],
]
function Visit() {
  return (
    <section id="visit" className="scroll-mt-20 border-t border-line" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Kicker n="04">Visit</Kicker>
          <h2 id="visit-title" className="mt-6 font-display text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[0.95] tracking-[-0.05em]">#34 Carib Road.</h2>
          <p className="mt-6 text-[17px] text-muted">Nassau, P.O. Box N-4139. Monday to Friday, 8:00 am to 5:00 pm.</p>
          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink text-paper transition hover:-translate-y-px"><Phone className="size-4" aria-hidden /> {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-ink/20 transition hover:-translate-y-px hover:border-ink"><Mail className="size-4" aria-hidden /> Email the store</a>
          </div>
          <Accordion type="single" collapsible defaultValue="q0" className="mt-12 border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left font-display text-lg tracking-[-0.02em] hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[28px] border border-line lg:col-span-7">
          <iframe title="Map of Nassau Paper Company, Carib Road, Nassau" loading="lazy" className="h-[440px] w-full lg:h-full" src="https://www.google.com/maps?q=Nassau+Paper+Company,+Carib+Road,+Nassau,+Bahamas&output=embed" />
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current=""><Hero /><KeyInfo /><Departments /><Quote /><Printing /><Visit /></Page>)
