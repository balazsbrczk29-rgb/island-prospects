import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, BOOK } from "./site"
import { STAYS, EnquirySection } from "./parts"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28" aria-labelledby="s-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-casuarina">Cottages and villas · Fernandez Bay, Cat Island</motion.p>
          <h1 id="s-title" className="mt-6 font-display text-[clamp(3rem,7.6vw,7rem)] font-light leading-[0.92] tracking-[-0.03em]">
            {["Eight cottages,", "two villas."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> at Fernandez Bay Village</span>
          </h1>
        </div>
        <motion.div className="lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>
          <p className="text-[17px] leading-relaxed text-muted">Garden bathrooms open to the sky, private patios and porches, ocean views. Rates and dates are live in the booking engine.</p>
          <a href={BOOK} className="btn btn-primary mt-6">Check availability</a>
        </motion.div>
      </div>
      <nav aria-label="Jump to a cottage" className="mt-14 flex flex-wrap gap-2 border-t border-line pt-6">
        {STAYS.map(s => <a key={s.id} href={`#${s.id}`} className="min-h-11 rounded-full border border-ink/15 px-4 py-2.5 text-[14px] transition hover:-translate-y-px hover:border-ink">{s.name}</a>)}
      </nav>
    </section>
  )
}

function List() {
  return (
    <section aria-label="All cottages and villas">
      {STAYS.map((s, i) => {
        const partner = s.pair ? STAYS.find(x => x.id === s.pair) : undefined
        const villa = s.kind === "villa"
        return (
          <article id={s.id} key={s.id} className={`scroll-mt-20 ${villa ? "bg-ink text-paper" : i % 2 ? "bg-paper-2" : ""}`}>
            <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <Photo src={s.img} alt={`${s.name} at Fernandez Bay Village, Cat Island`} className="aspect-[3/2] rounded-[4px]" />
              </div>
              <Reveal className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                <Label n={String(i + 1).padStart(2, "0")} className={villa ? "text-shallows" : "text-casuarina"}>{villa ? "Villa" : "Cottage"}{s.bed ? ` · ${villa ? s.bed : `${s.bed} bed`}` : ""}</Label>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-light leading-[1] tracking-[-0.02em]">{s.name}</h2>
                <p className={`mt-5 text-[17px] leading-relaxed ${villa ? "text-paper/75" : "text-muted"}`}>{s.line}</p>
                <ul className={`mt-6 divide-y border-y text-[15px] ${villa ? "divide-paper/15 border-paper/15" : "divide-line border-line"}`}>
                  {s.has.map(h => <li key={h} className="py-2.5">{h}</li>)}
                  {partner && <li className="py-2.5"><a href={`#${partner.id}`} className="ulink">Adjoins {partner.name}, for families</a></li>}
                </ul>
                <a href={BOOK} className={`btn mt-7 ${villa ? "btn-light" : "btn-quiet"}`}>Check {s.name} dates <ArrowUpRight className="size-4" aria-hidden /></a>
              </Reveal>
            </div>
          </article>
        )
      })}
    </section>
  )
}

function Clubhouse() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="club-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Photo src={IMG.manorKitchen} alt="Inside the Manor House at Fernandez Bay Village" className="aspect-[4/3] rounded-[4px] lg:col-span-6" />
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <Label className="text-casuarina">Every stay includes</Label>
          <h2 id="club-title" className="mt-4 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-light leading-[1]">The Clubhouse, <em>a few steps away.</em></h2>
          <ul className="mt-6 space-y-2 text-[16px] text-muted">
            <li>Front desk for maps, massages, boats and tours</li>
            <li>Complimentary coffee and WiFi in the Clubhouse area</li>
            <li>The Boutique: gifts, beachwear, ice cream and snacks</li>
            <li>Kayaks and paddleboards for the bay</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

mount(
  <Page current="Cottages & villas">
    <Hero />
    <List />
    <Clubhouse />
    <EnquirySection n="" />
  </Page>
)
