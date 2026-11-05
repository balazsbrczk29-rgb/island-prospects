import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { Page, mount, Reveal, Label, MaskImg, ease, reveal, C, IMG, STAYS } from "./site"
import { Plan } from "./parts"

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-14 pb-16 md:grid-cols-12 md:px-10 md:pt-20" aria-labelledby="hero-title">
      <div className="md:col-span-5 md:self-end">
        <Label>Rooms &amp; villas</Label>
        <h1 id="hero-title" className="mt-6 font-display text-[clamp(3rem,6vw,6.4rem)] leading-[0.92] font-medium tracking-[-0.02em]">
          {["Nine ways", "to wake up here."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><motion.span className={`block ${i ? "italic" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 1.1, ease: reveal }}>{l}</motion.span></span>)}
        </h1>
        <p className="mt-6 max-w-md text-[17px] text-muted">Hotel rooms with Hope Town Harbour views, and villas with space for the whole family.</p>
        <a href={C.book} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition hover:-translate-y-0.5 hover:bg-sea-deep">Check live rates <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></a>
      </div>
      <MaskImg src={IMG.oleander} alt="Oleander Villa at Hope Town Inn & Marina" priority className="aspect-[4/3] md:col-span-7" w={1918} h={1080} />
    </section>
  )
}

function Grid({ kind }: { kind: "Room" | "Villa" }) {
  const list = STAYS.filter(s => s.kind === kind)
  return (
    <section className={kind === "Villa" ? "bg-paper-2" : ""} aria-labelledby={`${kind}-title`}>
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div><Label n={kind === "Room" ? "01" : "02"}>{kind === "Room" ? "Hotel rooms" : "Villas"}</Label>
            <h2 id={`${kind}-title`} className="mt-5 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1] font-medium">{kind === "Room" ? "Harbour views, close to everything." : "Space for the whole family."}</h2></div>
        </Reveal>
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <motion.li key={s.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ delay: (i % 3) * 0.08, duration: 0.9, ease }} className={`group ${i % 3 === 1 ? "lg:mt-16" : ""}`}>
              <a href={C.book} className="block">
                <div className="overflow-hidden bg-shallows"><img src={s.img} alt={`${s.name} at Hope Town Inn & Marina`} width={395} height={300} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <p className="font-display text-[1.9rem] leading-tight transition group-hover:italic">{s.name}</p>
                  <ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </div>
                <dl className="mt-3 grid grid-cols-2 text-[14px]"><div><dt className="text-muted">Sleeps</dt><dd>{s.guests} guests</dd></div><div><dt className="text-muted">Size</dt><dd>{s.ft.toLocaleString()} ft² / {s.m} m²</dd></div></dl>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Enquire() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32" aria-labelledby="enq-title">
      <Reveal className="md:col-span-4"><Label n="03">Plan your stay</Label><h2 id="enq-title" className="mt-5 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[1] font-medium">Rates on request, <em>or live online.</em></h2></Reveal>
      <Reveal delay={0.1} className="md:col-span-7 md:col-start-6"><Plan /></Reveal>
    </section>
  )
}

mount(<Page current="Stay"><Hero /><Grid kind="Room" /><Grid kind="Villa" /><Enquire /></Page>)
