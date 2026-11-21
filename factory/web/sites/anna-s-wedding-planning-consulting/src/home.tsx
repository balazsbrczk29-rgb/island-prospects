import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, Phone, Check, Ship, Palmtree, Copy, CalendarHeart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Mark, ease, usd, PHONE, TEL, US_PHONE, US_TEL } from "./site"
import { PACKAGES, LICENCE, SERVICES, GALLERY, IMG, HERO, PKG_W, PKG_H, TOLL, TOLL_TEL, CONTACT_URL, hasMusic, hasReception, type Pkg } from "./data"

type Mode = "beach" | "cruise"
type Feel = "simple" | "music" | "party"
export type Req = { mode: Mode; guests: number; feel: Feel; date: string; pkg: string }

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1320px] lg:min-h-[calc(100svh-150px)] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center px-5 pt-8 pb-8 md:px-12 lg:col-span-6 lg:py-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[15px] text-muted">Beach and cruise-day weddings in Nassau, since 1995</motion.p>
          <h1 id="hero-title" className="mt-5 font-display text-[clamp(2.9rem,6.2vw,6.4rem)] leading-[0.95] tracking-[-0.015em] text-ink lg:mr-[-14%]">
            {["Married in Nassau,", "with Anna", "beside you."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.1em]">
                <motion.span className={`block ${i === 2 ? "text-rose" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-6 max-w-[30rem] text-[18px] leading-[1.6] text-muted">Annamae Fox plans every detail and handles your marriage licence. Beach packages from <b className="font-medium text-ink tnum">USD 950</b>, cruise-day packages from <b className="font-medium text-ink tnum">USD 3,495</b>.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 1, ease }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#finder" className="group inline-flex min-h-13 items-center gap-2 rounded-full bg-rose px-7 text-[17px] text-white transition hover:-translate-y-0.5 hover:bg-ink active:translate-y-0">Find your package <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
            <a href={TEL} className="inline-flex min-h-11 items-center gap-2 text-[16px] text-ink underline decoration-rose/40 underline-offset-[6px] transition hover:decoration-rose tnum"><Phone className="size-4 text-rose" aria-hidden />{PHONE}</a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 1 }} className="mt-5 text-[14px] text-muted tnum">From the US <a className="text-ink hover:text-rose" href={US_TEL}>{US_PHONE}</a> or toll free <a className="text-ink hover:text-rose" href={TOLL_TEL}>{TOLL}</a></motion.p>
        </div>
        <motion.figure initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.15, duration: 1.4, ease: [0.77, 0, 0.175, 1] }} className="relative mx-5 h-[44svh] min-h-[300px] md:mx-12 lg:col-span-6 lg:mx-0 lg:h-auto">
          <img src={HERO.src} alt="Jennifer and Ashby on their wedding day at Fort Charlotte, Nassau, planned by Anna" fetchPriority="high" width={HERO.w} height={HERO.h} className="absolute inset-0 size-full rounded-t-[999px] object-cover object-[46%_40%] lg:rounded-t-none lg:rounded-bl-[220px]" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/92 px-4 py-2 text-[13px] text-ink lg:bottom-8 lg:left-auto lg:right-8">Jennifer and Ashby, Fort Charlotte</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

const FEELS: { k: Feel; label: string; note: string }[] = [
  { k: "simple", label: "Simple and barefoot", note: "Ceremony, flowers, photos" },
  { k: "music", label: "With live music", note: "Violin, saxophone or a DJ" },
  { k: "party", label: "With a reception", note: "Drinks, food, dancing" },
]
const feelOk = (p: Pkg, f: Feel) => f === "simple" ? true : f === "music" ? hasMusic(p) : hasReception(p)

function Finder({ req, setReq, onRequest }: { req: Req; setReq: React.Dispatch<React.SetStateAction<Req>>; onRequest: () => void }) {
  const list = useMemo(() => PACKAGES.filter(p => p.group === req.mode).sort((a, b) => a.price - b.price), [req.mode])
  const fits = list.filter(p => p.guests >= req.guests && feelOk(p, req.feel))
  const best = fits[0] ?? list.filter(p => feelOk(p, req.feel)).at(-1) ?? list[list.length - 1]
  const exact = fits.length > 0
  useEffect(() => { setReq(r => r.pkg === best.id ? r : { ...r, pkg: best.id }) }, [best.id])
  const set = (patch: Partial<Req>) => setReq(r => ({ ...r, ...patch }))
  const max = req.mode === "cruise" ? 40 : 50
  return (
    <section id="finder" className="scroll-mt-6 bg-blush/60" aria-labelledby="finder-title">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Mark n="i.">Find your package</Mark>
          <h2 id="finder-title" className="mt-4 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.02]">How you arrive, who comes, and how it should feel.</h2>
          <div className="mt-8 grid grid-cols-2 gap-1.5 rounded-full bg-paper p-1.5" role="group" aria-label="How you arrive">
            {([["beach", "Staying in Nassau", Palmtree], ["cruise", "A cruise port day", Ship]] as const).map(([k, l, Icon]) => (
              <button key={k} type="button" aria-pressed={req.mode === k} onClick={() => setReq(r => ({ ...r, mode: k, guests: Math.min(r.guests, k === "cruise" ? 40 : 50) }))} className={`flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-[15px] transition ${req.mode === k ? "bg-ink text-paper" : "text-ink hover:bg-blush"}`}><Icon className="size-4" aria-hidden />{l}</button>
            ))}
          </div>
          <label className="mt-8 block">
            <span className="flex items-baseline justify-between text-[15px] text-muted">Guests, including the two of you <b className="font-display text-[2.2rem] font-normal text-ink tnum">{req.guests}</b></span>
            <input type="range" min={2} max={max} value={req.guests} onChange={e => set({ guests: +e.target.value })} className="range mt-3 w-full" aria-label="Number of guests" />
          </label>
          <div className="mt-8" role="group" aria-label="How it should feel">
            <p className="text-[15px] text-muted">The feel</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {FEELS.map(f => (
                <button key={f.k} type="button" aria-pressed={req.feel === f.k} onClick={() => set({ feel: f.k })} className={`flex min-h-[76px] flex-col justify-center rounded-2xl border px-3 py-2.5 text-left transition ${req.feel === f.k ? "border-rose bg-paper" : "border-ink/10 hover:border-ink/40"}`}>
                  <span className="text-[15px] leading-tight text-ink">{f.label}</span>
                  <span className="mt-1 text-[12.5px] leading-tight text-muted">{f.note}</span>
                </button>
              ))}
            </div>
          </div>
          <a href="#licence" className="group mt-8 flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper px-5 py-4 transition hover:border-rose">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-rose"><Check className="size-5" aria-hidden /></span>
            <span className="text-[15px] leading-snug"><b className="font-medium">Your licence is handled.</b> <span className="text-muted">{req.mode === "cruise" ? "Cruise couples need a purser's letter: the ship in Bahamian waters 24 hours." : "Be on island 24 hours, bring passports. Fee $100."}</span> <span className="text-rose underline-offset-4 group-hover:underline">The checklist</span></span>
          </a>
        </div>
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.article key={best.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="overflow-hidden rounded-[28px] bg-paper shadow-[0_30px_60px_-44px_rgba(31,42,46,.55)]">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[556/331] bg-blush md:aspect-auto md:h-[300px] md:max-h-[331px]">
                  <img src={best.img} alt={`A wedding from Anna's ${best.name} package`} width={PKG_W} height={PKG_H} loading="lazy" className="absolute inset-0 size-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="text-[14px] text-rose">{exact ? `Best fit for ${req.guests} guests` : `Closest package; Anna adjusts it for ${req.guests}`}</p>
                  <h3 className="mt-1 font-display text-[2.6rem] leading-none">{best.name}</h3>
                  <p className="mt-3 font-display text-[2rem] leading-none tnum">USD {best.price.toLocaleString("en-US")}</p>
                  <p className="mt-2 text-[14px] text-muted">{best.id === "basic" ? "For the two of you" : `Set up for up to ${best.guests}`}, adjustable</p>
                </div>
              </div>
              <div className="grid gap-6 border-t border-line p-6 md:p-8">
                <ul className="grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-2">
                  {best.items.slice(0, 8).map(it => <li key={it} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-rose" aria-hidden />{it}</li>)}
                  {best.items.length > 8 && <li className="text-muted"><a className="underline underline-offset-4 hover:text-rose" href={`packages.html#${best.id}`}>and {best.items.length - 8} more</a></li>}
                </ul>
                <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-end">
                  <label className="block sm:w-[15rem]"><span className="text-[14px] text-muted">{req.mode === "cruise" ? "Your day in port" : "Your wedding date"}</span>
                    <input type="date" value={req.date} onChange={e => set({ date: e.target.value })} className="mt-1 block min-h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-[16px] outline-none focus:border-rose tnum" />
                  </label>
                  <button type="button" onClick={onRequest} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-rose px-6 text-[16px] text-white transition hover:-translate-y-0.5 hover:bg-ink"><CalendarHeart className="size-4" aria-hidden /> Request this date</button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
          <ul className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4" aria-label="All packages for this arrival">
            {list.map(p => {
              const ok = p.guests >= req.guests && feelOk(p, req.feel)
              return (
                <li key={p.id}><a href={`packages.html#${p.id}`} className={`flex min-h-16 flex-col justify-center rounded-2xl border px-4 py-3 transition hover:-translate-y-0.5 ${p.id === best.id ? "border-rose bg-paper" : ok ? "border-ink/15 bg-paper/60 hover:border-ink" : "border-transparent opacity-55 hover:opacity-100"}`}>
                  <span className="font-display text-[1.3rem]">{p.name}</span><span className="text-[13px] text-muted tnum">USD {p.price.toLocaleString("en-US")} · up to {p.guests}</span></a></li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Licence() {
  const [done, setDone] = useState<number[]>([])
  const pct = Math.round((done.length / LICENCE.length) * 100)
  return (
    <section id="licence" className="scroll-mt-6 border-t border-line bg-paper" aria-labelledby="lic-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Mark n="ii.">Marriage licence</Mark>
          <h2 id="lic-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Your paperwork, ticked off.</h2>
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">Anna schedules your appointment with the Registrar's office and prepares the documents for the interview. Tick what you already have.</p>
          <div className="mt-10 flex items-center gap-5">
            <svg viewBox="0 0 44 44" className="size-24 -rotate-90" aria-hidden><circle cx="22" cy="22" r="19" fill="none" stroke="#eadfd8" strokeWidth="3" /><motion.circle cx="22" cy="22" r="19" fill="none" stroke="#b44c6e" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" animate={{ strokeDashoffset: 1 - done.length / LICENCE.length }} transition={{ duration: 0.6, ease }} /></svg>
            <p className="font-display text-4xl">{pct}%<span className="mt-1 block font-sans text-[14px] text-muted">ready for the Registrar</span></p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-ink/15">
            {LICENCE.map((t, i) => {
              const on = done.includes(i)
              return (
                <li key={t} className="border-b border-ink/15">
                  <button type="button" aria-pressed={on} onClick={() => setDone(d => on ? d.filter(x => x !== i) : [...d, i])} className="group flex w-full items-start gap-4 py-5 text-left">
                    <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition ${on ? "border-rose bg-rose text-white" : "border-ink/30 group-hover:border-rose"}`}><Check className={`size-4 transition ${on ? "scale-100" : "scale-0"}`} aria-hidden /></span>
                    <span className={`text-[17px] leading-relaxed transition ${on ? "text-muted line-through decoration-rose/50" : "text-ink"}`}>{t}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-[13px] text-muted">As published by Anna's Wedding Planning. Requirements are set by the Registrar General's Department of The Bahamas; Anna confirms the current rules when you book.</p>
        </Reveal>
      </div>
    </section>
  )
}

const COUNTRIES = ["Australia", "Egypt", "Ethiopia", "North and South Africa", "Dubai", "India", "Germany", "Switzerland", "Sweden", "France", "North America", "South America"]

function Anna() {
  return (
    <section id="anna" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-24 md:px-12 md:py-36" aria-labelledby="anna-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto aspect-[556/331] w-full max-w-[556px] overflow-hidden rounded-t-[240px] bg-blush">
            <img src={IMG + "2015/11/COUPLE-CANADA_2-1.jpg"} alt="A beach ceremony in Nassau led by a minister, planned by Anna's Wedding Planning" width={556} height={331} loading="lazy" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="mx-auto mt-4 grid max-w-[556px] grid-cols-3 gap-3">
            {GALLERY.slice(0, 3).map(src => <img key={src} src={src} alt="A wedding in Nassau planned by Anna" width={300} height={300} loading="lazy" className="aspect-square w-full max-w-[300px] rounded-[14px] object-cover" />)}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="self-center lg:col-span-6 lg:col-start-7">
          <Mark n="iii.">About Anna</Mark>
          <h2 id="anna-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Since 1995, one planner who answers.</h2>
          <div className="mt-7 max-w-xl space-y-4 text-[18px] leading-relaxed text-muted">
            <p>Annamae Fox has planned destination weddings in The Bahamas since 1995, with a network of trusted professionals around her.</p>
            <p>Her mission is simple: you enjoy the day without worry, and it feels like nobody else's. Experience, resourcefulness, time management and attention to detail are how she gets there.</p>
          </div>
          <p className="mt-10 text-[14px] text-muted">Couples have come to her from</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {COUNTRIES.map(c => <li key={c} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] transition hover:border-rose hover:text-rose">{c}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-20 md:px-12 md:pb-28" aria-label="Weddings by Anna">
      <ul className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
        {GALLERY.slice(3).concat(GALLERY.slice(0, 3)).map((src, i) => (
          <motion.li key={src} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay: i * 0.05, ease }} className="overflow-hidden rounded-[16px] bg-blush">
            <img src={src} alt="A wedding in Nassau planned by Anna's Wedding Planning" width={300} height={300} loading="lazy" className="aspect-square w-full max-w-[300px] object-cover" />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="svc-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="flex items-baseline gap-3 text-[14px] text-paper/70"><span className="font-display text-[1.4rem] text-blush">iv.</span>What Anna does</p>
          <h2 id="svc-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">From first call to the last toast.</h2>
        </Reveal>
        <ol className="lg:col-span-7 lg:col-start-6">
          {SERVICES.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-paper/15 py-6 first:border-t">
              <span className="font-display text-xl text-blush">{i + 1}</span>
              <div><p className="font-display text-[clamp(1.5rem,2.2vw,2.1rem)] transition group-hover:translate-x-1">{t}</p><p className="mt-2 text-[16px] leading-relaxed text-paper/70">{d}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const KINDS = {
  beach: { label: "Beach wedding", fields: [["Wedding date", "date"], ["Guests", "number"], ["Where you are staying", "text"], ["Package you like", "text"]] },
  cruise: { label: "Cruise-day wedding", fields: [["Date in Nassau", "date"], ["Ship name", "text"], ["Guests", "number"], ["Package you like", "text"]] },
  renewal: { label: "Vow renewal", fields: [["Date", "date"], ["Years married", "number"], ["Guests", "number"], ["Where you are staying", "text"]] },
} as const
type K = keyof typeof KINDS

function Plan({ req }: { req: Req }) {
  const [tab, setTab] = useState<K>(req.mode === "cruise" ? "cruise" : "beach")
  const [vals, setVals] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const pkg = PACKAGES.find(p => p.id === req.pkg)
  useEffect(() => {
    const k: K = req.mode === "cruise" ? "cruise" : "beach"
    setTab(k)
    setVals(v => ({ ...v, [`${k}:${k === "cruise" ? "Date in Nassau" : "Wedding date"}`]: req.date || v[`${k}:${k === "cruise" ? "Date in Nassau" : "Wedding date"}`] || "", [`${k}:Guests`]: String(req.guests), [`${k}:Package you like`]: pkg ? `${pkg.name}, USD ${pkg.price.toLocaleString("en-US")}` : "" }))
  }, [req.mode, req.guests, req.date, req.pkg])
  const summary = KINDS[tab].fields.map(([f]) => vals[`${tab}:${f}`] ? `${f}: ${vals[`${tab}:${f}`]}` : null).filter(Boolean).join(" · ")
  const line = `${KINDS[tab].label} · ${summary}`
  const copy = async () => { try { await navigator.clipboard.writeText(line); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { /* clipboard blocked */ } }
  return (
    <section id="plan" className="mx-auto grid max-w-[1320px] scroll-mt-6 gap-12 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12" aria-labelledby="plan-title">
      <Reveal className="lg:col-span-4">
        <Mark n="v.">Request your date</Mark>
        <h2 id="plan-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.02]">Your request, ready for Anna.</h2>
        <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">What you chose in the finder is already filled in. Add what you know, then call, or copy it into Anna's contact form.</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
        <Tabs value={tab} onValueChange={v => setTab(v as K)}>
          <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-full bg-blush p-1">
            {(Object.keys(KINDS) as K[]).map(k => <TabsTrigger key={k} value={k} className="min-h-11 flex-none rounded-full px-5 text-[15px] data-[state=active]:bg-ink data-[state=active]:text-paper">{KINDS[k].label}</TabsTrigger>)}
          </TabsList>
          {(Object.keys(KINDS) as K[]).map(k => (
            <TabsContent key={k} value={k} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {KINDS[k].fields.map(([f, type]) => (
                  <label key={f} className="block"><span className="text-[14px] text-muted">{f}</span>
                    <input type={type} value={vals[`${k}:${f}`] ?? ""} onChange={e => setVals(s => ({ ...s, [`${k}:${f}`]: e.target.value }))} className="mt-2 block min-h-12 w-full border-b border-ink/25 bg-transparent font-display text-xl outline-none transition focus:border-rose tnum" />
                  </label>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-10 rounded-[28px] bg-ink p-7 text-paper md:p-9">
          <p className="text-[13px] text-paper/60">Your request</p>
          <p className="mt-2 font-display text-[1.35rem] leading-snug tnum">{summary ? line : "Your details will appear here as one line."}</p>
          <div className="mt-6 flex flex-col flex-wrap gap-3 sm:flex-row">
            <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose px-6 text-white transition hover:-translate-y-0.5 tnum"><Phone className="size-4" aria-hidden /> Call Nassau {PHONE}</a>
            <button type="button" onClick={copy} disabled={!summary} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 transition hover:-translate-y-0.5 hover:border-paper disabled:opacity-40"><Copy className="size-4" aria-hidden /> {copied ? "Copied" : "Copy request"}</button>
            <a href={CONTACT_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 transition hover:-translate-y-0.5 hover:border-paper">Anna's contact form <ArrowUpRight className="size-4" aria-hidden /></a>
          </div>
          <p className="mt-5 text-[14px] text-paper/65 tnum">From the US {US_PHONE} or toll free {TOLL}.</p>
        </div>
      </Reveal>
    </section>
  )
}

const FAQ = [
  ["Can we marry on a cruise ship day in Nassau?", "Yes. Anna's cruise packages are built for it. The licence needs a letter from the ship's purser confirming the ship has been in Bahamian waters for 24 hours."],
  ["How long must we be in The Bahamas before applying for the licence?", "Both of you must be in The Bahamas and have been there for 24 hours before the date you apply."],
  ["What does a package cost?", "Published packages start at USD 950 for the Basic beach package. Cruise packages start at USD 3,495 for 25 guests. All can be adjusted to your guest count and wishes."],
  ["What is the marriage licence fee?", "The licence fee is $100. Anna prepares your documents and schedules the Registrar's appointment."],
]

function Questions() {
  return (
    <section className="border-t border-line" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Mark n="vi.">Questions</Mark>
          <h2 id="faq-title" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[0.98]">What couples ask first.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left font-display text-[clamp(1.2rem,1.7vw,1.55rem)] font-normal hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[17px] leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Home() {
  const [req, setReq] = useState<Req>({ mode: "beach", guests: 6, feel: "simple", date: "", pkg: "classic" })
  const onRequest = () => document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" })
  return <Page current=""><Hero /><Finder req={req} setReq={setReq} onRequest={onRequest} /><Licence /><Anna /><Gallery /><Services /><Plan req={req} /><Questions /></Page>
}

mount(<Home />)
