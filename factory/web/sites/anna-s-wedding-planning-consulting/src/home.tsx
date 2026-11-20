import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowRight, Phone, Copy, Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, useIndex, ease, wipe, PICK_EVENT } from "./site"
import { KINDS, PACKAGES, LICENCE, SERVICES, COUNTRIES, PHOTOS, usd, PHONE, TEL, US_PHONE, US_TEL, type KindId } from "./data"

const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
const SECTION_Y = "py-[clamp(88px,11vw,160px)]"

/* ---------- 1. Hero: headline beside a full-height photograph the index can change ---------- */
function HeroPhoto() {
  const { heroKind } = useIndex()
  const k = KINDS.find(x => x.id === heroKind)!
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, v => 1.05 - v * 0.05)
  useEffect(() => { // warm the cache so a hover swap is instant
    const id = setTimeout(() => KINDS.slice(1).forEach(x => { const i = new Image(); i.referrerPolicy = "no-referrer"; i.src = x.img }), 1200)
    return () => clearTimeout(id)
  }, [])
  return (
    <div ref={ref} className="img-slot relative h-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={k.id} src={k.img} alt={k.alt} referrerPolicy="no-referrer" width={1600} height={1200}
            fetchPriority={k.id === "beach" ? "high" : "auto"}
            style={{ objectPosition: k.pos, zIndex: 2 }}
            className="absolute inset-0 size-full object-cover"
            initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)", zIndex: 2 }}
            exit={{ zIndex: 1, transition: { duration: 0.9 } }} transition={{ duration: 0.9, ease: wipe }}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function KindTabs() {
  const { heroKind, setHeroKind } = useIndex()
  return (
    <div role="group" aria-label="Show a kind of wedding" className="no-scrollbar fade-right flex gap-5 overflow-x-auto px-5 pr-12 lg:hidden">
      {KINDS.map(k => (
        <button key={k.id} aria-pressed={heroKind === k.id} onClick={() => setHeroKind(k.id)} className={`relative min-h-11 shrink-0 text-sm transition-colors ${heroKind === k.id ? "text-ink" : "text-muted"}`}>
          {k.short}
          {heroKind === k.id && <motion.span layoutId="tab" className="absolute inset-x-0 bottom-1.5 h-px bg-channel" transition={{ duration: 0.4, ease }} />}
        </button>
      ))}
    </div>
  )
}

function Hero() {
  return (
    <section data-index="hero" aria-labelledby="hero-title" className="relative lg:grid lg:h-[100svh] lg:min-h-[680px] lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
      <div className="flex flex-col justify-center px-5 pt-7 pb-9 lg:px-[clamp(32px,3.6vw,56px)] lg:py-12">
        <h1 id="hero-title" className="display text-[clamp(3.25rem,4.9vw,5.4rem)] leading-[0.92] tracking-[-0.045em]">
          {["Married", "barefoot", "in Nassau."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.07em]">
              <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: wipe }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-6 max-w-[27rem] text-lg leading-relaxed text-muted lg:mt-8">
          Beach and cruise-day weddings planned by Annamae Fox for more than two decades. Fifteen published packages from USD&nbsp;875, and your marriage licence handled.
        </motion.p>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.9 }} className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 lg:mt-9">
          <a href="#date" className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-channel px-7 text-base font-medium text-ground transition-[background-color,transform] duration-200 hover:bg-ink active:scale-[0.98]">
            Request your wedding date <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
          </a>
          <a href={TEL} className="inline-flex min-h-12 items-center gap-2 text-base transition-colors hover:text-channel"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Call Anna</a>
        </motion.div>
      </div>
      <div>
        <div className="h-[72svh] min-h-[420px] lg:h-full"><HeroPhoto /></div>
        <div className="pt-2 lg:hidden"><KindTabs /></div>
      </div>
    </section>
  )
}

