import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, Lines, ease, PHONE, TEL } from "./site"
import { SERVICES, FAQ } from "./data"

const DETAIL: Record<string, string[]> = {
  design: ["Simple, cost-effective pages with links and graphics", "One-time sites, simple or themed and multi-page", "Contact areas and the full detail you provide", "JavaScript, dynamic pages and animation for complex builds", "Discounts over ten pages, larger ones for sites in the hundreds"],
  seo: ["Page structure and wording search engines can read", "Key phrases chosen for what your customers type", "Built into our website packages"],
  promotion: ["For existing sites with poor or no results", "A free first look at your current key phrases", "We can also show you easy ways to track results"],
  hosting: ["Domain registration if the name is available", "Hosting with a simple control panel", "Room to grow from one page to hundreds"],
  takeover: ["Hourly work for minor changes", "Full takeover, redesign and upkeep", "Same reasonable terms as existing clients"],
  advertising: ["Print layouts and printed materials", "Video advertising for YouTube", "Disc production with printed labels"],
}
const STEPS = [
  ["Tell us what you need", "By email, by phone in Freeport, or on the US line."],
  ["Get a quote", "Priced for the job you describe, small or large."],
  ["We build it", "Simple pages are normally ready within 24 hours of the order. Larger sites take a little longer."],
  ["We host and look after it", "Hosting, search work and updates, by the same people who built it."],
]

function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28" aria-labelledby="svc-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="text-[14px] text-muted">Services, BVG Design Services, Freeport, Grand Bahama</motion.p>
      <h1 id="svc-title" className="mt-8 max-w-[14ch] font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-bold tracking-[-0.045em]">
        <Lines lines={["Web design,", "search, hosting", "and advertising."]} />
      </h1>
      <motion.nav initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} aria-label="Services on this page" className="mt-12 flex flex-wrap gap-2">
        {SERVICES.map(s => <a key={s.id} href={`#${s.id}`} className="rounded-full border border-ink/15 px-4 py-2.5 text-[15px] transition hover:-translate-y-0.5 hover:border-ink hover:bg-white">{s.t}</a>)}
      </motion.nav>
    </section>
  )
}

function List() {
  return (
    <section className="border-t border-line" aria-label="Services in detail">
      {SERVICES.map((s, i) => (
        <article key={s.id} id={s.id} className={`scroll-mt-24 border-b border-line ${i % 2 ? "bg-paper-2" : ""}`}>
          <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-display text-[15px] font-bold text-aqua">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.95] font-bold tracking-[-0.035em]">{s.t}</h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{s.d}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-ink/15">
                {DETAIL[s.id].map(d => (
                  <li key={d} className="group flex items-baseline gap-4 border-b border-ink/15 py-4 text-[17px]">
                    <span className="size-2 shrink-0 translate-y-[-2px] rounded-full bg-gold transition group-hover:bg-aqua" aria-hidden />
                    <span className="transition group-hover:translate-x-1">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </article>
      ))}
    </section>
  )
}

function Steps() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="steps-title">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label n="How it runs" light>From request to live site</Label>
          <h2 id="steps-title" className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-bold tracking-[-0.035em]">Four steps, one local team.</h2></Reveal>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[22px] bg-paper/15 md:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8, ease }} className="bg-ink p-7 md:p-8">
              <span className="font-display text-[3.4rem] leading-none font-bold text-gold">{i + 1}</span>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em]">{t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-paper/70">{d}</p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-3">
          <a href="index.html#start" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 text-[16px] text-ink transition hover:-translate-y-0.5">Start a website request <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
          <a href={TEL} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/25 px-6 text-[16px] transition hover:-translate-y-0.5 hover:border-paper"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-24 md:px-10 lg:grid-cols-12" aria-labelledby="sfaq">
      <h2 id="sfaq" className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.035em] lg:col-span-4">Practical answers.</h2>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
        {FAQ.map(([q, a]) => <div key={q} className="border-t border-line pt-5"><dt className="font-display text-xl font-bold tracking-[-0.02em]">{q}</dt><dd className="mt-2 text-[16px] leading-relaxed text-muted">{a}</dd></div>)}
      </dl>
    </section>
  )
}

mount(<Page current="Services"><Hero /><List /><Steps /><Faq /></Page>)
