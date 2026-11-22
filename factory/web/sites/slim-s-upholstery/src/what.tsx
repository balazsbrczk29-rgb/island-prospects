import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { C, Page, Photo, ease, img, mount, waLink } from "./site"

// Areas are from Slim Upholstery's own listings ("Home, Auto, Marine, Aircrafts and Churches"; "Sofas, Dining Seats,
// Cushions"). The example pieces under each are category-standard and listed as assumptions in the concept notes.
const AREAS = [
  { id: "home", name: "Home", photo: "sofa-living", alt: "A navy reupholstered sofa in a bright room with white louvred shutters",
    lead: "Sofas, dining seats and cushions: the furniture you would rather keep than replace.",
    pieces: "Sofas and sectionals, dining chair seats and backs, armchairs, cushions and pillows." },
  { id: "marine", name: "Marine", photo: "marine-cushions", alt: "New white boat cushions with navy piping in a sportfishing cockpit over turquoise water",
    lead: "Boat seating that has had too much sun and salt, re-covered for the next season.",
    pieces: "Cockpit and bench cushions, helm and passenger seats, cabin seating, bow cushions." },
  { id: "auto", name: "Auto", photo: "auto-seat", alt: "A car seat re-covered in tan leather with cream double stitching",
    lead: "Torn or tired car seats, re-covered and restitched.",
    pieces: "Front and rear seats, seat repairs and panels, headliners, door panels." },
  { id: "aircraft", name: "Aircraft", photo: "aircraft-seat", alt: "A cream leather club seat in a small aircraft cabin with oval windows",
    lead: "Aircraft seating and cabin upholstery. Send photos and the seat count for a quote.",
    pieces: "Passenger seats, crew seats, cabin panels." },
  { id: "churches", name: "Churches", photo: "church-pew", alt: "Church pews with new deep green seat cushions in a white church with louvred windows",
    lead: "Pews and church seating, done as one matching set for the whole sanctuary.",
    pieces: "Pew cushions, pulpit and choir chairs, kneelers." },
]

function Index() {
  const [active, setActive] = useState(0)
  const A = AREAS[active]
  return (
    <section className="relative md:grid md:grid-cols-[1fr_1fr]" aria-labelledby="what-title">
      <div className="px-5 pb-20 pt-8 md:px-12 md:pb-[30vh] md:pt-10">
        <a href="index.html" className="display inline-flex min-h-[44px] items-center text-[1.3rem]">Slim Upholstery</a>
        <h1 id="what-title" className="display t-h1 mt-14 md:mt-[16vh]">
          <motion.span className="block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>What we upholster.</motion.span>
        </h1>
        <p className="t-lead mt-6 max-w-[30rem] text-ink/85">Every job starts the same way: a photo on WhatsApp to <span className="tnum whitespace-nowrap">{C.phone}</span> and a free quote.</p>

        <ol className="mt-16 md:mt-[18vh]">
          {AREAS.map((a, i) => (
            <motion.li
              key={a.id} id={a.id}
              className="scroll-mt-8 border-t border-line py-8 md:flex md:min-h-[78vh] md:flex-col md:justify-center md:py-12"
              onViewportEnter={() => setActive(i)} viewport={{ margin: "-45% 0px -45% 0px" }}
              onMouseEnter={() => setActive(i)}
            >
              <h2 className={`display text-[3.2rem] leading-none transition-colors duration-300 md:text-[clamp(4rem,7.4vw,7rem)] ${active === i ? "text-ink" : "md:text-ink/55"}`}>{a.name}</h2>
              <div className="mt-5 aspect-[3/2] overflow-hidden rounded-[16px] bg-cream-2 md:hidden">
                <Photo src={img(a.photo)} alt={a.alt} className="h-full w-full" />
              </div>
              <p className="t-lead mt-5 max-w-[28rem] text-ink/85 md:mt-6">{a.lead}</p>
              <p className="mt-3 max-w-[28rem] text-ink/75">{a.pieces}</p>
              <a href={waLink(`Hi Slim Upholstery, I would like a free quote for ${a.name.toLowerCase()} upholstery. I can send photos.`)} className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start font-bold underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink">
                <MessageCircle className="size-[18px]" strokeWidth={1.9} aria-hidden /> Ask about {a.name.toLowerCase()} work
              </a>
            </motion.li>
          ))}
          <li className="border-t border-line pt-10 md:pt-14">
            <p className="display t-h3">Something else with a seat or a cover?</p>
            <a href={waLink("Hi Slim Upholstery, I have a piece I would like quoted. I can send photos.")} className="btn btn-primary mt-6"><MessageCircle className="size-[18px]" strokeWidth={1.9} aria-hidden /> Send a photo on WhatsApp</a>
            <a href="index.html#quote" className="ml-1 mt-6 inline-flex min-h-[44px] items-center gap-1.5 px-3 font-bold underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink">Build your quote message <ArrowUpRight className="size-4" strokeWidth={1.9} aria-hidden /></a>
          </li>
        </ol>
      </div>

      {/* full-height photograph that follows the index */}
      <div className="hidden md:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-cream-2">
          <AnimatePresence initial={false}>
            <motion.div key={A.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }}>
              <Photo src={img(A.photo)} alt={A.alt} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
          <p className="t-cap absolute bottom-[calc(96px+1rem)] right-5 rounded-full bg-cream px-3 py-1.5 text-ink">Illustrative photograph</p>
        </div>
      </div>
    </section>
  )
}

function What() {
  return (
    <Page current="what">
      <Index />
    </Page>
  )
}

mount(<What />)
