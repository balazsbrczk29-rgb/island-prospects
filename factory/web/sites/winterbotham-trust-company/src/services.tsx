import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease } from "./site"
import { SERVICES, PHONE, TEL } from "./data"

const LINKS: Record<string, [string, string]> = { finance: ["SeventyTwo Global", "https://www.seventytwoglobal.com/"], sports: ["SeventyTwo Sports Group", "https://72sportsgroup.com/"] }

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-14 md:px-10 md:pt-24" aria-labelledby="svc-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Label>Services · Winterbotham, Nassau</Label>
          <h1 id="svc-title" className="mt-6 font-display text-[clamp(3rem,7.6vw,7.6rem)] leading-[0.9] font-medium tracking-[-0.025em]">
            {["Structures, designed", "and administered."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic pl-[8%]" : ""}`} initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
          </h1>
        </div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }} className="text-[17px] leading-relaxed text-muted lg:col-span-4">Banking, execution, custody, back-office, structuring, administration and accounting for individuals, companies and financial institutions, delivered in a tailor-made way and administered into the future.</motion.p>
      </div>
    </section>
  )
}

function List() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-36" aria-label="Service lines">
      <ol className="border-t border-ink">
        {SERVICES.map((s, i) => (
          <motion.li id={s.id} key={s.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 0.9, ease }} className="grid scroll-mt-28 gap-3 border-b border-line py-10 md:grid-cols-12 md:gap-6 md:py-14">
            <span className="font-display text-[1.3rem] text-brass tnum md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="font-display text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none md:col-span-4">{s.name}</h2>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-[17px] leading-relaxed text-muted">{s.line}</p>
              {LINKS[s.id] && <a href={LINKS[s.id][1]} className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[15px]">Visit {LINKS[s.id][0]} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function Close() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="close-title">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7"><h2 id="close-title" className="font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium">Speak to the Nassau desk.</h2></Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:justify-self-end">
          <a href={TEL} className="inline-flex min-h-14 items-center gap-3 bg-paper px-7 text-lg text-ink tnum transition hover:-translate-y-px hover:bg-brass-light"><Phone className="size-5" aria-hidden /> {PHONE}</a>
          <p className="mt-4 text-[14px] text-paper/60">Or <a className="underline decoration-brass-light underline-offset-4" href="index.html#consult">note your enquiry first</a>.</p>
        </Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Services"><Intro /><List /><Close /></Page>)
