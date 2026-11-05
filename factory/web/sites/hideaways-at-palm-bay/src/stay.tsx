import { motion } from "motion/react"
import { Page, mount, Reveal, Label, ease, reveal, IMG, BOOK } from "./site"
import { ROOMS, RoomFinder, EnquirySection, Photo } from "./parts"

const AMENITIES: [string, string[]][] = [
  ["Outdoors", ["Outdoor pool, all year", "Sun terrace", "BBQ facilities", "Garden", "Private beach area"]],
  ["On the water", ["Complimentary water toys", "Snorkelling", "Canoeing", "Diving", "Fishing"]],
  ["Indoors", ["Library", "Games room", "Billiards", "Table tennis", "Fitness centre"]],
  ["Services", ["Daily housekeeping", "Free town shuttle", "Grocery deliveries", "Concierge and tour desk", "Laundry", "Airport taxi arrangements"]],
]

mount(
  <Page current="Rooms & villas">
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-16 md:px-10 md:pt-14" aria-labelledby="s-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="label text-deep">Rooms and villas · George Town, Exuma</motion.p>
          <h1 id="s-title" className="mt-6 font-display text-[clamp(3.2rem,7.4vw,7.2rem)] leading-[0.92]">
            {["Cottages on the sand,", "villas on the hill."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><motion.span className={`block ${i ? "italic text-deep" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>
            ))}
            <span className="sr-only"> at Hideaways at Palm Bay</span>
          </h1>
        </div>
        <motion.div className="lg:col-span-4 lg:col-start-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>
          <p className="text-[17px] leading-relaxed text-muted">Every room has air conditioning, cable TV, an in-room safe, an iron and a hairdryer, and a private patio. Live rates are in the booking engine.</p>
          <a href={BOOK} className="btn btn-primary mt-6">Check availability</a>
        </motion.div>
      </div>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        <Photo priority src={IMG.villa2H2} alt="Island Time Two Bedroom Villa on the hillside" className="aspect-[4/3] rounded-[12px] md:col-span-2" />
        <Photo src={IMG.cottageOV2} alt="One Bedroom Ocean View Cottage at Hideaways" className="aspect-[4/3] rounded-[12px] md:aspect-auto" />
      </div>
    </section>
    <section className="bg-paper-2" aria-labelledby="find-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-12"><Label n="1" className="text-deep">Find your room</Label><h2 id="find-title" className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.98]">Eight ways to stay.</h2></Reveal>
        <RoomFinder full />
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="cmp-title">
      <Reveal><Label n="2" className="text-deep">Side by side</Label><h2 id="cmp-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4rem)] leading-[0.98]">Compare kitchens, baths and beds.</h2></Reveal>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-[15px]">
          <caption className="sr-only">Hideaways room comparison</caption>
          <thead><tr className="border-b border-ink">{["Room", "Where", "Beds", "Kitchen", "Baths", "Outside"].map(h => <th key={h} scope="col" className="label py-4 pr-4 font-normal text-muted">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-line">
            {ROOMS.map(r => (
              <tr key={r.id} className="transition hover:bg-paper-2">
                <th scope="row" className="py-4 pr-4 font-display text-[1.2rem] font-normal">{r.name}</th>
                <td className="py-4 pr-4 text-muted">{r.side === "beach" ? "Ocean side" : "Hillside"}</td>
                <td className="py-4 pr-4">{r.beds}</td><td className="py-4 pr-4">{r.kitchen}</td><td className="py-4 pr-4">{r.baths}</td><td className="py-4 pr-4 text-muted">{r.patio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    <section className="border-t border-line" aria-labelledby="am-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal><Label n="3" className="text-deep">Around the resort</Label><h2 id="am-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4rem)] leading-[0.98]">Included with your stay.</h2></Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map(([k, list], i) => (
            <Reveal key={k} delay={i * 0.06}>
              <p className="border-t border-ink pt-4 font-display text-[1.7rem]">{k}</p>
              <ul className="mt-3 space-y-2 text-[15px] text-muted">{list.map(x => <li key={x}>{x}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-[14px] text-muted">Non-smoking throughout. Free parking on site. Pets are not allowed.</p>
      </div>
    </section>
    <EnquirySection />
  </Page>
)
