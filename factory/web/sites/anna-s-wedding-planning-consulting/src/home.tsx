import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowRight, Check, Phone, Copy } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, useKind, ease, wipe, PICK_EVENT } from "./site"
import { KINDS, PACKAGES, LICENCE, SERVICES, COUNTRIES, PHOTOS, usd, PHONE, TEL, US_PHONE, US_TEL, type KindId } from "./data"

const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ---------- 1. Hero: the index swaps Anna's own photograph ---------- */
function HeroPhoto() {
  const { kind } = useKind()
  const k = KINDS.find(x => x.id === kind)!
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, v => 1.06 - v * 0.06)
  useEffect(() => { // warm the cache so a hover swap is instant
    const id = setTimeout(() => KINDS.slice(1).forEach(x => { const i = new Image(); i.referrerPolicy = "no-referrer"; i.src = x.img }), 1200)
    return () => clearTimeout(id)
  }, [])
  return (
    <div ref={ref} className="img-slot relative h-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={k.id}
            src={k.img}
            alt={k.alt}
            referrerPolicy="no-referrer"
            width={1600} height={1200}
            fetchPriority={k.id === "beach" ? "high" : "auto"}
            style={{ objectPosition: k.pos, zIndex: 2 }}
            className="absolute inset-0 size-full object-cover"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)", zIndex: 2 }}
            exit={{ zIndex: 1, transition: { duration: 0.9 } }}
            transition={{ duration: 0.9, ease: wipe }}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function KindTabs() {
  const { kind, setKind } = useKind()
  return (
    <div role="group" aria-label="Show a kind of wedding" className="no-scrollbar flex gap-5 overflow-x-auto px-5 lg:hidden">
      {KINDS.map(k => (
        <button key={k.id} aria-pressed={kind === k.id} onClick={() => setKind(k.id)} className={`relative min-h-11 shrink-0 text-sm transition-colors ${kind === k.id ? "text-ink" : "text-muted"}`}>
          {k.short}
          {kind === k.id && <motion.span layoutId="tab" className="absolute inset-x-0 bottom-1.5 h-px bg-channel" transition={{ duration: 0.4, ease }} />}
        </button>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative lg:grid lg:h-[100svh] lg:min-h-[640px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
      <div className="h-[46svh] min-h-[320px] lg:order-2 lg:h-full"><HeroPhoto /></div>
      <div className="pt-3 lg:hidden"><KindTabs /></div>
      <div className="flex flex-col justify-center px-5 pt-8 pb-12 lg:order-1 lg:pr-10 lg:pl-[clamp(32px,4vw,64px)] lg:pb-[6vh]">
        <div>
          <h1 id="hero-title" className="display text-[clamp(3.1rem,4.55vw,5.4rem)] leading-[0.95] tracking-[-0.035em]">
            {["Barefoot vows", "in Nassau,", "planned", "by Anna."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: wipe }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-7 max-w-[30rem] text-lg leading-relaxed text-muted lg:mt-9">
            Beach and cruise-day weddings, planned by Annamae Fox for more than two decades. Published packages from USD 950, with your marriage licence handled.
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.9 }} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#date" className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-channel px-7 text-base font-medium text-ground transition-[background-color,transform] duration-200 hover:bg-ink active:scale-[0.98]">
              Request your wedding date <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
            </a>
            <a href="#packages" className="inline-flex min-h-11 items-center border-b border-ink/30 text-base transition-colors hover:border-channel hover:text-channel">See the packages</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 2. The package finder: the main feature ---------- */
function Finder() {
  const [mode, setMode] = useState<"beach" | "cruise">("beach")
  const [guests, setGuests] = useState(12)
  useEffect(() => {
    const on = (e: Event) => { const k = (e as CustomEvent<KindId>).detail; if (k === "beach" || k === "cruise") setMode(k) }
    addEventListener(PICK_EVENT, on)
    return () => removeEventListener(PICK_EVENT, on)
  }, [])
  const list = useMemo(() => PACKAGES.filter(p => p.kind === mode).sort((a, b) => a.guests! - b.guests!), [mode])
  const max = mode === "beach" ? 50 : 40
  const n = Math.min(guests, max)
  const best = list.find(p => p.guests! >= n) ?? list[list.length - 1]
  const fill = `${((n - 2) / (max - 2)) * 100}%`
  return (
    <section id="packages" aria-labelledby="finder-title" className="scroll-mt-12 wrap py-[clamp(88px,12vw,168px)]">
      <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-14 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <p className="smallcaps text-channel">Find your package</p>
          <h2 id="finder-title" className="display mt-5 text-2xl">How do you arrive, and who comes with you?</h2>
          <div role="radiogroup" aria-label="How you arrive" className="mt-12 grid grid-cols-2 border-b border-line">
            {([["beach", "Staying on island"], ["cruise", "Arriving by cruise ship"]] as const).map(([k, l]) => (
              <button key={k} role="radio" aria-checked={mode === k} onClick={() => setMode(k)} className={`relative min-h-14 pb-3 text-left text-base transition-colors ${mode === k ? "text-ink" : "text-muted hover:text-ink"}`}>
                {l}
                {mode === k && <motion.span layoutId="mode" className="absolute right-0 -bottom-px left-0 h-0.5 bg-channel" transition={{ duration: 0.45, ease }} />}
              </button>
            ))}
          </div>
          <label className="mt-12 block" htmlFor="guests">
            <span className="flex items-end gap-5">
              <span className="display num w-[2.2ch] text-[clamp(5.5rem,10vw,9.5rem)] leading-[0.8] tracking-[-0.04em]">{n}</span>
              <span className="pb-2 text-base leading-snug text-muted">guests,<br />the two of you included</span>
            </span>
          </label>
          <input id="guests" type="range" min={2} max={max} value={n} onChange={e => setGuests(+e.target.value)} style={{ ["--fill" as string]: fill }} className="range mt-6" aria-valuetext={`${n} guests`} />
          <p className="mt-3 flex justify-between text-xs text-muted num"><span>2</span><span>{max}</span></p>
        </div>

        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={best.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} aria-live="polite">
              <div className="img-slot aspect-[16/10] overflow-hidden">
                <motion.img src={best.img} alt={`${best.name} package, a wedding planned by Anna's in Nassau`} referrerPolicy="no-referrer" width={1200} height={750} loading="lazy" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease }} />
              </div>
              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3 className="display text-[clamp(3rem,5vw,4.75rem)]">{best.name}</h3>
                <p className="display num text-[clamp(2rem,3.2vw,3rem)] text-channel">{usd(best.price)}</p>
              </div>
              <p className="mt-2 text-sm text-muted">{best.guests === 2 ? "For the two of you" : `Set up for up to ${best.guests} guests`}, adjustable to your numbers and wishes.</p>
              <ul className="mt-7 grid gap-x-10 gap-y-2.5 text-[0.9375rem] sm:grid-cols-2">
                {best.items!.map(it => <li key={it} className="flex gap-3"><Check className="mt-1 size-3.5 shrink-0 text-channel" strokeWidth={2} aria-hidden />{it}</li>)}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <ul className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4" aria-label={`All ${mode === "beach" ? "beach" : "cruise"} packages`}>
        {list.map(p => (
          <li key={p.id} className="border-b border-line md:border-b-0">
            <button onClick={() => setGuests(p.guests!)} aria-pressed={p.id === best.id} className="group relative flex min-h-24 w-full flex-col justify-center py-5 pr-4 text-left">
              {p.id === best.id && <motion.span layoutId="pkg" className="absolute top-0 right-4 left-0 h-0.5 bg-channel" transition={{ duration: 0.45, ease }} />}
              <span className={`display text-[1.6rem] transition-colors ${p.id === best.id ? "text-channel" : "group-hover:text-channel"}`}>{p.name}</span>
              <span className="num mt-1 text-sm text-muted">{usd(p.price)}, up to {p.guests}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function OtherKinds() {
  const groups = (["cultural", "deluxe", "renewal"] as const).map(id => ({ k: KINDS.find(x => x.id === id)!, list: PACKAGES.filter(p => p.kind === id) }))
  return (
    <section id="all-packages" aria-labelledby="other-title" className="scroll-mt-12 wrap pb-[clamp(88px,12vw,168px)]">
      <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <h2 id="other-title" className="display text-[clamp(2rem,3.2vw,3rem)]">Traditions, grand days and anniversaries.</h2>
          <p className="mt-5 max-w-sm text-muted">Prices in US dollars, as published on Anna's booking form. Ask her for each package's inclusions.</p>
          <a href="packages.html" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-ink/30 transition-colors hover:border-channel hover:text-channel">Every package, every inclusion <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {groups.map(({ k, list }) => (
            <div key={k.id}>
              <p className="smallcaps text-muted">{k.name}</p>
              <ul className="mt-4 border-t border-line">
                {list.map(p => (
                  <li key={p.id} className="flex items-baseline justify-between gap-3 border-b border-line py-3.5">
                    <span className="display text-lg">{p.name}</span><span className="num text-sm text-muted">{p.price.toLocaleString("en-US")}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 3. The spread: proof of two decades ---------- */
function Spread() {
  return (
    <section aria-labelledby="spread-title">
      <motion.div className="img-slot h-[56svh] overflow-hidden lg:h-[78svh]" initial={reduce ? false : { clipPath: "inset(8% 6% 8% 6%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 1.4, ease: wipe }}>
        <img src={PHOTOS.cloisters} alt="Guests line a petal aisle through a garden of stone arches as the couple walks out, Nassau" referrerPolicy="no-referrer" width={1600} height={800} loading="lazy" style={{ objectPosition: "50% 55%" }} />
      </motion.div>
      <div className="wrap grid gap-8 pt-10 pb-[clamp(88px,12vw,168px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <p className="display text-lg italic text-muted">A walk out under the stone arches, Nassau.</p>
        <div>
          <h2 id="spread-title" className="display text-[clamp(1.75rem,2.9vw,2.75rem)] leading-[1.12] max-w-[34ch]">
            For more than twenty years, couples have flown to Anna from {COUNTRIES.slice(0, -2).join(", ")}, and both Americas.
          </h2>
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. The licence checklist, on the shallow-water field ---------- */
function Licence() {
  const [done, setDone] = useState<number[]>([])
  const total = LICENCE.length
  return (
    <section id="licence" aria-labelledby="lic-title" className="scroll-mt-12 bg-flats">
      <div className="wrap py-[clamp(88px,12vw,160px)]">
        <p className="smallcaps text-channel">Marriage licence</p>
        <h2 id="lic-title" className="display mt-5 max-w-[16ch] text-3xl leading-[0.95] tracking-[-0.03em]">Your paperwork, ticked off.</h2>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-16 gap-y-10">
          <p className="max-w-lg text-lg leading-relaxed text-muted">Anna schedules your appointment with the Registrar's office and prepares the documents for the interview. Tick what you already have.</p>
          <div className="w-full max-w-[18rem]">
            <p className="flex items-end gap-4" aria-live="polite">
              <span className="display num text-[clamp(4.5rem,7vw,6.5rem)] leading-[0.8]">{done.length}</span>
              <span className="pb-1 text-base text-muted">of {total} ready<br />for the Registrar</span>
            </p>
            <div className="mt-5 h-0.5 bg-ink/10"><motion.div className="h-full origin-left bg-channel" animate={{ scaleX: done.length / total }} transition={{ duration: 0.5, ease }} /></div>
          </div>
        </div>
        <ul className="mt-14 grid border-t border-ink/15 xl:grid-cols-2 xl:gap-x-[clamp(32px,5vw,88px)]">
          {LICENCE.map((item, i) => {
            const on = done.includes(i)
            return (
              <li key={item.t} className="border-b border-ink/15">
                <button aria-pressed={on} onClick={() => setDone(d => on ? d.filter(x => x !== i) : [...d, i])} className="group flex w-full items-start gap-5 py-6 text-left">
                  <span className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${on ? "border-channel bg-channel text-ground" : "border-ink/35 group-hover:border-channel"}`}>
                    <motion.span initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.2, ease }}><Check className="size-4" strokeWidth={2} aria-hidden /></motion.span>
                  </span>
                  <span className="text-lg leading-relaxed">
                    {item.cruise && <span className="display mr-2 italic text-channel">Cruise passengers.</span>}
                    <span className={`transition-colors ${on ? "text-muted line-through decoration-channel/50" : ""}`}>{item.cruise ? item.t.replace("Cruise passengers bring", "Bring") : item.t}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="wrap box-content max-w-[28rem] pb-12 text-xs text-muted">As published by Anna's Wedding Planning. The Registrar General's Department of The Bahamas sets the rules; Anna confirms the current ones when you book.</p>
    </section>
  )
}

/* ---------- 5. Anna ---------- */
function Anna() {
  return (
    <section id="anna" aria-labelledby="anna-title" className="scroll-mt-12 wrap py-[clamp(88px,12vw,168px)]">
      <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <motion.div className="img-slot aspect-[4/5] overflow-hidden lg:sticky lg:top-12 lg:self-start" initial={reduce ? false : { clipPath: "inset(10% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 1.2, ease: wipe }}>
          <img src={PHOTOS.joy} alt="A bride and groom throw their arms up in celebration on the beach" referrerPolicy="no-referrer" width={900} height={1125} loading="lazy" style={{ objectPosition: "50% 30%" }} />
        </motion.div>
        <div className="lg:pt-6">
          <p className="smallcaps text-channel">About Anna</p>
          <h2 id="anna-title" className="display mt-5 text-2xl">Two decades of weddings, one planner who answers.</h2>
          <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-muted">
            <p>Annamae Fox has planned destination weddings in The Bahamas for more than twenty years, with a network of trusted professionals around her.</p>
            <p>Her aim is simple: you enjoy the day without worry, and it feels like nobody else's.</p>
          </div>
          <ol className="mt-12 border-t border-line">
            {SERVICES.map(([t, d]) => (
              <li key={t} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <p className="display text-[1.45rem] leading-snug">{t}</p>
                <p className="text-base leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. Up close ---------- */
function UpClose() {
  const shots = [
    { src: PHOTOS.group, alt: "A bride and groom exchange vows under a white arbor with their wedding party on the beach", cls: "col-span-12 md:col-span-8 aspect-[16/10]", pos: "50% 40%" },
    { src: PHOTOS.rings, alt: "Two hands showing new wedding rings against the bouquet", cls: "col-span-6 md:col-span-4 aspect-[4/5] md:aspect-auto", pos: "50% 50%" },
    { src: PHOTOS.cake, alt: "A white wedding cake decorated with peach roses", cls: "col-span-6 md:col-span-4 aspect-[4/5] md:aspect-square", pos: "50% 40%" },
    { src: PHOTOS.hands, alt: "The couple's hands form a heart against the wedding dress", cls: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-square", pos: "50% 50%" },
  ]
  return (
    <section aria-labelledby="close-title" className="wrap pb-[clamp(88px,12vw,168px)]">
      <h2 id="close-title" className="display max-w-3xl text-2xl">The arbor, the rings, the cake: her weddings up close.</h2>
      <div className="mt-12 grid grid-cols-12 gap-3 md:gap-5">
        {shots.map((s, i) => (
          <motion.div key={s.src} className={`img-slot overflow-hidden ${s.cls}`} initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay: (i % 2) * 0.06 }}>
            <img src={s.src} alt={s.alt} referrerPolicy="no-referrer" width={1000} height={800} loading="lazy" style={{ objectPosition: s.pos }} className="transition-transform duration-700 ease-out hover:scale-[1.03]" />
          </motion.div>
        ))}
        <div className="col-span-12 flex items-end md:col-span-4">
          <p className="display text-lg italic text-muted">Photographs from Anna's own weddings in Nassau.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- 7. Check your date: the booking request ---------- */
function DateRequest() {
  const [kind, setKind] = useState<KindId>("beach")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("")
  const [pkg, setPkg] = useState("")
  const [names, setNames] = useState("")
  const [copied, setCopied] = useState(false)
  useEffect(() => { const on = (e: Event) => setKind((e as CustomEvent<KindId>).detail); addEventListener(PICK_EVENT, on); return () => removeEventListener(PICK_EVENT, on) }, [])
  const k = KINDS.find(x => x.id === kind)!
  const options = PACKAGES.filter(p => p.kind === kind)
  const p = options.find(o => o.id === pkg)
  const when = date ? new Date(date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""
  const line = [
    k.one,
    when && `on ${when}`,
    guests && `for ${guests} guests`,
    p && `, ${p.name} package (${usd(p.price)})`,
    names && `. Names: ${names}`,
  ].filter(Boolean).join(" ").replace(" ,", ",").replace(" .", ".")
  const copy = async () => { try { await navigator.clipboard.writeText(line); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ } }
  return (
    <section id="date" aria-labelledby="date-title" className="scroll-mt-12 border-t border-line">
      <div className="wrap grid gap-x-[clamp(32px,5vw,88px)] gap-y-12 py-[clamp(88px,12vw,168px)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <p className="smallcaps text-channel">Booking request</p>
          <h2 id="date-title" className="display mt-5 text-2xl">Request your wedding date.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">Tell Anna what you have in mind. Your request becomes one line to read out or paste, and she confirms the date with you directly.</p>
        </div>
        <div>
          <form className="grid gap-x-8 gap-y-8 sm:grid-cols-2" onSubmit={e => e.preventDefault()}>
            <label className="block"><span className="text-sm text-muted">Kind of wedding</span>
              <select className="field mt-1" value={kind} onChange={e => { setKind(e.target.value as KindId); setPkg("") }}>{KINDS.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
            <label className="block"><span className="text-sm text-muted">Package</span>
              <select className="field mt-1" value={pkg} onChange={e => setPkg(e.target.value)}><option value="">Not sure yet</option>{options.map(o => <option key={o.id} value={o.id}>{o.name}, {usd(o.price)}</option>)}</select></label>
            <label className="block"><span className="text-sm text-muted">{kind === "cruise" ? "Your day in Nassau" : "Wedding date"}</span>
              <input className="field mt-1" type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
            <label className="block"><span className="text-sm text-muted">Guests, the two of you included</span>
              <input className="field num mt-1" type="number" inputMode="numeric" min={2} max={200} value={guests} onChange={e => setGuests(e.target.value.replace(/\D/g, ""))} /></label>
            <label className="block sm:col-span-2"><span className="text-sm text-muted">Your names</span>
              <input className="field mt-1" type="text" autoComplete="name" value={names} onChange={e => setNames(e.target.value)} /></label>
          </form>
          <div className="mt-12 bg-ink p-7 text-ground md:p-10">
            <p className="smallcaps text-ground/60">Your request</p>
            <p className="display mt-4 min-h-[3.2em] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug" aria-live="polite">{line}.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={TEL} className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-ground px-6 font-medium text-ink transition-colors hover:bg-flats"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Call Nassau <span className="num">{PHONE}</span></a>
              <a href={US_TEL} className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-ground/30 px-6 transition-colors hover:border-ground">US line <span className="num">{US_PHONE}</span></a>
              <button onClick={copy} className="inline-flex min-h-12 items-center justify-center gap-2.5 px-2 text-ground/80 transition-colors hover:text-ground">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={copied ? "y" : "n"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="inline-flex items-center gap-2">
                    {copied ? <><Check className="size-4" strokeWidth={2} aria-hidden /> Copied</> : <><Copy className="size-4" strokeWidth={1.5} aria-hidden /> Copy the line</>}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 8. Questions ---------- */
const FAQ = [
  ["Can we marry on a cruise ship day in Nassau?", "Yes. Anna's cruise packages are built for it. The licence needs a letter from the ship's purser confirming the ship has been in Bahamian waters for 24 hours."],
  ["How long must we be in The Bahamas before applying for the licence?", "Both of you must be in The Bahamas, and have been for 24 hours, before the date you apply."],
  ["What does a package cost?", "Published packages start at USD 950 for the Basic beach package, and vow renewals at USD 875. Cruise packages start at USD 3,495 for 25 guests. Every package can be adjusted to your guest count and wishes."],
  ["What is the marriage licence fee?", "The licence fee is $100. Anna prepares your documents and schedules the Registrar's appointment."],
]

function Questions() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line">
      <div className="wrap grid gap-x-[clamp(32px,5vw,88px)] gap-y-10 py-[clamp(80px,10vw,140px)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <h2 id="faq-title" className="display text-[clamp(2rem,3.2vw,3rem)]">What couples ask first.</h2>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="min-h-16 py-5 text-left font-[family-name:var(--font-display)] text-[1.35rem] font-normal leading-snug hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

mount(<Page home><Hero /><Finder /><OtherKinds /><Spread /><Licence /><Anna /><UpClose /><DateRequest /><Questions /></Page>)
