import { Page, mount, IMG, ROOMS, Photo, bookingUrl, WA, WHATSAPP } from "./site"
import { Hero } from "./Film"
import { DatesComposer } from "./Booking"

function RoomRow({ r, flip }: { r: (typeof ROOMS)[number]; flip: boolean }) {
  return (
    <article aria-labelledby={`room-${r.id}`} className="grid gap-8 py-[var(--s-12)] md:grid-cols-12 md:gap-8 md:py-[var(--s-16)]">
      <Photo img={r.img} alt={r.alt} className={`aspect-[3/2] w-full md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`} />
      <div className={`grid content-end gap-5 md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <h2 id={`room-${r.id}`} className="display text-[length:var(--t-2xl)]">{r.name}</h2>
        <dl className="grid grid-cols-2 gap-6 border-t border-line pt-5">
          <div><dt className="text-[length:var(--t-sm)] italic text-muted">Sleeps</dt><dd className="num text-[length:var(--t-xl)]">{r.guests}</dd></div>
          <div><dt className="text-[length:var(--t-sm)] italic text-muted">Beds</dt><dd>{r.beds}</dd></div>
        </dl>
        <p>{r.line} Surrounded by tropical gardens, a few steps from the water.</p>
        <p className="text-[length:var(--t-sm)] text-muted">Rates on the booking page, live for your dates.</p>
        <a href={bookingUrl({ roomTypeId: r.roomTypeId })} className="link self-start">Open this room on the booking page</a>
      </div>
    </article>
  )
}

function Meals() {
  const rows: [string, string, string][] = [
    ["Breakfast", "8am to 10am", ""],
    ["Lunch", "Noon to 2pm", "Last order 1:45pm"],
    ["Dinner", "6pm to 8pm", "Book 24 hours ahead"],
  ]
  return (
    <section aria-labelledby="meals-title" className="grid gap-10 border-t border-line py-[var(--s-16)] md:grid-cols-12 md:gap-8">
      <div className="self-start md:sticky md:top-28 md:col-span-5">
        <h2 id="meals-title" className="display text-[length:var(--t-2xl)]">At the table</h2>
        <p className="mt-5 max-w-[42ch] text-muted">Homemade cooking inspired by the ocean and the island, served on the terrace by the beach. Book dinner by WhatsApp a day ahead.</p>
        <a href={WA} className="link num mt-6 inline-block">WhatsApp {WHATSAPP}</a>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <Photo img={IMG.crabs} alt="Stuffed local crab with lime, served at Greenwood" className="aspect-[3/2] w-full" />
        <dl className="mt-8 grid">
          {rows.map(([m, h, n]) => (
            <div key={m} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[minmax(200px,auto)_1fr_auto]">
              <dt className="display text-[length:var(--t-xl)]">{m}</dt>
              <dd className="num sm:order-none">{h}</dd>
              <dd className="col-span-2 text-[length:var(--t-sm)] italic text-muted sm:col-span-1">{n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

mount(
  <Page>
    <Hero img={IMG.roomKing} alt="The Executive King Room at Greenwood: king bed, ceiling fan, garden windows"
      title={<>Two rooms, a few steps from the water.</>}>
      <p className="max-w-[44ch] text-muted">The Executive King Room sleeps two; the Executive Family Room sleeps three. Both sit among the gardens at Greenwood, Port Howe.</p>
      <div><a href="#dates" className="btn">Check your dates</a></div>
    </Hero>
    <div className="px-[var(--gutter)]">
      {ROOMS.map((r, i) => <RoomRow key={r.id} r={r} flip={i % 2 === 1} />)}
      <section id="dates" aria-labelledby="dates-title" className="scroll-mt-24 border-t border-ink py-[var(--s-16)]">
        <h2 id="dates-title" className="display mb-10 text-[length:var(--t-2xl)]">Your dates</h2>
        <DatesComposer />
      </section>
      <Meals />
    </div>
  </Page>,
)
