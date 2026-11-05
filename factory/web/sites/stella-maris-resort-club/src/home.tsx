import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Mail, Plane, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Page, mount, Reveal, Title, Img, Star, ease, reveal, IMG, PHONE, TEL, EMAIL, AIR } from "./site"
import { UNITS, TAGS, ACTIVITIES } from "./data"

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-12 md:min-h-[calc(100svh-130px)]">
        <div className="relative z-10 flex flex-col justify-between px-5 pt-10 pb-10 md:col-span-6 md:px-10 md:pt-16">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="kicker">Long Island, Southern Bahamas</motion.p>
            <h1 id="hero-title" className="mt-6 font-display text-[clamp(3.8rem,9.6vw,9.4rem)] leading-[0.86] tracking-[-0.03em]">
              <span className="block overflow-hidden pb-[0.06em]"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1.2, ease: reveal }}>Stella</motion.span></span>
              <span className="block overflow-hidden pb-[0.06em]"><motion.span className="block italic text-lagoon" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease: reveal }}>Maris</motion.span></span>
              <span className="sr-only">Resort Club and Marina, Long Island, Bahamas</span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease }} className="mt-8 max-w-md text-[19px] leading-relaxed">An Out Island resort club between two shorelines: ocean view rooms, cottages and beach houses in palm gardens, three pools, diving at Dean's Blue Hole. We can even fly you in.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#plan" className="pill pill-solid">Plan your stay <ArrowRight className="size-4" aria-hidden /></a>
            <a href="#finder" className="pill pill-line">Find your house</a>
          </motion.div>
        </div>
        <div className="relative md:col-span-6">
          <motion.div initial={{ clipPath: "inset(0 0 0 100%)" }} animate={{ clipPath: "inset(0 0 0 0%)" }} transition={{ delay: 0.15, duration: 1.5, ease: reveal }} className="h-[52svh] md:absolute md:inset-0 md:h-auto md:rounded-bl-[120px] md:overflow-hidden">
            <img src={IMG.hero} alt="Stella Maris Resort Club on the Atlantic shore of Long Island" width={1920} height={1280} fetchPriority="high" className="size-full object-cover" />
          </motion.div>
          <div className="absolute -left-14 bottom-10 hidden size-28 text-lagoon md:block"><Star className="size-full" /></div>
        </div>
      </div>
    </section>
  )
}

function Shores() {
  return (
    <section aria-label="Key information" className="grid md:grid-cols-2">
      <div className="bg-shallows/70 px-5 py-10 md:px-10 md:py-14">
        <p className="kicker !text-ink/70">The turquoise side</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          <li><a href={TEL} className="group block"><span className="text-[13px] text-ink/70">Reservations</span><span className="block font-display text-[clamp(1.8rem,2.6vw,2.6rem)] leading-tight group-hover:text-atlantic">{PHONE}</span></a></li>
          <li><a href={`mailto:${EMAIL}`} className="group block"><span className="text-[13px] text-ink/70">Email</span><span className="block font-display text-[1.15rem] leading-tight break-words group-hover:text-atlantic">{EMAIL}</span></a></li>
        </ul>
      </div>
      <div className="bg-atlantic px-5 py-10 text-paper md:px-10 md:py-14">
        <p className="kicker !text-shallows">The ink-blue side</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          <li><a href="island.html#getting-here" className="group block"><span className="text-[13px] text-paper/70">Fly in</span><span className="block font-display text-[clamp(1.5rem,2.2vw,2.2rem)] leading-tight group-hover:text-shallows">Stella Maris Airport, SML</span></a></li>
          <li><a href="stay.html" className="group block"><span className="text-[13px] text-paper/70">Stay</span><span className="block font-display text-[clamp(1.5rem,2.2vw,2.2rem)] leading-tight group-hover:text-shallows">Rooms to four-bedroom houses</span></a></li>
        </ul>
      </div>
    </section>
  )
}

const PARTY = [{ k: "two", l: "Two of us", min: 1, max: 1 }, { k: "family", l: "A family", min: 2, max: 3 }, { k: "group", l: "A group", min: 3, max: 4 }] as const

