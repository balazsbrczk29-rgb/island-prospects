import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { PIC, TOURS, tourUrl, type Kind, type Place, type Pic } from "./data"
import { mount, useLenis, TopBar, Footer, Img } from "./ui"
import { FloatingActions } from "./sections"

const PLACES: { key: Place; name: string; note: string; pic: Pic }[] = [
  { key: "harbour", name: "Nassau Harbour", note: "Sunset sails, the dinner cruises, the pirate ship and the fishing charters leave from the harbour.", pic: PIC.seahorse },
  { key: "lagoon", name: "Blue Lagoon Island", note: "Dolphins, sea lions and a quiet beach.", pic: PIC.lagoon },
  { key: "rose", name: "Rose Island", note: "An uninhabited island off Nassau and Paradise Island: the pigs, beach clubs, sail and snorkel.", pic: PIC.perfectDay },
  { key: "reefs", name: "The southwest reefs", note: "Stuart Cove's walls, wrecks and shark dives off New Providence.", pic: PIC.wall },
  { key: "exuma", name: "The Exuma Cays", note: "38 nautical miles by offshore powerboat: Allan's Cay iguanas and Ship Channel Cay.", pic: PIC.powerboat },
  { key: "harbourisland", name: "Harbour Island", note: "A full powerboat day to the Pink Sands Beach, Eleuthera.", pic: PIC.pinkSand },
  { key: "land", name: "On the island", note: "Forts, rum, Junkanoo, pirates, gardens and food in and around Nassau.", pic: PIC.culture },
]
const KINDS: Kind[] = ["Sea and islands", "Sail and evening", "Dive and snorkel", "Culture and family", "Fishing"]

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={on} onClick={onClick} className={`min-h-11 border px-4 text-small transition-colors duration-200 ${on ? "border-green bg-green text-white" : "border-ink/20 hover:border-ink/50"}`}>{children}</button>
}

function Excursions() {
  useLenis()
  const [place, setPlace] = useState<Place | "all">("all")
  const [kind, setKind] = useState<Kind | "all">("all")
  useEffect(() => { const p = new URLSearchParams(location.search).get("place") as Place | null; if (p && PLACES.some(x => x.key === p)) setPlace(p) }, [])
  const groups = useMemo(() => PLACES.filter(p => place === "all" || p.key === place).map(p => ({ ...p, trips: TOURS.filter(t => t.place === p.key && (kind === "all" || t.kind === kind)) })).filter(g => g.trips.length), [place, kind])
  const count = groups.reduce((a, g) => a + g.trips.length, 0)
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <TopBar current="excursions.html" />
      <main id="main">
        <section className="px-[var(--pad)] pt-[clamp(40px,7vw,96px)] pb-10">
          <p className="text-small text-muted italic">Every trip Majestic books, by where it goes</p>
          <h1 className="display tnum mt-3 max-w-[14ch] text-[clamp(3.4rem,8.4vw,8.6rem)] leading-[0.88]">37 ways out of Nassau.</h1>
          <p className="mt-8 max-w-[38rem] text-lead leading-snug">Pick a place or the kind of day you want. Every name opens its full tour page with times and what is included.</p>
        </section>
        <div className="sticky top-0 z-30 border-y border-line bg-ground/95 px-[var(--pad)] py-3 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]" role="group" aria-label="Where">
            <Chip on={place === "all"} onClick={() => setPlace("all")}>Everywhere</Chip>
            {PLACES.map(p => <Chip key={p.key} on={place === p.key} onClick={() => setPlace(p.key)}>{p.name.replace("The ", "")}</Chip>)}
          </div>
          <div className="mt-2 flex items-center gap-2 overflow-x-auto [scrollbar-width:none]" role="group" aria-label="Kind of day">
            <Chip on={kind === "all"} onClick={() => setKind("all")}>Any day</Chip>
            {KINDS.map(k => <Chip key={k} on={kind === k} onClick={() => setKind(k)}>{k}</Chip>)}
            <p className="tnum ml-auto shrink-0 pl-4 text-cap text-muted italic" aria-live="polite">{count} {count === 1 ? "trip" : "trips"}</p>
          </div>
        </div>
        <div className="px-[var(--pad)] pb-[clamp(80px,10vw,140px)]">
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map(g => (
              <motion.section key={g.key} layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                aria-labelledby={`g-${g.key}`} className="grid gap-x-[5vw] gap-y-6 border-b border-line py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="md:sticky md:top-36 md:self-start">
                  <Img pic={g.pic} className="w-full" maxW={g.pic.w < 400 ? g.pic.w : 520} style={g.pic.w < 400 ? { width: g.pic.w } : undefined} />
                  <h2 id={`g-${g.key}`} className="display mt-6 text-[clamp(2.4rem,4vw,3.8rem)]">{g.name}</h2>
                  <p className="mt-3 max-w-[30rem] text-small text-muted">{g.note}</p>
                </div>
                <ul className="border-t border-line md:mt-0">
                  {g.trips.map(t => (
                    <li key={t.id} className="border-b border-line">
                      <a href={tourUrl(t.id)} target="_blank" rel="noopener" className="group grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 no-underline">
                        <span>
                          <span className="block font-display text-[1.4rem] leading-snug transition-colors group-hover:text-green">{t.name}</span>
                          <span className="mt-1 block text-small text-muted">{t.line}{t.detail ? <em className="not-italic text-ink"> {t.detail}.</em> : null}</span>
                        </span>
                        <ArrowUpRight className="size-5 text-green transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </AnimatePresence>
          <div id="page-form" className="mt-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <h2 className="display text-[clamp(2.4rem,4.4vw,4.4rem)]">Found your day? Tell us where you are staying.</h2>
            <a href="index.html#book" className="btn">Plan my excursion</a>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions planHref="index.html#book" />
    </>
  )
}
mount(<Excursions />)
