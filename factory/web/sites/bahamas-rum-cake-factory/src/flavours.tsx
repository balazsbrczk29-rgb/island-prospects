import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { FLAVOURS, STORE } from "./data"
import { Page, mount, Reveal, ease } from "./site"

function Menu() {
  const [hover, setHover] = useState(0)
  const f = FLAVOURS[hover]
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 md:px-10 md:pt-24" aria-labelledby="f-h1">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] tracking-[0.2em] text-gold uppercase">Bahamas Rum Cake Factory · The range</motion.p>
      <h1 id="f-h1" className="mt-6 font-display text-[clamp(3rem,7.6vw,7.6rem)] leading-[0.92]">
        {["Fourteen flavours,", "one downtown shop."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.07em]"><motion.span className="block" initial={{ y: "106%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
      </h1>
      <p className="mt-6 max-w-xl text-[17px] text-muted">The online shop sells 4 oz and 20 oz singles, six packs and bundles. Point at a name to see the cake.</p>
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <ol className="lg:col-span-7" onMouseLeave={() => {}}>
          {FLAVOURS.map((x, i) => (
            <li key={x.name} className="border-t border-line last:border-b">
              <a href={STORE} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} className="group grid min-h-16 grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-4">
                <span className="font-display text-[15px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight transition ${hover === i ? "translate-x-2 text-gold" : "group-hover:translate-x-1"}`}>{x.name}</span>
                  {x.note && <span className="mt-1 block text-[15px] text-muted">{x.note}</span>}
                </span>
                <span className="flex items-center gap-2 text-[13px] text-muted">{x.seasonal ? "Seasonal" : "Order"}<ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span>
              </a>
            </li>
          ))}
        </ol>
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 grid aspect-square place-items-center rounded-full bg-conch">
            <AnimatePresence mode="wait">
              {f.img ? (
                <motion.img key={f.name} src={f.img} alt={`${f.name} rum cake`} width={700} height={700} initial={{ opacity: 0, scale: 0.92, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease }} className="size-[78%] object-contain drop-shadow-[0_30px_30px_rgba(42,26,18,0.22)]" />
              ) : (
                <motion.p key={f.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-10 text-center font-display text-5xl text-rum">{f.name}</motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Reveal className="mt-16"><a href={STORE} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rum px-6 text-[15px] text-cream transition hover:-translate-y-px hover:bg-gold">Order from the online shop <ArrowUpRight className="size-4" aria-hidden /></a></Reveal>
    </section>
  )
}

mount(<Page current="Flavours"><Menu /></Page>)
