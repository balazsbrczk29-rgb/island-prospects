import { motion } from "motion/react"
import { Page, mount, Reveal, Head, ease, reveal, W } from "./site"

const T = [
  ["Early 1950s", "Bluff House begins as the private home of Pearce and Kitty Coady, who host boaters from all over the world looking for a night on land, good company and good food."],
  ["1978", "The Davies family takes over. Melissa and Leslie Davies, 24 and 25, run Bluff House until 1986."],
  ["1986", "Martin Havill owns and operates Bluff House until 1995."],
  ["1995", "Roger and Susan Phillips arrive, and welcome guests for the next 17 years."],
  ["2011", "A group of investors led by Roger's nephew, Ian Phillips, takes on the resort."],
  ["2018", "TripAdvisor Certificate of Excellence Hall of Fame; general manager Molly McIntosh named Caribbean Journal's Hotelier of the Year."],
  ["December 2025", "VIP Marinas Group, the family-run company of Austin and Jenny Cameron with Felecia and Dan Ongley, acquires Bluff House: its first property in The Bahamas."],
]

function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32" aria-labelledby="h-title">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="label text-abaco">A little history</motion.p>
      <h1 id="h-title" className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,6.4vw,6.4rem)] leading-[0.94] tracking-[-0.02em]">
        {["The first resort in the Out Islands,", "and now the oldest."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic text-abaco" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
      </h1>
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5"><div className="sticky top-28 overflow-hidden rounded-[6px] bg-[#9fc0c9]"><img src={W("50f69606b95b48cba67ffc1ac9585d68")} alt="Bluff House and its grounds" width={1780} height={928} className="aspect-[4/3] w-full object-cover" /></div></div>
        <ol className="relative border-l border-abaco/30 lg:col-span-6 lg:col-start-7">
          {T.map(([y, t], i) => (
            <motion.li key={y} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ delay: i * 0.04, duration: 0.8, ease }} className="relative pb-12 pl-8 last:pb-0">
              <span className="absolute top-3 -left-[6px] size-3 rounded-full bg-abaco" aria-hidden />
              <p className="font-display text-[1.9rem] text-abaco">{y}</p>
              <p className="mt-2 max-w-lg text-[17px] leading-relaxed">{t}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Next() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="n-title">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <Head dark index="01" label="What comes next" id="n-title" title={<>A thoughtful revitalization, with the charm kept.</>}>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-paper/75">The new owners' long-term plans include enhanced services and amenities, rebuilding the iconic hilltop restaurant, and improvements for cottage owners and guests, while preserving the relaxed island experience everyone loves.</p>
        </Head>
        <Reveal delay={0.1}><a href="index.html#enquire" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-paper px-6 text-ink transition hover:-translate-y-px">Ask about a room</a></Reveal>
      </div>
    </section>
  )
}

mount(<Page current="Since the 1950s"><Story /><Next /></Page>)
