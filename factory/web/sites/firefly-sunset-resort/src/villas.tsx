import { motion } from "motion/react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG } from "./site"
import { VILLAS, RateCalculator, EnquirySection } from "./parts"

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 md:pt-14" aria-labelledby="v-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-sea">The villas · Hope Town, Elbow Cay</motion.p>
          <h1 id="v-title" className="mt-6 font-display text-[clamp(3.2rem,7.6vw,7.4rem)] leading-[0.92]">
            {["Mint, Java,", "and three that glow."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> The villas at Firefly Sunset Resort</span>
          </h1>
        </div>
        <motion.p className="text-[17px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>Each villa is fully equipped, with contemporary island comfort. Find your dates, then email the villa name, dates and number of guests to complete the booking.</motion.p>
      </div>
    </section>
  )
}

function List() {
  return (
    <section aria-label="Villas">
      {VILLAS.map((v, i) => (
        <article key={v.id} id={v.id} className={`scroll-mt-20 border-t border-line ${i % 2 ? "bg-paper-2" : ""}`}>
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Label n={`0${i + 1}`} className="text-sea">{v.beds}</Label>
              <h2 className="mt-4 font-display text-[clamp(3rem,5.4vw,5.4rem)] leading-[0.95]">{v.name}</h2>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">{v.line}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {v.detail.map(d => <li key={d} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[14px]">{d}</li>)}
              </ul>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              {v.img ? <Photo src={v.img} alt="Plunge pool overlooking the Sea of Abaco" className="mb-8 aspect-[3/2] rounded-[4px]" /> : null}
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">{v.name} rates, before 10% VAT</caption>
                <thead><tr className="border-b border-ink"><th className="label py-3 font-normal text-muted" scope="col">Season</th><th className="label py-3 text-right font-normal text-muted" scope="col">Nightly</th><th className="label py-3 text-right font-normal text-muted" scope="col">Weekly</th></tr></thead>
                <tbody className="divide-y divide-line">
                  <tr><th scope="row" className="py-4 font-normal">In season, Feb to Aug <span className="block text-[13px] text-muted">3-night minimum</span></th><td className="py-4 text-right font-display text-[1.6rem] tabular-nums">{usd(v.inS[0])}</td><td className="py-4 text-right font-display text-[1.6rem] tabular-nums">{usd(v.inS[1])}</td></tr>
                  <tr><th scope="row" className="py-4 font-normal">Off season, Sep to Jan <span className="block text-[13px] text-muted">Holidays priced separately</span></th><td className="py-4 text-right font-display text-[1.6rem] tabular-nums">{usd(v.offS[0])}</td><td className="py-4 text-right font-display text-[1.6rem] tabular-nums">{usd(v.offS[1])}</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-[13px] text-muted">Plus 10% VAT.</p>
              <a href="#enquire" onClick={() => window.dispatchEvent(new CustomEvent("ff:prefill", { detail: { villa: v.name, nights: "", month: "" } }))} className="btn btn-quiet mt-6">Request {v.name}</a>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function Whole() {
  return (
    <section className="bg-dusk text-paper" aria-labelledby="whole-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Label className="text-glow">The whole resort</Label>
          <h2 id="whole-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">All five villas, for one family or one wedding.</h2>
          <dl className="mt-10 divide-y divide-paper/15 border-y border-paper/15">
            <div className="flex justify-between py-4"><dt className="text-paper/70">One week</dt><dd className="font-display text-[1.8rem] tabular-nums">$49,258</dd></div>
            <div className="flex justify-between py-4"><dt className="text-paper/70">Three-day minimum</dt><dd className="font-display text-[1.8rem] tabular-nums">$21,731</dd></div>
          </dl>
          <p className="mt-3 text-[13px] text-paper/60">Both include VAT.</p>
          <a href="#enquire" onClick={() => window.dispatchEvent(new CustomEvent("ff:prefill", { detail: { villa: "The whole resort", nights: "", month: "" } }))} className="btn btn-glow mt-8">Ask about the whole resort</a>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="overflow-hidden rounded-[4px] bg-paper">
            <img src={IMG.map} alt="Property map of Firefly Sunset Resort" width={1920} height={1440} loading="lazy" className="w-full transition duration-700 hover:scale-[1.02]" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Calc() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="calc-title">
      <Reveal className="mb-12">
        <Label className="text-sea">Price your stay</Label>
        <h2 id="calc-title" className="mt-5 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98]">Your villa, your month, with VAT.</h2>
      </Reveal>
      <RateCalculator />
    </section>
  )
}

mount(
  <Page current="Villas">
    <Hero />
    <List />
    <Whole />
    <Calc />
    <EnquirySection />
  </Page>
)
