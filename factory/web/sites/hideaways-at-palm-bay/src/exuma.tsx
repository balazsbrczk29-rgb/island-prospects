import { motion } from "motion/react"
import { ArrowUpRight, Phone } from "lucide-react"
import { Page, mount, Reveal, Label, ease, reveal, IMG } from "./site"
import { EnquirySection, Photo } from "./parts"

const NEAR = [
  ["Jolly Hall", 0.29, "https://www.google.com/maps?q=Jolly+Hall"],
  ["Minns Water Sports", 1.39, "https://www.google.com/maps?cid=13051109761658888009"],
  ["Dive Exuma, Government Dock", 1.5, "https://www.google.com/maps?cid=13107182162652607203"],
  ["Stocking Island", 1.86, "https://www.google.com/maps?q=Stocking+Island"],
  ["Mystery Cave", 2.03, "https://www.google.com/maps?cid=17254151658388040951"],
] as const
const DO = ["Exuma Cays tours", "Stocking Island trips", "Scuba diving", "Snorkelling", "Guided bonefishing", "Deep sea fishing", "Guided kayaking", "Boat rentals", "Golf"]

function Near() {
  const max = 2.2
  return (
    <ul className="border-t border-line">
      {NEAR.map(([n, d, href], i) => (
        <li key={n}>
          <a href={href} className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-5 md:grid-cols-[16rem_1fr_5rem]">
            <span className="font-display text-[1.5rem] leading-tight transition group-hover:text-deep">{n}</span>
            <span className="relative hidden h-px bg-line md:block" aria-hidden>
              <motion.span className="absolute inset-y-0 left-0 bg-brand" initial={{ width: 0 }} whileInView={{ width: `${(d / max) * 100}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 1.1, ease: reveal }} />
              <motion.span className="absolute -top-[5px] size-[11px] rounded-full border-2 border-brand bg-paper" initial={{ left: 0 }} whileInView={{ left: `calc(${(d / max) * 100}% - 5px)` }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 1.1, ease: reveal }} />
            </span>
            <span className="text-right text-[15px] tabular-nums text-muted">{d} mi <ArrowUpRight className="inline size-3.5" aria-hidden /></span>
          </a>
        </li>
      ))}
    </ul>
  )
}

mount(
  <Page current="Exuma & Splash">
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 md:pt-14" aria-labelledby="e-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-deep">George Town, Great Exuma</motion.p>
          <h1 id="e-title" className="mt-6 font-display text-[clamp(3.2rem,7.4vw,7.2rem)] leading-[0.92]">
            {["Stocking Island is", "under two miles away."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic text-deep" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> Things to do near Hideaways at Palm Bay, and Splash! Bar &amp; Grill</span>
          </h1>
        </div>
        <motion.p className="text-[17px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>From the beach at Hideaways, the water of Elizabeth Harbour leads to the cays, the dive shops and the reefs. The tour desk books it all.</motion.p>
      </div>
    </section>
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:px-10 md:pb-32 lg:grid-cols-12" aria-labelledby="near-title">
      <Reveal className="lg:col-span-4">
        <Label n="1" className="text-deep">Nearby</Label>
        <h2 id="near-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4rem)] leading-[0.98]">Distance from the property.</h2>
        <ul className="mt-10 flex flex-wrap gap-2">{DO.map(x => <li key={x} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[14px]">{x}</li>)}</ul>
      </Reveal>
      <div className="lg:col-span-7 lg:col-start-6"><Near /></div>
    </section>
    <section id="splash" className="scroll-mt-20 bg-paper-2" aria-labelledby="sp-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Photo src={IMG.splash} alt="The patio at Splash! Bar & Grill over Elizabeth Harbour" className="aspect-[4/3] rounded-[12px]" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Photo src={IMG.splashPlay} alt="Pool table and games at Splash!" className="aspect-[4/3] rounded-[12px]" />
            <Photo src={IMG.cocktails} alt="Local and tropical cocktails at Splash!" className="aspect-[4/3] rounded-[12px]" />
          </div>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <Label n="2" className="text-deep">Splash! Bar &amp; Grill</Label>
          <h2 id="sp-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4rem)] leading-[0.98]">Easy-going, and lots of fun.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">On the beach with a patio over Elizabeth Harbour. Western favourites, seafood and Bahamian dishes, custom pizzas, and chefs who work around dietary needs and little ones. Pool tournaments, board games, a treasure chest of toys, six big screens and frequent live music.</p>
          <p className="label mt-8 text-muted">Try the local favourites</p>
          <p className="mt-2 font-display text-[1.6rem] leading-snug">Sky Juice, Bahama Mama, Goombay Smash, The Splash by Anita, and a cold Kalik or Sands.</p>
          <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
            {[["Breakfast", "8:00 to 10:00am"], ["Lunch", "11:00am to 5:00pm"], ["Dinner", "6:00 to 9:00pm"]].map(([k, v]) => <div key={k} className="flex justify-between py-3"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+12425246304" className="btn btn-primary"><Phone className="size-4" aria-hidden /> Reserve a table, 242-524-6304</a>
            <a href="tel:+12424650239" className="btn btn-quiet">Or 242-465-0239</a>
          </div>
        </Reveal>
      </div>
    </section>
    <EnquirySection n="3" />
  </Page>
)