function Finder() {
  const [party, setParty] = useState<(typeof PARTY)[number]["k"]>("family")
  const [wish, setWish] = useState<string[]>([])
  const p = PARTY.find(x => x.k === party)!
  const list = useMemo(() => {
    const byBeds = UNITS.filter(u => u.beds >= p.min && u.beds <= p.max)
    const exact = byBeds.filter(u => wish.every(w => u.tags.includes(w as never)))
    return { exact, fallback: exact.length ? [] : byBeds }
  }, [p, wish])
  const shown = list.exact.length ? list.exact : list.fallback
  const [sel, setSel] = useState<string | null>(null)
  const unit = shown.find(u => u.id === sel) ?? shown[0]
  return (
    <section id="finder" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36" aria-labelledby="finder-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Title n="01" k="Find your house" id="finder-title" intro="Ten ways to stay, from a room with an Atlantic view to a four-bedroom house with its own pool. Tell us who is coming.">Who's coming<br /><em className="text-lagoon">to the island?</em></Title>
          <Reveal delay={0.1} className="mt-10">
            <p className="kicker">Party</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Party">
              {PARTY.map(x => <button key={x.k} type="button" aria-pressed={party === x.k} onClick={() => { setParty(x.k); setSel(null) }} className={`min-h-11 rounded-full border px-5 text-[15px] transition hover:-translate-y-px ${party === x.k ? "border-lagoon bg-lagoon text-white" : "border-ink/20 hover:border-ink"}`}>{x.l}</button>)}
            </div>
            <p className="kicker mt-8">Nice to have</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Wishes">
              {Object.entries(TAGS).map(([k, l]) => { const on = wish.includes(k); return <button key={k} type="button" aria-pressed={on} onClick={() => { setWish(w => on ? w.filter(x => x !== k) : [...w, k]); setSel(null) }} className={`min-h-11 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${on ? "border-atlantic bg-atlantic text-paper" : "border-ink/20 hover:border-ink"}`}>{on ? "✓ " : "+ "}{l}</button> })}
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          {!list.exact.length && <p className="mb-4 rounded-xl bg-sand px-4 py-3 text-[15px]">Nothing ticks every box for this party, so here is everything that sleeps you.</p>}
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-paper-2 lg:aspect-auto lg:min-h-[460px]">
              <AnimatePresence mode="popLayout">
                {unit && <motion.img key={unit.id} src={unit.img} alt={`${unit.name} at Stella Maris Resort Club`} width={1024} height={683} loading="lazy" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="absolute inset-0 size-full object-cover" />}
              </AnimatePresence>
              {unit && <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-paper/90 p-4 backdrop-blur-md"><p className="text-[13px] text-muted">{unit.kind}</p><p className="font-display text-2xl">{unit.name}</p><p className="mt-1 text-[15px] text-muted">{unit.desc}</p></div>}
            </div>
            <ul className="divide-y divide-line border-y border-line">
              <AnimatePresence initial={false}>
                {shown.map(u => (
                  <motion.li key={u.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                    <button type="button" onClick={() => setSel(u.id)} onMouseEnter={() => setSel(u.id)} aria-pressed={unit?.id === u.id} className="group flex w-full items-baseline justify-between gap-3 py-4 text-left">
                      <span className={`font-display text-xl transition group-hover:translate-x-1 ${unit?.id === u.id ? "italic text-lagoon" : ""}`}>{u.name}</span>
                      <span className="shrink-0 text-[13px] text-muted">{u.beds === 1 ? u.kind : `${u.beds} bed`}</span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
          <a href="stay.html" className="ulink mt-6 inline-block text-lagoon">See every room and house</a>
        </div>
      </div>
    </section>
  )
}

function Club() {
  return (
    <section className="bg-paper-2" aria-labelledby="club-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <Img src={IMG.resort} alt="The palm gardens and pools of Stella Maris Resort Club" className="aspect-[4/5] rounded-[24px] md:col-span-6" />
        <div className="md:col-span-5 md:col-start-8 md:self-center">
          <Title n="02" k="The club" id="club-title" intro="Three pools in the palm gardens. Breakfast, lunch and dinner at the main club house. The Moonshine beach bar-and-grill by the shore, Rum Punch Parties after dark, and many activities free of charge.">Never crowded,<br /><em className="text-lagoon">never bored.</em></Title>
          <Reveal delay={0.1}><ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line text-[15px]">
            {["3 hotel pools", "Club house dining", "Moonshine beach bar", "Free activities"].map(t => <li key={t} className="bg-paper px-4 py-4">{t}</li>)}
          </ul></Reveal>
        </div>
      </div>
    </section>
  )
}

function Water() {
  const sites = [["Dean's Blue Hole", "Dive site 01"], ["Conception Wall", "Dive site 02"], ["Shark Reef", "Dive site 03"], ["The Wreck", "Dive site 04"]]
  return (
    <section className="bg-atlantic text-paper" aria-labelledby="water-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5"><Title light n="03" k="In the water" id="water-title" intro="Stella Maris Water Sports runs the diving. Bonefishing is a stone's throw away in Adderley's and Glenton's bays, and big game fishing waits off two shorelines.">Some of the Bahamas'<br /><em className="text-shallows">best water.</em></Title></div>
          <ol className="md:col-span-6 md:col-start-7">
            {sites.map(([t, d], i) => (
              <motion.li key={t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.8, ease }} className="group flex items-baseline justify-between gap-4 border-b border-paper/20 py-6 first:border-t">
                <span className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-none transition group-hover:translate-x-1">{t}</span>
                <span className="text-[14px] text-paper/60">{d}</span>
              </motion.li>
            ))}
          </ol>
        </div>
        <Reveal className="mt-14"><a href="island.html" className="pill border border-paper/40 text-paper hover:border-paper">Dive, fish, explore <ArrowRight className="size-4" aria-hidden /></a></Reveal>
      </div>
    </section>
  )
}

type T = "stay" | "wedding" | "fly"
function Plan() {
  const [tab, setTab] = useState<T>("stay")
  const [v, setV] = useState<Record<string, string>>({ unit: "Ocean view room" })
  const [acts, setActs] = useState<string[]>([])
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV(s => ({ ...s, [k]: e.target.value }))
  const to = tab === "fly" ? AIR : EMAIL
  const subj = { stay: `Stay enquiry: ${v.unit}`, wedding: "Wedding or anniversary enquiry", fly: "Flight enquiry to Stella Maris" }[tab]
  const lines = tab === "stay" ? [`Stay: ${v.unit}`, `Arrive: ${v.arrive || "-"}`, `Depart: ${v.depart || "-"}`, `Guests: ${v.guests || "-"}`, acts.length ? `Interested in: ${acts.join(", ")}` : ""]
    : tab === "wedding" ? [`Occasion: ${v.occ || "-"}`, `Date: ${v.wdate || "-"}`, `Guests: ${v.wguests || "-"}`, `Style: ${v.style || "-"}`]
    : [`From (Bahamas hub): ${v.hub || "-"}`, `Date: ${v.fdate || "-"}`, `Passengers: ${v.pax || "-"}`]
  const body = [...lines, `Name: ${v.name || "-"}`, v.msg ? `Note: ${v.msg}` : ""].filter(Boolean).join("\n")
  const href = `mailto:${to}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
  return (
    <section id="plan" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32" aria-labelledby="plan-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Title n="04" k="Plan your stay" id="plan-title" intro="Choose what you are planning. We write the email for you, to reservations or to the resort's air service. Bookings are by credit card.">Write to<br /><em className="text-lagoon">the club.</em></Title>
          <a href={TEL} className="pill pill-line mt-8"><Phone className="size-4" aria-hidden /> {PHONE}</a>
        </div>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Tabs value={tab} onValueChange={t => setTab(t as T)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-paper-2 p-1">
              {([["stay", "A stay"], ["wedding", "A wedding or anniversary"], ["fly", "Fly me in"]] as const).map(([k, l]) => <TabsTrigger key={k} value={k} className="min-h-11 rounded-full px-5 data-[state=active]:bg-lagoon data-[state=active]:text-white">{l}</TabsTrigger>)}
            </TabsList>
            <TabsContent value="stay" className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="field sm:col-span-2"><span className="kicker">Where would you like to stay?</span><select value={v.unit} onChange={set("unit")}>{UNITS.map(u => <option key={u.id}>{u.name}</option>)}</select></label>
                <label className="field"><span className="kicker">Arrival</span><input type="date" value={v.arrive ?? ""} onChange={set("arrive")} /></label>
                <label className="field"><span className="kicker">Departure</span><input type="date" value={v.depart ?? ""} onChange={set("depart")} /></label>
                <label className="field"><span className="kicker">Guests</span><input type="number" min={1} value={v.guests ?? ""} onChange={set("guests")} /></label>
              </div>
              <p className="kicker mt-8">While you are here</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ACTIVITIES.map(a => { const on = acts.includes(a); return <button key={a} type="button" aria-pressed={on} onClick={() => setActs(s => on ? s.filter(x => x !== a) : [...s, a])} className={`min-h-10 rounded-full border px-4 text-[14px] transition hover:-translate-y-px ${on ? "border-lagoon bg-lagoon text-white" : "border-ink/20"}`}>{a}</button> })}
              </div>
            </TabsContent>
            <TabsContent value="wedding" className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="field"><span className="kicker">Occasion</span><input value={v.occ ?? ""} onChange={set("occ")} placeholder="Wedding, anniversary" /></label>
                <label className="field"><span className="kicker">Date</span><input type="date" value={v.wdate ?? ""} onChange={set("wdate")} /></label>
                <label className="field"><span className="kicker">Guests</span><input type="number" min={2} value={v.wguests ?? ""} onChange={set("wguests")} /></label>
                <label className="field"><span className="kicker">Barefoot or elegant?</span><select value={v.style ?? ""} onChange={set("style")}><option value="">Not sure yet</option><option>Barefoot</option><option>Elegant</option></select></label>
              </div>
            </TabsContent>
            <TabsContent value="fly" className="mt-8">
              <p className="mb-6 flex items-center gap-2 text-[15px] text-muted"><Plane className="size-4 text-lagoon" aria-hidden /> The resort can fly you from your international Bahamas airport hub.</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="field"><span className="kicker">Flying from</span><input value={v.hub ?? ""} onChange={set("hub")} placeholder="Nassau, for example" /></label>
                <label className="field"><span className="kicker">Date</span><input type="date" value={v.fdate ?? ""} onChange={set("fdate")} /></label>
                <label className="field"><span className="kicker">Passengers</span><input type="number" min={1} value={v.pax ?? ""} onChange={set("pax")} /></label>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="field"><span className="kicker">Your name</span><input autoComplete="name" value={v.name ?? ""} onChange={set("name")} /></label>
            <label className="field"><span className="kicker">Anything else</span><input value={v.msg ?? ""} onChange={set("msg")} /></label>
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-[24px] bg-sand p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="text-[15px] text-ink/80">{lines.filter(Boolean).slice(0, 3).join(" · ")}</p>
            <a href={href} className="pill pill-solid shrink-0"><Mail className="size-4" aria-hidden /> Send to {tab === "fly" ? "the air service" : "reservations"}</a>
          </div>
          <p className="mt-3 text-[13px] text-muted">Opens your email app, addressed to {to}.</p>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ["Where is Stella Maris Resort Club?", "In Stella Maris on Long Island, in the southern Bahamas, on Ocean View Drive near the Atlantic shore."],
  ["How do I get to Long Island?", "Stella Maris Airport (SML) has flights from Nassau, and the resort can fly you in from your international Bahamas airport hub. Write to its air service to arrange it."],
  ["What kinds of rooms are there?", "Atlantic ocean view hotel rooms, one-bedroom cottages and apartments, two-bedroom cottages and three and four-bedroom houses, some with their own pools."],
  ["Is there diving?", "Yes. Stella Maris Water Sports dives Shark Reef, The Wreck, Conception Wall and Dean's Blue Hole."],
  ["How do I pay?", "Bookings are paid by credit card: Visa, Mastercard or American Express."],
]
function Questions() {
  return (
    <section className="bg-paper-2" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4"><Title n="05" k="Questions" id="faq-title">Good to know.</Title></div>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-ink/15">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-ink/15">
                <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function Find() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-28" aria-labelledby="find-title">
      <div className="md:col-span-5"><Title n="06" k="Find us" id="find-title" intro="Ocean View Drive, Stella Maris, Long Island. P.O. Box LI 30-105.">Stella Maris,<br /><em className="text-lagoon">Long Island.</em></Title></div>
      <div className="overflow-hidden rounded-[24px] border border-line md:col-span-7"><iframe title="Map of Stella Maris Resort Club, Long Island" loading="lazy" className="h-[420px] w-full" src="https://www.google.com/maps?q=Stella+Maris+Resort+Club,+Long+Island,+Bahamas&output=embed" /></div>
    </section>
  )
}

mount(<Page current="Home"><Hero /><Shores /><Finder /><Club /><Water /><Plan /><Questions /><Find /></Page>)
