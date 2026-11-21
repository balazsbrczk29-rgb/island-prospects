import { useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import Lenis from "lenis"
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react"
import "./styles.css"

// Facts: facebook.com/cpc242 and instagram.com/consumerprotectioncommission (see factory/briefs/consumer-protection-commission.md)
const PHONE = "(242) 604-9020", TEL = "+12426049020"
const WA = "(242) 357-7898", WA_NUM = "12423577898"
const EMAIL = "complaints@bahamas.gov.bs", INFO = "info@cpcbahamas.gov.bs"
const A = "https://ip-assets-consumer-protection-commission.lovable.app/assets/"
const IMG = {
  receipt: { src: A + "receipt-hands.jpg", w: 1920, h: 1088 },
  part: { src: A + "car-part.jpg", w: 1920, h: 1440 },
  counter: { src: A + "counter-talk.jpg", w: 1920, h: 1088 },
}
const ease = [0.22, 1, 0.36, 1] as const

const WHAT = [
  { id: "Something I bought", hint: "Faulty, not as described, or never delivered" },
  { id: "A repair or service", hint: "A job done badly, or not done at all" },
  { id: "A price, bill or refund", hint: "Overcharged, or a refund refused" },
  { id: "Something else", hint: "Tell us in your own words" },
]
const WANT = ["My money back", "A repair", "A replacement", "Something else"]
const EVIDENCE = ["Receipt or invoice", "Bank or card record of the payment", "Clear photos of the problem", "Messages with the business"]
const PROMISES = [
  { t: "We log it", d: "Your complaint gets a record the day it arrives." },
  { t: "We review it", d: "We read what happened and what you have to show it." },
  { t: "We reach out to the business", d: "The Commission contacts the business for you." },
  { t: "We update you", d: "You hear from us along the way, not only at the end." },
]

function Header() {
  return (
    <header className="bg-[var(--color-stone)]">
      <a href="#main" className="skip">Skip to content</a>
      <div className="wrap flex items-center justify-between gap-4 min-h-[72px] border-b border-[var(--color-line)]">
        <a href="#top" className="flex items-center gap-3 min-h-[44px]">
          <span aria-hidden className="grid place-items-center w-9 h-9 rounded-full bg-[var(--color-glass-deep)] text-white font-[family-name:var(--font-display)] text-[0.95rem]">C</span>
          <span className="leading-tight"><span className="block font-[750] text-[0.9375rem] sm:text-[1rem]">Consumer Protection <br className="sm:hidden" />Commission</span><span className="hidden sm:block text-xs text-[var(--color-muted)]">The Bahamas</span></span>
        </a>
        <nav aria-label="Main" className="hidden md:flex items-center gap-7 text-sm">
          <a className="link no-underline hover:underline" href="#next">What happens next</a>
          <a className="link no-underline hover:underline" href="#before">Before you file</a>
          <a className="link no-underline hover:underline" href="#visit">Visit us</a>
          <a className="link tnum" href={`tel:${TEL}`}>{PHONE}</a>
        </nav>
        <a href="#file" className="md:hidden link text-sm font-[750] whitespace-nowrap">File a complaint</a>
      </div>
    </header>
  )
}

function Hero({ onPick }: { onPick: (w: string) => void }) {
  return (
    <section id="top" aria-labelledby="h1" className="bg-[var(--color-stone)]">
      <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-0 pt-10 lg:pt-0">
        <div className="lg:col-span-6 lg:pr-16 lg:py-14 flex flex-col justify-center">
          <motion.h1 id="h1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="text-[clamp(2.4rem,1.5rem+2.8vw,4.1rem)] max-w-[15ch]">
            A business won't put it right? We'll take it to them.
          </motion.h1>
          <p className="mt-5 text-base lg:text-lg text-[var(--color-muted)] max-w-[44ch]">The Consumer Protection Commission investigates complaints against businesses under the Consumer Protection Act 2023.</p>
          <h2 className="mt-8 text-xl">What went wrong?</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {WHAT.map((w, i) => (
              <motion.li key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}>
                <button type="button" onClick={() => onPick(w.id)}
                  className="group w-full h-full text-left rounded-[var(--r)] bg-[var(--color-paper)] border border-[var(--color-line)] hover:border-[var(--color-glass)] px-5 py-4 min-h-[76px] transition-colors">
                  <span className="flex items-center justify-between gap-3 font-[800] text-[1.125rem]">{w.id}<ArrowRight aria-hidden size={20} strokeWidth={2} className="shrink-0 text-[var(--color-glass)] transition-transform group-hover:translate-x-1" /></span>
                  <span className="block text-xs text-[var(--color-muted)] mt-0.5">{w.hint}</span>
                </button>
              </motion.li>
            ))}
          </ul>
          <p className="mt-6 text-sm">Rather talk to someone? <a className="link font-[750] tnum" href={`https://wa.me/${WA_NUM}`}>WhatsApp {WA}</a> or <a className="link font-[750] tnum" href={`tel:${TEL}`}>call {PHONE}</a></p>
        </div>
        <figure className="lg:col-span-6 -mx-[var(--pad)] lg:mx-0 lg:mr-[calc(-1*var(--pad))] relative h-[44vh] lg:h-auto lg:min-h-[calc(100vh-72px)] overflow-hidden">
          <motion.img initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }}
            src={IMG.receipt.src} width={IMG.receipt.w} height={IMG.receipt.h} fetchPriority="high"
            alt="Illustrative photograph: a customer's hands at a shop counter holding a long till receipt" className="photo absolute inset-0 object-[68%_50%]" />
        </figure>
      </div>
    </section>
  )
}

