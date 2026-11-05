import { motion } from "motion/react"
import { Phone } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease } from "./site"
import { PHONE, TEL, PHOTOS, LAND, SEA } from "./data"

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-16 md:px-10 md:pt-20" aria-labelledby="svc-title">
      <Label>What we make · Cover Up, Nassau</Label>
      <h1 id="svc-title" className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,6.8vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
        {["Awnings, shutters", "and canvas for boats."].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.1em]"><motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>
        ))}
      </h1>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Professional grade awnings, weather screens, hurricane shutters, marine canvas and retractable awnings, all customised and manufactured in The Bahamas by Island Marine Covering.</motion.p>
    </section>
  )
}

function Chapter({ id, n, title, items, photos, flip = false }: { id: string; n: string; title: string; items: readonly (readonly [string, string])[]; photos: { src: string; alt: string }[]; flip?: boolean }) {
  return (
    <section id={id} className={`${flip ? "bg-mist" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <div className="grid gap-4">{photos.map(p => <Photo key={p.src} src={p.src} alt={p.alt} className="aspect-[16/10] w-full" />)}</div>
        </div>
        <div className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
          <Reveal>
            <Label>{n}</Label>
            <h2 id={`${id}-title`} className="mt-5 font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1] font-semibold tracking-[-0.03em]">{title}</h2>
          </Reveal>
          <dl className="mt-10 border-t border-ink">
            {items.map(([t, d], i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease }} className="group grid gap-1 border-b border-line py-6 md:grid-cols-[1fr_1.3fr] md:gap-6">
                <dt className="font-display text-[1.6rem] leading-tight transition group-hover:translate-x-1">{t}</dt>
                <dd className="text-[16px] text-muted">{d}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="close-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:grid-cols-12 md:items-end md:px-10 md:py-28">
        <h2 id="close-title" className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.03em] md:col-span-7">Every piece starts with a call.</h2>
        <div className="md:col-span-5 md:justify-self-end">
          <a href={TEL} className="inline-flex min-h-14 items-center gap-3 rounded-[2px] bg-paper px-7 text-lg text-ink transition hover:-translate-y-px hover:bg-rope"><Phone className="size-5" aria-hidden /> Call {PHONE}</a>
          <p className="mt-4 text-[14px] text-paper/60">Or <a href="index.html#design" className="underline decoration-rope underline-offset-4">design an awning</a> first.</p>
        </div>
      </div>
    </section>
  )
}

mount(<Page current="What we make"><Intro /><Chapter id="land" n="On land" title="Shade for the verandah, shelter for the storm." items={LAND} photos={[PHOTOS.oldFortBay]} /><Chapter id="sea" n="On the water" title="From a 10 ft inflatable to a mega yacht." items={SEA} photos={[PHOTOS.covers, PHOTOS.upholstery]} flip /><Close /></Page>)
