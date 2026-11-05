import { motion } from "motion/react"
import { ArrowRight, Mail } from "lucide-react"
import { ATTORNEYS } from "./data"
import { Page, mount, Reveal, Label, ease } from "./site"

const AREAS = [
  ["Commercial and corporate law", "Commercial agreements, corporate matters and international and domestic transactions."],
  ["Conveyancing and real property", "Purchases, sales and property matters, from New Providence to the Family Islands."],
  ["Company incorporation", "Forming Bahamian companies for local and international clients."],
  ["Resort development", "Development work with particular focus on the Family Islands."],
  ["Banking and insurance", "A long-standing focus of the firm's general practice."],
  ["Estate planning", "Planning for the transfer of Bahamian assets."],
  ["Employment law", "Advice for employers and employees."],
  ["Gaming law", "Among the Senior Partner's areas of practice."],
  ["Family law", "Including adoption, an area Mrs. Johnson champions."],
]

const BIOS = [
  { k: "dhl" as const, paras: [
    "Mrs. Harding-Lee brings forty years of legal experience to the firm. Called to The Bahamas Bar in 1982, she spent fourteen years at Cash, Fountain & Company, becoming a partner, working closely with the late Governor General Sir Gerald Cash and tutored under Sir Cyril Fountain, a former Chief Justice of The Bahamas. She founded Harding-Lee & Company in 1996.",
    "Her practice covers corporate and commercial law, conveyancing, real property, estate planning, resort development with particular focus in the Family Islands, banking, gaming and employment law.",
  ], service: ["Chairperson of the Board, Bank of The Bahamas", "Former member, Judicial and Legal Services Commission", "Former member, Disciplinary Tribunal of The Bahamas Bar Association", "Former member, Industrial Relations Board of The Bahamas"] },
  { k: "nhj" as const, paras: [
    "Mrs. Johnson read law at the University of Buckingham (LLB) after an Associate of Arts in Law and Criminal Justice. She was called to the Bar of England & Wales on 24 November 2005 as a member of the Honourable Society of the Middle Temple, and to The Bahamas Bar on 9 December 2005. She joined Harding-Lee & Company in November 2005.",
    "Her areas of interest are conveyancing, employment and family law. She is an adoption advocate, passionate about children's rights, and a mentor and board member at the Ranfurly Homes for Children.",
  ], service: ["Called to the Bar of England & Wales, 2005", "Called to The Bahamas Bar, 2005", "Member, Middle Temple", "Mentor and board member, Ranfurly Homes for Children"] },
]

function Intro() {
  return (
    <section className="mx-auto max-w-[1360px] px-5 pt-20 pb-16 md:px-10 md:pt-28" aria-labelledby="p-h1">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11.5px] tracking-[0.22em] text-muted uppercase">Harding-Lee &amp; Company · Nassau and Long Island</motion.p>
      <h1 id="p-h1" className="mt-8 max-w-[14ch] font-display text-[clamp(3rem,7.6vw,7.8rem)] leading-[0.9] tracking-[-0.03em]">
        {["Practice", "& attorneys"].map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}>{i === 1 ? <><i className="text-brass">&amp;</i> attorneys</> : l}</motion.span></span>
        ))}
      </h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-10 max-w-2xl text-[19px] leading-[1.7] text-ink/80">Two attorneys, a general practice and every court of the Commonwealth. Here is what the firm handles, and who will handle it.</motion.p>
    </section>
  )
}

function Areas() {
  return (
    <section className="border-t border-line" aria-labelledby="areas-title">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Label n="i.">Practice areas</Label><h2 id="areas-title" className="mt-6 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.04]">What the firm handles.</h2></Reveal>
        <ol className="lg:col-span-7 lg:col-start-6">
          {AREAS.map(([t, d], i) => (
            <motion.li key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ delay: (i % 3) * 0.05, duration: 0.8, ease }} className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 last:border-b">
              <span className="font-display text-lg text-brass italic">{String(i + 1).padStart(2, "0")}</span>
              <span><span className="block font-display text-2xl transition group-hover:translate-x-1 md:text-[1.75rem]">{t}</span><span className="mt-1 block text-[16px] text-muted">{d}</span></span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Attorneys() {
  return (
    <section className="border-t border-line bg-paper-2" aria-labelledby="att-title">
      <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label n="ii.">Attorneys</Label><h2 id="att-title" className="mt-6 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.04]">Who you will speak to.</h2></Reveal>
        <div className="mt-16 grid gap-20">
          {BIOS.map(({ k, paras, service }) => {
            const a = ATTORNEYS[k]
            return (
              <article key={k} className="grid gap-10 lg:grid-cols-12" aria-labelledby={`a-${k}`}>
                <Reveal className="lg:col-span-3">
                  <figure className="group relative aspect-[4/5] overflow-hidden bg-paper">
                    <img src={a.photo} alt={`Portrait of ${a.name}`} loading="lazy" width={368} height={436} className="size-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                  </figure>
                </Reveal>
                <Reveal delay={0.08} className="lg:col-span-6">
                  <p className="text-[11px] tracking-[0.22em] text-brass uppercase">{a.role}</p>
                  <h3 id={`a-${k}`} className="mt-3 font-display text-[clamp(2rem,3.2vw,3rem)] leading-none">{a.name}</h3>
                  {paras.map(p => <p key={p.slice(0, 20)} className="mt-6 text-[17px] leading-[1.75] text-ink/80">{p}</p>)}
                  <a href={`mailto:${a.email}`} className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[15px]"><Mail className="size-4" aria-hidden /> {a.email} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
                </Reveal>
                <Reveal delay={0.14} className="lg:col-span-3">
                  <ul className="border-t border-ink/20">
                    {service.map(s => <li key={s} className="border-b border-ink/10 py-3 text-[15px] text-ink/80">{s}</li>)}
                  </ul>
                </Reveal>
              </article>
            )
          })}
        </div>
        <a href="index.html#consult" className="group mt-20 inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-[15px] text-paper transition hover:-translate-y-px hover:bg-chambers">Discuss your matter <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></a>
      </div>
    </section>
  )
}

mount(<Page current="Practice & attorneys"><Intro /><Areas /><Attorneys /></Page>)
