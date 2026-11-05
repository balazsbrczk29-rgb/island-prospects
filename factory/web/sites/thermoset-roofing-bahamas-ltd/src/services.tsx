import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, reveal, IMG } from "./site"

const GROUPS: [string, [string, string][]][] = [
  ["Roofing", [
    ["TPO & PVC single-ply membrane systems", "High-performance thermoplastic membranes for commercial and residential flat roofs."],
    ["Modified bitumen & torch-applied systems", "Durable multi-layer assemblies for waterproofing and UV resistance."],
    ["Standing seam & metal roofing", "Custom fabricated aluminium or steel panels with concealed fasteners and Kynar finishes."],
    ["Shingle roofing", "Architectural, synthetic and 3-tab shingles for pitched residential and commercial roofs."],
    ["Roof replacement & re-roofing", "Full tear-off and reinstallation of aged or failing roof systems."],
  ]],
  ["Waterproofing & specialty", [
    ["Terrace & balcony waterproofing", "Liquid-applied membranes beneath tile or concrete toppings."],
    ["Solar plinth & equipment curb flashing", "TPO-compatible detailing for solar bases, HVAC curbs and mechanical penetrations."],
    ["Planter box & green roof coordination", "Waterproofing continuity beneath movable or built-in planters."],
    ["Roof overburden installation", "Gravel ballast, pavers or decorative stone over membrane systems."],
  ]],
  ["Maintenance & inspection", [
    ["Preventative maintenance plans", "Scheduled inspections, cleaning and minor repairs to extend roof life."],
    ["Leak detection & emergency repairs", "Rapid response to active leaks or storm-related damage."],
    ["Roof condition assessments", "Detailed reports with photos, core cuts and repair recommendations."],
  ]],
  ["Custom fabrication", [
    ["Perimeter flashing & edge metal", "ANSI/SPRI ES-1 compliant fabrication in Kynar-finished aluminium or galvanized steel."],
    ["AC curb installation", "Custom fabricated mechanical curbs to support rooftop HVAC units."],
    ["Gutters & downspouts", "Seamless aluminium or copper systems with debris guards and custom profiles."],
    ["Skylight & hatch integration", "Flashing and waterproofing around daylighting and access features."],
  ]],
  ["General construction", [
    ["Interior & exterior painting", "From precision detailing to full-scale repainting."],
    ["Pressure cleaning", "Driveways, roofs, gutters and facades."],
    ["Gutter & downspout cleaning", "Keeping drainage clear to protect foundation and roofline."],
    ["Tree cutting & hauling", "Safe trimming, removal and debris hauling."],
    ["Carpentry", "Framing, decking, custom cabinetry, doors and trim."],
    ["Masonry", "Block work, poured concrete, stone and brick for walls, driveways, patios and retaining structures."],
  ]],
]

mount(
  <Page current="Services">
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 pb-16 md:px-10 md:pt-24 lg:grid-cols-12" aria-labelledby="hero-title">
      <div className="lg:col-span-7">
        <Label>Services</Label>
        <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.8rem,6vw,6.4rem)] leading-[0.92] font-extrabold tracking-[-0.045em]">
          {["From membrane", "to masonry."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.04em]"><motion.span className={`block ${i ? "text-steel" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <p className="mt-6 max-w-xl text-[18px] text-muted">Residential, commercial and industrial properties throughout New Providence and the surrounding islands.</p>
      </div>
      <Photo src={IMG.hero2} alt="A roof completed by Thermoset Roofing" priority className="aspect-[4/3] lg:col-span-5" />
    </section>
    {GROUPS.map(([g, items], gi) => (
      <section key={g} className={gi % 2 ? "bg-white" : ""} aria-labelledby={`g${gi}`}>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><Label n={`0${gi + 1}`}>{g}</Label><h2 id={`g${gi}`} className="mt-4 font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[1] font-extrabold tracking-[-0.035em]">{g}</h2></Reveal>
          <ol className="border-t-2 border-ink lg:col-span-8">
            {items.map(([t, d], i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6, ease }} className="group grid gap-2 border-b border-line py-5 md:grid-cols-[1fr_1.2fr] md:gap-8">
                <p className="font-display text-xl font-bold tracking-tight transition group-hover:translate-x-1 group-hover:text-steel">{t}</p>
                <p className="text-[16px] text-muted">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    ))}
    <section className="bg-ink text-white" aria-label="Free estimate">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="max-w-2xl font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1] font-extrabold tracking-[-0.035em]">All estimates are free.</p>
        <a href="index.html#estimate" className="inline-flex min-h-13 items-center gap-2 bg-vis px-7 py-3 text-[17px] font-semibold text-ink transition hover:-translate-y-0.5">Request a free estimate <ArrowUpRight className="size-4" aria-hidden /></a>
      </div>
    </section>
  </Page>
)
