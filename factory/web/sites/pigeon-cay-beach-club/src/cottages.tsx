import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Heading, ease, reveal, BOOK, EMAIL, TEL, PHONE } from "./site"
import { COTTAGES, I, INCLUDED } from "./data"
import { Estimator } from "./Estimator"

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-14 md:px-10 md:pt-24" aria-labelledby="c-title">
      <p className="label text-thatch">The cottages · Pigeon Cay Beach Club</p>
      <h1 id="c-title" className="display mt-8 text-[clamp(3.2rem,9vw,9.6rem)]">
        {[["From a studio", ""], ["to the Big House.", "italic text-thatch"]].map(([l, c], i) => (
          <span key={l} className="block overflow-hidden pb-[0.1em]"><motion.span className={`block ${c}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: reveal }}>{l}</motion.span></span>
        ))}
      </h1>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-xl text-[18px] leading-relaxed text-ink/80">Eight handcrafted cottages for two to six guests, all beachfront, all with air conditioning. Rates per night before 10% VAT and the 6% resort levy.</p>
        <a href={BOOK} className="pill">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
      </motion.div>
    </section>
  )
}

function List() {
  return (
    <section aria-label="All cottages">
      {COTTAGES.map((c, i) => (
        <article key={c.id} id={c.id} className="border-t border-line">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="font-display text-sm text-thatch italic">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,3.6vw,3.4rem)]">{c.name}</h2>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-[15px]">
                {[["Sleeps", `1 to ${c.guests}`], ["Per night", `$${c.rate}`], ["Beds", c.beds], ["Kitchen", c.kitchen]].map(([k, v]) => <div key={k} className="border-t border-ink/15 pt-2"><dt className="label text-muted">{k}</dt><dd className="mt-1 font-display text-lg">{v}</dd></div>)}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3"><a href={BOOK} className="pill">Check dates <ArrowUpRight className="size-4" aria-hidden /></a><a href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.name)}`} className="pill-line">Ask about {c.name}</a></div>
            </Reveal>
            <div className="no-bar flex snap-x snap-mandatory gap-4 overflow-x-auto lg:col-span-8" tabIndex={0} aria-label={`${c.name} photos, scroll sideways`}>
              {c.imgs.map((f, j) => (
                <motion.div key={f} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.08, duration: 0.9, ease }} className="group aspect-[4/3] w-[80%] shrink-0 snap-start overflow-hidden rounded-[20px] bg-paper-2 md:w-[60%]">
                  <img src={I + f} alt={`${c.name}, Pigeon Cay Beach Club, photo ${j + 1}`} loading="lazy" width={1200} height={900} className="size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </motion.div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function Notes() {
  return (
    <section className="bg-deep text-paper" aria-labelledby="n-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5"><Label light>Every cottage includes</Label><Heading id="n-title">The small things, sorted.</Heading>
          <p className="mt-6 text-paper/70">The club also manages private homes in the Pigeon Cay area. Call {PHONE} or email for details.</p></Reveal>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">{INCLUDED.map(x => <li key={x} className="border-b border-paper/15 py-4 text-[16px] text-paper/85">{x}</li>)}</ul>
      </div>
    </section>
  )
}

mount(<Page current="Cottages"><Hero /><List /><Notes /><Estimator n="03" /><a href={TEL} className="sr-only">Call {PHONE}</a></Page>)
