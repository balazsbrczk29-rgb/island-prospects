import { motion } from "motion/react"
import { MessageCircle } from "lucide-react"
import { C, Page, Photo, ease, img, mount, waLink } from "./site"

// Areas are from Slim Upholstery's own listings ("Home, Auto, Marine, Aircrafts and Churches"; "Sofas, Dining Seats,
// Cushions"). The example pieces under each are category-standard and listed as assumptions in the concept notes.
const AREAS = [
  { id: "home", name: "Home", photo: "sofa-living", alt: "A navy reupholstered sofa in a bright room with white louvred shutters",
    lead: "Sofas, dining seats and cushions: the furniture you would rather keep than replace.",
    pieces: ["Sofas and sectionals", "Dining chair seats and backs", "Armchairs", "Cushions and pillows"] },
  { id: "marine", name: "Marine", photo: "marine-cushions", alt: "New white boat cushions with navy piping in a sportfishing cockpit over turquoise water",
    lead: "Boat seating that has had too much sun and salt, re-covered for the next season.",
    pieces: ["Cockpit and bench cushions", "Helm and passenger seats", "Cabin seating", "Bow cushions"] },
  { id: "auto", name: "Auto", photo: "auto-seat", alt: "A car seat re-covered in tan leather with cream double stitching",
    lead: "Torn or tired car seats, re-covered and restitched.",
    pieces: ["Front and rear seats", "Seat repairs and panels", "Headliners", "Door panels"] },
  { id: "aircraft", name: "Aircraft", photo: "swatches", alt: "A fanned book of upholstery cloth samples with chalk, shears and a tape measure",
    lead: "Aircraft seating and cabin upholstery. Send photos and the seat count for a quote.",
    pieces: ["Passenger seats", "Crew seats", "Cabin panels"] },
  { id: "churches", name: "Churches", photo: "church-pew", alt: "Church pews with new deep green seat cushions in a white church with louvred windows",
    lead: "Pews and church seating, done as one matching set for the whole sanctuary.",
    pieces: ["Pew cushions", "Pulpit and choir chairs", "Kneelers"] },
]

function Intro() {
  return (
    <section className="px-5 pb-16 pt-8 md:px-12 md:pb-24 md:pt-10" aria-labelledby="what-title">
      <div className="mx-auto max-w-[1320px]">
        <a href="index.html" className="display inline-flex min-h-[44px] items-center text-[1.3rem]">Slim Upholstery</a>
        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h1 id="what-title" className="display t-h1">
            <motion.span className="block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>What we upholster.</motion.span>
          </h1>
          <div>
            <p className="t-lead max-w-[30rem] text-ink/85">Home, auto, marine, aircraft and churches. Every job starts the same way: a photo on WhatsApp and a free quote.</p>
            <nav aria-label="Kinds of work" className="mt-7 flex flex-wrap gap-2">
              {AREAS.map((a) => <a key={a.id} href={`#${a.id}`} className="inline-flex min-h-[44px] items-center rounded-full bg-cream-2 px-4 t-small hover:bg-straw">{a.name}</a>)}
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

function Area({ a, i }: { a: (typeof AREAS)[number]; i: number }) {
  const flip = i % 2 === 1
  return (
    <section id={a.id} className={`scroll-mt-6 px-5 py-14 md:px-12 md:py-20 ${i % 2 ? "bg-cream-2" : "bg-cream"}`} aria-labelledby={`${a.id}-title`}>
      <div className={`mx-auto grid max-w-[1320px] items-center gap-10 md:grid-cols-[1.35fr_1fr] md:gap-16 ${flip ? "md:grid-cols-[1fr_1.35fr]" : ""}`}>
        <div className={`aspect-[3/2] overflow-hidden rounded-[22px] bg-straw/40 ${flip ? "md:order-2" : ""}`}>
          <Photo src={img(a.photo)} alt={a.alt} className="h-full w-full" />
        </div>
        <div>
          <h2 id={`${a.id}-title`} className="display t-h2">{a.name}</h2>
          <p className="t-lead mt-5 max-w-[28rem] text-ink/85">{a.lead}</p>
          <ul className="mt-7 max-w-[26rem]">
            {a.pieces.map((p) => <li key={p} className="border-t border-line py-3 last:border-b">{p}</li>)}
          </ul>
          <a href={waLink(`Hi Slim Upholstery, I would like a free quote for ${a.name.toLowerCase()} upholstery. I can send photos.`)} className="btn btn-primary mt-8"><MessageCircle className="size-[18px]" strokeWidth={1.9} aria-hidden /> Ask about {a.name.toLowerCase()} work</a>
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-navy px-5 py-24 text-cream md:px-12 md:py-28" aria-labelledby="close-title">
      <div className="mx-auto max-w-[1320px]">
        <h2 id="close-title" className="display t-h2 max-w-[40rem]">Not on the list? Send a photo anyway.</h2>
        <p className="t-lead mt-5 max-w-[32rem] text-cream/80">{C.street}, Nassau. Monday to Friday 9:00am to 5:30pm, Saturday shorter hours.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={waLink("Hi Slim Upholstery, I have a piece I would like quoted. I can send photos.")} className="btn text-cream shadow-[inset_0_0_0_1.5px_var(--color-cream)] hover:bg-cream hover:text-ink"><MessageCircle className="size-[18px]" strokeWidth={1.9} aria-hidden /> WhatsApp {C.phone}</a>
          <a href="index.html#quote" className="btn text-cream shadow-[inset_0_0_0_1.5px_rgba(247,240,224,.4)] hover:shadow-[inset_0_0_0_1.5px_var(--color-cream)]">Build your quote message</a>
        </div>
      </div>
    </section>
  )
}

function What() {
  return (
    <Page current="what">
      <Intro />
      {AREAS.map((a, i) => <Area key={a.id} a={a} i={i} />)}
      <Closing />
    </Page>
  )
}

mount(<What />)
