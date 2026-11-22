import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ease } from "./site"

/* All from greenwoodbeachresort.com/how-to-get-here (checked 20 Nov 2026). */
export const ROUTES = {
  usa: {
    label: "From the United States",
    legs: [
      { where: "Fort Lauderdale Executive (FXE)", what: "MakersAir flies to New Bight (CAT) several times a week, leaving at 7am or 1pm depending on the date.", note: "Greenwood guests get 10% off the fare: ask Greenwood for the promo code." },
      { where: "New Bight, Cat Island (CAT)", what: "Return flights to FXE leave at 10:20am or 4:20pm, depending on the date." },
    ],
  },
  nassau: {
    label: "From Nassau",
    legs: [
      { where: "Nassau domestic terminal", what: "Western Air flies to New Bight at 1pm on Monday, Wednesday, Thursday and Friday, and at noon on Sunday, with extra days in high season.", note: "About $260 round trip per person. Tickets: Western Air, +1 242 377 2222." },
      { where: "New Bight, Cat Island (CAT)", what: "Land on Cat Island. A taxi or a rental car brings you down to Port Howe." },
    ],
  },
} as const
export type RouteId = keyof typeof ROUTES

export const TAXIS = [
  { name: "Miss Joyann Mackey", tel: "+1 242 819 9711", note: "Phone and WhatsApp" },
  { name: "DLKing Taxi", tel: "+1 242 474 8462", note: "Phone and WhatsApp, dlkingtaxi@gmail.com" },
]
export const CARS = [
  { name: "Gilbert's Car Rental", place: "New Bight", fleet: "Sedans, SUVs and 7-seat vans", tel: "+1 242 474 1050" },
  { name: "Alvernia Car Rental", place: "Smith Bay", fleet: "SUVs from $50 a day", tel: "242 342 2042" },
  { name: "Favors Car Rental", place: "Old Bight", fleet: "SUVs and 8-seat vans", tel: "+1 242 359 2648" },
  { name: "MLR Hardware Car Rental", place: "New Bight", fleet: "Sedans and vans up to 8 seats", tel: "+1 242 474 2472" },
]
export const telHref = (t: string) => "tel:" + (t.startsWith("+") ? t.replace(/[^\d+]/g, "") : "+1" + t.replace(/\D/g, ""))

/* End credits on the home page: the practical facts, centred, like the end of a film. */
export function EndCredits() {
  const groups: { title: string; rows: [string, string][] }[] = [
    { title: "The journey", rows: [
      ["From Fort Lauderdale (FXE)", "MakersAir to New Bight (CAT), 7:00am or 1:00pm"],
      ["Back to FXE", "10:20am or 4:20pm"],
      ["Greenwood guests", "10% off MakersAir fares, ask for the code"],
      ["From Nassau", "Western Air to New Bight, 1:00pm, Sunday 12:00pm"],
      ["Western Air", "+1 242 377 2222, about $260 round trip"],
      ["Taxi", "Miss Joyann Mackey, +1 242 819 9711"],
      ["Taxi", "DLKing Taxi, +1 242 474 8462"],
    ] },
    { title: "The day", rows: [
      ["Breakfast", "8:00am to 10:00am"],
      ["Lunch", "12:00pm to 2:00pm, last order 1:45pm"],
      ["Dinner", "6:00pm to 8:00pm, book 24 hours ahead"],
      ["Whitetip season", "March to June"],
    ] },
    { title: "The house", rows: [
      ["Hosts", "Pauline and Antoine"],
      ["Rooms", "Executive King Room, Executive Family Room"],
      ["WhatsApp", "+1 242 808 1846"],
      ["Telephone", "+1 242 342 3053"],
      ["Address", "1 Ocean Drive, Port Howe, Cat Island, The Bahamas"],
    ] },
  ]
  return (
    <section aria-labelledby="credits-title" className="on-glass relative bg-glass text-on-glass">
      {/* the frame: a sticky viewport whose top and bottom edges fade the roll in and out, like the end of a film */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 h-[100svh]">
          <div className="absolute inset-x-0 h-[22svh] bg-gradient-to-b from-glass via-glass/80 to-transparent" style={{ top: "var(--bar)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[18svh] bg-gradient-to-t from-glass to-transparent" />
        </div>
      </div>
      <div className="px-[var(--gutter)] pt-[22svh] pb-[14svh]">
        <h2 id="credits-title" className="display text-center text-[length:var(--t-2xl)]">The way to Port Howe</h2>
        <div className="mt-24 grid gap-24">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="mb-8 text-center text-[length:var(--t-xl)] font-light" style={{ fontFamily: "var(--font-display)" }}>{g.title}</h3>
              <dl className="grid gap-6 md:gap-4">
                {g.rows.map(([k, v], i) => (
                  <div key={k + i} className="grid gap-1 text-center md:grid-cols-2 md:gap-16 md:text-left">
                    <dt className="text-[length:var(--t-sm)] italic leading-[1.7] opacity-80 md:text-right md:text-[length:var(--t-lg)]">{k}</dt>
                    <dd className="num text-[length:var(--t-base)] leading-[1.7] md:text-[length:var(--t-lg)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-20 grid justify-items-center gap-8 text-center">
          <p className="mono-word !text-[clamp(56px,9vw,140px)]">Then, the beach.</p>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            <a href="#dates" className="btn btn-paper btn-xl">Check dates and book</a>
            <a href="getting-here.html" className="link inline-flex min-h-11 items-center">Flights, taxis and car rentals in full</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function RoutePicker() {
  const [id, setId] = useState<RouteId>("usa")
  const r = ROUTES[id]
  return (
    <div>
      <div className="seg" role="group" aria-label="Where are you flying from?">
        {(Object.keys(ROUTES) as RouteId[]).map((k) => (
          <button key={k} type="button" aria-pressed={id === k} onClick={() => setId(k)} className="!text-[length:var(--t-base)]">{ROUTES[k].label}</button>
        ))}
      </div>
      <div className="relative mt-10 min-h-[420px] md:min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.ol key={id} className="grid gap-0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.35, ease }}>
            {[...r.legs, { where: "Port Howe", what: "Greenwood Beach Resort, 1 Ocean Drive, at the south end of the island." }].map((l, i) => (
              <li key={l.where} className="grid grid-cols-[28px_1fr] gap-5 md:grid-cols-[40px_1fr]">
                <span aria-hidden className="relative flex justify-center">
                  <span className={`mt-[0.55em] size-3 rounded-full ${i === r.legs.length ? "bg-glass" : "border border-ink bg-ground"}`} />
                  {i < r.legs.length && <span className="absolute top-[calc(0.55em+14px)] bottom-0 w-px bg-line" />}
                </span>
                <div className="pb-10">
                  <h3 className="display text-[length:var(--t-xl)]">{l.where}</h3>
                  <p className="mt-2 max-w-[56ch]">{l.what}</p>
                  {"note" in l && l.note ? <p className="mt-2 max-w-[56ch] text-[length:var(--t-sm)] italic text-muted">{l.note}</p> : null}
                </div>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  )
}
