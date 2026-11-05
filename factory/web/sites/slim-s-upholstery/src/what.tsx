import { motion } from "motion/react"
import { MessageCircle } from "lucide-react"
import { Page, mount, Reveal, Label, ease, waLink } from "./site"

const AREAS = [
  ["Home", "Sofas, dining seats, armchairs and headboards, recovered in the fabric you choose.", "Hi Slim Upholstery, I would like a free quote for home upholstery."],
  ["Auto", "Car seats and interiors brought back to life.", "Hi Slim Upholstery, I would like a free quote for auto upholstery."],
  ["Marine", "Boat cushions and seating for life on the water.", "Hi Slim Upholstery, I would like a free quote for marine upholstery."],
  ["Aircraft", "Cabin seating and interior upholstery for aircraft.", "Hi Slim Upholstery, I would like a free quote for aircraft upholstery."],
  ["Churches", "Pews and church seating, recovered for the congregation.", "Hi Slim Upholstery, I would like a free quote for church upholstery."],
]

mount(
  <Page current="What we upholster">
    <section className="weave" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1360px] px-5 pt-16 pb-14 md:px-10 md:pt-24">
        <Label>What we upholster</Label>
        <h1 id="hero-title" className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.025em]">
          {["Five kinds of seat.", "One standard of stitch."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "text-navy" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: [0.77, 0, 0.175, 1] }}>{l}</motion.span></span>)}
        </h1>
      </div>
    </section>
    <section className="mx-auto max-w-[1360px] px-5 pb-28 md:px-10" aria-label="Upholstery areas">
      <ol className="border-t border-ink/20">
        {AREAS.map(([t, d, m], i) => (
          <motion.li key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} className="group grid gap-4 border-b border-ink/20 py-9 md:grid-cols-[5rem_1fr_1.4fr_auto] md:items-center">
            <span className="font-display text-[15px] text-navy">0{i + 1}</span>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-none transition group-hover:translate-x-2">{t}</h2>
            <p className="text-[17px] text-muted">{d}</p>
            <a href={waLink(m)} className="inline-flex min-h-11 items-center gap-2 justify-self-start rounded-full border border-ink px-5 text-[15px] transition hover:-translate-y-px hover:bg-navy hover:text-linen md:justify-self-end"><MessageCircle className="size-4" aria-hidden /> Quote</a>
          </motion.li>
        ))}
      </ol>
      <Reveal className="mt-12"><p className="text-[15px] text-muted">Not sure if we can do it? Send a photo on WhatsApp and ask.</p></Reveal>
    </section>
  </Page>
)
