import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG, DINNER, PHONE, TEL } from "./site"
import { MenuExplorer, SunsetClock } from "./parts"

mount(
  <Page current="Bar & Grill">
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 md:pt-14" aria-labelledby="r-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-sea">Firefly Bar &amp; Grill · Hope Town</motion.p>
          <h1 id="r-title" className="mt-6 font-display text-[clamp(3.2rem,7.6vw,7.4rem)] leading-[0.92]">
            {["Breakfast, lunch,", "dinner. Every day."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> At the Firefly Bar &amp; Grill, Elbow Cay</span>
          </h1>
        </div>
        <motion.div className="lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>
          <p className="text-[17px] leading-relaxed text-muted">On the Sea of Abaco, open to locals and visitors seven days a week. To-go orders are placed in The Boutique by 8pm.</p>
          <a href={DINNER} className="btn btn-primary mt-6">Reserve dinner</a>
        </motion.div>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-12">
        <Photo priority src={IMG.dining} alt="Inside dining at the Firefly Bar & Grill" className="aspect-[3/2] rounded-[4px] md:col-span-8" />
        <div className="flex flex-col justify-between rounded-[4px] bg-dusk p-6 text-paper md:col-span-4 md:p-8">
          <SunsetClock tone="dark" />
          <dl className="mt-8 space-y-3 border-t border-paper/15 pt-6 text-[15px]">
            <div className="flex justify-between gap-4"><dt className="text-paper/70">Breakfast</dt><dd>8:00 to 11:00am</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-paper/70">Lunch</dt><dd>11:30am to 4:00pm</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-paper/70">Dinner</dt><dd>5:30 to 9:00pm</dd></div>
          </dl>
        </div>
      </div>
    </section>
    <section className="border-t border-line" aria-labelledby="menu-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Label n="01" className="text-sea">Menus</Label>
            <h2 id="menu-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Choose a meal. Filter for the catch.</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:self-end">A selection from the current lunch, dinner and kids menus. Seasonal dishes depend on the catch: ask your server.</p>
        </Reveal>
        <MenuExplorer />
      </div>
    </section>
    <section className="bg-sea text-paper" aria-labelledby="party-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <Label className="text-glow">Parties of 12 or more</Label>
          <h2 id="party-title" className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] leading-tight">Please call ahead to book a big table.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={TEL} className="btn btn-glow">Call {PHONE}</a>
          <a href={DINNER} className="btn btn-quiet">Reserve online <ArrowUpRight className="size-4" aria-hidden /></a>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="events-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Photo src={IMG.events} alt="Weddings and events at Firefly Sunset Resort" className="aspect-[4/3] rounded-[4px] lg:col-span-6" />
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <Label n="02" className="text-sea">Weddings and events</Label>
          <h2 id="events-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4rem)] leading-[0.98]">Celebrate on the sand, dine on the deck.</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">The resort hosts weddings and events and can be booked whole. Tell the team what you are planning.</p>
          <a href="index.html#enquire" className="btn btn-quiet mt-8">Ask about an event</a>
        </Reveal>
      </div>
    </section>
  </Page>
)