/* ---------- 2. Beach and cruise: the package finder as one spread ---------- */
function Finder() {
  const { mode, setMode } = useIndex()
  const [guests, setGuests] = useState(12)
  const list = useMemo(() => PACKAGES.filter(p => p.kind === mode).sort((a, b) => a.guests! - b.guests!), [mode])
  const max = mode === "beach" ? 50 : 40
  const n = Math.min(guests, max)
  const best = list.find(p => p.guests! >= n) ?? list[list.length - 1]
  const fill = `${((n - 2) / (max - 2)) * 100}%`
  return (
    <section id="weddings" data-index="weddings" aria-labelledby="finder-title" className={`scroll-mt-12 wrap ${SECTION_Y}`}>
      <div className="grid gap-x-[clamp(32px,4vw,72px)] gap-y-12 lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={best.id} className="img-slot aspect-[4/3] overflow-hidden lg:aspect-[5/6]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
              <motion.img src={best.img} alt={`${best.name} package, a wedding planned by Anna's in Nassau`} referrerPolicy="no-referrer" width={1200} height={1440} loading="lazy" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease }} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          <h2 id="finder-title" className="display text-[clamp(2.4rem,3.6vw,3.6rem)] leading-[1] tracking-[-0.04em]">How do you arrive, and who comes with you?</h2>
          <div role="radiogroup" aria-label="How you arrive" className="mt-10 grid grid-cols-2 border-b border-line">
            {([["beach", "Staying on island"], ["cruise", "Arriving by cruise ship"]] as const).map(([k, l]) => (
              <button key={k} role="radio" aria-checked={mode === k} onClick={() => setMode(k)} className={`relative min-h-14 pr-3 pb-3 text-left text-base transition-colors ${mode === k ? "text-ink" : "text-muted hover:text-ink"}`}>
                {l}
                {mode === k && <motion.span layoutId="mode" className="absolute right-0 -bottom-px left-0 h-0.5 bg-channel" transition={{ duration: 0.45, ease }} />}
              </button>
            ))}
          </div>
          <label className="mt-10 flex items-end gap-5" htmlFor="guests">
            <span className="display num w-[2.1ch] text-[clamp(5rem,8vw,8rem)] leading-[0.8] tracking-[-0.05em]">{n}</span>
            <span className="pb-1.5 text-base leading-snug text-muted">guests,<br />the two of you included</span>
          </label>
          <input id="guests" type="range" min={2} max={max} value={n} onChange={e => setGuests(+e.target.value)} style={{ ["--fill" as string]: fill }} className="range mt-5" aria-valuetext={`${n} guests`} />
          <div className="mt-10 border-t border-ink/20 pt-7" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={best.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease }}>
                <h3 className="display text-[clamp(2.75rem,4vw,4rem)] leading-none tracking-[-0.04em]">{best.name}</h3>
                <p className="display num mt-3 text-[clamp(2rem,3vw,2.9rem)] leading-none tracking-[-0.03em] text-channel">{usd(best.price)}</p>
                <p className="mt-3 text-sm text-muted">{best.guests === 2 ? "For the two of you" : `Set up for up to ${best.guests} guests`}, adjustable to your numbers and wishes.</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-x-[clamp(32px,4vw,72px)] gap-y-10 lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
        <div>
          <p className="display text-lg italic text-muted">What the {best.name} package includes</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul key={best.id} className="incl mt-4 text-[0.9375rem] leading-snug" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {best.items!.map(it => <li key={it}>{it}</li>)}
            </motion.ul>
          </AnimatePresence>
        </div>
        <div>
          <p className="display text-lg italic text-muted">{mode === "beach" ? "All beach packages" : "All cruise-day packages"}</p>
          <ul className="mt-4 border-t border-line">
            {list.map(p => (
              <li key={p.id} className="border-b border-line">
                <button onClick={() => setGuests(p.guests!)} aria-pressed={p.id === best.id} className="group grid min-h-14 w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-3 text-left">
                  <span className={`display text-[1.6rem] tracking-[-0.03em] transition-colors ${p.id === best.id ? "text-channel" : "group-hover:text-channel"}`}>{p.name}</span>
                  <span className="num text-sm text-muted">{usd(p.price)} · up to {p.guests}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- 3. One spread each for cultural, deluxe and renewal ---------- */
const BLURB: Record<string, string> = {
  cultural: "Indian and Jewish ceremonies, planned with the same care as every beach wedding. Anna can add a sand ceremony, a reverse unity candle or a hand fasting.",
  deluxe: "Three larger celebrations for couples who want the whole day in Nassau, from the ceremony to the reception.",
  renewal: "Say it again in Nassau: a simple renewal on the sand, a romantic dinner, or the Silver package.",
}

function KindSpread({ id, flip }: { id: KindId; flip?: boolean }) {
  const k = KINDS.find(x => x.id === id)!
  const list = PACKAGES.filter(p => p.kind === id)
  const ask = () => { window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: id })); document.getElementById("date")?.scrollIntoView({ behavior: "smooth" }) }
  return (
    <section id={id} data-index={id} aria-labelledby={`${id}-title`} className="scroll-mt-12 wrap pb-[clamp(88px,11vw,160px)]">
      <div className={`grid items-end gap-x-[clamp(32px,4vw,72px)] gap-y-10 ${flip ? "lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:[&>*:first-child]:order-2" : "lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]"}`}>
        <motion.div className="img-slot aspect-[4/3] overflow-hidden lg:aspect-[6/5]" initial={reduce ? false : { clipPath: "inset(6% 0 6% 0)" }} whileInView={{ clipPath: "inset(0% 0 0% 0)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.2, ease: wipe }}>
          <img src={k.img} alt={k.alt} referrerPolicy="no-referrer" width={1200} height={1000} loading="lazy" style={{ objectPosition: k.pos }} />
        </motion.div>
        <div className="lg:pb-2">
          <h2 id={`${id}-title`} className="display text-[clamp(2.6rem,4vw,4rem)] leading-[0.98] tracking-[-0.04em]">{k.name}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{BLURB[id]}</p>
          <ul className="mt-8 border-t border-ink/20">
            {list.map(p => (
              <li key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-4">
                <span className="display text-[1.7rem] leading-tight tracking-[-0.03em]">{p.name}</span>
                <span className="display num text-[1.7rem] leading-tight tracking-[-0.02em]">{usd(p.price)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Prices as listed on Anna's booking form. Inclusions on request.</p>
          <button onClick={ask} className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-ink/30 text-base transition-colors hover:border-channel hover:text-channel">Ask Anna about a {k.one.toLowerCase()} <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden /></button>
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. The licence checklist, on the one shallow-water band ---------- */
function Licence() {
  const [done, setDone] = useState<number[]>([])
  const total = LICENCE.length
  return (
    <section id="licence" data-index="licence" aria-labelledby="lic-title" className="scroll-mt-12 bg-flats">
      <div className={`wrap ${SECTION_Y}`}>
        <h2 id="lic-title" className="display max-w-[16ch] text-[clamp(3.25rem,6.4vw,7rem)] leading-[0.92] tracking-[-0.045em]">Your paperwork, ticked off.</h2>
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
        <p className="mt-8 max-w-[28rem] text-xs text-muted">As published by Anna's Wedding Planning. The Registrar General's Department of The Bahamas sets the rules; Anna confirms the current ones when you book.</p>
      </div>
    </section>
  )
}

/* ---------- 5. Anna ---------- */
function Anna() {
  return (
    <section id="anna" data-index="anna" aria-labelledby="anna-title" className={`scroll-mt-12 wrap ${SECTION_Y}`}>
      <div className="grid gap-x-[clamp(32px,4vw,72px)] gap-y-12 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <motion.div className="img-slot aspect-[4/5] overflow-hidden" initial={reduce ? false : { clipPath: "inset(10% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 1.2, ease: wipe }}>
            <img src={PHOTOS.joy} alt="A bride and groom throw their arms up in celebration on the beach" referrerPolicy="no-referrer" width={900} height={1125} loading="lazy" style={{ objectPosition: "50% 30%" }} />
          </motion.div>
        </div>
        <div>
          <h2 id="anna-title" className="display text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[0.98] tracking-[-0.04em]">Two decades of weddings, one planner who answers.</h2>
          <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-muted">
            <p>Annamae Fox has planned destination weddings in The Bahamas for more than twenty years, with a network of trusted professionals around her. Her aim is simple: you enjoy the day without worry, and it feels like nobody else's.</p>
          </div>
          <p className="display mt-10 max-w-[30ch] text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.02em]">Couples have flown to her from {COUNTRIES.slice(0, -2).join(", ")}, and both Americas.</p>
          <ol className="mt-12 border-t border-line">
            {SERVICES.map(([t, d]) => (
              <li key={t} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <p className="display text-[1.45rem] leading-snug tracking-[-0.02em]">{t}</p>
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
    { src: PHOTOS.group, alt: "A bride and groom exchange vows under a white arbor with their wedding party on the beach", cls: "col-span-12 md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto", pos: "50% 40%" },
    { src: PHOTOS.rings, alt: "Two hands showing new wedding rings against the bouquet", cls: "col-span-6 md:col-span-4 aspect-square", pos: "50% 50%" },
    { src: PHOTOS.cake, alt: "A white wedding cake decorated with peach roses", cls: "col-span-6 md:col-span-4 aspect-square", pos: "50% 40%" },
  ]
  return (
    <section aria-labelledby="close-title" className="wrap pb-[clamp(88px,11vw,160px)]">
      <h2 id="close-title" className="display max-w-[22ch] text-[clamp(2.4rem,3.6vw,3.6rem)] leading-[1] tracking-[-0.04em]">The arbor, the rings, the cake: her weddings up close.</h2>
      <div className="mt-12 grid grid-cols-12 gap-3 md:gap-5">
        {shots.map((s, i) => (
          <motion.div key={s.src} className={`img-slot overflow-hidden ${s.cls}`} initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay: i * 0.06 }}>
            <img src={s.src} alt={s.alt} referrerPolicy="no-referrer" width={1000} height={800} loading="lazy" style={{ objectPosition: s.pos }} className="transition-transform duration-700 ease-out hover:scale-[1.03]" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------- 7. Request your date: the booking request ---------- */
function DateRequest() {
  const [kind, setKind] = useState<KindId>("beach")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("")
  const [pkg, setPkg] = useState("")
  const [names, setNames] = useState("")
  const [copied, setCopied] = useState(false)
  useEffect(() => { const on = (e: Event) => { setKind((e as CustomEvent<KindId>).detail); setPkg("") }; addEventListener(PICK_EVENT, on); return () => removeEventListener(PICK_EVENT, on) }, [])
  const k = KINDS.find(x => x.id === kind)!
  const options = PACKAGES.filter(p => p.kind === kind)
  const p = options.find(o => o.id === pkg)
  const when = date ? new Date(date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""
  const line = [k.one, when && `on ${when}`, guests && `for ${guests} guests`, p && `, ${p.name} package (${usd(p.price)})`, names && `. Names: ${names}`]
    .filter(Boolean).join(" ").replace(" ,", ",").replace(" .", ".")
  const copy = async () => { try { await navigator.clipboard.writeText(line); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ } }
  return (
    <section id="date" data-index="date" aria-labelledby="date-title" className="scroll-mt-12 border-t border-line">
      <div className={`wrap grid gap-x-[clamp(32px,4vw,72px)] gap-y-12 ${SECTION_Y} xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]`}>
        <div>
          <h2 id="date-title" className="display text-[clamp(2.8rem,4.8vw,4.8rem)] leading-[0.95] tracking-[-0.045em]">Request your wedding date.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">Tell Anna what you have in mind. Your request becomes one line to read out or paste, and she confirms the date with you directly.</p>
        </div>
        <div>
          <form className="grid gap-x-8 gap-y-8 sm:grid-cols-2" onSubmit={e => e.preventDefault()}>
            <label className="block"><span className="text-sm text-muted">Kind of wedding</span>
              <select className="field mt-1" value={kind} onChange={e => { setKind(e.target.value as KindId); setPkg("") }}>{KINDS.map(x => <option key={x.id} value={x.id}>{x.one}</option>)}</select></label>
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
            <p className="display text-base italic text-ground/70">Your request</p>
            <p className="display mt-3 min-h-[3.2em] text-[clamp(1.6rem,2.6vw,2.3rem)] leading-snug tracking-[-0.02em]" aria-live="polite">{line}.</p>
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
      <div className="wrap grid gap-x-[clamp(32px,4vw,72px)] gap-y-10 py-[clamp(80px,10vw,140px)] xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <h2 id="faq-title" className="display text-[clamp(2.2rem,3.2vw,3.2rem)] leading-[1] tracking-[-0.04em]">What couples ask first.</h2>
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-line">
              <AccordionTrigger className="min-h-16 py-5 text-left font-[family-name:var(--font-display)] text-[1.35rem] font-normal leading-snug tracking-[-0.02em] hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="max-w-[38rem] pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

mount(<Page home><Hero /><Finder /><KindSpread id="cultural" flip /><KindSpread id="deluxe" /><KindSpread id="renewal" flip /><Licence /><Anna /><UpClose /><DateRequest /><Questions /></Page>)
