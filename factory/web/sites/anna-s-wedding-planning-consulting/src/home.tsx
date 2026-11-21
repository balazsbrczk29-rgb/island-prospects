import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowRight, Phone, Copy, Check } from "lucide-react"
import { Page, mount, useIndex, ease, wipe, PICK_EVENT } from "./site"
import { KINDS, PACKAGES, LICENCE, PHOTOS, usd, PHONE, TEL, US_PHONE, US_TEL, type KindId } from "./data"

const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
const SECTION_Y = "py-[clamp(88px,11vw,160px)]"

/* ---------- 1. Hero: headline beside a full-height photograph the index can change ---------- */
function HeroPhoto() {
  const { heroKind } = useIndex()
  const k = KINDS.find(x => x.id === heroKind)!
  useEffect(() => { // warm the cache so a hover swap is instant
    const id = setTimeout(() => KINDS.slice(1).forEach(x => { const i = new Image(); i.referrerPolicy = "no-referrer"; i.src = x.img }), 1200)
    return () => clearTimeout(id)
  }, [])
  return (
    <figure className="mx-auto w-full max-w-[480px]">
      <div className="img-slot relative aspect-[16/9] overflow-hidden bg-line/40 shadow-[0_30px_60px_-40px_rgb(13_43_46/0.45)] lg:aspect-[4/5]">
        <AnimatePresence initial={false}>
          <motion.img
            key={k.id} src={k.img} alt={k.alt} referrerPolicy="no-referrer" width={1200} height={1500}
            fetchPriority={k.id === "renewal" ? "high" : "auto"}
            style={{ objectPosition: k.pos, zIndex: 2 }}
            className="absolute inset-0 size-full object-cover"
            initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)", zIndex: 2 }}
            exit={{ zIndex: 1, transition: { duration: 0.9 } }} transition={{ duration: 0.9, ease: wipe }}
          />
        </AnimatePresence>
      </div>
      <figcaption className="mt-2 lg:mt-3 flex items-baseline justify-between gap-4 text-sm text-muted">
        <span className="display text-base text-ink">{k.one}</span>
        <span className="hidden sm:inline">A wedding planned by Anna, Nassau</span>
      </figcaption>
    </figure>
  )
}

function KindIndex() {
  const { heroKind, setHeroKind } = useIndex()
  return (
    <ol aria-label="The five kinds of wedding Anna plans, with published starting prices" className="border-t border-line">
      {KINDS.map(k => (
        <li key={k.id} className="border-b border-line">
          <a href={`packages.html#${k.id}`} aria-current={heroKind === k.id || undefined}
            onMouseEnter={() => setHeroKind(k.id)} onFocus={() => setHeroKind(k.id)} onTouchStart={() => setHeroKind(k.id)}
            className={`group flex min-h-12 items-baseline justify-between gap-4 py-2.5 transition-colors ${heroKind === k.id ? "text-ink" : "text-ink/75 hover:text-ink"}`}>
            <span className="display text-[1.3rem] leading-tight tracking-[-0.02em]">{k.name}</span>
            <span className="num shrink-0 text-sm">from USD&nbsp;{k.from.toLocaleString("en-US")}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

function Hero() {
  return (
    <section data-index="hero" aria-labelledby="hero-title" className="relative flex flex-col lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
      <div className="order-2 flex flex-col px-5 pt-4 pb-10 lg:order-1 lg:px-[clamp(40px,4.4vw,72px)] lg:pt-9 lg:pb-14">
        <a href="index.html" className="hidden leading-none lg:block" aria-label="Anna's Wedding Planning, home">
          <span className="display block text-[2.6rem] tracking-[-0.04em]">Anna's</span>
          <span className="mt-2 block text-xs text-muted">Wedding Planning &amp; Consulting, Nassau</span>
        </a>
        <div className="lg:my-auto lg:pt-8">
          <h1 id="hero-title" className="display text-[clamp(2.75rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.045em]">
            {["Married", "barefoot", "in Nassau."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.07em]">
                <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 1.1, ease: wipe }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-4 max-w-[30rem] text-base leading-relaxed text-muted lg:mt-5 lg:text-lg">
            Annamae Fox has planned Nassau weddings for more than twenty years. Fifteen published packages, and your marriage licence handled.
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.9 }} className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
            <a href="#date" className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-channel px-7 text-base font-medium text-ground transition-[background-color,transform] duration-200 hover:bg-ink active:scale-[0.98]">
              Request your wedding date <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
            </a>
            <a href={TEL} className="inline-flex min-h-12 items-center gap-2 text-base transition-colors hover:text-channel"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Call Anna <span className="num text-muted">{PHONE}</span></a>
          </motion.div>
          <div className="mt-8 max-w-[34rem] lg:mt-10"><KindIndex /></div>
        </div>
      </div>
      <div className="order-1 bg-sand/60 px-5 pt-5 lg:order-2 lg:flex lg:items-center lg:px-[clamp(32px,4vw,72px)] lg:py-12">
        <HeroPhoto />
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
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={best.id} className="img-slot aspect-[16/9] overflow-hidden lg:aspect-[4/5]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
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

/* ---------- 4. The licence checklist, on the one shallow-water band ---------- */
function Licence() {
  const [done, setDone] = useState<number[]>([])
  const total = LICENCE.length
  return (
    <section id="licence" data-index="licence" aria-labelledby="lic-title" className="scroll-mt-12 bg-flats">
      <div className={`wrap ${SECTION_Y}`}>
        <h2 id="lic-title" className="display max-w-[16ch] text-[clamp(3rem,5.2vw,5.75rem)] leading-[0.92] tracking-[-0.045em]">Your paperwork, ticked off.</h2>
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
                <button aria-pressed={on} onClick={() => setDone(d => on ? d.filter(x => x !== i) : [...d, i])} className="group flex w-full items-start gap-5 py-5 text-left">
                  <span className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${on ? "border-channel bg-channel text-ground" : "border-ink/35 group-hover:border-channel"}`}>
                    <motion.span initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.2, ease }}><Check className="size-4" strokeWidth={2} aria-hidden /></motion.span>
                  </span>
                  <span className="text-base leading-relaxed">
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

/* ---------- 6. Up close ---------- */
function UpClose() {
  const shots = [
    { src: PHOTOS.group, alt: "A bride and groom exchange vows under a white arbor with their wedding party on the beach", cls: "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-auto md:row-span-2", pos: "62% 30%" },
    { src: PHOTOS.joy, alt: "A bride and groom throw their arms up in celebration on the beach", cls: "col-span-6 md:col-span-5 aspect-[4/5] md:aspect-[5/4]", pos: "50% 25%" },
    { src: PHOTOS.rings, alt: "Two hands showing new wedding rings against the bouquet", cls: "col-span-6 md:col-span-5 aspect-[4/5] md:aspect-[5/4]", pos: "50% 50%" },
  ]
  return (
    <section id="gallery" data-index="gallery" aria-labelledby="close-title" className="scroll-mt-12 wrap py-[clamp(88px,11vw,160px)]">
      <h2 id="close-title" className="display max-w-[22ch] text-[clamp(2.4rem,3.6vw,3.6rem)] leading-[1] tracking-[-0.04em]">The arbor, the joy, the rings: her weddings up close.</h2>
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

mount(<Page home hero={<Hero />}><Finder /><Licence /><UpClose /><DateRequest /></Page>)
