import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check, Phone, ArrowRight } from "lucide-react"
import { Page, mount, ease, wipe } from "./site"
import { KINDS, PACKAGES, usd, PHONE, TEL, type KindId } from "./data"

const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function Hero() {
  return (
    <section aria-labelledby="pk-title" className="wrap pt-[clamp(40px,8vh,96px)] pb-[clamp(56px,8vw,112px)]">
      <p className="smallcaps text-channel">Packages and prices</p>
      <h1 id="pk-title" className="display mt-6 max-w-[14ch] text-3xl leading-[0.93] tracking-[-0.035em]">
        {["Fifteen ways", "to say yes", "in Nassau."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1.1, ease: wipe }}>{l}</motion.span></span>
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
    <section id={kind} aria-labelledby={`h-${kind}`} className={`scroll-mt-12 ${kind === "cruise" ? "bg-flats" : "border-t border-line"}`}>
      <div className="wrap grid gap-x-[clamp(32px,5vw,88px)] gap-y-12 py-[clamp(80px,10vw,144px)] xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <p className="smallcaps text-muted">{kind === "beach" ? "Staying on island" : "Arriving by cruise ship"}</p>
          <h2 id={`h-${kind}`} className="display mt-5 text-2xl">{k.name}</h2>
          <div role="tablist" aria-label={`${k.name} packages`} className="mt-10 border-t border-ink/15">
            {list.map(x => (
              <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)} className="group relative flex min-h-16 w-full items-baseline justify-between gap-4 border-b border-ink/15 py-4 text-left">
                {sel === x.id && <motion.span layoutId={`sel-${kind}`} className="absolute top-3 bottom-3 -left-4 w-px bg-channel" transition={{ duration: 0.4, ease }} />}
                <span className={`display text-[1.7rem] transition-colors ${sel === x.id ? "text-channel" : "group-hover:text-channel"}`}>{x.name}</span>
                <span className="num text-sm text-muted">{usd(x.price)}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="img-slot aspect-[4/5] overflow-hidden">
              <img src={p.img} alt={`${p.name} package, a wedding planned by Anna's in Nassau`} referrerPolicy="no-referrer" width={900} height={1125} loading="lazy" />
            </div>
            <div>
              <p className="display num text-[clamp(2.75rem,4.4vw,4rem)] leading-none">{usd(p.price)}</p>
              <p className="mt-3 text-sm text-muted">{p.name} package, {p.guests === 2 ? "for the two of you" : `set up for up to ${p.guests} guests`}</p>
              <ul className="mt-8 space-y-3 text-base">{p.items!.map(it => <li key={it} className="flex gap-3"><Check className="mt-1.5 size-3.5 shrink-0 text-channel" strokeWidth={2} aria-hidden />{it}</li>)}</ul>
              <a href={TEL} className="mt-10 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-channel px-6 font-medium text-ground transition-colors hover:bg-ink"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Ask Anna about {p.name}</a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}

function PriceOnly({ kind }: { kind: KindId }) {
  const k = KINDS.find(x => x.id === kind)!
  const list = PACKAGES.filter(p => p.kind === kind)
  return (
    <div id={kind} className="scroll-mt-12">
      <div className="img-slot aspect-[4/3] overflow-hidden"><img src={k.img} alt={k.alt} referrerPolicy="no-referrer" width={900} height={675} loading="lazy" style={{ objectPosition: k.pos }} /></div>
      <h3 className="display mt-7 text-[2rem]">{k.name}</h3>
      <ul className="mt-5 border-t border-line">
        {list.map(p => <li key={p.id} className="flex items-baseline justify-between gap-3 border-b border-line py-3.5"><span className="display text-lg">{p.name}</span><span className="num shrink-0 whitespace-nowrap text-sm text-muted">{p.price.toLocaleString("en-US")}</span></li>)}
      </ul>
    </div>
  )
}

function More() {
  return (
    <section aria-labelledby="more-title" className="wrap py-[clamp(80px,10vw,144px)]">
      <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-12 xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <h2 id="more-title" className="display text-[clamp(2rem,3vw,2.9rem)] leading-[1.02]">Traditions, grand days and anniversaries.</h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">Prices in US dollars, as listed on Anna's booking form. Inclusions on request: call and she will walk you through each one.</p>
          <a href={TEL} className="mt-9 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-channel px-6 font-medium text-ground transition-colors hover:bg-ink"><Phone className="size-4" strokeWidth={1.5} aria-hidden /> Call <span className="num">{PHONE}</span></a>
          <a href="index.html#date" className="mt-4 flex min-h-11 items-center gap-2 text-base transition-colors hover:text-channel">Or request your wedding date <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden /></a>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          <PriceOnly kind="cultural" /><PriceOnly kind="deluxe" /><PriceOnly kind="renewal" />
        </div>
      </div>
    </section>
  )
}

mount(<Page><Hero /><Detailed kind="beach" /><Detailed kind="cruise" /><More /></Page>)
