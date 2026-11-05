import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Page, mount, Reveal, Label, Photo, ease, BOOK, ROOMS, floorName } from "./site"

const FILTERS: [string, (r: (typeof ROOMS)[number]) => boolean][] = [
  ["All ten", () => true],
  ["Private balcony", r => r.balcony],
  ["King bed", r => r.bed.includes("King")],
  ["Two beds", r => r.bed.startsWith("2")],
  ["Ocean and pool view", r => r.view.startsWith("Ocean and pool")],
  ["Lake view", r => r.view.startsWith("Lake")],
]

function Rooms() {
  const [f, setF] = useState(0)
  const list = useMemo(() => ROOMS.filter(FILTERS[f][1]), [f])
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-12 md:px-10 md:pt-24" aria-labelledby="r-title">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}><Label>Guest accommodations</Label></motion.div>
        <motion.h1 id="r-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1.1, ease }} className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,6.4vw,6.4rem)] leading-[1.02] tracking-[-0.015em]">Diamond to Coral: the ten rooms of Ocean West.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted">Elegantly decorated with comfort and intimacy in mind. Every room has a full or partial ocean view; three open through French doors onto a private balcony.</motion.p>
      </section>
      <section className="sticky top-[62px] z-30 border-y border-line bg-paper/92 backdrop-blur-md" aria-label="Filter rooms">
        <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-5 py-3 md:px-10" role="group">
          {FILTERS.map(([l], i) => <button key={l} type="button" aria-pressed={f === i} onClick={() => setF(i)} className={`min-h-11 shrink-0 px-4 text-[14px] transition hover:-translate-y-px ${f === i ? "bg-ink text-paper" : "hover:bg-paper-2"}`}>{l}</button>)}
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20" aria-label="Rooms">
        <p className="text-[13px] text-muted" aria-live="polite">{list.length} {list.length === 1 ? "room" : "rooms"}</p>
        <ol className="mt-4">
          {list.map((r, i) => (
            <Reveal key={r.name}>
              <li className={`grid gap-6 border-t border-line py-10 md:grid-cols-12 md:items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <Photo src={r.img} alt={`The ${r.name} Room`} className="aspect-[3/2] md:col-span-6" />
                <div className={`md:col-span-5 ${i % 2 ? "md:col-start-1" : "md:col-start-8"}`}>
                  <p className="flex items-center gap-3 text-[11px] tracking-[0.24em] text-lake uppercase"><span className="size-3 rotate-45 border border-ink/30" style={{ background: r.gem }} aria-hidden />{floorName(r.floor)}</p>
                  <h2 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none">{r.name} Room</h2>
                  <dl className="mt-6 grid grid-cols-3 border-t border-line pt-5">
                    {[["Bed", r.bed], ["View", r.view], ["Balcony", r.balcony ? "Private" : "None"]].map(([k, v]) => <div key={k}><dt className="text-[11px] tracking-[0.2em] text-muted uppercase">{k}</dt><dd className="mt-1 pr-2 text-[15px]">{v}</dd></div>)}
                  </dl>
                  <div className="mt-7 flex flex-wrap gap-4">
                    <a href={BOOK} className="group inline-flex min-h-11 items-center gap-2 bg-lake-deep px-5 text-[13px] tracking-[0.12em] text-paper uppercase transition hover:-translate-y-px">Check dates <ArrowUpRight className="size-4" aria-hidden /></a>
                    <a href="index.html#plan" className="inline-flex min-h-11 items-center text-[15px] underline decoration-ink/30 underline-offset-4 hover:decoration-lake">Ask about the {r.name} Room</a>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-[13px] text-muted">Rates $215 to $600 a night, single or double occupancy, varying by season and holiday. Rollaway beds $100 a night.</p>
      </section>
    </>
  )
}

mount(<Page current="The ten rooms"><Rooms /></Page>)
