import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Phone, ArrowRight } from "lucide-react"
import { Page, mount, ease, wipe } from "./site"
import { KINDS, PACKAGES, usd, PHONE, TEL, type KindId } from "./data"

const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function Hero() {
  return (
    <section data-index="hero" aria-labelledby="pk-title" className="wrap pt-[clamp(40px,9vh,112px)] pb-[clamp(56px,8vw,112px)]">
      <h1 id="pk-title" className="display max-w-[14ch] text-[clamp(3.25rem,7vw,7.5rem)] leading-[0.92] tracking-[-0.045em]">
        {["Fifteen ways", "to say yes", "in Nassau."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1.1, ease: wipe }}>{l}</motion.span></span>
        ))}
      </h1>
      <p className="mt-9 max-w-xl text-lg leading-relaxed text-muted">Published prices in US dollars, from USD 875. Every package can be adjusted to your number of guests and to your wishes; Anna confirms the details when you call.</p>
    </section>
  )
}

function Detailed({ kind }: { kind: "beach" | "cruise" }) {
  const k = KINDS.find(x => x.id === kind)!
  const list = PACKAGES.filter(p => p.kind === kind).sort((a, b) => a.price - b.price)
  const [sel, setSel] = useState(list[0].id)
  const p = list.find(x => x.id === sel)!
  return (
    <section id={kind} data-index={kind} aria-labelledby={`h-${kind}`} className="scroll-mt-12 border-t border-line">
      <div className="wrap grid gap-x-[clamp(32px,4vw,72px)] gap-y-12 py-[clamp(80px,10vw,144px)] lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.id} className="img-slot aspect-[4/3] overflow-hidden lg:aspect-[5/6]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
              <img src={p.img} alt={`${p.name} package, a wedding planned by Anna's in Nassau`} referrerPolicy="no-referrer" width={1000} height={1200} loading="lazy" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          <h2 id={`h-${kind}`} className="display text-[clamp(2.6rem,4vw,4rem)] leading-[0.98] tracking-[-0.04em]">{k.name}</h2>
          <p className="mt-3 text-base text-muted">{kind === "beach" ? "For couples staying on the island." : "For couples arriving by cruise ship for the day."}</p>
          <div role="tablist" aria-label={`${k.name} packages`} className="mt-8 border-t border-ink/20">
            {list.map(x => (
              <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)} className="group grid min-h-16 w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-4 text-left">
                <span className={`display text-[1.75rem] tracking-[-0.03em] transition-colors ${sel === x.id ? "text-channel" : "group-hover:text-channel"}`}>{x.name}</span>
                <span className={`display num text-[1.75rem] tracking-[-0.02em] ${sel === x.id ? "text-channel" : ""}`}>{usd(x.price)}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <p className="display mt-10 text-lg italic text-muted">The {p.name} package, {p.guests === 2 ? "for the two of you" : `set up for up to ${p.guests} guests`}</p>
              <ul className="incl mt-4 text-[0.9375rem] leading-snug">{p.items!.map(it => <li key={it}>{it}</li>)}</ul>
              <a href={TEL} className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-channel px-6 font-medium text-ground transition-colors hover:bg-ink"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Ask Anna about {p.name}</a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function PriceOnly({ kind, flip }: { kind: KindId; flip?: boolean }) {
  const k = KINDS.find(x => x.id === kind)!
  const list = PACKAGES.filter(p => p.kind === kind)
  return (
    <section id={kind} data-index={kind} aria-labelledby={`h-${kind}`} className="scroll-mt-12 border-t border-line">
      <div className={`wrap grid items-end gap-x-[clamp(32px,4vw,72px)] gap-y-10 py-[clamp(72px,9vw,128px)] ${flip ? "lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:[&>*:first-child]:order-2" : "lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]"}`}>
        <div className="img-slot aspect-[4/3] overflow-hidden lg:aspect-[6/5]"><img src={k.img} alt={k.alt} referrerPolicy="no-referrer" width={1200} height={1000} loading="lazy" style={{ objectPosition: k.pos }} /></div>
        <div>
          <h2 id={`h-${kind}`} className="display text-[clamp(2.6rem,4vw,4rem)] leading-[0.98] tracking-[-0.04em]">{k.name}</h2>
          <ul className="mt-8 border-t border-ink/20">
            {list.map(p => (
              <li key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-4">
                <span className="display text-[1.7rem] tracking-[-0.03em]">{p.name}</span>
                <span className="display num text-[1.7rem] tracking-[-0.02em]">{usd(p.price)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Prices as listed on Anna's booking form. Inclusions on request.</p>
          <a href={TEL} className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-ink/30 text-base transition-colors hover:border-channel hover:text-channel"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Call <span className="num">{PHONE}</span></a>
        </div>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section aria-label="Next step" className="wrap border-t border-line py-[clamp(72px,9vw,128px)]">
      <a href="index.html#date" className="group inline-flex min-h-11 items-baseline gap-4">
        <span className="display text-[clamp(2.4rem,4.4vw,4.4rem)] leading-none tracking-[-0.045em] transition-colors group-hover:text-channel">Request your wedding date</span>
        <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" strokeWidth={1.25} aria-hidden />
      </a>
    </section>
  )
}

mount(<Page><Hero /><Detailed kind="beach" /><Detailed kind="cruise" /><PriceOnly kind="cultural" flip /><PriceOnly kind="deluxe" /><PriceOnly kind="renewal" flip /><Close /></Page>)