function Promises() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] })
  const fill = useTransform(p, v => Math.min(1, Math.max(0, v * 1.1)))
  return (
    <section id="next" ref={ref} aria-labelledby="next-h" className="bg-[var(--color-glass-field)]">
      <div className="wrap py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <h2 id="next-h" className="lg:col-span-6 text-2xl max-w-[16ch]">What happens after you file</h2>
          <blockquote className="lg:col-span-5 lg:col-start-8 font-[family-name:var(--font-display)] text-xl leading-snug text-[var(--color-glass-deep)]">
            "We log it, review it, reach out to the business, and update you along the way. You don't have to guess or worry."
            <footer className="mt-3 font-[family-name:var(--font-sans)] text-xs text-[var(--color-muted)]">The Commission, on Facebook</footer>
          </blockquote>
        </div>
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          <div aria-hidden className="hidden lg:block absolute left-0 right-0 top-[19px] h-[2px] bg-[var(--color-line)]" />
          <motion.div aria-hidden className="hidden lg:block absolute left-0 right-0 top-[19px] h-[2px] bg-[var(--color-glass-deep)] origin-left" style={{ scaleX: fill }} />
          <div aria-hidden className="lg:hidden absolute left-[19px] top-0 bottom-0 w-[2px] bg-[var(--color-line)]" />
          <motion.div aria-hidden className="lg:hidden absolute left-[19px] top-0 bottom-0 w-[2px] bg-[var(--color-glass-deep)] origin-top" style={{ scaleY: fill }} />
          {PROMISES.map((s, i) => (
            <li key={s.t} className="relative pl-14 lg:pl-0 lg:pt-14">
              <span className="absolute left-0 top-0 grid place-items-center w-10 h-10 rounded-full bg-[var(--color-paper)] border-2 border-[var(--color-glass-deep)] font-[800] tnum text-[var(--color-glass-deep)]">{i + 1}</span>
              <h3 className="text-xl">{s.t}</h3>
              <p className="mt-2 text-base text-[var(--color-muted)] max-w-[28ch]">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Before() {
  return (
    <section id="before" aria-labelledby="before-h" className="bg-[var(--color-stone)]">
      <div className="wrap py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <h2 id="before-h" className="text-2xl max-w-[14ch]">Three things that make a complaint strong</h2>
          <ol className="mt-10 border-t border-[var(--color-line)]">
            {[
              ["Go to the business first.", "Give them the chance to fix it. If you don't get a satisfactory answer, bring it to us."],
              ["Take clear photos.", "Of the item, the fault and anything that came with it, before you hand it back."],
              ["Lost the receipt? You still have rights.", "A bank or card record of the payment shows what you paid and when."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-6 border-b border-[var(--color-line)]">
                <span className="font-[family-name:var(--font-display)] text-xl text-[var(--color-glass-deep)] tnum">{i + 1}</span>
                <span><span className="block font-[800] text-lg">{t}</span><span className="block mt-1 text-[var(--color-muted)]">{d}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <figure className="lg:col-span-5 lg:col-start-8">
          <div className="overflow-hidden rounded-[var(--r)]" style={{ aspectRatio: "4 / 3" }}>
            <img src={IMG.part.src} width={IMG.part.w} height={IMG.part.h} loading="lazy" alt="Illustrative photograph: a worn brake pad next to its folded receipt on a garage workbench" className="photo" />
          </div>
          <figcaption className="mt-3 text-xs text-[var(--color-muted)]">A part that failed too soon, and the receipt that goes with it.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Desk({ what, setWhat }: { what: string; setWhat: (s: string) => void }) {
  const [f, setF] = useState({ biz: "", happened: "", want: "", name: "", phone: "" })
  const [ev, setEv] = useState<string[]>([])
  const steps = [!!what, !!f.biz && !!f.happened, !!f.want, !!f.name && !!f.phone]
  const done = steps.filter(Boolean).length
  const text = useMemo(() => [
    "Hello, I'd like to file a complaint with the Consumer Protection Commission.",
    `What went wrong: ${what || "-"}`, `Business: ${f.biz || "-"}`, `What happened: ${f.happened || "-"}`,
    `What I would like: ${f.want || "-"}`, `I have: ${ev.length ? ev.join(", ") : "-"}`, `My name: ${f.name || "-"}`, `My number: ${f.phone || "-"}`,
  ].join("\n"), [what, f, ev])
  const input = "w-full min-h-[52px] rounded-[var(--r-in)] bg-white border border-[var(--color-line)] focus:border-[var(--color-glass)] outline-none px-4 py-3 text-base"
  const chip = (on: boolean) => `min-h-[48px] px-4 rounded-[var(--r-in)] border text-left font-[700] transition-colors ${on ? "bg-[var(--color-glass-deep)] text-white border-[var(--color-glass-deep)]" : "bg-white border-[var(--color-line)] hover:border-[var(--color-glass)]"}`
  const Label = ({ n, t }: { n: number; t: string }) => (
    <legend className="flex items-center gap-3 font-[800] text-lg mb-4">
      <span className={`grid place-items-center w-8 h-8 rounded-full text-sm tnum transition-colors ${steps[n - 1] ? "bg-[var(--color-glass-deep)] text-white" : "border-2 border-[var(--color-line)] text-[var(--color-muted)]"}`}>{steps[n - 1] ? <Check size={16} strokeWidth={3} aria-hidden /> : n}</span>{t}
    </legend>
  )
  return (
    <section id="file" aria-labelledby="file-h" className="bg-[var(--color-paper)] scroll-mt-4">
      <div className="wrap py-24 lg:py-32">
        <h2 id="file-h" className="text-2xl max-w-[18ch]">File a complaint</h2>
        <p className="mt-4 text-[var(--color-muted)]">About five minutes. It goes to the Commission by WhatsApp or email, written out for you.</p>
        <div className="mt-12 grid lg:grid-cols-12 gap-12">
          <form className="lg:col-span-7 space-y-10" onSubmit={e => e.preventDefault()} aria-label="Complaint to the Consumer Protection Commission">
            <fieldset><Label n={1} t="What went wrong?" />
              <div className="grid sm:grid-cols-2 gap-2">{WHAT.map(w => <button type="button" key={w.id} aria-pressed={what === w.id} onClick={() => setWhat(w.id)} className={chip(what === w.id)}>{w.id}</button>)}</div>
            </fieldset>
            <fieldset><Label n={2} t="Who and what happened" />
              <div className="space-y-4">
                <label className="block"><span className="text-sm font-[700]">Name of the business</span><input className={`${input} mt-1.5`} value={f.biz} onChange={e => setF({ ...f, biz: e.target.value })} /></label>
                <label className="block"><span className="text-sm font-[700]">What happened, and when</span><textarea rows={4} className={`${input} mt-1.5`} value={f.happened} onChange={e => setF({ ...f, happened: e.target.value })} /></label>
              </div>
            </fieldset>
            <fieldset><Label n={3} t="What would put it right?" />
              <div className="grid sm:grid-cols-2 gap-2">{WANT.map(w => <button type="button" key={w} aria-pressed={f.want === w} onClick={() => setF({ ...f, want: w })} className={chip(f.want === w)}>{w}</button>)}</div>
              <p className="mt-6 text-sm font-[700]">What can you show us?</p>
              <div className="mt-2 grid sm:grid-cols-2 gap-2">
                {EVIDENCE.map(e => { const on = ev.includes(e); return (
                  <label key={e} className={`flex items-center gap-3 min-h-[48px] px-4 rounded-[var(--r-in)] border cursor-pointer ${on ? "border-[var(--color-glass)] bg-[var(--color-glass-field)]" : "border-[var(--color-line)] bg-white"}`}>
                    <input type="checkbox" className="w-5 h-5 accent-[var(--color-glass-deep)]" checked={on} onChange={() => setEv(on ? ev.filter(x => x !== e) : [...ev, e])} />{e}
                  </label>) })}
              </div>
            </fieldset>
            <fieldset><Label n={4} t="How we reach you" />
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block"><span className="text-sm font-[700]">Your name</span><input autoComplete="name" className={`${input} mt-1.5`} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></label>
                <label className="block"><span className="text-sm font-[700]">Phone or WhatsApp</span><input type="tel" autoComplete="tel" inputMode="tel" className={`${input} mt-1.5 tnum`} value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} /></label>
              </div>
            </fieldset>
          </form>

          <aside className="lg:col-span-5" aria-label="Your complaint, ready to send">
            <div className="lg:sticky lg:top-6 rounded-[var(--r)] bg-[var(--color-stone)] border border-[var(--color-line)] p-6 lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="font-[family-name:var(--font-display)] text-xl">Your complaint</p>
                <p className="text-xs text-[var(--color-muted)] tnum" aria-live="polite">{done} of 4 parts</p>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-[var(--color-line)] overflow-hidden"><motion.div className="h-full bg-[var(--color-glass-deep)] origin-left" animate={{ scaleX: done / 4 }} transition={{ duration: 0.4, ease }} /></div>
              <dl className="mt-6 space-y-3 text-sm">
                {[["What went wrong", what], ["Business", f.biz], ["What happened", f.happened], ["Would put it right", f.want], ["Can show", ev.join(", ")], ["From", [f.name, f.phone].filter(Boolean).join(", ")]].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-3"><dt className="text-[var(--color-muted)]">{k}</dt>
                    <dd className="break-words"><AnimatePresence mode="wait" initial={false}><motion.span key={v || "empty"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className={v ? "font-[700]" : "text-[#8C877C]"}>{v || "Not yet"}</motion.span></AnimatePresence></dd></div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <a className="btn !bg-[var(--color-wa)] hover:!bg-[#17603C]" href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`}><MessageCircle aria-hidden size={20} />Send on WhatsApp</a>
                <a className="link justify-center font-[750]" href={`mailto:${EMAIL}?subject=${encodeURIComponent("Consumer complaint" + (f.biz ? `: ${f.biz}` : ""))}&body=${encodeURIComponent(text)}`}>or send by email to {EMAIL}</a>
              </div>
              <p className="mt-4 text-xs text-[var(--color-muted)]">Opens WhatsApp or your email app with everything above written out. Attach your photos and receipt there.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function NotUs() {
  return (
    <section aria-labelledby="notus-h" className="bg-[var(--color-stone)]">
      <div className="wrap py-16 lg:py-20 grid lg:grid-cols-12 gap-6 border-b border-[var(--color-line)]">
        <h2 id="notus-h" className="lg:col-span-4 text-xl">Phone, internet or TV?</h2>
        <p className="lg:col-span-7 lg:col-start-6">Complaints about phone, internet and pay TV providers go to URCA, the communications regulator, at its <a className="link" href="https://urcabahamas.bs/consumer/">consumer centre</a>. For everything else a business sold you, start here.</p>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-h" className="bg-[var(--color-stone)]">
      <div className="wrap py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <figure className="lg:col-span-6 order-2 lg:order-1">
          <div className="overflow-hidden rounded-[var(--r)]" style={{ aspectRatio: "1920 / 1088" }}>
            <img src={IMG.counter.src} width={IMG.counter.w} height={IMG.counter.h} loading="lazy" alt="Illustrative photograph: a customer and a clerk across a shop counter, a boxed item and a receipt between them" className="photo" />
          </div>
        </figure>
        <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
          <h2 id="visit-h" className="text-2xl max-w-[12ch]">Prefer to come in?</h2>
          <address className="not-italic mt-6 text-lg">Consumer Protection Commission building<br />Tonique Williams-Darling Highway, west of Sunburst Paint<br />Nassau, New Providence</address>
          <dl className="mt-8 border-t border-[var(--color-line)] text-base">
            {[["Call", <a className="link tnum font-[750]" href={`tel:${TEL}`}><Phone aria-hidden size={18} />{PHONE}</a>], ["WhatsApp", <a className="link tnum font-[750]" href={`https://wa.me/${WA_NUM}`}><MessageCircle aria-hidden size={18} />{WA}</a>], ["Complaints", <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>], ["Everything else", <a className="link" href={`mailto:${INFO}`}>{INFO}</a>]].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 items-center py-2 border-b border-[var(--color-line)]"><dt className="text-[var(--color-muted)]">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <p className="mt-6 text-sm"><a className="link" href="https://www.facebook.com/cpc242/">Facebook</a> <span aria-hidden>·</span> <a className="link" href="https://www.instagram.com/consumerprotectioncommission/">Instagram</a></p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[#D9D4C9]">
      <div className="wrap py-14 grid gap-8 lg:grid-cols-12 items-end">
        <p className="lg:col-span-6 font-[family-name:var(--font-display)] text-xl text-white max-w-[24ch]">The Consumer Protection Commission, established under the Consumer Protection Act 2023.</p>
        <p className="lg:col-span-5 lg:col-start-8 text-xs text-[#ABA597] lg:text-right pb-14 lg:pb-0">Photographs are illustrative. Concept preview by ESTATIQ AI Solutions, not the Commission's official website.</p>
      </div>
    </footer>
  )
}

function Dock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const top = document.getElementById("top"), file = document.getElementById("file"), visit = document.getElementById("visit")
    if (!top || !file || !visit) return
    const vis = new Map<Element, boolean>()
    const io = new IntersectionObserver(es => { es.forEach(e => vis.set(e.target, e.isIntersecting)); setShow(!vis.get(top) && !vis.get(file) && !vis.get(visit)) })
    ;[top, file, visit].forEach(el => io.observe(el)); return () => io.disconnect()
  }, [])
  useEffect(() => { document.documentElement.style.setProperty("--concept-offset", show ? "68px" : "0px") }, [show])
  return (
    <AnimatePresence>{show && (
      <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ duration: 0.28, ease }}
        className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-[var(--color-stone)] border-t border-[var(--color-line)] px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] flex gap-2">
        <a href="#file" className="btn flex-1 !min-h-[48px]">File a complaint</a>
        <a href={`https://wa.me/${WA_NUM}`} aria-label={`WhatsApp ${WA}`} className="btn !min-h-[48px] !px-4 !bg-[var(--color-wa)]"><MessageCircle size={20} aria-hidden /></a>
      </motion.div>)}
    </AnimatePresence>
  )
}

function App() {
  const [what, setWhat] = useState("")
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return
    const l = new Lenis({ duration: 1.1 }); let id = 0; const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy() }
  }, [])
  const pick = (w: string) => { setWhat(w); document.getElementById("file")?.scrollIntoView({ behavior: "smooth" }) }
  return (
    <>
      <Header />
      <main id="main">
        <Hero onPick={pick} />
        <Promises />
        <Before />
        <Desk what={what} setWhat={setWhat} />
        <NotUs />
        <Visit />
      </main>
      <Footer />
      <Dock />
    </>
  )
}

const el = document.getElementById("root")!
el.innerHTML = ""
createRoot(el).render(<App />)
